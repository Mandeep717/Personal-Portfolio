import dotenv from "dotenv";
import { connectDatabase } from "../Backend/Config/database.js";
import { ProfileModel } from "../Backend/Model/profile.model.js";
import { PortfolioItemModel } from "../Backend/Model/portfolio.model.js";

dotenv.config();

const profileData = {
    name: "Mandeep Boddu",

    title: "B.Tech Artificial Intelligence and Machine Learning Student",

    bio: `I’m a B.Tech student specializing in Artificial Intelligence and Machine Learning (AI/ML) at VNR Vignana Jyothi Institute of Engineering & Technology. I’m interested in technology, problem-solving, and building practical solutions that can make a real difference.

I enjoy learning through hands-on projects, experimenting with new technologies, and participating in hackathons. My main areas of interest include Machine Learning, Data Science, AI agents, RAG systems, and software development, and I’m continuously working on strengthening my technical and problem-solving skills.

Beyond academics and technology, I enjoy cricket, football, and Formula 1, and I also like reading novels and watching movies. These interests give me a good balance outside of my technical work and keep me curious about different perspectives and stories.

I value being a team player and enjoy working with people, while also taking responsibility and showing leadership when needed. I try to be caring, kind, and friendly in the way I work with others and believe that good communication, teamwork, and mutual respect are just as important as technical skills.

My goal is to grow into a skilled AI/ML engineer, while continuing to learn, build meaningful projects, and become a better professional and teammate along the way.`,

    contact: {
        email: "mandeep.boddu12@gmail.com",
        phone: "8179744182",
        location: "Bachupally, Hyderabad, India"
    },

    socialLinks: {
        github: "https://github.com/Mandeep717",
        linkedin: "https://www.linkedin.com/in/mandeep-boddu-6862183a5"
    },

    codingProfiles: [
        {
            platform: "CodeChef",
            username: "rag_bass_82",
            url: "https://www.codechef.com/users/rag_bass_82"
        },
        {
            platform: "LeetCode",
            username: "Manfooty_17",
            url: "https://leetcode.com/u/Manfooty_17"
        },
        {
            platform: "Codeforces",
            username: "ManB717",
            url: "https://codeforces.com/profile/ManB717"
        }
    ],

    skills: [
        {
            category: "Programming Languages",
            items: [
                "Python",
                "JavaScript",
                "C",
                "C++"
            ]
        },
        {
            category: "AI & Machine Learning",
            items: [
                "Machine Learning",
                "Artificial Intelligence",
                "NumPy",
                "Pandas",
                "Scikit-learn",
                "Data Preprocessing",
                "Data Analysis",
                "Feature Engineering"
            ]
        },
        {
            category: "Generative AI",
            items: [
                "LLM Applications",
                "RAG",
                "Vector Search",
                "Embeddings",
                "LangChain",
                "AI Agents",
                "Tool Calling",
                "Prompt Engineering"
            ]
        },
        {
            category: "Backend Development",
            items: [
                "Node.js",
                "Express.js",
                "REST APIs",
                "JWT Authentication",
                "API Development"
            ]
        },
        {
            category: "Databases",
            items: [
                "MongoDB",
                "MongoDB Atlas",
                "Mongoose",
                "SQL",
                "Database Design",
                "Normalization"
            ]
        },
        {
            category: "Developer Tools",
            items: [
                "Git",
                "GitHub",
                "Postman",
                "VS Code"
            ]
        },
        {
            category: "Core Computer Science",
            items: [
                "Data Structures and Algorithms",
                "DBMS",
                "Object-Oriented Programming",
                "Operating Systems",
                "Computer Networks"
            ]
        }
    ],

    resume: {
        url: "https://drive.google.com/file/d/1od5YDDXdaXuits5ISQZkzVRe3etfRXmM/view?usp=sharing",
        fileName: "Mandeep_Resume.pdf",

        extractedText: `MANDEEP BODDU
B.Tech — Artificial Intelligence & Machine Learning | VNR Vignana Jyothi Institute of Engineering & Technology
Email: mandeep.boddu12@gmail.com | Phone: 8179744182 | LinkedIn: https://www.linkedin.com/in/mandeep-boddu-6862183a5
| GitHub: github.com/Mandeep717

1. PROFESSIONAL OBJECTIVE

Motivated B.Tech student specializing in Artificial Intelligence and Machine Learning, with a strong interest in building practical AI-driven software solutions. I enjoy learning through hands-on projects, hackathons, experimentation, and problem solving. My goal is to develop strong expertise in AI/ML while combining machine learning with software engineering to build reliable and useful real-world systems.

2. EDUCATIONAL QUALIFICATIONS

B.Tech — Artificial Intelligence & Machine Learning
VNR Vignana Jyothi Institute of Engineering & Technology
2025-2029
CGPA: 9.45

Intermediate
FIITJEE Junior College
2023-2025
92%

Schooling
SilverOaks International School
2012-2023
92%

3. TECHNICAL SKILLS

Programming & Data:
Python, NumPy, Pandas, Scikit-learn, SQL

AI / ML:
Machine Learning, Data Analysis, AI Agents, RAG, LLM Integration, AI Decision Systems

Backend & APIs:
FastAPI, Node.js, Express.js, REST APIs, Pydantic

Databases:
MongoDB, MongoDB Atlas, SQLite, Database Design, Normalization

AI / Developer Tools:
LangChain, ChromaDB, OpenAI-compatible APIs, Featherless AI, Ollama, Git, GitHub, Postman

Other:
PDF Processing, Report Generation, Data Quality Analysis, API Development

4. PROJECTS

Dataset Intelligence Copilot — AI Data Quality & ML Readiness Assistant

Technology:
Python, Pandas, NumPy, Scikit-learn, FastAPI, SQLite, LLMs, RAG, ChromaDB, Featherless AI

Developed an AI-assisted platform for evaluating dataset quality and determining machine-learning readiness.

Implemented checks for missing values, duplicates, outliers, class imbalance, redundant features, and basic data leakage.

Designed a decision-oriented AI engine that produces actionable recommendations with confidence, reasoning, expected impact, and automated-fix indicators.

Built workflows for dataset analysis, preprocessing-code generation, conversational dataset Q&A, report generation, and cleaned CSV export.

Explored RAG and vector-store approaches for providing dataset-specific context to the AI assistant.

AI Project Monitoring & Documentary Assistant — PAIMANA

Technology:
Python, PDF Processing, Pandas, ChromaDB, RAG, Ollama, SQLite

Worked on a project-monitoring platform based on PAIMANA infrastructure project flash reports.

Built document-processing workflows to extract structured project information from PDF reports.

Engineered metrics such as Progress Gap, Slippage Months, and Cost Escalation for project analysis.

Integrated extracted evidence with a retrieval-based documentary assistant for question answering and report analysis.

Worked with multiple reports, structured storage, evidence retrieval, and local LLM integration.

Campus Resource Booking Backend

Technology:
Node.js, Express.js, MongoDB, Mongoose, REST APIs, Postman

Designed a backend for managing campus resources and bookings.

Created resource and booking schemas covering resource type, location, availability, capacity, booking status, purpose, and time periods.

Implemented booking-conflict validation using start and end date-time constraints.

Tested backend endpoints and request/response flows using Postman.

5. RELEVANT COURSEWORK & LEARNING

Machine Learning and Artificial Intelligence
Data Structures / Programming
Database Management Systems and SQL
Statistics and Probability
Data Analysis and Visualization
AI Agents, RAG, LLM Integration, and Backend API Development

6. PROFESSIONAL & PERSONAL QUALITIES

Team player who enjoys collaborating and contributing to shared goals.
Leadership-oriented and willing to take responsibility when required.
Caring, kind, and friendly in professional and collaborative environments.
Curious and hands-on learner who prefers building and experimenting while learning.

7. HOBBIES & PERSONAL INTERESTS

Cricket
Football
Formula 1
Reading novels
Watching movies

8. ADDITIONAL INFORMATION

Date of Birth: 25-01-2008
Languages: English, Telugu

10. DECLARATION

I hereby declare that the information provided in this resume is accurate to the best of my knowledge and represents my academic background, technical skills, projects, interests, and achievements.

Place: Hyderabad, India
Date: 03-10-2026

Mandeep Boddu`
    }
};

