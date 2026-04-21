import type { ReactNode } from "react";

type Props = { children: ReactNode; dim?: boolean };

export default function QaPair({ children, dim = false }: Props) {
  return (
    <div className={`qa-pair${dim ? " dim" : ""}`}>{children}</div>
  );
}
