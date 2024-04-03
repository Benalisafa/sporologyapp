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
    }, [isConnected, navigate]); 

    
    return null;
};