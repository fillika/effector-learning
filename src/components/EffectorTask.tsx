import React, { useEffect } from "react";
import { createEvent, createStore } from "effector";
import { Todo } from "./../models/todos";
import { createComponent } from "effector-react";

export const Task: React.FC<{ todo: Todo }> = ({ todo }) => {
  const $store = createStore(todo);
  const isDoneEvent = createEvent();
  const unmount = createEvent();

  $store
    .on(isDoneEvent, (state) => ({
      ...state,
      done: !state.done,
    }))
    .off(unmount);

  useEffect(() => {
    return () => {
      console.log('UNMOUNT');
      unmount();
    };
  }, [unmount]);

  const TaskItem = createComponent($store, (props, store) => {
    return (
      <li onClick={() => isDoneEvent()}>
        <div>{store.id}</div>
        <div>{store.text}</div>
        <div>{store.done ? "true" : "false"}</div>
      </li>
    );
  });

  return <TaskItem />;
};
