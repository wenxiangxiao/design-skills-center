---
name: rosta-window-stencil
description: Soviet ROSTA Windows (1919–21) hand-cut stencil agitprop — numbered multi-panel sequences, one plate per colour, pictogram figures, and the mandatory bridges that hold every counter in place.
---

# 蘇聯 ROSTA 窗（Окна РОСТА）風格規格書

> 依這份文件做出來的網站，任何懂設計的人遮掉全部文字都應該在三秒內說出「這是 ROSTA 窗／模版絹印的東西」。
> 做不到就是特徵不夠，不是引擎不夠。

---

## 一、設計哲學

1919 年 2 月，畫家 Mikhail Cheremnykh 與記者 Nikolai Ivanov 在莫斯科一間倒閉糖果店的空櫥窗裡貼出第一張「俄羅斯電報通訊社之窗」。幾個禮拜後詩人 Vladimir Mayakovsky 加入，此後三年間這個集體產出了數千張手切模版海報，貼在莫斯科的櫥窗、車站與牆上。Mayakovsky 自稱經手三千張草圖與六千條標語。

這個流派的每一個視覺特徵都是被三件事逼出來的，做這個風格就是重演這三件事：

**一、沒有印刷廠。** 內戰時期紙張與油墨短缺、印刷機停擺，所以他們改用模版（трафарет，源自法國 pochoir 手繪套色傳統）——把紙板挖空、噴色、換下一塊版。刻版師傅第一天做二十五張、第二天五十張，幾天內做完一版約三百份。**一個顏色一塊版，一塊版刷一次。**所以畫面上不可能有漸層、不可能有中間調、不可能有柔邊陰影：那些東西在紙板上切不出來。

**二、沒有時間。** 前線捷報從電報房送來到彩色海報貼上牆，據 Mayakovsky 記載可以只花四十分鐘到一小時。這個速度只能用最簡的形狀語彙撐住：直邊、正圓、剪影、沒有細節。

**三、看的人多半不識字。** 於是這個集體發展出一整套可重複使用的圖形詞彙——同一件事永遠用同一塊版，紅軍是尖頂盔、資本家是高帽圓肚、工人是方肩。這套象形詞彙後來直接影響 Otto Neurath 與 Gerd Arntz 的 ISOTYPE，是今天所有公共標誌與資訊圖表的祖先。

因此本風格的核心不是「復古蘇聯感」，是**製造限制被誠實地留在畫面上**。最能代表它的不是紅色，是那幾條橫過輪圈與窗框的白線——那是橋，是紙板不會散掉的唯一理由。**把橋修掉、把邊緣磨圓、加一層陰影，這個風格就死了。**

---

## 二、本風格的 5 個不可省略特徵

### 特徵 1｜多格連環的窗：4–14 格，順序即論證

ROSTA 一張窗是四到十四格的敘事序列，編號、依序讀、每格是一個完整的場景，末格通常是結論或行動指令。**單格不成立**——拆開來看每一格都不完整，這是它和「海報」的根本差別。全部的格共用同一組刻在紙板上的行格：格號帶、圖區、詞帶、資訊帶四條列，六格之間逐列對齊。

```css
/* 整面窗共用一組列軌，六格的四條帶逐列對齊（subgrid 的正確用途） */
.panes{
  display:grid;
  grid-template-columns:repeat(3,1fr);
  grid-template-rows:repeat(2, auto auto auto auto); /* 兩排 × 四條帶 */
  gap:0;
}
.pane{
  grid-row:span 4;
  display:grid;
  grid-template-rows:subgrid;      /* 每格的四條帶落在父格的列軌上 */
  border:4px solid var(--ink);      /* 相鄰格＝8px 粗墨框 */
  background:var(--sheet);
}
@supports not (grid-template-rows:subgrid){
  .pane{grid-template-rows:44px 1fr auto auto}   /* 退回固定列高，仍然齊 */
}
```

**判準**：把第三格的詞加長兩個字，第一格與第二格的資訊帶必須跟著往下對齊。做不到就不是這個特徵。

### 特徵 2｜模版可切性的形狀語彙，以及強制的橋

所有形狀必須是**能從一張紙板上切下來、而且切完紙板不會散掉**的形狀：直邊多邊形、45° 倒角、圓只用正圓、無細節、無細線。任何被墨完全包起來的紙板（輪圈中心、窗框內側、章面、字母 O 的中心）都是**落料**——抽版時會整片掉下來，而它留下的洞不會變成空白，會變成一團實心的墨。所以每一個內孔都必須留一根**橋**接回外框。

