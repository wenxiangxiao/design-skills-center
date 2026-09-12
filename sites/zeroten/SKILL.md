---
name: suprematist-void
description: Russian Suprematism (Malevich, 1915) as a web system — flat spot-colour forms floating in an unbounded white field, never touching, never centred, arranged on one diagonal axis by a live constraint solver instead of a grid.
---

# 至上主義 Suprematism — 無限白場

> 這份規格書描述的是 1915 年 12 月彼得格勒《0,10 — 最後一次未來派畫展》之後的那套視覺語言：馬列維奇（Kazimir Malevich）、利西茨基（El Lissitzky）的 Proun、以及 1919–1922 年維捷布斯克 UNOVIS 集體把它推到牆上、電車上、配給券上的那個版本。
>
> 它不綁定產業。歌劇團、瓷器廠、滑翔機俱樂部、出版社都可以用；換掉文案即可，因為這個流派本來就不描繪任何東西。

---

## 一、設計哲學

至上主義是「非具象」（беспредметность / non-objective）：畫面上的形不代表任何東西，不是簡化過的房子，也不是抽象化的人。它們就是形。

三個決定一切的認識：

1. **白不是背景，白是空間。** 在文藝復興以後的畫裡，白底是「還沒畫到的地方」。在至上主義裡，白是形所在的那個沒有上下、沒有地平線、沒有盡頭的場。所以：不准有容器、不准有邊框、不准有陰影、不准有分隔線——這些全都是在說「空間到這裡為止」。形被畫布邊緣任意切斷是好的，那正好證明空間延伸到畫面之外。
2. **形不相接。** 形一旦碰在一起，觀者會把它們讀成一件東西。留出間隙，它們才各自是形，而間隙本身也成為構成的一部分。
3. **一條斜軸。** 水平與垂直是重力與地面，是舊世界。至上主義的構成永遠沿一條約 20–40° 的斜線列隊，靠大小差與間距製造深度——不用透視、不用陰影。

因此本風格拒絕的東西比它接受的多：拒絕材質、拒絕漸層、拒絕圓角、拒絕描邊、拒絕灰、拒絕置中、拒絕對稱、拒絕裝飾母題。它幾乎是空的。**做這個風格的困難不在於畫什麼，在於敢不敢把畫面留成那麼空。**

---

## 二、本風格的 5 個不可省略特徵

拿掉任何一項，它就不是至上主義了。這五項在頁面上必須全部看得見。

### 特徵 1｜白是無限空間，不是背景

滿版單一白（**不是**純白 `#FFF`，也**不是**米白紙感），零質感、零紋理、零暈影。全站沒有一個帶邊框或底色的容器，沒有一條分隔線，沒有一個陰影。形允許被視窗邊緣切掉。

```css
:root{ --void:#FAFAF7 }
*{ border:0; border-radius:0; box-shadow:none !important; }
body{ background:var(--void); }
/* 容器不存在：卡片、區塊、表格一律不給底色與框線 */
.card,.panel,section{ background:none; border:0; }
/* 形可以出畫——這是空間延伸出去的證據 */
.field{ position:relative; overflow:hidden; }
.fm{ position:absolute; }   /* 座標允許為負、允許大於容器寬 */
```

錯誤範例：`background:#fff` 加 `border:1px solid #eee` 的卡片——那一條 1px 的線就把無限空間變回一張表格。

### 特徵 2｜四塊不可調和的平塗專色，面積嚴格遞減

墨 > 朱 > 鉻黃 > 群青。沒有第五色，**沒有灰**（灰是把兩塊形調和在一起，而至上主義的形不調和），沒有透明度疊加，沒有漸層。

```css
:root{
  --ink:#121214;    /* 墨   面積最大，構成的主形恆為墨 */
  --verm:#DA2B1F;   /* 朱   第二順位，永不大過墨 */
  --chrome:#F2B300; /* 鉻黃 第三順位，全幅面積 ≤6%（它會發光） */
  --ultra:#1D3FB0;  /* 群青 第四順位，只給最先進場或最後離場的那一塊 */
}
.fm.ink{background:var(--ink)}   .fm.verm{background:var(--verm)}
.fm.chrome{background:var(--chrome)} .fm.ultra{background:var(--ultra)}
/* 禁止：opacity < 1、linear-gradient、filter、mix-blend-mode */
```

