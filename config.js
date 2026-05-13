const CONFIG = {
  /* ── Identidad ── */
  firstname: "Guillermo",
  lastname: "Plasencia",
  tagline: "dev",
  avatar: "👩‍💻",
  heroTag: "disponible para proyectos",
  heroDesc: "Desarrolladora full-stack con pasión por construir productos digitales robustos, escalables y con gran experiencia de usuario. Del primer commit al deploy en producción.",
  aboutIntro: '"Construyo con cuidado, pienso en sistemas y disfruto resolver problemas complejos."',
  aboutBody: "Soy desarrolladora con más de 5 años de experiencia creando aplicaciones web y móviles. Me muevo cómodamente entre el frontend, el backend y la infraestructura cloud, lo que me permite tener una visión completa del producto.\n\nMe apasiona el código limpio, la arquitectura bien pensada y la automatización de procesos. Cuando no estoy programando, aprendo sobre sistemas distribuidos o contribuyo a proyectos open source.",
  contactIntro: '"Siempre abierta a nuevos proyectos, colaboraciones o simplemente una buena conversación sobre tecnología."',
  footerText: "© 2026. Hecho con ♥ y demasiada pizza.",
  navCta: "Hablemos →",

  /* ── Colores ── */
  colors: {
    bg:      "#0a0a0a",
    bg2:     "#111111",
    bg3:     "#1a1a1a",
    surface: "#161616",
    border:  "#2a2a2a",
    text:    "#f0ede8",
    text2:   "#888880",
    text3:   "#555550",
    accent:  "#e8ff47",
    accent2: "#ff6b35",
    accent3: "#47c8ff",
  },

  /* ── Tipografía ── */
  fontDisplay: "'Syne', sans-serif",
  fontBody:    "'DM Mono', monospace",

  /* ── UI options ── */
  customCursor:    true,
  noiseBg:         true,
  heroGrid:        true,
  showServices:    true,
  showExperience:  true,

  /* ── Info de contacto ── */
  email:    "guilleps92@nauta.cu",
  telegram: "https://t.me/ztuev",
  location: "La Habana, Cuba",
  github:   "https://github.com/venomega",
  linkedin: "",
  twitter:  "",

  /* ── About details ── */
  aboutDetails: [
    { label: "Disponibilidad", value: "Freelance / Full-time" },
    { label: "Modalidad",      value: "Remoto / Híbrido" },
    { label: "Experiencia",    value: "9+ años" },
    { label: "Idiomas",        value: "ES, EN, FR" },
  ],

  /* ── Stats ── */
  stats: [
    { num: "50+",  label: "Proyectos entregados" },
    { num: "12",   label: "Clientes satisfechos" },
    { num: "5+",   label: "Años de experiencia" },
    { num: "99%",  label: "Uptime en producción" },
    { num: "200k", label: "Líneas de código" },
    { num: "15+",  label: "Tecnologías" },
  ],

  /* ── Hero badges ── */
  heroBadges: ["React", "Node.js", "TypeScript", "AWS", "Docker", "PostgreSQL"],

  /* ── Skills ── */
  skillCategories: [
    {
      name: "Frontend",
      icon: "🎨",
      desc: "Interfaces modernas y accesibles",
      skills: [
        { name: "React / Next.js", level: "expert" },
        { name: "TypeScript", level: "expert" },
        { name: "Vue.js", level: "advanced" },
        { name: "CSS / Tailwind", level: "expert" },
        { name: "Figma", level: "advanced" },
        { name: "Testing (Vitest)", level: "advanced" },
        { name: "React Native", level: "intermediate" },
        { name: "Storybook", level: "advanced" },
      ],
    },
    {
      name: "Backend",
      icon: "⚙️",
      desc: "APIs robustas y arquitectura sólida",
      skills: [
        { name: "Node.js", level: "expert" },
        { name: "Python / FastAPI", level: "advanced" },
        { name: "Go", level: "intermediate" },
        { name: "PostgreSQL", level: "expert" },
        { name: "MongoDB", level: "advanced" },
        { name: "Redis", level: "advanced" },
        { name: "GraphQL", level: "advanced" },
        { name: "REST APIs", level: "expert" },
      ],
    },
    {
      name: "DevOps / Cloud",
      icon: "☁️",
      desc: "Infraestructura moderna y CI/CD",
      skills: [
        { name: "AWS", level: "advanced" },
        { name: "Docker", level: "expert" },
        { name: "Kubernetes", level: "intermediate" },
        { name: "Terraform", level: "intermediate" },
        { name: "GitHub Actions", level: "expert" },
        { name: "Linux", level: "advanced" },
        { name: "Nginx", level: "advanced" },
        { name: "Monitoring (Grafana)", level: "intermediate" },
      ],
    },
    {
      name: "Herramientas",
      icon: "🛠️",
      desc: "Flujo de trabajo y productividad",
      skills: [
        { name: "Git / GitHub", level: "expert" },
        { name: "Jira / Linear", level: "advanced" },
        { name: "VS Code", level: "expert" },
        { name: "Postman", level: "expert" },
        { name: "Notion", level: "advanced" },
        { name: "Slack", level: "advanced" },
      ],
    },
  ],

  /* ── Proyectos ── */
  projects: [
    {
      title: "SaaS Dashboard",
      type: "Frontend · Backend",
      desc: "Plataforma de analítica para e-commerce con dashboards en tiempo real, sistema de roles y exportación de reportes.",
      emoji: "📊",
      tags: ["Frontend", "Backend"],
      stack: ["Next.js", "TypeScript", "PostgreSQL", "Redis", "Stripe"],
      demo: "#",
      repo: "#",
      featured: true,
    },
    {
      title: "Microservices API",
      type: "Backend · DevOps",
      desc: "Arquitectura de microservicios con autenticación JWT, messaging con RabbitMQ y deploy automatizado en Kubernetes.",
      emoji: "⚡",
      tags: ["Backend", "DevOps"],
      stack: ["Node.js", "Go", "RabbitMQ", "Kubernetes", "Terraform"],
      demo: "",
      repo: "#",
      featured: false,
    },
    {
      title: "App Móvil Fintech",
      type: "Mobile · Frontend",
      desc: "Aplicación de gestión de gastos personales con sincronización en tiempo real, gráficas y autenticación biométrica.",
      emoji: "💳",
      tags: ["Mobile", "Frontend"],
      stack: ["React Native", "TypeScript", "Firebase", "Plaid API"],
      demo: "#",
      repo: "#",
      featured: true,
    },
    {
      title: "CI/CD Pipeline Framework",
      type: "DevOps · Open Source",
      desc: "Framework open source para estandarizar pipelines de CI/CD con soporte para múltiples clouds y notificaciones.",
      emoji: "🚀",
      tags: ["DevOps", "Open Source"],
      stack: ["Python", "GitHub Actions", "AWS", "Docker", "Terraform"],
      demo: "",
      repo: "#",
      featured: false,
    },
    {
      title: "E-commerce Platform",
      type: "Fullstack",
      desc: "Tienda online completa con catálogo, carrito, pasarela de pago, panel de admin y sistema de inventario.",
      emoji: "🛒",
      tags: ["Frontend", "Backend"],
      stack: ["Next.js", "Node.js", "MongoDB", "Stripe", "Cloudinary"],
      demo: "#",
      repo: "#",
      featured: true,
    },
    {
      title: "Infrastructure as Code",
      type: "DevOps",
      desc: "Módulos de Terraform para provisionar infraestructura AWS altamente disponible con zero-downtime deployments.",
      emoji: "🏗️",
      tags: ["DevOps"],
      stack: ["Terraform", "AWS", "GitHub Actions", "Ansible"],
      demo: "",
      repo: "#",
      featured: false,
    },
  ],

  /* ── Experiencia ── */
  experience: [
    {
      role: "Senior Full-Stack Developer",
      company: "TechCorp Inc.",
      period: "2022 — Presente",
      location: "Remoto",
      desc: "Lideré el desarrollo de la plataforma SaaS principal, mejorando la performance un 40% y escalando a 100k usuarios activos.",
      tech: ["Next.js", "Node.js", "AWS", "PostgreSQL", "Redis"],
    },
    {
      role: "Full-Stack Developer",
      company: "StartupXYZ",
      period: "2020 — 2022",
      location: "Madrid",
      desc: "Construí desde cero el MVP de una app fintech, implementé CI/CD y migré la arquitectura monolítica a microservicios.",
      tech: ["React", "Python", "Docker", "GCP", "MongoDB"],
    },
    {
      role: "Frontend Developer",
      company: "Digital Agency",
      period: "2019 — 2020",
      location: "Barcelona",
      desc: "Desarrollé interfaces para múltiples clientes, trabajando en proyectos e-commerce, portales corporativos y dashboards.",
      tech: ["Vue.js", "WordPress", "SASS", "PHP"],
    },
  ],

  /* ── Servicios ── */
  services: [
    {
      icon: "🎨",
      title: "Frontend Development",
      desc: "Interfaces modernas, rápidas y accesibles. De la maqueta al código con React, Vue o Next.js.",
      items: ["SPAs y SSR con Next.js", "Component systems", "Performance optimization", "Testing & QA"],
    },
    {
      icon: "⚙️",
      title: "Backend & APIs",
      desc: "APIs robustas, escalables y bien documentadas. REST, GraphQL, WebSockets.",
      items: ["API REST / GraphQL", "Autenticación y seguridad", "Bases de datos relacionales/NoSQL", "Integraciones de terceros"],
    },
    {
      icon: "☁️",
      title: "DevOps & Cloud",
      desc: "Infraestructura como código, pipelines automatizados y arquitectura cloud-native.",
      items: ["CI/CD Pipelines", "Docker & Kubernetes", "AWS / GCP / Azure", "Monitorización y alertas"],
    },
    {
      icon: "📱",
      title: "Apps Móviles",
      desc: "Aplicaciones móviles multiplataforma con React Native. iOS y Android desde una sola base de código.",
      items: ["React Native", "Publicación en stores", "Push notifications", "Offline-first"],
    },
    {
      icon: "🔍",
      title: "Code Review & Auditoría",
      desc: "Revisión de código, detección de problemas de performance, seguridad y arquitectura.",
      items: ["Performance audit", "Security review", "Architecture assessment", "Refactoring plan"],
    },
    {
      icon: "🎓",
      title: "Mentoría Técnica",
      desc: "Mentoría 1:1 para developers junior o equipos que quieran mejorar sus prácticas de desarrollo.",
      items: ["Code reviews personalizados", "Career guidance", "Tech stack guidance", "Best practices"],
    },
  ],
};

