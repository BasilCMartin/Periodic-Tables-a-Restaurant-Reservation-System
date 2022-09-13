import React from "react";
import { useHistory } from "react-router";
import { cancelReservation } from "../utils/api";

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
    <div className="card bg-light mb-3">
      <div className="card-header">Reservation for {formattedTime} {new Date(`${reservation_date} ${reservation_time}`).getHours() < 12 ? "AM" : "PM"}</div>
      <div className="card-body">
        <h6>Name:</h6>
        <p>{first_name} {last_name}</p>
        <h6>Contact Number:</h6>
        <p className="card-text">{mobile_number}</p>
        <h6>Number of Guests:</h6>
        <p className="card-text">{people}</p>
        <h6>Status</h6>
        <p className="card-text"data-reservation-id-status={reservation.reservation_id}>{status}</p>
      </div>
      <div className="d-flex justify-content-end">
          <button type="button" className="btn btn-secondary px-4 mr-4">
            {status === "booked" ?<a
              className="text-light"
              href={`/reservations/${reservation.reservation_id}/seat`}
            >
              Seat
            </a> : null
}</button>
        </div>
        <div>
          <button type="button" className="btn btn-secondary px-4 mr-4">
          {status === "booked" ?<a
              className="text-light"
              href={`/reservations/${reservation.reservation_id}/edit`}
            >
              Edit
            </a> : null
}
          </button>
          <button
            className="btn btn-link"
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