---
name: czech-cubism
description: Czech Cubism (Prague, 1911–1914) — crystalline faceted planes, ridge-as-ornament shading from one fixed light, notched polyline contours, a double oblique grid, and folded crystalline headlines.
---

# 捷克立體主義 Český kubismus

> 一九一一到一九一四年，布拉格。這是全世界唯一一次有人把立體派從畫布搬進建築、家具、陶器、咖啡杯與印刷品的運動。
> 它的規則只有一條：**垂直與水平是物質的惰性，斜面是加進去的第三種力**（Pavel Janák《稜柱與金字塔》，1911–12）。
> 本規格書把這一條拆成五個可以直接複製的做法。

---

## 一、設計哲學

1. **裝飾不是貼上去的，裝飾是折面自己造出來的明暗。** 這個流派沒有花樣、沒有紋樣、沒有母題、沒有材質貼圖。畫面上所有的深淺，都只來自「這個面朝哪一邊」。
2. **只有一盞燈，而且它不會動。** 光源固定（本規格用 `(-0.42, 0.86, 0.40)`），面的明度是它的法線與這盞燈的內積量化到五階的結果。**選一個角度，就等於選了一個顏色**——這是本流派最重要的一句話，介面設計上的每一個決定都可以回到這句話。
3. **拒絕透視。** 一律正交／軸測投影（本規格：yaw 34°、pitch 22°）。沒有消失點、沒有近大遠小、沒有景深模糊。畫面是被折過的平面，不是被拍下來的空間。
4. **矩形是待處理的原料，不是成品。** 版面上任何一個矩形都必須被至少一條斜稜線切開；沒被切過的矩形，等於這個風格還沒開始。
5. **不要跟低多邊形（low-poly）搞混。** low-poly 是為了省三角形而逼近曲面；捷克立體主義是**刻意讓平面互相碰撞產生稜線**，它的面數很少、每個面都很大、每條稜線都是設計決定。判準：如果你的圖看起來像「解析度不夠的球」，那就做錯了。

---

## 二、本風格的 5 個不可省略特徵

> 這五項每一項都是「拿掉它就不是這個風格了」。做完之後把首屏遮掉全部文字，一個懂設計的人要能在三秒內說出「捷克立體派」。

### 特徵 1 — 沒有一個沒被斜切的矩形

每一個容器的四角至少有兩個被 45° 斜切；主稜線角度全站統一為 **−28°**（次要 **+58°**）。

```css
:root{ --notch:15px; --ang:-28deg; }
/* 標準稜角：左上與右下被斜切，其餘保持直角——不對稱是規則不是意外 */
.nx{
  clip-path:polygon(
    0 var(--notch), var(--notch) 0, 100% 0,
    100% calc(100% - var(--notch)), calc(100% - var(--notch)) 100%, 0 100%);
}
@supports not (clip-path:polygon(0 0,1px 0,0 1px)){ .nx{ border:2px solid var(--ridge); } }
```

按鈕用相反的一對角，讓同一列元件的稜線互相咬合：

```css
.btn{
  clip-path:polygon(0 0, calc(100% - 13px) 0, 100% 13px, 100% 100%, 13px 100%, 0 calc(100% - 13px));
}
```

### 特徵 2 — 稜線就是裝飾：一條五階明度梯，一盞不會動的燈

**同一種材質只准有一條明度梯**，梯上五階全部同色相、同彩度，只差明度。顏色不是選出來的，是算出來的：

```js
// 固定光源，永不改變。面的明度階 = 法線·光源 量化到 5 階
const LIGHT = normalize([-0.42, 0.86, 0.40]);
const LADDER = ["#6B6049","#8E8168","#B0A48D","#CDC3AE","#E6DECD"]; // 砂岩
function toneOf(normal){
  const L = dot(normal, LIGHT);              // −1 … 1
  return LADDER[ clamp(Math.floor((L*0.5+0.5)*5), 0, 4) ];
}
```

```css
/* 同一塊面板的三個折面，只是同一條梯上的三階 */
.facet-a{ background:#E6DECD }  /* 朝光 */
.facet-b{ background:#CDC3AE }  /* 側面 */
.facet-c{ background:#8E8168 }  /* 背光 */
/* 禁止：漸層、模糊陰影、glow、backdrop-filter。投影一律是實心位移色塊 */
.shadow-ok{ box-shadow:6px 6px 0 #6B6049 }
```

### 特徵 3 — 輪廓是折線，不是直線也不是圓角

