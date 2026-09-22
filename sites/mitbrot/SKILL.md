---
name: isotype-vienna-method
description: The Vienna Method of pictorial statistics (Isotype) — quantity shown as repeated flat silhouette signs on card, never as scaled ones, with remainders cut and declared.
---

# 維也納圖形統計法 ISOTYPE

> Wiener Methode der Bildstatistik → International System of Typographic Picture Education
> Otto Neurath・Gerd Arntz・Marie Neurath，維也納 1925–1934 → 海牙 → 牛津
> 本規格書由範例站 **MITBROT Genossenschaftsbäckerei** 抽出。風格與產業分離：這套語言可以拿去做任何「要把數字講清楚」的網站。

---

## 一、設計哲學

Isotype 不是一種裝飾風格，是一套**拒絕**。Otto Neurath 一九二五年在維也納社會經濟博物館（Gesellschafts- und Wirtschaftsmuseum in Wien）訂這套方法的時候，處理的是一個具體問題：怎麼讓一個沒受過教育的工人，在博物館走廊上停留十秒鐘，就看懂住宅、死亡率、工時的統計。

他的答案是三句話，而這三句話直到今天還是整套視覺語言的全部：

1. **「Worte trennen, Bilder verbinden.」** 字會分開人，圖會連起人。所以圖是主體，字是註解——不是反過來。
2. **數量用符號的**個數**表示，絕不用符號的**大小**。**面積會騙人：一個畫大一倍的人形，讀者到底該讀成兩倍還是四倍？個數不會騙人，因為它只能數。
3. **圖不是資料的插畫，是資料的形式。**版面不是設計出來的，是被數字算出來的：這一列有多長，取決於這一列是多少。設計師決定的只有「一個符號代表多少」。

第三句是最難守也最值得守的一句。它意味著你不能為了版面好看而調整一列的長度，也不能為了畫面乾淨而把零頭抹掉。Isotype 的美感全部來自**限制被誠實地執行**——一旦你偷偷四捨五入，畫面會變漂亮，而這套語言會立刻死掉。

Marie Reidemeister（後來的 Marie Neurath）給自己那道工序取的名字是 **transformer**：把統計表翻譯成圖的人。她不是美術，也不是統計；她的工作是決定「這組數字的哪一個面向值得被畫成幾排符號」。做這個風格的網站，你就是 transformer。

---

## 二、本風格的 5 個不可省略特徵

拿掉任何一項，它就不是 Isotype 了。每一項都附可以直接複製的片段。

### 特徵 1 — 數量＝個數；不夠一個單位就把符號**切掉**，不縮小、不四捨五入

這是整套方法的第一條，也是唯一一條不能商量的。實作上最乾淨的做法是讓 **SVG 的填充演算法替你切**：把符號定義成 `<pattern>` 的一塊磚，再畫一個寬度等於「數量 ÷ 每符號代表量 × 一格寬」的 `<rect>`。磚被矩形的邊界切斷——切符號這件事不是你畫的，是規則自己做的。

```html
<svg viewBox="0 0 384 26" preserveAspectRatio="xMinYMin meet" aria-hidden="true">
  <defs>
    <!-- 一格 24×26；符號畫在 x0.8–21.2 之間，右邊留 2.8 當字距 -->
    <pattern id="p-mensch" patternUnits="userSpaceOnUse" width="24" height="26">
      <g fill="#1A1916">
        <circle cx="11" cy="4.6" r="3"/>
        <path d="M4.8 19v-4.8a6.2 6.2 0 0 1 12.4 0V19Z"/>
        <rect x="4.8" y="19.5" width="5" height="4.5"/>
        <rect x="12.2" y="19.5" width="5" height="4.5"/>
      </g>
    </pattern>
  </defs>
  <!-- 789 人，1 符號 = 25 人 → 31.56 個符號。這一行放 16 個，寬 = 16×24 -->
  <rect x="0" y="0" width="384" height="26" fill="url(#p-mensch)"/>
  <!-- 第二行 15.56 個 → 寬 373.44。第 16 個人被切成 0.56 -->
  <rect x="0" y="30" width="373.44" height="26" fill="url(#p-mensch)"/>
  <!-- 切口：刀停下來的地方，1.4 寬的墨線 -->
  <rect x="372.04" y="30" width="1.4" height="26" fill="#1A1916"/>
</svg>
```

換算的程式只有兩行，`Math.floor` 只用來決定換行，不用來取整資料：

