import React, {useEffect, useState} from 'react'
import { ActivityIndicator, Alert, StyleSheet, Text, View, RefreshControl, ScrollView } from 'react-native'
import { useTheme } from 'react-native-paper';
import { getData } from '../../services/ApiService';
import { globalStyles } from '../../components/GlobalStyle';
import { RFValue } from '../../lib';
import BaseLayout from '../../components/BaseLayout';
import IconMap from '../../components/IconMap';
import Tweet from '../../components/Tweet';
import Noresult from '../../components/Noresult';
import { useDispatch } from 'react-redux';

const Timeline = () => {
    const [refreshing, setRefreshing] = useState(false);
    const {colors} = useTheme();
    const [AllTweet, setAllTweet] = useState([]) 
    const [Loader, setLoader] = useState(false);
    const dispatch = useDispatch();

    const onRefresh = React.useCallback(() => {
        setRefreshing(true); 
        TimelineTweet();       
        setRefreshing(false);        
    }, []);

    useEffect(() => {     
        TimelineTweet(); 
    },[]);

    const TimelineTweet = async() => {   
        
        setLoader(true);

        const {response, status} = await getData('/timeline');        

        if(response.error || status == false){

            setLoader(false);

            dispatch({
                type: 'SIGN_OUT',
            });

        }else{
            setLoader(false);            
            setAllTweet(response.timeline); 
        }           
    } 

    const TweetList = AllTweet?.length > 0 ? (
        AllTweet.map((item, index) => {
            return ( 
                <Tweet 
                    key={index}
                    name={item.user.username}
                    username={`@${item.user.username}`}
                    duration="32h"
                    content={item.content}
                />
            );
        })
    ) : (
        <Noresult msg="No Tweet to display" />
    );
    

    return (        
        <BaseLayout containerStyle={globalStyles.pt15}>
            {Loader ? 
                <View style={[globalStyles.my25]}>
                    <ActivityIndicator size="large" color={colors.primary} />
                </View> : 
                <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> }>                    
                    {TweetList} 
                </ScrollView>
            }            
        </BaseLayout>
    )
}

export default Timeline

const styles = StyleSheet.create({
   
})