全站 `border-radius:0`，而且邊界本身要折。任何「圓」都改用正多邊形（≥6 邊）。

```css
*,*::before,*::after{ border-radius:0 }
```

```svg
<!-- 印記／頭像／徽記一律六邊形，不用圓 -->
<polygon points="56,3 106,30 106,82 56,109 6,82 6,30" fill="#16342A"/>
<polygon points="56,10 100,34 100,78 56,102 12,78 12,34"
         fill="none" stroke="#A87F35" stroke-width="2"/>
```

稜線一律 `stroke-linejoin:miter`、**禁止** `stroke-linecap:round`。

### 特徵 4 — 雙重斜格：正交欄位與 ±30° 斜格同時在場，稜線跨元件連成一條

一列卡片的「冠—身—腳」三條分界線必須橫跨整列對齊，不管每張卡片的內容長短。這件事只有 `subgrid` 做得到（各卡片自己算列高必定錯開）：

```css
.row3{ display:grid; grid-template-columns:repeat(3,minmax(0,1fr));
       gap:16px; grid-template-rows:auto auto auto; }
.row3>.card{ grid-row:span 3; display:grid; grid-template-rows:subgrid; row-gap:0; }
.row3 .rcap { border-bottom:2px solid var(--ridge) }
.row3 .rbody{ border-bottom:2px solid var(--ridge) }
@supports not (grid-template-rows:subgrid){
  .row3>.card{ display:block }
  .row3 .rcap{ min-height:78px } .row3 .rbody{ min-height:196px }
}
```

### 特徵 5 — 結晶字：標題被同一條稜線折開，上下兩半各取一階明度

標題不是換字體，是被折。這一折用的是全站同一條 −28° 稜線。

```html
<h1 class="fd"><span class="a">稜柱製冰廠</span><span class="b" aria-hidden="true">稜柱製冰廠</span></h1>
```

```css
.fd{ position:relative; display:inline-block }
.fd .a{ display:block; clip-path:polygon(0 0,100% 0,100% 30%,0 56%) }      /* 稜線上半 */
.fd .b{ position:absolute; left:0; top:0; display:block; color:var(--s5);  /* 下半，暗一階 */
        clip-path:polygon(0 56%,100% 30%,100% 100%,0 100%);
        transform:translate(3px,2px) }                                      /* 沿稜線錯開 */
@supports not (clip-path:polygon(0 0,1px 0,0 1px)){ .fd .b{ display:none } }
```

`.a` 是唯一進入文字流的那一份，所以文字仍可選取、可被螢幕閱讀器讀到；`.b` 一律 `aria-hidden`。

---

## 三、色彩系統

配色的單位不是「色票」，是**梯**。一個材質＝一條五階梯，全站最多兩條梯，再加三個專色。

| 角色 | 色票 | 比例 | 用途 |
|---|---|---|---|
| 砂岩梯 S1 | `#E6DECD` | 12% | 朝光面、紙面、表格底 |
| 砂岩梯 S2 | `#CDC3AE` | 14% | 面板本體、側面 |
| 砂岩梯 S3 | `#B0A48D` | 22% | 頁底（大面積，且它永遠是折的，不是一塊平色） |
| 砂岩梯 S4 | `#8E8168` | 6% | 背光面、卡片腳 |
| 砂岩梯 S5 | `#6B6049` | 3% | 最暗面、實心投影 |
| 冰梯 I1–I5 | `#E7EEEF` `#CDD8DB` `#AEBEC3` `#8899A1` `#5F717A` | 22% | 產品／主要圖像（另一種材質，另一條梯） |
| 墨綠 | `#16342A` | 12% | 深底面板、頁尾、表頭、按鈕（Gočár 東方大咖啡館的木作色） |
| 黃銅 | `#A87F35`／深底上用 `#D2A44E` | 5% | 現用態、連結、可動作的東西 |
| 朱 | `#9B2A1E` | ≤3% | 拒絕、退件、警示 |
| 墨 | `#1B1913`／文字次階 `#3A3226` | 4% | 正文 |
| 濁白 | `#DFE3DE` | ≤1% | 材料內部的瑕疵斷面 |

硬規則：

* **禁止漸層**（唯一例外：無）。面與面之間永遠是硬邊。
* **禁止模糊陰影**。投影是同梯最暗階的實心位移色塊。
* 兩條梯不得混用：石頭的面不准用冰的階，反之亦然。
* 大面積底色不得是一塊平色——它必須被切成面，每一面取梯上的一階。
* 文字對比：正文 ≥7:1，小字與標籤 ≥4.5:1。深底上的黃銅一律換亮階 `#D2A44E`（對 `#16342A` 為 5.88:1）。

