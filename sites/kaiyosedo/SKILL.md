---
name: rinpa-gilt-tarashikomi
description: Japanese Rinpa school — a gold-leaf ground laid sheet by sheet, outline-free motifs modelled only by pooled second pigment (tarashikomi), a fixed set of reusable stencils, radical cropping with vast gold voids, and a folded, vertically-set picture plane.
---

# 琳派 Rinpa — 金地・たらしこみ・型紙

> 這份規格書描述十七至十九世紀日本「琳派」（宗達光琳派）的視覺語言，並把它翻譯成可以在瀏覽器裡重現的具體做法。
> 讀完這份文件，不需要看過 Demo 就能做出風格一致的新網站——只要五個不可省略特徵全部做到。

---

## 一、設計哲學

琳派不是師徒相承的流派，而是**隔代私淑**的。俵屋宗達（十七世紀初）死後五十年，尾形光琳（1658–1716）臨摹他的作品自學；光琳死後百年，酒井抱一（1761–1829）又臨摹光琳。三個人沒有一個見過彼此。他們共享的不是筆法，是**一組決定**：

1. **不描輪廓。** 有機的形體不畫線，只有一塊平塗的色域。體積感全部交給「趁未乾落下的第二次顏料」——たらしこみ。
2. **形是重複的，不是即興的。** 光琳〈燕子花圖屏風〉裡的燕子花，是同幾枚型紙反覆打出來的：同一朵花在畫面上出現三次，一模一樣。琳派的裝飾感來自**有限的形被重複使用**，不是來自畫得多。
3. **留白不是背景，是材料。** 金地是一整面貼上去的金箔，它有接縫、有厚度、有重量，價格按枚計算。它不是「底色」。
4. **構圖被裁掉。** 主母題一定跑出畫面外。畫框內完整收好的圖是「圖案樣本」，不是屏風。
5. **畫面是折的。** 屏風有六扇，每扇朝向不同，同一片金在同一屏上會有六種亮度，而畫跨過折目繼續走。

翻成網頁的話：**這個風格的立體感不能用漸層、不能用陰影、不能用模糊，只能用一組硬邊的等值線。** 這是全篇最重要的一句。

---

## 二、本風格的 5 個不可省略特徵

> 拿掉任何一項，畫面就不再是琳派。每項附可直接複製的 CSS／SVG。

### 特徵一　金是「箔」不是「色」——大面積金地由一枚一枚的箔拼成，接縫必須看得見

金箔一枚約 10.9 公分見方，貼的時候邊緣互相疊約 2 公釐，所以金地上永遠有一格一格的**箔足**（接縫），而且每一枚箔的色味略有不同。做成 `background` 平鋪的圖磚（一磚 4×4 枚），**不要用漸層假裝金屬**。

```css
:root{ --kin:#C6A03A; --kin-l:#D8BC66; --kin-d:#A87E22; --leaf:96px; }
body{
  background: url("data:image/svg+xml,…箔押しタイル…") repeat;
  background-size: var(--leaf) var(--leaf);
}
```

```html
<!-- 箔押しタイル：4×4 枚。每枚亂數選 kin / kin-l / kin-d 並給 0.30–0.72 的不透明度，
     接縫是「1px 墨線 + 緊鄰 1px 白線」一組（＝上一枚箔的邊壓在下一枚上）。 -->
<svg xmlns="http://www.w3.org/2000/svg" width="384" height="384" viewBox="0 0 384 384">
  <rect width="384" height="384" fill="#C6A03A"/>
  <rect x="0"  y="0" width="96" height="96" fill="#A87E22" fill-opacity=".41"/>
  <rect x="96" y="0" width="96" height="96" fill="#D8BC66" fill-opacity=".55"/>
  <!-- …共 16 枚… -->
  <rect x="96" y="0" width="1" height="384" fill="#1A1611" fill-opacity=".13"/>
  <rect x="97" y="0" width="1" height="384" fill="#FFF4CE" fill-opacity=".22"/>
  <!-- …每條接縫都是墨 1px + 白 1px 一組… -->
</svg>
```

**禁止**：金色漸層、金屬掃光、打在金上的 `drop-shadow`、任何會移動的高光。金之所以是金，靠的是**接縫**，不是光。

### 特徵二　不描輪廓，只用たらしこみ的潮目造型

