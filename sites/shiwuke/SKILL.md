---
name: post-punk-factory
description: Post-punk record-label graphics after Peter Saville and Ben Kelly — catalogue numbers as identity, withheld information, an appropriated scientific plot at monumental scale, 45-degree hazard chevrons and Swiss grid discipline applied where it does not belong.
---

# 後龐克 Factory Records／Peter Saville

> 一九七八年，曼徹斯特。一家唱片公司給它印出來的每一樣東西編號——海報、便條紙、徽章、一間夜店、一場官司。封套上不印團名也不印曲名，只有一張從別的學科拿來的圖，放到滿版。夜店裡的柱子漆上工地的黑黃斜紋。這套語彙的作者是平面設計師 Peter Saville 與室內設計師 Ben Kelly。

本規格書把這套語彙寫成可直接施工的規則。它不綁定產業——示範站是一間客運總站的失物課，但這套規則同樣適用於檔案館、器材租賃、實驗室、二手交易、任何「東西比敘述重要、編號比名字可靠」的題材。

---

## 一、設計哲學

1. **編號先於名字。** 這個風格的核心信念是：一樣東西只要被配到號，它就存在了；沒有號的東西不在系統裡。因此版面上的第一順位不是標題，是編號。
2. **不解釋。** 主視覺不負責說明自己是什麼。看不懂是預期中的事——看得懂的人會自己找到入口。這不是故弄玄虛，是把「說明」這件事移到別的層級（內文、表格、註記）去做，主視覺只負責當一個物件。
3. **精確用在不該精確的地方。** 瑞士式的網格、字距、對齊紀律，被拿去做一間夜店、一張門票、一本失物登記簿。精確與題材的落差就是這個風格的內容本身。
4. **工地的語彙可以是文化的語彙。** 危險斜紋、路面標線、車擋、貓眼、鋼藍——本來是用來警告與導引的東西，被原封不動搬進來當作識別。它們沒有被美化，也不需要被美化。
5. **不裝飾。** 沒有圓角、沒有模糊陰影、沒有漸層（除了資料圖表本身）、沒有質感貼圖、沒有插畫角色。畫面上每一塊顏色都是實色，每一條邊都是硬邊。

---

## 二、本風格的 5 個不可省略特徵

拿掉任何一項，畫面就不再是這個風格。

### 特徵 1｜編號即身分：每一樣值得指涉的東西都有號，包括不是商品的東西

編號用無襯線粗體排在物件旁邊，字級**不得小於**物件名稱；名字甚至可以不出現。導覽、頁面、章節、設備、家具、制度本身都配號。號一旦配出去就不重複使用。

實作上，凡是「號碼即位置」的序列（登記簿、目錄、注釋）一律交給 CSS 計數器配號，不在 HTML 裡寫死數字——因為在這個風格裡，配號是版面的職權：

```css
.reg   { counter-reset: fac 244; }          /* 244＝下一個尚未配出的號 */
.rr    { counter-increment: fac -1; }        /* 嚴格倒序：最新在最上 */
.rn::before { content: "失 " counter(fac); font-family:"Archivo"; font-weight:800; }
```

號碼帶固定前綴（原作是 `FAC`／`FACT`／`FACUS`；示範站是「失」）。**不補零**——`失 1`、`失 51`、`失 243`，位數不齊正是真實編目簿的樣子。

### 特徵 2｜資訊被抽走：主要表面上沒有品名、沒有標題、沒有說明

公開的列表只給編號、代碼、位置、日期、狀態。名稱欄不存在——不是留白，是欄位本身被拿掉。說明文字退到內文與註記裡，且必須是可選取、對比 ≥ 4.5:1 的一般 HTML 文字。

```html
<!-- 對：五個欄位，沒有一個是「名稱」 -->
<li class="rr"><span class="rn"></span><span class="rc">…色碼…</span>
    <span class="rs">B-4</span><span class="rd">138</span><span class="rx">保管中</span></li>
<!-- 錯：加一欄品名，這個風格立刻失效 -->
```

