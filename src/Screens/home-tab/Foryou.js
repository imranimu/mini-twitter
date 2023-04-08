import { ActivityIndicator, Alert, StyleSheet, Text, View } from 'react-native'

import React, {useEffect, useState} from 'react'

import { getData } from '../../services/ApiService';
import { useTheme } from 'react-native-paper';
import BaseLayout from '../../components/BaseLayout';
import IconMap from '../../components/IconMap';
import { globalStyles } from '../../components/GlobalStyle';
import { RFValue, wp } from '../../lib';

const Foryou = () => {
    const {colors} = useTheme();
    const [AllTweet, setAllTweet] = useState([])
    const [TotalTweet, setTotalTweet] = useState(0);
    const [Loader, setLoader] = useState(false);

    useEffect(() => {     
        // Timelinenfo(); 
    },[]);

    const Timelinenfo = async() => {   
        const {response, status, msg } = await getData('/timeline');

        if(status){
            console.log(response);
            setAllTweet(response.timeline);
            setTotalTweet(response.count);
        }else{
            Alert(msg)
        }
    }

    return (        
        <BaseLayout>
            {Loader ? <ActivityIndicator size="large" color={colors.primary} /> : 
                <View>
                    <Text style={{color: colors.text}}>Foryou</Text>
                    <Text style={{color: colors.text}}>{TotalTweet}</Text>
                </View>
            }

            <View style={[globalStyles.rowflex, {alignItems: "flex-start"}]}>
                <View style={[globalStyles.mr10, {
                    width: wp(15), 
                    height: wp(15), 
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: colors.Input,
                    borderRadius: 100
                }]}>
                    <IconMap type={"FontAwesome"} name={"user-o"} size={40} color={colors.iconColor} /> 
                </View>
                <View>
                    <View style={[globalStyles.rowflex, globalStyles.mb10]}>
                        <Text style={[globalStyles.mr10, {color: colors.text, fontSize: RFValue(18), fontWeight: "bold"}]}>Jone Due</Text>
                        <Text style={{color: colors.iconColor}}>@jone250</Text>
                        <Text style={{color: colors.iconColor}}>. 32h</Text>

                    </View>

                    <Text style={{color: colors.text}}>Hello World from Jane Doe From Live</Text>
                </View>
            </View>
        </BaseLayout>
    )
}

export default Foryou

const styles = StyleSheet.create({})