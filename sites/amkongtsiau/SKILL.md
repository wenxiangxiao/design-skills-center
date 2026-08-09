---
name: polish-poster-school
description: Polish Poster School (Polska Szkoła Plakatu) — painterly metaphor over depiction, one hand-made brush gesture as the whole image, 3–4 offset spot colours left deliberately out of register, hand-drawn lettering from the same tool, and a narrow information band under a large field of untouched paper.
---

# 波蘭海報學派 Polska Szkoła Plakatu

> 這份規格書描述的是一九五〇至八〇年代波蘭海報學派的視覺語言，並把它翻譯成可以直接用在網頁上的規則。
> 它不綁定產業：換成書店、電影院、劇場、酒吧、選舉、公益宣導都成立。
> 判準只有一個——**遮掉全部文字，懂設計的人要能在三秒內說出「這是波蘭海報」。**

---

## 一、設計哲學

波蘭海報學派的成立條件是政治與經濟的：一九五〇年代起，波蘭的電影、劇場、馬戲海報由國營發行單位委託**畫家**製作，而不是廣告公司。沒有明星肖像權、沒有片商指定的宣傳素材、沒有市場調查，畫家只拿到一部片或一個節目，然後畫他看完之後腦子裡剩下的東西。代表人物包括 Henryk Tomaszewski（華沙美院海報工作室的奠基者）、Jan Lenica、Roman Cieślewicz、Waldemar Świerzy、Jan Młodożeniec、Franciszek Starowieyski。其中替國營馬戲團 Cyrk 畫的那一系列（約一九六二年起，近三十年）是最集中的樣本：上百張馬戲海報，幾乎沒有一張畫帳篷。

三個核心信念：

1. **隱喻先於描繪。** 不畫被宣傳的東西，畫它對你做了什麼。走鋼索畫的是「一句話中間的停頓」，不是鋼索。
2. **手要留在紙上。** 印刷是平版（offset litho），三到四塊專色，經常對不準——他們把對不準留著，因為那證明這是印出來的，不是螢幕生出來的。
3. **紙的空白是內容。** 圖像不填滿版面。留白是給看的人站的地方。

**這個風格會失敗的方式只有一種：把它做成裝飾。**如果那一筆是為了好看而畫、如果套色錯位是隨機抖動的動畫、如果標題只是換了一個手寫字型——三秒辨識測試就會失敗，因為觀者看到的是「有筆刷質感的網站」，不是波蘭海報。

---

## 二、本風格的 5 個不可省略特徵

拿掉任何一項，它就不是這個風格了。每一項都附可直接複製的片段。

### 特徵 1：隱喻先於描繪（禁畫清單是設計文件的一部分）

每一個主題都先寫一份**禁畫清單**：這個題目裡最明顯、最好賣、最容易畫的三樣東西，全部不准出現在畫面上。清單要印在頁面上給人看見，因為它就是這個風格的說明。

```js
// 每個內容項目都必須帶這兩個欄位，缺一不可
const ITEM = {
  title: '鋼索是一句沒說完的話',
  ban:   '鋼索、平衡桿、高度',        // 禁畫清單：畫面上不得出現
  drew:  '一句話中間的那個停頓'        // 實際畫了什麼（隱喻）
};
```

```css
/* 禁畫／畫了 在資訊帶裡是並列的一對，不能只印其中一個 */
.band dl { display:grid; grid-template-columns:auto 1fr; gap:1px 12px; }
.band dt { font-family:'Barlow Condensed',sans-serif; letter-spacing:.14em;
           text-transform:uppercase; color:#7A2A20; font-weight:700; }
```

### 特徵 2：所有色域的邊界是手的邊，不是幾何的邊

畫面上不准出現數學直線圍成的色塊。每一塊顏色的輪廓都要經過一次法向雜訊位移，變成刮刀邊或撕紙邊。**這一項是純幾何處理，不靠濾鏡**，所以它在任何瀏覽器上都成立、可以輸出成靜態 SVG、也可以送印。

