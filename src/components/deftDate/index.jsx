// @ts-nocheck
// // @ts-nocheck
// import { Form, InputGroup } from "react-bootstrap";

export default function index(props) {
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
      {/* {label && (
        <label htmlFor="email" className="form-label">
          {label}
        </label>
      )} */}
      {label && (
        <label htmlFor="html5-date-input" className="col-md-2 col-form-label">
          {label}
        </label>
      )}
      <div className="col-md-10">
        <input
          className="form-control"
          type="date"
          value={value}
          id="html5-date-input"
          onchange={(e) => {
            console.log("e == ", e);
          }}
        />
      </div>
      {error && (
        <div className="text-danger font-size-14" style={{ fontWeight: 400 }}>
          {error}
        </div>
      )}
    </>
  );
}