```js
const S = menge / jeZeichen;              // 可以是小數，而且必須留著
const zeilen = Math.ceil(S / spalten);    // 幾行
const letzte = S - (zeilen - 1) * spalten; // 最後一行幾個（小數）
```

**禁止**：`transform: scale()` 表示數量、`height: {n}%` 的長條、把 31.56 寫成 32、把小數列用 `opacity` 淡出。

### 特徵 2 — 符號是實心剪影：零輪廓線、零漸層、零陰影、零透視

Gerd Arntz 從一九二八年起把符號刻成木刻／油氈版，所以它們天生只有「有墨」跟「沒墨」兩個狀態。凹處是**挖掉的洞**（用 `fill-rule="evenodd"` 的子路徑），不是第二個顏色，也不是白色蓋上去的形狀——洞裡露出的一定是底下的卡紙。

判準：**縮到 5 mm 還要認得出來。**畫完把它縮到 16 px 看一眼，認不出來就重畫，不要加細節。

```css
/* 全站對符號的唯一宣告 */
.zeichen{ fill: currentColor; }
.zeichen *{ stroke: none; }        /* 永遠不描邊 */
/* 禁止清單，寫進 lint 都可以 */
/*  filter: drop-shadow() ×   opacity: .5 ×   linearGradient ×
    stroke-width ×            transform: perspective() ×        */
```

```html
<!-- 麵包：一個圓頂 ＋ 三道被刻掉的割痕。洞就是洞。 -->
<path fill-rule="evenodd" d="M2.6 23.6v-7.4a8.4 8.4 0 0 1 16.8 0v7.4Z
  M5 14.6l2-3.2 1.5 1-2 3.2Z M9 14.6l2-3.2 1.5 1-2 3.2Z M13 14.6l2-3.2 1.5 1-2 3.2Z"/>
```

畫符號的三條實作規矩：正面或純側面（不要四分之三角度）、輪廓是直線與正圓的組合（不要自由曲線）、同一套符號共用同一個視覺重量（面積覆蓋率大致相同，否則同一列裡有的重有的輕）。

### 特徵 3 — 顏色是分類，不是裝飾；而且**沒有任何一色的淡版**

六罐墨定死語意，整站不出現第七色。要表現「比較少」只能少畫幾個符號，不能把顏色調淡——因為在一九三〇年，淡版是另一次過網，而這塊板只印一次。

```css
:root{
  --karton:  #CFC9B6;  /* 卡紙地（暗）— 頁面底 */
  --blatt:   #E3DECD;  /* 板面（亮）— 內容區 */
  --schwarz: #1A1916;  /* 墨：人 */
  --zinnober:#C8361C;  /* 朱：成品（麵包、箱）、鑰匙與餘數 */
  --blau:    #1D5A86;  /* 藍：時間與地點 */
  --braun:   #7B4A22;  /* 褐：原料 */
  --gruen:   #3D6A38;  /* 綠：回去的東西 */
  --ocker:   #D6A121;  /* 赭：錢 */
}
```

**面積比例不是設計決定的，是資料決定的**——哪一類的數量多，它的顏色在畫面上就佔得多。這是本風格與所有「平面色塊風」最根本的差別：你不能替顏色配比。

**禁止**：同一顏色的 tint／shade、`opacity` 做層級、彩色的底、任何漸層（含 2 % 的那種）。

### 特徵 4 — 一列一種符號，由左往右長，全部列共用同一條左緣；**沒有座標軸、格線、刻度、圖例方塊**

Isotype 的板子上唯一的直線是分隔列的橫線與板緣。比較是靠「兩列的長度」完成的，所以兩列必須從同一個 x 出發、用同一個一格寬；只要這兩件事成立，刻度就是多餘的。

```css
.zeile{
  display:grid;
  grid-template-columns: 196px 1fr 84px;   /* 行首 | 符號欄 | 數值 */
  border-bottom: 2px solid var(--schwarz); /* 全站唯一允許的線 */
}
.zeile .feld svg{ display:block; width:100%; height:auto; }
/* 所有列的 svg 共用同一個 viewBox 寬（= 欄數 × 一格寬），
   所以不同列的第 n 個符號在畫面上必定對齊同一條垂直線。 */
```

一列太長就**換到下一行**，不要縮小符號、不要橫向捲動、不要改成長條圖。

**禁止**：X／Y 軸、網格線、刻度標記、獨立的 legend 色塊（鑰匙寫在行首）、圓餅圖、折線圖、任何 3D。

### 特徵 5 — 鑰匙與餘數必須寫在板上

