---
name: grunge-raygun-deconstructed
description: Deconstructed 1990s grunge editorial typography in the Ray Gun / David Carson tradition — no grid, colliding layers, abandoned baselines, 1-bit photocopy imagery, and a mandatory legible exit beside every illegible passage.
---

# 解構編輯排版 Grunge／Ray Gun

> 這是一份風格規格書。讀完它，你應該能在任何產業上做出同一個流派的網站，而不需要看過 Demo。
> 本流派的代表刊物是 *Ray Gun*（1992–2000，創刊藝術指導 David Carson），源頭是 Carson 更早的 *Beach Culture*（1989–91）與 *Transworld Skateboarding*。
> 製作條件決定了它的長相：一九九〇年代初的桌面排版（Macintosh + QuarkXPress）、影印機、掃描器與 Letraset 轉印字；沒有無限的印刷預算，所以圖像常常是黑白影印稿，而不是精美的四色分色。

---

## 一、設計哲學

**這個流派的主張只有一句話：可讀性（legibility）不等於溝通（communication）。**

Carson 在一九九四年把 Bryan Ferry 的專訪整篇排成 Zapf Dingbats，因為他覺得那篇訪談很無聊——但**同一期的後面附上了全文的可讀版本**。這件事常被引用成「他毀了排版」，其實它的完整形狀是：**他讓讀者選擇要不要辛苦，而不是剝奪讀者讀完的能力。**

所以本流派有兩個容易被搞錯的地方：

1. **它不是「隨便亂排」。** 每一次崩壞都在替某個東西說話（一首歌很吵、一個人很難懂、一件衣服很破）。沒有來源的崩壞只是雜訊，做出來就是難看，不是這個風格。
2. **它不是「反對讀者」。** 它反對的是「版面必須先讓自己安靜下來」這條規矩。前提是：**任何讀不順的東西旁邊，必須有一個把它讀順的出口。**

實作上，把這條哲學翻譯成一條可以被程式檢查的規則：

> **破壞必須有資料來源。**
> 版面上每一處被擠開的欄、每一塊蓋住字的色塊、每一段被洗淡的灰，都要能指回某一筆真實資料（一件商品的瑕疵座標、一首歌的音量、一份文件的塗銷紀錄）。做不到就不要破。

---

## 二、色彩系統

本流派的顏色來自影印機：**它只印得出黑與白，所有的灰都是黑點的疏密。** 唯一不是印出來的顏色，是拿在人手上的螢光筆。

| 角色 | Hex | 面積 | 用途 |
|---|---|---|---|
| 影印白 paper | `#E4E1D8` | 約 44% | 全站地色。**不可以是純白**——純白會讓 1-bit 點陣看起來像螢幕而不是紙 |
| 碳粉黑 toner | `#16151A` | 約 32% | 正文、框線、所有點陣的墨點。偏藍紫的黑，不是純黑 |
| 重影灰 ghost | `#33313A` | 約 8% | 第二次過機的位移殘影、次要標籤、停用態。**只能是同一塊黑的位移，不可以當成一個「比較淺的灰」拿去填色** |
| 螢光橘 fluoro | `#FF4A17` | 約 13% | 唯一的彩色。**只給三種東西：價格／可以按的東西／被劃掉重寫的數字。** 它的語意是「有人用手在紙上畫過」 |

```css
:root{
  --paper:#E4E1D8; --toner:#16151A; --ghost:#33313A; --fluoro:#FF4A17;
  --wash:#605E62;   /* 被「洗淡」的段落色，對比 4.85:1 —— 這是底線，不可以更淡 */
}
```

**硬規則（違反其一，這個風格就關掉了）**

