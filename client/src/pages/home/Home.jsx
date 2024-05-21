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
  import background from '../../assets/home.jpg'
  import darkBackground from '../../assets/dark-bg.jpg'
  import logo from '../../assets/sporology-logo.svg'
import PartnerCard from '../../components/activities/partnerCard';
import { Col, Row } from 'react-bootstrap';


  function Home() {

    
    const [activities, setActivities] = useState([]);
    const [partners, setPartners] = useState([]);
    const [topActivities, setTopActivities] = useState([]);

    useEffect(() => {
      fetchActivities();
      fetchPartners();
      fetchTopActivities();
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

    const fetchPartners = () => {
      axiosInstance.get('users/partners')
        .then(({ data }) => {
          setPartners(data);
        })
        .catch(error => {
          console.error("Error fetching activities:", error);
        });
    };

    const fetchTopActivities = () => {
      axiosInstance.get('activities/top') // Adjust the endpoint as per your backend implementation
        .then(({ data }) => {
          // Slice the data to get only the top 4 reserved activities
          setTopActivities(data.activities.slice(0, 4));
        })
        .catch(error => {
          console.error("Error fetching top reserved activities:", error);
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
      <div style={{backgroundImage: `url(${background})`}}>
      <section className='container'>
        
        <div className='d-flex flex-column align-items-center justify-content-center' style={{ paddingTop: '170px' , marginBottom:'100px'}} > 
          <h1 style={{textAlign:'center'}}>Move Your Body</h1>
          <Filter />
        </div>
        <div className='d-flex align-items-center justify-content-center ' style={{gap:'1%'}}>
          <Button className='button-extra'>Outdoor</Button>
          <Button className='button-extra'> Indoor</Button>
          <Button className='button-extra'> Ladies</Button>
          <Button className='button-extra'> Kids</Button>
          <Button className='button-circle' style={{borderRadius:'6px' }} ><FilterIcon/></Button>
        </div>
        <Slider {...settings} className="mt-2">
    {activities
      .sort((a, b) => new Date(b.date) - new Date(a.date)) 
      .map(activity => (
        <div key={activity._id} className="col">
          <div className="m-2"> 
            <Link to={`/activities/single/${activity._id}`} style={{ textDecoration: 'none' }} className="col">
              <ActivityCard activity={activity} />
            </Link>
          </div>
        </div>
      ))}
  </Slider>

  </section>
  <div style={{ marginTop: '250px' }}></div> {/* Space between Slider and professional section */}
      
      <div style={{ backgroundImage: `url(${darkBackground})`, backgroundSize: 'cover', color: "white", width: "100%", height: '400px', position: 'relative', marginTop: '-150px' }}>
        <div style={{paddingTop:"50px"}}>
          <h3>Professionals</h3>
        </div>
      </div>
      <main className='d-flex justify-content-around container' style={{position: 'relative', top: '-150px'}}>
      {partners.slice(0, 3).map(partner => (
  <div key={partner._id} className="col">
    <div className="m-2"> 
      <Link to={`/partners/single/${partner._id}`} style={{ textDecoration: 'none' }}>
        <PartnerCard partner={partner} />
      </Link>
    </div>
  </div>
))}

      </main>
      <section className='container'>
          <div className="row">
    <h3 className=' mb-4'>Top Reserved Activities</h3>
    {topActivities.map(activity => (
  <div key={activity._id} className="col-6">
    <div className="m-2"> 
      <Link to={`/activities/single/${activity._id}`} style={{ textDecoration: 'none'}} className="col">
        <ActivityCard activity={activity} isTopReserved={true} />
      </Link>
    </div>
  </div>
))}
  </div>
  </section>
  <div style={{backgroundColor:'var(--bs-black)',color:'white',padding:'50px',marginTop:'100px'}}>
  <h3>About us</h3>
  <div className=' mt-4 container'>
        <Row>
        <Col  md={6}>
        
        <img src={logo} style={{height:'300px'}} className='logo' alt="logo" />
        
        </Col>
        <Col className='d-flex align-items-center'>
       <div className='d-flex flex-column' >
        Sporology is a comprehensive online directory or database dedicated to showcase the wide range  of sports professionals available in the UAE. Our platform aims to simplify the process of finding specific sports activities by providing a user-friendly interface that allows individuals to search and discover various sports professionals and activities in their erea.
        
        <Button className='button-primary' style={{width:'25%'}}>read more</Button>
        </div>
        </Col>
        
        </Row>

        

    </div>
  
  </div>
        
      </div>
    );
  }

  export default Home;
