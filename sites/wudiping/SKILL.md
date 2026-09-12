---
name: suprematist-void
description: Suprematism as a web layout system — hard-edged forms floating in an unbounded white void, one shared -33° tilt, three colours only, no grid, no borders, no shadows.
---

# 至上主義虛空 Suprematist Void

> 流派：至上主義 Suprematism（Kazimir Malevich，1915，俄國）
> 示範站：無地平 跳傘訓練所（sites/wudiping）
> 一句話：**白不是背景，白是主體。形只是浮在上面的東西，而且它們隨時可以離開。**

---

## 〇、本風格的 5 個不可省略特徵

這五項每一項都是「拿掉它就不是至上主義了」。做這個風格的站，先把這五項做出來，其餘都是細節。

### 1. 虛空是主體，不是背景

馬列維奇 1915 年〈黑方塊〉之後的作品，白色畫布不是「留白」也不是「底色」——他稱之為「無物象的沙漠」。畫面上沒有地平線、沒有畫框內的第二層邊界、沒有任何東西告訴你哪邊是上。**判準：白色面積 ≥ 55%，且整個頁面找不到一條分隔線、一個框、一張卡片。**

```css
/* 全站第一條規則：把所有預設的「容器感」關掉 */
*{margin:0;padding:0;box-sizing:border-box;
  border:0;border-radius:0;box-shadow:none;background-image:none}
:root{--void:#F2F2EF}
html,body{background:var(--void)}
/* 禁止事項（寫進 code review 清單）：
   border / border-bottom 分隔線、::after 的裝飾線、
   card 類的白底方塊、任何 rgba 陰影、任何 gradient */
```

段落之間靠**空白距離**分節，不靠線。標題與內文之間如果需要一個記號，用一塊實心色塊（`.bar{height:9px;width:170px;background:var(--red)}`），不要用 1px 線——1px 線是「框」的殘骸，色塊是「形」。

### 2. 有限的形狀語彙：長條・方・圓・十字・扇

至上主義的字彙表短得驚人：矩形長條、正方、圓、十字、三角／扇形。全部硬邊、平塗、無描邊、無圓角、無陰影、無漸層、無材質。**畫面上不應該出現任何「畫」出來的東西**——沒有插圖、沒有 icon、沒有照片。

```css
.f{position:absolute;
   left:calc(var(--x)*1%);top:calc(var(--y)*1%);
   width:calc(var(--w)*1%);height:calc(var(--h)*1%);
   transform:rotate(var(--r,0deg));transform-origin:50% 50%}
.blk{background:#0E0E10}      /* 黑 */
.rd {background:#E5301C}      /* 朱紅 */
.disc{border-radius:50%}      /* 圓是唯一允許 border-radius 的地方 */
```

```html
<!-- 一個典型的至上主義群：支配性大形 + 兩個遞減 + 一個圓 -->
<div class="f blk" style="--x:26;--y:33;--w:14;--h:25;--r:-33deg"></div>
<div class="f rd"  style="--x:47;--y:44;--w:7.5;--h:2.2;--r:-33deg"></div>
<div class="f blk" style="--x:44;--y:60;--w:5;--h:5;--r:0deg"></div>
<div class="f blk disc" style="--x:79;--y:47;--w:8;--h:12;--r:0deg"></div>
```

需要「圖」的時候（示意圖、頭像、產品圖），一律用同一組原語重新組出來，而不是換一種畫法。示範站全部的圖——首頁構成、八張隊形圖籍、logo、favicon、跳次印記、報名回執印記——都由同一支 `formSVG()` 產生，原語只有「一塊矩形 + 一塊小方」。

### 3. 一個全站共享的傾斜角 −33°

至上主義的動勢來自**一整族共用的斜角**，不是每個元素各斜各的。挑一個角度（本規格採 −33°，也可用 −45°／−22.5°），全站的形、標籤、色塊記號、清單項目符號都用它或它的補角（57°）。水平與垂直是保留給特殊語意的——本規格保留給「現用態」與「連續文字」。

