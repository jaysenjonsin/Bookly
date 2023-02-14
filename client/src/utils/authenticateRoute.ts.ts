import axios from 'axios';
import { GetServerSidePropsContext } from 'next';

const URL = process.env.NEXT_PUBLIC_API_URL;

//for authenticated pages:send get request to auth route in backend to verify that users' cookie/session is valid. make sure to send cookies in headers. if cookie is not valid, redirect user back to the login page. Using getServerSideProps ensures that authentication is performed on server before page is even rendered.

export const authenticateRoute = async (ctx: GetServerSidePropsContext) => {
  const sessionId = ctx.req.cookies['ski'];
  if (!sessionId) {
    return { redirect: { destination: '/login', permanent: false } };
  }
  try {
    const { data } = await axios.get(URL + 'auth/authenticate', {
      headers: {
        cookie: `ski=${sessionId}`,
      },
    });
    if (data.message === 'Authorized') {
      return { props: {} };
    } else {
      return { redirect: { destination: '/login', permanent: false } };
    }
  } catch (error) {
    console.error(error);
    return { redirect: { destination: '/login', permanent: false } };
  }
};
