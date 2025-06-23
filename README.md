# 💰 Expense Tracker (Angular + Firebase)

A simple **Expense Tracker App** built using **Angular** that allows users to:

- Add expenses with `Title`, `Price`, and `Description`.
- Store data in **Firebase Realtime Database**.
- Display expense items as cards.
- Delete specific expense entries.

This project is ideal for beginners learning Angular, Firebase integration, and CRUD operations.


## 🔥 Features

- ✅ Add new expense.
- ✅ View list of expenses.
- ✅ Delete specific expense.
- 🔄 Real-time updates using Firebase Realtime Database.


## 🛠️ Built With

- [Angular](https://angular.io/)
- [Firebase Realtime Database](https://firebase.google.com/products/realtime-database)


## 📦 Folder Structure (Simplified)
```bash
src/
├── app/
│ ├── assets/ # Application Assets
│ ├── core/
│ ├── ├── constants/ # FirebaseConfig File
│ ├── ├── models/ # Define Interface
│ ├── ├── services/ # Global Services for CRUD Functions
│ ├── pages/ # Expense Card & Form components
│ └── app.config.ts

```

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone (https://github.com/nikhilvanama/ExpenseTracker-Firebase.git)
cd ExpenseTracker-Firebase
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Firebase
Go to Firebase Console

Create a project

Add Realtime Database and get config values

Replace the Firebase config in:

```bash
ts
// src/app/core/constants/constants.ts
export const firebaseConfig = {
  production: false,
  firebaseConfig: {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_DOMAIN",
    databaseURL: "YOUR_DB_URL",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_BUCKET",
    messagingSenderId: "YOUR_MSG_ID",
    appId: "YOUR_APP_ID"
  }
};
```

### 4. Run the App
```bash
ng serve
Navigate to: http://localhost:4200
```

🧹 Firebase Database Rules (Optional)
```bash
json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```
⚠️ For development only. Use proper auth rules for production.

