import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import toast, { Toaster } from 'react-hot-toast';
import { axiosInstance } from '../../lib/axios';

function ActivityForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    capacity: null,
    price: null,
  });

  const [selectedImages, setSelectedImages] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('capacity', formData.capacity);
    formDataToSend.append('price', formData.price);

    for (const image of selectedImages) {
      formDataToSend.append('images', image);
    }

    try {
      await axiosInstance.post('/activities/createActivity', formDataToSend);
      toast.success('Activity created successfully');
    } catch (err) {
      console.error(err);
      toast.error('Activity creation failed');
    }
  };

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    if (name === 'images') {
      const newImages = Array.from(files);
      setSelectedImages(newImages);
    } else {
      setFormData({ ...formData, [name]: name === 'capacity' || name === 'price' ? parseInt(value, 10) : value });
    }
  };

  return (
    <Form className='mt-5' noValidate onSubmit={handleSubmit}>
      <Toaster />
      <Form.Group className='mb-3'>
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" placeholder="title" required
          value={formData.title}
          name="title"
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className='mb-3'>
        <Form.Label>Description</Form.Label>
        <Form.Control type="text" placeholder="description" required
          value={formData.description}
          name="description"
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className='mb-3'>
        <Form.Label>Photos</Form.Label>
        <Form.Control type="file" required
          name="images"
          accept="image/*"
          multiple
          onChange={handleChange}
        />
      </Form.Group>
      
      <Form.Group className='mb-3'>
        <Form.Label>Price</Form.Label>
        <Form.Control type="number" placeholder="price" required
          value={formData.price}
          name="price"
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className='mb-3'>
        <Form.Label>Capacity</Form.Label>
        <Form.Control type="number" placeholder="capacity" required
          value={formData.capacity}
          name="capacity"
          onChange={handleChange}
        />
      </Form.Group>

      <Button type="submit">Add</Button>
    </Form>
  );
}

export default ActivityForm;
