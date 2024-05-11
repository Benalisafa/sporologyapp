
import axios from 'axios'
const UserService = {}

    UserService.signupPartner = function( data ){

        return axios.post('http://127.0.0.1:4000/users/signup/partner' , data)

    }

    UserService.signupMember = function( data ){

        return axios.post('http://127.0.0.1:4000/users/signup/member' , data)

    }

    UserService.signin = function( data ){

        return axios.post('http://127.0.0.1:4000/users/signin' , data)

    }

  
    export default UserService