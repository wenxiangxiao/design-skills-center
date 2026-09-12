---
name: makie-lacquer
description: Japanese maki-e lacquer — a mirror-black urushi ground lit by one movable point light, gold rendered only as discrete sprinkled particles, hard-cut iridescent shell inlay, and 55%+ empty ground with the motif cropped by the object's edge.
---

# 蒔絵（漆器蒔繪）Maki-e Lacquer

> 這是「漆器蒔繪」的風格規格書。它不綁定產業——同一套語言可以做筆店、樂器行、香道、珠寶、酒莊、美術館。
> 一句話定義：**地不是黑色，是一面會反光的漆；金不是顏色，是一顆一顆撒上去的粉。**

---

## 一、設計哲學

蒔絵（まきえ）字面是「撒出來的畫」。它的製作順序與所有平面設計相反：

1. 先用漆在黑色的器面上「畫」出圖案——但這時畫面上什麼都看不見，因為**漆是透明到深褐、且與底同色的**。
2. 趁漆還沒固化，把金粉、銀粉從竹筒裡篩下去。粉只黏在剛畫過的地方。
3. 等它硬化，把多餘的粉拂掉。**拂掉之後剩下的東西，才是圖。**

三件事因此成為這個流派的骨架，設計時不能忘：

- **形是被光決定的，不是被線圍出來的。** 蒔絵沒有輪廓線。一片楓葉之所以是楓葉，是因為那個範圍的粉比周圍密。所以本風格**明文禁止 `stroke` 描邊**——一旦描邊，它就變成蒔絵版畫或印刷品，不再是漆器。
- **金是離散的。** 真正的蒔絵在近距離看是一堆顆粒，不是一塊金色色塊。任何一處「用 `fill:#D4AF37` 填滿當金」的作法，都會立刻把這個風格關掉。
- **餘白是主角。** 器物上七成以上是空的黑漆。漆器的價值感來自那片什麼都沒有、卻會照出你的臉的面。填滿它，就變成印度卡車藝術或迷幻海報——那是別的流派的美德。

還有一個容易被忽略的性格：**這個流派的時間感是「等」。** 漆不是乾，是吸收水氣硬化，一層要在濕度七十五％的木箱裡待兩三週。做這個風格的網站時，把「慢」寫進文案與工程表，比任何裝飾都更像蒔絵。

---

## 二、本風格的 5 個不可省略特徵

> 判準：拿掉任何一項，它就不是蒔絵了。五項在頁面上必須全部找得到。

### 特徵 1｜鏡面黑地與單一可移動的光源

地色**不是** `#000000`，也不是任何一塊靜止的深色。它是一面會反光的漆面：畫面上永遠有一條方向性的高光帶，而且它的位置由一個光源決定。零紙紋、零噪點、零 `noise` 貼圖、零 `box-shadow` 模糊——漆的質感全部來自反射，不來自材質貼圖。

```css
:root{ --urushi:#0A0907; --lx:38%; --ly:20%; }
html,body{ background:var(--urushi); }
/* 面：一個由游標驅動的點光源 */
body::before{
  content:""; position:fixed; inset:0; pointer-events:none;
  background:radial-gradient(120% 90% at var(--lx) var(--ly),
    rgba(122,112,96,.19) 0%, rgba(30,27,23,.10) 34%, rgba(0,0,0,0) 72%);
  transition:background .18s linear;
}
/* 環境：一條 22 秒掃過的反射帶（不需要輸入也存在） */
body::after{
  content:""; position:fixed; inset:0; pointer-events:none; opacity:.5;
  background:linear-gradient(104deg, rgba(0,0,0,0) 38%,
    rgba(150,138,116,.055) 47%, rgba(0,0,0,0) 56%);
  animation:sweep 22s linear infinite;
}
@keyframes sweep{ 0%{transform:translateX(-42%)} 100%{transform:translateX(42%)} }
```

```js
addEventListener('pointermove',function(e){
  document.documentElement.style.setProperty('--lx',(e.clientX/innerWidth*100).toFixed(1)+'%');
  document.documentElement.style.setProperty('--ly',(e.clientY/innerHeight*100).toFixed(1)+'%');
},{passive:true});
```

### 特徵 2｜蒔粉：金永遠是離散的粒，且有粒度與密度梯度

