import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import './Header.css';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === '/';
  // Transparent only when on the homepage hero and not scrolled past threshold
  const isTransparent = isHome && !scrolled;

  // Ensure default clean luxury theme is restored
  useEffect(() => {
    try {
      localStorage.removeItem('hk_ambiance');
      document.documentElement.classList.remove('hk-theme--twilight');
      document.body.classList.remove('hk-theme--twilight');
    } catch {
      // LocalStorage access handling
    }
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile nav on route change
  useEffect(() => {
    setMobileOpen(false);
    document.body.style.overflow = '';
  }, [location.pathname]);

  // Handle escape key and body scroll lock for mobile menu
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileOpen) {
        setMobileOpen(false);
      }
    };

    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileOpen]);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/properties', label: 'Properties' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <header
      className={`hk-header ${isTransparent ? 'hk-header--transparent' : 'hk-header--solid'} ${scrolled ? 'hk-header--scrolled' : ''}`}
      role="banner"
    >
      <div className="hk-container hk-header__inner">
        <Link to="/" className="hk-header__logo" aria-label="Homekart Realty — Home">
          <span className="hk-header__logo-icon" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-8h6v8M9 10h.01M15 10h.01" />
            </svg>
          </span>
          <span className="hk-header__logo-text">
            <span className="hk-header__logo-name">Homekart</span>
            <span className="hk-header__logo-sub">Realty</span>
          </span>
        </Link>

        <nav
          className={`hk-header__nav ${mobileOpen ? 'hk-header__nav--open' : ''}`}
          role="navigation"
          aria-label="Main navigation"
        >
          <ul className="hk-header__nav-list">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `hk-header__nav-link ${isActive ? 'hk-header__nav-link--active' : ''}`
                }
                end
                onClick={() => setMobileOpen(false)}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/properties"
                className={({ isActive }) =>
                  `hk-header__nav-link ${isActive ? 'hk-header__nav-link--active' : ''}`
                }
                onClick={() => setMobileOpen(false)}
              >
                Properties
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `hk-header__nav-link ${isActive ? 'hk-header__nav-link--active' : ''}`
                }
                onClick={() => setMobileOpen(false)}
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `hk-header__nav-link ${isActive ? 'hk-header__nav-link--active' : ''}`
                }
                onClick={() => setMobileOpen(false)}
              >
                Contact
              </NavLink>
            </li>
          </ul>

          <Link
            to="/contact"
            className="hk-header__cta"
            onClick={() => setMobileOpen(false)}
          >
            <span>Book a Viewing</span>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </nav>

        {/* Desktop Header Actions */}
        <div className="hk-header__actions">
          <button
            type="button"
            className={`hk-header__hamburger ${mobileOpen ? 'hk-header__hamburger--open' : ''}`}
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
