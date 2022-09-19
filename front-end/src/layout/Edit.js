import React, { useState, useEffect } from "react";
import {useParams, useHistory } from "react-router-dom";
import ReservationForm from "./ReservationForm";

const { REACT_APP_API_BASE_URL } = process.env;


function Edit() {

  const history = useHistory();
  const { reservation_id } = useParams();

    const initialFormState = {
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "",
        people: "",
      };


    const [formData, setFormData] = useState({ ...initialFormState });
    const [error, setError] = useState(null);




useEffect(() => {
    const abortController = new AbortController();
    async function loadReservation() {
      const response = await fetch(
        `${REACT_APP_API_BASE_URL}/reservations/${reservation_id}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const resData = await response.json();
      setFormData({
        ...resData.data,
        reservation_date: resData.data.reservation_date.slice(0, 10),
      });
    }
    loadReservation();
    return () => abortController.abort();
  }, [reservation_id]);

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
  
   
  
  
    useEffect(() => {
      const abortController = new AbortController();
      setError(error);
      return () => abortController.abort();
    }, [error]);
  

  
    const handleSubmit = async (event) => {
      event.preventDefault();
    console.log(formData);
      console.log("🚀 ~ formData", formData);
      const response = await fetch(`${REACT_APP_API_BASE_URL}/reservations/${reservation_id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          data: formData,
        }),
      });
      const resData = await response.json();
      if (resData.error) {
        setError(resData.error);
      }
      if (response.status !== 400) {
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

export default Edit