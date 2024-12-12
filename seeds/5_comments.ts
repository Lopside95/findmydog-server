import { Knex } from "knex";

export async function seed(knex: Knex) {
  await knex("comments").del();

  await knex("comments").insert([
    {
      content: "That's my dog. I've been looking for ages!.",
      user_id: 1,
      post_id: 1,
    },
    // {
    //   content: "Wow! This post is exactly what I needed.",
    //   user_id: 2,
    //   post_id: 1,
    // },
    // {
    //   content: "I completely agree with the points made here.",
    //   user_id: 3,
    //   post_id: 2,
    // },
    // {
    //   content: "This brings back so many memories!",
    //   user_id: 4,
    //   post_id: 2,
    // },
    // {
    //   content: "Amazing! Keep up the great work.",
    //   user_id: 5,
    //   post_id: 3,
    // },
    // {
    //   content: "Does anyone know more about this topic?",
    //   user_id: 1,
    //   post_id: 3,
    // },
    // {
    //   content: "I never thought of it that way. Interesting!",
    //   user_id: 2,
    //   post_id: 4,
    // },
    // {
    //   content: "This is so helpful, thanks for sharing.",
    //   user_id: 3,
    //   post_id: 4,
    // },
    // {
    //   content: "Can't wait to see more content like this!",
    //   user_id: 4,
    //   post_id: 5,
    // },
    // {
    //   content: "Loved this post, learned something new today.",
    //   user_id: 5,
    //   post_id: 5,
    // },
  ]);
}
