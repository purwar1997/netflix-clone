import { Link } from 'react-router-dom';
import { BACKGROUND_IMAGE_URL } from '../utils/constants';

const Signup = () => {
  return (
    <section
      className='h-screen bg-cover bg-center bg-no-repeat flex justify-center items-center'
      style={{
        backgroundImage: `linear-gradient(to bottom, rgb(0 0 0 / 0.7), rgb(0 0 0 / 0.3)), url(${BACKGROUND_IMAGE_URL})`,
      }}
    >
      <div className='w-[450px] bg-black/75 px-12 py-10'>
        <h1 className='text-3xl font-medium text-white'>Sign Up</h1>

        <form className='mt-8 flex flex-col gap-7'>
          <div>
            <input
              className='w-full bg-input-black h-12 px-4 text-white rounded placeholder:text-gray-400 focus:outline-0'
              type='email'
              name='email'
              placeholder='Email or phone number'
            />
            <p className='mt-2 text-sm text-amber-500'>
              Please enter a valid email address or phone number.
            </p>
          </div>

          <div>
            <input
              className='w-full bg-input-black h-12 px-4 text-white rounded placeholder:text-gray-400 focus:outline-0'
              type='password'
              name='password'
              placeholder='Password'
            />
            <p className='mt-2 text-sm text-amber-500'>
              Your password must contain between 4 and 60 characters.
            </p>
          </div>

          <div>
            <input
              className='w-full bg-input-black h-12 px-4 text-white rounded placeholder:text-gray-400 focus:outline-0'
              type='password'
              name='confirmPassword'
              placeholder='Confirm Password'
            />
            <p className='mt-2 text-sm text-amber-500'>
              Your password must contain between 4 and 60 characters.
            </p>
          </div>

          <button className='h-12 bg-button-red text-white font-medium rounded' type='button'>
            Sign In
          </button>
        </form>

        <p className='mt-7 text-gray-400'>
          Already signed up?{' '}
          <Link className='text-white' to='/'>
            Sign in
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Signup;
