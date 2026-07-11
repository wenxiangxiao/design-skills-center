---
name: memphis-milano
description: Memphis Milano web style — cream ground with dotted grid, bold black outlines and hard offset (blur-free) shadows, candy primaries, scattered geometric confetti (circles, triangles, zigzags, squiggles), rounded display type, and bouncy playful motion.
---

# 孟菲斯設計風格（Memphis Milano）

> 本 SKILL 定義一整套視覺語言。任何 AI 只要讀完，就能替**任意產業**做出風格一致的網站——風格不綁定「兒童教育」這個題材。跳跳格學園只是它的一次示範（冰淇淋店、桌遊品牌、街頭市集、獨立唱片行都適用）。

---

## 一、設計哲學

孟菲斯風格源自 1981 年米蘭 Ettore Sottsass 領軍的設計團體，是對「好品味、極簡、功能至上」的一次故意反叛。它的核心是**玩、衝突、去菁英化**：把不搭的顏色湊在一起、把裝飾放回設計、把嚴肅趕出房間。畫面應該讓人想笑、想伸手摸。

三條心法：**大膽勝過協調**（顏色敢撞、圖形敢散）、**平面勝過擬真**（硬邊、無漸層、無真實光影，陰影是實心色塊）、**動勝過靜**（一切都在輕輕彈跳）。這風格天生適合兒童、娛樂、食物、活動；用於嚴肅產業時要克制彩度但保留幾何語彙。

## 二、色彩系統

| 色票 | Hex | 用途 | 比例 |
| --- | --- | --- | --- |
| 奶油底 Paper | `#FBF3E4` | 主背景（非純白，暖一點才對味） | 46% |
| 描邊黑 Ink | `#17150F` | 所有描邊、文字、硬陰影 | 22% |
| 粉 Pink | `#FF4FA3` | 主強調、CTA | 8% |
| 青 Cyan | `#21C7D6` | 第二強調、高亮塊 | 7% |
| 黃 Yellow | `#FFC93C` | 按鈕、icon 底 | 7% |
| 珊瑚 Coral | `#FF6B45` | 區塊底、點綴 | 4% |
| 葡萄 Grape | `#7C5BD9` | 深色區塊（轉盤、標題色） | 4% |
| 薄荷 Mint | `#2FCB7E` | 點綴、成功狀態 | 2% |

規則：底一律奶油色，永不用純白。所有顏色都是**平塗**、飽和、無漸層。描邊與文字永遠是接近黑的 `#17150F`（非純黑，暖一點）。六個亮色可自由撞色，但同一區塊控制在 2–3 色。**陰影是實心黑色塊**（`5px 5px 0 #17150F`），永遠不用模糊——這是孟菲斯與「柔和卡通風」的關鍵分界。

## 三、字體系統

拉丁字用 `Fredoka`（圓潤、友善、有重量，700 做標題），中文用 `Noto Sans TC`（900／700 做標題，500 內文）；皆來自 Google Fonts。孟菲斯要的是**圓潤有肉、帶點孩子氣**的字，避免纖細襯線與過度中性的 Helvetica。

字級 scale：Hero `clamp(46px,9.5vw,120px)`、行高 .94（大字要擠、要有壓迫的活力）；區塊標題 `clamp(28px,4.5vw,48px)`；內文 15–17px、行高 1.7。標籤（tag/chip）用 Fredoka 12–13px、大寫、寬字距 `.14em`，常放進黑色圓角膠囊。**簽名手法**：把單字丟進撞色的圓角方塊裡並輕微旋轉（`transform:rotate(-4deg~1.5deg)`），讓標題像積木一樣參差堆疊。

## 四、版面與網格

不對稱、散落、故意「亂中有序」。背景鋪 `radial-gradient` 圓點網格（`background-size:26px 26px`）當底噪。主內容維持 `max-width` 置中，但**裝飾圖形絕對定位散落**在四周（右上、左中、下方），並各自以不同 delay 漂浮。圓角是這風格的一部分（`border-radius:14~26px`），但一律搭配 3px 黑描邊與硬陰影，與 AI 常見的「無邊框柔和圓角卡」區隔。旋轉：卡片與標題塊常帶 `-4deg~10deg` 的小角度。留白：section 上下 56px；卡片內距 22–26px。

## 五、元件配方

**Nav**：奶油底、底部 3px 黑實線、sticky。連結為 Fredoka 圓角，hover 時填黃底＋黑框＋位移出硬陰影（`translate(-2px,-2px);box-shadow:3px 3px 0`）；當前頁填粉底白字。行動選單為黃底黑框漢堡鈕，選單下拉為全寬。

**按鈕**：3px 黑框、圓角 14px、硬陰影 `5px 5px 0`；hover 放大陰影並位移，`:active` 壓回（`translate(3px,3px);box-shadow:1px 1px 0`）——像實體按鈕被按下。主按鈕粉底白字，次要黃／薄荷底黑字。

**卡片**：3px 黑框、圓角 20px、硬陰影；hover 時 `translate(-3px,-3px) rotate(-1deg)` 並加深陰影（抖一下）。icon 放在撞色的圓角方塊裡（3px 框），icon 本身是黑線 SVG。

**膠囊標籤 chip**：小圓角、2–3px 黑框；age chip 用黑底白字。

**深色區塊**：葡萄或墨黑底、白字，用於統計帶或 CTA，製造節奏對比。

**Footer**：奶油底、頂部 3px 黑線、底部 2px **虛線**分隔（`dashed`，玩味細節），欄目標題用葡萄色 Fredoka 大寫。

## 六、動效規則

活潑、彈跳、略帶過衝（overshoot）。

