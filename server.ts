import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

// Resolve paths safely in both ESM and CJS environments
const resolvedFilename = typeof __filename !== 'undefined' ? __filename : fileURLToPath(import.meta.url);
const resolvedDirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(resolvedFilename);

// Load env vars from .env.local first, then fall back to .env
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

function getMockResponse(query: string): string {
  const normalized = query.toLowerCase();

  // Contact details
  if (
    normalized.includes('contact') || 
    normalized.includes('email') || 
    normalized.includes('phone') || 
    normalized.includes('call') || 
    normalized.includes('reach') ||
    normalized.includes('linkedin') ||
    normalized.includes('github') ||
    normalized.includes('address') ||
    normalized.includes('location')
  ) {
    return `Here are the contact details for **Akash Khadanga**:

- **Email**: akashkhadaanga123@gmail.com
- **Phone**: +91-7207174517
- **Location**: Palasa, Srikakulam, Andhra Pradesh, India
- **LinkedIn**: https://www.linkedin.com/in/chinni-bhushana-khadanga-44a748312/
- **GitHub**: https://github.com/AkashKhadanga/issue-resolve-hub

Feel free to reach out to schedule an interview or discuss a project!`;
  }

  // Tech stack / Skills
  if (
    normalized.includes('stack') || 
    normalized.includes('skill') || 
    normalized.includes('tech') || 
    normalized.includes('django') || 
    normalized.includes('react') || 
    normalized.includes('firebase') || 
    normalized.includes('python') || 
    normalized.includes('frontend') || 
    normalized.includes('backend') ||
    normalized.includes('developer') ||
    normalized.includes('experience')
  ) {
    return `**Akash Khadanga** is an accomplished Full-Stack Developer with expertise in:

- **Frontend Development**: React.js, Tailwind CSS, JavaScript (ES6+), HTML5/CSS3. He specializes in creating highly interactive and premium user interfaces with custom animations.
- **Backend & Database**: Python, Django, Django REST Framework, Firebase Auth & Firestore, SQL (SQLite). He specializes in scalable REST APIs, role-based access control, and real-time database syncing.
- **Tools & Workflow**: Git, GitHub, VS Code, Postman.
- **Key Strengths**: Algorithmic problem solving, Data Structures and Algorithms (DSA), complex component state modeling, and rapid visual debugging.`;
  }

  // Projects
  if (
    normalized.includes('project') || 
    normalized.includes('grievance') || 
    normalized.includes('issue') || 
    normalized.includes('task') || 
    normalized.includes('resolve') || 
    normalized.includes('portfolio') ||
    normalized.includes('hub')
  ) {
    return `Here are the flagship projects developed by **Akash Khadanga**:

1. **Smart Grievance & Issue Tracking System (Issue Resolve Hub)**
   - **Description**: A full-stack complaint and ticket-management platform with role-based logins, analytics dashboards, image uploads, and real-time ticket status updates.
   - **Tech Stack**: React.js, Firebase Auth, Cloud Firestore, Tailwind CSS.
   - **Links**: Live Admin Panel: https://issue-resolve-hub.vercel.app/admin | GitHub: https://github.com/AkashKhadanga/issue-resolve-hub

2. **Student Task Management System**
   - **Description**: An advanced task tracker tool featuring CRUD REST endpoints, custom Axios payload wrappers, and database model optimization.
   - **Tech Stack**: React.js, Django, Django REST Framework, SQLite.`;
  }

  // Certifications / Awards
  if (
    normalized.includes('certif') || 
    normalized.includes('award') || 
    normalized.includes('competition') || 
    normalized.includes('prize') || 
    normalized.includes('drawing') || 
    normalized.includes('hackathon') ||
    normalized.includes('innovex') ||
    normalized.includes('cursors')
  ) {
    return `Here are **Akash Khadanga's** accomplishments and certificates:

- **Certifications**:
  - *Python for Beginners* (Coursera)
  - *Introduction to SQL* (Sololearn)
  - *Introduction to Python* (Infosys Springboard)
- **Competition Awards**:
  - **1st Prize** — Cursors 2K26 Drawing Competition (Visual rendering logic mapping)
  - **1st Prize** — Cursors 2K25 Drawing Competition (Hand-drawn computer graphics)
- **Hackathons**:
  - *Innovex 2024 Participant* — Designed and built a prototype issue-tracking suite within tight sprint constraints.`;
  }

  // Default response - friendly representative introduction
  return `Hello! I am Akash's AI Career Representative.

I can answer questions regarding his:
- **Core Tech Stack** (React.js, Django, Firebase, Python, SQL)
- **Key Projects** (Smart Grievance Portal - Issue Resolve Hub, Student Task Tracker)
- **Awards & Certifications** (Cursors drawing contest awards, Python/SQL credentials)
- **Contact Details** (Email, Phone, LinkedIn, GitHub)

Akash is a Full-Stack developer who enjoys building robust, high-performance web applications with premium designs. What would you like to know?`;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini Client
  const apiKey = process.env.GEMINI_API_KEY;
  const isPlaceholderKey = !apiKey || 
    apiKey.trim() === '' || 
    apiKey.includes('MY_GEMINI_API_KEY') || 
    apiKey.includes('YOUR_GEMINI_API_KEY');

  let ai: GoogleGenAI | null = null;
  
  if (apiKey && !isPlaceholderKey) {
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
    console.log('✅ GEMINI_API_KEY loaded successfully. AI Chatbot is connected to Gemini API.');
  } else {
    console.warn('⚠️ GEMINI_API_KEY environment variable is undefined or set to a placeholder. AI Chatbot queries will run in mock mode.');
  }

  // API router FIRST
  app.post('/api/gemini/chat', async (req, res) => {
    try {
      const { messages } = req.body;
      if (!messages || !Array.isArray(messages)) {
        res.status(400).json({ error: 'Messages array is required' });
        return;
      }

      const lastMessage = messages[messages.length - 1];
      const modelPrompt = lastMessage ? lastMessage.content : '';

      // If no API key, return mock helpful recruiter responses so it doesn't crash
      if (!ai) {
        const mockText = getMockResponse(modelPrompt);
        res.json({ text: mockText });
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

      let responseText = '';
      try {
        // Call generateContent with system instruction
        const response = await ai.models.generateContent({
          model: 'gemini-3.5-flash',
          contents: modelPrompt,
          config: {
            systemInstruction: systemInstruction,
            temperature: 0.7,
          },
        });
        responseText = response.text || '';
      } catch (err: any) {
        console.error('⚠️ Error on Gemini API call, falling back to mock response:', err);
        responseText = getMockResponse(modelPrompt);
      }

      res.json({ text: responseText });
    } catch (err: any) {
      console.error('Error on Gemini proxy call:', err);
      res.status(500).json({ error: err.message || 'An internal Server Error occurred' });
    }
  });

  app.post('/api/contact', async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;
      if (!name || !email || !message) {
        res.status(400).json({ error: 'Name, email, and message are required fields' });
        return;
      }

      const smtpHost = process.env.SMTP_HOST;
      const smtpPort = process.env.SMTP_PORT;
      const smtpUser = process.env.SMTP_USER;
      const smtpPass = process.env.SMTP_PASS;

      if (!smtpHost || !smtpPort || !smtpUser || !smtpPass) {
        console.warn('⚠️ SMTP environment variables are not fully configured. Email was not sent.');
        res.status(503).json({ 
          error: 'Email service is not configured on the server. Please set SMTP_HOST, SMTP_PORT, SMTP_USER, and SMTP_PASS environment variables.' 
        });
        return;
      }

      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: parseInt(smtpPort, 10),
        secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports (e.g. 587)
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      const mailOptions = {
        from: `"${name}" <${smtpUser}>`, // sender address
        replyTo: email, // reply-to address
        to: 'akashkhadaanga123@gmail.com', // list of receivers
        subject: `Portfolio Contact: ${subject || 'No Subject'}`, // Subject line
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`, // plain text body
        html: `
          <div style="font-family: sans-serif; padding: 20px; color: #1e293b; background-color: #f8fafc; border-radius: 8px;">
            <h2 style="color: #2563eb; margin-top: 0;">New Portfolio Message Received</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Subject:</strong> ${subject || 'N/A'}</p>
            <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
            <p style="white-space: pre-wrap; font-size: 14px; line-height: 1.6;">${message}</p>
          </div>
        `,
      };

      await transporter.sendMail(mailOptions);
      console.log(`✉️ Email from ${email} sent successfully to akashkhadaanga123@gmail.com`);
      res.json({ success: true, message: 'Message sent successfully!' });
    } catch (err: any) {
      console.error('Error sending email:', err);
      res.status(500).json({ error: err.message || 'An error occurred while sending the email' });
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
