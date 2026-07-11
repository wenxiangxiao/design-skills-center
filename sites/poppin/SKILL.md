---
name: playful-pop-sticker-style
description: Build playful pop-art websites with saturated clashing colors, thick black outlines, hard offset shadows, rotated sticker badges, comic bursts, and bouncy wiggle animations.
---

# 俏皮普普風（Playful Pop Sticker Style）風格規格書

本文件是完整的可重現規格：任何 AI 或設計師照此文件操作，即可做出與 Poppin 範例站
（index.html / features.html / download.html）同一套視覺語言的網站。

---

## 1. 設計哲學

- **像貼紙簿，不像簡報。** 每個元件都是一張「貼在紙上的貼紙」：有厚黑描邊、白色貼紙邊、
  硬陰影和微微旋轉。整頁看起來是手貼上去的，不是對齊工具排出來的。
- **撞色要敢。** 亮黃大底 + 洋紅 / 鈷藍 / 橘色塊直接相撞，用黑描邊當緩衝。
  絕不用漸層去「柔化」，普普風的力量來自色塊邊界清楚。
- **與粉彩糖果風的區隔**（最容易混淆，務必守住）：
  - 糖果風＝低飽和粉彩、無描邊或細描邊、柔和圓角、模糊陰影 → **本風格全部相反**。
  - 本風格＝高飽和原色感、3px+ 黑描邊、硬陰影（零模糊）、元素帶旋轉角度。
- **動起來但不吵。** 動效只做三類：進場 pop（帶回彈）、互動回饋（hover / 按壓）、
  少量持續 wiggle 點綴（整頁最多 2 處）。其餘元素靜止，才能襯托會動的。
- **文案是風格的一半。** 繁中為主、口號與 UI 詞彙用英文（DROP A POP、TAP IN）。
  語氣年輕有梗但不油：可以自嘲（「喊 +1 喊到心累」）、給具體數字（「2 分 41 秒成團」），
  禁止空話（「開啟無限可能」「探索精彩生活」這類 AI 腔一律不寫）。

## 2. 色彩系統

| 角色 | 名稱 | HEX | 使用比例 |
|------|------|-----|----------|
| 主底色 | Pop Yellow | `#FFD400` | ~45%（頁面大底） |
| 描邊／文字 | Ink Black | `#141414` | ~20%（所有描邊、內文、硬陰影、深色區塊） |
| 主強調 | Hot Magenta | `#FF3EA5` | ~12%（主 CTA、重點徽章、logo 泡泡） |
| 次強調 | Cobalt Blue | `#2B5BFF` | ~8%（次要按鈕、英文小標、連結感元素） |
| 三強調 | Tangerine | `#FF7A1A` | ~5%（第三層級點綴、警示感標籤） |
| 輔助 | Fresh Mint | `#35D07F` | ~4%（成功／安全語意，其上文字用黑不用白） |
| 紙面 | Cream Paper | `#FFF6E9` | ~4%（導覽列底、深色區文字色） |
| 貼紙面 | White | `#FFFFFF` | ~2%（卡片底、貼紙白邊） |

規則：
- 黃底上的大面積文字一律 `#141414`；洋紅／鈷藍／橘色塊上的文字用白＋細黑描邊
  （`-webkit-text-stroke:.5px #141414`）；薄荷綠上文字用黑。
- 深色區塊（footer、CTA band）底色就是 `#141414`，標題用黃、強調用洋紅。
- 貼紙卡片底色可用極淡的變體：`#FFF0F8`（粉）、`#EEF3FF`（藍）、`#FFF6E0`（黃）、`#EAFBF1`（綠），
  但描邊與陰影仍是純黑。
- **禁止**：任何漸層（尤其紫藍漸層）、半透明玻璃擬態、模糊陰影。
- 頁面大底加點狀紋理增加紙感：
  `background-image:radial-gradient(rgba(20,20,20,.13) 1.4px,transparent 1.4px); background-size:26px 26px;`

## 3. 字體系統

Google Fonts 載入：

```html
<link href="https://fonts.googleapis.com/css2?family=Bungee&family=Lilita+One&family=Noto+Sans+TC:wght@400;500;700;900&display=swap" rel="stylesheet">
```

| 用途 | 字體 | 設定 |
|------|------|------|
| 展示標題（display） | Lilita One，中文 fallback Noto Sans TC 900 | `font-family:'Lilita One','Noto Sans TC',sans-serif; line-height:1.15; letter-spacing:.5px` |
| 口號／kicker／跑馬燈 | Bungee | 小字級（.8–1.2rem）、`letter-spacing:1px`，只用於短英文 |
| 內文 | Noto Sans TC 400/500 | `line-height:1.75` |
| 強調內文／小標 | Noto Sans TC 700/900 | — |

