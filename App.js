import React, {useEffect} from 'react'
import { ThemeProvider } from './src/Contexts/ThemeContext'
import SplashScreen from 'react-native-splash-screen';
import Index from './src/Index'
const App = () => {

    useEffect(() => {
        SplashScreen.hide(); 
    }, []) 

    return (
        <ThemeProvider>
            <Index />
        </ThemeProvider>        
    )
}
export default App;