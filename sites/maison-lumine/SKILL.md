---
name: luxury-boutique-style
description: Build quiet, luxurious boutique-brand websites with ivory/champagne-gold palettes, hairline rules, thin serif typography, single-line SVG art, and slow elegant motion.
---

# Luxury Boutique Style 奢華精品風格規格書

以 Maison Luminé 洛米內婚紗（台北高端婚紗攝影工作室）為參考實作。目標：任何 AI 讀完本文件，即可重現同等級的「安靜、貴氣」精品官網。核心心法一句話——**克制就是奢華，留白就是設計**。

---

## 一、設計哲學

1. **安靜優先。** 精品感來自「少」：少色、少字重、少動作。任何元素若拿掉後版面沒有變差，就拿掉。
2. **留白就是內容。** 區塊間距寧可過大不可過小；文字欄寬控制在 50–58ch，讓每段話有呼吸。
3. **線，不是塊。** 分隔靠 1px 髮絲線與細邊框，不用色塊、陰影、圓角卡片。
4. **金色是香水，不是油漆。** 金色只出現在：小標眉題、羅馬數字、hover 底線、細框、插畫輔線。永遠不做大面積金色背景。
5. **慢。** 所有動效 duration 至少 0.7s，快的動畫會顯得廉價。
6. **文案克制。** 語氣像一位不需要推銷的老師傅：短句、具體細節（時間、地點、數字）、不用驚嘆號、不自誇「頂級」「極致」。

## 二、色彩系統

| 角色 | Hex | 佔比 | 用途 |
|---|---|---|---|
| 象牙白（底） | `#F6F3EC` | ~70% | 全站背景 |
| 暖紙白 | `#FBF9F4` | ~10% | footer、卡片式區塊的微差底色 |
| 墨黑（主文字） | `#211E19` | ~12% | 標題、正文、主線條插畫 |
| 香檳金（主金） | `#B2925A` | ~4% | 眉題、羅馬數字、hover 線、細框 |
| 淡金 | `#CDB88C` | ~2% | 插畫輔線、圓環、selection 底色 |
| 灰褐（次文字） | `#7A7264` | 輔助 | 說明文字、footer 文字 |
| 髮絲線 | `#E4DDCE` | 輔助 | 所有 1px 分隔線、插畫地面線 |

**金色使用紀律**：金色元素在單一視窗畫面內不超過 5 處；禁止金色大字標題、金色按鈕填色（僅允許 hover 時反轉填入）、金色漸層。墨黑不用純黑 `#000`，象牙白不用純白 `#FFF`——低飽和暖色調是整個氣質的地基。

## 三、字體系統

Google Fonts 三件組：

```
Cormorant Garamond (300/400/500 + italic)  → 英法文標題、數字、價錢
Noto Serif TC (200/300/400)                → 中文正文與中文標題
Jost (300/400)                              → 眉題、nav、按鈕等小型 UI 文字
```

**混排規則**：
- 大標以 `font-family:'Cormorant Garamond','Noto Serif TC',serif` 宣告——拉丁字用 Cormorant、中文自動 fallback 到 Noto Serif TC，字重一律 300。
- 法文／英文點綴詞（La Philosophie、Les Œuvres）用 Cormorant **italic** 400，色用灰褐或金。
- 中文標題 `letter-spacing:.1em–.4em`；越短的字距越大（如「微 光」用 .4em）。
- UI 小字（nav、眉題）：Jost 300、10.5–12.5px、`letter-spacing:.28em–.42em`、`text-transform:uppercase`。
- 正文：Noto Serif TC 300、15–16px、`line-height:2`、`letter-spacing:.04em`。
- 價格與編號永遠用 Cormorant（serif 數字比 sans 貴氣）。

## 四、版面與網格

