---
name: y2k-cram
description: A Y2K "millennium candy" cram-school system in bright grey, electric cyan, hot pink and lemon yellow — opens as a CD-ROM course catalog wall, navigates from a fixed bottom OS-style dock, and uses BBS ASCII art (kaomoji, ASCII mascot, ASCII honor board) as its signature illustration language. Neon marquee sign, live exam countdown, count-up counters and CRT-scanline card hovers complete the nostalgic early-2000s Taiwanese "補習街" mood.
---

# Y2K 千禧補習 · Y2K Cram

> 一套「千囍年、補習街、螢光招牌」的視覺語言。開場不用大 hero，而是把班別排成一整面**課程光碟目錄牆（catalog-first）**；導覽收在**底部工具列 dock**；識別性由 **ASCII 字符畫**（顏文字、吉祥物、字符畫金榜）承擔。糖果色平塗＋鉻金屬斜角，明亮、俏皮、帶點 kitsch 卻是刻意經營，不是隨手 AI 味。適合補習班、才藝班、電玩／次文化、復古潮牌。

## 設計哲學

1. **目錄即開場**：使用者要的是「有哪些班」。首頁第一屏直接鋪成光碟目錄選課牆，一片＝一班，介面本身就是課程表，不用大標＋副標＋兩顆按鈕暖場。
2. **懷舊但克制**：Y2K 的螢光、鉻金屬、CD 反光、BBS 顏文字都用，但只挑「對的一種」放到位——例如跑馬招牌全站只出現一次。
3. **字符畫當插畫**：不畫線稿 SVG，改用 monospace `<pre>` 的 ASCII／顏文字當主要圖像。吉祥物、金榜、分隔線都是字元排出來的。
4. **糖果平塗＋硬邊**：色塊平塗、2px 墨線、實心投影（`box-shadow:4px 4px 0`），不用模糊陰影、不用大圓角。

## 色彩系統

| 色票 | Hex | 用途 | 建議比例 |
|---|---|---|---|
| 亮灰底 BG | `#E8ECF0` | 全站背景（含 28px 網格底紋） | 56% |
| 亮灰深 BG-2 | `#DBE1E9` | 網格線、表頭、次級底 | 10% |
| 墨 Ink | `#16181D` | 主文字、邊框、終端／dock 底 | 16% |
| 墨灰 Ink-2 | `#4A505C` | 次要文字、mono 標籤 | 6% |
| 電光青 Cyan | `#00C2CB` | 強調一：CD 環、dock 當頁、青色 tag、霓虹字 | 5% |
| 桃紅 Pink | `#FF4FA3` | 強調二：連結、學測 tag、投影、霓虹字 | 4% |
| 檸黃 Yellow | `#FFE14D` | 強調三：badge、hover 底、footer 標題、閃爍字 | 3% |
| 鉻銀 Chrome | `#F5F7FA→#C6CEDA→#8A93A0` | 斜角金屬（dock 按鈕、bevel、logo 字） | — |

**禁止**：純白 `#FFFFFF` 大面積背景（改亮灰 `#E8ECF0`）、紫藍漸層 hero、飽和度失控的彩虹漸層。三個強調色永遠平塗成色塊，不混成漸層背景。

## 字體系統

- **霓虹招牌／大標／dock 品牌**：`Bungee`（單一字重），配 `text-shadow` 做位移色影（如 `3px 3px 0 cyan, 6px 6px 0 pink`）。
- **ASCII 字符畫／數字／標籤／終端**：`Share Tech Mono`，數字一律 `font-variant-numeric:tabular-nums`（倒數、學費、榜單對齊）。
- **中文內文**：`Noto Sans TC`（400/500/700/900），標題用 900。
- 字級 scale：hero `clamp(30px,6vw,58px)`／H1 頁標 `clamp(28px,5.4vw,50px)`／卡片標 17–20px／body 14–15px／mono 標籤 11–13px。
- 載入用 preconnect + `css2?family=Bungee&family=Share+Tech+Mono&family=Noto+Sans+TC`。

