// ===== NAVIGATION =====
export const navLinks = [
  { id: "about", title: "About" },
  { id: "skills", title: "Skills" },
  { id: "projects", title: "Projects" },
  { id: "contact", title: "Contact" },
];

// ===== HERO =====
export const heroData = {
  name: "Việt Trần",
  title: "Product Design",
  subtitle: "I craft immersive digital experiences",
  description:
    "Have 4+ years of experience in various Front-end developer fields and 6+ years of experience in UX/UI & Product Design. Strong understanding of the principles and practices of product requirements, documentation, designing tools, and prototyping tools.",
  roles: ["Product Design", "Senior UX/UI Design", "Front-end Developer", "Business Analyst"],
};

// ===== ABOUT =====
export const aboutData = {
  bio: "Hello! I'm Việt Trần, a Product Designer with 6+ years of experience in UX/UI & Product Design, and 4+ years of experience in various Front-end developer fields. I have a strong understanding of product requirement documents, user flows, and wireframes, enabling me to translate complex system concepts into clear documentation and premium designs.",
  details: [
    { label: "Location", value: "Ho Chi Minh City, Vietnam" },
    { label: "Experience", value: "6+ Years" },
    { label: "Education", value: "IT & Product Design" },
    { label: "Age", value: "33 (DOB: 1993)" },
  ],
  stats: [
    { value: "6+ Yrs", label: "UX/UI Design" },
    { value: "4+ Yrs", label: "Front-end Dev" },
    { value: "15+", label: "Projects Completed" },
    { value: "1993", label: "Year of Birth" },
  ],
};

// ===== SKILLS =====
export const skillCategories = [
  {
    name: "UX/UI & Design",
    color: "#915EFF",
    icon: "🎨",
    skills: [
      { name: "UX/UI Design", level: 95, icon: "🎭" },
      { name: "Prototyping & Wireframing", level: 92, icon: "✏️" },
      { name: "Research & Development", level: 88, icon: "🔍" },
      { name: "Motion (Rive, Lottie)", level: 80, icon: "🎬" },
      { name: "Graphic Design (Ps, Ai, Canva)", level: 70, icon: "🖌️" },
    ],
  },
  {
    name: "Development",
    color: "#00D9FF",
    icon: "💻",
    skills: [
      { name: "WordPress, Framer, Webflow", level: 85, icon: "🖥️" },
      { name: "React.js / Web Builder", level: 78, icon: "⚛️" },
      { name: "HTML & CSS & JS", level: 75, icon: "🌐" },
      { name: "SQL (Basic)", level: 70, icon: "🗄️" },
    ],
  },
  {
    name: "Business Analysis & Tools",
    color: "#FF6B9D",
    icon: "🔧",
    skills: [
      { name: "Figma", level: 95, icon: "🎨" },
      { name: "Business Analysis (BRD/FRS)", level: 85, icon: "📊" },
      { name: "Git & GitHub", level: 80, icon: "🐙" },
    ],
  },
];

// Globe skill tags for the 3D globe
export const globeSkills = [
  "React", "Framer", "Webflow", "WordPress", "HTML",
  "CSS", "JavaScript", "SQL", "UX Design", "UI Design",
  "Prototyping", "Rive", "Lottie", "Photoshop", "Illustrator",
  "Canva", "Figma", "R&D", "Business Analysis", "Wireframing",
];

