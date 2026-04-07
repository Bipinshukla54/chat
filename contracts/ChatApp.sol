// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract ChatApp {
    struct User {
        string name;
        address userAddress;
        bool exists;
    }

    struct Message {
        address sender;
        uint256 timestamp;
        string content;
    }

    mapping(address => User) public users;
    address[] public userList;

    mapping(bytes32 => Message[]) public messages;

    event UserCreated(address indexed userAddress, string name);
    event MessageSent(address indexed from, address indexed to, string message, uint256 timestamp);

    function createAccount(string calldata name) external {
        require(!users[msg.sender].exists, "User already exists");
        require(bytes(name).length > 0, "Username cannot be empty");

        users[msg.sender] = User({
            name: name,
            userAddress: msg.sender,
            exists: true
        });

        userList.push(msg.sender);

        emit UserCreated(msg.sender, name);
    }

    function getUsername(address userAddress) external view returns (string memory) {
        require(users[userAddress].exists, "User does not exist");
        return users[userAddress].name;
    }

    function checkUserExists(address userAddress) external view returns (bool) {
        return users[userAddress].exists;
    }

    function sendMessage(address friend, string calldata messageContent) external {
        require(users[msg.sender].exists, "Create an account first");
        require(users[friend].exists, "Recipient does not exist");
        require(msg.sender != friend, "Cannot send message to yourself");
        require(bytes(messageContent).length > 0, "Message cannot be empty");

        bytes32 chatCode = _getChatCode(msg.sender, friend);
        messages[chatCode].push(Message({
            sender: msg.sender,
            timestamp: block.timestamp,
            content: messageContent
        }));

        emit MessageSent(msg.sender, friend, messageContent, block.timestamp);
    }

    function readMessage(address friend) external view returns (Message[] memory) {
        bytes32 chatCode = _getChatCode(msg.sender, friend);
        return messages[chatCode];
    }

    function getAllUsers() external view returns (User[] memory) {
        User[] memory allUsers = new User[](userList.length);

        for (uint256 i = 0; i < userList.length; i++) {
            allUsers[i] = users[userList[i]];
        }

        return allUsers;
    }

    function _getChatCode(address addr1, address addr2) internal pure returns (bytes32) {
        if (addr1 < addr2) {
            return keccak256(abi.encodePacked(addr1, addr2));
        } else {
            return keccak256(abi.encodePacked(addr2, addr1));
        }
    }
}
