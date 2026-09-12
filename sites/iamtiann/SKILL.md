---
name: rosta-window-stencil
description: Soviet ROSTA Window agit-poster for the web — numbered narrative panel grids with zero gutters, two-plate stencil silhouettes on coarse paper, rhymed caption bands squeezed to the panel width, and a hard topological rule that any island of card not bridged to the frame will fall out and flood with ink.
---

# ROSTA 窗 Окна РОСТА 風格規格書

> 本規格書描述的是一個**真實存在、可查證、可指名的設計流派**：
> 蘇聯俄羅斯電訊社的宣傳窗（**Окна сатиры РОСТА**／ROSTA Satire Windows，1919–1921），
> 不是本館自創的風格。它與波蘭海報學派、迷幻海報、達達拼貼都不同族，
> 判準是四件事同時成立：**編號分格連環 ＋ 模板剪影 ＋ 兩塊版的成本紀律 ＋ 格底韻文帶**。
>
> **起源與製作條件**：一九一九年秋天的莫斯科。內戰、封鎖、缺紙缺墨，印刷機的產能全部給了報紙與軍令，
> 宣傳品沒有印刷機可用。俄羅斯電訊社（РОСТА）於是把電報消息交給畫家，畫家用厚紙割出模板、
> 手工刷上一到三種顏色，掛進沿街空店面的櫥窗。從電報進來到窗掛出去，經常在兩小時內。
> 至一九二一年約產出一千六百種題材，因為每一種都用模板複製數十份而分送多個城市。
>
> **代表人物與作品**：
> - **Михаил Черемных（Mikhail Cheremnykh）**——第一扇窗（1919 年 10 月）的作者，體制的發明人。
> - **Владимир Маяковский（Vladimir Mayakovsky）**——寫了其中絕大多數的韻文並親自刻版，
>   他自稱這段經歷是他一生最重要的工作之一；那些兩行短句是他為「識字不多、只在櫥窗前停三秒」的讀者寫的。
> - **Иван Малютин（Ivan Malyutin）**——大量剪影人形的作者。
> - 傳統上溯至俄國民間版畫 **лубок（lubok）**：分格、圖上有字、粗輪廓、平塗。
>
> **為什麼它長成這樣**（每一個視覺特徵都是製作條件的直接後果）：
> 沒有印刷機 → 用模板；模板一色一張、一色刷一次 → 顏色數就是成本，所以只有兩三色；
> 模板是從一張紙上割出來的 → 沒有中間調、沒有漸層、沒有細節，只有「紙」和「洞」；
> 割出來的紙必須連著邊框才不會掉 → 產生橋（bridge），這就是模板字母的缺口；
> 讀者站在街上只有幾秒 → 分格、編號、每格一件事、格底押韻。
>
> 本規格書把上述條件寫成可以在網頁上重現的規則。

---

## 一、設計哲學

**第一原則：畫面上沒有「主視覺」這個角色。**

沒有 hero、沒有大標＋副標＋按鈕組、沒有一張統領全局的圖。
有的是一個**被粗黑框切開的格子陣**，每一格編號、每一格一件事、從左上讀到右下。
標題如果要存在，它自己佔一格，跟別的格一樣大。

**第二原則：顏色的數量是錢。**

一色一張模板、一色刷一次紙。你在這個風格裡每加一個顏色，就是在宣稱「這件事值得多刻一張版、多過一次紙」。
所以配色不是品味問題，是預算問題——兩塊版（墨＋一個專色）是常態，三塊是奢侈，四塊不存在。
這條紀律要寫進介面：本站的申請表單裡選第三個顏色會被當場駁回，理由是「分隊只有兩罐油墨」。

**第三原則：圖像只有兩種狀態——紙，或洞。**

沒有灰、沒有漸層、沒有陰影、沒有描邊線、沒有五官。
一個人在這個風格裡只有**姿勢**，沒有臉。要表達重要性就把它畫大，不管它實際多大。

**第四原則：留下來的紙要連著邊框。**

這是唯一一條**拓樸**的規則，也是這個風格最容易被抄漏的一條。
任何一塊被洞包圍、沒有接回外框的紙（島）在上墨時會掉出來，它原本佔的位置跟著吃墨。
所以模板字母的 O、A、D 一定有缺口，鍋耳一定有一小截沒割斷。
**那些缺口不是裝飾，是這張紙撐得住自己的唯一理由。**
做這個風格如果沒有處理橋，圖看起來會「太乾淨」——那就是它不像的原因。

