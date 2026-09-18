---
name: matchbox-label
description: The graphic language of the matchbox label — a thumb-sized double-keyline panel carrying exactly one flat silhouette, printed in two spot inks on cheap warm paper, where every page is built from many tiny framed panels rather than a few large sections, and the press's own registration and trim errors are part of the design.
---

# 火柴盒標籤 Matchbox Label

> 這份規格書描述的是 1890–1970 年間**火柴盒標籤（matchbox label／マッチラベル）**的整套視覺語言。
> 它不綁定產業：範例站是嘉義新港的蚊香工場，同一套語言也能做種苗行、罐頭廠、茶行、藥房、汽水廠、五金行、漁具店、唱片行、出版社的書系。
> 判準只有一個——**遮掉全部文字，懂設計的人要能在三秒內說出「這是一版火柴盒標」。**

---

## 〇、這個流派從哪裡來（先把自己放對位置）

| | 事實 |
|---|---|
| 年代 | 1844 年瑞典 Jönköping 的安全火柴商品化之後，標籤隨火柴一起變成全球性的印刷品；1890–1970 為高峰 |
| 產地 | 瑞典、日本、印度、捷克、蘇聯、中國與台灣。1900–1920 年間日本是世界最大火柴出口國，替印度、南洋、華南代印外銷標 |
| 製程 | 早期石版（chromolithography），後期平版；薄而吸墨的米黃或灰黃紙，背面上膠；一整版印幾十枚相同或混拼的標，再用裁刀切開 |
| 為什麼長這樣 | (a) 尺寸是盒面決定的，約 50×35 公釐；(b) 便宜印刷只給得起兩三罐專色；(c) 買主大量是不識字的，所以牌必須是**一樣看得懂的東西**；(d) 裁刀切一整疊，切歪是常態 |
| 收藏 | 這門收藏叫 phillumeny，火柴盒標籤收藏者稱 phillumenist |

**與鄰近流派的分界（做之前先讀，免得做成別的東西）：**

- **與里索／絹印海報的差別**：那是大尺寸、滿版、以疊印質感為主角；本流派是**拇指大**，而且一定有一圈不可跨越的框，紙面永遠有大面積留白在框外。
- **與 Pantone 專色樣張／包裝規格書的差別**：那是把顏色當資料展示；本流派的兩罐墨是**預算**，不是樣本。
- **與「復古貼紙」的差別**：貼紙可以任意外形、可以出血、可以沒有法定小字；本流派三者都不行。**框、單一主體、底條小字，缺一就不是標。**

---

## 一、設計哲學

1. **版面的單位是一枚拇指大的標，不是一個區塊。** 一頁不是被切成幾塊，是被**拼**出來的——一整版上有幾十枚，每枚各自完整、各自有框、各自有自己的兩罐墨。
2. **顏色是價錢。** 每多一罐墨就是多一次上機。所以一枚標只准兩罐，第三個顏色唯一的來源是兩罐疊在一起的地方。
3. **圖是給不識字的人看的。** 一枚標只准一樣東西，而那樣東西就是牌名。沒有場景、沒有背景、沒有透視、沒有第二個主體。
4. **細節用挖的，不用加的。** 剪影內部的層次一律是把地色挖掉（留紙），不是在上面加線。
5. **機器的誤差是作品的一部分。** 套印偏一點、裁刀偏一點，是這個流派的簽名。偏差要**規則**——同一次上機整版往同一個方向偏，同一列共用同一條刀口——因為那才是機器，不是亂數。

---

## 二、本風格的 5 個不可省略特徵

### 特徵 1：拇指大的雙框（the thumb-sized double keyline）

畫面上每一個資訊單元都是一枚 **52×36 公釐（13:9）** 的框內小板。框是**兩道**：外框粗、內框髮絲，中間留一道等寬的空。**沒有任何東西可以跨過框，沒有任何東西可以出血。**

