'use client';

import { useEffect } from 'react';
import { useGasStore } from '@/store/useGasStore';
import { ethereumWS, polygonWS, arbitrumWS } from '@/utils/rpc';
import type { Block } from 'ethers';

export default function Home() {
  const setGasData = useGasStore((state) => state.setGasData);
  const chains = useGasStore((state) => state.chains);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        // Ethereum
        const ethBlock = await ethereumWS.getBlock('latest') as Block;
        if (ethBlock?.baseFeePerGas) {
          setGasData('ethereum', {
            timestamp: ethBlock.timestamp,
            baseFee: Number(ethBlock.baseFeePerGas.toString()) / 1e9,
            priorityFee: 2,
          });
        }

        // Polygon
        const polygonBlock = await polygonWS.getBlock('latest') as Block;
        if (polygonBlock?.baseFeePerGas) {
          setGasData('polygon', {
            timestamp: polygonBlock.timestamp,
            baseFee: Number(polygonBlock.baseFeePerGas.toString()) / 1e9,
            priorityFee: 1.5,
          });
        }

        // Arbitrum
        const arbitrumBlock = await arbitrumWS.getBlock('latest') as Block;
        if (arbitrumBlock?.baseFeePerGas) {
          setGasData('arbitrum', {
            timestamp: arbitrumBlock.timestamp,
            baseFee: Number(arbitrumBlock.baseFeePerGas.toString()) / 1e9,
            priorityFee: 0.5,
          });
        }

      } catch (err) {
        console.error('Gas fetch error:', err);
      }
    }, 6000);

    return () => clearInterval(interval);
  }, [setGasData]);

  return (
    <main className="p-6">
      <h1 className="text-xl font-bold mb-4">Multi-Chain Gas Tracker</h1>

      <div className="space-y-4">
        <div>
          <h2 className="font-semibold text-lg">Ethereum</h2>
          <p>Base Fee: {chains.ethereum.baseFee} Gwei</p>
          <p>Priority Fee: {chains.ethereum.priorityFee} Gwei</p>
        </div>

        <div>
          <h2 className="font-semibold text-lg">Polygon</h2>
          <p>Base Fee: {chains.polygon.baseFee} Gwei</p>
          <p>Priority Fee: {chains.polygon.priorityFee} Gwei</p>
        </div>

        <div>
          <h2 className="font-semibold text-lg">Arbitrum</h2>
          <p>Base Fee: {chains.arbitrum.baseFee} Gwei</p>
          <p>Priority Fee: {chains.arbitrum.priorityFee} Gwei</p>
        </div>
      </div>
    </main>
  );
}
