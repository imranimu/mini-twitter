import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';  
import Foryou from './Foryou';
import HomePage from './home';

const HomeStack = createStackNavigator();

export default function HomeTab() {
  return (
    <HomeStack.Navigator>         
        <HomeStack.Screen
            name="homepage"
            options={{title: 'Home',  headerShown: false}}
            component={HomePage}
        />  
    </HomeStack.Navigator>
  );
}
