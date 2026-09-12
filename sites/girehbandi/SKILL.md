---
name: islamic-geometric-girih
description: Islamic geometric strapwork built the way it is actually built — every angle a multiple of 360/n, every line leaving an edge midpoint at one shared contact angle, and every crossing strictly alternating over-under.
---

# 伊斯蘭幾何 Girih／Islamic Geometric

## 一、設計哲學

這個流派最常被做壞的地方，是把它當成一種「花紋貼圖」。它不是。它是一套**作圖程序**，
而且程序短到可以寫在一張紙上：

1. 挑一組能互相咬合的正多邊形（底鋪）。
2. 在每一條邊的中點，往兩側各射出一條線，與那條邊夾同一個角（接觸角 θ）。
3. 線走到碰上另一條線就停，兩條線在那裡轉彎。
4. 線圍出來的每一塊空地，就是一塊要切的磚。

第 2 步是唯一的設計決定；其餘全部是後果。**設計師的工作在選底鋪與定 θ，不在畫圖案。**
這是為什麼同一套規則能長出從摩洛哥到撒馬爾罕上千種不同的牆，而它們一眼就認得出是同一家。

三條態度：

- **地與圖同權**。沒有「主體浮在背景上」。每一塊磚都是磚，沒有一塊是留白。
- **邊界是切斷，不是收邊**。圖案必須看起來還會繼續下去，是框把它切斷的。
- **交錯是規矩不是裝飾**。帶（strap）在每個交點必須跟上一次相反。這件事由算的人負責，不能靠眼睛。

用這個風格做網站時，最容易犯的錯是「拿一張伊斯蘭花紋當背景、其他照舊」。那不是這個風格，
那是貼了壁紙的一般網站。要讓它成立，**版面本身必須遵守同一套角度與層級規矩**。

## 二、色彩系統

傳統釉色來自可燒的礦物，所以色域窄、彩度高、明度分得很開。用這五色即可，比例如下：

| 色 | hex | 用途 | 比例 |
|---|---|---|---|
| 磚土赭 | `#C0894E` | 全站地色，同時是**面積最大的那種磚形**的釉色。它是未上釉的磚，不是「背景」——上面永遠有東西 | 40% |
| 鈷藍 | `#12439A` | 第一釉色：星芒（最搶眼的那種磚形）、主要動作、資訊塊 | 22% |
| 灰泥白 | `#F0E9DA` | 灰泥：所有長文一律在灰泥上，不在磚土上；也是帶的雙側描邊 | 18% |
| 深磚 | `#8E5D2E` | 牆體底、實心位移投影 | 8% |
| 綠松石 | `#1FA6A0` | 第二釉色：面積最小的那種磚形、現用態、連結 hover、焦點環 | 8% |
| 錳黑 | `#1E1A22` | 所有 2.5px 邊框、帶身、正文 | 4% |

把「地色」也當成一種釉色配給某一種磚形，是這個流派最省事也最有效的一手：
牆上最多的那種磚跟沒上釉的磚同色，眼睛就會先看見鈷藍的星芒，再看見它們之間那一層底。

規則（違反就不是這個流派了）：

- **一種磚形一種釉。**同一種形狀在整面牆上永遠同一色，不隨機、不漸變。這是眼睛能先看見「一圈梭」再看見「星芒」的原因。
- **零漸層。**除了金屬件（本流派幾乎沒有），任何 `linear-gradient` 都會把平塗的力量洩掉。
- **投影一律是實心位移色塊**：`box-shadow:6px 6px 0 var(--brickD)`，永遠不模糊。
- **零圓角。**`border-radius` 一律 0。

```css
:root{
  --brick:#C0894E; --brickD:#8E5D2E; --cob:#12439A; --deep:#0C2E6B;
  --turq:#1FA6A0; --plas:#F0E9DA; --ink:#1E1A22; --line:#D9C9A8;
}
body{background:var(--brick);color:var(--ink)}
.card{background:var(--plas);border:2.5px solid var(--ink);box-shadow:6px 6px 0 var(--brickD);border-radius:0}
```

## 三、字體系統

- 拉丁與數字：**Amiri**（Khaled Hosny，Google Fonts）。它是為阿拉伯文 Naskh 設計的字族，
  拉丁部分是同一位設計師配的舊式襯線，用它是為了讓拉丁字不去搶阿拉伯氣質的位置。標題 700、標籤 400。