## 版面與網格

- **無側欄、無頂 nav**：導覽全交給固定底部 dock，因此 `body{padding-bottom:78px}`（手機 66px）預留空間。
- 內容置中 `max-width:1120px`，背景鋪 28px `linear-gradient` 網格底紋當千囍年桌面感。
- 目錄牆用 `display:grid;grid-template-columns:repeat(4,1fr);gap:14px`，≤860px 轉 2 欄、≤560px 維持 2 欄不塌。
- **不對稱**：masthead 左「品牌 bevel 盒」右「ASCII 終端機」為 1.05fr/0.95fr；meters 列為 1.3fr/1fr（倒數大、數據小）。
- 硬邊卡片：`border:2px solid ink` + `box-shadow:4px 4px 0 ink`，hover 位移並把投影換成桃紅。

## 元件配方

- **dock 按鈕**：`position:fixed;bottom:0` 鉻銀漸層工具列，左側 `.start` 品牌鈕、中間 `nav` 一排直式（icon 疊 label）、右側 `.tray` 即時時鐘。每顆 `linear-gradient(#fff,ch2)` + 內陰影斜角（`inset -2px -2px ch3, inset 2px 2px #fff`）；hover 變檸黃；`[aria-current=page]` 變電光青並反轉內陰影（按下感）。圖示一律**手繪 inline SVG line icon**（格子＝目錄、書＋標籤＝費用、學士帽＝榜單），絕不用 emoji。
- **課程光碟卡（disc）**：白底硬邊卡，頂列 `DISC 0X` 編號＋科別 tag，中間手繪 CD 圓盤 SVG，標題＋名師，底部虛線分隔的價格＋「讀取 ▸」。hover：卡片位移＋桃紅投影＋`::after` 疊 `repeating-linear-gradient` **CRT 掃描線**並緩慢捲動。
- **卡片 / 表格**：學費表 `table` 用 `tabular-nums` 右對齊金額，表頭 mono 大寫、caption 墨底黃字，hover 列淡黃底。金榜用墨底「終端機」框：ASCII 藝術字標頭＋顏文字欄＋姓名欄＋校系欄。
- **表單／CTA**：`.cta` 用 Bungee 桃紅實心鈕、白邊、無圓角；badge 用檸黃旋轉貼紙（`transform:rotate(6deg)` + 硬投影）。
- **footer**：墨底三欄，Bungee 檸黃小標、mono 灰字內文，底線分隔版權與城市標，含「皆為虛構示意」聲明。

## 動效規則

| 動效 | 觸發 | duration / easing |
|---|---|---|
| 螢光跑馬招牌捲動（**全站唯一一條**） | 常駐 | `marq 24s linear infinite`，`translateX(0→-50%)`（內容複製兩份無縫） |
| 招牌黃字霓虹閃爍 | 常駐 | `flick 2.6s steps(1) infinite` |
| ASCII 吉祥物逐字打字 | 載入 | 每字 `setTimeout 55ms`，尾隨 `.cur` 游標 `blink 1s steps(1)` |
| 學測倒數計時器 | 載入後 | `setInterval 1000ms`，天/時/分/秒即時跳動 |
| 報名／上榜 count-up | 進入視窗（IntersectionObserver, threshold .4） | `requestAnimationFrame`，`dur 1400ms`，ease-out cubic |
| dock 時鐘 | 載入後 | `setInterval 1000ms` |
| 課程卡 CRT 掃描線 | hover | `crt 1.1s linear infinite` + `.16s` 位移 |

全部包在 `@media(prefers-reduced-motion:reduce)`：關閉所有 animation；跑馬招牌定在 `translateX(0)`、打字直接顯示整句、倒數與 count-up 顯示最終值、游標常亮。

## 插畫與圖像風格（ascii-art 字符畫）

