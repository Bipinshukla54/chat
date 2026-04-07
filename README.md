# Decentralized Chat DApp

A full-stack decentralized chat application built on Ethereum blockchain using React.js and Solidity smart contracts.

## Features

- MetaMask wallet integration
- User account creation on blockchain
- Peer-to-peer messaging stored on-chain
- Real-time message updates
- Clean and modern UI
- ERC20 token contract (TheBlockchainCoders)

## Tech Stack

### Frontend
- React.js
- ethers.js v6
- Context API for state management
- Tailwind CSS
- Lucide React icons

### Backend (Blockchain)
- Solidity ^0.8.19
- Hardhat development environment
- Local blockchain (Hardhat node)

## Smart Contracts

### ChatApp.sol
Main chat application contract with the following features:
- `createAccount(string username)` - Create a user account
- `getUsername(address)` - Get username for an address
- `checkUserExists(address)` - Check if user exists
- `sendMessage(address friend, string message)` - Send a message
- `readMessage(address friend)` - Read messages with a user
- `getAllUsers()` - Get all registered users

### Token.sol
ERC20 token contract (TheBlockchainCoders - TBC) with standard transfer functionality.

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MetaMask browser extension
- npm or yarn

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Start Local Blockchain

Open a new terminal and run:

```bash
npx hardhat node
```

This will start a local Ethereum blockchain at `http://127.0.0.1:8545` and provide you with 20 test accounts with 10,000 ETH each.

### Step 3: Deploy Smart Contracts

In a new terminal (keep the blockchain node running), deploy the contracts:

```bash
npx hardhat run scripts/deploy.js --network localhost
```

You will see output like:

```
ChatApp deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
Token deployed to: 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
```

### Step 4: Update Contract Addresses

Copy the deployed contract addresses and update them in `src/utils/constants.js`:

```javascript
export const CHAT_APP_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
export const TOKEN_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
```

### Step 5: Configure MetaMask

1. Open MetaMask
2. Add a new network with these details:
   - Network Name: Hardhat Local
   - RPC URL: http://127.0.0.1:8545
   - Chain ID: 31337
   - Currency Symbol: ETH

3. Import one or more test accounts from the Hardhat node output:
   - Click "Import Account"
   - Paste one of the private keys shown in the Hardhat node terminal
   - You should see 10,000 ETH in the account

### Step 6: Start the Application

```bash
npm run dev
```

The application will open at `http://localhost:5173`

## Usage Guide

### 1. Connect Wallet
- Click "Connect Wallet" in the navigation bar
- Approve the connection in MetaMask

### 2. Create Account
- Enter a username
- Click "Create Account"
- Confirm the transaction in MetaMask
- Wait for the transaction to be mined

### 3. Start Chatting
- You'll see a list of all registered users in the sidebar
- Click on a user to open a chat
- Type your message and click "Send"
- Confirm the transaction in MetaMask
- Messages will appear in the chat window

### 4. Testing with Multiple Users
To test the chat functionality:

1. Create an account with the first MetaMask account
2. Switch to a different account in MetaMask (the page will reload)
3. Create a new account with a different username
4. Now you can chat between these two accounts
5. Open the app in a private/incognito window with another account to chat in real-time

## Project Structure

```
├── contracts/
│   ├── ChatApp.sol          # Main chat contract
│   └── Token.sol            # ERC20 token contract
├── scripts/
│   └── deploy.js            # Deployment script
├── src/
│   ├── components/
│   │   ├── ChatBox.jsx      # Chat interface component
│   │   ├── CreateAccount.jsx # Account creation component
│   │   ├── Navbar.jsx       # Navigation bar
│   │   └── UserList.jsx     # User sidebar component
│   ├── context/
│   │   └── ChatAppContext.jsx # Blockchain state management
│   ├── utils/
│   │   └── constants.js     # Contract ABIs and addresses
│   ├── App.tsx              # Main application component
│   ├── main.tsx             # Application entry point
│   └── index.css            # Tailwind styles
├── hardhat.config.js        # Hardhat configuration
└── package.json             # Project dependencies
```

## How It Works

1. **User Registration**: Users create accounts by calling `createAccount()` which stores their username on the blockchain

2. **Message Storage**: Messages are stored on-chain using a unique chat code (hash) for each conversation pair

3. **Message Retrieval**: The contract retrieves messages between two users using `readMessage()`

4. **User Discovery**: All registered users are fetched using `getAllUsers()`

5. **Real-time Updates**: The frontend polls for new messages every 3 seconds

## Gas Considerations

Since this is a learning project storing all data on-chain:
- Creating an account costs gas
- Sending each message costs gas
- In production, consider using IPFS or other storage solutions for messages
- The local testnet provides unlimited free ETH for testing

## Troubleshooting

### MetaMask Connection Issues
- Make sure MetaMask is installed and unlocked
- Verify you're connected to the correct network (Hardhat Local)
- Check that the RPC URL is correct (http://127.0.0.1:8545)

### Transaction Failures
- Ensure the Hardhat node is running
- Check that contract addresses in constants.js match deployed addresses
- Try resetting your MetaMask account (Settings > Advanced > Reset Account)

### Contract Not Found Error
- Verify contracts are deployed successfully
- Check console for any deployment errors
- Ensure you're using the correct contract addresses

## Development Notes

### Compiling Contracts

```bash
npx hardhat compile
```

### Running Tests

```bash
npx hardhat test
```

### Cleaning Build Artifacts

```bash
npx hardhat clean
```

## Security Notes

This is a demonstration/learning project. For production use:
- Implement proper access controls
- Add rate limiting for message sending
- Consider using Layer 2 solutions for lower gas costs
- Store large message content off-chain (IPFS)
- Add message encryption for privacy
- Implement proper error handling and validation

## Future Enhancements

- Group chat functionality
- Message encryption
- File sharing
- User profiles with avatars
- Message reactions
- Online status indicators
- Push notifications
- Mobile responsive improvements

## License

MIT License - feel free to use this project for learning and development.

## Contributing

This is a learning project. Feel free to fork and experiment with your own features!

## Resources

- [Hardhat Documentation](https://hardhat.org/docs)
- [ethers.js Documentation](https://docs.ethers.org/v6/)
- [Solidity Documentation](https://docs.soliditylang.org/)
- [MetaMask Documentation](https://docs.metamask.io/)