判定落料的方式就是平面連通性：從紙板四邊灌水，灌不到的紙板團就是會掉的。

```js
/* 落料裁決：4-連通 flood fill。ink=1 表示已挖掉（漏墨） */
function orphans(ink,W,H){
  const seen=new Uint8Array(W*H), st=[];
  for(let x=0;x<W;x++){st.push(x);st.push((H-1)*W+x);}
  for(let y=0;y<H;y++){st.push(y*W);st.push(y*W+W-1);}
  while(st.length){const i=st.pop(); if(seen[i]||ink[i])continue; seen[i]=1;
    const x=i%W,y=(i-x)/W;
    if(x>0)st.push(i-1); if(x<W-1)st.push(i+1);
    if(y>0)st.push(i-W); if(y<H-1)st.push(i+W);}
  const out=[]; for(let i=0;i<W*H;i++) if(!ink[i]&&!seen[i]) out.push(i); // 這些會掉下來
  return out;
}
```

45° 倒角是刀的物理事實：刀是直的，轉角一定切掉一小塊。輪廓的每一個角都要倒。

```js
/* 每個轉角往兩邊各退 c，得到刀切的斜角（c 取格寬的 0.22–0.28） */
function chamfer(loop,c){const n=loop.length,o=[];
  for(let i=0;i<n;i++){const p=loop[(i-1+n)%n],v=loop[i],q=loop[(i+1)%n];
    const l1=Math.hypot(v[0]-p[0],v[1]-p[1]), l2=Math.hypot(q[0]-v[0],q[1]-v[1]);
    const c1=Math.min(c,l1*.42), c2=Math.min(c,l2*.42);
    o.push([v[0]+(p[0]-v[0])/l1*c1, v[1]+(p[1]-v[1])/l1*c1]);
    o.push([v[0]+(q[0]-v[0])/l2*c2, v[1]+(q[1]-v[1])/l2*c2]);}
  return o;}
```

**判準**：畫面上找不到任何一條曲線（正圓除外）、找不到任何一個 border-radius、而且每一個內孔都看得見一條白色的橋。

### 特徵 3｜一色一版：色域不相交，重疊處只能是套印錯位

三到四塊專色，**每塊是一次獨立的刷色**，因此色域彼此不重疊。畫面上唯一允許的顏色重疊，是手工套印必然的錯位——一到三像素的偏移，而且每一張偏得不一樣。紙是第四塊色，不是背景。

```css
@property --rx{syntax:"<length>";inherits:true;initial-value:0px}
@property --ry{syntax:"<length>";inherits:true;initial-value:0px}
@keyframes reg{0%{--rx:0px;--ry:0px}33%{--rx:2px;--ry:-1px}66%{--rx:-1px;--ry:2px}100%{--rx:0px;--ry:0px}}
body{animation:reg 13s steps(1,end) infinite}   /* steps：套印是跳的，不是滑的 */
.rplate{transform:translate(var(--rx),var(--ry))}
/* 紙上的每一張紙，背後都壓著一塊偏掉的紅版 */
.sheet{position:relative;background:var(--sheet);border:3px solid var(--ink)}
.sheet::before{content:"";position:absolute;inset:0;z-index:-1;
  border:3px solid var(--red);transform:translate(var(--rx),var(--ry))}
```

顏料從模版底下鑽出去一點點，是這個工法的另一個必然。用 `feMorphology dilate` 做，不要用 blur：

```html
<filter id="bleed" color-interpolation-filters="sRGB">
  <feMorphology operator="dilate" radius="0.7" in="SourceGraphic" result="fat"/>
  <feComposite in="fat" in2="SourceGraphic" operator="over"/>
</filter>
```

**判準**：把 `--rx/--ry` 固定成 0，畫面應該變得「太乾淨」。如果看不出差別，代表你根本沒有分版。

### 特徵 4｜象形化的重複角色型：大小＝重要性，不是透視

人與物一律化約成剪影 pictogram（Mayakovsky 本人的畫法最極端，接近符號）。同一個角色在不同格裡是**一模一樣的**——因為那真的是同一塊版。體型大小表達重要性，不表達遠近；畫面上沒有地平線、沒有消失點、沒有陰影，角色站在一條色帶上。

