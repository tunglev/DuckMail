/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';
import { Message, messageApi, authApi, AuthUser } from '../services/api';

interface MessagePanelProps {
  currentUser?: AuthUser | null;
}

const MessagePanel = ({ currentUser }: MessagePanelProps = {}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [formData, setFormData] = useState<Message>({
    sender: '',
    recipient: '',
    subject: '',
    body: '',
    read: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [searchRecipient, setSearchRecipient] = useState('');

  // Get current user on component mount if not provided through props
  useEffect(() => {
    const user = currentUser || authApi.getCurrentUser();
    if (user?.username) {
      // Initialize sender field with current user's username
      setFormData(prev => ({
        ...prev,
        sender: user.username
      }));
    }
    fetchUserMessages();
  }, [currentUser]);

  // Fetch messages where the current user is sender or recipient
  const fetchUserMessages = async () => {
    try {
      setLoading(true);
      setError(null);
      const user = currentUser || authApi.getCurrentUser();
      
      if (!user) {
        setError("Please log in to view messages");
        setMessages([]);
        setLoading(false);
        return;
      }
      
      // Use the new endpoint to fetch user's messages
      const data = await messageApi.getByRecipient(user.email);
      setMessages(Array.isArray(data) ? data : []);
    } catch (err) {
      setError('Failed to fetch messages: ' + (err instanceof Error ? err.message : String(err)));
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  // Original fetchMessages function is kept for admin purposes
  const fetchMessages = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await messageApi.getAll();
      setMessages(Array.isArray(data) ? data : []);
    } catch (err) {
      setError('Failed to fetch messages: ' + (err instanceof Error ? err.message : String(err)));
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessageById = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await messageApi.getById(id);
      setSelectedMessage(data);
      setFormData(data);
      setSuccess(`Successfully fetched message with ID: ${id}`);
    } catch (err) {
      setError('Failed to fetch message: ' + (err instanceof Error ? err.message : String(err)));
    } finally {
      setLoading(false);
    }
  };

  const fetchMessagesByRecipient = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchRecipient) return;
    
    try {
      setLoading(true);
      setError(null);
      const data = await messageApi.getByRecipient(searchRecipient);
      setMessages(Array.isArray(data) ? data : []);
      setSuccess(`Found ${Array.isArray(data) ? data.length : 0} message(s) for recipient: ${searchRecipient}`);
    } catch (err) {
      setError('Failed to fetch messages by recipient: ' + (err instanceof Error ? err.message : String(err)));
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectMessage = (message: Message) => {
    setSelectedMessage(message);
    setFormData(message);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleCreateMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      
      // Ensure sender is the current user
      const user = currentUser || authApi.getCurrentUser();
      if (!user) {
        setError("Please log in to send messages");
        setLoading(false);
        return;
      }
      
      // Force set sender to current user's username
      const messageToSend = {
        ...formData,
        sender: user.username
      };
      
      const newMessage = await messageApi.create(messageToSend);
      setMessages([...messages, newMessage]);
      setSuccess('Message created successfully!');
      resetForm();
    } catch (err) {
      setError('Failed to create message: ' + (err instanceof Error ? err.message : String(err)));
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMessage?.id) return;
    
    try {
      setLoading(true);
      setError(null);
      const updatedMessage = await messageApi.update(selectedMessage.id, formData);
      setMessages(messages.map(message => (message.id === selectedMessage.id ? updatedMessage : message)));
      setSelectedMessage(updatedMessage);
      setSuccess(`Message with ID ${selectedMessage.id} updated successfully!`);
    } catch (err) {
      setError('Failed to update message: ' + (err instanceof Error ? err.message : String(err)));
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMessage = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await messageApi.delete(id);
      setMessages(messages.filter(message => message.id !== id));
      if (selectedMessage?.id === id) {
        resetForm();
      }
      setSuccess(`Message with ID ${id} deleted successfully!`);
    } catch (err) {
      setError('Failed to delete message: ' + (err instanceof Error ? err.message : String(err)));
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSelectedMessage(null);
    const user = currentUser || authApi.getCurrentUser();
    setFormData({
      sender: user?.username || '',
      recipient: '',
      subject: '',
      body: '',
      read: false
    });
  };

  return (
    <div className="panel">
      <div className="section">
        <h2>Message Management</h2>
        <div className="form-group" style={{ display: 'flex', gap: '10px' }}>
          <button 
            className="button" 
            onClick={fetchUserMessages}
            disabled={loading}
          >
            Refresh My Messages
          </button>
        </div>

        <div className="section">
          <h3>Find Messages by Recipient</h3>
          <form onSubmit={fetchMessagesByRecipient} style={{ display: 'flex', gap: '10px' }}>
            <div className="form-group" style={{ flex: 1 }}>
              <input
                type="text"
                placeholder="Recipient username"
                value={searchRecipient}
                onChange={(e) => setSearchRecipient(e.target.value)}
                required
              />
            </div>
            <button 
              type="submit" 
              className="button"
              disabled={loading || !searchRecipient}
            >
              Search
            </button>
          </form>
        </div>

        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}
        
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <>
            <div className="section">
              <h3>My Messages</h3>
              {!messages || messages.length === 0 ? (
                <p>No messages found</p>
              ) : (
                <div>
                  {Array.isArray(messages) && messages.map(message => (
                    <div 
                      key={message.id} 
                      className={`card ${selectedMessage?.id === message.id ? 'selected' : ''}`}
                      onClick={() => handleSelectMessage(message)}
                    >
                      <p><strong>From:</strong> {message.sender}</p>
                      <p><strong>To:</strong> {message.recipient}</p>
                      <p><strong>Subject:</strong> {message.subject}</p>
                      <p><strong>Read:</strong> {message.read ? 'Yes' : 'No'}</p>
                      <div>
                        <button 
                          className="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (message.id) fetchMessageById(message.id);
                          }}
                        >
                          Get By ID
                        </button>
                        {message.id && (
                          <button 
                            className="button delete"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (message.id) handleDeleteMessage(message.id);
                            }}
                            style={{ marginLeft: '10px' }}
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

            <div className="section">
              <h3>{selectedMessage ? 'Update Message' : 'Compose New Message'}</h3>
              <form onSubmit={selectedMessage ? handleUpdateMessage : handleCreateMessage}>
                <div className="form-group">
                  <label htmlFor="sender">Sender</label>
                  <input
                    type="text"
                    id="sender"
                    name="sender"
                    value={formData.sender}
                    onChange={handleInputChange}
                    disabled={!selectedMessage} // Disable editing for new messages
                    required
                  />
                  {!selectedMessage && (
                    <small>Sender is automatically set to your username</small>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="recipient">Recipient</label>
                  <input
                    type="text"
                    id="recipient"
                    name="recipient"
                    value={formData.recipient}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="body">Body</label>
                  <textarea
                    id="body"
                    name="body"
                    value={formData.body}
                    onChange={handleInputChange}
                    rows={5}
                    required
                  />
                </div>
                <div className="form-group">
                  <label style={{ display: 'flex', alignItems: 'center' }}>
                    <input
                      type="checkbox"
                      name="read"
                      checked={formData.read}
                      onChange={handleInputChange}
                      style={{ width: 'auto', marginRight: '10px' }}
                    />
                    Mark as Read
                  </label>
                </div>
                <div className="form-group">
                  <button type="submit" className="button" disabled={loading}>
                    {selectedMessage ? 'Update Message' : 'Send Message'}
                  </button>
                  {selectedMessage && (
                    <button
                      type="button"
                      className="button"
                      onClick={resetForm}
                      style={{ marginLeft: '10px' }}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MessagePanel;