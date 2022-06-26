// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol";
import "@openzeppelin/contracts/utils/cryptography/SignatureChecker.sol";

/**
 * @title TxValidatable
 */
abstract contract TxValidatable is Context, EIP712 {
    using SignatureChecker for address;

    function _validateTx(
        address signer,
        bytes32 hash,
        bytes memory signature
    ) internal view returns (bool, string memory) {
        if (signature.length == 0) {
            address sender = _msgSender();
            if (signer != sender) {
                return (false, "TxValidatable: sender verification failed");
            }
        } else {
            if (
                !signer.isValidSignatureNow(_hashTypedDataV4(hash), signature)
            ) {
                return (false, "TxValidatable: signature verification failed");
            }
        }
        return (true, "");
    }
}
