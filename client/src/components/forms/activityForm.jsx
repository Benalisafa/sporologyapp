import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';
import { axiosInstance } from '../../lib/axios';
import { useSelector } from 'react-redux';
import './Forms.css';

function ActivityForm() {
  const [inputType, setInputType] = useState({ date: 'text', time: 'text' });
  const user = useSelector(state => state.auth.user);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    capacity: '',
    price: '',
    date: '',
    duration: '',
    time: '',
    category: '',
    location: '',
  });

  const [selectedImages, setSelectedImages] = useState([]);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    if (!formData.title) errors.title = 'Title is required';
    if (!formData.description) errors.description = 'Description is required';
    if (!formData.capacity) errors.capacity = 'Capacity is required';
    if (!formData.price) errors.price = 'Price is required';
    if (!formData.date) errors.date = 'Date is required';
    if (!formData.duration) errors.duration = 'Duration is required';
    if (!formData.time) errors.time = 'Time is required';
    if (!formData.category) errors.category = 'Category is required';
    if (!formData.location) errors.location = 'Location is required';
    if (selectedImages.length === 0) errors.images = 'At least one image is required';

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    const formDataToSend = new FormData();
    const userId = user ? user.userId : null;

    formDataToSend.append('userId', userId);
    for (const key in formData) {
        formDataToSend.append(key, formData[key]);
    }
    for (const image of selectedImages) {
        formDataToSend.append('images', image);
    }

    // Log the form data to see what's being sent
    for (let [key, value] of formDataToSend.entries()) {
        console.log(key, value);
    }

    try {
        const response = await axiosInstance.post('/activities/createActivity', formDataToSend, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        console.log(response.data);
        toast.success('Activity created successfully');
    } catch (err) {
        console.error(err);
        toast.error('Failed to create activity');
    }
};

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    if (name === 'images') {
      setSelectedImages(Array.from(files));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFocus = (type) => {
    setInputType((prev) => ({ ...prev, [type]: type }));
  };

  const handleBlur = (type) => {
    setInputType((prev) => ({ ...prev, [type]: 'text' }));
  };

  return (
    <div>
      <Form className='mt-5' noValidate onSubmit={handleSubmit}>
        <Toaster />
        <Form.Group controlId="categorySelect">
          <Form.Label>City</Form.Label>
          <Form.Control
            as="select"
            onChange={handleChange}
            value={formData.location}
            name="location"
            isInvalid={!!errors.location}
            className={errors.location ? 'input-error' : ''}
          >
            <option value="">City</option>
            <option value="Dubai">Dubai</option>
            <option value="Abu Dhabi">Abu Dhabi</option>
            <option value="Sharjah">Sharjah</option>
            <option value="Ajman">Ajman</option>
            <option value="Fujairah">Fujairah</option>
            <option value="Ras Al Khaimah">Ras Al Khaimah</option>
            <option value="Umm Al Quwain">Umm Al Quwain</option>
          </Form.Control>
          <Form.Control.Feedback className='feedback-error' type="invalid">{errors.location}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="categorySelect">
          <Form.Label>Category</Form.Label>
          <Form.Control
            as="select"
            onChange={handleChange}
            value={formData.category}
            name="category"
            isInvalid={!!errors.category}
          >
            <option value="">Category</option>
            <option value="Outdoor">Outdoor</option>
            <option value="Indoor">Indoor</option>
            <option value="Ladies">Ladies</option>
          </Form.Control>
          <Form.Control.Feedback type="invalid">{errors.category}</Form.Control.Feedback>
        </Form.Group>

        <div className='d-flex justify-content-between' style={{ gap: '5%' }}>
          <Form.Group className='mb-3'>
            <Form.Label>Date</Form.Label>
            <Form.Control
              type={inputType.date}
              placeholder="Date"
              value={formData.date}
              onFocus={() => handleFocus('date')}
              onBlur={() => handleBlur('date')}
              name="date"
              isInvalid={!!errors.date}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">{errors.date}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Time</Form.Label>
            <Form.Control
              type={inputType.time}
              placeholder="Time"
              value={formData.time}
              onFocus={() => handleFocus('time')}
              onBlur={() => handleBlur('time')}
              name="time"
              isInvalid={!!errors.time}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">{errors.time}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Duration</Form.Label>
            <Form.Control
              type="number"
              placeholder="Duration"
              value={formData.duration}
              name="duration"
              isInvalid={!!errors.duration}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">{errors.duration}</Form.Control.Feedback>
          </Form.Group>
        </div>

        <Form.Group className='mb-3'>
          <Form.Label>Capacity</Form.Label>
          <Form.Control
            type="number"
            placeholder="Capacity"
            value={formData.capacity}
            name="capacity"
            isInvalid={!!errors.capacity}
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">{errors.capacity}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Price"
            value={formData.price}
            name="price"
            isInvalid={!!errors.price}
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">{errors.price}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Title"
            value={formData.title}
            name="title"
            isInvalid={!!errors.title}
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Description"
            value={formData.description}
            name="description"
            isInvalid={!!errors.description}
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>Images</Form.Label>
          <Form.Control
            type="file"
            name="images"
            accept="image/*"
            multiple
            isInvalid={!!errors.images}
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">{errors.images}</Form.Control.Feedback>
        </Form.Group>

        <Button type="submit" className='button-primary' style={{ width: '100%' }}>
          Add
        </Button>
      </Form>
    </div>
  );
}

export default ActivityForm;
