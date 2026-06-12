import express from "express";
import path from "path";
import dotenv from "dotenv";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import { initializeApp } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  getDocs, 
  orderBy, 
  query, 
  limit,
  deleteDoc
} from "firebase/firestore";

dotenv.config();

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: null,
      email: null,
      emailVerified: null,
      isAnonymous: null,
      tenantId: null,
      providerInfo: []
    },
    operationType,
    path
  };
  console.error('[DIAGNOSTIC_PERMISSIONS_ERROR] Firestore Error: ', JSON.stringify(errInfo));
}

// Load Firebase configuration safely
let db: any = null;
try {
  const configPath = path.join(process.cwd(), "firebase-applet-config.json");
  if (fs.existsSync(configPath)) {
    const firebaseConfig = JSON.parse(fs.readFileSync(configPath, "utf-8"));
    const firebaseApp = initializeApp(firebaseConfig);
    db = getFirestore(firebaseApp, firebaseConfig.firestoreDatabaseId);
    console.log("[FIREBASE] Firestore database initialized successfully on server.");
  }
} catch (err) {
  console.error("[FIREBASE] Failed keyless initialization on server, falling back exclusively to local database file:", err);
}

// Persistent database storage paths
const IS_VERCEL = !!process.env.VERCEL;

const APPLICATIONS_DB_PATH = IS_VERCEL
  ? path.join("/tmp", "applications-db.json")
  : path.join(process.cwd(), "applications-db.json");

const ADVISORS_DB_PATH = IS_VERCEL
  ? path.join("/tmp", "advisors-db.json")
  : path.join(process.cwd(), "advisors-db.json");

if (IS_VERCEL) {
  const filesToCopy = ["applications-db.json", "advisors-db.json", "settings-db.json"];
  for (const filename of filesToCopy) {
    const src = path.join(process.cwd(), filename);
    const dest = path.join("/tmp", filename);
    if (fs.existsSync(src) && !fs.existsSync(dest)) {
      try {
        fs.copyFileSync(src, dest);
        console.log(`[VERCEL] Copied ${filename} to /tmp for write access.`);
      } catch (e) {
        console.error(`[VERCEL] Failed to copy ${filename} to /tmp:`, e);
      }
    }
  }
}

// Loaded arrays from file-based DB or initialized with defaults
function loadApplicationsFromDb(): any[] {
  try {
    if (fs.existsSync(APPLICATIONS_DB_PATH)) {
      const rawData = fs.readFileSync(APPLICATIONS_DB_PATH, "utf-8");
      return JSON.parse(rawData);
    }
  } catch (err) {
    console.error("Failed to load applications database, initializing default list:", err);
  }
  
  // High-quality Initial seed datasets
  const initialData = [
    {
      id: "APP-48218",
      fullName: "Amara Adebayo",
      email: "amara.bayo@example.com",
      phone: "08106919577",
      program: "JUPEB (Prevarsity Direct Entry)",
      track: "Software Development & Cyber Security",
      status: "Verified & Accepted",
      notes: "Paid NGN 10,000 application fee. Ref: PSTK-SEED-892",
      createdAt: new Date(Date.now() - 4 * 3600000).toISOString()
    },
    {
      id: "APP-59302",
      fullName: "Liam Sterling",
      email: "liam.ster@example.com",
      phone: "09161849691",
      program: "Study Abroad & Scholarship Track",
      track: "Canada (University of Toronto Pathway)",
      status: "Verified & Accepted",
      notes: "Paid NGN 10,000 application fee. Ref: PSTK-SEED-419",
      createdAt: new Date(Date.now() - 2 * 3600000).toISOString()
    }
  ];
  
  saveApplicationsToDb(initialData);
  return initialData;
}

