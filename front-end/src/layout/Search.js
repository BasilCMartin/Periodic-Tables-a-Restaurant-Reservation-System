import React, { useState } from "react";
import ErrorAlert from "./ErrorAlert";
import ReservationList from "../dashboard/ReservationsList";
import { formatAsTime } from "../utils/date-time";

const { REACT_APP_API_BASE_URL } = process.env;

function Search() {
  const [formState, setFormState] = useState("");
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  function changeHandler({ target }) {
    setFormState(target.value);
  }

  async function submitHandler(e) {
    e.preventDefault();
    const response = await fetch(
      `${REACT_APP_API_BASE_URL}/reservations?mobile_number=${formState}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    const resData = await response.json();
    // console.log(resData)
    // console.log(resData.data.length)
    if (response.status !== 400) {
        setReservations(resData.data);
    }
    if (resData.error) {
        setReservationsError(resData.error)
    }
  }

  const reservationsList = reservations.map((reservation, index) => {
    return (
      <ReservationList
        key={index}
        reservation={reservation}
        formatTime={formatAsTime}
      />
    );
  });

  return (
    <div>
        <div>{reservationsError ? <ErrorAlert errorMessage={reservationsError} /> : <></>}</div>
      <form onSubmit={submitHandler}>
        <label htmlFor="mobile_number">Search</label>
        <input
          name="mobile_number"
          id="mobile_number"
          onChange={changeHandler}
          placeholder="Enter a customer's phone number"
        ></input>
        <button type="submit">Find</button>
      </form>
      <div>{reservationsList.length === 0 ? <>No reservations found</> : reservationsList}</div>
    </div>
  );
}

export default Search;