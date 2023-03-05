import React from 'react';
import s from '@/styles/profile.module.scss';
import reading from '../../../public/undraw_Book_reading_re_fu2c.png';
import profilePic from '../../../public/undraw_Reading_book_re_kqpk.png';
import FaceBookTwoToneIcon from '@mui/icons-material/FacebookTwoTone';
import InstagramIcon from '@mui/icons-material/Instagram';
import PinterestIcon from '@mui/icons-material/Pinterest';
import TwitterIcon from '@mui/icons-material/Twitter';
import PlaceIcon from '@mui/icons-material/Place';
import LanguageIcon from '@mui/icons-material/Language';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Link from 'next/link';

import Image from 'next/image';
import Header from '../../components/Header';
import LeftBar from '../../components/LeftBar';
import RightBar from '../../components/RightBar';
import Layout from '../../components/Layout';

type Props = {};

const profile = (props: Props) => {
  return (
    <>
      <Layout>
        <div className={s.profile}>
          <div className={s.images}>
            <Image src={reading} alt='cover pic' />
            <Image src={profilePic} alt='profile pic' />
          </div>
          <div className={s.profileContainer}>
            <div className={s.userInfo}>
              <div className={s.left}>
                <Link href='http://facebook.com'>
                  {/* make mui icons larger using fontSize = large */}
                  <FaceBookTwoToneIcon fontSize='large' />
                </Link>
                <Link href='http://facebook.com'>
                  <FaceBookTwoToneIcon fontSize='large' />
                </Link>
                <Link href='http://facebook.com'>
                  <FaceBookTwoToneIcon fontSize='large' />
                </Link>
                <Link href='http://facebook.com'>
                  <FaceBookTwoToneIcon fontSize='large' />
                </Link>
              </div>
              <div className={s.center}>
                <span>user's name</span>
                <div className={s.info}>
                  <div className={s.item}>
                    <PlaceIcon />
                    <span>location</span>
                  </div>
                  <div className={s.item}>
                    <LanguageIcon />
                    <span>website here?</span>
                  </div>
                  <button>Follow</button>
                </div>
              </div>
              <div className={s.right}>
                <EmailOutlinedIcon />
                <MoreVertIcon />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default profile;