```css
/* 一枚標 */
.label{aspect-ratio:260/180}            /* 13:9，永遠不要改 */
```
```html
<svg viewBox="0 0 260 180">
  <rect width="260" height="180" fill="#E4DCCB"/>
  <!-- 外框：粗 5，圓角 11 -->
  <rect x="7.5" y="7.5" width="245" height="165" rx="11" fill="none" stroke="#1E1B17" stroke-width="5"/>
  <!-- 內框：髮絲 1.6，圓角 5，與外框間距 9 -->
  <rect x="16.5" y="16.5" width="227" height="147" rx="5" fill="none" stroke="#1E1B17" stroke-width="1.6"/>
</svg>
```
拿掉它就不是這個風格了：沒有框的小圖是貼紙，不是標。全站只准存在這兩種線寬（5 與 1.6），第三種線寬一出現就破功。

### 特徵 2：一牌一物（one label, one thing）

框內正中恰好**一個**平塗剪影，佔面板高度的 **40–60%**，單色，軸對齊置中；而牌名就是這樣東西的名字。

```html
<!-- 剪影：線只准當「東西本身」（腿、莖、觸角），不准當「東西的邊」 -->
<g transform="translate(93,44) scale(.74)" fill="#E4DCCB" stroke="#E4DCCB">
  <ellipse cx="50" cy="52" rx="11" ry="21"/>
  <circle cx="50" cy="28" r="9"/>
  <path d="M39 40 24 30M39 62 24 72M61 40 76 30M61 62 76 72"
        stroke-width="6" stroke-linecap="round"/>
  <circle cx="46" cy="25" r="2" fill="#1E1B17"/>   <!-- 挖白：眼睛是被挖掉的 -->
</g>
```
判準：放大任何一枚標，(a) 找不到任何一條包住主體外緣的描邊；(b) 主體內部的亮處都是「被挖掉」而不是「被畫上」；(c) 畫面上只有一個主體，沒有第二個。

### 特徵 3：兩罐墨加紙（two cans and the paper）

樣式表裡只准出現**五個墨色碼與一個紙色**，而**任何一枚標只准用其中兩罐**。沒有色階、沒有透明度、沒有漸層、沒有中間灰。第三個顏色唯一的合法來源是 `mix-blend-mode:multiply` 的疊印。

```css
:root{
  --paper:#E4DCCB;                  /* 紙。它是第六個顏色，也是最亮值 */
  --v:#B32418; --y:#E0A011; --g:#1A6854; --b:#1C3B5A; --k:#1E1B17;
}
svg .ink2{mix-blend-mode:multiply}  /* 色版疊在主版上，重疊處自己生出第三色 */
```
**硬規則：鉻黃不得當主版。** 黃墨太淡，框線與底條的小字印不出來（#E0A011 對紙僅 1.67:1）。黃只能當地色。

### 特徵 4：三種上墨式由對比決定，不由品味決定

主版（框、字、剪影）與色版（地色）怎麼分，是**算**出來的：

```js
function mode(key, field, paper){
  if (ratio(key, field)   >= 4.5) return 'B';  // 印地：色地鋪滿，字與剪影印在地上
  if (ratio(paper, field) >= 4.5) return 'A';  // 反地：色地鋪滿，字與剪影由色版挖白
  return 'C';                                  // 邊帶：兩罐分不開，色地退成兩框之間的一條邊帶
}
```
```html
<!-- C 邊帶式：evenodd 挖出一條 5.5 寬的環，內容全部坐回紙上 -->
<path fill="#E0A011" fill-rule="evenodd"
      d="M16.5 16.5h227v147h-227z M22 22h216v136H22z"/>
```
拿掉它就不是這個風格了：黃地上印朱字是設計師的錯覺，不是印刷廠的作法。一整版上三種式子混排，正是「同一批墨、不同的分不分得開」留下的痕跡。

### 特徵 5：套印偏移與裁切偏移，而且它們是規則的

```css
@property --reg-x{syntax:'<length>';inherits:true;initial-value:0px}
@property --reg-y{syntax:'<length>';inherits:true;initial-value:0px}
html{animation:creep 8s linear infinite alternate}
@keyframes creep{from{--reg-x:0px;--reg-y:0px} to{--reg-x:1.2px;--reg-y:-.64px}}
svg .ink2{transform:translate(calc(var(--jx) + var(--reg-x)),
                              calc(var(--jy) + var(--reg-y)))}
```
`--jx/--jy` 是每一枚標自己的偏移，由 **FNV-1a → xorshift32** 從版號與格位算出（同一枚標在任何一頁、任何一次重整都偏同樣多）；`--reg-x/--reg-y` 是**整版一起爬**的那一份。裁切偏移同理，但**同一列共用一個 ty、同一欄共用一個 tx**——因為刀是一條線，不是一個點。

