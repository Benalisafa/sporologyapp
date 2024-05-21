import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import 'chart.js/auto';
import moment from 'moment';
import { axiosInstance } from '../../lib/axios';

const UserGrowthChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'New Users',
        data: [],
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.1
      }
    ]
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/users/registrationData');
        const data = response.data;

        const weeks = data.map(item => {
          const startOfWeek = moment().year(item._id.year).isoWeek(item._id.week).startOf('isoWeek').format('YYYY-MM-DD');
          return startOfWeek;
        });
        const counts = data.map(item => item.count);

        setChartData({
          labels: weeks,
          datasets: [
            {
              label: 'New Users',
              data: counts,
              fill: false,
              borderColor: 'rgba(75,192,192,1)',
              tension: 0.1
            }
          ]
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user registration data:', error.message);
        setError('Failed to load data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h5 style={{ textAlign: 'center', fontWeight: 'bold' }}>User Growth Over Time (Weekly)</h5>
      <Line data={chartData} />
    </div>
  );
};

export default UserGrowthChart;
