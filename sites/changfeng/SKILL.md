---
name: space-age-moulded
description: 1960s Space Age industrial design for the web — everything is a superellipse, every shell is a single seamless moulding with a computed specular highlight, and one international orange marks only what is happening right now.
---

# 太空時代 · 一體成形 Space Age / Moulded Shell

> 這份規格書描述的是一九五七到一九七二年那個十年的形——**太空時代 Space Age**：
> 玻璃纖維與射出成形第一次讓椅子、電視、艙體可以沒有腳、沒有接縫、沒有螺絲。
> 它不綁定產業：範例站是一家氣送管工程行，同一套語言也能做膠囊旅社、家電行、泳池、健檢中心、唱片行、機場接駁。
> 判準只有一個——**遮掉全部文字，懂設計的人要能在三秒內說出「這是六〇年代太空時代」。**

---

## 一、設計哲學

一九五九年，丹麥人皮特・海因（Piet Hein）替斯德哥爾摩 Sergels torg 的圓環解了一道題：
橢圓太軟、矩形太硬，他給了兩者之間的一條曲線——**超橢圓 superellipse**，
`|x/a|^n + |y/b|^n = 1`。這條線後來變成他和 Bruno Mathsson 的桌子（Fritz Hansen，1968 年起量產）、變成超蛋 superegg。

三年後，一九六二年，Aldo Novarese 在都靈的 Nebiolo 鑄字廠把同一條曲線做成了字：**Eurostile**——
它的字腔是「方中帶圓的超橢圓」，前身是一九五二年 Butti 與 Novarese 的 Microgramma（只有大寫）。
同一個十年，Eero Aarnio 的球椅（1963 設計／1966 量產）、Verner Panton 的一體成形椅、Matti Suuronen 的 Futuro 屋（1968）、
Joe Colombo 的整體居住單元（1972）——全部靠玻璃纖維與射出成形，**一體、無縫、無腳**。

所以這個流派不是「未來感的裝飾」，它是三件事的交集：

1. **一條曲線**（超橢圓）同時統治了圓環、桌子、字與外殼；
2. **一種製法**（開模）決定了什麼形狀可以存在——模具做不出尖銳的內角，也做不出接縫；
3. **一種顏色觀**：顏色是塑膠本身的顏色，不是漆上去的，所以它平、它亮、它沒有材質。

網頁化的三條後果：

- **不准畫模具做不出來的東西**：沒有外框線、沒有接縫、沒有模糊投影。
- **深度只能靠光**：要表達立體，用同一盞燈打在殼體輪廓上的高光，不用陰影。
- **顏色分工要硬**：白是場，橘是正在發生的事，銀是結構，其餘只准當標記。

它跟義大利未來派（1909）的差別要講清楚：未來派畫的是**速度與力**，畫面上有力線、有相位重影、有斜；
太空時代畫的是**被造出來的物**，畫面是靜的、正的、乾淨的，動的只有那盞燈。
它跟 Y2K／Frutiger Aero 的差別是：那兩者是螢幕裡的液體與光暈，本流派是**手摸得到的塑膠**。

---

## 二、本風格的 5 個不可省略特徵

拿掉其中任何一項，它就不是太空時代了。

### 特徵 1：超橢圓是唯一的形狀語彙

所有殼體、按鈕、開口、字牌、頭像框，一律 `|x/a|^n + |y/b|^n = 1`，n ∈ [2.4, 4.2]（常用 3.4）。
**沒有正圓、沒有直角，也沒有「圓角矩形」**——圓角矩形是直線接上圓弧、曲率不連續，站在兩公尺外眼睛分得出來。
唯一的例外是氣流點列的小圓點（見第八章）：它們不是殼體，是流體的標記，直徑 ≤ 4px，永遠成列出現、永不單獨使用。

```js
// 唯一的形狀函式。整個網站的每一個形都從這裡出來。
function se(cx, cy, a, b, n = 3.4, steps = 44) {
  let d = '';
  for (let i = 0; i < steps; i++) {
    const t = i / steps * 2 * Math.PI, ct = Math.cos(t), st = Math.sin(t);
    const x = cx + a * Math.sign(ct) * Math.pow(Math.abs(ct), 2 / n);
    const y = cy + b * Math.sign(st) * Math.pow(Math.abs(st), 2 / n);
    d += (i ? 'L' : 'M') + x.toFixed(1) + ' ' + y.toFixed(1);
  }
  return d + 'Z';
}
```