```css
:root{--tilt:-33deg}
.f{transform:rotate(var(--tilt))}
.klist li::before{content:"";position:absolute;left:0;top:.62em;
  width:13px;height:13px;background:#0E0E10;transform:rotate(-33deg)}
/* 短標籤可以斜，長文一律不斜（見特徵 5 的紀律） */
.tilt{display:inline-block;transform:rotate(-33deg);transform-origin:0 50%}
```

### 4. 三色律：白・黑・朱紅

至上主義的色彩極簡到近乎法律：白（虛空）、黑（形）、朱紅（唯一的熱度）。第四個顏色可以有，但必須**罕見到讓人記得它出現在哪裡**（本規格 ≤2%，示範站只給「判定通過」一個語意）。沒有任何顏色是漸層的、半透明的、或帶陰影的。

```css
:root{
  --void:#F2F2EF;   /* 62%　虛空。不是純白（純白會讓黑形刺眼），也不帶暖偏 */
  --ink:#0E0E10;    /* 20%　形與所有內文 */
  --red:#E5301C;    /* 12%　形、現用態、拒絕、≥22px 的大字 */
  --green:#0B7A4B;  /*  2%　第四色，只給一種語意（本站＝成形） */
}
/* 對比紀律：朱紅在 #F2F2EF 上約 4.0:1，不足以承載小字。
   規則寫死：朱紅只給色塊與 ≥22px/700 的大字；正文一律 --ink（14.5:1）。 */
```

### 5. 尺度階層與孤立：沒有任何兩個東西對齊

一個支配性的大形 + 一串明顯遞減的小形。元素之間的**間距要大於元素本身**，而且**刻意不對齊**——沒有共用的左緣、沒有共用的基線、沒有等距。這是至上主義與構成主義／包浩斯最容易混淆卻最關鍵的分野：構成主義用對角網格組織畫面，至上主義沒有網格。

```css
/* 用百分比座標各自定位，不要用 grid / flex 去排「構成」 */
#f1{--x:5;--y:11;--w:47;--h:2.6;--r:-33deg}   /* 支配形：最長 */
#f2{--x:66;--y:7;--w:16;--h:29;--r:-33deg}    /* 次要：面積約 1/3 */
#f6{--x:44;--y:60;--w:5;--h:5;--r:0deg}       /* 末端：約 1/20 */
/* 檢查方法：把畫面轉成灰階瞇眼看，應該讀得出「一大、二中、三小」的階層；
   任何兩個形的 --x 或 --y 相同都是錯的。 */
```

**唯一例外**：連續文字。長文一律水平、齊左、單欄、行長 ≤ 34em，不斜、不繞排、不做欄線。這是網頁比 1915 年的畫布多出來的紀律——馬列維奇不需要處理「讀完三千字」這件事。

---

## 一、設計哲學

1. **從「有什麼東西」改成「東西之間的關係」。** 至上主義取消了描繪對象，只剩形與形的相對位置、相對大小、相對角度。做這個風格的站，第一步是問：這個產業裡有沒有一件事情，它的本質就是「只有相對關係、沒有絕對座標」？找到它，整個站就站得住。示範站選了自由落體——三公里高空沒有地平線，四個人只能靠彼此定位。
2. **白是最貴的材料。** 任何想把白填滿的衝動都要抵抗。如果一個區塊看起來太空，正確的處理是把形做小、不是把形做多。
3. **狀態用「形本身的改變」表達，不用高亮、不用底色、不用邊框。** 現用的頁籤變成一個未旋轉的黑方塊；被選中的人整條變成朱紅；成形的時候整組變綠。介面沒有任何「被框起來」的東西。
4. **拒絕擬真。** 沒有陰影＝沒有光源＝沒有空間深度。所有東西都在同一個平面上，這是至上主義的形上學，也是最容易被現代 UI 習慣破壞的一條。

## 二、色彩系統