平塗一塊色，趁未乾時滴入第二種顏料；顏料自己擴散，走到輪廓內側停住並堆積（膠與水的緣溜まり／coffee-ring effect）。把這個濃度場**切成五段**畫出來，就得到硬邊的「潮目」。

演算法（三十行以內寫得完）：

1. 把型紙（閉合路徑）光柵化成 96×N 的格點遮罩 `m`。
2. 在遮罩內放 2–5 個落點作為初始濃度，用**顯式熱擴散**跑 120 步（`u += 0.2*(上+下+左+右-4u)`），邊界取無流束（鄰格在遮罩外時以自身值代入）。
3. 正規化後壓一次 gamma（`^0.42`），再乘上邊緣堆積項 `1 + A*exp(-d_in/λ)`（`A≈0.55`，`d_in` 為到輪廓的距離）。遮罩外填 `-0.05*d_out`，讓等值線一定平滑閉合。
4. 取濕面的 **30% / 52% / 70% / 84% / 94% 分位數**當五個等值。
5. 用 **marching squares** 抽等值線 → 線段 → 端點雜湊接成閉路 → Chaikin 平滑一次。
6. 每條閉路畫成 `fill-opacity:.155`–`.19` 的同色深版，疊在平塗之上，並用型紙自身的 `clipPath` 裁掉。

```html
<clipPath id="pt"><path d="…型紙…"/></clipPath>
<path d="…型紙…" fill="#3C7A63"/>                <!-- 一、平塗（無 stroke！） -->
<g clip-path="url(#pt)">                          <!-- 二、五段潮目 -->
  <path class="tb tb0" d="…" fill="#275343" fill-opacity=".155"/>
  <path class="tb tb1" d="…" fill="#275343" fill-opacity=".155"/>
  <path class="tb tb2" d="…" fill="#275343" fill-opacity=".155"/>
  <path class="tb tb3" d="…" fill="#275343" fill-opacity=".155"/>
  <path class="tb tb4" d="…" fill="#275343" fill-opacity=".155"/>
</g>
```

**禁止**：`stroke` 描在有機形上、用 gradient 做量體、`feGaussianBlur`、`box-shadow`。階調必須是**五段**、必須有硬邊。連續糊開的那個叫水彩，不是琳派。

### 特徵三　型紙有限，只准回轉・反轉・拡縮

規定一組（3–6 枚）母題外形，全站所有圖像都只能用它們。允許的變換只有位置、旋轉、鏡射、等比縮放。

```js
// 型紙＝一組閉合多邊形；xform 只給 x, y, s(縮放), r(弧度), f(左右反轉)
function xform(subs,o){
  const c=Math.cos(o.r||0), s=Math.sin(o.r||0), k=o.s??1, fx=o.f?-1:1;
  return subs.map(p=>p.map(([X,Y])=>{
    const x=(X-150)*k*fx, y=(Y-150)*k;
    return [ (o.x||0)+x*c-y*s, (o.y||0)+x*s+y*c ];
  }));
}
```

外形本身建議用「骨（三次貝茲）＋寬度函數」生成，收筆端寬度趨近 0：

```js
// 杜若の葉：一條骨、寬度在 t≈0.2 最大、到葉尖收成 2.4
blade({ p0:[150,300], p1:[92,206], p2:[192,116], p3:[146,-8],
        w:t => 2.4 + 16.5*Math.sin(Math.PI*Math.pow(t,.46))*(1-t*.58) });
```

多枚型紙重疊時，各子路徑統一成逆時針方向、用 **nonzero** 判定（與 SVG 預設 `fill-rule` 一致），重疊處才會是聯集而不是挖洞。

**禁止**：每個實例都畫一個新形狀、隨機生成的有機形、路徑頂點編輯 UI。**重複本身就是這個風格**。

### 特徵四　主母題必被畫布邊緣切斷，金的無地留 45% 以上

```js
// 葉的自然高 300 單位，畫布高 620 → 放大 2.30 倍（=690）並置中，上下自然切掉
['ha', 60, 300, 2.30, 7, 0]   // [型, x, y, 縮放, 旋轉°, 反轉]
```

構圖規則：把母題排成**幾叢**（3–6 叢），叢與叢之間留一塊大到令人不安的空金（本站在 x=800–1150 之間完全空著）。左右不得對稱，主體不得置中，任何一叢都不得完整收在畫面裡。

