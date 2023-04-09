import React, {createContext, useState, useEffect} from 'react';

import globalAsyncStorage from '../services/AsyncStorage';

export const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {

    const [theme, setTheme] = useState('Dark'); 

    const toggleTheme = () => {
        const newTheme = theme === 'Light' ? 'Dark' : 'Light';
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