HTML 區塊要成為殼體，把超橢圓做成可自由縮放的背景——
超橢圓非等比縮放之後**仍然是超橢圓**（a、b 各自變而已），所以 `preserveAspectRatio="none"` 在數學上是正確的，不是妥協：

```css
.shell{
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 120' preserveAspectRatio='none'%3E%3Cpath d='M199.5 60L198.6 78…Z' fill='%23FFFFFF'/%3E%3C/svg%3E");
  background-size:100% 100%;
  background-repeat:no-repeat;
  padding:30px 34px;      /* 內距要夠，文字不能壓到轉角的曲率上 */
  border:0;               /* 永遠 */
  box-shadow:none;        /* 永遠 */
}
```

### 特徵 2：一體成形——零外框線、零接縫、零模糊投影

色域直接相接。要分隔兩塊，就換一塊殼體，不畫線。
要表達壓下去，就位移，不加陰影。**投影一律不存在**——不是「淡一點的陰影」，是沒有。

```css
*{box-shadow:none}
.btn{ transition:transform .09s linear; }
.btn:hover{ transform:translateY(-2px) scale(1.012); }   /* 沒有陰影，只有位移 */
.divider{ display:none; }                                 /* 分隔線在本流派不存在 */
```

### 特徵 3：鏡面高光沿殼體輪廓走，而且它是算出來的

每一個殼體都有一條高光帶，來源是**同一盞燈**打在它自己的輪廓上——
所以不同形狀的高光不一樣，而且它們彼此一致。用 SVG 濾鏡，以形狀的 alpha 當高度場：

```svg
<filter id="gloss" x="-14%" y="-14%" width="128%" height="128%">
  <feGaussianBlur in="SourceAlpha" stdDeviation="3.4" result="b"/>
  <feSpecularLighting in="b" surfaceScale="4.5" specularConstant="0.72"
                      specularExponent="20" lighting-color="#ffffff" result="s">
    <fePointLight x="46" y="14" z="96"/>
  </feSpecularLighting>
  <feComposite in="s" in2="SourceAlpha" operator="in" result="sc"/>
  <feComposite in="SourceGraphic" in2="sc" operator="arithmetic" k1="0" k2="1" k3="1" k4="0"/>
</filter>
```

把燈移動，整頁的高光一起變——這就是本流派唯一被允許的環境動效（見第七章）。
**不要用 `linear-gradient` 假造高光**：漸層不知道形狀在哪裡轉彎，做出來的是貼紙不是塑膠。

### 特徵 4：方圓寬體大寫字

標題一律大寫、字腔方中帶圓、字距 ≥ .06em、字寬 ≥ 110%（Microgramma 1952／Eurostile 1962 的血緣）。
數字與型號用同一族——這是機件銘牌的規矩。中文標題**不得**用書法體或明體，一律無襯線並放寬字距。

```css
/* Eurostile 的免費近親：Michroma（方圓、寬、僅大寫氣質） */
.eu{
  font-family:"Michroma","Archivo",sans-serif;
  text-transform:uppercase;
  letter-spacing:.1em;
  font-weight:400;              /* 這個流派的字是輕的、大的，不是粗的 */
}
.kicker{ font-family:"Michroma",sans-serif; font-size:10.5px; letter-spacing:.24em; }
.num{ font-family:"Archivo",sans-serif; font-variant-numeric:tabular-nums; font-weight:600; }
```

### 特徵 5：白是場、橘是事件

大面積無縫白 ≥ 50%，且**零紋理、零顆粒、零紙紋、零漸層網目**——本流派拒絕材質。
國際橘 ≤ 14%，只給「正在發生的事」：現用態、在途、即將逾時、主要動作。
鉻銀只給結構件（管、夾、框），酸綠只給「已完成」，鈷藍只給連結。橘一旦被拿去當品牌色亂灑，這個風格就關掉了。

```css
:root{
  --white:#F4F4F1;  /* 場 ≥50% */
  --shell:#FFFFFF;  /* 殼體 */
  --shell2:#E6E8E6; /* 次級殼體 */
  --chrome:#C9CED3; --chrome-d:#8C959C;  /* 結構件 */
  --ink:#23262A;   --void:#171A1D;       /* 字與腔 */
  --orange:#FF5A1F;                       /* 只給正在發生的事，≤14% */
  --lime:#B7E021;                         /* 只給已完成，≤5% */
  --cobalt:#1D4FD8;                       /* 只給連結，≤3% */
}
body{background:var(--white)}   /* 不加 background-image、不加 noise */
```

