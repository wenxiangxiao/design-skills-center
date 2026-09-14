---
name: famicom-ppu-8bit
description: Hardware-accurate 8-bit style derived from the Famicom/NES 2C02 PPU — 8x8 two-bit-per-pixel tiles from a 256-tile pattern table, colour assigned per 16x16 attribute block, a fixed 54-colour master palette behind one shared backdrop register, a 256x240 frame that only scales by whole numbers, and eight sprites per scanline.
---

# 8-bit 像素（Famicom／NES 2C02 PPU）

> 這不是「用像素畫圖」。這是把 1983 年任天堂 Family Computer 裡那顆 Ricoh 2C02 圖像處理器的限制，當成版面法則來用。
> 判準只有一句：**畫面上出現任何一件真機做不到的事，就不是這個風格。**

---

## 一、設計哲學

### 1.1 這個流派是硬體逼出來的

Famicom（1983-07-15 日本發售，1985 年以 NES 名義進入北美）的圖像由 Ricoh 2C02 PPU 產生。它的規格不是美學選擇，是 1983 年記憶體的價格：

| 項目 | 真機規格 | 對版面的意思 |
|---|---|---|
| 解析度 | 256×240（NTSC 實際可見約 256×224） | 畫面不會 reflow，只有整數倍放大 |
| 圖塊 | 8×8，每像素 2 位元（2bpp），一庫 256 塊 | 所有圖都是拼出來的，同一塊反覆使用 |
| 名稱表 | 32×30 塊 | 版面天生是格子 |
| 屬性表 | 64 位元組，每位元組管 32×32，內分四個 16×16 | **顏色屬於位置，不屬於圖形** |
| 調色盤 | 背景 4 組×3 色＋1 個 backdrop；精靈 4 組×3 色 | 同時最多 25 色 |
| 母盤 | $00–$3F 共 64 格，實際 54 個不同色 | 沒有自由取色這回事 |
| 精靈 | 64 個，每條掃描線最多 8 個 | 超額就有東西消失 |

**設計時的第一個動作，是問這件事在 1983 年做不做得到。** 做不到就換做法，不要「先畫好再像素化」——那是濾鏡，不是這個流派。

### 1.2 三條不可談判的原則

1. **像素是可數的。** 一個像素就是一個正方形。零反鋸齒、零半透明、零漸層、零模糊。任何一個 `filter: blur()`、`opacity: .5`、`linear-gradient()` 都會當場破功。
2. **限制要看得見。** 屬性衝突、精靈閃爍、圖塊重複——這些在現代被當成瑕疵的東西，是這個流派的簽名。把它們藏起來，畫面就退化成「復古風插畫」。
3. **畫面與文件是兩層。** 畫面區（canvas）嚴格照 PPU 規格；文件層（DOM 文字）用同一套調色盤、同一個 8 像素格線、同樣整數倍縮放，但長文照樣是可選取、可搜尋、可朗讀的真文字。**不要把正文做成圖片。**

---

## 二、本風格的 5 個不可省略特徵

> 拿掉任何一項，做出來的就不是 8-bit，是「像素風」。每一項都附可直接複製的片段。

### 特徵 1 — 8×8 圖塊與有上限的圖樣表

所有圖像由 8×8 的塊拼成，塊來自一份**最多 256 塊**的圖樣表；畫面上看起來一樣的東西，就是同一塊圖被用了很多次。所有邊界一律落在 8 的倍數上。

```js
// 圖塊：8 列字串，字元 '.'=值0（透明／backdrop）、'1''2''3'=子調色盤的三個顏色
function T(rows){
  const a = new Uint8Array(64);
  for (let y=0;y<8;y++) for (let x=0;x<8;x++){
    const c = (rows[y]||'........')[x];
    a[y*8+x] = c==='1'?1 : c==='2'?2 : c==='3'?3 : 0;
  }
  return a;
}
const brick = T(['11111111','22212221','22212221','11111111',
                 '21222122','21222122','11111111','22212221']);
// 圖樣表滿 256 塊就該重新設計，不要加第 257 塊
```

DOM 層同樣吃這條規矩：所有尺寸都是 8 的倍數，並以「一個 PPU 像素」為單位撰寫。

```css
:root{ --u:1px; }                     /* --u ＝ 一個 PPU 像素 */
.win{ padding: calc(var(--u) * 8); border-width: calc(var(--u) * 2); }
h2  { font-size: calc(var(--u) * 12); line-height: calc(var(--u) * 16); }
p   { font-size: calc(var(--u) * 9);  line-height: calc(var(--u) * 15); }
```

### 特徵 2 — 2bpp：一塊圖只有四個值

