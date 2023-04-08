import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import {useOptions} from './components/NavigationOptions';

import Signup from './screens/Signup'; 
import TabContainer from './screens/TabContainer';
import Login from './screens/Login';

const Stack = createStackNavigator();

export default function Route() {
	const user = useSelector(state => state.user);

	console.log(user);
	
	const options = useOptions();

	return (
		<NavigationContainer>
			<Stack.Navigator>
				{user.isUserLoggedIn == false ? (
				<>	
					<Stack.Screen
						name="Login"
						component={Login}
						options={({navigation}) => options}
					/> 				 
					<Stack.Screen
						name="Signup"
						component={Signup}
						options={({navigation}) => options}
					/>
					
				</>
				) : (
					<Stack.Screen
						name="TabContainer"
						component={TabContainer}
						options={{headerShown: false}}
					/>
				)}
			</Stack.Navigator>
		</NavigationContainer>
	);
}
