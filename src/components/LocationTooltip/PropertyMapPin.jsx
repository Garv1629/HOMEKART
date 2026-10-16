import React from 'react';
import LocationTooltip from './LocationTooltip';
import './LocationTooltip.css';

/**
 * PropertyMapPin
 * Interactive architectural map pin with glowing radar pulses and Amine-maker location tooltip.
 */
export default function PropertyMapPin({
  property,
  position = 'auto',
  align = 'auto',
  className = '',
  label,
}) {
  if (!property) return null;

  return (
    <LocationTooltip
      property={property}
      position={position}
      align={align}
      className={`hk-map-pin ${className}`}
    >
      <span className="hk-map-pin__btn" aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
          <circle cx="12" cy="9" r="2.5" fill="currentColor" />
        </svg>
      </span>
      {label && <span className="hk-map-pin__label">{label}</span>}
    </LocationTooltip>
  );
}
