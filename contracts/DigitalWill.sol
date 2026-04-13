// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DigitalWill {
    address public owner;
    address public beneficiary;
    bool public isDeceased;

    constructor(address _beneficiary) payable {
        owner = msg.sender;
        beneficiary = _beneficiary;
        isDeceased = false;
    }

    function declareDeceased() public {
        require(msg.sender == owner, "Only owner");
        isDeceased = true;
    }

    function withdraw() public {
        require(isDeceased, "Still alive");
        require(msg.sender == beneficiary, "Not beneficiary");
        payable(beneficiary).transfer(address(this).balance);
    }

    receive() external payable {}
}