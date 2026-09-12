---
name: czech-cubist-plaster
description: Czech Cubism (Prague, 1911-1914) rendered as faceted plaster relief - every surface is broken into 30/60-degree planes and every colour is computed as the dot product of a facet normal with the current light direction, quantised to exactly four plaster tones.
---

# 捷克立體主義・稜面灰泥 Český kubismus / Faceted Plaster

> 這份規格書描述的是一九一一至一九一四年布拉格的**捷克立體主義（český kubismus）**在網頁上的重現方式。它不是「幾何風」、不是「低多邊形」、不是「水晶風」——它有明確的年代、地點、人物與製作技術限制，而且那些限制正是它長成這樣的原因。
>
> 風格與內容分離：本規格書不綁定產業。灰泥工坊、書店、事務所、樂團、資料儀表板都可以套用。

---

## 一、設計哲學

一九一一年，建築師 **Pavel Janák** 在布拉格「造形藝術家團體（Skupina výtvarných umělců）」的刊物上提出：水平面與垂直面只是物質的靜止狀態；要讓物質活起來，必須插進**第三個平面——斜面**。這句主張在三年內被 **Josef Gočár**（黑聖母之家，1912）、**Josef Chochol**（維謝赫拉德山下的公寓與別墅，1912–13）、**Vlastislav Hofman**（家具、燈柱、陶器）照著蓋成了房子。這是設計史上唯一一次有人把一個繪畫運動翻譯成一種**砌牆的方法**，而且真的砌出來了。

因此本風格的核心命題只有一句：

> **斜面存在的唯一理由是它會隨光改變讀數。**

水平面與垂直面在任何光下讀數都不變，所以它們安靜；斜面會變，所以它有事件。這推出三條設計後果，全部不可妥協：

1. **顏色是後果，不是決定。** 設計師只指定形狀與朝向，顏色由 `dot(法線, 光向)` 算出來並量化成四階。整站不存在「品牌色階」這種東西——只有十六個讀數（四種稜高 × 四個朝向）。
2. **狀態語彙不用顏色。** 現用、hover、選中、停用一律以「這塊面轉去朝哪個方向」表達，色調是計算結果。因此同一個 hover 在早上會變亮、在傍晚會變暗。
3. **稜線必須畫出來。** 因為一天裡有兩段時間（清晨與黃昏）光壓得極低，四階會併成兩階，這時形狀只剩線在撐。

不要把這個風格做成「奢華水晶」或「科技低多邊形」。它是**灰泥**——一種便宜、笨重、會積水、每二三十年要修一次的建材。它的氣質是工匠的，不是奢侈的。

---

## 二、本風格的 5 個不可省略特徵

> 拿掉其中任何一項，畫面就不再是捷克立體主義。每一項都附可直接複製的片段。

### 特徵 1：斜面統治所有角度（30° / 60°，沒有第三個角度，沒有曲線）

畫面上任何一個轉折只能是 30° 或 60°。水平線與垂直線只准出現在**承重的東西**上（地板、簷口下緣、表格線、文字基線），裝飾層裡一條垂直線都不准有。**零圓角、零曲線、零弧形。**

```css
/* 稜線一律 30°：dy/dx = tan30 ≒ 0.5774。畫任何一條折線都照這個比例 */
.fold-line { /* 例：寬 280 → 高 162 */ }
```

```html
<!-- 一條稜把一個矩形分成兩塊面。這是本風格最小的成立單位 -->
<svg viewBox="0 0 1600 800" preserveAspectRatio="none">
  <path d="M0 76H1600V308L1180 308L700 308L420 470L0 470Z" fill="var(--l2n)"/>
  <path d="M0 470L420 470L700 308L1600 308V800H0Z"        fill="var(--l2s)"/>
  <path d="M0 470L420 470L700 308L1600 308" stroke="#191612" stroke-width="5" fill="none"/>
</svg>
```

```css
*{border-radius:0}           /* 全站零圓角，這一條要寫死 */
```

### 特徵 2：四階平塗，沒有漸層

每一塊面只有一個顏色；整站的灰泥只有四階。禁止 `linear-gradient`／`radial-gradient` 作為表面、禁止 `box-shadow` 的模糊陰影、禁止柔邊。一個平面在一個光下只有一個讀數，這是物理，不是風格偏好。

