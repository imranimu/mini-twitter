import Api , { setAuthToken } from '../api';

import { GetProfileInfo } from './ProfileService';

export async function getData(url) {    
    try {
        const Token = await GetProfileInfo();      
        if (Token) { 
            setAuthToken(Token);
        }
        const response = await Api.get(url);    

        return { 
            response: response.data, 
            status: true, 
            msg: 'Api Call Succss'  
        };   

    } catch (error) {

        console.log(error.response);
        return { 
            response: [], 
            status: false, 
            msg: 'Api Call Faild' 
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
            response: response.data, 
            status: true, 
            msg: 'Api Call Succss' 
        }; 
    } catch (error) {
        console.log(error.response);
        return { 
            response: [], 
            status: false, 
            msg: 'Api Call Faild' 
        } 
    }
};