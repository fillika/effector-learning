import React from "react";
import { Todo, toggleTaskEvent } from "./../models/todos";

export const Task: React.FC<{ todo: Todo }> = React.memo(({ todo }) => {
  const styles = {
    textDecoration: todo.done ? "line-through" : "none",
  };
  return (
    <li style={styles} onClick={() => toggleTaskEvent(todo.id)}>
      {todo.text}
    </li>
  );
});
