---
name: psx-low-poly
description: PS1 / PSX low-poly aesthetic for the web — a 320×240 WebGL view upscaled with hard pixels, where vertices snap to the pixel grid and wobble, textures warp because they are affine-mapped, colour is 15-bit with 4×4 Bayer dithering, light is per-vertex Gouraud, distance fog is the sky colour, and the 2D interface is a Gouraud-gradient menu window with bitmap type and a 15-block memory card.
---

# PS1 低多邊形 PSX Low-Poly Aesthetic

> 範例站：七彩樂園 TSHIT-TSHÁI LO̍K-HÂNG（嘉義中埔家庭樂園，`sites/tshit-tshai/`）。風格與產業分離：這份規格可以拿去做任何「想要那台灰色主機那幾年的 3D」的網站。

## 設計哲學

1994 年 12 月上市的第五世代家用主機，把 3D 帶進一般家庭，也把三個硬體缺陷變成一整代人的視覺記憶。它的幾何轉換引擎用 16 位元定點數算頂點、光柵化沒有次像素精度，所以**頂點吸在整數像素上，鏡頭一動，邊角一格一格跳**；繪圖晶片沒有透視校正，貼圖在螢幕空間線性內插，**大的面上貼圖會游、會彎**；沒有 Z 緩衝，靠排序表（ordering table）由遠畫到近，偶爾穿面；畫面多半是 320×240、**每通道 5 位元的 15-bit 色，用有序抖色把色帶抖開**；貼圖要塞進 1 MB 顯示記憶體，所以都是 64×64 上下、不過濾的小圖；光只在頂點上算（Gouraud），遠處用跟天空同色的霧把「畫不到的地方」藏起來。

2020 年前後，Haunted PS1 等獨立開發社群（2020-02-06 的 Haunted PS1 Demo Disc）把這套缺陷當成美學刻意重做，今天大家叫它「PS1 aesthetic／PSX style」。這份規格的立場是：**缺陷就是風格**。任何一條被「修好」——頂點不跳、貼圖不游、色不抖、霧拿掉、解析度提高——它就只是一個普通的 3D 網頁。

本風格不是懷舊濾鏡貼在現代畫面上：不加 CRT 掃描線、不加螢幕弧面、不加色差（那是「CRT 磷光」與「Glitch」兩個別的條目）。畫面要乾淨地低、誠實地抖。

## 本風格的 5 個不可省略特徵

### ① 頂點吸附：沒有次像素，幾何會跳

每個頂點在投影之後、送進光柵化之前，x、y 吸到 320×240 的整數格。靜止時看起來只是「有點硬」，一動就看得到邊角一格一格跳——這是第一眼辨識度最高的特徵。用一個 `uGrid` 參數放大格距，就能做出「精度開機」：格距從 24 收到 1。

```glsl
// vertex shader（GLSL ES 1.00）
vec4 c = uP * uV * uM * vec4(aP, 1.0);
if (uSnap > 0.5 && c.w > 0.0) {
  vec2 h = uR * 0.5 / uGrid;                 // uR = vec2(320.,240.)；uGrid ≥ 1
  c.xy = floor(c.xy / c.w * h + 0.5) / h * c.w; // 吸到整數像素，再乘回 w
}
gl_Position = c;
```

HTML 疊在 3D 上的標籤也要吸到同一張 320×240 格子（`Math.round` 後再換成百分比），否則字是滑的、模型是跳的，會穿幫。

### ② 仿射貼圖＋64×64 最近鄰貼圖頁

把 uv 先乘上 w 傳下去，片段裡再除以內插後的 w：硬體做的透視校正被抵銷，等於螢幕空間線性內插——棋盤格地墊、磚牆、水面在大三角形上會彎、會游。貼圖全部擠在**一張 256×256 的貼圖頁、16 格 64×64**，`NEAREST`、零 mipmap、零雙線性；上傳前整頁壓成每通道 5 位元。地面要切成 2×2 單位的小格（PS1 也是這樣切），否則仿射扭曲與近平面裁切會爆掉。

