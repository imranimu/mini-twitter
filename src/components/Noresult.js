import React from 'react'
import {Text, View } from 'react-native'
import IconMap from './IconMap'
import { RFValue } from '../lib'
import { globalStyles } from './GlobalStyle'
import { useTheme } from 'react-native-paper'

const Noresult = ({msg}) => {
    
    const {colors} = useTheme()

    return (
        <View style={[globalStyles.rowflex, {alignItems: "center", justifyContent: "center"}]}>             
            <IconMap type="AntDesign" name="twitter" size={20} color={colors.iconColor} />            
            
            <Text style={[globalStyles.ml10, {color: colors.text, fontSize: RFValue(18)}]}>{msg}</Text>
        </View> 
    )
}

export default Noresult 