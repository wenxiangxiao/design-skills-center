---
name: transcript-steno
description: A verbatim-record aesthetic built from stenographic strokes, dotted transcript rules and ink-blue duotone, where every line of dialogue becomes the artwork itself.
---

# 筆錄速記風 Transcript-Steno

## 一、設計哲學

這個風格來自一個具體的物件：**逐字筆錄**。不是法院判決書那種排版精美的成品，是速記員在現場一邊聽一邊寫、事後才謄成表格的那份東西。它有三個性質，整套視覺語言都從這裡長出來：

1. **記錄先於呈現。** 筆錄不是設計出來的，是被記下來的。所以版面的第一原則是「欄位」而不是「構圖」：誰講的（發言人欄）／講了什麼（內容欄），兩欄之間一條點線。所有內容——沿革、規則、名冊、結果——都可以被塞回這個兩欄結構。
2. **空白是內容。** 筆錄裡沒寫的東西和寫了的東西一樣有意義。本風格保留一個專用的 `.gap` 元件（斜線網底＋虛線框），用來表示「此處依格式應有記載，但當日沒有」。它不是佔位圖，是一種陳述。
3. **字跡是圖像。** 速記符號不可讀，但有規則。本風格**不使用任何傳統插圖**——所有圖像都是把一句話餵給速記引擎後長出來的連筆線。換句話說，圖像的內容由文字決定，設計者不「畫」圖，只決定要記下哪句話。

配色是深靛藍的公務空間 × 米黃的紙。紙只出現在「文件」上，不當背景；深靛是房間，米黃是桌上那張紙。整個風格的情緒是**克制、耐煩、不粉飾**——它處理的是有人真的在生氣的場合。

適用產業：任何以「記錄、程序、見證、鑑定、審查」為核心的服務（調解、公證、鑑價、稽核、口述歷史、事故調查、醫療評議）。也適用於任何想把「過程」而非「成果」當成主體的品牌。

## 二、色彩系統

| 色票 | 名稱 | 用途 | 全站比例 |
|---|---|---|---|
| `#131C33` | 靛夜 ink | 頁面底色、房間 | ~46% |
| `#1B2745` | 靛板 panel | 面板、卡片、按鈕底 | ~14% |
| `#16203A` | 靛板深 panel2 | 刊頭條、頁尾、次級容器 | ~10% |
| `#33427A` | 靛線 rule | 所有 1px 分隔線、邊框、未選中狀態 | ~4% |
| `#DCE2F2` | 紙白字 fg | 內文、標題、速記線 | ~12% |
| `#8C9AC4` | 靛灰 mut | 次要文字、標籤、說明 | ~6% |
| `#7C8CB8` | 靛藍二 blue2 | 行為線索文字、次級速記線 | ~2% |
| `#C8452F` | 校紅 red | **僅限有語意處**：現用頁標記、圈點記號、關鍵數字、主要按鈕 | ~4% |
| `#9E3121` | 校紅暗 | 主要按鈕 hover | <1% |
| `#E8E2D2` / `#14161F` | 紙 / 紙上墨 | **只用於文件元件**（筆錄、調解書），不得當頁面底色 | ~2% |

**雙色域（duotone）鐵則**：全站只有兩個色相——靛藍 H≈223 與校紅 H≈10。米黃紙是中性面，不算第三色相。**不得引入綠色、紫色、任何漸層。** 唯一例外是結果狀態的 `#8FBF8A`（成立）用於清單標示，面積必須 <0.5%。

校紅是稀缺資源。判斷方法：這個紅是不是在代表「有人做了標記」？是（現用頁、圈點、判定結果、行動按鈕）就用；只是想強調就不用。

## 三、字體系統

- 中文與主要內文：**Noto Serif TC**（Google Fonts），400 / 500 / 700 / 900。
- 編號、時間、案號、標籤、數字：**Space Mono**，400 / 700，`letter-spacing` 0.04–0.28em。

**為什麼是襯線體**：公文與筆錄在台灣是明體傳統。用無襯線會立刻變成一般 SaaS。內文行高必須放到 `1.85`——筆錄是拿來被人逐行看的，不是掃描的。

字級 scale（rem 基準 16px）：

