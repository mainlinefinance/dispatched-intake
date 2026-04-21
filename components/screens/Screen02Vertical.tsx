"use client";

import CardGroup, { type CardOption } from "@/components/chat/CardGroup";
import QaPair from "@/components/chat/QaPair";
import SystemBubble from "@/components/chat/SystemBubble";
import TypingIndicator from "@/components/chat/TypingIndicator";
import { useTypingDelay } from "@/components/chat/useTypingDelay";
import { verticalIconFor } from "@/components/icons";
import { SCREEN2, VERTICAL_OPTIONS } from "@/lib/copy";
import type { Vertical } from "@/lib/types";

type Props = {
  selected: Vertical | null;
  onSelect: (value: Vertical) => void;
};

const CARD_OPTIONS: CardOption<Vertical>[] = VERTICAL_OPTIONS.map((o) => ({
  value: o.value,
  title: o.label,
  sub: o.sub,
  Icon: verticalIconFor(o.icon),
}));

export default function Screen02Vertical({ selected, onSelect }: Props) {
  const typing = useTypingDelay();
  if (typing) return <TypingIndicator />;
  return (
    <QaPair>
      <SystemBubble>{SCREEN2.question}</SystemBubble>
      <CardGroup<Vertical>
        options={CARD_OPTIONS}
        selected={selected}
        onSelect={onSelect}
        ariaLabel="Operation type"
      />
    </QaPair>
  );
}
