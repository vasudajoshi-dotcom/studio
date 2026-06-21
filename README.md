
# SkillSphere AI | Career Architect & Learning Hub

SkillSphere AI is a production-ready AI-powered professional platform combining personalized career roadmaps, a course marketplace, skill gap analysis, and networking into one unified experience.

## 🚀 Deployment Guide

This application is built with Next.js 15, Tailwind CSS, and Firebase.

### 1. Prerequisites
- Node.js (v20+)
- A Firebase Project (Google Cloud Console)
- Enabled Firebase Services:
  - **Authentication** (Email/Password)
  - **Firestore Database** (Test Mode or Production Rules)
  - **Storage** (for thumbnails and uploads)
  - **Hosting** (for the public URL)

### 2. Environment Setup
Create a `.env.local` file in the root directory and add your credentials:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 3. Local Development
```bash
npm install
npm run dev
```

### 4. Production Build & Deployment
To deploy to Firebase Hosting:
```bash
# Build the application
npm run build

# Install Firebase CLI if you haven't
npm install -g firebase-tools

# Login and Initialize
firebase login
firebase init hosting

# Deploy
firebase deploy --only hosting
```

### 5. Accessing the Platform
- **Public URL**: `https://skillsphere-ai-6fb80.web.app` (Example based on your project ID)
- **Email Verification**: Users must verify their email before accessing the dashboard. Check your inbox (including spam) after signup.

## 🛠 Features
- **AI Career Architect**: Personalized growth roadmaps.
- **Skill Gap Analysis**: Market-driven intelligence for target roles.
- **Course Marketplace**: Enroll in premium courses.
- **Networking Hub**: Connect with professionals based on AI matches.
- **Credit System**: Earn points for learning activity.
- **Global Leaderboard**: Compete with peers globally.

## 📱 Cross-Browser Support
Fully optimized for:
- Google Chrome (Latest)
- Microsoft Edge
- Safari (iOS & MacOS)
- Firefox
- Mobile Responsive (iOS/Android)