每個像素兩位元：值 0（透明，露出 backdrop）＋三個顏色。**沒有第五階。**需要更細的層次只能用棋盤點（dither），而且點必須落在像素格上。

```css
/* 需要「半色」時唯一合法的作法：棋盤，不是 opacity */
.dither{
  background-image:
    repeating-conic-gradient(var(--gold) 0% 25%, transparent 0% 50%);
  background-size: calc(var(--u)*2) calc(var(--u)*2);
}
/* 明文禁用 */
.bad{ opacity:.5; filter:blur(2px); background:linear-gradient(#fff,#000); }
```

```js
// 影像來源永遠是手寫的圖塊資料，不是把照片降色。
// 若真的要從灰階轉圖塊，只准用 4 階閾值 + 有序抖動，且輸出必為 8 的倍數。
const LV = v => v<0.18 ? 0 : v<0.45 ? 1 : v<0.75 ? 2 : 3;
```

### 特徵 3 — 屬性表：顏色屬於位置，不屬於圖形

畫面被切成 **16×16 的屬性方塊**，每一塊只能指定一組三色子調色盤。同一塊裡的兩個東西被迫共用顏色——這就是 attribute clash，是這個流派最容易辨認、也最常被漏掉的一條。

```js
// 屬性表：16 欄 × 15 列（256×240 ÷ 16）
const at = new Uint8Array(16*15);
const setAttr = (bx,by,sub) => { at[by*16+bx] = sub & 3; };
// 渲染時，顏色不查「這塊圖是誰」，查「這塊圖站在哪裡」
const sub = at[(ty>>1)*16 + (tx>>1)];
const rgb = value===0 ? backdropRGB : MASTER[ bgPal[sub][value-1] ];
```

```css
/* DOM 層的對應作法：色彩由容器指派，元件只繼承，不自己宣告顏色 */
.block{ --c1:var(--ink); --c2:var(--red); --c3:var(--wht); }
.block.sub1{ --c2:var(--grn); --c3:var(--gold); }
.block.sub3{ --c2:var(--blu); --c3:var(--wht); }
.block *{ color:var(--c3); background:var(--c1); border-color:var(--c2); }
/* 錯誤示範：元件自己帶顏色 —— 這樣就沒有屬性衝突可言了 */
.btn{ color:#F8B800; }
```

**設計含意**：版面必須以 16×16 為單位規劃。標題與它旁邊的圖示若落在同一塊，它們只能同色；要讓它們不同色，就得把其中一個推到隔壁方塊去——**版面決定配色，不是配色決定版面。**

### 特徵 4 — 2C02 母盤 54 色與單一 backdrop 暫存器

顏色只能從母盤裡挑，而且畫面上所有「值 0」的像素共用**同一個** backdrop 顏色（真機的 `$3F00`）。它不是背景圖，是一個暫存器：改它，整張畫面每一塊圖的底同時改。

```css
/* 2C02 母盤常用色（本站用到的九格） */
:root{
  --sky:#5C94FC;  /* $22  backdrop：所有值 0 的像素 */
  --ink:#000000;  /* $0F */
  --red:#D82800;  /* $16 */
  --grn:#00A800;  /* $1A */
  --gold:#F8B800; /* $28 */
  --wht:#FCFCFC;  /* $30  真機沒有純白，是 252 */
  --orn:#EA9E22;  /* $27 */
  --blu:#155FD9;  /* $11 */
  --gry:#666666;  /* $00 */
  --dim:#ADADAD;  /* $10 */
}
html,body{ background:var(--sky); }   /* backdrop 是全站唯一的大面積底色 */
```

```js
// 母盤全 64 格（$0D/$1D/$2D/$3D 與每列最後兩格為黑，故實際 54 色）
const MASTER = [
 '#666666','#002A88','#1412A7','#3B00A4','#5C007E','#6E0040','#6C0600','#561D00',
 '#333500','#0B4800','#005200','#004F08','#00404D','#000000','#000000','#000000',
 '#ADADAD','#155FD9','#4240FF','#7527FE','#A01ACC','#B71E7B','#B53120','#994E00',
 '#6B6D00','#388700','#0C9300','#008F32','#007C8D','#000000','#000000','#000000',
 '#FFFEFF','#64B0FF','#9290FF','#C676FF','#F36AFF','#FE6ECC','#FE8170','#EA9E22',
 '#BCBE00','#88D800','#5CE430','#45E082','#48CDDE','#4F4F4F','#000000','#000000',
 '#FFFEFF','#C0DFFF','#D3D2FF','#E8C8FF','#FBC2FF','#FEC4EA','#FECCC5','#F7D8A5',
 '#E4E594','#CFEF96','#BDF4AB','#B3F3CC','#B5EBF2','#B8B8B8','#000000','#000000'];
```

