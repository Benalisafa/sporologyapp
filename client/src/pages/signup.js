import toast, { Toaster } from 'react-hot-toast'
import React, {useState} from 'react'
import UserService from '../Services/userService'



const Signup =() =>{

    const[firstname, setFirstname] =useState('')
    const[lastname, setLastname] =useState('')
    const[email, setEmail] =useState('')
    const[password, setPassword] =useState('')
    const[picture, setPicture] =useState('')  
    const[birthdate, setBirthdate] =useState('')
    const[address, setAddress] =useState('')
    const[phone, setPhone] =useState('')
    const[errors, setErrors] =useState(

        {
            firstname : '',
            lastname : '',
            email : '',
            password : '' ,
            picture :'',
            birthdate : '',
            address : '',
            phone : '',
 

         }
    )

    const formValidation =() => {

        let status = true
        let localErrors ={...errors}

        if (firstname === ""){
            localErrors.firstname = 'Firstname required'
            status = false

        }

        if (lastname === ""){
            localErrors.lastname = 'Lastname required'
            status = false

        }

        if (email === ""){
            localErrors.email = 'Email required'
            status = false

        }

        

        if (password<9){
            localErrors.password = 'Password should be more than 8 caracters'

            if (password === ""){
                localErrors.password = 'Password required'
                status = false
    
            }
        }

        

        if (birthdate === ""){
            localErrors.birthdate = 'Birthdate required'
            status = false

        }

        if (address === ""){
            localErrors.address = 'Address required'
            status = false

        }

        if (phone === ""){
            localErrors.phone = 'Phone required'
            status = false

        }

        setErrors(localErrors)
        console.log(localErrors)
        return status;   
    }

    // const[picture, setPicture] =useState('')


    

    const signup = async (e) =>{
        e.preventDefault()
        console.log('form submitted')
        console.log("form data" , firstname , lastname , email)

        if (formValidation () ) {
            const data ={
                firstname : firstname,
                lastname : lastname,
                email : email,
                password : password ,
                picture : picture ,
                birthdate : birthdate,
                address : address,
                phone : phone,
    
            }

            try{
                const response = await UserService.signup( data )
                console.log("response ==>" , response)
                toast.success('User added successfully')
                setFirstname('')
                setLastname ('')
                setAddress('')
                setPicture('')
                setBirthdate('')
                setEmail ('')
                setPassword('')
                setPhone('')
    
    
            } catch (err){
                console.log(err)
                toast.error('User Failed')
            }

        } else {
            console.log("Invalid Form")
        }

        

        

        

    }

    return(
        
        
        <form onSubmit={signup}>
            <Toaster/>
            <div>
                <label> Firstname</label>
                <input type="text" value={firstname}
                onChange={(e)=>setFirstname(e.target.value)}/>

                {
                    errors.firstname !== "" ? <div class="form-error-message">
                        {errors.firstname}
                    </div> : ''
                }

            </div>

            <div>
                <label> Lastname</label>
                <input type="text" value={lastname} 
                onChange={(e)=>setLastname(e.target.value)}/>

                {
                    errors.lastname !== "" ? <div class="form-error-message">
                        {errors.lastname}
                    </div> : ''
                }

            </div>

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

            <div>
                <label> Birthdate</label>
                <input type="date" value={birthdate} 
                onChange={(e)=>setBirthdate(e.target.value)}/>

                {
                    errors.birthdate !== "" ? <div class="form-error-message">
                        {errors.birthdate}
                    </div> : ''
                }

            </div>

            <div>
                <label> Address</label>
                <input type="text" value={address} 
                onChange={(e)=>setAddress(e.target.value)}/>

                {
                    errors.address !== "" ? <div class="form-error-message">
                        {errors.address}
                    </div> : ''
                }
            </div>

            <div>
                <label> Phone Number</label>
                <input type="tel" value={phone} 
                onChange={(e)=>setPhone(e.target.value)}/>

                {
                    errors.phone !== "" ? <div class="form-error-message">
                        {errors.phone}
                    </div> : ''
                }
            </div>

            {/* <div>
            <label> Profile picture</label>
            <input type="file" value={picture}/>
            </div> */}
           

            <button type ='submit'>Signup</button>
            <a href="/">Go back to login page</a>
        </form>
        
    )

}

export default Signup;