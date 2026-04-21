"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/* Gate a system bubble behind a 600ms typing-indicator delay. Returns
   true while dots should show, false when the bubble should render.
   Respects prefers-reduced-motion: returns false immediately. */
export function useTypingDelay(ms = 600): boolean {
  const reduceMotion = useReducedMotion();
  const [typing, setTyping] = useState(!reduceMotion);

  useEffect(() => {
    if (reduceMotion) {
      setTyping(false);
      return;
    }
    setTyping(true);
    const t = setTimeout(() => setTyping(false), ms);
    return () => clearTimeout(t);
  }, [ms, reduceMotion]);

  return typing;
}
