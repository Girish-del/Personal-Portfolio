/**
 * Single source of truth for portfolio content.
 */

export const personal = {
  name: "Girish Nalawade",
  firstName: "Girish",
  shortBio:
    "Software engineer building distributed backends, cloud-native microservices, and AI-powered agents. Completed my MS in Computer Science at Arizona State University in 2026.",
  tagline:
    "Backend systems · LLM agents · Cloud infrastructure · Designed for scale and resilience.",
  location: "Arizona, United States",
  email: "girishnalawade020@gmail.com",
  phone: "(480) 406-1376",
  github: "https://github.com/Girish-del",
  linkedin: "https://www.linkedin.com/in/girishnalawade/",
  instagram: "https://instagram.com/_girish_here",
  resumeHref: "/resume.pdf",
  resumeFileName: "Girish_Nalawade_Resume.pdf",
  heroImage: "/hero.jpeg",
  /** Casual portrait for Who I am / What I do — drop at public/who.jpeg */
  whoImage: "/who.jpeg",

  // --- New copy for restructured site ---

  /** 2-3 sentence identity statement for the "Who I am" section */
  whoIAm:
    "I'm a software engineer who treats distributed systems and AI agents as creative material, not just tooling. I grew up writing code that had to keep running while real people moved real money through it that pressure shaped how I think about reliability, latency, and the small details that separate something that demos well from something that survives production.",

  /** Longer narrative bio for "About" section */
  aboutLong: [
    "Born and raised in Pune, India. Spent my first two years out of undergrad at Western Union on a backend team that owned a slice of a payments engine handling millions of transactions a day that's where I learned to love p99 latency, fault tolerance, and the kind of quiet engineering that nobody notices when it's working.",
    "I recently completed my MS in Computer Science at Arizona State University, with a focus on software engineering, distributed systems, and applied AI. Through the program I split my time between coursework, a software engineering role on campus building an AI-assisted clinical platform, and side projects exploring multi-agent orchestration, MCP servers, and LLM-driven developer tooling.",
    "Off-keyboard: photography, long walks, cooking experiments that occasionally work, and trying to convince my friends that observability dashboards are beautiful.",
  ] as const,
} as const;

export const roleCycle: readonly string[] = [
  "Software Engineer",
  "AI Engineer",
  "GenAI Systems Builder",
  "Backend + LLM Architect",
  "Distributed Systems Tinkerer",
];

export type NavItem = { id: string; label: string };

export const navItems: readonly NavItem[] = [
  { id: "hero", label: "Home" },
  { id: "who", label: "Who I am" },
  { id: "what", label: "What I do" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "impact", label: "Impact" },
  { id: "experience", label: "Journey" },
  { id: "publications", label: "Publications" },
  { id: "community", label: "Community" },
  { id: "talks", label: "Talks" },
  { id: "education", label: "Education" },
];

export type FlashCard = {
  front: string;
  back: string;
};

/** Quick-flip cards at the end of About */
export const aboutFlashCards: readonly FlashCard[] = [
  { front: "Currently", back: "MS CS from ASU · Building backend + AI systems, ex-Western Union" },
  { front: "Origin story", back: "Pune → Western Union payments → Tempe" },
  { front: "Off-keyboard", back: "Photography, long walks, cooking experiments" },
  { front: "Hot take", back: "Observability dashboards are genuinely beautiful" },
  { front: "Default mode", back: "Ship small, measure p99, iterate in production" },
  { front: "Ask me about", back: "Multi-agent systems, MCP servers, Spring Boot at scale" },
];

// --- What I do: 4 service pillars ---

export type Pillar = {
  icon: "server" | "bot" | "cloud" | "activity";
  title: string;
  blurb: string;
  capabilities: readonly string[];
};

