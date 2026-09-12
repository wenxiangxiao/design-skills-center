---
name: wood-type-playbill
description: 19th-century American wood type playbill — line-by-line size hierarchy quantised to a physical inventory of five sizes, four clashing display families on one sheet, thick-thin rule stacks, manicules and stock cuts, ink-starved wood grain on coloured poster stock.
---

# 木刻活字海報 Wood Type Playbill

> 一八三〇年代到一九〇〇年前後，美國小鎮印房用木活字（wood type）印出來的告示、戲單、拍賣單、失物招領單。
> 這不是「復古字體風」，是一套由**實體庫存**決定的排版方法：字級只有架上有的那幾種，
> 字族只有抽屜裡的那幾套，圖只有盒子裡的那幾枚。所有版面決策都受制於「這間印房到底有什麼」。

## 一、設計哲學

**版面層級是內容與庫存協商出來的，不是設計師畫出來的。**

十九世紀的木活字海報有一條核心邏輯：**一行字要撐滿版寬**。排字工不是先決定「標題 48pt、副標 24pt」，
而是先決定「這一行要講什麼」，再從字架上挑一副能把這行字剛好填進版寬的木字。
講的話短，字就大；講的話長，字就小。所以一張海報上會出現六七種字級，且每一級的高度都不一樣——
那是內容長度的直接讀數。

第二條邏輯：**沒有的東西就是沒有**。架上只有五種尺寸，就只能有五種尺寸；
需要一張圖，就從抽屜裡那盒用了幾十年的木口版圖章裡拿一枚，沒有人為一張告示去刻新的。
這種受限感是本流派的靈魂——**乾淨、無限、可縮放的向量世界會把它殺死**。

第三條：**大字是木頭，小字是鉛**。木字吃墨不勻（木頭有導管），大字裡永遠有紙色的細點；
鉛字面平吃墨勻，小字才排得穩。這條分工不可對調。

移植到網頁時要守住的紀律：
- 字級是**離散階梯**，不是 `clamp()` 流體縮放。流體字級會把這個流派整個關掉。
- 大字是「一行」，不是「一段」。長文一律鉛字，且對比 ≥7:1。
- 圖是庫存，不是插畫。同一枚圖章要重複出現在不同頁面。

## 二、本風格的 5 個不可省略特徵

### 特徵 1 — 離散五級字階，且級數是可見的實體庫存

拿掉它就不是這個風格了：一旦字級變成連續（`clamp`、`vw`、`font-size:calc()`），
版面立刻變成當代網頁排版。木頭不能被壓扁，也沒有半級。

```css
:root{
  /* 架上實有的五副木字：36 / 24 / 15 / 10 / 7 pica。沒有第六級。 */
  --w1:66px; --w2:44px; --w3:29px; --w4:20px; --w5:14px;
  --lead:15.5px;                 /* 鉛字：內文，不屬於這個階梯 */
}
@media(max-width:900px){:root{--w1:52px;--w2:36px;--w3:25px;--w4:18px;--w5:13px}}
@media(max-width:560px){:root{--w1:42px;--w2:30px;--w3:22px;--w4:16px;--w5:12px}}
.L1{font-size:var(--w1)}.L2{font-size:var(--w2)}.L3{font-size:var(--w3)}
.L4{font-size:var(--w4)}.L5{font-size:var(--w5)}
```

配套的選級函式（**不縮放，只降級**）：

```js
// 字寬以字身計：全形 1.00、半形 0.56（em）
const BUD={3:[4.7,7.1,10.9,15.8,22.6],2:[6.4,9.3,13.6,18.9,26.0],1:[5.5,7.8,10.6,14.6,19.6]};
function emw(t){let w=0;for(const c of String(t))w+=(c.charCodeAt(0)<0x2E80?0.56:1.0);return w}
function level(text,cols){const w=emw(text),b=BUD[cols>=3?3:(cols>=2?2:1)];
  for(let i=0;i<5;i++)if(w<=b[i])return{lv:i+1,wrap:false};
  return{lv:5,wrap:true}}          // 五級都排不下才斷行
```