```css
.cell{overflow:hidden;aspect-ratio:260/180}
.cell>svg{transform:translate(calc(var(--tx)*1%),calc(var(--ty)*1%))}
```
拿掉它就不是這個風格了：完美對齊的兩色小圖是向量插畫，不是印刷品。

---

## 三、色彩系統

| 色 | hex | 用途 | 面積 |
|---|---|---|---|
| 紙 稻草白 | `#E4DCCB` | 標面、長文底板、最亮值 | 約 34% |
| 檯面 | `#CCC0A8` | 頁底（整版躺在上面的桌子），由紙色降明度推得，不是新顏色 | 約 20% |
| 朱 V-12 | `#B32418` | 主版／地色／現用態／警示／focus | ≤16% |
| 鉻黃 Y-04 | `#E0A011` | **只能當地色**，永不承載文字 | ≤10% |
| 松綠 G-21 | `#1A6854` | 主版／地色／通過態 | ≤10% |
| 普魯士藍 B-33 | `#1C3B5A` | 主版／地色／連結 | ≤10% |
| 墨 K-01 | `#1E1B17` | 主版／地色／全部正文／頁尾滿版 | 約 22% |

**硬規則**：零純白（最亮 `#E4DCCB`）、零純黑（最暗 `#1E1B17`）、零漸層（唯一合法的 `fill` 變化是 `multiply` 疊印）、零 `filter:blur`、零模糊陰影（陰影一律 `3px 4px 0` 的硬邊實色）、零發光、零金屬、零玻璃擬態、零中間灰色碼、零 `opacity` 調色（`fill-opacity` 只准出現在「空格」的虛線框上）。

**可讀性**（全部實測，紙為底）：墨 12.58:1／普魯士藍 8.45:1／松綠 4.89:1／朱 4.84:1／鉻黃 1.67:1（故禁用為文字）。挖白時紙對四罐主版色分別為 12.58／8.45／4.89／4.84，全部過關。

---

## 四、字體系統

- **漢字**：`Noto Sans TC`。牌名 900、正文 400。這個流派沒有細字，也沒有襯線。
- **拉丁與數字**：`Oswald` 400／600／700——窄體、方正、高 x-height，就是老標上那種擠在小框裡的展示字。

| 角色 | 級數（於 260×180 的標內） | 字重 | 字距 |
|---|---|---|---|
| 牌名（一行） | 25px（長名降 20／17） | 900 | 1px |
| 拉丁牌名／規格價 | 9.6px | 600 | 2.4px |
| 法定底條 | 6.6px | 400 | 1.35px |

版面上：`h1` 1.5rem／900／字距 2px；`h2` 1.12rem／900／下方 3px 實線並且 `display:inline-block`（線只到字尾，不貫穿整欄）；正文 .93rem／行高 1.75／`max-width:64ch`。

**禁用**：等寬體當正文、任何 300 以下字重、任何手寫體、任何斜體。

---

## 五、版面與網格

- 頁面的骨架是 **8 欄 × 6 列 = 48 格的一整版**，`gap:0`——標與標之間沒有間隙，共用裁切線。
- 視窗變窄時**不是縮小格子，是重新拼版**：8 欄 →（≤900px）6 欄 →（≤560px）4 欄。四十八枚一枚不少，只是換一種拼法。這條規則同時是 RWD 規則與世界觀規則。
- 內頁展示某一區時，同樣以「照半開紙重拼成四欄」處理，所以它比整版上大一倍，但仍是同十六枚。
- 刊頭本身是一枚長標（同樣兩道框）；頁尾是唯一一塊滿版墨色。
- 留白規則：框外的紙一律不放東西；長文一律坐在一張紙板（`.slip`，同樣兩道框）上，不直接坐在檯面上。

---

## 六、元件配方