- **零漸層、零半透明、零模糊陰影。** 陰影一律是一塊位移的實心色（`filter:drop-shadow(6px 8px 0 var(--ghost))`，注意 blur 為 0）。
- **中間灰只能由黑點密度產生**，不可以用第三個灰色填一塊面積。
- 螢光橘不可以拿去當地色、不可以拿去做大面積，也不可以出現在正文裡。
- 想換色系時只換「螢光筆」那一支（螢光桃 `#FF2E88`、螢光黃綠 `#D8FF00` 都成立），三個中性色不要動。

---

## 三、字體系統

同一個版面上**至少三個字族、字級跨度至少 8 倍**，這是本流派的體感來源。

| 角色 | 字族 | 字重／字級 |
|---|---|---|
| 拉丁刊頭 | `Archivo Black` | 400／64–104px，`letter-spacing:-.05em`，`line-height:.72` |
| 中文標題 | `Noto Sans TC` | 900／24–58px，`letter-spacing:-.03em` |
| 標籤・數字・價格・技術說明 | `Courier Prime` | 400/700／10–14px，`letter-spacing:.06em–.14em` |
| 中文內文 | `Noto Serif TC` | 400／15–17px，`line-height:1.62–1.72` |

```html
<link href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Courier+Prime:wght@400;700&family=Noto+Sans+TC:wght@700;900&family=Noto+Serif+TC:wght@400;700&display=swap" rel="stylesheet">
```

字級 scale（刻意不是等比級數——本流派不做和諧的音階，做的是斷崖）：

```
10 · 11 · 12 · 13 · 15 · 17 · 19 · 24 · 30 · 34 · 40 · 46 · 58 · 64 · 100
```

**紀律：** 標題可以被裁掉、可以歪、可以互相壓過去；**內文永遠水平、永遠可選取、對比永遠 ≥ 4.5:1**。這條紀律不是妥協，它是這個流派唯一能在網頁上成立的方式——紙本的讀者可以把雜誌轉過來看，螢幕前的讀者不行。

---

## 四、版面與網格

**沒有網格。** 有的是一疊互相碰撞的圖層。

- 刊頭是三層絕對定位互相重疊：拉丁刊名（z:2）＋ 中文店名（z:4，壓在拉丁字上、左位移 158px、下位移 78px）＋ 期號（z:5，靠右）＋ 一條反白標語（z:3，`rotate(-1.4deg)`）。
- **出血裁字**：外層 `overflow:hidden`，刊名寬度刻意超出容器，讓最後一兩個字母被畫布右緣切掉。
- 旋轉角只用小角度且必為非整數：`-3.2deg`／`-1.4deg`／`1.6deg`／`-8deg`（印章）。大於 10 度就變成裝飾，不是印壞。
- 內文一律走 **CSS 多欄**（不是 Grid、不是 Flex）——只有多欄會讓文字真的在欄之間流動，而「流動」是本流派做破壞的前提。

```css
.col{column-count:3;column-gap:var(--gap,26px);column-rule:1px solid var(--toner);
     font-size:15px;line-height:1.72}
.col h3{column-span:all;               /* 標題橫貫整個欄組，把欄流切成兩段 */
        border-top:3px solid var(--toner);border-bottom:3px solid var(--toner);padding:8px 0}
.col p:first-child::first-letter{font:400 46px/.8 "Archivo Black",sans-serif;float:left;margin:4px 6px 0 0}
@media(max-width:560px){.col{column-count:1;column-rule:none}}
```

留白規則：**沒有對稱的留白。** 左右邊距不相等（左 22px／右 22px 但內容區塊自己再位移 6–14px），區塊之間的垂直間距在 6px 與 60px 之間跳動，不用固定的 spacing scale。

---

## 五、本風格的 5 個不可省略特徵

> 每一項都是「拿掉它就不是這個風格了」的程度。五項必須同時出現在同一個畫面上。

### 特徵 1｜無網格的疊層碰撞（layers collide）

標題、圖、內文、頁碼在不同的 z 層上互相壓過去，至少一處文字越過圖片或欄線的邊界。

