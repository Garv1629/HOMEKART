import React from 'react';
import './CardCorners.css';

/**
 * Smit-Prajapati Layered Glass Corner Panels Component
 *
 * Implements the Uiverse.io by Smit-Prajapati animation:
 * - 4 staggered expanding corner panels (.hk-corner-box--1 to 4) with organic fluid radii
 * - Translucent glass surfaces (backdrop-filter blur, brand border highlights, multi-stop shadow)
 * - Restrained palette: Chocolate Brown #432F2E, Powder Blue #C4DAE8, Butter Yellow #FEEFB8, Warm Ivory #F7F5F0
 * - Non-intrusive backdrop (pointer-events: none) preserving legibility of real-estate information
 */
export default function CardCorners({ className = '' }) {
  return (
    <div className={`hk-card-corners ${className}`} aria-hidden="true">
      <div className="hk-corner-box hk-corner-box--1">
        <span className="hk-corner-box__emblem">✦</span>
      </div>
      <div className="hk-corner-box hk-corner-box--2" />
      <div className="hk-corner-box hk-corner-box--3" />
      <div className="hk-corner-box hk-corner-box--4" />
      <div className="hk-corner-accent-tr" />
    </div>
  );
}
