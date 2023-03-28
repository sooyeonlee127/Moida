require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks: {
    Hardhat: {
      url: "https://127.0.0.1:8545",
      gasPrice: 25000000000
    },
    sepolia: {
      url: "https://sepolia.infura.io/v3/a4636fca95804d9ab953276a4ea93748",
      accounts: [
        "b0148045d850bc0d896cf9b99603fcfdde940b61daf07d5c93c20cf675ac575f",
      ],
      gasPrice: 25000000000
    },
  },
};
