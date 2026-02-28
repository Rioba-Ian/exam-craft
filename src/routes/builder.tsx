import { useState, type ChangeEvent } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Search, Image as ImageIcon, PenLine, LayoutTemplate, X, Printer } from "lucide-react";
import { TopBar } from "../components/TopBar";
import { Btn, Tag } from "../components/shared";
import { GRADES, SUBJECTS, Q_TYPES, SAMPLE_QUESTIONS } from "../constants";
import type { Grade, QType, Question, ExamSection, ExamMeta } from "../types";

export const Route = createFileRoute("/builder")({
  component: BuilderPage,
});

const v = (name: string): string => `var(--${name})`;

function BuilderPage() {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const [filterGrade, setFilterGrade] = useState<Grade | "All">("All");
  const [filterSubject, setFilterSubject] = useState<string>("All");
  const [filterType, setFilterType] = useState<QType | "All">("All");
  const [search, setSearch] = useState<string>("");
  const [sections, setSections] = useState<ExamSection[]>([{ id: "A", name: "Section A", questions: [] }]);
  const [activeSection, setActiveSection] = useState<string>("A");
  const [examMeta, setExamMeta] = useState<ExamMeta>({
    title: "New CBC Exam",
    grade: "PP2",
    subject: "Mathematics",
    school: "",
  });
  const [previewOpen, setPreviewOpen] = useState<boolean>(false);

  const filtered: Question[] = SAMPLE_QUESTIONS.filter(
    (q) =>
      (filterGrade === "All" || q.grade === filterGrade) &&
      (filterSubject === "All" || q.subject === filterSubject) &&
      (filterType === "All" || q.type === filterType) &&
      (search === "" ||
        q.text.toLowerCase().includes(search.toLowerCase()) ||
        q.topic.toLowerCase().includes(search.toLowerCase()))
  );

  const addToSection = (q: Question): void => {
    setSections((prev) =>
      prev.map((s) =>
        s.id === activeSection && !s.questions.find((eq) => eq.id === q.id)
          ? { ...s, questions: [...s.questions, q] }
          : s
      )
    );
  };

  const removeFromSection = (sectionId: string, qId: number): void => {
    setSections((prev) =>
      prev.map((s) => (s.id === sectionId ? { ...s, questions: s.questions.filter((q) => q.id !== qId) } : s))
    );
  };

  const addSection = (): void => {
    const letters = "ABCDEFGHIJ";
    const next = letters[sections.length] ?? `S${sections.length + 1}`;
    setSections((prev) => [...prev, { id: next, name: `Section ${next}`, questions: [] }]);
    setActiveSection(next);
  };

  const totalQs: number = sections.reduce((a, s) => a + s.questions.length, 0);
  const activeQs: Question[] = sections.find((s) => s.id === activeSection)?.questions ?? [];

  return (
    <>
      <TopBar
        title="Exam Builder"
        subtitle="Dimension 2 — Build exams from the CBC question bank"
        action={
          <Btn variant="sienna" onClick={() => navigate({ to: "/bank" })}>
            ◉ Question Bank
          </Btn>
        }
        setMobileOpen={setMobileOpen}
      />
      <main style={{ flex: 1, overflow: "hidden" }}>
        <div style={{ display: "flex", height: "calc(100vh - 120px)", overflow: "hidden" }}>
          {/* ── Left: Question Bank ── */}
          <div
            style={{
              width: 360,
              flexShrink: 0,
              borderRight: "1px solid var(--line)",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            <div style={{ padding: "16px", borderBottom: "1px solid var(--line)", background: "var(--paper)" }}>
              <div className="f-display" style={{ fontSize: 16, fontWeight: 700, color: v("ink"), marginBottom: 12 }}>
                Question Bank
              </div>
              <input
                className="input"
                placeholder="Search questions…"
                value={search}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                style={{ marginBottom: 10 }}
              />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 8 }}>
                <select
                  className="select"
                  value={filterGrade}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => setFilterGrade(e.target.value as Grade | "All")}
                >
                  <option value="All">All Grades</option>
                  {GRADES.map((g) => (
                    <option key={g}>{g}</option>
                  ))}
                </select>
                <select
                  className="select"
                  value={filterSubject}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) => setFilterSubject(e.target.value)}
                >
                  <option value="All">All Subjects</option>
                  {SUBJECTS.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>
              <select
                className="select"
                value={filterType}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => setFilterType(e.target.value as QType | "All")}
              >
                <option value="All">All Types</option>
                {Q_TYPES.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>

            <div style={{ flex: 1, overflowY: "auto", padding: "12px" }}>
              <div className="f-mono" style={{ fontSize: 10, color: v("muted"), marginBottom: 10, letterSpacing: 1 }}>
                {filtered.length} QUESTION{filtered.length !== 1 ? "S" : ""} FOUND
              </div>

              {filtered.length === 0 && (
                <div style={{ textAlign: "center", padding: "40px 20px", color: v("muted") }}>
                  <div style={{ marginBottom: 8, display: "flex", justifyContent: "center" }}>
                    <Search size={32} style={{ color: v("muted") }} />
                  </div>
                  <div className="f-body" style={{ fontSize: 13 }}>
                    No questions match your filters
                  </div>
                </div>
              )}

              {filtered.map((q) => (
                <div
                  key={q.id}
                  className="anim-slide-in"
                  style={{
                    padding: "12px 14px",
                    borderRadius: 10,
                    marginBottom: 8,
                    background: "var(--white)",
                    border: "1px solid var(--line)",
                  }}
                >
                  <div style={{ display: "flex", gap: 6, marginBottom: 6, flexWrap: "wrap" }}>
                    <Tag variant="green">{q.grade}</Tag>
                    <Tag variant="blue">{q.subject}</Tag>
                    <Tag variant="muted">{q.type}</Tag>
                    {q.hasImage && <Tag variant="amber">Image</Tag>}
                  </div>
                  <div className="f-body" style={{ fontSize: 13, color: v("ink"), marginBottom: 6, lineHeight: 1.5 }}>
                    {q.text}
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span className="f-mono" style={{ fontSize: 10, color: v("muted") }}>
                      {q.source} · {q.topic}
                    </span>
                    <Btn
                      variant="primary"
                      onClick={() => addToSection(q)}
                      style={{ padding: "5px 12px", fontSize: 11, borderRadius: 8 }}
                    >
                      + Add
                    </Btn>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ padding: "12px 14px", borderTop: "1px solid var(--line)", background: "var(--paper)" }}>
              <Btn variant="ghost" style={{ width: "100%", justifyContent: "center", fontSize: 12 }}>
                <PenLine size={14} />
                Manually Enter a Question
              </Btn>
            </div>
          </div>

          {/* ── Middle: Builder canvas ── */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
            {/* Exam meta bar */}
            <div
              style={{
                padding: "14px 20px",
                borderBottom: "1px solid var(--line)",
                background: "var(--paper)",
                display: "flex",
                gap: 12,
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <input
                className="input"
                value={examMeta.title}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setExamMeta((m) => ({ ...m, title: e.target.value }))}
                style={{ flex: "1 1 180px", minWidth: 140, fontWeight: 600 }}
              />
              <select
                className="select"
                value={examMeta.grade}
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  setExamMeta((m) => ({ ...m, grade: e.target.value as Grade }))
                }
                style={{ width: 90 }}
              >
                {GRADES.map((g) => (
                  <option key={g}>{g}</option>
                ))}
              </select>
              <select
                className="select"
                value={examMeta.subject}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => setExamMeta((m) => ({ ...m, subject: e.target.value }))}
                style={{ flex: "1 1 140px", minWidth: 120 }}
              >
                {SUBJECTS.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
              <div className="f-mono" style={{ fontSize: 11, color: v("muted"), whiteSpace: "nowrap" }}>
                {totalQs} question{totalQs !== 1 ? "s" : ""}
              </div>
              <Btn variant="primary" onClick={() => setPreviewOpen(true)} style={{ whiteSpace: "nowrap" }}>
                Preview & Export
              </Btn>
            </div>

            {/* Section tabs */}
            <div
              style={{
                display: "flex",
                borderBottom: "1px solid var(--line)",
                padding: "0 20px",
                background: "var(--white)",
                overflowX: "auto",
              }}
            >
              {sections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setActiveSection(s.id)}
                  className="f-body"
                  style={{
                    padding: "11px 20px",
                    fontSize: 13,
                    fontWeight: activeSection === s.id ? 700 : 400,
                    color: activeSection === s.id ? "var(--forest)" : "var(--muted)",
                    borderBottom:
                      activeSection === s.id ? "2.5px solid var(--forest)" : "2.5px solid transparent",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    transition: "color 0.18s",
                  }}
                >
                  {s.name}
                  {s.questions.length > 0 && (
                    <span
                      className="f-mono"
                      style={{
                        marginLeft: 6,
                        fontSize: 10,
                        background: "var(--mint)",
                        color: "var(--forest)",
                        padding: "1px 6px",
                        borderRadius: 10,
                      }}
                    >
                      {s.questions.length}
                    </span>
                  )}
                </button>
              ))}
              <button
                onClick={addSection}
                className="f-body"
                style={{
                  padding: "11px 16px",
                  fontSize: 13,
                  color: v("muted"),
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                + Section
              </button>
            </div>

            {/* Questions list */}
            <div style={{ flex: 1, overflowY: "auto", padding: "20px" }}>
              {activeQs.length === 0 ? (
                <div
                  style={{
                    border: "2px dashed var(--line)",
                    borderRadius: 16,
                    padding: "60px 32px",
                    textAlign: "center",
                    color: v("muted"),
                  }}
                >
                  <div style={{ marginBottom: 12, display: "flex", justifyContent: "center" }}>
                    <LayoutTemplate size={40} style={{ color: v("muted") }} />
                  </div>
                  <div className="f-display" style={{ fontSize: 18, color: v("ink"), marginBottom: 6 }}>
                    This section is empty
                  </div>
                  <div className="f-body" style={{ fontSize: 13 }}>
                    Browse questions on the left and click <strong>+ Add</strong> to populate this section.
                  </div>
                </div>
              ) : (
                activeQs.map((q, idx) => (
                  <div key={q.id} className="anim-slide-in card" style={{ marginBottom: 12, padding: "16px 18px" }}>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                      <div
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: "50%",
                          background: "var(--forest)",
                          color: "#fff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 12,
                          fontWeight: 700,
                          flexShrink: 0,
                          marginTop: 1,
                        }}
                      >
                        {idx + 1}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", gap: 6, marginBottom: 6, flexWrap: "wrap" }}>
                          <Tag variant="blue">{q.type}</Tag>
                          <Tag variant="muted">{q.topic}</Tag>
                          {q.hasImage && <Tag variant="amber">Image</Tag>}
                        </div>
                        <div className="f-body" style={{ fontSize: 14, color: v("ink"), lineHeight: 1.5 }}>
                          {q.text}
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                        <button
                          className="btn btn-ghost"
                          style={{ padding: "6px 10px", fontSize: 11, borderRadius: 8 }}
                          title="Attach image"
                        >
                          <ImageIcon size={14} />
                        </button>
                        <button
                          onClick={() => removeFromSection(activeSection, q.id)}
                          className="btn"
                          style={{
                            padding: "6px 10px",
                            fontSize: 11,
                            borderRadius: 8,
                            background: "#FEE2E2",
                            color: "var(--red)",
                            border: "none",
                          }}
                        >
                          <X size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* ── Preview modal ── */}
          {previewOpen && (
            <div
              className="anim-fade-in"
              onClick={() => setPreviewOpen(false)}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.5)",
                zIndex: 100,
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "center",
                padding: "40px 20px",
                overflowY: "auto",
              }}
            >
              <div
                onClick={(e) => e.stopPropagation()}
                style={{
                  background: "var(--white)",
                  borderRadius: 20,
                  padding: "48px",
                  maxWidth: 700,
                  width: "100%",
                  boxShadow: "var(--shadow-lg)",
                }}
              >
                <div
                  style={{ textAlign: "center", borderBottom: "3px double var(--ink)", paddingBottom: 20, marginBottom: 28 }}
                >
                  <div
                    className="f-body"
                    style={{
                      fontSize: 11,
                      letterSpacing: 2,
                      textTransform: "uppercase",
                      color: v("muted"),
                      marginBottom: 4,
                    }}
                  >
                    {examMeta.school || "School Name"}
                  </div>
                  <div className="f-display" style={{ fontSize: 22, fontWeight: 700, color: v("ink") }}>
                    {examMeta.title}
                  </div>
                  <div className="f-body" style={{ fontSize: 13, color: v("ink2"), marginTop: 4 }}>
                    Grade: <strong>{examMeta.grade}</strong> · Subject: <strong>{examMeta.subject}</strong>
                  </div>
                </div>

                {sections
                  .filter((s) => s.questions.length > 0)
                  .map((section) => (
                    <div key={section.id} style={{ marginBottom: 24 }}>
                      <div
                        className="f-body"
                        style={{
                          fontWeight: 700,
                          fontSize: 12,
                          color: v("forest"),
                          letterSpacing: 1,
                          textTransform: "uppercase",
                          marginBottom: 10,
                        }}
                      >
                        {section.name}
                      </div>
                      {section.questions.map((q, i) => (
                        <div key={q.id} style={{ display: "flex", gap: 10, marginBottom: 14 }}>
                          <span className="f-body" style={{ fontSize: 13, fontWeight: 700, flexShrink: 0 }}>
                            {i + 1}.
                          </span>
                          <div>
                            <div className="f-display" style={{ fontSize: 14, color: v("ink"), marginBottom: 8 }}>
                              {q.text}
                            </div>
                            <div style={{ borderBottom: "1px solid var(--line)", height: 24 }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}

                <div style={{ display: "flex", gap: 12, marginTop: 28, justifyContent: "flex-end" }}>
                  <Btn variant="ghost" onClick={() => setPreviewOpen(false)}>
                    Close
                  </Btn>
                  <Btn variant="sienna" onClick={() => window.print()}>
                    <Printer size={16} />
                    Export PDF
                  </Btn>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
