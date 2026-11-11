---
name: classic-9x-bevel-ui
description: Classic 1995–2000 Windows 9x desktop UI — two-pixel bevels on silver-gray faces, teal desktop and navy title bars from a 16-color system palette, bitmap system type with underlined access keys, window chrome with status-bar panes and resize grips, and a taskbar with a Start button, cascading menus and a clock tray.
---

# 9x 經典介面・立體斜面 Classic 9x Bevel UI

> 範例站：〈開始電腦班 KHAI-SÍ〉（新北板橋・1996 年開班的長青電腦班）。本規格書不綁定產業：任何想喚起「第一次摸電腦」那份笨拙與可靠的品牌（補習班、二手電腦行、網咖、檔案修復、懷舊遊戲、軟體公司的週年頁）都可以用。
>
> 本條目描述的是 1995 年 8 月 24 日上市的 Windows 95 與其後 98／Me 一路沿用的「經典」視覺語言（Microsoft 內部代號 Chicago），不含任何商標、旗幟或品牌字樣。使用時請自畫圖示、不要放作業系統的 Logo。

## 設計哲學

9x 介面長成這樣有三個理由，全部來自 1990 年代中期的硬體與使用者：

1. **640×480、16 色 VGA 是保底規格。** 沒有 alpha、沒有反鋸齒、沒有漸層材質可用，於是「立體」只能靠一條白線＋一條黑線＋兩條灰線畫出來；陰影是整數像素，不是模糊。
2. **第一次用電腦的人太多。** Kent Sullivan〈The Windows 95 User Interface: A Case Study in Usability Engineering〉（CHI 1996）記錄了大量使用性測試：受測者看著空桌面不知道從哪開始，左下角那顆按鈕最後就寫著「開始」。Microsoft 2020 年的 25 週年回顧引述工程師 Chris Guzak 的說法：「我們用陰影與邊緣標出所有邊界。」所有東西都必須一眼看出「這是可以按的」——凸起的是按鈕、凹下的是可以填的。
3. **系統字是點陣。** 中文版用 12 px 點陣新細明體，英文版用 MS Sans Serif 8 pt，字不會變大變小，版面就以字為格。

所以本風格的情緒是**可靠、笨拙、有耐心**——每一塊面板都老實地宣告自己是凸是凹、每一個操作都有快速鍵、每一次等待都有沙漏和進度條。它不是「復古濾鏡」，是一套用最少像素說清楚「哪裡能按」的語法。

## 本風格的 5 個不可省略特徵

### ① 兩像素立體斜面：凸起＝能按、凹下＝能填（零圓角、零模糊陰影）

每一個面都只有兩種狀態。凸起（按鈕、視窗、工作列）：外圈左上白、右下黑；內圈左上淺灰、右下深灰。凹下（輸入框、清單、狀態列格）：反過來。按下按鈕＝切換成凹下並把內容往右下推 1 px。拿掉它就只剩一個灰盒子。

```css
:root{--face:#C0C0C0;--hi:#FFFFFF;--lt:#DFDFDF;--sh:#808080;--dk:#000000;
 --out:inset -1px -1px var(--dk),inset 1px 1px var(--hi),inset -2px -2px var(--sh),inset 2px 2px var(--lt);
 --in:inset -1px -1px var(--hi),inset 1px 1px var(--sh),inset -2px -2px var(--lt),inset 2px 2px var(--dk);
 --press:inset -1px -1px var(--hi),inset 1px 1px var(--dk),inset -2px -2px var(--lt),inset 2px 2px var(--sh)}
.btn{background:var(--face);border:0;border-radius:0;box-shadow:var(--out);padding:6px 12px}
.btn:active{box-shadow:var(--press);padding:7px 11px 5px 13px}   /* 內容往右下推 1px */
.field{background:#fff;box-shadow:var(--in)}
```

### ② 系統 16 色：桌面青、面板銀灰、作用中標題深藍

