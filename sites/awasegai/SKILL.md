---
name: rinpa-gold-ground
description: Rinpa school visual language — flat gold-leaf ground with visible leaf seams and a single moving light, tarashikomi pigment pooling, unmixed mineral pigment flats, motifs cropped by the frame with more than half the surface left as gold, and Kōrin's radically abstracted plant signs.
---

# 琳派 — 金地・たらしこみ・光琳模様

> この SKILL.md だけを読んで、まったく別の産業のサイトを一から作れるように書いてあります。
> 参照実装：`sites/awasegai/`（京都・室町の婚礼調度と貝合わせ道具の工房）。

---

## 一、設計哲学

### この流派は何か

琳派（りんぱ）は、江戸初期の京都で **本阿弥光悦（1558–1637）と俵屋宗達（生没年不詳、17 世紀前半）** が始め、約 100 年の断絶を挟んで **尾形光琳（1658–1716）・尾形乾山** が受け継ぎ、さらに 100 年後の江戸で **酒井抱一（1761–1829）・鈴木其一** が再興した流派です。師弟の系譜ではなく、**過去の作品を見て一人で私淑する**という異例のつながり方をしました（「私淑の流派」）。

代表作は宗達《風神雷神図屏風》（建仁寺）、光琳《燕子花図屏風》（根津美術館・国宝）《紅白梅図屏風》（MOA 美術館・国宝）、抱一《夏秋草図屏風》（東京国立博物館）。

### なぜこの見た目になったのか（技術的必然）

1. **金地は光源装置である。** 屏風は電灯のない書院で使われました。金箔は蝋燭一本の光を面で反射し、部屋を明るくする実用品です。だから金は「背景色」ではなく **画面の主体（面積で半分以上）** であり、見る角度と光の向きで表情が変わることが前提です。フラットな黄色い塗り面は琳派ではありません。
2. **箔足は隠せない。** 金箔一枚は約 10.9 cm 角。屏風一扇を覆うには何十枚も継ぐしかなく、継ぎ目（箔足）が必ず格子状に見えます。**箔足を消すとただの金色になります。**
3. **たらしこみは工程の副産物。** 膠で溶いた岩絵具は乾くのが遅い。乾ききらないうちに次の絵具を落とすと境で溜まって縁が濃くなる。宗達がこの「事故」を技法にしました。**輪郭線でなく溜まりの縁がかたちを決める**のはこのためです。
4. **岩絵具は混ざらない。** 群青（藍銅鉱）緑青（孔雀石）は鉱物を砕いた粒で、混色すると濁って発色が死にます。だから **平塗り・混色なし・影なし**。立体表現がないのは技術の限界ではなく、材料の必然です。
5. **屏風は折れて動く。** 六曲一双は畳んで運び、立てて置く道具です。一扇ずつ角度が違うので、同じ金地でも扇ごとに明るさが違います。主題を中央に置くと折り目に落ちるため、**画面の縁で切り、余白（金地）を主役にする**構成になりました。

### 一行でいうと

> **金は絵具ではなく光である。絵はその光の上に、混ぜない色を平らに、縁で切って置く。**

### この流派を選ぶべき産業／選ぶべきでない産業

- 向く：婚礼・慶事、和菓子、香、着物、料亭、旅館、庭、季節商品、工芸、美術館、酒。
- 向く（意外に）：季節性の強い一次産業（養蜂・茶・果樹）、儀礼を扱う士業。
- 向かない：スピードや安さを訴えるもの、密度の高いダッシュボード、長文の技術文書（金地の上に長文を置けないため）。

---

## 二、本風格の 5 個不可省略特徵

> **どれか一つ抜くと琳派に見えなくなります。** 5 つとも実装したうえで「文字を全部隠して 3 秒見せて、これは琳派だと言われるか」を必ず確認してください。

### 特徵 1｜金地（きんじ）— 平坦な金・見える箔足・一方向の光

金は面積で **48–58%**。グラデーションで金を作らない。代わりに **(a) 箔足の方眼、(b) 一方向の照り、(c) 微細な粒** の三層を重ねます。

```css
:root{ --kin:#CDA43B; --kin-hi:#F0DB93; --kin-lo:#A57C22; --haku:109px; }
/* (a) 箔足＝金箔一枚 10.9cm の継ぎ目。1px の暗線と 1px の明線を対で置く */
.kinji{
  position:relative; isolation:isolate;
  background-color:var(--kin);
  background-image:
    repeating-linear-gradient(90deg, rgba(120,88,16,.30) 0 1px, transparent 1px var(--haku)),
    repeating-linear-gradient(0deg,  rgba(120,88,16,.30) 0 1px, transparent 1px var(--haku)),
    repeating-linear-gradient(90deg, rgba(255,240,190,.22) 1px 2px, transparent 2px var(--haku)),
    repeating-linear-gradient(0deg,  rgba(255,240,190,.22) 1px 2px, transparent 2px var(--haku));
  background-size:var(--haku) var(--haku);
}
/* (b) 照り＝一方向の光。JS は transform と opacity しか書かない（合成のみ・60fps） */
.kinji > .teri{
  position:absolute; inset:-20%; pointer-events:none; opacity:.5;
  background:radial-gradient(58% 78% at 50% 50%,
     rgba(255,246,214,.92) 0%, rgba(246,225,150,.42) 34%,
     rgba(150,110,26,.16) 70%, rgba(96,68,10,.30) 100%);
  mix-blend-mode:soft-light; will-change:transform;
}
.kinji > *{ position:relative; z-index:1 }
```

