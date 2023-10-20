import { useState } from 'react';

const InputControl = ({ inputLabel, inputType, inputId, inputName, inputValue, handleChange }) => {
  const [inputFocus, setInputFocus] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const toggleInputFocus = () => setInputFocus(!inputFocus);

  return (
    <div className='relative'>
      <label
        className={`h-14 px-4 absolute left-0 flex items-center text-gray-400 cursor-text transition-all ${
          inputFocus || inputValue ? 'text-xs -top-3 pointer-events-none' : 'top-0'
        }`}
        htmlFor={inputId}
      >
        {inputLabel}
      </label>

      <div className='flex'>
        <input
          className={`flex-1 bg-input-black h-14 pt-6 pb-1 text-white outline-0 ${
            inputType === 'password' && inputValue ? 'rounded-l pl-4' : 'rounded px-4'
          }`}
          type={showPassword ? 'text' : inputType}
          id={inputId}
          name={inputName}
          value={inputValue}
          onChange={handleChange}
          onFocus={toggleInputFocus}
          onBlur={toggleInputFocus}
        />

        {inputType === 'password' && inputValue && (
          <span
            className='h-14 px-4 flex items-center bg-input-black text-gray-400 rounded-r cursor-pointer'
            title={showPassword ? 'Hide Password' : 'Show Password'}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? 'Hide' : 'Show'}
          </span>
        )}
      </div>

      <p className='mt-2 text-sm text-amber-500'>
        Please enter a valid email address or phone number.
      </p>
    </div>
  );
};

export default InputControl;
