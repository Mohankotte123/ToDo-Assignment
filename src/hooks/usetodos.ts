import { useAccount, useReadContract } from "wagmi";
import { useMemo } from "react";
import { contractConfig } from "../wagmi/contractConfig.ts";
import type { TodoItem } from "../types/TodoItem";

export const useTodos = () => {
  const { address } = useAccount();

  const { data, isLoading, error, refetch } = useReadContract({
    ...contractConfig,
    functionName: "getTodos",
    args: address ? [address] : undefined,
    query: { enabled: !!address }
  });

  const todos: TodoItem[] = useMemo(() => {
    if (!data) return [];

    return (data as any[]).map((t: any) => ({
      text: t.text,
      completed: t.completed,
    }));
  }, [data]);

  return { todos, isLoading, error, refetch };
};
