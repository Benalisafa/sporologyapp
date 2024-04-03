import React from 'react';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';

const ActivityCard = ({ activity }) => {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{activity.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
        <Card.Text>{activity.description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

ActivityCard.propTypes = {
  activity: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    // Add prop types for other activity properties if needed
  }).isRequired,
};

export default ActivityCard;