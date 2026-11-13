import { describe, expect, it } from 'vitest';
import { PATTERNS, PRINCIPLES_STEPS, HIGH_LOW_CARDS, EXTRACTION_TIPS } from '../constants';

describe('教學資料完整性', () => {
  it('保留多空型態與有效圖解座標', () => {
    expect(PATTERNS.bullish).toHaveLength(8);
    expect(PATTERNS.bearish).toHaveLength(8);
    for (const patterns of Object.values(PATTERNS)) {
      expect(new Set(patterns.map(p => p.title)).size).toBe(patterns.length);
      for (const pattern of patterns) {
        expect(pattern.title.trim()).not.toBe('');
        expect(pattern.sentiment.trim()).not.toBe('');
        if (!pattern.visualData) continue;
        expect(pattern.visualData.points.length).toBeGreaterThan(1);
        const data = pattern.visualData;
        const points = [
          ...data.points,
          ...(data.supportLines ?? []).flat(),
          ...(data.resistanceLines ?? []).flat(),
          ...[data.entryPoint, data.stopLossPoint].filter(p => p !== undefined),
        ];
        for (const point of points) {
          expect(Number.isFinite(point.x) && Number.isFinite(point.y)).toBe(true);
        }
      }
    }
  });
  it('保留五步驟、高低點與萃取資料', () => {
    expect(PRINCIPLES_STEPS).toHaveLength(5);
    PRINCIPLES_STEPS.forEach(step => {
      expect(step.title.trim()).not.toBe('');
      expect(step.content.trim()).not.toBe('');
    });
    expect(HIGH_LOW_CARDS).toHaveLength(5);
    HIGH_LOW_CARDS.forEach(card => {
      expect(card.title.trim()).not.toBe('');
      expect(card.items.length).toBeGreaterThan(0);
      card.items.forEach(item => expect(item.trim()).not.toBe(''));
    });
    expect(EXTRACTION_TIPS.klDrawing).toHaveLength(2);
    expect(EXTRACTION_TIPS.wavePrinciples).toHaveLength(3);
    EXTRACTION_TIPS.klDrawing.forEach(tip => expect(tip.desc.trim()).not.toBe(''));
    EXTRACTION_TIPS.wavePrinciples.forEach(tip => expect(tip.text.trim()).not.toBe(''));
  });
});
