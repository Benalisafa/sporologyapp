import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Form, Button, Modal } from "react-bootstrap";
import { axiosInstance } from "../../lib/axios.js";
import { useSelector } from "react-redux";
import toast, { Toaster } from 'react-hot-toast';

export default function BookingWidget() {
  const [activity, setActivity] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const user = useSelector(state => state.auth.user);

  const [selectedName, setSelectedName] = useState('');
  const [names, setNames] = useState([{ _id: 'default', name: '------------', age: '' }]);
  const [showModal, setShowModal] = useState(false);
  const [otherName, setOtherName] = useState('');
  const [otherAge, setOtherAge] = useState('');

  const fetchFamilyMembers = () => {
    console.log(user.userId)
    axiosInstance.get(`/familyMembers/${user.userId}`)
      .then(response => {
        setNames(response.data);  
      })
      .catch(error => {
        console.error('Error fetching family members:', error);
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
    
    fetchFamilyMembers();
  }, [id]);

  const handleSelectChange = (e) => {
    setSelectedName(e.target.value);
  };

  const handleNameChange = (e) => {
    setOtherName(e.target.value);
    setSelectedName(''); // Clear selectedName when user starts typing a new name
  };

  const handleAgeChange = (e) => {
    setOtherAge(e.target.value);
  };

  const handleAddOption = () => {
    if (otherName.trim() !== '' && otherAge.trim() !== '') {
      axiosInstance.post(`/familyMembers/${user.userId}`, { name: otherName, age: otherAge })
        .then(response => {
          const newFamilyMember = response.data;
          setNames([...names, newFamilyMember]); // Add new family member to the list
          setSelectedName(newFamilyMember._id); // Select the newly added family member
          setOtherName('');
          setOtherAge('');
          setShowModal(false);
        })
        .catch(error => {
          console.error('Error adding family member:', error);
        });
    }
  };

  const handleBooking = () => {
    let selectedFamilyMember = names.find(n => n._id === selectedName);

    if (!selectedFamilyMember) {
      if (selectedName.trim() !== '' && otherAge.trim() !== '') {
        axiosInstance.post(`/familyMembers/${user.userId}`, { name: selectedName, age: otherAge })
          .then(response => {
            selectedFamilyMember = response.data;
            handleCreateBooking(selectedFamilyMember);
          })
          .catch(error => {
            console.error('Error adding family member:', error);
          });
      } else {
        console.error('No family member selected.');
      }
    } else {
      handleCreateBooking(selectedFamilyMember);
    }
  };

  const handleCreateBooking = (selectedFamilyMember) => {
    const payload = {
      activityId: id,
      userId: user.userId,
      name: selectedFamilyMember.name
    };

    console.log('Booking payload:', payload);

    axiosInstance.post('bookings/createBooking', payload)
      .then(response => {
        console.log('Booking successful!', response.data);
        toast.success('Booking successful!');
        setSelectedName('');
      })
      .catch(error => {
        console.error('Error booking:', error);
        if (error.response) {
          console.error('Error details:', error.response.data);
          toast.error( error.response.data.error);
        }
      });
  };

  return (
    <div className="p-4 d-flex flex-column align-items-center" style={{ backgroundColor: '#F1F5F9', border: 'solid 1px var(--bs-black)', borderRadius: '6px', position: 'relative' }}>
      <Toaster /> {/* Add Toaster component to render toasts */}
      {activity && (
        <div style={{ position: 'absolute', top: 10, left: 10, fontWeight: 'bold', color: 'var(--bs-red)' }}>
          {activity.price} AED
        </div>
      )}

      <div className="d-flex flex-column align-items-center">
        <h4 style={{ fontWeight: 'bold' }}>Who is going?</h4>
        <div>
          <Form.Control style={{ width: '200px' }} as="select" value={selectedName} onChange={handleSelectChange}>
            {names.map((n) => (
              <option key={n._id} value={n._id}>
                {n.name}
              </option>
            ))}
            <option value="new">+ Add New Name</option>
          </Form.Control>
        </div>

        <br />
        <Button style={{ border: 'solid black', color: 'black', backgroundColor: 'white', width: '200px' }} onClick={() => setShowModal(true)}>+ Add Name</Button>
      </div>

      <Button style={{ width: '200px' }} className="mt-4 button-primary" onClick={handleBooking}>
        Book Now
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Enter Family Name and Age</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            value={otherName}
            onChange={handleNameChange}
            placeholder="Enter family name"
            className="custom-placeholder"
          />
          <Form.Control
            type="number"
            value={otherAge}
            onChange={handleAgeChange}
            placeholder="Age"
            className="custom-placeholder"
          />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddOption}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
