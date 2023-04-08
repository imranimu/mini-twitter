import React from 'react';
import { StyleSheet, View, Text, TextInput} from 'react-native';
import { useTheme } from 'react-native-paper';
import {globalStyles} from './GlobalStyle'
 
const GlobalInput = ({Label, Style, ...props }) => {
    
    const {colors} = useTheme();
    
    return (
        <View style={{width: "100%"}}>
            <Text style={[globalStyles.text, styles.LabelText, {color: colors.text}]}>{Label}</Text>
            <TextInput
                {...props}
                placeholderTextColor={colors.placeholder}
                style={[
                    globalStyles.text, 
                    styles.input, 
                    {backgroundColor: colors.Input, color: colors.text},
                    Style
                ]}                
            />
        </View>
    );
};

const styles = StyleSheet.create({
    LabelText:{
        marginBottom: 10,            
    },
    input: {        
        height: 50,
        borderWidth: 0,
        borderRadius: 50,
        paddingHorizontal: 15,
        marginBottom: 20
    },
});

export default GlobalInput;
