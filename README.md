# 💰 Expense Tracker (Angular + Firebase)

A simple **Expense Tracker App** built using **Angular** that allows users to:

- Add expenses with `Title`, `Price`, and `Description`.
- Store data in **Firebase Realtime Database**.
- Display expense items as cards.
- Delete specific expense entries.

This project is ideal for beginners learning Angular, Firebase integration, and CRUD operations.

---

## 🔥 Features

- ✅ Add new expense
- ✅ View list of expenses
- ✅ Delete specific expense
- 🔄 Real-time updates using Firebase Realtime Database

---

## 🛠️ Built With

- [Angular](https://angular.io/)
- [Firebase Realtime Database](https://firebase.google.com/products/realtime-database)

---

## 📦 Folder Structure (Simplified)

src/
├── app/
│ ├── components/ # Expense Card & Form components
│ ├── services/ # Firebase service for DB operations
│ ├── models/ # Expense model (interface)
│ └── app.module.ts
├── environments/ # Firebase config

yaml
Copy
Edit

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/expense-tracker-angular.git
cd expense-tracker-angular
2. Install Dependencies
bash
Copy
Edit
npm install
3. Setup Firebase
Go to Firebase Console

Create a project

Add Realtime Database and get config values

Replace the Firebase config in:

ts
Copy
Edit
// src/environments/environment.ts
export const environment = {
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
4. Run the App
bash
Copy
Edit
ng serve
Navigate to: http://localhost:4200

🧹 Firebase Database Rules (Optional)
json
Copy
Edit
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
⚠️ For development only. Use proper auth rules for production.

