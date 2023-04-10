import React, { ChangeEvent, useContext, useState } from 'react';
import s from '@/styles/Share.module.scss';
import { AuthContext } from '../context/AuthContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPost } from '../services/postService';
import { z } from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const postFormSchema = z.object({
  desc: z.string().min(1, 'Text required'),
  file: z.any(),
});

export type postFormSchemaType = z.infer<typeof postFormSchema>;

const Share = () => {
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient(); //destructuring invalidateQueries from useQueryClient is not working
  const [desc, setDesc] = useState('hi');
  const [file, setFile] = useState<any>('hi');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<postFormSchemaType>({
    resolver: zodResolver(postFormSchema),
  });

  // const upload = async () => {
  //   try {
  //   } catch (err) {
  //     window.alert(err);
  //   }
  // };
  //useMutation takes in a func that returns a func that returns promise, cant just pass in the func
  const { data, isLoading, mutate } = useMutation(createPost, {
    onSuccess: () => {
      queryClient.invalidateQueries(['posts']);
    },
  });

  const onSubmit: SubmitHandler<postFormSchemaType> = async (formInput) => {
    //onSubmit function in RHF takes in the data
    try {
      const formData = new FormData(); //create empty formData object. append to this object using formData.append(key, val). need to use this to send files in react because JSON format cannot handle file uploads
      formData.append('desc', formInput['desc']);
      console.log('form input: ', formInput.desc);
      console.log('file shi ', formInput.file[0]);
      formData.append('file', formInput['file'][0]);
      //axios call with form data. will have to change backend, sending form data like this does not come in req.body. also might have to consider url.encoded to true
      await mutate(formData);
    } catch (err: any) {
      window.alert(err.response?.data.message);
    }
  };

  const selectFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    setFile(file);
  };
  return (
    <>
      <div className={s.share}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={s.container}>
            <div className={s.top}>
              <div className={s.left}>
                <img src={user?.profile_pic} alt='profile pic' />
                <input
                  type='text'
                  placeholder='What have you been reading?'
                  {...register('desc')}
                />
              </div>
              <div className={s.right}>
                {/* conditional render of file img user input */}
              </div>
            </div>
            <hr />
            <div className={s.bottom}>
              <div className={s.left}>
                <input
                  type='file'
                  id='file'
                  accept='image/*'
                  {...register('file')}
                  //onChange={selectFile} //need to add in addition to registering
                  style={{ display: 'none' }}
                />
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
                <button type='submit'>Share</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Share;

//in react hook form, we easily bind input element and form state with {...register} func. If using normal form, this is how we would handle file upload onChange func:
// <input type = 'file' accept = "image/*" onChange = {(e)=> setFile(e.target.files[0])}

//submit func:

// const submit = async event => {
//   event.preventDefault()

//   const formData = new FormData();
//   formData.append("image", file)
//   formData.append("caption", caption)
//   await axios.post("/api/posts", formData, { headers: {'Content-Type': 'multipart/form-data'}})
// }

// there would be an error if you give the file input a value of {file}. The value attribute in an input element is used for setting the default value of the input. It is typically used with input types like text, password, number, etc., where the user enters the value.

// For file inputs, the value attribute is read-only and can't be set due to security reasons. Instead, just use the onChange event to update the state of the file variable.
