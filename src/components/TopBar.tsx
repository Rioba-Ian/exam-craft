import type { FC, ReactNode } from "react";

const v = (name: string): string => `var(--${name})`;

interface TopBarProps {
  title: string;
  subtitle: string;
  action?: ReactNode;
  setMobileOpen: (fn: (v: boolean) => boolean) => void;
}

export const TopBar: FC<TopBarProps> = ({ title, subtitle, action, setMobileOpen }) => (
  <div
    style={{
      padding: "20px 32px",
      borderBottom: "1px solid var(--line)",
      background: "rgba(249,244,234,0.85)",
      backdropFilter: "blur(12px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      position: "sticky",
      top: 0,
      zIndex: 10,
    }}
  >
    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
      <button
        onClick={() => setMobileOpen((prev) => !prev)}
        className="btn btn-ghost"
        style={{ padding: "8px 10px", borderRadius: 8 }}
        aria-label="Toggle sidebar"
      >
        ☰
      </button>
      <div>
        <div
          className="f-display"
          style={{ fontSize: 22, fontWeight: 700, color: v("ink"), lineHeight: 1 }}
        >
          {title}
        </div>
        <div className="f-body" style={{ fontSize: 12, color: v("muted"), marginTop: 3 }}>
          {subtitle}
        </div>
      </div>
    </div>
    {action}
  </div>
);