// ===== PROJECTS =====
export const projects = [
  {
    id: 1,
    name: "Active.vn",
    shortDesc: "Bicycle E-commerce & Service Platform",
    description:
      "Designed an all-in-one platform for bicycle sales, accessories, rental services, and on-demand home maintenance. Built a cohesive visual identity with a clean, sporty look, applying responsive design for desktop and mobile.",
    tags: ["Product Lead", "E-Commerce", "UX/UI", "Brand Identity"],
    category: "Product Design",
    color: "#915EFF",
    gradient: "from-violet-600 to-purple-900",
    demoUrl: "https://active.vn",
    githubUrl: "https://github.com",
    features: [
      "Product Scope & Strategy",
      "E-commerce Checkout Flow",
      "Short/Long-term Bike Rentals",
      "On-demand Home Maintenance Service",
    ],
    emoji: "🚲",
  },
  {
    id: 2,
    name: "Global Care",
    shortDesc: "Insurtech Web & Mobile Platform",
    description:
      "Analyzed and documented business requirements for health, travel, and claim insurance products. Designed user flows, wireframes, and UX solutions to simplify insurance processes, reducing operational friction.",
    tags: ["Product Design", "Insurtech", "UX/UI", "BRD/FRS"],
    category: "Product Design",
    color: "#00D9FF",
    gradient: "from-cyan-600 to-blue-900",
    demoUrl: "https://globalcare.vn",
    githubUrl: "https://github.com",
    features: [
      "Insurance Policy Purchase Flows",
      "Optimized Claim Processing",
      "BRD, FRS & User Stories",
      "Usability Analysis",
    ],
    emoji: "🛡️",
  },
  {
    id: 3,
    name: "Web & App Cathay Life",
    shortDesc: "Seamless digital insurance experience",
    description:
      "Created a trustworthy digital experience with simplified user flows for policy lookup, premium payment, and claim requests. Optimized mobile-first screens and integrated transaction reminders.",
    tags: ["UX/UI Design", "FinTech", "Mobile App", "Cathay Life"],
    category: "UX/UI Design",
    color: "#FF6B9D",
    gradient: "from-pink-600 to-rose-900",
    demoUrl: "https://github.com",
    githubUrl: "https://github.com",
    features: [
      "Simplified Policy Lookup",
      "Premium Payment Flow",
      "Health-related Services Integration",
      "Bilingual Support (VI/EN)",
    ],
    emoji: "💼",
  },
  {
    id: 4,
    name: "VAS Website",
    shortDesc: "Vietnam Australia International School Portal",
    description:
      "Delivered a modern and informative digital experience for students, parents, and prospective families. Crafted clear information architecture, responsive layouts, and visual storytelling components.",
    tags: ["UX/UI Design", "Education", "Information Architecture"],
    category: "UX/UI Design",
    color: "#F59E0B",
    gradient: "from-amber-600 to-orange-900",
    demoUrl: "https://vas.edu.vn",
    githubUrl: "https://github.com",
    features: [
      "Admissions & Program IA",
      "User-centered Navigation",
      "Visual Storytelling Elements",
      "Responsive Web Layout",
    ],
    emoji: "🏫",
  },
  {
    id: 5,
    name: "Cake by VPBank",
    shortDesc: "Seamless digital banking for youth",
    description:
      "Contributed to the redesign and improvement of several web and mobile components for Cake by VPBank. Optimized user flows for account management, payments, and digital financial services.",
    tags: ["Redesign", "FinTech", "Mobile App", "VPBank"],
    category: "UX/UI Design",
    color: "#10B981",
    gradient: "from-emerald-600 to-teal-900",
    demoUrl: "https://cake.vn",
    githubUrl: "https://github.com",
    features: [
      "Mobile-first Navigation",
      "Redesigned Account Setup",
      "Convenient Payment Interfaces",
      "UX Friction Reduction",
    ],
    emoji: "🎂",
  },
  {
    id: 6,
    name: "Kingfoodmarket Systems",
    shortDesc: "Retail & F&B E-Commerce, POS, CRM",
    description:
      "Conducted product discovery in F&B retail, designing shopping apps (search, checkout), POS cashier interfaces, CRM loyalty dashboards, and internal inventory management tools.",
    tags: ["Business Analyst", "UX/UI Design", "POS/CRM", "Retail"],
    category: "BA & UX/UI",
    color: "#8B5CF6",
    gradient: "from-purple-600 to-indigo-900",
    demoUrl: "https://kingfoodmarket.com",
    githubUrl: "https://github.com",
    features: [
      "Online E-commerce Platform",
      "User-friendly Cashier POS",
      "CRM Loyalty Dashboard",
      "Internal Inventory App Flow",
    ],
    emoji: "🥬",
  },
];

// ===== EXPERIENCE =====
export const experiences = [
  {
    title: "Senior Product Designer",
    company: "National Digital Twin 15 (NDT 15)",
    period: "06/2025 – Present",
    color: "#915EFF",
    desc: "Analyzed requirements for social media and CMS platforms. Collaborated on Smart Digital Platforms and data-driven features for Digital Twin assets.",
  },
  {
    title: "Senior UX/UI Designer",
    company: "Akaverse (FPT IS)",
    period: "02/2024 – 05/2025",
    color: "#00D9FF",
    desc: "Designed VR/AR interactive systems. Researched Coke VR/AR for Coca-Cola Vietnam, ATM AR for TPBank, and CRM 'Số hoá 360' for Lâm Đồng Museum.",
  },
  {
    title: "Senior Product Designer",
    company: "MangoAds",
    period: "07/2023 – 02/2024",
    color: "#FF6B9D",
    desc: "R&D web/app solutions for Cathay Life, VAS, and MB Bank. Designed internal CRM and researched UX/UI trends for management.",
  },
  {
    title: "Senior UX/UI Designer",
    company: "Eduplax",
    period: "09/2022 – 02/2023",
    color: "#F59E0B",
    desc: "Designed comprehensive E-learning platform flows, dashboard, lesson, quiz, and progress tracking with gamification elements.",
  },
  {
    title: "Front-end Developer cum UX/UI Designer",
    company: "FPT Play",
    period: "05/2016 – 07/2022",
    color: "#10B981",
    desc: "Developed responsive social media/CMS applications (v3/v4) and researched smart home technologies for FPT Play & FPT Smart Home.",
  },
];

// ===== CONTACT =====
export const contactInfo = [
  { icon: "📧", label: "Email", value: "viettran47@gmail.com", href: "mailto:viettran47@gmail.com" },
  { icon: "📞", label: "Phone", value: "076 789 8630", href: "tel:0767898630" },
  { icon: "🌐", label: "Portfolio Website", value: "viettran.framer.ai", href: "https://viettran.framer.ai" },
  { icon: "📍", label: "Location", value: "Ho Chi Minh City, Vietnam", href: "#" },
];

// ===== SOCIAL LINKS =====
export const socialLinks = [
  { name: "Portfolio", url: "https://viettran.framer.ai", icon: "globe" },
  { name: "GitHub", url: "https://github.com", icon: "github" },
];
