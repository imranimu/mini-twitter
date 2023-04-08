import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { globalStyles } from './GlobalStyle'
import { RFValue, wp } from '../lib'
import AppButton from './AppButton'
import IconMap from './IconMap'
import { useTheme } from 'react-native-paper'

const UserProfile = ({type, username, userid}) => {    
    
    const {colors} = useTheme();

    Follow = (user_id) => {
        console.log(user_id);
    }  

    return (
        <View style={[globalStyles.rowflex, globalStyles.mb20, styles.BlockWrap, {alignItems: "center", borderBottomColor: colors.Input}]}>
            <View style={[Platform.OS === 'ios' ? globalStyles.mr5 :  globalStyles.mr10, {
                width: wp(15), 
                height: wp(15), 
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: colors.Input,
                borderRadius: 100
            }]}> 
                <IconMap type={"FontAwesome"} name={"user-o"} size={Platform.OS === 'ios' ? 25 : 28} color={colors.iconColor} />                 
            </View>
            <View style={[Platform.OS === 'ios' ? globalStyles.mr5 :  globalStyles.mr10, {width: wp(Platform.OS === 'ios' ? 45 : 45)}]}>
                <Text style={[globalStyles.mr10, globalStyles.mb10, styles.Name, {color: colors.text}]}>{username} </Text>
                <Text style={[globalStyles.mr10, globalStyles.mb10, styles.Name, {color: colors.text}]}>@{username}</Text>
                {type === 'Followers' && <View style={[globalStyles.rowflex, globalStyles.mb10, styles.FollowsBtn, {backgroundColor: colors.placeholder,}]}>
                    <Text style={[globalStyles.p5, {color: colors.text}]}>Follows you</Text>
                </View>}
            </View>
            <View>
                <AppButton 
                    title={type === 'Followers' ? 'Follow' : 'Following' }
                    color={ type === 'Followers' ? "#000" : "#fff"}
                    loader={false}
                    onPress={()=> Follow(userid) }              
                    stylesButton={{backgroundColor: type === 'Followers' ? "#fff" : '#000', width: wp(Platform.OS === 'ios' ? 30 : 25), borderRadius: 100}}                         
                />
            </View>
        </View>
    )
}

export default UserProfile

const styles = StyleSheet.create({
    BlockWrap:{
        borderBottomWidth: 1,
        paddingBottom: 20,        
    },
    Name:{
        fontSize: RFValue(16), 
        fontWeight: "bold"        
    },
    Username:{
        fontSize: RFValue(Platform.OS === 'ios' ? 13 :  14 ), 
    },
    ContentStyle:{
        lineHeight: 24,
        fontSize: Platform.OS === 'ios' ? RFValue(14) : RFValue(15) , 
    },
    FollowsBtn:{
        alignItems: "center", justifyContent: "center", borderRadius: 4, width: wp(23)
    }

})