export const pillars: readonly Pillar[] = [
  {
    icon: "server",
    title: "Backend Systems",
    blurb:
      "Production microservices that handle scale, failure, and weird real-world edge cases.",
    capabilities: [
      "Spring Boot",
      "FastAPI",
      "Go",
      "REST + gRPC",
      "PostgreSQL",
      "Redis",
      "Kafka",
    ],
  },
  {
    icon: "bot",
    title: "LLM Agents & AI Infra",
    blurb:
      "Multi-agent orchestration, RAG pipelines, and MCP servers — turning models into reliable software.",
    capabilities: [
      "LangChain",
      "LangGraph",
      "MCP",
      "Claude / GPT / Gemini",
      "FAISS",
      "sentence-transformers",
    ],
  },
  {
    icon: "cloud",
    title: "Cloud Infrastructure",
    blurb:
      "Infra-as-code, container orchestration, and CI/CD pipelines that you'd actually want to be on-call for.",
    capabilities: [
      "AWS (ECS, Lambda, S3, IAM)",
      "GCP",
      "Docker",
      "Kubernetes",
      "Terraform",
      "GitHub Actions",
    ],
  },
  {
    icon: "activity",
    title: "Observability & Reliability",
    blurb:
      "Dashboards, traces, and load tests that catch the bug before the customer does.",
    capabilities: [
      "Grafana",
      "AWS CloudWatch",
      "AWS X-Ray",
      "JMeter",
      "Load testing",
      "Incident response",
    ],
  },
];

// --- Impact: metric tiles ---

export type ImpactMetric = {
  value: string;
  label: string;
  context: string;
};

export const impactMetrics: readonly ImpactMetric[] = [
  {
    value: "30%",
    label: "Payment latency cut",
    context: "350ms → 250ms on Western Union's core transaction engine (Spring Boot + Redis + async queues)",
  },
  {
    value: "1M+",
    label: "Daily transactions monitored",
    context: "T-View real-time observability system for Western Union payments",
  },
  {
    value: "95%",
    label: "RAG answer relevance",
    context: "Hybrid semantic + keyword retrieval pipeline for course Q&A at ASU",
  },
  {
    value: "40%",
    label: "Deployment time saved",
    context: "Containerized REST microservices on Docker + Kubernetes rollouts",
  },
  {
    value: "40%",
    label: "Fault recovery time cut",
    context: "T-View monitoring for 1M+ daily payment transactions",
  },
  {
    value: "75%",
    label: "New-agent setup time reduced",
    context: "Provenant AI central agent registry — cross-team reuse of architectures",
  },
  {
    value: "35%",
    label: "Log archival costs cut",
    context: "Serverless pipeline on AWS Lambda + S3 + CloudWatch across 20+ services",
  },
  {
    value: "33%",
    label: "Fault tolerance improved",
    context: "JMeter load testing at 10K concurrent requests — resolved critical bottlenecks",
  },
];

// --- Experience Journey ---

export type Experience = {
  role: string;
  company: string;
  period: string;
  location: string;
  /** Company logo — drop PNG/SVG at this path under public/ */
  logo: string;
  logoAlt: string;
  highlights: readonly string[];
};

export const experiences: readonly Experience[] = [
  {
    role: "Software Engineer",
    company: "Arizona State University",
    period: "May 2025 — May 2026",
    location: "Tempe, AZ",
    logo: "/logos/asu.png",
    logoAlt: "Arizona State University logo",
    highlights: [
      "Built an AI-assisted Care Connect platform enabling voice-based patient interactions and structured clinical data capture — reduced manual model validation time by 30% with automated self-evaluation harnesses.",
      "Reduced LLM hallucinations and improved answer relevance in course Q&A by engineering a hybrid RAG pipeline combining semantic vector search with keyword retrieval, achieving 95% relevance on the evaluated question set.",
      "Accelerated feature delivery by using Claude Code, Cursor agents, and GPT as pair programmers for rapid prototyping, debugging, and test generation.",
    ],
  },
  {
    role: "Associate Software Engineer",
    company: "Western Union",
    period: "Aug 2023 — Aug 2024",
    location: "Pune, MH",
    logo: "/logos/western-union.png",
    logoAlt: "Western Union logo",
    highlights: [
      "Built a Karate API automation suite with dynamic response chaining across 50+ internal REST APIs, enabling end-to-end payment workflow validation from a single test input.",
      "Optimized the core transaction engine with Spring Boot, Redis caching, and async queues — cut payment latency by 30% (350ms → 250ms) under production load.",
      "Containerized REST microservices on Docker — deployment time -40% — and orchestrated on Kubernetes for 25% faster cluster recovery via health checks and rolling updates.",
      "Co-designed T-View, a real-time monitoring system for 1M+ daily transactions, reducing mean fault recovery time by 40%.",
    ],
  },
  {
    role: "Software Engineering Intern",
    company: "Western Union",
    period: "Jan 2023 — Aug 2023",
    location: "Pune, MH",
    logo: "/logos/western-union.png",
    logoAlt: "Western Union logo",
    highlights: [
      "Migrated 30+ microservices from Java 8 to Java 17 — modernized configurations, hardened security, and improved startup time.",
      "Designed a serverless logging pipeline with AWS Lambda, S3, and CloudWatch — cut archival costs by 35% across 20+ services.",
      "Load-tested services with JMeter at 10K concurrent requests — identified bottlenecks and improved fault tolerance by 33%.",
    ],
  },
  {
    role: "Software Developer",
    company: "Suvidha Foundation",
    period: "Oct 2021 — May 2022",
    location: "Pune, MH",
    logo: "/logos/suvidha.png",
    logoAlt: "Suvidha Foundation logo",
    highlights: [
      "Built resilient REST APIs (Spring Boot + Flask) at 99.95% uptime — seamless integration across enterprise client platforms.",
    ],
  },
];

