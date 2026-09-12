---
name: rinpa-gold-ground
description: Rinpa (琳派) school of Japanese decorative painting — gold-leaf ground, tarashikomi pooled-pigment edges, outline-less mokkotsu colour fields, bold cropping and grouped stencil motifs.
---

# 琳派 RINPA — 金地・溜込・沒骨

> 一句話：**地は金、線は無し、厚みは縁に溜めた濃みで出す。**
> 這份規格書描述的是十七世紀京都的琳派（俵屋宗達 → 尾形光琳 → 酒井抱一），不是「和風」，也不是「日式極簡」。
> 兩者的差別在於：和風極簡靠留白與素材，琳派靠**一整面金**與**在金上並列的平塗色面**。

---

## 一、設計哲學

琳派不是一個師徒相承的流派——宗達（17 世紀初）、光琳（17 世紀末）、抱一（19 世紀初）三人彼此沒有見過面，每隔約一百年由後人「私淑」重啟一次。它因此不是一套技術傳承，而是**一組可以被重新拾起的視覺規則**。這對網頁設計是好消息：規則本身就是可交付物。

三條哲學：

1. **金地不是背景。** 金箔押的地面不表示空間、不表示天空、不表示遠近。畫面上沒有地平線，物件不是「站在」金上，而是**嵌在**金裡。所以本風格不做投影、不做景深、不做視差。
2. **形不靠線界定，靠色的邊界界定。** 沒骨（もっこつ）。線只准出現在「線本身就是那件東西」的地方：水的流線、松針、蔓。
3. **重複不是懶惰，是語法。** 光琳的燕子花圖屏風上，同一株杜若的形反覆出現。這是型紙（stencil）的思考方式：刻一枚，用一輩子。網頁上就是一個 `<path>`，只換 `rotate / scale / mirror`。

**適用產業**：任何以「季節、工序、一年一輪」為節奏的行業——菓子、和服、香、花、酒、紙、陶。也適合需要「昂貴但不吵」的品牌。
**不適用**：需要大量資料表格、需要密集數字比較、需要中性冷靜的介面。金地會贏過內容。

---

## 二、本風格的 5 個不可省略特徵

> 判準一律是：**拿掉它，這就不是琳派了。**

### 特徵 1／金地（きんじ）——大面積的金，且看得見箔目

金必須是**最大面積的地**（≥40%），而且不能是純色：真的金箔是一枚一枚押上去的，四寸見方左右會留下接縫格線；斜側光走過時整面會依序亮起。

```css
:root{ --haku:#BE9A45; --haku-d:#A07F34; --haku-l:#E3C87E; --leaf:54px; }
body{ background:var(--haku); }
/* 箔目：接縫格線。切勿用 noise / 紙紋 / 顆粒代替——琳派的地不是紙。*/
body::before{
  content:"";position:fixed;inset:0;z-index:0;pointer-events:none;
  background:
    repeating-linear-gradient(90deg,transparent 0 calc(var(--leaf) - 1px),rgba(160,127,52,.30) calc(var(--leaf) - 1px) var(--leaf)),
    repeating-linear-gradient(0deg, transparent 0 calc(var(--leaf) - 1px),rgba(160,127,52,.22) calc(var(--leaf) - 1px) var(--leaf));
}
/* 照り：一條方向性反光帶，慢到幾乎不像動畫（26s）*/
body::after{
  content:"";position:fixed;inset:-40% -60%;z-index:0;pointer-events:none;
  background:linear-gradient(104deg,transparent 40%,rgba(227,200,126,.55) 47%,
             rgba(255,246,214,.30) 50%,rgba(227,200,126,.55) 53%,transparent 60%);
  mix-blend-mode:screen; animation:teri 26s linear infinite;
}
@keyframes teri{0%{transform:translateX(-46%)}100%{transform:translateX(46%)}}
```

**長文絕不放在金地上**——鋪一張胡粉色的「懸紙」，文字放紙上。這是實務規則也是史實（屏風上的和歌寫在色紙上）。

### 特徵 2／溜込（たらしこみ）——厚度來自邊緣的濃，不是漸層

