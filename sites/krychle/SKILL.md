---
name: czech-cubism-prism
description: Czech Cubism (Kubismus, Prague 1911-1914) as a web language — every surface chiselled into triangular and rhomboid facets, hard-edged 5-step shading ladders instead of gradients, prismatic hexagonal openings, zig-zag cornice friezes, zero curves and zero rounded corners.
---

# 捷克立體主義 Czech Cubism（Kubismus, Praha 1911–1914）

## 一、設計哲學

捷克立體主義是唯一一次有人把立體主義蓋成房子。

1911 年，布拉格的「造型藝術家小組」（Skupina výtvarných umělců）決定不再只是把畢卡索與布拉克的破面畫在畫布上。Pavel Janák 在那年寫下〈稜柱與金字塔〉（*Hranol a pyramida*），主張水平與垂直是物質屈服於重力的死板結果，而**斜面**——三角形、稜柱、金字塔——能讓一股抽象的力量在表面上顯現出來。Josef Gočár 照這個主張蓋了黑聖母之家（Dům U Černé Matky Boží, 1911–12），Josef Chochol 在維榭赫拉德山下蓋了公寓，Vlastislav Hofman 做了 Ďáblice 公墓的門與牆，Artěl 合作社（1908 成立）把同一套語彙做成陶器、玻璃與家具。1914 年戰爭爆發，這件事就結束了，前後不到四年，而且只在波希米亞與摩拉維亞發生過。

這個限制是本風格的關鍵：**它不是繪畫，是灰泥、磚石、預鑄混凝土與刨削木料做出來的立體主義。**曲面在抹灰工上太貴，所以沒有曲面；圓角要靠手工磨，所以沒有圓角。所有的形狀必須是**可放樣、可施工的平面多邊形**。畫面上每一塊看起來像是被鑿出來的東西，是真的被鑿出來的。

翻成網頁，只有一句話要守：**畫面上不存在任何一塊「平的、完整的、方的」表面。**每一塊面積都被斜面切開，每一塊顏色都以三到五階的硬邊明度階梯出現，因為同一塊材料的不同朝向本來就不會一樣亮。漸層、模糊陰影、圓角、曲線，這四樣東西一出現，這個流派就關掉了——它們都是「連續」，而這個流派的全部主張就是**不連續**。

與相近流派的分界：

- **與立體主義繪畫**：那裡的破面是視點的疊加（同時看到杯子的正面與側面）；本風格的破面是**一個真實物體被削掉的結果**，每一面都有法線、有朝向、有自己的明度，而且削法要有人做得出來。
- **與構成主義／風格派**：那些是平面上色塊的構成，沒有量體；本風格永遠在描述一個**立體**，畫面上的每一組多邊形都讀得出「這是同一塊東西的幾個面」。
- **與 Art Deco**：Deco 的稜角是裝飾母題（扇形、放射、鎏金），對稱且富麗；本風格的稜角是**結構**，不對稱、沉、素，顏色是土色與礦物色。
- **與 low-poly／polygon art**：那是把曲面近似成多邊形，還是在模仿曲面；本風格的多邊形不近似任何東西，它就是最終形狀。

---

## 二、本風格的 5 個不可省略特徵

拿掉任何一項，它就不是捷克立體主義了。

### 特徵 1：斜切稜面取代平面——沒有一塊完整的矩形

任何一塊面積（卡片、面板、按鈕、圖片框、頁尾）都必須有至少一個角被斜切掉。這不是視覺點綴，是本風格的最小單位。統一角度：**45°**，切口 8–26px 依塊大小分級（小元件 6–10px、卡片 11–16px、大面板 16–26px）。

```css
/* 通用削角容器：左上與右下各削一刀，永遠不對稱 */
.chamf{
  clip-path:polygon(14px 0, 100% 0, 100% calc(100% - 14px),
                    calc(100% - 14px) 100%, 0 100%, 0 14px);
  border-radius:0;               /* 全站硬性歸零 */
}
.chamf-s{clip-path:polygon(8px 0,100% 0,100% calc(100% - 8px),calc(100% - 8px) 100%,0 100%,0 8px)}
/* 大面板：只削右下一刀，重量落在左上——Gočár 檐部的作法 */
.slab-heavy{clip-path:polygon(0 0,100% 0,100% calc(100% - 26px),calc(100% - 26px) 100%,0 100%)}
```

### 特徵 2：45°／60° 稜線與零曲線——所有轉角都是被削掉的

`border-radius` 全站為 0，`* {border-radius:0}` 寫在重置裡。SVG 裡不准出現 `<circle>`、`<ellipse>`、`C`／`S`／`Q`／`A` 指令；折線一律 `stroke-linejoin:miter`，且**明文禁止 `stroke-linecap:round`**。圖示只用水平線、垂直線與 45°／60° 斜線。

```css
*{border-radius:0}
.fc{stroke:#20131C;stroke-width:1.4;stroke-linejoin:miter;shape-rendering:geometricPrecision}
```

```html
<!-- 稜柱形「加號」圖示：只有直線與斜切，沒有一個圓角 -->
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linejoin="miter">
  <polygon points="10,3 14,3 14,10 21,10 21,14 14,14 14,21 10,21 10,14 3,14 3,10 10,10"/>
</svg>
```