整個畫面只用 VGA 16 色加上兩個系統色：桌面 `#008080`、面板 `#C0C0C0`、作用中標題列與選取 `#000080`（白字）、非作用中標題 `#808080`、提示框 `#FFFFE1`。插圖與圖示必須降到 VGA 16 色，用 **Bayer 4×4 有序抖色**表現中間色——格狀的抖色紋就是時代的指紋。禁止 alpha 半透明、禁止平滑漸層（唯一例外：安裝程式背景是 16 段**硬切**色階）。

```js
// 有序抖色到 VGA 16 色（本站 KS.dither 精簡版）
const BY=[0,8,2,10,12,4,14,6,3,11,1,9,15,7,13,5];
function dither(ctx,w,h,PAL,amp=56){const im=ctx.getImageData(0,0,w,h),d=im.data;
 for(let y=0;y<h;y++)for(let x=0;x<w;x++){const i=(y*w+x)*4,t=(BY[(y&3)*4+(x&3)]/16-.47)*amp;let bi=0,bd=1e9;
  for(let k=0;k<16;k++){const p=PAL[k],dd=(p[0]-d[i]-t)**2*.3+(p[1]-d[i+1]-t)**2*.59+(p[2]-d[i+2]-t)**2*.11;if(dd<bd){bd=dd;bi=k;}}
  d[i]=PAL[bi][0];d[i+1]=PAL[bi][1];d[i+2]=PAL[bi][2];d[i+3]=255;}ctx.putImageData(im,0,0);}
```

### ③ 點陣系統字＋底線快速鍵

全站一種字：點陣感的黑體（本站用 Google Fonts DotGothic16，缺字回退 Noto Sans TC——當年中文版也是點陣明體與外字混排）。粗體只給標題列、預設按鈕與工作列目前那一格。每個選單與按鈕都帶「底線快速鍵」：`檔案(F)`、`下一步(N) >`，並真的綁上 Alt+鍵。

```html
<button class="btn def">下一步（<u class="k">N</u>）&gt;</button>
<style>u.k{text-decoration:underline;text-underline-offset:2px}
body{font:16px/1.45 "DotGothic16","Noto Sans TC",monospace;-webkit-font-smoothing:none}</style>
```

### ④ 視窗結構：標題列＋三顆標題鈕、選單列、凹陷狀態列分格、斜紋縮放把手

每一塊內容都住在視窗裡。標題列 22 px 實心深藍（95 是實色；98 的漸層標題不屬於本條目）＋16 px 小圖示＋右側 `_ □ ×`；下方選單列；最底狀態列分成數個淺凹格，右下角是三道斜紋的縮放把手。預設按鈕外加 1 px 黑框；鍵盤焦點是內縮 4 px 的 1 px 虛線框。

```css
.win{background:var(--face);box-shadow:var(--out);padding:3px}
.tb{background:#000080;color:#fff;font-weight:700;height:22px;display:flex;align-items:center;gap:4px;padding:0 3px}
.sb{display:flex;gap:2px}.sb>*{box-shadow:inset -1px -1px #fff,inset 1px 1px #808080;padding:1px 6px;flex:1}
.grip{flex:none;width:16px;box-shadow:none;background:linear-gradient(135deg,transparent 0 45%,#fff 45% 52%,#808080 52% 60%,transparent 60% 70%,#fff 70% 77%,#808080 77% 85%,transparent 85%)}
.btn.def{outline:1px solid #000}
.btn:focus-visible::after{content:"";position:absolute;inset:4px;outline:1px dotted #000}
```

### ⑤ 工作列與開始選單：左下「開始」、右下時鐘、直排側標與 ► 串接子選單、32×32 點陣圖示

畫面底部固定 28–34 px 的工作列：左邊一顆粗體「開始」，中間是每個開著的視窗一顆按鈕（目前那顆按下並鋪 1 px 棋盤格），右邊凹陷的系統匣放時鐘。開始選單的左側是一條直排深藍側標寫品牌名；有子選單的項目尾巴是 ►，hover 立刻展開到右側。所有圖示是 16×16 格放大成 32 px 的點陣。

