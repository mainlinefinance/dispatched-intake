import QaPair from "@/components/chat/QaPair";
import SystemBubble from "@/components/chat/SystemBubble";
import UserBubble from "@/components/chat/UserBubble";
import {
  AMOUNT_COPY,
  CREDIT_COPY,
  REVENUE_COPY,
  SCREEN1,
  SCREEN2,
  TIME_IN_BUSINESS_COPY,
  USE_CASE_OPTIONS,
  VERTICAL_OPTIONS,
} from "@/lib/copy";
import { formatMoney } from "@/lib/format";
import type { IntakeContext } from "@/lib/types";

/* Renders the immediately-previous Q&A pair, dimmed to 60%.
   The design only keeps the last pair on screen (see PDF pages 3-9),
   so this component takes the current screen number and returns
   exactly one pair (or null on screen 1). */

type Props = { screen: number; ctx: IntakeContext };

export default function PrevPair({ screen, ctx }: Props) {
  const pair = resolvePair(screen, ctx);
  if (!pair) return null;
  return (
    <QaPair dim>
      <SystemBubble animate={false}>{pair.question}</SystemBubble>
      <UserBubble mono={pair.answerMono}>{pair.answer}</UserBubble>
    </QaPair>
  );
}

function resolvePair(
  screen: number,
  ctx: IntakeContext
): { question: string; answer: string; answerMono?: boolean } | null {
  if (screen === 2 && ctx.useCase) {
    const opt = USE_CASE_OPTIONS.find((o) => o.value === ctx.useCase);
    return opt
      ? { question: SCREEN1.question, answer: opt.label }
      : null;
  }
  if (screen === 3 && ctx.vertical) {
    const opt = VERTICAL_OPTIONS.find((o) => o.value === ctx.vertical);
    return opt ? { question: SCREEN2.question, answer: opt.label } : null;
  }
  if (screen === 4 && ctx.vertical && ctx.amount !== null) {
    const q = AMOUNT_COPY[ctx.vertical].question;
    if (ctx.amountBand === "custom") {
      return {
        question: q,
        answer: formatMoney(ctx.amount),
        answerMono: true,
      };
    }
    const preset = AMOUNT_COPY[ctx.vertical].presets.find(
      (p) => p.band === ctx.amountBand
    );
    return preset
      ? { question: q, answer: preset.label, answerMono: true }
      : null;
  }
  if (screen === 5 && ctx.vertical && ctx.revenueTier !== null) {
    const q = REVENUE_COPY[ctx.vertical].question;
    const opt = REVENUE_COPY[ctx.vertical].options.find(
      (o) => o.tier === ctx.revenueTier
    );
    return opt ? { question: q, answer: opt.label, answerMono: true } : null;
  }
  if (screen === 6 && ctx.vertical && ctx.timeInBusinessTier !== null) {
    const q = TIME_IN_BUSINESS_COPY[ctx.vertical].question;
    const opt = TIME_IN_BUSINESS_COPY[ctx.vertical].options.find(
      (o) => o.tier === ctx.timeInBusinessTier
    );
    return opt ? { question: q, answer: opt.label } : null;
  }
  if (screen === 7 && ctx.creditBand) {
    const opt = CREDIT_COPY.options.find((o) => o.value === ctx.creditBand);
    return opt
      ? {
          question: CREDIT_COPY.question,
          answer: opt.label,
          answerMono: opt.value !== "not-sure",
        }
      : null;
  }
  if (screen === 8 && ctx.matchEstimate) {
    const count = ctx.matchEstimate.lenderCount;
    return {
      question: `${count} lenders matched your profile.`,
      answer: "Show me",
    };
  }
  return null;
}
