---
name: lautrec-montmartre-litho-affiche
description: Toulouse-Lautrec–era Montmartre colour-lithograph poster (1891–1900) as a web style — four transparent stone inks (absinthe yellow, vermilion, olive line-stone, black) overprinted with multiply, crachis spatter for every mid-tone, Japonisme cropping with the performer's head cut off by the frame and a huge black foreground silhouette, half-open olive brush keylines, and hand-lettered words drawn into the picture with a printer's imprint and tax stamp.
---

# 羅特列克石版海報・蒙馬特咖啡音樂廳 Affiche lithographique de Montmartre

> 範例站：秀月那卡西（北投溫泉路的走唱團，1961 年成團；2019 年起孫女許雅筑每季用四塊石頭印一張海報）。整站是一根海報柱上的海報：首頁是本季海報，大廳那片灰是可以用牙刷「甩」上去的；〈印一張〉讓你排一場酒席，看四塊石頭依序壓印你的海報。

**歷史座標**

- **1866**：Jules Chéret（1836–1932）從倫敦帶回英國石印機，在巴黎開業，把多石套色石版做成街頭海報，被稱為現代海報之父。
- **1881**：法國〈新聞自由法〉放寬張貼，巴黎牆面與 1868 年起出現的 Morris 海報柱（colonne Morris）成了海報的戰場。海報要貼印花稅票才能上牆。
- **1891**：Henri de Toulouse-Lautrec（1864–1901）的第一張海報〈Moulin Rouge – La Goulue〉。之後十年他只做了約三十張海報，卻定義了這個風格：〈Divan Japonais〉（1892–93）、〈Aristide Bruant dans son cabaret〉（1893）、〈Jane Avril – Jardin de Paris〉（1893）。
- **〈Divan Japonais〉是本規格的原型**：巴黎殉道者街 75 號一家以「日本」為名的咖啡音樂廳。四色石版——橄欖綠是線版，黑、黃、紅是色版；台上的歌手 Yvette Guilbert 頭被海報上緣切掉，前景是一身黑的 Jane Avril；大廳與褲子上的灰是 *crachis*——用硬毛刷把墨甩在石頭上的噴點。（參照：MFA Boston 所藏試印張著錄「brush and spatter lithograph printed in olive-green and black／yellow and red」；Barber Institute 館藏說明。）

**為什麼長這樣**（製作條件決定視覺）：

- **石版只能「有墨／沒墨」**：石灰石吸油拒水，沒有中間調。所以灰只能用噴點（crachis）或蠟筆顆粒做；所以每個色塊都是硬邊平塗。
- **一塊石頭一個顏色**，紙要壓好幾次。為了省石頭，色數壓在四、五色；疊色靠墨本身透明，黃壓朱變磚紅、黃壓橄欖變深苔。套印永遠差一兩毫米。
- **日本主義**：1880 年代巴黎瘋浮世繪。從北齋、廣重學來：平塗、俯角、斜線、把人切在畫框外、前景擋住一大塊。
- **海報是畫家畫的，不是排字工排的**：字由畫家手寫在石頭上，和人物同一層、搶同一塊空間。印刷所名字（imp.）以小字印在下緣。

---

## 1. 設計哲學

1. **海報不是版面，是一場被裁切的演出。** 主角永遠不完整：台上的人被切頭，前景的人被切成一團黑。觀者的位置是「坐在台下」。
2. **顏色是墨，不是光。** 只有四罐透明墨，所有其他顏色都是疊出來的（`mix-blend-mode:multiply`／canvas `multiply`）。沒有漸層、沒有陰影、沒有 alpha 霧。
3. **灰是甩出來的。** 任何需要中間調的地方，用一顆顆不規則的墨點（crachis），近看是點、遠看是面。這是本風格最容易被省略、也最不能省略的東西。
4. **線只描一半。** 輪廓是橄欖色毛筆，起筆粗收筆細，該斷就斷——色塊自己會把形狀補完。
5. **字是畫的一部分。** 店名毛筆手寫、斜壓在色塊上；資訊壓在最下面一條紙白帶。

## 2. 色彩系統

四罐石版墨＋紙。**禁止第五個墨色**；其他顏色只能是疊印結果。

