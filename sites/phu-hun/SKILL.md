---
name: toile-de-jouy-copperplate
description: Toile de Jouy (Oberkampf, Jouy-en-Josas 1760–1843; copperplate-printed from 1770, Jean-Baptiste Huet designs from 1783) — one engraved plate, one ink on unbleached cotton, tone made only by line density, frameless vignette islands of current events floating in a hidden half-drop repeat.
---

# 茹伊印花布 Toile de Jouy — 銅版單墨規格書

> **參照**：Christophe-Philippe Oberkampf 於 1760 年在凡爾賽附近的 Jouy-en-Josas 設廠，1770 年採用銅版印花（V&A），1783 年取得皇家特許並聘請畫家 Jean-Baptiste Huet（1745–1811）；Huet 的〈Les travaux de la manufacture〉1783–84（The Met）把工廠自己的工序刻成布；〈Le Ballon de Gonesse〉約 1784（Cooper Hewitt／Smithsonian：銅版印花、紅墨、白棉布）把 1783 年兩次熱氣球飛行——包括 Gonesse 村民以乾草叉攻擊落地氣球——拼成漂浮的小場景。工廠 1843 年歇業後，「toile de Jouy」泛指這一類單色場景印花布。
>
> **為什麼長這樣**：銅版是凹版——刀刻出的溝才吃墨，所以**沒有平塗**，所有明暗只能靠線的疏密與交叉；一塊版只能上一罐墨，所以**單色**；銅版尺寸有限（後期改滾筒），圖案必須**無縫接版**，於是場景被做成不帶框的「島」，接縫藏在島與島之間的草叢與空白裡；它是十八世紀的媒體，所以**刻當下的事**——工廠、氣球、時事——用田園的語氣。
>
> 本規格以 Demo「浮雲號熱氣球 PHÛ-HÛN」（台東鹿野高台晨飛）示範。風格與產業分離：任何產業只要能說出「一個早上的六件事」，就能做成一塊茹伊布。

---

## 本風格的 5 個不可省略特徵

拿掉任何一項，它就變成「普通的線稿插畫網站」。

### 1. 一塊版一罐墨（single plate, single ink）
整頁只有一個墨色＋一個布色。沒有第二色相、沒有灰、沒有半透明的「淡色版」；字、框、按鈕、圖全部同一罐墨。換頁可以換墨（茜紅→靛藍→錳紫），但一頁內永遠只有一罐。

```css
:root{--ink:#9E2B25;--paper:#F2EADB}                     /* rouge garance 茜草紅 */
html[data-ink="bleu"]{--ink:#24406E;--paper:#EEEADF}      /* bleu indigo 靛藍 */
html[data-ink="manganese"]{--ink:#5A3346;--paper:#F1E8DC} /* manganèse 錳紫 */
body{color:var(--ink)}  /* 全站不得出現任何其他 color 值 */
```

### 2. 明暗只能是刀線的疏密（tone = line density）
淺＝一層斜線、中＝兩層交叉、深＝三層；光固定從左上，影子永遠在右下。介面狀態也遵守：hover 加一層斜線、選中加第二層，**不准用不透明度或平塗色塊表達狀態**。

```css
.btn:hover{background:var(--paper) repeating-linear-gradient(-38deg,
  color-mix(in srgb,var(--ink) 55%,transparent) 0 .7px,transparent .7px 3.4px)}
.btn[aria-pressed="true"]{background:var(--paper)
  repeating-linear-gradient(-38deg,var(--ink) 0 .7px,transparent .7px 3.4px),
  repeating-linear-gradient(50deg,var(--ink) 0 .7px,transparent .7px 3.4px)}
```
```svg
<!-- 圖像：色調場決定排線層數。三層門檻 .14 / .40 / .68，角度 -38° / 50° / -4° -->
<path class="p" d="…"/>                                         <!-- 先以布色填滿＝遮住後面的線 -->
<path d="M12 40l9-7M15 43l9-7…" stroke="#9E2B25" stroke-width=".75"/>  <!-- 第一層 -->
<path d="M14 33l7 8M17 31l7 8…" stroke="#9E2B25" stroke-width=".65"/>  <!-- 第二層：只在 tone>.40 處落刀 -->
```

