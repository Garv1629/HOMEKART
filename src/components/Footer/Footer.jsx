import { Link } from 'react-router-dom';
import { useInView } from '../../hooks/useUtils';
import { companyInfo } from '../../data/properties';
import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [ref, isVisible] = useInView({ threshold: 0.08 });

  return (
    <footer ref={ref} className={`hk-footer ${isVisible ? 'hk-footer--visible' : ''}`} role="contentinfo">
      <div className="hk-container">
        <div className="hk-footer__grid">
          {/* Brand */}
          <div className="hk-footer__brand">
            <Link to="/" className="hk-footer__logo" aria-label="Homekart Realty — Home">
              <span className="hk-footer__logo-icon">⌂</span>
              <span className="hk-footer__logo-name">Homekart Realty</span>
            </Link>
            <p className="hk-footer__desc">
              {companyInfo.description}
            </p>
            <div className="hk-footer__cta-row">
              <Link to="/contact" className="hk-btn hk-btn--butter hk-btn--small hk-footer__cta-btn">
                <span>Book Consultation</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="hk-footer__col">
            <h3 className="hk-footer__heading">Navigate</h3>
            <ul className="hk-footer__links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/properties">Properties</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="hk-footer__col">
            <h3 className="hk-footer__heading">Services</h3>
            <ul className="hk-footer__links">
              <li><span>Luxury Sales</span></li>
              <li><span>Premium Rentals</span></li>
              <li><span>Investment Advisory</span></li>
              <li><span>Interior Curation</span></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="hk-footer__col">
            <h3 className="hk-footer__heading">Get in Touch</h3>
            <ul className="hk-footer__links hk-footer__contact">
              <li>
                <a href={`mailto:${companyInfo.email}`}>{companyInfo.email}</a>
              </li>
              <li>
                <a href={`tel:${companyInfo.phone.replace(/\s/g, '')}`}>{companyInfo.phone}</a>
              </li>
              <li>
                <span>{companyInfo.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <hr className="hk-divider" />

        <div className="hk-footer__bottom">
          <p className="hk-footer__copy">
            &copy; {currentYear} {companyInfo.name}. All rights reserved.
          </p>
          <div className="hk-footer__social">
            <a href={companyInfo.social.instagram} aria-label="Instagram" className="hk-btn hk-btn--secondary hk-btn--small hk-footer__social-btn" target="_blank" rel="noopener noreferrer">
              <span>Instagram</span>
            </a>
            <a href={companyInfo.social.linkedin} aria-label="LinkedIn" className="hk-btn hk-btn--secondary hk-btn--small hk-footer__social-btn" target="_blank" rel="noopener noreferrer">
              <span>LinkedIn</span>
            </a>
            <a href={companyInfo.social.twitter} aria-label="X (Twitter)" className="hk-btn hk-btn--secondary hk-btn--small hk-footer__social-btn" target="_blank" rel="noopener noreferrer">
              <span>X</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
