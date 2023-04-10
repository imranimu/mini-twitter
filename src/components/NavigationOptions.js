import {useTheme} from 'react-native-paper'; 

export const navigationOptions = {
	headerShown: true,
	headerTitleAlign: 'center',
	headerBackTitleVisible: false,
	headerShadowOpacity: 0,
	headerStyle: {
		borderBottomWidth: 0,
	},
}; 

export const useOptions = () => {

	const {colors} = useTheme();

	return {
		...navigationOptions,
		headerTintColor: colors.text,
		headerStyle: {
			...navigationOptions.headerStyle,
			backgroundColor: colors.background,
		},
	};
};
 
