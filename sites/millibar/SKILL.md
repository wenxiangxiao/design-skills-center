---
name: isobar-synoptic
description: A meteorological synoptic-chart aesthetic — slate mono-ink isobars, wind barbs and station models on a cool chart ground, a technical console (os-metaphor) opening with a canvas-generated pressure field that redraws live, condensed chart-label headings over a monospaced data layer.
---

# 氣象圖／等壓線美學（Isobar Synoptic）

## 設計哲學

把整個網站當成一張**綜觀天氣圖（synoptic chart）**在讀。這種美學來自氣象傳真機、航海海圖、中央氣象署的地面天氣圖：黑墨的等壓線一圈圈收束成高低壓中心，風羽插在格點上，站點模式標著讀值。它的氣質是**冷靜、理性、資料驅動、零裝飾**——沒有漸層、沒有圓角卡片、沒有情緒，只有可被判讀的資訊。適合潛水／航海／戶外／氣象／物流／監測儀表、任何「用數據做決策」的產業。

**關鍵：這不是深色科技風，也不是溫暖紙感。是「單一墨色的多階（mono-ink）」**——整站幾乎只有一種石板墨藍，從最深的面板到最淡的圖紙底，全是它的明度階，再加**唯一一個警示紅**標記低壓／危險／CTA。克制到只剩結構本身。

## 色彩系統

| 色 | Hex | 用途 | 比例 |
|---|---|---|---|
| 墨藍 ink | `#16242E` | 側欄、footer、控制台深底、大標 | 24% |
| 墨藍 2 | `#263B48` | 面板、次深底、H 中心 | 14% |
| 石板 3 | `#3E5A6B` | 等壓線、標籤文字 | 12% |
| 石板 4 / 霧 | `#5E7C8C` / `#8FA7B4` | 風羽、次要文字、線描 | 12% |
| 圖紙底 ground | `#E5EBEE` | 頁面底 | 24% |
| 面板淺 | `#EEF3F4` / `#F5F8F8` | 卡片、控制台淺區 | 12% |
| 警示紅 red | `#C4362B` | 低壓中心、警示、CTA、強調（唯一彩色） | 2% |
| 分隔線 | `#C4D2D8` | 1–2px 網格線、卡框 | — |

頁面底疊一層 `repeating-linear-gradient`（水平＋垂直每 32px 一條 5.5% 石板線）＝海圖經緯格。**紅色是稀有資源**，只給真正需要警示或行動的地方。

## 字體系統

- 大標／區塊標題：**Barlow Condensed** 800（窄體、像海圖上的地名標註），字距 `.01em`，行高 1.05。
- 資料層／座標／讀值／標籤：**Space Mono** 400/700（等寬，承擔一切數字、經緯度、hPa、kt、代碼）。大量使用 `.up`（`text-transform:uppercase;letter-spacing:.16em`）。
- 內文：**Noto Sans TC** 400/500/700，行高 1.72。
- 字級：hero `clamp(30px,6vw,64px)`、h2 22–26px、讀值 `Barlow 800 30px`、mono 標籤 9.5–12px。
- 原則：**中文用黑體不用明體**——這是技術文件，不是文學。

## 版面與網格

- 骨架＝**side-rail + main**：左側 230px 墨藍垂直側欄（品牌 + 編號導覽 01/02/03 + 聯絡），右側 `max-width:1000px` 內容。手機（≤860px）側欄收合成頂部橫向 tab。
- **os-metaphor 開場**：首頁不是 hero，而是一台「控制台」——頂部一條深色 `.cbar` 狀態列（綠點 live + 座標），下面 `grid-template-columns:1fr 300px` 左圖右讀值面板，底部一條深色時間軸控制列。全部 1–2px 硬線分隔，無圓角。
- 資訊區用 `grid` + `1px` 線背景做出「表格感」：`.grid3`／`.rules`／`.team` 皆為 `gap:1px;background:線色` 讓每格像儀表分割。
- 對齊、對齊、對齊：所有數字靠 mono 等寬對齊；標籤一律小字大字距置於數值上方（站點模式的排法）。

## 元件配方

