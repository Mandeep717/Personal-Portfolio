# Personal Portfolio & AI Chatbot

A full-stack personal portfolio website with an integrated AI chatbot that answers questions specifically about my profile, skills, education, projects, achievements, coding profiles, and resume.

The application combines a React frontend with an Express.js backend, MongoDB Atlas for data storage, MongoDB Atlas Vector Search for retrieval, and locally hosted Ollama models for embeddings and response generation.

---

## Features

### Portfolio

- Personal introduction and profile
- Education
- Skills
- Projects
- Achievements
- Coding profiles
- GitHub and LinkedIn profiles
- Contact information
- Resume access

### AI Chatbot

The chatbot is specifically designed to answer questions about my portfolio.

It can answer questions about:

- Education
- Skills and technologies
- Projects
- Project technologies and descriptions
- Achievements
- Coding profiles
- GitHub and LinkedIn
- Resume information
- Personal interests

The chatbot also maintains recent conversation history to support follow-up questions.

### Admin Dashboard

The application includes an authenticated admin interface for managing portfolio content.

Admin functionality includes:

- Profile management
- Portfolio item management
- Resume upload
- Knowledge-base rebuilding

Public visitors do not need to log in.

---

# Architecture

```text
                         ┌─────────────────────┐
                         │     React Frontend  │
                         │   React + TypeScript │
                         └──────────┬──────────┘
                                    │
                                    │ REST API
                                    ▼
                         ┌─────────────────────┐
                         │   Express Backend   │
                         │      Node.js        │
                         └──────────┬──────────┘
                                    │
                  ┌─────────────────┼─────────────────┐
                  │                 │                 │
                  ▼                 ▼                 ▼
          ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
          │ MongoDB      │  │ Vector Search │  │   Ollama     │
          │ Atlas        │  │ Atlas         │  │ Local AI     │
          │              │  │               │  │              │
          │ Profile      │  │ Embeddings    │  │ qwen3:4b     │
          │ Portfolio    │  │ Retrieval     │  │              │
          │ Knowledge    │  │               │  │ embeddinggemma│
          │ Conversations│  │               │  │              │
          └──────────────┘  └──────────────┘  └──────────────┘
```

---

# RAG Pipeline

The chatbot uses a Retrieval-Augmented Generation architecture.

```text
Profile + Portfolio Data
          │
          ▼
   Knowledge Builder
          │
          ▼
   Text Chunking
          │
          ▼
Embedding Generation
   embeddinggemma
          │
          ▼
MongoDB Atlas
Vector Search
          │
          ▼
Relevant Knowledge
          │
          ▼
 Conversation History
          │
          ▼
      qwen3:4b
          │
          ▼
Profile-specific Response
```

The knowledge base is generated from the profile and portfolio data stored in MongoDB.

### Current RAG configuration

- Chunk size: `800`
- Chunk overlap: `100`
- Embedding model: `embeddinggemma`
- Embedding dimensions: `768`
- Vector similarity: `cosine`
- Vector search candidates: `50`
- Retrieved chunks: `5`

---

# Technology Stack

## Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- Lucide React

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt
- Multer

## AI / RAG

- Ollama
- `qwen3:4b`
- `embeddinggemma`
- LangChain
- MongoDB Atlas Vector Search

## Development Tools

- Git
- GitHub
- Postman
- VS Code

---

# Project Structure

```text
Personal Portfolio/
│
├── Backend/
│   ├── API/
│   ├── Config/
│   ├── Middleware/
│   ├── Model/
│   └── Service/
│
├── database/
│   ├── seed.js
│   └── rebuild-knowledge.js
│
├── frontend/
│   ├── public/
│   └── src/
│       ├── api/
│       ├── assets/
│       ├── components/
│       ├── context/
│       ├── types/
│       ├── utils/
│       ├── App.tsx
│       ├── index.css
│       └── main.tsx
│
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
└── server.js
```

---

# Database Models

The backend uses MongoDB with the following primary models.

### Admin

Stores authenticated administrator credentials.

### Profile

Stores the main personal profile including:

- Name
- Title
- Bio
- Contact information
- Social links
- Coding profiles
- Skills
- Resume information

### PortfolioItem

Stores:

- Education
- Experience
- Projects
- Achievements

### Knowledge

Stores chunked portfolio information together with vector embeddings.

### Conversation

Stores chatbot conversation history for supporting follow-up questions.

---

# Prerequisites

Before running the project locally, install:

- Node.js
- MongoDB Atlas account
- Ollama

Deployment is not required for local evaluation.

---

# Ollama Setup

Install Ollama from:

https://ollama.com/

Make sure Ollama is running.

