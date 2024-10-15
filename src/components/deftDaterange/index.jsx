// @ts-nocheck
// // @ts-nocheck
// import { Form, InputGroup } from "react-bootstrap";

import { useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // Include styles
import "react-date-range/dist/theme/default.css"; // Include theme
import DeftInput from "../deftInput/deftInput";

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

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [open, setOpen] = useState(false);
  const [displayedValue, setDisplayedValue] = useState(placeholder); // State for input value

  const handleSelect = (ranges) => {
    setState([ranges.selection]);
    setDisplayedValue(
      `${ranges.selection.startDate.toLocaleDateString()} - ${ranges.selection.endDate.toLocaleDateString()}`
    );
  };

  const toggleCalendar = () => {
    setOpen(!open);
    if (!open) {
      // Reset displayed value if calendar is opened
      setDisplayedValue(placeholder);
    }
  };

  const handleConfirm = () => {
    setOpen(false);
    onchange(state);
  };

  return (
    <>
      <div style={{ position: "relative" }}>
        <DeftInput
          placeholder={placeholder}
          type="text"
          value={displayedValue} // Use displayedValue state
          readOnly
          onClick={toggleCalendar}
        />
        {open && (
          <div style={{ position: "absolute", zIndex: 1000 }}>
            <DateRange
              ranges={state}
              onChange={handleSelect}
              moveRangeOnFirstSelection={false}
              editableDateInputs={true}
            />
            <div
              className="card p-2 text-end"
              onClick={handleConfirm} // Call handleConfirm on click
            >
              OK
            </div>
          </div>
        )}
        {open && (
          <div>
            <h4>Selected Range:</h4>
            <p>
              Start: {state[0].startDate.toLocaleDateString()} <br />
              End: {state[0].endDate.toLocaleDateString()}
            </p>
          </div>
        )}
      </div>
    </>
  );
}
