import React, { forwardRef, useId } from 'react';
import './Checkbox.css';

/**
 * Homekart Realty Reusable 3D Inset Checkbox Component
 *
 * Implements the Uiverse.io 3D soft inset-shadow checkbox with:
 * - Chocolate brown #432F2E outer container with tactile recessed bevel
 * - Butter yellow #FEEFB8 or Powder blue #C4DAE8 checked state
 * - Smooth 200ms pressed-state transition
 * - Animated icon swap (tasteful cross morphing into high-contrast checkmark)
 * - Accessible native input with keyboard focus (:focus-visible), screen readers, and touch support
 */
const Checkbox = forwardRef(function Checkbox(
  {
    id: providedId,
    name,
    value,
    checked,
    defaultChecked,
    onChange,
    label,
    description,
    variant = 'butter', // 'butter' | 'powder'
    size = 'default',   // 'default' | 'small' | 'large'
    showCross = true,
    disabled = false,
    required = false,
    dark = false,
    className = '',
    'aria-label': ariaLabel,
    'aria-describedby': ariaDescribedby,
    ...rest
  },
  ref
) {
  const generatedId = useId();
  const id = providedId || `hk-check-${generatedId.replace(/:/g, '')}`;
  const descId = description ? `${id}-desc` : undefined;

  const wrapperClasses = [
    'hk-checkbox',
    `hk-checkbox--${variant}`,
    size !== 'default' ? `hk-checkbox--${size}` : '',
    dark ? 'hk-checkbox--dark' : '',
    disabled ? 'hk-checkbox--disabled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <label htmlFor={id} className={wrapperClasses}>
      <input
        ref={ref}
        type="checkbox"
        id={id}
        name={name}
        value={value}
        checked={checked}
        defaultChecked={defaultChecked}
        onChange={onChange}
        disabled={disabled}
        required={required}
        aria-label={ariaLabel || (typeof label === 'string' ? label : undefined)}
        aria-describedby={ariaDescribedby || descId}
        className="hk-checkbox__input"
        {...rest}
      />

      <span className="hk-checkbox__box" aria-hidden="true">
        <svg
          className="hk-checkbox__icon"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {showCross && (
            <path
              className="hk-checkbox__cross"
              d="M7 7l10 10M7 17L17 7"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}
          <path
            className="hk-checkbox__check"
            d="M5 12.5l5 5L19 7"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>

      {(label || description) && (
        <span className="hk-checkbox__text">
          {label && <span className="hk-checkbox__label">{label}</span>}
          {description && (
            <span id={descId} className="hk-checkbox__desc">
              {description}
            </span>
          )}
        </span>
      )}
    </label>
  );
});

export default Checkbox;
export { Checkbox };
