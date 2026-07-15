---
name: taiwan-enamel-signboard
description: A bold 1980s Taiwanese hand-painted enamel-signboard web system built from saturated color blocks, thick offset borders, hard rectangular plaques, a rotating red-white-blue barber pole, and dense information-packed layouts.
---

# 台式琺瑯招牌設計系統（Taiwan Enamel Signboard）

以 1980 年代台灣街邊理容院／小吃店招牌為藍本：飽和琺瑯色、壓克力牌面、粗描邊、手繪美術字、三色旋轉燈柱、資訊轟炸的密排版。目標是讓一個沒看過示範站的 AI，也能只憑本文件重建出同一套風格。

---

## 設計哲學

- **招牌即介面**：頁面不是留白的畫布，而是一整面掛滿牌子的店面。第一屏就給資訊（價目、時間、電話），不做空泛大字 hero。
- **硬邊、實色、偏移陰影**：一切靠色塊與粗邊界定義，不用漸層柔化、不用模糊陰影、不用圓角軟卡。陰影一律是實心黑色 `box-shadow: 8px 8px 0`，像牌子離牆凸出來。
- **極密但有序（chaotic-but-organised）**：牌面多、標籤多、價格多，但用網格對齊收攏。密度是特色，不是雜亂。
- **有人味的台語嘴砲**：文案用具體人事物與台語俏皮話，拒絕通用行銷腔與 AI 陳腔。
- **去 AI 化**：禁白底、禁圓角軟卡、禁模糊陰影、禁細線 lineart、禁 emoji 圖示、禁 Lorem。

---

## 色彩系統

| 色名 | Hex | 用途 | 建議比例 |
| --- | --- | --- | --- |
| teal enamel base | `#0C7A6B` | 全站底色（琺瑯基底）＋背景磁磚格線 | 約 45%（大面積底） |
| sign red | `#E30A17` | 主招牌、標題牌、CTA、強調 | 約 22% |
| enamel yellow | `#FFC61A` | 描邊、美術字高亮、小標籤 | 約 13% |
| cobalt | `#163FA0` | 次強調、牌框、藍字牌、nav 底 | 約 12% |
| cream plaque | `#F2E7CB` | 牌面與文字面板底（**僅小面積**，禁整頁鋪底） | 約 8% |
| ink | `#101a17` | 牌面內文字 | 文字用 |

規則：底色永遠是飽和琺瑯色，**白／米色不得作為整頁背景**；cream 只出現在牌面、文字面板、表單欄位。三主色（紅／黃／藍）永遠成組出現以維持招牌感。

---

## 字體系統

- **來源**：Google Fonts。`Bungee`（拉丁招牌美術字，全大寫、字距 +1px）、`Noto Serif TC`（中文顯示重體 900）、`Noto Sans TC`（內文 500/700/900）。禁純系統字體。
- **字級 scale**（clamp 響應）：
  - H1 招牌 `clamp(30px, 6–7vw, 66px)` / Serif TC 900 / letter-spacing 2px
  - H2 段落招牌 `clamp(22px, 4vw, 40px)` / Serif TC 900，放在紅牌上
  - H3 牌面小標 `20–22px` / Serif TC 900 / 紅字
  - 價格數字 `34px` / Bungee / cobalt
  - 內文 `15–16px` / Sans TC 700 / 行高 1.6
  - 標籤／英標 `10–14px`
- **字重／行高**：標題一律 900；內文 500–700；招牌字行高 0.98–1.1，內文 1.5–1.6。中文標題加 `letter-spacing: 2px` 模仿手繪美術字的方正撐開。

---

## 版面與網格

- **容器**：`max-width: 1120px`，左右 padding 16px。
- **網格**：價目牆 `repeat(3, 1fr)`，900px 降 2 欄，560px 降 1 欄；資訊條 `repeat(3,1fr)` → 1 欄。
- **密度**：牌與牌間距 12–18px，禁大留白區塊；每屏盡量塞滿可讀資訊。留白只用來分隔牌組，不做「呼吸感」大空場。
- **hard-edge 規則**：`border-radius: 0` 全站；邊框 4–8px 實色；陰影 `Npx Npx 0`（offset，zero blur）；牌面之間允許顏色互撞。
- **背景磁磚**：`body::before` 疊兩層 `linear-gradient` 細線（44px 網格）製造磁磚接縫感，`z-index:-1`、`pointer-events:none`。

---

## 元件配方