```html
<!-- (c) 箔の粒＝SVG 鏡面反射。光源 fePointLight は照りと同じ座標を共有する -->
<filter id="hakuF" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">
  <feTurbulence type="fractalNoise" baseFrequency="0.9 0.62" numOctaves="1" seed="17" result="n"/>
  <feSpecularLighting in="n" surfaceScale="2.4" specularConstant="1.02"
                      specularExponent="26" lighting-color="#FFF3C8" result="sp">
    <fePointLight id="hakuLight" x="160" y="44" z="58"/>
  </feSpecularLighting>
  <feComposite in="sp" in2="SourceAlpha" operator="in"/>
</filter>
<svg class="haku-grain" viewBox="0 0 320 200" preserveAspectRatio="none" aria-hidden="true">
  <rect width="320" height="200" fill="#000" filter="url(#hakuF)"/>
</svg>
```
```css
.haku-grain{ position:absolute; inset:0; width:100%; height:100%;
  opacity:.30; mix-blend-mode:screen; pointer-events:none }
@media (max-width:900px){ .haku-grain{ display:none } }  /* 携帯では粒を落とす（理由は第十二章） */
```

**抜くとどうなるか：** 箔足を消すと「黄土色の背景」に、照りを消すと「印刷された金色」になります。金が動かない琳派はありません。

### 特徵 2｜たらしこみ — 輪郭線ではなく溜まりの縁で形が決まる

塗りの **内側が明るく、縁に絵具が濃く溜まる**。線を引かない。SVG では放射グラデーション一枚で再現できます。

```html
<radialGradient id="taraAi" cx="41%" cy="34%" r="74%">
  <stop offset="0"   stop-color="#6E8CCB"/>  <!-- 中央：薄い -->
  <stop offset=".5"  stop-color="#2F4F98"/>
  <stop offset=".84" stop-color="#1B3163"/>  <!-- 溜まりの縁 -->
  <stop offset="1"   stop-color="#122246"/>
</radialGradient>
```
かたちは真円や楕円ではなく、**閉じた自由曲線**にします（不規則に揺らした点列を Catmull–Rom で閉じる）：

```js
// 閉曲線（たらしこみの色面）
function pool(p){var m=p.length,d='M'+p[0][0]+','+p[0][1],i;
  for(i=0;i<m;i++){var a=p[(i-1+m)%m],b=p[i],c=p[(i+1)%m],e=p[(i+2)%m];
    d+='C'+(b[0]+(c[0]-a[0])/6)+','+(b[1]+(c[1]-a[1])/6)+' '
       +(c[0]-(e[0]-b[0])/6)+','+(c[1]-(e[1]-b[1])/6)+' '+c[0]+','+c[1];}
  return d+'Z';}
// 揺らした点列（k=7〜10、w=.16〜.24）
function blobPts(cx,cy,rx,ry,k,rnd,w){var a=[],i,t,g;
  for(i=0;i<k;i++){t=i/k*6.283185+rnd.f(0,.4);g=1+rnd.f(-w,w);
    a.push([cx+Math.cos(t)*rx*g, cy+Math.sin(t)*ry*g]);}return a;}
```

**禁止：** `stroke` で輪郭を描いてから塗りつぶすこと。ドロップシャドウ。`feTurbulence`＋`feDisplacementMap` の手ブレ加工（それは迷幻海報や版画の語彙で、たらしこみとは別物です）。

### 特徵 3｜岩絵具の平塗り — 五色・混色なし・面積が決まっている

| 色 | hex | 由来 | 使いどころ | 面積 |
|---|---|---|---|---|
| 群青 | `#2A4A93` | 藍銅鉱 | 主題（花・水） | 約 22% |
| 緑青 | `#4C7A5B` | 孔雀石 | 葉・草・房 | 約 16% |
| 胡粉 | `#F1EBDA` | 牡蠣殻 | 地塗り・白い花・長文の紙 | 約 20% |
| 臙脂 | `#9E3524` | 蘇芳・紅花 | 蕊・紅葉・拒否 | **5% 以下** |
| 金泥 | `#8A6819` | 金粉＋膠 | 蕊と縁の点 | **3% 以下** |
| 墨 | `#1C180F` | 松煙 | 枝・輪郭・本文 | 約 10% |

- **混色しない。** `color-mix()` や `opacity` で中間色を作らない。中間調がないのがこの流派です。
- **影を置かない。** `box-shadow` はぼかさず **実色のオフセット矩形** のみ（`3px 4px 0 rgba(74,54,12,.30)`）。
- **臙脂が 5% を超えた瞬間に別の流派になります。**

