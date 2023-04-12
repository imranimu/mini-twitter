import {RefreshControl, ActivityIndicator, ScrollView, View } from 'react-native'
import React, {useState, useEffect} from 'react'
import { globalStyles } from '../../components/GlobalStyle'
import { useTheme } from 'react-native-paper'
import { getData, postData } from '../../services/ApiService'
import { useDispatch } from 'react-redux'
import BaseLayout from '../../components/BaseLayout'
import UserProfile from '../../components/UserProfile'
import Noresult from '../../components/Noresult'

const Following = () => {
    const [refreshing, setRefreshing] = useState(false);
    const dispatch = useDispatch();
    const {colors} = useTheme();
    const [AllFollowing, setAllFollowing] = useState([]) 
    const [Loader, setLoader] = useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true); 
        GetFollowingList();       
        setRefreshing(false);        
    }, []);

    useEffect(() => {     
        GetFollowingList(); 
    },[]);

    const GetFollowingList = async() =>{
        try {
            setLoader(true);
            
            const { response } = await getData('/following');
            
            setLoader(false);
            
            const updatedUsers = response.followings.map((user) => ({ ...user, type: 'Following' }));

            setAllFollowing(updatedUsers);

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
          
            const updatedUsers = AllFollowing.map(user => user.id === userid ? {...user, type: updatedType} : user); 
          
            setAllFollowing(updatedUsers);

        } catch (error) {
            console.error(error);
            setLoader(false);
            dispatch({
                type: 'SIGN_OUT',
            });
        } 
    }

    const Following = AllFollowing?.length > 0 ? (
        AllFollowing.map((item, index) => {
            return ( 
                <UserProfile 
                    key={index}
                    type={item.type}
                    username={item.username}
                    userid={item.id} 
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
                    {Following} 
                </ScrollView>
            }
        </BaseLayout>
    )
}

export default Following 