// --- Side quests: side projects, publications, communities, talks, etc. ---

export type GallerySlide = {
  src: string;
  alt: string;
  title: string;
  description?: string;
};

export type SideQuest = {
  slug: string;
  category: "Project" | "Publication" | "Community" | "Talk";
  title: string;
  subtitle: string;
  period: string;
  description: string;
  tags: readonly string[];
  image?: string;
  imageAlt?: string;
  /** Multiple screenshots for Projects — paths under public/projects/{slug}/ */
  gallery?: readonly GallerySlide[];
  href?: string;
  /** Google Scholar citation URL (Publications) */
  scholarHref?: string;
  /** Local PDF for inline preview + download (Publications) */
  pdfHref?: string;
  pdfFileName?: string;
  github?: string;
};

export const sideQuests: readonly SideQuest[] = [
  {
    slug: "trust-yourself",
    category: "Project",
    title: "TrustYourself",
    subtitle: "Preventing sensitive data leakage in AI workflows",
    period: "Feb 2025 — Apr 2025",
    description:
      "Developers routinely leak secrets, PII, internal hostnames, and proprietary code into cloud LLM requests with no verifiable audit trail. I built a local-first orchestrator that redacts sensitive spans with conservative, explainable rules, routes secret-bearing queries to a local model (Ollama / Phi-3) while sending only tokenized structure to the cloud (OpenAI), then reassembles the answer. Every session emits cryptographically signed (ed25519) receipts and a Merkle-tree audit log, so anyone can verify exactly what the cloud actually saw. Ships with live redaction previews, separated local/cloud streams, and an adversarial redaction corpus.",
    tags: [
      "Python",
      "FastAPI",
      "Node.js",
      "Express",
      "Ollama",
      "OpenAI",
      "LLM Security",
      "Presidio",
      "spaCy",
      "Cryptography",
      "Audit Logging",
      "Privacy Engineering"
    ],
    gallery: [
      {
        src: "/projects/trust-yourself/01-dashboard.png",
        alt: "TrustYourself dashboard overview",
        title: "Dashboard",
        description: "Main Screen",
      },
      {
        src: "/projects/trust-yourself/02-redaction.png",
        alt: "Real-time redaction preview",
        title: "Redaction",
        description: "PII & secrets stripped before cloud",
      },
      {
        src: "/projects/trust-yourself/03-cloud and local data.png",
        alt: "Data Comparison between Cloud and Local Data",
        title: "Data",
        description: "Cloud and Local Data",
      },
      {
        src: "/projects/trust-yourself/04 - Final Query.png",
        alt: "Final Query Output",
        title: "Output",
        description: "Final Query Output",
      },
      {
        src: "/projects/trust-yourself/05 - Session Receipt.png",
        alt: "Merkel Session Signature",
        title: "Session Receipt",
        description: "Merkel Session Signature",
      },
    ],
    github: "https://github.com/Girish-del/TrustYourself",
  },
  {
    slug: "provenant-ai",
    category: "Project",
    title: "Provenant AI",
    subtitle: "AI Governance Platform · Hackathon Winner",
    period: "2025",
    description:
      "Central registry for AI agents that holds each agent's configuration, architecture, and risk classification — so vulnerabilities and critical updates can be identified centrally across all downstream agents. Enables cross-team reuse by letting teams review and adapt existing agent architectures, cutting new-agent setup time by 75% and reducing duplicated implementation effort. Winner of an internal hackathon for enterprise risk classification, controls, and audit readiness.",
    tags: [
      "Next.js",
      "NestJS",
      "FastAPI",
      "PostgreSQL",
      "AI Governance",
      "Risk Classification",
      "Audit Readiness",
    ],
  },
  {
    slug: "agentforge",
    category: "Project",
    title: "AgentForge",
    subtitle: "Autonomous AI Research Framework",
    period: "Apr 2025 — Present",
    description:
      "Multi-agent research orchestration platform: submit a high-level goal and a pipeline of specialized agents iteratively collects data, selects models, trains, evaluates, analyzes failures, proposes improvements, and reruns until a target metric is reached or budget is exhausted. Ships a gamified React lab console (XP, quest log, seven-agent crew HUD), dual FastAPI backends (user API + comprehensive scaffold), PostgreSQL run history, Docker Compose stack, MCP tool catalog, and CI-backed pytest suite.",
    tags: [
      "React",
      "Vite",
      "FastAPI",
      "PostgreSQL",
      "Docker",
      "Multi-Agent",
      "Python",
      "MCP",
      "Pytest",
      "GitHub Actions",
    ],
    image: "/projects/agentforge/01-main-dashboard.jpg",
    imageAlt: "AgentForge main research dashboard with quest console and agent crew",
    gallery: [
      {
        src: "/projects/agentforge/01-main-dashboard.jpg",
        alt: "AgentForge main research dashboard",
        title: "Research console",
        description: "Quest console, agent crew & mission stats",
      },
      {
        src: "/projects/agentforge/agentforge-02-run.jpg",
        alt: "AgentForge run screen",
        title: "Run",
        description: "Live agent run with progress and outputs",
      },
      {
        src: "/projects/agentforge/agentforge-03-library.jpg",
        alt: "AgentForge library screen",
        title: "Library",
        description: "Reusable agents, tools, and mission history",
      },
    ],
    github: "https://github.com/Girish-del/AgentForge---Autonomous-AI-Research-Framework",
  },
  
  {
    slug: "mace",
    category: "Project",
    title: "MACE",
    subtitle: "Multi-Agent Coordination Engine",
    period: "Jan 2025 — Apr 2025",
    description:
      "Multi-agent orchestration using LangGraph + Claude API. Parses natural-language requests, routes subtasks to specialized agents, resolves conflicts via LLM-powered arbitration. 80%+ task completion vs. 50% single-agent baseline. FAISS-backed duplicate-intent detection (Precision@5 = 0.87).",
    tags: ["LangGraph", "Claude API", "FAISS", "FastAPI", "React", "GCP"],
    image: "/projects/mace.png",
    imageAlt: "MACE multi-agent orchestration mock",
    gallery: [
      {
        src: "/projects/mace.png",
        alt: "MACE multi-agent orchestration mock",
        title: "MACE",
        description: "Multi-agent coordination engine",
      },
    ],
    github:
      "https://github.com/Girish-123-dev/SER594-Team25-MACE-Multi_Agent_Coordination_Engine",
  },
  {
    slug: "ordersync",
    category: "Project",
    title: "OrderSync",
    subtitle: "Event-driven microservices for order management",
    period: "Aug 2024 — Oct 2024",
    description:
      "A microservices order-management backend fronted by an API Gateway with Eureka service discovery and a dedicated Auth Server. An Order Service coordinates Product, Inventory, and Notification services — synchronous calls are guarded by Resilience4J circuit breakers, while order events flow asynchronously over Kafka to keep services decoupled. Each service owns its datastore (MongoDB for products, MySQL for orders and inventory). The whole stack is containerized with Docker, orchestrated on Kubernetes, and instrumented end-to-end with OpenTelemetry, Prometheus, and the Grafana stack (Loki for logs, Tempo for distributed traces).",
    tags: [
      "Spring Boot",
      "Spring Cloud Gateway",
      "Eureka",
      "Resilience4J",
      "Kafka",
      "MongoDB",
      "MySQL",
      "Docker",
      "Kubernetes",
      "OpenTelemetry",
      "Prometheus",
      "Grafana",
    ],
    image: "/projects/ordersync.png",
    imageAlt: "OrderSync microservices architecture diagram",
    gallery: [
      {
        src: "/projects/ordersync.png",
        alt: "OrderSync microservices architecture diagram",
        title: "Architecture",
        description:
          "Gateway, Kafka events, per-service datastores & full observability",
      },
    ],
    github: "https://github.com/Girish-del/OrderSync",
  },
  {
    slug: "deployq",
    category: "Project",
    title: "DeployQ",
    subtitle: "Automated CI/CD platform",
    period: "Nov 2024 — Dec 2024",
    description:
      "End-to-end deployment system using Docker, Node.js, AWS ECS, IAM, and Terraform. Paired with a Kafka → ClickHouse log pipeline for real-time debugging. Manual deployment steps reduced 70%; incident resolution time -35%.",
    tags: ["Docker", "AWS ECS", "Terraform", "Kafka", "ClickHouse"],
    image: "/projects/deployq.png",
    imageAlt: "DeployQ deployment platform mock",
    gallery: [
      {
        src: "/projects/deployq.png",
        alt: "DeployQ deployment platform mock",
        title: "DeployQ",
        description: "Automated CI/CD platform",
      },
    ],
    github: "https://github.com/Girish-del/DeployQ---Self-Deployment-Application",
  },
  {
    slug: "kg-itp",
    category: "Publication",
    title: "KG-ITP: A Knowledge Graph for Intelligent Travel Planning",
    subtitle: "IEEE COMPSAC 2025 · Toronto, Canada",
    period: "July 2025",
    description:
      "Introduces a travel-planning knowledge graph that semantically integrates GNIS natural features, IMLS cultural sites, Yelp dining data, and Valley Metro transit via OWL2 ontologies and GeoSPARQL. Resolves conflicts between authoritative and crowd-sourced datasets to surface niche attractions and support multi-criteria queries — e.g. vegetarian-friendly restaurants within 500m of transit-accessible cultural sites. Co-authored with Rajesh Anant Sawant, Ashutosh Sudhir Kumbhar, Aditya Patil, Jahnavi Gona, and Srividya Bansal.",
    tags: ["Knowledge Graph", "GeoSPARQL", "OWL2", "RDF", "Semantic Web", "Travel Informatics"],
    href: "https://ieeexplore.ieee.org/abstract/document/11126548",
    scholarHref:
      "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=HeJQCRoAAAAJ&citation_for_view=HeJQCRoAAAAJ:u5HHmVD_uO8C",
    pdfHref: "/publications/kg-itp.pdf",
    pdfFileName: "KG-ITP-A-Knowledge-Graph-for-Intelligent-Travel-Planning.pdf",
  },
  // TODO(user): Add real community/talk/hackathon entries.
  {
    slug: "asu-acm",
    category: "Community",
    title: "Volunteer mentor",
    subtitle: "ASU ACM Student Chapter",
    period: "2024 — Present",
    description:
      "Helped graduate and undergrad students with backend systems, distributed-systems coursework, and prep for SWE interviews. Ran study sessions on systems design and CI/CD.",
    tags: ["Mentoring", "Systems Design", "Career"],
  },
  {
    slug: "internal-talks",
    category: "Talk",
    title: "Lightning talks: \"Microservices at scale\"",
    subtitle: "Internal engineering, Western Union",
    period: "2023 — 2024",
    description:
      "Delivered three internal lightning talks on the T-View monitoring rollout, Spring Boot migration patterns, and async messaging trade-offs (RabbitMQ vs. Kafka) for the wider engineering org.",
    tags: ["Public Speaking", "Spring Boot", "Observability"],
  },
];

