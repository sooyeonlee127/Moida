import React, { useState } from "react";

const WalletCreate = () => {
    return <div>Wallet Create</div>;
};

export default WalletCreate;

// // import elliptic from "elliptic";
// const elliptic = require("elliptic");
// const { keccak256 } = require("web3-utils");
// const privKey =
//   "f8f8a2f43c8376ccb0871305060d7b27b0554d2cc72bccf41b2705608452f315";
// // const privKey = process.argv[2];
// console.log("개인키 : " + privKey);
// const ec = new elliptic.ec("secp256k1");

// const keyPair = ec.keyFromPrivate(privKey);
// pubKey = keyPair.getPublic().encode("hex");

// console.log("공개키 : " + pubKey);

// const address =
//   "0x" + keccak256(Buffer.from(pubKey.slice(2), "hex")).slice(-40);
// console.log("주소 : " + address);
