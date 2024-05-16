import React, { useEffect, useState } from 'react';
import PartnerCard from '../../components/activities/partnerCard';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Filter from '../../components/layout/Filter';
import { axiosInstance } from '../../lib/axios';

function PartnersPage() {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get('users/partners')
      .then(({ data }) => {
        console.log(data);
        setPartners(data || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching partners:', error);
        setError('Error fetching data. Please try again later.');
        setLoading(false);
      });
  }, []);

  return (
    <>
    <div>
    <Filter />
    <div style={{backgroundColor:'var(--bs-black)'}}>
    <div className="mb-5" >
          
        </div>
        {/* <div style={{ backgroundColor: 'black', color: 'white', position: 'relative', height:'400px' }}> */}
      <div style={{ color: 'white' }}>
        <div style={{ paddingTop: '50px' }}>
          <h3>Professionals</h3>
        </div>
      </div>
      {/* <Container className="mt-5" style={{ position: 'relative', top: '-250px', zIndex: 2 }}> */}
      <Container className="mt-5" >
        
        {loading ? (
          <h1>Loading...</h1>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div className="row row-cols-1 row-cols-md-3">
            {partners.length > 0 ? (
              partners.map((partner, index) => (
                <div className={`col mb-4 ${index < 3 ? 'mt-md-5' : ''}`} key={partner._id}>
                  <Link to={`/partners/single/${partner._id}`} style={{ textDecoration: 'none' }}>
                    <PartnerCard partner={partner} />
                  </Link>
                </div>
              ))
            ) : (
              <p>No partners found.</p>
            )}
          </div>
        )}
      </Container>
      </div>
      </div>
    </>
  );
}

export default PartnersPage;
