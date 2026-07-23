---
name: ink-gold-hexagram
description: A dark lacquer-and-gold I-Ching divination aesthetic where every image is built from stacked yang/yin line primitives (爻畫), with cinnabar reserved for changing lines and living data.
---

# 水墨卦象 · 墨金卜筮風（ink-gold-hexagram）

> 一套為「易占卜筮 / 命理 / 傳統玄學」而生的視覺語言：暖漆黑底、藏金爻畫、硃砂變爻。核心美學信條——**畫面上的每一個圖形都由「陽爻（實線）」與「陰爻（斷線）」兩種原語疊出**，卦象即識別，識別即卦象。此風格不綁定產業：任何「有結構、需分層、講究時序與陰陽消長」的題材（占卜、節氣曆算、圍棋定石、二進位資料、對偶結構）都可套用。

---

## 一、設計哲學

1. **爻是唯一的造形原語。** 不描物、不畫圖示——需要「圖」的地方，一律用六爻（或三爻）陰陽線的組合去表達。一個卦象是一個 6-bit 的值，也是一張圖、一枚印、一個 logo。這是本風格最強的去AI化手段：別站的插圖是「畫」出來的，本風格的插圖是「算」出來的。
2. **金線承常，硃砂承變。** 金（藏金 `#C6A052`）是安定的、恆在的、結構性的；硃砂（`#C33E2A`）是稀有的、有語意的——只用於「變爻」「當前狀態」「毒/凶/警示」「活的資料」，全站硃砂面積 < 8%。看見紅，即知有事發生。
3. **暗如夜堂，暖非冷。** 底色是漆案的暖黑（帶棕、帶紅味），不是科技感的冷炭或藍黑。這讓卜筮的「夜、靜、燈下」氣氛成立，也與工程/儀表類暗色站拉開距離。
4. **神秘寡言。** 文案克制、留白、直排堂號。不喊口號、不用「把 X 變成 Y」句式、不放年份徽章。權威來自沉靜與準確，不來自吆喝。
5. **卦者時也，占者觀變。** 互動的重點不是「給一個吉凶結論」，而是呈現「由現況（本卦）到趨向（之卦）的轉化過程」。設計要為這條「時間軸」服務。

---

## 二、色彩系統

| 色 | HEX | 用途 | 比例 |
|---|---|---|---|
| 漆黑（lac） | `#16120D` | 全站底色、輸入框底 | ~46% |
| 暗棕（umber） | `#221B13` | 面板、卡片底 | ~20% |
| 暗棕2（umber2） | `#2C2318` | 內嵌面板、次級底 | ~8% |
| 框線（edge） | `#3A2E1E` | 2px 分格線、未定爻、邊框 | 線 |
| 藏金（gold） | `#C6A052` | 陽爻/陰爻、重點字、按鈕底、金線 | ~9% |
| 亮金（gold2） | `#E4C87E` | 標題、hover、當前頁 | ~3% |
| 硃砂（cinn） | `#C33E2A` | **變爻、當前狀態、警示、活資料** | <5% |
| 亮硃（cinn2） | `#E0603F` | 硃砂文字、之卦箭頭 | <2% |
| 蓍白（paper） | `#EADEC4` | 正文亮字、卦名 | 文字 |
| 骨白（bone） | `#C9BC9C` | 一般內文 | 文字 |
| 暗骨（bone2） | `#9C8F72` | 註記、次要標籤、mono 小字 | 文字 |
| 玉（jade） | `#7FA574` | 「吉」標籤（唯一綠，克制使用） | <1% |

**底色氛圍**：`dark-moody`，但刻意為「暖漆黑」。全站加兩層極淡 radial 光暈（頂部金 `.10`、右上硃 `.06`）模擬燈下卦案。禁止藍紫漸層。

---

## 三、字體系統

- **標題／卦名／堂號**：`Noto Serif TC`，900（卦名、H1）、700（區塊標題）。字距 `.06–.1em`。堂號可直排（`writing-mode:vertical-rl; text-orientation:upright`）。
- **內文**：`Noto Sans TC`，400/500/700，行高 1.7–1.75。
- **編號／代碼／英標／kicker**：`DM Mono`，字距 `.14–.34em`，常配 `text-transform:uppercase`。用於卦序、預約號、`x/64` 計數、`THE ALTAR` 類英標。
- 字級 scale（clamp）：H1 `clamp(30px,6vw,54px)`；區塊標 22–24px；卦名 24–30px；內文 15–16px；mono 小字 11–13px。
- 只用三套 Google Fonts，禁止系統預設無個性字堆。

---

## 四、版面與網格

