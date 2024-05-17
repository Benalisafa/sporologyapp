import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import RegisterFormPartner from './registerFormPartner';

function CompanyForm({ onSubmit }) {
  const [companyName, setCompanyName] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [description, setDescription] = useState(''); // Added state for description (optional)
  const [completed, setCompleted] = useState(false); // State to track if company form is completed

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'companyName':
        setCompanyName(value);
        break;
      case 'companyAddress':
        setCompanyAddress(value);
        break;
      case 'description': // Update description state if needed
        setDescription(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass company data to parent component
    onSubmit({ companyName, companyAddress, description }); // Include description if used
    // Mark company form as completed
    setCompleted(true);
  };

  return (
    <div className='container-xs pt-5'>
      {!completed ? (
        <Form onSubmit={handleSubmit}>
          <h3 className='mb-4'>About your company</h3>
          <Form.Group className='mb-4'>
            <Form.Label>Company Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Company Name"
              name="companyName"
              value={companyName}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className='mb-4'>
            <Form.Label>Company Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Company Address"
              name="companyAddress"
              value={companyAddress}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className='mb-4'>
            <Form.Label>Description (Optional)</Form.Label>
            <Form.Control
              type="text"
              placeholder="Description"
              name="description"
              value={description}
              onChange={handleChange}
            />
          </Form.Group>
          <Button className='button-primary w-100' type="submit">Next</Button>
        </Form>
      ) : (
        <RegisterFormPartner /> // Ensure RegisterFormPartner can handle onSubmit
      )}
    </div>
  );
}

export default CompanyForm;
