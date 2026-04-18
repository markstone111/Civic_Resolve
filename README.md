# 🏙️ CivicResolve

CivicResolve is an AI-powered, cross-platform mobile application designed to bridge the communication gap between citizens and municipal authorities. By combining real-time issue reporting with a robust offline-capable disaster management system, CivicResolve empowers communities to build safer, more responsive neighborhoods.

---

## ✨ Key Features

### 🧠 Smart Issue Reporting & AI Triage

Frictionless Capture: Citizens can easily report local issues using native camera integration and precise GPS tagging.

Direct AI Analysis: Integrated directly with the Google Gemini Vision API to analyze uploaded photos, automatically categorize the issue, and assign a real-time Severity Score (1-10) to prioritize municipal response.

### 🗺️ Interactive Live Mapping

Real-Time Data Sync: Powered by Firebase onSnapshot listeners, the citizen dashboard instantly reflects pending, active, and resolved issue counts.

Severity Visualization: A full-screen interactive map (react-native-maps) plots civic issues using color-coded markers based on AI severity (🔴 High: 8-10, 🟠 Medium: 4-7, 🟢 Low: 1-3).

### 🚨 Disaster Resilience & Offline Mode

Real-Time Crisis Alerts: Utilizes a Supabase WebSocket subscription to instantly trigger a global "Disaster Mode" banner across all active devices during emergencies.

Emergency Relief Mapping: Dynamically overlays critical relief locations (medical camps, shelters, food and water distribution centers) onto the community map.

Zero-Connectivity Resilience: During network outages, the app bypasses cloud AI processing to conserve battery and bandwidth. Reports are queued locally using AsyncStorage and can be synced to the cloud via the Dashboard once connectivity is restored.

### 👷 Role-Based Workflows

Dynamic Routing: Secure authentication and role management (Firebase Auth & Firestore) dynamically routes users to distinct interfaces:

Citizen Dashboard: For community reporting and tracking.

Field Worker Dashboard: Features a proximity/priority-filtered task list and a photo-based verification system to close out resolved issues.

### 🌍 Built for the Community

Native Localization: fully integrated with react-i18next to provide accessible user experiences in English, Khasi, and Garo.

---


## 🛠️ Technology Stack

- Framework: React Native / Expo

- Navigation: Expo Router (File-based routing)

- Backend & Auth: Firebase (Authentication, Firestore)

- Real-Time Database (Emergency): Supabase (PostgreSQL, WebSockets)

- Artificial Intelligence: Google Gemini Vision API

- Mapping: react-native-maps

- Local Caching: @react-native-async-storage/async-storage

---

## 📂 Architecture Overview

The app leverages a modern Expo Router file-based architecture for clean separation of concerns and robust deep linking capabilities:
```text
├── app/
│   ├── _layout.tsx           # Global Providers (AuthContext, DisasterContext)
│   ├── (citizen-tabs)/       # Citizen Routes: Dashboard, Report, Map View
│   └── (worker-tabs)/        # Field Worker Routes: Task List, Resolution Verification
├── src/
│   ├── context/              # State management for User Roles & Disaster Mode
│   ├── services/             # API services (e.g., geminiService.ts)
│   ├── supabaseClient.ts     # Supabase initialization & web-socket setup
│   └── components/           # Reusable UI elements & thematic styling
```
---

## 🚀 Installation & Setup

1. Clone the Repository

git clone [https://github.com/yourusername/civicresolve.git](https://github.com/markstone111/Civic_Resolve.git)
cd civicresolve


2. Install Dependencies
```bash
npm install
```
### or
```bash
yarn install
```

3. Environment Configuration

Create a .env file in the root directory and add your required API keys:

### Firebase Configuration
```bash
EXPO_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
```
### Supabase Configuration
```bash
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```
### Gemini AI Configuration
```bash
EXPO_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
```

4. Run the Application
```bash
npx expo start
```

- Use the Expo Go app on your mobile device to scan the QR code, or press i / a to open in an iOS Simulator or Android Emulator.

---

## 💡 Usage Guide & Testing

- Role Emulation: All new signups default to the "citizen" role. To test the Field Worker module, manually update the role field in your Firestore users collection to "fieldworker".

- Testing AI: Submit a photo of a pothole or broken streetlight to see the Gemini Vision API dynamically assign a severity score in the app.

- Testing Disaster Mode: In your Supabase project, toggle the is_active boolean in the disaster_control table to instantly broadcast the emergency UI state to the app.

- Developed with a focus on scalable architecture, user accessibility, and resilient civic infrastructure.
