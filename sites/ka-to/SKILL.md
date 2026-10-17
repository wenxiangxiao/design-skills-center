---
name: saul-bass-cutpaper
description: Saul Bass cut-paper title & poster style — scissor-cut straight-segment silhouettes with jagged edges, one saturated ground plus black and bone paper, hand-cut jittered lettering, an object fragmented Anatomy-style with ground-colour gaps, and title-sequence motion grammar (bars, hard cuts, credits cards).
---

# Saul Bass 剪紙片頭與海報 Saul Bass Cut-paper Title & Poster

> 這是一份風格規格書。讀完它，你應該能做出一個和 Demo（鉸刀林，剪刀專門店）不同產業、但一眼看得出是同一個流派的網站。
> **本流派為既有設計史流派，非自創。**血緣：Saul Bass（1920–1996，紐約生、洛杉磯執業）。
> 1954 年替 Otto Preminger 的《Carmen Jones》做海報與片頭；1955 年《The Man with the Golden Arm（金臂人）》——片頭用一條條白色紙條在黑底上以越來越歪的角度滑進來，最後拼成一隻黑紙剪成的鋸齒手臂，海報與片頭共用這一個符號，配 Elmer Bernstein 的爵士樂；
> 1958《Vertigo》螺旋、1959《Anatomy of a Murder（桃色血案）》——一具被剪成七塊、塊與塊之間留著地色縫的人形剪影；1959《North by Northwest》、1960《Psycho》的橫豎灰條；1960《Exodus》。
> 參考：Jennifer Bass & Pat Kirkham《Saul Bass: A Life in Film & Design》（Laurence King, 2011）；Art of the Title 網站的 Bass 片頭檔案；MoMA 館藏海報。

---

## 一、設計哲學

Bass 的核心句是「把一部電影縮成一個符號」。他不畫場景、不畫明星臉，只剪**一個物件**——一隻手臂、一具身體、一把鑰匙——然後讓這個物件被切開、被錯開、在片頭裡被拼起來。

為什麼長這樣（製作限制決定了外觀）：

1. **剪刀與紙是最快的動畫材料。** 1950 年代的片頭預算低、要逐格拍攝；剪紙可以在拍攝台上一格一格推，不用賽璐珞描線上色。所以形狀全是剪刀剪得出來的：直線段為主、邊緣不齊、轉角是一刀一刀剪出來的折角，沒有貝茲曲線的光滑。
2. **彩色海報要便宜地印。** 一個飽和地色＋黑＋紙白，三版就能印完，所以畫面幾乎永遠是「一塊大色＋黑形＋白字」。
3. **片頭是時間裡的海報。** 字卡要在三秒內讀完，所以字很少、很大、壓在色塊上；畫面之間用硬切與滑入的長條，不用溶接。

三條心法：

- **一個物件，剪成碎片，留縫。** 碎片之間的地色縫是這個流派的簽名，不是失誤。
- **手剪的不完美是本體。** 字與形都要「看得出是人剪的」：每個字微微歪、基線跳、寬度不一。
- **不要漸層、不要陰影、不要描邊。** 紙就是紙。

---

## 二、本風格的 5 個不可省略特徵

拿掉任何一項，就不再是 Bass。

### 特徵 1：剪刀剪出的直線段鋸齒邊（形狀語彙）

所有圖形是**直線段多邊形**，每 9–22 單位一刀，頂點沿法線隨機偏移 ±1–2 單位；四角各自歪一點。零貝茲曲線、零描邊、零陰影、零圓角。圓（指環、太陽）一律用 7–12 邊形近似——剪刀剪不出正圓。

```js
// 決定性鋸齒：同 seed 永遠剪出同一刀
function mul(a){return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function jag(P,seed,step=12,amp=1.4){const r=mul(seed),out=[];
  for(let i=0;i<P.length;i++){const a=P[i],b=P[(i+1)%P.length],dx=b[0]-a[0],dy=b[1]-a[1],L=Math.hypot(dx,dy)||1,n=Math.max(1,Math.round(L/step)),nx=-dy/L,ny=dx/L;
    for(let k=0;k<n;k++){const t=k/n+(k?(r()-.5)*.45/n:0),o=(r()*2-1)*amp*(k?1:.35);out.push([a[0]+dx*t+nx*o,a[1]+dy*t+ny*o]);}}
  return out;}
// HTML 色塊：依實際像素尺寸算 clip-path（ResizeObserver 重算）
el.style.clipPath='polygon('+jag([[3,2],[w-5,0],[w,h-4],[1,h]],seed,22,1.3).map(p=>p[0].toFixed(1)+'px '+p[1].toFixed(1)+'px').join(',')+')';
```
```css
/* 無 JS 備援：手寫百分比鋸齒 */
.jag{clip-path:polygon(0 1.2%,6% 0,19% 1%,33% .2%,52% 1.4%,71% 0,88% 1%,100% .3%,99.3% 22%,100% 47%,99.2% 73%,100% 99%,81% 100%,60% 98.7%,38% 100%,17% 99%,0 100%,.8% 72%,0 44%,.6% 18%)}
```