```html
<!-- 每格的圖區：色帶 + 剪影。剪影的 path 全站共用同一份資料 -->
<svg viewBox="0 0 234 288" role="img" aria-label="機車">
  <rect class="rplate" x="0" y="242" width="234" height="46" fill="var(--green)"/>
  <path d="…" fill="var(--ink)" fill-rule="evenodd" filter="url(#bleed)"/>
</svg>
```

維護一張**字符表**：每個母題一塊版、一個名字、一個首用日期、一組適用語境。網站的每一張圖都只能從這張表裡出。

**判準**：同一個角色出現在兩個地方，兩處的 path 資料必須是同一份；不同就是畫的，不是刻的。

### 特徵 5｜韻文口號壓在圖上：兩行一韻，字距不均，基線微歪

字是圖的一部分，不是說明文字。粗黑、短句、兩行押韻、每行字數相同。字距不均、基線微歪，因為那是手寫上去再切出來的。整格反白（圖地互換）是這個流派最有力的重音——一面窗裡放一到兩格就夠。

```js
/* 手刻字：每個字的角度與基線由字碼決定，同一個字永遠歪同一個角度 */
function handset(s){return [...s].map((c,i)=>{
  const h=(s.charCodeAt(i)*37+i*89)%100;
  const rot=((h%7)-3)*0.55, ty=((h%5)-2)*0.55;
  return `<span style="display:inline-block;transform:rotate(${rot.toFixed(2)}deg) translateY(${ty.toFixed(2)}px)">${c}</span>`;
}).join('');}
```

```css
.p-rh{font-weight:900;font-size:clamp(17px,2.05vw,21px);line-height:1.42;letter-spacing:.04em}
.p-rh .l2{display:inline-block;border-bottom:5px solid var(--pl);padding-bottom:1px} /* 第二行壓第二塊版 */
/* 反白格：整格圖區換成墨地，剪影改用紙色 */
.pane.rev .p-img{padding:0;background:var(--ink)}
.pane.rev .p-img path{fill:var(--sheet)}
```

**判準**：把 handset 拿掉，字排得整整齊齊——如果看起來「比較好」，代表你做的是海報排版，不是手刻窗。

---

## 三、色彩系統

| 色票 | 名稱 | 角色 | 面積 |
|---|---|---|---|
| `#D6C7A4` | 包裝紙 paper | 第四塊色。全站地色，不是背景——它是印刷品的一部分 | 約 34% |
| `#17140E` | 墨版 ink | 全部框線、正文、剪影主體、頁尾 | 約 26% |
| `#CB2A18` | 紅版 red | 窗楣、現用態、動作、拒絕、色帶 | 約 24% |
| `#3E6440` | 綠版 green | 第三塊版。分類標籤、次要色帶、標題小字 | ≤ 8% |
| `#E5D8BA` | 紙 sheet | 貼上去的紙（所有長文一律在紙上） | 約 6% |
| `#F2ECDA` | 標籤紙 white | 資訊帶、表格底、反白剪影 | 約 4% |

**硬規則**

- 顏色數上限四塊版加紙。第五個顏色代表你要多刷一次，不准。
- 零漸層：不得有任何顏色插值。硬停點的 `repeating-linear-gradient`（例如漿糊痕、膠帶條紋）不算漸層——那是同一塊版上的等距切口，色與色之間沒有過渡；只要出現一格軟過渡就是違規。零模糊陰影（`box-shadow` 只能是實心位移色塊，或乾脆不要）、零 `border-radius`、零半透明疊色。
- 中間調不存在。需要「淺一點的紅」時，答案是留白讓紙露出來，不是降不透明度。
- 兩塊色域不得重疊；唯一的例外是 `--rx/--ry` 造成的一到三像素套印錯位。
- 紅與綠不得直接相鄰於同一條邊界，中間必須隔墨或隔紙（它們是兩塊不同的版）。

---

## 四、字體系統

| 用途 | 字體 | 字重 | 字級 | 其他 |
|---|---|---|---|---|
| 韻文口號 | Noto Sans TC | 900 | `clamp(17px,2.05vw,21px)` | `letter-spacing:.04em`，逐字 handset 微歪 |
| 標題 | Noto Sans TC | 900 | 19–27px | `letter-spacing:.04–.10em`，`line-height:1.18` |
| 數字與拉丁 | Anton | 400 | 12–27px | 只給編號、金額、代號；不用等寬字 |
| 正文 | Noto Sans TC | 500 | 15px | `line-height:1.85` |
| 標籤 | Noto Sans TC | 900 | 11–12.5px | `letter-spacing:.2–.28em`，綠版色 |

