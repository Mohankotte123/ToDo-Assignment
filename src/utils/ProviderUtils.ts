import {
  bscTestnet,
  bsc,
  polygon,
  avalanche,
  avalancheFuji,
  sonic,
} from "wagmi/chains";
import { defineChain } from 'viem';
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import {
  metaMaskWallet,
  walletConnectWallet,
  coinbaseWallet,
  trustWallet,
  binanceWallet,
  rainbowWallet,
  phantomWallet,
  rabbyWallet,
  ledgerWallet,
  okxWallet,
  braveWallet,
  argentWallet,
  uniswapWallet,
  safepalWallet,
} from "@rainbow-me/rainbowkit/wallets";

const sonicTestnetChain = defineChain({
  id: 14601,
  name: 'Sonic Testnet',
  nativeCurrency: { name: 'Sonic', symbol: 'S', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://rpc.testnet.soniclabs.com'],
    },
  },
  blockExplorers: {
    default: {
      name: 'SonicScan',
      url: 'https://testnet.sonicscan.org',
    },
  },
  testnet: true,
});

const anvil = defineChain({
  id: 31337,
  name: 'anvil',
  nativeCurrency: { name: 'anvil', symbol: 'A', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['http://127.0.0.1:8545/'],
    },
  },
  blockExplorers: {
    default: {
      name: 'SonicScan',
      url: 'https://testnet.sonicscan.org',
    },
  },
  testnet: true,
});

const polygonAmoy = defineChain({
  id: 80002,
  name: 'Amoy',
  nativeCurrency: { name: 'Amoy', symbol: 'Pol', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://rpc-amoy.polygon.technology'],
    },
  },
  blockExplorers: {
    default: {
      name: 'AmoyPolygon',
      url: 'https://amoy.polygonscan.com/',
    },
  },
  testnet: true,
});
export const getNetwork = () => {
  const chainId = import.meta.env.VITE_APP_APPKIT_CHAIN_ID;
  switch (chainId) {
    case "bsc":
      return bsc;
    case "bscTestnet":
      return bscTestnet;
    case "polygon":
      return polygon;
    case "polygonAmoy":
      return polygonAmoy;
    case "avax":
      return avalanche;
    case "avaxFuji":
      return avalancheFuji;
    case "sonic":
      return sonic; 
    case "sonicTestnet":
      return sonicTestnetChain;
    case "anvil":
      return anvil;
    default:
      throw new Error(`Unsupported chain ID: ${chainId}`);
  }
};
export const getWalletSymbol = () => {
  const chainId = import.meta.env.VITE_APP_APPKIT_CHAIN_ID;
  const chainIdMap: Record<string, string> = {
    bsc: "BNB",
    bscTestnet: "BNB",
    polygon: "POL",
    polygonAmoy: "POL",
    avax: "AVAX",
    avaxFuji: "AVAX",
    sonic: "S",
    sonicTestnet: "S",
    anvil : "A"
  };
  if (chainId in chainIdMap) {
    return chainIdMap[chainId];
  }
  throw new Error(`Unsupported chain ID: ${chainId}`);
};
export const getWalletChainId = () => {
  const chainId = import.meta.env.VITE_APP_APPKIT_CHAIN_ID;
  const chainIdMap: Record<string, number> = {
    bsc: 56,
    bscTestnet: 97,
    polygon: 137,
    polygonAmoy: 80002,
    avax: 43114,
    avaxFuji: 43113,
    sonic: 146,
    sonicTestnet: 14601,
    anvil: 31337
  };
  if (chainId in chainIdMap) {
    return chainIdMap[chainId];
  }
  throw new Error(`Unsupported chain ID: ${chainId}`);
};
export const walletConfig = getDefaultConfig({
  appName: import.meta.env.VITE_APP_TITLE || "",
  projectId: import.meta.env.VITE_APP_PROJECT_ID || "",
  chains: [getNetwork()],
  wallets: [
    {
      groupName: "Recommended",
      wallets: [
        metaMaskWallet,
        trustWallet,
        walletConnectWallet,
        coinbaseWallet,
      ],
    },
    {
      groupName: "Others",
      wallets: [
        binanceWallet,
        rainbowWallet,
        phantomWallet,
        rabbyWallet,
        ledgerWallet,
        okxWallet,
        braveWallet,
        argentWallet,
        uniswapWallet,
        safepalWallet,
      ],
    },
  ],
});
