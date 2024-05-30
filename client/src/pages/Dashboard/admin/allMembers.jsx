import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../../lib/axios";
import { Table, Button } from "react-bootstrap";
import { DeleteIcon, EditIcon } from "../../../components/Icons";

function AdminMembers() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchMembers = async () => {
      try {
        const { data } = await axiosInstance.get('users/members');
        setMembers(data); // Assuming the response contains an array of members
      } catch (error) {
        console.error("Error fetching members:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, []);

  const handleRemove = async (memberId) => {
    try {
      await axiosInstance.delete(`/users/removeMember/${memberId}`);
      setMembers(members.filter(member => member._id !== memberId));
    } catch (error) {
      console.error('Error removing member:', error);
      // Handle error appropriately (e.g., show error message)
    }
  };

  const handleEdit = (member) => {
    // Define the edit functionality here
    console.log('Edit member:', member);
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
          loading ? <p>Loading...</p> : <p>No members found.</p>
        )}
      </div>
    </div>
  );
}

export default AdminMembers;
