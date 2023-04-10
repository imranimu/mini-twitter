import {
    ActivityIndicator,
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
} from 'react-native';
import React from 'react';
import {useTheme} from 'react-native-paper';
import {hp, RFValue} from '../lib';

export default function AppButton({title, onPress, disabled, stylesButton, color, textStyle, loader}){
    const {colors} = useTheme();
    return(
        <TouchableOpacity
            activeOpacity={0.6}
            onPress={onPress}
            style={[
                styles.buttonContainer,                 
                {
                    backgroundColor: disabled ? "#265078" : colors.primary,                    
                },
                stylesButton,
            ]}
            disabled={disabled}
        >
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>

                {loader && (
                    <ActivityIndicator
                        color={'#fff'}
                        style={[styles.Loader, {right: hp(1)}]}
                    />
                )} 
                <Text
                    style={[
                        styles.title,
                        {color: color ?? colors.text},                        
                        textStyle, 
                    ]}
                >
                {title}
                    </Text>
            </View>
        </TouchableOpacity>   
    )

}

const styles = StyleSheet.create({
    buttonContainer: {       
        width: "100%",
        alignSelf: 'center',
        paddingVertical: hp(1.7),
        alignItems: 'center',
        borderRadius: 50,
        marginVertical: hp(1.5),      
    },
    title: {
        fontWeight: 'bold',      
        fontSize: RFValue(14),
    }, 
    titleSec: {
        color: '#1691CE',
    },
  });