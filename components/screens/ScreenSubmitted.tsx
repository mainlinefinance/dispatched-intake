"use client";

import QaPair from "@/components/chat/QaPair";
import SystemBubble from "@/components/chat/SystemBubble";
import TypingIndicator from "@/components/chat/TypingIndicator";
import { useTypingDelay } from "@/components/chat/useTypingDelay";
import { SUBMITTED } from "@/lib/copy";
import { maskPhone } from "@/lib/format";

type Props = { mobile: string };

export default function ScreenSubmitted({ mobile }: Props) {
  const typing = useTypingDelay();
  if (typing) return <TypingIndicator />;
  const masked = maskPhone(mobile);
  return (
    <QaPair>
      <SystemBubble>
        <strong>{SUBMITTED.title}</strong>
        <br />
        {SUBMITTED.body(masked)}
      </SystemBubble>
    </QaPair>
  );
}
