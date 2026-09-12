---
name: rinpa-kinji-mokkotsu
description: Rinpa school for the web — full-bleed gold-leaf ground with visible leaf seams, outlineless (mokkotsu) colour shapes, wet-on-wet tarashikomi pooling, repeated stylised kata motifs cropped by the edge, and a bold asymmetric void.
---

# 琳派 Rinpa 風格規格書（金地・没骨・たらしこみ）

> 本規格書描述的是**日本江戶時代的琳派（りんぱ）**，一個真實存在、可查證、可指名的畫派。
> 它不是本館自創的風格名稱。
>
> **起點**：十七世紀初，京都的町衆文化。俵屋宗達（?–1640 前後）經營一間叫「俵屋」的扇面繪工房，
> 為公家與富商畫扇、畫料紙。代表作《風神雷神図屏風》（建仁寺）。
> **中興**：尾形光琳（1658–1716），京都吳服商「雁金屋」之子。代表作《燕子花図屏風》（根津美術館）、
> 《紅白梅図屏風》（MOA 美術館）。弟弟尾形乾山（1663–1743）把同一套語彙搬到陶器上。
> **江戶琳派**：酒井抱一（1761–1829）在江戶私淑光琳，代表作《夏秋草図屏風》；
> 其弟子鈴木其一（1796–1858）把型推向更硬、更平面。
> **命名**：「琳派」這個詞是二十世紀才被追認的（取自「光**琳**」），三代人之間並無師承，
> 是**私淑**——後人看著前人的作品自學。這件事對規格書很重要：**琳派本來就是一套可被複製的視覺規格**，
> 這正是它適合寫成 SKILL.md 的原因。
>
> **製作技術的限制**：金箔一枚約一〇九公厘見方，必須一枚一枚押上並互相交疊；
> 岩絵具（礦物顏料）以膠（にかわ）為媒介，顆粒粗、覆蓋力強、乾得慢——
> 「乾得慢」直接生出了たらしこみ這個技法。**風格是製程的產物，不是品味的產物。**

---

## 一、設計哲學

**第一原則：地不是背景，地是一個物件。**

琳派的金地不是「金色的底」。它是一面被貼滿箔的紙，你看得見一枚一枚箔的接縫（箔足）、
看得見每一枚箔的色調略有差別、看得見轉角處缺了一小塊而露出底下的紅色下地。
把這些拿掉，換成一道 `linear-gradient(gold, darkgold)`，畫面立刻從琳派掉成「奢華品牌風」。

**第二原則：形沒有輪廓線。**

没骨（もっこつ）。形就是色塊本身。唯一被容許的線是金泥（きんでい）的葉脈、細枝與蔓，
而它們是裝飾不是輪廓——把它們拿掉，形還在。網頁上最省事的做法是給每個 `<path>` 加一圈 `stroke`，
而那一圈 stroke 就是這個風格的死刑。

**第三原則：兩筆在濕的時候相碰。**

たらしこみ。第一筆的膠水未乾，第二筆落下去，兩筆在交界互相推擠，
乾後邊緣留下一圈比中間深的積色、中間留下不規則的雲斑。
它**沒有光源方向**——它不是陰影，是水。所以它不能用 radial-gradient 假裝。

**第四原則：型會重複，而且會被邊緣切斷。**

琳派不寫生。它有一套高度樣式化的單元（波、梅、燕子花、秋草、松），
每一種只有少數幾個變體，反覆排列。而且群落會毫不留情地被畫面邊緣切掉——
《燕子花図屏風》的燕子花是走出屏風之外的，不是擺在畫框中央的。

**第五原則：間（ま）是主角。**

留白率至少 55%，而且那片空白必須是**一整塊**、必須有形狀、必須把畫面分成不對稱但等重的兩群。
《紅白梅図屏風》中間那條水流就是間。零散的呼吸空間不算間，那只是沒畫滿。

---

## 二、本風格的 5 個不可省略特徵

> 判準：拿掉任何一項，它就不是琳派了。

