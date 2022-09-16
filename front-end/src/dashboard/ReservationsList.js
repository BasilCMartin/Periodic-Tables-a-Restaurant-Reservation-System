import React from "react";
import { useHistory } from "react-router";
import { cancelReservation } from "../utils/api";

import "./ReservationList.css"

function ReservationList({ reservation, date, formatTime }) {
  const history = useHistory();

  const handleReservationCancel = async (event) => {
event.preventDefault()
try{
  if (window.confirm(
    "Do you want to cancel this reservation? This cannot be undone."
  ) 
    ) {
      const status = "cancelled";
        await cancelReservation(reservation, status);
        history.go(0);
    } 
    
 
}
catch(error) {

}
  }



  
  const { first_name, last_name, mobile_number, reservation_time, reservation_date, people, status } =
    reservation;
  let formattedTime = formatTime(reservation_time);
  let formattedHours = Number(formattedTime.slice(0,2)) > 12 ? Number(formattedTime.slice(0,2) % 12) : Number(formattedTime.slice(0,2));
  formattedTime = `${formattedHours}${formattedTime.slice(2)}`;
  
  const reservationCard = (
    <div className="card bg-secondary border border-dark  mb-3">
      <div className="card-header">Reservation for {formattedTime} {new Date(`${reservation_date} ${reservation_time}`).getHours() < 12 ? "AM" : "PM"}</div>
      <div className="card-body" id="card-body">
        <h6>Name:</h6>
        <p>{first_name} {last_name}</p>
        <h6>Contact Number:</h6>
        <p className="card-text">{mobile_number}</p>
        <h6>Number of Guests:</h6>
        <p className="card-text">{people}</p>
        <h6>Status:</h6>
        <p className="card-text"data-reservation-id-status={reservation.reservation_id}>{status}</p>
      </div>
      <div className="d-flex justify-content-center  ">
          <button type="button" className=" btn-primary btn-outline-dark px-4 mr-4">
            {status === "booked" ?<a
              className="text-dark "
              href={`/reservations/${reservation.reservation_id}/seat`}
            >
              Seat
            </a> : null
}</button>
        </div>
        <br></br>
        <div className="d-flex justify-content-around mx-auto ">
          <button type="button" className=" btn-warning px-4 mr-4 btn-outline-dark">
          {status === "booked" ?<a
              className="text-dark"
              href={`/reservations/${reservation.reservation_id}/edit`}
            >
              Edit
            </a> : null
}
          </button>
          <button
            className=" btn-danger text-dark btn-outline-dark"
            type="button"
            name="cancel"
            
            data-reservation-id-cancel={reservation.reservation_id}
            onClick={handleReservationCancel}
          >
            Cancel
          </button>
        </div>
    </div>
  );
if (reservation.status !== "cancelled")
  return  reservationCard
  else return null
}

export default ReservationList;