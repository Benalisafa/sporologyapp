import { useEffect, useState } from "react";
import { axiosInstance } from "../../lib/axios";
import { useSelector } from 'react-redux';
// import { Link } from "react-router-dom";
import { Container, Button, Form, Modal, Col, Row } from 'react-bootstrap';
import {  ProfileIcon } from "../../components/Icons";
import profile from "../../assets/profile.png"
import {toast,Toaster} from "react-hot-toast";

function ProfileForm() {
  const [user, setUser] = useState({});
  const [initialUser, setInitialUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userPassword, setUserPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  
  const [image, setImage] = useState(null); 

  const authUser = useSelector(state => state.auth.user);
  

  useEffect(() => {
    setLoading(true);
    
    axiosInstance.get(`users/user/${authUser.userId}`)
      .then(({ data }) => {
        
        setUser(data);
        setInitialUser(data); 
        setLoading(false);
        if (data.picture) {
          setImage(`http://localhost:4000/profile/${data.picture}`);
        }
      })
      .catch(error => {
        console.error("Error fetching user details:", error);
        setLoading(false);
      });
  }, [authUser.userId]);
  
  const handleChange = (event) => {
    const { name, value, files } = event.target;
  
    if (files && files[0]) {
      const file = files[0];
      setUser({ ...user, picture: file }); 
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result); 
      };
      reader.readAsDataURL(file);
    } else {
      setImage(`http://localhost:4000/profile/${user.picture}`);
      setUser({ ...user, [name]: value });
    }
  };

  const openModal = (event) => {
    event.preventDefault(); 
    const isModified = Object.keys(user).some(key => user[key] !== initialUser[key]);

    if (isModified) {
      setShowModal(true);
    } else {
      toast.error("No changes detected.");
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handlePasswordChange = (event) => {
    setUserPassword(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    const { value } = event.target;
    setNewPassword(value);
    // Check if new password matches confirm new password
    if (confirmNewPassword && value !== confirmNewPassword) {
      // If not matched, clear the confirm new password field
      setConfirmNewPassword('');
    }
  };

  const handleConfirmNewPasswordChange = (event) => {
    const { value } = event.target;
    setConfirmNewPassword(value);
    // Check if confirm new password matches new password
    if (newPassword && value !== newPassword) {
      toast.error("Passwords do not match")
    }
  };

  const saveChanges = () => {
    if (!userPassword) {
      alert("Please enter your correct password to confirm changes.");
      return;
    }
  
    axiosInstance.post(`users/verifyPassword/${authUser.userId}`, { userPassword: userPassword })
      .then(response => {
        if (response.data.success) {
          const formData = new FormData();
          formData.append('firstname', user.firstname);
          formData.append('lastname', user.lastname);
          formData.append('phone', user.phone);
          formData.append('email', user.email);
          formData.append('picture', user.picture);

          if (newPassword) { // Include new password in form data if it's provided
            formData.append('newPassword', newPassword);
          }
  
          axiosInstance.put(`users/updateUser/${authUser.userId}`, formData)
            .then(response => {
              console.log("User updated successfully:", response.data);
              closeModal();
              setInitialUser(user);
              setUserPassword('');
            })
            .catch(error => {
              console.error("Error updating user:", error);
              
            });
        } else {
          toast.error("Incorrect password");
          setUser(initialUser);
        }
      })
      .catch(error => {
        console.error("Error verifying password:", error);
        
      });
  };

  return (
    <div className="mt-5 container-s">
      <Toaster/>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <h3>Welcome Back, {authUser.name}!</h3>
          <div className='d-flex align-items-center justify-content-center'>
            <Form className="mt-5" onSubmit={openModal}>
              <div className='d-flex flex-column ' style={{ gap: '1rem' }}>
                {/* Image Preview */}
                <div>
                {image ? (
    <img src={image} alt="Preview" style={{borderRadius:'50%',width:'150px', height:'150px', objectFit: 'cover'}} />
) : (
  <div >
    <img src={profile} className="p-4" style={{borderRadius:'50%',width:'150px', height:'150px', objectFit: 'cover'}}/> 
    </div>
)}</div>
                {/* Profile Image */}
                <div className="profile-image-container">
                  <Form.Control 
                    type="file"
                    className="profile-image-input"
                    name="picture"
                    accept="image/*"
                    onChange={handleChange}
                  />
                </div>
                <Row>
                <Col md={6}>
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
                </Col>
                <Col>
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
                </Col>
                </Row>
                <Row>
                <Col md={6}>
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
                </Col>
                <Col>
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
                </Col>
                </Row>
                <Row>
                <Col md={6}>
          <Form.Group>
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your new password"
              name="newPassword"
              value={newPassword}
              onChange={handleNewPasswordChange}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>Confirm New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm New Password"
              name="confirmNewPassword"
              value={confirmNewPassword}
              onChange={handleConfirmNewPasswordChange}
            />
          </Form.Group>
        </Col>
                </Row>
              </div>
              <Button type="submit" className='button-primary mt-4' style={{ width: '100%' }}>Modify</Button>
            </Form>
          </div>
          {/* Modal for password confirmation */}
          <Modal show={showModal} onHide={closeModal}>
            <Modal.Header closeButton>
              <Modal.Title>Please Enter Your Password</Modal.Title>
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
             
              <Button className="button-primary" style={{width:'100%'}} onClick={saveChanges}>Save Changes</Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </div>
  );
}

export default ProfileForm;
