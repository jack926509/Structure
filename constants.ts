import { PatternsData } from './types';

export const PATTERNS: PatternsData = {
  bullish: [
    { 
      title: "W 底", 
      sentiment: "市場結構從低破前低、高不過前高轉為低維持前低時就要注意高是否過前高", 
      note: "先挑戰前低",
      visualData: {
        points: [
          {x: 10, y: 15}, {x: 30, y: 55}, {x: 50, y: 30}, {x: 70, y: 55}, {x: 90, y: 15}, {x: 110, y: 5}
        ],
        resistanceLines: [[{x: 10, y: 30}, {x: 110, y: 30}]],
        entryPoint: {x: 90, y: 30},
        stopLossPoint: {x: 70, y: 60}
      }
    },
    { 
      title: "頭肩底", 
      sentiment: "市場結構從低破前低、高不過前高轉為低不破前低時就要注意是否有過前高", 
      note: "先挑戰前高",
      visualData: {
        points: [
          {x: 10, y: 20}, {x: 25, y: 45}, {x: 40, y: 25}, {x: 55, y: 60}, {x: 70, y: 25}, {x: 85, y: 45}, {x: 100, y: 10}
        ],
        resistanceLines: [[{x: 10, y: 25}, {x: 100, y: 25}]],
        entryPoint: {x: 88, y: 25},
        stopLossPoint: {x: 85, y: 50}
      }
    },
    { 
      title: "下飄旗", 
      sentiment: "1 行情快速上漲， 2 震盪下行， 3 跌不過起漲點。 4 當突破震盪區間壓力，快速上漲。",
      visualData: {
        points: [
          {x: 10, y: 60}, {x: 30, y: 10}, {x: 45, y: 30}, {x: 60, y: 20}, {x: 75, y: 40}, {x: 100, y: 10}
        ],
        supportLines: [[{x: 45, y: 30}, {x: 75, y: 40}]],
        resistanceLines: [[{x: 30, y: 10}, {x: 60, y: 20}]],
        entryPoint: {x: 80, y: 20},
        stopLossPoint: {x: 75, y: 45}
      }
    },
    { 
      title: "下降楔形", 
      sentiment: "市場結構低破前低、高不過前高，但低破前低的幅度明顯比高不過前高更平緩",
      visualData: {
        points: [
          {x: 10, y: 10}, {x: 30, y: 40}, {x: 50, y: 25}, {x: 70, y: 45}, {x: 85, y: 35}, {x: 100, y: 15}
        ],
        resistanceLines: [[{x: 10, y: 10}, {x: 85, y: 35}]],
        supportLines: [[{x: 30, y: 40}, {x: 70, y: 45}]],
        entryPoint: {x: 90, y: 30},
        stopLossPoint: {x: 70, y: 50}
      }
    },
    { 
      title: "破底翻", 
      sentiment: "箱型震盪一段時間，破箱型底後在底部發生V型反轉",
      visualData: {
        points: [
          {x: 10, y: 25}, {x: 30, y: 45}, {x: 50, y: 25}, {x: 65, y: 45}, {x: 75, y: 60}, {x: 85, y: 40}, {x: 100, y: 15}
        ],
        supportLines: [[{x: 10, y: 45}, {x: 100, y: 45}]],
        entryPoint: {x: 88, y: 45},
        stopLossPoint: {x: 75, y: 65}
      }
    },
    { 
      title: "上升三角形", 
      sentiment: "高維持前高、低緩步墊高；五浪結構原則，整理至三角形2/3處之後向上突破",
      visualData: {
        points: [
          {x: 10, y: 40}, {x: 30, y: 20}, {x: 50, y: 45}, {x: 70, y: 20}, {x: 85, y: 35}, {x: 100, y: 10}
        ],
        resistanceLines: [[{x: 30, y: 20}, {x: 100, y: 20}]],
        supportLines: [[{x: 10, y: 40}, {x: 85, y: 35}]],
        entryPoint: {x: 92, y: 20},
        stopLossPoint: {x: 85, y: 40}
      }
    },
    { 
      title: "收斂三角形 (上漲)", 
      sentiment: "當一段下跌或上漲行情開始發生結構改變並且進入整理型態。必須關注是否為高不過前高並且同時低不破前低。",
      visualData: {
        points: [
          {x: 10, y: 60}, {x: 30, y: 10}, {x: 50, y: 50}, {x: 70, y: 25}, {x: 85, y: 40}, {x: 100, y: 10}
        ],
        resistanceLines: [[{x: 30, y: 10}, {x: 85, y: 35}]],
        supportLines: [[{x: 50, y: 50}, {x: 85, y: 40}]],
        entryPoint: {x: 90, y: 30},
        stopLossPoint: {x: 85, y: 45}
      }
    },
    { 
      title: "箱型整理 (上漲)", 
      sentiment: "當一段下跌或上漲行情開始發生結構改變並且進入整理型態。若是高維持前高並且低維持前低，則為箱型整理。",
      visualData: {
        points: [
          {x: 10, y: 50}, {x: 25, y: 20}, {x: 40, y: 50}, {x: 55, y: 20}, {x: 70, y: 50}, {x: 85, y: 20}, {x: 100, y: 5}
        ],
        resistanceLines: [[{x: 20, y: 20}, {x: 90, y: 20}]],
        supportLines: [[{x: 10, y: 50}, {x: 80, y: 50}]],
        entryPoint: {x: 90, y: 20},
        stopLossPoint: {x: 70, y: 55}
      }
    },
  ],
  bearish: [
    { 
      title: "M 頭", 
      sentiment: "市場結構從高過前高、低不破前低轉為高維持前高時就要注意低是否破前低", 
      note: "先挑戰前高",
      visualData: {
        points: [
          {x: 10, y: 55}, {x: 30, y: 15}, {x: 50, y: 40}, {x: 70, y: 15}, {x: 90, y: 55}, {x: 110, y: 65}
        ],
        supportLines: [[{x: 10, y: 40}, {x: 110, y: 40}]],
        entryPoint: {x: 90, y: 40},
        stopLossPoint: {x: 70, y: 10}
      }
    },
    { 
      title: "頭肩頂", 
      sentiment: "市場結構從高過前高、低不破前低轉為高不過前高時就要注意是否有破前低", 
      note: "先挑戰前高",
      visualData: {
        points: [
          {x: 10, y: 50}, {x: 25, y: 25}, {x: 40, y: 45}, {x: 55, y: 10}, {x: 70, y: 45}, {x: 85, y: 25}, {x: 100, y: 60}
        ],
        supportLines: [[{x: 10, y: 45}, {x: 100, y: 45}]],
        entryPoint: {x: 88, y: 45},
        stopLossPoint: {x: 85, y: 20}
      }
    },
    { 
      title: "上飄旗", 
      sentiment: "1 行情快速下跌， 2 震盪上行， 3 不漲過起跌點。 4 當跌破震盪區間支撐，快速下跌。",
      visualData: {
        points: [
          {x: 10, y: 10}, {x: 30, y: 60}, {x: 45, y: 40}, {x: 60, y: 50}, {x: 75, y: 30}, {x: 100, y: 60}
        ],
        resistanceLines: [[{x: 45, y: 40}, {x: 75, y: 30}]],
        supportLines: [[{x: 30, y: 60}, {x: 60, y: 50}]],
        entryPoint: {x: 80, y: 50},
        stopLossPoint: {x: 75, y: 25}
      }
    },
    { 
      title: "上升楔形", 
      sentiment: "市場結構高過前高、低不破前低，訴高過前高的幅度明顯比低不破前低更平緩",
      visualData: {
        points: [
          {x: 10, y: 60}, {x: 30, y: 30}, {x: 50, y: 45}, {x: 70, y: 25}, {x: 85, y: 35}, {x: 100, y: 55}
        ],
        resistanceLines: [[{x: 30, y: 30}, {x: 70, y: 25}]],
        supportLines: [[{x: 10, y: 60}, {x: 85, y: 35}]],
        entryPoint: {x: 90, y: 40},
        stopLossPoint: {x: 70, y: 20}
      }
    },
    { 
      title: "破頂翻", 
      sentiment: "箱型震盪一段時間，漲過箱型頂部後在頂部發生倒V反轉",
      visualData: {
        points: [
          {x: 10, y: 45}, {x: 30, y: 25}, {x: 50, y: 45}, {x: 65, y: 25}, {x: 75, y: 10}, {x: 85, y: 30}, {x: 100, y: 55}
        ],
        resistanceLines: [[{x: 10, y: 25}, {x: 100, y: 25}]],
        entryPoint: {x: 88, y: 25},
        stopLossPoint: {x: 75, y: 5}
      }
    },
    { 
      title: "下降三角形", 
      sentiment: "低維持前低、高越來越低；五浪結構原則，整理至三角形2/3處之後向下突破",
      visualData: {
        points: [
          {x: 10, y: 30}, {x: 30, y: 50}, {x: 50, y: 25}, {x: 70, y: 50}, {x: 85, y: 35}, {x: 100, y: 60}
        ],
        resistanceLines: [[{x: 10, y: 30}, {x: 85, y: 35}]],
        supportLines: [[{x: 30, y: 50}, {x: 100, y: 50}]],
        entryPoint: {x: 92, y: 50},
        stopLossPoint: {x: 85, y: 30}
      }
    },
    { 
      title: "收斂三角形 (下跌)", 
      sentiment: "當一段下跌或上漲行情開始發生結構改變並且進入整理型態。必須關注是否為高不過前高並且同時低不破前低。",
      visualData: {
        points: [
          {x: 10, y: 10}, {x: 30, y: 60}, {x: 50, y: 20}, {x: 70, y: 45}, {x: 85, y: 30}, {x: 100, y: 60}
        ],
        resistanceLines: [[{x: 50, y: 20}, {x: 85, y: 30}]],
        supportLines: [[{x: 30, y: 60}, {x: 85, y: 45}]],
        entryPoint: {x: 90, y: 40},
        stopLossPoint: {x: 85, y: 25}
      }
    },
    { 
      title: "箱型整理 (下跌)", 
      sentiment: "當一段下跌或上漲行情開始發生結構改變並且進入整理型態。若是高維持前高並且低維持前低，則為箱型整理。",
      visualData: {
        points: [
          {x: 10, y: 20}, {x: 25, y: 50}, {x: 40, y: 20}, {x: 55, y: 50}, {x: 70, y: 20}, {x: 85, y: 50}, {x: 100, y: 65}
        ],
        resistanceLines: [[{x: 10, y: 20}, {x: 80, y: 20}]],
        supportLines: [[{x: 20, y: 50}, {x: 90, y: 50}]],
        entryPoint: {x: 90, y: 50},
        stopLossPoint: {x: 70, y: 15}
      }
    },
  ]
};

