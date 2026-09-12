---
name: rinpa-gold-ground
description: Rinpa gold-ground painting as a web style — flat matte gold leaf with visible seams, wet-into-wet tarashikomi pooling, contours computed as deposit edges instead of drawn, cropped motifs and clustered voids.
---

# 琳派 金地 — Rinpa Gold-Ground

繁體中文規格書。讀完本文件即可在任何產業上重現這套視覺語言，不需要看 Demo。

---

## 一、設計哲學

琳派（Rinpa／りんぱ）不是一個師徒相承的畫派。俵屋宗達（十七世紀初）、尾形光琳（1658–1716）、酒井抱一（1761–1828）三人彼此相隔約一百年，誰也沒見過誰——後人是靠**臨摹前人的作品**把這個畫派接下去的（私淑）。所以琳派從一開始就是一套**可被拆解、可被複製的規則**，而不是一種個人筆性。這正是它適合寫成 SKILL.md 的原因。

三條哲學：

1. **金地是畫面，不是背景。** 金箔押在整面紙絹上，不留天地、不畫地平線、不做遠近。畫在金上的東西沒有處在任何空間裡——它們處在「金」上面。所以本風格禁止任何「場景」「景深」「陰影投射」。
2. **不描骨。** 琳派（尤其宗達—光琳一系）大量使用「沒骨」：不先勾輪廓線再填色，而是直接落色。畫面上看得到的邊，是顏料乾燥時被推到邊緣堆積而成的。**本風格把這件事寫成硬規則：全站不畫任何一條輪廓線；所有的邊都必須是從當下形狀算出來的沉積。** 兩塊同色顏料相接時，交界必須自己消失——因為兩池濕顏料本來就會合成一池。
3. **畫面之外還有畫。** 光琳的〈燕子花圖屏風〉、〈紅白梅圖屏風〉的母題都被畫布邊緣切斷。這不是構圖失誤，而是聲明：你看到的是一個更大的連續世界被裁下來的一塊。**裁ち落とし（crop）是本風格的語法核心**，網頁上的每一個容器邊緣都應該當成裁切線來用。

反過來說，本風格**不是**「日式高級感」「金色奢華」「和風極簡」。它有大量高飽和礦物色、有滿滿的植物、有厚重的平塗色塊；它唯一的克制在於**留白的位置**，不在色彩的濃淡。

---

## 二、本風格的 5 個不可省略特徵

> 拿掉任何一項，畫面就不再是琳派金地。每項附可直接複製的片段。

### 特徵 1｜金地：平坦、無漸層、看得見箔足

金箔是一枚一枚押上去的，標準一枚約 10.9cm 見方，接縫（**箔足**）永遠看得見，而且每一枚的色調有極細微的差。**禁止用一條 linear-gradient 假裝金色。** 金地必須是「格子＋逐枚微差」。

```css
:root{ --kin:#C8A44B; --seam:#A9873A; --haku:132px; }
.kinji{position:fixed;inset:0;z-index:-3;background:var(--kin);overflow:hidden;
 display:grid;grid-template-columns:repeat(auto-fill,var(--haku));grid-auto-rows:var(--haku)}
.kinji i{display:block;background:var(--kin);
 /* --t 為 0–1 的決定性亂數，逐枚寫入 inline style，無 JS 亦成立 */
 filter:brightness(calc(.965 + var(--t)*.072));
 box-shadow:inset -1px 0 0 var(--seam),inset 0 -1px 0 var(--seam),
            inset 1px 0 0 rgb(226 202 138 / .55),inset 0 1px 0 rgb(226 202 138 / .55)}
```

唯一允許出現漸層的地方是**「光」這一層**：一條非常慢、非常淡、會移動的反光帶。它不屬於版面，它屬於房間。

```css
.teri{position:fixed;z-index:-2;inset:-30% -60%;pointer-events:none;
 background:linear-gradient(104deg,transparent 34%,rgb(255 244 214 / .34) 47%,
                            rgb(255 248 226 / .10) 55%,transparent 66%);
 animation:teri 54s linear infinite}
@keyframes teri{from{transform:translate3d(-32%,-6%,0)}to{transform:translate3d(32%,6%,0)}}
```

