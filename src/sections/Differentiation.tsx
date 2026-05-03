import { useRef, useLayoutEffect } from 'react';
import { X, Check } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const othersPoints = [
  'Push you to sign or pay before fully understanding your situation',
  'Little to no real investigation into what actually happened',
  'No structured documentation to support your case',
  'No clear path toward resolution or escalation',
];

const ourPoints = [
  'We build your case before recommending next steps',
  'Full fraud investigation based on your actual situation',
  'Structured documentation designed for disputes and escalation',
  'Reviewed by legal partners to support resolution, including cancellation when justified',
];

export default function Differentiation() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const ruleRef = useRef<HTMLDivElement>(null);
  const comparisonRef = useRef<HTMLDivElement>(null);

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
        { x: '-60vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        headlineRef.current,
        { x: '40vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.05
      );

      scrollTl.fromTo(
        ruleRef.current,
        { scaleX: 0 },
        { scaleX: 1, ease: 'none' },
        0.1
      );

      const bullets = comparisonRef.current?.querySelectorAll('.compare-item');
      if (bullets) {
        scrollTl.fromTo(
          bullets,
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.015, ease: 'none' },
          0.12
        );
      }

      // SETTLE (30% - 70%): hold

      // EXIT (70% - 100%)
      scrollTl.fromTo(
        imageRef.current,
        { x: 0, opacity: 1 },
        { x: '-22vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        headlineRef.current,
        { x: 0, opacity: 1 },
        { x: '18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        ruleRef.current,
        { scaleX: 1, opacity: 1 },
        { scaleX: 0.5, opacity: 0, ease: 'power2.in' },
        0.72
      );

      if (bullets) {
        scrollTl.fromTo(
          bullets,
          { y: 0, opacity: 1 },
          { y: '-8vh', opacity: 0, stagger: 0.01, ease: 'power2.in' },
          0.72
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-pinned bg-cloud flex items-center z-40"
    >
      <div className="w-full h-full flex items-center px-6 lg:px-0">
        {/* Left Image Card */}
        <div
          ref={imageRef}
          className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 ml-[8vw]"
          style={{
            width: '40vw',
            maxWidth: '560px',
            height: '72vh',
            maxHeight: '640px',
          }}
        >
          <div className="card-white w-full h-full overflow-hidden">
            <img
              src="/images/whyus_professional_review.jpg"
              alt="Professional reviewing documents"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right Content */}
        <div className="w-full lg:w-1/2 lg:ml-auto lg:pr-[8vw] lg:pl-[4vw] flex flex-col justify-center">
          {/* Headline */}
          <h2
            ref={headlineRef}
            className="heading-lg text-navy mb-6"
          >
            WHY HOMEOWNERS TURN TO SOLAR RELEASE CO. AFTER THINGS GO WRONG
          </h2>

          {/* Accent Rule */}
          <div
            ref={ruleRef}
            className="accent-rule w-24 mb-8 origin-left"
          />

          {/* Comparison */}
          <div ref={comparisonRef} className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Others Column */}
            <div>
              <h3 className="font-heading font-bold text-slate text-sm uppercase tracking-wider mb-4">
                Others
              </h3>
              <ul className="space-y-3">
                {othersPoints.map((point, index) => (
                  <li
                    key={index}
                    className="compare-item flex items-start gap-3 text-slate"
                  >
                    <X className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm lg:text-base">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Solar Release Co. Column */}
            <div>
              <h3 className="font-heading font-bold text-cyan text-sm uppercase tracking-wider mb-4">
                Solar Release Co.
              </h3>
              <ul className="space-y-3">
                {ourPoints.map((point, index) => (
                  <li
                    key={index}
                    className="compare-item flex items-start gap-3 text-navy"
                  >
                    <Check className="w-5 h-5 text-cyan flex-shrink-0 mt-0.5" />
                    <span className="text-sm lg:text-base font-medium">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Micro Lines */}
          <div className="mt-8 pt-6 border-t border-slate/10">
            <p className="text-slate text-sm mb-2">
              Most clients come to us after realizing something wasn't right — we focus on building the case that can help fix it.
            </p>
            <p className="text-navy text-sm font-medium">
              The difference isn't advice — it's how your case is built.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}