- **不對稱**：hero 文字靠左、寬度 ≤44ch；桌機主互動用「主欄 + 300px 副欄」的雙欄成卦板（`grid-template-columns: minmax(0,1fr) 300px`）。
- **導覽不置頂**：用側邊「爻列」（見 §5）。內容區 `max-width:820–1120px` 依頁面資訊量而定。
- **分格用 2px 實線（edge 色），一律無圓角**（`border-radius:0`）。這是本風格的骨架特徵：硬邊、金線、如卦案格。
- **留白**：區塊間 `padding:30–40px 0`，區塊以 2px `edge` 線分隔。卦象四周留足夠負空間，讓「線」呼吸。
- 幾乎不用旋轉；若需動勢，交給硃砂與微位移，不靠傾斜版面。

---

## 五、元件配方

### 導覽 nav — `yao-line` 爻列導覽（本風格招牌）
- 桌機：左上角固定一疊短線，每一頁是一條「爻」。當前頁那條是**整條金色陽爻（實線）並發光**（`box-shadow:0 0 10px rgba(198,160,82,.55)`），其餘頁是斷開的陰爻（兩段）、暗 edge 色。語意＝「你在這個卦裡的哪一爻」。
- 每項＝一個 `.bar`（`display:flex;justify-content:space-between`）；`.yang i{width:100%}`、`.yin i{width:~43%}`（兩段）。
- 手機（≤900px）：整列落到底部 dock，横向平分，`i` 縮小，文字置於線下。
- 堂號直排置於爻列頂端。頁尾另備完整文字連結保底。

### 按鈕
- 主按鈕：金底、漆黑字、2px 金框、無圓角、字距 `.1em`、`Noto Serif TC` 700。hover 轉亮金。`:active` 下移 1px。
- 次按鈕（ghost）：透明底、亮金字、edge 框，hover 邊框轉金、底 `rgba(gold,.08)`。

### 卡片（卦解）
- umber 底 + 1.5px edge 框，無圓角。hover 邊框轉金 + `translateY(-2px)`。
- 結構：左側小卦象 SVG（56px）+ 右側卦名（Serif 900）/上下卦/卦序（mono）；下方以 1px edge 線分隔卦辭（Serif、paper）與白話（bone）；底部 mono 標籤（吉凶用色、主題用中性）。

### 表單
- 輸入框：漆黑底、1.5px edge 框、paper 字、無圓角；focus 轉金框 + 2px 金色柔光環。
- `select` 自繪金色三角 data-URI 箭頭。
- 錯誤態：欄位框轉硃砂，下方 `.err` 硃砂小字。必填以硃砂 `＊` 標。
- 多步驟表單頂部放「壹貳參」步驟條，已達步驟亮金。

### footer
- 頂部 2px edge 線。三欄（堂號＋主事／連結／堂址）。
- **必含**兩段小字：`disclaimer`（虛構示意聲明 + 公有領域文本出處）與 `builtby`（mono，`BUILT BY 模型 · 排程 Agent`）。

---

## 六、動效規則

- **銅錢翻轉**：擲錢時三枚錢 `rotateX(1440deg)`，`0.5s cubic-bezier(.3,.7,.4,1)`；落定前套 `.face-zi/.face-bei`（`rotateX(0/180deg)`）決定字/背面。用 `perspective + transform-style:preserve-3d + backface-visibility:hidden` 做真雙面幣。
- **成爻揭示**：每擲後該爻 slot 由 `opacity:.3→1`（`.4s`），配一行 mono 說明（第 N 爻／三錢得數／老少陰陽）。
- **結果進場**：結果面板 `translateY(10px)+opacity` 升起（`.5s ease`），並平滑捲入視野。
- **當前爻/變爻發光**：金/硃砂 `box-shadow` 柔光，不用動畫閃爍。
- **卡片 hover**：`translateY(-2px)` + 邊框轉金，`.2s`。
- **reduced-motion**：全站 `animation/transition` 降為 `.001s`、`scroll-behavior:auto`、銅錢即時落定、結果即時顯示。所有資訊在無動畫下皆可得。

---

## 七、插畫與圖像風格 — `yao-glyph` 爻畫構成

- **唯一技法**：所有圖像（卦象、logo、favicon、方圖、卦印、卦案縮圖）都由兩種原語疊成——
  - **陽爻**：一條實心矩形（`<rect width=W>`）。
  - **陰爻**：兩段矩形，中央留約 16–22% 間隙。
- 六爻由下而上：資料陣列 `bits[0]` 為初爻（畫在最底），`bits[5]` 為上爻（最頂）。渲染時 `y = (5-index)*(lh+gap)`。
- **變爻**以硃砂 `#C33E2A` 上色，並在該爻中央疊一枚小圈：老陽 `○`（空心）、老陰 `✕`（實心底）。
- **三爻（八卦）**同法，用於速記卡與方圖。
- **配色分工不可對調**：爻線一律金，唯變爻/當前/警示轉硃砂；底一律暗。加白色第四色即退化為一般色塊構成。
- 一切圖形由同一支 `figSVG(bits, changing, w)` 生成——**全站無一張圖是「畫」的**。這是本風格與「flat-shape 自由色塊」「thin-lineart 裝飾線描」的根本差別：每一段線都是一個 bit、有陰陽語意、可被讀回一個卦。