金與銀一律畫成一顆一顆的粉。粉有**粒度**（粗目／中目／細目）與**密度梯度**（梨地＝地上薄撒，永遠一邊濃一邊淡）。三段明度分群（暗粒／中粒／亮粒）是必要的——它們代表同一堆粉裡朝向不同的顆粒。

```js
/* 一枚蒔絵圖 = 在遮罩內用決定性亂數撒點。ko.grain 是粒徑，decay 造成濃淡 */
function flakes(mask, ko, n, rnd, decay){
  var out=[];
  while(out.length<n){
    var u=rnd(), v=rnd(), m=mask(u,v); if(m<=0) continue;
    var dry=decay*(0.30*u+0.70*v);            // 右下較乾＝較稀
    if(rnd() > m*(1-dry)*ko.tsuki+0.06) continue;
    out.push([u,v,(0.55+rnd()*0.9)*ko.grain, rnd()]);
  }
  return out;
}
```

```html
<!-- 三段明度分群；小尺寸時一粒＝一個 1–3px 的角，肉眼與圓無異而體積少四成 -->
<g fill="#8A6C26"><circle cx="112.4" cy="88.1" r="0.9"/>…</g>
<g fill="#D6A93B"><circle cx="118.2" cy="86.7" r="1.2"/>…</g>
<g fill="#F2D48A"><circle cx="121.0" cy="90.3" r="1.6"/>…</g>
<!-- 小圖版本 -->
<path fill="#D6A93B" d="M112 88h2v2h-2zM118 86h1v1h-1z…"/>
```

### 特徵 3｜平蒔絵與高蒔絵：同一畫面上必須有「平的金」與「有高度的金」

平蒔絵貼在面上、沒有投影；高蒔絵下面盛了炭粉與漆，有稜、有高光線、有一道實心的投影。兩者在同一版面上並存，讀者才能看出這是漆器而不是燙金印刷。**投影一律是實心位移色塊，不准模糊。**

```css
.hira{ /* 平蒔絵：無高度 */ filter:none; }
.taka{ /* 高蒔絵：稜上一條亮線 + 一塊實心位移影 */
  background:
    linear-gradient(102deg, rgba(242,212,138,.85) 0 6%, rgba(0,0,0,0) 6.5%),
    #8A6C26;
  box-shadow:2px 3px 0 0 #050403;   /* 實心，零模糊半徑 */
}
```

### 特徵 4｜螺鈿：直線切出的貝片，邊緣銳利，顏色隨光角轉

貝一定是用刀「割」開的，所以是三角、四角、五角，**沒有一片是圓的、沒有一片有圓角**。顏色不是貝的顏色，是層厚造成的干涉色，會在青綠—桃紫之間位移；不會轉色的螺鈿就不是貝。面積上限約 4%。

```html
<polygon points="182,96 199,104 190,121 176,112" fill="#4FC2B0" opacity=".72"/>
<polygon points="243,74 258,79 250,93"          fill="#7FA9C9" opacity=".64"/>
```

```glsl
// 片段著色器裡的干涉色：由半程向量決定色相，不是由位置決定
vec3 ir = 0.5 + 0.5*cos(vec3(0.0,2.1,4.2) + ndh*9.0 + shellSeed*3.0);
col = mix(col, ir*(0.30+0.70*ndl) + vec3(1.0)*pow(ndh,90.0)*0.7, shellMask);
```

### 特徵 5｜餘白與切邊構圖：紋樣偏心、被器物邊緣切斷、黑地 ≥55%，切金排在一條斜線上

主紋樣**不置中**，而且要有一部分被器物的邊緣切掉（走出畫面）。切金（截成小塊的金箔）永遠沿**一條**斜線排列，不可散落——散落就和粉分不出來了。落款與銘用直排，貼著版面右緣。

```css
.plate{ position:relative; overflow:hidden; }      /* 紋樣被邊緣切斷 */
.mei{ writing-mode:vertical-rl; text-orientation:upright;
      position:absolute; right:2%; top:-6%; letter-spacing:.30em; }
.mei .num{ text-combine-upright:all; }             /* 縦中横：算用数字 */
```

