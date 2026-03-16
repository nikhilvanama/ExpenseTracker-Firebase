# 💰 Modern Expense Tracker (Angular + Firebase)

A premium, **Modern Expense Tracker** application built with **Angular** and **Firebase**. This app features a high-end **Glassmorphism** design, real-time data persistence, and a sleek dark-themed interface.

![Modern Dashboard](file:///C:/Users/vanam/.gemini/antigravity/brain/f7086054-8cf5-4dbe-9020-77e0197c2e70/dashboard_verification_1773638917341.png)

## ✨ Modernized Features

- 🎭 **Glassmorphism UI**: Stunning transparent layouts with backdrop filters and subtle glow effects.
- 🎨 **Dark Theme Aesthetic**: Deep navy and indigo palette optimized for a premium feel.
- 🇮🇳 **Currency Localization**: Native support for Indian Rupee (₹).
- 🔄 **Latest-First Sorting**: Automated sorting to show recent expenses at the top.
- 🗑️ **Custom Confirmation Modal**: Replaced native alerts with a sleek, themed delete confirmation popup.
- ⚡ **Real-time Synchronization**: Powered by Firebase Realtime Database for instant updates.
- 🖋️ **Premium Typography**: Uses the modern "Outfit" typeface for superior readability.
- 🧩 **Lucide Icons**: Integrated high-quality vector icons for a polished look.

## 🛠️ Built With

- **Framework**: [Angular 20](https://angular.io/)
- **Database**: [Firebase Realtime Database](https://firebase.google.com/products/realtime-database)
- **Icons**: [Lucide Icons](https://lucide.dev/)
- **Styles**: Vanilla CSS with custom properties + Bootstrap Grid

## 📦 Folder Structure

```bash
src/
├── app/
│   ├── core/
│   │   ├── constants/ # Firebase Configuration
│   │   ├── models/    # Data Interfaces
│   │   └── services/  # Firebase CRUD Logic
│   ├── pages/
│   │   ├── expense/      # Dashboard Component
│   │   └── expense-form/ # Add/Edit Form Component
│   ├── app.component.ts  # Route Logic & Icon Loader
│   └── app.config.ts     # Global Config & Firebase Init
└── styles.css            # Global Glassmorphic Design System
```

## 🚀 Getting Started

### 1. Clone & Install
```bash
git clone https://github.com/nikhilvanama/ExpenseTracker-Firebase.git
cd ExpenseTracker-Firebase
npm install
```

### 2. Firebase Setup
1. Create a project in [Firebase Console](https://console.firebase.google.com/).
2. Enable **Realtime Database**.
3. Copy your config to `src/app/core/constants/constants.ts`:

```typescript
export const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_DOMAIN",
  databaseURL: "YOUR_DB_URL",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_BUCKET",
  messagingSenderId: "YOUR_MSG_ID",
  appId: "YOUR_APP_ID"
};
```

### 3. Run Development Server
```bash
ng serve
```
Navigate to `http://localhost:4200`

---
*Developed with focus on Modern Web Design Trends.*

