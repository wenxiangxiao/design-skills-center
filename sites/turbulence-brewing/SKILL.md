---
name: brutalist-raw-style
description: Build loud, grid-exposed brutalist websites with warning-yellow backgrounds, oversized edge-crashing type, raw bordered tables, and minimal but violent interactions.
---

# 野獸派網頁風格規格書（brutalist-raw-style）

範例實作：`index.html`、`beers.html`、`taproom.html`（亂流製造 Turbulence Brewing）。
本文件的目標：任何 AI 或設計師讀完，不看範例也能重現同一風格。

---

## 1. 設計哲學

- **生猛直接**：資訊不包裝。數字就是數字（ABV 6.8% 不寫成「恰到好處」），警語放大當視覺主角，成分表當文案。
- **結構外露**：網格線、邊框、編號全部可見。讀者應該「看得到版面是怎麼被切開的」。
- **靜態張力 > 動畫**：靠字級落差、色塊撞擊、元素堆疊製造能量；動效只保留三種且各有功能。這是與「動態加重暗色風」的根本區別——那派是暗底＋大量 motion，本派是**亮底＋近乎靜止**。
- **醜得有態度，排版有邏輯**：看似粗暴，實則每個間距、每條線都對齊網格；粗暴是表演，嚴謹是底層。
- **系統感**：所有東西都有編號（SEC.01、T-01、TAP 01–02），像工廠料件標籤，用 monospace 呈現。

## 2. 色彩系統（hex ＋ 比例）

| 角色 | Hex | 佔比 | 用途 |
|---|---|---|---|
| 警示黃（底） | `#FFD400` | ~60% | 頁面底色、格子底、marquee 反色文字 |
| 純黑（結構） | `#000000` | ~30% | 所有邊框與網格線、nav、footer、反色塊、內文 |
| 刺眼橘紅（點綴） | `#FF3E00` | ~5% | 印章、current 頁籤、CTA 大塊、表格重點格、地圖本店標記 |
| 白（提亮） | `#FFFFFF` | ~5% | 局部卡片底、SVG 圖底、note 區塊 |

規則：
- 全站**只有這四色**，禁漸層、禁半透明疊色（網格線淡化 opacity 例外，僅限 SVG 底圖）。
- 橘紅是「稀有資源」：每個視窗高度內最多出現 1–2 處，出現即代表「最重要」。
- `::selection` 反色成橘紅底白字。

## 3. 字體系統

```css
/* Google Fonts（唯一允許的外部資源） */
@import 'Archivo Black';        /* 英文展示字：hero 描邊字、brand 副標 */
@import 'Space Mono' (400,700); /* 系統標籤：編號、表格 th、數據、跑馬燈 */
@import 'Noto Sans TC' (400,700,900); /* 中文：內文 400、強調 700、標題一律 900 */
```

層級：
- **H1**：Noto Sans TC 900，`clamp(56px, 14–19vw, 200–300px)`，`line-height:.92–.95`，`letter-spacing:-.02em`。
- **H1 英文疊字**：Archivo Black，`-webkit-text-stroke: 2.5–3px #000; color: transparent`（空心描邊），負 margin 疊上中文。
- **標籤／數據**：Space Mono 12–14px，`letter-spacing:.08–.15em`，常搭 2px 邊框做成 tag。
- 內文最大行寬約 34–44em，避免粗暴變成難讀。

## 4. 版面與網格（撞邊、重疊規則）

- **無全域 container**：section 直接貼滿視窗寬，內距由格子自己的 padding（20–24px）給。
- **撞邊**：H1 加 `margin-left:-.045em` 讓第一筆畫切出左邊界；body 設 `overflow-x:hidden` 收拾殘局。
- **可見網格**：容器 `background:#000; display:grid; gap:3px`，子元素填亮色底 → gap 自然變成 3px 黑線。區塊之間用 `border-bottom:6px solid #000` 做粗分隔（細線 3px、粗線 6px，只有這兩種粗細）。
- **重疊規則**（最多三層）：
  1. 底層：巨型中文 H1；
  2. 中層：空心描邊英文字，負 margin（`margin-top:-.3em`）壓上去；
  3. 頂層：rotate(±6–8deg) 的印章（4px 橘紅邊框＋mono 大寫短句），`position:absolute` 釘在角落。