- 漢字：**Noto Serif TC** 400／600／900。標題一律 900，正文 400。
- 度量與編號：系統等寬堆疊 `ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`，
  並開 `font-variant-numeric: tabular-nums`——這個流派的數字全部是要對齊的（角度、邊數、方向格數）。

字級 scale（1.25 倍階，刻意不用連續 clamp，除了 hero）：

| 角色 | 字級 | 字重 | 行高 | 字距 |
|---|---|---|---|---|
| hero 標題 | `clamp(32px,6.4vw,64px)` | 900 | 1.02 | .01em |
| 章標 h2 | 26px | 900 | 1.25 | .01em |
| 小標 h3 | 19px | 900 | 1.3 | 0 |
| 正文 | 16.5px | 400 | 1.85 | 0 |
| 標籤 `.k` | 12.5px | 400 | 1.4 | **.24em** | 
| 表格 | 14.5px | 400 | 1.6 | .04em |

`.k` 標籤是這個風格的骨架件之一：全大寫拉丁 + 極寬字距，永遠出現在每一塊內容的正上方，
像磚牆上那條窄的飾帶。

```css
.k{font-family:Amiri,Georgia,serif;font-size:12.5px;letter-spacing:.24em;
   text-transform:uppercase;color:var(--brickD)}
```

## 四、版面與網格

**角度紀律**：全站只准出現 30° 的倍數（12 摺）或 45° 的倍數（8 摺），二選一，不混用。
斜線、hatch、旋轉、切角一律照這個表。這一條比任何配色都更決定「像不像」。

```css
:root{--a1:30deg;--a2:60deg;--a3:90deg} /* 12 摺；8 摺時改 45/90/135 */
.hatch{background:repeating-linear-gradient(var(--a1),var(--line) 0 3px,#C6B594 3px 9px)}
```

- **三層層級（面—帶—框）**：頁面永遠是「大色面」→「窄飾帶」→「粗外框」。
  窄飾帶 `.band` 是滿版錳黑條，高度約 40px，裡面只放小字標籤，用來把兩個色面切開。
- **不對稱雙欄**：主欄 : 側欄 ≈ 1 : 0.28（例 `minmax(0,1fr) 330px`）。側欄 sticky。
- **留白規則**：留白率 8–14%。這個流派沒有大留白，但也不是塞滿——空的地方是**磚土本身**，
  它不是白色的空，是一種材質。
- **框永遠切斷圖案**：任何滿版圖案容器一律 `overflow:hidden` + SVG `preserveAspectRatio="xMidYMid slice"`。
  圖案的邊緣不准剛好收在容器邊界上。

## 五、本風格的 5 個不可省略特徵

### 特徵 1：一切從圓的等分長出來——沒有任意角度

拿掉它，圖案立刻變成「裝飾風」。所有旋轉、斜線、星芒、切角都必須是 `360/n` 的整數倍。
連互動也一樣：使用者能轉的角度只有一格一格，沒有連續旋轉。

```css
/* 12 摺（n=12）：唯一合法的旋轉集合 */
.rot-1{transform:rotate(30deg)} .rot-2{transform:rotate(60deg)}
.rot-3{transform:rotate(90deg)} .rot-4{transform:rotate(120deg)}
/* 8 摺時改成 45 的倍數。永遠不要出現 rotate(7deg) 這種數字 */
```

```js
// 星形：2n 個頂點，內外半徑交替。ratio 越小芒越尖（實用範圍 0.29–0.58）
function starD(pts, R, ratio, rot=0){
  let d='';
  for(let i=0;i<pts*2;i++){
    const a=rot+i*Math.PI/pts, r=(i%2)?R*ratio:R;
    d+=(i?'L':'M')+(r*Math.cos(a)).toFixed(2)+' '+(r*Math.sin(a)).toFixed(2);
  }
  return d+'Z';
}
// 十二芒星，芒深比 0.411（= 4.6.12 底鋪、接觸角 80° 的實際輸出值）
```

### 特徵 2：邊心接觸角——線從邊的中點出發，且全圖共用同一個角

這是整個流派唯一的設計參數（Hankin 的 polygons-in-contact 法）。
不要用「畫」的方式擺星星：擺底鋪，然後讓線自己長出來。

