---
name: soapfilm-interference
description: A two-tone soap-water palette where every chromatic colour is computed from thin-film interference, paired with cellular foam geometry as the only illustration engine.
---

# 皂膜干涉風 Soapfilm-Interference

> 一套「顏色不是選出來的，是算出來的」的視覺語言。底色永遠只有兩個——皂水青灰與墨青；所有彩色都必須是某一個膜厚 h 經 I(λ)=sin²(2πnh/λ) 算出來的結果。畫面上的所有圖像由同一支胞元（Laguerre）引擎產生，沒有一張是描出來的。

---

## 一、設計哲學

### 1.1 三條不可讓步的規則

1. **彩色是被算出來的，不是被挑出來的。**
   本風格的介面只有兩個色：皂水青灰底 `#DCE9E4` 與墨青 `#12292B`。任何一抹彩色出現在畫面上時，它必須能回答「這是哪一個膜厚？」。彩色不能拿來當按鈕色、強調色、hover 色、標籤色。它只能屬於「膜」。
2. **圖是解出來的，不是畫的。**
   Logo、favicon、圖鑑、章節圖示、表單回執印記——全部由同一支胞元引擎在不同輸入下解出。你不能為了好看多畫一條線；要改圖，只能改輸入。
3. **系統沒有完成狀態。**
   本風格服務的是「會持續變少的東西」。不要設計「達成／通關／完成」的畫面，也不要給總分或星等。要給的是紀錄：它活了多久、最多長到幾邊、最後被誰接手。

### 1.2 移植到別的產業

本風格與「泡沫」沒有綁定。它綁定的是三件事的組合：**兩色底 + 由物理量算出的彩色 + 由規則解出的圖像**。若要換產業，先回答：

- 這個產業裡「顏色由什麼物理量決定」？（膜厚、溫度、pH、波長、應力、含水率…）
- 這個產業裡「圖形由什麼規則生成」？（胞元、晶界、堆疊、分割、生長…）
- 這個產業裡「什麼東西只會減少」？（庫存、時間、耐久度、樣本、記憶…）

三題都答得出來，本風格就成立。答不出來就別用——沒有那三題，本風格會退化成一個「淺綠色的極簡網站」。

---

## 二、色彩系統

### 2.1 兩色底（介面唯一可用的色）

| 名稱 | Hex | 用途 | 面積比 |
|---|---|---|---|
| 皂水青灰 soap | `#DCE9E4` | 全站頁面地色、卡片外底、logo 底 | 約 44% |
| 面板 panel | `#EDF4F1` | 卡片、表單、圖鑑格內底 | 約 16% |
| 槽底 deep | `#C6DAD3` | canvas 底、胞元最深的一階 | 約 8% |
| 墨青 ink | `#12292B` | 全部文字、全部線條、實心導覽格、按鈕底 | 約 22% |
| 墨青次 ink2 | `#3A5654` | 次要文字、mono 小標、說明 | 約 6% |
| 中調 mid | `#8FB2B0` | 表格細線、次級分隔（1.5px） | 約 4% |

**沒有第七個介面色。** 沒有紅色的錯誤色、沒有綠色的成功色。錯誤訊息用墨青文字 + 左緣一條 4px 的干涉粉 `#D8479B`（那是「膜快破了」的顏色，是本語彙裡唯一被允許的隱喻挪用）。

### 2.2 干涉色域（只能由公式產生）

不要把下列色碼當色票用；它們只是公式輸出的取樣點，寫在這裡是為了讓你檢查自己的實作對不對。

```
n = 1.33（皂水折射率）
I(λ) = sin²(2π n h / λ)   λ = 650 / 550 / 450 nm  →  R / G / B
高階洗白：wash = clamp((h−820)/1150, 0, 1)；I ← I + (mean(I) − I)·wash
上螢幕：channel = ink_base + (255 − ink_base) · min(1, I·1.55)
        ink_base = [14, 42, 44]
```

| 膜厚 h | 外觀 | 取樣 |
|---|---|---|
| 4–15 nm | 黑膜（反射幾乎歸零） | `#0E2A2C` |
| 60–120 nm | 灰白過渡 | `#8FA5A6` |
| 150–260 nm | 一階金黃／洋紅 | `#EBA92B` / `#D8479B` |
| 280–420 nm | 一階青／藍 | `#3FC2D6` |
| 500–800 nm | 二階，飽和度掉一階 | — |
| > 900 nm | 洗白（一般人說的「白泡沫」） | `#F3F7F5` |