### 3. 不帶框的漂浮島（frameless vignette islands）
每個場景是一座「島」：沒有框、沒有底色塊，地面是一組越往外越斷續的水平線、前緣一排草叢，邊緣自己散掉。文字區也是島：留白（reserve）四周以水平雕線溶進布面，而不是畫一個框。

```css
.reserve{padding:15px;
  background:linear-gradient(var(--paper),var(--paper)) content-box,
    repeating-linear-gradient(0deg,var(--paper) 0 1.6px,transparent 1.6px 3.4px) padding-box}
```

### 4. 看不見的半錯接（hidden half-drop repeat）
一塊版兩欄各三島，右欄下移半座（demi-chute）。島與島之間只放雲、鳥、草，接縫不准落在任何一座島上；跨上下版邊的島必須在版的頂與底各畫一次。本 Demo 的版為 760 × 1000，左欄島心 (190, 167／500／833)，右欄 (570, 0／333／667／1000)；兩條縫 x≈380 與 x≈0／760 永遠留空——熱氣球只在縫裡飛。

```css
:root{--s:.74} @media(max-width:560px){:root{--s:.5}}
html{background:var(--paper) url(assets/toile-rouge.svg) 0 0/calc(760px*var(--s)) calc(1000px*var(--s)) repeat}
```

### 5. 刻當下的事，字也是刻的（current events in a pastoral voice; engraved lettering）
場景是這家店真實的一個早上（冷充氣、點火、溪上、降落、追球車、補布），不是神話也不是商品照；每座島下有一行斜體法文小字當圖說（`I · GONFLAGE À FROID · 04 h 50`），放大才讀得到。標題用銅版花體（Pinyon Script），標籤用 Fell 小型大寫，中文用 Noto Serif TC——全部同墨。

```html
<p class="script" lang="fr">Le vol du matin</p>
<h1>浮雲號熱氣球・鹿野高台晨飛<small class="fr">Ballons de Luye, imprimés sur toile</small></h1>
<style>.script{font-family:"Pinyon Script",cursive}.sc{font-family:"IM Fell English SC",serif;letter-spacing:.12em}</style>
```

---

## 1. 設計哲學

茹伊布是一份**印在窗簾上的報紙**。它的美來自限制：一塊銅版、一罐墨、一個無縫的版距。網站版的茹伊布遵守同一套限制：整頁就是布，資訊住在「沒印到的留白島」裡，所有的深淺都是刀線。遠看是花紋，近看是故事——設計的高潮永遠是「湊近」。

- 遠：均勻的單色紋理，像壁紙。
- 中：一座座島，可辨認人物與事件。
- 近：刀線、草叢、圖說小字、某個人的斗笠。

## 2. 色彩系統

| 角色 | 茜紅版 rouge | 靛藍版 bleu | 錳紫版 manganèse | 比例 |
|---|---|---|---|---|
| 布 paper（未漂白棉） | `#F2EADB` | `#EEEADF` | `#F1E8DC` | 60–70% |
| 墨 ink（唯一的墨） | `#9E2B25` | `#24406E` | `#5A3346` | 線 15–25%、字 5–8% |
| 布紋 weave | 布色上 30% 不透明的 feTurbulence 經緯紋（暖褐 alpha） | 同 | 同 | 整面 |

規則：一頁一罐墨；**不得**出現第二色相、黑色、灰、漸層、模糊陰影。強調只能靠：線變密、雙線框、小型大寫、花體。

## 3. 字體系統

- 花體標題：**Pinyon Script** 400（Google Fonts）——銅版圓手書；46–86px，line-height 1。只用於法文短語（Le vol du matin／Les vols／La toile／Bon vent）。
- 標籤與表頭：**IM Fell English SC**，letter-spacing .08–.12em，13–16px。
- 法文斜體圖說與數字：**IM Fell English** italic，舊式數字 `font-variant-numeric:oldstyle-nums`。
- 中文：**Noto Serif TC** 500／700／900；內文 16px／1.9；h1 25–36px 900、letter-spacing .06em。
- 字級 scale：13 / 15 / 16 / 22 / 28 / 36 / 52 / 86。