| 角色 | Hex | 用途 | 參考面積 |
|---|---|---|---|
| 紙 Paper | `#F0E7CF` | 聚光圈、底部資訊帶、留白 | 約 25% |
| 苦艾黃 Y（第一塊） | `#CFC63B` | 全版底色、舞台光 | 約 40% |
| 朱 R（第二塊） | `#DB4A2C` | 主角衣服、琴身、燈籠、副標字 | 約 10% |
| 橄欖線版 O（第三塊） | `#5E6A33` | 筆線、大廳噴點、次要人物 | 約 12%（多以噴點出現） |
| 墨 K（第四塊） | `#1B1712` | 前景剪影、店名、麥克風架 | 約 13% |
| 疊色 Y×R | 約 `#B9461F` | 黃底上的紅 | 自然產生 |
| 疊色 Y×O | 約 `#4F5626` | 黃底上的橄欖 | 自然產生 |
| 網頁專用：海報柱綠 | `#2F3B1F`／`#3D4A27` | 導覽柱（Morris 柱的鑄鐵綠） | 只在導覽 |

規則：底色一律是 Y 或紙；R 只給「主角」；K 只給「最前面的東西」與字。

## 3. 字體系統

| 角色 | 字體（Google Fonts） | 規則 |
|---|---|---|
| 店名、標題（手寫毛筆） | **Yuji Boku** | 旋轉 −2°～−5°、字距 −0.04em～−0.06em、`mix-blend-mode:multiply` |
| 法文／拉丁手寫 | **Bigelow Rules** | 1890 年代劇場海報手寫大寫感；只用於短語（Ce soir、Programme、Tarif） |
| 印刷所小字 imprint | **IM Fell English SC** | 11–14px、字距 .06–.12em |
| 內文 | **LXGW WenKai TC** | 16–17px／1.8；楷感讓內文仍像手寫 |

字級（海報內一律以 `cqi`，見 §5）：店名 21cqi、副標 10.5cqi、拉丁短語 6.4cqi、資訊帶 4.6cqi、imprint 1.9cqi。網頁標題 clamp(64px, 8–15vw, 220px)。

## 4. 版面與網格

- **海報比例** 600×840（Colombier 直幅約 1:1.4）。首頁海報寬 `min(56vw, (100vh − 56px) × .714)`，一屏看完整張。
- **舞台斜線**：從左緣 y=62% 斜到右緣 y=45%（約 −13°）。斜線上是亮的舞台，斜線下是噴點的暗大廳。所有頁面的「區隔」也用 −1.5°～−5° 的旋轉，而不是水平線。
- **裁切**：主角的頭被上緣切掉（旗袍從 y=0 開始）；前景剪影被左緣與下緣同時切掉，佔畫面 25–35%。
- **聚光圈**：主角後面一個留紙白的橢圓（rx 150, ry 215），邊緣以環狀噴點收。
- **資訊帶**：最下方 9% 高的紙白帶，置中手寫一行。右下直排 imprint，左下貼印花。
- 網頁本身：不對稱雙欄（海報＋右欄），右側固定 84px 海報柱導覽。

## 5. 元件配方

**海報容器（容器查詢＋cqi：海報多大字就多大）**

```css
.poster{position:relative;container-type:inline-size;container-name:aff;aspect-ratio:600/840;overflow:hidden;isolation:isolate}
.poster>canvas,.poster>svg.static{position:absolute;inset:0;width:100%;height:100%}
.poster .lt{position:absolute;mix-blend-mode:multiply;pointer-events:none;line-height:.95;white-space:nowrap}
.poster .t1{left:4.5cqi;top:3.5cqi;font:21cqi "Yuji Boku";color:#1B1712;transform:rotate(-3deg)}
.poster .t2{left:7cqi;top:26.5cqi;font:10.5cqi "Yuji Boku";color:#DB4A2C;transform:rotate(-3deg)}
@container aff (max-width:260px){.poster .t3,.poster .t4,.poster .t5{display:none}.poster .t1{font-size:26cqi}}
```

**海報柱導覽 colonne Morris**：右側 `position:fixed` 84px，鑄鐵綠直條紋 `repeating-linear-gradient(90deg,#2F3B1F 0 9px,#3D4A27 9px 12px,…)`，頂上 SVG 圓頂與尖頂、底座一圈。每頁是一張貼在柱上的小海報（直排頁名＋拉丁小字），右下角是翹起的紙角（`clip-path` 切角＋`::after` 摺角，hover 時 `--peel` 由 6° 補間到 22°）。現在頁：完整無切角、一道濕膠光澤斜掃（`::before` 漸層 3.8s 循環）。≤760px 變成底部橫向報攤條。

**按鈕**：墨黑實塊、手寫字、`rotate(-1.5deg)`；hover 轉正並換成橄欖。無圓角、無陰影。

