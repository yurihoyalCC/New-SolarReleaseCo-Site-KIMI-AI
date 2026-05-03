import { useRef, useLayoutEffect } from 'react';
import { FileSearch, Gavel, Calculator, FolderOpen, Shield, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reportItems = [
  { icon: FileSearch, text: 'A clear breakdown of your contract with key clauses flagged and explained' },
  { icon: Gavel, text: 'Identification of potential legal violations and misleading representations' },
  { icon: Calculator, text: 'A financial impact analysis showing how your deal actually compares to what was promised' },
  { icon: FolderOpen, text: 'Organized supporting evidence to strengthen your case' },
  { icon: Shield, text: 'Structured documentation designed for disputes, complaints, and potential resolution' },
  { icon: FileSearch, text: 'Built to support resolution, including cancellation when justified by the findings' },
];

export default function ReportValue() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
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
          { x: '-10vw', opacity: 0 },
          { x: 0, opacity: 1, stagger: 0.02, ease: 'none' },
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
          { y: '-10vh', opacity: 0, stagger: 0.01, ease: 'power2.in' },
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
      id="report"
      className="section-pinned bg-cloud flex items-center z-50"
    >
      <div className="w-full h-full flex items-center px-6 lg:px-0">
        {/* Left Content */}
        <div className="w-full lg:w-1/2 lg:pl-[9vw] flex flex-col justify-center">
          {/* Headline */}
          <h2
            ref={headlineRef}
            className="heading-lg text-navy mb-8"
          >
            WHAT YOUR FRAUD REPORT REVEALS
          </h2>

          {/* Report Items */}
          <ul ref={listRef} className="space-y-4 mb-6">
            {reportItems.map((item, index) => (
              <li
                key={index}
                className="flex items-start gap-4"
              >
                <div className="w-2 h-2 bg-cyan rounded-sm mt-2 flex-shrink-0" />
                <div className="flex items-start gap-3">
                  <item.icon className="w-5 h-5 text-navy/60 flex-shrink-0 mt-0.5" />
                  <span className="text-base lg:text-lg text-navy">{item.text}</span>
                </div>
              </li>
            ))}
          </ul>

          {/* Micro Line */}
          <p className="text-slate text-sm mb-6">
            Your report is built after a full investigation of your specific situation.
          </p>

          {/* CTA */}
          <button
            ref={ctaRef}
            onClick={scrollToContact}
            className="btn-primary flex items-center justify-center gap-2 w-fit"
          >
            Start My Free Fraud Investigation
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
              src="/images/report_contract_closeup.jpg"
              alt="Contract documents"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}