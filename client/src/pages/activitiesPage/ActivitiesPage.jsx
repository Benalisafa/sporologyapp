import { useEffect, useState } from "react";
import { axiosInstance } from "../../lib/axios";
import ActivityCard from "../../components/activities/activityCard";
import { Link } from "react-router-dom";
import {Container,Button} from 'react-bootstrap';
import Filter from "../../components/layout/Filter";

function ActivitiesHomePage() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // Adjust the page size as needed

  useEffect(() => {
    setLoading(true);
    axiosInstance.get(`activities/listActivity?page=${currentPage}&pageSize=${pageSize}`)
      .then(({ data }) => {
        setActivities(data.activities);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching activities:", error);
        setLoading(false);
      });
  }, [currentPage, pageSize]);

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
        {/* Pagination controls */}
        <div className="mt-3">
          <button onClick={() => setCurrentPage(prevPage => Math.max(prevPage - 1, 1))} disabled={currentPage === 1}>
            Previous
          </button>
          <span>Page {currentPage}</span>
          <Button className="button-primary" onClick={() => setCurrentPage(prevPage => prevPage + 1)}>Next</Button>
        </div>
        </>
      )}
    </div>
  );
}

export default ActivitiesHomePage;