- 三欄宣言、兩欄規格等一律用 grid ＋ 3px 黑 gap，**不置中、不等高卡片陰影**，靠線分割。

## 5. 元件配方

### nav（三頁一致）
黑底黃字整條。左側品牌（中文 900 ＋ Archivo Black 小字副標），右側連結為 mono 編號選單「01 首頁／02 酒款／03 酒吧」，每項以 3px 黃線分隔。hover 黃底黑字反色；當前頁 `aria-current="page"` 給橘紅底。

### marquee（nav 正下方）
黑底黃字 mono，一行資訊以「✱」分隔（法定警語必在其中），`.marquee-track` 內容**複製兩份**、`translateX(-50%)` 無縫循環，24s linear infinite。`aria-hidden="true"`（警語另有靜態版在 footer）。

### 表格（不修飾）
`border-collapse:collapse`；th/td 一律 `border:3px solid #000`；thead th 黑底黃字 mono 大寫；數字欄 `.num` 用 Space Mono 700；重點格直接給橘紅底。不加圓角、斑馬紋、陰影。手機用外層 `overflow-x:auto` 橫向捲，不重排。

### 規格卡（可展開）
`<article class="beer">` 內放 `<button class="beer-head" aria-expanded aria-controls>`（grid 橫列：SVG 酒標縮圖｜編號｜名稱＋mono 副標｜ABV｜「+/−」記號），點擊 toggle `.open`；`.spec` 預設 `display:none`，展開後左規格表、右描述文。第一張卡預設展開示範。錨點進入時 JS 自動展開對應卡。

### footer（三頁一致）
黑底。第一行：巨型 900 警語「未滿十八歲禁止飲酒」（clamp 28px–84px）；其下三欄 mono 小字（公司證號／店址時段／聯絡），欄間 3px 黃線；底列左橘紅「酒後不開車」、右版權。

### tag／印章
tag：mono 12px＋2px 黑框＋2px 8px 內距。印章：4px 橘紅框、橘紅 mono 大寫、rotate、疊在標題區。

## 6. 動效規則

只允許三種，各司其職：

1. **marquee**：唯一的常駐動畫，線性等速，不 ease。
2. **hover 反色**：連結與整列元素 hover 時黃黑互換（或黑黃互換），瞬間切換、**不加 transition**——反色本身就是效果。
3. **點擊展開**：規格卡 display 直接切換，不做高度動畫。

一律禁止：視差、scroll-trigger、淡入淡出、打字機、粒子。

降級：
```css
@media (prefers-reduced-motion:reduce){
  .marquee-track{animation:none}
  html{scroll-behavior:auto}
  *{transition:none !important}
}
```

## 7. 插畫與圖像風格（酒標畫法）

- **全部 inline SVG 原創**，禁外部圖片、禁 emoji icon。
- 酒標公式（viewBox `0 0 200 260`）：
  1. 滿版底色（黃、黑或橘紅擇一）；
  2. 內縮 8px 的 6px 描邊外框；
  3. 中段一個**幾何母題**代表酒款個性（IPA＝鋸齒亂流折線、Golden Ale＝日頭圓＋水波、Gose＝鹽晶菱形、Stout＝散落方糖塊、小麥＝麥穗直線陣、DIPA＝三層加密折線、果啤＝粗邊有機色塊）；
  4. 底部黑色橫帶＋Space Mono 反白酒名與數據；
  5. 左上角 mono 小編號（T-01…）。
- 線寬 5–10px、`stroke-linecap:square`、只用品牌四色、不用漸層與圓角、可以歪但不能糊。
- 地圖畫法：白底＋淡黑格線（opacity .15）、道路為黃色粗帶＋5px 黑邊、本店橘紅塊＋三角指標、加指北針與一句自嘲比例尺（「NOT TO SCALE，但夠用」）。

