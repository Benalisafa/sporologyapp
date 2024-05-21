import { useState } from 'react';
import { Button ,Form } from 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';
import { axiosInstance } from '../../lib/axios';
import { useSelector } from 'react-redux';
// import PropTypes from 'prop-types';
import './Forms.css'

function ActivityForm() {
  const [inputType, setInputType] = useState('text');

  const user = useSelector(state => state.auth.user);
  // function ActivityForm({buttonLabel}) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    capacity: null,
    price: null,
    date:'',
    duration: null, 
    time: '',
    category:'',
    location:'',
    
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

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!validateForm()) return;
  
    const formDataToSend = new FormData();
    
    // Extract userId from the user object obtained from Redux state
    const userId = user ? user.userId : null;
    
    formDataToSend.append('userId', userId); // Append userId to the form data
  
    // Append other form data to formDataToSend
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('capacity', formData.capacity);
    formDataToSend.append('price', formData.price);
    formDataToSend.append('date', formData.date);
    formDataToSend.append('duration', formData.duration); 
    formDataToSend.append('time', formData.time); 
    formDataToSend.append('category', formData.category); 
    formDataToSend.append('location', formData.location);  
  
    for (const image of selectedImages) {
      formDataToSend.append('images', image);
    }
  
    try {
      const response = await axiosInstance.post('/activities/createActivity', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data' 
        }
      });
      console.log(response.data);
      toast.success('Activity created successfully');
    } catch (err) {
      console.error(err);
    }
  };
  

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    if (name === 'images') {
      const newImages = Array.from(files);
      setSelectedImages(newImages);
      console.log(newImages)
    } else {
      setFormData({ ...formData, [name]: name === 'capacity' || name === 'price' || name === 'duration' ? parseInt(value, 10) : value });
    }
  };





  return (

    
    <div>
    <Form className='mt-5 ' noValidate onSubmit={handleSubmit}>
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
          <Form.Control as="select" 
          onChange={handleChange} 
          value={formData.category} 
          name="category"
          isInvalid={errors.category}>
            <option value="">Category</option>
            <option value="Outdoor">Outdoor</option>
            <option value="Indoor">Indoor</option>
            <option value="Ladies">Ladies</option>
            
          </Form.Control>
          <Form.Control.Feedback type="invalid">{errors.category}</Form.Control.Feedback>
        </Form.Group>

      <div className='d-flex justify-content-between' style={{gap:'5%'}}>
      <Form.Group className='mb-3' >
                <Form.Label>Date</Form.Label>
                <Form.Control type={inputType} required
                placeholder="Date"
                    value={formData.date}
                    onFocus={() => setInputType('date')} // Change type to date on focus
                    onBlur={() => setInputType('text')}
                    name="date"
                    isInvalid={errors.date}
                    onChange={handleChange}
                />
                <Form.Control.Feedback type="invalid">{errors.date}</Form.Control.Feedback>
      </Form.Group>

            <Form.Group className='mb-3'>
        <Form.Label>Time</Form.Label>
        <Form.Control type={inputType} required 
        placeholder="Time"
        value={formData.time} 
        onFocus={() => setInputType('time')} // Change type to date on focus
                    onBlur={() => setInputType('text')}
        name="time" 
        isInvalid={errors.time}
        onChange={handleChange} />
        <Form.Control.Feedback type="invalid">{errors.time}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className='mb-3'>
        <Form.Label>Duration</Form.Label>
        <Form.Control type="number" 
        placeholder="duration" required 
        value={formData.duration} 
        name="duration" 
        isInvalid={errors.duration}
        onChange={handleChange} />
        <Form.Control.Feedback type="invalid">{errors.duration}</Form.Control.Feedback>
      </Form.Group>
      </div>
      

      <Form.Group className='mb-3'>
        <Form.Label>Capacity</Form.Label>
        <Form.Control type="number" 
        placeholder="capacity" required
          value={formData.capacity}
          name="capacity"
          isInvalid={errors.capacity}
          onChange={handleChange}
        />
        <Form.Control.Feedback type="invalid">{errors.capacity}</Form.Control.Feedback>
      </Form.Group>


      <Form.Group className='mb-3'>
        <Form.Label>Price</Form.Label>
        <Form.Control type="number" 
        placeholder="price" required
          value={formData.price}
          name="price"
          isInvalid={errors.price}
          onChange={handleChange}
        />
        <Form.Control.Feedback type="invalid">{errors.price}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className='mb-3'>
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" 
        placeholder="title" required
          value={formData.title}
          name="title"
          isInvalid={errors.title}
          onChange={handleChange}
        />
        <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className='mb-3'>
        <Form.Label>Description</Form.Label>
        <Form.Control  as="textarea"
            rows={3} placeholder="description" required
          value={formData.description}
          name="description"
          isInvalid={errors.description}
          onChange={handleChange}
        />
        <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
      </Form.Group>
      
      <Form.Group className='mb-3'>
        <Form.Label>Images</Form.Label>
        <Form.Control type="file" required
          name="images"
          accept="image/*"
          multiple
          isInvalid={errors.images}
          onChange={handleChange}
        />
        <Form.Control.Feedback type="invalid">{errors.images}</Form.Control.Feedback>
      </Form.Group>

      <Button type="submit" className='button-primary' style={{width:'100%'}}>add</Button>
      {/* <Button type="submit" className='button-primary'>{buttonLabel}</Button> */}
    </Form>
    </div>
  );
}
// ActivityForm.propTypes = {
//   buttonLabel: PropTypes.string.isRequired, 
// };


  export default ActivityForm;
  
