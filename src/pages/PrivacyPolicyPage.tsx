import { Link } from "react-router-dom";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { useEffect } from "react";

export default function PrivacyPolicyPage() {
  useEffect(() => {
    document.title = "Privacy Policy | Pokhara University GPA Calculator";
    return () => {
      document.title = "Pokhara University GPA Calculator | SGPA & CGPA for Engineering Students";
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
        <div className="flex items-center gap-2 mb-2">
          <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0" aria-hidden="true" />
          <h1 className="text-2xl font-bold text-slate-800 font-sans tracking-tight">
            Privacy Policy
          </h1>
        </div>
        <p className="text-sm text-slate-600 mb-8">Your privacy is important.</p>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6 text-sm text-slate-600">
          <p className="leading-relaxed">
            This GPA Calculator stores all academic data locally on your device using your
            browser&apos;s storage. No grades, personal information, or academic records are
            transmitted to, collected by, or stored on any external server.
          </p>

          <section>
            <h2 className="font-bold text-slate-800 mb-2">What Data Is Stored?</h2>
            <ul className="list-disc list-inside space-y-1 leading-relaxed">
              <li>Subjects and grades entered by you</li>
              <li>SGPA and CGPA calculation records</li>
              <li>Application preferences and settings</li>
            </ul>
          </section>

          <section>
            <h2 className="font-bold text-slate-800 mb-2">What Data Is Collected?</h2>
            <p className="leading-relaxed">
              None. This application does not collect, track, sell, or share any personal
              information.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-slate-800 mb-2">Data Security</h2>
            <p className="leading-relaxed">
              Since all data remains on your device, you have full control over it. Clearing
              your browser data or uninstalling the application may permanently remove stored
              information.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-slate-800 mb-2">Third-Party Services</h2>
            <p className="leading-relaxed">
              This application does not use analytics, advertising, or third-party tracking
              services that collect personal data.
            </p>
          </section>

          <section>
            <h2 className="font-bold text-slate-800 mb-2">Disclaimer</h2>
            <p className="leading-relaxed">
              This application is an independent project created for Pokhara University
              Bachelor of Engineering students. It is not affiliated with, endorsed by, or
              officially associated with Pokhara University.
            </p>
            <p className="leading-relaxed mt-3">
              By using this application, you acknowledge that GPA calculations are provided
              for informational purposes only and should be verified against official
              university records when necessary.
            </p>
          </section>
        </div>
      </main>

      <footer className="border-t border-slate-200 bg-white py-6 mt-auto">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div>© 2026 GPA Calculator • Made with ❤️ for PU BE Students.</div>
          <div className="flex items-center gap-4">
            <Link to="/about" className="text-indigo-600 hover:text-indigo-500 transition-colors">
              About
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
