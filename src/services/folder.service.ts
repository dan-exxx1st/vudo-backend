import { v4 } from "uuid";

import { Folder } from "db/models/folder";
import { Todo } from "db/models/todo";

export class FolderService {
  async findAll() {
    const data = await Folder.query().select();
    return data;
  }

  async createFolder(payload: { name: string; color: string }) {
    const { name, color } = payload;
    const newFolder = await Folder.query().insert({
      id: v4(),
      name,
      color,
    });

    return newFolder;
  }

  async deleteFolder(id: string) {
    const folderForDelete = await Folder.query().findById(id);
    if (folderForDelete) {
      const todoDeletedRows = await Todo.query().delete().where({ folderId: id });
      if (todoDeletedRows >= 0) {
        const folderDeletedRows = await Folder.query().delete().where({ id });
        if (folderDeletedRows) {
          return folderForDelete;
        }
      }
    }
  }
}