### 特徵 2：一塊飽和地色統治，黑與紙白是剪出來的（色彩規則）

| 色 | hex | 比例 | 用途 |
|---|---|---|---|
| 朱橘紙 | `#E0522B` | ~38% | 唯一大面積地色、片頭推入色 |
| 墨黑紙 | `#141210` | ~30% | 主物件剪影、字卡底、導覽 |
| 骨白紙 | `#ECE2CC` | ~22% | 長文的紙、刃條、字 |
| 剪刀鋼灰 | `#9A9C97` | ≤6% | 軸、次要標籤 |
| 芥末 | `#E3A82B` | ≤3% | 只給現用態與 focus |

規則：任何時刻畫面上最多 3 個大色塊；零漸層、零透明疊色（opacity 只用於片頭的硬切顯示）、零模糊陰影。換產業時可以換地色（Bass 用過紅、橘、芥末、灰藍、粉），但只能有一個地色。墨黑字在朱橘上對比 4.8:1，長文仍一律放骨白紙（16.3:1）。

### 特徵 3：手剪不齊的字（字體選擇）

粗無襯線、全大寫英文（Londrina Solid 900）＋ 粗黑體中文（Noto Sans TC 900）；**每一個字單獨剪下來貼**：旋轉 ±3.5°、基線 ±0.05em、橫向 0.93–1.07 倍，決定性（同字串永遠同樣歪）。字一定壓在色塊上或從色塊挖出，不浮在空白上。小字（credits）用窄體大字距 0.14–0.3em。

```js
el.setAttribute('aria-label',txt);el.textContent='';const r=mul(hash(txt));
for(const c of txt){const s=document.createElement('span');s.className='ch';s.ariaHidden='true';s.textContent=c;
  s.style.transform=`translateY(${((r()-.5)*.1).toFixed(3)}em) rotate(${((r()-.5)*7).toFixed(1)}deg) scaleX(${(.93+r()*.14).toFixed(2)})`;el.append(s);}
```
```css
.ch{display:inline-block}
.cut{font-family:"Londrina Solid",sans-serif;font-weight:900;text-transform:uppercase}
.cred{font-family:"Archivo Narrow",sans-serif;font-weight:600;letter-spacing:.14em;text-transform:uppercase;font-size:.78rem}
```

### 特徵 4：解剖式碎片化——一個物件，剪成 4–7 片，留地色縫（版面手法＋母題）

主視覺只有一個物件（剪影），被 4–7 條**歪斜的鋸齒帶**切開，每片各自位移 3–10 單位、旋轉 ±1–3°，片與片之間露出 4–6 單位地色。做法：同一個 `<g>` 以 `<use>` 畫 N 次，每次套一條 `clipPath` 帶。

```html
<defs><g id="obj"><!-- 剪影 paths --></g>
  <clipPath id="b0"><path d="M-90 -60L210 -60 210 59 -90 64Z"/></clipPath>
  <clipPath id="b1"><path d="M-90 66L210 61 210 140 -90 103Z"/></clipPath> …</defs>
<g style="transform:translate(-7px,-9px) rotate(-3deg)"><g clip-path="url(#b0)"><use href="#obj"/></g></g>
<g style="transform:translate(5px,-3px) rotate(2deg)"><g clip-path="url(#b1)"><use href="#obj"/></g></g>
```
版面：物件偏一側、出血或被裁，標題黑色鋸齒字卡斜 −2° 壓在物件邊上；非對稱，留 ≥30% 地色。

### 特徵 5：片頭語法——刃條、硬切、字卡（裝飾母題＋動態）

長條（bars）從畫面外滑入、交叉、切斷；畫面之間用 `steps(1)` 硬切或 `clip-path: inset()` 推入，不用溶接；credits 字卡是「小字職稱＋大字名字」不對稱擺放，一次一張。

```js
el.animate([{clipPath:'inset(0 0 0 100%)'},{clipPath:'inset(0 0 0 0)'}],{duration:500,easing:'cubic-bezier(.8,0,.2,1)'}); // 色塊推入
card.animate([{opacity:0},{opacity:1,offset:.0001},{opacity:1}],{duration:900,easing:'steps(1,end)'}); // 硬切
```

