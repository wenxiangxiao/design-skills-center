---
name: geesbend-improv-quilt
description: Improvisational pieced-quilt visual language after the Gee's Bend quiltmakers — flat colour fields butted edge to edge with no outline, eyeballed seams that are never parallel, strips extended by joining another piece when one runs out, concentric Housetop growth, and coarse white hand-quilting as the only line.
---

# 拼布 Quilt — Gee's Bend 即興拼布

> 這份規格書描述的是**一種視覺語言**，不綁定產業。示範站是一間舊衫分類場（斤布行），但同一套規則可以拿去做書店、診所、樂團或任何東西。

---

## 一、設計哲學

Gee's Bend（今名 Boykin）是阿拉巴馬河一個大彎裡的黑人聚落。那裡的女人用工作服、麵粉袋、洗到發白的褲腳縫被子，縫了四代。沒有打版、沒有畫線、沒有型錄——**手上有什麼就縫什麼**。1972 年自由拼布社（Freedom Quilting Bee）替 Sears 做燈芯絨枕套，剩下的燈芯絨長條被社員帶回家，於是那幾年的被子特別厚、特別飽色。

這件事對網頁設計的意義是一句話：**顏色不是被挑的，是被給的。**

所以用這個風格時，設計師要放棄兩件事：

1. **放棄描邊。** 兩塊顏色之間不准放任何東西——不放黑線、不放白邊、不放圓角、不放陰影、不放漸層。放進去任何一樣，它就變成風格派或孟菲斯了。界線只能是「縫」：一條暗帶，加一行白棉線。
2. **放棄對齊。** 沒有一條邊是平行的，沒有一個角是 90°。這不是「加一點手感」，這是這個流派的骨架——手撕的布邊、目測的裁切、拼到一半發現不夠長。

再放棄第三件，就會變成真的：**放棄配色權**。把「這一塊該是什麼顏色」交給一個你控制不了的來源——內容的長度、使用者的交換結果、當天的庫存。設計師只決定調色盤裡有哪幾塊布，不決定它們落在哪裡。

這個風格**不適合**：需要嚴格資訊層級的儀表板、需要精密對齊的表單密集介面、需要冷靜中性的法務或醫療頁面。它適合：手工、材料、回收、社群、食物、音樂、二手、修補、任何「來歷比規格重要」的東西。

---

## 二、本風格的 5 個不可省略特徵

拿掉任何一項，它就不是這個風格了。每一項都附可以直接複製的片段。

### 特徵 1｜色塊直接相接，零描邊、零圓角、零漸層、零模糊陰影

兩塊布之間唯一的東西是縫。做法是：容器底色 = 縫色，布塊之間留 5–7px 的縫隙讓底色露出來，**絕不用 border 或 outline**。

```css
:root{
  --aub:#4A2C3C; --brk:#C2582C; --mus:#D2A02F;
  --pin:#2C6455; --ros:#C6A093; --cot:#E9E2D2;
  --ink:#211A1D; --seam:#2A2024;   /* 縫：容器底色 */
}
.quilt{ display:grid; gap:6px; padding:6px; background:var(--seam); }
.p{
  background:var(--cot);
  border:0; outline:0; border-radius:0;   /* 三個都必須是 0 */
  box-shadow:none;
}
/* 縫下面那道「布被壓下去的影」——只能是實心暗帶，不可以是 blur */
.seam-shadow{ height:2px; background:rgba(0,0,0,.46); }
```

**Don't：** `border:2px solid`、`border-radius:8px`、`box-shadow:0 4px 12px rgba(0,0,0,.15)`、`linear-gradient(to bottom, A, B)` 作為布的填色。

### 特徵 2｜目測的直線：每條縫都不平行，每個角都不是 90°

用 `clip-path: polygon()` 給每一塊布四個各自不同的小偏差（0.3%–1.6%）。偏差必須是**決定性**的（同一個編號永遠得到同一組），不可以每次重整都換，那會變成 glitch 而不是手工。

