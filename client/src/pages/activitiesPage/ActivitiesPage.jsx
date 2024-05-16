import { useEffect, useState } from "react";
import { axiosInstance } from "../../lib/axios";
import ActivityCard from "../../components/activities/activityCard";
import { Link } from "react-router-dom";
import {Container,Button} from 'react-bootstrap';
import Filter from "../../components/layout/Filter";

function ActivitiesHomePage() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
 

  useEffect(() => {
    setLoading(true);
    axiosInstance.get(`activities/listActivity`)
      .then(({ data }) => {
        setActivities(data.activities);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching activities:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="mt-5 container">
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <> 
        <div className="mb-5">
          <Filter/>
        </div>
        <div className="mt-8 row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4">
          {activities.map(activity => (
            <Link key={activity._id} to={'/activities/single/' + activity._id} style={{ textDecoration: 'none' }}>
              <ActivityCard activity={activity} />
            </Link>
          ))}
        </div>
        
        </>
      )}
    </div>
  );
}

export default ActivitiesHomePage;
