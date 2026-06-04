import { Link } from "react-router-dom";
import { ArrowLeft, Github, GraduationCap, Heart, Info, Instagram, Mail } from "lucide-react";
import { useEffect } from "react";

const DEFAULT_TITLE =
  "Pokhara University GPA Calculator | SGPA & CGPA for Engineering Students";

export default function AboutPage() {
  useEffect(() => {
    document.title = "About | Pokhara University GPA Calculator";
    return () => {
      document.title = DEFAULT_TITLE;
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-slate-200 shadow-xs">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-5">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 shrink-0" aria-hidden="true" />
            Back to GPA Calculator
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 py-10">
        <div className="flex items-center gap-2 mb-8">
          <GraduationCap className="h-5 w-5 text-indigo-600 shrink-0" aria-hidden="true" />
          <h1 className="text-2xl font-bold text-slate-800 font-sans tracking-tight">
            About
          </h1>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-8 text-sm text-slate-600">
          <section>
            <h2 className="font-bold text-slate-800 mb-3">About This Project</h2>
            <p className="leading-relaxed">
            This project started from a familiar frustration every Pokhara University BE student goes through sitting with marks, spreadsheets, and formulas, redoing calculations again and again because of retakes, backlogs, and small mistakes that change everything.
Academic progress felt like something you had to decode instead of simply understand.What began as a personal need turned into a simple question: what if calculating your GPA didn't feel like work at all?
That's how PU GPA Calculator came to life. Enter your grades, get accurate results instantly based on PU's grading system, with full support for retakes and back exams. No complexity, no login, no distractions. Everything runs in the browser, and all data stays on your device.

Open-source and built for one reason: to make academic life a little less stressful for every PU BE student.
            </p>
            <p className="leading-relaxed mt-3">
              All data is stored locally on your device and never uploaded to any server.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
              <Info className="h-4 w-4 text-slate-500 shrink-0" aria-hidden="true" />
              Information
            </h2>
            <ul className="list-disc list-inside space-y-1 leading-relaxed">
              <li>Grading System: Pokhara University Standard</li>
              <li>Institution: Pokhara University</li>
              <li>Designed for BE Programs</li>
              <li>SGPA, CGPA, grade & percentage calculation</li>
              <li>Target CGPA planner</li>
              <li>F Grade Handling</li>

            </ul>
          </section>

          <section>
            <h2 className="font-bold text-slate-800 mb-3">Disclaimer</h2>
            <p className="leading-relaxed">
              This application is an independent student project and is not affiliated
              with, endorsed by, or officially associated with Pokhara University.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-slate-800 mb-3">Contact Developer</h2>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://github.com/nabinkdl/PU-GPA-Tracker"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-500 transition-colors"
                >
                  <Github className="h-4 w-4 shrink-0" aria-hidden="true" />
                  Open Source Project
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/nabinkdl"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-500 transition-colors"
                >
                  <Instagram className="h-4 w-4 shrink-0" aria-hidden="true" />
                  @nabinkdl
                </a>
              </li>
              <li>
                <a
                  href="mailto:hi.nabinkdl@gmail.com"
                  className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-500 transition-colors"
                >
                  <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                  hi.nabinkdl@gmail.com
                </a>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
              <Heart className="h-4 w-4 text-rose-500 shrink-0" aria-hidden="true" />
              Open Source &amp; Community Driven
            </h2>
            <p className="leading-relaxed">
              PU GPA Calculator is free, open-source, and always will be.
              Built for Pokhara University BE students, it started as a personal solution
              and has grown through student feedback. The goal is simple keep making it
              better for everyone who uses it.
            </p>
            <p className="leading-relaxed mt-3">
              Have an idea or found something to improve?{" "}
              <a
                href="https://github.com/nabinkdl/PU-GPA-Tracker"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
              >
                Contributions and feedback
              </a>{" "}
              are always welcome.
            </p>
          </section>
        </div>
      </main>

      <footer className="border-t border-slate-200 bg-white py-6 mt-auto">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div>© 2026 GPA Calculator • Made with ❤️ for PU BE Students.</div>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="text-indigo-600 hover:text-indigo-500 transition-colors">
              Privacy Policy
            </Link>
            <a
              href="https://pu.edu.np"
              target="_blank"
              rel="noreferrer"
              className="text-indigo-600 hover:text-indigo-500 transition-colors"
            >
              Pokhara University
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
