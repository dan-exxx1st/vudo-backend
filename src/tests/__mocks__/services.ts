import { MockedFoldersData, MockedTodosData } from "./data";

class TodoServiceMock {
  todos: { id: string; text: string; done: boolean; folderId: string }[];

  constructor() {
    this.todos = MockedTodosData;
  }

  async findAllByFolderId(folderId: string) {
    return this.todos.filter((todo) => todo.folderId === folderId);
  }

  async findAll() {
    return this.todos;
  }

  async createTodo(data: { text: string; folderId: string }) {
    const { text, folderId } = data;
    const folder = MockedFoldersData.find((folder) => folder.id === folderId);
    if (!folder) {
      throw new Error("Folder was not found");
    }
    const newTodo = {
      id: `todo:${this.todos.length + 1}`,
      text,
      done: false,
      folderId,
    };

    return newTodo;
  }
}

export function MockCreateProvider() {
  const mockedTodoService = new TodoServiceMock();
  return {
    todoService: mockedTodoService,
  };
}