Pull the required models:

```bash
ollama pull qwen3:4b
ollama pull embeddinggemma
```

Verify the installed models:

```bash
ollama list
```

Both `qwen3:4b` and `embeddinggemma` should be available.

---

# MongoDB Atlas Setup

Create a MongoDB Atlas cluster and obtain a connection string.

Create a database for the project.

The chatbot uses MongoDB Atlas Vector Search for semantic retrieval.

Create a Vector Search index named:

```text
portfolio_index
```

Configure the index with:

```json
{
  "fields": [
    {
      "type": "vector",
      "path": "embedding",
      "numDimensions": 768,
      "similarity": "cosine"
    }
  ]
}
```

The important settings are:

```text
Index Name: portfolio_index
Vector Path: embedding
Dimensions: 768
Similarity: cosine
```

---

# Environment Variables

Create a `.env` file in the project root.

Use `.env.example` as the reference.

```env
PORT=3000

MONGODB_URI=your_mongodb_atlas_connection_string

JWT_SECRET=replace_with_a_secure_secret

JWT_EXPIRES_IN=1d

NODE_ENV=development

OLLAMA_BASE_URL=http://localhost:11434
```

Do not commit `.env` to GitHub.

---

# Installation

Clone the repository:

```bash
git clone https://github.com/Mandeep717/Personal-Portfolio.git
```

Move into the project directory:

```bash
cd Personal-Portfolio
```

Install root/backend dependencies:

```bash
npm install
```

Install frontend dependencies:

```bash
cd frontend
npm install
cd ..
```

---

# Database Seeding

The repository includes a seed script that creates the initial profile and portfolio data.

Run:

```bash
npm run seed
```

The seed creates:

- 1 profile
- 9 portfolio items

The portfolio items include education, projects, and achievements.

The seed script does not contain administrator credentials.

> **Important:** Configure your own MongoDB Atlas database in `.env` before running the seed script.

---

# Build the Knowledge Base

After seeding the database, generate the chatbot knowledge base:

```bash
npm run rebuild-knowledge
```

The process:

1. Reads the profile from MongoDB
2. Reads the portfolio items
3. Builds the combined portfolio knowledge document
4. Splits the document into chunks
5. Generates embeddings using `embeddinggemma`
6. Clears the existing knowledge chunks
7. Stores the new chunks and embeddings in MongoDB

A successful run reports the number of chunks created.

---

# Running the Application

## Start the Backend

From the project root:

```bash
npm start
```

For development with Nodemon:

```bash
npx nodemon server.js
```

The backend runs on:

```text
http://localhost:3000
```

Keep this terminal running.

---

## Start the Frontend

Open a second terminal in the project root:

```bash
npm run dev
```

The frontend normally runs on:

```text
http://localhost:5173
```

Open the displayed Vite URL in your browser.

---

# Available Scripts

From the project root:

### Start frontend

```bash
npm run dev
```

### Build frontend

```bash
npm run build
```

### Preview frontend build

```bash
npm run preview
```

### Start backend

```bash
npm start
```

### Seed database

```bash
npm run seed
```

### Rebuild chatbot knowledge base

```bash
npm run rebuild-knowledge
```

---

# API Overview

## Public Viewer APIs

```text
GET  /api/viewer/profile
GET  /api/viewer/portfolios
GET  /api/viewer/portfolios/:id
GET  /api/viewer/contact
GET  /api/viewer/resume
POST /api/viewer/chat
```

These endpoints are available to portfolio visitors.

---

## Admin APIs

Administrative operations are protected using JWT authentication.

Admin functionality includes:

- Authentication
- Profile management
- Portfolio management
- Resume upload
- Knowledge-base rebuilding

The knowledge-base rebuild endpoint is protected and is not exposed as a public operation.

---

# Chatbot Request Flow

A chatbot request follows this flow:

```text
User Question
      │
      ▼
Create / Retrieve Conversation
      │
      ▼
Generate Query Embedding
      │
      ▼
MongoDB Atlas Vector Search
      │
      ▼
Retrieve Relevant Portfolio Knowledge
      │
      ▼
Combine Retrieved Context
+ Conversation History
      │
      ▼
qwen3:4b
      │
      ▼
Generate Answer
      │
      ▼
Save Conversation
      │
      ▼
Return Response
```

The chatbot is specifically designed for portfolio-related questions.

It uses retrieved portfolio information as its primary source of information and is instructed not to invent personal details.

---

# Conversation History

The chatbot supports contextual follow-up questions.

For example:

```text
User:
Which projects use AI?

Assistant:
...

User:
What technologies are used in the first one?

Assistant:
...
```

