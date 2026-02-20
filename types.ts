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

// Google Drive types
export type DriveCategory = 'all' | 'folder' | 'document' | 'spreadsheet' | 'presentation' | 'pdf' | 'image' | 'video' | 'other';

export interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  size?: string;
  modifiedTime: string;
  webViewLink?: string;
  thumbnailLink?: string;
  iconLink?: string;
  owners?: Array<{ displayName: string; photoLink?: string; emailAddress?: string }>;
  parents?: string[];
  shared?: boolean;
  starred?: boolean;
}

export interface DriveStorageQuota {
  limit: string;
  usage: string;
  usageInDrive: string;
}

export interface DriveSummaryResult {
  summary: string;
  keywords: string[];
  fileType: string;
}
