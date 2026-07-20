---
name: trace-overlay
description: A single-hue indigo ink system on a dark field where every image is an accumulated motion trace rather than a drawn shape — measurement-table layouts, hairline geometry, no curves that were not computed.
---

# 軌跡疊印風 Trace-Overlay

> 這份 SKILL 定義的是一套**視覺語言**，不綁定產業。牧羊犬、物流路線、機械手臂、洋流、球員跑動、
> 甚至一間餐廳的出餐動線——任何「有東西在移動、而移動本身就是內容」的題材都適用。

---

## 一、設計哲學

**這套風格只有一條規則：不要畫東西，讓東西自己留下痕跡。**

一般網站的圖像是「某人決定了一個形狀，然後把它畫出來」。本風格的圖像是
「某個過程跑了一遍，我們把它經過的地方記下來」。前者是設計，後者是**紀錄**。
這個差別會滲透到每一個層面：

- 沒有裝飾性曲線。畫面上每一條曲線都必須是某個運算的輸出，說得出它是誰走出來的。
- 沒有第二個色相。整站只有一支墨，濃淡完全由**疊了幾次**決定。這讓「累積」變成唯一的表現力。
- 底是暗的，跡是亮的。因為軌跡是被記錄下來的東西，像長曝底片上的光，不是塗在紙上的顏料。
- 版面像一張量測台，不像一張海報。標題不喊口號，數字要能被讀出來，規則要能被查得到。

**態度**：這是一個給操作者看的介面，不是給參觀者看的展示。文案用行話，用短句，用具體數字，
不解釋顯而易見的事，也不替使用者感到興奮。允許直接說「這一條沒有商量」。

---

## 二、色彩系統

單一色相（H ≈ 224）的七階墨。**禁止引入任何第二色相**——沒有強調色、沒有警示紅、沒有成功綠。
需要區分語意時，改用明度、線寬、虛實、疊印次數。

| 階 | Hex | 用途 | 面積佔比 |
|----|-----|------|----------|
| `--i0` | `#070A14` | 頁面底色、畫布底、按鈕預設底 | ~62% |
| `--i1` | `#0E1424` | 面板／卡片底、次級區塊 | ~18% |
| `--i2` | `#1B2540` | 所有 1px 分隔線、表格線、場地格線、理想線 | ~7% |
| `--i3` | `#33436E` | 次級線、標籤文字、圖說、禁用態 | ~5% |
| `--i4` | `#5E72A6` | 內文次要色、群體軌跡（粗淡線）、單位符號 | ~4% |
| `--i5` | `#93A3CE` | 主要內文 | ~3% |
| `--i6` | `#DCE3F5` | 標題、數值、主體軌跡（細亮線）、反白按鈕底 | ~1% |

**反白規則**：按鈕 hover／按下／`aria-pressed=true` 一律**整塊換成 `--i6` 底、`--i0` 字**，
不位移、不加陰影、不改圓角。這是全站唯一的「強調」手法。

**疊印規則（本風格的核心）**：軌跡畫在一塊**永不自動清除**的畫布上，
`globalAlpha` 取 0.10–0.22，走第二趟就疊在第一趟上面。濃度即次數，這是唯一的資料視覺化語言。

```js
tc.globalAlpha=.13; tc.strokeStyle=INK.f4; tc.lineWidth=4.6;  // 群體／次要軌跡：粗、淡
tc.globalAlpha=.20; tc.strokeStyle=INK.f6; tc.lineWidth=1.5;  // 主體／關鍵軌跡：細、亮
```

---

## 三、字體系統

Google Fonts 三支，各司其職，**不得互相代班**：

| 字族 | 角色 | 字重 |
|------|------|------|
| **Antonio** | 所有標題、標籤、按鈕、HUD 數值、表頭、SVG 圖內文字 | 600 / 700 |
| **Archivo** | 拉丁內文與所有數字 | 400 / 500 / 600 |
| **Noto Sans TC** | 中文內文 | 400 / 500 / 700 |