```glsl
// vertex
varying vec3 vUW;  vUW = vec3(uv * c.w, c.w);
// fragment
vec2 uv = vUW.xy / vUW.z;                                   // 仿射
vec2 st = vT.xy + clamp(fract(uv), .004, .996) * vT.zw;     // vT＝貼圖頁上那一格
vec4 tx = texture2D(uTex, st);
```
```js
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
// 貼圖頁上傳前：每通道壓成 32 階、alpha 二值化（字也不准有反鋸齒）
for (let i = 0; i < p.length; i += 4) { for (let c = 0; c < 3; c++) p[i+c] = Math.round(p[i+c]/255*31)*255/31|0; p[i+3] = 255; }
```

### ③ 320×240 整數放大＋15-bit Bayer 抖色

WebGL 畫布固定 320×240（4:3），CSS 放大且 `image-rendering: pixelated`，`antialias:false`。片段最後一步量化成每通道 31 階，量化前加 4×4 Bayer 門檻。**網頁上所有漸層底下也要疊同一張 4×4 抖色網**，motion-library 元件也以 1/3 寬度掛載再 3 倍 pixelated 放大——整頁只有一種解析度。

```glsl
float b2(vec2 p){ return mod(2.0*p.x + 3.0*p.y, 4.0); }
float bayer(vec2 f){ vec2 q = mod(floor(f), 4.0); return (4.0*b2(mod(q,2.0)) + b2(floor(q/2.0)) + 0.5) / 16.0; }
c = floor(c * 31.0 + bayer(gl_FragCoord.xy)) / 31.0;   // 15-bit＋有序抖色
```
```css
canvas.gl{width:100%;height:100%;image-rendering:pixelated;image-rendering:crisp-edges}
:root{--dith:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' shape-rendering='crispEdges'%3E%3Cg fill='%23000' fill-opacity='.16'%3E%3Crect width='1' height='1'/%3E%3Crect x='2' y='2' width='1' height='1'/%3E%3Crect x='2' width='1' height='1' fill-opacity='.08'/%3E%3Crect y='2' width='1' height='1' fill-opacity='.08'/%3E%3C/g%3E%3C/svg%3E")}
.win{background-image:var(--dith),linear-gradient(180deg,#2448C0,#0A1150);background-size:6px 6px,100% 100%}
```

### ④ 低多邊形＋逐頂點 Gouraud 光＋霧色＝天色

模型用方盒、6–16 邊圓柱、圓錐、經緯 6–8 段的球組起來；**每座物件有面數預算**（範例站每座設施 ≤ 1,200 面，十八匹木馬只做六匹，並把這件事寫進文案）。光只在頂點算（環境光 0.38–0.5＋一盞方向光），平面法線＝平塗、圓柱法線平滑＝Gouraud 漸層。距離霧也是逐頂點，霧色永遠等於天空穹頂的地平線色——遠處不是「模糊」，是沒入同色的霧。天空是一個 Gouraud 漸層穹頂（PS1 唯一被允許的漸層），頂色與霧色隨時刻改變。

```glsl
vec3 n = normalize((uM * vec4(aN, 0.0)).xyz);            // ES 1.00 沒有 mat3(mat4)
vC = aC * (uAmb + (1.0 - uAmb) * max(dot(n, uL), 0.0));   // 逐頂點光
vF = clamp((-e.z - uFogR.x) / (uFogR.y - uFogR.x), 0.0, 1.0); // 逐頂點霧
// fragment
vec3 c = tex.rgb * vC;  c = mix(c, uFog, vF);             // uFog＝穹頂地平線色
```

### ⑤ 2D 點陣 HUD 貼在 3D 前：Gouraud 選單窗、點陣字、記憶卡

介面是一層扁平的 2D：**藍到深藍的頂點漸層選單窗**、1px 亮邊（左上 `#BFD0FF`）＋1px 暗邊（右下 `#050A33`）＋2px 墨線外框＋右下硬影；拉丁字用點陣字（Pixelify Sans／Silkscreen），中文標題在 1× 畫布上用 11–13px 畫、alpha 二值化、再整數倍放大（零反鋸齒的「240p 點陣中文」）；導覽是**記憶卡 15 格**，現用頁的存檔圖示播兩格動畫。按鈕是塑膠鍵帽：亮邊在左上、按下時斜面反轉。

