import { Link } from 'react-router-dom';
import LocationTooltip from '../LocationTooltip';
import { useInView } from '../../hooks/useUtils';
import './PropertyCard.css';

/**
 * Homekart Realty Luxury Editorial Property Card
 *
 * Real estate presentation: Image, Title, Location, Price, Key Amenities, and CTAs
 * - Restrained brand palette: Chocolate Brown #432F2E, Powder Blue #C4DAE8, Butter Yellow #FEEFB8, Warm Ivory #F7F5F0
 * - Location tooltip preview integration (Amine-maker)
 * - Accessible keyboard focus (:focus-within) and reduced-motion support
 */
const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&auto=format&fit=crop&q=85';

export default function PropertyCard({ property, index = 0, onEnquire }) {
  const [ref, isVisible] = useInView({ threshold: 0.1 });

  return (
    <article
      ref={ref}
      className={`hk-editorial-card ${isVisible ? 'hk-editorial-card--visible' : ''}`}
      style={{ animationDelay: `${(index % 3) * 120}ms` }}
    >
      <div className="hk-editorial-card__image-container">
        <Link
          to={`/properties/${property.slug}`}
          className="hk-editorial-card__image-link"
          aria-label={`View architectural details for ${property.title}`}
        >
          <img
            src={property.image || FALLBACK_IMAGE}
            alt={property.title}
            className="hk-editorial-card__image"
            loading="lazy"
            onError={(e) => {
              if (e.currentTarget.src !== FALLBACK_IMAGE) {
                e.currentTarget.src = FALLBACK_IMAGE;
              }
            }}
          />
          <div className="hk-editorial-card__image-scrim" />
        </Link>
        <span className="hk-editorial-card__badge">{property.status}</span>
        <span className="hk-editorial-card__city-tag">{property.city}</span>

        {/* Hover-revealed Architectural Highlight Chip */}
        {property.features && property.features.length > 0 && (
          <div className="hk-editorial-card__hover-feature" aria-hidden="true">
            <span>✦ {property.features[0]}</span>
          </div>
        )}
      </div>

      <div className="hk-editorial-card__content">
        <div className="hk-editorial-card__header">
          <span className="hk-editorial-card__type">{property.type}</span>
          <p className="hk-editorial-card__price">{property.priceFormatted}</p>
        </div>

        <h3 className="hk-editorial-card__title">
          <Link to={`/properties/${property.slug}`} className="hk-editorial-card__title-link">
            {property.title}
          </Link>
        </h3>

        <LocationTooltip property={property} position="auto" align="left">
          <p className="hk-editorial-card__location">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
              <circle cx="12" cy="9" r="2.5" />
            </svg>
            {property.location}
          </p>
        </LocationTooltip>

        <div className="hk-editorial-card__specs">
          <div className="hk-editorial-card__spec">
            <span className="hk-editorial-card__spec-val">{property.bedrooms}</span>
            <span className="hk-editorial-card__spec-lbl">Beds</span>
          </div>
          <div className="hk-editorial-card__spec-sep" />
          <div className="hk-editorial-card__spec">
            <span className="hk-editorial-card__spec-val">{property.bathrooms}</span>
            <span className="hk-editorial-card__spec-lbl">Baths</span>
          </div>
          <div className="hk-editorial-card__spec-sep" />
          <div className="hk-editorial-card__spec">
            <span className="hk-editorial-card__spec-val">{property.area.toLocaleString()}</span>
            <span className="hk-editorial-card__spec-lbl">{property.areaUnit}</span>
          </div>
        </div>

        <div className="hk-editorial-card__actions">
          <Link
            to={`/properties/${property.slug}`}
            className="hk-editorial-card__view-btn"
          >
            <span>View Residence</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
          {onEnquire ? (
            <button
              type="button"
              className="hk-editorial-card__enquire-btn"
              onClick={() => onEnquire(property.title)}
            >
              <span>Enquire</span>
            </button>
          ) : (
            <Link
              to={`/contact?property=${encodeURIComponent(property.title)}`}
              className="hk-editorial-card__enquire-btn"
            >
              <span>Enquire</span>
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
