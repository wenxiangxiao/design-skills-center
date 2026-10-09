---
name: amiga-demoscene-copper
description: Amiga demoscene cracktro style (1987–1995) — 12-bit copper raster bars, chrome bitmap logos, sine scrollers and a visible per-frame raster budget, rendered pixel-exact on a 320×200 canvas.
---

# Amiga 演示場景 Demoscene ‧ 銅條片頭（Copper Cracktro）

## 0. 血緣與定位

- **流派**：Amiga 演示場景 Demoscene（型錄「數位與螢幕原生」類，2026-10-10 新增條目，全館第 1 站 siang-hi）。
- **年代地域**：1987–1995，北歐、德國、荷蘭、英國為主；載體是 Commodore Amiga 500／2000 的 OCS 晶片組。從遊戲破解組織在開機前放的「破解片頭 cracktro」，長成獨立的 demo、trackmo 與磁片雜誌 diskmag 文化，在 The Party（丹麥，1991–2002）、Assembly（芬蘭，1992–）等聚會上比賽。
- **代表作**：Phenomena〈Enigma〉1991、Spaceballs〈State of the Art〉1992、Kefrens〈Desert Dream〉1993、Sanity〈Arte〉1993；PC 端的 Future Crew〈Second Reality〉1993。工具：Deluxe Paint（點陣圖）、ProTracker／Ultimate Soundtracker（四聲道 MOD 音樂，1987 起）。
- **為什麼長成這樣**：OCS 一次只能顯示 32 色，但調色盤來自 12 位元的 4,096 色（每通道 16 階）。協處理器 Copper 只有 MOVE／WAIT／SKIP 三條指令，卻能在電子束掃到每一條掃描線時改寫顏色暫存器——於是「每條線一個顏色」的水平漸層（銅條 copper bar）幾乎不花 CPU，成了整個流派的招牌。每一格畫面（PAL 312 條、NTSC 262 條掃描線，50／60 Hz）就是程式的全部時間預算：放得進一格才算數，放不進就掉格。
- **外部參照**：Wikipedia〈Raster bar〉〈Amiga Original Chip Set〉；Tamás Polgár《Freax: The Brief History of the Computer Demoscene》2005；Art of Coding 計畫——演示場景 2020 年列入芬蘭國家級無形文化資產、2021 年列入德國名錄，其後波蘭、瑞典、荷蘭。
- **與相鄰條目的分界**：與「8-bit 像素」的分界：那是遊戲美術的 tile 與 sprite，本流派的主角是**整條掃描線的顏色**與**即時效果**；與「CRT 磷光」「終端機 Teletext」的分界：那是單色或字元格，本流派是 4,096 色的點陣與鉻；與「Glitch Art」的分界：那是故障美學，本流派是「在限制內做到完美」，故障（掉格、Guru Meditation）是失敗；與「ASCII/ANSI Art」的分界：那是 BBS 的字元畫，本流派是點陣圖與調色盤；與「蒸汽波」的分界：那是對 90 年代 UI 的懷舊拼貼與粉紫漸層，本流派的漸層一定有看得見的台階。

## 1. 設計哲學

**一格就是全部的預算。** 這個流派的美不是來自「加」，而是來自「在 262 條掃描線、512 KB 裡排得剛剛好」。每一個效果都有代價，代價要看得見（raster time 邊框），超過就會被看見（掉格、當機）。設計者的工作是排列，不是堆疊。

1. 顏色是暫存器，不是無限的 RGB：只用 4,096 色。
2. 漸層是掃描線的換色，所以必有台階。
3. 畫面是 320×200 的點陣，放大只能整倍。
4. 一切運動都是正弦表與等速，60 Hz 鎖格，沒有緩入緩出。
5. 最後一定要有跑字問候 greetings——這是社群的禮儀。

## 2. 本風格的 5 個不可省略特徵

拿掉任何一項，它就不再是 Amiga demo，而只是「暗色系復古網頁」。

### 特徵 1：12 位元調色盤＋看得見台階的銅條

