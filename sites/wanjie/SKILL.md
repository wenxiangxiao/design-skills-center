---
name: laid-cordage
description: A soft pastel craft-studio style where every image is a rope rendered as laid cord from an over/under crossing sequence — thick outlined strands, fibre-twist highlights, dusty naturals on cool sage, generous whitespace, and no external images at all.
---

# 絞繩纖索風 Laid-Cordage

> 一套從「繩結」長出來的視覺語言。所有圖像都是某條繩照 over／under 交叉序列畫出來的**絞股 laid cord**，換一串交叉就換一張圖。粗描邊、纖維高光、粉彩自然色、大量留白，像一本會被人翻到起毛邊的繩結手冊。

## 一、設計哲學

- **交叉即美術**：不放任何裝飾插圖或照片。招牌、favicon、結譜縮圖、比較器縮圖、研習印記，全是繩股引擎照某串交叉序列生成的繩。線有語意（哪一股在上、哪一股在下），不是純裝飾。
- **會不會鬆，是結構問題不是外觀問題**：視覺服務一個信念——結的成敗寫在交叉序列的奇偶性裡。因此圖像刻意把 over／under 畫清楚，讓人一眼看出「誰壓在誰上面」。
- **溫柔但不含糊**：粉彩、留白、軟襯線給人可以慢慢學、打錯不要緊的安全感；但每個判定（成結／滑脫）都是硬的。柔皮膚、硬骨架。
- **去AI化**：無米白紙感底、無高彩撞色、無圓角卡片牆、無 emoji、無跑馬燈當反射動作、無「把 X 變成 Y」句式。

## 二、色彩系統

| 色 | hex | 用途 | 比例 |
| --- | --- | --- | --- |
| 霧鼠青 sage | `#C9D2C6` | 全站大面積地色（帶灰冷調，非米白紙感） | ~46% |
| 麻棕 oat | `#E9E1CF` | 面板、卡片、繩身主色、側桿底 | ~24% |
| 樹皮墨 bark | `#3A362E` | 內文、標題、繩股外緣描邊、2px 分格線 | ~14% |
| 陶土 clay | `#C67C58` | 作用色：現用態、CTA、滑脫警示、另一股繩、進度 | ~9% |
| 丹寧 denim | `#8FA3AB` | 次級文字、連結、另一股繩（雙色繩對比） | ~5% |
| 紙 paper | `#F1ECDE` | 編結墊、卡片內底、按鈕底 | 面板內 |
| 成結綠 good | `#6F9C6A` | 只用於「成結 HOLDS」徽章與最佳解列 | <2% |

規則：底一律冷霧鼠青，不用暖米白。狀態不靠多色霓虹，靠**陶土（作用／警示）vs 成結綠（通過）** 兩支語意色；繩的兩股固定用麻棕系與丹寧藍拉開對比，讓交叉的上下讀得出來。

## 三、字體系統

- **標題／數字**：`Fraunces`（opsz 軟襯線，900）配 `Noto Serif TC`（900）。給 craft 的手感與人味，字重大但不張揚。
- **內文**：`Noto Sans TC`（400／500／700），行高 1.72，段落舒朗。
- **標籤／交叉碼／量值**：`IBM Plex Mono`（400／500／600），字距 .1–.24em，全大寫英文小標。
- 字級 scale：hero 26–46px、H2 21–30px、內文 15.5–16px、標籤 11–12px。行高：標題 1.06–1.08、內文 1.72。

## 四、版面與網格

- **雙欄殼**：桌機 `96px 繩耳側桿 + 1fr 內容`。側桿 sticky 滿高，內容置中最大寬 820–1080px（依頁面資訊量）。
- **極疏**：section 間距 30–46px，卡片內距 16–24px，大量留白是風格的一部分——不要把版面填滿。
- **無圓角**：一律 `border-radius:2px`（近乎直角），2px 樹皮墨實線分格，重點處左邊框加粗到 8px（callout／result）。
- 不對稱：hero 用「編結墊（左）＋文案面板（右）」不等寬雙欄；資訊列橫貫、統計數字沿底線排。

## 五、元件配方

- **繩耳側桿 nav（cordloop-rail）**：左緣 `.rail`，內含一段垂繩與四個繩耳連結；現用頁 `aria-current="page"`，繩耳 SVG 換成「收束的小平結」造型並翻陶土色，其餘為鬆開的開口 bight（丹寧色）。行動版 `≤860px` 隱藏側桿，改頂部 `.mtop` sticky 橫向捲動列（品牌＋膠囊連結，現用翻陶土）。
- **按鈕**：實心＝樹皮墨底＋紙色字；`.ghost`＝透明底＋墨框。2px 框、2px 圓角、hover 只做 .12s 背景／位移。
- **卡片**：`border:2px solid bark`，頭圖區白底（`.paper`）＋底部 2px 分隔，圖為繩股引擎縮圖。無模糊陰影。
- **選項（opt／choice）**：2px 框紙底，選中翻淺綠底＋綠框；圓形 tick。
- **表單**：`input.t` 2px 框、focus 時 2px 陶土 outline；錯誤訊息用 mono 小字。三步進度條 `on／done` 分別陶土／成結綠。
- **footer**：麻棕底、三欄、頂部 2px 分格，底部一條 mono 版權列（含建置模型與虛構聲明）。

