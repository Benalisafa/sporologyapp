import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import UserService from '../../Services/userService';
import { useNavigate } from 'react-router-dom';
import RegisterFormPartner from '../../components/forms/registerFormPartner';
import CompanyForm from '../../components/forms/companyForm';

function Register() {
  const [partnerType, setPartnerType] = useState(null);
  const [companyData, setCompanyData] = useState({});
  const navigate = useNavigate();

  const handlePartnerTypeClick = (type) => {
    setPartnerType(type);
  };

  const handleCompanyFormSubmit = (data) => {
    setCompanyData(data);
    setPartnerType('individual'); // Switch to individual form after company form is submitted
  };

  const handleRegisterFormSubmit = async (registerData) => {
    const combinedData = { ...companyData, ...registerData };

    const formDataToSend = new FormData();
    Object.keys(combinedData).forEach((key) => {
      formDataToSend.append(key, combinedData[key]);
    });

    try {
      const response = await UserService.signupPartner(formDataToSend);
      if (response.status >= 200 && response.status < 300) {
        console.log("Data saved successfully");
        navigate('/partner/login');
      } else {
        console.error('Error saving data to database:', response);
      }
    } catch (error) {
      console.error('Error saving data to database:', error);
    }
  };

  return (
    <div className='container-s' style={{ backgroundColor: 'var(--bs-light-blue)', height: '80vh' }}>
      {partnerType === null && (
        <div className='d-flex flex-column align-items-center ' style={{ paddingTop: '10%' }}>
          <h3>Who are you?</h3>
          <br />
          <br />
          <Button className='button-extra' onClick={() => handlePartnerTypeClick('individual')}>
            Individual
          </Button>
          <br />
          <Button className='button-extra' onClick={() => handlePartnerTypeClick('company')}>
            Company
          </Button>
        </div>
      )}

      {partnerType === 'company' && (
        <CompanyForm onSubmit={handleCompanyFormSubmit} />
      )}

      {partnerType === 'individual' && (
        <RegisterFormPartner onSubmit={handleRegisterFormSubmit} />
      )}
    </div>
  );
}

export default Register;