```css
--fh:'Antonio','Noto Sans TC',sans-serif;
--fb:'Archivo','Noto Sans TC',sans-serif;
body{font-family:var(--fb);font-size:15px;line-height:1.72;font-feature-settings:"tnum" 1}
```

Antonio 是窄高的無襯線體，像場地標示牌與儀器面板上的字。它承擔本風格全部的「聲音」，
所以**不要用它排內文**——超過兩行就會變成噪音。

字級 scale：

| 用途 | 值 |
|------|-----|
| 巨數字（分數、讀數） | `clamp(54px,9vw,96px)` / Antonio 700 / line-height .9 |
| h2 | `clamp(26px,4.4vw,46px)` / line-height 1.06 |
| h3 | `clamp(19px,2.4vw,25px)` |
| HUD 值 | 17px Antonio 600 |
| 內文 | 15px / 1.72 |
| 小字、圖說 | 13px / 1.7，色 `--i4` |
| 標籤 `.lab` | 12px Antonio，`letter-spacing:.26em`，大寫，色 `--i4` |
| 表頭 | 11px Antonio，`letter-spacing:.17em`，大寫，字重 400 |

**字距是本風格的指紋**：所有 Antonio 的小尺寸用法都要拉開 `.14em–.26em`。這是儀器面板的字距。

---

## 四、版面與網格

**零圓角、零陰影、零漸層。** 所有分隔都是 1px 實線 `--i2`。這一條沒有例外。

- 容器 `max-width:1180px`，左右 padding 22px。
- 主工作區採 `minmax(0,1fr) 336px` 雙欄：左邊是**畫布／量測對象**，右邊是**控制與讀數**。≤1000px 塌成單欄。
- 章節之間用 `border-top:1px solid var(--i2)` + `padding:56px 0`，不用留白分段。
- 章節標題配一個兩位數編號（`01`／`02`…），Antonio 12px `.2em` 色 `--i3`，與標題基線對齊。
- **不對稱走道**：導覽固定在右上角時，`901px–1580px` 區間給 `.wrap` 加 `padding-right:188px`，
  讓整個版面往左偏。這條走道是刻意的，不要試圖置中補回來。

**HUD 讀數列**：畫布正下方一排 `repeat(6,1fr)` 的格子，每格上排是 Antonio 9.5px `.19em` 的欄名、
下排是 17px 的值，格與格之間 1px 直線。≤700px 改 3 欄。這是本風格辨識度最高的元件之一。

---

## 五、元件配方

### 導覽（course-plan 型）

不要置頂列。導覽是一張**縮小的場地／流程圖固定在右上角**，每一頁是圖上的一個標記點：

```css
.plan{position:fixed;top:14px;right:14px;z-index:60;background:rgba(7,10,20,.94);
      border:1px solid var(--i2);padding:9px 9px 7px;backdrop-filter:blur(3px)}
.plan .mk circle{fill:var(--i0);stroke:var(--i4);stroke-width:1.6}
.plan a:hover .mk circle,.plan a.on .mk circle{fill:var(--i6);stroke:var(--i6)}
```

- 標記點之間用 `stroke-dasharray:2 3` 的細線連起來，那條線同時是「流程的順序」。
- 每個標記旁邊標英文段名（Antonio 9px），中文放在 `aria-label`。
- **≤900px 必須退回底部四格橫列**（`position:static`，`display:grid;grid-template-columns:repeat(4,1fr)`），
  頁尾另備完整文字連結保底。

### 按鈕

```css
.btn{font-family:var(--fh);font-size:13px;letter-spacing:.13em;text-transform:uppercase;
     background:var(--i0);color:var(--i5);border:1px solid var(--i3);padding:9px 15px;
     transition:background .13s linear,color .13s linear,border-color .13s linear}
.btn:hover,.btn:focus-visible,.btn[aria-pressed="true"]{background:var(--i6);color:var(--i0);border-color:var(--i6)}
```

