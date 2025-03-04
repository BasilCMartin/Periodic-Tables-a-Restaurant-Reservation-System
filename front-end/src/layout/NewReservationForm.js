import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import ReservationForm from "./ReservationForm";


const { REACT_APP_API_BASE_URL } = process.env;

function NewReservations() {

  const history = useHistory();

  const initialFormState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: 1,
  };

  const [formData, setFormData] = useState({ ...initialFormState });
  const [error, setError] = useState(null);
  //const [errorMessage, setErrorMessage] = useState(undefined);

  useEffect(() => {
    const abortController = new AbortController();
    setError(error);
    return () => abortController.abort();
  }, [error]);

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.name === "people" ? Number(event.target.value) : event.target.value
    });
  };

  const handleCancel = () => {
    setFormData({ ...initialFormState });
    history.goBack();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    const response = await fetch(`${REACT_APP_API_BASE_URL}/reservations`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        data: formData,
      }),
    });
    const resData = await response.json();
    console.log(resData);
    if (resData.error) {
      setError(resData.error);
    }
    if (response.status !== 400) {
      setFormData({ ...initialFormState });
      // history.goBack();
      history.push(`/dashboard?date=${formData.reservation_date}`)
    }
  };





  

  return (
    <div>
      <ReservationForm 
      reservationData={formData}
      setReservationData={setFormData}
      submitHandler={handleSubmit}
      cancelHandler={handleCancel}
      error={error}
      changeHandler={handleInputChange}
      />
    </div>
    

  )
}

export default NewReservations;