| 用途 | 字級 | 字重 | 行高 | 字距 |
|---|---|---|---|---|
| 頁面大標 h1 | `clamp(28px,4.6vw,44px)` | 700 | 1.35 | .02em |
| 區塊標題 h2 | 20–23px | 700 | 1.35 | .02em |
| 卡片標題 h3 | 16–17px | 700 | 1.4 | .05em |
| 內文 | 16px | 400 | 1.85 | .01em |
| 筆錄內容欄 | 15.4px | 400 | 1.8 | 0 |
| 說明／次要 | 13.2–14.4px | 400 | 1.75–1.95 | 0 |
| 發言人欄（mono） | 11px | 400 | — | .06em |
| 標籤 `.lbl`（mono） | 10px | 400 | — | .2em |
| 刊頭英文（mono） | 10px | 400 | — | .28em |

大字距的 mono 小標（`.lbl`）是本風格的節奏器：每一個區塊上方都先放一行 10px／0.2em 的英數標籤，再放中文標題。這一組合承擔了「這是公務文件」的全部暗示，不需要任何邊框或底色。

## 四、版面與網格

- 容器 `max-width: 1180px`；桌機 `padding-right: 96px` 為右側卷標導覽讓位。
- **主結構是 1.35–1.6fr : 1fr 的不對稱兩欄**，永遠不用 1:1。左欄是「正在發生的事」（文件、逐字），右欄是「旁邊的東西」（觀察、速記卷、名冊）。≤900px 直接堆疊。
- **零圓角。** 全站 `border-radius: 0`，沒有例外。**零陰影。** 深度靠 1px 線與底色階（ink → panel2 → panel）表現。
- 分隔線只有兩種：`1px solid var(--rule)`（區塊內）與 `2px solid var(--rule)`（區塊間、刊頭／頁尾）。
- 文件內的行分隔一律 `1px dotted #C3B99C`——點線是紙上的，實線是螢幕上的，兩者不可互換。
- 留白規則：區塊之間 34–44px，區塊內 14–22px，頁尾之前 70px。密度屬**中等偏密**：資訊要看起來像被登記過，不能像海報。
- 兩欄筆錄的網格是 `grid-template-columns: 78px 1fr; gap: 0 16px`，發言人欄 `padding-top: 5px` 讓 mono 小字與襯線內文的第一行視覺對齊。

## 五、元件配方

### 5.1 刊頭條 strip
`background: panel2; border-bottom: 2px solid rule`。左為 logo（速記線＋紅圈＋機構名／英文全稱兩行），右為 `margin-left:auto` 的 mono 地址時間區塊。**不是導覽列**——刊頭只有識別與聯絡資訊，導覽另有其物。

### 5.2 卷標導覽 docket-tab（本風格的識別性導覽）
桌機：`position: fixed; right: 0; top: 104px`，垂直堆疊四片卷宗側標。每片 `writing-mode: vertical-rl; text-orientation: upright`，上方一行 mono 卷號（卷一…卷四）。

```css
.docket a{border:1px solid var(--rule);border-right:0;background:var(--panel);
  padding:16px 7px;letter-spacing:.22em;transform:translateX(0);
  transition:transform .22s cubic-bezier(.22,.7,.3,1)}
.docket a:hover{transform:translateX(-10px)}
.docket a[aria-current="page"]{transform:translateX(-18px);
  background:var(--paper);color:var(--paper-ink);border-color:var(--paper)}
.docket a[aria-current="page"]::after{content:"";position:absolute;left:-4px;top:0;bottom:0;
  width:4px;background:var(--red)}
```

語意：四個卷宗永遠都在檔案架上，現用的那一本被**抽出來**（位移 18px＋翻成紙色＋紅色書口）。沒有展開／收合狀態。≤900px 攤平為底部四格橫列並取消位移，頁尾另備完整連結保底。

### 5.3 文件 paper
```css
.paper{background:#E8E2D2;color:#14161F;padding:30px;border-left:5px solid #C8452F;position:relative}
.paper .stamp{position:absolute;right:18px;top:16px;font-family:"Space Mono";font-size:10px;
  letter-spacing:.16em;color:#8A7F63}
```
左邊那道 5px 校紅是「這份文件被歸檔過」的記號，每一份 paper 都要有。右上角 stamp 放案號或文件種類。

