import React, { useEffect } from "react";
import { createEvent, createStore } from "effector";
import { deleteTaskEvent, Todo } from "../models/todos";
import { createComponent } from "effector-react";

export const Task: React.FC<{ todo: Todo }> = React.memo(({ todo }) => {
  const $store = createStore(todo);
  const isDoneEvent = createEvent();
  const changeEvent = createEvent<string>();
  const unmount = createEvent();

  $store
    .on(isDoneEvent, (state) => ({
      ...state,
      done: !state.done,
    }))
    .on(changeEvent, (state, text) => ({
      ...state,
      text,
    }))
    .off(unmount);

  useEffect(() => {
    return () => {
      console.log("UNMOUNT");
      unmount();
    };
  }, [unmount]);

  useEffect(() => console.log("RENDER_Task"));

  const TaskItem = createComponent($store, (props, store) => {
    const styles = {
      marginBottom: "0.5em",
    };
    const deleteHandler = () => deleteTaskEvent(store.id);
    const doneHandler = () => isDoneEvent();

    return (
      <li style={styles}>
        <input
          value={store.text}
          onChange={(e) => changeEvent(e.target.value)}
          type="text"
          id={store.id}
          disabled={store.done}
        />
        <div>
          <button onClick={doneHandler}>Done</button>
          <button onClick={deleteHandler} disabled={store.done}>
            Delete task
          </button>
        </div>
      </li>
    );
  });

  return <TaskItem />;
});
