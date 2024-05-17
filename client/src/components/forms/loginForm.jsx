import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import toast, { Toaster } from 'react-hot-toast';
import UserService from '../../Services/userService';
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import { useDispatch } from 'react-redux';
import { login } from '../../redux/reducers/auth.reducer';
import { EyeIcon, EyeSlashIcon, MailIcon } from '../Icons';
import './Forms.css';

function LoginForm({ handleClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;
  
    try {
      const response = await UserService.signin(formData);
      toast.success('Logged in successfully');
      const decoded = jwtDecode(response.data.token);
      dispatch(login({ user: decoded, token: response.data.token }));
      console.log(decoded);
  
      if (decoded.role === "partner") {
        navigate("/dashboard/partner");
      } else {
        navigate("/");
      }
    } catch (err) {
      toast.error('Email or password incorrect');
    }
  };
  
  

  return (
    <Form className='mt-2' noValidate onSubmit={handleSubmit}>
      <Toaster />
      <Form.Group className='mb-4 input-with-icon'>
        <Form.Label>Email Address</Form.Label>
        <div className="icon"><MailIcon/></div>
        <Form.Control type="email" placeholder="Email Address" required
          value={formData.email}
          name="email"
          onChange={handleChange}
          isInvalid={!!errors.email}
          aria-invalid={!!errors.email}
        />
        <Form.Control.Feedback type="invalid">
          {errors.email}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="input-with-icon mb-4" controlId="password">
            <Form.Label>Password</Form.Label>
            <div className="icon" onClick={() => setShowPassword(!showPassword)} style={{ cursor: 'pointer' }}>
              {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
            </div>
            <Form.Control
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              isInvalid={!!errors.password}
              aria-invalid={!!errors.password}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>

      <Button type="submit" className='button-primary' style={{width:'100%'}}>Login</Button>
    </Form>
  );
}

export default LoginForm;
