---
name: grunge-raygun-xerox
description: Deconstructed 1990s magazine typography (Grunge / Ray Gun) — collapsed baselines, extreme type-size range, layered occlusion and photocopy generation decay on a toner-grey sheet.
---

# 解構排版・影印世代 — Grunge／Ray Gun

> 流派：**Grunge／Ray Gun 解構排版**（一九九〇年代，David Carson）
> 取自型錄「戰後與反文化」列。既有流派，非自創。
> 視覺家族：**F2 編輯排版**（欄線、字級階層、大量文字是主角——只是這裡的階層被拆掉了）

---

## 一、設計哲學

一九九二年，David Carson 接下《Ray Gun》。他不是排版科班出身，他是排名世界第八的職業衝浪選手，做過《Transworld Skateboarding》與《Beach Culture》。他把一整篇 Bryan Ferry 的訪談排成 Zapf Dingbats——因為他覺得那篇訪談很無聊。

他留下的那句話是這個流派的全部：**Don't mistake legibility for communication.**（別把「讀得出來」當成「傳達到了」。）

所以這個風格的設計哲學不是「亂」，是**一個明確的取捨**：

1. **讀者要付出力氣。** 版面不服務快速掃讀。你要找一個東西，你得找。找到的東西你會記得。
2. **字是圖像，也還是字。** 同一個字同時扮演造形與資訊；當兩者衝突時，這個流派選造形——但選完要為資訊另外留一條路。
3. **印壞是內容的一部分。** 一九九〇年代的獨立刊物是影印的、傳真的、貼上去再影印一次的。碳粉的膨脹、邊緣的碎裂、噪點，不是濾鏡，是那個年代的物質條件。
4. **沒有網格權威。** 有網格，但它被違反的次數比被遵守的多。

### 這個風格的網頁紀律（原作不需要處理，我們必須處理）

原作是單向印刷品：讀者只能接受。網頁不是。所以照著本規格書做的站必須同時遵守三條：

- **所有被遮蔽、被裁掉、被壓住的資訊，一律在同一份文件的別處以純文字完整重複一次**（頁尾、規格表、版權欄）。破壞是體驗，不是資訊的唯一路徑。
- **正文不逐字位移。** 瓦解只發生在標題、引言、圖說、頁碼、側標與被指名的關鍵詞上。正文段落只做整塊的旋轉與位移。理由有兩個：可讀性，以及逐字 inline-block 的排版成本。
- **螢光色不當文字色。** 見第二章的對比計算。

---

## 二、本風格的 5 個不可省略特徵

拿掉任何一項，它就不是這個風格了。每一項附可直接複製的片段。

### 特徵 1：字級跨度 ≥15 倍，且同一屏至少三種字體

九號的裁切標記和一百五十號的主標在同一個畫面上。這不是「層級」，這是**衝突**。主標一律做成 SVG `<text>`——因為它必須能被濾鏡吃、能出血、能被中縫切斷，而 HTML 文字做不到前兩件。

```css
:root{
  --disp:"Anton","Noto Sans TC",sans-serif;   /* 極窄粗體，拉丁主標 */
  --ser:"Old Standard TT","Noto Serif TC",serif; /* 破舊襯線，引言用斜體 */
  --mono:"Courier Prime",ui-monospace,monospace; /* 打字機，圖說／表格／標籤 */
  --body:"Noto Sans TC",system-ui,sans-serif;    /* 正文 */
}
.crop{font-family:var(--mono);font-size:9px;letter-spacing:.2em}   /* 最小 */
.deck{font-family:var(--ser);font-size:clamp(17px,2.1vw,24px);font-style:italic}
/* 最大：不是 CSS 字級，是一整張撐滿容器的 SVG */
```

```html
<!-- 主標：textLength 逼它撐滿寬度，垂直靠 font-size 控制 -->
<svg viewBox="0 0 1000 190" role="img" aria-label="沒有一塊板是直的">
  <text x="0" y="163" font-family='"Noto Serif TC",serif' font-size="152" font-weight="900"
        fill="#141317" textLength="1000" lengthAdjust="spacingAndGlyphs">沒有一塊板是直的</text>
</svg>
```

> 度量規則：`font-size = 高度 × 0.80`、`baseline = 高度 × 0.86`。中日韓字身高約 0.88em，超過這個比例上緣會被 viewBox 切掉。

