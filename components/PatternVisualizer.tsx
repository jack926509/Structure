import React, { useEffect, useState } from 'react';
import { PatternVisualData } from '../types';
import { PlayCircle, RefreshCw } from 'lucide-react';

interface PatternVisualizerProps {
  data: PatternVisualData;
  isBullish: boolean;
}

export const PatternVisualizer: React.FC<PatternVisualizerProps> = ({ data, isBullish }) => {
  const [key, setKey] = useState(0); // Used to restart animation
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Small delay to ensure render before animation starts if toggled
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, [key]);

  const replay = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsVisible(false);
    setKey(prev => prev + 1);
  };

  const toPath = (points: { x: number, y: number }[]) => {
    if (points.length === 0) return '';
    return `M ${points[0].x} ${points[0].y} ` + points.slice(1).map(p => `L ${p.x} ${p.y}`).join(' ');
  };

  const themeColor = isBullish ? '#10b981' : '#f43f5e'; // emerald-500 : rose-500

  return (
    <div className="w-full bg-white/40 backdrop-blur-sm rounded-xl border border-white/50 p-4 mt-4 relative overflow-hidden shadow-inner">
      <div className="absolute top-2 right-2 z-10">
        <button
          onClick={replay}
          className="p-1.5 rounded-full bg-white text-slate-500 shadow-sm hover:text-indigo-600 border border-slate-200 transition-colors"
          title="Replay Animation"
        >
          <RefreshCw size={14} />
        </button>
      </div>

      <div className="aspect-[16/9] w-full max-h-[200px] flex items-center justify-center">
        <svg viewBox="0 0 120 70" className="w-full h-full overflow-visible">
          {/* Grid lines (Subtle) */}
          <line x1="0" y1="17.5" x2="120" y2="17.5" stroke="#e2e8f0" strokeWidth="0.5" strokeDasharray="2,2" />
          <line x1="0" y1="35" x2="120" y2="35" stroke="#e2e8f0" strokeWidth="0.5" strokeDasharray="2,2" />
          <line x1="0" y1="52.5" x2="120" y2="52.5" stroke="#e2e8f0" strokeWidth="0.5" strokeDasharray="2,2" />

          {/* Support Lines */}
          {data.supportLines?.map((line, i) => (
            <path
              key={`sup-${i}`}
              d={toPath(line)}
              stroke="#94a3b8"
              strokeWidth="1"
              strokeDasharray="4,2"
              fill="none"
              opacity="0.6"
            />
          ))}

          {/* Resistance Lines */}
          {data.resistanceLines?.map((line, i) => (
            <path
              key={`res-${i}`}
              d={toPath(line)}
              stroke="#94a3b8"
              strokeWidth="1"
              strokeDasharray="4,2"
              fill="none"
              opacity="0.6"
            />
          ))}

          {/* Main Price Line with Animation */}
          {isVisible && (
            <path
              d={toPath(data.points)}
              fill="none"
              stroke={themeColor}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-draw-path"
              style={{
                filter: `drop-shadow(0 4px 6px ${isBullish ? 'rgba(16, 185, 129, 0.2)' : 'rgba(244, 63, 94, 0.2)'})`
              }}
            />
          )}

          {/* Entry Point Marker (Appears after animation) */}
          {isVisible && data.entryPoint && (
            <g className="animate-fade-in-delayed">
              <circle cx={data.entryPoint.x} cy={data.entryPoint.y} r="3" fill="white" stroke={themeColor} strokeWidth="2" />
              <text x={data.entryPoint.x} y={data.entryPoint.y - 6} textAnchor="middle" fontSize="5" fontWeight="bold" fill="#334155">Entry</text>
            </g>
          )}

          {/* Stop Loss Marker */}
          {isVisible && data.stopLossPoint && (
            <g className="animate-fade-in-delayed">
              <circle cx={data.stopLossPoint.x} cy={data.stopLossPoint.y} r="2" fill="#ef4444" />
              <text x={data.stopLossPoint.x} y={data.stopLossPoint.y + 8} textAnchor="middle" fontSize="4" fill="#ef4444">SL</text>
            </g>
          )}
        </svg>
      </div>

      <style>{`
        .animate-draw-path {
          stroke-dasharray: 300;
          stroke-dashoffset: 300;
          animation: draw 2s ease-out forwards;
        }
        .animate-fade-in-delayed {
          opacity: 0;
          animation: fadeIn 0.5s ease-out 1.5s forwards;
        }
        @keyframes draw {
          to {
            stroke-dashoffset: 0;
          }
        }
        @keyframes fadeIn {
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};