## 4. 版面與網格

- **整頁是布**：背景就是印花，原點在文件左上（`0 0`）、隨頁捲動，所以「頁面座標 mod 版距 = 版上座標」。
- **資訊在留白島（reserve）裡**：不對稱散佈——hero 島貼左下、記事島左側 sticky、價目島靠右；島與島之間至少留 36–46vh 的布，讓花紋被看見。
- 版距縮放 `--s`：桌機 .74（版 562 × 740 px）、≤900px .62、≤560px .5。
- 不旋轉版面；唯一的傾斜是提示標籤 −3°。
- 圓角只用在橢圓（印記、圓章、封印），矩形一律直角。

## 5. 元件配方

- **布頭印記（logo）**：橢圓雙框 `rx114 ry74`＋內框，外圈 textPath 上弧「PHÛ-HÛN · BON VENT」、下弧「LUYE · TAITUNG · MMXIII」，中心刻一顆小氣球＋店名。模仿工廠蓋在布頭的 chef de pièce 與「Bon Teint」印記（Bon Vent 是雙關）。
- **圓章導覽 medallion-row**：三個 92×116 的橢圓章，各刻一個迷你場景（氣球／縱谷／阿嬤），`box-shadow:0 0 0 4px var(--paper),0 0 0 5px var(--ink)` 做雙框；現在頁加第三道框。hover 上浮 4px 並傾 −2°。
- **按鈕**：1.5px 墨框、布底、Fell 小型大寫；hover＝一層斜線、pressed＝交叉線、solid＝墨底布字。
- **表格**：表頭下 `3px double`、列間 1px 實線、價格用 Fell 24px 舊式數字。
- **票根／訂位單**：1.5px 框＋外圈 4px 布＋1px 墨（雙框），列以點線分隔。
- **頁尾**：也是一座留白島，花體「Bon vent.」。

## 6. 動效規則（4 種，皆有 reduced-motion 降級）

| 類型 | 做法 | 觸發／時間 | 降級 |
|---|---|---|---|
| ambient 環境 | 小熱氣球沿**接版縫**緩升（SVG SMIL `animateMotion`，每 240px 左右擺 ±7px） | 自動；11–16 px/s、負 begin 錯開 | `pauseAnimations()` 停在錯開的位置，資訊不變 |
| input 輸入 | **雕版放大鏡**：圓形黃銅鏡跟著游標，鏡內 ×2.4 重新點陣化同一張向量布（看得到刀線與圖說小字）；鏡心落在細節上時十字變粗、鏡下出現標籤 | pointermove → rAF；觸控＝點一下彈出 1.5 秒；鍵盤方向鍵 | 直接操作、無補間，不需降級 |
| transition 轉場 | **壓印滾筒**：換頁時一支刻線滾筒由上往下滾，把頁面蓋成白布；新頁由同一支滾筒「印」出來 | 出 460ms、入 620ms，`cubic-bezier(.6,0,.4,1)` | 直接換頁 |
| signature 簽名 | **拆版**：看不見的半錯接沿版縫裂開——每塊版離中心外移 8.5%、縮 .9，虛線版界與 I–VI 島號浮現，約 3.4 秒後合回 | 按鈕／完成記事後自動；WAAPI 720ms、依距離延遲 | 靜態顯示拆開狀態，點擊或 Esc 合版 |
| 局部 | 找到細節時封印壓下 `scale(1.9) rotate(-14deg)→none` 420ms；失手「non」上飄 1.1s | — | 1ms |

自我限制：**禁用淡入捲動揭示、禁用 stroke-dashoffset 描線**——刀線是一次印上的，不是畫出來的。

## 7. 插畫與圖像風格：色調場雕線 tone-field engraving