**禁止**：置中的主視覺、左右對稱、四邊等距的內距、把圖乖乖放進卡片框裡。

### 特徵五　畫面是折的，文字是縱的

六扇屏風：奇數扇向前、偶數扇向後，**明暗以「段」變化而非漸層**；圖經過折目繼續走。

```css
.byobu{ display:flex; perspective:1900px; }
.fan{ flex:1; position:relative;
  background-image:var(--art); background-size:600% 100%;  /* 六扇共用同一張畫 */
  transition:transform .5s cubic-bezier(.3,.9,.3,1); }
.fan:nth-child(1){ background-position:0    0; transform:rotateY( 13deg); transform-origin:right center }
.fan:nth-child(2){ background-position:20%  0; transform:rotateY(-13deg); transform-origin:left  center }
.fan:nth-child(3){ background-position:40%  0; transform:rotateY( 13deg); transform-origin:right center }
.fan:nth-child(4){ background-position:60%  0; transform:rotateY(-13deg); transform-origin:left  center }
.fan:nth-child(5){ background-position:80%  0; transform:rotateY( 13deg); transform-origin:right center }
.fan:nth-child(6){ background-position:100% 0; transform:rotateY(-13deg); transform-origin:left  center }
/* 明暗是「段」：每扇一個平塗遮片，不得用 gradient */
.fan::after{ content:""; position:absolute; inset:0; background:var(--st) }
.fan:hover,.fan:focus-visible{ transform:rotateY(0) }   /* 觸到哪一扇，哪一扇轉正 */
```

> `background-size:600%` 時，`background-position:i*20%` 恰好把第 i 扇對到整張畫的第 i 段（位移量 = (W−6W)·P/100 = −i·W）。

文字縱組：

```css
.tate{ writing-mode:vertical-rl; text-orientation:mixed; line-height:2.05; letter-spacing:.06em }
.tcy { text-combine-upright:all }   /* 縱中橫：兩位數不躺著 */
```

```html
<p class="tate">型紙は<span class="tcy">5</span>枚しかなく、二百年、増やしておりません。</p>
```

**禁止**：把縱組當裝飾只用在標題（至少要有一段真正的長文縱排）、在縱組裡讓數字躺著、用 `text-orientation:upright` 硬轉半形英數。

---

## 三、色彩系統

| 色 | hex | 用途 | 比例 |
|---|---|---|---|
| 金地 | `#C6A03A`（明 `#D8BC66`／暗 `#A87E22`） | 全站底。是材質不是背景色 | **約 46%** |
| 群青 | `#2B4C8C`（深 `#1D3563`） | 花・第一顏料。深版只給潮目 | 約 12% |
| 緑青 | `#3C7A63`（深 `#275343`） | 葉・第一顏料。深版只給潮目 | 約 12% |
| 胡粉白 | `#F2ECDE`（次 `#E7DFCB`） | **料紙**。所有長文一律在紙上，不在金上 | 約 20% |
| 墨 | `#1A1611` | 內文、界線、頁尾底 | 約 8% |
| 朱 | `#B0402C` | 只給「印」與「拒絕」。**不得當品牌色或連結色** | ≤ 2% |

規則：

- **金上不放長文。** 超過兩行的文字一律放進 `.paper`（胡粉白）。金上只允許標題、單行說明與數字，且必須用墨（對比約 7.1:1）。
- 群青與緑青**不相鄰**：兩塊顏料之間必須隔金地或胡粉白。
- 朱只有兩個語意：落款印、被駁回的事。用它當強調色會立刻毀掉這個配色。
- 全站**零漸層**（金地磚內部的分枚色差是離散色塊，不是漸層）、零模糊陰影（投影一律實心位移色塊 `box-shadow:6px 6px 0 rgba(26,22,17,.14)`）、零圓角。

---

## 四、字體系統

```css
--f-jp:'Zen Old Mincho','Noto Serif TC',serif;   /* 標題・縱組・母題名 */
--f-tc:'Noto Serif TC','Zen Old Mincho',serif;   /* 內文 */
--f-lt:'Cormorant Garamond',serif;               /* 拉丁小標籤・數字 */
```

