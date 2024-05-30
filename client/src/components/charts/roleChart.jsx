import React, { useEffect, useState } from 'react';

import { axiosInstance } from '../../lib/axios';

const UserRoleChart = () => {
  const [data, setData] = useState({ member: 0, partner: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/users/roleProportion');
        setData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/activities/count');
        setCount(response.data.count);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <div className='d-flex justify-content-around mt-4'>
        <div className='border rounded text-center p-4 ' style={{backgroundColor:'var(--bs-light-grey)'}}>
      <div style={{fontSize:'20px'}}>Members:</div><div style={{fontSize:'30px', width:'18vw'}}>{data.member}</div> 
      </div>
      <div className='border rounded text-center p-4 'style={{backgroundColor:'var(--bs-light-grey)'}}>
      <div style={{fontSize:'20px'}}>Partners:</div><div style={{fontSize:'30px', width:'18vw'}}>{data.partner}</div> 
      </div>
      <div className='border rounded text-center p-4 'style={{backgroundColor:'var(--bs-light-grey)'}}>
      <div style={{fontSize:'20px'}}>Activities:</div><div style={{fontSize:'30px', width:'18vw'}}>{count}</div> 
      </div>
      </div>
    </div>
  );
};

export default UserRoleChart;
