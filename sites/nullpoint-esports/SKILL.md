---
name: cyberpunk-neon-hud
description: Cyberpunk neon HUD interface style — near-black canvas, hard-edged cyan/magenta/acid neon, scanlines, RGB glitch shifts, diagonal clip-path panels, and monospace tech type instead of soft gradients.
---

# 賽博龐克霓虹 HUD 風格（Cyberpunk Neon HUD）

> 本 SKILL 定義一整套視覺語言。任何 AI 只要讀完，就能替**任意產業**做出風格一致的網站——風格不綁定「電競」這個題材。NULLPOINT 斷點戰隊只是它的一次示範；同一套語言可用於串流硬體、賽車、資安、加密錢包、夜店、科幻出版、DJ 廠牌等需要「近未來介面感」的題材。

---

## 一、設計哲學

賽博龐克的視覺不是「霓虹漸層的太空」，而是**高科技、低生活**的粗糙介面感：破舊的 CRT 螢幕、抬頭顯示器（HUD）、掃描線、訊號干擾。它冷、硬、亮，像一台隨時會當機卻仍在運轉的機器。

三個不可動搖的原則：

1. **HUD 即版面**：頁面不是「文件」，而是一具正在讀取資料的介面。用邊框、角標、狀態列、數值讀數、十字準星（reticle）把資訊「儀表化」。
2. **硬邊霓虹，不是柔光漸層**：亮色只出現在 1px 線、實心小塊、文字與外光暈（box-shadow glow）上，襯在近黑底上製造對比。**嚴禁把整個背景鋪成紫藍漸層**——那是 AI tell，也違反賽博龐克「暗底＋點狀霓虹」的本質。
3. **訊號會故障**：互動的重點動效是 glitch（RGB 通道位移）與 scanline，而非平滑淡入放大。故障是這個風格的情緒——秩序邊緣的雜訊。

情緒關鍵字：冷硬、警戒、速度、近未來、機械精確。

## 二、色彩系統

近黑底 + 三支硬邊霓虹 + 灰藍階。霓虹是「訊號」不是「背景」，出現要克制。

| 色票 | Hex | 用途 | 大約比例 |
| --- | --- | --- | --- |
| 深空黑 BG | `#0A0A12` | 主背景 | 46% |
| 更暗底 BG2 | `#07070D` | footer、暈影、面板凹陷 | 14% |
| 面板 Panel | `#12121E` / `#0E0E1A` | 卡片、狀態列底 | 18% |
| 霓虹青 Cyan | `#00F0FF` | 主強調：邊框、連結、logo、glow | 8% |
| 霓虹洋紅 Magenta | `#FF2E88` | 次強調：故障通道、警示、對比重音 | 5% |
| 酸黃綠 Acid | `#CCFF00` | 稀有重音：勝利、CTA、關鍵數值 | 3% |
| 冷白 Ink | `#EAF6FF` | 主文字（帶青調的白，不用純白） | 4% |
| 灰藍 Dim | `#7C8AA5` | 次要文字、標籤、metadata | — |
| 網格線 Line | `#1E2440` / `#2A3358` | 背景網格、分隔線、邊框 | — |

規則：

- **三支霓虹各司其職**：青＝結構與品牌、洋紅＝故障與對比、酸黃綠＝最稀有的勝利/CTA 重音。酸黃綠一個畫面出現 1–2 次即可。
- 文字白用 `#EAF6FF`（微青），不用 `#FFFFFF`；純白在暗底上太刺。
- **禁止任何大面積漸層**，尤其紫藍。需要層次時用黑／面板灰／網格線的實色階，或極低透明度的單色 glow。
- glow 用 `box-shadow:0 0 22px rgba(0,240,255,.4)`，只在 hover/live 狀態出現，不常駐鋪滿。

## 三、字體系統

- **拉丁字／數字／標籤**：`Chakra Petch`（Google Fonts）——帶切角的科技單寬感無襯線體，是這個風格的招牌。字重 400／500／600／700。所有 ID、比分、標籤、按鈕、metadata 都用它。
- **中文字**：`Noto Sans TC`，字重 400／500／700／900。中文大標用 700–900。
- 標籤、編號、狀態、按鈕一律 `text-transform:uppercase` + `letter-spacing:.12em–.28em`，並常在前面加 `//` 前綴當「終端機提示符」。
- CSS 變數：`--mono:'Chakra Petch','Noto Sans TC',ui-monospace,monospace;` `--han:'Noto Sans TC',sans-serif;`

字級 scale（clamp 響應）：

