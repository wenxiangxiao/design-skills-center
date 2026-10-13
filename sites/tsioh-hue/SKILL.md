---
name: matisse-gouache-cutouts
description: Henri Matisse's late paper cut-outs (gouaches découpées, 1943–1954) — fat, round-tipped organic forms cut freehand with scissors from sheets brushed with opaque gouache, pinned in white or saturated color over abutting rectangles of two blues, positive and negative shapes used together, big loose handwritten text pages as in Jazz, and copy that makes way for the forms.
---

# Matisse 剪紙・Gouaches découpées

> 範例站：馬崗石花 MÁ-KANG TSIO̍H-HUE（新北貢寮海女的七曬石花凍）。本規格書不綁產業——海洋、植物、兒童、舞蹈、音樂、食物、紡織、任何想要「明亮、自由、手作卻不土」的品牌都合用。

## 1. 設計哲學

1941 年 Henri Matisse 在里昂動了一場大手術，之後很難久站在畫架前。他在尼斯 Hôtel Régina 與旺斯的畫室裡改用剪刀：助手 Lydia Delectorskaya 先把一張張紙用 Linel 不透明水粉刷滿顏色，他直接在色紙上剪——他自己的說法是「用剪刀畫」（dessiner avec des ciseaux）——剪下的形用圖釘釘上牆，再一移再移，直到構圖平衡才交給裱工。代表作：《Jazz》（1947，出版人 Tériade 以模版印刷 pochoir 出版，印刷用的也是同一牌水粉，書名原本叫 Cirque）、〈Océanie, le ciel〉〈Océanie, la mer〉（1946，據說起點只是一隻蓋住牆上污漬的剪紙燕子，後以絹印印在亞麻布上）、〈Polynésie, la mer〉（1946，雙藍方塊上的白色海藻與魚）、〈Memory of Oceania〉（1952–53，MoMA）、〈The Snail〉（1953，Tate，色塊依螺旋排列、外圍一圈橙）。2014 年 Tate Modern 與 MoMA 合辦〈Henri Matisse: The Cut-Outs〉。

這個風格的三個信念：

1. **形是一刀剪出來的，不是畫出來的**：沒有草稿線、沒有輪廓線，邊緣就是剪刀走過的路，所以會有一點抖、一點回切。
2. **顏色是紙，不是光**：每一塊顏色都是一張刷過水粉的紙，看得到刷痕，不透明、不漸層、不發光。
3. **形與地都是材料**：剪下來的形與剩下有洞的紙同樣重要；背景不是空白，是另一張（或好幾張）色紙。

## 2. 色彩系統

| Token | Hex | 用途 | 比例 |
|---|---|---|---|
| `--blue` 群青（深） | `#24479E` | 方塊牆深格、大面積底、導覽「牆」 | 25% |
| `--sky` 群青（淺） | `#6F98D6` | 方塊牆淺格、剪紙台 | 18% |
| `--bleach` 米白 | `#F4EEDC` | 剪形的主色（白形壓在藍上）、卡片底 | 15% |
| `--wall` 畫室牆白 | `#F5F0E3` | 頁面底 | 22% |
| `--lemon` 檸檬黃 | `#F2C81B` | Jazz 手寫頁、星 | 8% |
| `--red` 朱紅 | `#D63A2B` | 行動按鈕、強調剪形、「今天」 | 5% |
| `--green` 翠綠 | `#2E8F57` | 葉形、來店 | 3% |
| `--magenta` 洋紅 | `#B8336A` | 點綴剪形 | 1% |
| `--orange` 橙 | `#EE7A22` | 只給「蝸牛」外框 | 1% |
| `--ink` 墨黑 | `#161412` | 字、圖釘 | 2% |
| `--kelp` 鮮石花紫紅 | `#7A1E3F` | 產業專屬色（可替換） | — |

規則：**相鄰兩塊一定不同色、一定直接相接（零間隙、零外框）**；同一屏最多 4 個彩色＋米白＋墨；任何色都不做漸層、不做透明度；唯一的「陰影」是剪形被圖釘吊起時投在牆上的實色偏移影（`drop-shadow(4px 8px 0 rgba(22,20,18,.2))`），零模糊。

## 3. 字體系統

- **中文大字**：Long Cang（Google Fonts）——鬆、手寫、筆畫有輕重，對應《Jazz》Matisse 親手寫的文字頁。
- **拉丁手寫**：Caveat 600／700——副標、法文片語、價格數字。
- **正文**：LXGW WenKai TC（Google Fonts）——楷書骨架但不古板，與手寫大字同一氣。
- 字級：大標 `clamp(68px, 9.6vw, 136px)`／行高 .95；區塊標 `clamp(40px, 6vw, 76px)`／1.15；Jazz 引言 `clamp(23px, 2.2vw, 30px)`／1.45；正文 18px／1.8；註記 14px。
- 規則：手寫字**只放大、不放多**——一張 Jazz 頁 3–5 行；不用粗體堆疊階層，用「字大小＋放在哪張紙上」分層。