**卡片**：不要卡片。用「小海報」——不同底色的實塊，`rotate(±1.5deg)`、`box-shadow:4px 6px 0 -1px rgba(27,23,18,.18)`（貼紙的厚度，不是模糊陰影），年份用 Bigelow Rules 30cqi、`multiply`。

**票券**：點唱券用 `mask` 兩個半圓缺口做撕線，左側 stub 直排編號。

**表單**：2px 墨框、零圓角、紙底；選項是手寫字的小籤，選中＝塗上一塊墨色並歪 −2°。

**Footer**：整條墨黑，最上面是 logo，下面印刷所 imprint（IM Fell English SC），右側一張苦艾黃印花。

## 6. 動效規則（4 種，皆有 reduced-motion 降級）

| 類型 | 做法 | 觸發／時間 | 降級 |
|---|---|---|---|
| **環境 ambient**：瓦斯腳燈 | 舞台斜線上 5 盞腳燈，`radial-gradient` 透明度乘 `@property --gas`（`<number>`），不規則 keyframes（1→.72→.98→.86→1.08→.64…），每盞週期 2.1–3.9s、`steps(1,end)` 讓它是「跳」的而不是呼吸的 | 持續 | 固定 `--gas:1`，腳燈仍在 |
| **輸入 input**：牙刷游標＋海報柱翹角＋曲目換景 | 游標在海報上變成牙刷，依水平速度旋轉 ±50°；導覽紙角 `--peel` 6°→22° 補間 .25s；〈曲目〉指到一首歌，小海報在同一幀換前景（已建好的石版快取） | <16ms | 立即切換，無補間 |
| **轉場 transition**：刮刀壓印 | 換頁時一支石印機刮刀（木條＋墨線）由上往下壓過，後面拖著黃／朱／橄欖／墨四道色帶，紙白蓋滿後換頁；新頁再壓一次，刮刀過處把頁面「印出來」。`@property --pull`（`<percentage>`）0%→100%，.5s `cubic-bezier(.6,0,.35,1)` | 點站內連結 | 不攔截，直接換頁 |
| **簽名 signature**：甩刷噴點 crachis | 在海報上按住拖曳，依指標速度把一陣墨點甩在選定的那塊石頭上：顆數＝速度×55（上限 260）、距離＝速度×90 單位、方向±0.7rad 散開、越遠越小；墨點立刻以 multiply 疊進成品。首頁載入時四塊石頭依序壓印（每塊 620ms、刮刀黑線掃過、套印誤差隨進度收斂） | 拖曳／空白鍵 | 壓印改為直接顯示成品；噴點仍可用（輸入即結果，無動畫） |

自我限制：**禁用淡入、禁用滾動揭示、禁用模糊**——石版沒有半透明。

## 7. 插畫與圖像風格（litho-crachis 四石噴點）

- 一張圖＝四個「石版」圖層，各只含一種墨。每層由三種原語組成：**平塗形**（Path2D 填色）、**噴點區**（clip 到形狀後均勻撒點，可帶線性密度漸變或環狀衰減）、**筆線**（Catmull-Rom 曲線上逐點畫圓，寬度 `w·(.3+.7·sin(πt))`，±15% 抖動）。
- 四層依 Y→R→O→K 以 `multiply` 疊在紙上，每層各帶 1–2 單位的套印偏移。
- 構圖固定元素：斜舞台、切頭主角、聚光圈、被切掉的前景黑剪影、一個刺進標題區的長物（琴頸／低音提琴頭／手杖）。
- 人物只用剪影與色塊，臉不畫五官；側臉輪廓（鼻、下巴）就是表情。

```js
// 噴點：clip 到區域後撒點，密度沿 y 漸增
g.save();g.clip(new Path2D(zone));
for(let i=0;i<N;i++){const x=x0+R()*(x1-x0),y=y0+R()*(y1-y0),t=(y-g0)/(g1-g0);
 if(R()>.25+.75*t)continue;const r=.32+Math.pow(R(),7)*2.2;
 if(r<.6)g.fillRect(x-r,y-r,r*1.8,r*1.8);else{g.beginPath();g.arc(x,y,r,0,6.283);g.fill()}}
g.restore();
```

## 8. Logo 與 Favicon

- Logo：苦艾黃方塊、斜舞台、一個朱色圓（燈）被一彎紙白新月吃掉——「秀月」；一支墨黑琴頸從左上斜刺進來；右下噴點。下方手寫店名＋Bigelow Rules「NA-KA-SI」。
- Favicon：同構圖的 64×64 inline SVG data URI：黃底、朱圓、紙月、黑琴頸、三顆橄欖噴點。

