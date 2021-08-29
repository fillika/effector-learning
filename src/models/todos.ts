import { createStore, createEvent, sample } from "effector";
import { $activeTask, clearValue, formSubmitEvent } from "./activeTask";

export interface Todo {
  id: string;
  text: string;
  done: boolean;
}

export type TodosStore = Todo[];

export const $todos = createStore<TodosStore>([]);
export const addTaskEvent = createEvent<Todo>();
export const deleteTaskEvent = createEvent<string>();

sample({
  clock: formSubmitEvent,
  source: $activeTask,
  fn: (value, _): Todo => ({
    id: new Date().getTime().toString(32),
    text: value,
    done: false,
  }),
  target: [addTaskEvent, clearValue],
});

$todos
  .on(addTaskEvent, (state, todo) => [...state, todo])
  .on(deleteTaskEvent, (state, id) => state.filter((task) => task.id !== id));