字級：H1 `clamp(2.3rem,5vw,4.2rem)`；H2 `clamp(1.9rem,3.6vw,2.8rem)`；
卡片標題 1.1–1.3rem；內文 .95–1.12rem。標題內重點字包 `.hl` 色塊（見 5.6）。

## 4. 版面與網格

- 內容寬 `max-width:1160px`，左右 padding 24px。
- 區塊垂直節奏：`padding:88px 0`（手機 64px）。
- 網格刻意「不對稱、不置中三卡」：特色用 **2×2**、功能卡用 **3×2（六張）**、
  評語牆用 **3 欄不等高**、流程用 **4 欄橫排**。每個卡片給不同的 `--tilt` 旋轉角
  （-2.5deg ~ +2.4deg 交錯），破除模板感。
- 區塊之間可插入全寬黑底跑馬燈條或 `border-top/bottom: 3px solid #141414` 的換色帶。
- 標題區（sec-head）靠左不置中，寬度限 640–660px。

## 5. 元件配方

### 5.0 全域參數

```css
:root{
  --bw:3px;                          /* 描邊：一律 3px（小元素 2.5px、logo 可到 6px）*/
  --shadow:6px 6px 0 #141414;        /* 硬陰影標準檔：無模糊、無擴散 */
  --shadow-sm:4px 4px 0 #141414;
  --shadow-lg:10px 10px 0 #141414;   /* 手機 mockup 等大物件用 12–14px */
}
```

### 5.1 貼紙（sticker）— 本風格核心元件

白邊用第一層 `box-shadow` 疊出來，硬陰影疊第二層；自帶旋轉角與 hover 回正：

```css
.sticker{
  --tilt:-2deg;
  background:#fff;border:3px solid #141414;border-radius:18px;
  box-shadow:0 0 0 5px #fff, 8px 8px 0 #141414;  /* 白貼紙邊 + 硬陰影 */
  transform:rotate(var(--tilt));
  transition:transform .18s ease;
}
.sticker:hover{transform:rotate(calc(var(--tilt) * -1.5)) scale(1.04);z-index:3}
```

同排卡片依序給 `--tilt:-2deg / 1.6deg / -1.2deg / 1.8deg…` 正負交錯。

### 5.2 按鈕（含按壓位移）

```css
.btn{
  font-family:'Lilita One','Noto Sans TC',sans-serif;
  padding:14px 30px;border:3px solid #141414;border-radius:999px;
  background:#FF3EA5;color:#fff;-webkit-text-stroke:.5px #141414;
  box-shadow:6px 6px 0 #141414;
  transition:transform .12s ease,box-shadow .12s ease;
}
.btn:hover{transform:translate(-2px,-2px);box-shadow:8px 8px 0 #141414}
.btn:active{transform:translate(6px,6px);box-shadow:0 0 0 #141414} /* 位移量 = 陰影位移量 */
```

關鍵：**按壓時的 translate 距離必須等於原本陰影的 offset**，看起來才像真的被壓進紙面。
變體：`.btn-blue`（#2B5BFF）、`.btn-yellow` / `.btn-cream`（淺底黑字、去 text-stroke）。

### 5.3 Speech bubble（對話泡泡）

```css
.bubble{
  position:relative;background:#fff;
  border:3px solid #141414;border-radius:20px;
  box-shadow:4px 4px 0 #141414;padding:14px 20px;
}
.bubble::before{ /* 尾巴：旋轉方塊只描右、下兩邊 */
  content:"";position:absolute;bottom:-15px;left:32px;width:20px;height:20px;
  background:#fff;border-right:3px solid #141414;border-bottom:3px solid #141414;
  transform:rotate(45deg);
}
```

換底色時 `::before` 的 background 要跟著改。

### 5.4 爆炸框（comic burst）

SVG 星芒多邊形，24 個頂點（外圈 12 + 內圈 12 交錯），`stroke-linejoin:round`：

```svg
<polygon points="112,60 95,50 105,33 85,34 85,13 69,23 60,5 51,23 35,13 35,34
  15,33 25,50 8,60 25,70 15,87 35,86 35,107 51,97 60,115 69,97 85,107 85,86 105,87 95,70"
  fill="#FF3EA5" stroke="#141414" stroke-width="4" stroke-linejoin="round"/>
```

用途：步驟編號徽章、CTA 區裝飾（溢出裁切一半）、logo 底座。中央文字用白字＋
`paint-order:stroke` 黑描邊。

### 5.5 貼紙式徽章 / kicker

```css
.sec-kicker{
  font-family:'Bungee',sans-serif;font-size:.85rem;
  background:#2B5BFF;color:#fff;border:3px solid #141414;border-radius:8px;
  padding:3px 14px;box-shadow:4px 4px 0 #141414;transform:rotate(-2deg);
}
```

