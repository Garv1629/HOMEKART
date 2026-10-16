import { Component } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Properties from './pages/Properties/Properties';
import PropertyDetail from './pages/PropertyDetail/PropertyDetail';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('App ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="hk-container hk-section" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', paddingTop: '140px' }}>
          <h1 style={{ marginBottom: '1rem', fontFamily: 'var(--hk-font-serif)', color: 'var(--hk-chocolate)' }}>
            Something went wrong
          </h1>
          <p style={{ marginBottom: '2rem', color: 'var(--hk-chocolate-muted)', maxWidth: '480px' }}>
            We encountered an unexpected issue while rendering this portfolio address. Please return to the showcase.
          </p>
          <button
            type="button"
            className="hk-btn hk-btn--accent"
            onClick={() => {
              this.setState({ hasError: false, error: null });
              window.location.href = '/';
            }}
          >
            <span>Return to Portfolio</span>
          </button>
        </main>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  const location = useLocation();

  return (
    <div className="hk-app-root">
      <Header />
      <ErrorBoundary>
        <div key={location.pathname} className="hk-page-transition-wrap">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/properties/:slug" element={<PropertyDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="*"
            element={
              <main className="hk-container hk-section" style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', paddingTop: '140px' }}>
                <h1 style={{ marginBottom: '1rem' }}>404 — Page Not Found</h1>
                <p style={{ marginBottom: '2rem' }}>The requested luxury suite or portfolio address could not be located.</p>
                <Link to="/" className="hk-btn hk-btn--accent">
                  <span>Return to Home</span>
                </Link>
              </main>
            }
          />
        </Routes>
      </div>
      </ErrorBoundary>
      <Footer />

      {/* Floating Concierge Action Trigger */}
      <aside className="hk-floating-concierge" aria-label="Direct Concierge Contact">
        <Link
          to="/contact"
          className="hk-floating-concierge__btn"
          title="Schedule Private Consultation"
          aria-label="Schedule Private Consultation"
        >
          <span className="hk-floating-concierge__icon">✦</span>
          <span className="hk-floating-concierge__text">Private Desk</span>
        </Link>
      </aside>
    </div>
  );
}