const portfolioItems = [
    {
        type: "education",
        title: "B.Tech — Artificial Intelligence & Machine Learning",
        organization: "VNR Vignana Jyothi Institute of Engineering & Technology",
        description: "Bachelor of Technology specializing in Artificial Intelligence and Machine Learning.",
        details: [
            "2025-2029",
            "CGPA: 9.45"
        ],
        featured: true,
        displayOrder: 1
    },

    {
        type: "education",
        title: "Intermediate",
        organization: "FIITJEE Junior College",
        description: "Intermediate education.",
        details: [
            "2023-2025",
            "Percentage: 92%"
        ],
        featured: false,
        displayOrder: 2
    },

    {
        type: "education",
        title: "Schooling",
        organization: "SilverOaks International School",
        description: "School education.",
        details: [
            "2012-2023",
            "Percentage: 92%"
        ],
        featured: false,
        displayOrder: 3
    },

    {
        type: "project",
        title: "Dataset Intelligence Copilot",
        organization: "AI Data Quality & ML Readiness Assistant",
        description:
            "An AI-assisted platform for evaluating dataset quality and determining machine-learning readiness.",
        technologies: [
            "Python",
            "Pandas",
            "NumPy",
            "Scikit-learn",
            "FastAPI",
            "SQLite",
            "LLMs",
            "RAG",
            "ChromaDB",
            "Featherless AI"
        ],
        details: [
            "Checks missing values, duplicates, outliers, class imbalance, redundant features, and basic data leakage.",
            "Produces actionable recommendations with confidence, reasoning, expected impact, and automated-fix indicators.",
            "Supports dataset analysis, preprocessing-code generation, conversational dataset Q&A, report generation, and cleaned CSV export.",
            "Uses RAG and vector-store approaches for dataset-specific context."
        ],
        featured: true,
        displayOrder: 1
    },

    {
        type: "project",
        title: "AI Project Monitoring & Documentary Assistant",
        organization: "PAIMANA",
        description:
            "A project-monitoring and documentary assistant based on infrastructure project flash reports.",
        technologies: [
            "Python",
            "PDF Processing",
            "Pandas",
            "ChromaDB",
            "RAG",
            "Ollama",
            "SQLite"
        ],
        details: [
            "Extracts structured project information from infrastructure flash reports.",
            "Engineers metrics including Progress Gap, Slippage Months, and Cost Escalation.",
            "Integrates extracted evidence with a retrieval-based documentary assistant.",
            "Supports multi-document ingestion, evidence retrieval, structured data extraction, and local LLM integration."
        ],
        featured: true,
        displayOrder: 2
    },

    {
        type: "project",
        title: "Campus Resource Booking Backend",
        organization: "Backend Development Project",
        description:
            "A backend for managing campus resources and bookings.",
        technologies: [
            "Node.js",
            "Express.js",
            "MongoDB",
            "Mongoose",
            "REST APIs",
            "Postman"
        ],
        details: [
            "Designed resource and booking schemas.",
            "Implemented resource availability and booking status management.",
            "Implemented booking-conflict validation using start and end date-time constraints.",
            "Tested backend endpoints and request/response flows using Postman."
        ],
        featured: true,
        displayOrder: 3
    },

    {
        type: "project",
        title: "Personal Portfolio Manager & AI Chatbot",
        organization: "Full-Stack Personal Project",
        description:
            "An admin-controlled personal portfolio platform with a profile-specific AI assistant.",
        technologies: [
            "React",
            "TypeScript",
            "Node.js",
            "Express.js",
            "MongoDB",
            "MongoDB Atlas Vector Search",
            "Ollama",
            "LangChain",
            "RAG",
            "JWT"
        ],
        details: [
            "Provides public access to profile, education, skills, experience, projects, achievements, coding profiles, and resume information.",
            "Uses authenticated administration for portfolio management.",
            "Uses embeddings and MongoDB Atlas Vector Search for portfolio-specific retrieval.",
            "Uses Ollama for local embedding and LLM inference.",
            "Supports conversational follow-up questions using stored conversation history."
        ],
        featured: true,
        displayOrder: 4
    },

    {
        type: "achievement",
        title: "Winner — Agent Arena",
        organization: "Agent Arena",
        description: "Winner of Agent Arena.",
        featured: true,
        displayOrder: 1
    },

    {
        type: "achievement",
        title: "Winner — WebForge AI",
        organization: "WebForge AI",
        description: "Winner of WebForge AI.",
        featured: true,
        displayOrder: 2
    }
];

const seed = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error(
                "MONGODB_URI is missing. Configure it in your local .env file."
            );
        }

        await connectDatabase();

        console.log("Connected to MongoDB.");

        await ProfileModel.deleteMany({});
        await PortfolioItemModel.deleteMany({});

        console.log("Cleared existing Profile and PortfolioItem data.");

        await ProfileModel.create(profileData);

        console.log("Profile seeded successfully.");

        await PortfolioItemModel.insertMany(portfolioItems);

        console.log(
            `${portfolioItems.length} portfolio items seeded successfully.`
        );

        console.log("");
        console.log("Database seed completed successfully.");
        console.log("");
        console.log("Next step:");
        console.log("npm run rebuild-knowledge");

        await import("mongoose").then(({ default: mongoose }) =>
            mongoose.connection.close()
        );

        process.exit(0);
    } catch (error) {
        console.error("Database seed failed:");
        console.error(error);

        try {
            const { default: mongoose } = await import("mongoose");
            await mongoose.connection.close();
        } catch {}

        process.exit(1);
    }
};

seed();