每一列的行首要有三樣東西：**這一列的符號**、**這一列是什麼**、**一個符號代表多少**。有餘數就用朱紅寫出來。這一條是本風格最容易被偷懶掉、也最能一眼看出做得認不認真的地方。

```html
<div class="kopf">
  <svg class="zeichen" viewBox="0 0 22 26"><use href="#z-mensch"/></svg>
  <div>
    <b>社員</b>
    <span class="schluessel">1 Zeichen = 25 Mitglieder</span>
    <span class="rest">Rest 14 Mitglieder（被切掉的那一塊）</span>
  </div>
</div>
```

```css
.zeile .kopf .schluessel{ font-size:11.5px; opacity:.78; display:block }
.zeile .kopf .rest{ font-size:11.5px; color:var(--zinnober); font-weight:600; display:block }
```

```js
function restsatz(menge, je, einheit){
  const S = menge / je, br = S - Math.floor(S);
  return br < 1e-9 ? '' : 'Rest ' + Math.round(br * je * 100) / 100 + ' ' + einheit;
}
```

---

## 三、色彩系統

| 色票 | Hex | 用途 | 面積比例 |
|---|---|---|---|
| Karton 卡紙地 | `#CFC9B6` | 頁面底 | 依版面，約 12 % |
| Blatt 板面 | `#E3DECD` | 內容區底（唯一的第二階紙色） | 約 46 % |
| Schwarz 墨 | `#1A1916` | 人・正文・所有分隔線（一律 2 px） | 約 22 % |
| Zinnober 朱 | `#C8361C` | 成品・鑰匙標籤・餘數・當前頁的行首符號 | 約 12 % |
| Blau 藍 | `#1D5A86` | 時間與地點（爐次帶、取貨點） | ≤ 5 % |
| Braun 褐 | `#7B4A22` | 原料（穀、粉） | ≤ 4 % |
| Grün 綠 | `#3D6A38` | 回去的東西（退回、轉送、堆肥） | ≤ 3 % |
| Ocker 赭 | `#D6A121` | 錢 | ≤ 3 % |

**分配原則**：先決定語意再決定顏色，一個語意一罐墨，一罐墨只服務一個語意。上表的百分比是**觀察值不是目標值**——它是資料長出來的結果。

零純白、零純黑、零圓角、零陰影、零漸層。真黑（`#000`）與真白（`#FFF`）在卡紙上不存在。

---

## 四、字體系統

維也納社會經濟博物館用的是 **Futura**（Paul Renner, 1927）——同一個城市、同一個十年、同一種「把形狀還原成幾何」的主張。網頁上用 Google Fonts 的 **Jost\***（Futura 系的開源重製）。

```html
<link href="https://fonts.googleapis.com/css2?family=Jost:wght@400;500;600;700&family=Noto+Sans+TC:wght@400;500;700&display=swap" rel="stylesheet">
```

```css
body{
  font-family:'Jost', system-ui, 'Noto Sans TC', sans-serif;
  font-size:16px; line-height:1.55;
  font-variant-numeric: tabular-nums lining-nums;   /* 數字要對齊，這是統計板 */
}
```

| 角色 | 字級 | 字重 | 字距 | 備註 |
|---|---|---|---|---|
| 板題 `.lab` | 11 px | 600 | `.2em` | 全大寫，朱色，`TAFEL 1 · …` |
| h1 | `clamp(23px,3.1vw,34px)` | 600 | `-.01em` | 行高 1.12，最多兩行 |
| h2 | `clamp(19px,2.3vw,25px)` | 600 | 0 | |
| 行首標題 | 14.5 px | 600 | 0 | |
| 鑰匙／餘數 | 11.5 px | 400／600 | `.04em` | |
| 數值 | 17 px | 600 | `.01em` | 右對齊，`tabular-nums` |
| 正文 | 15.5 px | 400 | 0 | `max-width:66ch` |
| 導覽標籤 | 13 px | 600 | `.14em` | 全大寫 |

只有三個字重（400／500–600／700）。**不用斜體**——幾何等線體沒有真斜體，假斜會破壞圓的正圓性。

---

## 五、版面與網格

```
┌── .blatt（max-width 1180，2px 墨框）──────────────────────────┐
│ .kopfband   Logo ｜ 出處與日期 ｜ MASSSTAB 尺度（右）         │  ← 板緣抬頭
├───────────────────────────────────────────────────────────────┤
│ .ofenband   一條藍色時間帶 ＋ 黑色「現在」刀口                │  ← 環境動效
├──────────────┬────────────────────────────────────────────────┤
│ .reihenkopf  │ main                                           │
│ 行首欄導覽   │   .lab 板題                                    │
│ 186px        │   .brett → .zeile × n                          │
│              │   .zeile = 196px | 1fr | 84px                  │
└──────────────┴────────────────────────────────────────────────┘
```

