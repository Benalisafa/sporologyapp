import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import toast, { Toaster } from 'react-hot-toast';
// import { useNavigate } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";
// import { useDispatch } from 'react-redux';
// import { login } from '../../redux/reducers/auth.reducer';
import { axiosInstance } from '../../lib/axios';


function ActivityForm() {
    // const dispatch = useDispatch();
    // const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: []
    });

    const handleChange = (event) => {
        const { name, value, files } = event.target;
        if (name === 'image') {
            // Convert FileList to an array
            const selectedFiles = Array.from(files);
            setFormData({ ...formData, [name]: selectedFiles });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };
    



    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
    
        if (form.checkValidity() === false) {
            console.log("Invalid Form")
            toast.error('Incorrect')
            event.stopPropagation();
        } else {
            try {
                console.log('Form submitted:');
    
                // Assuming the user ID is needed for creating activity
                // You might need to handle user authentication separately if the user is not already authenticated
                // const userId = getUserIdFromToken(); // Implement a function to extract user ID from token
    
                // Creating activity after verifying user authentication
                const formDataToSend = new FormData();
                
                formDataToSend.append('title', formData.title);
                formDataToSend.append('description', formData.description);
                formData.image.forEach(file => {
                    formDataToSend.append('image', file);
                });
                
                
    
                await axiosInstance.post('activities/createActivity', formDataToSend, {
                    headers: {
                        'Content-Type': 'multipart/form-data' 
                    }
                });
    
                toast.success('Activity created successfully');
                
            } catch (err) {
                console.log(err);
                toast.error('Activity creation failed');
            }
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
                    name="image" 
                    accept="image/*"
                     multiple
                    onChange={handleChange}
                />
            </Form.Group>

            <Button type="submit">Add</Button>
        </Form>
    )
}

export default ActivityForm;