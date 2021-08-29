import React, { useState } from "react";
import { useStore } from "effector-react";
import { $todos } from "../models/todos";
import { Task } from './Task';

export const TaskList = () => {
  const todos = useStore($todos);
  const [filter, setFilter] = useState("All");

  return (
    <div>
      <h2>Это таски</h2>
      <div>
        <div>
          <button onClick={() => setFilter("All")}>All</button>
          <button onClick={() => setFilter("Active")}>Active</button>
          <button onClick={() => setFilter("Done")}>Done</button>
        </div>
        <ul>
          {todos
            .filter((todo) => {
              if (todo.done && filter === "Done") return todo;
              if (!todo.done && filter === "Active") return todo;
              if (filter === "All") return todo;

              return null;
            })
            .map((todo) => (
              <Task {...todo} key={todo.id} />
            ))}
        </ul>
      </div>
    </div>
  );
};