```css
.mast{position:relative;min-height:180px;overflow:hidden}      /* overflow:hidden = 出血裁字 */
.mast .zn{font:400 100px/.72 "Archivo Black",sans-serif;letter-spacing:-.05em;position:relative;z-index:2}
.mast .cn{position:absolute;left:158px;top:78px;z-index:4;font:900 58px/.78 "Noto Sans TC",sans-serif}
.mast .kick{position:absolute;left:6px;top:150px;z-index:3;background:var(--toner);color:var(--paper);
            padding:5px 9px;transform:rotate(-1.4deg)}
```

### 特徵 2｜字級跨 8 倍、三個以上字族同屏（type collision）

```css
.lbl  {font:700 11px/1  "Courier Prime",monospace;letter-spacing:.14em;text-transform:uppercase}
.body {font:400 15px/1.72 "Noto Serif TC",serif}
.head {font:900 34px/1  "Noto Sans TC",sans-serif;letter-spacing:-.02em}
.zn   {font:400 100px/.72 "Archivo Black",sans-serif;letter-spacing:-.05em}  /* 11px → 100px = 9.1 倍 */
```

### 特徵 3｜基線被放棄，但只在標題（abandoned baseline）

行距壓成小於 1（行與行互咬）、逐字位移與旋轉、負字距。**只能用在標題與引句。**

```css
.zn{line-height:.72}                       /* 行互咬 */
.zn span:nth-child(2n){transform:translateY(-6px) rotate(-2deg);display:inline-block}
.zn span:nth-child(3n){transform:translateY(5px)  rotate(1.4deg);display:inline-block}
```

### 特徵 4｜1-bit 影印複製（no continuous tone）

畫面上不存在連續灰階。所有圖像都是黑白兩色的誤差擴散點陣，並且允許重影與錯位。

```js
// Floyd–Steinberg 誤差擴散：把 0..1 的灰階場壓成只有 0 與 1
function dither(w,h,g){                     // g = Float32Array(w*h)，值域 0..1
  var out=new Uint8ClampedArray(w*h*4);
  for(var y=0;y<h;y++)for(var x=0;x<w;x++){
    var i=y*w+x, old=g[i], nv=old<0.5?0:1, err=old-nv, o=i*4;
    if(x+1<w)            g[i+1]   += err*0.4375;
    if(y+1<h){ if(x>0)   g[i+w-1] += err*0.1875;
                         g[i+w]   += err*0.3125;
               if(x+1<w) g[i+w+1] += err*0.0625; }
    if(nv===0){ out[o]=22; out[o+1]=21; out[o+2]=26; out[o+3]=255; } else { out[o+3]=0; }
  }
  return out;                                // 透明的地方讓紙色透出來
}
```

重影（第二次過機的錯位）：

```css
.ghosted{text-shadow:1.5px 0 0 var(--ghost)}          /* 同一塊黑的位移，不是彩色 */
.blockshadow{filter:drop-shadow(6px 8px 0 var(--ghost))}  /* blur 必為 0 */
```

### 特徵 5｜每一處讀不順，旁邊都有一個出口（the legible exit）

**這是唯一一項不是視覺的特徵，也是最不能省的一項。** 拿掉它，前四項就只是裝飾；有了它，這個風格才有立場。

```html
<button class="btn readmode" id="readbtn" type="button" aria-pressed="false">讀順版：把傷拿掉</button>
```

```js
// 出口必須：全域、記得住、每一頁都在、不需要跟任何人要
function readMode(){return localStorage.getItem("app.read")==="1";}
document.getElementById("readbtn").addEventListener("click",function(){
  localStorage.setItem("app.read", readMode()?"0":"1");
  applyDamage();                      // 重跑一次破壞：readMode() 為真時全部略過
});
```

```css
.readmode{position:fixed;right:14px;bottom:14px;z-index:70}   /* 固定在同一個位置，四頁都一樣 */
```

---

## 六、元件配方

### 導覽（吊牌劃價 pricetag-strike）

