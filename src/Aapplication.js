import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import React, {useContext} from 'react';
import Route from './route';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import Config from 'react-native-config';
import allReducers from './reducers/allReducer';
import {StatusBar} from 'react-native';  
import { ThemeContext } from './utils/ThemeContext';

const store = createStore(allReducers);

export default function Aapplication() {

  const {theme} = useContext(ThemeContext);  
  
  Config.API_URL = 'http://apiurl/mobileapi-v2/v2/Tigger.php?';
  Config.APP_VERSION = '1.0.0';  
  
  //const isDarkMode = useColorScheme() === 'dark';
  
  const DarkTheme = {
    ...DefaultTheme,
    roundness: 2,
    dark: true,
    colors: {
      ...DefaultTheme.colors,
      primary: '#1976D3',
      bgcolor: '#20232a',
      sbgcolor: '#282C34',
      titleText: '#BDBDBD',
      lightGrey: '#353B45',
      buttonText: '#FBFBFD',
      subtext: '#A8A9A9',
      textcolor: '#fff',
      iconColor: '#B5B5B5',
      iconBg: '#353B44',
      accent: '#000',
      black: '#000',
      white: '#fff',
      InputBG: '#282c35',
      placeholder: "#777777"
    },
  };
  const LightTheme = {
    ...DefaultTheme,
    roundness: 2,
    dark: false,
    colors: {
      ...DefaultTheme.colors,
      primary: '#1976D3',
      bgcolor: '#f6fafe',
      sbgcolor: '#fff',
      subtext: '#636363',
      titleText: '#828282',
      textcolor: '#000',
      buttonText: '#000',
      lightGrey: '#F6FAFE',
      iconColor: '#636363',
      iconBg: '#F7FAFE',
      accent: '#fff',
      black: '#000',
      white: '#fff',
      InputBG: '#fff',
      placeholder: "#464646"
    },
  };

  return (
    <PaperProvider theme={theme === 'dark' ? DarkTheme : LightTheme}>
      <StatusBar
        backgroundColor={theme === 'dark' ? '#20232a' : '#f6fafe'}
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
      />
      <Provider store={store}>
        <Route />
      </Provider>
    </PaperProvider>    
  );
}