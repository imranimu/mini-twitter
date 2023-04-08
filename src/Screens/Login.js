import React, {useEffect, useState} from 'react'; 
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
import { wp, hp } from '../lib';
import { postData } from '../services/ApiService'; 
//import Toast from 'react-native-simple-toast';

const Login = ({navigation}) => {    
    const dispatch = useDispatch();
    const {colors} = useTheme();
    const [SecurePass, setSecurePass] = useState(true);
    const [email, setEmail] = useState('');
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
            setEmail(loginData.email);
            setPassword(loginData.password);
            setRememberMe(loginData.rememberMe);
        }   
    };

    const validate = (text) => {        
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;  
        if (reg.test(text) === false) {
          return false;
        } else {
          return true;
        }
    };

    const Signin = async() => {        
            
        if (validate(email)) {

            setLoader(true);

            let data = {
                email: email,
                password: password
            }; 

            const { response, status} =  await postData('/login', data);
            
            if(status){
                console.log(response.token);

                if (rememberMe) {
                    remeberPassword();
                } else {
                    removeRemeberPassword();
                }
                dispatch({type: 'SIGN_IN', payload: response.token});                  
                setLoader(false); 
            }else{                    
                setLoader(false);
                alert('Sorry, we could not find your account.');
            }  
        }else{                           
            alert('Please enter valid email');      
        }  
    };

    const remeberPassword = async () => {
        let loginInfo = {
            email: email,
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
                Label="Email"
                placeholder="Enter your email"
                onChangeText={email => setEmail(email)}
                value={email}
                />
                <View style={styles.FieldWrap}>
                    <GlobalInput
                        Label="Password"
                        placeholder="Enter your password"
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
                    disabled={!email || !password }
                    title={'Sign In'}
                    color="#fff"
                    loader={Loader}
                    onPress={()=> Signin() }                              
                    stylesButton={{borderRadius: 100}}      
                /> 
                
                <TouchableOpacity onPress={() => navigation.push('Signup')}>
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