- 內容最大寬 `1120px`，左右 padding 桌機 48px、行動 26px。
- **區塊垂直間距 ≥ 110px**（hero 上下更大：210px／90px）。段落間 24–26px。
- 主要版式為不對稱雙欄：`grid-template-columns: .9fr 1.1fr`（或 1.4fr 1fr 1fr 的 footer），交錯排列圖文（`nth-child(even)` 對調順序）。
- Hero 至少 `min-height:100vh`，文字靠左、插畫靠右淡出，底部放一個極小的「Défiler／scroll」提示。
- 留白比例原則：**任一畫面中，空白面積 ≥ 內容面積**。若一屏塞了三個以上訊息單元，拆頁或刪。

## 五、元件配方

### Nav
固定頂端；`rgba(246,243,236,.88)` + `backdrop-filter:blur(8px)`；下緣 1px 髮絲線。左側 monogram SVG（34px）＋ Cormorant 字標（行動版隱藏字標留 monogram）。右側 3–4 個 Jost 小字連結＋一顆 1px 金框「預約」按鈕（hover 填金、字轉象牙白）。當前頁連結加 `aria-current`，底線常駐。

### 羅馬數字編號
章節一律 `I. II. III.`，Cormorant italic、金色、`letter-spacing:.14em`。章節頭配方：`羅馬數字 + 中文標題 + 法文斜體` 三件並排 baseline 對齊，下接一條髮絲線（`margin:34px 0 70px`）。

### Hairline
`height:1px; background:#E4DDCE; border:none`。用於：章節線、列表項分隔、表格列、footer 上緣。清單項目配方：無 bullet，`li::before{content:'—'; color:#CDB88C}`。

### 列表式方案列（可點擊整列）
grid `70px 1fr auto auto`；hover 時整列 `padding-left` 緩推 20px，且底部金線 `width:0→100%`（0.9s）。不用卡片。

### 表單
輸入框只有**底線**：`border:none; border-bottom:1px solid #E4DDCE`，focus 時底線轉金（transition 0.8s）。label 用 Jost 小字大字距。送出鈕＝1px 金框透明底，hover 填金。禁止圓角、盒陰影、填色輸入框。

### Footer
底色暖紙白＋上緣髮絲線。三欄：品牌字標＋一句話／站內連結／聯絡資訊。最下方 copyright 列用 Jost 10.5px 大字距，左右對齊兩則短句。

### Favicon
Inline SVG data URI：深底圓＋monogram 線條，與 logo 同一套幾何。

## 六、動效規則

| 動效 | Duration | Easing | 備註 |
|---|---|---|---|
| 進場 fade＋上移 30px | **1.1s** | `cubic-bezier(.19,1,.22,1)` | IntersectionObserver `threshold:0.18`，觸發一次即解除觀察 |
| 進場層疊延遲 | +0.15s/層 | 同上 | 最多 `.d3`（0.45s），再多顯得拖 |
| SVG 描線 | **3s–3.2s** | 同上 | `pathLength="1"` + `stroke-dasharray:1; stroke-dashoffset:1→0`；同圖多線各 +0.35–0.4s 延遲 |
| hover 金底線展開 | 0.7–0.9s | 同上 | `transform:scaleX(0→1)`，`transform-origin:left` |
| 按鈕 hover 填色 | 0.7–0.8s | 同上 | 背景與文字色同時過渡 |

鐵律：**沒有任何動效短於 0.6s**；不用 bounce／elastic；不用 loop 動畫。`@media (prefers-reduced-motion: reduce)` 時：reveal 直接可見、描線 `stroke-dasharray:none` 且 `animation:none`、transition 全關、`scroll-behavior:auto`；JS 端偵測到 reduce 時直接為所有目標加 `.visible`。

## 七、插畫與圖像風格

全站**禁止外部圖片**，一切視覺用「單線條藝術」SVG：