---

## 三、色彩系統

| 色 | hex | 用途 | 比例 |
|---|---|---|---|
| 無縫白 | `#F4F4F1` | 全站地色。零紋理零顆粒 | ~46% |
| 殼白 | `#FFFFFF` | 一級殼體（卡片、站台、面板） | ~14% |
| 次級殼 | `#E6E8E6` | 二級殼體、槽體、管身底 | ~10% |
| 鉻銀 | `#C9CED3` | 管、夾、框、非現用結構件 | ~9% |
| 鉻銀暗 | `#8C959C` | 次要文字、死路、停用態 | ~5% |
| 石墨 | `#23262A` | 正文、腔體、子彈本體 | ~11% |
| 深腔 | `#171A1D` | 頁尾 | ~2% |
| 國際橘 | `#FF5A1F` | **只給正在發生的事** | ≤14%（實測 6.8%） |
| 酸綠 | `#B7E021` | 只給已到站／已完成 | ≤5% |
| 鈷藍 | `#1D4FD8` | 只給連結 | ≤3% |

規則：

- 灰階零色偏（HSL 飽和度 ≤ 6%）。金屬感來自高光，不來自色偏。
- 橘與酸綠**不得同時**描述同一個物件——一個是進行中，一個是完成，語意互斥。
- 深色只出現在腔體內部（管內、子彈本體、頁尾）。**不做深色主題**：一體成形的白殼在暗底上不成立。

---

## 四、字體系統

| 角色 | 字體 | 設定 |
|---|---|---|
| 顯示／代號／導覽 | Michroma 400 | `text-transform:uppercase; letter-spacing:.1em` |
| 小標籤 kicker | Michroma 400 | `10.5px / letter-spacing:.24em` |
| 數字與價目 | Archivo 600–800 | `font-variant-numeric:tabular-nums` |
| 中文正文 | Noto Sans TC 400/500 | `16px / 1.75 / letter-spacing:.01em` |
| 中文標題 | Noto Sans TC 400 | `clamp(26px,3.6vw,44px) / line-height:1.08` |

```html
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;600;800&family=Michroma&family=Noto+Sans+TC:wght@400;500;700&display=swap" rel="stylesheet">
```

字級尺（rem 基準 16px）：`10.5 / 12 / 13.4 / 14.6 / 16 / 17 / 19 / 26 / 34 / 44`。
標題**不加粗**——這個流派的大字是輕的、寬的、被邊緣切掉的，不是粗的。

---

## 五、版面與網格

- 容器 `max-width:1160px`，左右 26px（≤560px 時 16px）。
- 主結構是「殼體貼在白場上」，不是「卡片放在網格裡」：殼體可以不等高、不等寬、不對齊底線。
- 首屏用**縱向物件＋銘牌群**：左邊一件 1:1 的機具（或艙體、管、櫃），右邊是漆在它上面的資訊板。不要大標＋副標＋兩顆按鈕。
- 表格是這個流派的正字：`thead th` 用 Michroma 小字距寬，`tbody tr` 交替 `#FFFFFF` / `#FAFAF8`，**不畫框線**。
- RWD：≤900px 導覽落為橫列、雙欄併單欄；≤560px 全部單欄。殼體背景是可自由縮放的超橢圓，不會破。

---

## 六、元件配方

**導覽（轉轍葉片 diverter-vane）**：中央一片會轉的葉片，四條支管＝四頁；葉片指著哪一支，那一支才是通的，其餘畫成死路灰。

```css
.vane .blade{ transition:transform .42s cubic-bezier(.3,1.5,.4,1); transform-origin:112px 30px; }
.vport .duct{ fill:#C9CED3 }
.vport.on .duct{ fill:#FF5A1F }
.vport.dead .duct{ fill:#DDE1E2 }   /* 沒被選到的支管是死路，不是「未選取」 */
```

**按鈕**：超橢圓底、Michroma 12px、`padding:13px 30px 14px`；hover 位移不加陰影；停用態換成鉻銀底＋暗銀字。

**表單控制項**：`select`／`input` 一律 `border:0` ＋ 超橢圓殼底 ＋ `appearance:none`。label 用 Michroma 9.4px `.16em`。