```
故障主標 clamp(3rem,9vw,6.6rem)    font-weight 700  line-height .92   letter-spacing .01em  (Chakra Petch)
內頁大標 clamp(2.4rem,7vw,4.6rem)  font-weight 700  line-height .95
區塊標題 clamp(1.5rem,3.4vw,2.3rem) font-weight 700  letter-spacing .03em
選手 ID   1.5rem                     font-weight 700
內文      15–17px                     font-weight 400  line-height 1.6
標籤/讀數 10–13px                     font-weight 600  大寫 + 寬字距
```

行高規則：大標壓到 `.92–.95` 讓字塊像機械銘牌；內文放 `1.6` 保持可讀。標題可齊左或置左，避免正中對稱的「大標＋副標＋兩鈕」模板。

## 四、版面與網格

- **HUD 讀數列（sysbar）**：nav 下方一條 `repeat(4,1fr)` 的靜態資訊列（狀態／排名／戰績／下一項），每格用 `//` 標籤 + 數值，垂直細線分隔。這是「別站沒有」的識別之一，取代跑馬燈承擔滾動資訊。
- **背景網格**：`body` 用兩層 `linear-gradient` 畫 44px 淡網格（`--line` 1px），加一層 `radial-gradient` 暈影壓四角，再疊一層 `repeating-linear-gradient` 掃描線（`rgba(0,240,255,.04)` 每 3px 一條）。三層都用 `position:fixed;pointer-events:none`。
- **對角切割**：面板/卡片/按鈕用 `clip-path:polygon(...)` 切掉一角（通常右下），製造「被裁切的介面模組」感。按鈕切右下 68–74%，卡片切右下 90–92%。
- **不對稱**：hero 用 `1.15fr .85fr` 而非 50/50；區塊標題左側加 `//` 編號標籤，底線只畫左段 120px 洋紅重點線。
- **留白與旋轉**：section 上下 padding 約 54px。元素**幾乎不旋轉**（賽博龐克靠切角與掃描線，不靠傾斜）；斜的部分交給 clip-path 的對角邊。
- **邊框哲學**：用 1px 線（`--line2`）當「機殼縫線」；重點模組左緣加一條 4px 實色霓虹條（`::before`）當「電源指示」。

## 五、元件配方

**Nav（HUD bar）**：`position:sticky;top:0`，半透明近黑 `rgba(10,10,18,.86)` + `backdrop-filter:blur(8px)`，底部 1px 縫線；再用 `::after` 疊一條「青→透明→洋紅」的漸層細線當 HUD 掃描邊。連結 Chakra Petch 大寫寬字距、預設 `--dim`，hover 轉青；當前頁加 `--line2` 外框 + 底部 2px 酸黃綠標記。

**按鈕**：切角 `clip-path:polygon(0 0,100% 0,100% 68%,88% 100%,0 100%)`，1px 霓虹外框、透明底、霓虹字。hover 反色（填滿霓虹、字轉底黑）+ `box-shadow` glow。主色青、對比色洋紅（`.btn.mag`）。左側可放一個 `currentColor` 實心小方點當「狀態燈」。

**卡片（選手 HUD 卡）**：`--panel` 底 + 1px `--line2` 框 + 右下切角。頂部 portrait 區放原創 SVG 剪影，左上角標編號（酸黃綠）、右上角色標籤（青底黑字方牌）。內含一層 `.scan`（掃描線）預設 `opacity:0`，hover 轉 1；剪影加 `.sil` class，hover 觸發 `rgbshift` 動畫（drop-shadow 拆青/洋紅通道 + 微位移）。這是招牌互動。

**表格（賽程 fixtures）**：不用 `<table>` 視覺，用 grid 列 `120px 1fr 1.2fr 110px 130px`，每列上緣 1px 分隔，hover 換 `--panel` 底。日期用酸黃綠 Chakra Petch，狀態用小方牌（up＝酸黃綠框）。

**Scoreboard（比分網格）**：`repeat(3,1fr)` 靜態格，每格右上用 CSS 三角（`border-width:0 34px 34px 0`）標勝負色（勝＝酸黃綠、負＝洋紅）；大比分用 Chakra Petch 44px，我方勝色/敗色、對方 `--dim`。

**表單／輸入**：`--panel` 底 + 1px `--line2` 框，focus 時 `border-color:--cyan` + 青 glow，無圓角。送出鈕酸黃綠底黑字 + 切角。

**Footer**：`--bg2` 底，頂部 `::before` 疊「洋紅→透明→青」漸層線。四欄 grid：品牌（logo SVG + 說明）、導覽、聯絡、情報訂閱表單。連結 hover 轉酸黃綠。底部 1px 線 + 大寫 metadata 列，含「資料皆為虛構示意」。

## 六、動效規則

冷、快、帶雜訊——動效模擬訊號與介面，不做柔和的呼吸感。**動效手法要分散**：本風格的簽名是 glitch 與 scanline，而**不使用跑馬燈**。

