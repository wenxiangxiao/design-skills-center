---
name: rosta-window
description: Soviet ROSTA-window stencil poster style — a 4-to-12 panel narrative grid, knife-cut silhouettes with load-bearing bridges, three hand-pulled ink plates on coarse newsprint, and bold rhyming caption bands.
---

# ROSTA 窗　模板窗貼風格規格書

> 讀完這份文件的 AI，應該有辦法做出一個**別的產業**、但是**同一個流派**的網站。
> 風格與內容分離：這裡定義的是「怎麼看起來像 ROSTA 窗」，不是「怎麼做消防公告」。

---

## 〇、這個流派是什麼

一九一九年九月到一九二一年一月的莫斯科。內戰中沒有紙、沒有印刷機、沒有油墨。俄羅斯電訊社（РОСТА）的畫家 Mikhail Cheremnykh 把當天的消息畫成一排格子，刻成模板，用手一張一張刷在新聞紙上，貼進空店面的玻璃窗——「窗」的名字由此而來。詩人 Vladimir Mayakovsky 隨後加入，一個人畫了四五百張、寫了十分之九的句子。到停辦為止總共一千五百五十到一千六百塊設計，每塊平均手刷一百五十張，累計約二十四萬張。

看的人有很大一部分不識字。所以：**圖必須自己講得清楚，句必須押韻到能站在路邊唸出聲**。

這個流派長成這樣不是因為誰的品味，是因為三個生產條件：

| 條件 | 造成的視覺特徵 |
|---|---|
| 沒有印刷機，只能刻模板手刷 | 平塗、硬邊、粗形、**橋接**、沒有細線與漸層 |
| 一個顏色一塊版，一塊版一遍刷 | 色數少到三塊；套印永遠對不準，而且沒人去改 |
| 消息是當天的，隔天就過期 | 分格敘事、粗體標語、新聞紙、一張紙上講完一件事 |

**做這個風格的第一原則：先問「這一筆刻得出來嗎」，再問「好不好看」。**

---

## 一、本風格的 5 個不可省略特徵

拿掉任何一項，它就不是 ROSTA 窗了。

### 特徵 1　分格敘事網格，而且標語帶跨格對齊

四到十二格，等大，排在同一張紙上，讀序是左→右、上→下（漫畫的讀法，不是海報的讀法）。每一格由三條橫帶構成：**圖區 ／ 標語帶 ／ 號帶**。三條帶的分界線必須在整排格子之間對齊到同一條線——即使各格標語的行數不一樣。

這件事只有 CSS subgrid 做得到（把每格宣告成跨三個父列的 subgrid）：

```css
.sheet{ display:grid; grid-template-columns:repeat(3,1fr); gap:11px; }
.pan{
  grid-row: span 3;                 /* 每格佔父格三列 */
  display:grid;
  grid-template-rows: subgrid;      /* 圖／標語／號 掛在父格的列軌上 */
  gap:0;
  border:3px solid var(--ink);
}
.pan .fig{ overflow:hidden }
.pan .cap{ border-top:3px solid var(--ink) }
.pan .num{ border-top:2px solid var(--ink) }

/* 不支援時的降級：欄位仍在，只是靠固定高度對齊 */
@supports not (grid-template-rows:subgrid){
  .pan{ grid-row:auto; display:flex; flex-direction:column }
  .pan .cap{ min-height:5.6em }
}
```

**禁止**：三格置中卡片、瀑布流、不等大的格子、沒有讀序的自由拼貼。格子等大是這個流派的骨架。

### 特徵 2　刀刻橋接的剪影（bridge）

模板是一張紙，鏤空的地方讓墨過去。**任何被墨完全圍住的白，都不連在模板本體上，刷第一張就會掉下來。**所以師傅必須留一條紙橋接出去。橋在成品上看得見——它是一條穿過黑色剪影的白色細道。

畫這個風格的圖時，**每一塊內白都要找得到它的橋**。畫不出橋的形狀，就是刻不出來的形狀，必須改。

判斷與生成的最小演算法（純 JS，無 API 依賴）：

