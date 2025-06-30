# Chat.ly

Chat.ly is a full-stack real-time chat application built with React (frontend) and Node.js/Express (backend), using MongoDB for data storage. It supports user authentication, one-on-one and group chats, and user search functionality.

## Features

- User registration and login with JWT authentication
- Create one-on-one and group chats
- Search for users to start new chats
- Responsive UI built with Chakra UI
- Persistent user sessions
- Modern React with hooks and context API

## Tech Stack

- **Frontend:** React, Vite, Chakra UI, Axios, React Router
- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT, bcrypt
- **Other:** dotenv, morgan, cors

## Project Structure

```
.
├── client/        # React frontend
│   └── src/
│       ├── components/
│       ├── context/
│       ├── pages/
│       └── ...
├── server/        # Node.js backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── data/
│   └── ...
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- MongoDB database (local or Atlas)

### Setup

#### 1. Clone the repository

```sh
git clone https://github.com/yourusername/chatly.git
cd chatly
```

#### 2.Backend Setup

```sh
cd server
npm install
# Create a .env file based on .env.example and set your environment variables
npm start
```

#### 3.Frontend Setup

```sh
cd client
npm install
npm run dev
```

#### 4. Open in Browser

Visit http://localhost:5173 (or the port shown in your terminal).

## Environment Variables

Create a `.env` file in the `server/` directory with the following content:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
SECRET_JWT_KEY=your_jwt_secret
```

Replace the values with your your actual configuration.
