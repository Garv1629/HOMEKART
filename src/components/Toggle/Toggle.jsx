import React, { forwardRef, useId } from 'react';
import './Toggle.css';

/**
 * Homekart Realty Reusable Luxury Toggle Component
 *
 * Supports:
 * - `variant="compact"` (default): Tactile capsule toggle with smooth 3D sliding thumb
 * - `variant="segmented"`: Dual-choice sliding pill toggle (e.g., Buy vs Rent, Day vs Night)
 */
const Toggle = forwardRef(function Toggle(
  {
    id: providedId,
    name,
    checked,
    defaultChecked,
    onChange,
    onToggle,
    label,
    subtext,
    labelPosition = 'right',
    variant = 'compact', // 'compact' | 'segmented'
    size = 'default', // 'default' | 'small'
    disabled = false,
    className = '',
    // Segmented / Dual mode labels
    offLabel = 'Day',
    onLabel = 'Night',
    'aria-label': ariaLabel,
    'aria-describedby': ariaDescribedby,
    ...rest
  },
  ref
) {
  const generatedId = useId();
  const id = providedId || `hk-toggle-${generatedId.replace(/:/g, '')}`;
  const subtextId = subtext ? `${id}-subtext` : undefined;

  const handleChange = (e) => {
    if (disabled) return;
    if (onChange) {
      onChange(e);
    }
    if (onToggle) {
      onToggle(e.target.checked);
    }
  };

  const wrapperClasses = [
    'hk-toggle-wrapper',
    `hk-toggle-wrapper--${variant}`,
    disabled ? 'hk-toggle-wrapper--disabled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // ── 1. Segmented Dual-Choice Switch (e.g. Buy vs Rent, Day vs Night) ──────
  if (variant === 'segmented') {
    return (
      <div className={wrapperClasses}>
        {label && labelPosition === 'left' && (
          <label htmlFor={id} className="hk-toggle-label hk-toggle-label--left">
            <span>{label}</span>
            {subtext && <span id={subtextId} className="hk-toggle-subtext">{subtext}</span>}
          </label>
        )}

        <label
          htmlFor={id}
          className={`hk-segmented-toggle ${size === 'small' ? 'hk-segmented-toggle--small' : ''}`}
          title={ariaLabel || label || `${offLabel} vs ${onLabel}`}
        >
          <input
            ref={ref}
            type="checkbox"
            id={id}
            name={name}
            checked={checked}
            defaultChecked={defaultChecked}
            onChange={handleChange}
            disabled={disabled}
            className="hk-toggle__sr-input"
            role="switch"
            aria-checked={checked}
            aria-label={ariaLabel || (typeof label === 'string' ? label : `${offLabel} or ${onLabel}`)}
            aria-describedby={subtextId || ariaDescribedby}
            {...rest}
          />
          <div className="hk-segmented-toggle__track" aria-hidden="true">
            <span className="hk-segmented-toggle__slider" />
            <span className="hk-segmented-toggle__option hk-segmented-toggle__option--first">
              {offLabel}
            </span>
            <span className="hk-segmented-toggle__option hk-segmented-toggle__option--second">
              {onLabel}
            </span>
          </div>
        </label>

        {label && labelPosition === 'right' && (
          <label htmlFor={id} className="hk-toggle-label hk-toggle-label--right">
            <span>{label}</span>
            {subtext && <span id={subtextId} className="hk-toggle-subtext">{subtext}</span>}
          </label>
        )}
      </div>
    );
  }

  // ── 2. Compact Capsule Sliding Toggle (Default) ───────────────────────────
  return (
    <div className={wrapperClasses}>
      {label && labelPosition === 'left' && (
        <label htmlFor={id} className="hk-toggle-label hk-toggle-label--left">
          <span>{label}</span>
          {subtext && <span id={subtextId} className="hk-toggle-subtext">{subtext}</span>}
        </label>
      )}

      <label
        htmlFor={id}
        className={`hk-compact-toggle ${size === 'small' ? 'hk-compact-toggle--small' : ''}`}
        title={ariaLabel || label}
      >
        <input
          ref={ref}
          type="checkbox"
          id={id}
          name={name}
          checked={checked}
          defaultChecked={defaultChecked}
          onChange={handleChange}
          disabled={disabled}
          className="hk-toggle__sr-input"
          role="switch"
          aria-checked={checked}
          aria-label={ariaLabel || (typeof label === 'string' ? label : 'Toggle switch')}
          aria-describedby={subtextId || ariaDescribedby}
          {...rest}
        />
        <div className="hk-compact-toggle__track" aria-hidden="true">
          <div className="hk-compact-toggle__thumb">
            <span className="hk-compact-toggle__thumb-dot" />
          </div>
        </div>
      </label>

      {label && labelPosition === 'right' && (
        <label htmlFor={id} className="hk-toggle-label hk-toggle-label--right">
          <span>{label}</span>
          {subtext && <span id={subtextId} className="hk-toggle-subtext">{subtext}</span>}
        </label>
      )}
    </div>
  );
});

export default Toggle;
