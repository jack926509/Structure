# 型態大補帖 Trading Patterns Master

繁體中文靜態交易教學網站，整理多空型態、五步驟原則、萃取技巧與高低點判讀，並提供 SVG 圖解演示。使用 Vite 6、React 19、TypeScript 與 Tailwind CSS 3，支援桌面與行動裝置。

## 開發與驗證

建議使用 Node.js 24 與 npm；相依版本由 `package-lock.json` 固定。網站不需要 API key 或環境變數。

```sh
npm ci
npm run dev
```

開發伺服器預設為 http://localhost:3000。

```sh
npm run lint
npm run typecheck
npm test
npm run build
npm run preview
npm audit --omit=dev --audit-level=high
```

`npm test` 使用 Vitest、Testing Library 與 jsdom，檢查教學資料結構、頁面切換與圖解展開。`npm run build` 執行 TypeScript 檢查並輸出 `dist/`；preview 可本機檢視建置結果。

## 部署

主要部署平台為 Vercel，production 分支為 `main`，framework 為 Vite，建置命令為 `npm run build`，輸出目錄為 `dist`。本次優化不變更遠端專案設定。`vercel.json` 設定 CSP 與其他 HTTP 安全標頭；GitHub Actions 在 push／pull request 執行安裝、lint、型別檢查、測試、建置與 production 依賴稽核，不負責部署。

依 [Vite 官方部署文件](https://vite.dev/guide/static-deploy)，應部署建置後的 `dist/`。現有 GitHub Pages 為 legacy，直接服務 `main` 根目錄原始碼，瀏覽器無法直接執行 `/index.tsx`；此設定保留不動。

## 專案結構

- `index.html`、`index.tsx`：HTML 與 React 進入點。
- `App.tsx`：桌面／行動版導覽與頁面切換。
- `constants.ts`、`types.ts`：教學資料與型別。
- `components/views/`：型態、五步驟、萃取、高低點四個教學頁面，部分文字直接保存在 view 中。
- `components/`：卡片與 SVG 圖解元件。
- `index.css`、`tailwind.config.js`：樣式、動畫與 Tailwind 設定。
- `tests/`：最小回歸測試。
- `.github/workflows/ci.yml`：持續整合檢查。
- `vercel.json`：部署安全標頭。

## 資源與維護注意事項

唯一外部載入資源為 Google Fonts（Inter、Noto Sans TC、Outfit），字型 CSS 來自 `fonts.googleapis.com`，字型檔來自 `fonts.gstatic.com`。圖解為本機 SVG，沒有外部圖片或 API 請求。CSP 只允許同源 script；React 行內樣式需要 `style-src 'unsafe-inline'`。新增外部資源時須同步檢查 CSP。

開發伺服器與 preview 不會自動套用 Vercel 的安全標頭；正式標頭仍需在部署後驗證。Google Fonts 無法連線時會使用系統字型。