**選 backdrop 就是選這個站的性格。** `$0F` 黑是「夜／太空／地城」，`$22` 天藍是「白天的外景」，`$21`／`$2C` 是水面。深底像素站到處都是；**亮底的 backdrop 反而更像真機的卷一關。**

### 特徵 5 — 256×240 定框、整數倍放大、狀態列與每線八個精靈

畫面永遠是 256×240，只換放大倍率（×1／×2／×3），視窗變寬只是四周留白變多。上方的狀態列不是排版出來的，是用**掃描線分割**固定住的：捲動暫存器只從某一條掃描線以下才生效。活動物件是精靈，一條掃描線最多八個，第九個之後不畫。

```css
/* 整數倍放大：版面以 PPU 像素撰寫，再由 zoom 整數放大 */
:root{ --z:1; --u:1px; }
@media (min-width:560px){  :root{ --z:2 } }
@media (min-width:1180px){ :root{ --z:3 } }
.wrap  { zoom: var(--z); }
.screen{ width: calc(var(--u)*256); height: calc(var(--u)*240); }
.screen canvas{ display:block; width:100%; height:100%; image-rendering:pixelated; }
/* 不支援 zoom 時：讓 --u 自己等於 N 像素，版面完全一致 */
@supports not (zoom: 2){
  :root{ --u: calc(1px * var(--z)); }
  .wrap{ zoom:1; }
}
```

```js
// 掃描線分割：狀態列以上不套用捲動
for (let y=0; y<240; y++){
  const sx = (y < 24) ? 0 : scrollX;      // ← 這一行就是整個卷軸遊戲的作法
  drawBackgroundScanline(y, sx);
}
// 精靈評估：一條線最多八個，且每幀輪替評估起點 → 真機的閃爍
const rot = frame % oam.length;
let found = 0;
for (let k=0; k<oam.length; k++){
  const sp = oam[(k+rot) % oam.length];
  if (y < sp.y || y >= sp.y+8) continue;
  if (found >= 8) { overflow++; continue; }   // 第九個以後直接不畫
  found++; drawSprite(sp, y);
}
```

---

## 三、色彩系統

| 角色 | 母盤格 | Hex | 用途 | 目標比例 |
|---|---|---|---|---|
| backdrop 天色 | `$22` | `#5C94FC` | 唯一大面積底色；所有值 0 的像素 | 約 40% |
| 墨 | `$0F` | `#000000` | 全部輪廓、狀態列底、正文底 | 約 20% |
| 朱 | `$16` | `#D82800` | 招牌、現用態、警示 | 約 9% |
| 草綠 | `$1A` | `#00A800` | 遮陽棚、層板、第二語意 | 約 8% |
| 金黃 | `$28` | `#F8B800` | 標題、現用導覽、hover | 約 7% |
| 白 | `$30` | `#FCFCFC` | 內文、框線、亮面 | 約 7% |
| 磚橙 | `$27` | `#EA9E22` | 磚、木、地面 | 約 6% |
| 深藍 | `$11` | `#155FD9` | 金屬、冰櫃、連結 | 約 3% |
| 灰 | `$00` / `$10` | `#666666` / `#ADADAD` | 次要資訊、未載入態 | ≤ 3% |

硬規則：

- **同一 16×16 方塊內至多 3 色＋backdrop。** 設計稿就要照這個切。
- **整張畫面同時至多 25 色。** 超過就是假的。
- 零漸層、零反鋸齒、零半透明、零 `filter`、零模糊陰影。
- 圓角只能用圖塊畫，所以一定是**階梯狀**；CSS 的 `border-radius` 一律 0。
- 需要厚度就用實色方塊，不要 `box-shadow` 的模糊。
- 白不是 `#FFFFFF`，是 `#FCFCFC`；黑是 `$0F`，不是 `$1D`（真機的 `$1D` 是「比黑還黑」，NTSC 上會爆訊號，不要用）。

---

## 四、字體系統

畫面區（canvas）與文件層（DOM）走兩條路，但格線一樣。

**畫面區**：8×8 圖塊字。西文與數字用 5×7 點陣塞進 8×8（右 1 欄、下 1 列留白），這就是真機的作法。漢字在真機上是 16×16 點陣，所以畫面區的漢字必須手工點陣化成 2×2 塊，**不要把向量字縮到 16px 去截圖**。

```js
const FONT5x7 = {
  'A':['01110','10001','10001','11111','10001','10001','10001'],
  '0':['01110','10001','10011','10101','11001','10001','01110'],
  // …
};
function glyphTile(ch, ink, bg){          // bg 省略＝透明（露出 backdrop）
  const g = FONT5x7[ch] || FONT5x7['?'], b = bg===undefined ? '.' : String(bg), rows=[];
  for (let y=0;y<7;y++){
    let s=''; for (let x=0;x<5;x++) s += g[y][x]==='1' ? String(ink) : b;
    rows.push(s+b+b+b);
  }
  rows.push(b.repeat(8));
  return rows;
}
```

