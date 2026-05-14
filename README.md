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
ADMIN_NAME=Admin
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your_admin_password
```

Start the server:

```bash
npm start
```

For development:

```bash
npm run dev
```

Create the first admin user:

```bash
npm run seed:admin
```

The seed script creates an admin only if one does not already exist with the configured admin email.

## Authentication

Protected routes require a Bearer token:

```http
Authorization: Bearer your_jwt_token
```

New users created with `POST /api/auth/register` are always created with:

```json
{
  "role": "client"
}
```

Admin users should be created with the seed script, not through normal registration.

## API Routes

### Auth

```http
POST /api/auth/register        Public
POST /api/auth/login           Public
GET  /api/auth/profile         Authenticated user
```

Login response includes the token and user role:

```json
{
  "token": "jwt_token",
  "user": {
    "id": "user_id",
    "name": "User Name",
    "email": "user@example.com",
    "role": "client"
  }
}
```

### Products

```http
GET    /api/products           Public
GET    /api/products/:id       Public
POST   /api/products           Admin only
PUT    /api/products/:id       Admin only
PATCH  /api/products/:id       Admin only
DELETE /api/products/:id       Admin only
```

Product update accepts any of these fields:

```json
{
  "name": "Apples",
  "price": 2.5,
  "category": "Fruit",
  "image": "https://example.com/apple.jpg",
  "description": "Fresh apples",
  "stock": 20,
  "available": true
}
```

`available` is saved as the product `isAvailable` field.

### Orders

```http
POST  /api/orders              Authenticated user
GET   /api/orders/my-orders    Authenticated user
GET   /api/orders              Admin only
PATCH /api/orders/:id/status   Admin only
PATCH /api/orders/:id          Admin only
PUT   /api/orders/:id          Admin only
```

Order status values:

```txt
pending
confirmed
ready
completed
cancelled
```

Update order status example:

```json
{
  "status": "confirmed"
}
```

## Roles And Permissions

### Client

- Register and login
- View products
- Create orders
- View own orders

### Admin

- Login
- Create, update and delete products
- View all orders
- Update order status
