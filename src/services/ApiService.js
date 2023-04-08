import Api , { setAuthToken } from '../api';

import { GetProfileInfo } from './ProfileService';

export async function getData(url) {    
    try {
        const userData = await GetProfileInfo();      
        if (userData) { 
            setAuthToken(userData.token);
        }
        const response = await Api.get(url);   
        return { 
            response: response.data.data, 
            status: response.data.success, 
            msg: response.data.message 
        };   
    } catch (error) {
        console.log(error.response);
        return { 
            response: [], 
            status: false, 
            msg: error.response.data.message 
        }        
    }
};

export async function postData(url, data) {
    try {
        const userData = await GetProfileInfo(); 
        if (userData) { 
            setAuthToken(userData.token);        
        }    
        const response = await Api.post(url, data);
        return { 
            response: response.data.data, 
            status: response.data.success, 
            msg: response.data.message 
        }; 
    } catch (error) {
        console.log(error.response);
        return { 
            response: [], 
            status: false, 
            msg: error.response.data.message 
        } 
    }
};