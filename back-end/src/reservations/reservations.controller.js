/**
 * List handler for reservation resources
 */

 const service = require("./reservations.service");
 const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
 
 async function list(req, res) {
  if (req.query.mobile_number) {
    const data = await service.search(req.query.mobile_number);
    res.json({ data });
  } else {
    const data = await service.list(req.query.date);
    res.json({ data });
  }
}
 
 function read(req, res) {
  const {reservation: data} = res.locals;
  res.json({data})
}

async function update(req, res) {
  const reservation = res.locals.reservation;
  const { status } = req.body.data;
  const updatedReservation = {
    ...reservation,
    status,
  };
  const data = await service.update(updatedReservation);
  
  
  res.json({ data });
}


async function create(req, res, next) {
  const data = await service.create(req.body.data);
  res.status(201).json({ data });
}

 // VALIDATION PIPELINE
 const VALID_PROPERTIES = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
  "created_at",
  "updated_at",
  "status",
  "reservation_id",
];
 
function hasOnlyValidProperties(req, res, next) {
  const { data = {} } = req.body;

  const invalidFields = Object.keys(data).filter(
    (field) => !VALID_PROPERTIES.includes(field)
  );

  if (invalidFields.length) {
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(", ")}`,
    });
  }
  next();
}


function hasAllFields(...fields) {
  return function (req, res, next) {
    const { data = {} } = req.body;
    try {
      fields.forEach((field) => {
        if (!data[field]) {
          const error = new Error(`A '${field}' property is required.`);
          error.status = 400;
          throw error;
        }
      });
      next();
    } catch (error) {
      next(error);
    }
  };
}
const hasRequiredFields = hasAllFields(
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people"
);

function dateValidator(req, res, next) {
  const { data = {} } = req.body;
  if (!data["reservation_date"].match(/\d{4}-\d{2}-\d{2}/)) {
    return next({
      status: 400,
      message: `invalid reservation_date`,
    });
  }
  next();
}

function timeValidator(req,res,next) {
  const { data = {} } = req.body;
  if (!data["reservation_time"].match(/[0-9]{2}:[0-9]{2}/)) {
    return next({
      status: 400,
      message: `invalid reservation_time `,
    });
  }
  next();
}
function peopleIsNumber(req, res, next) {
  const { data = {} } = req.body;
  if (typeof data["people"] != "number") {
    return next({
      status: 400,
      message: `"people" field must be a number `,
    });
  }
  next();
}
function notTuesday(req,res,next) {
  const { data = {} } = req.body;
const dateObject = new Date(data["reservation_date"])
  if (dateObject.getDay()=== 1) {
    next({
      status: 400,
      message: `Reservations cannot be made for Tuesday, as the restaurant is closed Tuesdays.`,
    });
}
 next();
}

function timeIsAvailable(req,res,next) {
  const { data = {} } = req.body;
  let submittedTime =data["reservation_time"].replace(":", "");
  if (submittedTime<1030 || submittedTime>2130) {
    next({
      status: 400,
      message: "Reservation must be within business hours and at least an hour before close",
    });
  }
  next();
}

function notInThePast(req, res, next) {
  const { data = {} } = req.body;
if (Date.parse(data["reservation_date"]) < Date.now()) {
    next({
      status: 400,
      message: `Reservation must be in the future.`,
    });
}
next();
}



 
 
 
 /* validation currently checking if:
     - req has all required fields
     - req has all valid entries of fields
 */

 

 async function reservationExists(req, res, next) {
  const { reservation_id } = req.params;
  const reservation = await service.read(reservation_id);
  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  } else {
    return next({
      status: 404,
      message: `Reservation ID ${reservation_id} does not exist.`,
    });
  }
}
function bookedCheck(req, res, next) {
  const { data = {} } = req.body;
  const status = data["status"];

  if (status === "booked" || status === undefined) {
    return next();
  }
  return next({
    status: 400,
    message: `Invalid or unknown status: ${status}`,
  });
}
function validStatus(req, res, next) {
  const reservation = res.locals.reservation;
  const { data = {} } = req.body;
  const status = data["status"];

  if (reservation.status === "finished") {
    return next({
      status: 400,
      message: "Reservation is already finished.",
    });
  }

  const validStatuses = ["booked", "seated", "finished", "cancelled"];
  if (validStatuses.includes(status)) {
    return next();
  }

  return next({
    status: 400,
    message: `Invalid or unknown status: ${status}`,
  });
}

 module.exports = {
  read:[asyncErrorBoundary(reservationExists),read],
   list:[asyncErrorBoundary(list)],
   create: [
hasOnlyValidProperties,
hasRequiredFields,
     dateValidator,
     timeValidator,
     peopleIsNumber,
     notTuesday,
     notInThePast,
     timeIsAvailable,
     bookedCheck,
     asyncErrorBoundary(create),
   ],
   update:[asyncErrorBoundary(reservationExists), validStatus, asyncErrorBoundary(update)]
 };