# SkillSphere AI | Career Architect & Learning Hub

SkillSphere AI is a production-ready AI-powered professional platform.

## 🚀 Deployment Guide

### 1. Firebase Setup
- Enable **Authentication** (Email/Password).
- Create a **Firestore Database** (Production mode).
- Create a **Firebase Storage** bucket.

### 2. Environment Variables
Add these to `.env.local`:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyC_wYnsn7utdj5bBdbUU-xre_LYpLgqo8U
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=skillsphere-ai-6fb80.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=skillsphere-ai-6fb80
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=skillsphere-ai-6fb80.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=431930510367
NEXT_PUBLIC_FIREBASE_APP_ID=1:431930510367:web:79e3856dde05f9beee592a
```

### 3. Deploy to Firebase Hosting
```bash
# Build
npm run build

# Login & Deploy
firebase login
firebase init hosting
firebase deploy --only hosting
```

## 🛠 Features
- **AI Career Architect**: Personalized growth roadmaps.
- **Skill Gap Analysis**: Market-driven intelligence.
- **Verified Profiles**: Real user data sync.
- **Global Leaderboard**: Fetching live user stats.

## 📱 Cross-Browser Support
Optimized for Chrome, Edge, Safari, and Firefox. Fully responsive across mobile, tablet, and desktop.