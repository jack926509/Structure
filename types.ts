export interface Point {
  x: number;
  y: number;
}

export interface PatternVisualData {
  points: Point[];
  supportLines?: Point[][];
  resistanceLines?: Point[][];
  entryPoint?: Point;
  stopLossPoint?: Point;
  label?: string;
}

export interface Pattern {
  title: string;
  sentiment: string;
  note?: string;
  visualData?: PatternVisualData;
}

export interface PatternsData {
  bullish: Pattern[];
  bearish: Pattern[];
}

export type SentimentType = 'bullish' | 'bearish';
