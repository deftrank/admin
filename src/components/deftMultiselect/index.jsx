import React from "react";
import Select from "react-dropdown-select";

const index = ({
  options,
  value,
  onChange,
  placeholder,
  multi,
  dropdownHeight = "200px",
  className = "",
  label,
  error,
  closeOnSelect,
  ...props
}) => {
  const handleChange = (selectedValues) => {
    if (selectedValues.length <= 3) {
      onChange(selectedValues);
    } else {
      onChange(selectedValues.slice(0, 3));
    }
  };

  // Disable options if max selections are reached
  const updatedOptions = options?.map((option) => ({
    ...option,
    disabled:
      value &&
      value?.length >= 6 &&
      !value.some((v) => v?.value === option?.value),
  }));

  return (
    <div className="">
      <Select
        className={`rounded shadow-none py-1 select-height ${className}`}
        options={updatedOptions}
        values={value ? value : []}
        onChange={handleChange}
        multi={multi}
        placeholder={placeholder}
        keepSelectedInList={true}
        dropdownHeight={dropdownHeight}
        {...props}
      />
      {error && (
        <div className="text-danger font-size-14" style={{ fontWeight: 400 }}>
          {error}
        </div>
      )}
    </div>
  );
};

export default index;
