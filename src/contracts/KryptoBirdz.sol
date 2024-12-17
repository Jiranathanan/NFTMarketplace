// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import './ERC721Connector.sol';

contract Kryptobird is ERC721Connector {

    // the name is KryptoBird and the symbol is KBIRDZ
    constructor() ERC721Connector('KryptoBird','KBIRDZ') {

    }
}