---

## 三、色彩系統

見特徵 2。CSS 變數：

```css
:root{--ver:#E0522B;--ink:#141210;--bone:#ECE2CC;--steel:#9A9C97;--mus:#E3A82B}
body{background:var(--ver);color:var(--ink)}
.slab{background:var(--ink);color:var(--bone)} .sheet{background:var(--bone);color:var(--ink)}
```
暗色模式：本流派不做暗色反轉（地色就是識別），但 `.slab` 區塊本身就是暗面。

## 四、字體系統

- 來源：Google Fonts `Londrina Solid`（400/900）、`Noto Sans TC`（400/700/900）、`Archivo Narrow`（500/600/700）。
- 字級 scale：主標 clamp(84px,12.5vw,206px)／章標 clamp(38px,5vw,96px)／卡標 1.2–1.4rem／內文 16px 行高 1.75／credits .7–.8rem 字距 .14–.3em。
- 字重：標題一律 900；內文 400；粗體 700 只給價格與名字。
- 行高：標題 .88–1.05，緊；內文 1.6–1.75。

## 五、版面與網格

- 12 欄非對稱；區塊用 `grid-column:1/6`、`6/13` 錯位，第二塊下移 40–90px。
- **每一個色塊都略微旋轉**：−2.2° 到 +1.4°，相鄰塊方向相反。不得超過 ±3°（再多就變拼貼／達達）。
- 鋸齒色塊之間間距 12–22px，露出地色。
- 主物件可出血；標題卡負邊距 −9vw 壓到物件上。
- 留白：地色本身就是留白，至少 30%。
- 手機（≤560px）：單欄，旋轉保留但 ≤1.5°，主物件高 58vh。

## 六、元件配方

- **導覽（剪刀架）**：左側 92px 墨黑直欄，四把骨白剪刀剪影＝四頁；**現用頁的剪刀是張開的（±24°）並轉成朱色**，其他是閉合的；hover 時刃張開 12°（`steps(2)`）。≤900px 落為底部 74px 橫列。頁尾另備完整文字連結。
- **按鈕**：朱色或骨白實色塊，`clip-path:polygon(0 6%,100% 0,98% 100%,2% 92%)`，字 900；hover 反成墨黑底骨白字並位移 −6px（2 格 steps）。
- **卡片**：不是卡片，是「剪下來的紙」：`.jag` 鋸齒邊＋旋轉，無圓角無陰影。
- **列表（片尾名單）**：兩欄——右對齊小字職稱｜左對齊粗體名字；hover 時一條墨黑鋸齒條由左剪過（`clip-path` polygon 3 格）。
- **表單**：骨白底、2px 墨黑底線；focus 3px 芥末。
- **頁尾**：墨黑整塊，店名朱色 900。

## 七、動效規則（四種，缺一不可）

| 類型 | 本站實作 | 觸發 | 時長／easing | reduced-motion |
|---|---|---|---|---|
| ambient 環境 | **剪紙沸騰 boil**：所有剪影與鋸齒色塊每 166ms（6fps）在三組種子間重剪一次邊 | 無，持續 | `setInterval 166`，離屏不算 | 停在第一格，形狀完整 |
| input 輸入 | 價目列剪條、剪刀架張刃、解剖片被抽出、試剪台刀合 | hover／focus／pointerdown | 80–140ms `steps(2–3)`；刀合 560–720ms 線性 | 無過渡，狀態立即切換 |
| transition 轉場 | **三道片頭條**：換頁時墨／骨／墨三條由上壓下蓋住，下一頁再把它們推下去 | 站內連結 | 360ms 蓋、420ms 推，`cubic-bezier(.7,0,.2,1)` | 直接換頁 |
| signature 簽名 | **可倒轉的剪紙片頭**：14 秒、約 30 條 WAAPI 動畫共用一條時間軸，range 拖曳即 `currentTime` seek；場次表可跳格 | 進入視窗自動播一次；拖曳／按鈕 | 14000ms，各格自帶 easing | 不自動播，停在片尾（靜態可讀），拖曳仍可用 |


### motion-library 元件（PLAYBOOK §2.8）

這五個元件取自私人元件庫 `wenxiangxiao/motion-library` 1.1.0，用 `tools/ml-embed.js` 只抽引擎核心加這五個（約 34KB），inline 進每一頁。顏色一律只用本站三色。

