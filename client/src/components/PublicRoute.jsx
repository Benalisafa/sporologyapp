import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/reducers/auth.reducer';

export const PublicRoute = ({children}) => {
    const { isConnected } = useSelector((state) => state.auth);
    
    const dispatch = useDispatch();

    useEffect(() => {
        if (isConnected) {
            // Dispatch a logout action to clean up any state
            dispatch(logout());
            
        }
    }, [isConnected, dispatch]); 

    // Since we want to logout connected users, we do not render children
    return children;
};
