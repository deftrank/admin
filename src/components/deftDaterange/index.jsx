import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import DeftInput from "../deftInput/deftInput";

const EMPTY_SELECTION = {
  startDate: null,
  endDate: null,
  key: "selection",
};

const formatDisplayValue = (selection, placeholder) => {
  if (!selection?.startDate) return placeholder;

  const start = selection.startDate.toLocaleDateString();
  const end = selection.endDate?.toLocaleDateString();

  if (!selection?.endDate || start === end) {
    return start;
  }

  return `${start} - ${end}`;
};

const isSameDay = (firstDate, secondDate) => {
  if (!firstDate || !secondDate) return false;
  return firstDate.toDateString() === secondDate.toDateString();
};

export default function DeftDateRange(props) {
  const {
    onchange,
    placeholder,
    value,
    leftIcon,
    allowSingleDate = true,
  } = props;

  const initialSelection = useMemo(() => {
    if (Array.isArray(value) && value[0]) {
      return {
        startDate: value[0]?.startDate || null,
        endDate: value[0]?.endDate || null,
        key: "selection",
      };
    }

    return EMPTY_SELECTION;
  }, [value]);

  const [state, setState] = useState([initialSelection]);
  const [open, setOpen] = useState(false);
  const [selectionMode, setSelectionMode] = useState("range");
  const [displayedValue, setDisplayedValue] = useState(
    formatDisplayValue(initialSelection, placeholder)
  );
  const [popupPosition, setPopupPosition] = useState({});
  const wrapperRef = useRef(null);

  const updatePopupPosition = useCallback(() => {
    if (!wrapperRef.current) return;

    const rect = wrapperRef.current.getBoundingClientRect();
    const viewportPadding = 12;
    const popupWidth = Math.min(664, window.innerWidth - viewportPadding * 2);
    const left = Math.min(
      Math.max(rect.left, viewportPadding),
      window.innerWidth - popupWidth - viewportPadding
    );
    const bottomSpace = window.innerHeight - rect.bottom - viewportPadding;
    const topSpace = rect.top - viewportPadding;
    const openUp = bottomSpace < 520 && topSpace > bottomSpace;
    const availableHeight = Math.max(320, openUp ? topSpace : bottomSpace);

    setPopupPosition({
      left,
      width: popupWidth,
      maxHeight: availableHeight,
      ...(openUp
        ? { bottom: window.innerHeight - rect.top + 4 }
        : { top: rect.bottom + 4 }),
    });
  }, []);

  useEffect(() => {
    setState([initialSelection]);
    setDisplayedValue(formatDisplayValue(initialSelection, placeholder));

    if (
      initialSelection?.startDate &&
      initialSelection?.endDate &&
      initialSelection.startDate.toDateString() ===
        initialSelection.endDate.toDateString()
    ) {
      setSelectionMode("single");
    }
  }, [initialSelection, placeholder]);

  useEffect(() => {
    if (!open) return;

    updatePopupPosition();
    window.addEventListener("resize", updatePopupPosition);
    window.addEventListener("scroll", updatePopupPosition, true);

    return () => {
      window.removeEventListener("resize", updatePopupPosition);
      window.removeEventListener("scroll", updatePopupPosition, true);
    };
  }, [open, updatePopupPosition]);

  const updateSelection = (selection) => {
    setState([selection]);
    setDisplayedValue(formatDisplayValue(selection, placeholder));
  };

  const handleSelect = (ranges) => {
    const nextSelection = ranges.selection;

    if (selectionMode === "single") {
      const currentDate = state[0]?.startDate;
      const hasEndChanged =
        nextSelection.endDate && !isSameDay(nextSelection.endDate, currentDate);
      const selectedDate = hasEndChanged
        ? nextSelection.endDate
        : nextSelection.startDate;

      const singleSelection = {
        startDate: selectedDate,
        endDate: selectedDate,
        key: "selection",
      };
      updateSelection(singleSelection);
      return;
    }

    updateSelection({
      startDate: nextSelection.startDate,
      endDate: nextSelection.endDate,
      key: "selection",
    });
  };

  const handleConfirm = () => {
    setOpen(false);
    onchange(state);
  };

  const handleClear = () => {
    updateSelection(EMPTY_SELECTION);
    onchange([EMPTY_SELECTION]);
    setOpen(false);
  };

  return (
    <div ref={wrapperRef} style={{ position: "relative" }}>
      <DeftInput
        placeholder={placeholder}
        type="text"
        value={displayedValue}
        readOnly
        onClick={() => setOpen((prev) => !prev)}
        leftIcon={leftIcon}
      />
      {open && (
        <div
          style={{
            position: "fixed",
            zIndex: 1000,
            boxShadow: "0 12px 28px rgba(15, 23, 42, 0.16)",
            background: "#fff",
            borderRadius: 12,
            ...popupPosition,
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          {allowSingleDate && (
            <div
              className="d-flex gap-2 p-2 border-bottom"
              style={{ background: "#fff" }}
            >
              <button
                type="button"
                className={`btn btn-sm ${
                  selectionMode === "range" ? "btn-primary" : "btn-outline-primary"
                }`}
                onClick={() => setSelectionMode("range")}
              >
                Date Range
              </button>
              <button
                type="button"
                className={`btn btn-sm ${
                  selectionMode === "single" ? "btn-primary" : "btn-outline-primary"
                }`}
                onClick={() => {
                  setSelectionMode("single");
                  const activeStart = state[0]?.startDate;
                  if (activeStart) {
                    updateSelection({
                      startDate: activeStart,
                      endDate: activeStart,
                      key: "selection",
                    });
                  }
                }}
              >
                Single Date
              </button>
            </div>
          )}
          <DateRange
            ranges={state}
            onChange={handleSelect}
            moveRangeOnFirstSelection={selectionMode === "single"}
            editableDateInputs={true}
            rangeColors={["#0b0b7c"]}
          />
          <div
            className="row"
            style={{
              background: "#fff",
              width: "100%",
              marginLeft: "0rem",
              position: "sticky",
              bottom: 0,
              zIndex: 1,
              borderTop: "1px solid #edf2f7",
            }}
          >
            <div
              className="p-2 text-end col-6"
              style={{ cursor: "pointer", fontWeight: "600" }}
              onClick={handleClear}
            >
              Clear
            </div>
            <div
              className="p-2 col-6"
              style={{ cursor: "pointer", fontWeight: "600" }}
              onClick={handleConfirm}
            >
              Apply
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