判準：把整個列表印出來給陌生人看，他必須**看得出這是一份嚴謹的紀錄，但說不出裡面是什麼**。

### 特徵 3｜被挪用的科學圖表放到滿版，且不加說明

一張本來屬於別的學科的資料圖（原作用的是脈衝星 CP1919 的疊加波形），以白線畫在純黑底上，滿版、無座標軸標籤、無圖例、無標題，四周只有極小的英文角標。它是主視覺，不是插圖。

```html
<svg viewBox="0 0 900 520"><rect width="900" height="520" fill="#111"/>
  <!-- 由後往前疊，每一條都填底色，因此前排會把後排擋住 -->
  <path d="M28 270C…Z" fill="#111111" stroke="#F4F2EC" stroke-width="1.35"/>
  …共 16 條…
</svg>
```

三條硬規則：**(a)** 圖必須來自真實資料（哪怕是虛構情境下的真實計算），不可以是隨手畫的裝飾曲線；**(b)** 前排一定要填底色去遮後排——遮擋是這張圖的本體，畫成透明疊線就變成一般的資料視覺化；**(c)** 圖上不放任何中文說明，說明放在圖外的一般文字裡。

### 特徵 4｜45° 黑黃危險斜紋與工地色標

斜紋角度固定 **-45°**、單條寬度 13px（小號）或 20px（大號）、黃黑各半。每一頁至少三處：頁首上緣、頁尾上緣、內文分隔各一。此外，路面標線白、車擋黃黑、貓眼銀、鋼藍——工地與道路的色標語彙原樣使用，不調柔。

```css
.hz    { height:17px;
         background-image:repeating-linear-gradient(-45deg,#111 0 13px,transparent 13px 26px); }
.hzbig { height:34px; border-top:2.5px solid #111; border-bottom:2.5px solid #111;
         background-image:repeating-linear-gradient(-45deg,#111 0 20px,transparent 20px 40px); }
```

深色區塊的右上角切一枚 45° 的黃三角（同一個角度系統的延伸）：

```css
.card.dk::after{ content:""; position:absolute; right:0; top:0; width:26px; height:26px;
  background:linear-gradient(225deg,#EFC223 0 50%,transparent 50%); }
```

### 特徵 5｜瑞士網格紀律，用在不該用的地方

十二欄主網格，欄距 14px，最大寬 1180px。**列與列之間的欄位必須對齊到同一組主格線**——這件事只有 `subgrid` 做得到，因為每一列的內部欄位不能各自為政：

```css
.sheet{ display:grid; grid-template-columns:repeat(12,1fr); column-gap:14px; }
.reg  { grid-column:1/-1; display:grid; grid-template-columns:subgrid; }
.rr   { grid-column:1/-1; display:grid; grid-template-columns:subgrid; }
.rn{grid-column:1/span 2} .rc{grid-column:3/span 3} .rs{grid-column:6/span 2}
.rd{grid-column:8/span 2} .rx{grid-column:10/span 3}
@supports not (grid-template-columns:subgrid){ .reg,.rr{grid-template-columns:repeat(12,1fr)} }
```

版面永遠不對稱：9/3、8/4、7/5，**禁止 6/6 對半，禁止三張等寬卡片並排**。

---

## 三、色彩系統

| 色 | Hex | 用途 | 面積 |
|---|---|---|---|
| 警示黃 | `#EFC223` | 全站唯一地色。牆、頁底、按鈕預設底 | ~42% |
| 墨黑 | `#111111` | 斜紋、全部框線與正文、黑版（大面積實塊） | ~30% |
| 混凝土灰 | `#9A9C99` | 中間調：停用態、次要線、未配號的空欄 | ~11% |
| 鋼藍 | `#21458C` | 唯一冷色，只給「機關語意」：公告、警示、拒絕、focus ring | ~10% |
| 道線白 | `#F4F2EC` | 紙面（卡片、表格底）與黑版上的線 | ~7% |
| 訊號綠 | `#12A24C` | 只用於色碼第二塊（表示該格是數字）。不得作他用 | <1% |

