import { Knex } from "knex";

export async function seed(knex: Knex) {
  await knex("posts").del();

  await knex("posts").insert([
    {
      title: "Greyhound seen near Hampstead Heath",
      img: "https://storage.googleapis.com/find-my-dog/greyhound.jpg",
      description:
        "Greyhound with white spots found in London Fields by the table tennis courts. Name on collar: Felix. He’s friendly!",
      longitude: "-0.16216766793388615",
      latitude: "51.565463153667594",
      urgency: 3,
      // type: "SIGHTING",
      status: "FOUND",
      user_id: 1,
    },
  ]);
}
