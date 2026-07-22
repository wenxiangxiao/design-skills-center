---
name: method-grid-campanology
description: A change-ringing notation skin — bone figures in tabular monospace columns, brass rule-lines and bells, red rope sallies and blue "method lines" on a dark night-belfry ground, where every illustration is a permutation traced row by row rather than drawn.
---

# 方格記譜風 Method-Grid — 設計規格書

> 本 SKILL 定義「方格記譜風（換鐘記譜）」的視覺語言。風格與內容分離：任何產業都能套用。範例站為換鐘鳴奏保存會「起鐘」，但這套皮膚同樣適用於棋譜／樂理教室、密碼學工作坊、排程與時刻系統、數學普及、任何以「規則、序列、格陣」為題的品牌。
> 核心精神：**畫面上的圖不是「畫」的，是把一組規則一排一排算出來、把某個元素的位置連成線。** 版面是一張方格記譜紙：直欄是位置、橫列是時間，內容沿著格子往下長。

## 一、設計哲學

換鐘（change ringing）的記譜是一種極簡而嚴謹的視覺語言：六個數字排成一列代表此刻鐘的順序，一列一列往下就是時間的推進，某口鐘的「blue line」則是它的位置逐列連成的軌跡。這套語言有三個支柱：

1. **格陣即真相**——直欄＝位置（第幾個鳴）、橫列＝時間（第幾排）。所有資訊都對齊到這張隱形的方格上。因此本風格**大量使用等寬數字（tabular monospace）、直向的細格線、零圓角、零柔性陰影**。
2. **線是算出來的，不是描的**——插圖不是裝飾外框，而是把規則跑一遍、把某個元素每一列的位置連成折線（blue line）。**畫成裝飾性等寬單色外框即退化成 thin-lineart，本風格即失效。**
3. **暗場裡的金屬與繩**——場景是夜裡的鐘室：冷炭底、黃銅的鐘與格線、繩上一截磚紅的 sally、以及冷鋼藍的 method line。**底不是米白紙**，是近黑的冷炭；紙感只在少數承載長段文字的面板上以極淡方式出現。

去AI化重點：不要做成「紫藍漸層＋置中大標＋三張圓角卡」。這裡沒有 hero 漸層、沒有柔性陰影、沒有 emoji icon；主角是數字方陣與那條會轉折的線。

## 二、色彩系統

| 色票 | Hex | 用途 | 比例 |
|---|---|---|---|
| 冷炭 ground | `#12171C` | 全站「地」色、鐘室夜底 | ~46% |
| 炭板 panel | `#1C262D` | 卡片、面板、換序表底 | ~20% |
| 骨白 bone | `#E9E4D6` | 正文、數字（figures） | ~16% |
| 黃銅 brass | `#C6A05A` | 鐘、格線重點、標題強調、次序號 | ~9% |
| sally 磚紅 | `#BE4536` | 繩上紅絨、現用態、目標按鈕、「你的鐘」 | ~5% |
| 鋼藍 blue-line | `#5C82A6` | method line 工作鐘軌跡（僅用於線，不作底色） | ~4% |

輔助：`--bone2 #B9B4A4`（次要文字）、`--line #33424E`／`--line2 #4B5E6C`（格線）、`--brass2 #8C723E`（弱金）、`--sally2 #D8624F`／`--blue2 #8AA6C4`（亮階）。

**色彩分工鐵則**：磚紅永遠代表「你／現用／目標」，鋼藍永遠代表「工作鐘的軌跡」，黃銅永遠代表「金屬與結構（鐘、格線、標號）」。三色不可互換語意；blue-line 這個色相**只能出現在線上**，一旦拿去填面積就破功。

## 三、字體系統

- **顯示與標題**：`Spectral`（500–700），中文用 `Noto Serif TC`（700／900）。Spectral 的書卷氣呼應換鐘的教會／手冊傳統。
- **內文**：`Noto Sans TC`（400／500／700），16px、行高 1.75。
- **數字方陣與記號**：`IBM Plex Mono`（400–600），**務必開 `font-variant-numeric:tabular-nums`**——換序表、place notation、成績、留位號、鐘規全部走等寬，數字要能上下對齊成欄。
- 字級 scale：正文 16 / 次要 13.5 / 標籤 11–12（mono、letter-spacing .1–.26em、常大寫）/ 區標題 26 / 首頁大標 clamp(30,5vw,52)。行高：標題 1.15–1.18，正文 1.7–1.75。

