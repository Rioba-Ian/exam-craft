import type { FC } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { NAV_ITEMS } from "../constants";

const v = (name: string): string => `var(--${name})`;

interface SidebarProps {
  setMobileOpen: (fn: (v: boolean) => boolean) => void;
}

export const Sidebar: FC<SidebarProps> = ({ setMobileOpen }) => {
  const router = useRouterState();
  const currentPath = router.location.pathname;

  const getPageFromPath = (path: string) => {
    if (path === "/") return "home";
    return path.substring(1) as "polish" | "builder" | "bank" | "exams";
  };

  const page = getPageFromPath(currentPath);

  return (
    <aside
      style={{
        width: "var(--sidebar-w)",
        minHeight: "100vh",
        background: v("forest"),
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
        zIndex: 50,
        flexShrink: 0,
        boxShadow: "4px 0 24px rgba(0,0,0,0.15)",
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: "28px 20px 20px",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div
          className="f-mono"
          style={{
            fontSize: 10,
            color: "rgba(255,255,255,0.4)",
            letterSpacing: 3,
            marginBottom: 6,
          }}
        >
          EXAMCRAFT
        </div>
        <div
          className="f-display"
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: "#fff",
            lineHeight: 1.1,
          }}
        >
          CBC Exam
          <br />
          <span style={{ color: v("amber") }}>Studio</span>
        </div>
      </div>

      {/* Nav items */}
      <nav style={{ flex: 1, padding: "16px 12px" }}>
        {NAV_ITEMS.map((item) => {
          const active = page === item.id;
          const to = item.id === "home" ? "/" : `/${item.id}`;

          return (
            <Link
              key={item.id}
              to={to}
              onClick={() => {
                setMobileOpen(() => false);
              }}
              className="f-body"
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: 10,
                background: active ? "rgba(255,255,255,0.12)" : "transparent",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 2,
                transition: "background 0.18s",
                color: active ? "#fff" : "rgba(255,255,255,0.55)",
                textDecoration: "none",
              }}
              onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                if (!active) e.currentTarget.style.background = "rgba(255,255,255,0.07)";
              }}
              onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                if (!active) e.currentTarget.style.background = "transparent";
              }}
            >
              <span style={{ fontSize: 16, width: 20, textAlign: "center", flexShrink: 0 }}>
                {item.icon}
              </span>
              <span style={{ fontSize: 13, fontWeight: active ? 600 : 400, flex: 1 }}>
                {item.label}
              </span>
              {item.badge && (
                <span
                  className="f-mono"
                  style={{
                    fontSize: 9,
                    padding: "2px 6px",
                    borderRadius: 10,
                    fontWeight: 700,
                    letterSpacing: 0.5,
                    background: active ? v("amber") : "rgba(255,255,255,0.12)",
                    color: active ? v("ink") : "rgba(255,255,255,0.5)",
                  }}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div
        style={{
          padding: "16px 20px",
          borderTop: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: v("amber"),
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 14,
              flexShrink: 0,
            }}
          >
            👩‍🏫
          </div>
          <div>
            <div className="f-body" style={{ fontSize: 12, color: "#fff", fontWeight: 600 }}>
              Teacher Account
            </div>
            <div className="f-mono" style={{ fontSize: 10, color: "rgba(255,255,255,0.4)" }}>
              Free Plan
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
