import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import toast, { Toaster } from 'react-hot-toast';
import ActivityService from '../../Services/activityService';
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from 'react-redux';
import { login } from '../../redux/reducers/auth.reducer';
import { axiosInstance } from '../../lib/axios';
import UserService from '../../Services/userService';

function ActivityForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
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
                const response = await UserService.signin(formData);
                console.log (response)
                const decoded = jwtDecode (response.data.token)
                dispatch (login({user:decoded, token:response.data.token}))

             

                if (!decoded || !decoded.user) {
                    toast.error('Invalid token');
                    return;
                }

                // Assuming the user ID is needed for creating activity
                const userId = decoded.user.id;

                // Creating activity after verifying token
                await axiosInstance.post('activities/createActivity', {
                    title: formData.title,
                    description: formData.description,
                    owner: userId // Assuming the user ID is required
                });

                toast.success('Activity created successfully');

                dispatch(login({ user: decoded, token: response.data.token }));
                navigate("/");
            } catch (err) {
                console.log(err);
                toast.error('Logging Failed');
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

            <Button type="submit">Add</Button>
        </Form>
    )
}

export default ActivityForm;