import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../lib/axios";
import { useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';

const ActivityPage = () => {
  const { id } = useParams();
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [clientName, setClientName] = useState('');
  const [isBooked, setIsBooked] = useState(false);

  // Assuming you have a way to get the user ID of the logged-in user
  const loggedInUserId = '6606e002e68ae923ed5ab36b'; // Replace this with the actual user ID

  useEffect(() => {
    axiosInstance.get(`activities/listActivity/${id}`)
      .then(response => {
        console.log(response);
        setActivity(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    // Check if the activity is already booked by the logged-in user
    const fetchBookings = async () => {
      try {
        const response = await axiosInstance.get(`/bookings/listBooking/661d9dcf5cd84d017bd94a60`);
        console.log('Response:', response.data); // Log response data
        if (!Array.isArray(response.data)) {
          throw new Error('Invalid response format: expected an array');
        }
        const isBookedByUser = response.data.some(booking => booking.userId === loggedInUserId);
        setIsBooked(isBookedByUser);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        // Handle error, show error message to the user, etc.
      }
    };
    
    
    fetchBookings();
  }, [id, loggedInUserId]);

  const handleBookClick = async () => {
    if (isBooked) {
      setError('You have already booked this activity.');
      return;
    }

    try {
      const response = await axiosInstance.post('/bookings/save', {
        itemId: activity._id,
        clientName: clientName // Assuming you have a form field for client name
        // Other booking details can be added here
      });
      console.log('Booking created:', response.data);
      // Optionally, you can update the UI to reflect the booking creation
    } catch (error) {
      console.error('Error creating booking:', error);
      // Handle error, show error message to the user, etc.
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="container">
      <div className="row">

        <h1>Activity: {activity.title}</h1>
        <a
          className="mb-4 md:mb-0 col-md-8 position-relative rounded inline-block"
          style={{ height: '24em' }}
          href="#"
        >
          <div
            className="position-absolute left-0 bottom-0 w-100 h-100"
            style={{ backgroundImage: 'linear-gradient(180deg,transparent,rgba(0,0,0,.7))' }}
          ></div>
          <img
            src="https://images.unsplash.com/photo-1493770348161-369560ae357d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80"
            className="position-absolute left-0 top-0 w-100 h-100 rounded"
            alt=""
            style={{ objectFit: 'cover' }}
          />
         
         
        </a>

        <a
          className="col-md-4 position-relative rounded"
          style={{ height: '24em' }}
          href="#"
        >
          <div
            className="position-absolute left-0 top-0 w-100 h-100"
            style={{ backgroundImage: 'linear-gradient(180deg,transparent,rgba(0,0,0,.7))' }}
          ></div>
          <img
            src="https://images.unsplash.com/photo-1543362906-acfc16c67564?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1301&q=80"
            className="position-absolute left-0 top-0 w-100 h-100 rounded"
            alt="Second Example"
            style={{ objectFit: 'cover' }}
          />
          
        </a>

      </div>
      {isBooked && <div>You have already booked this activity.</div>}
      {!isBooked && (
        <>
          <input
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            placeholder="Enter your name"
          />
          <Button onClick={handleBookClick}>Book</Button>
        </>
      )}
    </div>
  );
};

export default ActivityPage;

