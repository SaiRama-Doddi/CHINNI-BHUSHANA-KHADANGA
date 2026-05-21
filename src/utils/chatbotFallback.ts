export function getClientMockResponse(query: string): string {
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
