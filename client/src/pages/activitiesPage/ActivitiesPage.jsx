import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../lib/axios";
import ActivityCard from "../../components/activities/activityCard";
import { Link } from "react-router-dom";


function ActivitiesHomePage() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    axiosInstance.get('activities/listActivity')
      .then(({ data }) => {
       
        console.log(data);  
        setActivities(data.activities); 
       
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching activities:", error);
        setLoading(false);
      });
  }, []);


            // useEffect(async() => {

            //   try {
            //     const activities = ( await axiosInstance.get('activities/listActivity') ).data

            //     setActivities(activities)
            //     setLoading(false);

            //   }
            //   catch (error){
            //     console.log (error)
            //     setLoading(false);
            //   }
            // },[] )
  

  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <> 
        
          <h1>Activities: {activities.length}</h1>
          <div className="mt-8 row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4 " >
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