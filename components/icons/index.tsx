/* Inline SVGs ported verbatim from the Claude Design handoff bundle
   (project/icons.jsx). 1.5px stroke, rounded caps, currentColor.
   Not lucide — the bundle shipped hand-drawn shapes that the design
   calibrated against. */

type IconProps = { size?: number; className?: string };

const common = {
  fill: "none" as const,
  stroke: "currentColor" as const,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function IconChevronLeft({ size = 22, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      className={className}
      {...common}
    >
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

export function IconPhone({ size = 14, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth="1.7"
      className={className}
      {...common}
    >
      <path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6 19.8 19.8 0 01-3.1-8.7A2 2 0 014.1 2h3a2 2 0 012 1.7c.1.9.3 1.8.6 2.6a2 2 0 01-.5 2.1L7.9 9.7a16 16 0 006 6l1.3-1.3a2 2 0 012.1-.5c.8.3 1.7.5 2.6.6a2 2 0 011.7 2z" />
    </svg>
  );
}

export function IconArrowRight({ size = 22, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth="2"
      className={className}
      {...common}
    >
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  );
}

export function IconShield({ size = 12, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth="1.7"
      className={className}
      {...common}
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

export function IconLock({ size = 12, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth="1.7"
      className={className}
      {...common}
    >
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 118 0v4" />
    </svg>
  );
}

export function IconCheck({ size = 14, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth="2.2"
      className={className}
      {...common}
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

export function IconTruck({ size = 32, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      strokeWidth="1.5"
      className={className}
      {...common}
    >
      <path d="M2 20V8h14v12" />
      <path d="M16 12h7l5 5v3" />
      <path d="M2 20h26" />
      <circle cx="9" cy="23" r="2.5" />
      <circle cx="23" cy="23" r="2.5" />
      <path d="M28 20v3" />
    </svg>
  );
}

export function IconTrucks({ size = 32, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      strokeWidth="1.5"
      className={className}
      {...common}
    >
      <rect x="2" y="10" width="10" height="9" />
      <path d="M12 13h5l4 4v2" />
      <circle cx="7" cy="22" r="2" />
      <circle cx="19" cy="22" r="2" />
      <path d="M21 19h3" />
      <path d="M22 7h8M24 10h6" />
    </svg>
  );
}

export function IconHardhat({ size = 32, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      strokeWidth="1.5"
      className={className}
      {...common}
    >
      <path d="M4 24h24" />
      <path d="M6 24v-4a10 10 0 0120 0v4" />
      <path d="M13 14v-6h6v6" />
    </svg>
  );
}

export function IconTools({ size = 32, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      strokeWidth="1.5"
      className={className}
      {...common}
    >
      <path d="M18 4l3 3-2 2-3-3z" />
      <path d="M19 9L7 21l-3 3v3h3l3-3 12-12" />
      <path d="M20 18l6 6" />
      <path d="M24 14l4 4" />
    </svg>
  );
}

import type { VerticalIcon } from "@/lib/copy";

export function verticalIconFor(name: VerticalIcon) {
  switch (name) {
    case "truck":
      return IconTruck;
    case "trucks":
      return IconTrucks;
    case "hardhat":
      return IconHardhat;
    case "tools":
      return IconTools;
  }
}