// --- Education ---

export type Education = {
  school: string;
  degree: string;
  period: string;
  location: string;
  emoji: string;
  /** Campus crest / logo — drop at this path under public/ */
  image: string;
  imageAlt: string;
};

export const education: readonly Education[] = [
  {
    school: "Arizona State University",
    degree: "M.S. in Computer Science — Software Engineering",
    period: "Aug 2024 — May 2026",
    location: "Tempe, AZ",
    emoji: "ASU",
    image: "/logos/asu.png",
    imageAlt: "Arizona State University campus",
  },
  {
    school: "Savitribai Phule Pune University",
    degree: "B.E. in Computer Engineering",
    period: "Aug 2019 — May 2023",
    location: "Pune, MH",
    emoji: "SPPU",
    image: "/logos/sppu.png",
    imageAlt: "Savitribai Phule Pune University",
  },
];

// Legacy aliases kept for any stale references; safe to delete once unused.
export const summaryMetrics = impactMetrics.slice(0, 4);
export const projects = sideQuests.filter((q) => q.category === "Project");
export const publications = sideQuests.filter((q) => q.category === "Publication");
export type Project = SideQuest;
export type Publication = SideQuest;
export const skillCategories: readonly { title: string; items: readonly string[] }[] = pillars.map((p) => ({
  title: p.title,
  items: p.capabilities,
}));
export type SkillCategory = (typeof skillCategories)[number];
