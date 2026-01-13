import React, { useState } from 'react';
import { ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import { PATTERNS } from '../../constants';
import { SentimentCard } from '../SentimentCard';

export const PatternsView = () => {
    const [mobilePatternFilter, setMobilePatternFilter] = useState<'bullish' | 'bearish'>('bullish');

    return (
        <div className="flex flex-col gap-4 md:gap-8">
            {/* Mobile Toggle for Patterns */}
            <div className="md:hidden flex p-1.5 glass rounded-2xl mx-auto w-full max-w-xs sticky top-20 z-30 shadow-sm shadow-indigo-500/5">
                <button
                    onClick={() => setMobilePatternFilter('bullish')}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${mobilePatternFilter === 'bullish'
                        ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 ring-1 ring-emerald-400'
                        : 'text-slate-400 hover:text-slate-600'
                        }`}
                >
                    <ArrowUpCircle size={18} strokeWidth={2.5} /> 多頭型態
                </button>
                <button
                    onClick={() => setMobilePatternFilter('bearish')}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${mobilePatternFilter === 'bearish'
                        ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30 ring-1 ring-rose-400'
                        : 'text-slate-400 hover:text-slate-600'
                        }`}
                >
                    <ArrowDownCircle size={18} strokeWidth={2.5} /> 空頭型態
                </button>
            </div>

            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                {/* Bullish Column */}
                <div className={`flex-1 transition-all duration-500 ${mobilePatternFilter === 'bearish' ? 'hidden md:block opacity-0 md:opacity-100' : 'block opacity-100'}`}>
                    <div className="hidden md:flex sticky top-24 z-20 mb-8 glass p-2 pr-6 rounded-[2rem] items-center justify-between shadow-sm shadow-emerald-500/5 border border-emerald-100/50 backdrop-blur-xl">
                        <div className="flex items-center gap-4">
                            <div className="p-4 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-[1.5rem] shadow-lg shadow-emerald-500/30">
                                <ArrowUpCircle size={28} className="text-white" strokeWidth={2.5} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black tracking-tight text-emerald-950 font-outfit">上漲型態</h2>
                                <p className="text-emerald-600/60 text-xs font-bold tracking-wider uppercase">Bullish Patterns</p>
                            </div>
                        </div>
                        <div className="px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-xs font-bold uppercase tracking-wider">
                            {PATTERNS.bullish.length} Patterns
                        </div>
                    </div>
                    <div className="space-y-4 md:space-y-6 pb-20 md:pb-0">
                        {PATTERNS.bullish.map((p, idx) => (
                            <SentimentCard key={idx} {...p} type="bullish" />
                        ))}
                    </div>
                </div>

                {/* Bearish Column */}
                <div className={`flex-1 transition-all duration-500 ${mobilePatternFilter === 'bullish' ? 'hidden md:block opacity-0 md:opacity-100' : 'block opacity-100'}`}>
                    <div className="hidden md:flex sticky top-24 z-20 mb-8 glass p-2 pr-6 rounded-[2rem] items-center justify-between shadow-sm shadow-rose-500/5 border border-rose-100/50 backdrop-blur-xl">
                        <div className="flex items-center gap-4">
                            <div className="p-4 bg-gradient-to-br from-rose-500 to-pink-500 rounded-[1.5rem] shadow-lg shadow-rose-500/30">
                                <ArrowDownCircle size={28} className="text-white" strokeWidth={2.5} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black tracking-tight text-rose-950 font-outfit">下跌形態</h2>
                                <p className="text-rose-600/60 text-xs font-bold tracking-wider uppercase">Bearish Patterns</p>
                            </div>
                        </div>
                        <div className="px-4 py-1.5 rounded-full bg-rose-50 border border-rose-100 text-rose-600 text-xs font-bold uppercase tracking-wider">
                            {PATTERNS.bearish.length} Patterns
                        </div>
                    </div>
                    <div className="space-y-4 md:space-y-6 pb-20 md:pb-0">
                        {PATTERNS.bearish.map((p, idx) => (
                            <SentimentCard key={idx} {...p} type="bearish" />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
