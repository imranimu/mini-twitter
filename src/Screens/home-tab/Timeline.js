import { StyleSheet, Text, Modal, Alert, View, TouchableOpacity, TextInput } from 'react-native'
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import React, {useState} from 'react'
import {useTheme} from 'react-native-paper';

import MyTweet from './MyTweet';
import Foryou from './Foryou';
import { RFValue, wp } from '../../lib';
import IconMap from '../../components/IconMap';
import { globalStyles } from '../../components/GlobalStyle';
import AppButton from '../../components/AppButton';
import { postData } from '../../services/ApiService';

const FirstRoute = () => {    
    return (
        <Foryou /> 
    );
};

const SecondRoute = () => {    
    return (        
        <MyTweet />        
    );
}; 

const Timeline = () => {
    const [index, setIndex] = useState(0);
    const {colors} = useTheme();
    const [modalVisible, setModalVisible] = useState(false);
    const [TweetContent, setTweetContent] = useState('');
    const [Loader, setLoader] = useState(false);

    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute
    });

    const [routes] = React.useState([
        {key: 'first', title: 'Timeline'},
        {key: 'second', title: 'My Tweet'}, 
    ]); 

    const renderTabBar = props => (
        <TabBar
            {...props}
            renderLabel={({route}) => (
                <Text style={{color: colors.text, fontSize: RFValue(15)}}>
                    {route.title}
                </Text>
            )}
            indicatorStyle={{backgroundColor: colors.primary}}
            style={{backgroundColor: colors.background}}
            scrollEnabled={true}
            tabStyle={{width: wp(50), marginTop: Platform.OS === 'ios' ? 45 : 0}}
        />
    );

    SubmitTweet = async() => { 
                
        setLoader(true);

        let data = {
            content: TweetContent 
        }; 

        const {response, status, msg} = await postData('/tweet', data)

        if(status){
            console.log(response);
            setLoader(false);            
            setTweetContent('');
            setModalVisible(false); 
            Alert(response.message);
        }else{
            setLoader(false);
            Alert(msg);
        }
    }

    return (
        <>
        <TabView
            renderTabBar={renderTabBar}
            navigationState={{index, routes}}
            renderScene={renderScene}
            onIndexChange={setIndex}
            lazy 
        />
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
                        <Text style={styles.modalButtonText}>Close</Text>
                    </TouchableOpacity>

                    <AppButton 
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

export default Timeline

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