四張吊牌用線吊在一根橫桿上；**現用頁那一張的編號被劃掉並用螢光筆重寫**，牌身歪 `-3.2deg` 且下沉。語意是「這張牌被改過」，不是「這張牌被高亮」。

```css
.tags{position:relative;display:flex;gap:12px;flex-wrap:wrap;padding:22px 0 40px}
.tags .rail{position:absolute;left:0;right:0;top:20px;height:3px;background:var(--toner)}
.tag{position:relative;border:2.5px solid var(--toner);background:var(--paper);padding:9px 13px 8px;
     margin-top:26px;transform-origin:50% -26px;text-decoration:none;color:var(--toner)}
.tag::before{content:"";position:absolute;left:50%;top:-26px;width:2px;height:26px;background:var(--toner)}
.tag::after {content:"";position:absolute;left:calc(50% - 5px);top:-4px;width:10px;height:10px;
             background:var(--paper);border:2px solid var(--toner)}          /* 吊牌孔 */
.tag.cur{transform:rotate(-3.2deg) translateY(7px)}
.tag.cur .pn s{text-decoration:line-through 2px var(--toner)}
.tag.cur .pn em{font-style:normal;color:var(--fluoro);font-weight:700}
.tag.cur .hl{position:absolute;left:-4px;right:-4px;top:11px;height:15px;
             background:var(--fluoro);z-index:-1;transform:rotate(-1.1deg)}  /* 螢光筆那一道 */
```

### 按鈕

```css
.btn{background:var(--toner);color:var(--paper);border:2.5px solid var(--toner);
     font:700 13px/1 "Courier Prime",monospace;padding:9px 14px;letter-spacing:.06em;
     transition:transform 80ms steps(2)}                       /* steps() 而不是 ease：機械的，不滑順 */
.btn:hover{background:var(--fluoro);border-color:var(--fluoro);transform:translate(-2px,-2px)}
.btn[disabled]{background:var(--paper);color:var(--ghost);border-color:var(--ghost);transform:none}
```

### 卡片（不是卡片，是貼著吊牌的東西）

```css
.fig{border:2px solid var(--toner)}                        /* 零圓角 */
.tk {border:2px solid var(--toner);border-top:none;padding:4px 6px 5px}  /* 牌與圖是同一塊，不留縫 */
.tk .p s{color:var(--ghost);font-size:10px;margin-right:3px}  /* 被劃掉的舊價 */
.tk .p em{font-style:normal;color:var(--fluoro)}             /* 現價 */
```

### 表單與表格

表格是本流派**唯一允許整齊**的地方——它是拿來對帳的。

```css
table{width:100%;border-collapse:collapse;font:400 13px/1.5 "Courier Prime",monospace}
th,td{border:1.5px solid var(--toner);padding:6px 8px;text-align:left;vertical-align:top}
th{background:var(--toner);color:var(--paper)}
tbody tr:nth-child(even) td{background:#DAD7CD}
input{border:2px solid var(--toner);background:var(--paper);padding:5px 6px;
      font:400 11px/1.5 "Courier Prime",monospace}
```

### Footer

```css
footer.ft{border-top:3px solid var(--toner);margin-top:60px;padding:22px 0 10px;
          font:400 12.5px/1.7 "Courier Prime",monospace;color:var(--ghost)}
```

---

## 七、動效規則（四種，缺一不可）

| 類型 | 名稱 | 觸發 | 具體值 |
|---|---|---|---|
| ambient 環境 | 碳粉走紙 | 不需輸入 | 200×200 的 1-bit 髒點磚，`background-position` 每 6.6 秒跳一次，`steps(1)` 三個位置循環——每一張紙的髒點都不一樣 |
| input 輸入 | 抽到最上面 | hover／focus | `transform:translate(-4px,-6px)`＋`filter:drop-shadow(6px 8px 0 var(--ghost))`，`80ms steps(2)`（延遲 < 100ms） |
| transition 轉場 | 過機 run-through | 進頁／出單 | `clip-path:inset(0 0 100% 0)` → `inset(0 0 0 0)`，`520ms steps(12)`，同時一條 3px 掃描條由上掃到下 |
| **signature 簽名** | **傷痕推版 flaw-displacement** | 資料改變 | 見下 |