| 角色 | 字級 | 字重 | 行高 | 字距 |
|---|---|---|---|---|
| 站名 | 30px | 700 | 1.35 | .10em |
| 章標題 h2 | 25px | 700 | 1.35 | .04em |
| 縱組本文 `.tate` | 17px | 400 | 2.05 | .06em |
| 橫組本文 | 16px | 300–400 | 1.85 | 0 |
| 標籤 `.lbl` | 12px | 400 | — | **.26em**、全大寫、拉丁 |
| 注記 `.note` | 13px | 400 | 1.7 | 0 |
| 振假名 `.ruby` | .62em | 400 | — | .20em |

- 縱組行高要比橫組大很多（2.0 以上），否則字會黏成一條。
- 拉丁標籤只做「小、寬字距、全大寫」一種用法，不做大字。這個流派的拉丁字沒有主張。
- 數字用襯線拉丁字；在縱組裡兩位數必須 `text-combine-upright:all`。

---

## 五、版面與網格

- 內容寬 **1240px**，左右 padding 20px。桌機主標區右側預留 230px 給落款導覽。
- 沒有卡片牆。分區靠「紙（`.paper`）落在金地上」形成，紙一律**方角**，帶 `6px 6px 0` 的實心位移影。
- 主要版面比例採 **1 : 1.05**（縱組詞書 : 資訊表）或 **1.25 : 1**（表單 : 見本），刻意避開對半分。
- 屏風區高度 `min(62vh, 520px)`，上下各壓一條 2px 墨線（＝屏風的框）。
- 母題與圖像**不進卡片**：圖直接坐在紙上或金上，四邊不留等距內距。
- ≤900px：屏風攤平成橫向捲動（`scroll-snap-type:x mandatory`，每扇 58vw），縱組改橫組，導覽落到頂端四格。
- ≤560px：body 15px、屏風高 260px、每扇 78vw、表格字級 13px。

---

## 六、元件配方

**紙（面板）**

```css
.paper{ background:#F2ECDE; border:1px solid rgba(26,22,17,.42);
        box-shadow:6px 6px 0 rgba(26,22,17,.14); padding:26px 28px }
```

**導覽（落款鈐印）**——桌機右上四枚色紙形，縱組頁名；**現用頁那一枚捺了朱文方印**，並下沉 6px、傾 1.6°（像被壓進紙裡）。

```css
.nav{ position:fixed; top:16px; right:18px; display:flex; flex-direction:row-reverse; gap:9px }
.nav a{ position:relative; width:44px; height:132px; background:#F2ECDE;
        border:1px solid rgba(26,22,17,.5); writing-mode:vertical-rl;
        font-family:var(--f-jp); padding:12px 0 0 }
.nav a[aria-current=page]{ transform:translateY(6px) rotate(1.6deg); background:#E7DFCB }
.nav a[aria-current=page]::after{ content:""; position:absolute; left:6px; bottom:8px;
  width:31px; height:31px; background:var(--sealuri) center/contain no-repeat }
```

**按鈕**——方角、實心群青、1px 深群青框。朱色版只給「印」與「駁回」語意。

```css
.btn{ background:#2B4C8C; color:#F2ECDE; border:1px solid #1D3563; padding:9px 20px;
      font-family:var(--f-jp); letter-spacing:.12em }
.btn.sh{ background:#B0402C; border-color:#7E2A1B }
```

**選項（radio／checkbox）**——用 `:has()` 把整個 label 反白，並備 `@supports not selector(:has(*))` 的退路（把被視覺隱藏的原生控制項顯示回來）。

```css
label.opt{ display:inline-flex; gap:7px; border:1px solid rgba(26,22,17,.45);
           padding:6px 12px; background:#E7DFCB }
label.opt:has(input:checked){ background:#2B4C8C; color:#F2ECDE; border-color:#1D3563 }
@supports not selector(:has(*)){ label.opt input{ opacity:1 } }
```

**表格**——1px 墨框，表頭底 `rgba(43,76,140,.10)`，數字欄右對齊並用拉丁襯線。

**表單**——輸入框底 `#FBF7EC`、1px 墨框、方角；錯誤訊息用朱色，**指名是哪一欄和哪一條規則對不上**，不要只寫「請確認」。

**頁尾**——`rgba(26,22,17,.90)` 實心底、胡粉白字、金明色連結；三欄（店・頁・作り手）。

