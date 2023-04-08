import { ActivityIndicator, Alert, StyleSheet, Text, View, RefreshControl, ScrollView } from 'react-native'
import React, {useEffect, useState} from 'react'
import { useTheme } from 'react-native-paper';
import { getData } from '../../services/ApiService';
import { globalStyles } from '../../components/GlobalStyle';
import BaseLayout from '../../components/BaseLayout'
import Tweet from '../../components/Tweet';
import Noresult from '../../components/Noresult';

const MyTweet = () => {
    const [refreshing, setRefreshing] = useState(false);
    const {colors} = useTheme();
    const [AllTweet, setAllTweet] = useState([]) 
    const [Loader, setLoader] = useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true); 
        GetMyTweet();       
        setRefreshing(false);        
    }, []);

    useEffect(() => {     
        GetMyTweet(); 
    },[]);

    const GetMyTweet = async() => {   
        setLoader(true);
        const {response, status, msg } = await getData('/my-tweets');

        if(status){
            console.log(response);
            setLoader(false);
            setAllTweet(response.my_tweets); 
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

export default MyTweet

const styles = StyleSheet.create({})