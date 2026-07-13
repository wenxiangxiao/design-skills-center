---
name: swiss-international-spreadsheet
description: A Swiss International Typographic web style built around a working-spreadsheet metaphor — a fixed formula bar, lettered column and numbered row headers, cell selection that walks with synced formulas, and an accounting-style green/red signal system in IBM Plex Mono on warm off-white, with a side-rail nav and strict 2px hairline grid, zero rounded corners.
---

# 瑞士國際主義 · 試算表版（Swiss International — Spreadsheet OS）

> 本 SKILL 定義一整套視覺語言。任何 AI 只要讀完，就能替**任意產業**做出風格一致的網站——風格不綁定「會計師事務所」這個題材。MINGSUAN 只是它的一次示範；你可以拿它做 B2B SaaS 儀表板、資料分析工具、財報中心、研究機構、報價系統或任何「以數字與表格為核心」的產品。
>
> **核心心法**：這不是「Helvetica ＋大留白」，而是把**試算表**這個大家都懂的軟體隱喻當成整個介面的骨架。網格決定一切、公式列讓每一格「有出處」、借貸雙色讓數字自己說話。客觀、精確、可稽核；讓內容退到儲存格裡，設計退到格線後面。

---

## 設計哲學

1. **介面即敘事**：首頁不是行銷 hero，而是一套可用的軟體。試算表隱喻直接承載品牌——內容就是儲存格，導覽就是分頁。選 os-metaphor 就要把隱喻做到底，不是貼張截圖。
2. **每一格都有公式**：資訊層級由「參照（A1）＋公式」建立可稽核感。即使公式是象徵性的（`=IF(帳目.清楚,"安心","重算")`），也要合乎該格內容的邏輯。
3. **借貸雙色**：正值／增長用帳綠，負值／減損用帳紅，其餘一律墨黑。顏色是資訊不是裝飾。
4. **格線是結構不是紋樣**：2px 實線畫外框與主分隔、1px 淺線畫內部儲存格；零圓角、零陰影卡片（唯一允許的「陰影」是選取框的 inset）。

## 色彩系統

| 角色 | Hex | 用途 | 比例 |
|---|---|---|---|
| 紙白 paper | `#F4F2EC` | 背景、欄列標頭底 | ~62% |
| 面板 panel | `#FBFAF6` | 儲存格 / 工作表底 | ~20% |
| 墨黑 ink | `#16150F` | 文字、2px 主格線、CTA 底 | ~10% |
| 帳綠 green | `#1A7F5A` | 正值、SUM、成功狀態 | ~3% |
| 帳紅 red | `#C0392B` | 負值、裁罰、警示 | ~2% |
| 選取藍 blue | `#1B5FD0` | 選取框、focus、hover 連結、::selection | ~2% |
| 格線 grid | `#CFCABB` | 1px 內部儲存格線 | 線 |
| 淺分隔 faint | `#E4E0D6` | 側欄選單分隔 | 線 |

原則：一頁只允許帳綠＋帳紅＋選取藍三個訊號色，其餘全部墨黑／灰。禁止漸層（尤其紫藍）。

## 字體系統

- **標題／品牌**：`Archivo` 800–900（grotesque，齊左，`letter-spacing:-.01em`）。巨標用 `clamp(1.9rem,4.4vw,3.5rem)`、`line-height:.98`。
- **內文**：`Noto Sans TC` 400/500/700，`line-height:1.6`。
- **數字與公式（關鍵）**：`IBM Plex Mono` 400–600。所有金額、統計、儲存格參照、公式列、標籤（tag）一律用等寬字，這是「試算表體感」的來源。
- 字級 scale：mono 標籤 .6–.74rem（`letter-spacing:.14–.22em` 大寫）／內文 .82–1.02rem／區塊標題 clamp 1.6–2.4rem／首頁巨標 clamp 1.9–3.5rem。

## 版面與網格

- **側欄 side-rail**：固定左側 236px，2px 右框；品牌（格線 logo）＋編號垂直選單＋頁尾聯絡資訊。`≤880px` 收合成頂部橫列（`flex-wrap`，隱藏編號與頁尾）。
- **主區網格**：試算表用 `display:grid;grid-template-columns:40px repeat(6,1fr)`（40px 為列號欄）。內容儲存格以 `grid-column:span N` 做「合併儲存格」（標題 span 3、巨標 span 4、SUM 盒 span 2…）。
- **編輯區塊**：離開試算表後改用單欄 `max-width:1120px`、左右 40px 留白的 editorial 版面，維持齊左、不對稱。
- 留白規則：區塊間 `padding:68px 0` ＋ 2px 底線分節；不用置中對稱大色塊。

## 元件配方