## 四、版面與網格

- **開場＝待鳴方陣（changes-first）**：首屏不是大標 hero，而是一張只填了 rounds 一排的換序表＋一圈鐘。內容「還不存在」，要被鳴出來才逐列長出。
- 內容寬 `max-width:1140px`，左右 22px。區塊間以 `1px` 實線 `hr.rule` 分隔，區標題配 mono 兩位序號（`01 / 02 …`）。
- 卡片：`background:panel` + `1px solid line` + `border-radius:3px`（近乎直角）。**不用陰影**，靠邊框與底色分層。
- 換序表：等寬數字，每個 figure 固定寬（約 20px）置中成欄；現用列以磚紅 16% 底標記；rounds 列以黃銅字標記；「你的鐘」figure 磚紅、領奏位（lead）鋼藍。
- 不對稱：內容多用 `1fr / 1.1fr`、`220px / 1fr` 這類非對稱雙欄，避免正中對稱。

## 五、元件配方

- **nav（rope-circle 鐘索環）**：桌機右上角一個 118px 方框，SVG 畫一個 42px 半徑的圓與四個方位點；四頁為環上 N/E/S/W 四條「鐘繩」（`<a>` 內含一截 `.sal` 繩絨＋標籤），現用頁 `aria-current="page"` 讓該繩 sally 轉磚紅並拉長。`≤820px` 改為 sticky 頂部四格橫列（sal 變短橫條）。頁尾另備完整連結列保底。
- **按鈕**：`.btn` 黃銅底、炭色字、`border-radius:2px`、hover 轉骨白；`.btn.ghost` 透明描邊；`.btn.red` 磚紅。過渡 `background/color .13s`。無漸層、無陰影。
- **卡片／表格**：見上。表格 `border-collapse`、僅底邊 `1px line`；表頭 mono 黃銅小字、可點排序。
- **表單**：欄位 label 13px 次要色；input 炭底、`focus` 時 `outline:2px brass`；錯誤態欄框轉磚紅、`.err` 顯示。多步驟以頂部 `.steps` 三格顯示進度（on＝黃銅、done＝綠）。
- **footer**：`1.4fr/1fr/1fr` 三欄（品牌敘事／鐘室連結／聯絡或名詞），底部一條 `.disc` 免責與建置標示（mono、弱金）。

## 六、動效規則

動效要**克制**，服務「鳴奏」而非炫技，且全部提供 `prefers-reduced-motion` 降級。

- **鐘鳴一擊**：該鐘 SVG 填色由炭轉黃銅（自鳴為磚紅）、外圈 ripple 由 r=19 擴到 37、opacity 0.9→0，`≈380ms`，之後 `260ms` 回炭。reduced-motion 下取消 ripple、只換色。
- **落點節拍條**：底部 4px 進度條在兩擊之間線性推進（rAF 讀 `performance.now()`），純資訊回饋、非裝飾。
- **換序表列進場**：新列直接 append、`scrollTop` 跟到底；不做淡入位移（避免落入「揭示進場」過載語彙）。
- **按鈕**：hover 換色 `.13s`、active `translateY(1px)`。
- **method line**：靜態 SVG 折線，不做描邊動畫（避免 stroke-dashoffset 過載語彙）。
- **禁用**：跑馬燈／自動輪播／視差；會動的只有「鳴奏本身」與使用者操作。reduced-motion 下不啟動 rAF，核心改為逐排推進按鈕，模擬與評分邏輯完整保留。

## 七、插畫與圖像風格（method-line 排列軌跡格）

**本風格沒有一張傳統插圖**——所有圖像都由「規則跑一遍」生成：

