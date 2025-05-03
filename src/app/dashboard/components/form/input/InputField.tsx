import React from "react";

export interface InputFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  id?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  error,
  id,
  ...props
}) => {
  return (
    <>
      {label && (
        <label htmlFor={id} className='text-gray-700'>
          {label}
        </label>
      )}
      <input
        id={id}
        className='border border-gray-300 p-2 rounded text-black'
        {...props}
      />
      {error && <p className='text-red-500'>{error}</p>}
    </>
  );
};

export default InputField;
