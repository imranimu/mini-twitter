import React, {useEffect} from 'react'
import { ThemeProvider } from './src/contexts/ThemeContext'
import SplashScreen from 'react-native-splash-screen';
import Index from './src/Index'
import { Platform } from 'react-native';
const App = () => {

    useEffect(() => {           
        Platform.OS === 'ios' ? '' : SplashScreen.hide() 
    }, []) 

    return (
        <ThemeProvider>            
            <Index />
        </ThemeProvider>        
    )
}
export default App;