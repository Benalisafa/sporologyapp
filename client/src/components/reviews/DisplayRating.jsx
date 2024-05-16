import React from 'react';
import PropTypes from 'prop-types';
import { StarIcon } from '../Icons';

const DisplayRating = ({ rating }) => {
  const maxStars = 5;
  const filledColor = "#00EED1"; // Blue color for filled stars
  const unfilledColor = "#e4e5e9"; // Grey color for unfilled stars

  const stars = [];

  // Fill full stars
  for (let i = 1; i <= maxStars; i++) {
    if (i <= rating) {
      stars.push(<StarIcon key={i} filled filledColor={filledColor} unfilledColor={unfilledColor} />);
    } else if (i === Math.ceil(rating) && rating % 1 >= 0.5) {
      // If the rating is a decimal and the decimal part is greater than or equal to 0.5, add a half star
      stars.push(<StarIcon key={i} filledHalf filledColor={filledColor} unfilledColor={unfilledColor} />);
    } else {
      stars.push(<StarIcon key={i} filled={false} filledColor={filledColor} unfilledColor={unfilledColor} />);
    }
  }

  return <div>{stars}</div>;
};

DisplayRating.propTypes = {
  rating: PropTypes.number.isRequired, // Change the type to number and provide a default value
};

export default DisplayRating;