// 五步驟數據
export const PRINCIPLES_STEPS = [
  {
    number: "1",
    title: "高低點",
    iconName: "MoveRight",
    colorClass: "bg-blue-600",
    content: "掌握方向：高過前高減少做空(找多方)；低破前低減少做多(找空方)。未破高低中間皆為整理。"
  },
  {
    number: "2",
    title: "驅動浪",
    iconName: "Zap",
    colorClass: "bg-amber-600",
    content: "結構劃分：驅動浪頂/底點「以左」不畫進結構。Long KL(頂斜下畫)；Short KL(底斜上畫)。"
  },
  {
    number: "3",
    title: "第一浪在哪",
    iconName: "Target",
    colorClass: "bg-emerald-600",
    content: "數浪起點：反向1浪判斷。普遍型態為驅動浪走完回調第1浪為1。反轉三角則從KL走出的為1。"
  },
  {
    number: "4",
    title: "決定出手與否",
    iconName: "ShieldCheck",
    colorClass: "bg-indigo-600",
    content: "突破定義：必須符合「當時區、實體長紅/黑、等收盤」。引線破視為帶高帶低，不視為突破。"
  },
  {
    number: "5",
    title: "時區鑑定",
    iconName: "Clock",
    colorClass: "bg-rose-600",
    content: "洞洞理論：型態不能中出型態。需找到5浪完整結構做比較。洞洞是時間留下的痕跡。"
  }
];

