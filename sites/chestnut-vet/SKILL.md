---
name: storybook-picturebook
description: A children's picture-book web style — hand-drawn crayon-outline SVG illustrations, warm watercolor palette on textured cream paper, rounded friendly display type, wobbly offset shadows and storybook narration, with an interactive hand-drawn map opening, a full-screen picture-book menu, and a peel-away page-corner turn as motion signatures.
---

# 兒童繪本風（Children's Picture Book / Storybook）

> 本 SKILL 定義一整套視覺語言。任何 AI 只要讀完，就能替**任意產業**做出風格一致的網站——風格不綁定「動物醫院」這個題材。栗子動物醫院只是它的一次示範；你可以拿它做獨立書店、幼兒園、麵包坊、露營品牌、小農市集或親子餐廳。
>
> **核心心法**：繪本風不是「加幾張可愛插圖」，而是把整個網站當成一本會翻頁的圖畫書——有封面（地圖）、有敘事口吻、有手感的線條與紙。溫柔，但不幼稚；手繪，但排版嚴謹。

---

## 設計哲學

1. **整站是一本書**：每頁都有封面感與翻頁動作，導覽像目錄，敘事用第一人稱、像鄰居說故事，而不是條列賣點。
2. **手的溫度**：線條要有蠟筆的粗細與微微歪斜，色塊像水彩填不滿邊。避免任何「向量完美」的冰冷感。
3. **暖，且有紙**：底色永遠是帶紋理的米白紙，不是純白；配色取自自然（栗棕、葉綠、天藍、暖黃、莓紅）。
4. **克制的可愛**：靠插畫與口吻可愛，不靠 emoji、不靠圓角氾濫。字體圓潤即可，版面仍要有秩序。

## 色彩系統

| 角色 | Hex | 用途 | 比例 |
|---|---|---|---|
| 紙米 paper | `#FBF3E4` | 頁面底色（配紙紋噪點） | 基底 |
| 栗棕 ink | `#4A3526` | 描邊、文字、所有 stroke | 線條主色 |
| 栗子紅 nut | `#B5552F` | 主強調、屋頂、footer 底 | 強調 |
| 葉綠 leaf | `#7A9A5B` | 自然元素、次強調 | 輔助 |
| 天藍 sky | `#8FC1D4` | 告示牌、窗、涼色點綴 | 輔助 |
| 暖黃 sun | `#F2C14E` | 高亮、按鈕、螢光筆底線 | 點綴 |
| 莓紅 berry | `#C8607A` | 落葉、腮紅、活潑點 | 點綴 |

所有描邊統一用栗棕 `#4A3526`，`stroke-width` 2.4–3.6，圓端點圓轉角——這是繪本一致性的關鍵。

## 字體系統

- 標題／品牌／數字：**Baloo 2**（700–800），圓潤飽滿的展示字；中文接 `"Noto Sans TC"` 700/900。
- 內文：**Noto Sans TC**（400–500），行高放寬到 1.75，讀起來鬆軟。
- 字級 scale：全螢幕選單巨字 `clamp(38px,9vw,84px)` / 頁面標題 `clamp(28px,5vw,50px)` / 區塊標題 `clamp(22–24px,3.4vw,38px)` / 內文 14.5–16px。
- 標題可加螢光筆底線：`background:linear-gradient(transparent 62%,var(--sun) 62%)`。

## 版面與網格

- 容器 `max-width:1040px` 置中，`padding:0 22px`。
- **開場用 map-first**（本站示範）：首頁 hero 是一張佔滿寬度的手繪地圖（`viewBox` SVG），四周有裝飾框與投影，站點可互動。
- 卡片刻意輕微旋轉（`rotate(-1.4deg)`～`rotate(1.2deg)`）製造「貼上去」的手作感，hover 時轉正並上浮。
- 硬投影 `box-shadow:5–6px 5–6px 0` 栗棕半透明，不用模糊陰影——這是繪本的「厚紙」感。

## 元件配方