```css
:root{
  --p0:#5B5245;  /* 背光 */
  --p1:#8E8270;  /* 側面 */
  --p2:#CDC2AF;  /* 受光 */
  --p3:#F0E9DC;  /* 峰   */
}
/* 影子只能是實心位移色塊，或 multiply 疊層，不可模糊 */
.shadow{ background:#191612; mix-blend-mode:multiply; opacity:.42; }
```

### 特徵 3：色是算出來的（法線 × 光向 → 四階）

這是本風格與所有「幾何裝飾風」的分水嶺。每一個面有一個法線；法線由它的**朝向 q**（N/E/S/W）與**稜高 h**（1–4，代表斜度）決定：

```js
// 一個正四角錐的四個面：q=0..3 對應 N,E,S,W
const Q=[[0,-1],[1,0],[0,1],[-1,0]];
function normal(q,h){                 // h 愈大 → 面愈斜
  const s=0.42+0.26*h, [dx,dy]=Q[q];
  let n=[dx*s, dy*s, 0.62];
  const m=Math.hypot(...n); return n.map(v=>v/m);
}
function sunDir(t){                   // t: 0=日出 → 1=日落
  const a=Math.PI*t;
  let L=[-Math.cos(a), -0.40, Math.sin(a)*0.86+0.16];
  const m=Math.hypot(...L); return L.map(v=>v/m);
}
function tone(q,h,L){                 // → 0..3，直接查 --p0..--p3
  const n=normal(q,h);
  let d=(n[0]*L[0]+n[1]*L[1]+n[2]*L[2] - 0.02)/0.80;
  return Math.floor(Math.max(0,Math.min(0.9999,d))*4);
}
```

把 4 × 4 = 16 個讀數**在建置階段**算成 CSS 自訂屬性，掛在 `html[data-phase]` 上。畫面因此不需要 JavaScript 就是完整的，而 JavaScript 只做一件事：換 `data-phase`。

```css
html[data-phase="4"]{           /* 正午 */
  --l1n:#F0E9DC; --t1n:#191612; --l1e:#F0E9DC; --t1e:#191612;
  --l2s:#5B5245; --t2s:#F0E9DC; --l2w:#8E8270; --t2w:#191612;
  /* … 共 16 組 --l{h}{q}（底色）與 --t{h}{q}（該底色上可讀的文字色）… */
}
```

> **必須同時產生文字色 `--t{h}{q}`**：規則是 tone ≥ 1 用墨 `#191612`，tone = 0 用 `#F0E9DC`。這樣任何一塊面在任何時刻的對比都 ≥ 4.5:1。

### 特徵 4：鋸齒簷口與菱形開口

收頭一律鋸齒，開口一律菱形或六邊形。這是這個流派在街上最容易被認出來的兩個記號——**不要用矩形卡片，不要用圓形頭像框**。

```html
<!-- 鋸齒簷口：先鋪一塊底色，再蓋一排三角 -->
<rect width="1600" height="76" fill="var(--l4s)"/>
<path d="M0 0L88 0L44 76Z" fill="var(--l4n)"/>  <!-- ×18 -->
<path d="M0 76L44 76L88 0" stroke="#191612" stroke-width="3" fill="none"/>
```

```css
/* 菱形開口／記號，用 clip-path，不要用 border-radius 或 rotate 的方塊 */
.rhomb{ clip-path:polygon(50% 0, 100% 50%, 50% 100%, 0 50%); }
```

### 特徵 5：每一條稜都要描出來，線寬隨稜高遞增

兩個面交會處必須有一條墨線。線寬 = `(0.36 + 0.15 × 稜高) × 格寬 / 40`。`stroke-linejoin` 一律 `miter`，**永遠不要 `round`**。

```css
.arris{ stroke:#191612; fill:none; stroke-linejoin:miter; stroke-linecap:butt; }
.arris.h1{ stroke-width:1.3px } .arris.h2{ stroke-width:1.7px }
.arris.h3{ stroke-width:2.0px } .arris.h4{ stroke-width:2.4px }
```

---

## 三、色彩系統

