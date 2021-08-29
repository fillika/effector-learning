import { ExecOptionsWithStringEncoding } from "child_process";
import React, { useEffect } from "react";
import {
  deleteTaskEvent,
  Todo,
  toggleDoneEvent,
  changeEvent,
} from "../models/todos";

export const Task: React.FC<{ id: string; text: string; done: boolean }> =
  React.memo(({ id, text, done }) => {
    useEffect(() => console.log("RENDER_Task"));

    return (
      <li>
        <div>
          <input
            value={text}
            onChange={(e) => changeEvent({ id: id, text: e.target.value })}
            disabled={done}
            type="text"
          />
        </div>

        <div>
          <button onClick={() => toggleDoneEvent(id)}>Done</button>
          <button onClick={() => deleteTaskEvent(id)}>Delete</button>
        </div>
      </li>
    );
  });