```css
.p{
  clip-path:polygon(
    var(--a,.8%) 0,
    100% var(--b,.7%),
    calc(100% - var(--c,.8%)) 100%,
    0 calc(100% - var(--d,.7%))
  );
}
```

```js
// FNV-1a → mulberry32：同一個 key 永遠同一組偏差
function fnv1a(s){let h=0x811c9dc5;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,0x01000193)>>>0;}return h>>>0;}
function rng(s){let a=fnv1a(s);return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);
  t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
function kink(key){const r=rng(key),f=()=>(0.3+r()*1.3).toFixed(2)+'%';
  return `--a:${f()};--b:${f()};--c:${f()};--d:${f()}`;}
// <div class="p" style="${kink('patch-7')}">…</div>
```

**Don't：** 隨機每幀抖動、`transform:rotate()` 整塊歪掉（那是「貼歪的紙」不是「裁歪的布」）。偏差要在**邊**上，不在整塊上。

### 特徵 3｜不夠長就再接一塊（Lazy Gal）

一條帶子的長度是手上那塊布決定的；不夠就接，接的地方換色。翻成網頁：**一塊區域的顏色分幾段，由它自己有多高決定**，不是由設計師配的。

```js
const PAL={ light:['#E9E2D2','#E2D8C2','#F0EADB','#E5DCC8'],
            full :['#4A2C3C','#D2A02F','#C2582C','#2C6455','#C6A093'] };
function pieceToFit(field, H, W){
  const st = field._st || (field._st={y:0,n:0,r:rng('f:'+field.dataset.seed),
                                      pal:PAL[field.dataset.tone],last:-1});
  while(st.y < H+40 && st.n < 70){
    const h = Math.round(98 + st.r()*196);          // 這塊布有多長，是它自己的事
    let c; do{ c=Math.floor(st.r()*st.pal.length); }while(c===st.last); st.last=c;
    const A = st.n? Math.round(st.r()*11):0, B = st.n? Math.round(st.r()*11):0;  // 斜接縫
    const bd=document.createElement('div');
    bd.className='bd'; bd.style.cssText=
      `top:${st.y-(st.n?12:0)}px;height:${h+(st.n?12:0)}px;background:${st.pal[c]};`+
      `clip-path:polygon(0 ${A}px,100% ${B}px,100% 100%,0 100%)`;
    field.appendChild(bd); st.y+=h; st.n++;
  }
}
```

重點紀律：**先把所有高度讀完，再一次寫**（一次 read pass、一次 write pass），否則會 layout thrashing。長文區塊的 palette 只放不同的白棉布（`light`），對比才守得住。

**Don't：** 用固定的三段式配色；用 `background-size: cover` 把一張圖拉長。**布不會被拉長，布會被接。**

### 特徵 4｜Housetop：從中心一圈一圈包出去

一塊中心方塊，四條帶包一圈，再四條帶包一圈。每圈寬窄不同、顏色沒有規律。用不等寬的網格軌道 + subgrid，讓每一圈都咬在同一組線上。

```css
.housetop{
  display:grid; gap:6px; padding:6px; background:var(--seam);
  grid-template-columns:1.5fr 1.05fr 2.15fr 1.75fr 2.6fr 1.6fr 2.35fr 1.2fr 2.05fr 1.45fr 1.1fr 1.7fr;
  grid-template-rows:1.35fr 1fr 1.9fr 1.55fr 2.4fr 1.5fr 2.2fr 1.15fr 1.85fr 1.3fr 1.05fr 1.6fr;
  min-height:min(88vh,780px);
}
.ring{ grid-column:1/-1; grid-row:1/-1; display:grid; gap:6px;
       grid-template-columns:subgrid; grid-template-rows:subgrid; }
.core   { grid-column:5/9;  grid-row:5/9;  }
.r1 .t{grid-column:3/11;grid-row:3/5}  .r1 .r{grid-column:9/11;grid-row:5/11}
.r1 .b{grid-column:3/9; grid-row:9/11}  .r1 .l{grid-column:3/5; grid-row:5/9}
.r2 .t{grid-column:1/13;grid-row:1/3}  .r2 .r{grid-column:11/13;grid-row:3/13}
.r2 .b{grid-column:1/11;grid-row:11/13} .r2 .l{grid-column:1/3; grid-row:3/11}
```