| 色票 | hex | 面積 | 用途 |
|---|---|---|---|
| 虛空白 | `#F2F2EF` | 約 62% | 頁面底、所有空隙、深色區塊裡的白色元素 |
| 墨黑 | `#0E0E10` | 約 20% | 形、全部內文、頁尾與強調區塊的底 |
| 朱紅 | `#E5301C` | 約 12% | 形、現用態、拒絕訊息、記號色塊、≥22px 大字 |
| 鉻綠 | `#0B7A4B` | ≤2% | 第四色。全站只給一種語意（示範站＝判定通過） |
| 紙白 | `#FFFFFF` | ≤4% | 只給輸入欄與公式框，讓「可以寫字的地方」與虛空區分 |

規則：

- 不使用任何灰階中間色作為分隔或次要文字底色。次要文字用 `#4A4A4C`（深灰文字，不是灰底）。
- 深色區塊（頁尾、跳次單）反轉為墨黑底 + `#F2F2EF` 字 + 朱紅重點，**仍然沒有邊框**。
- 禁止：漸層、半透明疊色、backdrop-filter、任何帶 alpha 的陰影。

## 三、字體系統

- 拉丁與數字：**Archivo**（Google Fonts），400／600／800。粗黑無襯線、方正、無人文氣，最接近 1920 年代蘇聯的展覽字。
- 中文：**Noto Sans TC** 400／500／700／900。
- 標題用 `font-weight:900`，`letter-spacing:-.01em`，`line-height:1.04`——大標必須密到像一塊形。
- 小標籤（`.tag`）：11px／600／`letter-spacing:.20em`～`.28em` 全大寫感。字距是至上主義小字唯一的裝飾。
- 數字一律 `font-variant-numeric:tabular-nums`。

```css
.hd{font-family:"Archivo","Noto Sans TC",sans-serif;font-weight:800;
    letter-spacing:-.01em;line-height:1.04}
.tag{font-size:11px;letter-spacing:.26em;font-weight:600}
.n{font-family:"Archivo",sans-serif;font-weight:600;
   font-variant-numeric:tabular-nums;letter-spacing:.05em}
```

字級階梯：11 / 12.5 / 14.5 / 16 / 19 / 26 / 44 / `clamp(30px,5vw,60px)`。中間級數刻意稀疏——至上主義沒有「稍微大一點」這種東西。

## 四、版面與網格

**沒有網格。** 這不是修辭，是規格：

- 構成區（首屏、圖像區）：`position:relative` 容器 + 子元素 `position:absolute` 以百分比定位，每個元素的 `--x/--y/--w/--h/--r` 各自獨立。
- 文字區：單欄、齊左、`max-width:34em`，段落間距 15px，區塊間距 58–96px。可以用 flex 做欄，但**不得出現分欄線**，且各欄高度不齊是正確的。
- 傾斜：形一律 −33°；標籤 ≤12 字可斜，連續文字不斜。
- 留白：任兩個形之間的最短距離 ≥ 較小者的邊長。
- 直排：中文短標籤可用 `writing-mode:vertical-rl; text-orientation:upright; letter-spacing:.32em` 作為構成的一部分（見第十一章）。

RWD：≤900px 時構成區換一組座標（不是等比縮小，是**重新構成**）；導覽由角落的斜線群攤平為頂部橫列；文字放寬到滿版。手機上仍然不准出現邊框與卡片。

## 五、元件配方

### 導覽（黑方定位）

四個頁面 = 四個沿斜線排開的形。非現用頁是傾斜的朱紅長條，**現用頁是全站唯一未旋轉的黑色正方形**。狀態靠「正位 vs 傾斜」表達，不靠顏色高亮。

```css
.nav{position:fixed;top:22px;right:24px;width:206px;height:132px;z-index:70}
.nav a{position:absolute;display:block;text-align:right}
.nav a i{position:absolute;right:0;top:0;width:46px;height:9px;background:var(--red);
  transform:rotate(-33deg);transform-origin:100% 50%;transition:transform .16s steps(3)}
.nav a:hover i{transform:rotate(-52deg)}
.nav a[aria-current="page"] i{width:22px;height:22px;background:var(--ink);
  transform:rotate(0deg);top:-7px}
.nav a:nth-child(1){right:0;top:2px}
.nav a:nth-child(2){right:26px;top:36px}
.nav a:nth-child(3){right:52px;top:70px}
.nav a:nth-child(4){right:78px;top:104px}
```

### 按鈕