### 特徵 3：同材料的 3–5 階硬邊明度階梯——不是漸層，是朝向

每一種材料都必須以一整組明度階梯的形式存在，階與階之間硬邊相接，**永遠不准用 `linear-gradient` 過渡**。階數 3 到 5，明度間距約 12–16%（等距，不要中間插補）。判準：畫面上任何一塊顏色，如果它只出現一次、旁邊沒有它的暗一階或亮一階，那塊顏色就用錯了。

```css
:root{
  /* 材料 A：焦糖化的塔皮（外層） */
  --sk0:#E6CB9C; --sk1:#CBAA76; --sk2:#AC8850; --sk3:#89663B; --sk4:#63482B;
  /* 材料 B：剛裂開的斷面（內層，永遠比外層亮一整組） */
  --ct0:#FCF9F3; --ct1:#F0E8DA; --ct2:#DCD0BB; --ct3:#BFB09A; --ct4:#9C8C76;
}
.sk0{fill:var(--sk0)}.sk1{fill:var(--sk1)}.sk2{fill:var(--sk2)}.sk3{fill:var(--sk3)}.sk4{fill:var(--sk4)}
/* 陰影一律是實心位移色塊，不准 blur */
.drop{box-shadow:6px 6px 0 0 #20131C}
```

階的指派由面法線決定，寫成一支函數就好（見第八章）：

```js
var LIGHT = norm([-0.52, 0.78, 0.35]);          // 左上前方，固定不動
function shadeOf(n){                             // 回傳 0（最亮）到 4（最暗）
  var t = dot(n, LIGHT);
  var i = Math.floor((0.98 - t) * 2.6);
  return i < 0 ? 0 : i > 4 ? 4 : i;
}
```

### 特徵 4：稜柱形開口——門窗與按鈕不是矩形

Gočár 的門、Janák 的窗、Hofman 的墓園入口都不是長方形，是六角形或被削去兩角的稜柱形。網頁裡所有「開口」性質的元件——按鈕、輸入框、標籤、徽記、頭像框——都套這一條。

```css
.btn{
  clip-path:polygon(10px 0,100% 0,100% calc(100% - 10px),calc(100% - 10px) 100%,0 100%,0 10px);
  background:#C87C2C; color:#20131C; border:0;
  padding:11px 22px; font-weight:700; letter-spacing:.1em;
}
.btn:active{transform:translate(2px,2px)}          /* 位移，不縮放、不淡出 */
/* 真正的六角開口：用在徽記與頭像 */
.hexo{clip-path:polygon(50% 0,100% 26%,100% 74%,50% 100%,0 74%,0 26%)}
/* 輸入框也是開口 */
.fld input{border:2px solid #20131C;
  clip-path:polygon(8px 0,100% 0,100% calc(100% - 8px),calc(100% - 8px) 100%,0 100%,0 8px)}
```

### 特徵 5：鋸齒檐口帶——水平方向的三角韻律

建築上這是檐部、腰帶與欄杆：一排連續的三角齒沿水平方向重複，把量體切成上下兩段。網頁裡它是**刊頭與頁尾的分隔**，也是本風格最快被認出來的一件東西。齒距固定，齒高 14px，帶高 18px，下緣壓一條 1.5px 墨線。

```html
<svg class="frieze" viewBox="0 0 1200 18" preserveAspectRatio="none" aria-hidden="true">
  <polyline points="0,16 30,2 60,16 90,2 120,16 150,2 180,16 210,2 240,16 270,2 300,16"
            fill="none" stroke="#6E3050" stroke-width="4"/>
  <rect y="16.5" width="1200" height="1.5" fill="#20131C"/>
</svg>
```

```css
.frieze{display:block;width:100%;height:18px}
```

齒要**貫穿整個寬度並被畫布兩側切斷**——它是一段沒有起點也沒有終點的節奏，不是一個居中的裝飾條。

---

## 三、色彩系統

底色不是白也不是黑，是**甜菜紫**：一個中深明度的紅紫，來自甜菜汁與波希米亞灰泥常見的赭紅牆面。它讓兩組明度階梯（暖褐與糖白）都有地方站。

| 色票 | Hex | 角色 | 面積比 |
|---|---|---|---|
| 甜菜紫 | `#57223F` | 全站地色（牆） | ~32% |
| 深甜菜 | `#3B152B` | 深面板、刊頭、頁尾 | ~10% |
| 亮甜菜 | `#6E3050` | 稜線、分隔、hover 底 | ~4% |
| 糖白 | `#F2ECE1` | 紙面板（**所有長文一律在紙上，不在牆上**） | ~24% |
| 稜面階梯・皮 | `#E6CB9C` → `#63482B`（5 階） | 所有圖像的外層面 | ~14% |
| 稜面階梯・斷面 | `#FCF9F3` → `#9C8C76`（5 階） | 所有圖像的內層面 | ~8% |
| 石灰灰 | `#B6ACA0` | 次級標籤、註記文字 | ~4% |
| 焦糖 | `#C87C2C` | **唯一的動作色**：現用態、主要按鈕、可點的東西、被選中的事 | ≤6% |
| 深焦糖 | `#A25D18` | 焦糖在紙上的版本（對比） | ≤2% |
| 墨 | `#20131C` | 所有 1.4–3px 的線、正文、稜線 | ~2% |