**文件層**：西文與數字用點陣網頁字（Google Fonts 的 `Silkscreen` 或 `Press Start 2P`），漢字用 `Noto Sans TC` 900——字重越重越接近點陣的實心感。字級一律 8 的倍數，字距 0，**不做任何字重補間或斜體**。

```css
body{ font-family:"Noto Sans TC","PingFang TC",sans-serif; -webkit-font-smoothing:none; }
.mono,.num{ font-family:"Silkscreen",monospace; }
h2{ font-size:calc(var(--u)*12); line-height:calc(var(--u)*16); font-weight:900; letter-spacing:0; }
p { font-size:calc(var(--u)*9);  line-height:calc(var(--u)*15); }
/* 禁止：斜體、字重 300–600 的中間值、letter-spacing 的小數、text-shadow 的模糊 */
```

字級階梯（以 PPU 像素計）：`6 / 7 / 8 / 9 / 10 / 12 / 14`。再大就直接做成圖塊。

---

## 五、版面與網格

- **主格線 8px**（一塊圖）；**配色格線 16px**（一塊屬性方塊）。所有間距、邊框、內距都是 8 的倍數，**唯一允許的 1 單位是框線**。
- 畫面區固定 256×240，置中，外加 4 單位黑框。內容欄寬上限 272 單位（256＋兩側 8）——**不要做寬版**，紅白機沒有寬版。
- 每頁結構固定為三段：**畫面區 → 狀態列文字（aria-live）→ 訊息窗**。這個順序本身就是這個流派的版面骨架。
- 留白不是設計語言，**滿版才是**。真機的畫面沒有空白邊，空的地方就是 backdrop，而 backdrop 是有顏色的。
- 響應式＝換放大倍率，不是換排版。≤560px 用 ×1（畫面 256px 寬，任何手機都放得下），≥560px ×2，≥1180px ×3。欄數不變、順序不變、內容不變。

---

## 六、元件配方

### 6.1 訊息窗（本流派最具識別性的 UI）

黑底、白框、外圈再一道黑——就是紅白機的對話框。**不要圓角、不要陰影。**

```css
.win{
  background:var(--ink); color:var(--wht);
  border:  calc(var(--u)*2) solid var(--wht);
  outline: calc(var(--u)*2) solid var(--ink);
  padding: calc(var(--u)*8);
  margin:0 0 calc(var(--u)*10);
  border-radius:0; box-shadow:none;
}
.win h2{ color:var(--gold); }
.win a { color:var(--gold); }
.win a:hover,.win a:focus{ background:var(--gold); color:var(--ink); outline:none; }
.win.bright{ background:var(--wht); color:var(--ink); border-color:var(--ink); outline-color:var(--wht); }
```

### 6.2 導覽：`chr-bank` 換圖庫

四頁＝四塊 16×16 圖示。現用頁的圖示是「圖庫已經切到它」——四色完整圖塊；其餘三個顯示成**未換庫的佔位網點**，文字標籤照常可讀。語意是「記憶體裡現在裝的是哪一份圖」，不是「被標示」「變亮」「被選取」。

```html
<nav id="chrbank" aria-label="主導覽">
  <a class="bank on" href="index.html" aria-current="page">
    <canvas class="bankico" width="16" height="16" aria-hidden="true"></canvas>
    <span class="banklab"><b>店面</b><i>SHOPFRONT</i></span>
    <em class="bankstate">圖庫已載入</em>
  </a>
  <!-- 其餘三個：class="bank"，bankstate 寫「圖庫未載入」 -->
</nav>
```

```js
// 未換庫的佔位圖塊：斜線網點，backdrop 換成灰，一眼看得出「這裡沒有資料」
const NAV_BLANK = [
 '1..1..1..1..1..1','..1..1..1..1..1.','.1..1..1..1..1..','1..1..1..1..1..1',
 '..1..1..1..1..1.','.1..1..1..1..1..','1..1..1..1..1..1','..1..1..1..1..1.',
 '.1..1..1..1..1..','1..1..1..1..1..1','..1..1..1..1..1.','.1..1..1..1..1..',
 '1..1..1..1..1..1','..1..1..1..1..1.','.1..1..1..1..1..','1..1..1..1..1..1'];
```

**導覽的 HTML 必須是靜態寫死的**，JavaScript 只負責把圖塊畫上去；關掉 JavaScript 仍然有完整的四個連結。