## 4. 版面與網格

- **方塊牆**：首屏是 4×3 不等大矩形（`grid-template-columns:1.12fr .86fr 1.2fr .82fr; grid-template-rows:1fr 1.18fr .92fr`），深淺兩藍交錯如 Polynésie；手機改 2×6。
- **紙張是傾斜釘上去的**：文字紙 `rotate:-1.6deg`、按鈕 `-1deg`、卡片 ±1.2deg；剪形不轉正。
- **形越界**：剪形一定壓過至少一條方塊邊界或紙邊；不要讓形乖乖待在格子裡。
- **字給形讓路**：長文旁邊的剪形用 `float`＋`shape-outside: polygon()`（點由剪形本身產生）＋`shape-margin:16–18px`，讓字沿著輪廓排。
- **螺旋**：年表、導覽等成組資訊依 L'Escargot 螺旋由大到小排（`grid-template-areas:"a a b b c" "a a g d c" "f f e d c"`），外圍一圈橙。
- 留白：牆白至少佔 20%；每屏一個主角剪形。

## 5. 元件配方

- **導覽（蝸牛色塊）**：固定右下，四塊色紙依螺旋 `"a b" "a b" "d c"`、外框 8px 橙；現頁在角落挖一個小剪形洞（`clip-path:path()` 填牆白）。≤560px 變成底部四格。
- **按鈕**：一張小色紙（`.paper`），手寫字 26px，`rotate:-1deg`，hover 往上 3px；無圓角、無外框、無陰影。
- **卡片**：一張色紙＋圖釘（9px 墨點、左上一點反光）；裡面放一片剪形。
- **表單**：輸入框是牆白底＋3px 墨底線；錯誤訊息朱紅、口語。
- **頁尾**：一整張墨黑紙，兩片色形從邊緣伸進來（一片被裁掉一半）。

```css
.paper{background-color:var(--c);background-image:var(--tex-l),var(--tex-d);background-size:420px 420px,380px 380px}
.btn{font-family:var(--hand);font-size:26px;padding:12px 18px 10px;border:0;rotate:-1deg}
.pin{position:absolute;width:9px;height:9px;border-radius:50%;background:#161412;box-shadow:inset -2px -2px 0 rgba(255,255,255,.25)}
```

## 6. 動效規則（4 種，皆有 reduced-motion 降級）

| 類型 | 做法 | 參數 | reduced-motion |
|---|---|---|---|
| ambient 環境 | 釘在牆上的剪形以圖釘為軸微晃（海風） | `rotate ±0.9–2.3deg`、週期 7–13s、相位以 FNV seed 錯開、`ease-in-out alternate` | 靜止，位置不變 |
| input 輸入 | hover／focus 剪形被拎起：上移 6px＋實色偏移影；游標變剪刀；剪紙台上剪線與剪刀跟著指標（coalesced events，<16ms） | `.12s ease-out` | 立即出現影子、不位移 |
| transition 轉場 | 換頁時目標頁顏色的一張手剪邊色紙從右掃入、新頁再往左掃出 | 380ms `cubic-bezier(.7,0,.3,1)` | 直接換頁 |
| signature 簽名 | 剪刀沿形的輪廓走一圈（offset-path），刀片開合；走完形離紙，紙上留下同形的洞 | 首頁 2.7s；功能頁依周長 1.1–2.6s；形離紙 1.1s `cubic-bezier(.3,.7,.2,1)` | 開場即為「已剪下」最終狀態，資訊完全相同 |

禁止：淡入、滾動揭示、數字計數、視差——這個風格的動作只有「剪」「釘」「晃」「掃紙」。

## 7. 插畫與圖像風格（gouache-cutout）

- 只有六種母題：**海藻 algue、珊瑚 corail、掌葉 feuille／palmette、星 étoile、魚、燕**（產業可替換成自己的母題，但必須是肥、圓頭、可一刀剪完的輪廓）。
- 輪廓生成：沿一條微彎主軸放「膠囊」（線段＋兩端半徑），用 smooth-min 把距離場融合，再用行進方格取 0 等值線——自然得到圓頭肥裂片；星、魚、燕則用手定的 12–18 個點＋Chaikin 平滑一次。
- 不要細線、不要描邊、不要內部細節（眼睛、葉脈都不要）；一片形就是一個顏色。
- 正負形：剪下來的形與剩下有洞的紙同時出現（`fill-rule:evenodd` 一條路徑：外框矩形＋形）。

