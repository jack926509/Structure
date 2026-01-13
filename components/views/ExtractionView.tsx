import React from 'react';
import { Compass, BarChart3, Target, AlertCircle } from 'lucide-react';
import { InfoSection } from '../InfoSection';
import { EXTRACTION_TIPS } from '../../constants';

export const ExtractionView = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100 pb-20">
            {/* 繪圖與結構 */}
            <div className="h-full">
                <InfoSection title="實戰繪圖核心" icon={Compass}>
                    <div className="space-y-6">
                        <div className="bg-slate-50/50 p-5 rounded-3xl border border-slate-200/50 relative overflow-hidden group">
                            <div className="flex items-center mb-4">
                                <span className="font-black text-slate-800 text-lg tracking-tight font-outfit">KL 繪製角度</span>
                            </div>
                            <div className="space-y-3 relative z-10">
                                {EXTRACTION_TIPS.klDrawing.map((tip, idx) => (
                                    <div key={idx} className="bg-white/80 p-4 rounded-2xl border border-white/40 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 backdrop-blur-sm">
                                        <p className={`text-[10px] font-black mb-1 uppercase tracking-widest ${tip.colorClass}`}>{tip.title}</p>
                                        <p className="text-sm font-bold text-slate-700">{tip.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-slate-50/50 p-5 rounded-3xl border border-slate-200/50">
                            <p className="text-[10px] font-black text-slate-400 mb-4 uppercase tracking-[0.2em]">Wave Count Rules</p>
                            <ul className="text-sm space-y-4 font-bold text-slate-700">
                                {EXTRACTION_TIPS.wavePrinciples.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                        <div className={`w-2 h-2 rounded-full mt-2 shrink-0 ${item.highlight ? 'bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]' : 'bg-slate-300'}`}></div>
                                        <span className={`leading-relaxed ${item.highlight ? 'text-indigo-700' : ''}`}>{item.text}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </InfoSection>
            </div>

            {/* 反轉訊號 */}
            <div className="h-full">
                <InfoSection title="反轉訊號特徵" icon={BarChart3}>
                    <div className="grid grid-cols-1 gap-4">
                        <div className="bg-gradient-to-br from-emerald-50/80 to-teal-50/20 p-5 rounded-3xl border border-emerald-100/60 shadow-sm hover:shadow-lg hover:shadow-emerald-500/5 transition-all">
                            <h5 className="font-black text-emerald-900 mb-3 flex items-center gap-2 text-lg">
                                <div className="p-1.5 bg-emerald-200/30 rounded-lg"><AlertCircle size={16} /></div>
                                低檔承接
                            </h5>
                            <p className="text-sm text-emerald-900/80 leading-relaxed font-bold">
                                量大價不跌 (Pin Bar)。<br />
                                底部關鍵價位走出<span className="bg-emerald-100/80 px-1 py-0.5 rounded text-emerald-700 mx-1 shadow-sm">長紅實K</span>，吞沒前一根K棒 2~3 倍。
                            </p>
                        </div>
                        <div className="bg-gradient-to-br from-rose-50/80 to-pink-50/20 p-5 rounded-3xl border border-rose-100/60 shadow-sm hover:shadow-lg hover:shadow-rose-500/5 transition-all">
                            <h5 className="font-black text-rose-900 mb-3 flex items-center gap-2 text-lg">
                                <div className="p-1.5 bg-rose-200/30 rounded-lg"><AlertCircle size={16} /></div>
                                高檔出貨
                            </h5>
                            <p className="text-sm text-rose-900/80 leading-relaxed font-bold">
                                量大價不漲 (Pin Bar)。<br />
                                在高位壓力區出現<span className="bg-rose-100/80 px-1 py-0.5 rounded text-rose-700 mx-1 shadow-sm">動能耗竭</span>引線。
                            </p>
                        </div>
                    </div>
                    <div className="mt-6 p-6 bg-slate-900 rounded-3xl text-white shadow-xl shadow-slate-900/20 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none group-hover:scale-110 transition-transform duration-700">
                            <BarChart3 size={100} />
                        </div>
                        <p className="text-[10px] font-black tracking-[0.2em] text-slate-400 mb-4 uppercase">Structure Pivot</p>
                        <p className="text-sm font-bold flex items-center gap-3 mb-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)] animate-pulse"></span>
                            上漲轉下跌 ✅
                        </p>
                        <p className="text-sm font-bold flex items-center gap-3 text-rose-300">
                            <span className="w-2 h-2 rounded-full bg-rose-400"></span>
                            不是「回調」轉「下跌」 ❌
                        </p>
                        <div className="mt-4 pt-4 border-t border-slate-700/50">
                            <p className="text-xs text-slate-400 leading-relaxed font-medium">※ 當時區視角無法看到結構轉換，代表行情觸及大時區。</p>
                        </div>
                    </div>
                </InfoSection>
            </div>

            {/* 出手鑑定 */}
            <div className="h-full">
                <InfoSection title="出手與突破鑑定" icon={Target}>
                    <div className="space-y-4 font-medium h-full flex flex-col justify-between">
                        <div className="flex flex-col gap-3">
                            {[
                                { id: "1", text: "確認當時區", sub: "不隨意切換" },
                                { id: "2", text: "長紅/黑K實體", sub: "動能確認" },
                                { id: "3", text: "等收盤確認", sub: "拒絕假突破" }
                            ].map((rule) => (
                                <div key={rule.id} className="bg-white/60 p-4 rounded-2xl flex items-center gap-4 border border-slate-200/50 shadow-sm group hover:bg-white hover:border-indigo-100 hover:shadow-md transition-all">
                                    <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-500 text-white flex items-center justify-center text-sm font-black shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform">{rule.id}</span>
                                    <div>
                                        <span className="font-bold text-slate-700 block text-sm">{rule.text}</span>
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{rule.sub}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-4 p-5 bg-rose-50/50 border border-rose-100 rounded-3xl text-sm text-rose-800 leading-relaxed shadow-sm relative overflow-hidden backdrop-blur-sm">
                            <div className="absolute -right-2 -bottom-2 opacity-5 text-rose-900 rotate-12"><AlertCircle size={80} /></div>
                            <div className="flex items-center gap-2 mb-2">
                                <AlertCircle size={16} className="text-rose-600" />
                                <strong className="font-black uppercase tracking-wider text-xs">Warning</strong>
                            </div>
                            <p className="font-bold opacity-90 relative z-10">
                                引線破 = 價格被帶高或帶低，<br />並未真正站穩。
                                <span className="block mt-3 bg-white/80 px-3 py-1.5 rounded-xl text-rose-700 w-fit shadow-sm border border-rose-100/50 text-xs tracking-wide">⛔️ 絕對不可敲單</span>
                            </p>
                        </div>
                    </div>
                </InfoSection>
            </div>
        </div>
    );
};
