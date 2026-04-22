"use client";

import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { useEffect } from "react";
import { formatMoney } from "@/lib/format";

type Props = {
  target: number;
  animateOnMount: boolean;
  onComplete?: () => void;
};

/* 400ms count-up from $0 to target, ease-out, IBM Plex Mono inherited
   from the .amount class. Respects prefers-reduced-motion.

   Uses framer-motion's MotionValue to keep the animating value outside
   React's state so the React Compiler rule against setState-in-effect
   doesn't bite. The MotionValue is driven by `animate()` which updates
   it directly; motion.span subscribes and re-renders imperatively. */
export default function CountUpAmount({
  target,
  animateOnMount,
  onComplete,
}: Props) {
  const reduceMotion = useReducedMotion();
  const shouldAnimate = animateOnMount && !reduceMotion;
  const value = useMotionValue(shouldAnimate ? 0 : target);
  const display = useTransform(value, (v) => formatMoney(Math.round(v)));

  useEffect(() => {
    if (!shouldAnimate) {
      value.set(target);
      return;
    }
    value.set(0);
    const controls = animate(value, target, {
      duration: 0.4,
      ease: [0.2, 0.6, 0.2, 1],
      onComplete,
    });
    return () => controls.stop();
  }, [shouldAnimate, target, value, onComplete]);

  return <motion.span>{display}</motion.span>;
}
