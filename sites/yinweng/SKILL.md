---
name: shoyu-tone-ladder
description: A soy-sauce brewery style built on a single twelve-step ink ladder of one hue — every colour on the page is a measurement, the only second colour is a vermilion reserved for what has been destroyed, and every image is a vessel section solved from real process parameters.
---

# 蔭甕墨階風 Shoyu Tone-Ladder

## 一、設計哲學

這個風格來自一座黑豆蔭油老廠的甕埕：一整排陶甕、一張記錄紙、一支筆。它的核心信念有四條：

1. **顏色是一個讀數，不是一個裝飾。** 全站只有一個色相的十二個階（醬色階 0–11）。畫面上任何一塊顏色都必須能回答「這是第幾階、量的是什麼」。挑不出讀數的顏色不准出現。
2. **第二個顏色只留給不可回復的事。** 硃紅只出現在「這一甕已經毀了」「這筆錢賠出去了」「這個欄位填錯了」三種地方，全站占比 <2%。因為它稀有，所以它一出現，使用者立刻知道發生了不能收回的事。
3. **紙是稀缺的。** 大面積是甕與埕（深階），紙面（淺階）只給一張——那張記錄紙。內容不是鋪在紙上，紙是被搬進畫面的一件物。
4. **不知道就寫不知道。** 這個風格的資訊層級裡永遠有一個「未讀」狀態，而它不是灰掉的骨架屏，是一個有形狀、有材質、明確表示「這裡面有東西但你還沒付出代價」的封閉物。

## 二、色彩系統

十二階醬色階是全站唯一的色票來源，`--g0` 最淡（生汁）到 `--g11` 最濃（老甕墨底）：

| 變數 | 色票 | 用途 | 比例 |
|---|---|---|---|
| `--g11` | `#160E06` | 頁首尾、導覽柱、輪廓線、正文於紙上的字 | 約 12% |
| `--g10` | `#2B1B0C` | **body 大面積地色** | 約 40% |
| `--g9` | `#3E2814` | 面板底、卡片底、表單 fieldset | 約 16% |
| `--g8` | `#54391D` | 分隔線、格線、次級邊框 | 約 6% |
| `--g7` `--g6` | `#6A4B2A` `#82613A` | 甕身、chip 邊、封甕斜線 | 約 5% |
| `--g5` `--g4` | `#9A7A4F` `#B09368` | 標籤、mono 小字、圖表軸線 | 約 5% |
| `--g3` `--g2` | `#C4AB82` `#D6C19D` | 內文、次級文字、圖上的點 | 約 8% |
| `--g1` `--g0` | `#E4D4B7` `#F0E4CD` | **記錄紙／回執面板**、按鈕底、強調文字 | 約 8% |
| `--zhu` | `#B7301E` | **只給「已破壞／已賠償／輸入錯誤」** | <2% |

規則：地色是深階不是紙白（`paper-light` 在本風格是禁的——紙只作為一件被放進來的物件）。任何新色都必須先能被寫成「第 n 階」；寫不出來就不要用。硃紅永遠不作背景大面積，只作線、叉、框、單一數字。

## 三、字體系統

- 標題／品名／按鈕：`Noto Serif TC` 900，字距 `.05–.3em`。中文標題永遠帶字距，因為這是印在木牌與玻璃瓶上的字。
- 內文：`Noto Sans TC` 400/500/700，`16px`，行高 `1.78`，段寬上限 `66ch`。
- 讀數、標籤、單號、圖表刻度：`IBM Plex Mono` 400/500，`.6–.78rem`，字距 `.1–.28em`；大讀數 `2rem`。
- 僅 Google Fonts。字級階：`.6 / .66 / .7 / .78 / .84 / .9 / .94 / 1.06 / 1.16 / 1.9 / 2rem`。
- 數字一律 `font-variant-numeric: tabular-nums`——這個風格裡數字會被互相比較。

## 四、版面與網格