未乾的色上再落一次色，色料被表面張力拉到邊緣聚成濃邊。**畫面上不准有任何 gradient 用來表現體積。**
實作：把同一個形往內侵蝕一圈，得到的「芯」塗亮，疊回原形上，剩下的邊就是濃邊。

```html
<filter id="tk" x="-30%" y="-30%" width="160%" height="160%" color-interpolation-filters="sRGB">
  <feMorphology in="SourceAlpha" operator="erode" radius="3" result="c"/>
  <feGaussianBlur in="c" stdDeviation="2.4" result="cs"/>
  <!-- 顏色無關：把來源整體往白推 44%，作為芯 -->
  <feColorMatrix in="SourceGraphic" type="matrix" result="lt"
     values="0.56 0 0 0 0.44  0 0.56 0 0 0.44  0 0 0.56 0 0.44  0 0 0 1 0"/>
  <feComposite in="lt" in2="cs" operator="in" result="cf"/>
  <feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="cf"/></feMerge>
</filter>
<!-- 用法 -->
<path d="…" fill="#2A4E90" filter="url(#tk)"/>
```

`radius` 三檔：小件 1.4／一般 3／大塊 7。**radius = 0 就退回平塗**，那一刻風格立刻消失——這是檢驗此特徵是否在承載畫面的最快方法。

### 特徵 3／沒骨（もっこつ）——不描輪廓線

花瓣、葉、雲、洲浜一律**只有 fill，沒有 stroke**。線只允許出現在兩處：

* 水（金泥流水，1.4–2.2px，色 `#F0DCA0`）
* 線本身即形的母題（松針、蔓、糸）

```css
/* 全站規約：色面不得有描邊 */
svg .moko{ stroke:none; }
svg .mizu{ fill:none; stroke:var(--kindei); stroke-width:1.7; }
```

### 特徵 4／大胆な截断と群化——被畫框切斷、成叢重複、留白 ≥40%

主題**必須**被畫面邊緣切掉；同一個母題**必須**成叢出現（一叢 2–4 株，全畫面 6–12 叢）；並且要留下一整塊什麼都不放的金（右上或左下擇一，占畫面 ≥1/5）。

叢的位置用 Poisson-disk 撒點：既不排成格子（那是紋樣不是繪畫），也不會重疊。

```js
/* Bridson 1997。r = 最小株距 */
function poisson(w,h,r,rnd,k=20){ /* … 見本站 index.html 內的實作 … */ }
const centers = poisson(W-160, H-190, 196, rng('seed')).map(p=>[p[0]+80,p[1]+120]);
```

### 特徵 5／型紙の反復——一枚型，只換 rotate / scale / mirror

畫面上所有同類母題共用**同一個 path**。禁止為了「自然一點」而逐一改形。變化只准來自三個變換與尺寸。

```html
<g transform="translate(420,260) rotate(-4) scale(-0.86,0.86) translate(-50,-60)">
  <path d="M50,4 C58,14 61,28 56,40 C53,47 47,47 44,40 C39,28 42,18 50,4 Z …" fill="#2A4E90" filter="url(#tk)"/>
</g>
```

---

## 三、色彩系統

| 色 | hex | 用途 | 比例 |
|---|---|---|---|
| 箔地 | `#BE9A45` | 全站唯一大面積地色。它是「金」，不是「黃褐」 | 約 44% |
| 箔目・陰り | `#A07F34` | 接縫格線、摺陰 | 約 7% |
| 箔の照り | `#E3C87E` | 反光帶（只出現在動的那條帶上） | 約 5% |
| 群青 | `#2A4E90` | 第一礦物色。花、主色面、連結 | 約 14% |
| 深群青 | `#1D3A70` | 群青的暗階（同色相，不是加黑） | 約 3% |
| 緑青 | `#3C7A63` | 第二礦物色。葉、枝、標籤 | 約 10% |
| 墨 | `#191712` | 正文、木札地、footer | 約 11% |
| 胡粉 | `#F3EEE2` | 懸紙（所有長文的底） | 約 4% |
| 金泥 | `#F0DCA0` | **只給線**：流水、外框、木札上的字框 | ≤2% |
| 臙脂 | `#A83A34` | 只給印記與拒絕 | ≤2% |