```js
/* 切金：一條斜線上的 9–21 片 */
for(var z=0;z<n;z++){
  var t=z/n, x=(0.10+t*0.78)*W, y=(0.90-t*0.74)*H, s=1.6+rnd()*1.9;
  out += '<rect x="'+x+'" y="'+y+'" width="'+(s*2.1)+'" height="'+s+
         '" transform="rotate(-24 '+x+' '+y+')"/>';
}
```

---

## 三、色彩系統

| 色 | hex | 比例 | 用途 |
|---|---|---|---|
| 呂色漆黑 urushi | `#0A0907` | 約 58% | 全站地色。**必須**帶反射（見特徵 1），不是平塗黑，不鋪任何紋理 |
| 金粉 kin | `#D6A93B` | 約 16% | 中粒。連結、強調、現用態 |
| 金粉（亮粒）| `#F2D48A` | 上列之內 | 迎光的粒與切金；亮粒約佔粉的 14% |
| 金粉（暗粒）| `#8A6C26` | 上列之內 | 背光的粒、金具、細分隔；暗粒約佔粉的 45% |
| 銀粉 gin | `#B9BFB4` | 約 7% | 銀蒔絵、次級數值。銀在敘事上「會沉」，用作抑制色 |
| 朱漆 shu | `#9E2B1E` | 約 6% | 只給拒絕、警示、器物內側。**不得當地色** |
| 螺鈿 raden | `#4FC2B0`／`#7FA9C9` | ≤4% | 只給貝片；不得當文字色或連結色 |
| 胡粉 gofun | `#C9C3B4` | 正文 | 正文與長文；不是純白（純白在漆上會浮） |

規則：

- **零漸層**——除了「光造成的漸層」（radial/linear 的反射帶、圓筒的明暗）之外，一切色塊都是實色。品牌漸層、按鈕漸層一律禁止。
- **金不得作為大面積填色。** 需要一塊金的地方，改成一塊「密度接近 1 的粉」。
- 三段金的明度順序（暗 → 中 → 亮）不可對調；亮粒最少，否則整面會發糊。

---

## 四、字體系統

- 標題／正文：**Shippori Mincho B1**（400／600／800）——日文明朝，橫細直粗、有筆鋒，與漆面的細高光同一種銳利。中文專案可換 Noto Serif TC 700/900，但**不得**換成黑體：黑體會讓畫面變成現代精品，不是漆器。
- 拉丁與數字：**Cormorant Garamond**（300／500），`letter-spacing:.22em`、`text-transform:uppercase`，只做標籤與數值，字級永遠比日文小一階。
- 字級（rem 基準 16px）：`h1 27px / h2 24px / h3 16px / body 16px / 標籤 10–12px`。**行高 1.95–2.10**——漆器的呼吸很慢，行距緊了就不對。
- 字距：日文標題 `.06em–.14em`，直排落款 `.24em–.34em`。
- 粗體用 600，不用 800 以上做內文；800 只用於單一頁面上的一個字組。

---

## 五、版面與網格

- 最大寬 1180px，左右留白 32px（≤900px 收為 20px）。
- **不置中。** 主體物件橫置佔滿寬，落款直排壓在右緣外三分之一處。
- 空白率：首屏 ≥55% 是沒有內容的黑漆。段落之間 `padding:56px 0`。
- 分隔線：1px `#221E19`，**永不使用 2px 以上的粗線**（粗線是版畫語彙）。
- 圓角：全站 `border-radius:0`，唯一的例外是器物本身的實際形狀（筆軸的圓端、貝片不得有圓角）。
- 卡片：不使用卡片。內容直接躺在漆面上；需要分區時用 1px 線與空白，不是容器。
- 表格：`border-collapse:collapse`，只有底線，無外框、無斑馬紋。
- RWD：≤900px 單欄、導覽攤為等寬橫列；≤560px 隱去拉丁小標與直排落款（落款資訊在頁尾以橫排重複，資訊零損失）。

---

## 六、元件配方

### 導覽（研ぎ艶 togi-gloss）

四頁＝四片黑漆牌。未選中的牌**吸光**（無高光層）；現用頁的牌是「研過的」，唯一會把光彈回來的一片——它的樣子隨游標改變。

