
import {Carousel } from 'react-bootstrap';
import PropTypes from "prop-types";
import DisplayRating from "../../components/reviews/DisplayRating";
import bg from '../../assets/dark-bg.jpg';
import { formatDate } from '../tools/date';


const Review = ({ reviews }) => {
  
  return (
    <div style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover', color: "white", textAlign: "center", width: "100%", height: '300px' }}>
      <Carousel className="p-5" style={{ height: '300px' }}>
        {reviews
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .map(review => (
            <Carousel.Item key={review._id} >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                className="d-flex flex-column text-align-center "
              >
                <div className="d-flex ">
                  <p>{formatDate(review.date)}</p>
                  <DisplayRating rating={review.rating} />
                </div>
                <p style={{ width: '50%' }}>{review.experience}</p>
              </div>
            </Carousel.Item>
          ))}
      </Carousel>
    </div>
  );
};

Review.propTypes = {
    reviews: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      experience: PropTypes.string.isRequired,
    })).isRequired,
  };

export default Review;