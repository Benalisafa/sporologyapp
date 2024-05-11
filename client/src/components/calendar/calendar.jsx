import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { axiosInstance } from "../../lib/axios"
import { formatDate } from '../tools/date';
import './calendar.css';

const Calendar = () => {
    const [bookedActivities, setBookedActivities] = useState([]);
    const userId = useSelector(state => state.auth.user).userId;

    useEffect(() => {
        const fetchBookedActivities = async () => {
            try {
                const response = await axiosInstance.get(`/bookings/listUserBookings/${userId}`); 
                
                
                if (response.error) {
                    throw new Error(response.error.message);
                }
                
                const data = response.data;

                const activities = data.bookings.map(booking => ({
                    title: booking.activity.title, 
                    date: booking.activity.date,
                    time: booking.activity.time,
                    location: booking.activity.location
                }));
    
                 console.log(activities);
                setBookedActivities(activities);
               
            } catch (error) {
                console.error('Error fetching booked activities:', error);
            }
        };
    
        fetchBookedActivities();
    }, [userId]); 
    
    const eventContent = (arg) => {
        return (
            <div className="event">
                
                <div className="event-time">{arg.timeText}</div>
                <div className="event-title">{arg.event.title}</div>
                <div className="event-title">at {arg.event.extendedProps.location}</div>
            </div>
        );
    };

    return (
        <Container>
            <Row>
                <Col md={10}>
                    <FullCalendar
                        plugins={[dayGridPlugin]}
                        initialView="dayGridMonth"
                        events={bookedActivities} 
                        eventContent={eventContent}
                    />
                </Col>
                <Col>
                    <div className="event-list">
                        <h4 className="event-list-heading">Booking List</h4>
                        <ul className="event-list-items">
                            {bookedActivities.map((activity, index) => (
                                <li key={index} className="event-list-item">
                                    {activity.title} - {formatDate(activity.date)}
                                </li>
                            ))}
                        </ul>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Calendar;