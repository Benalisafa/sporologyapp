import { useEffect, useState } from "react";
import { axiosInstance } from "../../lib/axios";
import ActivityCard from "../../components/activities/activityCard";
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Filter from "../../components/layout/Filter";



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



  return (
    
    <Container className="mt-5">
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <> 
        <div className="mb-5">
        <Filter/>
        </div>
        
          {/* <h1>Activities: {activities.length}</h1> */}
          <div className="mt-8 row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4 " style={{margin:"300"}} >
            
            {activities.map(activity => (
              
            <Link key={activity._id} to={'/activities/single/' + activity._id} style={{ textDecoration: 'none' }}>
         
          <ActivityCard activity={activity} />
        </Link>

            ))}
          </div>
        </>
      )}
    </Container>

  );
}

export default ActivitiesHomePage;