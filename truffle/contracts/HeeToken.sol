// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// ERC20을 상속받아서 HeeToken 생성
// ERC20 : fungible token의 표준
contract HeeToken is ERC20 {
    uint256 public _totalSupply = 10000000000 * (10 ** decimals());
    
    constructor() ERC20("HeeToken", "Moi") {
        _mint(msg.sender,_totalSupply);
    }

    // 1 ETH를 받으면 10000000000 토큰을 지급하는 함수
    receive() external payable {
        uint256 tokenAmount = msg.value * 10000000000;
        _mint(msg.sender, tokenAmount);
    }
}