**落款印（可重現）**——`FNV-1a(內容) → mulberry32` 決定 4×4 格中哪些格有筆畫、筆畫是直是橫，外加七顆胡粉飛白。同樣的內容永遠得到同一枚印。

---

## 七、動效規則

四種、觸發源各異，全部有 `prefers-reduced-motion` 降級且資訊零損失。

| 類 | 名 | 觸發 | 值 |
|---|---|---|---|
| ambient | **乾き**（還沒乾） | 無 | 只有最外一條潮目 `.tb0` 的 `opacity` 在 `.135↔.225` 之間走，`26s ease-in-out infinite`，每第 2／3／5 個母題各延遲 −9s／−17s／−21s |
| input | **一滴ぶん** | hover／focus | `.tb1` 的 `opacity` → `.28`，`transition:opacity .09s linear`（<100ms） |
| transition | **畳む**（折起來） | 換頁 | 跨文件 View Transitions：舊頁 `scaleX(.90)+opacity 0`（`.40s steps(6,end)`）、新頁 `clip-path:inset(0 100% 0 0)→0`（`.52s steps(6,end)`）。**六格 step ＝ 六扇** |
| signature | **落込滲出** | 點擊 | 在點擊處落下一滴，就地重解擴散場（80×N 格、120 步、約 30ms），五條潮目由**外而內**依序現身：每條 `.30s steps(3,end)`，延遲 0／.17／.34／.51／.68s。**形狀一格都不變** |

```css
@keyframes kawaki{0%,100%{opacity:.135}50%{opacity:.225}}
.tb0{ animation:kawaki 26s ease-in-out infinite }
.masu .tb{ transition:opacity .09s linear }
.masu:hover .tb1,.masu:focus-visible .tb1{ opacity:.28 }
@keyframes nijimi{ from{opacity:0} to{opacity:inherit} }
.nij .tb{ animation:nijimi .30s steps(3,end) both }
.nij .tb1{animation-delay:.17s} .nij .tb2{animation-delay:.34s}
.nij .tb3{animation-delay:.51s} .nij .tb4{animation-delay:.68s}

@view-transition{ navigation:auto }
::view-transition-old(root){ animation:fold-out .40s steps(6,end) both }
::view-transition-new(root){ animation:fold-in  .52s steps(6,end) both }
@keyframes fold-out{ to{ opacity:0; transform:scaleX(.90) } }
@keyframes fold-in { from{ clip-path:inset(0 100% 0 0) } to{ clip-path:inset(0 0 0 0) } }

@media (prefers-reduced-motion:reduce){
  .tb0{ opacity:.185; animation:none }
  .nij .tb{ animation:none }
  ::view-transition-old(root),::view-transition-new(root){ animation:none }
}
```

**自我限制**（可寫進你的站，但別讓動效總數掉到四種以下）：**金地不動**。不做掃光、不做視差、不做捲動揭示、不做數字滾動、不做跑馬燈。屏風的金在等房間裡的光，不自己發光。

---

## 八、插畫與圖像風格

技法名：**katagami-tarashi（型紙と溜まり構成）**。全站沒有一張外部圖片，也沒有一張描外形的寫實插圖。圖像原語只有三種：

1. **型紙輪廓**——閉合貝茲，無 stroke，五枚可重複使用（回轉・反転・拡縮のみ）。
2. **潮目**——擴散場的等值閉路，三至五層，內側堆邊，`fill-opacity` 一律相同（靠層數疊出濃淡，不靠改 alpha）。
3. **箔足格**——一枚箔一格，接縫是「1px 墨＋1px 白」一組。

判準：**拿掉顏色，仍讀得出「哪裡是型紙的邊、哪裡是水停下來的地方」。**

明文禁用：`feTurbulence` 手抖濾鏡（那是迷幻海報與里索的語彙）、半調網點、細線幾何線描、寫實描繪、`stroke-linecap:round` 的裝飾線、`stroke-dashoffset` 描繪動畫。

---

## 九、Logo 與 Favicon 設計指南

- Logo 必須由**同一支引擎**輸出，不得另外畫。做法：金地磚 → 一個蛤形 `clipPath` → 內填胡粉白 → 打一枚型紙 → 跑一次たらしこみ → 蛤的外框 2.4px 墨線 → 中央一條 1.6px 的割目 → 右下一枚朱文方印。
- Favicon 用同構的簡化版寫成 inline SVG data URI（金底＋箔足十字線＋三層同心的蛤形），**不要用外部檔案**。