### 特徵 2｜溜込み：輪廓是算出來的沉積，不是畫出來的線

在第一色還濕的時候落第二色，兩色互相滲，乾燥時顏料被推到邊緣堆積，於是**邊比中間深**。網頁上用 `feMorphology` 侵蝕 alpha、與原 alpha 做 `operator="out"` 得到一圈內側環帶，再填上該顏料的深色版本。整個群組共用一個濾鏡，所以**同色相接時共用邊會自己消失**。

```html
<filter id="dep-gun" x="-6%" y="-6%" width="112%" height="112%" color-interpolation-filters="sRGB">
  <feMorphology in="SourceAlpha" operator="erode" radius="1.2" result="core"/>
  <feComposite in="SourceAlpha" in2="core" operator="out" result="band"/>
  <feFlood flood-color="#1B354F" result="dep"/>          <!-- 顏料 × 0.58 -->
  <feComposite in="dep" in2="band" operator="in" result="rim"/>
  <feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="rim"/></feMerge>
</filter>

<!-- 同一顏料的所有形狀合成「一個 path」，才會共用沉積邊 -->
<path fill="#2E5A86" filter="url(#dep-gun)" d="M… Z M… Z M… Z"/>
```

**硬規則：全站 `stroke` 一律為 `none`。** 需要線的地方（枝、莖、水線）一律畫成**封閉的緞帶**（中心線＋法向偏移），不是描邊。

```js
function ribbon(pts, wf){            // wf(t) → 半寬
  const L=[],R=[];
  pts.forEach((p,i)=>{
    const a=pts[Math.max(0,i-1)], b=pts[Math.min(pts.length-1,i+1)];
    let dx=b[0]-a[0], dy=b[1]-a[1]; const d=Math.hypot(dx,dy)||1; dx/=d; dy/=d;
    const w=wf(i/(pts.length-1));
    L.push([p[0]-dy*w, p[1]+dx*w]); R.push([p[0]+dy*w, p[1]-dx*w]);
  });
  return catmullRomClosed(L.concat(R.reverse()));
}
```

### 特徵 3｜裁ち落とし：母題必被容器邊緣切斷

構圖生成時，主要的「流」必須從 `x = -0.09W` 走到 `x = 1.09W`——**兩端都在畫布外**。任何一個母題如果完整地待在畫框裡、四周都有餘裕，這個風格就垮了。

```css
.byobu .pn{overflow:hidden}          /* 切，不是縮 */
.pnart{position:absolute;inset:0;width:100%;height:100%}
```
```html
<!-- 同一幅畫被切成六扇：viewBox 位移，畫本身只有一份 -->
<svg viewBox="0 0 1200 420"><defs><g id="e">…</g></defs></svg>
<svg viewBox="400 0 200 420"><use href="#e"/></svg>   <!-- 第三扇 -->
```

### 特徵 4｜群と余白：裝飾集成二到四房，地留四成以上

琳派不是均勻散佈的圖樣（那是花紙）。裝飾**成房**，房與房之間是大片空金。實作上：先選 2–4 個「房心」落在流上，房內元素在 ±0.15W 內抖動，房外一律不放東西。

```js
const nc = 2 + Math.floor(rnd()*3);            // 房數
for (let c=0;c<nc;c++){
  const s = strands[Math.floor(rnd()*strands.length)];
  const ct = 0.12 + rnd()*0.76;                // 房心在流上的參數位置
  for (let j=0;j<3+Math.floor(rnd()*3);j++){
    const t = clamp(ct + (rnd()-0.5)*0.30, 0.02, 0.98);
    place(at(s,t), …);                          // 只在房心附近放
  }
}
```

驗收量：**金地（未被顏料覆蓋）面積 ≥ 42%**。本 Demo 首頁屏風實測 67.4%（1224×420 光柵化逐像素統計）。

### 特徵 5｜九色的天然顏料表，且朱 ≤ 3%