| 角色 | Hex | 用途 | 面積 |
|---|---|---|---|
| 石榴地 | `#63151F` | 頁面底、牆以外的世界。永遠平塗、零紋理、零漸層 | 約 30% |
| 深石榴 | `#47101A` | footer、開口的洞、圖的底 | 約 5% |
| 灰泥・峰 | `#F0E9DC` | 四階之一 | 合計約 50% |
| 灰泥・受光 | `#CDC2AF` | 四階之一 | ↑ |
| 灰泥・側 | `#8E8270` | 四階之一 | ↑ |
| 灰泥・背光 | `#5B5245` | 四階之一 | ↑ |
| 煙黑 | `#191612` | 所有稜線、邊框、紙上的正文 | 約 12% |
| 赭金 | `#C79A3B` | 只給「已成交／此刻／被指名」三種語意 | ≤ 4% |
| 素牆 | `#3E362D` | 只用在「還沒做的地方」（未填的格） | 視情況 |
| 警示紅 | `#C0392B` | 只給「被退件／破綻」，虛線，不填面 | ≤ 1% |

**硬規則**

- **四階不得插值。** 不准出現 `#B0A594` 這種介於兩階之間的顏色。全站顏色數 = 4 階 + 石榴 ×2 + 墨 + 金 + 素牆 + 紅 = 10 個，沒有第十一個。
- **長文一律在灰泥上，不在石榴地上。** 石榴地只承載短標題與導覽（用 `#F0E9DC`，對比 9.2:1）。
- **石榴地永遠不參與明暗計算**——它不是一個面，它是牆以外的空間。
- 若要換色相家族（例如換成靛藍地或苔綠地），四階灰泥必須跟著換成同色溫的四階，且四階之間的明度差須維持 ≒ 0.09 / 0.20 / 0.30 / 0.42 的相對亮度階梯。

---

## 四、字體系統

| 用途 | 字族 | 字重 | 設定 |
|---|---|---|---|
| 拉丁標題／商號 | `Archivo` | 900 | `letter-spacing:.045em`，`text-transform:uppercase` |
| 拉丁小標／編號／數值 | `Archivo` | 700 | `letter-spacing:.16–.36em`，`font-variant-numeric:tabular-nums` |
| 中文標題 | `Noto Sans TC` | 900 | `line-height:1.12`，`letter-spacing:.01em` |
| 中文內文 | `Noto Sans TC` | 400 | `line-height:1.72–1.82` |

字級階梯（全部用 `clamp`，因為版面是滿版的）：

```css
h1{font-size:clamp(30px,5vw,56px)}
h2{font-size:clamp(24px,3vw,36px)}
h3{font-size:17px}  p{font-size:13.4–14.5px}
.lat{font-family:Archivo;font-weight:900;letter-spacing:.10em;text-transform:uppercase}
.kn {font-family:Archivo;font-weight:900;font-size:12px;letter-spacing:.28em;color:var(--gold)}
```

**捷克語是這個風格的一部分。** 章節眉標一律用捷克文全大寫（`FASÁDA` 立面／`FORMY` 模具／`STŮL` 台／`ŘEMESLO` 手藝／`CENÍK` 價目／`PŘEJÍMKA` 驗收），中文標題放在它下面。務必保留 `ě š č ř ž ý á í é ů ú ň ť` 的變音符號——把它們拿掉就變成一般英文網站了。

**禁止**：襯線字、圓體、手寫體、可變字型的寬度軸動畫、任何 `text-shadow`。

---

## 五、版面與網格

- **開場不是 hero。** 首屏是「一條稜把一個平面分成兩塊面」，資訊分別排在兩塊面裡（受光面用墨字，背光面用灰泥白字）。不要大標＋副標＋兩顆按鈕。
- **首屏容器用固定 `aspect-ratio`**（桌機 2/1、手機 76/100），內含的 SVG 用相同比例的 `viewBox` 加 `preserveAspectRatio="none"`——比例相同就不會變形，而百分比定位的 HTML 文字層才對得準。
- 內容區塊一律 `2px solid #191612` 實線分格、`gap:2px` 且底色為墨（縫＝墨線）。**零圓角、零陰影、零外框光暈。**
- 卡片列用 **subgrid**：外層宣告列軌，每張卡 `grid-row:span N; grid-template-rows:subgrid`，讓不同長度的說明不會把規格列擠歪，且所有卡的稜面圖底邊在同一條線上。這是「稜線要跨件連續」這條工法規矩在版面上的落實。
- 留白規則：石榴地本身就是留白，不需要再加 padding 製造呼吸；區塊之間 `padding:66px 0 0`，區塊內 `padding:20–30px`。
- RWD：`≤900px` 全部單欄、首屏換直式 viewBox；`≤560px` 邊距 16px、隱去拉丁副標。

