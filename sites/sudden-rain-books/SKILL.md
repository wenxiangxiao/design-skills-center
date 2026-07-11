---
name: newspaper-editorial-style
description: Build a website styled as a traditional broadsheet newspaper — masthead, multi-column serif typography, hairline column rules, drop caps, woodcut-style SVG illustrations, and a single seal-red accent on aged paper.
---

# 報紙編輯風（Newspaper Editorial Style）設計規格書

本文件以基隆獨立書店「驟雨書店」之《驟雨日報》為範例，完整定義「把網站做成一份報紙」的做法。
目標：任何 AI 或設計者讀完本文件，即可在不看原始碼的情況下重現同等品質的報紙式網站。

---

## 一、設計哲學

1. **網站即報紙，不是「有報紙元素的網站」。** 資訊架構直接沿用報業結構：頭版（頭條＋簡訊＋邊欄）、二版（專版）、三版（副刊＋分類廣告）。導覽列不叫選單，叫「版面索引」；頁尾不叫 footer，叫「版權欄」；促銷區塊做成「老派廣告框」。
2. **內容決定可信度。** 報紙風格成立的前提是文案像真的報紙：有日期、期數、記者署名（byline）、圖說、按語、分類廣告的字數限制與價目。文字要有編輯口吻與在地細節，禁 AI 腔、禁 Lorem ipsum。
3. **黑白為體，一紅為魂。** 整份報紙只有紙色、油墨黑與一個印章紅。紅色永遠是「蓋上去的」——印章、kicker、當前版面標記——而非大面積裝飾。
4. **線條就是版面。** 報紙的秩序感全靠「線」：細分欄線、單線框、雙線框、點線。能用線解決的，不用底色、不用陰影、不用圓角。
5. **克制即高級。** 動效只做三件事（進場淡入、hover 微傾、即時日期），其餘一律靜止。報紙不會動，這是它的尊嚴。

## 二、色彩系統

| 用途 | 變數 | 色值 | 規則 |
|---|---|---|---|
| 紙色（頁面底） | `--paper` | `#f4eede` | 報紙本體底色，疊加極淡橫紋模擬紙纖維 |
| 深紙色 | `--paper-deep` | `#e9e1cb` | 圖框襯底、hover 底色 |
| 桌面色 | `--desk` | `#cfc5ab` | body 背景，襯出「一張報紙放在桌上」 |
| 油墨黑 | `--ink` | `#221d15` | 文字、線條、版畫；是暖黑不是純黑 |
| 淡墨 | `--ink-soft` | `#544c3d` | 副文、圖說、deck |
| 淡線 | `--rule-faint` | `rgba(34,29,21,.38)` | 分欄線、點線、次要框線 |
| 印章紅（唯一強調色） | `--seal` | `#a63b2c` | kicker、當前頁標記、紅印、連結、分類標籤 |

**硬規則**：禁任何漸層（尤其紫藍漸層）、禁第二強調色、禁純白 `#fff` 與純黑 `#000`。紙的橫紋用 `repeating-linear-gradient(0deg, rgba(34,29,21,.018) 0 1px, transparent 1px 4px)` 疊在 `--paper` 上。

## 三、字體系統

- 中文：**Noto Serif TC**（variable，`wght@200..900`）。內文 400、deck 500、導覽 600、標題與刊名 900。
- 西文：**Playfair Display**（italic 用於英文副題、書名原文、裝飾性英文）。
- 引入僅此一條外部資源：Google Fonts `css2` 連結，並 `preconnect`。

**標題階層規則**（由大至小，全部襯線）：

| 層級 | 樣式配方 |
|---|---|
| 刊名（masthead） | 900 / `clamp(2.5rem,7.6vw,4.8rem)` / `letter-spacing:.22em`（並補 `text-indent` 平衡尾距） |
| 頭條 headline | 900 / `clamp(1.9rem,4.6vw,3.1rem)` / `line-height:1.32` |
| kicker（眉題） | 紅 / 700 / `.85rem` / `letter-spacing:.42em`，置於 headline 之上 |
| deck（副題） | 500 / `1.06rem` / 淡墨 / 上下各一條 1px 淡線夾住 |
| byline（署名） | `.85rem` / 淡墨 / 「文——某某」用破折號不用冒號 |
| 版面段落標（section-bar） | 上 4px double、下 1px solid，左標題 900、右註記小字 |
| 卡內標題 | 900 / 約 `1.05rem` |
| 正文 | 400 / 16px / `line-height:1.95` / `text-align:justify` |

中文標點與間隔用全形（｜、——、・），數字報頭處可用漢字（「第 2617 號」「拾捌元」）增加老報氣。

## 四、版面與網格

