import React, { useContext } from 'react';
import styles from '@/styles/leftBar.module.scss';
import Image from 'next/image';
import profilePic from '../../public/undraw_Reading_book_re_kqpk.png';
import Diversity3OutlinedIcon from '@mui/icons-material/Diversity3Outlined';
import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import NotificationsOulinedIcon from '@mui/icons-material/NotificationsOutlined';
import EventOutlinedIcon from '@mui/icons-material/EventOutlined';
import Diversity1OutlinedIcon from '@mui/icons-material/Diversity1Outlined';
import { AuthContext } from '../context/AuthContext';
type Props = {};

const LeftBar = (props: Props) => {
  const { user } = useContext(AuthContext);
  return (
    <>
      <div className={styles.leftBar}>
        <div className={styles.container}>
          <div className={styles.menu}>
            <div className={styles.user}>
              <Image src={profilePic} alt='profile pic' />
              <span>user's name</span>
            </div>
            <div className={styles.menuItem}>
              <Diversity3OutlinedIcon style={{ width: '30px' }} />
              <span>Friends</span>
            </div>
            <div className={styles.menuItem}>
              <Groups2OutlinedIcon style={{ width: '30px' }} />
              <span>Feed</span>
            </div>
            <div className={styles.menuItem}>
              <NotificationsOulinedIcon style={{ width: '30px' }} />
              <span>Notifications</span>
            </div>
            <div className={styles.menuItem}>
              <StorefrontOutlinedIcon style={{ width: '30px' }} />
              <span>Marketplace</span>
            </div>
          </div>
          <hr />
          <div className={styles.menu}>
            <span>Your shortcuts</span>
            <div className={styles.menuItem}>
              <ChatBubbleOutlineOutlinedIcon style={{ width: '30px' }} />
              <span>Messages</span>
            </div>
            <div className={styles.menuItem}>
              <Diversity1OutlinedIcon style={{ width: '30px' }} />
              <span>Groups</span>
            </div>
            <div className={styles.menuItem}>
              <EventOutlinedIcon style={{ width: '30px' }} />
              <span>Events</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeftBar;
