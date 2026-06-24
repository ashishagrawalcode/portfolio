import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume",
  description: "View and download the resume of Ashish Agrawal.",
};

export default function ResumePage() {
  return (
    <main className="min-h-screen bg-bg-primary pt-24 pb-12 px-6 relative flex flex-col items-center">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-accent-violet/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-5xl z-10 flex flex-col gap-6">
        {/* Header Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <h1 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight mb-2">
              Curriculum Vitae
            </h1>
            <p className="text-text-secondary">Ashish Agrawal &bull; Full Stack Developer</p>
          </div>
          <a
            href="/Ashish_Agrawal.pdf"
            download="Ashish_Agrawal_Resume.pdf"
            className="group relative px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex items-center gap-3 text-sm font-bold text-white overflow-hidden"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative z-10">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span className="relative z-10">Download PDF</span>
            <div className="absolute inset-0 bg-accent-violet translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 z-0" />
          </a>
        </div>

        {/* PDF Viewer Container */}
        <div className="w-full h-[80vh] min-h-[600px] rounded-2xl overflow-hidden glass-card border border-white/10 shadow-2xl relative">
          <object
            data="/Ashish_Agrawal.pdf"
            type="application/pdf"
            className="w-full h-full rounded-2xl"
          >
            {/* Fallback if browser doesn't support inline PDFs */}
            <div className="flex flex-col items-center justify-center h-full text-center p-8 bg-bg-secondary">
              <div className="w-16 h-16 rounded-full bg-accent-violet/20 flex items-center justify-center mb-6">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent-violet">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Resume Ready</h3>
              <p className="text-text-secondary max-w-md mx-auto mb-6">
                It looks like your browser doesn&apos;t support inline PDFs. No worries! You can securely download the file directly.
              </p>
              <a
                href="/Ashish_Agrawal.pdf"
                download="Ashish_Agrawal_Resume.pdf"
                className="px-6 py-3 rounded-lg bg-accent-violet text-white font-bold hover:bg-accent-violet/90 transition-colors"
              >
                Download Resume
              </a>
            </div>
          </object>
        </div>
      </div>
    </main>
  );
}
