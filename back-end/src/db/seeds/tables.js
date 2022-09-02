const tables = require("./tables.json");
exports.seed = function(knex) {
  // Deletes ALL existing entries
  knex
    .raw("TRUNCATE TABLE reservations RESTART IDENTITY CASCADE")
    .then(() => knex("reservations").insert(tables));
};
