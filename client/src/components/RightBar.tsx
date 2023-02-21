import React from 'react';
import styles from '@/styles/RightBar.module.scss';
import Image from 'next/image';
import profilePic from '../../public/undraw_Reading_book_re_kqpk.png';
// type Props = {};

const RightBar = (props: {}) => {
  return (
    <>
      <div className={styles.rightBar}>
        <div className={styles.container}>
          <div className={styles.item}>
            <span>Suggestions</span>
            <div className={styles.user}>
              <div className={styles.userInfo}>
                <Image src={profilePic} alt='profile pic' />
                <span>user's name</span>
              </div>
              <div className={styles.buttons}></div>
              <button>follow</button>
              <button>X</button>
            </div>
            <div className={styles.user}>
              <div className={styles.userInfo}>
                <Image src={profilePic} alt='profile pic' />
                <span>user's name</span>
              </div>
              <div className={styles.buttons}></div>
              <button>follow</button>
              <button>X</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RightBar;