### 5.4 筆錄行 tline
```css
.tline{display:grid;grid-template-columns:78px 1fr;gap:0 16px;padding:7px 0;
  border-bottom:1px dotted #C3B99C;align-items:start}
.tline:last-child{border-bottom:0}
.tline .who{font-family:"Space Mono";font-size:11px;color:#6C6248;padding-top:5px}
.tline .say.dir{color:#6C6248;font-size:14px}   /* 記載／舞台指示 */
```
`.dir` 用於非發言的記載（「兩造均未再發言。」），色彩降一階、字級降 1.4px。這條分工不可對調。

### 5.5 空白欄 gap
```css
.gap{background:repeating-linear-gradient(-45deg,#E8E2D2 0 7px,#DCD3BC 7px 14px);
  border:1px dashed #A79877;padding:14px 16px;color:#5E553E;
  font-family:"Space Mono";font-size:12.5px;letter-spacing:.05em;line-height:1.9}
```
內文格式固定為兩行：第一行 `〔　此　處　空　白　〕`（全形空格撐開），第二行說明為什麼空白。

### 5.6 按鈕
```css
.btn{border:1px solid var(--rule);background:transparent;color:var(--fg);padding:9px 16px;
  font-family:"Noto Serif TC",serif;font-size:14.5px;letter-spacing:.06em;
  transition:background .18s,border-color .18s,color .18s}
.btn:hover:not(:disabled){background:var(--red);border-color:var(--red);color:#fff}
.btn.pri{background:var(--red);border-color:var(--red);color:#fff}
```
**按鈕用襯線體**，不用 mono、不用無襯線。沒有圓角、沒有陰影、沒有位移動畫。

### 5.7 發言選項 say-btn
左側 3px 靛線豎條，hover 轉校紅；上方一行 mono 小標記錄「這句話屬於哪一類、對誰說」。整塊左對齊、`line-height:1.75`，讓它讀起來像一句話而不是一個選項。

### 5.8 表單元件
`select` / `input[type=text]`：`background: panel; border: 1px solid rule; padding: 8px 10px`，襯線體。
`input[type=range]`：軌道 3px 靛線，滑塊 **16×22px 的校紅矩形**（`border-radius:0`）——像一枚被推上尺的標記。
`checkbox` 用 `accent-color:#C8452F`，外面包一格 1px 邊框的 label；勾選時文字由 mut 轉 fg，邊框不變。

### 5.9 頁尾
`border-top: 2px solid rule; background: panel2`，`1.5fr 1fr 1fr` 三欄：機構聯絡資訊（含真實可信的地址、電話、營業時間、承辦人姓名）／導覽全連結／檔案連結。底部再壓一條 `.disclaim`：mono 11.5px，載明虛構聲明。

## 六、動效規則

本風格的動效**極少且全部是功能性的**。沒有進場動畫、沒有捲動視差、沒有數字滾動、沒有跑馬燈。

| 觸發 | 對象 | 變化 | duration | easing |
|---|---|---|---|---|
| hover / focus | 卷標導覽 | `translateX(-10px)` | 220ms | `cubic-bezier(.22,.7,.3,1)` |
| 目前頁面 | 卷標導覽 | `translateX(-18px)` ＋ 換成紙色 | 220ms | 同上 |
| hover | 按鈕、say-btn、卡片邊框 | 邊框／底色轉校紅 | 180ms | ease |
| 新增筆錄行 | `.tline.new` | `opacity 0→1` ＋ `translateY(-4px)→0` | 450ms | ease-out |
| 卷宗抽出 | — | 無位移動畫以外的任何效果 | — | — |

`.tline.new` 的 450ms 是刻意偏慢的：它模擬「被寫下來」而不是「被載入」。命名為 `@keyframes ink`。

`prefers-reduced-motion: reduce` 時以 `*{animation:none!important;transition:none!important}` 全部關閉；卷標的現用狀態仍以紙色與紅書口區分，資訊零損失。

`:focus-visible{outline:2px solid var(--red);outline-offset:2px}` 為全站唯一的焦點樣式。

## 七、插畫與圖像風格：速記符號構圖 stenograph-stroke