**膜厚怎麼來**：`h = H0 · (1−dry)^2.6 · (0.40 + 0.60·yn) + 4`，`H0 = 2600 nm`，`dry ∈ [0,1]` 為乾度，`yn ∈ [0,1]` 為畫面上的垂直位置（0 = 上緣）。重力使上方先變薄，所以同一張畫面上緣的顏色恆比下緣「更後面」。

### 2.3 胞元填色階（介面色，非干涉色）

胞元的填色只表達「邊數」，只能在皂水青灰與白之間走，**不得上彩色**：

```
n = 3 → #7FAAA2   n = 6 → #CFE3DC   n = 9 → #EEF6F1   n ≥ 14 → #FBFDFB
（12 階線性內插，index = clamp(n − 3, 0, 11)）
```

分工不可對調：**填色說「它是誰」，壁的顏色說「它還剩多久」。**

---

## 三、字體系統

Google Fonts 三支，不得再加第四支：

```html
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@500;700;800&family=IBM+Plex+Mono:wght@400;500&family=Noto+Sans+TC:wght@400;500;900&display=swap" rel="stylesheet">
```

| 角色 | 字體 | 用法 |
|---|---|---|
| 中文標題 | Noto Sans TC 900 | `letter-spacing:-.03em`（大字必須收緊，這是本風格的字感來源） |
| 中文內文 | Noto Sans TC 400 | `line-height:1.85`、`letter-spacing:.01em` |
| 拉丁展示 | Archivo 800 | 只用大寫，`letter-spacing:.3em`，只出現在館名副標與 spine |
| 讀數／標籤／數字 | IBM Plex Mono 400/500 | 所有數字、所有 `.plate` 小標、所有表格數值欄 |

字級 scale（rem）：

```
h1  clamp(2, 5.6vw, 3.5)   900  lh 1.14  ls −.03em
h2  clamp(1.35, 3vw, 2)    900  lh 1.30  ls −.02em
h3  1.05                   900  lh 1.5
內文 1.0                    400  lh 1.85
lede 1.06                  400  lh 1.85  max-width 34em
.plate  .68  mono  ls .26em  uppercase  ink2
.mono   .82  mono
.small  .86  ink2
```

**硬規則**：中文標題一定 900、一定負字距、一定短（三到六個字最佳）。本風格的標題是「壁」、「六」、「黑膜」、「併」這種一個字兩個字的展品牌名，不是句子。

---

## 四、版面與網格

### 4.1 骨架

```
┌─46px─┬──────────────────────────────────────────┬─126px─┐
│spine │  masthead（品牌 + 右側 mono 館務資訊）        │ csnav │ ← fixed 右上
│直排   ├──────────────────────────────────────────┤       │
│刊記   │  main  max-width 1180px  padding 0 26px  │       │
└──────┴──────────────────────────────────────────┴───────┘
```

- **左緣 46px 直排刊記（spine）**：`position:fixed`，`writing-mode:vertical-rl; transform:rotate(180deg)`，mono `.62rem`，`letter-spacing:.42em`。純裝飾，`aria-hidden="true"`。≤900px 隱藏，`.wrap` 的 `margin-left` 歸零。
- **main 不置中**：`max-width` 有上限但不加 `margin:auto`。整頁靠左，右邊留白。這是本風格不對稱感的來源，不要「修正」它。
- masthead 桌機 `padding-right:168px` 給 csnav 讓位。

### 4.2 分格

- 所有分隔線 **2px 實線墨青**；次級分隔 **1.5px `--mid`**。**沒有圓角，沒有陰影，沒有漸層背景。**
- 區塊分隔用兩種：`.rule`（單條 2px）與 `.rule2`（上下兩條 2px、中間 7px 空氣）。後者用在「換章」。
- 網格一律「上邊框 + 左邊框畫在容器上，右邊框 + 下邊框畫在每一格上」，這樣不會出現雙線。
- 留白：section 之間 `padding-top:34px`，`.rule2` 上下 52px / 30px。密度中等——資訊要密，但每一塊之間要有空氣。

### 4.3 讀數列（readout）

貼在主視覺正下方，`border-top:none` 與主視覺共邊，5 欄（≤760px 折成 2 欄、末欄跨滿）。每格 `b` 為 mono 1.25rem、`span` 為 .66rem ink2。**讀數必須是即時的、可被使用者驗證的**，不要放無法驗證的裝飾數字。

---

## 五、元件配方

### 5.1 導覽：cell-swell 泡格膨脹

