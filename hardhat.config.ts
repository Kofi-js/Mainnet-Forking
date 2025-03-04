import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require('dotenv').config()

const ALCHEMY_API_KEY_URL = process.env.ALCHEMY_API_KEY_URL || "";

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    hardhat: {
      forking: {
        url: ALCHEMY_API_KEY_URL, // Replace with your Alchemy (or Infura) API URL
      },
    },
  },
};

export default config;