**把級數印出來。** 每一塊內容角落標一行 `36 PICA` 之類的 mono 小字——
這讓「字級是庫存」從一個內部規則變成畫面上看得見的事實。

### 特徵 2 — 一張紙上四種以上互相打架的顯示字族

拿掉它就不是這個風格了：小鎮印房不會為了視覺統一去買同一家族的六種字重，
他有什麼就用什麼。Fat Face（極粗襯線）、Tuscan（尖角飾）、Egyptian（板狀襯線）、
Condensed Gothic（窄無襯線）**同時出現在同一張紙上**，才是十九世紀海報的樣子。
單一字族＋字重階梯是二十世紀瑞士的做法，不是這裡的。

```css
/* Google Fonts：Ultra(Fat Face) / Rye(Tuscan) / Oswald(Condensed Gothic) / Noto Serif TC 900(中文木字) */
.fat{font-family:"Ultra",serif;letter-spacing:.01em}          /* 極粗襯線 */
.tus{font-family:"Rye",serif}                                  /* 尖角飾木活字 */
.got{font-family:"Oswald",sans-serif;font-weight:600;
     letter-spacing:.10em;text-transform:uppercase}            /* 窄體哥德 */
.ws {font-family:"Noto Serif TC",serif;font-weight:900}        /* 中文的「木字」 */
```

用法紀律：**一行一族**。同一行不混族（那是拼貼風），而是**行與行之間**跳族。
中文站的做法是：中文用 900 字重的襯線當木字，拉丁三族負責日期帶、編號、章節序號與英文副標。

### 特徵 3 — 粗細規則線（rule stacks）

拿掉它就不是這個風格了：規則線是金屬條，是實物，厚薄只有幾種。
它不是分隔線的裝飾選項，它是版面的骨骼——一張十九世紀海報上會有十幾條。
**只准三種疊法**，多了就變成當代編輯排版。

```css
.rule{border:0;height:0;border-top:4px solid var(--ink);border-bottom:1px solid var(--ink);
      padding-top:3px;margin:16px 0}                    /* 粗細線：一段的開頭 */
.rule.thin{border-top-width:1px;border-bottom-width:0;padding-top:0}   /* 單細線 */
.rule.trip{border-top:1px solid var(--ink);border-bottom:4px solid var(--ink);
      padding-top:3px;position:relative}                 /* 細粗細線：一頁的結尾 */
.rule.trip::after{content:"";position:absolute;left:0;right:0;top:-5px;
      border-top:1px solid var(--ink)}
```

**零圓角、零模糊陰影。** 印刷品上沒有 blur。需要「浮起來」時用實心位移色塊，
但注意 `_overused_watchlist` 已把「按壓硬陰影」列為過載——本流派更好的做法是根本不做立體，
用規則線與反白色塊做層級。

### 特徵 4 — 手指指標（manicule）與庫存木刻圖章

拿掉它就不是這個風格了：☞ 是十九世紀告示的招牌記號，
而所有圖像都必須是「抽屜裡那盒用了幾十年的木口版」——**實心剪影＋平行刻痕＋四邊被撞出來的崩口**，
不是細線描邊、不是漸層、不是寫實。

```js
// 一枚庫存圖章 = 實心剪影 + 刻痕（暗面）+ 崩口（用久了的邊）+ 方框
function cut(id, d, seed){
  const r = mulberry32(fnv('cut|'+id));
  let gouge='', chips='';
  for(let i=0;i<14;i++){                       // 刻痕：木口版的平行排線
    const y = 8+i*6.4+r()*1.4;
    gouge += `<rect x="0" y="${y}" width="100" height="${(0.9+r()*0.9).toFixed(1)}"
              fill="var(--paper)" opacity="${(0.20+r()*0.22).toFixed(2)}"/>`}
  for(let i=0;i<9;i++){                        // 崩口：沿方框四邊挖掉的缺角
    const side=Math.floor(r()*4), p=6+r()*88, w=2+r()*5, h=1.5+r()*3.5;
    const b=[[p,-0.5,w,h],[100-h,p,h,w],[p,100-h,w,h],[-0.5,p,h,w]][side];
    chips += `<rect x="${b[0].toFixed(1)}" y="${b[1].toFixed(1)}"
              width="${b[2].toFixed(1)}" height="${b[3].toFixed(1)}" fill="var(--paper)"/>`}
  return `<svg viewBox="-4 -4 108 108">
    <rect x="-4" y="-4" width="108" height="108" fill="var(--paper)"/>
    <path d="${d}" fill="var(--ink)"/>
    <g clip-path="url(#cc-${id})">${gouge}</g>
    <clipPath id="cc-${id}"><path d="${d}"/></clipPath>
    <rect x="-4" y="-4" width="108" height="108" fill="none" stroke="var(--ink)" stroke-width="2"/>
    ${chips}</svg>`}   // 崩口必須畫在框線之後，才咬得掉框
```