**所有顏色只能寫成 3 位 hex**（#RGB，每通道 0–F 共 16 階＝4,096 色）。漸層一律以硬停點寫成「一階一條」，絕不用平滑插值。銅條＝同一色相亮度 1→15→1 的對稱階梯。

```css
:root{ /* 每個顏色＝一個 OCS 顏色暫存器值 */
  --k:#000;--scr:#002;--txt:#CCD;--red:#E24;--gold:#FC4;--cyan:#0CF;
}
.copper-bar{height:30px;background:linear-gradient(
  #200 0 7%,#400 0 14%,#700 0 21%,#A10 0 28%,#D30 0 35%,#F60 0 42%,#F90 0 50%,
  #F60 0 58%,#D30 0 65%,#A10 0 72%,#700 0 79%,#400 0 86%,#200 0)}
.rule{height:18px;background:repeating-linear-gradient(#F00 0 2px,#F80 0 4px,#FF0 0 6px,#8F0 0 8px,#0F8 0 10px,#0FF 0 12px,#08F 0 14px,#80F 0 16px,#F0F 0 18px)}
```
```js
// canvas 端：4 位元通道 → ImageData 的 ABGR（little-endian）
function C4(r,g,b){return (0xFF000000|((b*17)<<16)|((g*17)<<8)|(r*17))>>>0;}
// 一條 15 線高的銅條：亮度三角形，每條線量化到 16 階
for(let i=0;i<15;i++){const t=1-Math.abs(i-7)/7.5;line(y+i,C4(15*t,2*t,4*t));}
```

### 特徵 2：320×200 整倍放大的點陣，字是方的

主畫面是 320×200（NTSC；PAL 為 320×256）的 canvas，CSS 以 `image-rendering:pixelated` 放大，桌機取整倍。DOM 文字用點陣字體並關掉字體平滑；canvas 裡的字先以 `fillText` 畫到小 canvas，再以 alpha 門檻 110 二值化成 1-bit 遮罩——任何中文字都能變成方邊點陣字。

```css
canvas.screen{width:672px;height:auto;aspect-ratio:336/216;image-rendering:pixelated;image-rendering:crisp-edges}
html{font:16px/1.75 "DotGothic16","Noto Sans TC",monospace;-webkit-font-smoothing:none}
```
```js
function mask(text,size){const c=document.createElement('canvas'),x=c.getContext('2d');
  x.font=`900 ${size}px "Noto Sans TC"`;c.width=Math.ceil(x.measureText(text).width)+4;c.height=Math.ceil(size*1.25);
  x.font=`900 ${size}px "Noto Sans TC"`;x.textBaseline='middle';x.fillText(text,2,c.height/2+1);
  const d=x.getImageData(0,0,c.width,c.height).data,m=new Uint8Array(c.width*c.height);
  for(let i=0;i<m.length;i++)m[i]=d[i*4+3]>110?1:0;return {w:c.width,h:c.height,d:m};}
```

### 特徵 3：鉻字 logo——天空、白地平線、土

標題不是灰色金屬漸層，而是**反射**：上半深藍→淺藍→白，正中一條白，下半立刻轉成深褐→橘→奶油。逐掃描線上色，加 2px 零模糊黑影；在 canvas 版每條線再依正弦水平擺動 ±3px（copper wobble）。

```css
.chrome{background:linear-gradient(#00A 0 8%,#04F 0 16%,#28F 0 24%,#6CF 0 32%,#AEF 0 40%,#FFF 0 50%,
  #420 0 54%,#840 0 62%,#B60 0 70%,#D84 0 78%,#FA8 0 86%,#FDC 0 94%,#FFF 0);
  -webkit-background-clip:text;background-clip:text;color:transparent;
  filter:drop-shadow(2px 2px 0 #000) drop-shadow(-1px -1px 0 #114)}
```

### 特徵 4：正弦跑字＋問候（greetings）

畫面下方必有一條跑字：1-bit 字串遮罩橫向 2 倍放大、每一欄依 `sin(x*k + t)` 上下位移，每一列依彩虹表換色（顏色隨時間往下流），右進左出、等速。內容必含 greetings——感謝名單是這個流派的禮儀，也可以承載營業資訊。

