---
name: dada-generative-collage-style
description: Dada-inspired collage design system with seeded generative layouts, torn-paper components, letterpress ransom typography, and stipple dotwork illustration in a mono-ink plus vermilion palette.
---

# 達達生成式拼貼風格 DADA GENERATIVE COLLAGE

範例站:骰與針 DICE & NEEDLE(台北點描刺青工作室,虛構示意)。
本技能書描述如何做出「像一陣風吹過 1920 年代印刷廠」、但每一張紙片都被亂數種子精確管住的網站。

## 一、設計哲學

1. **機遇是素材,控制是手藝。**達達的「剪碎、搖勻、抽出」負責表情;seeded PRNG 負責讓表情可重現。混亂必須是設計出來的混亂。
2. **每次載入都不一樣,同一 seed 永遠一樣。**版面不是定稿,是機率分布;seed 是這一版的身分證,URL 就是分享機制。
3. **紙感優先。**一切元件都假裝自己是紙:撕邊、膠帶、郵戳、蓋章、投影。數位感(圓角、漸層光暈、毛玻璃)一律禁止。
4. **嘴砲有邊界。**文案幽默嘴砲,但涉及安全、衛生、法規的區塊立即轉正經,並用視覺標示(「本區不擲骰」章)宣告切換。
5. **極密而不糊。**堆疊要多、留白要少,但層與層之間用旋轉角、投影與 z-index 保持可讀;內文區永遠鋪在拼貼之上。

## 二、色彩系統(mono-ink 墨階+朱紅印章色)

全站本質上是單色印刷+一支朱紅印泥,不允許第三種彩度。

| 變數 | 值 | 用途 |
|---|---|---|
| `--paper` | `#e7e2d5` | 底紙(疊 5px 點紋 `radial-gradient(rgba(26,22,17,.05) 1px, transparent 1px)`) |
| `--paper2` | `#f2eee2` | 紙片、卡片(比底紙亮,製造「新貼上去」感) |
| `--paper3` | `#dcd5c3` | 沉底區段、暗一階的紙 |
| `--ink` | `#1a1611` | 主墨(近黑的暖褐黑,不用純黑) |
| `--ink2` | `#453f33` | 次級文字 |
| `--faint` | `#8d8574` | 註記、編號、mono 小字 |
| `--red` | `#bf2f1c` | 朱紅:印章、強調、價格、錯誤。**版面占比 < 5%** |
| `--line` | `#c6bfab` | 分隔線、表格線 |

規則:朱紅永遠是「蓋上去」的(印章、圈選、底線),不是「印上去」的(大面積底色禁止);深色區用 `--ink` 當底、`--paper2` 反白,再以 `#cfc8b4`/`#9a917d` 做深底上的次級灰。

## 三、字體系統(活字混排規則)

- 中文內文:`Noto Serif TC`(明體=鉛字味);中文標題 900 weight。
- 介面與按鈕:`Noto Sans TC` 700/900(黑體=標籤紙)。
- 編號、seed、機器語:`Rubik Mono One`(等寬=打字機/檢字房)。
- **贖金信混排(ransom)**:大標逐字打散,每字隨機取 4 種字面(serif 900/sans 900/serif italic 600/sans 緊排)、約 26% 機率反白(`--ink` 底、`--paper2` 字)、字級 0.86–1.26em、旋轉 ±5–6°、上下位移 ±0.15em。全部由 seed 決定,不用 CSS random hack。
- 中英並置:中文大字配 mono 小字英文註(`letter-spacing: 2px`、`--faint`),像圖鑑學名。

## 四、版面與網格(seeded PRNG 生成式版面規則)

**核心:同一 seed → 同一版。所有隨機值一律出自 seeded PRNG,禁用裸 `Math.random()`(唯一例外:產生新 seed 本身)。**

```js
// 1) 字串雜湊 → 2) mulberry32 PRNG
function xmur3(str){let h=1779033703^str.length;for(let i=0;i<str.length;i++){
  h=Math.imul(h^str.charCodeAt(i),3432918353);h=(h<<13)|(h>>>19);}
  return function(){h=Math.imul(h^(h>>>16),2246822507);h=Math.imul(h^(h>>>13),3266489909);
  return (h^=h>>>16)>>>0;};}
function mulberry32(a){return function(){a|=0;a=(a+0x6D2B79F5)|0;
  let t=Math.imul(a^(a>>>15),1|a);t=(t+Math.imul(t^(t>>>7),61|t))^t;
  return ((t^(t>>>14))>>>0)/4294967296;};}
const rngFrom=s=>mulberry32(xmur3(String(s))());
```

