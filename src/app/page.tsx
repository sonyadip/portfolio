"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import { useLenis } from "lenis/react";
import { Navbar } from "@/components/layout/Navbar";
import { Banner } from "@/components/sections/Banner";
import { Studio } from "@/components/sections/Studio";
import { Projects } from "@/components/sections/Projects";
import { Footer } from "@/components/layout/Footer";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Home() {
  const [isIntroActive, setIsIntroActive] = useState(true);
  const lenis = useLenis();
  const unlockedRef = useRef(false);

  const unlockScroll = useCallback(() => {
    if (unlockedRef.current) return;
    unlockedRef.current = true;
    setIsIntroActive(false);

    if (typeof window !== "undefined") {
      ScrollTrigger.refresh();
    }
  }, []);

  const handleNameLanded = useCallback(() => {
    unlockScroll();
  }, [unlockScroll]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    if (window.location.hash) {
      history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search
      );
    }

    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    const safetyTimer = setTimeout(() => {
      unlockScroll();
    }, 7500);

    return () => clearTimeout(safetyTimer);
  }, [unlockScroll]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!isIntroActive) {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.documentElement.classList.remove("overflow-hidden");
      document.body.classList.remove("overflow-hidden");

      if (lenis) {
        lenis.start();
      }
      return;
    }

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.documentElement.classList.add("overflow-hidden");
    document.body.classList.add("overflow-hidden");

    if (lenis) {
      lenis.stop();
      lenis.scrollTo(0, { immediate: true, force: true });
    }

    const preventScroll = (e: Event) => {
      e.preventDefault();
    };

    const preventKeys = (e: KeyboardEvent) => {
      const scrollKeys = [
        "ArrowUp",
        "ArrowDown",
        "PageUp",
        "PageDown",
        "Home",
        "End",
        " ",
        "Spacebar",
      ];
      if (scrollKeys.includes(e.key)) {
        e.preventDefault();
      }
    };

    window.addEventListener("wheel", preventScroll, { passive: false });
    window.addEventListener("touchmove", preventScroll, { passive: false });
    window.addEventListener("keydown", preventKeys, { passive: false });

    return () => {
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
      window.removeEventListener("keydown", preventKeys);
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.documentElement.classList.remove("overflow-hidden");
      document.body.classList.remove("overflow-hidden");

      if (lenis) {
        lenis.start();
      }
    };
  }, [isIntroActive, lenis]);

  return (
    <div className="bg-[#ebe8e3] text-[#0a0a0a] font-sans antialiased overflow-x-hidden relative selection:bg-black selection:text-white">
      <Navbar />

      <div className="h-screen min-h-screen h-[100svh] min-h-[100svh] flex flex-col justify-end px-fluid-20 sm:px-fluid-30 lg:px-fluid-32 pb-fluid-20 sm:pb-fluid-24 md:pb-fluid-32 box-border relative">
        <main className="flex-1 flex flex-col justify-end w-full">
          <Banner
            onNameLanded={handleNameLanded}
            onIntroComplete={unlockScroll}
          />
        </main>
      </div>

      <div className={isIntroActive ? "pointer-events-none select-none" : ""}>
        <Studio id="about" />
        <Projects />
        <Footer />
      </div>
    </div>
  );
}