### 6.3 按鈕

```css
button,.btn{
  font-family:"Noto Sans TC",sans-serif; font-weight:900;
  font-size:calc(var(--u)*9); line-height:calc(var(--u)*13);
  color:var(--ink); background:var(--wht);
  border:calc(var(--u)*2) solid var(--ink);
  padding:calc(var(--u)*3) calc(var(--u)*6);
  border-radius:0; box-shadow:none; cursor:pointer;
}
button:hover,button:focus{ background:var(--gold); outline:none; }
button:active{ background:var(--red); color:var(--wht); }   /* 反色，不是位移 */
button[disabled]{ background:var(--dim); color:var(--gry); }
```

按下的回饋是**反色**，不是位移、不是陰影變化——真機沒有 z 軸。

### 6.4 表格與價目

```css
table{ border-collapse:collapse; width:100%; }
th,td{ border:calc(var(--u)*1) solid currentColor; padding:calc(var(--u)*3) calc(var(--u)*4); }
td.r,th.r{ text-align:right; font-family:"Silkscreen",monospace; }  /* 數字一律等寬 */
```

### 6.5 狀態列（aria-live）

畫面區下方永遠有一條文字狀態列，把畫面上「正在發生但可能看不清楚」的事寫成字：超額幾個精靈、游標在哪一塊屬性方塊、現在指派的是哪一組子調色盤。**這條不是無障礙補丁，是這個流派的介面本體**——真機的狀態列本來就是用文字報數的。

```html
<p class="live" id="scanout" role="status" aria-live="polite">掃描線正常：每一條線上的精靈都不超過八個。</p>
```

### 6.6 頁尾

黑底、灰字、上緣一道白線，內含完整文字導覽（無 JavaScript 時的保底路徑）。

---

## 七、動效規則

四種都要有，每一種都必須有 `prefers-reduced-motion` 降級，而且**降級後資訊零損失**。

| 種類 | 作法 | 時值 | 降級 |
|---|---|---|---|
| **環境 ambient** | 由幀計數驅動：燈泡接觸不良（每 210 幀暗 6 幀）、精靈在架上 1 像素起伏（每 32 幀換一格）、動物尾巴（每 80 幀擺一次） | 以幀為單位，不用毫秒 | 全部凍結在第 0 幀 |
| **輸入 input** | 十字鍵／手掣／滑鼠推游標精靈，每幀即時更新座標 | < 100ms（實測 1 幀＝16.6ms） | 照常，只是不插值 |
| **轉場 transition** | 把畫面往左捲出去、下一頁從右邊捲進來，狀態列以掃描線分割固定不動 | 340ms 出、380ms 入，`easeInOutQuad` | 直接切換，不捲動 |
| **簽名 signature** | **八隻過限**：同一條掃描線超過八個精靈就一定有東西不畫，而不畫的那個每幀輪替 → 它們在閃 | 每幀 | 不輪替，固定丟棄排在後面的，並在狀態列指名是哪幾件 |

```js
// 動效一律以「幀」為單位思考，不要用 ms —— 真機沒有 ms，只有 1/60.0988 秒
const on = (frame % 210) > 6;                  // 燈泡
sprite.y = baseY + (((frame>>5) + i) % 2);     // 1 像素起伏
```

**明文禁用**：淡入、淡出、視差、緩動縮放、模糊、旋轉到非 90° 的角度、任何 `transition` 在顏色以外的屬性上做連續插值。真機做不到這些；能做的是**整格的跳變**與**捲動**。

---

## 八、插畫與圖像風格（`tile-2bpp` 二位元圖塊構成）

- **零外部圖片。**所有圖像——場景、物件、角色、圖示、logo、favicon——都從同一份圖樣表出來。
- 每塊圖只有四個值；顏色由它落在哪個 16×16 屬性方塊決定。
- **判準**：放大任何一張圖，(a) 像素邊界必落在 8 的倍數上；(b) 任一 16×16 方塊內不會出現超過 3 種顏色＋backdrop；(c) 找不到任何一條反鋸齒邊。
- 大字（漢字招牌）以**筆畫矩形**組出來，不要手打字串——寫一支小工具，用 `rect()` 與 `diag()` 疊筆畫，才對得準格線：