- **seed 格式**:6 碼,字元集 `23456789ABCDEFGHJKMNPQRSTUVWXYZ`(去除 0/O/1/I/L 避免抄錯)。
- **URL 重現機制**:讀取 `?seed=`(`/^[A-Za-z0-9]{1,12}$/` 驗證後轉大寫),無效或缺席則 `newSeed()`。站內連結加 `class="keep-seed"`,載入時改寫 href 為 `path?seed=SEED#hash`,跨頁同版。
- **命名空間**:每個用途一條獨立流,`rngFrom(SEED+'#layout')`、`SEED+'#type'`、`SEED+'#roll'+n`……避免改動一處打亂全站;與 seed 無關的固定圖樣用內容鍵,如 `rngFrom('ink-'+id)`。
- **參數範圍(超出即失控)**:
  - 紙片旋轉 **-6° ~ +6°**(`r()*12-6`);卡片與預覽收斂到 ±3.5~4°。
  - 拼貼卡寬 13–20%;flash 卡 6–8 張、字塊 5、雜件 5、印章 2+1 郵戳。
  - 撕紙每邊 **3–5 個頂點**、抖動 jitter 3.2–5(見下節)。
  - 膠帶水平位置 10–64%。
  - 位置採「槽位表 + shuffle」:先手排一組不互相壓死的座標槽,seed 只負責洗牌與微調,避免純隨機造成重疊災難。
- **洗牌**:Fisher–Yates,以同一條 rng 流:`shuffle(arr,r)`。

## 五、元件配方

- **撕紙卡**:`--paper2` 底 + `clip-path: polygon(...)`,由 `tornClip(r, jitter)` 生成——四邊各取 3–5 點、每點抖 ±jitter/2(clamp 0–100%),得到不重複的毛邊。投影用 `filter: drop-shadow(0 2~4px 3~6px rgba(26,18,8,.25~.4))`,讓 clip 後的形狀也有影子。
- **膠帶角**:半透明米色小矩形 `rgba(201,192,166,.85–.9)`,`clip-path: polygon(3% 12%, 97% 0, 100% 88%, 0 100%)`,旋轉 ±3–4°,貼在卡頂 `top:-9px`。
- **郵戳/橡皮章**:圓形 `border: 3px solid var(--red)` + 旋轉 + `opacity:.82–.85`;虛線版(`border-style: dashed`、mono 8–9px、`--ink2`)當郵戳,寫店名、部門、seed。
- **書籤錨點目錄**:右緣固定一列撕紙標籤(`--ink` 底反白、左緣撕口 clip-path、`translateX(7px)` 半藏),hover 滑出並轉 `--red`;行動版轉為頂部橫向可捲列。奇偶交替兩種撕口多邊形。
- **價格/編號**:一律 mono + `--red`;區段編號用「紅框斜章」(`border: 2px solid var(--red)`、`rotate(-3deg)`)。
- **seed 主控台**:mono 大字顯示 seed、複製分享連結、再擲一次、輸入 seed 重現,是品牌儀式的核心元件。

## 六、動效規則

- **洗牌開場**:拼貼載入時所有紙片先疊在中央(`.shuffling` 強制 left/top)、抖 0.28s(riffle keyframes),0.3s 後移除 class,紙片各自滑回槽位(`transition: .38s cubic-bezier(.2,.8,.3,1)` + 每片 0–0.12s 隨機 delay)。總長壓在 0.8s 內。
- **發牌**:抽卡 `dealIn` 0.42s,自上方 -42px 旋 9° 落下,槽位間 delay 0.12s。
- **hover**:標籤滑出、卡片描紅框、按鈕反白,全部 ≤0.2s,不做飄浮循環動畫。
- **reduced-motion 降級**:`@media (prefers-reduced-motion: reduce)` 下關閉 scroll-behavior、所有 transition/animation(`.01ms`),洗牌與發牌直接就位——內容完整,只是不表演。JS 端同步以 `matchMedia` 判斷,跳過 `.shuffling`/`.deal`。

## 七、插畫風格(stipple 點描 dotwork)

不畫線稿,寫**密度場**:`fn(x,y) → 0~1`,再用蒙地卡羅取樣把場變成點。