```css
/* 紙板：長文、表格、刊頭共用 */
.slip{background:var(--paper);border:5px solid var(--k);border-radius:11px;margin:22px 0}
.slip>.in{border:1.6px solid var(--k);border-radius:5px;margin:7px;padding:20px 22px 24px}

/* 按鈕：硬邊落影，按下去真的位移 */
.btn{background:var(--v);color:#F3EEE3;border:2px solid var(--k);border-radius:3px;
     padding:9px 20px;font-weight:900;letter-spacing:3px;
     box-shadow:3px 4px 0 rgba(30,27,23,.34)}
.btn:active{transform:translate(2px,3px);box-shadow:1px 1px 0 rgba(30,27,23,.34)}

/* 選項籤 */
.chip{border:2px solid var(--k);border-radius:3px;background:var(--paper);padding:5px 10px;font-weight:700}
.chip.on{background:var(--k);color:var(--paper)}
.chip.taken{border-style:dashed;opacity:.62}

/* 導覽：四枚標，現用那一枚已經被裁下來 */
nav.trim{display:grid;grid-template-columns:repeat(4,1fr);gap:0;border:1.6px solid var(--k)}
nav.trim a{border-right:1px dashed rgba(30,27,23,.28);text-align:center;padding:11px 6px 9px}
nav.trim a[aria-current=page]{border:2px solid var(--k);border-radius:3px;margin:-1px;
  box-shadow:3px 4px 0 rgba(30,27,23,.34);z-index:2}

/* 表格：純線框，無斑馬紋 */
th,td{border:1px solid rgba(30,27,23,.28);padding:6px 9px}
th{background:rgba(30,27,23,.07);font-weight:900;white-space:nowrap}

/* 頁尾 */
footer{background:var(--k);color:var(--paper);padding:22px 18px 30px}
footer a{color:var(--y)}
```

**表單與按鈕禁用**：圓角 >3px（框除外，框是 11／5）、模糊陰影、漸層背景、圖示字型、emoji。

---

## 七、動效規則（四種，缺一不可）

| 類 | 名 | 觸發 | 值 |
|---|---|---|---|
| 環境 ambient | **晾標 curl** | 無輸入，持續 | `11s ease-in-out infinite`，`animation-delay:calc(var(--i)*.19s)`，峰值 `rotate(-.5deg) translateY(-1.4px)`，`transform-origin:100% 100%` |
| 輸入 input | **拇指掀角 thumb-lift** | `:hover` / `:focus-within` | `90ms linear`；`translateY(-4px) rotate(-.8deg)` + `drop-shadow(3px 4px 0)`；同時 `::after` 顯示格位（如 `C3`） |
| 轉場 transition | **落刀 guillotine** | 換頁載入 | `main{animation:.42s steps(1,end)}`，`clip-path:inset(0 100%/66.7%/33.4%/0 0 0)`——三刀，不是一次刷過 |
| 簽名 signature | **套印爬移 register creep** | 無輸入，全站同步 | `8s linear infinite alternate`，`--reg-x 0→1.2px`、`--reg-y 0→-.64px`，只作用於 `.ink2` |

**簽名為什麼是這一個**：畫面上沒有任何一個元素在動——字沒動，框沒動，剪影沒動。動的是**兩層之間的關係**，而且是整版一起爬，因為那是同一次上機。使用者看到的不是某個東西移動，是這張紙在呼吸它自己的公差。

**降級（四種都要，資訊零損失）：**
```css
@media (prefers-reduced-motion:reduce){
  html{animation:none;--reg-x:.6px;--reg-y:-.32px}  /* 停在這次上機的平均偏移 */
  main{animation:none}
  .sheet--full .cell{animation:none}
  .cell:hover>svg{transform:translate(calc(var(--tx)*1%),calc(var(--ty)*1%));filter:none}
  .cell:hover{outline:3px solid var(--v);outline-offset:-3px}  /* 掀角改成上墨框 */
}
```
格位 `::after` 在降級後照樣顯示，所以 hover 傳達的資訊一個字也沒少。

---

## 八、插畫與圖像風格

技法名：**剪影與框線構成 silhouette-and-keyline**。三條原語，明文不允許第四條：

1. **剪影**＝單色平塗的封閉形（或以 `stroke-linecap:round` 的粗線當肢體／莖／觸角）。**線只准當「東西本身」，不准當「東西的邊」。**
2. **框**＝只有兩種線寬（5 與 1.6），只有兩種圓角（11 與 5）。全站沒有第三種線寬。
3. **挖白**＝任何比地色亮的區域都是「地色被挖掉」，顏色一律是紙色，沒有第二種亮色。