```js
for(let x=0;x<320;x++){const sx=((x+pos-320)/2)|0;if(sx<0||sx>=M.w)continue;
  const y0=base+Math.sin((x*5+t*7)/1024*2*Math.PI)*amp|0;
  for(let r=0;r<M.h;r++)if(M.d[r*M.w+sx]){const c=RAIN[(r*2+t)&63];px(x,y0+r*2,c);px(x,y0+r*2+1,c);}}
```

### 特徵 5：看得見的 raster time，60 Hz 等速

程式設計師當年在每段程式開始與結束時改寫背景色，邊框就會出現一段色帶，長度＝那段程式吃掉幾條掃描線。本流派把它當成 UI：**畫面兩側邊框以各效果的顏色堆疊出耗用的掃描線**，超過一格（262 條）就在底部閃紅、並真的降到 30 格。所有運動都查 1024 格正弦表、每格等量前進，DOM 動畫只用 `steps()` 或 `linear`，禁止 ease。

```js
const FX={bars:{lines:4,col:'F80'},stars:{lines:36,col:'FFF'},logo:{lines:44,col:'0CF'},
  scroll:{lines:52,col:'FF0'},floor:{lines:30,col:'0F4'},bobs:{lines:80,col:'F48'},plasma:{lines:150,col:'A4F'}};
let y=0;for(const k of order) if(on[k]){for(let l=0;l<FX[k].lines;l++){const row=(y+l)*CH/262|0;
  fillRow(row,0,6,FX[k].col);fillRow(row,CW-6,CW,FX[k].col);} y+=FX[k].lines;}
if(y>262){/* frame drop: render every other tick, flash bottom border #F00/#800 at 2 Hz */}
```
```css
.fk{transition:none}            /* 按鍵沒有緩動，按下就下沉 4px */
.hl{transition:top .18s steps(6)} /* 選單高亮像銅條一樣一階一階跳 */
```

## 3. 色彩系統

全部 3 位 hex。比例以首頁首屏估算。

| 角色 | 色票 | 用途 | 比例 |
|---|---|---|---|
| 邊框黑 | `#000` | 頁面底、canvas 邊框、陰影 | 45–55% |
| 螢幕藍黑 | `#002` | canvas 螢幕底、面板底 | 15–20% |
| 正文灰 | `#CCD` | 正文 | 6–8% |
| 暗灰 | `#889`／`#556`／`#224` | 標籤、分隔線、邊框 | 6% |
| 鉻天空 | `#00A #04F #28F #6CF #AEF #FFF` | 鉻字上半 | 隨 logo |
| 鉻土地 | `#420 #840 #B60 #D84 #FA8 #FDC` | 鉻字下半 | 隨 logo |
| 囍紅 | `#E24` | 現用頁 F 鍵、主按鈕、紅心飛球 | 3–4% |
| 喜金 | `#FC4` | 價格、面板標題條、棋盤地板 | 3–4% |
| 效果色 | `#F80 #FFF #0CF #FF0 #0F4 #F48 #A4F #08F` | 每個效果固定一色（raster 表、勾選框） | 2–3% |

規則：不得出現 6 位 hex、rgba、透明度漸層或模糊陰影；淡色只能是另一個 12 位元色，不能是半透明。

## 4. 字體系統

- **DotGothic16**（Google Fonts）— 正文與介面，16px／行高 1.75；缺字由 Noto Sans TC 補位。
- **Press Start 2P**（Google Fonts）— 8×8 點陣英數標籤、F 鍵、按鈕，9–14px，letter-spacing .04–.08em。
- **Noto Sans TC 900**（Google Fonts）— 只用於 h1／h2 與 canvas 鉻字遮罩來源；DOM 版一律套 `.chrome`。
- 字級 scale：9／10／11（標籤）→ 15／16（正文）→ 22／24／26（h3、價格）→ 32–38（h1）。
- 全站關閉字體平滑；canvas 字一律經 1-bit 門檻。

## 5. 版面與網格