**硬規則**

- 地色是黃，不是白也不是黑。黃必須是**大面積的地**，不是強調色。
- 墨黑必須以**大塊實面**出現（滿版黑版），不能只當文字色。
- 全站零紅、零橘。這是本風格與「黃＋黑＋橘紅」的野獸派／普普／道路標誌配色最重要的分野。
- 全站零漸層（唯一例外：色碼色相輪，且它是資料不是裝飾）、零模糊陰影、零圓角、零紙紋顆粒。
- 長文一律排在道線白的卡片上或黑版上，不直接排在黃底上超過三行。
- 黑版上的文字用 `#F4F2EC`；次要文字 `#b6b1a4`；角標 `#8d8a80`（對 `#111` 皆 ≥ 5:1）。

---

## 四、字體系統

```html
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700;800&family=Noto+Sans+TC:wght@400;700;900&display=swap" rel="stylesheet">
```

```css
body{ font-family:"Archivo","Noto Sans TC",system-ui,sans-serif;
      font-size:16px; line-height:1.62; letter-spacing:.005em;
      font-variant-numeric:tabular-nums; }
```

- **Archivo**（grotesque，代 Helvetica／Univers）：全部數字、英文、編號、角標。編號一律 800。
- **Noto Sans TC**：中文。標題 900，內文 400，小標 700。
- **等寬字禁用。** 這個風格的數字紀律來自 grotesque 的等寬數字（`tabular-nums`），不是來自打字機。用 mono 立刻滑向「工程製圖風」。

字級階梯（rem 換算以 16px 為基準）

| 角色 | 大小 | 字重 | 字距 |
|---|---|---|---|
| 章節大標 | `clamp(30px,5.4vw,54px)` | 900 | `-.028em` |
| 編號（領據） | `clamp(40px,9vw,86px)` | 800 | 0 |
| 小標 | 17–20px | 900 | 0 |
| 內文 | 16px | 400 | `.005em` |
| 註記 | 13.5px | 400 | 0 |
| 英文角標 `.lat` | 9.5–11px | 600–700 | `.14em–.24em` `uppercase` |

英文角標永遠全大寫、寬字距、低對比色。中文標題永遠緊字距、極粗、貼齊左界。**兩者不混排在同一行。**

---

## 五、版面與網格

- 十二欄，`column-gap:14px`，`max-width:1180px`，左右內距 22px（≤560px 為 15px）。
- 主要切分：**9/3**（主視覺＋側欄）、**8/4**、**7/5**。禁止 6/6。
- 區塊之間用 3px 實線（`.rule`）或 34px 斜紋帶（`.hzbig`）分隔，不用留白分隔，也不用細灰線。
- 首屏**沒有** hero：第一個進入視野的東西是那塊黑版，它的旁邊是側欄，上面是斜紋帶。不放大標＋副標＋按鈕組。
- 表格是一級公民：`th` 用 Archivo 全大寫寬字距 9.5px、下框 2px 實線；`td` 下框 1.5px 半透明墨。
- ≤900px：十二欄仍在，但所有欄位跨滿；導覽攤為四格等寬。≤560px：色碼塊縮到 11×17px，字級降一階。

---

## 六、元件配方

### 6.1 導覽：配號（number-allocation）

四頁＝四格。**現用頁那一格顯示它的編號，其餘三格顯示三個空的號欄**（1.5px 墨框、42% 不透明）。語意是「只有它被配到號」，其餘頁面在導覽上是匿名的。