判準：放大任何一張圖——(a) 找不到任何一條包住主體外緣的描邊；(b) 找不到任何連續明度變化；(c) 每一塊亮處都指得出它是「紙」。

**明文禁用**：照片、半調網點、細線幾何線描、`feTurbulence` 假質感、任何做舊／刮痕濾鏡、扁平化單色圖示庫、金屬漸層、任何發光、任何模糊陰影、任何一張外部圖片。

---

## 九、Logo 與 Favicon

Logo 就是**一枚標**：同樣的雙框、同樣的兩罐墨、正中一個屬於這家店的物。不要另外設計一個「標誌」——這個流派裡，商號的識別就是它的牌。

```html
<svg viewBox="0 0 130 90">
  <rect width="130" height="90" fill="#E4DCCB"/>
  <rect x="11" y="11" width="108" height="46" rx="2" fill="#B32418"/>   <!-- 色地 -->
  <g fill="none" stroke="#E4DCCB" stroke-width="3.4" stroke-linecap="round">
    <path d="M65 16a18 18 0 1 1-18 18 15 15 0 0 1 15-15 12.2 12.2 0 0 1 12.2 12.2
             9.4 9.4 0 0 1-9.4 9.4 6.6 6.6 0 0 1-6.6-6.6 3.8 3.8 0 0 1 3.8-3.8"/>
  </g>
  <g fill="none" stroke="#1E1B17">
    <rect x="3.5" y="3.5" width="123" height="83" rx="6" stroke-width="5"/>
    <rect x="8.25" y="8.25" width="113.5" height="73.5" rx="2.6" stroke-width="1.6"/>
  </g>
</svg>
```

Favicon 用同一枚標縮成 32×32，**去掉所有文字只留框與物**——32px 下一個字也讀不到，硬留就是糊。以 inline SVG data URI 寫進 `<head>`。

---

## 十、Do & Don't

**Do**
- 讓整頁由很多枚小標構成，而不是三四個大區塊。
- 每一枚標只放一樣東西，並讓那樣東西就是它的名字。
- 先算對比，再決定誰當主版、誰當地色。
- 讓套印與裁切偏一點，而且讓它偏得有規律（整版同向、同列同刀）。
- 底條那一行小字永遠在，永遠貼著內框下緣。
- 窄螢幕時**重新拼版**，不要把標壓扁。

**Don't（含去 AI 化禁令）**
- 不要紫藍漸層、不要置中大標＋兩顆按鈕＋三張圓角卡片、不要 emoji 當 icon、不要 `rounded-2xl` 加模糊陰影。
- 不要 Lorem ipsum，也不要「在當今快節奏的世界」這類語氣。價格、電話、燃時、農藥字號都要具體。
- 不要「EST. 19xx」徽章。年份寫進句子裡，不要做成印章。
- 不要出血、不要跨框、不要讓主體被框切到。
- 不要第三罐墨，也不要用透明度假裝第三罐。
- 不要把跑馬燈、視差、滾動揭示放進來——這個流派的動全部發生在**公差**裡，不在捲軸上。
- 不要把標做大。做大了它就變成海報，而海報是別人家的流派。

---

## 十一、頁面骨架範例（可直接使用）