1. **筆觸**：`fill:none`、`stroke-linecap:round`；主體線 `#211E19` 1.3–1.6px，第二層 `#B2925A` 1–1.2px，氛圍線 `#CDB88C` 0.9–1px，地面線 `#E4DDCE` 1px。一幅圖 3–5 條 path，不要更多。
2. **畫法**：用長弧線 C 指令連綿描形，模擬「一筆畫」；輪廓寧可斷在優雅處，也不畫閉合寫實形。題材：新娘剪影、頭紗、捧花、緞帶、對戒、山線、建築立面、側臉肖像。
3. **肖像**：只畫外輪廓＋一兩筆五官暗示（眉眼一條短弧），絕不畫完整五官。
4. **構圖**：主體置中偏上，底部一條淺色地面弧線收住重心。
5. 每條要描線動畫的 path 加 `class="draw" pathLength="1"`。
6. Logo monogram：細線圓環＋墨黑 M＋金色 L 交疊＋頂端小菱形，全幾何線條，可縮至 16px 仍可辨。

## 八、Logo 與 Favicon 指南

- Monogram 結構：外圈雙細環（金＋髮絲色）、字母以 2–3px 圓頭線條手繪路徑（不用 text 依賴字體）、一個小菱形點綴、下方 Cormorant 字標＋中文小字大字距。
- Favicon：同一 monogram 簡化為「深底圓＋雙字母線條」，以 URL-encoded inline SVG data URI 置於 `<link rel="icon">`，避免多一個請求。
- 禁止：盾牌、翅膀、複雜花環、漸層填色。

## 九、Do & Don't

**Do**
- 大量留白；一屏一件事。
- 1px 線條做所有分隔與強調。
- 中法（或中英）混排點綴，斜體 serif 當香氣用。
- 具體可信的文案：價位帶寫「NT$ 68,000 起」、流程寫「拍攝前 90–120 日」。
- 動效慢而少，hover 永遠有一條金線在慢慢走。

**Don't**
- 禁紫藍漸層、任何高飽和色、任何 emoji icon。
- 禁三張等寬圓角卡片並排的模板版式；禁盒陰影堆疊。
- 禁 Lorem ipsum；禁 AI 腔（「開啟您的夢幻旅程」「極致奢華體驗」）。
- 禁快動畫（<0.6s）、彈跳、無限旋轉。
- 禁外部圖庫照片、icon font；圖像一律原創 SVG 線條。
- 禁把版面塞滿——猶豫時，刪。

## 十、頁面骨架範例

```html
<!DOCTYPE html>
<html lang="zh-Hant">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>頁面名｜品牌名</title>
  <link rel="icon" href="data:image/svg+xml,...monogram...">
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,400&family=Jost:wght@300&family=Noto+Serif+TC:wght@200;300;400&display=swap" rel="stylesheet">
  <style>
    :root{ --ivory:#F6F3EC; --paper:#FBF9F4; --ink:#211E19; --gold:#B2925A;
           --gold-soft:#CDB88C; --muted:#7A7264; --hairline:#E4DDCE;
           --ease-lux:cubic-bezier(.19,1,.22,1); }
    /* base → nav → 章節元件 → footer → motion → reduced-motion → RWD */
  </style>
</head>
<body>
  <header class="nav"> monogram ＋ 字標 ｜ 連結×3 ＋ 金框 CTA </header>
  <main>
    <section class="hero"> 眉題(Jost 金) → 大標(Cormorant/Noto 300) → 斜體副標 → 線條插畫 </section>
    <section> <!-- 章節頭：I. ＋ 中文 ＋ 法文斜體，髮絲線 -->
      不對稱雙欄（引文 vs 說明 / 插畫 vs 圖說）
    </section>
    <section class="invite"> 置中短邀請語 ＋ 金線連結 </section>
  </main>
  <footer> 三欄：品牌／站內連結／聯絡 ＋ copyright 列 </footer>
  <script> IntersectionObserver 加 .visible；prefers-reduced-motion 時全部直接可見 </script>
</body>
</html>
```

每頁單檔（CSS/JS inline）、頁面間相對路徑互連、nav 與 footer 逐字一致。
