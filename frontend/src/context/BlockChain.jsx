import React, { createContext, useState } from "react";

export const BlockContext = createContext();
const BlockChain = (props) => {
  const [nftCnt, setNftCnt] = useState(0)

  return (
    <BlockContext.Provider
      value={{
        nftCnt,
        setNftCnt
      }}
    >
      {props.children}
    </BlockContext.Provider>
  );
};
export default BlockChain;
