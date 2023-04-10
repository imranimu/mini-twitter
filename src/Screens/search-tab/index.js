import { StyleSheet, ScrollView, Platform, ActivityIndicator, TextInput, View, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react'
import BaseLayout from '../../components/BaseLayout'
import LiveTweet from '../../components/LiveTweet'
import { useTheme } from 'react-native-paper'
import IconMap from '../../components/IconMap'
import { globalStyles } from '../../components/GlobalStyle'
import { RFValue, wp } from '../../lib'
import Noresult from '../../components/Noresult'
import SearchProfile from '../../components/SearchProfile'
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

    const SearchUser = async() =>{
        
        if(query.length >= 3){
            setLoader(true);

            console.log(query);

            let data = {
                token: query
            }; 

            const {response } = await postData('/search', data);               

            if(response.error){          
                setLoader(false);
                dispatch({
                    type: 'SIGN_OUT',
                });
            }else{            

                console.log(response.search_results); 

                setLoader(false);
                setAllUsers(response.search_results); 
            }
        }else{
            setAllUsers([]);
        }  
    }

    const Users = AllUsers?.length > 0 ? (
        AllUsers.map((item, index) => {
            return ( 
                // <SearchProfile                
                //     key={index} 
                //     name={item.username} 
                // />   
                <UserProfile 
                    key={index}
                    type={'Search'}
                    username={item.username}
                    userid={item.id} 
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