import { afterEach, expect, it } from 'vitest';
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import App from '../App';

afterEach(cleanup);

it('啟動並可切換所有教學頁面', () => {
  render(<App />);
  const main = screen.getByRole('main');
  expect(within(main).getByText('W 底')).toBeTruthy();
  for (const label of ['五步驟', '萃取', '高低點', '型態']) {
    fireEvent.click(screen.getAllByRole('button', { name: label })[0]);
    expect(main.textContent?.length).toBeGreaterThan(100);
  }
  fireEvent.click(within(main).getAllByRole('button', { name: /圖解演示/ })[0]);
  expect(screen.getByRole('button', { name: '重播動畫' })).toBeTruthy();
});
