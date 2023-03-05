import { borderBottom } from '@mui/system';
import { createContext, ReactNode, useEffect, useState } from 'react';

interface userProps {
  username: string;
  email: string;
  name: string;
  cover_pic?: string;
  profile_pic?: string;
  city?: string;
  website?: string;
}

interface authContextProps {
  user: userProps | null;
  setUser: React.Dispatch<React.SetStateAction<userProps | null>>;
}

interface authProviderProps {
  children: ReactNode;
}

let userFromStorage: userProps | null;

export const AuthContext = createContext<authContextProps>({
  user: null,
  setUser: () => {},
});

export const AuthProvider = ({ children }: authProviderProps) => {
  const [user, setUser] = useState<userProps | null>(userFromStorage ?? null); //using localStorage.getItem directly in here not working with NextJS, so using a userFromStorage variable to grab it

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
    const currentuser = localStorage.getItem('user'); //this will return string or null. cannot do getItem directly in JSON.parse, because JSON.parse can only accept a string as an argument and getItem has the possibility of returning null
    if (currentuser !== null) {
      userFromStorage = JSON.parse(currentuser);
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