### 特徵 1｜金地（きんじ）與箔足（はくあし）

大面積的金必須由**離散的方形箔**拼成，接縫可見，逐枚色調不同，偶有缺角露出下地的赤。

```css
:root{ --kin:#C6A02A; --kin-hi:#E8CE72; --kin-lo:#96721A; --shitaji-aka:#9E3324; }
.kinji{
  background-color:var(--kin);
  background-image:
    /* ③ 一枚ごとの色ムラ＋砂子＋箔の欠け（建置時に生成した SVG data URI タイル） */
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='218' height='218'%3E%3Crect width='109' height='109' fill='rgba(255,250,228,.055)'/%3E%3Crect x='109' y='109' width='109' height='109' fill='rgba(84,60,14,.05)'/%3E%3Cpath d='M109 0l9 0l0 9z' fill='rgba(158,51,36,.30)'/%3E%3C/svg%3E"),
    /* ② 箔足：一〇九ピクセル角の継ぎ目 */
    repeating-linear-gradient(90deg, rgba(112,80,16,.22) 0 1px, transparent 1px 109px),
    repeating-linear-gradient(0deg,  rgba(112,80,16,.15) 0 1px, transparent 1px 109px),
    /* ① 地の金そのもの */
    linear-gradient(168deg,#D3B043 0%,var(--kin) 40%,#AE871F 74%,#CBA736 100%);
}
```

**禁止**：單一 `linear-gradient` 的金、任何 `box-shadow` 的金屬光、`background-size:cover` 的金屬貼圖。
**檢查方法**：把畫面縮到 25%，如果金地是一片平順的漸層而看不到網格，就沒做到。

### 特徵 2｜たらしこみ（濕疊積色）

色塊的**邊緣比中間深**，深的部分呈不規則的階梯狀色帶，且不跟隨任何光源方向。

```html
<filter id="tarashi" x="-8%" y="-8%" width="116%" height="116%" color-interpolation-filters="sRGB">
  <!-- 1) 湍流 -->
  <feTurbulence type="fractalNoise" baseFrequency="0.014 0.021" numOctaves="3" seed="23" result="n"/>
  <!-- 2) アルファを 5 段に離散化＝積色の輪。RGB は slope=0 で一定色に固定 -->
  <feComponentTransfer in="n" result="bands">
    <feFuncA type="discrete" tableValues="0 0 0.14 0.28 0.44 0.62"/>
    <feFuncR type="linear" slope="0" intercept="0.42"/>
    <feFuncG type="linear" slope="0" intercept="0.46"/>
    <feFuncB type="linear" slope="0" intercept="0.58"/>
  </feComponentTransfer>
  <!-- 3) 形の中だけに切る -->
  <feComposite in="bands" in2="SourceAlpha" operator="in" result="pool"/>
  <!-- 4) 縁のリム（形を侵蝕して差分＝外周だけ） -->
  <feMorphology in="SourceAlpha" operator="erode" radius="2.4" result="core"/>
  <feComposite in="SourceAlpha" in2="core" operator="out" result="rimA"/>
  <feFlood flood-color="#2A2A38" flood-opacity="0.34" result="rimC"/>
  <feComposite in="rimC" in2="rimA" operator="in" result="rim"/>
  <!-- 5) multiply で重ねて、形の外へはみ出さないよう最後にもう一度切る -->
  <feBlend in="SourceGraphic" in2="pool" mode="multiply" result="wet"/>
  <feBlend in="wet" in2="rim" mode="multiply" result="wet2"/>
  <feComposite in="wet2" in2="SourceAlpha" operator="in"/>
</filter>
```

濾鏡掛在**整層母題的 `<g>` 上**，不要逐 path 掛（一頁二十四張圖的話會跑不動）。
**禁止**：用 `radial-gradient` 做「中間亮邊緣暗」——那是球體打光，方向一致就露餡了。

### 特徵 3｜没骨（もっこつ）＝零輪廓線

