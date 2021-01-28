import { Model } from "objection";
import { Todo } from "./todo";

export class Folder extends Model {
  id: string | undefined;
  name: string | undefined;

  static tableName = "folders";

  static get idColumn(): string {
    return "id";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name"],

      properties: {
        id: { type: "uuid" },
        name: { type: "text" },
      },
    };
  }

  static relationMappings = {
    todos: {
      relation: Model.HasManyRelation,
      modelClass: Todo,
      join: {
        from: "persons.id",
        to: "todos.folderId",
      },
    },
  };
}
