import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

import { axiosInstance } from "../../lib/axios.js";
import { useSelector } from "react-redux";


export default function BookingWidget() {
  const [activity, setActivity] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const user = useSelector(state => state.auth.user);
 
  const [name, setName] = useState('');
  const [otherName, setOtherName] = useState('');
  const [names, setNames] = useState(['------------']);

  const handleSelectChange = (e) => {
    setName(e.target.value);
  };

  const handleInputChange = (e) => {
    setOtherName(e.target.value);
  };

  const handleAddOption = () => {
    if (otherName.trim() !== '') {
      setNames([...names, otherName]);
      setOtherName('');
    }
  };

  const handleBooking = () => {
    // Send a POST request to your backend API to save the booking, including the activityId and userId
    axiosInstance.post('bookings/createBooking', { activityId: id, userId: user.userId, name })
      .then(response => {
        console.log(response);
        
        console.log('Booking successful!');
      })
      .catch(error => {
        // Handle error, e.g., show an error message
        console.error('Error booking:', error);
      });
  };
  
  

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
    <div className="p-4 d-flex flex-column align-items-center" style={{backgroundColor:'#F1F5F9', border:'solid 1px var(--bs-black)', borderRadius:'6px', position: 'relative'}}>
      {activity && (
        <div style={{position: 'absolute', top: 10 , left: 10, fontWeight: 'bold', color:'var(--bs-red)'}}>
          {activity.price} AED
        </div>
      )}
      
      <div className="d-flex flex-column align-items-center">
        <h4 style={{fontWeight:'bold'}}>who is going?</h4>
        <div>
          <Form.Control style={{ width: '200px' }} className="custom-placeholder" as="select" value={name} onChange={handleSelectChange}>
            {names.map((name, index) => (
              <option key={index} value={name}>
                {name}
              </option>
              
            ))}
          </Form.Control>
        </div>
        
        <br />
       
        <Form.Control style={{ width: '200px' }}
          type="text"
          value={otherName}
          onChange={handleInputChange}
          placeholder="Enter other name"
          className="custom-placeholder"
        />
        <br />
        <Button style={{border:'solid black', color:'black', backgroundColor:'white', width: '200px'}} onClick={handleAddOption}> + Add Name</Button>
      </div>

      <Button style={{ width: '200px' }} className="mt-4 button-primary" onClick={handleBooking}>
        Book Now
      </Button>
    </div>
  );
}