```js
// 把任何多邊形變成「撕出來的」多邊形；rd 為決定性亂數 [0,1)
function tornEdge(a, b, rd, amp){
  const dx=b.x-a.x, dy=b.y-a.y, len=Math.hypot(dx,dy)||1;
  const nx=-dy/len, ny=dx/len, n=Math.max(2, Math.round(len/26)), o=[];
  for(let i=0;i<n;i++){
    const t=i/n, j=(rd()*2-1)*amp*(0.35+0.65*Math.sin(Math.PI*t)); // 兩端收斂，中段最抖
    o.push({x:a.x+dx*t+nx*j, y:a.y+dy*t+ny*j});
  }
  return o;
}
function tornPoly(poly, rd, amp){
  let o=[];
  for(let i=0;i<poly.length;i++) o=o.concat(tornEdge(poly[i], poly[(i+1)%poly.length], rd, amp));
  return o;
}
// amp 建議 = 筆的基準半徑 × 0.22 ~ 0.30。超過 0.5 會變成阿米巴，那是別的風格。
```

### 特徵 3：3–4 塊專色版，錯位是固定的、不是抖動的

每塊專色一個圖層，各有一組**寫死的**位移量（1.5–3px 級距）。錯位必須是常數：它模擬的是壓機每一張都一樣的對位誤差，不是抖動。互動時才可以放大錯位（見動效第 2 條）。

```css
/* 四塊版各自一張 canvas（或一個 <g>），疊在同一個容器裡 */
.plates{ position:relative; aspect-ratio:100/118; overflow:hidden; }
.plates canvas{ position:absolute; inset:0; width:100%; height:100%; transition:transform .09s linear; }
```

```js
const MISREGISTER = {           // 單位 px，固定不變
  paper : [ 0,    0  ],
  chrome: [ 2.6, -1.8],         // 黃版偏右上
  lake  : [-1.9,  2.4],         // 綠版偏左下
  ink   : [ 0,    0  ],         // 墨版是基準，永遠不動
  rose  : [ 1.6,  1.2]
};
```

### 特徵 4：標題是同一支筆寫的，不是字型

標題不得使用現成的手寫字型。做法是把字母存成**骨架折線**，再用畫圖像的那支變寬筆去描它——於是標題的筆觸粗細變化、飛白、抖動都與畫面上的圖同源。（中文可保留正常字體作內文，但主標的拉丁字必須是畫出來的。）

```js
// 字母 = 一組 0..10 × 0..14 的骨架折線
const GLYPH = {
  "A":[[[0,14],[2.5,7],[5,0],[7.5,7],[10,14]],[[2,9],[8,9]]],
  "S":[[[9.4,3],[6,0],[3,0],[0,3],[0,5.2],[3,7.2],[7,7.2],[10,9.4],[10,11.4],[7,14],[3.6,14],[0.2,11.2]]]
  /* …其餘字母同法 */
};
// 由骨架（每點帶半徑 r）生出封閉外框：左緣去、右緣回
function outline(pts){
  const L=[],R=[];
  for(let i=0;i<pts.length;i++){
    const p=pts[i], a=pts[Math.max(0,i-1)], b=pts[Math.min(pts.length-1,i+1)];
    let dx=b.x-a.x, dy=b.y-a.y; const m=Math.hypot(dx,dy)||1; dx/=m; dy/=m;
    L.push({x:p.x-dy*p.r, y:p.y+dx*p.r});
    R.push({x:p.x+dy*p.r, y:p.y-dx*p.r});
  }
  return L.concat(R.reverse());        // 直接餵給 <path d> 或 Path2D
}
```

### 特徵 5：巨大的留白 + 下緣一條窄資訊帶

圖像區的墨覆蓋率**上限 34%**；所有文字資訊（日期、地點、票價、名單）壓在下緣一條不超過版面高度 22% 的窄帶裡，齊左、字級小、行距緊。這一項最常被誤解成「排版簡潔」——它不是簡潔，它是**比例紀律**：滿版填滿的是迷幻海報或維多利亞繁飾，不是波蘭海報。

```css
.poster{ background:#E5DCC7; }
.plates{ aspect-ratio:100/118; }                   /* 圖像區 ≈ B1 直式 */
.poster .band{ padding:12px 4.4% 16px; }           /* 資訊帶 ≤ 版高 22% */
.band .t1{ font-size:17px; font-weight:700; line-height:1.34; }
.band .t2{ font-family:'Barlow Condensed',sans-serif; font-size:13.5px;
           letter-spacing:.12em; color:#4A3C2E; margin-top:3px; }
```

