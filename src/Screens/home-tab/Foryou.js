import { ActivityIndicator, Alert, StyleSheet, Text, View, RefreshControl, ScrollView } from 'react-native'

import React, {useEffect, useState} from 'react'

import { getData } from '../../services/ApiService';
import { useTheme } from 'react-native-paper';
import BaseLayout from '../../components/BaseLayout';
import IconMap from '../../components/IconMap';
import { globalStyles } from '../../components/GlobalStyle';
import { RFValue, wp } from '../../lib';
import Tweet from '../../components/Tweet';

const Foryou = () => {
    const [refreshing, setRefreshing] = useState(false);
    const {colors} = useTheme();
    const [AllTweet, setAllTweet] = useState([])
    const [TotalTweet, setTotalTweet] = useState(0);
    const [Loader, setLoader] = useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        console.log('Refresh ... call function'); 
        Timelinenfo();
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
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
            setTotalTweet(response.count);
        }else{
            Alert(msg);
            setLoader(false);
        }
    } 

    const TweetList = AllTweet.length > 0 ? (
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
        <View style={globalStyles.rowflex}>
            <IconMap type="AntDesign" name="warning" size={20} color={colors.iconColor} />
            <Text style={[globalStyles.ml10, {color: colors.text, fontSize: RFValue(18)}]}> No Tweet to display</Text>
        </View>
        
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