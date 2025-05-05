import { useState } from 'react'
import './App.css'
import UserPanel from './components/UserPanel'
import MessagePanel from './components/MessagePanel'
import AuthPanel from './components/AuthPanel'
import { AuthUser, authApi } from './services/api'

function App() {
  const [activeTab, setActiveTab] = useState<'users' | 'messages' | 'auth'>('users')
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null)

  const handleAuthChange = (user: AuthUser | null) => {
    setCurrentUser(user)
    if (user) {
      // If user logs in, switch to messages tab
      setActiveTab('messages')
    }
  }
  
  // Handle logout directly from header
  const handleLogout = () => {
    authApi.logout();
    setCurrentUser(null);
    setActiveTab('auth');
  }

  return (
    <div className="app-container">
      <header>
        <div className="header-content">
          <h1>DuckMail API Tester</h1>
          <div className="user-info">
            {currentUser ? (
              <div className="welcome-message">
                Welcome, {currentUser.firstName}!
                <button 
                  className="button auth-button"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            ) : (
              <button 
                className="button auth-button"
                onClick={() => setActiveTab('auth')}
              >
                Login / Register
              </button>
            )}
          </div>
        </div>
        <div className="tabs">
          <button 
            className={activeTab === 'users' ? 'active' : ''} 
            onClick={() => setActiveTab('users')}
          >
            Users
          </button>
          <button 
            className={activeTab === 'messages' ? 'active' : ''} 
            onClick={() => setActiveTab('messages')}
          >
            Messages
          </button>
          {activeTab === 'auth' && (
            <button 
              className="active"
              onClick={() => setActiveTab('auth')}
            >
              Authentication
            </button>
          )}
        </div>
      </header>
      
      <main>
        {activeTab === 'users' && <UserPanel />}
        {activeTab === 'messages' && <MessagePanel currentUser={currentUser} />}
        {activeTab === 'auth' && <AuthPanel onAuthChange={handleAuthChange} />}
      </main>
    </div>
  )
}

export default App
