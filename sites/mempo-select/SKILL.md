---
name: memphis-postmodern
description: Postmodern Memphis-Milano web style — saturated clashing color blocks, dots/squares/triangles, a Bacterio squiggle backdrop, thick 3px black outlines, hard offset shadows, deliberately skewed right angles, and a playful catalog-first layout with confetti-burst micro-interactions.
---

# 孟菲斯 Memphis（Postmodern Memphis-Milano）

> 本 SKILL 定義一整套視覺語言。任何 AI 只要讀完，就能替**任意產業**做出風格一致的網站——風格不綁定「選物店」這個題材。孟菲選物所 MEMPO 只是它的一次示範。你可以拿它做兒童教育、冰淇淋店、獨立唱片、文具品牌、展覽或任何想「吵一點、好笑一點」的品牌。

---

## 一、設計哲學

孟菲斯（Memphis）是 1981 年由 Ettore Sottsass 在米蘭發起的後現代設計運動，核心是**反對「好品味」的拘謹**：家具與物件可以很吵、很好笑、又很好用。轉譯到網頁：

1. **色塊優先，不靠漸層**：用飽和的實心色塊直接撞在一起，禁止柔和漸層與模糊陰影。
2. **幾何是語彙不是裝飾**：圓點、方塊、三角、半圓、鋸齒、Bacterio 塗鴉——這些是「說話的方式」，成組出現。
3. **歪一點才對**：直角故意旋轉 1–2 度、卡片錯位堆疊，拒絕置中對稱的安全感。
4. **好用還要有脾氣**：再實用的元件也要有一個記得住的形狀。功能與玩心並存。

去AI化重點：**不是靠圓角卡片＋紫藍漸層裝可愛，而是靠色塊碰撞、粗描邊與不對稱錯位**。

## 二、色彩系統

| 角色 | Hex | 用途 | 大約比例 |
| --- | --- | --- | --- |
| 紙奶油 Cream | `#F4EEE2` | 頁面主底 | 40% |
| 亮紙 Paper | `#FBF8F0` | 卡片／區塊底 | 20% |
| 墨黑 Ink | `#17161B` | 描邊、文字、footer | 18% |
| 芥黃 Yellow | `#FFC93C` | 主重點、價格標、logo 底 | 8% |
| 珊瑚紅 Coral | `#FF5B4A` | 次重點、hover、current | 6% |
| 湖水綠 Teal | `#17B3A3` | 點綴、斜切帶 | 4% |
| 鈷藍 Cobalt | `#2B4CF0` | 標籤、強調字、visit 區 | 3% |
| 淺紫 Lilac | `#C9A7FF` | 底紋、卡片變化 | 1% |

原則：**一屏至少三種強色同時出現且互相碰撞**；黑色只用純黑做描邊與字，不用灰階陰影。所有色都是實心，禁止任何漸層。

## 三、字體系統

- **顯示字**：`Archivo Black`（超粗黑無襯線，line-height .98，letter-spacing -.01em）——標題、logo、footer 巨字。
- **內文**：`Space Grotesk`（400/500/700）——有幾何個性的無襯線，內文與導言。
- **標籤／數據**：`DM Mono`（400/500）——分類、價格、eyebrow、mono 註記，字距拉開 1–3px。
- 字級 scale：巨標 `clamp(38px,8vw,84px)`／區塊標 24–40px／小標 17–20px／內文 15–17px／標籤 11–14px。
- 標題大量使用 `em` 換色（同一句裡一個詞染珊瑚、一個詞染湖水綠）。

## 四、版面與網格

- **catalog-first 開場**：首頁**不做大標 hero**，首屏直接是「選品貨架」——一個 12 欄 grid，卡片用 `span 3/4/5/6/7` 做出不等寬的錯落。頂部只有一條細 strip（logo＋一句話＋計數），開門見山。
- 12 欄 grid（`repeat(12,1fr)`，gap 16px），行動裝置降為 6 欄。
- **錯位堆疊**：三格區塊讓中間一格 `translateY(14px)`；斜切宣言帶用 `transform:rotate(-1.2deg)` 外層、內層再 `rotate(1.2deg)` 校正文字。
- 留白靠色塊與粗線切割，不靠大量空白；區塊之間用 3px 實線分隔。
- 全站鋪一層固定 **Bacterio 底紋**（squiggle＋點＋三角的 SVG tile，opacity .5，pointer-events none）。

## 五、元件配方

- **描邊**：一律 `border:3px solid #17161B`，無圓角（`border-radius:0`）。
- **硬位移陰影**：hover 時 `transform:translate(-2px,-2px);box-shadow:4px 4px 0 #17161B`；active 時位移歸零、陰影消失（吃下去的按壓感）。**不使用模糊陰影**。
- **nav = bottom-dock**：固定底部欄，`border-top:3px solid`，中間用圓點分隔項目；current 項目染珊瑚紅底白字；hover `translateY(-4px)` 加硬陰影。body 需 `padding-bottom` 留出 dock 高度。
- **按鈕**：實心色塊＋3px 描邊＋DM Mono 字；主按鈕 hover 換珊瑚底。
- **卡片（選品）**：`border:3px solid`，內含 SVG 幾何插畫（art 區）＋名稱＋價格標（芥黃底描邊）＋加入鈕；右上角可掛一個黑底標籤（NEW IN／限量／熱賣）。
- **價格標**：`DM Mono`、芥黃底、2px 描邊、`padding:2px 8px`，永遠不換行。
- **表單／列表**：raw table 風——`border:3px`、列與列 3px 實線分隔、偶數列換底、hover 整列染淺紫。
- **footer**：黑底、芥黃巨字品牌名、DM Mono 免責與說明。