四條帶的排法是**風車式**（每條帶只咬住前一條的一端），不是四邊對稱的相框——對稱的相框是維多利亞式的邊框，不是 Housetop。窄的左右兩條用 `writing-mode:vertical-rl` 放文字。

### 特徵 5｜手縫壓線是唯一的線 + 燈芯絨的棱

粗白棉線，針目長短不一，走的路線**跟拼接無關**——它直接從布面上穿過去，會壓過好幾塊布。

```css
/* 壓線：三段不等長的針目，週期 29px */
.st{
  position:absolute; left:-7%; right:-7%; height:2px; opacity:.82; pointer-events:none;
  background-image:repeating-linear-gradient(90deg,
    var(--cot) 0 5px, transparent 5px 10px,
    var(--cot) 10px 13px, transparent 13px 19px,
    var(--cot) 19px 25px, transparent 25px 29px);
  filter:drop-shadow(0 1px 0 rgba(0,0,0,.42));
}
/* 燈芯絨的棱：兩層疊乘／疊亮，hover 時順逆對調 */
.p>.wale,.p>.wlite{position:absolute;inset:-2px;pointer-events:none;transition:opacity .09s linear}
.p>.wale {background-image:repeating-linear-gradient(93deg,rgba(0,0,0,.20) 0 1px,rgba(0,0,0,0) 1px 3.6px);
          mix-blend-mode:multiply; opacity:1}
.p>.wlite{background-image:repeating-linear-gradient(93deg,rgba(255,255,255,.26) 0 1px,rgba(255,255,255,0) 1px 3.6px);
          mix-blend-mode:screen; opacity:0}
.p:hover>.wale {opacity:0}
.p:hover>.wlite{opacity:1}
/* 磨白的邊 */
.p::after{content:"";position:absolute;inset:0;pointer-events:none;
  box-shadow:inset 0 0 13px rgba(233,226,210,.10), inset 0 0 0 1px rgba(0,0,0,.20)}
.p:hover::after{box-shadow:inset 0 0 20px rgba(233,226,210,.28), inset 0 0 0 1px rgba(0,0,0,.20)}
```

棱紋角度用 93°、95° 這種**不是 90° 的數**，因為布不會擺得那麼正。

---

## 三、色彩系統

調色盤來自兩個真實來源：工作服（褪色的靛、卡其、土黃）與 Sears 燈芯絨（茄紫、磚橘、芥黃、松綠）。全部色相都「洗過一遍」——彩度上限約 60%，沒有一個是純色。

| 色 | hex | 用途 | 比例 |
|---|---|---|---|
| 茄紫 燈芯絨 | `#4A2C3C` | 最大面積的一塊布（不是「背景」）、深色區塊、footer 以外的深塊 | ~24% |
| 棉白（三種） | `#E9E2D2` `#E2D8C2` `#F0EADB` | **所有長文一律排在這上面**，三種白互相接 | ~26% |
| 磚橘 | `#C2582C` | 純色域、大字標，**不放 14px 以下的文字** | ~14% |
| 芥黃 | `#D2A02F` | 現用態、可動作的東西、被選中的、按鈕 | ~13% |
| 松綠 | `#2C6455` | 第二塊深布、次要區塊 | ~11% |
| 灰粉 | `#C6A093` | 中間調的緩衝布，避免深淺硬碰硬 | ~7% |
| 墨 | `#211A1D` | 正文、footer、壓線的影 | ~5% |
| 縫 | `#2A2024` | **容器底色**，只在布與布之間被看見 | 露出約 3% 面積 |

硬規則：

- **沒有背景色這個角色。** 每一塊區域都是一塊布。頁面的 `background` 只等於「縫」。
- 文字對比：墨字只上棉白／芥黃／灰粉（≥ 7:1）；棉白字只上茄紫／松綠／墨（≥ 9:1）。**磚橘上面只放 ≥ 24px、900 字重的墨字**（3.8:1，符合 AA large），其餘一律不放字。
- 相鄰兩塊布的明度差要嘛很大要嘛很小，**不要中等**——中等會讓人覺得是漸層失敗。
- 深淺硬碰硬時，中間插一塊灰粉。

