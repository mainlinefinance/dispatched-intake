import { LogoMark } from "../landing/icons";

type Props = { color?: string; className?: string };

export default function Logo({ color, className = "" }: Props) {
  return (
    <span
      className={`logo ${className}`}
      style={color ? { color } : undefined}
    >
      <LogoMark />
      Dispatched
    </span>
  );
}
