import React from 'react';
import PropTypes from 'prop-types';
import { Image as BootstrapImage } from 'react-bootstrap';
import { LocationIcon, DateIcon, HeartIcon } from '../Icons';

const ActivityCard = ({ activity }) => {
  
  const firstImage = activity.images.length > 0 ? activity.images[0] : null;
  const filename = firstImage.split('/').pop();
  

  return (
    <div>
      <div className="bg-secondary mb-2 rounded-2xl flex">
        {firstImage && (
          <BootstrapImage
            style={{ width: '300px', height: '300px', objectFit: 'cover', borderRadius: '6px' }}
            src={`http://localhost:4000/activity/${filename}`}
            alt={activity.title}    
            fluid
          />
        )}
      </div>

      <div className="d-flex align-items-center justify-content-between text-dark mt-2">
        <h3 className="font-weight-bold text-dark" style={{ fontSize: '20px' }}>{activity.title}</h3>
        <HeartIcon />
      </div>

      <div className="d-flex align-items-center">
        <LocationIcon />
        <h5 className="text-muted mb-0 ms-2">{activity.location}</h5>
      </div> 

      <div className="d-flex align-items-center">
        <DateIcon />
        <h5 className="text-muted mb-0 ms-2 " style={{ fontSize: '16px' }}>{activity.date}</h5>
      </div>
    </div>
  );
};


ActivityCard.propTypes = {
  activity: PropTypes.shape({
    title: PropTypes.string.isRequired,
    date: PropTypes.string,
    location: PropTypes.string,
    price: PropTypes.number,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default ActivityCard;
