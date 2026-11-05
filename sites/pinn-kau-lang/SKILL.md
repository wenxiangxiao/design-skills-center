---
name: wood-type-showbill-two-color
description: Nineteenth-century American wood type showbill — every line a different face set flush to the full measure, two inks (black and vermilion) on tinted poster stock, worn wood-grain impressions, thick-thin rules and pointing-hand ornaments, with the red forme printed by a visible second roller pass.
---

# 木活字演出告示・兩色半身 Wood Type Showbill（Two-color）

> 範例站：〈變猴弄戲法道具行 PÌNN-KÂU-LĀNG〉（`sites/pinn-kau-lang`）。型錄「印刷與製程｜木刻活字 Wood Type」既有流派，全館第 2 站；第 1 站 `yuanbi` 為鮭粉紙「檢索狀態決定字級階層」半身。本站為「演出告示 showbill」半身：三色告示紙、墨＋朱兩版、每行換一副字撐滿版心、滾筒走過才印上第二色。

## 設計哲學

木活字是 1828 年 Darius Wells（紐約 Amsterdam）用側銑刀把硬楓木端面刨成大字之後才普及的：鉛字鑄不出 3 吋以上的字，木頭可以。1834 年 William Leavenworth 加上縮放儀（pantograph），一副字可以從同一張圖放大成各種尺寸；William H. Page（康乃狄克 Greeneville，1859 型錄）與 Hamilton Manufacturing（威斯康辛 Two Rivers，1880 起）把 Antique、Tuscan、Gothic、French Clarendon、Fat Face 等數百種字刻成一盤一盤賣給小鎮印房。參照：Rob Roy Kelly《American Wood Type 1828–1900》（1969）；Hamilton Wood Type & Printing Museum 館藏；Smithsonian 國立美國歷史博物館 broadside 典藏。

告示長成這樣不是品味，是限制：

1. **一盤字的數量有限**——同一副字的「E」可能只有六個，一行用完就得換另一副，所以每行是不同的字。
2. **木頭壓不扁**——要把一行塞滿版心，只能換一副比較窄（Condensed）或比較寬（Extended）的字、或換大小。版心永遠被填滿，因為空白在鎖版時要用木塞（furniture）填，填滿字最省事。
3. **一色一版一刷**——紅要另排一版、再過一次滾筒，所以紅只給「最想讓人看見」的那幾行，而且永遠對不太準。
4. **便宜的色紙**——告示印在黃、粉、綠、藍的薄海報紙上，一張貼一晚。

變猴弄（臺語 pìnn-kâu-lāng，變把戲）是 1962 年開在西門町漢中街二樓的戲法道具行（虛構），1964 年買下收攤活版社的手搖印刷機與四十二盤木活字自印告示——這個流派在這裡不是借來的皮，是這家店本來就印的東西。

## 本風格的 5 個不可省略特徵

拿掉任何一項，它就變成「好看的海報」而不是木活字告示。

### ① 一行一副字，每行撐滿版心（Full-measure, one face per line）

每一行左右兩端都貼著版心，字級由「要塞滿」決定，不由階層決定。拉丁字用可變字寬軸 `wdth`（Anybody 50–150）找到剛好塞滿的寬度，到底了才改字級；中文用 `scaleX` 做長體／扁體（0.72–1.38，照相排字時代的正統變形），超出才改字級；其他靜態木字（Abril Fatface、Ultra、Rye、Holtwood One SC）只改字級。相鄰兩行不得同一副字。

```css
.bill{container-type:inline-size}
.ln{display:block;font-size:calc(var(--s,8) * 1cqi);line-height:.94;text-align:center} /* 無 JS 的近似值 */
.fitted .ln{text-align:left;white-space:nowrap}
.fitted .ln .t{display:inline-block;transform-origin:0 50%}
```
```js
// Anybody：二分搜 wdth；中文：scaleX；其餘：只改字級
function fitLine(ln){const t=ln.firstElementChild,W=ln.clientWidth,f=ln.dataset.f;let fs=W*(+ln.style.getPropertyValue('--s'))/100;
 t.style.cssText='font-size:'+fs+'px';const w=t.getBoundingClientRect().width,r=W/w;
 if(f==='anyb'){let lo=50,hi=150;const at=v=>(t.style.fontVariationSettings='"wdth" '+v,t.getBoundingClientRect().width);
  if(at(50)>W)return t.style.fontSize=fs*W/at(50)+'px';if(at(150)<W)return t.style.fontSize=fs*W/at(150)+'px';
  for(let i=0;i<7;i++){const m=(lo+hi)/2;at(m)>W?hi=m:lo=m;}t.style.fontVariationSettings='"wdth" '+lo;}
 else if(f==='serif'||f==='sans'){const sx=Math.max(.72,Math.min(1.38,r));t.style.fontSize=fs*r/sx+'px';t.style.transform='scaleX('+sx+')';}
 else t.style.fontSize=fs*r+'px';}
```

