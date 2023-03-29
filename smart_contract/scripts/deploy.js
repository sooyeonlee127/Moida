// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
    // 배포할 컨트랙트 이름을 getContractfactory의 매개변수로 주면 된다.
    const HeeToken = await hre.ethers.getContractFactory("HeeToken");
    const heeToken = await HeeToken.deploy(); // 생성자의 매개변수를 deploy에 넣는다.

    await heeToken.deployed();

    console.log(`HeeToken complete deployed yo ${heeToken.address}`);

    // 배포할 컨트랙트 이름을 getContractfactory의 매개변수로 주면 된다.
    const Donation = await hre.ethers.getContractFactory("Donation");
    const donation = await Donation.deploy(); // 생성자의 매개변수를 deploy에 넣는다.

    await donation.deployed();

    console.log(`Donation complete deployed yo ${donation.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