**格位指示**（本流派最好用的一個元件）：把容量畫成幾個超橢圓格子，填滿即上色，**不要畫進度條、不要畫量表**。

```css
.cells{display:flex;gap:6px}
.cell{flex:1;height:34px;background:var(--shell2)}  /* 實作時換成超橢圓背景 */
.cell.f{background:var(--orange)}
```

**頁尾**：深腔 `#171A1D`，三欄，標題用 Michroma 橘色 10px `.2em`。

---

## 七、動效規則

| 類型 | 做什麼 | 值 |
|---|---|---|
| ambient | 光源沿物件來回移動，全頁高光跟著變；管內氣流點列流動 | 光源 22s linear infinite；氣流 2.4s linear infinite |
| input | hover／點選即打通該支並亮橘，其餘變死路 | 90ms linear，延遲 <100ms |
| transition | 內容由開口方向以 `clip-path` 推入 | 460ms `cubic-bezier(.22,.72,.2,1)` |
| signature | 由站點自訂（範例站是「在途」） | 見第十二章 |

```css
@keyframes wipein{ from{clip-path:inset(0 0 0 100%)} to{clip-path:inset(0 0 0 0)} }
main{ animation:wipein .46s cubic-bezier(.22,.72,.2,1) both }
@keyframes flow{ to{ background-position-x:-34px } }
.flowline{
  height:6px;
  background-image:radial-gradient(circle at 4px 3px, var(--chrome-d) 1.7px, transparent 2.2px);
  background-size:17px 6px;
  animation:flow 1.15s linear infinite;
}
@media (prefers-reduced-motion:reduce){
  *,*::before,*::after{ animation-duration:.001ms!important; animation-iteration-count:1!important;
                        transition-duration:.001ms!important }
  main{ animation:none }
}
```

禁用：淡入式滾動揭示、視差、數字滾動計數、跑馬燈、彈跳緩動（`bounce`）、模糊位移。
唯一允許的過衝是機械件的行程過衝（葉片、閥、滑架），且必須 ≤ 8% 並在 420ms 內收斂。

---

## 八、插畫與圖像風格

技法名稱：**moulded-shell 一體殼體構成**。零外部圖片、零照片、零描外形的線稿。原語只有三種：

1. **超橢圓殼體**：實心色塊，`fill` 直上，**沒有 stroke**。
2. **鏡面高光**：由 `feSpecularLighting` 從殼體自己的 alpha 生成（特徵 3）。
3. **氣流／流向點列**：等距圓點，點距代表速度。**不用箭頭、不用線**——箭頭是工程製圖的語彙，會把整站拉進另一個家族。

判準：拿掉顏色，仍讀得出「哪裡是殼、哪裡是腔、東西往哪走」。

明文禁用：`feTurbulence` 手抖濾鏡、半調網點、細線幾何線描、圖號角標、mono 尺寸標註與剖面線。
**這一條是把本流派和「工程製圖／檔案卷宗」分開的那道牆**：兩者都在畫機器，但那邊畫的是圖，這邊畫的是**物**。

---

## 九、Logo 與 Favicon

Logo：一個超橢圓殼體（n=3.4）＋ 一枚橘色標記 ＋ 一列漸小的銀色點（流向）＋ Michroma 大寫字 ＋ 中文副名放寬到 `letter-spacing:5`。
整組套同一個 `gloss` 濾鏡，所以 logo 的高光跟站上每一個殼體是同一盞燈。

Favicon 一律原創 inline SVG data URI，只允許三個形：外殼、橘標記、兩顆流向點。

```html
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' fill='%23F4F4F1'/%3E%3Cpath d='…超橢圓…' fill='%2323262A'/%3E%3Cpath d='…橘標記…' fill='%23FF5A1F'/%3E%3Ccircle cx='32' cy='45' r='3' fill='%23F4F4F1'/%3E%3Ccircle cx='32' cy='53' r='2.2' fill='%23C9CED3'/%3E%3C/svg%3E">
```

---

## 十、Do & Don't

**Do**

- 每一個形都從 `se()` 出來，包括按鈕、標籤、格子、favicon。
- 深度只用高光表達，而高光只有一盞燈。
- 橘只給正在發生的事；一頁上橘的面積自己數，超過 14% 就砍。
- 標題大寫、寬、輕、放寬字距，允許被畫布邊緣切掉。
- 表格不畫框線，用底色交替。
- 文案講規格與理由：口徑、流速、為什麼不接這個案子。

**Don't**

