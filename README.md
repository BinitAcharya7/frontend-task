# 📝 Frontend Tasks

![Node.js](https://img.shields.io/badge/Node.js-20.19.6-green) ![React](https://img.shields.io/badge/React-18.2.0-blue) ![License](https://img.shields.io/badge/License-MIT-yellow)

A full-stack task management system with authentication, profile management, and a modern React UI.  
Includes JWT access & refresh token authentication, CRUD operations for user profiles, search, pagination, and global state management with Zustand.

---

## 🚀 Features

### Backend
- **User Authentication**
  - Register new users
  - Login with email & password
  - JWT access token (15 min expiry)
  - JWT refresh token (7 days expiry)
  - Refresh access token endpoint
  - Logout endpoint (invalidate refresh token)
- **Profiles Management**
  - List profiles with pagination and search
  - Create, Update, Delete profiles
  - Profile fields: `name`, `email`, `phone`, `address`, `dob`
  - JWT-protected endpoints
- **API Documentation**
  - Swagger UI available at `/api-docs`
  - Complete request & response examples

### Frontend
- **React + Zustand**
- **Authentication**
  - Simple Register & Login forms
  - Access token stored in global state
- **Profiles Dashboard**
  - Display profiles in cards
  - Pagination with next/prev buttons
  - Global search for filtering profiles
  - Create, edit, and delete profiles
- **State Management**
  - Global state using **Zustand**
  - Handles user info, tokens, profiles, search term, and pagination

---

## 🛠 Tech Stack

| Layer       | Technology                      |
|------------ |--------------------------------|
| Backend     | Node.js, Express.js, JWT, Swagger, dotenv, CORS |
| Frontend    | React.js, Axios, Zustand, Tailwind CSS |
| Database    | In-memory (demo)               |

---

## 📁 Project Structure
