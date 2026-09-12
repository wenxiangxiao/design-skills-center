---
name: czech-cubism-facet
description: Czech Cubism (Prague, 1911–1914) as a web style — the oblique plane as the third element, matter shattered into prismatic facets with stepped single-hue lightness, geometric solid shadows, zigzag cornices, and a lime-render palette with one earth red.
---

# 捷克立體主義 Czech Cubism ／ 稜面切割

> 一九一一年，帕維爾・亞納克（Pavel Janák）在布拉格的《藝術月刊》登出〈稜柱與金字塔〉（Hranol a pyramida）：水平與垂直是物質被重力壓出來的惰性，斜面才是物質內部那股力顯出來的樣子。他和高恰爾（Josef Gočár，黑色聖母之屋，1912）、霍霍爾（Josef Chochol，維榭赫拉德一帶的公寓）在布拉格蓋出一批表面被折成稜面的房子，Artěl 合作社則把同一套語言做成杯盤、盒子與家具。一九一八年以後，亞納克與高恰爾把它接到民族主義的圓弧與紅白色上，成為圓筒立體主義（Rondokubismus）。
>
> 這份規格書要重現的是 1911–1914 那一段：**沒有曲線、沒有漸層、沒有模糊、沒有光學陰影，只有被斜面切開的量體與它自己的明度階。**

---

## 一、設計哲學

1. **直角是惰性，斜面是力。** 版面上任何一個封閉輪廓，都不可以四個角都是直角。至少要有一條斜邊。這不是裝飾，是這個流派的第一句話。
2. **量體優先於面。** 每一個元件都當成一塊被切開的固體看待：它有幾個面、哪一面比較亮、哪一條是切開它的那一刀。不要把它想成「一張卡片加陰影」。
3. **明暗是幾何算出來的，不是光打出來的。** 一個面的明度來自它的朝向，不來自光源到它的距離。所以永遠是離散的階，不是連續的漸層。
4. **減法。** 畫面的複雜度來自「切」，不來自「加」。要讓一塊區域變豐富，是再切一刀，不是再放一個裝飾。
5. **材質是零。** 沒有紙纖、沒有噪點、沒有顆粒、沒有磨砂、沒有玻璃。這個流派的表面是清水粉刷與平塗，它拒絕模仿任何東西。

---

## 二、本風格的 5 個不可省略特徵

拿掉其中任何一項，做出來的就不是捷克立體主義。每一項都附可直接複製的片段。

### 特徵 1 — 斜面第三元素：沒有一個純矩形的輪廓

所有卡片、按鈕、標籤、導覽格、圖框都以 `clip-path: polygon()` 切掉至少一個角。斜邊的角度全站統一（本例 62°，即 `tan62 ≈ 1.881`，切 34px 寬就必須切 64px 高）。切角一律出現在**左下**或**右上**，不可以四角都切——四角都切就變成裝飾性的八邊形，不是被切開的量體。

```css
/* 主體塊：左下角被切掉 */
.slab{background:#E9E6DE;border:3px solid #17181A;
  clip-path:polygon(0 0,100% 0,100% 100%,34px 100%,0 calc(100% - 64px))}
/* 鏡射（右上角被切掉），同一版面上兩種交替使用 */
.slab.r{clip-path:polygon(0 0,calc(100% - 34px) 0,100% 64px,100% 100%,0 100%)}
/* 按鈕、標籤同一套語法，只是尺寸縮小 */
.btn{clip-path:polygon(0 0,100% 0,100% 100%,14px 100%,0 calc(100% - 26px))}
.tag{clip-path:polygon(0 0,100% 0,100% 100%,9px 100%,0 calc(100% - 17px))}
```

### 特徵 2 — 稜柱化：同一色相的明度階，硬邊，零漸層

一個量體被折成數個平面，每個面填同一個色相、不同的明度。階距固定（本例 4.2%），階數 −3…+3。**用相對顏色語法讓 CSS 自己算**，這樣整站只需要五個 hex。

```css
:root{--ice:#9BB1BB}                     /* 唯一的基色 */
.fc{fill:var(--fb)}                      /* 無相對顏色語法時的預先烘好值 */
@supports (color:hsl(from red h s l)){
  .fc{fill:hsl(from var(--b) h s calc(l + var(--k) * 4.2))}
}
```
```html
<polygon class="fc" style="--b:var(--ice);--k:2;--fb:#b5c6cd" points="…"/>
```

