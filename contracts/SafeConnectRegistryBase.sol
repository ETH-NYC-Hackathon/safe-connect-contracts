// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./libraries/UriLib.sol";
import "./extensions/AdminController.sol";
import "./extensions/TxValidatable.sol";

/**
 * @title SafeConnectRegistryBase.
 */
abstract contract SafeConnectRegistryBase is AdminController, TxValidatable {
    mapping(bytes32 => UriLib.UriData) private _uris;

    event SetUri(bytes32 id, UriLib.UriData uri, address sender);
    event RevokeUri(bytes32 id, UriLib.UriData uri, address sender);

    constructor(string memory name, string memory version)
        EIP712(name, version)
        Ownable()
        AdminController(_msgSender())
    {}

    function setUri(UriLib.UriData memory uri, bytes memory signature)
        external
    {
        (bool isValid, string memory errorMessage) = _validateFull(
            UriLib.SET_URI_TYPE,
            uri,
            signature
        );
        require(isValid, errorMessage);
        bytes32 uriId = UriLib.hashKey(uri);
        _uris[uriId] = uri;
        emit SetUri(uriId, uri, _msgSender());
    }

    function revokeUri(UriLib.UriData memory uri, bytes memory signature)
        external
    {
        (bool isValid, string memory errorMessage) = _validateFull(
            UriLib.REVOKE_URI_TYPE,
            uri,
            signature
        );
        require(isValid, errorMessage);
        bytes32 uriId = UriLib.hashKey(uri);
        delete _uris[uriId];
        emit RevokeUri(uriId, uri, _msgSender());
    }

    function getUri(bytes32 uriId) public view returns (UriLib.UriData memory) {
        return _uris[uriId];
    }

    function _msgSender() internal view override(Context) returns (address) {
        return super._msgSender();
    }

    function _validateFull(
        bytes4 dataType,
        UriLib.UriData memory uri,
        bytes memory signature
    ) internal view returns (bool, string memory) {
        (bool isDataValid, string memory dataErrorMessage) = _validateData(
            dataType,
            uri
        );
        if (!isDataValid) {
            return (isDataValid, dataErrorMessage);
        }
        (bool isSigValid, string memory sigErrorMessage) = _validateSig(
            uri,
            uri.maker,
            signature
        );
        if (!isSigValid) {
            return (isSigValid, sigErrorMessage);
        }
        return (true, "");
    }

    function _validateData(bytes4 dataType, UriLib.UriData memory uri)
        private
        view
        returns (bool, string memory)
    {
        if (uri.dataType != dataType) {
            return (
                false,
                "SafeConnectRegistryBase: dataType verification failed"
            );
        }
        return UriLib.validate(uri);
    }

    function _validateSig(
        UriLib.UriData memory uri,
        address signer,
        bytes memory signature
    ) private view returns (bool, string memory) {
        bytes32 hash = UriLib.hash(uri);
        (bool isValid, string memory errorMessage) = _validateTx(
            signer,
            hash,
            signature
        );
        return (isValid, errorMessage);
    }
}