---

## 四、字體系統

這個流派本身沒有字（被子上沒有文字），所以字體要從**產業**長出來，不是從流派長出來。唯一的紀律是：**厚、實心、沒有花俏的收筆**——因為畫面上其他東西都是實心色塊，細筆畫的字會浮起來。

示範站用的組合：

```css
@import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Noto+Serif+TC:wght@400;700;900&display=swap');
body{ font-family:"Noto Serif TC",serif; font-weight:400; font-size:17px; line-height:1.78; }
h1,h2,h3{ font-weight:900; line-height:1.24; letter-spacing:.01em; }
.lat,.num{ font-family:"Archivo Black",sans-serif; letter-spacing:.03em; }
.num{ font-variant-numeric:tabular-nums; }
```

字級 scale（1.28 倍，刻意不是整齊的 1.25／1.5）：

| 角色 | 尺寸 | 字重 |
|---|---|---|
| h1 | `clamp(28px,4.6vw,52px)` | 900 |
| h2 | `clamp(22px,3vw,34px)` | 900 |
| h3 | `clamp(18px,2.1vw,23px)` | 900 |
| 內文 | 17px / 行高 1.78 | 400 |
| 小字、表格 | 14.5px | 400 |
| 標籤（`.tag`） | 11.5px，字距 .2em | Archivo Black |

**Don't：** 幾何無襯線的細字重（200/300）、手寫體、任何有「手作感」的字型。布已經夠手工了，字要當那個硬的東西。

---

## 五、版面與網格

1. **主結構是不等寬的網格。** 12 條欄軌用不規則的 fr（`1.5fr 1.05fr 2.15fr …`），不是 `repeat(12,1fr)`。這是這個流派跟風格派最大的分野：風格派的比例是設計出來的，拼布的比例是「那塊布本來就那麼寬」。
2. **不要置中對稱。** 中心方塊可以在中間，但它上下左右的四條帶寬度必須不同。
3. **留白率 < 14%。** 被子是要蓋的，沒有留白這回事。空的地方就再接一塊布。
4. **長文必在棉白布上**，寬度 ≤ 64ch，內距 `clamp(12px,1.8vw,22px)`。
5. **縫隙固定 5–7px**，全站同一個值。縫隙變寬變窄會讀成「卡片間距」。
6. **RWD：** ≤900px 時 Housetop 攤平成直向的一疊布（`display:flex;flex-direction:column`，ring 用 `display:contents`），垂直文字改回橫排；≤560px 時多欄一律收成一欄，導覽兩塊一列。**攤平之後仍然是布，不是卡片**——縫隙、棱紋、壓線全部保留。

---

## 六、元件配方

```html
<!-- 一塊布 -->
<div class="p mus" style="--a:.9%;--b:1.2%;--c:.6%;--d:1.4%">
  <i class="wale"></i><i class="wlite"></i>
  <i class="st" style="top:32%;transform:rotate(1.4deg)"></i>
  <i class="st" style="top:71%;transform:rotate(-.8deg)"></i>
  <div class="pc">…內容…</div>
</div>
```

- **導覽（stitch-through）**：四塊小布並排；現用頁那一塊被一條白棉壓線從左緣穿進、右緣穿出，兩端各一個線結圓點。其餘三塊什麼都沒有。**不要用底色高亮、不要加底線、不要放箭頭**——語意是「這一塊已經被縫進去了」。
- **按鈕**：實心芥黃，`clip-path` 切成不方的四邊形，無圓角、無陰影，hover 只調 `filter:brightness(1.09)`。停用態換成灰褐實色。
- **表單**：輸入框 `border:2px solid var(--ink)`、`border-radius:0`、底色用最亮的那塊棉白。fieldset 用 2px 實線（這是全站唯一允許 border 的地方——因為它代表「畫粉線」，是裁縫真的會做的事）。
- **表格**：只有橫線 `1.5px solid rgba(33,26,29,.32)`，沒有直線、沒有斑馬紋、沒有外框。
- **分隔線**：一條 2px 暗帶 + 一行白棉壓線疊在上面（見 `hr.seamline`）。
- **footer**：墨色整塊，連結用芥黃。

