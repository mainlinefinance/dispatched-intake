"use client";

import { useEffect, useState } from "react";
import QaPair from "@/components/chat/QaPair";
import SystemBubble from "@/components/chat/SystemBubble";
import TypingIndicator from "@/components/chat/TypingIndicator";
import { useTypingDelay } from "@/components/chat/useTypingDelay";
import DataFlowStrip from "@/components/match/DataFlowStrip";
import MatchCard from "@/components/match/MatchCard";
import ReassureLine from "@/components/match/ReassureLine";
import { SCREEN7 } from "@/lib/copy";
import type { MatchResult } from "@/lib/types";

type Props = {
  match: MatchResult;
  hasSeenMatch: boolean;
  onSeen: () => void;
};

export default function Screen07MatchPreview({
  match,
  hasSeenMatch,
  onSeen,
}: Props) {
  const typing = useTypingDelay();

  /* Snapshot "should animate" at mount so the count-up fires once per
     visit. onSeen is invoked after the count-up completes to flip
     hasSeenMatch in the machine, preventing re-animation on back-nav. */
  const [animateOnMount] = useState(!hasSeenMatch);
  const [handledComplete, setHandledComplete] = useState(false);

  useEffect(() => {
    if (!animateOnMount && !hasSeenMatch) {
      onSeen();
    }
  }, [animateOnMount, hasSeenMatch, onSeen]);

  const handleComplete = () => {
    if (handledComplete) return;
    setHandledComplete(true);
    onSeen();
  };

  if (typing) return <TypingIndicator />;

  return (
    <QaPair>
      <SystemBubble>{SCREEN7.leadIn}</SystemBubble>
      <MatchCard
        match={match}
        animateOnMount={animateOnMount}
        onAnimationComplete={handleComplete}
      />
      <DataFlowStrip />
      <ReassureLine />
    </QaPair>
  );
}
