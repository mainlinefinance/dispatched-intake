"use client";

import { useMachine } from "@xstate/react";
import { useCallback } from "react";
import BottomActions from "@/components/chrome/BottomActions";
import HomeIndicator from "@/components/chrome/HomeIndicator";
import ProgressBar from "@/components/chrome/ProgressBar";
import StatusBar from "@/components/chrome/StatusBar";
import Topbar from "@/components/chrome/Topbar";
import PrevPair from "@/components/screens/PrevPair";
import Screen01Opener from "@/components/screens/Screen01Opener";
import Screen02Vertical from "@/components/screens/Screen02Vertical";
import Screen03Amount from "@/components/screens/Screen03Amount";
import Screen04Revenue from "@/components/screens/Screen04Revenue";
import Screen05TimeInBusiness from "@/components/screens/Screen05TimeInBusiness";
import Screen06Credit from "@/components/screens/Screen06Credit";
import Screen07MatchPreview from "@/components/screens/Screen07MatchPreview";
import Screen08Contact from "@/components/screens/Screen08Contact";
import ScreenSubmitted from "@/components/screens/ScreenSubmitted";
import TrustRail from "@/components/trust-rail/TrustRail";
import { PROGRESS_BY_SCREEN, SCREEN1, VERTICAL_TAG } from "@/lib/copy";
import { intakeMachine, type IntakeStateValue } from "@/lib/machine";
import type { IntakeContext } from "@/lib/types";
import type { IntakePayload } from "@/lib/validation";

const SCREEN_NUM: Record<IntakeStateValue, number> = {
  screen01: 1,
  screen02: 2,
  screen03: 3,
  screen04: 4,
  screen05: 5,
  screen06: 6,
  screen07: 7,
  screen08: 8,
  submitted: 8,
};

export default function Intake() {
  const [state, send] = useMachine(intakeMachine);
  const value = state.value as IntakeStateValue;
  const ctx = state.context;
  const n = SCREEN_NUM[value];
  const showBack = n > 1 && value !== "submitted";
  const progressPct = PROGRESS_BY_SCREEN[n] ?? 0;
  const verticalTag = ctx.vertical ? VERTICAL_TAG[ctx.vertical] : "Trucking";

  const handleMatchSeen = useCallback(() => {
    send({ type: "MARK_MATCH_SEEN" });
  }, [send]);

  return (
    <div className="desktop-shell">
      <main className="phone" aria-label="Dispatched capital advisor intake">
        <StatusBar />
        <Topbar
          showBack={showBack}
          onBack={() => send({ type: "GO_BACK" })}
          verticalTag={verticalTag}
        />
        <ProgressBar pct={progressPct} />
        {n === 1 && (
          <header className="hero-intro">
            <p className="kicker">{SCREEN1.kicker}</p>
            <h1 className="title">{SCREEN1.heroTitle}</h1>
          </header>
        )}
        <div className="chat">
          <PrevPair screen={n} ctx={ctx} />
          {renderScreen(value, ctx, send, handleMatchSeen)}
        </div>
        {renderBottomActions(value, send)}
        <HomeIndicator />
      </main>
      <TrustRail />
    </div>
  );
}

type SendFn = (event: Parameters<ReturnType<typeof useMachine<typeof intakeMachine>>[1]>[0]) => void;

function renderScreen(
  value: IntakeStateValue,
  ctx: IntakeContext,
  send: SendFn,
  onMatchSeen: () => void
) {
  switch (value) {
    case "screen01":
      return (
        <Screen01Opener
          onSelect={(v) => send({ type: "SELECT_USE_CASE", value: v })}
        />
      );
    case "screen02":
      return (
        <Screen02Vertical
          selected={ctx.vertical}
          onSelect={(v) => send({ type: "SELECT_VERTICAL", value: v })}
        />
      );
    case "screen03":
      if (!ctx.vertical) return null;
      return (
        <Screen03Amount
          vertical={ctx.vertical}
          amountBand={ctx.amountBand}
          amount={ctx.amount}
          onSelect={(amount, band) =>
            send({ type: "SELECT_AMOUNT", amount, band })
          }
        />
      );
    case "screen04":
      if (!ctx.vertical) return null;
      return (
        <Screen04Revenue
          vertical={ctx.vertical}
          selected={ctx.revenueTier}
          onSelect={(tier) => send({ type: "SELECT_REVENUE", tier })}
        />
      );
    case "screen05":
      if (!ctx.vertical) return null;
      return (
        <Screen05TimeInBusiness
          vertical={ctx.vertical}
          selected={ctx.timeInBusinessTier}
          onSelect={(tier) => send({ type: "SELECT_TIB", tier })}
        />
      );
    case "screen06":
      return (
        <Screen06Credit
          selected={ctx.creditBand}
          onSelect={(v) => send({ type: "SELECT_CREDIT", value: v })}
        />
      );
    case "screen07":
      if (!ctx.matchEstimate) return null;
      return (
        <Screen07MatchPreview
          match={ctx.matchEstimate}
          hasSeenMatch={ctx.hasSeenMatch}
          onSeen={onMatchSeen}
        />
      );
    case "screen08": {
      const base = buildPayloadBase(ctx);
      if (!base) return null;
      return (
        <Screen08Contact
          payloadBase={base}
          onSubmitted={(contact) => send({ type: "SUBMIT_CONTACT", contact })}
        />
      );
    }
    case "submitted":
      return <ScreenSubmitted mobile={ctx.contact?.mobile ?? ""} />;
  }
}

function renderBottomActions(value: IntakeStateValue, send: SendFn) {
  if (value === "screen07") {
    return (
      <BottomActions
        screen="screen07"
        onContinue={() => send({ type: "CONTINUE" })}
      />
    );
  }
  if (value === "screen08") {
    return <BottomActions screen="screen08" isSubmitting={false} />;
  }
  return <BottomActions screen="none" />;
}

function buildPayloadBase(
  ctx: IntakeContext
): Omit<IntakePayload, "contact"> | null {
  if (
    !ctx.useCase ||
    !ctx.vertical ||
    ctx.amount === null ||
    !ctx.amountBand ||
    ctx.revenueTier === null ||
    ctx.timeInBusinessTier === null ||
    !ctx.creditBand
  ) {
    return null;
  }
  return {
    useCase: ctx.useCase,
    vertical: ctx.vertical,
    amount: ctx.amount,
    amountBand: ctx.amountBand,
    revenueTier: ctx.revenueTier,
    timeInBusinessTier: ctx.timeInBusinessTier,
    creditBand: ctx.creditBand,
  };
}