- 桌機右緣固定 88px 導覽豎欄（見五之一），主內容 `max-width` 依頁面性質分三種：工作台 1180px、圖鑑 1120px、文件 820–900px。
- **全站無圓角、無模糊陰影、無卡片浮起。** 邊框一律 2px 實線 `--g11`，內部分格用 1px `--g8`。
- 工作台頁採「左場 — 右紙」：左邊是被操作的物（甕埕 6×6 網格），右邊是一張 sticky 的紙（記錄），下方是被選中那一件的籤。三塊用 CSS Grid areas 排，≤1000px 疊成單欄且紙不再 sticky。
- 地色上疊兩層質感：`feTurbulence` 噪點（opacity .5 的圖層內再乘 .06）＋每 5px 一條 3% 亮線的水平纖維紋。這兩層合起來讓深色底看起來像陶、不像黑卡片。
- 文件頁的 h2 一律左邊 6px 實線 `--g6` 起手，配一行 mono 章號。

## 五、元件配方

### 5.1 導覽（spigot-column 取汁栓柱）

`position:fixed` 右緣 88px，底 `--g11`、左緣 2px `--g8`。欄內以 `preserveAspectRatio="none"` 拉一張甕壁剖面 SVG（兩條微彎的側線＋三條腹線）當背景。每一頁是一個「取汁栓」：44×26 的 SVG，右側 8px 是甕壁，栓由一塊 15×8 的木塞與一顆握頭組成。

- 現用頁 `aria-current="page"`：`.plug{transform:translateX(-11px)}`（栓被拔出來），`.flow{opacity:1}`（一道 2.3px 的醬液從孔口流出）。過渡 `.32s cubic-bezier(.3,.9,.3,1)`，是全站唯二的 transition。
- 每個栓下方恆有中文單字（`Noto Serif TC` 900）與說明小字，不靠圖形辨識。
- ≤900px：整條落成底部 66px 的四格 dock，隱藏栓與甕壁，現用格 `inset 0 3px 0 var(--zhu)` 上緣。頁尾另備完整文字連結。

### 5.2 三態物件（本風格的核心元件）

任何「有內容但尚未取得」的資料都用同一組三態渲染，不要用 spinner、不要用灰骨架：

1. **封（sealed）**：物件輪廓完整、內部填 38° 斜線 pattern（`--g9` 底 `--g7` 線），頂上加一片竹笠。語意是「有東西，你還沒付代價」。
2. **部分（partial）**：物件仍是封的，但下緣多一條 7px 的色階條——那是你用便宜手段量到的唯一一個數，並在左側加一枚硃紅的栓與一滴垂流。
3. **開（open）**：內部依真實參數分層渲染（清液／醪／渣三層，色階由淺到深各差一階，液面一枚 ry=4.2 的橢圓），並疊一個 4px 硃紅的叉。**叉不是錯誤，是不可回復。**

### 5.3 按鈕

主按鈕 `--g1` 底 `--g11` 字 2px 框；次按鈕透明底 `--g5` 框；破壞性動作用 `.btn.zhu`（硃紅底）。hover 一律換底色，禁止位移與陰影。`:focus-visible` 用 3px 硃紅 outline offset 2px。disabled 為 `--g7` 底 `--g4` 字。

### 5.4 紙面板

`background:var(--g1); color:var(--g11); border:2px solid var(--g11)`。紙上的表格 th 用 `--g3` 底、格線 `--g4`；紙上的說明字用 `--g7`。**紙面板不得超過畫面的四分之一**，否則整站會塌成米白紙感站。

### 5.5 墨暈格（記錄紙）

6×N 的方格陣列（`--g2` 底、每格 `--g1`）。一筆量測 = 一格內三層同心圓：`b1` inset 0 opacity .42（色階 −1）、`b2` inset 14% opacity .72（色階本身）、`b3` inset 32%（色階 +1）。這是本風格的插圖與資料視覺化的最小單位。作廢的墨暈 `opacity:.34` 並橫劃一條 1.6px 線——**墨不擦掉，只作廢**。

### 5.6 表單

欄位 `--g1` 底 2px `--g11` 框，`fieldset` 深階底、`legend` 反白紙色小牌。錯誤時該欄位 `.bad`：框轉硃紅、底轉 `#F6DED9`，錯誤訊息硃紅粗體出現在欄位正下方，不用彈窗、不用 icon。