## 六、動效規則

- **核心無補間依賴**：所有狀態變化（繩重畫、成結／滑脫翻牌、表格重排）都是即時重繪，不靠飛入動畫承載資訊。
- 允許的細節：按鈕 hover 背景 .12s、`:active` translateY(1px)、choice hover 背景。duration 一律 ≤.12s，easing 用預設 ease。
- **禁用作為簽名**：揭示淡入、數字計數／滾動、按壓硬陰影、stroke-dashoffset 描繪、跑馬燈、自動輪播、自動播放。
- `@media(prefers-reduced-motion:reduce){*{transition:none!important;animation:none!important}}`；因無自動動畫，reduced-motion 下功能不減。

## 七、插畫與圖像風格（cordage-crossing）

- **唯一渲染器**：`renderDiag(id, arg)` 讀一個結的有序繩段清單（後畫者在上＝z 序），逐段以 `cord(d,col,w)` 畫成三層 laid cord：
  1. 樹皮墨外緣（`w+3.4`）＝繩股邊；
  2. 色身（麻棕或丹寧，`w`）＝繩芯；
  3. 白色半透明虛線（`dasharray 1.6 5.2`, `w*0.26`）＝絞股的 lay 斜向高光。
- **over／under 自動生成**：不畫斷口，靠繪製順序——上面那一股後畫，其外緣自然蓋住下面那一股，交叉即成。要切換上下（如平結 vs 假結），只需交換兩繩段的 z 序。
- **繩端**：`endcap()` 畫一枚 whipped 圓頭，標示繩尾。
- **桿／樁**：以扁平雙色描邊 bar 表示（`post:true`），與繩股區分。
- 同一串交叉恆得同一張圖；研習印記由「稱呼＋手機＋梯次」FNV-1a 雜湊挑一個結，同輸入恆得同印。

## 八、Logo 與 Favicon 設計指南

- **Logo**：一枚平結交叉圖（兩股麻棕／丹寧互鎖）＋「綰結所」襯線字＋mono 英文小標。整個 mark 就是 `renderDiag` 的輸出，不是另畫的圖形。
- **Favicon**：32×32 inline SVG data URI，霧鼠青底上一組互鎖的雙股（陶土＋丹寧）交叉，粗描邊確保小尺寸可讀。全站 `<head>` 內嵌，不連外。

## 九、Do & Don't

**Do**
- 底用冷霧鼠青、繩用麻棕＋丹寧雙股拉開對比、作用色只給陶土。
- 每一張圖都由交叉序列生成；換圖＝換一串交叉。
- 把 over／under 畫清楚，讓人讀得出誰在上面。
- 留白留足，粗描邊、直角、mono 小標。

**Don't**
- ✗ 不用米白紙感底、不用高彩撞色、不用圓角卡片牆。
- ✗ 不用照片或任何外部圖片（僅 Google Fonts）。
- ✗ 不用揭示淡入／數字計數／硬陰影／dashoffset 當動效簽名，不放跑馬燈。
- ✗ 不用 emoji 當 icon；icon 一律是繩股 SVG。
- ✗ 不宣稱工程承載數據——繩結指標為教學示意，需標明。

## 十、頁面骨架範例

```html
<div class="shell">
  <aside class="rail"><!-- cordloop-rail：現用頁繩耳收束成結翻陶土 --></aside>
  <main class="main">
    <div class="wrap bench">
      <div class="bench-grid">
        <div class="mat"><svg id="knotsvg" viewBox="0 0 120 120"><!-- renderDiag 輸出 --></svg></div>
        <div class="panel">
          <p class="eyebrow">綰結所 · 編結台</p>
          <h1>先把繩打過去，再看它會不會鬆。</h1>
          <div class="choices"><!-- 逐手選 over／under --></div>
          <div class="verdict"><!-- 成結 HOLDS / 滑脫 SLIPS --></div>
        </div>
      </div>
    </div>
  </main>
</div>
```

```js
// laid cord：後畫者在上，交叉的 over/under 由 z 序決定
function cord(d,col,w){
  return path(d,BARK,w+3.4)+path(d,col,w)+path(d,'#fff',w*0.26,'1.6 5.2');
}
// 平結 vs 假結：只交換第二個交叉的 z 序
// reef  = [下股, 上股]        → 互鎖成結
// granny= [上股, 下股, 誤交叉] → 平行滑脫
```
