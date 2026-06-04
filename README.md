# Pokhara University SGPA, CGPA, Grade & Percentage Calculator

A free, open-source academic calculator for **Pokhara University Bachelor of Engineering (BE)** students. Enter your semester grades to get **SGPA**, **CGPA**, equivalent **letter grade**, and **percentage** — with support for retakes, backlogs, electives, and printable reports. Runs entirely in the browser with no sign-up required.

**[Live demo](https://pu-gpa-tracker.vercel.app/)** · **[GitHub](https://github.com/nabinkdl/PU-GPA-Tracker)**

---

## Features

- **Program-specific course maps** — Pre-loaded semester structures for Software, Computer, Civil, and Electrical Engineering
- **Old & new syllabus support** — Switch between syllabus modes; course lists update automatically
- **Elective selection** — Pick specific elective courses (Elective I, II, III) in upper semesters
- **Retake & backlog tracking** — Mark retaken courses and optionally exclude F grades from GPA
- **Instant calculations** — SGPA, CGPA, letter grade, and percentage update as you enter grades
- **Target CGPA planner** — See the SGPA you need in remaining semesters to hit a goal
- **CSV export & import** — Back up grades, download a blank template, or restore from a spreadsheet
- **Printable report** — Generate a clean grade sheet with student details for printing or sharing
- **Fully client-side** — All data stays in your browser via `localStorage`; nothing is sent to a server
- **Mobile-friendly** — Responsive layout that works on phones, tablets, and desktops

## Supported Programs

| Program | Old Syllabus | New Syllabus |
|---------|:------------:|:------------:|
| Software Engineering | ✓ | ✓ |
| Computer Engineering | ✓ | ✓ |
| Civil Engineering | ✓ | ✓ |
| Electrical Engineering | ✓ | ✓ |

## How GPA Is Calculated

Pokhara University uses a 4.0 honor-point scale:

| Grade | Honor Point |
|-------|-------------|
| A | 4.0 |
| A- | 3.7 |
| B+ | 3.3 |
| B | 3.0 |
| B- | 2.7 |
| C+ | 2.3 |
| C | 2.0 |
| C- | 1.7 |
| D+ | 1.3 |
| D | 1.0 |
| F | 0.0 |

- **SGPA** = Total Quality Points ÷ Total Credit Hours (for the semester)
- **CGPA** = Cumulative Quality Points ÷ Cumulative Credit Hours (across all graded semesters)
- **Quality Points** = Credit Hours × Honor Point for each course

## Grade & Percentage

Alongside SGPA and CGPA, the calculator shows your cumulative **letter grade** and **percentage** based on Pokhara University's official conversion rules.

### Letter grade from CGPA

| CGPA Range | Letter Grade |
|------------|--------------|
| 4.00 | A |
| 3.70 – 3.99 | A- |
| 3.30 – 3.69 | B+ |
| 3.00 – 3.29 | B |
| 2.70 – 2.99 | B- |
| 2.30 – 2.69 | C+ |
| 2.00 – 2.29 | C |
| 1.70 – 1.99 | C- |
| 1.30 – 1.69 | D+ |
| 1.00 – 1.29 | D |
| Below 1.00 | F |

### Percentage from CGPA

Percentage is looked up from CGPA using PU's official conversion table (every 0.01 step from 2.00 to 4.00). A CGPA below 2.00 does not map to a percentage.

| CGPA | Percentage | CGPA | Percentage |
|------|------------|------|------------|
| 2.00 | 60.0% | 3.00 | 75.0% |
| 2.50 | 67.5% | 3.50 | 82.5% |
| 2.75 | 70.9% | 3.75 | 85.9% |
| 4.00 | 90.0% | | |

These values appear in the **Grand CGPA** panel and on the printable report sheet.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or later
- npm (comes with Node.js)

### Installation

```bash
git clone https://github.com/nabinkdl/PU-GPA-Tracker.git
cd PU-GPA-Tracker
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm run preview
```

The static site is output to the `dist/` folder and can be deployed to any static host (Vercel, Netlify, GitHub Pages, etc.).

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the Vite dev server on port 3000 |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run TypeScript type checking |
| `npm run clean` | Remove the `dist/` build folder |

## Project Structure

```
├── src/
│   ├── App.tsx                  # Main app shell and state management
│   ├── components/
│   │   ├── GPAResults.tsx       # CGPA panel, CSV tools, target planner
│   │   ├── SemesterView.tsx     # Per-semester grade entry
│   │   └── PrintReportSheet.tsx # Printable grade report
│   ├── courseData*.ts           # Course catalogs per program & syllabus
│   ├── registry.ts              # Program → course data mapping
│   ├── mapping.ts               # Grade points & CGPA → percentage table
│   ├── utils.ts                 # SGPA / CGPA calculation logic
│   ├── exportImport.ts          # CSV export and import
│   └── types.ts                 # Shared TypeScript types
├── index.html
├── vite.config.ts
└── package.json
```

## Tech Stack

- [React 19](https://react.dev/) — UI
- [Vite 6](https://vite.dev/) — Build tool and dev server
- [TypeScript](https://www.typescriptlang.org/) — Type safety
- [Tailwind CSS 4](https://tailwindcss.com/) — Styling
- [Motion](https://motion.dev/) — Animations
- [Lucide React](https://lucide.dev/) — Icons

## Contributing

Contributions are welcome — whether that's fixing course data, adding a new program, improving calculations, or polishing the UI.

1. Fork the [repository](https://github.com/nabinkdl/PU-GPA-Tracker)
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes and verify with `npm run lint && npm run build`
4. Commit with a clear message
5. Open a [pull request](https://github.com/nabinkdl/PU-GPA-Tracker/pulls) describing what you changed and why

Found a bug or have a feature idea? [Open an issue](https://github.com/nabinkdl/PU-GPA-Tracker/issues).

If you're updating course catalogs, edit the relevant `courseData*.ts` file for the program and syllabus you are targeting. Do not change calculation logic unless you can reference the official PU grading policy.

## Privacy

This app runs entirely in your browser. Grades, retake records, elective choices, and student details are stored in `localStorage` on your device. No accounts, cookies, or external API calls are involved.

## License

This project is licensed under the [MIT License](LICENSE).

---

Made with ♥️ for Pokhara University BE students by [Nabin Kandel](https://github.com/nabinkdl) ([@nabinkdl](https://instagram.com/nabinkdl)).