規則：

* **礦物色平塗，永不互相漸層**。群青與緑青可以相鄰，但中間不放描邊、不放陰影。
* **金泥只准畫線**。金泥拿來填面就變成廉價的「金色」。
* 深色階一律由**同色相加深**（群青 → 深群青），不得混黑。
* 不使用純白 `#FFF`；紙是胡粉 `#F3EEE2`。

---

## 四、字體系統

* 主字：**Shippori Mincho B1**（400 / 600 / 800）。這是有筆鋒、橫細直粗、字面偏大的明朝，正好對應金地上的黑字。
* 漢字補：**Noto Serif TC**（400 / 700 / 900）。
* **不使用黑體／sans-serif 當標題**。琳派沒有無襯線的可能性。

```css
body{font-family:"Shippori Mincho B1","Noto Serif TC",serif;font-weight:400;line-height:1.9;letter-spacing:.04em}
h1,h2,h3{font-weight:800;letter-spacing:.1em;line-height:1.55}
.dai{font-size:clamp(21px,3.1vw,32px)}         /* 標題 */
.sub{font-size:13px;letter-spacing:.34em;color:var(--roku);font-weight:600}  /* 章標 */
.note{font-size:12px;line-height:1.85}
```

字級階：12 / 13 / 15 / 17 / 21–32(clamp) / 28–52(clamp，只給木札的銘)。

**縱書**是本風格的正字法之一（落款、品書、木札）：

```css
.tate{writing-mode:vertical-rl;text-orientation:upright}
.tcu{text-combine-upright:all}   /* 縦中横：兩位數字併成一格 */
```

---

## 五、版面與網格

* **不用置中對稱**。屏風是六扇，內容在其中一扇偏左或偏右結束。
* 主要容器：`.kami`（懸紙）= 胡粉底 + `6px 8px 0` 的**實心位移投影**（不得模糊）+ 內縮 6px 的一道 1px 細框。
* 欄：`1.15fr .85fr`（非 1:1），三欄時等寬但內容長度刻意不齊。
* 圓角：**0**。琳派沒有圓角，只有形本身的曲線。
* 留白：主視覺區留白 ≥40%，且要**集中成一塊**，不要平均分散。

```css
.kami{background:var(--gofun);padding:34px 30px;position:relative;
      box-shadow:0 1px 0 rgba(25,23,18,.30), 6px 8px 0 rgba(25,23,18,.10)}
.kami::after{content:"";position:absolute;inset:6px;border:1px solid rgba(25,23,18,.14)}
```

---

## 六、元件配方

**導覽（溜込已滲）**：四個色面，現用頁那一個**套上 `filter:url(#tk)`**（濃邊已聚攏），其餘平塗。語意是「它已經滲開了」，不是被高亮。

```html
<a href="./x.html" aria-current="page"><svg viewBox="0 0 66 52">
  <path d="…" fill="#2A4E90" filter="url(#tk)"/>
  <path d="M6,46 h54" stroke="#F0DCA0" stroke-width="1.4" fill="none"/>
</svg><em>頁名</em></a>
```

**按鈕**：墨底 + 金泥字 + 1px 箔目色框，`letter-spacing:.24em`，無圓角無陰影。
次要按鈕：透明底 + 1px 墨框，hover 轉臙脂。

```css
button.go{background:var(--sumi);color:var(--kindei);border:1px solid var(--haku-d);
          font-weight:800;letter-spacing:.24em;padding:12px 26px}
button.go:hover{background:var(--gun-d)}
```

**表格**：無框線盒，只有 1px 底線；`th` 用緑青、`letter-spacing:.1em`、`white-space:nowrap`。

**表單**：`accent-color:var(--gun)`；focus ring 用群青 2px + 3px offset。

**Footer**：墨底、金泥連結、四欄。

---

## 七、動效規則（四種，缺一不可）

