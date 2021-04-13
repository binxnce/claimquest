//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "openzeppelin-solidity/contracts/token/ERC20/SafeERC20.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/utils/Address.sol";

import "../libraries/CoreLibrary.sol";
import "../configuration/PoolAddressesProvider.sol";
import "../tokenization/AToken.sol";
import "../libraries/EthAddressLib.sol";

contract ClaimPoolCore  {
    using SafeMath for uint256;
    // using WadRayMath for uint256;
    using CoreLibrary for CoreLibrary.ReserveData;
    using CoreLibrary for CoreLibrary.UserReserveData;
    using SafeERC20 for ERC20;
    using Address for address payable;

    /**
    * @dev Emitted when the state of a reserve is updated
    * @param reserve the address of the reserve
    **/
    event ReserveUpdated(
        address indexed reserve
    );

    mapping(address => CoreLibrary.ReserveData) internal reserves;
    mapping(address => mapping(address => CoreLibrary.UserReserveData)) internal usersReserveData;

    address[] public reservesList;



}
