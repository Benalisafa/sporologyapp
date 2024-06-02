import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../../lib/axios";
import { Table, Button } from "react-bootstrap";
import { DeleteIcon, EditIcon } from "../../../components/Icons";

function AdminActivities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    const fetchActivities = async () => {
      try {
        const { data } = await axiosInstance.get('activities/listActivity');
        console.log("Fetched activities:", data.activities); // Log fetched activities
        setActivities(data.activities);
      } catch (error) {
        console.error("Error fetching activities:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchActivities();
  }, []);

  const handleRemove = async (activityId) => {
    try {
      await axiosInstance.delete(`/activities/removeActivity/${activityId}`);
      setActivities(activities.filter(activity => activity._id !== activityId));
    } catch (error) {
      console.error('Error removing activity:', error);
      // Handle error appropriately (e.g., show error message)
    }
  };

  const handleEdit = (activity) => {
    // Define the edit functionality here
    console.log('Edit activity:', activity);
  };

  const renderPartnerName = (activity) => {
    if (activity.userId) {
      const { userId } = activity;
      if (userId.partnerType === 'individual') {
        return `${userId.firstname} ${userId.lastname}`;
      } else if (userId.partnerType === 'company') {
        return userId.companyName;
      }
    }
    return 'N/A';
  };

  return (
    <div>
      <h3 className="mt-4">Activities</h3>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : activities.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Capacity</th>
              <th>Partner</th>
              <th style={{ width: '10%' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {activities.map(activity => (
              <tr key={activity._id}>
                <td>{activity.title}</td>
                <td>{activity.description}</td>
                <td>{activity.capacity}</td>
                <td>{renderPartnerName(activity)}</td>
                <td>
                  <Button
                    style={{ background: 'transparent', color: 'green', border: 'none' }}
                    size="sm"
                    onClick={() => handleEdit(activity)}
                  >
                    <EditIcon />
                  </Button>
                  <Button
                    style={{ background: 'transparent', color: 'red', border: 'none' }}
                    size="sm"
                    onClick={() => handleRemove(activity._id)}
                  >
                    <DeleteIcon />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No activities found.</p>
      )}
    </div>
  );
}

export default AdminActivities;