```css
/* 母題の色塊：fill だけ。stroke は書かない */
.mp{ stroke:none; }
/* 唯一許される線＝金泥。必ず fill:none の別 path で、装飾としてのみ */
.ml{ fill:none; stroke:#B08A2C; stroke-width:1.15; }
```

自檢：把所有 `.ml` 設成 `display:none`，畫面必須仍然完全成立。若形塌掉了，代表你把金泥當輪廓用了。

### 特徵 4｜型（かた）の反復と裁ち落とし

同一個單元以少數變體反覆出現，並被畫面邊緣切斷。

```css
/* 母題は必ずコンテナの外へ出る。overflow:hidden が「裁ち落とし」を作る */
.field{ position:relative; overflow:hidden; }
.kata{ position:absolute; }
.kata--a{ left:-6%;  top:12%;  width:34%; }   /* 左端で切れる */
.kata--b{ right:-9%; bottom:4%; width:41%; }  /* 右下で切れる */
```

```html
<!-- 型の一例：光琳梅＝五つの円弁＋中心円＋金泥の蕊。輪郭線なし -->
<svg viewBox="-1.2 -1.2 2.4 2.4" width="120"><g>
  <circle cx="0"     cy="-0.45" r="0.36" fill="#A8382A"/>
  <circle cx="0.43"  cy="-0.14" r="0.36" fill="#A8382A"/>
  <circle cx="0.26"  cy="0.36"  r="0.36" fill="#A8382A"/>
  <circle cx="-0.26" cy="0.36"  r="0.36" fill="#A8382A"/>
  <circle cx="-0.43" cy="-0.14" r="0.36" fill="#A8382A"/>
  <circle cx="0" cy="0" r="0.17" fill="#F2ECDC"/>
  <g stroke="#B08A2C" stroke-width="0.03" fill="none">
    <path d="M0 0L0.30 0.30"/><path d="M0 0L-0.30 0.30"/><path d="M0 0L0.38 -0.10"/>
    <path d="M0 0L-0.38 -0.10"/><path d="M0 0L0.06 -0.40"/><path d="M0 0L-0.06 -0.40"/>
  </g>
</g></svg>
```

**禁止**：寫實描繪、半調網點、`feTurbulence` 手抖邊（那是迷幻海報的語彙）、細線幾何線描。

### 特徵 5｜大胆な余白と一塊の間（ま）

留白 ≥55%，且必須存在**一整塊連續**的空金地，把母題群分成不對稱的兩堆。

```css
.compo{
  display:grid;
  /* 左群 : 間 : 右群 = 3 : 4 : 2。間がいちばん広い。これが琳派 */
  grid-template-columns: 3fr 4fr 2fr;
  align-items:end;
}
.compo > .ma{ /* 何も置かない。ここに要素を足した瞬間に琳派ではなくなる */ }
```

自檢：把所有母題塗黑、金地塗白，二值化的圖上要看得見**一條寬到能寫字的白色通道**。

---

## 三、色彩系統

| 用途 | hex | 佔比 | 規則 |
|---|---|---|---|
| 金地 きんじ | `#C6A02A`（高 `#E8CE72`／低 `#96721A`） | 約 42% | 全站唯一的大面積地色。必附箔足與逐枚色調差 |
| 生成り紙 かみ | `#F4EFE2` | 約 22% | **長文一律在紙上，不在金地上**。金地上只准放題字級的大字 |
| 墨 すみ | `#16120E` | 約 14% | 正文、枝、幹 |
| 群青 ぐんじょう | `#27407F` | 約 9% | 花・水。岩絵具の第一色 |
| 緑青 ろくしょう | `#3B7A62` | 約 7% | 葉・松 |
| 朱 しゅ | `#A8382A` | ≤4% | 紅梅、拒絕された事、山摺の標示 |
| 下地の赤 | `#9E3324` | ≤1.5% | 箔の欠けからのぞく地。**必ず見えるところに一つ以上** |
| 金泥 きんでい | `#B08A2C` | ≤2% | 唯一許される線 |
| 銀地（別解） | `#B4B6AC` | — | 金地の代わりに使うとき。経年で鈍る想定で彩度を落とす |