| 類 | 名 | 觸發 | 值 |
|---|---|---|---|
| 環境 | 金の照り | 無需輸入 | `translateX(-46% → 46%)`，26s linear infinite，`mix-blend-mode:screen` |
| 輸入 | 屏風の折り | 拖曳／滑桿／方向鍵 | 折角 0–44°，rAF 節流，只寫 `transform` 與 `--sh`，反應 <100ms |
| 轉場 | 畳んで開く | 狀態切換 | 子元素依序 `rotateY(0 → -74deg)` 340ms `cubic-bezier(.5,0,.75,.2)`，stagger 55ms；再反向 400ms `cubic-bezier(.2,.7,.3,1)` |
| 簽名 | **銘が入る** | 命名通過時 | 900ms：`feMorphology radius 0.1 → 6`（`easeOutCubic`），同時 opacity 0→1、金泥外框 `stroke-dashoffset 100 → 0`（`pathLength=100`） |

**簽名動效的要點**：字的濃邊是「長出來的」——墨在字裡由外向內聚攏。這是唯一一個把 `feMorphology` 當作時間軸來用的地方。

```js
(function step(now){
  const u=Math.min(1,(now-t0)/900), e=1-Math.pow(1-u,3);
  m.setAttribute('radius',(0.1+e*6).toFixed(2));
  txt.style.opacity=Math.min(1,e*1.6);
  frame.setAttribute('stroke-dashoffset',(100-e*100).toFixed(1));
  if(u<1)requestAnimationFrame(step);
})(performance.now());
```

四種**全部**要有 `prefers-reduced-motion` 降級，且降級後資訊零損失：照り停在半亮、折り仍可拖（那是資訊不是裝飾）、轉場直接換內容、簽名直接顯示完成態＋外框全描。

---

## 八、插畫與圖像風格

技法名：**溜込沒骨型紙構成（tarashikomi-mokkotsu）**。四種原語，只有這四種：

1. **沒骨色面**：閉合 Catmull–Rom 曲線，只有 fill。
2. **溜込濃邊**：由 `feMorphology` 侵蝕差集產生，不是第二個 path、不是漸層。
3. **金泥細線**：只給水與線性母題。
4. **群化**：Poisson-disk 撒點，一叢 2–4 枚，全畫面 6–12 叢。

程序化型紙產生器（可直接抄）：

```js
/* 波打つ閉輪郭。lobes 與 depth 一改，就從洲浜變成松丸、雲、花 */
function lobed(cx,cy,r,lobes,depth,seed,squash=1){
  const rnd=rng(seed), p=[], n=lobes*2;
  for(let i=0;i<n;i++){
    const a=i/n*Math.PI*2-Math.PI/2;
    const rr=r*((i%2)?1-depth:1)*(0.90+rnd()*0.20);
    p.push([cx+Math.cos(a)*rr, cy+Math.sin(a)*rr*squash]);
  }
  return closedCR(p,0.62);   // Catmull-Rom → 三次貝茲，閉合
}
```

**明文禁用**：`feTurbulence` 手抖邊（那是迷幻海報的語彙）、半調網點、細線幾何線描、寫實描繪、外部圖片、任何用來表現體積的 gradient。

---

## 九、Logo 與 Favicon

* Logo = 一枚**沒骨色面**（三葉洲浜形，套 `#tkl` 大溜込）＋ 兩條金泥弧線 ＋ 縱書字。整個 logo 用的是與插畫完全相同的一支引擎。
* Favicon = 64×64：金地方塊 + 群青洲浜形 + 一條金泥弧。inline SVG data URI，不得使用點陣圖。

```html
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' fill='%23BE9A45'/%3E%3Cpath d='…' fill='%232A4E90'/%3E%3Cpath d='M10,50 A22,15 0 0 1 54,50' fill='none' stroke='%23F0DCA0' stroke-width='2.6'/%3E%3C/svg%3E">
```

---

## 十、Do & Don't

**Do**

* 讓金地占最大面積，並且讓它動（很慢地）。
* 讓同一個母題重複出現，而且重複得看得出來。
* 讓主題被畫框切斷。
* 把所有長文放在胡粉紙上。
* 縱書用在落款、品書、木札。

**Don't**