```js
// 對底鋪的每一塊多邊形、每一條邊：從中點往內射兩條線，與邊夾 theta
for(let i=0;i<p.length;i++){
  const A=p[i], B=p[(i+1)%p.length];
  const m=[(A[0]+B[0])/2,(A[1]+B[1])/2];          // 邊心
  const e=[B[0]-A[0],B[1]-A[1]], L=Math.hypot(e[0],e[1]);
  const u=[e[0]/L,e[1]/L];
  let nv=[-u[1],u[0]];                             // 指向多邊形內部的法向
  if((cx-m[0])*nv[0]+(cy-m[1])*nv[1]<0) nv=[-nv[0],-nv[1]];
  const c=Math.cos(theta), s=Math.sin(theta);
  const d1=[ u[0]*c+nv[0]*s,  u[1]*c+nv[1]*s];     // 兩條射線
  const d2=[-u[0]*c+nv[0]*s, -u[1]*c+nv[1]*s];
}
// 每條射線走到「與另一條射線同時抵達」的那一點就停（取 max(t,u) 最小的那一對），
// 停下的地方就是星芒的尖。相鄰兩塊多邊形的射線在共用邊心上共線 —— 帶因此穿過去，
// 而且兩條帶在那個邊心互相交叉。**交點永遠落在底鋪的邊心上。**
```

### 特徵 3：交錯帶嚴格上下交替（over–under alternation）

最常被漏掉、也最致命的一項。帶不是輪廓線，是**有寬度、有雙側描邊的帶子**；
在每個交點，一條在上、一條在下；而且**同一條帶不准連續兩次都在上**。

作法不是逐點手畫，而是解出來的：把成圖看成 4-正則平面圖，先對「面」做二著色
（所有頂點的度數都是偶數 ⇒ 面必可二著色），再由面的顏色決定每個交點誰在上。
這樣得到的必定是交替圖，不需要試誤。

```js
// 1) 面二著色（BFS）：相鄰面（共用一條邊）不同色
for(let f=0;f<faces.length;f++){
  if(col[f]>=0) continue; col[f]=0; const st=[f];
  while(st.length){ const x=st.pop();
    faces[x].loop.forEach(h=>{ const g=faceOf[HE[h].twin];
      if(col[g]<0){ col[g]=col[x]^1; st.push(g); } }); }
}
// 2) 交點（度數 4 的節點）：以 CCW 第一條半邊左邊那一面的顏色決定誰在上
cross.push({ node:i, over: col[faceOf[n.he[0]]]===0 ? 0 : 1 });
```

渲染時「下面那條」在交點附近縮短一段，兩趟畫完就有編織：

```html
<defs><path id="rb" d="M… L… M… L…"/></defs>
<use href="#rb" stroke="#F0E9DA" stroke-width="9.8" fill="none" stroke-linecap="butt"/>
<use href="#rb" stroke="#1E1A22" stroke-width="5.3" fill="none" stroke-linecap="butt"/>
```

縮短量要照交角算，否則銳角交點會露出破口：

```js
const cut = (W*0.62)/Math.max(0.34, Math.abs(Math.sin(angleBetweenStraps)));
```

### 特徵 4：圖案被邊框切斷，且地與圖同權

沒有主體、沒有背景、沒有留白。圖案一定要滿出容器再被切掉——這是「它還會繼續下去」的唯一證據。

```css
.wall{position:relative;overflow:hidden;min-height:560px;
      border-bottom:2.5px solid var(--ink);background:var(--brickD)}
.wall svg{position:absolute;inset:0;width:100%;height:100%}
```
```html
<svg viewBox="-385 -190 770 383" preserveAspectRatio="xMidYMid slice">…</svg>
<!-- slice（不是 meet）：寧可切掉，不要留邊 -->
```

### 特徵 5：面—帶—框的三層層級，且無具象、無透視、無漸層

每一塊內容都是「色面 → 窄飾帶 → 粗框」。飾帶是這個流派的簽名結構件：
它很窄、滿版、深色、只放小字，作用是把兩塊色面隔開，等同於磚牆上那條 banna'i 磚砌帶。

```css
.band{background:var(--ink);color:var(--plas);
      border-top:2.5px solid var(--ink);border-bottom:2.5px solid var(--ink);padding:7px 0}
.band .wrap{display:flex;gap:18px;flex-wrap:wrap;font-size:13px;letter-spacing:.1em}
.frame{border:2.5px solid var(--ink);box-shadow:5px 5px 0 var(--brickD);background:var(--plas)}
```

同時明文禁止：具象描繪（人、動物）、透視、任何 `filter:blur`、任何漸層、任何圓角。

> **關於書法帶的誠實說明**：真正的 banna'i 磚砌帶會拼出文字。本 SKILL 提供的是純幾何的
> 磚砌帶樣式；若要在作品裡放阿拉伯文或波斯文，請找懂該文字的人排版，不要拿字形當圖案排，
> 也不要用「看起來像阿拉伯文」的假字。這是這個流派最不該便宜行事的一處。