```css
@keyframes runthrough{from{clip-path:inset(0 0 100% 0)}to{clip-path:inset(0 0 0 0)}}
.rig{animation:runthrough .52s steps(12) 1}
@keyframes sheet{0%{background-position:0 0}33%{background-position:83px 47px}
                 66%{background-position:-51px 119px}100%{background-position:0 0}}
.grain{background-image:var(--gr);background-size:200px 200px;opacity:.42;
       mix-blend-mode:multiply;animation:sheet 6.6s steps(1) infinite;pointer-events:none}
```

**簽名動效：傷痕推版。** 一份「損傷清單」被即時翻譯成內文欄位的幾何：

- `push`（破洞／蟲蛀）→ 一個真的浮動障礙物插進段落，欄裡的字繞著它走
- `toner`（汙漬）→ Custom Highlight API 疊在真實文字上（DOM 一個字都沒動）
- `gap`（脫線）→ `column-gap` 拉大、`column-rule` 改虛線或整條拿掉
- `wash`（褪色）→ 該段落字色降到 `--wash`（對比下限 4.5:1，不可再低）

```css
.ob{display:block;background:var(--paper);border:2.5px solid var(--toner);
    clip-path:polygon(14% 4%,52% 0,78% 12%,96% 38%,88% 72%,64% 96%,30% 92%,6% 66%,0 34%);
    transition:width .24s steps(4),height .24s steps(4),margin .24s steps(4)}
.ob.l{float:left;margin:4px 12px 6px 0}
.ob.r{float:right;margin:4px 0 6px 12px}
.col.g1{--gap:44px;column-rule-style:dashed}
.col.g2{--gap:62px;column-rule-style:none}
.col.g3{--gap:82px;column-rule-style:none}
.washed{color:var(--wash)}
```

**降級（四種都必須有，且資訊零損失）**

```css
@media(prefers-reduced-motion:reduce){
  .rig,.scan,.grain{animation:none}          /* 環境／轉場：停在最終狀態 */
  .tag,.btn,.item,.ob{transition:none}       /* 輸入／簽名：瞬間到位 */
}
```

降級後：髒點磚停在第一張、頁面直接是最終畫面、hover 位移瞬間發生、障礙物瞬間收合。**四種動效的資訊（現用頁、可按、傷在哪、價格）在降級後一個都沒有少。**

---

## 八、插畫與圖像風格：toner-dither 碳粉誤差擴散構成

**零外部圖片、零照片、零寫實描繪。** 所有圖像由同一支引擎輸出，原語只有四種：

1. **輪廓**：程序化路徑（在 Canvas 上填成遮罩）
2. **材質場**：value noise ＋ 方向性織紋（直溝／斜紋／平織三種）
3. **損傷**：洞＝局部拉白＋一圈黑邊；汙＝局部壓黑並加噪；褪＝局部提亮；脫線＝一條細長的黑
4. **點陣化**：以上全部合成成 0..1 的灰階場後，用 Floyd–Steinberg 壓成 1-bit

判準：**拿掉全部文字，仍然讀得出這是什麼形狀、傷在哪裡、哪裡最髒。**

```js
// 材質場（織紋是這個流派的「筆觸」，不要用濾鏡代替）
if(weave===1) g += Math.sin(u*w*0.85)*0.085;                              // 燈芯絨／羅紋：直溝
if(weave===2) g += (Math.sin((u+v)*w*.55)+Math.sin((u-v)*w*.55))*0.038;   // 丹寧：斜紋
if(weave===3) g += (((x>>1)+(y>>1))%2)*0.075;                             // 平織細格
```