```css
.nav a{display:flex;flex-direction:column;justify-content:flex-end;gap:4px;min-width:104px;
       padding:7px 11px 6px;border-left:2px solid #111;text-decoration:none}
.nav .no{font-family:"Archivo";font-weight:800;font-size:19px;background:#F4F2EC;
         border:2px solid #111;padding:3px 7px 4px}
.nav .slot{display:flex;gap:3px;padding:5px 0 6px}
.nav .slot i{width:13px;height:15px;border:1.5px solid #111;opacity:.42}
.nav a[aria-current="page"]{background:#111;color:#EFC223}
```

### 6.2 按鈕：hover 即配號

按鈕預設是黃底墨框；hover／focus 時**反成墨底黃字，並吐出它的編號**。這是本風格唯一允許的 hover 裝飾。

```css
.b{display:inline-flex;align-items:center;border:2.5px solid #111;background:#EFC223;
   font-weight:700;font-size:15px;padding:9px 15px;text-decoration:none}
.b .n{font-family:"Archivo";font-weight:800;font-size:13px;max-width:0;opacity:0;overflow:hidden;
      white-space:nowrap;transition:max-width .09s linear,opacity .09s linear,margin .09s linear}
.b:hover,.b:focus-visible{background:#111;color:#EFC223;outline:none}
.b:hover .n,.b:focus-visible .n{max-width:7.5em;opacity:1;margin-left:11px}
```
```html
<a class="b" href="counter.html" data-n="51">到認領台申請<span class="n">失 51</span></a>
```

### 6.3 黑版（plate）

滿版黑矩形，四角放 10px 全大寫英文角標，底部一條讀數列。黑版是本風格的「封套」：它承載主視覺，且它**不解釋自己**。

```css
.plate{background:#111;color:#F4F2EC;position:relative}
.plate .cap{position:absolute;left:16px;top:12px;font-family:"Archivo";font-size:10px;
            letter-spacing:.2em;text-transform:uppercase;color:#8d8a80}
.readout{display:flex;gap:0 26px;padding:11px 16px 13px;border-top:1px solid #33302a;
         font-family:"Archivo";font-size:11.5px;letter-spacing:.11em;text-transform:uppercase;color:#b6b1a4}
.readout b{color:#EFC223;font-weight:800}
```

### 6.4 色碼（colour code）

二十六色一圈，A 起於正上方順時針，色相 `130° + i × 13.846°`；數字 1–9 借用前九個字母、0 借用第十格，並在色塊底部疊一條訊號綠表示「這一格是數字」。

```css
.rc i{width:14px;height:21px;background:hsl(var(--h) 68% 51%);border:1px solid rgba(17,17,17,.5)}
.rc i.m{border-bottom:7px solid #12A24C}
```
```js
const hueOf = i => (130 + i*(360/26)) % 360;           // A=130°, B=143.8°, …
function codeBlocks(s){ return [...s.toUpperCase()].flatMap(ch=>{
  if(ch>='A'&&ch<='Z') return [{h:hueOf(ch.charCodeAt(0)-65),m:false}];
  if(ch>='0'&&ch<='9'){const d=+ch; return [{h:hueOf(d===0?9:d-1),m:true}];}
  return []; }); }
```

> 史實註記：原作（New Order《Blue Monday》FAC 73 與《Power, Corruption & Lies》FACT 75，1983）的解碼輪即為「二十六格、A 起於正上方順時針、數字 1–9 疊用前九字母」。本規格書重建的是**這條規則**，色相值為本站自訂——原始色票不在手邊，也不假裝在手邊。

### 6.5 表單與選項

選項一律是方形硬邊按鈕（`.chip`），不用 radio 圓點、不用下拉選單。選中態＝反色（墨底黃字），不是加框也不是變色。停用態＝ 32% 不透明，不變灰底。

### 6.6 卡片與頁尾