**紙紋底**：`body::before` 疊一層 `feTurbulence` SVG 噪點，`opacity:.06`，破除數位平滑。

**頂列 + 漢堡（hamburger-full）**：頂列只放 Logo 與一顆蠟筆漢堡鈕（暖黃底、3px 栗棕框、硬投影、按下位移）。點擊開啟 `position:fixed;inset:0` 的全頁 `.overlay`，內含巨字選單，每個連結配一枚自繪 line icon 與一行 `small` 說明。

**按鈕**：實心色 + 3px 栗棕框 + `box-shadow:3–4px 3–4px 0` 硬投影，hover 位移放大投影，`:active` 壓下。

**卡片**：白底 3px 栗棕框、大圓角（22–24px）、硬投影、微旋轉。左圖右文。

**告示牌／緞帶**：用天藍或葉綠色塊做「木牌」感的資訊區，內嵌白底表格（看診時間）。

**表單（繪本紙條）**：input 用紙米底 + 栗棕框 + 圓角，focus 時 `outline` 暖黃。表單為示範性質，`submit` 時 `preventDefault` 並顯示友善提示，不真送資料。

**書頁角（signature）**：`position:fixed` 右下角，用 CSS 三角形（`border-width:0 0 110px 110px`）做折起的頁角，hover 時三角變大（`border-width` → 150px），內含旋轉 45° 的「翻頁」文字並連到下一頁。

## 動效規則

| 動畫 | 觸發 | duration / easing |
|---|---|---|
| 地圖大頭針彈跳 bounce | 常駐 | 2.4s `ease-in-out` |
| 落葉飄落 fall | 常駐 | 9–15s `linear` |
| 地圖站點標籤 | hover / focus | opacity .2s |
| 書頁角捲起 | hover | border-width .3s ease |
| 卡片轉正上浮 | hover | transform .2s |
| 全螢幕選單開啟 | click | fade .3s |

全部包在 `@media (prefers-reduced-motion:reduce)` 內關閉彈跳、落葉與選單動畫。

## 插畫與圖像風格

零外部圖片。一切自繪：地圖（山丘、河流、虛線小徑、樹、房子、動物、指北針）、動物角色（狗、貓、兔、鼠——圓身體、點眼、腮紅）、醫師肖像（圓臉、簡化髮型、腮紅）、路線圖。統一栗棕描邊、水彩色塊、圓潤造型。動物要有一點「怕生但可愛」的表情。

## Logo 與 Favicon

Logo：一顆擬人化的栗子（栗棕身體 + 深棕殼帽 + 點眼 + 腮紅 + 微笑），右接 Baloo 2 圓體品牌字與副標。Favicon：同一顆栗子縮成 32×32 的圓角 inline SVG data URI 寫在 `<head>`。

## Do & Don't

**Do**：手繪蠟筆線、紙紋底、暖水彩色、圓體字、硬投影、微旋轉、第一人稱敘事口吻、統一栗棕描邊。
**Don't**：❌ emoji 當 icon（動物一律自繪）❌ 純白背景 ❌ 模糊柔陰影卡 ❌ 冷色調或霓虹 ❌ AI 腔賣點文案 ❌ 跑馬燈 ❌ 向量完美無歪斜的線條（會失去手感）。

## 頁面骨架範例

```html
<div class="bar"><a class="logo">…</a><button class="menu-btn">☰</button></div>
<div class="overlay">        <!-- hamburger-full 全螢幕繪本選單 -->
  <nav><a>栗子鎮地圖<small>…</small></a>…</nav>
</div>
<div class="maph">…封面標語…</div>
<div class="mapframe"><svg viewBox="0 0 800 470"> …手繪地圖＋可互動站點… </svg></div>
<div class="band"><div class="cards"><article class="card">…手繪動物插畫…</article></div></div>
<a class="corner" href="next.html"><div class="fold"></div><div class="txt">翻頁 →</div></a>   <!-- 書頁角 -->
<footer>…虛構聲明…</footer>
```

涉及費用、地址、人物等內容一律標示「皆為虛構示意」。
