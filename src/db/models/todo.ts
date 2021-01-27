import { Model } from "objection";

export class Todo extends Model {
  id: string | undefined;
  text: string | undefined;
  done: boolean | undefined;

  static get tableName() {
    return "todos";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["text"],

      properties: {
        id: { type: "uuid" },
        text: { type: "text" },
        done: { type: "bool", default: false },
      },
    };
  }
}
