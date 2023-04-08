import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';  
import Timeline from './Timeline';
import { useOptions } from '../../components/NavigationOptions'; 

const HomeStack = createStackNavigator();

export default function HomeTab() {
    const options = useOptions()

    return (
        <HomeStack.Navigator>         
            <HomeStack.Screen
                name="homepage"
                options={{title: 'Home',  headerShown: false}}
                component={Timeline}
            />  
        </HomeStack.Navigator>
    );
}