指令按鈕在主標下方掛一行 Antonio 9px `.16em` 色 `--i3` 的鍵盤代號（`<i>` 標籤），反白時一起變 `--i0`。

### 卡片

```css
.card,.panel{border:1px solid var(--i2);background:var(--i1);padding:13px 13px 11px}
```
就這樣。沒有圓角、沒有陰影、沒有 hover 浮起。卡片頂部掛一個 `.lab` 標籤。

### 量表條

```css
.bar{display:grid;grid-template-columns:52px 1fr 34px;gap:7px;align-items:center;font-size:11px}
.bar u{text-decoration:none;height:3px;background:var(--i2)}
.bar u span{display:block;height:3px;background:var(--i5)}
```
高度固定 3px，不加圓角，數值靠右對齊並用 `tabular-nums`。

### 表格

```css
th{font-family:var(--fh);font-size:11px;letter-spacing:.17em;text-transform:uppercase;
   color:var(--i3);font-weight:400;border-bottom:1px solid var(--i3)}
td{border-bottom:1px solid var(--i2);padding:8px 10px;vertical-align:top}
td.n{text-align:right;font-variant-numeric:tabular-nums;color:var(--i6)}
```
本風格**大量使用表格**。規格、規則、算式、費用一律進表，不要拆成卡片牆。

### 算式區塊

```css
.formula{font-family:var(--fh);font-size:14px;letter-spacing:.06em;color:var(--i6);
         border:1px solid var(--i2);background:var(--i1);padding:12px 14px;line-height:1.9}
```
把計算規則**直接印在頁面上**。本風格的可信度來自「你算得出我怎麼算的」。

### 表單

`input,select` 用 `--i0` 底、`--i3` 框、`--i6` 字，無圓角，`width:100%`。
`label` 一律 Antonio 11px `.17em` 大寫色 `--i4`。

### Footer

`border-top:1px solid var(--i2)`，三欄（地址時間人／頁面連結／免責），
底部再一條 `--i2` 細線 + 11.5px 色 `--i3` 的一句話尾註。

---

## 六、動效規則

**本風格幾乎沒有動畫。** 會動的只有模擬本身，而模擬不是動畫，是運算的即時呈現。

| 對象 | 觸發 | duration | easing |
|------|------|----------|--------|
| 按鈕整塊反白 | hover / focus / aria-pressed | 130ms | linear |
| 量表條寬度 | 值變動 | 120ms | linear |
| 畫布重繪 | 每幀（rAF）或每次參數變動 | — | — |

**明文禁止**（這些是本風格的反面）：淡入揭示進場、數字滾動計數、按壓硬陰影位移、
`stroke-dashoffset` 描繪動畫、跑馬燈、視差捲動、自動播放的裝飾動畫。

參數變動刻意**無過渡**：改一個值就重繪，瞬間即回饋。延遲只有在模擬裡才有意義。

`prefers-reduced-motion` 降級：

```css
@media(prefers-reduced-motion:reduce){*{animation-duration:.001ms!important;transition-duration:.001ms!important}}
```

```js
var RM=!!(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches);
if(RM){ /* 不啟動 rAF；改提供「單步 +N 秒」與「自動示範（無頭運算後一次繪出終態）」 */ }
```
**降級不得移除任何邏輯**——使用者仍必須能取得完整的結果與診斷。

---

## 七、插畫與圖像風格：path-trace 軌跡積分製圖

**本風格沒有插圖。頁面上每一張圖都是某次運算留下的路徑。**

作法：

1. 把題材寫成一個**可以跑的模型**（多智能體、物理、路徑規劃、排程……）。
2. 用固定種子跑一遍，每隔固定時間取樣一次位置，把取樣點串成 polyline。
3. 主體軌跡用**細亮線**（`--i6`，1px，opacity .9），群體／次要軌跡用**粗淡線**（`--i4`，2.6–3.4px，opacity .55）。
   這條明度分工是本技法的識別，不可對調。
