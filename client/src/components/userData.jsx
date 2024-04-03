import React from 'react'
import { useDispatch } from 'react-redux';
import LoginForm from './forms/loginForm';
import { jwtDecode } from 'jwt-decode';
import UserService from '../Services/userService';

export const userData = async () => {
    // const dispatch = useDispatch()
    const loginData= LoginForm.formData
    const response = await UserService.signin( loginData )
    const decoded = jwtDecode (response.data.token)
    
  return (
    
    // dispatch (login({user:decoded, token:response.data.token}))
   <div></div>   
  )
}