色不是設計師調的，是石頭磨的。粒子粗＝色濃，粒子細＝色白，**同一塊礦石出一整階**。可用的色只有這些：

```css
:root{
  --kin:#C8A44B;  --kin-seam:#A9873A;   /* 金箔・箔足 */
  --gun:#2E5A86;  --gunk:#22456A;       /* 群青・濃群青（藍銅礦） */
  --byg:#7FA0B8;                        /* 白群（細粒） */
  --rok:#3E7B60;  --rokk:#2C5B46;       /* 綠青・濃綠青（孔雀石） */
  --byr:#A9C2A4;                        /* 白綠（細粒） */
  --shu:#B4432C;                        /* 朱（辰砂）——畫面 ≤3% */
  --gofun:#F2ECDC;                      /* 胡粉（牡蠣殼） */
  --tai:#8C5A2B;  --gin:#6B6A63;        /* 代赭・銀（硫化して燻る） */
  --sumi:#201C16;                       /* 墨 */
}
```

一幅畫最多用四色——因為第二色必須趁第一色還濕的時候落下去，來不及落第五色。**色數少不是品味，是乾燥速度。** 把這條寫進文案裡，讀者就懂了。

---

## 三、色彩系統（比例）

| 色 | hex | 用途 | 面積 |
|---|---|---|---|
| 金地 | `#C8A44B` | 全站地色。永遠有東西畫在上面 | ~46% |
| 箔足 | `#A9873A` | 金地格子的接縫（1px inset shadow） | 線 |
| 胡粉（料紙） | `#F2ECDC` | **所有長文一律在紙上，不在金上** | ~18% |
| 群青 | `#2E5A86` | 水、花、連結色、主要按鈕 | ~12% |
| 濃群青 | `#22456A` | 溜込みの二色目 | ~3% |
| 白群 | `#7FA0B8` | 淺流、遠水 | ~5% |
| 綠青／濃綠青 | `#3E7B60` `#2C5B46` | 葉、蔦、苔 | ~7% |
| 白綠 | `#A9C2A4` | 若葉、岸、footer 連結 | ~3% |
| 墨 | `#201C16` | 正文、枝 | ~4% |
| 燻銀 | `#46443E` | footer 底、次要文字 | ~4% |
| 朱 | `#B4432C` | 現用態、焦點框、拒絕、印記 | **≤3%** |
| 代赭・銀 | `#8C5A2B` `#6B6A63` | 土坡、芒 | ≤3% |

對比：墨 `#201C16` on 胡粉 `#F2ECDC` ≈ 14:1；胡粉 on 燻銀 ≈ 9:1；群青 on 胡粉 ≈ 6.4:1。**金地上不放長文**（金 `#C8A44B` 對墨僅約 6:1，且箔足會干擾閱讀）——短標籤可以，段落不行。

禁止：紫藍漸層、任何 box-shadow 模糊光暈、任何 rounded corner ≥ 4px、金色的 metallic gradient。

---

## 四、字體系統

- 標題與內文：`"Zen Old Mincho","Noto Serif TC",serif`（明朝／宋體）。權重 400／700。
- **全站禁用等寬字體與 mono 數字**。琳派沒有工程感；數字用明朝體，必要時用漢數字（一二三／十／百）。
- 字級：`clamp(15px,1.02vw + 11px,17px)` 為基準，h2 `1.34em`、h3 `1.06em`、頁題 `clamp(24px,3.4vw,40px)`。
- 行高 1.9（橫組）／2.05（縦組）；字距 `.04em`（標題 `.1em`—`.34em`）。
- **縦組み是本風格的版面本體之一**：題箋、短冊、側註與敘事段落用直排（右→左），表格與表單維持橫排。

```css
.tate{writing-mode:vertical-rl;text-orientation:mixed;line-height:2.05;letter-spacing:.075em}
.tate-box{max-height:min(60vh,520px);overflow-x:auto;overflow-y:hidden}
.num{text-combine-upright:all;-webkit-text-combine:horizontal}   /* 縦中横：二位数 */
@media (max-width:560px){
  .tate-flow{writing-mode:horizontal-tb;max-height:none;overflow:visible;letter-spacing:.02em}
}
```

