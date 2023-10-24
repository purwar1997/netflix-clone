import { useState, useRef } from 'react';

const FormInput = props => {
  const [inputFocus, setInputFocus] = useState(false);
  const [inputBlur, setInputBlur] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef(null);
  const showErrorRef = useRef(true);

  const { id, label, type, name, value, pattern, required, errorMessage, handleChange } = props;

  const handleFocus = () => setInputFocus(true);

  const handleBlur = () => {
    if (showErrorRef.current) {
      setInputFocus(false);
      setInputBlur(true);
    }
  };

  const handleMouseDown = () => {
    showErrorRef.current = false;
  };

  const handleClick = () => {
    setShowPassword(!showPassword);
    inputRef.current.setSelectionRange(0, 0);
    inputRef.current.focus();
    showErrorRef.current = true;
  };

  return (
    <div className='relative'>
      <label
        className={`h-14 px-4 absolute left-0 flex items-center text-gray-400 cursor-text transition-all ${
          inputFocus || value ? 'text-xs -top-3 pointer-events-none' : 'top-0'
        }`}
        htmlFor={id}
      >
        {label}
      </label>

      <div className='form-input flex'>
        <input
          className={`flex-1 bg-input-black h-14 pt-6 pb-1 text-white outline-0 ${
            type === 'password' && value ? 'rounded-l pl-4' : 'rounded px-4'
          }`}
          id={id}
          type={showPassword ? 'text' : type}
          name={name}
          value={value}
          pattern={pattern}
          required={required}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          ref={inputRef}
          blurred={inputBlur.toString()}
        />

        {type === 'password' && value && (
          <span
            className='h-14 px-4 flex items-center bg-input-black text-gray-400 rounded-r cursor-pointer'
            title={showPassword ? 'Hide Password' : 'Show Password'}
            onMouseDown={handleMouseDown}
            onClick={handleClick}
          >
            {showPassword ? 'Hide' : 'Show'}
          </span>
        )}
      </div>

      <p className='mt-2 text-sm text-amber-500 hidden'>{errorMessage}</p>
    </div>
  );
};

export default FormInput;