### 特徵 4｜切り取りと余白 — 縁で切る・奇数で群れる・金地を半分残す

- 主題は **必ず画面の縁で切られる**。全形を中央に置いて見せるのは図鑑の作法であって琳派ではありません。
- 群れは **奇数**（3・5・7）。左右対称にしない。
- 金地の余白 **55% 以上**。
- 長文は金地に直接置かず、**色紙形（しきしがた）＝胡粉の紙の矩形**を貼り、その上に書く。これは実際の屏風の作法であり、同時にコントラスト問題の唯一の正解です。

```css
/* 色紙形：金地に貼った紙。影はぼかさず実色でずらす */
.shikishi{
  background:#F1EBDA;
  box-shadow:0 0 0 1px rgba(28,24,15,.55), 3px 4px 0 rgba(74,54,12,.30);
  padding:20px 22px;
}
.shikishi.tate{ writing-mode:vertical-rl; text-orientation:mixed }
.tcy{ text-combine-upright:all }   /* 縦中横：縦組みの中の 2〜4 桁の数字 */
```
```svg
<!-- 縁で切る＝要素を viewBox の外まではみ出させる。clip はしても中央に寄せない -->
<svg viewBox="0 0 120 84">
  <rect width="120" height="84" fill="#CDA43B"/>
  <!-- 株は x=-14 と x=124 に置き、両端が切れるようにする -->
</svg>
```

### 特徵 5｜光琳模様 — 自然形の極端な約め

写実に近づけるほど琳派から離れます。**梅は円だけ、水は等振幅の平行波、松は房と針。**

```js
/* 光琳梅：円を 5 つ回して置き、中心に円、蕊は直線 5 本。それ以外を描かない */
function ume(cx,cy,rad,rnd){
  var g='',i,a,off=rnd.f(0,6.28);
  for(i=0;i<5;i++){a=off+i/5*6.283185;
    g+='<circle cx="'+(cx+Math.cos(a)*rad)+'" cy="'+(cy+Math.sin(a)*rad)+'" r="'+rad*0.70+'" fill="#F1EBDA"/>';}
  g+='<circle cx="'+cx+'" cy="'+cy+'" r="'+rad*0.40+'" fill="#9E3524"/>';
  for(i=0;i<5;i++){a=off+.62+i/5*6.283185;
    g+='<line x1="'+cx+'" y1="'+cy+'" x2="'+(cx+Math.cos(a)*rad*.86)+'" y2="'+(cy+Math.sin(a)*rad*.86)+'" stroke="#8A6819" stroke-width=".9"/>';}
  return g;
}
/* 光琳水：振幅も間隔も線幅も変えない平行波。強弱をつけたら水墨画になります */
function mizu(x0,y0,w,rows,amp,gap){
  var g='',r,i,y,d,seg=5;
  for(r=0;r<rows;r++){ y=y0+r*gap; d='M'+x0+','+y;
    for(i=0;i<seg;i++){ d+='Q'+(x0+w*(i+.5)/seg)+','+(y+(i%2?amp:-amp))+' '+(x0+w*(i+1)/seg)+','+y; }
    g+='<path d="'+d+'" fill="none" stroke="#2A4A93" stroke-width="2.3"/>'; }
  return g;
}
```

---

## 三、色彩系統

| 役割 | hex | 面積 | 規則 |
|---|---|---|---|
| 金地 | `#CDA43B`（照り `#F0DB93` ／陰 `#A57C22`） | 48–58% | 背景ではなく主体。必ず箔足と照りを伴う |
| 胡粉／紙 | `#F1EBDA`（副 `#E6DCC2`） | 18–22% | 長文はすべてこの上。金地に長文を置かない |
| 群青 | `#2A4A93`（明 `#5B7BC0` ／暗 `#1B3163`） | 20–24% | 主題専用。リンク色にしてよい |
| 緑青 | `#4C7A5B`（明 `#7CA789` ／暗 `#31543D`） | 14–18% | 葉・草のみ。UI の成功色に流用しない |
| 墨 | `#1C180F` | 8–12% | 枝・輪郭・本文・footer 地 |
| 臙脂 | `#9E3524` | **≤5%** | 蕊・紅葉・現用態・拒否 |
| 金泥 | `#8A6819` | **≤3%** | 点として。線として使わない |

- **禁止：** 紫青のグラデーション、白 `#FFF` の大面積（紙は必ず `#F1EBDA` 系の暖色）、任意の中間グレー、彩度の低い「くすみカラー」。
- **配色チェック：** 金地の上に置いてよいのは 胡粉の紙・群青・緑青・墨・臙脂の平塗りだけ。半透明の白いカードを金の上に浮かべた瞬間に琳派は終わります。

---

