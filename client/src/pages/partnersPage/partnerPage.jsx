import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../lib/axios";
import { useParams } from "react-router-dom";
import background from '../../assets/partner-single-bg.jpg';
import logo from '../../assets/sporology-logo.svg'
import { formatDate } from "../../components/tools/date";
import Filter from "../../components/layout/Filter";
// import {Container} from 'react-bootstrap';
import {Row, Col } from 'react-bootstrap';
import Slider from 'react-slick';
import { Image as BootstrapImage } from 'react-bootstrap';
import { LocationIcon, DateIcon } from "../../components/Icons";
import ActivityCard from "../../components/activities/activityCard";
import { Link } from "react-router-dom";
import {NextArrowIcon , PrevArrowIcon} from '../../components/Icons';
import PropTypes from 'prop-types';


const PartnerPage = () => {
    const { id } = useParams();
    const [partner, setPartner] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [partnerId, setPartnerId] = useState(null);
    const [nextActivities, setNextActivities] = useState([]);
    const [pastActivities, setPastActivities] = useState([]);
    
    useEffect(() => {
        axiosInstance.get(`users/user/${id}`)
            .then(response => {
                let partnerData = response.data;
                if (partnerData.partnerType === "individual") {
                    partnerData.companyAddress = `${partnerData.firstname} `;
                    partnerData.companyName = `${partnerData.lastname} `;
                   
                }
                setPartner(partnerData);
                setPartnerId(partnerData._id);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, [id]);
  
    useEffect(() => {
        if (partnerId) {
            axiosInstance.get(`activities/nextActivity/${partnerId}`)
                .then(response => {
                    setNextActivities(response.data.activities);
                })
                .catch(error => {
                    console.error('Error fetching next activities:', error);
                });
  
            axiosInstance.get(`activities/pastActivity/${partnerId}`)
                .then(response => {
                    setPastActivities(response.data);
                })
                .catch(error => {
                    console.error('Error fetching past activities:', error);
                });
        }
    }, [partnerId]); 
  

    const CustomPrevArrow = (props) => {
        const { className, onClick } = props;
        return (
            <div className={className} onClick={onClick} style={{ top: '40%' }}>
                <PrevArrowIcon />
            </div>
        );
    };

    const CustomNextArrow = (props) => {
        const { className, onClick } = props;
        return (
            <div className={className} onClick={onClick} style={{ top: '40%' }}>
                <NextArrowIcon />
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

    if (loading) {
        return <div>Loading...</div>;
    }
  
    if (error) {
        return <div>Error: {error.message}</div>;
    }
  
    return (
        <div className="container-s" style={{backgroundImage: `url(${background})`, backgroundSize: 'cover'}}>
            <section className="container mb-4">
                <div>
                    <div>
                        <h5>NAME</h5>
                        <Row style={{ padding: '5%' }}>
                            <Col md={8}>
                                {partner && partner.picture && (  
                                    <BootstrapImage
                                        style={{ height: '300px', objectFit: 'cover', borderRadius: '6px' }}
                                        src={`http://localhost:4000/profile/${partner.picture}`}
                                        fluid
                                    />
                                )}
                            </Col>
                            <Col>
                                <h5 style={{fontWeight: 'bold'}}><LocationIcon /> {partner.companyAddress}</h5>
                                <h5 style={{textAlign:'justify', paddingTop:'7%'}}>{partner.description}</h5>
                            </Col>
                        </Row>
                    </div>
                </div>
                <h3>Next Activities</h3>
                {nextActivities && nextActivities.length > 0 ? (
                    <Slider {...settings} className="mt-5">
                        {nextActivities.map(nextActivity => (
                            <div key={nextActivity._id} className="col">
                                <div className="m-2">
                                    <Link to={`/activities/single/${nextActivity._id}`} style={{ textDecoration: 'none' }} className="col">
                                        <ActivityCard activity={nextActivity} />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </Slider>
                ) : (
                    <div>No next activities found</div>
                )}
                <h3 style={{marginTop:'5%'}}>Latest Activities</h3>
                {pastActivities && pastActivities.length > 0 ? (
                    <Slider {...settings} className="mt-5">
                        {pastActivities.map(pastActivity => (
                            <div key={pastActivity._id} className="col">
                                <div className="m-2">
                                    <Link to={`/activities/single/${pastActivity._id}`} style={{ textDecoration: 'none' }} className="col">
                                        <ActivityCard activity={pastActivity} />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </Slider>
                ) : (
                    <div>No past activities found</div>
                )}
            </section>
        </div>
    );
};

export default PartnerPage;
