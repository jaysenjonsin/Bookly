import React, { useContext } from 'react';
import s from '@/styles/Share.module.scss';
import { AuthContext } from '../context/AuthContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPost } from '../services/postService';
type Props = {};

const Share = (props: Props) => {
  const { user } = useContext(AuthContext);
  const { invalidateQueries } = useQueryClient();
  //Unlike useQuery where u can pass the function in directly, euse mutation takes a function that returns a promise, so cant just directly past createPost here. pass in a function that calls createPost
  const { data, isLoading } = useMutation(() => createPost('hi'), {
    onSuccess: () => {
      invalidateQueries(['posts']);
    },
  });
  return (
    <>
      <div className={s.share}>
        <div className={s.container}>
          <div className={s.top}>
            <img src={user?.profile_pic} alt='' />
            <input type='text' placeholder='What have you been reading?' />
          </div>
          <hr />
          <div className={s.bottom}>
            <div className={s.left}>
              <input type='file' id='file' /*style = {{display:'none}} */ />
              {/*give id for the label */}
              <label htmlFor='file'>
                {/*in normal HTML, its just 'for' instead of 'htmlFor' */}
                <div className={s.item}>
                  <img src='' alt='' />
                  <span>Add Image</span>
                </div>
              </label>
              <div className={s.item}>
                <img src='' alt='' />
                <span>Add Place</span>
              </div>
              <div className={s.item}>
                <img src='' alt='' />
                <span>Tag Friends</span>
              </div>
            </div>
            <div className={s.right}>
              <button>Share</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Share;
