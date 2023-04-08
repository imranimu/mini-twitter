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

const Foryou = () => {
    const [refreshing, setRefreshing] = useState(false);
    const {colors} = useTheme();
    const [AllTweet, setAllTweet] = useState([]) 
    const [Loader, setLoader] = useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true); 
        Timelinenfo();       
        setRefreshing(false);        
    }, []);

    useEffect(() => {     
        Timelinenfo(); 
    },[]);

    const Timelinenfo = async() => {   
        setLoader(true);
        const {response, status, msg } = await getData('/timeline');

        if(status){
            console.log(response);
            setLoader(false);
            setAllTweet(response.timeline); 
        }else{
            Alert(msg);
            setLoader(false);
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

export default Foryou

const styles = StyleSheet.create({
   
})