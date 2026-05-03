import { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  FileText, 
  Search, 
  ClipboardList,
  Scale, 
  ArrowRight, 
  CheckCircle,
  Briefcase,
  Phone,
  Clock,
  AlertCircle,
  BarChart3,
  FolderOpen,
  Gavel
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Header Component
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
              <a href="/about" className={`text-sm font-medium transition-colors hover:text-cyan ${
                isScrolled ? 'text-white/80' : 'text-navy/80'
              }`}>
                About
              </a>
              <span className={`text-sm font-medium ${
                isScrolled ? 'text-cyan' : 'text-cyan'
              }`}>
                Services
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

export default function Services() {
  const heroRef = useRef<HTMLElement>(null);
  const investigationRef = useRef<HTMLElement>(null);
  const analysisRef = useRef<HTMLElement>(null);
  const reportRef = useRef<HTMLElement>(null);
  const preparationRef = useRef<HTMLElement>(null);
  const escalationRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);

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
        investigationRef.current,
        analysisRef.current,
        reportRef.current,
        preparationRef.current,
        escalationRef.current,
        ctaRef.current,
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
          className="relative w-full min-h-[55vh] lg:min-h-[65vh] flex items-center justify-center overflow-hidden"
        >
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src="/images/services_hero.jpg"
              alt="Professional services"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-navy/70" />
          </div>

          {/* Content */}
          <div className="hero-content relative z-10 text-center px-6 pt-20">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Briefcase className="w-6 h-6 text-cyan" />
              <span className="micro-label text-white/70">WHAT WE DO</span>
            </div>
            <h1 className="heading-xl text-white max-w-4xl mx-auto">
              OUR SERVICES
            </h1>
            <div className="accent-rule w-24 mx-auto mt-8" />
            <p className="text-white/70 text-lg max-w-2xl mx-auto mt-8">
              A structured, professional process for investigating and documenting solar contract issues.
            </p>
          </div>
        </section>

        {/* SECTION 1: FRAUD INVESTIGATION */}
        <section
          ref={investigationRef}
          className="w-full py-20 lg:py-28 px-6 lg:px-[8vw]"
        >
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              <div>
                <div className="reveal-item flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-cyan/10 flex items-center justify-center">
                    <Mic className="w-7 h-7 text-cyan" />
                  </div>
                  <span className="micro-label text-slate">STEP 01</span>
                </div>
                <h2 className="reveal-item heading-lg text-navy mb-6">
                  FRAUD INVESTIGATION
                </h2>
                <p className="reveal-item text-lg text-slate leading-relaxed mb-8">
                  We begin with a comprehensive investigation to understand exactly what happened during your solar sales process.
                </p>
              </div>

              <div className="reveal-item">
                <div className="card-white p-8">
                  <ul className="space-y-5">
                    {[
                      {
                        icon: Clock,
                        title: 'Recorded fraud interview',
                        description: 'Detailed conversation to capture your complete experience.',
                      },
                      {
                        icon: ClipboardList,
                        title: 'Full case intake',
                        description: 'Systematic collection of all relevant information.',
                      },
                      {
                        icon: Search,
                        title: 'Timeline reconstruction',
                        description: 'Building a clear chronology of events and communications.',
                      },
                      {
                        icon: AlertCircle,
                        title: 'Identification of misleading practices',
                        description: 'Documenting specific claims and representations made.',
                      },
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-cyan/10 flex items-center justify-center flex-shrink-0">
                          <item.icon className="w-5 h-5 text-cyan" />
                        </div>
                        <div>
                          <h4 className="font-heading font-bold text-navy text-sm mb-1">
                            {item.title}
                          </h4>
                          <p className="text-slate text-sm leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: DOCUMENT ANALYSIS */}
        <section
          ref={analysisRef}
          className="w-full py-20 lg:py-28 px-6 lg:px-[8vw] bg-white"
        >
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              <div className="order-2 lg:order-1 reveal-item">
                <div className="card-white p-8 border-2 border-cyan/20">
                  <ul className="space-y-5">
                    {[
                      {
                        icon: FileText,
                        title: 'Contract review',
                        description: 'Line-by-line analysis of your solar agreement.',
                      },
                      {
                        icon: BarChart3,
                        title: 'Loan and financing breakdown',
                        description: 'Clear explanation of terms, rates, and total costs.',
                      },
                      {
                        icon: Search,
                        title: 'System performance vs. promises',
                        description: 'Comparing actual output to sales representations.',
                      },
                      {
                        icon: AlertCircle,
                        title: 'Identification of inconsistencies',
                        description: 'Spotting discrepancies between what was promised and delivered.',
                      },
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-cyan/10 flex items-center justify-center flex-shrink-0">
                          <item.icon className="w-5 h-5 text-cyan" />
                        </div>
                        <div>
                          <h4 className="font-heading font-bold text-navy text-sm mb-1">
                            {item.title}
                          </h4>
                          <p className="text-slate text-sm leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <div className="reveal-item flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-cyan/10 flex items-center justify-center">
                    <FileText className="w-7 h-7 text-cyan" />
                  </div>
                  <span className="micro-label text-slate">STEP 02</span>
                </div>
                <h2 className="reveal-item heading-lg text-navy mb-6">
                  DOCUMENT ANALYSIS
                </h2>
                <p className="reveal-item text-lg text-slate leading-relaxed mb-8">
                  We thoroughly review all documentation to identify discrepancies, hidden terms, and potential violations.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: LEGAL-GRADE FRAUD REPORT */}
        <section
          ref={reportRef}
          className="w-full py-20 lg:py-28 px-6 lg:px-[8vw]"
        >
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <div className="reveal-item flex items-center justify-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-cyan/10 flex items-center justify-center">
                  <ClipboardList className="w-7 h-7 text-cyan" />
                </div>
                <span className="micro-label text-slate">STEP 03</span>
              </div>
              <h2 className="reveal-item heading-lg text-navy mb-4">
                LEGAL-GRADE FRAUD REPORT
              </h2>
              <p className="reveal-item text-lg text-slate max-w-2xl mx-auto">
                A comprehensive, professionally structured report designed for review and potential escalation.
              </p>
            </div>

            <div className="reveal-item grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'Structured, professional report',
                  description: 'Clear organization and formatting for easy review.',
                },
                {
                  title: 'Legal violations identified',
                  description: 'Specific regulations and standards that may have been breached.',
                },
                {
                  title: 'Financial impact outlined',
                  description: 'Detailed analysis of costs, overpayments, and losses.',
                },
                {
                  title: 'Supporting evidence compiled',
                  description: 'All documentation organized and referenced.',
                },
                {
                  title: 'Designed for disputes',
                  description: 'Formatted for FTC, CFPB, and Attorney General complaints.',
                },
                {
                  title: 'Ready for legal review',
                  description: 'Structured to meet professional legal standards.',
                },
              ].map((item, index) => (
                <div key={index} className="card-white p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-cyan/10 flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-cyan" />
                    </div>
                    <h4 className="font-heading font-bold text-navy text-sm">
                      {item.title}
                    </h4>
                  </div>
                  <p className="text-slate text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 4: CASE PREPARATION */}
        <section
          ref={preparationRef}
          className="w-full py-20 lg:py-28 px-6 lg:px-[8vw] bg-navy"
        >
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <div className="reveal-item flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-cyan/20 flex items-center justify-center">
                    <FolderOpen className="w-7 h-7 text-cyan" />
                  </div>
                  <span className="micro-label text-white/50">STEP 04</span>
                </div>
                <h2 className="reveal-item heading-lg text-white mb-6">
                  CASE PREPARATION
                </h2>
                <p className="reveal-item text-lg text-white/70 leading-relaxed">
                  Your case is organized and prepared for potential escalation, with all documentation structured for maximum effectiveness.
                </p>
              </div>

              <div className="reveal-item">
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    {
                      title: 'Organized documentation',
                      description: 'All files, contracts, and evidence properly catalogued.',
                    },
                    {
                      title: 'Complaint-ready formatting',
                      description: 'Structured for submission to regulatory bodies.',
                    },
                    {
                      title: 'Built for escalation',
                      description: 'Prepared for legal partner review if needed.',
                    },
                    {
                      title: 'Clear case structure',
                      description: 'Logical presentation of facts and findings.',
                    },
                  ].map((item, index) => (
                    <div key={index} className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10">
                      <h4 className="font-heading font-bold text-white text-sm mb-2">
                        {item.title}
                      </h4>
                      <p className="text-white/60 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: LEGAL PARTNER ESCALATION */}
        <section
          ref={escalationRef}
          className="w-full py-20 lg:py-28 px-6 lg:px-[8vw]"
        >
          <div className="max-w-4xl mx-auto">
            <div className="card-white p-8 lg:p-12">
              <div className="flex flex-col lg:flex-row lg:items-center gap-6 mb-8">
                <div className="w-16 h-16 rounded-2xl bg-cyan/10 flex items-center justify-center flex-shrink-0">
                  <Scale className="w-8 h-8 text-cyan" />
                </div>
                <div>
                  <span className="micro-label text-slate">WHEN APPROPRIATE</span>
                  <h2 className="heading-md text-navy">LEGAL PARTNER ESCALATION</h2>
                </div>
              </div>

              <div className="reveal-item space-y-6 mb-8">
                <p className="text-lg text-slate leading-relaxed">
                  In some cases, your fraud report may be escalated to independent legal partners for review and potential legal action.
                </p>

                <div className="grid sm:grid-cols-3 gap-6 pt-6 border-t border-slate/10">
                  {[
                    {
                      title: 'Case Review',
                      description: 'Independent legal partners review qualified cases.',
                    },
                    {
                      title: 'Separate Services',
                      description: 'Legal services are provided independently.',
                    },
                    {
                      title: 'Qualification Required',
                      description: 'Escalation only applies if your case qualifies.',
                    },
                  ].map((item, index) => (
                    <div key={index}>
                      <h4 className="font-heading font-bold text-navy text-sm mb-2">
                        {item.title}
                      </h4>
                      <p className="text-slate text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="reveal-item bg-slate/5 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <Gavel className="w-6 h-6 text-cyan flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-heading font-bold text-navy text-sm mb-2">
                      Important Notice
                    </h4>
                    <p className="text-slate text-sm leading-relaxed">
                      Solar Release Co. is a consumer advocacy organization and not a law firm. We do not provide legal advice or representation. Legal services are provided separately by independent, licensed attorneys through direct engagement if your case qualifies.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: CTA */}
        <section
          ref={ctaRef}
          className="w-full py-20 lg:py-28 px-6 lg:px-[8vw] bg-white"
        >
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="reveal-item heading-lg text-navy mb-6">
              READY TO GET STARTED?
            </h2>
            <p className="reveal-item text-lg text-slate leading-relaxed mb-10">
              Start your free fraud investigation today. No cost. No obligation. Just clarity.
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