---

## 五、版面與網格

- 主欄 `max-width:1180px`，左右 `padding:30px`（≤560px 為 16px）。
- 非對稱兩欄：`7fr 5fr` 與 `5fr 7fr` 交替，**不要用 6fr 6fr**。
- 段與段之間用 `.void`（`clamp(28px,6vw,74px)` 的純金地）分隔——留白是元件，要顯式地放。
- **料紙（`.washi`）**：所有長文的載體。以 `clip-path` 做極輕的不規則四邊（撕紙口），實心位移陰影，絕不模糊。

```css
.washi{position:relative;background:var(--gofun);padding:26px 30px 28px;
 clip-path:polygon(0.4% 0,99.2% 1.1%,100% 98.6%,0.9% 100%);
 box-shadow:2px 3px 0 rgb(60 44 18 / .17)}
```

- 旋轉角：料紙不旋轉（貼在牆上的紙是平的）；只有 `clip-path` 的 0.4–1.4% 位移造成的「不正」。**不要用 transform:rotate 做手作感**，那是別的風格。
- 屏風（六曲一隻）：六扇 flex 排列，交替 `rotateY(±12°)`，容器 `perspective:2200px`，扇間 `margin-right:-0.9%` 補回投影損失，背面那些扇 `filter:brightness(.945)`。

---

## 六、元件配方

**導覽（合貝／pairing nav）**：四頁＝四枚貝。現用頁那一枚是**已經合上的一對**（左右兩殼並置，畫在貝口接得起來）；其餘三枚是單片。語意是「成對／闔上」，不是高亮。

```css
.kai{position:absolute;top:20px;right:22px}
.kai ul{list-style:none;display:flex;gap:12px}
.kai li.on::after{content:"";display:block;height:2px;background:var(--shu);margin:5px auto 0;width:58%}
.kai li:not(.on) a:hover .kv{transform:translateX(-5px)}
@media(max-width:900px){.kai{position:static;margin:16px auto 0}}
```

**按鈕**：無圓角、`clip-path` 微斜切、群青底胡粉字；hover 轉朱。

```css
.btn{font-family:inherit;letter-spacing:.1em;color:var(--gofun);background:var(--gun);border:0;
 padding:10px 22px;clip-path:polygon(1% 0,99% 2%,100% 97%,0 100%)}
.btn:hover{background:var(--shu)}
.btn.alt{background:transparent;color:var(--sumi);box-shadow:inset 0 0 0 2px var(--sumi)}
```

**表單**：`background:var(--gofun)`、`box-shadow: inset 0 0 0 1.5px` 當邊框（不用 border，因為 border 是「線」）、focus 換成群青 2px。焦點環一律 `outline:2.5px solid var(--shu)`。

**表格**：只有底線（`1px solid rgb(32 28 22 / .22)`），沒有直線、沒有斑馬紋、沒有外框。

**Footer**：燻銀底 `#46443E`、胡粉字、白綠連結。

---

## 七、動效規則（四式，缺一不可）

| 類 | 名 | 觸發 | 值 |
|---|---|---|---|
| ambient | 室の照り | 無 | `transform` 光帶 54s linear infinite；另有屏風開き角呼吸 38s ease-in-out（±4.5°） |
| input | 溜込みの落とし込み | hover／focus 貝與料紙 | 起動 <20ms；朱の一滴 `transform:scale(.04→1)` 460ms `cubic-bezier(.2,.86,.32,1)`，滴自身帶沉積邊，每幀重算 |
| transition | 屏風を開く／裱紙 | 進頁、送出 | 六扇 `rotateY(72°→±12°)` 660ms `cubic-bezier(.2,.92,.3,1)`、stagger 90ms；受書 `clip-path:inset(0 0 100% 0 → 0)` 580ms |
| **signature** | **沉積邊 deposit-rim** | 形狀改變的每一幀 | 無 duration——它不是動畫，是輪廓的算法。落とし込み擴張時，濾鏡對「當下的合併輪廓」重算，兩池顏料相觸的那一瞬間，共用邊自己消失 |

