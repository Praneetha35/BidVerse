// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts v4.4.1 (token/ERC721/IERC721.sol)

import "@openzeppelin/contracts-upgradeable/token/ERC721/IERC721Upgradeable.sol";

pragma solidity ^0.8.0;

/**
 * @dev Required interface of an ERC721 compliant contract.
 */
interface IBidVerseProfile is IERC721Upgradeable{

    /**
     * @dev Mints a profile nft for `to` with uri `uri`.
     *
     * Requirements:
     *
     * - `to` should not be addrss(0).
     * - `uri` must exist
     *
     * Returns the minted tokenId and status
     */
    function mintProfile(address to, string memory uri)
        external
        returns (uint256);
}