### 5.7 頁尾

`--g11` 底、2px `--g8` 上框、三欄（廠址與時間／頁面／園規）。最後一行 mono 小字寫明虛構聲明。

## 六、動效規則

本風格只有兩種動效，其餘一律靜止：

1. **墨暈滲染（signature）**：`@keyframes bleed{from{transform:scale(.14);opacity:.2}to{transform:scale(1);opacity:1}}`，`.74s cubic-bezier(.2,.85,.3,1) both`。只在「產生一筆新的量測」時觸發一次，且**永不反向**——這個動畫沒有退出動畫，因為墨不會回到筆裡。
2. **拔栓位移**：導覽現用頁的 `translateX(-11px)`，`.32s cubic-bezier(.3,.9,.3,1)`。

禁止：進場揭示、數字計數／滾動、按壓硬陰影、`stroke-dashoffset` 描繪、跑馬燈、自動輪播、hover 位移、視差捲動、任何 autoplay。
`prefers-reduced-motion: reduce` 下 `*{transition:none!important;animation:none!important}`——墨暈直接以最終狀態出現，功能完全不變。

## 七、插畫與圖像風格（jar-stratum 甕層剖面）

**本風格不畫插圖，只解甕。** 每一張圖都是同一支引擎依一組真實製程參數（日程、氮、鹽度、走味與否、釉況）解出來的容器剖面。三個必要原語，缺一即退化：

1. **甕形**：`viewBox 0 0 100 124`，肩部外擴、腹部最寬、口沿是獨立的 46×8 矩形。內側另有一條 inset 4 的 path 專作 `clipPath`。
2. **分層**：填充由下而上是渣（色階 +2）／醪（+1）／清液（本階），厚度比 0.20 : 0.36 : 0.44 乘上填充率；液面一枚淺兩階的橢圓。**分層不是裝飾，厚度是質量平衡的結果。**
3. **狀態痕跡**：浮沫（液面附近 0–4 顆 `--g2` 半透明圓）、鹽霜（肩上 14 顆微點）、釉痕（四種決定性曲線之一）、生白膜（走味時液面一片 12 邊不規則 `--g0` 多邊形）。

同一支引擎必須同時產出：商標、favicon、工作台上的每一甕、圖鑑的每一張、回執上的印。**全站不得有任何一張外部圖片，也不得有一張是手描的示意圖。** 圖表（散布圖、OC 曲線）由同一組色階畫成，軸線 `--g8`、點 `--g2`、主曲線 `--g1`、判準線硃紅。

與相近技法的分界：這不是 `xylem-section`（那畫的是生物體的解剖組織，明暗來自孔隙密度），不是 `terrazzo-section`（那是三維嵌石在某深度的斷面族），不是 `laguerre-foam`（那是共壁鋪滿平面的胞）。本技法畫的是**一個封閉容器內、一段製程走到某一天的內容物分布**，而且它有一個「看不見」的合法狀態。

## 八、Logo 與 Favicon

- **Logo**：左邊一枚 0.46 倍的甕（腹部一片墨階液體），右邊十二根遞增的色階柱（第 i 根填 `--g{i}`、高度 `11+i*2.6`、y 隨階數上移），上方壓兩個 900 字重的中文字。整組是「一甕＋它的色階尺」。
- **Favicon**：inline SVG data URI，`--g10` 底、`--g7` 甕身配 5px `--g0` 描邊、腹部 `--g11` 液體、口沿 `--g5`。極小尺寸下仍可辨識為「一個有蓋的容器」。
- 兩者都由同一支引擎函式輸出，不得另外手繪一版。

## 九、Do & Don't

**Do**

- 先想清楚「這個顏色是第幾階」再用它。
- 讓「未知」有形狀。封甕、斜線、竹笠——不確定性要看得見、摸得到。
- 把模型的簡化寫在頁面上（本站有一節叫〈誠實聲明〉）。反直覺的真話是最好的文案材料。
- 數字一律等寬、右對齊、可互相比較。
- 每一張圖都要能被讀回它的參數。

