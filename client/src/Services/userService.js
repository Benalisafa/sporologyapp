import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:4000/users';

const UserService = {
  signupPartner(data) {
    return axios.post(`${API_BASE_URL}/signup/partner`, data);
  },

  signupMember(data) {
    return axios.post(`${API_BASE_URL}/signup/member`, data);
  },

  signin(data) {
    return axios.post(`${API_BASE_URL}/signin`, data);
  },

  checkEmailExists(data) {
    return axios.post(`${API_BASE_URL}/email`, data);
  },
};

export default UserService;
