import React from "react";
import TodoItem from "./TodoItem";
import type { TodoItem as TItem } from "../../types/TodoItem";

const TodoList: React.FC<{
  todos: TItem[];
  onToggle: (i: number) => void;
  togglePending: { [key: number]: boolean }; // ✅ now it's an object
}> = ({ todos, onToggle, togglePending }) => {
  if (!todos.length) return <p>No todos found</p>;

 
  return (
    <ul style={{ padding: 0, listStyle: "none" }}>
      {todos.map((t, i) => (
        <TodoItem
          key={i}
          todo={t}
          index={i}
          onToggle={onToggle}
          togglePending={!!togglePending[i]} // ✅ pass individual boolean
        />
      ))}
    </ul>
  );
};

export default TodoList;