---

## 四、字體系統

| 用途 | 字體 | 字重 | 尺寸 |
|---|---|---|---|
| 拉丁標題／編號／數字 | **Archivo** | 700 / 900 | 標籤 12.5px、讀數 19–30px |
| 中文標題與正文 | **Noto Sans TC** | 400 / 700 / 900 | 正文 16.5px／行高 1.78 |
| 章節標籤 `.cap` | Archivo 700 | — | 12.5px、`letter-spacing:.22em`、全大寫 |

* **禁止等寬字（monospace）**——那是工程製圖的語彙，會把這個流派拉去另一個家族。數字用 `font-variant-numeric:tabular-nums` 對齊即可。
* 字級階梯：`clamp(22px,2.9vw,31px)` 章標／`clamp(28px,4.4vw,50px)` 頁標／`13.5–17px` 內文。
* 段落文字**一律水平**。傾斜的是容器，不是字（唯一例外是特徵 5 的折字）。

---

## 五、版面與網格

* 主稜線 **−28°**，次稜線 **+58°**。整站只准有這兩個角度，加上正交的 0°／90°。
* 內容欄位仍是正交的（可讀性優先），斜格只作用在**邊界、切角、分界線與背景場**上。
* 版心 `max-width:1140px`，左右 26px（≤560px 時 15px）。
* 章節間距 44–52px；面板內距 26px / 28px。
* 背景場：把視窗切成 7×5 的不規則四邊形網格，每格再被一條 −28° 對角線切成兩個三角面，兩面各取梯上的一階。**只用梯的亮三階**，確保任何內文落在上面都 ≥7:1。

```js
// 背景稜面場（建置期算好，輸出成靜態 SVG 寫進頁內；不需要 JavaScript）
for (let r=0;r<rows;r++) for (let c=0;c<cols;c++){
  const [a,b,d,e] = [P[r][c],P[r][c+1],P[r+1][c+1],P[r+1][c]];   // 節點已加 ±20% 抖動
  emit(`<polygon points="${a} ${b} ${d}" fill="${lad[3+ri(2)]}"/>`);
  emit(`<polygon points="${a} ${d} ${e}" fill="${lad[2+ri(2)]}"/>`);
}
```

---

## 六、元件配方

**導覽（extra-facet）**：四個小多面體並列，現用頁那一個**多鑿了一面**（多一刀＝多一個明度階），而不是被高亮、被放大或被加底色。

```css
.nav a{ display:grid; grid-template-columns:34px 1fr; column-gap:11px;
        background:var(--s2);
        clip-path:polygon(0 11px,11px 0,100% 0,100% calc(100% - 11px),calc(100% - 11px) 100%,0 100%);
        transition:transform 90ms linear, background-color 90ms linear }
.nav a:hover{ background:var(--s1); transform:translate(3px,-3px) }   /* facet-lift */
.nav .on a{ background:var(--green); color:var(--s1) }
```

**面板 `.slab`**：`.nx` 切角 + 純色梯階背景，無邊框、無陰影、無圓角。深色變體 `.slab.dark` 換成墨綠底 + 亮階黃銅標籤。

**按鈕**：見特徵 1 的 `.btn`。hover 是「跳一階 + 沿法線位移 3px」，`transition:90ms linear`——**石頭不回彈，禁止 ease-out 與彈簧曲線**。

**表單**：`border:2px solid var(--ridge)`，無圓角，錯誤態用 `outline:3px solid var(--red)` 加一行朱色說明；說明要指名是哪一欄、為什麼被擋。

**表格**：`border-collapse:collapse`，格線 1.5px 實線 `var(--ridge)`，表頭墨綠底白字。

**頁尾**：整塊被一條折線切開頂緣 `clip-path:polygon(0 26px,46% 0,100% 22px,100% 100%,0 100%)`。

---

## 七、動效規則

四種，缺一不可，全部要有 `prefers-reduced-motion` 降級且降級後資訊零損失。

