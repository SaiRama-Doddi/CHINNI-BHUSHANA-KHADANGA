import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

// Load env vars
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini Client
  const apiKey = process.env.GEMINI_API_KEY;
  let ai: GoogleGenAI | null = null;
  
  if (apiKey) {
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  } else {
    console.warn('⚠️ GEMINI_API_KEY environment variable is undefined. AI Chatbot queries will run in mock mode.');
  }

  // API router FIRST
  app.post('/api/gemini/chat', async (req, res) => {
    try {
      const { messages } = req.body;
      if (!messages || !Array.isArray(messages)) {
        res.status(400).json({ error: 'Messages array is required' });
        return;
      }

      // If no API key, return mock helpful recruiter responses so it doesn't crash
      if (!ai) {
        res.json({
          text: "Hello! I am Akash's AI Career Representative. I am currently operating in demo mode as the host server is awaiting API key provisioning. Akash is a Full-Stack developer highly skilled in React.js, Django, and Firebase. Let me know if you would like me to discuss his smart grievance portal implementation or certifications!",
        });
        return;
      }

      // Convert messages to contents format for generateContent
      const systemInstruction = `You are a world-class AI Career Representative representing "Akash Khadanga", a premium Full-Stack Developer.
      Your goal is to impress recruiters, managers, and potential clients exploring his portfolio.
      
      Always stay in character. Respond concisely, with premium professionalism, objective confidence, and clear typography. Use bolding properly for keywords, and use a conversational, helpful tone.
      
      Akash's Profile Specs:
      - Title: Full Stack Developer
      - Focus areas: Scalable Systems, Real-Time Web Apps, Premium Micro-interactions, Custom UI/UX
      - Core Tech Stack:
        - Frontend: React.js, Tailwind CSS (Mastery), Javascript, HTML5/CSS3
        - Backend: Python, Django REST API, Firebase Auth & Firestore, SQL (SQLite)
        - Tools: GitHub, Postman, VS Code, Git
      - Key Projects:
        1. **Smart Grievance & Issue Tracking System (Issue Resolve Hub)**: Full stack complaint platform. Built role-based logins, analytics dashboards, image uploads, real-time ticket status updates. Tech: React.js, Firebase, Firestore, Tailwind CSS. URL: https://issue-resolve-hub.vercel.app/admin, Github: https://github.com/AkashKhadanga/issue-resolve-hub.
        2. **Student Task Management System**: Advanced task tracker tool. Built REST CRUD endpoints, Axios payload wrappers, SQLite model indices. Tech: React.js, Django, Django REST APIs, Axios, SQLite database.
      - Career Core Strengths: Algorithmic problem solving, Data Structures and Algorithms (DSA), complex component structure modeling, fast visual debugger.
      - Awards:
        - 1st Prize — Cursors 2K26 Drawing Competition (Visual rendering logic mapping)
        - 1st Prize — Cursors 2K25 Drawing Competition (Hand-drawn computer graphics)
        - Innovex 2024 Hackathon participant (developed prototype issue tracking suite in tight sprint limits)
      - Certifications:
        - Python for Beginners (Coursera)
        - Introduction to SQL (Sololearn)
        - Introduction to Python (Infosys Springboard)
      - Location / Status: Available for full-time recruiter calls, remote placements, and premium freelance projects.
      
      If asked about contact details:
      - Email: akashkhadaanga123@gmail.com
      - Phone: +91-7207174517
      - Location: Palasa, Srikakulam, Andhra Pradesh
      - GitHub: https://github.com/AkashKhadanga/issue-resolve-hub
      - LinkedIn: https://www.linkedin.com/in/chinni-bhushana-khadanga-44a748312/
      - Project Live Admin Panel: https://issue-resolve-hub.vercel.app/admin
      
      Respond directly to the query. Keep it strictly focused on Akash's skills, qualifications, achievements, and capabilities. Do not invent details not specified here. If they ask generic questions, gracefully orient the response back to listing how Akash would solve that with full-stack Django/Firebase/React structures. Use markdown bullet points for structured summaries.`;

      // Translate client messages query array to Gemini format
      const lastMessage = messages[messages.length - 1];
      const modelPrompt = lastMessage.content;

      // Call generateContent with system instruction
      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: modelPrompt,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        },
      });

      res.json({ text: response.text });
    } catch (err: any) {
      console.error('Error on Gemini proxy call:', err);
      res.status(500).json({ error: err.message || 'An internal Server Error occurred' });
    }
  });

  // Serve static assets / Vite middle
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 [PORTFOLIO SERVER] Running smoothly on port ${PORT}`);
  });
}

startServer();
