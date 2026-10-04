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

  return (
    <>
      <header
        className={`fixed top-0 left-0 z-40 select-none bg-transparent opacity-0 mix-blend-difference py-fluid-20 sm:py-fluid-24 md:py-fluid-32 px-fluid-20 sm:px-fluid-30 lg:px-fluid-32 box-border ${
          hidden ? "pointer-events-none" : "pointer-events-auto"
        }`}
        style={{ mixBlendMode: "difference" }}
      >
        <div
          className="flex items-center pt-fluid-4 md:pt-0 gap-fluid-20 sm:gap-fluid-32 md:gap-fluid-40 will-change-transform font-montreal font-semibold tracking-wider uppercase text-fluid-11 leading-none text-[#ebe8e3]"
          style={{
            transform: hidden ? "translate3d(-150%, 0, 0)" : "translate3d(0, 0, 0)",
            transition: "transform 400ms cubic-bezier(0.44, 0, 0.56, 1) 30ms",
          }}
        >
          <div className="inline-flex items-center gap-fluid-8 whitespace-nowrap leading-none pt-fluid-2">
            <span className="h-[0.55em] w-[0.55em] rounded-full bg-[#ebe8e3] shrink-0" />
            <span className="leading-none hidden xs:inline">BALI, INDONESIA</span>
            <span className="leading-none xs:hidden">BALI</span>
          </div>

          <span className="tabular-nums hidden sm:inline-flex items-center leading-none">
            <span className="leading-none">{timeStr || "12:00 PM"}</span>
            <span className="text-[#ebe8e3]/70 font-bold ml-1 leading-none">GMT+8</span>
          </span>

          <span className="hidden lg:inline-flex items-center leading-none font-montreal font-semibold tracking-wider text-[#ebe8e3]/80">
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
          className="flex items-center gap-fluid-6 sm:gap-fluid-8 md:gap-fluid-10 will-change-transform uppercase text-fluid-11 leading-none"
          style={{
            transform: hidden ? "translate3d(120%, 0, 0)" : "translate3d(0, 0, 0)",
            transition: "transform 400ms cubic-bezier(0.44, 0, 0.56, 1) 30ms",
          }}
          aria-label="Main Navigation"
        >
          <Button variant="outline" href="#projects">
            PROJECTS
          </Button>

          <Button variant="outline" href="#about">
            <span className="hidden sm:inline">ABOUT ME</span>
            <span className="sm:hidden">ABOUT</span>
          </Button>

          <Button
            variant="solid"
            avatarSrc="/images/sony-pratama.webp"
            href="mailto:sonypratama190301@gmail.com"
          >
            CONTACT
          </Button>
        </nav>
      </header>
    </>
  );
}