## 8. Logo 與 Favicon 指南

- **Logo**（`assets/logo.svg`）：黑方塊（發酵槽剖面）內畫三道亂流折線（黃×2＋橘紅×1）＋右側中文 900 字標＋黑帶 mono 英文副標＋rotate 橘紅產地章。獨立檔案字體用系統字 fallback（`'Noto Sans TC','PingFang TC',sans-serif`）。
- **Favicon**：inline SVG data URI（32×32）：黃底、3px 黑框、兩道波浪線（黑＋橘紅）。三頁必須用同一段 data URI。URI 內 `#` 要寫成 `%23`。

## 9. Do & Don't

**Do**
- 底色用大面積警示黃，黑線切割一切。
- 標題撞邊、元素重疊、印章旋轉。
- 所有連結保留底線；hover 一律反色。
- 每個區塊、每款產品都給 mono 編號。
- 法定警語做成視覺主角（marquee ＋ footer 巨字）。
- 文案口氣直接、具體、有數字、敢自嘲。

**Don't**
- 禁紫藍漸層、禁任何漸層。
- 禁置中三卡片模板、卡片陰影、圓角。
- 禁 emoji 當 icon、禁外部圖片、禁 Lorem ipsum。
- 禁 AI 腔文案（「探索」「盡情享受」「開啟味蕾之旅」）。
- 禁柔和動畫（fade、ease、視差）；黑白灰以外不要引入第五色。
- 禁暗底大動態——那是另一個風格。

## 10. 頁面骨架範例（HTML 片段）

```html
<!DOCTYPE html>
<html lang="zh-Hant-TW">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>頁名｜品牌 BRAND</title>
  <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%23FFD400'/%3E...%3C/svg%3E">
  <link href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Space+Mono:wght@400;700&family=Noto+Sans+TC:wght@400;700;900&display=swap" rel="stylesheet">
  <style>
    :root{--y:#FFD400;--k:#000;--r:#FF3E00;--w:#FFF}
    body{background:var(--y);color:var(--k);font-family:'Noto Sans TC',sans-serif;overflow-x:hidden;margin:0}
    a{color:inherit;text-decoration:underline}
    a:hover{background:var(--k);color:var(--y)}
    .mono{font-family:'Space Mono',monospace}
    /* nav、marquee、grid-lined、table、footer 配方見第 5 節 */
    @media (prefers-reduced-motion:reduce){.marquee-track{animation:none}}
  </style>
</head>
<body>
  <header class="topbar">
    <a class="brand" href="index.html">品牌名<span class="brand-en">BRAND EN</span></a>
    <nav class="nav mono">
      <a href="index.html" aria-current="page">01 首頁</a>
      <a href="page2.html">02 …</a>
    </nav>
  </header>

  <div class="marquee" aria-hidden="true">
    <div class="marquee-track"><span>警語 ✱ 訊息 ✱&nbsp;</span><span>警語 ✱ 訊息 ✱&nbsp;</span></div>
  </div>

  <main>
    <section class="hero">
      <p class="tag">MONO CONTEXT LABEL</p>
      <h1>巨型中文標題</h1>            <!-- 撞左邊：margin-left:-.045em -->
      <span class="en">OUTLINED EN</span> <!-- 描邊空心字，負 margin 疊上 -->
      <p class="stamp">ROTATED<br>STAMP</p>
    </section>

    <section class="grid-lined">      <!-- 黑底 grid + 3px gap = 可見網格 -->
      <div class="sec-head"><h2>區塊標題</h2><span class="no mono">SEC.01</span></div>
      <div><!-- 內容格 --></div>
    </section>
  </main>

  <footer>
    <p class="warn">未滿十八歲禁止飲酒</p>
    <div class="foot-grid mono"><div>…</div><div>…</div><div>…</div></div>
    <div class="foot-bottom"><span class="drive">酒後不開車，安全有保障。</span><span>© 2026 BRAND</span></div>
  </footer>
</body>
</html>
```
