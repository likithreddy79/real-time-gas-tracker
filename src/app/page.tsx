'use client';

import { useEffect } from 'react';
import { useGasStore } from '@/store/useGasStore';
import { ethereumWS, polygonWS, arbitrumWS } from '@/utils/rpc';

export default function Home() {
  const {
    selectedChain,
    setSelectedChain,
    setGasData,
    chains
  } = useGasStore();

  useEffect(() => {
    const providerMap = {
      ethereum: ethereumWS,
      polygon: polygonWS,
      arbitrum: arbitrumWS,
    };

    const provider = providerMap[selectedChain];

    const fetch = async () => {
      try {
        const block = await provider.getBlock('latest');
        if (block && block.baseFeePerGas) {
          setGasData(selectedChain, {
            timestamp: block.timestamp,
            baseFee: Number(block.baseFeePerGas.toString()) / 1e9,
            priorityFee: 2
          });
        }
      } catch (e) {
        console.log('error getting block', e);
      }
    };

    const interval = setInterval(fetch, 6000);
    return () => {
      clearInterval(interval);
      provider.destroy();
    };
  }, [selectedChain]);

  const gas = chains[selectedChain];

  return (
    <main className="p-6">
      <h1 className="text-xl font-bold">Gas Tracker</h1>

      <div className="mt-4">
        <label>Select Chain: </label>
        <select
          className="p-2 border rounded"
          value={selectedChain}
          onChange={(e) => setSelectedChain(e.target.value as any)}
        >
          <option value="ethereum">Ethereum</option>
          <option value="polygon">Polygon</option>
          <option value="arbitrum">Arbitrum</option>
        </select>
      </div>

      <div className="mt-4">
        <p>Base Fee: {gas.baseFee} Gwei</p>
        <p>Priority Fee: {gas.priorityFee} Gwei</p>
      </div>
    </main>
  );
}