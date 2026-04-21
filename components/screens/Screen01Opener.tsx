"use client";

import ChipGroup from "@/components/chat/ChipGroup";
import QaPair from "@/components/chat/QaPair";
import SystemBubble from "@/components/chat/SystemBubble";
import TypingIndicator from "@/components/chat/TypingIndicator";
import { useTypingDelay } from "@/components/chat/useTypingDelay";
import { SCREEN1, USE_CASE_OPTIONS } from "@/lib/copy";
import type { UseCase } from "@/lib/types";

type Props = {
  onSelect: (value: UseCase) => void;
};

export default function Screen01Opener({ onSelect }: Props) {
  const typing = useTypingDelay();
  if (typing) return <TypingIndicator />;
  return (
    <QaPair>
      <SystemBubble>{SCREEN1.question}</SystemBubble>
      <ChipGroup<UseCase>
        options={USE_CASE_OPTIONS}
        onSelect={onSelect}
        ariaLabel="Use case options"
      />
    </QaPair>
  );
}
