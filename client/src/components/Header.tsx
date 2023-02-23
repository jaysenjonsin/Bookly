import { useContext } from 'react';
import styles from '@/styles/Header.module.scss';
import Link from 'next/link';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import NotificationsOulinedIcon from '@mui/icons-material/NotificationsOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Image from 'next/image';
import profilePic from '../../public/undraw_Reading_book_re_kqpk.png';
import { DarkModeContext } from '../context/darkModeContext';
// type Props = {};

const Header = (props: {}) => {
  const { toggle } = useContext(DarkModeContext);
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Link href='/' style={{ textDecoration: 'none' }}>
            <span>logo here</span>
          </Link>
          <HomeOutlinedIcon />
          <DarkModeOutlinedIcon onClick={toggle} />
          <GridViewOutlinedIcon />
          <div className={styles.search}>
            <SearchOutlinedIcon />
            <input type='text' placeholder='Search Bookly' />
          </div>
        </div>
        <div className={styles.right}>
          <PersonOutlinedIcon />
          <ChatBubbleOutlineOutlinedIcon />
          <NotificationsOulinedIcon />
          <div className={styles.user}>
            <Image src={profilePic} alt='' />
            <span>user's name</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
