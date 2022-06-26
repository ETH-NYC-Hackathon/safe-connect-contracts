// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

/**
 * @title UriLib.
 */
library UriLib {
    bytes4 public constant SET_URI_TYPE = bytes4(keccak256("SET"));
    bytes4 public constant REVOKE_URI_TYPE = bytes4(keccak256("REVOKE"));
    bytes4 public constant VERIFIED_URI_STATUS = bytes4(keccak256("VERIFIED"));
    bytes4 public constant WARNING_URI_STATUS = bytes4(keccak256("WARNING"));
    bytes4 public constant ERROR_URI_STATUS = bytes4(keccak256("ERROR"));

    bytes32 constant URI_TYPEHASH =
        keccak256(
            "UriData(string protocol,string host,string origin,address maker,bytes4 dataType,bytes4 status)"
        );

    struct UriData {
        string protocol;
        string host;
        string origin;
        address maker;
        bytes4 dataType;
        bytes4 status;
    }

    function hashKey(UriData memory uri) internal pure returns (bytes32) {
        return
            keccak256(
                abi.encode(
                    keccak256(bytes(uri.protocol)),
                    keccak256(bytes(uri.host)),
                    keccak256(bytes(uri.origin))
                )
            );
    }

    function hash(UriData memory uri) internal pure returns (bytes32) {
        return
            keccak256(
                abi.encode(
                    URI_TYPEHASH,
                    keccak256(bytes(uri.protocol)),
                    keccak256(bytes(uri.host)),
                    keccak256(bytes(uri.origin)),
                    uri.maker,
                    uri.dataType,
                    uri.status
                )
            );
    }

    function validate(UriData memory uri)
        internal
        pure
        returns (bool, string memory)
    {
        if (uri.maker == address(0)) {
            return (false, "UriLib: maker validation failed");
        } else if (
            !(uri.dataType == SET_URI_TYPE || uri.dataType == REVOKE_URI_TYPE)
        ) {
            return (false, "UriLib: dataType validation failed");
        } else if (
            !(uri.status == VERIFIED_URI_STATUS ||
                uri.status == WARNING_URI_STATUS ||
                uri.status == ERROR_URI_STATUS)
        ) {
            return (false, "UriLib: status validation failed");
        }
        return (true, "");
    }
}
