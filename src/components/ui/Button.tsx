"use client";

import React from "react";
import Link from "next/link";

interface ButtonProps {
  variant?: "outline" | "solid";
  size?: "sm" | "md" | "lg";
  avatarSrc?: string;
  href?: string;
  target?: string;
  rel?: string;
  className?: string;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLElement>;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export function Button({
  variant = "solid",
  size = "md",
  avatarSrc,
  href,
  target,
  rel,
  className = "",
  children,
  onClick,
  type = "button",
  disabled,
}: ButtonProps) {
  const heightClass =
    size === "sm" ? "h-fluid-38 sm:h-fluid-40" : size === "lg" ? "h-fluid-48 sm:h-fluid-50" : "h-fluid-40 sm:h-fluid-44";
  const paddingClass = avatarSrc ? "px-fluid-16 pl-fluid-8 gap-fluid-12" : "px-fluid-16 gap-fluid-10";
  const avatarSizeClass = size === "sm" ? "w-fluid-24 h-fluid-24" : "w-fluid-28 h-fluid-28";

  const pillBase = `h-full rounded-[4px] flex items-center justify-center font-corp font-bold uppercase tracking-[0.02em] text-fluid-15 sm:text-fluid-16 leading-none select-none whitespace-nowrap box-border transform-gpu ${paddingClass}`;

  const isOutline = variant === "outline";

  const frontBg = isOutline
    ? "bg-[#ebe8e3] text-[#111111] border border-[#111111]"
    : "bg-[#111111] text-[#ebe8e3] border-none";

  const backBg = isOutline
    ? "bg-[#111111] text-[#ebe8e3] border border-[#111111]"
    : "bg-[#ff4c24] text-[#ebe8e3] border-none";

  const renderContent = () => (
    <>
      {avatarSrc && (
        <span
          className={`${avatarSizeClass} rounded-[2px] overflow-hidden shrink-0 block border border-black/10`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={avatarSrc}
            alt="Avatar"
            className="w-full h-full object-cover block select-none"
          />
        </span>
      )}
      <span>{children}</span>
    </>
  );

  const inner = (
    <>
      <div
        className={`${pillBase} ${frontBg} relative z-20 transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-50 group-hover:z-10`}
      >
        {renderContent()}
      </div>

      <div
        className={`${pillBase} ${backBg} absolute inset-0 w-full h-full z-10 scale-50 transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-100 group-hover:z-20`}
      >
        {renderContent()}
      </div>
    </>
  );

  const containerClasses = `group relative inline-flex items-center justify-center cursor-pointer select-none no-underline rounded-[4px] overflow-visible focus:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] ${heightClass} ${className}`;

  if (href) {
    if (href.startsWith("#") || href.startsWith("mailto:")) {
      return (
        <a
          href={href}
          onClick={onClick}
          target={target}
          rel={rel}
          className={containerClasses}
        >
          {inner}
        </a>
      );
    }
    return (
      <Link
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
        className={containerClasses}
      >
        {inner}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={containerClasses}
    >
      {inner}
    </button>
  );
}
