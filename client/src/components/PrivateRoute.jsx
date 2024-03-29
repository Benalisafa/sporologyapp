import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export const PrivateRoute = () => {
    const { isConnected } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isConnected) {
            navigate("/");
        }
    }, [isConnected, navigate]); // Add isConnected and navigate to the dependencies array

    // Render null or some loading indicator while checking authentication
    return null;
};