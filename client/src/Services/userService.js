
import axios from 'axios'
const UserService = {}

    UserService.signup = function( data ){

        return axios.post('http://127.0.0.1:4000/users/signup' , data)

    }

    UserService.signin = function( data ){

        return axios.post('http://127.0.0.1:4000/users/signin' , data)

    }

    UserService.logout = function( data ){

        return axios.post('http://127.0.0.1:4000/users/logout' , data)

    }


    export default UserService