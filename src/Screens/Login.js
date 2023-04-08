/*import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BaseLayout from '../components/BaseLayout'
import GlobalInput from '../components/GlobalInput'

const Login = () => {

    const dispatch = useDispatch();
    const {colors} = useTheme();
    const [SecurePass, setSecurePass] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [Loader, setLoader] = useState(false);

    return (
        <BaseLayout>
            <GlobalInput 
                Label="Username"
                placeholder="Username"
                onChangeText={username => setUsername(username)}
                value={username}
            />
        </BaseLayout>
        
    )
}

export default Login

const styles = StyleSheet.create({})

*/

import React, {useEffect, useState} from 'react';
//import Api from '../api';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
 
import {useTheme} from 'react-native-paper';
import {CheckBox} from 'react-native-elements';
import {useDispatch} from 'react-redux'; 
import BaseLayout from '../components/BaseLayout';
import GlobalInput from '../components/GlobalInput';
import {globalStyles} from '../components/GlobalStyle';
import IconMap from '../components/IconMap';
import AppButton from '../components/AppButton';
import globalAsyncStorage from '../services/AsyncStorage';
import { RFValue, wp, hp } from '../lib';

const Login = ({navigation}) => {    
    const dispatch = useDispatch();
    const {colors} = useTheme();
    const [SecurePass, setSecurePass] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [Loader, setLoader] = useState(false);

    useEffect(() => {        
        getRememberedLoginInfo();
    }, []);

    const getRememberedLoginInfo = async () => { 
        const LoginInfo = await globalAsyncStorage.getItem('@LoginInfo');

        if (LoginInfo !== null) { 
            let loginData = JSON.parse(LoginInfo);
            setUsername(loginData.username);
            setPassword(loginData.password);
            setRememberMe(loginData.rememberMe);
        }   
    };

    const Signin = () => {
        if (username && password) {
            const data = {
                user_name: username,
                password: password,
            };
            
            console.log(data);

            /*setLoader(true);
            Api.post('/user/login', data).then(response => {
                if(response.data.success){ 
                    if (rememberMe) {
                        remeberPassword();
                    } else {
                        removeRemeberPassword();
                    }
                    dispatch({type: 'SIGN_IN', payload: response.data.data});
                }
                setLoader(false);
            }).catch(error => {
                console.log(error);
                alert(error.response.data.message);
                setLoader(false);
            });*/ 
        } else {
            console.log('All Fields are required');
            alert('All Fields are required');
        }
    };

    const remeberPassword = async () => {
        let loginInfo = {
            username: username,
            password: password,
            rememberMe: rememberMe,
        };
        const jsonValue = JSON.stringify(loginInfo);
        await globalAsyncStorage.setItem('@LoginInfo', jsonValue); 
    };

    const removeRemeberPassword = async () => {
        await globalAsyncStorage.removeItem('@LoginInfo');  
    };

    return (
        <BaseLayout>
            <View style={[ globalStyles.my15, {justifyContent: "center", alignItems: "center"}]}>
                <IconMap
                    type="Ionicons"
                    name="logo-twitter"
                    size={80}
                    color={colors.primary}
                />
            </View>
            <ScrollView>                
                <GlobalInput
                Label="Username"
                placeholder="Username"
                onChangeText={username => setUsername(username)}
                value={username}
                />
                <View style={styles.FieldWrap}>
                    <GlobalInput
                        Label="Password"
                        placeholder="Password"
                        onChangeText={password => setPassword(password)}
                        value={password}
                        secureTextEntry={SecurePass}
                    />
                    <TouchableOpacity
                        onPress={() => setSecurePass(!SecurePass)}
                        style={styles.InputIcon}>
                        {SecurePass ? (
                        <IconMap type="Ionicons" name="eye-outline" size={18} color="#b8bdc6" />
                        ) : (
                        <IconMap
                            type="Ionicons"
                            name="eye-off-outline"
                            size={18}
                            color="#b8bdc6"
                        />
                        )}
                    </TouchableOpacity>
                </View>

                <View style={[styles.flexWrap, {marginBottom: hp('16%')}]}>
                    <CheckBox
                        title="Remember"
                        containerStyle={{
                        backgroundColor: 'transparent',
                        borderWidth: 0,
                        marginLeft: -10,
                        }}
                        checked={rememberMe}
                        checkedColor={colors.primary}
                        textStyle={{color: '#788390', fontWeight: 'normal'}}
                        onPress={() => {
                        setRememberMe(!rememberMe);
                        }}
                    />                    
                </View>
                        
                <AppButton                     
                    title={'Sign In'}
                    color="#fff"
                    loader={Loader}
                    onPress={()=> Signin() }               
                    stylesButton={{borderRadius: 100}}      
                /> 
                
                <TouchableOpacity onPress={() => navigation.push('Singup')}>
                    <Text style={[
                            globalStyles.text,
                            {textAlign: 'center', color: colors.primary, marginBottom: 15},
                        ]}
                    >Signup</Text>
                </TouchableOpacity>
    
            </ScrollView>
        </BaseLayout>
    );
};

export default Login;

const styles = StyleSheet.create({
    flexWrap: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    FieldWrap: {
        position: 'relative',
    },
    InputIcon: {
        position: 'absolute',
        right: 15,
        height: 50,
        paddingTop: 15,
        paddingHorizontal: 5,
        bottom: 20,
        zIndex: 999,
    },
    SocialLogin: {
        marginHorizontal: 10,
    },
    Arrow: {
        width: wp('10%'),
        height: wp('3.2%'),
    },
});
