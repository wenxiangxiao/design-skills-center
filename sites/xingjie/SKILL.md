---
name: girih-strapwork
description: Islamic girih tilework — five equilateral tiles, white strapwork crossing every edge midpoint at 54 degrees, cobalt stars on turquoise glaze over plaster.
---

# 伊斯蘭幾何 Girih 條帶磚作

> 這份規格書描述的是一套**可以被驗算的**視覺語言。它的每一條線都來自五塊多邊形磚的邊中點，
> 角度只有 18° 的倍數。你不需要會畫，你只需要會排。

---

## 〇、本風格的 5 個不可省略特徵

拿掉任何一條，做出來的東西就不再是 girih，而是「有點中東味的裝飾」。每一條都附可直接複製的片段。

### 特徵 1｜十重對稱：角度只有 18° 的倍數

多邊形內角只出現 **72°／108°／144°／216°** 四個值；帶與邊夾 **54°**；旋轉一律 36° 的倍數。
版面上的斜切、標記、裝飾角、logo 的旋轉全部取自這一組數，**不准出現第五種角度**。

```css
:root{ --u:18deg; }                     /* 全站唯一的角度單位 */
.rot1{ transform:rotate(calc(var(--u)*2)); }   /* 36° */
.rot2{ transform:rotate(calc(var(--u)*3)); }   /* 54°：帶的角度 */
/* 十角星 clip-path（十重對稱，可直接貼） */
.star10{ clip-path:polygon(50% 0,61% 26%,90% 10%,84% 41%,100% 50%,84% 59%,90% 90%,61% 74%,
  50% 100%,39% 74%,10% 90%,16% 59%,0 50%,16% 41%,10% 10%,39% 26%); }
```

### 特徵 2｜帶從每一條邊的中點以 54° 穿過去（girih 定理）

五塊磚（十角／長六角／領結／菱／五角，邊長全部相等）的每一條邊中點上，都有兩條帶以 54° 穿越。
因此**任何邊靠邊的合法拼法，帶都會自動接通**。這是這套系統的全部祕密：工匠排磚，不畫線。

```js
// 由多邊形產生該磚的帶：從每個邊中點射出兩條 54° 的線，
// 兩條線在「等距」相遇處轉折（corner），或直接對穿到另一個邊中點（straight）。
const C54=Math.cos(54*Math.PI/180), S54=Math.sin(54*Math.PI/180);
function rays(pts){                      // pts: 逆時針多邊形
  const R=[];
  for(let i=0;i<pts.length;i++){
    const a=pts[i], b=pts[(i+1)%pts.length];
    const dx=b[0]-a[0], dy=b[1]-a[1], L=Math.hypot(dx,dy);
    const d=[dx/L,dy/L], n=[-d[1],d[0]];            // n 為內法線
    const m=[(a[0]+b[0])/2,(a[1]+b[1])/2];          // 邊中點
    R.push({m,w:[ d[0]*C54+n[0]*S54,  d[1]*C54+n[1]*S54]});
    R.push({m,w:[-d[0]*C54+n[0]*S54, -d[1]*C54+n[1]*S54]});
  }
  return R;                                          // 2n 條射線，配對後即為帶
}
```

五塊磚的內角（邊長設為 1）：

| 磚 | 邊 | 內角 | 面積（邊長 12cm）|
|---|---|---|---|
| 十角 deca | 10 | 144×10 | 1,108 cm² |
| 長六角 hexa | 6 | 72,144,144,72,144,144 | 306 cm² |
| 領結 bow | 6 | 72,72,216,72,72,216 | 189 cm² |
| 菱 rhom | 4 | 72,108,72,108 | 137 cm² |
| 五角 pent | 5 | 108×5 | 248 cm² |

### 特徵 3｜每個交叉都分上下，而且沿同一條帶交替

帶交會處必須一條在上、一條在下，並沿著同一條帶一上一下輪替。**沒有互穿，圖就從編織退化成線框。**
做法：整條帶先畫「墨描邊＋白釉」兩層當作在下者；再對「在上」的那一條，於交叉點前後各 0.30 個單位長度補畫一小段同樣的兩層。

