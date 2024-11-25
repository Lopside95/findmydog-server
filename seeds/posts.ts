import { Knex } from "knex";

export async function seed(knex: Knex) {
  await knex("posts").del();

  await knex("posts").insert([
    {
      title: "Lost Dog in Central Park",
      img: "https://example.com/lost-dog.jpg",
      description:
        "Small brown dog spotted near the fountain, wearing a red collar.",
      longitude: "-73.9654",
      latitude: "40.7829",
      urgency: 3,
      type: "REPORT",
      status: "OPEN",
    },
    {
      title: "Community Clean-Up Event",
      img: "https://example.com/cleanup-event.jpg",
      description:
        "Join us this Saturday to clean up the riverbanks. Supplies provided.",
      longitude: "-122.4194",
      latitude: "37.7749",
      urgency: 1,
      type: "GENERAL",
      status: "OPEN",
    },
    {
      title: "Streetlight Outage Report",
      img: null,
      description:
        "Streetlight out on 5th Avenue and Main Street. Potential safety hazard.",
      longitude: "-80.8431",
      latitude: "35.2271",
      urgency: 2,
      type: "REPORT",
      status: "OPEN",
    },
    {
      title: "Missing Cat in Suburbia",
      img: "https://example.com/missing-cat.jpg",
      description:
        "Grey tabby missing since last night, last seen near Oak Street.",
      longitude: "-118.2437",
      latitude: "34.0522",
      urgency: 4,
      type: "REPORT",
      status: "OPEN",
    },
    {
      title: "Food Drive Collection Update",
      img: "https://example.com/food-drive.jpg",
      description:
        "Our local food drive collected over 500 cans! Thanks to everyone who contributed.",
      longitude: "-71.0589",
      latitude: "42.3601",
      urgency: 1,
      type: "GENERAL",
      status: "CLOSED",
    },
  ]);
}
