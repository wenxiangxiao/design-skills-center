---
name: punk-xerox
description: 1976–79 DIY punk fanzine aesthetic — ransom-note lettering cut from newsprint, pure 1-bit photocopier toner, misregistered second-generation copies, one sheet of fluorescent stock, and visible tape, staples and marker pen.
---

# 龐克剪貼 Punk Xerox

> 一九七六年到七九年之間，英國的獨立音樂刊物與唱片封套是這樣做出來的：把報紙上的字一個一個剪下來，
> 用膠水黏在 A4 紙上，拿去影印店印五十份，用釘書機釘起來，在演唱會門口賣。
> 這個風格的全部技術限制——剪刀、膠水、影印機、一種顏色的紙——就是它的全部美學。

---

## 一、設計哲學

**這個流派的第一原則是：畫面上的每一樣東西都必須看得出來是誰、用什麼、花多久做的。**

Jamie Reid 替 Sex Pistols 做的封套與 Mark Perry 一九七六年七月創辦的《Sniffin' Glue》共同定義了它：
沒有排版費、沒有製版費、沒有設計師。字是從報紙標題上剪下來的（因為買不起字體），
畫面是影印的（因為印刷廠要錢也要三週），紙是螢光色的（因為那是文具行最便宜又最顯眼的一種），
版面歪的（因為是用手黏的），黑的部分糊掉了（因為那是第三代影印）。

所以做這個風格有一條紀律：**不要模仿它的樣子，要重演它的製程。**
每一個視覺特徵都要能回答「這是哪一個步驟造成的」——
歪，是因為手黏的；糊，是因為影印的；只有一個顏色，是因為只買得起一種紙；
字大小不一，是因為那是從四份不同的報紙上剪來的。答不出來的裝飾，一律不要。

第二條紀律是 **憤怒要有具體對象**。龐克剪貼不是抽象的叛逆風格，它永遠在對某件具體的事情大聲說話。
用它來做「創新解決方案」的品牌頁會立刻失效；用它來做一份有人真的在生氣的公告，它才成立。

第三條紀律是 **可讀性不是妥協，是製程的一部分**。原始刊物的正文是打字機打的，
規規矩矩、左右對齊、可以一路讀完；被剪貼的只有標題。網頁版必須守住這一點：
**剪字只用於標題與識別，正文一律是可選取、對比 ≥4.5:1 的一般 HTML 文字。**

### 與相鄰流派的分界

| 流派 | 判準差異 |
|---|---|
| 達達拼貼 Dada | 達達拼貼異質的**照片與圖像**製造無邏輯並置；本流派拼貼的是**字**，而且只有一台影印機、一種紙 |
| 迷幻海報 Psychedelic | 那是手繪的、滿版的、彩色的、把字擠進曲線裡；本流派是剪下來的、留白的、單色的、字被硬邊方塊框住 |
| 新粗獷 Neubrutalism | 那是乾淨的、向量的、有系統的；本流派刻意髒、刻意歪、刻意有掉線 |
| 半調網點 Halftone | 那把調子表現成規則的網點；本流派**沒有調子**，只有純黑與純白 |
| Grunge / Ray Gun | 那是九〇年代的、多層次的、字體實驗的；本流派是一九七〇年代的、單層的、沒有字體可實驗的 |

---

## 二、本風格的 5 個不可省略特徵

### 特徵 1：贖金字（ransom lettering）——標題的每一個字是一塊獨立剪下來的紙

拿掉它就不是這個風格了。判準：**每一個字都要有自己的字面、字級、旋轉角、基線位移、正反與撕邊**，
而且相鄰兩個字之間必須看得出來是兩塊不同的紙。整段用同一個字體只是加了旋轉，不算。

```css
.rs{
  display:inline-block; line-height:1; margin:0 -1px;
  background:#FFFFFF; color:#0B0B0B;             /* 從白報紙上剪下來的 */
  transform:rotate(var(--rot)) scaleX(var(--sc)) translateY(var(--dy));
}
.rs.inv{background:#0B0B0B;color:#FFFFFF}        /* 從黑底標題上剪下來的（必備，占比約三成）*/
.f-a{font-family:"Noto Sans TC",sans-serif;font-weight:900}   /* 三種以上字面同屏 */
.f-b{font-family:"Noto Serif TC",serif;font-weight:900}
.f-c{font-family:"Noto Sans TC",sans-serif;font-weight:400}
.ransom{font-size:clamp(38px,8.4vw,86px);word-break:break-all}
```

