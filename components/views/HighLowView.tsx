import React from 'react';
import {
    LayoutList, Activity, GitCommitVertical, ArrowRightLeft,
    TrendingUp, TrendingDown, AlertCircle, ShieldCheck
} from 'lucide-react';
import { HIGH_LOW_CARDS } from '../../constants';

// Define a map for icons to avoid "any" type issues or huge imports in constants
const ICON_MAP: Record<string, React.ElementType> = {
    GitCommitVertical,
    ArrowRightLeft,
    TrendingUp,
    TrendingDown,
    AlertCircle
};

const THEME_STYLES: Record<string, { bg: string, border: string, text: string, iconBg: string }> = {
    indigo: { bg: 'bg-indigo-50', border: 'border-indigo-100', text: 'text-indigo-900', iconBg: 'bg-indigo-100 text-indigo-600' },
    amber: { bg: 'bg-amber-50', border: 'border-amber-100', text: 'text-amber-900', iconBg: 'bg-amber-100 text-amber-600' },
    emerald: { bg: 'bg-emerald-50', border: 'border-emerald-100', text: 'text-emerald-900', iconBg: 'bg-emerald-100 text-emerald-600' },
    rose: { bg: 'bg-rose-50', border: 'border-rose-100', text: 'text-rose-900', iconBg: 'bg-rose-100 text-rose-600' },
    slate: { bg: 'bg-slate-800', border: 'border-slate-700', text: 'text-white', iconBg: 'bg-slate-700 text-slate-300' },
};

export const HighLowView = () => {
    return (
        <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
            <div className="glass p-6 md:p-10 rounded-[2.5rem] shadow-xl shadow-indigo-500/5 relative overflow-hidden">
                {/* Decorative Background */}
                <div className="absolute right-0 top-0 p-12 opacity-[0.03] pointer-events-none rotate-12">
                    <Activity size={250} />
                </div>

                <div className="flex items-center gap-5 mb-8 relative z-10">
                    <div className="bg-gradient-to-br from-indigo-600 to-indigo-500 p-3.5 rounded-2xl text-white shadow-lg shadow-indigo-500/30">
                        <LayoutList size={26} strokeWidth={2.5} />
                    </div>
                    <h3 className="text-2xl font-black text-slate-800 tracking-tight uppercase font-outfit">高低點理解</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 relative z-10">
                    {HIGH_LOW_CARDS.map((card) => {
                        const Icon = ICON_MAP[card.iconName] || Activity;
                        const theme = THEME_STYLES[card.colorTheme] || THEME_STYLES.indigo;

                        return (
                            <div key={card.title} className={`p-6 rounded-[1.5rem] border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl backdrop-blur-sm ${theme.bg} ${theme.border} bg-opacity-70 hover:bg-opacity-90`}>
                                <div className="flex items-center gap-4 mb-5">
                                    <div className={`p-2.5 rounded-2xl ${theme.iconBg} shadow-sm`}>
                                        <Icon size={22} strokeWidth={2.5} />
                                    </div>
                                    <h4 className={`font-black text-lg ${theme.text}`}>{card.title}</h4>
                                </div>
                                <ul className="space-y-3.5">
                                    {card.items.map((item) => (
                                        <li key={item} className={`flex items-start gap-3 text-[15px] font-bold ${card.colorTheme === 'slate' ? 'text-slate-300' : 'text-slate-600'}`}>
                                            <span className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 ${card.colorTheme === 'slate' ? 'bg-slate-500' : 'bg-slate-400'}`}></span>
                                            <span className="leading-snug">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        );
                    })}
                </div>

                {/* 結構轉換滿足條件 */}
                <div className="mt-8 p-8 md:p-10 rounded-[2.5rem] bg-indigo-600 text-white shadow-xl shadow-indigo-500/20 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-cyan-500/30 transition-colors duration-700"></div>

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
                        <div className="flex items-center gap-5">
                            <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-inner">
                                <ShieldCheck size={36} strokeWidth={2} />
                            </div>
                            <div>
                                <h4 className="text-2xl font-black tracking-tight mb-1 font-outfit">
                                    結構轉換滿足條件
                                </h4>
                                <p className="text-indigo-200 text-xs font-bold uppercase tracking-widest">Criteria for Structural Change</p>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            <span className="px-6 py-4 bg-white/10 backdrop-blur-md rounded-2xl font-black text-[15px] border border-white/20 hover:bg-white/20 hover:scale-105 transition-all cursor-default shadow-sm">
                                破價位破價位
                            </span>
                            <span className="px-6 py-4 bg-white/10 backdrop-blur-md rounded-2xl font-black text-[15px] border border-white/20 hover:bg-white/20 hover:scale-105 transition-all cursor-default shadow-sm">
                                破兩次價位
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
