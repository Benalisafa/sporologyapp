// import Image from '../../components/Image'
import {Image} from 'react-bootstrap'
import img from '../../assets/Fitness Class Participation.jpg'
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
        src={img}
        style={{ width: '300px', height: '300px', objectFit: 'cover', borderRadius:'10px'}} 
      />

<div className="d-flex align-items-center justify-content-between text-dark mt-2">
  <h3 className="font-weight-bold text-dark" style={{fontSize:'20px'}}>{activity.title}</h3>
    <HeartIcon/>
</div>


      <div className="d-flex align-items-center">
        <LocationIcon />
        <h3 className="text-muted mb-0 ms-2" style={{fontSize:'16px'}}>{activity.location}</h3>
      </div>

      <div className="d-flex align-items-center">
        <DateIcon />
        <span className="text-muted mb-0 ms-2 " style={{fontSize:'16px'}}>{activity.date}</span>
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











      
     