## 四、字體系統

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Shippori+Mincho+B1:wght@400;700&family=Noto+Serif+TC:wght@400;700&display=swap" rel="stylesheet">
```
```css
:root{ --mincho:'Shippori Mincho B1','Noto Serif TC','Songti TC',serif }
body{ font-family:var(--mincho); font-weight:400; line-height:1.9 }
h1{ font-size:clamp(30px,4.6vw,58px); letter-spacing:.16em; font-weight:700; line-height:1.35 }
h2{ font-size:clamp(21px,2.5vw,30px); letter-spacing:.22em; font-weight:700 }
h3{ font-size:17px; letter-spacing:.16em; font-weight:700 }
p { font-size:15px; line-height:1.9 }
.note,.small{ font-size:12.5px; line-height:1.85; letter-spacing:.1em; color:#4A3A16 }
```

- **明朝体（セリフ）以外を使わない。** ゴシックを一書体でも混ぜると近代的になり、流派が消えます。
- **字間を広く取る。** 見出し `.16em〜.34em`。琳派の文字は詰めません。
- **ウェイトは 400 と 700 の二段だけ。** 500/600 を作らない（岩絵具に中間調がないのと同じ理屈）。
- **縦組みを既定にする範囲：** 見出し・キャプション・短文・記録カード・色紙形の中身。
- **横組みに戻す範囲：** 表・フォーム・120 字を超える段落。`@media (max-width:900px)` で縦組みを横組みに落とす（ただし屏風の中の色紙形は縦のまま。理由は第七章）。

---

## 五、版面與網格

### 屏風グリッド（この流派固有の版面）

コンテンツ幅を **6 等分（六曲）** し、隣り合う扇を交互に ±7° 傾けます。一枚の絵を 6 枚に切って各扇に配り、扇ごとに違う明るさを与える。これが琳派サイトの背骨です。

```css
.byobu{ position:relative; display:flex; min-width:960px; perspective:1500px; perspective-origin:50% 42% }
.chou{ position:relative; flex:1 1 0; height:min(58vh,430px); min-width:150px;
  transform-style:preserve-3d;
  border-left:3px solid #17140C; border-right:3px solid #17140C;
  box-shadow:inset 0 0 0 1px rgba(60,44,8,.5) }
.chou:nth-child(odd){  transform:rotateY(-7deg) }
.chou:nth-child(even){ transform:rotateY( 7deg) }
.chou > .art{ position:absolute; inset:0; width:100%; height:100% }  /* viewBox="{i*120} 0 120 300" */
.chou > .lit{ position:absolute; inset:0; pointer-events:none; opacity:.45;
  background:linear-gradient(96deg,rgba(255,246,214,.85) 0%,rgba(255,240,190,.30) 46%,rgba(120,86,14,.10) 100%);
  mix-blend-mode:soft-light; will-change:opacity }
```

- 絵は **一枚**（例：720×300）を作り、各扇は `viewBox="{i*120} 0 120 300"` で自分の担当区間だけを映します。扇ごとに別の絵を置くと屏風になりません。
- 色紙形は扇の内側に **絶対配置＋±0.6° の傾き**。整列させない。
- 本文セクションは 1180px 中央寄せ、2 カラム（`1.25fr .85fr`）。カードを 3 枚横並びにしない。
- 角丸は **全面禁止**（`border-radius:0`）。屏風にも紙にも角丸はありません。
- 罫線は 1px 実線 `rgba(28,24,15,.30)`。破線・点線を使わない。

### RWD

| 幅 | 扱い |
|---|---|
| >900px | 屏風 6 扇、縦組み、箔の粒あり |
| ≤900px | 屏風は横スクロール（`overflow-x:auto`、`min-width` 維持）。一般の縦組みは横組みへ。箔の粒 `display:none` |
| ≤560px | 扇の高さ 340px、屏風 `min-width:760px`。表は 13px。色紙形の中身は縦組みのまま（横 126px に横組みは入らないため） |

---

## 六、元件配方

```css
/* nav：ペア（貝・扇・対）のメタファーを使う。現用態は色でなく「揃っていること」で示す */
.nav a{ display:block; width:124px; height:74px; text-decoration:none; color:#1C180F }
.nav a .half-l{ transform:translateX(-13px); opacity:0;
  transition:transform .32s cubic-bezier(.2,.8,.25,1), opacity .32s }
.nav a:hover .half-l{ transform:translateX(-5px); opacity:.55 }
.nav a[aria-current="page"] .half-l{ transform:translateX(0); opacity:1 }
.nav a[aria-current="page"] .lbl{ color:#9E3524; font-weight:700 }

/* 按鈕：角丸なし・ぼかしなし・実色のオフセット影 */
.btn{ font-family:var(--mincho); font-size:15px; letter-spacing:.2em; font-weight:700;
  padding:11px 24px; border:1px solid #1C180F; background:#F1EBDA; color:#1C180F;
  box-shadow:3px 3px 0 rgba(28,24,15,.55); cursor:pointer }
.btn:hover{ background:#F0DB93 }
.btn:active{ transform:translate(2px,2px); box-shadow:1px 1px 0 rgba(28,24,15,.55) }
.btn.ai{ background:#2A4A93; color:#F1EBDA; border-color:#1B3163 }

/* 卡片＝色紙形。ガラス風・半透明・ぼかし影は禁止 */
.hako{ border:1px solid rgba(28,24,15,.32); padding:18px 20px; background:#EFE8D4 }

/* 表單 */
select,input,textarea{ font-family:var(--mincho); font-size:14.5px; padding:8px 10px;
  border:1px solid rgba(28,24,15,.45); background:#FCF9F0; color:#1C180F; border-radius:0 }
:focus-visible{ outline:2px solid #9E3524; outline-offset:3px }

/* 表 */
th{ background:#E6DCC2; font-weight:700; letter-spacing:.1em; white-space:nowrap }
th,td{ border:1px solid rgba(28,24,15,.30); padding:9px 11px; vertical-align:top }

/* footer：墨地に金の見出し */
footer.ft{ background:#1C180F; color:#CDBE99; padding:42px 0 54px; line-height:2.1 }
footer.ft b{ letter-spacing:.24em; color:#CDA43B }
footer.ft a{ color:#F0DB93 }
```

---

## 七、動效規則（4 種すべて必須）

| 種別 | 何 | 触发 | duration / easing |
|---|---|---|---|
| **ambient 環境** | 光源が 38 秒周期で弧を描いて動き、各扇の明るさと箔の粒が変わる | 入力不要 | `38s` 正弦、`lerp .10 / frame` |
| **input-driven 入力** | ポインタ座標（またはデバイスの傾き）が光源になる。遅延 <100ms | `pointermove` ／ `deviceorientation` | 追従 `lerp .10`（実効 ≈ 60ms で 50% 到達） |
| **transition 転場** | 状態切替（貝を起こす／カードを開く）は Y 軸 3D 反転 | クリック／Enter | `.40s cubic-bezier(.3,.85,.25,1)` |
| **signature 簽名** | **継ぎが照る（hakuashi-tsugi）** — 二片が合った瞬間、中線が消え、継ぎ目に沿って金の照りが上から下へ一度だけ走り、割ってあった上の句と下の句が一首に戻る | 照合成功 | `.85s ease-out`、1 回のみ |

```css
/* signature：継ぎが照る */
.tsugi{ position:absolute; top:0; bottom:0; left:50%; width:16px; margin-left:-8px; pointer-events:none;
  background:linear-gradient(90deg,rgba(255,244,206,0),rgba(255,244,206,.95),rgba(255,244,206,0)); opacity:0 }
.pair.hit .tsugi{ animation:teru .85s ease-out 1 }
@keyframes teru{
  0%  { opacity:0; transform:translateY(-110%) scaleY(.4) }
  22% { opacity:1 }
  100%{ opacity:0; transform:translateY(110%)  scaleY(1.2) }
}
```

**降級（`prefers-reduced-motion:reduce`）— 情報の欠落ゼロ：**

1. ambient：光源は `(.5,.22)` に固定。金地・箔足・扇ごとの明暗はすべて残る。
2. input：追従の補間を切って即座に代入。反応そのものは残る。
3. transition：反転せず即座に差し替え。
4. signature：照りは走らず、継ぎ目が即座に消えて歌が表示される。**判定結果・記録・共有コードは一切変わらない。**

```css
@media (prefers-reduced-motion:reduce){
  *{ animation-duration:.001ms !important; animation-iteration-count:1 !important;
     transition-duration:.001ms !important }
}
```

**やってはいけない動き：** フェードイン一斉登場、スクロール連動パララックス、数字のカウントアップ、要素のバウンド。琳派の画面は「光だけが動き、絵は動かない」。

---

## 八、插畫與圖像風格

**block-tarashikomi（分層溜まり構成）** — 外部画像ゼロ、写実描写ゼロ。原語は 5 つだけで、サイト上の全画像（屏風、意匠見本、サムネイル、logo、favicon、印記）をこの 5 つの組み合わせで作ります。

1. **たらしこみの色面**：揺らした点列を Catmull–Rom で閉じ、放射グラデーションで縁に溜める。
2. **剣状の葉**：根元 → 先端で幅が 0 に収束する 2 本のベジェを閉じたもの。反りは `lean` 一変数。
3. **枝**：墨の 2 次ベジェ一本（`stroke-width:2.6`、`stroke-linecap:round`）。塗らない。
4. **記号化した花**（光琳梅・菊の花弁環・松の房）：円・楕円・直線のみ。
5. **等振幅の平行波**（光琳水）：振幅・間隔・線幅すべて一定。

**判定基準：** 色を全部抜いても「どの原語で組まれているか」が読めること。読めないなら描き込みすぎです。

**明文禁止：** 写真、`feTurbulence`＋`feDisplacementMap` の手ブレ、ハーフトーン網点、細線幾何線描（thin-lineart）、絵文字アイコン、`stroke-dasharray` の描画アニメーション。

---

## 九、Logo 與 Favicon

- **Logo は「対（つい）」の構造にする。** 一枚の絵を中線で二つに割り、両半分に同じ絵の続きを描く。これがこの参照実装の商標です（`assets/logo.svg`、248×148）。他業種では「一双の扇」「割った印」「二枚の紙」でも成立します。
- 構成：墨地 → 金の下地 → 光琳梅の続く枝 → 墨 1.5px の外形線 → 中線に破線（`stroke-dasharray:3 3`）。
- **Favicon は inline SVG data URI。** 金の正方形（`#CDA43B`）＋墨の楕円＋中線＋光琳梅一輪。16px でも「金地に白い五つの円」が読めるところまで単純化します。

```html
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' fill='%23CDA43B'/%3E%3Cpath d='M32 10c17 1 29 10 29 22s-13 22-29 22S3 44 3 32 15 11 32 10z' fill='none' stroke='%231C180F' stroke-width='3'/%3E%3Cline x1='32' y1='10' x2='32' y2='54' stroke='%231C180F' stroke-width='2.4'/%3E%3Ccircle cx='32' cy='32' r='6.6' fill='%23F1EBDA'/%3E%3Ccircle cx='23' cy='27' r='5.4' fill='%23F1EBDA'/%3E%3Ccircle cx='41' cy='27' r='5.4' fill='%23F1EBDA'/%3E%3Ccircle cx='25' cy='40' r='5.4' fill='%23F1EBDA'/%3E%3Ccircle cx='39' cy='40' r='5.4' fill='%23F1EBDA'/%3E%3Ccircle cx='32' cy='32' r='2.7' fill='%239E3524'/%3E%3C/svg%3E">
```

---

## 十、Do & Don't

**Do**

- 金を面積の半分以上に使い、箔足を見せ、光を一方向から当てて動かす。
- 長文は必ず色紙形（`#F1EBDA` の紙）の上に置く。
- 主題を画面の縁で切る。奇数で群れさせる。金地の余白を 55% 以上残す。
- 岩絵具 5 色を混ぜずに平らに置く。臙脂 ≤5%、金泥 ≤3%。
- 明朝体のみ。ウェイトは 400/700 の二段。字間を広く。
- 縦組みを既定に。数字は `text-combine-upright:all` で縦中横。
- 影は実色のオフセット。角丸は 0。

**Don't（去 AI 化禁令を含む）**

- 紫青グラデーションの hero。中央大見出し＋副題＋ボタン 2 個＋角丸カード 3 枚。
- 金をグラデーションで作る／箔足を消す／光を止める。
- 金地の上に長文を直接置く（読めない上に、屏風の作法にない）。
- 半透明・ぼかし・ガラス擬態のカードを金の上に浮かべる。
- 岩絵具の混色、中間グレー、影・立体表現。
- ゴシック体の混入、文字詰め、ウェイト 500/600 の使用。
- 写実的な花や風景の描画。写真。絵文字アイコン。Lorem ipsum。
- 「EST. 19xx」バッジ、「〇〇を△△に変える」型の見出し、マーキー（この流派の語彙にありません）。
- スクロール連動パララックス、フェードイン一斉登場、数字のカウントアップ。

---

## 十一、頁面骨架範例（そのまま使えます）

```html
<!doctype html>
<html lang="ja">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>屋号 — 業種</title>
<link rel="icon" href="data:image/svg+xml,…"><!-- 第九章 -->
<link href="https://fonts.googleapis.com/css2?family=Shippori+Mincho+B1:wght@400;700&family=Noto+Serif+TC:wght@400;700&display=swap" rel="stylesheet">
<style>/* 第三〜六章のトークンと配方をここに inline */</style>
</head>
<body>

<!-- 1. 文書スコープの defs：たらしこみのグラデーションと箔のフィルタ -->
<svg width="0" height="0" aria-hidden="true" style="position:absolute"><defs>
  <radialGradient id="taraAi" …>…</radialGradient>
  <filter id="hakuF" …>…<fePointLight id="hakuLight" x="160" y="44" z="58"/>…</filter>
</defs></svg>

<!-- 2. 金地の見出し帯。照りと箔の粒を敷く -->
<header class="kinji">
  <i class="teri" aria-hidden="true"></i>
  <svg class="haku-grain" viewBox="0 0 320 200" preserveAspectRatio="none" aria-hidden="true">
    <rect width="320" height="200" fill="#000" filter="url(#hakuF)"/></svg>
  <div class="wrap"><a class="brand" href="index.html">…logo…</a>
    <nav class="nav" aria-label="頁面">…対のメタファー…</nav></div>
</header>

<!-- 3. 首屏＝屏風。大見出し hero を置かない。情報は色紙形の中に縦書きで -->
<main>
<section class="byobu-outer"><div class="byobu-scroll">
  <div class="byobu" role="img" aria-label="金地の六曲屏風。各扇に色紙形が貼られ、店の情報が縦書きで記されている。">
    <div class="chou" data-yaw="-7">
      <svg class="art" viewBox="0 0 120 300" preserveAspectRatio="none" aria-hidden="true">…一枚絵の 1/6…</svg>
      <i class="lit" aria-hidden="true"></i>
      <div class="shikishi tate"><h1>屋号</h1><p>業種／取扱</p></div>
    </div>
    <div class="chou" data-yaw="7">…viewBox="120 0 120 300"…</div>
    <!-- 計 6 扇 -->
    <svg class="haku-grain" …></svg>
  </div>
</div></section>

<!-- 4. 本文は胡粉地の上。表・フォームは横組み -->
<div class="body"><section class="sec wrap">…</section></div>
</main>

<footer class="ft">…墨地に金の見出し…</footer>

<script>/* 意匠引擎（第八章の 5 原語） */</script>
<script>/* 照り engine（第七章・第十二章） */</script>
</body></html>
```

**照り engine（そのまま流用可）**

```js
(function(){
  var RM=matchMedia('(prefers-reduced-motion:reduce)').matches;
  var tx=.5,ty=.22,cx=.5,cy=.22,manual=0,t0=performance.now(),lastF=0;
  var teris=[],chous=[],pl=null;
  function collect(){
    teris=[].slice.call(document.querySelectorAll('.teri'));
    chous=[].slice.call(document.querySelectorAll('[data-yaw]'));
    pl=document.getElementById('hakuLight');
    chous.forEach(function(c){var b=c.getBoundingClientRect();
      c._cx=(b.left+b.width/2)/innerWidth; c._cy=(b.top+b.height/2)/innerHeight;
      c._lit=c.querySelector('.lit');});
  }
  function apply(){
    var i,c,yaw,nx,nz,lx,ly,lz,m,d;
    for(i=0;i<teris.length;i++)                        // 合成のみ
      teris[i].style.transform='translate3d('+((cx-.5)*46).toFixed(2)+'%,'+((cy-.5)*40).toFixed(2)+'%,0)';
    for(i=0;i<chous.length;i++){ c=chous[i];
      yaw=(+c.dataset.yaw)*Math.PI/180; nx=Math.sin(yaw); nz=Math.cos(yaw);
      lx=cx-c._cx; ly=cy-c._cy; lz=.92; m=Math.sqrt(lx*lx+ly*ly+lz*lz)||1;
      d=nx*(lx/m)+nz*(lz/m); if(d<0)d=0;
      if(c._lit)c._lit.style.opacity=(0.10+0.80*Math.pow(d,3.4)).toFixed(3); }
    if(pl){ var now=performance.now();
      if(now-lastF>90){ lastF=now;                     // フィルタ再評価は間引く
        pl.setAttribute('x',(cx*320).toFixed(1)); pl.setAttribute('y',(cy*200).toFixed(1)); } }
  }
  function frame(now){
    if(!RM){ if(manual>0){manual-=16;}
      else{ var w=(now-t0)/38000*6.283185; tx=.5+.34*Math.sin(w); ty=.24+.13*Math.cos(w*.73); }
      cx+=(tx-cx)*.10; cy+=(ty-cy)*.10;
    } else { cx=tx; cy=ty; }
    apply(); requestAnimationFrame(frame);
  }
  addEventListener('pointermove',function(e){
    tx=e.clientX/innerWidth; ty=e.clientY/innerHeight; manual=5200; },{passive:true});
  addEventListener('resize',collect,{passive:true});
  collect(); requestAnimationFrame(frame);
})();
```

---

## 十二、技術實作與相容性

本流派を成立させるために選んだ 3 つの技術と、その現況・fallback・実測値。**支援状況は 2026-08-28 に MDN／caniuse で確認したものです。**

### (1) SVG lighting filter — `feSpecularLighting` + `fePointLight`（A 渲染層）

- **何を担うか：** 特徵 1 の「箔の粒」。金箔が金色の塗料ではなく **反射する金属** に見えるかどうかは、面の微細な凹凸が光源に対してどう反射するかで決まります。`feTurbulence`（`numOctaves="1"`）で凹凸を作り、`feSpecularLighting` の `fePointLight` を照り engine と同じ座標に置くことで、CSS グラデーションでは作れない「光源を動かすと粒の輝きが移る」状態を得ます。
- **支援：** MDN《`<feSpecularLighting>`》は **Baseline Widely available（2015 年 7 月からクロスブラウザ）**。`<fePointLight>` も同じフィルタ原語の光源要素として同時期から利用可能。`lighting-color` は SVG 属性として全実装に存在します。
- **fallback：** フィルタが解決できない環境ではフィルタ全体が無視され、`.haku-grain` の `<rect fill="#000">` が描かれます。これを避けるため `.haku-grain` は `mix-blend-mode:screen` と `opacity` のみで合成しており、**黒が screen で合成されると恒等（変化なし）** になります。つまり粒が消えて平らな金地に戻るだけで、箔足・照り・レイアウト・可読性は一切変わりません。
- **コストと対策（本站が実際に取った判断）：** lighting filter は **フィルタ領域のピクセル数に比例** し、本站で最も高い処理です。そこで
  1. `numOctaves="1"`（2 以上にすると倍のコストで、見た目の差はほぼない）、
  2. `fePointLight` の座標更新を **90ms に間引き**（＝最大 11 回/秒。60fps の見た目は `.teri` の `transform` と `.lit` の `opacity` が担うので、粒の更新頻度が落ちても滑らかさは失われない）、
  3. 1 ページあたり **最大 2 インスタンス**（見出し帯と屏風／貝桶）、
  4. `@media (max-width:900px){ .haku-grain{display:none} }` で携帯では完全に外す。
  この 4 点により、60fps を担当する層（`transform`／`opacity` のみ・合成専用）とフィルタ層が完全に分離されます。

### (2) `writing-mode: vertical-rl` ＋ `text-combine-upright`（C 版面與樣式層）

- **何を担うか：** 屏風の賛と色紙形は縦組みです。見出し・キャプション・記録カード・扇の中の本文を縦組みにすることで、版面の主軸が右→左になり、屏風の扇の並びと一致します。価格や電話番号のような 2〜4 桁の数字は `text-combine-upright:all` で **縦中横**（数字を横に組んで一文字分に収める）にします。これがないと縦組みの中で数字が 90° 倒れ、和の版面が壊れます。
- **支援：** `writing-mode` は Baseline Widely available。`text-combine-upright` は MDN／caniuse によれば **2022 年 3 月からクロスブラウザで利用可能**（Chrome/Edge・Firefox 48+・Safari）。ただし **`digits` 値はどのブラウザも未実装** のため、**必ず `all` を明示指定**し、対象を 2〜4 文字の `<span class="tcy">` で囲みます。
- **fallback：** 未対応環境では数字が個別に縦に並ぶだけで、値そのものは読めます。情報の欠落はありません。`@media (max-width:900px)` では表・フォーム・長い段落を横組みに戻し、狭い画面での可読性を確保します（屏風の中の色紙形だけは縦組みのまま — 幅 126px の扇に横組みは入らないため）。

### (3) `DeviceOrientationEvent`（游標代替つき）（D 輸入與感測層）

- **何を担うか：** 金屏風は「見る角度で変わる」ものです。デスクトップでは `pointermove` が光源になりますが、携帯では指が画面を覆ってしまうため、**端末の傾きそのものを光源にする**のが本来の体験に近い。`gamma`（左右の傾き）を光源の X、`beta`（前後）を Y に写します。
- **支援：** MDN《`DeviceOrientationEvent`》は広く実装されていますが、**iOS 13 以降は `DeviceOrientationEvent.requestPermission()` をユーザーのジェスチャ内で呼び、許可を得ないとイベントが発火しません**。また安全なコンテキスト（HTTPS）が必要です。したがって **自動で購読してはいけません**。
- **実装：** 「端末を傾けて光を動かす」ボタンを置き、クリック時に `typeof DeviceOrientationEvent.requestPermission==='function'` を判定して許可を求めます。許可されない／API がない場合はボタンの文言がその旨に変わり、**`pointermove`（タッチのドラッグを含む）が引き続き光源として機能します**。傾きは「あれば嬉しい追加入力」であって、必須経路ではありません。

```js
btn.addEventListener('click',function(){
  var D=window.DeviceOrientationEvent;
  if(!D){ btn.textContent='この端末は傾きを検出できません'; btn.disabled=true; return; }
  if(typeof D.requestPermission==='function'){
    D.requestPermission().then(function(s){
      if(s==='granted') addEventListener('deviceorientation',handler);
      else btn.textContent='許可されませんでした（指でなぞってください）';
    }).catch(function(){ btn.textContent='許可されませんでした（指でなぞってください）'; });
  } else addEventListener('deviceorientation',handler);
});
```

### 効能予算（実測）

| 項目 | 実測 | 予算 |
|---|---|---|
| 単頁サイズ（inline 全資源込み、外部は Google Fonts のみ） | index 151.4 KB ／ awase 84.0 KB ／ mon 111.5 KB ／ atsurae 66.2 KB | ≤350 KB ✅ |
| 首屏 JS 実行（意匠引擎で 15 幅を生成、Node 22 単スレッド） | **2.49 ms** | ≤100 ms ✅ |
| 意匠帳 24 幅の生成 | **2.40 ms** | — |
| 引擎スループット | 4,000 幅 / 240 ms ＝ **0.06 ms/幅** | — |
| 毎フレームの JS | `.teri` 2 要素の `transform` ＋ `.lit` 6 要素の `opacity` ＝ 8 回の style 書込み、`getBoundingClientRect` は resize 時のみ | layout thrashing なし ✅ |
| 外部画像・音声 | **0 件** | 0 ✅ |

- **layout thrashing 対策：** 測定（`getBoundingClientRect`）は初回と `resize` のときだけ行い、結果を要素に保持します。毎フレームのループ内では読み取りを一切行わず、`transform` と `opacity` しか書きません。
- **決定性：** 全画像は FNV-1a → mulberry32 の疑似乱数から生成され、同じ seed は必ず同じ絵になります（実測：同一 seed の 2 回生成が完全一致）。したがって `?k=` による共有・復元が成立し、ビルド時に静的 SVG として書き出せます。**JavaScript を切っても屏風・意匠見本・logo・favicon はすべて表示されます。**