**硬規則**
- 岩絵具の四色（群青・緑青・朱・胡粉）は**互いに隣接してよい**が、その境界は必ずたらしこみの積色で示す。境界に線を引かない。
- 金地の上に置いてよい文字は `font-size ≥ 20px` の題字だけ。それ以外は必ず紙の上に。
- グラデーションは金地と銀地にのみ許される。岩絵具は必ずベタ。

---

## 四、字體系統

| 役割 | 書体 | 指定 |
|---|---|---|
| 題字・見出し・銘 | Shippori Mincho B1 700 | `font-family:"Shippori Mincho B1","Noto Serif TC",serif` |
| 本文（中文） | Noto Serif TC 400 | `font-size:16px; line-height:1.95` |
| 数値 | 同上＋`font-variant-numeric:tabular-nums` | |

```css
h1{ font-size:clamp(26px,4.6vw,44px); line-height:1.35; letter-spacing:.02em }
h2{ font-size:clamp(20px,2.7vw,29px); line-height:1.4 }
.hd{ font-size:12.5px; letter-spacing:.24em }   /* 小見出し。字間を広く取るのが唯一のクセ */
```

**縦書き**（本風格の版面の一部であって装飾ではない）：

```css
.tate   { writing-mode:vertical-rl; text-orientation:upright; line-height:1.5 }
.tate-m { writing-mode:vertical-rl; line-height:1.62 }
.tate-m .num{ text-combine-upright:all }   /* 縦中横：二〜三桁の数字を一マスに */
```

**禁止**：ゴシック体（sans-serif）を見出しに使うこと。琳派の書は明朝の骨格。

---

## 五、版面與網格

- 基本は**紙のカード（`.kami`）を金地の上に浮かせる**二層構造。金地はページ全体、紙は情報の器。
- 紙には角丸を付けない。影は `0 10px 26px -18px rgba(40,26,4,.75)`（ほぼ接地影）一種類のみ。
- 三分割は `3fr 4fr 2fr` のような**不等分**。等分グリッドは琳派ではない。
- 母題は必ずコンテナの外へはみ出させる（特徴 4）。
- 余白は「まとめて一箇所」。各要素の margin を均等に広げるのではなく、**一つの空区画**を作る。

```css
.kami{
  background:var(--paper);
  border:1px solid rgba(60,42,10,.24);
  box-shadow:0 1px 0 rgba(255,252,236,.7) inset, 0 10px 26px -18px rgba(40,26,4,.75);
  padding:30px 34px;   /* 角丸なし */
}
```

---

## 六、元件配方

**nav（要導覽）**：四つのリブが同一の支点から放射し、現在ページのリブだけが大きく開く。
角度の総和は一定なので、一つを開けば他が詰まる。

```css
.rib-g .wedge{ fill:rgba(244,239,226,0); transition:fill .18s }
.rib-g.on .wedge{ fill:rgba(244,239,226,.93) }
.rib-g.on .rib-l{ stroke-width:4.6 }
```

**button**：塗りは墨、文字は金の高明度。角丸ゼロ、ぼかし影ゼロ。

```css
.btn{ background:#2C1E06; color:#E8CE72; border:1.5px solid #1B1305; padding:9px 20px;
      font-family:var(--serif); font-size:15px }
.btn:hover{ background:#9E3324; color:#F7EFDD }
```

**table**：横罫だけ。縦罫なし。ヘッダは太字の明朝。

```css
th,td{ border-bottom:1px solid rgba(40,26,4,.24); padding:9px 10px }
td.n { text-align:right; font-variant-numeric:tabular-nums }
```

**footer**：金地を切って墨のベタに落とす。金地とベタの境界に線は引かない（面が変わるだけ）。

---

## 七、動效規則

