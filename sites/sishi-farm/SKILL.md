---
name: natural-organic-almanac
description: Natural-organic aesthetic on an earthy linen palette — forest green, clay and wheat tones, hand-drawn stroke-only produce line art with a leaf-vein draw-in animation, paper-grain texture, wavy hand-drawn dividers, a schedule-first harvest-dial homepage and a vertical side-rail almanac navigation.
---

# 自然有機・農民曆（Natural Organic / Almanac）

> 本 SKILL 定義一整套視覺語言。任何 AI 只要讀完，就能替**任意產業**做出風格一致的網站——風格不綁定「農產品」這個題材。四時直送 SÌSHÍ 只是它的一次示範。

---

## 一、設計哲學

自然有機風的情緒是**手作、質樸、與土地與季節的節奏同步**。它不是北歐極簡（那個更冷、更白、更留白），也不是日式禪風（那個更空、更黑白）；自然有機是**溫暖的大地色、看得見人手痕跡的線稿、紙與布的質感**。

三個不可動搖的原則：

1. **時間即結構（schedule-first）**：這個風格常服務「跟著季節走」的品牌。不要用大標 hero，讓「時間」當主角——產季曆、節氣轉盤、收成時刻表。首頁第一眼是「現在是什麼季節、現在有什麼」，而不是一句廣告標語。
2. **手的痕跡**：所有圖像是**只有描線、沒有填色**的手繪線稿（stroke-only），並用 `stroke-dasharray` 做「像被一筆一筆畫出來」的生長動畫。線條要圓頭圓角（`stroke-linecap:round`），像鉛筆或沾水筆。
3. **土的顏色**：亞麻米當紙、森墨綠當墨、陶土與麥金當強調。加一層極淡的紙張顆粒質感，讓螢幕看起來像再生紙。

適合題材：農產品、有機保養、手作食品、茶／咖啡、園藝、獨立品牌、環境非營利、慢生活。不適合科技感、金融、電競。

## 二、色彩系統

暖大地色，森綠為墨、陶土為火。

| 色票 | Hex | 用途 | 大約比例 |
| --- | --- | --- | --- |
| 亞麻米 Linen | `#EFE7D6` / `#E6DAC2` | 主背景、卡片底 | 52% |
| 森墨綠 Forest | `#2E3B27` | 側欄、主要文字、線稿、邊框 | 22% |
| 陶土 Clay | `#B4633A` | 主強調：kicker、價格、斜體英文 | 9% |
| 麥金 Wheat | `#C9A24B` | 次強調：季節標籤、引言邊線、編號 | 8% |
| 苔綠 Moss | `#6E8B4E` | 分隔波浪、chip 邊框、點綴填色 | 9% |

規則：

- **米底、綠字、陶土點睛**。不要純白、不要黑，純色太硬，不符合有機質感。
- 紙張顆粒：`feTurbulence` 產生的 SVG 噪點做 `background-image`，`opacity:.035` 疊在米底上。
- 強調色一個畫面用 2–4 次，陶土給「暖、重點」，麥金給「標籤、輔助」。

## 三、字體系統

外部僅 Google Fonts：

- **英文標題／斜體**：`Newsreader`（光學尺寸襯線，柔軟、有文學感），斜體用於英文副標與 term。
- **中文標題／內文**：`Noto Serif TC`（900 當大標、700 當小標、400 內文）。
- **UI 標籤／小字**：`DM Sans`（人文無襯線，`letter-spacing:.2em–.32em` 全大寫當 kicker）。

字級：主標 `clamp(2rem,5vw,3.6rem)`、900；區塊標 1.6–1.9rem；內文 14–16px、`line-height:1.8`（留呼吸感）；kicker 12px 全大寫寬字距。首字放大用 `::first-letter`＋`Newsreader`＋陶土色。

## 四、版面與網格

- **side-rail 側欄**：`position:fixed;left:0;width:198px`，森綠底、右緣 3px 陶土線，像農民曆的書背。內含 logo、直向導覽（每項附英文 small 副標）、底部「今日節氣」。主內容 `margin-left:198px`。
- **產季轉盤**：置中 SVG 圓盤，四象限四季各一色，中心一支可旋轉指針（`transform:rotate()`）。四顆圓形季節鈕壓在四角。旁邊一個面板隨選取季節切換。
- 內容 `max-width:1000px`，區塊間用**手繪波浪線**（`<path>` 連續 Q 曲線）分隔，不用直線 `<hr>`。
- 手機（≤820px）：側欄變成頂部可橫向捲動的列，`margin-left:0`，轉盤縮小、雙欄改單欄。

## 五、元件配方

