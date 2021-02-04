import { v4 } from "uuid";

import { Todo } from "db/models/todo";
import { Folder } from "db/models/folder";

export class TodoService {
  async createTodo(params: { text: string; folderId: string }) {
    const { text, folderId } = params;
    const folder = await Folder.query().findById(folderId);

    if (!folder || !folder.id) {
      throw new Error("Folder was not found.");
    }
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

  async findTodo(options: { id?: string; text?: string }): Promise<Todo | undefined> {
    let data;

    if (options.id) {
      data = await Todo.query().findById(options.id);
    } else if (options.text) {
      data = await Todo.query().findOne({ text: options.text });
    }

    return data;
  }

  async findAll() {
    const data = await Todo.query().select();
    return data;
  }

  async findAllByFolderId(folderId: string) {
    const todos = await Todo.query().select().where({ folderId });
    return todos;
  }

  async updateTodoDone(payload: { todoId: string; done: boolean }) {
    const { todoId, done } = payload;
    const updatedTodo = await Todo.query().findById(todoId).patch({
      done: done,
    });

    return updatedTodo;
  }

  async deleteTodo(id: string) {
    const todoForDelete = await this.findTodo({ id });

    if (!todoForDelete) {
      return new Error("Todo for delete was not found.");
    } else {
      await Todo.query().delete().where({ id });
      return todoForDelete;
    }
  }
}
