"use client";

import { animate, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { formatMoney } from "@/lib/format";

type Props = {
  target: number;
  animateOnMount: boolean;
  onComplete?: () => void;
};

/* 400ms count-up from $0 to target, ease-out, IBM Plex Mono inherited
   from the .amount class. Respects prefers-reduced-motion. */
export default function CountUpAmount({
  target,
  animateOnMount,
  onComplete,
}: Props) {
  const reduceMotion = useReducedMotion();
  const shouldAnimate = animateOnMount && !reduceMotion;
  const [v, setV] = useState(shouldAnimate ? 0 : target);

  useEffect(() => {
    if (!shouldAnimate) {
      setV(target);
      return;
    }
    const controls = animate(0, target, {
      duration: 0.4,
      ease: [0.2, 0.6, 0.2, 1],
      onUpdate: (n) => setV(Math.round(n)),
      onComplete,
    });
    return () => controls.stop();
  }, [shouldAnimate, target, onComplete]);

  return <span>{formatMoney(v)}</span>;
}