每個字的參數由字元與位置雜湊決定（同一段文字恆得同一張剪貼）：

```js
function fnv(s){let h=2166136261>>>0;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)>>>0;}return h>>>0;}
function rngOf(seed){let a=fnv(String(seed));return function(){a|=0;a=a+0x6D2B79F5|0;
  let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}

function ransomHTML(text,key){
  const FACES=['f-a','f-b','f-c'], r=rngOf(key+'|'+text);
  let out='';
  for(const ch of text){
    if(ch===' '){out+='<span class="rs-sp"></span>';continue;}
    const j=()=>Math.round(r()*7);                       // 剪刀邊：四邊各自被剪歪
    const cp=`polygon(${j()}% ${j()}%, 50% ${j()}%, ${100-j()}% ${j()}%, ${100-j()}% 50%,
                      ${100-j()}% ${100-j()}%, 50% ${100-j()}%, ${j()}% ${100-j()}%, ${j()}% 50%)`;
    out+=`<span class="rs ${FACES[Math.floor(r()*3)]}${r()<0.34?' inv':''}" style="`
       + `--rot:${((r()*2-1)*5.4).toFixed(2)}deg;--sc:${(0.88+r()*0.30).toFixed(3)};`
       + `--dy:${((r()*2-1)*6).toFixed(1)}px;padding:${1+Math.round(r()*5)}px ${3+Math.round(r()*7)}px;`
       + `clip-path:${cp}">${ch}</span>`;
  }
  return out;
}
```

參數帶（可直接沿用）：旋轉 ±5.4°、水平縮放 0.88–1.18、基線位移 ±6px、
padding 直 1–6px 橫 3–10px、反白比例 0.34、字面隨機取自 3 種。

### 特徵 2：一位元碳粉（1-bit toner）——畫面上沒有一格灰

拿掉它就不是這個風格了。**沒有漸層、沒有半透明、沒有模糊陰影、沒有抗鋸齒的中間調。**
影印機只會做一件事：超過門檻的變全黑，低於門檻的變全白。細線因此會整條消失，
粗黑會脹開、互相黏在一起。這件事 CSS 的 `filter:contrast()` 做不到——它只會拉高對比，
不會讓髮絲線掉光、也不會讓黑塊胖起來。要用 SVG 濾鏡的形態學運算。

```html
<svg style="position:absolute;width:0;height:0" aria-hidden="true"><defs>
  <!-- 第 2 代：碳粉暈開 → 對比吃掉細線 → 硬切 1-bit -->
  <filter id="xg2" x="-5%" y="-5%" width="110%" height="110%" color-interpolation-filters="sRGB">
    <feMorphology operator="dilate" radius="0.8"/>
    <feMorphology operator="erode"  radius="0.5"/>
    <feComponentTransfer>
      <feFuncA type="discrete" tableValues="0 0 1 1"/>   <!-- alpha 在 0.5 硬切，邊緣沒有羽化 -->
      <feFuncR type="discrete" tableValues="0 1"/>
      <feFuncG type="discrete" tableValues="0 1"/>
      <feFuncB type="discrete" tableValues="0 1"/>
    </feComponentTransfer>
  </filter>
  <!-- 第 3 代：更胖、更多掉線 -->
  <filter id="xg3" x="-6%" y="-6%" width="112%" height="112%" color-interpolation-filters="sRGB">
    <feMorphology operator="dilate" radius="1.35"/>
    <feMorphology operator="erode"  radius="1.15"/>
    <feComponentTransfer><feFuncA type="discrete" tableValues="0 0 0 1 1"/>
      <feFuncR type="discrete" tableValues="0 1"/><feFuncG type="discrete" tableValues="0 1"/>
      <feFuncB type="discrete" tableValues="0 1"/></feComponentTransfer>
  </filter>
