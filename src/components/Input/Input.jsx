import React, { useId } from 'react';
import './Input.css';

/**
 * Smit-Prajapati Inspired Pill Input Component
 * 
 * Luxury Real Estate Features:
 * - Rounded pill silhouette (border-radius: 9999px)
 * - Layered warm ivory gradient (#F7F5F0 to #FFFFFF)
 * - Subtle powder-blue border (#C4DAE8)
 * - Rich chocolate-brown typography (#432F2E)
 * - Ambient drop-shadow elevation
 * - Accessible error messaging with aria-invalid and aria-describedby
 */
export default function Input({
  id: customId,
  name,
  label,
  type = 'text',
  value,
  defaultValue,
  placeholder,
  onChange,
  onFocus,
  onBlur,
  error,
  helperText,
  required = false,
  disabled = false,
  size = 'md',
  className = '',
  inputClassName = '',
  autoComplete,
  min,
  max,
  step,
  'aria-label': ariaLabel,
  ...rest
}) {
  const generatedId = useId();
  const inputId = customId || `hk-input-${generatedId}`;
  const errorId = `${inputId}-error`;
  const helperId = `${inputId}-helper`;

  const isError = Boolean(error);
  const sizeClass = size === 'compact' ? 'hk-input--compact' : size === 'lg' ? 'hk-input--lg' : '';

  return (
    <div className={`hk-field-group ${className}`}>
      {label && (
        <label htmlFor={inputId} className="hk-field-label">
          <span>{label}</span>
          {required && <span className="hk-field-label__required" aria-hidden="true">*</span>}
        </label>
      )}

      <div className="hk-input-wrapper">
        <input
          id={inputId}
          name={name}
          type={type}
          value={value}
          defaultValue={defaultValue}
          placeholder={placeholder}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          required={required}
          disabled={disabled}
          autoComplete={autoComplete}
          min={min}
          max={max}
          step={step}
          aria-label={ariaLabel || label}
          aria-invalid={isError ? 'true' : 'false'}
          aria-describedby={
            isError ? errorId : helperText ? helperId : undefined
          }
          className={`hk-input ${sizeClass} ${isError ? 'hk-input--error' : ''} ${inputClassName}`}
          {...rest}
        />
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

      {!isError && helperText && (
        <p id={helperId} className="hk-field-helper" style={{ fontSize: '0.775rem', color: '#705352', margin: '0.25rem 0 0 0.75rem' }}>
          {helperText}
        </p>
      )}
    </div>
  );
}
