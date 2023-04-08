
import axios from 'axios';

const Api = axios.create({
  baseURL: 'https://missingdata.pythonanywhere.com',   
});

export const setAuthToken = token => {
    if (token) {
        Api.defaults.headers.common['X-Jwt-Token'] = `Bearer ${token}`;
    } else {
        delete Api.defaults.headers.common['Authorization'];
    }
};
 
export default Api;