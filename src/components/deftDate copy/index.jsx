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
      {label && (
        <label htmlFor="email" className="form-label">
          {label}
        </label>
      )}
      <div className="position-relative">
        <input
          type="text"
          className="form-control autocomplete-input"
          placeholder="Country *"
          value={formData?.countryInputText ?? formData?.country}
          onChange={handleCountryChange}
          autoComplete="off"
        />
        {countryListData?.length > 0 && (
          <div className="autocomplete-suggestions">
            {countryListData?.map((country, index) => (
              <div
                key={index}
                className="autocomplete-suggestion"
                onClick={() => handleCountrySelect(country)}
              >
                {country?.name}
              </div>
            ))}
          </div>
        )}
      </div>
      {formDataError?.country && (
        <div className="text-danger">{formDataError?.country}</div>
      )}
    </>
  );
}
