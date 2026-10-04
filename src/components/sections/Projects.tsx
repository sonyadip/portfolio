"use client";

import React, { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Project {
  title: string;
  url: string;
  year: string;
  category: string;
  preview: string;
  label: "Personal Project" | "Juicebox / Client Project";
}

const PROJECTS: Project[] = [
  {
    title: "BAMBOOTEL",
    url: "https://www.bambootel.com/",
    year: "2026",
    category: "Hospitality / Luxury Retreat",
    preview: "/images/projects/bambootel.webp",
    label: "Juicebox / Client Project",
  },
  {
    title: "SENADDA",
    url: "https://senadda.id/",
    year: "2026",
    category: "Digital Invitation / SaaS",
    preview: "/images/projects/senadda.webp",
    label: "Personal Project",
  },
  {
    title: "MAS TRAVEL",
    url: "https://mas-travel.com/",
    year: "2026",
    category: "Visa & Immigration Services",
    preview: "/images/projects/mastravel.webp",
    label: "Juicebox / Client Project",
  },
  {
    title: "SENTADELL ASSOCIATES",
    url: "https://sentadellassociates.com/",
    year: "2025",
    category: "Professional Services / Management Consulting",
    preview: "/images/projects/sentadella.webp",
    label: "Juicebox / Client Project",
  },
  {
    title: "TAFHIGHLIGHT",
    url: "https://tafhighlight.ai/",
    year: "2025",
    category: "Aviation / SaaS",
    preview: "/images/projects/tafhighlight.webp",
    label: "Juicebox / Client Project",
  },
  {
    title: "IRISH CHAMBER",
    url: "https://irishchamber.id/",
    year: "2024",
    category: "Trade Association / Business Network",
    preview: "/images/projects/irishchamber.webp",
    label: "Juicebox / Client Project",
  },
];

interface ProjectRowProps {
  project: Project;
  onRowEnter: () => void;
  onRowLeave: () => void;
}

function ProjectRow({ project, onRowEnter, onRowLeave }: ProjectRowProps) {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const cardBgRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const titleWrapRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const metaRef = useRef<HTMLSpanElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const mobileThumbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const link = linkRef.current;
    const cardBg = cardBgRef.current;
    const thumb = thumbRef.current;
    const img = imgRef.current;
    const titleWrap = titleWrapRef.current;
    const title = titleRef.current;
    const meta = metaRef.current;
    const arrow = arrowRef.current;
    const line = lineRef.current;

    if (!link || !cardBg || !thumb || !img || !titleWrap || !title || !meta || !arrow) {
      return;
    }

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      gsap.set(link, {
        height: 100,
        paddingTop: 24,
        paddingBottom: 24,
        paddingLeft: 0,
        paddingRight: 0,
      });
      gsap.set(cardBg, { opacity: 0 });
      gsap.set(thumb, {
        width: 0,
        height: 120,
        opacity: 0,
        scale: 0.2,
        x: -128,
        marginRight: 0,
      });
      gsap.set(titleWrap, { paddingLeft: 64 });

      const onEnter = () => {
        onRowEnter();
        gsap.killTweensOf([link, cardBg, thumb, img, titleWrap, title, meta, arrow]);

        gsap.to(cardBg, {
          opacity: 1,
          duration: 0.35,
          ease: "power2.out",
        });

        if (line) line.style.opacity = "0";

        gsap.to(link, {
          height: 162,
          paddingTop: 16,
          paddingBottom: 16,
          paddingLeft: 16,
          paddingRight: 16,
          duration: 0.38,
          ease: "power3.out",
        });

        gsap.to(thumb, {
          width: 210,
          marginRight: 32,
          opacity: 1,
          scale: 1,
          x: 0,
          duration: 0.45,
          ease: "back.out(1.2)",
        });

        gsap.to(titleWrap, {
          paddingLeft: 0,
          duration: 0.38,
          ease: "power3.out",
        });

        gsap.to(img, {
          scale: 1,
          duration: 0.45,
          ease: "power2.out",
        });

        title.style.color = "#ebe8e3";
        meta.style.color = "rgb(170, 170, 170)";
        if (labelRef.current) labelRef.current.style.color = "rgb(170, 170, 170)";
        arrow.style.color = "#ebe8e3";
      };

      const onLeave = () => {
        onRowLeave();
        gsap.killTweensOf([link, cardBg, thumb, img, titleWrap, title, meta, arrow]);

        gsap.to(cardBg, {
          opacity: 0,
          duration: 0.28,
          ease: "power2.inOut",
        });

        if (line) line.style.opacity = "1";

        gsap.to(link, {
          height: 100,
          paddingTop: 24,
          paddingBottom: 24,
          paddingLeft: 0,
          paddingRight: 0,
          duration: 0.32,
          ease: "power2.inOut",
        });

        gsap.to(thumb, {
          width: 0,
          marginRight: 0,
          opacity: 0,
          scale: 0.2,
          x: -128,
          duration: 0.3,
          ease: "power2.inOut",
        });

        gsap.to(titleWrap, {
          paddingLeft: 64,
          duration: 0.32,
          ease: "power2.inOut",
        });

        gsap.to(img, {
          scale: 1.08,
          duration: 0.3,
          ease: "power2.inOut",
        });

        title.style.color = "#111111";
        meta.style.color = "rgb(85, 85, 85)";
        if (labelRef.current) labelRef.current.style.color = "rgb(119, 119, 119)";
        arrow.style.color = "rgb(85, 85, 85)";
      };

      link.addEventListener("mouseenter", onEnter);
      link.addEventListener("mouseleave", onLeave);

      return () => {
        link.removeEventListener("mouseenter", onEnter);
        link.removeEventListener("mouseleave", onLeave);
      };
    });

    mm.add("(max-width: 1023px)", () => {
      const mobileThumb = mobileThumbRef.current;
      if (!mobileThumb) return;

      gsap.fromTo(
        mobileThumb,
        {
          opacity: 0,
          y: 48,
          scale: 0.96,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: mobileThumb,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => mm.revert();
  }, [onRowEnter, onRowLeave]);

  return (
    <li className="relative w-full list-none">
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Visit ${project.title}`}
        className="group relative flex lg:hidden flex-col w-full py-fluid-28 sm:py-fluid-36 md:py-fluid-44 gap-fluid-14 sm:gap-fluid-16 md:gap-fluid-20 select-none no-underline text-inherit cursor-pointer"
      >
        <div className="flex items-center justify-between w-full gap-fluid-12">
          <h3 className="font-corp uppercase font-bold tracking-[0.01em] text-fluid-36 sm:text-fluid-44 md:text-fluid-52 leading-[0.82em] text-[#111111] m-0 group-hover:text-black">
            {project.title}
          </h3>
          <span className="shrink-0 text-[#555555] group-hover:text-black transition-colors">
            <svg
              className="w-fluid-20 h-fluid-20 sm:w-fluid-24 sm:h-fluid-24 md:w-fluid-28 md:h-fluid-28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </span>
        </div>

        <div
          ref={mobileThumbRef}
          className="w-full aspect-[1.8/1] sm:aspect-[1.6/1] overflow-hidden rounded-[8px] relative shadow-[0.24px_0.24px_1.7px_-1px_rgba(0,0,0,0.11),2px_2px_14px_-2px_rgba(0,0,0,0.15)] bg-[#dbdbdb] will-change-transform"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.preview}
            alt={project.title}
            width={800}
            height={470}
            className="w-full h-full object-cover object-top block select-none transition-transform duration-500 group-hover:scale-[1.02]"
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="w-full flex flex-col pt-fluid-2 gap-fluid-3">
          <span className="font-montreal-mono uppercase tracking-[-0.02em] text-fluid-11 text-[#777777]">
            {project.year}, {project.label}
          </span>
          <span className="font-montreal-mono uppercase tracking-[-0.02em] text-fluid-13 sm:text-fluid-14 text-[#555555]">
            {project.category}
          </span>
        </div>
      </a>

      <a
        ref={linkRef}
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Visit ${project.title}`}
        className="group relative hidden lg:flex items-center justify-between w-full select-none no-underline text-inherit cursor-pointer py-fluid-24 min-h-fluid-90"
      >
        <div
          ref={cardBgRef}
          className="absolute inset-0 rounded-[8px] bg-[#111111] pointer-events-none opacity-0 z-0"
        />

        <div className="relative z-10 flex items-center justify-between w-full min-w-0 pointer-events-none gap-fluid-16 sm:gap-fluid-32">
          <div className="shrink-0 w-[30%] lg:w-[30%] flex flex-col justify-center min-w-0 gap-fluid-4">
            <span
              ref={labelRef}
              className="font-montreal-mono uppercase tracking-[-0.02em] whitespace-nowrap truncate transition-colors duration-200 text-fluid-11 text-[#777777]"
            >
              {project.year}, {project.label}
            </span>
            <span
              ref={metaRef}
              className="font-montreal-mono uppercase tracking-[-0.02em] whitespace-nowrap truncate transition-colors duration-200 text-fluid-13 text-[#555555]"
            >
              {project.category}
            </span>
          </div>

          <div className="flex-1 min-w-0 flex items-center">
            <div
              ref={thumbRef}
              className="shrink-0 overflow-hidden rounded-[8px] relative w-0 h-fluid-120 opacity-0 mr-0 self-center shadow-[0.24px_0.24px_1.7px_-1px_rgba(0,0,0,0.11),2px_2px_14px_-2px_rgba(0,0,0,0.25)]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                ref={imgRef}
                src={project.preview}
                alt={project.title}
                width={210}
                height={120}
                className="h-full w-fluid-210 object-cover object-top block select-none scale-[1.08]"
                loading="lazy"
                decoding="async"
              />
            </div>

            <div
              ref={titleWrapRef}
              className="flex-1 min-w-0 flex items-center pl-fluid-64"
            >
              <h3
                ref={titleRef}
                className="font-corp uppercase font-bold tracking-[0.01em] transition-colors duration-200 text-fluid-64 leading-[0.8em] text-[#111111] m-0 whitespace-nowrap overflow-hidden text-ellipsis"
              >
                {project.title}
              </h3>
            </div>
          </div>

          <span
            ref={arrowRef}
            className="shrink-0 transition-colors duration-200 text-[#555555]"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </span>
        </div>
      </a>

      <div
        ref={lineRef}
        className="absolute bottom-0 left-0 right-0 h-px bg-[rgb(186,186,186)] transition-opacity duration-200 z-0 pointer-events-none"
      />
    </li>
  );
}

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const cursorBadgeRef = useRef<HTMLDivElement>(null);

  const xTo = useRef<gsap.QuickToFunc | null>(null);
  const yTo = useRef<gsap.QuickToFunc | null>(null);
  const activeRowsCount = useRef<number>(0);

  useEffect(() => {
    if (cursorBadgeRef.current) {
      gsap.set(cursorBadgeRef.current, {
        x: -9999,
        y: -9999,
        scale: 0.8,
        autoAlpha: 0,
        pointerEvents: "none",
      });

      xTo.current = gsap.quickTo(cursorBadgeRef.current, "x", {
        duration: 0.12,
        ease: "power2.out",
      });
      yTo.current = gsap.quickTo(cursorBadgeRef.current, "y", {
        duration: 0.12,
        ease: "power2.out",
      });
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (xTo.current && yTo.current) {
        xTo.current(e.clientX - 6);
        yTo.current(e.clientY - 18);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleRowEnter = useCallback(() => {
    activeRowsCount.current += 1;
    if (cursorBadgeRef.current) {
      gsap.to(cursorBadgeRef.current, {
        autoAlpha: 1,
        scale: 1,
        duration: 0.25,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
  }, []);

  const handleRowLeave = useCallback(() => {
    activeRowsCount.current = Math.max(0, activeRowsCount.current - 1);
    if (activeRowsCount.current === 0 && cursorBadgeRef.current) {
      gsap.to(cursorBadgeRef.current, {
        autoAlpha: 0,
        scale: 0.8,
        duration: 0.2,
        ease: "power2.in",
        overwrite: "auto",
      });
    }
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.from(headingRef.current, {
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 88%",
            toggleActions: "play none none none",
          },
          y: 48,
          opacity: 0,
          duration: 1,
          ease: "expo.out",
        });
      }
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        if (listRef.current) {
          const items = listRef.current.querySelectorAll<HTMLElement>("li");
          gsap.from(items, {
            scrollTrigger: {
              trigger: listRef.current,
              start: "top 84%",
              toggleActions: "play none none none",
            },
            y: 24,
            opacity: 0,
            duration: 0.65,
            stagger: 0.065,
            ease: "power3.out",
          });
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative w-full bg-[#ebe8e3] sm:pb-fluid-80"
    >
      <div
        ref={cursorBadgeRef}
        className="fixed top-0 left-0 z-50 pointer-events-none select-none hidden lg:flex items-center gap-fluid-6 px-fluid-10 py-fluid-6 rounded-[4px] bg-[#dbdbdb] text-[#111111] shadow-[0_2px_10px_rgba(0,0,0,0.15)] will-change-[transform,opacity] opacity-0 invisible -translate-x-[9999px] -translate-y-[9999px] scale-[0.8]"
      >
        <svg
          width="11"
          height="11"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="shrink-0"
        >
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
        <span className="font-montreal-mono font-bold uppercase tracking-wider leading-none text-fluid-10">
          Live Website
        </span>
      </div>

      <div className="w-full px-fluid-20 sm:px-fluid-30 lg:px-fluid-32 box-border">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-fluid-20 sm:gap-fluid-24 mb-fluid-40 sm:mb-fluid-56 md:mb-fluid-64">
          <h2
            ref={headingRef}
            className="font-corp uppercase font-bold tracking-[0.01em] text-[#111111] text-fluid-56 sm:text-fluid-72 md:text-fluid-96 leading-[0.8em] m-0"
          >
            Projects
          </h2>

          <div className="flex flex-col gap-fluid-10 sm:gap-fluid-12 sm:max-w-fluid-340 sm:pt-fluid-8 sm:text-right">
            <p className="font-montreal leading-[1.35] text-[#555555] text-fluid-13 m-0">
              Client websites I worked on at{" "}
              <a
                href="https://juicebox.co.id/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#111111] font-semibold underline underline-offset-2 decoration-[rgb(186,186,186)] hover:decoration-[#111111] transition-colors"
              >
                Juicebox Indonesia
              </a>
              , implementing provided Figma designs into responsive, functional websites ready for launch. Personal projects are built independently from the ground up.
            </p>
          </div>
        </div>

        <div className="relative w-full border-t border-[rgb(186,186,186)]">
          <ul ref={listRef} className="list-none m-0 p-0">
            {PROJECTS.map((p) => (
              <ProjectRow
                key={p.url}
                project={p}
                onRowEnter={handleRowEnter}
                onRowLeave={handleRowLeave}
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
