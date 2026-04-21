"use client";

import CountUpAmount from "./CountUpAmount";
import { SCREEN7 } from "@/lib/copy";
import type { MatchResult } from "@/lib/types";

type Props = {
  match: MatchResult;
  animateOnMount: boolean;
  onAnimationComplete?: () => void;
};

export default function MatchCard({
  match,
  animateOnMount,
  onAnimationComplete,
}: Props) {
  return (
    <div className="match-card">
      <div className="eyebrow">{SCREEN7.eyebrow}</div>
      <div className="lenders">
        <span className="count">{match.lenderCount} lenders</span>{" "}
        {SCREEN7.lenderPhrase}
      </div>
      <div className="divider" />
      <div>
        <div className="amount-label">{SCREEN7.rangeLabel}</div>
        <div className="amount">
          <CountUpAmount
            target={match.rangeLow}
            animateOnMount={animateOnMount}
          />
          <span className="dash">–</span>
          <CountUpAmount
            target={match.rangeHigh}
            animateOnMount={animateOnMount}
            onComplete={onAnimationComplete}
          />
        </div>
      </div>
      <div className="divider" />
      <div className="tfund">
        <span className="lbl">{SCREEN7.aprLabel}</span>
        <span className="val">
          <span className="mono">
            {match.aprLow}% – {match.aprHigh}%
          </span>
        </span>
      </div>
      <div className="divider" />
      <div className="tfund">
        <span className="lbl">{SCREEN7.timingLabel}</span>
        <span className="val">
          {SCREEN7.timingPrefix}{" "}
          <span className="mono">
            {match.timingLow}–{match.timingHigh} hours
          </span>{" "}
          {SCREEN7.timingSuffix}
        </span>
      </div>
    </div>
  );
}