### 5.6 標題色塊字（.hl）

```css
.hl{
  display:inline-block;background:#FF3EA5;color:#fff;
  padding:0 16px;border:3px solid #141414;border-radius:16px;
  box-shadow:4px 4px 0 #141414;transform:rotate(-1.5deg);
  -webkit-text-stroke:1px #141414;
}
```

### 5.7 手機 mockup（純 CSS/SVG）

結構：`.phone`（黑框機身）> `.screen`（cream 螢幕，flex column）> 瀏海 + 狀態列 +
App 標頭 + 篩選 chips + 卡片 feed + 圓形 FAB + 底部 tabbar。

```css
.phone{
  width:288px;background:#141414;border:5px solid #141414;border-radius:44px;
  padding:10px;box-shadow:14px 14px 0 #141414;
  animation:floaty 4.5s ease-in-out infinite;   /* 漂浮 */
}
.screen{background:#FFF6E9;border-radius:32px;height:568px;overflow:hidden;
  display:flex;flex-direction:column}
.app-card{border:2.5px solid #141414;border-radius:14px;box-shadow:4px 4px 0 #141414}
```

App 內容照真的 App 排：分類標籤（洋紅／鈷藍／橘依類別）、人數圓點（滿=色、空=白）、
+1 膠囊按鈕、FAB 寫「POP!」並掛 wiggle。手機外圍疊 2–3 個絕對定位的漂浮貼紙
（bubble「+1 我要跟！」、burst「揪!」）。

## 6. 動效規則（keyframes 具體參數）

```css
/* 進場 pop：縮放回彈，保留元件本身的 tilt */
@keyframes popIn{
  0%{opacity:0;transform:scale(.5) rotate(var(--tilt,0deg))}
  70%{opacity:1;transform:scale(1.07) rotate(var(--tilt,0deg))}
  100%{opacity:1;transform:scale(1) rotate(var(--tilt,0deg))}
}
.pop{opacity:0}
.pop.in{animation:popIn .55s cubic-bezier(.34,1.56,.64,1) forwards}

/* 持續 wiggle：整頁最多 2 處（如 FAB、爆炸貼紙） */
@keyframes wiggle{0%,100%{transform:rotate(-5deg)}50%{transform:rotate(5deg)}}
.wiggle{animation:wiggle 1.4s ease-in-out infinite}

/* 漂浮（手機 mockup / QR 卡） */
@keyframes floaty{0%,100%{transform:translateY(0) rotate(3deg)}50%{transform:translateY(-14px) rotate(3deg)}}

/* 跑馬燈：內容複製兩份，位移 -50% 無縫循環 */
@keyframes ticker{to{transform:translateX(-50%)}}
.marquee-track{display:flex;width:max-content;animation:ticker 22s linear infinite}
```

觸發與節流：
- `.pop` 用 IntersectionObserver（`threshold:.15`）進視窗才播，同層兄弟依索引
  `index % 6 * 0.07s` 疊延遲，做出「啪啪啪」連續貼上的感覺。
- 互動時長固定：hover/active `.12s–.18s ease`；進場 `.55s` 回彈曲線
  `cubic-bezier(.34,1.56,.64,1)`。
- 必附 `prefers-reduced-motion:reduce` 降級（動畫停用、`.pop` 直接顯示）。

## 7. 插畫與圖像風格

- **一律手寫 SVG**，禁外部圖片、禁 emoji 當 icon。
- 線條 icon：24×24 viewBox、`stroke-width:2.2–2.6`、`stroke-linecap/linejoin:round`、
  `fill:none`，顏色隨底色（深色塊上白線、淺色塊上黑線）。
- 場景插畫（步驟圖、盾牌等）：96×96 或更大 viewBox，色塊填色＋黑描邊 3–3.5px，
  造型圓潤、透視壓平（正面視角），細節不超過 5 個元素。
- QR code 示意：29×29 viewBox、`shape-rendering:crispEdges`，三個角落定位框
  （7×7 外框＋5×5 白＋3×3 黑）＋隨機 1×1/2×1 資料格，中央蓋品牌色小方塊。
- 星星評分：五顆 24×24 星形 path，實星填 `#FFD400`、空星填 `#EDEDED`，都帶黑描邊。

## 8. Logo 與 Favicon 設計指南

- **Logo 構成**：黃色 12 芒爆炸星（rotate -8deg）疊洋紅對話泡泡（rotate -6deg，
  泡泡含尾巴、內置白字黑邊「P!」），右側 Lilita One 標準字「Poppin」，
  字下加鈷藍波浪線（`q` 曲線重複），右上點一顆橘色小星。描邊 6–8px。