// 高低點數據
export const HIGH_LOW_CARDS = [
  {
    title: "破價位",
    iconName: "GitCommitVertical",
    colorTheme: "indigo",
    items: ['不做單', '看回條', '多單出場', '小高小低轉成大高大低']
  },
  {
    title: "破 A 低",
    iconName: "ArrowRightLeft",
    colorTheme: "amber",
    items: ['結構轉換', '結構轉換不等於反轉']
  },
  {
    title: "破 1 高",
    iconName: "TrendingUp",
    colorTheme: "emerald",
    items: ['多方思維出場', '處於中立狀態']
  },
  {
    title: "破 2 低",
    iconName: "TrendingDown",
    colorTheme: "rose",
    items: ['偏空的想法']
  },
  {
    title: "破 0",
    iconName: "AlertCircle",
    colorTheme: "slate",
    items: ['看空不做空']
  }
];

export const EXTRACTION_TIPS = {
  klDrawing: [
    {
      title: "Long KL (多方關鍵位)",
      desc: "驅動浪頂點 ➔ 往「斜下方」畫線",
      colorClass: "text-emerald-600"
    },
    {
      title: "Short KL (空方關鍵位)",
      desc: "驅動浪底點 ➔ 往「斜上方」畫線",
      colorClass: "text-rose-600"
    }
  ],
  wavePrinciples: [
    { text: "5 浪為「型態/完整結構」" },
    { text: "3 浪僅屬於「結構範疇」" },
    { text: "反轉三角：從 KL 走出的第一浪視為 1", highlight: true }
  ]
};