```css
.drop{transform-box:fill-box;transform-origin:50% 50%;transform:scale(.04);opacity:0;
 transition:transform .46s cubic-bezier(.2,.86,.32,1),opacity .12s linear}
.kaicard:hover .drop,.kaicard:focus-visible .drop{transform:scale(1);opacity:.92}
@keyframes hyogu{from{clip-path:inset(0 0 100% 0)}to{clip-path:inset(0 0 0 0)}}
```

降級（四式全部）：

```css
@media (prefers-reduced-motion:reduce){
  .teri{animation:none;transform:none}
  .pa,.pb{animation:none;transform:rotateY(12deg)}
  .uke{animation:none}
  *,*::before,*::after{animation-duration:.001ms!important;transition-duration:.001ms!important}
}
```
降級後：照り停在定點、屏風停在展開角、受書直接是最終畫面、落とし込み瞬間完成。**沉積邊在降級後完全不變**——它本來就不是動畫。資訊零損失。

禁用：淡入式滾動揭示、視差、數字滾動、跑馬燈、按壓硬陰影、`stroke-dashoffset` 描繪（本風格沒有 stroke，這一招在物理上不可能）。

---

## 八、插畫與圖像風格

技法名：**tarashikomi-ground 溜込み金地構成**。全站沒有一張外部圖片、沒有一張寫實描繪。所有圖像（屏風、貝、圖鑑、logo、favicon、印記）由六種原語生成：

1. **溜 pool** — 13 點極座標抖動封閉曲線（抖幅 ≤0.34），落在流的內部，用「濃一階」的同族顏料。
2. **流 ribbon** — 中心線＋寬度函數的封閉緞帶。一幅畫只有**一條主流**（寬 0.07–0.11H），其餘是細流（0.013–0.03H）。
3. **葉 blade** — 由基點沿角度伸出、寬度 `sin(π·t^k)` 的尖葉，可加 `curl` 讓它彎。
4. **花 blossom／iris** — n 枚水滴形花瓣併成一個 path。燕子花＝三枚垂れ＋三枚立ち。
5. **渦 crest** — 光琳波的白泡：阿基米德螺線的緞帶，寬度隨進程收細。
6. **点 dot** — 五點封閉曲線的不圓的圓。

判準：**拿掉全部顏色，仍然讀得出「哪一條是主流、哪些元素屬於同一房、每一房裡有幾株」。**

明文禁用：`feTurbulence` 手抖濾鏡（那是迷幻海報與里索的語彙）、半調網點、細線幾何線描、等角視圖、任何寫實描繪、任何 `stroke`。

---

## 九、Logo 與 Favicon

Logo＝**一對合上的貝**，畫在兩殼上的水在貝口接得起來，右側配明朝體字標。這是本風格 logo 的通用配方：**取一個會被切開的東西，把它畫成「切開後仍然接得起來」**。

Favicon 為 inline SVG data URI，只有三個形狀（金底、一條群青的流、一顆朱點）——16px 下仍可辨識。

```html
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%23C8A44B'/%3E%3Cpath d='M4 21c4-9 9-13 12-13s7 3 12 5' stroke='%232E5A86' stroke-width='3.4' fill='none'/%3E%3Ccircle cx='11' cy='11' r='3' fill='%23B4432C'/%3E%3C/svg%3E">
```

（favicon 是全站唯一允許出現 `stroke` 的地方——16px 下沉積邊看不見，成本不划算。這條例外要寫進規格，不要默默破例。）

---

## 十、Do & Don't

**Do**
- 金地佔 45% 上下，而且它是畫面不是底。
- 所有長文放在胡粉料紙上。
- 母題被容器邊緣切斷。
- 裝飾成房，房外空著。
- 同色顏料相接時交界消失。
- 縦組み用在題箋、短冊、敘事段落。
- 數字用明朝體或漢數字。

