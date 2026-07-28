---
name: noir-case-file
description: A tungsten-lit noir corkboard aesthetic — manila evidence cards pinned on dark cork, joined by a single oxblood-red string, built for interfaces where the content is a chain of reasoning.
---

# 黑色卷宗風 Noir Case-File

> 一句話：把介面做成一塊鎢絲燈下的軟木案情板——牛皮卷宗卡用圖釘釘在深色軟木上，之間只用一條血紅的紅線串起。留給「內容本身是一條推論鏈」的網站。

## 設計哲學

這個風格服務一種特定的內容：**推理**。它的核心信念是「合理不等於推得出」——畫面上每一張卡片是一條可被檢驗的主張，每一條紅線是一步被宣稱的推論，而版面刻意做得像一份被攤開、被連線的辦案卷宗。因此它拒絕乾淨、拒絕留白、擁抱資訊密度：線索牆該塞滿就塞滿，紅線該交錯就交錯。

三個不可退讓的原則：
1. **暖的暗，不是冷的黑。** 底色是被鎢絲燈燻黃的軟木與牛皮，不是儀器面板的冷灰。暗是為了讓紙、圖釘與紅線發亮，不是為了科技感。
2. **紅線只有一種紅，而且很少。** 血紅（oxblood）是全站唯一的高彩色，只給紅線、現用態與指認。紅線一多就廉價，一稀有就有力。
3. **卡片是物件，不是色塊。** 每張卡有圖釘、有微旋轉、有投影，像真的被按在板上。避免圓角卡片＋模糊陰影的 AI 套版。

## 色彩系統

| 用途 | Hex | 佔比 | 說明 |
|---|---|---|---|
| 頁面底／近黑暖底 | `#17120C` | ~30% | body 背景，帶褐的近黑 |
| 軟木板 | `#241C12` / `#2E2417` | ~18% | 案情板主體，用 repeating-radial 疊出軟木顆粒 |
| 深板／面板底 | `#1B140B` | ~12% | 側欄、讀出區、頁尾 |
| 牛皮卷宗（線索卡） | `#CBB489` | ~14% | 線索卡、導覽卡、檔案卡 |
| 紙白（推論卡） | `#E7DCC0` | ~6% | 推論／指認卡，比線索卡更亮 |
| 骨白（正文） | `#EDE3CE` | ~10% | 深底上的主要文字 |
| 墨（描邊／深字） | `#141009` | 邊框與淺底上的字 |
| **血紅 oxblood** | `#A32A22` / `#7E1C16` | ≤6% | **唯一高彩色**：紅線、現用態、指認、警示 |
| 鎢絲琥珀 | `#D69A3C` | ~5% | 圖釘、連結、高亮、次要強調 |
| 綠印 verdigris | `#5E8A6E` | <3% | 嚴格只給「查核 ✓／成立」的成功回饋 |

配色語言：暖褐三階（底→板→卡）撐起大面積，骨白承載閱讀，血紅極少量地標記「當下正在推的那條線」，琥珀是燈光。**不要**引入第二個高彩色；成功用 verdigris 綠、其餘一律靠明度與紅／琥珀分工。

## 字體系統

- 標題：`Noto Serif TC` 900 —— 沉、重、方正，像卷宗封面的鉛印標題。
- 內文：`Noto Sans TC` 400/500/700。
- 打字機／圖章／標籤：`Special Elite` —— 老打字機質感，用於卷宗編號、圖章（「查核 ✓」「結案 ●」「留位成功」）、小標。這是本風格的靈魂字，別省。
- 編號／代碼：`Space Mono` 400/700 —— 案號、時間戳、統計數字。

字級：hero 標題 31–34px、區塊標題 24–26px、卡片標題 12.7–16px、內文 15.5–16.5px、mono 標籤 9–12px。行高內文 1.72–1.75、標題 1.15。字距：mono 標籤 `.08–.18em`，血紅 eyebrow 用大寫拉開 `.16em`。

## 版面與網格

- 導覽固定左緣直桿（88px），主內容 `padding-left:88px`；≤840px 轉底部 64px dock。
- 案情板：`padding-bottom:70%` 撐出寬高比的相對定位舞台，卡片以百分比 `left/top` 絕對定位、`transform:translate(-50%,-50%)` 置中，線索卡加 `rotate(±1.4–1.6deg)` 的微歪。紅線用一層覆蓋全板、`viewBox="0 0 100 100"`、`preserveAspectRatio="none"` 的 SVG，line 座標用百分比即時計算。
- 卡片寬 `20.5%`（min 120 / max 172px），彼此可重疊——密度是特色。
- 一般內容區塊窄欄（max 820px）利於閱讀；卡牆與檔案格用寬欄（max 1180px）。
- 硬邊：所有邊框 2–3px 實線 `#141009`，投影一律硬陰影 `box-shadow:Npx Npx 0 rgba(0,0,0,.5)`，**無圓角、無模糊陰影**。

## 元件配方

**導覽（redstring-index rail）**：左緣深板直桿，一條 `linear-gradient` 紅線貫穿；四張牛皮索引卡 `rotate(-2deg)`、頂端 `::before` 一枚圓形圖釘。現用頁：卡翻紙白、`rotate(0) translateY(-4px)`、圖釘轉血紅並 `::after` 拉一小段紅線把它「提起來」。≤840px 轉底部 dock、取消旋轉與圖釘、現用頁下緣 4px 血紅。

**線索卡 `.card.clue`**：牛皮底、圖釘 `.pin`、mono 小標「線索」、serif 卡名、內文。微旋轉。可點選為前提來源（`.sel` 時血紅 dashed outline）。

