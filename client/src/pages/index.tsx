import Head from 'next/head';
import { GetServerSidePropsContext } from 'next';
import { authenticateRoute } from '../utils/authenticateRoute.ts';
import Header from '../components/Header';
import LeftBar from '../components/LeftBar';
import RightBar from '../components/RightBar';
import Feed from '../components/Feed';
import { useContext } from 'react';
import { DarkModeContext } from '../context/DarkModeContext';
import { AuthContext } from '../context/AuthContext';
//default home page

export default function Home() {
  const { user } = useContext(AuthContext);
  const { darkMode } = useContext(DarkModeContext);
  console.log(darkMode);
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      {/* content */}
      <div className={`theme-${darkMode ? 'dark' : 'light'}`}>
        <Header />
        <div style={{ display: 'flex' }}>
          <LeftBar />
          <Feed />
          <RightBar />
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const response = await authenticateRoute(ctx);

  if (response.redirect) {
    return {
      redirect: response.redirect,
    };
  }

  return {
    props: response.props,
  };
}
