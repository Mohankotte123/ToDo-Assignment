import React, { useEffect, useState } from "react";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { contractConfig } from "../../wagmi/contractConfig.ts";

const AddTodo: React.FC<{ onAdded: () => void }> = ({ onAdded }) => {
  const [text, setText] = useState("");
  const [isFocused, setIsFocused] = useState(false); // <-- Add this state
  // ... rest of the component

  const { data: txHash, writeContract, isPending } = useWriteContract();
  const receipt = useWaitForTransactionReceipt({ hash: txHash });

  useEffect(() => {
    if (receipt.isSuccess) onAdded();
  }, [receipt.isSuccess, onAdded]);

  const handleAdd = async () => {
    if (!text.trim()) return alert("Enter todo text");

    await writeContract({
      ...contractConfig,
      functionName: "addTodo",
      args: [text.trim()],

    });

    setText("");
  };

  return (
    <div style={{ display: "flex", gap: 12, margin: "20px auto", maxWidth: "500px" }}>
      {/* Input Styling */}
      <input
        style={{
          flex: 1,
          padding: '10px 12px',
          borderRadius: 8,
          // Base Border: Lighter when not focused
          border: isFocused ? "2px solid #007bff" : "2px solid #b3d9ff",
          outline: 'none',
          fontSize: '16px',
          // Base Shadow
          boxShadow: isFocused
            ? '0 0 0 3px rgba(0, 123, 255, 0.3)' // 🚨 ENHANCED FOCUS RING SHADOW
            : '0 2px 4px rgba(0, 123, 255, 0.1)',
          transition: 'border-color 0.3s, box-shadow 0.3s',
        }}
        placeholder="New todo..."
        value={text}
        onChange={(e) => setText(e.target.value)}

        // 🚨 ADD FOCUS EVENTS
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />

      {/* Button Styling */}
      <button
        onClick={handleAdd}
        disabled={isPending}
        style={{
          padding: '10px 20px',
          borderRadius: 8,
          border: 'none',
          backgroundColor: isPending ? '#cccccc' : '#28a745', // Green when ready, Gray when pending
          color: 'white',
          fontWeight: 'bold',
          fontSize: '16px',
          cursor: isPending ? 'not-allowed' : 'pointer',
          transition: 'background-color 0.3s, opacity 0.3s',
          opacity: isPending ? 0.8 : 1,
          boxShadow: isPending ? 'none' : '0 4px 6px rgba(40, 167, 69, 0.3)', // Green shadow
        }}
      >
        {isPending ? "Adding..." : "Add"}
      </button>
    </div>
  );
};

export default AddTodo;