1. **blue line**：把方法（如 Plain Bob Minor）從 rounds 逐排展開，取某口鐘每一排的位置 `(pos, row)` 連成折線。`x = x0 + pos*dx`、`y = y0 + row*dy`。工作鐘用鋼藍粗線（3.2px），treble 用磚紅細線（2.4px），底襯直向細格線。這條明度／色相分工不可對調。
2. **鐘**：黃銅 monoline，`stroke-width` 一致；鐘體大小與繩（sally）長度可隨資料（鐘號、重量）程序縮放——大小即資料，不是隨手畫。
3. **logo／favicon**：一口黃銅鐘＋一截磚紅 sally，背後一條鋼藍 method line 交織。favicon 為簡化版同一組件的 inline SVG data URI。
4. 靜態頁的圖務必在建置時就以 SVG 烘好（座標可用一次性腳本算出後硬寫），**無 JS 也看得到**，同一規則恆得同一張圖。

## 八、Logo 與 Favicon 設計指南

- Logo：120×120，元素＝黃銅鐘（bell + 冠環 + 鐘唇線 + clapper）＋鐘下一截磚紅 sally ＋背後一條鋼藍 method line 折線。全部 monoline、零填色面積（除 sally 與 clapper 的實心點）。
- Favicon：64×64，冷炭底上一口黃銅鐘＋磚紅 sally，寫成 inline SVG data URI（`%23` 編碼井號）放進 `<head>`。
- 命名：品牌用中文兩字＋英文全大寫 mono 副名（letter-spacing .34em）。

## 九、Do & Don't

**Do**
- 用等寬 tabular 數字排成對齊的欄；讓格陣可讀。
- 讓每一張圖都能對回一條規則（哪口鐘、走哪條線）。
- 暗場、金屬、繩、鋼藍線；磚紅只給「你／現用／目標」。
- 提供 reduced-motion 與無 JS 的完整替代（規則靜態全可讀）。

**Don't（含去AI化禁令）**
- 不用紫藍漸層 hero、不用「置中大標＋兩顆按鈕＋三張圓角卡」。
- 不用 emoji 當 icon（icon 一律自繪 SVG）；不用 rounded-2xl＋模糊陰影。
- 不把 blue-line 藍拿去填面積；不把三色語意互換。
- 不用米白紙感當全站底色；不用 Lorem ipsum 與 AI 腔文案。
- 不用跑馬燈當反射動作；動效不喧賓奪主。
- 圖不要退化成等寬單色裝飾外框（thin-lineart）——那不是本風格。

## 十、頁面骨架範例（可直接使用）

```html
<!-- 換序表列 -->
<div class="rows" style="font-family:'IBM Plex Mono',monospace">
  <div class="row rounds"><span class="rn">—</span>
    <span class="fig">1</span><span class="fig">2</span><span class="fig">3</span>
    <span class="fig">4</span><span class="fig">5</span><span class="fig">6</span></div>
  <div class="row now"><span class="rn">1</span>
    <span class="fig me">2</span><span class="fig lead">1</span><span class="fig">4</span>
    <span class="fig">3</span><span class="fig">6</span><span class="fig">5</span></div>
</div>
```

```html
<!-- rope-circle 導覽（桌機右上；行動版變 sticky 底部橫列） -->
<nav class="ringnav" aria-label="主導覽">
  <svg class="rsvg" viewBox="0 0 118 118" aria-hidden="true">
    <circle cx="59" cy="59" r="42" fill="none" stroke="#2A3742"/>
  </svg>
  <a class="rn-n" href="index.html" aria-current="page"><span class="sal"></span><span class="lb">鐘室</span></a>
  <a class="rn-e" href="method.html"><span class="sal"></span><span class="lb">換法</span></a>
  <a class="rn-s" href="tower.html"><span class="sal"></span><span class="lb">鐘籍</span></a>
  <a class="rn-w" href="join.html"><span class="sal"></span><span class="lb">學鳴</span></a>
</nav>
```

```javascript
// method-line：把方法逐排展開，取某鐘位置連成 blue line
function applyPN(row, places){ /* 相鄰對換，places 為不動位置 */ }
// treble 紅線、工作鐘藍線；x=pos*dx, y=row*dy
```

---

*本 SKILL 由 Claude Opus 4.8（排程 Agent 自動執行）撰寫，隨範例站「起鐘」建立（2026-07-22）。換鐘鳴奏採真實 Plain Bob Minor 排列規則；站內一切機構、人名、成績為虛構示意。*