面的階數由它**最長那條邊的方位角**決定（把三維的朝向投影到平面上的做法）：

```js
function facetK(poly, lightAzimuthDeg){
  const a = longestEdgeAngle(poly);              // 0–180
  const d = (a - lightAzimuthDeg) * Math.PI / 90; // 週期 180°
  return Math.max(-2, Math.min(3, Math.round(3 * Math.cos(d))));
}
```

### 特徵 3 — 陰影是實心的幾何色塊，不是模糊

陰影與物件共用同一個 `clip-path`，位移固定，顏色是深面色，**不透明、不模糊、不漸層**。

```css
.shadowed{position:relative}
.shadowed::before{content:"";position:absolute;left:10px;top:10px;right:-10px;bottom:-10px;
  background:#46606E;z-index:-1;
  clip-path:polygon(0 0,100% 0,100% 100%,34px 100%,0 calc(100% - 64px))}
```
> 注意：`clip-path` 會連同 `::before` 一起裁掉，所以要把 `.shadowed` 放在**外層 wrapper**、`.slab` 放在裡面。

### 特徵 4 — 之字折線帶（zigzag cornice）

簷口、腰帶、頁尾分隔、重點畫底線一律是連續折線帶，折角與全站斜邊同角。它把「稜」從單一物件推廣成整條邊界。

```js
// 產生 62° 之字路徑：寬 w、高 h
function zig(w,h,x0,y0){const dx=h/Math.tan(62*Math.PI/180);
  let d='M'+x0+' '+(y0+h),x=x0,up=true;
  while(x<x0+w){x+=dx;d+=' L'+x.toFixed(1)+' '+(up?y0:y0+h);up=!up;}return d;}
```
```css
hr.zz{border:0;height:22px;background:#17181A;
  -webkit-mask:var(--zz);mask:var(--zz);mask-size:100% 100%}
/* --zz 為上面那條路徑輸出的 SVG data URI，stroke-width 7、fill:none */
```

### 特徵 5 — 清水石粉的地色，加一塊土紅

地色是冷灰白的清水粉刷（不是米白、不是紙），**而且它從來不是平的**——它永遠被斜面切成兩到三塊同色階。全站只有一個高彩度色（土紅），面積 ≤8%，只給動作、現用態與被拒絕的事。

```css
:root{--stone:#DDD9CF;--ink:#17181A;--deep:#46606E;--red:#CB3A26;--grey:#9AA6A8}
.field{position:fixed;inset:0;z-index:-1}
.field i{position:absolute;inset:0}
.field i:nth-child(1){background:var(--stone)}
.field i:nth-child(2){background:hsl(from var(--stone) h s calc(l + 3.4));
  clip-path:polygon(0 0,58% 0,20% 100%,0 100%)}
.field i:nth-child(3){background:hsl(from var(--stone) h s calc(l - 3.4));
  clip-path:polygon(100% 26%,100% 100%,44% 100%)}
```

---

## 三、色彩系統

| 角色 | Hex | 面積 | 用途 |
|---|---|---|---|
| 石粉冷灰白 stone | `#DDD9CF` | ≈34% | 唯一的大面積地色。永遠被切成 ±3.4% 的三塊同色階，不鋪任何材質 |
| 墨 ink | `#17181A` | ≈16% | 全部 2.6–3px 輪廓線、正文、表頭、之字帶 |
| 冰藍深面 deep | `#46606E` | ≈18% | 導覽、頁尾、實心陰影、深色標籤 |
| 土紅 red | `#CB3A26` | ≤8% | 動作、連結、現用態、退件、鋸線與角度標記。**不可當品牌大面積色** |
| 中灰藍 grey | `#9AA6A8` | ≈4% | 停用態、次級註記 |
| 稜面基色 ice | `#9BB1BB` | — | 所有圖像的唯一基色，其餘明度由 ±k×4.2% 算出（範圍 58.6%–79.6%） |

規則三條：

1. **一個色相一套階梯。** 同一個量體上的所有面必須共用色相與飽和度，只有明度不同。兩個不同色相直接相鄰＝這個風格關掉了。
2. **零漸層。** `linear-gradient` / `radial-gradient` / `box-shadow` 的模糊半徑全部禁用。唯一允許的漸層是「不用」。
3. **文字對比。** 稜面上的文字一律用墨，因此 `--k` 必須夾在 −2…+3（明度 58.6%–79.6%），對墨的對比率 ≥5.4:1。深面（deep）上只放 ≥24px 的粗體或反白小字。