規矩：

- **零旋轉、零傾斜。**這是一塊釘在牆上的板，不是海報。
- 分隔線一律 `2px solid var(--schwarz)`，不存在 1 px、也不存在淡灰線。
- 留白只有兩個值：`10px`（列內）與 `22px`（節間）。
- 符號欄的 `viewBox` 寬度 = 欄數 × 24。桌機 16 欄，`≤560px` 改 11 欄（**改欄數，不改符號大小**）。
- 內容寬度 `max-width:66ch`；表格寬度 100 %。
- 板緣抬頭放出處與日期——在 Isotype 的板子上，來源與日期是印在板緣的，不是藏在 footer。

---

## 六、元件配方

### 導覽 `.reihenkopf`（行首欄）

導覽不是另一種東西，它**就是圖表的行首**：一個符號＋一個標籤，當前頁的符號轉朱色。

```css
.reihenkopf{ border-right:2px solid var(--schwarz); }
.reihenkopf a{ display:grid; grid-template-columns:34px 1fr; gap:10px; padding:9px 14px;
  text-decoration:none; color:var(--schwarz); }
.reihenkopf a svg{ width:26px; height:28px; fill:var(--schwarz); }
.reihenkopf a[aria-current="page"]{ background:var(--schwarz); color:var(--blatt); }
.reihenkopf a[aria-current="page"] svg{ fill:var(--zinnober); }
@media (max-width:880px){                   /* 手機：變成一條四格的行首帶，不是漢堡 */
  .reihenkopf{ border-right:0; border-bottom:2px solid var(--schwarz);
    display:grid; grid-template-columns:repeat(4,1fr); }
}
```

### 按鈕

方角、2 px 墨框、無陰影。按下＝**反相**（不是變色、不是位移、不是加陰影）。

```css
button{ font:inherit; font-weight:600; letter-spacing:.12em; text-transform:uppercase;
  padding:9px 16px; border:2px solid var(--schwarz);
  background:var(--blatt); color:var(--schwarz); cursor:pointer; }
button[aria-pressed="true"], button.primaer{ background:var(--schwarz); color:var(--blatt); }
button:focus-visible{ outline:3px solid var(--zinnober); outline-offset:2px; }
```

### 表格

表格是圖的**逐字稿**，不是替代品。每一塊板底下該有它的表，反過來不成立。

```css
table{ border-collapse:collapse; width:100% }
th,td{ text-align:left; padding:8px 12px 8px 0; border-bottom:2px solid var(--schwarz); vertical-align:top }
th{ font-size:11px; letter-spacing:.14em; text-transform:uppercase; font-weight:600 }
td.z{ text-align:right; font-weight:600 }     /* 數值欄 */
caption{ text-align:left; color:var(--zinnober); font-size:12px; letter-spacing:.1em;
  text-transform:uppercase; font-weight:600; padding-bottom:6px }
```

### 尺度桿 `.massstab`

本風格唯一需要的全域控制項：**一個符號代表多少**。三段（fein／mittel／grob），放在板緣右上。

### 頁腳

三欄事實（地址・時間・分點），底下一條分隔線後放虛構聲明與建置模型。不放標語、不放訂閱框、不放社群圖示。

---

## 七、動效規則

每一種動效都必須是**資訊**，不是氣氛。四種，缺一不可，全部要有 `prefers-reduced-motion` 降級且降級後資訊零損失。

| 類型 | 本站的做法 | 觸發 | 時間／曲線 |
|---|---|---|---|
| **ambient 環境** | 板緣的時間帶依訪客本地真實時刻推進；還沒發生的事件是空心的，不是灰掉的 | 無（每 30 s 一跳） | `transition:left 240ms linear` |
| **input 輸入** | 指到／focus 某一列 → 該列抬起 2 px | hover／focus-within | `110ms linear`（<100 ms 可感） |
| **transition 轉場** | 進站時符號欄由左往右揭開（讀圖的方向），逐列 stagger 45 ms | 載入 | `clip-path: inset(0 100% 0 0) → inset(0)`，`420ms linear` |
| **signature 簽名** | **切符號重列**：換尺度時一條 2 px 墨色刀口從右掃到左，整塊板在刀後重新切好 | 尺度桿 | `200ms linear`，**無 ease** |