**同一枚圖章要在站內重複出現**（logo、頁尾、按鈕、圖鑑）。庫存的意思就是重複使用。
明文禁用：emoji、線性圖示集、`stroke-linecap:round`、任何漸層。

### 特徵 5 — 有色海報紙上的單色墨，以及木字的吃墨

拿掉它就不是這個風格了：十九世紀的海報紙是廉價的有色紙（salmon、buff、yellow、pink、blue），
上面印一種墨，第二色是奢侈品、只印小面積。**白底＋多彩＝不是這個流派。**
而木字吃墨不勻——滾筒滾過木頭的導管，墨會被吃掉一點，印出來的大字裡永遠有紙色的細點。

```css
:root{
  --stock:#DE9273;   /* 鮭色海報紙，大面積地色 */
  --ink:#191410;     /* 單色墨 */
  --red:#B3291C;     /* 第二色：奢侈品，只給記號與色塊，絕不在鮭色紙上當小字 */
  --paper:#F0E7D4;   /* 較白的紙（單子本身）*/
}
/* 吃墨：把紙色的硬邊斑點刷進字的形狀裡 */
.ws{position:relative;display:inline-block;color:var(--ink);font-weight:900;line-height:1}
.ws::after{content:attr(data-c);position:absolute;left:0;top:0;color:transparent;
  background-image:var(--starve);              /* 見下方 SVG */
  background-position:var(--sx) var(--sy);     /* 每個字自己的吃墨位置，由字決定，恆定 */
  -webkit-background-clip:text;background-clip:text;
  animation:starve 46s steps(9) infinite;pointer-events:none}
@keyframes starve{                              /* ambient：每 5 秒重新吃一次墨 */
  from{background-position:var(--sx) var(--sy)}
  to  {background-position:calc(var(--sx) + 150px) calc(var(--sy) + 150px)}}
```

```html
<!-- --starve：高頻雜訊硬切成紙色斑點。discrete 是關鍵，缺墨的邊是硬的不是糊的 -->
<svg xmlns='http://www.w3.org/2000/svg' width='150' height='150'>
<filter id='s'>
  <feTurbulence type='fractalNoise' baseFrequency='0.62' numOctaves='2' seed='31'/>
  <feColorMatrix type='matrix' values='0 0 0 0 0.871  0 0 0 0 0.573  0 0 0 0 0.451  1 0 0 0 -0.60'/>
  <feComponentTransfer><feFuncA type='discrete' tableValues='0 0 0 1'/></feComponentTransfer>
</filter><rect width='150' height='150' filter='url(#s)'/></svg>
```

木紋（`--grain`）用同一支濾鏡但把 x 頻率壓到極低、y 頻率拉高，得到橫向長條：
`baseFrequency='0.004 0.46'`。**木紋只給實體物件**（字架、furniture 木條、導覽空鉛），
**不給印出來的字**——紙上不會印出木紋，那是字塊本身的樣子。

## 三、色彩系統

