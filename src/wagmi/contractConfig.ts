import type { Abi } from "viem";


// Paste your ABI here
import TodoAbi from "../utils/abi.json";

export const CONTRACT_ADDRESS = import.meta.env.VITE_APP_CONTRACTADDRESS || "";

export const contractConfig = {
  address: CONTRACT_ADDRESS as `0x${string}`,
  abi: TodoAbi as Abi,
} as const;
