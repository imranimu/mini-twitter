import globalAsyncStorage from './AsyncStorage';

export const GetProfileInfo = async () => {
    const Token = await globalAsyncStorage.getItem('Token');       

    if (Token !== null) {
        return Token;    
    } else {        
        return null;
    }
}

export const SetProfileInfo = async (Token) => { 
    
    await globalAsyncStorage.setItem('Token', Token);

    console.log('Profile info Set');
        
};

export const ClearProfileInfo = async () => {

    await globalAsyncStorage.removeItem('Token');
    
    console.log('Profile info cleared');
    
};