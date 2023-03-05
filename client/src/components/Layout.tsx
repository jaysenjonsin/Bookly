import React, { useContext } from 'react';
import { DarkModeContext } from '../context/DarkModeContext';
import Header from './Header';
import LeftBar from './LeftBar';
import RightBar from './RightBar';

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const { darkMode } = useContext(DarkModeContext);
  return (
    <>
      <Header />
      <div className={`theme-${darkMode ? 'dark' : 'light'}`}>
        <div style={{ display: 'flex' }}>
          <LeftBar />
          {children}
          <RightBar />
        </div>
      </div>
    </>
  );
};

export default Layout;