**第五原則：字是給走路的人看的。**

格底兩行、押韻、第二行比第一行短。不用「應」「宜」「務必」這種公文的字。
字要塞滿整條帶，因此字的寬度由格子決定，不是由字級決定。

---

## 二、色彩系統

| 色 | hex | 用途 | 比例 |
|---|---|---|---|
| 粗紙 | `#C7BFA6` | 全站地色。**不是米白**——是灰黃的包裝紙／配給紙。不鋪紙紋圖片，靠色相偏綠黃來表達粗糙 | 約 40% |
| 亮紙 | `#D3CCB6` | 玻璃後、卡紙、輸入框；比地色亮一階，用來分出「這是另一張紙」 | 約 8% |
| 墨 | `#1A1714` | 第一塊版。所有格框、韻文帶、輪廓、正文。**帶暖偏，不是純黑**（油性油墨的黑偏褐） | 約 30% |
| 朱紅 | `#D2231F` | 第二塊版。**只給火、行動、現用態、被拒絕的事**。永遠不用來寫正文 | 約 15% |
| 二道紅 | `#8E1712` | 同一塊紅版過兩次紙的顏色。給頁尾強調、印記底、英文小標 | 約 5% |
| 夜 | `#262320` | 頁尾＝玻璃外面的夜 | 約 2% |

**硬規則**

1. **紅色不寫字。** `#D2231F` 對紙底的對比只有 3.35:1，只准用在大面積圖形、色塊、標記與 ≥24px 的展示字。
   正文一律墨色（9.5:1）。這一條是「兩塊版」紀律與無障礙同時要求的結果。
2. **兩塊版相疊處必須真的疊。** 紅版一律 `mix-blend-mode:multiply` 並帶固定套印偏移，
   相疊處自然落到暖黑（約 `#20120F`）。不要手動填一個「第三色」——那等於偷刻了第三張版。
3. **零漸層、零模糊陰影。** 需要陰影時一律實心位移色塊（`box-shadow:5px 5px 0`）。
4. **不鋪紙張材質圖。** 這個流派的紙是靠色相與版面粗度表達的，貼 noise 會讓它變成「復古濾鏡」。

```css
:root{--paper:#C7BFA6;--pap2:#D3CCB6;--ink:#1A1714;--red:#D2231F;--red2:#8E1712;--night:#262320;--rule:3px}
```

---

## 三、字體系統

- **漢字**：`Noto Sans TC` — 900 給標題與韻文帶、700 給小標、500 給正文。
  韻文帶**一定要 900**：這個流派的字是刻出來的，不是寫出來的，沒有細筆畫。
- **拉丁與數字**：`Archivo Black` — 只給格號、統計數字、英文小標。它的字腔小、字重極高，接近手刻的粗字。
- **禁止**：襯線體、等寬體（那是終端機風）、書法體、任何圓體。

```html
<link href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Noto+Sans+TC:wght@400;500;700;900&display=swap" rel="stylesheet">
```

| 角色 | 字級 | 字重 | 行高 | 字距 |
|---|---|---|---|---|
| 章節標題 h2 | `clamp(22px,3.1vw,34px)` | 900 | 1.12 | .01em |
| 格號 | 12px | Archivo Black | 1 | 0 |
| 格題 | 11px | 900 | 1 | **.22em** |
| 韻文 | `clamp(12px,1.35vw,16px)` | 900 | 1.34 | .04em |
| 正文 | 16px | 500 | **1.72** | 0 |
| 英文小標 | 12px | Archivo Black | 1 | .16em |

正文行高刻意拉到 1.72——版面其他地方全部是硬邊高密度色塊，長文需要一塊真正能呼吸的地方，否則整站不可讀。

---

## 四、版面與網格

**主結構＝窗（window）＝分格連環。**

- 格數只用 **4／6／8／12**，對應 2／3／4／4 欄。不用 5、7、9——那是雜誌網格，不是連環。
- **格與格之間沒有留白，只有格框的黑。** 做法是外層 grid 的 `gap` 用墨色背景撐出來，不是 border。
- 每格內部由上到下固定四層：**格號角標 → 圖 → （指向帶疊在圖上）→ 韻文帶**。韻文帶一律貼齊格底。
- 圖區固定 `aspect-ratio:20/22`（模板卡紙的比例）。**不要用 16:9 或正方形**。
- ≤560px 一律落成 2 欄，且韻文允許換行（桌機不換行）。

