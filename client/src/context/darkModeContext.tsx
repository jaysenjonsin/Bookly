import { createContext, useEffect, useState, ReactNode } from 'react';

interface DarkModeContextProps {
  darkMode: boolean;
  toggle: () => void;
}

interface DarkModeContextProviderProps {
  children: ReactNode;
}

export const DarkModeContext = createContext<DarkModeContextProps>({
  darkMode: false,
  toggle: () => {}, //will be replaced by actual toggle when darkModeContextProvider is used
});

export const DarkModeContextProvider = ({
  children,
}: DarkModeContextProviderProps) => {
  const [darkMode, setDarkMode] = useState<boolean>(
    localStorage.getItem('darkMode') === 'true' || false
  );

  const toggle = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  return (
    <DarkModeContext.Provider value={{ darkMode, toggle }}>
      {children}
    </DarkModeContext.Provider>
  );
};