1. **報紙外框**：`body` 為桌面色；內容包在 `.sheet`（max-width 約 1180px、1px 深框、大陰影、紙色＋紙紋底），像一張攤開的報紙。手機時 `.sheet` 貼齊邊緣、去陰影。
2. **多欄正文**：用 CSS columns 而非 grid——頭條長文 `columns:3`、專欄長文 `columns:2`，`column-gap` 30–38px，**必配** `column-rule:1px solid var(--rule-faint)`（分欄線是報紙的指紋）。斷點：960px 降一欄、700px 全部單欄並移除 column-rule。
3. **頭版格局**：`grid-template-columns: 1fr 316px`。左為頭條與簡訊，右欄（rail）以 `border-left:1px solid var(--ink)` 隔開，堆疊天氣欄、要目、廣告框。
4. **線的階層**：版面級分隔用 `4px double`（報頭 folio、section-bar、版權欄之上）；區塊級用 `1px solid var(--ink)`；欄內小分隔用 `1px dotted/`淡線。雙線永遠比單線高一級，不可混用。
5. **簡訊區**：兩欄 grid，格與格之間用淡線（奇數格 `border-right`），每則含分類 tag（紅、疏排）、標題、正文、會期 meta。

## 五、元件配方

- **Masthead（報頭）**，由上而下五層，各頁完全一致：
  1. 報眉 earline：flex 兩端對齊小字——「發行地＋發行者」｜JS 即時日期｜一行天氣。下緣 1px 實線。
  2. 報徽：60–80px 的圓形版畫 SVG（見第八節），置中。
  3. 刊名：超大 900 疏排；下接 Playfair Display italic 全大寫疏排英文副題。
  4. folio 期數欄：上 4px double、下 1px solid，橫排「第 N 號｜創刊年代｜本月號｜零售價」，格間豎線。
  5. 版面索引 paper-nav：置中、格間豎線、下緣 4px double；當前頁文字轉紅並在字下加 2px 紅短線（`aria-current="page"`）。
  另可在報頭右側放一枚直書「逢雨照常出刊」之類的紅框斜章（`writing-mode:vertical-rl` ＋ 小角度 rotate）。
- **Drop cap**：`.dropcap::first-letter { float:left; font-size:3.55em; line-height:.92; font-weight:900; padding:.05em .14em 0 0 }`，只用於每篇文章的第一段。
- **圖說（caption）**：圖包在 `figure.plate`（1px 墨框＋深紙襯底＋內距 10px），`figcaption` 上緣淡線、`.78rem` 淡墨，開頭以紅字「圖」領起。圖說要寫成一句有內容的話，不是檔名。
- **引言 pullquote**：上下 `4px double` 夾住，置中、700、可加紅色小字出處；在多欄中加 `break-inside:avoid`。
- **廣告框**：`4px double` 外框、置中排版；框頂中央以負 margin 疊一枚小字「廣　告」（背景紙色遮住框線）；內容為店家自己的趣味小廣告（代客尋書、郵購部），文案要老派、像真的分類廣告；尾綴一個紅框斜置的 `.seal-note` 章。
- **分類廣告區**：外框 1px 實線的三欄 grid，格間淡線；每格：分類字（紅、疏排）＋粗標題（下緣 2px 實線）＋50 字內正文＋紅色聯絡小字。section-bar 右側註明刊例（「每格五十字內・刊登一格三十元」）。
- **天氣欄**：`4px double` 框、置中框標「基隆港區天氣」、版畫雲雨 SVG、`dl` 條列（天況／降雨／海象），結尾必有「宜／忌」兩行製造報紙曆書感。
- **版權欄（頁尾）**：上緣 `4px double`；三欄 grid（報社資料／營業時間／版面索引），各欄小標 900 疏排加底線；最下一行置中法律小字，寫成報紙口吻（「逢雨出刊・無雨加印」）。

## 六、動效規則

只允許三種，全部須支援降級：

1. **進場淡入**：`.fade { opacity:0; translateY(12px); transition:.7s }`，IntersectionObserver 加 `.in`。
2. **hover 微傾**：書影／卡片 hover 時 `rotate(-1.8deg) translateY(-5px)`，硬陰影（`box-shadow: 6px 9px 0 rgba(...)`，不用模糊陰影）。
3. **即時日期**：JS 將報眉日期寫成「中華民國NN年M月D日　星期X」（`getFullYear()-1911`），folio 寫「YYYY 年 M 月號」。

`@media (prefers-reduced-motion: reduce)` 時：`.fade` 直接可見、transition 全關、hover 不位移；JS 端亦偵測 `matchMedia` 直接加 `.in`。禁視差、禁自動輪播、禁滾動劫持。

## 七、插畫與圖像風格（版畫畫法）

所有圖像皆為 inline SVG，單色木刻／版畫感。畫法配方：

