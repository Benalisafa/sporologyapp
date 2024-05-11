import React, { useEffect, useState } from 'react';
import { useLocation ,Link } from 'react-router-dom';
import { axiosInstance } from '../../lib/axios';
import ActivityCard from '../../components/activities/activityCard';


function SearchPage() {
  const location = useLocation();
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // Function to fetch search results based on query parameters
    async function fetchSearchResults() {
        try {
          // Extract search query parameters from URL
          const searchParams = new URLSearchParams(location.search);
          const activity = searchParams.get('activity');
          const locationQuery = searchParams.get('location');
          const date = searchParams.get('date');
      
          const response = await axiosInstance.get(`/activities/search?activity=${activity}&location=${locationQuery}&date=${date}`);
          // Axios automatically parses JSON response, so no need to call .json()
          setSearchResults(response.data.activities);
        } catch (error) {
          console.error('Error fetching search results:', error);
        }
      }
      

    fetchSearchResults();
  }, [location.search]);

  return (
    <div className='container'>
      <h3>Search Results</h3>
      <div className="mt-8 row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4">
          {searchResults.map(result => (
            <Link key={result._id} to={'/activities/single/' + result._id} style={{ textDecoration: 'none' }}>
              <ActivityCard activity={result} />
            </Link>
          ))}
        </div>
    </div>
  );
}



export default SearchPage;