## 8. Logo 與 Favicon

- Logo：240×240，牆白底上三張紙（深藍直條、檸檬方、淺藍方），深藍上一片米白海藻、淺藍上一顆朱紅星。不放字。
- Favicon：64×64 深藍方塊＋米白海藻＋右上一小塊檸檬黃，inline SVG data URI。

## 9. Do & Don't

- Do：讓形大、讓形越界、讓字讓路、讓紙歪一點、讓背景是另一張紙。
- Do：每片色紙都要有刷痕；每片釘著的形都要有圖釘或「被裁出畫面」的理由。
- Don't：漸層、玻璃模糊、圓角卡片、細描邊、icon 字型、emoji、紫藍漸層 hero、置中三卡片、「EST. 19xx」徽章。
- Don't：把剪形做成向量 icon 那種對稱完美的形——要有一點不對稱、一點回切。
- Don't：直接複製 Matisse 任何一件作品的構圖（Icarus、Blue Nude、The Snail 的具體排列）；借的是方法，不是作品。

## 10. 本風格的 5 個不可省略特徵

**① 剪刀畫出的肥圓頭有機形（無輪廓線、邊緣微抖）**——拿掉它就只是扁平插畫。

```js
// 膠囊距離場：c = [x1,y1,x2,y2,r1,r2]
function segDist(px,py,c){const dx=c[2]-c[0],dy=c[3]-c[1],l2=dx*dx+dy*dy;
  const t=Math.max(0,Math.min(1,((px-c[0])*dx+(py-c[1])*dy)/l2));
  return Math.hypot(px-c[0]-dx*t,py-c[1]-dy*t)-(c[4]+(c[5]-c[4])*t);}
function smin(a,b,k){const h=Math.max(k-Math.abs(a-b),0)/k;return Math.min(a,b)-h*h*k*.25;}
// 在 4px 網格上取 field<0 的邊界（marching squares），串成環 → Catmull-Rom 轉三次貝茲
```
```svg
<filter id="cut" x="-4%" y="-4%" width="108%" height="108%" color-interpolation-filters="sRGB">
  <feTurbulence type="fractalNoise" baseFrequency="0.045" numOctaves="2" seed="3" result="w"/>
  <feDisplacementMap in="SourceGraphic" in2="w" scale="3.2" xChannelSelector="R" yChannelSelector="G" result="d"/>
  <feTurbulence type="fractalNoise" baseFrequency="0.008 0.12" numOctaves="3" seed="9" result="t"/>
  <feColorMatrix in="t" type="matrix" values=".33 .33 .33 0 0 .33 .33 .33 0 0 .33 .33 .33 0 0 0 0 0 0 1" result="g"/>
  <feComposite in="d" in2="g" operator="arithmetic" k1="0.42" k2="0.8" k3="0" k4="0" result="p"/>
  <feComposite in="p" in2="d" operator="in"/>
</filter>
```

**② 不透明水粉刷紙（有刷痕、零漸層的飽和平色）**——拿掉刷痕就變成 Material 色塊。

```css
:root{
 --tex-l:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='420' height='420'%3E%3Cfilter id='f'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.0045 0.075' numOctaves='3' seed='4' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0.9 0 0 0 -0.42'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23f)'/%3E%3C/svg%3E");
 --tex-d:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='380' height='380'%3E%3Cfilter id='f'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.006 0.11' numOctaves='3' seed='11' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.8 0 0 0 -0.4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23f)'/%3E%3C/svg%3E");
}
.paper{background-color:var(--c);background-image:var(--tex-l),var(--tex-d);background-size:420px 420px,380px 380px}
```

**③ 正負形並用**——剪下的形與剩下有洞的紙同時上牆。

```svg
<svg viewBox="0 0 300 420"><!-- 負形：外框＋形，evenodd 挖洞 -->
  <path fill-rule="evenodd" d="M-22 -26H322V446H-22Z M150 30C…Z" fill="#F4EEDC" filter="url(#cut)"/>
</svg>
<svg viewBox="0 0 300 420" style="translate:-300px 40px;rotate:-9deg;filter:drop-shadow(4px 8px 0 rgba(22,20,18,.2))">
  <path d="M150 30C…Z" fill="#F4EEDC" filter="url(#cut)"/><!-- 正形：同一條 d -->
</svg>
```

**④ Jazz 手寫大字頁**——拿掉手寫就失去 Matisse 的聲音。

```css
.jazz{background:var(--lemon);padding:30px 34px 34px;rotate:-1.6deg}
.jazz h1{font-family:"Long Cang","Caveat",cursive;font-weight:400;font-size:clamp(68px,9.6vw,136px);line-height:.95}
.jazz .lede{font-family:"Long Cang",cursive;font-size:clamp(23px,2.2vw,30px);line-height:1.45}
```

