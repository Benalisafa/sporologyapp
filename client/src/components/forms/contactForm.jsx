import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';
import { axiosInstance } from '../../lib/axios';
import './Forms.css';

function ContactForm() {
  const [formData, setFormData] = useState({
    title: '',
    email: '',
    description: '',
  });

  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.title) errors.title = 'Title is required';
    if (!formData.description) errors.description = 'Description is required';
    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      errors.email = 'Invalid email format';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await axiosInstance.post('/contact', formData);
      console.log(response.data);
      toast.success('Message sent successfully');
    } catch (err) {
      console.error(err);
      toast.error('Failed to send message');
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });

    // Clear the error message for the field being updated
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  return (
    <div>
      <Form className='mt-5 container-xs' noValidate onSubmit={handleSubmit}>
        <Toaster />

        <Form.Group className='mb-3'>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Title"
            required
            value={formData.title}
            name="title"
            isInvalid={!!errors.title}
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            required
            value={formData.email}
            name="email"
            isInvalid={!!errors.email}
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Description"
            required
            value={formData.description}
            name="description"
            isInvalid={!!errors.description}
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
        </Form.Group>

        <Button type="submit" className='button-primary' style={{ width: '100%' }}>Submit</Button>
      </Form>
    </div>
  );
}

export default ContactForm;
