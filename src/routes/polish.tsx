import { useState, useRef, useCallback, type ChangeEvent, type DragEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Camera, Search, Palette, Printer } from "lucide-react";
import { TopBar } from "../components/TopBar";
import { Btn, Tag } from "../components/shared";
import { DIM1_STEPS, GRADES, MOCK_SCAN_RESULT, MOCK_IMAGE_RESULTS } from "../constants";
import type { Dim1Step, Grade, ImageOption, ScanResult, SelectedImages } from "../types";

export const Route = createFileRoute("/polish")({
  component: PolishPage,
});

const v = (name: string): string => `var(--${name})`;

function PolishPage() {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [step, setStep] = useState<Dim1Step>(0);
  const [uploadedImg, setUploadedImg] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState<boolean>(false);
  const [analysisProgress, setAnalysisProgress] = useState<number>(0);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [selectedImages, setSelectedImages] = useState<SelectedImages>({});
  const [grade, setGrade] = useState<Grade>("PP2");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File | null | undefined): void => {
    if (!file?.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (typeof e.target?.result === "string") setUploadedImg(e.target.result);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>): void => {
    handleFile(e.target.files?.[0]);
  };

  const runAnalysis = (): void => {
    setStep(1);
    setAnalysisProgress(0);
    const interval = setInterval(() => {
      setAnalysisProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setScanResult(MOCK_SCAN_RESULT);
          setStep(2);
          return 100;
        }
        return p + 4;
      });
    }, 60);
  };

  const allDrawings: string[] = (scanResult?.sections ?? [])
    .flatMap((s) => s.questions.filter((q) => q.hasDrawing).map((q) => q.drawingLabel as string));

  const allPicked: boolean = allDrawings.every((d) => selectedImages[d]);

  const analysisLabel = (): string => {
    if (analysisProgress < 30) return "Extracting text with OCR…";
    if (analysisProgress < 60) return "Identifying drawn objects…";
    if (analysisProgress < 85) return "Mapping question structure…";
    return "Finalising…";
  };

  return (
    <>
      <TopBar title="Scan & Polish" subtitle="Dimension 1 — Upload a handwritten exam and get a polished PDF" setMobileOpen={setMobileOpen} />
      <main style={{ flex: 1, overflow: "auto" }}>
        <div style={{ padding: "32px", maxWidth: 900, margin: "0 auto" }}>
          {/* Step pills */}
          <div
            className="anim-fade-in"
            style={{
              display: "flex",
              gap: 0,
              marginBottom: 36,
              background: "var(--white)",
              borderRadius: 50,
              padding: "6px",
              border: "1px solid var(--line)",
              width: "fit-content",
            }}
          >
            {DIM1_STEPS.map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center" }}>
                <div
                  className="f-body"
                  style={{
                    padding: "7px 18px",
                    borderRadius: 50,
                    fontSize: 12,
                    fontWeight: 600,
                    background: step === i ? "var(--forest)" : "transparent",
                    color: step === i ? "#fff" : step > i ? "var(--forest)" : "var(--muted)",
                    transition: "all 0.25s",
                    whiteSpace: "nowrap",
                  }}
                >
                  {step > i ? "✓ " : ""}
                  {s}
                </div>
                {i < DIM1_STEPS.length - 1 && (
                  <div style={{ width: 1, height: 16, background: "var(--line)" }} />
                )}
              </div>
            ))}
          </div>

          {/* ── Step 0: Upload ── */}
          {step === 0 && (
            <div className="anim-fade-up">
              <div className="f-display" style={{ fontSize: 28, fontWeight: 700, color: v("ink"), marginBottom: 6 }}>
                Upload Your Exam
              </div>
              <p className="f-body" style={{ color: v("muted"), fontSize: 14, marginBottom: 28 }}>
                Take a photo of your handwritten or hand-drawn exam page. We'll read it and rebuild it professionally.
              </p>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: uploadedImg ? "1fr 1fr" : "1fr",
                  gap: 20,
                  marginBottom: 24,
                }}
              >
                <div
                  onDrop={handleDrop}
                  onDragOver={(e: DragEvent<HTMLDivElement>) => {
                    e.preventDefault();
                    setDragOver(true);
                  }}
                  onDragLeave={() => setDragOver(false)}
                  onClick={() => fileRef.current?.click()}
                  style={{
                    border: `2.5px dashed ${dragOver ? "var(--forest)" : "var(--line)"}`,
                    borderRadius: 18,
                    padding: "52px 32px",
                    textAlign: "center",
                    cursor: "pointer",
                    background: dragOver ? "var(--mint)" : "var(--paper)",
                    transition: "all 0.2s",
                  }}
                >
                  <div style={{ marginBottom: 16, display: "flex", justifyContent: "center" }}>
                    <Camera size={52} style={{ color: v("forest"), opacity: 0.7 }} />
                  </div>
                  <div className="f-display" style={{ fontSize: 20, color: v("ink"), marginBottom: 8 }}>
                    {uploadedImg ? "Replace Image" : "Drop exam page here"}
                  </div>
                  <p className="f-body" style={{ color: v("muted"), fontSize: 13, marginBottom: 20 }}>
                    or tap to browse · JPG, PNG
                  </p>
                  <Btn
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                      fileRef.current?.click();
                    }}
                  >
                    Browse Files
                  </Btn>
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleFileInput}
                  />
                </div>

                {uploadedImg && (
                  <div className="anim-fade-in">
                    <div
                      className="f-body"
                      style={{
                        fontSize: 12,
                        color: v("muted"),
                        marginBottom: 8,
                        fontWeight: 600,
                        letterSpacing: 1,
                        textTransform: "uppercase",
                      }}
                    >
                      Preview
                    </div>
                    <img
                      src={uploadedImg}
                      alt="Uploaded exam page"
                      style={{
                        width: "100%",
                        borderRadius: 14,
                        border: "1px solid var(--line)",
                        boxShadow: "var(--shadow)",
                        objectFit: "contain",
                        maxHeight: 320,
                      }}
                    />
                  </div>
                )}
              </div>

              {uploadedImg && (
                <>
                  <div className="anim-fade-up card" style={{ marginBottom: 24 }}>
                    <div
                      className="f-body"
                      style={{ fontSize: 13, fontWeight: 600, color: v("ink"), marginBottom: 14 }}
                    >
                      Configure Grade Level
                    </div>
                    <div style={{ display: "flex", gap: 10 }}>
                      {GRADES.map((g) => (
                        <button
                          key={g}
                          onClick={() => setGrade(g)}
                          className="btn"
                          style={{
                            background: grade === g ? "var(--forest)" : "var(--paper2)",
                            color: grade === g ? "#fff" : v("ink2"),
                            borderRadius: 10,
                            padding: "10px 20px",
                          }}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>
                  <Btn variant="primary" onClick={runAnalysis} style={{ fontSize: 14, padding: "12px 32px" }}>
                    Analyse Exam Page →
                  </Btn>
                </>
              )}
            </div>
          )}

          {/* ── Step 1: Analysing ── */}
          {step === 1 && (
            <div className="anim-fade-up" style={{ textAlign: "center", padding: "60px 20px" }}>
              <div style={{ marginBottom: 24, display: "flex", justifyContent: "center" }}>
                <Search size={60} style={{ color: v("forest") }} />
              </div>
              <div className="f-display" style={{ fontSize: 26, color: v("ink"), marginBottom: 8 }}>
                Analysing Your Exam
              </div>
              <p className="f-body" style={{ color: v("muted"), fontSize: 14, marginBottom: 36 }}>
                Claude Vision is reading the structure, extracting text, and identifying drawn objects…
              </p>
              <div
                style={{
                  background: "var(--paper2)",
                  borderRadius: 50,
                  height: 8,
                  width: 400,
                  maxWidth: "100%",
                  margin: "0 auto 16px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    borderRadius: 50,
                    background: "linear-gradient(90deg, var(--forest), var(--leaf))",
                    width: `${analysisProgress}%`,
                    transition: "width 0.1s",
                  }}
                />
              </div>
              <div className="f-mono" style={{ fontSize: 12, color: v("muted") }}>
                {analysisLabel()}
              </div>
            </div>
          )}

          {/* ── Step 2: Objects Detected ── */}
          {step === 2 && scanResult && (
            <div className="anim-fade-up">
              <div
                style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}
              >
                <div>
                  <div className="f-display" style={{ fontSize: 26, color: v("ink"), marginBottom: 4 }}>
                    Exam Structure Detected
                  </div>
                  <p className="f-body" style={{ color: v("muted"), fontSize: 14 }}>
                    Found <strong>{allDrawings.length} hand-drawn object{allDrawings.length !== 1 ? "s" : ""}</strong>{" "}
                    that need real images.
                  </p>
                </div>
                <Btn variant="primary" onClick={() => setStep(3)}>
                  Find Images →
                </Btn>
              </div>

              {/* Summary */}
              <div
                className="card"
                style={{ marginBottom: 20, background: "var(--mint)", border: "1px solid rgba(27,77,53,0.15)" }}
              >
                <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
                  {([
                    { label: "Title", value: scanResult.title },
                    { label: "Grade", value: scanResult.grade },
                    { label: "Subject", value: scanResult.subject },
                    { label: "Sections", value: scanResult.sections.length },
                    { label: "Questions", value: scanResult.sections.reduce((a, s) => a + s.questions.length, 0) },
                    { label: "Objects Found", value: allDrawings.length },
                  ] as const).map(({ label, value }) => (
                    <div key={label}>
                      <div
                        className="f-mono"
                        style={{
                          fontSize: 9,
                          color: v("forest"),
                          letterSpacing: 1.5,
                          textTransform: "uppercase",
                          marginBottom: 3,
                        }}
                      >
                        {label}
                      </div>
                      <div className="f-body" style={{ fontSize: 14, fontWeight: 600, color: v("ink") }}>
                        {value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sections */}
              {scanResult.sections.map((section) => (
                <div key={section.id} className="card" style={{ marginBottom: 16 }}>
                  <div
                    className="f-body"
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: v("forest"),
                      letterSpacing: 1,
                      textTransform: "uppercase",
                      marginBottom: 12,
                    }}
                  >
                    {section.name}
                  </div>
                  {section.questions.map((q) => (
                    <div
                      key={q.id}
                      style={{
                        padding: "12px 14px",
                        borderRadius: 10,
                        marginBottom: 8,
                        background: q.hasDrawing ? "#FFF7ED" : "var(--paper)",
                        border: `1px solid ${q.hasDrawing ? "rgba(196,98,45,0.2)" : "var(--line)"}`,
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 12,
                      }}
                    >
                      <div
                        style={{
                          width: 24,
                          height: 24,
                          borderRadius: "50%",
                          background: q.hasDrawing ? "var(--sienna)" : "var(--forest)",
                          color: "#fff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 11,
                          fontWeight: 700,
                          flexShrink: 0,
                        }}
                      >
                        {q.id}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div
                          className="f-body"
                          style={{ fontSize: 13.5, color: v("ink"), marginBottom: q.hasDrawing ? 6 : 0 }}
                        >
                          {q.text}
                        </div>
                        {q.hasDrawing && (
                          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                            <Palette size={14} style={{ color: v("sienna") }} />
                            <span className="f-mono" style={{ fontSize: 11, color: v("sienna") }}>
                              Drawing: "{q.drawingLabel}"
                            </span>
                            <Tag variant="orange">Needs Image</Tag>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}

          {/* ── Step 3: Pick Images ── */}
          {step === 3 && scanResult && (
            <div className="anim-fade-up">
              <div className="f-display" style={{ fontSize: 26, color: v("ink"), marginBottom: 6 }}>
                Pick Real Images
              </div>
              <p className="f-body" style={{ color: v("muted"), fontSize: 14, marginBottom: 28 }}>
                We searched for child-appropriate images for each drawing. Pick one per drawing, then we'll rebuild your
                exam.
              </p>

              {allDrawings.map((drawing, di) => {
                const options: ImageOption[] = MOCK_IMAGE_RESULTS[drawing] ?? [];
                return (
                  <div key={di} className="card" style={{ marginBottom: 20 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                      <span
                        className="f-mono"
                        style={{
                          fontSize: 10,
                          background: "var(--paper2)",
                          padding: "3px 10px",
                          borderRadius: 20,
                          color: v("muted"),
                        }}
                      >
                        Drawing {di + 1}
                      </span>
                      <span className="f-body" style={{ fontSize: 14, fontWeight: 600, color: v("ink") }}>
                        "{drawing}"
                      </span>
                      {selectedImages[drawing] && <Tag variant="green">✓ Selected</Tag>}
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
                      {options.map((img) => {
                        const picked = selectedImages[drawing]?.id === img.id;
                        return (
                          <div
                            key={img.id}
                            onClick={() => setSelectedImages((s) => ({ ...s, [drawing]: img }))}
                            style={{
                              border: `2.5px solid ${picked ? "var(--forest)" : "var(--line)"}`,
                              borderRadius: 12,
                              padding: 16,
                              cursor: "pointer",
                              textAlign: "center",
                              background: picked ? "var(--mint)" : "var(--paper)",
                              transition: "all 0.2s",
                            }}
                          >
                            <div style={{ fontSize: 48, marginBottom: 10 }}>{img.url}</div>
                            <div className="f-body" style={{ fontSize: 11, color: v("ink2"), marginBottom: 4 }}>
                              {img.label}
                            </div>
                            <div className="f-mono" style={{ fontSize: 10, color: v("muted") }}>
                              {img.source}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
                <Btn variant="ghost" onClick={() => setStep(2)}>
                  ← Back
                </Btn>
                <Btn variant="primary" disabled={!allPicked} onClick={() => setStep(4)}>
                  {allPicked ? "Build Polished Exam →" : `Select all ${allDrawings.length} images to continue`}
                </Btn>
              </div>
            </div>
          )}

          {/* ── Step 4: Preview & Export ── */}
          {step === 4 && scanResult && (
            <div className="anim-fade-up">
              <div
                style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}
              >
                <div>
                  <div className="f-display" style={{ fontSize: 26, color: v("ink"), marginBottom: 4 }}>
                    Polished Exam Ready
                  </div>
                  <p className="f-body" style={{ color: v("muted"), fontSize: 14 }}>
                    Your exam has been rebuilt with real images. Review and export.
                  </p>
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <Btn variant="ghost" onClick={() => setStep(3)}>
                    ← Edit Images
                  </Btn>
                  <Btn variant="sienna" onClick={() => window.print()}>
                    <Printer size={16} />
                    Export PDF
                  </Btn>
                </div>
              </div>

              <div className="card" style={{ padding: "48px", boxShadow: "var(--shadow-lg)" }}>
                <div
                  style={{
                    borderBottom: "3px double var(--ink)",
                    paddingBottom: 20,
                    marginBottom: 28,
                    textAlign: "center",
                  }}
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
                    {scanResult.school}
                  </div>
                  <div className="f-display" style={{ fontSize: 22, fontWeight: 700, color: v("ink"), marginBottom: 2 }}>
                    {scanResult.title}
                  </div>
                  <div className="f-body" style={{ fontSize: 13, color: v("ink2") }}>
                    Grade: <strong>{scanResult.grade}</strong> &nbsp;·&nbsp; Subject:{" "}
                    <strong>{scanResult.subject}</strong> &nbsp;·&nbsp; {scanResult.term}
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20, marginTop: 20, textAlign: "left" }}>
                    {["Name: ________________________", "Date: ________________", "Score: _______ / 10"].map((f) => (
                      <div
                        key={f}
                        className="f-body"
                        style={{ fontSize: 12, color: v("ink2"), borderBottom: "1px solid var(--line)", paddingBottom: 6 }}
                      >
                        {f}
                      </div>
                    ))}
                  </div>
                </div>

                {scanResult.sections.map((section) => (
                  <div key={section.id} style={{ marginBottom: 28 }}>
                    <div
                      className="f-body"
                      style={{
                        fontWeight: 700,
                        fontSize: 13,
                        color: v("forest"),
                        letterSpacing: 0.5,
                        marginBottom: 14,
                        textTransform: "uppercase",
                      }}
                    >
                      {section.name}
                    </div>
                    {section.questions.map((q) => {
                      const chosen: ImageOption | undefined = q.drawingLabel ? selectedImages[q.drawingLabel] : undefined;
                      return (
                        <div key={q.id} style={{ display: "flex", gap: 14, marginBottom: 18, alignItems: "flex-start" }}>
                          <span
                            className="f-body"
                            style={{ fontWeight: 700, fontSize: 13, color: v("ink"), flexShrink: 0, minWidth: 20 }}
                          >
                            {q.id}.
                          </span>
                          <div style={{ flex: 1 }}>
                            <div
                              className="f-display"
                              style={{ fontSize: 15, color: v("ink"), marginBottom: q.hasDrawing ? 10 : 0 }}
                            >
                              {q.text}
                            </div>
                            {q.hasDrawing && chosen && (
                              <div
                                style={{
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: 10,
                                  background: "var(--paper2)",
                                  borderRadius: 10,
                                  padding: "10px 16px",
                                  border: "1px solid var(--line)",
                                }}
                              >
                                <span style={{ fontSize: 36 }}>{chosen.url}</span>
                                <span className="f-body" style={{ fontSize: 11, color: v("muted") }}>
                                  {chosen.label}
                                </span>
                              </div>
                            )}
                            <div style={{ borderBottom: "1px solid var(--line)", marginTop: 12, height: 28 }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ))}

                <div style={{ borderTop: "1px dashed var(--line)", paddingTop: 16, textAlign: "center" }}>
                  <span className="f-mono" style={{ fontSize: 11, color: v("muted") }}>
                    — End of Examination — Built with ExamCraft CBC Studio —
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
