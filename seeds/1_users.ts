import { Knex } from "knex";

export async function seed(knex: Knex) {
  await knex("users").del();

  await knex("users").insert([
    {
      first_name: "James",
      last_name: "Wallington",
      email: "james.p.wallington@gmail.com",
      password: "password123",
      active: true,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
  ]);
}
