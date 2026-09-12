---
name: mid-century-flat-plate
description: American mid-century modern graphic design (1950s–60s) as a web style — four opaque plates on ivory, every extra colour made by overprint, subjects reduced to a ranked list of flat outline-free primitives, hairline legs against heavy blocks, and limited animation that never eases.
---

# 中世紀現代・四塊版平塗（Mid-Century Flat Plate）

> 這份規格書描述一九五〇至六〇年代美國平面現代主義（Charley Harper 的 minimal realism、Alexander Girard 的色域幾何、UPA 的限格動畫）落到網頁上的完整做法。
> 範例站：南山溪蝶園（南投埔里，蝴蝶生態園）。風格與產業分離——同一套規格可以拿去做唱片行、兒童牙醫、汽車露營地、機場接駁或任何需要「用最少的形講清楚一件事」的品牌。

---

## 一、設計哲學

這個流派的信條只有一句，出自 Charley Harper：**「我不數翅膀上的羽毛，我只數翅膀。」**

它不是簡化，是**化約**——把對象拆到剩下幾個不能再拿掉的形，然後停手。判斷標準不是好不好看，是**還認不認得出來**。因此本流派天生帶著一個可驗算的量：**形數**。一張圖用了幾個形，是可以印在圖旁邊的數字，也是可以拿去議價的成本。

第二條信條來自印刷的現實：一九六〇年代的商業印刷品，一個顏色一塊版，版是錢。所以畫面上出現的第五種顏色，永遠不是另外調的，是**兩塊版壓在一起自己生出來的**。網頁上這件事由 `mix-blend-mode:multiply` 承擔——它不是濾鏡特效，它是這個流派的經濟制度。

第三條來自 UPA：一九五〇年代的動畫是用**最少的張數**做出來的。動作一格一格跳，沒有補間，沒有緩動曲線。本流派的網頁照辦：全站每一個轉場都是 `steps()`。

---

## 二、色彩系統

**四塊版，一張紙。** 這是硬規則，不是建議。

| 角色 | Hex | 用途 | 面積比 |
|---|---|---|---|
| 象牙紙底 | `#EFEADD` | 全站地色。**不算版，那是紙。**零紙紋、零顆粒、零漸層 | 約 40% |
| 李紫（版一） | `#7A3B5E` | 主體色域、強調標題、連結字 | 約 18% |
| 珊瑚（版二） | `#EE7A52` | 動作、現用態、需要被指出來的東西 | 約 15% |
| 湖青（版三） | `#2FA3A0` | 第二色域、資訊塊、平衡用的冷面 | 約 14% |
| 墨紫（版四） | `#241F2B` | 全部正文、髮絲線、體軸、footer 底 | 約 13% |

**疊印生色（唯一的擴色手段）**

```css
.plate-a{background:#7A3B5E}
.plate-b{position:absolute;inset:0;background:#EE7A52;mix-blend-mode:multiply}
/* → 得到 #722C39 一類的第五色，你沒有宣告它，它是壓出來的 */
```

四塊版兩兩相疊可得六色，加原四色與紙底，共十一色——這就是為什麼六〇年代的型錄用四塊版就夠了。

**禁止**：任何 `linear-gradient` / `radial-gradient` 當底色；任何 `rgba()` 半透明疊色（那是濾鏡，不是印刷）；任何第五個色票宣告。要陰影就用**實心位移色塊**（`box-shadow:4px 4px 0 var(--k)`），不准 blur。

換題材時可以整組換色（例如 Girard 的 Braniff 七色），但規則不變：**紙底一塊 + 版四塊 + 疊印生其餘**。

---

## 三、字體系統

二元對比，沒有第三種聲音。

| 角色 | 字體 | 設定 |
|---|---|---|
| 標題／標籤／編號 | **Jost**（Futura 復刻，Google Fonts）300／400／500 | 標籤一律全大寫，`letter-spacing:.16em`–`.20em` |
| 中文正文 | **Noto Sans TC** 400／500 | `line-height:1.62`，`letter-spacing:.01em` |
| 手寫斜體 | **Yellowtail**（1950 年代筆刷體） | **全站只准出現一次。** 第二次就俗了 |
| 學名／拉丁斜體 | Georgia serif italic | 只給學名，12–13px |

