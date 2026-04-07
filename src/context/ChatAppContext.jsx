import React, { createContext, useState, useEffect, useContext } from 'react';
import { ethers } from 'ethers';
import { CHAT_APP_ADDRESS, CHAT_APP_ABI } from '../utils/constants';

export const ChatAppContext = createContext();

export const ChatAppProvider = ({ children }) => {
  const [account, setAccount] = useState('');
  const [username, setUsername] = useState('');
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const checkIfWalletIsConnected = async () => {
    try {
      if (!window.ethereum) {
        setError('Please install MetaMask!');
        return;
      }

      const accounts = await window.ethereum.request({
        method: 'eth_accounts'
      });

      if (accounts.length) {
        setAccount(accounts[0]);
        await initializeContract(accounts[0]);
      }
    } catch (err) {
      console.error('Error checking wallet connection:', err);
      setError('Error connecting to wallet');
    }
  };

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        setError('Please install MetaMask!');
        return;
      }

      setLoading(true);
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });

      setAccount(accounts[0]);
      await initializeContract(accounts[0]);
      setError('');
    } catch (err) {
      console.error('Error connecting wallet:', err);
      setError('Failed to connect wallet');
    } finally {
      setLoading(false);
    }
  };

  const initializeContract = async (accountAddress) => {
    try {
      const web3Provider = new ethers.BrowserProvider(window.ethereum);
      const web3Signer = await web3Provider.getSigner();
      const chatContract = new ethers.Contract(
        CHAT_APP_ADDRESS,
        CHAT_APP_ABI,
        web3Signer
      );

      setProvider(web3Provider);
      setSigner(web3Signer);
      setContract(chatContract);

      const userExists = await chatContract.checkUserExists(accountAddress);

      if (userExists) {
        const name = await chatContract.getUsername(accountAddress);
        setUsername(name);
      }

      await fetchAllUsers(chatContract);
    } catch (err) {
      console.error('Error initializing contract:', err);
      setError('Failed to initialize contract. Make sure the contract is deployed.');
    }
  };

  const createAccount = async (name) => {
    if (!contract) {
      setError('Connect your wallet first!');
      return;
    }

    try {
      setLoading(true);
      const tx = await contract.createAccount(name);
      await tx.wait();

      setUsername(name);
      await fetchAllUsers(contract);
      setError('');
      return true;
    } catch (err) {
      console.error('Error creating account:', err);
      setError(err.reason || 'Failed to create account');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const fetchAllUsers = async (chatContract = contract) => {
    if (!chatContract) return;

    try {
      const users = await chatContract.getAllUsers();
      setAllUsers(users);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  const sendMessage = async (friendAddress, messageContent) => {
    if (!contract) {
      setError('Connect your wallet first!');
      return false;
    }

    try {
      setLoading(true);
      const tx = await contract.sendMessage(friendAddress, messageContent);
      await tx.wait();
      setError('');
      return true;
    } catch (err) {
      console.error('Error sending message:', err);
      setError(err.reason || 'Failed to send message');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const readMessages = async (friendAddress) => {
    if (!contract) {
      setError('Connect your wallet first!');
      return [];
    }

    try {
      const messages = await contract.readMessage(friendAddress);
      return messages;
    } catch (err) {
      console.error('Error reading messages:', err);
      return [];
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();

    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          initializeContract(accounts[0]);
        } else {
          setAccount('');
          setUsername('');
          setContract(null);
        }
      });

      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
    }
  }, []);

  return (
    <ChatAppContext.Provider
      value={{
        account,
        username,
        contract,
        provider,
        signer,
        allUsers,
        loading,
        error,
        connectWallet,
        createAccount,
        sendMessage,
        readMessages,
        fetchAllUsers,
      }}
    >
      {children}
    </ChatAppContext.Provider>
  );
};

export const useChatApp = () => {
  const context = useContext(ChatAppContext);
  if (!context) {
    throw new Error('useChatApp must be used within ChatAppProvider');
  }
  return context;
};