無 JavaScript 時的備援：同一個形狀以**實心黑剪影**呈現（SVG `<use>` 引用共用的 `<defs>` 路徑），損傷以白色圓點標在同樣的座標上。形狀與傷的位置完全一致，只是少了點陣的灰。

**明文禁用**：`feTurbulence`／`feDisplacementMap` 的手抖濾鏡（那是迷幻海報的語彙，而且會糊掉字緣）、半調圓網點（那是普普，不是影印機）、細線幾何線描、任何寫實照片、任何連續灰階。

---

## 九、Logo 與 Favicon 設計指南

Logo 的組成永遠是三件事：**一個實心黑的物件剪影 ＋ 一塊 1-bit 點陣的字塊 ＋ 一道螢光橘的斜線劃過去。**

那道斜線是這個流派的手勢——它代表「有人拿筆在印好的東西上面又畫了一下」。它必須：

- 是**直線**、寬度 6–8px、角度介於 −20° 至 −8°
- **壓在所有東西上面**（畫在最後）
- 是唯一的彩色

Favicon（inline SVG data URI，不要外部檔案）：

```html
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%23E4E1D8'/%3E%3Cpath d='M8 4h16l3 7-11 17L5 11z' fill='%2316151A'/%3E%3Ccircle cx='16' cy='10' r='2.6' fill='%23E4E1D8'/%3E%3Cpath d='M3 21l26-9' stroke='%23FF4A17' stroke-width='3'/%3E%3C/svg%3E">
```

---

## 十、Do & Don't

**Do**

- 先決定「破壞的資料來源是什麼」，再開始排版
- 讓標題被畫布切掉一半
- 用 `steps()` 而不是 `ease`：這個流派的動作是機械的（影印機、拉桿、印章），不是滑順的
- 把表格、價目、規章排得整整齊齊——對比才產生意義
- 把「讀順版」固定在每一頁的同一個位置

**Don't**

- ❌ 不要為了看起來很兇而破壞。沒有來源的崩壞是雜訊
- ❌ 不要動內文的可讀性：內文永遠水平、可選取、對比 ≥4.5:1
- ❌ 不要用漸層、圓角、模糊陰影、半透明——一個都不行
- ❌ 不要用連續灰階；灰只能是黑點的疏密
- ❌ 不要用紫藍漸層 hero、置中大標＋兩顆按鈕＋三張圓角卡片、emoji 當 icon、Lorem ipsum、「EST. 19xx」徽章
- ❌ 不要把螢光色拿去當地色或放進正文
- ❌ 不要用旋轉角度大於 10 度的元素（那變成裝飾了）
- ❌ 不要在沒有出口的情況下讓任何一段文字讀不出來——這是本流派唯一的道德底線

---

## 十一、頁面骨架範例（可直接使用）