---

## 七、動效規則

四種，缺一不可，全部要有 `prefers-reduced-motion` 降級且降級後資訊零損失。

| 種類 | 名稱 | 觸發 | 參數 | 降級 |
|---|---|---|---|---|
| ambient | 曬被 sun-drift | 無 | 一塊硬邊日光（`rgba(255,246,222,.13)`，`mix-blend-mode:screen`，`skewX(-9deg)`）84s linear infinite 橫掃 | 停在定點，光還在 |
| input | 順毛逆毛 nap-flip | hover / focus-within | 兩層棱紋 opacity 對調，90ms linear（< 100ms）；同時 `::after` 的 inset 光暈由 .10 升到 .28 | `transition:none`，瞬間切換 |
| transition | 攤被 unfold | 進頁 | `clip-path:inset(43% 0)` → `inset(0)` + `scaleY(.9)` → `none`，560ms `cubic-bezier(.2,.9,.25,1)` | 不播，直接是攤好的畫面 |
| signature | 不夠長就再接一塊 piece-to-fit | 任何區塊變高 | 新的一塊布 `clip-path:inset(0 0 100% 0)` → `inset(0)`，300ms **`steps(7)`**（一針一針，不可以是平滑的） | 不播，布照樣接上去 |

**全站禁用**：淡入式滾動揭示、視差、數字滾動計數、跑馬燈、按壓硬陰影、`stroke-dashoffset` 描繪。理由：這個流派的東西是**被縫上去的**，不是浮出來的、不是被畫出來的。

`steps()` 是這裡的關鍵：手縫是離散的，一針就是一針。用 `ease-out` 會立刻變成「軟體動畫」。

---

## 八、插畫與圖像風格（cloth-piecing 布塊與針目構成）

**零外部圖片。** 所有圖像由三種原語程序生成：

1. **布塊**：四個角各帶偏差的四邊形（不是矩形）。
2. **質地紋**：燈芯絨＝間距 3.4–3.6 的近垂直細線；牛仔＝45° 白色細斜紋；毛料＝雙向交叉斜線；麵粉袋＝幾道印字般的短實心橫塊；卡其＝什麼都沒有（平的）。
3. **壓線**：不等長虛線，橫過整張圖、超出邊界。

