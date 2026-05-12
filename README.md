# Grocery Booking Backend API

REST API built with Node.js, Express and MongoDB.

## Features

- JWT Authentication
- User Roles (Admin / Client)
- Product CRUD
- Order Management
- Protected Routes
- MongoDB Relations

## Tech Stack

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT
- bcryptjs

## Setup

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the server:

```bash
npm start
```

For development:

```bash
npm run dev
```

## API Routes

### Auth

```http
POST /api/auth/register
POST /api/auth/login
```

### Products

```http
GET /api/products
POST /api/products
PUT /api/products/:id
DELETE /api/products/:id
```

### Orders

```http
POST /api/orders
GET /api/orders/my-orders
GET /api/orders
PATCH /api/orders/:id/status
```
