import { Knex } from "knex";

export async function seed(knex: Knex) {
  await knex("posts").del();

  await knex("posts").insert([
    {
      title: "Lost Dog in Central Park",
      img: "https://storage.cloud.google.com/find-my-dog/poodle.jpg?authuser=1",
      description:
        "Small brown dog spotted near the fountain, wearing a red collar.",
      longitude: "-73.9654",
      latitude: "40.7829",
      urgency: 3,
      type: "SIGHTING",
      status: "OPEN",
      user_id: 3,
    },
    {
      title: "Community Clean-Up Event",
      img: "https://storage.cloud.google.com/find-my-dog/collie.jpg?authuser=1",
      // img: "https://unsplash.com/photos/adult-brindle-hound-dog-luqe_FNg1dA?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash",
      // img: "https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*",
      description:
        "Join us this Saturday to clean up the riverbanks. Supplies provided.",
      longitude: "-122.4194",
      latitude: "37.7749",
      urgency: 1,
      type: "FOUND",
      status: "OPEN",
      user_id: 1,
    },
    {
      title: "Streetlight Outage Report",
      img: "https://storage.cloud.google.com/find-my-dog/beagle.jpg?authuser=1",
      // img: "https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*",
      // img: "https://unsplash.com/photos/black-labrador-retriever-sitting-outdoor-JNbot7fejg8?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash",
      description:
        "Streetlight out on 5th Avenue and Main Street. Potential safety hazard.",
      longitude: "-80.8431",
      latitude: "35.2271",
      urgency: 2,
      type: "SIGHTING",
      status: "OPEN",
      user_id: 2,
    },

    {
      title: "Missing Cat in Suburbia",
      img: "https://storage.cloud.google.com/find-my-dog/greyhound.jpg?authuser=1",
      // img: "https://unsplash.com/photos/a-beagle-dog-standing-in-a-field-of-grass-HR5p3Ve6IkI?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash",
      // img: "https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*",
      description:
        "Grey tabby missing since last night, last seen near Oak Street.",
      longitude: "-118.2437",
      latitude: "34.0522",
      urgency: 4,
      type: "SIGHTING",
      status: "OPEN",
      user_id: 4,
    },
    {
      title: "Food Drive Collection Update",
      // img: "https://unsplash.com/photos/black-and-white-border-collie-sitting-on-snow-covered-ground-during-daytime-fpSDIQ2polI?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash",
      img: "https://storage.cloud.google.com/find-my-dog/labrador.jpg?authuser=1",
      description:
        "Our local food drive collected over 500 cans! Thanks to everyone who contributed.",
      longitude: "-71.0589",
      latitude: "42.3601",
      urgency: 1,
      type: "FOUND",
      status: "CLOSED",
      user_id: 3,
    },
    // {
    //   title: "Lost Dog in Central Park",
    //   img: "https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*",
    //   description:
    //     "Small brown dog spotted near the fountain, wearing a red collar.",
    //   longitude: "-73.9654",
    //   latitude: "40.7829",
    //   urgency: 3,
    //   type: "SIGHTING",
    //   status: "OPEN",
    //   user_id: 3,
    // },
    // {
    //   title: "Community Clean-Up Event",
    //   img: "https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*",
    //   description:
    //     "Join us this Saturday to clean up the riverbanks. Supplies provided.",
    //   longitude: "-122.4194",
    //   latitude: "37.7749",
    //   urgency: 1,
    //   type: "FOUND",
    //   status: "OPEN",
    //   user_id: 2,
    // },
    // {
    //   title: "Streetlight Outage Report",
    //   img: "https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*",
    //   description:
    //     "Streetlight out on 5th Avenue and Main Street. Potential safety hazard.",
    //   longitude: "-80.8431",
    //   latitude: "35.2271",
    //   urgency: 2,
    //   type: "SIGHTING",
    //   status: "OPEN",
    //   user_id: 4,
    // },
    // {
    //   title: "Missing Cat in Suburbia",
    //   img: "https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*",
    //   description:
    //     "Grey tabby missing since last night, last seen near Oak Street.",
    //   longitude: "-118.2437",
    //   latitude: "34.0522",
    //   urgency: 4,
    //   type: "SIGHTING",
    //   status: "OPEN",
    //   user_id: 1,
    // },
    // {
    //   title: "Food Drive Collection Update",
    //   img: "https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*",
    //   description:
    //     "Our local food drive collected over 500 cans! Thanks to everyone who contributed.",
    //   longitude: "-71.0589",
    //   latitude: "42.3601",
    //   urgency: 1,
    //   type: "FOUND",
    //   status: "CLOSED",
    //   user_id: 5,
    // },
  ]);
}