```html
<!doctype html><html lang="zh-Hant"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>整版 XX-0000｜商號</title>
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E…%3C/svg%3E">
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;700;900&family=Oswald:wght@400;600;700&display=swap" rel="stylesheet">
<style>
@property --reg-x{syntax:'<length>';inherits:true;initial-value:0px}
@property --reg-y{syntax:'<length>';inherits:true;initial-value:0px}
:root{--paper:#E4DCCB;--board:#CCC0A8;--v:#B32418;--y:#E0A011;--g:#1A6854;--b:#1C3B5A;--k:#1E1B17}
html{background:var(--board);animation:creep 8s linear infinite alternate}
@keyframes creep{from{--reg-x:0px;--reg-y:0px}to{--reg-x:1.2px;--reg-y:-.64px}}
body{font-family:'Noto Sans TC',sans-serif;color:var(--k);line-height:1.75}
.sheet{display:grid;grid-template-columns:repeat(8,1fr);gap:0;background:var(--paper)}
.cell{position:relative;aspect-ratio:260/180;overflow:hidden}
.cell>svg{width:100%;height:100%;display:block;
  transform:translate(calc(var(--tx)*1%),calc(var(--ty)*1%))}
svg .ink2{mix-blend-mode:multiply;
  transform:translate(calc(var(--jx) + var(--reg-x)),calc(var(--jy) + var(--reg-y)))}
main{animation:guillotine .42s steps(1,end) both}
@keyframes guillotine{0%{clip-path:inset(0 100% 0 0)}33%{clip-path:inset(0 66.7% 0 0)}
  66%{clip-path:inset(0 33.4% 0 0)}100%{clip-path:inset(0 0 0 0)}}
@media (max-width:900px){.sheet{grid-template-columns:repeat(6,1fr)}}
@media (max-width:560px){.sheet{grid-template-columns:repeat(4,1fr)}}
</style></head><body>
<header class="head"><div class="head-in">…</div></header>
<nav class="trim">…四枚標，現用那一枚已裁下…</nav>
<main>
  <div class="sheet">
    <div class="cell" data-cell="A1" style="--i:0">
      <svg viewBox="0 0 260 180" style="--jx:.41px;--jy:-.32px;--tx:.13;--ty:-.2">
        <rect width="260" height="180" fill="#E4DCCB"/>
        <g class="ink2">
          <rect x="22" y="22" width="216" height="104" rx="3" fill="#B32418"/>
          <text x="130" y="40" text-anchor="middle" class="t-zh" fill="#E4DCCB">白鶴牌</text>
          <g transform="translate(93,44) scale(.74)" fill="#E4DCCB" stroke="#E4DCCB">…剪影…</g>
        </g>
        <g class="ink1" fill="#1E1B17">
          <rect x="7.5" y="7.5" width="245" height="165" rx="11" fill="none" stroke="#1E1B17" stroke-width="5"/>
          <rect x="16.5" y="16.5" width="227" height="147" rx="5" fill="none" stroke="#1E1B17" stroke-width="1.6"/>
          <text x="130" y="143" text-anchor="middle" class="t-lat">WHITE CRANE BRAND</text>
          <text x="130" y="157" text-anchor="middle" class="t-mic">牌號 一〇三 · 基隆 · 商號 · 產地</text>
        </g>
      </svg>
    </div>
    …其餘 47 枚…
  </div>
</main>
<footer>…滿版墨色，底條小字…</footer>
</body></html>
```

---

## 十二、技術實作與相容性

本站的三項核心技術，分屬 A 渲染／B 動效／E 資料生成三層。

### 1. `mix-blend-mode: multiply`（A 渲染層）— 承載特徵 3、4

**它在這裡做什麼**：兩罐專色重疊處必須自己生出第三個顏色，而不是由設計者另外指定一個色碼。色版在下、主版在上，重疊處以 multiply 得到真正的疊印色；套印爬移時，疊印區的形狀會跟著改變，這正是「印刷」與「向量插畫」的差別。

**支援現況（查證：caniuse `css-mixblendmode`，資料期 2026 年 8 月）**：全球 96.98%（完整 81.31% ＋ 部分 15.67%）。Chrome 41+／Edge 79+／Firefox 32+ 完整支援；Safari 7.1 起列為部分支援（部分混色模式與 `isolation` 行為有出入），但 `multiply` 本身可用。Opera Mini 與 IE 不支援。
來源：<https://caniuse.com/css-mixblendmode>

**不支援時的具體行為**：
```css
@supports not (mix-blend-mode:multiply){ svg .ink2{mix-blend-mode:normal} }
```
退成一般堆疊——色版與主版重疊處直接顯示上層的主版色。**沒有任何資訊承載在疊印色上**（牌名、規格、價格、底條全部是單一主版色印在紙或地色上，且對比皆已實測 ≥4.5:1），所以退化只影響風味，不影響可讀性。

### 2. CSS `@property` 型別化自訂屬性（B 動效層）— 承載簽名動效

