import { useRef, useLayoutEffect } from 'react';
import { Mic, FileText, Scale, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    icon: Mic,
    title: 'Fraud Interview',
    description: 'Recorded, detailed, and structured to document exactly what happened during your solar sale.',
  },
  {
    icon: FileText,
    title: 'Document Review',
    description: 'We analyze your contracts, financing, and system claims to identify inconsistencies and potential violations.',
  },
  {
    icon: Scale,
    title: 'Legal-Grade Fraud Report',
    description: 'A structured report reviewed by our legal partners, designed to support disputes, resolution, and potential cancellation when justified.',
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

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
        },
      });

      // ENTRANCE (0% - 30%)
      scrollTl.fromTo(
        imageRef.current,
        { x: '60vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        headlineRef.current,
        { x: '-40vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.05
      );

      const cards = cardsRef.current?.querySelectorAll('.step-card');
      if (cards) {
        scrollTl.fromTo(
          cards,
          { y: '30vh', scale: 0.92, opacity: 0 },
          { y: 0, scale: 1, opacity: 1, stagger: 0.04, ease: 'none' },
          0.12
        );
      }

      scrollTl.fromTo(
        ctaRef.current,
        { y: '10vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.18
      );

      // SETTLE (30% - 70%): hold

      // EXIT (70% - 100%)
      scrollTl.fromTo(
        imageRef.current,
        { x: 0, opacity: 1 },
        { x: '22vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        headlineRef.current,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      if (cards) {
        scrollTl.fromTo(
          cards,
          { y: 0, opacity: 1 },
          { y: '12vh', opacity: 0, stagger: 0.02, ease: 'power2.in' },
          0.72
        );
      }

      scrollTl.fromTo(
        ctaRef.current,
        { y: 0, opacity: 1 },
        { y: '8vh', opacity: 0, ease: 'power2.in' },
        0.78
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
      id="process"
      className="section-pinned bg-cloud flex items-center z-30"
    >
      <div className="w-full h-full flex items-center px-6 lg:px-0">
        {/* Left Content */}
        <div className="w-full lg:w-1/2 lg:pl-[9vw] flex flex-col justify-center">
          {/* Headline */}
          <div ref={headlineRef} className="mb-10">
            <h2 className="heading-lg text-navy">
              WE DON'T GUESS.
              <br />
              WE BUILD THE CASE.
            </h2>
          </div>

          {/* Step Cards */}
          <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {steps.map((step, index) => (
              <div
                key={index}
                className="step-card card-white p-5 lg:p-6"
              >
                <div className="w-10 h-10 rounded-full bg-cyan/10 flex items-center justify-center mb-4">
                  <step.icon className="w-5 h-5 text-cyan" />
                </div>
                <h3 className="font-heading font-bold text-navy text-sm lg:text-base mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-slate">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          {/* Micro Line */}
          <p className="text-slate text-sm mb-8 max-w-xl">
            Every step is designed to strengthen your position and create a path toward resolution.
          </p>

          {/* CTA */}
          <button
            ref={ctaRef}
            onClick={scrollToContact}
            className="btn-primary flex items-center justify-center gap-2 w-fit"
          >
            Start My Free Investigation
            <ArrowRight className="w-4 h-4" />
          </button>
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
              src="/images/process_consultation.jpg"
              alt="Professional consultation"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}