//import AsyncStorage from '@react-native-async-storage/async-storage';
import globalAsyncStorage from '../services/AsyncStorage';

const initialState = {
    isUserLoggedIn: false,
    Token: '',
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_LOGGED_IN_USER_INFO':
            state = { isUserLoggedIn: true, Token: action.payload };
            return state;
        break; 

        case 'SIGN_IN':
            try {
                //const jsonValue = JSON.stringify(action.payload);
                globalAsyncStorage.setItem('Token', action.payload);
                state = {
                    isUserLoggedIn: true,
                    Token: action.payload,
                };
            } catch (error) {
                console.warn(error.message);
            }
            return state;
            break;

        case 'SIGN_OUT':
            try {
                globalAsyncStorage.removeItem('Token');
                state = {
                    isUserLoggedIn: false,
                    Token: '',
                };
            } catch (error) {
                console.warn(error.message);
            }
            return state;
            break;

        default:
            return state;
            break;
    }
};

export default userReducer;
