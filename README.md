# Socket App

A real-time chat application built using React, Node.js, Express, and Socket.IO.  
It supports private messaging between users and room-based communication using WebSockets.

---

## Features

- Real-time messaging using Socket.IO
- Send private messages using Socket ID
- Join chat rooms for group communication

- Instant message broadcasting
- Lightweight and fast real-time communication

---

## Tech Stack

**Frontend:**

- React (Vite)
- Socket.IO Client
- JavaScript (ES6+)

**Backend:**

- Node.js
- Express.js
- Socket.IO
- CORS

---

## Project Structure

frontend/
└── socket-app/ → React frontend (Vite)

backend/
└── server.js → Express + Socket.IO backend

---

## Installation & Setup

### 1. Clone the repository

2. Backend Setup

Navigate to the backend directory and install dependencies:

```bash
cd backend
npm install
node server.js
```

The backend server will run at:

http://localhost:3002

Make sure the backend is running before starting the frontend.

3. Frontend Setup

Navigate to the frontend project directory and install dependencies:

```bash
cd frontend/socket-app
npm install
npm run dev
```

The development server will run at a local Vite port (default is):

http://localhost:5173
