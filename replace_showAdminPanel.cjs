const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(/setShowAdminPanel\(false\)/g, "setViewMode('home')");
code = code.replace(/setShowAdminPanel\(true\)/g, "setViewMode('admin')");
code = code.replace(/setShowAdminPanel\(!showAdminPanel\)/g, "setViewMode(viewMode === 'admin' ? 'home' : 'admin')");

// Also replace the render block
code = code.replace(/if \(showAdminPanel\) \{/g, "if (viewMode === 'admin') {");

fs.writeFileSync('src/App.tsx', code, 'utf8');
console.log("Success! App.tsx updated.");