```html
<button class="btn start" popovertarget="smenu" style="anchor-name:--start"><img src="logo.svg" alt="">開始</button>
<div id="smenu" popover="auto" class="smenu" role="menu">…</div>
<style>.smenu{position:fixed;inset:auto;margin:0;position-anchor:--start;bottom:anchor(top);left:anchor(left);
 padding:3px 3px 3px 30px;background:#C0C0C0;box-shadow:var(--out)}
.smenu::before{content:"";position:absolute;left:3px;top:3px;bottom:3px;width:24px;background:#000080}
.tasks a.on{font-weight:700;box-shadow:var(--press);background:repeating-conic-gradient(#fff 0 25%,#C0C0C0 0 50%) 0 0/2px 2px}</style>
```

## 色彩系統

| 角色 | Hex | 用途 | 面積 |
|---|---|---|---|
| 桌面青 | `#008080` | 桌面底、考場、螢幕保護前的空桌 | 約 45% |
| 面板銀灰 | `#C0C0C0` | 視窗、按鈕、工作列、選單 | 約 35% |
| 白 | `#FFFFFF` | 斜面亮邊、輸入框、清單底 | 約 10% |
| 深灰 / 淺灰 | `#808080` / `#DFDFDF` | 斜面暗邊與內亮邊、非作用標題 | 線 |
| 標題深藍 | `#000080` | 作用中標題列、選取反白、開始選單側標 | 約 6% |
| 黑 | `#000000` | 字、斜面最外暗邊、預設按鈕框 | 字與線 |
| 提示黃 | `#FFFFE1` | 工具提示（時鐘的民國日期） | <1% |
| 安裝藍 | `rgb(0,0,180)`→`rgb(0,0,15)` 16 段 | 只用在安裝程式背景 | 首頁限定 |
| VGA 其餘 | `#800000 #008000 #808000 #800080 #FF0000 #00FF00 #FFFF00 #0000FF #FF00FF #00FFFF` | 只用在圖示與抖色插圖 | 點綴 |

外觀配置（本站「開始 → 外觀設定」）：仿 9x「顯示內容 → 外觀」的作法提供四組——標準、小麥（`#808000` 桌面＋`#5C5418` 標題）、茄子（`#405040`＋`#602060`）、磚紅（`#802020`＋`#800000`）。四組皆為本站自擬，不是逐值複刻原系統配色；切換只改 CSS 變數，結構不變。

## 字體系統

- UI 與內文：DotGothic16（Google Fonts），缺字回退 Noto Sans TC 400/700。字級只有四階：13（頁尾）／14–15（狀態列、說明）／16（內文、按鈕、選單）／20–22（對話框標題）。行高 1.45。
- 安裝程式大標：Noto Serif TC 900 加 `skewX(-9deg)` 當斜體＋4 px 黑色硬投影；英文副標 Tinos Bold Italic（與 Times New Roman 等寬，安裝程式慣用）。這是全站唯一的襯線。
- 粗體只出現在：標題列、預設按鈕、目前工作列按鈕、對話框標題。

## 版面與網格

- 一切都是矩形，零旋轉、零圓角。間距以 2／4／6／8／12／16 px 為階。
- 內容一定在視窗裡：首頁＝安裝精靈（164 px 點陣側圖＋右側步驟），課程頁＝檔案總管（左 210 px 樹狀＋右詳細資料清單）＋一個可拖曳的小工具視窗，駕照頁＝一個考試程式視窗。
- 桌面上的圖示一列直排在左，88 px 寬、32 px 圖示＋下方標籤；選取時標籤反白深藍＋黃色虛線框。
- 視窗之間不重疊（除了對話框），留出桌面青。
- 手機 ≤560 px：視窗佔滿寬、桌面圖示改橫排、工作列只留圖示。

## 元件配方

