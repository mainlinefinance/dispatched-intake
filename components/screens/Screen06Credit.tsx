"use client";

import ChipGroup from "@/components/chat/ChipGroup";
import QaPair from "@/components/chat/QaPair";
import SystemBubble from "@/components/chat/SystemBubble";
import TypingIndicator from "@/components/chat/TypingIndicator";
import { useTypingDelay } from "@/components/chat/useTypingDelay";
import { CREDIT_COPY } from "@/lib/copy";
import type { CreditBand } from "@/lib/types";

type Props = {
  selected: CreditBand | null;
  onSelect: (value: CreditBand) => void;
};

export default function Screen06Credit({ selected, onSelect }: Props) {
  const typing = useTypingDelay();
  if (typing) return <TypingIndicator />;
  const options = CREDIT_COPY.options.map((o) => ({
    value: o.value,
    label: o.label,
    mono: o.value !== "not-sure",
  }));
  return (
    <QaPair>
      <SystemBubble reassure={CREDIT_COPY.reassurance}>
        {CREDIT_COPY.question}
      </SystemBubble>
      <ChipGroup<CreditBand>
        options={options}
        selected={selected}
        onSelect={onSelect}
        ariaLabel="Credit band"
      />
    </QaPair>
  );
}
