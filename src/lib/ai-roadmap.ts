import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export interface Specialization {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
}

export interface RoadmapPhase {
  name: string;
  duration: string;
  weeks: RoadmapWeek[];
}

export interface RoadmapWeek {
  week: number;
  theme: string;
  tasks: RoadmapTask[];
  project?: string;
}

export interface RoadmapTask {
  day?: number;
  title: string;
  type: "video" | "article" | "practice" | "project";
  duration: string;
  resource?: string;
  description: string;
  xp: number;
}

export interface GeneratedRoadmap {
  specialization: Specialization;
  totalDuration: string;
  phases: RoadmapPhase[];
  resources: { title: string; url: string; type: string }[];
}

const specializations: Record<string, Specialization> = {
  "full-stack": {
    id: "full-stack",
    name: "Full Stack Development",
    description: "Master both frontend and backend technologies to build complete web applications",
    color: "#3B82F6",
    icon: "code",
  },
  "ai-ml": {
    id: "ai-ml",
    name: "AI & Machine Learning",
    description: "Learn to build intelligent systems, from basics to advanced deep learning",
    color: "#10B981",
    icon: "brain",
  },
  devops: {
    id: "devops",
    name: "DevOps & Cloud",
    description: "Master deployment, automation, and cloud infrastructure",
    color: "#F59E0B",
    icon: "cloud",
  },
  "data-science": {
    id: "data-science",
    name: "Data Science",
    description: "Analyze data, create visualizations, and derive insights",
    color: "#8B5CF6",
    icon: "chart",
  },
  mobile: {
    id: "mobile",
    name: "Mobile Development",
    description: "Build native and cross-platform mobile applications",
    color: "#EC4899",
    icon: "smartphone",
  },
};

const timeMultipliers: Record<string, number> = {
  "few-hours": 0.5,
  "10-15-hrs": 1,
  "20-plus": 1.5,
};

const levelDepths: Record<string, number> = {
  beginner: 0,
  "some-experience": 1,
  intermediate: 2,
};

function generateFullStackRoadmap(
  level: string,
  timeKey: string,
  goals: string[],
  learningStyle: string
): GeneratedRoadmap {
  const weeksCount = Math.ceil(12 * timeMultipliers[timeKey]);
  const depth = levelDepths[level];
  const phases: RoadmapPhase[] = [];

  const phaseNames = ["Foundation", "Core Skills", "Advanced"];
  const phaseDurations = ["4 weeks", "6 weeks", "6 weeks"];
  const phaseStartWeeks = [1, 5, 11];

  for (let p = 0; p < 3; p++) {
    const startWeek = phaseStartWeeks[p];
    const weeksInPhase = p === 0 ? 4 : p === 1 ? 6 : Math.max(2, weeksCount - 10);
    const weeks: RoadmapWeek[] = [];

    for (let w = 0; w < weeksInPhase; w++) {
      const weekNum = startWeek + w;
      const tasks: RoadmapTask[] = [];

      if (p === 0) {
        // Foundation phase
        const dayTasks = [
          { title: "HTML Fundamentals", type: "video" as const, duration: "1.5h", description: "Learn semantic HTML, forms, and accessibility basics", xp: 50 },
          { title: "CSS Layouts Deep Dive", type: "article" as const, duration: "2h", description: "Master Flexbox and CSS Grid with real-world examples", resource: "MDN CSS Grid Guide", xp: 75 },
          { title: "JavaScript Basics", type: "video" as const, duration: "2h", description: "Variables, functions, arrays, and DOM manipulation", xp: 100 },
          { title: "Build a Landing Page", type: "project" as const, duration: "3h", description: "Create a responsive landing page using HTML/CSS", xp: 150 },
        ];
        tasks.push(...dayTasks.slice(0, Math.min(dayTasks.length, 4 - depth)));
      } else if (p === 1) {
        // Core Skills phase
        const dayTasks = [
          { title: "React Fundamentals", type: "video" as const, duration: "2h", description: "Components, JSX, props, and state management", xp: 100 },
          { title: "Node.js & Express Basics", type: "article" as const, duration: "2h", description: "Build REST APIs with Express.js", resource: "Express.js Guide", xp: 100 },
          { title: "Database Design", type: "practice" as const, duration: "2h", description: "Learn SQL fundamentals and database normalization", xp: 75 },
          { title: "Full Stack Mini Project", type: "project" as const, duration: "4h", description: "Build a CRUD application with React + Node", xp: 200 },
        ];
        tasks.push(...dayTasks);
      } else {
        // Advanced phase
        const dayTasks = [
          { title: "Advanced React Patterns", type: "video" as const, duration: "2h", description: "Custom hooks, context, and performance optimization", xp: 100 },
          { title: "Authentication & Security", type: "article" as const, duration: "2h", description: "JWT, OAuth, and security best practices", resource: "Auth Best Practices", xp: 100 },
          { title: "Testing & CI/CD", type: "practice" as const, duration: "2h", description: "Write unit and integration tests, setup GitHub Actions", xp: 100 },
          { title: "Capstone Project", type: "project" as const, duration: "6h", description: "Deploy a full-stack application to production", xp: 300 },
        ];
        tasks.push(...dayTasks);
      }

      const weekThemes = [
        "Getting Started with Web Development",
        "Building Interactive Interfaces",
        "Server-Side Development",
        "Database Integration",
        "API Design & Data Flow",
        "State Management",
        "Authentication & Authorization",
        "Testing & Quality Assurance",
        "Deployment & DevOps",
        "Performance Optimization",
        "Advanced Patterns",
        "Capstone Project",
      ];

      weeks.push({
        week: weekNum,
        theme: weekThemes[w % weekThemes.length],
        tasks: tasks.map((t, i) => ({ ...t, day: i + 1 })),
        project: w === weeksInPhase - 1 ? `Build: ${goals[0] || "Portfolio Website"}` : undefined,
      });
    }

    phases.push({
      name: phaseNames[p],
      duration: phaseDurations[p],
      weeks,
    });
  }

  return {
    specialization: specializations["full-stack"],
    totalDuration: `${weeksCount} weeks`,
    phases,
    resources: [
      { title: "MDN Web Docs", url: "https://developer.mozilla.org", type: "documentation" },
      { title: "React Official Tutorial", url: "https://react.dev/learn", type: "tutorial" },
      { title: "Node.js Crash Course", url: "https://nodejs.org/en/learn", type: "course" },
      { title: "Full Stack Open", url: "https://fullstackopen.com", type: "course" },
    ],
  };
}

