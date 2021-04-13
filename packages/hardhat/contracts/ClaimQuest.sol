pragma solidity 0.7.6;
//SPDX-License-Identifier: MIT

import "hardhat/console.sol";
import "./TodoList.sol";

// Storage heavy implementation
contract ClaimQuest {

    

    mapping(address => TodoList) public tasks;
    mapping(address => uint) public balanceBySender;
    mapping(string => address) public pools;

    constructor(){
        // pools["defaultPool"] = "";
        // pools["lotteryPool"] = "";
    }   
    // cron job
    function cron() public {
        // for each pool call claim
    }

    // Function to receive Ether. msg.data must be empty
    receive() external payable {
        balanceBySender[msg.sender] =  balanceBySender[msg.sender] + msg.value;
    }

    // Fallback function is called when msg.data is not empty
    fallback() external payable {
        balanceBySender[msg.sender] =  balanceBySender[msg.sender] + msg.value;
    }

    // get contract balance
    function getTotalBalance() public view returns (uint) {
        return address(this).balance;
    }

    // get balance by sender
    function getBalance() public view returns (uint) {
        return balanceBySender[msg.sender];
    }
}
