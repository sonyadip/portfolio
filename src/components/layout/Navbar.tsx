"use client";

import React, { useState, useEffect, useRef } from "react";
import { useLenis } from "lenis/react";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  const [timeStr, setTimeStr] = useState<string>("");
  const [hidden, setHidden] = useState<boolean>(false);
  const hiddenRef = useRef<boolean>(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Makassar",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      };
      setTimeStr(new Intl.DateTimeFormat("en-US", options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleScrollState = (currentY: number, delta: number, direction: number) => {
    if (currentY <= 60) {
      if (hiddenRef.current) {
        hiddenRef.current = false;
        setHidden(false);
      }
    } else {
      if ((direction === 1 || delta > 5) && currentY > 80) {
        if (!hiddenRef.current) {
          hiddenRef.current = true;
          setHidden(true);
        }
      } else if (direction === -1 || delta < -5) {
        if (hiddenRef.current) {
          hiddenRef.current = false;
          setHidden(false);
        }
      }
    }
  };

  useLenis((lenisInstance) => {
    handleScrollState(lenisInstance.scroll, lenisInstance.velocity, lenisInstance.direction);
  });

  useEffect(() => {
    let lastY = typeof window !== "undefined" ? window.scrollY : 0;
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          const delta = currentY - lastY;
          handleScrollState(currentY, delta, delta > 0 ? 1 : delta < 0 ? -1 : 0);
          lastY = currentY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const getItemTransition = (hideDelay: number, showDelay: number) => {
    const delay = hidden ? hideDelay : showDelay;
    return hidden
      ? `transform 380ms cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms, opacity 300ms cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`
      : `transform 450ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, opacity 380ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`;
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 z-40 select-none bg-transparent opacity-0 mix-blend-difference py-fluid-20 sm:py-fluid-24 md:py-fluid-32 px-fluid-20 sm:px-fluid-30 lg:px-fluid-32 box-border ${
          hidden ? "pointer-events-none" : "pointer-events-auto"
        }`}
        style={{ mixBlendMode: "difference" }}
      >
        <div className="flex items-center pt-fluid-4 md:pt-0 gap-fluid-20 sm:gap-fluid-32 md:gap-fluid-40 font-montreal font-semibold tracking-wider uppercase text-fluid-12 leading-none text-[#ebe8e3]">
          {/* Item 1 (Outermost left): BALI */}
          <div
            className="inline-flex items-center gap-fluid-8 whitespace-nowrap leading-none pt-fluid-2 will-change-transform"
            style={{
              transform: hidden ? "translate3d(-120%, 0, 0)" : "translate3d(0, 0, 0)",
              opacity: hidden ? 0 : 1,
              transition: getItemTransition(0, 120),
            }}
          >
            <span className="h-[0.55em] w-[0.55em] rounded-full bg-[#ebe8e3] shrink-0" />
            <span className="leading-none hidden xs:inline">BALI, INDONESIA</span>
            <span className="leading-none xs:hidden">BALI</span>
          </div>

          {/* Item 2 (Middle left): Time */}
          <span
            className="tabular-nums hidden sm:inline-flex items-center leading-none will-change-transform"
            style={{
              transform: hidden ? "translate3d(-120%, 0, 0)" : "translate3d(0, 0, 0)",
              opacity: hidden ? 0 : 1,
              transition: getItemTransition(60, 60),
            }}
          >
            <span className="leading-none">{timeStr || "12:00 PM"}</span>
            <span className="text-[#ebe8e3]/70 font-bold ml-1 leading-none">GMT+8</span>
          </span>

          {/* Item 3 (Innermost left): Status */}
          <span
            className="hidden lg:inline-flex items-center leading-none font-montreal font-semibold tracking-wider text-[#ebe8e3]/80 will-change-transform"
            style={{
              transform: hidden ? "translate3d(-120%, 0, 0)" : "translate3d(0, 0, 0)",
              opacity: hidden ? 0 : 1,
              transition: getItemTransition(120, 0),
            }}
          >
            AVAILABLE FOR WORK
          </span>
        </div>
      </header>

      <header
        className={`fixed top-0 right-0 z-40 select-none bg-transparent opacity-0 overflow-x-clip py-fluid-20 sm:py-fluid-24 md:py-fluid-32 px-fluid-20 sm:px-fluid-30 lg:px-fluid-32 box-border ${
          hidden ? "pointer-events-none" : "pointer-events-auto"
        }`}
      >
        <nav
          className="flex items-center gap-fluid-6 sm:gap-fluid-8 md:gap-fluid-10 uppercase text-fluid-12 leading-none"
          aria-label="Main Navigation"
        >
          {/* Item 1 (Innermost right): ABOUT */}
          <div
            className="inline-flex items-center will-change-transform"
            style={{
              transform: hidden ? "translate3d(120%, 0, 0)" : "translate3d(0, 0, 0)",
              opacity: hidden ? 0 : 1,
              transition: getItemTransition(120, 0),
            }}
          >
            <Button variant="outline" href="#about">
              ABOUT
            </Button>
          </div>

          {/* Item 2 (Middle right): PROJECTS */}
          <div
            className="inline-flex items-center will-change-transform"
            style={{
              transform: hidden ? "translate3d(120%, 0, 0)" : "translate3d(0, 0, 0)",
              opacity: hidden ? 0 : 1,
              transition: getItemTransition(60, 60),
            }}
          >
            <Button variant="outline" href="#projects">
              PROJECTS
            </Button>
          </div>

          {/* Item 3 (Outermost right): CONTACT */}
          <div
            className="inline-flex items-center will-change-transform"
            style={{
              transform: hidden ? "translate3d(120%, 0, 0)" : "translate3d(0, 0, 0)",
              opacity: hidden ? 0 : 1,
              transition: getItemTransition(0, 120),
            }}
          >
            <Button
              variant="solid"
              avatarSrc="/images/sony-pratama.webp"
              href="mailto:sonypratama190301@gmail.com"
            >
              CONTACT
            </Button>
          </div>
        </nav>
      </header>
    </>
  );
}