### 特徵 2：基線瓦解——逐塊位移與旋轉，且在建置期就寫死

字不對齊。但**位移量必須是決定性的**：同一份文件每次載入長得一樣，否則使用者無法把「我剛剛讀到哪」記在腦子裡。做法是在建置期把每一塊的 `--dx/--dy/--rz` 寫進 inline style，執行期只用一個全域倍率去縮放它。**關掉 JavaScript，瓦解照樣在。**

```css
:root{
  --gen:0;                                  /* 影本世代 0–6 */
  --jit:calc(1.7 + var(--gen)*0.95);        /* 位移倍率，永遠 >0：安靜不是這個風格 */
  --rot:calc(0.55 + var(--gen)*0.26);       /* 旋轉倍率 */
}
.w{display:inline-block;
   transform:translate(calc(var(--dx,0)*var(--jit)*1px),
                       calc(var(--dy,0)*var(--jit)*1px))
             rotate(calc(var(--rz,0)*var(--rot)*1deg));
   transition:transform .16s steps(3)}      /* steps：影印機是機械的，不做平滑補間 */
```

```html
<span class="w" style="--dx:.71;--dy:-.44;--rz:.86">尺告訴</span><span
      class="w" style="--dx:-.32;--dy:.67;--rz:-.51">你哪裡</span>
```

切塊規則：拉丁詞、數字、含引號的尺寸（`5'10"`）整塊不拆；中日韓每 2–4 字一塊。**不要逐字拆中文**——節點數會爆炸，而且點擊命中會變成猜謎。

### 特徵 3：圖層互相遮蔽，且遮蔽是雙向的

不是「圖在下、字在上」。是**後放上去的東西會蓋住先放的**，不管它是圖還是字。用 `mix-blend-mode:multiply` 模擬兩次印刷疊在同一張紙上。

```css
.stack{position:relative}
.under{position:relative;z-index:2}
.over{position:absolute;z-index:8;
      opacity:calc(0.62 + var(--gen)*0.055);   /* 世代越高疊得越死 */
      mix-blend-mode:multiply}
```

```html
<div class="stack">
  <div class="under panel" style="width:64%">…版權欄，白字深底…</div>
  <div class="over" style="right:-34px;top:-14px;width:38%">…板身平面圖…</div>
</div>
```

> 紀律：**重疊率控制在被遮元素的 25% 以內，且不得壓在同一段文字的中央。** 讓它咬到邊角就夠了——咬邊角是風格，糊掉整段是失手。

### 特徵 4：影印世代衰減——碳粉膨脹、閾值化、噪點

沒有灰階、沒有柔邊、沒有模糊陰影、沒有圓角。影印機只會兩件事：**黑**與**不黑**。

用一條 SVG 濾鏡鏈把這件事做出來：位移（邊緣抖）→ 膨脹（碳粉外溢）→ alpha 閾值（消滅抗鋸齒的灰邊）→ 噪點挖洞（碳粉沒吃到的地方）。**七個世代 = 七個預先定義好的濾鏡，用 CSS 切換，執行期不改任何 SVG 屬性。**

```html
<svg width="0" height="0"><defs>
<filter id="g3" x="-9%" y="-9%" width="118%" height="118%" color-interpolation-filters="sRGB">
  <feTurbulence type="fractalNoise" baseFrequency="0.62" numOctaves="2" seed="46" result="N"/>
  <feDisplacementMap in="SourceGraphic" in2="N" scale="3.45"
                     xChannelSelector="R" yChannelSelector="G" result="W"/>
  <feMorphology in="W" operator="dilate" radius="0.48" result="D"/>
  <feComponentTransfer in="D" result="T">
    <feFuncA type="discrete" tableValues="0 0 1 1"/>   <!-- 閾值化：沒有半透明邊 -->
  </feComponentTransfer>
  <feTurbulence type="fractalNoise" baseFrequency="1.35" numOctaves="1" seed="58" result="S"/>
  <feColorMatrix in="S" type="luminanceToAlpha" result="SL"/>
  <feComponentTransfer in="SL" result="SH">
    <feFuncA type="discrete" tableValues="1 1 1 1 0 0"/> <!-- 世代越高，0 越多＝洞越多 -->
  </feComponentTransfer>
  <feComposite in="T" in2="SH" operator="in"/>
</filter>
</defs></svg>
```