**本風格禁止使用任何傳統插圖、圖示字型、emoji 或裝飾圖形。** 頁面上每一張圖都是一句話被速記引擎轉譯後的連筆線。

引擎規格（可直接移植）：

1. 輸入一段文字，先剝除全形／半形標點與空白。
2. 逐字以 FNV-1a 雜湊 `fnv(char + "|" + index)` 取得 32 位整數 `h`。同一句話恆得同一條線。
3. `k = h % 8` 決定筆畫原語，`tone = (h>>>3)%3 - 1` 決定高低位，`len = U*(0.72 + ((h>>>6)%5)*0.17)` 決定長度（`U` 為單位，預設 15）。
4. 八種原語（筆位連續，前一筆終點即後一筆起點）：
   - `0` 上行斜線　`1` 下行斜線　`2` 水平線
   - `3` 上弧（二次貝茲）　`4` 下弧
   - `5` 圈記（不畫線，登記一枚圓形記號後跳筆）
   - `6` 鉤（兩段短折線）　`7` 環（三次貝茲的回頭大彎）
5. 縱向漂移箝制：`|y| > 1.5U` 時強制反向，使線條維持在基線帶內。
6. 圈記 `5` 以獨立 `<circle fill="none" stroke="校紅">` 繪出——**圈永遠是紅的，線永遠是靛白的**，這是本技法唯一的雙色分工，不可對調。
7. viewBox 由實際邊界加 0.9U 邊距求出，`preserveAspectRatio="xMinYMid meet"`，`aria-hidden="true"`。

用法規範：

- 需要「插圖」的地方 → 放一句與該處內容有關的話的速記線（`unit:17–19, px:60–64`）。
- 需要「條目縮圖」的地方 → 放該條目標題＋編號的速記線（`unit:11, px:30, stroke:#7C8CB8`）。
- 需要「簽名」的地方 → 放當事人姓名＋同意文句的速記線，`stroke` 改為紙上墨 `#14161F`。
- **絕不**用它產生抽象裝飾。每一條線都必須對應一句在頁面上讀得到的話，否則它就退化成生成藝術。

與相近技法的區別：它不是描物件外形的細線線描（那是裝飾），不是模擬留下的軌跡（那是時間積分），也不是可讀的字骨合成（那產生的是字）。它是**語音的編碼**——不可讀，但有規則，而且規則寫在頁面上。

## 八、Logo 與 Favicon

**Logo**：一條速記連筆（三段：上行斜線→上弧→下弧→鉤）＋ 右側一枚校紅圈記 ＋ 下方一條 2.4px 靛線基線，右接兩行文字（機構中文名 Noto Serif TC 700／英文全稱 Space Mono 8.4px 字距 2.6）。線寬 4.2px、`stroke-linecap: round`、`stroke-linejoin: round`。整體 240×64。

設計要點：**紅圈必須與連筆線分離**，中間留一個字身的空隙。它是「這裡被標記過」的記號，不是筆畫的一部分。

**Favicon**：32×32，靛夜底滿版，同一組連筆縮到 2.2px 線寬置左，紅圈 r=3.2 置右上。以 inline SVG data URI 寫在 `<head>`，**不得使用外部檔案**。

```html
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%23131C33'/%3E%3Cpath d='M5 21 L11 11 Q14 6 17 12 L21 20' fill='none' stroke='%23DCE2F2' stroke-width='2.2' stroke-linecap='round'/%3E%3Ccircle cx='24' cy='12' r='3.2' fill='none' stroke='%23C8452F' stroke-width='2.2'/%3E%3C/svg%3E">
```

## 九、文案語氣

- **不推銷。** 這是一個機關／專業服務，不是品牌。不寫「我們致力於」「打造」「一站式」。
- **敢寫負面數字。** 不成立率 31.4%、卡在金額的只有 39%——把不好看的數字放在最顯眼的地方，這是本風格建立可信度的唯一手段。
- **句子短，主詞明確。** 「先讓人把話講完。」而不是「我們相信充分的溝通是化解爭議的第一步。」
- **具體到可以被查證。** 地址要有門牌與樓層、電話要有區碼、時間要有星期與時段、人要有姓名與職稱與年資。
- **把規則全部公開。** 本風格的一個核心動作是設一整頁把介面背後的判定規則寫成白話（包含它會拒絕你的時機與理由）。藏起來的規則會讓使用者覺得被擺弄。

