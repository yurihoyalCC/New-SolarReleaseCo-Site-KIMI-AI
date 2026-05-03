import { useState, useEffect, useRef } from 'react';
import { 
  Shield, 
  FileText, 
  Search, 
  Scale, 
  ArrowRight, 
  CheckCircle,
  Building2,
  Users,
  Phone
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Reusable Header Component for this page
function PageHeader() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-navy/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="w-full px-6 lg:px-12">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <a href="/" className={`font-heading font-bold text-lg lg:text-xl transition-colors ${
            isScrolled ? 'text-white' : 'text-navy'
          }`}>
            Solar Release Co.
          </a>

          <div className="hidden lg:flex items-center gap-8">
            <nav className="flex items-center gap-6">
              <a href="/" className={`text-sm font-medium transition-colors hover:text-cyan ${
                isScrolled ? 'text-white/80' : 'text-navy/80'
              }`}>
                Home
              </a>
              <span className={`text-sm font-medium ${
                isScrolled ? 'text-cyan' : 'text-cyan'
              }`}>
                About
              </span>
            </nav>
            <a href="tel:+15551234567" className="btn-primary flex items-center gap-2 text-sm py-3 px-6">
              <Phone className="w-4 h-4" />
              Call Now
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function About() {
  const heroRef = useRef<HTMLElement>(null);
  const whoWeAreRef = useRef<HTMLElement>(null);
  const missionRef = useRef<HTMLElement>(null);
  const differentRef = useRef<HTMLElement>(null);
  const approachRef = useRef<HTMLElement>(null);
  const legalRef = useRef<HTMLElement>(null);
  const trustRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      const heroContent = heroRef.current?.querySelector('.hero-content');
      if (heroContent) {
        gsap.fromTo(
          heroContent,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
          }
        );
      }

      // Section reveal animations
      const sections = [
        whoWeAreRef.current,
        missionRef.current,
        differentRef.current,
        approachRef.current,
        legalRef.current,
        trustRef.current,
      ];

      sections.forEach((section) => {
        if (!section) return;
        
        const revealItems = section.querySelectorAll('.reveal-item');
        if (revealItems.length > 0) {
          gsap.fromTo(
            revealItems,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              stagger: 0.1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: section,
                start: 'top 75%',
                toggleActions: 'play none none none',
              },
            }
          );
        }
      });
    });

    return () => ctx.revert();
  }, []);

  const scrollToContact = () => {
    window.location.href = '/#contact';
  };

  return (
    <div className="relative bg-cloud min-h-screen">
      {/* Grain Overlay */}
      <div className="grain-overlay" />
      
      {/* Header */}
      <PageHeader />

      <main className="relative">
        {/* HERO SECTION */}
        <section
          ref={heroRef}
          className="relative w-full min-h-[60vh] lg:min-h-[70vh] flex items-center justify-center overflow-hidden"
        >
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src="/images/about_hero_office.jpg"
              alt="Modern office"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-navy/70" />
          </div>

          {/* Content */}
          <div className="hero-content relative z-10 text-center px-6 pt-20">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Building2 className="w-6 h-6 text-cyan" />
              <span className="micro-label text-white/70">ABOUT US</span>
            </div>
            <h1 className="heading-xl text-white max-w-4xl mx-auto">
              ABOUT SOLAR RELEASE CO.
            </h1>
            <div className="accent-rule w-24 mx-auto mt-8" />
          </div>
        </section>

        {/* SECTION 1: WHO WE ARE */}
        <section
          ref={whoWeAreRef}
          className="w-full py-20 lg:py-32 px-6 lg:px-[8vw]"
        >
          <div className="max-w-4xl mx-auto text-center">
            <div className="reveal-item flex items-center justify-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-full bg-cyan/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-cyan" />
              </div>
            </div>
            <h2 className="reveal-item heading-lg text-navy mb-8">
              WHO WE ARE
            </h2>
            <p className="reveal-item text-lg lg:text-xl text-slate leading-relaxed">
              We are a consumer advocacy company focused on helping homeowners identify and resolve deceptive or fraudulent solar agreements.
            </p>
          </div>
        </section>

        {/* SECTION 2: OUR MISSION */}
        <section
          ref={missionRef}
          className="w-full py-20 lg:py-32 px-6 lg:px-[8vw] bg-white"
        >
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div>
                <div className="reveal-item flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-cyan/10 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-cyan" />
                  </div>
                  <span className="micro-label text-slate">OUR PURPOSE</span>
                </div>
                <h2 className="reveal-item heading-lg text-navy mb-6">
                  OUR MISSION
                </h2>
                <p className="reveal-item text-lg text-slate leading-relaxed">
                  To provide clarity, structure, and a real path forward for homeowners who feel misled or trapped in solar contracts.
                </p>
              </div>
              <div className="reveal-item">
                <div className="card-white p-8 lg:p-10">
                  <blockquote className="text-navy text-lg lg:text-xl font-medium leading-relaxed italic">
                    "Every homeowner deserves to understand exactly what they signed—and what options they have."
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: WHAT MAKES US DIFFERENT */}
        <section
          ref={differentRef}
          className="w-full py-20 lg:py-32 px-6 lg:px-[8vw]"
        >
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <div className="reveal-item flex items-center justify-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-cyan/10 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-cyan" />
                </div>
              </div>
              <h2 className="reveal-item heading-lg text-navy mb-4">
                WHAT MAKES US DIFFERENT
              </h2>
              <div className="reveal-item accent-rule w-24 mx-auto" />
            </div>

            <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
              {[
                {
                  icon: Search,
                  title: 'We investigate before recommending action',
                  description: 'No rushed decisions. We take the time to understand your situation fully.',
                },
                {
                  icon: FileText,
                  title: 'We build structured, legal-grade fraud reports',
                  description: 'Documentation that meets professional standards for review and escalation.',
                },
                {
                  icon: Shield,
                  title: 'We focus on documentation, not guesswork',
                  description: 'Every claim is backed by evidence and thorough analysis.',
                },
                {
                  icon: Scale,
                  title: 'We prepare cases properly before escalation',
                  description: 'Structured preparation that strengthens your position from day one.',
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="reveal-item card-white p-6 lg:p-8 hover:shadow-card transition-shadow"
                >
                  <div className="w-12 h-12 rounded-full bg-cyan/10 flex items-center justify-center mb-5">
                    <item.icon className="w-6 h-6 text-cyan" />
                  </div>
                  <h3 className="font-heading font-bold text-navy text-lg mb-3">
                    {item.title}
                  </h3>
                  <p className="text-slate text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 4: OUR APPROACH */}
        <section
          ref={approachRef}
          className="w-full py-20 lg:py-32 px-6 lg:px-[8vw] bg-navy"
        >
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="reveal-item heading-lg text-white mb-4">
                OUR APPROACH
              </h2>
              <p className="reveal-item text-white/60 text-lg">
                Clear boundaries. Professional standards.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {[
                {
                  title: 'We are NOT a law firm',
                  description: 'We do not practice law or provide legal representation.',
                },
                {
                  title: 'We do not provide legal advice',
                  description: 'Our role is investigation and documentation, not legal counsel.',
                },
                {
                  title: 'We focus on investigation first',
                  description: 'Building a complete picture before any recommendations.',
                },
                {
                  title: 'We build cases for potential escalation',
                  description: 'Structured documentation designed for legal review when appropriate.',
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="reveal-item bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-cyan/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-4 h-4 text-cyan" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-white text-base mb-2">
                        {item.title}
                      </h3>
                      <p className="text-white/60 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 5: LEGAL ALIGNMENT */}
        <section
          ref={legalRef}
          className="w-full py-20 lg:py-32 px-6 lg:px-[8vw]"
        >
          <div className="max-w-4xl mx-auto">
            <div className="card-white p-8 lg:p-12">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-full bg-cyan/10 flex items-center justify-center">
                  <Scale className="w-7 h-7 text-cyan" />
                </div>
                <div>
                  <span className="micro-label text-slate">PARTNERSHIP</span>
                  <h2 className="heading-md text-navy">LEGAL ALIGNMENT</h2>
                </div>
              </div>

              <p className="reveal-item text-lg text-slate leading-relaxed mb-8">
                We work closely with independent legal partners who review fraud reports and handle escalated cases when appropriate.
              </p>

              <div className="reveal-item grid sm:grid-cols-3 gap-6 border-t border-slate/10 pt-8">
                {[
                  { number: '01', text: 'Independent legal partners review qualified cases' },
                  { number: '02', text: 'Fraud reports structured for legal use' },
                  { number: '03', text: 'Escalation available when appropriate' },
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <span className="text-cyan font-heading font-bold text-sm">{item.number}</span>
                    <p className="text-navy text-sm leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>

              <div className="reveal-item mt-8 pt-6 border-t border-slate/10">
                <p className="text-xs text-slate/60 leading-relaxed">
                  Solar Release Co. is a consumer advocacy organization and not a law firm. Legal services are provided separately by independent, licensed attorneys through direct engagement if your case qualifies.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: TRUST CLOSE */}
        <section
          ref={trustRef}
          className="w-full py-20 lg:py-32 px-6 lg:px-[8vw] bg-white"
        >
          <div className="max-w-3xl mx-auto text-center">
            <div className="reveal-item mb-8">
              <div className="w-16 h-16 rounded-full bg-cyan/10 flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-cyan" />
              </div>
            </div>
            
            <h2 className="reveal-item heading-lg text-navy mb-8">
              OUR COMMITMENT TO YOU
            </h2>
            
            <p className="reveal-item text-lg lg:text-xl text-slate leading-relaxed mb-12">
              Our goal is simple: to give homeowners clarity, structure, and a stronger position when dealing with solar contract issues.
            </p>

            <div className="reveal-item flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={scrollToContact}
                className="btn-primary flex items-center justify-center gap-2"
              >
                Start Your Free Fraud Investigation
                <ArrowRight className="w-4 h-4" />
              </button>
              <a 
                href="tel:+15551234567"
                className="btn-outline flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                Call Now
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-navy border-t border-white/10 py-8">
        <div className="w-full px-6 lg:px-[8vw]">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <a href="/" className="text-white font-heading font-bold">
              Solar Release Co.
            </a>
            <p className="text-white/50 text-sm text-center">
              Consumer advocacy organization. Not a law firm.
            </p>
            <div className="text-white/50 text-sm">
              © {new Date().getFullYear()} Solar Release Co.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}