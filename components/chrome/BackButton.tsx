import { IconChevronLeft } from "@/components/icons";

type Props = { onBack: () => void };

export default function BackButton({ onBack }: Props) {
  return (
    <button type="button" className="back" onClick={onBack} aria-label="Back">
      <IconChevronLeft size={22} />
    </button>
  );
}