function generateAIMLRoadmap(
  level: string,
  timeKey: string,
  goals: string[],
  learningStyle: string
): GeneratedRoadmap {
  const weeksCount = Math.ceil(14 * timeMultipliers[timeKey]);
  const depth = levelDepths[level];
  const phases: RoadmapPhase[] = [];

  const phaseNames = ["Python & Math Foundations", "ML Core", "Deep Learning & AI"];
  const phaseDurations = ["4 weeks", "6 weeks", "6 weeks"];
  const phaseStartWeeks = [1, 5, 11];

  for (let p = 0; p < 3; p++) {
    const startWeek = phaseStartWeeks[p];
    const weeksInPhase = p === 0 ? 4 : p === 1 ? 6 : Math.max(2, weeksCount - 10);
    const weeks: RoadmapWeek[] = [];

    for (let w = 0; w < weeksInPhase; w++) {
      const weekNum = startWeek + w;
      const tasks: RoadmapTask[] = [];

      if (p === 0) {
        const dayTasks = [
          { title: "Python Fundamentals", type: "video" as const, duration: "2h", description: "Variables, loops, functions, and data structures", xp: 50 },
          { title: "NumPy & Pandas", type: "practice" as const, duration: "2h", description: "Data manipulation and analysis with Python libraries", xp: 75 },
          { title: "Linear Algebra Basics", type: "video" as const, duration: "1.5h", description: "Vectors, matrices, and operations for ML", xp: 75 },
          { title: "Statistics Fundamentals", type: "article" as const, duration: "2h", description: "Probability, distributions, and statistical inference", resource: "Khan Academy Statistics", xp: 50 },
        ];
        tasks.push(...dayTasks.slice(0, Math.min(dayTasks.length, 4 - depth)));
      } else if (p === 1) {
        const dayTasks = [
          { title: "Machine Learning Intro", type: "video" as const, duration: "2h", description: "Supervised vs unsupervised learning, key concepts", xp: 100 },
          { title: "Regression Algorithms", type: "practice" as const, duration: "2h", description: "Linear and polynomial regression from scratch", xp: 100 },
          { title: "Classification Algorithms", type: "practice" as const, duration: "2h", description: "Decision trees, random forests, and evaluation metrics", xp: 100 },
          { title: "ML Project", type: "project" as const, duration: "4h", description: "Build a predictive model on real-world data", xp: 200 },
        ];
        tasks.push(...dayTasks);
      } else {
        const dayTasks = [
          { title: "Neural Networks Basics", type: "video" as const, duration: "2h", description: "Perceptrons, activation functions, backpropagation", xp: 100 },
          { title: "Deep Learning Frameworks", type: "practice" as const, duration: "2h", description: "PyTorch or TensorFlow fundamentals", xp: 100 },
          { title: "CNNs for Computer Vision", type: "video" as const, duration: "2h", description: "Convolutional networks for image classification", xp: 100 },
          { title: "AI Capstone Project", type: "project" as const, duration: "6h", description: "Build and deploy an ML model to production", xp: 300 },
        ];
        tasks.push(...dayTasks);
      }

      const weekThemes = [
        "Python Programming Basics",
        "Data Manipulation & Analysis",
        "Math for Machine Learning",
        "Introduction to Machine Learning",
        "Supervised Learning",
        "Unsupervised Learning",
        "Model Evaluation & Tuning",
        "Neural Networks",
        "Deep Learning Fundamentals",
        "Computer Vision",
        "Natural Language Processing",
        "Reinforcement Learning Basics",
        "MLOps & Deployment",
        "Capstone Project",
      ];

      weeks.push({
        week: weekNum,
        theme: weekThemes[w % weekThemes.length],
        tasks: tasks.map((t, i) => ({ ...t, day: i + 1 })),
        project: w === weeksInPhase - 1 ? `AI Project: ${goals[0] || "Image Classifier"}` : undefined,
      });
    }

    phases.push({
      name: phaseNames[p],
      duration: phaseDurations[p],
      weeks,
    });
  }

  return {
    specialization: specializations["ai-ml"],
    totalDuration: `${weeksCount} weeks`,
    phases,
    resources: [
      { title: "Python Official Tutorial", url: "https://docs.python.org/3/tutorial/", type: "documentation" },
      { title: "Andrew Ng's ML Course", url: "https://www.coursera.org/learn/machine-learning", type: "course" },
      { title: "Fast.ai", url: "https://fast.ai", type: "course" },
      { title: "Kaggle", url: "https://kaggle.com", type: "practice" },
    ],
  };
}

