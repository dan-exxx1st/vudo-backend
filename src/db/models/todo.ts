import { Model } from "objection";
import { Folder } from "./folder";

export class Todo extends Model {
  id: string | undefined;
  text: string | undefined;
  done: boolean | undefined;
  folderId: string | undefined;

  static tableName = "todos";

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["text", "folderId"],

      properties: {
        id: { type: "uuid" },
        text: { type: "text" },
        done: { type: "bool", default: false },
        folderId: { type: "uuid" },
      },
    };
  }

  static relationMappings = {
    todos: {
      relation: Model.HasOneRelation,
      modelClass: Folder,
      join: {
        from: "todos.folderId",
        to: "folders.id",
      },
    },
  };
}
