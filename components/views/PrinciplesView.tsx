import React from 'react';
import {
    Zap, ShieldCheck, Clock, Layers, MoveRight, Target, SquareActivity
} from 'lucide-react';
import { StepCard } from '../StepCard';
import { PRINCIPLES_STEPS } from '../../constants';

const ICON_MAP: Record<string, React.ElementType> = {
    MoveRight,
    Zap,
    Target,
    ShieldCheck,
    Clock,
};

export const PrinciplesView = () => {
    return (
        <div className="space-y-6 md:space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
            <div className="glass p-5 md:p-8 rounded-[2.5rem] shadow-xl shadow-indigo-500/5">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-5">
                        <div className="bg-gradient-to-br from-indigo-600 to-indigo-500 p-3.5 rounded-2xl text-white shadow-lg shadow-indigo-500/30">
                            <Layers size={26} strokeWidth={2.5} />
                        </div>
                        <div>
                            <h3 className="text-2xl font-black text-slate-900 tracking-tight font-outfit">五步驟實戰核心</h3>
                            <p className="text-slate-500 font-bold text-xs tracking-widest uppercase mt-0.5">The 5 Core Principles</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                    {PRINCIPLES_STEPS.map((step, idx) => {
                        const Icon = ICON_MAP[step.iconName] || SquareActivity;
                        return (
                            <StepCard
                                key={idx}
                                {...step}
                                icon={Icon}
                            />
                        );
                    })}

                    <div className="bg-gradient-to-br from-slate-50/50 to-slate-100/50 p-6 rounded-[2rem] border-2 border-dashed border-slate-300/60 flex flex-col justify-center min-h-[180px] hover:border-indigo-400 hover:bg-slate-50 transition-all group relative overflow-hidden backdrop-blur-sm">
                        <div className="absolute -right-4 -bottom-4 opacity-[0.05] group-hover:opacity-10 transition-opacity rotate-12">
                            <Target size={120} />
                        </div>
                        <p className="text-[10px] font-black text-slate-400 mb-6 tracking-[0.2em] uppercase">Two Practical Tools</p>
                        <div className="space-y-5 relative z-10">
                            <div className="flex items-center gap-4 group/item">
                                <span className="w-10 h-10 rounded-2xl bg-white text-slate-700 flex items-center justify-center font-black text-sm shadow-sm border border-slate-100 group-hover/item:scale-110 group-hover/item:shadow-md transition-all">1</span>
                                <p className="text-[15px] font-bold text-slate-700">一把切結構轉換</p>
                            </div>
                            <div className="flex items-center gap-4 group/item">
                                <span className="w-10 h-10 rounded-2xl bg-white text-slate-700 flex items-center justify-center font-black text-sm shadow-sm border border-slate-100 group-hover/item:scale-110 group-hover/item:shadow-md transition-all">2</span>
                                <p className="text-[15px] font-bold text-slate-700">一把切驅動浪關鍵價位</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