## 9. Do & Don't

**Do**
- 四罐墨，疊色靠 multiply；套印差 1–2 單位。
- 灰一律用噴點；噴點要有大有小（大多數很小、少數很大：`r = a + b·rand⁷`）。
- 主角切頭、前景切成一團黑、斜舞台。
- 店名手寫、歪的、壓在色塊上；最下面紙白資訊帶＋印刷所小字＋印花。

**Don't**
- 不要漸層、不要陰影模糊、不要半透明霧面——石版做不到。
- 不要把 Mucha 的光環、花冠、裝飾邊框混進來（那是新藝術，另一條路）；本風格零裝飾邊框。
- 不要黑色輪廓線描滿：線版是橄欖色、只描一半。
- 不要 Art Deco 的放射扇與金色；不要普普網點（網點是照相製版，石版噴點是不規則的手工）。
- 去 AI 化：禁紫藍漸層、禁置中三卡片、禁 emoji icon、禁 Lorem ipsum、禁「EST. 19xx」徽章。

## 10. 頁面骨架範例

```html
<aside class="colonne" aria-label="海報柱導覽">
  <svg class="dome">…圓頂…</svg>
  <nav><a class="aff" href="index.html" style="--c:#CFC63B" aria-current="page"><b>今晚</b><i>Ce soir</i></a>…</nav>
  <div class="base"></div>
</aside>
<main>
 <section class="stage">
  <div class="poster" id="hero" role="img" aria-label="本季海報：…">
    <svg class="static">…同一份場景的平塗備援…</svg>
    <!-- JS 在此插入 canvas -->
    <div class="lt t1">秀月</div><div class="lt t2">那卡西</div><div class="lt t3">Siu-Gueh Na-ka-si</div>
    <div class="lt t4">每週五 <b>19:30</b> 北投公園露天走唱</div><div class="lt t5">石印 雅筑工房</div>
    <svg class="stamp">…印花…</svg>
  </div>
  <div class="soir"><h1>今晚</h1>…</div>
 </section>
</main>
<footer class="imprint">…</footer>
```

---

## 11. 本風格的 5 個不可省略特徵

### ① 四石透明墨疊印（拿掉它就只是扁平插畫）

只有 Y／R／O／K 四罐墨，第五個顏色只能由疊印產生；每塊各有套印誤差。

```css
.lt,.ink{mix-blend-mode:multiply}           /* HTML 字與色塊：墨疊墨 */
.poster{isolation:isolate}                  /* 只和海報自己疊，不和頁面背景疊 */
```
```js
g.drawImage(paper,0,0);g.globalCompositeOperation='multiply';
for(const k of ['Y','R','O','K'])g.drawImage(stone[k],reg[k][0],reg[k][1]);  // 每塊偏 1–2 單位
g.globalCompositeOperation='source-over';
```

### ② Crachis 甩刷噴點（拿掉它就沒有中間調，整張變成剪紙）

```js
// 使用者甩刷：速度決定顆數與距離
function flick(g,x,y,vx,vy,ink,sc){const sp=Math.hypot(vx,vy);if(sp<.15)return;
 const n=Math.min(260,Math.round(sp*55)),ang=Math.atan2(vy,vx),reach=Math.min(220,sp*90)*sc;g.fillStyle=ink;
 for(let i=0;i<n;i++){const a=ang+(Math.random()-.5)*1.2,d=Math.pow(Math.random(),.7)*reach,
  r=(.5+Math.pow(Math.random(),6)*3.4)*sc*(1-.4*d/reach);g.beginPath();g.ellipse(x+Math.cos(a)*d,y+Math.sin(a)*d,r*1.3,r,a,0,6.283);g.fill()}}
```
```svg
<!-- 無 JS 備援：SVG pattern 噴點 -->
<pattern id="cO" width="9" height="9" patternUnits="userSpaceOnUse"><circle cx="2" cy="3" r=".8" fill="#5E6A33"/><circle cx="6.5" cy="7" r=".6" fill="#5E6A33"/><circle cx="7" cy="1.5" r="1.1" fill="#5E6A33"/></pattern>
```

### ③ 日本主義裁切：切頭的主角＋被切掉的前景黑剪影＋斜舞台（拿掉它就是一般的演出海報）

