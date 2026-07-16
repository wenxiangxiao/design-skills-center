---
name: rubbing-stele-duotone
description: A stone-rubbing (bei-tuo) aesthetic — white relief lines on ink-dark ground, vermilion seals and gold meander bands, strict two-tone — for temple, folk-craft and heritage brands with a playful ritual interaction.
---

# 拓印風・碑拓雙色域（Rubbing / Bei-tuo Duotone）

把網站當成一張碑拓拓本：墨黑的紙、白線的字、朱紅的落款印、金墨的回紋。這是一種源自石碑捶拓的視覺——白線黑底、有顆粒、有手感。適合廟宇文創、民藝、香鋪、老字號、在地信仰題材。核心是「儀式感的互動」：把求籤、擲筊、抽御守這類廟口動作，做成可玩的介面。

## 設計哲學

- **雙色域（duotone）**：整站只有兩個色域——朱砂紅與墨黑，靠米紙作亮、金線作點。禁止第三主色大面積出現。
- **白線黑底的拓本邏輯**：關鍵圖像用「深底 + 淺白線」呈現（碑拓的正片感），而非黑線白底。
- **朱印為記**：紅色是「印章／落款／焦點」，出現得少而準，蓋下去就有份量。
- **儀式感互動**：核心功能要模擬一個真實的廟口儀式（搖籤筒、開籤、抽御守），有節奏、有揭示、有落款。
- **溫柔而不喧嘩**：文案療癒、口語、留白；標示「玩賞而非勸誘」，不作吉凶保證。

## 色彩系統

| 用途 | Hex | 說明 | 比例 |
|---|---|---|---|
| 墨黑 ink | `#1A1512` | 深底、拓本地、footer、dock、主要文字 | 34% |
| 墨褐 ink2 | `#3A2E27` | 次階文字 | 6% |
| 米紙 rice | `#ECE1CB` | 主背景（亮面）、深底上的白線與字 | 34% |
| 米紙暗 rice2 | `#DFD0B2` | hover、次卡片底 | 6% |
| 朱砂 verm | `#C1362B` | 祭壇區塊底、印章、焦點、標題點睛 | 14% |
| 朱砂暗 verm2 | `#9E2A22` | 次紅、eyebrow 標籤 | 2% |
| 金 gold | `#B8893C` | 回紋、極稀御守、底線點綴 | 3% |
| 玉綠 jade | `#3C6E5A` | 稀有御守綢色（極少量冷色調節） | <1% |

規則：頁面在「米紙亮面」與「朱砂／墨黑深面」之間交替成段（duotone 的兩極）。金只用在細線與極稀等級。

## 字體系統

- **中文標題／內文**：Noto Serif TC（900 標題、700 小標、400/500 內文）。
- **毛筆手感（籤詩、招牌、印文、eyebrow）**：Zhi Mang Xing（芝麻行楷，Google Fonts），用於籤詩詩句、「求」「籤」「印」等大字與碑拓題字。
- 不使用等寬字；標籤用 Noto Serif TC 加大字距（`.34em` 大寫）。
- 字級：H1 `clamp(30px,4.6vw,52px)`、eyebrow 手寫 `clamp(30px,6vw,58px)`、內文 15–16px、籤詩 `clamp(20px,2.6vw,26px)` 行高 2。

## 版面與網格

- **toc-first 開場**：首頁頂部是刊頭（logo + 店名 + 地址），接一頁「目次」——`grid 64px 1fr auto` 的大序號（壹貳參肆）＋標題＋手寫「→」。目次即導覽入口。
- **段落雙色交替**：亮面 section（米紙底）與 `.altar` 深面 section（朱砂底、字轉米白）交錯，段間插一條 `.meander` 金色回紋帶（`repeating-linear-gradient(90deg,gold 0 2px,transparent 2px 10px)`）。
- **功能區（求籤）**：`grid 300px 1fr`——左籤筒 stage，右籤詩卡（slip）；手機單欄。
- **卡片**：`2px solid ink` 硬框、無圓角、無模糊陰影；格線用 `1px` 深色縫隙 grid（`gap:1px;background:ink`）。
- **紙感**：`body::before` 疊兩個 `radial-gradient` + `mix-blend-mode:multiply` 造宣紙暈邊（opacity .5）。
- 底部留 `padding-bottom:76px` 給 bottom-dock。

## 元件配方

