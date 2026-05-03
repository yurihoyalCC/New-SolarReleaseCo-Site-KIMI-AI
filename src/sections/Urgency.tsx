import { useRef, useLayoutEffect } from 'react';
import { Clock, TrendingDown, Zap, Phone } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const urgencyPoints = [
  { icon: Clock, text: "Your payments continue every month — whether the system is working as promised or not" },
  { icon: TrendingDown, text: "Waiting too long can weaken your ability to dispute or challenge the agreement" },
  { icon: Zap, text: "Taking action early gives you more leverage and more options" },
];

export default function Urgency() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

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

      const items = listRef.current?.querySelectorAll('li');
      if (items) {
        scrollTl.fromTo(
          items,
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.02, ease: 'none' },
          0.1
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

      if (items) {
        scrollTl.fromTo(
          items,
          { y: 0, opacity: 1 },
          { y: '-8vh', opacity: 0, stagger: 0.01, ease: 'power2.in' },
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

  return (
    <section
      ref={sectionRef}
      className="section-pinned bg-cloud flex items-center z-[80]"
    >
      <div className="w-full h-full flex items-center px-6 lg:px-0">
        {/* Left Content */}
        <div className="w-full lg:w-1/2 lg:pl-[9vw] flex flex-col justify-center">
          {/* Headline */}
          <h2
            ref={headlineRef}
            className="heading-lg text-navy mb-8"
          >
            EVERY MONTH YOU WAIT, IT GETS HARDER TO FIX
          </h2>

          {/* Urgency Points */}
          <ul ref={listRef} className="space-y-4 mb-6">
            {urgencyPoints.map((point, index) => (
              <li
                key={index}
                className="flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-full bg-cyan/10 flex items-center justify-center flex-shrink-0">
                  <point.icon className="w-5 h-5 text-cyan" />
                </div>
                <span className="text-base lg:text-lg text-navy pt-2">{point.text}</span>
              </li>
            ))}
          </ul>

          {/* Micro Line */}
          <p className="text-slate text-sm mb-8">
            Most homeowners don't realize their options until months later — when it's harder to fix.
          </p>

          {/* CTA */}
          <a
            ref={ctaRef}
            href="tel:+15551234567"
            className="btn-primary flex items-center justify-center gap-2 w-fit"
          >
            <Phone className="w-4 h-4" />
            Call Now Before Your Next Payment Hits
          </a>
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
              src="/images/timing_calendar_planning.jpg"
              alt="Calendar planning"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}