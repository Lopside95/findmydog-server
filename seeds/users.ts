import { Knex } from "knex";

export async function seed(knex: Knex) {
  await knex("users").del();

  await knex("users").insert([
    {
      first_name: "John",
      last_name: "Doe",
      email: "john.doe@example.com",
      password: "password123",
      active: true,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
    {
      first_name: "Jane",
      last_name: "Smith",
      email: "jane.smith@example.com",
      password: "securepassword",
      active: false,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
    {
      first_name: "Alice",
      last_name: "Johnson",
      email: "alice.johnson@example.com",
      password: "alice123",
      active: true,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
    {
      first_name: "Bob",
      last_name: "Brown",
      email: "bob.brown@example.com",
      password: "bobpassword",
      active: true,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
    {
      first_name: "Charlie",
      last_name: "Davis",
      email: "charlie.davis@example.com",
      password: "charlie2024",
      active: false,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
  ]);
}