| 色 | hex | 比例 | 用途 |
|---|---|---|---|
| 鮭色海報紙 | `#DE9273` | 44% | 唯一大面積地色。整站的內容都印在這張紙上 |
| 單色墨 | `#191410` | 34% | 全部文字、全部規則線、全部圖章的實心面 |
| 較白的紙 | `#F0E7D4` | 12% | 單子、卡片、表格底——「另外一張紙」 |
| 朱（第二色） | `#B3291C` | ≤8% | 手指指標、印記、已領回、章節序號。**絕不在鮭色紙上當小字** |
| 木 | `#8A5B3A` / `#6B4327` | ≤6% | 只給實體木料：字架、furniture、鐵框內緣、空鉛 |
| 牆板 | `#2F4438` | 頁外底 | 紙以外的世界 |

硬規則：
1. **朱色的對比不夠。** `#B3291C` 對 `#DE9273` 只有 2.6:1。第二色只能當色塊、記號與粗字，
   要當文字就必須先鋪一塊 `--paper`（對比 5.2:1）。這正是十九世紀套第二色的實際限制。
2. 墨對鮭色紙 7.4:1，長文照排無妨。
3. **零漸層。** 唯一允許的非平塗是木紋與吃墨，而它們都是雜訊不是漸層。
4. 換一張紙色（buff `#E4CE9B`、pale blue `#BFCBC6`、pink `#E9BFC4`）即可換一整個站的氣質，
   結構完全不動——這是本流派最好用的地方。

## 四、字體系統

| 角色 | 字體 | 字重 | 用在哪 |
|---|---|---|---|
| 中文木字 | Noto Serif TC | 900 | 只給頭一行，L1–L3 |
| 中文鉛字 | Noto Serif TC | 400 | 內文，15.5px / 1.85 |
| Fat Face | Ultra | 400 | 編號、英文大標（`NO. 2,417`）|
| Tuscan | Rye | 400 | 章節序號、英文副標、印記字 |
| Condensed Gothic | Oswald | 400 / 600 | 欄位標籤、mono 小字、表頭 |

- 中文木字 `letter-spacing:0`、`line-height:1`——木字是一塊一塊排的，字間沒有空隙。
- Oswald 小字一律 `letter-spacing:.13em`：金屬小字要靠加空鉛才排得開。
- **禁止**用 `font-weight:700` 當中間級。木字沒有中間字重，只有不同的字族。

## 五、版面與網格

### 版框 forme

整站的內容裝在一副鎖起來的版裡：外層鐵框（`border:14px solid #2A231C`）、
內緣一圈木製 furniture（`inset box-shadow`）、裡面是紙。

```css
.sheet{max-width:1180px;margin:0 auto;background:var(--stock);
  border:14px solid #2A231C;
  box-shadow:inset 0 0 0 7px var(--wood),inset 0 0 0 8px var(--woodd),0 0 0 3px #14100C}
```

### 全版橫線對齊（subgrid）

一副版鎖起來以後，同一列上的每一張單子，橫線必須在同一個高度——
這是實體排版的物理事實（同一列的鉛條是通長的一根）。用 `subgrid` 直接表達：

```css
.forme{display:grid;grid-template-columns:repeat(var(--cols,3),minmax(0,1fr));
  gap:0;padding:7px;border:6px solid var(--woodd);
  background:var(--wood);background-image:var(--grain)}
.bill{grid-row:span 5;display:grid;grid-template-rows:subgrid;row-gap:0;
  background:var(--paper);border:1px solid var(--ink)}
@supports not (grid-template-rows:subgrid){
  .bill{grid-row:auto;grid-template-rows:auto auto auto auto auto}
  .bill>.b1{min-height:26px}.bill>.b2{min-height:96px}.bill>.b3{min-height:78px}
  .bill>.b4{min-height:64px}.bill>.b5{min-height:34px}
}
```

`gap:0` 是刻意的——鎖緊的版沒有縫，相鄰兩張單子共用一道 2px 的墨線。
版上排不滿的格子**不留白**，填木製 furniture 木條（版空著會在印刷時翹起來）。

### 留白規則

- 版內：**不留白**。空的地方填 furniture 或圖章，不留裸紙。
- 版外：紙的四邊留 `clamp(16px,3.2vw,40px)`，讓鐵框看得見。
- 段落最大寬度 44em；長文一律在 `--paper` 上，不在鮭色紙上（可讀性）。
- **不旋轉。** 這個流派沒有斜排——鉛字排不斜。要動態感靠字級跳躍，不靠角度。

