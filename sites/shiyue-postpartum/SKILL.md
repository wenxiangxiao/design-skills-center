---
name: papercut-layer-style
description: Layered papercut web aesthetic with pastel paper stacks, scalloped die-cut edges, eave-shaped topbar, and depth built from offset solid-color silhouettes.
---

# papercut-layer-style 層疊剪紙風格技能

以「多層色紙疊出景深」為核心的網頁視覺系統。適用於需要溫柔、手作、療癒氣質的品牌（產後照護、托育、選物、烘焙、文化場館）。本文件為完整施工手冊。

## 一、設計哲學

剪紙的力量在「剪掉」而非「畫上」。每一層只有一種顏色、一個輪廓；深度不是靠漸層或光影模擬，而是靠**紙與紙之間的物理疊放**——上層剪影、下層以同色系深色平移少許，就是紙的厚度。整體氣質應該像一座安靜的紙雕燈箱：極疏的密度、大量留白、少量元素，每個元素都值得被看見。禁止喧嘩：不用滾動計數器、不用揭示進場當主角、不用跑馬燈。動只動一點點——像紙被呼吸吹動。

## 二、色彩系統

粉彩三原紙＋各自的「深一號紙」構成全部用色：

| 名稱 | 變數 | 色值 | 用途 |
|------|------|------|------|
| 暖杏 | `--bg` | `#F6DFD3` | 頁面底紙 |
| 暖杏深 | `--bg-deep` | `#EDC9B4` | 底紙的紙厚層、聲明帶 |
| 霧綠 | `--mist` | `#CFE0D5` | 簷口 nav、間隔段落 |
| 霧綠深 | `--mist-deep` | `#AFCBBB` | 霧綠的紙厚層 |
| 藕粉 | `--lotus` | `#EBC7C2` | 強調段落、雲朵 |
| 藕粉深 | `--lotus-deep` | `#D9A9A2` | 藕粉的紙厚層、彎月 |
| 紙卡 | `--card` | `#FFF6EE` | 卡片表層紙 |
| 墨 | `--ink` | `#584740` | 內文 |
| 磚陶 | `--rose` / `--rose-deep` | `#C0796C` / `#A5614F` | 主按鈕、強調 |
| 松綠 | `--pine` / `--pine-deep` | `#6F9481` / `#587E6B` | 標籤、次強調 |

規則：**禁漸層、禁深底、禁米白紙紋理**。每個顏色都要有配對的「深一號」作紙厚。文字只用墨色與磚陶深，不在粉彩上放低對比淺字。

## 三、字體系統

- 標題：`Noto Serif TC` 600（僅載 600/700），`letter-spacing:.04em`，行高 1.5–1.55。
- 內文：`Noto Sans TC` 400/500/700，行高 1.9，字級 16px 起。
- Kicker（節眉）：小字＋`letter-spacing:.34em`＋磚陶色，前置一枚小刀花剪紙（clip-path 鋸齒條）。
- 只載 Google Fonts 一條 `<link>`；不用任何裝飾性英文字體，英文僅作房型代號（STANDARD／FAMILY／SUITE）等小標。

## 四、版面與網格

- 內容寬 `--maxw:1120px`，左右 padding 28px（≤560px 降為 18px）。
- 段落節奏「極疏」：section 上下 padding 110px（行動裝置 76px），一屏只講一件事。
- 禁止置中三卡片模板：服務列表用**交錯紙條**（奇數靠左、偶數 `margin-left:auto`），房型用**左右交替的雙欄大卡**。
- 段落交界一律用剪紙元素縫合：波浪 divider（Q 曲線重複）或圓齒刀花（半圓弧重複），fill 取下一段的底紙色。

## 五、元件配方

**紙層卡 `.paper`**
```css
.paper{background:var(--card);border-radius:20px;
  box-shadow:0 3px 0 var(--card-edge),      /* 紙厚：3px 同系深色實線影 */
             0 16px 34px rgba(88,60,45,.09);/* 環境影：低透明大模糊 */}
```
紙厚影必須是**實色、無模糊、3–4px**；環境影透明度 ≤ .12。兩者缺一不可，缺紙厚就不像紙，環境影過重就變按壓硬陰影（禁）。

**刀花邊（圓齒）**：SVG 重複弧 `a24 14 0 0 1 -48 0` 沿水平線排滿；或 CSS `clip-path` 鋸齒 polygon 作細窄刀花（卡片頭、色票下緣）。