**全站一律 `linear`。**Isotype 的東西不加速也不減速——刀不會減速，時間不會回彈。禁用 `ease-in-out`、`cubic-bezier` 彈跳、`spring`。

```css
@keyframes heben     { to{ transform:translateY(-2px) } }
@keyframes nachsetzen{ from{ transform:translateX(-5px) } to{ transform:translateX(0) } }

.zeile{ animation-composition: add; }        /* ← 關鍵：兩條 transform 動畫相加 */
.zeile:hover{ animation:heben 110ms linear forwards }
.zeile.setzen{ animation:nachsetzen 220ms linear }
.zeile.setzen:hover{ animation:nachsetzen 220ms linear, heben 110ms linear forwards }

@media (prefers-reduced-motion:reduce){
  .messer{ display:none }                    /* 刀口不掃，板子直接換好 */
  .zeile:hover{ animation:none }
  .zeile:hover .kopf b::after{ content:' ◂'; color:var(--zinnober) }  /* 抬起改成標記 */
}
```

---

## 八、插畫與圖像風格

**本風格沒有插畫，只有符號。**畫面上每一個圖形都必須是某一列的計數單位；不存在「裝飾用的圖」。這是它跟所有其他平面風格最大的差別，也是最省事的地方——你只需要畫一套八到十個符號，整站就畫完了。

一套符號的標準做法：

1. 決定**格**：24 × 26 使用者單位，符號畫在 `x 0.8–21.2`、`y 2–24`，右邊 2.8 是字距。
2. 一個符號一個概念，而且是**具體的東西**（人、麵包、箱、袋、穗、爐、屋、鍋、幣），不是抽象概念（不要畫「效率」）。
3. 全部正面或全部純側面，同一套裡不混。
4. 凹處用 `fill-rule="evenodd"` 挖洞。
5. 畫完縮到 16 px 檢查一次。

符號可以有**變體**（同形不同色＝不同類別；同形加一個洞＝子類別），但不可以有**大小變體**。

底紋、紙纖維、噪聲、`feTurbulence` 假質感一律禁止——這塊板是平版一次印出來的。

---

## 九、Logo 與 Favicon

Logo = **一個把本風格的規矩畫出來的標記** ＋ 幾何等線體字標。MITBROT 的標記是「兩個半麵包」：兩個完整符號、第三個被一條墨色刀口就地切斷。也就是說，商標本身就是特徵 1。

```html
<svg viewBox="0 0 380 62" role="img" aria-label="MITBROT">
  <defs><clipPath id="halb"><rect x="0" y="0" width="75" height="62"/></clipPath></defs>
  <g fill="#C8361C">
    <g transform="translate(0,14.5) scale(1.25)">…laib…</g>
    <g transform="translate(31,14.5) scale(1.25)">…laib…</g>
    <g clip-path="url(#halb)"><g transform="translate(62,14.5) scale(1.25)">…laib…</g></g>
  </g>
  <rect x="75" y="8" width="3" height="44" fill="#1A1916"/>  <!-- 刀口 -->
  <!-- 字標：單線粗細 5.6、cap height 28、O 是正圓 -->
</svg>
```

字標自繪要點：筆畫粗細**單一值**（此處 5.6）、O 是正圓（`r = cap/2`）、M 的中間 V 不觸底線、T 的橫劃等於字寬。副標行全大寫、`letter-spacing:2`，放在字標下方。

Favicon 用同一個概念縮到 32 × 32：一個完整麵包、一個被切一半的麵包、一條刀口。三個形狀，沒有字。

```html
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E…%3C/svg%3E">
```

---

## 十、Do & Don't

**Do**

- 先把資料表寫好，再決定「一個符號 = 多少」，最後才畫版面。順序反了就會開始騙數字。
- 每一列都寫鑰匙。多寫一行字，換讀者不用猜。
- 有餘數就講。這是這套語言的骨氣。
- 手機改欄數，不改符號大小。
- 圖旁邊永遠附一份可選取的表或文字（也是 noscript 備援）。
- 顏色不夠用的時候，重新分類，不要加第七罐墨。

**Don't**