字級 scale：`11 / 12 / 13.5 / 15 / 17（正文）/ 19 / 23 / 27 / 31`。標題字重最高 500——這個流派沒有 700 以上的粗體，重量由**色塊**承擔，不由字重承擔。

```css
.en{font-family:'Jost',sans-serif;font-weight:300;text-transform:uppercase;
    letter-spacing:.18em;font-size:12px;color:var(--p)}
.sc{font-family:'Yellowtail',cursive;font-size:31px;color:var(--p)} /* 一次就好 */
```

---

## 四、版面與網格

- **非對稱漂浮**：主體偏離中軸、被色域邊緣裁掉一點。沒有置中大標，沒有等距三欄。
- **硬邊格線**：分格用 `1.6px` 實線，不是 `border-radius`，不是陰影。`*{border-radius:0}` 寫在 reset 裡。
- **色域卡**：每一張圖印在一塊實色色域上（四塊版之一或紙底）。白色主體必須放在有色域上，否則會消失在紙裡。
- **跨卡共用基線**：卡片內各列不管字多字少，跨過整排卡片必須對在同一條線上。用 subgrid，不要用固定高度。

```css
.reg{display:grid;grid-template-columns:repeat(4,1fr);gap:26px 22px}
.card{display:grid;grid-row:span 5;grid-template-rows:subgrid;border-top:3px solid var(--k)}
@supports not (grid-template-rows:subgrid){
  .card{grid-row:auto;display:block}
  .card .nm{min-height:2.4em}.card .la{min-height:2.6em}
}
```

- **留白不對稱**：區段上內距 52px、下內距 14px。左右不對稱由 `.cols{grid-template-columns:7fr 5fr}` 承擔。

---

## 五、本風格的 5 個不可省略特徵

拿掉任何一項，它就不是這個流派了。每一項都附可直接複製的片段。

### 1　平塗剪影，零描邊

一切物象化約為**圓、半圓、三角、細長梯形**的封閉平塗形。形與形之間只靠顏色分界。沒有一條描邊、沒有一道漸層、沒有一枚模糊陰影。

```css
svg path, svg circle, svg rect { stroke: none; }   /* 預設不描邊 */
.solid-shadow{ box-shadow:4px 4px 0 var(--k); }    /* 要陰影就用實心位移 */
```

```svg
<!-- 一隻鳥／蝶／魚的前翅：一段貝茲，一個 fill，沒有 stroke -->
<path d="M100,97C124,50 158,44 178,51C181,64 158,96 148,119L103,131Z" fill="#7A3B5E"/>
```

### 2　四塊版的色域經濟

四塊不透明油墨加一張象牙紙，第五種顏色一律由疊印生出。少了這條，畫面立刻變成一般的多彩插畫。

```css
:root{--i:#EFEADD;--p:#7A3B5E;--c:#EE7A52;--t:#2FA3A0;--k:#241F2B}
.overprint{mix-blend-mode:multiply}
```

```svg
<g style="mix-blend-mode:multiply"><path d="…後翅…" fill="#EE7A52"/></g>
<!-- 後翅壓在李紫前翅之下，交界處自己生出第五色 -->
```

### 3　髮絲與粗塊的極端對比

牌腳、觸角、星芒、分隔線一律 `1.6px`；色塊一律大。**中間粗細（3–8px 的邊框）是這個流派最忌諱的東西。** 物件不是坐在地上，是被髮絲桿撐起來或掛起來的（hairpin legs）。

```css
:root{--hair:1.6px}
.legrow{display:grid;grid-template-columns:repeat(8,1fr);height:34px}
.legrow i{display:block;height:100%;width:var(--hair);background:var(--k)}
.legrow i:nth-child(odd){justify-self:start;margin-left:22%;transform:skewX(7deg)}
.legrow i:nth-child(even){justify-self:end;margin-right:22%;transform:skewX(-7deg)}
```

