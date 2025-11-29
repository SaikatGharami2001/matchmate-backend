<div align="center">

# 🚀 MatchMate – Backend (Node.js + Express + MongoDB)

A secure, production-ready backend powering the MatchMate social connection platform.  
Handles authentication, profiles, connection requests, and feed logic using a clean MVC architecture.

</div>

---

# 📚 Table of Contents

- [🏅 Tech Stack](#-tech-stack)
- [✨ Features](#-features)
- [📦 Project Structure](#-project-structure)
- [🧰 API Endpoints](#-api-endpoints)
- [📥 Sample API Requests](#-sample-api-requests)
- [⚠️ Error Handling & Edge Cases](#️-error-handling--edge-cases)
- [🗄 Database Models](#-database-models)
- [⚙️ Environment Variables](#️-environment-variables)
- [🚀 Running the Server](#-running-the-server)
- [🧪 Tests (Example)](#-tests-example)
- [🏗 Architecture](#-architecture)
- [🛠 Roadmap](#-roadmap)
- [🧑‍💻 Author](#-author)
- [📄 License](#license)

---

# 🏅 Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB (Atlas)**
- **Mongoose**
- **JWT Authentication**
- **bcrypt Password Hashing**
- **Cookie-Parser** (HTTP-only cookies)
- **CORS**
- **Express Validator**

---

# ✨ Features

- 🔐 Secure JWT login system (HTTP-only cookies)
- 👤 User registration, login, logout, password update
- 📄 Profile view + edit
- 🤝 Request system: send, accept, reject
- 📥 Pending + Received requests
- 🔎 Feed logic (smart filtering)
- 🛡 Protected routes using middleware
- 📁 Proper MVC structure

---

# 📦 Project Structure

```bash
src/
├── config/
│ └── db.js
│
├── controllers/
│ └── (business logic)
│
├── middlewares/
│ └── userAuth.middleware.js
│
├── models/
│ ├── User.model.js
│ └── ConnectionRequestModel.js
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
│ └── validateChangePassData.js
│
├── app.js
└── server.js
```

---

# 🧰 API Endpoints

## 🔐 Authentication (`auth.routes.js`)

| Method | Endpoint           | Description        |
| ------ | ------------------ | ------------------ |
| POST   | `/signup`          | Create user        |
| POST   | `/login`           | Login + set cookie |
| POST   | `/logout`          | Clear cookie       |
| POST   | `/change-password` | Update password    |

---

## 👤 Profile (`profile.routes.js`)

| Method | Endpoint        | Description        |
| ------ | --------------- | ------------------ |
| GET    | `/profile/view` | Get logged-in user |
| PUT    | `/profile/edit` | Edit user profile  |

---

## 🤝 Connection Requests (`request.routes.js`)

| Method | Endpoint                             | Description          |
| ------ | ------------------------------------ | -------------------- |
| POST   | `/request/send/:status/:toUserId`    | Send request         |
| POST   | `/request/review/:status/:requestId` | Accept / Ignore      |
| GET    | `/requests/pending`                  | Get pending requests |

---

## 👥 Users + Feed (`user.routes.js`)

| Method | Endpoint       | Description              |
| ------ | -------------- | ------------------------ |
| GET    | `/feed`        | Get user feed            |
| GET    | `/connections` | Get accepted connections |

---

# 📥 Sample API Requests

## 🔐 Login

```bash
curl -X POST http://localhost:5000/login \
-H "Content-Type: application/json" \
-d '{ "email": "test@example.com", "password": "123456" }'
```

# 🤝 Send Connection Request

```bash
POST /request/send/like/67a1f9c9c1339b1824a275a1
```

- Response:

```bash

{
  "message": "Request sent",
  "status": "pending"
}

```

# 📥 Review Request

```bash

POST /request/review/accepted/67a1ffb9a0b29a48cc1c29a9

```

# 🔎 Get Feed

```bash

GET /feed

```

- Sample Response:

```bash
[
  {
    "_id": "67a1fe...",
    "name": "Rohan",
    "age": 23,
    "about": "I love coding."
  }
]
```

# ⚠️ Error Handling & Edge Cases

-Invalid login → 400 Bad Request
-Missing token → 401 Unauthorized
-Duplicate email → 409 Conflict
-Sending request to yourself → 400
-Already accepted/ignored request → safe-handled
-Feed excludes:
--yourself
--accepted users
--ignored users
--pending users