## 六、元件配方

```css
/* 導覽：空鉛撐開。活版的強調不是變粗，是在字之間塞木製空鉛（quads） */
.nav{display:flex;flex-wrap:wrap;border-top:4px solid var(--ink);
  border-bottom:1px solid var(--ink);padding:7px 0}
.nav a{display:flex;align-items:center;text-decoration:none;font-weight:900;font-size:var(--w4)}
.nav a+a{margin-left:22px}
.nav .q{display:none;width:.44em;height:1em;background:var(--wood);
  background-image:var(--grain);border:1px solid var(--woodd);margin:0 .05em;vertical-align:-.12em}
.nav a[aria-current="page"] .q{display:inline-block}   /* 現用頁被空鉛撐開 */
.nav a:hover .ch{background:var(--ink);color:var(--stock)}  /* 反白，不是變色 */

/* 按鈕：一塊排好的字，不是一個 UI 元件 */
.btn{font-weight:900;font-size:var(--w4);background:var(--ink);color:var(--paper);
  border:1px solid var(--ink);padding:6px 20px;border-radius:0}
.btn:hover{background:var(--paper);color:var(--ink)}     /* 反白 */

/* 選項：邊框 1px 墨線，選中即反白＋內描邊（像被墨蓋過） */
.opt[aria-pressed="true"]{background:var(--ink);color:var(--paper);
  box-shadow:inset 0 0 0 2px var(--paper),inset 0 0 0 3px var(--ink)}

/* 表格：實線格，表頭滿版墨底 */
th{background:var(--ink);color:var(--paper);font-weight:400;
   font-family:"Oswald",sans-serif;letter-spacing:.1em;font-size:12px}
th,td{border:1px solid var(--ink);padding:6px 10px}

/* 表單：零圓角，focus 用朱色 outline（第二色的正當用途） */
input,select,textarea{border:1px solid var(--ink);border-radius:0;background:var(--paper)}
input:focus{outline:3px solid var(--red);outline-offset:1px}
```

## 七、動效規則（四種，缺一不可）

| 類型 | 名稱 | 觸發 | 具體值 |
|---|---|---|---|
| ambient | 吃墨換位 | 無需輸入 | `animation:starve 46s steps(9) infinite`，每約 5.1 秒整版重新吃一次墨。**用 `steps()` 不用 linear**——每一次印都是離散的一次印 |
| input | 上墨 | hover / focus-within | `.ws::after{opacity:.10}`，`transition:opacity 90ms linear`；同時 `.bill:hover{transform:translateY(1px)}`（壓印，1px，不是陰影）|
| transition | 推版進出 | 頁面載入 | `formeslide 420ms cubic-bezier(.2,.9,.25,1)`：`translateX(-3.2%)` + `clip-path:inset(0 0 0 6%)` → 0，像版被推進鐵框 |
| signature | 落版與重鎖 | 篩選狀態改變 | 見下 |

### 簽名動效：落版與重鎖（pied-and-relock）

被剔除的單子不是淡出——**它散字**。每一個木字按自己的方向掉下去（`steps(5)`，鉛木掉下來不會 ease-out），
340ms 後才重新鎖版；留下來的單子由 View Transitions 從舊位置滑到新位置。

```css
.bill.pied .ws{transform:translate(var(--fx),var(--fy)) rotate(var(--fr));
  transition:transform 340ms steps(5,end),opacity 340ms steps(5,end);opacity:.15}
.bill.pied .b1,.bill.pied .b3,.bill.pied .b4,.bill.pied .b5{opacity:0;transition:opacity 180ms linear}
```

```js
function relock(){
  const next = filter(), gone = cur.filter(b => next.indexOf(b) < 0);
  const run  = () => paint(next);
  const go   = () => (document.startViewTransition && !RM.matches)
                     ? document.startViewTransition(run) : run();
  if (RM.matches || !gone.length) return go();
  gone.forEach(b=>{const el=q(b); if(el){el.classList.add('pied'); el.style.viewTransitionName=''}});
  setTimeout(go, 350);                       // 先落版，再重鎖
}
```