實心色塊，無邊框無圓角，hover 直接換色（`transition:background .01s`——硬切，不是淡入）。

```css
.btn{display:inline-block;background:var(--ink);color:#F2F2EF;padding:13px 26px;
  font-size:13px;font-weight:700;letter-spacing:.18em;cursor:pointer}
.btn:hover{background:var(--red)}
.btn.gh{background:var(--red)} .btn.gh:hover{background:var(--ink)}
```

### 「卡片」的替代品

**不要做卡片。** 需要把一組資訊聚在一起時，用一塊實心墨黑區塊（滿版或大面積），內部反白排字；或者什麼都不做，只用空白隔開。

### 表單

輸入欄是白色實心方塊（唯一使用純白的地方），無邊框；focus 用 `outline:3px solid var(--red)`。標籤在上方，11px／`.2em` 字距。拒絕訊息是一整塊朱紅底反白字。

### 清單

項目符號是一個 13px 的傾斜方塊，不是圓點、不是 dash。

### 頁尾

滿版墨黑，反白字，無上邊框（靠色塊本身分界）。

## 六、動效規則

至上主義的動效紀律是：**硬邊、離散、無補間感**。不要 ease-in-out 的柔滑淡入——那是另一個世紀的語言。

| 種類 | 做什麼 | 值 |
|---|---|---|
| ambient 環境 | 一塊小形以**逐格**方式從畫面上方落到下方並旋轉 | `animation:fall 26s steps(16,end) infinite`；第二塊 41s／`steps(11)` |
| input-driven 輸入 | 拖曳任一形時即時拉出朱紅測距線與讀數；hover 導覽形直接改角度 | 0ms（直接改 style），hover `.16s steps(3)` |
| transition 轉場 | 斜線推移（clip-path wipe），方向與 −33° 同族 | `.19s cubic-bezier(.2,0,0,1)` |
| signature 簽名 | **解散**：全部的形同時沿各自方位逐格飛出畫面，只剩下白 | `transform .9s steps(6)` |

```css
@keyframes fall{0%{transform:translateY(-14vh) rotate(0deg)}
                100%{transform:translateY(112vh) rotate(198deg)}}
.faller{position:fixed;width:13px;height:13px;background:var(--ink);
  animation:fall 26s steps(16,end) infinite}

@keyframes wipe{from{clip-path:polygon(0 0,0 0,-38% 100%,-38% 100%)}
                to{clip-path:polygon(0 0,142% 0,100% 100%,-38% 100%)}}
.wipe{animation:wipe .19s cubic-bezier(.2,0,0,1) both}

/* 簽名：解散 */
body.scattered .void .f{--bx:var(--sx);--by:var(--sy)}
.void .f{transform:translate(var(--bx,0px),var(--by,0px)) rotate(var(--r,0deg));
         transition:transform .9s steps(6)}
```

降級：

```css
@media (prefers-reduced-motion:reduce){
  *,*::before,*::after{animation:none!important;transition:none!important}
  .faller{display:none}
}
```
降級後：ambient 消失（它本來就不承載資訊）、轉場變成即時切換、解散變成瞬間位移、測距線照常顯示。**資訊零損失。**

禁用清單：淡入淡出、視差、彈跳 easing、模糊、縮放彈出、任何 `filter`。

## 七、插畫與圖像風格

零外部圖片、零 icon 字型、零 emoji。所有圖像由同一支程序產生，原語只有「矩形 + 小方」：

```js
function formSVG(pts,size,opt){                 // pts:[{x,y,face}]
  var m=0;pts.forEach(function(p){m=Math.max(m,Math.abs(p.x),Math.abs(p.y));});
  var s=38/(m+0.52);                            // 自動縮放到 viewBox 內
  var out='<svg viewBox="0 0 100 100" width="'+size+'" height="'+size+'">'
        + '<rect width="100" height="100" fill="#F2F2EF"/>';
  pts.forEach(function(p,i){
    var col=i%2?'#E5301C':'#0E0E10', nub=col==='#E5301C'?'#0E0E10':'#E5301C';
    out+='<g transform="translate('+(50+p.x*s)+','+(50+p.y*s)+') rotate('+p.face+')">'
       + '<rect x="'+(-s*.40)+'" y="'+(-s*.17)+'" width="'+(s*.80)+'" height="'+(s*.34)+'" fill="'+col+'"/>'
       + '<rect x="'+(s*.42)+'" y="'+(-s*.12)+'" width="'+(s*.24)+'" height="'+(s*.24)+'" fill="'+nub+'"/></g>';
  });
  return out+'</svg>';
}
```

