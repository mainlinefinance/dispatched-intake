import type { ReactNode } from "react";

type Props = { children: ReactNode; mono?: boolean };

export default function UserBubble({ children, mono = false }: Props) {
  return (
    <div className="user-row">
      <div className="user">{mono ? <span className="mono">{children}</span> : children}</div>
    </div>
  );
}
