# DuckMail Backend API

This is the backend API for the DuckMail application, built with Node.js, Express, TypeScript, and MongoDB.

## Setup

### Prerequisites

- Node.js (v14+)
- MongoDB (local or Atlas)

### Installation

1. Clone the repository
2. Navigate to the backend directory: `cd backend`
3. Install dependencies: `npm install`
4. Create a `.env` file in the root of the backend directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/duckmail
   NODE_ENV=development
   ```
   Adjust the MONGODB_URI as needed for your MongoDB setup.

### Development

To start the development server with hot-reload:

```
npm run dev
```

### Build and Production

To build the TypeScript project:

```
npm run build
```

To start the production server:

```
npm start
```

## API Endpoints

### Messages

- `GET /api/messages` - Get all messages
- `GET /api/messages/recipient/:recipient` - Get messages by recipient
- `GET /api/messages/:id` - Get a single message by ID
- `POST /api/messages` - Create a new message
- `PUT /api/messages/:id` - Update a message
- `DELETE /api/messages/:id` - Delete a message

### Users

- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get a single user by ID
- `POST /api/users` - Create a new user
- `PUT /api/users/:id` - Update a user
- `DELETE /api/users/:id` - Delete a user 