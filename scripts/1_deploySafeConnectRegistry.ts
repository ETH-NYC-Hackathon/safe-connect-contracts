import { ethers } from "hardhat";

const main = async () => {
  const name = "SafeConnectRegistry";
  const version = "V1";
  const SafeConnectRegistry = await ethers.getContractFactory(
    "SafeConnectRegistry"
  );
  const contract = await SafeConnectRegistry.deploy(name, version);
  console.log("SafeConnectRegistry deployed to:", contract.address);

  // await hre.run("verify:verify", {
  //   contract: "contracts/SafeConnectRegistry/SafeConnectRegistry.sol:SafeConnectRegistry",
  //   address: contract.address,
  //   constructorArguments: [name, version],
  // });
  // console.log("SafeConnectRegistry verified");
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
