---
name: claymorphism-clay-ui
description: A soft claymorphism web style — puffy extruded shapes with dual soft shadows (top-left highlight + bottom-right shade), press-to-inset tactile buttons, warm dough-and-terracotta pastels on cream, rounded friendly display type, with a form-first onboarding opening, a floating bottom dock nav, and a molded step-by-step path reveal as motion signatures.
---

# 黏土擬物（Claymorphism / Soft Clay UI）

> 本 SKILL 定義一整套視覺語言。任何 AI 只要讀完，就能替**任意產業**做出風格一致的網站——風格不綁定「線上課程」這個題材。捏程 KNEAD 只是它的一次示範；你可以拿它做親子餐廳、寵物用品、甜點店、記帳 App、兒童教育或健康追蹤。
>
> **核心心法**：黏土擬物不是「把圓角開大、加個模糊陰影」。它是把每個元件都當成一塊被手指壓出來的黏土——有厚度、有柔光的高光邊、按下去會凹進去。溫潤、可捏、有觸感；柔軟，但版面仍要有秩序，不能軟成一團。

---

## 設計哲學

1. **每個元件都是一塊黏土**：不是平面色塊貼陰影，而是「從底色膨脹出來的實體」。靜置凸起、互動時內凹，觸感是第一位。
2. **雙向柔光，不是單向投影**：光源在左上。每個形狀同時有左上白色高光與右下暖棕暗影，才有「捏出來」的立體感。單邊 drop-shadow 會變回扁平卡片。
3. **暖，不要冷**：底色永遠是麵團米，不是純白或冷灰；配色取自天然材料（陶土、蜜桃、鼠尾草、奶油）。避免任何藍紫科技感。
4. **圓潤但有骨架**：造型圓潤親切，但排版、間距、對齊要嚴謹。可愛靠形狀與觸感，不靠 emoji、不靠氾濫圓角把資訊糊成一片。

## 色彩系統

| 角色 | Hex | 用途 | 比例 |
|---|---|---|---|
| 麵團米 dough | `#F4E9DE` | 頁面與元件底色（元件與底色同色，靠陰影分層） | 基底 60% |
| 陶土棕 ink | `#4A3B32` | 主文字、線稿描邊（比純黑柔和） | 25% |
| 柔棕 ink-soft | `#8A7566` | 次要文字、說明 | — |
| 蜜桃橘 peach | `#F2A98C` | 主要品牌色、主按鈕、logo 底 | 8% |
| 陶紅 terra | `#E4785A` | 強調、hover 文字、重點數字 | 4% |
| 鼠尾草綠 sage | `#A9C5A0` | 次要點綴、正向狀態 | 2% |
| 奶油黃 butter | `#F6D06A` / 天藍 sky `#9EC7D6` | 分類色票、徽章輪替 | 點綴 |

**陰影色（關鍵）**：暗影 `rgba(120,86,64,.30)`（暖棕，不用純黑）、高光 `rgba(255,255,255,.85)`。所有立體感來自這兩色的搭配，不要用灰色陰影。

## 字體系統

- **來源**：Google Fonts。顯示／標題＝`Baloo 2`（圓潤、飽滿，700–800）；內文＝`Noto Sans TC`（400／500／700）。
- **字級 scale**：H1 `clamp(2rem,5.5vw,3.4rem)`、H2 `clamp(1.5rem,3.6vw,2rem)`、卡片標題 1.2–1.35rem、內文 1rem、標籤 .72–.8rem。
- **字重/行高**：標題 800、行高 1.02–1.1；內文 400–500、行高 1.75–1.8（留呼吸）。標籤用 Baloo 2 700 + `letter-spacing:.12–.22em` + 大寫。

## 版面與網格

- 容器 `max-width:900–1080px` 置中，左右 padding 22px。
- **不對稱**：首頁不置中大標，改 form-first 測驗卡佔主視覺；標題靠左、寬度限制在 12–15em 製造斷行節奏。
- 圓角尺度大：元件 24–40px、塢與大卡 32–40px。這是風格核心，放心用大圓角，但要一致（建立 `--round` 尺度階）。
- 卡片之間留 20–24px 間距，讓每塊黏土有「浮起」的空間；不要貼邊。
- 底部固定 `padding-bottom:120px` 給 bottom dock 留位。

## 元件配方