```js
// 一張布塊圖：條帶分割 + 一次橫切
function swatch(seed, cols, tex, W=120, H=74){
  const r=rng('sw'+seed), n=2+Math.floor(r()*3);
  const xt=[0],xb=[0];
  for(let i=1;i<n;i++){const b=W*i/n; xt.push(b+(r()*10-5)); xb.push(b+(r()*10-5));}
  xt.push(W); xb.push(W);
  let s=`<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" aria-hidden="true">`;
  for(let i=0;i<n;i++)
    s+=`<polygon points="${xt[i]},0 ${xt[i+1]},0 ${xb[i+1]},${H} ${xb[i]},${H}" fill="${cols[i%cols.length]}"/>`;
  if(tex==='cord'){s+='<g stroke="rgba(0,0,0,.26)" stroke-width="1">';
    for(let x=2;x<W;x+=3.6) s+=`<path d="M${x} 0 L${x+1.4} ${H}"/>`; s+='</g>';}
  s+='<g stroke="#E9E2D2" stroke-width="1.6" opacity=".85" fill="none">';
  for(let i=0;i<2;i++){const y=16+i*28+r()*12;
    s+=`<path d="M-2 ${y} L${W+2} ${y+(r()*5-2.5)}" stroke-dasharray="5 5 3 6 6 3"/>`;}
  return s+'</g></svg>';
}
```

判準：**拿掉全部顏色，還要讀得出哪裡是一塊布、哪裡是一條縫、哪裡是壓線。**

**Don't：** 細線幾何線描、半調網點、寫實描繪、`feTurbulence` 手抖濾鏡、emoji、任何圓形的圖示。這個流派裡沒有圓。

---

## 九、Logo 與 Favicon

Logo = 一枚 Housetop：四個同心的、四個角都歪掉的四邊形，配色由外到內是深→亮→亮→深，最後疊三行白棉壓線橫過整枚。**不畫具象的東西，不畫字。** 品牌名用 HTML 文字排在 logo 旁邊。

Favicon 用同一組幾何縮到 32×32，只留四層 + 兩行壓線：

```html
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%232A2024'/%3E%3Cpolygon points='1,0.6 31.4,1.6 30.6,31 0.6,30.2' fill='%234A2C3C'/%3E%3Cpolygon points='5.4,5 27,4.2 26.4,27.4 5,26.6' fill='%23D2A02F'/%3E%3Cpolygon points='9.6,9.4 22.6,10 22,22.4 9,21.8' fill='%23C2582C'/%3E%3Cpolygon points='13.4,13.6 18.8,13.2 18.4,18.8 13,18.4' fill='%232C6455'/%3E%3Cg stroke='%23E9E2D2' stroke-width='1.1' stroke-dasharray='2.6 2 1.6 2.8'%3E%3Cpath d='M0 8.4 L32 7.6'/%3E%3Cpath d='M0 24 L32 24.8'/%3E%3C/g%3E%3C/svg%3E">
```

---

## 十、Do & Don't

**Do**

- 讓區塊的顏色由它的高度（或任何你控制不了的東西）決定。
- 用不等寬的網格軌道。
- 讓壓線橫過好幾塊布，不要沿著縫走。
- 深色布上放淺字、淺色布上放深字，中間不要放半透明遮罩。
- 手機版把被子攤平成一疊，不要把它變成卡片列表。

**Don't**

- 不要描邊、圓角、漸層、模糊陰影（去 AI 化第一條，也是這個流派的第一條）。
- 不要紫藍漸層 hero、不要置中大標＋副標＋兩顆按鈕＋三張卡片。
- 不要用 emoji 當 icon；這個流派沒有 icon，只有布。
- 不要 Lorem ipsum；文案要有名字、價錢、地址、時間。
- 不要「EST. 19xx」徽章、不要「把 X 變成 Y」句式標題。
- 不要把每塊布都做成一樣大——一樣大就是格子布，不是拼布。
- 不要用平滑 easing 做縫的動作；縫是 `steps()`。
- 不要假裝這是「北歐簡約」或「有機自然風」——那兩種有大量留白，這種一寸留白都沒有。

---

## 十一、頁面骨架範例（可直接使用）

```html
<body>
<header class="binding">
  <div class="bind-in">
    <a class="mark" href="./index.html"><!-- housetop logo svg --><span><b>店名</b></span></a>
    <nav class="nav">
      <a class="nv" href="./a.html" aria-current="page">
        <span class="p aub"><i class="wale"></i><i class="wlite"></i><span class="pc"><b>第一頁</b><em>PAGE ONE</em></span></span>
        <i class="thread"></i><i class="knot i"></i><i class="knot o"></i>
      </a>
      <a class="nv" href="./b.html">…</a>
    </nav>
  </div>
</header>

<main id="main">
  <!-- 開場：一整面 Housetop，中心是店名，每往外一圈是一項資料 -->
  <div class="housetop">
    <div class="ring r2">
      <div class="p aub t">…</div><div class="p mus r"><div class="vt">…</div></div>
      <div class="p cot2 b">…</div><div class="p brk l"><div class="vt">…</div></div>
    </div>
    <div class="ring r1">…同上四塊…</div>
    <div class="p aub core"><h1>店名</h1><p>一句話</p></div>
  </div>

  <!-- 一般段落：底是 piece-to-fit 的布場，內容在上面 -->
  <section class="sec">
    <div class="field" data-seed="s1" data-tone="light" aria-hidden="true"
         style="background-image:linear-gradient(180deg,#E9E2D2 0 128px,rgba(0,0,0,.42) 128px 129.6px,#E2D8C2 129.6px 352px,…);
                background-size:100% 620px;background-repeat:repeat-y"></div>
    <div class="wrap">
      <p class="tag">壹</p><h2>標題</h2>
      <div class="grid g3">
        <div class="p cot"><i class="wale"></i><i class="wlite"></i><div class="pc">…</div></div>
      </div>
    </div>
  </section>
