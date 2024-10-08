import { Button } from "react-bootstrap";

export default function DeftButton(props) {
  const { btnName, btnClass, onClick, style, height, color } = props;
  return (
    <>
      <button
        style={{
          ...style,
          // minWidth: '120px',
          height: height ? height : 60,
          // color: color ? color : "white",
        }}
        onClick={onClick}
        className={`d-flex align-items-center justify-content-center btn-custom btn-primary  btn  ${btnClass}`}
      >
        {btnName}
      </button>
    </>
  );
}
