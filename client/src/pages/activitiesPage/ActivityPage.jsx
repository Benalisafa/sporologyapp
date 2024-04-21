import  { useEffect, useState } from "react";
import { axiosInstance } from "../../lib/axios";
import { useParams } from "react-router-dom";

import Filter from "../../components/layout/Filter";
import Container from 'react-bootstrap/Container';
import { LocationIcon, DateIcon } from "../../components/Icons";
import BookingWidget from "../../components/activities/BookingWidget";

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
    
    <Container>
    <div >
      <div className="row">

      <div className="m-5">
        <Filter/>
        </div>

        <h1> {activity.title}</h1>
        <a
          className="mb-4 md:mb-0 col-md-8 position-relative rounded inline-block"
          style={{ height: '24em' }}
          href="#"
        >
          <div
            className="position-absolute left-0 bottom-0 w-100 h-100"
            style={{ backgroundImage: 'linear-gradient(180deg,transparent,rgba(0,0,0,.7))' }}
          ></div>
          <div
            
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

      <div className="mb-5">

      <h3 className="font-weight-bold text-dark">{activity.owner}</h3>

      <div className="d-flex align-items-center">
        <LocationIcon />
        <h3 className="text-muted mb-0 ms-2 fs-5">{activity.location}</h3>
      </div>

      <div className="d-flex align-items-center">
        <DateIcon />
        <span className="text-muted mb-0 ms-2 fs-8">${activity.date}</span>
      </div>
    </div>
    </div>

    <div className="d-flex align-items-center justify-content-between" >
      <div>
          <div className="my-4">
            <h2 >What this place offers?</h2>
            Wifi <br/>
            Free parking
          </div>
        
          <div className="my-4">
            <h2 >Description</h2>
            {activity.description}
          </div>
          </div>
        
        <div style={{width:'300px'}}>
          <BookingWidget  />
        </div>
      </div>
      <div >
        <div>
          <h2 >How many places are available?</h2>
        </div>
        <div >50 places</div>
      </div>
    
      
      {/* {isBooked && <div>You have already booked this activity.</div>}
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
      )} */}
      
    
    </Container>
  );
};

export default ActivityPage;