```css
.win{color:#F7F3E8;border:2px solid;border-color:#BFD0FF #050A33 #050A33 #BFD0FF;
 box-shadow:0 0 0 2px #11132B,6px 6px 0 0 rgba(17,19,43,.55);padding:20px 22px}
.btn{background:#FFD23F;border:2px solid #11132B;box-shadow:inset 2px 2px 0 #FFF2A8,inset -3px -3px 0 #C9A21C}
.btn:active{box-shadow:inset 3px 3px 0 #C9A21C,inset -2px -2px 0 #FFF2A8;transform:translate(1px,1px)}
```
```js
// 點陣中文：小字級畫 → alpha 二值化 → 整數倍放大
x.font = '900 12px "Noto Sans TC"'; x.fillText(txt, 0, 0);
const d = x.getImageData(0,0,w,h); for (let i=3;i<d.data.length;i+=4) d.data[i] = d.data[i]>110?255:0; x.putImageData(d,0,0);
cv.style.width = w*3+'px'; cv.style.imageRendering = 'pixelated';
```

## 色彩系統

| 角色 | Hex | 用途 | 比例 |
|---|---|---|---|
| 霧粉 fog | `#F3A9B7` | 頁底、3D 霧色（午後），地平線 | 約 35% |
| 深藍 deep | `#0A1150` | 選單窗下緣、頁尾、換頁抖色 | 約 20% |
| 選單藍 navy2 | `#2448C0`／`#1D3BA6` | 選單窗上緣、招牌底 | 約 12% |
| 墨 ink | `#11132B` | 字、外框、硬影 | 約 10% |
| 骨白 bone | `#F7F3E8` | 窗內文字、白色模型 | 約 8% |
| 玩具黃 yel | `#FFD23F` | 主按鈕、數字、現用格框 | 約 6% |
| 糖果紅 red | `#E63946` | 章、帆布條、警示 | 約 4% |
| 青 cyan | `#2EC4D6` | 小標、副按鈕、水面 | 約 3% |
| 草綠 grass | `#3FB34F` | 地面、PAD 已連線 | 3D 內 |
| 橘／紫 | `#F08A24`／`#8E4FB8` | 屋瓦、吊廂 | 點綴 |

天色隨時刻插值（頂色／霧色）：06 `#3B3F9E`/`#F7C8A8` → 10 `#2B5BC8`/`#F3BDC4` → 14 `#2B4FB8`/`#F3A9B7` → 17 `#3A2C8F`/`#EE8A9C` → 19 `#1A1660`/`#9A5C9E` → 22 `#0A1150`/`#3A2C6E`。**禁止紫藍漸層 hero**——本風格的漸層只出現在選單窗（同色相深淺）與天空穹頂（被 3D 遮住大半）。

## 字體系統

- 拉丁／數字：**Pixelify Sans** 400/700（UI、時鐘、按鈕）、**Silkscreen** 400/700（全大寫小標 11–12px，字距 .06–.08em）。Google Fonts。
- 中文內文：**Noto Sans TC** 500（15–16px，行高 1.75）；中文標題 900 經 1× 畫布點陣化後放大 3 倍（原始 11–13px → 顯示 33–39px）。
- 字級 scale：11（cap）／13（HUD）／15–16（內文）／17–22（窗標題）／30–44（區塊編號、時鐘）。
- 數字一律點陣字；中文標題不得用一般字型直接放大（會有反鋸齒，破壞特徵 ③）。

## 版面與網格

- 最大寬 1200px、左右 28px（≤560px 時 16px）。零旋轉。
- 3D 視窗一律 4:3，首屏佔 55–65% 寬；其餘是選單窗疊在粉霧底上。
- 窗與窗間距 22–30px；窗內 20×22px；窗頂一條深藍標題列（`.win-t`，Silkscreen 12px 黃字，右側灰字註記如 `DISC 1/1`）。
- 區塊標題：大號點陣編號（01、02、FX、MC）＋點陣中文＋右側一段說明。
- 留白不是大面積白：底永遠是帶抖色網的霧粉。

