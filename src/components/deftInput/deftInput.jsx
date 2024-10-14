// @ts-nocheck
// // @ts-nocheck
// import { Form, InputGroup } from "react-bootstrap";

export default function DeftInput(props) {
  const {
    value,
    onchange,
    error,
    placeholder,
    type,
    readOnly,
    leftIcon,
    leftIconClick,
    rightIcon,
    rightIconClick,
    name,
    autoFocus,
    id,
    label,
  } = props;
  return (
    <>
      {label && (
        <label htmlFor="email" className="form-label">
          {label}
        </label>
      )}
      <div className="input-group">
        {leftIcon && <span
          className="input-group-text"
          onClick={leftIconClick}
        >
          {leftIcon}
        </span>}
        <input
          type={type}
          className="form-control"
          id={id}
          value={value}
          onChange={(e) => {
            onchange(e.target.value);
          }}
          name={name}
          placeholder={placeholder}
          autoFocus={autoFocus}
          readOnly={readOnly}
        />
        {rightIcon &&   <span
          className="input-group-text"
          onClick={rightIconClick}
        >
          {rightIcon}
        </span>}
      
      </div>
      {error && (
        <div
          className="text-danger font-size-14"
          style={{ fontWeight: 400 }}
        >
          {error}
        </div>
      )}

    </>
  );
}