### ② 兩色墨在色紙上（Two inks on tinted stock）

只有墨 `#1A1712` 與朱 `#C42A1E` 兩版；紙是色紙，一頁一種：告示綠 `#C9DBC0`、金絲雀黃 `#E9CE5A`、告示藍 `#B9CAD9`。零漸層、零陰影、零發光、零圓角。紅版永遠微微不對準（±1.4px），而且慢慢漂。

```css
:root{--ink:#1A1712;--red:#C42A1E;--stock:#C9DBC0}
html,body,.bill{background:var(--stock);color:var(--ink)}
.red{color:var(--red)}
.red .t{animation:reg 7.3s ease-in-out infinite alternate}
@keyframes reg{0%{translate:0 0}50%{translate:1.4px -.5px}100%{translate:-.6px .9px}}
```

### ③ 木紋與缺墨（Worn wood grain & ink starvation）

大字一定看得見楓木端面的橫向紋理與沒吃到墨的針孔。做法是一張 SVG 噪聲遮罩：一層 x 方向極低頻、y 方向高頻的 `feTurbulence`（拉長成橫紋）＋一層細噪聲，`feComposite arithmetic` 相加後以 `feColorMatrix` 把亮峰閾值化成透明洞（約一成面積）。

```css
:root{--grain:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='f' x='0' y='0' width='100%25' height='100%25'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.011 0.38' numOctaves='2' seed='7' stitchTiles='stitch' result='g'/%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' seed='3' stitchTiles='stitch' result='n'/%3E%3CfeComposite in='g' in2='n' operator='arithmetic' k2='0.62' k3='0.62' k4='-0.12'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 -22 0 0 0 14.6'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23f)'/%3E%3C/svg%3E")}
.wood .t,.wear{-webkit-mask-image:var(--grain);mask-image:var(--grain);mask-size:300px 300px;mask-repeat:repeat}
```

### ④ 粗細規線、點線與指示手（Oxford rules, dotted rules, manicules, stars）

行與行之間只用印房的花邊：粗細雙線（4px＋1.5px）、細雙線、圓點線、中間夾一顆星的雙線。指引一律用指示手（自繪 SVG，不用 emoji 或 Unicode 字元）。

```css
.rule{height:9px;margin:12px 0;border-top:4px solid var(--ink);border-bottom:1.5px solid var(--ink)}
.rule.dots{height:6px;background:radial-gradient(circle,var(--ink) 1.6px,transparent 2px) 0 50%/9px 6px repeat-x}
.orn{display:flex;align-items:center;gap:10px}.orn:before,.orn:after{content:"";flex:1;height:6px;border-top:3px solid var(--ink);border-bottom:1px solid var(--ink)}
```
```html
<svg viewBox="0 0 64 30"><path d="M1 7h11v17H1z"/><path d="M13 6h17c3 0 4.5 1.5 4.6 3.4H61c2.4 0 2.4 4.6 0 4.6H36v1.6c0 1.6-1.2 2.6-2.8 2.6h-.4v.4c0 1.6-1.2 2.6-2.8 2.6h-.6v.2c0 1.5-1.2 2.6-2.8 2.6H13z"/><path fill="none" stroke="var(--stock)" stroke-width="1.4" d="M4 9v13M8 9v13M30.4 14.2H36M29.6 18.6h3.4M27.4 23h2.6"/></svg>
```

### ⑤ 對稱堆疊、驚嘆號語法與版權行（Centered stack, exclamatory copy, imprint）