```
桌機：position:fixed; right:20px; top:18px; width:126px; border:2px solid ink; padding:7px 7px 5px
      內含 (a) 一枚 98×74 的四胞泡沫 SVG（現用頁那一胞被解得更大、填實墨青）
           (b) 下方 2×2 的文字連結（mono .6rem），現用頁 background:ink; color:soap
≤900px：position:sticky; top:0; width:100%; 隱藏 SVG；ul 改 4 欄橫排；每格 padding:11px
```

**關鍵**：那枚 SVG 不是四個手畫的方塊，是把四個站點當成四個胞、把現用頁的目標面積設為 0.49、其餘 0.17，再用同一支胞元引擎解出來的。所以四頁的圖形彼此不同、且每一頁的圖都是真的「那一胞脹起來、把鄰居擠小」。四胞永遠都在，只是其中一胞脹著。

### 5.2 按鈕

```css
.btn{background:ink;color:soap;border:2px solid ink;padding:9px 20px;letter-spacing:.06em;font-weight:500}
.btn:hover{background:soap;color:ink}          /* 反色，不是變深 */
.btn.gh{background:transparent;color:ink}
.btn.gh:hover{background:ink;color:soap}
```
沒有陰影、沒有位移、沒有圓角。hover 一律「反色」。

### 5.3 chips（互斥選項）

一排 chip 共用一個 1.5px 外框，彼此以 1.5px 分隔，選中者填實墨青。`width:fit-content`。mono .76rem。

### 5.4 滑桿

```css
input[type=range]{-webkit-appearance:none;background:transparent;height:26px}
軌：height:6px;background:ink（方的）
鈕：width:16px;height:26px;background:soap;border:2px solid ink;border-radius:0
```
滑桿下方永遠配一行三段 mono 刻度說明（左端／中段／右端各代表什麼），`.6rem`、`ink2`、`justify-content:space-between`。

### 5.5 卡片與表格

- 卡片 `.card`：`border:2px solid ink; background:panel; padding:18px 20px`。不疊陰影。
- 表格：`th` 為 mono .7rem 大寫、`letter-spacing:.14em`、下框 2px；`td` 下框 1.5px `--mid`；數值欄加 `class="n"` 走 mono。

### 5.6 表單

`label` 一律 mono .7rem 大寫 ink2；`input/select` 2px 墨青框、panel 底、無圓角。錯誤訊息 `.err`：mono .74rem、`border-left:4px solid #D8479B`、`padding-left:8px`。**錯誤訊息要具體說出哪裡不對，不要寫「請正確填寫」。**

### 5.7 footer

上框 2px；三欄 flex（品牌 / 頁面 / 註記），每欄一個 `.plate` 小標 + mono 內容；最後一段 `.disc` 為 .76rem ink2 的虛構聲明。

---

## 六、動效規則

**本風格的動效預算幾乎全部給了主視覺的即時求解。介面本身近乎不動。**

| 對象 | 規則 |
|---|---|
| 主視覺（canvas） | 每一幀重解胞元幾何並重繪。沒有補間、沒有 CSS transition——形狀改變是「解出來的新解」，不是被動畫過去的 |
| hover | 只做反色（背景與前景對調），`transition` 一律不加或 ≤ .12s linear |
| 進場 | **沒有**。不要淡入、不要位移進場、不要 IntersectionObserver 揭示 |
| 數字 | **不做計數動畫**。讀數直接跳到新值，每 0.25 秒更新一次 |
| 跑馬燈 | 禁止 |
| 自動輪播 | 禁止 |
| 聲音 | 本風格不發聲 |

`prefers-reduced-motion: reduce` 時：主視覺**不自動開始**，停在初始解，並顯示一顆「推進 N 秒」按鈕讓使用者逐段推進；同時在控制列顯示一行說明告訴使用者為什麼它沒有在動。介面其餘部分本來就沒有動效，不需額外降級。

分頁不可見（`document.hidden`）時暫停求解迴圈；主視覺尺寸 < 40px 時直接跳過 `fit()`（避免退化解）。

---

## 七、插畫與圖像風格：laguerre-foam 胞元構圖

**全站不得出現任何外部圖片、任何 emoji、任何手繪 icon。** 所有圖像由下面這支引擎產生。

### 7.1 引擎（三個原語，缺一即退化）

