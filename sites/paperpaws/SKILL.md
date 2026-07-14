---
name: papercut-picturebook
description: Children's picture-book warmth built from torn-paper collage — layered cut-paper shapes, rounded Baloo display type, hard offset shadows, dashed cut edges and a scissor motif.
---

# 剪紙繪本風 Papercut Picture-book

把童書繪本的溫度，用「剪紙拼貼（papercut collage）」的手作質感做成網站。適合寵物、親子、手作、食品、幼教等需要親切、可信、去距離感的品牌。核心信念：介面像一本可以翻的繪本，每個色塊都像被手撕、手剪出來的。

## 設計哲學

- **手工感勝過完美**：形狀不追求數學般的圓角矩形，而是像剪紙——邊緣可帶虛線（裁切線）、輕微旋轉、硬陰影，像貼在紙上。
- **繪本敘事**：文案口語、溫暖、具體，像大人蹲下來對小孩說話。避免行銷腔與空話。
- **透明可信**：價格、時間、地址寫清楚；把「不加價、不關籠、一對一」這種承諾放在顯眼處。

## 色彩系統

| 色票 | HEX | 用途 | 比例 |
|---|---|---|---|
| 奶油紙 cream | `#FBF3E4` | 頁面底色（帶顆粒點紋） | 34% |
| 淺卡其 paper2 | `#F4E7CF` | 次底、地圖、色塊層 | 10% |
| 陶土橘 terra | `#E8734A` | 主色：CTA、標題強調、主角剪紙 | 18% |
| 葉綠 leaf | `#6FA663` | 次色：eyebrow、價格、分隔帶 | 10% |
| 天空藍 sky | `#7BB7D4` | 點綴剪紙、分隔帶 | 8% |
| 陽光黃 sun | `#F4C445` | 高亮標籤、選中 chip、星星 | 6% |
| 莓紫 plum | `#B85C7A` | hover 態、鼻子、口部細節 | 4% |
| 墨棕 ink | `#3A2B22` | 內文、3px 描邊、硬陰影 | 10% |

底色鋪極淡圓點顆粒：`background-image:radial-gradient(rgba(58,43,34,.05) 1px,transparent 1px);background-size:5px 5px`（半調紙感）。

## 字體系統

- **標題／品牌**：`Baloo 2` 700/800（圓潤童書體），撐起繪本的親切感。
- **內文**：`Noto Sans TC` 400/500/700，`line-height:1.65`，清楚好讀。
- **標籤／價格／座標**：`Space Mono`，大寫 + `letter-spacing:.08–.14em`，替價格與資訊帶來一點手作標籤感。
- 字級 scale：hero 34–66px、H2 26–44px、內文 15–17px、mono 標籤 11–12px。

## 版面與網格

- **topbar 導覽**：sticky 頂列，膠囊按鈕（`border-radius:22px`），CTA「預約」用陶土橘 + 3px 墨邊 + `box-shadow:3px 3px 0 ink`。行動版收成 mtoggle 全寬選單。
- **form-first 開場**：首頁 hero 左側直接放一張「配方案」互動表單卡（chip 單選 + 送出即時估價），右側放剪紙拼貼。表單就是主視覺，不是附屬。
- 卡片可帶 ±0.6–1.4° 輕微旋轉，hover 回正 + 上浮 + 硬陰影，模擬「貼紙／剪紙」。
- 章節之間用「剪刀裁切帶」分隔（見動效）。

## 元件配方

- **剪紙卡 card**：`background:white;border:3px solid ink;border-radius:18px`，`:nth-child` 給不同旋轉角，hover `transform:rotate(0) translateY(-4px);box-shadow:6px 8px 0 ink`。
- **chip 單選**：`border:2.5px solid ink;border-radius:20px`，選中 `aria-pressed=true` → 陽光黃底 + 2px 硬陰影 + 微位移；JS 以 `.set` 群組單選。
- **按鈕**：陶土橘底、3px 墨邊、圓角、硬位移陰影；hover 轉莓紫 + 位移。
- **表單 input**：`border:2.5px solid ink;border-radius:12px`，focus 換陶土橘邊 + inset 陽光黃光暈。
- **footer**：墨棕深底、奶油字、陽光黃小標，底部必附虛構聲明。

## 動效規則

- **剪刀裁切帶（signature 之一）**：區塊分隔用一條實色帶，中央一條 `border-top:3px dashed`（裁切虛線）+ 一把 SVG 剪刀。剪刀 `left` 隨頁面捲動百分比移動（rAF 節流），像正在把版面剪開。
- **剪紙視差拼貼（signature 之二）**：hero 拼貼各 `.layer` 標 `data-depth`，`mousemove` 時依深度反向位移 `translate`，形成多層紙材景深。
- **配方案揭示**：表單送出 → 結果區 `display:block` + `@keyframes pop`（scale .96→1）彈入，並依選項即時算出估價與推薦美容師。
- 全站提供 `@media(prefers-reduced-motion:reduce)`：關閉所有 animation/transition，`.layer` 不位移，剪刀靜止，結果直接顯示。

## 插畫與圖像風格（papercut 剪紙拼貼）

- 主角（狗、貓）全為 **inline SVG 剪紙**：以簡化色塊堆疊五官，`filter:drop-shadow(3px 4px 0 rgba(58,43,34,.25))` 模擬紙的落影；耳朵用三角尖片。
- 圖示（服務項目）同樣手剪風，不用線描；地圖用色塊街廓 + 剪紙圖釘。
- 禁止照片、禁止 emoji icon、禁止細線幾何線描（thin-lineart）、禁止漸層。

## Logo 與 Favicon

- 字標：陶土橘圓形肉球（含奶油色肉墊、一顆綠色趾墊做記憶點，邊緣虛線）＋ Baloo 2「紙爪 / Paper Paws」。
- Favicon：奶油底方塊內同一枚剪紙肉球，inline SVG data URI 寫進 `<head>`。

## Do & Don't

- ✅ 手撕感色塊、虛線裁切邊、硬位移陰影、輕微旋轉。
- ✅ 溫暖口語文案；價格與承諾寫清楚。
- ✅ form-first 讓互動即主視覺。
- ❌ 不用紫藍漸層、不用圓角模糊陰影的 AI 卡片。
- ❌ 不用 emoji icon（一律剪紙 SVG）、不用 Lorem ipsum、不用照片。
- ❌ 不用細線幾何線描（thin-lineart）當插畫語言。

## 頁面骨架範例

```html
<header><div class="bar">
  <a class="logo"><img src="assets/logo.svg"></a>
  <nav class="top"><a href="#">首頁</a><a class="book" href="#">預約</a></nav>
</div></header>

<div class="hero">           <!-- form-first：表單即主視覺 -->
  <form class="finder">…chip 單選 + 即時估價…</form>
  <div class="collage">…剪紙 SVG .layer[data-depth]…</div>
</div>

<div class="cutline">       <!-- 剪刀裁切帶 signature -->
  <span class="dash"></span><span class="scissor">✂ SVG</span>
</div>
```

```css
.card{border:3px solid #3A2B22;border-radius:18px;transform:rotate(-1.2deg)}
.card:hover{transform:rotate(0) translateY(-4px);box-shadow:6px 8px 0 #3A2B22}
.pcut{filter:drop-shadow(3px 4px 0 rgba(58,43,34,.25))} /* 紙落影 */
```
