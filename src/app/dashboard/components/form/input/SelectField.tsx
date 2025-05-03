import { CategoryType } from "@/utils/context/DashboardContext";
import React from "react";
export interface SelectFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  id?: string;
  selectedCategory: string;
  handleChange: (value: string) => void;
  options: CategoryType[];
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  error,
  id,
  options,
  selectedCategory,
  handleChange,
}) => {
  console.log(options);
  return (
    <>
      {label && (
        <label htmlFor={id} className='text-gray-700'>
          {label}
        </label>
      )}
      <select
        className='border border-gray-300 p-2 rounded text-black'
        value={selectedCategory}
        onChange={(e) => handleChange(e.target.value)}
      >
        {options.map((category) => (
          <option key={category._id} value={category._id}>
            {category.name}
          </option>
        ))}
      </select>
    </>
  );
};

export default SelectField;
