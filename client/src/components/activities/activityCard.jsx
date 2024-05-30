import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Image as BootstrapImage } from 'react-bootstrap';
import { LocationIcon, DateIcon, HeartIcon } from '../Icons';
import { formatDate } from '../tools/date';
import axios from 'axios';

const ActivityCard = ({ activity, isTopReserved }) => {
  
  const [isUpdating, setIsUpdating] = useState(false); // Add state for loading indicator

  const firstImage = activity.images.length > 0 ? activity.images[0] : null;
  const filename = firstImage ? firstImage.split("\\").pop() : null;
  

  const imageWidth = isTopReserved ? '600px' : '300px';



  return (
    <div>
      <div className="flex">
        {firstImage && (
          <BootstrapImage
            style={{ width: imageWidth, height: '300px', objectFit: 'cover', borderRadius: '6px' }}
            src={`http://localhost:4000/activity/${filename}`}
            alt={activity.title}
            fluid
          />
        )}
      </div>

      <div className="d-flex align-items-center justify-content-between text-dark mt-2">
        <h3 className="font-weight-bold text-dark" style={{ fontSize: '20px' }}>{activity.title}</h3>
        {/* <HeartIcon  /> */}
        {isUpdating && <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>}
      </div>

      <div className="d-flex align-items-center">
        <LocationIcon />
        <h5 className="text-muted mb-0 ms-2">{activity.location}</h5>
      </div>

      <div className="d-flex align-items-center">
        <DateIcon />
        <h5 className="text-muted mb-0 ms-2" style={{ fontSize: '16px' }}>{formatDate(activity.date)}</h5>
      </div>
    </div>
  );
};

ActivityCard.propTypes = {
  activity: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    date: PropTypes.string,
    location: PropTypes.string,
    price: PropTypes.number,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  isTopReserved: PropTypes.bool, // Prop indicating whether it's for top reserved activities or not
};

export default ActivityCard;
