import { v4 } from "uuid";

import { Todo } from "db/models/todo";

export async function CreateTodo(text: any) {
  const newTodo = {
    id: v4(),
    text,
    done: false,
  };

  const createdTodo = await Todo.query()
    .insert(newTodo)
    .then((user) => user);

  return createdTodo;
}