**禁止**：任何襯線體、任何等寬體、任何手寫體字型、任何細字重（<500）。這個流派沒有「優雅」這個選項。

---

## 五、版面與網格

- **窗**：外框 `border:9px solid var(--ink)`，上緣壓一條紅墨交替的膠帶（`repeating-linear-gradient(90deg, red 0 26px, ink 26px 44px)`）。
- **格**：桌機 3 欄 × 2 排；≤900px 2 欄 × 3 排；≤560px 1 欄 × 6 排。格數必須落在 4–14。
- **格內四條帶**（固定順序，由 subgrid 對齊）：
  1. 格號帶：墨底、紙字、左端一個 28×28 的色塊裝編號
  2. 圖區：剪影 + 色帶，圖必須佔整格高度的一半以上
  3. 詞帶：兩行韻文，第二行壓色底線
  4. 資訊帶：上緣 3px 墨線，白底，12.6px 實務細節
- **留白**：本流派不是滿版填隙也不是留白派。規則是**每一格內部必須有一塊完整的空紙**（圖與詞之間），但格與格之間不留縫（框線直接相接）。
- **旋轉**：只有覆貼的紙條可以歪，角度限 ±1.5°；圖與字永不旋轉（模版是平的）。
- **對齊**：所有元素對齊到 1 格寬的模數（本範例站 grid 為 26×32 格，格寬 9–13px）。

---

## 六、元件配方

```css
/* 覆貼導覽 paste-over：現用頁是最新貼上去的那一張，蓋住別人 */
.slip{position:relative;background:var(--sheet);border:3px solid var(--ink);border-bottom-width:5px;
  padding:8px 15px 7px;margin-right:-17px;font-weight:900;letter-spacing:.1em;
  transform:rotate(-1.1deg);transform-origin:left bottom;z-index:1;
  transition:transform .09s steps(2,end)}
.slip:hover{background:var(--white);transform:rotate(0) translateY(-3px)}
.slip[aria-current="page"]{z-index:9;background:var(--red);color:var(--white);
  transform:rotate(0);padding-top:13px;margin-top:-5px}
.slip[aria-current="page"]::before{content:"";position:absolute;left:0;right:0;top:-5px;height:5px;
  background:repeating-linear-gradient(90deg,var(--ink) 0 7px,transparent 7px 13px)} /* 還沒乾的漿糊 */

/* 按鈕：直角、無陰影、切換是跳的不是滑的 */
button{font-weight:900;letter-spacing:.1em;color:var(--ink);background:var(--sheet);
  border:3px solid var(--ink);padding:9px 17px;border-radius:0;
  transition:background .08s steps(1,end),color .08s steps(1,end)}
button:hover{background:var(--red);color:var(--white)}
button.on{background:var(--ink);color:var(--paper)}
button:disabled{background:transparent;color:#8a7f66;border-color:#8a7f66}

/* 表格：表頭是一條實心墨帶 */
table{border-collapse:collapse;width:100%;background:var(--white)}
th{background:var(--ink);color:var(--paper);text-align:left;font-weight:900;letter-spacing:.08em;padding:8px 11px}
td{border-bottom:2px solid var(--ink);padding:8px 11px}
td.n{font-family:"Anton",sans-serif;color:var(--red)}

/* 表單：欄位是挖出來的方孔 */
input,select,textarea{border:3px solid var(--ink);background:var(--white);border-radius:0;padding:8px 10px}
label{font-size:12px;letter-spacing:.2em;font-weight:900;color:var(--green)}
.err{background:var(--red);color:var(--white);border:3px solid var(--ink);padding:11px 13px}

/* 頁尾：整塊墨版，上緣一條紅 */
footer{background:var(--ink);color:var(--paper);border-top:6px solid var(--red);padding:30px 22px 40px}
```

---

## 七、動效規則

本風格的動作全部是**機械的**：steps() 而不是 ease，跳而不是滑。理由一樣——手工套印沒有中間狀態。