**⑤ 不等大色紙方塊＋形越界、字讓路**——拿掉方塊牆就只是白底插畫。

```css
.poly{position:absolute;inset:0;display:grid;grid-template-columns:1.12fr .86fr 1.2fr .82fr;grid-template-rows:1fr 1.18fr .92fr}
.poly i:nth-child(odd){--c:#24479E}.poly i:nth-child(even){--c:#6F98D6}
.flo{float:left;width:min(44%,430px);aspect-ratio:300/420;
  shape-outside:polygon(52.1% 98.6%,47.9% 98.4%,…);/* 由同一組剪形點產生 */shape-margin:18px}
```

## 11. 頁面骨架範例

```html
<header class="hero">
  <div class="poly" aria-hidden="true"><i class="paper"></i>…12 格</div>
  <svg class="form sway lift" viewBox="0 0 300 420" style="left:3%;bottom:-2%;width:22vw;--oy:96%"><path d="…" fill="#F4EEDC" filter="url(#cut)"/></svg>
  <div class="jazz paper"><span class="pin"></span><h1>店名</h1><p class="lede">三行以內的手寫句子。</p><a class="btn paper p-red" href="…">剪一片 →</a></div>
  <div class="stage-wrap"><div class="stage">
    <svg class="sheet">…負形…</svg><svg class="piece">…正形…</svg>
    <div class="sc" style="offset-path:path('M150 30C…Z')">剪刀 SVG</div>
  </div></div>
</header>
<section class="wrap"><div class="flo">剪形</div><h2 class="jz">標題<span class="latin">sous-titre</span></h2><p>長文會沿著剪形排…</p></section>
<nav class="snail"><a class="a p-blue paper">牆</a><a class="b p-red paper">剪</a><a class="c p-lemon paper">曬</a><a class="d p-green paper">來</a></nav>
```

## 12. 技術實作與相容性

| 技術 | 層 | 承載 | 支援現況（查證） | Fallback |
|---|---|---|---|---|
| SVG 濾鏡鏈 feTurbulence → feDisplacementMap → feComposite arithmetic | A 渲染 | 特徵①手剪微抖邊、②水粉刷痕；data-URI 平鋪紋理給所有 HTML 色紙 | MDN feTurbulence：Baseline Widely available（2015-07）；feDisplacementMap 的 `scale` 屬性同為 Widely available（2015-07） | 濾鏡失效時為乾淨平色、形狀與資訊不變 |
| CSS `shape-outside: polygon()`＋`shape-margin` | C 版面 | 特徵⑤字給形讓路；功能頁判讀卡的繞排邊界由使用者剪的點即時產生 | MDN shape-outside：Baseline Widely available（2020-01）；caniuse `shape-outside: polygon()` Chrome 37／Safari 10.1／Firefox 62 | 不支援時以矩形 float 繞排 |
| CSS `offset-path: path()`＋`offset-distance`＋`offset-rotate:auto` | B 動效 | 簽名：剪刀沿輪廓收刀 | caniuse CSS Motion Path：Chrome 46+、Firefox 72+、Safari 16+；MDN offset／offset-rotate Baseline Widely available（2022-09） | `CSS.supports('offset-path','path("M0 0L1 1")')` 為假時跳過剪刀，直接呈現剪好狀態 |

- 輔助：Pointer Events `getCoalescedEvents()`（剪線取樣）、ResizeObserver（固定 300×420／600×600 座標系的剪台整塊縮放，使 offset-path 的 px 座標與 SVG 一致）、Web Animations（形離紙、掃紙轉場）。
- 效能實測（node 22，aarch64 Linux 沙盒）：海藻剪形生成平均 5.5ms、珊瑚 7.5ms（只在 build 時或按「交給阿嬤剪」時執行一次）；判讀＋shape-outside 多邊形 0.09ms。頁面大小：index 133KB、cut 72KB、story 94KB、visit 67KB（皆含內嵌 CSS/JS/全部 SVG）。首屏 JS 只做營業狀態、擺動相位、剪台縮放，<5ms；擺動用 `rotate` 單一屬性動畫，合成層執行。
- 已知限制：濾鏡在超大面積上會讓首次光柵化變慢，因此大面積的色紙改用預先平鋪的 data-URI 紋理，而 `#cut` 濾鏡只套在剪形與剪台的那一張紙上。

查證來源：MDN〈shape-outside〉、caniuse〈CSS property: shape-outside: polygon()〉、caniuse〈CSS Motion Path〉、MDN〈offset-rotate〉、MDN〈feTurbulence〉、MoMA〈Henri Matisse: The Cut-Outs〉牆面文字、Christchurch Art Gallery〈Henri Matisse's Jazz〉。