```css
nav.togi a{ position:relative; background:#100E0C; color:#6F6A60; padding:13px 10px 11px;
            width:98px; text-align:center; overflow:hidden; border:0; }
nav.togi a::after{ content:""; position:absolute; inset:0; opacity:0; pointer-events:none;
  background:radial-gradient(150% 130% at var(--lx) var(--ly),
    rgba(224,212,186,.42) 0%, rgba(120,110,92,.16) 30%, rgba(0,0,0,0) 62%);
  transition:opacity .2s linear; }
nav.togi a[aria-current="page"]{ color:#E7E0CE; background:#0C0A09; }
nav.togi a[aria-current="page"]::after{ opacity:1; }
nav.togi a:hover::after{ opacity:.45; }
```

### 按鈕

```css
.btn{ background:transparent; color:#D6A93B; border:1px solid rgba(214,169,59,.45);
      padding:11px 22px; letter-spacing:.14em; font-family:inherit; }
.btn:hover{ background:rgba(214,169,59,.10); color:#F2D48A; }
.btn.shu{ color:#D97A6A; border-color:rgba(158,43,30,.6); }   /* 拒否・警告 */
```

### 表單

```css
.fld input,.fld select{ background:#0C0A09; border:1px solid #221E19; color:#D9D2C1;
  font-family:'Cormorant Garamond',serif; font-size:16px; padding:9px 11px; }
.fld input:focus{ outline:2px solid #D6A93B; outline-offset:1px; }
/* 選択肢：checked のとき金地に黒字（漆に金が乗った状態） */
.opts input:checked+span{ background:#D6A93B; border-color:#D6A93B; color:#0A0907; }
```

### 落款・箱書（直排）

```html
<div class="hako">
  <div class="col tate sm">工房名　四代目　高津甫仙</div>
  <div class="col tate">流水楓　丸粉三号</div>
  <div class="col tate big">銘　澪影</div>
  <div class="col tate sm">甲第四二七号　令和八年<span class="tcu">8</span>月</div>
</div>
```

```css
.tate{ writing-mode:vertical-rl; text-orientation:upright; }
.tcu{ text-combine-upright:all; }
.hako{ background:#0C0A09; display:flex; justify-content:center; gap:16px; padding:22px 18px; }
```

### 頁尾

1px 上框線，三欄（地址與電話／取扱／頁面），字級 13px、行高 2.1，全部小字用 `#5D584F`。

---

## 七、動效規則（四種，缺一不可）

| 種類 | 內容 | 觸發 | duration / easing |
|---|---|---|---|
| ambient 環境 | 反射帶橫掃整個漆面；梨地粉粒微微閃爍（著色器內以時間相位） | 無需輸入 | 22s linear infinite／閃爍 1.6s 相位 |
| input 輸入 | 點光源跟游標；高光與投影即時重算；導覽現用牌的映像改變 | pointermove／Alt+方向鍵 | CSS `.18s linear` + rAF 緩衝係數 0.22（延遲 <100ms） |
| transition 轉場 | 被せ蓋——跨頁時黑蓋由下往上蓋住舊頁、再退開露出新頁 | 頁面導覽 | out .30s / in .34s `cubic-bezier(.4,0,.2,1)` |
| **signature 簽名** | **乾きゆく面**——漆的光澤本身就是計時器：面越乾越不反光，也越黏不住粉。使用者不看讀數，看面 | 核心功能開始後由時間驅動 | 置き時間 6s 恆濕；之後 `wet=exp(-(t-6)/15.5)`；50s 到底 |

降級（四種都必須有，且資訊零損失）：

```css
@media (prefers-reduced-motion: reduce){
  body::after{ animation:none; transform:translateX(0); }   /* ambient 停在基準角 */
  body::before{ transition:none; }                          /* 光源改為 25% 一格的離散位置 */
  ::view-transition-old(root),::view-transition-new(root){ animation:none; }
}
```

- input：`reduce` 時光源改為量化到 25% 一格，仍然會動、仍然指示方向，只是不連續。
- signature：`reduce` 時面的光澤改為每 5 秒一階的離散變化，**剩餘秒數與濕度百分比恆以文字並列顯示**，所以看不見光澤變化也不損失任何資訊。

---

## 八、插畫與圖像風格（makie-strata 蒔粉分層構成）

全站**只有四種圖像原語**，不得引入第五種：

