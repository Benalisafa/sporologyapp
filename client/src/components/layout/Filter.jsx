import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { SearchIcon } from '../Icons';
import styles from './filter.module.css'

function Filter() {
  const [activity, setActivity] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [inputType, setInputType] = useState('text');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Construct search query
    const searchQuery = {
      activity: activity.trim(),
      location: location.trim(),
      date: date.trim(),
    };
    // Encode search query as query string
    const queryString = new URLSearchParams(searchQuery).toString();
    // Navigate to search results page with query string
    navigate(`/search?${queryString}`);
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-4">
      <Form className="d-inline-flex rounded-pill pe-4 py-2" style={{ border: 'solid 1px #ccc' }} onSubmit={handleSubmit}>
        <Form.Control
          type="text"
          placeholder="Activity"
          className={` ${styles.formControl}`}
          
         
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
        />
        <Form.Control 
          type="text"
          placeholder="Where?"
          className={` ${styles.formControl}`}
          
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <Form.Control
           type={inputType} // Set the type dynamically based on state
           placeholder="When?"
           className={` ${styles.formControl}`}
           style={{ borderRight: 'none ' }}
           value={date}
           onFocus={() => setInputType('date')} // Change type to date on focus
           onBlur={() => setInputType('text')} // Change type back to text on blur
           onChange={(e) => setDate(e.target.value)}
        />
        <Button type="submit" className="button-circle">
          <SearchIcon />
        </Button>
      </Form>
    </div>
  );
}

export default Filter;
