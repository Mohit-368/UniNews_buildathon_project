import React from "react";

export default function Footer() {
  return (
    <footer className="bg-white text-[#0B1221]">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 lg:py-16">
        {/* Top area: left headline + right contact */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left: big heading */}
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight">
              Only Trust What's True
              <br />
              with UniNews
              
            </h2>
          </div>

          {/* Right: contact list */}
          <div className="flex flex-col items-start lg:items-end gap-6">
            <div className="text-right lg:text-right space-y-5">
              <div className="flex items-start gap-3 lg:justify-end">
                {/* location icon */}
                
                <div className="text-left lg:text-right">
                  <p className="text-sm font-medium text-[#0B1221]">
                    GDG BuildAThon....
                  </p>
                  <p className="text-sm text-[#0B1221]/70">UniNews</p>
                </div>
              </div>

              <div className="flex items-start gap-3 lg:justify-end">
                
                  
               
                
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-10 border-t border-[#0B1221]/20" />

        {/* Bottom row: nav links left, copyright right */}
        <div className="mt-8 flex flex-col md:flex-row items-center md:items-center justify-between gap-6">
          <nav className="flex gap-8 items-center">
            
          </nav>

          <div className="text-sm text-[#0B1221]/70">
            © Copyright 2025, All Rights Reserved
          </div>
        </div>
      </div>
    </footer>
  );
}