硬規則：

1. **零漸層。**任何 `linear-gradient`／`radial-gradient`／`conic-gradient` 一律不准，包括「很淡的那種」。明度變化只能靠階梯。
2. **零模糊。**`box-shadow` 的 blur-radius 恆為 0，`filter:blur()` 不用。陰影是實心位移色塊。
3. **焦糖只給動作。**它不是品牌色、不是裝飾色。畫面上出現焦糖，就代表那裡可以被點、正在被選、或剛剛發生了事。
4. **每個顏色都要有鄰居。**任何一塊顏色旁邊都應該找得到它的暗一階或亮一階；孤立的單色塊是這個風格的破綻。
5. **文字對比**：糖白面上用墨 `#20131C`（對比 > 14:1）；甜菜紫面上用糖白（> 8:1）；石灰灰只給 12.8px 以上的次級文字，不給正文。

若要換一組色（本風格不綁色相），照這個結構換：**一個中深明度的地色 + 一組暖的外層階梯 + 一組亮的內層階梯 + 一個高彩度動作色（≤6%）+ 墨**。灰藍地配鉛灰／石白也成立，那是 Hofman 的方向。

---

## 四、字體系統

| 角色 | 字體 | 字重 | 說明 |
|---|---|---|---|
| 拉丁文、數字、標籤、代碼 | **Chakra Petch** | 400 / 500 / 600 / 700 | 方形無襯線、**四角帶削角（tapered corners）**——字身自己就是這個風格。全站數字一律 `font-variant-numeric:tabular-nums`。 |
| 中文標題 | **Noto Serif TC** | 700 / 900 | 起收筆是三角形的頓筆，讀起來像鑿的。 |
| 中文內文 | **Noto Sans TC** | 400 / 500 / 700 | 不搶戲，讓標題與圖去做風格。 |

```html
<link href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@400;500;600;700&family=Noto+Sans+TC:wght@400;500;700&family=Noto+Serif+TC:wght@700;900&display=swap" rel="stylesheet">
```

```css
body{font-family:"Noto Sans TC","Chakra Petch",system-ui,sans-serif;
     font-size:15.5px;line-height:1.78;letter-spacing:.012em}
h1,h2,h3,h4{font-family:"Noto Serif TC",serif;font-weight:900;line-height:1.14;letter-spacing:-.005em}
.lat,.num{font-family:"Chakra Petch",ui-monospace,monospace;font-weight:600;
          font-variant-numeric:tabular-nums}
```

字級階梯（clamp，行動優先）：

```
h1   clamp(30px, 5.2vw, 58px)      行高 1.14
h2   clamp(21px, 2.5vw, 29px)
h3   15px
lede 17px / 1.72
body 15.5px / 1.78
fine 12.8px / 1.66      次級與註記
eyebrow 11.5px / letter-spacing .24em / uppercase   ← 一律 Chakra Petch 700
label   11.5px / letter-spacing .16em / uppercase
```

**眉標（eyebrow）是本風格的固定件**：每一個內容區塊上面都有一行大寫、寬字距、焦糖色的拉丁小字，像建物上的施工銘牌。中文標題永遠壓在它下面。

---

## 五、版面與網格

- **12 欄結晶格**，最大寬 1180px，欄間距 `clamp(14px, 2.4vw, 26px)`，列間距為欄距的 1.5 倍。
- **面板一律用 subgrid 接回母格**，這樣不同面板內部的分隔線會落在同一條格線上，整頁的稜線才連得起來（見第九章）。
- **不對稱是預設**：7/5、8/4、4/8 這類分割，避免 6/6。首屏用 4/8（圖左字右），內頁交錯。
- 留白規則：紙面板內距 `26px 26px 30px`（≤560px 時 `20px 18px 24px`）；區塊之間只靠格線的 row-gap，不加多餘的分隔線——**分隔是靠鋸齒帶，不是靠 hr**。
- **長文一律在糖白紙面板上**，牆（甜菜紫）上只放標題、眉標、圖與讀數。這是本風格的可讀性底線。

```css
.sheet{max-width:1180px;margin:0 auto;padding:0 var(--g) 96px;
  display:grid;grid-template-columns:repeat(12,1fr);
  column-gap:var(--g);row-gap:calc(var(--g)*1.5)}
.panel{grid-column:1/-1;display:grid;grid-template-columns:subgrid;column-gap:var(--g)}
@supports not (grid-template-columns:subgrid){.panel{grid-template-columns:repeat(12,1fr)}}
.c7{grid-column:span 7}.c5{grid-column:span 5}
@media(max-width:900px){.c7,.c5{grid-column:1/-1}}
```

卡片牆也走 subgrid 的**列**方向，讓每張卡的圖／標題／數據／頁腳四段橫向對齊，不受文案長度影響：

```css
.cards{display:grid;grid-template-columns:repeat(4,1fr);gap:var(--g)}
.card{grid-row:span 4;display:grid;grid-template-rows:subgrid;row-gap:0}
@supports not (grid-template-rows:subgrid){.card{grid-row:auto;display:block}}
```

---

## 六、元件配方

### 刊頭（masthead）

深甜菜底 + 廠標 + 導覽 + 一條鋸齒檐口帶，下緣 3px 墨線。**不要置頂固定**——建築的檐口不會跟著你走。