| 種類 | 觸發 | duration / easing | 內容 |
|---|---|---|---|
| ambient 金の照り返し | 常時 | 26s linear infinite | `--terikaeshi` を 104deg→464deg。金地のシーンバンドが一周する |
| input-driven 打ち返し | hover / pointermove | 90ms linear | `filter:brightness(1.055) saturate(1.03)`；扇面では最寄りの一摺だけ `brightness(1.09)` |
| transition 開扇 | ページ遷移 | 340ms（開）／380ms（閉）、`easeOutQuad` | 要の位置から扇形の `clip-path:polygon()` を毎フレーム計算して掃く |
| signature 摺り込み | 要ハンドルのドラッグ | 逐幀（rAF） | 角度 ×t、半径そのまま。面は交互に前後へ倒れ明暗二組に割れる |

```css
@property --terikaeshi{ syntax:"<angle>"; inherits:true; initial-value:104deg }
@keyframes teri{ from{--terikaeshi:104deg} to{--terikaeshi:464deg} }
body{ animation:teri 26s linear infinite }

@media (prefers-reduced-motion:reduce){
  body{ animation:none; --terikaeshi:128deg }      /* 箔足も金地も残る */
  *{ transition-duration:.001s!important }
  #wipe{ display:none!important }                  /* 遷移は即時 */
}
```

**signature の核心（コピーして使える）**：

```js
const PHI = 150;                 // 全開角（度）
const D2R = Math.PI/180;
// 攤平の極座標 (theta, r) → 開度 t の直交座標。角度だけが t 倍される
function pt(theta, r, t){
  const a = (-90 - PHI*t/2 + theta*t) * D2R;
  return [ r*Math.cos(a), r*Math.sin(a) ];
}
// 面 i の明暗：t=1 で全面が等明度＝絵が完全、t<1 で交互に倒れる
function faceShade(i, t){
  const g = Math.acos(Math.min(1, Math.max(0, t)));
  return 0.58 + 0.42 * Math.cos(((i%2)?1:-1)*g - 0.42);
}
```

**禁止**：淡入をこの風格の主動効に使うこと（金地は最初から在るもので、現れるものではない）。

---

## 八、插畫與圖像風格（kinji-mokkotsu 金地没骨図）

**原語は四種だけ**：

1. **金地**：箔足の格子＋一枚ごとの色調差＋砂子＋欠けから覗く赤。
2. **没骨の色塊**：閉じた点列（ベジェをサンプリングした多角形）。`fill` のみ。中にたらしこみ。
3. **型の単位**：波・梅・燕子花・秋草・松。各三変体。パラメータは位置・大きさ・変体のみ。
4. **金泥の細線**：葉脈・細枝・蔓・蕊。0.8〜1.4px、`fill:none`。装飾であって輪郭ではない。

**すべての図像を点列で持つこと**（ベジェのまま持たない）。理由は前縮：
極座標 (θ, r) に変換して θ だけを t 倍する写像は行列で書けないので、
どの図もリサンプリングした点列でなければ摺れない。これは扇に限らず、
**この風格を「折れる面」に載せるときの一般解**です。

**禁止**：写真、写実描写、半調網点、細線幾何線描（thin lineart）、`feDisplacementMap` の手ブレ縁。

---

## 九、Logo と Favicon

- Logo は**この風格の図像原語だけで作る**：金地の扇形 ＋ 一つの型 ＋ 明朝の店名。
- Favicon は 64×64 の inline SVG data URI。扇形を三面に割り、面ごとに金の三階調を塗り分け、
  要に墨の円。**16px でも「扇」と「金」が読めること**が唯一の基準。

```html
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' fill='%23C6A02A'/%3E%3Cpath d='M32 56L6 20A44 44 0 0 1 58 20Z' fill='%23E8CE72'/%3E%3Cpath d='M32 56L14 31A38 38 0 0 1 32 26Z' fill='%23C6A02A'/%3E%3Cpath d='M32 56L50 31A38 38 0 0 0 32 26Z' fill='%23A9831F'/%3E%3Cpath d='M18 34q14-9 28 0' stroke='%2327407F' stroke-width='4' fill='none'/%3E%3Ccircle cx='32' cy='56' r='4' fill='%2316120E'/%3E%3C/svg%3E">
```

