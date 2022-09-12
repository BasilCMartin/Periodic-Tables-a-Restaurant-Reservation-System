

const knex = require("../db/connection");

async function list(date) {
    return knex("reservations")
        .select("*")
        .where({"reservation_date": date})
        .whereNot({"status":"finished"})
        .orderBy("reservation_time");
}

async function create(reservation) {
    return knex("reservations")
        .insert(reservation)
        .returning("*")
        .then((reservations) => reservations[0])
}

async function read(reservation_id) {
    return knex("reservations").select("*").where({reservation_id}).first()
}

function update(reservation) {
    return knex("reservations")
      .select("*")
      .where({ reservation_id: reservation.reservation_id })
      .update({ status: reservation.status }, "*")
      .then((records) => records[0]);
  }

  function search(mobile_number) {
    return knex("reservations")
      .whereRaw(
        "translate(mobile_number, '() -', '') like ?",
        `%${mobile_number.replace(/\D/g, "")}%`
      )
      .orderBy("reservation_date");
  }

module.exports = {
    list,
    create,
    read,
    update,
    search
}