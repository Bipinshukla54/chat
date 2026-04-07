import { expect } from "chai";
import hre from "hardhat";

describe("ChatApp", function () {
  let chatApp;
  let owner;
  let user1;
  let user2;

  beforeEach(async function () {
    [owner, user1, user2] = await hre.ethers.getSigners();

    const ChatApp = await hre.ethers.getContractFactory("ChatApp");
    chatApp = await ChatApp.deploy();
    await chatApp.waitForDeployment();
  });

  describe("Account Creation", function () {
    it("Should create a new account successfully", async function () {
      await chatApp.connect(user1).createAccount("Alice");

      const username = await chatApp.getUsername(user1.address);
      expect(username).to.equal("Alice");

      const exists = await chatApp.checkUserExists(user1.address);
      expect(exists).to.be.true;
    });

    it("Should fail when creating account with empty name", async function () {
      await expect(
        chatApp.connect(user1).createAccount("")
      ).to.be.revertedWith("Username cannot be empty");
    });

    it("Should fail when user already exists", async function () {
      await chatApp.connect(user1).createAccount("Alice");

      await expect(
        chatApp.connect(user1).createAccount("Alice2")
      ).to.be.revertedWith("User already exists");
    });
  });

  describe("Messaging", function () {
    beforeEach(async function () {
      await chatApp.connect(user1).createAccount("Alice");
      await chatApp.connect(user2).createAccount("Bob");
    });

    it("Should send a message successfully", async function () {
      await chatApp.connect(user1).sendMessage(user2.address, "Hello Bob!");

      const messages = await chatApp.connect(user1).readMessage(user2.address);
      expect(messages.length).to.equal(1);
      expect(messages[0].content).to.equal("Hello Bob!");
      expect(messages[0].sender).to.equal(user1.address);
    });

    it("Should allow bidirectional messaging", async function () {
      await chatApp.connect(user1).sendMessage(user2.address, "Hi Bob");
      await chatApp.connect(user2).sendMessage(user1.address, "Hi Alice");

      const messagesUser1 = await chatApp.connect(user1).readMessage(user2.address);
      const messagesUser2 = await chatApp.connect(user2).readMessage(user1.address);

      expect(messagesUser1.length).to.equal(2);
      expect(messagesUser2.length).to.equal(2);
      expect(messagesUser1[0].content).to.equal("Hi Bob");
      expect(messagesUser1[1].content).to.equal("Hi Alice");
    });

    it("Should fail when sending message without account", async function () {
      const [user3] = await hre.ethers.getSigners();

      await expect(
        chatApp.connect(user3).sendMessage(user1.address, "Hello")
      ).to.be.revertedWith("Create an account first");
    });

    it("Should fail when sending message to non-existent user", async function () {
      const [, , , user3] = await hre.ethers.getSigners();

      await expect(
        chatApp.connect(user1).sendMessage(user3.address, "Hello")
      ).to.be.revertedWith("Recipient does not exist");
    });

    it("Should fail when sending message to self", async function () {
      await expect(
        chatApp.connect(user1).sendMessage(user1.address, "Hello myself")
      ).to.be.revertedWith("Cannot send message to yourself");
    });

    it("Should fail when sending empty message", async function () {
      await expect(
        chatApp.connect(user1).sendMessage(user2.address, "")
      ).to.be.revertedWith("Message cannot be empty");
    });
  });

  describe("User List", function () {
    it("Should return all users", async function () {
      await chatApp.connect(user1).createAccount("Alice");
      await chatApp.connect(user2).createAccount("Bob");

      const users = await chatApp.getAllUsers();
      expect(users.length).to.equal(2);
      expect(users[0].name).to.equal("Alice");
      expect(users[1].name).to.equal("Bob");
    });

    it("Should return empty array when no users exist", async function () {
      const users = await chatApp.getAllUsers();
      expect(users.length).to.equal(0);
    });
  });
});
