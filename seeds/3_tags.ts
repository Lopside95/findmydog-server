import { Knex } from "knex";

export async function seed(knex: Knex) {
  await knex("tags").del();

  await knex("tags").insert([
    {
      name: "Mange",
    },
    {
      name: "Fleas",
    },
    {
      name: "Malnourished",
    },
    {
      name: "Injury",
    },
    {
      name: "Anxiety",
    },
    {
      name: "Gastrointestinal",
    },
    {
      name: "Aggressive",
    },
    {
      name: "Feeding Issues",
    },
  ]);
}
// export async function seed(knex: Knex) {
//   await knex("tags").del();

//   await knex("tags").insert([
//     {
//       name: "Mange",
//       active: false,
//     },
//     {
//       name: "Fleas",
//       active: false,
//     },
//     {
//       name: "Malnourished",
//       active: false,
//     },
//     {
//       name: "Injury",
//       active: false,
//     },
//     {
//       name: "Anxiety",
//       active: false,
//     },
//     {
//       name: "Gastrointestinal",
//       active: false,
//     },
//     {
//       name: "Aggressive",
//       active: false,
//     },
//     {
//       name: "Feeding Issues",
//       active: false,
//     },
//   ]);
// }
