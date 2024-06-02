import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Toaster } from 'react-hot-toast';
import { EyeIcon, EyeSlashIcon, MailIcon, PhoneIcon } from '../Icons';
import './Forms.css';
import { axiosInstance } from '../../lib/axios';

function RegisterFormPartner({ onSubmit }) {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    age: '',
    password: '',
    confirmPassword: '',
    address: '',
    phone: '',
    genre: '',
    picture: null,
    status: '',
    location: '',
  });

  const [formErrors, setFormErrors] = useState({
    firstname: '',
    lastname: '',
    email: '',
    age: '',
    password: '',
    confirmPassword: '',
    phone: '',
    genre: '',
    picture: '',
    status: '',
    location: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (event) => {
    const { name, value, files } = event.target;

    if (files) {
      const file = files[0];
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

    if (formErrors[name]) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    try {
      const emailExists = await checkEmailExists(formData.email);
      if (emailExists) {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          email: 'Email already exists'
        }));
        return;
      }

      const response = await axiosInstance.post('/users/signup/partner', formDataToSend);
      console.log('Response:', response.data);

      if (onSubmit) {
        onSubmit(formData);
      }

      // Clear the form after successful submission
      setFormData({
        firstname: '',
        lastname: '',
        email: '',
        age: '',
        password: '',
        confirmPassword: '',
        address: '',
        phone: '',
        genre: '',
        picture: null,
        status: '',
        location: '',
      });

      setFormErrors({});
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const checkEmailExists = async (email) => {
    try {
      const response = await axiosInstance.post('/users/email', { email });
      return response.data.exists;
    } catch (error) {
      console.error('Error checking email:', error);
      return false;
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.firstname.trim()) {
      errors.firstname = 'First name is required';
    }

    if (!formData.lastname.trim()) {
      errors.lastname = 'Last name is required';
    }

    if (!formData.age.trim()) {
      errors.age = 'Age is required';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      errors.email = 'Invalid email format';
    }

    if (!formData.password.trim()) {
      errors.password = 'Password is required';
    } else if (formData.password.trim().length < 6) {
      errors.password = 'Password is weak';
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    }

    if (!formData.genre) {
      errors.genre = 'Please select a gender';
    }

    if (!formData.picture) {
      errors.picture = 'Profile picture is required';
    }

    if (!formData.status) {
      errors.status = 'Please select a status';
    }

    if (!formData.location) {
      errors.location = 'Please select a city';
    }

    return errors;
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className='container-s d-flex align-items-center justify-content-center pb-4'>
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
              isInvalid={!!formErrors.firstname}
              aria-invalid={!!formErrors.firstname}
            />
            <Form.Control.Feedback type="invalid">
              {formErrors.firstname}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Last name"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              isInvalid={!!formErrors.lastname}
              aria-invalid={!!formErrors.lastname}
            />
            <Form.Control.Feedback type="invalid">
              {formErrors.lastname}
            </Form.Control.Feedback>
          </Form.Group>
        </div>

        <div className='d-flex align-items-center mb-4 mt-4' style={{ gap: '5%' }}>
          <Form.Group className="mb-3">
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="text"
              placeholder="Age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              isInvalid={!!formErrors.age}
              aria-invalid={!!formErrors.age}
            />
            <Form.Control.Feedback type="invalid">
              {formErrors.age}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Check
            type="radio"
            label="Male"
            name="genre"
            id="ml"
            value="male"
            onChange={handleChange}
            checked={formData.genre === 'male'}
            isInvalid={!!formErrors.genre}
          />
          <Form.Check
            type="radio"
            label="Female"
            name="genre"
            id="fm"
            value="female"
            onChange={handleChange}
            checked={formData.genre === 'female'}
            isInvalid={!!formErrors.genre}
          />
          <Form.Control.Feedback type="invalid">
            {formErrors.genre}
          </Form.Control.Feedback>
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
              isInvalid={!!formErrors.phone}
              aria-invalid={!!formErrors.phone}
            />
            <Form.Control.Feedback type="invalid">
              {formErrors.phone}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3 input-with-icon">
            <Form.Label>Email Address</Form.Label>
            <div className="icon"><MailIcon /></div>
            <Form.Control
              type="text"
              placeholder="Email Address"
              name="email"
              value={formData.email}
              onChange={handleChange}
              isInvalid={!!formErrors.email}
              aria-invalid={!!formErrors.email}
            />
            <Form.Control.Feedback type="invalid">
              {formErrors.email}
            </Form.Control.Feedback>
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
              isInvalid={!!formErrors.password}
              aria-invalid={!!formErrors.password}
            />
            <Form.Control.Feedback type="invalid">
              {formErrors.password}
            </Form.Control.Feedback>
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
              isInvalid={!!formErrors.confirmPassword}
              aria-invalid={!!formErrors.confirmPassword}
            />
            <Form.Control.Feedback type="invalid">
              {formErrors.confirmPassword}
            </Form.Control.Feedback>
          </Form.Group>
        </div>

        <div className='d-flex mb-4 ' style={{ gap: '5%' }}>
          <Form.Group controlId="statusSelect">
            <Form.Label>Status</Form.Label>
            <Form.Control
              as="select"
              onChange={handleChange}
              value={formData.status}
              name="status"
              isInvalid={!!formErrors.status}
              className={formErrors.status ? 'input-error' : ''}
            >
              <option value="">-----</option>
              <option value="Responsable">Responsable</option>
              <option value="Personal trainer">Personal trainer</option>
              <option value="Rehabilitation Specialist">Rehabilitation Specialist</option>
              <option value="Physical Therapist">Physical Therapist</option>
              <option value="Nutritionist">Nutritionist</option>
            </Form.Control>
            <Form.Control.Feedback className='feedback-error' type="invalid">{formErrors.status}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="locationSelect">
            <Form.Label>City</Form.Label>
            <Form.Control
              as="select"
              onChange={handleChange}
              value={formData.location}
              name="location"
              isInvalid={!!formErrors.location}
              className={formErrors.location ? 'input-error' : ''}
            >
              <option value="">-----</option>
              <option value="Dubai">Dubai</option>
              <option value="Abu Dhabi">Abu Dhabi</option>
              <option value="Sharjah">Sharjah</option>
              <option value="Ajman">Ajman</option>
              <option value="Fujairah">Fujairah</option>
              <option value="Ras Al Khaimah">Ras Al Khaimah</option>
              <option value="Umm Al Quwain">Umm Al Quwain</option>
            </Form.Control>
            <Form.Control.Feedback className='feedback-error' type="invalid">{formErrors.location}</Form.Control.Feedback>
          </Form.Group>
        </div>

        <div className="profile-image-container mb-4 mt-4">
          <Form.Label>Profile Picture</Form.Label>
          <Form.Control
            type="file"
            className="profile-image-input"
            name="picture"
            accept="image/*"
            onChange={handleChange}
            isInvalid={!!formErrors.picture}
            aria-invalid={!!formErrors.picture}
          />
          <Form.Control.Feedback type="invalid">
            {formErrors.picture}
          </Form.Control.Feedback>
        </div>

        <Button type="submit" className='button-primary' style={{ width: '100%' }}>Register</Button>
      </Form>
    </div>
  );
}

export default RegisterFormPartner;