4. 底圖只有場地／座標系的最少幾何：外框 1px `--i2`、理想線 `stroke-dasharray:2.4 3.2`、
   關鍵位置用 2px 短線段標出來。**不畫任何寫實物件**。
5. 靜態頁面的圖在**建置時**跑完並烘成 SVG `<path d="…">` 直接寫進 HTML——
   這樣沒有 JavaScript 也看得到，而且它仍然是引擎的輸出，不是有人畫的。

```html
<svg viewBox="0 0 240 170" role="img" aria-label="…的軌跡：粗淡線是群體，細亮線是主體">
  <rect x="1" y="1" width="238" height="168" fill="none" stroke="#1B2540" stroke-width="1"/>
  <path d="M120 24L120 90L120 132L52 112L158 126" fill="none" stroke="#1B2540"
        stroke-width="1" stroke-dasharray="2.4 3.2"/>
  <path d="M…" fill="none" stroke="#5E72A6" stroke-width="2.8" opacity=".55"
        stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M…" fill="none" stroke="#DCE3F5" stroke-width="1" opacity=".9"
        stroke-linecap="round" stroke-linejoin="round"/>
</svg>
```

**與其他技法的分界**：
- 與 `thin-lineart` 的差別：那是等寬單色的裝飾性外框；本技法的線是時間積分的路徑，換一組參數就換一張圖。
- 與 `generative-canvas` 的差別：那是抽象生成美術；本技法的每一條線都有語意，能讀出誰在什麼時候走到哪裡。
- 與 `grain-accretion` 的差別：那是粒子在場的零點集合上堆積成的**結果**；本技法畫的是**過程**本身。
- 與 `nomogram-scale` 的差別：那畫的是量表；本技法畫的是被量的東西留下的痕跡。

---

## 八、Logo 與 Favicon

Logo 就是**一段軌跡**——把品牌最具代表性的那個動作跑一遍，取它的路徑。

- 標記：主體軌跡（細亮線 `--i6` 1.7px）＋ 群體軌跡（粗淡線 `--i4` 3.4px）＋
  兩截門柱短線（`--i3` 1.7px）＋ 起點／終點一個 r≈1.9 的實心圓。全部 `stroke-linecap:round`。
- 字標：Antonio 700 的中文品牌名（27px、`letter-spacing:2`）＋ 下方 Antonio 600 的英文
  （11px、`letter-spacing:5.4`、色 `--i4`）。左對齊，靠在標記右邊 22px 處。
- 標記與字標的高度比約 1 : 1.1，不要讓標記比字大。

Favicon：同一個標記塞進 34×34、加上 `--i0` 底方塊，寫成 inline SVG data URI：

```html
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='...' viewBox='0 0 34 34'%3E...%3C/svg%3E">
```
線寬在 34px 尺寸下加粗到 1.9–3.6px，否則會消失。**不要在 favicon 裡放字。**

---

## 九、首創技術實作配方：間接控制的雙層自主系統

這一章是本風格的核心互動配方。它不只是動畫，是一個**你無法直接操作的世界**。

### 9.1 三層結構

```
使用者  ──有限詞彙的指令──▶  代理（有延遲、有自己的執行邏輯）
                                    │ 以壓力場影響
                                    ▼
                             自主群體（各自跑自己的規則）
                                    │
                                    ▼
                                 目標狀態
```

三層之間**只能單向傳遞**。使用者碰不到群體，也碰不到代理的位置——只能改變代理的**行為模式**。

### 9.2 指令延遲（讓「收不回來」變成技術）

```js
Trial.prototype.issue=function(c){
  if(this.done)return;
  this.started=true;
  this.pend=c; this.pt=this.lat;      // lat = 該代理自己的反應延遲，逐個體不同
  this.log.push({t:this.t,c:c});      // 指令序列本身就是後面診斷的輸入
};
// step() 開頭：
if(this.pend){this.pt-=dt;if(this.pt<=0){this.cmd=this.pend;this.pend=null;}}
```

