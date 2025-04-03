import { Knex } from "knex";

export async function seed(knex: Knex) {
  await knex("comments").del();

  await knex("comments").insert([
    {
      content: "That's my dog. I've been looking for ages!.",
      user_id: 1,
      post_id: 1,
    },
    {
      content: "This is comment 2",
      user_id: 1,
      post_id: 1,
    },
    {
      content: "This is comment 3",
      user_id: 1,
      post_id: 1,
    },
    {
      content: "This is comment 4",
      user_id: 1,
      post_id: 1,
    },
  ]);
}