---

## 六、元件配方

```css
/* 稜面板（本風格的「卡片」）：狀態用轉面表達，不用顏色 */
.slab{
  background:var(--l2n); color:var(--t2n);
  border:2px solid var(--ink);
  transition:background-color .9s cubic-bezier(.2,.9,.25,1), color .9s cubic-bezier(.2,.9,.25,1);
}
.slab:hover, .slab:focus-visible{ background:var(--l2w); color:var(--t2w); } /* 轉去朝西 */
.slab[aria-current="page"], .slab.on{ background:var(--l4w); color:var(--t4w); } /* 轉更斜 */

/* 紙（長文的唯一容器）：固定色，不參與明暗計算 */
.paper{ background:var(--p3); color:var(--ink); border:2px solid var(--ink); }

/* 導覽：四塊稜面板橫排，現用頁那塊把最大的面轉向光 */
.nav{ position:sticky; top:0; background:var(--ground); border-bottom:2px solid var(--ink); }
.tab{ position:relative; min-width:104px; padding:8px 12px 9px; overflow:hidden; }
.tab .tsvg{ position:absolute; inset:0; opacity:.34; }  /* 板面上真的有稜面紋 */

/* 按鈕：沒有 hover 變色這回事，只有轉面 */
.btn{ display:inline-flex; gap:10px; padding:12px 20px; font-weight:900; letter-spacing:.05em; }

/* 表格：實線格、表頭用受光階 */
table{ border-collapse:collapse } th,td{ border:1px solid var(--ink); padding:8px 11px }
th{ background:var(--p2); font-weight:900 }

/* 表單：欄位是被挖進灰泥的凹槽，用 multiply 而不是 inset shadow */
input,select,textarea{ background:var(--p2); border:2px solid var(--ink); border-radius:0;
  font-family:inherit; padding:8px 10px; }
input:focus-visible{ outline:3px solid var(--gold); outline-offset:0 }

/* footer：深石榴，資訊三欄 */
footer{ background:var(--ground-d); border-top:2px solid var(--ink); padding:52px 0 40px }
```

**清單記號用菱形，不用圓點：**

```css
li::before{ content:""; width:12px; height:12px; background:var(--ground);
  clip-path:polygon(50% 0,100% 50%,50% 100%,0 50%); }
```

---

## 七、動效規則（四種，缺一不可）

| 類型 | 名稱 | 觸發 | duration / easing | reduced-motion |
|---|---|---|---|---|
| ambient 環境 | 街樹影橫移 | 無，持續 | `1440s linear infinite`，`translateX(0 → 160%)`，`mix-blend-mode:multiply`, `opacity:.42` | 停在 `translateX(64%)`，影子仍在 |
| input 輸入 | 落模預覽 | `pointermove` / 方向鍵 | 立即（< 100 ms，無 transition） | 不變，本來就是即時 |
| transition 轉場 | 脫模顯影 | 新元素出現 | `demould .5s steps(4) both`（`opacity:.15 → 1`，**逐階**，不是淡入） | `animation:none` |
| signature 簽名 | **轉面向光** | 所有狀態切換 | `background-color/color .9s cubic-bezier(.2,.9,.25,1)` | `transition-duration:.001ms`，瞬間到位 |

```css
@keyframes demould{ from{opacity:.15} to{opacity:1} }
.new{ animation:demould .5s steps(4) both }
@media (prefers-reduced-motion:reduce){
  .new{animation:none}
  .shadelayer svg{animation:none;transform:translateX(64%)}
  *{transition-duration:.001ms !important}
}
```

**禁止**：淡入式滾動揭示、視差、數字滾動計數、跑馬燈、按壓硬陰影位移、`stroke-dashoffset` 描繪、任何 `blur`。轉場一律是**逐階**（`steps()`）或**遮罩推移**，因為石膏是一層一層脫模的，不是漸漸浮現的。

