import { Knex } from "knex";

export async function seed(knex: Knex) {
  await knex("posts_tags").del();

  await knex("posts_tags").insert([
    {
      post_id: 1,
      tag_id: 1,
    },
    {
      post_id: 1,
      tag_id: 2,
    },
    {
      post_id: 2,
      tag_id: 2,
    },
    {
      post_id: 2,
      tag_id: 3,
    },
    {
      post_id: 3,
      tag_id: 3,
    },
    {
      post_id: 3,
      tag_id: 4,
    },
    {
      post_id: 4,
      tag_id: 4,
    },
    {
      post_id: 4,
      tag_id: 5,
    },
    {
      post_id: 5,
      tag_id: 5,
    },
    {
      post_id: 5,
      tag_id: 6,
    },
  ]);
}