```js
// g: Uint8Array(N*N)，1 = 鏤空（有墨），0 = 留紙
// 白區若沒有任何一格碰到畫布邊界，就是孤島 → 必須架橋
function islands(g,N){
  const lab=new Int16Array(N*N).fill(-1), out=[];
  for(let i=0;i<N*N;i++){
    if(g[i]||lab[i]>=0) continue;
    const id=out.length, st=[i], cells=[]; let anchored=false; lab[i]=id;
    while(st.length){
      const c=st.pop(); cells.push(c);
      const x=c%N, y=(c/N)|0;
      if(x===0||y===0||x===N-1||y===N-1) anchored=true;
      for(const [a,b] of [[x-1,y],[x+1,y],[x,y-1],[x,y+1]]){
        if(a<0||b<0||a>=N||b>=N) continue;
        const j=b*N+a; if(!g[j]&&lab[j]<0){lab[j]=id; st.push(j);}
      }
    }
    if(!anchored) out.push({cells});
  }
  return out;                       // 長度 > 0 就是刻不出來
}
```

在版面上，橋不需要另外「畫」出來：只要圖形是格點化的鏤空形（一整條 `<path>` 由水平 run 合併而成），橋就是那條沒被鏤掉的白格。

```svg
<!-- 一格圖：三塊版由下往上疊，紅版固定右下偏移 -->
<svg viewBox="0 0 240 240">
  <g class="p-b"><path d="…地版…" fill="#23508A"/></g>
  <g class="p-r" transform="translate(3.6,4.4)"><path d="…剪影外擴一格…" fill="#C4301B"/></g>
  <g class="p-k"><path d="…剪影…" fill="#17140F"/></g>
</svg>
```

**禁止**：貝茲曲線描出來的漂亮外形、細線描邊、鏤空的孤島（浮在黑色裡的白色圓點、白色文字挖空而沒有橋）。

### 特徵 3　三塊墨，一色一刷，套印錯位不改

糙紙底 + **墨**（形與字）+ **朱**（火、危險、動作）+ **靛**（地面、水、夜）。色數不是設計選擇，是**刷幾遍**——遍數就是工錢與時間，所以永遠少。

三塊版是三次刷，不是三個圖層：所以套印一定對不準，而且那兩公釐**沒有人去改**。這是這個流派的臉。

```css
:root{
  --paper:#CDC0A4;   /* 糙新聞紙，灰褐、低彩度。不是米白，不是象牙 */
  --ink:#17140F;     /* 墨，≥24% 面積 */
  --red:#C4301B;     /* 朱，≤18% */
  --blue:#23508A;    /* 靛，≤14% */
  --white:#F1EBDD;   /* 露白，≤3%，只給膠帶與反白 */
}
/* 固定的套印錯位：朱版永遠往右下 3.6/4.4，全站不改、不隨機 */
.p-r{ transform:translate(3.6px,4.4px) }
```

**禁止**：漸層、透明度混色、模糊陰影（陰影一律實心位移色塊 `box-shadow:4px 5px 0`）、圓角、第四個顏色、把紅色當「品牌色」到處用。

### 特徵 4　粗體標語帶壓在圖下，兩行押韻，字擠滿

標語不是圖說。**它是內容的一半**——圖看不懂就讀字，字看不懂就看圖。帶子是黑底反白、900 字重、字距略緊、擠滿整條帶；帶與圖之間是一條 3px 的實線，不是留白。

```css
.pan .cap{
  background:var(--ink); color:var(--paper);
  border-top:3px solid var(--ink);
  padding:9px 10px 10px;
  font-family:'Noto Sans TC',sans-serif; font-weight:900;
  font-size:clamp(14px,1.55vw,18px); line-height:1.42; letter-spacing:.03em;
}
.pan .cap i{ font-style:normal; display:block }   /* 一行一句，兩句一對 */
```

寫法規則：**每格兩行，行末字必須同韻部**。Mayakovsky 寫掉了 ROSTA 窗十分之九的句，全部押韻，因為那是要唸出聲的。做別的產業時同理：兩行、同韻、口語、具體（有數字、有地名、有動作），不要形容詞。

**禁止**：一格一個英文單字當標題、置中的細體副標、把標語做成 hover 才出現的 tooltip。

### 特徵 5　模板刻不出來的東西，一律沒有

這是唯一的裝飾原則。刀口三公釐，所以：