```svg
<!-- atomic starburst：只准用髮絲，不准用粗芒 -->
<svg viewBox="0 0 22 22"><g stroke="#EE7A52" stroke-width="1.6">
<path d="M11,11 L21.4,11"/><path d="M11,11 L16.2,16.2"/><path d="M11,11 L11,21.4"/>
<path d="M11,11 L5.8,16.2"/><path d="M11,11 L0.6,11"/><path d="M11,11 L5.8,5.8"/>
<path d="M11,11 L11,0.6"/><path d="M11,11 L16.2,5.8"/></g>
<circle cx="11" cy="11" r="3" fill="#EE7A52"/></svg>
```

### 4　幾何無襯線大寫，加**一次**手寫斜體

標籤與編號用幾何無襯線全大寫、字距 `.16em` 以上；全站只准出現一次筆刷斜體，用在整站最想被記住的那一句話上。第二次出現就從中世紀現代掉進「復古咖啡廳」。

```css
.label{font-family:'Jost';text-transform:uppercase;letter-spacing:.18em;font-weight:300;font-size:12px}
.hero-line{font-family:'Yellowtail';font-size:31px;color:var(--p)}  /* 全站唯一一處 */
```

### 5　色域卡與非對稱漂浮構成

每一張圖印在一塊實色色域上，主體偏離中軸、被色域邊緣裁掉一點，四周留白不對稱。

```css
.shot{position:relative;overflow:hidden}          /* 色域邊緣會裁掉主體 */
.f-t{background:#2FA3A0}.f-p{background:#7A3B5E}  /* 圖的底＝四塊版之一 */
.sec{padding:52px 0 14px}                          /* 上下不對稱 */
.cols{display:grid;grid-template-columns:minmax(0,7fr) minmax(0,5fr);gap:44px}
```

---

## 六、元件配方

**導覽（wingspread 展翅型）**：四頁＝四個同一物件的兩態（收／展），現用頁那一個**展開**。語意是開闔，不是高亮。純 CSS：

```css
.wing .op{display:none}
.wing [aria-current=page] .op{display:block}
.wing [aria-current=page] .cl{display:none}
```

**按鈕**：無圓角、無漸層。主要動作＝墨底反白；次要動作＝透明底＋實心位移陰影。

```css
.btn{background:var(--k);color:var(--i);padding:11px 20px;letter-spacing:.1em;border:0;
     transition:background 90ms steps(2,jump-none)}
.btn:hover{background:var(--c)}
.btn.alt{background:transparent;color:var(--k);border:var(--hair) solid var(--k);
         box-shadow:4px 4px 0 var(--k)}
```

**卡片**：頂邊 3px 實線，其餘無框；內容用 subgrid 對齊（見 §四）。**不准圓角、不准模糊陰影、不准 hover 浮起 8px**。

**表單**：欄位用 1.6px 實線框、紙底、無圓角；錯誤訊息用李紫小字直接寫在欄位下方，說清楚是哪一條規矩擋下來的。

**footer**：整塊墨紫反白，欄標題用珊瑚色的大寫小標。

**分格**：`border-collapse:collapse` + `1.6px` 底線；表頭底線 3px。

---

## 七、動效規則（四種，缺一不可）

**總則：全站沒有一條緩動曲線。** 只用 `steps()` 與 `linear`。這不是風格潔癖，這是 UPA 限格動畫的本體。

| 種類 | 做法 | 時間／曲線 |
|---|---|---|
| ambient 環境 | 序列圖每 7.2 秒整組重畫成另一個對象；標題帶有一隻限格拍翅飛過的蝶 | `21s steps(26,jump-none) infinite`；拍翅 `.32s steps(1,jump-none) infinite` |
| input 輸入 | hover／focus 時色域卡上推 4px、底部吐出一條「名稱／幾個形」的標籤 | `90ms steps(2–3,jump-none)`，延遲 <100ms |
| transition 轉場 | 內容以 `clip-path:inset()` 由左往右**限格擦除**進場（載入、換篩選、出回執時各走一次） | `.36s steps(6,jump-none) both` |
| signature 簽名 | **形數連動**：改變全站形數預算，頁面上每一張圖同時被重畫成新的形數，每張圖跳一次 | `.18s steps(3,jump-none)` |

```css
@keyframes wipe{from{clip-path:inset(0 100% 0 0)}to{clip-path:inset(0 0 0 0)}}
.wipe{animation:wipe .36s steps(6,jump-none) both}
@keyframes flap{0%,49%{transform:scaleX(1)}50%,100%{transform:scaleX(.42)}}
```