---

## 十、Do & Don't

**Do**
- 金地に箔足を出す。缺角から下地の赤を一つは見せる。
- 色塊は fill だけ。境界はたらしこみで示す。
- 型を反復し、必ず一つは画面の外へ出す。
- 余白を一塊にまとめ、それを構図の主役にする。
- 長文は必ず紙の上へ。

**Don't**
- ❌ 単一グラデーションの金（＝奢華品牌風。これが最頻の失敗）
- ❌ 色塊への `stroke`（＝ベクター剪貼画になる）
- ❌ `radial-gradient` でたらしこみを偽装（光源方向が出る）
- ❌ 角丸・ぼかし影・`rounded-2xl` 系のカード
- ❌ 紫青グラデーション hero、中央揃え大見出し＋三枚カード
- ❌ 絵文字アイコン、Lorem ipsum、「EST. 19xx」バッジ
- ❌ 見出しのゴシック体
- ❌ 均等三分割グリッド（間が消える）

---

## 十一、頁面骨架範例（そのまま使える）

```html
<body class="kinji">
  <nav class="kaname-nav" aria-label="要導覽"><!-- 同一支点から四本 --></nav>
  <main>
    <!-- 一枚目：型と金地だけ。文字は題字のみ -->
    <section class="field" style="min-height:64vh">
      <svg class="kata kata--a" viewBox="…"><!-- 没骨の色塊 + filter:url(#tarashi) --></svg>
      <h1 class="tate" style="position:absolute;left:6%;top:8%">扇處 玉水</h1>
      <svg class="kata kata--b" viewBox="…"></svg>
    </section>

    <!-- 二枚目以降：長文は必ず紙の上 -->
    <section class="compo">
      <div class="kami"><h2>…</h2><p>…</p></div>
      <div class="ma"><!-- 空。ここがいちばん広い --></div>
      <div class="kami thin"><table>…</table></div>
    </section>
  </main>

  <svg width="0" height="0" style="position:absolute" aria-hidden="true">
    <defs><filter id="tarashi">…（第二章のフィルタ鎖）…</filter></defs>
  </svg>
</body>
```

---

## 十二、技術實作與相容性

> 查證日：**2026-08-19**。所有 API 皆以 MDN／web.dev／web-features 為準，未憑印象宣稱支援。

### 12.1 SVG 濾鏡鏈（feTurbulence → feComponentTransfer `type="discrete"` → feMorphology → feBlend `multiply`）

**承載**：特徵 2「たらしこみ」。沒有它，色塊只剩平塗，這個風格的第三原則直接消失。

**支援現況**：MDN《`<feComponentTransfer>`》標示 **Baseline Widely available**，自 **2015 年 7 月**起跨瀏覽器可用；
`<feFuncA>` 的 `type` 合法值包含 `identity | table | discrete | linear | gamma`，`discrete` 屬規格內值。
`feTurbulence`／`feMorphology`／`feComposite`／`feBlend`／`feFlood` 同為 SVG 1.1 濾鏡原語，支援情況一致。

**實作要點**
- 一定要寫 `color-interpolation-filters="sRGB"`。預設是 `linearRGB`，會讓 multiply 的結果整片發灰。
- `feFuncR/G/B` 用 `type="linear" slope="0" intercept="c"` 把湍流的 RGB 壓成固定色，只留 alpha 當形狀。
- 濾鏡掛在**一層 `<g>`** 上，不要逐 path。
- `x/y/width/height` 要放到 `-8%/116%` 以上，否則邊緣的 rim 會被濾鏡框切掉。

**Fallback**：不支援濾鏡（或使用者關閉 SVG 效果）時，`filter` 屬性被忽略，色塊退成平塗。
没骨、型、金地、版面全部保留，**資訊零損失**——たらしこみ是質感層，不承載任何資料。

