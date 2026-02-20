/* eslint-disable @typescript-eslint/no-explicit-any */
declare const gapi: any;
declare const google: any;

import React, { useState, useEffect, useCallback } from 'react';
import {
  HardDrive, FolderOpen, FileText, Table2, Presentation,
  FileImage, Video, File, Search, RefreshCw, LogOut, Sparkles,
  X, AlertCircle, ChevronRight, Cloud, User, PieChart, Star,
  Share2, Clock, Loader2,
} from 'lucide-react';
import { DriveFile, DriveCategory, DriveSummaryResult, DriveStorageQuota } from '../../types';

// ─── Constants ────────────────────────────────────────────────────────────────
const SCOPES = 'https://www.googleapis.com/auth/drive.readonly';
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest';

const EXPORTABLE_MIME: Record<string, string> = {
  'application/vnd.google-apps.document': 'text/plain',
  'application/vnd.google-apps.spreadsheet': 'text/csv',
  'application/vnd.google-apps.presentation': 'text/plain',
};

const CATEGORY_META: Record<DriveCategory, { label: string; icon: React.ElementType; color: string; bg: string }> = {
  all:          { label: '全部',  icon: HardDrive,    color: 'text-slate-600',   bg: 'bg-slate-100' },
  folder:       { label: '資料夾', icon: FolderOpen,  color: 'text-amber-600',   bg: 'bg-amber-50'  },
  document:     { label: '文件',   icon: FileText,    color: 'text-blue-600',    bg: 'bg-blue-50'   },
  spreadsheet:  { label: '試算表', icon: Table2,      color: 'text-emerald-600', bg: 'bg-emerald-50'},
  presentation: { label: '簡報',   icon: Presentation,color: 'text-orange-600',  bg: 'bg-orange-50' },
  pdf:          { label: 'PDF',    icon: FileText,    color: 'text-red-600',     bg: 'bg-red-50'    },
  image:        { label: '圖片',   icon: FileImage,   color: 'text-violet-600',  bg: 'bg-violet-50' },
  video:        { label: '影片',   icon: Video,       color: 'text-pink-600',    bg: 'bg-pink-50'   },
  other:        { label: '其他',   icon: File,        color: 'text-slate-500',   bg: 'bg-slate-50'  },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function getCategory(mimeType: string): DriveCategory {
  if (mimeType === 'application/vnd.google-apps.folder') return 'folder';
  if (['application/vnd.google-apps.document', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword', 'text/plain', 'text/markdown'].includes(mimeType)) return 'document';
  if (['application/vnd.google-apps.spreadsheet', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel', 'text/csv'].includes(mimeType)) return 'spreadsheet';
  if (['application/vnd.google-apps.presentation', 'application/vnd.openxmlformats-officedocument.presentationml.presentation', 'application/vnd.ms-powerpoint'].includes(mimeType)) return 'presentation';
  if (mimeType === 'application/pdf') return 'pdf';
  if (mimeType.startsWith('image/')) return 'image';
  if (mimeType.startsWith('video/')) return 'video';
  return 'other';
}

function formatBytes(bytes: string | undefined): string {
  if (!bytes) return '—';
  const n = parseInt(bytes, 10);
  if (isNaN(n) || n === 0) return '—';
  const units = ['B', 'KB', 'MB', 'GB'];
  let i = 0;
  let v = n;
  while (v >= 1024 && i < units.length - 1) { v /= 1024; i++; }
  return `${v.toFixed(1)} ${units[i]}`;
}

function formatDate(iso: string): string {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('zh-TW', { year: 'numeric', month: 'short', day: 'numeric' });
}

function storagePercent(quota: DriveStorageQuota): number {
  const used = parseInt(quota.usageInDrive, 10) || 0;
  const limit = parseInt(quota.limit, 10) || 1;
  return Math.min(100, Math.round((used / limit) * 100));
}

// ─── Gemini summary call ──────────────────────────────────────────────────────
async function geminiSummarize(content: string, fileName: string, fileType: string): Promise<DriveSummaryResult> {
  const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
  if (!apiKey) throw new Error('缺少 GEMINI_API_KEY，請在 .env.local 中設定。');

  const prompt = `你是一位專業的文件分析師。請用繁體中文分析以下來自「${fileName}」的文件內容，並以 JSON 格式回應（不要加任何 markdown）：
{
  "summary": "100-200字的摘要",
  "keywords": ["關鍵字1","關鍵字2","關鍵字3","關鍵字4","關鍵字5"]
}

文件類型：${fileType}
文件內容（最多 4000 字）：
${content.slice(0, 4000)}`;

  const resp = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
    }
  );
  if (!resp.ok) throw new Error(`Gemini API 錯誤：${resp.status}`);
  const data = await resp.json();
  const text: string = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
  try {
    const cleaned = text.replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(cleaned);
    return { summary: parsed.summary ?? text, keywords: parsed.keywords ?? [], fileType };
  } catch {
    return { summary: text, keywords: [], fileType };
  }
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function FileIcon({ mimeType, size = 20 }: { mimeType: string; size?: number }) {
  const cat = getCategory(mimeType);
  const { icon: Icon, color } = CATEGORY_META[cat];
  return <Icon size={size} className={color} />;
}

function FileSummaryPanel({
  file,
  onClose,
}: {
  file: DriveFile;
  onClose: () => void;
}) {
  const [state, setState] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [result, setResult] = useState<DriveSummaryResult | null>(null);
  const [error, setError] = useState('');
  const cat = getCategory(file.mimeType);

  const canSummarize = ['document', 'spreadsheet', 'presentation'].includes(cat);

  const handleSummarize = useCallback(async () => {
    setState('loading');
    setError('');
    try {
      let content = '';
      const exportMime = EXPORTABLE_MIME[file.mimeType];
      if (exportMime) {
        // Google Workspace file – export as text
        const resp = await gapi.client.drive.files.export({ fileId: file.id, mimeType: exportMime });
        content = resp.body ?? '';
      } else {
        // Plain text / markdown download
        const resp = await gapi.client.drive.files.get({ fileId: file.id, alt: 'media' });
        content = resp.body ?? '';
      }
      if (!content.trim()) {
        setResult({ summary: '此檔案內容為空，無法摘要。', keywords: [], fileType: file.mimeType });
      } else {
        const r = await geminiSummarize(content, file.name, file.mimeType);
        setResult(r);
      }
      setState('done');
    } catch (e: any) {
      setError(e?.message ?? '摘要失敗');
      setState('error');
    }
  }, [file]);

  const { icon: CatIcon, color: catColor, bg: catBg, label: catLabel } = CATEGORY_META[cat];

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm" onClick={onClose}>
      <div
        className="w-full max-w-lg glass rounded-[1.5rem] shadow-2xl p-6 flex flex-col gap-5"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start gap-3">
          <div className={`p-3 rounded-xl ${catBg} shrink-0`}>
            <CatIcon size={22} className={catColor} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-slate-900 text-sm leading-snug line-clamp-2">{file.name}</p>
            <p className="text-xs text-slate-500 mt-0.5">{catLabel} · {formatDate(file.modifiedTime)} · {formatBytes(file.size)}</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors shrink-0">
            <X size={18} />
          </button>
        </div>

        {/* Metadata row */}
        {file.owners && file.owners.length > 0 && (
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <User size={13} />
            <span>{file.owners[0].displayName}</span>
            {file.shared && <><Share2 size={12} className="ml-2" /><span>已共享</span></>}
            {file.starred && <><Star size={12} className="ml-2 text-amber-500" /><span className="text-amber-600">已加星號</span></>}
          </div>
        )}

        {/* Summary area */}
        {canSummarize ? (
          <div className="flex flex-col gap-4">
            {state === 'idle' && (
              <button
                onClick={handleSummarize}
                className="flex items-center justify-center gap-2 bg-gradient-to-br from-indigo-600 to-violet-600 text-white py-3 px-6 rounded-xl font-bold text-sm shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all hover:scale-[1.02] active:scale-100"
              >
                <Sparkles size={18} />
                用 AI 生成摘要
              </button>
            )}
            {state === 'loading' && (
              <div className="flex flex-col items-center gap-3 py-6 text-slate-500">
                <Loader2 size={28} className="animate-spin text-indigo-500" />
                <p className="text-sm font-medium">正在讀取並分析文件…</p>
              </div>
            )}
            {state === 'error' && (
              <div className="flex flex-col gap-3">
                <div className="flex items-start gap-2 bg-red-50 border border-red-100 rounded-xl p-4 text-red-700 text-sm">
                  <AlertCircle size={16} className="shrink-0 mt-0.5" />
                  <p>{error}</p>
                </div>
                <button onClick={handleSummarize} className="text-sm text-indigo-600 hover:underline">重試</button>
              </div>
            )}
            {state === 'done' && result && (
              <div className="flex flex-col gap-4">
                <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4">
                  <p className="text-xs font-bold text-indigo-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Sparkles size={12} /> AI 摘要
                  </p>
                  <p className="text-sm text-slate-700 leading-relaxed">{result.summary}</p>
                </div>
                {result.keywords.length > 0 && (
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">關鍵字</p>
                    <div className="flex flex-wrap gap-2">
                      {result.keywords.map(kw => (
                        <span key={kw} className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-medium">
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                <button onClick={handleSummarize} className="text-xs text-indigo-600 hover:underline self-start">重新生成</button>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 text-sm text-slate-500 text-center">
            此檔案類型（{catLabel}）目前不支援 AI 摘要。
            {file.webViewLink && (
              <a href={file.webViewLink} target="_blank" rel="noreferrer" className="block mt-2 text-indigo-600 font-medium hover:underline">
                在 Google 雲端開啟 →
              </a>
            )}
          </div>
        )}

        {/* Open in Drive */}
        {file.webViewLink && state !== 'done' && (
          <a href={file.webViewLink} target="_blank" rel="noreferrer"
            className="flex items-center justify-center gap-2 border border-slate-200 rounded-xl py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors">
            在 Google 雲端硬碟開啟
            <ChevronRight size={15} />
          </a>
        )}
      </div>
    </div>
  );
}

// ─── Main DriveView ───────────────────────────────────────────────────────────
export function DriveView() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const apiKey = process.env.GOOGLE_API_KEY;

  const [gapiReady, setGapiReady] = useState(false);
  const [gisReady, setGisReady] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userInfo, setUserInfo] = useState<{ name: string; email: string; photo?: string } | null>(null);

  const [files, setFiles] = useState<DriveFile[]>([]);
  const [quota, setQuota] = useState<DriveStorageQuota | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState('');

  const [category, setCategory] = useState<DriveCategory>('all');
  const [search, setSearch] = useState('');
  const [selectedFile, setSelectedFile] = useState<DriveFile | null>(null);

  // Token client ref
  const tokenClientRef = React.useRef<any>(null);

  // ── Init gapi ─────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!clientId || !apiKey) return;

    function initGapi() {
      gapi.load('client', async () => {
        try {
          await gapi.client.init({ apiKey, discoveryDocs: [DISCOVERY_DOC] });
          setGapiReady(true);
        } catch {
          setGapiReady(false);
        }
      });
    }

    if (typeof gapi !== 'undefined') {
      initGapi();
    } else {
      const el = document.querySelector('script[src*="api.js"]');
      el?.addEventListener('load', initGapi);
    }
  }, [clientId, apiKey]);

  // ── Init GIS ──────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!clientId) return;

    function initGis() {
      tokenClientRef.current = google.accounts.oauth2.initTokenClient({
        client_id: clientId,
        scope: SCOPES,
        callback: async (resp: any) => {
          if (resp.error) { setFetchError(resp.error); return; }
          gapi.client.setToken(resp);
          setIsSignedIn(true);
          await fetchUserInfo();
          await fetchFiles();
        },
      });
      setGisReady(true);
    }

    if (typeof google !== 'undefined') {
      initGis();
    } else {
      const el = document.querySelector('script[src*="gsi/client"]');
      el?.addEventListener('load', initGis);
    }
  }, [clientId]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Fetch user info ────────────────────────────────────────────────────────
  const fetchUserInfo = async () => {
    try {
      const resp = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${gapi.client.getToken()?.access_token}` },
      });
      const data = await resp.json();
      setUserInfo({ name: data.name, email: data.email, photo: data.picture });
    } catch { /* ignore */ }
  };

  // ── Fetch files & quota ───────────────────────────────────────────────────
  const fetchFiles = useCallback(async () => {
    setLoading(true);
    setFetchError('');
    try {
      // Storage quota
      const aboutResp = await gapi.client.drive.about.get({ fields: 'storageQuota' });
      setQuota(aboutResp.result.storageQuota);

      // File list
      const resp = await gapi.client.drive.files.list({
        pageSize: 200,
        orderBy: 'modifiedTime desc',
        fields: 'files(id,name,mimeType,size,modifiedTime,webViewLink,thumbnailLink,iconLink,owners,parents,shared,starred)',
      });
      setFiles(resp.result.files ?? []);
    } catch (e: any) {
      setFetchError(e?.result?.error?.message ?? '讀取失敗，請重試。');
    } finally {
      setLoading(false);
    }
  }, []);

  // ── Sign in / out ──────────────────────────────────────────────────────────
  const handleSignIn = () => {
    if (!tokenClientRef.current) return;
    if (gapi.client.getToken()) {
      tokenClientRef.current.requestAccessToken({ prompt: '' });
    } else {
      tokenClientRef.current.requestAccessToken({ prompt: 'consent' });
    }
  };

  const handleSignOut = () => {
    const token = gapi.client.getToken();
    if (token) google.accounts.oauth2.revoke(token.access_token);
    gapi.client.setToken(null);
    setIsSignedIn(false);
    setUserInfo(null);
    setFiles([]);
    setQuota(null);
  };

  // ── Filter logic ──────────────────────────────────────────────────────────
  const filteredFiles = files.filter(f => {
    const matchCat = category === 'all' || getCategory(f.mimeType) === category;
    const matchSearch = f.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  // Category counts
  const categoryCounts: Partial<Record<DriveCategory, number>> = {};
  for (const f of files) {
    const c = getCategory(f.mimeType);
    categoryCounts[c] = (categoryCounts[c] ?? 0) + 1;
  }

  // ─── Missing credentials UI ──────────────────────────────────────────────
  if (!clientId || !apiKey) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center px-4">
        <div className="bg-amber-50 border border-amber-200 rounded-[1.5rem] p-8 max-w-lg w-full">
          <AlertCircle size={32} className="text-amber-500 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-slate-900 mb-2">尚未設定 Google API 憑證</h3>
          <p className="text-sm text-slate-600 mb-4">請在專案根目錄建立 <code className="bg-amber-100 px-1.5 py-0.5 rounded text-amber-700">.env.local</code> 並設定以下環境變數：</p>
          <pre className="text-left text-xs bg-slate-900 text-slate-200 rounded-xl p-4 overflow-x-auto">
{`GOOGLE_CLIENT_ID=你的_OAuth_Client_ID
GOOGLE_API_KEY=你的_Drive_API_Key
GEMINI_API_KEY=你的_Gemini_API_Key`}
          </pre>
          <p className="text-xs text-slate-500 mt-4">
            前往 <strong>Google Cloud Console</strong> → 建立 OAuth 2.0 用戶端 ID 與 API 金鑰，並啟用 Google Drive API。
          </p>
        </div>
      </div>
    );
  }

  // ─── Sign-in screen ──────────────────────────────────────────────────────
  if (!isSignedIn) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-8 px-4">
        <div className="glass rounded-[2rem] p-10 max-w-md w-full flex flex-col items-center gap-6 text-center shadow-lg">
          <div className="bg-gradient-to-br from-indigo-600 to-violet-600 p-5 rounded-2xl shadow-xl shadow-indigo-500/30 text-white animate-float">
            <Cloud size={36} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Google 雲端整理助手</h2>
            <p className="text-slate-500 text-sm mt-2 leading-relaxed">
              連結你的 Google 雲端硬碟，自動分類檔案並透過 AI 快速生成摘要
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3 w-full text-center text-xs font-semibold text-slate-500">
            {(['document','spreadsheet','presentation'] as DriveCategory[]).map(c => {
              const { label, icon: Icon, color, bg } = CATEGORY_META[c];
              return (
                <div key={c} className={`${bg} rounded-xl p-3 flex flex-col items-center gap-2`}>
                  <Icon size={20} className={color} />
                  <span>{label}</span>
                </div>
              );
            })}
          </div>
          <button
            onClick={handleSignIn}
            disabled={!gapiReady || !gisReady}
            className="w-full flex items-center justify-center gap-3 bg-white border border-slate-200 rounded-xl py-3.5 px-6 font-bold text-slate-700 shadow-sm hover:shadow-md hover:bg-slate-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            使用 Google 帳號登入
          </button>
          {(!gapiReady || !gisReady) && (
            <p className="text-xs text-slate-400 flex items-center gap-1.5">
              <Loader2 size={12} className="animate-spin" /> 載入 Google API 中…
            </p>
          )}
        </div>
      </div>
    );
  }

  // ─── Main view (signed in) ────────────────────────────────────────────────
  return (
    <div className="flex flex-col gap-6">

      {/* Top bar: user info + actions */}
      <div className="glass rounded-[1.5rem] p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {userInfo?.photo ? (
            <img src={userInfo.photo} alt="avatar" className="w-10 h-10 rounded-full border-2 border-white shadow" />
          ) : (
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
              <User size={18} className="text-indigo-600" />
            </div>
          )}
          <div>
            <p className="font-bold text-slate-900 text-sm">{userInfo?.name ?? '使用者'}</p>
            <p className="text-xs text-slate-500">{userInfo?.email}</p>
          </div>
        </div>

        {/* Storage quota */}
        {quota && (
          <div className="flex items-center gap-3 flex-1 max-w-xs">
            <PieChart size={16} className="text-indigo-500 shrink-0" />
            <div className="flex-1">
              <div className="flex justify-between text-xs text-slate-500 mb-1">
                <span>已使用 {formatBytes(quota.usageInDrive)}</span>
                <span>{formatBytes(quota.limit)}</span>
              </div>
              <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all"
                  style={{ width: `${storagePercent(quota)}%` }}
                />
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            onClick={fetchFiles}
            disabled={loading}
            className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors text-slate-500 hover:text-slate-700 disabled:opacity-50"
            title="重新整理"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          </button>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-colors text-sm font-medium text-slate-600"
          >
            <LogOut size={15} /> 登出
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        <input
          type="text"
          placeholder="搜尋檔案名稱…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-10 pr-10 py-3 glass rounded-xl border-0 outline-none focus:ring-2 focus:ring-indigo-300 text-sm placeholder:text-slate-400"
        />
        {search && (
          <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
            <X size={15} />
          </button>
        )}
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {(['all', 'folder', 'document', 'spreadsheet', 'presentation', 'pdf', 'image', 'video', 'other'] as DriveCategory[]).map(c => {
          const { label, icon: Icon, color, bg } = CATEGORY_META[c];
          const count = c === 'all' ? files.length : (categoryCounts[c] ?? 0);
          const active = category === c;
          return (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                active
                  ? `${bg} ${color} shadow-sm ring-1 ring-slate-200`
                  : 'text-slate-500 hover:bg-slate-100'
              }`}
            >
              <Icon size={13} />
              {label}
              <span className={`ml-0.5 ${active ? 'opacity-70' : 'opacity-50'}`}>({count})</span>
            </button>
          );
        })}
      </div>

      {/* Error */}
      {fetchError && (
        <div className="flex items-start gap-2 bg-red-50 border border-red-100 rounded-xl p-4 text-red-700 text-sm">
          <AlertCircle size={16} className="shrink-0 mt-0.5" />
          <p>{fetchError}</p>
        </div>
      )}

      {/* Loading skeleton */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="glass rounded-xl p-4 animate-pulse flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-100 rounded-xl shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-3 bg-slate-100 rounded-full w-3/4" />
                <div className="h-2 bg-slate-50 rounded-full w-1/2" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* File grid */}
      {!loading && filteredFiles.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredFiles.map(f => {
            const cat = getCategory(f.mimeType);
            const { bg, color } = CATEGORY_META[cat];
            const canSummarize = ['document', 'spreadsheet', 'presentation'].includes(cat);
            return (
              <button
                key={f.id}
                onClick={() => setSelectedFile(f)}
                className="glass rounded-xl p-4 flex items-start gap-3 text-left hover:shadow-md hover:scale-[1.01] transition-all group"
              >
                <div className={`p-2.5 rounded-xl ${bg} shrink-0`}>
                  <FileIcon mimeType={f.mimeType} size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-800 text-sm line-clamp-2 leading-snug group-hover:text-slate-900">
                    {f.name}
                  </p>
                  <div className="flex items-center gap-2 mt-1.5 text-xs text-slate-400">
                    <Clock size={11} />
                    <span>{formatDate(f.modifiedTime)}</span>
                    {f.size && <><span>·</span><span>{formatBytes(f.size)}</span></>}
                  </div>
                </div>
                {canSummarize && (
                  <Sparkles size={14} className={`${color} opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-0.5`} />
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Empty state */}
      {!loading && filteredFiles.length === 0 && !fetchError && (
        <div className="flex flex-col items-center justify-center py-20 gap-4 text-slate-400">
          <HardDrive size={40} strokeWidth={1.5} />
          <p className="font-semibold text-slate-500">找不到符合條件的檔案</p>
          <p className="text-sm">{search ? `搜尋「${search}」無結果` : '此分類目前沒有檔案'}</p>
        </div>
      )}

      {/* Summary panel */}
      {selectedFile && (
        <FileSummaryPanel file={selectedFile} onClose={() => setSelectedFile(null)} />
      )}
    </div>
  );
}
