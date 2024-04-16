import React from 'react';

import { Image } from 'react-bootstrap';

import PropTypes from 'prop-types';

const ActivityCard = ({ activity }) => {
  
   return (
    <div>
      
        <Image style={{ width: '300px', height: '300px'  }}src="../../assets/react.svg" fluid className="rounded-2xl" /> 
      
      <div className="p-3">
        <h2 className="font-weight-bold">{activity.title}</h2>
        
        <div className="mt-1">
        <span className="text-sm text-muted">{activity.address}address</span>
        <br></br>
          <span className="text-sm text-muted">{activity.date}</span> 
        </div>
      </div>
    </div>
  );
};

ActivityCard.propTypes = {
  activity: PropTypes.shape({
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    
  }).isRequired,
};

export default ActivityCard;