```
原語 1 · 胞（cell）
  Laguerre / power diagram：Cell_i = { p : |p−c_i|² − w_i ≤ |p−c_j|² − w_j ∀j }
  半平面：2(c_j−c_i)·p ≤ (|c_j|²−w_j) − (|c_i|²−w_i)
  以 Sutherland–Hodgman 逐一裁切矩形，**每條邊帶上「是被誰裁出來的」標籤**（牆為 −1）。
  → 有了邊標籤，才能算出鄰居集合、共壁長度、邊數 n。沒有標籤這支引擎就只是個 Voronoi 貼圖。

原語 2 · 壁（film）
  相鄰兩胞之間那條線段。顏色 = wallColour(thickness(yn, dry))（見 §2.2）。
  線寬 = (1.1 + 5.4·(1−dry)) × 尺度：濕的時候是粗白壁，乾的時候是有色細線。

原語 3 · 面積控制（weight feedback）
  w_i += gain·(T_i − A_i)，gain ≈ 0.42；c_i += λ·(centroid_i − c_i)，λ ≈ 0.30。
  每輪把所有 w 減去 max(w) 以防數值漂走。
  → 目標面積 T 是唯一的內容輸入；要畫什麼圖，就是在指定一組 T。
```

### 7.2 三種用法

| 用途 | 輸入 | 說明 |
|---|---|---|
| 即時主視覺 | 40 個胞、隨機起始、T 依 log-normal 分布 | 每幀重解 |
| 靜態圖鑑 | 中心胞 + n 個環胞 + 外環，中心 T = (0.020 + 0.016n)·總面積 | 在建置時烘成 inline SVG，無 JS 亦可見 |
| 識別／回執印記 | `FNV-1a(字串) → mulberry32` 決定 11 個胞的位置與 T | 同輸入恆得同圖 |

### 7.3 與其他技法的界線

- **不是 flat-shape**：每一格都能被讀回「它有幾個鄰居、它正在長大還是縮小」。
- **不是 pattern-motif**：不是重複填充，一張圖是一組目標面積的唯一解。
- **不是 thin-lineart**：把壁的顏色換成單色、或把胞的填色拿掉，本技法立刻退化，必須整套一起用。

---

## 八、Logo 與 Favicon

### 8.1 Logo（64×64）

一枚 9 胞的泡沫，外加 2px 墨青外框。**中央那一胞（離中心最近者）填一道干涉漸層** `#3FC2D6 → #D8479B → #EBA92B`（青→洋紅→金，即膜由厚變薄的走向），其餘胞走 §2.3 的填色階。品牌字不做進 SVG——SVG 只放記號，字在 HTML 裡以 Noto Sans TC 900 `letter-spacing:.16em` 排，下面一行 Archivo 800 大寫 `.62rem` `letter-spacing:.3em` 的拉丁副標。

### 8.2 Favicon（32×32，inline SVG data URI）

不要把 logo 縮小塞進去——9 胞在 16px 下是一團泥。改畫**一個 Plateau 交點**：三條 3px 線自中心以 90°／210°／330° 射出，中心一顆 r=2.6 的實心圓。其中一條（往下那條）是干涉粉 `#D8479B`，另兩條墨青。皂水青灰底。

```html
<link rel="icon" href="data:image/svg+xml,%3Csvg%20xmlns%3D...%3E">
```
（`#` 必須做 URL encode，否則會被當成 fragment。）

---

## 九、Do & Don't

### Do
- 兩色底，彩色只從公式來。
- 每一個讀數都可以被使用者自己驗證。
- 標題短、900、負字距。
- 圖鑑在建置時烘成 inline SVG，讓不跑 JS 的人也讀得到。
- 主視覺旁邊永遠有一句話說明「你現在在看什麼」。
- 把模型的簡化寫成一頁公開的〈誠實聲明〉：哪裡不是真的、放大了幾倍、快轉了多少。

### Don't
- ❌ 紫藍漸層 hero、置中大標 + 兩顆按鈕 + 三張卡片
- ❌ 圓角、模糊陰影、玻璃擬態
- ❌ emoji 當 icon、外部圖庫圖、Lorem ipsum
- ❌ 「在當今快節奏的世界」「把 X 變成 Y」「EST. 19xx」
- ❌ 跑馬燈、自動輪播、進場淡入、數字計數動畫
- ❌ 用彩色當強調色（那是膜的，不是介面的）
- ❌ 給總分、星等、排名、「完成！」畫面
- ❌ 只做一半的引擎（沒有邊標籤、沒有面積回授）——那會直接退化成一張 Voronoi 貼圖

---

## 十、頁面骨架範例