```css
.win{display:grid;grid-template-columns:repeat(var(--cols),1fr);gap:3px;
     background:var(--ink);border:5px solid var(--ink)}
.pn{position:relative;background:var(--paper);display:flex;flex-direction:column}
.pno{position:absolute;left:0;top:0;background:var(--ink);color:var(--paper);
     font-family:"Archivo Black";font-size:12px;line-height:1;padding:5px 7px 6px}
.art{aspect-ratio:20/22;padding:10px 8px 4px}
.cap{background:var(--ink);color:var(--paper);padding:7px 9px 9px;margin-top:auto}
```

**留白規則**：整站唯一允許的大片留白是格內圖的四周（約 8–10% 內縮）。
版塊之間用 5px 實黑線分隔，不用空白。**沒有卡片、沒有圓角、沒有陰影卡。**

---

## 五、本風格的 5 個不可省略特徵

> 拿掉其中任何一項，做出來的就不是 ROSTA 窗。每一項都附可以直接複製的片段。

### 特徵 1｜編號分格連環，零留白，Z 字讀序

畫面被 3–5px 的實黑切成有編號的格子；**沒有主視覺**；每格一件事；最後一格是行動。

```css
.win{display:grid;grid-template-columns:repeat(4,1fr);gap:3px;background:#1A1714;border:5px solid #1A1714}
.pn{background:#C7BFA6;position:relative}
.pn::before{content:attr(data-n);position:absolute;left:0;top:0;z-index:3;
  background:#1A1714;color:#C7BFA6;font-family:"Archivo Black";font-size:12px;padding:5px 7px 6px;line-height:1}
```

### 特徵 2｜模板剪影：只有紙與洞，邊是刀口，轉角一律 45° 斜切

沒有描邊線、沒有中間調、沒有曲線收尾。輪廓由格子聯集產生，**每一個轉角被切掉一刀**（chamfer 0.5 單位），
再加 ±0.05 單位的決定性抖動＝手刻的不直。禁用 `stroke-linecap:round`。

```js
// 把格子聯集轉成刀口多邊形：每個轉角以 45° 切掉，再抖動
function knife(loop,rand,cham=0.5,jit=0.05){
  const n=loop.length,o=[];
  for(let i=0;i<n;i++){
    const a=loop[(i-1+n)%n],b=loop[i],c=loop[(i+1)%n];
    const la=Math.hypot(b[0]-a[0],b[1]-a[1]),lc=Math.hypot(c[0]-b[0],c[1]-b[1]);
    const ka=Math.min(cham,la*0.42),kc=Math.min(cham,lc*0.42);
    o.push([b[0]+(a[0]-b[0])/la*ka+(rand()-.5)*jit, b[1]+(a[1]-b[1])/la*ka+(rand()-.5)*jit],
           [b[0]+(c[0]-b[0])/lc*kc+(rand()-.5)*jit, b[1]+(c[1]-b[1])/lc*kc+(rand()-.5)*jit]);
  }
  return o;   // → 'M…L…Z'
}
```

### 特徵 3｜兩塊版：一色一張、固定套印偏移、相疊必 multiply

一張圖恆分成兩組：**墨版**與**專色版**。兩者永遠帶固定的錯位（約 0.13 單位／2px），
相疊處以 `multiply` 落成暖黑。誰上紅、誰上黑由語意決定：火與行動上紅，其餘上黑，指向帶取相反色。

```css
.pk,.pr{transition:transform .09s steps(2)}
.pr{mix-blend-mode:multiply;transform:translate(.13px,-.15px)}   /* 套印偏移 */
.pn:hover .pk{transform:translate(-1.6px, 1.2px)}                /* hover 分版：看見兩張版 */
.pn:hover .pr{transform:translate( 1.9px,-2.1px)}
```

### 特徵 4｜格底韻文帶：兩行、押韻、被格寬擠壓

字塞滿整條帶，所以**字寬由格子決定**。窄格的字被水平壓扁，寬格的字放鬆。
用 `scaleX()` 而不是換字級——這個流派的字是刻的，刻歪了就是扁的。

