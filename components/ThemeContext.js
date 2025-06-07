import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();


export function ThemeProvider({children}){
  const [darkTheme, setDarkTheme] = useState(true);

  const toggleTheme = () => setDarkTheme((prev) => !prev );

  return(
    <ThemeContext.Provider value={{darkTheme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme(){ //Custom hook to simplify the use of the theme provider
  return(
    useContext(ThemeContext)
  )
}