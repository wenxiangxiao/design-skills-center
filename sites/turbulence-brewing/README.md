# 亂流製造 Turbulence Brewing — 野獸派範例網站

台南虛構精釀啤酒廠「亂流製造 Turbulence Brewing」的完整品牌範例站，
示範 **野獸派（Brutalism）** 網頁風格：亮底、粗暴、靜態張力大於動畫。

> 本站所有品牌、酒款、地址、電話、證號皆為虛構，僅供設計風格示範。

## 檔案結構

```
turbulence-brewing/
├── index.html      首頁：品牌宣言、招牌酒款列表、酒廠理念與數據表
├── beers.html      酒款目錄：7 款酒、原創 SVG 酒標、點擊展開規格表
├── taproom.html    酒吧資訊：地址、營業時段、現壓價目、活動日曆、SVG 位置圖
├── assets/
│   └── logo.svg    原創 logo（亂流方塊＋中文字標＋mono 副標）
├── README.md       本檔
└── SKILL.md        風格規格書（brutalist-raw-style），供 AI／設計師重現此風格
```

## 預覽方式

每頁皆為單檔 HTML（CSS/JS 全部 inline），直接用瀏覽器開啟即可：

```
open index.html
```

唯一外部資源為 Google Fonts（Archivo Black / Space Mono / Noto Sans TC）；
離線開啟仍可瀏覽，僅字體退回系統字。

## 風格摘要

- **色彩**：警示黃 `#FFD400`（底）＋純黑 `#000000`（線與塊）＋刺眼橘紅 `#FF3E00`（點綴），白 `#FFFFFF` 做局部提亮。
- **字體**：中文標題 Noto Sans TC 900、英文展示字 Archivo Black、標籤與數據 Space Mono。
- **版面**：超大標題撞左邊（負 margin）、中英文字直接堆疊、3px 黑色網格線外露、rotate 印章元素壓在標題上。
- **元件**：粗框表格不修飾、mono 編號標籤（T-01、SEC.01）、marquee 跑馬燈、hover 全面反色（黃黑互換）。
- **動效**：只有三種——marquee、hover 反色、點擊展開規格；全部附 `prefers-reduced-motion` 降級。
- **圖像**：全部原創 inline SVG（酒標、位置圖、favicon、logo），幾何硬邊、限用品牌三色、不用漸層不用圓角。

詳細規格（色彩比例、網格規則、元件配方、Do & Don't、可複製的頁面骨架）見 [SKILL.md](SKILL.md)。

## 合規標示

依台灣菸酒管理相關規範，三頁 footer 均固定標示：

- **未滿十八歲禁止飲酒**
- 酒後不開車，安全有保障／飲酒過量，有害健康