1. **粉粒 flake**——決定性亂數在遮罩內取樣得到的點，帶粒徑與明度分群。
2. **下絵 shita**——「還濕的漆」的隱函數場：由帶寬度的折線（`cap`）、圓（`disc`）、環（`ring`）與五裂片的葉（`leaf`）取最小距離組成，`d<=0` 即遮罩內。它自己**永遠不被畫出來**，只決定粉黏在哪。
3. **螺鈿 raden**——直線切出的多邊形。
4. **切金 kirikane**——一條斜線上的小矩形。

硬規則：

- **零 `stroke`。** 全站不得有任何描邊線。
- 零照片、零外部圖片、零 `feTurbulence` 手抖濾鏡（那是迷幻海報的語彙，會糊掉粉粒的邊）、零半調網點、零細線幾何線描。
- 判準：**拿掉光，畫面上什麼都不該剩下。** 如果你的圖在全黑無光下仍然讀得出輪廓，你畫的是印刷品不是漆器。
- 同一個 seed 必得同一張圖（FNV-1a → mulberry32），靜態版在建置階段烘成 SVG 寫進頁內，**沒有 JavaScript 也是完整的一件漆器**。

---

## 九、Logo 與 Favicon

Logo＝**一團粉**。不要畫字的外框、不要畫器物剪影：在一塊黑漆上撒約 190 顆金粉（三段明度），旁邊排屋號。這比任何圖形標誌都更準確地說明「這家做什麼」。

```html
<svg viewBox="0 0 240 64" xmlns="http://www.w3.org/2000/svg">
  <rect width="240" height="64" fill="#0A0907"/>
  <!-- 決定性亂數撒 190 顆：r>2.1 用 #F2D48A，r>1.3 用 #D6A93B，其餘 #8A6C26 -->
  <circle cx="23.4" cy="18.2" r="2.3" fill="#F2D48A"/> …
  <text x="76" y="40" fill="#E7E0CE" font-family="serif" font-size="27" letter-spacing="7">屋号</text>
  <text x="77" y="53" fill="#8A857A" font-family="Georgia,serif" font-size="8" letter-spacing="4.2">ROMAJI CITY</text>
</svg>
```

Favicon：同一件事縮到 32×32，九顆粉，`data:image/svg+xml,` 內嵌於 `<head>`，不用外部檔案。

---

## 十、Do & Don't

**Do**

- 讓地色會反光；讓光可以被使用者移動。
- 把金畫成粉；讓粉有濃淡。
- 留下 55% 以上什麼都沒有的黑。
- 把紋樣推到偏心並讓它被邊緣切掉。
- 把「等待」寫進文案：工程表、乾燥日數、為什麼快不了。
- 落款、證書、編號用直排。

**Don't**

- 用 `#000000` 平塗當地色，或鋪紙紋／噪點／材質貼圖。
- 用一塊實心金色當金（`fill:#D4AF37` 的大色塊）。
- 給任何東西描邊（`stroke`）、圓角（`border-radius`）、模糊陰影（`box-shadow` 帶 blur）。
- 用金色漸層、玫瑰金、香檳金、鏡面反射漸層那一套「奢華模板」——那是精品風不是漆器。
- 把螺鈿畫成圓形或有機曲線。
- 把切金散落各處。
- 置中三張卡片、紫藍漸層 hero、emoji icon、Lorem ipsum、「EST. 19xx」徽章。
- 讓畫面安靜：四種動效缺一即未完成。

---

## 十一、頁面骨架範例（可直接使用）

