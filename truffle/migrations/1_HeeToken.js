const HeeToken = artifacts.require('./HeeToken.sol');

module.exports = function (deployer) {
    deployer.deploy(HeeToken);
}