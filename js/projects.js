/**
 * ====================================================================
 * PROJECTS DATA & MANAGEMENT - GANESH S
 * ====================================================================
 * Authentic project catalog for Ganesh S.
 * Real academic & personal engineering projects. Unfinished work is
 * explicitly marked as "Concept" or "In Progress" to uphold total honesty.
 */

export const PROJECTS = [
  {
    id: "student-activity-tracker",
    slug: "student-daily-activity-tracker",
    title: "Student Daily Activity Tracker",
    status: "In Progress",
    statusType: "progress", // 'progress' | 'concept' | 'complete'
    category: "Web Application / Productivity",
    highlightBadge: "Active Development",
    shortDescription: "A structured digital log designed to organize coursework, study intervals, and academic milestones with intuitive performance metrics.",
    problemStatement: "College students frequently juggle disparate deadlines, assignment timelines, and self-study sessions without a unified system, resulting in fragmented focus and poor time management.",
    solutionOverview: "Engineered a focused, zero-bloat web tracker allowing students to log daily study blocks, categorize subjects, monitor weekly completion trends, and maintain consistency using an event-driven front-end architecture.",
    technologies: ["JavaScript (ES6+)", "CSS3 Design System", "HTML5 LocalStorage", "Responsive UI", "Chart Renderings"],
    keyFeatures: [
      "Custom task categorization (Lectures, Lab Work, Revisions, Personal Coding)",
      "Daily time-blocking and study session chronometer",
      "Persistent state management utilizing browser LocalStorage",
      "Dynamic streak tracking and weekly completion visualizer",
      "Lightweight, offline-first responsive interface without external dependencies"
    ],
    architectureNotes: "Constructed with vanilla JavaScript leveraging a decoupled pub/sub event bus pattern to maintain UI reactivity without heavy framework overhead. Data schemas are validated against strict JSON structures before local persistence.",
    sourceCodeUrl: "https://github.com/Ganesh241207/student-daily-activity-tracker", // placeholder/customizable
    liveDemoUrl: null, // Honesty: not deployed to production yet
    visualTheme: "tracker", // used to render custom SVG generative illustration
    date: "2025"
  },
  {
    id: "student-feedback-system",
    slug: "student-feedback-management-system",
    title: "Student Feedback Management System",
    status: "Concept",
    statusType: "concept",
    category: "Academic Management Platform",
    highlightBadge: "System Architecture",
    shortDescription: "A streamlined portal allowing students to submit constructive, categorized academic reviews with administrative analytical dashboards.",
    problemStatement: "Traditional paper-based or unstructured surveys suffer from low response rates, lack of student anonymity, and significant administrative delays in processing course evaluations.",
    solutionOverview: "Designed an automated feedback architecture featuring secure, role-separated submission flows where student submissions are sanitized, aggregated by course modules, and translated into actionable insights for department heads.",
    technologies: ["Java", "HTML5 / CSS3", "Form Validation APIs", "Relational Database Concepts", "Modular UI"],
    keyFeatures: [
      "Anonymized student feedback submission pipeline with client-side verification",
      "Course and instructor parameter rating criteria (Clarity, Pace, Materials)",
      "Department-level aggregation and sentiment distribution categorization",
      "Role-based privilege simulation (Student, Faculty Reviewer, Admin)",
      "Structured reporting generation for academic committee reviews"
    ],
    architectureNotes: "Architected around strict relational schema designs (3NF) to guarantee referential integrity between department faculties, course catalogs, and anonymized response tokens.",
    sourceCodeUrl: "https://github.com/Ganesh241207/student-feedback-system",
    liveDemoUrl: null,
    visualTheme: "feedback",
    date: "2025"
  },
  {
    id: "library-management-linked-lists",
    slug: "library-management-system-linked-lists",
    title: "Library Management System using Linked Lists",
    status: "Completed",
    statusType: "complete",
    category: "Data Structures & Algorithms",
    highlightBadge: "DSA Core Implementation",
    shortDescription: "A high-efficiency dynamic catalog and transaction engine built from first principles using singly and doubly linked list data structures.",
    problemStatement: "Standard array-based catalog systems suffer from costly contiguous memory reallocation and O(n) shifts during frequent book insertions and removals in resource-constrained environments.",
    solutionOverview: "Engineered a custom memory-efficient library system in C/Java utilizing linked lists to handle arbitrary catalog growth, instant node insertion at head/tail, checkout queueing, and title/ISBN traversal.",
    technologies: ["C", "Java", "Linked Lists (Singly & Doubly)", "Dynamic Memory Management", "Algorithmic Pointers"],
    keyFeatures: [
      "Dynamic node allocation eliminating fixed-size inventory constraints",
      "Doubly linked list architecture for bidirectional catalog navigation",
      "ISBN-based quick search with custom comparator functions",
      "Borrower waiting list modeled as a FIFO node queue",
      "Explicit memory lifecycle management with pointer sanitation"
    ],
    architectureNotes: "Employs custom heap allocation routines with defensive null checks and boundary assertion. Demonstrates in-depth mastery of pointer manipulation, pointer indirection, and time-complexity trade-offs (O(1) insertion, O(n) search).",
    sourceCodeUrl: "https://github.com/Ganesh241207/library-management-linked-lists",
    liveDemoUrl: null,
    visualTheme: "dsa",
    date: "2024"
  },
  {
    id: "vehicle-rental-system",
    slug: "vehicle-rental-management-system",
    title: "Vehicle Rental Management System",
    status: "In Progress",
    statusType: "progress",
    category: "Object-Oriented Software Design",
    highlightBadge: "OOP Principles",
    shortDescription: "A comprehensive fleet rental platform modeling multi-tier vehicle hierarchies, dynamic pricing schemes, and reservation state machines.",
    problemStatement: "Managing diverse vehicle classes (Sedans, SUVs, Two-Wheelers) with varying pricing rules, maintenance intervals, and rental contracts often leads to booking conflicts and invoicing errors.",
    solutionOverview: "Built an object-oriented software system using core OOP tenets (Polymorphism, Inheritance, Encapsulation) to model vehicle fleets, track rental durations, calculate dynamic tariffs, and validate customer licenses.",
    technologies: ["Java", "OOP Design Patterns", "File I/O Serialization", "State Management", "Console / GUI Interface"],
    keyFeatures: [
      "Extensible Vehicle abstract class hierarchy with specialized vehicle behaviors",
      "Rental lifecycle state machine (Available -> Reserved -> On Trip -> Maintenance)",
      "Dynamic billing engine factoring rental duration, mileage tiers, and insurance",
      "Customer verification module with validation of driving credential formats",
      "Data serialization for state persistence across execution sessions"
    ],
    architectureNotes: "Applied Factory and Strategy patterns to decouple vehicle creation and pricing algorithm selection, enabling seamless addition of new electric/hybrid vehicle classes without modifying core billing engines.",
    sourceCodeUrl: "https://github.com/Ganesh241207/vehicle-rental-management",
    liveDemoUrl: null,
    visualTheme: "rental",
    date: "2025"
  },
  {
    id: "agri-marketplace-smart-farming",
    slug: "agricultural-marketplace-smart-farming",
    title: "Agricultural Marketplace & Smart Farming Platform",
    status: "Concept",
    statusType: "concept",
    category: "AgriTech & Future AI Systems",
    highlightBadge: "Future AI Roadmap",
    shortDescription: "A conceptual digital platform connecting regional farmers directly with commercial buyers, coupled with crop health intelligence concepts.",
    problemStatement: "Smallholder farmers are frequently marginalized by opaque middleman markups, volatile mandi prices, and lack of timely agronomic diagnosis for crop disease management.",
    solutionOverview: "Conceptualized a multi-faceted digital agriculture ecosystem: a decentralized direct-to-buyer marketplace alongside a roadmap for AI-driven computer vision crop health assessment and localized market trend forecasts.",
    technologies: ["System Design", "Web Architecture", "RESTful APIs", "AI/ML Computer Vision Concepts", "Responsive UI"],
    keyFeatures: [
      "Direct farmer-to-buyer trade portal removing supply chain intermediaries",
      "Transparent regional price discovery and harvest listing feeds",
      "Crop advisory knowledge repository covering regional soil & weather conditions",
      "Roadmap for mobile crop leaf disease detection via image classification",
      "Multilingual accessibility design for rural usability"
    ],
    architectureNotes: "Formulated as a decoupled microservices architecture with a lightweight front-end tailored for low-bandwidth cellular environments, planning for on-device quantized ML models for offline disease inference.",
    sourceCodeUrl: "https://github.com/Ganesh241207/agri-smart-farming-platform",
    liveDemoUrl: null,
    visualTheme: "agri",
    date: "2026"
  }
];

/**
 * Returns a specific project by its ID
 */
export function getProjectById(id) {
  return PROJECTS.find(p => p.id === id) || null;
}