- **漂浮圖形**：`@keyframes bob` 5s ease-in-out infinite，`translateY(0↔-16px)` 保持各自旋轉角；各圖形不同 `animation-delay` 錯開。
- **進場揭示**：`.rv{opacity:0;translateY(20~24px) rotate(-1deg)}` → IntersectionObserver 加 `.in`，`transition .6s cubic-bezier(.2,1.1,.3,1)`（帶回彈）。
- **hover 抖動**：卡片 `.18s` 位移＋微旋＋加深硬陰影；按鈕位移，`:active` 壓回。
- **課程轉盤**：`conic-gradient` 圓盤，點擊後 `transform:rotate(N*360+random)`，`transition:2.4s cubic-bezier(.15,.9,.2,1)`；結果文字用 `@keyframes pop`（scale .7→1.12→1）彈出。
- **結果彈出 pop**：`.45s cubic-bezier(.2,1.4,.3,1)`。

一律提供 `@media(prefers-reduced-motion:reduce)`：關閉 `animation`、揭示直接顯示、hover 不位移、轉盤無過場、`scroll-behavior:auto`。**不使用跑馬燈**——孟菲斯的動效簽名是「漂浮的幾何」與「彈跳的互動」，而非捲動橫幅。

## 七、插畫與圖像風格

全部原創 inline SVG／CSS，皆為**幾何基本形**：正圓、同心圓、三角形、鋸齒折線、波浪曲線（`q` 貝茲）、旋轉方塊、terrazzo 斑點。線條粗（stroke-width 2.6–4）、端點圓（`stroke-linecap:round`）。icon 一律黑線描 SVG，放在撞色方塊裡。頭像用「圓角方塊底＋簡化人臉線描」。禁照片、禁漸層、禁 emoji 當 icon。轉盤這類元件可用 `conic-gradient` 直接做出色輪。

## 八、Logo 與 Favicon 設計指南

**Logo**：一個圓角方塊徽記，內部堆疊三種孟菲斯基本形（鋸齒＋圓＋三角，各帶黑框），旁附 Fredoka 粗體品牌名（可讓其中一字換成撞色），下方一行大寫拉丁副名＋一段薄荷波浪線收尾。

**Favicon**：把徽記濃縮成 32×32——亮色方底、一個圓、一道黑鋸齒、一個小三角，寫成 inline SVG data URI。範例：
`data:image/svg+xml,%3Csvg ... %3Crect fill='%23FFC93C'/%3E%3Ccircle fill='%23FF4FA3'/%3E%3Cpath d='鋸齒' stroke='%2317150F'/%3E%3Cpolygon fill='%2321C7D6'/%3E%3C/svg%3E`

## 九、Do & Don't

**Do**：奶油底＋圓點網格、粗黑描邊、硬位移陰影、撞色平塗、散落幾何、圓潤字體、彈跳動效、旋轉的標題塊、虛線細節、`prefers-reduced-motion` 降級。

**Don't**（含去AI化禁令）：
- 禁模糊陰影（孟菲斯的陰影一律實心無 blur）。
- 禁漸層填色（尤其紫藍漸層 hero）；顏色一律平塗。
- 禁純白背景與純黑文字（用奶油底與 `#17150F`）。
- 禁「置中大標＋副標＋兩顆按鈕＋三張圓角卡片」的對稱模板；要不對稱、要散落。
- 禁 emoji 當 icon（icon 一律自繪 SVG）。
- 禁 Lorem ipsum 與 AI 腔；文案要有具體課名、年齡、價格、人名、電話。
- 禁跑馬燈反射式套用。

## 十、頁面骨架範例

```html
<header class="nav"><div class="bar">
  <a class="brand" href="index.html">
    <svg class="mk" viewBox="0 0 44 44"><rect x="1.5" y="1.5" width="41" height="41" rx="11" fill="#FFC93C" stroke="#17150F" stroke-width="3"/>
      <path d="M8 30l6-9 6 9 6-9 6 9" fill="none" stroke="#17150F" stroke-width="3" stroke-linecap="round"/>
      <circle cx="14" cy="15" r="4.5" fill="#FF4FA3" stroke="#17150F" stroke-width="2.4"/></svg>
    <b>品牌<em>名</em></b>
  </a>
  <nav><ul><li><a href="index.html">首頁</a></li><li><a href="two.html">第二頁</a></li></ul></nav>
</div></header>

<section class="hero"><div class="wrap">
  <span class="tag">大寫寬字距小標籤</span>
  <h1><span class="l1">傾斜</span><span class="l2">大字，</span><span class="l3">塞進色塊</span></h1>
  <p class="sub">圓潤字體、撞色、散落幾何……</p>
  <svg class="shape s1" ...><!-- 漂浮圓/三角/鋸齒 --></svg>
</div></section>

<style>
:root{--ink:#17150F;--paper:#FBF3E4;--pink:#FF4FA3;--cyan:#21C7D6;--yellow:#FFC93C;--sh:5px 5px 0 var(--ink);
  --lat:'Fredoka',sans-serif;--han:'Noto Sans TC',sans-serif;}
body{background:var(--paper);font-family:var(--han);
  background-image:radial-gradient(var(--ink) 1.4px,transparent 1.4px);background-size:26px 26px}
.btn{border:3px solid var(--ink);border-radius:14px;box-shadow:var(--sh);transition:transform .16s,box-shadow .16s}
.btn:active{transform:translate(3px,3px);box-shadow:1px 1px 0 var(--ink)}
.hero h1 .l3{background:var(--cyan);border:3px solid var(--ink);border-radius:16px;box-shadow:var(--sh);transform:rotate(-1deg)}
</style>
```

---

*本 SKILL 由 Design Skills Center 提供。示範站：跳跳格兒童創造學園 Zigzag Kids（兒童教育 × 孟菲斯）。*