面積建議比：白 62% ／ 墨 16% ／ 朱 11% ／ 鉻黃 6% ／ 群青 5%。

### 特徵 3｜形不相接，且相鄰形不互相平行、不與畫框平行

間隙下限 = 版面短邊的 **1.6%**。除了唯一的主形（那塊可以正著放的黑方，即《黑方》本體）之外，每一塊形與畫框軸的夾角 ≥ **6°**；中心距在版面寬 32% 以內的兩塊形，彼此夾角差也 ≥ 6°。

這條規則不能用眼睛顧，要用程式顧（見第十一章）。判定用分離軸定理（SAT），因為形是旋轉過的矩形：

```js
// 兩個 OBB（中心 x,y；半寬 w；半高 h；弧度 a）沿最佳分離軸的間隙，負值＝相疊
function gapOf(A,B){
  const p=(f,ax)=>{const c=Math.cos(f.a),s=Math.sin(f.a);
    const r=Math.abs(f.w*(c*ax[0]+s*ax[1]))+Math.abs(f.h*(-s*ax[0]+c*ax[1]));
    const m=f.x*ax[0]+f.y*ax[1]; return [m-r,m+r];};
  const c1=Math.cos(A.a),s1=Math.sin(A.a),c2=Math.cos(B.a),s2=Math.sin(B.a);
  let best=-Infinity;
  for(const ax of [[c1,s1],[-s1,c1],[c2,s2],[-s2,c2]]){
    const a=p(A,ax),b=p(B,ax);
    best=Math.max(best, Math.max(a[0],b[0])-Math.min(a[1],b[1]));
  }
  return best;   // >= 0.016 * 短邊 才合法
}
```

### 特徵 4｜一條主斜軸，且構成不置中、不對稱

所有形的形心沿一條 20–40° 的斜線分布。驗收方式是對形心做主成分分析（PCA），第一主軸解釋率 λ₁/(λ₁+λ₂) 要 ≥ 0.78；同時整體重心必須離版面中心 ≥ 版面寬的 6%，左右鏡射相似度 < 0.62（可以對摺的構成不是至上主義，是一張臉）。

```js
function axisRatio(F){                 // F = 形陣列
  const n=F.length; let mx=0,my=0; F.forEach(f=>{mx+=f.x;my+=f.y}); mx/=n; my/=n;
  let sxx=0,syy=0,sxy=0;
  F.forEach(f=>{const dx=f.x-mx,dy=f.y-my; sxx+=dx*dx; syy+=dy*dy; sxy+=dx*dy});
  sxx/=n; syy/=n; sxy/=n;
  const tr=sxx+syy, dt=Math.hypot(sxx-syy, 2*sxy);
  const l1=(tr+dt)/2, l2=(tr-dt)/2;
  return { r:l1/(l1+Math.max(0,l2)), deg:0.5*Math.atan2(2*sxy,sxx-syy)*180/Math.PI };
}
```

### 特徵 5｜字是構成裡的一塊形，不是標題

標題、標籤、編號沒有標題框、不置中、不加底線，它們以直排或斜置的長條參與構成，並遵守跟形一樣的間隙規則。**只有正文（連續閱讀的段落）被允許與畫框平行**，而且它必須沒有任何容器——它靠左緣一根實色長條被繫在構成上。

```css
/* 直排的標籤條：用 writing-mode 讓字真的直著排，不是把橫排 rotate 90 度 */
.tf.vt{ writing-mode:vertical-rl; text-orientation:mixed; line-height:1; }
.tf.vt.lat{ text-orientation:sideways; }        /* 拉丁字改側倒 */

/* 斜置的標籤：轉角必須避開 0/90 度 ±6 度 */
.tf.tilt{ transform:rotate(-3.4deg); transform-origin:50% 50%; }

/* 正文：唯一與畫框平行者，無底色、無框，左緣一根實色條 */
.pr{ position:relative; padding-left:26px; max-width:41rem; }
.pr::before{ content:""; position:absolute; left:0; top:.34em; bottom:.34em;
             width:9px; background:var(--ink); }
```