```html
<!DOCTYPE html>
<html lang="zh-Hant">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>頁名｜品牌</title>
<link rel="icon" href="data:image/svg+xml,…">
<link href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Courier+Prime:wght@400;700&family=Noto+Sans+TC:wght@700;900&family=Noto+Serif+TC:wght@400;700&display=swap" rel="stylesheet">
<style>/* 見第二～七章 */</style>
</head>
<body data-page="index">
<a class="skip" href="#main">跳到內容</a>
<div class="grain" aria-hidden="true"></div>
<div class="scan"  aria-hidden="true"></div>

<div class="rig">
  <!-- 疊層刊頭：拉丁字被右緣切掉，中文壓在它身上 -->
  <header class="mast cut">
    <div class="zn">BRAND-NAME</div>
    <div class="cn">中文品牌</div>
    <div class="iss">分類／地點<b>31</b>2026 年 8 月</div>
    <div class="kick">一句沒有形容詞的宣告</div>
  </header>

  <!-- 吊牌劃價導覽 -->
  <nav class="tags" aria-label="主導覽">
    <span class="rail" aria-hidden="true"></span>
    <a class="tag cur" href="index.html" aria-current="page">
      <span class="hl" aria-hidden="true"></span>
      <span class="pn"><s>P.01</s> <em>正在讀</em></span>
      <span class="pt">頁名</span><span class="pe">副標</span>
    </a>
    <a class="tag" href="two.html"><span class="pn">P.02</span>
      <span class="pt">頁名</span><span class="pe">副標</span></a>
  </nav>

  <main id="main">
    <!-- 多欄內文：破壞就發生在這裡 -->
    <div class="col" id="body">
      <p>…</p>
      <h3>橫貫整組欄的標題</h3>
      <p>…</p>
    </div>

    <!-- 對帳用的東西：這裡不准破 -->
    <table><tbody><tr><th>項目</th><td>值</td></tr></tbody></table>
  </main>

  <footer class="ft">…地址、電話、營業時間、負責人姓名…</footer>
</div>

<button class="btn readmode" id="readbtn" type="button" aria-pressed="false">讀順版</button>
<script>/* applyDamage()、readMode()、dither()、四種動效 */</script>
<noscript><style>.rig,.scan{animation:none}.readmode{display:none}</style></noscript>
</body></html>
```

---

## 十二、技術實作與相容性

本站的三項核心技術、查證來源、不支援時的具體行為與效能實測。

### 1. CSS Custom Highlight API（C 版面與樣式層）

**承載什麼**：特徵 5 與簽名動效裡的「汙漬」。汙漬要蓋在真實內文上，但**不可以動 DOM**——一旦用 `<span>` 包住文字，選取範圍會被切斷、搜尋會失效、螢幕閱讀器會多讀出片段。Custom Highlight API 讓我們對一段 `Range` 上色而完全不碰 DOM。

```js
const H = new Highlight();
const r = new Range(); r.setStart(textNode, a); r.setEnd(textNode, b);
H.add(r);
CSS.highlights.set("flaw-toner", H);      // 移除：CSS.highlights.delete("flaw-toner")
```
```css
::highlight(flaw-toner){background-color:#16151A;color:#E4E1D8;text-shadow:1.5px 0 0 #33313A}
```

**支援現況（2026-08-12 查證）**：MDN《CSS Custom Highlight API》標示 **Baseline 2025 Newly available**——自 2025 年 6 月起跨瀏覽器可用。Chrome/Edge 105+（2022-09）、Safari 17.2+、Firefox 140（2025-06 補上最後一塊）。來源：MDN `Web/API/CSS_Custom_Highlight_API`、caniuse `mdn-api_highlight`。

**限制與 fallback**：`::highlight()` 只能設定有限的屬性（`color`／`background-color`／`text-decoration`／`text-shadow`／`-webkit-text-stroke`），不能設定字級或位移——所以汙漬只能是「蓋上去的一塊」，不能是「把字推走」（推字的工作由浮動障礙物負責）。不支援時 `typeof Highlight === "undefined"`，整段跳過：**文字以正常樣式呈現，一個字都不會少，只是那幾個字沒有被弄髒**。汙漬的資訊本來就同時以文字列在傷勢清單裡（「前胸汙漬（中）」），因此資訊零損失。

### 2. CSS 多欄版面 column-span / break-inside / column-rule（C 版面與樣式層）

**承載什麼**：特徵 1 與簽名動效的舞台。只有多欄會讓文字真的在欄與欄之間**流動**——CSS Grid 與 Flex 都不會。「脫線」那道傷做的事就是改 `column-gap` 與 `column-rule-style`，而文字會自己重新分配到各欄；「破洞」是一個浮動元素放進段落，欄裡的字繞著它走。這兩件事在 Grid 上做不出來。

