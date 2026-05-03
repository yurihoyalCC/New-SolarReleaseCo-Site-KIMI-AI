import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Menu, X, Lock } from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const getNavClass = (path: string) => {
    const isActive = location.pathname === path;
    return `text-sm font-medium transition-colors hover:text-cyan ${
      isScrolled 
        ? isActive ? 'text-cyan' : 'text-white/80'
        : isActive ? 'text-cyan' : 'text-navy/80'
    }`;
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-navy/95 backdrop-blur-md shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="w-full px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link 
              to="/"
              className={`font-heading font-bold text-lg lg:text-xl transition-colors ${
                isScrolled ? 'text-white' : 'text-navy'
              }`}
            >
              Solar Release Co.
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              <nav className="flex items-center gap-6">
                {isHomePage ? (
                  <>
                    {[
                      { label: 'How It Works', id: 'process' },
                      { label: 'Report', id: 'report' },
                      { label: 'Legal Partners', id: 'legal' },
                      { label: 'Contact', id: 'contact' },
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className={`text-sm font-medium transition-colors hover:text-cyan ${
                          isScrolled ? 'text-white/80' : 'text-navy/80'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                    <Link to="/about" className={getNavClass('/about')}>About</Link>
                    <Link to="/services" className={getNavClass('/services')}>Services</Link>
                    <Link to="/payment" className={getNavClass('/payment')}>Payment</Link>
                  </>
                ) : (
                  <>
                    <Link to="/" className={getNavClass('/')}>Home</Link>
                    <Link to="/about" className={getNavClass('/about')}>About</Link>
                    <Link to="/services" className={getNavClass('/services')}>Services</Link>
                    <Link to="/payment" className={getNavClass('/payment')}>Payment</Link>
                  </>
                )}
              </nav>
              
              <Link 
                to="/portal"
                className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-cyan ${
                  isScrolled ? 'text-white/80' : 'text-navy/80'
                }`}
              >
                <Lock className="w-4 h-4" />
                Portal
              </Link>
              
              <a
                href="tel:+15551234567"
                className="btn-primary flex items-center gap-2 text-sm py-3 px-6"
              >
                <Phone className="w-4 h-4" />
                Call Now
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 transition-colors ${
                isScrolled ? 'text-white' : 'text-navy'
              }`}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-navy/98 backdrop-blur-md border-t border-white/10">
            <nav className="flex flex-col p-6 gap-4">
              {isHomePage ? (
                <>
                  {[
                    { label: 'How It Works', id: 'process' },
                    { label: 'Report', id: 'report' },
                    { label: 'Legal Partners', id: 'legal' },
                    { label: 'Contact', id: 'contact' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className="text-white/80 text-left py-2 hover:text-cyan transition-colors"
                    >
                      {item.label}
                    </button>
                  ))}
                  <Link
                    to="/about"
                    className="text-white/80 text-left py-2 hover:text-cyan transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    About
                  </Link>
                  <Link
                    to="/services"
                    className="text-white/80 text-left py-2 hover:text-cyan transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Services
                  </Link>
                  <Link
                    to="/payment"
                    className="text-white/80 text-left py-2 hover:text-cyan transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Payment
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/"
                    className="text-white/80 text-left py-2 hover:text-cyan transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Home
                  </Link>
                  <Link
                    to="/about"
                    className="text-white/80 text-left py-2 hover:text-cyan transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    About
                  </Link>
                  <Link
                    to="/services"
                    className="text-white/80 text-left py-2 hover:text-cyan transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Services
                  </Link>
                  <Link
                    to="/payment"
                    className="text-white/80 text-left py-2 hover:text-cyan transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Payment
                  </Link>
                </>
              )}
              <Link
                to="/portal"
                className="text-cyan text-left py-2 hover:text-cyan/80 transition-colors flex items-center gap-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Lock className="w-4 h-4" />
                Portal
              </Link>
              <a
                href="tel:+15551234567"
                className="btn-primary flex items-center justify-center gap-2 mt-4"
              >
                <Phone className="w-4 h-4" />
                Call Now
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* Floating Mobile CTA - Only on homepage */}
      {isHomePage && (
        <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-navy/95 backdrop-blur-md border-t border-white/10 p-4">
          <div className="flex gap-3">
            <a
              href="tel:+15551234567"
              className="btn-primary flex-1 flex items-center justify-center gap-2 text-sm py-3"
            >
              <Phone className="w-4 h-4" />
              Call Now
            </a>
            <button
              onClick={() => scrollToSection('contact')}
              className="btn-outline flex-1 text-sm py-3 border-white text-white hover:bg-white/10"
            >
              Start Investigation
            </button>
          </div>
        </div>
      )}
    </>
  );
}