```html
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' fill='%23C6A03A'/%3E%3Cpath d='M3 6h26M3 17h26M11 1v30M22 1v30' stroke='%231A1611' stroke-opacity='.16'/%3E%3Cpath d='M16 27C7.6 27 3.2 21.4 3.2 15.6 3.2 9 8.9 4.6 16 4.6s12.8 4.4 12.8 11C28.8 21.4 24.4 27 16 27Z' fill='%233C7A63'/%3E%3C/svg%3E">
```

---

## 十、Do & Don't

**Do**

- 先決定型紙有幾枚，然後再也不加。
- 讓母題跑出畫面。
- 讓長文縱排一次（真的長文，不是三個字的標題）。
- 用「五段硬邊」表達體積。
- 讓現用態由**一枚印**表示，而不是高亮色塊。
- 把價格、納期、電話寫成具體數字。

**Don't**

- 金色漸層／金屬掃光／發光的金
- 有機形上的描邊
- 任何 blur、drop-shadow、圓角
- 置中大標＋副標＋兩顆按鈕＋三張卡片
- 紫藍漸層 hero（與本風格無關，也是全域禁令）
- emoji 當 icon（icon 一律自繪 SVG）
- Lorem ipsum 與「在當今快節奏的世界」腔
- `EST. 19xx` 徽章（年代要寫進句子裡，不要做成貼紙）
- 把縱組當裝飾字（只縱排標題不縱排內文）
- 用朱色當連結色或品牌色

---

## 十一、頁面骨架範例

```html
<!doctype html><html lang="ja">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<link href="https://fonts.googleapis.com/css2?family=Zen+Old+Mincho:wght@400;700;900&family=Noto+Serif+TC:wght@300;500;700&family=Cormorant+Garamond:wght@400;600&display=swap" rel="stylesheet">
<style>
:root{--kin:#C6A03A;--gun:#2B4C8C;--roku:#3C7A63;--gofun:#F2ECDE;--sumi:#1A1611;--shu:#B0402C;--leaf:96px}
body{margin:0;background:url("…箔押しタイル…") repeat;background-size:var(--leaf) var(--leaf);
     color:var(--sumi);font-family:'Noto Serif TC',serif;line-height:1.85}
.wrap{max-width:1240px;margin:0 auto;padding:0 20px}
.paper{background:var(--gofun);border:1px solid rgba(26,22,17,.42);
       box-shadow:6px 6px 0 rgba(26,22,17,.14);padding:26px 28px}
.tate{writing-mode:vertical-rl;text-orientation:mixed;line-height:2.05}
.tcy{text-combine-upright:all}
@view-transition{navigation:auto}
</style>
</head>
<body>
  <!-- 導覽：四枚色紙形、現用頁有印 -->
  <nav class="nav">…</nav>

  <div class="wrap">
    <header class="mast">…店名（無宣傳標語）…</header>

    <!-- 開場＝折れている屏風。大標 hero 不要。 -->
    <div class="byobu" role="img" aria-label="…畫面內容的文字描述…">
      <div class="fan" tabindex="0"></div><!-- ×6 -->
    </div>

    <!-- 縱組の詞書：長文放在紙上 -->
    <section class="paper kotoba"><div class="tate">…</div></section>

    <!-- 資訊表：具體的價、納期、寸法 -->
    <section class="paper"><table>…</table></section>

    <!-- たらしこみ的可操作見本：點一下就落一滴 -->
    <section class="paper">
      <svg viewBox="0 0 320 320"><g class="masu"></g></svg>
    </section>
  </div>

  <footer>…住所・電話・営業時間…</footer>
</body></html>
```

---

## 十二、技術實作與相容性

本站的三項核心技術，以及 2026-08-18 實際查證的支援現況。

### 1. `writing-mode: vertical-rl` ＋ `text-orientation` ＋ `text-combine-upright`（C 版面與樣式層）

承載特徵五的縱組。整份詞書是真的縱排、右起，兩位數用縱中橫立起來。

