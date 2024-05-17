import React from 'react'
import { Container } from 'react-bootstrap';
import LoginForm from '../../components/forms/loginForm';
import './login.css'


function Login() {
  return (
    <div className='container-xs mt-4'>
    
      <h3 >Welcome back</h3>
      <LoginForm/>
      <div className='mt-2 mb-4 text-center'>Don’t have any account yet? <a href="/partner/signup">Create an account</a> </div>
    
    </div>
  )
}

export default Login