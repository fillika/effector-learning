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
export const toggleDoneEvent = createEvent<string>();

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
  .on(toggleDoneEvent, (state, id) => state.map(todo => {
    if (todo.id === id) {
      todo.done = !todo.done;
      return todo;
    }
    
    return todo;
  }))
  .on(deleteTaskEvent, (state, id) => state.filter((task) => task.id !== id));

$todos.watch((state) => console.log(state));
