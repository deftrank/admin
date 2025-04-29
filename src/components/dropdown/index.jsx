// @ts-nocheck
import { Form } from "react-bootstrap";

const DeftSelect = ({
  options,
  value,
  onChange,
  placeholder,
  className = "",
  label,
  error,
  disabled,
  ...props
}) => {
  return (
    <>
      <label className="form-label" htmlFor="country">
        {label}
      </label>
      <Form.Select
        disabled={disabled}
        className="select2 form-select"
        value={value} // Control the select value
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="" disabled selected={value == undefined || null || ""}>
          {placeholder}
        </option>
        {options?.map((item) => (
          <option value={item.value}>{item.label}</option>
        ))}
      </Form.Select>
      {error && (
        <div className="text-danger font-size-14" style={{ fontWeight: 400 }}>
          {error}
        </div>
      )}
    </>
  );
};

export default DeftSelect;
