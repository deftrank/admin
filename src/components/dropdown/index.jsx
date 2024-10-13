// @ts-nocheck
import React from "react";

const DeftSelect = ({
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
  return (
    <>
      <label className="form-label" htmlFor="country">
        {label}
      </label>
      <select id="country" className="select2 form-select">
        <option value="">Select</option>
        {options?.map((item) => (
          <option value={item.value}>{item.label}</option>
        ))}
      </select>
    </>
  );
};

export default DeftSelect;