## 六、元件配方

**導覽（glaze-state 上釉狀態）**——現用頁那一塊已上釉（實色＋帶），其餘是灰泥上的線稿：

```css
.nt{display:flex;align-items:center;gap:8px;border:2.5px solid var(--ink);
    background:transparent;padding:5px 12px 5px 7px;text-decoration:none;color:var(--ink)}
.nt.on{background:var(--plas);box-shadow:4px 4px 0 var(--ink)}
```
```html
<!-- 現用：實色星 + 帶 -->  <path d="…star…" fill="#12439A" stroke="#1E1A22" stroke-width="2.4"/>
<!-- 未用：只有線稿 -->     <path d="…star…" fill="none" stroke="#D9C9A8" stroke-width="1.1"/>
                            <circle r="17" fill="none" stroke="#D9C9A8" stroke-dasharray="2 3"/>
```

**按鈕**：實心位移陰影，按下時位移吃掉陰影，沒有任何過渡曲線的花招。

```css
.btn{background:var(--cob);color:var(--plas);border:2.5px solid var(--ink);
     padding:8px 16px;box-shadow:4px 4px 0 var(--ink);border-radius:0;cursor:pointer}
.btn:active{transform:translate(3px,3px);box-shadow:1px 1px 0 var(--ink)}
```

**表格**：表頭鈷藍反白，1.5px 錳黑格線，偶數列 `#E6DCC6`。這個流派的資訊呈現一律用表，不用卡片牆。

**表單**：輸入框 `border:2px solid var(--ink)`、白底、零圓角；錯誤訊息是左側 4px 深紅實線，不用圖示。

**footer**：滿版錳黑，三欄不等寬（1.3 : 1 : 1），標題用 `.k` 但改成磚土赭。

## 七、動效規則

四種，缺一不可，全部要有 `prefers-reduced-motion` 降級且降級後資訊零損失。

| 種類 | 本站作法 | 時間 | 曲線 |
|---|---|---|---|
| ambient 環境 | 工作前緣往右推進：已上釉的區域一格一格變寬 | 96s 無限 | `steps(24,end)` |
| input 輸入 | 指到一塊磚，同一種磚形留下、其餘退到 `opacity:.34` | 90ms | `linear` |
| transition 轉場 | 灰泥刀：狀態切換時 `clip-path` 由右往左抹過 | 380–550ms | `steps(6,end)` / `steps(7,end)` |
| signature 簽名 | 作圖回捲：成牆 → 帶 → 底鋪 → 圓與等分點，四層可倒捲 | 500ms/層 | `steps(6,end)` |

**為什麼全部用 `steps()`**：這個流派沒有連續的中間狀態。沒有 37% 的圓，沒有半條帶。
補間會讓它看起來像一般網頁動畫；分格會讓它看起來像在施工。

```css
@keyframes lay{0%{clip-path:inset(0 100% 0 0)}100%{clip-path:inset(0 0 0 0)}}
.glz{animation:lay 96s steps(24,end) infinite}

@keyframes knife{from{clip-path:inset(0 100% 0 0)}to{clip-path:inset(0 0 0 0)}}
.panel{animation:knife .55s steps(7,end)}

@media(prefers-reduced-motion:reduce){
  .glz{animation:none;clip-path:inset(0 38% 0 0)}   /* 停在同時看得見兩種狀態的位置 */
  .panel{animation:none}
}
```

自我限制：**本風格禁用淡入、視差、彈跳（overshoot）與任何 `blur`**。
但這不能讓動效總數低於四種——安靜不是風格。

## 八、插畫與圖像風格

技法名稱：**girih-strapwork 尺規交錯帶構成**。原語只有四種，全部由同一支引擎輸出：

1. **作圖線**：外接圓（1px 虛線 `stroke-dasharray="4 5"`）＋ 底鋪多邊形（1px 實線）＋ 邊心點（r≈2px 實心）。灰泥色。
2. **帶**：8–10px 錳黑帶身 ＋ 兩側灰泥白描邊；交點處「下面那條」斷開。
3. **磚（面）**：帶圍出來的封閉多邊形，平塗，一形一色。
4. **磚砌帶**：等寬方塊排成的窄飾帶，用於框緣。

判準：**拿掉全部顏色，仍然讀得出每一條帶從哪個星心來、它在每個交點是上還是下。**

