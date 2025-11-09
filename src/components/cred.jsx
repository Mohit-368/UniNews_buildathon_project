// UniNews.jsx
import React, { useEffect, useRef, useState } from "react";

export default function UniNews() {
  // refs for nodes
  const tabLinkRef = useRef(null);
  const tabTextRef = useRef(null);
  const panelLinkRef = useRef(null);
  const panelTextRef = useRef(null);
  const inputLinkRef = useRef(null);
  const inputTextRef = useRef(null);
  const checkBtnRef = useRef(null);
  const errorBoxRef = useRef(null);
  const resultAreaRef = useRef(null);
  const loadingSpinnerRef = useRef(null);
  const resultDisplayRef = useRef(null);
  const progressCircleRef = useRef(null);
  const resultPercentageRef = useRef(null);
  const resultTextRef = useRef(null);
  const statusPillRef = useRef(null);
  const pasteBtnRef = useRef(null);
  const resetBtnRef = useRef(null);
  const copyBtnRef = useRef(null);
  const summarizeBtnRef = useRef(null);
  const resultExplainRef = useRef(null);

  const [currentMode, setCurrentMode] = useState("link"); // 'link' or 'text'

  // progress ring setup
  useEffect(() => {
    const circle = progressCircleRef.current;
    if (!circle) return;
    const radius = circle.r.baseVal.value;
    const circumference = radius * 2 * Math.PI;
    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = `${circumference}`;
    // store circumference on ref for later use via dataset
    circle.dataset.circumference = String(circumference);
  }, []);

  // Tab switching
  function switchTab(mode) {
    setCurrentMode(mode);
    const tabLink = tabLinkRef.current;
    const tabText = tabTextRef.current;
    const panelLink = panelLinkRef.current;
    const panelText = panelTextRef.current;

    if (!tabLink || !tabText || !panelLink || !panelText) return;

    if (mode === "link") {
      tabLink.classList.add("tab-active");
      tabLink.setAttribute("aria-selected", "true");
      tabText.classList.remove("tab-active");
      tabText.setAttribute("aria-selected", "false");

      panelLink.classList.remove("hidden");
      panelLink.setAttribute("aria-hidden", "false");
      panelText.classList.add("hidden");
      panelText.setAttribute("aria-hidden", "true");
    } else {
      tabText.classList.add("tab-active");
      tabText.setAttribute("aria-selected", "true");
      tabLink.classList.remove("tab-active");
      tabLink.setAttribute("aria-selected", "false");

      panelText.classList.remove("hidden");
      panelText.setAttribute("aria-hidden", "false");
      panelLink.classList.add("hidden");
      panelLink.setAttribute("aria-hidden", "true");
    }

    hideError();
    resultAreaRef.current?.classList.add("hidden");
  }

  // helpers
  function showError(msg) {
    const e = errorBoxRef.current;
    const status = statusPillRef.current;
    if (!e) return;
    e.textContent = msg;
    e.classList.remove("hidden");
    if (status) status.textContent = "Error";
  }
  function hideError() {
    const e = errorBoxRef.current;
    if (!e) return;
    e.classList.add("hidden");
    e.textContent = "";
  }

  // paste
  async function handlePaste() {
    try {
      const txt = await navigator.clipboard.readText();
      if (currentMode === "link") {
        if (inputLinkRef.current) inputLinkRef.current.value = txt;
      } else {
        if (inputTextRef.current) inputTextRef.current.value = txt;
      }
    } catch (err) {
      showError("Unable to access clipboard in this browser.");
    }
  }

  // summarize (client-side stub)
  function handleSummarize() {
    const t = inputTextRef.current?.value.trim() || "";
    if (!t) {
      showError("Please paste some text to summarize.");
      return;
    }
    // crude client-side summary: first 2 sentences
    const sentences = t.match(/[^.!?]+[.!?]+/g) || [t];
    const summary = (sentences.slice(0, 2).join(" ") || sentences[0]).trim();
    if (inputTextRef.current) inputTextRef.current.value = summary;
  }

  // reset
  function handleReset() {
    if (inputLinkRef.current) inputLinkRef.current.value = "";
    if (inputTextRef.current) inputTextRef.current.value = "";
    hideError();
    resultAreaRef.current?.classList.add("hidden");
    if (statusPillRef.current) statusPillRef.current.textContent = "Ready";
  }

  // keyboard enter behavior
  useEffect(() => {
    function onKeydown(e) {
      if ((e.target === inputLinkRef.current || e.target === inputTextRef.current) && e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        checkBtnRef.current?.click();
      }
    }
    document.addEventListener("keydown", onKeydown);
    return () => document.removeEventListener("keydown", onKeydown);
  }, []);

  // main analyze flow
  function startAnalysis() {
    const resultArea = resultAreaRef.current;
    const loading = loadingSpinnerRef.current;
    const display = resultDisplayRef.current;
    if (!resultArea || !loading || !display) return;

    resultArea.classList.remove("hidden");
    loading.classList.remove("hidden");
    display.classList.add("hidden");
    if (statusPillRef.current) statusPillRef.current.textContent = "Analyzing...";

    setTimeout(() => {
      let score = 0;
      if (currentMode === "link") {
        score = Math.floor(Math.random() * 21) + 60; // 60-80
      } else {
        score = Math.floor(Math.random() * 11) + 30; // 30-40
      }

      loading.classList.add("hidden");
      display.classList.remove("hidden");
      displayResults(score);
    }, 2500); // preserve 2.5s simulation
  }

  function displayResults(score) {
    const circle = progressCircleRef.current;
    const circumference = Number(circle?.dataset?.circumference || 0);
    if (circle && circumference) {
      const offset = circumference - (score / 100) * circumference;
      circle.style.strokeDashoffset = String(offset);
    }

    // animate number
    let currentPercent = 0;
    if (resultPercentageRef.current) resultPercentageRef.current.textContent = "0%";
    const interval = setInterval(() => {
      if (currentPercent >= score) {
        clearInterval(interval);
        currentPercent = score;
      }
      if (resultPercentageRef.current) resultPercentageRef.current.textContent = `${currentPercent}%`;
      currentPercent++;
    }, 12);

    // set color + text
    if (resultTextRef.current) {
      if (score > 70) {
        resultTextRef.current.textContent = "High Credibility";
        // apply gradient stroke via existing gradient id (we add it below)
        progressCircleRef.current.style.stroke = "url(#gradHigh)";
      } else if (score > 50) {
        resultTextRef.current.textContent = "Moderate Credibility";
        progressCircleRef.current.style.stroke = "#facc15";
      } else {
        resultTextRef.current.textContent = "Low Credibility";
        progressCircleRef.current.style.stroke = "#f87171";
      }
    }

    // explain text
    if (resultExplainRef.current) {
      if (score > 70) resultExplainRef.current.textContent = "Sources, tone and metadata appear consistent — but always double-check primary sources.";
      else if (score > 50) resultExplainRef.current.textContent = "Some indicators are mixed (quotes/metadata). Treat cautiously.";
      else resultExplainRef.current.textContent = "Multiple red flags found: unverifiable claims or weak sourcing.";
    }

    if (statusPillRef.current) statusPillRef.current.textContent = "Done";
  }

  // check button handler
  function handleCheck() {
    const linkValue = inputLinkRef.current?.value.trim();
    const textValue = inputTextRef.current?.value.trim();
    if ((currentMode === "link" && !linkValue) || (currentMode === "text" && !textValue)) {
      showError("Please enter a link or text to analyze.");
      return;
    }
    hideError();
    startAnalysis();
  }

  // copy result
  async function handleCopy() {
    try {
      const txt = `${resultPercentageRef.current?.textContent || ""} — ${resultTextRef.current?.textContent || ""}\n${resultExplainRef.current?.textContent || ""}`;
      await navigator.clipboard.writeText(txt);
      if (statusPillRef.current) statusPillRef.current.textContent = "Copied";
    } catch (e) {
      showError("Copy failed: your browser may block clipboard access.");
    }
  }

  // theme & compact toggles (cosmetic)
  function toggleTheme(e) {
    document.documentElement.classList.toggle("dark");
    const btn = e.currentTarget;
    btn.textContent = btn.textContent === "🌗" ? "☀️" : "🌗";
  }
  function toggleCompact(e) {
    const btn = e.currentTarget;
    const pressed = btn.getAttribute("aria-pressed") === "true";
    btn.setAttribute("aria-pressed", String(!pressed));
    btn.textContent = pressed ? "Compact" : "Full";
    document.querySelector("section")?.classList.toggle("max-w-2xl");
  }

  // initialize small bits on mount (ARIA and add gradient defs)
  useEffect(() => {
    if (tabLinkRef.current) tabLinkRef.current.setAttribute("tabindex", "0");
    if (tabTextRef.current) tabTextRef.current.setAttribute("tabindex", "0");

    // add gradient defs to SVG for high score stroke
    const circle = progressCircleRef.current;
    if (circle) {
      const svg = circle.ownerSVGElement;
      if (svg && !svg.querySelector("#gradHigh")) {
        const ns = "http://www.w3.org/2000/svg";
        const defs = document.createElementNS(ns, "defs");
        const lin = document.createElementNS(ns, "linearGradient");
        lin.setAttribute("id", "gradHigh");
        lin.setAttribute("x1", "0%");
        lin.setAttribute("x2", "100%");
        const s1 = document.createElementNS(ns, "stop");
        s1.setAttribute("offset", "0%");
        s1.setAttribute("stop-color", "#00e5ff");
        const s2 = document.createElementNS(ns, "stop");
        s2.setAttribute("offset", "100%");
        s2.setAttribute("stop-color", "#7afcff");
        lin.appendChild(s1);
        lin.appendChild(s2);
        defs.appendChild(lin);
        svg.appendChild(defs);
      }
    }
  }, []);

  return (
    <>
      <style>{`
        :root{
          --glass: rgba(255,255,255,0.05);
          --glass-strong: rgba(255,255,255,0.08);
          --accent: #00e5ff;
          --bg1: #05040a;
          --bg2: #0f1724;
        }
        html,body{height:100%;}
        body{ margin:0; }
        .glass {
          background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
          border: 1px solid rgba(255,255,255,0.06);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          box-shadow: 0 10px 40px rgba(2,6,23,0.6), inset 0 1px 0 rgba(255,255,255,0.02);
        }
        .neon {
          text-shadow: 0 6px 30px rgba(0,229,255,0.06), 0 2px 10px rgba(0,229,255,0.08);
        }
        .futuristic-input{
          background: rgba(6,8,20,0.5);
          border: 1px solid rgba(255,255,255,0.04);
          transition: all .25s ease;
        }
        .futuristic-input:focus{
          border-color: rgba(0,229,255,0.6);
          box-shadow: 0 8px 30px rgba(0,229,255,0.06);
          outline: none;
        }
        .tab-active{ background: linear-gradient(90deg, rgba(0,229,255,0.06), rgba(0,229,255,0.02)); border-color: rgba(0,229,255,0.14); }
        .scanner-line{ position:absolute; left:0; right:0; height:2px; background: linear-gradient(90deg, transparent, var(--accent), transparent); box-shadow:0 0 12px rgba(0,229,255,0.12); transform: translateY(-10%); animation: scan 1.6s ease-in-out infinite; }
        @keyframes scan{ 0%{transform:translateY(-10%);}50%{transform:translateY(110%);}100%{transform:translateY(-10%);} }
        .progress-ring__circle{ transition: stroke-dashoffset .9s cubic-bezier(.22,.9,.27,1), stroke .4s linear; transform: rotate(-90deg); transform-origin:50% 50%; }
        .sr-only{ position:absolute !important; width:1px; height:1px; padding:0; margin:-1px; overflow:hidden; clip:rect(0,0,0,0); border:0; }
        @media (max-width:640px){ .desktop-only{ display:none; } }
      `}</style>

      <main className="min-h-screen flex items-center justify-center p-6"
        style={{
          /* changed background to solid #0B1221 and text color to white */
          background: "#0B1221",
          color: "#ffffff",
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
        }}
      >
        <section className="w-full max-w-3xl mx-auto glass rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/3">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-black/30 border border-white/4">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M3 12a9 9 0 1018 0A9 9 0 003 12z" stroke="url(#g)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M8.5 12.5l2.8 2.8L16 10.6" stroke="url(#g)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"></path>
                  <defs>
                    <linearGradient id="g" x1="0" x2="1">
                      <stop offset="0" stopColor="#00e5ff" />
                      <stop offset="1" stopColor="#7afcff" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              <div>
                <h1 className="text-2xl font-semibold leading-tight neon">UniNews</h1>
                <p className="text-xs text-white/70">Futuristic credibility analysis • Quick, explainable results</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button id="theme-toggle" onClick={toggleTheme} className="px-3 py-2 rounded-md futuristic-input" aria-label="Toggle theme">🌗</button>
              <button id="compact-toggle" onClick={toggleCompact} className="px-3 py-2 rounded-md futuristic-input" aria-pressed="false">Compact</button>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 md:p-8">
            {/* Tabs */}
            <div className="flex items-stretch gap-3 mb-5" role="tablist" aria-label="Input mode">
              <button
                id="tab-link"
                ref={tabLinkRef}
                role="tab"
                aria-selected="true"
                onClick={() => switchTab("link")}
                className="w-1/2 text-sm md:text-base text-left px-4 py-3 rounded-xl tab-active futuristic-input"
              >
                🔗 Check by Link
              </button>

              <button
                id="tab-text"
                ref={tabTextRef}
                role="tab"
                aria-selected="false"
                onClick={() => switchTab("text")}
                className="w-1/2 text-sm md:text-base text-left px-4 py-3 rounded-xl futuristic-input"
              >
                📝 Check by Text
              </button>
            </div>

            {/* Input area */}
            <div className="space-y-4">
              <div id="panel-link" ref={panelLinkRef} className="transition-all" aria-hidden="false">
                <label htmlFor="news-link" className="block text-xs text-white/70 mb-1">Article URL</label>
                <div className="flex gap-3">
                  <input id="news-link" ref={inputLinkRef} type="url" autoComplete="url" inputMode="url" placeholder="https://example.com/article" className="futuristic-input flex-1 px-4 py-3 rounded-lg text-sm placeholder-gray-400" />
                  <button id="paste-btn" ref={pasteBtnRef} onClick={handlePaste} className="px-4 py-3 rounded-lg bg-white/6 border border-white/20 text-white text-sm hover:bg-white/8">Paste</button>
                </div>
                <p className="mt-2 text-xs text-white/60">Tip: include the full URL to let the analyzer fetch metadata (simulated in this demo)</p>
              </div>

              <div id="panel-text" ref={panelTextRef} className="hidden" aria-hidden="true">
                <label htmlFor="news-text" className="block text-xs text-white/70 mb-1">Article Text</label>
                <textarea id="news-text" ref={inputTextRef} rows="6" placeholder="Paste the article text here..." className="futuristic-input w-full px-4 py-3 rounded-lg text-sm placeholder-gray-400 resize-none"></textarea>
                <div className="flex items-center gap-3 mt-2">
                  <button id="summarize-btn" ref={summarizeBtnRef} onClick={handleSummarize} className="text-sm px-3 py-2 futuristic-input rounded-md">Auto-summarize</button>
                  <span className="text-xs text-white/60">(Client-side demo only)</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
              <button id="check-btn" ref={checkBtnRef} onClick={handleCheck} className="md:col-span-2 bg-gradient-to-r from-white to-white text-[#0B1221] font-semibold px-5 py-3 rounded-lg shadow-lg hover:scale-[1.01] transition-transform">Analyze Credibility</button>

              <div className="flex gap-2 items-center">
                <div className="flex-1">
                  <div id="status-pill" ref={statusPillRef} className="text-sm text-white/70 px-3 py-2 rounded-lg futuristic-input">Ready</div>
                </div>
                <button id="reset-btn" ref={resetBtnRef} onClick={handleReset} className="px-3 py-2 futuristic-input rounded-lg text-sm">Reset</button>
              </div>
            </div>

            {/* Error */}
            <div id="error-box" ref={errorBoxRef} className="hidden mt-4 px-4 py-3 rounded-lg bg-red-900/40 border border-red-700 text-red-200 text-sm" role="alert"></div>

            {/* Result Card */}
            <div id="result-area" ref={resultAreaRef} className="mt-6 hidden p-6 rounded-xl border border-white/4 bg-black/20">
              {/* Loading */}
              <div id="loading-spinner" ref={loadingSpinnerRef} className="text-center hidden">
                <p className="text-sm text-white font-medium mb-4">Analyzing — this won't take long...</p>
                <div className="relative w-36 h-36 mx-auto rounded-full border border-white/6 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold">AI</div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-24 h-24 animate-spin" viewBox="0 0 50 50" fill="none">
                      <circle cx="25" cy="25" r="20" stroke="rgba(255,255,255,0.06)" strokeWidth="5"></circle>
                      <path d="M45 25a20 20 0 00-13-18" stroke="url(#g2)" strokeWidth="5" strokeLinecap="round"></path>
                      <defs>
                        <linearGradient id="g2"><stop offset="0" stopColor="#00e5ff"/><stop offset="1" stopColor="#7afcff"/></linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <div className="scanner-line" aria-hidden></div>
                </div>
              </div>

              {/* Result display */}
              <div id="result-display" ref={resultDisplayRef} className="hidden text-center">
                <h3 className="text-lg font-semibold mb-4 text-white">Analysis Complete</h3>

                <div className="flex items-center justify-center gap-6">
                  <div className="relative w-40 h-40">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <circle cx="50" cy="50" r="40" strokeWidth="10" stroke="rgba(255,255,255,0.06)" fill="transparent"></circle>
                      <circle id="progress-circle" ref={progressCircleRef} className="progress-ring__circle" cx="50" cy="50" r="40" strokeWidth="10" strokeLinecap="round" fill="transparent" strokeDasharray="251.2 251.2" strokeDashoffset="251.2"></circle>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span id="result-percentage" ref={resultPercentageRef} className="text-3xl font-bold text-white">0%</span>
                    </div>
                  </div>

                  <div className="text-left max-w-xs">
                    <p id="result-text" ref={resultTextRef} className="text-lg font-medium text-white">—</p>
                    <p id="result-explain" ref={resultExplainRef} className="text-xs mt-2 text-white/60">A short explainable hint about what affected the score will appear here.</p>
                    <div className="mt-4 flex gap-2">
                      <button id="copy-btn" ref={copyBtnRef} onClick={handleCopy} className="px-3 py-2 futuristic-input rounded-md text-sm text-white">Copy</button>
                      <button id="details-btn" className="px-3 py-2 futuristic-input rounded-md text-sm text-white">Details</button>
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </div>

          {/* Footer small */}
          <div className="px-6 py-4 border-t border-white/4 text-xs text-white/60 flex items-center justify-between">
            <span>Built for demo • Logic preserved</span>
            <span className="desktop-only">Mohit • UniNews</span>
          </div>
        </section>
      </main>
    </>
  );
}