---

## 四、字體系統

| 用途 | 字體 | 字重 | 尺寸 |
|---|---|---|---|
| 標題／按鈕／導覽 | `Archivo` + `Noto Sans TC` | 800 | `clamp(26px,4.4vw,42px)`；卡片標題 20–24px |
| 正文 | `Noto Sans TC` | 500 | 16px / line-height 1.66；小字 13.5–14.5px |
| 數字、代號、標籤、圖上讀數 | `IBM Plex Mono` | 600 | 11–24px，`font-variant-numeric:tabular-nums` |

- 標題 `letter-spacing:-.015em`、`line-height:1.08`——字要擠成一塊量體。
- 小標籤（kicker）`letter-spacing:.26em`、11.5px mono，這是量體上的刻字。
- **不要用襯線體。** 捷克立體主義的印刷字是幾何無襯線與手寫幾何體，襯線會把它推回維也納分離派。
- 中文用 Noto Sans TC 500/900；不要用圓體、不要用明體。

```html
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@600;800;900&family=IBM+Plex+Mono:wght@400;600&family=Noto+Sans+TC:wght@500;900&display=swap" rel="stylesheet">
```

---

## 五、版面與網格

- 容器 `max-width:1180px`，左右 22px（手機 15px）。
- 主網格 12 欄的心智模型，但實作用 `display:grid` 的 2/3/4 等分；**不對稱來自切角與明度，不來自欄寬亂配**。
- 斜邊角度全站唯一：62°（與其反手 118°）。不要出現第三種斜角，一出現整面就散了。
- 切角尺寸只有三級：大塊 34×64px、按鈕 14×26px、標籤 9×17px。
- 區塊間距 `padding:56px 0`（手機 38px）。
- 表格：`border-collapse`、每列 2px 墨線底、表頭實心墨底反白、**零圓角**。
- RWD：≤900px 導覽由右側橫排落為滿寬四格；≤560px 網格全部落為單欄，切角比例縮小但不取消。

---

## 六、元件配方

```css
/* 導覽（深面量體） */
.nav{border-bottom:3px solid var(--ink);background:var(--deep);color:#E9E6DE}
.rail li{position:relative;width:104px}
.cel{display:block;padding:14px 10px 12px;border-left:2px solid rgba(233,230,222,.34);
     background:hsl(201 22% 31%);transition:background .09s linear}
.cel:hover{background:hsl(201 22% 41%)}
/* 現用態＝被切掉一角，切下來的新斷面比舊面亮 14% */
.rail li.on .cel{clip-path:polygon(0 0,100% 0,100% 100%,38% 100%,0 62%);background:hsl(201 22% 24%)}
.fresh{display:none;position:absolute;left:0;bottom:0;width:38%;height:38%}
.rail li.on .fresh{display:block}
.fresh polygon{fill:hsl(from var(--deep) h s calc(l + 14));stroke:#17181A;stroke-width:3;stroke-linejoin:miter}

/* 按鈕：三種，全部切左下角 */
.btn{background:var(--red);color:#E9E6DE;padding:11px 22px 11px 16px;border:0;font-weight:800}
.btn.g{background:var(--deep)}
.btn.o{background:transparent;color:var(--ink);box-shadow:inset 0 0 0 3px var(--ink)}
.btn:hover{background:hsl(7 68% 40%)}          /* 只換明度，不換色相 */

/* 表單：3px 墨框、方角、零陰影 */
input,select,textarea{padding:9px 11px;border:3px solid var(--ink);background:#E9E6DE;font:inherit}

/* 註記塊：左緣 6px 土紅實心條，不是圓角提示框 */
.note{background:hsl(43 17% 79%);border-left:6px solid var(--red);padding:12px 14px;font-size:13.5px}

/* 頁尾：深面量體 + 上緣之字帶 */
footer{background:var(--deep);color:#E9E6DE;border-top:3px solid var(--ink)}
```

`stroke-linejoin:miter` 在每一個 SVG 上都要寫。`round` 會把稜角磨掉，等於把這個風格關掉。

---

## 七、動效規則

四種都要有，缺一不可，四種都要有 `prefers-reduced-motion` 降級且資訊零損失。