**Don't**
- ❌ 不要用 gradient 做金色（除了會移動的「照り」那一層）。
- ❌ 不要畫輪廓線、不要用 `stroke`、不要用 `stroke-dashoffset` 描繪動畫。
- ❌ 不要把母題完整地擺在畫框正中央、四周留等距餘白（那是商標，不是琳派）。
- ❌ 不要用等寬字、不要用 mono 數字、不要放圖號角標與量表（那是工程製圖族）。
- ❌ 不要模糊陰影、不要 rounded-2xl、不要 emoji icon、不要 Lorem ipsum。
- ❌ 不要「EST. 19xx」徽章、不要「把 X 變成 Y」句式、不要紫藍漸層 hero。
- ❌ 不要把朱用成品牌色（它 ≤3%，只給現用態、焦點、拒絕與印記）。
- ❌ 不要為了「和風」加圓窗、竹子、櫻花瓣飄落——那是另一種東西。

---

## 十一、頁面骨架範例

```html
<!DOCTYPE html><html lang="zh-Hant"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="stylesheet" href="…Zen+Old+Mincho…Noto+Serif+TC…">
<style>/* 上文 §2–§7 的 CSS */</style></head>
<body>
  <div class="kinji" aria-hidden="true"><i style="--t:.62"></i><!-- ×300 --></div>
  <div class="teri" aria-hidden="true"></div>

  <svg class="hid" aria-hidden="true"><defs>
    <!-- 每個顏料一個 dep-* 沉積濾鏡；clipPath vL / vR -->
  </defs></svg>

  <header class="mast">
    <p class="ttl">屋號</p><p class="sub">業種／所在</p>
    <nav class="kai"><ul>
      <li class="on"><a href="a.html" aria-current="page"><span class="kv">…合上的一對…</span><span class="kt">頁名</span></a></li>
      <li><a href="b.html"><span class="kv">…單片…</span><span class="kt">頁名</span></a></li>
    </ul></nav>
  </header>

  <main class="wrap">
    <section class="stage"><div class="byobu">
      <div class="pn pa"><svg class="pnart" viewBox="0 0 200 420"><use href="#e"/></svg>
        <div class="tz"><div class="tate"><p class="tzh">屋號</p><p>営業時間</p></div></div></div>
      <!-- ×6，pa/pb 交替 -->
    </div></section>

    <div class="void"></div>
    <section class="grid g-5-7">
      <div class="washi"><h2>標題</h2><p>長文一律在紙上。</p></div>
      <div><p class="tag">小標</p>…</div>
    </section>
  </main>

  <footer class="ft"><div class="ftin">…</div></footer>
</body></html>
```

---

## 十二、技術實作與相容性

本站三項核心技術，皆於 2026-08-29 查證。

### 12.1 `feMorphology` 沉積邊濾鏡（A 渲染層）

**承載**：特徵 2（唯一的輪廓來源）與簽名動效。
**查證**：MDN《`<feMorphology>`》標示 **Baseline Widely available**，自 2015-07 起跨瀏覽器（Chrome／Edge／Firefox／Safari 全支援）。`operator="erode"` 對 alpha 做形態學侵蝕，與 `feComposite operator="out"` 相減即得內側環帶。
**注意**：`radius` 為使用者座標單位，故同一個濾鏡用在不同 viewBox 尺度上，環帶粗細會跟著縮放——本站刻意利用這點（小貝的沉積邊比屏風細）。濾鏡區域必須放大（`x="-6%" width="112%"`），否則侵蝕結果會被預設的 `-10%/120%` 濾鏡框裁掉。
**fallback**：濾鏡不被支援時整個 `filter` 屬性被忽略，形狀照常以純色填充呈現——畫面仍然是完整的琳派平塗，只是少了深色的邊。**資訊零損失**（沒有任何資料編碼在沉積邊裡）。
**效能**：濾鏡按「顏料」分組，一幅畫最多 7 個被濾鏡的 `<path>`，本站單頁上限 24 幅（貝圖帖）＝ 168 個濾鏡群組，每個渲染面積 ≤ 215×96 CSS px。建議上限即為此數；若需更多，改為對整個 `<g>` 套一個濾鏡（同色會合流，這是特徵而非缺陷）。