- 主要圖像語言＝ BBS／monospace **ASCII 藝術與顏文字**，用 `<pre>`（或 SVG `<text>`）呈現，`aria-hidden="true"` 讓螢幕報讀略過。
- 三種招牌用法：① **ASCII 吉祥物**「囍寶」（方框臉的 CD 生物）②**字符畫金榜**（block-letter「GHIMRB → 金榜題名」標頭＋顏文字上榜列）③**ASCII 分隔線**（`==== [ 區塊名 ] ==== ◆`）與教室平面字符圖。
- 顏文字（`\(^o^)/`、`(๑•̀ㅂ•́)و`、`ε=┌(;･_･)┘`）當「表情反應」點綴，**只當藝術、不當 UI 圖示**；UI 圖示一律手繪 SVG。
- CD 圓盤、logo 為原創 inline SVG，鉻金屬用多段 `linearGradient` 平帶，霓虹用 `stroke` 電光青／桃紅／檸黃。

## Logo 與 Favicon 設計指南

- **Logo**（`assets/logo.svg`）：左 CD-ROM 圓盤（墨底＋青／粉／黃霓虹環＋中孔），中「千囍」桃紅色塊字，右 `CRAM2K` 鉻金屬漸層 Bungee 字標＋墨色描邊。
- **Favicon**：亮灰 `#E8ECF0` 方底＋電光青 CD 圓＋亮灰中孔＋桃紅弧線＋檸黃小方塊，inline SVG data URI 寫進每頁 `<head>`（`#` 一律編碼成 `%23`）。

## Do & Don't

**Do**：目錄／班別牆當開場、底部 dock 導覽、ASCII 字符畫當插畫、糖果色平塗＋2px 硬邊＋實心投影、鉻金屬斜角、tabular 數字對齊、跑馬招牌只放一條、手繪 SVG 圖示。

**Don't**：❌ 紫藍漸層 hero ❌ 置中大標＋副標＋兩顆按鈕＋三張圓角卡 ❌ emoji 當 UI icon（顏文字只能當 ASCII 藝術）❌ rounded-2xl 模糊陰影卡 ❌ 純白大背景 ❌ 多條 marquee 滿場飛 ❌ 線稿 SVG 當主插畫 ❌ Lorem ipsum 或 AI 腔文案。

## 頁面骨架範例

```html
<!-- 1. 全站唯一一條螢光跑馬招牌（僅首頁） -->
<div class="signrail"><div class="marq">…內容×2 無縫…</div></div>

<div class="wrap">
  <!-- 2. 不對稱 masthead：品牌 bevel 盒 + ASCII 終端吉祥物 -->
  <header class="mast">
    <div class="brandbox bevel"><h1>千囍 CRAM2K</h1>…</div>
    <div class="term"><pre>…ASCII 吉祥物…</pre><div class="say" id="say"></div></div>
  </header>

  <!-- 3. 倒數計時 + count-up 數據 -->
  <div class="meters">
    <div class="cd"><div class="clocks" id="clocks">…天時分秒…</div></div>
    <div class="stats" id="stats"><b data-n="512">0</b>…</div>
  </div>

  <!-- 4. catalog-first：課程光碟目錄牆 -->
  <div class="wall">
    <a class="disc" href="courses.html#id">
      <svg class="cd">…CD 圓盤…</svg><h3>班別</h3><span class="price">$…</span>
    </a>
  </div>
</div>

<!-- 5. 固定底部 dock（三頁一致，手繪 SVG 圖示） -->
<div class="dock">
  <span class="start"><svg>…</svg><b>CRAM2K</b></span>
  <nav><a aria-current="page"><svg>…</svg><span>課程目錄</span></a>…</nav>
  <span class="tray" id="tray">--:--:--</span>
</div>
<footer>…墨底三欄 + 皆為虛構示意…</footer>
```

照上表配色、字體、字符畫規則即可產出風格一致的全新網站——換產業（才藝班、電玩店、復古潮牌）只需替換文案、目錄內容與 ASCII 吉祥物，catalog-first + bottom-dock + ascii-art 三根骨架不動。
