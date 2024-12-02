import { Knex } from "knex";

export async function up(knex: Knex) {
  await knex.schema.createTable("tags", function (table) {
    table.increments("id").primary();
    table.string("name").notNullable();
    // table.boolean("active");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("tags");
}