| 類型 | 做法 | 時值 | 降級 |
|---|---|---|---|
| **ambient 環境** | 真實時刻驅動的狀態推移（本站：96 具冰模依訪客時鐘逐格換階，每秒重算一次倒數）＋已被切掉的塊沿法線緩慢漂離 `62s ease-in-out infinite` | 1s / 62s | 改為 60 秒重算一次；漂移停在靜態位移 |
| **input 輸入** | facet-lift：hover 跳一階明度並 `translate(3px,-3px)` | 90ms **linear** | 只跳階，不位移 |
| **transition 轉場** | 開面推移：新內容沿主稜線由中間往兩側推開 `clip-path` + `steps(5)`——冰是一階一階裂的，不是滑開的 | 420ms `steps(5,end)` | 動畫關閉，直接是最終畫面 |
| **signature 簽名** | 落刀開面：被切走的那塊沿切面法線離開（先抵抗、再一次脆裂），同一幀留下的多面體整批重新著色 | 260ms `cubic-bezier(.88,0,.14,1)` | 直接到最終位置 |

```css
@keyframes cleavewipe{
  from{ clip-path:polygon(0 42%,100% 16%,100% 16%,0 42%) }
  to  { clip-path:polygon(0 -60%,100% -86%,100% 186%,0 160%) }
}
main>section{ animation:cleavewipe 420ms steps(5,end) both }

.fly{ transition:transform 260ms cubic-bezier(.88,0,.14,1), opacity 260ms linear }
.fly.out{ transform:translate(calc(var(--dx)*2.4), calc(var(--dy)*2.4)); opacity:.42 }

@media (prefers-reduced-motion:reduce){
  main>section{ animation:none!important; clip-path:none!important }
  .lift:hover,.nav a:hover,.btn:hover{ transform:none!important }
  *{ transition-duration:1ms!important }
}
```

**禁用**：淡入式滾動揭示、視差、數字滾動、跑馬燈、`stroke-dashoffset` 描線、任何 glow 或呼吸光。稜線不是被畫出來的，是被折出來的。

---

## 八、插畫與圖像風格（facet-solid 稜面實體構成）

全站沒有一張外部圖片，也沒有一張描外形的插圖。**所有圖像都是同一支多面體引擎的輸出**：一個凸多面體被一連串半空間切開，每個可見面依法線取梯上的一階，稜線 1.6–2px 實線。

```js
// 一刀 = 與一個半空間取交集。凸體交半空間仍是凸體，故可反覆施用。
function cleave(faces, n, c){            // 保留 dot(n,p) <= c 的那一半
  const kept=[], segs=[];
  for (const f of faces){
    const out=[], d=f.v.map(p=>dot(n,p)-c); let seg=[];
    for (let i=0;i<f.v.length;i++){
      const j=(i+1)%f.v.length;
      if (d[i]<=0) out.push(f.v[i]);
      if (d[i]*d[j] < 0){                                  // 這條邊跨過切面
        const t=d[i]/(d[i]-d[j]);
        const p=add(f.v[i], mul(sub(f.v[j],f.v[i]), t));
        out.push(p); seg.push(p);
      }
    }
    if (out.length>=3) kept.push({v:out, tag:f.tag});
    if (seg.length>=2) segs.push(seg);
  }
  if (segs.length>=3) kept.push({v:orderLoop(segs), tag:"cut"});   // 新生的那一面
  return kept;
}
// 凸體只需背面剔除，不需要畫家演算法：可見 ⇔ dot(faceNormal, cameraDir) > 0
```

判準：**拿掉全部顏色，仍要讀得出哪一面朝上、哪一面是新切出來的**。

* 投影一律正交，全站共用同一組視角（yaw 34°、pitch 22°）——不同的物件不准用不同的角度。
* 圓形一律以 ≥6 邊的正多邊形代替。
* 明文禁用：`feTurbulence` 手抖濾鏡、半調網點、細線幾何線描、寫實描繪、任何材質貼圖。

---

## 九、Logo 與 Favicon

* **Logo**：一塊被三刀鑿過的多面體（同一支引擎，同一組視角）＋ Archivo 900 的字標 ＋ 一行 `letter-spacing:4.6px` 的黃銅小標。底板是被斜切兩角的墨綠矩形。
* **Favicon**：把 logo 的多面體簡化成四個面，寫成 inline SVG data URI 直接放進 `<head>`，不外連檔案。

```html
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Cpolygon points='2,10 12,2 30,7 30,23 18,31 2,25' fill='%23AEBEC3'/%3E%3Cpolygon points='2,10 12,2 30,7 16,14' fill='%23E7EEEF'/%3E%3Cpolygon points='2,10 16,14 18,31 2,25' fill='%238899A1'/%3E%3Cpolygon points='16,14 30,7 30,23 18,31' fill='%23CDD8DB'/%3E%3Cg fill='none' stroke='%232B3940' stroke-width='1.7' stroke-linejoin='miter'%3E%3Cpolygon points='2,10 12,2 30,7 30,23 18,31 2,25'/%3E%3Cpath d='M2 10L16 14L30 7M16 14L18 31'/%3E%3C/g%3E%3C/svg%3E">
```