整張告示是一根置中的柱：小字地名 → 巨大店名 → 紅色英文大字 → 業別 → 時間地點 → 庫存版圖（stock cut）→「One Night Only!」→ 底部一行小字印房版權行（誰印的、什麼機器、地址電話）。文案用告示語法：短、驚嘆號、時間在前。外框是 6px 粗線＋外 2px 細線的雙框。

```css
.bill{max-width:720px;margin:0 auto;border:6px solid var(--ink);outline:2px solid var(--ink);outline-offset:5px;padding:26px 30px 30px}
.imprint{font-size:12.5px;text-align:center;border-top:1.5px solid var(--ink);padding-top:10px}
```

## 色彩系統

| 角色 | hex | 用途 | 比例 |
|---|---|---|---|
| 告示綠紙 | `#C9DBC0` | 首頁紙色、logo 地 | 首頁 ~70% |
| 金絲雀黃紙 | `#E9CE5A` | 道具目錄頁紙色 | 道具頁 ~70% |
| 告示藍紙 | `#B9CAD9` | 學藝頁紙色 | 學藝頁 ~70% |
| 墨 | `#1A1712` | 字、規線、外框、版圖 | ~22% |
| 朱 | `#C42A1E` | 第二版：每頁 2–4 行、價格、紅心方塊、現用導覽 | ≤8% |

規則：一頁只用一種紙；不加第三種墨；朱不做底色，只做字與花；紙色上的字一律墨或朱，不用灰。

## 字體系統

Google Fonts：`Anybody`（wdth 50–150、wght 400–900，拉丁可變寬 Gothic）、`Abril Fatface`（Fat Face）、`Ultra`（Antique 粗板）、`Rye`（Tuscan 飾線）、`Holtwood One SC`（Extended Antique）、`Noto Serif TC` 900／500、`Noto Sans TC` 900／500。

- 展示行：字級＝`--s`（版心寬的百分比，3–40），由撐滿演算法覆寫；行高 .94。
- 正文：Noto Serif TC 500，16–18px，行高 1.75，置中、`text-wrap:pretty`，最寬 34em。
- 價格與年份：Ultra。
- 版權行：12.5px。
- 字盤（type case）：中文 `serif ↔ sans`；拉丁 `anyb → fat → slab → tusc → wide`。滑過一行就換下一副字並重新撐滿。

## 版面與網格

- 單柱置中，版心 ≤720px，以 `container-type:inline-size` 讓字級跟版心走（cqi）。
- 零旋轉：告示是鎖在版台上印的，沒有歪斜。
- 每一個區塊之間必有一道規線；連續兩道規線種類不同。
- 留白只在外框內 26–30px；版心內不留空行（木塞也是字的一部分）。
- ≤560px：外框 4px、內距 10px，仍維持每行撐滿；導覽改底部三等分。

## 元件配方

- **導覽（manicule-nav 指示手導覽）**：左側 124px 固定欄，三隻指示手各指一頁名（告示／道具／學藝＋英文小字 BILL／GOODS／LESSONS）；hover 手往右推 8px；現用頁的手印成朱、頁名下加 4px 朱線。≤860px 變為底部 72px 橫列。欄內最下是「聲音：開／關」鈕。
- **按鈕**：墨底紙色字、零圓角、Noto Sans TC 900；hover 變朱底。次要鈕為 3px 墨框透明底。
- **卡片（撲克牌字塊）**：3px 墨框＋內縮 7px 細框，左上 Ultra 點數、右上 SVG 花色；紅心方塊為朱版。
- **表格（價目）**：每列點線分隔，價格欄 Ultra 右對齊。
- **券**：3px 虛線框，標題朱、單號 Ultra。
- **Footer**：版權行（見特徵⑤）。

## 動效規則

全部四種都有本站自製實作；motion-library 元件為額外加上。