### nav（topbar 琺瑯分頁）
```css
.topbar{position:sticky;top:0;background:#163FA0;border-bottom:6px solid #FFC61A}
.topbar .row{display:flex;flex-wrap:wrap}
.navtabs a{padding:12px 18px;font-weight:900;color:#F2E7CB;border-right:4px solid rgba(0,0,0,.25)}
.navtabs a:hover,.navtabs a[aria-current="page"]{background:#FFC61A;color:#101a17}
```
左側 `.brandtab` 紅底，含一支迷你燈柱＋店名。行動裝置靠 `flex-wrap` 自動收合。

### 按鈕（招牌 CTA）
```css
.btn{background:#E30A17;color:#FFC61A;border:5px solid #FFC61A;padding:14px;
     font-family:'Noto Serif TC';font-weight:900;box-shadow:6px 6px 0 rgba(0,0,0,.35)}
.btn:hover{transform:translate(2px,2px);box-shadow:3px 3px 0 rgba(0,0,0,.35)}
.btn:active{transform:translate(6px,6px);box-shadow:0 0 0}
```
按下去像實體牌子被壓進牆（位移陰影，非模糊）。

### 招牌牌面（plaque）
```css
.plaque{background:#F2E7CB;color:#101a17;border:6px solid #163FA0;
        box-shadow:8px 8px 0 rgba(0,0,0,.35)}
```
標題牌則紅底黃邊：`background:#E30A17;border:8px solid #FFC61A`。

### 價目表（翻牌）
每格 `.flip`（`perspective:1000px`）內含 `.flip-inner`（`transform-style:preserve-3d`）與兩張 `.face`（`backface-visibility:hidden`）。正面 cream 底顯示服務名＋Bungee 價格數字；背面 cobalt 底顯示台語俏皮話。價格用真實數字（$350、$500…）。

### 表單
欄位 `input/select`：`background:#fff;border:4px solid #163FA0;padding:11px 12px;font-weight:700`；focus 時 `border-color:#E30A17;box-shadow:4px 4px 0 #FFC61A`。時段用隱藏 radio ＋ `input:checked + span` 變紅底黃字的牌片。表單為示範用途，JS 僅做前端驗證與提示訊息，不真送出。

### footer
`background:#163FA0;border-top:6px solid #FFC61A`，三欄：燈柱＋店家資訊＋台語俏皮話標籤；底部一條紅色 `.disclaimer` 置中，含建置聲明與「設計示範，非真實店家」。

---

## 動效規則

### 旋轉三色燈柱（barber pole）
```css
.pole{position:relative;border:4px solid #163FA0;background:#F2E7CB;overflow:hidden}
.pole::before{content:"";position:absolute;inset:0;
  background:repeating-linear-gradient(-45deg,
    #E30A17 0,#E30A17 12px, #fff 12px,#fff 24px,
    #163FA0 24px,#163FA0 36px, #fff 36px,#fff 48px);
  background-size:100% 68px;
  animation:poleScroll 1.6s linear infinite;}
@keyframes poleScroll{from{background-position:0 0}to{background-position:0 -68px}}
```
- 斜紋角度 −45deg，一組色帶總高＝`background-size` 的 Y（68px）＝關鍵影格位移量，確保無縫循環。
- duration 1.6s、`linear`、`infinite`。頂底各加一塊黃色 `.cap` 金屬帽。
- hero 用寬柱（44–46px），nav／footer 用細柱（20–26px）。

### 招牌翻牌（3D flip）
```css
.flip-inner{transition:transform .5s cubic-bezier(.2,.7,.2,1.2);transform-style:preserve-3d}
.flip:hover .flip-inner,.flip:focus-within .flip-inner{transform:rotateY(180deg)}
.face.back{transform:rotateY(180deg)}
```
- duration 0.5s、easing `cubic-bezier(.2,.7,.2,1.2)`（帶一點回彈）。
- 用 `:focus-within` ＋ 容器 `tabindex="0"` 讓鍵盤與觸控也能翻。

### reduced-motion 降級
```css
@media (prefers-reduced-motion:reduce){
  .pole::before{animation:none}
  .flip-inner{transition:none}
  .flip:hover .flip-inner,.flip:focus-within .flip-inner{transform:none}
}
```
燈柱靜止成靜態斜紋、翻牌停用只顯示正面。次要內容可用輕微 fade，但識別度必須由燈柱＋翻牌承擔，禁把數字跳動／描邊繪製／通用淡入當主特效。

