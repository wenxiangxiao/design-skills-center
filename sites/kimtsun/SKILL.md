---
name: grunge-raygun
description: Early-1990s deconstructed magazine typography (David Carson / Ray Gun / Emigre) — glyph-wise typeface swapping, 1-bit halftone imagery, gridless bleed-and-trim layout, two inks plus one fluorescent, and visible paste-up marks.
---

# GRUNGE ／ RAY GUN　解構排版風格規格書

> 這份規格描述的是 1990 年代初，桌上排版把「字」變成可以任意處理的圖像之後，
> 由 David Carson 在《Beach Culture》(1989–91) 與《Ray Gun》(1992–95) 定型的那套版面語言。
> 它不是「亂排」，它有一組非常明確、可以逐條驗收的規則。

---

## 一、設計哲學

### 1.1 它為什麼長成這樣

1984 年 Macintosh 與 Aldus PageMaker 上市，1987 年 QuarkXPress、1988 年 Fontographer。
在此之前，字級、字距、字體是印刷廠的資產；在此之後，它們變成設計師桌上可以逐字拖動的數值。
第一批把這件事推到底的人不是為了好看，是為了**反對瑞士國際主義那套「易讀性即道德」的教條**：

- **David Carson**（1955–）原本是職業衝浪手（1980 年代世界排名第八）與高中社會科老師，沒有受過正規平面設計訓練。他做的第一本雜誌是《Transworld Skateboarding》(1984)，接著《Beach Culture》(1989–91，六期，拿了 160 個設計獎）、《Surfer》，然後是《Ray Gun》(1992–95)。他最有名的一件事：把 Bryan Ferry 的專訪整篇設成 Zapf Dingbats——他認為那篇稿子無聊到不值得被讀。
- **Rudy VanderLans ＆ Zuzana Licko**（Emigre 雜誌與字體公司，1984–2005）：Licko 的 Oakland／Emperor 是為了 72dpi 螢幕與 300dpi 雷射印表機而設計的點陣字——**低解析度不是缺點，是材料**。
- **Neville Brody ＆ Jon Wozencroft**（FUSE，1991–）：把字體當成可被拆解的實驗對象。
- **April Greiman**《Does It Make Sense?》(1986，Design Quarterly 133)：一張 2×6 英尺的 MacDraw 點陣拼貼，早於 Carson 六年。

技術限制寫進了樣子：稿子是**影印**出來的（所以只剩黑白、中間調是網點）、標題是**剪貼**上去的（所以每個字的字體與大小不一樣、貼歪了沒扶正）、圖是**翻拍再影印**的（所以糊、爆黑、掉中間調）。

### 1.2 三條不可退讓的原則

1. **字是圖像，不是文字容器。** 標題可以被裁掉、疊住、旋轉、逐字換字體。
2. **版面沒有網格，只有裁切線。** 元素越過版心、被視窗邊緣切斷，是設計而不是意外。
3. **正文絕對不玩。** 這是把這套風格從「不可用」救回來的唯一一條紀律：
   內文字級固定、行距固定、對比 ≥ 7:1、可選取、不旋轉、不換字面。
   要玩的只有**標題、頁碼、引言、對白**這四種角色。

### 1.3 反層級（anti-hierarchy）

傳統版面：標題最大 → 副標 → 內文 → 說明。
本風格：**版面上最大的東西不保證是最重要的資訊**。頁碼可以比標題大；圖說可以比標題搶眼；
標題可以只有一半在畫面裡。讀者是靠「找」而不是靠「掃」在讀這一頁。
但——資訊必須**找得到**。所有被玩壞的角色，其內容一定在別處以一般文字完整重複一次（頁尾、表格、noscript）。

---

## 二、本風格的 5 個不可省略特徵

> 拿掉其中任何一項，它就不再是 Ray Gun，只是「有點亂的網頁」。

### 特徵 1（字體選擇）｜逐字換面 glyph-wise face-swap

**同一個詞裡，每一個字的字體、字級、基線、角度都不一樣。** 這是剪貼台上的物理事實：
每個字是從不同的印刷品上剪下來的。這是本風格最短的辨識路徑——看到一個詞裡有四種字體，就是它。

```html
<h1 class="sw">
  <i class="f0" style="font-size:1.31em;transform:translateY(-.14em) rotate(-4.2deg)">金</i><i
     class="f3" style="font-size:0.72em;transform:translateY(.19em) rotate(6.1deg)">樽</i><i
     class="f1" style="font-size:1.44em;transform:translateY(-.06em) rotate(2.0deg)">七</i><i
     class="f2" style="font-size:0.88em;transform:translateY(.11em) rotate(-7.4deg)">號</i>
</h1>
```

```css
.sw   { display:inline-block }
.sw i { font-style:normal; display:inline-block; vertical-align:baseline; line-height:.86 }
/* 五套「面」。中文沒有五套現成字面，就用「襯線與否 × 字重 × 合成斜體 × 字距」造出五種 */
.f0{font-family:Anton,"Noto Sans TC",sans-serif;font-weight:400}
.f1{font-family:"Noto Serif TC",serif;font-weight:900}
.f2{font-family:"Courier Prime","Noto Sans TC",monospace;font-weight:700;letter-spacing:.06em}
.f3{font-family:Caveat,"Noto Serif TC",cursive;font-weight:700;font-style:italic}
.f4{font-family:"Noto Sans TC",sans-serif;font-weight:900}
```

產生器（決定性：同一段字＋同一個 seed 恆得同一種排法）：

```js
function fnv(s){var h=2166136261>>>0;for(var i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)>>>0;}return h>>>0;}
function mul(a){return function(){a|=0;a=a+0x6D2B79F5|0;var t=Math.imul(a^a>>>15,1|a);
  t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}

/* d = 離散度 0..1。0 = 全部同一套面；1 = 五套面全用、字級差兩倍、歪 8.5 度 */
function swap(el,text,d,salt){
  var r=mul(fnv(text+'|'+salt+'|'+Math.round(d*100))), pool=1+Math.round(d*4), out='';
  for(var i=0;i<text.length;i++){
    var c=text[i]; if(c===' '){out+=' ';continue;}
    out+='<i class="f'+Math.floor(r()*pool)+'" style="'+
      'font-size:'+(1+(r()*2-1)*(0.06+d*0.56)).toFixed(3)+'em;'+
      'transform:translateY('+((r()*2-1)*d*0.27).toFixed(3)+'em) rotate('+((r()*2-1)*d*8.5).toFixed(2)+'deg);'+
      'letter-spacing:'+((r()*2-1)*d*0.06).toFixed(3)+'em">'+c+'</i>';
  }
  el.className='sw'; el.innerHTML=out;
}
```

**離散度就是資訊。** 建議把 `d` 綁在某個狀態上（本站綁在店主的耐性與你猜錯幾次），
讓「字散開的程度」變成可讀的讀數，而不是裝飾。d 的建議範圍：
標題 0.45–0.75、章節 0.22–0.32、對白 0.06–0.88（動態）。**正文一律 0（不套）。**

### 特徵 2（裝飾母題）｜一位元半調影像 1-bit halftone

**站上不能有一張連續調的圖。** 所有圖像只有兩個顏色，中間調用網點裝出來，
而且**點要大到數得出來**——那是「這張圖被影印過」的證據。

作法：把任何連續調的場 `f(x,y) → 0..1` 過一張 Bayer 8×8 有序抖動矩陣：

```js
var B8=[[0,32,8,40,2,34,10,42],[48,16,56,24,50,18,58,26],
        [12,44,4,36,14,46,6,38],[60,28,52,20,62,30,54,22],
        [3,35,11,43,1,33,9,41],[51,19,59,27,49,17,57,25],
        [15,47,7,39,13,45,5,37],[63,31,55,23,61,29,53,21]];
function ditherTo(cv,w,h,f,ink,paper){
  cv.width=w; cv.height=h; var ctx=cv.getContext('2d'); if(!ctx) return false;
  var im=ctx.createImageData(w,h), p=im.data, k=0;
  for(var y=0;y<h;y++)for(var x=0;x<w;x++){
    var v=f(x,y); v=v<0?0:v>1?1:v;
    var c=(v>(B8[y&7][x&7]+0.5)/64)?paper:ink;
    p[k++]=c[0];p[k++]=c[1];p[k++]=c[2];p[k++]=255;
  }
  ctx.putImageData(im,0,0); return true;
}
```

```css
/* 低解析度算，放大顯示 —— 點才會粗到看得見 */
img,canvas{ image-rendering:pixelated; image-rendering:crisp-edges }
/* 例外：縮小顯示時 pixelated 會產生摩爾紋，改回平滑（看起來像影印再縮印，仍然合格） */
@media (max-width:700px){ .bimg img,.rrow img{ image-rendering:auto } }
```

**選 Bayer 有序抖動而不是誤差擴散（Floyd–Steinberg）的理由**：有序抖動留下的是**規則網格**，
那正是印刷網點的樣子；誤差擴散留下的是雜訊顆粒，那是噴墨的樣子。

### 特徵 3（版面手法）｜無網格・出血・裁切 bleed & trim

沒有統一外邊距。元素**越過版心**、被視窗邊緣**切斷**。至少要有三件事同時發生：
(a) 一張圖從左邊出血；(b) 一條規線從右邊出血；(c) 一個標題的第一個字被左緣裁掉一半。

```css
html,body{ overflow-x:clip }                 /* 讓「被裁掉」成立，且不長出水平捲軸 */
.sheet  { max-width:1160px; margin:0 auto; padding:0 30px }
.bleedL { margin-left:  calc(-1 * min(13vw,180px)) }
.bleedR { margin-right: calc(-1 * min(13vw,180px)) }
/* 標題直接跨出版心，並被視窗左緣切掉 */
.mast   { margin-left: calc(-1 * min(9vw,120px)); font-size:clamp(46px,13.4vw,152px); line-height:.74 }
/* 1–3 度的歪：貼歪了沒有扶正 */
.tl1{transform:rotate(-1.5deg)} .tl2{transform:rotate(2.2deg)}
.tl3{transform:rotate(-.75deg)} .tl4{transform:rotate(1.1deg)}
```

導覽也適用：本站的四個頁碼不排成一列，而是沿右緣散在四個不同高度、四個不同角度上；
**現用頁那一個被推出裁切線外，數字被視窗邊緣切掉一半**——現用態不是被標示，是被裁掉。

### 特徵 4（色彩規則）｜兩塊墨 ＋ 一塊螢光

影印機只有黑；螢光是另外一台網版印刷機加的。所以整站只有**三個顏色階層**：

| 色 | hex | 佔比 | 用途 |
|---|---|---|---|
| 影印紙灰 | `#CDC9BE` | ~34% | 唯一大面積地色。永遠帶一層 3px 的網點紋，不准是純白也不准鋪紙纖維 |
| 曝白 | `#F4F2EC` | ~18% | 被影印機「爆掉」的高光：所有卡片、表格、圖框的底 |
| 影印黑 | `#100F0D` | ~30% | 全部文字、3px 實線框、反白塊 |
| 中灰網 | `#7E7C74` | ~8% | 只給停用態與次要說明；它本身應該是網點裝出來的灰 |
| 螢光黃綠 | `#DCFF1E` | ~10% | 唯一彩色 |

```css
:root{ --paper:#CDC9BE; --paper2:#F4F2EC; --ink:#100F0D; --mid:#7E7C74; --acid:#DCFF1E; }
/* 紙上永遠有網點 */
body::before{content:"";position:fixed;inset:0;pointer-events:none;z-index:1;
  background-image:radial-gradient(var(--ink) .9px,transparent 1px);
  background-size:3px 3px;opacity:.20}
```

**螢光色的鐵則：它只能當底，不能當字。**
`#DCFF1E` 對紙灰的對比只有 1.4:1，拿它當連結色就是把可讀性丟掉。
正確用法是 `background:var(--acid); color:var(--ink)`（17:1）。
深底時可以反過來（`--acid` 字壓在 `--ink` 上，17:1），但**淺底上永遠不行**。

### 特徵 5（形狀語彙）｜剪貼台痕跡 paste-up marks

畫面必須看得出來是「剪下來、貼上去」的東西，不是螢幕上長出來的：

```css
*{border-radius:0}                                  /* 零圓角，一個都不行 */
.card{border:3px solid var(--ink);background:var(--paper2)}   /* 粗實線框，不是細線 */
.knock{background:var(--ink);color:var(--paper2);padding:.22em .5em .3em;display:inline-block}
.shadow{box-shadow:6px 6px 0 var(--ink)}            /* 陰影一律實心位移，絕不模糊 */
.says{border-left:7px solid var(--ink);padding-left:13px}      /* 對白＝一條粗墨條 */
```

撕邊用折線多邊形，不要用濾鏡。CSS 版（本站的螢光標語條就是這個）：

```css
.torn{clip-path:polygon(
  0 8%,4% 0,9% 9%,15% 2%,22% 11%,29% 3%,36% 12%,44% 4%,52% 13%,60% 3%,68% 12%,76% 2%,84% 11%,92% 3%,100% 10%,
  100% 92%,93% 100%,85% 90%,77% 99%,69% 89%,60% 98%,51% 88%,42% 97%,34% 87%,26% 96%,18% 86%,10% 95%,3% 87%);
  padding:.5em .6em .6em}
```

SVG 版：

```svg
<path d="M0 62 L16 57 L32 64 L48 58 L64 65 L80 59 L96 66 L112 60
         L112 84 L96 79 L80 86 L64 80 L48 87 L32 81 L16 88 L0 83 Z" fill="#DCFF1E"/>
```

**明文禁用** `feTurbulence`／`feDisplacementMap` 做「手抖邊」——那是迷幻海報的語彙，
而且會糊掉字緣。這裡的不平整來自**剪刀與膠帶**，不是來自筆。

---

## 三、色彩系統

見特徵 4 的色票表。補充規則：

- **地色比例 1 : 1 : 0.3**（紙灰 : 墨 : 曝白）。畫面上墨的面積必須夠大——這是「影印過頭」的量。
- 長文一律在**曝白**或**紙灰**上，不在墨上；反白長文超過三行就是可讀性事故。
- 中灰 `#7E7C74` 是**唯一允許的中間調**，而且用途只有兩個：停用態、次要註記。不准用它做層級。
- 不准有第二個彩色。要強調第二件事，就換用「反白」而不是換顏色。
- 不准有任何漸層（`body::before` 的網點紋不是漸層，它是圖樣）。

---

## 四、字體系統

| 角色 | 字體 | 字級 | 字重／行高 |
|---|---|---|---|
| 刊頭 masthead | 逐字換面（五套） | `clamp(46px,13.4vw,152px)` | line-height .74 |
| 章節標題 | 逐字換面 d=.22–.32 | `clamp(30px,5.6vw,58px)` | .90 |
| 引言 lede | Noto Sans TC 900 | 19px | 1.62 |
| **正文** | **Noto Sans TC 400** | **15.5px** | **1.78 ／ letter-spacing .012em** |
| 圖說・標籤・數值 | Courier Prime 400 | 11.5px | 1.5 ／ letter-spacing .04em ／ uppercase |
| 價格・頁碼 | Anton | 27–46px | 1 |
| 手寫註記・回話 | Caveat 700 | 22px | 1.35 |

載入（唯一允許的外部資源）：

```html
<link href="https://fonts.googleapis.com/css2?family=Anton&family=Caveat:wght@700&family=Courier+Prime:wght@400;700&family=Noto+Sans+TC:wght@400;900&family=Noto+Serif+TC:wght@400;900&display=swap" rel="stylesheet">
```

**字級 scale 是刻意不成比例的**：11.5 → 15.5 → 19 → 27 → 58 → 152。
中間缺了一大段，就是為了讓「大」與「小」之間沒有過渡——版面上只有兩種尺度在打架。

---

## 五、版面與網格

- 版心 `max-width:1160px`，左右 padding 30px；桌機右側再留 104px 給散在邊上的頁碼。
- **跨頁（spread）是基本單位**：`grid-template-columns: 1.1fr .9fr`，中間一條 3px 實線當書溝，
  左頁放圖、右頁放資訊。標題橫跨兩頁並越過左緣。
- 傾斜只用 4 個固定角度（−1.5° / +2.2° / −0.75° / +1.1°），**不要隨機**——
  剪貼台上手的誤差是有限的幾種，隨機角度看起來像特效。
- 留白不對稱：某一欄的上緣可以比隔壁低 40px，不要對齊。
- **≤560px 一律把旋轉關掉**（`.tl1..4{transform:none}`）。手機上歪斜只會造成水平溢出，
  而且風格的識別已經由字面與網點承擔了。

---

## 六、元件配方

```css
/* 按鈕：粗框、方角、hover 直接翻成螢光，沒有過渡 */
.btn{font-family:"Courier Prime",monospace;font-weight:700;font-size:13px;letter-spacing:.06em;
  text-transform:uppercase;background:var(--paper2);color:var(--ink);
  border:3px solid var(--ink);padding:9px 15px;cursor:pointer;transition:none}
.btn:hover:not(:disabled){background:var(--acid)}
.btn.on{background:var(--ink);color:var(--acid)}
.btn:disabled{background:transparent;color:var(--mid);border-color:var(--mid)}
.btn:focus-visible{outline:4px solid var(--ink);outline-offset:3px}

/* 表格：表頭是反白墨條，隔列用 6% 墨當底（不是灰色，是網點的濃度） */
table{border-collapse:collapse;width:100%;font-size:13.5px}
th,td{border:1px solid var(--ink);padding:6px 9px;text-align:left;vertical-align:top}
th{background:var(--ink);color:var(--paper2);font-family:"Courier Prime",monospace;
   font-size:11px;letter-spacing:.08em;text-transform:uppercase;font-weight:400}
tbody tr:nth-child(2n){background:rgba(16,15,13,.06)}

/* 導覽：出血頁碼 trim-bleed folio */
.folios{position:fixed;top:0;right:0;height:100vh;width:120px;z-index:60;pointer-events:none}
.folio{position:absolute;pointer-events:auto;background:var(--paper2);
       border:3px solid var(--ink);padding:5px 8px 7px;text-align:center;text-decoration:none}
.folio b{display:block;font-family:Anton,sans-serif;font-size:30px;line-height:.82}
.folio:nth-child(1){top: 9vh;right:16px;transform:rotate(-4deg)}
.folio:nth-child(2){top:29vh;right: 4px;transform:rotate( 3deg)}
.folio:nth-child(3){top:50vh;right:22px;transform:rotate(-2deg)}
.folio:nth-child(4){top:71vh;right: 8px;transform:rotate( 5deg)}
.folio.cur{background:var(--acid);right:-40px;padding-right:44px}   /* 被裁切線切掉 */
.folio.cur b{font-size:44px}
@media(max-width:900px){                      /* 手機：收成頁首一列，並在頁尾另備完整文字連結 */
  .folios{position:static;width:auto;height:auto;display:flex;gap:6px;padding:10px 14px 0;flex-wrap:wrap}
  .folio{position:static!important;transform:none!important;flex:1 1 0;min-width:70px}
  .folio.cur{right:auto!important;padding-right:4px}
}

/* 表單：方角、粗框、等寬字 */
input,select,textarea{font-family:"Courier Prime",monospace;font-size:15px;
  background:var(--paper2);border:3px solid var(--ink);padding:8px 10px;color:var(--ink);width:100%}

/* 頁尾：整塊翻成墨底，連結是螢光 */
footer{background:var(--ink);color:var(--paper2);padding:42px 0 60px}
footer a{color:var(--acid);text-decoration:none;border-bottom:2px solid var(--acid)}
footer a:hover{background:var(--acid);color:var(--ink)}
```

---

## 七、動效規則

**核心紀律：整站沒有一條 ease 曲線。** 影印機是機械的，它一格一格走。
所有 `transition-timing-function` 與 `animation-timing-function` 一律 `steps()`，
需要「瞬間」的地方就直接 `transition:none`。四種動效缺一不可：

| 類 | 名 | 觸發 | 具體值 |
|---|---|---|---|
| ambient | 影印掃描帶 pass | 不需輸入，持續 | `translateY(-30vh → 112vh)`，11s，`steps(26,jump-none)`，`mix-blend-mode:multiply`，高 26vh |
| input | 逐字換面重排 | pointerover（每次進入一次） | 0ms，無補間，延遲 <100ms |
| transition | 落版 paste-up | 狀態／區塊切換 | `clip-path:inset(0 100% 0 0) → inset(0)`，340ms，`steps(5,jump-start)` |
| signature | 逐字換面作為狀態讀數 | 狀態改變 | 離散度 d 由狀態計算，字面／字級／基線／角度一次到位 |

```css
.scan{position:fixed;left:0;right:0;height:26vh;z-index:3;pointer-events:none;
  background:linear-gradient(180deg,rgba(16,15,13,0),rgba(16,15,13,.13) 46%,rgba(16,15,13,.02));
  mix-blend-mode:multiply;animation:pass 11s steps(26,jump-none) infinite}
@keyframes pass{from{transform:translateY(-30vh)}to{transform:translateY(112vh)}}

.paste{animation:paste .34s steps(5,jump-start) both}
@keyframes paste{from{clip-path:inset(0 100% 0 0)}to{clip-path:inset(0 0 0 0)}}

@media (prefers-reduced-motion:reduce){
  .scan{animation:none;transform:translateY(24vh);opacity:.55}  /* 停在定點，掃描帶仍在 */
  .paste{animation:none}                                        /* 直接是最終畫面 */
  *{transition:none!important}
}
```

**降級後資訊零損失**：掃描帶不承載資訊；落版只是進場；逐字換面在 reduced-motion 下
**停用 hover 重排**（那一則不承載資訊），但**保留由狀態計算的離散度**（那一則承載資訊）。

**禁用清單**：淡入式滾動揭示、視差、數字滾動計數、跑馬燈、模糊陰影、彈性 easing、
任何 `cubic-bezier`。這些都會把「機械」變成「有機」，一用就破功。

---

## 八、插畫與圖像風格

**零外部圖片。** 所有圖像都是「一個連續調的純量場 → Bayer 抖動 → 兩色點陣」的產物。
判準：**拿掉全部文字，仍然讀得出這張圖被影印過幾次。**

三種原語：

1. **調子場 tonal field**：`f(x,y) → 0..1`。用 value noise 疊幾層低頻正弦就夠了，
   不要用寫實描繪——反正過完網點只剩形狀。
2. **爆黑與掉白 blow-out**：把場的兩端硬鉗住（`v<0.12 → 0`、`v>0.9 → 1`），
   模擬影印機把暗部糊成一塊、把亮部整個丟掉。這一步不能省，它是「影印」的本體。
3. **可讀回的資訊**：圖上的每一塊斑點都應該對應一件可以被指名的事
   （本站：泛黃＝整體調子下降、壓凹＝一串小暗斑、分層＝雜訊門檻造出的斑駁塊、
   折斷＝一條橫過去的暗帶、撞裂＝從外形缺口放射出去的暗線）。
   **圖不是裝飾，圖是證據。**

```js
/* 決定性 value noise：同一個 seed 恆得同一張圖 */
function vnoise(seed){var r=mul(seed),g=new Float32Array(65536);
  for(var i=0;i<g.length;i++)g[i]=r();
  function G(i,j){return g[((j&255)<<8)|(i&255)];}
  return function(x,y){var xi=Math.floor(x),yi=Math.floor(y),fx=x-xi,fy=y-yi;
    function s(a,b,t){return a+(b-a)*t*t*(3-2*t);}
    return s(s(G(xi,yi),G(xi+1,yi),fx),s(G(xi,yi+1),G(xi+1,yi+1),fx),fy);};}
```

**圖的兩份輸出**：同一支場函式在建置階段輸出成 1-bit 調色盤 PNG（data URI，一張 560×142
只要約 1.8 KB）內嵌頁內，執行階段再用 `<canvas>` 重算一次。
因此**關掉 JavaScript 仍然看得到完整的圖**，canvas 只是增強。

---

## 九、Logo 與 Favicon 設計指南

**Logo**：三件事疊在一起就成立——(a) 一片半調點的梯度（點由大到小），
(b) 一個被反白挖出來的主體剪影，(c) 一條撕邊的螢光帶橫過去。
不要畫外框、不要畫圓、不要寫小字標語。

**Favicon**：16px 下只有三個元素讀得出來。用「墨底 ＋ 一條撕邊螢光帶 ＋ 一個粗筆畫的字符」。
一律原創 inline SVG data URI 寫在 `<head>`：

```html
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%23100F0D'/%3E%3Cpath d='M0 23l6-2 5 2 5-3 5 2 5-2 6 2v11H0z' fill='%23DCFF1E'/%3E%3Cpath d='M7 5h19v5L17 29h-7l9-19H7z' fill='%23F4F2EC'/%3E%3C/svg%3E">
```

---

## 十、Do & Don't

**Do**

- 一個詞裡至少出現三種字面。
- 至少有一個標題被視窗邊緣切掉。
- 所有圖只有兩色，網點大到數得出來。
- 陰影一律實心位移色塊；框線一律 3px 實線；圓角一律 0。
- 螢光色只當底。
- 正文完全不玩：固定字級、固定行距、對比 ≥7:1、可選取。
- 每一個被玩壞的角色，內容都在別處以一般文字完整重複一次。
- `≤560px` 關掉全部旋轉。

**Don't**

- ❌ 不要把正文也逐字換面。那不是這個風格，那是壞掉。
- ❌ 不要用 `feTurbulence` 做手抖／髒污濾鏡（那是迷幻海報的語彙，且會糊掉字緣）。
- ❌ 不要用漸層、模糊陰影、圓角卡片、玻璃擬態。
- ❌ 不要用 `cubic-bezier`／`ease-out`。只有 `steps()` 與 `none`。
- ❌ 不要用第二個彩色。
- ❌ 不要「EST. 19xx」徽章、不要 emoji 當 icon、不要 Lorem ipsum。
- ❌ 不要把隨機角度當風格：角度只有四個固定值。
- ❌ 不要為了亂而亂——**每一個被裁掉的東西，都要在別處找得回來**。

---

## 十一、頁面骨架範例

```html
<!DOCTYPE html>
<html lang="zh-Hant">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>頁名｜站名</title>
<link rel="icon" href="data:image/svg+xml,…">
<link href="https://fonts.googleapis.com/css2?family=Anton&family=Caveat:wght@700&family=Courier+Prime:wght@400;700&family=Noto+Sans+TC:wght@400;900&family=Noto+Serif+TC:wght@400;900&display=swap" rel="stylesheet">
<style>/* 見第三～七章，全部 inline */</style>
</head>
<body>
<div class="scan" aria-hidden="true"></div>

<nav class="folios" aria-label="頁碼">
  <a class="folio cur" href="index.html" aria-current="page"><b>01</b><s>跨頁<br>SPREAD</s></a>
  <a class="folio" href="two.html"><b>02</b><s>…</s></a>
  <a class="folio" href="three.html"><b>03</b><s>…</s></a>
  <a class="folio" href="four.html"><b>04</b><s>…</s></a>
</nav>

<main class="sheet">
  <section class="spread">
    <h1 class="mast" data-swap="0.64" data-fix="1">刊頭</h1>       <!-- 越過左緣、被裁 -->
    <p  class="mast2">副刊頭</p>                                   <!-- 螢光底、歪 3.2° -->
    <div class="verso">                                            <!-- 左頁：圖 -->
      <p class="runhead mono">刊名／期數／日期</p>
      <figure class="wv">
        <img src="data:image/png;base64,…" alt="…">                <!-- 建置階段的 1-bit 圖 -->
        <canvas hidden></canvas>                                   <!-- 執行階段重算 -->
        <figcaption class="cap">圖說</figcaption>
      </figure>
    </div>
    <div class="recto">                                            <!-- 右頁：資訊 -->
      <dl class="info"><dt>在哪裡</dt><dd>…</dd><dt>電話</dt><dd>…</dd></dl>
    </div>
  </section>

  <hr class="rule bleedR">
  <p class="acid tl2 mono">一條歪掉的螢光標語條</p>

  <section class="two">
    <div><h2 class="sec tl3" data-swap="0.30">章節</h2><table>…</table></div>
    <div class="body tl4"><p>正文。這裡完全不玩。</p></div>
  </section>
</main>

<footer><!-- 全部頁面的文字連結 ＋ 聲明，一律在這裡完整重複一次 --></footer>
<script>/* fnv / mul / swap / ditherTo / vnoise，全部 inline */</script>
</body>
</html>
```

---

## 十二、技術實作與相容性

### 12.1 所用 API 的支援現況（2026-08-14 查證）

| 技術 | 層 | 支援現況與查證來源 | 不支援時的具體行為 |
|---|---|---|---|
| `Canvas 2D` `createImageData` / `putImageData` | A 渲染 | MDN《CanvasRenderingContext2D》：Baseline **Widely available**，2015-07 起跨瀏覽器 | `getContext('2d')` 回 null 時 `ditherTo()` 直接 `return false`，頁面留在建置階段輸出的靜態 1-bit PNG。**圖一張都不會少，只是不會隨時刻重算。** |
| `steps()` easing（含 `jump-start` / `jump-none`） | B 動效 | MDN《steps() CSS function》：Baseline **Widely available**，2015-07 起跨瀏覽器；第二參數省略時預設 `end`；`jump-none` 要求第一參數 >1 | 舊瀏覽器忽略整條 `animation`，掃描帶靜止、落版直接是最終畫面，資訊零損失 |
| 決定性偽隨機 FNV-1a → mulberry32 ＋ URL 狀態序列化 | E 生成 | 純 JavaScript（`Math.imul` 為 ES6，2016 起全面支援），無瀏覽器 API 依賴 | 無支援缺口。`?d=` 分享碼以 `btoa`／`atob`（Baseline Widely available）編碼，解碼失敗時靜默略過，頁面照常可用 |

**被查掉的技術（記錄下來，免得下一個人再踩）**：原本打算用 **CSS anchor positioning**
把圖說錨在正文的任意片段上。2026-08-14 查 MDN《position-anchor》，其 Baseline 標記為
**Limited availability**（「not Baseline because it does not work in some of the most widely-used browsers」），
MDN 該頁並明載示範在 Firefox 不作用（Firefox bug 1993699）。
網路上多篇 2025–2026 的部落格宣稱它已是 Baseline 2026、Firefox 132 起支援——**與 MDN 的相容性表格不符**。
本站因此不採用它，改以 `position:absolute` ＋ 固定角度達成同樣的視覺。
**憑印象或憑二手部落格宣稱支援，是這一類專案最容易出事的地方。**

### 12.2 效能預算實測

| 項目 | 門檻 | 實測 |
|---|---|---|
| 單頁大小（含全部 inline 影像／CSS／JS） | ≤350 KB | index 33.3 KB／rack **76.1 KB**／bay 27.4 KB／zine 20.0 KB |
| 首屏 JS 執行 | ≤100 ms | 浪的調子場 560×300 全格求值 **21.4 ms**（Node 22 單執行緒，含 65,536 格 value noise 建表）；逐字換面 23 個節點 <2 ms；合計約 25 ms |
| 板況圖重算 | — | 560×142 全格求值 **7.4 ms**（成交時才跑一次） |
| 主要動畫 | 60 fps | 唯一的持續動畫是 `.scan` 的 `transform:translateY`，合成執行緒處理、不觸發 layout；`steps(26)` 表示 11 秒內只有 26 次實際重繪 |
| layout thrashing | 無 | 全站不呼叫 `getBoundingClientRect()`；`swap()` 一次寫完 `innerHTML`，不做讀寫交錯 |

### 12.3 無 JavaScript 時

- 四頁全部資訊皆為可選取的一般 HTML 文字，導覽、表格、價目、板況一項不缺。
- 首頁的浪與九支板的板況圖是建置階段輸出的靜態 1-bit PNG（data URI），照常顯示。
- 逐字換面不會發生，標題退成一般標題——**內容完全一樣**。
- 需要 JavaScript 的只有議價互動；`<noscript>` 內另附完整表格，把九支板的全部傷勢、
  尺寸與開價一項不漏地列出來。

### 12.4 無障礙

- 正文對比：`#100F0D` on `#CDC9BE` ＝ **11.4:1**；`#F4F2EC` on `#100F0D` ＝ 18.4:1。
- 螢光 `#DCFF1E` 從不作為淺底上的文字色（1.4:1）；只作為底色，其上文字為 `#100F0D`（17:1）。
- 逐字換面後每個 `<i>` 內仍是真實字元，文字可選取、可複製、可被螢幕閱讀器讀出。
- 所有互動元件為原生 `<button>` / `<a>` / `<input>`，`:focus-visible` 為 4px 實心外框。
- `prefers-reduced-motion` 下停用掃描帶動畫、落版動畫與 hover 重排；狀態讀數保留。