```html
<g fill="none" stroke-linejoin="round" stroke-linecap="butt">
  <path d="…整條帶…" stroke="#2A2028" stroke-width="12"/>   <!-- 墨描邊 -->
  <path d="…整條帶…" stroke="#F2EDE2" stroke-width="7.6"/>  <!-- 白釉 -->
  <!-- 在上者的補畫（交叉點前後各一小段） -->
  <path d="M…前 L交叉點 L…後" stroke="#2A2028" stroke-width="12"/>
  <path d="M…前 L交叉點 L…後" stroke="#F2EDE2" stroke-width="7.6"/>
</g>
```
比例定則：**白釉帶寬＝邊長的 0.132**，墨描邊比白釉再寬 **0.085 個邊長**（兩側各 0.0425）。

### 特徵 4｜色只落在帶圍出來的區裡，帶永遠是全場唯一的白

窯裡的銅綠與鈷藍會互相流染，中間必須留一道不上色的白帶把它們隔開——**白帶是製程，不是裝飾**。
於是：色塊一律鋪在帶之下、由帶切分；全站除了帶以外不准出現白；除了釉光高光以外零漸層。

```css
/* 面板＝一條白釉帶夾兩條墨線。全站所有框都用這一個配方，不用圓角、不用陰影 */
.band{ border:6px solid #F2EDE2; outline:1.6px solid #2A2028;
       box-shadow:inset 0 0 0 1.6px #2A2028; background:#E5DCC7; }
```

### 特徵 5｜圖案被邊界硬切，永遠不是一朵擺在中間的花

牆有多大就鋪到多大，圖在邊界上被切斷，暗示它繼續長出去。**把一整朵完整的星花放在留白正中間，那是海報，不是牆。**

```html
<svg viewBox="0 0 960 800" preserveAspectRatio="xMidYMid slice"> … </svg>
```
`slice` 是這一條的技術落點：容器多寬就切多寬，圖永遠溢出。

---

## 一、設計哲學

1. **排，不是畫。** 畫面上任何一條線都必須能追溯到「哪一塊磚的哪一條邊的中點」。設計者的工作是選磚與定位，不是造形。
2. **可驗算優先於好看。** 角度、寬度比、交錯規則都是可以量的；量不出來的裝飾一律刪。
3. **無限暗示。** 版面沒有「主視覺置中」這回事，圖案是被裁下來的一塊。
4. **白是留出來的。** 白帶隔開兩種會互相流染的釉；所以白不能亂給別的東西用。
5. **一牆一色域。** 一面牆最多三塊釉色＋一個 ≤4% 的點綴色。想要熱鬧就換鋪法，不是換顏色。

## 二、色彩系統

| 用途 | 色票 | 佔比 | 說明 |
|---|---|---|---|
| 灰泥地 | `#D9CDB8` | 26% | 牆體與頁面底色。永遠有紋樣蓋在上面，不做大面積純色留白 |
| 灰泥面板 | `#E5DCC7` | 8% | 長文一律落在面板上 |
| 松綠釉（銅） | `#1E7F79` | 24% | 主釉色＝帶以外的地。表頭、強調背景 |
| 深松綠 | `#17635F` | 6% | 表頭、次級面 |
| 鈷藍釉（回青） | `#16407E` | 16% | 星的顏色。連結、主要按鈕 |
| 深鈷藍 | `#0F2C5A` | 6% | 頁尾 |
| 白釉帶 | `#F2EDE2` | 12% | **只給帶與框**。任何其他元素不准用白 |
| 錳墨 | `#2A2028` | 10% | 全部描邊、正文 |
| 銻黃（赭） | `#C08A2E` | ≤4% | 只給「被指出來的東西」：邊中點、五角磚的小星、現用態、focus |

禁用：紫藍漸層、任何 rgba 模糊陰影、任何第二種白、灰階中性色（灰一律用灰泥色系）。

## 三、字體系統

* 中文：`Noto Serif TC`（900 標題／700 小標／400 內文）。字重跳階要大，中間字重不用。
* 拉丁與異國語：`Amiri` italic，只用在術語（*girih*、*muʿarraq*）與副標。
* 標籤與數字：`Jost` 500，`letter-spacing:.20em`、大寫、`font-variant-numeric:tabular-nums`。
* **不用等寬字**（那是工程製圖的語彙，會把這套東西拉去別的家族）。
* 字級：body 16.5px／行高 1.85；h2 `clamp(21px,2.6vw,29px)`；標籤 12.5px；註 13.5px。