```css
.ink{filter:url(#g0)}
html[data-gen="3"] .ink{filter:url(#g3)}   /* …g1 到 g6 依此類推 */
```

參數表（`n` = 世代 0–6）：`displacement scale = n×1.15`、`dilate radius = n×0.16`、噪點 `tableValues` 從 `1 1 1 1 1 1` 逐級補 `0`。

再加一層全域碳粉噪點（`multiply`，紙紋而非陰影）：

```css
.grain{position:fixed;inset:-4%;pointer-events:none;z-index:60;
  opacity:calc(0.13 + var(--gen)*0.05);mix-blend-mode:multiply;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='3' seed='11'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='discrete' tableValues='0 0 0 0 1 1'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)'/%3E%3C/svg%3E")}
```

### 特徵 5：版面沒有邊界——出血、被裁、被中縫吃掉

東西撞到頁邊就被切。這不是溢出的意外，是**版面唯一的邊界宣言**：紙有邊，內容沒有。

```css
.pg{position:relative;overflow:hidden}     /* 裁刀就是這一行 */
.bleedL{margin-left:calc(-1 * var(--pad) - 40px)}
.bleedR{margin-right:calc(-1 * var(--pad) - 46px)}
.folio-mark{position:absolute;bottom:8px;left:-12px;   /* 頁碼有一半在紙外 */
  font-family:var(--disp);font-size:64px;line-height:.8}
/* 中縫：階梯式硬邊，不是柔和漸層——影印一本攤開的書就是這樣 */
.gutter{position:absolute;left:50%;top:0;bottom:0;width:56px;transform:translateX(-50%);
  pointer-events:none;background:linear-gradient(90deg,
    rgba(20,19,23,0) 0 18%, rgba(20,19,23,.16) 18% 34%, rgba(20,19,23,.42) 34% 46%,
    #141317 46% 54%, rgba(20,19,23,.42) 54% 66%, rgba(20,19,23,.16) 66% 82%,
    rgba(20,19,23,0) 82% 100%)}
```

---

## 三、色彩系統

一台影印機、一支螢光筆、一支跑水的第二滾筒。**五色，不多不少。**

| 色 | Hex | 比例 | 用途 |
|---|---|---|---|
| 影印紙灰 | `#CBCAC6` | 38% | 唯一大面積地色。**不是米白、不是純白**——是被影印機烤過的中性灰，飽和度 3%。純白會讓碳粉噪點看起來像髒污而不是印刷。 |
| 碳粉黑 | `#141317` | 32% | 所有文字、所有框線（一律 2–3px 實線）、所有深色版塊、頁尾 |
| 曝光白 | `#F2F1EC` | 14% | 深底上的文字、掃描燈掃過去的那一格 |
| 螢光橘 | `#FF3A0F` | 10% | **唯一彩色**。只給：可動作、現用態、被找到的字、裁切標記、鰭。 |
| 海溝青 | `#0D6C78` | 6% | 第二支滾筒，**只給水**（浪的塊面）。不給文字、不給連結、不給品牌。 |

### 一條硬規則：螢光橘不當文字色

`#FF3A0F` 對 `#CBCAC6` 的對比只有 **2.16:1**——小字不合格，大字也不合格。所以：

```css
/* ✗ 不要 */ .kicker{color:#FF3A0F}
/* ✓ 要：把橘變成色塊或底線，文字仍是碳粉黑 */
.hot{color:var(--toner);border-bottom:3px solid var(--hot);display:inline-block;padding-bottom:2px}
.card .no::before{content:"";display:inline-block;width:7px;height:7px;background:var(--hot);margin-right:5px}
/* 深底上就自由了：#FF3A0F 對 #141317 是 5.14:1 */
.panel .hot{color:var(--hot);border-bottom:0}
/* 反白時橘當底、碳粉黑當字：一樣 5.14:1 */
.w:hover{background:var(--hot);color:var(--toner)}
```

零漸層（中縫的階梯色標例外，且它是硬階不是漸變）、零模糊陰影、零圓角。投影一律做成實心位移色塊或 `text-shadow` 的碳粉重影：