```js
function Grid(w,h){ this.w=w; this.h=h; this.d=[...Array(h)].map(()=>Array(w).fill('.')); }
Grid.prototype.rect=function(x0,y0,x1,y1,v){ for(let y=y0;y<=y1;y++) for(let x=x0;x<=x1;x++) this.d[y][x]=v; return this; };
Grid.prototype.diag=function(x0,y0,x1,y1,th,v){
  const n=Math.max(Math.abs(x1-x0),Math.abs(y1-y0));
  for(let i=0;i<=n;i++){ const x=Math.round(x0+(x1-x0)*i/n), y=Math.round(y0+(y1-y0)*i/n);
    this.rect(x,y,x+th-1,y,v); } return this; };

// 「大」字，24×24，紅底（值2）白筆畫（值3）
const tai = new Grid(24,24).rect(0,0,23,23,'2')
  .rect(10,1,13,9,'3').rect(2,7,21,9,'3')
  .diag(11,9,2,22,3,'3').diag(13,9,21,22,3,'3').rows();
```

- 精靈（活動物件）的值 0 是**真透明**，會露出背景；背景圖塊的值 0 露出的是 backdrop。這兩件事在視覺上一樣，在語意上不同——把應該是背景的東西做成精靈，就會撞上每線八個的上限。
- **明文禁用**：照片、半調網點、細線幾何線描、`feTurbulence` 假質感、扁平化單色圖示、任何抗鋸齒過的邊、任何把向量圖降解成像素的自動轉換。

---

## 九、Logo 與 Favicon

**Logo**：招牌本體。紅底（`$16`）、黑外框、白字（`$30`），字由筆畫矩形組成、以整數倍放大成 SVG `<rect>`，`shape-rendering="crispEdges"`。**Logo 與站上招牌必須是同一份筆畫資料**，不要另外畫一版。

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 162 106" shape-rendering="crispEdges" role="img" aria-label="店名">
  <rect width="162" height="106" fill="#000000"/>
  <rect x="3" y="3" width="156" height="100" fill="#D82800"/>
  <!-- 每一橫列的連續白像素合併成一個 rect，寬高一律是放大倍率的整數倍 -->
  <rect x="36" y="9" width="12" height="3" fill="#FCFCFC"/>
  <!-- … -->
</svg>
```

**Favicon**：inline SVG data URI，16×16 座標系，同樣 `crispEdges`，只放 logo 最辨認得出來的那一個字。

```html
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' shape-rendering='crispEdges'%3E%3Crect width='16' height='16' fill='%23000000'/%3E%3Crect x='1' y='1' width='14' height='14' fill='%23D82800'/%3E%3Crect x='2' y='6' width='12' height='2' fill='%23FCFCFC'/%3E%3Crect x='7' y='2' width='2' height='5' fill='%23FCFCFC'/%3E%3C/svg%3E">
```

---

## 十、Do & Don't

### Do

- 先決定 backdrop 是哪一格母盤色——它會佔畫面四成，決定整站性格。
- 版面先切 16×16，再決定每一塊的子調色盤，最後才畫圖。
- 讓屬性衝突看得見，並用文字把它解釋出來。
- 精靈超額就讓它閃，同時在狀態列把被丟掉的東西寫成字。
- 長文用真文字，只有場景與圖示用圖塊。
- 數字一律等寬點陣字，右對齊。
- 響應式＝換放大倍率。

### Don't

- 不要漸層、不要 `opacity`、不要 `blur`、不要 `border-radius`、不要模糊陰影。
- 不要把照片或向量圖自動降解成像素——那是濾鏡。
- 不要用 `#FFFFFF` 與 `$1D`。
- 不要讓元件自己宣告顏色（那樣就沒有屬性方塊可言了）。
- 不要用 CRT 掃描線疊加、桶形失真、色差濾鏡來「增加復古感」——那是模擬器的後處理，不是 PPU 的輸出。
- 不要無限捲動長頁：真機一次只有一屏。內容多就分頁。
- 不要 EST. 19xx 徽章、不要置中三卡片、不要紫藍漸層 hero。
- 不要用 emoji 當圖示。

---

## 十一、技術實作與相容性

### 11.1 自寫 2C02 PPU 圖塊渲染器（資料與生成層）

沒有任何瀏覽器 API 依賴，只用 `Uint8Array` / `Uint8ClampedArray`（Baseline widely available）與 `canvas.getContext('2d')` 的 `createImageData` / `putImageData`。

- **效能實測**（Node 22，256×240 整屏含逐掃描線精靈評估）：**0.62 ms／幀**，預算 16.6 ms，餘裕 26 倍。首屏建構（圖樣表 142 塊＋名稱表填充）實測 < 30 ms，遠低於 100 ms 預算。
- 每幀只寫一次 `putImageData`，不讀任何 DOM 幾何，無 layout thrashing。
- `image-rendering: pixelated` 由瀏覽器做最近鄰放大；`ctx.imageSmoothingEnabled = false` 一併關掉平滑。
- **fallback**：沒有 canvas 時畫面區留白，但所有資訊本來就同時存在於靜態 HTML，資訊零損失。

### 11.2 Gamepad API（輸入與感測層）