| 頁 | ID | 名稱 | 參數 | 承載什麼／為什麼適合 Bass |
|---|---|---|---|---|
| 店頭 | `BG-B-37` | Minimal Stripes | primary `#E0522B`、secondary `#ECE2CC`、bg `#141210`、duration 7、density 1.6、seed 1962 | ambient：海報與片頭之間一條朱／骨直條緩慢平移的黑帶——《驚魂記》片頭的條帶語法；元件只畫直角矩形，符合零圓角 |
| 店頭 | `TXT-A-33` | Slice Text | text「價目」、primary 朱、secondary 墨、bg 骨白、duration 1.3、loop false | input（進視窗觸發）：字被橫切成六條、左右錯開再對齊——字被剪刀剪開的樣子 |
| 聽刃 | `TXT-A-14` | Torn Text | text「完」、primary 朱、secondary 骨白、bg 墨、duration 1.1、loop false | transition：五把送完時「完」被沿鋸齒線撕成上下兩半再對上，接在 clip-path 結算卡之後 |
| 打一把 | `SHP-12` | Split & Merge | primary 朱、secondary 墨、bg 骨白、1:1、intensity 1.2、**以捲動進度 seek** | input（捲動驅動）：四片方塊隨捲動散開又合回——解剖式碎片化的抽象版 |
| 來磨 | `TXT-B-10` | Stop Motion | text「剪一張片頭」、primary 朱、secondary 骨白、bg 墨、duration 2.2、loop false | input（進視窗、點擊重播）：12 格定格、字一個一個跳上來還帶抖動——Bass 片頭本來就是一格一格拍的剪紙 |

規則：
- 不放 `TEL`／`TRN`（會畫元件庫的示範場景）。
- canvas 都是 `aria-hidden`；容器裡原本的 HTML 標題保留給讀屏與無 JS／無 canvas 的情況。
- 等 `document.fonts.ready` 才掛載；離開視窗就 `destroy()`，回到視窗再重掛。
- reduced-motion：背景停在單一影格，文字直接停最後一格。
- 想重現單一元件：`MotionLib.prompt('TXT-A-33')` 會給出該元件的開發 Prompt。

開場（cut-reveal-first）：首次造訪時一張骨白紙蓋住店頭，一把剪刀沿鋸齒斜線剪過去（1.1s），兩半紙向上下飛開（0.7s）；點擊或任意鍵略過；reduced-motion 不出現。

自我限制：**本流派禁用淡入淡出（cross-fade）**——所有出現都是硬切、滑入或剪開；但不影響四種動效總數。

## 八、插畫與圖像風格

- 技法：剪刀鋸齒多邊形（scissor-jag polygon）。一個物件＝數個多邊形＋（需要洞時）evenodd 內環。
- 物件選擇：產業的**一個工具或身體部位**，側影、平面、無透視。
- 碎片化見特徵 4；碎片數 4–7。
- 地圖、圖表也用同一語言：街道是骨白鋸齒條、建物是鋼灰塊。
- 禁止：照片、漸層、描邊線稿、等角透視、像素、網點。

## 九、Logo 與 Favicon

- Logo：朱色鋸齒方塊＋一把張開的墨黑剪刀剪影＋墨黑鋸齒字條上的骨白店名；英文 credits 小字在下。
- Favicon：64×64 朱色歪方塊＋兩片交叉的刃與兩個多邊形指環。inline SVG data URI。

## 十、Do & Don't

**Do**：一個物件撐全場｜碎片之間留縫｜每個字都歪一點｜字壓在色塊上｜轉場用長條與硬切｜價目寫成片尾名單。

**Don't**：
- 不要紫藍漸層、玻璃擬態、模糊陰影、圓角卡片、emoji icon。
- 不要「置中大標＋兩顆按鈕＋三張卡」。
- 不要用 CSS `border-radius` 做圓——用多邊形。
- 不要讓碎片無縫拼回去（那就只是一張圖）。
- 不要超過一個地色；不要第四個大色塊。
- 不要淡入；不要彈跳 easing。
- 不要把 Bass 的電影海報直接臨摹——剪你自己產業的物件。

## 十一、頁面骨架範例

```html
<body style="background:#E0522B">
<nav class="rack"><!-- 四把剪刀剪影，現用頁張開 --></nav>
<main>
 <section class="hero">
  <div class="poster"><svg viewBox="-40 -20 200 340"><!-- 特徵 4 的碎片化物件 --></svg></div>
  <div class="slab jag" style="transform:rotate(-2.2deg);margin-left:-9vw">
   <p class="cred">CITY · STREET · SINCE 19XX</p>
   <h1 data-cut>店名</h1><p class="cut" data-cut=".6">English name</p>
  </div>
  <dl class="sheet jag" style="transform:rotate(1.3deg)"><dt class="cred">開</dt><dd>營業時間</dd></dl>
 </section>
 <section class="stage" style="aspect-ratio:16/9;background:#141210"><!-- 片頭：bars、字卡、碎片 --></section>
 <ul class="rows sheet jag"><li><span>職稱／品項</span><strong>名字／價格</strong></li></ul>
</main>
<footer class="foot">…</footer>
</body>
```