```css
.shred{text-shadow:calc(var(--ghost)*1px) calc(var(--ghost)*-0.7px) 0 rgba(20,19,23,.42)}
/* --ghost:calc(0.35 + var(--gen)*0.6) */
```

---

## 四、字體系統

| 角色 | 字體 | 字級 | 字重／行高 |
|---|---|---|---|
| 拉丁主標 | Anton | SVG，容器高 × 0.80 | 400／—（Anton 只有一個字重，這是它的優點） |
| 中日韓主標 | Noto Serif TC | SVG，容器高 × 0.80 | 900／— |
| 引言 deck | Old Standard TT *italic* | `clamp(17px,2.1vw,24px)` | 400／1.34 |
| 問句 Q | Anton | `clamp(15px,1.7vw,19px)` | 400／1.3 |
| 正文 | Noto Sans TC | 15px | 400／1.62，`max-width:44ch` |
| 圖說／表格／標籤 | Courier Prime | 10–12.5px | 400／1.45–1.8 |
| 裁切標記 kicker | Courier Prime | 9–10px，`letter-spacing:.36em` | 700／— |

Google Fonts 一行載完：

```html
<link href="https://fonts.googleapis.com/css2?family=Anton&family=Old+Standard+TT:ital,wght@0,400;0,700;1,400&family=Courier+Prime:ital,wght@0,400;0,700;1,400&family=Noto+Sans+TC:wght@400;700;900&family=Noto+Serif+TC:wght@700;900&display=swap" rel="stylesheet">
```

字級階梯刻意**不連續**：9 → 10.5 → 12.5 → 15 → 19 → 24 →（跳過 30–100）→ 150。中間那一段空白就是這個風格的張力來源。

---

## 五、版面與網格

**基礎單位是「跨頁」，不是「頁」。** 兩欄等寬，中間一條中縫；左右各自 `overflow:hidden`（裁刀）。

```css
.spread{position:relative;display:grid;grid-template-columns:1fr 1fr;
  border-left:2px solid var(--toner);border-right:2px solid var(--toner)}
.pg{position:relative;overflow:hidden;min-height:62vh;padding:26px clamp(12px,2.4vw,30px) 40px}
.pg.L{padding-right:46px}   /* 靠近中縫的那一側加寬內距＝被裝訂吃掉的部分 */
.pg.R{padding-left:46px}
```

旋轉角度只用四個值，且**永遠不是 0 也永遠不超過 3°**：`-2.4° / -1.9° / 1.4° / 1.7°`。超過 3° 就變成裝飾，低於 1° 看起來像沒對齊的失誤。

```css
.tilt{transform:rotate(-2.4deg)} .tilt2{transform:rotate(1.7deg)}
```

留白規則：**不平均分配**。一頁上會有一塊 30% 的空白和一塊擠到出血的密集區，不會有四塊等距的區塊。直排側標（`writing-mode:vertical-rl`）用來填那條沒人要的窄邊，並且刻意讓它被裁掉一半。

RWD：`≤640px` 跨頁攤成單欄，中縫消失、頁碼從絕對定位改為靜態、出血縮到 −12px。**瓦解、疊層、噪點全部保留**——手機不是簡化版，是窄版。

---

## 六、元件配方

### 導覽：folio-bleed 出血頁碼

四頁 = 四個頁碼。現用頁那一個**掉出版心、下緣被裁刀切掉**，並套上螢光橘底。語意是「這一張正在印」。

```css
.folios{display:flex;align-items:flex-end;overflow:hidden;border-bottom:3px solid var(--toner)}
.fo{display:flex;flex-direction:column;justify-content:flex-end;height:60px;overflow:hidden;
    padding:0 9px;position:relative;text-decoration:none;color:var(--toner);
    font-family:var(--disp);font-size:clamp(22px,3.4vw,38px);line-height:.88}
.fo span{order:-1;font-family:var(--mono);font-size:10px;letter-spacing:.2em;padding-bottom:3px}
.fo:hover{background:var(--toner);color:var(--burn)}
.fo.cur b{background:var(--hot);color:var(--toner);padding:0 7px;transform:translateY(15px)}
.fo.cur::after{content:"";position:absolute;left:0;right:0;bottom:0;border-top:2px dashed var(--toner)}
```

### 按鈕：被裁歪的方塊