- **層次口訣**：底層黃 burst → 中層洋紅 bubble → 上層白字，三層都有黑描邊。
- **Favicon**：inline SVG data URI，64×64 —— 黃底圓角方塊（rx 14、黑邊 5）＋
  洋紅 16 芒星（黑邊 3）＋中央白圓（黑邊 3）。單引號屬性、`#` 編碼為 `%23`。
- 導覽列 logo 直接內嵌同一套 SVG（40×40）＋文字「Poppin」，避免額外請求。

## 9. Do & Don't

**Do**
- 描邊 3px 起跳，陰影永遠是 `Xpx Ypx 0`（第三值必為 0，零模糊）。
- 每張卡片給不同旋轉角，正負交錯。
- 按壓回饋 = translate 位移吃掉陰影 offset。
- 中英混排：中文說人話，英文只當口號和 UI 詞彙，全大寫＋Bungee/Lilita One。
- 文案給具體數字和具體場景（麻辣鍋、羽球雙打、北美館）。
- 深色區塊用純黑 `#141414`，上面放黃色標題製造最強對比。

**Don't**
- 禁任何漸層（紫藍漸層是頭號通緝犯）、禁玻璃擬態、禁模糊陰影（`box-shadow` 帶 blur 值）。
- 禁粉彩低飽和配色（那是糖果風，不是普普風）。
- 禁「置中大標＋置中三卡片」模板；禁整頁所有元素都水平垂直置中。
- 禁 emoji 當 icon；禁外部圖庫、placeholder 圖、Lorem ipsum。
- 禁 AI 腔文案：「賦能」「開啟無限可能」「探索精彩」「立即體驗美好生活」。
- 禁讓超過 2 個元素同時無限循環動畫（會變夜市跑馬燈）。
- 禁細字重標題（display 一律最粗）。

## 10. 頁面骨架範例（HTML 片段）

```html
<!DOCTYPE html>
<html lang="zh-Hant">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>頁面標題 — 品牌名</title>
  <link rel="icon" href="data:image/svg+xml,%3Csvg ...%3E%3C/svg%3E"><!-- 原創 SVG favicon -->
  <link href="https://fonts.googleapis.com/css2?family=Bungee&family=Lilita+One&family=Noto+Sans+TC:wght@400;500;700;900&display=swap" rel="stylesheet">
  <style>/* :root 變數 + 元件配方（見第 5 節）全部 inline */</style>
</head>
<body>

  <header class="nav"><!-- sticky、cream 底、黑色 3px 下邊線 -->
    <div class="nav-inner">
      <a class="nav-logo" href="index.html"><svg><!-- 內嵌 logo --></svg><span class="word">Brand</span></a>
      <nav class="nav-links">
        <a href="index.html" aria-current="page">首頁</a>
        <a href="features.html">功能</a>
        <a href="download.html">下載</a>
      </nav>
      <a class="btn btn-sm" href="download.html">CTA</a>
    </div>
  </header>

  <section class="hero">
    <div class="wrap hero-grid"><!-- 左文右圖，不置中 -->
      <div>
        <span class="hero-badge pop">狀態徽章</span>
        <h1 class="display pop">主標題<span class="hl">重點色塊字</span></h1>
        <div class="slogan pop">ENGLISH SLOGAN IN BUNGEE</div>
        <p class="lead pop">一段有具體場景與數字的說明文案。</p>
        <div class="hero-btns pop">
          <a class="btn" href="#">主要 CTA</a>
          <a class="btn btn-cream" href="#">次要 CTA</a>
        </div>
      </div>
      <div class="phone-wrap"><!-- CSS 手機 mockup + 漂浮貼紙 --></div>
    </div>
  </section>

  <div class="marquee"><div class="marquee-track"><!-- 內容 x2 --></div></div>

  <section class="sec">
    <div class="wrap">
      <div class="sec-head"><!-- 靠左 -->
        <span class="sec-kicker pop">KICKER</span>
        <h2 class="display pop">區塊標題</h2>
      </div>
      <div class="feat-grid"><!-- 2x2 或 3x2，張張不同 --tilt -->
        <article class="feat sticker pop" style="--tilt:-1.5deg">…</article>
      </div>
    </div>
  </section>

  <section class="cta-band"><!-- 黑底 + 溢出的 burst SVG + 黃標題 --></section>

  <footer><!-- 黑底、黃 logo 字、洋紅欄標、虛線分隔 --></footer>

  <script>
  // IntersectionObserver 進場 pop（含兄弟延遲），見第 6 節
  </script>
</body>
</html>
```

依此骨架換品牌、換文案、換插畫主題，即可複製整套俏皮普普風。
