import { useStore } from "effector-react";
import React from "react";
import { $activeTask, inputTaskEvent } from "../models/activeTask";
import { formSubmitEvent } from "./../models/activeTask";

export const AddTask = () => {
  const inputValue = useStore($activeTask);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    inputTaskEvent(e.target.value);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    formSubmitEvent();
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <input type="text" value={inputValue} onChange={changeHandler} />
        <button>Add task</button>
      </form>
    </div>
  );
};