- **公式列 appbar**（`position:sticky;top:0`）：`[參照框 96px | fx | 公式 flex:1 | 狀態]`，全 mono、`.74rem`，底 2px 線。公式末端一枚 `steps(1)` 閃爍實心游標（reduced-motion 停止）。
- **儲存格 cell**：`padding:16px 18px`，右／下 1px 格線；`.sel` 狀態 `box-shadow:inset 0 0 0 3px 藍`（不位移）。每格帶 `data-ref`／`data-formula`。
- **分頁標籤 tabs**：底部一列 mono 標籤，`aria-current` 者提亮並以綠點標示，兼作次導覽（連往其他頁）。
- **按鈕**：矩形、2px 邊、零圓角；主 CTA 墨黑底紙白字，hover 反白或轉帳綠。
- **索引列 irow / 服務列 srow**：`display:grid` 多欄，`hover` 整列反黑（背景墨黑、文字紙白、mono 副資訊轉灰）。這是本風格取代「卡片」的主要清單元件。
- **表單**：input/select/textarea 2px 邊、零圓角、面板底；`focus` 用 `inset 3px 藍` 取代預設 outline。
- **footer**：3 欄 grid（品牌聯絡／連結／字號公會），底部 1px 線 ＋ mono 虛構聲明。

## 動效規則

- **選取框游走**：`setInterval` 每 2600ms 移至下一個 `.cell[data-ref]`，同步更新參照框與公式列；同時支援點擊選取。easing 靠 CSS，位置切換無過場（試算表就是瞬間跳格）。
- **數字加總**：`IntersectionObserver`（threshold .4）觸發，`requestAnimationFrame` 以 `1-(1-p)^3` 緩動累加，`dur≈1300–1400ms`；支援 `data-dec`／`data-suffix`／千分位。
- **游標閃爍**：公式列 `@keyframes blink` `steps(1) 1.05s infinite`。
- **hover 反黑**：清單列 `transition:background/color .16s`。
- **降級**：`prefers-reduced-motion:reduce` → 停止選取框自動巡格、停止游標閃爍、數字直接顯示終值。

## 插畫與圖像風格

- 全部原創 inline SVG／CSS，零外部圖片。
- 圖像語彙＝**格線＋儲存格＋選取框**：logo、頭像、favicon 都以「帶格線與一枚藍色選取框的方格」為母題，正值處點綴帳綠。
- 不用照片、不用擬真陰影、不用漸層；人像用「儲存格＋單字」的抽象方格頭像。

## Logo 與 Favicon 設計指南

- **Logo**：`viewBox 0 0 120 120`，4px 墨黑外框方格，內部 2px／1px 格線分出欄列標頭與儲存格；一枚 3px 藍色選取框、一處帳綠正號、左下一枚以格線畫成的 Σ（sigma＝加總）。
- **Favicon**：同母題壓縮成 64×64 的 inline SVG data URI 寫在 `<head>`（格線方格＋藍選取框＋綠 `+`）。務必是 data URI，不可外連。

## Do & Don't

**Do**
- 把首頁做成真的能操作的表格；每格都有合理的 ref 與公式。
- 數字一律 mono、借貸雙色；金額標「起／示意」。
- 清單用「hover 反黑的 grid 列」取代圓角卡片。

**Don't（含去AI化禁令）**
- ✗ 紫藍漸層 hero、置中大標＋兩顆按鈕＋三張圓角卡片。
- ✗ 圓角卡片＋模糊陰影；本風格零圓角、零 drop-shadow（只有 inset 選取框）。
- ✗ emoji 當 icon（一律格線 SVG）、Lorem ipsum、AI 腔套語。
- ✗ 跑馬燈——本風格的動效簽名是選取框與公式列，不需要捲動橫幅。
- ✗ 敏感金額不標虛構聲明。

## 頁面骨架範例（可直接使用）

```html
<div class="appbar">
  <div class="ref" id="ref">A1</div><div class="fx">fx</div>
  <div class="formula"><span id="formula">=OPEN("工作表")</span><span class="cur"></span></div>
  <div class="status">就緒 · READY</div>
</div>
<div class="sheet">
  <div class="colhead"><div></div><div>A</div><div>B</div><div>C</div><div>D</div><div>E</div><div>F</div></div>
  <div class="grid">
    <div class="rownum">1</div>
    <div class="cell title" data-ref="A1" data-formula='=OPEN("工作表")'>
      <span class="tag">WORKBOOK</span><b>品牌名</b>
    </div>
    <div class="cell sumbox" data-ref="E1" data-formula='=SUM(2009:2026)'>
      <div class="num" data-count="4820" data-suffix="+">0</div><small>累計</small>
    </div>
  </div>
  <div class="tabs"><a aria-current="page"><span class="dot"></span>總覽</a><a>服務</a></div>
</div>
```

```js
// 選取框游走 + 公式列同步
var cells=[].slice.call(document.querySelectorAll('.cell[data-ref]')),i=0;
function sel(n){cells.forEach(c=>c.classList.remove('sel'));var c=cells[n];c.classList.add('sel');
 ref.textContent=c.dataset.ref;formula.textContent=c.dataset.formula;}
sel(0); setInterval(()=>{i=(i+1)%cells.length;sel(i);},2600);
```

驗收標準：一個從未看過 MINGSUAN 的 AI，只讀本 SKILL.md，就能替任何「以數字與表格為核心」的產業，做出同樣以試算表為介面隱喻、借貸雙色、2px 網格、side-rail 導覽的瑞士國際主義網站。