function saveApplicationsToDb(data: any[]) {
  try {
    fs.writeFileSync(APPLICATIONS_DB_PATH, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to save applications to database:", err);
  }
}

function loadAdvisorsFromDb(): any[] {
  try {
    if (fs.existsSync(ADVISORS_DB_PATH)) {
      const rawData = fs.readFileSync(ADVISORS_DB_PATH, "utf-8");
      return JSON.parse(rawData);
    }
  } catch (err) {
    console.error("Failed to load advisors database:", err);
  }
  return [];
}

function saveAdvisorsToDb(data: any[]) {
  try {
    fs.writeFileSync(ADVISORS_DB_PATH, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to save advisors database:", err);
  }
}

const applications = loadApplicationsFromDb();
const advisorRequests = loadAdvisorsFromDb();

const SETTINGS_DB_PATH = IS_VERCEL
  ? path.join("/tmp", "settings-db.json")
  : path.join(process.cwd(), "settings-db.json");

interface GlobalSettings {
  paymentAmount: number;
  paystackPublicKey: string;
  admissionStatus: string;
  announcementText: string;
  demoMode: boolean;
  contactPhone: string;
  contactEmail: string;
  adminPasscode: string;
}

const DEFAULT_SETTINGS: GlobalSettings = {
  paymentAmount: 10000,
  paystackPublicKey: "pk_test_a0d81fa0002bdf42ec73db6ffc2548cccdba9841",
  admissionStatus: "Open",
  announcementText: "🌟 SPECIAL ADMISSION WINDOW OPEN: ENROLL NOW WITH 100% SECURE INTEGRATION AND AI PATHWAY ADVISORY.",
  demoMode: true,
  contactPhone: "+234 810 691 9577",
  contactEmail: "admissions@univlove.edu",
  adminPasscode: "admin123"
};

function loadSettingsFromDb(): GlobalSettings {
  try {
    if (fs.existsSync(SETTINGS_DB_PATH)) {
      const rawData = fs.readFileSync(SETTINGS_DB_PATH, "utf-8");
      return { ...DEFAULT_SETTINGS, ...JSON.parse(rawData) };
    }
  } catch (err) {
    console.error("Failed to load settings database, falling back to defaults:", err);
  }
  saveSettingsToDb(DEFAULT_SETTINGS);
  return DEFAULT_SETTINGS;
}

function saveSettingsToDb(data: GlobalSettings) {
  try {
    fs.writeFileSync(SETTINGS_DB_PATH, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to save settings database:", err);
  }
}

const globalSettingsObj = loadSettingsFromDb();

const app = express();

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

  // API Routes
  
  // 0. Admin and Control Panel Endpoints
  app.get("/api/settings", (req, res) => {
    res.json({ success: true, data: globalSettingsObj });
  });

  app.post("/api/settings/update", (req, res) => {
    const { paymentAmount, paystackPublicKey, admissionStatus, announcementText, demoMode, contactPhone, contactEmail, adminPasscode } = req.body;
    
    if (paymentAmount !== undefined) globalSettingsObj.paymentAmount = Number(paymentAmount);
    if (paystackPublicKey !== undefined) globalSettingsObj.paystackPublicKey = String(paystackPublicKey);
    if (admissionStatus !== undefined) globalSettingsObj.admissionStatus = String(admissionStatus);
    if (announcementText !== undefined) globalSettingsObj.announcementText = String(announcementText);
    if (demoMode !== undefined) globalSettingsObj.demoMode = Boolean(demoMode);
    if (contactPhone !== undefined) globalSettingsObj.contactPhone = String(contactPhone);
    if (contactEmail !== undefined) globalSettingsObj.contactEmail = String(contactEmail);
    if (adminPasscode !== undefined) globalSettingsObj.adminPasscode = String(adminPasscode);

    saveSettingsToDb(globalSettingsObj);
    res.json({ success: true, message: "Global settings updated successfully!", data: globalSettingsObj });
  });

  app.get("/api/advisors", async (req, res) => {
    if (db) {
      try {
        const colRef = collection(db, "advisors");
        const querySnapshot = await getDocs(colRef);
        const cloudResults: any[] = [];
        querySnapshot.forEach((docSnapshot) => {
          cloudResults.push({ id: docSnapshot.id, ...docSnapshot.data() });
        });
        cloudResults.sort((a, b) => {
          const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return timeB - timeA;
        });
        if (cloudResults.length > 0) {
          return res.json({ success: true, count: cloudResults.length, data: cloudResults });
        }
      } catch (err) {
        handleFirestoreError(err, OperationType.LIST, "advisors");
        console.warn("[FIREBASE] Error loading advisors from Firestore, using local files fallback:", err);
      }
    }
    res.json({ success: true, count: advisorRequests.length, data: advisorRequests });
  });

  app.post("/api/applications/update", async (req, res) => {
    const { id, status, program, track, notes, fullName, email, phone, paymentRef, paymentAmount } = req.body;
    if (!id) {
      return res.status(400).json({ success: false, error: "Application record ID is required." });
    }

    const localIndex = applications.findIndex(a => a.id === id);
    let appData = localIndex !== -1 ? { ...applications[localIndex] } : { id };

    if (status !== undefined) appData.status = status;
    if (program !== undefined) appData.program = program;
    if (track !== undefined) appData.track = track;
    if (notes !== undefined) appData.notes = notes;
    if (fullName !== undefined) appData.fullName = fullName;
    if (email !== undefined) appData.email = email;
    if (phone !== undefined) appData.phone = phone;
    if (paymentRef !== undefined) appData.paymentRef = paymentRef;
    if (paymentAmount !== undefined) appData.paymentAmount = Number(paymentAmount);
    appData.updatedAt = new Date().toISOString();

    if (db) {
      try {
        const docRef = doc(db, "applications", id);
        const { id: _, ...firestorePayload } = appData;
        await setDoc(docRef, firestorePayload, { merge: true });
        console.log(`[FIREBASE] Updated cloud application record: ${id}`);
      } catch (err) {
        handleFirestoreError(err, OperationType.WRITE, `applications/${id}`);
        console.error("[FIREBASE] Failed keyless application update:", err);
      }
    }

    if (localIndex !== -1) {
      applications[localIndex] = appData;
    } else {
      applications.unshift(appData);
    }
    saveApplicationsToDb(applications);

    res.json({ success: true, message: "Application record updated successfully!", data: appData });
  });

  app.post("/api/applications/delete", async (req, res) => {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ success: false, error: "Application record ID is required." });
    }

    if (db) {
      try {
        const docRef = doc(db, "applications", id);
        await deleteDoc(docRef);
        console.log(`[FIREBASE] Deleted cloud record: ${id}`);
      } catch (err) {
        handleFirestoreError(err, OperationType.DELETE, `applications/${id}`);
        console.error("[FIREBASE] Cloud delete error:", err);
      }
    }

    const idx = applications.findIndex(a => a.id === id);
    if (idx !== -1) {
      applications.splice(idx, 1);
      saveApplicationsToDb(applications);
    }

    res.json({ success: true, message: "Application record deleted successfully!" });
  });

  app.post("/api/advisors/update", async (req, res) => {
    const { id, status, notes } = req.body;
    if (!id) {
      return res.status(400).json({ success: false, error: "Advisor record ID is required." });
    }

    const idx = advisorRequests.findIndex(a => a.id === id);
    let requestData = idx !== -1 ? { ...advisorRequests[idx] } : { id };

    if (status !== undefined) requestData.status = status;
    if (notes !== undefined) requestData.notes = notes;
    requestData.updatedAt = new Date().toISOString();

    if (db) {
      try {
        const docRef = doc(db, "advisors", id);
        const { id: _, ...firestorePayload } = requestData;
        await setDoc(docRef, firestorePayload, { merge: true });
        console.log(`[FIREBASE] Updated advisor request ${id} in Cloud`);
      } catch (err) {
        handleFirestoreError(err, OperationType.WRITE, `advisors/${id}`);
        console.error("[FIREBASE] Cloud advisor update error:", err);
      }
    }

    if (idx !== -1) {
      advisorRequests[idx] = requestData;
    } else {
      advisorRequests.unshift(requestData);
    }
    saveAdvisorsToDb(advisorRequests);

    res.json({ success: true, message: "Advisor request updated successfully!", data: requestData });
  });

  app.post("/api/advisors/delete", async (req, res) => {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ success: false, error: "Advisor record ID is required." });
    }

    if (db) {
      try {
        const docRef = doc(db, "advisors", id);
        await deleteDoc(docRef);
        console.log(`[FIREBASE] Deleted cloud advisor record: ${id}`);
      } catch (err) {
        handleFirestoreError(err, OperationType.DELETE, `advisors/${id}`);
        console.error("[FIREBASE] Cloud advice delete error for:", id, err);
      }
    }

    const idx = advisorRequests.findIndex(a => a.id === id);
    if (idx !== -1) {
      advisorRequests.splice(idx, 1);
      saveAdvisorsToDb(advisorRequests);
    }

    res.json({ success: true, message: "Advisor consultation record deleted successfully!" });
  });

  // 1. Get Simulated Admissions list
  app.get("/api/applications", async (req, res) => {
    if (db) {
      try {
        const colRef = collection(db, "applications");
        const q = query(colRef, limit(100));
        const snapshot = await getDocs(q);
        const cloudResults: any[] = [];
        snapshot.forEach((docSnapshot) => {
          cloudResults.push({ id: docSnapshot.id, ...docSnapshot.data() });
        });

        // Sort in memory by createdAt descending
        cloudResults.sort((a, b) => {
          const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return timeB - timeA;
        });

        if (cloudResults.length > 0) {
          return res.json({ success: true, count: cloudResults.length, data: cloudResults });
        }
      } catch (err) {
        handleFirestoreError(err, OperationType.LIST, "applications");
        console.warn("[FIREBASE] Error loading registrations from cloud Firestore, loading local files fallback:", err);
      }
    }
    res.json({ success: true, count: applications.length, data: applications });
  });

  // 2. Post New Admission Application
  app.post("/api/apply", async (req, res) => {
    const { fullName, email, phone, program, track, subProgram, notes, paymentRef, paymentAmount, paymentStatus } = req.body;
    
    if (!fullName || !email || !phone || !program) {
      return res.status(400).json({ success: false, error: "Please provide all required fields." });
    }

    const appId = `APP-${Math.floor(10000 + Math.random() * 90000)}`;
    const newApp = {
      fullName,
      email,
      phone,
      program,
      track: track || "General Talent",
      subProgram: subProgram || "",
      status: paymentStatus === "Paid" ? "Verified & Paid" : "Awaiting Verification",
      notes: notes || "No additional comments.",
      paymentRef: paymentRef || "Direct / Cash Pending",
      paymentAmount: paymentAmount || 0,
      createdAt: new Date().toISOString()
    };

    // Attempt saving to cloud
    if (db) {
      try {
        const docRef = doc(db, "applications", appId);
        await setDoc(docRef, newApp);
        console.log(`[FIREBASE] Saved cloud record ${appId} for ${fullName}`);
      } catch (err) {
        handleFirestoreError(err, OperationType.WRITE, `applications/${appId}`);
        console.error("[FIREBASE] Failed writing cloud record:", err);
      }
    }

    // Backup locally
    const withLocalId = { id: appId, ...newApp };
    applications.unshift(withLocalId);
    saveApplicationsToDb(applications); // Persist securely to JSON database file

    res.json({ success: true, message: "Application submitted successfully and saved to primary database!", data: withLocalId });
  });

  // 3. Post Advisor Call Request
  app.post("/api/contact", async (req, res) => {
    const { name, email, phone, timeFrame, message } = req.body;
    if (!name || !phone) {
      return res.status(400).json({ success: false, error: "Name and Phone values are required." });
    }

    const reqId = `ADV-${Math.floor(100 + Math.random() * 900)}`;
    const request = {
      name,
      email: email || "n/a",
      phone,
      timeFrame: timeFrame || "Immediate",
      message: message || "No comments",
      createdAt: new Date().toISOString()
    };

    // Attempt saving to cloud
    if (db) {
      try {
        const docRef = doc(db, "advisors", reqId);
        await setDoc(docRef, request);
        console.log(`[FIREBASE] Saved cloud advisory record ${reqId}`);
      } catch (err) {
        handleFirestoreError(err, OperationType.WRITE, `advisors/${reqId}`);
        console.error("[FIREBASE] Failed saving advisor to cloud:", err);
      }
    }

    const withLocalId = { id: reqId, ...request };
    advisorRequests.unshift(withLocalId);
    saveAdvisorsToDb(advisorRequests); // Persist securely to JSON database file

    res.json({ success: true, message: "Your advisory consultation request has been lodged! We will contact you shortly.", data: withLocalId });
  });

  // 4. AI Pathway Advisor Route using @google/genai
  app.post("/api/ai-pathfinder", async (req, res) => {
    try {
      const { name, currentLevel, careerGoals, interestedCountry, favoriteTech, preferredSports } = req.body;
      
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey || apiKey === "MY_GEMINI_API_KEY" || apiKey.trim() === "") {
        // Safe fallback in case secrets are not bound, providing a highly comprehensive premium pre-calculated roadmap!
        return res.json({
          success: true,
          isMock: true,
          roadmap: `### 🌟 Welcome, ${name || "Honorable Learner"}! (Demo Mode - Setup Active)
Your UNIVLOVE EDUPLANET custom pathway recommendation has been unlocked through our pre-validated academic matrix.

#### 1. Prevarsity & University Entry 🎓
- **Recommended track:** **JUPEB Premium Direct Entry (200 LEVEL)**
- **Detail:** Gain admission to elite universities directly into 200 Level without JAMB. Ideal for candidates aiming for immediate entry and top academic performance.
- **Accommodation:** VIP Personal Boarding on-site in Ilesa, Osun State with 24/7 internet and personalized mentorship.

#### 2. Advanced Tech Mastery 💻
- **Core Technology:** ${favoriteTech || "Full Stack Software Development & AI Technologies"}
- **Action plan:** Enroll in our intense Tech Academy path, focusing on Cloud computing, modern web structures, and practical APIs.
- **Credentials:** Global talent portfolio creation with personal Github guidance.

#### 3. Global Study Abroad Strategy ✈️
- **Target Country:** ${interestedCountry || "Canada & Germany Pathway Programs"}
- **Pathway:** Joint collaboration on student visa waivers and English proficiency sponsorships (IELTS/TOEFL masterclass included). We optimize your application for admission and merit fellowships.

#### 4. Elite Talent & Sports Expansion ⚽
- **Recommended Sports/Talent:** ${preferredSports || "Creative Tech & Sports Science"}
- **Motto in Action:** *"Advanced Progress is Guaranteed."* Join our Athletics and Digital Entrepreneurship masterclass.

*To activate live personalized AI generated pathplanning feedback, register your production Gemini API Key in AI Studio Secrets.*`
        });
      }

      // Initialize the real GoogleGenAI client (safe server-side implementation)
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          }
        }
      });

      const promptMsg = `You are the lead Academic & Career Pathway Architect at "UNIVLOVE EDUPLANET" (Motto: "Advanced Progress is Guaranteed"). 
Create a detailed, beautiful, inspiring global study and skill development roadmap in markdown format for a student with the following profile:
- Name: ${name || "Valued Scholar"}
- Current Academic Position: ${currentLevel || "High School graduate / Undergraduate student"}
- Professional & Creative Ambitions: ${careerGoals || "Broad Horizon"}
- Study Abroad Destination/Interest: ${interestedCountry || "Undecided / Open to Canada, UK, USA"}
- Favorite Science / Digital Skill Area: ${favoriteTech || "Artificial Intelligence & Coding"}
- Sports/Talent focus: ${preferredSports || "Leadership Development"}

In your guidance:
1. Speak like an elite advisor from a premium university (fusion of Harvard, Oxford, MIT, and FutureLearn).
2. Integrate UNIVLOVE EDUPLANET's specific high-tier programs (Prevarsity JUPEB for Direct Entry into 200L, Tech Digital Skills such as Cybersecurity or Music Production, Global Study Abroad country partnerships like Canada/UK/Germany, and Sports Academy like Football/Basketball).
3. Be highly positive, cinematic, professional, clear, and actionable. Add some inspirational quotes linked to our motto: "Advanced Progress is Guaranteed".
Keep the response structured under beautiful headers, bullet points, and highly professional formatting.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: promptMsg,
      });

      const markdownText = response.text || "Pathway guidance generation completed.";
      res.json({ success: true, isMock: false, roadmap: markdownText });

    } catch (err: any) {
      console.error("Gemini Generation Error:", err);
      res.status(500).json({ success: false, error: err.message || "Failed to contact academic planner." });
    }
  });

async function startServer() {
  const PORT = 3000;

  // Vite development vs production server static serving logic
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[UNIVLOVE EDUPLANET] Server running at http://0.0.0.0:${PORT} in ${process.env.NODE_ENV || 'development'} mode.`);
  });
}

if (!process.env.VERCEL) {
  startServer().catch((err) => {
    console.error("Critical server setup error:", err);
  });
}

export default app;
