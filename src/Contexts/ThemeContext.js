import React, {createContext, useState, useEffect} from 'react';

import globalAsyncStorage from '../services/AsyncStorage';

export const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {

    const [theme, setTheme] = useState('light'); 

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        globalAsyncStorage.setItem('theme', newTheme);
    }; 

    useEffect(() => {
        globalAsyncStorage.getItem('theme').then(value => {
            if (value !== null) {
                setTheme(value);
            }
        }).catch(error => console.log(error));
    }, []);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
