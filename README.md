🧠 Episodic-Term Memory AI Agent (STM)

A memory-aware AI assistant that can store, recall, and reason over episodic user memories while avoiding hallucinations.
Built with React, Node.js, MongoDB, and a Python LangGraph agent.

🚀 What This Project Is

This project implements a real episodic memory system for an AI agent — not just a chat history.

The agent can:

Remember stable facts about a user (name, habits, interests)

Decide what should be stored as memory

Recall past memories when relevant

Refuse to invent personal details (hallucination-safe)

Separate general knowledge from personal memory

❌ What This Project Is NOT

❌ Not a simple chatbot

❌ Not just saving messages to a database

❌ Not a prompt-only memory trick

This is a designed memory architecture.

🧩 Core Features
🧠 Episodic Memory (STM)

Extracts stable user facts from conversation

Classifies memory as:

profile

habit

interest

goal

Stores memory with vector embeddings

🔍 Memory Recall

Retrieves past episodes per user

Passes memory context back to the agent

Prevents hallucinated personal facts

🤖 Grounded AI Agent

Uses LangGraph + Groq LLM

Strict system prompt to control behavior

Answers general knowledge freely

Uses memory only for personal facts

🌐 Full-Stack Architecture

Frontend: React + Tailwind (chat UI)

Backend: Express + MongoDB

Agent: Python LangGraph

Embeddings: Xenova/all-MiniLM-L6-v2

Bridge: Node ↔ Python via spawn

🏗️ Architecture Overview
User Message
   ↓
Frontend (React)
   ↓
Backend (Express)
   ↓
Embed Text (once)
   ↓
Store Episode (MongoDB)
   ↓
Recall Past Episodes
   ↓
Python LangGraph Agent
   ↓
Grounded AI Response
🧠 Memory Design Philosophy
Separation of Concerns
Type	Source	Rules
General knowledge	LLM	Allowed
Personal facts	Memory	Must exist
Unknown personal info	—	Refuse

This prevents:

Hallucinations

Fake personalization

Incorrect assumptions

📦 Example Episodic Memory
{
  "summary": "User goes to the gym five days a week",
  "episodeType": "interest",
  "tags": ["fitness", "gym"],
  "importance": 0.7
}
🧪 Example Conversation

User: Hello, I am Nani
→ Stored as profile
User: What is my name?
→ “You told me your name is Nani.”
🛠️ Tech Stack
Frontend

React

Tailwind CSS

Axios

Backend

Node.js

Express

MongoDB (Atlas-ready)

Mongoose

AI / Agent

Python

LangGraph

LangChain

Groq LLM

Embeddings

@xenova/transformers

all-MiniLM-L6-v2

⚙️ Setup Instructions
1️⃣ Clone Repository
git clone https://github.com/your-username/stm-ai-agent.git
cd stm-ai-agent
cd backend
npm install
npm run dev
3️⃣ Python Agent Setup
cd backend
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
4️⃣ Frontend Setup
cd frontend
npm install
npm run dev
🔐 Environment Variables
Backend .env
MONGODB_URI=your_mongodb_url
Python .env
GROQ_API_KEY=your_groq_key
🚧 Current Limitations

Short-Term Memory only (STM)

No memory decay yet

No LTM promotion

No vector similarity search (yet)
🔮 Planned Improvements

STM → LTM promotion

Memory decay & importance scoring

MongoDB Atlas $vectorSearch

Gym & nutrition personal agent

Streaming responses

Mobile-first UI
🎯 Why This Project Matters

This project demonstrates:

AI system design

Memory architecture

Hallucination control

Full-stack AI integration

Real debugging and reasoning skills

It is designed, not hacked together.
🙋‍♂️ Author

Nani
Aspiring AI Engineer & Full-Stack Developer
Focused on agent systems, memory, and reasoning AI

⭐ Final Note

This project is a foundation, not a demo.
It is meant to evolve into a real personal AI assistant.
