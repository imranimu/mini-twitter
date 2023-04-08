import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';  
import Timeline from './Timeline';

const HomeStack = createStackNavigator();

export default function HomeTab() {
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
