# Personal Portfolio & AI Assistant

A full-stack personal portfolio website with an integrated AI-powered chatbot that answers questions about the portfolio owner's profile, education, skills, projects, achievements, coding profiles, resume, and other portfolio information.

The chatbot uses a Retrieval-Augmented Generation (RAG) architecture with MongoDB Atlas Vector Search for semantic retrieval and Ollama for local embeddings and LLM inference.

---

## Overview

This project combines a personal portfolio website with an AI assistant that allows visitors to interact with the portfolio through natural-language questions.

The portfolio presents:

- About Me
- Education
- Skills
- Projects
- Experience
- Achievements
- Coding Profiles
- GitHub
- LinkedIn
- Resume
- Contact Information

The integrated chatbot can answer portfolio-specific questions such as:

- What are Mandeep's main areas of interest?
- What projects has Mandeep worked on?
- Tell me about the Dataset Intelligence Copilot.
- What technologies does he know?
- What is his educational background?
- Where can I find his coding profiles?
- What was the first project you mentioned?

The chatbot also supports follow-up questions by maintaining conversation history.

---

## Features

### Portfolio

- Responsive personal portfolio website
- Hero section with profile information
- About section
- Skills categorized by domain
- Education section
- Experience section
- Projects section
- Achievements section
- Coding profiles
- Social links
- Resume access
- Contact information
- Responsive navigation
- Mobile-friendly interface

### AI Chatbot

- Portfolio-specific AI assistant
- Natural-language question answering
- Retrieval-Augmented Generation (RAG)
- Semantic search using MongoDB Atlas Vector Search
- Local embeddings using Ollama
- Local LLM inference using Ollama
- Persistent conversations
- Follow-up questions using conversation history
- New conversation support
- Portfolio-grounded responses
- Avoids inventing information not present in the portfolio
- Redirects unrelated questions to portfolio-related topics

### Admin System

The application includes an authenticated admin system for managing portfolio information.

The administrator can:

- Log in securely
- Manage profile information
- Manage portfolio items
- Manage education
- Manage experience
- Manage projects
- Manage achievements
- Update the resume
- Rebuild the AI knowledge base

Public visitors do not require authentication.

---

# System Architecture

```text
                         ┌─────────────────────┐
                         │       Visitor       │
                         │                     │
                         │ Portfolio / Chatbot │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │   React Frontend    │
                         │   Vite + TypeScript │
                         └──────────┬──────────┘
                                    │
                              REST API Requests
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │   Express Backend   │
                         │       Node.js       │
                         └──────────┬──────────┘
                                    │
                    ┌───────────────┴────────────────┐
                    │                                │
                    ▼                                ▼
          ┌──────────────────┐             ┌──────────────────┐
          │   MongoDB Atlas  │             │      Ollama      │
          │                  │             │                  │
          │ Profile          │             │ embeddinggemma   │
          │ PortfolioItems   │             │ qwen3:4b         │
          │ Knowledge        │             │                  │
          │ Conversations    │             └────────┬─────────┘
          │ Admin            │                      │
          └────────┬─────────┘                      │
                   │                                │
                   │       Vector Search            │
                   └───────────────┬────────────────┘
                                   │
                                   ▼
                         ┌─────────────────────┐
                         │     RAG Pipeline    │
                         │                     │
                         │ Query Embedding     │
                         │ Vector Retrieval    │
                         │ Context + History   │
                         │ LLM Generation      │
                         └─────────────────────┘
```

---

# AI / RAG Architecture

The chatbot uses a Retrieval-Augmented Generation pipeline.

## Query Flow

```text
User Question
      │
      ▼
Generate Query Embedding
      │
      │ embeddinggemma
      ▼
MongoDB Atlas Vector Search
      │
      ▼
Retrieve Relevant Portfolio Knowledge
      │
      ├───────────────┐
      │               │
      ▼               ▼
Relevant Context   Conversation History
      │               │
      └───────┬───────┘
              ▼
          qwen3:4b
              │
              ▼
       Generated Answer
              │
              ▼
          User / UI
```

## Embedding Model

```text
embeddinggemma
```

The embedding model generates 768-dimensional vectors.

## LLM

```text
qwen3:4b
```

