// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./SafeConnectRegistryBase.sol";

/**
 * @title SafeConnectRegistry.
 */
contract SafeConnectRegistry is SafeConnectRegistryBase {
    constructor(string memory name, string memory version)
        SafeConnectRegistryBase(name, version)
    {}
}
