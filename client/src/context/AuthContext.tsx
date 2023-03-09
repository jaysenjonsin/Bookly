import { createContext, ReactNode, useEffect, useState } from 'react';

interface User {
  username: string;
  email: string;
  name: string;
  cover_pic?: string;
  profile_pic?: string;
  city?: string;
  website?: string;
}

interface AuthContextProps {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextProps>({
  //initial values
  user: null,
  setUser: () => {},
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  //set user on page load - without this, user becomes null whenever refreshing page
  useEffect(() => {
    const userFromStorage = localStorage.getItem('user');
    if (userFromStorage) {
      setUser(JSON.parse(userFromStorage));
    }
  }, []);

  //update local storage when user changes, AKA when logging in, logging out, registering
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      //if logging out, remove user from local storage
      localStorage.removeItem('user');
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
