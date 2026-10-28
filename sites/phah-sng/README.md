# 打算事務機器行 phah-sǹg — 事務機器行 × Pintori／Olivetti 企業現代主義平面

臺北市中正區博愛路 122 號（門牌虛構）的打字機與加算機店。江明德（1928–2004）1957 年在博愛路騎樓擺攤賣進口手提打字機、修加算機；江美惠（1956–）1985 年接手，把半間店讓給影印機；江以恆（1990–）在米蘭舊書攤翻到一本 1950 年代義大利事務機公司的宣傳冊，2019 年照它重做招牌、紙袋與網站，並把一台 1958 年淡綠手提機鎖在騎樓紅柱上讓路人隨意打——向 1954 年紐約第五大道那台人行道打字機致敬。

打字機清潔整理 NT$2,800 起・膠輥重包 1,600・字錘校正 120／字・加算機修理 650 起・手搖計算機整理 3,200 起・色帶 180・紙帶 220・影印機月租 1,500 起・週六打字課 800・週一至週六 09:30–18:30、週日公休・(02) 2311-1957。人物、店名、門牌、價格為虛構；1954 年第五大道人行道打字機、Giovanni Pintori 與 Olivetti 平面史、博愛路的事務機器街為真實背景。

## 頁面

| 檔案 | 內容 |
|---|---|
| `index.html` | 門口那台：打字成圖海報（BG-B-05）、人行道打字機留言紙（TXT-A-27）、三代、服務、來店地圖 |
| `machines.html` | 整理好的機器：8 台機器卡（container query 自適應）、View Transition 篩選、修理四步（SHP-12）、價目（BG-A-07） |
| `ten-key.html` | 〈十鍵檢定〉：60 秒照紙帶打金額、數字飛成你的海報、等級與總和（TXT-A-29）、下載 SVG／分享連結 |

## 風格關鍵字

Giovanni Pintori・Olivetti 1950s・Italian corporate modernism・numerals as image・phyllotaxis confetti・lowercase wordmark・square / circle / bar modules・six flat inks on white・thin ink trajectories

## 八維配方

| 維度 | 本站 |
|---|---|
| industry | 事務機器行（打字機、加算機、影印機月租） |
| style | Pintori／Olivetti 企業現代主義平面（型錄「現代主義與構成」新增條目） |
| era | 1950–60 年代義大利企業平面 × 2026 臺北 |
| locale | 伊夫雷亞／米蘭 × 臺北博愛路 |
| voice | 店家第三代的口吻：短、具體、講機器的手感與重量 |
| texture | 白紙、平版專色、色帶打出的等寬字、加算機紙帶 |
| density | 低（≥40% 留白），只有字屑區是密的 |
| function | 〈十鍵檢定〉遊戲＋海報生成：60 秒、3 句規則、可分享 |

opening：`keystroke-poster-first 打字成圖開場`／nav：`tape-total 紙帶總計導覽`／illust：`pintori-module-kit 方圓條模組`／mood：`white-six-inks 白地六色`

## 首創

**鍵入即構圖 keystroke phyllotaxis（全館第一）**：整張首屏海報是由訪客的鍵盤輸入逐字長出來的——每一個按下的字照順序落進黃金角螺旋（137.508°）的下一格，顏色／字級／可變字寬由「字＋序號」的 FNV-1a 雜湊決定，一條 1.5px 墨線連著最後九個字；沒人打字時機器自己慢慢打。十鍵頁把同一套引擎接到計分遊戲：你在 60 秒內打的每一位數就是海報的全部內容，`?d=` 讓朋友打開連結時重排出同一張。

## motion-library 元件（1.20.0 @e45c261f）

| ID | 名稱 | 頁 | 種類 | 承載 |
|---|---|---|---|---|
| BG-B-05 | Spiral Dots | index | ambient | 海報底版的黃金角點陣——Pintori Elettrosumma 的螺旋 |
| TXT-A-27 | Typewriter | index | transition（一次性） | 「請隨意打一行字。」逐字打出 |
| SHP-12 | Split & Merge | machines | ambient | 四塊方拆開又合回：修理 |
| BG-A-07 | Random Pop Dots | machines | ambient | 價目帶上的彩色字屑圓點 |
| TXT-A-29 | Counter | ten-key | transition（一次性） | 加算機數到你的總和 |

---

*本站由 **Claude Opus 5.5** 設計與建置（2026-10-28）（排程 Agent 自動執行）。*