**簷口 nav**：topbar 底色霧綠；`position:absolute; top:100%` 掛兩條圓齒 SVG——前層與 bar 同色（bar 邊緣變圓齒）、後層深一號、`top:7px` 錯位（簷下陰影紙）。內容第一屏記得留出簷口高度。

**剪紙按鈕 `.btn`**：磚陶底、全圓角、`box-shadow:0 4px 0 var(--rose-deep)` 紙厚＋柔和環境影；hover 上浮 3px、紙厚加深至 7px——像紙片被抬起，不是被按下。

## 六、動效規則

- **紙層視差／飄動**：雲朵等背景剪紙用 `translateY` 6–10px、5–9 秒、`ease-in-out alternate infinite`，各層錯開 delay 營造層次。只動背景層，不動文字層。
- 互動回饋：hover 上浮 2–3px＋紙厚加深；展開／出現用 opacity＋14px 位移、0.5 秒內結束。
- 禁：stroke-dashoffset 描線、數字滾動、進場揭示序列、無限旋轉。
- `prefers-reduced-motion: reduce` 時全域 `animation:none; transition:none`，scrollIntoView 改 `auto`。

## 七、插畫風格（層疊剪紙畫法）

1. 每個物件由 2–5 層**純色剪影**組成，由遠而近疊放。
2. 「紙厚」＝把同一 path 複製一份放在下層，`transform="translate(0 4~7)"`、填同色系深一號、`opacity .4–.55`。上淺下深，位移只往下（光源固定在上方）。
3. 輪廓圓潤、轉角處用弧不用尖角；細節用「挖洞」（淺色形狀疊上）表現，不用描線。
4. 常備母題：彎月（大圓減小圓的 path）、積雲（多圓融合）、屋簷（梯形＋圓齒簷口）、搖籃（碗形＋橢圓口）、母嬰剪影（頭圓＋肩弧＋懷中小圓）。
5. 禁：漸層、細線線描、水彩暈染、半調網點、guilloché、條碼紋。

## 八、Logo 與 Favicon 指南

- Logo＝「圓齒紙盤（刀花外框）＋內圈白紙＋主母題（彎月＋搖籃）＋字標」。紙盤外框用重複小弧串成花邊圓，同樣做雙層紙厚。
- 字標：中文 serif 600 大字＋間距拉開的 sans 小字副標，下方壓一條細刀花。
- Favicon：取 Logo 最核心一層母題（彎月），簡化為 3–4 個形狀，以 inline SVG data URI 內嵌（`%23` 轉義色碼），不另出檔。
- Logo SVG 中的 `<text>` 需附系統字體 fallback（Songti TC／PingFang TC）。

## 九、Do & Don't

**Do**
- 每層一色，深度靠疊紙位移。
- 段落交界永遠有剪紙縫合（波浪或圓齒）。
- 留白當作素材用：一屏一主題，元素少而大。
- 溫柔語調：短句、對「妳」說話、不感嘆號轟炸。

**Don't**
- 漸層（尤其紫藍漸層）、深色底、米白紙紋理。
- 置中三卡片、跑馬燈、EST.19xx 徽章、數字滾動計數器。
- 按壓式硬陰影（純黑大位移）、stroke-dashoffset 描線動畫。
- 細線 icon 混入剪紙插畫；emoji 當 icon。

## 十、頁面骨架範例

```html
<header class="topbar">          <!-- 霧綠簷口 -->
  <div class="topbar-inner">品牌＋navlinks</div>
  <div class="eaves">兩條圓齒 SVG（前同色／後深一號錯位）</div>
</header>
<main>
  <section class="hero">        <!-- 第一屏主功能（如週餐表），背景飄雲 -->
  <svg class="divider">          <!-- 波浪縫合，fill=下一段底色 -->
  <section class="sec about">   <!-- 霧綠段：剪紙場景插畫＋文案 -->
  <svg class="divider">
  <section class="sec">         <!-- 暖杏段：交錯紙條列表 -->
  <svg class="divider">
  <section class="sec visit">   <!-- 藕粉段：制度＋資訊紙卡 -->
  <section class="sec cta">     <!-- 紙層 CTA 卡＋剪紙按鈕 -->
</main>
<div class="fict">虛構聲明帶（暖杏深）</div>
<footer>霧綠 footer：品牌／頁面／時刻三欄＋虛線 copyline</footer>
```

施工提醒：刀花與簷口 SVG 的 path 重複段極長，貼上前請逐字檢查——漏一段弧就會在簷口留下破口。正確寫法見第五章。
