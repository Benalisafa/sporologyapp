import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import axiosInstance from 'axios';

const UserRoleChart = () => {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/users/roleProportion');
        
        console.log('Response received:', response);
        
        // Check Content-Type to ensure it's JSON
        const contentType = response.headers['content-type'];
        if (!contentType || contentType.indexOf('application/json') === -1) {
          throw new Error('Received HTML response instead of JSON');
        }
        
        const data = response.data;
        const labels = Object.keys(data);
        const values = Object.values(data);
        
        setChartData({
          labels: labels,
          datasets: [
            {
              label: 'User Roles',
              data: values,
              backgroundColor: ['#FF6384', '#36A2EB'],
              hoverBackgroundColor: ['#FF6384', '#36A2EB'],
            },
          ],
        });
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching role proportion data:', error);
        setError('Error fetching data. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h5 style={{ textAlign: 'center', fontWeight: 'bold' }}>User Role Proportion</h5>
      <Pie data={chartData} />
    </div>
  );
};

export default UserRoleChart;