- 不要 AI 腔：紫藍漸層 hero、置中大標＋兩顆按鈕＋三張圓角卡片、`rounded-2xl` 加模糊陰影、emoji 當 icon、Lorem ipsum、「EST. 19xx」徽章。
- 不要用面積或長度編碼數量（長條圖、圓餅圖、氣泡圖一律不是本風格）。
- 不要把符號縮放、旋轉、加透視、加陰影、疊半透明。
- 不要加座標軸、格線、刻度、tooltip 才看得到的數字。
- 不要為了版面平衡而調整資料的表現長度。
- 不要用 `ease` 系列曲線，也不要讓任何東西回彈。
- 不要在符號上加漸層假金屬、假立體、假紙質。
- 不要把跑馬燈當動效——這塊板是釘住不動的。

---

## 十一、頁面骨架範例（可直接使用）

```html
<!DOCTYPE html>
<html lang="zh-Hant">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>…</title>
<link href="https://fonts.googleapis.com/css2?family=Jost:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
:root{--karton:#CFC9B6;--blatt:#E3DECD;--schwarz:#1A1916;--zinnober:#C8361C;
      --blau:#1D5A86;--braun:#7B4A22;--gruen:#3D6A38;--ocker:#D6A121}
*{box-sizing:border-box;margin:0;padding:0}
body{background:var(--karton);color:var(--schwarz);font-family:'Jost',system-ui,sans-serif;
     font-variant-numeric:tabular-nums lining-nums;padding:22px 18px}
.blatt{max-width:1180px;margin:0 auto;background:var(--blatt);border:2px solid var(--schwarz)}
.kopfband{display:flex;align-items:flex-end;gap:30px;padding:14px 20px;border-bottom:2px solid var(--schwarz)}
.rumpf{display:grid;grid-template-columns:186px 1fr}
.reihenkopf{border-right:2px solid var(--schwarz)}
main{padding:20px}
.lab{display:inline-block;font-size:11px;letter-spacing:.2em;text-transform:uppercase;
     font-weight:600;color:var(--zinnober);margin-bottom:6px}
.brett{border-top:2px solid var(--schwarz)}
.zeile{display:grid;grid-template-columns:196px 1fr 84px;border-bottom:2px solid var(--schwarz);
       animation-composition:add}
.zeile .kopf{padding:10px 12px 10px 0;display:grid;grid-template-columns:30px 1fr;gap:9px}
.zeile .feld{padding:10px 10px 10px 0;min-width:0}
.zeile .feld svg{display:block;width:100%;height:auto}
.zeile .wert{padding:10px 0;text-align:right;font-size:17px;font-weight:600}
.schluessel{display:block;font-size:11.5px;opacity:.78}
.rest{display:block;font-size:11.5px;color:var(--zinnober);font-weight:600}
@media (max-width:880px){.rumpf{grid-template-columns:1fr}
  .zeile{grid-template-columns:1fr 84px}.zeile .feld{grid-column:1/-1}}
</style>
</head>
<body>
<svg aria-hidden="true" style="position:absolute;width:0;height:0;overflow:hidden"><defs>
  <symbol id="z-mensch" viewBox="0 0 22 26"><!-- 符號本體 --></symbol>
  <pattern id="p-mensch-schwarz" patternUnits="userSpaceOnUse" width="24" height="26">
    <g fill="#1A1916"><!-- 同一組路徑 --></g>
  </pattern>
</defs></svg>

<div class="blatt">
  <header class="kopfband">…Logo…　…出處與日期…　…MASSSTAB…</header>
  <div class="rumpf">
    <nav class="reihenkopf">…行首欄…</nav>
    <main>
      <p class="lab">TAFEL 1 · …</p>
      <div class="brett">
        <div class="zeile" data-q="789" data-per="25" role="group"
             aria-label="社員：789 人。1 個符號 = 25 人。餘 14 人。" tabindex="0">
          <div class="kopf">
            <svg viewBox="0 0 22 26" aria-hidden="true"><use href="#z-mensch"/></svg>
            <div><b>社員</b>
              <span class="schluessel">1 Zeichen = 25 Mitglieder</span>
              <span class="rest">Rest 14 Mitglieder</span></div>
          </div>
          <div class="feld"><!-- feld(789,25,…) 產出的 svg --></div>
          <div class="wert">789<small>Mitglieder</small></div>
        </div>
      </div>
      <table>…同一份資料的逐字稿…</table>
    </main>
  </div>
  <footer>…</footer>
</div>
</body>
</html>
```

---

## 十二、技術實作與相容性

本站的三項核心技術、查證來源、fallback 與實測值。

### 12.1 SVG `<pattern patternUnits="userSpaceOnUse">`（A 渲染層）

**承載**：特徵 1 與特徵 4。一個符號只定義一次，被「數量寬度」的矩形切斷地平鋪；同一組磚同時服務全站每一塊板、每一列、每一個尺度。

