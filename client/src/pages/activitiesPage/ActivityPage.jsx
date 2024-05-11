import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../lib/axios";
import { useParams } from "react-router-dom";
import background from '../../assets/activity-single-bg.png';
import { formatDate } from "../../components/tools/date";
import Filter from "../../components/layout/Filter";
// import {Container} from 'react-bootstrap';
import {Row, Col } from 'react-bootstrap';
import Slider from 'react-slick';

import { LocationIcon, DateIcon } from "../../components/Icons";
import BookingWidget from "../../components/activities/BookingWidget";
import Rating from "../../components/reviews/Rating"; 
import Review from "../../components/reviews/Review";
import ActivityCard from "../../components/activities/activityCard";
import { Link } from "react-router-dom";
import {NextArrowIcon , PrevArrowIcon} from '../../components/Icons';
import PropTypes from 'prop-types';

const ActivityPage = () => {



  const { id } = useParams();
  const [activity, setActivity] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activityId, setActivityId] = useState(null); 
  const [user, setUser] = useState(null);
  const [similarActivities, setSimilarActivities] = useState([]);
 
  useEffect(() => {
    axiosInstance.get(`activities/listActivity/${id}`)
      .then(response => {
        // console.log('Activity images:', response.data.images);
        setActivity(response.data);
        setActivityId(response.data._id); 
        console.log("Activity userId:", response.data.userId);
        setLoading(false);
        
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (activity) { 
      axiosInstance.get(`reviews/getReviewsByActivityId/${activityId}`)
        .then(response => {
          setReviews(response.data);
        })
        .catch(error => {
          console.error('Error fetching reviews:', error);
        });
      axiosInstance.get(`/users/user/${activity.userId}`) 
        .then(response => {
          setUser(response.data);
        })
        .catch(error => {
          console.error('Error fetching user details:', error);
        });

      if (activity.category) {
        axiosInstance.get(`activities/similar/${activity.category}`)
          .then(response => {
            setSimilarActivities(response.data);
          })
          .catch(error => {
            console.error('Error fetching similar activities:', error);
          });
      }
    }
  }, [activity, activityId]);   


  const CustomPrevArrow = (props) => {
    const { className, onClick } = props;
    return (
      <div className={className} onClick={onClick} style={{ top: '40%' }}>
        <PrevArrowIcon/>
      </div>
    );
  };

  const CustomNextArrow = (props) => {
    const { className, onClick } = props;
    return (
      <div className={className} onClick={onClick} style={{ top: '40%' }}>
        <NextArrowIcon/>
      </div>
    );
  };


  // Prop types validation

  CustomPrevArrow.propTypes = { 
    className: PropTypes.string,
    onClick: PropTypes.func
  };

  CustomNextArrow.propTypes = { 
    className: PropTypes.string,
    onClick: PropTypes.func
  };

  
  
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1
        }
      }
    ]

  };


  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const filename = activity.images.map(imagePath => imagePath.split("\\").pop());

  return (
    <div className="container-s" style={{backgroundImage: `url(${background})`, backgroundSize: 'cover'}}>
      <section className="container mb-4" style={{width:'100%'}}>
      <div>
        <Row>
          <div className="m-5">
            <Filter/>
          </div>
          <h1>{activity.title}</h1>
          <Col md={8}>
          <figure
            // className="mb-4"
            style={{ height: '26em' }}
            
          >
            
            {activity && activity.images && activity.images.length > 0 && (
              <img
              src={`http://localhost:4000/activity/${filename[0]}`}
                className="left-0 top-0 w-100 h-100 "
                alt="Activity Image 1"
                style={{ objectFit: 'cover',borderRadius:'6px' }}
              />
            )}

          </figure>
          </Col>
          <Col md={4}>
          <figure
            
            style={{ height: '8em' }}
            
          >
            
            <img
              src={`http://localhost:4000/activity/${filename[1]}`}
              className="left-0 top-0 w-100 h-100"
              alt="Activity Image 2"
              style={{ objectFit: 'cover' ,borderRadius:'6px'}}
            />
          </figure>
          <figure
            className=" position-relative "
            style={{ height: '17em' }}
            
          >
            
            <img
              src={`http://localhost:4000/activity/${filename[2]}`}
              className="position-absolute left-0 top-0 w-100 h-100"
              alt="Activity Image 3"
              style={{ objectFit: 'cover' ,borderRadius:'6px' }}
            />
          </figure>
          </Col>
        </Row>
        <div className="mb-5">
          <h3 className="font-weight-bold text-dark">{activity.owner}</h3>
          <div className="d-flex align-items-center">
            <LocationIcon />
            <h5 className="text-muted mb-0 ms-2 fs-5">{activity.location}</h5>
          </div>
          <div className="d-flex align-items-center">
            <DateIcon />
            <h5 className="text-muted mb-0 ms-2 fs-8">{formatDate(activity.date)} , {activity.time}</h5>
          </div>
        </div>
      </div>
            <Row>
              <Col md={6}>
      
        <div >
          <div className="my-4" style={{textAlign:"justify"}}>
            <h2>Description</h2>
            {activity.description}
          </div>
        </div>
        </Col >
        <Col md={6}>
        <div style={{paddingLeft:'20%', paddingTop:'20%'}}>
          <BookingWidget />
        </div>
        </Col>
        </Row>
      
      
      <div>
        <h2>What category?</h2>
        <div>{activity.category} </div>
        <div>
          <h2 >How many places are available?</h2>
        </div>
        <div>{activity.capacity} places</div>
      </div>
      <h2 >How long?</h2>
      <div>{activity.duration} Minutes</div>
      </section>
      <div>
        
        <section>
           
            <Review reviews={reviews} />
            </section>
                  </div>
                  <section className="container">
          <h2>Add your feedback</h2>
                <Rating activityId={activityId} />
                </section>


                <div>


                {similarActivities.length > 0 && (
        <section className="container">
        <h2>Similar Activities</h2>
        <Slider {...settings} className="mt-5 ">
        {similarActivities
    .sort((a, b) => new Date(b.date) - new Date(a.date)) 
    .map(similarActivity => (
      <div key={similarActivity._id} className="col">
        <div className="m-2"> 
          <Link to={`/activities/single/${activity._id}`} style={{ textDecoration: 'none' }} className="col">
          <ActivityCard activity={similarActivity} />
          </Link>
        </div>
      </div>
    ))}
    </Slider>
    </section>
)}

      </div>

              </div>



  );
};

export default ActivityPage;