```svg
<!-- 主角從 y=0 開始：頭在畫框外 -->
<path d="M378,0C370,46 364,86 380,124C392,152 384,196 368,240C352,290 368,338 392,384L500,380C516,334 510,282 496,238C484,196 476,154 486,122C500,84 494,40 486,0Z" fill="#DB4A2C"/>
<!-- 斜舞台 -->
<path d="M0,520L600,380V392L0,534Z" fill="#5E6A33"/>
<!-- 前景：被左緣與下緣切掉的黑剪影，佔 25–35% -->
<path d="M142,524L248,524C252,542 258,552 268,566 … L208,650C262,662 304,704 334,840H0V646C56,634 108,624 150,626Z" fill="#1B1712"/>
```

### ④ 橄欖色、只描一半的毛筆線（拿掉它就沒有「畫家的手」）

```js
function brush(g,pts,w,ink){const P=catmullRom(pts,26);g.fillStyle=ink;
 P.forEach((p,i)=>{const t=i/(P.length-1),r=w*(.3+.7*Math.sin(Math.PI*Math.min(1,t*1.15)))*(.85+Math.random()*.3)/2;
  g.beginPath();g.arc(p[0],p[1],Math.max(.4,r),0,6.283);g.fill()})}
// 只描主角的一側、手臂一條、舞台斜線一條——不封閉
```

### ⑤ 手寫字畫在畫裡＋印刷所 imprint＋印花（拿掉它就是排版海報）

```css
.t1{font-family:"Yuji Boku";font-size:21cqi;transform:rotate(-3deg);letter-spacing:-.04em;mix-blend-mode:multiply}
.t5{writing-mode:vertical-rl;font:1.9cqi "IM Fell English SC";letter-spacing:.1em}  /* 印刷所 */
.stamp{position:absolute;left:3cqi;bottom:13.6cqi;width:9cqi;transform:rotate(-8deg);mix-blend-mode:multiply}
```
```svg
<svg class="stamp" viewBox="0 0 90 110"><path d="M5 5h80v100H5z" fill="none" stroke="#DB4A2C" stroke-width="2.5" stroke-dasharray="3 3"/>
<text x="45" y="44" text-anchor="middle" font-size="22" fill="#DB4A2C">印花</text><text x="45" y="76" text-anchor="middle" font-size="18" fill="#DB4A2C">伍角</text></svg>
```

---

## 12. 技術實作與相容性

本站三項核心技術（查證日 2026-10-15）：

### A. Canvas 2D `globalCompositeOperation = 'multiply'`（A 渲染層）

- **承載**：特徵①②——四塊石版離屏 canvas 依序 multiply 疊在紙上；使用者甩的噴點同時寫入該石版（供重合成）並直接以 multiply 壓到成品上。因為 multiply 可交換，增量疊印與整張重合成結果相同，所以甩刷時不必重畫整張。
- **支援**：MDN 標為 Baseline Widely available（2015-07 起各主流瀏覽器皆支援）。來源：MDN〈CanvasRenderingContext2D: globalCompositeOperation property〉。
- **Fallback**：無 JS／無 canvas → 顯示建置期由同一份 `scene()` 產生的靜態 SVG（四層 `<g style="mix-blend-mode:multiply">`＋pattern 噴點），字仍是 HTML。

### B. CSS `@property` 型別化自訂屬性（B 動效與時間軸層）

- **承載**：`--pull`（`<percentage>`）驅動刮刀轉場的 clip-path 與色帶位置；`--gas`（`<number>`）驅動腳燈閃爍；`--peel`（`<angle>`）驅動海報柱紙角；`--reg`（`<length>`）在〈印一張〉收尾時把朱版字的套印誤差從 7px 彈回 .8px。沒有註冊的自訂屬性無法補間，這四個動效都會變成跳格。
- **支援**：Chrome／Edge 85+、Safari 16.4+、Firefox 128+（Baseline 2024 Newly available）。來源：caniuse「Registered custom properties」、web.dev〈New to the web platform in July 2024〉。
- **Fallback**：JS 以 `CSS.registerProperty` 是否存在判定；不支援時不攔截連結（直接換頁）、腳燈維持 `--gas:1` 靜止、紙角直接切換。

### C. Container queries＋`cqi` 單位（C 版面與樣式層）