## 元件配方

- **導覽（記憶卡格）**：深灰塑膠槽 `#26263A` 內 4 格 62px 存檔格＋3 格斜紋空格；每格 32px 的 16×16 像素圖示（兩格動畫，`.f1/.f2` 以 `steps(1)` 交替）、中文頁名、`BLOCK 0X`。現用頁：底色選單藍、黃框、圖示播放；≤860px 移到底部固定一列。左側 `MEMORY CARD 1 / NN FREE`。
- **按鈕**：見特徵 ⑤；hover／focus 時左側出現 5×6 像素手指游標並以 `steps(2)` 擺動。
- **表格**：窗內 2px 半透明亮線分列；表頭 Silkscreen 青色；數字欄點陣黃。
- **表單**：骨白輸入框、2px 墨框、內陰影（左上暗）＝凹槽；錯誤訊息黃字粗體。
- **開關**：58×24 的 ON/OFF 撥桿，滑塊以 `steps(3)` 移動。
- **HUD**：3D 視窗四角，Pixelify Sans 13px，骨白字＋2px 墨色硬影；提示框是迷你選單窗。
- **頁尾**：深藍＋抖色網，三欄：地址／記憶卡目錄／光碟規格。

## 動效規則

| 種類 | 本站實作 | 觸發 | 時間／緩動 | reduced-motion |
|---|---|---|---|---|
| ambient | 設施各自運轉（木馬 0.55 rad/s、摩天輪 0.22、咖啡杯 −0.5、海盜船 sin 1.25、碰碰船、檳榔號 0.09）、雲漂、水面貼圖捲動；天色依臺北現在時刻 | 不需輸入 | 連續 | 停在 t=3 的單一影格；天色仍依時刻（靜態） |
| input | 首頁／圖鑑：拖曳、方向鍵、手把搖桿轉鏡頭；集章：角色走動＋跟拍鏡頭；地圖：滑過清單時標籤變紅、上方黃色箭頭彈跳 | pointer／key／gamepad | 每幀即時（<16ms） | 照常（使用者自己在動），彈跳停 |
| transition | **抖色換頁**：1/8 解析度畫布以 4×4 Bayer 門檻 16 格點滿深藍再換頁、下一頁反向退去；圖鑑換設施時的小型精度回升（格距 16→1、0.6s） | 點內部連結／換設施 | 16 格 × 22ms | 直接換頁／直接換 |
| signature | **精度開機**：頂點格距 1/24→1/1、貼圖頁 16 格逐格上傳（未上傳的面是灰的）、霧距 8→46、鏡頭由高遠處落下，HUD 即時顯示 `VERTEX 1/n · TEX nn/16 · FOG nn` | 每個工作階段第一次進首頁；RESET 鈕重播 | 3.4s，格距 ease 二次方 | 直接最終畫面 |

自我限制：本風格**禁用淡入淡出與模糊**（PS1 沒有 alpha 混合預算）——出現與消失用抖色門檻、`steps()` 或精度回升。

### motion-library 元件表（motion-library 1.16.0 @512f1a2，`tools/ml-embed.js` 子集 inline 為每頁第一個 `<script>`）

全部經站內包裝 `TT.ml` 掛載：等 `document.fonts.ready`、離屏 `destroy()`、一次性文字 `loop:false` 只播一次、canvas `aria-hidden`、`.ml-fb` 保留原標題；本風格加一條：**掛在 1/3 寬的內層、`transform: scale(3)`＋`pixelated`**，長條帶用 `crop`（0–1 垂直錨點）裁切。