判準：**拿掉所有文字，畫面仍讀得出「誰在誰的哪一邊、誰比較大」。** 如果一張圖需要外框才看得懂，那張圖做錯了。

## 八、Logo 與 Favicon 設計指南

Logo ＝ 一組至上主義構成 + 一組粗黑大寫字，兩者之間不用線分隔。構成必須包含：一個支配形（長條）、一個方、一個更小的方、一個圓，全部共用 −33°。

```svg
<svg viewBox="0 0 240 120">
  <rect width="240" height="120" fill="#F2F2EF"/>
  <g transform="rotate(-33 60 60)">
    <rect x="6" y="52" width="108" height="9" fill="#E5301C"/>
    <rect x="30" y="20" width="30" height="30" fill="#0E0E10"/>
    <rect x="72" y="66" width="14" height="14" fill="#0E0E10"/>
    <circle cx="20" cy="30" r="7" fill="#0E0E10"/>
  </g>
  <text x="126" y="56" font-family="Archivo" font-size="26" font-weight="800"
        letter-spacing="1.5" fill="#0E0E10">NO</text>
  <text x="126" y="82" font-family="Archivo" font-size="26" font-weight="800"
        letter-spacing="1.5" fill="#0E0E10">HORIZON</text>
  <rect x="126" y="88" width="52" height="5" fill="#E5301C"/>
</svg>
```

Favicon 是同一構成縮到只剩兩個形（一黑方 + 一朱紅斜條），寫成 inline data URI：

```html
<link rel="icon" href="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2032%2032'%3E%3Crect%20width='32'%20height='32'%20fill='%23F2F2EF'/%3E%3Crect%20x='7'%20y='5'%20width='13'%20height='13'%20fill='%230E0E10'/%3E%3Crect%20x='3'%20y='22'%20width='26'%20height='5'%20fill='%23E5301C'%20transform='rotate(-33%2016%2024)'/%3E%3C/svg%3E">
```

## 九、Do & Don't

**Do**

- 先畫構成再放內容：把首屏當成一張畫來排，資訊再貼到形旁邊。
- 讓現用態用「幾何身分改變」表達（斜→正、長條→方）。
- 深色區塊要滿版，不要做成「一張黑卡片浮在白上」。
- 文案具體：真的地址、真的價目、真的營業時間、真的人名。
- 手機版重新構成，不是縮小。

**Don't**

- 不要邊框、圓角、陰影、漸層、材質、模糊。
- 不要卡片牆、不要三欄等高、不要置中大標＋副標＋兩顆按鈕。
- 不要把朱紅拿去做正文或連結色（對比不足，且會稀釋它的語意）。
- 不要淡入。至上主義的東西是「在」或「不在」，沒有「漸漸出現」。
- 不要用格線或對角網格組織畫面——那是構成主義，不是至上主義。
- 不要 emoji、不要 icon font、不要 Lorem ipsum、不要「EST. 19xx」徽章。
- 不要在深色區塊裡用半透明白（`rgba(255,255,255,.1)`）做分層——用實色。

## 十、頁面骨架範例

