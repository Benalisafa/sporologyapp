import React, { useState , useEffect } from 'react';
import PropTypes from 'prop-types';
import { Image as BootstrapImage } from 'react-bootstrap';
import { LocationIcon, HeartIcon } from '../Icons'; // Assuming DateIcon is not needed for partners
import { formatDate } from '../tools/date';
import axiosInstance from 'axios';
import logo from '../../assets/sporology-logo.svg';

const PartnerCard = ({ partner }) => {
  const [isUpdating, setIsUpdating] = useState(false); // Add state for loading indicator
  // const firstImage = activity.images.length > 0 ? activity.images[0] : null;
  const filename=partner.picture;
  


  return (
    <div>
      <div className='mb-4' style={{backgroundColor:'var(--bs-light-grey)', height:'400px', width:'350px',border:'solid,1px,black'}}>
        <div>
          <div style={{paddingLeft:'10%', paddingTop:'10%',paddingBottom:'10%'}}>
          <div className="flex">
        
          <BootstrapImage 
            style={{  height: '200px', objectFit: 'cover', borderRadius: '6px', width:'80%' }}
            src={`http://localhost:4000/profile/${filename}`}
            fluid
          />
        
      </div>
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
    picture: PropTypes.string, // Add picture prop
  }).isRequired,
};

export default PartnerCard;