* **不可**　用 noise／紙紋／顆粒去「做舊」金地——琳派的地是金屬，不是紙。
* **不可**　用 gradient 表現體積（那會直接殺掉溜込）。
* **不可**　給色面描輪廓線。
* **不可**　圓角、模糊陰影、glassmorphism、紫藍漸層 hero。
* **不可**　置中大標＋副標＋兩顆按鈕＋三張圓角卡片。
* **不可**　用 emoji 當 icon（icon 一律自繪 SVG）。
* **不可**　把金泥拿去填面（立刻變成廉價金色）。
* **不可**　Lorem ipsum、「在當今快節奏的世界」式 AI 腔、「EST. 19xx」徽章。
* **不可**　用「和風極簡」的米白＋細線去代替金地——那是另一個流派。

---

## 十一、頁面骨架範例

```html
<!DOCTYPE html><html lang="ja"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="icon" href="data:image/svg+xml,…">
<link href="https://fonts.googleapis.com/css2?family=Shippori+Mincho+B1:wght@400;600;800&display=swap" rel="stylesheet">
<style>/* 見第三～六章 */</style></head><body>
<svg width="0" height="0" style="position:absolute"><defs>
  <filter id="tk">…</filter><filter id="tks">…</filter><filter id="tkl">…</filter>
</defs></svg>
<div class="wrap">
  <header class="head">
    <a class="mark" href="./"><svg><path d="…" fill="#2A4E90" filter="url(#tk)"/></svg><b>店名</b></a>
    <nav class="nav"><!-- 溜込已滲：現用頁那一枚套 filter --></nav>
  </header>
  <main>
    <section class="byobu-stage">
      <div class="byobu" id="byobu">
        <div class="pane p0"></div><!-- …六扇。background-size:600% 100%，各扇 position 0/20/…/100% -->
      </div>
      <div class="rakkan"><p class="tate">落款　<span class="tcu">26</span>年秋</p></div>
    </section>
    <div class="pad"><div class="col2">
      <div class="kami"><h1 class="dai">標題</h1><p>長文一律在紙上。</p></div>
      <div class="kami">…</div>
    </div></div>
  </main>
</div>
<footer class="foot">…</footer>
</body></html>
```

屏風的排版（六扇連續一張畫）：

```css
.byobu{display:flex;width:100%}                      /* 無 JS：攤平，畫全出 */
.pane{flex:1 1 0;height:100%;background-size:600% 100%;transform-origin:left center}
.pane.p0{background-position:0%}   .pane.p1{background-position:20%}  /* …到 100% */
.byobu.js{display:block}
.byobu.js .pane{position:absolute;flex:0 0 auto;will-change:transform}
```

```js
/* 折る：投影寬度 = w·cosθ，扇的傾角交替 ± */
const k=Math.cos(ang*Math.PI/180), w=host/(6*k);
let x=0;
panes.forEach((p,i)=>{ const s=i%2?-1:1;
  p.style.width=w+'px';
  p.style.transform=`translateX(${x}px) rotateY(${s*ang}deg)`;
  p.style.setProperty('--sh',`rgba(25,23,18,${s>0?ang/44*0.26:ang/44*0.03})`);
  x+=w*k; });
```

---

## 十二、技術實作與相容性

本站只用三項核心技術，各屬不同層，且都在承載上面五個特徵之一。

### 1. SVG `feMorphology`（A 渲染層）— 承載特徵 2「溜込」

