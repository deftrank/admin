// @ts-nocheck
import { Form, InputGroup } from "react-bootstrap";

export default function DeftInput(props) {
  const {
    value,
    onchange,
    error,
    placeholder,
    type,
    readOnly,
    onKeyUp,
    inputGroupText,
    inputGroupTextClick,
  } = props;
  return (
    <>
      {inputGroupText ? (
        <>
          <InputGroup className="mb-3">
            <Form.Control
              style={{ height: "48px" }}
              type={type}
              placeholder={placeholder}
              className="rounded-2"
              name="email"
              value={value}
              onKeyUp={(e) => {
                onKeyUp(e.target.value);
              }}
              onChange={(e) => {
                onchange(e.target.value);
              }}
              readOnly={readOnly}
            />
            <InputGroup.Text id="basic-addon2" onClick={inputGroupTextClick}>
              {inputGroupText}
            </InputGroup.Text>
          </InputGroup>
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
        <Form.Group className="">
          <Form.Control
            style={{ height: "48px" }}
            type={type}
            placeholder={placeholder}
            className="rounded-2"
            name="email"
            value={value}
            onChange={(e) => {
              onchange(e.target.value);
            }}
            readOnly={readOnly}
          />
          {error && (
            <div
              className="text-danger font-size-14"
              style={{ fontWeight: 400 }}
            >
              {error}
            </div>
          )}
        </Form.Group>
      )}
    </>
  );
}