```js
// 覆蓋率驗收：沿骨架積分 2r·ds，除以圖像區面積，>0.34 即退件
let area=0;
for(let i=1;i<pts.length;i++){
  const d=Math.hypot(pts[i].x-pts[i-1].x, pts[i].y-pts[i-1].y);
  area += d*(pts[i].r + pts[i-1].r);
}
const coverage = area/(areaW*areaH);   // 上限 0.34
```

---

## 三、色彩系統

三到四塊專色 + 一張紙。**不用漸層、不用陰影、不用半透明疊色（飛沫除外）。**

| 角色 | Hex | 用途 | 面積 |
|---|---|---|---|
| 牆（胭脂洋紅） | `#B8214E` | 頁面底色＝貼海報的那面牆 | 約 34% |
| 生紙 | `#E5DCC7` | 所有內容卡片與海報的紙 | 約 22% |
| 墨 | `#17130F` | 筆、標題、規線、正文 | 約 18% |
| 鉻黃 | `#EFB61B` | 第一塊專色：大面積撕邊色域、按鈕、標籤 | 約 15% |
| 湖綠 | `#1B8A72` | 第二塊專色：窄帶、飛沫、次要標籤 | 約 8% |
| 深胭脂 | `#7A1233` | 頁尾與最深的一階 | 約 3% |

規則：

- **牆是深的、紙是亮的、文字在紙上。** 不要把長文直接放在胭脂牆上；牆上只放標題、短句與說明行（`#F3C9D4`）。
- 鉻黃與湖綠**永遠不相鄰於同一條邊界**——它們是兩塊不同的版，中間一定隔著紙或墨。
- 胭脂在海報內部只能當**記號**（規線、圓點、編號），面積 ≤3%。它一大就變成「牆跑進海報裡」。
- 不要加第五塊專色。要更多層次時，用紙的兩階（`#E5DCC7` / `#EFE7D6`）。

```css
:root{
  --wall:#B8214E; --deep:#7A1233; --ink:#17130F;
  --chrome:#EFB61B; --lake:#1B8A72; --paper:#E5DCC7; --paper2:#EFE7D6;
}
```

---

## 四、字體系統

| 用途 | 字體 | 字重 | 尺寸 | 字距 |
|---|---|---|---|---|
| 主標題（拉丁） | **畫出來的**（見特徵 4） | — | 版寬 × 0.11 | 由包絡決定 |
| 中文標題 | Noto Sans TC | 700 | 27 / 23 / 19 / 18px | .02–.04em |
| 中文內文 | Noto Sans TC | 400 | 16px / 行高 1.72 | .01em |
| 小注 | Noto Sans TC | 400 | 13.5px / 行高 1.66 | .01em |
| 標籤與眉標（拉丁） | Barlow Condensed | 700 | 11–13.5px 全大寫 | .12–.28em |
| 數字與時刻 | Barlow Condensed | 500/700 | 隨欄位 | .08–.12em |

只用兩個家族：一個中文無襯線、一個**壓縮**的拉丁無襯線。壓縮體是必要的——波蘭海報的資訊帶塞得很緊，寬體會立刻讓版面變成一般網站。

```css
--zh:'Noto Sans TC',system-ui,sans-serif;
--lat:'Barlow Condensed','Noto Sans TC',sans-serif;
.kick{ font-family:var(--lat); font-size:12.5px; letter-spacing:.28em;
       text-transform:uppercase; font-weight:700; }
```

不使用襯線體。不使用任何裝飾性手寫字型（手寫必須是畫出來的，見特徵 4）。

---

## 五、版面與網格

- **不對稱雙欄**：主欄 1.32 / 側欄 1，gap 30px。主欄放海報，側欄放行動呼籲與清單。
- **海報比例 100:118**（近 B1 直式 68×98 的簡化），圖像區佔 0.022–0.707 高，規線在 0.735，標題基線 0.775。
- 分隔線只有兩種：**3px 實心墨**（區塊）與 **1px 28% 墨**（列）。不用圓角、不用陰影、不用毛玻璃。
- 區塊節奏：`.sec { margin-top:44px }`，每個區塊固定為「眉標（拉丁全大寫）→ 中文標題 → 內容」。
- 內容卡片一律是紙（`--paper`），內距 26px 5%。
- 桌機右側預留 284px 給導覽（見元件配方），`.wrap{ padding-right:284px }`。

```css
.lead{ display:grid; grid-template-columns:minmax(0,1.32fr) minmax(0,1fr);
       gap:30px; align-items:start; }
.rule{ height:3px; background:var(--ink); border:0; }
.hair{ height:1px; background:rgba(23,19,15,.28); border:0; }
```

