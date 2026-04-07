import React from 'react';
import { useChatApp } from '../context/ChatAppContext';
import { Users, User } from 'lucide-react';

const UserList = ({ onSelectUser, selectedUser }) => {
  const { allUsers, account } = useChatApp();

  const filteredUsers = allUsers.filter(
    (user) => user.userAddress.toLowerCase() !== account.toLowerCase()
  );

  const shortenAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center space-x-2">
          <Users className="w-6 h-6 text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-800">
            Users ({filteredUsers.length})
          </h2>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredUsers.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <User className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No other users yet</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredUsers.map((user, index) => (
              <button
                key={index}
                onClick={() => onSelectUser(user)}
                className={`w-full p-4 text-left hover:bg-blue-50 transition-colors ${
                  selectedUser?.userAddress === user.userAddress
                    ? 'bg-blue-50 border-l-4 border-blue-600'
                    : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-800 truncate">
                      {user.name}
                    </p>
                    <p className="text-sm text-gray-500 font-mono">
                      {shortenAddress(user.userAddress)}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserList;
