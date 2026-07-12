---
name: negative-space-minimal
description: Negative-space minimalism — vast intentional whitespace, hairline rules, a near-monochrome paper-grey palette with one slate accent, light sans + thin serif contrast, chapter-scroll openings and anchor-index navigation, and a single slow breathing motion signature.
---

# 極簡留白（Negative-Space Minimalism）

> 本 SKILL 定義一整套視覺語言。任何 AI 只要讀完，就能替**任意產業**做出風格一致的網站——風格不綁定「瑜伽」這個題材。余白 YOHAKU 只是它的一次示範。你可以拿它做美術館、選物店、建築師事務所、香氛、陶藝、書店或任何講究「空」與「靜」的品牌。
>
> 與「和風極簡（wafū）」的區別：wafū 走直書明朝、大地色與印章朱紅、円相手繪的日式路線；本風格走**西方畫廊式的近單色留白**——冷調的紙灰、幾何細線、輕量拉丁無襯線，沒有東方符號，更接近瑞士後現代與當代美術館的白盒子。

---

## 一、設計哲學

留白（negative space）不是「還沒填滿的地方」，而是主動的、被設計出來的元素。這套風格的核心信念：

- **空即內容**：畫面上的空白承載節奏與呼吸，讓視線有停頓、讓每個元素被看見。寧可一屏只放一句話。
- **少即是多，但少要精準**：極簡不是隨便留白，而是每個字級、每條線、每段間距都被刻意決定。錯位一格就會顯得空洞而非從容。
- **安靜勝過吸引**：不用高飽和、不用彈跳、不用「立即行動」的急迫感。目標是讓人放慢，而不是被抓住。

視覺策略：**空、細、淡、慢**。大留白、細線條、低對比色、慢動作。**不要**塞滿版面、不要卡片牆、不要粗重陰影、不要高飽和撞色——那些都與「空」相斥。

## 二、色彩系統

近乎單色。一種暖紙灰鋪滿全站，一種墨色落字，一種中性灰做次要資訊，一種石板藍作為**唯一**冷調點綴。

| 色票 | Hex | 用途 | 比例 |
| --- | --- | --- | --- |
| 紙灰 paper | `#F7F5F0` | 全站背景（暖白帶灰，**絕不用純白 #FFF**） | ~78% |
| 墨 ink | `#1A1A1A` | 主標題、主文字、主要線條（**不用純黑 #000**） | ~12% |
| 灰 grey | `#9B9890` | 次要說明、標籤、footer 文字、時間資訊 | ~5% |
| 淡底 pale | `#EEEBE3` | 極少數區塊淡色底、地板陰影 | ~3% |
| 石板藍 slate | `#566B78` | **唯一彩色**：編號、圓環、hover 焦點、路線標記（用量 <2%） | <2% |
| 髮絲線 hairline | `#DEDAD1` | 所有 1px 分隔線與格線 | 線條用 |

規則：整站只在「紙灰／墨／灰」三階間運作，石板藍是唯一的一點顏色，一屏最多出現一兩處。**嚴禁任何漸層**（尤其紫藍漸層）。區塊之間永遠用 1px 髮絲線分隔，**絕不用陰影分層**。

## 三、字體系統

兩款 Google Fonts，靠「輕量無襯線」與「極細襯線」的疏密與粗細對比撐起個性——不是靠顏色。

- **Jost**（`wght 300/400/500`）：拉丁無襯線，幾何、輕、帶一點 Futura 的圓。擔任品牌字、標籤、編號、機能性小字。中文 fallback：`Noto Sans TC`。
- **Noto Serif TC**（`wght 200/300/400`）：擔任所有大標題與情感性文案，**一律用 200–300 極細字重**，大字級配細筆畫是本風格的靈魂。

字級 scale（clamp 流體）：
- 章節大標 `clamp(38px,7vw,84px)`、serif 200、`line-height:1.28`、`letter-spacing:.02em`。
- 內頁 H1 `clamp(34px,6vw,72px)`、serif 200。
- 區塊 H2 `clamp(30px,5vw,58px)`、serif 200。
- 內文 `16px`、Jost 300、`line-height:1.85`、`letter-spacing:.02em`、`max-width:34em`。
- 標籤／編號 `11–12px`、Jost 400、`letter-spacing:.28–.4em`、常大寫。**寬字距是重要 tell**。