**降級（資訊零損失）**

```css
@media (prefers-reduced-motion:reduce){
  *,*::before,*::after{animation:none!important;transition:none!important}
  .shot .rk{transform:none;position:static;display:inline-block} /* 標籤改常駐 */
}
```

序列圖停在第一個對象並在文字裡寫出它是誰；hover 標籤改為常駐；擦除改為直接是最終畫面；形數連動照常生效，只是不跳。

---

## 八、插畫與圖像風格（rank-primitive reduction 排序原語化約構成）

**全站沒有一張照片，也沒有一張描外形的寫實插圖。** 所有圖像都是同一支引擎的輸出，而引擎的資料結構就是這個流派的思想：

> 一張圖 = 一個**有序**的平塗原語清單。每個原語帶一個 `rank`，`rank` 就是化約順序。要畫幾個形，就取前 N 個。

三條硬規則：

1. **一個「形」＝一個原語；左右鏡射的一對只算一個形**（版只刻一次，翻過來再印一次）。
2. **化約一律從尾巴減起**：先掉最細的裝飾，最後只剩最結構性的三個形。到 rank 3 時，同一類的所有對象應該長得幾乎一樣——那是這個技法的證明，不是缺陷。
3. **每一張圖旁邊都印得出一個數字**（它用了幾個形）。這個數字是成本，不是分數。

範例站的十二個形（換題材時照這個精神重排，不要照抄項目名）：

| rank | 形 | 說明 |
|---|---|---|
| 1 | 前翅 | 一對，鏡射，只刻一次版 |
| 2 | 後翅 | 疊印在前翅之下，交界處生第三色 |
| 3 | 體軸 | 頭、胸、腹一個形做完 |
| 4 | 色域 | 第二塊版：斜帶、端斑、中帶或後翅域 |
| 5 | 觸角 | 兩條髮絲加兩顆端球 |
| 6 | 主斑列 | 決定屬別的那一列 |
| 7 | 尾突或緣齒 | 有尾的刻尾，無尾的刻齒 |
| 8 | 次斑列或眼紋 | 決定種別的那一列 |
| 9 | 翅脈 | 三根，只提示不描寫 |
| 10 | 緣帶 | 外緣的一道厚線 |
| 11 | 腹節 | 三道 |
| 12 | 光點 | 胸前一枚 |

```js
// 引擎骨架：forms() 回傳有序陣列，draw() 只取前 budget 個
function forms(s){ return [ fw(s), hw(s), body(s), band(s), antennae(s), spots(s) /* … */ ]; }
function cost(s,b){ return forms(s).slice(0,b).filter(Boolean).length; }
function draw(s,b){
  return '<svg viewBox="0 0 200 190"><rect width="200" height="190" fill="'+INK[s.field]+'"/>'
       + forms(s).slice(0,b).join('') + '</svg>';
}
```

**明文禁用**：`feTurbulence` 手抖濾鏡、半調網點、交叉排線、細線幾何線描（thin-lineart）、任何寫實描繪、任何 `stroke-linecap:round` 的圓頭線。

---

## 九、Logo 與 Favicon 設計指南

Logo 就是把品牌對象**化約到 rank 3**：兩塊主色形 + 一根墨色體軸，加一條 1.6px 的地線。它必須是全站形數最少的那一張圖——標誌是這個流派的極限示範。

```svg
<svg viewBox="0 0 56 56" role="img" aria-label="品牌名">
  <rect width="56" height="56" fill="#EFEADD"/>
  <path d="M28,14 C17,4 3,8 3,19 C3,29 15,34 28,30 Z" fill="#7A3B5E"/>
  <path d="M28,14 C39,4 53,8 53,19 C53,29 41,34 28,30 Z" fill="#7A3B5E"/>
  <g style="mix-blend-mode:multiply">
    <path d="M28,25 C20,22 9,26 11,34 C13,41 21,40 28,36 Z" fill="#EE7A52"/>
    <path d="M28,25 C36,22 47,26 45,34 C43,41 35,40 28,36 Z" fill="#EE7A52"/>
  </g>
  <path d="M26.3,9 h3.4 v34 h-3.4 Z" fill="#241F2B"/>
  <rect x="0" y="49" width="56" height="1.6" fill="#241F2B"/>
</svg>
```

