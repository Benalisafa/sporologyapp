import React from 'react'
import { Container } from 'react-bootstrap';
import LoginForm from '../../components/forms/loginForm';
import './login.css'


function Login() {
  return (
    <Container>
    
      <h1 className='text-center'>Welcome back</h1>
      <LoginForm/>
    
    </Container>
  )
}

export default Login