
import axios from 'axios'
const ActivityService = {}

    ActivityService.create= function( data ){

        return axios.post('http://127.0.0.1:4000/activities/createActivity' , data)

    }

    ActivityService.signin = function( data ){

        return axios.post('http://127.0.0.1:4000/activities/signin' , data)

    }

  
    export default ActivityService