- 不用圓角矩形（`border-radius`）假裝超橢圓。
- 不加 `box-shadow`、不加 `filter:drop-shadow`、不加漸層當高光。
- 不鋪紙紋、噪點、顆粒、木紋、拉絲——本流派沒有材質。
- 不做深色版。
- 不用 emoji 當 icon，不用細線幾何線描，不畫箭頭。
- 不寫「EST. 19xx」徽章、不寫「把 X 變成 Y」句式標題、不寫 Lorem ipsum。
- 不把橘拿去當背景大色塊——它是事件，不是牆。

---

## 十一、頁面骨架範例

```html
<!DOCTYPE html><html lang="zh-Hant"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>機房｜長風氣送工程行</title>
<link rel="icon" href="data:image/svg+xml,…">
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;600;800&family=Michroma&family=Noto+Sans+TC:wght@400;500;700&display=swap" rel="stylesheet">
<style>/* 見第二、三、四章 */</style></head><body>

<header class="top"><div class="tbar">
  <a class="mark" href="index.html"><svg width="34" height="34" viewBox="0 0 64 64">…殼體…</svg>
    <span><b>CHANGFENG</b><br><span>長風氣送工程行</span></span></a>
  <nav class="vane"><svg width="290" height="72" viewBox="0 0 290 72">
    <path d="…樞紐超橢圓…" fill="#E6E8E6"/>
    <a href="fasong.html" class="vport dead"><path class="duct" d="…"/><text>DISPATCH</text></a>
    <g class="blade" style="transform:rotate(-11deg)"><path d="…葉片…" fill="#23262A"/></g>
  </svg></nav>
</div></header>

<main>
  <section><div class="wrap">
    <div class="hero">                         <!-- 縱向物件 ＋ 銘牌群，不是大標 hero -->
      <svg viewBox="0 0 300 560" width="300" height="560">
        <defs><filter id="gloss">…見特徵 3…</filter></defs>
        <g filter="url(#gloss)">…管、站台、艙體…</g>
      </svg>
      <div class="plates">
        <div class="plate"><h4 class="eu">工程行</h4><p>地址／電話／時段</p></div>
        <div class="plate"><h4 class="eu">規格</h4><p>口徑／流速／長度</p></div>
      </div>
    </div>
  </div></section>

  <section style="background:#FFFFFF"><div class="wrap">
    <p class="kicker">價目</p><h2 class="h2">工程與保養</h2>
    <table><thead><tr><th>項目</th><th style="text-align:right">新台幣</th></tr></thead>
      <tbody><tr><td>…</td><td class="n" style="text-align:right">…</td></tr></tbody></table>
  </div></section>
</main>

<footer><div class="wrap">…三欄，深腔底…</div></footer>
</body></html>
```

---

## 十二、技術實作與相容性

本站三項核心技術、其支援現況（2026-08-29 查證）、fallback 具體行為與效能實測值。

### 12.1 SVG `feSpecularLighting` ＋ `fePointLight`（A 渲染層）

**承載**：特徵 3 的一體成形光澤，與特徵 2「深度只能靠光」。
把殼體的 alpha 通道當高度場，依 Phong 鏡面項算出高光；因此高光**沿著形狀自己的輪廓**走，
一支殼體引擎輸出的二十四張機件縮圖不必逐張手繪高光。

**查證**：MDN《`<feSpecularLighting>`》標示 Baseline **Widely available**，自 2015-07 起跨瀏覽器可用。

**Fallback**：任何不支援濾鏡的環境（或使用者關閉濾鏡）會**整個忽略 `filter` 屬性**，
殼體退為平塗實色——那仍然是合法的太空時代畫面（一九六〇年代的平面稿本來就是平塗），版面、色彩分工與資訊零損失。
因此本站不寫 `@supports`：這個特性的降級是天然安全的。

**效能**：濾鏡區域刻意壓小。會動的光源只有一盞、只掛在首頁那支 300×560 的立管上（`dur="22s"`）；
機件頁二十四張縮圖共用一個 `#gl` 濾鏡且皆為靜態光源（不重繪）。
單頁 inline 全部資源後 44.6–65.4 KB（上限 350 KB）；首屏 JS 執行實測 < 6 ms（腳本本體 3.7 KB，無框架、無外部 JS）。

### 12.2 SVG SMIL `<animateMotion>` ＋ `<mpath>` ＋ `SVGSVGElement.setCurrentTime()`（B 動效與時間軸層）