```css
.mast{background:#3B152B;border-bottom:3px solid #20131C}
.mast-in{max-width:1180px;margin:0 auto;padding:16px var(--g) 0;
  display:flex;gap:18px;align-items:flex-start;justify-content:space-between;flex-wrap:wrap}
```

### 導覽：劈縫（cleave-seam）

每一項是一塊糖：底層是斷面白，上面蓋著兩片被 58/42 斜線分開的糖皮。現用頁那一塊**被劈開**——兩片各自往反方向錯開，露出中間的白色斷面。hover 是同一動作的小版本。這是「現用態＝被剖開」的語意，不是高亮。

```css
.nv{position:relative;display:block;width:78px;height:56px;text-decoration:none}
.nv .bed{position:absolute;inset:0;background:#FCF9F3}
.nv .lf,.nv .rt{position:absolute;inset:0;transition:transform .19s steps(3,end)}
.nv .lf{background:#AC8850;clip-path:polygon(0 0,58% 0,42% 100%,0 100%)}
.nv .rt{background:#89663B;clip-path:polygon(58% 0,100% 0,100% 100%,42% 100%)}
.nv:hover .lf{transform:translate(-2px,1px)}   .nv:hover .rt{transform:translate(2px,-1px)}
.nv[aria-current] .lf{transform:translate(-5px,3px)}
.nv[aria-current] .rt{transform:translate(5px,-3px)}
.nv[aria-current] b{color:#20131C;text-shadow:none}
```

```html
<a class="nv" href="x.html" aria-current="page">
  <i class="bed"></i><i class="lf"></i><i class="rt"></i><em class="lat">01</em><b>糖塔</b></a>
```

### 紙面板（slab）

```css
.slab{background:#F2ECE1;color:#20131C;padding:26px 26px 30px}
.slab.dk{background:#3B152B;color:#F2ECE1}
.eyebrow{font-family:"Chakra Petch",monospace;font-weight:700;font-size:11.5px;
  letter-spacing:.24em;text-transform:uppercase;color:#A25D18;display:block;margin-bottom:10px}
.dk .eyebrow{color:#C87C2C}
```

### 表格

表頭用斷面色 `#DCD0BB` 底 + 寬字距大寫小字；列線 1.5px 實線；數字欄右對齊、等寬。**不要斑馬紋**（那是連續的節奏，本風格的節奏在鋸齒帶上）。

```css
th{background:#DCD0BB;font-family:"Chakra Petch",monospace;font-weight:700;
   font-size:11.5px;letter-spacing:.14em;text-transform:uppercase}
th,td{text-align:left;padding:7px 10px;border-bottom:1.5px solid #C6B7A2}
td.n{text-align:right;font-variant-numeric:tabular-nums;font-family:"Chakra Petch",monospace}
```

### 表單

輸入框 = 開口（特徵 4），2px 墨框、斷面色底、focus 時轉純白。錯誤訊息是一塊甜菜紫的實心告示，**用完整句子寫、指名是哪一條規則**，不要只寫「欄位錯誤」。

### 頁尾

深甜菜底 + 上緣鋸齒帶 + 3px 墨線，12 欄照抄主格。

---

## 七、動效規則

四種性質不同的動態，缺一不可；**全部使用 `steps()`，本風格沒有補間**——鑿子不會平滑地滑進石頭裡。

| 種類 | 做什麼 | 觸發 | 具體值 |
|---|---|---|---|
| **ambient 環境** | 一道硬邊的光沿著鋸齒檐口走一圈 | 無需輸入，永遠在跑 | SVG SMIL `<animateMotion dur="26s" repeatCount="indefinite" rotate="auto">` 沿檐口折線；次要場景（輸送帶）9 個物件同路徑、`begin` 各差 `-19s/9` |
| **input-driven 輸入** | hover／focus 的即時回饋 | 游標、鍵盤 | 解理面 `fill-opacity .08s steps(2,end)`；按鈕 `.12s steps(2,end)`；導覽 `.19s steps(3,end)`；平面圖 `.1s steps(2,end)`。全部 <100ms |
| **transition 轉場** | 內容換頁／換篩選時，新內容被「鑿開」露出 | 狀態切換 | `clip-path` 由 `polygon(0 0,0 0,0 0,0 0)` 開到 `polygon(0 0,140% 0,140% 100%,0 100%)`，`.26s steps(5,end)` |
| **signature 簽名** | **劈面新生**：物件被切開時，兩半沿切面法線錯開，而新生的斷面比任何舊面都白，且是逐格白起來的 | 使用者落刀 | 兩半 `transform .42s steps(6,end)`，位移 ±26px 沿投影後的面法線；新斷面 `animation:freshen .52s steps(4,end)`，`fill` 由焦糖跳到 `#FCF9F3`、`stroke-width` 由 3 收到 1.4 |

```css
.chisel{animation:chisel .26s steps(5,end) 1}
@keyframes chisel{
  from{clip-path:polygon(0 0,0 0,0 0,0 0)}
  to{clip-path:polygon(0 0,140% 0,140% 100%,0 100%)}}

.half{transition:transform .42s steps(6,end)}
.half.go{transform:translate(var(--dx),var(--dy))}

.nf{animation:freshen .52s steps(4,end) 1}
@keyframes freshen{from{fill:#C87C2C;stroke-width:3}to{fill:#FCF9F3;stroke-width:1.4}}
```