| 類別 | 內容 | 觸發 | 時值 | easing |
|---|---|---|---|---|
| ambient 環境 | 套印錯位漂移：`--rx/--ry` 在 0/+2−1/−1+2 之間跳，全站紅版與紙背後的紅框跟著偏 | 無，持續 | 13s 循環 | `steps(1,end)` |
| input 輸入 | 游標移到某一格 → 該格套印瞬間對準（`--rx:0`）、格號塊翻成紅版；模版房拖曳＝逐格切／補，每格 <16ms | hover／pointer | 80–90ms | `steps(1–2,end)` |
| transition 轉場 | 覆貼 paste-over：現用頁的紙條上移 5px、旋轉歸零、上緣長出未乾的漿糊痕 | 換頁／狀態切換 | 90ms | `steps(2,end)` |
| signature 簽名 | **落料補橋 bridge-drop**（見下） | 按「抽版」與每一次改動 | 420ms + 70ms 錯開 | `steps(6,end)` |

**簽名動效：落料補橋 bridge-drop**

抽版的瞬間，沒有被橋接住的紙板碎片**整片掉出畫面**，落進板子下面的落料槽；而它原本佔的位置在成品預覽上立刻變成一團實心的墨。這是本風格唯一的物理，也是它唯一的懲罰：**少切一根橋，得到的不是缺口，是反過來的一大塊。**

```css
@keyframes fall{to{transform:translateY(150px) rotate(9deg)}}
.drop{animation:fall .42s steps(6,end) forwards}   /* steps：紙片是一格一格掉的 */
@media (prefers-reduced-motion:reduce){ .drop{animation:none;opacity:0} }
```

**降級（四種全部）**：`prefers-reduced-motion:reduce` 時 —— ambient 錯位停在 0（畫面仍是完整的分版，只是每張都對得準）；input 的狀態切換仍然發生只是瞬間完成；轉場的紙條瞬間到位；落料碎片不飛，直接消失並照樣進落料槽清單。四者的**資訊零損失**：落料片數、格數、橋數、判詞全部照常顯示。

---

## 八、插畫與圖像風格

**技法名稱：stencil-cut silhouette（模版剪影）。** 全站零外部圖片、零寫實描繪。所有圖像由同一支引擎輸出，原語只有三種：

1. **可切的剪影**：形狀先定義成多邊形／正圓／矩形的布林組合，光柵化到 26×32 的刻版格上，再用邊界追蹤轉回輪廓、每個角倒 45°。輸出的是一條 `path`，不是一堆方格。
2. **橋**：對每一片落料跑一次 0-1 BFS（走紙板 0 成本、走墨 1 成本），把最短的那條路上的墨格改回紙板。橋寬一格，看得見。
3. **色帶**：剪影腳下的一條實色矩形，屬於第二塊版，跟著 `--rx/--ry` 錯位。

判準：**拿掉全部顏色，仍然讀得出哪幾條白線是橋。**

明文禁用：`feTurbulence`／`feDisplacementMap` 手抖濾鏡（那是迷幻海報的語彙）、半調網點、細線幾何線描、寫實描繪、任何外部圖檔、任何 emoji。

---

## 九、Logo 與 Favicon

**Logo**：一面窗的縮影——外框粗墨、十字分格、其中一格填紅版、一格填綠版、兩格各放一塊已補橋的剪影（一塊墨、一塊反白）。右側三條墨色橫塊加一條紅塊代表被遮住的字。整張只用四塊色，零文字，因此不依賴字型。

**Favicon**：同構降到 32×32，只保留：`2px` 墨外框、十字分格、左上紅塊、右下紅塊、右上一塊帶橋的墨剪影。以 inline SVG data URI 寫在 `<head>`，不使用 .ico。

```html
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%23D6C7A4'/%3E%3Crect x='2' y='2' width='28' height='28' fill='none' stroke='%2317140E' stroke-width='3'/%3E%3Crect x='16' y='2' width='3' height='28' fill='%2317140E'/%3E%3Crect x='2' y='16' width='28' height='3' fill='%2317140E'/%3E%3Crect x='5' y='5' width='11' height='11' fill='%23CB2A18'/%3E%3Crect x='21' y='6' width='7' height='9' fill='%2317140E'/%3E%3Crect x='23' y='8' width='5' height='2' fill='%23D6C7A4'/%3E%3Crect x='6' y='21' width='9' height='6' fill='%2317140E'/%3E%3Crect x='21' y='21' width='7' height='7' fill='%23CB2A18'/%3E%3C/svg%3E">
```

---

## 十、Do & Don't

**Do**