`--fx/--fy/--fr` 由字元本身決定（FNV-1a → mulberry32），同一個字永遠往同一個方向掉。

**降級**：`prefers-reduced-motion:reduce` 時四種全部停用，`relock()` 直接 `paint()`，
篩選結果、字級、版頭撤下的欄位完全相同——資訊零損失。

**自我限制**（可寫進站點，但不得使動效總數低於四種）：
禁用淡入式滾動揭示、視差、數字滾動、跑馬燈、`stroke-dashoffset` 描繪。
理由是它們都預設「東西會慢慢出現」，而印刷品是一次壓出來的。

## 八、插畫與圖像風格

`stockcut-forme 庫存木刻圖章與版材構成`：站上不存在任何「畫」出來的插圖，只有兩類圖像原語。

1. **庫存圖章**（見特徵 4）：實心剪影＋刻痕＋崩口＋方框。判準是**拿掉顏色仍讀得出它被用了幾十年**。
2. **版材**：字架、furniture 木條、空鉛、鐵框、木字塊側面——全部是矩形加木紋，
   一律 `background-image:var(--grain)` + 1px 深木色描邊。判準是**它看起來是一塊可以拿起來的東西**。

明文禁用：照片、細線幾何線描、半調網點、`feDisplacementMap` 手抖邊（那是迷幻海報的語彙）、
任何漸層、任何 `border-radius`。

## 九、Logo 與 Favicon

**Logo**：一排木字塊（實心深色矩形＋橫向木紋＋底部一道朱色 nick 溝）＋一枚朱色手指指標＋粗細線＋
一行 Condensed Gothic 英文。字塊本身即使字型沒載入也是完整的圖形。

**Favicon**：一塊木字的側面。這是本流派最好的縮圖——不是縮小的 logo，是一個物件。

```html
<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'>
<rect width='32' height='32' fill='#DE9273'/>
<rect x='6' y='3' width='20' height='26' fill='#191410'/>
<rect x='6' y='7'  width='20' height='1.4' fill='#DE9273' opacity='.28'/>
<rect x='6' y='13' width='20' height='1.4' fill='#DE9273' opacity='.22'/>
<rect x='6' y='19' width='20' height='1.4' fill='#DE9273' opacity='.26'/>
<rect x='6' y='24' width='20' height='3.2' fill='#B3291C'/></svg>
```

## 十、Do & Don't

**Do**
- 字級用離散階梯，且把級數印在畫面上。
- 一行一族，行與行之間跳族；一張紙上至少四種顯示字族。
- 有色紙 + 單色墨；第二色 ≤8% 且必須先鋪白紙才能當文字。
- 圖只能從庫存拿，同一枚要重複使用。
- 版內排不滿就填木條，不留裸紙。
- 大字用 `steps()`，因為印刷是離散事件。

**Don't**
- ❌ `clamp()` 流體字級、`vw` 字級 —— 這一條就足以毀掉整個流派。
- ❌ 白底、紫藍漸層、圓角卡片、模糊陰影、玻璃擬態。
- ❌ 置中大標＋副標＋兩顆按鈕＋三張卡片。
- ❌ emoji 圖示、線性圖示集、`stroke-linecap:round`。
- ❌ Lorem ipsum、「在當今快節奏的世界」、「把 X 變成 Y」句式標題。
- ❌ `EST. 19xx` 年份徽章（`_overused_watchlist` 已列禁用）。
- ❌ 斜排、旋轉、視差——鉛字排不斜。
- ❌ 跑馬燈。本流派的重點資訊靠字級承擔，不靠捲動。

## 十一、頁面骨架範例

