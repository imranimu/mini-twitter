import { Text } from 'react-native'
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import React, {useState, useEffect} from 'react'
import {useTheme} from 'react-native-paper';
import { RFValue, wp } from '../../lib';
import Followers from './Followers';
import Following from './Following';
import LiveTweet from '../../components/LiveTweet';

const FirstRoute = () => {    
    return (
        <Followers />
    );
};

const SecondRoute = () => {    
    return (        
        <Following />       
    );
}; 

const MyProfile = ({route}) => {

    const {tabindex} = route?.params;    

    const [index, setIndex] = useState(tabindex);

    const {colors} = useTheme();
    
    useEffect(() => {     
        setIndex(tabindex);
    },[tabindex]);

    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute
    });

    const [routes] = React.useState([
        {key: 'first', title: 'Followers'},
        {key: 'second', title: 'Following'}, 
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

    return (
        <>
        <TabView
            renderTabBar={renderTabBar}
            navigationState={{index, routes}}
            renderScene={renderScene}
            onIndexChange={setIndex}
            lazy 
        />    

        <LiveTweet />  
        </>
    )
}

export default MyProfile 