**支援現況**：`<pattern>` 是 SVG 1.1 元素，所有現代瀏覽器完整支援。

**必須注意的一個陷阱（查證：MDN `patternUnits` / `patternContentUnits`）**：這兩個屬性的預設值**方向相反**——`patternUnits` 預設 `objectBoundingBox`，`patternContentUnits` 預設 `userSpaceOnUse`。如果只寫 `width="24" height="26"` 而不加 `patternUnits="userSpaceOnUse"`，24 與 26 會被當成「填充形狀外框的 24 倍與 26 倍」，磚會大到看不見。本風格**一定要顯式寫 `patternUnits="userSpaceOnUse"`**，因為我們要的正是「磚的大小與被填充的形狀無關」——形狀變長只是多鋪幾塊磚，而這就是特徵 1 的物理實現。
　查證來源：MDN `SVG/Reference/Attribute/patternUnits`、`patternContentUnits`、`SVG/Reference/Element/pattern`。

**跨 `<svg>` 根引用**：本站把所有 `<pattern>` 放在文件開頭一個隱藏的 `<svg>` 裡，其他 `<svg>` 用 `fill="url(#p-…)"` 指過去。這是文件層級的 id 參照，Chromium／WebKit／Gecko 皆可。隱藏容器**必須用 `position:absolute;width:0;height:0;overflow:hidden`，不可以用 `display:none`**——後者在部分引擎會讓 paint server 失效。

**磚的相位**：磚的原點跟著 `<rect>` 的座標系，不跟著 `<rect>` 自己。所以每一列的 `<rect>` 都從 `x="0"` 開始，符號才會在所有列之間對齊（特徵 4）。若某列需要縮排，用外層 `<g transform>` 位移，不要改 `rect` 的 `x`。

**分數磚的邊界**：本站一格 24，符號畫在 `x 0.8–21.2`。因此小於 `0.033` 的餘數落在磚的左邊界留白裡，會顯示成空白。本站的處理是：**餘數一律另外用文字寫在行首**（特徵 5），所以即使圖上看不見，資訊也不會掉。這是「圖不可靠時由字兜底」的具體做法，不是瑕疵掩飾。

### 12.2 CSS `animation-composition: add`（B 動效與時間軸層）

**承載**：同一個 `.zeile` 同時承受兩種來源不同的動——重列造成的水平位移（`nachsetzen`）與指認造成的垂直抬起（`heben`）。兩條 `@keyframes` 都寫 `transform`；沒有 `animation-composition: add` 時，後宣告的那一條會**整個取代**前一條，列會在重列途中被 hover 打斷而彈跳。加上 `add` 之後兩者相加，兩個動作互不干涉。

**支援現況（查證：MDN `CSS/animation-composition` 與 caniuse `mdn-css_properties_animation-composition`）**：Baseline **widely available**，自 **2023 年 7 月**起在三大引擎可用（Chrome 112、Safari 16、Firefox 115），MDN 標示為「has a consistent history of support in each of the Baseline browsers for at least 2.5 years」。

**fallback（已實作，非理論）**：

```css
@supports not (animation-composition:add){
  .zeile:hover{ animation:none }                      /* 不讓它取代重列 */
  .zeile:hover .feld{ transform:translateY(-2px) }    /* 抬起改由內層元素承擔 */
  .zeile.setzen .feld{ animation:nachsetzen 220ms linear }
}
```

降級後兩個位移分給父子兩層元素，視覺結果幾乎相同，資訊零損失。

### 12.3 最大餘數法整數配額（E 資料與生成層）

**承載**：配給板的「公平基準線」，以及首創「餘數可追究」的判定基礎。

把 24 箱按社員數分給六個取貨點，是一個整數配額問題。本站用 **Hare quota／largest remainder（最大餘數法）**：先算理論配額 `社員ᵢ ÷ 總社員 × 箱數`，各取整數部分，剩下的箱按小數部分由大到小發完。

```js
function hare(werte, sitze){
  const tot = werte.reduce((a,b)=>a+b,0);
  const q = werte.map(x=>x/tot*sitze);
  const f = q.map(Math.floor);
  const rest = sitze - f.reduce((a,b)=>a+b,0);
  q.map((x,i)=>[x-f[i], i]).sort((a,b)=>b[0]-a[0])
   .slice(0, rest).forEach(([,i])=>f[i]++);
  return f;
}
// hare([184,97,241,58,133,76], 24) → [6,3,7,2,4,2]（合計 24，決定性）
```

