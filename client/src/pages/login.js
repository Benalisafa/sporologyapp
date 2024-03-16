import toast, { Toaster } from 'react-hot-toast';
import React, {useState} from 'react';
import UserService from '../Services/userService'
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate()
    const[email, setEmail] =useState('')
    const[password, setPassword] =useState('')
    const[errors, setErrors] =useState(

        {   
            email : '',
            password : '' ,

         }
    )

    const formValidation =() => {

        let status = true
        let localErrors ={...errors}


        if (email === ""){
            localErrors.email = 'Email required'
            status = false

        }

        

        if (password === ""){
            localErrors.password = 'Password required'
            status = false
    
        }
        


        setErrors(localErrors)
        console.log(localErrors)
        return status;   
    }



    const login = async(e) =>{
        e.preventDefault()
        console.log('form submitted')

        if (formValidation () ) {
            const data ={
                email : email,
                password : password ,
    
            }
            try{
                const response = await UserService.signin( data )
                console.log("response ==>" , response)

                //save user data in localstorage

                localStorage.setItem('user_data' , JSON.stringify (response.data.user) )
                localStorage.setItem('token' , response.data.token)

                toast.success('User logged successfully')

                setEmail ('')
                setPassword('')

                // redirection

                navigate ("/home")

    
    
            } catch (err){
                console.log(err)
                toast.error('User Failed')
            }

        }else{
                console.log("Invalid Form")
            }

    }


    return (
    
    <form onSubmit={login} >
    <Toaster/>
    <div>
                <label> Email</label>
                <input type="text" value={email} 
                onChange={(e)=>setEmail(e.target.value)}/>

                {
                    errors.email !== "" ? <div class="form-error-message">
                        {errors.email}
                    </div> : ''
                }

            </div>

            <div>
                <label> Password</label>
                <input type="password" value={password} 
                onChange={(e)=>setPassword(e.target.value)}/>

                {
                    errors.password !== "" ? <div class="form-error-message">
                        {errors.password}
                    </div> : ''
                }

            </div>

            <button type ='submit'>Login</button>
            <h3>Dont have a account ?</h3>
    <a href="/signup">Create a new account</a>
    </form>
    )
}


export default Login;