Recent conversation messages are supplied to the language model so that follow-up questions can be interpreted in context.

---

# Resume

The portfolio provides direct access to the resume.

The resume URL is stored as part of the profile data and is also available through the public resume endpoint.

The configured resume file must be accessible to viewers.

For Google Drive-hosted resumes, the file should be shared with:

```text
Anyone with the link → Viewer
```

---

# Security

The project implements:

- JWT-based admin authentication
- HTTP-only authentication cookies
- Password hashing using bcrypt
- Protected admin routes
- Public read-only viewer routes
- Environment variables for secrets
- No credentials committed to the repository

The `.env` file is excluded from Git using `.gitignore`.

---

# Design Approach

The application separates the public portfolio experience from administrative functionality.

```text
                 ┌─────────────────┐
                 │ Public Visitor  │
                 └────────┬────────┘
                          │
                          ▼
                 ┌─────────────────┐
                 │ React Frontend  │
                 └────────┬────────┘
                          │
                          ▼
                 ┌─────────────────┐
                 │ Viewer REST API │
                 └────────┬────────┘
                          │
              ┌───────────┴───────────┐
              │                       │
              ▼                       ▼
       Portfolio Data             AI Chat
                                      │
                                      ▼
                                  RAG Pipeline
                                      │
                          ┌───────────┴───────────┐
                          ▼                       ▼
                    Vector Search            Ollama LLM
```

The AI chatbot is intentionally focused on the portfolio rather than functioning as a general-purpose assistant.

This keeps responses grounded in the available profile information.

---

# Local Evaluation

For a fresh local setup, follow these steps in order.

### 1. Clone the repository

```bash
git clone https://github.com/Mandeep717/Personal-Portfolio.git
cd Personal-Portfolio
```

### 2. Install dependencies

```bash
npm install
cd frontend
npm install
cd ..
```

### 3. Configure environment variables

Create `.env` in the project root:

```env
PORT=3000
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=replace_with_a_secure_secret
JWT_EXPIRES_IN=1d
NODE_ENV=development
OLLAMA_BASE_URL=http://localhost:11434
```

### 4. Start Ollama

Make sure Ollama is running and install the models:

```bash
ollama pull qwen3:4b
ollama pull embeddinggemma
```

### 5. Configure MongoDB Atlas Vector Search

Create:

```text
portfolio_index
```

with the 768-dimensional vector configuration described above.

### 6. Seed the database

```bash
npm run seed
```

### 7. Build the knowledge base

```bash
npm run rebuild-knowledge
```

### 8. Start the backend

```bash
npm start
```

### 9. Start the frontend

Open another terminal:

```bash
npm run dev
```

### 10. Open the application

```text
http://localhost:5173
```

---

# Example Chatbot Questions

The following questions can be used to test the chatbot:

```text
What is Mandeep's educational background?
```

```text
What projects has Mandeep worked on?
```

```text
What technologies were used in Dataset Intelligence Copilot?
```

```text
What is PAIMANA?
```

```text
What are Mandeep's coding profiles?
```

```text
What is Mandeep's GitHub profile?
```

```text
What are Mandeep's technical skills?
```

```text
Which project uses RAG?
```

Follow-up questions can also be tested:

```text
User:
Which projects use AI?

Assistant:
...

User:
What technologies are used in the first one?

Assistant:
...
```

---

# Key Implementation Highlights

### Profile-specific AI

The chatbot is not a generic AI assistant. Its knowledge is generated specifically from the portfolio's profile and project information.

### Retrieval-Augmented Generation

Relevant information is retrieved using vector similarity before generating the response.

### Local AI

The project uses Ollama for both embeddings and language-model inference, avoiding dependency on paid external LLM APIs during local execution.

### MongoDB Vector Search

MongoDB Atlas stores the knowledge embeddings and performs semantic retrieval.

### Contextual Conversations

The chatbot stores recent messages and uses them to understand follow-up questions.

### Protected Administration

Only authenticated administrators can modify portfolio information or rebuild the knowledge base.

---

# Future Improvements

Possible future improvements include:

- Cloud deployment
- Cloud-hosted LLM inference
- Streaming chatbot responses
- More advanced semantic retrieval
- Chatbot analytics
- Additional portfolio content management
- Automated knowledge-base updates after portfolio changes
- Improved conversation management

---

# Author

## Mandeep Boddu

**B.Tech Artificial Intelligence and Machine Learning Student**

VNR Vignana Jyothi Institute of Engineering & Technology

### GitHub

https://github.com/Mandeep717

### LinkedIn

https://www.linkedin.com/in/mandeep-boddu-6862183a

---

# License

This project is intended as a personal portfolio and technical project submission.
