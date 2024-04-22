import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import toast, { Toaster } from 'react-hot-toast';
import UserService from '../../Services/userService';
import { useNavigate } from 'react-router-dom';
import { EyeIcon, EyeSlashIcon, MailIcon, PhoneIcon } from '../Icons';
import './Forms.css'

function RegisterForm() {

  
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    address: '',
    phone: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await UserService.signup(formData);
      navigate('/login');
      toast.success('User added successfully');
    } catch (err) {
      toast.error(err.response.data.message || 'Failed to register user');
    }
  };

  return (
    <div>
      
    <Form className="mt-5" onSubmit={handleSubmit}>
      <Toaster />
      <div className='d-flex align-items-center justify-content-between'>
      <Form.Group className="mb-3">
        <Form.Label>First name</Form.Label>
        <Form.Control
          type="text"
          placeholder="First name"
          name="firstname"
          value={formData.firstname}
          onChange={handleChange}
          
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
          
        />
      </Form.Group>
      </div>

      <div className='d-flex align-items-center mb-4 mt-4'>
      
            <Form.Check className='me-4'
              type="radio"
              label="male"
              name="genre"
              id="ml"
            />
            <Form.Check
              type="radio"
              label="female"
              name="genre"
              id="fm"
            />
      </div>

      <div className='d-flex align-items-center justify-content-between'>
      <Form.Group className="mb-3 input-with-icon">
      
        <Form.Label>Phone Number</Form.Label>
        <div className="icon"><PhoneIcon /></div>
        <Form.Control
          type="text"
          placeholder="Phone Number"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          
        />
      </Form.Group>

      <Form.Group className="mb-3 input-with-icon">
        <Form.Label>Email Address</Form.Label>
        <div className="icon"><MailIcon/></div>
        <Form.Control
          type="text"
          placeholder="Email Address"
          name="email"
          value={formData.email}
          onChange={handleChange}
          
        />
      </Form.Group>

      </div>

      <div className='d-flex align-items-center justify-content-between'>

      <Form.Group className="mb-3 input-with-icon">
        <Form.Label>Password</Form.Label>
        <div className="icon"><EyeIcon /></div>
        <Form.Control
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          
        />
      </Form.Group>

      <Form.Group className="mb-3 input-with-icon">
        <Form.Label> Confirm Password</Form.Label>
        <div className="icon"><EyeSlashIcon /></div>
        <Form.Control
          type="password"
          placeholder="Confirm Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          
        />
      </Form.Group>
      </div>
      

      <Button type="submit" className='custom-button'>Register</Button>
    </Form>
    
    </div>
    
  );
}

export default RegisterForm;
