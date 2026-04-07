import React from 'react';
import { useChatApp } from '../context/ChatAppContext';
import { MessageCircle, Wallet } from 'lucide-react';

const Navbar = () => {
  const { account, username, connectWallet, loading } = useChatApp();

  const shortenAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <MessageCircle className="w-8 h-8" />
            <h1 className="text-2xl font-bold">Decentralized Chat</h1>
          </div>

          <div className="flex items-center space-x-4">
            {username && (
              <div className="bg-blue-500 px-4 py-2 rounded-lg">
                <span className="font-semibold">{username}</span>
              </div>
            )}

            {account ? (
              <div className="flex items-center bg-blue-800 px-4 py-2 rounded-lg">
                <Wallet className="w-5 h-5 mr-2" />
                <span className="font-mono">{shortenAddress(account)}</span>
              </div>
            ) : (
              <button
                onClick={connectWallet}
                disabled={loading}
                className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Connecting...' : 'Connect Wallet'}
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
