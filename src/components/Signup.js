import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BACKGROUND_IMAGE_URL } from '../utils/constants';
import FormInput from './FormInput';

const Signup = () => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const inputs = [
    {
      id: 1,
      label: 'Username',
      type: 'text',
      name: 'username',
      pattern: '^[a-zA-Z0-9]{4,16}$',
      required: true,
      errorMessage:
        "Username must be 4-16 characters long and shouldn't contain special characters.",
    },
    {
      id: 2,
      label: 'Email Address',
      type: 'email',
      name: 'email',
      required: true,
      errorMessage: 'Please enter a valid email address.',
    },
    {
      id: 3,
      label: 'Password',
      type: 'password',
      name: 'password',
      pattern: '^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,60}$',
      required: true,
      errorMessage:
        'Password must be 8-60 characters long and should contain atleast one digit, one letter and one special character.',
    },
    {
      id: 4,
      label: 'Confirm Password',
      type: 'password',
      name: 'confirmPassword',
      pattern: user.password,
      required: true,
      errorMessage: "Passwords don't match.",
    },
  ];

  const handleSubmit = e => {
    e.preventDefault();

    console.log(user);
  };

  return (
    <section
      className='min-h-screen py-20 bg-cover bg-center bg-no-repeat flex justify-center items-center'
      style={{
        backgroundImage: `linear-gradient(to bottom, rgb(0 0 0 / 0.7), rgb(0 0 0 / 0.3)), url(${BACKGROUND_IMAGE_URL})`,
      }}
    >
      <div className='w-[450px] bg-black/75 px-12 py-10 rounded-md'>
        <h1 className='text-3xl font-medium text-white'>Sign Up</h1>

        <form className='mt-8 flex flex-col gap-6' onSubmit={handleSubmit}>
          {inputs.map(input => (
            <FormInput
              key={input.id}
              {...input}
              value={user[input.name]}
              handleChange={handleChange}
            />
          ))}

          <button className='h-12 bg-button-red text-white font-medium rounded'>Sign Up</button>
        </form>

        <p className='mt-7 text-gray-400'>
          Already signed up?{' '}
          <Link className='text-white hover:underline' to='/'>
            Sign in
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Signup;
