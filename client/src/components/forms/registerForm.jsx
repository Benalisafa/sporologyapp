import React, {useState} from 'react'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import toast, { Toaster } from 'react-hot-toast'
import UserService from '../../Services/userService';
import {useNavigate} from "react-router-dom";

function RegisterForm(){

    const navigate=useNavigate()
  const [formData, setFormData] = useState({
 
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    // picture: '',
    // birthdate: '',
    address: '',
    phone: '',
  });

  const setErrors = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    // picture: '',
    // birthdate: '',
    address: '',
    phone: '',
  })
    
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const [validated, setValidated] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    
    if (form.checkValidity() === false) {
      console.log("Invalid Form")
      event.stopPropagation();  //chouf el meaning snn kharejha
    } else {
      
      try {
        console.log('Form submitted:', formData);
        await UserService.signup( formData )
        navigate("/login")
        toast.success('User added successfully')
        
        
      } catch (err) {
        setErrors(err.response.data)
        console.log(err)
        toast.error('User Failed')
      }
      
    }

    setValidated(true);
    
  }

  return (
    <Form className='mt-5' noValidate validated={validated} onSubmit={handleSubmit}>
      <Toaster/>
      
      
        <Form.Group className='mb-3' >
          <Form.Label>First name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="First name"
            value={formData.firstname}
            name="firstname"
            onChange={handleChange}
          />
          
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>Last name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Last name"
            value={formData.lastname}
            name="lastname"
                onChange={handleChange}
          />
        </Form.Group>

      
      
        <Form.Group className='mb-3'>
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Email@example.co" required 
          value={formData.email}
          name="email"
          onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" required 
          value={formData.password}
          name="password"
          onChange={handleChange}
          />
        
        </Form.Group>


        <Form.Group className='mb-3'>
          <Form.Label>Address</Form.Label>
          <Form.Control type="text" placeholder="Home Address" required 
          value={formData.address}
          name="address"
          onChange={handleChange}
          />
          
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Phone</Form.Label>
          <Form.Control type="number" placeholder="0000000" required 
          value={formData.phone}
          name="phone"
          onChange={handleChange}
          />
          
        </Form.Group>
      
    
      <Button type="submit">Sign up</Button>
    </Form>
  )
}


export default RegisterForm
