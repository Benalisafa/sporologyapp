import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import toast, { Toaster } from 'react-hot-toast';
import UserService from '../../Services/userService';
import { useNavigate } from 'react-router-dom';
import { EyeIcon, EyeSlashIcon, MailIcon, PhoneIcon } from '../Icons';
import './Forms.css';

function RegisterFormMember() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    phone: '',
    genre: '',
    picture: '', 
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstname) newErrors.firstname = 'First name is required';
    if (!formData.lastname) newErrors.lastname = 'Last name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.password) newErrors.password = 'Password is required';
    if (!formData.password) newErrors.confirmPassword = 'Passwords do not match';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    else if (!/^\d{8}$/.test(formData.phone)) newErrors.phone = 'Number must be 8 digits';
  
    if (!formData.genre) newErrors.genre = 'Gender is required';
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;
    await UserService.signupMember(formData);
    toast.success('User added successfully');
    setFormData({
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      confirmPassword: '',
      address: '',
      phone: '',
      genre: '',
      picture: '',
    });
    navigate('/');
    // try {
    //   // Check if the email already exists in the database
    //   const emailExists = await UserService.checkEmailExists(formData.email);
    //   if (emailExists) {
    //     setErrors({ email: 'Email is already in use' });
    //     return;
    //   }
  
    //   // If the email is unique, proceed with registration
    //   await UserService.signupMember(formData);
    //   toast.success('User added successfully');
    //   setFormData({
    //     firstname: '',
    //     lastname: '',
    //     email: '',
    //     password: '',
    //     confirmPassword: '',
    //     address: '',
    //     phone: '',
    //     genre: '',
    //     picture: '',
    //   });
    //   navigate('/');
    // } catch (err) {
    //   setErrors(err.response?.data?.errors || { general: err.response?.data?.message || 'Failed to register user' });
    // }
  };

  return (
    <div className='container-s d-flex align-items-center justify-content-center'>
      <Form className="mt-3" onSubmit={handleSubmit}>
        <Toaster />
        <div className='d-flex mb-4 ' style={{ gap: '5%' }}>
          <Form.Group controlId="firstname">
            <Form.Label>First name</Form.Label>
            <Form.Control
              type="text"
              placeholder="First name"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              isInvalid={!!errors.firstname}
              aria-invalid={!!errors.firstname}
            />
            <Form.Control.Feedback type="invalid">
              {errors.firstname}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="lastname">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Last name"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              isInvalid={!!errors.lastname}
              aria-invalid={!!errors.lastname}
            />
            <Form.Control.Feedback type="invalid">
              {errors.lastname}
            </Form.Control.Feedback>
          </Form.Group>
        </div>

        <div className='d-flex ' >

        <Form.Group className="mb-3">
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="text"
              placeholder="Age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              isInvalid={!!errors.age}
              aria-invalid={!!errors.age}
            />
            <Form.Control.Feedback type="invalid">
              {errors.age}
            </Form.Control.Feedback>
          </Form.Group>

        <Form.Group className="mb-3 " controlId="genre">
  <Form.Label>Gender</Form.Label>
  <div className='d-flex ' style={{ gap: '5%' }}>
    <Form.Check
      type="radio"
      label="Male"
      id="male"
      name="genre"
      value="male"
      onChange={handleChange}
      isInvalid={!!errors.genre}
      aria-invalid={!!errors.genre}
    />
    <Form.Check
      type="radio"
      label="Female"
      id="female"
      name="genre"
      value="female"
      onChange={handleChange}
      isInvalid={!!errors.genre}
      aria-invalid={!!errors.genre}
    />
  </div>
  
  <Form.Control.Feedback type="invalid" style={{ display: 'block' }}>
    {errors.genre}
  </Form.Control.Feedback>
</Form.Group>
</div>

        <div className='d-flex mb-4 ' style={{ gap: '5%' }}>
          <Form.Group className="input-with-icon" controlId="phone">
            <Form.Label>Phone Number</Form.Label>
            <div className="icon"><PhoneIcon /></div>
            <Form.Control
              type="text"
              placeholder="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              isInvalid={!!errors.phone}
              aria-invalid={!!errors.phone}
            />
            <Form.Control.Feedback type="invalid">
              {errors.phone}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="input-with-icon" controlId="email">
            <Form.Label>Email Address</Form.Label>
            <div className="icon"><MailIcon /></div>
            <Form.Control
              type="text"
              placeholder="Email Address"
              name="email"
              value={formData.email}
              onChange={handleChange}
              isInvalid={!!errors.email}
              aria-invalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>
        </div>

        <div className='d-flex mb-4' style={{ gap: '5%' }}>
          <Form.Group className="input-with-icon" controlId="password">
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

          <Form.Group className="input-with-icon" controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <div className="icon" onClick={() => setShowConfirmPassword(!showConfirmPassword)} style={{ cursor: 'pointer' }}>
              {showConfirmPassword ? <EyeSlashIcon /> : <EyeIcon />}
            </div>
            <Form.Control
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              isInvalid={!!errors.confirmPassword}
              aria-invalid={!!errors.confirmPassword}
            />
            <Form.Control.Feedback type="invalid">
              {errors.confirmPassword}
            </Form.Control.Feedback>
          </Form.Group>
        </div>

        {errors.general && <div className="text-danger mb-4">{errors.general}</div>}

        <Button type="submit" className='button-primary' style={{width:'100%'}}>Register</Button>
      </Form>
    </div>
  );
}

export default RegisterFormMember;