| 動畫 | 觸發 | duration | easing | 說明 |
| --- | --- | --- | --- | --- |
| 進場揭示 rv | IntersectionObserver 進入視窗 | .7s | `cubic-bezier(.2,.7,.2,1)` | `opacity 0→1` + `translateY(20px→0)`，一次性 |
| 標題故障 glitch | 常駐（僅片刻爆發） | 2.6s / 3.4s infinite | `steps(2)` | `::before`（青）/`::after`（洋紅）用 `data-text` 複製，90%+ 時間靜止，僅末段瞬間 clip + 位移 |
| 卡片 RGB 位移 rgbshift | 卡片 :hover | .5s infinite | `steps(2)` | 剪影 `drop-shadow` 拆青/洋紅通道 + `translateX ±2px` |
| 掃描線顯現 | 卡片 :hover | .2s | ease | `.scan` 疊層 `opacity 0→1` |
| HUD 脈動 pulse | 常駐（live 指示燈） | 1.4s infinite | ease-in-out | 小方塊 `opacity` + glow 呼吸 |
| 數值計數 count-up | 進場（threshold .5） | ~1.1s | `easeOutCubic`（JS） | 統計數字從 0 跑到目標值 |
| hover 反色/glow | nav/按鈕 :hover | .15–.18s | ease | 反色 + `box-shadow` 霓虹 glow |

原則：故障只在極短片刻爆發（避免整頁抖動使人不適），位移幅度 ≤3px。**必附降級**：

```css
@media (prefers-reduced-motion: reduce){
  html{scroll-behavior:auto}
  *{animation:none!important;transition:none!important}
  .rv{opacity:1;transform:none}
  .glitch::before,.glitch::after{display:none}  /* 關閉故障疊層 */
  body{background-attachment:scroll}
}
```

## 七、插畫與圖像風格

**零攝影、零外部圖片**。所有視覺用原創 inline SVG / CSS，語彙限定：

- 基本元素：十字準星（reticle）、切角面板、線框幾何、掃描線、網格、CSS 三角角標、簡化人形剪影（圓頭 + 梯形肩身 + 幾條發光切線）。
- 選手剪影：用一個圓（頭）+ 一條 `C` 曲線肩身填暗色，再疊 2–3 條霓虹垂直/水平發光線當「數據掃描」，角色不同換主色（青/洋紅/酸黃綠）。維持家族感。
- 贊助商標：純幾何字標（Chakra Petch 文字 + 一個線框圖記），統一 34px 高、`opacity:.72` hover 轉 1。
- 城市/地圖若需要：用網格線代表街廓、發光線代表天際線、小方塊代表節點，全部霓虹描邊。
- 配色只用青／洋紅／酸黃綠／灰藍／白，比例呼應 §2。

避免：漸層填色、光暈鋪底、擬真陰影、emoji、任何圖庫感插畫或 3D 渲染。

## 八、Logo 與 Favicon 設計指南

**Logo**（`assets/logo.svg`）：一個「準星晶片」標記 + Chakra Petch 字標。標記做法——一個 `clip-path` 切角的晶片外框（青描邊）內含兩條 HUD 分隔線，中央疊一個十字準星：酸黃綠線框圓 + 洋紅十字 + 青色中心方塊（即「null point / 歸零的那一點」隱喻）。字標用 Chakra Petch 700 大寫寬字距，下方疊中文名 + 地區碼（青色，超寬字距）。

**Favicon**：把準星標記簡化為 32×32 inline SVG data URI 寫在 `<head>`：近黑底 → 青描邊外框 → 酸黃綠線框圓 → 洋紅十字 → 青色中心方塊。範例：

```html
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%230A0A12'/%3E%3Crect x='3' y='3' width='26' height='26' fill='none' stroke='%2300F0FF' stroke-width='2'/%3E%3Ccircle cx='16' cy='16' r='7' fill='none' stroke='%23CCFF00' stroke-width='2'/%3E%3Cpath d='M16 4V11 M16 21V28 M4 16H11 M21 16H28' stroke='%23FF2E88' stroke-width='2'/%3E%3Crect x='13' y='13' width='6' height='6' fill='%2300F0FF'/%3E%3C/svg%3E">
```

## 九、Do & Don't

**Do**

- 近黑底 + 硬邊霓虹點綴；霓虹只在線、字、小塊、glow 上出現。
- 用 HUD 語彙：狀態列、`//` 前綴標籤、準星、角標、數值讀數。
- 招牌互動用 glitch（RGB 位移）+ scanline；每站至少一個「別站沒有」的 HUD 版面。
- 對角 clip-path 切角、1px 縫線、4px 霓虹電源條。
- 圖像一律原創 SVG/CSS，維持青／洋紅／酸黃綠家族；動效必附 `prefers-reduced-motion`。

