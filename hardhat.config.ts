require('dotenv').config()
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-etherscan";

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: "https://rpc.ankr.com/eth_goerli",
      accounts: [ String(process.env.DEPLOYER_PRIVATE_KEY) ]
    },
    mainnet: {
      url: "https://rpc.ankr.com/eth",
      accounts: [ String(process.env.DEPLOYER_PRIVATE_KEY) ]
    }
  },
  etherscan: {
    apiKey: {
      goerli: String(process.env.ETHERSCAN_API_KEY),
      mainnet: String(process.env.ETHERSCAN_API_KEY)
    }
  }
};

export default config;
