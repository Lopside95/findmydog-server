import { Knex } from "knex";

export async function seed(knex: Knex) {
  await knex("posts").del();

  await knex("posts").insert([
    {
      title: "Beagle seen near Hampstead Heath",
      img: "https://firebasestorage.googleapis.com/v0/b/capstone-5adbe.firebasestorage.app/o/findmydog%2FBeagle%20in%20Hampstead%20Heath%2Fbeagle.jpg?alt=media&token=f269a271-fb3d-4c35-894e-732e6ad848c5",
      description:
        "Beagle with white spots found in London Fields by the table tennis courts. Name on collar: Felix. He’s friendly!",
      longitude: "-0.16216766793388615",
      latitude: "51.565463153667594",
      urgency: 3,
      // type: "SIGHTING",
      status: "FOUND",
      user_id: 1,
    },
  ]);
}
