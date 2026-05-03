import { useRef, useLayoutEffect } from 'react';
import { Globe, ClipboardList, MapPin } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Globe,
    title: 'Nationwide support',
    description: 'Helping homeowners across all 50 states.',
  },
  {
    icon: ClipboardList,
    title: 'Structured case prep',
    description: 'Built for escalation from day one.',
  },
  {
    icon: MapPin,
    title: 'Clear next steps',
    description: 'Know exactly where you stand.',
  },
];

export default function Protection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Image animation
      gsap.fromTo(
        imageRef.current,
        { y: '8vh', scale: 0.98, opacity: 0 },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 35%',
            scrub: 0.5,
          },
        }
      );

      // Content animation
      gsap.fromTo(
        contentRef.current,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            end: 'top 40%',
            scrub: 0.5,
          },
        }
      );

      // Cards animation
      const cards = cardsRef.current?.querySelectorAll('.feature-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { y: '10vh', opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.12,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 85%',
              end: 'top 50%',
              scrub: 0.5,
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-cloud py-20 lg:py-32 z-[70]"
    >
      <div className="w-full px-6 lg:px-[8vw]">
        {/* Wide Image Card */}
        <div
          ref={imageRef}
          className="w-full mb-12 lg:mb-16"
        >
          <div 
            className="card-white overflow-hidden"
            style={{ height: 'clamp(280px, 46vh, 420px)' }}
          >
            <img
              src="/images/protection_office_wide.jpg"
              alt="Professional office environment"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Content */}
        <div ref={contentRef} className="max-w-3xl mb-12 lg:mb-16">
          <h2 className="heading-lg text-navy mb-6">
            BUILT AROUND CONSUMER PROTECTION
          </h2>
          <p className="text-base lg:text-lg text-slate leading-relaxed mb-4">
            We follow FTC, CFPB, and Attorney General complaint standards.
          </p>
          <p className="text-base text-slate leading-relaxed">
            Your case is prepared for escalation from day one—structured, documented, and ready.
          </p>
        </div>

        {/* Feature Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card card-white p-6 lg:p-8"
            >
              <div className="w-12 h-12 rounded-full bg-cyan/10 flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-cyan" />
              </div>
              <h3 className="font-heading font-bold text-navy text-lg mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-slate">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}