function generateDevOpsRoadmap(
  level: string,
  timeKey: string,
  goals: string[],
  learningStyle: string
): GeneratedRoadmap {
  const weeksCount = Math.ceil(12 * timeMultipliers[timeKey]);
  const depth = levelDepths[level];
  const phases: RoadmapPhase[] = [];

  const phaseNames = ["Linux & Networking", "CI/CD & Containers", "Cloud & Infrastructure"];
  const phaseDurations = ["4 weeks", "5 weeks", "5 weeks"];
  const phaseStartWeeks = [1, 5, 10];

  for (let p = 0; p < 3; p++) {
    const startWeek = phaseStartWeeks[p];
    const weeksInPhase = p === 0 ? 4 : p === 1 ? 5 : Math.max(2, weeksCount - 9);
    const weeks: RoadmapWeek[] = [];

    for (let w = 0; w < weeksInPhase; w++) {
      const weekNum = startWeek + w;
      const tasks: RoadmapTask[] = [];

      if (p === 0) {
        const dayTasks = [
          { title: "Linux Command Line", type: "video" as const, duration: "2h", description: "Navigation, file operations, and permissions", xp: 50 },
          { title: "Shell Scripting Basics", type: "practice" as const, duration: "2h", description: "Bash scripts, variables, and control flow", xp: 75 },
          { title: "Networking Fundamentals", type: "article" as const, duration: "2h", description: "TCP/IP, DNS, HTTP/HTTPS protocols", resource: "Cloudflare Learning Center", xp: 50 },
          { title: "SSH & Remote Servers", type: "practice" as const, duration: "1.5h", description: "Connect to remote machines securely", xp: 50 },
        ];
        tasks.push(...dayTasks.slice(0, Math.min(dayTasks.length, 4 - depth)));
      } else if (p === 1) {
        const dayTasks = [
          { title: "Git & Version Control", type: "video" as const, duration: "2h", description: "Branching, merging, and Git workflows", xp: 75 },
          { title: "Docker Fundamentals", type: "video" as const, duration: "2h", description: "Containers, images, Dockerfiles, and docker-compose", xp: 100 },
          { title: "CI/CD with GitHub Actions", type: "practice" as const, duration: "2h", description: "Automate builds, tests, and deployments", xp: 100 },
          { title: "Infrastructure as Code", type: "project" as const, duration: "3h", description: "Create and deploy infrastructure with Terraform", xp: 200 },
        ];
        tasks.push(...dayTasks);
      } else {
        const dayTasks = [
          { title: "AWS/GCP Fundamentals", type: "video" as const, duration: "2h", description: "Core services: EC2, S3, VPC, IAM", xp: 100 },
          { title: "Kubernetes Basics", type: "video" as const, duration: "2h", description: "Container orchestration, pods, and deployments", xp: 100 },
          { title: "Monitoring & Logging", type: "practice" as const, duration: "2h", description: "Prometheus, Grafana, and centralized logging", xp: 75 },
          { title: "Cloud Capstone", type: "project" as const, duration: "5h", description: "Deploy a full application on cloud infrastructure", xp: 300 },
        ];
        tasks.push(...dayTasks);
      }

      const weekThemes = [
        "Linux Operating System",
        "Command Line Mastery",
        "Networking Basics",
        "Security Fundamentals",
        "Version Control with Git",
        "Containerization with Docker",
        "CI/CD Pipelines",
        "Configuration Management",
        "Cloud Computing Basics",
        "Kubernetes & Orchestration",
        "Monitoring & Observability",
        "Capstone Project",
      ];

      weeks.push({
        week: weekNum,
        theme: weekThemes[w % weekThemes.length],
        tasks: tasks.map((t, i) => ({ ...t, day: i + 1 })),
        project: w === weeksInPhase - 1 ? `DevOps Project: ${goals[0] || "Auto-Deploy Pipeline"}` : undefined,
      });
    }

    phases.push({
      name: phaseNames[p],
      duration: phaseDurations[p],
      weeks,
    });
  }

  return {
    specialization: specializations["devops"],
    totalDuration: `${weeksCount} weeks`,
    phases,
    resources: [
      { title: "Linux Journey", url: "https://linuxjourney.com", type: "course" },
      { title: "Docker Curriculum", url: "https://docker-curriculum.com", type: "tutorial" },
      { title: "Kubernetes.io", url: "https://kubernetes.io/docs/tutorials/", type: "documentation" },
      { title: "AWS Training", url: "https://aws.amazon.com/training/", type: "course" },
    ],
  };
}