卡片：2px 墨框、道線白底、零圓角、零陰影。深色卡片右上角切 45° 黃三角。
頁尾：墨底、三欄、9.5px 全大寫欄標、14px 連結（底線 1px `#55524a`，hover 轉黃）。

---

## 七、動效規則

四種，缺一不可，全部有 `prefers-reduced-motion` 降級且資訊零損失。

| 類 | 名稱 | 觸發 | 參數 |
|---|---|---|---|
| ambient | 斜紋行進 | 無 | `background-position` 0 → 36.77px（小號）／56.57px（大號），`3.2s`／`5.4s` linear infinite |
| input | hover 即配號 | 游標／鍵盤 focus | `max-width` 0 → 7.5em、`opacity` 0 → 1，`90ms linear`（延遲 < 100ms） |
| transition | 45° 斜切推移 | 進頁 | `clip-path` 多邊形自左下角掃出，`520ms cubic-bezier(.22,.85,.24,1)` |
| signature | **前緣遮蔽 occlusion-front** | 游標 Y／方向鍵 | 每幀重解遮蔽關係，無補間 |

```css
@keyframes march{from{background-position:0 0}to{background-position:36.77px 0}}
@keyframes wipe45{
  from{clip-path:polygon(0 0,0 0,-46% 100%,-46% 100%)}
  to  {clip-path:polygon(0 0,190% 0,144% 100%,0 100%)}
}
main{animation:wipe45 .52s cubic-bezier(.22,.85,.24,1)}
@media (prefers-reduced-motion:reduce){ .hz,.hzbig{animation:none} main{animation:none} }
```

### 簽名動效：前緣遮蔽（occlusion-front）

疊線圖的「前緣」跟著游標的縱向位置走。靠近前緣的列振幅放大到 1.87 倍、遠離的壓到 0.52 倍——因此**移動游標不會讓你看到更多，只會換一批列被擋住**。可讀列數（可見取樣 ≥ 80% 的列）在 9 到 14 之間浮動，永遠不會是 16。

```js
const amp = H*0.26 * (0.52 + 1.35*Math.exp(-((Math.abs(i-focus)/1.9)**2)));
```

**降級**：`prefers-reduced-motion` 時取消 `pointermove` 連續追蹤，改為點擊與方向鍵逐列跳；遮蔽規則、讀數與可讀列數完全相同。

**禁用清單**（本風格明文禁止）：淡入式滾動揭示、視差、數字滾動計數、跑馬燈、按壓硬陰影、`stroke-dashoffset` 描繪、彈跳 easing、任何 `filter:blur`。

---

## 八、插畫與圖像風格

技法名稱：**ridgeline-register 疊線登記圖**。全站沒有一張外部圖片、沒有一張描外形的插圖。圖像原語只有四種：

1. **疊線**：一列資料一條線，由後往前疊，每一條都填底色所以會遮住後面的。橫軸是時間，縱軸是量。判準是「拿掉全部文字，仍讀得出哪一段時間收得最多」。
2. **色碼帶**：字元序列的第二種寫法（見 6.4）。
3. **45° 斜紋帶**：見特徵 4。
4. **路面幾何**：白色實線／虛線、車擋、貓眼——只在需要導引時使用，不當裝飾。

硬規則：

- 疊線必須來自可計算的資料，而且**必須遮擋**。改成半透明疊線、改成彩色多線圖、改成面積圖，本技法立刻失效。
- 曲線一律以貝茲平滑（控制點取相鄰兩點的中點 x），線寬 1.35px（前緣列 1.9px 且轉黃）。
- 圖上不放中文、不放座標軸標籤、不放圖例；讀數放在圖外的 `.readout` 列。
- 靜態版在建置階段就以同一支引擎算好並輸出成 `<path d>` 寫進 HTML，**沒有 JavaScript 也是完整的一張圖**；JS 只是接管同一組 `<path>` 重寫 `d`。

---

## 九、Logo 與 Favicon

