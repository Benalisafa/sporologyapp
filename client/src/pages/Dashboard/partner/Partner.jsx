import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../../lib/axios";
import ActivityCard from "../../../components/activities/activityCard";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { userData } from "../../../redux/reducers/auth.reducer";

function Partner() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUser = useSelector(userData); // Assuming userData contains the user's ID
  // console.log(currentUser);

  useEffect(() => {
    axiosInstance.get('activities/listActivity')
      .then(({ data }) => {
        console.log(data.activities);
        
        // Filter activities based on the current user's ID
        const userActivities = data.activities.filter(activity => activity.owner === currentUser.userId);
        
        setActivities(userActivities); 
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching activities:", error);
        setLoading(false);
      });
  }, [currentUser]); // Re-fetch activities when currentUser changes

  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <h1>Activities: {activities ? activities.length : 0}</h1>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {activities && activities.map(activity => (
              <Link key={activity._id} to={'/account/activities/' + activity._id} style={{ textDecoration: 'none' }}>
                <ActivityCard activity={activity} />
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Partner;
