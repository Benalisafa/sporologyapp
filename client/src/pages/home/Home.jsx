import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ActivityCard from '../../components/activities/activityCard';
import Filter from '../../components/layout/Filter';
import { axiosInstance } from '../../lib/axios';
import { FilterIcon, NextArrowIcon , PrevArrowIcon} from '../../components/Icons';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button'



function Home() {

  
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = () => {
    axiosInstance.get('activities/listActivity')
      .then(({ data }) => {
        setActivities(data.activities);
      })
      .catch(error => {
        console.error("Error fetching activities:", error);
      });
  };

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
    slidesToShow: 4,
    slidesToScroll: 2,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3
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

  return (
    <Container>
       
      <div style={{ paddingTop: '150px', textAlign: 'center' }} >
        <h1>Move your body</h1>
        <Filter />
      </div>
      <div>
        <Button className='custom-button-secondary'><FilterIcon/> Filter</Button>
      </div>
      <Slider {...settings} className="mt-5">
        {activities.map(activity => (
          <div key={activity._id} className="col">
            <div className="m-2"> 
              <Link to={`/activities/single/${activity._id}`} style={{ textDecoration: 'none' }} className="col">
                <ActivityCard activity={activity} />
              </Link>
            </div>
          </div>
        ))}
      </Slider>
    </Container>
  );
}

export default Home;
