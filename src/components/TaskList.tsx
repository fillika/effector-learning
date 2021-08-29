import React from "react";
import { useStore } from "effector-react";
import { $todos } from "../models/todos";
import { Task } from "./Task";

export const TaskList = () => {
  const todos = useStore($todos);

  return (
    <div>
      <h2>Это таски</h2>
      <div>
        <ul>
          {todos.map((todo) => (
            <Task key={todo.id} todo={todo} />
          ))}
        </ul>
      </div>
    </div>
  );
};
