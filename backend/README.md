# DuckMail Backend API

This is the backend API for DuckMail, a simple email application.

## Getting Started

1. Clone the repository
2. Install dependencies with `npm install`
3. Start the development server with `npm run dev`

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
PORT=5000
MONGODB_URI=your-mongodb-connection-string
NODE_ENV=development
```

## MongoDB Atlas Setup

1. Create a MongoDB Atlas account if you don't already have one
2. Create a new cluster
3. Whitelist your IP address:
   - Navigate to "Network Access" in the left sidebar
   - Click "Add IP Address"
   - Add your current IP address or use "Allow Access from Anywhere" (0.0.0.0/0) for development
   - Click "Confirm"
4. Create a database user:
   - Navigate to "Database Access" in the left sidebar
   - Click "Add New Database User"
   - Create a username and password
   - Select appropriate permissions (e.g., "Read and Write to Any Database")
   - Click "Add User"
5. Get your connection string:
   - Click "Connect" on your cluster
   - Select "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user's password
   - Add the connection string to your `.env` file

## API Endpoints

### Users

- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get a single user by ID
- `POST /api/users` - Create a new user
- `PUT /api/users/:id` - Update a user
- `DELETE /api/users/:id` - Delete a user

### Messages

- `GET /api/messages` - Get all messages
- `GET /api/messages/recipient/:recipient` - Get messages by recipient
- `GET /api/messages/:id` - Get a single message by ID
- `POST /api/messages` - Create a new message
- `PUT /api/messages/:id` - Update a message
- `DELETE /api/messages/:id` - Delete a message

## Using Postman with the API

### Setting Up Postman Collection

1. Download and install [Postman](https://www.postman.com/downloads/)
2. Create a new Collection named "DuckMail API"
3. Set up a collection variable:
   - Click on the collection → Variables
   - Add a variable named `baseUrl` with the value `http://localhost:5000/api`

### Testing Endpoints

#### Create a User

1. Create a new POST request
2. URL: `{{baseUrl}}/users`
3. Body: Select "raw" and "JSON"
4. Enter JSON data:
```json
{
  "email": "test@example.com",
  "username": "testuser",
  "firstName": "Test",
  "lastName": "User"
}
```
5. Click Send

#### Retrieve All Users

1. Create a new GET request
2. URL: `{{baseUrl}}/users`
3. Click Send

#### Create a Message

1. Create a new POST request
2. URL: `{{baseUrl}}/messages`
3. Body: Select "raw" and "JSON"
4. Enter JSON data:
```json
{
  "sender": "test@example.com",
  "recipient": "user@example.com",
  "subject": "Hello",
  "body": "This is a test message"
}
```
5. Click Send

#### Get Messages by Recipient

1. Create a new GET request
2. URL: `{{baseUrl}}/messages/recipient/user@example.com`
3. Click Send

## MongoDB Integration

The API is integrated with MongoDB using Mongoose. The database connection is established in `index.ts` and models are defined in the `models` directory.

### Data Models

#### User

```typescript
{
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
}
```

#### Message

```typescript
{
  sender: string;
  recipient: string;
  subject: string;
  body: string;
  isRead: boolean;
  isStarred: boolean;
  isArchived: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

## Troubleshooting

### MongoDB Connection Issues

If you encounter SSL/TLS errors or cannot connect to the MongoDB Atlas cluster:

1. Make sure your IP address is whitelisted in MongoDB Atlas:
   - Go to Network Access in MongoDB Atlas
   - Add your current IP address or use 0.0.0.0/0 for development

2. Check that your connection string is correct in the .env file

3. Ensure you're using the correct username and password in your connection string 