## 四、版面與網格

* 內容寬 1180px，左右 `clamp(14px,3vw,34px)`。
* 節與節之間用 1.6px 錳墨實線 `hr`，不用留白分節（留白會讓灰泥地變成「背景」，而它應該是牆）。
* 圖與文的比例：說明性小圖固定 280px 寬，其餘欄自適應。
* **每一頁至少有一處滿版且被裁切的紋樣**（首屏、牆帶或圖鑑）。
* 旋轉只用 18° 的倍數；不要用 15°、45° 這種非家族角度。

## 五、元件配方

```css
/* 導覽：歸位嵌片。現用頁那一片是「已經嵌回牆上」——與牆齊平、上了釉、有高光 */
nav.tiles a{ transform:translateY(-9px); }                 /* 未歸位：擱在牆外的托盤上 */
nav.tiles a[aria-current="page"]{ transform:translateY(0); background:#1E7F79;
  box-shadow:inset 0 0 0 1.6px #2A2028, 0 -3px 0 #F2EDE2; }
nav.tiles a[aria-current="page"]::after{ content:""; position:absolute; inset:0;
  background:linear-gradient(var(--azm),rgba(255,255,255,.55),rgba(255,255,255,0) 46%);
  opacity:var(--glaze); }                                   /* 釉光，方位由時鐘決定 */

/* 按鈕：一塊磚。外面那一圈就是帶 */
.btn{ background:#16407E; color:#F2EDE2; border:0;
  box-shadow:inset 0 0 0 1.6px #2A2028, 0 0 0 5px #F2EDE2, 0 0 0 6.6px #2A2028; }

/* 表單欄位：凹進灰泥裡 */
input,select,textarea{ background:#D9CDB8; border:0; box-shadow:inset 0 0 0 1.6px #2A2028; }
```
footer 一律鈷藍深色、上緣 6px 白釉帶；表頭深松綠底白字。

## 六、動效規則（四種，缺一不可）

| 類 | 內容 | 觸發 | 參數 |
|---|---|---|---|
| ambient | **釉光**：`feSpecularLighting` 的 `azimuth/elevation` 由訪客本地時鐘算出，每 60 秒更新；疊 26s 的呼吸 | 無 | 方位 `206−146·f`（f＝06:00→18:00 的比例）、仰角 `18+44·sin(πf)`；夜間仰角 15、強度 0.20 |
| input | **游標釉光焦點**：320px 的白色 radial-gradient 以 `screen` 疊在牆上跟著指標走 | pointermove | rAF 節流，延遲 <16ms；`prefers-reduced-motion` 下不啟動 |
| transition | **抹泥**：換頁時灰泥色圓形遮罩由外向內收 | 載入 | `clip-path:circle(150%→0%)`、620ms、`cubic-bezier(.5,0,.2,1)` |
| signature | **抽帶 strand-lift**：點任一條白帶，整條帶（可能穿過幾十次交叉）從牆上抽起——位移 −1.5/−2.5px、加實心投影、其餘全部去飽和 | click／Enter | 讀數同時報出這一條帶的公分數與交叉次數 |

明文禁用：`stroke-dashoffset` 描繪動畫、數字滾動計數、淡入進場當主打、跑馬燈。
四種動效都必須有 `prefers-reduced-motion` 降級，且降級後資訊零損失（抽帶在降級下仍可點、只是不位移）。

## 七、插畫與圖像風格

**全站不准有一張「畫」出來的圖。** 所有圖像——首屏星花、二十四式圖鑑、五塊磚的說明圖、logo、favicon、
窯記與受理印記、頁尾牆帶——都是同一支引擎的輸出：邊接生長鋪面 → 條帶網 → 交錯渲染。

