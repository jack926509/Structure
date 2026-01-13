import React from 'react';
import { LucideIcon } from 'lucide-react';

interface InfoSectionProps {
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
}

export const InfoSection: React.FC<InfoSectionProps> = ({ title, icon: Icon, children }) => (
  <div className="glass p-5 md:p-6 rounded-[2rem] shadow-lg shadow-indigo-500/5 h-full flex flex-col">
    <h3 className="text-lg md:text-xl font-black mb-5 md:mb-6 text-slate-800 flex items-center gap-3 pb-5 border-b border-slate-200/50 font-outfit">
      <div className="p-2.5 bg-gradient-to-br from-indigo-50 to-indigo-100/50 rounded-xl text-indigo-600 shadow-sm">
        <Icon size={22} strokeWidth={2.5} />
      </div>
      {title}
    </h3>
    <div className="flex-1">
      {children}
    </div>
  </div>
);