- **黏土面（.clay）**：`background:var(--dough);border-radius:32px;box-shadow:10px 10px 22px rgba(120,86,64,.30), -9px -9px 20px rgba(255,255,255,.85), inset 2px 2px 3px rgba(255,255,255,.4);`。元件與底色同色，純靠陰影分層。
- **內凹面（.clay-in）**：`box-shadow:inset 7px 7px 14px 暗影, inset -7px -7px 14px 高光;`。用於輸入框、進度槽、被選中的選項。
- **主按鈕（.pill）**：蜜桃橘底、白字、Baloo 2 700、圓角 22px、outset 陰影；`:hover` 上浮 `translateY(-3px)`；`:active` 切成 inset（壓下去）。
- **選項按鈕（.opt）**：dough 底、outset 陰影；`aria-pressed="true"` 或 `:active` 時切 inset 並把文字轉 terra。這個 outset↔inset 的切換就是本風格的招牌互動。
- **nav = 底部塢（.dock）**：`position:fixed;bottom:20px;left:50%;transform:translateX(-50%)`，黏土面，內含 3–4 顆原創 SVG 圖示；當前頁圖示用 inset 呈現「被按住」。
- **footer**：一整塊大黏土面，含品牌、地址電話、頁面連結；下方一行版權與「虛構示意」聲明。

## 動效規則

- **彈性回彈**：所有 hover 上浮與出場用 `cubic-bezier(.34,1.56,.64,1)`（帶 overshoot），duration .16–.5s，呼應黏土的 Q 彈。
- **按壓（signature）**：`:active` 時 outset→inset 陰影切換，`transform:translateY(0)`，模擬按進黏土。
- **路徑成形（signature）**：表單完成後結果區 `animation:rise .5s cubic-bezier(.34,1.56,.64,1)`（下方浮起＋輕微 scale），路徑 blob 依序插入、以陶土色連桿相接。
- **降級**：`@media(prefers-reduced-motion:reduce)` 關閉所有 transform/animation，hover 不位移，滾動改 `auto`。

## 插畫與圖像風格

- 全部原創 inline SVG。圖示走「圓頭線條 + 實心色塊」：`stroke-linecap:round`、線寬 2–2.4，或飽滿填色。
- 人物頭像用圓角方塊底 + 簡化五官（兩點眼、一弧嘴），避免寫實。
- 徽章／badge 用大圓角方塊配單色 SVG 圖示，色票在 peach／sage／butter／sky／terra 間輪替，維持暖色調。
- 禁止外部圖片與 emoji。所有「可愛」都由形狀與陰影承擔。

## Logo 與 Favicon

- **Logo**：一顆蜜桃橘圓角方塊內含麵團色黏土 blob（兩點眼、一弧笑嘴），套雙向 `feDropShadow`（暖棕暗影 + 白色高光）做出黏土浮起；右側 Baloo 2 中文站名 + 字距拉開的英文副名。
- **Favicon**：inline SVG data URI，同一顆黏土笑臉 blob，圓角方塊底，確保 16px 仍可辨識。

## Do & Don't

- ✅ 元件與底色同色，靠雙向陰影分層；暖棕暗影 + 白高光。
- ✅ 互動切 inset 製造按壓觸感；彈性 easing。
- ✅ 暖色系、圓潤字體、原創 SVG 圖示、嚴謹排版。
- ❌ 不用灰色／純黑陰影、不用單邊 drop-shadow（會變扁平卡片）。
- ❌ 不用紫藍冷色、不用置中大標＋三卡片模板、不用 emoji 當 icon。
- ❌ 不要圓角氾濫到資訊糊成一片；不要每塊卡片長得一樣、失去骨架。
- ❌ 不用跑馬燈——動效重點交給按壓與路徑成形。

## 頁面骨架範例

```html
<!-- 黏土面基本款 -->
<style>
:root{--dough:#F4E9DE;--ink:#4A3B32;--peach:#F2A98C;--terra:#E4785A;
 --hi:rgba(255,255,255,.85);--sh:rgba(120,86,64,.30);}
.clay{background:var(--dough);border-radius:32px;
 box-shadow:10px 10px 22px var(--sh),-9px -9px 20px var(--hi),inset 2px 2px 3px rgba(255,255,255,.4);}
.pill{background:var(--peach);color:#fff;border:none;border-radius:22px;padding:14px 28px;
 font-family:'Baloo 2';font-weight:700;cursor:pointer;
 box-shadow:7px 7px 15px var(--sh),-5px -5px 12px var(--hi);
 transition:transform .16s cubic-bezier(.34,1.56,.64,1);}
.pill:hover{transform:translateY(-3px);}
.pill:active{transform:translateY(0);box-shadow:inset 5px 5px 11px var(--sh),inset -5px -5px 11px var(--hi);}
</style>

<article class="clay" style="padding:26px">
  <h3 style="font-family:'Baloo 2';font-weight:700">一塊會回彈的黏土卡</h3>
  <p>元件與底色同色，靠雙向陰影浮起。</p>
  <button class="pill">按下去會凹</button>
</article>

<!-- 底部塢 nav -->
<nav class="clay" style="position:fixed;left:50%;bottom:20px;transform:translateX(-50%);display:flex;gap:8px;padding:10px;border-radius:28px">
  <a href="index.html">…</a><a href="courses.html">…</a><a href="about.html">…</a>
</nav>
```
