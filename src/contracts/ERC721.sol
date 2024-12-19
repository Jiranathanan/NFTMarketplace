// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

    /*
        building out the minting function
        a. nft point to an address
        b. keep track of the token ids
        c. keep track of token owner addresses to token ids
        d. keep track of how many tokens an owner address has
        e. create an event that emits a transfer log - contract address. where it being minted to, the id 
    */

contract ERC721 {

    event Transfer(
        address indexed from, 
        address indexed to, 
        uint256 indexed tokenId);

    // mapping in solidity creates a hash table of key pair values

    // Mapping from token id to the owner 
    mapping(uint256 => address) private _tokenOwner;

    // Mapping from owner to number of owned tokens
    mapping(address => uint256) private _OwnedTokensCount;

    function balanceOf(address _owner) public view returns(uint256) {
        require(_owner != address(0), 'Unable to find a balance of zero address');
        return _OwnedTokensCount[_owner];
    } 

    function ownerOf(uint256 _tokenId) external view returns(address) {
        address owner = _tokenOwner[_tokenId];
        require(owner != address(0), "Token Id doesn't exists");
        return owner;
    }

    function _exists(uint256 tokenId) internal view returns(bool){
        // setting the address of nft owner to check the mapping
        // of the address from tokenOwner at the tokenId
        address owner = _tokenOwner[tokenId];
        // return truthiness that address is not zero
        return owner != address(0);
        // If the owner is NOT the zero address, it means the token exists
        // If the owner IS the zero address, it means the token has not been minted or has been burned
    }

    function _mint(address to, uint256 tokenId) internal {
        // require that the mint address isn't 0
        require(to != address(0), 'ERC721: minting to the zero address');
        // In Solidity, address(0) represents an unassigned or empty address
        // require that the token has not already been minted
        require(!_exists(tokenId), 'ERC721: token already minted');
        // if the address is zero, it means ti had not been minted
        // we are adding a new address with a token id for minting
        _tokenOwner[tokenId] = to;
        // keeping track of each address that is minting and adding one to the count
        _OwnedTokensCount[to] += 1;
    
        emit Transfer(address(0), to, tokenId);
    }
}