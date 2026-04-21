import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  reassure?: string;
  animate?: boolean;
};

export default function SystemBubble({ children, reassure, animate = true }: Props) {
  return (
    <div className={`sys-row${animate ? " bubble-enter" : ""}`}>
      <div className="sys-avatar" aria-hidden="true">D</div>
      <div className="sys-col">
        <div className="sys">
          {children}
          {reassure ? <span className="reassure">{reassure}</span> : null}
        </div>
      </div>
    </div>
  );
}