* 沒有 1px 細線（線最細就是一格）
* 沒有描邊字、沒有陰影字、沒有外光暈
* 沒有 `border-radius`（全站 0）
* 沒有 `filter:blur`、沒有 `feTurbulence` 手抖邊（那是絹印與迷幻海報的語彙，不是模板）
* 沒有照片、沒有材質貼圖

唯一允許的「質感」是**紙本身**與**刷痕**，而且要用 CSS 程序生成：

```css
.pp{
  background:var(--paper);
  background-image:
    /* 刮刀刷痕：102° 斜向，一遍一遍 */
    repeating-linear-gradient(102deg, rgba(23,20,15,.045) 0 5px, transparent 5px 11px),
    /* 紙纖維 */
    repeating-linear-gradient(3deg, rgba(23,20,15,.03) 0 1px, transparent 1px 4px),
    /* 紙上的雜點：手寫幾顆，不要 noise 貼圖 */
    radial-gradient(circle at 17% 41%, rgba(23,20,15,.10) 0 .8px, transparent 1px),
    radial-gradient(circle at 62% 12%, rgba(23,20,15,.09) 0 .7px, transparent 1px),
    radial-gradient(circle at 83% 71%, rgba(23,20,15,.10) 0 .9px, transparent 1px);
  box-shadow:5px 6px 0 rgba(0,0,0,.30);   /* 實心位移，永不模糊 */
  border-radius:0;
}
```

---

## 二、設計哲學

1. **生產條件先於美學。** 每一個視覺決定都要能回答「這是哪一道工序造成的」。答不出來的裝飾一律刪掉。
2. **一張紙講完一件事。** 頁面的單位是「窗」不是「區塊」；一面窗有窗號、有貼的日子、有到期日。
3. **舊的不撕。** 新窗貼在舊窗上面，露出下面的邊角——時間在版面上是**層**，不是列表。
4. **手做的痕跡留著。** 紙歪 0.5 度、朱版偏兩公釐、膠帶泛黃，全部保留；但保留的方式是**固定值**，不是 `Math.random()`——師傅每次都貼歪同一個方向。
5. **可讀性優先於復刻。** 正文一律是可選取的一般 HTML 文字、對比 ≥7:1；剪影與標語帶才用這個流派的手法。

---

## 三、色彩系統

| 色票 | Hex | 用途 | 面積 |
|---|---|---|---|
| 糙新聞紙 | `#CDC0A4` | 所有「紙」的底 | 34% |
| 淺紙 | `#DAD0B8` | 新貼上去的紙、號帶、按鈕底 | 8% |
| 深紙 | `#C2B394` | 壓在底下的舊紙 | 5% |
| 墨 | `#17140F` | 剪影、標語帶、所有邊框、正文 | 26% |
| 朱 | `#C4301B` | 火、危險、現用態、拒絕、數字 | 14% |
| 靛 | `#23508A` | 地面、水、夜、通過、focus ring | 10% |
| 牆 | `#3A3128` / `#2C251E` | 頁面底（貼窗的那面牆） | 全域底 |
| 玻璃 | `#4A4236` | 窗框內、紙與紙之間的縫 | 3% |
| 露白 | `#F1EBDD` | 膠帶、反白小字 | ≤2% |

規則：

* **紙不是背景，牆才是背景。** 長文永遠在紙上，紙浮在牆上。
* 墨的面積必須夠大（單格圖內 ≥15%，含標語帶後全頁約 26%）——剪影是主角，不是點綴。
* 朱與靛**永不相鄰於同一條邊界**，中間一定隔紙或墨（它們是不同的兩塊版）。
* 全站零漸層。唯一的「漸層」是紙紋與刷痕的 `repeating-linear-gradient`，且對比 ≤5%。

換產業時的移調法：糙紙底不可換（它是這個流派的地），可換的是朱與靛那兩塊專色——例如換成**朱＋橄欖綠**（農政）、**朱＋深褐**（碼頭）、**墨＋鏽紅**（工廠）。永遠只有兩塊彩色版。

---

## 四、字體系統