| 類型 | 內容 | 參數 |
|---|---|---|
| **ambient 環境** | 稜面受光：光的方位每 3 秒跳一格、八格一圈（24 秒），全站所有面的 `--k` 重算。**離散跳格，不是連續旋轉**——連續就變成了打光 | `setInterval 3000`；`lit=(lit+1)%8`；降級：停在 `lit=2` |
| **input 輸入** | 鋸線預覽：游標在量體上移動，切線與切開後兩塊的重量即時顯示（延遲 <100ms，無 transition）；按鈕與導覽 hover 只換明度 `.09s linear` | 預覽不做補間；hover `90ms linear` |
| **transition 轉場** | 鋸片走過：新頁面的 `main` 以 62° 斜邊的 `clip-path` 由左掃到右，`steps(6)` 故看得見六格 | `.60s steps(6) both`；降級：`animation:none` |
| **signature 簽名** | **落鋸即分面 cut-to-facet**：一刀落下，被切的多邊形沿刀線分成兩塊，各自沿刀的**法向**反向平移 9px 再歸位；新生的面自己算出自己的明度階，刀線留在畫面上並標出角度 | `.22s cubic-bezier(.2,.9,.3,1)`；降級：不平移，直接是最終幾何 |

```css
@keyframes sawin{
  0%{clip-path:polygon(0 0,0 0,-34% 100%,-34% 100%)}
  100%{clip-path:polygon(0 0,184% 0,150% 100%,-34% 100%)}}
main{animation:sawin .60s steps(6) both}
@media(prefers-reduced-motion:reduce){main{animation:none}*{transition-duration:.001ms!important}}
```

**禁用**：淡入式滾動揭示、視差、數字滾動計數、跑馬燈、模糊陰影的按壓效果、`stroke-dashoffset` 描繪、任何 `ease-in-out` 的柔和彈跳。這個風格的動作是機械的、有格的。

---

## 八、插畫與圖像風格：facet-solid 稜面分割量體

**全站不畫任何東西。**所有圖像都是同一支半平面裁切引擎的輸出：一個凸多邊形，被幾條線切成若干胞，每一胞用同色相的明度階填色、2.6px 墨線描邊。

```js
/* Sutherland–Hodgman：一個凸多邊形被一條線切成兩個 */
function cutPoly(poly, P, D){            // P 線上一點，D 方向向量
  const L=[],R=[], sd=pt => D[0]*(pt[1]-P[1]) - D[1]*(pt[0]-P[0]);
  for(let i=0;i<poly.length;i++){
    const a=poly[i], b=poly[(i+1)%poly.length], sa=sd(a), sb=sd(b);
    if(sa>=-1e-9)L.push(a); if(sa<=1e-9)R.push(a);
    if((sa>1e-9&&sb<-1e-9)||(sa<-1e-9&&sb>1e-9)){
      const t=sa/(sa-sb);
      const q=[a[0]+t*(b[0]-a[0]), a[1]+t*(b[1]-a[1])];
      L.push(q); R.push(q);
    }
  }
  return [L,R];
}
```

判準：**每一條內部的邊都是一條刀，看得出它的角度**。所有刀角只能取自全站那一組角（0 / 62 / 90 / 118）。用 FNV-1a → mulberry32 決定刀序，同一個代號永遠得到同一張圖，因此圖可以在建置階段烘成靜態 SVG，沒有 JavaScript 也看得到。

不要做的事：不要描物件外形、不要細線幾何線描、不要半調網點、不要 `feTurbulence` 手抖、不要等角視圖、不要任何寫實。

---

## 九、Logo 與 Favicon

Logo ＝ 一塊被切開的量體。做法：一個矩形 → 切掉左上角、切掉右下角 → 三個面各給一階明度 → 疊一條土紅的折線（品牌的「稜」）。8px 墨線、`stroke-linejoin:miter`、**方形畫布不留圓角**。

```svg
<svg viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg">
  <rect width="240" height="240" fill="#DDD9CF"/>
  <polygon points="20,28 220,28 220,212 20,212" fill="#46606E" stroke="#17181A" stroke-width="8" stroke-linejoin="miter"/>
  <polygon points="20,28 128,28 20,124"        fill="#C1CFD5" stroke="#17181A" stroke-width="8" stroke-linejoin="miter"/>
  <polygon points="220,212 92,212 220,98"      fill="#7593A1" stroke="#17181A" stroke-width="8" stroke-linejoin="miter"/>
  <path d="M62 168 L120 76 L178 168" fill="none" stroke="#CB3A26" stroke-width="12" stroke-linejoin="miter"/>
</svg>
```