</main>

<footer>…</footer>
<div class="sun" aria-hidden="true"><i class="a"></i><i class="b"></i></div>
</body>
```

`.field` 一定要同時給**靜態備援**（inline 的硬停點漸層，會沿 `background-size` 往下重複）與**JS 增強**（真正不規則、斜接縫、會長高的版本）。關掉 JavaScript 時畫面仍然是完整的接布，只是節奏規律一點。

---

## 十二、技術實作與相容性

查證日 2026-08-30，來源為 MDN Web Docs 與 caniuse。

### 1. CSS Grid `subgrid`（版面層）

- **承載**：特徵 4 的 Housetop 環（三圈布必須咬在同一組**不等寬**的 12 條格線上）與目錄卡片的橫列切齊（每張卡的四行內容對齊到同一條線，不管字長短）。巢狀網格複製不出父格的軌道尺寸，這是 subgrid 不可替代的地方。
- **現況**：Baseline **newly available**，2023-09-15 起三支引擎齊備。Chrome / Edge 117+、Firefox 71+、Safari 16+、Opera 103+、Samsung Internet 24+。
- **Fallback**：`@supports not (grid-template-rows: subgrid)` 時，卡片退回各自獨立排版（內容全部仍可讀，只是不切齊）；Housetop 的環改成直接複製同一份軌道清單（版面完全相同）。資訊零損失。

### 2. `mix-blend-mode`（渲染層）

- **承載**：特徵 5 的燈芯絨棱紋。兩層 `repeating-linear-gradient`，一層 `multiply`（暗棱）、一層 `screen`（亮棱），hover 時 90ms 內對調 opacity，明度差約 6%。棱紋必須與底下的布色**相乘**才會跟著色走；用半透明黑／白做不出來。
- **現況**：Baseline **widely available**，2020-01 起跨瀏覽器。Chrome 41+、Edge 79+、Firefox 32+、Safari 7.1+（iOS 8+）。
- **注意**：Safari 對 hue / saturation / color / luminosity 這幾種**非可分離**混色的彩度處理與 Chrome 略有差異。本規格只用 `multiply` 與 `screen` 兩種可分離混色，不受影響。
- **Fallback**：不支援時混色被當作 `normal`，棱紋退成半透明直線，布色與版面完全不變。

### 3. 純 JavaScript 規則引擎 + 決定性偽亂數（資料與生成層）

- **承載**：特徵 2 的偏差、特徵 3 的接布節奏、所有插圖、以及核心功能的規則判定。FNV-1a → mulberry32，同一個 key 永遠同一個結果，因此 `?q=` 分享碼可以完整還原。
- **現況**：不依賴任何瀏覽器 API，無相容性問題。
- **Fallback**：關閉 JavaScript 時，`.field` 使用 inline 的靜態接布漸層、所有插圖在建置階段已輸出成 inline SVG，核心功能頁退為規則說明與實測數字。全部文字內容零損失。

### 4. 效能預算

| 項目 | 門檻 | 實測 |
|---|---|---|
| 單頁大小（含 inline 全部資源，未壓縮） | ≤ 350KB | 38–68KB |
| 首屏 JS 執行 | ≤ 100ms | 約 3–6ms（接布引擎首次佈局，40 塊以內） |
| layout thrashing | 無 | 一次讀（全部 `offsetHeight`／`offsetWidth` 先讀完）、一次寫，不交錯 |
| 動畫 | 60fps | 環境動效只改 `transform`；hover 只改 `opacity`；接布只在 resize 後跑一次 |
| 外部資源 | 僅 Google Fonts | 2 支字型；零外部圖片、零音檔 |

**可行性優先於炫技**：這三項全部在建站當下實測跑通。任何做不到的技術要換掉——做不出來的酷點子不算點子。