- **查證來源**：caniuse `mdn-css_properties_writing-mode_vertical-rl`（統計 2026 年 7 月）——全球 **96.2%**；Chrome 48+、Firefox 43+、Safari 9+、Edge 12+、iOS Safari 9+。
- caniuse `mdn-css_properties_text-combine-upright`——全球 **96.68%**（95.92% 完整 + 0.76% 部分）；Chrome 48+、Firefox 48+、Safari 15.4+、Edge 79+。注意 **`digits` 值的支援度低於 `all`**，所以要把數字包進 `<span class="tcy">` 用 `all`，不要用 `text-combine-upright:digits`。
- **Fallback**：不支援時 `writing-mode` 被忽略即回到橫排，文字完全可讀；`text-combine-upright` 被忽略時數字改成逐字直立，仍然讀得出來。資訊零損失。
- **另一個實作陷阱**：縱排容器的捲動軸是**水平**的（`overflow-x:auto; overflow-y:hidden`），而且要給固定高度，否則行會無限往左長。≤900px 一律改回橫排。

### 2. 格子擴散 ＋ marching squares 等值線（E 資料與生成層）

承載特徵二。純 JavaScript，無瀏覽器 API 依賴，因此沒有相容性問題；同 seed 恆得同圖，所以 `?k=` 分享碼可完整還原。

- 與 L-system／WFC 等「重寫文法」不同：本項是**數值解**（顯式熱擴散的鬆弛）＋**幾何抽取**（marching squares → 端點雜湊接環 → Chaikin 平滑）。
- **效能實測**（Node 22、單執行緒，與瀏覽器同一份程式碼）：
  - 一枚母題（96 格、130 步、5 條等值線）：**約 40 ms**
  - 一盤八枚貝（82 格、120 步）：**約 190–260 ms**（換盤時顯示「摺っております……」）
  - 屏風一整幅 25 枚母題（建置時計算）：**約 850 ms**，輸出成靜態 SVG data URI，**執行時零計算**
- **無 JavaScript 時**：屏風、盤上的八枚貝、二十四枚圖鑑、五枚型紙全部是建置階段就算好的靜態 SVG／data URI，照樣看得見；只有「再落一滴」與貝覆的對局需要 JavaScript，而兩者的規則與八首和歌都以靜態表格完整列出。
- **頁面重量實測**（皆含全部 inline CSS／JS／圖像，預算 350KB）：index 97.1KB、kaioi 89.5KB、tarashi 84.4KB、atsurae 41.7KB。首屏 JS 初始計算：index 一枚見本約 40 ms、kaioi 的靜態盤 0 ms、tarashi 0 ms，皆 <100 ms。

### 3. 跨文件 View Transitions（`@view-transition{navigation:auto}`，B 動效與時間軸層）

承載轉場動效「畳む」，六格 `steps()` 對應六扇。

- **查證來源**：caniuse `cross-document-view-transitions`（統計 2026 年 7 月）——全球 **86.28%**（84.54% 完整 + 1.74% 部分）；Chrome／Edge **126+**、Safari **18.2+**、Opera 112+。**Firefox 仍未完整支援**（143 為預設關閉、144–156 為部分支援，已列入 2026 年的相容性路線）。
- **Fallback**：不支援時瀏覽器直接做一般的即時跳頁，四頁的內容與導覽完全相同，不需要任何 polyfill；`@view-transition` 規則本身會被忽略。
- `prefers-reduced-motion: reduce` 時把 `::view-transition-old/new(root)` 的 animation 設為 `none`，等同即時跳頁。

### 其他相容性註記

- `:has()`（用於 `label.opt:has(input:checked)` 的選取態）為 Baseline 2023（Safari 15.4+、Chrome 105+、Firefox 121+）。以 `@supports not selector(:has(*))` 把被視覺隱藏的原生控制項顯示回來，選取態不會消失。
- `Intl` 的和曆格式（`toLocaleDateString('ja-JP-u-ca-japanese',{era:'long'})`）用於納期顯示，同時並列西曆，任何實作差異都不會讓日期讀不出來。
- SVG 巢狀 `clip-path`（外層半面 × 內層貝殼外形＝交集）是 SVG 1.1 的既有行為，全瀏覽器支援；貝覆的「左片／右片」就靠這個切出來。

---

*本規格書隨 Demo 站「貝寄堂 Kaiyosedō」（貝合調製所 × 琳派）一同交付。SKILL.md 定義風格，不綁定產業——同一份規格可以拿去做美術館、和菓子、香水、書店或任何需要「有限的形、無限的水」的網站。*
