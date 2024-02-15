"use client";
import React, { useState, useEffect } from "react";
import { useWalletContext } from "../store/Wallet";

const MetamaskConnect = () => {
  const { connect, accounts } = useWalletContext();
  return (
    <div className="flex flex-col">
      <div className=" flex-col"></div>
      <div className=" overflow-hidden text-ellipsis">
        {accounts.map((account, _i) => (
          <div key={account}>{`${_i}: ${account}`}</div>
        ))}
      </div>
    </div>
  );
};

export default MetamaskConnect;
