import React, { useState } from 'react';
import RegisterForm from '../../components/forms/registerForm';
import CompanyForm from '../../components/forms/companyForm'; 
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; 
import UserService from '../../Services/userService';

function Register() {
  const [partnerType, setPartnerType] = useState(null);
  const [companyData, setCompanyData] = useState({});
  const [registerFormData, setRegisterFormData] = useState({});
  const navigate = useNavigate();

  const handlePartnerTypeClick = (type) => {
    setPartnerType(type);
  };

  const handleCompanyFormSubmit = (data) => {
    setCompanyData(data);
    setPartnerType('individual');
  };

  const handleRegisterFormSubmit = async (registerData) => {
    const combinedData = { ...companyData, ...registerData };
    const response = await UserService.signupPartner(combinedData);

    if (!response.ok) {
      console.error('Error saving data to database:', response);
      return;
    }

    console.log("Data saved successfully");
    // Redirect or perform any other action after successful submission
    // navigate('/success');
  };

  return (
    <div className='container-s' style={{backgroundColor:'var(--bs-light-blue)'}}>
      {partnerType === null && (
        <div className='d-flex flex-column align-items-center ' style={{paddingTop:'10%'}}>
          <h3>Who are you?</h3>
          <br/>
          <br/>
          <Button className='button-extra' onClick={() => handlePartnerTypeClick('individual')}>
            Individual
          </Button>
          <br/>
          <Button className='button-extra' onClick={() => handlePartnerTypeClick('company')}>
            Company
          </Button>
        </div>
      )}

      {partnerType === 'company' && (
        <CompanyForm onSubmit={handleCompanyFormSubmit} />
      )}

      {partnerType === 'individual' && (
        <RegisterForm onSubmit={handleRegisterFormSubmit} />
      )}
    </div>
  );
}

export default Register;