```html
<!DOCTYPE html><html lang="ja"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%230A0907'/%3E%3Ccircle cx='15' cy='19' r='1.8' fill='%23F2D48A'/%3E%3C/svg%3E">
<link href="https://fonts.googleapis.com/css2?family=Shippori+Mincho+B1:wght@400;600;800&family=Cormorant+Garamond:wght@300;500&display=swap" rel="stylesheet">
<style>
:root{--urushi:#0A0907;--kin:#D6A93B;--kin-hi:#F2D48A;--kin-lo:#8A6C26;--gofun:#C9C3B4;--lx:38%;--ly:20%}
*{box-sizing:border-box;margin:0;padding:0}
body{background:var(--urushi);color:var(--gofun);font-family:'Shippori Mincho B1',serif;font-size:16px;line-height:1.95}
body::before{content:"";position:fixed;inset:0;pointer-events:none;
  background:radial-gradient(120% 90% at var(--lx) var(--ly),rgba(122,112,96,.19) 0%,rgba(0,0,0,0) 72%);transition:background .18s linear}
.wrap{position:relative;z-index:1;max-width:1180px;margin:0 auto;padding:0 32px}
.lat{font-family:'Cormorant Garamond',serif;letter-spacing:.22em;text-transform:uppercase;font-size:12px;color:#8A857A}
.tate{writing-mode:vertical-rl;text-orientation:upright}
@view-transition{navigation:auto}
::view-transition-old(root){animation:lidout .30s cubic-bezier(.4,0,.2,1) both}
::view-transition-new(root){animation:lidin .34s cubic-bezier(.4,0,.2,1) both}
@keyframes lidout{to{clip-path:inset(0 0 100% 0)}}
@keyframes lidin{from{clip-path:inset(0 0 100% 0)}to{clip-path:inset(0 0 0 0)}}
</style></head><body>
<div class="wrap">
  <header style="display:flex;justify-content:space-between;padding:26px 0 0">
    <a href="index.html" style="color:#DED7C6;text-decoration:none;letter-spacing:.34em">屋号</a>
    <nav class="togi"><!-- 四片漆牌；現用頁 aria-current="page" --></nav>
  </header>

  <!-- 首屏：一件器物，65% 是空的黑。落款直排壓右緣 -->
  <div style="position:relative;min-height:52vh;display:flex;align-items:center">
    <svg viewBox="0 0 1100 236" style="width:100%"><!-- 粉粒・螺鈿・切金 --></svg>
    <div class="tate" style="position:absolute;right:2%;top:-6%;letter-spacing:.30em;color:#E6DECB">屋号</div>
  </div>

  <!-- 情報帯：1px 線で四分割。カードは使わない -->
  <div style="display:grid;grid-template-columns:repeat(4,1fr);border-top:1px solid #1E1B17;border-bottom:1px solid #1E1B17">
    <div style="padding:16px 18px;border-right:1px solid #1E1B17"><b class="lat">Where</b><br>住所</div>
    <!-- … -->
  </div>
</div>
<script>
addEventListener('pointermove',function(e){var r=document.documentElement;
 r.style.setProperty('--lx',(e.clientX/innerWidth*100).toFixed(1)+'%');
 r.style.setProperty('--ly',(e.clientY/innerHeight*100).toFixed(1)+'%');},{passive:true});
</script>
</body></html>
```

---

## 十二、技術實作與相容性

本站以三項技術承載風格。以下為 2026-08-16 查證的支援現況、fallback 具體行為與實測值。

### 1. 原生 WebGL 片段著色器（無函式庫）— 承載特徵 1／3／4

首頁的筆軸是一個全螢幕四邊形上的 GLSL 片段著色器：圓筒法線由 `nz=sqrt(1-cy*cy)` 解析求得，蒔粉的附著量與盛り上がり寫在一張 512×128 的 `RGBA/UNSIGNED_BYTE` 貼圖裡（R＝付着量、G＝高さ、B＝螺鈿遮罩），法線再由 G 通道的中央差分擾動，最後以 Blinn–Phong 求高光；粉粒本身是片段內的 hash 與付着量比較後決定的（`step(rnd, cov*0.92)`），因此縮放時粒徑恆定、不會被拉糊。

- **支援**：WebGL 1.0 自 2011 年起於全部主流瀏覽器可用；MDN 標示 `WebGLRenderingContext` 為 Baseline Widely available。本站只用 WebGL1 + GLSL ES 1.00，不使用任何擴充、不使用 `dFdx`／浮點貼圖／動態迴圈上限，因此不需要 extension 查詢。
- **fallback（三層，皆已實作）**：
  1. `getContext('webgl')` 回傳 null → 直接 return，頁面停在**建置階段烘好的靜態 SVG 筆軸**（同一支蒔粉引擎、同一組亂數種子產生），畫面與資訊完全不變。
  2. shader 編譯或連結失敗（`COMPILE_STATUS`／`LINK_STATUS` 為 false）→ 同樣 return 到靜態 SVG。
  3. 完全沒有 JavaScript → 靜態 SVG 本來就寫在 HTML 裡（canvas 預設 `opacity:0`，成功初始化後才由 `.live` 類別交換），故無 JS 亦是完整的一件漆器。
