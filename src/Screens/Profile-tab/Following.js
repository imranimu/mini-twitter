import { StyleSheet, RefreshControl, ActivityIndicator, ScrollView, View } from 'react-native'
import React, {useState, useEffect} from 'react'
import BaseLayout from '../../components/BaseLayout'
import { globalStyles } from '../../components/GlobalStyle'
import { useTheme } from 'react-native-paper'
import UserProfile from '../../components/UserProfile'
import { getData } from '../../services/ApiService'
import Noresult from '../../components/Noresult'

const Following = () => {
    const [refreshing, setRefreshing] = useState(false);
    const {colors} = useTheme();
    const [AllFollowing, setAllFollowing] = useState([]) 
    const [Loader, setLoader] = useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true); 
        GetFollowingList();       
        setRefreshing(false);        
    }, []);

    useEffect(() => {     
        GetFollowingList(); 
    },[]);

    const GetFollowingList = async() =>{
        
        setLoader(true);

        const {response, status, msg } = await getData('/following');

        console.log(response);

        setLoader(false);

        if(status){
            console.log(response);
            setLoader(false);
            setAllFollowing(response.followings); 
        }else{
            alert(msg);
            setLoader(false);
        }
    }

    const Following = AllFollowing?.length > 0 ? (
        AllFollowing.map((item, index) => {
            return ( 
                <UserProfile 
                    key={index}
                    type={'Following'}
                    username={item.username}
                    userid={item.id} 
                />                 
            );
        })
    ) : (
        <Noresult msg="Nothing to show" />        
    );

    return (
        <BaseLayout containerStyle={globalStyles.py20}>
            {Loader ? 
                <View style={[globalStyles.my25]}>
                    <ActivityIndicator size="large" color={colors.primary} />
                </View> : 
                <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> }>                    
                    {Following} 
                </ScrollView>
            }
        </BaseLayout>
    )
}

export default Following

const styles = StyleSheet.create({
     
})