function generateDataScienceRoadmap(
  level: string,
  timeKey: string,
  goals: string[],
  learningStyle: string
): GeneratedRoadmap {
  const weeksCount = Math.ceil(12 * timeMultipliers[timeKey]);
  const depth = levelDepths[level];
  const phases: RoadmapPhase[] = [];

  const phaseNames = ["Data Foundations", "Analysis & Visualization", "Advanced Analytics"];
  const phaseDurations = ["4 weeks", "5 weeks", "5 weeks"];
  const phaseStartWeeks = [1, 5, 10];

  for (let p = 0; p < 3; p++) {
    const startWeek = phaseStartWeeks[p];
    const weeksInPhase = p === 0 ? 4 : p === 1 ? 5 : Math.max(2, weeksCount - 9);
    const weeks: RoadmapWeek[] = [];

    for (let w = 0; w < weeksInPhase; w++) {
      const weekNum = startWeek + w;
      const tasks: RoadmapTask[] = [];

      if (p === 0) {
        const dayTasks = [
          { title: "Python for Data Science", type: "video" as const, duration: "2h", description: "Python basics focused on data manipulation", xp: 50 },
          { title: "NumPy Fundamentals", type: "practice" as const, duration: "2h", description: "Array operations and numerical computing", xp: 75 },
          { title: "Pandas DataFrames", type: "video" as const, duration: "2h", description: "Data loading, cleaning, and transformation", xp: 100 },
          { title: "Data Exploration Project", type: "project" as const, duration: "3h", description: "Explore and analyze a real dataset", xp: 150 },
        ];
        tasks.push(...dayTasks.slice(0, Math.min(dayTasks.length, 4 - depth)));
      } else if (p === 1) {
        const dayTasks = [
          { title: "Data Visualization with Matplotlib", type: "practice" as const, duration: "2h", description: "Create informative charts and plots", xp: 75 },
          { title: "Seaborn & Advanced Viz", type: "video" as const, duration: "2h", description: "Statistical visualizations and customization", xp: 75 },
          { title: "SQL for Data Analysis", type: "practice" as const, duration: "2h", description: "Complex queries, aggregations, and window functions", xp: 100 },
          { title: "Exploratory Data Analysis", type: "project" as const, duration: "4h", description: "Comprehensive EDA on a business dataset", xp: 200 },
        ];
        tasks.push(...dayTasks);
      } else {
        const dayTasks = [
          { title: "Statistical Analysis", type: "video" as const, duration: "2h", description: "Hypothesis testing, A/B testing, and inference", xp: 100 },
          { title: "Machine Learning for Data", type: "practice" as const, duration: "2h", description: "Scikit-learn for predictive analytics", xp: 100 },
          { title: "Big Data Concepts", type: "article" as const, duration: "1.5h", description: "Spark, distributed computing, and data lakes", resource: "Databricks Guide", xp: 50 },
          { title: "Data Science Capstone", type: "project" as const, duration: "6h", description: "End-to-end data science project with insights", xp: 300 },
        ];
        tasks.push(...dayTasks);
      }

      const weekThemes = [
        "Python Programming for Data",
        "Data Manipulation with Pandas",
        "Data Cleaning & Preprocessing",
        "Exploratory Data Analysis",
        "Data Visualization Principles",
        "Statistical Visualization",
        "SQL for Analytics",
        "Communicating Data Insights",
        "Applied Statistics",
        "Machine Learning Applications",
        "Big Data Technologies",
        "Capstone Project",
      ];

      weeks.push({
        week: weekNum,
        theme: weekThemes[w % weekThemes.length],
        tasks: tasks.map((t, i) => ({ ...t, day: i + 1 })),
        project: w === weeksInPhase - 1 ? `Data Project: ${goals[0] || "Analytics Dashboard"}` : undefined,
      });
    }

    phases.push({
      name: phaseNames[p],
      duration: phaseDurations[p],
      weeks,
    });
  }

  return {
    specialization: specializations["data-science"],
    totalDuration: `${weeksCount} weeks`,
    phases,
    resources: [
      { title: "Kaggle Python Course", url: "https://kaggle.com/learn/python", type: "course" },
      { title: "Pandas Documentation", url: "https://pandas.pydata.org/docs/", type: "documentation" },
      { title: "Matplotlib Gallery", url: "https://matplotlib.org/stable/gallery/", type: "reference" },
      { title: "Mode SQL Tutorial", url: "https://mode.com/sql-tutorial/", type: "tutorial" },
    ],
  };
}