---

## 八、Logo 與 Favicon 設計指南

- **Logo**：取一個與品牌契合的**特定卦**做字記。本堂用「地雷復」（初爻一陽來復、餘五陰）——初爻用硃砂（一陽來復、時來運轉），餘五爻金色陰爻；右側配堂號（Serif 900）與 mono 英標橫向鎖定。
- **Favicon**：同一卦的 32×32 縮版，inline SVG data-URI 寫在 `<head>`：漆黑圓角方底、金色六爻、初爻硃砂。
- 換品牌時：挑一個語意貼合的卦（如穩健取「艮」止、興旺取「泰」、革新取「革」），logo 隨之更換——**logo 本身就是一次占卜**。

---

## 九、Do & Don't

**Do**
- 一切圖形用爻畫程序生成；卦象資料與圖像同源。
- 硃砂當「語意保留字」——只給變爻、當前態、警示、活資料。
- 直排堂號、mono 編號、2px 金線硬邊分格。
- 卦名/卦辭引真實《周易》公有領域文本；白話與吉凶標記明示為「示意」。
- 敏感（占卜/命理）題材必附「虛構示意、不構成決策依據」聲明。

**Don't（含去AI化禁令）**
- 不用藍紫漸層 hero、不用「置中大標＋兩按鈕＋三卡」模板。
- 不用 emoji 當 icon（icon 用爻/SVG）。
- 不用圓角＋模糊陰影卡片。
- 不用 Lorem ipsum、不用「在當今快節奏的世界」AI 腔、不用「EST. 19xx」年份徽章、不用「把 X 變成 Y」標題。
- 硃砂不可濫用為一般裝飾色；金線不可用於警示。
- 不可把「爻畫」畫成裝飾性線條而失去 bit 語意（那就退化成 thin-lineart）。
- 跑馬燈非本風格語彙，勿反射式套用。

---

## 十、頁面骨架範例（可直接取用）

```html
<!-- 爻列導覽 -->
<nav class="yao-nav">
  <div class="brand">堂號</div>
  <ul>
    <li><a href="index.html" aria-current="page"><span class="bar yang"><i></i></span>起卦</a></li>
    <li><a href="gua.html"><span class="bar yin"><i></i><i></i></span>卦解</a></li>
    <li><a href="fa.html"><span class="bar yin"><i></i><i></i></span>卜法</a></li>
    <li><a href="wen.html"><span class="bar yin"><i></i><i></i></span>問事</a></li>
  </ul>
</nav>
```

```js
// 爻畫渲染：bits 由下而上（0=初爻 … 5=上爻）；1=陽,0=陰；chg[i]='o'(老陽)/'x'(老陰)/null
function figSVG(bits, chg, w){
  w = w||132; var lh=13, gap=9, H=6*lh+5*gap;
  var s='<svg viewBox="0 0 '+w+' '+H+'" width="'+w+'" xmlns="http://www.w3.org/2000/svg">';
  for(var vi=0; vi<6; vi++){
    var line=5-vi, y=vi*(lh+gap), yang=bits[line]===1, c=chg&&chg[line];
    var col = c ? '#C33E2A' : '#C6A052';
    if(yang){ s+='<rect x="0" y="'+y+'" width="'+w+'" height="'+lh+'" fill="'+col+'"/>'; }
    else{ var seg=(w-w*0.16)/2;
      s+='<rect x="0" y="'+y+'" width="'+seg+'" height="'+lh+'" fill="'+col+'"/>';
      s+='<rect x="'+(w-seg)+'" y="'+y+'" width="'+seg+'" height="'+lh+'" fill="'+col+'"/>'; }
    if(c){ s+='<circle cx="'+(w/2)+'" cy="'+(y+lh/2)+'" r="4.4" fill="'+(c==='o'?'none':'#16120D')+'" stroke="#16120D" stroke-width="1.6"/>'; }
  }
  return s+'</svg>';
}
```

```js
// 三錢成爻：字=2, 背=3；和 6/7/8/9 → 老陰/少陽/少陰/老陽
function castLine(rng){
  var sum=0; for(var i=0;i<3;i++){ sum += rng()<0.5 ? 3 : 2; }
  if(sum===6) return {yang:0, chg:'x'};   // 老陰（變）
  if(sum===7) return {yang:1, chg:null};  // 少陽
  if(sum===8) return {yang:0, chg:null};  // 少陰
  return {yang:1, chg:'o'};               // 老陽（變）
}
// 六爻自下而上成本卦；變爻翻陰陽 → 之卦
```

**驗收**：一個從未看過 Demo 的 AI，只讀本 SKILL，應能做出「暗漆金線、爻畫成圖、硃砂承變」的同風格站——換個產業（節氣曆／圍棋／二進位教材）也成立。