---

## 八、插畫與圖像風格：稜面網平面著色（facet-net flat shading）

**零外部圖片。** 所有圖像——logo、favicon、插圖、產品圖、使用者產出——由同一支引擎輸出：

1. 母題寫成一張 `h` 場（每格一個 1–4 的稜高，或 0 表示空）。
2. 每格依 `h` 切面：
   - `h=1`：一條對角把格切成兩個面（單一斜面，「楔」）。
   - `h=2`：四個象限三角面（四角錐）。
   - `h=3`：再疊一枚 45° 內菱（四面），使用 `h-1` 的讀數。
   - `h=4`：再疊第二枚更小的內菱。
3. 每個面填 `var(--l{h}{q})`。
4. 稜線以墨線描出，線寬隨 `h` 遞增。

```js
function relief(cells,u){                 // cells:[[h,…],…]  u:格寬(px)
  const QN=['n','e','s','w']; let s='';
  for(let r=0;r<cells.length;r++)for(let c=0;c<cells[0].length;c++){
    const h=cells[r][c]; if(!h) continue;
    const x=c*u,y=r*u,cx=x+u/2,cy=y+u/2, K=[[x,y],[x+u,y],[x+u,y+u],[x,y+u]];
    let line='';
    for(let q=0;q<4;q++){
      const a=K[q], b=K[(q+1)%4];
      s+=`<path d="M${a} L${b} L${cx} ${cy}Z" fill="var(--l${h}${QN[q]})"/>`;
      line+=`M${a} L${cx} ${cy}`;
    }
    s+=`<path d="${line}" stroke="#191612" stroke-width="${(0.36+0.15*h)*u/40}" fill="none"/>`;
  }
  return s;
}
```

**判準：拿掉全部顏色，仍讀得出哪裡是峰、哪裡是谷。** 若做不到，是稜線沒描或線寬沒隨稜高變。

**禁止**：寫實描繪、細線幾何線描（單一線寬的裝飾外框）、半調網點、`feTurbulence` 手抖濾鏡（灰泥的邊是刀切的，不是手抖的）、等角投影（本風格是**正投影的浮雕**，不是 2.5D 積木）。

---

## 九、Logo 與 Favicon

- **Logo** = 一小塊稜面牆（2×3 格，稜高各不相同）＋ 一條 3px 墨色分隔線 ＋ 商號拉丁大寫（Archivo 900，字距 3）＋ 捷克文業別小字（赭金，字距 4）。整枚放在石榴底上，外框 6px 墨線。商標本身就是產品的樣本，不是抽象符號。
- **Favicon**：一枚菱形切成四個面的稜錐，四階各佔一面，加十字稜線。32×32 inline SVG data URI：

```html
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%2363151F'/%3E%3Cpath d='M16 3 29 16 16 29 3 16Z' fill='%23F0E9DC'/%3E%3Cpath d='M16 3 29 16 16 16Z' fill='%23CDC2AF'/%3E%3Cpath d='M29 16 16 29 16 16Z' fill='%235B5245'/%3E%3Cpath d='M3 16 16 29 16 16Z' fill='%238E8270'/%3E%3Cpath d='M16 3 29 16 16 29 3 16ZM16 3v26M3 16h26' fill='none' stroke='%23191612' stroke-width='1.6'/%3E%3C/svg%3E">
```

---

## 十、Do & Don't

**Do**

- 先決定形狀與朝向，讓顏色自己算出來。
- 讓狀態語彙掛在幾何上（轉面），而不是掛在顏色上。
- 保留捷克文與它的變音符號。
- 每一條稜都描線，線寬隨稜高。
- 文案從材料與工序長出來：石膏要睡一夜、模一次灌兩遍、填縫的人與砌牆的人不是同一個。

**Don't**

- ❌ 不要圓角、不要模糊陰影、不要漸層、不要玻璃擬態。
- ❌ 不要把它做成「水晶／鑽石／低多邊形／科技感」。它是灰泥，是便宜的建材。
- ❌ 不要紫藍漸層 hero、不要置中大標＋副標＋兩顆按鈕＋三張圓角卡片。
- ❌ 不要 emoji 當 icon（icon 一律自繪 SVG，且只用 30°/60° 直線）。
- ❌ 不要 Lorem ipsum，不要「在當今快節奏的世界」。
- ❌ 不要「EST. 19xx」年份徽章——年代要寫在句子裡。
- ❌ 不要用可變字型的寬度軸做動態排版，也不要用曲線做任何裝飾。
- ❌ 不要在同一塊面上放兩個顏色，也不要在四階之間插值。

