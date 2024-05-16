import React, { useState, useEffect } from "react";
import { Table, Button } from 'react-bootstrap';
import { PhoneIcon } from "../../../components/Icons";
import { axiosInstance } from "../../../lib/axios";

function DashboardAdmin() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataType, setDataType] = useState('activities'); // Default to activities

  useEffect(() => {
    setLoading(true);

    if (dataType === 'activities') {
      axiosInstance.get('activities/listActivity')
        .then(({ data }) => {
          setData(data.activities);
          setLoading(false);
        })
        .catch(error => {
          console.error("Error fetching activities:", error);
          setLoading(false);
        });
    } else if (dataType === 'partners') {
      axiosInstance.get('users/partners')
        .then(({ data}) => {
          setData(data); // Assuming the response contains an array of partners
          setLoading(false);
        })
        .catch(error => {
          console.error("Error fetching partners:", error);
          setLoading(false);
        });
    }
  }, [dataType]);

  const handleAllActivitiesClick = () => {
    setDataType('activities');
  };

  const handlePartnersClick = () => {
    setDataType('partners');
  };

  const handleRemove = async (id) => {
    try {
      // Send a DELETE request to remove the item
      await axiosInstance.delete(`/${dataType}/remove${dataType === 'activities' ? 'Activity' : ''}/${id}`);

      // Filter out the removed item from the data state
      const updatedData = data.filter(item => item._id !== id);
      setData(updatedData);

    } catch (error) {
      console.error(`Error removing ${dataType}:`, error);
      // Handle error appropriately (e.g., show error message)
    }
  };

  return (
    <div style={{ paddingRight: '5%' }}>
      <h3 className="mt-4">Dashboard</h3>
      <div className="d-flex">
        <aside className="d-flex flex-column ps-4 pt-4" style={{ backgroundColor: 'var(--bs-light-grey)', width: '20%' }}>
          <h5 onClick={handleAllActivitiesClick}><PhoneIcon /> Participants</h5>
          <br />
          <h5 onClick={handlePartnersClick}><PhoneIcon />Professionals</h5>
          <br />
          <h5 onClick={handleAllActivitiesClick}><PhoneIcon />Activities</h5>
          <br />
          <h5 onClick={handleAllActivitiesClick}><PhoneIcon />Categories</h5>
          <br />
          <h5 onClick={handleAllActivitiesClick}><PhoneIcon />Testimonies</h5>
        </aside>
        <div style={{ width: '80%' }}>
          {!loading ? (
            data.length > 0 ? (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    {dataType === 'activities' ? (
                      <>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Capacity</th>
                        <th>Partner</th>
                      </>
                    ) : (
                      <>
                        <th>Name</th>
                        <th>Description</th>
                        {/* Add more columns for partners if needed */}
                      </>
                    )}
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map(item => (
                    <tr key={item._id}>
                      {dataType === 'activities' ? (
                        <>
                          <td>{item.title}</td>
                          <td>{item.description}</td>
                          <td>{item.capacity}</td>
                          <td>{item.userId?.firstname}</td>
                        </>
                      ) : (
                        <>
                          <td>{item.name}</td>
                          <td>{item.description}</td>
                          {/* Render additional fields for partners if needed */}
                        </>
                      )}
                      <td>
                        <Button variant="primary" size="sm" className="me-2">View</Button>
                        <Button variant="danger" size="sm" onClick={() => handleRemove(item._id)}>Remove</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <p>No {dataType === 'activities' ? 'activities' : 'partners'} found.</p>
            )
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardAdmin;
