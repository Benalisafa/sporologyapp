import { useEffect, useState} from "react";

import axios from "axios";
import {Navigate} from "react-router-dom";

import { axiosInstance } from "../../lib/axios.js";
import { useParams } from "react-router-dom";

export default function BookingWidget() {


  const [activity, setActivity] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();
 

  useEffect(() => {
    axiosInstance.get(`activities/listActivity/${id}`)
      .then(response => {
        
        setActivity(response.data);
      })
      .catch(error => {
        setError(error);
      });
  }, [id]);
  

 


  return (
    <div className="bg-white shadow p-4 rounded-2xl d-flex flex-column align-items-center">
      <div>
      {activity && (
        
        <div className="text-2xl text-center">
          Price: ${activity.price} / per month
        </div>
      )}
      </div>
      <button className="btn btn-primary mt-4">
        Book Now
      </button>
    </div>
  );
  
  
}