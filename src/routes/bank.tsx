import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { BookOpen, School, FileText, PenTool, Library as LibraryIcon, PencilLine } from "lucide-react";
import { TopBar } from "../components/TopBar";
import { Btn, Tag } from "../components/shared";
import type { Source } from "../types";

export const Route = createFileRoute("/bank")({
  component: BankPage,
});

const v = (name: string): string => `var(--${name})`;

function BankPage() {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const [, setActiveSource] = useState<Source | "All">("All");

  const sourceInfo = [
    { name: "Easy Elimu" as Source, icon: BookOpen, url: "easyelimu.com" },
    { name: "Shulefiti" as Source, icon: School, url: "shulefiti.co.ke" },
    { name: "KNEC Papers" as Source, icon: FileText, url: "knec.ac.ke" },
    { name: "Teachers Plus" as Source, icon: PenTool, url: "teachersplus.co.ke" },
    { name: "Maktaba" as Source, icon: LibraryIcon, url: "maktaba.co.ke" },
    { name: "Manual Entry" as Source, icon: PencilLine, url: "Your own questions" },
  ];

  return (
    <>
      <TopBar
        title="Question Bank"
        subtitle="Browse and manage scraped CBC questions"
        action={
          <Btn variant="primary" onClick={() => navigate({ to: "/builder" })}>
            ◈ Back to Builder
          </Btn>
        }
        setMobileOpen={setMobileOpen}
      />
      <main style={{ flex: 1, overflow: "auto" }}>
        <div style={{ padding: "32px" }}>
          <div
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px,1fr))", gap: 14, marginBottom: 32 }}
          >
            {sourceInfo.map((src) => {
              const IconComponent = src.icon;
              return (
                <div
                  key={src.name}
                  className="card hover-lift"
                  style={{ cursor: "pointer" }}
                  onClick={() => setActiveSource(src.name)}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                    <IconComponent size={28} style={{ color: v("forest") }} />
                    <Tag variant="muted">0 questions</Tag>
                  </div>
                  <div className="f-body" style={{ fontWeight: 700, fontSize: 14, color: v("ink"), marginBottom: 4 }}>
                    {src.name}
                  </div>
                  <div className="f-body" style={{ fontSize: 12, color: v("muted"), marginBottom: 12 }}>
                    {src.url}
                  </div>
                  <Btn variant="ghost" style={{ width: "100%", justifyContent: "center", fontSize: 11, padding: "7px" }}>
                    {src.name === "Manual Entry" ? "Add Questions" : "Scrape Now"}
                  </Btn>
                </div>
              );
            })}
          </div>

          <div className="card" style={{ background: "var(--mint)", border: "1px solid rgba(27,77,53,0.15)" }}>
            <div className="f-display" style={{ fontSize: 18, color: v("forest"), marginBottom: 6 }}>
              Scraper Status
            </div>
            <p className="f-body" style={{ fontSize: 13, color: v("ink2"), marginBottom: 16, lineHeight: 1.6 }}>
              The scraper runs automatically every 48 hours. Trigger a manual run per source above. Questions are
              auto-tagged by grade, subject, topic, and type using Claude.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Tag variant="muted">Last run: Never</Tag>
              <Tag variant="green">Scheduler: Active</Tag>
              <Tag variant="amber">Safe scraping: Rate-limited</Tag>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
