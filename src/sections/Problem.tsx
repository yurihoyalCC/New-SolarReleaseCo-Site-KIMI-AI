import { useRef, useLayoutEffect } from 'react';
import { AlertTriangle, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const problems = [
  'You were promised savings that never actually showed up',
  'The loan terms were explained one way, but written another',
  'Dealer fees or costs were added without being clearly disclosed',
  "Your system isn't performing like you were told — and no one has a real solution",
];

export default function Problem() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const ruleRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
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
        { x: '-60vw', rotate: -2, opacity: 0 },
        { x: 0, rotate: 0, opacity: 1, ease: 'none' },
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

      const listItems = listRef.current?.querySelectorAll('li');
      if (listItems) {
        scrollTl.fromTo(
          listItems,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.02, ease: 'none' },
          0.12
        );
      }

      scrollTl.fromTo(
        ctaRef.current,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.2
      );

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

      if (listItems) {
        scrollTl.fromTo(
          listItems,
          { y: 0, opacity: 1 },
          { y: '-10vh', opacity: 0, stagger: 0.01, ease: 'power2.in' },
          0.72
        );
      }

      scrollTl.fromTo(
        ctaRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
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
      className="section-pinned bg-cloud flex items-center z-20"
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
              src="/images/problem_family_home.jpg"
              alt="Family reviewing documents"
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
            MOST HOMEOWNERS DON'T REALIZE THIS UNTIL IT'S TOO LATE
          </h2>

          {/* Accent Rule */}
          <div
            ref={ruleRef}
            className="accent-rule w-24 mb-8 origin-left"
          />

          {/* Problem List */}
          <ul ref={listRef} className="space-y-4 mb-6">
            {problems.map((problem, index) => (
              <li
                key={index}
                className="flex items-start gap-3 text-navy"
              >
                <AlertTriangle className="w-5 h-5 text-cyan flex-shrink-0 mt-0.5" />
                <span className="text-base lg:text-lg">{problem}</span>
              </li>
            ))}
          </ul>

          {/* Micro Context Line */}
          <p className="text-slate text-sm mb-6">
            These are some of the most common signs of misleading or deceptive solar sales practices.
          </p>

          {/* CTA Link */}
          <button
            ref={ctaRef}
            onClick={scrollToContact}
            className="flex items-center gap-2 text-cyan font-semibold hover:underline group mb-4"
          >
            See if your situation qualifies for a fraud investigation
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Final Qualification Line */}
          <p className="text-navy text-sm font-medium">
            If any of these sound familiar, your situation may qualify for a structured fraud investigation.
          </p>
        </div>
      </div>
    </section>
  );
}