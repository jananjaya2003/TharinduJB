export const nav = [
  "about",
  "skills",
  "projects",
  "journey",
  "services",
  "contact",
];

export const skills = [
  { group: "Languages", items: ["Python", "Java", "JavaScript", "SQL"] },
  {
    group: "AI & Data",
    items: ["Scikit-learn", "Pandas", "OpenCV", "NumPy", "Machine Learning"],
  },
  {
    group: "Web",
    items: [
      "HTML",
      "CSS",
      "React",
      "Next.js",
      "Node.js",
      "Tailwind CSS",
      "Flask",
      "FastAPI",
      "Responsive UI",
    ],
  },
  {
    group: "Systems",
    items: ["MySQL", "GitHub", "Netlify", "Embedded Systems", "IoT"],
  },
];

export type Project = {
  id?: string;
  title: string;
  subtitle: string;
  description: string;
  challenge: string;
  outcome: string;
  tags: string[];
  image: string;
  metric: string;
  period: string;
  caseStudyUrl: string | null;
  linkedinPostUrl: string | null;
  sortOrder?: number;
};

export const projects: Project[] = [
  {
    title: "AutoValue SL",
    subtitle: "Car price intelligence for Sri Lanka",
    description:
      "Vehicle valuation platform powered by an ensemble model trained on 9,788 real Sri Lankan listings.",
    challenge:
      "Turn inconsistent vehicle-listing data into a practical price estimate.",
    outcome: "Gradient Boosting achieved a test R² of 0.875.",
    tags: ["Python", "Scikit-learn", "Pandas", "Flask"],
    image: "/autovalue-project.png",
    metric: "R² 0.875",
    period: "Jan 2026",
    caseStudyUrl:
      "https://yakafinity.com/my%20portfolio/project-detail.html?project=0",
    linkedinPostUrl:
      "https://www.linkedin.com/posts/jananjaya2003_machinelearning-artificialintelligence-datascience-activity-7471475691746750464-Xj_Y",
  },
  {
    title: "PhishGuard AI",
    subtitle: "Real-time phishing URL detection",
    description:
      "AI-powered URL scanner that returns a clear phishing verdict and risk probability.",
    challenge:
      "Detect suspicious URLs quickly without relying on a single blacklist.",
    outcome:
      "Extracts and evaluates nine URL signals to produce an interpretable risk result.",
    tags: ["Python", "Flask", "AI", "Cybersecurity"],
    image: "/phishguard-project.png",
    metric: "9 URL signals",
    period: "Jan 2026",
    caseStudyUrl:
      "https://yakafinity.com/my%20portfolio/project-detail.html?project=2",
    linkedinPostUrl:
      "https://www.linkedin.com/posts/jananjaya2003_machinelearning-cybersecurity-python-activity-7471783572601737217-7roc",
  },
  {
    title: "JBSUPER POS",
    subtitle: "Retail billing and receipt system",
    description:
      "Point-of-sale application with catalog search, billing, loyalty points, receipt printing and PDF export.",
    challenge: "Keep repeated cashier workflows fast, readable and reliable.",
    outcome:
      "Combined product lookup, live totals and complete receipt handling in one interface.",
    tags: ["Python", "MySQL", "POS", "PDF Export"],
    image: "/jbsuper-pos.png",
    metric: "100 products",
    period: "Mar 2026",
    caseStudyUrl:
      "https://yakafinity.com/my%20portfolio/project-detail.html?project=3",
    linkedinPostUrl:
      "https://www.linkedin.com/posts/jananjaya2003_pos-webdevelopment-python-activity-7443548273849856001-6teU",
  },
  {
    title: "UK Vehicle Import Calculator",
    subtitle: "Import duty, VAT and excise estimation",
    description:
      "Vehicle import utility with VIN lookup and structured duty, VAT and excise calculations.",
    challenge:
      "Present a complicated import-cost process as a clear guided workflow.",
    outcome:
      "Separated vehicle lookup, duty and tax calculations into practical calculator panels.",
    tags: ["JavaScript", "API", "Tax Logic", "Responsive UI"],
    image: "/vehicle-tax-calculator.png",
    metric: "VIN + tax",
    period: "Feb 2026",
    caseStudyUrl:
      "https://yakafinity.com/my%20portfolio/project-detail.html?project=4",
    linkedinPostUrl: null,
  },
  {
    title: "EV Price Prediction Sri Lanka",
    subtitle: "Six-month electric vehicle forecasting",
    description:
      "Linear-regression application that forecasts monthly EV price movement for the Sri Lankan market.",
    challenge:
      "Turn historical market signals into understandable month-by-month estimates.",
    outcome:
      "Created a guided EV form and six-month forecast presented in LKR.",
    tags: ["Python", "Linear Regression", "Forecasting", "EV Data"],
    image: "/ev-price-prediction.png",
    metric: "6-month forecast",
    period: "2026",
    caseStudyUrl:
      "https://yakafinity.com/my%20portfolio/project-detail.html?project=1",
    linkedinPostUrl:
      "https://www.linkedin.com/posts/jananjaya2003_electricvehicles-machinelearning-byd-activity-7471786823778861056-J8a9",
  },
  {
    title: "Yakafinity",
    subtitle: "Premium technology services platform",
    description:
      "Business website presenting AI solutions, development, marketing, hosting and managed technology services.",
    challenge:
      "Build a trustworthy service brand that communicates a broad technical offering clearly.",
    outcome:
      "Combined business messaging, responsive interface design and scalable service navigation.",
    tags: ["Next.js", "Web Design", "AI Services", "Brand UI"],
    image: "/yakafinity-project.png",
    metric: "5 core services",
    period: "Dec 2025 — Present",
    caseStudyUrl:
      "https://yakafinity.com/my%20portfolio/project-detail.html?project=5",
    linkedinPostUrl: null,
  },
];

export const timeline = [
  {
    date: "Apr 2026",
    title: "Currency Note Recognition",
    text: "Built and evaluated a Sri Lankan currency classifier with 92.86% testing accuracy.",
  },
  {
    date: "Mar 2026",
    title: "JBSUPER POS",
    text: "Created billing, product management, invoicing and loyalty workflows with Python and MySQL.",
  },
  {
    date: "Feb 2026",
    title: "Vehicle Tax Calculator",
    text: "Connected real-world VIN data to tax logic for UK vehicle import cost estimation.",
  },
  {
    date: "Dec 2025 — Present",
    title: "Yakafinity",
    text: "Designed, built and deployed an AI-focused services website and technical portfolio.",
  },
];