* **它做什麼**：`operator="erode" radius="r"` 對 alpha 做形態學侵蝕，退一圈得到「芯」；把芯塗亮再疊回原形，剩下的環就是濃邊。整個厚度感沒有用到任何 gradient。
* **支援現況（2026-09-03 查證）**：MDN《`<feMorphology>`》與 caniuse `mdn-svg_elements_femorphology` 標示 **Baseline Widely available，2015 年 7 月起跨瀏覽器**（Chrome 5+／Firefox 3+／Safari 6+／Opera 10+）。
* **Fallback**：濾鏡不支援時瀏覽器直接忽略 `filter` 屬性，色面退為平塗的沒骨形。版面、資訊、可讀性完全不變，只是失去厚度。本站的 `giho.html` 上提供「侵蝕〇」按鈕，可以當場看見這個降級長什麼樣。
* **效能**：`filter` 在合成階段執行。本站對同時在畫面上的濾鏡節點設上限——屏風的畫在建置階段就輸出成靜態 SVG data URI（濾鏡烘進那張圖，執行期零重算），執行期會逐幀改變 `radius` 的只有**簽名動效的那一個元素**，且只有 900ms。
* 來源：[MDN feMorphology](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/feMorphology)、[caniuse](https://caniuse.com/mdn-svg_elements_femorphology)

### 2. `writing-mode: vertical-rl` ＋ `text-combine-upright`（C 版面與樣式層）— 承載第四章「縱書」與特徵 1 的落款

* **它做什麼**：落款、品書、菓子控的節氣欄、木札上的銘全部縱組；`text-combine-upright: all` 把兩位數字併成一格（縦中横），這是日文縱排的正字法。
* **支援現況（2026-09-03 查證）**：caniuse `mdn-css_properties_text-combine-upright` 標示 **well established，2022 年 3 月起跨瀏覽器**；Firefox 48+ 起支援、Firefox for Android 135+。`writing-mode` / `text-orientation` 早已 Baseline widely available。
* **重要限制**：`text-combine-upright: digits` 的支援**沒有跟上**（caniuse 另有獨立條目），因此本站只使用 `all`，並且只包在明確的 `<span class="tcu">` 上。
* **Fallback**：不支援 `text-combine-upright` 時數字改為縱向逐字排列，字仍然是可選取的一般文字；不支援 `writing-mode` 時全部退為橫排，資訊零損失。
* 來源：[caniuse text-combine-upright](https://caniuse.com/mdn-css_properties_text-combine-upright)、[MDN text-orientation](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/text-orientation)

### 3. Poisson-disk 標本化（Bridson 1997，E 資料與生成層）— 承載特徵 4「群化」

* **它做什麼**：在畫面上撒株的中心點，保證任兩點距離 ≥ r，但**不排成格子**。格子會讓畫面變成紋樣（那是另一個流派）；純亂數則會結塊與重疊。
* **相容性**：純 JavaScript（`Math`／陣列），無瀏覽器 API 依賴，沒有支援缺口。
* **決定性**：搭 `FNV-1a → mulberry32`，同一顆種子恆得同一組配置，因此屏風的畫可以在建置階段先算好輸出成靜態 SVG，執行期不需要 JS 也是完整的一張畫。
* **效能實測（Node 22，單執行緒）**：1200×520、r=74，平均 **0.349 ms／次**（50 次平均），產生 79 點，實測最小距離 74.82 ≥ r。首屏不執行此運算（畫已烘成 data URI）。

### 效能預算（本站實測）

| 項 | 預算 | 實測 |
|---|---|---|
| 單頁大小（含 inline 全部資源） | ≤350KB | index 68.0KB／kashi 78.3KB／mei 39.6KB／giho 36.2KB |
| 首屏 JS 執行 | ≤100ms | 首屏 JS 只做 DOM 查詢與一次 `layout()`（6 次 `style.transform` 寫入），無 Poisson、無 SVG 生成 |
| 主要動畫 | 60fps | 環境動效為單一 `transform` 的 compositor 動畫；折り每幀只寫 6 個 `transform` 與 6 個自訂屬性，**不做任何 `getBoundingClientRect`**（無 layout thrashing）；簽名動效同時只作用於一個節點 |
| 外部資源 | 僅 Google Fonts | 零外部圖片、零音檔、零 JS 函式庫 |

---

## 十三、驗收清單

* [ ] 遮住全部文字，首屏能不能在三秒內被說出「這是琳派／金地屏風」？
* [ ] 金地面積 ≥40%，而且看得到箔目接縫？
* [ ] 畫面上找得到 gradient 嗎？找到就是錯的。
* [ ] 每一個色面都沒有描邊嗎？
* [ ] 同一枚型紙重複出現了嗎？看得出來嗎？
* [ ] 主題有被畫框切斷嗎？有一整塊什麼都不放的金嗎？
* [ ] 四種動效（環境／輸入／轉場／簽名）都在嗎？`prefers-reduced-motion` 下都降級了嗎？
* [ ] 長文有沒有不小心放到金地上？
