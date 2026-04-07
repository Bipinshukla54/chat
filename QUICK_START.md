# Quick Start Guide

This is a streamlined guide to get your decentralized chat app running quickly.

## Prerequisites

- Node.js v16+
- MetaMask browser extension

## Setup (5 minutes)

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Local Blockchain

Open a new terminal and keep it running:

```bash
npx hardhat node
```

You'll see 20 accounts with private keys. Keep this terminal open!

### 3. Deploy Contracts

In a new terminal:

```bash
npx hardhat run scripts/deploy.js --network localhost
```

Copy the contract addresses from the output.

### 4. Update Contract Addresses

Open `src/utils/constants.js` and paste your contract addresses:

```javascript
export const CHAT_APP_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
export const TOKEN_ADDRESS = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
```

### 5. Configure MetaMask

1. Open MetaMask → Settings → Networks → Add Network
2. Enter:
   - Network Name: `Hardhat Local`
   - RPC URL: `http://127.0.0.1:8545`
   - Chain ID: `31337`
   - Currency Symbol: `ETH`

3. Import Test Account:
   - MetaMask → Import Account
   - Copy a private key from the Hardhat node terminal
   - Paste it in MetaMask

### 6. Start the App

```bash
npm run dev
```

Open `http://localhost:5173`

## Usage

1. Connect your wallet
2. Create a username
3. Import another test account in MetaMask to chat with yourself
4. Switch accounts and create another username
5. Select a user and start chatting!

## Testing with Multiple Users

**Option 1: Multiple Accounts in Same Browser**
- Switch between imported accounts in MetaMask
- The page will reload with each account

**Option 2: Multiple Browsers**
- Open the app in Chrome with one account
- Open in Firefox or Incognito with another account

## Common Issues

**"Connect Wallet" doesn't work**
- Make sure MetaMask is installed and unlocked
- Check you're on the Hardhat Local network

**"Failed to initialize contract"**
- Verify the contract addresses in `constants.js`
- Make sure the Hardhat node is running
- Check you're on the correct network (Chain ID 31337)

**Transactions fail**
- Reset your MetaMask account:
  Settings → Advanced → Clear activity tab data

## Next Steps

- Check the full README.md for detailed documentation
- Experiment with the smart contracts
- Customize the UI components
- Try deploying to a testnet

Enjoy building on the blockchain!