The model runs locally through Ollama.

## Vector Database

```text
MongoDB Atlas Vector Search
```

The vector search index is:

```text
portfolio_index
```

Vector configuration:

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

---

# Knowledge Base

The chatbot's knowledge base is generated from portfolio information stored in MongoDB.

The ingestion pipeline combines information from:

- Profile
- Contact information
- Social links
- Coding profiles
- Skills
- Resume
- Education
- Experience
- Projects
- Achievements

The combined content is split into smaller chunks and converted into embeddings.

These embeddings are stored in the MongoDB `Knowledge` collection and retrieved using MongoDB Atlas Vector Search.

The knowledge base should be rebuilt whenever the underlying portfolio information is significantly changed.

---

# Conversation Management

The chatbot supports multi-turn conversations.

When a user sends the first message without a conversation ID, the backend creates a new conversation and returns a `conversationId`.

Example request:

```json
{
  "query": "What are Mandeep's projects?"
}
```

Example response:

```json
{
  "success": true,
  "data": {
    "conversationId": "...",
    "answer": "..."
  }
}
```

Subsequent messages can use the returned conversation ID:

```json
{
  "conversationId": "...",
  "query": "What was the first project you mentioned?"
}
```

The backend retrieves the existing conversation and provides relevant conversation history to the LLM.

This allows interactions such as:

```text
User:
What are Mandeep's projects?

Assistant:
...

User:
What was the first project you mentioned?

Assistant:
...
```

---

# Technology Stack

## Frontend

- React
- TypeScript
- Vite
- CSS / utility-based styling

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- REST APIs

## AI / RAG

- LangChain
- Ollama
- embeddinggemma
- qwen3:4b
- MongoDB Atlas Vector Search

## Document Processing

- unpdf
- PDF text extraction

## Development Tools

- Git
- GitHub
- VS Code
- Postman
- MongoDB Atlas
- Ollama

---

# Project Structure