function generateMobileRoadmap(
  level: string,
  timeKey: string,
  goals: string[],
  learningStyle: string
): GeneratedRoadmap {
  const weeksCount = Math.ceil(12 * timeMultipliers[timeKey]);
  const depth = levelDepths[level];
  const phases: RoadmapPhase[] = [];

  const phaseNames = ["Mobile Foundations", "Cross-Platform Development", "Native & Advanced"];
  const phaseDurations = ["4 weeks", "5 weeks", "5 weeks"];
  const phaseStartWeeks = [1, 5, 10];

  for (let p = 0; p < 3; p++) {
    const startWeek = phaseStartWeeks[p];
    const weeksInPhase = p === 0 ? 4 : p === 1 ? 5 : Math.max(2, weeksCount - 9);
    const weeks: RoadmapWeek[] = [];

    for (let w = 0; w < weeksInPhase; w++) {
      const weekNum = startWeek + w;
      const tasks: RoadmapTask[] = [];

      if (p === 0) {
        const dayTasks = [
          { title: "Dart Fundamentals", type: "video" as const, duration: "2h", description: "Variables, functions, classes, and async programming", xp: 50 },
          { title: "Flutter Widgets Basics", type: "video" as const, duration: "2h", description: "Core widgets, layout, and Material Design", xp: 75 },
          { title: "State Management Intro", type: "practice" as const, duration: "2h", description: "setState, StatefulWidget basics", xp: 75 },
          { title: "First Mobile App", type: "project" as const, duration: "3h", description: "Build a functional to-do list app", xp: 150 },
        ];
        tasks.push(...dayTasks.slice(0, Math.min(dayTasks.length, 4 - depth)));
      } else if (p === 1) {
        const dayTasks = [
          { title: "Advanced Flutter Widgets", type: "video" as const, duration: "2h", description: "Custom painters, animations, and custom widgets", xp: 100 },
          { title: "Navigation & Routing", type: "practice" as const, duration: "2h", description: "Deep linking, named routes, and route guards", xp: 75 },
          { title: "REST APIs in Flutter", type: "practice" as const, duration: "2h", description: "HTTP requests, JSON parsing, and error handling", xp: 100 },
          { title: "App with Backend", type: "project" as const, duration: "4h", description: "Build a news app or blog reader with API integration", xp: 200 },
        ];
        tasks.push(...dayTasks);
      } else {
        const dayTasks = [
          { title: "Platform Channels", type: "video" as const, duration: "2h", description: "Native code integration, camera, and sensors", xp: 100 },
          { title: "State Management Advanced", type: "practice" as const, duration: "2h", description: "Riverpod, Bloc, or Provider patterns", xp: 100 },
          { title: "App Store Deployment", type: "article" as const, duration: "1.5h", description: "Build, sign, and publish to App Store and Play Store", resource: "Flutter Deployment Guide", xp: 75 },
          { title: "Mobile Capstone", type: "project" as const, duration: "6h", description: "Complete production-ready mobile application", xp: 300 },
        ];
        tasks.push(...dayTasks);
      }

      const weekThemes = [
        "Mobile Development Overview",
        "Flutter Fundamentals",
        "Building User Interfaces",
        "State Management Basics",
        "Navigation & Data Flow",
        "Working with APIs",
        "Animations & Interactions",
        "Local Storage & Persistence",
        "Testing Mobile Apps",
        "Performance Optimization",
        "Platform-Specific Features",
        "Publishing & Monetization",
      ];

      weeks.push({
        week: weekNum,
        theme: weekThemes[w % weekThemes.length],
        tasks: tasks.map((t, i) => ({ ...t, day: i + 1 })),
        project: w === weeksInPhase - 1 ? `Mobile App: ${goals[0] || "Productivity App"}` : undefined,
      });
    }

    phases.push({
      name: phaseNames[p],
      duration: phaseDurations[p],
      weeks,
    });
  }

  return {
    specialization: specializations["mobile"],
    totalDuration: `${weeksCount} weeks`,
    phases,
    resources: [
      { title: "Flutter Official Docs", url: "https://docs.flutter.dev", type: "documentation" },
      { title: "Dart Language Tour", url: "https://dart.dev/language", type: "documentation" },
      { title: "Flutter Codelabs", url: "https://flutter.dev/codelabs", type: "tutorial" },
      { title: "Reso Coder's YouTube", url: "https://youtube.com/@resocoder", type: "tutorial" },
    ],
  };
}

export function generateRoadmap(
  currentLevel: string,
  interests: string[],
  timeCommitment: string,
  goals: string[],
  learningStyle: string
): GeneratedRoadmap {
  const primaryInterest = interests[0] || "full-stack";
  const timeKey = Object.keys(timeMultipliers).find((k) =>
    timeCommitment.toLowerCase().includes(k.replace("-", " "))
  ) || "10-15-hrs";

  switch (primaryInterest) {
    case "ai-ml":
      return generateAIMLRoadmap(currentLevel, timeKey, goals, learningStyle);
    case "devops":
      return generateDevOpsRoadmap(currentLevel, timeKey, goals, learningStyle);
    case "data-science":
      return generateDataScienceRoadmap(currentLevel, timeKey, goals, learningStyle);
    case "mobile":
      return generateMobileRoadmap(currentLevel, timeKey, goals, learningStyle);
    case "full-stack":
    default:
      return generateFullStackRoadmap(currentLevel, timeKey, goals, learningStyle);
  }
}

export function getSpecializationInfo(id: string): Specialization | undefined {
  return specializations[id];
}

export const allSpecializations = Object.values(specializations);
