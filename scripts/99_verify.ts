import hre from "hardhat";
import addressJson from "../configs/address.json";
import { NetworkName } from "../helpers/types";

export const networkName =
  hre.network.name === "hardhat" ? "localhost" : <NetworkName>hre.network.name;

const main = async () => {
  const SafeConnectRegistryAddress = addressJson["69"].SafeConnectRegistry;
  const SafeConnectRegistryName = "SafeConnectRegistry";
  const SafeConnectRegistryVersion = "V1";
  await hre.run("verify:verify", {
    contract: "contracts/SafeConnectRegistry.sol:SafeConnectRegistry",
    address: SafeConnectRegistryAddress,
    constructorArguments: [SafeConnectRegistryName, SafeConnectRegistryVersion],
  });
  console.log("SafeConnectRegistry verified");
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