---

## 插畫與圖像風格

- **全部 inline SVG，全部實色色塊**，`viewBox` 固定、無外部參照、無細線 lineart、無 emoji。
- **琺瑯招牌畫法**：矩形填色 → 疊 `stroke` 粗黃邊 → 再疊一層內框（藍或紅），營造壓克力雙層邊。字用 `<text>` Serif TC 900 填黃或奶油色。
- **barber pole SVG**：一根白底直桿加藍框，內部用一串平行四邊形 `<polygon>` 交替紅／藍當斜紋，頂底加黃色帽塊。
- **剪刀／梳子／剃刀**：用圓＋實心多邊形拼出握把與刀刃，兩色（cobalt＋red），不描細線。
- **龍鳳 mark**：兩塊方牌，紅底黃「龍」、藍底奶油「鳳」，字用 Serif TC 900。
- **示意地圖**：teal 底＋深色街道＋黃色分隔線＋紅色本店方塊＋黃色地址標籤，全色塊。

---

## Logo 與 Favicon 設計指南

- **Logo**：方形琺瑯招牌，多層粗邊框（黃→藍），中央 cream 牌面，含旋轉燈柱、龍鳳雙字牌、剪刀色塊、底部 `LUNGFENG` Bungee 字條。`viewBox="0 0 320 320"`，純 SVG。
- **Favicon**：以 barber pole 濃縮版當識別——teal 底、白桿藍框、紅／藍斜紋三段。用 inline SVG data URI 放 `<head>`：
```html
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E...%3C/svg%3E">
```
記得把 `#` 編碼成 `%23`、空白成 `%20` 或用單引號屬性。

---

## Do & Don't

**Do**
- 用飽和琺瑯底色、粗實色邊框、offset 實心陰影。
- 第一屏就給價目／資訊（toc-first）。
- 用真實價格數字與具體台語文案。
- 每頁共用同一套 nav／footer，相對連結互通。
- 提供 reduced-motion 降級與鍵盤可操作。

**Don't**
- 禁白底／米底整頁鋪底（cream 只做小牌面）。
- 禁圓角軟卡（`border-radius` 一律 0）。
- 禁模糊陰影（blur 一律 0，只做位移）。
- 禁細線單線 lineart 與 emoji 圖示。
- 禁 Lorem ipsum 與「在當今快節奏的世界」「巷弄改建」類 AI 陳腔。
- 禁把數字跳動／stroke-dashoffset 繪製／通用淡入當主要 signature。

---

## 頁面骨架範例（可直接複用）

```html
<nav class="topbar" aria-label="主選單">
  <div class="wrap"><div class="row">
    <a class="brandtab" href="index.html">
      <div class="pole" style="height:44px;width:20px"><i class="cap top"></i><i class="cap bot"></i></div>
      <div><b>龍鳳理容院</b><span>LUNGFENG BARBER</span></div>
    </a>
    <div class="navtabs">
      <a href="index.html" aria-current="page">首頁・價目表</a>
      <a href="story.html">老店故事</a>
      <a href="booking.html">預約</a>
    </div>
  </div></div>
</nav>

<section class="hero">
  <div class="board">
    <div class="pole hero-pole"><i class="cap top"></i><i class="cap bot"></i></div>
    <div class="signhead">
      <span class="kicker">民國72年開張</span>
      <h1 class="display">龍鳳理容院</h1>
      <div class="en latin">LUNGFENG BARBER</div>
    </div>
  </div>
</section>

<!-- 翻牌價目 -->
<div class="flip" tabindex="0">
  <div class="flip-inner">
    <div class="face front">
      <div class="svc">傳統剪髮</div>
      <div class="price"><span class="cur">$</span><span class="num">350</span><span class="nt">NT</span></div>
    </div>
    <div class="face back"><div class="quip">剪好看的</div></div>
  </div>
</div>

<footer>
  <div class="wrap"><div class="foot-grid">
    <div class="pole"><i class="cap top"></i><i class="cap bot"></i></div>
    <div class="foot-info"><b>龍鳳理容院</b><p>延平北路二段 128 號 ・ (02) 2557-3820</p></div>
    <div class="foot-quip"><span>緣投轉來</span></div>
  </div></div>
  <div class="disclaimer">本站由 Claude Opus 4.8（排程 Agent 自動執行）建置 ・ 設計示範，非真實店家</div>
</footer>
```
