# Library Management System

A scalable and modular Library Management System built with Node.js, Express.js, and MongoDB using the MVC architecture.

The system manages users, library materials, loans, reservations, and reviews with role-based workflows for Members, Librarians, and Managers.

---

# Features

## User Management
- Add / update / delete users
- Role-based system:
  - Member
  - Librarian
  - Manager
- Member profile support
- Librarian department support

## Material Management
Supports multiple material types:
- Books
- Magazines
- CDs
- Maps

Features:
- Add / update / delete materials
- Track available copies
- Store cover images
- Category filtering

## Loan System
- Borrow materials
- Return materials
- Cancel loans
- Fine calculation
- Loan status tracking
- Due date management

## Reservation System
- Reserve unavailable materials
- Queue priority handling
- Auto-cancel reservations
- Availability notifications

## Review System
- Rate materials (1–5)
- Add comments/reviews
- One review per member per material

---

# Tech Stack

## Backend
- Node.js
- Express.js

## Database
- MongoDB
- Mongoose

## Architecture
- MVC Pattern

## Other Tools
- Nodemon
- dotenv
- Morgan

---

# Project Structure

```bash
src/
│
├── controllers/
├── models/
├── routes/
├── middlewares/
├── utils/
├── config/
│
├── app.js
```

---

# API Endpoints

## Users
```http
GET    /api/v1/users
GET    /api/v1/users/:id
POST   /api/v1/users
PUT    /api/v1/users/:id
DELETE /api/v1/users/:id
```

## Materials
```http
GET    /api/v1/materials
GET    /api/v1/materials/:id
POST   /api/v1/materials
PUT    /api/v1/materials/:id
DELETE /api/v1/materials/:id
```

## Loans
```http
POST   /api/v1/loans
PUT    /api/v1/loans/return/:id
PUT    /api/v1/loans/cancel/:id
GET    /api/v1/loans
GET    /api/v1/status/loans/active
GET    /api/v1/status/loans/cancelled
GET    /api/v1/status/loans/overdue
GET    /api/v1/status/loans/paid
```

## Reservations
```http
POST   /api/v1/reservations
PUT    /api/v1/reservations/cancel/:id
GET    /api/v1/reservations
```

## Reviews
```http
POST   /api/v1/reviews
PUT    /api/v1/reviews/:id
DELETE /api/v1/reviews/:id
GET    /api/v1/reviews


```
# API Documentation

Postman Documentation:
https://documenter.getpostman.com/view/45221006/2sBXwmQDDy---

# Installation

## Clone Repository

```bash
git clone <https://github.com/mustafa93rashid/Library-Management-System>
```

## Install Dependencies

```bash
npm install
```

## Environment Variables

Create `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection
```

## Run Development Server

```bash
npm run watch
```

---

# Future Improvements

- Authentication & Authorization
- JWT Security
- Email Notifications
- Pagination & Filtering


---

# Author

Mustafa Rashid  
Computer Engineer & Full-Stack Developer