```html
<body>                                 <!-- 牆板底色 + 粗木紋 -->
<div class="sheet"><div class="pad">    <!-- 鐵框 + furniture 內緣 + 鮭色紙 -->

  <div class="top">
    <div class="mark"><svg class="fist">…</svg>
      <div><div style="font-weight:900;font-size:var(--w2)">店名</div>
           <div class="got" style="font-size:11px">LATIN SUBTITLE</div></div></div>
    <div class="mono">地址<br>營業時間</div>
  </div>

  <nav class="nav">                     <!-- 空鉛撐開現用頁 -->
    <a href="a.html" aria-current="page"><span class="ch">版</span>
      <i class="q"></i><span class="ch">上</span><span class="en">ON THE FORME</span></a>
    <a href="b.html"><span class="ch">認</span><i class="q"></i><span class="ch">領</span>
      <span class="en">CLAIM</span></a>
  </nav>

  <!-- 混排字族的日期帶：四種字族排在同一條線上 -->
  <div style="display:flex;gap:6px 16px;align-items:baseline;border-bottom:1px solid var(--ink)">
    <span class="fat" style="font-size:var(--w3)">NO. 2,417</span>
    <span class="tus" style="font-size:var(--w4)">Chengsi Terminal</span>
    <span style="font-weight:900;font-size:var(--w4)">民國一一五年八月十一日</span>
    <span class="got" style="font-size:12px">POSTED 17:50</span>
  </div>

  <div class="forme" style="--cols:3">  <!-- subgrid：全版橫線對齊 -->
    <div class="bill">
      <div class="b1"><span class="mono">件號</span><span class="mono">36 PICA</span></div>
      <div class="b2"><span class="kicker">類別</span>
        <span class="wline L1"><span class="ws" data-c="雨" style="--sx:-31px;--sy:-88px">雨</span>
                               <span class="ws" data-c="傘" style="--sx:-12px;--sy:-40px">傘</span></span></div>
      <div class="b3">鉛字寫的公開描述。</div>
      <div class="b4"><span class="fld">材質　布</span><span class="fld">拾得路線　藍1</span></div>
      <div class="b5"><span class="mono">手續費 20 元</span><span class="mono">☞ 認領</span></div>
    </div>
    <div class="furn"><span>FURNITURE</span></div>   <!-- 排不滿就填木條 -->
  </div>

  <hr class="rule">
  <footer class="foot"> … <hr class="rule trip"> </footer>
</div></div></body>
```

## 十二、技術實作與相容性

三項核心技術，各屬不同層，每一項都在承載上面某一個不可省略的特徵。

### 1. SVG filter `feTurbulence` + `feColorMatrix` + `feComponentTransfer`（A 渲染層）

**承載**：特徵 5 的木紋與吃墨，以及紙纖顆粒。三張貼圖都是同一支濾鏡換參數，
以 `data:` URI 寫進 CSS 自訂屬性（`--grain` / `--starve` / `--fibre`），全站零外部圖片。

- **支援現況**（2026-08-11 查證 MDN《feTurbulence》與 `SVGFETurbulenceElement` 各屬性頁）：
  **Baseline Widely available**，自 2015-07 起跨瀏覽器；`numOctaves`、`baseFrequencyX`、`type`
  皆標示同一狀態。`feComponentTransfer`／`feFuncA type="discrete"` 同屬 SVG 1.1 濾鏡集。
- **為何選它而非 canvas 或 PNG**：貼圖必須能被任意尺寸的元素平鋪且不佔網路請求；
  `data:` URI 的 SVG 由瀏覽器在需要的解析度上柵格化一次，之後純快取。
- **Fallback**：濾鏡不支援時整個 `<rect>` 被忽略，背景退為 `--stock` / `--wood` 實色。
  木紋與吃墨消失，**字仍是實心墨字、版面與可讀性完全不變**。
- **實測**：三張貼圖合計 1.1 KB（URI 編碼後），單頁最大 81 KB（含全部 inline CSS/JS/SVG 與 42 筆資料），
  遠低於 350 KB 預算。

### 2. View Transitions API（同文件 `document.startViewTransition`，B 動效與時間軸層）

**承載**：簽名動效「落版與重鎖」的後半段。留在版上的單子要從舊位置滑到新位置，
而 CSS Grid 的重排本身沒有動畫；同文件 View Transitions 以 `view-transition-name` 自動配對新舊快照，
不需要手寫 First–Last–Invert–Play。

