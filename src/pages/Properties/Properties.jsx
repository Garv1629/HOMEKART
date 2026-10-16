import { useState, useMemo, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import PropertyCard from '../../components/PropertyCard/PropertyCard';
import Checkbox from '../../components/Checkbox';
import Toggle from '../../components/Toggle';
import Loader from '../../components/Loader';
import { SearchBar } from '../../components/Input';
import WheelSelector from '../../components/WheelSelector';
import { PropertyMapPin } from '../../components/LocationTooltip';
import { properties, propertyTypes, cities } from '../../data/properties';
import { useScrollToTop, useDebounce } from '../../hooks/useUtils';
import './Properties.css';

export default function Properties() {
  useScrollToTop();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [typeFilter, setTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [cityFilter, setCityFilter] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [immediateOnly, setImmediateOnly] = useState(false);
  const [amenityFilters, setAmenityFilters] = useState({
    seaView: false,
    privatePool: false,
    smartHome: false,
    conciergeLift: false,
  });
  const [isCurating, setIsCurating] = useState(false);

  useEffect(() => {
    const q = searchParams.get('search');
    if (q !== null && q !== search) {
      setSearch(q);
    }
  }, [searchParams]);

  const debouncedSearch = useDebounce(search, 250);

  useEffect(() => {
    const currentQ = searchParams.get('search') || '';
    if (debouncedSearch !== currentQ) {
      const nextParams = new URLSearchParams(searchParams);
      if (debouncedSearch) {
        nextParams.set('search', debouncedSearch);
      } else {
        nextParams.delete('search');
      }
      setSearchParams(nextParams, { replace: true });
    }
  }, [debouncedSearch]);

  const filtered = useMemo(() => {
    return properties.filter(p => {
      const q = debouncedSearch.toLowerCase().trim();
      const matchesSearch = !q ||
        p.title.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        (p.city && p.city.toLowerCase().includes(q)) ||
        (p.type && p.type.toLowerCase().includes(q));

      const matchesType = typeFilter === 'All' || p.type === typeFilter;
      const matchesStatus =
        statusFilter === 'All'
          ? true
          : statusFilter === 'Commercial'
          ? p.status === 'Commercial' || p.type === 'Commercial' || /commercial|office|headquarters/i.test(p.title + ' ' + p.description)
          : p.status === statusFilter;
      const matchesCity = cityFilter === 'All' || p.city === cityFilter;
      const matchesImmediate = !immediateOnly || (
        p.possession && /immediate|ready/i.test(p.possession)
      );

      const matchesSea = !amenityFilters.seaView || p.features?.some(f => /sea|skyline|view|panorama/i.test(f));
      const matchesPool = !amenityFilters.privatePool || p.features?.some(f => /pool|terrace|deck/i.test(f));
      const matchesSmart = !amenityFilters.smartHome || p.features?.some(f => /automation|smart|lutron/i.test(f));
      const matchesConcierge = !amenityFilters.conciergeLift || p.features?.some(f => /concierge|elevator|lift/i.test(f));

      return matchesSearch && matchesType && matchesStatus && matchesCity && matchesImmediate && matchesSea && matchesPool && matchesSmart && matchesConcierge;
    });
  }, [debouncedSearch, typeFilter, statusFilter, cityFilter, immediateOnly, amenityFilters]);

  const sortedAndFiltered = useMemo(() => {
    const list = [...filtered];
    switch (sortBy) {
      case 'price-desc':
        return list.sort((a, b) => b.price - a.price);
      case 'price-asc':
        return list.sort((a, b) => a.price - b.price);
      case 'area-desc':
        return list.sort((a, b) => (b.area || 0) - (a.area || 0));
      case 'beds-desc':
        return list.sort((a, b) => (b.bedrooms || 0) - (a.bedrooms || 0));
      default:
        return list;
    }
  }, [filtered, sortBy]);

  const handleEnquire = (propertyTitle) => {
    navigate(`/contact?property=${encodeURIComponent(propertyTitle)}`);
  };

  const hasActiveFilters = Boolean(
    search ||
    typeFilter !== 'All' ||
    statusFilter !== 'All' ||
    cityFilter !== 'All' ||
    sortBy !== 'featured' ||
    immediateOnly ||
    amenityFilters.seaView ||
    amenityFilters.privatePool ||
    amenityFilters.smartHome ||
    amenityFilters.conciergeLift
  );

  const handleClearFilters = () => {
    setSearch('');
    setTypeFilter('All');
    setStatusFilter('All');
    setCityFilter('All');
    setSortBy('featured');
    setImmediateOnly(false);
    setAmenityFilters({
      seaView: false,
      privatePool: false,
      smartHome: false,
      conciergeLift: false,
    });
    setSearchParams({}, { replace: true });
  };

  return (
    <main className="hk-properties-page">
      {/* ── Page Header ───────────────────────────────────────────────── */}
      <section className="hk-page-banner" aria-label="Properties header">
        <div className="hk-container">
          <SectionHeader
            as="h1"
            overline="Collection"
            title="Explore Properties"
            description="Discover exceptional residences curated for those who appreciate the art of fine living."
          />
        </div>
      </section>

      {/* ── Filters ───────────────────────────────────────────────────── */}
      <section className="hk-filters" aria-label="Property filters">
        <div className="hk-container">
          {/* Minimal Floating Property Filter Card (ALL, BUY, RENT, COMMERCIAL) */}
          <div className="hk-filters__wheel-dock" style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem' }}>
            <WheelSelector
              id="property-acquisition-wheel"
              value={statusFilter}
              onChange={(newStatus) => setStatusFilter(newStatus)}
              label="Find your property acquisition portfolio"
              properties={properties}
              filteredCount={filtered.length}
            />
          </div>

          <div className="hk-filters__bar">
            <div className="hk-input-group hk-filters__search">
              <SearchBar
                id="property-search"
                value={search}
                onChange={e => setSearch(e.target.value)}
                onClear={() => setSearch('')}
                placeholder="Search by estate, address, or architecture…"
                aria-label="Search properties"
              />
            </div>

            <div className="hk-filters__selects">
              {/* Segmented Sliding Mode Toggle: Buy vs Rent */}
              <div className="hk-filters__mode-wrap">
                <Toggle
                  id="filter-acquisition-mode"
                  variant="segmented"
                  offLabel="Buy"
                  onLabel="Rent"
                  checked={statusFilter === 'For Rent'}
                  onChange={(e) => setStatusFilter(e.target.checked ? 'For Rent' : 'For Sale')}
                  aria-label="Switch acquisition filter between Buy and Rent"
                />
                {statusFilter !== 'All' && (
                  <button
                    type="button"
                    className="hk-filters__all-status-btn"
                    onClick={() => setStatusFilter('All')}
                    title="View Both Buy & Rent"
                    aria-label="Show all properties (Buy and Rent)"
                  >
                    All
                  </button>
                )}
              </div>

              <select
                className="hk-input hk-select"
                value={typeFilter}
                onChange={e => setTypeFilter(e.target.value)}
                aria-label="Filter by type"
                id="filter-type"
              >
                <option value="All">All Types</option>
                {propertyTypes.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>

              <select
                className="hk-input hk-select"
                value={cityFilter}
                onChange={e => setCityFilter(e.target.value)}
                aria-label="Filter by city"
                id="filter-city"
              >
                <option value="All">All Cities</option>
                {cities.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>

              <select
                className="hk-input hk-select"
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                aria-label="Sort properties"
                id="filter-sort"
              >
                <option value="featured">Sort: Featured</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="area-desc">Area: Largest First</option>
                <option value="beds-desc">Bedrooms: Most First</option>
              </select>

              {hasActiveFilters && (
                <button
                  type="button"
                  className="hk-btn hk-btn--secondary hk-btn--small hk-filters__reset-btn"
                  onClick={handleClearFilters}
                  aria-label="Reset all filters"
                >
                  <span>Reset Filters</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* ── Bespoke Amenities & Immediate Availability Row ──────────── */}
          <div className="hk-filters__amenities-row">
            <div className="hk-filters__availability-col">
              <Toggle
                id="filter-immediate-availability"
                variant="compact"
                size="small"
                label="Ready Possession"
                checked={immediateOnly}
                onChange={(e) => setImmediateOnly(e.target.checked)}
                aria-label="Filter to immediate possession ready properties only"
              />
            </div>

            <div className="hk-filters__amenities-divider" aria-hidden="true" />

            <div className="hk-filters__amenities-list">
              <span className="hk-filters__amenities-label">Amenities:</span>
              <Checkbox
                id="filter-amenity-sea"
                checked={amenityFilters.seaView}
                onChange={(e) => setAmenityFilters(prev => ({ ...prev, seaView: e.target.checked }))}
                label="Sea / Skyline Panorama"
                variant="butter"
                size="small"
              />
              <Checkbox
                id="filter-amenity-pool"
                checked={amenityFilters.privatePool}
                onChange={(e) => setAmenityFilters(prev => ({ ...prev, privatePool: e.target.checked }))}
                label="Private Pool / Terrace"
                variant="butter"
                size="small"
              />
              <Checkbox
                id="filter-amenity-smart"
                checked={amenityFilters.smartHome}
                onChange={(e) => setAmenityFilters(prev => ({ ...prev, smartHome: e.target.checked }))}
                label="Smart Home Automation"
                variant="powder"
                size="small"
              />
              <Checkbox
                id="filter-amenity-concierge"
                checked={amenityFilters.conciergeLift}
                onChange={(e) => setAmenityFilters(prev => ({ ...prev, conciergeLift: e.target.checked }))}
                label="Concierge / Private Lift"
                variant="powder"
                size="small"
              />
            </div>
          </div>

          <div className="hk-filters__status-row">
            <p className="hk-filters__count">
              {filtered.length} {filtered.length === 1 ? 'property' : 'properties'} found
            </p>
            <button
              type="button"
              className="hk-filters__curate-trigger"
              onClick={() => {
                setIsCurating(true);
                setTimeout(() => setIsCurating(false), 800);
              }}
              title="Refresh curated property portfolio"
              aria-label="Refresh curated property selection"
              style={{
                background: 'transparent',
                border: 'none',
                color: '#432F2E',
                fontFamily: 'inherit',
                fontSize: 'var(--hk-text-xs)',
                fontWeight: 600,
                letterSpacing: '0.04em',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.25rem 0.5rem',
                borderRadius: 'var(--hk-radius-sm)',
                transition: 'opacity 0.2s ease',
                opacity: 0.85
              }}
            >
              <span aria-hidden="true">✦</span>
              <span>Curate Selection</span>
            </button>
          </div>
        </div>
      </section>

      {/* ── Property Grid ─────────────────────────────────────────────── */}
      <section className="hk-section" aria-label="Property listings">
        <div className="hk-container">
          {isCurating ? (
            <div className="hk-properties-loading" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '320px', padding: '3rem 0' }}>
              <Loader variant="bars" size="md" text="Curating Exclusive Residences" />
            </div>
          ) : filtered.length > 0 ? (
            <>
              {/* Interactive Locality Map Pins Dock */}
              <div
                className="hk-properties__pins-dock"
                style={{
                  position: 'relative',
                  zIndex: 25,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '0.85rem',
                  padding: '0.85rem 1.25rem',
                  background: 'rgba(255, 255, 255, 0.82)',
                  backdropFilter: 'blur(14px)',
                  WebkitBackdropFilter: 'blur(14px)',
                  border: '1.5px solid rgba(196, 218, 232, 0.7)',
                  borderRadius: 'var(--hk-radius-md)',
                  marginBottom: '2rem',
                  boxShadow: '0 4px 16px rgba(67, 47, 46, 0.05), 0 0 1px 1px rgba(254, 239, 184, 0.4) inset',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '32px',
                      height: '32px',
                      borderRadius: 'var(--hk-radius-full)',
                      background: 'rgba(196, 218, 232, 0.45)',
                      color: '#3B6C8A',
                      fontSize: 'var(--hk-text-sm)',
                      flexShrink: 0,
                    }}
                    aria-hidden="true"
                  >
                    📍
                  </span>
                  <div>
                    <h2 style={{ fontSize: 'var(--hk-text-sm)', color: '#432F2E', display: 'block', lineHeight: 1.25, margin: 0, fontWeight: 700 }}>
                      Interactive Locality Pinboard
                    </h2>
                    <span style={{ fontSize: 'var(--hk-text-xs)', color: '#705352' }}>
                      Hover or tap pins for real-time architectural previews & floating sky dossiers
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                  {filtered.slice(0, 6).map((p) => (
                    <PropertyMapPin
                      key={`pin-${p.id}`}
                      property={p}
                      position="bottom"
                      align="center"
                    />
                  ))}
                </div>
              </div>

              <div className="hk-grid hk-grid--3" style={{ position: 'relative', zIndex: 1 }}>
                {sortedAndFiltered.map((property, i) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    index={i}
                    onEnquire={handleEnquire}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="hk-properties-empty">
              <h2>No properties match your criteria</h2>
              <p>Try adjusting your filters or search terms.</p>
              <button
                type="button"
                className="hk-btn hk-btn--secondary"
                onClick={handleClearFilters}
              >
                <span>Clear Filters</span>
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