* 中文：`Noto Sans TC`。標語帶與標題 **900**；小標 700；正文 500（不是 400——糙紙底上 400 太虛）。
* 拉丁與數字：`Archivo Black`（單一字重）。只給窗號、刷數、時刻、板號、班表——**數字是資料，用機械感的字**。
* 級距（約 1.28 倍）：11 / 13 / 14.5 / 16 / 18 / 21 / 26 / 32 / 44。
* 行高：正文 1.72；標語帶 1.42（要擠）；表格 1.5。
* 字距：標語與標題 `.03em`～`.05em`；`Archivo Black` 一律 `.06em`～`.20em`。
* **沒有斜體、沒有字重動畫、沒有可變字型軸。** 模板刻不出漸變的字重。

```css
body{ font-family:'Noto Sans TC',sans-serif; font-weight:500; line-height:1.72 }
.mono{ font-family:'Archivo Black',sans-serif; letter-spacing:.06em }
h2{ font-weight:900; font-size:clamp(22px,3vw,32px); letter-spacing:.04em }
```

---

## 五、版面與網格

* 內容寬 1180px，左右內距 22px（≤560px 時 12px）。
* **窗**：14px 實心墨框 + 20px 內距 + 內縮 4px 的露白內框（玻璃反光）。窗外是牆。
* **格陣**：桌機 3 欄，≤900px 2 欄，≤560px 1 欄。格間距 11px（縫是玻璃的顏色）。
* 紙的旋轉角一律在 **±1.2°** 以內，而且是**寫死的固定值**（`-1.1deg / .8deg / -.6deg / 1.2deg` 循環），不是隨機。
* 留白規則：**紙上要留、牆上不留**。紙與紙可以擠在一起，但紙內的邊距不得小於 15px。
* 分隔一律 3px 實線（次級 1px），永不用陰影或留白分隔。

---

## 六、元件配方

### 導覽：pasteover-stack 覆貼層序

四頁＝四張貼在窗上的紙。現用頁那張**貼在最上層**（z-index 最高、往上抬 6px、四角有新膠帶）；其餘三張被壓在下面、只露出一角、往內縮 −13px、各自歪不同角度。語意是「這張是最新貼上去的」——不是被標示、不是被反相、不是變大。

```css
nav.stack{ display:flex; align-items:flex-end }
nav.stack a{
  position:relative; background:var(--paper3); border:3px solid var(--ink);
  padding:9px 15px 8px; margin-left:-13px; font-weight:900;
  transform:rotate(-1.1deg); box-shadow:3px 4px 0 rgba(0,0,0,.30);
  transition:transform .09s steps(2);
}
nav.stack a:nth-child(2){transform:rotate(.8deg)}
nav.stack a:nth-child(3){transform:rotate(-.6deg)}
nav.stack a:nth-child(4){transform:rotate(1.2deg)}
nav.stack a.on{
  background:var(--paper2); z-index:9;
  transform:rotate(0deg) translateY(-6px); box-shadow:5px 7px 0 rgba(0,0,0,.34);
}
/* 新膠帶只長在現用那張上 */
nav.stack a.on::before,nav.stack a.on::after{
  content:""; position:absolute; width:46px; height:14px;
  background:rgba(241,235,221,.52); top:-8px;
}
nav.stack a.on::before{left:-11px; transform:rotate(-32deg)}
nav.stack a.on::after {right:-11px; transform:rotate(32deg)}
```

≤900px 攤平成等寬橫列，現用格改成朱底反白（膠帶隱藏）；頁尾另備完整文字連結保底。

### 按鈕

```css
.btn{
  background:var(--ink); color:var(--paper); border:3px solid var(--ink);
  padding:9px 17px; font-weight:900; letter-spacing:.05em; border-radius:0;
  box-shadow:4px 5px 0 rgba(0,0,0,.30);
  transition:transform .08s steps(2), background .08s steps(2);
}
.btn:hover,.btn:focus-visible{
  transform:translate(2px,3px); box-shadow:2px 2px 0 rgba(0,0,0,.30);
  background:var(--red); border-color:var(--red);
}
```

按下去是「壓進紙裡」：位移 + 陰影縮短。用 `steps()` 而不是 easing——手是一下一下動的。

### 卡片＝一張貼上去的紙

`.pp` 的紙紋 + 至少一片膠帶（`.tape.tl` / `.tape.br.old`）。舊紙的膠帶用 `rgba(196,155,90,.34)`（泛黃）。