**禁用清單**（這些會讓畫面變回「一般網站」）：淡入式滾動揭示、視差、數字滾動計數、跑馬燈／ticker、按壓時的縮放（`scale`）、`stroke-dashoffset` 描繪動畫、任何 `ease-in-out` 的補間。位移只准整數像素、只准 `steps()`。

### prefers-reduced-motion 降級（四種都要，且資訊零損失）

```css
@media (prefers-reduced-motion:reduce){
  *,*::before,*::after{animation-duration:.001ms!important;animation-iteration-count:1!important;
                       transition-duration:.001ms!important}
  .band-run{display:none}       /* SMIL 那一組整組隱藏 */
  .band-static{display:block}   /* 同一組幾何的靜止版本頂上 */
}
```

SMIL 動畫無法用 CSS 停止，所以做法是**準備兩份同樣的幾何**：`.band-run`（帶 `<animateMotion>`）與 `.band-static`（同樣的多邊形畫在靜止位置），由媒體查詢對調顯示。這樣即使 JavaScript 關閉，reduced-motion 使用者也拿到完全靜止的畫面，而看到的東西一模一樣。另外在 JS 端補一道 `svg.pauseAnimations()`。

---

## 八、插畫與圖像風格：稜面切分構成（facet-cleave）

**本風格禁止外部圖片，也禁止描外形的插圖。**所有圖像——主視覺、圖鑑縮圖、圖示、logo、favicon、回執印記——都由同一支引擎輸出：**一個凸多面體，被若干個平面切開，逐面平塗**。判準是「拿掉全部顏色，仍讀得出這是同一塊東西的哪幾個面、它被切過幾刀」。

原語只有三種：

1. **面（face）**：一個平面凸多邊形，填色由它的法線量化成 5 階（特徵 3），描邊 1.4px 墨、`stroke-linejoin:miter`。
2. **斷面（cut face）**：由切割產生的新面，換用另一組更亮的階梯——內外兩種材料在畫面上必須分得出來。
3. **切面預覽（cleavage overlay）**：尚未落刀的面，半透明焦糖 + 7/4 虛線描邊，可點。

引擎的骨幹（可直接抄，約 120 行）：

```js
/* 凸多面體半空間切割：保留 dot(n,x) <= d 的一半，並補上新生的斷面 */
function clip(P, n, d){
  var s = P.V.map(function(v){return dot(n,v)-d;});
  if(s.every(function(x){return x<=1e-9})) return P;      // 全在裡面
  if(s.every(function(x){return x>=-1e-9})) return null;  // 全在外面
  var NV=[], NF=[], NT=[], map={}, cut={};
  function idx(p){var k=p.map(function(x){return Math.round(x*1e6)/1e6}).join(',');
    if(map[k]!==undefined)return map[k]; map[k]=NV.length; NV.push(p); return NV.length-1;}
  P.F.forEach(function(f,fi){
    var out=[], cp=[];
    for(var i=0;i<f.length;i++){
      var a=f[i], b=f[(i+1)%f.length], sa=s[a], sb=s[b];
      if(sa<=1e-9) out.push(idx(P.V[a].slice()));
      if((sa<-1e-9&&sb>1e-9)||(sa>1e-9&&sb<-1e-9)){
        /* 關鍵：用「索引小的頂點」當起點算交點，兩個相鄰面才會算出「同一個」點，
           否則浮點誤差會讓同一個交點變成兩個頂點，斷面就縫不起來 */
        var lo=Math.min(a,b), hi=Math.max(a,b), t=s[lo]/(s[lo]-s[hi]);
        var p=add(P.V[lo], mul(sub(P.V[hi],P.V[lo]), t));
        var id=idx(p); out.push(id); cp.push(id);
      } else if(Math.abs(sa)<=1e-9) cp.push(idx(P.V[a].slice()));
    }
    if(out.length>=3){ NF.push(out); NT.push(P.T[fi]); }
    if(cp.length===2){ cut[cp[0]]=1; cut[cp[1]]=1; }
  });
  /* 斷面是一個凸多邊形：繞質心用極角排序即可，不要走鄰接邊（容易繞成蝴蝶結） */
  var cap=Object.keys(cut).map(Number);
  if(cap.length>=3){
    var c=cap.reduce(function(a,i){return add(a,NV[i])},[0,0,0]); c=mul(c,1/cap.length);
    var u=norm(cross(n,[0,0,1])), w=norm(cross(n,u));
    cap.sort(function(p,q){
      var A=sub(NV[p],c), B=sub(NV[q],c);
      return Math.atan2(dot(A,w),dot(A,u)) - Math.atan2(dot(B,w),dot(B,u));});
    NF.push(cap); NT.push('cut');            // 新面標記成斷面，換另一組階梯
  }
  return {V:NV, F:NF, T:NT};
}
```

投影用**正投影軸測**（不是透視——透視會產生連續的深度感，那是這個流派拒絕的東西）：