| 類型 | 本站自製 | 觸發 | duration／easing | reduced-motion |
|---|---|---|---|---|
| ambient 環境 | 紅版對版漂移（`translate` ±1.4px） | 持續 | 7.3s ease-in-out alternate | 停在 0 |
| ambient 環境 | 營業狀態依臺北真實時間改寫（營業中／開演中／打烊） | 載入 | — | 不受影響 |
| input 輸入 | 換字盤：滑過或點一行＝換一副木字並即時撐滿＋WebAudio 敲字聲 | pointerover | 單行最多 9 次量測，同一幀內完成 | 照常（本來就無動畫） |
| input 輸入 | 指示手 hover 前推 8px；牌 hover 右移 4px | hover／focus | 180ms／120ms | 無位移 |
| transition 轉場 | 換頁：告示揭起（−60px、−1.4°）→ 下一張鋪下（+46px、.8° → 0） | 點內部連結 | 360ms cubic-bezier(.6,0,.8,.3)／520ms cubic-bezier(.2,.8,.2,1) | 直接換頁 |
| transition 轉場 | 三疊重發：二十一張牌 FLIP 飛到新位置 | 每次指欄 | 420ms＋每張 16ms 錯開 | 直接重排 |
| transition 轉場 | 揭曉：鉛字逐行落版（−40px → +3px → 0） | 第三次指欄 | 300ms、行距 170ms | 直接顯示 |
| **signature 簽名** | **第二刷**：上了朱墨的滾筒從上往下走過告示，紅版才一行一行印上（每個紅元素的 `mask-image` 線性遮罩 `--r` 0→1 與木紋遮罩 `mask-composite:intersect`）＋低頻滾筒聲 | 每頁載入；揭曉時再走一次 | 1500ms／900ms easeInOutQuad | 紅版直接在 |

自我限制：不用淡入當主打、不用跑馬燈、不用視差。

### motion-library 元件表（PLAYBOOK §2.8）

來源：`wenxiangxiao/motion-library` 1.32.0 @66e54db2，`tools/ml-embed.js` 逐頁產生子集後 terser 壓縮（每頁約 156KB），`tools/ml-smoke.js` 皆 smoke ok。三格顏色只填本站色票。開發 Prompt 見 `MotionLib.prompt(id)`。

| ID | 名稱 | 頁 | 參數 | 類型 | 承載什麼／為什麼適合 |
|---|---|---|---|---|---|
| BG-A-06 | Dizzy Stars | index | colors `#C42A1E／#1A1712／#C9DBC0`、duration 9、loop、density 1.2、intensity 1、seed 1962、16:9（容器 120px 裁切） | ambient | 「今晚店頭節目」星帶：告示上最常見的花飾就是星，這裡讓兩色星沿橢圓繞場＝戲台上的「變」；平色星形、無發光 |
| TXT-B-32 | Shuffle Letters | index | text「心裡記一張」、duration 1.8、once、seed 21、16:9、maxHeight 180 | transition | 〈猜你的牌〉標題的五個字像洗牌一樣換位後落定；亮紙底→近黑字，與墨版一致 |
| TXT-B-24 | Text Fan | dao-ju | text「道具目錄」、colors 朱／墨／`#E9CE5A`、duration 1.6、once、seed 4、maxHeight 180 | transition | 標題字像一手牌由扇形收攏成一行＝道具行最基本的扇牌手法 |
| SHP-22 | Radial Fan | dao-ju | colors 朱／墨／`#E9CE5A`、duration 1.4、once、seed 52、1:1 | input | 撲克條目旁的扇牌：八片朱墨交錯扇面一片片展開；按「再開一次扇」重播；扇面為直邊平色，無圓角無發光 |
| TXT-A-26 | Flip | ke-tng | text「學戲法」、colors 朱／墨／`#B9CAD9`、duration 1.5、once、seed 7、maxHeight 180 | transition | 三個字像翻牌一樣由背面（朱）翻到正面（墨）＝「拆穿」那一刻 |

讀過原始碼後排除：TXT-A-03 Stamp In（`rr()` 圓角印框，違反零圓角）、SHP-36 Dash March（圓角框）、Halftone 系（網點是照相製版，不是木活字）。

掛載：`KT.ml` 等 `document.fonts.ready`、離屏 `destroy()`、回到視窗重掛；一次性元件 `loop:false` 只播一次、之後 `seek(1)`；canvas `aria-hidden`，原 HTML 標題留在 `.ml-fb`，掛載成功才視覺隱藏；reduced-motion 背景 `seek(.35)`、文字 `seek(1)`。同一畫面同時運轉 ≤2 個。

## 插畫與圖像風格

