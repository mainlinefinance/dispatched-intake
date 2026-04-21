"use client";

import type { ComponentType } from "react";

export type CardOption<T extends string> = {
  value: T;
  title: string;
  sub: string;
  Icon: ComponentType<{ size?: number }>;
};

type Props<T extends string> = {
  options: CardOption<T>[];
  selected?: T | null;
  onSelect: (value: T) => void;
  ariaLabel?: string;
};

export default function CardGroup<T extends string>({
  options,
  selected,
  onSelect,
  ariaLabel,
}: Props<T>) {
  return (
    <div className="biglist" role="group" aria-label={ariaLabel}>
      {options.map(({ value, title, sub, Icon }) => {
        const isSelected = selected === value;
        return (
          <button
            key={value}
            type="button"
            className={`bigcard${isSelected ? " selected" : ""}`}
            onClick={() => onSelect(value)}
            aria-pressed={isSelected}
          >
            <span className="icon" aria-hidden="true">
              <Icon size={32} />
            </span>
            <span className="title">{title}</span>
            <span className="sub">{sub}</span>
          </button>
        );
      })}
    </div>
  );
}
