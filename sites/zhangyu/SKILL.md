---
name: handshape-chart
description: A 1970s Taiwanese educational wall-chart style where every image is drawn by one articulated hand-skeleton engine on a petrol-teal ground, with coral hands as the sole subject and query-by-gesture as the core interaction.
---

# 手勢掛圖／掌形骨架風 Handshape-Chart

## 設計哲學

這是一套「教育掛圖」的視覺語言，長自一個單一信念：**手是本站唯一的主角，而手不用被拍、被畫，可以被算出來。** 全站每一張圖——標誌、favicon、詞條縮圖、指拼字母、章節圖示、報名手印——都由同一具手部關節骨架引擎，依「手形／掌向／張開」等參數即時前向運動學求解成粗圓描邊的 SVG。因此本風格的第一守則是：**不要引入任何一張與手無關的裝飾插圖**；需要圖的地方，就放一隻擺出對應手形的手。

第二守則是**把抽象語言拆成可量的要素**：手形（Handshape）、位置（Location）、動作（Movement）、掌向（Orientation）。介面、檢索、文案都圍繞這四要素組織，像替語音標音一樣替手語「標形」。這讓網站從「好看的海報」變成「能查、能比、能打出來」的工具。

氣質是 1970 年代台灣啟聰教育掛圖：錆青（petrol）的黑板色底、骨白的紙牌面板、珊瑚朱的重點手、粗黑描邊、Space Mono 打出的編碼標籤。溫柔但不甜膩，職人但不冷硬。

## 色彩系統

單一「錆青×珊瑚朱」中間調配置，禁止米白紙感當大面積底。

| 色票 | Hex | 用途 | 比例 |
|---|---|---|---|
| 錆青 Petrol | `#2E6B68` | 頁面大面積地色 | ~46% |
| 錆青深 | `#245451` | 舞台／面板暗塊、footer | 面板 |
| 錆青亮 | `#3C807C` | 分隔、次級線 | <3% |
| 骨白 Cream | `#EDE4CF` | 卡片／面板／紙牌面 | ~26% |
| 骨白深 | `#E1D4B7` | 面板變體、hover | 次級 |
| 墨 Ink | `#16201E` | 文字、3px 描邊、手骨架外輪 | — |
| 珊瑚朱 Coral | `#E4583C` | **作用色**：手的皮膚、現用態、動作箭頭、主按鈕 | ~9% |
| 珊瑚朱深 | `#C8452F` | 編碼數字、hover 文字 | <2% |
| 土金 Gold | `#C89B4A` | 要素標籤、刻度虛線、eyebrow | <4% |
| 淺青 Teal | `#7FB3AD` | 次級文字、tag 英標 | 次級 |

**分工不可對調**：手的皮膚恆珊瑚朱、描邊恆墨、要素標籤恆土金、次級文字恆淺青。狀態變化（現用／焦點）優先靠珊瑚朱與位移，而非新增色相。

## 字體系統

- **標題／內文**：Noto Sans TC。標題 900、副標 700、內文 400／500，行高 1.08（標題）／1.65（內文）。標題字級 `clamp(28px,4.6vw,54px)`。
- **編碼／標籤／英標**：Space Mono 400／700。用於 kicker、要素標、手形碼（`ZY-B-胸-弧`）、留位號（`SY-YYMMDD-NNN`）、統計數字。字距 `.2em–.32em`、常大寫。
- 不使用襯線體；掛圖語言要的是清晰的無襯線＋等寬編碼的對照感。中文與 Latin 混排時，Latin 標籤一律走 Space Mono 小字大寫。

## 版面與網格

- 最大寬 1120px、左右 padding 22px。**不對稱**：首屏採「窄舞台＋寬控制面板」（`0.9fr 1.1fr`）或左文右資訊（`1.2fr .8fr`），避免置中對稱。
- 刊頭是一條 brand bar（標誌＋所名＋右側 mono 地址），底下一條 3px 墨色實線 `.rule`。**不設大標 hero**：首屏即可操作的手骨架工作台（handshape-first）。
- 側邊放一條 `writing-mode:vertical-rl` 的 mono 走馬標語（`HANDSHAPE · LOCATION · MOVEMENT · ORIENTATION`）作視覺錨。
- 邊框一律 2–3px 實線墨色、**零圓角**（除標誌方章 rx:10）、**不用模糊陰影**；深度靠實色邊框與色塊堆疊，手圖可加一道硬質 `drop-shadow(0 6px 0 rgba(0,0,0,.18))`（節制使用，非簽名）。
- 留白中等密度：資訊成塊、塊與塊之間 40px section padding。

## 元件配方

**手骨架引擎（核心，務必實作）**：viewBox `0 0 200 250`，右手掌朝觀者、腕在下。四指沿「指節線」排列，各有 knuckle 座標、外展 fan 角、三節長度與筆寬；拇指另有基座與對掌角。
```
u(deg) = [sin, -cos]                       // 0°=向上
finger: d=fan; for MCP,PIP,DIP: d += curl*[80,105,60]; 累加點
        curl∈[0,1]，0=伸直、1=握入掌心
thumb : base=-58+opp*95; d += curl*[55,70]
spread: fan *= (0.4 + spread*1.1)
```
每指、拇指皆以**兩層 round-cap 描線**繪製：先墨色（筆寬+5）作外輪、再珊瑚朱（筆寬）作皮膚。掌與腕為填色圓角多邊形＋墨色描邊。十二個基本手形存成 `{curl:[拇,食,中,名,小], opp, spread}` 預設（平掌B／五指張5／握拳A／指一1／並二V／三指W／勾指X／圓形O／夾持C／角尺L／豎拇／愛Y）。