- **nav（bottom-dock）**：固定底部墨黑條、朱紅上邊界，置中排四個項目，每項為自繪 SVG 線圖示 + 小字；current／hover 提亮成金。
- **按鈕**：主要＝墨黑實心 + 米字 + `2px` 同色框；次要（ghost）＝透明 + 米框，hover 反相。`:active` 下沉 1px（非硬陰影招牌）。
- **籤筒**：SVG 竹筒（深底白線）+ 露出的籤支 + 回紋帶 + 「籤」題字；`.shake` 做 2 次輕微 rotate 晃動。
- **籤支**：米紙色細長條，`.pop` 由筒中向上彈出（`translateY` + 彈性 cubic-bezier），直書籤號。
- **籤詩卡（slip）**：米紙硬框，頂列籤號 + 吉凶徽章（上上＝朱底白字／上＝金底墨字／中＝描邊／下＝墨底米字）；詩句 + 解曰；右下朱印。
- **朱印章**：朱砂圓角方章 + 米白內框 + 手寫印文，`.stamp` 由 `scale(1.7) rotate(-16deg)` 落定到 `scale(1) rotate(-8deg)`、opacity 收斂。
- **御守（SVG）**：圓角長方綢面 + 頂部提繩弧線 + 中央題字；顏色依稀有度換 fill/stroke，極稀加金色 `inset` 外框。

## 動效規則

- **搖籤（signature 起手）**：`.cyl.shake` → `@keyframes shake` 0.5s、來回小角度 rotate、跑 2 次。
- **籤支彈出**：`.stick.pop` → `translate(-50%,60px)→(-50%,-96px)` + opacity，`0.6s cubic-bezier(.2,.9,.2,1.2)`。
- **開籤・碑拓上墨（signature 核心）**：籤詩容器初始 `clip-path:inset(0 0 100% 0)`（.wipe），開籤時移除、加 `.reveal`（`inset(0 0 0 0)`），`transition:clip-path .9s ease`，模擬墨由上而下拓現；詩句 `<span>` 再以 `260 + i*220ms` 逐句 `opacity/translateY` 浮字。
- **朱印落款**：詩句浮完後 `.stamp` 蓋章。
- **御守盲盒揭示**：最後 `.omi.show` 淡起（`fadeup .5s`），依權重 POOL 抽稀有度。
- 全站 `@media(prefers-reduced-motion:reduce)`：關閉所有動畫，並把 `.stick.pop`、`.poem.wipe`、詩句 span 直接設為終態（clip 全開、opacity 1），確保無動畫也可讀。
- **禁止**：把「通用淡入」當招牌、數字 count-up 滾動、按壓硬陰影、dashoffset 描繪（本館已過載）。本風格的招牌是「搖籤 + 上墨拓現 + 落印」的儀式序列。

## 插畫與圖像風格

- **碑拓白線黑底**：主要圖像（石碑、招牌、籤筒）用深色底 + 米白／金線描；加少量 `opacity:.18` 白點做石面顆粒。
- **回紋／雲紋**：用 `path` 折線或 `repeating-linear-gradient` 做連續回字紋，金色，作邊飾與分段。
- **御守／文具**：簡化的綢面、印章、箋紙、紙膠帶，硬邊 SVG、雙色。
- 全 SVG，**零外部圖片**；只引 Google Fonts。

## Logo 與 Favicon 設計指南

- **Logo**：朱砂圓角方印為底，內含白線「籤筒 + 三支籤」的負形，底部一道金色回紋。像一枚會抽籤的印章。
- **Favicon**：32×32 朱砂圓角方塊 + 墨色籤筒 + 三支米白籤，寫成 inline SVG data URI 放 `<head>`。

## Do & Don't

- **Do**：只用朱×墨雙色域 + 米紙 + 金線；白線黑底的拓本圖像；朱印點睛；把廟口儀式做成有節奏的互動；文案療癒、標明「玩賞而非勸誘」。
- **Don't**：紫藍漸層、置中大標三卡模板、emoji icon、圓角模糊陰影、第三主色大面積、Lorem ipsum、AI 腔、「把 X 變成 Y」標題、「EST. 19xx」徽章、「老街屋改建」開場敘事、對真實宗教作吉凶保證。

## 頁面骨架範例

```html
<section class="altar" id="qian">   <!-- 朱砂深面 -->
  <div class="cyl" id="cyl" role="button" tabindex="0">
    <svg viewBox="0 0 210 250"><!-- 深底白線籤筒 --></svg>
    <div class="stick" id="stick"><span class="sn">第—籤</span></div>
  </div>
  <div class="slip" id="slip"><div class="empty">按「搖籤筒」開始</div></div>
  <button class="btn" id="shakeBtn">搖籤筒</button>
  <button class="btn ghost" id="openBtn">開籤</button>
</section>
```

```css
.poem.wipe{clip-path:inset(0 0 100% 0);transition:clip-path .9s ease}
.poem.reveal{clip-path:inset(0 0 0 0)}
.seal.stamp{animation:stamp .5s cubic-bezier(.2,.7,.3,1.3) forwards}
@keyframes stamp{0%{opacity:0;transform:scale(1.7) rotate(-16deg)}
  60%{opacity:1;transform:scale(.92) rotate(-8deg)}100%{opacity:.92;transform:scale(1) rotate(-8deg)}}
.meander{height:10px;background:repeating-linear-gradient(90deg,#B8893C 0 2px,transparent 2px 10px)}
```
