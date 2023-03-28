// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "hardhat/console.sol";

// ERC20을 상속받아서 HeeToken 생성
// ERC20 : fungible token의 표준
contract HeeToken is ERC20 {
    uint public INITIAL_SUPPLY = 100000 * 10**18;


    // 생성자 : 배포될 때 호출
    constructor() ERC20("HeeToken", "Moi") {
        _mint(msg.sender, INITIAL_SUPPLY);
    }

    // ERC20에 존재하는 decimals()를 override
    function decimals() public view virtual override returns (uint8) {
        // 토큰의 양을 나눌 수 있는 소수 자릿수
        return 18;
    }
}