```css
.cap span{display:block;font-weight:900;font-size:clamp(12px,1.35vw,16px);line-height:1.34;
  letter-spacing:.04em;white-space:nowrap;
  transform:scaleX(var(--sq,1));transform-origin:left center}   /* 4 欄 1、3 欄 .92、2 欄 .84 */
.pt{font-size:11px;font-weight:900;letter-spacing:.22em;border-bottom:2px solid var(--red)}
@media(max-width:560px){.cap span{white-space:normal}}
```

### 特徵 5｜橋：留下來的紙必須連著邊框

**這是最容易漏掉、也最決定像不像的一條。** 任何被洞包圍而沒接回外框的紙都會掉。
做法：對「未刻的格子」跑一次四連通分量，任何一團沒碰到卡紙四邊的就是島。

```js
// g[i]=1 表示已刻掉（透墨）。回傳所有「會掉的島」。
function islands(g,W,H){
  const lab=new Int32Array(W*H).fill(-1),comps=[],st=[];
  for(let i=0;i<W*H;i++){
    if(g[i]||lab[i]>=0)continue;
    const id=comps.length,cells=[];let touch=false;st.length=0;st.push(i);lab[i]=id;
    while(st.length){
      const p=st.pop(),px=p%W,py=(p-px)/W;cells.push(p);
      if(px===0||py===0||px===W-1||py===H-1)touch=true;
      for(const n of [px>0&&p-1,px<W-1&&p+1,py>0&&p-W,py<H-1&&p+W])
        if(n!==false&&!g[n]&&lab[n]<0){lab[n]=id;st.push(n);}
    }
    comps.push({cells,anchored:touch});
  }
  return comps.filter(c=>!c.anchored);   // 這些會掉出來
}
```

**沒有這一步的話**，你畫出來的「模板風」圖會是一堆完好的環與封閉字腔——看起來乾淨，但一個做過模板的人一眼就知道那印不出來。
留橋的做法：從島出發、在已刻區域內走最短路到外框或到已錨定的紙，把路徑補回紙。橋寬 1 格，**而且橋會被印出來**。

---

## 六、元件配方

**導覽 `stencil-rack` 模板架**：桌機右上一條墨色橫桿掛四張卡紙（62×84px 墨色矩形），
現用頁那一張**被抽出來並且透光**——卡面上出現該頁的剪影，填紙色（那是光從割掉的洞透過來）。
其餘三張是沒抽出來的實色卡紙背面。hover 拉出 9px。≤900px 攤為四格橫列。

```css
.card .cd{width:62px;height:84px;background:var(--ink);position:relative;overflow:hidden}
.card .cd svg{position:absolute;inset:7px 9px;opacity:0}
.card[aria-current]{transform:translateY(26px) rotate(-2.4deg)}
.card[aria-current] .cd svg{opacity:1}
.card[aria-current] .cd svg path{fill:var(--paper)}   /* 透光 */
.card[aria-current] .lb{background:var(--red);color:var(--paper)}
```

**按鈕**：無圓角、實心位移陰影、按下時位移吃掉陰影。
```css
.btn{background:var(--ink);color:var(--paper);border:0;padding:9px 16px;font-weight:900;letter-spacing:.08em;
     box-shadow:5px 5px 0 var(--red2);transition:box-shadow .09s steps(2),transform .09s steps(2)}
.btn:hover{background:var(--red);box-shadow:2px 2px 0 var(--ink);transform:translate(3px,3px)}
```

**表格**：2px 墨線、表頭反白、`letter-spacing:.13em`、無斑馬紋。
**表單**：欄位底 `--pap2`、2px 墨框、focus 用 3px 紅 outline。錯誤訊息是**滿版紅底白字的一條**，不是紅色小字。
**卡片牆**：`gap:3px` + 墨色底 = 黑線分格，永遠不是圓角卡片加陰影。
**頁尾**：`--night` 底、紅色小標、紙色文字。

---

## 七、動效規則

四種性質不同、觸發源不同，缺一不可；四種都要 `prefers-reduced-motion` 降級且資訊零損失。
**共同語法：所有轉場一律 `steps()`，沒有一條 ease 曲線。** 手在動，不是動畫在播。