Favicon 為同一個形再減到 16px 可辨識的程度，寫成 inline SVG data URI 放在 `<head>`：

```html
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E…%3C/svg%3E">
```

---

## 十、Do & Don't

**Do**

- 先問「拿掉這個形，還認得出來嗎」，再決定要不要畫它。
- 每張圖旁邊印出它的形數。
- 白色主體一律放在有色的色域卡上。
- 所有轉場用 `steps()`。
- 用 subgrid 讓跨卡的列真的對齊，而不是硬撐高度。
- 品牌文案給具體的人名、電話、價目、時刻；用行業自己的口氣說話。

**Don't（含去 AI 化禁令）**

- 不用紫藍漸層 hero，不用「置中大標＋副標＋兩顆按鈕＋三張圓角卡片」。
- 不用 emoji 當 icon（icon 一律自繪 SVG，只用直線、圓、45° 斜線）。
- 不用 `border-radius`、不用模糊陰影、不用玻璃擬態、不用 `rgba()` 疊色。
- 不用 Lorem ipsum，不用「在當今快節奏的世界」這類 AI 腔。
- 不用「EST. 19xx」年份徽章（年份寫進句子裡，不做成徽章）。
- 不用跑馬燈——這個流派的資訊是**印死**在牌上的，不是捲動的。
- 不用第二次手寫斜體。
- 不用緩動曲線（`ease`／`cubic-bezier`）；這個流派不補間。
- 不用中間粗細的邊框（3–8px）；不是髮絲就是大色塊。

---

## 十一、頁面骨架範例（可直接使用）

```html
<!DOCTYPE html><html lang="zh-Hant"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>頁名｜品牌</title>
<link rel="icon" href="data:image/svg+xml,…">
<link href="https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500&family=Noto+Sans+TC:wght@400;500&family=Yellowtail&display=swap" rel="stylesheet">
<style>
:root{--i:#EFEADD;--p:#7A3B5E;--c:#EE7A52;--t:#2FA3A0;--k:#241F2B;--hair:1.6px}
*{box-sizing:border-box;margin:0;padding:0;border-radius:0}
body{background:var(--i);color:var(--k);font:400 17px/1.62 'Jost','Noto Sans TC',sans-serif}
.wrap{max-width:1120px;margin:0 auto;padding:0 26px}
.sec{padding:52px 0 14px}
.sec>.hd{display:flex;align-items:baseline;gap:16px;border-bottom:3px solid var(--k);padding-bottom:8px}
.sec>.hd .en{margin-left:auto;font-weight:300;text-transform:uppercase;letter-spacing:.18em;font-size:12px;color:var(--p)}
@keyframes wipe{from{clip-path:inset(0 100% 0 0)}to{clip-path:inset(0 0 0 0)}}
.wipe{animation:wipe .36s steps(6,jump-none) both}
@media (prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}
</style></head><body>

<header class="mast"><div class="wrap">
  <div class="row"><a class="brand" href="index.html">…logo + 品牌名…</a>
  <nav class="wing" aria-label="主導覽"><ul>
    <li><a href="index.html" aria-current="page">…兩態圖…<span class="lbl">首頁</span></a></li>
  </ul><div class="bar"></div></nav></div>
  <div class="budget" role="group" aria-label="形數">
    <span class="t">形數</span>
    <button data-b="12">12</button><button data-b="8" aria-pressed="true">8</button>
    <button data-b="5">5</button><button data-b="3">3</button>
  </div>
</div><div class="band"><div class="flit">…限格飛過的對象…</div></div></header>

<main class="wipe"><div class="wrap">
  <section>
    <h1>一句把化約講完的話。</h1>
    <div class="ladder"><!-- 12 / 8 / 5 / 3 四格同一對象 --></div>
    <div class="legrow" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
  </section>
  <section class="sec"><div class="hd">…星芒…<h2>區段標題</h2><span class="en">Section</span></div>
    <div class="reg"><div class="card">…subgrid 卡片…</div></div>
  </section>
</div></main>

<footer><div class="wrap">…墨紫反白四欄…</div></footer>
<script>/* 引擎 + 形數連動 */</script>
</body></html>
```

