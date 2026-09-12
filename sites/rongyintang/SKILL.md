---
name: herbal-almanac
description: A warm, hand-crafted "herbal almanac" system for Traditional Chinese Medicine and natural/organic brands — rice-paper ground, ink-black type, herb-green and cinnabar-red seals, a letterpress almanac masthead, vertical Chinese typographic feel, and original copperplate stipple botanical engravings. Signature interaction is an interactive 24-solar-term herb dial.
---

# 本草曆 · Herbal Almanac

> 一套「把診所做成一本會呼吸的本草曆」的視覺語言。骨架不靠置中大 hero，而以**活版刊頭（masthead）**開場，讓節氣、藥草與四診當主角；宣紙米為底、松綠為體、朱砂紅印章點睛，識別性由**銅版點描本草插畫**與**二十四節氣藥草輪盤**承擔。適合中醫診所、漢方藥鋪、茶／草本保養、有機農產、老字號選物。

## 設計哲學

1. **本草曆為體**：整站是一份「逢節氣增補」的曆書。內容單位是節氣、藥草、四診，不是行銷區塊。頁面像翻閱一本手工年曆。
2. **刊頭開場，不用大 hero**：首屏是活版刊頭——字標、朱砂印、節氣 dateline、刊頭橫線。拒絕「置中大標＋副標＋兩顆按鈕」。
3. **順節氣調人身**：內容依二十四節氣進退（暑天清心、冬令進補）。互動與文案都圍繞「當令」。
4. **手工感與克制**：宣紙紋理、實線分隔、無圓角、無模糊陰影卡。朱砂紅只作印章與強調，極少量使用。
5. **一點一點畫出來**：插畫一律銅版點描，不描線稿——用墨點的疏密表現根身向背陰陽，這是識別的核心手藝。

## 色彩系統

| 色票 | Hex | 用途 | 建議比例 |
|---|---|---|---|
| 宣紙米 Paper | `#EFE7D3` | 全站背景（帶 4px 點狀紙紋） | 60% |
| 宣紙深 Paper-2 | `#E6DBC0` | 圖版底、區塊交錯 | 10% |
| 墨黑 Ink | `#211C17` | 主文字、點描墨點、粗刊頭線 | 14% |
| 墨褐 Ink-2 | `#5A4F3E` | 次要文字 | 5% |
| 松綠 Green | `#3B5B45` | 主強調：字標中醫、標籤、圖標、footer 底 | 6% |
| 松綠深 Green-d | `#2C4635` | footer 底、hover | — |
| 朱砂紅 Seal | `#B23A26` | 印章、強調、指針、當令標——**極少量** | 3% |
| 陳皮赭 Amber | `#8A5A2B` | 拉丁學名、杵、次要點綴 | 2% |
| 線 Line | `#CDBF9E` | 1px 分格線、圖版邊框 | — |

**禁止**：純白 `#FFFFFF` 背景（改用宣紙米）、紫藍漸層、飽和螢光色、朱砂紅大面積鋪底。

## 字體系統

- **字標／標題／藥草名／節氣**：`Noto Serif TC`（700/900），`letter-spacing:.06–.14em`。字標最大 `clamp(2.6rem,8.4vw,5rem)`。
- **內文**：`Noto Sans TC`（400/500），`line-height:1.85`。段寬最大 46–52ch。
- **拉丁 dateline／標籤／學名**：`Spectral`（400/500，含 italic），大寫時 `letter-spacing:.22–.34em`。
- 字級 scale：字標 `clamp(2.6rem,8.4vw,5rem)`／H2 `clamp(1.6rem,3.6vw,2.5rem)`／H3 `1.05–1.5rem`／body `16px`／kicker `.72–.76rem`。
- 印章與 footer 標可用 `writing-mode:vertical-rl` 做垂直漢字。

## 版面與網格

- **置中版心**：`.wrap{max-width:1120px;margin:0 auto;padding:0 clamp(14px,3.4vw,40px)}`。
- **刊頭 masthead**：`runhead`（跑馬標題線）→ `mastmain`（字標＋朱砂印，`grid 1fr auto` 不對稱）→ `folio`（版次線）→ `mastnav`（ruled bar）。上下以 `3px double` / `2px solid` 墨線收邊。
- 區塊以 `1px solid var(--line)` 實線分隔，**無圓角、無陰影卡**。多欄用 `grid` + 內部 `1px` 分隔線做出「表格／曆格感」。
- 不對稱：文字欄偏左、圖版偏右；輪盤置左、當令說明置右。
- section padding `clamp(34px,6vw,74px)`。

## 元件配方

- **masthead nav**：`display:flex;flex-wrap:wrap`，上下 `2px solid ink`；每項 `Noto Serif TC` 700 + 底下 `Spectral` italic 英文小字；項間 `1px` 右分隔線；`aria-current` 者朱砂紅字＋底部 2px 朱砂底線。手機自動 wrap、縮字距。
- **按鈕（輪盤控制）**：宣紙底 `1.5px solid ink` 無圓角；hover 反白為松綠實心。「歸當令」鈕用朱砂邊框，hover 朱砂實心。
- **卡片＝圖版 plate**：宣紙深底 + `1px line` 邊框 + 右上 `PLATE I` 版號，**非圓角陰影卡**。含點描 SVG、藥草名＋學名、性味／功效列、分類標。
- **印章 seal**：`writing-mode:vertical-rl` 的朱砂方框，`transform:rotate(3deg)`，內用 `inset box-shadow` 做雙框描邊。
- **表單／資訊條 strip**：`grid` 三欄 + `1px` 分隔；每格 `Spectral` 大寫小標（朱砂）+ `Noto Serif TC` 值 + 灰階說明。
- **footer**：松綠深底、`#EAD9B6` 標題、三欄；含垂直朱砂小印；底線放虛構聲明與 `Spectral` 城市標。

