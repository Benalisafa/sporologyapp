import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import toast, { Toaster } from 'react-hot-toast';
import UserService from '../../Services/userService';
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from 'react-redux';
import { login } from '../../redux/reducers/auth.reducer';
import { EyeIcon, MailIcon } from '../Icons';
import './Forms.css'

function LoginForm({ handleClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      toast.error('Incorrect');
      event.stopPropagation();
    } else {
      try {
        console.log('Form submitted:');
        const response = await UserService.signin(formData);
        toast.success('Logged in successfully');
        const decoded = jwtDecode(response.data.token);
        dispatch(login({ user: decoded, token: response.data.token }));
        navigate("/");
        
      } catch (err) {
        console.log(err);
        toast.error('Logging Failed');
      }
    }
  };

  return (
    <Form className='mt-5' noValidate onSubmit={handleSubmit}>
      <Toaster />
      <Form.Group className='mb-3 input-with-icon'>
        <Form.Label>Email Address</Form.Label>
        <div className="icon"><MailIcon/></div>
        <Form.Control type="email" placeholder="Email Address" required
          value={formData.email}
          name="email"
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className='mb-3 input-with-icon'>
        <Form.Label>Password</Form.Label>
        <div className="icon"><EyeIcon/></div>
        <Form.Control type="password" placeholder="Password" required
          value={formData.password}
          name="password"
          onChange={handleChange}
        />
      </Form.Group>

      <Button type="submit" className='custom-button'>Login</Button>
      <div className='mt-2 mb-4 text-center'>Don’t have any account yet? <a href="/signup">Create an account</a> </div>
    </Form>
  );
}

export default LoginForm;
