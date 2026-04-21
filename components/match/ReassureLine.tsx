import { IconLock } from "@/components/icons";
import { SCREEN7 } from "@/lib/copy";

export default function ReassureLine() {
  return (
    <div className="reassure-line">
      <IconLock size={12} />
      <span>{SCREEN7.reassure}</span>
    </div>
  );
}