- **導覽（工作列）**：見特徵⑤。現用頁＝該頁的工作列按鈕被按下（凹陷＋棋盤格）。開始選單用 `popover="auto"` 輕觸即關；子選單 `popover="manual"`，hover 0 ms 展開，方向鍵可操作。
- **按鈕**：最小寬 86 px、`padding:6px 12px`；預設按鈕加 1 px 黑框；停用＝字變 `#808080` 並加 1 px 白色右下浮雕。
- **卡片**：本風格沒有卡片，只有「內容」對話框（帶分頁標籤）與 fieldset 群組框（`legend` 壓在凹凸雙線上）。
- **表單**：白底凹陷輸入框；單選與核取方塊用原生控制項；清單選取＝整列深藍白字。
- **對話框**：小問號／驚嘆號 32 px 點陣圖示在左、文字在右、按鈕置右下。
- **進度條**：凹陷槽內一格一格的深藍方塊（12 px 一格、2 px 間隔），不得平滑。
- **頁尾**：安裝畫面底部的灰字版權列；其他頁由工作列取代頁尾。

## 動效規則

9x 的動態都是「離散的」：一次跳一格、不淡入。所有 easing 一律 `steps()` 或線性。

| 種類 | 本站自製實作 | 觸發 | 時間 | 降級 |
|---|---|---|---|---|
| ambient 環境 | 安裝精靈側圖：小螢幕裡的視窗一直在彈、窗外板橋夜景的燈一盞盞換，每 125 ms 重畫並重新抖色；工作列時鐘；閒置 60 秒啟動「游標飛來」螢幕保護程式 | 時間 | 8 fps | reduced-motion 時側圖停在第 0 格、不啟動螢幕保護；時鐘照走 |
| input 輸入 | 按鈕按下即凹陷、選單 hover 即反白、清單點選反白、欄位標題排序、拖曳時只拖一個虛線外框（「拖曳時不顯示視窗內容」） | pointer／鍵盤 | 0 ms | 不受影響 |
| transition 轉場 | 換頁＝9x 最小化／還原：一個深藍外框從目前視窗縮到目標頁的工作列按鈕，新頁再從自己的按鈕放大回視窗；精靈換步＝`clip-path` 由上往下 4 格重繪；排序＝FLIP 位移以 `steps(4)` 走完 | 點擊 | 240 ms `steps(8,end)`／200 ms `steps(4)` | reduced-motion 直接換頁、直接換步 |
| signature 簽名 | **駕照瀑布**：考完的滑鼠駕照從右上彈落、碰底反彈，畫布從不清除，留下一整片殘影（致敬早年接龍過關的那個畫面，但卡片是本站自繪的駕照） | 考試完成 | 約 6–15 秒，點一下或按任一鍵收起 | reduced-motion：一次算完 120 格直接畫出靜止的殘影，4 秒後收起；駕照與建議文字本身不受影響 |

自我限制：本風格禁用淡入、禁用 blur、禁用 ease-in-out 緩動。

### motion-library 元件表

來源 `wenxiangxiao/motion-library` v1.38.0 @e1382805，`tools/ml-embed.js` 逐頁抽子集 inline 成每頁第一個 `<script>`，掛載經站內 `KS.ml` 包裝（等字型就緒、離屏 destroy、一次性文字 `loop:false`、canvas `aria-hidden`、原 HTML 標題 `.ml-fb` 保留）。出處皆可用 `MotionLib.prompt(id)` 取得。

