import React, { useState, useEffect } from 'react';
import { Search, Layers, Compass, Activity, Zap, MousePointer2 } from 'lucide-react';
import { PatternsView } from './components/views/PatternsView';
import { PrinciplesView } from './components/views/PrinciplesView';
import { ExtractionView } from './components/views/ExtractionView';
import { HighLowView } from './components/views/HighLowView';

const NAV_ITEMS = [
  { id: 'patterns', label: '型態', icon: Search },
  { id: 'principles', label: '五步驟', icon: Layers },
  { id: 'extraction', label: '萃取', icon: Compass },
  { id: 'highlow', label: '高低點', icon: Activity },
] as const;

type TabType = typeof NAV_ITEMS[number]['id'];

const TAB_VIEWS: Record<TabType, React.ReactElement> = {
  patterns: <PatternsView />,
  principles: <PrinciplesView />,
  extraction: <ExtractionView />,
  highlow: <HighLowView />,
};

const App = () => {
  const [activeTab, setActiveTab] = useState<TabType>('patterns');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen text-slate-900 pb-28 md:pb-12">

      {/* Mobile Top Bar */}
      <div className={`md:hidden sticky top-0 z-40 transition-all duration-500 ${isScrolled ? 'glass shadow-sm py-2' : 'bg-transparent py-4'} px-4`}>
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-indigo-600 to-violet-600 p-2.5 rounded-xl shadow-lg shadow-indigo-500/30 text-white shrink-0">
            <Zap size={20} className={isScrolled ? "scale-90 transition-transform" : "scale-100"} />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tight text-slate-900 leading-none font-outfit">
              型態大補帖
            </h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Master Class</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-2 md:pt-8">

        {/* Desktop Header */}
        <header className="hidden md:flex flex-col md:flex-row items-center justify-between mb-10 gap-6 glass p-6 rounded-[2rem] shadow-sm z-50 relative transition-all hover:shadow-md hover:shadow-indigo-500/5">
          <div className="flex items-center gap-5">
            <div className="bg-gradient-to-br from-indigo-600 to-violet-600 p-4 rounded-2xl shadow-xl shadow-indigo-500/30 text-white animate-float">
              <Zap size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tighter text-slate-900 font-outfit">
                型態大補帖
              </h1>
              <p className="text-slate-500 font-bold tracking-wide text-sm mt-1">Trading Patterns Master Class</p>
            </div>
          </div>

          <nav aria-label="主要導覽" className="flex flex-wrap justify-center bg-slate-100/50 p-1.5 rounded-2xl border border-slate-200/60 gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                aria-current={activeTab === item.id ? 'page' : undefined}
                onClick={() => setActiveTab(item.id)}
                className={`px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2.5 ${activeTab === item.id
                  ? 'bg-white text-indigo-600 shadow-md ring-1 ring-slate-100 scale-100'
                  : 'text-slate-500 hover:text-slate-700 hover:bg-white/50 scale-95 hover:scale-100'
                  }`}
              >
                <item.icon size={18} strokeWidth={activeTab === item.id ? 2.5 : 2} />
                {item.label}
              </button>
            ))}
          </nav>
        </header>

        {/* Content Area */}
        <main className="min-h-[60vh]">
          {TAB_VIEWS[activeTab]}

          {/* Global Footer Notes */}
          <footer className="mt-4 md:mt-12 p-5 md:p-10 bg-slate-900 rounded-[2rem] text-white shadow-xl shadow-slate-300 relative overflow-hidden group mx-0.5">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity duration-1000 rotate-12 pointer-events-none">
              <MousePointer2 size={200} />
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-5 md:gap-8 relative z-10">
              <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 w-full md:w-auto">
                <div className="flex items-center gap-3 text-indigo-400 shrink-0">
                  <div className="p-2 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
                    <MousePointer2 className="shrink-0" size={18} />
                  </div>
                  <h5 className="font-black text-base md:text-lg tracking-wide uppercase">實戰口訣</h5>
                </div>

                <div className="hidden md:block w-px h-8 bg-slate-800"></div>

                <div className="grid grid-cols-2 md:flex md:flex-row items-center gap-x-4 gap-y-2 md:gap-0 text-sm md:text-lg font-bold tracking-tight text-slate-300 leading-relaxed font-outfit text-center">
                  <span className="whitespace-nowrap hover:text-white transition-colors flex items-center justify-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-600 md:hidden"></span>由左至右畫高低
                    <span className="hidden md:inline mx-3 text-slate-600">➔</span>
                  </span>
                  <span className="whitespace-nowrap hover:text-white transition-colors flex items-center justify-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-600 md:hidden"></span>看出方向等成形
                    <span className="hidden md:inline mx-3 text-slate-600">➔</span>
                  </span>
                  <span className="whitespace-nowrap hover:text-white transition-colors flex items-center justify-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-600 md:hidden"></span>三壓三撐專注盯
                    <span className="hidden md:inline mx-3 text-slate-600">➔</span>
                  </span>
                  <span className="whitespace-nowrap text-indigo-300 hover:text-white transition-colors flex items-center justify-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 md:hidden"></span>突破敲單好心情
                  </span>
                </div>
              </div>

              <div className="shrink-0 w-full md:w-auto">
                <div className="bg-indigo-600 text-white py-2.5 px-6 rounded-xl text-xs md:text-sm font-black tracking-[0.2em] uppercase shadow-lg shadow-indigo-900/50 text-center border border-indigo-500/50 cursor-default">
                  一致性是核心
                </div>
              </div>
            </div>
          </footer>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav aria-label="行動版導覽" className="fixed bottom-0 left-0 w-full glass border-t border-slate-200/50 md:hidden z-50 pb-safe shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <div className="flex justify-around items-center px-4 py-3">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
                aria-current={activeTab === item.id ? 'page' : undefined}
              onClick={() => {
                setActiveTab(item.id);
                window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
              }}
              className={`flex flex-col items-center justify-center p-2 rounded-2xl transition-all w-full gap-1.5 ${activeTab === item.id
                ? 'text-indigo-600 bg-indigo-50/80 scale-105'
                : 'text-slate-400 hover:text-slate-600'
                }`}
            >
              <item.icon size={24} strokeWidth={activeTab === item.id ? 2.5 : 2} />
              <span className="text-[10px] font-bold tracking-wide">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default App;