```text
Personal Portfolio/
│
├── Backend/
│   │
│   ├── API/
│   │   ├── admin.router.js
│   │   └── viewer.router.js
│   │
│   ├── Config/
│   │   └── database.js
│   │
│   ├── Middleware/
│   │   └── verify-token.middleware.js
│   │
│   ├── Model/
│   │   ├── admin.model.js
│   │   ├── conversation.model.js
│   │   ├── knowledge.model.js
│   │   ├── portfolio.model.js
│   │   └── profile.model.js
│   │
│   ├── Service/
│   │   ├── embedding.service.js
│   │   ├── knowledge-insertion.service.js
│   │   ├── llm.service.js
│   │   └── pdf-text-extraction.service.js
│   │
│   ├── package.json
│   └── ...
│
├── frontend/
│   │
│   ├── public/
│   │
│   ├── src/
│   │   ├── api/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── types/
│   │   ├── utils/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   │
│   ├── package.json
│   └── vite.config.ts
│
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

---

# Authentication & Authorization

The application separates public visitor access from authenticated administrative access.

## Public Users

Visitors do not need to log in.

They can:

- View the portfolio
- View projects
- View education
- View skills
- View achievements
- Access the resume
- Use the chatbot
- View contact information
- Access public social and coding profiles

## Admin

The administrator authenticates using JWT.

Protected admin routes use authentication middleware to verify the JWT token.

The admin can manage portfolio information and rebuild the chatbot knowledge base.

---

# API Endpoints

## Viewer APIs

Base path:

```text
/api/viewer
```

### Get Profile

```http
GET /api/viewer/profile
```

Returns public profile information.

### Get Portfolio Items

```http
GET /api/viewer/portfolios
```

Returns portfolio items such as education, experience, projects, and achievements.

### Get Portfolio Item

```http
GET /api/viewer/portfolios/:id
```

Returns a specific portfolio item.

### Get Contact Information

```http
GET /api/viewer/contact
```

Returns public contact information.

### Get Resume

```http
GET /api/viewer/resume
```

Returns the public resume URL and filename.

### Chat

```http
POST /api/viewer/chat
```

Example request:

```json
{
  "query": "What are Mandeep's main areas of interest?"
}
```

For an existing conversation:

```json
{
  "conversationId": "conversation_id",
  "query": "Tell me more about that project."
}
```

---

# Admin APIs

Base path:

```text
/api/admin
```

## Authentication

```http
POST /api/admin/auth/login
POST /api/admin/auth/logout
GET /api/admin/auth/me
```

## Profile

```http
POST /api/admin/profile
GET /api/admin/profiles
PUT /api/admin/profile
```

## Portfolio

```http
POST /api/admin/portfolios
GET /api/admin/portfolios/:id
PUT /api/admin/portfolios/:id
DELETE /api/admin/portfolios/:id
```

## Resume

```http
PUT /api/admin/resume
```

The resume endpoint extracts text from the uploaded PDF using `unpdf`.

## Knowledge Base

```http
POST /api/admin/knowledge/rebuild
```

This rebuilds the chatbot knowledge base using the latest portfolio information.

---

# MongoDB Atlas

The application uses MongoDB Atlas as its database.

The main collections used by the application are:

```text
admins
profiles
portfolioitems
knowledge
conversations
```

The `Knowledge` collection stores embedded portfolio content used by the chatbot.

MongoDB Atlas Vector Search retrieves semantically relevant information for each chatbot query.

## Existing Database

The project is configured to use an existing MongoDB Atlas database containing the required portfolio data and chatbot knowledge base.

The evaluator should provide the MongoDB Atlas connection string through the `MONGODB_URI` environment variable.

The database should contain the required portfolio data and the `portfolio_index` Vector Search index.

---

# Prerequisites

Before running the project, install the following:

## Node.js

Node.js is required for the backend and frontend.

Recommended:

```text
Node.js 20+
```

Verify:

```bash
node --version
npm --version
```

## MongoDB Atlas

A MongoDB Atlas database is required.

The application connects to Atlas through:

```text
MONGODB_URI
```

## Ollama

Install Ollama from:

https://ollama.com/

Verify the installation:

```bash
ollama --version
```

---

# Ollama Setup

Pull the required models:

```bash
ollama pull qwen3:4b
```

```bash
ollama pull embeddinggemma
```

Verify:

```bash
ollama list
```

Both models should be available:

```text
qwen3:4b
embeddinggemma
```

The application expects Ollama to be available at:

```text
http://localhost:11434
```

This can be changed using the `OLLAMA_BASE_URL` environment variable.

---

# Environment Variables

Environment variables containing credentials and secrets are intentionally excluded from the repository.

Create a `.env` file using `.env.example` as a reference.

Example:

```env
PORT=3000

MONGODB_URI=your_mongodb_atlas_connection_string

JWT_SECRET=replace_with_a_secure_secret
JWT_EXPIRES_IN=1d

NODE_ENV=development

OLLAMA_BASE_URL=http://localhost:11434
```

## Important

Do not commit the following to GitHub:

```text
.env
```

Only the example configuration should be committed:

```text
.env.example
```

Never expose:

- MongoDB passwords
- JWT secrets
- API keys
- Admin credentials
- Other private environment variables

---

# MongoDB Atlas Configuration

The application uses an existing MongoDB Atlas database containing the portfolio data and chatbot knowledge base.

The required collections include:

```text
profiles
portfolioitems
knowledge
admins
conversations
```

The Vector Search index must be configured as:

```text
Index Name:
portfolio_index
```

Vector field:

```text
Path:
embedding
```

Dimensions:

```text
768
```

Similarity:

```text
cosine
```

Example index definition:

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

The evaluator should use the provided MongoDB Atlas connection details when running the project.

---

# Running the Project

## 1. Clone the Repository

```bash
git clone <repository-url>
```

Move into the project directory:

```bash
cd "Personal Portfolio"
```

---

## 2. Install Backend Dependencies

From the project root:

```bash
npm install
```

---

## 3. Install Frontend Dependencies

```bash
cd frontend
npm install
```

Return to the project root:

```bash
cd ..
```

---

## 4. Configure Environment Variables

Create:

```text
.env
```

using:

```text
.env.example
```

as a reference.

Add the required MongoDB Atlas connection string and other configuration values.

---

## 5. Start Ollama

Make sure Ollama is running and the required models have been downloaded:

```bash
ollama list
```

Required:

```text
qwen3:4b
embeddinggemma
```

---

## 6. Start the Backend

From the project root:

```bash
npm start
```

The backend will start on the configured port.

For example:

```text
http://localhost:3000
```

---

## 7. Start the Frontend

Open another terminal:

```bash
cd frontend
npm run dev
```

Vite will provide the local frontend URL.

Typically:

```text
http://localhost:5173
```

Open the displayed URL in a browser.

---

# Knowledge Base Rebuilding

The knowledge base should be rebuilt whenever the portfolio information changes significantly.

The admin API provides:

```http
POST /api/admin/knowledge/rebuild
```

The process is:

```text
MongoDB Portfolio Data
        ↓