1. 每個形先定義成多邊形，並給一個**色調函數** `tone(x,y)`（球體：法線·左上光；山：離稜線越遠越深；地面：離中心越遠越淺）。
2. 依序對三層（−38° / 50° / −4°，間距 3.5 / 3.5 / 3.0）掃描：求線與多邊形的交點（偶奇規則）得到線段，沿線每 1.4px 取樣，`tone > 門檻` 才落刀——同一條線會因明暗自然斷開。
3. 畫家演算法：每個形先以布色填滿（遮住後面的線）→ 排線 → 1px 外框。
4. 地面以水平短線＋值噪聲做斷續邊、前緣草叢 5 筆。人物 30px 高、不刻五官。雲＝扇貝上緣＋下半部水平線。
5. 印在布上：整組線過 `feDisplacementMap`（scale 1.5）模擬墨在棉布上的微暈，布面加經緯 feTurbulence。

```js
// 最小可用的色調場排線（掃描線 × 多邊形，偶奇配對）
function hatch(poly, tone, {a, sp, thr}) {
  const d=[Math.cos(a),Math.sin(a)], n=[-d[1],d[0]], segs=[];
  const pn=poly.map(p=>p[0]*n[0]+p[1]*n[1]), pd=poly.map(p=>p[0]*d[0]+p[1]*d[1]);
  for (let s=Math.min(...pn)+sp/2; s<Math.max(...pn); s+=sp) {
    const ts=[]; poly.forEach((_,i)=>{const j=(i+1)%poly.length;
      if((pn[i]-s)*(pn[j]-s)<0) ts.push(pd[i]+(pd[j]-pd[i])*(s-pn[i])/(pn[j]-pn[i]));});
    ts.sort((x,y)=>x-y);
    for (let q=0;q+1<ts.length;q+=2){ let st=null;
      for (let t=ts[q]; t<=ts[q+1]; t+=1.4){ const x=n[0]*s+d[0]*t, y=n[1]*s+d[1]*t;
        if (tone(x,y)>thr){ if(!st) st=[x,y]; } else if (st){ segs.push([st,[x,y]]); st=null; } }
      if (st) segs.push([st,[n[0]*s+d[0]*ts[q+1], n[1]*s+d[1]*ts[q+1]]]); }
  }
  return segs; // → 一條 <path d="M…l…">
}
```

## 8. Logo 與 Favicon

- Logo：見 §5 布頭印記；`assets/logo.svg` 為獨立版本（Georgia 退回字型）。
- Favicon：32px 布色方塊上一顆單線氣球，球身 1.6px、經線 0.9px、實心吊籃——同一罐茜紅。

## 9. Do & Don't

**Do**：整頁一罐墨；明暗用線；場景不加框；接縫藏在島之間；刻具體的人與時間（「黃文彬的斗笠 05:41」）；放大後要有新東西可讀。

**Don't**：
- 不要第二個顏色（金、黑、灰都不行）、不要漸層與模糊陰影、不要用 opacity 做淺色。
- 不要把場景放進矩形框或卡片，不要三張圓角卡片並排。
- 不要讓接縫落在人或物上；不要網格對齊的整齊排列（那是壁紙格子，不是半錯接）。
- 不要 emoji、不要 Lorem ipsum、不要紫藍漸層、不要「EST. 19xx」徽章。
- 不要用 dashoffset 描線動畫與通用淡入當主打。

## 10. 頁面骨架範例

```html
<html lang="zh-Hant-TW" data-ink="rouge">
<body>
<header class="top">
  <a class="stamp" href="index.html"><!-- 橢圓布頭印記 SVG --></a>
  <nav class="medals"><a class="medal on" href="index.html" aria-current="page"><span class="ring"><!-- 迷你刻線場景 --></span><span class="lab"><b>晨飛記事</b><i>Le vol du matin</i></span></a>…</nav>
</header>
<main>
  <section class="hero"><div class="reserve"><div class="in">
    <p class="script" lang="fr">Le vol du matin</p>
    <h1>店名・一句話<small>法文副標</small></h1>
    <dl class="facts"><dt>Prochain vol</dt><dd>…</dd></dl>
    <a class="btn solid" href="#log"><span class="zh">主要動作</span></a>
  </div></div></section>
  <div style="height:46vh"></div>   <!-- 讓布被看見 -->
  <section class="log"><div class="reserve"><div class="in">…</div></div></section>
</main>
<footer class="reserve foot"><div class="in"><p class="script">Bon vent.</p>…</div></footer>
</body></html>
```