**承載**：簽名動效「在途」。子彈必須沿**版面上那一條管本身**的 `<path>` 前進——
路徑就是內容，用 CSS `transform` 得再寫一份幾何、且兩份會走樣。
`setCurrentTime()` 則是把 SMIL 時間軸 seek 到「這枚子彈已經飛了幾秒」，
所以換頁之後它不是重播，是**接著走**。

**查證**：MDN《SVG animation with SMIL》與 caniuse `svg-smil` — 除 IE 與 Opera Mini 外全面支援；
MDN《`SVGSVGElement.setCurrentTime()`》為長期可用的介面。
`<mpath>` 同時寫 `href` 與 `xlink:href` 兩個屬性，以涵蓋只認舊屬性的實作。

**Fallback**：以 `typeof SVGAnimateMotionElement !== 'undefined' && typeof svg.setCurrentTime === 'function'` 特性偵測；
不成立時改以 `transform="translate(x,27)"` 每 600ms 直接寫入位置——路徑是直管，視覺差異只有轉彎處的貼合度，
子彈位置、剩餘秒數與到站事件完全相同。

```js
var smil = (typeof SVGAnimateMotionElement !== 'undefined')
        && !!mo && typeof svg.setCurrentTime === 'function';
if (smil && !reduce) {
  mo.setAttribute('dur', (full/1000).toFixed(2) + 's');
  mo.setAttribute('begin', '0s');
  try { svg.setCurrentTime(elapsed/1000); } catch (e) {}   // 接著走，不是重播
} else {
  pod.setAttribute('transform', 'translate(' + (-40 + frac*1240).toFixed(1) + ',27)');
}
```

**一致性哨兵**：SMIL 的實作差異（`dur` 動態變更、`mpath` 的 `href` 版本）無法用 `@supports` 偵測，
所以每 600ms 拿 `getBoundingClientRect()` 比對「動畫畫出來的位置」與「模型算出來的位置」，
連續兩次偏離超過 10% 就永久退回 `transform` 模式。**模型永遠是對的，動畫只是它的表現。**

```js
var r = pod.getBoundingClientRect(), pr = svg.getBoundingClientRect();
var actual = ((r.left + r.width/2) - pr.left) / pr.width;
var expect = (-40 + frac*1240) / 1160;
if (Math.abs(actual - expect) > 0.10 && ++miss >= 2) smil = false;   // 換模式，不換答案
```

**reduced-motion**：不啟動 SMIL，改為每 3 秒更新一次位置與「還有 N 秒到站」的文字，資訊零損失。

### 12.3 `localStorage` 時間戳 ＋ `BroadcastChannel`（E 資料與生成層）

**承載**：本站的首創——**跨頁的實體運送**。子彈的位置不是頁面狀態，是
`(現在 − 發送時刻) / 飛行時間`；所以換頁、重新整理、關掉再開，它都在同一條時間軸上，
而且送出以後沒有取消。`BroadcastChannel` 讓同時開著的多個分頁在同一毫秒收到「到站」。

**查證**：MDN《Broadcast Channel API》— Chrome 54+、Firefox 38+、Safari 15.4+（2022-03）、Edge 79+，
自 2022 年起為 Baseline。

**Fallback**：三層。`BroadcastChannel` 不存在時退回 `window` 的 `storage` 事件（跨分頁同步仍成立）；
`localStorage` 被封鎖（無痕、第三方限制）時全部讀寫包在 `try/catch` 裡，
子彈退化為單頁內的一次飛行，站台秒數、規則與紀錄表仍完整可讀。

```js
var bc = null; try { bc = new BroadcastChannel('changfeng'); } catch (e) {}
function read(){ try { return JSON.parse(localStorage.getItem('cf.transit')||'null'); } catch(e){ return null; } }
```

### 12.4 無 JavaScript 時

四頁的資訊全部是靜態 HTML：立管縱剖、管網圖、二十四件機件（含縮圖）、價目、值班表、卡管排除表皆為建置階段輸出的 inline SVG 與表格。
發送台在 `<noscript>` 內把整套規則與數字印出來（九件的站別、格數、重量、效期；四條同管禁忌；四站去程秒數），
並直說答案：最少五趟、共三百秒。**功能不能用，但這一頁仍然讀得完。**

---

*規格書版本 1.0／2026-08-29。範例站：長風氣送工程行（氣送管系統工程行 × 太空時代）。*