- 先決定「這一面窗要講幾件事」，再決定格數；格數決定版面，不是相反。
- 每一格都要能被單獨貼在電梯裡還看得懂，但六格連起來要有推論。
- 韻文自己寫。兩行、押韻、每行字數相同、講一件具體的事、有一個具體的後果。
- 維護字符表：同一件事永遠用同一塊版。
- 每一個內孔都補橋，而且讓橋看得見。
- 資訊帶要寫真的資訊：日期、金額、電話、時段、廠商名。這個流派是公告，不是裝飾。

**Don't**

- 不要 border-radius、不要有插值的漸層、不要模糊陰影、不要半透明、不要中間調。
- 不要用曲線畫東西（正圓例外）。不要細線描邊。
- 不要用蘇聯符號（鐮刀鎚子、紅星、西里爾假字）當裝飾——那是 cosplay，不是這個流派。這個流派的內容是**當地的、當週的、具體的**。
- 不要把橋修掉。不要為了「乾淨」把落料的洞留成白色——它是實心的墨。
- 不要用 `ease` 或 `cubic-bezier` 做狀態切換，一律 `steps()`。
- 不要 Lorem ipsum、不要 emoji、不要「在當今快節奏的世界」、不要「EST. 19xx」徽章、不要跑馬燈。
- 不要置中三張圓角卡片。不要紫藍漸層 hero。

---

## 十一、頁面骨架範例

```html
<body>
  <!-- 顏料從模版底下鑽出去的那一圈 -->
  <svg width="0" height="0" style="position:absolute" aria-hidden="true">
    <filter id="bleed" x="-8%" y="-8%" width="116%" height="116%" color-interpolation-filters="sRGB">
      <feMorphology operator="dilate" radius="0.7" in="SourceGraphic" result="fat"/>
      <feComposite in="fat" in2="SourceGraphic" operator="over"/>
    </filter>
  </svg>

  <header class="brow">          <!-- 窗楣：整條紅版，下緣 6px 墨線 -->
    <div class="mk">…logo…<h1>機構名稱</h1><div class="sub">分 隔 得 很 開 的 副 標</div></div>
    <div class="tel">地址<br>電話</div>
  </header>

  <nav class="paste">            <!-- 覆貼導覽：現用頁貼在最上面 -->
    <a class="slip" aria-current="page"><span class="n">01</span>本週的窗</a>
    <a class="slip"><span class="n">02</span>第二頁</a>
  </nav>

  <main class="wrap">
    <div class="wincap"><b>第 1143 號窗</b><span>刻版日期</span><span>三塊版・刷三次</span></div>

    <div class="win"><div class="panes">
      <article class="pane" style="--pl:var(--red)">
        <div class="p-no"><i>1</i>這一格在講什麼</div>
        <div class="p-img"><svg viewBox="0 0 234 288">
          <rect class="rplate" x="0" y="242" width="234" height="46" fill="var(--pl)"/>
          <path d="…" fill="var(--ink)" fill-rule="evenodd" filter="url(#bleed)"/></svg></div>
        <div class="p-rh"><div class="hd">上行七個字</div><b class="hd l2">下行押同韻</b></div>
        <div class="p-fx">日期、金額、電話、時段、廠商名——真的資訊。</div>
      </article>
      <!-- 其餘 3–13 格 -->
    </div></div>

    <section class="sheet">       <!-- 長文一律在紙上，紙背後壓一塊偏掉的紅版 -->
      <div class="kicker">小標籤</div><h2>標題</h2><p>內文</p>
    </section>
  </main>

  <footer>…整塊墨版…</footer>
</body>
```

---

## 十二、技術實作與相容性

本站以三項技術承載上述特徵，分屬 C 版面／A 渲染／E 資料三層。

### 12.1 CSS Grid `subgrid`（C 層）— 承載特徵 1

- **承載什麼**：六格的四條帶（格號／圖／詞／資訊）落在同一組列軌上。這件事媒體查詢與固定高度都做不到，因為列高必須由六格之中最高的那一條帶決定。
- **支援現況（2026-09-06 查證）**：Firefox 71（2019）首先支援，Safari 16.0（2022）跟進，Chrome／Edge 117 於 2023-09-12 支援；2023 年底成為 Baseline newly available，並於 **2026-03-15 升為 Baseline Widely available**，全球覆蓋 92% 以上。查證來源：MDN《Subgrid》（developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid_layout/Subgrid）、caniuse `css-subgrid`、web.dev《Baseline 2023》。
- **fallback**：`@supports not (grid-template-rows:subgrid){.pane{grid-template-rows:44px 1fr auto auto}}`。不支援時每格自行分配列高，六格之間仍是同一組欄、同樣的四條帶順序、同樣的框線，只是列高不再跨格對齊。**資訊零損失。**