| 頁 | ID | 名稱 | 參數 | 角色 | 承載什麼／為什麼適合 |
|---|---|---|---|---|---|
| 首頁 | TXT-B-13 | Scramble Decode | text「開始電腦班」、primary `#008080`、secondary `#000080`、bg `#C0C0C0`、duration 1.8、loop false、seed 3、16:9 maxHeight 120 | transition | 歡迎步驟的店名以亂碼逐字「解壓縮」出來——安裝程式解壓檔案的隱喻；等寬字＋平色，零圓角零發光 |
| 首頁 | TXT-A-29 | Counter | text「1996 開班」、primary `#000080`、secondary `#008080`、bg `#FFFFFF`、duration 2.6、loop false、seed 96、maxHeight 84 | transition | 安裝中的看板：數字從 0000 跑到 1996，下方一條進度線——就是安裝程式的進度讀數 |
| 課程 | TXT-B-27 | Pixel Dissolve | text「課程總覽」、primary `#000080`、secondary `#008080`、bg `#FFFFFF`、duration 1.6、loop false、seed 8 | transition | 檔案總管左欄的大資料夾名以方塊溶解出現——90 年代簡報與螢幕保護的「溶解」換場；方塊是整數格 |
| 課程 | BG-A-01 | Grid Fill | primary `#000080`、secondary `#FF0000`、bg `#FFFFFF`、duration 6、density 1.2、seed 12 | ambient | 〈教室座位重組程式〉的座位圖：方格依波相亮起，像磁碟重組的叢集圖；方塊、格線、純色 |
| 駕照 | BG-A-08 | Grid Cursor | primary `#000080`、secondary `#FFFF00`、bg `#008080`、duration 6、density 1、seed 4 | ambient | 考前的「滑鼠練習場」：箭頭游標拖著一串方格殘影在桌面青上走——9x「指標軌跡」設定的翻版；開考即 destroy |

元件不擔任 signature。已知衝突：Grid Fill 與 Grid Cursor 以 globalAlpha 淡化方格，與特徵②「零半透明」略有出入，因面積小且只在小視窗內，接受。

## 插畫與圖像風格

- **點陣抖色插圖**：先用 canvas 畫平滑的形與漸層（窗外夜景、CRT、鍵盤、滑鼠墊、講義），再整張 Bayer 4×4 抖色到 VGA 16 色，以 `image-rendering:pixelated` 放大 2 倍。
- **16×16 點陣圖示**：用字串陣列一字一像素定義（`'0'`=黑、`'7'`=銀、`'b'`=黃…），輸出成 `shape-rendering:crispEdges` 的 SVG，顯示為 16 或 32 px。
- **駕照大頭照**：48×60 由名字雜湊決定髮色、眼鏡、衣服，再抖色。
- 禁止照片、禁止向量平滑插畫、禁止 emoji。

## Logo 與 Favicon 設計指南

Logo 是一顆 32×32 的凸起斜面按鈕，上面一支黑框白芯的箭頭游標，左下三條青／藍短條——「按這裡開始」。字標在按鈕右邊用點陣字寫店名，副標全大寫拉丁。Favicon 就是那顆按鈕（inline SVG data URI，crispEdges）。不得使用任何作業系統的旗幟或商標。

## Do & Don't

- Do：每個可按的東西都要凸起；每個可填的東西都要凹下；每個選單項都有快速鍵；每個等待都有進度條或沙漏。
- Do：讓「開始」真的是起點——首頁是一支安裝精靈，一步一步走。
- Don't：圓角、模糊陰影、半透明玻璃、漸層按鈕、淡入淡出、ease 曲線。
- Don't：放作業系統 Logo、商標字樣或原系統圖示；圖示一律自畫。
- Don't（去AI化）：紫藍漸層 hero、置中大標＋兩顆按鈕＋三張圓角卡片、emoji icon、Lorem ipsum、「EST. 19xx」徽章。安裝藍背景是 16 段硬切的時代規格，不是 AI 漸層。

## 頁面骨架範例

```html
<body>
<main class="win main">
  <div class="tb"><span class="ti">…16px 圖示…</span><span class="tt">課程總管 － C:\開始電腦班\課程</span>
    <span class="cap"><b>_</b><b>□</b><a class="x" href="index.html">×</a></span></div>
  <div class="mb" role="menubar"><button popovertarget="pm-file"><u class="k">檔</u>案(F)</button>…</div>
  <div class="exp-body"><aside class="in">樹狀</aside><div class="in">清單</div></div>
  <div class="sb"><span>8 個物件</span><span>已選取：入門班</span><span class="grip"></span></div>
</main>
<nav class="task"><button class="btn start" popovertarget="smenu">開始</button><div class="tasks">…</div><div class="tray"><button class="clock">下午3:42</button></div></nav>
</body>
```

