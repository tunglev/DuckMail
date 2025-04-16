/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';
import { User, userApi } from '../services/api';

const UserPanel = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<User>({
    username: '',
    email: '',
    firstName: '',
    lastName: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Load users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await userApi.getAll();
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      setError('Failed to fetch users: ' + (err instanceof Error ? err.message : String(err)));
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserById = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await userApi.getById(id);
      setSelectedUser(data);
      setFormData(data);
      setSuccess(`Successfully fetched user with ID: ${id}`);
    } catch (err) {
      setError('Failed to fetch user: ' + (err instanceof Error ? err.message : String(err)));
    } finally {
      setLoading(false);
    }
  };

  const handleSelectUser = (user: User) => {
    setSelectedUser(user);
    setFormData(user);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      //formdata to json
      console.log(JSON.stringify(formData));
      const newUser = await userApi.create(formData);
      setUsers([...users, newUser]);
      setSuccess('User created successfully!');
      resetForm();
    } catch (err) {
      setError('Failed to create user: ' + (err instanceof Error ? err.message : String(err)));
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser?.id) return;
    
    try {
      setLoading(true);
      setError(null);
      const updatedUser = await userApi.update(selectedUser.id, formData);
        setUsers(users.map(user => (user.id === selectedUser.id ? updatedUser : user)));
        setSelectedUser(updatedUser);
        setSuccess(`User with ID ${selectedUser.id} updated successfully!`);
    } catch (err) {
      setError('Failed to update user: ' + (err instanceof Error ? err.message : String(err)));
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await userApi.delete(id);
      setUsers(users.filter(user => user.id !== id));
      if (selectedUser?.id === id) {
        resetForm();
      }
      setSuccess(`User with ID ${id} deleted successfully!`);
    } catch (err) {
      setError('Failed to delete user: ' + (err instanceof Error ? err.message : String(err)));
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSelectedUser(null);
    setFormData({
      username: '',
      email: '',
      firstName: '',
      lastName: ''
    });
  };

  return (
    <div className="panel">
      <div className="section">
        <h2>User Management</h2>
        <div className="form-group">
          <button 
            className="button" 
            onClick={fetchUsers}
            disabled={loading}
          >
            Refresh Users
          </button>
        </div>

        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}
        
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <>
            <div className="section">
              <h3>Users List</h3>
              {!users || users.length === 0 ? (
                <p>No users found</p>
              ) : (
                <div>
                  {Array.isArray(users) && users.map(user => (
                    <div 
                      key={user.id} 
                      className={`card ${selectedUser?.id === user.id ? 'selected' : ''}`}
                      onClick={() => handleSelectUser(user)}
                    >
                      <p><strong>Username:</strong> {user.username}</p>
                      <p><strong>Email:</strong> {user.email}</p>
                      <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
                      <div>
                        <button 
                          className="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (user.id) fetchUserById(user.id);
                          }}
                        >
                          Get By ID
                        </button>
                        {user.id && (
                          <button 
                            className="button delete"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (user.id) handleDeleteUser(user.id);
                            }}
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserPanel; 