### 12.2 SVG `feMorphology` + `feComposite`（A 層）— 承載特徵 3

- **承載什麼**：噴印時顏料從模版底下鑽出去的那一圈。`dilate` 把剪影胖 0.7 個使用者單位（在 190px 寬的圖上約 0.57px），再 `composite over` 原圖，得到硬邊的擴張而不是模糊的光暈——這正是這個工法與噴槍／印刷的差別。
- **為什麼不用 blur**：`feGaussianBlur` 會產生中間調，中間調在這個風格裡不存在。
- **支援現況（2026-09-06 查證）**：MDN《feMorphology》標示 **Baseline · Widely available**，自 2015 年 7 月起跨瀏覽器可用。註：預設在 linearRGB 色空間運算，本站明寫 `color-interpolation-filters="sRGB"` 以免顏色偏移。
- **fallback**：不支援時濾鏡整個被忽略，剪影仍以原尺寸實心填色顯示，版面、可讀性與分版關係完全不變。**資訊零損失。**

### 12.3 平面連通性求解：flood fill + 0-1 BFS 補橋（E 層｜圖論）— 承載特徵 2 與簽名動效

- **承載什麼**：判定紙板哪一塊會掉下來（4-連通 flood fill），以及最短的補橋路徑（以「要挖掉幾格墨」為代價的 0-1 BFS）。這支求解器同時是本站核心互動的裁決者、成品圖的產生器、以及回執印記的合格條件。
- **相容性**：純 JavaScript（`Uint8Array`／`Int32Array`／`Map`），無任何瀏覽器 API 依賴，`Uint8Array` 自 2013 年起全面可用。無支援缺口，因此不需要 fallback；建置階段以同一支程式輸出六塊「師傅的版」為靜態 inline SVG，**關掉 JavaScript 時首頁的六格、規約頁的字符表與模版房的示範版全部照常顯示**。
- **決定性**：不使用 `Math.random`；印記與版號一律走 FNV-1a → mulberry32，同輸入恆得同輸出，故 `?b=` 分享碼可完整還原。

### 12.4 效能實測（2026-09-06，Node 22 單執行緒／26×32＝832 格）

| 項目 | 實測 | 預算 | 結果 |
|---|---|---|---|
| 單次 `orphans()` + `pathOf()`（拖曳每改一格都跑） | 0.06–0.19 ms | — | 遠低於一幀 16.7ms |
| 六塊版的 `autoBridge()` 全解 | < 1 ms | — | 建置期即完成 |
| 單頁大小（含 inline CSS/JS/SVG，未壓縮） | index 30.9KB／模版房 40.5KB／規約 23.3KB／報修 24.6KB | ≤ 350KB | 通過 |
| 首屏 JS 執行 | 首頁僅一支讀 localStorage 的 IIFE；模版房首次 `render()` 為上表單次成本 | ≤ 100ms | 通過 |
| Layout thrashing | 拖曳期間只讀一次 `getBoundingClientRect()`，其餘全為字串組裝後單次 `innerHTML` | 無 | 通過 |

外部資源僅 Google Fonts（Noto Sans TC 500/900、Anton）；零外部圖片、零音檔、零 JavaScript 函式庫。

---

## 十三、參考

- Окна сатиры РОСТА（ROSTA Windows），俄羅斯電報通訊社，莫斯科，1919–1921
- Mikhail Cheremnykh／Nikolai Ivanov：1919 年 2 月，第一張窗，一間倒閉糖果店的櫥窗
- Vladimir Mayakovsky：自估三千張草圖、六千條標語；「街道是我們的筆刷，廣場是我們的調色盤」
- 複製工法：法國 pochoir 手繪套色傳統；刻版師傅首日 25 份、次日 50 份、一版約 300 份
- 序列長度：一組四到十四張，成組發送到各地以序列方式張貼；單張尺寸約 41 × 51 cm
- 結構原型：俄羅斯民間木刻版畫 lubok 的粗糙圖文組合
- 下游影響：Otto Neurath 與 Gerd Arntz 的 ISOTYPE 圖像統計，及其後的公共標誌系統