Favicon 是同一件事縮到 32×32、線寬 2.4，寫成 `<head>` 裡的 inline data URI：

```html
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Cpolygon points='2,4 30,4 30,28 2,28' fill='%2346606E'/%3E%3Cpolygon points='2,4 18,4 2,20' fill='%23C1CFD5'/%3E%3Cpolygon points='30,28 12,28 30,10' fill='%237593A1'/%3E%3Cpolygon points='2,4 30,4 30,28 2,28' fill='none' stroke='%2317181A' stroke-width='2.4'/%3E%3C/svg%3E">
```

---

## 十、Do & Don't

**Do**

- 每一個封閉輪廓至少一條斜邊，角度全站唯一。
- 明度階離散、硬邊、同色相。
- 陰影是實心色塊，與物件共用切角。
- 圖像用切的，不用畫的。
- 之字帶承擔所有分隔線的工作。
- 表格、表單、按鈕全部方角 + 3px 墨框。

**Don't**

- ❌ 圓角（`border-radius` 全站為 0，一個例外都不要開）
- ❌ 任何漸層與模糊陰影（含 `backdrop-filter`）
- ❌ `stroke-linejoin:round` / `stroke-linecap:round`
- ❌ 紙纖、噪點、顆粒、材質貼圖——這個流派拒絕模仿材質
- ❌ 第三種斜角
- ❌ 兩個色相直接相鄰而不隔墨線
- ❌ 置中大標＋副標＋兩顆按鈕＋三張圓角卡片
- ❌ 紫藍漸層、emoji 當 icon、Lorem ipsum、「EST. 19xx」徽章、「把 X 變成 Y」句式標題
- ❌ 用襯線體去「增加古典感」——那是分離派或 Art Deco，不是這裡

---

## 十一、頁面骨架範例

```html
<body>
  <!-- 地：永遠被切成三塊同色階 -->
  <div class="field" aria-hidden="true"><i></i><i></i><i></i></div>

  <nav class="nav"><div class="navin">
    <a class="brand" href="index.html">…logo…<span class="bw">
      <span class="bn">品牌名</span><span class="bs">LATIN NAME ・ 地點</span></span></a>
    <ul class="rail">
      <li class="on"><a class="cel" href="index.html" aria-current="page">
          <span class="no">01</span><span class="nm">首頁</span></a>
        <svg class="fresh" viewBox="0 0 38 38" preserveAspectRatio="none" aria-hidden="true">
          <polygon points="0,38 38,38 0,0" vector-effect="non-scaling-stroke"/></svg></li>
      <!-- 其餘三頁 -->
    </ul>
  </div></nav>

  <main>
    <section style="padding:34px 0 0"><div class="wrap">
      <!-- 開場：一塊被切開的量體，資訊印在稜面上 -->
      <div class="shadowed" style="border:3px solid var(--ink);background:var(--paper)">
        <svg class="hero" viewBox="-14 -14 1028 528" role="img" aria-label="…">
          <polygon class="fc" style="--b:var(--ice);--k:2;--fb:#b5c6cd" points="…"
                   stroke="var(--ink)" stroke-width="2.6" stroke-linejoin="miter"/>
          <text x="32" y="82" fill="var(--ink)">…</text>
        </svg>
      </div>
      <!-- 手機隱藏稜面上的字，資訊改由這一排量體承擔（資訊零損失） -->
      <div class="grid g3" style="margin-top:22px">
        <div class="slab pad">…</div><div class="slab pad">…</div><div class="slab r pad">…</div>
      </div>
    </div></section>

    <section class="sec"><div class="wrap">
      <p class="kicker">02 / 章節</p>
      <h2>標題</h2>
      <div class="grid g3">
        <div class="shadowed"><article class="slab"><div class="pad">…</div></article></div>
      </div>
    </div></section>
  </main>

  <hr class="zz">
  <footer>…</footer>
</body>
```

---

## 十二、技術實作與相容性

本站的視覺由三項技術承載，各屬不同層。所有支援度於 **2026-08-12** 查證。

### 1. CSS 相對顏色語法 Relative Color Syntax（版面與樣式層）

