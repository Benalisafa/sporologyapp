// import Image from '../../components/Image'
import {Image} from 'react-bootstrap'

import PropTypes from 'prop-types';
import { LocationIcon, DateIcon ,HeartIcon} from '../Icons';


const ActivityCard = ({ activity }) => {
  return (
    <div>
      {/* <div className="bg-secondary mb-2 rounded-2xl flex">
          {activity.photos?.[0] && (
            <Image className="rounded-2xl" src={activity.photos?.[0]} alt="" fluid />
          )}
        </div> */}

        <Image
        src="https://images.unsplash.com/photo-1493770348161-369560ae357d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80"
        style={{ width: '366px', height: '366px', objectFit: 'cover' }}
        fluid
        className="rounded-2xl"
      />

<div className="d-flex align-items-center justify-content-between text-dark">
  <h3 className="font-weight-bold text-dark">{activity.title}</h3>
    <HeartIcon/>
</div>


      <div className="d-flex align-items-center">
        <LocationIcon />
        <h3 className="text-muted mb-0 ms-2 fs-5">{activity.location}</h3>
      </div>

      <div className="d-flex align-items-center">
        <DateIcon />
        <span className="text-muted mb-0 ms-2 fs-8">${activity.date}</span>
      </div>
    </div>
  );
};

ActivityCard.propTypes = {
  activity: PropTypes.shape({
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    photos: PropTypes.string.isRequired,
  }).isRequired,
};

export default ActivityCard;











      
     