**設計要點**：延遲必須大到看得出來（0.25–0.65 秒），並且**顯示在 HUD 上**（「等待 0.31s → 推進」）。
使用者要能感覺到「我剛剛那個指令已經送出去了，我救不回來」。這是整套互動的張力來源。

### 9.3 代理的執行邏輯：指令不做使用者的工作

**最重要的一條設計決策**：代理的「前進」指令**不得自動修正方向**。

```js
// 錯的做法（會讓整個互動失去意義）：
// 朝「目標與群體連線的反向延長點」移動 —— 代理自動繞到正確的一邊，使用者按一次就贏了
//
// 對的做法：朝群體重心直線壓上去，壓到自己的「用距」就停
var ux=C.x-D.x, uy=C.y-D.y, ul=Math.max(hyp(ux,uy),.001), want=ul-standoff;
if(want>.25){var mv=Math.min(want,sp*k*dt); D.x+=ux/ul*mv; D.y+=uy/ul*mv;}
```

方向由代理**站在哪一邊**決定，而站在哪一邊只能靠「繞行」指令改變。
這一條決定了使用者到底在不在玩：實測中，只下一次「前進」就不管的走法會直接失敗，
而懂得先繞到正確位置再前進的走法可以走到 90 分以上。

繞行則是繞著群體重心轉，半徑往代理自己的習慣寬度**慢慢**收斂（遠時快、近時慢）：

```js
var dir=(cmd==='flankL')?1:-1, rt=Math.max(flankR,standoff*.95);
ang+=dir*(sp/Math.max(r,5))*dt;
r+=(rt-r)*Math.min(1,dt*((r>rt*1.6)?1.7:0.30));
D.x=C.x+Math.cos(ang)*r; D.y=C.y+Math.sin(ang)*r;
```

### 9.4 自主群體：三個力 + 兩個保命條款

```js
for each member i:
  // 1) 逃離代理（隨距離非線性增強）
  if(dd<fleeR){var w=(fleeR-dd)/fleeR, fw=34*w*(0.40+0.60*w);
               ax+=ddx/dd*fw; ay+=ddy/dd*fw; al=min(1,al+w*dt*5.5);}
  else al=max(0,al-dt*.55);
  // 2) 凝聚：一定要用「最近 k 個鄰居」，不要用「半徑內的鄰居」
  //    半徑截斷會讓群體一旦被打散就永遠回不來 —— 這是最容易踩的坑
  nb.sort(byDistance); take k=6; ax+=toLocalCentre*(1.8+al*7.4)*min(gl/7,3.2);
  // 3) 分離：< 2.9 單位時互推
  // 保命條款 A：邊界斥力（距邊界 11 單位內線性推回），否則個體會被壓在牆上永久卡死
  // 保命條款 B：警戒解除後速度上限降到 0.55（吃草），警戒中 4.6（逃跑）
```

**兩個坑，都會讓模擬看起來「壞掉」但不報錯**：
1. 凝聚用半徑截斷 → 群體炸開後不可逆，展開度衝到 100+ 單位。**改用最近 k 鄰居。**
2. 沒有邊界斥力 → 個體被代理壓在邊界上，重心永遠不動，模擬看起來凍結。

### 9.5 從指令序列做診斷（不是從成績）

分數只是分數。真正的產出是**使用者的操作習慣畫像**：

```js
profile = {
  rate   : 指令數 / 分鐘,
  stand  : 代理與最近成員的平均距離,
  lie    : 「停」狀態的時間佔比,
  steady : 「慢」指令佔全部指令的比例,
  bias   : (左繞 − 右繞) / (左繞 + 右繞),
  spread : 群體最大散開度
}
```

再替每一個候選個體推出「牠吃得下的手」（全部從牠自己的參數推導，並**把推導出來的理想值印在頁面上**）：

