import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import React from 'react'
import {useTheme} from 'react-native-paper';

import Following from './Following';
import Foryou from './Foryou';
import { RFValue, wp } from '../../lib';
import IconMap from '../../components/IconMap';

const FirstRoute = () => {    
    return (
        <Foryou /> 
    );
};

const SecondRoute = () => {    
    return (        
        <Following />        
    );
}; 

const Home = () => {
    const [index, setIndex] = React.useState(0);
    const {colors} = useTheme();

    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute
      });

    const [routes] = React.useState([
        {key: 'first', title: 'For You'},
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
        <TouchableOpacity onPress={()=> console.log('Add Tweet')}>
            <View style={[styles.AddTweet, {backgroundColor: colors.primary}]}>                
                <IconMap 
                    type="AntDesign"
                    name="plus"
                    color="#fff"
                    size={25}
                />
            </View>             
        </TouchableOpacity>
        </>
    )
}

export default Home

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
    }
})