# 🌍 Real-Time MERN Translation Chat Application

A real-time chat application built using the MERN stack (MongoDB, Express, React, Node.js) with automatic message translation based on the recipient's language preference. Break language barriers and chat seamlessly with anyone around the world!

---

## 🚀 Features

- 🔥 Real-time messaging using **Socket.io**
- 🌐 Automatic **language translation** of incoming messages
- 🗣️ User-specific language selection
- 🛡️ Secure authentication using **JWT**
- 🖥️ Responsive and clean **React.js** frontend
- ⚡ Scalable backend built with **Express.js** and **MongoDB**

---

## ⚙️ Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/Aahil56/Real-Time-MERN-Translation-Chat-Application.git
   cd Real-Time-MERN-Translation-Chat-Application
   ```

2. **Setup Backend**
   ```bash
   cd server
   npm install
   ```
   Create a `.env` file inside the server directory:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   TRANSLATION_API_KEY=your_translation_api_key
   TRANSLATION_API_URL=your_translation_api_url
   ```
   Start the backend server:
   ```bash
   npm run dev
   ```

3. **Setup Frontend**
   ```bash
   cd client
   npm install
   ```
   Create a `.env` file inside the client directory:
   ```env
   REACT_APP_SOCKET_SERVER_URL=http://localhost:5000
   REACT_APP_TRANSLATION_API_URL=your_translation_api_url
   REACT_APP_TRANSLATION_API_KEY=your_translation_api_key
   ```
   Start the frontend app:
   ```bash
   npm start
   ```

---

## 🧠 How It Works

### User Signup/Login:
- Users register or log in using email and password.
- Upon login, a JWT token is generated and used for authentication.

### Language Preference:
- Users select their preferred language from a list (e.g., English, Spanish, French).

### Sending Messages:
- When a user sends a message, it is first captured by the backend server.

### Translation:
- The backend automatically translates the message into the recipient's selected language using a Translation API.

### Real-Time Communication:
- The translated message is immediately emitted through Socket.io to the recipient in real-time.

### Receiving Messages:
- The recipient's chatbox shows the translated message without delay.

---

## 🎥 Demo

# Watch the Demo!
[![Watch the demo](https://img.youtube.com/vi/VjnDvlUj1Ls/maxresdefault.jpg)](https://www.youtube.com/watch?v=VjnDvlUj1Ls)

> 📌 Click the link to view the demo: [Watch the demo on YouTube](https://www.youtube.com/watch?v=VjnDvlUj1Ls)

---

## 🛠️ Tech Stack

- **Frontend:** React.js, Axios, Socket.io-client
- **Backend:** Node.js, Express.js, Socket.io
- **Database:** MongoDB (Mongoose)
- **Authentication:** JWT (JSON Web Tokens)
- **Translation API:** (Google Translate API / LibreTranslate / etc.)
- **Real-time Communication:** WebSockets via Socket.io

---

## 📂 Project Structure

```plaintext
├── client/            # React frontend
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── services/
│       └── App.js
├── server/            # Node.js + Express backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
├── package.json
└── README.md

