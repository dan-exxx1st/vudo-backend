function createUsers(knex) {
  return knex.schema.hasTable("folders").then(function (exists) {
    if (!exists) {
      return knex.schema.createTable("folders", (table) => {
        table.uuid("id").primary();
        table.text("name");
        table.text("color");
      });
    }
  });
}

function createTodos(knex) {
  return knex.schema.hasTable("todos").then(function (exists) {
    if (!exists) {
      return knex.schema.createTable("todos", (table) => {
        table.uuid("id");
        table.text("text");
        table.boolean("done");
        table.uuid("folderId").references("folders.id").onDelete("CASCADE");
      });
    }
  });
}

export function up(knex) {
  return Promise.all([createUsers(knex), createTodos(knex)]);
}

export function down(knex) {
  return knex.schema.dropTableIfExists("todos").dropTableIfExists("folders");
}