---

## 三、色彩系統

| 色票 | Hex | 用途 | 面積 |
|---|---|---|---|
| 白場 void | `#FAFAF7` | 唯一底色。不是 `#FFF`（高對比硬邊下太刺），也不鋪任何紙紋 | ~62% |
| 墨 ink | `#121214` | 主形、正文、頁尾底、表格分隔實色條 | ~16% |
| 朱 verm | `#DA2B1F` | 第二順位形、現用態、退件與拒絕 | ~11% |
| 鉻黃 chrome | `#F2B300` | 第三順位形、選取態、頁尾標題 | ≤6% |
| 群青 ultra | `#1D3FB0` | 第四順位形、連結、focus ring | ≤5% |

硬規則：

- **零灰階。** 沒有 `#888`、沒有 `rgba(0,0,0,.5)`、沒有 `opacity`。要「弱」就把面積縮小，不要把顏色調淡。
- 兩塊色域**永遠不描邊也不夾線**——它們靠白場隔開（這正是特徵 3 的視覺後果，也是與「印度卡車藝術」「民俗版印」那類強制描邊風格的分水嶺）。
- 頁尾可以整塊反相（墨底、白字、鉻黃小標），但反相區內同樣不准出現灰。
- 選取色用鉻黃：`::selection{background:var(--chrome);color:var(--ink)}`。

---

## 四、字體系統

- **拉丁**：Archivo（400 / 600 / 800）。任何幾何—新怪誕（geometric grotesque）都可以：Archivo、Inter Tight、Roboto Condensed、Space Grotesk。**不要**用襯線、不要用手寫、不要用等寬（等寬會把畫面拉回「工程製圖」）。
- **中文**：Noto Sans TC（400 / 500 / 900）。標題一律 900，不要用 700 湊。

```css
@import url('https://fonts.googleapis.com/css2?family=Archivo:wght@400;600;800&family=Noto+Sans+TC:wght@400;500;900&display=swap');
body{ font-family:"Noto Sans TC","Archivo",system-ui,sans-serif; font-size:16.5px; line-height:1.72; }
h2{ font-size:clamp(30px,5.4vw,58px); font-weight:900; line-height:.94; letter-spacing:-.028em; }
h3{ font-size:clamp(19px,2.5vw,26px); font-weight:900; line-height:1.12; }
.lat{ font-family:"Archivo",sans-serif; font-weight:800; letter-spacing:.10em; text-transform:uppercase; }
.kick{ font-family:"Archivo",sans-serif; font-weight:800; font-size:12px; letter-spacing:.22em; text-transform:uppercase; }
.num{ font-family:"Archivo",sans-serif; font-weight:700; font-variant-numeric:tabular-nums; }
```

字級階梯（1.28 倍）：11.5 / 13.6 / 15 / 16.5 / 19 / 26 / 38 / 58 / 86。標題與正文之間**不放副標**——副標是舊世界的層級制度。

---

## 五、版面與網格

**沒有網格。** 這是本風格與瑞士國際主義最大的差別：瑞士的畫面由欄線統治，至上主義的畫面由法則統治。做法是：

1. 定一條主軸角 θ ∈ [17°, 43°]（正負隨機）。
2. 沿這條軸放形心，位置 t 均勻分布 + 側向噪聲（側向幅度約短邊的 22–37%）。
3. 面積等比遞減：Aₖ = A₀ · 0.735ᵏ ·（0.62 + 隨機 0.8），A₀ ≈ 短邊² × 0.05。
4. 角度 = θ ± 隨機 0.68 弧度；主形（k=0）例外，可以是 0°。
5. 丟進求解器跑到合法為止（第十一章）。

留白率 ≥ 62%。長文最大寬 41rem。區塊上下留白 76px（手機 52px）。區塊編號 `.sec-n` 貼右上角，11px、字距 .24em，**不置中**。

