import { v4 } from "uuid";

import { Folder } from "db/models/folder";

export class FolderService {
  async findAll() {
    const data = await Folder.query().select();
    return data;
  }

  async createFolder(name: string) {
    const newFolder = await Folder.query().insert({
      id: v4(),
      name,
    });

    return newFolder;
  }
}