- **效能實測**（Node 22 / 同一段數學的 CPU 版本，作為上界參考）：512×128 貼圖建置一次 8.4 ms（只在載入時跑一次）；每幀 GPU 端為單一 draw call、六個頂點，CPU 端每幀只做 3 個 uniform 寫入與一次 `drawArrays`，零 `getBoundingClientRect`、零 layout。DPR 上限鉗在 1.7。
- **`prefers-reduced-motion`**：時間相位 `uT` 傳 0（粉粒不閃）、光源固定在基準角 (0.34, 0.24)，畫面靜止但仍是完整的漆面。

### 2. View Transitions API（跨文件）— 承載轉場動效

四個頁面之間以 `@view-transition{navigation:auto}` 做「被せ蓋」：舊頁被 `clip-path:inset(0 0 100% 0)` 由下往上蓋住，新頁反向退開。

- **支援（2026-08-16 查證 MDN《View Transition API》與 caniuse）**：同文件轉場為 **Baseline Newly available**（Chrome/Edge 111+、Safari 18+、Firefox 133+）；**跨文件**（MPA）轉場目前為 Chrome/Edge 126+ 與 Safari 18.2+，**Firefox 尚未支援**（仍在旗標後，預期 2026 年內落地）。因此本項在 Firefox 屬漸進增強。
- **fallback**：規格設計即為靜默降級——不支援 `@view-transition` 的瀏覽器完全忽略該 at-rule 與 `::view-transition-*` 偽元素，導覽退回一般的即時跳頁。**沒有任何內容或狀態依賴此轉場**，資訊零損失。
- **`prefers-reduced-motion`**：以 media query 把兩個 `::view-transition-*` 的 `animation` 設為 `none`，頁面直接切換。
- 注意事項：跨文件轉場要求同源且為一般導覽；本站四頁皆為相對路徑同目錄，符合。

### 3. `writing-mode: vertical-rl` ＋ `text-orientation` ＋ `text-combine-upright` — 承載特徵 5

落款、銘、箱書、受付票一律直排；其中的算用数字以 `text-combine-upright:all` 做縦中横。

- **支援（2026-08-16 查證 MDN）**：`writing-mode` 為 Baseline Widely available（2017 年起跨瀏覽器）；`text-orientation` 同屬 CSS Writing Modes Level 3、支援情況相同。`text-combine-upright` 的 **`all` 值**在現行主流瀏覽器可用，但 MDN 明載 **`digits` 值目前沒有任何瀏覽器實作**——因此本站只用 `all`，並以 `<span class="tcu">8</span>` 手動包住要橫置的數字，不依賴 `digits`。
- **fallback**：`text-combine-upright` 未生效時，數字改以直排逐字顯示——仍然可讀，只是排版較長。`writing-mode` 未生效時（極舊瀏覽器）直排區塊退回橫排，內容不變。
- ≤560px 隱去直排落款，同一資訊在頁尾以橫排完整重複。

### 4. 其它實作細節（非核心技術，但影響相容性）

- 核心功能「粉を蒔く」的蒔絵台以 **Canvas 2D** 逐幀重繪（`arc` + `globalAlpha`），最壞情況約 16,000 顆粉粒，實測單幀繪製在桌機約 6–9 ms；粉粒數達上限即停止產生。無 canvas 支援時，台面停在建置時烘好的靜態 SVG，而規則、三項判準、粉的規格表與工程表皆為一般 HTML，完整可讀。
- 決定性偽亂數為 FNV-1a → mulberry32；位移一律用 `>>>` 而非 `>>`（FNV 的結果是 uint32，用有號位移會得到負索引——本站第一版即栽在這裡）。
- 分享碼以 12 個十六進位字元序列化（下絵／粉／付き／ムラ／こぼし／見立て），`?m=` 可完整還原箱書。**但蒔いた手そのものは復元しない**：這是刻意的——蒔絵本來就不能重來。
- 單頁體積（含全部 inline 資源）：塗り面 226 KB／粉を蒔く 82 KB／紋様帖 334 KB／誂え 31 KB，皆在 350 KB 預算內。外部資源只有 Google Fonts 兩支字型。

---

*本 SKILL.md 隨 `sites/nashijido/` 交付。風格與內容分離：拿走這份規格書，換掉屋號、產業與文案，就是另一個蒔絵風的網站。*
