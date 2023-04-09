import { StyleSheet, RefreshControl, ActivityIndicator, ScrollView, View } from 'react-native'
import React, {useState, useEffect} from 'react'
import {useDispatch} from 'react-redux';
import BaseLayout from '../../components/BaseLayout'
import { globalStyles } from '../../components/GlobalStyle'
import { useTheme } from 'react-native-paper'
import UserProfile from '../../components/UserProfile'
import { getData } from '../../services/ApiService'
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
        
        setLoader(true);

        const {response, status } = await getData('/followers');         

        if(response.error || status == false){          
            setLoader(false);
            dispatch({
                type: 'SIGN_OUT',
            });
        }else{            
            setLoader(false);
            setAllFollowers(response.followers); 
        }  
    }

    const Followers = AllFollowers?.length > 0 ? (
        AllFollowers.map((item, index) => {
            return ( 
                <UserProfile 
                    key={index}
                    type={'Followers'}
                    username={item.username}
                    userid={item.id} 
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

const styles = StyleSheet.create({})