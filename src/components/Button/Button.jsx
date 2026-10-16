import React, { forwardRef } from 'react';
import { Link } from 'react-router-dom';

/**
 * Homekart Realty Reusable Button Component
 *
 * Implements the Uiverse.io cssbuttons-io skew-slide hover animation
 * adapted to the Homekart luxury brand palette:
 * - Chocolate Brown: #432F2E (Primary base)
 * - Butter Yellow:   #FEEFB8
 * - Powder Blue:     #C4DAE8
 * - Warm Ivory:      #F7F5F0
 *
 * Supports rendering as:
 * - <button> (default)
 * - <Link> (when `to` prop is provided)
 * - <a> (when `href` prop is provided)
 */
const Button = forwardRef(function Button(
  {
    as,
    to,
    href,
    variant = 'primary', // 'primary' | 'secondary' | 'butter' | 'powder' | 'accent' | 'whatsapp' | 'ghost'
    size = 'default',     // 'default' | 'small' | 'large' | 'icon'
    className = '',
    children,
    disabled = false,
    loading = false,
    icon = null,
    iconPosition = 'right', // 'left' | 'right'
    type = 'button',
    onClick,
    ...rest
  },
  ref
) {
  // Construct CSS class names
  const classes = [
    'hk-btn',
    'cssbuttons-io', // Uiverse.io compatibility class
    `hk-btn--${variant}`,
    size !== 'default' ? `hk-btn--${size}` : '',
    loading ? 'hk-btn--loading' : '',
    disabled ? 'hk-btn--disabled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // Internal content structure ensuring text & icons sit above the skewed overlay
  const content = (
    <span className="hk-btn__content">
      {loading && <span className="hk-btn__spinner" aria-hidden="true" />}
      {!loading && icon && iconPosition === 'left' && (
        <span className="hk-btn__icon hk-btn__icon--left" aria-hidden="true">
          {icon}
        </span>
      )}
      <span className="hk-btn__label">{children}</span>
      {!loading && icon && iconPosition === 'right' && (
        <span className="hk-btn__icon hk-btn__icon--right" aria-hidden="true">
          {icon}
        </span>
      )}
    </span>
  );

  // 1. Render as react-router-dom <Link>
  if (to && !disabled) {
    return (
      <Link
        ref={ref}
        to={to}
        className={classes}
        onClick={onClick}
        {...rest}
      >
        {content}
      </Link>
    );
  }

  // 2. Render as standard anchor <a>
  if (href && !disabled) {
    return (
      <a
        ref={ref}
        href={href}
        className={classes}
        onClick={onClick}
        {...rest}
      >
        {content}
      </a>
    );
  }

  // 3. Render as native <button>
  return (
    <button
      ref={ref}
      type={type}
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading}
      aria-disabled={disabled || loading}
      onClick={onClick}
      {...rest}
    >
      {content}
    </button>
  );
});

export default Button;
export { Button };
