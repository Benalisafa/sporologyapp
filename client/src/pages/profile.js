
import React from 'react'
import Navbar from "./components/navbar"
import useConnectedUserData from './connecteduser';
import { Navigate } from 'react-router-dom';


const Profile = () => {

    const connectedUser = useConnectedUserData();

    if (!connectedUser) {
        return <Navigate to={'/login'}/>
    }

    return (
    <>
        <Navbar></Navbar>
        <nav>
            
        </nav>
        <h1>Hello { connectedUser.firstname }</h1>

    </>

    )

}

export default Profile