**效能實測**：`shitate.html` 拖動要時，若讓濾鏡每幀重跑，25 間扇（24 面）在低階機上會掉幀；
因此拖曳期間以 `gm.removeAttribute('filter')` 卸下，放手立即復原。
單次濾鏡評估的區域被限制在地紙的 clip 範圍內（約 536×300 使用者單位）。

### 12.2 CSS `@property`（註冊 `<angle>` 型自訂屬性）

**承載**：ambient「金の照り返し」。`linear-gradient()` 的角度寫在未註冊的自訂屬性裡**不會補間**，
只會在 keyframe 邊界跳變；註冊成 `<angle>` 之後瀏覽器才知道怎麼內插。這是本效果的必要條件，不是裝飾。

**支援現況**：web.dev《@property: Next-gen CSS variables now with universal browser support》記載
三大引擎自 **2024 年 7 月**全部支援，**Baseline newly available（2024-07-09）**；
MDN《@property》同載。（web-features 預估 2027-01-09 轉為 Widely available。）

**Fallback**：舊瀏覽器忽略 `@property`，`--terikaeshi` 退回字串型自訂屬性——
動畫變成每個 keyframe 的跳變或直接不動，金地、箔足、砂子、缺角全部保留，資訊零損失。
本站另外把 `--terikaeshi` 的初始值同時寫在 `body{}` 裡，確保 `@property` 完全不被解析時仍有值。

### 12.3 CSS `writing-mode: vertical-rl` ＋ `text-orientation` ＋ `text-combine-upright`

**承載**：特徵 5 的版面手法與題字。琳派的書是縦書き；扇面上的字必須沿骨的方向直排，
否則一摺就把一行字折斷。這是排版結構，不是裝飾。

**支援現況**：MDN《writing-mode》標示 **Baseline Widely available，2017 年起**跨瀏覽器；
《text-orientation》**2020 年 9 月**起跨瀏覽器。
《text-combine-upright》：`all` 值的支援度優於 `digits`；**`digits <integer>` 目前沒有任何瀏覽器實作**，
因此本站只使用 `text-combine-upright:all` 並自行以 `<span class="num">` 包住要縦中横的數字。

**Fallback**：`text-combine-upright` 不支援時，數字退成逐字直立排列——多佔一兩格，可讀性不變。
`writing-mode` 本身無支援缺口。

### 12.4 效能預算（實測）

| 頁 | inline 後大小 | 備註 |
|---|---|---|
| `index.html` | 約 201KB | 靜態扇面（無 JS 保底）＋引擎＋執行期 |
| `zuan.html` | 約 236KB | 二十四張型の縮圖＋三張比較扇 |
| `shitate.html` | 約 116KB | |
| `kobo.html` | 約 88KB | |

- 全部 < 350KB 硬門檻，且不含外部圖片（Google Fonts 除外）。
- 要のドラッグ：每幀只做 `setAttribute('d', …)`，**不重建 DOM、不呼叫 `getBoundingClientRect`、不改變版面幾何**，
  因此不觸發 layout（no layout thrashing）。11 間扇每幀約 40 次、25 間扇約 90 次屬性寫入。
- 幾何計算本體（點列的極座標寫像）在 Node 22 單執行緒實測：整面扇（三個母題・約 900 點）一次重算 **≈0.55ms**，
  60fps 的預算 16.7ms 綽綽有餘。

### 12.5 無 JavaScript 時

四頁的扇面都在**建置階段**以同一支引擎輸出為靜態 SVG 直接寫進 HTML，
關掉 JavaScript 仍看得到完整的金地、箔足、摺線、骨、母題與縦書きの題字。
導覽是真正的 `<a href>`；`kobo.html` 的問合せ單以 `novalidate` 加自寫檢查，
關掉 JS 時瀏覽器原生驗證仍在。**只有「拖動要」與「誂え」的即時檢分需要 JavaScript。**
