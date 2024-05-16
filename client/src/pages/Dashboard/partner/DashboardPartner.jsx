import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { PhoneIcon } from "../../../components/Icons";
import { axiosInstance } from "../../../lib/axios";
import { useSelector } from "react-redux";
import { userData } from "../../../redux/reducers/auth.reducer";

function DashboardPartner() {
  
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false); // Setting initial loading state to false
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedActivity, setEditedActivity] = useState({});
  const [fullActivity, setFullActivity] = useState(null); // State to store full details of the activity
  const [showAddActivity, setShowAddActivity] = useState(false); // State to track if "Add Activity" section is clicked
  const currentUser = useSelector(userData)
  
  useEffect(() => {
    if ( currentUser) {
      setLoading(true);
      axiosInstance.get('activities/listActivity')
      
        .then(({ data }) => {
          const userActivities = data.activities.filter(activity => activity.userId === currentUser.userId);
          
          setActivities(userActivities); 
          setLoading(false);
          
        })
        .catch(error => {
          console.error("Error fetching activities:", error);
          setLoading(false);
          
        });
    }
  }, [ currentUser]); // Fetch activities when showAllActivities state changes or currentUser changes

  const handleAllActivitiesClick = () => {
    setShowAddActivity(false);
   
  };

  const handleAddActivityClick = () => {
    setShowAddActivity(true); // Show the "Add Activity" section when "Add Activity" is clicked
   

  };

  useEffect(() => {
  console.log('showAddActivity:', showAddActivity);
}, [showAddActivity]);


  const handleEdit = async (activity) => {
    try {
      // Fetch the full details of the activity from the server
      const response = await axiosInstance.get(`/activities/listActivity/${activity._id}`);
      const fullActivityData = response.data;
      
      // Set the editedActivity state to the activity received from the server
      setEditedActivity(fullActivityData);
      
      // Show the edit modal
      setShowEditModal(true);
    } catch (error) {
      console.error('Error fetching full activity details:', error);
      // Handle error appropriately (e.g., show error message)
    }
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditedActivity({});
  };

  const handleSaveChanges = async () => {
    try {
      // Send a PUT request to update the edited activity
      await axiosInstance.put(`/activities/updateActivity/${editedActivity._id}`, editedActivity);
      
      // Update the activities state with the edited activity
      const updatedActivities = activities.map(activity => {
        if (activity._id === editedActivity._id) {
          return editedActivity;
        }
        return activity;
      });
      setActivities(updatedActivities);
  
      // Close the edit modal
      handleCloseEditModal();
    } catch (error) {
      console.error('Error saving changes:', error);
      // Handle error appropriately (e.g., show error message)
    }
  };

  const handleRemove = async (activityId) => {
    try {
      // Send a DELETE request to remove the activity
      await axiosInstance.delete(`/activities/removeActivity/${activityId}`);
      
      // Filter out the removed activity from the activities state
      const updatedActivities = activities.filter(activity => activity._id !== activityId);
      setActivities(updatedActivities);
  
    } catch (error) {
      console.error('Error removing activity:', error);
      // Handle error appropriately (e.g., show error message)
    }
  };

  return (
    <div style={{ paddingRight: '5%' }}>
  <h3 className="mt-4">Dashboard</h3>
  <div className="d-flex">
    <aside className="d-flex flex-column ps-4 pt-4" style={{ backgroundColor: 'var(--bs-light-grey)', width: '20%' }}>
      <h5 onClick={handleAllActivitiesClick}><PhoneIcon />All activities</h5>
      <br />
      <h5 onClick={handleAddActivityClick}><PhoneIcon />Add Activity</h5>
    </aside>
    <div style={{ width: '80%' }}>
      {showAddActivity ? ( // Only render the "Add Activity" section if showAddActivity is true
        <div>
          <h3>Add Activity</h3>
          {/* Add Activity Form or Content */}
        </div>
      ) : (
        // Render activities table if showAddActivity is false
        <>
          {!loading && activities.length > 0 ? (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Capacity</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {activities.map(activity => (
                  <tr key={activity._id}>
                    <td>{activity.title}</td>
                    <td>{activity.description}</td>
                    <td>{activity.capacity}</td>
                    <td>
                      <Button variant="primary" size="sm" className="me-2" onClick={() => handleEdit(activity)}>Edit</Button>
                      <Button variant="danger" size="sm" onClick={() => handleRemove(activity._id)}>Remove</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            loading ? <p>Loading...</p> : <p>No activities found.</p>
          )}
        </>
      )}
    </div>
  </div>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Activity</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" value={editedActivity.title || ''} onChange={(e) => setEditedActivity({ ...editedActivity, title: e.target.value })} />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} value={editedActivity.description || ''} onChange={(e) => setEditedActivity({ ...editedActivity, description: e.target.value })} />
            </Form.Group>
            <Form.Group controlId="formCapacity">
              <Form.Label>Capacity</Form.Label>
              <Form.Control type="number" value={editedActivity.capacity || ''} onChange={(e) => setEditedActivity({ ...editedActivity, capacity: e.target.value })} />
            </Form.Group>
            {/* Add additional details here */}
            
<Form.Group controlId="formDate">
  <Form.Label>Date</Form.Label>
  <Form.Control type="text" value={editedActivity.date || ''} onChange={(e) => setEditedActivity({ ...editedActivity, date: e.target.value })} />
</Form.Group>
<Form.Group controlId="formLocation">
  <Form.Label>Location</Form.Label>
  <Form.Control type="text" value={editedActivity.location || ''} onChange={(e) => setEditedActivity({ ...editedActivity, location: e.target.value })} />
</Form.Group>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default DashboardPartner;