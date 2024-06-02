import React from 'react';
import UserGrowthChart from '../../../components/charts/userChart';
import UserRoleChart from '../../../components/charts/roleChart';
import BookingTrendsChart from '../../../components/charts/bookingTrends';

const AdminStat = () => {
  return (
    <div>
        <h3 className="mt-4">Statistics</h3>
        <UserRoleChart />

    <div className="d-flex mt-5">
        <div style={{width:'50%'}}>
      <UserGrowthChart />
      </div>
      <div style={{width:'50%'}}>
      <BookingTrendsChart />
      {/* <UserRoleChart/> */}
      </div>
    </div>
    </div>
  );
};

export default AdminStat;