**支援現況（2026-08-12 查證）**：`column-span` 為 **Baseline Widely available**，自 2020 年 7 月起跨瀏覽器（最後一塊是 Firefox 71，2019-11，見 Mozilla Hacks〈Multiple-column Layout and column-span in Firefox 71〉）。多欄本體（`column-count`／`column-gap`／`column-rule`）更早。來源：MDN `Web/CSS/column-span`、Mozilla Hacks 2019-11。

**fallback**：無支援缺口。手機（≤560px）主動退成 `column-count:1;column-rule:none`——單欄下「拉開欄距」這個效果不成立，因此該傷改以段落左外距表達，其餘三種傷照常。

### 3. OffscreenCanvas + Worker + Floyd–Steinberg 誤差擴散（A 渲染層）

**承載什麼**：特徵 4。全站每一張圖都是即時算出來的 1-bit 點陣。**為什麼需要 OffscreenCanvas**：形狀是貝茲路徑，必須有一個 2D context 才能光柵化成遮罩；而首頁一次要算 24 張，放在主執行緒會擋住首屏。做法是把整支繪圖程式（六個純函式）用 `Function.prototype.toString()` 串起來丟進 Blob URL 建立的 Worker，主執行緒與 Worker **共用同一份原始碼**、零重複。

```js
var SRC=[gNoise,gShape,gDigits,gGray,gDither,gRender].map(f=>f.toString()).join("\n");
var W=new Worker(URL.createObjectURL(new Blob([SRC+
  ";self.onmessage=function(e){var j=e.data;var b=gRender(j);self.postMessage({id:j.id,w:j.w,h:j.h,buf:b},[b]);};"],
  {type:"text/javascript"})));            // buf 以 transferable 回傳，零複製
```

**支援現況（2026-08-12 查證）**：MDN 標示 OffscreenCanvas 為 **Baseline Widely available**，自 2023 年 3 月起跨瀏覽器。Chrome 69+（2018-09）、Firefox 105+（2022-09）、Safari 16.4+（2023-03）。來源：MDN `Web/API/OffscreenCanvas`、caniuse `offscreencanvas`。

**三級降級**（每一級都實測過）：

1. 有 Worker + OffscreenCanvas → 背景執行緒算，主執行緒只做 `putImageData`
2. 無 Worker 或建立失敗（`onerror` 會把 `W` 設回 `null`）→ 同一份函式在主執行緒跑，包在 `setTimeout` 裡不擋首次繪製；此時 `gRender` 自動改用 `document.createElement("canvas")` 光柵化
3. 無 Canvas／關閉 JavaScript → 頁面裡本來就有的**實心黑 SVG 剪影**留著（canvas 畫完才會把它隱藏），形狀與傷的座標完全一致

**效能實測（Node 22，單執行緒）**

- 24 件 150×190 的完整流程（灰階場合成＋誤差擴散）：**74.2 ms**，且全部發生在 Worker 裡，不計入首屏 JS
- 主執行緒首屏工作只有 24 次 `putImageData`
- 單頁大小（含 inline 的 CSS／JS／全部資料）：index 63.1KB、mend 61.5KB、zine 65.0KB、shop 68.0KB，**全部遠低於 350KB 上限**
- 環境動效每 6.6 秒只改一次 `background-position`；簽名動效只在使用者按下按鈕時重跑一次版面，**沒有每幀的 layout 讀寫，無 layout thrashing**

### 附帶：真實時刻驅動的劃價

價格不是寫死的。每次載入都用 `Date.now()` 與該件的入店日期算出在店週數，每滿三週劃一次價（×0.88），最多三次；牌子上被劃掉的那幾個數字是真的算出來的。這也是唯一會隨時間改變畫面的機制，且有上限（第 12 週後不再降），不會無限漂移。

```js
function weeks(d){return Math.floor((Date.now()-Date.parse(d+"T00:00:00Z"))/6048e5);}
function strikes(d){return Math.max(0,Math.min(3,Math.floor(weeks(d)/3)));}
function factor(d){return Math.pow(0.88,strikes(d));}
```
