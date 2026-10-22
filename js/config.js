/**
 * ====================================================================
 * PORTFOLIO CONFIGURATION - GANESH S
 * ====================================================================
 * Single source of truth for all personal details, external links,
 * and contact channels. Edit this file to update your portfolio
 * without modifying markup or stylesheets.
 */

export const CONFIG = {
  profile: {
    name: "Ganesh S",
    pronouns: "He/Him",
    role: "Computer Science Engineering Student",
    aspirations: "Aspiring Software Developer & Future AI Engineer",
    availability: {
      status: "Available for Opportunities",
      badgeText: "AVAILABLE FOR INTERNSHIPS & COLLABORATIONS",
      isAvailable: true
    },
    location: "India",
    heroHeadline: "Hi, I’m Ganesh",
    introVerbatim: "Hi, I’m Ganesh S, a Computer Science Engineering student passionate about programming, web development, problem-solving, and artificial intelligence. I enjoy learning new technologies and building practical projects that solve real-world problems.",
    heroBio: "Developer, problem solver, and technology enthusiast focused on software engineering, responsive web architectures, and intelligent systems."
  },

  social: {
    email: "ganeshsakthivel20072007@gmail.com",
    github: "https://github.com/Ganesh241207",
    linkedin: "https://www.linkedin.com/in/ganesh-s-661248424/",
    resumeUrl: "#contact"
  },

  education: {
    degree: "Bachelor of Engineering in Computer Science & Engineering",
    institution: "Anna University Affiliated Engineering College",
    period: "2025 — Present",
    status: "Undergraduate Student",
    coreFocus: [
      "Data Structures & Algorithms",
      "Object-Oriented Programming (Java / C++)",
      "Database Management Systems",
      "Web Technologies & Frameworks",
      "Operating Systems & Computer Networks",
      "Artificial Intelligence Fundamentals"
    ]
  },

  interests: [
    "Full-Stack Web Development & Responsive Architectures",
    "Applied Machine Learning & Artificial Intelligence",
    "Algorithmic Problem Solving & Efficient Data Structures",
    "User Interface Craftsmanship & Micro-Interactions",
    "Open-Source Software & Collaborative Development"
  ],

  careerGoals: [
    "Engineer reliable, high-performance software systems that solve tangible human challenges.",
    "Master foundational and modern AI paradigms to build intelligent, autonomous applications.",
    "Contribute to impactful open-source codebases and innovate in high-caliber engineering teams."
  ],

  journeyMilestones: [
    {
      period: "2025",
      title: "Foundations of Computer Science & Programming",
      badge: "Core Foundations",
      description: "Commenced undergraduate studies in Computer Science Engineering. Built foundational programming competence in C and Java, exploring procedural logic, structured programming, and mathematical problem-solving."
    },
    {
      period: "2025",
      title: "Data Structures & Modern Web Technologies",
      badge: "Core Engineering",
      description: "Implemented non-trivial linear and non-linear data structures from first principles. Built modern web interfaces using semantic HTML5, advanced CSS architectures, and vanilla JavaScript."
    },
    {
      period: "2025",
      title: "Applied Software Projects & System Modeling",
      badge: "Project Architecture",
      description: "Engineered domain-specific software solutions including a Student Daily Activity Tracker, Feedback Management System, and linked-list data engines, emphasizing clean code and modularity."
    },
    {
      period: "2026 — Present",
      title: "Full-Stack Craft & AI Frontiers",
      badge: "Current Focus",
      description: "Deepening focus in AI engineering, algorithmic optimization, and studio-grade web applications. Designing intelligent user experiences with high performance and accessibility."
    }
  ],

  /**
   * 4 Core Skill Domains with Floating Real-World Technology Logos
   */
  skills: [
    {
      id: "frontend-development",
      title: "Frontend Development",
      skillsList: "HTML5 · CSS3 · JavaScript",
      description: "Build responsive, interactive websites using semantic HTML, modern CSS layouts, and JavaScript for dynamic user experiences.",
      tags: ["Semantic HTML", "Responsive CSS", "DOM Manipulation"],
      logos: [
        {
          name: "HTML5",
          src: "assets/icons/skills/html5.svg",
          alt: "HTML5 logo",
          floatDur: "4.8s",
          floatDelay: "0s",
          floatDist: "8px",
          floatRot: "1.5deg"
        },
        {
          name: "CSS3",
          src: "assets/icons/skills/css3.svg",
          alt: "CSS3 logo",
          floatDur: "5.4s",
          floatDelay: "-1.8s",
          floatDist: "9px",
          floatRot: "-1.5deg"
        },
        {
          name: "JavaScript",
          src: "assets/icons/skills/javascript.svg",
          alt: "JavaScript logo",
          floatDur: "4.2s",
          floatDelay: "-0.9s",
          floatDist: "7px",
          floatRot: "1deg"
        }
      ]
    },
    {
      id: "java-development",
      title: "Java Development",
      skillsList: "Java",
      description: "Develop object-oriented programs using classes, objects, inheritance, methods, and problem-solving logic.",
      tags: ["OOP", "Data Structures", "Problem Solving"],
      logos: [
        {
          name: "Java",
          src: "assets/icons/skills/java.svg",
          alt: "Java logo",
          floatDur: "5.6s",
          floatDelay: "-0.5s",
          floatDist: "10px",
          floatRot: "-1.8deg"
        }
      ]
    },
    {
      id: "python-programming",
      title: "Python Programming",
      skillsList: "Python",
      description: "Write readable Python programs for automation, data processing, and developing programming logic.",
      tags: ["Programming Fundamentals", "Automation", "Data Handling"],
      logos: [
        {
          name: "Python",
          src: "assets/icons/skills/python.svg",
          alt: "Python logo",
          floatDur: "4.9s",
          floatDelay: "-2.3s",
          floatDist: "8px",
          floatRot: "1.6deg"
        }
      ]
    },
    {
      id: "uiux-design",
      title: "UI/UX Design",
      skillsList: "UI/UX Design",
      description: "Design intuitive, user-friendly interfaces with clear layouts, consistent typography, visual hierarchy, and responsive design principles.",
      tags: ["Wireframing", "Visual Hierarchy", "Usability"],
      logos: [
        {
          name: "Figma",
          src: "assets/icons/skills/figma.svg",
          alt: "Figma logo",
          floatDur: "5.1s",
          floatDelay: "-1.4s",
          floatDist: "9px",
          floatRot: "-1.4deg"
        }
      ]
    }
  ]
};