行高刻意偏大（內文 1.85），字距刻意偏寬，讓文字自帶空氣。

## 四、版面與網格

- **章節卷軸（chapter-scroll）開場**：首頁**不要 hero 大標**。改成一連串「章節」，每章 `min-height: ~92vh`、`flex` 垂直置中，只放一個編號、一句大標、一段短文。使用者是一屏一屏地「翻」過，而不是被一張首圖轟炸。
- **編號系統**：每章、每個區塊都有 `00 / 01 / 02` 的兩位數編號（Jost 400、石板藍、寬字距），是結構感的來源。
- **極大留白**：容器 `max-width:1080px` 但內容常只佔一半寬；段落 `max-width:34em` 強制不要拉太長。區塊間距 `80–100px` 起跳。
- **不對稱**：內容靠左或偏一側，右邊大片留空；圖文欄用 `1.1fr / .9fr` 這種微不對稱比例，避免死板對半。
- **細線分區**：所有分隔、表格、列表用 `1px solid #DEDAD1`。列表 row hover 時 `padding-left` 微微增加（12–14px）作為極克制的互動回饋。
- 旋轉：本風格**不旋轉元素**，一切保持正交與安靜。

## 五、元件配方

- **nav（anchor-index 錨點索引）**：固定頂欄，半透明紙灰底 + `backdrop-filter:blur(6px)` + 底部 1px 髮絲線。導覽項目每個都帶一個小編號（`00 呼吸`／`01 教室`），捲動時對應章節的項目變成墨色 `.on`（其餘為灰）。手機收成細線漢堡按鈕（三條 1px 線），展開為全寬清單。
- **按鈕／連結**：**不要實心按鈕**。用「文字 + 底線 + 箭頭」的 text-link：`border-bottom:1px solid ink; letter-spacing:.28em`，hover 時箭頭與文字的 `gap` 從 12px 拉開到 22px。
- **卡片**：盡量不用卡片。需要並列時用「無框、只靠髮絲線與留白分隔」的欄位（如價目 grid：格與格之間 1px 線，無圓角無陰影）。
- **表單／表格**：邊框 `1px #DEDAD1`，表頭用寬字距小灰字，有課的格淡底 `#EEEBE3`、空格用 `—`。手機外層包 `overflow-x:auto` 橫向捲動，不擠壓。
- **footer**：頂部 1px 線，三欄（品牌敘述／頁面連結／造訪資訊），最底一條 base 線放版權與「虛構示意」聲明。全用灰字小字。

## 六、動效規則

克制到幾乎察覺不到，但每一個都柔。

- **呼吸節拍圓環（signature）**：一個 SVG 同心圓，內圈 `transform:scale()` 在 `0.42 → 1 → 0.42` 之間以 `10s ease-in-out infinite` 緩慢張縮，中央文字隨節拍切換「吸（0s）→ 停（4s）→ 吐（5.5s）」。這是全站唯一的持續動畫，象徵呼吸。`prefers-reduced-motion` 時圓環停在中間尺寸、文字顯示「息／以你自己的節奏呼吸」。
- **進場淡入（reveal）**：元素 `opacity:0; translateY(20px)`，`IntersectionObserver` 進視窗後過 `1.0–1.1s ease` 淡入上移。`threshold` 約 `.14–.16`。
- **hover**：只有兩種——text-link 的箭頭拉開、列表 row 的 `padding-left` 微增。`transition` 一律 `.4–.5s`，慢。
- 全站 `transition` 偏慢（0.4s 以上），`ease` 或 `ease-in-out`，**禁止**彈跳（`cubic-bezier` 過衝）、旋轉、位移撞擊等急促動作。
- reduced-motion：關閉所有 reveal 與 `scroll-behavior:smooth`，圓環靜止。

## 七、插畫與圖像風格