## 六、動效規則

| 動效 | 觸發 | 參數 | 說明 |
| --- | --- | --- | --- |
| 進場揭示 reveal | IntersectionObserver（threshold .12–.14） | `opacity 0→1`, `translateY(16px)→0`, .5s cubic-bezier(.2,.8,.2,1) | 逐區塊浮現 |
| 選物袋翻動 bagpop | 點「加入選物袋」 | .4s cubic-bezier(.3,1.6,.5,1)，scale 1→1.35＋rotate -6deg→1 | 計數＋1 並彈跳 |
| **幾何碎片彈射 burst** | 點加入鈕 | 生成 10 個方/圓/三角碎片，`element.animate` 向隨機方向飛散 650–900ms | 從卡片中心炸開，落地移除 |
| **游標噴濺拖尾 trail** | pointermove（節流 38ms） | canvas 粒子，重力 .04、life -.02/frame，方/圓/三角三形 | 僅 `pointer:fine` 且非 reduced-motion |
| 篩選切換 | 點 chip | 即時顯示/隱藏卡片 | aria-pressed 切換色 |

**動效簽名（本站獨有）**：幾何碎片彈射 ＋ 游標幾何噴濺拖尾 ＋ 選物袋翻動計數，三者合一。
`prefers-reduced-motion:reduce` 時：關閉所有 animation/transition、reveal 直接顯示、隱藏游標 canvas、取消旋轉。

## 七、插畫與圖像風格（illust：flat-shape 色塊構成）

- 全部用**原創 inline SVG 幾何色塊**：物件用圓、方、三角、半圓、梯形組裝，配 3px 黑描邊，實心撞色。
- 禁止細線單線描（thin-lineart）與寫實漸層；造型走「畢卡索式拆解＋孟菲斯撞色」。
- 底紋用 Bacterio squiggle tile（波浪線＋點＋空心三角）。
- 位置圖／資訊圖也用同一套幾何語言（色塊街廓＋三角圖釘）。

## 八、Logo 與 Favicon

- **Logo**：左側一個芥黃方塊內含黑色空心圓＋珊瑚半月＋鈷藍菱形的幾何堆疊；右側 `Archivo Black` 字標＋DM Mono 副標；底部一條湖水綠 squiggle。
- **Favicon**：inline SVG data URI——芥黃方底＋黑色空心圓＋珊瑚 squiggle，32×32。

## 九、Do & Don't

**Do**：飽和實心撞色、3px 純黑描邊、硬位移陰影、幾何色塊插畫、錯位不對稱、catalog-first 開門見山、bottom-dock 導覽、Bacterio 底紋。
**Don't**：❌ 紫藍漸層 hero ❌ 置中大標＋三張圓角卡片模板 ❌ emoji 當 icon ❌ 模糊陰影／圓角 rounded-2xl ❌ Lorem ipsum 與 AI 腔 ❌ 跑馬燈反射式套用 ❌ 灰階與柔和低飽和配色 ❌ 對稱置中的安全版面。

## 十、頁面骨架範例

```html
<header class="strip">
  <img class="logo" src="assets/logo.svg" alt="品牌">
  <span class="say">一句標語</span>
  <button class="bag">袋 <b id="bagN">0</b>件</button>
</header>

<main class="wrap">
  <!-- catalog-first：首屏即貨架，不做大標 hero -->
  <section class="grid">
    <article class="obj s5">
      <span class="tag">NEW IN</span>
      <div class="art"><!-- 原創幾何 SVG --></div>
      <div class="meta"><span class="name">品名</span><span class="price">NT$0,000</span></div>
      <button class="add">＋ 加入選物袋</button>
    </article>
    <!-- …更多不等寬卡片 span 3/4/6/7 錯落 -->
  </section>

  <section class="band"><div class="wrap"><h2>斜切宣言</h2></div></section>
</main>

<nav class="dock">
  <a href="index.html" aria-current="page">首頁</a><span class="dot"></span>
  <a href="page2.html">內頁</a><span class="dot"></span><a href="page3.html">關於</a>
</nav>
```

CSS 關鍵：`border:3px solid #17161B; border-radius:0;` 為所有框；hover `translate(-2px,-2px)+box-shadow:4px 4px 0 #17161B`；斜切帶 `rotate(-1.2deg)` 外層＋內層 `rotate(1.2deg)`；固定 Bacterio 底紋層 `position:fixed;opacity:.5;pointer-events:none`。