- 最大寬 1040px、側邊 16px。首頁為「螢幕＋NFO」兩欄：左 672px（336×2）canvas、右 ≥240px 資訊欄以 2px `#224` 直線分隔。
- 零旋轉、零圓角、零斜角；所有分隔都是 2px 實線或 6–18px 的銅條 rule。
- 區塊以「PART 01／02／03」編號的整列條目排列（像 demo 的分段），不用三張卡片。
- 底部固定 F 鍵列（見元件）佔 ~70px，body 預留 88px。
- ≤900px：螢幕與資訊欄上下疊；≤560px：條目改單欄、F 鍵縮為四等分，canvas 寬 100%（此時允許非整倍放大）。

## 6. 元件配方

**F 鍵列導覽（fkey-strip）**：固定在底部的四顆鍵帽，`F1–F4` 真的可以按（鍵盤事件 preventDefault 後導頁）。鍵帽是四邊不同色的 2px 邊框＋6px 下邊框（立體），按下時下邊框變 2px 並位移 4px；現用頁紅底白字。

```css
.fk{border:2px solid;border-bottom-width:6px;border-color:#889 #445 #223 #667;background:#BBC;color:#000;padding:6px 12px 4px}
.fk:active{border-bottom-width:2px;transform:translateY(4px)}
.fk[aria-current=page]{background:#E24;color:#FFF;border-color:#F88 #A22 #600 #C44}
.fkeys::before{content:"";position:absolute;left:0;right:0;top:-8px;height:6px;background:var(--rainbow);background-size:100% 18px;animation:cop 1.2s steps(9) infinite}
```

**按鈕**：同鍵帽結構；主按鈕 `#E24`，次按鈕 `#BBC`，hover 全部變 `#FF0`。文字用 Press Start 2P 11px。

**面板**：`border:2px solid #446;background:#002`，標題是一塊貼齊左上角的實色條（`#FC4` 黑字、Press Start 2P 11px）。

**表單**：黑底、2px `#446` 邊、黃字 `#FF0`、focus 邊框變 `#FF0`，零圓角。勾選框是 14px 方塊，勾選時填滿該效果的顏色。

**清單（copper list）**：每行 `[■] OP 名稱 ; 註解  行數 L  KB K`，像組合語言原始碼；註解用 `#556`。

**表格**：無直線、列底 2px `#113`，數字右對齊黃色，hover 整列 `#114`。

**頁尾**：2px `#224` 頂線、暗灰小字、一行 `ALL COLOURS 12-BIT · 4096 PALETTE · 60 HZ NTSC` 宣告。

## 7. 動效規則

| 類型 | 本站實作 | 觸發 | 時間 | 降級（reduced-motion） |
|---|---|---|---|---|
| ambient 環境 | canvas 銅條上下擺、星空飛近、棋盤前進、紅心飛球繞 Y 軸、跑字；頁面 rule 彩虹色帶以 `steps(9)` 往下流；來店頁片尾名單等速上捲 | 載入即開始 | 60 Hz／rule 1.2s／名單 64s linear | canvas 只畫一格靜止畫面（跑字改為置中靜態店名）；rule 停；名單變可捲動清單 |
| input 輸入 | 首頁游標左右＝跑字振幅 4–44px、上下＝銅條間距 0.35–1.25；片頭工坊勾選效果即時改畫面與邊框；月刊選單高亮條 `steps(6)` 跳格；F 鍵按下下沉 | pointermove／change／hover／keydown | <1 格（rAF 合併後 postMessage） | 效果勾選仍即時重繪一格；高亮條無過場 |
| transition 轉場 | **decrunch**：點站內連結時，邊框 18px 出現隨機 12 位元色的水平細條、以 `steps(7)` 下捲 0.42s，中間黑屏「DECRUNCHING…」，然後換頁；新頁 `clip-path:inset()` 以 `steps(18)` 0.36s 由上而下掃出。月刊換篇同樣以掃描線 `steps(16)` 揭示 | 點連結、F1–F4、方向鍵 | 0.42s＋0.36s | 直接換頁、無覆蓋層 |
| signature 簽名 | **raster-time 邊框計時條**：canvas 兩側 6px 邊框以各效果的顏色堆疊出它吃掉的掃描線，超過 262 條底部紅閃並真的降到 30 Hz | 效果組合改變 | 即時 | 靜態一格仍畫出色帶，資訊相同；DOM 也列出每個效果的行數 |

