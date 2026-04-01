import React from 'react';
import SplineBackground from './components/SplineBackground';
import { ArrowRight } from 'lucide-react';

/** ui-ux-design-spec / code-analysis와 동일 구조·호버·트랜지션. 텍스트·카드·삼각형 색만 파스텔 UI에 맞게 매핑. */
function App() {
  const navItems = [
    'Main',
    'About',
    'Service',
    'Gallery',
    'Book',
    'Contact',
  ];

  return (
    <div className="relative min-h-screen w-full font-sans selection:bg-[#00FF88]/30 text-gray-800 overflow-hidden">
      <SplineBackground />

      <div className="relative z-10 flex flex-col h-screen pointer-events-none p-6 md:p-8 lg:p-12">
        <main className="flex-1 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pointer-events-auto">
          <div className="hidden lg:flex lg:col-span-3 flex-col gap-6 text-sm font-mono text-gray-500">
            {navItems.map((item, index) => (
              <div
                key={item}
                className="group cursor-pointer flex items-center gap-4 transition-all hover:text-gray-800 hover:translate-x-2"
              >
                <span className="text-gray-400 group-hover:text-gray-600 w-10">
                  / {index + 1}
                </span>
                <span className="font-medium tracking-wide">{item}</span>
              </div>
            ))}
          </div>

          <div className="col-span-1 lg:col-span-6 flex justify-center perspective-1000">
            <div className="bg-white/50 backdrop-blur-2xl border border-white/35 w-full max-w-[580px] p-6 text-gray-800 shadow-2xl shadow-purple-500/5 transform transition-transform duration-700 hover:scale-[1.02] hover:-rotate-1">
              <div className="bg-gradient-to-br from-sky-100/90 via-violet-50/95 to-pink-100/85 w-full aspect-square mb-8 flex items-center justify-center relative overflow-hidden border border-white/50">
                <div className="w-64 h-64 bg-gradient-to-br from-sky-200/70 to-violet-200/65 relative shadow-lg shadow-sky-200/40 flex items-center justify-center border border-white/60">
                  <svg
                    width="140"
                    height="140"
                    viewBox="0 0 100 100"
                    className="stroke-sky-600/85 stroke-[0.8] opacity-90"
                  >
                    <line x1="50" y1="20" x2="50" y2="80" />
                    <line x1="20" y1="20" x2="80" y2="20" />
                    <line x1="50" y1="20" x2="80" y2="50" />
                  </svg>
                  <div className="absolute top-4 left-4 w-1.5 h-1.5 bg-white rounded-full opacity-80 shadow-sm" />
                  <div className="absolute top-4 right-4 w-1.5 h-1.5 bg-white rounded-full opacity-80 shadow-sm" />
                  <div className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-white rounded-full opacity-80 shadow-sm" />
                  <div className="absolute bottom-4 right-4 w-1.5 h-1.5 bg-white rounded-full opacity-80 shadow-sm" />
                </div>
              </div>

              <div className="px-2 pb-6 space-y-10">
                <div className="space-y-4">
                  <div className="text-xs font-mono text-gray-400 font-medium tracking-wider uppercase">
                    Module F / 4.0
                  </div>
                  <h2 className="text-2xl font-medium tracking-tight text-[#222222] leading-tight">
                    Instant Integration
                  </h2>
                </div>

                <div className="flex gap-5 items-start pt-4 border-t border-gray-200/50">
                  <ArrowRight className="w-5 h-5 mt-1.5 flex-shrink-0 text-gray-400" />
                  <p className="font-mono text-sm text-gray-600 leading-relaxed max-w-[360px]">
                    Pull from videos, logs, and PLC data. No overhaul required.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden lg:flex lg:col-span-3 flex-col gap-6 text-sm font-medium text-right text-gray-500 items-end">
            <div className="cursor-pointer hover:text-gray-800 transition-colors">
              Fix Problems Faster
            </div>
            <div className="cursor-pointer hover:text-gray-800 transition-colors">
              Capture Tribal Knowledge
            </div>
            <div className="cursor-pointer hover:text-gray-800 transition-colors">
              Keep Shifts in Sync
            </div>
            <div className="text-gray-800 flex items-center gap-3 cursor-pointer mt-4">
              <span>Instant Integration</span>
              <div className="w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-r-[7px] border-r-gray-600 transform rotate-180" />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