---

## 十二、技術實作與相容性

三項核心技術，各承載一個不可省略特徵；全部在 2026-08-15 查證過現況。

### 1　`mix-blend-mode: multiply`（A 渲染層）——承載特徵 2

**承載什麼**：四塊版的色域經濟。後翅壓在前翅上、色帶壓在翅面上、疊印色票牆，全部由它生出第五色。沒有它，「四塊版」只是一句口號。

**支援現況（MDN，查證日 2026-08-15）**：`mix-blend-mode` 與 `isolation` 皆為 **Baseline Widely available，2020-01 起跨瀏覽器**。SVG 元素上以 CSS 屬性形式套用（`style="mix-blend-mode:multiply"`）同樣有效。

**Fallback**：不支援時混合被忽略，兩塊版各自以不透明實色顯示——畫面仍然是完整的平塗剪影，只是少了那六個疊印色。資訊零損失（顏色從不承載語意，語意由形與文字承擔）。要限制混合範圍時在父層加 `isolation:isolate`。

### 2　`steps()` 限格動畫（B 動效與時間軸層）——承載動效總則

**承載什麼**：UPA 限格動畫的語彙。全站四種動效——ambient 飛掠與拍翅、input 的 90ms 標籤、transition 的擦除、signature 的形數連動——全部以 `steps()` 分格，畫面上沒有一條緩動曲線。

**支援現況（MDN，查證日 2026-08-15）**：`steps(<integer>, <step-position>)` 為 **Baseline Widely available，2015-07 起跨瀏覽器**。`<step-position>` 可用 `jump-start | jump-end | jump-none | jump-both | start | end`；**用 `jump-none` 時整數必須大於 1**（本站的 `steps(2,jump-none)`、`steps(6,jump-none)` 皆合法）。

**Fallback**：不支援 `steps()` 的環境會退回 `ease`，動作變成補間——視覺上柔一點，功能完全一樣。`prefers-reduced-motion` 下全部關閉。

### 3　CSS Grid `subgrid`（C 版面與樣式層）——承載特徵 5 的跨卡基線

**承載什麼**：二十四張蝶籍卡的中名、學名、食草、形數四列必須跨卡對在同一條線上——這是「所有東西坐在一條看不見的基線上」那條規矩的實作。媒體查詢與固定高度都做不到，因為每張卡的字數不同。

**支援現況（web-features explorer / caniuse，查證日 2026-08-15）**：`subgrid` 為 **Baseline Widely available，自 2026-03-15**。Firefox 71（2019-12-10）、Safari 16（2022-09-12）、Chrome/Edge 117（2023-09-12／15）；已納入 Interop 2022–2025。

**Fallback**：`@supports not (grid-template-rows:subgrid)` 時卡片退回一般區塊流，各列以 `min-height` 對齊——四列仍然對得上，只是靠得比較鬆。資訊零損失。

### 效能預算（實測，2026-08-15）

| 項目 | 門檻 | 實測 |
|---|---|---|
| 單頁大小（含 inline 全部 CSS/JS/SVG，未壓縮） | ≤350KB | index 79KB／tiap 111KB／hing 60KB／jip 51KB |
| 外部資源 | 僅 Google Fonts | 一支 CSS，零圖片、零音檔、零函式庫 |
| 首屏 JS 執行 | ≤100ms | 一次把整頁 24 張圖全部重畫＝0.38ms；`forms()` 十萬次 812ms（0.0081ms/次）。Node 22 單執行緒實測，瀏覽器另加 DOM 寫入 |
| 主要動畫 | 60fps | 全部為 `transform` / `clip-path` / `background` 的合成層動畫，零 `getBoundingClientRect`、零 layout thrashing |

### 無 JavaScript 的行為

整套引擎在**建置階段**跑過一次，把每一張圖以刻到第 8 個形的狀態輸出成靜態 SVG 寫進頁面。關掉 JavaScript：全部圖像、文字、價目、時刻、表格完整可讀可選取；只有「換形數」與「認形」兩件事失效，並有 `<noscript>` 明講。