- 幾何工具:橢圓距 `ellU`、線段距 `segD`、多邊形內外 `inPoly`、邊緣距 `edgeD`;輪廓用 `rim(u)`(0.8<u≤1 時回 0.93)壓出深色描邊,高光/瞳孔直接令 den=0。
- 取樣:9,000 次均勻取樣,`r() < den*0.92` 才落點;點半徑 `(0.42+r()*0.5)*(0.7+0.6*den)`——密處的點更大,亮部既疏又小。
- 輸出:所有點串成單一 `<path d="M..a..a..">`(兩段圓弧畫實心圓),`fill="currentColor"`,SVG `viewBox="0 0 100 100"`;每圖一條固定 rng 流(`'ink-'+id`)+ 快取,與版面 seed 無關,圖樣永遠長一樣。
- 質感:陰影用 `sin` 波紋密度(蛇腹、木紋),分面用密度階差(骰子三面 0.12/0.5/0.8),禁止灰色填色。
- 肖像同法:臉低密 0.07、髮鬚高密 + sin 紋、五官用短線段與圓點;可加**一小簇朱紅取樣點**(耳環、絨球)作為第二 `<path fill="var(--red)">`。

## 八、Logo 與 Favicon 指南

- **Logo(`assets/logo.svg`)**:標誌=一根長針(漸尖線段 + 頂端針眼小環)貫穿等距投影點描骰子;以 node 腳本用同一套 mulberry32 密度場離線生成,**固定 1,999 顆墨點 + 1 顆朱紅圓點(左面中央點數)= 兩千顆**,可重現。字標三行:骰與針(serif 900、「與」朱紅)/DICE & NEEDLE(mono、& 朱紅)/小字 sans。獨立 SVG 不能吃站內 CSS 變數,顏色寫死 `#1a1611`/`#bf2f1c`/`#8d8574`。
- **Favicon**:32×32 inline data URI——旋轉 -6° 的墨色圓角方塊上四顆點(骰子四點),其中一顆 `#bf2f1c`。與 logo 同語彙、不同簡化層級。三頁共用同一串 data URI。

## 九、Do & Don't

**Do**
- 所有隨機值走 seeded PRNG,並為每個用途開命名空間流。
- 旋轉角 clamp 在 ±6°、朱紅 <5%、撕紙頂點 3–5 個——先訂範圍再擲骰。
- 站內互連一律 `keep-seed`,讓「同一版」跨頁成立。
- 在頁腳與控制台露出 seed,把機制當品牌敘事講出來。
- 衛生、法規、安全內容切回正經語氣,並以視覺章戳標示。
- SVG 一律程式生成、單色 currentColor,禁外部圖片。

**Don't**
- 不用裸 `Math.random()` 排版(重整就無法重現,seed 形同虛設)。
- 不用跑馬燈、閃爍霓虹、無限循環飄浮動畫——達達是印刷品,不是賭場招牌。
- 不寫「EST. 19xx」式假年份、不留 Lorem ipsum、不用 emoji 當圖示(裝飾符號用活字雜件:※ № ¶ † ‡ ⁂)。
- 不加第三種彩色、不用純黑純白、不用圓角卡與毛玻璃。
- 不讓拼貼壓住可讀內文;hero 文字區永遠在最上層。
- 嘴砲不越界:不拿衛生、疼痛風險、法定年齡開玩笑。

## 十、頁面骨架範例

```html
<!DOCTYPE html>
<html lang="zh-Hant">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>頁名|骰與針 DICE &amp; NEEDLE</title>
  <link rel="icon" href="data:image/svg+xml,...骰子四點...">
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;700;900&family=Noto+Serif+TC:wght@400;600;700;900&family=Rubik+Mono+One&display=swap" rel="stylesheet">
  <style>:root{ --paper:#e7e2d5; --ink:#1a1611; --red:#bf2f1c; /* …全部 token… */ }</style>
</head>
<body>
  <header class="topbar"><!-- 品牌字標 + 三頁 nav(keep-seed)+ seedchip --></header>
  <nav class="tabs"><!-- 右緣撕紙書籤錨點:01 02 03… --></nav>
  <header class="page"><!-- kicker 章 + ransom H1(JS 生成)+ mono 副標 + lede + 橡皮章 --></header>
  <main>
    <section id="…"><!-- .sechead(紅框編號+H2+mono 英文)+ .seclede + 撕紙卡群 --></section>
    <!-- 正經區:--ink 底 + 「本區不擲骰」章 -->
  </main>
  <footer><!-- 品牌 + nav(keep-seed)+ 虛構聲明 + LAYOUT SEED --></footer>
  <script>
    /* xmur3 + mulberry32 + rngFrom + SEED(?seed= 驗證)*/
    /* 密度場 → stipplePath → SVG;ransom(H1);seeded 旋轉/膠帶 */
    /* seedchip 複製、keep-seed 改寫、location.hash 捲動 */
  </script>
</body>
</html>
```