* 圖像原語只有四種：**磚的多邊形**、**帶（等寬折線）**、**星（帶圍出的封閉環）**、**邊中點（黃點，只在教學圖出現）**。
* 判準：拿掉顏色，仍讀得出「哪一塊磚、帶從哪一條邊的哪一點穿過去」。
* 禁止：寫實描繪、半調網點、細線幾何線描、`feTurbulence` 手抖濾鏡、任何外部圖片。

## 八、Logo 與 Favicon

* Logo＝**一塊十角磚**：灰泥方框內一枚松綠十角磚，中央鈷藍十角星，白釉帶描邊，外加 2.6px 錳墨方框。
  轉 18°（`Math.PI/10`）讓星尖朝上。尺寸縮到 24px 仍讀得出十個角。
* Favicon＝同一枚星，去掉磚只留星與帶，inline SVG data URI 寫在 `<head>`：

```html
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'>
<rect width='32' height='32' fill='%231E7F79'/><path d='M16 2.6 18.6 9.5 25.6 6.9 23 13.8 30 16.4 23 19
25.6 25.9 18.6 23.3 16 30.2 13.4 23.3 6.4 25.9 9 19 2 16.4 9 13.8 6.4 6.9 13.4 9.5Z'
fill='%2316407E' stroke='%23F2EDE2' stroke-width='1.8' stroke-linejoin='round'/></svg>">
```

## 九、Do & Don't

**Do**
* 先決定「這面牆用哪五塊磚、什麼比例」，再決定內容區塊。
* 任何裝飾線都要能回答「它從哪一條邊的中點出來」。
* 讓圖案被容器切斷。
* 白留給帶。
* 用鋪法製造變化（同樣五塊磚，換權重就換一張臉）。

**Don't**
* 不要用 SVG 濾鏡做手抖邊、不要用圓角、不要模糊陰影（投影一律實心位移）。
* 不要把星花置中留白當 hero——那是海報排版，不是牆。
* 不要為了「豐富」加第四、第五種釉色。
* 不要用等寬字、不要用 emoji 當 icon、不要 Lorem ipsum、不要「EST. 19xx」徽章、不要紫藍漸層。
* 不要讓帶在交叉處平接（一定要分上下）。

## 十、頁面骨架範例

```html
<header class="mh"><div class="wrap in">
  <a class="brand" href="index.html">…logo…<span><b>店名</b><span class="lat">Latin</span></span></a>
  <nav class="tiles" aria-label="主導覽">
    <a href="index.html" aria-current="page">…tile svg…<em>門面</em></a>
    <a href="two.html">…tile svg…<em>第二頁</em></a>
  </nav>
</div></header>

<section class="hero">                       <!-- 開場：一枚被裁掉的星花 -->
  <div class="girih"><svg class="wall" viewBox="0 0 960 800" preserveAspectRatio="xMidYMid slice">
    <g id="fill">…磚與星…</g><g id="strap">…帶…</g>
    <use href="#strap" filter="url(#gl)" class="glz"/>     <!-- 釉光 -->
  </svg><div class="spot"></div></div>
  <div class="plaque band"><h1>店名</h1></div>
  <ul class="ring"><li style="--i:0">…十個方向的資訊…</li></ul>
</section>

<div class="wrap">
  <section><h2><span class="starb"></span>小標</h2><p>…</p></section>
  <hr class="rule">
</div>
<div class="strip" id="strip"><svg viewBox="0 0 1200 120" preserveAspectRatio="xMidYMid slice"></svg></div>
<footer>…</footer>
```

`ring` 的十個方向：
```css
.ring li{ position:absolute; left:50%; top:50%;
  transform:rotate(calc(var(--i)*36deg + 18deg)) translateY(-260px) rotate(calc(var(--i)*-36deg - 18deg)); }
```

---

## 十一、技術實作與相容性

### 1. SVG `feSpecularLighting` ＋ `feDistantLight`（A 渲染層）

* **承載**：特徵 4 的「釉」。真正的釉面是有厚度的，光打在帶的邊緣會有一條高光；把濾鏡套在帶的圖層上
  （`in="SourceAlpha"` 先 `feGaussianBlur` 當高度圖），高光就沿著帶跑。用 CSS 漸層做不出這件事，
  因為高光要沿著任意折線的邊緣，不是沿著矩形。