## 技術實作與相容性

### 1. CSS anchor positioning＋Popover API（C 版面與樣式層）— 開始選單、串接子選單、時鐘提示

- **承載**：特徵⑤。開始選單 `position-anchor:--start; bottom:anchor(top); left:anchor(left)` 貼在開始鈕上緣；子選單以項目自己的 `anchor-name` 貼在右側，`position-try-fallbacks:flip-inline` 碰到螢幕右緣翻到左側；時鐘提示貼在時鐘上方。開關用 `popover="auto"`（輕觸即關、Esc 關）與 `popover="manual"`（子選單、提示由 hover 控制）。
- **支援現況（2026-11 查證）**：Popover API——MDN 標為 Baseline Widely available（2024 年 4 月起三大引擎皆支援；web.dev 後來把 Baseline 日期更正為 2025-01-27，因 iOS 18.3 修正問題）。Anchor positioning——Chrome/Edge 125+、Safari 26（2025-09）、Firefox 147（2026-01-13 預設啟用），web.dev 2026 年 1 月號列為 Baseline Newly available；Adobe 的參考頁（2026-04）仍標 Limited，主要是跨 shadow DOM 錨定的差異，本站不涉及。
- **Fallback**：`CSS.supports('anchor-name:--a')` 為假時，在 `toggle` 事件中以 `getBoundingClientRect()` 寫入 `left/top`；無 popover 的舊瀏覽器選單不開，但工作列三顆頁面按鈕本身就是連結，資訊零損失。
- 查證來源：MDN〈popover〉、web.dev〈New to the web platform in January 2026〉、web.dev〈Popover API is now Baseline〉、Adobe shadow-dom-css〈Anchor Positioning〉。

### 2. Canvas 2D ImageData＋Bayer 4×4 有序抖色到 VGA 16 色（A 渲染層）

- **承載**：特徵②與 ambient、signature。安裝精靈側圖 82×157 每 125 ms 重畫並抖色；駕照大頭照 48×60；駕照瀑布以「永不清除的畫布」累積殘影。
- **效能實測**：抖色 82×157 一格 node 22 實測約 4.2 ms（10 次平均）（160×240 原型 11.8 ms）；側圖只在可見時重畫，`document.hidden` 時跳過。瀑布每幀只 `drawImage` 最多 7 張 180 px 卡片，不清畫布，成本固定。
- **Fallback**：無 canvas（或 `getContext` 回 null）時側圖不畫、大頭照留黑框、瀑布跳過；駕照文字資料都是 DOM。

### 3. Intl.DateTimeFormat 民國曆＋sessionStorage 跨頁狀態（E 資料與生成層）

- **承載**：工作列時鐘 `zh-TW` 顯示「下午3:42」，提示框 `zh-TW-u-ca-roc` 顯示「民國115年11月11日星期三」；課程「下次開課」與駕照發照日也用民國曆。sessionStorage 跨頁保留外觀配置（`ks-scheme`）、駕照等級（`ks-license`，工作列系統匣出現駕照小圖示）、精靈勾選結果與換頁轉場旗標。
- **查證**：node 22（完整 ICU）實測輸出「民國115年11月11日星期三」；`roc` 是 ECMA-402 列舉的曆法之一（MDN〈Intl.Locale.getCalendars〉）。若輸出不含「民國」（舊 ICU），改用 `年-1911` 自組字串。sessionStorage 讀寫全包 try/catch，失敗時只是不跨頁記憶。

### 效能預算

三頁各約 337–342 KB（含 motion-library 子集約 285 KB 與 inline 圖示、favicon），低於 350 KB 上限。首屏 JS：common.js＋頁面腳本皆為事件綁定與一次抖色，<30 ms（node 估算）；元件在 `document.fonts.ready` 後才掛載。同一畫面同時運轉的元件最多 2 個（課程頁）。
