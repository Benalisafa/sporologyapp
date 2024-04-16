import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import RegisterForm from '../forms/registerForm';
import Button from 'react-bootstrap/Button';
import LoginForm from '../forms/loginForm';

function RegisterModal({ show, handleClose }) {
  const [error, setError] = useState(null);

  const handleRegistration = async (formData) => {
    try {
      // Assuming UserService.signup returns a promise
      await UserService.signup(formData);
      handleClose(); // Close the modal upon successful registration
    } catch (err) {
      setError(err.response.data.message || 'Failed to register user');
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Register</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <RegisterForm handleRegistration={handleRegistration} />
        {error && <p className="text-danger mt-2">{error}</p>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

RegisterModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default RegisterModal;
