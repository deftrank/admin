// @ts-ignore
import React from "react";
import { Form } from "react-bootstrap";

export default function DeftInput(props) {
  const { value, onchange, error, placeholder, type, readOnly } = props;
  return (
    <>
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
          <div className="text-danger font-size-14" style={{ fontWeight: 400 }}>
            {error}
          </div>
        )}
      </Form.Group>
    </>
  );
}
