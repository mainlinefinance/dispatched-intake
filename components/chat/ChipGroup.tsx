"use client";

type Option<T extends string | number> = {
  value: T;
  label: string;
  mono?: boolean;
};

type Props<T extends string | number> = {
  options: Option<T>[];
  selected?: T | null;
  onSelect: (value: T) => void;
  ariaLabel?: string;
};

export default function ChipGroup<T extends string | number>({
  options,
  selected,
  onSelect,
  ariaLabel,
}: Props<T>) {
  return (
    <div className="chips" role="group" aria-label={ariaLabel}>
      {options.map((opt) => {
        const isSelected = selected === opt.value;
        return (
          <button
            key={String(opt.value)}
            type="button"
            className={`chip${isSelected ? " selected" : ""}`}
            onClick={() => onSelect(opt.value)}
            aria-pressed={isSelected}
          >
            {opt.mono ? <span className="mono">{opt.label}</span> : opt.label}
          </button>
        );
      })}
    </div>
  );
}