**Logo**：黃底橫式鎖定。左邊一枚 48×48 墨黑方塊，左上與右下各切一枚 45° 黃三角（斜紋角度系統的縮影），方塊中央是道線白的主字（示範站為「失」，以五筆等寬 `stroke` 構成，`stroke-linecap:butt`，不用字型）。右邊上排中文名 20px/800，中排英文名＋編號 8px/600/`letter-spacing:2.1`，下排一條五格色碼帶（即該站自己的編號）。

**Favicon**：32×32 黃底，左上／右下 45° 墨三角，中央 22×20 墨方塊挖出白色主字。不用圓形、不用漸層、不放品牌全名。

```html
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%23EFC223'/%3E%3Cpath d='M0 0h10L0 10z' fill='%23111'/%3E%3Cpath d='M22 0h10v10z' fill='%23111'/%3E%3Crect x='5' y='6' width='22' height='20' fill='%23111'/%3E…%3C/svg%3E">
```

---

## 十、Do &amp; Don't

**Do**

- 先決定編號系統，再決定其他任何事。連導覽都要服從它。
- 主視覺放一張真的資料圖，滿版，黑底白線，不加說明。
- 每頁至少三處 45° 斜紋，角度不准改。
- 版面永遠不對稱；表格永遠對齊主網格（subgrid）。
- 文案要冷、要具體、要像機關公文：條號、規費、時刻、姓名、法源。可以有一句不解釋的怪話，但只能有一句。
- 大量留黃——黃是地，不是強調色。

**Don't**

- ✗ 不要在公開列表加「品名」欄。加了，這個風格就死了。
- ✗ 不要用紅或橘。黃＋黑＋紅是野獸派與道路標誌，不是這個風格。
- ✗ 不要圓角、不要模糊陰影、不要漸層、不要玻璃感、不要紙紋顆粒。
- ✗ 不要等寬字。等寬字會把它變成工程製圖風。
- ✗ 不要 emoji、不要線描小圖示、不要角色插畫。
- ✗ 不要「EST. 19xx」徽章、不要「把 X 變成 Y」句式標題、不要跑馬燈。
- ✗ 不要置中大標＋副標＋兩顆按鈕＋三張卡片。
- ✗ 不要把疊線圖畫成半透明疊線——遮擋就是這張圖的意義。
- ✗ 不要在黃底上排超過三行長文。

---

## 十一、頁面骨架範例

```html
<!DOCTYPE html><html lang="zh-Hant"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>登記簿｜北區客運總站 失物課</title>
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700;800&family=Noto+Sans+TC:wght@400;700;900&display=swap" rel="stylesheet">
<style>/* §三–§七 的 tokens 與元件 */</style>
</head><body>

<div class="hz" aria-hidden="true"></div>

<header class="top"><div class="wrap"><div class="topin">
  <a class="brand" href="index.html">
    <svg class="mk" viewBox="0 0 32 32">…</svg>
    <span><h1>失物課</h1><span class="en">Lost Property Office · 244</span></span>
  </a>
  <nav class="nav">
    <a href="index.html" aria-current="page"><b class="no">失 244</b><span class="lb">登記簿</span></a>
    <a href="counter.html"><b class="slot"><i></i><i></i><i></i></b><span class="lb">認領台</span></a>
    …
  </nav>
</div></div></header>

<main>
  <section class="wrap"><div class="sheet">
    <div class="c9">
      <div class="plate">
        <span class="cap">Register plot · intake by hour · last 16 days</span>
        <span class="cap r">失 244</span>
        <svg id="plate" viewBox="0 0 900 520" tabindex="0" role="slider">
          <rect width="900" height="520" fill="#111"/>
          <path class="rg" data-r="15" d="…"/> … <path class="rg" data-r="0" d="…"/>
        </svg>
        <div class="readout"><span>前緣 <b id="plate-f">6</b> 列</span>
          <span>此刻可讀 <b id="plate-r">9</b>／16 列</span>
          <span>被前排遮去 <b id="plate-h">7</b> 列</span></div>
      </div>
    </div>
    <aside class="c3r">…窗口狀態／今日結算／存量…</aside>
  </div></section>

  <div class="hzbig" aria-hidden="true"></div>

  <section class="wrap sec">
    <p class="kick">Latest sixteen allocations</p>
    <h2>失 243 – 失 228</h2><div class="rule"></div>
    <div class="sheet"><ol class="reg">
      <li class="rhd">…欄標…</li>
      <li class="rr"><span class="rn"></span><span class="rc">…</span>
          <span class="rs">B-4</span><span class="rd">1</span><span class="rx">保管中</span></li>
      …
    </ol></div>
  </section>
</main>

<div class="hz rev" aria-hidden="true"></div>
<footer>…墨底三欄…</footer>
</body></html>
```

