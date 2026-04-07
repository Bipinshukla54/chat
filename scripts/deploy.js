import hre from "hardhat";

async function main() {
  console.log("Starting deployment...\n");

  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", hre.ethers.formatEther(balance), "ETH\n");

  console.log("Deploying ChatApp contract...");
  const ChatApp = await hre.ethers.getContractFactory("ChatApp");
  const chatApp = await ChatApp.deploy();
  await chatApp.waitForDeployment();
  const chatAppAddress = await chatApp.getAddress();
  console.log("ChatApp deployed to:", chatAppAddress);

  console.log("\nDeploying Token contract...");
  const Token = await hre.ethers.getContractFactory("TheBlockchainCoders");
  const token = await Token.deploy(1000000);
  await token.waitForDeployment();
  const tokenAddress = await token.getAddress();
  console.log("Token deployed to:", tokenAddress);

  console.log("\n=== Deployment Summary ===");
  console.log("ChatApp Address:", chatAppAddress);
  console.log("Token Address:", tokenAddress);
  console.log("\nSave these addresses to src/utils/constants.js");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
