import React, { useId, useState } from 'react';
import './AnimatedForm.css';

/**
 * ammarsaa-Inspired Floating Label Input Field
 * 
 * Features:
 * - Smooth upward label glide on focus or when populated
 * - Works with text, email, tel, date, select, and textarea
 * - Fully accessible with aria-invalid, aria-describedby, and unique IDs
 * - Distinct error state with terracotta indicator
 */
export default function FloatingField({
  id: customId,
  name,
  label,
  type = 'text',
  value = '',
  onChange,
  onFocus,
  onBlur,
  error,
  required = false,
  disabled = false,
  as = 'input', // 'input' | 'textarea' | 'select'
  options = [],
  rows = 3,
  className = '',
  placeholder,
  ...rest
}) {
  const generatedId = useId();
  const fieldId = customId || `hk-af-${generatedId}`;
  const errorId = `${fieldId}-error`;
  const [isFocused, setIsFocused] = useState(false);

  const hasValue = Boolean(value !== undefined && value !== null && value.toString().length > 0);
  const isError = Boolean(error);

  const handleFocus = (e) => {
    setIsFocused(true);
    if (onFocus) onFocus(e);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };

  const containerStateClass = [
    isFocused ? 'hk-animated-field--focused' : '',
    hasValue ? 'hk-animated-field--filled' : '',
    isError ? 'hk-animated-field--error' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={`hk-animated-field ${containerStateClass}`}>
      {as === 'textarea' ? (
        <textarea
          id={fieldId}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          required={required}
          rows={rows}
          placeholder=" "
          aria-invalid={isError ? 'true' : 'false'}
          aria-describedby={isError ? errorId : undefined}
          className={`hk-animated-field__textarea ${isError ? 'hk-animated-field__input--error' : ''}`}
          {...rest}
        />
      ) : as === 'select' ? (
        <select
          id={fieldId}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          required={required}
          aria-invalid={isError ? 'true' : 'false'}
          aria-describedby={isError ? errorId : undefined}
          className={`hk-animated-field__select ${isError ? 'hk-animated-field__input--error' : ''}`}
          {...rest}
        >
          {options.map((opt) => {
            const val = typeof opt === 'object' ? opt.value : opt;
            const text = typeof opt === 'object' ? opt.label : opt;
            return (
              <option key={val} value={val}>
                {text}
              </option>
            );
          })}
        </select>
      ) : (
        <input
          id={fieldId}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          required={required}
          placeholder={isFocused && placeholder ? placeholder : ' '}
          aria-invalid={isError ? 'true' : 'false'}
          aria-describedby={isError ? errorId : undefined}
          className={`hk-animated-field__input ${isError ? 'hk-animated-field__input--error' : ''}`}
          {...rest}
        />
      )}

      {/* Floating Label */}
      <label htmlFor={fieldId} className="hk-animated-field__label">
        <span>{label}</span>
        {required && <span className="hk-animated-field__required" aria-hidden="true">*</span>}
      </label>

      {/* Error Message */}
      {isError && (
        <span id={errorId} className="hk-animated-field__error-msg" role="alert">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span>{error}</span>
        </span>
      )}
    </div>
  );
}
