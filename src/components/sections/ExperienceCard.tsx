"use client";

import React from "react";
import { Button } from "@/components/ui/Button";

export function ExperienceCard() {
  return (
    <div className="w-full select-text space-y-fluid-24 sm:space-y-fluid-28">
      <div className="mb-fluid-32">
        <div className="flex items-center pb-fluid-14 sm:pb-fluid-20">
          <span className="font-corp inline-flex items-center px-fluid-10 py-fluid-4 rounded-[4px] font-bold uppercase tracking-[0.02em] leading-none text-fluid-13 bg-[#dbdbdb] text-[#333333] select-none">
            Experience
          </span>
        </div>

        <div className="space-y-fluid-18 sm:space-y-fluid-22">
          <div className="group/exp">
            <div className="flex items-start gap-fluid-12">
              <a
                href="https://juicebox.co.id/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Juicebox Indonesia"
                className="w-fluid-32 h-fluid-32 min-w-[28px] min-h-[28px] rounded-[6px] bg-white/90 border border-black/10 flex items-center justify-center p-1 shrink-0 overflow-hidden transition-transform hover:scale-105"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/logos/juicebox.webp"
                  alt="Juicebox Indonesia"
                  width={32}
                  height={32}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-contain block select-none"
                />
              </a>
              <div className="flex-1 min-w-0 pt-0.5 pb-fluid-20">
                <a
                  href="https://juicebox.co.id/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link inline-block hover:text-black transition-colors"
                >
                  <h3 className="font-corp uppercase font-bold tracking-[0.01em] text-fluid-22 sm:text-fluid-24 md:text-fluid-26 text-[#111111] group-hover/link:underline underline-offset-4 decoration-[#bababa] leading-[0.88em] m-0">
                    JUICEBOX INDONESIA
                  </h3>
                </a>
                <h4 className="font-montreal font-semibold text-fluid-14 sm:text-fluid-15 text-[#111111] leading-tight mt-fluid-4 m-0 mt-1">
                  Website Developer
                </h4>
                <p className="font-montreal-mono text-fluid-11 text-[#525252] uppercase tracking-wider mt-fluid-3 mb-0">
                  DEC 2022 — SEP 2026 · 3 YRS 10 MOS
                </p>
              </div>
            </div>
          </div>

          <div className="group/exp">
            <div className="flex items-start gap-fluid-12">
              <a
                href="https://pilarkreatif.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Pilar Kreatif"
                className="w-fluid-32 h-fluid-32 min-w-[28px] min-h-[28px] rounded-[6px] bg-white/90 flex items-center justify-center p-1 shrink-0 overflow-hidden transition-transform hover:scale-105"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/logos/pilarkreatif.webp"
                  alt="Pilar Kreatif"
                  width={32}
                  height={32}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-contain block select-none"
                />
              </a>
              <div className="flex-1 min-w-0 pt-0.5">
                <a
                  href="https://pilarkreatif.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link inline-block hover:text-black transition-colors"
                >
                  <h3 className="font-corp uppercase font-bold tracking-[0.01em] text-fluid-22 sm:text-fluid-24 md:text-fluid-26 text-[#111111] group-hover/link:underline underline-offset-4 decoration-[#bababa] leading-[0.88em] m-0">
                    PILAR KREATIF
                  </h3>
                </a>
                <h4 className="font-montreal font-semibold text-fluid-14 sm:text-fluid-15 text-[#111111] leading-tight mt-fluid-4 m-0 mt-1">
                  Frontend Web Developer · Intern
                </h4>
                <p className="font-montreal-mono text-fluid-11 text-[#525252] uppercase tracking-wider mt-fluid-3 mb-0">
                  JAN 2022 — MAR 2022 · 3 MOS
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center pb-fluid-14 sm:pb-fluid-20">
          <span className="font-corp inline-flex items-center px-fluid-10 py-fluid-4 rounded-[4px] font-bold uppercase tracking-[0.02em] leading-none text-fluid-13 bg-[#dbdbdb] text-[#333333] select-none">
            Education
          </span>
        </div>

        <div className="group/exp">
          <div className="flex items-start gap-fluid-12">
            <a
              href="https://www.pnb.ac.id/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Politeknik Negeri Bali"
              className="w-fluid-32 h-fluid-32 min-w-[28px] min-h-[28px] rounded-[6px] bg-white/90 border border-black/10 flex items-center justify-center p-1 shrink-0 overflow-hidden transition-transform hover:scale-105"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logos/pnb.webp"
                alt="Politeknik Negeri Bali"
                width={32}
                height={32}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-contain block select-none"
              />
            </a>
            <div className="flex-1 min-w-0 pt-0.5">
              <a
                href="https://www.pnb.ac.id/"
                target="_blank"
                rel="noopener noreferrer"
                className="group/link inline-block hover:text-black transition-colors"
              >
                <h3 className="font-corp uppercase font-bold tracking-[0.01em] text-fluid-22 sm:text-fluid-24 md:text-fluid-26 text-[#111111] group-hover/link:underline underline-offset-4 decoration-[#bababa] leading-[0.88em] m-0">
                  Politeknik Negeri Bali
                </h3>
              </a>
              <h4 className="font-montreal font-semibold text-fluid-14 sm:text-fluid-15 text-[#111111] leading-tight mt-fluid-4 m-0 mt-1">
                Diploma in Informatics Management (D3)
              </h4>
              <p className="font-montreal-mono text-fluid-11 sm:text-fluid-11 text-[#525252] uppercase tracking-wider mt-fluid-3 mb-0">
                2019 — 2022 · GPA 3.74 / 4.00
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-fluid-4 sm:pt-fluid-8">
        <Button
          variant="outline"
          href="/cv-sony-pratama.pdf"
          target="_blank"
          rel="noopener noreferrer"
          size="sm"
        >
          VIEW CV (PDF)
        </Button>
      </div>
    </div>
  );
}
