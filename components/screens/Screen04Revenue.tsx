"use client";

import ChipGroup from "@/components/chat/ChipGroup";
import QaPair from "@/components/chat/QaPair";
import SystemBubble from "@/components/chat/SystemBubble";
import TypingIndicator from "@/components/chat/TypingIndicator";
import { useTypingDelay } from "@/components/chat/useTypingDelay";
import { REVENUE_COPY } from "@/lib/copy";
import type { BandTier, Vertical } from "@/lib/types";

type Props = {
  vertical: Vertical;
  selected: BandTier | null;
  onSelect: (tier: BandTier) => void;
};

export default function Screen04Revenue({
  vertical,
  selected,
  onSelect,
}: Props) {
  const typing = useTypingDelay();
  const copy = REVENUE_COPY[vertical];
  const options = copy.options.map((o) => ({
    value: o.tier,
    label: o.label,
    mono: true,
  }));
  if (typing) return <TypingIndicator />;
  return (
    <QaPair>
      <SystemBubble>{copy.question}</SystemBubble>
      <ChipGroup<BandTier>
        options={options}
        selected={selected}
        onSelect={onSelect}
        ariaLabel="Monthly revenue"
      />
    </QaPair>
  );
}
