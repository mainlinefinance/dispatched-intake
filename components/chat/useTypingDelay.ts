"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/* Gate a system bubble behind a 600ms typing-indicator delay. Returns
   true while dots should show, false when the bubble should render.
   Respects prefers-reduced-motion: returns false immediately.

   `done` starts false; the setTimeout flips it true after ms. The
   setState is inside setTimeout (deferred), not synchronous in the
   effect body, so react-hooks/set-state-in-effect is satisfied. */
export function useTypingDelay(ms = 600): boolean {
  const reduceMotion = useReducedMotion();
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (reduceMotion) return;
    const t = setTimeout(() => setDone(true), ms);
    return () => clearTimeout(t);
  }, [ms, reduceMotion]);

  return reduceMotion ? false : !done;
}