```js
var CAM = norm([0.44, 0.35, 0.83]);                       // 由物體指向鏡頭
var R = norm(cross([0,1,0], CAM)), U = cross(CAM, R);
function project(v){ return [dot(v,R), -dot(v,U)]; }      // 螢幕座標
// 凸體：只畫 dot(faceNormal, CAM) > 0 的面，不需要排序，不需要 z-buffer
```

**把字漆到稜面上**（本風格最有力的一招）：文字不是浮在圖上，是貼在某個面的平面裡。

```js
var e1 = norm(cross(nrm,[0,1,0]));                 // 面內的水平方向
if (project(e1)[0] < 0) e1 = mul(e1,-1);           // 讓字往右讀
var e2 = norm(cross(nrm, e1));                     // (e1,e2,nrm) 右手系
var a = project(e1), b = project(e2), c = project(centroidOfFace);
// SVG：x 軸走 e1，y 軸走 -e2（螢幕往下）
svg += '<text transform="matrix('+a[0]+' '+a[1]+' '+(-b[0])+' '+(-b[1])+' '+c[0]+' '+c[1]+')" '+
       'text-anchor="middle" font-size="12">KRYCHLE</text>';
```

**明文禁用**：`feTurbulence`／手抖濾鏡、半調網點、細線幾何線描（thin-lineart）、寫實描繪、任何曲線。

---

## 九、Logo 與 Favicon 設計指南

**Logo** 不是畫的，是同一支引擎的輸出：拿一個基本多面體，用固定種子劈兩刀，讓斷面朝著光。字標用 Chakra Petch 700、字距 .16em，下緣壓一條焦糖實條。

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 72">
  <rect width="260" height="72" fill="#57223F"/>
  <!-- 這裡放引擎輸出的多邊形群（六到十片面即可，勿超過十二片） -->
  <text x="76" y="36" font-family="Chakra Petch" font-weight="700" font-size="27"
        letter-spacing="4.3" fill="#F2ECE1">KRYCHLE</text>
  <polygon points="0,66 260,66 260,72 0,72" fill="#C87C2C"/>