```js
iRate  = 6 + eye*16 + (0.60 - resp)*20;   // 反應慢的個體吃不下密集指令
iStand = (6.4 + eye*4.8)*1.12;            // 眼力強的站得遠也有效
iLie   = 0.10 + grip*0.42;                // 壓迫強的需要更常被喊停
iSteady= 0.06 + (1 - eye)*0.30;           // 自己收不住的需要人幫忙收
match  = 100 - (|Δrate|/14*30 + |Δstand|/6*26 + |Δlie|/.45*22 + |Δsteady|/.40*18);
```

**然後給一顆按鈕讓使用者當場驗證這個配對**，並且**保留上一趟的軌跡**——
新的軌跡疊在舊的上面，配對準不準，使用者自己看得出來。
這一步是本配方與一般「測驗→推薦」最大的差別：推薦不是終點，是一個可反覆檢驗的假設。

### 9.6 累積曝光畫布

兩張疊在一起的 canvas：`#trail` 在下（**永不自動清除**），`#fld` 在上（每幀 clear）。

```html
<div class="cvwrap"><canvas id="trail"></canvas><canvas id="fld" aria-hidden="true"></canvas></div>
```
```css
.cvwrap{position:relative;border:1px solid var(--i2);background:var(--i1);overflow:hidden}
.cvwrap canvas{display:block;width:100%;position:absolute;left:0;top:0}
.cvwrap canvas#trail{position:relative}   /* 由它撐出容器高度 */
```
resize 時要把 `#trail` 先畫到暫存 canvas 再等比貼回去，否則累積的紀錄會被清空。
另外一定要給一顆「清版」按鈕——累積是特色，但使用者必須能重來。

### 9.7 可用性保底（破格不等於難用）

- 六個指令**同時**綁按鈕與鍵盤（`A/D/W/S/Space/R`），觸控裝置只用按鈕也能完整操作。
- 一定要有「**自動示範**」：內建一個會下指令的 AI 操作者，無頭跑完全程後一次繪出軌跡與完整診斷。
  不想玩、不能玩、或使用 reduced-motion 的人，都能拿到完整內容。
- 一定要有「單步 +N 秒」，讓 reduced-motion 使用者逐段推進。
- 第一個指令下達之前**不計時、不計分**（`if(!this.started)return;` 擋在階段推進與扣分之前），
  否則使用者一邊讀說明一邊就超時了。
- 所有規則、算式、參數表、清單都是靜態 HTML，關掉 JS 也讀得完；另附 `<noscript>` 替代管道。

---

## 十、Do & Don't

**Do**

- 每一條曲線都說得出它是誰走出來的
- 用明度、線寬、虛實、疊印次數區分語意
- 把算式印在頁面上
- 大量用表格，數字一律 `tabular-nums` 靠右
- 標籤與小字拉開 `.14em–.26em` 字距
- 讓使用者可以把同一件事做第二次，並把兩次疊在同一塊版上
- 文案用行話、短句、具體數字；敢說出使用者不想聽的話

**Don't**

- ❌ 不要第二個色相。沒有品牌紅、沒有成功綠、沒有警示黃
- ❌ 不要圓角、不要陰影、不要漸層、不要模糊
- ❌ 不要紫藍漸層 hero；不要「置中大標＋副標＋兩顆按鈕＋三張圓角卡片」
- ❌ 不要 emoji 當 icon，也不要線描小圖示——本風格的圖只有軌跡
- ❌ 不要裝飾性曲線、不要手繪感、不要有機形狀
- ❌ 不要跑馬燈、不要淡入揭示、不要數字滾動計數、不要 dashoffset 描繪
- ❌ 不要 Lorem ipsum，不要「在當今快節奏的世界」「把 X 變成 Y」「EST. 19xx」
- ❌ 不要讓「前進」類指令自動幫使用者修正方向——那會讓整個互動失去意義
- ❌ 不要在移動端保留 fixed 的圖形導覽，一定要退回底部橫列並在頁尾備完整連結

---

## 十一、頁面骨架範例

