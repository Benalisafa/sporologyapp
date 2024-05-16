import { useEffect, useState } from "react";
import { axiosInstance } from "../../lib/axios";
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { Container, Button, Form, Modal } from 'react-bootstrap';

function Profile() {
  const [user, setUser] = useState({});
  const [initialUser, setInitialUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userPassword, setUserPassword] = useState('');
  const authUser = useSelector(state => state.auth.user);

  useEffect(() => {
    setLoading(true);
    axiosInstance.get(`users/user/${authUser.userId}`)
      .then(({ data }) => {
        setUser(data);
        setInitialUser(data); // Store initial user data
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching user details:", error);
        setLoading(false);
      });
  }, [authUser.userId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const openModal = (event) => {
    event.preventDefault(); 

    
    const isModified = Object.keys(user).some(key => user[key] !== initialUser[key]);

    if (isModified) {
      setShowModal(true);
    } else {
      alert("No changes detected. Please make changes to update your profile.");
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handlePasswordChange = (event) => {
    setUserPassword(event.target.value);
  };

  const saveChanges = () => {
    
    if (!userPassword) {
      alert("Please enter your correct password to confirm changes.");
      return;
    }

  
    axiosInstance.post(`users/verifyPassword/${authUser.userId}`, { userPassword: userPassword })
      .then(response => {
      
        if (response.data.success) {
          axiosInstance.put(`users/updateUser/${authUser.userId}`, user)
            .then(response => {
              console.log("User updated successfully:", response.data);
              closeModal(); 
              setInitialUser(user); 
              setUserPassword(''); 
            })
            .catch(error => {
              console.error("Error updating user:", error);
              alert("Failed to update user. Please try again.");
            });
        } else {
         
          alert("Incorrect password. Please enter your correct password to confirm changes.");
          setUser(initialUser);
        }
      })
      .catch(error => {
        console.error("Error verifying password:", error);
        alert("Failed to verify password. Please try again.");
      });
  };

  return (
    <Container className="mt-5">
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <h1>Welcome, {authUser.name}!</h1>
          <div className='d-flex align-items-center justify-content-center'>
            <Form className="mt-5" onSubmit={openModal}>
              <div className='d-flex flex-column' style={{ gap: '1rem' }}>
                <Form.Group>
                  <Form.Label>First name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="First name"
                    name="firstname"
                    value={user.firstname}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Last name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Last name"
                    name="lastname"
                    value={user.lastname}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Phone Number"
                    name="phone"
                    value={user.phone}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3 input-with-icon">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Email Address"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                  />
                </Form.Group>
              </div>
              <Button type="submit" className='button-primary' style={{ width: '100%' }}>Submit</Button>
            </Form>
          </div>
          {/* Modal for password confirmation */}
          <Modal show={showModal} onHide={closeModal}>
            <Modal.Header closeButton>
              <Modal.Title>Confirm Password</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  name="userPassword"
                  value={userPassword}
                  onChange={handlePasswordChange}
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={closeModal}>Cancel</Button>
              <Button variant="primary" onClick={saveChanges}>Save Changes</Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </Container>
  );
}

export default Profile;