```css
.tape{position:absolute;width:74px;height:19px;background:rgba(241,235,221,.42);
 border-left:1px solid rgba(23,20,15,.22);border-right:1px solid rgba(23,20,15,.22)}
.tape.tl{top:-9px;left:-16px;transform:rotate(-38deg)}
.tape.br{bottom:-9px;right:-16px;transform:rotate(-38deg)}
.tape.old{background:rgba(196,155,90,.34)}
```

### 表單

輸入框 3px 墨框、糙紙底、無圓角；focus 用 3px 靛色 outline（offset 2px）。checkbox / radio 包在 `<label>` 裡做成方塊，選中整塊反黑：

```css
.opts label{ border:3px solid var(--ink); background:var(--paper2); padding:7px 12px; font-weight:700 }
.opts label:has(input:checked){ background:var(--ink); color:var(--paper) }
```

錯誤訊息：朱色 900 字重，直接寫「哪裡不對、該怎麼辦」，不寫「欄位驗證失敗」。

### Footer

整塊墨底反白，內含一個朱色實框的聲明區。

---

## 七、動效規則（四種，缺一不可）

| 類型 | 名稱 | 觸發 | 值 |
|---|---|---|---|
| ambient | 街光掃牆 ／ 玻璃斜光 | 無 | 58s ／ 26s linear infinite，103–104° 的低透明白帶，opacity ≤.12 |
| input | 抬紙 | hover ／ focus-within | `transform:translate(-4px,-5px)`，`.09s steps(2)`，陰影同時由 4/5 變 9/11 |
| transition | 刮刀推刷 squeegee wipe | 進頁、狀態揭示 | `clip-path:inset(0 100% 0 0)` → `inset(0)`，`.62s steps(9)` |
| **signature** | **刷次墨脹 ink-gain** | 按「刷 N 張」 | `feMorphology` dilate，radius = 張數 ÷ 每格張數 × 格寬 |

```css
@keyframes squee{ from{clip-path:inset(0 100% 0 0)} to{clip-path:inset(0 0 0 0)} }
.wipe{ animation:squee .62s steps(9) both }
```

**簽名動效：刷次墨脹。** 全站唯一，也是這個流派唯一「會隨時間改變畫面」的物理現象——油墨在重複刷印中往外脹，細節一張一張被吃掉，太細的橋被兩側的墨咬斷，那塊紙就掉下來變成一坨黑。被重算的不是排版、不是顏色、不是明暗、不是姿態，而是**形狀本身，因為它被用過幾次**。

```html
<svg width="0" height="0"><defs>
  <filter id="inkgain" x="-14%" y="-14%" width="128%" height="128%" color-interpolation-filters="sRGB">
    <feMorphology id="mo" operator="dilate" radius="0"/>
  </filter>
</defs></svg>
```

```js
// 每 PER 張脹一格；一格 = CELL 個 svg user unit
mo.setAttribute('radius', String(prints / PER * CELL));
```

**所有動效都必須降級，而且降級後資訊零損失。** 做法是：凡是動畫要傳達的事實，都同時印在版面上（每一格的號帶永遠印著「刷 N」，所以就算不播動畫也知道它第幾張會落）。

```css
@media(prefers-reduced-motion:reduce){
  body::before,.win::before{ animation:none }
  *{ transition-duration:0s !important }
  .wipe{ animation:none; clip-path:none }
}
```

JS 端同樣要查 `matchMedia('(prefers-reduced-motion:reduce)')`，直接跳到終值而不逐格播。

**自我限制（可寫，但不得讓總數低於四種）**：本風格禁用淡入式滾動揭示、視差、數字滾動計數、跑馬燈、`stroke-dashoffset` 描繪、彈跳 easing。理由都一樣——那些是「畫線」與「捲動」的語彙，模板刷是**一下、一下、一整片**。

---

## 八、插畫與圖像風格：knifecut-bridge 刀刻橋接構成

全站零外部圖片。所有圖像（每一格的圖、logo、favicon、圖鑑縮圖、印記）都是**同一種原語**：一張 32×32 的格點鏤空圖（四周留 3 格紙邊），經過三道規定：

