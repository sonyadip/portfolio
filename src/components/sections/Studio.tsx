"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExperienceCard } from "./ExperienceCard";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface StudioProps {
  id?: string;
  text?: string;
  imageSrc?: string;
  imageAlt?: string;
}

const DEFAULT_TEXT =
  "Hi, I'm Sony — a website developer based in Bali with nearly 4 years of experience working with WordPress and Shopify. I turn Figma designs into responsive, functional websites, and work across development, testing, and launch. I also handle the things that come after, including troubleshooting, performance optimisation, basic SEO implementation, cross-browser testing, and ongoing website maintenance.";

export function Studio({
  id = "studio",
  text = DEFAULT_TEXT,
  imageSrc = "/images/sony-pratama.webp",
  imageAlt = "Sony Pratama - Website Developer",
}: StudioProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const photoRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const textEl = textRef.current;
    const photoEl = photoRef.current;
    if (!section || !textEl) return;

    const wordEls = textEl.querySelectorAll<HTMLElement>(".studio-word");
    if (wordEls.length === 0) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=140%",
          pin: true,
          scrub: 0.65,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to({}, { duration: 0.1 });

      tl.fromTo(
        wordEls,
        { opacity: 0.22 },
        {
          opacity: 1,
          stagger: 0.06,
          ease: "power1.inOut",
        },
        "+=0.05"
      );

      if (photoEl) {
        tl.fromTo(
          photoEl,
          { y: 22, rotate: -7.5 },
          { y: -22, rotate: -4.5, ease: "none" },
          0.1
        );
      }

      tl.to({}, { duration: 0.4 });
    });

    mm.add("(max-width: 1023px)", () => {
      gsap.fromTo(
        wordEls,
        { opacity: 0.25 },
        {
          opacity: 1,
          stagger: 0.03,
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: textEl,
            start: "top 80%",
            end: "bottom 45%",
            scrub: 0.5,
          },
        }
      );
    });

    if (typeof document !== "undefined" && document.fonts) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
      });
    }

    return () => mm.revert();
  }, []);

  const words = text.split(" ");

  return (
    <section
      id={id}
      ref={sectionRef}
      className="relative flex min-h-[100svh] w-full flex-col justify-center bg-[#ebe8e3] py-fluid-80 sm:py-fluid-100 lg:py-0 overflow-visible lg:overflow-hidden select-none"
    >
      <h2 className="sr-only">About &amp; Experience</h2>
      <div
        ref={containerRef}
        className="relative w-full px-fluid-20 sm:px-fluid-30 lg:px-fluid-32 box-border"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-fluid-32 lg:gap-fluid-56 xl:gap-fluid-72 items-center w-full">
          <div className="order-2 lg:order-1 lg:col-span-5 xl:col-span-5 select-text pointer-events-auto">
            <ExperienceCard />
          </div>

          <div className="order-1 lg:order-2 lg:col-span-7 xl:col-span-7 pr-0 lg:pr-fluid-20">
            <p
              ref={textRef}
              className="font-montreal text-lead font-medium text-[#0a0a0a] leading-[1.24] tracking-[-0.018em] text-fluid-20 sm:text-fluid-22 xl:text-fluid-26"
            >
              <span
                aria-hidden="true"
                className="relative z-1 float-right mb-fluid-12 ml-fluid-14 mt-fluid-2 w-[32%] max-w-[150px] sm:mb-0 sm:mt-fluid-4 sm:ml-fluid-16 sm:w-[26%] sm:max-w-none lg:w-[30%] lg:max-w-none [shape-margin:calc(14/var(--base-size)*var(--base-vw))] sm:[shape-margin:calc(16/var(--base-size)*var(--base-vw))]"
              >
                <span
                  ref={photoRef}
                  className="pointer-events-auto relative block aspect-square -rotate-[6deg] overflow-hidden rounded-[2px] shadow-[0_18px_40px_-12px_rgba(10,10,10,0.28)] transition-transform duration-500 hover:scale-105"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imageSrc}
                    alt={imageAlt}
                    width={300}
                    height={300}
                    fetchPriority="high"
                    decoding="async"
                    className="absolute -left-[5%] -top-[4%] w-[110%] h-[105%] object-cover object-top max-w-none select-none pointer-events-none"
                  />
                </span>
              </span>

              {words.map((word, index) => (
                <span
                  key={index}
                  className="studio-word inline-block mr-[0.27em] opacity-25 text-[#0a0a0a] will-change-[opacity]"
                >
                  {word}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
