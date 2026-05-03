import { useState, useRef, useLayoutEffect } from 'react';
import { Phone, Send, CheckCircle, Loader2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const states = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 
  'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 
  'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 
  'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 
  'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 
  'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 
  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 
  'Wisconsin', 'Wyoming'
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    state: '',
    type: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Form card animation
      gsap.fromTo(
        formCardRef.current,
        { x: '-12vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 40%',
            scrub: 0.5,
          },
        }
      );

      // Content animation
      gsap.fromTo(
        contentRef.current,
        { x: '12vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            end: 'top 40%',
            scrub: 0.5,
          },
        }
      );

      // Form fields animation
      const fields = formCardRef.current?.querySelectorAll('.form-field');
      if (fields) {
        gsap.fromTo(
          fields,
          { y: 16, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 70%',
              end: 'top 35%',
              scrub: 0.5,
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative bg-navy py-20 lg:py-32 z-[90]"
    >
      <div className="w-full px-6 lg:px-[8vw]">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Left Form Card */}
          <div
            ref={formCardRef}
            className="w-full lg:w-[40vw] lg:max-w-[560px]"
          >
            <div className="card-white p-6 lg:p-10">
              {!isSubmitted ? (
                <>
                  <h3 className="font-heading font-bold text-navy text-xl lg:text-2xl mb-6">
                    START YOUR FREE INVESTIGATION
                  </h3>
                  
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="form-field">
                      <label className="block text-sm font-medium text-navy mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-slate/20 focus:border-cyan focus:ring-2 focus:ring-cyan/20 outline-none transition-all text-navy"
                        placeholder="Your full name"
                      />
                    </div>

                    <div className="form-field">
                      <label className="block text-sm font-medium text-navy mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-slate/20 focus:border-cyan focus:ring-2 focus:ring-cyan/20 outline-none transition-all text-navy"
                        placeholder="(555) 123-4567"
                      />
                    </div>

                    <div className="form-field">
                      <label className="block text-sm font-medium text-navy mb-2">
                        State
                      </label>
                      <select
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-slate/20 focus:border-cyan focus:ring-2 focus:ring-cyan/20 outline-none transition-all text-navy bg-white"
                      >
                        <option value="">Select your state</option>
                        {states.map(state => (
                          <option key={state} value={state}>{state}</option>
                        ))}
                      </select>
                    </div>

                    <div className="form-field">
                      <label className="block text-sm font-medium text-navy mb-2">
                        Solar loan or lease?
                      </label>
                      <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-slate/20 focus:border-cyan focus:ring-2 focus:ring-cyan/20 outline-none transition-all text-navy bg-white"
                      >
                        <option value="">Select option</option>
                        <option value="loan">Solar Loan</option>
                        <option value="lease">Solar Lease / PPA</option>
                        <option value="cash">Cash Purchase</option>
                        <option value="unsure">Unsure</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary w-full flex items-center justify-center gap-2 mt-6"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Submit My Info
                        </>
                      )}
                    </button>
                  </form>

                  <p className="text-xs text-slate/70 mt-4 text-center">
                    By submitting, you agree to be contacted about your investigation.
                  </p>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-cyan/10 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-8 h-8 text-cyan" />
                  </div>
                  <h3 className="font-heading font-bold text-navy text-xl mb-4">
                    THANK YOU!
                  </h3>
                  <p className="text-slate mb-6">
                    We've received your information. A member of our team will contact you within 24 hours to discuss your case.
                  </p>
                  <p className="text-sm text-slate/70">
                    For immediate assistance, call us at <a href="tel:+15551234567" className="text-cyan font-medium">(555) 123-4567</a>
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Content */}
          <div
            ref={contentRef}
            className="flex-1 flex flex-col justify-center"
          >
            <h2 className="heading-lg text-white mb-6">
              START YOUR FREE FRAUD INVESTIGATION TODAY
            </h2>
            
            <p className="text-base lg:text-lg text-white/70 leading-relaxed mb-8">
              Tell us what happened. We'll review your situation and outline next steps—no cost, no obligation.
            </p>

            {/* Contact Info */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-cyan/10 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-cyan" />
                </div>
                <div>
                  <p className="text-sm text-white/50">Prefer to call?</p>
                  <a href="tel:+15551234567" className="text-white font-semibold hover:text-cyan transition-colors">
                    (555) 123-4567
                  </a>
                </div>
              </div>
              
              <p className="text-sm text-white/50 ml-16">
                Mon–Fri 9am–6pm
              </p>
            </div>

            {/* Alt CTA */}
            <a
              href="tel:+15551234567"
              className="btn-outline border-white text-white hover:bg-white/10 w-fit flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              Call Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}