## 動效規則

| 動效 | 觸發 | duration / easing |
|---|---|---|
| 水墨顯影 reveal（opacity 0→1、translateY 16px→0、blur 7px→0） | 進入視窗（IntersectionObserver, threshold .12–.18，once） | `.95s ease / cubic-bezier(.2,.8,.2,1)` |
| 節氣輪盤旋轉（指針落當令） | 點擊節氣／前後鈕／歸當令 | `transform:rotate()`，`.9s cubic-bezier(.2,.8,.2,1)` |
| 點描插畫生成 | 載入（種子亂數，非動畫） | 無 transition；確定性輸出 |

全部包在 `@media(prefers-reduced-motion:reduce)`：關閉 animation 與 transition，`.reveal` 直接顯示最終狀態，輪盤仍可切換但不做旋轉補間。

## 插畫與圖像風格（stippling 點描）

- **技法**：銅版點描。每味藥＝一段**原創 inline SVG 剪影 path**（可含多個子路徑：根身、鬚根、葉、切片），**不用線描勾邊**。
- **生成**：以 `mulberry32(seed)` 種子亂數在 bounding box 內灑點，經 `clipPath` 裁到剪影內；每點以「方向漸層（右下漸暗）＋數條 dark-zone 圓（模擬形體受光）」決定落點機率 → 疏密造出調子。半徑 `0.6–1.1`，墨點為 `#211C17`。確定性、可重現，像真正的雕版。
- 剪影另描一圈 `1.1px` 墨線收邊、內填 `rgba(59,91,69,.07)` 極淡綠。
- 圖標（四診、理念）為手繪 inline SVG 幾何線條，松綠為主、朱砂點睛，**不得用 emoji**。
- 每味藥固定一組 seed，換頁重繪結果一致。

## Logo 與 Favicon 設計指南

- **Logo**（`assets/logo.svg`）：朱砂印框內置松綠**缽（mortar）＋陳皮赭杵（pestle）＋一片榕葉**，缽內灑少量米色點呼應點描；右接 `Noto Serif TC` 900 字標「榕蔭堂／中醫 · 本草曆」與 `Spectral` 英文行。
- **Favicon**：宣紙米底方塊 + 松綠缽 + 赭色杵 + 榕葉，inline SVG data URI 寫在每頁 `<head>`，顏色 `#` 以 `%23` 編碼。

## Do & Don't

**Do**：刊頭開場、masthead ruled nav、宣紙米底、松綠為體朱砂點睛、實線分格無圓角、原創點描本草、節氣輪盤互動、水墨顯影、垂直漢字印章、tabular 對齊、`prefers-reduced-motion` fallback、`≤560px` 可用。

**Don't**：❌ 紫藍漸層 hero ❌ 置中大標＋副標＋兩顆按鈕＋三張圓角卡片 ❌ emoji 當 icon ❌ 線描/thin line-art 插畫（必須點描）❌ 模糊陰影 rounded-2xl 卡 ❌ 純白背景 ❌ 朱砂大面積鋪底 ❌ Lorem ipsum ❌ AI 腔文案（「在當今快節奏的世界」之類）❌ 無個性系統字體。

## 頁面骨架範例

```html
<header class="mast"><div class="wrap">
  <div class="runhead"><span class="seal-word">本草曆 · ALMANAC</span><span>第一一五卷 · 夏令號</span></div>
  <div class="mastmain">
    <div>
      <p class="dateline">民國一一五年 · 小暑 · 迪化街</p>
      <h1 class="wordmark">榕蔭堂<span class="med">中醫</span></h1>
      <p class="latinsub">RONGYINTANG · HERBAL ALMANAC</p>
    </div>
    <div class="seal">榕蔭記</div>
  </div>
  <div class="folio"><span>NO.115</span><span>本草・節氣・診療</span></div>
  <nav class="mastnav">
    <a aria-current="page">本草曆<span class="en">Almanac</span></a>
    <a>診所與醫師<span class="en">The Clinic</span></a>
    <a>藥草圖鑑<span class="en">Herbarium</span></a>
  </nav>
</div></header>

<section class="wheelsec"><div class="wrap">
  <p class="kick">Signature · 二十四節氣藥草輪盤</p>
  <div class="wheelgrid">
    <div class="dial"><svg id="dialsvg" viewBox="0 0 480 480">
      <g id="ring"><!-- 24 個 <g class="term" transform="rotate(i*15 240 240)"> --></g>
      <g id="hub">…當令中心…</g><g id="pointer">…朱砂指針…</g>
    </svg></div>
    <div class="herbcard reveal">…當令藥草名／性味／功效＋<svg id="cardHerb">點描</svg>…</div>
  </div>
</div></section>

<footer><div class="wrap">…松綠底三欄＋虛構聲明…</div></footer>
```

配色、字體、留白與點描配方照上表即可產出風格一致的全新網站——換產業（漢方藥鋪、草本保養、有機農產）只需替換文案、藥草剪影與 dateline，骨架與手藝不動。
