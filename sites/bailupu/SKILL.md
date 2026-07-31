---
name: ballot-paper-pastel
description: Taiwanese official ballot-paper pastel style — multi-tint government paper stocks, ink-ruled bureaucratic tables, vermilion chop stamps as active state, and tally-mark (正字) counting as the site's only numeral animation.
---

# 選票紙粉彩風 Ballot-Paper Pastel

## 設計哲學

台灣選務現場的紙感官僚美學：不同選舉用不同粉彩色的公務選票紙，桌上是墨線壓出的表格，唯一的高彩是圈選章的朱紅印泥。這個風格的三個支柱：**（1）四色紙各司其職**——整站每一頁是一張不同色的公務紙，色彩即分頁；**（2）表格即版面**——資訊裝在 2px 墨線的公文表格裡，密而有序，拒絕卡片浮影；**（3）章即狀態**——「現在／選中／完成」一律用一枚歪斜的朱紅圈選章表達，不用高亮色塊。莊重但不冷酷，官僚但誠實；所有動態都應該像「開票所裡真的會發生的動作」：唱一張、記一筆、蓋一章。

## 色彩系統

| 色 | HEX | 用途 | 比例 |
|---|---|---|---|
| 選票淡綠 | `#D8E4CF` | 第一頁地色（各頁換色：淡黃 `#F3E9C6`／淡藍 `#D9E3EE`／淡粉 `#F0DAD3`） | 40% |
| 紙白 | `#FBF8EF` | 面板、表格底——只作浮在粉彩紙上的「另一張紙」，禁止鋪滿整頁 | ≤25% |
| 舊紙 | `#F3EEDD` | 表頭、次面板 | 8% |
| 墨 | `#262119` | 全部文字、1–2.5px 表格線、正字筆畫 | 15% |
| 選務深綠 | `#3F5A45` | 頁首尾深色帶、主按鈕、mono 標籤 | 10% |
| 印泥朱紅 | `#C0392B` | **只給**圈選章、現用態、警示、循環——唯一高彩 | ≤6% |
| 次墨 | `#4C463A` | 註記、輔助字 | 少量 |

地色可疊 `repeating-linear-gradient(0deg, rgba(38,33,25,.03) 0 1px, transparent 1px 7px)` 的細橫紋模擬紙纖維。禁止漸層底、禁止彩色陰影。

## 字體系統

- 標題：**Noto Serif TC 900**，letter-spacing `.1em`–`.14em`，1.3–1.5rem——公家機關牌匾感。
- 內文：**Noto Sans TC 400/500/700**，15px／line-height 1.75–1.85。
- 編號、代碼、欄位標籤：**IBM Plex Mono 400/600**，0.58–0.72rem，letter-spacing `.15em`–`.25em`，常配深綠色。
- 數字盡量以正字（tally）或表格呈現；mono 數字只作讀值，不做滾動動畫。

## 版面與網格

- 主欄 900–1180px 置中；段落 max-width 72–80ch。
- 章節以「壹貳參肆＋2px 底線的 mono 小標」開頭，替代大 hero。
- **開場即工作物件**：首屏直接是一張可操作的表（開票報告表／報名單），無標語、無雙按鈕、無三卡片。
- 表格：`border-collapse:collapse`，外框 2–2.5px、內線 1–1.5px 全用墨色；表頭用舊紙底＋mono 小字。
- 全站零圓角、零模糊陰影；唯一投影是導覽選票的 `4px 4px 0` 硬偏移。

## 元件配方

