import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../../lib/axios";
import { Table, Button } from "react-bootstrap";
import { DeleteIcon, EditIcon } from "../../../components/Icons";

function AdminReviews() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axiosInstance.get("/reviews/getReviews");
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        // Handle error gracefully, show error message or retry logic
      }
    };

    fetchReviews();
  }, []);

  return (
    <div>
      <h3 className="mt-4">Reviews</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>User</th>
            <th>Activity</th>
            <th>Rating</th>
            <th>Experience</th>
            <th>Date</th>
            <th style={{ width: '10%' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review) => (
            <tr key={review._id}>
              
              <td>{review.userId?.firstname || "Unknown User"}</td> {/* Safely access firstname */}
              <td>{review.activityId?.title || "Unknown Activity"}</td> {/* Safely access title */}
              <td>{review.rating}</td>
              <td>{review.experience}</td>
              <td>{new Date(review.date).toLocaleDateString()}</td>
              <td>
              <Button
                      style={{ background: 'transparent', color: 'green', border: 'none' }}
                      size="sm"
                     
                    >
                      <EditIcon />
                    </Button>
                    <Button
                      style={{ background: 'transparent', color: 'red', border: 'none' }}
                      size="sm"
                      
                    >
                      <DeleteIcon />
                    </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default AdminReviews;
