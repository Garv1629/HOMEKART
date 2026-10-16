import React, { useId } from 'react';
import './Input.css';

/**
 * Smit-Prajapati Inspired Pill Select Dropdown Component
 */
export default function Select({
  id: customId,
  name,
  label,
  value,
  defaultValue,
  onChange,
  onFocus,
  onBlur,
  options = [],
  children,
  error,
  helperText,
  required = false,
  disabled = false,
  size = 'md',
  className = '',
  selectClassName = '',
  'aria-label': ariaLabel,
  ...rest
}) {
  const generatedId = useId();
  const selectId = customId || `hk-select-${generatedId}`;
  const errorId = `${selectId}-error`;
  const helperId = `${selectId}-helper`;

  const isError = Boolean(error);
  const sizeClass = size === 'compact' ? 'hk-select--compact' : size === 'lg' ? 'hk-select--lg' : '';

  return (
    <div className={`hk-field-group ${className}`}>
      {label && (
        <label htmlFor={selectId} className="hk-field-label">
          <span>{label}</span>
          {required && <span className="hk-field-label__required" aria-hidden="true">*</span>}
        </label>
      )}

      <div className="hk-input-wrapper">
        <select
          id={selectId}
          name={name}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          required={required}
          disabled={disabled}
          aria-label={ariaLabel || label}
          aria-invalid={isError ? 'true' : 'false'}
          aria-describedby={isError ? errorId : helperText ? helperId : undefined}
          className={`hk-select ${sizeClass} ${isError ? 'hk-select--error' : ''} ${selectClassName}`}
          {...rest}
        >
          {children || options.map((opt) => {
            const val = typeof opt === 'object' ? opt.value : opt;
            const text = typeof opt === 'object' ? opt.label : opt;
            return (
              <option key={val} value={val}>
                {text}
              </option>
            );
          })}
        </select>
      </div>

      {isError && (
        <div id={errorId} className="hk-input-error-msg" role="alert">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