明文禁止：feTurbulence 手抖濾鏡（那是迷幻海報語彙，而且會糊掉這個流派賴以成立的硬邊）、
半調網點、細線幾何線描（thin-lineart）、任何寫實描繪、任何外部圖片。

## 九、Logo 與 Favicon

**Logo**：磚土方塊 ＋ 一枚十二芒星（實心鈷藍、錳黑外框、灰泥白內描邊）＋ 中心一枚小星（綠松石），
右側 2.5px 直線分隔，接 Amiri 拉丁字（上行大字、下行寬字距小字）。
不要把字放進星裡，不要讓星有漸層或陰影。

**Favicon**：同一枚星，去掉中心小星以外的所有細節，磚土底，inline SVG data URI：

```html
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='-16 -16 32 32'%3E%3Crect x='-16' y='-16' width='32' height='32' fill='%23C0894E'/%3E%3Cpath d='…12 芒星…' fill='%2312439A' stroke='%231E1A22' stroke-width='1.6'/%3E%3C/svg%3E">
```

16px 下芒深比要放寬到 0.5 左右，否則尖角會消失成一團。

## 十、Do & Don't

**Do**

- 先決定底鋪與接觸角，再開始排版；版面的角度跟著圖案的角度走。
- 長文一律放在灰泥色的卡片上，不要直接壓在磚土地色上。
- 一種形狀一種顏色，整站不例外。
- 圖案一定要被容器切斷。
- 互動的可選值就是這個流派的合法值（例如旋轉只有 n 格）。

**Don't**

- 不要用「伊斯蘭花紋 PNG 當背景」。
- 不要漏掉交錯的上下關係——沒有交替的帶只是壁紙。
- 不要出現任意角度（`rotate(7deg)`、`skew(3deg)`）。
- 不要圓角、不要模糊陰影、不要漸層、不要 glassmorphism。
- 不要用假阿拉伯文當裝飾。
- 不要「置中大標＋副標＋兩顆按鈕＋三張圓角卡片」。
- 不要 emoji icon（本流派的圖示只能是幾何形）。
- 不要 Lorem ipsum；文案要有人名、價目、工時、拒絕條件。

## 十一、頁面骨架範例

```html
<body>
 <nav class="gnav">
  <p class="gnav-h">上釉的那一塊是你正在看的一頁</p>
  <div class="gnav-r">
    <a class="nt on" href="#"><svg viewBox="-22 -22 44 44">…實心星…</svg><b>這面牆</b><i>一</i></a>
    <a class="nt"    href="#"><svg viewBox="-22 -22 44 44">…線稿星…</svg><b>圖譜</b><i>二</i></a>
  </div>
 </nav>

 <section class="wall">                       <!-- 面：滿版圖案，被容器切斷 -->
   <div class="wallbg">
     <svg preserveAspectRatio="xMidYMid slice">…作圖線…</svg>
     <svg preserveAspectRatio="xMidYMid slice" class="glz">…磚＋帶…</svg>
   </div>
   <div class="wrap heroinfo">
     <div class="hb"><p class="k">Isfahan</p><h1>…</h1><p>…</p></div>
     <div class="hb b2"><p class="k">今天在做的這一面</p><dl class="facts">…</dl></div>
   </div>
 </section>

 <div class="band"><div class="wrap">   <!-- 帶：窄飾帶，把兩塊色面隔開 -->
   <span class="lat">GIREH</span><span>切磚鑲嵌</span><span>古蹟磚作修繕</span>
 </div></div>

 <section class="sec"><div class="wrap">  <!-- 框：內容一律在灰泥卡片上 -->
   <p class="k">Signature</p><h2>…</h2>
   <div class="card">…</div>
 </div></section>

 <footer>…三欄不等寬…</footer>
</body>
```

## 十二、技術實作與相容性

本站的三項核心技術。每一項都是視覺或互動的主要承載者，不是裝飾。

### 1. 圖論：交錯結上下交替的面二著色求解（E 資料與生成層）

**承載**：特徵 3。帶的每一個斷點都由它決定。

**依據**：任一連通平面圖，若所有頂點度數為偶數（本圖的節點只有度 4 的交點與度 2 的轉角），
其面必可二著色；由面的顏色指定每個交點的上下，得到的必定是交替圖。因此不需要試誤、不會卡住。

**實測**（Node v22 單執行緒）：