---

## 六、元件配方

### 導覽：平衡桿（counterweight pole）

四個頁面掛在一根有支點的桿子上，現用頁掛的是實心重砝碼，桿因此往那一側傾斜。語意是**重量**，不是位置或高亮。

```css
.pole{ position:fixed; right:26px; top:26px; width:238px; }
.pole .beam{ display:flex; justify-content:space-between; align-items:flex-end;
             transform:rotate(var(--tilt,0deg)); transform-origin:50% 100%; position:relative; }
.pole .beam::after{ content:""; position:absolute; left:0; right:0; bottom:0; height:3px; background:var(--ink); }
.pole .w{ width:15px; height:15px; border:3px solid var(--ink); border-radius:50%; background:transparent; }
.pole a[aria-current="page"] .w{ background:var(--ink); width:21px; height:21px; }
.pole .fulcrum{ width:0; height:0; margin:0 auto;
  border-left:13px solid transparent; border-right:13px solid transparent; border-top:19px solid var(--ink); }
```
`--tilt` 由現用頁索引算出：`tilt = (i - (n-1)/2) / ((n-1)/2) * 4.6deg`。
≤900px 攤平成底部四格橫列（桿與支點隱藏），頁尾另備完整文字連結。

### 按鈕

```css
.btn{ font-weight:700; background:var(--chrome); color:var(--ink);
      border:3px solid var(--ink); padding:8px 14px; letter-spacing:.04em; cursor:pointer; }
.btn.ghost{ background:transparent; color:var(--paper2); border-color:var(--paper2); }
.btn:focus-visible{ outline:3px solid var(--paper2); outline-offset:3px; }
```
沒有圓角、沒有陰影、沒有 hover 位移。切換態用**反白**（`aria-pressed="true"` → 墨底紙字）。

### 卡片＝一張海報

```html
<article class="poster sheet">
  <div class="plates" data-seed="…"><!-- 四塊專色版的 canvas 或靜態 SVG --></div>
  <div class="band">
    <div class="t1">節目名</div>
    <div class="t2">LATIN TITLE　01</div>
    <dl><dt>禁畫</dt><dd>鋼索、平衡桿、高度</dd>
        <dt>畫了</dt><dd><b>一句話中間的那個停頓</b></dd></dl>
  </div>
</article>
```

### 表單／表格

表頭用 Barlow Condensed 全大寫 + 3px 墨底線；列用 1px 髮線。不用斑馬紋、不用外框。

### 頁尾

深胭脂 `--deep` 滿版，三欄，字級 13.5px，行高 1.8。

---

## 七、動效規則

四種性質不同、觸發源不同的動態，缺一不可。全部要有 `prefers-reduced-motion` 降級，且降級後資訊零損失。

| 類 | 名稱 | 觸發 | 參數 | 降級 |
|---|---|---|---|---|
| ambient | **探照燈掃牆** | 無 | 26s `cubic-bezier(.45,0,.55,1)` alternate，`translate3d(0→78vw,0→6vh)`，`mix-blend-mode:screen` | 停在 34vw 靜止 |
| input | **分版分離** | hover / focus | 各版 `translate(±3px)`，`transition .09s linear` | `transition:none`（狀態仍成立） |
| transition | **上版 plate-on** | 進頁／換狀態 | Web Animations，五塊版各自方向滑入，520ms、`cubic-bezier(.2,.92,.26,1)`、stagger 105ms、`fill:'backwards'` | 不播，直接是最終畫面 |
| signature | **落筆即成版 stroke-to-plate** | 收筆 | 900ms，各版由自己的錯位方向外推 → 過衝 −28% → 歸零，`cubic-bezier(.28,1.06,.4,1)`、stagger 70ms | 直接呈現成品 |

```js
const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
function plateOn(canvases){
  if(RM) return;                       // 降級：畫面已經是最終狀態
  const d=[[0,0],[0,-30],[-30,0],[0,26],[22,0]];
  canvases.forEach((c,i)=>c.animate(
    [{transform:`translate(${d[i][0]}px,${d[i][1]}px)`,opacity:0},
     {transform:'translate(0,0)',opacity:1}],
    {duration:520, delay:i*105, easing:'cubic-bezier(.2,.92,.26,1)', fill:'backwards'}));
}
```

