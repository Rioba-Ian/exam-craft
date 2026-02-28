import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { FileText, BookOpen, Printer, Camera, Building2, ScanLine, LayoutTemplate } from "lucide-react";
import { TopBar } from "../components/TopBar";
import { Btn } from "../components/shared";
import type { DimCardData, StatCard } from "../types";

export const Route = createFileRoute("/")({
  component: DashboardPage,
});

const v = (name: string): string => `var(--${name})`;

function DashboardPage() {
  const [, setMobileOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const stats: StatCard[] = [
    { label: "Exams Created", value: "0", icon: "FileText" },
    { label: "Questions in Bank", value: "0", icon: "BookOpen" },
    { label: "PDFs Exported", value: "0", icon: "Printer" },
  ];

  const iconComponents = {
    FileText,
    BookOpen,
    Printer,
    Camera,
    Building2,
  };

  const dimCards: DimCardData[] = [
    {
      dim: "01",
      color: v("forest"),
      light: v("mint"),
      icon: "Camera",
      title: "Scan & Polish",
      label: "DIM 1",
      desc: "Upload a photo of your handwritten exam. We extract the structure, identify drawn objects, find real images online, and rebuild a polished print-ready version.",
      steps: [
        "Upload handwritten exam photo",
        "AI reads structure + objects",
        "Web search finds real images",
        "Teacher confirms each image",
        "Polished PDF exported",
      ],
      cta: "Start Scanning",
      page: "polish",
    },
    {
      dim: "02",
      color: v("sienna"),
      light: "#FDEBD6",
      icon: "Building2",
      title: "Exam Builder",
      label: "DIM 2",
      desc: "Browse our scraped CBC question bank from Easy Elimu, Shulefiti and KNEC papers. Drag questions into sections, upload sketches, and export.",
      steps: [
        "Browse scraped question bank",
        "Filter by subject & topic",
        "Drag into exam sections",
        "Upload & refine sketches",
        "Export PDF + Answer Key",
      ],
      cta: "Open Builder",
      page: "builder",
    },
  ];

  return (
    <>
      <TopBar
        title="Dashboard"
        subtitle="Welcome to ExamCraft CBC Studio"
        setMobileOpen={setMobileOpen}
      />
      <main style={{ flex: 1, overflow: "auto" }}>
        <div style={{ padding: "32px" }}>
          {/* Hero */}
          <div
            className="anim-fade-up"
            style={{
              background: `linear-gradient(135deg, var(--forest) 0%, var(--forest2) 100%)`,
              borderRadius: 20,
              padding: "40px",
              marginBottom: 32,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                right: 20,
                top: 20,
                opacity: 0.06,
                userSelect: "none",
              }}
            >
              <BookOpen size={140} strokeWidth={1} />
            </div>
            <div
              className="f-mono"
              style={{
                fontSize: 10,
                color: "rgba(255,255,255,0.5)",
                letterSpacing: 3,
                marginBottom: 10,
              }}
            >
              WELCOME TO EXAMCRAFT
            </div>
            <div
              className="f-display"
              style={{
                fontSize: "clamp(1.8rem,4vw,2.6rem)",
                fontWeight: 700,
                color: "#fff",
                lineHeight: 1.15,
                marginBottom: 12,
              }}
            >
              Build perfect CBC exams
              <br />
              <span style={{ color: v("amber") }}>in minutes, not hours.</span>
            </div>
            <p
              className="f-body"
              style={{
                color: "rgba(255,255,255,0.65)",
                fontSize: 14,
                maxWidth: 480,
                marginBottom: 28,
                lineHeight: 1.6,
              }}
            >
              Upload your handwritten exam to polish it with real images, or build a new exam from
              our CBC question bank with drag-and-drop sections.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Btn variant="amber" onClick={() => navigate({ to: "/polish" })}>
                <ScanLine size={16} />
                Scan & Polish an Exam
              </Btn>
              <button
                className="btn"
                onClick={() => navigate({ to: "/builder" })}
                style={{
                  background: "rgba(255,255,255,0.12)",
                  color: "#fff",
                  border: "1.5px solid rgba(255,255,255,0.2)",
                }}
              >
                <LayoutTemplate size={16} />
                Build from Scratch
              </button>
            </div>
          </div>

          {/* Stats */}
          <div
            style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 32 }}
          >
            {stats.map((s, i) => {
              const IconComponent = iconComponents[s.icon as keyof typeof iconComponents];
              return (
                <div
                  key={s.label}
                  className={`card anim-fade-up`}
                  style={{ animationDelay: `${i * 0.08}s`, textAlign: "center", padding: "24px 16px" }}
                >
                  <div style={{ marginBottom: 8, display: "flex", justifyContent: "center" }}>
                    <IconComponent size={28} style={{ color: v("forest") }} />
                  </div>
                  <div className="f-display" style={{ fontSize: 32, fontWeight: 700, color: v("forest") }}>
                    {s.value}
                  </div>
                  <div className="f-body" style={{ fontSize: 12, color: v("muted"), marginTop: 2 }}>
                    {s.label}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dimension cards */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            {dimCards.map((d) => {
              const DimIcon = iconComponents[d.icon as keyof typeof iconComponents];
              return (
                <div
                  key={d.dim}
                  className="card hover-lift anim-fade-up"
                  style={{ cursor: "default", overflow: "hidden", padding: 0 }}
                >
                  <div style={{ background: d.color, padding: "24px 24px 20px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <DimIcon size={32} strokeWidth={1.5} style={{ color: "rgba(255,255,255,0.9)" }} />
                      <span
                        className="f-mono"
                        style={{
                          fontSize: 9,
                          fontWeight: 700,
                          letterSpacing: 2,
                          background: "rgba(255,255,255,0.15)",
                          color: "rgba(255,255,255,0.8)",
                          padding: "3px 8px",
                          borderRadius: 20,
                        }}
                      >
                        {d.label}
                      </span>
                    </div>
                    <div
                      className="f-display"
                      style={{ fontSize: 22, fontWeight: 700, color: "#fff", marginTop: 12 }}
                    >
                      {d.title}
                    </div>
                  </div>
                <div style={{ padding: "20px 24px 24px" }}>
                  <p
                    className="f-body"
                    style={{ fontSize: 13, color: v("ink2"), lineHeight: 1.6, marginBottom: 16 }}
                  >
                    {d.desc}
                  </p>
                  <div style={{ marginBottom: 20 }}>
                    {d.steps.map((step, i) => (
                      <div
                        key={i}
                        className="f-body"
                        style={{ display: "flex", alignItems: "center", gap: 10, padding: "5px 0" }}
                      >
                        <div
                          style={{
                            width: 20,
                            height: 20,
                            borderRadius: "50%",
                            background: d.color,
                            color: "#fff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 10,
                            fontWeight: 700,
                            flexShrink: 0,
                          }}
                        >
                          {i + 1}
                        </div>
                        <span style={{ fontSize: 12.5, color: v("ink2") }}>{step}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    className="btn"
                    onClick={() => navigate({ to: `/${d.page}` })}
                    style={{ background: d.color, color: "#fff", width: "100%", justifyContent: "center" }}
                  >
                    {d.cta} →
                  </button>
                </div>
              </div>
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
}
