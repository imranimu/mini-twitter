import React from 'react';

import {StyleSheet, Platform, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {useTheme} from 'react-native-paper';
import IconMap from '../components/IconMap'; 
import HomeTab from './home-tab';
import ProfileTab from './Profile-tab';

const Tab = createBottomTabNavigator();

const TabContainer = ({navigation, route}) => {
    const {colors} = useTheme();
    return (
        <NavigationContainer independent={true}>
        <Tab.Navigator
            screenOptions={({route}) => ({
                headerShown: false,          
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: '#BDBDBD',         
                
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;
                    if (route.name === 'Home') {
                        iconName = 'home';
                    } else if (route.name === 'Search') {
                        iconName = 'search1';
                    } else if (route.name === 'Profile') {
                        iconName =  'user';
                    } else if (route.name === 'Setting') {
                        iconName = 'setting';
                    }
                    return <IconMap type={'AntDesign'} name={iconName} size={Platform.OS === 'ios' ? 23 : 25} color={color} />
                },
                tabBarStyle: {
                    height: Platform.OS === 'ios' ? 80 : 70,
                    paddingHorizontal: 5,
                    paddingTop: 5,
                    paddingBottom: Platform.OS === 'ios' ? 20 : 12,
                    backgroundColor: colors.sbgcolor,
                    borderTopWidth: 0,
                },
            })}
            tabBarOptions={{
                keyboardHidesTabBar: true,          
                showLabel: false,  
            }}
        >
            <Tab.Screen name="Home" component={HomeTab} />
            <Tab.Screen name="Search" component={HomeTab} />
            <Tab.Screen name="Profile" component={ProfileTab} />
            <Tab.Screen name="Setting" component={HomeTab} /> 
        </Tab.Navigator>
    </NavigationContainer>
    )
}

export default TabContainer

const styles = StyleSheet.create({})