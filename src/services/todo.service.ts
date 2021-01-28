import { v4 } from "uuid";

import { Todo } from "db/models/todo";

export class TodoService {
  async createTodo(params: { text: string; folderId: string }) {
    const { text, folderId } = params;
    const newTodo = {
      id: v4(),
      text,
      done: false,
      folderId,
    };

    const createdTodo = await Todo.query()
      .insert(newTodo)
      .then((user) => user);

    return createdTodo;
  }

  async findTodo(options: { id?: string; text?: string }) {
    let data = {};

    switch (options) {
      case "id": {
        data = await Todo.query().findOne({ id: options.id });
        break;
      }

      case "text": {
        data = await Todo.query().findOne({ text: options.text });
        break;
      }
    }

    return data;
  }

  async findAll() {
    const data = await Todo.query().select();
    return data;
  }
}