## 十、Do & Don't

**Do**
- 全站零圓角、零陰影、只用 1px／2px 實線與點線分格。
- 紙色只出現在文件元件上，其餘一律靛藍階。
- 每個區塊先放 mono 大字距小標，再放中文標題。
- 每一張圖都是一句話的速記線，並在旁邊附上那句話。
- 把最不利的統計數字寫在最顯眼的位置。

**Don't**
- 不用紫藍漸層、不用任何漸層當背景。
- 不用「置中大標＋副標＋兩顆按鈕＋三張圓角卡片」。
- 不用 emoji 或圖示字型當 icon。
- 不用跑馬燈／ticker——本風格的節奏來自點線與欄位，不是捲動。
- 不用 Lorem ipsum、不用「在當今快節奏的世界」這類 AI 腔。
- 不把速記線當抽象裝飾亂鋪；不把紅圈畫成靛色、也不把連筆線畫成紅色。
- 不用第三個色相。
- 不用系統字體堆疊（`font-family: sans-serif` 直接違反本風格）。

## 十一、頁面骨架範例

```html
<!DOCTYPE html>
<html lang="zh-Hant">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>頁名｜機構名</title>
<link rel="icon" href="data:image/svg+xml,…">
<link href="https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@400;500;700;900&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
<style>
:root{--ink:#131C33;--panel:#1B2745;--panel2:#16203A;--rule:#33427A;
 --fg:#DCE2F2;--mut:#8C9AC4;--red:#C8452F;--paper:#E8E2D2;--paper-ink:#14161F}
body{margin:0;background:var(--ink);color:var(--fg);
 font-family:"Noto Serif TC",serif;font-size:16px;line-height:1.85}
</style>
</head>
<body>

<header class="strip"><div class="in">
  <a class="brandmark" href="index.html"><svg …>…</svg>
    <span><span class="nm">機構名</span><span class="en">INSTITUTION NAME</span></span></a>
  <div class="stripmeta">地址<br>營業時間｜電話</div>
</div></header>

<nav class="docket" aria-label="卷宗導覽">
  <a href="index.html" aria-current="page"><span class="no">卷一</span>第一頁</a>
  <a href="b.html"><span class="no">卷二</span>第二頁</a>
  <a href="c.html"><span class="no">卷三</span>第三頁</a>
  <a href="d.html"><span class="no">卷四</span>第四頁</a>
</nav>

<main class="shell">
  <div class="phead">
    <div class="kick">MONO 大字距小標</div>
    <h1>頁面標題</h1>
    <p class="sub">一段不推銷的說明，兩到三句，帶一個具體數字。</p>
  </div>

  <article class="paper">
    <div class="stamp">案號或文件種類</div>
    <h2>文件標題</h2>
    <div class="tline"><div class="who">發言人</div><div class="say">內容。</div></div>
    <div class="tline"><div class="who">記載</div><div class="say dir">非發言的記載。</div></div>
    <div class="gap">〔　此　處　空　白　〕<br>依格式應有記載，當日未有，故未記載。</div>
  </article>

  <section class="panel">
    <span class="lbl">SECTION LABEL</span>
    <h3>小節標題</h3>
    <div id="steno-slot"></div>   <!-- 由速記引擎填入 -->
  </section>
</main>

<footer><div class="in">…三欄…</div>
  <div class="disclaim">虛構聲明。</div>
</footer>

<script>
/* 速記引擎：見第七章規格 */
function fnv(s){var h=2166136261>>>0;for(var i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)>>>0;}return h>>>0;}
function steno(text,opt){ /* 八原語連筆，回傳 {d,marks,x0,y0,w,h} */ }
function stenoSVG(text,opt){ /* 包成 <svg><path/><circle/></svg> */ }
document.getElementById("steno-slot").innerHTML=stenoSVG("要被記下來的那一句話",{unit:17,px:60});
</script>
</body>
</html>
```

---

*風格代號 `transcript-steno`。首次實作：`sites/xiding-mediation`（溪頂鄉調解委員會）。*