```html
<!DOCTYPE html>
<html lang="zh-Hant">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>走場台｜牧線工作站 DROVELINE</title>
<link rel="icon" href="data:image/svg+xml,%3Csvg…%3E">
<link href="https://fonts.googleapis.com/css2?family=Antonio:wght@400;600;700&family=Archivo:wght@400;500;600&family=Noto+Sans+TC:wght@400;500;700&display=swap" rel="stylesheet">
<style>
:root{--i0:#070A14;--i1:#0E1424;--i2:#1B2540;--i3:#33436E;--i4:#5E72A6;--i5:#93A3CE;--i6:#DCE3F5;
      --fh:'Antonio','Noto Sans TC',sans-serif;--fb:'Archivo','Noto Sans TC',sans-serif}
*{margin:0;padding:0;box-sizing:border-box}
body{background:var(--i0);color:var(--i5);font-family:var(--fb);font-size:15px;line-height:1.72;
     font-feature-settings:"tnum" 1}
h1,h2,h3{font-family:var(--fh);color:var(--i6);line-height:1.06}
.wrap{max-width:1180px;margin:0 auto;padding:0 22px}
@media(min-width:901px) and (max-width:1580px){.wrap,.brandbar{padding-right:188px}}
.sec{padding:56px 0;border-top:1px solid var(--i2)}
.lab{font-family:var(--fh);font-size:12px;letter-spacing:.26em;text-transform:uppercase;color:var(--i4)}
@media(prefers-reduced-motion:reduce){*{animation-duration:.001ms!important;transition-duration:.001ms!important}}
</style>
</head>
<body>

<header class="brandbar">
  <a class="brand" href="index.html"><svg width="34" height="34" viewBox="0 0 34 34">…軌跡標記…</svg>
    <span><span class="bn">牧線</span><span class="bs">DROVELINE</span></span></a>
  <div class="meta">宜蘭三星・行健溪河灘牧地<br>03-989-4172</div>
</header>

<nav class="plan" aria-label="賽程圖導覽">
  <p class="pt">Course plan · 1:1200</p>
  <svg class="planmap" viewBox="0 0 132 132">
    <rect x="4" y="4" width="124" height="124" class="fieldline"/>
    <path class="idl" d="M36 18 L96 52 L26 88 L104 112"/>
    <a href="index.html" aria-current="page" class="on"><g class="mk">
      <circle cx="36" cy="18" r="5"/><text x="36" y="34" text-anchor="middle">LIFT</text></g></a>
    …
  </svg>
  <div class="planfoot">…行動版四格…</div>
</nav>

<main>
  <!-- live-world 開場：沒有大標，畫面上的東西在你到之前就已經在動 -->
  <section id="stage" class="wrap">
    <div class="rig">
      <div>
        <div class="cvwrap"><canvas id="trail" role="img" aria-label="…"></canvas>
                            <canvas id="fld" aria-hidden="true"></canvas></div>
        <div class="hud">
          <div><span>階段 Phase</span><b id="hud-ph">—</b></div>
          …共六格…
        </div>
        <p class="msg" id="hud-msg" role="status" aria-live="polite">…</p>
        <noscript><p class="msg">…靜態替代說明與聯絡管道…</p></noscript>
      </div>
      <div>
        <div class="card"><span class="lab">哨令 Whistle</span>
          <div class="pad">
            <button class="btn" data-cmd="comebye">左繞<i>A</i></button>
            …
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="sec wrap">
    <div class="sechead"><span class="num">02</span><h2>場地與賽程</h2></div>
    <div class="cols c2">…表格與算式…</div>
  </section>
</main>

<footer><div class="wrap">…三欄…<p class="fnote">…一句話尾註…</p></div></footer>
<script>/* 引擎與 UI 全部 inline */</script>
</body>
</html>
```

---

*本 SKILL 由 **Claude Opus 4.8** 撰寫（2026-07-20，排程 Agent 自動執行）。範例站：`sites/droveline/`。*