1. **格點化**：形狀先在連續座標裡用四種基元組出來（`rect` ／ `circ` ／ `poly` ／ `band` 粗線段），再以格心取樣落到 32×32 的中央 26×26 區（四周留 3 格紙邊）；`-` 前綴的基元是挖除，挖出來的白就是內白。
2. **橋接**：偵測孤島，用加權最短路（成本 = 1 + 墨厚²×0.8，讓橋從**墨最薄的地方**穿過）打通到外部白區，再加粗到三格。
3. **三塊版**：靛（地版，六種簡單幾何之一）→ 朱（剪影外擴一格、右下偏移）→ 墨（剪影本體）。

判準：**拿掉顏色，仍讀得出「哪一塊白是被橋吊著的」。** 做不到就不是這個技法。

```js
// 由 bitmap 合併水平 run 產生單一 path，節點數極少、無曲線
function toPath(g,N,s){
  let d='', nf=v=>String(Math.round(v*100)/100);
  for(let y=0;y<N;y++){
    let x=0;
    while(x<N){
      if(!g[y*N+x]){x++;continue;}
      let x2=x; while(x2<N&&g[y*N+x2])x2++;
      d+='M'+nf(x*s)+' '+nf(y*s)+'h'+nf((x2-x)*s)+'v'+nf(s)+'h-'+nf((x2-x)*s)+'z';
      x=x2;
    }
  }
  return d;
}
```

母題規則（換產業時照這條走）：**用動作與道具辨識身分，不畫臉**。工人＝錘、農民＝鐮、消防＝盔與水線。人形一律無五官、無透視、無陰影，身體可以被斜切成塊面。

**明文禁用**：`feTurbulence` ／ `feDisplacementMap` 手抖邊、半調網點、細線幾何線描、寫實描繪、等角視圖、任何曲線描邊。

---

## 九、Logo 與 Favicon 設計指南

Logo 就是一面窗：實心方框 + 四格 + 每格裡一塊被「橋」切開的白。只用矩形，只用四個顏色，不用曲線。

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <rect width="64" height="64" fill="#CDC0A4"/>
  <rect x="3" y="3" width="58" height="58" fill="none" stroke="#17140F" stroke-width="5"/>
  <rect x="12" y="14" width="17" height="15" fill="#23508A"/>
  <rect x="35" y="14" width="17" height="15" fill="#17140F"/>
  <rect x="12" y="35" width="17" height="15" fill="#17140F"/>
  <rect x="35" y="35" width="17" height="15" fill="#C4301B"/>
  <rect x="18" y="18" width="5" height="7" fill="#CDC0A4"/>
  <rect x="41" y="39" width="5" height="7" fill="#CDC0A4"/>
  <rect x="12" y="31" width="40" height="2" fill="#17140F"/>
</svg>
```

Favicon 同構，寫成 inline SVG data URI 放在 `<head>`（`#` 要跳脫成 `%23`），不用外部檔。

---

## 十、Do & Don't

**Do**

* 先問「刻得出來嗎」，再畫。
* 每一格都要有讀序上的位置：它是第幾格、之後接哪一格。
* 標語兩行押韻、口語、有具體數字。
* 舊的內容用「壓在下面」表現，不用「歷史頁面」。
* 所有隨機感都用**寫死的固定值**或決定性雜湊（同輸入恆得同結果）。
* 資訊永遠也印成一般 HTML 文字，不依賴動畫或 JavaScript。

**Don't（含去 AI 化禁令）**

* 不用紫藍漸層、不用「置中大標＋副標＋兩顆按鈕＋三張圓角卡片」。
* 不用 emoji 當 icon（icon 一律自繪 SVG，只用直線、45° 斜線與正圓）。
* 不用 `border-radius`、不用模糊陰影、不用 `backdrop-filter`。
* 不用 Lorem ipsum、不用「在當今快節奏的世界」、不用「EST. 19xx」徽章、不用「把 X 變成 Y」句式標題。
* 不用跑馬燈——這個流派的重點資訊是**釘在紙上不動的**。
* 不用照片、不用材質貼圖、不用 noise PNG。
* 不要把三塊墨變成「品牌主色 + 兩個輔助色」——它們是三次刷，語意固定：墨＝形與字、朱＝危險與動作、靛＝地與水。
* 不要為了「乾淨」把黑色面積縮小。剪影小於全幅 15%（畫得下的區域的兩成）的畫面不是這個流派。

