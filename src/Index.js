import { StyleSheet, Text, View, StatusBar } from 'react-native'
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import React, {useContext} from 'react'; 
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import Config from 'react-native-config';
import allReducers from './reducers/allReducer';
import { ThemeContext } from './contexts/ThemeContext';
import Route from './route';

const store = createStore(allReducers);

const Index = () => {

    const {theme} = useContext(ThemeContext)   

    Config.APP_VERSION = '1.0';

    const DarkTheme = {
        ...DefaultTheme,
        roundness: 2,
        dark: true,
        colors: {
            ...DefaultTheme.colors,
            primary: '#1976D3',
            background: "#20232a",
            sbgcolor: '#282C34',
            text: "#fff",
            iconColor: '#B5B5B5',   
            Input: '#282c35',
            placeholder: "#777777"         
        },
    };
    const LightTheme = {
        ...DefaultTheme,
        roundness: 2,
        dark: true,
        colors: {
            ...DefaultTheme.colors,
            primary: '#1976D3',
            background: "#f6fafe",
            sbgcolor: '#fff',
            text: "#000",
            iconColor: '#636363',
            Input: '#fff',
            placeholder: "#464646"
        },
    };
    return (
        <PaperProvider theme={theme === 'Dark' ? DarkTheme : LightTheme}>
            <StatusBar
                backgroundColor={theme === 'Dark' ? '#20232a' : '#f6fafe'}
                barStyle={theme === 'Dark' ? 'light-content' : 'dark-content'}
            />
            <Provider store={store}>
                <Route />                
            </Provider>
        </PaperProvider>
    )
}

export default Index

const styles = StyleSheet.create({
    
})