```html
<!DOCTYPE html><html lang="zh-Hant"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>頁名｜品牌</title>
<link rel="icon" href="data:image/svg+xml,…（見第八章）">
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;600;800&family=Noto+Sans+TC:wght@400;500;700;900&display=swap" rel="stylesheet">
<style>/* 見特徵 1／2／4 的重置與色票 */</style>
</head><body>
  <a class="brand" href="index.html"><svg>…</svg></a>
  <button class="bo" id="bo">解散</button>
  <nav class="nav" aria-label="主導覽">
    <a href="index.html" aria-current="page"><i></i><b>虛空</b></a>
    <a href="b.html"><i></i><b>第二頁</b></a>
    <a href="c.html"><i></i><b>第三頁</b></a>
    <a href="d.html"><i></i><b>第四頁</b></a>
  </nav>
  <div class="faller"></div>

  <main>
    <!-- 構成區：絕對定位、各自傾斜、沒有任何對齊 -->
    <div class="void">
      <div class="f blk" style="--x:5;--y:11;--w:47;--h:2.6;--r:-33deg"></div>
      <div class="f rd"  style="--x:66;--y:7;--w:16;--h:29;--r:-33deg"></div>
      <h1 class="lbl big hd" style="left:24%;top:60%">沒有<br>地平線</h1>
      <p class="lbl n" style="left:6%;top:19%"><span class="tilt">三〇〇〇 公尺・門開</span></p>
    </div>

    <!-- 文字區：單欄齊左、無框、色塊當記號 -->
    <section class="wrap">
      <p class="tag">小標籤</p>
      <h2 class="hd">大標題</h2>
      <div class="bar"></div>
      <p class="lead">內文一律水平、齊左、≤34em。</p>
    </section>
  </main>

  <footer><!-- 滿版墨黑，反白字，無邊框 --></footer>
</body></html>
```

---

## 十一、技術實作與相容性

本站認領三項核心技術，各自承載一個不可省略特徵；三項分屬 E／B／C 三層。

### 1. 旋轉／平移／縮放不變的圖形比對（E 資料與生成層）

**承載**：特徵 1 與特徵 5 的思想本體——「畫面上沒有絕對座標」。示範站的核心功能是判定四個人擺出來的是不是目標隊形，做法是 **4! = 24 種身分指派枚舉 × 二維 Procrustes 閉式對齊**：

```js
function fit(U,T){                       // 求把 U 疊到 T 上的最佳「旋轉+等比縮放」
  var cu=centroid(U),ct=centroid(T),a=0,b=0,su=0,st=0;
  for(var i=0;i<U.length;i++){
    var ux=U[i].x-cu.x,uy=U[i].y-cu.y,tx=T[i].x-ct.x,ty=T[i].y-ct.y;
    a+=ux*tx+uy*ty; b+=ux*ty-uy*tx; su+=ux*ux+uy*uy; st+=tx*tx+ty*ty;
  }
  var th=Math.atan2(b,a), s=Math.sqrt(a*a+b*b)/su;   // 旋轉角、縮放比
  /* 殘差 = √( Σ|s·R(θ)u − t|² / Σ|t|² )，無單位 */
}
```

- **相容性**：純 JavaScript（`Math.atan2`／`Math.hypot`／`Array.prototype.map`），無任何瀏覽器 API 依賴，ES5 語法，無相容性缺口。`Math.hypot` 為 ES6（2015 起全瀏覽器支援），若需支援 IE 可改為 `Math.sqrt(x*x+y*y)`。
- **fallback**：無 JavaScript 時，籤簿頁的 `<noscript>` 指向同頁下半部的**靜態八形圖籍**與〈判形之法〉頁——判定的全部公式與實測數字以純 HTML 寫在該頁，不需要執行任何程式即可讀完。
- **效能實測**（Node 22，本機）：20,000 次完整判定（含 24 種指派）耗時 **100 ms**，平均 **5 µs／次**，因此可以在使用者放開滑鼠的當下同步算完，不需要 worker、不會造成 layout thrashing。
- **正確性實測**：八形兩兩互判 56 組**零誤判**；自比殘差 0.0000；隨機亂擺 3,000 次通過率 **0.00%**；加噪測試 ±0.05／0.10／0.15／0.20／0.30／0.45 身長的通過率為 100%／100%／100%／99.2%／73.7%／29.5%。

### 2. CSS `steps()` 逐格動畫（B 動效與時間軸層）

**承載**：特徵 2 的「硬邊」紀律。至上主義的形不會慢慢滑過去——`steps()` 讓運動變成一連串離散跳格，畫面上永遠沒有一個處於「補間中間態」的模糊位置。環境動效（逐格降落）與簽名動效（解散）都由它承擔。