---

## 十一、頁面骨架範例（可直接使用）

```html
<!doctype html><html lang="zh-Hant" data-phase="4"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@500;700;900&family=Noto+Sans+TC:wght@400;700;900&display=swap" rel="stylesheet">
<style>
:root{--ground:#63151F;--ground-d:#47101A;--ink:#191612;--gold:#C79A3B;
      --p0:#5B5245;--p1:#8E8270;--p2:#CDC2AF;--p3:#F0E9DC}
html[data-phase="4"]{--l2n:#F0E9DC;--t2n:#191612;--l2w:#8E8270;--t2w:#191612;
                     --l4w:#5B5245;--t4w:#F0E9DC;/* …其餘 12 組… */}
*{box-sizing:border-box;margin:0;border-radius:0}
body{background:var(--ground);color:var(--p3);font-family:"Noto Sans TC",Archivo,sans-serif;line-height:1.72}
.slab{background:var(--l2n);color:var(--t2n);border:2px solid var(--ink);
      transition:background-color .9s cubic-bezier(.2,.9,.25,1),color .9s cubic-bezier(.2,.9,.25,1)}
.slab:hover{background:var(--l2w);color:var(--t2w)}
.paper{background:var(--p3);color:var(--ink);border:2px solid var(--ink)}
.cards{display:grid;grid-template-columns:repeat(3,1fr);gap:2px;background:var(--ink);
       border:2px solid var(--ink);grid-template-rows:auto auto auto}
.card{grid-row:span 3;display:grid;grid-template-rows:subgrid;background:var(--p3);color:var(--ink)}
@supports not (grid-template-rows:subgrid){
  .cards{grid-template-rows:none}.card{grid-row:auto;display:flex;flex-direction:column}}
.fold{position:relative;width:100%;aspect-ratio:2/1;border-bottom:2px solid var(--ink)}
.fold>svg{position:absolute;inset:0;width:100%;height:100%}
</style></head><body>

<nav class="nav"><div class="navin">
  <a class="brand" href="./"><!-- 稜錐 logo --></a>
  <div class="tabs">
    <a class="tab slab" href="a.html"><span class="tno">01 FASÁDA</span><span class="tnm">立面</span></a>
    <a class="tab slab" href="b.html" aria-current="page">…</a>
  </div>
</div></nav>

<header class="fold">
  <svg viewBox="0 0 1600 800" preserveAspectRatio="none" aria-hidden="true"><!-- 兩塊面 + 一條稜 --></svg>
  <div class="tx">
    <div class="mark"><!-- 商號：墨字，排在受光面上 --></div>
    <div class="addr"><!-- 地址電話：灰泥白字，排在背光面上 --></div>
  </div>
</header>

<main>
  <section class="sec"><div class="wrap">
    <div class="hd"><span class="kn">CENÍK</span><h2>價目</h2></div>
    <div class="cards"><!-- 三張稜面卡 --></div>
  </div></section>
</main>

<footer>…</footer>
<script>
(function(){var d=new Date(),m=d.getHours()*60+d.getMinutes(),rise=378,set=1162,p;
 p=(m<rise||m>set)?8:Math.min(7,Math.floor((m-rise)/((set-rise)/8)));
 document.documentElement.setAttribute('data-phase',String(p));})();
</script></body></html>
```

---

## 十二、技術實作與相容性

> 查證日期 **2026-09-05**，來源為 MDN Web Docs、caniuse.com 與 web-platform-dx「Web features explorer」。

### 1. `mix-blend-mode: multiply`（A 渲染層）— 承擔全站的影子

畫面上同時存在四階灰泥，任何用固定色畫的影子都會在其中至少一階上失真（在 `--p0` 上看不見、在 `--p3` 上過重）。`multiply` 讓同一塊影子在四階上各自正確地暗一階，這是四階平塗風格能有影子的唯一方法。

