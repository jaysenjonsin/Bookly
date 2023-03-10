import { createContext, useEffect, useState, ReactNode } from 'react';

type DarkModeContextProps = {
  darkMode: boolean;
  toggle: () => void;
};

type DarkModeProviderProps = {
  children: ReactNode;
};

let darkModeFromStorage: string | null;

export const DarkModeContext = createContext<DarkModeContextProps>({
  darkMode: false,
  toggle: () => {}, //will be replaced by actual toggle when DarkModeProvider is used
});

export const DarkModeProvider = ({ children }: DarkModeProviderProps) => {
  const [darkMode, setDarkMode] = useState<boolean>(
    darkModeFromStorage ? true : false //using localStorage.getItem directly in here not working with NextJS, so using a userFromStorage variable to grab it
  );

  const toggle = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    const currentDarkMode = localStorage.getItem('darkMode'); //this will return string or null. cannot do getItem directly in JSON.parse, because JSON.parse can only accept a string as an argument and getItem has the possibility of returning null
    if (currentDarkMode !== null) {
      darkModeFromStorage = JSON.parse(currentDarkMode);
    }
  }, [darkMode]);

  return (
    <DarkModeContext.Provider value={{ darkMode, toggle }}>
      {children}
    </DarkModeContext.Provider>
  );
};
