import { BRAND } from "@/lib/copy";
import { IconPhone } from "@/components/icons";
import BackButton from "./BackButton";

type Props = {
  showBack: boolean;
  onBack?: () => void;
  verticalTag?: string | null;
};

export default function Topbar({ showBack, onBack, verticalTag }: Props) {
  const tag = !showBack && verticalTag ? verticalTag : null;
  return (
    <div className="topbar">
      {showBack && onBack ? (
        <div style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
          <BackButton onBack={onBack} />
          <span className="brand-wrap">
            <span className="brand">{BRAND.name}</span>
          </span>
        </div>
      ) : (
        <span className="brand-wrap">
          <span className="brand">{BRAND.name}</span>
          {tag ? <span className="tag">{tag}</span> : null}
        </span>
      )}
      <a
        href={`tel:${BRAND.phone.replace(/\D/g, "")}`}
        className="phone-cta"
        aria-label={`Call ${BRAND.phone}`}
      >
        <IconPhone size={14} />
        <span className="num">{BRAND.phone}</span>
      </a>
    </div>
  );
}