```css
.btn{font-family:var(--disp);font-size:15px;background:var(--toner);color:var(--burn);
  border:0;padding:9px 16px;cursor:pointer;display:inline-block;text-decoration:none;
  clip-path:polygon(0 0,100% 2px,calc(100% - 3px) 100%,2px calc(100% - 2px))}  /* 四角各差幾像素 */
.btn:hover{background:var(--hot);color:var(--toner)}
.btn.ghost{background:transparent;color:var(--toner);outline:2px solid var(--toner)}
```

### 卡片：**沒有卡片。**

有的是共用邊框的格子。`gap:0`，靠 `border-right/border-bottom` 拼成一面網格——像貼在牆上的規格表。

```css
.rack{display:grid;grid-template-columns:repeat(auto-fill,minmax(168px,1fr));gap:0;
  border-top:2px solid var(--toner);border-left:2px solid var(--toner)}
.card{border-right:2px solid var(--toner);border-bottom:2px solid var(--toner);padding:10px}
.card:hover{background:var(--burn)}
```

### 表格：反白表頭、只有底線

```css
table{border-collapse:collapse;width:100%;font-family:var(--mono);font-size:12.5px}
th{background:var(--toner);color:var(--burn);letter-spacing:.06em;font-weight:700}
th,td{border-bottom:1px solid var(--toner);padding:5px 6px;text-align:left;vertical-align:top}
```

### 頁尾：**資訊的避難所**

上面被破壞掉的每一件事，這裡用 Courier Prime 11.5px 完整、平鋪、不旋轉地重講一次。這是這個風格能上線的前提。

---

## 七、動效規則（四式，缺一不可）

| 類型 | 名稱 | 觸發 | 參數 | reduced-motion |
|---|---|---|---|---|
| ambient | 曝光掃描條 | 無 | `11s steps(28) infinite`，`mix-blend-mode:screen`，`opacity:.2` | 停在 38vw 定點，opacity 降至 .12 |
| input | 湊近看 | 游標移動 | 噪點層在游標處挖一個 118px 的洞；rAF 節流，延遲 <100ms | 遮罩整個關掉，噪點均勻（噪點從不承載資訊） |
| transition | 送紙 | 進頁 | `clip-path:inset(100% 0 0 0)→inset(0)` + `skewY(1.1deg)→0`，`.34s steps(9)` | `animation:none`，直接是最終畫面 |
| signature | **可讀性升階** | 使用者答對 | `--gen` +1，整站四頁一起變難讀，`localStorage` 持久 | 補間歸零、瞬間到位；世代與答案完全一致 |

```css
@keyframes scan{from{transform:translateX(-14vw)}to{transform:translateX(106vw)}}
.scan{position:fixed;top:0;bottom:0;width:11vw;pointer-events:none;z-index:55;
  background:var(--burn);mix-blend-mode:screen;opacity:.2;animation:scan 11s steps(28) infinite}

@keyframes feed{from{clip-path:inset(100% 0 0 0);transform:translateY(16px) skewY(1.1deg)}
                to{clip-path:inset(0);transform:none}}
.sheet{animation:feed .34s steps(9) both}

@media (prefers-reduced-motion:reduce){
  .scan{animation:none;transform:translateX(38vw);opacity:.12}
  .sheet{animation:none}
  .w{transition:none}
  .grain{-webkit-mask-image:none;mask-image:none}
}
```

**一律用 `steps()`，不用 `ease`。** 影印機、送紙輪、掃描燈都是機械的；平滑的 easing 會讓整套語彙滑回一般網頁。

### 簽名動效：可讀性升階（legibility-escalation）

這是本風格的唯一簽名，也是它的思想被做成可操作物的地方：**介面因為你讀得動而變得更難讀。**

- 世代 0–6，只有一個變數 `--gen`，它同時驅動：濾鏡（切 `#g0`–`#g6`）、位移倍率、旋轉倍率、碳粉重影、噪點不透明度、疊層不透明度。
- 世代寫進 `localStorage`，**四頁一起變**。這不是一個小工具的內部狀態，它是整份刊物的狀態。
- 一定要有退路：一顆「求救」把世代退一級。沒有退路的破壞是霸凌不是設計。

---

## 八、插畫與圖像風格：generation-decay 世代衰減構成