| 圖 | 磚數 | 節點 V | 邊 E | 面 F | V−E+F | 交點 | 面著色衝突 | 交替違例 | 全程耗時 |
|---|---|---|---|---|---|---|---|---|---|
| 4.6.12 θ=80°（首頁那面牆） | 229 | 852 | 1080 | 230 | **2** | 228 | 0 | 0 | **2.68 ms** |
| 4.6.12 θ=72° | 229 | 852 | 1080 | 230 | **2** | 228 | 0 | 0 | 1.94 ms |
| 4.8.8 θ=67.5° | 61 | 268 | 328 | 62 | **2** | 60 | 0 | 0 | 0.29 ms |
| 6.6.6 θ=60° | 44 | 197 | 240 | 45 | **2** | 43 | 0 | 0 | 0.21 ms |

歐拉公式 V−E+F=2 全部成立（平面性自檢）；四張圖合計 **2,236 次交點通過、交替違例 0**。

**相容性**：純 JavaScript 幾何與圖論，無瀏覽器 API 依賴，故無支援缺口。
**備援**：所有靜態畫面（首頁的牆、二十四張樣紙、補磚台的牆與九塊碎磚）在建置階段就以同一支引擎
算完並寫成 inline SVG，關掉 JavaScript 仍是完整的圖，只是不能互動。

### 2. CSS `steps()` 離散時間函數（B 動效與時間軸層）

**承載**：四種動效裡的三種（ambient 的前緣推進、transition 的灰泥刀、signature 的作圖回捲）。
選它而不是 `ease`／`cubic-bezier`，理由是風格本身：作圖沒有中間狀態，補間會讓它看起來像一般網頁。

**查證**（2026-09-09）：MDN《`<easing-function>`》記載 `steps()` 屬 Baseline **widely available**，
**2015 年 7 月**起跨瀏覽器可用（來源：<https://developer.mozilla.org/en-US/docs/Web/CSS/easing-function>）。

**備援**：不支援 `steps()` 的環境會退回預設的補間曲線，動畫仍然播放、起訖狀態一致，只是變成連續的；
`prefers-reduced-motion: reduce` 時全部動畫停止，並把前緣停在 `inset(0 38% 0 0)`
——那個位置同時看得見「已上釉」與「作圖線」兩種狀態，**資訊零損失**。

### 3. 鍵盤作為主要操作（D 輸入與感測層）

**承載**：核心功能「補磚」的主要輸入。這不是無障礙補丁，是風格決定的：
這個流派沒有任意角度，所以介面上不存在自由拖曳旋轉——只有 `R` 鍵一格一格轉，
而「一格」的大小由那塊磚自己的對稱性決定（十二芒星 1 格、六角梭 6 格、十二角花 2 格、小八角 3 格）。

按鍵：`←` `→` 換碎磚／`R` 或 `↑` `↓` 轉一格／`1`–`5` 換洞／`Enter` 補進去。

**查證**（2026-09-09）：caniuse `mdn-api_keyboardevent_key` 全球覆蓋 **97.01%**
（Chrome 51+、Firefox 23+、Safari 10.1+、Edge 12+、iOS Safari 10.3+；來源：
<https://caniuse.com/mdn-api_keyboardevent_key>）。MDN 記載 `KeyboardEvent` Baseline 自 2015 年 7 月起跨瀏覽器
（<https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent>）。
`:focus-visible` 用於鍵盤焦點環（<https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible>），
不支援時退回 `:focus` 預設外框，焦點仍然看得見。

**備援**：每一個鍵盤動作都另有可點擊的對應元件（碎磚可點、洞可點、「轉一格」與「補進去」是按鈕），
無鍵盤裝置功能完整。

### 效能預算實測

| 項目 | 門檻 | 本站 |
|---|---|---|
| 單頁大小（含全部 inline 資源） | ≤350 KB | 首頁 136 KB／圖譜 148 KB／補磚 51 KB／委託 26 KB |
| 首屏 JS 執行 | ≤100 ms | 首頁 0 ms（首屏全為靜態 SVG，JS 只掛事件）；圖譜按下「攤開大樣」才算，229 磚 2.68 ms |
| 主要動畫 | 60fps | ambient 為 96 秒 24 格的 `clip-path` 變化（平均每 4 秒 1 幀）；input 動效只改 `opacity`，不觸發 layout |
| layout thrashing | 無 | 全站無 `getBoundingClientRect` 迴圈；DOM 寫入只改 `fill`／`class`／`d` |

**外部資源**：只有 Google Fonts（Amiri、Noto Serif TC）。零外部圖片、零音檔、零函式庫。
