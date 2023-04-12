import React, {useContext} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { ThemeContext } from '../../contexts/ThemeContext'
import { useTheme } from 'react-native-paper'
import { useDispatch } from 'react-redux'
import { globalStyles } from '../../components/GlobalStyle'
import { RFValue, wp } from '../../lib' 
import BaseLayout from '../../components/BaseLayout'
import IconMap from '../../components/IconMap'
import LiveTweet from '../../components/LiveTweet'
import AppButton from '../../components/AppButton'

const SettingTab = () => {
    const {colors} = useTheme();
    const {theme, toggleTheme} = useContext(ThemeContext);
    const dispatch = useDispatch(); 

    const Logout = () => {        
        dispatch({
            type: 'SIGN_OUT',
        });
    }

    return (
        <>
        <BaseLayout>
            <View style={[globalStyles.my25, styles.Block, { backgroundColor: colors.Input, borderRadius: 20}]}>
                <IconMap
                    type="FontAwesome"
                    name="user-o"
                    size={100}
                    color={colors.iconColor}
                /> 

                <AppButton 
                    title={"Logout"}
                    color={"#fff"}
                    loader={false}
                    onPress={()=> Logout()}        
                    stylesButton={{backgroundColor: "#DD5245", fontSize: RFValue(20), width: wp(Platform.OS === 'ios' ? 50 : 50), marginTop: 30,  borderRadius: 100}}
                    textStyle={{fontSize: RFValue(14), textTransform: "uppercase"}}
                />
            </View>

            <TouchableOpacity onPress={toggleTheme}>       
                <View style={[
                    globalStyles.rowflex, 
                    globalStyles.between, 
                    globalStyles.py15, 
                    globalStyles.px20, 
                    {backgroundColor: colors.Input, borderRadius: 50}
                ]}>
                    <IconMap
                        type="Ionicons"
                        name="md-sunny"
                        size={30}
                        color={colors.iconColor}
                    />
                    <Text style={ [ globalStyles.ml10, {color: colors.text, textTransform: "uppercase", fontSize: RFValue(14)}]}>{theme}</Text>
                </View>         
            </TouchableOpacity>
        </BaseLayout>

        <LiveTweet />         
        </>
    )
}

export default SettingTab

const styles = StyleSheet.create({
    Block:{
        alignItems: "center", justifyContent: "center",
        padding: 25
    }
})