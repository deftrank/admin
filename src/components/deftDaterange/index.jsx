import { useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // Include styles
import "react-date-range/dist/theme/default.css"; // Include theme
import DeftInput from "../deftInput/deftInput";

export default function DeftDateRange({ ...props }) {
  const {
    onchange,
    placeholder,
  } = props;

  const [state, setState] = useState([
    {
      startDate: null,
      endDate: null,
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

  const handleClear = () => {
    // Reset the state and displayed value
    setState([
      {
        startDate: null,
        endDate: null,
        key: "selection",
      },
    ]);
    setDisplayedValue(placeholder);
    onchange([
      {
        startDate: null,
        endDate: null,
        key: "selection",
      },
    ]); // Notify the parent component of the cleared state
    setOpen(false);
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
          <div
            style={{
              position: "absolute",
              zIndex: 1000,
              boxShadow: "2px 2px 10px #ccc",
            }}
          >
            <DateRange
              ranges={state}
              onChange={handleSelect}
              moveRangeOnFirstSelection={false}
              editableDateInputs={true}
            />
            <div
              className="row"
              style={{ background: "#fff", width: "100%", marginLeft: "0rem" }}
            >
              <div
                className=" p-2 text-end col-6"
                style={{ cursor: "pointer" }}
                onClick={handleClear} // Call handleClear on click
              >
                Clear
              </div>
              <div
                className=" p-2 col-6 "
                style={{ cursor: "pointer" }}
                onClick={handleConfirm} // Call handleConfirm on click
              >
                OK
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