禁止：淡入式滾動揭示、視差、數字滾動、跑馬燈、按壓硬陰影、`stroke-dashoffset` 描繪。
最後一項特別要記住：**這個風格的線是「壓出來的」不是「畫出來的」**，用 dashoffset 把筆畫一格一格描出來會立刻變成技術插畫的語彙。

---

## 八、插畫與圖像風格

技法代號 **brush-metaphor（變寬筆觸隱喻構成）**。全站沒有一張外部圖片、沒有一張寫實描繪。三種原語互相組成所有圖像：

1. **變寬筆觸**：骨架 polyline + 每點半徑（半徑來自壓力或決定性雜訊）→ `outline()` → 封閉 path。收筆處半徑 <0.35px 形成飛白斷續。
2. **撕邊色域**：凸多邊形每條邊經 `tornPoly()` 位移。
3. **飛沫**：沿筆觸法向以決定性亂數灑 6–40 顆 r=0.5–2.4 的圓，密度隨筆速。

```js
function spatter(be, pts, rd, color, dens, spread){
  for(let i=2;i<pts.length;i+=3){
    const p=pts[i], m=Math.round(dens*(0.3+(p.sp||0.6)));
    for(let k=0;k<m;k++){
      const a=rd()*6.2832, r=Math.pow(rd(),1.7)*spread;
      be.circle(p.x+Math.cos(a)*r, p.y+Math.sin(a)*r, 0.5+rd()*1.9, color, 0.62+rd()*0.38);
    }
  }
}
```

紙的顆粒：每 1100 平方 px 灑一顆 r=0.35–1.1、不透明度 0.05–0.11 的墨點，上限 460 顆。**不要用 `feTurbulence` 做紙紋**——濾鏡會讓字緣一起糊掉，而且它是另一個流派（迷幻海報）的語彙。

決定性：所有隨機都來自 `FNV-1a → mulberry32`，同一個 seed 永遠得到同一張圖，因此縮圖、分享連結、下載的 SVG 三者一致。

---

## 九、Logo 與 Favicon

**Logo** ＝ 一塊撕邊鉻黃色域 + 用同一支筆寫的團名（特徵 4 的字骨架），右上角一顆湖綠圓點作為第二塊版的存在證明。輸出成 `assets/logo.svg`，同一份直接內嵌進報頭（沒有 JavaScript 也看得見）。

**Favicon** ＝ 32×32 的原創 inline SVG data URI，四個元素對應四塊版：胭脂底、鉻黃撕邊塊、一道墨的筆、一顆湖綠點。

```html
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%23B8214E'/%3E%3Cpath d='M6 7l17-2 3 16-4 3-15 1z' fill='%23EFB61B'/%3E%3Cpath d='M8 24c2-9 5-14 9-15 3-1 5 1 4 4-1 4-5 6-9 6-2 0-3-1-3-2' fill='none' stroke='%2317130F' stroke-width='4' stroke-linecap='round'/%3E%3Ccircle cx='25' cy='9' r='2' fill='%231B8A72'/%3E%3C/svg%3E">
```

---

## 十、Do & Don't

**Do**

- 先寫禁畫清單，再想畫面。清單要給使用者看。
- 主體偏心：筆畫重心距版心 ≥7.5% 版寬。置中的是說明圖。
- 錯位固定、留著、不要修。
- 圖像區留白 ≥66%。
- 標題與圖用同一支筆。
- 所有隨機決定性化，同 seed 同結果。

**Don't**

- ✗ 不用 `feTurbulence` / `feDisplacementMap` 做手抖邊（那是迷幻海報）。
- ✗ 不把畫面填滿（horror vacui 是另一個流派）。
- ✗ 不用現成手寫字型冒充手繪。
- ✗ 不用漸層、圓角、模糊陰影、毛玻璃。
- ✗ 不用 `stroke-dashoffset` 把筆畫描出來。
- ✗ 不用紫藍漸層 hero、不用「置中大標＋副標＋兩顆按鈕＋三張卡片」。
- ✗ 不用 emoji 當 icon，不用 Lorem ipsum，不用「EST. 19xx」徽章。
- ✗ 錯位不要做成持續抖動的動畫——壓機每一張的誤差是一樣的。

---

## 十一、頁面骨架範例

