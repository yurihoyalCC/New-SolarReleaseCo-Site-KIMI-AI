import { useEffect, useRef, useLayoutEffect } from 'react';
import { Phone, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const ruleRef = useRef<HTMLDivElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const microRef = useRef<HTMLParagraphElement>(null);

  // Auto-play entrance animation on load
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Image card entrance
      tl.fromTo(
        imageRef.current,
        { x: '18vw', scale: 0.96, opacity: 0 },
        { x: 0, scale: 1, opacity: 1, duration: 0.9 },
        0
      );

      // Headline words entrance
      const words = headlineRef.current?.querySelectorAll('.word');
      if (words) {
        tl.fromTo(
          words,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.03 },
          0.15
        );
      }

      // Accent rule
      tl.fromTo(
        ruleRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.5 },
        0.5
      );

      // Subheadline
      tl.fromTo(
        subheadRef.current,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        0.6
      );

      // CTAs
      tl.fromTo(
        ctaRef.current?.children || [],
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.08 },
        0.7
      );

      // Micro line
      tl.fromTo(
        microRef.current,
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4 },
        0.85
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Scroll-driven exit animation
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onLeaveBack: () => {
            // Reset all elements to visible when scrolling back to top
            gsap.set([imageRef.current, headlineRef.current, subheadRef.current, ctaRef.current, microRef.current], {
              opacity: 1, x: 0, y: 0
            });
            gsap.set(ruleRef.current, { scaleX: 1 });
          }
        },
      });

      // SETTLE phase (0% - 70%): hold position
      // EXIT phase (70% - 100%)
      scrollTl.fromTo(
        headlineRef.current,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        ruleRef.current,
        { scaleX: 1, opacity: 1 },
        { scaleX: 0.5, opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        subheadRef.current,
        { x: 0, opacity: 1 },
        { x: '-12vw', opacity: 0, ease: 'power2.in' },
        0.72
      );

      scrollTl.fromTo(
        imageRef.current,
        { x: 0, opacity: 1 },
        { x: '18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        ctaRef.current,
        { y: 0, opacity: 1 },
        { y: '10vh', opacity: 0, ease: 'power2.in' },
        0.75
      );

      scrollTl.fromTo(
        microRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.8
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="section-pinned bg-cloud flex items-center z-10"
    >
      <div className="w-full h-full flex items-center px-6 lg:px-0">
        {/* Left Content */}
        <div className="w-full lg:w-1/2 lg:pl-[9vw] flex flex-col justify-center">
          {/* Headline */}
          <div ref={headlineRef} className="mb-6">
            <h1 className="heading-xl text-navy">
              <span className="word inline-block">THINK</span>{' '}
              <span className="word inline-block">YOU</span>{' '}
              <span className="word inline-block">WERE</span>
              <br className="hidden sm:block" />
              <span className="word inline-block">MISLED</span>{' '}
              <span className="word inline-block">INTO</span>{' '}
              <span className="word inline-block">SOLAR?</span>
            </h1>
          </div>

          {/* Accent Rule */}
          <div
            ref={ruleRef}
            className="accent-rule w-[18vw] max-w-[200px] mb-6 origin-left"
          />

          {/* Subheadline */}
          <p
            ref={subheadRef}
            className="text-base lg:text-lg text-slate max-w-[34vw] leading-relaxed mb-4 hidden lg:block"
          >
            We investigate deceptive solar sales practices and build a legal-grade fraud report reviewed by our legal partners — designed to help you pursue a resolution, including cancellation when supported by your case.
          </p>
          <p className="text-sm text-slate/80 leading-relaxed mb-6 hidden lg:block">
            For homeowners dealing with misleading promises, hidden fees, or systems that aren't performing as expected.
          </p>
          <p className="text-base text-slate leading-relaxed mb-8 lg:hidden">
            We investigate deceptive solar sales practices and build a legal-grade fraud report reviewed by our legal partners.
          </p>

          {/* CTAs */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 mb-8">
            <button onClick={scrollToContact} className="btn-primary flex items-center justify-center gap-2">
              Start My Free Investigation
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="tel:+15551234567"
              className="btn-outline flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              Call Now (Fastest)
            </a>
          </div>

          {/* Trust Microline */}
          <p ref={microRef} className="micro-label text-slate mb-2">
            Free fraud investigation • Legal-grade report included • Reviewed by legal partners
          </p>
          <p className="text-xs text-slate/60">
            Structured for dispute, resolution, and potential cancellation
          </p>
        </div>

        {/* Right Image Card */}
        <div
          ref={imageRef}
          className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 mr-[6vw]"
          style={{
            width: '40vw',
            maxWidth: '560px',
            height: '72vh',
            maxHeight: '640px',
          }}
        >
          <div className="card-white w-full h-full overflow-hidden">
            <img
              src="/images/hero_solar_rooftop.jpg"
              alt="Residential solar installation"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}