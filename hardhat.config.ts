/* eslint-disable node/no-unpublished-import */
import * as dotenv from "dotenv";
import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "hardhat-contract-sizer";
import "hardhat-deploy";
import "solidity-coverage";
import network from "./configs/network.json";

dotenv.config();

const privateKey =
  process.env.PRIVATE_KEY ||
  "0x0000000000000000000000000000000000000000000000000000000000000000"; // this is to avoid hardhat error
const enableGasReport = process.env.ENABLE_GAS_REPORT !== undefined;
const enableProduction = process.env.COMPILE_MODE === "production";

const settings = {
  optimizer: {
    enabled: enableGasReport || enableProduction,
    runs: 200,
  },
};

const config: HardhatUserConfig = {
  solidity: {
    compilers: [{ version: "0.8.2", settings }],
  },
  networks: {
    mainnet: {
      url: network.mainnet.rpc,
      accounts: [privateKey],
    },
    rinkeby: {
      url: network.rinkeby.rpc,
      accounts: [privateKey],
    },
    goerli: {
      url: network.goerli.rpc,
      accounts: [privateKey],
    },
    polygon: {
      url: network.polygon.rpc,
      accounts: [privateKey],
    },
    polygon_test: {
      url: network.polygon_test.rpc,
      accounts: [privateKey],
    },
    optimism: {
      url: network.optimism.rpc,
      accounts: [privateKey],
    },
    optimism_test: {
      url: network.optimism_test.rpc,
      accounts: [privateKey],
    },
  },
  contractSizer: {
    alphaSort: true,
    disambiguatePaths: false,
    runOnCompile: true,
    strict: true,
  },
  gasReporter: {
    enabled: enableGasReport,
    currency: "JPY",
    outputFile: process.env.CI ? "gas-report.txt" : undefined,
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  mocha: {
    timeout: 40000,
  },
};

export default config;
