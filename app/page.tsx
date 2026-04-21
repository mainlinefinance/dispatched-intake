"use client";

import { useMachine } from "@xstate/react";
import HomeIndicator from "@/components/chrome/HomeIndicator";
import ProgressBar from "@/components/chrome/ProgressBar";
import StatusBar from "@/components/chrome/StatusBar";
import Topbar from "@/components/chrome/Topbar";
import PrevPair from "@/components/screens/PrevPair";
import Screen01Opener from "@/components/screens/Screen01Opener";
import Screen02Vertical from "@/components/screens/Screen02Vertical";
import Screen03Amount from "@/components/screens/Screen03Amount";
import Screen04Revenue from "@/components/screens/Screen04Revenue";
import { PROGRESS_BY_SCREEN, SCREEN1, VERTICAL_TAG } from "@/lib/copy";
import { intakeMachine, type IntakeStateValue } from "@/lib/machine";

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
  const n = SCREEN_NUM[value];
  const showBack = n > 1 && value !== "submitted";
  const progressPct = PROGRESS_BY_SCREEN[n] ?? 0;
  const verticalTag = state.context.vertical
    ? VERTICAL_TAG[state.context.vertical]
    : "Trucking";

  return (
    <div className="phone">
      <StatusBar />
      <Topbar
        showBack={showBack}
        onBack={() => send({ type: "GO_BACK" })}
        verticalTag={verticalTag}
      />
      <ProgressBar pct={progressPct} />
      {n === 1 && (
        <div className="hero-intro">
          <div className="kicker">{SCREEN1.kicker}</div>
          <div className="title">{SCREEN1.heroTitle}</div>
        </div>
      )}
      <div className="chat">
        <PrevPair screen={n} ctx={state.context} />
        <CurrentScreen value={value} state={state} send={send} />
      </div>
      <HomeIndicator />
    </div>
  );
}

type CurrentScreenProps = {
  value: IntakeStateValue;
  state: ReturnType<typeof useMachine<typeof intakeMachine>>[0];
  send: ReturnType<typeof useMachine<typeof intakeMachine>>[1];
};

function CurrentScreen({ value, state, send }: CurrentScreenProps) {
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
          selected={state.context.vertical}
          onSelect={(v) => send({ type: "SELECT_VERTICAL", value: v })}
        />
      );
    case "screen03":
      if (!state.context.vertical) return null;
      return (
        <Screen03Amount
          vertical={state.context.vertical}
          amountBand={state.context.amountBand}
          amount={state.context.amount}
          onSelect={(amount, band) =>
            send({ type: "SELECT_AMOUNT", amount, band })
          }
        />
      );
    case "screen04":
      if (!state.context.vertical) return null;
      return (
        <Screen04Revenue
          vertical={state.context.vertical}
          selected={state.context.revenueTier}
          onSelect={(tier) => send({ type: "SELECT_REVENUE", tier })}
        />
      );
    default:
      return <ComingSoonBubble value={value} />;
  }
}

function ComingSoonBubble({ value }: { value: IntakeStateValue }) {
  return (
    <div className="sys-row bubble-enter">
      <div className="sys-avatar" aria-hidden="true">
        D
      </div>
      <div className="sys-col">
        <div className="sys">
          This screen lands in the next checkpoint. Current machine state:{" "}
          <strong>{value}</strong>.
        </div>
      </div>
    </div>
  );
}
