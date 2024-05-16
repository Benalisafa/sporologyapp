import { useState } from 'react';
import { Button ,Form } from 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';
import { axiosInstance } from '../../lib/axios';

// import PropTypes from 'prop-types';
import './Forms.css'

function ContactForm() {
  
  const [formData, setFormData] = useState({
    title: '',
    email:'',
    description: '',
    
  });



  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    if (!formData.title) errors.title = 'Title is required';
    if (!formData.description) errors.description = 'Email is required';
    if (!formData.email) errors.email = 'Capacity is required';
    

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!validateForm()) return;
  
    const formDataToSend = new FormData();
  
  
    // Append other form data to formDataToSend
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('email', formData.capacity);
  

  
    try {
      const response = await axiosInstance.post('/contact', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data' 
        }
      });
      console.log(response.data);
      toast.success('message created successfully');
    } catch (err) {
      console.error(err);
    }
  };
  

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };





  return (

    
    <div>
    <Form className='mt-5 container-xs' noValidate onSubmit={handleSubmit}>
      <Toaster />

      <Form.Group className='mb-3'>
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" 
        placeholder="title" required
          value={formData.title}
          name="title"
          isInvalid={errors.title}
          onChange={handleChange}
        />
        <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className='mb-3'>
        <Form.Label>Email</Form.Label>
        <Form.Control  as="text"
            rows={3} placeholder="email" required
          value={formData.email}
          name="email"
          isInvalid={errors.email}
          onChange={handleChange}
        />
        <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className='mb-3'>
        <Form.Label>Description</Form.Label>
        <Form.Control  as="textarea"
            rows={3} placeholder="description" required
          value={formData.description}
          name="description"
          isInvalid={errors.description}
          onChange={handleChange}
        />
        <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
      </Form.Group>

      
     

      <Button type="submit" className='button-primary' style={{width:'100%'}}>Submit</Button>
     
    </Form>
    </div>
  );
}
// ActivityForm.propTypes = {
//   buttonLabel: PropTypes.string.isRequired, 
// };


  export default ContactForm;
  
