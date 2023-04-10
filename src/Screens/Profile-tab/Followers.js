import {RefreshControl, ActivityIndicator, ScrollView, View } from 'react-native'
import React, {useState, useEffect} from 'react'
import {useDispatch} from 'react-redux';
import { globalStyles } from '../../components/GlobalStyle'
import { useTheme } from 'react-native-paper'
import { getData, postData } from '../../services/ApiService'
import BaseLayout from '../../components/BaseLayout'
import UserProfile from '../../components/UserProfile'
import Noresult from '../../components/Noresult'

const Followers = () => {
    const [refreshing, setRefreshing] = useState(false);
    const dispatch = useDispatch();
    const {colors} = useTheme();
    const [AllFollowers, setAllFollowers] = useState([]) 
    const [Loader, setLoader] = useState(false); 

    const onRefresh = React.useCallback(() => {
        setRefreshing(true); 
        GetFollowersList();       
        setRefreshing(false);        
    }, []);

    useEffect(() => {     
        GetFollowersList(); 
    },[]);

    const GetFollowersList = async() =>{
        try {
            setLoader(true);
            
            const { response } = await getData('/followers');
            
            setLoader(false);
            
            const updatedUsers = response.followers.map((user) => ({ ...user, type: 'Follower' }));

            setAllFollowers(updatedUsers);

        } catch (error) {
            console.error(error);
            setLoader(false);
            dispatch({
                type: 'SIGN_OUT',
            });
        }
    }    

    const ClickHandaler = async (type, userid) => {    
        try {
            let data = {
                user_id: userid 
            }; 
          
            let apiEndpoint = type === 'Following' ? '/unfollow' : '/follow';
            let updatedType = type === 'Following' ? 'Follower' : 'Following';
          
            const { response } = await postData(apiEndpoint, data);
          
            console.log(response);
          
            const updatedUsers = AllFollowers.map(user => user.id === userid ? {...user, type: updatedType} : user); 
          
            setAllFollowers(updatedUsers);

        } catch (error) {
            console.error(error);
            setLoader(false);
            dispatch({
                type: 'SIGN_OUT',
            });
        } 
    }

    const Followers = AllFollowers?.length > 0 ? (
        AllFollowers.map((item, index) => {
            return ( 
                <UserProfile 
                    key={index}
                    type={item.type}
                    username={item.username}
                    TabType={'Follower'}
                    Action={()=> ClickHandaler(item.type, item.id)} 
                />                 
            );
        })
    ) : (
        <Noresult msg="Nothing to show" />        
    );

    return (
        <BaseLayout containerStyle={globalStyles.py20}>
            {Loader ? 
                <View style={[globalStyles.my25]}>
                    <ActivityIndicator size="large" color={colors.primary} />
                </View> : 
                <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> }>                    
                    {Followers} 
                </ScrollView>
            }
        </BaseLayout>
    )
}

export default Followers
 