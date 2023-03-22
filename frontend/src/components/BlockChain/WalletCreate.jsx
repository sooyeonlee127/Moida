// 참조 : https://bitkunst.tistory.com/entry/BlockChain-%EB%B8%94%EB%A1%9D%EC%B2%B4%EC%9D%B8-%EC%A7%80%EA%B0%91-%EC%84%9C%EB%B2%84-%EB%A7%8C%EB%93%A4%EA%B8%B0-1
import React, { useState } from "react";

import elliptic from "elliptic";
import { randomBytes } from "crypto";
import { SHA256 } from "crypto-js";
// import fs from "fs";
import path from "path";

const ec = new elliptic.ec("secp256k1");
const dir = path.join(__dirname, "../data");

console.log(dir);
const WalletCreate = () => {
  const getPrivateKey = () => {
    return randomBytes(32).toString("hex");
  };

  const getPublicKey = (privateKey) => {
    const keyPair = ec.keyFromPrivate(privateKey);

    return keyPair.getPublic().encode("hex", true);
  };

  const getAccount = (publicKey) => {
    return Buffer.from(publicKey).slice(26).toString();
  };

  const privateKey = getPrivateKey();
  const publicKey = getPublicKey(privateKey);
  const account = getAccount(publicKey);

  const createWallet = (privateKey, publicKey, account) => {
    console.log("createWallet 실행");

    const filename = path.join(dir, account);
    console.log("Filename : " + filename);

    const filecontent = privateKey;
    console.log("FileContent : " + filecontent);

    // 원래는 지정 경로에 파일을 생성 및 저장해야함
    // but 리액트에서는 fs 쓸 수 없는듯 .. 여기서 오류 발생
    // fs.writeFileSync(filename, filecontent);
  };

  return (
    <div>
      Wallet Create
      <div>개인키 : {privateKey}</div>
      <div>공개키 : {publicKey}</div>
      <div>주소 : {account}</div>
      <button onClick={() => createWallet(privateKey, publicKey, account)}>
        버튼입니다
      </button>
    </div>
  );
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