自我限制：本站禁用任何 ease／ease-in-out 與淡入淡出（opacity 補間）；所有 DOM 動畫只能是 `steps()` 或 `linear`。

## 8. 插畫與圖像風格

**copper-raster 銅條掃描線**：所有圖像都是 canvas 的逐掃描線、逐像素寫入（Uint32Array 寫進 ImageData）——銅條、鉻字、星空（三階灰白）、棋盤地板（每條線依深度量化成 16 階的兩色）、7×7 三階著色的「bob」小球排成心形、電漿（256 色調色盤循環）。DOM 端的插圖（位置圖、色票）一律 SVG `shape-rendering:crispEdges` 的整數矩形。禁止：向量曲線插圖、模糊、陰影漸層、照片。

## 9. Logo 與 Favicon 設計指南

- Logo：21×16 格手排的點陣「囍」，每一列一個 12 位元色（上 8 列天空→白、下 8 列土→奶油），右下偏移 1 格 `#114` 硬影；下方 4 條 1 格高的銅條（紅、橘、金、青）。
- 純 `<rect>`、`shape-rendering="crispEdges"`、黑底。Favicon 為同一個字、無銅條，inline data URI。
- 不可：圓角、外光暈、平滑漸層、向量描邊字。

## 10. Do & Don't

**Do**
- 每個顏色寫成 3 位 hex；漸層用硬停點，一階一條。
- 把預算畫出來：哪個效果用了多少，讓使用者看見。
- 用 `steps()` 與 `linear`，或查正弦表。
- 結尾放 greetings。
- 所有資訊都要在 DOM 裡有一份可選取的文字（canvas 只是演出）。

**Don't（含去AI化禁令）**
- 不用紫藍平滑漸層 hero、不用霓虹光暈 `box-shadow` 模糊、不用玻璃擬態。
- 不做「置中大標＋兩顆按鈕＋三張圓角卡片」。
- 不用 emoji 當 icon；★ 是點陣字符，不是圖示。
- 不用 Lorem ipsum；跑字裡的每一句都是真的資訊或真的感謝。
- 不把 glitch／故障當裝飾——在這個流派裡故障是失敗（掉格、Guru Meditation）。
- 閃爍只限小面積（邊框 ≤18px、≤2 Hz 的紅閃），並提供 reduced-motion 關閉。

## 11. 頁面骨架範例

```html
<header class="stage">
  <div class="crt"><canvas id="scr" width="336" height="216" role="img" aria-label="片頭：鉻字店名、銅條、星空與跑字"></canvas></div>
  <aside class="nfo">
    <h1 class="chrome">店名</h1>
    <dl><dt>地址</dt><dd>…</dd><dt>電話</dt><dd>…</dd></dl>
    <ol id="legend"><!-- 每個效果：色塊＋名稱＋掃描線數 --></ol>
  </aside>
</header>
<main>
  <section class="parts"><div class="part"><span class="no">01</span><div><h3>…</h3><p>…</p></div><div class="px"><b>NT$…</b></div></div></section>
</main>
<nav class="fkeys"><a class="fk" href="index.html" aria-current="page"><b>F1</b><span>首頁</span></a>…</nav>
<script type="text/plain" id="eng">/* engine：Engine()＋Loop()，同一份原始碼給 Worker 與主執行緒 */</script>
```

```js
// 啟動：先建 Worker 再轉移 canvas，任何一步失敗就退回主執行緒
const src=document.getElementById('eng').textContent;
try{const w=new Worker(URL.createObjectURL(new Blob([src+'\nconst H=Loop(m=>postMessage(m));onmessage=e=>H(e.data);'])));
  const off=canvas.transferControlToOffscreen();w.postMessage({canvas:off},[off]);}
catch(e){const H=new Function(src+'\nreturn Loop;')()(()=>{});H({canvas});}
```