| 種類 | 名稱 | 觸發 | duration / easing | 降級 |
|---|---|---|---|---|
| ambient | 玻璃反光帶 | 無（26s 循環） | `26s linear infinite`，`mix-blend-mode:screen` 的斜向亮帶掃過櫥窗 | 停在定點 |
| input | 分版錯開 | hover 任一格 | `.09s steps(2)`，墨版與紅版往相反方向各位移 2px（<100ms） | `transition-duration:.001ms`，狀態仍成立 |
| input | 刀口與落島即時重算 | pointer / 方向鍵 | 每次重繪 **0.227ms**（20×22 格，含連通分量） | 無動畫，讀數照常更新 |
| transition | 落格 `panel drop-in` | 進頁 | `.34s steps(3)`，每格由上方 11px 硬落卡進黑框，依 Z 讀序 stagger 45ms | `animation:none` |
| **signature** | **落島上墨 `island-drop`** | 按「上墨」 | 每座島 `.62s steps(6)` 落出畫面並旋 14°，stagger 90ms，之後畫面重繪為「島掉完之後」的樣子 | 不播動畫，直接顯示同一個結果 |

```css
@keyframes glass{0%{transform:translateX(-62%)}100%{transform:translateX(62%)}}
.pane::after{background:linear-gradient(101deg,transparent 34%,rgba(255,255,255,.42) 40%,transparent 52%);
  mix-blend-mode:screen;animation:glass 26s linear infinite}
@keyframes drop{from{transform:translateY(-11px);opacity:0}to{transform:none;opacity:1}}
.pn{animation:drop .34s steps(3) both;animation-delay:calc(var(--i,0)*45ms)}
@keyframes fall{to{transform:translateY(30px) rotate(14deg);opacity:0}}
.falling path{animation:fall .62s steps(6) forwards}
@media(prefers-reduced-motion:reduce){.pane::after,.pn,.falling path{animation:none}}
```

**明文禁用**：淡入式滾動揭示、視差、數字滾動計數、跑馬燈／ticker、`stroke-dashoffset` 描繪、任何 `ease-in-out`。
（最後一項是本流派與所有「手繪線條動畫」的分野：模板是壓上去的，不是描出來的。）

---

## 八、插畫與圖像風格 `stencil-cut silhouette`

**全站零外部圖片。所有圖像由同一支引擎輸出，而且每一張都必須能回答「這張紙撐不撐得住自己」。**

原語只有三種：

1. **剪影**＝格陣的洞聯集，經刀口倒角與抖動；帶橋；轉角 45°；沒有一條曲線。
2. **指向帶**＝右緣三枚楔形箭頭（指向下一格）＋底邊一條熱線；恆取主體的相反色。
3. **記號**＝實心方塊（格號、印記、統計條），只有直角。

判準：**拿掉全部顏色，仍讀得出哪一塊是紙、哪一塊是被刻掉的洞。**

形狀怎麼定義：不要手繪 path，用一組疊加／挖除的幾何述詞（多邊形／圓／粗線）光柵化到 20×22 的格陣，
再由格陣生輪廓。這樣同一份定義可以同時給「顯示」與「刻窗遊戲」用，而且島與橋是算出來的、不是畫出來的。

```js
// ops 依序疊加；sub:true 為挖除。20×22 格，格心取樣。
const ops=[{t:'p',v:[[1.8,6.2],[18.2,6.2],[18.2,8.2],[1.8,8.2]]},        // 鍋緣
           {t:'p',v:[[3,8.2],[17,8.2],[15.2,16.6],[4.8,16.6]]},          // 鍋身
           {t:'p',v:[[0.2,8.6],[3.4,8.6],[3.4,13.6],[0.2,13.6]]},        // 左耳外
           {t:'p',v:[[1,9.8],[2.8,9.8],[2.8,12.4],[1,12.4]],sub:true}];  // 左耳孔 → 島
```

**禁用**：`feTurbulence` 手抖濾鏡（那是迷幻海報的語彙）、半調網點、細線幾何線描、等角視圖、寫實描繪、任何漸層。

---

## 九、Logo 與 Favicon

**Logo**＝這個風格的縮影：一個 2×2 的格陣，四格各放一枚剪影，其中兩格是專色。
右邊配 900 字重的漢字字標，字標上方一條 5px 墨線、下方一條 4px 紅線。不要做圖案化的圖徽。

**Favicon**（原創 inline SVG data URI，寫在 `<head>`）：把 logo 收成一個 2×2 格，左上一格填紅。
32×32 下唯一還讀得出來的就是「格子」與「一格是紅的」——那正好是這個風格的最小單位。