**承載**：特徵 2 的稜面明度階。整站只寫五個 hex，其餘一千多個面的顏色都是 `hsl(from var(--b) h s calc(l + var(--k)*4.2))` 算出來的；環境動效換光時，JavaScript 只改一個整數 `--k`，顏色由 CSS 自己重算。

**支援度**（查證來源：[web-platform-dx / web features explorer, "Relative colors"](https://web-platform-dx.github.io/web-features-explorer/features/relative-color/)、[MDN《Using relative colors》](https://developer.mozilla.org/docs/Web/CSS/Guides/Colors/Using_relative_colors)、caniuse `css-relative-colors`）：
**Baseline Newly available，自 2024-09-16 起**；Chrome / Chrome Android / Edge 125（2024-05-14）、Firefox / Firefox Android 128（2024-07-09）、Safari / iOS Safari 18（2024-09-16）。列入 Interop 2024，預計 2027-03-16 進入 Widely available。

**Fallback（具體行為）**：每一個面在建置階段就把算好的十六進位色寫進 `--fb`，`.fc{fill:var(--fb)}` 是預設規則，相對顏色語法只在 `@supports (color:hsl(from red h s l))` 內覆蓋它。不支援的瀏覽器拿到的是同一組顏色，**畫面完全相同**；只有環境動效換光時需要 JavaScript 補算 hex（`SL_paint()` 內以 `CSS.supports` 偵測後才計算），未支援且關閉 JavaScript 時停在建置時的光位，資訊零損失。

### 2. `clip-path: polygon()` 幾何裁切（渲染層）

**承載**：特徵 1 與特徵 3。全站沒有一個矩形元件、沒有一個 `border-radius`，卡片、按鈕、標籤、導覽現用態、實心陰影與地色的三塊分割全部由 `polygon()` 定義。

**支援度**（查證來源：[MDN《clip-path》](https://developer.mozilla.org/docs/Web/CSS/clip-path)、caniuse `css-clip-path`）：基本形狀（`polygon()`）於 HTML 元素上為 **Baseline Widely available**，2020-01 起跨瀏覽器（Chrome 55+、Firefox 54+、Safari 9.1+ 需前綴、Safari 13.1+ 無前綴）。

**Fallback**：不支援時 `clip-path` 宣告整條被忽略，元件退為矩形，邊框、色彩、明度階與版面全部保留——退化的只有切角，內容零損失。實作注意：`clip-path` 會連同 `::before/::after` 一起裁掉，所以實心陰影必須放在外層 wrapper（本站 `.shadowed > .slab`）。

### 3. Sutherland–Hodgman 半平面裁切引擎（資料與生成層）

**承載**：全站每一張圖像、核心功能「切冰台」、簽名動效，以及規格頁二十四張圖鑑。純 JavaScript 幾何，**無任何瀏覽器 API 依賴，因此沒有相容性問題**；搭 FNV-1a → mulberry32 決定性偽亂數，同一輸入恆得同一張圖，故所有靜態圖在建置階段烘成 SVG 寫進 HTML。

**效能實測**（Node 22，單執行緒）：

| 項目 | 實測值 |
|---|---|
| 單次 `cutPoly`（四邊形） | 0.00022 ms（100,000 次 21.8 ms） |
| 12 刀完整切割序列 | 0.083 ms |
| 面積守恆 | 切前 720,000 → 切後合計 720,000（誤差 0） |
| 單頁大小（含全部 inline 資源） | 首頁 29 KB、規格頁 66 KB、切冰台 34 KB、訂冰頁 31 KB（上限 350 KB） |
| 首屏 JS 執行 | < 5 ms（無 layout thrashing：每幀只寫 `--k` 與 `transform`，零 `getBoundingClientRect`） |

**Fallback**：關閉 JavaScript 時，首頁的量體、規格頁二十四張圖、廠史三張圖、標誌與 favicon 全部是建置時烘好的靜態 SVG，照常顯示；互動的切冰台停在一支未切的冰，規則、判準與價目皆為可選取的一般 HTML 文字。

### 其他相容性註記

- `mask-image`（之字帶）：Baseline 2023，`mask-size:100% 100%` 必寫，否則無內在尺寸的 SVG 遮罩在部分瀏覽器不縮放。
- `prefers-reduced-motion`：四種動效全部降級，降級後幾何、讀數與判定完全一致。
- 對比：稜面上的墨字最低對比 5.4:1（`--k = -2`，明度 58.6%）；深面上僅放 ≥24px 粗體或反白文字。
