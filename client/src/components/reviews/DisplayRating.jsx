import React from 'react';
import { StarIcon } from '../Icons';
import PropTypes from 'prop-types';

const DisplayRating = ({ rating }) => {
  // Check if rating is null, and if so, set it to 0
  const normalizedRating = rating !== null ? rating : 0;

  const stars = [];
  const maxStars = 5; // Assuming a maximum of 5 stars
  const filledColor = "#00EED1"; // Blue color for filled stars
  const unfilledColor = "#e4e5e9"; // Grey color for unfilled stars

  // Fill stars based on the rating
  for (let i = 0; i < maxStars; i++) {
    if (i < normalizedRating) {
      stars.push(<StarIcon key={i} filled filledColor={filledColor} unfilledColor={unfilledColor} />);
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
