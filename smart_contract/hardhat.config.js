require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks: {
    sepolia: {
      url: "https://sepolia.infura.io/v3/a4636fca95804d9ab953276a4ea93748",
      accounts: [
        "b0148045d850bc0d896cf9b99603fcfdde940b61daf07d5c93c20cf675ac575f",
      ],
    },
  },
  ganache: {
    sepolia: {
      url: "http://127.0.0.1:7545",
      accounts: [
        "0x525Cd29265048adE18306B07d556c1138C36291D",
      ],
    },
  },
};
