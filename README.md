# 🚀 MatchMate – Backend (Node.js + Express + MongoDB)

Secure, scalable, and production-ready backend for the MatchMate platform.  
Handles authentication, user profiles, connection requests, and feed data using a clean MVC architecture.

---

## 🏅 Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB (Atlas)**
- **Mongoose**
- **JWT Authentication**
- **bcrypt Password Hashing**
- **Cookie-Parser (HTTP-only cookies)**
- **CORS**
- **Express Validator**

---

## ✨ Features

- 🔐 Secure JWT Authentication
- 🍪 HTTP-only Cookie Sessions
- 👤 User Profiles (edit, view)
- 🤝 Connection Requests (send, accept, ignore)
- 📨 Pending + Received requests
- 🔎 Feed (all users except blocked, self, connected)
- 🛡 Protected Routes with userAuth Middleware
- 📁 Structured MVC Folder Architecture

---

## 📚 Table of Contents

- [📦 Project Structure](#-project-structure)
- [🧰 API Endpoints](#-api-endpoints)
- [🔐 Authentication Flow](#-authentication-flow)
- [🗄 Database Models](#-database-models)
- [⚙️ Environment Variables](#-environment-variables)
- [🚀 Running the Server](#-running-the-server)
- [🏗 Architecture](#-architecture)
- [🧑‍💻 Author](#-author)
- [📄 License](#license)

---

# 📦 Project Structure

```bash
src/
├── config/
│ └── db.js
│
├── controllers/
│ └── (controller logic – neatly separated)
│
├── middlewares/
│ └── userAuth.middleware.js # JWT + Cookie auth
│
├── models/
│ ├── User.model.js # Users schema
│ └── ConnectionRequestModel.js # Requests schema
│
├── routes/
│ ├── auth.routes.js
│ ├── profile.routes.js
│ ├── request.routes.js
│ └── user.routes.js
│
├── utils/
│ ├── validateLoginData.js
│ ├── validateSignupData.js
│ ├── validateChangePassData.js
│
├── app.js
└── server.js

```

---

# 🧰 API Endpoints

## 🔐 **Authentication Routes**

**File:** `auth.routes.js`

| Method | Endpoint           | Description                  |
| ------ | ------------------ | ---------------------------- |
| POST   | `/signup`          | Create new user              |
| POST   | `/login`           | Login + set HTTP-only cookie |
| POST   | `/logout`          | Logout user (clear cookie)   |
| POST   | `/change-password` | Update password              |

---

## 👤 **Profile Routes**

**File:** `profile.routes.js`

| Method | Endpoint        | Description                 |
| ------ | --------------- | --------------------------- |
| GET    | `/profile/view` | View logged-in user profile |
| PUT    | `/profile/edit` | Update profile details      |

---

## 🤝 **Connection Request Routes**

**File:** `request.routes.js`

| Method | Endpoint                             | Description                     |
| ------ | ------------------------------------ | ------------------------------- |
| POST   | `/request/send/:status/:toUserId`    | Send request (`like`, `ignore`) |
| POST   | `/request/review/:status/:requestId` | Accept / Ignore request         |
| GET    | `/requests/pending`                  | Get pending & received requests |

---

## 👥 **User + Feed Routes**

**File:** `user.routes.js`

| Method | Endpoint       | Description                                      |
| ------ | -------------- | ------------------------------------------------ |
| GET    | `/feed`        | Fetch all users except self, connected, rejected |
| GET    | `/connections` | List all accepted connections                    |

---

# 🔐 Authentication Flow

```bash
● Client
    |
    v
● Login API
    |
    v
● Credentials verified
    |
    v
● Backend returns JWT inside HTTP-only cookie
    |
    v
● All protected APIs require cookie + userAuth middleware
```

### Why HTTP-only cookies?

- More secure than localStorage
- Protected from JS access (XSS safe)
- Auto-sent with every request

---

# 🗄 Database Models

## 👤 **User Model**

- Name, email, password
- Age, gender, about
- Location
- Matches, pending, ignored, accepted arrays

## 🔗 **ConnectionRequest Model**

- fromUserId
- toUserId
- status (`pending`, `accepted`, `ignored`)
- timestamps

---

# ⚙ Environment Variables

Create a `.env` file:

- MONGODB_URI=your_mongodb_connection_string
- JWT_SECRET=your_jwt_secret
- PORT=5000

---

## 1️⃣ Install dependencies

```bash
npm install
```

## 2️⃣ Start dev server

```bash
npm run dev
```

## 3️⃣ Production build (Vercel / Render)

```bash
npm start
```

# 🏗 Architecture

Frontend → Backend → Database
React → Express → MongoDB Atlas

Frontend:

- UI rendering
- Global state (Zustand)

Backend:

- Auth
- JWT cookies
- Request logic
- Feed filtering

Database:

- Users
- Requests

## 👨‍💻 Author

- Saikat Gharami
  GitHub: https://github.com/SaikatGharami2001
