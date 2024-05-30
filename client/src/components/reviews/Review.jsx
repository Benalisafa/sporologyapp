import { Carousel } from 'react-bootstrap';
import PropTypes from "prop-types";
import DisplayRating from "../../components/reviews/DisplayRating";
import bg from '../../assets/dark-bg.jpg';
import { formatDate } from '../tools/date';

const Review = ({ reviews, users }) => {
  return (
    <div style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover', color: "white", textAlign: "center", width: "100%", minHeight: '300px' }}>
      <Carousel className="p-5" style={{ minHeight: '300px' }}>
        {reviews
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .map(review => (
            <Carousel.Item key={review._id}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                }}
              >
                <p>{formatDate(review.date)}</p>
                <div className="d-flex align-items-center justify-content-center mb-2">
                  <DisplayRating rating={review.rating} />
                </div>
                <p style={{ width: '75%', marginBottom: '1rem' }}>{review.experience}</p>
                {review.userId && users && users[review.userId] && (
                  <p>Posted by: {users[review.userId].firstname} {users[review.userId].lastname}</p>
                )}
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
    userId: PropTypes.string  // Make userId optional
  })).isRequired,
  users: PropTypes.object.isRequired
};

export default Review;