const THEMES = {
  "dark-lime": {
    bg:"#0a0a0a",bg2:"#111111",bg3:"#1a1a1a",surface:"#161616",
    border:"#2a2a2a",text:"#f0ede8",text2:"#888880",text3:"#555550",
    accent:"#e8ff47",accent2:"#ff6b35",accent3:"#47c8ff"
  },
  "dark-orange": {
    bg:"#0d0905",bg2:"#130d08",bg3:"#1a1208",surface:"#181008",
    border:"#2e1f10",text:"#f5ede5",text2:"#90806d",text3:"#56483a",
    accent:"#ff8c42",accent2:"#ffce00",accent3:"#ff4d6d"
  },
  "dark-blue": {
    bg:"#060b14",bg2:"#0a1120",bg3:"#0f1928",surface:"#0d1720",
    border:"#1a2d45",text:"#e5eeff",text2:"#7090b0",text3:"#3d5570",
    accent:"#4d9fff",accent2:"#00e5ff",accent3:"#7c5fff"
  },
  "light-minimal": {
    bg:"#fafaf8",bg2:"#f2f2f0",bg3:"#e8e8e5",surface:"#eeeeeb",
    border:"#d5d5d0",text:"#111110",text2:"#666660",text3:"#aaaaaa",
    accent:"#111110",accent2:"#cc3300",accent3:"#0055cc"
  },
  "purple-rain": {
    bg:"#0a080f",bg2:"#100c1a",bg3:"#16102a",surface:"#130f20",
    border:"#2a2040",text:"#f0ebff",text2:"#8070a0",text3:"#504060",
    accent:"#c080ff",accent2:"#ff70c0",accent3:"#70c0ff"
  },
  "retro-green": {
    bg:"#000d00",bg2:"#001200",bg3:"#001800",surface:"#000f00",
    border:"#004400",text:"#00ff00",text2:"#00aa00",text3:"#006600",
    accent:"#00ff41",accent2:"#aaff00",accent3:"#00ffee"
  }
};
