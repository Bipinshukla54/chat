# Project Structure

## Overview

This is a full-stack decentralized chat application (DApp) built with React, Solidity, and Hardhat.

## Directory Structure

```
decentralized-chat-dapp/
│
├── contracts/                      # Solidity smart contracts
│   ├── ChatApp.sol                # Main chat contract
│   └── Token.sol                  # ERC20 token contract
│
├── scripts/                       # Hardhat deployment & utility scripts
│   ├── deploy.js                  # Contract deployment script
│   └── get-abi.js                 # Extract contract ABIs
│
├── test/                          # Smart contract tests
│   └── ChatApp.test.js           # ChatApp contract test suite
│
├── src/                           # React frontend source code
│   ├── components/               # React components
│   │   ├── ChatBox.jsx          # Chat interface
│   │   ├── CreateAccount.jsx    # Account creation form
│   │   ├── Navbar.jsx           # Navigation bar
│   │   └── UserList.jsx         # User sidebar
│   │
│   ├── context/                  # React Context for state
│   │   └── ChatAppContext.jsx   # Blockchain state management
│   │
│   ├── utils/                    # Utility files
│   │   └── constants.js         # Contract ABIs & addresses
│   │
│   ├── App.tsx                   # Main application component
│   ├── main.tsx                  # Application entry point
│   ├── index.css                 # Global styles (Tailwind)
│   └── vite-env.d.ts            # TypeScript declarations
│
├── artifacts/                     # Compiled contract artifacts (generated)
├── cache/                        # Hardhat cache (generated)
├── dist/                         # Production build output (generated)
│
├── hardhat.config.js             # Hardhat configuration
├── vite.config.ts                # Vite configuration
├── tailwind.config.js            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
│
├── package.json                  # Project dependencies & scripts
├── .gitignore                    # Git ignore rules
├── .env.example                  # Environment variables template
│
├── README.md                     # Comprehensive documentation
├── QUICK_START.md                # Quick setup guide
└── PROJECT_STRUCTURE.md          # This file
```

## Smart Contracts

### ChatApp.sol
Main contract for the decentralized chat application.

**Key Functions:**
- `createAccount(string username)` - Register a new user
- `getUsername(address)` - Get username for an address
- `checkUserExists(address)` - Verify if user exists
- `sendMessage(address friend, string message)` - Send a message
- `readMessage(address friend)` - Read chat history
- `getAllUsers()` - Get all registered users

**Data Structures:**
- `User` struct - Stores username, address, and existence flag
- `Message` struct - Stores sender, timestamp, and content
- `messages` mapping - Stores all messages using chat codes

### Token.sol (TheBlockchainCoders)
Standard ERC20 token contract.

**Features:**
- Token name: TheBlockchainCoders (TBC)
- 18 decimals
- Standard transfer, approve, transferFrom functions
- Initial supply minted to deployer

## Frontend Components

### ChatAppContext.jsx
Central state management using React Context API.

**Responsibilities:**
- Wallet connection management
- Contract initialization
- User account operations
- Message sending/reading
- User list management
- Error handling

**Provided State:**
- `account` - Connected wallet address
- `username` - Current user's username
- `contract` - Contract instance
- `allUsers` - List of all users
- `loading` - Loading state
- `error` - Error messages

**Provided Methods:**
- `connectWallet()` - Connect MetaMask
- `createAccount(name)` - Create user account
- `sendMessage(address, message)` - Send message
- `readMessages(address)` - Get chat history
- `fetchAllUsers()` - Refresh user list

### Components

**Navbar.jsx**
- Displays app branding
- Shows connected wallet address
- Shows current username
- Connect wallet button

**CreateAccount.jsx**
- Username input form
- Account creation
- Loading states
- Error handling

**UserList.jsx**
- Displays all users except current user
- User selection
- Visual indicators for selected user
- Shows shortened addresses

**ChatBox.jsx**
- Message display area
- Send message input
- Message timestamps
- Auto-scroll to latest message
- Real-time polling (every 3 seconds)
- Different styles for sent/received messages

### App.tsx
Main application logic with three states:
1. No wallet connected - Shows welcome screen
2. Wallet connected but no account - Shows account creation
3. Full access - Shows chat interface

## Configuration Files

### hardhat.config.js
Hardhat 3 configuration with:
- Solidity version 0.8.19
- Localhost network configuration
- Custom paths for contracts and artifacts
- ES module syntax

### vite.config.ts
Vite build configuration with:
- React plugin
- Optimized dependencies
- Excluding lucide-react from optimization

### tailwind.config.js
Tailwind CSS configuration:
- Scans all source files
- Default theme
- No custom plugins

## NPM Scripts

```json
{
  "dev": "vite",                    // Start development server
  "build": "vite build",            // Build for production
  "compile": "npx hardhat compile", // Compile smart contracts
  "node": "npx hardhat node",       // Start local blockchain
  "deploy": "...",                  // Deploy contracts to localhost
  "get-abi": "...",                 // Extract contract ABIs
  "test:contracts": "...",          // Run contract tests
  "lint": "eslint .",               // Run linter
  "typecheck": "..."                // Type checking
}
```

## Technology Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **ethers.js v6** - Blockchain interaction

### Blockchain
- **Solidity 0.8.19** - Smart contract language
- **Hardhat 3** - Development environment
- **@nomicfoundation/hardhat-ethers** - Ethers.js integration

### Testing
- **Chai** - Assertion library
- **Hardhat Network** - Local blockchain for testing

## Data Flow

1. **Wallet Connection**
   - User clicks "Connect Wallet"
   - MetaMask prompts for connection
   - Account address stored in state
   - Contract instance initialized

2. **Account Creation**
   - User enters username
   - Transaction sent to `createAccount()`
   - Username stored on blockchain
   - User list updated

3. **Sending Messages**
   - User selects recipient
   - Types message and clicks send
   - Transaction sent to `sendMessage()`
   - Message stored on-chain with timestamp
   - Chat refreshed

4. **Reading Messages**
   - Component polls `readMessage()` every 3 seconds
   - Messages retrieved from blockchain
   - Displayed in chronological order
   - Sender/receiver styled differently

## Security Considerations

### Smart Contract
- Input validation (non-empty strings)
- Existence checks before operations
- Cannot send messages to self
- Proper access control

### Frontend
- Environment variables for contract addresses
- Error handling for all transactions
- Loading states prevent duplicate transactions
- Wallet connection verification

## Gas Optimization Notes

This is an educational project. In production:
- Messages should be stored off-chain (IPFS/Arweave)
- Only hashes stored on-chain
- Use Layer 2 solutions for lower costs
- Implement message batching

## Testing

Run contract tests:
```bash
npm run test:contracts
```

Tests cover:
- Account creation (success & failure cases)
- Message sending (various scenarios)
- User list functionality
- Edge cases and error conditions

## Deployment

1. Compile contracts: `npm run compile`
2. Start local node: `npm run node`
3. Deploy contracts: `npm run deploy`
4. Update contract addresses in `src/utils/constants.js`
5. Start frontend: `npm run dev`

## Contributing

This is a learning project. Key areas for enhancement:
- Add message encryption
- Implement group chats
- Add file sharing
- Improve gas efficiency
- Add notification system
- Implement user profiles

## License

MIT License - Free to use for learning and development.
