import React from 'react';
import { useChatApp } from '../context/ChatAppContext';

const ConnectWallet = () => {
  const { connectWallet, loading, error } = useChatApp();

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] bg-gradient-to-br from-blue-50 to-blue-100 p-4">
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

        <button
          onClick={connectWallet}
          className="px-6 py-3 font-bold text-white transition-colors duration-200 bg-blue-600 rounded-lg hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? 'Connecting...' : 'Connect Wallet'}
        </button>
      </div>
    </div>
  );
};

export default ConnectWallet;