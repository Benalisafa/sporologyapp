import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { EyeIcon, EyeSlashIcon, MailIcon, PhoneIcon } from '../Icons';
import './Forms.css';
import { axiosInstance } from '../../lib/axios';


function RegisterFormPartner({ onSubmit }) {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    phone: '',
    genre: '',
    picture: null, // Use null initially for picture state
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (event.target.files) {
      const file = event.target.files[0];
      console.log('Selected picture file:', file); // Log the selected file
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: file
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const formDataToSend = new FormData();
    formDataToSend.append('firstname', formData.firstname);
    formDataToSend.append('lastname', formData.lastname);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('password', formData.password);
    formDataToSend.append('confirmPassword', formData.confirmPassword);
    formDataToSend.append('address', formData.address);
    formDataToSend.append('phone', formData.phone);
    formDataToSend.append('genre', formData.genre);
    formDataToSend.append('picture', formData.picture); // Check if formData.picture is the File object
  
    console.log('Form data to send:', formDataToSend); // Check the formDataToSend in console
  
    try {
      const response = await axiosInstance.post('/users/signup/partner', formDataToSend);
      console.log('Response:', response.data);
  
      // Call onSubmit callback if provided
      if (onSubmit) {
        onSubmit(formData); // Pass formData to parent component
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  return (
    <div className='container-s d-flex align-items-center justify-content-center'>
      <Form className="mt-5" onSubmit={handleSubmit}>
        <Toaster />
        <div className='d-flex' style={{ gap: '5%' }}>
          <Form.Group className="mb-3">
            <Form.Label>First name</Form.Label>
            <Form.Control
              type="text"
              placeholder="First name"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Last name"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </div>

        <div className='d-flex mb-4 mt-4' style={{ gap: '5%' }}>
          <Form.Check
            type="radio"
            label="Male"
            name="genre"
            id="ml"
            value="male"
            onChange={handleChange}
          />
          <Form.Check
            type="radio"
            label="Female"
            name="genre"
            id="fm"
            value="female"
            onChange={handleChange}
          />
        </div>

        <div className='d-flex' style={{ gap: '5%' }}>
          <Form.Group className="mb-3 input-with-icon">
            <Form.Label>Phone Number</Form.Label>
            <div className="icon"><PhoneIcon /></div>
            <Form.Control
              type="text"
              placeholder="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3 input-with-icon">
            <Form.Label>Email Address</Form.Label>
            <div className="icon"><MailIcon /></div>
            <Form.Control
              type="email"
              placeholder="Email Address"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </div>

        <div className='d-flex' style={{ gap: '5%' }}>
          <Form.Group className="mb-3 input-with-icon">
            <Form.Label>Password</Form.Label>
            <div className="icon" onClick={toggleShowPassword} style={{ cursor: 'pointer' }}>
              {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
            </div>
            <Form.Control
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3 input-with-icon">
            <Form.Label>Confirm Password</Form.Label>
            <div className="icon" onClick={toggleShowConfirmPassword} style={{ cursor: 'pointer' }}>
              {showConfirmPassword ? <EyeSlashIcon /> : <EyeIcon />}
            </div>
            <Form.Control
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </div>

        <div className="profile-image-container">
          <Form.Label>Profile Picture</Form.Label>
          <Form.Control
            type="file"
            className="profile-image-input"
            name="picture"
            accept="image/*"
            onChange={handleChange}
            required
          />
        </div>

        <Button type="submit" className='button-primary' style={{ width: '100%' }}>Register</Button>
      </Form>
    </div>
  );
}

export default RegisterFormPartner;
