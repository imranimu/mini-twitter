import globalAsyncStorage from './AsyncStorage';

export const GetProfileInfo = async () => {
    const ProfileDetails = await globalAsyncStorage.getItem('@UserDetails');       

    if (ProfileDetails !== null) {
    
        let userData = JSON.parse(ProfileDetails);

        console.log('Profile info Get');

        return userData;      
        
    } else {        
        return null;
    }
}

export const SetProfileInfo = async (userData) => {
    
    const jsonValue = JSON.stringify(userData);
    
    await globalAsyncStorage.setItem('@UserDetails', jsonValue);

    console.log('Profile info Set');
        
};

export const ClearProfileInfo = async () => {

    await globalAsyncStorage.removeItem('@UserDetails');
    
    console.log('Profile info cleared');
    
};