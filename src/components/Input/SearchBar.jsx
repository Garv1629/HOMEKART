import React, { useId } from 'react';
import './Input.css';

/**
 * Smit-Prajapati Inspired Search Bar Component
 * 
 * Luxury Real Estate Features:
 * - Rounded pill silhouette with elegant inset and outer drop-shadows
 * - Embedded SVG magnifying glass icon in chocolate brown (#432F2E)
 * - Interactive clear button (×) when query is present
 * - High-contrast readable placeholder
 * - Smooth focus ring and border glow
 */
export default function SearchBar({
  id: customId,
  name = 'search',
  label,
  value = '',
  placeholder = 'Search by estate, metropolitan address, or architectural style…',
  onChange,
  onClear,
  onSubmit,
  size = 'md',
  className = '',
  inputClassName = '',
  autoComplete = 'off',
  'aria-label': ariaLabel,
  ...rest
}) {
  const generatedId = useId();
  const searchId = customId || `hk-search-${generatedId}`;

  const hasValue = Boolean(value && value.length > 0);
  const sizeClass = size === 'compact' ? 'hk-input--compact' : size === 'lg' ? 'hk-input--lg' : '';

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && onSubmit) {
      e.preventDefault();
      onSubmit(value);
    }
  };

  const handleClearClick = () => {
    if (onClear) {
      onClear();
    } else if (onChange) {
      onChange({ target: { value: '', name } });
    }
  };

  return (
    <div className={`hk-field-group ${className}`} role="search">
      {label && (
        <label htmlFor={searchId} className="hk-field-label">
          {label}
        </label>
      )}

      <div className="hk-search-bar">
        {/* Elegant SVG Magnifying Glass Icon */}
        <span className="hk-search-bar__icon" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </span>

        <input
          id={searchId}
          name={name}
          type="search"
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          autoComplete={autoComplete}
          aria-label={ariaLabel || label || 'Search residences'}
          className={`hk-input ${sizeClass} ${inputClassName}`}
          {...rest}
        />

        {/* Clear Button when query text is active */}
        {hasValue && (
          <button
            type="button"
            className="hk-search-bar__clear"
            onClick={handleClearClick}
            aria-label="Clear search query"
            title="Clear search"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
