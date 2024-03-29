import React, {useState} from 'react'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import toast, { Toaster } from 'react-hot-toast'
import UserService from '../../Services/userService';
import {useNavigate} from "react-router-dom";

function LoginForm(){

    const navigate=useNavigate()
  const [formData, setFormData] = useState({
 
    email: '',
    password: '',
    
  });

  const setErrors = useState({
    
    email: '',
    password: '',
    
  })
    
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    
    if (form.checkValidity() === false) {
      console.log("Invalid Form")
      toast.error('Incorrect')
      event.stopPropagation();  //chouf el meaning snn kharejha
    } else {
        

        
      try {
        console.log('Form submitted:', formData);
        await UserService.signin( formData )
        navigate("/")
        toast.success('Logged in successfully')
        
        
      } catch (err) {
        setErrors(err.response.data)
        console.log(err)
        toast.error(' Logging Failed')
      }
      
    }

    
    
  }

  return (
    <Form className='mt-5' noValidate onSubmit={handleSubmit}>
      <Toaster/>
      
   
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


    
      <Button type="submit">Log In</Button>
    </Form>
  )
}


export default LoginForm