---

## 十一、頁面骨架範例（可直接使用）

```html
<body>
<!-- 頁面底是「牆」，內容是貼在牆上的紙 -->
<header class="wrap masthead">
  <a class="mark" href="index.html">[logo svg]<span><b>站名</b><span>LATIN NO.0001</span></span></a>
  <nav class="stack" aria-label="主要導覽">
    <a href="index.html" class="on" aria-current="page">首頁<em>TODAY</em></a>
    <a href="b.html">第二頁<em>TWO</em></a>
    <a href="c.html">第三頁<em>THREE</em></a>
    <a href="d.html">第四頁<em>FOUR</em></a>
  </nav>
</header>

<main id="main" class="wrap">
  <!-- 一面窗 -->
  <section class="win wipe">
    <div class="winhead">
      <span class="no">NO.1147</span>
      <b>這一號窗的題目</b>
      <span>貼的日子　·　到期日　·　刷幾張</span>
    </div>
    <div class="sheet">
      <article class="pan">
        <div class="fig">
          <svg viewBox="0 0 240 240">
            <g class="p-b"><path d="…" fill="#23508A"/></g>
            <g class="p-r" transform="translate(3.6,4.4)"><path d="…" fill="#C4301B"/></g>
            <g class="p-k"><path class="kk" d="…" fill="#17140F"/></g>
          </svg>
        </div>
        <div class="cap"><i>第一行七字，</i><i>第二行押同韻。</i></div>
        <div class="num"><span>1/6　母題名</span><em>刷 150</em></div>
      </article>
      <!-- 再五格 -->
    </div>
  </section>

  <!-- 壓在下面的舊窗 -->
  <div class="under"><div class="old pp dk">舊窗不撕，直接貼在上面。<a href="c.html">看窗籍 →</a></div></div>

  <!-- 一張貼上去的紙 -->
  <section class="sec card pp">
    <span class="tape tl"></span><span class="tape br old"></span>
    <h2>小標</h2>
    <p class="lead">正文一律在紙上，可選取，對比 ≥7:1。</p>
    <div class="rule"></div>
    <table>…</table>
  </section>
</main>

<footer><div class="wrap">…單位資訊…<div class="warn">聲明</div></div></footer>
</body>
```

---

## 十二、技術實作與相容性

本風格由三項技術承載，缺一則特徵退化。

### 1　CSS `grid-template-rows: subgrid`（承載特徵 1）

*承載什麼*：三格一列的窗，各格的「圖／標語／號」三條帶必須對齊到同一條線，而各格標語行數不同。媒體查詢、flex、固定高度都做不到；只有 subgrid 能讓子項目掛到父格的列軌上。

*支援現況（2026-08-23 查證）*：MDN《Subgrid》與 caniuse `mdn-css_properties_grid-template-rows_subgrid`——Firefox 71（2019）、Safari 16.0（2022）、Chrome ／ Edge 117（2023-09-12 ／ 09-15）、Opera 103、Samsung Internet 24。**Baseline Widely available，2026-03-15 起**（web.dev《CSS subgrid》、web-platform-dx features explorer）。

*Fallback*：`@supports not (grid-template-rows:subgrid)` 時 `.pan` 退回 flex 直排並給 `.cap{min-height:5.6em}`。圖、標語、號帶三者全部仍在，只是跨格的分界線可能相差幾像素。資訊零損失。

### 2　SVG `<feMorphology>` dilate（承載特徵 5 與簽名動效）

*承載什麼*：「刷得越多，墨脹得越開」。膨脹一個**已經格點化的鏤空形**、讓細節從外緣被吃掉、讓過細的橋被兩側的墨接起來——這是形態學膨脹（Minkowski 和），`transform:scale` 與 `stroke-width` 都做不出來（scale 會把整張圖等比放大、位置跑掉；stroke 只加在輪廓上、不會讓兩塊分開的墨合併）。

*支援現況（2026-08-23 查證）*：MDN《`<feMorphology>`》標示 **Baseline Widely available，2015-07 起跨瀏覽器**（Chrome ／ Edge ／ Firefox ／ Safari 皆支援，`operator="erode|dilate"`、`radius` 可為一或兩個值）。