### 12.2 `writing-mode` 直排＋`text-combine-upright` 縦中横（C 版面與樣式層）

**承載**：特徵 3 與 §4——題箋、短冊、工程說明、敘事段落全部直排右→左。這不是裝飾：屏風上的字本來就是直的，橫排會讓整個版式失去出處。
**查證**：MDN《`text-combine-upright`》標示 **Baseline**（well established），自 **2022-03** 起跨瀏覽器；Firefox 48+、Safari 完整支援（Safari 5.1–15.3 用的是非標準名稱 `-webkit-text-combine`，故本站同時寫上）。`writing-mode: vertical-rl` 與 `text-orientation: mixed` 為更早的 Baseline Widely available。
**fallback**：`text-combine-upright` 不支援時，兩位數字各佔一行高度分開直立——**文字仍然可讀、意義不變**，只是「二十二」佔兩格。`writing-mode` 不支援（極舊瀏覽器）時整段退為橫排，內容完全相同。
**RWD 紀律**：直排在 ≤560px 會逼使用者橫向捲動長文，故 `.tate-flow` 在窄螢幕改為橫排；短標籤與題箋維持直排。**不要為了風格犧牲手機閱讀**。

### 12.3 `transform-box: fill-box` ＋ SVG 元素的 CSS transform（B 動效與時間軸層）

**承載**：input 動效「落とし込み」——一滴朱從 `scale(.04)` 長到 `scale(1)`，且它自身帶沉積濾鏡，故擴張過程中邊界每幀重算。
**查證**：MDN《`transform-box`》標示 **Baseline Widely available**（Chrome 64+／Firefox 55+／Safari 11+，2018 年起跨瀏覽器）。選它而非動畫 SVG 的 `r` 幾何屬性，是因為 **Safari 對 `r` 這類 SVG 幾何屬性接受 CSS 自訂屬性與 `calc()` 的支援不完整**；`transform: scale()` 走的是 compositor，跨瀏覽器行為一致且不觸發 layout。
**fallback**：不支援 `transform-box` 時 `transform-origin` 會落在 SVG 的 viewBox 原點，滴會從左上角長出來而不是從中心——依然可見、依然是一滴顏料，只是位置不同；`prefers-reduced-motion` 下直接為最終狀態。

### 12.4 效能預算實測

| 項 | 值 |
|---|---|
| 構圖引擎（compose + paint，Node 22 單執行緒） | **0.199 ms／幅**（600 幅 119.3 ms） |
| 首頁 index.html（含 inline CSS＋靜態 SVG，零 JavaScript、零外部圖片） | **91.6 KB** |
| 合貝の席 awase.html（含構圖引擎） | **99.7 KB** |
| 貝圖帖 zu.html | **69.2 KB** |
| 誂え atsurae.html | **60.2 KB** |
| 外部資源 | 僅 Google Fonts 兩支字型；**零外部圖片、零音檔、零函式庫**。四頁皆遠低於 350 KB 上限 |
| 首屏 JS | index.html **完全沒有 JavaScript**（六曲屏風與四式動效全部由 CSS 與靜態 SVG 承擔）；zu/atsurae 首屏為靜態 HTML，JS 只做增強；awase 一局的卓＝7 幅 ≈ **1.4 ms** |
| 動畫 | 僅 `transform`／`opacity`／`clip-path`，不觸發 layout；金地 300 枚箔為靜態、無動畫 |
| 金地留白率（首頁屏風，1224×420 逐像素統計） | **67.4%**（規格下限 42%） |

### 12.5 生成與可重現

決定性偽亂數 FNV-1a → mulberry32：同一個 seed 永遠得到同一幅畫，故 `?te=` 分享碼可完整重現一整席（本站實測：重播六番，手数與番號完全一致）。**不要用 `Math.random()` 畫圖**——琳派是可被臨摹的畫派，你的引擎也應該是。

---

*本規格書隨 Demo 站「貝繋堂」一同發布。SKILL 定義風格，不綁定產業——同一套規則可以用在茶舖、書店、劇場或保險公司上。*
