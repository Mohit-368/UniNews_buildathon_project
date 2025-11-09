import React, { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating bubble nav (centered horizontally) */}
      <header
        className="fixed left-1/2 top-8 z-50 w-[min(1100px,92%)] transform -translate-x-1/2"
        aria-label="Main navigation"
      >
        {/* Split background: Left blue, right white */}
        <div
          className="relative mx-auto rounded-2xl overflow-hidden border border-white/30 dark:border-slate-700/40 shadow-xl backdrop-blur-md"
          role="navigation"
        >
          {/* Split color background layers */}
          <div className="absolute inset-0 flex">
            <div className="w-1/2 bg-[#0B1221]" /> {/* Left half (dark blue) */}
            <div className="w-1/2 bg-white" /> {/* Right half (white) */}
          </div>

          {/* Navbar content (on top of split background) */}
          <div className="relative flex items-center justify-between px-6 py-3">
            {/* Left: logo + name */}
            <div className="flex items-center gap-3">
              {/* Gradient logo bubble */}
              <div
                className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-violet-500 shadow-sm"
                aria-hidden="true"
              >
                <div className="w-4 h-4 rounded-full bg-white/90" />
              </div>

              <div className="flex flex-col leading-tight">
                <span className="text-2xl font-semibold text-white">UniNews</span>
                
              </div>
            </div>

            
            <nav className="hidden md:flex items-center gap-6">
              <h1 className="font-semibold text-xl ">Trust the FACTS Only</h1>
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setOpen((s) => !s)}
                aria-expanded={open}
                aria-label={open ? "Close menu" : "Open menu"}
                className="p-2 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {!open ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Mobile dropdown menu */}
          {open && (
            <div className="relative md:hidden border-t border-white/20 px-4 py-3 bg-white/90 backdrop-blur-md">
              <div className="flex flex-col gap-3">
                <h1>Trust the FACTS Only</h1>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Spacer so content isn't hidden behind navbar */}
      
    </>
  );
}
