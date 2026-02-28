import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { FolderOpen, ScanLine, LayoutTemplate } from "lucide-react";
import { TopBar } from "../components/TopBar";
import { Btn } from "../components/shared";

export const Route = createFileRoute("/exams")({
  component: ExamsPage,
});

const v = (name: string): string => `var(--${name})`;

function ExamsPage() {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  return (
    <>
      <TopBar
        title="My Exams"
        subtitle="Your saved and exported exams"
        setMobileOpen={setMobileOpen}
      />
      <main style={{ flex: 1, overflow: "auto" }}>
        <div style={{ padding: "32px" }}>
          <div
            style={{
              border: "2px dashed var(--line)",
              borderRadius: 18,
              padding: "80px 32px",
              textAlign: "center",
            }}
          >
            <div style={{ marginBottom: 16, display: "flex", justifyContent: "center" }}>
              <FolderOpen size={52} style={{ color: v("muted") }} />
            </div>
            <div className="f-display" style={{ fontSize: 24, color: v("ink"), marginBottom: 8 }}>
              No exams yet
            </div>
            <p className="f-body" style={{ color: v("muted"), fontSize: 14, marginBottom: 24 }}>
              Create your first exam using Scan & Polish or the Exam Builder.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <Btn variant="primary" onClick={() => navigate({ to: "/polish" })}>
                <ScanLine size={16} />
                Scan & Polish
              </Btn>
              <Btn variant="sienna" onClick={() => navigate({ to: "/builder" })}>
                <LayoutTemplate size={16} />
                Exam Builder
              </Btn>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
