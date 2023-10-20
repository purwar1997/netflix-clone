import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BACKGROUND_IMAGE_URL } from '../utils/constants';
import InputControl from './InputControl';

const Login = () => {
  const [user, setUser] = useState({ email: '', password: '' });

  const handleChange = event => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const inputFields = [
    {
      label: 'Email address',
      type: 'email',
      id: 'email',
      name: 'email',
      value: user.email,
    },
    {
      label: 'Password',
      type: 'password',
      id: 'password',
      name: 'password',
      value: user.password,
    },
  ];

  const login = () => {};

  return (
    <section
      className='h-screen bg-cover bg-center bg-no-repeat flex justify-center items-center'
      style={{
        backgroundImage: `linear-gradient(to bottom, rgb(0 0 0 / 0.7), rgb(0 0 0 / 0.3)), url(${BACKGROUND_IMAGE_URL})`,
      }}
    >
      <div className='w-[450px] bg-black/75 px-12 py-10'>
        <h1 className='text-3xl font-medium text-white'>Sign In</h1>

        <form className='mt-8 flex flex-col gap-7'>
          {inputFields.map((input, index) => (
            <InputControl
              key={index}
              inputLabel={input.label}
              inputType={input.type}
              inputId={input.id}
              inputName={input.name}
              inputValue={input.value}
              handleChange={handleChange}
            />
          ))}

          <button
            className='h-12 bg-button-red text-white font-medium rounded'
            type='button'
            onClick={login}
          >
            Sign In
          </button>
        </form>

        <p className='mt-7 text-gray-400'>
          New to Netflix?{' '}
          <Link className='text-white hover:underline' to='/signup'>
            Sign up now
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
