import { useRef, useLayoutEffect } from 'react';
import { ExternalLink, Scale, FileCheck, ArrowUpRight, Users } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const partnerPoints = [
  { icon: Users, text: 'Independent legal partners review qualified cases' },
  { icon: FileCheck, text: 'Fraud reports structured for legal use and dispute support' },
  { icon: ArrowUpRight, text: 'Escalation available when appropriate' },
  { icon: Scale, text: 'Designed to strengthen your position before legal action' },
];

export default function LegalPartner() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const ruleRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);

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

      scrollTl.fromTo(
        bodyRef.current,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.12
      );

      scrollTl.fromTo(
        linkRef.current,
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.16
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

      scrollTl.fromTo(
        bodyRef.current,
        { y: 0, opacity: 1 },
        { y: '-8vh', opacity: 0, ease: 'power2.in' },
        0.72
      );

      scrollTl.fromTo(
        linkRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.78
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="legal"
      className="section-pinned bg-cloud flex items-center z-[60]"
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
              src="/images/legal_partner_meeting.jpg"
              alt="Legal partner meeting"
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
            BUILT FOR LEGAL REVIEW AND ESCALATION WHEN NEEDED
          </h2>

          {/* Accent Rule */}
          <div
            ref={ruleRef}
            className="accent-rule w-24 mb-8 origin-left"
          />

          {/* Body Content */}
          <div ref={bodyRef}>
            <p className="text-base lg:text-lg text-slate leading-relaxed mb-6">
              We are not a law firm — but we work closely with experienced independent legal partners who review fraud reports and handle escalated cases when appropriate.
            </p>
            
            <p className="text-base text-slate leading-relaxed mb-8">
              Every report is structured to meet legal standards and support formal disputes, complaints, and potential resolution strategies. If your case qualifies, it may be escalated for further action, including options that can lead to contract cancellation when supported by the findings.
            </p>

            {/* Partner Points */}
            <ul className="space-y-3 mb-8">
              {partnerPoints.map((point, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3"
                >
                  <point.icon className="w-5 h-5 text-cyan flex-shrink-0 mt-0.5" />
                  <span className="text-sm lg:text-base text-navy">{point.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Link */}
          <a
            ref={linkRef}
            href="https://www.whm-law.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-cyan font-semibold hover:underline group mb-4"
          >
            Learn more about our legal partners and review process
            <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          {/* Micro Line */}
          <p className="text-sm text-slate/80 mb-4">
            Legal services are provided separately through independent licensed attorneys if your case qualifies.
          </p>

          {/* Disclaimer */}
          <p className="text-xs text-slate/70 leading-relaxed border-t border-slate/20 pt-4">
            Solar Release Co. is a consumer advocacy organization and not a law firm. Legal services are provided separately by independent, licensed attorneys through direct engagement if your case qualifies.
          </p>
        </div>
      </div>
    </section>
  );
}