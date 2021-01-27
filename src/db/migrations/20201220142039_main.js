exports.up = function (knex) {
  return knex.schema.createTable("todos", (table) => {
    table.uuid("id");
    table.text("text");
    table.boolean("done");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("todos");
};
