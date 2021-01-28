import { TodoService } from "./todo.service";
import { FolderService } from "./folder.service";

export interface IProvider {
  todoService: TodoService;
  folderService: FolderService;
}

export interface IProviders {
  providers: IProvider;
}

export function CreateProvider(): IProvider {
  const todoService = new TodoService();
  const folderService = new FolderService();

  return { todoService, folderService };
}
