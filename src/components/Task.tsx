import React, { useEffect } from "react";
import { createEvent, createStore } from "effector";
import { deleteTaskEvent, Todo, toggleDoneEvent } from "../models/todos";
import { createComponent } from "effector-react";

export const Task: React.FC<{ todo: Todo }> = React.memo(({ todo }) => {
  const $store = createStore(todo);
  const changeEvent = createEvent<string>();
  const unmount = createEvent();

  $store
    .on(changeEvent, (state, text) => ({
      ...state,
      text,
    }))
    .off(unmount);

  useEffect(() => () => unmount(), [unmount]);
  useEffect(() => console.log("RENDER_Task"));

  const TaskItem = createComponent($store, (props, store) => {
    const styles = {
      marginBottom: "0.5em",
    };

    const deleteHandler = () => deleteTaskEvent(store.id);
    const doneHandler = () => toggleDoneEvent(store.id);
    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
      changeEvent(e.target.value);

    return (
      <li style={styles}>
        <input
          value={store.text}
          onChange={changeHandler}
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
