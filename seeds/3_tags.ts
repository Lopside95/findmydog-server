import { Knex } from "knex";

export async function seed(knex: Knex) {
  await knex("tags").del();

  await knex("tags").insert([
    // {
    //   name: "Mange",
    // },
    // {
    //   name: "Fleas",
    // },
    // {
    //   name: "Malnourished",
    // },
    // {
    //   name: "Injury",
    // },
    // {
    //   name: "Anxiety",
    // },
    // {
    //   name: "Gastrointestinal",
    // },
    // {
    //   name: "Aggressive",
    // },
    {
      name: "Brown",
    },
    {
      name: "Black",
    },
    {
      name: "White",
    },
    {
      name: "Small",
    },
    {
      name: "Medium",
    },
    {
      name: "Large",
    },
    {
      name: "Labrador",
    },
    {
      name: "Beagle",
    },
    {
      name: "Mix",
    },
    {
      name: "Pointer",
    },
    {
      name: "Poodle",
    },
    {
      name: "Greyhound",
    },
    {
      name: "Border Collie",
    },
  ]);
}
