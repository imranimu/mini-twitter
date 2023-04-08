import React, {useState} from 'react'; 
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
 
import {useTheme} from 'react-native-paper'; 
import {useDispatch} from 'react-redux'; 
import BaseLayout from '../components/BaseLayout';
import GlobalInput from '../components/GlobalInput';
import {globalStyles} from '../components/GlobalStyle';
import IconMap from '../components/IconMap';
import AppButton from '../components/AppButton'; 
import { wp } from '../lib';
import { postData } from '../services/ApiService';  

const Signup = ({navigation}) => {    
    const dispatch = useDispatch();

    const {colors} = useTheme();

    const [SecurePass, setSecurePass] = useState(true);

    const [Username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); 
    const [Loader, setLoader] = useState(false); 

    const validate = (text) => {        
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;  
        if (reg.test(text) === false) {
          return false;
        } else {
          return true;
        }
    };

    const Signup = async() => {        
            
        if (validate(email)) {

            setLoader(true);

            let data = {
                username: Username,
                email: email,
                password: password
            }; 

            const { response, status} =  await postData('/signup', data);
            
            if(status){
                console.log(response.message);
                alert(response.message);
                setUsername('');
                setEmail('');
                setPassword('');
                setLoader(false); 
                navigation.push('Login');
            }else{           
                setLoader(false);
                alert('Something went wrong! Please try again');
            }  
        }else{                           
            alert('Please enter valid email');      
        }  
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
                    onChangeText={Username => setUsername(Username)}
                    value={Username}
                />
                <GlobalInput
                    Label="Email"
                    placeholder="email"
                    onChangeText={email => setEmail(email)}
                    value={email}
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
 
                        
                <AppButton                     
                    disabled={!email && !password }
                    title={'Signup'}
                    color="#fff"
                    loader={Loader}
                    onPress={()=> Signup() }                              
                    stylesButton={{borderRadius: 100}}      
                /> 

                <TouchableOpacity onPress={() => navigation.push('Login')}>
                    <Text style={[
                            globalStyles.text,
                            {textAlign: 'center', color: colors.primary, marginBottom: 15},
                        ]}
                    >Login</Text>
                </TouchableOpacity>
    
            </ScrollView>
        </BaseLayout>
    );
};

export default Signup;

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