```html
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%23C7BFA6'/%3E%3Crect x='2' y='2' width='28' height='28' fill='%231A1714'/%3E%3Crect x='4.5' y='4.5' width='10.5' height='10.5' fill='%23D2231F'/%3E%3Crect x='17' y='4.5' width='10.5' height='10.5' fill='%23C7BFA6'/%3E%3Crect x='4.5' y='17' width='10.5' height='10.5' fill='%23C7BFA6'/%3E%3Crect x='17' y='17' width='10.5' height='10.5' fill='%23C7BFA6'/%3E%3C/svg%3E">
```

---

## 十、文案

- 兩行、押韻、第二行比第一行短。
- 口語，不用公文的字。允許方言詞（台語的「莫」「愈…愈…」），因為這個流派的讀者是街上的人。
- 具體到近乎瑣碎：門牌、電話、幾點換、誰刻的、刀片一扇窗換幾片。抽象的句子在這個風格裡讀起來像謊話。
- **禁止**：「EST. 19xx」徽章、「把 X 變成 Y」句式、「在當今快節奏的世界」、Lorem ipsum、emoji。

---

## 十一、Do & Don't

**Do**
- 先決定格數（4／6／8／12），再決定內容——格子是骨架不是容器。
- 每一格問一次「這一格在動什麼、它指向哪裡」。
- 每一張圖跑一次連通分量，該留橋就留橋，橋要看得見。
- 紅色只給火與行動；正文一律墨色。
- 所有轉場用 `steps()`。

**Don't**
- ❌ 不要做 hero。這個風格沒有 hero。
- ❌ 不要加第三個顏色。加了就要能說出它為什麼值得多刻一張版。
- ❌ 不要用圓角、模糊陰影、漸層、玻璃擬態。
- ❌ 不要把剪影畫得太完整——沒有缺口的模板圖是印不出來的。
- ❌ 不要用細線描邊去「補救」看不懂的剪影。看不懂就換一個姿勢，不要加線。
- ❌ 不要用跑馬燈。這個流派的動是「一格一格出現」，不是「一直跑」。
- ❌ 不要鋪紙張材質圖或 grain 濾鏡。

---

## 十二、頁面骨架範例（可直接使用）

```html
<div class="wrap">
  <nav class="rack" aria-label="模板架導覽">
    <a class="card" href="index.html" aria-current="page">
      <span class="cd"><svg viewBox="0 0 20 22"><path d="…"/></svg></span>
      <span class="lb">今晚的窗</span></a>
    <!-- …三張 -->
  </nav>

  <div class="pane"><div class="paneIn">
    <div class="hangbar"></div>
    <p>第 <span class="num">214</span> 號窗　〈灶上無人〉　版 3 張／過紙 3 次／格 8</p>

    <div class="win" style="--cols:4">
      <figure class="pn" style="--i:0"><span class="pno">1</span>
        <div class="art">
          <svg class="pl" viewBox="0 0 20 22" aria-hidden="true">
            <g class="pk"><path d="…指向帶…" fill="var(--ink)"/></g>
            <g class="pr"><path d="…剪影…"   fill="var(--red)"/></g>
          </svg>
        </div>
        <figcaption class="cap" style="--sq:1">
          <b class="pt">灶火</b>
          <span>灶下火舌吐得長</span><span>人在鍋邊才安當</span>
        </figcaption>
      </figure>
      <!-- …七格 -->
    </div>

    <div class="decal">
      <div><b>值班室</b><span class="num">07-521-4478</span></div>
      <!-- …三條 -->
    </div>
  </div></div>

  <section>
    <div class="hd"><h2>窗規六條</h2><span class="en">SIX RULES</span></div>
    <ol class="rulelist"><li><span class="n">一</span><div><h3>…</h3><p>…</p></div></li></ol>
  </section>
</div>
<footer>…</footer>
```

---

## 十三、技術實作與相容性

本站的視覺由三項技術承載，分屬 A 渲染／B 動效／E 資料生成三層。

### 1. `<feMorphology>`（A 渲染層）— 套印擴縮與刀口肥瘦

**承載**：特徵 3 的套印補漏（trapping）與特徵 2 的刀口。
真實的模板套印一定對不準，因此下面那塊版要**稍微肥一點**去墊住縫；刀口則要**稍微瘦一點**才有割過的銳利。
`operator="dilate"` 與 `operator="erode"` 就是這兩件事，而且它是幾何形態學運算，不會像 blur 那樣糊掉邊。

