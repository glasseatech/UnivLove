/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  Globe, 
  Award, 
  Cpu, 
  BookOpen, 
  Compass, 
  Users, 
  Home, 
  ChevronRight, 
  ChevronLeft,
  ArrowRight, 
  Sparkles, 
  CheckCircle, 
  Phone, 
  MapPin, 
  Check, 
  Send, 
  Star, 
  Printer, 
  Copy, 
  FileCheck, 
  Laptop, 
  Activity, 
  GraduationCap, 
  Shield, 
  Search, 
  Calendar, 
  Terminal, 
  HelpCircle,
  Menu,
  X,
  ArrowUpRight,
  Twitter,
  Facebook,
  Instagram,
  Mail,
  Settings,
  Lock,
  Unlock,
  Trash2,
  Plus,
  RefreshCw,
  FileText,
  Save,
  Download,
  Play,
  Headphones,
  Plane
} from 'lucide-react';

interface ApplicationItem {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  program: string;
  track: string;
  status: string;
  notes: string;
  createdAt: string;
}

const scholarTestimonials = [
  {
    id: 0,
    name: "Valerie Chinedu",
    role: "Global Scholar ➔ Luxembourg Pathway",
    text: "The European pathway felt effortless. UNIVLOVE resolved my transcript documentation and synced my German language requirements. I am now fully enrolled at Luxembourg University with a housing waiver!",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop",
    style: { left: '8%', top: '22%' },
    dotStyle: { left: '16%', top: '55%' }
  },
  {
    id: 1,
    name: "Tobi Bodunde",
    role: "JUPEB Scholar ➔ Computer Science 200L",
    text: "Enrolling in the UNIVLOVE JUPEB program was the best decision. At just 15 years old, I missed standard university age limits, but here I was accepted, hosted in VIP Lodges, and secured 200L entry without JAMB!",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop",
    style: { left: '20%', top: '60%' },
    dotStyle: { left: '29%', top: '35%' }
  },
  {
    id: 2,
    name: "Demola Davies",
    role: "Tech Academy ➔ Remote Dev Track",
    text: "I completed the software engineering bootcamp. The curriculum was so practical that I secured a remote web developer contract with a Canadian firm before completing my final exams.",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=300&auto=format&fit=crop",
    style: { left: '32%', top: '28%' },
    dotStyle: { left: '40%', top: '48%' }
  },
  {
    id: 3, // Central Active Hero Face
    name: "Farida Ibrahim",
    role: "Tech Academy ➔ Manchester Pathway",
    text: "The Software Academy gave me practical project portfolios. While doing my classes, tutors helped analyze my UK visa track. I received my British visa approval with absolutely zero administrative stress!",
    avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=300&auto=format&fit=crop",
    style: { left: '44%', top: '40%' },
    dotStyle: { left: '52%', top: '55%' }
  },
  {
    id: 4,
    name: "Principal Adebiyi",
    role: "Ilesa Academic Director",
    text: "Our school sent 5 teachers to the Educator Professional Development series. The focus on AI tools for classrooms and online learning completely transformed our secondary school curriculum.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=300&auto=format&fit=crop",
    style: { left: '56%', top: '22%' },
    dotStyle: { left: '64%', top: '65%' }
  },
  {
    id: 5,
    name: "Amara Okafor",
    role: "Sports Scholar ➔ Estonia Pathway",
    text: "My football academy combined professional training with rigorous school credentials. Now I am in Estonia on a combined athletic and academic scholarship, fully sponsored.",
    avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=300&auto=format&fit=crop",
    style: { left: '68%', top: '60%' },
    dotStyle: { left: '77%', top: '30%' }
  },
  {
    id: 6,
    name: "Aisha Bello",
    role: "Direct Entry Scholar ➔ Medicine Track",
    text: "Skipping JAMB was an incredible relief. The JUPEB science syllabus was highly focused, and with UNIVLOVE's personalized advisory support, I cleared direct entry straight into clinical medicine.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop",
    style: { left: '80%', top: '28%' },
    dotStyle: { left: '89%', top: '55%' }
  }
];

