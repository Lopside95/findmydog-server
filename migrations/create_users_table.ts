import { Knex } from "knex";
import knex from "../knexfile.ts";

export async function up(knex: Knex) {
  await knex.schema.createTable("users", function (table) {
    table.increments("id").primary();
    table.string("first_name").notNullable();
    table.string("last_name");
    table.string("email").unique().notNullable();
    table.string("password").notNullable();
    table.boolean("active").defaultTo(true);
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("users");
}

// import { Knex } from "knex";
// import knex from "../knexfile.ts";
// export async function up(knex: Knex) {
//   await knex.schema.createTable("users", function (table) {
//     table.increments("id").primary();
//     table.string("first_name").notNullable();
//     table.string("last_name");
//     table.string("email");
//     table.string("password");
//     table.boolean("active");
//     table.timestamp("created_at").defaultTo(knex.fn.now());
//     table.increments("post_id", { primaryKey: false });
//     table
//       .timestamp("updated_at")
//       .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
//   });
// }

// export async function down(knex: Knex): Promise<void> {
//   await knex.schema.dropTableIfExists("users");
// }
