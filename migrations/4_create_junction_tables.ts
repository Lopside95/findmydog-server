import { Knex } from "knex";
import knex from "../knexfile.ts";

export async function up(knex: Knex) {
  await knex.schema.createTable("posts_tags", function (table) {
    table
      .integer("post_id")
      .unsigned()
      .references("id")
      .inTable("posts")
      .onDelete("CASCADE");
    table
      .integer("tag_id")
      .unsigned()
      .references("id")
      .inTable("tags")
      .onDelete("CASCADE");
    table.primary(["post_id", "tag_id"]);
    // table.integer("post_id").unsigned().references("posts.id");
    // table.integer("tag_id").unsigned().references("tags.id");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("posts_tags");
}