- 全部 **1px 線稿**，用墨色或髮絲灰，無填色或極淡填色（`#EEEBE3` 16% 透明度）。
- 母題：同心圓／單線圓環（呼吸、留白的象徵）、極簡空間平面線稿、幾何路線圖（正交格線 + 一個石板藍節點）、人物用最簡的頭肩剪影（一個圓 + 一條肩線）。
- **絕不用**照片、實心插畫、漸層、陰影、emoji。留白本身就是主要的「圖」。

## 八、Logo 與 Favicon 設計指南

- **Logo**：左側一個 1px 描邊的同心圓（外圈墨、圓心石板藍實心點），右側品牌字——中文 serif 400 寬字距（`letter-spacing:8`）疊一行拉丁 Jost 400 寬字距小字。整體黑白 + 一點石板藍。
- **Favicon**：inline SVG data URI，紙灰底方塊 + 一個墨色細圓環 + 石板藍圓心點。與 Logo 母題一致。用 `href="data:image/svg+xml,..."` 寫在 `<head>`，顏色用 `%23` 轉義。

## 九、Do & Don't

**Do**
- 一屏一句話，敢於留下大片空白。
- 大字級一律配極細字重（serif 200–300）。
- 用編號（00/01/02）建立結構節奏。
- 只用一種點綴色（石板藍），且用量 <2%。
- 分隔一律 1px 髮絲線，間距慷慨。

**Don't（含去AI化禁令）**
- 禁紫藍漸層 hero、禁任何漸層。
- 禁「置中大標＋副標＋兩顆實心按鈕＋三張圓角卡片」模板——本風格根本不用實心按鈕與圓角卡片。
- 禁 emoji 當 icon（一律 1px SVG 線稿）。
- 禁圓角（`border-radius` 僅用於同心圓／頭像剪影，區塊一律直角）與模糊陰影。
- 禁純白 `#FFF` 與純黑 `#000`；禁高飽和撞色。
- 禁 Lorem ipsum 與 AI 腔（「在當今快節奏的世界」）；文案要具體、安靜、有品牌人格。
- 禁把版面塞滿——擁擠會立刻摧毀這個風格。

## 十、頁面骨架範例（可直接使用）

```html
<!-- 章節卷軸開場（首頁不要 hero） -->
<section class="chapter" id="c01">
  <div class="wrap">
    <div class="cnum">01 — 主張 / BELIEF</div>
    <h1>留白，<br>不是還沒填滿，<br>是刻意留下的空。</h1>
    <p class="lede">一段具體、安靜、不超過三行的短文，max-width 34em。</p>
    <a class="link" href="next.html">下一章 <span>→</span></a>
  </div>
</section>

<style>
.chapter{min-height:92vh;display:flex;flex-direction:column;justify-content:center;padding:80px 0}
.cnum{font:400 12px/1 'Jost';letter-spacing:.4em;color:#566B78;margin-bottom:34px}
h1{font:200 clamp(38px,7vw,84px)/1.28 'Noto Serif TC',serif;letter-spacing:.02em;max-width:14em}
.lede{max-width:34em;margin-top:38px;color:#3a3a36;font:300 16px/1.85 'Jost'}
.link{display:inline-flex;gap:12px;font:400 12px 'Jost';letter-spacing:.28em;
      border-bottom:1px solid #1A1A1A;padding-bottom:5px;transition:gap .4s}
.link:hover{gap:22px}
</style>

<!-- 呼吸圓環（動效簽名） -->
<div class="ring-wrap">
  <svg viewBox="0 0 200 200">
    <circle cx="100" cy="100" r="94" fill="none" stroke="#DEDAD1"/>
    <circle class="core" cx="100" cy="100" r="70" fill="none" stroke="#566B78" stroke-width="1.4"/>
    <circle cx="100" cy="100" r="2.4" fill="#566B78"/>
  </svg>
  <div class="b-label">吸</div>
</div>
<style>
.core{transform-origin:center;animation:breathe 10s ease-in-out infinite}
@keyframes breathe{0%{transform:scale(.42);opacity:.55}40%,55%{transform:scale(1);opacity:1}100%{transform:scale(.42);opacity:.55}}
@media(prefers-reduced-motion:reduce){.core{animation:none;transform:scale(.82)}}
</style>
```