## 12. 技術實作與相容性

### 12.1 Canvas 2D ImageData 逐掃描線渲染（A 渲染層）
- 承載：銅條、鉻字、跑字、星空、地板、bobs、電漿與 raster 邊框全部以 `Uint32Array` 直接寫入 `ImageData.data.buffer`，再 `putImageData`。這是讓「每條線一個顏色」成立的唯一方式——CSS 漸層做不出逐線換色的 wobble 與跑字。
- 支援：`ImageData`、`putImageData`、`image-rendering:pixelated` 屬 Baseline。caniuse：`pixelated` Chrome 41+、Safari 10+、Firefox 93+、Edge 79+（查證：caniuse.com/mdn-css_properties_image-rendering_pixelated；MDN image-rendering）。
- Fallback：不支援 `pixelated` 的舊瀏覽器會平滑放大（仍可讀）；不支援 canvas 時顯示 CSS 硬停點銅條＋鉻字靜態圖（`.crt.static`）。
- 位元組序：寫入值為 `0xAABBGGRR`（little-endian）；所有現行瀏覽器平台皆為 little-endian。

### 12.2 OffscreenCanvas＋Worker，60 Hz 鎖格（A 渲染層）
- 承載：片頭在 Worker 裡以 `setInterval(1000/60)` 固定節拍跑，主執行緒只送 `{cfg}`／`{mask}` 訊息；使用者打字、捲動、勾選時畫面不掉格，等於重現 Amiga「程式自己擁有整格」的時間觀。超過 262 條時 Loop 只在偶數 tick 畫（真的 30 Hz）。
- 支援：`HTMLCanvasElement.transferControlToOffscreen()` 為 MDN Baseline Widely available（自 2023-03）；OffscreenCanvas 2D context：Chrome 69+、Firefox 105+、Safari／iOS Safari 16.4+（查證：developer.mozilla.org/docs/Web/API/HTMLCanvasElement/transferControlToOffscreen；caniuse.com/mdn-api_offscreencanvas_getcontext_2d_context）。
- Fallback：先 `new Worker(blobURL)`、成功後才 `transferControlToOffscreen()`（避免 canvas 已轉移卻無 Worker）；任一步丟例外即以 `new Function(src)` 在主執行緒跑同一份 Loop。頁面 caption 會顯示 `OFFSCREEN WORKER` 或 `MAIN THREAD`。
- 文字遮罩在主執行緒產生（Worker 拿不到頁面的 Web Font），以 transferable 的 `Uint8Array` 傳入。

### 12.3 CSS `steps()` 時間軸（B 動效層）
- 承載：decrunch 轉場（`steps(7)` 下捲的 12 位元細條）、新頁掃描線揭示（`clip-path:inset()` + `steps(18)`）、月刊換篇（`steps(16)`）、選單高亮（`steps(6)`）、彩虹 rule（`steps(9)`）——讓 DOM 也遵守「沒有緩動、一格一格」。
- 支援：`steps()` 與 `clip-path: inset()` 皆為 Baseline（MDN easing-function、clip-path）。
- Fallback：`prefers-reduced-motion: reduce` 時全部關閉，資訊不受影響。

### 12.4 效能實測（Node 20／arm64 沙盒，模擬 336×216 緩衝）
- 首頁組合（銅條＋星空＋地板＋飛球＋鉻字＋跑字）：約 0.8 ms／格（jsdom 主執行緒實測）、6.8 ms／格（未最佳化前的 320×256 版本）；電漿全畫面最佳化後 ≈11 ms／格（Node），瀏覽器 JIT 下預期更低。均在 16.7 ms 一格內。
- 首屏 JS：建立 Worker＋遮罩＋第一格 <30 ms（不含字體下載，字體以 1.6 s 上限等待）。
- 單頁大小：index 32 KB、intro 41 KB、diskmag 26 KB、visit 25 KB（皆 ≤350 KB，含 inline 全部資源）。
- 音樂：Web Audio 方波＋三角波＋噪音四聲道，僅在使用者按「上片頭」且勾選音樂時啟動，20 秒後 `close()`。