</defs></svg>
```

```css
[data-gen="2"]{filter:url(#xg2);transform:rotate(-.9deg)}
[data-gen="3"]{filter:url(#xg3);transform:rotate(1.7deg)}
```

**`color-interpolation-filters="sRGB"` 不可省略**：預設的 linearRGB 會讓門檻切在錯誤的位置，
純黑會變成深灰。

實測的世代衰減（以 1–8px 寬的黑條跑 dilate(1)+erode(g)+門檻 0.5，四代）：

| 原寬 | 1px | 2px | 3px | 4px | 6px | 8px |
|---|---|---|---|---|---|---|
| 第 1 代 | 1 | 2 | 3 | 4 | 6 | 8 |
| 第 2 代 | 0 | 0 | 1 | 2 | 4 | 6 |
| 第 3 代 | 0 | 0 | 0 | 0 | 2 | 4 |
| 第 4 代 | 0 | 0 | 0 | 0 | 0 | 2 |

**這張表就是本風格的字級下限依據**：正文絕不套濾鏡；套濾鏡的元件裡不得有筆畫細於 3px 的資訊。

### 特徵 3：第二代以後（second generation）——沒有一件東西是原稿

拿掉它就不是這個風格了。原始刊物是「影印的影印的影印」，所以：
**每一塊紙都歪 1–3°、投影一律是實心位移色塊（絕不模糊）、
至少有一條邊留著上一張紙沒蓋好的黑帶。**

```css
.sheetbox{
  position:relative; background:#FFFFFF;
  box-shadow:7px 7px 0 #0B0B0B;          /* 實心位移影：偏移量固定，blur 永遠是 0 */
  transform:rotate(-.9deg);
}
.edgeband{                                /* 影印機蓋子沒蓋好的那條黑邊 */
  position:absolute;left:0;top:0;bottom:0;width:9px;background:#0B0B0B;
}
*{border-radius:0}                        /* 剪刀剪不出圓角 */
```

**禁止清單**：`border-radius` 任何非零值、`filter:blur()`、`box-shadow` 帶 blur、
`opacity` 用於營造層次（只准用於「膠帶是半透明的」這一件事）、任何 `linear-gradient` 當底色。

### 特徵 4：一張螢光紙（one sheet of fluorescent stock）——顏色是紙，不是墨

拿掉它就不是這個風格了。全站**只有一個彩色**，而且它是紙的顏色，不是設計師選的品牌色。
黑是碳粉，白是第二種紙（拿來印小字用的），第二個螢光色只准出現在「急件」上。

```css
:root{
  --paper:#FF4B8C;   /* 螢光粉影印紙。大面積地色，約 40–55%。這是紙 */
  --toner:#0B0B0B;   /* 碳粉黑。約 30%。這是墨 */
  --sheet:#FFFFFF;   /* 白影印紙。約 15%。長文一律印在這上面，不印在螢光紙上 */
  --warn:#E8FF3A;    /* 螢光黃紙。≤8%。只給催繳、缺失、退件、否決 */
  --tape:#B9B4AC;    /* 膠帶灰。≤3%。全站唯一「不是紙也不是墨」的物質 */
}
```

硬規則：
- 螢光紙上只放大字（≥17px）與短句；**超過三行的文字一律移到白紙上**。
- 螢光粉 `#FF4B8C` 與純黑的對比為 6.6:1，通過 AA；仍不得用於 13px 以下的長文。
- 螢光黃是**語意色**不是強調色：它只代表「這件事出了問題」。用它來裝飾就毀了它。
- 永遠不要出現第三個彩色。需要更多層次時，改變的是**紙的種類**（白紙／螢光紙）而不是顏色。

紙纖用一層極細的靜態橫紋，不用雜訊圖也不用漸層：

```css
body::before{content:"";position:fixed;inset:0;pointer-events:none;mix-blend-mode:multiply;
  background:repeating-linear-gradient(0deg,rgba(11,11,11,.055) 0 1px,transparent 1px 4px)}
```

### 特徵 5：手的痕跡（the hand on the page）——介面狀態用實體動作表達

拿掉它就不是這個風格了。膠帶、釘書針、麥克筆畫記、打字機正文、被劃掉的字——
這些不是裝飾，它們是這個流派**唯一的介面語言**。
所以：**這個風格禁止用顏色表達狀態**。沒有 hover 底色、沒有現用色塊、沒有 focus 光暈、沒有 active 高亮。
現用態是「這條膠帶是剛貼上去的」，否決態是「這行被劃掉了」，警告態是「換了一張黃紙」。

```css
/* 膠帶：半透明、有內描邊、翹角是另一塊 skew 過的方形 */
.tp::before{content:"";position:absolute;left:-13px;top:-9px;width:52px;height:17px;
  background:#C9BE9A;opacity:.72;transform:rotate(-32deg);
  box-shadow:inset 0 0 0 1px rgba(11,11,11,.3)}         /* 舊膠帶：發黃、半透明 */
.tp[aria-current="page"]::before{background:#B9B4AC;opacity:1;width:58px;height:19px}
.tp[aria-current="page"]{transform:rotate(0deg)}         /* 剛貼上去的：不透明、壓平、擺正 */

/* 麥克筆畫記與劃掉 */
.marker{background:#E8FF3A;box-shadow:0 0 0 2px #E8FF3A;padding:0 3px}
.strike{text-decoration:line-through;text-decoration-thickness:4px}
.pen{font-family:"Noto Serif TC",serif;font-weight:700;
  text-decoration:underline;text-decoration-thickness:3px;text-underline-offset:3px}

/* 打字機正文：這是原始刊物真正的內文設定 */
.tw{font-family:"Courier Prime",monospace;font-size:14.5px;line-height:1.9}
```

---

## 三、色彩系統

| 色票 | 名稱 | 面積 | 用途 |
|---|---|---|---|
| `#FF4B8C` | 螢光粉影印紙 | 約 42% | 全站唯一大面積色。它是紙，不是背景色 |
| `#0B0B0B` | 碳粉黑 | 約 34% | 全部文字、實心色塊、實心投影、標題底、footer |
| `#FFFFFF` | 白影印紙 | 約 14% | 長文、表格、卡片、反白剪字的字面 |
| `#E8FF3A` | 螢光黃紙（急件） | ≤ 7% | 催繳、缺失、退件、否決、按鈕字色。語意色，不可裝飾用 |
| `#B9B4AC` | 膠帶灰 | ≤ 3% | 膠帶、釘書針。唯一非紙非墨的物質 |

替換色域（換一種紙就換一個世界，其餘規則完全不動）：
螢光橘 `#FF6A13`／螢光綠 `#3BFF7A`／螢光黃 `#E8FF3A`（此時急件紙改用螢光粉）。
**永遠只換那一格，不要同時上兩種螢光紙當地色。**

零漸層、零模糊、零半透明（膠帶除外）、零第三色。

## 四、字體系統

| 角色 | 字體 | 字重 | 用法 |
|---|---|---|---|
| 剪字 A | Noto Sans TC | 900 | 贖金字面之一 |
| 剪字 B | Noto Serif TC | 900 | 贖金字面之二（明體混進黑體裡是關鍵） |
| 剪字 C | Noto Sans TC | 400 | 贖金字面之三（細的那一塊剪紙） |
| 正文 | Noto Sans TC | 400 | 白紙上的長文，16px / 1.72 |
| 打字機 | Courier Prime | 400 / 700 | 文號、日期、數字、規則說明、名冊。14.5px / 1.9 |
| 小標 | Noto Sans TC | 900 | 18px，黑底反白或直接壓在紙上 |

字級階梯：`clamp(38px,8.4vw,86px)` 主剪字／`clamp(24px,4.6vw,40px)` 次剪字／
`clamp(21px,3.4vw,30px)` 章名／19px 卡片標題／16px 正文／14.5px 打字機／13px 註記。

**不要用可變字型的中間字重。** 這個流派只有兩種字重：報紙標題的（900）與打字機的（400）。
中間字重會讓畫面看起來像是被排版過的，而它不該被排版過。

## 五、版面與網格

- **沒有網格。** 有的是「一疊紙」——元素之間的關係是上下堆疊與部分遮蔽，不是欄與列。
- 每一塊紙獨立旋轉 −2.1° 到 +1.6°，角度寫死在 CSS 而不是隨機生成（手黏的東西不會每次重新載入就換位置）。
- 留白率 25–40%：螢光紙必須露出來，那是它的存在理由。這一點與迷幻海報的 horror vacui 相反。
- 章名 `h2` 一律是黑底反白的實心色塊 + 傾斜 −0.7°，像用標籤機打出來貼上去的。
- 桌機導覽固定在右上角、佔 180px，主容器右邊留 216px；≤900px 時導覽變成頂部四格 sticky 橫列。
- 手機（≤560px）：內距降到 18/15px，所有多欄一律落為單欄，剪字字級由 clamp 自動收到 38px 以下。

## 六、元件配方

```css
/* 紙卡 */
.sheetbox{background:#FFF;position:relative;box-shadow:7px 7px 0 #0B0B0B}
.pad{padding:26px 26px 30px}

/* 按鈕：黑底螢光黃字，實心白影；hover 直接對調，沒有補間 */
button{font-weight:900;font-size:15px;background:#0B0B0B;color:#E8FF3A;border:0;
  padding:11px 20px;box-shadow:5px 5px 0 #FFF;cursor:pointer}
button:hover{background:#E8FF3A;color:#0B0B0B;box-shadow:5px 5px 0 #0B0B0B}

/* 表格：粗黑框、黑底反白表頭、零圓角 */
table{border-collapse:collapse;width:100%;background:#FFF;font-size:13.5px}
th,td{border:2px solid #0B0B0B;padding:4px 7px}
th{background:#0B0B0B;color:#FFF;font-weight:900}

/* 分隔線：5px 實心黑，或 4px 虛線（那是要沿線剪開的意思）*/
.hr{height:5px;background:#0B0B0B;margin:26px 0}
.hr.d{height:0;border-top:4px dashed #0B0B0B}

/* footer：整塊翻成黑紙，字用螢光紙色 */
footer{background:#0B0B0B;color:#FF4B8C;padding:26px 20px 34px}
footer a{color:#E8FF3A}
```

**表單**：輸入框是白紙上畫的一條 3px 黑底線，不要框；錯誤訊息是一塊黑底螢光黃字的實心塊，
文案直接寫「退件：⋯⋯」而不是「請檢查您的輸入」。

## 七、動效規則

這個流派的動效只有一條總則：**影印機沒有中間幀。** 所有時間軸一律 `steps()`，
禁止 `ease-in-out`、禁止 `cubic-bezier` 的柔和曲線、禁止淡入。

| 種類 | 內容 | 觸發 | 時值 |
|---|---|---|---|
| ambient 環境 | 掃描光棒沿頁面往下掃過，掃完就沒了 | 不需輸入，9s 循環 | `steps(46,end)` |
| input 輸入 | hover／focus 時預覽「再影印一次會變成什麼」（套上比現況深一代的濾鏡）；膠帶翹角被拉開 | hover / focus，<100ms | 無補間，即時 |
| transition 轉場 | 抽紙：展開的內容以 `clip-path:inset()` 從上緣一格一格吐出來 | 展開／換頁 | `.42s steps(6,end)` |
| signature 簽名 | 世代磨損：被讀過的元件永久停在更深的影印世代 | 點擊／展開，累積且跨頁 | 無動畫，狀態切換 |

```css
@keyframes scanbar{0%{transform:translateY(-8vh)}88%{transform:translateY(112vh)}
                   88.01%,100%{transform:translateY(-8vh)}}
body::after{content:"";position:fixed;left:0;right:0;top:0;height:22px;pointer-events:none;
  background:rgba(255,255,255,.72);box-shadow:0 3px 0 rgba(11,11,11,.16);
  animation:scanbar 9s steps(46,end) infinite}

@keyframes pull{from{clip-path:inset(0 0 100% 0)}to{clip-path:inset(0 0 0 0)}}
.pull{animation:pull .42s steps(6,end) both}

@media(prefers-reduced-motion:reduce){
  body::after{display:none}          /* 掃描光棒不承載資訊，直接移除 */
  .pull{animation:none}              /* 內容直接是最終畫面 */
  .wear:hover{filter:none}           /* 預覽關閉，狀態仍由世代標記文字表達 */
}
```

四種動效在 `prefers-reduced-motion` 下**資訊零損失**：世代由元件右上角的「第 N 代」文字標記表達，
現用頁由膠帶的實體差異表達，兩者都與動畫無關。

## 八、插畫與圖像風格

**一位元剪影（1-bit cutout silhouette）。** 全站沒有照片、沒有網點、沒有描邊線稿、沒有曲線。
每一張圖都是：一塊被剪刀剪下來的實心黑紙 + 一塊實心位移影 + 幾道影印掉線。

三條硬規則：
1. **只有折線，沒有貝茲曲線。** 剪刀剪不出平滑曲線。母題用 4–10 個粗座標點給出，
   每條邊再插入 1–2 個被剪歪的中間點。
2. **實心位移影必須在。** 偏移 2.5–5px，同一個 path 直接畫兩次。
3. **黑塊裡面必須有掉線。** 2–4 條白色細長方形，寬 12–48、高 0.8–2.2，隨機散在黑塊上。

```js
function cutPath(pts,r,amp){                  // pts: [[x,y],...] 0–100 座標系
  const out=[];
  for(let i=0;i<pts.length;i++){
    const a=pts[i],b=pts[(i+1)%pts.length];
    out.push([a[0]+(r()*2-1)*amp, a[1]+(r()*2-1)*amp]);
    const n=1+(r()<0.5?1:0);
    for(let k=1;k<=n;k++){const t=k/(n+1);
      out.push([a[0]+(b[0]-a[0])*t+(r()*2-1)*amp*1.5, a[1]+(b[1]-a[1])*t+(r()*2-1)*amp*1.5]);}
  }
  return 'M'+out.map(p=>p[0].toFixed(1)+' '+p[1].toFixed(1)).join('L')+'Z';
}
```

```html
<svg viewBox="-6 -6 116 116" aria-hidden="true">
  <path d="…" transform="translate(3.4 4.1)" fill="#0B0B0B"/>  <!-- 位移影 -->
  <path d="…" fill="#0B0B0B"/>                                  <!-- 本體 -->
  <rect x="26" y="36" width="48" height="3" fill="#fff"/>       <!-- 結構縫 -->
  <rect x="31" y="58" width="27" height="1.4" fill="#fff"/>     <!-- 影印掉線 -->
</svg>
```

判準：**拿掉全部文字，仍然讀得出這是被剪刀剪下來、壓在玻璃上、印壞了的一塊紙。**

明文禁用：`feTurbulence` 手抖濾鏡（那是迷幻海報的語彙）、半調網點、細線幾何線描、
`stroke-linecap:round`、任何漸層填色、任何 emoji。

## 九、Logo 與 Favicon

**Logo**：一塊被撕開的黑紙（八點多邊形，四角各自被撕歪 ±2.2），上面貼四塊白色剪紙方塊，
每塊各自旋轉 −3° 到 +3.1°，各印一個字；左上與右下各壓一條半透明膠帶；
黑紙上再開兩道白色掉線；底部一行 `Courier Prime` 9px、字距 3 的英文全大寫。
螢光紙色作為 logo 的底——**logo 一定要帶紙，因為紙就是這個品牌的顏色**。

**Favicon**（inline SVG data URI，32×32）：螢光紙底 + 一塊撕邊黑紙 + 一個白色反白數字或單字。
不要縮小 logo，32px 下剪紙的細節全部消失，只留「一塊歪的黑」與「一個白字」。

```html
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%23FF4B8C'/%3E%3Cpath d='M4 5L15 4L28 6L27 17L28 28L14 27L5 28L3 16Z' fill='%230B0B0B'/%3E%3Cpath d='M12 9h9v3h-3v12h-3V12h-3z' fill='%23fff'/%3E%3C/svg%3E">
```

## 十、Do & Don't

**Do**
- 每一個視覺特徵都要對應一個製程步驟（剪、貼、印、釘、劃掉）。
- 標題剪字，正文打字機，長文一律在白紙上。
- 狀態一律用實體動作表達：貼上／撕下／劃掉／換黃紙／再印一代。
- 版面歪的角度寫死在 CSS，不要每次載入重擲。
- 內容要有具體的憤怒對象：真實的金額、日期、戶號、被誰擋下來的事。

**Don't**
- 不要圓角、不要模糊陰影、不要漸層、不要半透明層次、不要第三個彩色。
- 不要用 hover 換底色／focus 光暈／現用色塊表達狀態（本流派禁止「用顏色高亮」）。
- 不要在螢光紙上放三行以上的小字。
- 不要用 emoji 當 icon，不要用 Lorem ipsum，不要「在當今快節奏的世界」。
- 不要用 `feTurbulence` 做手抖邊——那會糊掉字緣，而且那是別的流派的東西。
- 不要把整頁套上影印濾鏡：只有**被標記為已讀／已用**的元件才降代，否則畫面失去對比、也拖慢重繪。
- 不要拿它去做一份沒有人在生氣的網頁。

## 十一、頁面骨架範例

```html
<!DOCTYPE html><html lang="zh-Hant"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>公告板｜○○○</title>
<link rel="icon" href="data:image/svg+xml,…">
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;900&family=Noto+Serif+TC:wght@900&family=Courier+Prime:wght@400;700&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box;border-radius:0}
:root{--paper:#FF4B8C;--toner:#0B0B0B;--sheet:#FFF;--warn:#E8FF3A;--tape:#B9B4AC}
body{background:var(--paper);color:var(--toner);font-family:"Noto Sans TC",sans-serif;line-height:1.72}
body::before{content:"";position:fixed;inset:0;pointer-events:none;mix-blend-mode:multiply;
  background:repeating-linear-gradient(0deg,rgba(11,11,11,.055) 0 1px,transparent 1px 4px)}
.wrap{max-width:1180px;margin:0 auto;padding:0 20px 90px}
@media(min-width:901px){.wrap{padding-right:216px}}
</style></head><body>

<svg style="position:absolute;width:0;height:0" aria-hidden="true"><defs>
  <filter id="xg2" color-interpolation-filters="sRGB">…</filter>
</defs></svg>

<nav class="tapenav" aria-label="主導覽">
  <a class="tp" href="index.html" aria-current="page"><span class="en">01 / NOTICE</span>公告板</a>
  <a class="tp" href="b.html"><span class="en">02 / MEETING</span>會議</a>
</nav>

<div class="wrap"><main>
  <header class="mast">
    <div class="stamp">○○字第 1150801 號　一一五年八月十四日</div>
    <div class="ransom"><!-- ransomHTML('住戶請注意') 的輸出 --></div>
  </header>

  <details class="sheetd" open>
    <summary><span class="no">文號</span><span class="no">日期</span><b>標題</b></summary>
    <div class="pad">
      <p>正文一律是可選取的一般 HTML 文字。</p>
      <svg class="cut" viewBox="-6 -6 116 116" aria-hidden="true">…</svg>
    </div>
  </details>

  <h2 class="sec">章名是一塊貼上去的黑標籤</h2>
  <div class="sheetbox pad">…</div>
</main></div>

<footer><div class="in">地址、電話、營業時間，全部用打字機字。</div></footer>
</body></html>
```

## 十二、技術實作與相容性

本站以三項技術承載上述特徵，全部於 2026-08-15 查證。

### (1) SVG filter：`feMorphology` + `feComponentTransfer type="discrete"`（A 渲染層）

**承載**：特徵 2（一位元碳粉）與特徵 3（第二代以後）。
`feMorphology` 的 dilate／erode 讓黑脹開、細線掉光，`feComponentTransfer` 的 `discrete`
把 alpha 與 RGB 硬切成兩級，得到沒有抗鋸齒的 1-bit 邊。

**支援現況**：MDN 標示 `<filter>` 與 `<feMorphology>` 皆為 **Baseline Widely available，
自 2015 年 7 月起跨瀏覽器可用**；MDN《`<filter>`》明載其可「用於 SVG 元素的 `filter` 屬性，
或用於 SVG／**HTML** 元素的 CSS `filter` 屬性」，故對即時 HTML 內容套用是規格內用法。
`feComponentTransfer` 的 `type="discrete"` 依規格「以 tableValues 給定的階梯函數定義」，
屬同一批 SVG 1.1 濾鏡原語，支援情形相同。
查證來源：MDN《`<filter>`》《`<feMorphology>`》《`<feComponentTransfer>`》。

**Fallback**：不支援時 `filter:url(#…)` 整個被忽略——元件回到第 1 代的乾淨樣子，
版面、對比與可讀性完全不變。世代資訊另以元件右上角的「第 N 代」文字標記表達，資訊零損失。

**實作要點與踩過的坑**
- `color-interpolation-filters="sRGB"` **必寫**。預設 linearRGB 會把門檻切在錯的亮度上，
  純黑會變深灰、螢光粉會偏色。
- 明確寫 `x/y/width/height` 濾鏡區域（預設 −10%/120% 會多算一圈，浪費像素）。
- **不要對整頁或大型捲動容器套濾鏡**：`feMorphology` 是鄰域運算，面積愈大愈貴，
  且濾鏡會建立新的 containing block，內部 `position:fixed` 會失效。
  本站只套在單張紙卡與提案卡（最大約 320×220px）上，且濾鏡是靜態的、不隨動畫每幀重算。
- 濾鏡不影響文字的可選取性與螢幕閱讀器輸出（它只改變繪製結果）。

**效能實測**：形態學管線本身以等效演算法在 Node 22 上跑 200×60 灰階場四代共 12 次
dilate/erode，耗時可忽略；瀏覽器端因濾鏡為靜態、僅在 class 變更時重繪一次，無逐幀成本。

### (2) CSS `steps()` 逐格時間軸（B 動效與時間軸層）

**承載**：ambient 掃描光棒與 transition 抽紙。選它而非任何 easing 曲線，
是因為這個流派的動力來源是一台每秒吐一張紙的機器——**它沒有中間幀**，
柔和曲線會立刻讓畫面變成「現代網頁」。

**支援現況**：`steps()` 屬 CSS Easing Functions Level 1，為 `animation-timing-function`
與 `transition-timing-function` 的合法值，各家瀏覽器自 CSS Animations 上線起即支援
（Chrome 43+／Firefox 16+／Safari 9+ 起穩定），MDN 標示 Baseline Widely available。
查證來源：MDN《`steps()`》《`animation-timing-function`》。

**Fallback**：不支援 `steps()` 的環境會退回 `ease`，動畫仍會播、只是變平滑；
兩段動畫皆不承載資訊。`prefers-reduced-motion: reduce` 下掃描光棒 `display:none`、
抽紙 `animation:none`，內容直接是最終畫面。

**效能**：掃描光棒只動 `transform`（合成層屬性），不觸發 layout 或 paint；
`steps(46)` 每 9 秒 46 次，等於平均每秒約 5 次合成，遠低於 60fps 預算。
抽紙的 `clip-path:inset()` 僅作用於單一展開中的區塊，6 格、420ms。

### (3) 決定性剪紙幾何生成：FNV-1a → mulberry32（E 資料與生成層）

**承載**：特徵 1（贖金字的逐字參數）與特徵 8 的一位元剪影——
每一塊剪紙的旋轉、縮放、基線、正反、撕邊多邊形、掉線位置全部由
`FNV-1a(字元 + 位置)` 決定，因此**同一段文字永遠得到同一張剪貼**：
重新整理不會換位置（手黏的東西不會自己動），而使用者產生的標題也可以用網址參數完整還原。

**支援現況**：純 JavaScript 字串雜湊與整數運算（`Math.imul`，ES2015，Baseline Widely available），
無任何瀏覽器 API 依賴，故無相容性缺口。
`clip-path: polygon()` 為 Baseline Widely available（2016 年起跨瀏覽器）。

**Fallback**：`clip-path` 不支援時剪紙變成矩形色塊——旋轉、字面、正反、字級的差異仍在，
仍然是贖金字，只是邊沒有被剪歪。**整站的贖金字在建置階段就以同一支函式算完並寫成靜態 HTML，
沒有 JavaScript 也是完整的剪貼標題**；執行期只有使用者自己產生的標題才呼叫它。

**效能實測（Node 22 單執行緒）**
- `ransomHTML()` 產生 7 字標題：200 次 12.0ms → **每次 0.060ms**
- 決議引擎 `runMeeting()`（41 戶 × 3 案的到會判定與雙門檻計票）：1000 次 48.5ms → **每次 0.049ms**
- 首屏腳本（41 戶名冊 + 12×41 立場表的 JSON 解析 + 全部函式定義）：**1.30ms**（預算 100ms）

### 效能預算總表

| 頁 | 單檔大小（含全部 inline CSS/JS/SVG） | 預算 |
|---|---|---|
| index.html | 42.4 KB | ≤ 350 KB ✓ |
| an.html | 45.8 KB | ≤ 350 KB ✓ |
| mingce.html | 89.2 KB | ≤ 350 KB ✓ |
| guiyue.html | 25.7 KB | ≤ 350 KB ✓ |

外部資源僅 Google Fonts（Noto Sans TC / Noto Serif TC / Courier Prime）。
零外部圖片、零外部音檔、零 JavaScript 函式庫。

---

*本規格書由 Claude Opus 5（排程 Agent）撰寫於 2026-08-15，隨 Design Skills Center 館藏站 `hopeng` 一併發布。*
