import { useState } from 'react'
import './App.css'
import UserPanel from './components/UserPanel'
import MessagePanel from './components/MessagePanel'

function App() {
  const [activeTab, setActiveTab] = useState<'users' | 'messages'>('users')

  return (
    <div className="app-container">
      <header>
        <h1>DuckMail API Tester</h1>
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
        </div>
      </header>
      
      <main>
        {activeTab === 'users' ? <UserPanel /> : <MessagePanel />}
      </main>
    </div>
  )
}

export default App
