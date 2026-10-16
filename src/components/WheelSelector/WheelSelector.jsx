import React, { useId, useMemo } from 'react';
import { properties as defaultProperties } from '../../data/properties';
import './WheelSelector.css';

/**
 * Homekart Realty — Minimal Floating Property Filter Card
 *
 * Compact luxury filter card replacing the circular dial:
 * - Small "FIND YOUR PROPERTY" editorial label
 * - Four sleek filters: ALL, BUY, RENT, COMMERCIAL
 * - Chocolate brown (#432F2E) active state with warm ivory (#F7F5F0) text
 * - Subtle border (#C4DAE8) and ambient butter-yellow (#FEEFB8) inset glow
 * - Compact footer showing selected category description & live dynamic property count
 * - Accessible keyboard navigation, visible focus, aria-pressed, and reduced-motion support
 */
const FILTER_OPTIONS = [
  { value: 'All', label: 'ALL', desc: 'All Residences & Commercial Portfolios' },
  { value: 'For Sale', label: 'BUY', desc: 'Private Residences & Penthouses' },
  { value: 'For Rent', label: 'RENT', desc: 'Curated Luxury Leases & Estates' },
  { value: 'Commercial', label: 'COMMERCIAL', desc: 'Grade-A Executive Commercial Suites' },
];

export default function WheelSelector({
  value = 'All',
  onChange,
  id: customId,
  label = 'Find your property acquisition portfolio',
  className = '',
  properties = defaultProperties,
  filteredCount,
}) {
  const generatedId = useId();
  const selectorId = customId || `hk-filter-${generatedId}`;

  // Find active option
  const activeIndex = useMemo(() => {
    const idx = FILTER_OPTIONS.findIndex(opt => opt.value === value);
    return idx !== -1 ? idx : 0;
  }, [value]);

  const activeOption = FILTER_OPTIONS[activeIndex] || FILTER_OPTIONS[0];

  // Live dynamic property counts calculated from real dataset
  const categoryCounts = useMemo(() => {
    const propList = properties || [];
    return {
      'All': propList.length,
      'For Sale': propList.filter(p => p.status === 'For Sale').length,
      'For Rent': propList.filter(p => p.status === 'For Rent').length,
      'Commercial': propList.filter(p => p.status === 'Commercial' || p.type === 'Commercial' || /commercial|office|headquarters/i.test(p.title + ' ' + p.description)).length,
    };
  }, [properties]);

  const liveCategoryCount = categoryCounts[activeOption.value] ?? 0;
  const displayCount = filteredCount !== undefined ? filteredCount : liveCategoryCount;

  const handleSelect = (modeValue) => {
    if (onChange && modeValue !== value) {
      onChange(modeValue);
    }
  };

  const handleKeyDown = (e, currentIndex) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const nextIdx = (currentIndex + 1) % FILTER_OPTIONS.length;
      handleSelect(FILTER_OPTIONS[nextIdx].value);
      const nextBtn = document.getElementById(`${selectorId}-opt-${FILTER_OPTIONS[nextIdx].label.toLowerCase()}`);
      if (nextBtn) nextBtn.focus();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prevIdx = (currentIndex - 1 + FILTER_OPTIONS.length) % FILTER_OPTIONS.length;
      handleSelect(FILTER_OPTIONS[prevIdx].value);
      const prevBtn = document.getElementById(`${selectorId}-opt-${FILTER_OPTIONS[prevIdx].label.toLowerCase()}`);
      if (prevBtn) prevBtn.focus();
    }
  };

  return (
    <div
      className={`hk-minimal-filter-card ${className}`}
      id={selectorId}
      role="region"
      aria-label={label}
    >
      {/* ── 1. Minimal Editorial Header ── */}
      <div className="hk-minimal-filter__header">
        <span className="hk-minimal-filter__label">
          <span className="hk-minimal-filter__sparkle" aria-hidden="true">✦</span>
          <span>FIND YOUR PROPERTY</span>
        </span>
        <span className="hk-minimal-filter__mode-indicator">
          <span className="hk-minimal-filter__pulse-dot" aria-hidden="true" />
          <span>Acquisition Mode</span>
        </span>
      </div>

      {/* ── 2. Four Filters Row: ALL, BUY, RENT, COMMERCIAL ── */}
      <div
        className="hk-minimal-filter__options"
        role="group"
        aria-label="Property acquisition mode filters"
      >
        {FILTER_OPTIONS.map((item, idx) => {
          const isActive = item.value === value;
          const count = categoryCounts[item.value] ?? 0;
          return (
            <button
              key={item.value}
              type="button"
              id={`${selectorId}-opt-${item.label.toLowerCase()}`}
              className={`hk-minimal-filter__btn ${isActive ? 'hk-minimal-filter__btn--active' : ''}`}
              aria-pressed={isActive}
              onClick={() => handleSelect(item.value)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              title={`Filter by ${item.label} (${count} in portfolio)`}
            >
              <span className="hk-minimal-filter__btn-text">{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* ── 3. Compact Footer: Selected Category & Live Property Count ── */}
      <div className="hk-minimal-filter__footer" aria-live="polite">
        <span className="hk-minimal-filter__footer-cat">
          <span className="hk-minimal-filter__cat-bullet" aria-hidden="true">✦</span>
          <span>{activeOption.desc}</span>
        </span>
        <span className="hk-minimal-filter__footer-count">
          <strong className="hk-minimal-filter__count-num">{displayCount}</strong>
          <span>{displayCount === 1 ? 'Property Available' : 'Properties Available'}</span>
        </span>
      </div>
    </div>
  );
}

// Named alias for convenience
export { WheelSelector as MinimalPropertyFilterCard };