1. **只用兩色**：油墨黑 `#221d15` 線條與塊面，紙色 `#f4eede` 留白；紅 `#a63b2c` 只出現在落款印章。
2. **三種筆觸**：粗輪廓線（stroke 2.4–5，`stroke-linecap:round`）；平塗黑塊（fill 剪影，如燈塔、船身、屋頂）；細排線 hatching（stroke 1–1.4 的平行短線群，表現陰影、雲紋、水面）。
3. **雨的畫法**：一組斜 15–20 度的短線（`<line>`，stroke 1.2–2、round cap），長短錯落、兩三排交錯，不畫水滴形。
4. **浪的畫法**：`Q`＋`T` 的連續波浪 path，三條為一組，stroke 由粗到細（如 2.8→1.6→1）造成遠近。
5. **書影（重刻版）**：viewBox `0 0 200 280`；紙色底＋外 2.5px 內 1px 雙框；一個主motif（樹、鯨、月、沙漏……）；書名用 `writing-mode:vertical-rl` 直排於側，font-family serif、900；角落鈐 28px 紅印「驟雨」。對真實書籍務必標註此為店家「重刻版」書影、與原書裝幀無涉。
6. **地圖**：把水面畫成排線區＋海岸輪廓粗線，道路用粗細不同的黑線，地標用小剪影，目的地蓋一枚旋轉紅印，步行路線用紅色虛線，附指北針與直書路名。
7. 每張 SVG 都要有 `role="img"` 與具體的 `aria-label`。

## 八、Logo 與 Favicon 指南

- **報徽**：圓形雙圈（外粗內細）內置一景版畫——本例為斜雨、燈塔剪影、兩排浪，加一枚偏置紅印。報徽在報頭以 inline SVG 重複出現，另存 `assets/logo.svg` 為完整報頭版（報徽＋橫排刊名＋雙線＋英文副題＋發行資訊小字），含 `<title>`/`<desc>`。
- **Favicon**：inline SVG data URI（percent-encoded），配方＝圓角紅底方塊＋紙色細內框＋單一漢字（本例「雨」），即一枚印章。禁外部 .ico 檔。

## 九、Do & Don't

**Do**
- 每頁單一 HTML 檔，CSS/JS 全部內嵌；相對路徑互連；報頭與版權欄逐字元一致。
- 用報業詞彙命名一切：頭版／二版／副刊、眉題／副題／署名／按語／要目／刊例。
- 文案寫出具體數字與私人細節（期數、雨量、巷弄門牌、貓的職稱），幽默要冷面、老派。
- 全形標點、直書元素（紅章、地圖路名）、民國紀年混用公元，製造時代層次。
- 為 SVG 與導覽加上 aria 屬性；justify 中文正文並設 `text-justify:inter-ideograph`。

**Don't**
- 禁紫藍漸層、禁任何漸層按鈕、禁圓角卡片陣列（三卡片模板）、禁 emoji 當 icon。
- 禁外部圖片、圖庫照片、Lorem ipsum、佔位文字；外部資源僅 Google Fonts 一條。
- 禁 AI 腔（「探索」「打造」「開啟一段旅程」「不僅僅是」）；報紙不邀請你探索，報紙只負責刊登。
- 禁模糊大陰影與毛玻璃；陰影只有兩種——`.sheet` 的桌面投影與 hover 的硬偏移陰影。
- 禁把紅色用於大面積底色或漸層；紅只能「蓋」不能「刷」。

## 十、頁面骨架範例

```html
<!DOCTYPE html>
<html lang="zh-Hant-TW">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>驟雨日報｜頭版</title>
  <link rel="icon" href="data:image/svg+xml,...（印章紅底單字 favicon）">
  <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@200..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet">
  <style>/* :root 色票 → 共用報頭/頁尾 → 版面 → 元件 → .fade → RWD */</style>
</head>
<body>
  <div class="sheet">
    <div class="earline">發行地 ｜ <span id="dateline"></span> ｜ 一行天氣</div>
    <header class="masthead">報徽 SVG ＋ 刊名 ＋ 英文副題 ＋ 直書紅章</header>
    <div class="folio">第 N 號｜創刊年代｜<span id="folio-date"></span>｜零售價</div>
    <nav class="paper-nav">
      <a href="index.html" aria-current="page">頭版・要聞</a>
      <a href="shelves.html">二版・書架</a>
      <a href="about.html">三版・副刊</a>
    </nav>
    <main class="front-grid">
      <article class="front-main article">
        <p class="kicker">本日頭條</p>
        <h1 class="headline">…</h1>
        <p class="deck">…</p>
        <p class="byline">文——某某</p>
        <figure class="plate">SVG 版畫 <figcaption><b>圖</b>圖說一句</figcaption></figure>
        <div class="cols-3">
          <p class="dropcap">首段首字放大…</p>
          <div class="pullquote">「引言」<small>——出處</small></div>
        </div>
        <div class="section-bar"><span><b>店內動態</b></span><span>註記</span></div>
        <div class="briefs">四則簡訊…</div>
      </article>
      <aside class="front-rail">天氣欄（boxed-double）／本期要目（boxed）／廣告框 ×2（advert）</aside>
    </main>
    <footer class="colophon">三欄版權欄 ＋ 置中法律小字</footer>
  </div>
  <script>/* 民國日期 → #dateline、#folio-date；IntersectionObserver 淡入；reduced-motion 降級 */</script>
</body>
</html>
```

依此骨架增版：二版以「section-bar ＋ shelf-grid（書影卡）」重複，三版以「兩欄長文 ＋ 年表 ＋ 地圖/資訊雙欄 ＋ 分類廣告 grid」組成。報頭與版權欄原樣複製，只改 `aria-current` 與 `<title>`。
