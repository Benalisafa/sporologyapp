import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

export const PrivateRole = ({  role, children}) => {
    const user = useSelector((state) => state.auth.user);
    
    const navigate = useNavigate();

    useEffect(() => {
        if (user && user.role !== role) {
            navigate("/");
        }
    }, [user, navigate, role]);

    if (!user) {
        return null; // or loading indicator, etc.
    }
    
    return children;
};

PrivateRole.propTypes = {
    role: PropTypes.string.isRequired,
    children: PropTypes.node 
};