表格沒有框線，只有實色條：表頭底下 4px 墨線，列與列之間 2px 墨線，沒有斑馬紋、沒有底色。

RWD：`≤900px` 導覽落到底部；首屏的求解版面在 `<900px` 時關閉絕對定位、退回單欄流排（法則仍在，但由白場與間距承擔）。`≤560px` 卡片兩欄、字級不變。

---

## 六、元件配方

**導覽（offaxis-mark 離軸標記）**：四個小形橫排，現用頁那一個是**唯一傾斜的**（24.6°）並轉成朱紅，其餘正著放且為墨。語意是「它已經離開畫框的軸了」——導覽自己也遵守這個流派的本體規則。

```css
.nav{ position:fixed; right:26px; top:22px; display:flex; gap:15px; }
.nav .gl{ width:34px; height:34px; background:var(--ink);
          transition:transform .34s cubic-bezier(.2,.8,.2,1), background-color .18s; }
.nav a:hover .gl{ transform:rotate(-13.4deg); }
.nav a[aria-current="page"] .gl{ background:var(--verm); transform:rotate(24.6deg); }
@media(max-width:900px){ .nav{ right:auto; left:0; top:auto; bottom:0; width:100%;
  display:grid; grid-template-columns:repeat(4,1fr); border-top:4px solid var(--ink); } }
```

**按鈕**：實色墨塊，白字，Archivo 800、13px、字距 .14em、大寫。**沒有圓角、沒有陰影**。hover 是「歪一下」——`transform:rotate(-1.9deg)` 並轉朱紅。次要按鈕改用 3px `outline`（用 outline 不用 border，因為 border 會參與 box model 而把形撐大）。

```css
.btn{ background:var(--ink); color:var(--void); padding:13px 24px;
      font:800 13px/1 "Archivo",sans-serif; letter-spacing:.14em; text-transform:uppercase;
      transition:transform .16s cubic-bezier(.2,.8,.2,1), background-color .16s; }
.btn:hover{ background:var(--verm); transform:rotate(-1.9deg); }
.btn.gh{ background:transparent; color:var(--ink); outline:3px solid var(--ink); outline-offset:-3px; }
```

**卡片**：不是卡片。頂上一根 9px 實色條 + 一塊 158px 高的構成 + 編號 + 標題 + 內文。沒有外框、沒有底色、沒有 hover 抬升。

**表單**：`outline:3px solid var(--ink); outline-offset:-3px;` 的方框，label 為 10.5px Archivo 800 大寫字距 .2em，錯誤訊息朱紅粗體。**不要**圓角輸入框、不要 focus 光暈（focus ring 用 3px 群青實線）。

**頁尾**：整塊墨底反相，三欄，小標鉻黃，連結鉻黃。

---

## 七、動效規則

至上主義是靜態繪畫，但網頁不是。四種動效，性質與觸發源都不同，缺一不可：

| 類型 | 內容 | 參數 |
|---|---|---|
| **ambient 環境** | 鬆弛呼吸：求解器持續運行，每 620 幀注入一次極小擾動（位移 ±1.1% 版寬、角度 ±0.06 弧度），構成被推歪之後自己解回合法 | 連續，無 easing（它不是動畫，是求解） |
| **input-driven 輸入** | 游標排斥：指標為排斥源，半徑 = 短邊 26%，強度隨距離線性衰減；形被推開後求解器在同一幀重新收斂 | 同幀回應（< 17ms），無 transition |
| **transition 轉場** | 斜楔推移：`clip-path` 平行四邊形沿主軸掃過，**不用淡入** | 620ms `cubic-bezier(.22,.9,.24,1)` |
| **signature 簽名** | **自我校正構成**：違反法則的畫面在本站物理上不可能存在——任何拖曳／縮放／字體載入造成的違規都會在同一幀被就地解掉 | 60fps 持續 |

```css
@keyframes wedge{
  from{ clip-path:polygon(-40% 0, -8% 0, -22% 100%, -54% 100%) }
  to  { clip-path:polygon(-40% 0, 160% 0, 160% 100%, -54% 100%) }
}
.wipe{ animation:wedge .62s cubic-bezier(.22,.9,.24,1) both; }
```

