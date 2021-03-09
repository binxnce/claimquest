pragma solidity 0.7.6;
//SPDX-License-Identifier: MIT

import "hardhat/console.sol";
import "./TodoList.sol";

// Storage heavy implementation
contract ClaimQuest {

    mapping(address => TodoList) public tasks;
    mapping(string => address) public pools;

    constructor(){
        // pools["defaultPool"] = "";
        // pools["lotteryPool"] = "";
    }   
    // cron job
    function cron() public {
        // for each pool call claim
    }

// ideas
// get permision to spend money
// get permission to only spend x amount of money
// self-sufficient smart contracts (the money that they earn helps keeps the protocol going)
}