**零外部圖片、零寫實描繪、零灰階。** 全部圖像只由三種原語構成，並且每一張都讀得出「它被印了幾次」。

1. **閉合輪廓**：物件的平面圖，用 Catmull–Rom 轉貝茲平滑的控制點列生成，**只有實心與挖空兩種填色**。
2. **閾值化塊面**：把一個連續量（浪面、時間、密度）切成 7–9 條硬邊帶，帶與帶之間絕不漸變。偶數帶碳粉黑、奇數帶海溝青。
3. **碳粉噪點**：由 `#g0`–`#g6` 濾鏡統一附加，不手繪。

```javascript
// 塊面帶：沒有灰階，只有兩塊顏色硬邊交替
for(let i=0;i<n;i++){
  const y0=H*(i/n), amp=H*0.055*(1-i/n)+4, ph=rnd()*6.28, fr=1.1+rnd()*2.2;
  let d=`M0,${H} L0,${y0}`;
  for(let k=0;k<=16;k++) d+=` L${W*k/16},${y0+Math.sin(ph+fr*k/16*6.28)*amp*0.5+amp*0.5}`;
  d+=` L${W},${H} Z`;
  paths+=`<path d="${d}" fill="${i%2?'#0D6C78':'#141317'}"/>`;
}
```

同一支引擎必須同時供應 logo、favicon、縮圖、大圖與使用者產出物——判準是「拿掉所有文字，仍讀得出這是同一台機器印的」。

**明文禁用**：`stroke-linecap:round`、細線幾何線描、半調網點、漸層、模糊陰影、任何寫實描繪。

---

## 九、Logo 與 Favicon

**Logo**（`assets/logo.svg`，獨立檔）：物件的閉合輪廓 + Anton 大寫店名 + Courier 副標，**整組套同一支 `feMorphology` 濾鏡**（`radius:0.32`），底下壓一條 4px 螢光橘。原則：logo 不是一個標誌，它是一張被影印過的名片。

**Favicon**：inline SVG data URI 寫在 `<head>`，只用三個元素——碳粉黑底、一塊曝光白的閉合形、一條螢光橘橫槓。16px 下必須還讀得出那三塊。

```html
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%23141317'/%3E%3Cpath d='M16 3c3.4 4.6 5 9 5 13s-1.6 8.4-5 13c-3.4-4.6-5-9-5-13s1.6-8.4 5-13z' fill='%23F2F1EC'/%3E%3Crect x='2' y='20' width='28' height='3' fill='%23FF3A0F'/%3E%3C/svg%3E">
```

---

## 十、Do & Don't

**Do**

- 讓一塊東西被裁掉、被壓住、掉出版面外——**每一頁至少三處**。
- 位移量寫在建置期（inline style），執行期只縮放。關掉 JavaScript 版面仍然是壞的。
- 螢光橘當色塊、當底、當標記；文字色留給碳粉黑與曝光白。
- 每一個被破壞的資訊，在頁尾或規格表裡完整重複一次。
- 動效一律 `steps()`。

**Don't**

- ✗ 紫藍漸層 hero、置中大標＋副標＋兩顆按鈕＋三張圓角卡片
- ✗ emoji 當 icon（icon 一律自繪 SVG，只用直線、45° 斜線與正圓）
- ✗ 圓角、模糊陰影、灰階、漸層（中縫階梯色標除外）
- ✗ Lorem ipsum、AI 腔文案、「EST. 19xx」徽章、「把 X 變成 Y」式標題
- ✗ 螢光橘寫小字（2.16:1，不合格）
- ✗ 跑馬燈——這個流派的字不捲動，它被壓扁、被裁掉、被印壞
- ✗ 逐字拆中文做 inline-block（節點爆炸、點擊命中變猜謎）
- ✗ 把正文也拆掉。**Carson 破壞的是版面，不是讀者的耐心底線。**
- ✗ 為了亂而亂。每一處破壞都要能回答「這裡在遮什麼、被遮的東西在哪裡還找得到」。

---

## 十一、頁面骨架範例

