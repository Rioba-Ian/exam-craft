import type { Grade, NavItem, PageId, PageMeta, Question, QType, Source, SourceInfo } from "./types";

export const GRADES: Grade[] = ["PP1", "PP2", "PP3"];

export const SUBJECTS: string[] = [
  "Mathematics",
  "English",
  "Kiswahili",
  "Environmental Activities",
  "Creative Arts",
  "Religious Education",
  "Movement & Creative Arts",
];

export const SOURCES: Source[] = [
  "Easy Elimu",
  "Shulefiti",
  "KNEC Papers",
  "Teachers Plus",
  "Maktaba",
  "Manual Entry",
];

export const Q_TYPES: QType[] = [
  "Multiple Choice",
  "Fill in Blank",
  "True / False",
  "Match",
  "Circle Correct",
  "Short Answer",
];

export const SAMPLE_QUESTIONS: Question[] = [
  { id: 1, grade: "PP2", subject: "Mathematics", topic: "Addition", type: "Fill in Blank", text: "3 + 4 = ___", answer: "7", source: "Easy Elimu", hasImage: false },
  { id: 2, grade: "PP1", subject: "English", topic: "Animals", type: "Circle Correct", text: "Circle the animal that lives in water.", answer: "Fish", source: "Shulefiti", hasImage: true },
  { id: 3, grade: "PP3", subject: "Environmental Activities", topic: "Plants", type: "Short Answer", text: "Name two things plants need to grow.", answer: "Water/sunlight", source: "Easy Elimu", hasImage: false },
  { id: 4, grade: "PP2", subject: "English", topic: "Letters", type: "Fill in Blank", text: "The word ___ starts with letter B.", answer: "Ball/Book/Bee", source: "KNEC Papers", hasImage: false },
  { id: 5, grade: "PP1", subject: "Mathematics", topic: "Counting", type: "Circle Correct", text: "Count the stars and circle the correct number.", answer: "5", source: "Easy Elimu", hasImage: true },
  { id: 6, grade: "PP3", subject: "Kiswahili", topic: "Maneno", type: "Match", text: "Oanisha picha na neno lake sahihi.", answer: "See key", source: "Shulefiti", hasImage: true },
  { id: 7, grade: "PP2", subject: "Creative Arts", topic: "Colours", type: "Multiple Choice", text: "Which colour do you get when mixing blue and yellow?", answer: "Green", source: "Teachers Plus", hasImage: false },
  { id: 8, grade: "PP1", subject: "Environmental Activities", topic: "My Body", type: "Fill in Blank", text: "We use our ___ to smell.", answer: "Nose", source: "Maktaba", hasImage: false },
];

export const NAV_ITEMS: NavItem[] = [
  { id: "home", icon: "⊞", label: "Dashboard" },
  { id: "polish", icon: "✦", label: "Scan & Polish", badge: "Dim 1" },
  { id: "builder", icon: "◈", label: "Exam Builder", badge: "Dim 2" },
  { id: "bank", icon: "◉", label: "Question Bank" },
  { id: "exams", icon: "◻", label: "My Exams" },
];

export const DIM1_STEPS: string[] = [
  "Upload",
  "Analyse",
  "Identify Objects",
  "Pick Images",
  "Preview & Export",
];

export const PAGE_META: Record<PageId, PageMeta> = {
  home: { title: "Dashboard", subtitle: "Welcome to ExamCraft CBC Studio" },
  polish: { title: "Scan & Polish", subtitle: "Dimension 1 — Upload a handwritten exam and get a polished PDF" },
  builder: { title: "Exam Builder", subtitle: "Dimension 2 — Build exams from the CBC question bank" },
  bank: { title: "Question Bank", subtitle: "Browse and manage scraped CBC questions" },
  exams: { title: "My Exams", subtitle: "Your saved and exported exams" },
};

export const SOURCE_INFO: SourceInfo[] = [
  { name: "Easy Elimu", icon: "📚", url: "easyelimu.com" },
  { name: "Shulefiti", icon: "🏫", url: "shulefiti.co.ke" },
  { name: "KNEC Papers", icon: "📄", url: "knec.ac.ke" },
  { name: "Teachers Plus", icon: "📝", url: "teachersplus.co.ke" },
  { name: "Maktaba", icon: "📖", url: "maktaba.co.ke" },
  { name: "Manual Entry", icon: "✏️", url: "Your own questions" },
];

export const MOCK_SCAN_RESULT = {
  title: "END OF TERM 1 EXAMINATION",
  grade: "PP2" as Grade,
  subject: "MATHEMATICS",
  school: "Sunshine Primary School",
  term: "Term 1, 2025",
  sections: [
    {
      id: "A",
      name: "Section A — Counting",
      questions: [
        { id: 1, text: "Count the objects and write the number.", hasDrawing: true, drawingLabel: "hand-drawn stars", position: { x: 60, y: 120 } },
        { id: 2, text: "Fill in the missing number: 1, 2, ___, 4, 5", hasDrawing: false },
      ],
    },
    {
      id: "B",
      name: "Section B — Shapes",
      questions: [
        { id: 3, text: "Circle the shape that has 4 sides.", hasDrawing: true, drawingLabel: "hand-drawn shapes (circle, square, triangle)" },
        { id: 4, text: "Draw a circle around the biggest object.", hasDrawing: true, drawingLabel: "hand-drawn ball, apple, ant" },
      ],
    },
  ],
};

export const MOCK_IMAGE_RESULTS: Record<string, { id: number; url: string; label: string; source: string }[]> = {
  "hand-drawn stars": [
    { id: 1, url: "⭐", label: "5 yellow stars illustration", source: "Clipart" },
    { id: 2, url: "🌟", label: "Glowing star set", source: "Freepik" },
    { id: 3, url: "✨", label: "Simple star outline", source: "Flaticon" },
  ],
  "hand-drawn shapes (circle, square, triangle)": [
    { id: 1, url: "🔷", label: "Basic shapes set — coloured", source: "Clipart" },
    { id: 2, url: "🔲", label: "Outline shapes worksheet", source: "Freepik" },
    { id: 3, url: "◯", label: "Simple shapes for kids", source: "Flaticon" },
  ],
  "hand-drawn ball, apple, ant": [
    { id: 1, url: "⚽", label: "Ball, apple & ant — size set", source: "Clipart" },
    { id: 2, url: "🍎", label: "Size comparison — 3 objects", source: "Freepik" },
    { id: 3, url: "🐜", label: "Big medium small illustration", source: "Flaticon" },
  ],
};