這個流派的原生輸入裝置就是手掣，所以本風格把它當第一級輸入。

- **查證**：MDN《Gamepad API》《Gamepad》《GamepadEvent》《GamepadButton》均標示 **Baseline Widely available**，自 **2017-03** 起各大瀏覽器可用。
- **實作要點**：`navigator.getGamepads()` 回傳的是快照，必須**每幀重讀**，不能快取 `Gamepad` 物件。標準對映（`mapping === 'standard'`）下，按鈕 0/1 是 A/B、12–15 是十字鍵、軸 0/1 是左蘑菇頭。
- **每幀重建按鍵狀態**是關鍵寫法：鍵盤狀態由 `keydown`/`keyup` 維持，手掣狀態每幀重讀後 OR 上去。若直接把手掣結果寫進同一份狀態而不重建，手掣放開時沒有對應的 `keyup`，按鍵會卡住。
- **fallback**：`navigator.getGamepads` 不存在、或瀏覽器策略封鎖時直接 return；鍵盤（方向鍵／WASD／Z／X／Enter）與滑鼠、觸控路徑永遠在，功能完全相同。手掣是加分路徑，不是必要路徑。

```js
function readInput(){
  for (const k in kb) keys[k] = kb[k];             // 鍵盤為底
  if (!navigator.getGamepads) return;              // 沒有就算了
  let gps; try { gps = navigator.getGamepads(); } catch(e){ return; }
  for (const g of gps){
    if (!g || !g.connected) continue;
    const b = g.buttons||[], bp = n => (b[n] && (b[n].pressed || b[n].value>0.5)) ? 1 : 0;
    keys.l = keys.l || (g.axes[0] < -0.45 ? 1:0) || bp(14);
    keys.r = keys.r || (g.axes[0] >  0.45 ? 1:0) || bp(15);
    keys.a = keys.a || bp(0); keys.b = keys.b || bp(1);
    break;
  }
}
```

### 11.3 CSS `zoom`（版面與樣式層）

承載「畫面只做整數倍放大」這條硬規則：全站尺寸都以一個 PPU 像素 `--u` 為單位撰寫，再由 `zoom` 整數放大。用 `zoom` 而不用 `transform: scale()` 的理由是**`zoom` 會參與版面計算**——放大後的元素確實佔用放大後的空間，後面的東西會跟著讓開；`transform: scale()` 不會，它只是把畫素拉大並且和周圍重疊。

- **查證**：`zoom` 原為 IE 的私有屬性，經 CSSWG 標準化後於 **Firefox 126（2024-05）** 實作完成，同時進入 **Baseline newly available**（Chromium、WebKit 早已支援）。
- **fallback**：`@supports not (zoom: 2)` 時讓 `--u` 自己等於 N 像素、`.wrap` 的 zoom 設回 1。因為所有尺寸都寫成 `calc(var(--u) * N)`，**不需要重複任何一條規則**，版面與尺寸完全一致。
- **注意**：`zoom` 會改變 `getComputedStyle` 回報的字級與 `getBoundingClientRect()` 的數值。若要把滑鼠座標換算回 PPU 座標，一律用 `rect.width` 當分母（而不是假設 256×倍率），這樣在任何縮放層級都對。

### 11.4 效能預算實測

| 項目 | 實測 | 門檻 |
|---|---|---|
| 單頁大小（含全部 inline 資源、不含 Google Fonts） | 63–66 KB | ≤ 350 KB |
| 首屏 JS 執行（建圖樣表＋填名稱表＋首幀） | < 30 ms | ≤ 100 ms |
| 主迴圈 | 0.62 ms／幀 | 16.6 ms（60fps） |
| 圖樣表用量（四頁） | 142 / 110 / 182 / 123 塊 | ≤ 256 塊 |

---

## 十二、頁面骨架範例（可直接使用）