**Don't（含去 AI 化禁令）**

- 紫藍漸層 hero、任何大面積漸層背景（這是最典型的 AI tell，也違反本風格暗底本質）。
- 「置中大標＋副標＋兩顆按鈕＋三張圓角卡片」模板。
- 圓角（`border-radius`）與柔焦大陰影——本風格用直角切角與硬 glow。
- emoji 當 icon（icon 一律自繪 SVG）。
- Lorem ipsum 與 AI 腔（「在當今快節奏的世界」）；文案要具體、有 ID、有數字、有地址。
- **跑馬燈（marquee/ticker）**——本風格用靜態 HUD 讀數列 + 故障 hover 承擔重點，不套跑馬燈。
- 純白 `#FFFFFF` 大面積文字（用微青 `#EAF6FF`）；霓虹鋪滿整頁（失去對比就失去賽博感）。

## 十、頁面骨架範例

可直接改寫使用的最小骨架：

```html
<!DOCTYPE html>
<html lang="zh-Hant-TW">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>品牌名｜一句定位</title>
<link rel="icon" href="data:image/svg+xml,...(見 §8)...">
<link href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@400;500;600;700&family=Noto+Sans+TC:wght@400;500;700;900&display=swap" rel="stylesheet">
<style>
*{box-sizing:border-box;margin:0;padding:0}
:root{--bg:#0A0A12;--bg2:#07070D;--panel:#12121E;--cyan:#00F0FF;--magenta:#FF2E88;--acid:#CCFF00;
--ink:#EAF6FF;--dim:#7C8AA5;--line:#1E2440;--line2:#2A3358;
--mono:'Chakra Petch','Noto Sans TC',monospace;--han:'Noto Sans TC',sans-serif}
body{background:var(--bg);color:var(--ink);font-family:var(--han);line-height:1.6;
  background-image:linear-gradient(var(--line) 1px,transparent 1px),linear-gradient(90deg,var(--line) 1px,transparent 1px);
  background-size:44px 44px;background-attachment:fixed}
body::after{content:"";position:fixed;inset:0;pointer-events:none;
  background:repeating-linear-gradient(0deg,rgba(0,240,255,.04) 0 1px,transparent 1px 3px)}
.tag{font-family:var(--mono);font-weight:600;font-size:11px;letter-spacing:.28em;text-transform:uppercase;color:var(--cyan)}
.btn{font-family:var(--mono);text-transform:uppercase;letter-spacing:.12em;padding:12px 22px;border:1px solid var(--cyan);color:var(--cyan);background:transparent;
  clip-path:polygon(0 0,100% 0,100% 68%,88% 100%,0 100%)}
.btn:hover{background:var(--cyan);color:var(--bg);box-shadow:0 0 22px rgba(0,240,255,.4)}
.glitch{position:relative;display:inline-block}
.glitch::before,.glitch::after{content:attr(data-text);position:absolute;left:0;top:0;width:100%;overflow:hidden}
.glitch::before{color:var(--cyan);z-index:-1;animation:gl 3.4s infinite steps(2)}
.glitch::after{color:var(--magenta);z-index:-2;animation:gl 2.6s infinite steps(2)}
@keyframes gl{0%,92%,100%{transform:translate(0,0);clip-path:inset(0)}93%{transform:translate(-3px,-2px);clip-path:inset(10% 0 60% 0)}96%{transform:translate(3px,1px);clip-path:inset(50% 0 20% 0)}}
@media(prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}.glitch::before,.glitch::after{display:none}}
</style>
</head>
<body>
<header class="hud-nav"><!-- sticky 半透明近黑 + 底部青→洋紅漸層縫線；logo 準星晶片 + 大寫連結 --></header>
<div class="sysbar"><!-- repeat(4,1fr) 靜態 HUD 讀數列：狀態/排名/戰績/下一項 --></div>
<main class="wrap">
  <section class="hero" style="display:grid;grid-template-columns:1.15fr .85fr;gap:34px;align-items:center">
    <div>
      <span class="tag">// LIVE · 2026</span>
      <h1><span class="glitch" data-text="標題">標題</span></h1>
      <a class="btn" href="#">進入 →</a>
    </div>
    <div class="matchcard"><!-- 切角 HUD 面板，左緣 4px 酸黃綠電源條 --></div>
  </section>
</main>
<footer><!-- bg2 底 + 頂部洋紅→青漸層線；四欄 grid --></footer>
</body>
</html>
```

驗收標準：一個從未看過 NULLPOINT Demo 的 AI，只讀本 SKILL.md，就能替任何產業做出「一眼認得出是賽博龐克霓虹 HUD」的全新網站——近黑底、硬邊霓虹、掃描線、故障 hover、對角切角、單寬科技字，零漸層鋪底、零外部圖片。