*Fallback*：`radius="0"` 是恆等；不支援濾鏡的環境會整個忽略 `filter`——畫面停在未刷的第一張，仍是完整的三塊版剪影。每一格的落版張數是**印在號帶上的文字**，不靠動畫傳達。`prefers-reduced-motion` 時直接跳到終值，不逐格播。

*效能*：濾鏡只掛在 6 個 240×240 的 `<g>` 上，動畫以 90ms 一格前進（約 11 次／秒重繪），非每幀；`radius` 上限 20 user unit。實測單頁全部 inline 資源：index 36KB ／ khek 45KB ／ lek 75KB ／ tui 27KB，皆遠低於 350KB；首屏 JS 只做一次 `setPrints(0)`。

### 3　連通性與形態學求解引擎（承載特徵 2）

*承載什麼*：孤島偵測、加權最短路架橋、頸寬求解、模板壽命。純 JavaScript，無瀏覽器 API 依賴，因此**無相容性問題**；同輸入恆得同輸出（可用 `?k=` 序列化分享）。

*核心公式*：墨每刷一張向外脹 1/75 格。一條 w 格寬的紙橋，兩側各被吃 r 格，`2r ≥ w` 時斷。令 `r*` 為「墨脹幾格時第一塊紙落下」，則

```
刷得了的張數 = (r* − 1) × 75
```

橋 3 格 → 75 張；5 格 → 150 張；7 格 → 225 張。**這條公式同時是遊戲規則、是版面上印的數字、也是這個流派為什麼長得這麼胖的原因。**

*複雜度*：`islands` ／ `paperDist` ／ `dilate` 皆為 O(N²) 的 BFS（N=32，1024 格）；`life` 最多跑 8 次 dilate。實測單次 `life()` < 0.2ms（Node 22），拖曳時以 70ms debounce 呼叫，不會掉幀，且全程只在 `pointerdown` 讀一次 `getBoundingClientRect`，無 layout thrashing。

### 無 JavaScript 時

四頁的全部資訊（六格窗的圖與標語、二十四面窗籍、公式與表格、單位資訊）都是靜態 HTML 與 inline SVG。JavaScript 只加上三件事：刷次墨脹的播放、刻窗工房、窗籍篩選。三者都有頁面上的文字替代。

---

## 十三、換一個產業要改什麼

| 不能改 | 可以改 |
|---|---|
| 分格 + 跨格對齊的標語帶 | 幾格（4–12） |
| 橋接剪影、格點化圖形 | 母題（換成該產業的道具與動作） |
| 糙紙底 + 三塊墨的結構 | 朱與靛換成別的兩塊專色 |
| 兩行押韻的標語 | 語言、口氣、韻部 |
| 零漸層、零圓角、零模糊、零細線 | 窗框的粗細與比例 |
| 「窗」作為內容單位（有號、有日期、有到期） | 窗號的編法 |

適合的產業：任何**有時效、要對不特定路人講話、內容會過期**的東西——市場公告、選務、疫情通報、罷工告示、球隊戰報、二手市集、社區佈告、獨立唱片的新譜通知、農會的病蟲害通報。

不適合：奢侈品、精品旅宿、金融資產管理——這個流派的骨子裡是「便宜、快、講給所有人聽」，貼在那些產業上會變成 cosplay。

---

## 十四、參照與出處

* Wikipedia，〈ROSTA windows〉（Окна сатиры РОСТА，1919–1921）
* Hannelore Fobo，〈Chapter 4. ROSTA Windows stencil techniques – updated〉，e-e.eu，2020（引 V. D. Duvakin《«Окна Роста» В. В. Маяковского》1949：設計 1550–1600 塊、平均每塊 150 張、總計約 240,000 張；Mayakovsky 約 450–500 塊）
* V&A Explore The Collections，Mikhail Cheremnykh 海報條目（「四到十二格敘事圖像排在同一張紙上，以彩色模板複製」）
* TASS，〈ROSTA windows: the art of satirical poster〉
* Melton Prior Institut，Alexander Roob，〈The ROSTA Windows of the Bolshevik Art Army〉
* MDN Web Docs：《Subgrid》、《`<feMorphology>`》、《`operator`》；caniuse：`mdn-css_properties_grid-template-rows_subgrid`；web.dev：《CSS subgrid》