**它在這裡做什麼**：`--reg-x/--reg-y` 若不註冊型別，瀏覽器會把它當字串，`@keyframes` 之間只會硬跳而不會補間，「爬移」就變成「瞬移」。註冊為 `<length>` 之後才能真正插值，而且插值在合成階段完成，不觸發 layout。這是本站唯一無法用其他寫法替代的技術：整版同步、連續、而且只有一個變數。

**支援現況（查證：caniuse `mdn-css_at-rules_property`，資料期 2026 年 8 月）**：全球 95.01%。Chrome/Edge 85+、Safari 16.4+、Firefox 128+、Samsung Internet 14+。IE 與 KaiOS 不支援。
來源：<https://caniuse.com/mdn-css_at-rules_property>

**不支援時的具體行為**：`@property` 區塊被整段忽略，`--reg-x/--reg-y` 仍能由 `:root` 取得初始值 `0px`，`@keyframes creep` 對它無效 → **套印爬移靜止在 0，每一枚標仍保有自己由 `--jx/--jy` 算出的固定套印偏移**。畫面上看得到套印不準，只是它不會呼吸。其餘三種動效（晾標、掀角、落刀）不依賴 `@property`，照常運作，動效預算仍為 4 − 1 = 3 種可見 + 靜態偏移，資訊零損失。

### 3. 決定性偽隨機 FNV-1a → xorshift32（E 資料與生成層）— 承載特徵 5 與首創

**它在這裡做什麼**：每一枚標的套印偏移來自 `xorshift32(FNV-1a("HH-1174/c/" + index))`，裁切偏移來自 `FNV-1a("HH-1174/r/" + row)` 與 `.../k/" + col`。因此：

- 同一枚標在**首頁的整版**與在**內頁的裁切區**偏移完全相同——這是「四個頁面是同一張版」這項首創能夠成立的前提；
- 同一列的所有標共用同一個 `ty`、同一欄共用同一個 `tx`，因為刀是一條線；
- 重新整理、換裝置、換瀏覽器，結果一模一樣，零儲存、零網路。

無相容性問題（純整數運算，`Math.imul` 自 ES2015 起全面可用）。

### 4. 效能預算（實測值）

| 項目 | 實測 | 門檻 |
|---|---|---|
| index.html（含全部 inline 資源，48 枚標） | **70.8 KB** | ≤350 KB |
| pang.html（含落牌檯引擎與資料） | **47.5 KB** | ≤350 KB |
| pai.html／hue.html | **33.9 / 33.4 KB** | ≤350 KB |
| 首屏 JS 執行 | index／pai／hue **0 ms（零 JavaScript）**；pang 的落牌檯建構（14 牌記 × SVG ＋ 五組 chips ＋ 16 格重繪）以 jsdom（Node 22）重複九次取最佳值量測為 **10.0 ms** | ≤100 ms |
| 主要動畫 | 全部僅改 `transform` 與註冊過的自訂屬性，不觸發 layout；48 枚標的 `curl` 為錯開延遲的 compositor 動畫 | 60 fps |
| 外部資源 | 僅 Google Fonts 兩支；零圖片、零音檔、零函式庫 | — |

**超標時先簡化哪裡**：先把整版的 `curl` 環境動效關掉（≤560px 已預設關閉），再把整版降為只印一半的列。**不要**為了省量而拿掉底條小字或框——那兩樣是這個流派的本體。

### 5. 無障礙與無 JavaScript

- 四頁的全部內容（四十八枚標、價目、牌號簿、撞牌簿、空格鄰格表）皆為建置階段寫死的靜態 HTML 與內嵌 SVG。關掉 JavaScript 只有「落牌檯」不能玩，同一份資料以〈各口岸尚可用的牌記〉與〈三個空格的鄰格〉兩張表完整存在於同一頁，一個字也不會少。
- 每一枚標的 `<svg>` 帶 `role="img"` 與 `aria-label`（牌名＋拉丁行）。
- 導覽「已裁下」的視覺差異對輔助科技不可見，所以現用項同時帶 `aria-current="page"`。
- 落牌檯的退件理由寫在 `role="status" aria-live="polite"` 的區塊裡，不只用顏色表達；選項籤帶 `aria-pressed`。
- 所有可聚焦元件皆有 `:focus-visible` 的 3px 朱色外框。

