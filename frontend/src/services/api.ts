const API_URL = 'http://localhost:5000/api';

export interface User {
  id?: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface Message {
  id?: string;
  sender: string;
  recipient: string;
  subject: string;
  body: string;
  read?: boolean;
}

// User API
export const userApi = {
  getAll: async (): Promise<User[]> => {
    try {
      const response = await fetch(`${API_URL}/users`);
      if (!response.ok) throw new Error('Failed to get users');
      const jsonResponse = await response.json();
      const data = jsonResponse["data"];
      console.log(data);
      return Array.isArray(data) ? data : [];
    } catch (err) {
      console.error('Error fetching users:', err);
      return [];
    }
  },

  getById: async (id: string): Promise<User> => {
    const response = await fetch(`${API_URL}/users/${id}`);
    const jsonResponse = await response.json();
    const data = jsonResponse["data"];
    console.log(data);
    if (!response.ok) throw new Error(`Failed to get user with ID ${id}`);
    return data;
  },

  create: async (user: User): Promise<User> => {
    const response = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    });
    if (!response.ok) throw new Error('Failed to create user');
    return response.json();
  },

  update: async (id: string, user: User): Promise<User> => {
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    });
    if (!response.ok) throw new Error(`Failed to update user with ID ${id}`);
    return response.json();
  },

  delete: async (id: string): Promise<void> => {
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error(`Failed to delete user with ID ${id}`);
  }
};

// Message API
export const messageApi = {
  getAll: async (): Promise<Message[]> => {
    try {
      const response = await fetch(`${API_URL}/messages`);
      if (!response.ok) throw new Error('Failed to get messages');
      const jsonResponse = await response.json();
      const data = jsonResponse["data"];
      console.log(data);
      return Array.isArray(data) ? data : [];
    } catch (err) {
      console.error('Error fetching messages:', err);
      return [];
    }
  },

  getById: async (id: string): Promise<Message> => {
    const response = await fetch(`${API_URL}/messages/${id}`);
    if (!response.ok) throw new Error(`Failed to get message with ID ${id}`);
    return response.json();
  },

  getByRecipient: async (recipient: string): Promise<Message[]> => {
    try {
      const response = await fetch(`${API_URL}/messages/recipient/${recipient}`);
      if (!response.ok) throw new Error(`Failed to get messages for recipient ${recipient}`);
      const jsonResponse = await response.json();
      const data = jsonResponse["data"];
      console.log(data);
      return Array.isArray(data) ? data : [];
    } catch (err) {
      console.error('Error fetching messages by recipient:', err);
      return [];
    }
  },

  create: async (message: Message): Promise<Message> => {
    const response = await fetch(`${API_URL}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(message)
    });
    if (!response.ok) throw new Error('Failed to create message');
    return response.json();
  },

  update: async (id: string, message: Message): Promise<Message> => {
    const response = await fetch(`${API_URL}/messages/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(message)
    });
    if (!response.ok) throw new Error(`Failed to update message with ID ${id}`);
    return response.json();
  },

  delete: async (id: string): Promise<void> => {
    const response = await fetch(`${API_URL}/messages/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error(`Failed to delete message with ID ${id}`);
  }
}; 