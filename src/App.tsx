import { useState } from 'react';
import { useChatApp } from './context/ChatAppContext';
import Navbar from './components/Navbar';
import CreateAccount from './components/CreateAccount';
import UserList from './components/UserList';
import ChatBox from './components/ChatBox';

function App() {
  const { account, username, error } = useChatApp();
  const [selectedUser, setSelectedUser] = useState(null);

  if (!account) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
        <Navbar />
        <div className="flex items-center justify-center min-h-[calc(100vh-64px)] p-4">
          <div className="w-full max-w-md p-8 text-center bg-white shadow-2xl rounded-2xl">
            <h2 className="mb-4 text-3xl font-bold text-gray-800">
              Welcome to Decentralized Chat
            </h2>
            <p className="mb-6 text-gray-600">
              Connect your MetaMask wallet to start chatting on the blockchain
            </p>
            {error && (
              <div className="px-4 py-3 mb-4 text-red-700 border border-red-200 rounded-lg bg-red-50">
                {error}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (!username) {
    return (
      <div>
        <Navbar />
        <CreateAccount />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />

      {error && (
        <div className="p-4 text-red-700 border-l-4 border-red-500 bg-red-50">
          <p>{error}</p>
        </div>
      )}

      <div className="flex flex-1 overflow-hidden">
        <UserList onSelectUser={setSelectedUser} selectedUser={selectedUser} />
        <ChatBox selectedUser={selectedUser} />
      </div>
    </div>
  );
}

export default App;