---

## 技術實作與相容性

### A. 銅版雕線生成器（E 資料與生成層）——建置期 Node
- 純算術：mulberry32 決定性亂數、值噪聲、掃描線×多邊形交點（偶奇配對）、色調場門檻取樣、畫家演算法留白。輸出 `assets/toile-{rouge,bleu,manganese}.svg` 三個色版（同一塊版換墨）。
- 為什麼建置期：同一引擎在 Node 實測整版生成約 80ms，若放在瀏覽器會吃掉首屏 100ms 預算；建置期輸出也讓**無 JS 時布面仍完整**。
- 體積：每個色版 242KB（gzip ≈ 60KB）。壓縮手段：座標 1 位小數＋相對 `l` 指令、線寬改 class（`<style>` 內 `.w0{stroke-width:.75}`）、每層一條 `<path>`。

### B. SVG 濾鏡 feTurbulence＋feDisplacementMap＋feColorMatrix（A 渲染層）
- 用途：墨在棉布上的微暈（displacement scale 1.5）與經緯布紋（兩道異向 baseFrequency `.9 .045`／`.045 .9` 相乘，再以 feColorMatrix 轉成暖褐 alpha）。
- `stitchTiles="stitch"` 讓雜訊在版邊連續——否則半錯接的版邊會露出一條雜訊接縫。
- 支援：MDN 標示 feTurbulence、feDisplacementMap 與 baseFrequency／scale 皆為 **Baseline Widely available（2015-07 起）**。濾鏡寫在作為 CSS background 的 SVG 圖片內，瀏覽器每個尺寸只點陣化一次（放大鏡 ×2.4 為另一個快取尺寸）。
- Fallback：若濾鏡不被渲染，線條只是更銳利、布紋消失，構圖與資訊不變。

### C. SVG SMIL `<animateMotion>`（B 動效與時間軸層）
- 用途：小熱氣球沿兩條接版縫（x = 380·s 與 760k·s）上升；路徑每 240px 一段三次貝茲左右擺。`<use href="#mb">` 引用刻線小氣球 symbol。負 `begin` 讓每顆氣球一開始就散在不同高度。
- 支援：MDN 標示 `<animateMotion>` **Baseline Widely available（2020-01 起）**；BCD 列 Chrome 19、Firefox 4、Safari 6 起支援。
- Reduced motion：`svg.pauseAnimations()`（負 begin 已讓氣球分散），資訊零損失；`matchMedia` change 事件即時切換。

### D. 其他
- 放大鏡：同一個 SVG 色版以 `background-size × --M` 第二次點陣化；`background-position = 鏡半徑 − 頁面座標 × M`，rAF 合併 pointermove，延遲一幀（<17ms）。
- 細節判定：頁面座標 ÷ s mod (760, 1000) → 版上座標，再以環繞距離（wrap）比對六個細節圓；任何一座重複的島都算。
- 拆版：Web Animations API `element.animate()`＋`reverse()`；`color-mix()` 與 `:has()` 為 Baseline 2023，不支援時 hover 斜線退回為無底紋、選中仍有底線。
- 效能：首屏 JS 僅事件綁定＋產生 ≤20 個 `<use>`（估計 <5ms；本輪建置環境無可用的實機瀏覽器，以 jsdom 驗證邏輯、resvg 驗證點陣化）；動畫只有 SMIL 位移與 transform，無 layout thrash；單頁 HTML 66–76KB＋色版 242KB ≈ 310–320KB（≤350KB）。
- 查證來源：MDN `<animateMotion>`、`<feDisplacementMap>`、`<feTurbulence>`；Cooper Hewitt／Smithsonian、LACMA〈Le Ballon de Gonesse〉；V&A（Oberkampf 1770 採用銅版、1843 歇業）；The Met〈Les travaux de la manufacture〉。
