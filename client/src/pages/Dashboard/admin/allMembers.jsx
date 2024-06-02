import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../../lib/axios";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { DeleteIcon, EditIcon } from "../../../components/Icons";

function AdminMembers() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedMember, setEditedMember] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    const fetchMembers = async () => {
      try {
        const { data } = await axiosInstance.get('users/members');
        setMembers(data); // Assuming the response contains an array of members
      } catch (error) {
        console.error("Error fetching members:", error);
        setError("Failed to fetch members");
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, []);

  
  const handleEdit = (member) => {
    setEditedMember(member);
    setShowEditModal(true);
  };
  
  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditedMember({});
  };
  
  const handleSaveChanges = async () => {
    try {
      await axiosInstance.put(`/users/updateMember/${editedMember._id}`, editedMember);
      
      // Update the members state with the edited member
      const updatedMembers = members.map(member =>
        member._id === editedMember._id ? editedMember : member
      );
      setMembers(updatedMembers);
  
      handleCloseEditModal();
    } catch (error) {
      console.error('Error saving changes:', error);
      // Handle error appropriately (e.g., show error message)
    }
  };
  
  const handleRemove = async (memberId) => {
    try {
      await axiosInstance.delete(`/users/removeMember/${memberId}`);
      setMembers(members.filter(member => member._id !== memberId));
    } catch (error) {
      console.error('Error removing member:', error);
      // Handle error appropriately (e.g., show error message)
    }
  };
  

  return (
    <div>
      <h3 className="mt-4">Dashboard</h3>
      <div className="d-flex">
        {!loading && members.length > 0 ? (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Role</th>
                <th style={{ width: '10%' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {members.map(member => (
                <tr key={member._id}>
                  <td>{member.firstname}</td>
                  <td>{member.lastname}</td>
                  <td>{member.email}</td>
                  <td>{member.role}</td>
                  <td>
                    <Button
                      style={{ background: 'transparent', color: 'green', border: 'none' }}
                      size="sm"
                      onClick={() => handleEdit(member)}
                    >
                      <EditIcon />
                    </Button>
                    <Button
                      style={{ background: 'transparent', color: 'red', border: 'none' }}
                      size="sm"
                      onClick={() => handleRemove(member._id)}
                    >
                      <DeleteIcon />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          loading ? <p>Loading...</p> : <p>{error || "No members found."}</p>
        )}

        {/* Edit Modal */}
        <Modal show={showEditModal} onHide={handleCloseEditModal}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Member</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  value={editedMember.firstname || ''}
                  onChange={(e) => setEditedMember({ ...editedMember, firstname: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="formLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  value={editedMember.lastname || ''}
                  onChange={(e) => setEditedMember({ ...editedMember, lastname: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={editedMember.email || ''}
                  onChange={(e) => setEditedMember({ ...editedMember, email: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="formRole">
                <Form.Label>Role</Form.Label>
                <Form.Control
                  as="select"
                  value={editedMember.role || ''}
                  onChange={(e) => setEditedMember({ ...editedMember, role: e.target.value })}
                >
                  <option value="member">Member</option>
                  <option value="admin">Admin</option>
                </Form.Control>
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
    </div>
  );
}

export default AdminMembers;