---

## 十、Do & Don't

**Do**

* 先決定光源，再決定顏色。改顏色的方法是改角度。
* 每個容器至少被切一角；每一列元件的稜線要對得起來（`subgrid`）。
* 用實心位移色塊當投影。
* 圓形改多邊形；曲線改折線。
* 把「大小＝重量」「角度＝明度」這類**可驗算的規則**寫在畫面上，讓使用者摸得到。

**Don't**

* ✗ 圓角、模糊陰影、玻璃感、glow、漸層背景
* ✗ 透視、景深、環境光遮蔽、假 3D 反射
* ✗ 等寬字＋圖號角標＋量表的「工程製圖」語彙（那是另一個家族）
* ✗ low-poly 逼近曲面（面要少、要大、要有意義）
* ✗ 紫藍漸層 hero、置中大標＋兩顆按鈕＋三張圓角卡片、emoji 當 icon、Lorem ipsum
* ✗ 「EST. 19xx」徽章、老街屋改建的開場敘事、「把 X 變成 Y」的標題模板
* ✗ 跑馬燈、視差、淡入式滾動揭示

---

## 十一、頁面骨架範例

```html
<body>
  <!-- 1. 背景稜面場：建置期算好的靜態 SVG，固定在視窗上 -->
  <svg class="bgfield" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" aria-hidden="true">…</svg>

  <a class="skip" href="#m">跳到主要內容</a>

  <!-- 2. extra-facet 導覽：現用頁那一個多鑿一面 -->
  <nav class="nav"><ul>
    <li class="on"><a href="#" aria-current="page"><svg class="wg">…兩刀…</svg><b>01</b><span>冰庫</span><em>多鑿了一面</em></a></li>
    <li><a href="#"><svg class="wg">…一刀…</svg><b>02</b><span>冰的做法</span></a></li>
  </ul></nav>

  <main id="m"><div class="wrap">
    <!-- 3. 開面直開場：資訊寫在剛剛生出來的那個面上 -->
    <section class="hero"><div class="heroshell">
      <svg class="heroart" viewBox="0 0 980 620" aria-hidden="true">
        <g class="gone" style="--dx:-4px;--dy:-45px">…被切走的那塊…</g>
        …留下的多面體…
      </svg>
      <!-- 面 = clip-path（建置期由那個面的實際投影算出來）；字仍是水平的 HTML -->
      <div class="newface" style="clip-path:polygon(69% 18%,36% 17%,26% 44%,55% 75%,74% 24%)">
        <div class="nfin"><div class="cap">NOVÁ PLOCHA</div>
          <h1 class="fd"><span class="a">店名</span><span class="b" aria-hidden="true">店名</span></h1>
          <p class="nf3">地址／電話／時間／價目</p></div>
      </div>
    </div></section>

    <!-- 4. 一列稜面卡片：三條稜線跨卡片對齊 -->
    <section><div class="row3">
      <div class="card"><div class="rcap">…</div><div class="rbody">…</div><div class="rfoot">…</div></div>
      …
    </div></section>
  </div></main>

  <footer class="ft">…頂緣被折線切開…</footer>
</body>
```

---

## 十二、技術實作與相容性

本站的視覺由三項技術承載。每一項都寫明它在扛什麼、支援現況與查證來源、不支援時的具體行為，以及實測值。

### 1. 無函式庫的凸多面體引擎（A 渲染層）—— 半空間切割 ＋ 正交投影 ＋ 固定光源平面著色

