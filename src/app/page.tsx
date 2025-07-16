'use client';

import { useEffect } from 'react';
import { useGasStore } from '@/store/useGasStore';
import { ethereumWS } from '@/utils/rpc';
import type { Block } from 'ethers';

export default function Home() {
  const setGasData = useGasStore((state) => state.setGasData);
  const chains = useGasStore((state) => state.chains);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const block = await ethereumWS.getBlock('latest') as Block;
        if (!block || !block.baseFeePerGas) return;

        setGasData('ethereum', {
          timestamp: block.timestamp,
          baseFee: Number(block.baseFeePerGas.toString()) / 1e9,
          priorityFee: 2,
        });
      } catch (error) {
        console.error('Error fetching block:', error);
      }
    }, 6000);

    return () => clearInterval(interval);
  }, [setGasData]); // ✅ now correct

  return (
    <main className="p-6">
      <h1 className="text-xl font-bold">Ethereum Gas Tracker</h1>
      <div className="mt-4">
        <p>Base Fee: {chains.ethereum.baseFee} Gwei</p>
        <p>Priority Fee: {chains.ethereum.priorityFee} Gwei</p>
      </div>
    </main>
  );
}