```html
<!DOCTYPE html>
<html lang="zh-Hant">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>單元名 — 機構名</title>
<link rel="icon" href="data:image/svg+xml,%3Csvg...Plateau 交點...%3E">
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@500;700;800&family=IBM+Plex+Mono:wght@400;500&family=Noto+Sans+TC:wght@400;500;900&display=swap" rel="stylesheet">
<style>
:root{--soap:#DCE9E4;--panel:#EDF4F1;--deep:#C6DAD3;--ink:#12292B;--ink2:#3A5654;--mid:#8FB2B0;
 --tc:'Noto Sans TC',sans-serif;--ar:'Archivo',sans-serif;--mo:'IBM Plex Mono',monospace}
*{margin:0;padding:0;box-sizing:border-box}
body{background:var(--soap);color:var(--ink);font-family:var(--tc);line-height:1.85}
.spine{position:fixed;left:0;top:0;bottom:0;width:46px;border-right:2px solid var(--ink);
 display:flex;align-items:flex-end;justify-content:center;padding-bottom:22px}
.spine span{font-family:var(--mo);font-size:.62rem;letter-spacing:.42em;text-transform:uppercase;
 writing-mode:vertical-rl;transform:rotate(180deg);color:var(--ink2)}
.wrap{margin-left:46px}
.mast{border-bottom:2px solid var(--ink);padding:16px 168px 14px 26px;display:flex;
 align-items:flex-end;justify-content:space-between;flex-wrap:wrap;gap:20px}
main{padding:0 26px 80px;max-width:1180px}
h1{font-weight:900;font-size:clamp(2rem,5.6vw,3.5rem);letter-spacing:-.03em;line-height:1.14}
.plate{font-family:var(--mo);font-size:.68rem;letter-spacing:.26em;text-transform:uppercase;color:var(--ink2)}
.rule2{border:none;border-top:2px solid var(--ink);border-bottom:2px solid var(--ink);height:7px;margin:52px 0 30px}
@media(max-width:900px){.spine{display:none}.wrap{margin-left:0}.mast{padding:14px 20px 12px}}
</style>
</head>
<body>
<div class="spine" aria-hidden="true"><span>Institution &middot; Place &middot; Subject</span></div>
<nav class="csnav" aria-label="主導覽">
  <div class="fig" aria-hidden="true"><!-- 四胞泡沫 SVG，現用頁那胞脹大填實 --></div>
  <ul>
    <li><a href="index.html" aria-current="page">一</a></li>
    <li><a href="b.html">二</a></li>
    <li><a href="c.html">三</a></li>
    <li><a href="d.html">四</a></li>
  </ul>
</nav>
<div class="wrap">
<header class="mast">
  <a class="bd" href="index.html"><span class="mk"><!-- logo SVG --></span>
    <span><b>機構名</b><i>Latin Name</i></span></a>
  <div class="info">地址　電話<br>開放時間</div>
</header>
<main>
  <section style="padding-top:22px">
    <span class="plate">展品 01 — Exhibit 01</span>
    <h1>單字標題</h1>
    <p class="lede">兩句話說完這是什麼。第二句話說它為什麼會消失。</p>
  </section>

  <div class="tankbox"><canvas id="stage"></canvas></div>
  <div class="readout">
    <div><b id="r1">—</b><span>可驗證的讀數一</span></div>
    <div><b id="r2">—</b><span>可驗證的讀數二</span></div>
  </div>
  <div class="ctl">
    <div class="ctl-blk">
      <label for="p1">主參數</label>
      <input type="range" id="p1" min="0" max="100" value="46">
      <div class="ctl-scale"><span>左端的意思</span><span>中段</span><span>右端的意思</span></div>
      <p class="small">說明這根桿子讓使用者付出什麼代價。</p>
    </div>
  </div>

  <hr class="rule2">
  <section>
    <span class="plate">Exhibit Labels</span>
    <h2>幾塊牌子</h2>
    <div class="labels">
      <div class="lb"><span class="plate">02</span><h3>單字</h3><p>三句以內。陳述句。不解釋感受。</p></div>
    </div>
  </section>
</main>
</div>
<footer>…（三欄 + 虛構聲明）</footer>
<script>/* 胞元引擎：clipPoly(帶邊標籤) → computeCells → 面積回授 → 每幀重解重繪 */</script>
</body>
</html>
```

### 文案語氣

短。陳述句。不用形容詞堆疊，不解釋觀眾應該有什麼感受。

> 好：「它不會停在任何一個形狀上。它只會變少。」
> 好：「黑膜是顏色走完之後剩下的東西，通常也是最後的東西。」
> 壞：「在這個瞬息萬變的時代，讓我們一起探索泡沫的奇幻旅程。」

專有名詞與人名、價格、電話、地址一律寫具體的；寫不具體就不要寫。
