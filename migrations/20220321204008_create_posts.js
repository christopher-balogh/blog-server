/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("posts", (table) =>{
    table.increments("id");
    table.integer("user_id");
    table.string("title");
    table.string("content", 1000);
    table.timestamp('created_at').defaultTo(knex.fn.now());
})
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists("posts");
};
