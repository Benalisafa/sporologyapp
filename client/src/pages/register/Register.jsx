

import RegisterForm from '../../components/forms/registerForm'
import { Container } from 'react-bootstrap';


function Register() {
  
  return (
    
    <Container>
      <h1 className='text-center'>Create your account</h1>
    <RegisterForm/>
    <div>you have an account? <a href="/login">login</a> </div>
    </Container>
  );
}

export default Register;