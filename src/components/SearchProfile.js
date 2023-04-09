import { StyleSheet, Platform, Text, View } from 'react-native'
import React from 'react'
import { globalStyles } from './GlobalStyle'
import { RFValue, wp } from '../lib'
import { useTheme } from 'react-native-paper'
import IconMap from './IconMap'

const SearchProfile = ({name}) => {
    
    const {colors} = useTheme()

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
                <Text style={[globalStyles.mr10, globalStyles.mb10, styles.Name, {color: colors.text}]}>{name} </Text>
                <Text style={[globalStyles.mr10, globalStyles.mb10, styles.Username, {color: colors.text}]}>@{name}</Text>
            </View>
        </View>
    )
}

export default SearchProfile

const styles = StyleSheet.create({
    Name:{
        fontSize: RFValue(16), 
        fontWeight: "bold"        
    },
    Username:{
        fontSize: RFValue(Platform.OS === 'ios' ? 13 :  14 ), 
    },
})