- **查證**（2026-08-11，MDN《easing-function》／`steps()`）：`steps()` 屬 CSS Easing Functions Level 1，**Baseline Widely available**，MDN 記載自 **2015 年 9 月**起跨瀏覽器可用（Chrome/Edge/Firefox/Safari 全支援；`jump-*` 關鍵字為後續加入，本規格只用 `steps(n, end)` 這個最保守的形式）。
- **fallback**：不支援時瀏覽器會忽略該 `animation-timing-function` 而退回 `ease`，動畫仍然播放、路徑一致，只是變成連續補間——視覺紀律略降，資訊零損失。
- **效能**：`steps(16)` 表示 26 秒內只有 16 次實際的合成器變化，且只動 `transform`（不觸發 layout／paint），實測維持 60fps。

```css
.faller{animation:fall 26s steps(16,end) infinite}   /* ambient */
.void .f{transition:transform .9s steps(6)}          /* signature：解散 */
.nav a i{transition:transform .16s steps(3)}         /* input-driven */
```

### 3. `writing-mode: vertical-rl` + `text-orientation: upright`（C 版面與樣式層）

**承載**：特徵 3 的傾斜族與特徵 5 的「不對齊」——直排的中文短標籤本身就是一個**豎立的長條形**，讓文字直接成為構成的一員，而不是貼在構成旁邊的說明。

- **查證**（2026-08-11，MDN《writing-mode》《text-orientation》）：兩者皆為 **Baseline Widely available**；其中 `text-orientation` 依 MDN 記載自 **2020 年 9 月**起跨瀏覽器可用（較晚的那一支，因此以它為準）。`text-orientation` 只在 `writing-mode` 為垂直值（`vertical-rl`／`vertical-lr`）時生效，兩者必須成對使用。
- **fallback**：不支援時該元素退回水平排列，因為它是一個 ≤8 字的短標籤且位於構成區邊緣，退回後不遮擋任何內容；≤900px 時本規格本來就把它隱藏（`display:none`），所以行動裝置不受影響。

```css
.vert{writing-mode:vertical-rl;text-orientation:upright;
      letter-spacing:.32em;font-size:11px;font-weight:600}
```

### 效能預算實測

| 項目 | 門檻 | 實測 |
|---|---|---|
| 單頁大小（含 inline CSS/JS，零外部圖片） | ≤350 KB | index 32.3 KB／pool 41.9 KB／fa 33.0 KB／wei 27.5 KB |
| 外部請求 | — | 僅 Google Fonts 兩支（Archivo、Noto Sans TC） |
| 首屏 JS | ≤100 ms | 首屏只做一次 `layoutStart()`（4 個元素的 style 寫入）與一次 `formSVG()`（899 bytes 字串），判定引擎 5 µs／次 |
| 主要動畫 | 60fps | 全部動效只動 `transform`／`clip-path`，無 layout thrashing |

### 其他使用到但未認領的技術

Pointer Events（拖曳）、`localStorage`（跨頁保存跳次）、FNV-1a → mulberry32 決定性偽亂數（印記）。這些是實作手段，不是本站的視覺承載者，故不列入認領。

---

## 十二、驗收清單

做完一個至上主義站，逐條檢查：

- [ ] 遮掉全部文字看首屏，懂設計的人 3 秒內說得出「這是至上主義」。
- [ ] 全頁 `grep` 不到 `border:`（除了 `border:0`）、`border-radius`（除了 `50%`）、`box-shadow`、`gradient`、`blur`。
- [ ] 白色面積 ≥55%。
- [ ] 所有形共用同一個傾斜角（或它的補角）；未旋轉的元素只有「現用態」與連續文字。
- [ ] 顏色數 ≤4，且第四色出現面積 ≤2%。
- [ ] 任兩個形的 `--x` 或 `--y` 都不相同（沒有對齊）。
- [ ] 四種動效（ambient／input／transition／signature）都在，且都有 `prefers-reduced-motion` 降級。
- [ ] 沒有任何外部圖片、icon 字型、emoji。
- [ ] 手機 ≤560px 是**重新構成**過的，不是等比縮小。