**Don't**

- ❌ 紫藍漸層、任何第二個色相（硃紅除外，且只給不可回復之事）。
- ❌ 米白紙感當地色。紙是物件不是背景。
- ❌ 圓角、模糊陰影、卡片浮起、玻璃擬態。
- ❌ emoji 當 icon；本風格的 icon 一律是甕、栓、墨暈這三種形狀的變體。
- ❌ Lorem ipsum、「在當今快節奏的世界」、「把 X 變成 Y」句式標題、「EST. 19xx」徽章。
- ❌ 跑馬燈、進場淡入、數字滾動。
- ❌ 用 spinner 或灰骨架表示「還沒有資料」——用封甕。
- ❌ 在深階地色上開大面積紙面板（超過畫面 1/4 就走味了）。

## 十、頁面骨架範例

```html
<body>
<a class="skip" href="#main">跳至主要內容</a>

<header class="topline">
  <svg class="mk" viewBox="0 0 100 124">…甕…</svg>
  <b>品牌名</b><span class="mono">副標 / 地點 · 年份</span>
  <span class="r mono">本頁名稱</span>
</header>

<nav class="spig" aria-label="主導覽">
  <svg class="vessel" viewBox="0 0 88 600" preserveAspectRatio="none">…甕壁…</svg>
  <a href="index.html" aria-current="page">
    <svg class="tap" viewBox="0 0 44 26">
      <rect x="36" y="0" width="8" height="26" fill="#54391D"/>
      <path class="flow" d="M36,13 C31,16 28,21 27,26" stroke="#D6C19D" stroke-width="2.3" fill="none"/>
      <g class="plug"><rect x="23" y="9" width="15" height="8" fill="#82613A" stroke="#160E06" stroke-width="1.7"/>
      <circle cx="21" cy="13" r="3.6" fill="#B09368" stroke="#160E06" stroke-width="1.7"/></g>
    </svg>
    <span class="zh">埕</span><span>驗甕台</span>
  </a>
  …其餘三頁…
</nav>

<main id="main"><div class="wrap">
  <div class="stage">
    <section class="yard panel">
      <h2><span class="sec-no">壹 / 甕埕</span>標題不宣傳，只說明現況</h2>
      <div class="grid">…三態物件…</div>
    </section>
    <section class="tag panel">…被選中那一件的籤…</section>
    <aside class="sheet paper">…唯一的紙：記錄與判定…</aside>
  </div>
</div></main>

<footer>…三欄＋mono 虛構聲明…</footer>
</body>
```

CSS 起手式：

```css
:root{--g0:#F0E4CD;--g1:#E4D4B7;--g2:#D6C19D;--g3:#C4AB82;--g4:#B09368;--g5:#9A7A4F;
--g6:#82613A;--g7:#6A4B2A;--g8:#54391D;--g9:#3E2814;--g10:#2B1B0C;--g11:#160E06;
--zhu:#B7301E;--rail:88px}
body{margin:0;background:var(--g10);color:var(--g1);padding-right:var(--rail);
  font-family:"Noto Sans TC",sans-serif;line-height:1.78}
.panel{background:var(--g9);border:2px solid var(--g11);padding:18px 20px}
.paper{background:var(--g1);color:var(--g11);border:2px solid var(--g11);padding:18px 20px}
@media(max-width:900px){:root{--rail:0px}body{padding-right:0;padding-bottom:66px}}
@media(prefers-reduced-motion:reduce){*{transition:none!important;animation:none!important}}
```

## 十一、把這個風格用在別的產業

風格與內容分離。這套語言真正的前提是「有一個東西被封起來、要付代價才看得見」，因此天然適用於：地質鑽心取樣、血液檢體、資料庫抽樣稽核、二手零件檢驗、酒窖與桶陳、種原庫、保險核保、考古探坑。換產業時保留三件事：十二階單色相、硃紅只給不可回復、以及那個有形狀的「封」狀態。換掉甕形即可——把 `viewBox 100×124` 的容器換成鑽心管、試管、抽屜、木桶，其餘全部照舊。
