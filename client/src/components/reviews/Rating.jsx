import React, { useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { StarIcon } from '../Icons';
import { Form, Button } from 'react-bootstrap';
import { axiosInstance } from '../../lib/axios';

function Rating({ activityId }) {
    const [rating, setRating] = useState(1);
    const [hover, setHover] = useState(null);
    const [experience, setExperience] = useState('');

    const handleMouseOver = (index) => {
        setHover(index);
    };

    const handleMouseLeave = () => {
        setHover(0);
    };

    const handleClick = (index) => {
        // Set the rating to the index of the clicked star plus 1
        setRating(index);
    };

    const handleInputChange = (event) => {
        setExperience(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
            // Get the current date
            const currentDate = new Date();
            // Send the rating, experience, current date, and activityId to the backend
            const response = await axiosInstance.post('/reviews/createReview', { 
                rating, 
                experience, 
                activityId,
                date: currentDate.toISOString() // Convert the date to a string in ISO format
            });
            console.log(response.data);
            // Handle success, maybe show a success message to the user
        } catch (error) {
            console.error('Error submitting rating:', error);
            // Handle error, maybe show an error message to the user
        }
    };
    

    return (
        <div className="mt-4">
            {[...Array(5)].map((star, index) => {
                const currentRating = index + 1;
                return (
                    <span
                        key={index}
                        style={{
                            cursor: 'pointer',
                            marginRight: '5px',
                        }}
                        onMouseOver={() => handleMouseOver(currentRating)}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => handleClick(currentRating)}
                    >
                        <StarIcon
                            filled={currentRating <= (hover || rating)}
                            filledColor="#00EED1"
                            unfilledColor="#e4e5e9"
                        />
                    </span>
                );
            })}
            <Form onSubmit={handleSubmit} >
                <Form.Group className='mt-4 mb-4' style={{ width: '100%' }}>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Describe your experience"
                        value={experience}
                        name="experience"
                        onChange={handleInputChange}
                        style={{ height: '100px' ,border: '2px solid black', 
                        backgroundColor: 'transparent' }}
                    />
                </Form.Group>
                <Button className='button-primary' type="submit">Send</Button>
            </Form>
        </div>
    );
}

// Add props validation
Rating.propTypes = {
    activityId: PropTypes.string.isRequired, // Define activityId as a required string
};

export default Rating;