---

## 十二、技術實作與相容性

本站的視覺由三項技術承載。每一項都在建站當日（2026-08-23）查證過支援現況，並實作了不支援時的具體退化行為。

### 12.1 CSS Grid `subgrid`（C 版面與樣式層）

**承載**：特徵 5。登記簿每一列的五個欄位（編號／色碼／架位／入庫／狀態）必須對齊整頁的十二欄主格線，而不是各自在自己的列裡重新分欄——這是「精確用在不該用的地方」這條規則唯一誠實的實作方式。媒體查詢或巢狀 `repeat(12,1fr)` 都做不到真正的欄線繼承（外層 `column-gap` 一改，內外就會錯開）。

**查證**：MDN《CSS grid layout / Subgrid》與 caniuse `css-subgrid`；web-platform-dx 的 web-features explorer 記載 subgrid 於 **2026-03-15 進入 Baseline Widely available**，最低版本 Firefox 71（2019）、Safari 16（2022）、Chrome／Edge 117（2023-09-12）、Opera 103、Samsung Internet 24，全球覆蓋 > 92%。

**Fallback**：
```css
@supports not (grid-template-columns:subgrid){ .reg,.rr,.rhd{grid-template-columns:repeat(12,1fr)} }
```
退回時各列自行分欄，欄寬相同、僅可能因巢狀 gap 產生 ≤ 14px 的累積誤差，**欄位順序、內容與可讀性完全不變**，資訊零損失。

### 12.2 CSS 計數器 `counter-reset` / `counter-increment` / `counter()`（C 版面與樣式層）

**承載**：特徵 1。登記簿的號碼是「它在時間裡的位置」，因此由版面遞減配號（`counter-increment: fac -1`），不在 HTML 裡寫死。設備與頁面等**身分型**號碼（失 51／73／118／244）則以字面寫死——這兩者的分工是規則，不是實作偷懶。

**查證**：MDN《counter()》標示 **Baseline Widely available，自 2015-07 起跨瀏覽器**；`counter-reset`／`counter-increment` 同期。

**刻意不使用 `::marker`**：MDN 明載 `::marker` **不是 Baseline**（部分主流瀏覽器對其可設樣式的屬性支援不足，`content` 尤其不可靠）。本站改以 `li > span::before` 承載編號，行為在所有目標瀏覽器一致。這是「可行性優先於炫技」的落點：規格書上更漂亮的選擇器，跑不穩就不用。

**Fallback**：無支援缺口。若 CSS 完全停用，`<li>` 仍為語意列表，號碼可由 `office.html` 與 `code.html` 的配號辦法推得。

### 12.3 真實時刻驅動 + `matchMedia`（B 動效與時間軸層）

**承載**：特徵 2 的字面實作。「今日結算」那一條折線**只畫到訪客本地時鐘的當前整點**——其後的時段不是零值，是還沒發生，因此沒有畫，並以一條白色虛線切斷。同一個時鐘另外驅動櫃檯窗口的開閉（週一至週六 09:00–17:00、12:00–13:00 午休）與鐵捲門的 45° 斜紋落下。`matchMedia('(prefers-reduced-motion:reduce)')` 則在啟動前決定簽名動效走連續追蹤還是逐列跳。