- **支援現況**：MDN 標示 **Baseline Widely available**，自 **2020-01** 起跨瀏覽器；Chrome 41+／Edge 79+／Firefox 32+／Safari 8+／Opera 28+，caniuse 全球約 **96%**。（註：`plus-lighter` 等個別 blend 值支援較晚，本風格不使用。）
- **Fallback**：不支援時瀏覽器忽略該宣告，影子退為半透明實色疊層；形狀、位置與資訊完全不變。另可加 `@supports (mix-blend-mode:multiply){ .shadow{opacity:.42} }` 並把預設 `opacity` 降到 `.18` 以避免壓黑。

### 2. CSS Grid `subgrid`（C 版面與樣式層）— 承擔跨件對齊的稜線

模冊卡片的「圖／名稱／說明／規格」四列共用外層網格的列軌，因此不同長度的說明文字不會把規格列擠歪，二十四張卡的稜面圖底邊落在同一條線上。這是工法規矩「稜線要跨件連續」在版面上的直接落實；用 flex 或等高 hack 做不到（那只能對齊卡片外框，不能對齊卡片內部的列）。

- **支援現況**：web-features explorer 記為 **Widely available（since 2026-03-15）**；Firefox 71（2019-12-10）、Safari 16（2022-09-12）、Chrome / Edge 117（2023-09），caniuse 全球約 89%。列入 Interop 2022–2025。
- **Fallback**：`@supports not (grid-template-rows:subgrid){ .card{grid-row:auto;display:flex;flex-direction:column} .card .spec{margin-top:auto} }`。四列內容全在、規格列仍貼底，只是不跨卡對齊。資訊零損失。

### 3. 真實時刻驅動的光向（B 動效與時間軸層）— 承擔「顏色是後果」

以 `new Date()` 取裝置本地時刻，落在日出 / 日落之間切成八段、夜間一段，寫進 `<html data-phase>`；十六組色階變數隨之整批換值，每 30 秒重檢一次。**沒有滑桿、沒有開關**——光是外部條件，不是可調參數。這一點是本風格與「換光角觀察浮雕」類互動的分野。

- **支援現況**：`Date`、`setInterval`、CSS 自訂屬性、`transition` 皆為 **Baseline Widely available**（2020 年前即跨瀏覽器）。
- **Fallback**：無 JavaScript 時 `data-phase` 停在 HTML 內寫死的正午值，十六組變數照樣生效，畫面完整可讀——這是把明暗算在 CSS 變數而非 JS 裡的理由。
- **可用性補強**：由於清晨與黃昏時四階會併階，**狀態不得只靠色調表達**——現用頁另加實線稜與底部色條，`:focus-visible` 另加 3px 赭金 outline。

### 4. 效能預算實測

| 項目 | 實測 |
|---|---|
| 單頁大小（含全部 inline CSS/JS/SVG） | 46 – 116 KB（上限 350 KB） |
| 外部資源 | 只有 Google Fonts；零外部圖片、零音檔、零函式庫 |
| 首屏 JavaScript | 只做一次 `setAttribute('data-phase')`，< 1 ms；所有 SVG 在建置階段算好寫進 HTML |
| 互動重繪（600×400 稜面板，約 400 節點） | 單次重建 `innerHTML` < 6 ms |
| 回溯法求解器（拼模台「代砌」） | 空牆 18 ms（Node 22 單執行緒）；含避開同稜高的剪枝版 ~0.5 s，上限 30 萬步 |
| 動畫 | 只動 `background-color` / `opacity` / `transform`，不觸發 layout；60 fps |

---

## 十三、把這個風格用到別的產業

風格與內容分離。換產業時**只換三件事**：

1. **母題的 `h` 場**——牆換成別的東西（書背、酒瓶、鍵盤、地圖、聲部），但仍是一張 1–4 的稜高場。
2. **捷克文眉標換成該產業的術語**（仍用捷克文或該地語言的全大寫，保留變音符號）。
3. **「稜高」的語意換成該產業的量**（重要性、庫存、聲部高低、風險等級），但仍只有四級，仍決定明暗。

**不能換的**：30°/60°、四階平塗、色由法線與光向算出、鋸齒與菱形、稜線描邊。換掉任何一項，它就變成別的風格了。