| ID | 名稱 | 頁 | 參數 | 承載什麼／為什麼適合 |
|---|---|---|---|---|
| TXT-A-24 | Extrude | index | text「七彩樂園」、primary `#FFD23F`、secondary `#E63946`、bg `#1D3BA6`、duration 1.6、loop false、seed 1979、16:9、px 3 | 90 年代遊戲 logo 的擠出厚度字；低解析放大後側面的逐層堆疊正好變成階梯（transition） |
| TXT-B-27 | Pixel Dissolve | play | text「存檔完成」、primary `#2EC4D6`、secondary `#FFD23F`、bg `#0A1150`、duration 1.4、loop false、seed 6 | 存檔畫面的字由像素格溶出＝資料寫進記憶卡（transition） |
| BG-A-22 | Dot Wave Floor | rides | primary `#2EC4D6`、secondary `#FFD23F`、bg `#0A1150`、duration 6、loop、seed 1984、crop .62 | 點陣透視地板＝低多邊形地面的點雲版，頁首氛圍（ambient） |
| BG-B-09 | Perspective Grid | visit | primary `#F3A9B7`、secondary `#FFD23F`、bg `#2B2D8F`、duration 5、loop、seed 1987、crop .42 | 地平線格線＝3D 空間的佈景板，霧粉格線呼應霧色（ambient） |
| SHP-14 | Flip Tiles | visit | primary `#FFD23F`、secondary `#2EC4D6`、bg `#0A1150`、duration 2.6、loop、seed 15、crop .5 | 記憶卡管理窗頂的方格翻面＝「SAVING…」讀寫中（ambient） |

開發 Prompt 出處：`MotionLib.prompt('<ID>')`（motion-library 原始碼）。元件不擔任 signature；四種動效各有站內自製實作。

## 插畫與圖像風格

- 全站零圖檔：所有圖像＝程序生成低多邊形網格（方盒／圓柱／圓錐／球的組合，`Builder.mark()/xf()` 合併靜態網格）＋程序生成 64×64 貼圖（草、磚、木紋、紅白帆布條、鉚釘鋼板、水波、棋盤、屋瓦、木馬、臉）。
- 貼圖畫法：先平塗底色，再以決定性亂數（xorshift32，seed 1979）撒 1–2px 斑點、畫 1px 紋線；整頁壓 15-bit；字（招牌）alpha 二值化。
- 人物：方盒小孩（帽、頭、身、兩腳），臉只是正面一張貼圖（兩格眼睛、腮紅、嘴）。
- 圖示：16×16 像素圖，`shape-rendering: crispEdges`，每個兩格動畫。
- 無 WebGL 備援：同一座園的平塗低多邊形 SVG（色帶天空、草地兩階、摩天輪七邊形、門樓）。

## Logo 與 Favicon 設計指南

64×64 像素格：深藍窗框（左上亮邊）裡一座**七片低多邊形扇面的七彩輪**（紅橙黃綠青藍紫，每片一個三角形、零漸層），七個骨白方塊吊廂、墨色 A 字架、底部墨條上六個色點。favicon＝同一個 SVG 的 data URI，`shape-rendering: crispEdges`。不得用圓滑圓形——輪子必須是看得到邊的多邊形。

## Do & Don't

**Do**
- 讓頂點跳、讓貼圖游；把限制寫成文案（「每座 1,200 面」「只捲得起一張」）。
- 一切都在 320×240：3D、HUD 標籤座標、元件、點陣字。
- 霧色＝天色；天色可以跟真實時刻走。
- 手把能操作整站（Gamepad API），同時保證鍵盤與觸控完整可用。

**Don't**
- 不加 CRT 掃描線、暗角、色差、bloom（那是別的風格）。
- 不用雙線性過濾、mipmap、MSAA、平滑陰影、PBR、環境光遮蔽。
- 不做淡入淡出、模糊、半透明玻璃（去AI化禁令：無紫藍漸層 hero、無圓角模糊陰影卡片、無置中三卡片、無 emoji icon、無 Lorem ipsum、無「EST. 19xx」徽章）。
- 不用真實主機的商標、開機畫面、按鍵符號圖示與品牌名稱；按鈕文字寫「○ 確定」即可。
- 不把面數堆高「做得更好」——低多邊形是規格不是偷懶。

## 頁面骨架範例

