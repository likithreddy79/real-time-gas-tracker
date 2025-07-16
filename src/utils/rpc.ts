import { ethers } from 'ethers';

export const ethereumWS = new ethers.WebSocketProvider(
  'wss://eth-mainnet.g.alchemy.com/v2/lWJ3HwIJzMf7jceHKVtiptVCdU_nBaWh'
);

export const polygonWS = new ethers.WebSocketProvider(
  'wss://polygon-mainnet.g.alchemy.com/v2/hyJRkh9gEwoRM9n1LXD1y'
);

export const arbitrumWS = new ethers.WebSocketProvider(
  'wss://arb-mainnet.g.alchemy.com/v2/ixswyDoKeRn3cgYTt1i5V'
);