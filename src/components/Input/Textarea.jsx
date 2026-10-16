import React, { useId } from 'react';
import './Input.css';

/**
 * Smit-Prajapati Inspired Rounded Textarea Component
 */
export default function Textarea({
  id: customId,
  name,
  label,
  value,
  defaultValue,
  placeholder,
  onChange,
  onFocus,
  onBlur,
  error,
  helperText,
  rows = 4,
  required = false,
  disabled = false,
  className = '',
  textareaClassName = '',
  'aria-label': ariaLabel,
  ...rest
}) {
  const generatedId = useId();
  const textareaId = customId || `hk-textarea-${generatedId}`;
  const errorId = `${textareaId}-error`;
  const helperId = `${textareaId}-helper`;

  const isError = Boolean(error);

  return (
    <div className={`hk-field-group ${className}`}>
      {label && (
        <label htmlFor={textareaId} className="hk-field-label">
          <span>{label}</span>
          {required && <span className="hk-field-label__required" aria-hidden="true">*</span>}
        </label>
      )}

      <div className="hk-input-wrapper">
        <textarea
          id={textareaId}
          name={name}
          value={value}
          defaultValue={defaultValue}
          placeholder={placeholder}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          rows={rows}
          required={required}
          disabled={disabled}
          aria-label={ariaLabel || label}
          aria-invalid={isError ? 'true' : 'false'}
          aria-describedby={isError ? errorId : helperText ? helperId : undefined}
          className={`hk-textarea ${isError ? 'hk-textarea--error' : ''} ${textareaClassName}`}
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
