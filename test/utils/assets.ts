import { ethers } from "hardhat";

export const id = (str: string) => {
  return `${ethers.utils
    .keccak256(ethers.utils.toUtf8Bytes(str))
    .toString()
    .substring(0, 10)}`;
};

export const abiCoderEncode = (
  types: string[],
  data: (string | number | unknown)[]
) => {
  const abiCoder = new ethers.utils.AbiCoder();
  return abiCoder.encode(types, data);
};

export const abiCoderDecode = (types: string[], data: string) => {
  const abiCoder = new ethers.utils.AbiCoder();
  return abiCoder.decode(types, data);
};

export const NULL_BYTES4 = "0x00000000";
export const NULL_BYTES32 =
  "0x0000000000000000000000000000000000000000000000000000000000000000";
export const NULL_BYTES = "0x";
export const NULL_ADDRESS = "0x0000000000000000000000000000000000000000";
export const NULL_NUMBER = 0;
export const NULL_STRING = "";

export const ALWAYS_VALID_FROM = 0;
export const ALWAYS_VALID_TO = 9999999999;

export const BPS_BASE = 10000;
