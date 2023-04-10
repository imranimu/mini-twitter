import { StyleSheet, Text, Modal, Alert, View, TouchableOpacity, TextInput } from 'react-native'
import React, {useState} from 'react'
import { postData } from '../services/ApiService';
import { useTheme } from 'react-native-paper';
import { RFValue, wp } from '../lib';
import { globalStyles } from './GlobalStyle';
import IconMap from './IconMap';
import AppButton from './AppButton';
import { useDispatch } from 'react-redux';

const LiveTweet = () => {
    const dispatch = useDispatch();
    const {colors} = useTheme();
    const [modalVisible, setModalVisible] = useState(false);
    const [TweetContent, setTweetContent] = useState('');
    const [Loader, setLoader] = useState(false);     

    SubmitTweet = async() => {      

        setLoader(true);
    
        let data = {
            content: TweetContent 
        }; 
    
        try {
            const {response} = await postData('/tweet', data)

            console.log(response);

            setLoader(false);            

            setTweetContent('');

            setModalVisible(false); 

            alert(response.message);
           
        } catch (error) {
            setLoader(false);            
            dispatch({
                type: 'SIGN_OUT',
            });
        }        
    }
    

    return (
        <>
            <TouchableOpacity onPress={()=> { setModalVisible(true) }}>
                <View style={[styles.AddTweet, {backgroundColor: colors.primary}]}>                
                    <IconMap 
                        type="AntDesign"
                        name="plus"
                        color="#fff"
                        size={25}
                    />                    
                </View>             
            </TouchableOpacity>

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                keyboardShouldPersistTaps="handled" 
            >
                <View style={[styles.modal, {backgroundColor: colors.background}]}>
                    <View style={[globalStyles.rowflex, globalStyles.between, {width: "100%"}]}>
                        <TouchableOpacity
                            onPress={() => {
                                setModalVisible(!modalVisible);
                            }}
                            style={styles.modalButton}
                        >
                            <Text style={[styles.modalButtonText, {color: colors.text}]}>Close</Text>
                        </TouchableOpacity>                        
                        <AppButton 
                            disabled={!TweetContent}
                            title={'Tweet'}
                            color="#fff"
                            loader={Loader}
                            onPress={()=> SubmitTweet() }                              
                            stylesButton={{width: wp(Platform.OS === 'ios' ? 35 : 30), borderRadius: 100}} 
                        /> 
                    </View>
                    <View style={styles.modalContent}>
                        <TextInput  
                            style={[styles.TextArea, {color: colors.text }]}
                            placeholderTextColor={colors.placeholder}
                            placeholder={"What's happening?"}
                            onChangeText={TweetContent => setTweetContent(TweetContent)}
                            value={TweetContent}
                            multiline={true}                    
                        />                    
                    </View>
                </View>
            </Modal>
        </>
    )
}

export default LiveTweet

const styles = StyleSheet.create({
    AddTweet:{
        position:"absolute", 
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: "center",
        bottom: 15, 
        right: 15,        
        height: wp(12), 
        width: wp(12)
    },

    TextArea:{
        height: 200, borderWidth: 0, textAlignVertical: 'top',
        fontSize: RFValue(16)
    },


    button: { 
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: RFValue(14),
    },
    modal: {
        flex: 1, 
        alignItems: 'center',
        paddingVertical: Platform.OS === 'ios' ? 55 : 30,
        paddingHorizontal: 20
    },
    modalContent: {        
        width: "100%",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
    },
    modalText: {
        fontSize: RFValue(14),
        marginBottom: 10,
    },
    modalButton: { 
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
    },
    modalButtonText: {
        color: '#FFFFFF',
        fontSize: RFValue(16),
    }
})