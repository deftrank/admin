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
    // onKeyUp,
    inputGroupText,
    inputGroupTextClick,
    name,
    autoFocus,
    id,
    label,
  } = props;
  return (
    <>
      {inputGroupText ? (
        <>
          {label ? (
            <label htmlFor="email" className="form-label">
              {label}
            </label>
          ) : (
            ""
          )}
          <div className="input-group">
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
              // onKeyUp={(e) => {
              //   onKeyUp(e.target.value);
              // }}
            />
            <span className="input-group-text" id="basic-addon13">
              {inputGroupText}
            </span>
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
      ) : (
        <>
          <label htmlFor="email" className="form-label">
            {label}
          </label>
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
            // onKeyUp={(e) => {
            //   onKeyUp(e.target.value);
            // }}
          />
          {error && (
            <div
              className="text-danger font-size-14"
              style={{ fontWeight: 400 }}
            >
              {error}
            </div>
          )}
        </>
      )}
    </>
  );
}
