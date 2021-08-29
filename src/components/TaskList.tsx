import React, { useState } from "react";
import { useStore } from "effector-react";
import { $todos } from "../models/todos";
import { Task } from "./Task";
import { Todo } from "./../models/todos";

export const TaskList = () => {
  const todos = useStore($todos);
  const [filter, setFilter] = useState("All");

  const filterHandler = (todo: Todo) => {
    switch (filter) {
      case "All":
        return todo;

      case "Active":
        return todo.done === true ? null : todo;

      case "Done":
        return todo.done === true ? todo : null;

      default:
        return todo;
    }
  };

  const mappedTask = (todo: Todo) => <Task todo={todo} key={todo.id} />;

  const renderedTaskList = todos.filter(filterHandler).map(mappedTask);

  return (
    <div>
      <h2>Это таски</h2>
      <div>
        <div>
          <button onClick={() => setFilter("All")}>All</button>
          <button onClick={() => setFilter("Active")}>Active</button>
          <button onClick={() => setFilter("Done")}>Done</button>
        </div>
        <ul>{renderedTaskList}</ul>
      </div>
    </div>
  );
};
