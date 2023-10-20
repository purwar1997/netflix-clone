import { useState } from 'react';

const InputControl = ({ inputLabel, inputType, inputId, inputName, inputValue, handleChange }) => {
  const [inputFocus, setInputFocus] = useState(false);

  const toggleInputFocus = () => setInputFocus(!inputFocus);

  return (
    <div className='relative'>
      <label
        className={`h-14 px-4 absolute top-0 left-0 flex items-center text-gray-400 cursor-text transition-all ${
          (inputFocus || inputValue) && 'text-xs -top-3 pointer-events-none'
        }`}
        htmlFor={inputId}
      >
        {inputLabel}
      </label>

      <input
        className='w-full bg-input-black h-14 px-4 pt-6 pb-1 text-white rounded outline-0'
        type={inputType}
        id={inputId}
        name={inputName}
        value={inputValue}
        onChange={handleChange}
        onFocus={toggleInputFocus}
        onBlur={toggleInputFocus}
      />

      <p className='mt-2 text-sm text-amber-500'>
        Please enter a valid email address or phone number.
      </p>
    </div>
  );
};

export default InputControl;
