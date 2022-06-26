/* eslint-disable node/no-unsupported-features/es-syntax */
/* eslint-disable no-unused-vars */
import hre, { ethers } from "hardhat";
import addressJson from "../configs/address.json";
import networkJson from "../configs/network.json";
import safeUri from "../configs/safeUri.json";
import { NetworkName } from "../helpers/types";
import { id, abiCoderEncode } from "../test/utils/assets";
import {  signTypedData } from "../test/utils/EIP712";
import { UriTypes } from "../test/utils/uri";

export const networkName =
  hre.network.name === "hardhat" ? "localhost" : <NetworkName>hre.network.name;

const main = async () => {
  const safeConnectRegistryAddress = addressJson["69"].SafeConnectRegistry;
  const safeConnectRegistry = await ethers.getContractAt(
    "SafeConnectRegistry",
    safeConnectRegistryAddress
  );
  const provider = new ethers.providers.JsonRpcProvider(
    `${networkJson[networkName].rpc}`
  );
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY as string, provider);

  await Promise.all(
    safeUri.map(async (uri, i) => {
      if (i === 11) {
        const data = {
          ...uri,
          dataType: id("SET"),
          status:
            uri.status === 0
              ? id("VERIFIED")
              : uri.status === 1
              ? id("WARNING")
              : uri.status === 2
              ? id("ERROR")
              : "0x",
        };
        const sign = await signTypedData(
          wallet,
          "SafeConnectRegistry",
          "V1",
          safeConnectRegistryAddress,
          UriTypes,
          data
        );
        const gasLimit = await safeConnectRegistry.estimateGas.setUri(
          data,
          sign
        );
        const setUriResult = await safeConnectRegistry.setUri(data, sign, {
          gasLimit,
        });
        console.log(setUriResult);
        await new Promise((resolve) => {
          setTimeout(resolve, 1000);
        });
        const getUriResult = await safeConnectRegistry.getUri(
          ethers.utils.keccak256(
            abiCoderEncode(
              ["bytes32", "bytes32", "bytes32"],
              [
                ethers.utils.keccak256(ethers.utils.toUtf8Bytes(data.protocol)),
                ethers.utils.keccak256(ethers.utils.toUtf8Bytes(data.host)),
                ethers.utils.keccak256(ethers.utils.toUtf8Bytes(data.origin)),
              ]
            )
          )
        );
        console.log(getUriResult);
      }
    })
  );
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
