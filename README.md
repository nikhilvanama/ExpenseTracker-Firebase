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

## 🧠 How it Works

This application follows a clean, modular architecture:

### 1. Data Flow (The 'Engine')
- **`ExpenseService`**: Acts as a central hub for all database interactions. It uses `AngularFireList` to create a live connection to the `/expenses` path in Firebase.
- **Real-time Synchronization**: Instead of traditional API calls, the app uses `snapshotChanges()`. This means any change to the database (even from another browser tab) is instantly reflected in the UI.

### 2. Component Logic
- **`ExpenseComponent`**:
    - **Fetching**: On load, it subscribes to the service and maps the raw database "payload" into a usable TypeScript object list.
    - **Reverse Chronological Order**: It uses `array.unshift()` during data processing so the newest entries are always shown first.
    - **Custom State Management**: Manages its own modal system (`showDeleteModal`) to ensure the deletion flow feels smooth and integrated.
- **`ExpenseFormComponent`**:
    - **Reactive Core**: Built with `FormBuilder` to provide real-time validation (e.g., minimum character lengths).
    - **Hybrid Mode**: Detects URL parameters to switch between "Add New" and "Edit Existing" modes seamlessly.

### 3. Modern Design System
- **CSS Variables**: Centralized tokens for glassmorphism effects (backdrop-filters, border-opacity) ensure consistency.
- **Micro-interactions**: Subtle hover lifts and transitions are applied via `styles.css` to provide a premium user experience.

---

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

