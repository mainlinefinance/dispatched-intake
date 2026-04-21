"use client";

import { useMemo, useState } from "react";
import ChipGroup from "@/components/chat/ChipGroup";
import QaPair from "@/components/chat/QaPair";
import SystemBubble from "@/components/chat/SystemBubble";
import TypingIndicator from "@/components/chat/TypingIndicator";
import { useTypingDelay } from "@/components/chat/useTypingDelay";
import { IconArrowRight } from "@/components/icons";
import { AMOUNT_COPY } from "@/lib/copy";
import { formatMoneyDigitsOnly } from "@/lib/format";
import type { AmountBand, Vertical } from "@/lib/types";

type Props = {
  vertical: Vertical;
  amountBand: AmountBand | null;
  amount: number | null;
  onSelect: (amount: number, band: AmountBand) => void;
};

export default function Screen03Amount({
  vertical,
  amountBand,
  amount,
  onSelect,
}: Props) {
  const typing = useTypingDelay();
  const copy = AMOUNT_COPY[vertical];

  const [mode, setMode] = useState<"presets" | "custom">(
    amountBand === "custom" ? "custom" : "presets"
  );
  const [raw, setRaw] = useState(
    amountBand === "custom" && amount !== null ? String(amount) : ""
  );

  const chipOptions = useMemo(
    () => [
      ...copy.presets.map((p) => ({
        value: p.band as AmountBand,
        label: p.label,
        mono: true,
      })),
      { value: "custom" as AmountBand, label: "Custom amount", mono: false },
    ],
    [copy]
  );

  const handleChipSelect = (value: AmountBand) => {
    if (value === "custom") {
      setMode("custom");
      return;
    }
    const preset = copy.presets.find((p) => p.band === value);
    if (preset) {
      onSelect(preset.midpoint, preset.band);
    }
  };

  const handleCustomSubmit = () => {
    const num = Number(raw);
    if (Number.isFinite(num) && num > 0) {
      onSelect(num, "custom");
    }
  };

  if (typing) return <TypingIndicator />;

  const selected: AmountBand | null = mode === "custom" ? "custom" : amountBand;

  return (
    <QaPair>
      <SystemBubble>{copy.question}</SystemBubble>
      <ChipGroup<AmountBand>
        options={chipOptions}
        selected={selected}
        onSelect={handleChipSelect}
        ariaLabel="Amount needed"
      />
      {mode === "custom" && (
        <div className="amount-row">
          <div className="amount-input">
            <span className="prefix">$</span>
            <input
              type="text"
              inputMode="numeric"
              autoFocus
              value={formatMoneyDigitsOnly(raw)}
              onChange={(e) => setRaw(e.target.value.replace(/\D/g, ""))}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleCustomSubmit();
              }}
              aria-label="Custom amount in dollars"
              placeholder="0"
            />
          </div>
          <button
            type="button"
            className="amount-confirm"
            onClick={handleCustomSubmit}
            disabled={!raw}
            aria-label="Confirm amount"
          >
            <IconArrowRight size={22} />
          </button>
        </div>
      )}
    </QaPair>
  );
}
