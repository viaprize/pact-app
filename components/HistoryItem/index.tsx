import React, { useEffect, useState } from "react";
import Contribute from "../Contribute";
import usePactContract from "contract/usePactContract";
import config from "@/config";

export default function HistoryItem({ item, onRefresh }: any) {
  // const getDetail = async () => {};
  const pactContract = usePactContract();

  const doResolve = async () => {
    await pactContract.resolve(item.address);
    onRefresh();
  };

  

  // useEffect(() => {
  //   if (!address) {
  //     return;
  //   }
  //   getDetail();
  // }, [address]);
  return (
    <div className="card bg-base-100 shadow-xl mb-4">
      <div className="card-body break-words">
        <div className="card-title break-words">{item.name}</div>
        <div className="mt-1">Terms: {item.terms}</div>
        <div className="mt-1">Balance: {item.balance} ETH</div>
        <div>
          <div className="font-bold mb-1">Pact Address:</div>
          <a
            href={`${config.scanUrl}/address/${item.address}`}
            rel="noreferrer"
            className="font-mono mt-1 underline"
            target="_blank"
          >
            <h2>{item.address}</h2>
          </a>
        </div>

        {item.resolved && item.safeAddress && (
          <div>
            <div className="font-bold mb-1">Safe Address: </div>
            <a
              href={`${config.scanUrl}/address/${item.safe}`}
              rel="noreferrer"
              className="font-mono mt-1 underline"
              target="_blank"
            >
              {item.safeAddress}
            </a>{" "}
          </div>
        )}

        {item.resolvable && !item.resolved && (
          <button className="btn" onClick={() => doResolve()}>
            Resolve
          </button>
        )}

        {item.resolved && (
          <button className="btn btn-success text-white mt-2">Resolved</button>
        )}

        {!item.resolvable && !item.resolved && (
          <div>
            <Contribute address={item.address} onContributed={onRefresh} />
          </div>
        )}
      </div>
    </div>
  );
}