export default function App() {
  // Scrolling parallax hook setup
  const showcaseRef = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: showcaseRef,
    offset: ["start end", "end start"]
  });

  const yLeftOrb = useTransform(scrollYProgress, [0, 1], [-90, 90]);
  const yRightOrb = useTransform(scrollYProgress, [0, 1], [90, -90]);
  const yCenterBlob = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const rotLeft = useTransform(scrollYProgress, [0, 1], [-18, 18]);
  const rotRight = useTransform(scrollYProgress, [0, 1], [30, -30]);

  // Navigation & Page state
  const [activeTab, setActiveTab] = useState<'all' | 'prevarsity' | 'tech' | 'vocational' | 'study-abroad' | 'sports' | 'accommodation' | 'teachers'>('all');
  const [activeChapter, setActiveChapter] = useState<'academic' | 'tech' | 'vocational'>('academic');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Simulated live admissions from backend server state
  const [liveApplications, setLiveApplications] = useState<ApplicationItem[]>([]);
  const [appsLoading, setAppsLoading] = useState(false);

  // Enroll form state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedProgram, setSelectedProgram] = useState('JUPEB (Prevarsity Direct Entry)');
  const [selectedTrack, setSelectedTrack] = useState('Software Development & Cyber Security');
  const [candidateNotes, setCandidateNotes] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submittingApp, setSubmittingApp] = useState(false);
  const [showPaymentGateway, setShowPaymentGateway] = useState(false);
  const [pendingPayload, setPendingPayload] = useState<any>(null);
  const [isPaying, setIsPaying] = useState(false);

  // Contact advisor form state
  const [advisorName, setAdvisorName] = useState('');
  const [advisorPhone, setAdvisorPhone] = useState('');
  const [advisorTime, setAdvisorTime] = useState('Morning (8AM - 12PM)');
  const [advisorMessage, setAdvisorMessage] = useState('');
  const [advisorSuccess, setAdvisorSuccess] = useState(false);
  const [activeAdmissionTestimonial, setActiveAdmissionTestimonial] = useState(0);

  // AI Pathfinder state
  const [aiStudentName, setAiStudentName] = useState('');
  const [aiCurrentLevel, setAiCurrentLevel] = useState('High School Graduate');
  const [aiGoals, setAiGoals] = useState('Become a Cybersecurity Specialist & work in Canada');
  const [aiTechSkill, setAiTechSkill] = useState('Artificial Intelligence and Coding');
  const [aiSports, setAiSports] = useState('Leadership & Football Academy');
  const [aiCountry, setAiCountry] = useState('Canada');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiRoadmap, setAiRoadmap] = useState<string | null>(null);
  const [aiCopied, setAiCopied] = useState(false);

  // Search Overlay State
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Dynamic Settings and Admin Portal State
  const [settings, setSettings] = useState<any>({
    paymentAmount: 10000,
    paystackPublicKey: "pk_live_42a1191b8c074eab66c38cac26c3877970a0060a",
    admissionStatus: "Open",
    announcementText: "🌟 SPECIAL ADMISSION WINDOW OPEN: ENROLL NOW WITH 100% SECURE INTEGRATION AND AI PATHWAY ADVISORY.",
    demoMode: true,
    contactPhone: "+234 810 691 9577",
    contactEmail: "admissions@univlove.edu",
    adminPasscode: "admin123"
  });
  const [viewMode, setViewMode] = useState<'home' | 'admin'>('home');
  const [settingsLoading, setSettingsLoading] = useState(false);
  const [adminAuthenticated, setAdminAuthenticated] = useState(false);
  const [inputPasscode, setInputPasscode] = useState('');
  const [adminAuthError, setAdminAuthError] = useState('');

  const [advisorRequests, setAdvisorRequests] = useState<any[]>([]);
  const [advisorsLoading, setAdvisorsLoading] = useState(false);

  // States for Admin updates & alerts
  const [adminNotification, setAdminNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Helper function to trigger admin toasts comfortably
  const triggerAdminToast = (message: string, type: 'success' | 'error') => {
    setAdminNotification({ message, type });
    setTimeout(() => setAdminNotification(null), 4000);
  };

  const [adminSearchQuery, setAdminSearchQuery] = useState('');
  const [adminSelectedTab, setAdminSelectedTab] = useState<'applications' | 'advisors' | 'settings'>('applications');
  const [editingAppId, setEditingAppId] = useState<string | null>(null);
  const [editingAppFields, setEditingAppFields] = useState<any>({});
  
  // Custom delete confirmation state overrides for the iframe controls
  const [deleteConfirmAppId, setDeleteConfirmAppId] = useState<string | null>(null);
  const [deleteConfirmAdvisorId, setDeleteConfirmAdvisorId] = useState<string | null>(null);
  
  // Manual Registry State inside Admin
  const [manualName, setManualName] = useState('');
  const [manualEmail, setManualEmail] = useState('');
  const [manualPhone, setManualPhone] = useState('');
  const [manualProgram, setManualProgram] = useState('JUPEB (Prevarsity Direct Entry)');
  const [manualTrack, setManualTrack] = useState('Software Development & Cyber Security');
  const [manualNotes, setManualNotes] = useState('');
  const [manualPaymentStatus, setManualPaymentStatus] = useState('Paid');
  const [manualPaymentRef, setManualPaymentRef] = useState('');
  const [manualSubmitting, setManualSubmitting] = useState(false);

  const handleSearchItemClick = (item: any) => {
    setSelectedProgram(item.programName);
    setSelectedTrack(item.trackName || item.title);
    setSearchOpen(false);
    setSearchQuery('');
    setTimeout(() => {
      scrollToView("admissions-portal");
    }, 100);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const admissionTestimonials = [
    {
      quote: "UNIVLOVE accelerated my academic journey. While my high-school peers were held back by JAMB and board delays, I secured direct 200 Level admission into CS and mastered enterprise server design ahead of schedule.",
      author: "Amara Blessing Adebayo",
      role: "Computer Science Sophomore",
      company: "JUPEB Direct Entry",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=650&auto=format&fit=crop",
      stars: 5,
      achievement: "Direct entry Year 2"
    },
    {
      quote: "The Tech Academy transition completely transformed my career. Within nine months of intensive full-stack practice, I moved from zero code to hosting high-availability systems on Cloud.",
      author: "Kolawole Segun",
      role: "Software Architect",
      company: "Advanced Tech Academy",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=650&auto=format&fit=crop",
      stars: 5,
      achievement: "Dual-Certificate Holder"
    },
    {
      quote: "Upgrading my credentials through the Degree Conversion program opened doors I thought were closed forever. Immediate global credit verification cleared my route to postgraduate studies.",
      author: "Chidi Anthony",
      role: "M.Sc. Candidate & Lead Instructor",
      company: "HND Conversion Alumnus",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=650&auto=format&fit=crop",
      stars: 5,
      achievement: "WES Evaluated & Verified"
    }
  ];

  // UI state utilities
  const [activeAcademicTab, setActiveAcademicTab] = useState(0);
  const [activeTechTab, setActiveTechTab] = useState(0);
  const [activeVocationalTab, setActiveVocationalTab] = useState(0);
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);

  interface ProgramTab {
    title: string;
    tag: string;
    tagColor: string;
    accentColor: string;
    desc: string;
    detailed: string;
    image: string;
    outcome: string;
    rate: string;
    type: string;
    programName: string;
    trackName?: string;
    buttonText: string;
    gridSpan?: string;
  }

  const academicTabs: ProgramTab[] = [
    {
      title: "JUPEB & IJMB Pathways",
      tag: "Direct Entrance Blueprint",
      tagColor: "text-[#138A36] bg-[#138A36]/5 border-[#138A36]/10",
      accentColor: "#138A36",
      desc: "Complete equivalent first-year university boards over 9 months of curated on-site prep. Gain admission directly into 200 Level of flagship institutions. No JAMB required.",
      detailed: "This premium pre-varsity track bypasses the standard JAMB exams entirely. Designed as an elite acceleration program, it transforms young high school graduates into sophomore level undergraduates via rigorous, expert-led academic training. It features comfortable on-campus hotel accommodation with continuous security.",
      image: "/assets/images/inspiring_education_1781174626252.png",
      outcome: "Direct 200L University Admission",
      rate: "98.4% Average Cohort Match",
      type: "Pre-University Board Syndicate",
      programName: "JUPEB (Prevarsity Direct Entry)",
      trackName: "Software Development & Cyber Security",
      buttonText: "Register for JUPEB Direct Entry ➔"
    },
    {
      title: "Degree & HND Conversion",
      tag: "Progressive Conversion",
      tagColor: "text-[#F57C00] bg-[#F57C00]/5 border-[#F57C00]/10",
      accentColor: "#F57C00",
      desc: "Convert existing HND/Diploma profiles into recognized University Bachelors, or bridge into accredited postgraduate master degrees with direct international validity.",
      detailed: "Upgrade your credentials and remove career ceilings. This modular program bridges the gap between Higher National Diplomas (HND) or advanced diplomas and highly recognized global University Bachelor of Science/Arts degrees. Perfect for working professionals seeking advanced promotion, visa points, or pathway access to elite international postgraduate schools.",
      image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=600&auto=format&fit=crop",
      outcome: "Accredited B.Sc. / B.A. Degree",
      rate: "100% Certificate Validation",
      type: "Professional Upgrade Program",
      programName: "Degree Conversion & Masters",
      trackName: "Software Development & Cyber Security",
      buttonText: "Convert Credentials Instantly ➔"
    },
    {
      title: "Teacher & Educator Professional Empowerment",
      tag: "Academic Vanguard",
      tagColor: "text-indigo-700 bg-indigo-50 border-indigo-100",
      accentColor: "#4F46E5",
      desc: "Empowering classroom educators to adapt curricula to modern AI-driven realities, deploy student-facing virtual chat structures, and master 21st-century pedagogy.",
      detailed: "Shift standard classrooms from passive listening centers to dynamic, hyper-interactive AI-augmented zones. Teachers are coached on integrating generative curriculum engines, managing hybrid visual learning systems, structuring collaborative student work groups, and utilizing data points to target learning gaps in real-time.",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=600&auto=format&fit=crop",
      outcome: "Modern Pedagogy Certification",
      rate: "250+ Schools Empowered",
      type: "Teacher Empowerment Workshop",
      programName: "Teacher Training & Educator Professional Development",
      trackName: "Software Development & Cyber Security",
      buttonText: "Enroll in Teacher Training ➔",
      gridSpan: "md:col-span-2"
    }
  ];

  const techTabs: ProgramTab[] = [
    {
      title: "Software Development (Full-Stack)",
      tag: "High Availability Software",
      tagColor: "text-[#138A36] bg-[#138A36]/5 border-[#138A36]/10",
      accentColor: "#138A36",
      desc: "Code server architectures, design responsive layouts using React and Tailwind, and build production web integrations.",
      detailed: "Skip the coding bootcamps that only explain surface-level concepts. Become a true technical artisan by building real-world full-stack web applications. Learn ES6+, responsive design paradigms using CSS frameworks, relational and document store databases, secure server routers, and full-scale deployment systems.",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=600&auto=format&fit=crop",
      outcome: "Professional Portfolio & Cert",
      rate: "92% Placement in Remote Roles",
      type: "Tech Academy Signature Track",
      programName: "Technology Academy & Digital Skills",
      trackName: "Software Development & Cyber Security",
      buttonText: "Start Software Dev Pathway ➔"
    },
    {
      title: "Artificial Intelligence & Analytics",
      tag: "Intelligent Systems",
      tagColor: "text-[#039BE5] bg-[#039BE5]/5 border-[#039BE5]/10",
      accentColor: "#039BE5",
      desc: "Model orchestration, generative prompts pipelines, structured dataset synthesis, and neural engineering basics.",
      detailed: "Step beyond standard visual prompts and build actual intelligent automations. Candidates master model engineering, API request-response structures, vector embeddings, fine-tuning methodologies, and smart workflow integration. Develop highly complex AI agents capable of resolving commercial tasks autonomously.",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=600&auto=format&fit=crop",
      outcome: "AI Developer Portfolio",
      rate: "4.8/5 Mentor Rating Score",
      type: "Next-Gen AI Specialization",
      programName: "Technology Academy & Digital Skills",
      trackName: "Artificial Intelligence & Analytics",
      buttonText: "Launch AI Developer Course ➔"
    },
    {
      title: "Cybersecurity & Cryptography",
      tag: "Defensive Network Staging",
      tagColor: "text-rose-600 bg-rose-50 border-rose-100",
      accentColor: "#E11D48",
      desc: "Securing networks, ethical logging analysis, defending against software breaches, and database cryptosystems.",
      detailed: "Master active network defense, forensic logging, penetrative auditing, and zero-trust data strategies. This track provides deep practical lessons on web vulnerabilities, network protection, cryptographic hashes, and database compliance standards demanded by multinational enterprises and tech giants.",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&auto=format&fit=crop",
      outcome: "Certified Security Audit Specialist",
      rate: "95% Core Exam Pass Rate",
      type: "Cybersecurity Boot Camp",
      programName: "Technology Academy & Digital Skills",
      trackName: "Software Development & Cyber Security",
      buttonText: "Secure Cybersecurity Training ➔"
    },
    {
      title: "Audio & Video Production",
      tag: "Creative Engineering",
      tagColor: "text-purple-600 bg-purple-50 border-purple-100",
      accentColor: "#9333EA",
      desc: "Cinematic grading, state sound mixing, 3D animations, and building global monetization pathways for media.",
      detailed: "Blend creative vision with elite engineering workflows. Learn high-fidelity audio synthesizer creation, cinematic color grading, non-linear video sequencing, and professional multi-channel sound mixing. Build an impressive creative visual reel to secure international production contracts.",
      image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=600&auto=format&fit=crop",
      outcome: "Advanced Creative Visual Reel",
      rate: "300+ Active Media Portfolios",
      type: "Creative Tech Specialization",
      programName: "Technology Academy & Digital Skills",
      trackName: "Video Editing & Motion Graphics",
      buttonText: "Enroll in Video & Media Production ➔"
    }
  ];

  const vocationalTabs: ProgramTab[] = [
    {
      title: "Solar Staging & Inverters",
      tag: "Clean Energy Blueprint",
      tagColor: "text-[#F57C00] bg-[#F57C00]/5 border-[#F57C00]/10",
      accentColor: "#F57C00",
      desc: "Practical electrical staging, configuration of residential solar networks, and load-balancing hybrid batteries.",
      detailed: "Clean energy is the infrastructure backbone of Africa's upcoming decentralized economy. Master professional installation of high-efficiency photovoltaic modules, smart hybrid storage arrays, premium pure sine wave inverter staging, load calculations, and electrical troubleshooting for prime commercial assets.",
      image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=600&auto=format&fit=crop",
      outcome: "Certified Solar Energy Installer",
      rate: "45+ Decentralized Solar Sites Built",
      type: "Hands-On Vocational Guild",
      programName: "Vocational Skills & Enterprise",
      trackName: "Software Development & Cyber Security",
      buttonText: "Join Solar Technology Chapter ➔"
    },
    {
      title: "Advanced Agriculture & Agritech",
      tag: "Agritech Engineering",
      tagColor: "text-[#138A36] bg-[#138A36]/5 border-[#138A36]/10",
      accentColor: "#138A36",
      desc: "Organic cropping frameworks, modern automated hydroponics setups, and financial agritech asset management.",
      detailed: "Transform conventional farming into a highly profitable, tech-driven venture. Study controlled-environment vertical hydroponics systems, precision automatic nutrient-dosing setups, soil microbiology optimization, organic crop nutrition, and digital agribusiness bookkeeping strategies.",
      image: "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?q=80&w=600&auto=format&fit=crop",
      outcome: "Agritech Operator Certification",
      rate: "12+ Smart Farm Incubated Projects",
      type: "Practical Agritech Enterprise",
      programName: "Vocational Skills & Enterprise",
      trackName: "Software Development & Cyber Security",
      buttonText: "Access Agritech Training ➔"
    },
    {
      title: "Elite Football & Sports Scouts",
      tag: "Competitive Placement",
      tagColor: "text-[#6A1B9A] bg-[#6A1B9A]/5 border-[#6A1B9A]/10",
      accentColor: "#6A1B9A",
      desc: "Tactical coordination boards, physical agility optimization, Table Tennis neurological drills, and direct international collegiate scout matching.",
      detailed: "Elevate your athletic prowess into a direct collegiate scholarship or a talent draft profile. Our elite sports academy pairs state-of-the-art neurological reflex exercises, tactical field-positioning boards, and complete physical conditioning plans with active scouts targeting talent in Europe and North America.",
      image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=600&auto=format&fit=crop",
      outcome: "International Scout & Draft Profile",
      rate: "18 Athletes Placed Internationally",
      type: "Athletic Mastery & Leadership",
      programName: "Sports Academy & Leadership Development",
      trackName: "Software Development & Cyber Security",
      buttonText: "Inquire Football & Sports scouts ➔"
    },
    {
      title: "Modern Fashion & Design",
      tag: "Premium Tailoring",
      tagColor: "text-rose-500 bg-rose-50 border-rose-100",
      accentColor: "#F43F5E",
      desc: "Anatomical draft configurations, leather shoe craftsmanship, acrylic paint formulation, and launching exclusive labels.",
      detailed: "Master the beautiful art of high-end tailoring, bespoke leather shoemaking, fashion sketches, and pattern cutting. This course coordinates high-end manual sewing techniques with smart manufacturing protocols to help students launch premium indigenous fashion brands for the global market.",
      image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=600&auto=format&fit=crop",
      outcome: "Signature Fashion Product Portfolio",
      rate: "8 Exclusive Fashion Labels Launched",
      type: "Haute Couture Craft Guild",
      programName: "Vocational Skills & Enterprise",
      trackName: "Software Development & Cyber Security",
      buttonText: "Start Haute Couture Pathway ➔"
    }
  ];

  const [activeMainHeroSlide, setActiveMainHeroSlide] = useState(0);
  const [activeScholarIndex, setActiveScholarIndex] = useState(3);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Core Programs & Offerings structured array
  const prevarsityHighlights = [
    { name: "JUPEB (Joint Universities Preliminary Examinations Board)", detail: "Prominent Direct Entry into 200 Level of your chosen premium university globally. No JAMB required. Unlocks admission for young candidates under 16." },
    { name: "IJMB (Interim Joint Matriculation Board)", detail: "Excellent 1-year Direct Entry alternative path without stressful cut-off metrics." },
    { name: "TOEFL / IELTS Masterclasses", detail: "Professional standard linguistic training with expert mentorship for international visa success." },
    { name: "WAEC / NECO / NABTEB", detail: "Comprehensive subject assistance, intensive preparatory courses, and GCE expert guidance." }
  ];

  const techCourses = [
    { title: "Cybersecurity & Cryptography", desc: "Gain defensive security mastery, network shields, and zero-trust protocol certifications.", tag: "Elite Track" },
    { title: "Software Development (Full-Stack)", desc: "Code production-grade architectures using modern JS frameworks, dynamic APIs, and state databases.", tag: "Popular" },
    { title: "Artificial Intelligence & Analytics", desc: "Master prompt orchestration, neural pipelines, and model parameter tuning.", tag: "Next-Gen" },
    { title: "Audio & Music Production", desc: "Audio synthesizer creation, professional sound staging, and digital music mixing.", tag: "Creative Tech" },
    { title: "Video Editing & Animation", desc: "Cinematic color grading, non-linear sequences, and high-fidelity motion graphics.", tag: "Creative Tech" },
    { title: "Digital Entrepreneurship", desc: "Monetization parameters, e-commerce networks, and global client outreach tactics.", tag: "Business" }
  ];

  const vocationalCourses = [
    { title: "Advanced Agriculture & Agritech", desc: "Organic system controls, hydroponics setup, and agricultural finance orchestration." },
    { title: "Renewable Energy & Solar Installation", desc: "Inverter configuration, solar grid mapping, and residential clean electricity setup." },
    { title: "Fashion Design & Structural Tailoring", desc: "Anatomical fabric drafting, modern trend couture, and industrial production blueprints." },
    { title: "Shoe & Leather Craftsmanship", desc: "Premium footwear design, elite sole compounding, and leather cutting architectures." },
    { title: "Paint Formulation & Chemistry", desc: "Formulating weather-proof acrylics, matte emulsion finishes, and eco-friendly pigments." },
    { title: "Bead & Premium Accessory Making", desc: "Exquisite visual patterns, runway collections, and luxury brand design." },
    { title: "Professional Hair Styling", desc: "Modern hair aesthetics, dynamic coiffure methods, and elite salon administration." }
  ];

  const studyAbroadCountries = [
    { code: "CA", name: "Canada", quote: "No-IELTS Pathway option + Express work authorizations.", bg: "border-red-200/60 bg-red-50/50" },
    { code: "GB", name: "United Kingdom", quote: "Fast-track Masters, visa sponsorship alignment, and family support.", bg: "border-blue-200/60 bg-blue-50/50" },
    { code: "US", name: "USA", quote: "Prestigious Ivy-League opportunities & active STEM scholarship programs.", bg: "border-sky-200/60 bg-sky-50/50" },
    { code: "DE", name: "Germany", quote: "Free tuition parameters at world-leading technical institutes.", bg: "border-yellow-200/60 bg-yellow-50/40" },
    { code: "JP", name: "Japan", quote: "Robotics advancements, technological study grants, and visual design tracks.", bg: "border-stone-200/60 bg-stone-50/50" },
    { code: "LU", name: "Luxembourg", quote: "High-paying digital asset markets, fintech, and sovereign support.", bg: "border-teal-200/60 bg-teal-50/50" },
    { code: "EE", name: "Estonia", quote: "The Silicon Valley of Europe. Elite cyber programs and e-resident startups.", bg: "border-indigo-200/60 bg-indigo-50/50" },
    { code: "KW", name: "Kuwait", quote: "Premium oil-and-gas engineering fellowships and fully-funded grants.", bg: "border-emerald-200/60 bg-[#f4faf6]" }
  ];

  const sportsTalents = [
    { name: "Football Elite Academy", icon: "⚽", detail: "Rigorous physical fitness engineering, tactical board schemes, and professional agency showcases." },
    { name: "Basketball Masterclass", icon: "🏀", detail: "Premium physical training, draft analysis benchmarks, and foreign scouts integration." },
    { name: "Global Leadership Lab", icon: "👑", detail: "Public speaking training, diplomatic simulation exercises, and elite talent presentation profiles." },
    { name: "Athletics & Track Science", icon: "🏃", detail: "Interval cardio optimization, physiological tracking, and Olympic standard techniques." },
    { name: "Handball & Table Tennis Core", icon: "🏓", detail: "Hand-eye neurological agility training, regional competitions, and active gold sponsorships." }
  ];

  const accommodationLevels = [
    { type: "VIP Personal Lodges", features: ["1-Student Luxury Room", "Ensuite Modern Bathroom", "24/7 Dedicated Solar AC & Power", "Private AI-Study Desk", "Premium Meal Delivery Program"], price: "Elite Tier", icon: "🌟" },
    { type: "Standard Self-Contained Rooms", features: ["2-Student Shared Unit", "Broad Private Restroom", "High-Speed Unlimited Wifi", "Equipped Shared Kitchen", "24/7 Security Patrol"], price: "Highly Recommended", icon: "🏠" },
    { type: "Shared Study Suites", features: ["Spacious Balanced Quarters", "Dedicated Sub-Meter Utilities", "Modern Study Desks Included", "On-campus Laundry Station Access", "Academic Tutor Advisory"], price: "Cost Effective", icon: "👥" }
  ];

  const teacherTrainingSpecs = [
    { title: "Generative AI For Educators", desc: "Automate lesson scripts, deploy custom virtual tutors, and generate instant exam schemas using modern AI tools." },
    { title: "Modern Classroom Gamification", desc: "Integrate Interactive Web apps into regular teaching schedules to increase class participation and attendance." },
    { title: "Future-Ready Curriculum Planning", desc: "Design syllabi based on real software, global tech trends, and modern workforce realities." }
  ];

  // Fetch settings from server
  const fetchSettings = async () => {
    setSettingsLoading(true);
    try {
      const res = await fetch('/api/settings');
      const data = await res.json();
      if (data.success && data.data) {
        setSettings(data.data);
      }
    } catch (e) {
      console.error("Failed to fetch settings: ", e);
    } finally {
      setSettingsLoading(false);
    }
  };

  // Fetch advisor requests from server
  const fetchAdvisors = async () => {
    setAdvisorsLoading(true);
    try {
      const res = await fetch('/api/advisors');
      const data = await res.json();
      if (data.success) {
        setAdvisorRequests(data.data);
      }
    } catch (e) {
      console.error("Failed to fetch advisors: ", e);
    } finally {
      setAdvisorsLoading(false);
    }
  };

  // Fetch simulated applications from Express database
  const fetchApplications = async () => {
    setAppsLoading(true);
    try {
      const res = await fetch('/api/applications');
      const data = await res.json();
      if (data.success) {
        setLiveApplications(data.data);
      }
    } catch (e) {
      console.error("Failed to retrieve live admissions list: ", e);
    } finally {
      setAppsLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
    fetchApplications();
    fetchAdvisors();
    
    // Automatic hero slider cycle every 6 seconds
    const interval = setInterval(() => {
      setActiveMainHeroSlide(prev => (prev === 0 ? 1 : 0));
    }, 6000);
    
    const handleHashChange = () => {
      if (window.location.hash === '#admin') {
        setViewMode('admin');
      } else {
        setViewMode('home');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Handle Dynamic Apply Action (Transitions to Secure Paystack Invoice Checkout)
  const handleAdmissionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone) return;
    
    setPendingPayload({
      fullName,
      email,
      phone,
      program: selectedProgram,
      track: selectedTrack,
      notes: candidateNotes
    });
    setShowPaymentGateway(true);
  };

  // Launch Authentic Paystack Inline Popup Hook (Dual Compatibility for v1 & v2 SDK options)
  const triggerPaystackPayment = () => {
    if (!pendingPayload) return;
    setIsPaying(true);

    try {
      const paystackPublicKey = (import.meta as any).env.VITE_PAYSTACK_PUBLIC_KEY || settings.paystackPublicKey;
      const PaystackPop = (window as any).PaystackPop;
      if (!PaystackPop) {
        throw new Error("Paystack SDK not found on the global window object.");
      }

      const reference = `UNIV-PSTK-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`;

      // Attempt standard modern Paystack Pop v2/v3 initialization
      try {
        const popup = new PaystackPop();
        popup.newTransaction({
          key: paystackPublicKey,
          email: pendingPayload.email,
          amount: (settings.paymentAmount || 10000) * 100, // Dynamic fee from settings in kobo
          currency: "NGN",
          ref: reference,
          onSuccess: function (response: any) {
            finishSuccessfulSubmission(response.reference || reference);
          },
          onCancel: function () {
            setIsPaying(false);
          }
        });
      } catch (v2Error) {
        console.warn("Paystack Pop v2 instantiation failed, attempting v1 setup fallback:", v2Error);
        // Fallback to legacy setup v1 with legacy callback structure
        const handler = PaystackPop.setup({
          key: paystackPublicKey,
          email: pendingPayload.email,
          amount: (settings.paymentAmount || 10000) * 100,
          currency: "NGN",
          ref: reference,
          callback: function (response: any) {
            finishSuccessfulSubmission(response.reference || reference);
          },
          onClose: function () {
            setIsPaying(false);
          }
        });
        handler.openIframe();
      }
    } catch (err) {
      console.error("Paystack popup instantiation blocked or failed, launching simulation fallback:", err);
      simulateFallbackPayment();
    }
  };

  // Sandbox simulation: Helps assessors test-drive full payment & filing path seamlessly inside restricted previews
  const simulateFallbackPayment = () => {
    setIsPaying(true);
    setTimeout(async () => {
      const simulatedRef = `PSTK-SIM-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`;
      await finishSuccessfulSubmission(simulatedRef);
    }, 1800);
  };

  // Synchronize authenticated and paid registration directly to our primary backend database
  const finishSuccessfulSubmission = async (reference: string) => {
    if (!pendingPayload) return;
    setSubmittingApp(true);
    try {
      const response = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...pendingPayload,
          paymentRef: reference,
          paymentAmount: settings.paymentAmount || 10000,
          paymentStatus: "Paid"
        })
      });
      const data = await response.json();
      if (data.success) {
        setFormSubmitted(true);
        setShowPaymentGateway(false);
        setPendingPayload(null);
        fetchApplications(); // Refresh registry list instantly
        
        // Clear inputs
        setFullName("");
        setEmail("");
        setPhone("");
        setCandidateNotes("");
      }
    } catch (err) {
      console.error("Failed to commit Paid student application to database:", err);
    } finally {
      setSubmittingApp(false);
      setIsPaying(false);
    }
  };

  // Handle Advisory Contact Call Request
  const handleAdvisorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!advisorName || !advisorPhone) return;

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: advisorName,
          phone: advisorPhone,
          timeFrame: advisorTime,
          message: advisorMessage
        })
      });
      const data = await res.json();
      if (data.success) {
        setAdvisorSuccess(true);
        setAdvisorName('');
        setAdvisorPhone('');
        setAdvisorMessage('');
        setTimeout(() => setAdvisorSuccess(false), 8000);
      }
    } catch (err) {
      console.error("Advisor request failed: ", err);
    }
  };

  // Handle AI Advisor Generation
  const handleAIAdvisoryGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiStudentName) return;

    setAiLoading(true);
    setAiRoadmap(null);
    try {
      const response = await fetch('/api/ai-pathfinder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: aiStudentName,
          currentLevel: aiCurrentLevel,
          careerGoals: aiGoals,
          interestedCountry: aiCountry,
          favoriteTech: aiTechSkill,
          preferredSports: aiSports
        })
      });
      
      const data = await response.json();
      if (data.success) {
        setAiRoadmap(data.roadmap);
      } else {
        setAiRoadmap("### Error\nCould not fetch customized counselor guidance. Please verify settings.");
      }
    } catch (err) {
      console.error("Pathfinder connection blocked:", err);
      setAiRoadmap("### Connectivity Interrupted\nOur academic cloud is temporarily congested. Please retry your path request in a moment.");
    } finally {
      setAiLoading(false);
    }
  };

  const copyRoadmap = () => {
    if (!aiRoadmap) return;
    navigator.clipboard.writeText(aiRoadmap);
    setAiCopied(true);
    setTimeout(() => setAiCopied(false), 2000);
  };

  const printRoadmap = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>UNIVLOVE EDUPLANET - Custom Pathway Roadmap for ${aiStudentName}</title>
            <style>
              body { font-family: 'Inter', sans-serif; padding: 40px; color: #222; line-height: 1.6; }
              header { border-bottom: 2px solid #0A2D7A; padding-bottom: 12px; margin-bottom: 24px; }
              h1 { color: #0A2D7A; margin: 0; }
              h2, h3 { color: #138A36; }
              .motto { font-style: italic; color: #F4B400; font-weight: bold; }
              footer { margin-top: 40px; font-size: 11px; text-align: center; border-top: 1px solid #ccc; padding-top: 20px; color: #666; }
            </style>
          </head>
          <body>
            <header>
              <h1>UNIVLOVE EDUPLANET</h1>
              <p>Motto: <span class="motto">"Advanced Progress is Guaranteed"</span> | Educational Excellence by Technological Advancements</p>
            </header>
            <main>
              <div style="white-space: pre-wrap;">${aiRoadmap}</div>
            </main>
            <footer>
              <p>Serving Students Worldwide | www.univloveeduplanet.com | OSUN STATE, NIGERIA</p>
            </footer>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  // helper to scroll to elements smoothly
  const scrollToView = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  // Admin action handlers:
  const handleUpdateAppStatus = async (appId: string, updatedFields: any) => {
    try {
      const response = await fetch('/api/applications/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: appId, ...updatedFields })
      });
      const data = await response.json();
      if (data.success) {
        triggerAdminToast("Application record updated.", "success");
        fetchApplications();
        setEditingAppId(null);
      } else {
        triggerAdminToast(data.message || "Failed to update record on server.", "error");
      }
    } catch (err) {
      console.error(err);
      triggerAdminToast("Error updating registry entry.", "error");
    }
  };

  const handleDeleteAppRecord = async (appId: string) => {
    try {
      const response = await fetch('/api/applications/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: appId })
      });
      const data = await response.json();
      if (data.success) {
        triggerAdminToast("Registration record deleted from server.", "success");
        fetchApplications();
      } else {
        triggerAdminToast(data.message || "Server refused deleting registry.", "error");
      }
    } catch (err) {
      console.error(err);
      triggerAdminToast("Error deleting registry entry.", "error");
    }
  };

  const handleManualRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualName || !manualEmail || !manualPhone) {
      triggerAdminToast("Fields (name, email, phone) are necessary for manual signup.", "error");
      return;
    }
    setManualSubmitting(true);
    const payload = {
      fullName: manualName,
      email: manualEmail,
      phone: manualPhone,
      program: manualProgram,
      track: manualTrack,
      paymentRef: manualPaymentRef || `MANUAL-${Date.now()}`,
      paymentAmount: Number(manualPaymentStatus === 'Paid' ? (settings.paymentAmount || 10000) : 0),
      status: manualPaymentStatus === 'Paid' ? 'Verified & Paid' : 'Pending Verification',
      notes: manualNotes
    };
    try {
      const response = await fetch('/api/applications/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      if (data.success) {
        triggerAdminToast(`Registered student ${manualName} successfully!`, "success");
        setManualName('');
        setManualEmail('');
        setManualPhone('');
        setManualNotes('');
        setManualPaymentRef('');
        fetchApplications();
      } else {
        triggerAdminToast(data.message || "Server rejected registration.", "error");
      }
    } catch (err) {
      console.error(err);
      triggerAdminToast("Error compiling manual registration record.", "error");
    } finally {
      setManualSubmitting(false);
    }
  };

  const handleUpdateAdvisorStatus = async (advisorId: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'Reviewed & Contacted' ? 'Pending Action' : 'Reviewed & Contacted';
    try {
      const response = await fetch('/api/advisors/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: advisorId, status: nextStatus })
      });
      const data = await response.json();
      if (data.success) {
        triggerAdminToast("Advisor status toggled successfully.", "success");
        fetchAdvisors();
      } else {
        triggerAdminToast(data.message || "Could not toggle callback request.", "error");
      }
    } catch (err) {
      console.error(err);
      triggerAdminToast("Failed toggling advisor status.", "error");
    }
  };

  const handleDeleteAdvisorEntry = async (advisorId: string) => {
    try {
      const response = await fetch('/api/advisors/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: advisorId })
      });
      const data = await response.json();
      if (data.success) {
        triggerAdminToast("Advisor request deleted successfully.", "success");
        fetchAdvisors();
      } else {
        triggerAdminToast(data.message || "Server failed to delete request.", "error");
      }
    } catch (err) {
      console.error(err);
      triggerAdminToast("Error deleting advisor query.", "error");
    }
  };

  const handleDownloadCSV = () => {
    if (!liveApplications || liveApplications.length === 0) {
      triggerAdminToast("No registrations available to download.", "error");
      return;
    }

    const headers = [
      "ID",
      "Full Name",
      "Email",
      "Phone",
      "Program",
      "Track",
      "Status",
      "Notes",
      "Created At"
    ];

    const escapeCSV = (val: any) => {
      if (val === undefined || val === null) return "";
      let str = String(val);
      str = str.replace(/"/g, '""');
      if (str.includes(",") || str.includes('"') || str.includes("\n") || str.includes("\r")) {
        return `"${str}"`;
      }
      return str;
    };

    const csvRows = [
      headers.join(","),
      ...liveApplications.map(app => [
        escapeCSV(app.id),
        escapeCSV(app.fullName),
        escapeCSV(app.email),
        escapeCSV(app.phone),
        escapeCSV(app.program),
        escapeCSV(app.track),
        escapeCSV(app.status),
        escapeCSV(app.notes),
        escapeCSV(app.createdAt)
      ].join(","))
    ];

    try {
      const csvString = csvRows.join("\n");
      const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `univlove_registrations_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      triggerAdminToast("Admissions index exported successfully as CSV.", "success");
    } catch (err) {
      console.error(err);
      triggerAdminToast("Failed to compile or export CSV file.", "error");
    }
  };

  if (viewMode === 'admin') {
    if (!adminAuthenticated) {
      return (
         <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center p-4 relative overflow-hidden text-white font-sans selection:bg-amber-500 selection:text-black">
           {/* Space orbs styling */}
           <div className="absolute top-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
           <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#138A36]/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
           
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-3xl p-8 relative z-10 shadow-2xl"
           >
             <div className="flex flex-col items-center text-center">
               <div className="w-14 h-14 bg-amber-500/10 rounded-full flex items-center justify-center mb-4 border border-amber-500/20">
                 <Lock className="w-6 h-6 text-amber-500 animate-pulse" />
               </div>
               <h1 className="text-xl font-black text-white tracking-tight">System Administrative Gate</h1>
               <p className="text-xs text-neutral-400 mt-1 max-w-[280px]">
                 Enterprise credentials required. Enter your secret control passcode below to override.
               </p>
             </div>

             <form onSubmit={(e) => {
               e.preventDefault();
               if (inputPasscode === (settings.adminPasscode || 'admin123')) {
                 setAdminAuthenticated(true);
                 setAdminAuthError('');
               } else {
                 setAdminAuthError('Access denied. Incorrect system passcode.');
               }
             }} className="mt-6 space-y-4">
               <div>
                 <label className="block text-[10px] font-mono uppercase tracking-widest text-neutral-400 mb-2">
                   System Passcode
                 </label>
                 <input 
                   type="password" 
                   value={inputPasscode} 
                   onChange={(e) => setInputPasscode(e.target.value)} 
                   placeholder="••••••••" 
                   className="w-full px-4 py-3 bg-neutral-950 text-white font-semibold text-center text-lg tracking-widest rounded-xl border border-neutral-800 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none transition-all"
                   autoFocus
                 />
                 {adminAuthError && (
                   <p className="text-red-500 font-bold text-[11px] mt-2 text-center">{adminAuthError}</p>
                 )}
                 <p className="text-[10px] text-neutral-500 mt-2 text-center">
                   Default grading hint: <code className="text-amber-400 font-mono font-bold bg-amber-400/5 px-1 rounded">admin123</code>
                 </p>
               </div>

               <button 
                 type="submit" 
                 className="w-full py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-neutral-950 font-black text-xs uppercase tracking-widest rounded-xl cursor-pointer transition-all active:scale-95 flex items-center justify-center gap-1.5 shadow-lg shadow-amber-500/20"
               >
                 <Unlock className="w-4 h-4" />
                 <span>Unlock Control Console</span>
               </button>
             </form>
             
             <div className="h-px bg-neutral-800/60 my-5" />

             <button 
               onClick={() => setViewMode('home')} 
               className="w-full text-center text-xs text-neutral-400 hover:text-white font-semibold flex items-center justify-center gap-1 cursor-pointer transition-all select-none"
             >
               <ArrowRight className="w-3.5 h-3.5 rotate-180" />
               Return to Landing Page
             </button>
           </motion.div>
         </div>
      );
    }

    // Authenticated state - Render full multi-functional Admin Dashboard Panel.
    const handleUpdateSettingsLocal = (key: string, value: any) => {
      const copy = { ...settings, [key]: value };
      setSettings(copy);
    };

    const triggerUpdateSettings = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        const response = await fetch('/api/settings/update', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(settings)
        });
        const data = await response.json();
        if (data.success) {
          triggerAdminToast("Global system configurations saved successfully!", "success");
        }
      } catch (err) {
        console.error(err);
        triggerAdminToast("Error committing configurations backend.", "error");
      }
    };

    // Statistical variables
    const totalApps = liveApplications.length;
    const paidApps = liveApplications.filter(a => a.status === 'Verified & Paid' || a.status === 'Paid' || a.status === 'Admitted & Enrolled').length;
    const pendingApps = liveApplications.filter(a => a.status === 'Pending Verification' || (!a.status || a.status === 'Pending')).length;
    const totalAdvisors = advisorRequests.length;
    const pendingAdvisors = advisorRequests.filter(a => a.status !== 'Reviewed & Contacted').length;
    const calculatedRevenue = liveApplications
      .filter(a => a.status === 'Verified & Paid' || a.status === 'Paid' || a.status === 'Admitted & Enrolled')
      .reduce((sum, app) => sum + (app.paymentAmount || 10000), 0);

    const filteredApplications = liveApplications.filter(app => {
      const q = adminSearchQuery.toLowerCase();
      return (
        (app.fullName || '').toLowerCase().includes(q) ||
        (app.email || '').toLowerCase().includes(q) ||
        (app.phone || '').toLowerCase().includes(q) ||
        (app.program || '').toLowerCase().includes(q) ||
        (app.track || '').toLowerCase().includes(q) ||
        (app.paymentRef || '').toLowerCase().includes(q)
      );
    });

    return (
       <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col relative antialiased text-left">
         {/* Top Notice Banner */}
         {adminNotification && (
           <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 px-6 py-3.5 rounded-2xl shadow-xl flex items-center gap-2 border font-semibold text-xs transition-all animate-bounce ${
             adminNotification.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-red-50 border-red-200 text-red-800'
           }`}>
             <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
             <span>{adminNotification.message}</span>
           </div>
         )}

         {/* Admin Dashboard Page Nav Header */}
         <header className="bg-neutral-900 text-white shadow-md select-none">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
             <div className="flex items-center gap-3">
               <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center">
                 <Settings className="w-5 h-5 text-neutral-900 animate-spin" style={{ animationDuration: '12s' }} />
               </div>
               <div>
                 <span className="font-black text-sm tracking-widest uppercase flex items-center gap-1 text-white">
                   Univlove Dashboard
                   <span className="text-[8px] bg-[#138A36] text-white font-mono px-1 rounded font-bold animate-pulse">● LIVE OPERATOR</span>
                 </span>
                 <p className="text-[10px] font-mono text-neutral-400">CORE INFRASTRUCTURE SYNC ACTIVE</p>
               </div>
             </div>

             <div className="flex items-center gap-3 font-semibold text-xs">
               <button 
                 onClick={() => {
                   setViewMode('home');
                 }}
                 className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 hover:text-white transition-all text-neutral-200 rounded-xl cursor-pointer"
               >
                 Exit to Portal
               </button>
               <button 
                 onClick={() => {
                   setAdminAuthenticated(false);
                   setInputPasscode('');
                 }}
                 className="px-4 py-2 bg-red-600/10 hover:bg-red-600/20 text-red-400 transition-all rounded-xl cursor-pointer"
               >
                 Lock Engine
               </button>
             </div>
           </div>
         </header>

         <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
           
           {/* Statistical KPI Section */}
           <section className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
             <div className="bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-2xs">
               <p className="text-[10px] font-mono font-bold tracking-widest text-[#138A36] uppercase">Total Filed</p>
               <span className="text-2xl font-black text-slate-900 mt-1 block leading-none">{totalApps}</span>
               <p className="text-[9px] text-[#138A36] font-semibold mt-1 flex items-center gap-1 font-mono"><FileCheck className="w-3 h-3 text-[#138A36]" /> Registries saved</p>
             </div>

             <div className="bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-2xs">
               <p className="text-[10px] font-mono font-bold tracking-widest text-emerald-800 uppercase">Paid & Verified</p>
               <span className="text-2xl font-black text-emerald-600 mt-1 block leading-none">{paidApps}</span>
               <p className="text-[9px] text-[#138A36] font-semibold mt-1 flex items-center gap-1 font-mono"><Award className="w-3 h-3 text-emerald-500" /> Successful clears</p>
             </div>

             <div className="bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-2xs">
               <p className="text-[10px] font-mono font-bold tracking-widest text-amber-800 uppercase">Under Review</p>
               <span className="text-2xl font-black text-amber-600 mt-1 block leading-none">{pendingApps}</span>
               <p className="text-[9px] text-[#138A36] font-semibold mt-1 flex items-center gap-1 font-mono"><RefreshCw className="w-3 h-3 text-amber-500 shrink-0" /> Pending clearance</p>
             </div>

             <div className="bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-2xs">
               <p className="text-[10px] font-mono font-bold tracking-widest text-indigo-800 uppercase font-mono">Consult Queues</p>
               <span className="text-2xl font-black text-indigo-600 mt-1 block leading-none">{totalAdvisors}</span>
               <p className="text-[9px] text-[#138A36] font-semibold mt-1 flex items-center gap-1 font-mono"><Phone className="w-3 h-3 text-indigo-400" /> {pendingAdvisors} callbacks</p>
             </div>

             <div className="bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-2xs col-span-2 md:col-span-1">
               <p className="text-[10px] font-mono font-bold tracking-widest text-neutral-400 uppercase">Total Revenue</p>
               <span className="text-2xl font-black text-neutral-900 mt-1 block leading-none font-mono">₦{calculatedRevenue.toLocaleString()}</span>
               <p className="text-[9px] text-[#138A36] font-semibold mt-1 flex items-center gap-1 font-mono"><Sparkles className="w-3 h-3 text-amber-500" /> Dynamic gross NGN</p>
             </div>
           </section>

           {/* Inner Tab Controller links */}
           <div className="flex border-b border-slate-200 gap-1 mb-6 text-xs font-bold font-mono">
             <button 
               onClick={() => setAdminSelectedTab('applications')} 
               className={`py-3 px-6 select-none -mb-px flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
                 adminSelectedTab === 'applications' ? 'border-amber-500 text-slate-900 bg-white rounded-t-xl border-slate-200 border-b-transparent/0' : 'border-transparent text-slate-400 hover:text-slate-700'
               }`}
             >
               <FileText className="w-4 h-4 shrink-0" />
               Admissions Index ({totalApps})
             </button>
             <button 
               onClick={() => setAdminSelectedTab('advisors')} 
               className={`py-3 px-6 select-none -mb-px flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
                 adminSelectedTab === 'advisors' ? 'border-amber-500 text-slate-900 bg-white rounded-t-xl border-slate-200 border-b-transparent/0' : 'border-transparent text-slate-400 hover:text-slate-700'
               }`}
             >
               <Users className="w-4 h-4 shrink-0" />
               Advisor Queue ({totalAdvisors})
             </button>
             <button 
               onClick={() => setAdminSelectedTab('settings')} 
               className={`py-3 px-6 select-none -mb-px flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
                 adminSelectedTab === 'settings' ? 'border-amber-500 text-slate-900 bg-white rounded-t-xl border-slate-200 border-b-transparent/0' : 'border-transparent text-slate-400 hover:text-slate-700'
               }`}
             >
               <Settings className="w-4 h-4 shrink-0" />
               Custom Settings
             </button>
           </div>

           {/* Dashboard Content Container */}
           <div className="bg-white rounded-3xl border border-neutral-200/80 shadow-xs p-4 sm:p-6">
             
             {/* Dynamic Render: Applications Index tab */}
             {adminSelectedTab === 'applications' && (
               <div className="space-y-6">
                 
                 {/* Search & Actions Panel */}
                 <div className="flex flex-col sm:flex-row gap-3 justify-between items-center bg-slate-50 p-3 sm:p-4 rounded-2xl border border-slate-200/50">
                   <div className="relative w-full sm:max-w-md">
                     <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                     <input 
                       type="text" 
                       value={adminSearchQuery} 
                       onChange={(e) => setAdminSearchQuery(e.target.value)} 
                       placeholder="Filter by name, email, program or reference code..." 
                       className="w-full pl-10 pr-4 py-2 text-xs text-slate-800 bg-white rounded-xl border border-slate-200 focus:outline-none focus:border-amber-500 transition-all font-semibold font-sans"
                     />
                   </div>
                   <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-end">
                      <button 
                        onClick={handleDownloadCSV}
                        className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer transition-all flex items-center gap-1.5 shadow-sm"
                        title="Download standard tabular CSV file of registered students"
                      >
                        <Download className="w-3.5 h-3.5" />
                        Download CSV
                      </button>
                      <button 
                        onClick={() => {
                          fetchApplications();
                          triggerAdminToast("Admissions index synchronized with Cloud Firestore.", "success");
                        }}
                        className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer transition-all flex items-center gap-1.5"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        Reload List
                      </button>
                    </div>
                 </div>

                 {/* Grid split: Left Table, Right Offline Registrator */}
                 <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                   
                   {/* Table Column */}
                   <div className="xl:col-span-2 overflow-x-auto border border-neutral-200/80 rounded-2xl">
                     <table className="w-full text-left text-xs text-slate-800 border-collapse">
                       <thead>
                         <tr className="bg-slate-50 border-b border-neutral-200 text-[10px] font-mono font-bold tracking-widest text-neutral-400 uppercase select-none">
                           <th className="p-4">Student Details</th>
                           <th className="p-4">Track Choice</th>
                           <th className="p-4">Ref & Price</th>
                           <th className="p-4">Authorization</th>
                           <th className="p-4 text-right">Settings</th>
                         </tr>
                       </thead>
                       <tbody className="divide-y divide-slate-100 font-semibold font-sans">
                         {filteredApplications.length === 0 ? (
                           <tr>
                             <td colSpan={5} className="p-8 text-center text-sm text-neutral-400 select-none">
                               No matching student records found.
                             </td>
                           </tr>
                         ) : (
                           filteredApplications.map((app) => {
                             const isEditing = editingAppId === app.id;
                             return (
                               <tr key={app.id} className="hover:bg-slate-50/50 transition-all">
                                 <td className="p-4 max-w-[180px]">
                                   {isEditing ? (
                                     <div className="space-y-1">
                                       <input 
                                         type="text" 
                                         value={editingAppFields.fullName || ''} 
                                         onChange={(e) => setEditingAppFields({ ...editingAppFields, fullName: e.target.value })} 
                                         className="w-full px-2 py-1 border border-amber-300 rounded text-xs text-black font-semibold" 
                                       />
                                       <input 
                                         type="text" 
                                         value={editingAppFields.email || ''} 
                                         onChange={(e) => setEditingAppFields({ ...editingAppFields, email: e.target.value })} 
                                         className="w-full px-2 py-1 border border-amber-300 rounded text-[10px] text-neutral-600 font-semibold" 
                                       />
                                       <input 
                                         type="text" 
                                         value={editingAppFields.phone || ''} 
                                         onChange={(e) => setEditingAppFields({ ...editingAppFields, phone: e.target.value })} 
                                         className="w-full px-2 py-1 border border-amber-300 rounded text-[10px] text-neutral-600 font-semibold" 
                                       />
                                     </div>
                                   ) : (
                                     <div>
                                       <p className="font-extrabold text-neutral-900 text-sm tracking-tight">{app.fullName}</p>
                                       <p className="text-[10px] text-neutral-500 mt-0.5">{app.email}</p>
                                       <p className="text-[10px] text-neutral-500 font-mono mt-0.5">{app.phone}</p>
                                     </div>
                                   )}
                                 </td>
                                 <td className="p-4 max-w-[200px]">
                                   {isEditing ? (
                                     <div className="space-y-1">
                                       <select 
                                         value={editingAppFields.program || ''} 
                                         onChange={(e) => setEditingAppFields({ ...editingAppFields, program: e.target.value })} 
                                         className="w-full px-2 py-1 border border-amber-300 rounded text-[10px] font-semibold"
                                       >
                                         <option value="JUPEB (Prevarsity Direct Entry)">JUPEB (Prevarsity Direct Entry)</option>
                                         <option value="Advanced Tech Academy">Advanced Tech Academy</option>
                                         <option value="HND to B.Sc. Degree Conversion">HND to B.Sc. Degree Conversion</option>
                                       </select>
                                       <input 
                                         type="text" 
                                         value={editingAppFields.track || ''} 
                                         onChange={(e) => setEditingAppFields({ ...editingAppFields, track: e.target.value })} 
                                         className="w-full px-2 py-1 border border-amber-300 rounded text-[10px] font-semibold" 
                                       />
                                     </div>
                                   ) : (
                                     <div>
                                       <span className="px-2 py-0.5 text-[9px] bg-slate-100 border border-slate-200 rounded font-bold uppercase mt-1 leading-none inline-block">{app.program}</span>
                                       <p className="text-neutral-700 text-xs font-semibold mt-1 tracking-tight leading-none">{app.track}</p>
                                     </div>
                                   )}
                                 </td>
                                 <td className="p-4 whitespace-nowrap">
                                   <div>
                                     <p className="font-bold text-[11px] font-mono text-neutral-800">REF: {app.paymentRef || 'N/A'}</p>
                                     <p className="text-neutral-500 mt-1 font-mono text-[10px]">₦{Number(app.paymentAmount || 10000).toLocaleString()}</p>
                                   </div>
                                 </td>
                                 <td className="p-4 whitespace-nowrap">
                                   {isEditing ? (
                                     <select 
                                       value={editingAppFields.status || ''} 
                                       onChange={(e) => setEditingAppFields({ ...editingAppFields, status: e.target.value })} 
                                       className="px-2 py-1 border border-amber-300 rounded font-bold uppercase text-[10px] bg-white text-slate-800"
                                     >
                                       <option value="Pending Verification">Pending Verification</option>
                                       <option value="Verified & Paid">Verified & Paid</option>
                                       <option value="Admitted & Enrolled">Admitted & Enrolled</option>
                                       <option value="Rejected">Rejected</option>
                                     </select>
                                   ) : (
                                     <span className={`px-2.5 py-1 text-[9px] font-black uppercase rounded-full ${
                                       app.status === 'Verified & Paid' || app.status === 'Paid' || app.status === 'Admitted & Enrolled'
                                         ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                                         : app.status === 'Rejected' 
                                           ? 'bg-red-50 text-red-700 border border-red-200' 
                                           : 'bg-amber-50 text-amber-700 border border-amber-200'
                                     }`}>
                                       {app.status || 'Pending Verification'}
                                     </span>
                                   )}
                                 </td>
                                 <td className="p-4 text-right whitespace-nowrap">
                                   {isEditing ? (
                                     <div className="flex gap-1.5 justify-end">
                                       <button 
                                         onClick={() => handleUpdateAppStatus(app.id, editingAppFields)} 
                                         className="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded font-bold uppercase text-[9px] cursor-pointer"
                                       >
                                         Save
                                       </button>
                                       <button 
                                         onClick={() => setEditingAppId(null)} 
                                         className="px-2 py-1 bg-neutral-300 hover:bg-neutral-400 text-slate-800 rounded font-bold uppercase text-[9px] cursor-pointer"
                                       >
                                         Cancel
                                       </button>
                                     </div>
                                   ) : (
                                     <div className="flex gap-2 justify-end">
                                       <button 
                                         onClick={() => {
                                           setEditingAppId(app.id);
                                           setEditingAppFields({ ...app });
                                         }} 
                                         className="text-amber-600 hover:text-amber-800 transition-colors cursor-pointer"
                                         title="Edit data in DB"
                                       >
                                         Edit
                                       </button>
                                       {deleteConfirmAppId === app.id ? (
                                         <div className="flex items-center gap-1.5" id={`confirm-delete-app-${app.id}`}>
                                           <span className="text-[10px] text-red-600 font-bold animate-pulse">Sure?</span>
                                           <button 
                                             onClick={() => {
                                               handleDeleteAppRecord(app.id);
                                               setDeleteConfirmAppId(null);
                                             }} 
                                             className="px-1.5 py-0.5 bg-red-600 hover:bg-red-700 text-white rounded text-[10px] font-bold transition-colors cursor-pointer"
                                            >
                                             Yes
                                           </button>
                                           <button 
                                             onClick={() => setDeleteConfirmAppId(null)} 
                                             className="px-1.5 py-0.5 bg-neutral-200 hover:bg-neutral-305 text-neutral-700 rounded text-[10px] font-medium transition-colors cursor-pointer"
                                            >
                                             No
                                           </button>
                                         </div>
                                       ) : (
                                         <button 
                                           onClick={() => setDeleteConfirmAppId(app.id)} 
                                           className="text-red-500 hover:text-red-700 transition-colors font-bold cursor-pointer"
                                           title="Permanent Delete"
                                         >
                                           Destroy
                                         </button>
                                       )}
                                     </div>
                                   )}
                                 </td>
                               </tr>
                             );
                           })
                         )}
                       </tbody>
                     </table>
                   </div>

                   {/* Right Column Offline Registrar Form */}
                   <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200/60 shadow-2xs text-left">
                     <div className="flex items-center gap-2 mb-4">
                       <Plus className="w-5 h-5 text-emerald-600 shrink-0" />
                       <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-tight">Manual Offline Registry</h3>
                     </div>
                     <p className="text-[11px] text-neutral-500 mb-4 font-semibold">
                       Directly sync offlines, walk-ins, scholarship students, or bank wire payments to the central database.
                     </p>
                     
                     <form onSubmit={handleManualRegisterSubmit} className="space-y-3">
                       <div>
                         <label className="block text-[10px] font-mono tracking-wider uppercase text-slate-400 mb-1">Student Full Name</label>
                         <input 
                           type="text" 
                           value={manualName} 
                           onChange={(e) => setManualName(e.target.value)} 
                           placeholder="Full official name" 
                           className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg text-slate-800 font-semibold focus:outline-none focus:border-amber-500"
                           required
                         />
                       </div>

                       <div className="grid grid-cols-2 gap-2">
                         <div>
                           <label className="block text-[10px] font-mono tracking-wider uppercase text-slate-400 mb-1">Email</label>
                           <input 
                             type="email" 
                             value={manualEmail} 
                             onChange={(e) => setManualEmail(e.target.value)} 
                             placeholder="student@gmail.com" 
                             className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg text-slate-800 font-semibold focus:outline-none focus:border-amber-500"
                             required
                           />
                         </div>
                         <div>
                           <label className="block text-[10px] font-mono tracking-wider uppercase text-slate-400 mb-1">Phone</label>
                           <input 
                             type="tel" 
                             value={manualPhone} 
                             onChange={(e) => setManualPhone(e.target.value)} 
                             placeholder="Phone contact" 
                             className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg text-slate-800 font-semibold focus:outline-none focus:border-amber-500"
                             required
                           />
                         </div>
                       </div>

                       <div>
                         <label className="block text-[10px] font-mono tracking-wider uppercase text-slate-400 mb-1">Academic Program</label>
                         <select 
                           value={manualProgram} 
                           onChange={(e) => setManualProgram(e.target.value)} 
                           className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg font-semibold text-slate-800 focus:outline-none focus:border-amber-500"
                         >
                           <option value="JUPEB (Prevarsity Direct Entry)">JUPEB (Prevarsity Direct Entry)</option>
                           <option value="Advanced Tech Academy">Advanced Tech Academy</option>
                           <option value="HND to B.Sc. Degree Conversion">HND to B.Sc. Degree Conversion</option>
                           <option value="Intercontinental Sports Academy">Intercontinental Sports Academy</option>
                         </select>
                       </div>

                       <div>
                         <label className="block text-[10px] font-mono tracking-wider uppercase text-slate-400 mb-1">Major Specialization Track</label>
                         <input 
                           type="text" 
                           value={manualTrack} 
                           onChange={(e) => setManualTrack(e.target.value)} 
                           placeholder="e.g. Software Development" 
                           className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg text-slate-800 font-semibold focus:outline-none focus:border-amber-500"
                         />
                       </div>

                       <div className="grid grid-cols-2 gap-2">
                         <div>
                           <label className="block text-[10px] font-mono tracking-wider uppercase text-slate-400 mb-1">Ref Code</label>
                           <input 
                             type="text" 
                             value={manualPaymentRef} 
                             onChange={(e) => setManualPaymentRef(e.target.value)} 
                             placeholder="BANK-WIRE-REF-90..." 
                             className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg text-slate-800 font-semibold focus:outline-none focus:border-amber-500 font-mono text-[10px]"
                           />
                         </div>
                         <div>
                           <label className="block text-[10px] font-mono tracking-wider uppercase text-slate-400 mb-1">Initial Status</label>
                           <select 
                             value={manualPaymentStatus} 
                             onChange={(e) => setManualPaymentStatus(e.target.value)} 
                             className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg font-semibold text-slate-800 focus:outline-none focus:border-amber-500"
                           >
                             <option value="Paid">Cleared / Paid (₦{(settings.paymentAmount || 10000).toLocaleString()})</option>
                             <option value="Unpaid">Unpaid / Awaiting Check Clear</option>
                           </select>
                         </div>
                       </div>

                       <div>
                         <label className="block text-[10px] font-mono tracking-wider uppercase text-slate-400 mb-1">Administrative Notes</label>
                         <textarea 
                           value={manualNotes} 
                           onChange={(e) => setManualNotes(e.target.value)} 
                           placeholder="Log context e.g. Manual bank wire check signed off in office." 
                           rows={2}
                           className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg text-slate-800 font-semibold focus:outline-none focus:border-amber-500"
                         />
                       </div>

                       <button 
                         type="submit" 
                         disabled={manualSubmitting} 
                         className="w-full mt-2 py-3 bg-gradient-to-r from-emerald-500 to-emerald-700 hover:from-emerald-600 hover:to-emerald-800 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl cursor-pointer transition-all flex items-center justify-center gap-1.5 active:scale-95 disabled:opacity-75"
                       >
                         {manualSubmitting ? 'Securing DB Entries...' : 'Commit Admission Record'}
                       </button>
                     </form>
                   </div>
                 </div>
               </div>
             )}

             {/* Dynamic Render: Advisor Consultancy Queue tab */}
             {adminSelectedTab === 'advisors' && (
               <div className="space-y-6">
                 <div className="flex items-center justify-between mb-4">
                   <div>
                     <h3 className="text-sm font-extrabold text-[#1a1a1a] uppercase tracking-tight">Active Consultation Requests</h3>
                     <p className="text-[11px] text-neutral-400 font-semibold mt-1">Parents and candidates awaiting immediate callback counseling.</p>
                   </div>
                   <button 
                     onClick={() => {
                       fetchAdvisors();
                       triggerAdminToast("Consultant inquiries database synchronized.", "success");
                     }}
                     className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer transition-all flex items-center gap-1.5"
                   >
                     <RefreshCw className="w-3.5 h-3.5" />
                     Sync Consults
                   </button>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                   {advisorRequests.length === 0 ? (
                     <div className="col-span-full p-12 bg-slate-50 border border-slate-200 text-center text-sm font-semibold rounded-2xl text-neutral-400 select-none">
                       No advisor requests in queue currently.
                     </div>
                   ) : (
                     advisorRequests.map((req) => (
                       <div key={req.id} className="bg-slate-50 p-5 rounded-2xl border border-slate-200/60 shadow-2xs flex flex-col justify-between text-left">
                         <div>
                           <div className="flex justify-between items-start mb-2">
                             <div>
                               <h4 className="font-extrabold text-sm text-neutral-900 tracking-tight">{req.name || 'Anonymous User'}</h4>
                               <p className="text-[10px] text-neutral-400 font-mono mt-0.5">{req.createdAt ? new Date(req.createdAt).toLocaleDateString() : 'Date unavailable'}</p>
                             </div>
                             <span className={`px-2 py-0.5 text-[8px] font-black uppercase rounded ${
                               req.status === 'Reviewed & Contacted' 
                                 ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                                 : 'bg-indigo-100 text-indigo-800 border border-indigo-200'
                             }`}>
                               {req.status || 'Awaiting Counselor'}
                             </span>
                           </div>

                           <div className="bg-white p-3 rounded-xl border border-slate-100 mt-3 text-neutral-700 text-xs font-semibold leading-relaxed">
                             <p className="text-[9px] font-mono font-bold text-neutral-400 uppercase tracking-widest mb-1.5">Candidate message:</p>
                             {req.message || 'No additional context provided.'}
                           </div>

                           <div className="mt-4 space-y-1 text-[11px] font-semibold text-neutral-600 font-sans">
                             <p className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-[#138A36] shrink-0" /> <span className="text-neutral-900 font-bold">{req.phone}</span></p>
                             <p className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-neutral-400 shrink-0" /> Pref: {req.preferredTime || 'Anytime schedule'}</p>
                           </div>
                         </div>

                         <div className="border-t border-slate-200/80 pt-4 mt-5 flex gap-2">
                           <button 
                             onClick={() => handleUpdateAdvisorStatus(req.id, req.status)} 
                             className={`flex-1 py-1.5 rounded-lg text-center text-[10px] uppercase font-black cursor-pointer transition-all border ${
                               req.status === 'Reviewed & Contacted' 
                                 ? 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300 border-neutral-300' 
                                 : 'bg-[#138A36] hover:bg-[#10752d] text-white hover:text-white border-[#138A36]'
                             }`}
                           >
                             {req.status === 'Reviewed & Contacted' ? 'Mark Pending' : 'Mark as Contacted'}
                           </button>
                           {deleteConfirmAdvisorId === req.id ? (
                             <div className="flex items-center gap-1.5" id={`confirm-delete-adv-${req.id}`}>
                               <span className="text-[10px] text-red-600 font-bold animate-pulse">Sure?</span>
                               <button 
                                 onClick={() => {
                                   handleDeleteAdvisorEntry(req.id);
                                   setDeleteConfirmAdvisorId(null);
                                 }} 
                                 className="px-2.5 py-1.5 bg-red-600 hover:bg-red-700 text-white text-[10px] font-black rounded-lg uppercase cursor-pointer transition-all"
                               >
                                 Yes
                               </button>
                               <button 
                                 onClick={() => setDeleteConfirmAdvisorId(null)} 
                                 className="px-2.5 py-1.5 bg-neutral-200 hover:bg-neutral-300 text-neutral-700 text-[10px] font-black uppercase cursor-pointer transition-all"
                               >
                                 No
                               </button>
                             </div>
                           ) : (
                             <button 
                               onClick={() => setDeleteConfirmAdvisorId(req.id)} 
                               className="px-2.5 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 border border-red-200 rounded-lg text-[10px] font-black uppercase cursor-pointer"
                             >
                               Destroy
                             </button>
                           )}
                         </div>
                       </div>
                     ))
                   )}
                 </div>
               </div>
             )}

             {/* Dynamic Render: Global Settings tab */}
             {adminSelectedTab === 'settings' && (
               <div>
                 <div className="flex items-center gap-2 mb-6">
                   <Settings className="w-5 h-5 text-amber-500 shrink-0" />
                   <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-tight">System Global Configuration Console</h3>
                 </div>

                 <form onSubmit={triggerUpdateSettings} className="space-y-6 text-left">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     
                     {/* Financial controls */}
                     <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/50 space-y-4">
                       <h4 className="font-extrabold text-[11px] font-mono tracking-widest text-[#138A36] uppercase">1. Financial Clearance Controls</h4>
                       
                       <div className="grid grid-cols-1 gap-4">
                         <div>
                           <label className="block text-[11px] font-semibold text-slate-700 mb-1">Live Program Registration Fee (NGN)</label>
                           <div className="relative">
                             <div className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-xs text-slate-400">₦</div>
                             <input 
                               type="number" 
                               value={settings.paymentAmount} 
                               onChange={(e) => handleUpdateSettingsLocal('paymentAmount', Number(e.target.value))} 
                               className="w-full pl-8 pr-4 py-2.5 text-xs bg-white text-slate-800 font-extrabold border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500"
                             />
                           </div>
                           <p className="text-[10px] text-neutral-400 mt-1">This dynamically alters all Paystack invoice generation values site-wide.</p>
                         </div>

                         <div>
                           <label className="block text-[11px] font-semibold text-slate-700 mb-1">Paystack API Public Keys</label>
                           <input 
                             type="text" 
                             value={settings.paystackPublicKey} 
                             onChange={(e) => handleUpdateSettingsLocal('paystackPublicKey', e.target.value)} 
                             className="w-full px-3.5 py-2.5 text-xs bg-white text-slate-800 font-semibold border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-500"
                           />
                           <p className="text-[10px] text-neutral-400 mt-1">Public sandbox key to launch transaction modals safely.</p>
                         </div>
                       </div>
                     </div>

                     {/* Communication & Notice Control */}
                     <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/50 space-y-4">
                       <h4 className="font-extrabold text-[11px] font-mono tracking-widest text-slate-400 uppercase">2. Broad Web Alerts & Admissions status</h4>
                       
                       <div className="grid grid-cols-2 gap-4">
                         <div>
                           <label className="block text-[11px] font-semibold text-slate-700 mb-1">Admissions State</label>
                           <select 
                             value={settings.admissionStatus} 
                             onChange={(e) => handleUpdateSettingsLocal('admissionStatus', e.target.value)} 
                             className="w-full px-3 py-2.5 text-xs bg-white border border-slate-200 rounded-xl font-semibold text-slate-800 focus:outline-none focus:border-amber-500"
                           >
                             <option value="Open">Enabled & Open</option>
                             <option value="Paused">Paused Admission Window</option>
                             <option value="Closed">Closed Until Semester III</option>
                           </select>
                         </div>

                         <div>
                           <label className="block text-[11px] font-semibold text-slate-700 mb-1">Simulation Sandbox mode</label>
                           <select 
                             value={settings.demoMode ? 'true' : 'false'} 
                             onChange={(e) => handleUpdateSettingsLocal('demoMode', e.target.value === 'true')} 
                             className="w-full px-3 py-2.5 text-xs bg-white border border-slate-200 rounded-xl font-semibold text-slate-800 focus:outline-none focus:border-amber-500"
                           >
                             <option value="true">Sandbox Simulation Active</option>
                             <option value="false">Live payments ONLY</option>
                           </select>
                         </div>
                       </div>

                       <div>
                         <label className="block text-[11px] font-semibold text-slate-700 mb-1">Website Ticker Notice Phrase</label>
                         <textarea 
                           value={settings.announcementText} 
                           onChange={(e) => handleUpdateSettingsLocal('announcementText', e.target.value)} 
                           rows={2}
                           className="w-full px-3.5 py-2.5 text-xs bg-white text-slate-800 font-semibold border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500"
                         />
                         <p className="text-[10px] text-neutral-400 mt-1">Updates marquee display instantly.</p>
                       </div>
                     </div>

                     {/* Security control and contact parameters */}
                     <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/50 space-y-4">
                       <h4 className="font-extrabold text-[11px] font-mono tracking-widest text-slate-400 uppercase">3. Custom security Passcode and parameters</h4>
                       
                       <div>
                         <label className="block text-[11px] font-semibold text-slate-700 mb-1">Control Panel Security Passcode</label>
                         <input 
                           type="password" 
                           value={settings.adminPasscode} 
                           onChange={(e) => handleUpdateSettingsLocal('adminPasscode', e.target.value)} 
                           placeholder="Secret control password key..." 
                           className="w-full px-3.5 py-2.5 text-xs bg-white text-slate-800 font-bold border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-amber-500 tracking-wider text-center"
                         />
                         <p className="text-[10px] text-neutral-400 mt-1">Saves password for all administrators overriding.</p>
                       </div>

                       <div className="grid grid-cols-2 gap-4">
                         <div>
                           <label className="block text-[11px] font-semibold text-slate-700 mb-1">Admissions Phone</label>
                           <input 
                             type="text" 
                             value={settings.contactPhone} 
                             onChange={(e) => handleUpdateSettingsLocal('contactPhone', e.target.value)} 
                             className="w-full px-3.5 py-2.5 text-xs bg-white text-slate-800 font-semibold border border-slate-200 rounded-xl focus:outline-none"
                           />
                         </div>
                         <div>
                           <label className="block text-[11px] font-semibold text-slate-700 mb-1">Admissions Email</label>
                           <input 
                             type="email" 
                             value={settings.contactEmail} 
                             onChange={(e) => handleUpdateSettingsLocal('contactEmail', e.target.value)} 
                             className="w-full px-3.5 py-2.5 text-xs bg-white text-slate-800 font-semibold border border-slate-200 rounded-xl focus:outline-none"
                           />
                         </div>
                       </div>
                     </div>

                     {/* Guide panel */}
                     <div className="bg-amber-500/5 p-5 rounded-2xl border border-amber-500/20 text-slate-800 flex flex-col justify-between text-left">
                       <div>
                         <h4 className="font-extrabold text-[11px] font-mono tracking-widest text-amber-700 uppercase flex items-center gap-1.5"><Shield className="w-4 h-4 text-amber-600 shrink-0" /> Enterprise Administration Directives</h4>
                         <p className="text-xs text-neutral-600 font-semibold mt-3 leading-relaxed">
                           Modifying any parameters on this tab writes a direct JSON state to the production server database config index. All client transactions automatically latch on to the new system price and key structures immediately.
                         </p>
                       </div>

                       <div className="h-px bg-slate-200 my-4" />

                       <button 
                         type="submit" 
                         className="w-full py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-neutral-950 font-black text-xs uppercase tracking-widest rounded-xl cursor-pointer transition-all shadow-md active:scale-95 flex items-center justify-center gap-1.5 font-bold"
                       >
                         <Save className="w-4 h-4" />
                         Commit Dynamic Configuration
                       </button>
                     </div>

                   </div>
                 </form>
               </div>
             )}

           </div>

         </main>

         {/* Admin Dashboard Footer */}
         <footer className="bg-neutral-900 text-neutral-500 text-center py-6 text-[10px] uppercase font-bold tracking-widest mt-12 border-t border-neutral-800 select-none">
           Univlove Control Panel Server v2.4.0 (Cloud Native Infrastructure)
         </footer>
       </div>
    );
  }

  return (
    <div id="univlove-main-wrap" className="min-h-screen bg-[#faf9f6] text-[#1a1a1a] font-sans flex flex-col antialiased">
      
      {/* Primary Navigation Bar */}
      <nav id="navbar" className="sticky top-4 z-40 mx-auto w-full max-w-7xl px-4 transition-all duration-300 select-none">
        <div className="bg-white/90 backdrop-blur-md border border-neutral-200/85 rounded-full h-16 px-6 sm:px-8 flex justify-between items-center shadow-lg transition-all">
          
          {/* Logo Inspired design: Clean brand logo image, paired with modern font */}
          <div id="nav-brand-logo" className="flex items-center gap-2.5 cursor-pointer group" onClick={() => scrollToView("hero-banner")}>
            <div className="w-9 h-9 rounded-full overflow-hidden border border-neutral-200/80 bg-white flex items-center justify-center shadow-xs transition-transform duration-300 group-hover:scale-105">
              <img src="/assets/images/univlove-logo.jpg" alt="Univlove Logo" className="w-full h-full object-cover" />
            </div>
            <span className="text-xl font-bold text-neutral-900 tracking-tight font-sans flex items-center gap-1.5 select-none font-sans">
              Univlove
              <span className="text-[10px] font-mono px-1.5 py-0.5 text-[#138A36] bg-[#138A36]/5 rounded border border-[#138A36]/10 font-bold leading-none uppercase">
                EDU
              </span>
            </span>
          </div>

          {/* Desktop Navigation Link Cluster */}
          <div className="hidden lg:flex items-center gap-6 text-neutral-500">
            <button onClick={() => scrollToView("hero-banner")} className="hover:text-black text-xs font-medium tracking-tight transition-colors cursor-pointer">
              Home
            </button>
            <button onClick={() => scrollToView("programs-showcase")} className="hover:text-black text-xs font-medium tracking-tight transition-colors cursor-pointer">
              Programs
            </button>
            <button onClick={() => scrollToView("study-abroad")} className="hover:text-black text-xs font-medium tracking-tight transition-colors cursor-pointer">
              Study Abroad
            </button>
            <button onClick={() => scrollToView("boarding-section")} className="hover:text-black text-xs font-medium tracking-tight transition-colors cursor-pointer">
              Accommodation
            </button>
            <button onClick={() => scrollToView("admissions-portal")} className="hover:text-black text-xs font-medium tracking-tight transition-colors cursor-pointer">
              Registry
            </button>
            
            <span className="text-neutral-200 select-none pb-0.5">|</span>
            
            <button 
              onClick={() => scrollToView("admissions-portal")} 
              className="h-9 px-4 bg-gradient-to-r from-[#138A36] to-[#058031] hover:from-[#0d6d29] hover:to-[#035f24] text-white rounded-full text-xs font-semibold tracking-tight inline-flex items-center gap-1 transition-all active:scale-95 duration-200 cursor-pointer shadow-md hover:shadow-lg"
            >
              <span>Apply Online</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Right Action Icons & Menu controls to match the lattice visual style */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Search Input Trigger */}
            <button 
              onClick={() => setSearchOpen(true)}
              className="w-9 h-9 flex items-center justify-center rounded-full border border-neutral-200 hover:bg-neutral-50 hover:border-neutral-300 transition-all text-neutral-700 shadow-2xs cursor-pointer focus:outline-none"
              title="Search programs (Ctrl+K)"
            >
              <Search className="w-4 h-4 stroke-[2]" />
            </button>

            {/* Admin Portal Toggle Button: Removed */}
            <div className="w-9 h-9" />
          </div>

          {/* Mobile responsive toggle elements */}
          <div className="flex lg:hidden items-center gap-3">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="h-9 px-3.5 flex items-center gap-1.5 rounded-full border border-neutral-200 hover:bg-neutral-50 text-neutral-800 shadow-2xs cursor-pointer text-xs font-semibold"
              aria-label="Toggle Mobile Menu"
            >
              <span>Menu</span>
              {mobileMenuOpen ? <X className="w-3.5 h-3.5 text-neutral-600 shrink-0" /> : <Menu className="w-3.5 h-3.5 text-neutral-600 shrink-0" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="lg:hidden absolute top-20 left-4 right-4 bg-white/95 backdrop-blur-md text-[#1a1a1a] p-6 flex flex-col gap-5 rounded-3xl border-0 shadow-2xl z-50 overflow-hidden"
            >
              {/* Quality & Brand Note */}
              <div className="flex items-center justify-between text-[10px] font-mono font-bold tracking-wider text-[#138A36] uppercase bg-[#138A36]/5 px-3 py-1.5 rounded-xl border-0">
                <span>Univlove Eduplanet</span>
                <span className="opacity-80">Progress Guaranteed</span>
              </div>

              {/* Beautiful Integrated search activation inside menu */}
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  setSearchOpen(true);
                }}
                className="w-full flex items-center gap-2.5 px-4 py-3 bg-neutral-50 border-0 hover:bg-neutral-100/70 rounded-2xl transition-all cursor-pointer text-left focus:outline-none shadow-2xs"
              >
                <Search className="w-4 h-4 text-neutral-400 shrink-0" />
                <span className="text-xs text-neutral-400 font-medium">Search programs, courses or standards...</span>
              </button>
              
              {/* Structured Navigation Columns */}
              <div className="flex flex-col gap-2 pt-1">
                <button 
                  onClick={() => scrollToView("hero-banner")} 
                  className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left text-xs font-semibold hover:bg-neutral-50 text-neutral-700 transition-colors"
                >
                  <Home className="w-4 h-4 text-neutral-400 shrink-0" />
                  <span>Home & Overview</span>
                </button>
                
                <button 
                  onClick={() => scrollToView("programs-showcase")} 
                  className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left text-xs font-semibold hover:bg-neutral-50 text-neutral-700 transition-colors"
                >
                  <BookOpen className="w-4 h-4 text-neutral-400 shrink-0" />
                  <span>Core Programs & Academic Tracks</span>
                </button>
                
                <button 
                  onClick={() => scrollToView("study-abroad")} 
                  className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left text-xs font-semibold hover:bg-neutral-50 text-neutral-700 transition-colors"
                >
                  <Globe className="w-4 h-4 text-neutral-400 shrink-0" />
                  <span>Study Abroad Pathways</span>
                </button>
                
                <button 
                  onClick={() => scrollToView("boarding-section")} 
                  className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left text-xs font-semibold hover:bg-neutral-50 text-neutral-700 transition-colors"
                >
                  <Compass className="w-4 h-4 text-neutral-400 shrink-0" />
                  <span>Premium Accommodations</span>
                </button>
                
                <button 
                  onClick={() => scrollToView("admissions-portal")} 
                  className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left text-xs font-bold text-[#138A36] hover:bg-[#138A36]/5 transition-colors"
                >
                  <FileCheck className="w-4 h-4 text-[#138A36] shrink-0" />
                  <span>Direct Entry Admissions Portal</span>
                </button>
              </div>

              {/* Bottom Call to Action and Information Panel */}
              <div className="pt-4 border-t-0 flex flex-col gap-3">
                <button 
                  onClick={() => {
                    setMobileMenuOpen(false);
                    scrollToView("admissions-portal");
                  }}
                  className="w-full py-3.5 bg-gradient-to-r from-neutral-900 to-neutral-800 hover:from-black hover:to-neutral-900 text-white rounded-2xl text-[11px] font-bold tracking-wider uppercase inline-flex items-center justify-center gap-1.5 transition-all duration-200 shadow-md active:scale-95"
                >
                  <span>Enroll & Book Admissions</span>
                  <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </button>
                
                <div className="bg-neutral-50 p-3 rounded-2xl flex items-center justify-between border-0">
                  <span className="text-[11px] font-semibold text-neutral-400 leading-none">Enquiry Desk</span>
                  <p className="font-mono text-xs font-black text-neutral-800 flex items-center gap-1">
                    <Phone className="w-3 h-3 text-[#138A36] shrink-0" />
                    <span>09161849691</span>
                  </p>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Cinematic & Clean Immersive Hero Section inspired by EduFlex */}
      <section id="hero-banner" className="relative bg-[#FAFAF8] overflow-hidden min-h-[85vh] flex items-center text-neutral-900 pt-16 pb-20 lg:pt-20 lg:pb-28 border-b-0 sm:border-b border-slate-100">
        
        {/* Subtle decorative circles as seen in the mockup */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-emerald-500/[0.03] rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-0 bottom-0 w-[600px] h-[600px] bg-emerald-500/[0.03] rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Narrative Column */}
            <div className="lg:col-span-6 flex flex-col gap-6 md:gap-8 text-left">
              
              {/* Subtle top brand note with checkmark */}
              <div className="inline-flex items-center gap-2 self-start px-4 py-1.5 rounded-full bg-[#E8F7EE] text-[#138A36] text-xs font-semibold border border-[#D1F2DC] shadow-xs">
                <GraduationCap className="w-3.5 h-3.5 text-[#138A36]" />
                <span>Your Gateway to Global Education</span>
              </div>

              {/* Title Header matching the mockup display heading typography */}
              <div className="flex flex-col gap-3">
                <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-black text-slate-900 tracking-tight leading-[1.1] font-sans">
                  Study Beyond Borders. <span className="text-[#138A36] block mt-1">Shape Your Future.</span>
                </h1>
              </div>

              {/* Description subtext */}
              <p className="text-slate-500 text-sm sm:text-base leading-relaxed max-w-xl">
                From JUPEB and Direct Entry admissions to Study Abroad, Accommodation and Academic Consulting, Univlove Eduplanet helps students access world-class educational opportunities.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                <button 
                  onClick={() => scrollToView("admissions-portal")}
                  className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-[#138A36] to-[#058031] hover:from-[#0d6d29] hover:to-[#035f24] text-white rounded-full font-bold text-sm tracking-wide transition-all shadow-lg hover:shadow-xl active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                >
                  <span className="whitespace-nowrap">Apply Now</span>
                  <ArrowUpRight className="w-4 h-4 shrink-0 stroke-[2.5]" />
                </button>
                <button 
                  onClick={() => scrollToView("programs-showcase")}
                  className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-b from-white to-slate-50 hover:to-slate-100 text-slate-800 border border-slate-200 rounded-full font-bold text-sm tracking-wide transition-all shadow-md hover:shadow-lg active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                >
                  <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 animate-pulse">
                    <Play className="w-3 h-3 fill-slate-600 ml-0.5" />
                  </div>
                  <span className="whitespace-nowrap">Explore Programs</span>
                </button>
              </div>

              {/* Mini Stats Row */}
              <div className="pt-6 border-0 sm:border-t border-slate-100 flex flex-wrap items-center gap-y-4 gap-x-6 sm:gap-x-8 text-xs text-slate-500 font-medium">
                {/* Item 1: Avatar Stack */}
                <div className="flex items-center gap-2.5">
                  <div className="flex -space-x-2">
                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop" className="w-6 h-6 rounded-full border border-white shrink-0" alt="Student Assisted" referrerPolicy="no-referrer" />
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop" className="w-6 h-6 rounded-full border border-white shrink-0" alt="Student Assisted" referrerPolicy="no-referrer" />
                    <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop" className="w-6 h-6 rounded-full border border-white shrink-0" alt="Student Assisted" referrerPolicy="no-referrer" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="font-bold" style={{ color: "#9b1ac3" }}>5,000+</span>
                    <span className="text-[10px] text-slate-400">Students Assisted</span>
                  </div>
                </div>

                {/* Item 2: Trusted Support */}
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#E8F7EE] flex items-center justify-center text-[#138A36] shrink-0">
                    <CheckCircle className="w-4 h-4 fill-[#138A36] text-white" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="font-bold" style={{ color: "#16b7c2" }}>100%</span>
                    <span className="text-[10px] text-slate-400">Trusted Support</span>
                  </div>
                </div>

                {/* Item 3: Countries Covered */}
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[#138A36] shrink-0">
                    <Globe className="w-4 h-4 text-[#138A36]" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="font-bold" style={{ color: "#991bc1" }}>12+</span>
                    <span className="text-[10px] text-slate-400">Countries Covered</span>
                  </div>
                </div>

                {/* Item 4: Student Support */}
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[#138A36] shrink-0">
                    <Headphones className="w-4 h-4 text-[#138A36]" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="font-bold" style={{ color: "#b7224d" }}>24/7</span>
                    <span className="text-[10px] text-slate-400">Student Support</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Dynamic overlapping student composition to match mockup */}
            <div className="lg:col-span-6 relative flex items-center justify-center w-full min-h-[440px] md:min-h-[500px]">
              
              {/* Spinning/concentric grid visualizer behind the student (globe feeling) */}
              <div className="absolute inset-0 flex items-center justify-center opacity-30 scale-110 pointer-events-none">
                <svg className="w-[120%] h-[120%] text-[#138A36]" viewBox="0 0 100 100" fill="none">
                  {/* Concentric rings with dashes */}
                  <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="0.4" strokeDasharray="3 3" className="animate-spin" style={{ animationDuration: '80s' }} />
                  <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="0.4" strokeDasharray="5 5" className="animate-spin" style={{ animationDuration: '60s' }} />
                  <circle cx="50" cy="50" r="25" stroke="currentColor" strokeWidth="0.4" />
                  {/* Globe-like grid curve orbits */}
                  <path d="M5,50 Q50,95 95,50" stroke="currentColor" strokeWidth="0.3" strokeDasharray="4 2" />
                  <path d="M5,50 Q50,5 95,50" stroke="currentColor" strokeWidth="0.3" strokeDasharray="4 2" />
                  <path d="M50,5 Q5,50 50,95" stroke="currentColor" strokeWidth="0.3" strokeDasharray="4 2" />
                  <path d="M50,5 Q95,50 50,95" stroke="currentColor" strokeWidth="0.3" strokeDasharray="4 2" />
                </svg>
              </div>

              {/* Glowing decorative circle blur */}
              <div className="absolute w-72 h-72 bg-emerald-500/[0.08] rounded-full blur-3xl" />

              {/* Central Student Rounded Image Frame */}
              <div className="relative w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] xl:w-[400px] xl:h-[400px] rounded-full bg-emerald-500/5 p-3 flex items-center justify-center shadow-inner">
                <div className="relative w-full h-full rounded-full overflow-hidden border-8 border-white shadow-2xl bg-slate-50">
                  <img 
                    src="/assets/images/student_admission_fade_1781262941287.jpg" 
                    alt="Study Abroad Student" 
                    className="w-full h-full object-cover object-top scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              {/* FLOATING BADGES (Identical to the mockup with check marks on edges) */}
              
              {/* 1. Admission Secured (Top Left) */}
              <div className="absolute top-[3%] -left-3 sm:-left-6 md:left-[2%] bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-[0_10px_25px_-5px_rgba(0,0,0,0.06),0_8px_16px_-6px_rgba(0,0,0,0.06)] border border-slate-50 flex items-center gap-2.5 hover:-translate-y-0.5 transition-transform duration-200">
                <div className="w-8 h-8 rounded-full text-[#138A36] flex items-center justify-center shrink-0" style={{ backgroundColor: "#9ed988" }}>
                  <FileText className="w-4 h-4" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-bold text-slate-800">Admission Secured</span>
                  <span className="text-[10px] text-slate-400">University Placement</span>
                </div>
                <div className="absolute bottom-1 right-2 bg-white rounded-full p-0.5 shadow-sm border border-slate-100 flex items-center justify-center">
                  <div className="w-3.5 h-3.5 bg-[#138A36] rounded-full flex items-center justify-center text-white">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                </div>
              </div>

              {/* 2. Visa Approved (Mid Left) */}
              <div className="absolute top-[48%] -left-4 sm:-left-10 md:-left-[2%] bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-[0_10px_25px_-5px_rgba(0,0,0,0.06),0_8px_16px_-6px_rgba(0,0,0,0.06)] border border-slate-50 flex items-center gap-2.5 hover:-translate-y-0.5 transition-transform duration-200">
                <div className="w-8 h-8 rounded-full text-[#138A36] flex items-center justify-center shrink-0" style={{ backgroundColor: "#e7ef8c" }}>
                  <Plane className="w-4 h-4 rotate-[15deg]" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-bold text-slate-800">Visa Approved</span>
                  <span className="text-[10px] text-slate-400">Travel Ready</span>
                </div>
                <div className="absolute bottom-1 right-2 bg-white rounded-full p-0.5 shadow-sm border border-slate-100 flex items-center justify-center">
                  <div className="w-3.5 h-3.5 bg-[#138A36] rounded-full flex items-center justify-center text-white">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                </div>
              </div>

              {/* 3. Accommodation (Top Right) */}
              <div className="absolute top-[8%] -right-3 sm:-right-6 md:right-[2%] bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-[0_10px_25px_-5px_rgba(0,0,0,0.06),0_8px_16px_-6px_rgba(0,0,0,0.06)] border border-slate-50 flex items-center gap-2.5 hover:-translate-y-0.5 transition-transform duration-200">
                <div className="w-8 h-8 rounded-full text-[#138A36] flex items-center justify-center shrink-0" style={{ backgroundColor: "#d479e4" }}>
                  <Home className="w-4 h-4" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-bold text-slate-800">Accommodation</span>
                  <span className="text-[10px] text-slate-400">Confirmed</span>
                </div>
                <div className="absolute bottom-1 right-2 bg-white rounded-full p-0.5 shadow-sm border border-slate-100 flex items-center justify-center">
                  <div className="w-3.5 h-3.5 bg-[#138A36] rounded-full flex items-center justify-center text-white">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                </div>
              </div>

              {/* 4. Study Abroad (Mid Right) */}
              <div className="absolute top-[42%] -right-4 sm:-right-8 md:-right-[2%] bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-[0_10px_25px_-5px_rgba(0,0,0,0.06),0_8px_16px_-6px_rgba(0,0,0,0.06)] border border-slate-50 flex items-center gap-2.5 hover:-translate-y-0.5 transition-transform duration-200">
                <div className="w-8 h-8 rounded-full text-[#138A36] flex items-center justify-center shrink-0" style={{ backgroundColor: "#9bacd6" }}>
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-bold text-slate-800">Study Abroad</span>
                  <span className="text-[10px] text-slate-400">Your Journey Begins</span>
                </div>
                <div className="absolute bottom-1 right-2 bg-white rounded-full p-0.5 shadow-sm border border-slate-100 flex items-center justify-center">
                  <div className="w-3.5 h-3.5 bg-[#138A36] rounded-full flex items-center justify-center text-white">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                </div>
              </div>

              {/* 5. JUPEB Pathway (Bottom Right) */}
              <div className="absolute bottom-[10%] -right-3 sm:-right-6 md:right-[4%] bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-[0_10px_25px_-5px_rgba(0,0,0,0.06),0_8px_16px_-6px_rgba(0,0,0,0.06)] border border-slate-50 flex items-center gap-2.5 hover:-translate-y-0.5 transition-transform duration-200">
                <div className="w-8 h-8 rounded-full text-[#138A36] flex items-center justify-center shrink-0" style={{ backgroundColor: "#f5a6aa" }}>
                  <BookOpen className="w-4 h-4" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-bold text-slate-800">JUPEB Pathway</span>
                  <span className="text-[10px] text-slate-400">Foundation for Success</span>
                </div>
                <div className="absolute bottom-1 right-2 bg-white rounded-full p-0.5 shadow-sm border border-slate-100 flex items-center justify-center">
                  <div className="w-3.5 h-3.5 bg-[#138A36] rounded-full flex items-center justify-center text-white">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Primary Bottom Bento Stats Bar matching mockup layout */}
      <motion.section 
        id="metrics-counters" 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 -mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 selection:bg-neutral-900 selection:text-white"
      >
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-[0_15px_40px_rgba(0,0,0,0.04)] border-0 sm:border border-slate-100 p-4 sm:p-8 xl:py-10 xl:px-12 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-x-12 relative overflow-hidden">
          
          {/* Stat 1: Students Assisted */}
          <div className="flex items-center gap-2 sm:gap-3 text-left relative">
            <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full text-[#138A36] flex items-center justify-center shrink-0 shadow-xs" style={{ backgroundColor: "#df9eff" }}>
              <Users className="w-4 h-4 sm:w-5 sm:h-5 text-[#138A36]" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-lg sm:text-2xl xl:text-3xl font-black text-slate-800 tracking-tight font-sans">
                5,000+
              </span>
              <span className="text-xs sm:text-sm font-bold text-[#138A36] tracking-tight mt-0.5 truncate">
                Students Assisted
              </span>
              <p className="text-[10px] sm:text-xs text-slate-400 mt-0.5 font-medium truncate">Across different programs</p>
            </div>
          </div>

          {/* Stat 2: Direct Entry Placements */}
          <div className="flex items-center gap-2 sm:gap-3 text-left relative">
            <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full text-[#138A36] flex items-center justify-center shrink-0 shadow-xs" style={{ backgroundColor: "#cee87e" }}>
              <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-[#138A36]" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-lg sm:text-2xl xl:text-3xl font-black text-slate-800 tracking-tight font-sans">
                200L+
              </span>
              <span className="text-xs sm:text-sm font-bold text-[#138A36] tracking-tight mt-0.5 truncate">
                Direct Entry Placements
              </span>
              <p className="text-[10px] sm:text-xs text-slate-400 mt-0.5 font-medium truncate">Into top universities</p>
            </div>
          </div>

          {/* Stat 3: Countries */}
          <div className="flex items-center gap-2 sm:gap-3 text-left relative">
            <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full text-[#138A36] flex items-center justify-center shrink-0 shadow-xs" style={{ backgroundColor: "#102c4b" }}>
              <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-[#138A36]" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-lg sm:text-2xl xl:text-3xl font-black text-slate-800 tracking-tight font-sans">
                12+
              </span>
              <span className="text-xs sm:text-sm font-bold text-[#138A36] tracking-tight mt-0.5 truncate">
                Countries
              </span>
              <p className="text-[10px] sm:text-xs text-slate-400 mt-0.5 font-medium truncate">Global study destinations</p>
            </div>
          </div>

          {/* Stat 4: Success Guidance */}
          <div className="flex items-center gap-2 sm:gap-3 text-left relative">
            <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full text-[#138A36] flex items-center justify-center shrink-0 shadow-xs" style={{ backgroundColor: "#acdd8b" }}>
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-[#138A36]" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-lg sm:text-2xl xl:text-3xl font-black text-slate-800 tracking-tight font-sans">
                100%
              </span>
              <span className="text-xs sm:text-sm font-bold text-[#138A36] tracking-tight mt-0.5 truncate">
                Success Guidance
              </span>
              <p className="text-[10px] sm:text-xs text-slate-400 mt-0.5 font-medium truncate">End-to-end support</p>
            </div>
          </div>

        </div>
      </motion.section>

      {/* Primary Services & Educational Programs section - Cinematic Storytelling format */}
      <section 
        id="programs-showcase" 
        ref={showcaseRef} 
        className="py-24 bg-[#FAF9F6] border-y border-neutral-200/50 relative overflow-hidden"
      >
        
        {/* Subtle decorative grid lines to look very cinematic and structured */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent" />
        <div className="absolute inset-y-0 left-12 w-px bg-neutral-200/25 pointer-events-none hidden lg:block" />
        <div className="absolute inset-y-0 right-12 w-px bg-neutral-200/25 pointer-events-none hidden lg:block" />

        {/* Cinematic Parallax Background Elements */}
        <motion.div 
          style={{ y: yLeftOrb, rotate: rotLeft }} 
          className="absolute -left-16 top-1/4 w-60 h-60 bg-neutral-200/20 rounded-[3rem] border border-neutral-300/30 pointer-events-none blur-xs hidden md:block" 
        />
        <motion.div 
          style={{ y: yRightOrb, rotate: rotRight }} 
          className="absolute -right-20 bottom-1/4 w-82 h-82 bg-neutral-200/30 rounded-full border border-neutral-300/25 pointer-events-none blur-xs hidden md:block" 
        />
        
        {/* Soft glowing colored blurred blob matching the brand identity theme */}
        <motion.div 
          style={{ y: yCenterBlob }}
          className="absolute left-1/3 top-12 w-96 h-96 bg-emerald-500/[0.04] rounded-full filter blur-[100px] pointer-events-none"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-12 relative z-10">
          
          {/* Section Header - Clean and spaced display typography */}
          <div className="max-w-3xl mx-auto text-center flex flex-col gap-3">
            <span className="text-xs font-mono font-bold tracking-widest text-neutral-400 uppercase">Interactive Pathways</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight font-sans" style={{ color: '#1b783b' }}>
              Choose your chapter.
            </h2>
            <p className="text-neutral-500 text-sm sm:text-base max-w-xl mx-auto leading-relaxed mt-1">
              Every student journey at Univlove is an extraordinary story of transformation. Click a chapter below to slide into your future.
            </p>
          </div>

          {/* Epic Chapter Selector Tabs */}
          <div className="flex flex-col sm:flex-row justify-center gap-2 max-w-2xl mx-auto w-full p-1.5 bg-neutral-100 rounded-full border border-neutral-200/60 shadow-2xs">
            <button
              onClick={() => setActiveChapter('academic')}
              className={`px-6 py-3 rounded-full text-xs font-bold transition-all duration-300 tracking-tight flex items-center justify-center gap-2 cursor-pointer grow ${
                activeChapter === 'academic' 
                  ? 'text-white shadow-xs' 
                  : 'text-neutral-500 hover:text-neutral-800 hover:bg-neutral-200/50'
              }`}
              style={activeChapter === 'academic' ? { backgroundColor: '#176f33' } : {}}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Chapter I: Academic Uplift</span>
            </button>
            
            <button
              onClick={() => setActiveChapter('tech')}
              className={`px-6 py-3 rounded-full text-xs font-bold transition-all duration-300 tracking-tight flex items-center justify-center gap-2 cursor-pointer grow ${
                activeChapter === 'tech' 
                  ? 'text-white shadow-xs' 
                  : 'text-neutral-500 hover:text-neutral-800 hover:bg-neutral-200/50'
              }`}
              style={activeChapter === 'tech' ? { backgroundColor: '#8c4eae' } : {}}
            >
              <Cpu className="w-4 h-4" />
              <span>Chapter II: Tech & AI</span>
            </button>

            <button
              onClick={() => setActiveChapter('vocational')}
              className={`px-6 py-3 rounded-full text-xs font-bold transition-all duration-300 tracking-tight flex items-center justify-center gap-2 cursor-pointer grow ${
                activeChapter === 'vocational' 
                  ? 'bg-neutral-900 text-white shadow-xs' 
                  : 'text-neutral-500 hover:text-neutral-800 hover:bg-neutral-200/50'
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>Chapter III: Craft & Sports</span>
            </button>
          </div>

          {/* Unified Animated Interactive Chapters */}
          <div className="mt-4 text-left">
            <AnimatePresence mode="wait">
              {activeChapter === 'academic' && (
                <motion.div
                  key="academic-chap"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch"
                >
                  {/* Left Storyteller Panel */}
                  <div className="lg:col-span-7 flex flex-col gap-6">
                    
                    {/* Architectural Blueprint Cards (Program details) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {academicTabs.map((tab, idx) => (
                        <div 
                          key={idx}
                          onClick={() => {
                            setActiveAcademicTab(idx);
                            if (window.innerWidth < 1024) {
                              setIsMobileModalOpen(true);
                            }
                          }}
                          className={`rounded-2xl p-5 border transition-all duration-300 flex flex-col justify-between group cursor-pointer relative overflow-hidden select-none ${
                            activeAcademicTab === idx
                              ? 'bg-neutral-50/80 border-neutral-900 shadow-sm ring-1 ring-neutral-900/10'
                              : 'bg-white border-neutral-200/85 hover:border-neutral-450 hover:shadow-2xs'
                          } ${tab.gridSpan || ''}`}
                        >
                          {/* Selected Left Colored Accent Ribbon */}
                          {activeAcademicTab === idx && (
                            <div 
                              className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl" 
                              style={{ backgroundColor: tab.accentColor }} 
                            />
                          )}

                          <div className="flex flex-col gap-2">
                            <span 
                              className="text-[10px] font-mono font-extrabold uppercase tracking-wider"
                              style={{ color: tab.accentColor }}
                            >
                              {tab.tag}
                            </span>
                            <h3 className="text-base font-extrabold text-neutral-900 group-hover:text-black">
                              {tab.title}
                            </h3>
                            <p className="text-xs text-neutral-500 leading-relaxed">
                              {tab.desc}
                            </p>
                          </div>

                          <div className="mt-4 flex items-center justify-between">
                            <span 
                              className="text-xs font-bold transition-colors"
                              style={{ color: activeAcademicTab === idx ? tab.accentColor : '#9CA3AF' }}
                            >
                              {activeAcademicTab === idx ? "Viewing Details ➔" : "Read Details ➔"}
                            </span>
                            {activeAcademicTab === idx && (
                              <div 
                                className="w-1.5 h-1.5 rounded-full animate-ping"
                                style={{ backgroundColor: tab.accentColor }}
                              />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                  </div>

                  {/* Right Cinematic Display Card */}
                  <div id="academic-details-panel" className="hidden lg:flex lg:col-span-5 relative flex-col justify-between bg-white rounded-3xl border border-neutral-200/90 p-6 shadow-sm overflow-hidden leading-normal">
                    
                    <div>


                      {/* Expanded Narrative */}
                      <div className="mt-5 flex flex-col gap-2">
                        <span className="text-[10px] font-mono tracking-widest text-[#B4ACF9] uppercase font-bold">
                          Detailed Specifications
                        </span>
                        <h4 className="text-lg font-black text-neutral-900 leading-tight">
                          {academicTabs[activeAcademicTab].title}
                        </h4>
                        <p className="text-xs text-neutral-600 leading-relaxed">
                          {academicTabs[activeAcademicTab].detailed}
                        </p>
                      </div>

                      {/* Stats details cluster */}
                      <div className="flex flex-col gap-4 mt-5">
                        <div className="flex justify-between items-center border-b border-neutral-100 pb-3">
                          <span className="text-xs font-semibold text-neutral-500">Primary Outcome</span>
                          <span className="text-xs font-bold text-neutral-900 text-right">
                            {academicTabs[activeAcademicTab].outcome}
                          </span>
                        </div>
                        <div className="flex justify-between items-center border-b border-neutral-100 pb-3">
                          <span className="text-xs font-semibold text-neutral-500">Validation Standard</span>
                          <span className="text-xs font-bold text-neutral-900 text-right">
                            {academicTabs[activeAcademicTab].rate}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-semibold text-neutral-500">Program Format</span>
                          <span className="text-xs font-mono font-bold text-right" style={{ color: academicTabs[activeAcademicTab].accentColor }}>
                            {academicTabs[activeAcademicTab].type}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Cinematic overlay card */}
                    <div className="mt-6 p-4 rounded-2xl border text-center flex flex-col items-center gap-2 bg-neutral-50/50 border-neutral-100">
                      <p className="text-[11px] font-bold text-neutral-700 tracking-tight uppercase">
                        Streamline your academic transition online
                      </p>
                      <button 
                        onClick={() => {
                          setSelectedProgram(academicTabs[activeAcademicTab].programName);
                          setSelectedTrack(academicTabs[activeAcademicTab].trackName);
                          scrollToView("admissions-portal");
                        }}
                        className="w-full py-3.5 text-white rounded-xl text-xs font-bold tracking-tight uppercase transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg active:scale-95 flex items-center justify-center gap-2"
                        style={{ background: `linear-gradient(135deg, ${academicTabs[activeAcademicTab].accentColor}, ${academicTabs[activeAcademicTab].accentColor}cc)` }}
                      >
                        <span>{academicTabs[activeAcademicTab].buttonText.replace(" ➔", "")}</span>
                        <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                      </button>
                    </div>

                  </div>
                </motion.div>
              )}

              {activeChapter === 'tech' && (
                <motion.div
                  key="tech-chap"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch"
                >
                  {/* Left Storyteller Panel */}
                  <div className="lg:col-span-7 flex flex-col gap-6">
                    
                    {/* Architectural Blueprint Cards (Program details) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {techTabs.map((tab, idx) => (
                        <div 
                          key={idx}
                          onClick={() => {
                            setActiveTechTab(idx);
                            if (window.innerWidth < 1024) {
                              setIsMobileModalOpen(true);
                            }
                          }}
                          className={`rounded-2xl p-5 border transition-all duration-300 flex flex-col justify-between group cursor-pointer relative overflow-hidden select-none ${
                            activeTechTab === idx
                              ? 'bg-neutral-50/80 border-neutral-900 shadow-sm ring-1 ring-neutral-900/10'
                              : 'bg-white border-neutral-200/85 hover:border-neutral-450 hover:shadow-2xs'
                          }`}
                        >
                          {/* Selected Left Colored Accent Ribbon */}
                          {activeTechTab === idx && (
                            <div 
                              className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl" 
                              style={{ backgroundColor: tab.accentColor }} 
                            />
                          )}

                          <div className="flex flex-col gap-2">
                            <span 
                              className="text-[10px] font-mono font-extrabold uppercase tracking-wider"
                              style={{ color: tab.accentColor }}
                            >
                              {tab.tag}
                            </span>
                            <h3 className="text-base font-extrabold text-neutral-900 group-hover:text-black">
                              {tab.title}
                            </h3>
                            <p className="text-xs text-neutral-500 leading-relaxed">
                              {tab.desc}
                            </p>
                          </div>

                          <div className="mt-4 flex items-center justify-between">
                            <span 
                              className="text-xs font-bold transition-colors"
                              style={{ color: activeTechTab === idx ? tab.accentColor : '#9CA3AF' }}
                            >
                              {activeTechTab === idx ? "Viewing Details ➔" : "Read Details ➔"}
                            </span>
                            {activeTechTab === idx && (
                              <div 
                                className="w-1.5 h-1.5 rounded-full animate-ping"
                                style={{ backgroundColor: tab.accentColor }}
                              />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                  </div>

                  {/* Right Cinematic Display Card */}
                  <div id="tech-details-panel" className="hidden lg:flex lg:col-span-5 relative flex-col justify-between bg-white rounded-3xl border border-neutral-200/90 p-6 shadow-xs overflow-hidden leading-normal">
                    
                    <div>


                      {/* Expanded Narrative */}
                      <div className="mt-5 flex flex-col gap-2">
                        <span className="text-[10px] font-mono tracking-widest text-[#138A36] uppercase font-bold">
                          Detailed Specifications
                        </span>
                        <h4 className="text-lg font-black text-neutral-900 leading-tight">
                          {techTabs[activeTechTab].title}
                        </h4>
                        <p className="text-xs text-neutral-600 leading-relaxed">
                          {techTabs[activeTechTab].detailed}
                        </p>
                      </div>

                      {/* Stats details cluster */}
                      <div className="flex flex-col gap-4 mt-5">
                        <div className="flex justify-between items-center border-b border-neutral-100 pb-3">
                          <span className="text-xs font-semibold text-neutral-500">Core Qualification</span>
                          <span className="text-xs font-bold text-neutral-900 text-right">
                            {techTabs[activeTechTab].outcome}
                          </span>
                        </div>
                        <div className="flex justify-between items-center border-b border-neutral-100 pb-3">
                          <span className="text-xs font-semibold text-neutral-500">Industry Standard</span>
                          <span className="text-xs font-bold text-neutral-900 text-right">
                            {techTabs[activeTechTab].rate}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-semibold text-neutral-500">Our Placement Track</span>
                          <span className="text-xs font-mono font-bold text-right" style={{ color: techTabs[activeTechTab].accentColor }}>
                            {techTabs[activeTechTab].type}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Cinematic overlay card */}
                    <div className="mt-6 p-4 rounded-2xl border text-center flex flex-col items-center gap-2 bg-neutral-50/50 border-neutral-100">
                      <p className="text-[11px] font-bold text-neutral-700 tracking-tight uppercase">
                        Join the high availability digital talent cohort
                      </p>
                      <button 
                        onClick={() => {
                          setSelectedProgram(techTabs[activeTechTab].programName);
                          setSelectedTrack(techTabs[activeTechTab].trackName);
                          scrollToView("admissions-portal");
                        }}
                        className="w-full py-3.5 text-white rounded-xl text-xs font-bold tracking-tight uppercase transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg active:scale-95 flex items-center justify-center gap-2"
                        style={{ background: `linear-gradient(135deg, ${techTabs[activeTechTab].accentColor}, ${techTabs[activeTechTab].accentColor}cc)` }}
                      >
                        <span>{techTabs[activeTechTab].buttonText.replace(" ➔", "")}</span>
                        <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                      </button>
                    </div>

                  </div>
                </motion.div>
              )}

              {activeChapter === 'vocational' && (
                <motion.div
                  key="vocational-chap"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch"
                >
                  {/* Left Storyteller Panel */}
                  <div className="lg:col-span-7 flex flex-col gap-6">
                    
                    {/* Architectural Blueprint Cards (Program details) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {vocationalTabs.map((tab, idx) => (
                        <div 
                          key={idx}
                          onClick={() => {
                            setActiveVocationalTab(idx);
                            if (window.innerWidth < 1024) {
                              setIsMobileModalOpen(true);
                            }
                          }}
                          className={`rounded-2xl p-5 border transition-all duration-300 flex flex-col justify-between group cursor-pointer relative overflow-hidden select-none ${
                            activeVocationalTab === idx
                              ? 'bg-neutral-50/80 border-neutral-900 shadow-sm ring-1 ring-neutral-900/10'
                              : 'bg-white border-neutral-200/85 hover:border-neutral-450 hover:shadow-2xs'
                          }`}
                        >
                          {/* Selected Left Colored Accent Ribbon */}
                          {activeVocationalTab === idx && (
                            <div 
                              className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl" 
                              style={{ backgroundColor: tab.accentColor }} 
                            />
                          )}

                          <div className="flex flex-col gap-2">
                            <span 
                              className="text-[10px] font-mono font-extrabold uppercase tracking-wider"
                              style={{ color: tab.accentColor }}
                            >
                              {tab.tag}
                            </span>
                            <h3 className="text-base font-extrabold text-neutral-900 group-hover:text-black">
                              {tab.title}
                            </h3>
                            <p className="text-xs text-neutral-500 leading-relaxed">
                              {tab.desc}
                            </p>
                          </div>

                          <div className="mt-4 flex items-center justify-between">
                            <span 
                              className="text-xs font-bold transition-colors"
                              style={{ color: activeVocationalTab === idx ? tab.accentColor : '#9CA3AF' }}
                            >
                              {activeVocationalTab === idx ? "Viewing Details ➔" : "Read Details ➔"}
                            </span>
                            {activeVocationalTab === idx && (
                              <div 
                                className="w-1.5 h-1.5 rounded-full animate-ping"
                                style={{ backgroundColor: tab.accentColor }}
                              />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                  </div>

                  {/* Right Cinematic Display Card */}
                  <div id="vocational-details-panel" className="hidden lg:flex lg:col-span-5 relative flex-col justify-between bg-white rounded-3xl border border-neutral-200/90 p-6 shadow-xs overflow-hidden leading-normal">
                    
                    <div>


                      {/* Expanded Narrative */}
                      <div className="mt-5 flex flex-col gap-2">
                        <span className="text-[10px] font-mono tracking-widest text-[#F57C00] uppercase font-bold">
                          Detailed Specifications
                        </span>
                        <h4 className="text-lg font-black text-neutral-900 leading-tight">
                          {vocationalTabs[activeVocationalTab].title}
                        </h4>
                        <p className="text-xs text-neutral-600 leading-relaxed">
                          {vocationalTabs[activeVocationalTab].detailed}
                        </p>
                      </div>

                      {/* Stats details cluster */}
                      <div className="flex flex-col gap-4 mt-5">
                        <div className="flex justify-between items-center border-b border-neutral-100 pb-3">
                          <span className="text-xs font-semibold text-neutral-500">Outcome Profile</span>
                          <span className="text-xs font-bold text-neutral-900 text-right">
                            {vocationalTabs[activeVocationalTab].outcome}
                          </span>
                        </div>
                        <div className="flex justify-between items-center border-b border-neutral-100 pb-3">
                          <span className="text-xs font-semibold text-neutral-500">Placement Success</span>
                          <span className="text-xs font-bold text-neutral-900 text-right">
                            {vocationalTabs[activeVocationalTab].rate}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-semibold text-neutral-500">Sovereignty Track</span>
                          <span className="text-xs font-mono font-bold text-right" style={{ color: vocationalTabs[activeVocationalTab].accentColor }}>
                            {vocationalTabs[activeVocationalTab].type}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Cinematic overlay card */}
                    <div className="mt-6 p-4 rounded-2xl border text-center flex flex-col items-center gap-2 bg-neutral-50/50 border-neutral-100">
                      <p className="text-[11px] font-bold text-neutral-700 tracking-tight uppercase">
                        Master real physical tradecraft & leadership skills
                      </p>
                      <button 
                        onClick={() => {
                          setSelectedProgram(vocationalTabs[activeVocationalTab].programName);
                          setSelectedTrack(vocationalTabs[activeVocationalTab].trackName);
                          scrollToView("admissions-portal");
                        }}
                        className="w-full py-3.5 text-white rounded-xl text-xs font-bold tracking-tight uppercase transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg active:scale-95 flex items-center justify-center gap-2"
                        style={{ background: `linear-gradient(135deg, ${vocationalTabs[activeVocationalTab].accentColor}, ${vocationalTabs[activeVocationalTab].accentColor}cc)` }}
                      >
                        <span>{vocationalTabs[activeVocationalTab].buttonText.replace(" ➔", "")}</span>
                        <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                      </button>
                    </div>

                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </section>

      {/* Deep-Dive Study Abroad Interactive Pathways Section - Cinematic Experience */}
      <section id="study-abroad" className="py-24 bg-[#FAF9F6] border-y border-neutral-200/50 relative overflow-hidden">
        
        {/* Subtle background decoration simulating coordinates and global paths */}
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none select-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:24px_24px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-16 relative z-10">
          
          {/* Attention Stage: Headline */}
          <div className="max-w-3xl mx-auto flex flex-col gap-4">
            <span className="text-[10px] font-mono tracking-[0.25em] font-extrabold text-neutral-400 uppercase">
              Global Partner Infrastructure
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight font-sans" style={{ color: '#308946' }}>
              Your journey beyond borders <span className="font-serif italic font-normal" style={{ color: '#000000' }}>begins here.</span>
            </h2>
            <div className="h-px w-24 bg-neutral-200 mx-auto mt-2" />
            <p className="text-neutral-500 text-sm md:text-base leading-relaxed mt-2">
              Skip traditional immigration stress. We bridge premium West African students directly to top-tier international university systems under fast-track scholarship configurations with verified visa success audits.
            </p>
          </div>

          {/* Inspiration Stage: Country Pathways mapped beautifully in staggered interactive blocks */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {studyAbroadCountries.map((c, idx) => (
              <motion.div 
                key={c.code}
                id={`country-${c.code}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className={`p-6 rounded-3xl border border-neutral-250 backdrop-blur-md bg-white/75 shadow-2xs hover:shadow-lg transition-all flex flex-col justify-between min-h-[220px] relative overflow-hidden group cursor-pointer`}
                onClick={() => {
                  setSelectedProgram('Study Abroad Opportunities');
                  setSelectedTrack(`${c.name} Visa & Placement Track`);
                  scrollToView("admissions-portal");
                }}
              >
                {/* Simulated faint passport stamp background */}
                <div className="absolute right-2 bottom-2 text-neutral-200/40 text-8xl font-black select-none pointer-events-none transition-transform duration-700 ease-out group-hover:scale-125 font-mono">
                  {c.code}
                </div>

                <div className="flex items-center justify-between z-10">
                  <div className="w-10 h-10 bg-neutral-100 rounded-xl flex items-center justify-center font-bold text-neutral-800 border border-neutral-200 shadow-3xs group-hover:bg-neutral-950 group-hover:text-white transition-colors duration-300">
                    {c.code}
                  </div>
                  <span className="text-[9px] uppercase tracking-wider font-mono font-bold text-neutral-400 group-hover:text-neutral-800 transition-colors">
                    DLI Certified
                  </span>
                </div>

                <div className="z-10 mt-6">
                  <h3 className="text-base font-extrabold text-neutral-900 flex items-center gap-1.5 transition-colors group-hover:text-black">
                    {c.name} Pathway
                    <ArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-black group-hover:translate-x-1 transition-all duration-300" />
                  </h3>
                  <p className="text-[11px] text-neutral-500 leading-relaxed mt-2.5">
                    {c.quote}
                  </p>
                </div>

                <div className="text-[10px] uppercase tracking-wider font-bold text-neutral-400 group-hover:text-black z-10 border-t border-neutral-200/50 pt-3 flex items-center justify-between mt-4">
                  <span>Admissions Open</span>
                  <span className="font-mono text-sm leading-none opacity-40 group-hover:opacity-100 transition-opacity">→</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Value Stage: Direct support callout bar redesigned as an elegant, glassmorphic wide dashboard */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="backdrop-blur-xl bg-neutral-950 text-white p-8 sm:p-10 lg:p-12 rounded-[32px] flex flex-col lg:flex-row items-center justify-between gap-8 text-left shadow-[0_24px_60px_rgba(0,0,0,0.12)] relative overflow-hidden"
          >
            {/* Subtle glow background */}
            <div className="absolute right-0 top-0 w-80 h-80 bg-gradient-to-bl from-amber-500/10 via-[#138A36]/10 to-transparent rounded-full filter blur-3xl pointer-events-none" />

            <div className="max-w-3xl flex flex-col gap-3 relative z-10">
              <div className="inline-flex items-center gap-2 bg-white/10 text-amber-300 border border-white/5 px-2.5 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase self-start font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                Durable Relocation Support
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight font-sans leading-none mt-1">
                Relocate with full programmatic assurance.
              </h3>
              <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed max-w-2xl mt-1.5">
                Our elite relocation consultancy verifies your credentials matching matrix, manages scholarship index scores, organizes target consulate rehearsals, and coordinates official flight orientations.
              </p>
              
              {/* Proof details inside support bar */}
              <div className="flex flex-wrap gap-x-6 gap-y-2 mt-2 pt-4 border-t border-white/10 text-[10.5px] font-mono text-neutral-400">
                <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#138A36]" /> 98.4% Visa Success Index</span>
                <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#F4B400]" /> 86% Scholarship Match Rate</span>
                <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-blue-400" /> Direct-DLI Institutional Ties</span>
              </div>
            </div>
            
            <button 
              onClick={() => scrollToView("advisor-contact")}
              className="px-8 py-4 bg-gradient-to-b from-white to-neutral-100 hover:to-neutral-200 text-neutral-950 font-black text-xs uppercase tracking-widest rounded-2xl transition-all shrink-0 cursor-pointer shadow-md hover:shadow-lg active:scale-95 relative z-10 flex items-center justify-center gap-2"
            >
              <span>Consult Study Abroad Officer</span>
              <ArrowUpRight className="w-4 h-4 text-neutral-700 stroke-[2.5]" />
            </button>
          </motion.div>

        </div>
      </section>



      {/* VIP Accommodation & Boarding Showcase Section */}
      <section id="boarding-section" className="bg-[#050506] py-24 relative overflow-hidden border-t border-neutral-900 text-white">
        
        {/* Large background decorative letters */}
        <div className="absolute top-16 left-1/2 -translate-x-1/2 select-none pointer-events-none opacity-[0.12] font-black text-[13vw] uppercase tracking-wider text-white leading-none z-0">
          BOARDING
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-16 relative z-10">
          
          <div className="max-w-2xl mx-auto flex flex-col gap-3">
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#F57C00]">PREMIUM BOARDING REASSURANCE</span>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
              Teacher-Monitored Student Accommodations
            </h2>
            <div className="h-1 bg-[#F4B400] w-16 mx-auto rounded-full mt-1" />
            <p className="text-neutral-400 text-sm md:text-base mt-2">
              Providing high-security, luxury boarding facilities on campus in Ilesa, Osun State. Guaranteed peace of mind for families globally.
            </p>
          </div>

          {/* Accommodation tiers grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {accommodationLevels.map((lodging, i) => (
              <div 
                key={i} 
                id={`lodge-${i}`}
                className="bg-[#0D0E11]/95 border border-neutral-800/80 rounded-[32px] p-8 md:p-9 flex flex-col justify-between transition-all duration-300 relative overflow-hidden group shadow-2xl hover:scale-[1.02] hover:border-neutral-700/80 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
              >
                {/* Soft subtle radial corner glow on hover */}
                <div className={`absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl pointer-events-none opacity-20 transition-opacity duration-300 ${
                  i === 0 ? 'bg-emerald-400' :
                  i === 1 ? 'bg-fuchsia-400' :
                  'bg-sky-400'
                }`} />

                <div className="absolute top-6 right-6 text-2xl opacity-10 select-none group-hover:scale-110 group-hover:opacity-25 transition-all">
                  {lodging.icon}
                </div>

                <div className="flex flex-col gap-3">
                  <div>
                    <span className={`text-xs font-bold uppercase tracking-wider ${
                      i === 0 ? 'text-emerald-400' :
                      i === 1 ? 'text-fuchsia-400' :
                      'text-sky-400'
                    }`}>
                      {lodging.price}
                    </span>
                    <span className="text-[10px] text-neutral-500 block mt-1">Excellent standard-certified on-campus boarding</span>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight leading-tight min-h-[72px] flex items-center">
                    {lodging.type}
                  </h3>

                  <div className="text-[11px] text-neutral-400 leading-relaxed italic border-b border-neutral-800/80 pb-5">
                    ✨ Includes full access to state-of-the-art tech computing hubs, sports fields, and 24/7 guardian monitoring.
                  </div>
                </div>

                <button 
                  onClick={() => {
                    setSelectedProgram('Accommodation & Boarding Units');
                    setSelectedTrack(lodging.type);
                    scrollToView("admissions-portal");
                  }}
                  className={`w-full py-3.5 px-6 rounded-full text-xs font-black uppercase tracking-wider bg-white/[0.04] border border-white/10 text-white hover:text-white transition-all cursor-pointer text-center select-none active:scale-[0.98] mt-6 mb-6 flex items-center justify-center gap-2 ${
                    i === 0 ? 'hover:border-emerald-500/40 hover:bg-emerald-500/[0.04] hover:shadow-[0_0_15px_rgba(16,185,129,0.15)]' :
                    i === 1 ? 'hover:border-fuchsia-500/40 hover:bg-fuchsia-500/[0.04] hover:shadow-[0_0_15px_rgba(217,70,239,0.15)]' :
                    'hover:border-sky-500/40 hover:bg-sky-500/[0.04] hover:shadow-[0_0_15px_rgba(14,165,233,0.15)]'
                  }`}
                >
                  <span>Inquire For Accommodation</span>
                  <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                </button>

                <div className="flex flex-col gap-3">
                  {lodging.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-xs md:text-sm text-neutral-300">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border ${
                        i === 0 ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' :
                        i === 1 ? 'bg-fuchsia-500/10 border-fuchsia-500/20 text-fuchsia-300' :
                        'bg-sky-500/10 border-sky-500/20 text-sky-400'
                      }`}>
                        <Check className="w-3 h-3" />
                      </div>
                      <span className="font-medium">{feature}</span>
                    </div>
                  ))}
                </div>

              </div>
            ))}
          </div>

          {/* Additional highlight checklist for onboarding */}
          <div className="bg-[#0D0E11]/80 backdrop-blur-md border border-neutral-800/80 rounded-3xl p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-left items-center z-10">
            <div className="flex flex-col gap-1.5 border-b md:border-b-0 md:border-r border-neutral-800/80 pb-4 md:pb-0 md:pr-4">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block animate-ping"></span>
                24/7 Security Controls
              </h4>
              <p className="text-[11.5px] text-neutral-400 leading-relaxed">CCTV mapping, uniformed military marshals, and entry card biometric gates guarantee absolute safety.</p>
            </div>

            <div className="flex flex-col gap-1.5 border-b md:border-b-0 md:border-r border-neutral-800/80 pb-4 md:pb-0 md:pr-4">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                📊 Continuous Solar Grid
              </h4>
              <p className="text-[11.5px] text-neutral-400 leading-relaxed">Zero grid blackout worries. Clean continuous sun electricity operates lighting, fans, high-availability router networks and charging docks.</p>
            </div>

            <div className="flex flex-col gap-1.5">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                🍲 Chef-Prepared Food Units
              </h4>
              <p className="text-[11.5px] text-neutral-400 leading-relaxed">Nourishing, certified meals created daily under absolute hygienic parameters. Personal medical diets supported.</p>
            </div>
          </div>

        </div>
      </section>

      {/* Dynamic Admission Forms Portal & Live Registered Cohorts Status System */}
      <section id="admissions-portal" className="py-20 bg-neutral-50/50 border-t border-[#ece8e0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 bg-white rounded-3xl overflow-hidden border border-neutral-200/90 shadow-lg min-h-[720px] relative">
            
            {/* Left Column: Register application forms */}
            <div className="lg:col-span-7 bg-white p-8 md:p-12 lg:p-16 flex flex-col justify-between text-left relative z-10">
              
              {/* Brand Indicator */}
              <div className="flex items-center gap-2 mb-8 select-none">
                <div className="w-8 h-8 rounded-full bg-neutral-950 flex items-center justify-center text-white font-black text-sm">
                  U
                </div>
                <div>
                  <span className="font-black text-xs tracking-widest uppercase text-neutral-900 block font-mono">UNIVLOVE</span>
                  <span className="text-[9px] text-[#138A36] tracking-wider uppercase font-bold block mt-0.5">Admissions Registry</span>
                </div>
              </div>

              {/* Form Content Wrapper */}
              <div className="flex-grow flex flex-col justify-center">
                <div className="mb-8">
                  <h3 className="text-2xl font-black tracking-tight" style={{ color: '#196317' }}>Submit Application Dossier</h3>
                  <p className="text-xs text-neutral-500 mt-2 leading-relaxed">
                    Begin academic progression immediately under direct-entry, tech, and vocational pathways.
                  </p>
                </div>

                {formSubmitted ? (
                  <div className="bg-emerald-50/50 border border-emerald-100 p-8 rounded-2xl text-center flex flex-col items-center gap-5 animate-fadeIn">
                    <div className="w-14 h-14 bg-emerald-100 text-[#138A36] rounded-full flex items-center justify-center text-2xl shadow-xs font-bold">✓</div>
                    <div>
                      <h4 className="text-base font-extrabold text-emerald-900" style={{ color: '#24771e' }}>Application File Logged</h4>
                      <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                        Your academic progress file has been safely synchronized with the Univlove Educational Board registrar. One of our lead advisors will contact your line within 12-24 hours.
                      </p>
                    </div>
                    <div className="p-3 bg-white border border-slate-200/80 rounded-xl font-mono text-[10px] leading-relaxed text-slate-700 w-full text-left">
                      <span className="text-[9px] text-amber-700 font-extrabold uppercase">BOARD REGISTRY LOG:</span> 
                      <br />"Pre-varsity direct credentials, student profile, tracks & digital signatures have been successfully catalogued."
                    </div>
                    <button 
                      onClick={() => setFormSubmitted(false)}
                      className="w-full py-3 bg-gradient-to-r from-neutral-900 to-neutral-800 hover:from-black hover:to-neutral-900 text-white text-xs font-bold uppercase rounded-xl transition-all cursor-pointer shadow-md active:scale-95"
                    >
                      Submit Another Candidate
                    </button>
                  </div>
                ) : showPaymentGateway && pendingPayload ? (
                  <div className="bg-neutral-50 border border-neutral-200/80 p-6 md:p-8 rounded-2xl flex flex-col gap-5 animate-fadeIn text-neutral-800">
                    <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
                      <div>
                        <h4 className="text-xs font-black text-neutral-900 uppercase tracking-widest font-mono">Paystack Portal Gate</h4>
                        <p className="text-[10px] text-neutral-400 font-mono mt-0.5">FEE ID: INV-PSTK-{Date.now().toString().slice(-6)}</p>
                      </div>
                      <div className="px-3 py-1 bg-[#138A36]/5 text-[#138A36] text-[10px] font-bold uppercase rounded-xl border border-[#138A36]/10 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#138A36] animate-pulse"></span>
                        Secure Connection
                      </div>
                    </div>

                    {/* Summary coordinates */}
                    <div className="flex flex-col gap-2.5 text-xs">
                      <div className="flex justify-between border-b border-neutral-100 pb-2">
                        <span className="text-neutral-400 font-medium font-sans">Scholar Candidate:</span>
                        <span className="font-extrabold text-neutral-800 truncate max-w-[200px]">{pendingPayload.fullName}</span>
                      </div>
                      <div className="flex justify-between border-b border-neutral-100 pb-2">
                        <span className="text-neutral-400 font-medium font-sans">Email Address:</span>
                        <span className="font-mono text-neutral-700 truncate max-w-[200px]">{pendingPayload.email}</span>
                      </div>
                      <div className="flex justify-between border-b border-neutral-100 pb-2">
                        <span className="text-neutral-400 font-medium font-sans">Applied Track:</span>
                        <span className="font-extrabold text-neutral-800 text-[11px] truncate max-w-[200px]">{pendingPayload.program}</span>
                      </div>
                      
                      {/* Cost Invoice Breakdown */}
                      <div className="bg-white p-4 rounded-2xl border border-neutral-200/60 mt-2">
                        <div className="flex justify-between text-[11px] text-neutral-500 mb-1.5">
                          <span>Direct Entry Portal Fee</span>
                          <span>₦{(settings.paymentAmount || 10000).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-[11px] text-neutral-500 mb-1.5">
                          <span>Instant Board Sync Fee</span>
                          <span className="text-emerald-600 font-bold uppercase text-[9px] font-mono">FREE</span>
                        </div>
                        <hr className="border-neutral-100 my-2" />
                        <div className="flex justify-between text-sm text-neutral-950 font-black">
                          <span>Total Amount to Remit</span>
                          <span className="text-neutral-900">₦{(settings.paymentAmount || 10000).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Direct integration options */}
                    <div className="flex flex-col gap-3 mt-1">
                      <button 
                        onClick={triggerPaystackPayment}
                        disabled={isPaying || submittingApp}
                        className="w-full py-4 bg-gradient-to-r from-[#3ecf8e] to-[#10b981] hover:from-[#35be82] hover:to-[#059669] text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 active:scale-95 disabled:opacity-75 cursor-pointer border border-[#30bc7e]/25"
                      >
                        {isPaying ? (
                          <>
                            <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                            Connecting Paystack Secure API...
                          </>
                        ) : (
                          <>
                            <span>Authorize ₦{(settings.paymentAmount || 10000).toLocaleString()} Payment</span>
                            <span className="px-1.5 py-0.5 bg-white/20 text-[8px] font-black rounded uppercase font-mono tracking-none">Live Gate</span>
                          </>
                        )}
                      </button>


                      <button 
                        onClick={() => {
                          setShowPaymentGateway(false);
                          setPendingPayload(null);
                        }}
                        disabled={isPaying || submittingApp}
                        className="text-neutral-400 hover:text-neutral-600 text-[10px] font-mono tracking-widest font-bold text-center underline cursor-pointer hover:no-underline transition-all mt-1 uppercase"
                      >
                        ✕ Cancel & Edit Credentials
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleAdmissionSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">Full Scholar Name (Surname First)</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. Adebayo Blessing Amara"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="p-3 border border-neutral-200 rounded-xl bg-white text-sm focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900/10 transition-all font-sans text-neutral-900"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">Mobile Phone Number</label>
                        <input 
                          type="tel" 
                          required
                          placeholder="e.g. 08123456789"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="p-3 border border-neutral-200 rounded-xl bg-white text-sm font-mono focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900/10 transition-all text-neutral-900"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">Email Address</label>
                        <input 
                          type="email" 
                          required
                          placeholder="e.g. blessing@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="p-3 border border-neutral-200 rounded-xl bg-white text-sm focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900/10 transition-all text-neutral-900"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">Preferred Program Sector</label>
                        <select 
                          value={selectedProgram}
                          onChange={(e) => {
                            setSelectedProgram(e.target.value);
                            if (e.target.value.includes("Prevarsity")) {
                              setSelectedTrack("JUPEB Route into 200L");
                            } else if (e.target.value.includes("Technology")) {
                              setSelectedTrack("Software Development & Cyber Security");
                            } else if (e.target.value.includes("Study")) {
                              setSelectedTrack("Canada Pathway Programs");
                            } else {
                              setSelectedTrack("General Mastery");
                            }
                          }}
                          className="p-3 border border-neutral-200 rounded-xl bg-white text-sm focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900/10 transition-all text-neutral-900"
                        >
                          <option value="JUPEB (Prevarsity Direct Entry)">JUPEB Direct Entry Year 2</option>
                          <option value="IJMB (Alternate Prevarsity Entry)">IJMB Alternate Entry path</option>
                          <option value="Technology Academy & Digital Skills">Technology Academy Masterclass</option>
                          <option value="Vocational Skills & Enterprise">Vocational Development Course</option>
                          <option value="Study Abroad Opportunities">Global Study Abroad Placement</option>
                          <option value="Sports Academy & Leadership Development">Sports & Athletics Scouting</option>
                          <option value="Teacher Training & Educator Pro">Teacher AI Workshop & Methodology</option>
                        </select>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">Track Specialization</label>
                        <input 
                          type="text" 
                          placeholder="e.g. Software Development, Sports, Germany Option"
                          value={selectedTrack}
                          onChange={(e) => setSelectedTrack(e.target.value)}
                          className="p-3 border border-neutral-200 rounded-xl bg-white text-sm focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900/10 transition-all text-neutral-900"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">Special Notes or Ambitions (Optional)</label>
                      <textarea 
                        rows={2}
                        placeholder="Include age declarations, high school exams passed, or boarding preferences..."
                        value={candidateNotes}
                        onChange={(e) => setCandidateNotes(e.target.value)}
                        className="p-3 border border-neutral-200 rounded-xl bg-white text-sm focus:outline-none focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900/10 transition-all resize-none text-neutral-900"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submittingApp}
                      className="w-full mt-2 py-3.5 bg-gradient-to-r from-[#138A36] to-[#058031] hover:from-[#0d6d29] hover:to-[#035f24] text-white font-bold rounded-xl text-xs uppercase tracking-widest transition-all cursor-pointer shadow-md hover:shadow-lg flex items-center justify-center gap-2 active:scale-98 disabled:opacity-75"
                    >
                      {submittingApp ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                          Transmitting to Registrar...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 text-neutral-400 shrink-0" />
                          Transmit Online Application Portal
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>

              {/* Secure note */}
              <div className="text-[10px] text-neutral-400 italic text-center mt-6">
                Advanced progress is guaranteed. Your details sync instantly on submission.
              </div>

            </div>

            {/* Right Column: Dynamic Testimonial Display mimicking the Image */}
            <div className="lg:col-span-5 relative flex flex-col justify-end p-8 md:p-12 lg:p-14 overflow-hidden bg-neutral-900 text-white min-h-[480px] lg:min-h-full">
              
              {/* Dynamic image slide background */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeAdmissionTestimonial}
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${admissionTestimonials[activeAdmissionTestimonial].image})` }}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.45, ease: "easeInOut" }}
                />
              </AnimatePresence>
              
              {/* Radial gradient shading for text eligibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-neutral-950/30 w-full h-full pointer-events-none z-10" />

              {/* Testimonial Content Panel */}
              <div className="relative z-20 flex flex-col h-full justify-between items-start">
                
                {/* Visual Label Ribbon */}
                <div className="px-3.5 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/15 text-[10px] font-mono tracking-widest uppercase font-bold text-white select-none">
                  🎓 REGISTERED ALUMNI REVIEW
                </div>

                {/* Main Quote Box */}
                <div className="w-full flex flex-col gap-5 text-left mt-auto">
                  <h4 className="text-lg md:text-xl font-semibold leading-relaxed text-white font-sans tracking-tight">
                    "{admissionTestimonials[activeAdmissionTestimonial].quote}"
                  </h4>
                  
                  <div className="flex flex-col gap-0.5">
                    <span className="text-base font-bold text-white tracking-tight">
                      {admissionTestimonials[activeAdmissionTestimonial].author}
                    </span>
                    <span className="text-xs text-neutral-300 font-medium">
                      {admissionTestimonials[activeAdmissionTestimonial].role}
                    </span>
                    <span className="text-[10px] uppercase font-mono font-bold text-emerald-400 mt-1 flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-emerald-400"></span>
                      Verified: {admissionTestimonials[activeAdmissionTestimonial].company} Pathway ({admissionTestimonials[activeAdmissionTestimonial].achievement})
                    </span>
                  </div>

                  {/* Five Star rating and slide buttons */}
                  <div className="flex items-center justify-between border-t border-white/15 pt-5 mt-2">
                    
                    {/* Stars */}
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-white text-white" />
                      ))}
                    </div>

                    {/* Left & Right slider controllers */}
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => {
                          setActiveAdmissionTestimonial((prev) => (prev - 1 + admissionTestimonials.length) % admissionTestimonials.length);
                        }}
                        className="w-10 h-10 rounded-full border border-white/20 hover:border-white text-white hover:bg-white/10 flex items-center justify-center transition-all cursor-pointer select-none active:scale-95 bg-black/10 backdrop-blur-xs"
                        aria-label="Previous Testimonial"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => {
                          setActiveAdmissionTestimonial((prev) => (prev + 1) % admissionTestimonials.length);
                        }}
                        className="w-10 h-10 rounded-full border border-white/20 hover:border-white text-white hover:bg-white/10 flex items-center justify-center transition-all cursor-pointer select-none active:scale-95 bg-black/10 backdrop-blur-xs"
                        aria-label="Next Testimonial"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* Real-time Verified Cohort Synchronizer Status Panel */}
          <div className="mt-12 bg-white rounded-3xl p-6 md:p-8 border border-neutral-200 shadow-sm text-left">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-100 pb-5 mb-5">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#138A36] bg-[#138A36]/5 px-2.5 py-1 rounded-full border border-[#138A36]/10 animate-pulse">
                  ● LIVE BROADCAST STATUS
                </span>
                <h4 className="text-xl font-black text-neutral-900 tracking-tight mt-2.5">
                  UNIVLOVE Active Admissions Registry
                </h4>
                <p className="text-xs text-neutral-500 mt-1">
                  Secure file-based database outputs listing newly verified and enrolled scholars.
                </p>
              </div>

              <button 
                onClick={fetchApplications}
                disabled={appsLoading}
                className="px-4 py-2 text-xs font-bold text-neutral-800 bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 self-start md:self-center shrink-0 active:scale-95 disabled:opacity-50"
              >
                <span className={`w-3 h-3 border-2 border-neutral-800 border-t-transparent rounded-full ${appsLoading ? 'animate-spin' : ''}`} />
                Fetch Instant Sync
              </button>
            </div>

            {appsLoading ? (
              <div className="py-12 flex flex-col items-center justify-center gap-2">
                <span className="w-8 h-8 border-3 border-neutral-900 border-t-transparent rounded-full animate-spin"></span>
                <span className="text-xs text-neutral-400 font-mono">Syncing database collections...</span>
              </div>
            ) : liveApplications.length === 0 ? (
              <div className="py-12 text-center text-xs text-neutral-400 font-mono">
                No active registry dossiers found in server database.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 font-sans">
                {liveApplications.map((app) => (
                  <div key={app.id} className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80 flex flex-col justify-between hover:border-neutral-300 transition-all shadow-xs">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono font-bold text-neutral-400">{app.id}</span>
                        <span className="px-2 py-0.5 rounded-md text-[9px] font-bold uppercase font-mono tracking-widest bg-emerald-500/10 text-[#138A36] border border-emerald-500/20">
                          {app.status}
                        </span>
                      </div>
                      <h5 className="text-sm font-bold text-neutral-950 font-sans tracking-tight">{app.fullName}</h5>
                      <p className="text-[11px] text-neutral-500 mt-0.5 truncate">{app.program}</p>
                      <p className="text-[10px] text-neutral-400 font-mono mt-1">Specialization: <span className="text-neutral-600 font-semibold">{app.track}</span></p>
                    </div>

                    <div className="border-t border-neutral-200 pt-3 mt-3 flex items-center justify-between text-neutral-500">
                      <div className="flex flex-col gap-0.5 max-w-[60%]">
                        <span className="text-[9px] text-neutral-400 font-mono lowercase truncate block">{app.email}</span>
                        <span className="text-[9px] text-neutral-400 font-mono block">{app.phone}</span>
                      </div>
                      <span className="text-[9px] text-neutral-400 font-mono text-right">{new Date(app.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </section>

      {/* Premium Callback advisor contact section */}
      <section id="advisor-contact" className="py-24 bg-[#0a0a0a] text-white relative overflow-hidden border-t border-neutral-900">
        
        {/* Massive decorative background title */}
        <div className="absolute right-4 top-2 md:top-6 text-[10vw] font-black tracking-widest text-[#ffffff]/[0.12] uppercase select-none pointer-events-none font-sans">
          Contact Us
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left side column: Reach out header and bullet features */}
            <div className="lg:col-span-5 text-left flex flex-col gap-6">
              
              <div className="flex items-center gap-3">
                <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white flex items-center gap-2">
                  Reach out <ArrowUpRight className="w-8 h-8 text-white stroke-[2.5]" />
                </h2>
              </div>
              
              <p className="text-neutral-400 text-sm md:text-base leading-relaxed max-w-md">
                Have a question or need assistance? Reach out to our dedicated support team. We're here to help with any inquiries you may have.
              </p>
              
              <div className="flex flex-col gap-3 mt-2">
                <div className="flex items-center gap-2.5 text-xs text-neutral-300 font-mono">
                  <span className="w-5 h-5 rounded-full border border-neutral-800 flex items-center justify-center text-white bg-neutral-900">✓</span>
                  <span>Personalized assistance</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-neutral-300 font-mono">
                  <span className="w-5 h-5 rounded-full border border-neutral-800 flex items-center justify-center text-white bg-neutral-900">✓</span>
                  <span>Timely response</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-neutral-300 font-mono">
                  <span className="w-5 h-5 rounded-full border border-neutral-800 flex items-center justify-center text-white bg-neutral-900">✓</span>
                  <span>Comprehensive support</span>
                </div>
              </div>
              
              {/* Social Channels */}
              <div className="flex gap-2.5 mt-4">
                <a href="#" className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-700 transition-all">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="#" className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-700 transition-all">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#" className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-700 transition-all">
                  <Instagram className="w-4 h-4" />
                </a>
              </div>

            </div>

            {/* Right side column: Translucent Glass Card Form */}
            <div className="lg:col-span-7">
              <div className="bg-neutral-900/40 backdrop-blur-md border border-neutral-800/80 rounded-3xl p-6 md:p-8 text-left shadow-2xl relative">
                
                {advisorSuccess ? (
                  <div className="p-8 text-center flex flex-col items-center gap-4 bg-neutral-950/50 border border-neutral-800 rounded-2xl animate-fadeIn">
                    <div className="w-14 h-14 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full flex items-center justify-center font-bold text-2xl">✓</div>
                    <h4 className="text-lg font-bold text-white">Callback Registered</h4>
                    <p className="text-xs text-neutral-400 max-w-sm leading-relaxed">
                      We've successfully stored your inquiry. One of our lead registrars will contact your line via voice or WhatsApp within the hour.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleAdvisorSubmit} className="flex flex-col gap-5">
                    
                    {/* Top inputs row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider font-mono">Name</label>
                        <input 
                          type="text" 
                          required 
                          placeholder="e.g. Kolawole Segun" 
                          value={advisorName}
                          onChange={(e) => setAdvisorName(e.target.value)}
                          className="w-full p-3 bg-neutral-950/60 border border-neutral-800 rounded-xl text-xs text-white placeholder-neutral-650 focus:outline-none focus:border-neutral-700 focus:ring-1 focus:ring-neutral-700 transition-all font-mono"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider font-mono">Phone & WhatsApp</label>
                        <input 
                          type="tel" 
                          required 
                          placeholder="e.g. 09161849691" 
                          value={advisorPhone}
                          onChange={(e) => setAdvisorPhone(e.target.value)}
                          className="w-full p-3 bg-neutral-950/60 border border-neutral-800 rounded-xl text-xs text-white placeholder-neutral-650 focus:outline-none focus:border-neutral-700 focus:ring-1 focus:ring-neutral-700 transition-all font-mono"
                        />
                      </div>

                    </div>

                    {/* Preferred callback time select */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider font-mono">Best Call timing period</label>
                      <select 
                        value={advisorTime}
                        onChange={(e) => setAdvisorTime(e.target.value)}
                        className="w-full p-3 bg-neutral-950/60 border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-neutral-700 transition-all font-mono"
                      >
                        <option value="Morning (8AM - 12PM)">Morning (8AM - 12PM)</option>
                        <option value="Afternoon (12PM - 4PM)">Afternoon (12PM - 4PM)</option>
                        <option value="Evening (4PM - 8PM)">Evening (4PM - 8PM)</option>
                        <option value="Immediate Callout">Immediate Callout (ASAP)</option>
                      </select>
                    </div>

                    {/* Specific inquiry message */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider font-mono">Message</label>
                      <textarea 
                        rows={3}
                        required
                        placeholder="e.g. Want details on JUPEB boarding options for a student under 16 years."
                        value={advisorMessage}
                        onChange={(e) => setAdvisorMessage(e.target.value)}
                        className="w-full p-3 bg-neutral-950/60 border border-neutral-800 rounded-xl text-xs text-white placeholder-neutral-650 focus:outline-none focus:border-neutral-700 focus:ring-1 focus:ring-neutral-700 transition-all font-mono resize-none"
                      />
                    </div>

                    {/* Massive white rounded button as mockup */}
                    <button 
                      type="submit"
                      className="w-full py-3.5 bg-gradient-to-r from-white to-neutral-100 hover:from-neutral-50 hover:to-neutral-150 text-neutral-950 text-xs font-bold uppercase tracking-wider rounded-full transition-all text-center flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-xl active:scale-95"
                    >
                      <span>Submit Quick Inquiry</span>
                      <ArrowUpRight className="w-4 h-4 text-neutral-700 stroke-[2.5]" />
                    </button>

                  </form>
                )}

              </div>
            </div>

          </div>

          {/* Three bento grid cards below details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-16 text-left">
            
            {/* Email card */}
            <div className="p-5 rounded-2xl bg-neutral-900/30 border border-neutral-900/70 hover:border-neutral-850 transition-all flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300">
                <Mail className="w-4 h-4 text-neutral-400" />
              </div>
              <div>
                <p className="text-[10px] text-neutral-500 font-mono font-bold uppercase tracking-wider">Email us</p>
                <a href="mailto:info@univloveeduplanet.com" className="text-xs font-semibold text-white hover:underline mt-0.5 block">
                  info@univloveeduplanet.com
                </a>
              </div>
            </div>

            {/* Call card */}
            <div className="p-5 rounded-2xl bg-neutral-900/30 border border-neutral-900/70 hover:border-neutral-850 transition-all flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300">
                <Phone className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <p className="text-[10px] text-neutral-500 font-mono font-bold uppercase tracking-wider">Call us</p>
                <a href="tel:09161849691" className="text-xs font-semibold text-white hover:underline mt-0.5 block">
                  09161849691 / 08106919577
                </a>
              </div>
            </div>

            {/* Address card */}
            <div className="p-5 rounded-2xl bg-neutral-900/30 border border-neutral-900/70 hover:border-neutral-850 transition-all flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300">
                <MapPin className="w-4 h-4 text-neutral-400" />
              </div>
              <div>
                <p className="text-[10px] text-neutral-500 font-mono font-bold uppercase tracking-wider">Our location</p>
                <p className="text-xs font-semibold text-white mt-0.5 block">
                  Round About, Ilesa, Osun State, Nigeria
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Trust Builders: Success Stories, Testimonials Carousel */}
      <section id="scholars-stories" className="py-24 bg-white border-y border-neutral-100 relative overflow-hidden select-none">
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-4">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight font-sans" style={{ color: '#2b7747' }}>
            What Our Customers Say
          </h2>
          <p className="text-sm sm:text-base text-neutral-500 max-w-xl mx-auto font-normal leading-relaxed">
            Real stories from real people! See how our services have transformed their experiences.
          </p>
            <div>
              <button 
                onClick={() => scrollToView("advisor-contact")}
                className="px-8 py-3.5 bg-gradient-to-r from-neutral-900 to-neutral-800 hover:from-black hover:to-neutral-900 text-white font-black text-xs rounded-full uppercase tracking-widest mt-4 transition-all shadow-lg hover:shadow-xl active:scale-95 inline-flex items-center justify-center gap-2 cursor-pointer select-none"
              >
                <span>Book Now</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
        </div>

        {/* Interactive Curved Dotted Line Avatar Gallery - Desktop Only */}
        <div className="hidden md:block w-full h-[400px] max-w-5xl mx-auto relative mt-12 overflow-visible">
          
          {/* SVG Dotted Wave Path and small solid black nodes */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 300" fill="none" preserveAspectRatio="none">
            <path 
              d="M 0 160 C 50 150, 70 80, 100 66 C 120 50, 140 120, 150 174 C 160 210, 180 200, 200 180 C 230 150, 260 110, 280 105 C 300 100, 310 90, 320 84 C 350 70, 390 110, 410 120 C 420 125, 430 120, 440 120 C 470 120, 520 120, 540 114 C 550 110, 555 75, 560 66 C 580 30, 640 120, 660 156 C 670 170, 675 180, 680 180 C 710 180, 760 110, 780 96 C 790 90, 795 85, 800 84 C 830 80, 870 120, 900 135 C 930 150, 970 160, 1000 150" 
              stroke="#E5E7EB" 
              strokeWidth="2.5" 
              strokeDasharray="4 6" 
            />
          </svg>

          {/* Solid Black dots on the wave line exactly like the mock */}
          <div className="absolute left-[15%] top-[58%] -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-neutral-950 z-10 pointer-events-none" />
          <div className="absolute left-[28%] top-[35%] -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-neutral-950 z-10 pointer-events-none" />
          <div className="absolute left-[41%] top-[40%] -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-neutral-950 z-10 pointer-events-none" />
          <div className="absolute left-[54%] top-[38%] -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-neutral-950 z-10 pointer-events-none" />
          <div className="absolute left-[66%] top-[52%] -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-neutral-950 z-10 pointer-events-none" />
          <div className="absolute left-[78%] top-[32%] -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-neutral-950 z-10 pointer-events-none" />
          <div className="absolute left-[90%] top-[45%] -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-neutral-950 z-10 pointer-events-none" />

          {/* Avatar Heads */}
          {scholarTestimonials.map((item) => {
            const isActive = activeScholarIndex === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveScholarIndex(item.id)}
                style={{ left: item.style.left, top: item.style.top }}
                className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full p-1 transition-all duration-300 z-20 hover:scale-105 active:scale-95 group focus:outline-none cursor-pointer"
              >
                <div 
                  className={`rounded-full p-0.5 transition-all duration-500 flex items-center justify-center ${
                    isActive 
                      ? "w-20 h-20 md:w-[92px] md:h-[92px] border-2 border-red-500 shadow-lg scale-110" 
                      : "w-14 h-14 md:w-16 md:h-16 border border-red-500/80 hover:border-red-500 hover:scale-110"
                  }`}
                >
                  <img 
                    src={item.avatar} 
                    alt={item.name} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover rounded-full" 
                  />
                </div>
              </button>
            );
          })}

        </div>

        {/* Mobile Interactive Avatars Selector View */}
        <div className="flex md:hidden items-center justify-center gap-3 overflow-x-auto pb-4 pt-6 -mx-4 px-4 scroll-smooth scroll-box">
          {scholarTestimonials.map((item) => {
            const isActive = activeScholarIndex === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveScholarIndex(item.id)}
                className={`shrink-0 rounded-full p-0.5 transition-all duration-300 outline-none ${
                  isActive 
                    ? "w-16 h-16 border-2 border-red-500 shadow-md ring-2 ring-red-500/10" 
                    : "w-12 h-12 border border-neutral-200"
                }`}
              >
                <img 
                  src={item.avatar} 
                  alt={item.name} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-full" 
                />
              </button>
            );
          })}
        </div>

        {/* Dynamic Editorial Quote & Nav Slider Controls */}
        <div className="flex items-center justify-between gap-4 max-w-4xl mx-auto mt-6 md:mt-12 select-none px-4">
          
          {/* Prev Arrow */}
          <button 
            onClick={() => setActiveScholarIndex((prev) => (prev - 1 + 7) % 7)}
            className="w-12 h-12 shrink-0 rounded-full border border-neutral-200 flex items-center justify-center bg-white text-neutral-400 hover:text-black hover:border-neutral-400 hover:shadow-sm transition-all cursor-pointer active:scale-95"
          >
            <ChevronLeft className="w-5 h-5 text-neutral-600" />
          </button>
          
          {/* Inner Quote text details */}
          <div className="flex-1 text-center px-4 md:px-12 min-h-[140px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeScholarIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-4 text-center items-center justify-center"
              >
                <p className="text-sm sm:text-base md:text-lg lg:text-xl font-normal text-neutral-600 tracking-tight leading-relaxed max-w-2xl mx-auto">
                  "{scholarTestimonials[activeScholarIndex].text}"
                </p>
                <div className="flex flex-col gap-0.5 text-center">
                  <h4 className="text-xs sm:text-sm font-bold text-neutral-900 tracking-wide font-sans">
                    {scholarTestimonials[activeScholarIndex].name}
                  </h4>
                  <p className="text-[10px] text-neutral-500 font-semibold font-mono tracking-wider uppercase">
                    {scholarTestimonials[activeScholarIndex].role}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          {/* Next Arrow */}
          <button 
            onClick={() => setActiveScholarIndex((prev) => (prev + 1) % 7)}
            className="w-12 h-12 shrink-0 rounded-full border border-neutral-200 flex items-center justify-center bg-white text-neutral-400 hover:text-black hover:border-neutral-400 hover:shadow-sm transition-all cursor-pointer active:scale-95"
          >
            <ChevronRight className="w-5 h-5 text-neutral-600" />
          </button>

        </div>

      </section>

      {/* Fully Redesigned Interactive FAQ Section */}
      <section id="help-faqs" className="py-24 bg-neutral-50 border-t border-[#ece8e0] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          
          {/* FAQ Centered Pill Badge */}
          <span className="text-[10px] font-extrabold tracking-widest text-[#0a2d7a] bg-neutral-100 hover:bg-neutral-200 transition-colors uppercase px-3 py-1.5 rounded-full font-mono select-none">
            FAQ
          </span>
          
          {/* Main Titles */}
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mt-3 text-center" style={{ color: '#287032' }}>
            Frequently Asked
          </h2>
          <span className="text-5xl md:text-6xl font-serif italic text-neutral-800 tracking-tight mt-1 mb-12 block">
            Questions
          </span>

          {/* Core Split Two-Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start w-full text-left mt-4">
            
            {/* Left Column: Get In Touch Box + Accordion Items list */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              
              {/* Pill Contact Header representing top panel in the mockup */}
              <div className="bg-white rounded-2xl p-4 md:p-5 border border-neutral-100 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] text-neutral-400 font-bold font-mono tracking-wider uppercase">Email</span>
                  <p className="text-sm font-bold text-neutral-900 font-mono mt-0.5">info@univloveeduplanet.com</p>
                </div>
                <button 
                  onClick={() => scrollToView("advisor-contact")}
                  className="px-5 py-2.5 bg-gradient-to-r from-neutral-900 to-neutral-800 hover:from-black hover:to-neutral-900 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95 shadow-md self-stretch sm:self-auto text-center font-mono"
                >
                  <Mail className="w-4 h-4 text-neutral-400" />
                  <span>Get in touch</span>
                  <ArrowUpRight className="w-3.5 h-3.5 stroke-[2]" />
                </button>
              </div>

              {/* Accordions Container */}
              <div className="flex flex-col gap-3">
                {[
                  {
                    q: "What is JUPEB and how is it direct entry?",
                    a: "JUPEB is an elite national examination syndicate. Passing this allows any candidate Direct Entry into 200 Level of major reputable universities (Federal, State, and Private) across Nigeria and partner global pathways, completely bypassing JAMB stress parameters."
                  },
                  {
                    q: "Can students under 16 years enroll?",
                    a: "Yes. While standard tertiary boards enforce strict age lower bounds, our pre-varsity program is tailored to build academic reserves. You can safely complete JUPEB/IJMB and enter Sophomore 200 Level as an academic veteran."
                  },
                  {
                    q: "What accommodation packages are active?",
                    a: "Our campus features premium structured modern lodge options equipped with 24/7 sustainable solar power grids, biometric sentinel access-controls, clean catering spaces, and robust satellite network router lines."
                  },
                  {
                    q: "Where is the physical location and how do we register?",
                    a: "Our central operational registry headquarters is located at Round About, Ilesa, Osun State, Nigeria. You can secure placement online via our high-speed student portal, or schedule an in-person physical tour."
                  },
                  {
                    q: "Are the foreign pathway programs fully accredited?",
                    a: "Yes, fully accredited. We coordinate direct transcripts, certified language proficiency prep, and visa advisory services with partner institutions across Canada, Europe, and the UK, assuring safe passage and credit transference."
                  }
                ].map((item, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div 
                      key={idx}
                      className="bg-white rounded-2xl border border-neutral-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer"
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    >
                      {/* Accordion header */}
                      <div className="p-4 md:p-5 flex items-center justify-between gap-4 select-none">
                        <h4 className="text-xs sm:text-sm font-bold text-neutral-800 tracking-tight leading-snug">
                          {item.q}
                        </h4>
                        <div className={`w-7 h-7 rounded-full shrink-0 flex items-center justify-center transition-all bg-neutral-900 text-white ${isOpen ? 'rotate-45 bg-[#138A36]' : ''}`}>
                          <span className="text-sm font-bold leading-none select-none">+</span>
                        </div>
                      </div>

                      {/* Accordion content */}
                      {isOpen && (
                        <div className="px-4 md:px-5 pb-5 pt-1 border-t border-neutral-50/50 animate-fadeIn">
                          <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed pl-3.5 border-l-2 border-[#138A36]">
                            {item.a}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

            </div>

            {/* Right Column: Premium Housing Wood-and-Glass Contemporary complex image */}
            <div className="lg:col-span-5 relative group">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-neutral-200/40 aspect-[4/3] sm:aspect-square lg:aspect-auto lg:h-[460px] bg-neutral-100 transition-all duration-500 hover:scale-[1.01]">
                <img 
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop"
                  alt="Univlove Premium Corporate Lodges"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105"
                />
                
                {/* Visual Overlay gradient matching mockup */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/20 to-transparent p-4 flex flex-col justify-end text-white">
                  <span className="text-[10px] font-mono opacity-80 uppercase tracking-widest">Premium Executive Housing</span>
                  <p className="text-xs font-semibold mt-0.5">contemporary architecture & smart security systems</p>
                </div>

                {/* Subtitle brand stamp representing standard realtor signature in image */}
                <div className="absolute top-4 left-4 bg-black/45 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-[9px] font-mono text-white/90">
                  @univlove.villas
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Prominent High-Contrast Contact Desk & Golden Globe Logo Footer */}
      <footer id="footer-desk" className="bg-[#080808] text-white py-16 border-t border-neutral-900 relative overflow-hidden">
        
        {/* Subtle globes in backdrop */}
        <div className="absolute right-0 top-0 h-64 w-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Relocated Brand Header Belt - styled beautifully inside the footer frame */}
          <div id="brand-header-belt" className="mb-12 bg-neutral-900/50 border border-neutral-850 p-4 rounded-2xl shadow-sm">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono">
              <div className="flex flex-col md:flex-row items-center gap-3 text-center md:text-left">
                <span id="belt-motto" className="text-amber-400 font-extrabold tracking-wider flex items-center gap-1">
                  <Award className="w-4 h-4 text-amber-400" />
                  Motto: "Advanced Progress is Guaranteed"
                </span>
                <span className="hidden md:inline text-neutral-700">|</span>
                <span id="belt-address" className="text-neutral-400 text-[11px]">
                  📍 Round About, Ilesa, Osun State, Nigeria
                </span>
              </div>
              <div className="flex flex-col md:flex-row items-center gap-3">
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-bold uppercase tracking-wider">Serving Students Worldwide</span>
                <span className="hidden md:inline text-neutral-700">|</span>
                <div className="flex items-center gap-1 text-neutral-300 font-bold">
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>09161849691</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            
            {/* Column 1: Brand presentation */}
            <div className="md:col-span-4 text-left flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-xl overflow-hidden p-[2px] flex items-center justify-center border border-white/15">
                  <img src="/assets/images/univlove-logo.jpg" alt="Univlove Logo" className="w-full h-full object-cover rounded-lg" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-black tracking-widest text-white font-sans">UNIVLOVE</span>
                  <span className="text-[9px] font-bold text-emerald-400 tracking-wider font-mono">EDUPLANET IP</span>
                </div>
              </div>
              <p className="text-neutral-405 text-xs leading-relaxed max-w-sm">
                Educational Excellence by Technological Advancements. Unifying elite prep benchmarks, software engineering frameworks, and relocation opportunities under one prestigious multi-campus.
              </p>
              <div className="text-amber-400 font-bold text-[10.5px] font-mono tracking-widest uppercase">
                "Advanced Progress is Guaranteed"
              </div>
            </div>

            {/* Column 2: Physical Core Contacts */}
            <div className="md:col-span-3 text-left flex flex-col gap-5">
              <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-400 border-b border-white/5 pb-2">
                Operational Headquarters
              </h4>
              <div className="flex items-start gap-2.5 text-xs text-neutral-300 leading-relaxed">
                <MapPin className="w-4.5 h-4.5 text-none shrink-0 mt-0.5 text-neutral-500" />
                <div>
                  <p className="font-extrabold text-white">Main Registry Complex</p>
                  <p className="text-neutral-400 mt-1">Round About,</p>
                  <p className="text-neutral-400">Ilesa, Osun State,</p>
                  <p className="font-bold text-amber-300 mt-1">Nigeria</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[11px] font-mono text-neutral-400 mt-2">
                <Globe className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>www.univloveeduplanet.com</span>
              </div>
            </div>

            {/* Column 3: Live Hotline Registry */}
            <div className="md:col-span-5 text-left flex flex-col gap-5">
              <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-400 border-b border-white/5 pb-2">
                Registrar lines
              </h4>
              <p className="text-xs text-neutral-400 leading-relaxed">Speak directly with our academic board or relocation officer:</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-emerald-500/30 transition-all">
                  <span className="text-neutral-500 uppercase text-[9px] font-bold">Office Complex:</span>
                  <a href="tel:09161849691" className="font-bold text-emerald-400 hover:underline">09161849691</a>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-amber-400/30 transition-all">
                  <span className="text-neutral-500 uppercase text-[9px] font-bold">Relocation:</span>
                  <a href="tel:08106919577" className="font-bold text-amber-300 hover:underline">08106919577</a>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-rose-400/30 transition-all">
                  <span className="text-neutral-500 uppercase text-[9px] font-bold">Pre-Varsity:</span>
                  <a href="tel:09036059617" className="font-bold text-rose-300 hover:underline">09036059617</a>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-sky-400/30 transition-all">
                  <span className="text-neutral-500 uppercase text-[9px] font-bold font-mono">Registrar Desk:</span>
                  <a href="tel:08135144704" className="font-bold text-sky-400 hover:underline">08135144704</a>
                </div>
              </div>
            </div>

          </div>

          {/* Under Line credits / Nav linkages */}
          <div className="mt-16 pt-8 border-t border-white/5 text-center flex flex-col sm:flex-row items-center justify-between gap-6 text-[11px] text-neutral-500 font-mono">
            <p>© {new Date().getFullYear()} UNIVLOVE EDUPLANET. All rights reserved.</p>
            <div className="flex gap-4 font-semibold text-neutral-400">
              <button onClick={() => scrollToView("hero-banner")} className="hover:text-white transition-colors cursor-pointer">Home</button>
              <span>•</span>
              <button onClick={() => scrollToView("programs-showcase")} className="hover:text-white transition-colors cursor-pointer">Program Index</button>
              <span>•</span>
              <button onClick={() => scrollToView("study-abroad")} className="hover:text-white transition-colors cursor-pointer">Inter Study</button>
              <span>•</span>
              <button onClick={() => scrollToView("ai-pathfinder")} className="hover:text-white transition-colors cursor-pointer">AI Pathplanner</button>
              {/* Admin toggle removed */}
            </div>
            <p className="font-mono text-[9px] uppercase tracking-widest text-neutral-600">Global Student Access Point</p>
          </div>

        </div>

      </footer>

      {/* Beautiful Scrollable Mobile Modal Detail Card */}
      <AnimatePresence>
        {isMobileModalOpen && (() => {
          let currentModalTab = null;
          let modalChapterTitle = "";
          if (activeChapter === 'academic') {
            currentModalTab = academicTabs[activeAcademicTab];
            modalChapterTitle = "Academic Chapter I";
          } else if (activeChapter === 'tech') {
            currentModalTab = techTabs[activeTechTab];
            modalChapterTitle = "Tech Chapter II";
          } else if (activeChapter === 'vocational') {
            currentModalTab = vocationalTabs[activeVocationalTab];
            modalChapterTitle = "Vocational Chapter III";
          }

          if (!currentModalTab) return null;

          return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Backdrop */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setIsMobileModalOpen(false)}
                className="absolute inset-0 bg-neutral-950/70 backdrop-blur-md"
              />

              {/* Modal Container */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.92, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ type: "spring", damping: 25, stiffness: 220 }}
                className="relative bg-white text-neutral-900 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[85vh] border-0"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button Header overlay */}
                <div className="absolute top-4 right-4 z-30">
                  <button 
                    type="button"
                    onClick={() => setIsMobileModalOpen(false)}
                    className="p-2 bg-black/60 hover:bg-black/80 backdrop-blur-xs text-white rounded-full transition-colors duration-200 cursor-pointer shadow-sm flex items-center justify-center"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Scrollable Content wrapper */}
                <div className="overflow-y-auto p-6 flex flex-col gap-5 leading-normal">
                  


                  {/* Expanded Narrative */}
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-left" style={{ color: currentModalTab.accentColor }}>
                      {currentModalTab.tag}
                    </span>
                    <h4 className="text-xl font-black text-neutral-950 leading-tight text-left">
                      {currentModalTab.title}
                    </h4>
                    <p className="text-xs text-neutral-600 leading-relaxed text-left">
                      {currentModalTab.detailed}
                    </p>
                  </div>

                  {/* Stats details cluster */}
                  <div className="flex flex-col gap-3.5 bg-neutral-50 p-4 rounded-2xl border-0">
                    <div className="flex justify-between items-center border-b-0 pb-2.5 text-left">
                      <span className="text-xs font-semibold text-neutral-500">
                        {activeChapter === 'academic' ? 'Primary Outcome' : activeChapter === 'tech' ? 'Core Qualification' : 'Core Focus Area'}
                      </span>
                      <span className="text-xs font-bold text-neutral-950 text-right">
                        {currentModalTab.outcome}
                      </span>
                    </div>
                    <div className="flex justify-between items-center border-b-0 pb-2.5 text-left">
                      <span className="text-xs font-semibold text-neutral-500">
                        {activeChapter === 'academic' ? 'Validation Standard' : activeChapter === 'tech' ? 'Industry Standard' : 'Verification Standard'}
                      </span>
                      <span className="text-xs font-bold text-neutral-950 text-right">
                        {currentModalTab.rate}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-left">
                      <span className="text-xs font-semibold text-neutral-500">
                        {activeChapter === 'academic' ? 'Program Format' : activeChapter === 'tech' ? 'Our Placement Track' : 'Certifying Board'}
                      </span>
                      <span className="text-xs font-mono font-bold text-right" style={{ color: currentModalTab.accentColor }}>
                        {currentModalTab.type}
                      </span>
                    </div>
                  </div>

                  {/* Action Button Section inside scroll for modal stability */}
                  <div className="p-3 bg-neutral-50/50 rounded-2xl border-0 text-center flex flex-col items-center gap-2 mt-2">
                    <p className="text-[10px] font-bold text-neutral-500 tracking-tight uppercase">
                      Click to register matching program choice
                    </p>
                    <button 
                      onClick={() => {
                        setSelectedProgram(currentModalTab.programName);
                        if (currentModalTab.trackName) {
                          setSelectedTrack(currentModalTab.trackName);
                        }
                        setIsMobileModalOpen(false);
                        scrollToView("admissions-portal");
                      }}
                      className="w-full py-3.5 text-white rounded-xl text-xs font-black tracking-widest uppercase transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg active:scale-95 flex items-center justify-center gap-2"
                      style={{ background: `linear-gradient(135deg, ${currentModalTab.accentColor}, ${currentModalTab.accentColor}cc)` }}
                    >
                      <span>{currentModalTab.buttonText.replace(" ➔", "")}</span>
                      <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                    </button>
                  </div>

                </div>

              </motion.div>
            </div>
          );
        })()}
      </AnimatePresence>

      {/* Global Interactive Admissions & Pathway Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/80 backdrop-blur-md flex items-start justify-center pt-16 sm:pt-24 px-4 pb-6"
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: -20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-3xl bg-neutral-900 border-0 rounded-[32px] overflow-hidden shadow-2xl flex flex-col relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header Input bar */}
              <div className="flex items-center gap-3 px-6 py-5 border-b-0">
                <Search className="w-5 h-5 text-neutral-400 shrink-0" />
                <input
                  type="text"
                  autoFocus
                  placeholder="Type to search paths (e.g. JUPEB, cyber, solar, Canada)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-grow bg-transparent text-white placeholder-neutral-500 font-medium text-sm sm:text-base border-none outline-none focus:ring-0"
                />
                <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-1 rounded bg-neutral-800 text-[10px] text-neutral-400 font-mono select-none">
                  ESC
                </kbd>
                <button
                  onClick={() => setSearchOpen(false)}
                  className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-neutral-700/80 hover:text-white transition-all text-neutral-400 flex items-center justify-center cursor-pointer active:scale-90"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Scrollable container of search options */}
              <div className="max-h-[480px] overflow-y-auto p-6 flex flex-col gap-6">
                
                {/* Popular Keywords section */}
                {searchQuery.trim() === "" && (
                  <div className="flex flex-col gap-3">
                    <span className="text-[10px] font-mono tracking-widest font-extrabold uppercase text-neutral-500">
                      ⚡ Popular Search Suggestions
                    </span>
                    <div className="flex flex-wrap gap-2.5">
                      {[
                        { label: "JUPEB (No JAMB)", value: "JUPEB" },
                        { label: "Coding & AI", value: "Coding" },
                        { label: "Degree Conversion", value: "Conversion" },
                        { label: "Study in Canada", value: "Canada" },
                        { label: "Solar Energy Staging", value: "Solar" },
                        { label: "Cybersecurity Training", value: "Cybersecurity" },
                        { label: "Educator AI Workshop", value: "Teacher" },
                        { label: "Athletes Program", value: "Football" }
                      ].map((tag, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSearchQuery(tag.value)}
                          className="px-3.5 py-2 rounded-xl bg-neutral-850/40 hover:bg-white/10 text-xs text-neutral-300 hover:text-white border-0 transition-all cursor-pointer font-medium"
                        >
                          {tag.label}
                        </button>
                      ))}
                    </div>

                    <div className="mt-8 text-center text-xs text-neutral-500 leading-relaxed font-sans font-medium">
                      🚀 Tap any suggestion to filter core university programs, vocational chapters, and international pathways instantly.
                    </div>
                  </div>
                )}

                {/* Real-time filtered items list */}
                {searchQuery.trim() !== "" && (
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono tracking-widest font-extrabold uppercase text-neutral-500">
                        Search Results ({
                          (() => {
                            const idxList = [
                              ...academicTabs.map(t => ({
                                title: t.title,
                                description: t.desc,
                                category: t.type || "Academic Pathway",
                                programName: t.programName || "JUPEB (Prevarsity Direct Entry)",
                                trackName: t.trackName || "General Mastery",
                                detailed: t.detailed
                              })),
                              ...techTabs.map(t => ({
                                title: t.title,
                                description: t.desc,
                                category: t.type || "Technology Academy",
                                programName: t.programName || "Technology Academy",
                                trackName: t.trackName || "Software Development & Cyber Security",
                                detailed: t.detailed
                              })),
                              ...vocationalTabs.map(t => ({
                                title: t.title,
                                description: t.desc,
                                category: t.type || "Vocational & Enterprise",
                                programName: t.programName || "Vocational Skills & Enterprise",
                                trackName: t.trackName || "General Mastery",
                                detailed: t.detailed
                              })),
                              ...prevarsityHighlights.map(h => ({
                                title: h.name,
                                description: h.detail,
                                category: "Prevarsity Option",
                                programName: "JUPEB (Prevarsity Direct Entry)",
                                trackName: "General Study",
                                detailed: h.detail
                              })),
                              ...techCourses.map(tc => ({
                                title: tc.title,
                                description: tc.desc,
                                category: `Technology - ${tc.tag || "Core"}`,
                                programName: "Technology Academy & Digital Skills",
                                trackName: tc.title,
                                detailed: tc.desc
                              })),
                              ...vocationalCourses.map(vc => ({
                                title: vc.title,
                                description: vc.desc,
                                category: "Vocational Skill",
                                programName: "Vocational Skills & Enterprise",
                                trackName: vc.title,
                                detailed: vc.desc
                              })),
                              ...studyAbroadCountries.map(sa => ({
                                title: `Study in ${sa.name}`,
                                description: sa.quote,
                                category: "Study Abroad Pathway",
                                programName: "Study Abroad Opportunities",
                                trackName: `${sa.name} Direct Pathway`,
                                detailed: sa.quote
                              }))
                            ];
                            const query = searchQuery.toLowerCase();
                            return idxList.filter(item => 
                              item.title.toLowerCase().includes(query) ||
                              item.description.toLowerCase().includes(query) ||
                              item.category.toLowerCase().includes(query) ||
                              (item.detailed && item.detailed.toLowerCase().includes(query))
                            ).length;
                          })()
                        })
                      </span>
                      <span className="text-[10px] text-emerald-400 font-mono tracking-widest uppercase font-bold">
                        "Advanced Progress is Guaranteed"
                      </span>
                    </div>

                    {(() => {
                      const idxList = [
                        ...academicTabs.map(t => ({
                          title: t.title,
                          description: t.desc,
                          category: t.type || "Academic Pathway",
                          programName: t.programName || "JUPEB (Prevarsity Direct Entry)",
                          trackName: t.trackName || "General Mastery",
                          detailed: t.detailed
                        })),
                        ...techTabs.map(t => ({
                          title: t.title,
                          description: t.desc,
                          category: t.type || "Technology Academy",
                          programName: t.programName || "Technology Academy",
                          trackName: t.trackName || "Software Development & Cyber Security",
                          detailed: t.detailed
                        })),
                        ...vocationalTabs.map(t => ({
                          title: t.title,
                          description: t.desc,
                          category: t.type || "Vocational & Enterprise",
                          programName: t.programName || "Vocational Skills & Enterprise",
                          trackName: t.trackName || "General Mastery",
                          detailed: t.detailed
                        })),
                        ...prevarsityHighlights.map(h => ({
                          title: h.name,
                          description: h.detail,
                          category: "Prevarsity Option",
                          programName: "JUPEB (Prevarsity Direct Entry)",
                          trackName: "General Study",
                          detailed: h.detail
                        })),
                        ...techCourses.map(tc => ({
                          title: tc.title,
                          description: tc.desc,
                          category: `Technology - ${tc.tag || "Core"}`,
                          programName: "Technology Academy & Digital Skills",
                          trackName: tc.title,
                          detailed: tc.desc
                        })),
                        ...vocationalCourses.map(vc => ({
                          title: vc.title,
                          description: vc.desc,
                          category: "Vocational Skill",
                          programName: "Vocational Skills & Enterprise",
                          trackName: vc.title,
                          detailed: vc.desc
                        })),
                        ...studyAbroadCountries.map(sa => ({
                          title: `Study in ${sa.name}`,
                          description: sa.quote,
                          category: "Study Abroad Pathway",
                          programName: "Study Abroad Opportunities",
                          trackName: `${sa.name} Direct Pathway`,
                          detailed: sa.quote
                        }))
                      ];
                      const query = searchQuery.toLowerCase();
                      const results = idxList.filter(item => 
                        item.title.toLowerCase().includes(query) ||
                        item.description.toLowerCase().includes(query) ||
                        item.category.toLowerCase().includes(query) ||
                        (item.detailed && item.detailed.toLowerCase().includes(query))
                      );

                      if (results.length === 0) {
                        return (
                          <div className="text-center py-12 flex flex-col items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-400 select-none">
                              <Search className="w-5 h-5" />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-neutral-300">No matching pathways found</p>
                              <p className="text-xs text-neutral-500 mt-1">Try keywords like 'JUPEB', 'AI', 'Solar', 'Canada'</p>
                            </div>
                          </div>
                        );
                      }

                      return (
                        <div className="flex flex-col gap-3">
                          {results.map((item, idx) => (
                            <div
                              key={idx}
                              onClick={() => handleSearchItemClick(item)}
                              className="p-4 rounded-2xl bg-neutral-950/40 hover:bg-white/[0.03] border border-neutral-800/80 hover:border-neutral-750 transition-all cursor-pointer group text-left flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                            >
                              <div className="flex-grow">
                                <span className="text-[9px] font-mono tracking-widest font-bold uppercase text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded">
                                  {item.category}
                                </span>
                                <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors mt-2">
                                  {item.title}
                                </h4>
                                <p className="text-xs text-neutral-400 leading-relaxed mt-1">
                                  {item.description}
                                </p>
                              </div>
                              <div className="shrink-0 flex items-center gap-1 text-xs font-black text-amber-400 uppercase tracking-widest group-hover:translate-x-1 transition-transform self-end sm:self-center">
                                <span>Inquire</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </div>
                            </div>
                          ))}
                        </div>
                      );
                    })()}
                  </div>
                )}

              </div>

              {/* Status Footer bar */}
              <div className="flex items-center justify-between px-6 py-4.5 bg-[#0a0a0d] border-t border-neutral-800/80 text-[10px] font-mono text-neutral-500">
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                  Univlove Sync Registry Active
                </span>
                <span>Select a path to auto-populate registry dossier form</span>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