- **支援現況**（2026-08-11 查證 MDN《Document: startViewTransition()》與《ViewTransition》）：
  Chrome / Edge 111+、Safari 18+、Firefox 144+（Firefox 的同文件支援於 2025 年秋季隨 144 版落地；
  部分整理文章寫 133，以 MDN 相容性表為準）。**跨文件（`@view-transition{navigation:auto}`）
  在 Firefox 仍在旗標後**，故本站只用同文件版本，跨頁轉場改由 CSS keyframes（推版進出）承擔。
- **實作要點**：
  - `view-transition-name` 必須在頁面上唯一。本站以件號的數字部分組成 `vt-01`…`vt-42`。
  - **只給前 26 張命名**。命名元素越多，瀏覽器要拍越多張快照；超過約 30 張時
    Chrome 的轉場起始延遲會明顯上升。未命名的單子隨根元素淡入淡出，語意不損。
  - 被剔除的單子在轉場開始前把 `viewTransitionName` 清空，否則它們會被當成「離場元素」
    而與手寫的落版動畫打架。
- **Fallback**：`if (document.startViewTransition && !reducedMotion) … else run()`。
  不支援時 DOM 直接更新，重排瞬間完成，**篩選結果完全相同**。

### 3. CSS Grid `subgrid`（C 版面與樣式層）

**承載**：「同一列的橫線必須在同一個高度」這個實體排版的物理事實（特徵 3 的規則線在版上的行為）。
每張單子是一個跨 5 個列軌的 `subgrid`，五條帶（件號帶／木字帶／描述帶／欄位帶／底帶）
因此在整列上齊平——不論各張單子的描述長短。用固定高度做不到（描述長度不一），
用 flex 做不到（跨元素對齊）。

- **支援現況**（2026-08-11 查證 caniuse `css-subgrid` 與 MDN）：
  Chrome / Edge 117+、Firefox 71+、Safari 16+、Opera 103+、Samsung Internet 24+；
  **2026-03-15 起列為 Baseline Widely available**。caniuse 於 2025 年底的全球覆蓋率統計
  仍略低於 90%（舊版瀏覽器殘留），故仍附 fallback。
- **Fallback**：`@supports not (grid-template-rows:subgrid)` 時改為五個 `auto` 列軌
  加各帶 `min-height`。橫線在同一列上大致齊平但不保證精確；**全部內容與功能完全不變**。
- **附帶注意**：subgrid 預設繼承父格線的 gutter。本站父格線 `gap:0`（鎖緊的版沒有縫），
  另在 `.bill` 明寫 `row-gap:0` 以免不同引擎對繼承 gutter 的解讀差異造成帶與帶之間出現縫。

### 效能實測（2026-08-11）

| 項目 | 值 | 預算 |
|---|---|---|
| 單頁最大體積（含全部 inline 資源） | 81.1 KB（`claim.html`）| ≤350 KB |
| 外部資源 | 只有 Google Fonts（4 家族）| 允許 |
| 首屏 JS（42 筆資料建版 + 選項面板） | 4–9 ms（`claim.html#perf` 會把實測值印到 console）| ≤100 ms |
| ambient 動效 | 每 46 秒 9 次離散重繪，約每 5.1 秒一次 | 60 fps |
| 落版動畫 | `transform` / `opacity`，`steps(5)` 共 5 幀，不觸發 layout | 60 fps |

無 layout thrashing：`paint()` 只做一次 `innerHTML` 寫入，不讀取 `getBoundingClientRect()`；
位移交給 View Transitions 或 `transform`。

### 無 JavaScript 時

四頁全部內容在建置階段就以**同一份 `billHTML` 原始碼**烘成靜態 HTML
（Node 端以 `new Function` 執行同一段字串，確保烘出來的與執行期渲染逐字一致）。
關掉 JavaScript：42 張單子、24 枚圖章、全部表格與章則照常可讀，只是不能在櫃檯篩選、
不能作暗記舉證、表單改請電洽。`<noscript>` 明寫這一點。
