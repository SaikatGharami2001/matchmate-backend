# 🚀 MatchMate Backend

MatchMate is a full-stack matchmaking platform designed to connect users through real-time interactions, profile management, and secure authentication.  
This repository contains the **Node.js + Express** backend powered by **MongoDB**, **JWT authentication**, and **secure HTTP-only cookies**.

---

## 🔗 Live API (Production)

Base URL: https://matchmate-backend-nzyc.onrender.com

Example endpoints:

- **POST** `/signup`
- **POST** `/login`
- **GET** `/profile`
- **POST** `/update-profile`  
  _(More endpoints listed below)_

---

## 🛠️ Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB (Mongoose)**
- **Zustand (Frontend Store)**
- **JWT Authentication**
- **HTTP-Only Cookies**
- **CORS Configured for Production**
- **Render Deployment**

---

## 📁 Project Structure

src/
├── config/
│ └── db.js
├── controllers/
│ ├── auth.controller.js
│ └── profile.controller.js
├── middlewares/
│ └── auth.middleware.js
├── models/
│ └── User.model.js
├── routes/
│ ├── auth.routes.js
│ └── profile.routes.js
└── server.js

---

## ⚙️ Environment Variables

Create a `.env` file in the project root:

MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000

---

## 🚀 Getting Started (Local Development)

### 1. Clone the repo

git clone https://github.com/YOUR_USERNAME/matchmate-backend.git

### 2. Install dependencies

npm install

### 3. Start the backend

npm run dev

Server runs at: http://localhost:5000

---

## 🔐 Authentication Flow

### ✔ Login

- Validates email + password
- Generates JWT
- Sends token as **HTTP-only cookie**
- Protects all authenticated routes

### ✔ Signup

- Registers user
- Hashes password using bcrypt
- Stores user in MongoDB

---

## 🔥 API Routes

### **Auth Routes**

| Method | Endpoint  | Description              |
| ------ | --------- | ------------------------ |
| POST   | `/signup` | Register user            |
| POST   | `/login`  | Login user & set cookies |

### **Profile Routes**

| Method | Endpoint          | Description            |
| ------ | ----------------- | ---------------------- |
| GET    | `/profile`        | Get logged-in user     |
| POST   | `/update-profile` | Update profile details |

---

## 🧪 Postman / Thunder Client

All routes use **Cookie-Based Authentication**.  
Make sure to enable:

Send Cookies -> YES
Allow Redirects -> YES

---

## 🌐 Deployment (Render)

The project is deployed on **Render** and configured with:

- Auto deploy on every push
- Production CORS for Vercel frontend
- Environment variables stored securely

---

## 🤝 Contributing

Pull requests are welcome.  
For major changes, open an issue first to discuss improvements.

---

## 📄 License

MIT License.

---

### ⭐ If you like this project, give the repo a star!