印刷所庫存版圖（printer's stock cut）：十九世紀印房買現成的小鉛版圖（禮帽、戲法棒、手、星）塞進告示。全部自繪 SVG：墨平塗剪影＋以紙色描 1.4–1.6px「刻刀反白線」表現體積，紅只在星與菱形上（第二版）。全部掛 `.wear` 木紋遮罩。不畫寫實插圖、不用線框插畫、不用照片。

## Logo 與 Favicon 設計指南

Logo：告示綠方塊、10px＋3px 雙框，中央墨色禮帽剪影、帽頂一顆朱星——一塊可以直接鎖進版台的「店章」。Favicon：墨方塊、紙色細框、朱星。

## 技術實作與相容性

| 技術 | 層 | 承載 | 支援現況與查證 | fallback |
|---|---|---|---|---|
| CSS `mask-image`（SVG 噪聲 data URI＋linear-gradient、`mask-composite:intersect`） | A 渲染 | 特徵③木紋缺墨、signature 第二刷 | caniuse〈CSS property: mask-image〉：Chrome／Edge 120+、Firefox 53+、Safari 15.4+ 完整支援，更早為前綴部分支援 | 不支援時字完整無缺墨；第二刷時紅版直接顯示（`-webkit-mask-composite:source-in` 給舊 WebKit）。遮罩只掛在 HTML 元素與 SVG 根元素上，不掛在 SVG 內部 `<path>`（各引擎支援不一） |
| `font-variation-settings "wdth"`＋ResizeObserver 逐行撐滿 | C 版面 | 特徵①一行一副字撐滿版心、input 換字盤 | MDN〈font-variation-settings〉Baseline Widely available（2018-09 起）；`wdth` 對應 font-stretch；ResizeObserver Baseline Widely available | 無 JS：`cqi` 字級的置中近似版；可變字型未載入時退為字級撐滿 |
| Web Audio API 合成（noise＋BiquadFilter＋Gain＋方波 LFO，零音檔） | D 輸入感測 | 敲字、洗牌、鼓滾、鈸、滾筒聲 | MDN〈Web Audio API best practices〉：AudioContext 須在使用者手勢內建立或 `resume()`；Chrome autoplay policy（blink-dev Intent to Ship） | 預設關閉，按「聲音：開」才建立；不支援時靜音，資訊零損失 |

效能：三頁 HTML 各約 183–190KB（含 motion-library 子集約 156KB）＜350KB；撐滿每行最多 9 次量測，全頁約 20 行，只在字型就緒與版心寬度改變時執行；第二刷每幀只寫 CSS 變數（≤30 個元素）；同畫面運轉的 canvas ≤2。建置環境無瀏覽器，以上為結構估算＋jsdom 流程測試（三次指欄後必揭曉同一張牌），未做實機 fps 量測。

## Do & Don't

**Do**：每行換字、撐滿；紅只給 2–4 行；每段之間一道規線；文案寫告示語氣（時間在前、驚嘆號、價格寫死）；底部一定有印房版權行。

**Don't**：紫藍漸層、圓角卡片、模糊陰影、emoji icon（花色與指示手都自繪）、Lorem ipsum、EST. 徽章、相鄰兩行同一副字、留白呼吸感的「極簡告示」、把紅當底色、斜放字行。

## 頁面骨架範例

```html
<nav class="mnav" aria-label="三張告示"><a href="index.html" aria-current="page"><!-- 指示手 SVG --><span>告示</span><small>BILL</small></a>…</nav>
<main class="bill" id="bill">
 <p class="ln f-sans" data-f="sans" data-swap style="--s:4.6"><span class="t">臺北・西門町・漢中街</span></p>
 <div class="rule"></div>
 <h1 class="ln f-serif wood" data-f="serif" data-swap style="--s:30"><span class="t">變猴弄</span></h1>
 <p class="ln f-anyb red wood" data-f="anyb" data-swap style="--s:14"><span class="t">GRAND</span></p>
 <p class="ln f-sans wood" data-f="sans" data-swap style="--s:11"><span class="t">戲法道具行</span></p>
 <div class="rule dots"></div>
 <p class="copy">每晚七點半・店頭小戲台</p>
 <p class="imprint">本告示由○○以木活字自排自印・兩色・地址・電話</p>
</main>
```