```html
<!doctype html>
<html lang="zh-Hant" data-gen="0">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>…</title>
<link rel="icon" href="data:image/svg+xml,…">
<link href="https://fonts.googleapis.com/css2?family=Anton&…" rel="stylesheet">
<style>/* 全部 inline */</style>
</head>
<body>
<a class="skip" href="#main">跳到內容</a>
<div class="scan" aria-hidden="true"></div>     <!-- ambient -->
<div class="grain" aria-hidden="true"></div>    <!-- 碳粉 -->
<svg width="0" height="0"><defs><!-- filter g0…g6 --></defs></svg>

<div class="wrap"><nav class="folios" aria-label="主導覽">
  <a class="mast" href="index.html">NOISE SWELL<i>刊名・期數</i></a>
  <a class="fo" href="a.html"><b>44</b><span>跨頁</span></a>
  <a class="fo cur" href="b.html" aria-current="page"><b>68</b><span>訪談</span></a>
  …
</nav></div>

<main id="main" class="wrap sheet">                 <!-- transition：送紙 -->
  <div class="spread">
    <div class="gutter" aria-hidden="true"></div>
    <section class="pg L" aria-label="左頁">
      <span class="crop" style="top:6px;left:2px">44 ／ ISSUE 17</span>
      <div class="bleedL"><svg …>巨型主標</svg></div>
      <div class="stack">
        <div class="under deck shred" style="transform:rotate(-1.6deg)">
          <span class="w" style="--dx:.7;--dy:-.4;--rz:.9">引言</span>…
        </div>
        <div class="over" style="right:-30px;top:34px;width:56%"><svg …>塊面</svg></div>
      </div>
      <div class="body"><p>正文：不逐字位移，整塊可旋轉。</p></div>
      <span class="folio-mark ink" aria-hidden="true">44</span>
    </section>
    <section class="pg R" aria-label="右頁"> … </section>
  </div>
</main>

<footer class="foot"><!-- 上面被破壞的資訊，這裡完整重講一次 --></footer>
</body></html>
```

---

## 十二、技術實作與相容性

三項核心技術，分屬三層，各自承載一個不可省略特徵。查證日期 **2026-09-04**。

### (A 渲染層) SVG filter 世代衰減鏈：feMorphology + feComponentTransfer + feDisplacementMap

**承載**：特徵 4（影印世代衰減）與第八章的全部插畫。

**支援現況**：SVG 濾鏡基元（`feTurbulence` / `feDisplacementMap` / `feMorphology` / `feComponentTransfer` / `feColorMatrix` / `feComposite`）為 SVG 1.1 規格，MDN 標示 **Baseline Widely available**，自 2015-07 起跨瀏覽器可用（Chrome / Edge / Firefox / Safari）。
來源：MDN《SVG filter primitives》、《feMorphology》、《feComponentTransfer》各頁的 Browser compatibility 表。

**Fallback**：不支援時 `filter:url(#gN)` 被忽略，圖像退為乾淨的實心黑白輪廓——版面、資訊與可讀性完全不變（事實上更好讀）。**衰減是難度不是資訊**，所以資訊零損失。

**為什麼是這條鏈而不是 CSS `filter`**：CSS `filter` 沒有形態學運算（dilate/erode），做不出碳粉外溢；`feFuncA type="discrete"` 的 alpha 閾值化也沒有 CSS 對應物，而沒有閾值化就會留下抗鋸齒的灰邊——有灰邊就不是影印。

**效能實測**（2026-09-04，Node 22 單執行緒 / 靜態量測）：
- 濾鏡定義：七個 filter × 六個基元，共 **1.9KB**，一次寫進 `<defs>`，執行期不改任何屬性——切世代只是 CSS 選擇器換一個 `filter:url()`，不觸發 layout。
- 每頁被濾鏡吃到的元素數：`index` 6、`shaper` 5、`read` 7、`boards` 25。
- **效能護欄**：`boards.html` 的 24 張縮圖（各 80×148）在 `--gen ≥ 3` 時一律封頂在 `#g3`，避免高世代的位移半徑在密集縮圖上放大成本。這是刻意的取捨，寫在 CSS 裡：
  ```css
  html[data-gen="4"] .plate,html[data-gen="5"] .plate,html[data-gen="6"] .plate{filter:url(#g3)}
  ```