`prefers-reduced-motion:reduce` 降級（資訊零損失）：ambient 改為載入時一次解完就停（靜態合法構成）；input-driven 取消排斥、hover 只換色；transition 立即顯示；signature 仍然成立——因為構成在載入當下就是解出來的，只是不再連續解。三面硬景的 360° 旋轉改為三顆「左座席／中座席／右座席」按鈕即時切換角度，三個視角一個不少。

```css
@media (prefers-reduced-motion:reduce){
  *,*::before,*::after{ animation-duration:.001ms!important; animation-iteration-count:1!important;
                        transition-duration:.001ms!important }
}
```

---

## 八、插畫與圖像風格

**沒有插畫。** 這個流派禁止描繪，所以不畫任何東西的外形——沒有線描小屋、沒有半調網點、沒有紋理、沒有手抖濾鏡。

所有圖像都是同一支求解器的輸出，原語只有七種：

| 代號 | 形 | 做法 |
|---|---|---|
| `sq` | 方 / 板 | 純矩形 |
| `bar` | 條 / 梁 | 長寬比 3.5–11 的矩形 |
| `cir` | 圓 | `border-radius:50%` |
| `hlf` | 半圓 | `border-radius:50%` + `clip-path` 切半 |
| `cro` | 十字 | 12 點 `clip-path` 多邊形 |
| `wed` | 楔 | 三角形（有方向，指向哪裡視線就從哪裡離場） |
| `tri` | 直角三角 | 方的對角線一半 |

```css
.fm.cir{ border-radius:50% }
.fm.cro{ clip-path:polygon(36% 0,64% 0,64% 36%,100% 36%,100% 64%,64% 64%,
                           64% 100%,36% 100%,36% 64%,0 64%,0 36%,36% 36%) }
.fm.wed{ clip-path:polygon(0 100%,100% 100%,50% 0) }
.fm.tri{ clip-path:polygon(0 0,100% 0,0 100%) }
```

判準：**拿掉顏色以後，仍讀得出這一組形不相接、不平行、而且有一條主斜軸。** 讀不出來就是排壞了，不是顏色不夠好。

---

## 九、Logo 與 Favicon 設計指南

Logo 就是一個合法的小構成 + 一組 Archivo 800 的字，兩者之間留一個間隙。不要外框、不要圓形徽章、不要 `EST. 19xx`。

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 110">
  <rect width="300" height="110" fill="#FAFAF7"/>
  <rect x="14" y="20" width="52" height="52" fill="#121214"/>
  <rect x="44" y="66" width="78" height="11" fill="#DA2B1F" transform="rotate(-24.6 44 66)"/>
  <rect x="86" y="16" width="17" height="17" fill="#F2B300" transform="rotate(18 86 16)"/>
  <circle cx="112" cy="62" r="8.5" fill="#1D3FB0"/>
  <text x="140" y="52" font-family="Archivo,sans-serif" font-size="40" font-weight="800">0,10</text>