```html
<!doctype html><html lang="zh-Hant"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;700&family=Noto+Sans+TC:wght@400;700&display=swap" rel="stylesheet">
<style>
:root{--wall:#B8214E;--deep:#7A1233;--ink:#17130F;--chrome:#EFB61B;--lake:#1B8A72;
      --paper:#E5DCC7;--paper2:#EFE7D6;
      --zh:'Noto Sans TC',sans-serif;--lat:'Barlow Condensed',sans-serif;}
body{background:var(--wall);color:var(--paper2);font-family:var(--zh);line-height:1.72;margin:0}
.spot{position:fixed;left:-30vw;top:-20vh;width:86vw;height:120vh;pointer-events:none;z-index:1;
 background:radial-gradient(closest-side,rgba(255,238,190,.26),transparent 72%);
 mix-blend-mode:screen;animation:sweep 26s cubic-bezier(.45,0,.55,1) infinite alternate}
@keyframes sweep{to{transform:translate3d(78vw,6vh,0) scale(1.14)}}
.wrap{position:relative;z-index:2;max-width:1180px;margin:0 auto;padding:0 22px 96px}
@media(min-width:901px){.wrap{padding-right:284px}}
.sheet{background:var(--paper);color:var(--ink)}
.pad{padding:26px 5%}
.kick{font-family:var(--lat);font-size:12.5px;letter-spacing:.28em;text-transform:uppercase;font-weight:700}
.sec{margin-top:44px}
.plates{position:relative;aspect-ratio:100/118;overflow:hidden}
.plates canvas{position:absolute;inset:0;width:100%;height:100%;transition:transform .09s linear}
.poster:hover .pl-chrome{transform:translate(3px,-2px)}
.poster:hover .pl-lake{transform:translate(-3px,3px)}
@media(prefers-reduced-motion:reduce){.spot{animation:none;transform:translate3d(34vw,3vh,0)}
 .plates canvas{transition:none}}
</style></head>
<body>
<div class="spot" aria-hidden="true"></div>
<header class="mast"><div class="logo"><!-- 內嵌 logo.svg --></div></header>
<nav class="pole" aria-label="主導覽">
  <div class="beam" style="--tilt:-4.6deg">
    <a href="index.html" aria-current="page"><span class="w"></span><span class="lb">今日</span></a>
    <a href="two.html"><span class="w"></span><span class="lb">節目</span></a>
  </div>
  <div class="fulcrum" aria-hidden="true"></div>
</nav>
<main class="wrap">
  <section class="sec">
    <span class="kick">Section label</span>
    <h2>中文區塊標題</h2>
    <article class="poster sheet">
      <div class="plates"><!-- 靜態 SVG，JS 載入後換成四塊版 canvas --></div>
      <div class="band">
        <div class="t1">主要資訊一行</div>
        <div class="t2">LATIN SUBLINE　01</div>
        <dl><dt>禁畫</dt><dd>…</dd><dt>畫了</dt><dd><b>…</b></dd></dl>
      </div>
    </article>
  </section>
</main>
<footer><!-- 深胭脂三欄 --></footer>
</body></html>
```

---

## 十二、技術實作與相容性

本站三項核心技術，各自承載一個不可省略特徵。支援度於 **2026-08-09** 查證 MDN。

### 1. Pointer Events 的 `pressure` / `tiltX` / `tiltY`（輸入與感測層）

**承載**：特徵 4 與簽名動效——使用者的一次手勢同時決定筆寬（壓力）、筆尖角度（傾角）、以及標題的筆型。

- **支援現況**：`PointerEvent.pressure` 為 **Baseline Widely available，2020 年 7 月起跨瀏覽器**（來源：MDN《PointerEvent: pressure property》）。`tiltX` / `tiltY` 同為 Baseline Widely available，2020 年 7 月起（來源：MDN《PointerEvent: tiltX / tiltY property》）。
- **重要陷阱**：MDN 明確寫著「不支援壓力的硬體（例如滑鼠）在按下時回傳 `0.5`，否則回傳 `0`」。因此**不能拿 `pressure` 當作有沒有壓感的判斷**，`0.5` 是哨兵值。
- **fallback 具體行為**：偵測到 `pointerType !== 'pen'` 或 `pressure === 0.5` 時，改用**移動速度反推壓力**：`p = 0.14 + 0.86·e^(−1.35v)`，v 為每毫秒的正規化位移量。畫得慢＝重，畫得快＝輕，落差分布與真實筆壓相當（實測 400 組合成手勢，第三條「輕重 ≥1.9」通過率 98%）。介面上會誠實說明目前用的是哪一種。
- **無指標裝置**：提供「請師傅代筆」按鈕，以決定性合成手勢走完同一條流程，鍵盤可達。