```html
<header class="top"><div class="wrap">
  <a class="brand" href="index.html"><!-- 64px 像素 logo --><span><b>園名</b><small>ROMANIZATION · 1979</small></span></a>
  <nav class="mc" aria-label="記憶卡選單"><div class="mc-lbl">MEMORY CARD 1<b data-free>15 FREE</b></div>
    <ul><li><a href="index.html" aria-current="page"><svg><!-- 16×16 兩格圖示 --></svg><span>園區</span>BLOCK 01</a></li>…</ul></nav>
</div></header>
<section class="hero"><div class="wrap hero-g">
  <div class="screen"><svg class="fallback"><!-- 平塗低多邊形備援 --></svg>
    <canvas class="gl" width="320" height="240" role="img" aria-label="…"></canvas>
    <div class="hud" aria-hidden="true"><div class="tl">VERTEX 1/24 · TEX 03/16</div><div class="tr">14:05 TPE</div></div></div>
  <div class="win"><div class="win-t">SLOT 1 · 標題 <i>DISC 1/1</i></div>
    <h1 class="px" data-s="3" data-fs="13">點陣中文標題</h1>
    <p>內文……</p><a class="btn" href="play.html">START · 開始</a></div>
</div></section>
```

## 技術實作與相容性

| 技術 | 本站承載 | 支援現況與查證來源 | 不支援時 |
|---|---|---|---|
| 原生 WebGL 1 著色器（A 渲染層） | 特徵 ①②③④、signature、全部 3D | WebGL 1 於各主流瀏覽器長期可用（MDN〈WebGLRenderingContext〉）。著色器以 GLSL ES 1.00 撰寫，避開 `mat3(mat4)`、`noperspective`（ES 1.00 沒有）；建置時以 @webgpu/glslang 轉 GLSL 450 型別檢查通過 | `getContext` 失敗或著色器編譯失敗 → `TT.view` 回傳 null，顯示平塗 SVG 備援；〈集章一日〉改顯示「NO 3D」與規則文字 |
| `image-rendering: pixelated` | 特徵 ③ 的整數放大 | caniuse〈CSS property: image-rendering: pixelated〉：Safari 10+、Firefox 93+、Chromium 長期支援；同時宣告 `crisp-edges` | 退化成平滑放大，資訊不損失 |
| Gamepad API（D 輸入層） | 搖桿操作整站：`navigator.getGamepads()` 每幀輪詢（回傳快照，不可快取物件）、標準映射十字鍵 12–15、A=0、B=1、START=9、左搖桿 axes 0/1、右搖桿 2/3；非遊戲頁十字鍵在 `[data-pad]` 間移焦點、A 鈕按下 | MDN（鏡像）〈Navigator.getGamepads()〉：僅限 secure context；Mozilla Hacks〈Securing Gamepad API〉2020：Firefox 81 起不安全環境回傳空陣列；GitHub Pages 為 https，符合 | `getGamepads` 不存在或被 Permissions Policy 擋下（try/catch）→ 只用鍵盤（方向鍵／WASD／Enter／Esc）與觸控十字鍵 |
| localStorage 記憶卡＋URL 序列化＋FNV-1a（E 資料層） | 15 格存檔跨頁共享；存檔碼 `TSL-xxxxxxx`；`?s=順序-分鐘` 分享 | Web Storage 長期可用；所有讀寫包 try/catch | 私密模式或封鎖 → 記憶卡只活在本頁；分享連結照常可用 |
| Intl.DateTimeFormat `timeZone:'Asia/Taipei'` | 營業狀態、天色、存檔日期 | MDN Baseline 廣泛可用 | 退回本機時間 |

**效能實測（建置環境，軟體光柵器＋Node 22，非 GPU）**：整座園 59 個節點、約 7,000 個三角形；網格建置 60–130ms（含貼圖頁生成）；GPU 上 320×240 的填充量極小，主迴圈只有矩陣運算與一次 `drawArrays`／節點。單頁 237–280 KB（含 136 KB 元件庫子集）。離屏時 IntersectionObserver 停止繪製；`prefers-reduced-motion` 時只在輸入時重畫。

**已知取捨**：保留 Z 緩衝（真機是排序表），避免穿面讓網站難讀；仿射扭曲在近平面附近會比真機更誇張，因此地面切 2×2 小格。