**推論卡 `.card.node`**：紙白底、含前提計數與「查核」鈕（打字機字、深板底）。成立後翻淡綠 `.verified` 並貼旋轉的「查核 ✓」圖章；指認卡 `.acc` 紅邊，結案時翻 `.solved` 貼血紅「結案 ●」。

**按鈕**：主行動血紅底＋黑邊＋硬陰影＋serif 900；次要 `.ghost` 深板底。查核／小鈕用打字機字。

**表單**：label serif 700，input 深板底＋1.5px 墨邊、focus 琥珀 outline，錯誤訊息淡紅、成功淡綠；必填星號血紅。多步驟以頂部三格 step 指示器，現用格血紅。

**footer**：深板底、三欄（介紹／聯絡／索引），末尾 `.disc` 小字免責＋建置模型尾註。

## 動效規則

克制是原則——本風格的簽名是邏輯查核，不是動畫。
- 卡片 hover／現用：`transform .12–.14s`（旋轉歸零、微位移）。
- 紅線：**即時出現，不用 dashoffset 描繪動畫**（刻意避開全館過載語彙）；連線或查核後重繪。
- 查核失敗：卡片 `shake .3s`（±4% 位移）後即停。
- 成立圖章：直接出現，無淡入計數。
- `prefers-reduced-motion`：`*{transition:none!important;animation:none!important}`——紅線與圖章即時、無抖動，核心玩法不減。

## 插畫與圖像風格（suspect-dossier）

全站零外部圖片，所有圖像由幾何原件程序生成：
- **嫌疑人像**：`genMug(seed)` 以 mulberry32(FNV(案號)) 決定膚色／髮型／五官幾何，畫成鎢絲燈下的檔案人像（身高刻度背板＋頭形 path＋耳／眉／眼／鼻／嘴線條＋底部姓名牌與紅線虛線）。同案號恆得同人像。
- **推論鏈示意**：牛皮方塊＋紅線＋圖釘的節點圖。
- **推論印記／章**：`genSeal(seed)` 由報名資料 hash 生成一圈圖釘與其間的紅線交叉，作為留位印記。
- 分工不可對調：圖釘恆琥珀或骨白、線恆血紅、卡恆牛皮／紙白、底恆深褐。

## Logo 與 Favicon 設計指南

Logo＝一塊深板上四枚圖釘（琥珀＋骨白各二）被血紅紅線交叉串起，外框墨線——即「案情板」的縮影。Favicon 用同一母題的極簡版：對角兩條紅線＋三枚圖釘，寫成 inline SVG data URI 放 `<head>`；`assets/logo.svg` 為放大版靜態檔。無 JS 亦可見。

## Do & Don't

**Do**
- 用暖褐三階＋骨白撐大面積，血紅極少量地標記「當下這條線」。
- 讓卡片像被釘在板上：圖釘、微旋轉、硬陰影。
- 打字機字用在圖章與編號，建立辦案卷宗的語感。
- 密度是特色：線索牆該滿就滿。
- 圖像全部程序生成、同輸入恆同輸出。

**Don't（含去AI化禁令）**
- 不用紫藍漸層、不用圓角＋模糊陰影卡片、不用 emoji 當 icon（icon 一律自繪 SVG）。
- 不引入第二個高彩色搶血紅的戲。
- 紅線不用 dashoffset 描繪動畫當簽名（全館過載）。
- 不用「EST. 19xx」徽章、不用「老街屋改建」開場、不用「把 X 變成 Y」標題。
- 不用 Lorem ipsum 與 AI 腔；文案用冷靜理性的調查員短句，行話從推理長出（前提、蘊涵、臆測、肯定後件、紅鯡魚）。
- 不把暗底做成冷灰儀器面板——這裡的暗是暖的紙與燈。

## 頁面骨架範例

```html
<nav class="rnav" aria-label="主導覽">
  <span class="thread" aria-hidden="true"></span>
  <ul>
    <li><a href="index.html" aria-current="page">案情板<span class="en">CASE BOARD</span></a></li>
    <li><a href="dang.html">檔案室<span class="en">ARCHIVE</span></a></li>
    <li><a href="fa.html">推理法<span class="en">METHOD</span></a></li>
    <li><a href="ru.html">入社<span class="en">JOIN</span></a></li>
  </ul>
</nav>

<div class="board" id="board">
  <div class="inner">
    <svg class="strings" viewBox="0 0 100 100" preserveAspectRatio="none"></svg>
    <div class="card clue" style="left:16%;top:16%">
      <span class="pin"></span><span class="tag">線索</span>
      <span class="ttl">鑰匙只有兩把</span>
      <span>全世界只有兩把鑰匙……</span>
    </div>
    <div class="card node" style="left:58%;top:47%">
      <span class="pin"></span><span class="tag">推論</span>
      <span class="ttl">當晚在場的持鑰者是周敬</span>
      <span class="cnt">0 前提</span>
      <button class="vbtn">查核這一步</button>
    </div>
  </div>
</div>
```

核心 CSS 變數：

```css
:root{
  --bg:#17120C; --board:#241C12; --manila:#CBB489; --paper:#E7DCC0;
  --bone:#EDE3CE; --ink:#141009; --string:#A32A22; --amber:#D69A3C; --seal:#5E8A6E;
  --tw:'Special Elite',monospace; --serif:'Noto Serif TC',serif;
  --sans:'Noto Sans TC',sans-serif; --mono:'Space Mono',monospace;
}
```

驗收：一個從未看過本 Demo 的 AI，只讀本 SKILL 就能做出一個「鎢絲燈下的軟木案情板」——牛皮卡釘在深褐板上、單一血紅紅線串連、打字機圖章、零外部圖片、暖暗而非冷黑。