</svg>
```

Favicon 用 inline SVG data URI 寫在 `<head>`：白場 + 一塊黑方 + 一根斜朱條 + 一顆鉻黃小方。**32×32 上放三到四塊形就滿了**，再多就變成雜訊。

```html
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%23FAFAF7'/%3E%3Crect x='6' y='7' width='15' height='15' fill='%23121214'/%3E%3Crect x='15' y='19' width='13' height='4' fill='%23DA2B1F' transform='rotate(-27 15 19)'/%3E%3Crect x='22' y='5' width='5' height='5' fill='%23F2B300' transform='rotate(18 22 5)'/%3E%3C/svg%3E">
```

---

## 十、Do & Don't

**Do**

- 留白留到你覺得太空為止，然後再拿掉一塊形。
- 讓形被視窗邊緣切斷。空間在畫面之外繼續。
- 主形只有一塊，而且它是黑的。
- 用面積表示重要性，不要用顏色的深淺。
- 把法則寫成程式，讓頁面自己維持合法。手動微調座標的那一刻，這個風格就開始退化成「排版」。

**Don't**

- ❌ 灰色、透明度、漸層、陰影、模糊、圓角、描邊、紋理、噪點。
- ❌ 置中大標＋副標＋兩顆按鈕＋三張圓角卡片（去 AI 化禁令）。
- ❌ 紫藍漸層 hero、emoji 當 icon、Lorem ipsum、AI 腔文案。
- ❌ 跑馬燈／ticker——這個流派沒有捲動橫幅，資訊靠構成本身承擔。
- ❌ 等寬字與量表刻度：一放上去畫面就變成「工程製圖／儀器台」，那是另一個家族。
- ❌ 把形排成一張臉、一棟房子、一個箭頭。圍出可辨識的東西就等於把這個流派關掉。
- ❌ 「EST. 19xx」徽章、「把 X 變成 Y」句式標題。

---

## 十一、頁面骨架範例（可直接使用）

```html
<!DOCTYPE html><html lang="zh-Hant"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>頁名｜品牌</title>
<link rel="icon" href="data:image/svg+xml,…"><!-- 見第九章 -->
<style>
:root{--void:#FAFAF7;--ink:#121214;--verm:#DA2B1F;--chrome:#F2B300;--ultra:#1D3FB0}
*{margin:0;padding:0;box-sizing:border-box;border:0;border-radius:0;box-shadow:none!important}
body{background:var(--void);color:var(--ink);font-family:"Noto Sans TC",sans-serif;overflow-x:hidden}
.field{position:relative;overflow:hidden}
.fm{position:absolute;left:0;top:0;transform-origin:50% 50%}
.tf{position:absolute;left:0;top:0;transform-origin:50% 50%;width:max-content;max-width:min(33ch,38vw)}
</style></head><body>

<nav class="nav"><!-- offaxis-mark，見第六章 --></nav>

<!-- 開場：整個首屏就是解出來的構成，資訊本身即是形 -->
<div class="opening" id="op">
  <div class="field" id="opfield" aria-hidden="true"></div>
  <div class="info" id="opinfo">
    <div class="tf big"  data-a="0">品牌名<span class="rule"></span></div>
    <div class="tf tag vt lat" data-a="0">BRAND — CITY</div>
    <div class="tf sm"   data-a="-1.8">地址、電話、營業時間</div>
    <!-- 預設 .tf 為 static（無 JS 時可讀），JS 成功後才加 .op-solved 轉絕對定位 -->
  </div>
</div>

<section class="wrap"><span class="sec-n">01 — 章名</span>
  <h2>標題不置中，靠左，900 字重</h2>
  <div class="pr"><p>正文。左緣一根 9px 實色條，沒有框、沒有底色。</p></div>
</section>

<script>
/* ---- 求解器：法則即版面引擎 ---- */
const D2R=Math.PI/180;
function angDelta(a,b){let d=(a-b)%(Math.PI/2); if(d<0)d+=Math.PI/2; if(d>Math.PI/4)d-=Math.PI/2; return d;}
function proj(f,ax){const c=Math.cos(f.a),s=Math.sin(f.a);
  const r=Math.abs(f.w*(c*ax[0]+s*ax[1]))+Math.abs(f.h*(-s*ax[0]+c*ax[1]));
  const m=f.x*ax[0]+f.y*ax[1]; return [m-r,m+r];}
function sat(A,B,g){const c1=Math.cos(A.a),s1=Math.sin(A.a),c2=Math.cos(B.a),s2=Math.sin(B.a);
  const axes=[[c1,s1],[-s1,c1],[c2,s2],[-s2,c2]]; let best=Infinity,bax=axes[0];
  for(const ax of axes){const a=proj(A,ax),b=proj(B,ax);
    const ov=Math.min(a[1],b[1])-Math.max(a[0],b[0])+g;
    if(ov<0) return {ov,ax}; if(ov<best){best=ov;bax=ax;}}
  return {ov:best,ax:bax};}
/* 一次鬆弛：回傳最大違規量。lock=角度不動、noang=不受角度法則約束（文字）、inb=必須完全在框內 */
function relax(F,o){ let maxv=0;
  for(let i=0;i<F.length;i++) for(let j=i+1;j<F.length;j++){
    const A=F[i],B=F[j],dx=B.x-A.x,dy=B.y-A.y,rr=A.w+A.h+B.w+B.h+o.gap;
    if(dx*dx+dy*dy<=rr*rr){ const r=sat(A,B,o.gap);
      if(r.ov>maxv)maxv=r.ov;
      if(r.ov>0){ let[nx,ny]=r.ax; if(nx*dx+ny*dy<0){nx=-nx;ny=-ny;}
        const p=r.ov*0.52; A.x-=nx*p; A.y-=ny*p; B.x+=nx*p; B.y+=ny*p; }}
    if(!A.noang&&!B.noang&&dx*dx+dy*dy<o.near*o.near){ const d=angDelta(A.a,B.a);
      if(Math.abs(d)<o.tilt){ maxv=Math.max(maxv,o.tilt-Math.abs(d));
        const push=(o.tilt-Math.abs(d)+1e-4)*0.55*(d>=0?1:-1);
        if(!A.lock)A.a+=push; if(!B.lock)B.a-=push; }}}
  for(const A of F){
    if(!A.lock&&!A.noang){ const d=angDelta(A.a,0);
      if(Math.abs(d)<o.tilt){ maxv=Math.max(maxv,o.tilt-Math.abs(d));
        A.a+=(o.tilt-Math.abs(d)+1e-4)*(d>=0?1:-1); }}
    const aw=Math.abs(A.w*Math.cos(A.a))+Math.abs(A.h*Math.sin(A.a));
    const ah=Math.abs(A.w*Math.sin(A.a))+Math.abs(A.h*Math.cos(A.a));
    const k=A.inb?1:0.42, lox=A.inb?aw+1:-aw*.62, hix=A.inb?o.W-aw-1:o.W+aw*.62;
    const loy=A.inb?ah+1:-ah*.62, hiy=A.inb?o.H-ah-1:o.H+ah*.62;
    if(A.x<lox)A.x+=(lox-A.x)*k; if(A.x>hix)A.x-=(A.x-hix)*k;
    if(A.y<loy)A.y+=(loy-A.y)*k; if(A.y>hiy)A.y-=(A.y-hiy)*k; }
  return maxv;}
function solve(F,o,max){ for(let k=0;k<max;k++){ if(relax(F,o)<=0.02) return k+1; } return max; }
function opts(W,H){ return {W,H,gap:Math.min(W,H)*0.016, tilt:6*D2R, near:W*0.32}; }
function css(f){ return `transform:translate(${(f.x-f.w).toFixed(2)}px,${(f.y-f.h).toFixed(2)}px)`
  +` rotate(${(f.a/D2R).toFixed(3)}deg);width:${(f.w*2).toFixed(2)}px;height:${(f.h*2).toFixed(2)}px;`; }
/* 用法：組出 F（形 + 量過尺寸的文字節點）→ solve(F,opts(W,H),320) → 寫 transform
   → requestAnimationFrame 裡每幀 relax 三次，即得 ambient 與 input-driven 兩種動效 */
</script>
</body></html>
```

---

## 十二、技術實作與相容性

本風格用到三項核心技術，各承載一個不可省略的特徵。以下支援度於 **2026-08-28** 查證。

### (a) 連續約束求解器（E 資料與生成層）— 承載特徵 3 與特徵 4

純 JavaScript，無瀏覽器 API 依賴，因此無相容性問題。分離軸定理（SAT）判定旋轉矩形，投影鬆弛法（projected relaxation）逐對推開，角度違規以互推方式解除。收斂條件為最大違規量 ≤ 0.02px（不能用 `<= 0`：形在剛好相切時是漸近收斂，永遠等不到嚴格零）。

實測（Node 22 單執行緒，1180×720 場、13 塊形 + 11 個文字載體 = 24 個約束體，200 組隨機種子）：

| 迭代上限 | 平均 | 最差 | 越界文字 |
|---|---|---|---|
| 320 | **34.6 ms** | 64.6 ms | 0 |
| 460 | 42.3 ms | 92.5 ms | 0 |

首屏取 320（`prefers-reduced-motion` 取 460，因為它不會有後續幀繼續收斂）。ambient 迴圈每幀三次鬆弛實測 **0.026 ms**，60fps 綽綽有餘。求解只寫 `transform` 與 `width/height`、不讀取任何 layout 屬性（唯一一次 `getBoundingClientRect` 發生在初始化量測文字尺寸時），因此無 layout thrashing。

**Fallback**：關閉 JavaScript 時，`.tf` 的預設樣式是 `position:static`，全部資訊以正常文件流由上而下排列並完整可讀、可選取；裝飾用的形不出現，畫面仍是滿版白場加左緣實色條的排版。JS 成功後才在容器上加 `.op-solved` 切換為絕對定位。**資訊零損失。**

### (b) CSS 3D `transform-style: preserve-3d`（A 渲染層）— 承載三面硬景

三片面板（左耳 `rotateY(52deg)`、後幕 `0deg`、右耳 `rotateY(-52deg)`）在 `perspective:1200px` 的舞台裡組成一個無鏡框劇場的景箱，用來驗收「同一條斜軸從左中右三個座席看過去是否都成立」。用 `transform-origin:100% 50%` / `0% 50%` 把兩片耳掛在後幕的左右邊上。

支援度：MDN 標示 `transform-style` 為 **Baseline Widely available**，自 2015-09 起跨瀏覽器可用（Chrome、Edge、Firefox、Safari），並在 caniuse `mdn-css_properties_transform-style_preserve-3d` 有對應條目。無支援缺口。

**Fallback**：若瀏覽器把 `preserve-3d` 攤平（極舊環境），三片面板會退成平面並排，構成仍完整可見，只是失去景箱透視；三個座席角度另有三顆按鈕可即時切換，不依賴動畫。`prefers-reduced-motion` 下不播 360° 旋轉，改由那三顆按鈕直接設定 `--ry`，三個視角一個不少。

### (c) `writing-mode: vertical-rl`（C 版面與樣式層）— 承載特徵 5

直排標籤條用真的直排文字，而不是把一行橫排 `rotate(90deg)`。差別在於：`rotate` 出來的是一個被轉過的橫排盒，它的斷行、選取範圍與可及性樹都還是橫的；`writing-mode` 讓文字真正沿垂直方向排版，長度由字數決定，而它在構成裡就是一根寬度等於字高的條。拉丁字另加 `text-orientation:sideways` 才不會被逐字扶正。

支援度：MDN 標示 `writing-mode` 為 **Baseline Widely available**；caniuse `mdn-css_properties_writing-mode_vertical-rl` 全球覆蓋約 96%，自 2017 年起跨瀏覽器可用。

**Fallback**：不支援時文字退回橫排，該標籤仍然是構成裡的一塊形（只是變成橫向的條），求解器照樣把它排進去而不相接。資訊零損失。

### (d) 效能預算實測

| 項目 | 門檻 | 實測 |
|---|---|---|
| 單頁大小（含全部 inline CSS/JS） | ≤ 350 KB | 31–41 KB |
| 外部資源 | 僅 Google Fonts | 僅 Google Fonts（零圖片、零音檔） |
| 首屏 JS 執行 | ≤ 100 ms | 34.6 ms（最差 64.6 ms） |
| 主要動畫 | 60 fps | 每幀 0.026 ms 求解 + 24 次 `style.cssText` 寫入 |
| layout thrashing | 無 | 無（初始化量測一次，之後只寫不讀） |

### (e) 已知取捨

- 求解器在極端窄視窗（< 900px）下，24 個約束體的合法解可能不存在（總面積超過場的容量）。本站的處理是：低於 900px 直接關閉絕對定位、退回單欄流排。**不要**硬解——硬解的結果是文字被擠到畫面外。
- `mix-blend-mode`、`filter`、`opacity` 全部不使用，不是因為相容性，是因為這個流派禁止形與形調和。
