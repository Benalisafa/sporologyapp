import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../../lib/axios";
import { Table, Button } from "react-bootstrap";
import { DeleteIcon, EditIcon } from "../../../components/Icons";

function AdminPartners() {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchPartners = async () => {
      try {
        const { data } = await axiosInstance.get('users/partners');
        setPartners(data); // Assuming the response contains an array of partners
      } catch (error) {
        console.error("Error fetching partners:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPartners();
  }, []);

  const handleRemove = async (partnerId) => {
    try {
      await axiosInstance.delete(`/users/removePartner/${partnerId}`);
      setPartners(partners.filter(partner => partner._id !== partnerId));
    } catch (error) {
      console.error('Error removing partner:', error);
      // Handle error appropriately (e.g., show error message)
    }
  };

  const handleEdit = (partner) => {
    // Define the edit functionality here
    console.log('Edit partner:', partner);
  };

  return (
    <div>
      <h3 className="mt-4">Dashboard</h3>
      <div className="d-flex">
        {!loading && partners.length > 0 ? (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Company</th>
                <th style={{ width: '10%' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {partners.map(partner => (
                <tr key={partner._id}>
                  <td>{partner.firstname}</td>
                  <td>{partner.lastname}</td>
                  <td>{partner.email}</td>
                  <td>{partner.company}</td>
                  <td>
                    <Button
                      style={{ background: 'transparent', color: 'green', border: 'none' }}
                      size="sm"
                      onClick={() => handleEdit(partner)}
                    >
                      <EditIcon />
                    </Button>
                    <Button
                      style={{ background: 'transparent', color: 'red', border: 'none' }}
                      size="sm"
                      onClick={() => handleRemove(partner._id)}
                    >
                      <DeleteIcon />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          loading ? <p>Loading...</p> : <p>No partners found.</p>
        )}
      </div>
    </div>
  );
}

export default AdminPartners;
