import { createStore, createEvent } from "effector";

export const $activeTask = createStore("");

export const inputTaskEvent = createEvent<string>();
export const formSubmitEvent = createEvent();
export const clearValue = createEvent<any>();

$activeTask.on(inputTaskEvent, (_, value) => value).reset(clearValue)