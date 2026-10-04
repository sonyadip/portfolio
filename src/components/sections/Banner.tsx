"use client";

import React, { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";

if (typeof window !== "undefined") {
  gsap.registerPlugin(CustomEase);
  try {
    CustomEase.create("ease-inout-1", "0.496, 0.004, 0, 1");
  } catch {}
}

interface BannerProps {
  onNameLanded?: () => void;
  onIntroComplete?: () => void;
}

export function Banner({ onNameLanded, onIntroComplete }: BannerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const clipWrapperRef = useRef<HTMLDivElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const bgOverlayRef = useRef<HTMLDivElement>(null);
  const sonyWordRef = useRef<HTMLSpanElement>(null);
  const pratamaWordRef = useRef<HTMLSpanElement>(null);
  const spaceWordRef = useRef<HTMLSpanElement>(null);
  const words = ["SONY", "PRATAMA"];

  const onNameLandedRef = useRef(onNameLanded);
  onNameLandedRef.current = onNameLanded;
  const onIntroCompleteRef = useRef(onIntroComplete);
  onIntroCompleteRef.current = onIntroComplete;

  const getCenterDeltaY = useCallback(() => {
    const el = containerRef.current || h1Ref.current;
    if (!el) return 0;
    const rect = el.getBoundingClientRect();
    const elCenter = rect.top + rect.height / 2;
    const screenCenter = window.innerHeight / 2;
    return elCenter - screenCenter;
  }, []);

  useEffect(() => {
    const h1 = h1Ref.current;
    const subtitle = subtitleRef.current;
    const bgOverlay = bgOverlayRef.current;
    const clipWrapper = clipWrapperRef.current;
    const sonyWord = sonyWordRef.current;
    const pratamaWord = pratamaWordRef.current;
    const spaceWord = spaceWordRef.current;
    if (!h1 || !subtitle || !sonyWord || !pratamaWord) return;

    const charItems = h1.querySelectorAll<HTMLElement>(".char-item");
    const u: HTMLElement[] = [];
    const c: HTMLElement[] = [];
    const cleanupFns: (() => void)[] = [];

    const ctx = gsap.context(() => {
      if (bgOverlay) {
        gsap.set(bgOverlay, { opacity: 1, display: "block" });
      }
      gsap.set(subtitle, { opacity: 0, y: 12 });
      if (clipWrapper) {
        gsap.set(clipWrapper, { opacity: 0 });
      }

      const headers = document.querySelectorAll<HTMLElement>("header");
      if (headers.length > 0) {
        gsap.set(headers, { opacity: 0, y: 12, pointerEvents: "none" });
      }

      charItems.forEach((item) => {
        const cur = item.querySelector<HTMLElement>(".char-current");
        const cl = item.querySelector<HTMLElement>(".char-clone");
        if (cur && cl) {
          u.push(cur);
          c.push(cl);
          gsap.set(item, { overflow: "clip" });
          gsap.set(cl, { position: "absolute", top: "0%", left: "100%", width: "100%", xPercent: 0, yPercent: 0 });
        }
      });

      const sonyChars = sonyWord.querySelectorAll<HTMLElement>(".char-current");
      gsap.set(sonyChars, { xPercent: 0, yPercent: -115, willChange: "transform" });

      const pratamaChars = pratamaWord.querySelectorAll<HTMLElement>(".char-current");
      gsap.set(pratamaChars, { xPercent: 0, yPercent: 115, willChange: "transform" });
      gsap.set(pratamaWord, { opacity: 0 });
      if (spaceWord) {
        gsap.set(spaceWord, { opacity: 0 });
      }

      const setupInteractiveHover = () => {
        charItems.forEach((charEl) => {
          const cur = charEl.querySelector<HTMLElement>(".char-current");
          const cl = charEl.querySelector<HTMLElement>(".char-clone");
          if (!cur || !cl) return;

          let activeTl: gsap.core.Timeline | null = null;

          const onEnter = () => {
            if (activeTl) {
              activeTl.kill();
            }
            gsap.set(cur, { xPercent: 0, yPercent: 0 });
            gsap.set(cl, { xPercent: 0, yPercent: 0 });

            activeTl = gsap.timeline({
              onComplete: () => {
                gsap.set(cur, { xPercent: 0, yPercent: 0 });
                gsap.set(cl, { xPercent: 0, yPercent: 0 });
                activeTl = null;
              },
            });

            activeTl
              .fromTo(
                cur,
                { xPercent: 0 },
                { xPercent: -100, duration: 0.8, ease: "expo.out" }
              )
              .fromTo(
                cl,
                { xPercent: 0 },
                { xPercent: -100, duration: 0.8, ease: "expo.out" },
                "<+=0.18"
              );
          };

          charEl.addEventListener("mouseenter", onEnter);
          charEl.addEventListener("touchstart", onEnter, { passive: true });

          cleanupFns.push(() => {
            if (activeTl) activeTl.kill();
            charEl.removeEventListener("mouseenter", onEnter);
            charEl.removeEventListener("touchstart", onEnter);
          });
        });
      };

      const runIntro = () => {
        const deltaY = getCenterDeltaY();

        if (bgOverlay) {
          gsap.set(bgOverlay, { opacity: 1, display: "block" });
        }

        gsap.set(subtitle, {
          opacity: 0,
          y: 12,
        });

        if (headers.length > 0) {
          gsap.set(headers, { opacity: 0, y: 12, pointerEvents: "none" });
        }

        const screenCenterX = window.innerWidth / 2;
        const sonyRect = sonyWord.getBoundingClientRect();
        const sonyCenterX = sonyRect.left + sonyRect.width / 2;
        const deltaX = screenCenterX - sonyCenterX;

        gsap.set(clipWrapper, {
          y: -deltaY,
          opacity: 1,
          willChange: "transform",
        });

        gsap.set(h1, {
          y: 0,
          yPercent: 0,
          color: "#ffffff",
          opacity: 1,
          willChange: "color",
        });

        gsap.set(sonyWord, {
          x: deltaX,
          willChange: "transform",
        });

        gsap.set(sonyChars, {
          yPercent: -115,
          xPercent: 0,
          willChange: "transform",
        });

        gsap.set(pratamaWord, { opacity: 0 });
        if (spaceWord) {
          gsap.set(spaceWord, { opacity: 0 });
        }

        gsap.set(pratamaChars, {
          yPercent: 115,
          xPercent: 0,
          willChange: "transform",
        });

        gsap.set(c, {
          yPercent: 0,
          xPercent: 0,
        });

        const masterTl = gsap.timeline({
          delay: 0.2,
          onComplete: () => {
            onIntroCompleteRef.current?.();
          },
        });

        masterTl.to(
          sonyChars,
          {
            yPercent: 0,
            duration: 0.85,
            ease: "ease-inout-1",
            stagger: 0.04,
          },
          0.1
        );

        if (bgOverlay) {
          masterTl.to(
            bgOverlay,
            {
              opacity: 0,
              duration: 0.6,
              ease: "power2.inOut",
            },
            "+=0.18"
          );
        }

        masterTl.to(
          h1,
          {
            color: "#0a0a0a",
            duration: 0.55,
            ease: "power2.inOut",
          },
          "<"
        );

        masterTl.to(
          sonyWord,
          {
            x: 0,
            duration: 0.65,
            ease: "power2.out",
          },
          "<"
        );

        masterTl.set(
          [pratamaWord, ...(spaceWord ? [spaceWord] : [])],
          { opacity: 1 },
          ">"
        );

        masterTl.to(
          pratamaChars,
          {
            yPercent: 0,
            duration: 0.85,
            ease: "ease-inout-1",
            stagger: 0.04,
          },
          "<"
        );

        const rollTl = gsap.timeline();
        rollTl
          .fromTo(
            u,
            { xPercent: 0 },
            {
              xPercent: -100,
              duration: 1.2,
              ease: "ease-inout-1",
              stagger: { each: 0.05 },
            }
          )
          .fromTo(
            c,
            { xPercent: 0 },
            {
              xPercent: -100,
              duration: 0.9,
              ease: "expo.out",
              stagger: { each: 0.04 },
            },
            "<+=1"
          );

        masterTl.add(rollTl, "+=0.08");

        masterTl.to(
          clipWrapper,
          {
            y: 0,
            duration: 1.3,
            ease: "expo.inOut",
            onComplete: () => {
              onNameLandedRef.current?.();
              if (headers.length > 0) {
                headers.forEach((h) => {
                  h.style.pointerEvents = "auto";
                });
              }

              gsap.set(u, { xPercent: 0, yPercent: 0, clearProps: "transform,willChange" });
              gsap.set(c, { xPercent: 0, yPercent: 0, clearProps: "transform,willChange" });
              gsap.set(sonyWord, { clearProps: "transform,willChange" });
              gsap.set(pratamaWord, { clearProps: "opacity,transform,willChange" });
              if (spaceWord) gsap.set(spaceWord, { clearProps: "opacity,transform,willChange" });
              gsap.set(clipWrapper, { clearProps: "all" });
              gsap.set(h1, { clearProps: "all" });
              if (bgOverlay) {
                bgOverlay.style.display = "none";
              }
              setupInteractiveHover();
            },
          },
          "-=0.75"
        );

        masterTl.to(
          subtitle,
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: "power3.out",
          },
          "-=0.6"
        );

        if (headers.length > 0) {
          masterTl.to(
            headers,
            {
              opacity: 1,
              y: 0,
              duration: 0.75,
              ease: "power3.out",
              onStart: () => {
                headers.forEach((h) => {
                  h.style.pointerEvents = "auto";
                });
              },
              onComplete: () => {
                gsap.set(headers, { clearProps: "transform" });
              },
            },
            "<"
          );
        }
      };

      let isMounted = true;
      let timerId: NodeJS.Timeout | null = null;
      let started = false;
      const startIntro = () => {
        if (!isMounted || started) return;
        started = true;
        runIntro();
      };

      if (typeof document !== "undefined" && document.fonts) {
        document.fonts.ready.then(() => {
          if (!isMounted) return;
          requestAnimationFrame(startIntro);
        });
        timerId = setTimeout(startIntro, 1000);
      } else {
        startIntro();
      }

      cleanupFns.push(() => {
        isMounted = false;
        if (timerId) clearTimeout(timerId);
      });
    }, containerRef);

    return () => {
      ctx.revert();
      cleanupFns.forEach((fn) => fn());
    };
  }, [getCenterDeltaY]);

  return (
    <>
      <div
        ref={bgOverlayRef}
        className="fixed inset-0 bg-[#090909] z-20 pointer-events-none"
      />

      <section className="relative w-full flex-1 flex flex-col justify-end bg-transparent select-none z-30">
        <div className="w-full mt-auto flex flex-col justify-end">
          <div
            ref={subtitleRef}
            className="mb-fluid-8 flex items-center opacity-0"
          >
            <p className="font-semibold tracking-[0.25em] uppercase text-[#525252] font-montreal-mono text-fluid-10">
              WEBSITE DEVELOPER
            </p>
          </div>

          <div
            ref={containerRef}
            className="relative w-full flex items-end justify-center overflow-visible"
          >
            <div
              ref={clipWrapperRef}
              className="hg-1-wrapper w-full flex justify-center items-end"
            >
              <h1
                ref={h1Ref}
                className="hg-1 text-[#0a0a0a] w-full"
                aria-label="SONY PRATAMA"
              >
                <span className="inline-block whitespace-nowrap">
                  {words.map((word, wordIndex) => (
                    <React.Fragment key={wordIndex}>
                      <span
                        ref={wordIndex === 0 ? sonyWordRef : pratamaWordRef}
                        className="inline-block whitespace-nowrap"
                      >
                        {word.split("").map((char, charIndex) => (
                          <span
                            key={charIndex}
                            className="char-item relative inline-block cursor-pointer select-none"
                          >
                            <span className="char-current block">{char}</span>
                            <span className="char-clone absolute top-0 left-full w-full block">
                              {char}
                            </span>
                          </span>
                        ))}
                      </span>
                      {wordIndex < words.length - 1 && (
                        <span
                          ref={spaceWordRef}
                          className="inline-block select-none w-[0.2em] text-center"
                        >
                          &nbsp;
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </span>
              </h1>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
