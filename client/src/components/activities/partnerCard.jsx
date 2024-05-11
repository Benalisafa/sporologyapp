import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Image as BootstrapImage } from 'react-bootstrap';
import { LocationIcon, HeartIcon } from '../Icons'; // Assuming DateIcon is not needed for partners
import { formatDate } from '../tools/date';
import axiosInstance from 'axios';
import logo from '../../assets/sporology-logo.svg'
const PartnerCard = ({ partner }) => {
  const [isUpdating, setIsUpdating] = useState(false); // Add state for loading indicator

  

  return (
    <div>
      

      <div className='mb-4' style={{backgroundColor:'var(--bs-light-grey)', height:'250px', width:'350px'}} >
  <div>
    <div style={{paddingLeft:'10%', paddingTop:'10%',paddingBottom:'10%'}}> 
    <img src={logo} className='logo-img' alt="logo" />
      <h5 className="font-weight-bold text-dark mt-2" style={{ fontSize: '20px' }}>{partner.firstname}</h5>
      <h5 className="text-muted ">{partner.lastname}</h5>
    </div>
  </div>
  {isUpdating && 
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  }
</div>


      
    </div>
  );
};

PartnerCard.propTypes = {
  partner: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string,
    
  }).isRequired,
};

export default PartnerCard;