- **承載**：特徵⑤——海報上的字全是真的 HTML 文字（可選取、可讀），以 `cqi` 定位與定字級，所以同一張海報在 1000px 首頁、240px 曲目側欄、手機上都保持同樣的構圖；`@container aff (max-width:260px)` 時拿掉資訊帶與 imprint、放大店名，就像真的海報縮成郵票時只剩名字。
- **支援**：容器查詢長度單位 Chrome／Edge 105+、Safari 16.0+、Firefox 110+。來源：caniuse「CSS Container Query Units」（資料源自 MDN browser-compat-data）。
- **Fallback**：`@supports not (width:1cqi)` 改用 `vw` 上限字級（構圖會在極窄或極寬時略偏，但字不會消失）。

### 效能實測

- 單頁大小：index 45.5KB、kiok 41.8KB、in 50.6KB、lai 27.2KB（皆含 inline 全部 CSS／JS／SVG；字型另由 Google Fonts 載入）——遠低於 350KB。
- 繪製成本（以 Node 22＋@napi-rs/canvas〔Skia 軟體繪製〕實測，960px 寬、DPR 2 等效）：紙＋套印參數 3.7ms、首塊黃版 8ms；朱／橄欖／墨三塊合計 59ms，但為**惰性生成**——首屏只做紙與黃版，其餘在壓印動畫期間以 60ms 間隔逐塊生成，不阻塞首屏。甩刷 20 次增量疊印合計 5.9ms（每次 <0.3ms）。瀏覽器的 canvas 合成走 GPU，實際會更快；軟體繪製值作為上限參考。
- 噴點一律「一顆一個 path」或 `fillRect`（<0.6 單位）；**不要**把上萬顆圓塞進同一個 Path2D 再 fill——在 Skia 上這會從數十毫秒退化到數十秒（實測 40k 顆：單一路徑 82s，逐顆 64ms）。
- ResizeObserver 僅在寬度變化 >40 裝置像素時重建石版；〈印一張〉印製中鎖定不重建，以免使用者甩上的噴點消失。

## motion-library 元件（2026-10-17 補入，PLAYBOOK §2.8）

取自私人元件庫 `wenxiangxiao/motion-library` 1.1.0（@eb4d70c），以 `tools/ml-retrofit.js` 只抽引擎核心＋下列元件 inline 進每頁。顏色只用本站色票；canvas 為裝飾（aria-hidden），無 JS／無 canvas 時不顯示；離開視窗即停止繪製；reduced-motion 時背景停單格、文字停最後一格。

| 頁 | ID | 名稱 | 參數 | 承載什麼／為什麼適合本流派 |
|---|---|---|---|---|
| index.html | `BG-A-07` | Random Pop Dots | primary #5E6A33／secondary #1B1712／bg #CFC63B、duration 5、density 2.2、intensity 0.32、seed 1961 | ambient：苦艾黃石面上，橄欖與墨兩色的不規則圓點此起彼落地「甩」上來又消失——就是 crachis 噴點（特徵②）的動態版；元件只畫實心圓、零漸層零陰影，條帶歪 −1.5° 沿用本站以旋轉取代水平分隔線的習慣。 |
| kiok.html | `TXT-A-35` | Stripe Mask | primary #DB4A2C／secondary #1B1712／bg #CFC63B、text 點唱 Tarif、duration 1.4、aspectRatio 16:9、seed 3（一次性，進視窗播放、點擊重播） | input：字被十四道硬邊直條逐條「壓」出來，朱色細線像刮刀在石面上推過——一塊石頭一道墨、只有有墨／沒墨，零淡入零模糊；黃底墨字＝本站「底一律是 Y、字給 K」的規則，歪 −2° 像貼在價目欄上方的一張小傳單。 |
| in.html | `TXT-B-36` | Ink Bleed | primary #DB4A2C／secondary #5E6A33／bg #F0E7CF、text 印一張、duration 1.6、aspectRatio 16:9、seed 5（一次性，進視窗播放、點擊重播） | input：〈印一張〉的字由幾團不規則墨漬吸進紙裡長出來，邊緣是波動的有機輪廓而不是幾何——石灰石吸油、墨在紙上暈開的那一下；紙白底配近墨黑字，點擊可再印一次，與本頁四石壓印的主題同一件事。 |
| lai.html | `SHP-33` | Squiggle Draw | primary #5E6A33／secondary #DB4A2C／bg #F0E7CF、duration 4.2、intensity 0.9、aspectRatio 16:9、seed 12 | ambient：一條橄欖色的毛筆線在紙上一筆畫出去、畫完又重來，永遠是「正在描」的開放線——特徵④橄欖線版、只描一半的手；不封閉、不填色，歪 −3° 擺在預約須知上方像琴頸的一道筆勢。 |