- **側欄導覽 side-rail**：`position:sticky;height:100vh`，項目 `border-left:2px solid transparent`，`.on` 時左邊界變紅、底色淡紅。每項前置 mono 編號。
- **控制台狀態列**：深底 mono 小字，`.dot.live` 綠點用 `@keyframes pulse` 呼吸（reduced-motion 關閉）。
- **讀值卡 `.rd`**：白底 1px 框，上方 mono 小標籤，下方 `Barlow 800 30px` 數值 + mono 單位小字；警示態數值轉紅。
- **時間軸滑桿（signature 控制）**：`input[type=range]`，thumb 為紅圓 + 白邊；`input` 事件即時重繪 canvas 與所有讀值。
- **按鈕**：方正無圓角，`box-shadow:4px 4px 0 墨藍`（硬位移陰影），hover 位移 `translate(-1px,-1px)` 陰影加深；主行動用紅底，次要用透明底墨藍框。
- **適潛指數量表**：`.gtrack` 外框 + `.gfill` 以 `right:%` 控制長度，填充用 `repeating-linear-gradient` 斜條；good=綠、普通=石板、bad=紅。
- **footer**：墨藍底，頂 `2px solid 紅`，三欄，底部 mono 版權 + 免責。

## 動效規則

- **等壓線重繪（核心）**：canvas 以「高低壓高斯場」建立純量壓力場 `P(x,y)=1010+Σ aᵢ·exp(−d²/2sᵢ²)`；對每 4 hPa 一階用 **marching squares** 抽等值線描邊。時間軸每一步讓高低壓中心座標與強度線性飄移 → 重算 → 重繪。duration 由 CSS `transition` 承接量表（.55s cubic-bezier(.4,.1,.2,1)），canvas 本身是即時重繪（非逐幀動畫，省效能且尊重 reduced-motion）。
- **風羽**：在粗格點取壓力梯度，風向≈垂直梯度方向，畫短桿 + 一撇倒刺。
- **進場**：`.reveal` IntersectionObserver 加 `.in`（translateY(16px)→0，opacity）。**通用淡入僅作輔助，不作為 signature 主打**。
- **reduced-motion**：全域關閉 animation/transition，等壓線仍會在拖動時重繪（資訊性，不可省），只是不做呼吸脈動。

## 插畫與圖像風格（generative-canvas）

- **零外部圖片**。主圖像＝canvas 生成的等壓線場 + 風羽 + H/L 中心，全程式繪製。
- 輔助＝原創 inline SVG：綠島潛點示意圖（島形路徑 + 疊於同心橢圓等壓線背景 + 紅點潛點 + 引線標註）、教練頭像（幾何 + 同心圓 + 紅點，呼應 logo）。
- 一切線條為單色墨階，唯一紅點標記關鍵位置。避免任何寫實照片感。

## Logo 與 Favicon 設計指南

- **Logo**：圓角方章內，兩三圈由外而內收束的等壓線（不規則橢圓路徑），中心一個紅點 + mono 字母「L」（低壓）。是「一個低壓中心」的抽象。
- **Favicon**：同構的極簡版——墨藍圓角底、兩圈同心圓、紅點中心。inline SVG data URI 寫在 `<head>`。
- 品牌名用 Barlow Condensed 800 全大寫「MILLIBAR」+ mono 副標。

## Do & Don't

- **Do**：讓資料當主角、用 mono 對齊一切數字、把最重要的操作做成真的能動的控制台、紅色極省著用、中文用黑體。
- **Do**：把「單位」明講（hPa、kt、m、°E）——技術可信度來自單位。
- **Don't**：不用紫藍漸層、不用圓角卡片＋模糊陰影、不用 emoji（icon 一律 SVG）、不用 Lorem、不堆情緒形容詞（「探索無盡深藍」之類）。
- **Don't**：不要讓紅色氾濫成第二主色——一旦到處都紅，警示就失效了。
- **Don't**：不用 hero 大標開場；這個風格的開場應該是一台儀表／一張圖。

## 頁面骨架範例

```html
<div class="shell">
  <aside class="rail"><!-- 品牌 + 編號 side-rail 導覽 + 聯絡 --></aside>
  <main class="main">
    <div class="console">
      <div class="cbar"><span class="dot live"></span><b>綜觀海況台</b><span class="sp">121.49°E</span></div>
      <div class="cgrid">
        <div class="chart"><canvas id="chart"></canvas></div>
        <div class="readpanel"><!-- .rd 讀值卡 ×4 + 指數量表 --></div>
      </div>
      <div class="timebar"><span class="stamp">今日 08:00</span><input type="range" id="tslider" min="0" max="6"></div>
    </div>
    <section class="wrap">…內容以 1px 線 grid 分格…</section>
    <footer class="pg">…</footer>
  </main>
</div>
```

```js
// 等壓線核心：高斯壓力場 + marching squares（每 4 hPa 一階）
function field(x,y,cs){var v=0;for(var c of cs){var dx=x-c.x,dy=y-c.y;v+=c.a*Math.exp(-(dx*dx+dy*dy)/(2*c.s*c.s));}return 1010+v;}
// 時間軸 input → 移動中心座標/強度 → 重算格點 → marching squares 描線 → 更新讀值
```