* **它承載什麼**：特徵 1、2、3 與整站每一張圖（首屏那塊冰、六道工序、二十四件出貨簿、導覽楔、logo、favicon、回執印記），以及核心功能本身。
* **為什麼不用 Three.js／WebGL**：本流派拒絕透視、拒絕材質、拒絕連續光照，需要的只是「把凸多面體投影成一組互不重疊的實心多邊形」。凸體只需**背面剔除**（可見 ⇔ `dot(faceNormal, cameraDir) > 0`），連畫家演算法都不需要。輸出成 SVG `<polygon>` 後可縮放、可列印、可被螢幕閱讀器忽略、可在建置期就算完寫進 HTML——**關掉 JavaScript 仍是完整的畫面**。
* **API 依賴**：無。純 JavaScript 數值運算（`Math`、陣列），輸出字串。所有渲染面依賴的 `SVG <polygon>` 與 `<clipPath>` 屬 SVG 1.1，2026 年所有現行瀏覽器全支援（查證：MDN `<polygon>`、`<clipPath>`）。
* **fallback**：SVG 被停用時仍有 `background-color` 的梯階與全部 HTML 文字，資訊零損失。
* **效能實測**：一次完整鑿製（建模 → 逐刀切割 → 體積 → 重心 → 四條規矩驗算）平均 **0.039 ms**（Node 22 單執行緒，9000 次平均），故互動延遲遠低於 100 ms 門檻。單頁最大 99.7 KB（含全部 inline CSS/JS/SVG），低於 350 KB 預算。

### 2. CSS Grid `subgrid`（C 版面與樣式層）

* **它承載什麼**：特徵 4 的「稜線跨元件連成一條」。一列卡片的冠／身／腳三條分界線必須橫跨整列對齊；若每張卡片各自算列高，內容一長一短就會錯開，這個流派的骨架立刻散掉。這件事 flexbox 與一般 grid 都做不到。
* **支援現況（2026-09-02 查證 web-features explorer 與 caniuse `css-subgrid`）**：**Baseline Widely available，自 2026-03-15 起**。Chrome / Chrome Android / Edge 117（2023-09），Firefox 71（2019-12），Firefox Android 79，Safari 與 Safari iOS 16（2022-09）。已列入 Interop 2022／2023／2024／2025。
  來源：<https://web-platform-dx.github.io/web-features-explorer/features/subgrid/>、<https://developer.mozilla.org/docs/Web/CSS/Guides/Grid_layout/Subgrid>、<https://caniuse.com/css-subgrid>
* **fallback（實際行為）**：`@supports not (grid-template-rows:subgrid)` 時卡片改為 `display:block` 並給冠、身兩區固定 `min-height`。此時三條稜線在多數內容長度下仍對齊，內容特別長時會錯開——版面仍完整可讀，只是失去精確對齊。≤820px 一律單欄，本來就不需要跨欄對齊。

### 3. 真實時刻驅動 ＋ `Intl.DateTimeFormat`（B 動效與時間軸層）

* **它承載什麼**：環境動效。鹽水槽 96 具冰模的結凍階不是計時器動畫，是**訪客當下的時鐘**：每具冰模相隔 16 分 15 秒下槽、26 小時一輪，畫面上永遠有格子在跳階，倒數逐秒走。時刻以布拉格現地時間（`Europe/Prague`）顯示，訪客在哪個時區看到的都是同一個廠。
* **支援現況（2026-09-02 查證 MDN）**：`Intl.DateTimeFormat.prototype.formatToParts()` 與 `format()` 的 `timeZone` 選項皆為 **Baseline Widely available，自 2018-10 起跨瀏覽器**。IANA 時區名稱（如 `Europe/Prague`）為實作可選但所有現行瀏覽器皆支援；規格只強制 `UTC`。
  來源：<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat>
* **fallback（實際行為）**：建構 `Intl.DateTimeFormat` 以 `try/catch` 包住；失敗時改用 `Date` 的本機時分並在字串後標「（本機時間）」，班次結構完全不變。**未開啟 JavaScript** 時，96 格顯示的是班次的**相對位置**（每具相隔 16 分 15 秒、一輪 26 小時）——這個資訊永遠為真，且冰模編號、階數、圖例與說明全部是靜態 HTML。
* **降級**：`prefers-reduced-motion` 下重算頻率由 1 秒降為 60 秒，畫面不再逐秒跳字；所有數值仍然正確。

### 其他相依（皆為 Baseline Widely available，不另列為核心技術）

`clip-path:polygon()`（Baseline 2020-09；每一處都附 `@supports not` 降級為實線邊框或直接關閉折字）、CSS 自訂屬性、`transform`／`transition`、`localStorage`（以 `try/catch` 包住，被封鎖時介面明說「貨架擺不上去」並保留刀單碼）、`navigator.clipboard`（不支援時把網址直接印在畫面上讓使用者自己複製）。

---

*本規格書隨 `sites/hranol/`（LEDÁRNA HRANOL 稜柱製冰廠）一同交付。風格與內容分離：這裡定義的是捷克立體主義，不綁定製冰業。*
