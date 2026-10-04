"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface SocialLink {
  label: string;
  href: string;
}

interface FooterProps {
  id?: string;
  label?: string;
  headlineFirstLine?: string;
  headlineSecondLine?: string;
  email?: string;
  location?: string;
  avatarSrc?: string;
  links?: SocialLink[];
  copyright?: string;
}

const DEFAULT_LINKS: SocialLink[] = [
  // { label: "EMAIL", href: "mailto:sonypratama190301@gmail.com" },
  { label: "INSTAGRAM", href: "https://www.instagram.com/sonyadip/" },
  { label: "GITHUB", href: "https://github.com/sonyadip/" },
];

export function Footer({
  id = "contact",
  label = "Contact",
  headlineFirstLine = "Say hi!",
  headlineSecondLine = "Let's talk",
  email = "sonypratama190301@gmail.com",
  location = "GIANYAR, BALI",
  avatarSrc = "/images/sony-pratama.webp",
  links = DEFAULT_LINKS,
  copyright,
}: FooterProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const footerRowRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Safe fallback if clipboard permission is denied
    }
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) {
        if (line1Ref.current) line1Ref.current.style.transform = "none";
        if (line2Ref.current) line2Ref.current.style.transform = "none";
        if (labelRef.current) labelRef.current.style.opacity = "1";
        if (footerRowRef.current) {
          footerRowRef.current.style.opacity = "1";
          footerRowRef.current.style.transform = "none";
        }
        return;
      }

      if (labelRef.current) {
        gsap.set(labelRef.current, { opacity: 0, y: 12 });
      }
      if (line1Ref.current) {
        gsap.set(line1Ref.current, { y: "110%" });
      }
      if (line2Ref.current) {
        gsap.set(line2Ref.current, { y: "110%" });
      }
      if (footerRowRef.current) {
        gsap.set(footerRowRef.current, { opacity: 0, y: 24 });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 82%",
          toggleActions: "play none none none",
        },
      });

      if (labelRef.current) {
        tl.to(
          labelRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          0
        );
      }

      if (line1Ref.current) {
        tl.to(
          line1Ref.current,
          {
            y: "0%",
            duration: 0.95,
            ease: "power3.out",
          },
          0.08
        );
      }

      if (line2Ref.current) {
        tl.to(
          line2Ref.current,
          {
            y: "0%",
            duration: 0.95,
            ease: "power3.out",
          },
          0.2
        );
      }

      if (footerRowRef.current) {
        tl.to(
          footerRowRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: "power2.out",
          },
          0.38
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      id={id}
      ref={sectionRef}
      className="relative w-full bg-[#ebe8e3] text-[#111111] pt-fluid-80 pb-fluid-32 sm:pt-fluid-80 md:pt-fluid-96 overflow-hidden select-none"
      aria-label="Footer and Contact Section"
    >
      <div className="w-full px-fluid-20 sm:px-fluid-30 lg:px-fluid-32 box-border flex flex-col justify-between">
        <div
          ref={labelRef}
          className="flex flex-wrap items-center justify-between gap-fluid-16 mb-fluid-40 sm:mb-fluid-56 md:mb-fluid-64 will-change-[opacity,transform]"
        >
          <div className="flex items-center gap-fluid-12">
            <span className="font-corp inline-flex items-center px-fluid-12 py-fluid-4 rounded-[4px] text-fluid-13 font-bold uppercase tracking-[0.02em] leading-none select-none bg-[#dbdbdb] text-[#333333]">
              {label}
            </span>
            {/* <span className="font-montreal-mono text-fluid-11 sm:text-fluid-12 uppercase tracking-wider text-[#525252] hidden sm:inline">
              REMOTE / WORLDWIDE
            </span> */}
          </div>

          {/* <span className="font-montreal-mono text-fluid-11 sm:text-fluid-12 uppercase tracking-wider text-[#444444]">
            BALI · GMT+8 · AVAILABLE FOR WORK
          </span> */}
        </div>

        <div className="contact-headline mb-fluid-64 sm:mb-fluid-96 md:mb-fluid-110">
          <div className="overflow-hidden leading-[0.84] block">
            <span
              ref={line1Ref}
              className="block font-corp uppercase font-bold text-[#111111] tracking-[-0.01em] text-fluid-64 sm:text-fluid-96 md:text-fluid-140 select-none will-change-transform leading-[0.84]"
            >
              {headlineFirstLine}
            </span>
          </div>

          <div className="overflow-hidden leading-[0.84] block mt-fluid-4 sm:mt-fluid-10">
            <span
              ref={line2Ref}
              className="block font-corp uppercase font-bold text-[#111111] tracking-[-0.01em] text-fluid-64 sm:text-fluid-96 md:text-fluid-140 select-none will-change-transform leading-[0.84]"
            >
              <a
                href={`mailto:${email}`}
                className="group inline-flex items-center text-[#111111] hover:text-black transition-colors duration-300 relative py-1"
                aria-label={`${headlineSecondLine} - Send Email to ${email}`}
              >
                <span className="relative">
                  {headlineSecondLine}
                  <span
                    className="absolute -bottom-1 sm:-bottom-2 left-0 h-[4px] sm:h-[6px] md:h-[7px] w-0 bg-[#111111] transition-[width] duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:w-full pointer-events-none"
                    aria-hidden="true"
                  />
                </span>

                <svg
                  className="inline-block ml-fluid-12 sm:ml-fluid-20 md:ml-fluid-28 w-[0.6em] h-[0.6em] shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-2.5 group-hover:-translate-y-2.5"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M3 15L15 3M15 3H5M15 3V13"
                    stroke="currentColor"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </span>
          </div>
        </div>

        <div
          ref={footerRowRef}
          className="contact-footer flex flex-col md:flex-row md:items-end justify-between gap-fluid-40 sm:gap-fluid-48 pt-fluid-24 will-change-[opacity,transform]"
        >
          <div className="flex flex-col gap-fluid-10">
            <div className="group/email flex flex-wrap sm:inline-flex items-center gap-fluid-8 sm:gap-fluid-12">
              {avatarSrc && (
                <span className="w-fluid-28 h-fluid-28 rounded-[2px] overflow-hidden shrink-0 block border border-black/10 shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={avatarSrc}
                    alt="Sony Pratama"
                    width={28}
                    height={28}
                    decoding="async"
                    className="w-full h-full object-cover block"
                  />
                </span>
              )}

              <a
                href={`mailto:${email}`}
                className="font-montreal text-fluid-14 sm:text-fluid-15 md:text-fluid-16 text-[#111111] hover:text-black font-medium transition-colors break-all sm:break-normal"
              >
                {email}
              </a>

              <button
                type="button"
                onClick={handleCopyEmail}
                aria-label="Copy email address"
                title={copied ? "Copied to clipboard!" : "Copy email address"}
                className="relative inline-flex items-center justify-center h-fluid-28 px-fluid-8 rounded-[4px] border border-black/15 bg-transparent hover:bg-[#111111] hover:text-[#ebe8e3] text-[#444444] transition-all text-xs cursor-pointer select-none"
              >
                {copied ? (
                  <span className="font-corp font-bold text-fluid-13 tracking-wide text-emerald-600">
                    COPIED!
                  </span>
                ) : (
                  <svg
                    className="w-3.5 h-3.5"
                    viewBox="0 0 13 13"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="4.5" y="4.5" width="7" height="7" rx="1.2" />
                    <path d="M1.5 8.5V2.5a1 1 0 0 1 1-1h6" />
                  </svg>
                )}
              </button>
            </div>

            <div className="flex items-center gap-fluid-8 font-montreal text-fluid-13 sm:text-fluid-14 text-[#444444]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#111111]" />
              <span className="font-montreal-mono font-medium text-[#111111]">{location}</span>
              <span className="text-[#525252] font-mono text-fluid-11 sm:text-fluid-12 ml-1">
                · INDONESIA (GMT+8)
              </span>
            </div>
          </div>

          <nav
            aria-label="Social Links"
            className="flex flex-wrap items-center gap-fluid-16 sm:gap-fluid-24 md:gap-fluid-32"
          >
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  link.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="font-corp font-bold uppercase text-fluid-17 sm:text-fluid-18 tracking-[0.02em] text-[#555555] hover:text-[#111111] transition-colors relative py-fluid-4 group/link"
              >
                <span>{link.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#111111] transition-[width] duration-300 ease-out group-hover/link:w-full" />
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-fluid-56 sm:mt-fluid-32 pt-fluid-24 border-t border-[#bababa] flex flex-col sm:flex-row items-center justify-between gap-fluid-12 text-center sm:text-left text-fluid-12 font-montreal text-[#525252]">
          <p className=" uppercase">
            {copyright ||
              `© ${new Date().getFullYear()} | Sony Pratama`}
          </p>
          <p className="font-montreal-mono text-fluid-11 text-[#525252]">
            ALL RIGHTS RESERVED
          </p>
        </div>
      </div>
    </footer>
  );
}
