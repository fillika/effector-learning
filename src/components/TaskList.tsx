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
        <div>
          <button>All</button>
          <button>Active</button>
          <button>Done</button>
        </div>
        <ul>
          {todos.map((todo) => (
            <Task todo={todo} key={todo.id} />
          ))}
        </ul>
      </div>
    </div>
  );
};