- **導覽（ballot-cell）**：一張直式迷你選票固定於右上（`position:fixed`），四格＝四頁，每格「圓圈號次＋頁名＋mono 英文小字」；現用頁蓋一枚朱紅圈選章（兩個微旋轉錯位的 `<ellipse>` 描邊，粗 3px＋細 1.6px，`rotate(-8deg)`）。≤900px 塌成底部四格橫列。頁尾另備完整文字連結保底。
- **按鈕**：2px 墨框＋紙白底；主按鈕深綠底白字；hover 換淡黃底。無圓角。
- **章（chop）**：一律 SVG 雙橢圓描邊、微旋、不透明度 .55–.9；印記類（回執、修了證）中央放一枚三節點對決圖。
- **表單**：欄位標籤用 mono 小字；錯誤訊息 mono 朱紅；步驟條是三格橫列，現用格深綠反白。
- **頁首尾**：深綠帶＋3px 墨線收邊；頁尾四欄（地址／站內／資訊／所訓）。

## 動效規則

- **正字積筆**：計數的原子動畫。每一筆是一條 `stroke-linecap:round` 的 SVG 線，橫筆 `scaleX(0→1)`、豎筆 `scaleY(0→1)`，120–130ms ease-out，`transform-origin` 在筆畫起點；每筆帶 ±1.2deg 的決定性抖動（hash 而非 random）。一事件一筆，禁止數字滾動補間。
- **唱票節拍**：逐張模式 340ms／張、連唱 70ms／張，用 `setTimeout` 鏈非 CSS 動畫，可暫停。
- **蓋章**：章以顯示/隱藏切換即可，不做彈跳。
- `prefers-reduced-motion`：筆畫動畫關閉、唱票直接整批記完，功能與判定完全不變。
- 禁止：跑馬燈、進場淡入揭示、stroke-dashoffset 描繪、按壓硬陰影位移、autoplay。

## 插畫與圖像風格（tally-tournament）

全站不畫任何裝飾插圖。僅有的兩種圖像原語：

1. **正字**（個體計數）：五筆一字（橫、中豎、右短橫、左豎、底橫），一筆＝一票，筆序不可亂；轉移票用第二色（藍灰 `#5F7C9B`）續畫。
2. **對決圖**（群體偏好）：候選人為圓節點（環形排列），每對之間一根箭頭指向**輸家**，線寬 `1.2 + 票差×0.14`（上限 5px），旁標 mono 比數；全勝者節點填朱紅；無全勝者時找一條三循環、整圈塗朱紅；平手畫虛線。每張圖都能讀回全部兩兩比數。

logo、favicon、案例縮圖、印記皆由這兩種原語組成。禁止 emoji、禁止外部圖片、禁止與數據無關的裝飾線條。

## Logo 與 Favicon 設計指南

Logo＝淡綠方紙上一個粗筆正字，外套一枚微旋朱紅圈選章（雙橢圓），右側直排所名（Serif 900）＋mono 英文。favicon 用同構圖的 inline SVG data URI（64×64：綠底、5px 正字、5px 紅圈）。

## Do & Don't

**Do**：每頁換一色紙；把資訊裝進表格；用章表達狀態；數字能用正字就用正字；平手規約、誠實聲明這類「制度細節」直接寫成頁面內容。
**Don't**：紫藍漸層、置中大標＋雙按鈕 hero、三圓角卡片、emoji icon、Lorem ipsum、米白紙鋪滿整頁、數字滾動動畫、把朱紅用在非狀態性的裝飾上、真實政黨或現實候選人的任何影射。

## 頁面骨架範例

```html
<body><!-- 地色=本頁選票紙色 -->
  <header class="top"><!-- 深綠帶：logo + 所名 + mono 副標 --></header>
  <nav class="piao"><!-- 右上固定迷你選票，四格，現用格蓋章；≤900px 塌成底欄 --></nav>
  <main>
    <section class="report"><!-- 首屏：紙白工作表（2.5px 墨框），直接可操作 --></section>
    <section class="sec">
      <div class="secno">壹 · 章節</div><h2>章節標題</h2>
      <table><!-- 墨線公文表格 --></table>
    </section>
    <div class="note"><!-- 朱紅左框誠實聲明 --></div>
  </main>
  <footer><!-- 深綠四欄 + mono 版權列 --></footer>
</body>
```