三個實作注意事項：**(1) 決定性**——`sort` 必須在平手時有穩定的次序（本站資料無平手；若有，以索引小者優先，不可用隨機）。**(2) 判定用未取整的數字**——最低保障與人均差都用 `zugeteiltᵢ × 20 ÷ 社員ᵢ` 的真值算，不用畫出來的符號數。**(3) 圖與帳的落差要回報**——結算會計算「目前尺度下，六列朱紅界線各落在符號中間的部分合計是幾個人」，並明說他們有麵包但圖上沒有完整符號代表他們。

### 12.4 效能預算（實測）

| 頁 | 原始 | gzip | `<rect>` 數 | 元素總數 |
|---|---|---|---|---|
| index.html | 46.8 KB | 12.9 KB | 41 | 447 |
| brot.html | 45.2 KB | 11.9 KB | 44 | 488 |
| verteilung.html | 43.8 KB | 12.9 KB | 30 | 408 |
| genossenschaft.html | 40.2 KB | 11.9 KB | 28 | 393 |

單頁上限 350 KB，最大一頁 46.8 KB（13 %）。外部資源只有 Google Fonts 兩個字族，**零外部圖片、零外部音檔、零 JS 函式庫**。

**首屏 JS**：只做三件事——爐次帶算一次時刻（純算術，無 DOM 量測）、`document.body.classList.add('auf')`、視窗寬 ≤560 px 時重算一次欄數。全程沒有 `getBoundingClientRect()`、沒有讀 `offsetWidth` 之後又寫樣式的循環，因此沒有 layout thrashing。`resize` 以 160 ms debounce。

**動畫成本**：全部動的東西只有 `transform`（合成層）與 `clip-path`（GPU 可加速的 inset），沒有任何動 `width`／`left`／`top` 的動畫。重列時改寫的是 `innerHTML`（約 8 個小 svg），不是逐幀。

**降級路徑總表**

| 情況 | 行為 |
|---|---|
| 無 JavaScript | 尺度桿隱藏並標示「mittel（固定）」；所有板以 mittel 尺度靜態輸出；配給板顯示最大餘數法的靜態結果表 |
| `prefers-reduced-motion` | 刀口不掃、不揭開、不抬起；抬起改為行首的朱色標記；爐次帶仍更新（跳變不補間） |
| 不支援 `animation-composition` | 兩個位移分給父子兩層元素（見 12.2） |
| 不支援 Google Fonts | 退到 `system-ui` → `Noto Sans TC`；版面全部用相對單位，不依賴字寬 |
| 螢幕閱讀器 | 每一列 `role="group"` + `aria-label` 把「標題：數值 單位。1 個符號 = N 單位。餘 X。」念出來；符號 svg 一律 `aria-hidden="true"`；每塊板附同資料的 `<table>` |

---

## 十三、外部參照

- Otto Neurath，《International Picture Language》（1936）、《Modern Man in the Making》（1939）
- Otto Neurath / Gerd Arntz，《Gesellschaft und Wirtschaft》圖集，Bibliographisches Institut Leipzig，1930（100 張板，本方法的定本）
- Gesellschafts- und Wirtschaftsmuseum in Wien，1925 年成立；1934 年二月維也納內戰後關閉
- Gerd Arntz，1928 年起任職該館，刻製約 4000 個符號
- Marie Reidemeister（Marie Neurath），transformer 一職的命名者與實踐者；1942 年於牛津共同成立 Isotype Institute
- University of Reading「Isotype Revisited」研究計畫（Isotype 檔案的主要藏處）
- 對照參考：Futura（Paul Renner, 1927）、維也納市政住宅計畫（Gemeindebau）的公共資訊傳統

**與鄰近流派的分界**（做這個風格時最容易越界的四條線）：

- 與 **烏爾姆造形學院／Otl Aicher 導向系統** 的分界：那是「一個符號代表一件事」的識別系統，符號不計數、可以任意縮放；本風格的符號**必須可數**，尺寸是固定的。
- 與 **瑞士國際主義** 的分界：那的版面來自網格與字級階層，圖是插圖；本風格的版面來自資料長度，圖是主體，而且沒有網格線。
- 與 **荷蘭風格派 De Stijl** 的分界：那的黑線是構圖元素、顏色是純粹形式；本風格的黑線只有分隔功能，顏色綁死語意。
- 與一般 **infographic／dashboard** 的分界：那用長條、圓餅、折線、量表；本風格**只有一種圖表**，就是重複符號的列，而且它拒絕四捨五入。