</svg>
```

**Favicon**：16px 下要能認出來，所以只留三個面——頂面用斷面白、兩個側面用階梯的中階與暗階。菱形頂面是這個風格在極小尺寸下唯一的識別。

```html
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%2357223F'/%3E%3Cpolygon points='16,3 29,10 16,17 3,10' fill='%23FCF9F3' stroke='%2320131C' stroke-width='1.4'/%3E%3Cpolygon points='3,10 16,17 16,29 3,22' fill='%23AC8850' stroke='%2320131C' stroke-width='1.4'/%3E%3Cpolygon points='29,10 16,17 16,29 29,22' fill='%2363482B' stroke='%2320131C' stroke-width='1.4'/%3E%3C/svg%3E">
```

---

## 十、Do & Don't

**Do**

- 每一塊面積至少削一個角，角度統一 45°。
- 每一種顏色都以 3–5 階硬邊階梯出現。
- 長文放在亮色紙面板上，牆上只放標題、眉標、圖與讀數。
- 動效一律 `steps()`，位移只准整數像素。
- 眉標（大寫寬字距拉丁小字）壓在每個區塊的中文標題上面。
- 圖像用同一支幾何引擎產生，讓 logo、favicon、圖鑑、使用者的產出物是同一種東西。
- 每一條規則寫在頁面上、算給使用者看，不要藏在程式裡。

**Don't**

- ❌ 圓角、曲線、圓形、橢圓、`stroke-linecap:round`。
- ❌ 任何漸層（含「很淡的那種」）與任何模糊陰影。
- ❌ 紫藍漸層 hero、置中大標＋副標＋兩顆按鈕＋三張圓角卡片。
- ❌ emoji 當圖示（圖示一律自繪多邊形 SVG）。
- ❌ 淡入式滾動揭示、視差、數字滾動、跑馬燈、`ease-in-out`。
- ❌ 對稱的 6/6 分割與置中構圖。
- ❌ Lorem ipsum 與 AI 腔（「在當今快節奏的世界」「讓我們一起」）。
- ❌ 「EST. 19xx」徽章。年份要寫進沿革的句子裡，不要做成徽章。
- ❌ 把這個風格做成 Art Deco：不要鎏金、不要放射扇形、不要對稱徽記。
- ❌ 把這個風格做成 low-poly：多邊形不是用來近似曲面的。

---

## 十一、頁面骨架範例（可直接使用）

```html
<!doctype html><html lang="zh-Hant"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>頁名｜品牌</title>
<link rel="icon" href="data:image/svg+xml,…">   <!-- 見第九章 -->
<link href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@400;500;600;700&family=Noto+Sans+TC:wght@400;500;700&family=Noto+Serif+TC:wght@700;900&display=swap" rel="stylesheet">
<style>
*{box-sizing:border-box;margin:0;padding:0;border-radius:0}
:root{--beet:#57223F;--beet-d:#3B152B;--beet-l:#6E3050;--sugar:#F2ECE1;--ink:#20131C;
      --caramel:#C87C2C;--caramel-d:#A25D18;--lime:#B6ACA0;--g:clamp(14px,2.4vw,26px);
      --sk0:#E6CB9C;--sk1:#CBAA76;--sk2:#AC8850;--sk3:#89663B;--sk4:#63482B;
      --ct0:#FCF9F3;--ct1:#F0E8DA;--ct2:#DCD0BB;--ct3:#BFB09A;--ct4:#9C8C76}
body{background:var(--beet);color:var(--sugar);
     font-family:"Noto Sans TC","Chakra Petch",sans-serif;font-size:15.5px;line-height:1.78}
h1,h2{font-family:"Noto Serif TC",serif;font-weight:900;line-height:1.14}
.lat{font-family:"Chakra Petch",monospace;font-weight:600;font-variant-numeric:tabular-nums}
.sheet{max-width:1180px;margin:0 auto;padding:0 var(--g) 96px;display:grid;
       grid-template-columns:repeat(12,1fr);column-gap:var(--g);row-gap:calc(var(--g)*1.5)}
.panel{grid-column:1/-1;display:grid;grid-template-columns:subgrid;column-gap:var(--g)}
@supports not (grid-template-columns:subgrid){.panel{grid-template-columns:repeat(12,1fr)}}
.c7{grid-column:span 7}.c5{grid-column:span 5}
.slab{background:var(--sugar);color:var(--ink);padding:26px 26px 30px;
      clip-path:polygon(14px 0,100% 0,100% calc(100% - 14px),calc(100% - 14px) 100%,0 100%,0 14px)}
.slab.dk{background:var(--beet-d);color:var(--sugar)}
.eyebrow{font-family:"Chakra Petch",monospace;font-weight:700;font-size:11.5px;
         letter-spacing:.24em;text-transform:uppercase;color:var(--caramel-d);
         display:block;margin-bottom:10px}
.dk .eyebrow{color:var(--caramel)}
.btn{display:inline-block;padding:11px 22px;background:var(--caramel);color:var(--ink);border:0;
     font-family:"Chakra Petch",monospace;font-weight:700;letter-spacing:.1em;cursor:pointer;
     text-decoration:none;
     clip-path:polygon(10px 0,100% 0,100% calc(100% - 10px),calc(100% - 10px) 100%,0 100%,0 10px)}
.btn:active{transform:translate(2px,2px)}
.mast{background:var(--beet-d);border-bottom:3px solid var(--ink)}
.frieze{display:block;width:100%;height:18px}
.fc{stroke:var(--ink);stroke-width:1.4;stroke-linejoin:miter}
.sk0{fill:var(--sk0)}.sk1{fill:var(--sk1)}.sk2{fill:var(--sk2)}.sk3{fill:var(--sk3)}.sk4{fill:var(--sk4)}
.ct0{fill:var(--ct0)}.ct1{fill:var(--ct1)}.ct2{fill:var(--ct2)}.ct3{fill:var(--ct3)}.ct4{fill:var(--ct4)}
@media(max-width:900px){.c7,.c5{grid-column:1/-1}}
@media(prefers-reduced-motion:reduce){
  *,*::before,*::after{animation-duration:.001ms!important;transition-duration:.001ms!important}
  .band-run{display:none}.band-static{display:block}}
</style></head>
<body>
<header class="mast">
  <div style="max-width:1180px;margin:0 auto;padding:16px var(--g) 0;display:flex;
              justify-content:space-between;gap:18px;flex-wrap:wrap">
    <a class="brand" href="index.html"><!-- logo svg + 字標 --></a>
    <nav class="nav" aria-label="主導覽"><!-- 劈縫導覽，見第六章 --></nav>
  </div>
  <svg class="frieze" viewBox="0 0 1200 18" preserveAspectRatio="none" aria-hidden="true">
    <polyline points="0,16 30,2 60,16 90,2 120,16 150,2 180,16"
              fill="none" stroke="var(--beet-l)" stroke-width="4"/>
    <rect y="16.5" width="1200" height="1.5" fill="var(--ink)"/></svg>
</header>

<main class="sheet">
  <div class="hd" style="grid-column:1/-1">
    <span class="eyebrow">眉標・LATIN LABEL</span>
    <h1>兩行的標題，<br>第二行比第一行短</h1>
  </div>
  <section class="panel">
    <div class="c7"><div class="slab">
      <span class="eyebrow">區塊名</span>
      <p>長文一律在紙上。</p>
    </div></div>
    <div class="c5"><div class="slab dk">
      <span class="eyebrow">次要區塊</span>
      <p>深色面板放數據與規則。</p>
      <p style="margin-top:14px"><a class="btn" href="#">動作 →</a></p>
    </div></div>
  </section>
</main>

<footer class="mast" style="border-top:3px solid var(--ink);border-bottom:0;margin-top:40px">
  <svg class="frieze" viewBox="0 0 1200 18" preserveAspectRatio="none" aria-hidden="true"><!-- 同上 --></svg>
  <div style="max-width:1180px;margin:0 auto;padding:26px var(--g) 46px">…</div>
</footer>
</body></html>
```

---

## 十二、技術實作與相容性

本風格的三項核心技術、查證來源、不支援時的具體行為與實測值。查證日期 **2026-09-08**。

### 1. CSS Grid `subgrid`（版面層）

**它承載什麼**：特徵 1 與版面規則——面板的內部欄位必須落在母格的同一條格線上，不同面板的稜線才連得起來；卡片牆則用列方向的 subgrid，讓每張卡的圖／標題／數據／頁腳四段橫向對齊，不因文案長度不同而錯開。用巢狀的獨立 grid 做不到這件事（子格子的軌道與母格無關）。

**支援現況**（MDN《Subgrid》／caniuse `css-subgrid`）：Firefox 71（2019）、Safari 16（2022）、Chrome 117 與 Edge 117（2023-09），**2026-03-15 起為 Baseline Widely available**。舊版存量使用者在 caniuse 的全球覆蓋略低於 90%，所以仍留 fallback。

**Fallback 的具體行為**：

```css
@supports not (grid-template-columns:subgrid){ .panel{grid-template-columns:repeat(12,1fr)} }
@supports not (grid-template-rows:subgrid){ .card{grid-row:auto;display:block} }
```

不支援時面板改用自己的 12 欄（欄寬相同、只是不與母格共用軌道，跨面板的稜線可能差幾個像素），卡片改為一般區塊流（四段仍照順序、只是不橫向對齊）。**資訊零損失**，只掉對齊精度。

### 2. SVG SMIL `<animateMotion>`（動效時間軸層）

**它承載什麼**：ambient 環境動效——一道硬邊光沿鋸齒檐口的折線走，以及輸送帶上九個物件沿同一條折線前進。選它而不選 CSS 動畫，是因為這裡的運動**必須綁在一條具體的 SVG 幾何路徑上並自動轉向**（`rotate="auto"`），而且它是宣告式的：路徑寫在文件裡，不需要 JavaScript 就會動，這符合本站「關掉 JS 也要是完整畫面」的底線。

**支援現況**（caniuse `svg-smil`／MDN《animateMotion》）：Chrome 5+、Edge 79+、Firefox 4+、Safari 6+、Opera 9+、Android Browser 3+；IE 與 Opera Mini 從未支援。Chrome 曾於 2015 年提出棄用意向，2016-08-17 **撤回並暫停**該棄用，至今仍隨版本出貨。規格文件建議新專案優先考慮 CSS 動畫或 Web Animations API——本站的取捨已如上說明。

**Fallback 的具體行為**：不支援 SMIL 的環境（IE、Opera Mini）會忽略 `<animateMotion>`，多邊形停在文件裡寫的初始座標，畫面完整、只是不動。

**reduced-motion 的具體行為**：SMIL 無法用 CSS 停止，因此準備了兩份同幾何的群組，由媒體查詢對調 `display`（`.band-run` / `.band-static`），另在 JS 端補 `svg.pauseAnimations()`。即使 JS 關閉，reduced-motion 使用者也得到靜止畫面，看到的內容一模一樣。

### 3. 凸多面體半空間切割規則引擎（資料與生成層）

**它承載什麼**：全站每一張圖像（主視覺、24 張圖鑑、五段製程圖示、人物標記、平面圖上的建物、logo、favicon、訂單回執印記、使用者劈出來的每一塊）都是這支引擎的輸出，同時它也是核心互動的規則引擎——重量、斷面積、糖屑、分級全部由同一組幾何算出來。純 JavaScript，無任何瀏覽器 API 依賴，因此沒有相容性問題；搭 FNV-1a → mulberry32 決定性偽亂數，同一個種子恆得同一塊。

**兩個實作陷阱**（都踩過，寫在這裡免得重犯）：

1. **交點必須用固定的邊方向計算。**同一條邊被兩個面共用，若各自從自己的起點插值，浮點誤差會產生兩個相距 1e-13 的頂點，斷面就縫不起來、體積會多算 3%。解法：一律用索引較小的頂點當插值起點。
2. **斷面不要用鄰接邊走訪來排序。**當切面通過既有頂點時，該頂點的度數會變成 4，走訪會繞成蝴蝶結多邊形，法線方向與面積都算錯。解法：凸體的截面必為凸多邊形，繞質心用極角排序即可。
3. 附帶一條：**建立多面體時面的環繞方向要一致朝外**。以 Newell 法算出的法線若指向內部，斷面的定向判斷會整組反過來，體積用 `Math.abs()` 看不出來，但兩半相加會不等於整體。驗收方法就是「兩半體積相加是否等於原體積」。

**實測值**（Node 22，單執行緒；瀏覽器端同一段程式）：

| 項目 | 數字 |
|---|---|
| 單次切割（含斷面重建） | 0.033 ms |
| 一次完整重繪：主台（含 10 個候選面的試算）＋ 11 塊砧板縮圖 | **2.06 ms** |
| 候選面全算一輪（10 道面的切割＋斷面積） | 0.354 ms |
| 24 張圖鑑縮圖的幾何生成 | 2.12 ms |
| 正確性：9,307 次隨機連續切割 | 質量洩漏 **0**、環繞方向錯誤 **0** |
| 單頁大小（含全部 inline CSS/JS 與全部 SVG） | 49–57 KB（預算 350 KB） |
| 首屏 JS 執行 | < 5 ms（預算 100 ms） |

沒有 layout thrashing：每次重繪只寫一次 `innerHTML`，動畫只改 `transform` 與 `fill`，不讀取任何幾何屬性。

---

*本規格書描述的是風格，不綁產業。把甜菜紫換成鉛灰藍、把糖皮階梯換成鏽鐵階梯，同一套規則可以做建築事務所、樂器工廠、礦物標本館或棋具行——只要畫面上仍然沒有一塊完整的、方的、平的表面。*
