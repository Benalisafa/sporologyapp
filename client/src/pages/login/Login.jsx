import React from 'react'
import { Container } from 'react-bootstrap';
import LoginForm from '../../components/forms/loginForm';


function Login() {
  return (
    <Container>
    
      <h1 className='text-center'>Welcome back</h1>
      <LoginForm/>
    <div>New here? <a href="/signup">Sign up</a> </div>
    </Container>
  )
}

export default Login