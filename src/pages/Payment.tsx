import { useState, useEffect, useRef } from 'react';
import { 
  Lock, 
  Shield, 
  FileText, 
  Phone, 
  CreditCard,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Mail,
  Clock,
  AlertCircle,
  ArrowRight,
  User,
  DollarSign,
  HelpCircle,
  Search,
  ClipboardList
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Header Component
function PaymentHeader() {
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
        isScrolled ? 'bg-navy/95 backdrop-blur-md shadow-lg' : 'bg-navy'
      }`}
    >
      <div className="w-full px-6 lg:px-12">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <a href="/" className="font-heading font-bold text-lg lg:text-xl text-white">
            Solar Release Co.
          </a>

          <div className="flex items-center gap-6">
            <a 
              href="tel:+15551234567" 
              className="hidden sm:flex items-center gap-2 text-white/80 hover:text-cyan transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="text-sm">(555) 123-4567</span>
            </a>
            <a 
              href="tel:+15551234567"
              className="btn-primary flex items-center gap-2 text-sm py-2.5 px-5"
            >
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline">Call Support</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

// Accordion Component for Legal Disclosures
function DisclosureAccordion({ title, children, isOpen, onToggle }: { 
  title: string; 
  children: React.ReactNode; 
  isOpen: boolean; 
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-slate/20 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-4 px-2 text-left hover:bg-slate/5 transition-colors rounded-lg"
      >
        <span className="font-heading font-bold text-navy text-sm pr-4">{title}</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-cyan flex-shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-slate flex-shrink-0" />
        )}
      </button>
      {isOpen && (
        <div className="pb-4 px-2">
          <div className="text-slate text-sm leading-relaxed">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Payment() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    caseTier: '',
    amount: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [openDisclosure, setOpenDisclosure] = useState<number | null>(null);

  const heroRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLElement>(null);
  const coversRef = useRef<HTMLElement>(null);
  const processRef = useRef<HTMLElement>(null);
  const legalRef = useRef<HTMLElement>(null);
  const supportRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      const heroContent = heroRef.current?.querySelector('.hero-content');
      if (heroContent) {
        gsap.fromTo(
          heroContent,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }
        );
      }

      // Section reveals
      const sections = [formRef, coversRef, processRef, legalRef, supportRef];
      sections.forEach((ref) => {
        if (!ref.current) return;
        const items = ref.current.querySelectorAll('.reveal-item');
        if (items.length > 0) {
          gsap.fromTo(
            items,
            { y: 25, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.5,
              stagger: 0.08,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: ref.current,
                start: 'top 80%',
                toggleActions: 'play none none none',
              },
            }
          );
        }
      });
    });

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const caseTiers = [
    { value: '', label: 'Select your case tier' },
    { value: 'tier1', label: 'Tier 1 - Initial Investigation' },
    { value: 'tier2', label: 'Tier 2 - Full Documentation' },
    { value: 'tier3', label: 'Tier 3 - Complete Case Management' },
  ];

  const disclosures = [
    {
      title: 'Solar Release Co. is not a law firm',
      content: 'Solar Release Co. is a consumer advocacy organization. We do not practice law, provide legal representation, or offer legal advice. Our services are limited to consumer advocacy, investigative support, documentation assistance, and case management.',
    },
    {
      title: 'We do not provide legal advice',
      content: 'Our team provides investigative and administrative support only. We cannot advise you on legal rights, strategies, or outcomes. For legal advice, you must consult with a licensed attorney.',
    },
    {
      title: 'Independent legal partners may review escalated matters',
      content: 'In some qualified cases, your matter may be reviewed by independent licensed attorneys. Any legal services are provided under a separate direct engagement between you and the attorney. Solar Release Co. is not a party to any attorney-client relationship.',
    },
    {
      title: 'Fees are for administrative and investigative services',
      content: 'All fees paid to Solar Release Co. are for consumer advocacy, investigative support, documentation assistance, and case management services. These fees are not contingent on any legal outcome or result.',
    },
    {
      title: 'No guarantee of specific outcomes',
      content: 'Solar Release Co. does not guarantee any specific outcome, result, or resolution of your matter. Each case is unique, and results vary based on individual circumstances.',
    },
    {
      title: 'Legal services require separate engagement',
      content: 'If legal representation is needed, you will enter into a separate agreement directly with an independent licensed attorney. Solar Release Co. fees are separate from and in addition to any legal fees.',
    },
  ];

  if (isSuccess) {
    return (
      <div className="relative bg-cloud min-h-screen">
        <PaymentHeader />
        
        <main className="pt-20">
          <section className="min-h-[80vh] flex items-center justify-center px-6 py-20">
            <div className="max-w-lg w-full">
              <div className="card-white p-8 lg:p-12 text-center">
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="heading-md text-navy mb-4">
                  PAYMENT SUCCESSFUL
                </h2>
                <p className="text-slate mb-8">
                  Thank you for your payment. Your case file has been updated and our team will continue with your case management and review process.
                </p>
                <div className="bg-slate/5 rounded-xl p-6 mb-8">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-slate text-sm">Amount Paid</span>
                    <span className="font-heading font-bold text-navy">${formData.amount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate text-sm">Case Tier</span>
                    <span className="text-navy text-sm">
                      {caseTiers.find(t => t.value === formData.caseTier)?.label.split(' - ')[0]}
                    </span>
                  </div>
                </div>
                <p className="text-slate text-sm mb-6">
                  A confirmation email has been sent to <strong>{formData.email}</strong>
                </p>
                <a 
                  href="/"
                  className="btn-primary inline-flex items-center gap-2"
                >
                  Return to Homepage
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </section>
        </main>

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

  return (
    <div className="relative bg-cloud min-h-screen">
      {/* Grain Overlay */}
      <div className="grain-overlay" />
      
      {/* Header */}
      <PaymentHeader />

      <main className="relative pt-16">
        {/* HERO SECTION */}
        <section
          ref={heroRef}
          className="relative w-full py-16 lg:py-24 overflow-hidden bg-navy"
        >
          <div className="absolute inset-0 z-0 opacity-30">
            <img
              src="/images/payment_hero.jpg"
              alt="Secure payment"
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="hero-content relative z-10 px-6 lg:px-[8vw]">
            <div className="max-w-3xl mx-auto text-center">
              <div className="flex items-center justify-center gap-2 mb-6">
                <Lock className="w-5 h-5 text-cyan" />
                <span className="micro-label text-cyan">SECURE CHECKOUT</span>
              </div>
              <h1 className="heading-xl text-white mb-6">
                SECURE PAYMENT PORTAL
              </h1>
              <p className="text-white/70 text-lg lg:text-xl max-w-2xl mx-auto mb-8">
                Fast, secure online payment for your Solar Release Co. case services.
              </p>
              
              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center justify-center gap-6">
                {[
                  { icon: Shield, text: 'Secure checkout' },
                  { icon: CheckCircle, text: 'Simple payment process' },
                  { icon: Phone, text: 'Support available' },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-2 text-white/60">
                    <item.icon className="w-4 h-4 text-cyan" />
                    <span className="text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* PAYMENT FORM SECTION */}
        <section
          ref={formRef}
          className="w-full py-12 lg:py-20 px-6 lg:px-[8vw] -mt-8"
        >
          <div className="max-w-xl mx-auto">
            <div className="reveal-item card-white p-6 lg:p-10 shadow-card">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-cyan/10 flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-cyan" />
                </div>
                <div>
                  <h2 className="font-heading font-bold text-navy text-lg">Payment Details</h2>
                  <p className="text-slate text-xs">Complete your payment securely</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-navy mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate/20 focus:border-cyan focus:ring-2 focus:ring-cyan/20 outline-none transition-all text-navy"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate/20 focus:border-cyan focus:ring-2 focus:ring-cyan/20 outline-none transition-all text-navy"
                      placeholder="Smith"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-navy mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate/20 focus:border-cyan focus:ring-2 focus:ring-cyan/20 outline-none transition-all text-navy"
                    placeholder="john.smith@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-navy mb-2">
                    Case Tier
                  </label>
                  <select
                    name="caseTier"
                    value={formData.caseTier}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate/20 focus:border-cyan focus:ring-2 focus:ring-cyan/20 outline-none transition-all text-navy bg-white"
                  >
                    {caseTiers.map(tier => (
                      <option key={tier.value} value={tier.value}>{tier.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-navy mb-2">
                    Payment Amount
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate" />
                    <input
                      type="number"
                      name="amount"
                      value={formData.amount}
                      onChange={handleChange}
                      required
                      min="1"
                      step="0.01"
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate/20 focus:border-cyan focus:ring-2 focus:ring-cyan/20 outline-none transition-all text-navy"
                      placeholder="0.00"
                    />
                  </div>
                  <p className="text-slate/70 text-xs mt-2">
                    Your payment amount is based on your case tier and service level as discussed with your Case Manager.
                  </p>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full flex items-center justify-center gap-2 py-4"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-navy/30 border-t-navy rounded-full animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        Pay Securely Now
                      </>
                    )}
                  </button>
                </div>

                <div className="text-center">
                  <button
                    type="button"
                    className="text-cyan text-sm hover:underline"
                    onClick={() => alert('Please call our support team at (555) 123-4567 for alternate payment options.')}
                  >
                    If your card was declined, click here for alternate payment options
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* WHAT PAYMENT COVERS */}
        <section
          ref={coversRef}
          className="w-full py-16 lg:py-24 px-6 lg:px-[8vw] bg-white"
        >
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="reveal-item heading-lg text-navy mb-4">
                WHAT YOUR PAYMENT COVERS
              </h2>
              <div className="reveal-item accent-rule w-20 mx-auto" />
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: User,
                  title: 'Consumer advocacy services',
                  description: 'Dedicated support throughout your case.',
                },
                {
                  icon: Search,
                  title: 'Fraud investigation support',
                  description: 'Thorough review of your solar agreement.',
                },
                {
                  icon: FileText,
                  title: 'Document review and preparation',
                  description: 'Professional analysis and organization.',
                },
                {
                  icon: ClipboardList,
                  title: 'Case management and coordination',
                  description: 'Ongoing oversight of your matter.',
                },
                {
                  icon: Shield,
                  title: 'Fraud report development',
                  description: 'Structured documentation for your case.',
                },
                {
                  icon: CheckCircle,
                  title: 'Administrative support',
                  description: 'Handling of paperwork and filings.',
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="reveal-item card-white p-6 hover:shadow-card transition-shadow"
                >
                  <div className="w-12 h-12 rounded-full bg-cyan/10 flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-cyan" />
                  </div>
                  <h3 className="font-heading font-bold text-navy text-sm mb-2">
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

        {/* PROCESS STEPS */}
        <section
          ref={processRef}
          className="w-full py-16 lg:py-24 px-6 lg:px-[8vw]"
        >
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="reveal-item heading-lg text-navy mb-4">
                WHAT HAPPENS AFTER PAYMENT
              </h2>
              <div className="reveal-item accent-rule w-20 mx-auto" />
            </div>

            <div className="reveal-item grid sm:grid-cols-3 gap-8">
              {[
                {
                  step: '01',
                  title: 'Payment Submitted',
                  description: 'Your secure payment is processed and confirmed.',
                },
                {
                  step: '02',
                  title: 'Case File Updated',
                  description: 'Your case file is updated and prepared for next steps.',
                },
                {
                  step: '03',
                  title: 'Continued Management',
                  description: 'Our team continues your case review and coordination.',
                },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 rounded-full bg-cyan/10 flex items-center justify-center mx-auto mb-5">
                    <span className="font-heading font-bold text-cyan text-xl">{item.step}</span>
                  </div>
                  <h3 className="font-heading font-bold text-navy text-base mb-3">
                    {item.title}
                  </h3>
                  <p className="text-slate text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="reveal-item mt-12 text-center">
              <p className="text-slate text-sm">
                <AlertCircle className="w-4 h-4 inline-block mr-2 text-cyan" />
                If additional documentation or next steps are needed, your Case Manager will contact you.
              </p>
            </div>
          </div>
        </section>

        {/* LEGAL DISCLOSURES */}
        <section
          ref={legalRef}
          className="w-full py-16 lg:py-24 px-6 lg:px-[8vw] bg-navy"
        >
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="reveal-item heading-lg text-white mb-4">
                IMPORTANT SERVICE INFORMATION
              </h2>
              <p className="reveal-item text-white/60">
                Please review the following important information about our services.
              </p>
            </div>

            <div className="reveal-item bg-white rounded-2xl p-6 lg:p-8">
              {disclosures.map((disclosure, index) => (
                <DisclosureAccordion
                  key={index}
                  title={disclosure.title}
                  isOpen={openDisclosure === index}
                  onToggle={() => setOpenDisclosure(openDisclosure === index ? null : index)}
                >
                  {disclosure.content}
                </DisclosureAccordion>
              ))}
            </div>
          </div>
        </section>

        {/* SUPPORT SECTION */}
        <section
          ref={supportRef}
          className="w-full py-16 lg:py-24 px-6 lg:px-[8vw] bg-white"
        >
          <div className="max-w-3xl mx-auto text-center">
            <div className="reveal-item w-16 h-16 rounded-full bg-cyan/10 flex items-center justify-center mx-auto mb-6">
              <HelpCircle className="w-8 h-8 text-cyan" />
            </div>
            
            <h2 className="reveal-item heading-lg text-navy mb-4">
              NEED PAYMENT ASSISTANCE?
            </h2>
            
            <p className="reveal-item text-slate text-lg mb-10 max-w-xl mx-auto">
              If you have questions about your payment amount, alternate payment methods, or your case status, our team is here to help.
            </p>

            <div className="reveal-item grid sm:grid-cols-2 gap-6 max-w-lg mx-auto mb-10">
              <div className="card-white p-6">
                <Phone className="w-6 h-6 text-cyan mx-auto mb-3" />
                <p className="text-slate text-sm mb-1">Call Support</p>
                <a 
                  href="tel:+15551234567"
                  className="font-heading font-bold text-navy hover:text-cyan transition-colors"
                >
                  (555) 123-4567
                </a>
              </div>
              <div className="card-white p-6">
                <Mail className="w-6 h-6 text-cyan mx-auto mb-3" />
                <p className="text-slate text-sm mb-1">Email Client Care</p>
                <a 
                  href="mailto:support@solarrelease.co"
                  className="font-heading font-bold text-navy hover:text-cyan transition-colors text-sm"
                >
                  support@solarrelease.co
                </a>
              </div>
            </div>

            <div className="reveal-item flex items-center justify-center gap-2 text-slate text-sm">
              <Clock className="w-4 h-4" />
              <span>Business Hours: Monday–Friday, 9am–6pm EST</span>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="w-full py-16 lg:py-24 px-6 lg:px-[8vw]">
          <div className="max-w-2xl mx-auto text-center">
            <Lock className="w-10 h-10 text-cyan mx-auto mb-6" />
            <h2 className="reveal-item heading-lg text-navy mb-4">
              COMPLETE YOUR PAYMENT SECURELY
            </h2>
            <p className="reveal-item text-slate text-lg mb-8">
              Your case matters. Make your payment quickly and securely online, or contact our team if you need assistance.
            </p>
            <div className="reveal-item flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="btn-primary flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4" />
                Pay Securely Now
              </a>
              <a 
                href="tel:+15551234567"
                className="btn-outline flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                Call Support
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