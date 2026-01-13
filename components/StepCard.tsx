import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StepCardProps {
  number: string;
  title: string;
  content: string;
  icon: React.ElementType;
  colorClass: string;
}

export const StepCard: React.FC<StepCardProps> = ({ number, title, content, icon: Icon, colorClass }) => (
  <div className="glass p-5 md:p-6 rounded-[1.5rem] shadow-sm hover:shadow-xl transition-all duration-500 relative overflow-hidden group h-full hover:-translate-y-1">
    <div className={`absolute -right-8 -top-8 w-32 h-32 opacity-[0.03] group-hover:opacity-10 transition-all duration-500 ${colorClass.replace('bg-', 'bg-text-')} rounded-full transform group-hover:scale-125`}></div>
    <div className={`absolute right-5 top-5 opacity-20 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12 ${colorClass.replace('bg-', 'text-')}`}>
      <Icon size={48} strokeWidth={1.5} />
    </div>

    <div className="flex items-center gap-4 mb-5 relative z-10">
      <span className={`flex items-center justify-center w-12 h-12 rounded-2xl text-white font-black text-xl shadow-lg shadow-indigo-500/10 ${colorClass}`}>
        {number}
      </span>
      <h4 className="font-black text-slate-800 text-lg font-outfit tracking-tight leading-tight">{title}</h4>
    </div>
    <div className="text-[15px] text-slate-600 leading-relaxed font-medium relative z-10">
      {content}
    </div>
  </div>
);