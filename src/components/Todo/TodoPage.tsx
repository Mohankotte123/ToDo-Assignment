import React, { useEffect } from "react";
import { useAccount, useWriteContract } from "wagmi";
import { useTodos } from "../../hooks/usetodos.ts";
import AddTodo from "./AddTodo.tsx";
import TodoList from "./TodoList.tsx";
import { contractConfig } from "../../wagmi/contractConfig.ts";


const TodoPage: React.FC = () => {
  const { isConnected } = useAccount();
  const { todos, isLoading, refetch } = useTodos();
  const [togglePending, setTogglePending] = React.useState<{ [key: number]: boolean }>({});

  // toggle functionality
  const {writeContract: toggleTodo} = useWriteContract();


  const [isContentVisible, setIsContentVisible] = React.useState(false);

  // Set the content to visible shortly after mounting
  useEffect(() => {
    // Timeout ensures the initial render finishes, allowing the transition to fire
    const timer = setTimeout(() => {
      setIsContentVisible(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);



  const handleToggle = async (index: number) => {
    try {
      setTogglePending((prev) => ({ ...prev, [index]: true }));

      await toggleTodo({
        ...contractConfig,
        functionName: "toggleTodo",
        args: [index],
      });

      // wait for the transaction to be mined
      // optional if you use wagmi receipt hook
      // await toggleReceipt.wait(); // or publicClient.waitForTransactionReceipt({ hash: toggleHash })

      refetch(); // refresh todos
    } catch (err) {
      console.error(err);
    } finally {
      setTogglePending((prev) => ({ ...prev, [index]: false }));
    }
  };


  if (!isConnected)
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: "120px",

          // Aesthetic Enhancements
          maxWidth: '400px', // Limit width for better presentation
          margin: '120px auto 0 auto', // Center the block horizontally
          padding: '30px',
          borderRadius: '12px',
          border: '2px solid #007bff', // Prominent blue border
          backgroundColor: '#e6f0ff', // Very light blue background
          boxShadow: '0 4px 15px rgba(0, 123, 255, 0.2)', // Blue shadow
        }}
      >
        <h2
          style={{
            color: '#007bff', // Primary blue text color
            fontSize: '24px',
            margin: 0,
          }}
        >
          Please connect wallet to view your Todos. 🔗
        </h2>
      </div>
    );

  return (
    <div
      style={{
        // 🚨 ADDITIONS FOR SMOOTH EFFECT
        opacity: isContentVisible ? 1 : 0,
        transition: 'opacity 0.6s ease-in-out', // Smooth fade duration

        // Existing Container Styling
        maxWidth: 650,
        width: '95%',
        margin: "30px auto",
        padding: 25,
        backgroundColor: '#ffffff',
        borderRadius: 12,
        border: '1px solid #007bff',
        boxShadow: '0 8px 25px rgba(0, 123, 255, 0.3)',
      }}
    >
      {/* ... (rest of the content: header, AddTodo, TodoList, etc.) ... */}
      {/* Header Styling */}
      <h2
        style={{
          textAlign: 'center',
          color: '#007bff', // Primary blue color for the title
          marginBottom: '25px',
          borderBottom: '2px solid #007bff', // Use the primary blue for the underline
          paddingBottom: '10px',
          fontSize: '28px',
        }}
      >
        Your Todos ✨
      </h2>

      <AddTodo onAdded={() => refetch()} />

      {/* Loading State */}
      {isLoading ? (
        <p style={{ textAlign: 'center', color: '#666', marginTop: '20px' }}>Loading...</p>
      ) : (
        <TodoList todos={todos} onToggle={handleToggle} togglePending={togglePending} />
      )}
    </div>
  );
};

export default TodoPage;
