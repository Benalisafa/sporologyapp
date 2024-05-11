import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import RegisterForm from './registerForm';

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

  // Render company form if not completed, otherwise render a message
  return (
    <div>
      {!completed ? (
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Company Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Company Name"
              name="companyName"
              value={companyName}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Company Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Company Address"
              name="companyAddress"
              value={companyAddress}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description (Optional)</Form.Label>
            <Form.Control
              type="text"
              placeholder="Description"
              name="description"
              value={description}
              onChange={handleChange}
            />
          </Form.Group>
          <button type="submit">Next</button>
        </Form>
      ) : (
        <RegisterForm/>
      )}
    </div>
  );
}

export default CompanyForm;
