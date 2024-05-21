import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axiosInstance from 'axios';

const BookingTrendsChart = () => {
  const [bookingData, setBookingData] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    fetchBookingData();
  }, []);

  const fetchBookingData = async () => {
    try {
      const response = await axiosInstance.get('/bookings/trends');
      setBookingData(response.data);
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.error('Error fetching booking data:', error);
      setLoading(false); // Ensure loading state is set to false on error
    }
  };

  // Prepare data for the chart
  const prepareChartData = () => {
    if (!Array.isArray(bookingData) || bookingData.length === 0) {
      return {
        labels: [],
        datasets: [{
          label: 'Bookings',
          data: [],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
        }],
      };
    }

    // Assuming bookingData has a structure to map over
    const data = {
      labels: bookingData.map(entry => entry._id), // Example using _id for labels
      datasets: [
        {
          label: 'Bookings',
          data: bookingData.map(entry => entry.count), // Example using count for data points
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
        },
      ],
    };
    return data;
  };

  if (loading) {
    return <p>Loading...</p>; // Render loading state if data is being fetched
  }

  return (
    <div>
      <h5 style={{ textAlign: 'center', fontWeight: 'bold' }}>Booking Trends</h5>
      <Line data={prepareChartData()} />
    </div>
  );
};

export default BookingTrendsChart;
