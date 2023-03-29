const HeeToken = artifacts.require('HeeToken');

module.exports = function (deployer) {
    deployer.deploy(HeeToken);
}