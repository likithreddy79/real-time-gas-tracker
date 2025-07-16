import { create } from 'zustand';

type GasPoint = {
  timestamp: number;
  baseFee: number;
  priorityFee: number;
};

type Chain = 'ethereum' | 'polygon' | 'arbitrum';

type State = {
  mode: 'live' | 'simulation';
  selectedChain: Chain;
  usdPrice: number;
  chains: {
    ethereum: { baseFee: number; priorityFee: number; history: GasPoint[] };
    polygon: { baseFee: number; priorityFee: number; history: GasPoint[] };
    arbitrum: { baseFee: number; priorityFee: number; history: GasPoint[] };
  };
  setGasData: (chain: Chain, data: GasPoint) => void;
  setSelectedChain: (chain: Chain) => void;
  setUSDPrice: (price: number) => void;
  setMode: (mode: 'live' | 'simulation') => void;
};

export const useGasStore = create<State>((set) => ({
  mode: 'live',
  selectedChain: 'ethereum',
  usdPrice: 0,
  chains: {
    ethereum: { baseFee: 0, priorityFee: 0, history: [] },
    polygon: { baseFee: 0, priorityFee: 0, history: [] },
    arbitrum: { baseFee: 0, priorityFee: 0, history: [] },
  },
  setGasData: (chain, data) =>
    set((state) => {
      return {
        chains: {
          ...state.chains,
          [chain]: {
            baseFee: data.baseFee,
            priorityFee: data.priorityFee,
            history: [...state.chains[chain].history, data],
          },
        },
      };
    }),
  setSelectedChain: (chain) => set({ selectedChain: chain }),
  setUSDPrice: (price) => set({ usdPrice: price }),
  setMode: (mode) => set({ mode }),
}));