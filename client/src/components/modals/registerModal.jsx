import { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import UserService from '../../Services/userService';
import './modal.css';
import RegisterFormMember from '../forms/registerFormMember';

function RegisterModal({ show, handleClose }) {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegistration = async (formData) => {
    setIsLoading(true);
    setError(null);
    try {
      await UserService.signupMember(formData);
      handleClose(); 
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to register user';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Sign up</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <RegisterFormMember handleRegistration={handleRegistration} />
        {error && <p className="text-danger mt-2">{error}</p>}
        {isLoading && <p>Loading...</p>}
      </Modal.Body>
    </Modal>
  );
}

RegisterModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default RegisterModal;
