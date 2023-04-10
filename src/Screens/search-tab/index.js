import { StyleSheet, ScrollView, Platform, ActivityIndicator, TextInput, View, TouchableOpacity } from 'react-native'
import React, {useState, useEffect, useCallback} from 'react'
import BaseLayout from '../../components/BaseLayout'
import LiveTweet from '../../components/LiveTweet'
import { useTheme } from 'react-native-paper'
import IconMap from '../../components/IconMap'
import { globalStyles } from '../../components/GlobalStyle'
import { RFValue } from '../../lib'
import Noresult from '../../components/Noresult' 
import { postData } from '../../services/ApiService'
import { useDispatch } from 'react-redux'
import UserProfile from '../../components/UserProfile'

const SearchTab = () => {
    const {colors} = useTheme();
    const dispatch = useDispatch();
    const [query, setQuery] = useState('');
    const [AllUsers, setAllUsers] = useState([]) 
    const [Loader, setLoader] = useState(false);

    useEffect(() => {     
        SearchUser(); 
    },[query]);

    const SearchUser = useCallback(async() => {        
        if(query.length >= 3) {
            setAllUsers([]);
            setLoader(loader => true);           
    
            let data = {
                token: query
            }; 
    
            const {response } = await postData('/search', data);               
            setLoader(loader => false);
    
            if(response?.search_results) {

                const updatedUsers = response.search_results.map(user => ({...user, type: 'Follower'}));
                
                console.log(updatedUsers); 

                setAllUsers(updatedUsers); 

            } else if (response?.error) {
                dispatch({
                    type: 'SIGN_OUT',
                });
            }
        } else {
            setAllUsers([]);
        }  
    }, [query]);

    const ClickHandaler = async (type, userid) => {
        console.log(userid);
      
        let data = {
            user_id: userid 
        }; 
      
        let apiEndpoint = type === 'Following' ? '/unfollow' : '/follow';
        let updatedType = type === 'Following' ? 'Follower' : 'Following';
      
        const { response, status } = await postData(apiEndpoint, data);
      
        console.log(response);
        console.log(status);
      
        const updatedUsers = AllUsers.map(user => user.id === userid ? {...user, type: updatedType} : user); 
      
        console.log(updatedUsers);
      
        setAllUsers(updatedUsers);

    }    

    const Users = AllUsers?.length > 0 ? (
        AllUsers.map((item, index) => {
            return (                   
                <UserProfile 
                    key={index}
                    type={item.type}
                    username={item.username}
                    userid={item.id} 
                    Action={()=> ClickHandaler(item.type, item.id)}
                />              
            );
        })
    ) : (
        <Noresult msg="Try searching for people"/>                
    );

    return (
        <>
        <BaseLayout containerStyle={globalStyles.py20}>

            <View style={globalStyles.mb15}>
                <TextInput
                    style={[styles.input, {backgroundColor: colors.Input, color: colors.text}]}
                    placeholderTextColor={colors.placeholder}
                    value={query}
                    onChangeText={setQuery}
                    keyboardType="web-search"
                    placeholder="Search"
                />
                <View style={{position: "absolute", right: 20, top: 14}}>
                    <TouchableOpacity onPress={()=> SearchUser()}>
                        <IconMap 
                            type="AntDesign"
                            name="search1"
                            size={20}
                            color={colors.text}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            {Loader ? 
                <View style={[globalStyles.my25]}>
                    <ActivityIndicator size="large" color={colors.primary} />
                </View> : 
                <ScrollView>
                    {Users} 
                </ScrollView>
            } 
        </BaseLayout>

        <LiveTweet /> 
        </>
    )
}

export default SearchTab

const styles = StyleSheet.create({
    input:{
        height: 50,
        borderWidth: 0,
        borderRadius: 50,
        paddingHorizontal: 25,
        marginBottom: 20
    },
    Name:{
        fontSize: RFValue(16), 
        fontWeight: "bold"        
    },
    Username:{
        fontSize: RFValue(Platform.OS === 'ios' ? 13 :  14 ), 
    },
})