- 建置期引擎（同一支程式，執行期不跑）：`plate()` 0.0174ms/張，一頁 24 張 = **0.42ms**；`waveBlock()` 0.0327ms/張。
- 單頁大小（含 inline 全部 CSS/JS/SVG）：**index 33.3KB／shaper 32.3KB／boards 64.4KB／read 42.4KB**，全部遠低於 350KB 預算。零外部圖片、零音檔；唯一外部資源是 Google Fonts。

### (C 版面與樣式層) CSS Custom Highlight API：`Highlight` + `::highlight()`

**承載**：〈讀版〉的命中標示與「你剛才點到的是這幾個字」回饋。

**為什麼非它不可**：這個版面的每一塊文字都是 `display:inline-block` 且帶著 transform。要把一段文字標起來，傳統做法是插入 `<mark>`——但插入元素會切開文字節點、重跑整頁逐字排版，**使用者會當場弄丟他正在讀的那一行**。Highlight API 完全不動 DOM，只在繪製層上色；而且它接受任意 `Range`，所以可以標「某個詞的中間三個字」，插元素做不到。

**支援現況**：Chrome / Edge 105+（2022-08）、Safari 17.2+（2023-12）、Firefox 140+（2025-06）。自 2025-06 起達成三引擎支援。
來源：MDN《CSS Custom Highlight API》、MDN《CSS.highlights》。

**Fallback**：`if (CSS.highlights && typeof Highlight !== 'undefined')` 偵測；不支援時改為在**整塊** `.w` 上加 class（`background`/`color` 變化，不影響 layout）。差別只是失去「標半個詞」的精度，命中判定、答題流程與結果完全相同。

```javascript
var hasHL = (typeof CSS!=='undefined' && CSS.highlights && typeof Highlight!=='undefined');
if(hasHL){ hlHit=new Highlight(); CSS.highlights.set('hit',hlHit); }
// CSS: ::highlight(hit){background:#FF3A0F;color:#141317}
```

### (D 輸入與感測層) `document.caretPositionFromPoint()` + `Range`

**承載**：〈讀版〉的主要輸入——從像素座標反推「你點到哪一個文字節點的哪一個字」。

**為什麼非它不可**：本風格的畫面是疊層的。`document.elementFromPoint()` 回傳的是**最上層**的元素，在這裡多半是壓在文字上的裝飾塊面或巨型 SVG 主標，不是使用者眼睛看到並且想點的那個字。`caretPositionFromPoint()` 回傳 `{offsetNode, offset}`——文字節點與字元索引——正好跨過裝飾層，直接落在文字上；再往上找最近的 `.w` 就得到那個詞，同時這個 `Range` 也就是餵給 Highlight API 的東西。兩項技術是一條鏈。

**支援現況**：`caretPositionFromPoint()` 為標準方法，**Baseline newly available（2025-12）**；Chrome / Edge 128+、Firefox 長期支援、Safari 於 26 版跟上。WebKit 專屬的舊方法 `document.caretRangeFromPoint()` 自 Chrome 4 / Safari 5 起可用。
來源：MDN《Document.caretPositionFromPoint()》、MDN《Document.caretRangeFromPoint()》、caniuse `mdn-api_document_caretpositionfrompoint`。

**Fallback（兩層）**：
1. 先試標準法，沒有就退 `caretRangeFromPoint()`（涵蓋舊 Safari）：
   ```javascript
   function caretAt(x,y){
     if(document.caretPositionFromPoint){var p=document.caretPositionFromPoint(x,y);
       if(p)return{node:p.offsetNode,offset:p.offset};}
     if(document.caretRangeFromPoint){var r=document.caretRangeFromPoint(x,y);
       if(r)return{node:r.startContainer,offset:r.startOffset};}
     return null;
   }
   ```
2. 兩者都沒有、或根本沒有指標裝置（鍵盤／讀屏使用者）：每一題下方常駐一排**六個候選詞按鈕**（一個答案、五個誘餌，決定性洗牌故順序固定），`Tab` + `Enter` 可完成一模一樣的一輪。這不是降級選項，它一直在畫面上。

### 無 JavaScript 時

四頁的全部內容——跨頁、訪談全文、二十四塊板的規格表、價目、地址電話營業時間——都是靜態 HTML，`--gen` 停在 0（最乾淨的一代）。〈讀版〉的遊戲不能玩，`<noscript>` 直接把五題的答案印出來，並說明它們都在下面那張跨頁上。**破壞是增強，不是前提。**
