import { useState } from 'react';
import { projectShowcases } from '../../data/properties';
import SectionHeader from '../SectionHeader/SectionHeader';
import Toggle from '../Toggle';
import { useInView } from '../../hooks/useUtils';
import './ProjectShowcase.css';

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&auto=format&fit=crop&q=85';

export default function ProjectShowcase({ onInquire }) {
  const [activeTab, setActiveTab] = useState(0);
  const [twilightLighting, setTwilightLighting] = useState(false);
  const [ref, isVisible] = useInView({ threshold: 0.15 });

  const current = projectShowcases[activeTab];

  return (
    <section
      ref={ref}
      className={`hk-section hk-editorial-showcase ${isVisible ? 'hk-editorial-showcase--visible' : ''}`}
      aria-label="Curated Project Showcases"
    >
      <div className="hk-container">
        <SectionHeader
          overline="Master Architect Collaborations"
          title="Signature Developments"
          description="Curated landmark residential projects developed in alliance with leading architectural practices."
        />

        {/* Editorial Tab Bar */}
        <div className="hk-editorial-showcase__tabs" role="tablist" aria-label="Select development showcase">
          {projectShowcases.map((project, idx) => (
            <button
              key={project.id}
              role="tab"
              aria-selected={activeTab === idx}
              aria-controls={`showcase-panel-${idx}`}
              id={`showcase-tab-${idx}`}
              className={`hk-editorial-showcase__tab ${activeTab === idx ? 'hk-editorial-showcase__tab--active' : ''}`}
              onClick={() => setActiveTab(idx)}
            >
              <span className="hk-editorial-showcase__tab-idx">0{idx + 1}</span>
              <div className="hk-editorial-showcase__tab-text">
                <span className="hk-editorial-showcase__tab-title">{project.name}</span>
                <span className="hk-editorial-showcase__tab-loc">
                  {project.location.split(',')[1]?.trim() || project.location}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Asymmetrical Editorial Stage */}
        <div
          key={current.id}
          className={`hk-editorial-showcase__stage ${twilightLighting ? 'hk-editorial-showcase__stage--twilight' : ''}`}
          id={`showcase-panel-${activeTab}`}
          role="tabpanel"
          aria-labelledby={`showcase-tab-${activeTab}`}
        >
          {/* Large Architectural Visual */}
          <div className="hk-editorial-showcase__visual-col">
            {/* Interactive Lighting Ambiance Bar */}
            <div className="hk-editorial-showcase__lighting-bar">
              <span className="hk-editorial-showcase__lighting-status">
                {twilightLighting ? '✦ Twilight Illumination (Evening Ambience)' : '✦ Daylight Solarium (Sunlight Exposure)'}
              </span>
              <Toggle
                id={`showcase-${current.id}-lighting`}
                variant="segmented"
                size="small"
                checked={twilightLighting}
                onChange={(e) => setTwilightLighting(e.target.checked)}
                aria-label="Toggle showcase architectural lighting between daylight and twilight"
                offLabel="Day"
                onLabel="Night"
              />
            </div>

            <div className={`hk-editorial-showcase__image-wrapper ${twilightLighting ? 'hk-editorial-showcase__image-wrapper--twilight' : ''}`}>
              <img
                src={current.image || FALLBACK_IMAGE}
                alt={`${current.name} architectural exterior`}
                className={`hk-editorial-showcase__image ${twilightLighting ? 'hk-editorial-showcase__image--twilight' : ''}`}
                loading="lazy"
                onError={(e) => {
                  if (e.currentTarget.src !== FALLBACK_IMAGE) {
                    e.currentTarget.src = FALLBACK_IMAGE;
                  }
                }}
              />
              <div className="hk-editorial-showcase__scrim" />
              <div className="hk-editorial-showcase__meta-badge">
                <span className={`hk-editorial-showcase__badge-status ${twilightLighting ? 'hk-editorial-showcase__badge-status--twilight' : ''}`}>
                  {twilightLighting ? 'Twilight Active' : current.status}
                </span>
                <span className="hk-editorial-showcase__badge-units">{current.units}</span>
              </div>
            </div>
          </div>

          {/* Typographic Dossier */}
          <div className="hk-editorial-showcase__dossier-col">
            <div className="hk-editorial-showcase__dossier-header">
              <span className="hk-editorial-showcase__type-tag">{current.type}</span>
              <span className="hk-editorial-showcase__completion-tag">{current.completion}</span>
            </div>

            <h3 className="hk-editorial-showcase__title">{current.name}</h3>

            <p className="hk-editorial-showcase__location">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
              <span>{current.location}</span>
            </p>

            <blockquote className="hk-editorial-showcase__highlight">
              “{current.highlight}”
            </blockquote>

            <dl className="hk-editorial-showcase__specs">
              <div className="hk-editorial-showcase__spec-row">
                <dt>Master Architect</dt>
                <dd>{current.architect}</dd>
              </div>
              <div className="hk-editorial-showcase__spec-row">
                <dt>Project Delivery</dt>
                <dd>{current.completion}</dd>
              </div>
              <div className="hk-editorial-showcase__spec-row">
                <dt>Curated Portfolio Scale</dt>
                <dd>{current.units}</dd>
              </div>
            </dl>

            <div className="hk-editorial-showcase__action-row">
              <a
                href="#consultation"
                className="hk-editorial-showcase__cta-btn"
                onClick={(e) => {
                  if (onInquire) {
                    e.preventDefault();
                    onInquire(current.name);
                  }
                }}
              >
                <span>Request Private Dossier</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
              <span className="hk-editorial-showcase__discreet-note">
                Confidential Prospectus • NDA Available
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
