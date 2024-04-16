import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import LoginForm from '../forms/loginForm';
import UserService from '../../Services/userService'

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
        <LoginForm handleRegistration={handleRegistration} />
        {error && <p className="text-danger mt-2">{error}</p>}
      </Modal.Body>
    </Modal>
  );
}

RegisterModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default RegisterModal;
