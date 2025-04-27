import { CategoryType } from "@/utils/context/DashboardContext";
import React from "react";
import Select, { SingleValue } from "react-select";

interface OptionType {
  value: string;
  label: string;
}

interface SelectFieldProps {
  label?: string;
  error?: string;
  options: CategoryType[];
  value?: string;
  onChange?: (value: string) => void;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  error,
  options,
  value,
  onChange,
}) => {
  // Map CategoryType to OptionType
  const mappedOptions: OptionType[] = options.map((opt) => ({
    value: String(opt._id), // Ensure value is a string
    label: opt.name,
  }));

  // Find the selected option based on the current value
  const selectedOption =
    mappedOptions.find((opt) => opt.value === value) || null;

  // Handle selection changes
  const handleChange = (selected: SingleValue<OptionType>) => {
    if (onChange) {
      onChange(selected ? selected.value : "");
    }
  };

  return (
    <div className='flex flex-col gap-1'>
      {label && <label className='text-gray-700'>{label}</label>}
      <Select
        options={mappedOptions}
        value={selectedOption}
        onChange={handleChange}
        isSearchable
        placeholder='Select an option...'
        className='text-black'
        classNamePrefix='react-select'
      />
      {error && <p className='text-red-500 text-sm'>{error}</p>}
    </div>
  );
};

export default SelectField;
