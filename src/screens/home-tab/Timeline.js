import { Text } from 'react-native'
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import React, {useState} from 'react'
import {useTheme} from 'react-native-paper';

import MyTweet from './MyTweet';
import Foryou from './Foryou';
import { RFValue, wp } from '../../lib';
 
import LiveTweet from '../../components/LiveTweet';

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

export default Timeline