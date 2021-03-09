pragma solidity 0.7.6;
//SPDX-License-Identifier: MIT

import "hardhat/console.sol";
import "./Todo.sol";

contract TodoList {
    //    Todo[] public todos;
    //    address public todoOwner;
    //    address public deployer;
    //    address private pool;
    //    constructor(address payable _deployer, address _pool) {
    //         todoOwner = payable(msg.sender);
    //         deployer = _deployer;
    //         pool = _pool;
    //    }
    //    function create(string memory _text, uint _deadline, address payable _deployer) public {
    //         require(msg.sender == todoOwner, "Only owner can update");
    //         Todo todo = new Todo({
    //                 _text: _text,
    //                 _deadline: _deadline,
    //                 _deployer: _deployer
    //             });
    //         todos.push(todo);
    //     }
    //     function getTodosLength() public view returns (uint256) {
    //         return todos.length;
    //     }
    // function getTodo(uint256 _index)
    //     public
    //     view
    //     returns (
    //         string memory text,
    //         bool completed,
    //         uint256 amountBet,
    //         uint256 deadline
    //     )
    // {
    //     Todo storage todo = todos[msg.sender][_index];
    //     return (todo.text, todo.completed, todo.amountBet, todo.deadline);
    // }
}
