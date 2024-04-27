import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../lib/axios";
import { useParams } from "react-router-dom";

import Filter from "../../components/layout/Filter";
import {Container} from 'react-bootstrap';
import { LocationIcon, DateIcon } from "../../components/Icons";
import BookingWidget from "../../components/activities/BookingWidget";
import Rating from "../../components/reviews/Rating"; 
import Review from "../../components/reviews/Review";

const ActivityPage = () => {
  const { id } = useParams();
  const [activity, setActivity] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activityId, setActivityId] = useState(null); // State to hold activityId



  useEffect(() => {
    axiosInstance.get(`activities/listActivity/${id}`)
      .then(response => {
        // console.log('Activity images:', response.data.images);
        setActivity(response.data);
        setActivityId(response.data._id); // Set activityId from response
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (activityId) { 
      axiosInstance.get(`reviews/getReviewsByActivityId/${activityId}`)
        .then(response => {
          setReviews(response.data);
        })
        .catch(error => {
          console.error('Error fetching reviews:', error);
        });
    }
  }, [activityId]);

  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }


  return (
    <Container>
      <div>
        <div className="row">
          <div className="m-5">
            <Filter/>
          </div>
          <h1>{activity.title}</h1>
          <a
            className="mb-4 md:mb-0 col-md-8 position-relative rounded inline-block"
            style={{ height: '24em' }}
            href="#"
          >
            <div
              className="position-absolute left-0 bottom-0 w-100 h-100"
              style={{ backgroundImage: 'linear-gradient(180deg,transparent,rgba(0,0,0,.7))' }}
            ></div>
            {activity.images && activity.images.length > 0 && (
              <img
                src={activity.images[0]} 
                className="position-absolute left-0 top-0 w-100 h-100 rounded"
                alt="Activity Image"
                style={{ objectFit: 'cover' }}
              />
            )}
            <div
              className="position-absolute left-0 top-0 w-100 h-100 rounded"
              alt=""
              style={{ objectFit: 'cover' }}
            />
          </a>
          <a
            className="col-md-4 position-relative rounded"
            style={{ height: '24em' }}
            href="#"
          >
            <div
              className="position-absolute left-0 top-0 w-100 h-100"
              style={{ backgroundImage: 'linear-gradient(180deg,transparent,rgba(0,0,0,.7))' }}
            ></div>
            <img
              src="https://images.unsplash.com/photo-1543362906-acfc16c67564?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1301&q=80"
              className="position-absolute left-0 top-0 w-100 h-100 rounded"
              alt="Second Example"
              style={{ objectFit: 'cover' }}
            />
          </a>
        </div>
        <div className="mb-5">
          <h3 className="font-weight-bold text-dark">{activity.owner}</h3>
          <div className="d-flex align-items-center">
            <LocationIcon />
            <h5 className="text-muted mb-0 ms-2 fs-5">{activity.location}</h5>
          </div>
          <div className="d-flex align-items-center">
            <DateIcon />
            <h5 className="text-muted mb-0 ms-2 fs-8">${activity.date}</h5>
          </div>
        </div>
      </div>
      <div className="d-flex align-items-center justify-content-between">
        <div>
          <div className="my-4">
            <h3>What this place offers?</h3>
            Wifi <br/>
            Free parking
          </div>
          <div className="my-4">
            <h3>Description</h3>
            {activity.description}
          </div>
        </div>
        <div style={{ width: '300px' }}>
          <BookingWidget />
        </div>
      </div>
      <div>
        <div>
          <h3 style={{ textAlign: 'left' }}>How many places are available?</h3>
        </div>
        <div>50 places</div>
      </div>
      <div>
            <h2>Reviews</h2>
            <Review reviews={reviews} />

                  </div>

          <h2>Add your feedback</h2>
                <Rating activityId={activityId} />
              </Container>
  );
};

export default ActivityPage;
