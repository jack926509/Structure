import React, { useState } from 'react';
import { TrendingUp, TrendingDown, AlertCircle, Eye, ChevronUp } from 'lucide-react';
import { SentimentType, PatternVisualData } from '../types';
import { PatternVisualizer } from './PatternVisualizer';

interface SentimentCardProps {
  title: string;
  sentiment: string;
  type: SentimentType;
  note?: string;
  visualData?: PatternVisualData;
}

export const SentimentCard: React.FC<SentimentCardProps> = ({ title, sentiment, type, note, visualData }) => {
  const [showVisual, setShowVisual] = useState(false);
  const isBullish = type === 'bullish';

  return (
    <div className={`group relative p-5 rounded-3xl border transition-all duration-500 overflow-hidden ${isBullish
        ? 'bg-white/60 backdrop-blur-md border-emerald-100/50 shadow-lg shadow-emerald-500/5 hover:bg-white/80 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-500/10 hover:-translate-y-1'
        : 'bg-white/60 backdrop-blur-md border-rose-100/50 shadow-lg shadow-rose-500/5 hover:bg-white/80 hover:border-rose-200 hover:shadow-xl hover:shadow-rose-500/10 hover:-translate-y-1'
      }`}>
      {/* Decorative gradient blob */}
      <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-20 transition-opacity duration-500 group-hover:opacity-40 pointer-events-none ${isBullish ? 'bg-emerald-400' : 'bg-rose-400'
        }`} />

      <div className="relative flex items-start justify-between mb-4 z-10">
        <div className="flex items-center gap-4">
          <span className={`flex items-center justify-center w-12 h-12 rounded-2xl font-bold text-sm shadow-inner shrink-0 transition-transform duration-500 group-hover:scale-110 ${isBullish
              ? 'bg-gradient-to-br from-emerald-100 to-emerald-50 text-emerald-600 ring-1 ring-emerald-200/50'
              : 'bg-gradient-to-br from-rose-100 to-rose-50 text-rose-600 ring-1 ring-rose-200/50'
            }`}>
            {isBullish ? <TrendingUp size={22} strokeWidth={2.5} /> : <TrendingDown size={22} strokeWidth={2.5} />}
          </span>
          <div className="flex flex-col">
            <h3 className={`font-black text-xl leading-none font-outfit ${isBullish ? 'text-emerald-950' : 'text-rose-950'}`}>
              {title}
            </h3>
            {note && (
              <span className={`inline-flex items-center gap-1.5 mt-1.5 text-[11px] font-bold uppercase tracking-wider ${isBullish ? 'text-emerald-600/80' : 'text-rose-600/80'
                }`}>
                <AlertCircle size={10} strokeWidth={3} /> {note}
              </span>
            )}
          </div>
        </div>

        {visualData && (
          <button
            aria-expanded={showVisual}
            aria-label={`${title}：${showVisual ? '收起演示' : '圖解演示'}`}
            onClick={() => setShowVisual(!showVisual)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 border ${showVisual
                ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/30'
                : 'bg-white/50 border-slate-200/60 text-slate-500 hover:bg-white hover:text-indigo-600 hover:border-indigo-200 hover:shadow-md'
              }`}
          >
            {showVisual ? <ChevronUp size={14} strokeWidth={3} /> : <Eye size={14} strokeWidth={3} />}
            {showVisual ? '收起演示' : '圖解演示'}
          </button>
        )}
      </div>

      <div className="relative pl-5 border-l-2 border-slate-200/60 group-hover:border-indigo-500/30 transition-colors z-10">
        <p className="text-[15px] font-medium text-slate-600 leading-relaxed group-hover:text-slate-900 transition-colors">
          {sentiment}
        </p>
      </div>

      {showVisual && visualData && (
        <div className="mt-6 p-4 bg-slate-50/50 rounded-2xl border border-slate-100/80 animate-in slide-in-from-top-4 fade-in duration-500 origin-top">
          <PatternVisualizer data={visualData} isBullish={isBullish} />
        </div>
      )}
    </div>
  );
};