## 十二、技術實作與相容性

本站三項核心技術（A 渲染／B 時間軸／D 輸入感測，各一層）：

### 1. CSS `clip-path: polygon()` 與 SVG `<clipPath>`——承載全部剪紙邊與碎片（A）
- 支援：依 caniuse〈Animatable clipping paths〉，可動畫的 clip-path 於 Chrome 55+、Firefox 49+、Safari 12.1+、Edge 79+ 支援；polygon() 動畫插值要求兩端**頂點數相同**（animation type：basic shape，否則不插值）。查證：caniuse〈Animatable clipping paths〉https://caniuse.com/wf-clip-path-animatable ；MDN `clip-path` 頁 Animation type 欄。
- Fallback：JS 失效時 `.jag` 用 CSS 手寫百分比鋸齒；不支援 clip-path 的瀏覽器顯示為直角色塊，內容完整。
- 效能：boil 只改離屏外不算的元素；首頁約 60 個 path＋12 個色塊，每 166ms 重算一次，單次 <2ms（node 實測 jag() 1000 次 ≈ 9ms）。

### 2. Web Animations API 群組時間軸——承載可倒轉片頭（B）
- 支援：`Element.animate()`、`Animation.currentTime`（可讀寫、播放或暫停中皆可 seek）、`pause()`／`play()` 於 Chrome 84+、Firefox 75+、Safari 13.1+ 完整。查證：MDN〈Animation: currentTime property〉https://developer.mozilla.org/en-US/docs/Web/API/Animation/currentTime ——注意 Firefox 預設把時間精度降到 2ms（隱私），對 14s 時間軸無影響。
- 做法：每個元素一條 `duration:14000, fill:'both'` 的動畫，關鍵格以秒換算 offset、每格可自帶 easing（`steps(1,end)` 即硬切）；拖曳 range 時對所有動畫設同一個 `currentTime`。
- Fallback：不支援 `animate` 時腳本直接 return，舞台以 CSS 顯示片尾那一格（店名＋地址），資訊零損失。

### 3. Web Audio 程序合成＋Pointer 輸入——承載〈聽刃〉（D）
- 支援：`AudioContext`、`BiquadFilterNode`（bandpass）、`AudioBufferSourceNode`、`OscillatorNode` 為全主流瀏覽器長期支援；必須在使用者手勢後建立／resume。查證：MDN〈BiquadFilterNode〉https://developer.mozilla.org/docs/Web/API/BiquadFilterNode 與〈BiquadFilterNode.type〉（bandpass 的 frequency 為中心頻率、Q 控制頻寬）。
- 做法：**同一組毛病參數（類型、嚴重度 sev、缺口位置 nick、相位 ph）同時餵給聲音合成與切口幾何**：缺口位置 = 「喀」出現的時間比例 = 紙上舌頭的高度；軸鬆程度 = 方波 LFO 調幅深度 = 切線弧度；刃口不合 = 150Hz 鋸齒調幅＋130Hz 低通嗡聲 = 12 單位週期鋸齒切口。
- Fallback：無 AudioContext 或使用者關聲音時，切口幾何與「擬聲字卡」（嚓——叮／嘶嚓嚓……）承載同樣資訊；關 JS 時頁面下方「師傅的抄本」表格列出全部五種。
- 效能：每刀建立 3–6 個節點、0.7s 後自動 stop 回收；刀合用 rAF 改 SVG `transform` 屬性（不用 CSS transform-origin，避免巢狀變換座標歧義），首次 pointerdown 到第一格 <16ms。

### 效能預算實測
- 單頁大小（含 motion-library 子集 34KB）：index ≈ 103KB、bench ≈ 93KB、forge ≈ 103KB、visit ≈ 84KB（全部 inline，遠低於 350KB）。
- 零外部圖片、零音檔（聲音全部即時合成）；外部資源僅 Google Fonts。
- 首屏 JS：整段 inline 腳本執行時間以 jsdom 實測 index 18.7ms／bench 7.8ms／forge 5.0ms／visit 3.8ms（jsdom 無版面計算，僅作上限參考；未於實機瀏覽器量測）。
- 動畫：boil 6fps、片頭與刀合只動 transform／clip-path／opacity，無 layout thrashing。