* **查證**（2026-09-04，MDN《`<feSpecularLighting>`》）：Baseline **Widely available**，自 2015-07 起跨瀏覽器可用。
* **fallback**：以 `<use href="#strap" filter="url(#gl)">` 疊在原圖之上、`mix-blend-mode:screen`。
  濾鏡不被支援時整個 `<use>` 的輸出等於原圖疊一次（或被忽略），畫面仍是完整的帶，
  資訊零損失；`mix-blend-mode` 不支援時退為一層不透明度 0.2–0.6 的白帶重疊，仍可讀。
* **效能**：濾鏡只套在帶的群組（單頁 7–14 條路徑），非逐磚；`stdDeviation` 固定 1.9 不隨縮放改變。

### 2. `matchMedia` ＋ 真實時刻驅動（B 動效與時間軸層）

* **承載**：ambient 動效。訪客本地 `new Date()` 決定 `azimuth`／`elevation` 與 `--glaze` 強度，
  每 60 秒更新一次；`matchMedia('(prefers-reduced-motion: reduce)')` 決定要不要疊 26 秒的呼吸與游標焦點。
* **查證**（2026-09-04，MDN《Window.matchMedia》《prefers-reduced-motion》）：兩者皆 Baseline Widely available。
* **fallback**：`window.matchMedia` 不存在時視為 `{matches:false}`（本站程式碼已如此防禦）；
  完全沒有 JavaScript 時，`azimuth` 停在標記於 HTML 的初始值 132°／仰角 46°，牆仍然有釉光，只是不隨時間走。
* **註**：這與「晝夜色溫引擎」不同——本站不改任何顏色，只改一個光源的角度。

### 3. 幾何約束求解／規則引擎（E 資料與生成層）

* **承載**：核心功能〈補牆〉與全站圖像。三件事都由它做：
  (a) **邊接生長**：把候選磚熔接到某條自由邊上，以取樣點做多邊形內外測試排除重疊，
      再以「與既有邊重合數」為分數選最佳解（這一條讓牆長得緊密、幾乎沒有孔洞）；
  (b) **合法著手枚舉**：缺口內所有「靠得上邊、不重疊、不出界」的位置；
  (c) **完成判定**：以面積和判定填滿，不比對答案。
* **相容性**：純 JavaScript 幾何運算（`Math.hypot`、陣列），無瀏覽器 API 依賴，無支援缺口。
  決定性偽亂數 FNV-1a → mulberry32，同一個 seed 在 Node 與瀏覽器得到同一面牆，
  所以還原碼 `?w=` 可以完整重跑。
* **實測數字**（Node 22，單執行緒）：
  * 生長一面 55 塊磚的牆：**38 ms**；條帶網（650 段、518 節點）：**1 ms**；輸出整面 SVG 標記：**4 ms**。
  * 40 面牆 × 3 處缺口＝120 處，窮舉全部拼法：平均每處 **1.29** 種不同解，
    **74%** 只有一種解、**26%** 有兩種以上；平均每處有 **58.6** 條會走進死路的分支。
  * 單頁大小（含全部 inline 資源，不含 Google Fonts）：門面 112 KB／補牆 104 KB／圖鑑 125 KB／委託 47 KB，
    全部低於 350 KB 門檻。
  * 首屏 JavaScript：門面與委託頁不做幾何運算（首屏星花在建置階段就已輸出成靜態 SVG 寫在 HTML 裡），
    執行時間 <5 ms；補牆頁首次生長（含選缺口）＋輸出 SVG 實測 **42 ms**，仍低於 100 ms。
  * 動畫：唯一的持續動畫是 26 秒的 opacity 呼吸（合成層屬性），不觸發 layout；
    抽帶只改 `opacity`／`filter`／`transform`。

### 4. 其他

* 版面重繪採整段 `innerHTML` 重建（`Element.innerHTML` 對 SVG 元素同樣有效，Baseline widely available）；
  單次重建 55 塊磚的牆實測 <20 ms，不需要 diff。
* 無外部圖片、無音檔、無函式庫；外部資源只有 Google Fonts。
* `prefers-reduced-motion` 降級：抹泥轉場不生成、呼吸停止、游標焦點不啟動、磚落位不做彈跳；
  所有讀數、判定與內容不變。
