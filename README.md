# Stepify Admin Dashboard 👨‍💼👟

The **Stepify Admin Dashboard** is a powerful web-based control panel built with **React.js** that enables administrators to manage users, sneakers, orders, and categories for the Stepify mobile app.

---

## 🚀 Features

- 🔐 Admin Login with secure authentication
- 👟 Product Management (Add, Edit, Delete)
- 🧑‍💼 User Management (View & Ban users)
- 🛒 Order Management (View & Update orders)
- 🗂️ Category Management
- 📊 Dashboard Analytics (Revenue, Orders, Users)
- ☁️ Cloudinary Integration for Image Upload
- 🌐 Multi-language Support (EN, AR, ES, DE)
- 🎨 Clean & Responsive UI with TailwindCSS

---

## 🛠️ Tech Stack

| Tech         | Usage                     |
|--------------|----------------------------|
| **React.js** | Frontend Framework         |
| **React Router** | Client-side routing    |
| **Redux Toolkit / Zustand** | State Management |
| **Axios**    | API Requests               |
| **Firebase / Express.js** | Backend Services |
| **Cloudinary** | Image Storage            |
| **TailwindCSS / Material UI** | Styling      |

---

## 📁 Project Structure

stepify-admin/
├── public/
├── src/
│ ├── components/ # Reusable UI components
│ ├── pages/ # Page-level components (Dashboard, Login, etc.)
│ ├── features/ # Feature modules (Products, Users, etc.)
│ ├── services/ # API calls
│ ├── hooks/ # Custom hooks
│ ├── utils/ # Helper functions
│ ├── assets/ # Icons, Images
│ ├── App.jsx
│ └── main.jsx
└── package.json

---

## 📦 Installation & Setup

```bash
git clone https://github.com/your-username/stepify-admin.git
cd stepify-admin
npm install
npm run dev