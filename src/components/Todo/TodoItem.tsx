import React from "react";
import type { TodoItem } from "../../types/TodoItem";

const TodoItemRow: React.FC<{
  todo: TodoItem;
  index: number;
  onToggle: (i: number) => void;
  togglePending: boolean;
}> = ({ todo, index, onToggle, togglePending }) => {
  // Use a variable to make style application cleaner
  const isCompleted = todo.completed;

  return (
    <li
      style={{
        // 🚨 Base LI Styling: Ensure fluid dimensions
        padding: 12, // Slight increase padding
        marginBottom: 8,

        // Structure: Flexible layout
        display: "flex",
        flexDirection: 'row', // Default: Row layout
        alignItems: 'center',
        justifyContent: "space-between",
        gap: '10px', // Space between text block and button

        // Theming (Keeping colors and border logic from previous steps)
        border: `1px solid ${isCompleted ? '#28a745' : '#dee2e6'}`, // Neutral border
        borderLeft: `5px solid ${isCompleted ? '#28a745' : '#007bff'}`, // Status bar
        borderRadius: 8,
        transition: 'background-color 0.2s',
        backgroundColor: '#ffffff', // Explicit background for clarity
      }}
      onClick={() => onToggle(index)} // Allows toggling by clicking anywhere but the button container
    >
      {/* Text Content Area */}
      <div
        style={{ flexGrow: 1, minWidth: 0 }} // Ensures text can shrink/wrap
        onClick={(e) => e.stopPropagation()} // Stop event propagation for internal clicks
      >
        <div
          style={{
            fontWeight: 600,
            // Ensures text wraps instead of overflowing
            overflowWrap: 'break-word',
            wordBreak: 'break-word',
            color: isCompleted ? '#28a745' : '#333',
            textDecoration: isCompleted ? 'line-through' : 'none',
          }}
        >
          {todo.text}
        </div>

        <div
          style={{
            fontSize: 12,
            color: isCompleted ? '#28a745' : '#007bff',
            opacity: 0.8,
            marginTop: '2px'
          }}
        >
          {isCompleted ? "Completed" : "Pending"}
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={(e) => { e.stopPropagation(); onToggle(index); }} // Stop propagation and toggle
        disabled={togglePending}
        style={{
          // 🚨 FIX FOR SIZE: Use fixed padding and minWidth
          padding: '10px 18px',
          borderRadius: 8,
          border: 'none',

          // Use flex properties to maintain spacing but allow shrinking
          flexShrink: 0,
          minWidth: '95px', // Guaranteed minimum size

          // Color Logic
          backgroundColor: togglePending
            ? '#cccccc'
            : isCompleted ? '#dc3545' : '#007bff',

          // Text and Visuals
          color: 'white',
          fontWeight: 'bold',
          fontSize: '15px',
          cursor: togglePending ? 'not-allowed' : 'pointer',
          boxShadow: togglePending ? 'none' : '0 4px 6px rgba(0, 0, 0, 0.1)',
          transition: 'background-color 0.2s, box-shadow 0.2s, opacity 0.2s',
          opacity: togglePending ? 0.7 : 1,
        }}
      >
        {togglePending
          ? "..."
          : isCompleted ? "Undo" : "Complete"}
      </button>
    </li>
  );
};

export default TodoItemRow;