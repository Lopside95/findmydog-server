import { Knex } from "knex";

export async function seed(knex: Knex) {
  await knex("posts_tags").del();

  await knex("posts_tags").insert([
    {
      post_id: 1,
      tag_id: 2,
    },
    {
      post_id: 1,
      tag_id: 12,
    },
  ]);
}