```js
function pressureOf(e, prev, now, q){
  if(e.pointerType==='pen' && e.pressure>0 && e.pressure!==0.5){
    const tilt=Math.max(Math.abs(e.tiltX||0), Math.abs(e.tiltY||0));
    return Math.min(1, e.pressure*(1+0.22*tilt/90));   // 筆越斜，痕越寬
  }
  const v = prev ? Math.hypot(q.x-prev.x,q.y-prev.y)*900/Math.max(10,now-prev.t) : 0;
  return Math.max(0.04, Math.min(1, 0.14+0.86*Math.exp(-v*1.35)));
}
```
另使用 `PointerEvent.getCoalescedEvents()` 取回兩幀之間被合併掉的取樣點；不支援時退為單點，筆畫略粗糙但完全可用。

### 2. Canvas 2D（渲染層）

**承載**：特徵 2、3、5——撕邊色域、四塊專色版、飛沫與紙的顆粒。單一頁面最多同時 24 張縮圖，用 Canvas 2D 是為了避免產生數萬個 SVG 節點。

- **支援現況**：`CanvasRenderingContext2D` 與 `Path2D` 皆為 Baseline Widely available（Path2D 自 2015 年起跨瀏覽器；來源：MDN《Path2D》《CanvasRenderingContext2D》）。
- **關鍵作法**：繪圖程式碼寫成**後端無關**的介面（`path / circle / rect / text / push / pop`），同一段程式可以接 Canvas 後端，也可以接 SVG 後端。因此：
  - 建置階段用 SVG 後端輸出靜態海報，直接內嵌在 `.plates` 裡 → **沒有 JavaScript 也看得到完整的海報**；
  - 執行階段用 Canvas 後端改畫成四塊可獨立動畫的版；
  - 使用者按「另存 SVG」時再用 SVG 後端輸出 1000×1180 的向量檔。
- **fallback**：`getContext('2d')` 回傳 null 時（極罕見）保留建置階段的靜態 SVG，畫面完全不變。
- **DPR 上限**：`Math.min(2, devicePixelRatio)`，縮圖再降到 1.5，避免高密度螢幕上 24 張縮圖吃掉過多記憶體。

### 3. Web Animations API（動效與時間軸層）

**承載**：轉場動效（上版）與簽名動效（落筆即成版）——兩者都需要「五個元素各自不同的位移、各自延遲、可整體取消」，用 CSS keyframes 要寫五組類別，用 WAAPI 是一個迴圈。

- **支援現況**：`Element.animate()` 為 **Baseline Widely available，2020 年 3 月起跨瀏覽器**（部分子功能支援程度不一；來源：MDN《Element: animate() method》）。`Element.getAnimations()` 與 `CSSAnimation` 同為 Baseline Widely available，2020 年 7 月起。
- **fallback**：呼叫前檢查 `typeof el.animate === 'function'`；沒有就直接不播——因為所有版本來就畫在最終位置，動畫只是把它們暫時推開再收回，**不播＝直接看到成品，資訊零損失**。
- **`prefers-reduced-motion`**：同一條路徑，四種動效全部略過或停在終點。

### 效能預算實測（2026-08-09）

| 項目 | 實測 | 門檻 |
|---|---|---|
| 單頁大小（含 inline CSS/JS 與靜態 SVG） | index 77 KB／program 156 KB／paint 64 KB／troupe 61 KB | ≤350 KB |
| 引擎（engine + poster + boot） | 21.6 KB 未壓縮 | — |
| 首屏繪圖操作數（index：五塊版 + 筆壓帶） | 996 次 | — |
| 首屏 JS 執行 | 首頁只畫五塊版與一條筆壓帶；24 張縮圖以 `requestAnimationFrame` 分批、每批 8ms 上限 | ≤100 ms |
| 主要動畫 | 全部只動 `transform` / `opacity`，不觸發版面重排 | 60fps |
| 外部資源 | 僅 Google Fonts 兩個家族；零外部圖片、零音檔、零函式庫 | — |

繪圖成本控制：紙的顆粒上限 460 顆、飛沫在 <260px 的縮圖上關閉、24 張縮圖 DPR 降為 1.5 並分批繪製、視窗改變大小以 220ms debounce 重畫。