- **nav（handsign-dock 手形底座導覽）**：固定底部墨色條、上緣 3px 珊瑚朱線；四頁各為一隻擺出不同手形的手＋中文頁名＋mono 英標；現用頁 `aria-current=page` 翻珊瑚朱。行動版隱英標、縮 padding。
- **按鈕**：3px 墨邊，主按鈕珊瑚朱底骨白字、次按鈕骨白底墨字；無圓角。
- **卡片／詞條**：3px 墨邊、骨白底；上區手圖（錆青深底＋2px 墨邊）＋詞＋分類標籤（珊瑚朱底 mono）；下區以 2px 墨線分隔的四要素 tag；底部 mono 手形碼（土金）。
- **chip 篩選鈕**：mono、2px 墨邊、骨白底；`aria-pressed=true` 翻墨底骨白字。多選＝同欄或、跨欄且。
- **表單**：`fieldset` 分步（`.pane.on` 顯示），步驟條 `ol.steps`；輸入 2px 墨邊白底，錯誤加 `.bad`（珊瑚邊＋淡紅底）＋ mono 錯誤字；驗證：稱呼 `length>=2`、手機 `/^09\d{8}$/`、Email 選填 `/^[^@\s]+@[^@\s]+\.[^@\s]+$/`。
- **footer**：錆青深底、3px 墨上緣、三欄（簡介／導覽／聯絡）、mono 版權與責任聲明。

## 動效規則

動效**克制**，非本風格簽名（簽名是 query-by-gesture 這個互動本身）。

- 手圖重繪：參數改變即以 `innerHTML=handSVG(pose)` 整隻重畫，無補間。滑桿 `oninput` 即時更新。
- 查詢結果：依手形距離排序後即時重排列，無進場動畫（避免「揭示進場」過載語彙）。
- 指拼播放：`setInterval` 每 760ms 前進一格；**`prefers-reduced-motion` 時關閉自動播放**，改為按鈕逐格。
- hover：chip／按鈕僅換底色，`transition` 可有可無，reduced-motion 全數關閉。
- 禁用：數字計數滾動、按壓硬陰影當簽名、stroke-dashoffset 描繪、通用淡入當主打。

## 插畫與圖像風格

**只有一種插畫：手。** 全部由骨架引擎生成，禁止外部圖片、禁止 emoji、禁止細線裝飾線描（thin-lineart）。需要「圖示」的地方（如四要素卡）用手、或用最少幾何原語畫出該要素的隱喻（位置＝臉輪廓＋落點圓、動作＝弧線＋箭頭、掌向＝圓＋方向箭頭），原語配色仍守「骨白線／珊瑚朱作用／土金刻度」分工。手圖恆為粗圓描邊的扁平圖騰感，非寫實漸層。

## Logo 與 Favicon 設計指南

- **Logo**：錆青方章（rx:10）內一隻珊瑚朱五指張的手＋墨色描邊，外圈一道土金點狀刻度環（呼應「位置」座標），指節加短墨線 tick。
- **Favicon**：同一隻手去掉刻度環，塞進 `data:image/svg+xml,...` inline data URI 寫在 `<head>`（零外部檔）。
- 兩者與全站手圖共用同一套色與描邊語言，換手形即換識別。

## Do & Don't

**Do**：一切圖像用手骨架引擎生成；四要素貫穿檢索與文案；錆青大面積底＋珊瑚朱作用色；粗黑描邊零圓角；mono 打編碼；不對稱刊頭；核心互動可玩（打手勢查詞）；責任聲明標明示意、非真實 TSL 教學。

**Don't**：紫藍漸層 hero、置中大標＋三卡片、emoji icon、圓角模糊陰影卡、Lorem ipsum、AI 腔文案、任何外部圖片、米白紙感當底、細線幾何線描、把動效當簽名。**不得宣稱本站手勢為真實手語詞的正解**。

## 頁面骨架範例

```html
<div class="brand"><svg>…logo…</svg><div class="nm">掌語 手語典藏所</div></div>
<hr class="rule">
<div class="hero"><div class="wrap">
  <div class="stripe mono">HANDSHAPE · LOCATION · MOVEMENT · ORIENTATION</div>
  <div class="kick">打一個手勢，讓典藏庫替你查詞</div>
  <h1>先做出<em>手形</em>。</h1>
  <div class="bench">
    <div class="stage"><svg id="poserSVG" viewBox="0 0 200 250"></svg></div>
    <div class="panel">
      <div class="chips"><!-- 手形 chip --></div>
      <div class="sliders"><!-- 拇食中名小 + 對掌 + 張開 --></div>
      <ul class="matchlist"><!-- query-by-gesture 結果 --></ul>
    </div>
  </div>
</div></div>
<nav class="dock"><!-- 四頁四手形 --></nav>
```
