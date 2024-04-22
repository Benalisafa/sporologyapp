import React, { useState } from 'react';
import { StarIcon } from '../Icons'

function Rating() {
    const [rating, setRating] = useState(null)
    const [hover, setHover] = useState(null)

    const handleMouseOver = (index) => {
        setHover(index);
      };
    
      const handleMouseLeave = () => {
        setHover(0);
      };
    
      const handleClick = (index) => {
        setRating(index);
      };

  return (
    <div className="mt-4">
      {[...Array(5)].map((star, index) => {
        const currentRating= index+1
        return(
            
            <span
            key={index}
            style={{
              cursor: 'pointer',
              marginRight: '5px',
              color: currentRating <= (hover || rating) ? '#00EED1' : '#e4e5e9',
            }}
            onMouseOver={() => handleMouseOver(currentRating)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(currentRating)}
          >
            <StarIcon/> 
            </span>
          
              
        )
      })}
    </div>
  );
}

export default Rating;