```html
<!DOCTYPE html>
<html lang="zh-Hant">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>頁名 — 店名</title>
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' shape-rendering='crispEdges'%3E%3Crect width='16' height='16' fill='%23000000'/%3E%3Crect x='1' y='1' width='14' height='14' fill='%23D82800'/%3E%3C/svg%3E">
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;700;900&family=Silkscreen:wght@400;700&display=swap" rel="stylesheet">
<style>
:root{
  --z:1; --u:1px;
  --sky:#5C94FC; --ink:#000000; --red:#D82800; --grn:#00A800;
  --gold:#F8B800; --wht:#FCFCFC; --orn:#EA9E22; --blu:#155FD9;
  --gry:#666666; --dim:#ADADAD;
}
@media (min-width:560px){  :root{ --z:2 } }
@media (min-width:1180px){ :root{ --z:3 } }
@supports not (zoom: 2){ :root{ --u: calc(1px * var(--z)); } .wrap{ zoom:1; } }
*{ box-sizing:border-box; }
html,body{ margin:0; background:var(--sky); }
body{ font-family:"Noto Sans TC",sans-serif; color:var(--ink); -webkit-font-smoothing:none; }
.wrap{ zoom:var(--z); max-width:calc(var(--u)*272); margin:0 auto; padding:calc(var(--u)*8); }
canvas{ image-rendering:pixelated; }
.screen{ width:calc(var(--u)*256); height:calc(var(--u)*240); margin:0 auto;
         border:calc(var(--u)*4) solid var(--ink); background:var(--ink); }
.screen canvas{ display:block; width:100%; height:100%; }
.live{ background:var(--wht); border:calc(var(--u)*2) solid var(--ink);
       padding:calc(var(--u)*4); font-size:calc(var(--u)*8); line-height:calc(var(--u)*12);
       width:calc(var(--u)*256); margin:0 auto calc(var(--u)*8); }
.win{ background:var(--ink); color:var(--wht);
      border:calc(var(--u)*2) solid var(--wht); outline:calc(var(--u)*2) solid var(--ink);
      padding:calc(var(--u)*8); margin:0 0 calc(var(--u)*10); }
.win h2{ color:var(--gold); font-size:calc(var(--u)*12); line-height:calc(var(--u)*16); font-weight:900; margin:0 0 calc(var(--u)*6); }
.win p { font-size:calc(var(--u)*9); line-height:calc(var(--u)*15); margin:0 0 calc(var(--u)*6); }
#chrbank{ display:grid; grid-template-columns:repeat(4,1fr); gap:calc(var(--u)*4); margin:0 0 calc(var(--u)*10); }
a.bank{ display:flex; flex-wrap:wrap; gap:calc(var(--u)*4); align-items:center;
        text-decoration:none; color:var(--ink); background:var(--wht);
        border:calc(var(--u)*2) solid var(--ink); padding:calc(var(--u)*4); }
a.bank.on{ background:var(--gold); }
a.bank .bankico{ width:calc(var(--u)*16); height:calc(var(--u)*16); }
a.bank .bankstate{ width:100%; font-style:normal; font-size:calc(var(--u)*7); color:var(--gry); }
.sr{ position:absolute; width:1px; height:1px; overflow:hidden; clip:rect(0 0 0 0); }
</style>
</head>
<body>
<div class="wrap">
  <h1 class="sr">頁名 — 店名</h1>

  <div class="screen"><canvas id="ppu" width="256" height="240" aria-label="畫面內容的文字描述"></canvas></div>
  <p class="live" id="scanout" role="status" aria-live="polite">掃描線正常：每一條線上的精靈都不超過八個。</p>

  <section class="win"><h2>訊息窗</h2><p>正文是真文字，不是圖片。</p></section>

  <nav id="chrbank" aria-label="主導覽">
    <a class="bank on" href="index.html" aria-current="page">
      <canvas class="bankico" width="16" height="16" aria-hidden="true"></canvas>
      <span class="banklab"><b>第一頁</b><i>PAGE ONE</i></span>
      <em class="bankstate">圖庫已載入</em>
    </a>
    <!-- 其餘三頁：class="bank"、bankstate 寫「圖庫未載入」 -->
  </nav>

  <footer class="foot"><nav><a href="index.html">第一頁</a></nav></footer>
  <noscript><p class="win">沒有 JavaScript 時畫面區不繪製，但全部內容都是靜態 HTML。</p></noscript>
</div>
<script>
/* 1. 建圖樣表 → 2. 填名稱表與屬性表 → 3. rAF 迴圈：讀輸入 → 更新 → render → putImageData */
</script>
</body>
</html>
```

---

## 十三、驗收清單

- [ ] 遮掉全部文字，懂設計的人 3 秒內說得出「這是紅白機」。
- [ ] 放大任何一張圖，像素邊界都落在 8 的倍數上，找不到反鋸齒邊。
- [ ] 任一 16×16 方塊內不超過 3 色＋backdrop；整屏不超過 25 色。
- [ ] 全站零漸層、零 `opacity` 中間值、零 `blur`、零 `border-radius`。
- [ ] 畫面區永遠 256×240，只換整數倍率；手機（≤560px）不破版。
- [ ] 四種動效都在（環境／輸入／轉場／簽名），且各有 `prefers-reduced-motion` 降級。
- [ ] 關掉 JavaScript：導覽、正文、資料、價目全部還在。
- [ ] 零外部圖片與音檔；logo 與 favicon 都是原創 inline SVG。
- [ ] 效能：單頁 ≤350KB、首屏 JS <100ms、主迴圈 60fps。
