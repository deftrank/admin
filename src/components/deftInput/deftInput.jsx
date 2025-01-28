// @ts-nocheck
export default function DeftInput(props) {
  const {
    value = "", // Ensure value is always defined
    onchange,
    error,
    placeholder,
    type, // Default type to 'text' if not provided
    readOnly,
    leftIcon,
    leftIconClick,
    rightIcon,
    rightIconClick,
    name,
    autoFocus,
    id,
    label,
    onClick,
    maxLength,
    className
  } = props;

  return (
    <>
      {label && (
        <label htmlFor={id} className="form-label">
          {label}
        </label>
      )}
      <div className={`input-group `}>
        {leftIcon && (
          <span className="input-group-text" onClick={leftIconClick}>
            {leftIcon}
          </span>
        )}
        <input
          type={type}
          className={`form-control`}
          id={id}
          value={value} // Value is always controlled
          onChange={(e) => onchange(e.target.value.trimStart())}
          name={name}
          placeholder={placeholder}
          autoFocus={autoFocus}
          readOnly={readOnly}
          onClick={onClick}
          maxLength={maxLength}
        />
        {rightIcon && (
          <span className="input-group-text cursor-pointer" onClick={rightIconClick}>
            {rightIcon}
          </span>
        )}
      </div>
      {error && (
        <div className="text-danger font-size-14" style={{ fontWeight: 400 }}>
          {error}
        </div>
      )}
    </>
  );
}