**查證**：MDN《Intl.DateTimeFormat》與《Intl.DateTimeFormat.prototype.formatToParts()》標示 **Baseline Widely available**（`formatToParts` 自 2018-10 起跨瀏覽器，建構式更早）；`window.matchMedia` 與 `MediaQueryList` 同為 Baseline Widely available。

**Fallback**：關閉 JavaScript 時，「今日結算」欄位顯示「今日尚未結算——本欄需要瀏覽器的時鐘才畫得出來」，並明白指出完整的十六日紀錄在左邊那一版上、不受影響；窗口狀態退為靜態的「櫃檯」字樣，受理時間在頁尾與 `office.html` 的表格內完整重複。**資訊零損失。**

### 12.4 效能預算實測

| 項目 | 門檻 | 實測 |
|---|---|---|
| 單頁大小（含 inline 全部 CSS/JS/SVG） | ≤ 350 KB | `index.html` 47.8 KB／`office.html` 46.4 KB／`code.html` 38.8 KB／`counter.html` 38.5 KB（gzip 後 12.4–16.2 KB） |
| 外部資源 | 僅 Google Fonts | 兩個字族，零圖片、零音檔、零函式庫 |
| 首屏 JS 執行 | ≤ 100 ms | 疊線圖初次求解 + 16 條路徑寫入 ≈ 0.04 ms（Node 22 實測 200 次求解 7.7 ms）；認領台的 240 筆登記簿決定性生成 ≈ 1.3 ms |
| 主要動畫 | 60 fps | 簽名動效每幀只做一次 O(16×16×25) 的遮蔽求解（≈ 0.04 ms）與 16 次 `setAttribute('d')`，零 `getBoundingClientRect`、零強制回流；斜紋行進只動 `background-position` |
| Layout thrashing | 無 | 讀寫分離：游標事件只記錄目標列，實際重繪在 `requestAnimationFrame` 內一次完成 |

### 12.5 無障礙

- 疊線圖為 `role="slider"`、`tabindex="0"`，方向鍵／Home／End 可操作，`aria-valuenow` 同步；讀數以文字呈現，不只靠顏色。
- 認領台的每一個選項都是原生 `<button>` 並有 `aria-pressed`；結果區為 `aria-live="polite"`。
- 對比：墨／黃 11.4:1、黃／墨 11.4:1、註記色 `#4b4133`／黃 5.4:1、黑版次要文字 `#b6b1a4`／墨 9:1、鋼藍卡片文字 `#c6cee0`／`#21458C` 5.5:1，全部 ≥ 4.5:1。
- 全部功能在鍵盤下可完成；`focus-visible` 為 3px 鋼藍或黃色外框，不移除 outline。

---

## 十三、參照

- Peter Saville，Factory Records 的 FAC 編目系統與唱片封套（FAC 1 海報 1978；FACT 10《Unknown Pleasures》1979；FAC 51 The Haçienda；FAC 73《Blue Monday》1983；FACT 75《Power, Corruption &amp; Lies》1983）。
- 《Unknown Pleasures》封面所用的疊加波形，源自射電脈衝星 CP 1919 的連續脈衝資料圖。
- Ben Kelly，The Haçienda（FAC 51，1982）室內設計：黑黃危險斜紋柱、路面標線、車擋、貓眼、藍灰色調、抬高的舞池。
- Factory 編號的荒謬延伸：非唱片之物一律配號（海報、便條紙、徽章、建築、官司）——本規格書特徵 1 即出自此。

*本規格書由 Claude Opus 5（排程 Agent）撰寫，2026-08-23。示範站的機關、人員、電話、地址與全部登記資料皆為虛構。*
