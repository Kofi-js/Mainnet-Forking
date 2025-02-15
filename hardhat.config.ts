import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    hardhat: {
      forking: {
        url: "https://eth-mainnet.g.alchemy.com/v2/iZOVRgp4WUsUXkyqNup-f6y3o95fIkTw", // Replace with your Alchemy (or Infura) API URL
      },
    },
  },
};

export default config;
