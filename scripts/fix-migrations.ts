import knex from "knex";

import "dotenv/config";

// export default {
//   client: "mysql2",
//   connection: {
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     charset: "utf8",
//   },
// };

const db = knex({
  client: "mysql2",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    charset: "utf8",
  },
});

async function fixMigrations() {
  try {
    await db("knex_migrations").where("name", "6_create_photos_table").del();
    console.log("Migration record deleted successfully.");
  } catch (error) {
    console.error("Error deleting migration record:", error);
  } finally {
    await db.destroy();
  }
}

fixMigrations();
