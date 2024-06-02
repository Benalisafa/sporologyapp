import React, { useState, useEffect } from "react";
import { Form, Button, Table, Modal } from "react-bootstrap";
import { MailIcon, EditIcon, DeleteIcon } from "../../../components/Icons";
import { axiosInstance } from "../../../lib/axios";
import toast, { Toaster } from 'react-hot-toast';

function AdminCategories() {
  const [formData, setFormData] = useState({ category: '' });
  const [errors, setErrors] = useState({});
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [password, setPassword] = useState('');
  const [deleteCategoryId, setDeleteCategoryId] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get('/categories');
      setCategories(response.data);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!formData.category) {
        setErrors({ category: 'Category name is required' });
        return;
      }

      const response = await axiosInstance.post('/categories/add', { name: formData.category });
      setCategories([...categories, response.data]);
      toast.success('Category added successfully');

      setFormData({ category: '' });
    } catch (err) {
      console.error('Error adding category:', err);
      toast.error('Failed to add category');
    }
  };

  const handleEdit = (category) => {
    setCurrentCategory(category);
    setFormData({ category: category.name });
    setShowModal(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!formData.category) {
        setErrors({ category: 'Category name is required' });
        return;
      }

      const response = await axiosInstance.put(`/categories/${currentCategory._id}`, { name: formData.category });
      setCategories(categories.map(cat => cat._id === currentCategory._id ? response.data : cat));
      toast.success('Category updated successfully');

      setFormData({ category: '' });
      setCurrentCategory(null);
      setShowModal(false);
    } catch (err) {
      console.error('Error updating category:', err);
      toast.error('Failed to update category');
    }
  };

  const handleDelete = async () => {
    try {
      // Make sure password is entered
      if (!password) {
        toast.error('Please enter your password');
        return;
      }

      // Here you would validate the password against your backend or local logic
      const passwordValid = true; // Replace with your actual password validation logic

      if (passwordValid) {
        await axiosInstance.delete(`/categories/${deleteCategoryId}`);
        setCategories(categories.filter(category => category._id !== deleteCategoryId));
        toast.success('Category deleted successfully');
        setShowModal(false);
      } else {
        toast.error('Incorrect password');
      }
    } catch (err) {
      console.error('Error deleting category:', err);
      toast.error('Failed to delete category');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({ category: '' });
    setErrors({});
    setCurrentCategory(null);
  };

  const handleRemove = async (categoryId) => {
    try {
      await axiosInstance.delete(`/categories/${categoryId}`);
      setCategories(categories.filter(category => category._id !== categoryId));
      toast.success('Category deleted successfully');
    } catch (error) {
      console.error('Error removing category:', error);
      toast.error('Failed to delete category');
    }
  };

  return (
    <div>
      <Toaster />
      <h3 className="mt-4">Categories</h3>
      <Form className='mt-2 mb-4' noValidate onSubmit={handleSubmit}>
        <Form.Group className='mb-4 '>
          <Form.Label>Category Name</Form.Label>
         
          <Form.Control
            type="text"
            placeholder="Category Name"
            required
            name="category"
            value={formData.category}
            onChange={handleChange}
            isInvalid={!!errors.category}
            aria-invalid={!!errors.category}
          />
          <Form.Control.Feedback type="invalid">
            {errors.category}
          </Form.Control.Feedback>
        </Form.Group>
        <Button type="submit" className='button-primary mb-4' style={{ width: '100%' }}>Add</Button>
      </Form>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Category Name</th>
            <th style={{ width: '10%' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
            <tr key={category._id}>
              <td>{index + 1}</td>
              <td>{category.name}</td>
              <td>
              <Button
                      style={{ background: 'transparent', color: 'green', border: 'none' }}
                      size="sm"
                      onClick={() => handleEdit(category)}
                    >
                      <EditIcon />
                    </Button>
                    <Button
  style={{ background: 'transparent', color: 'red', border: 'none' }}
  size="sm"
  onClick={() => handleRemove(category._id)} // Pass the category ID to handleRemove
>
  <DeleteIcon />
</Button>

              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className='mb-3'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
            <Button variant="secondary" className="ms-2" onClick={handleCloseModal}>
              Cancel
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default AdminCategories;