```html
<svg width="0" height="0"><filter id="trap" color-interpolation-filters="sRGB">
  <feMorphology operator="dilate" radius="0.35"/></filter></svg>
<style>.pr{filter:url(#trap)}   /* 紅版肥 0.35 去墊住套印縫 */</style>
```

**支援度（2026-08-26 查證 MDN《\<feMorphology\>》頁面）**：
標示為 **Baseline Widely available**，「已跨瀏覽器可用，起自 2015 年 7 月」。
caniuse 另有 `mdn-svg_elements_femorphology`、`…_radius`、`…_html_elements` 三個獨立條目。
註記：濾鏡預設在 `linearRGB` 色空間運算，要在 sRGB 得到預期結果須顯式寫 `color-interpolation-filters="sRGB"`。

**Fallback**：不支援時整個 `filter` 被忽略，兩塊版仍在、套印偏移仍在（那是 `transform` 做的，不是濾鏡做的），
只是少了 0.35 單位的墊墨。**資訊零損失**，畫面差異肉眼幾乎不可見——這是刻意的設計：
把濾鏡放在「錦上添花」的位置，主要視覺由幾何承擔。

### 2. `steps()` 逐格時間函數（B 動效與時間軸層）— 全站唯一的緩動

**承載**：簽名動效「落島上墨」、轉場「落格」、輸入回饋「分版錯開」。
這個流派的所有動作都是**手的動作**：刷子一次過紙、卡紙一次落下、島一次掉出去。
連續的 `ease-in-out` 會把它變成 App 動畫。因此全站沒有一條貝茲曲線，只有 `steps(2)`／`steps(3)`／`steps(6)`。

```css
.falling path{animation:fall .62s steps(6) forwards}
@keyframes fall{to{transform:translateY(30px) rotate(14deg);opacity:0}}
```

**支援度（2026-08-26 查證 MDN《\<easing-function\>》與《CSS easing functions》）**：
`<easing-function>`（含 `steps()`）標示為 **Baseline Widely available**，「已跨瀏覽器可用，起自 2015 年 7 月」。
**Fallback**：無支援缺口。極舊環境退回 `linear`，動作仍完成、結果完全相同。
`prefers-reduced-motion` 下四種動效全部停用，落島直接以最終畫面呈現，**資訊零損失**。

### 3. 四連通分量（union/flood-fill 圖論，E 資料與生成層）— 島與橋

**承載**：特徵 5 的全部，以及核心功能的唯一規則。純 JavaScript，無瀏覽器 API 依賴，因此**沒有相容性問題**。
自動留橋＝以島為起點、在已刻區域上做 BFS 最短路，走到外框或走到已錨定的紙，把路徑補回紙。

**效能實測（Node 22，20×22＝440 格）**：
一次「完整重繪＋連通分量」＝ 68ms / 300 次 = **0.227ms**。
拖曳時每個 `pointermove` 只做一次，遠低於 16.7ms 的每幀預算與 100ms 的輸入回饋門檻，且不觸發 layout。
決定性偽亂數用 FNV-1a → mulberry32，同一張卡紙恆得同一組刀口抖動，因此 `?w=` 分享碼可完整還原。

### 效能預算實測

| 頁 | 大小（含 inline 全部資源） | 預算 |
|---|---|---|
| `index.html` | 51.0 KB | ≤350 KB ✅ |
| `khik.html` | 74.9 KB | ✅ |
| `thangkhoo.html` | 78.6 KB | ✅ |
| `huntui.html` | 47.3 KB | ✅ |

外部資源只有 Google Fonts 兩支字體。零外部圖片、零音檔、零 JS 函式庫。
首屏 JavaScript：`index.html` 與 `thangkhoo.html` **完全不需要 JavaScript**（所有圖像在建置階段已烘成靜態 SVG）；
`khik.html` 首屏只跑一次 `draw()`（0.227ms）＋格線一次生成。

### 無 JavaScript 的行為

- `index.html`／`thangkhoo.html`：完整。所有窗、縮圖、表格皆為靜態 SVG 與 HTML 文字。
- `khik.html`：刻窗台不可用，但同一頁的「橋是什麼」三張對照圖（原稿／掉島後／留橋）與十六枚庫存剪影表
  都是靜態的，功能想講的事完整讀得到，並有 `<noscript>` 明說。
- `huntui.html`：表單的當場驗算不可用，`<noscript>` 直接把三條會擋人的規定寫成文字並附電話。

