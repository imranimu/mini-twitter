import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';  
import { useOptions } from '../../components/NavigationOptions';
import MyProfile from './TabNav';

const ProfileStack = createStackNavigator();

export default function HomeTab() {
    const options = useOptions()

    return (
        <ProfileStack.Navigator>         
            <ProfileStack.Screen
                name="MyProfile"
                options={{title: 'Home',  headerShown: false}}
                component={MyProfile}
            />  
            {/* <ProfileStack.Screen
                name="Add Tweet"
                component={Foryou}
                options={({}) => options}
            /> */}
        </ProfileStack.Navigator>
    );
}