Knowledge Generation
        ↓
Text Chunking
        ↓
Embedding Generation
        ↓
Knowledge Collection
        ↓
MongoDB Atlas Vector Search
```

The existing evaluation database already contains the required knowledge data, so rebuilding is only necessary after changing the underlying portfolio information.

---

# Resume Handling

The portfolio includes a publicly accessible resume.

The resume workflow is:

```text
Resume PDF
    ↓
Admin Upload
    ↓
unpdf
    ↓
Text Extraction
    ↓
MongoDB
    ↓
Knowledge Ingestion
    ↓
Chatbot
```

The public resume endpoint exposes the resume URL and filename.

The extracted resume text is used internally as part of the chatbot knowledge base.

---

# Security Considerations

The following information should never be committed to GitHub:

- MongoDB credentials
- JWT secrets
- API keys
- Admin passwords
- Private environment variables

The `.gitignore` file excludes environment files and dependencies from version control.

Admin authentication is protected using JWT-based authorization.

Public users do not have access to administrative routes.

The public profile response does not expose the extracted resume text.

---

# Testing the Application

After starting the application, verify the main portfolio sections:

```text
[ ] Hero
[ ] About
[ ] Skills
[ ] Education
[ ] Experience
[ ] Projects
[ ] Achievements
[ ] Coding Profiles
[ ] Resume
[ ] Contact
[ ] GitHub
[ ] LinkedIn
```

## Test the Chatbot

Try:

```text
What are Mandeep's main areas of interest?
```

```text
What projects has Mandeep worked on?
```

```text
Tell me about the Dataset Intelligence Copilot.
```

```text
What technologies does he use?
```

```text
What is his educational background?
```

## Test Conversation Context

First ask:

```text
What are Mandeep's projects?
```

Then ask:

```text
What was the first project you mentioned?
```

The second question should use the existing conversation context.

---

# Responsive Design

The frontend is designed for:

- Desktop
- Laptop
- Tablet
- Mobile

The navigation, portfolio sections, project cards, resume section, and chatbot interface adapt to different screen sizes.

---

# Project Objective

The objective of this project is to build a personal portfolio that goes beyond a conventional static website by integrating an AI assistant capable of answering portfolio-specific questions.

Instead of requiring visitors to manually navigate through multiple sections, the chatbot provides a conversational interface to the same information contained within the portfolio.

The project demonstrates the integration of:

- Full-stack web development
- REST APIs
- Authentication
- MongoDB
- Vector databases
- Embeddings
- Retrieval-Augmented Generation
- Local LLM inference
- PDF processing
- Conversational AI

---

# Future Improvements

Potential future improvements include:

- Cloud-based LLM deployment
- Streaming chatbot responses
- Advanced conversation management
- Chatbot usage analytics
- Automated deployment
- Improved semantic retrieval and ranking
- More advanced document ingestion
- Additional portfolio management functionality

These improvements are outside the scope of the current implementation.

---

# Author

## Mandeep Boddu

**B.Tech Artificial Intelligence and Machine Learning Student**

VNR Vignana Jyothi Institute of Engineering & Technology

### Profiles

- GitHub: https://github.com/Mandeep717
- LinkedIn: https://www.linkedin.com/in/mandeep-boddu-6862183a5
- CodeChef: https://www.codechef.com/users/rag_bass_82
- LeetCode: https://leetcode.com/u/Manfooty_17
- Codeforces: https://codeforces.com/profile/ManB717

---

# License

This project is intended as a personal portfolio and academic/technical project.
