// Room interactive objects data — Pokémon FireRed Player's Room
// Mesh names extracted from pokemon_firered_-_players_room.glb

export const INTERACTIVE_OBJECTS = {
  // Computer desk area
  computer: {
    id: "computer",
    label: "💻 Computer",
    title: "Tech Stack & Skills",
    emoji: "💻",
    color: "#00D9FF",
    meshNames: ["Computer", "Computer_GRP", "Computer_fireRed_material_0", "chair", "chair_fireRed_material_0", "table", "table_fireRed_material_0"],
    content: {
      type: "skills",
      description: "The tools & technologies I use to build things.",
      items: [
        { name: "UX/UI Design & Prototyping", level: 95, icon: "🎭" },
        { name: "Business Analysis (BRD/FRS)", level: 85, icon: "📊" },
        { name: "Motion (Rive, Lottie)", level: 80, icon: "🎬" },
        { name: "React.js / Web Builder", level: 78, icon: "⚛️" },
        { name: "HTML / CSS / JS / SQL", level: 75, icon: "🌐" },
        { name: "Graphic Design (Ps, Ai, Canva)", level: 70, icon: "🎨" },
      ],
    },
  },

  // TV / Gaming setup
  tv: {
    id: "tv",
    label: "📺 TV & NES",
    title: "Current Projects",
    emoji: "📺",
    color: "#10B981",
    meshNames: ["TV", "TV_GRP", "TV_stand", "TV_fireRed_material_0", "TV_stand_fireRed_material_0", "NES", "NES_fireRed_material_0"],
    content: {
      type: "projects",
      description: "Key projects and platforms I have worked on.",
      projects: [
        {
          name: "Active.vn",
          desc: "Bicycle E-commerce & Service Platform (Team Lead)",
          tags: ["Product Lead", "E-Commerce", "UX/UI"],
          status: "Completed ✅",
          color: "#915EFF",
        },
        {
          name: "Global Care",
          desc: "Insurtech Web & Mobile Platform",
          tags: ["UX/UI", "BA", "BRD/FRS"],
          status: "Completed ✅",
          color: "#00D9FF",
        },
        {
          name: "Cake by VPBank",
          desc: "Seamless digital banking for youth",
          tags: ["Redesign", "Mobile App", "FinTech"],
          status: "Completed ✅",
          color: "#10B981",
        },
      ],
    },
  },

  // Bookshelf
  books: {
    id: "books",
    label: "📚 Bookshelf",
    title: "Learning & About Me",
    emoji: "📚",
    color: "#F59E0B",
    meshNames: ["bookShelf", "bookShelf_fireRed_material_0"],
    content: {
      type: "about",
      description: "A little bit about me and my journey.",
      bio: "I am a Product Designer with 6+ years of experience in UX/UI & Product Design, and 4+ years of experience in various Front-end developer fields. I have a strong understanding of product requirement documents, user flows, and wireframes.",
      details: [
        { icon: "📍", label: "Ho Chi Minh City, Vietnam" },
        { icon: "🎓", label: "IT & Product Design" },
        { icon: "💼", label: "6+ Years Experience" },
        { icon: "✨", label: "Available for Hire" },
      ],
      currentlyReading: [
        "Refactoring UI — Steve Schoger & Adam Wathan",
        "Don't Make Me Think — Steve Krug",
        "The Design of Everyday Things — Don Norman",
      ],
    },
  },

  // Bed / Relaxation
  bed: {
    id: "bed",
    label: "🛏️ Bed",
    title: "Hobbies & Life",
    emoji: "🛏️",
    color: "#FF6B9D",
    meshNames: ["bed", "bed_fireRed_material_0"],
    content: {
      type: "hobbies",
      description: "Beyond the screen — things I love doing!",
      hobbies: [
        { icon: "🎮", name: "Gaming", desc: "Play games & outdoor activities" },
        { icon: "🏸", name: "Badminton", desc: "Playing weekly with friends" },
        { icon: "🏃", name: "Running & Walking", desc: "Staying active & fit" },
        { icon: "🏋️", name: "Gym", desc: "Workout sessions" },
        { icon: "🌳", name: "Outdoor Activities", desc: "Exploring nature and city walks" },
      ],
    },
  },

  // Dresser / Wardrobe
  dresser: {
    id: "dresser",
    label: "🗄️ Dresser",
    title: "My Workspace Setup",
    emoji: "🗄️",
    color: "#8B5CF6",
    meshNames: ["dresser", "dresser_fireRed_material_0"],
    content: {
      type: "setup",
      description: "The gear that powers my daily workflow.",
      gear: [
        { icon: "💻", name: "MacBook Pro 14\" M3", type: "Primary machine" },
        { icon: "🖥️", name: "LG 27\" 4K Monitor", type: "External display" },
        { icon: "⌨️", name: "Keychron Q3 (Gateron Brown)", type: "Keyboard" },
        { icon: "🖱️", name: "Logitech MX Master 3", type: "Mouse" },
        { icon: "🎧", name: "Sony WH-1000XM5", type: "Headphones" },
        { icon: "💡", name: "Elgato Key Light", type: "Desk lamp" },
      ],
    },
  },

  // Wall picture / Memories
  photos: {
    id: "photos",
    label: "🖼️ Wall Art",
    title: "Professional Journey",
    emoji: "🖼️",
    color: "#EC4899",
    meshNames: ["wall_picture", "wall_picture_fireRed_material_0", "title", "title_fireRed_material_0"],
    content: {
      type: "timeline",
      description: "Key moments in my professional journey.",
      timeline: [
        { year: "2012-2015", event: "Van Lang University - Bachelor of Engineering", icon: "🎓" },
        { year: "2015-2017", event: "FPT Aptech College - Bachelor of IT", icon: "💻" },
        { year: "2016-2022", event: "FPT Play - Front-end Developer cum UX/UI Designer", icon: "📺" },
        { year: "2022-2023", event: "Eduplax - Senior UX/UI Designer", icon: "📚" },
        { year: "2023-2024", event: "MangoAds - Senior Product Designer", icon: "🚀" },
        { year: "2024-2025", event: "Akaverse (FPT IS) - Senior UX/UI Designer", icon: "🌐" },
        { year: "2025-Pres", event: "NDT 15 - Senior Product Designer", icon: "🎯" },
      ],
    },
  },

  // Stairs / Exit → Contact
  contact: {
    id: "contact",
    label: "📬 Stairs",
    title: "Get In Touch",
    emoji: "📬",
    color: "#00D9FF",
    meshNames: ["stairs", "stairs_fireRed_material_0", "railing", "railing_fireRed_material_0", "carpet_A", "carpet_B", "carpet_A_fireRed_material_0", "carpet_B_fireRed_material_0"],
    content: {
      type: "contact",
      description: "Have a project in mind? Let's build it together!",
      links: [
        { icon: "📧", label: "Email", value: "viettran47@gmail.com", href: "mailto:viettran47@gmail.com" },
        { icon: "📞", label: "Phone", value: "076 789 8630", href: "tel:0767898630" },
        { icon: "🌐", label: "Portfolio", value: "viettran.framer.ai", href: "https://viettran.framer.ai" },
        { icon: "🐙", label: "GitHub", value: "github.com/viettran", href: "https://github.com" },
      ],
    },
  },
};

// Build a reverse lookup: meshName → objectId
export const MESH_TO_OBJECT = {};
Object.values(INTERACTIVE_OBJECTS).forEach((obj) => {
  obj.meshNames.forEach((mesh) => {
    MESH_TO_OBJECT[mesh] = obj.id;
  });
});
