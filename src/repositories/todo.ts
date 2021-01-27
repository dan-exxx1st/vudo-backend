import { Todo } from "db/models/todo";
import { v4 } from "uuid";

export class TodoRepository {
  oneData: {};
  allData: {};

  constructor() {
    this.oneData = {};
    this.allData = {};
  }

  async find(options: { done?: boolean }) {
    if (options.done) {
      const todo = await Todo.query().findOne({ done: options.done });
      this.oneData = todo;
    }

    return this.oneData;
  }

  async create(text: string) {
    const todo = {
      id: v4(),
      text,
      done: false,
    };
    const newTodo = await Todo.query().insert(todo);
    return newTodo;
  }
}