- **nav（side-rail）**：直向連結，`border-left:3px solid transparent`，hover 變麥金、當前頁變陶土並加深底色。手機改 `border-bottom`。
- **產季轉盤（簽名）**：SVG 四色扇形＋指針 `<g id="ptr" style="transform-origin:center;transition:transform .9s cubic-bezier(.3,1.5,.4,1)">`。四顆 `.seasonbtn` 圓鈕 `aria-pressed` 切換。JS：點選→指針轉到該季角度、面板 `.on` 切換、線稿重播。
- **蔬果線稿**：`viewBox 0 0 120 120`，全 `fill:none;stroke:forest;stroke-width:2.4–2.6;linecap:round`。少量 `.fillmoss`/`.fillclay` 平塗點綴（葉子、種子）。draw-in：`.draw{stroke-dasharray:520;stroke-dashoffset:520;animation:draw 1.8s ease forwards}`。
- **卡片／box**：方角、2px 森綠邊、亞麻米底，**不要圓角、不要模糊陰影**。價格用 `Newsreader` 陶土色。列表項用 `— ` 前綴而非 bullet。
- **chip**：圓角膠囊（這裡允許圓角，因為是標籤不是卡片），1.5px 苔綠邊、米底、森綠字。
- **footer**：頂部 2px 森綠線、DM Sans 小字、附「皆為虛構示意」聲明。

## 六、動效規則

- **葉脈生長描線（簽名）**：`@keyframes draw{to{stroke-dashoffset:0}}`，1.8s ease，切換季節時用 `el.style.animation='none';void el.offsetWidth;el.style.animation=''` 重播。
- **指針旋轉**：`transition:transform .9s cubic-bezier(.3,1.5,.4,1)`，帶一點回彈。
- **面板進場**：`@keyframes fadein` 位移 8px＋淡入 .5s。
- **hover**：側欄項底色與邊線變化，`.18s`。
- **降級**：`@media(prefers-reduced-motion:reduce)` 關閉指針 transition、描線動畫（直接 `stroke-dashoffset:0`）、面板淡入、`scroll-behavior:auto`。

## 七、插畫與圖像風格

只用線稿：蔬菜、水果、農友肖像全部是 stroke-only 手繪。構圖樸拙、對稱、留一點不完美。人像用「圓臉＋帽子＋圓肩」極簡符號，帽子可用苔綠／麥金平塗區分農友。波浪線與四季環是可重複的母題。**禁止外部圖片、禁止 emoji、禁止照片**。

## 八、Logo 與 Favicon 設計指南

- **Logo**：左為「四季環」標記（一個圓分成四色扇形＋中心一株發芽線稿），右為 `Noto Serif TC` 700 品牌名＋`Newsreader` 斜體英文副標。存成 `assets/logo.svg`。側欄裡放在米底小卡上。
- **Favicon**：32×32 inline SVG data URI——米底、四色扇形圓、森綠描邊圓。寫進每頁 `<head>`。

## 九、Do & Don't

**Do**：schedule-first 讓時間當主角；side-rail 農民曆側欄；大地色（米／綠／陶土）；stroke-only 手繪線稿＋葉脈 draw-in；紙張顆粒質感；手繪波浪分隔；`— ` 前綴列表；虛構但具體的農友、產地、價格。

**Don't**：❌ 紫藍漸層或任何鮮豔漸層 hero；❌ 置中大標＋副標＋兩顆按鈕＋三張圓角卡片；❌ emoji 當 icon；❌ 圓角＋模糊陰影卡片；❌ 純白背景／純黑字；❌ 填滿色塊的插畫（要線稿）；❌ Lorem ipsum 或「在當今快節奏的世界」AI 腔；❌ 反射式塞跑馬燈——本風格用「產季轉盤＋側欄」承擔識別。

## 十、頁面骨架範例

```html
<aside class="rail">
  <a class="brand" href="index.html"><img src="assets/logo.svg" alt=""></a>
  <nav>
    <a aria-current="page">產季曆<small>Harvest Dial</small></a>
    <a>當令農產<small>In Season</small></a>
    <a>契作農友<small>Our Farmers</small></a>
  </nav>
  <div class="seas">今日節氣 <b id="railTerm">小暑</b></div>
</aside>

<div class="main"><div class="wrap">
  <p class="kick">跟著節氣吃飯</p>
  <h1 class="big">這週，土裡長出什麼？</h1>
  <section class="calendar">
    <div class="dialbox">
      <svg class="dial" id="dial" viewBox="0 0 300 300"><!-- 四色扇形 + <g id="ptr"> 指針 --></svg>
      <button class="seasonbtn" data-s="summer" aria-pressed="false">夏</button>…
    </div>
    <div class="panel"><div class="p on" data-s="summer">
      <svg class="veinart"><path class="draw" d="…"/></svg>
    </div></div>
  </section>
  <svg class="wave" viewBox="0 0 1200 26" preserveAspectRatio="none"><path d="M0 13 Q75 0 150 13 T300 13 …"/></svg>
</div></div>
<script>
// 點季節 → 指針轉角度 + 面板切換 + 重播 .draw；依 new Date().getMonth() 預設當令季節
</script>
```
