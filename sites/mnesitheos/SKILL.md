---
name: attic-vase-painting
description: The two Attic vase-painting techniques as a web system — one iron-rich slip fired three times, so orange and black are the same clay; black-figure details are incised away, red-figure details are added as relief line; figures are profile silhouettes on a groundline, every scene is fenced by ornament bands that must wrap a whole number of times, and added white and purple-red are the only second materials.
---

# 阿提卡瓶畫 Attic Vase Painting（黒絵 ΜΕΛΑΝΟΜΟΡΦΟΣ／赤絵 ΕΡΥΘΡΟΜΟΡΦΟΣ）

> 一套「只有一種顏料、卻有兩個顏色」的視覺系統。畫面上的橙與黑是同一塊含鐵黏土泥漿，差別只在窯裡有沒有氧；因此整套風格沒有調色、沒有深淺、沒有光源、沒有透視。它適合任何「規格由外部訂死、工序決定外觀」的品牌：容器、度量、檢定、法定製品、工坊、體育、酒與油。
>
> 全館第 1 站示範：`sites/mnesitheos/`（賞瓶坊 × 黒絵／赤絵）。

## 流派定位與外部參照

- **黒絵 black-figure**：約公元前 700 年起於科林斯，約前 630–530 年由雅典統治市場。形是塗上去的泥漿剪影，細節用刀**刻掉**泥漿而成（露出底下的土色）。
- **赤絵 red-figure**：約公元前 530 年出現於雅典（傳統上歸給 Andokides Painter 的工坊）。圖地對調：泥漿鋪在人物之外，人物留出土色，細節改用**浮線**（relief line）畫上去。
- **雙語瓶 bilingual**：約前 530–520 年，同一只器兩面各用一法。
- **泛雅典賞瓶 Panathenaic prize amphora**：作為法定容器，**在其他器類全面改赤絵之後仍固守黒絵直到公元前 2 世紀**。自公元前 367/6 年起在器上加註執政官名，因此是希臘陶器中少數可以精確斷代的一類。
- **三段燒成**：氧化 → 還原 → 再氧化。器身粗、可再吸氧故回到橙；泥漿細、已燒結故留在黑。橙與黑是同一材料的兩個氧化態。
- 可查證的外部來源方向：大英博物館、羅浮宮、雅典國家考古博物館與 Metropolitan Museum 的阿提卡陶器藏品說明；J. D. Beazley 的歸派方法（以手、耳、踝等局部辨識繪師）；J. Boardman《Athenian Black Figure Vases》與《Athenian Red Figure Vases》；Joseph Veach Noble《The Techniques of Painted Attic Pottery》（三段燒成的現代復原實驗）。

### 與鄰近流派的分界

| 對照 | 它 | 本流派 |
|---|---|---|
| 浮世繪／錦絵 | 套版木刻，一色一版，輪廓等寬，色是平的 | 手繪；只有一種顏料；「第二個顏色」只能靠另外貼一種材料 |
| 新藝術彩色石版 | 一色一石，物理上印不出中間調，平塗 | 也零中間調，但橙與黑同料異態，而且細節可以是「刻掉的」 |
| 恩德貝勒彩繪屋 | 每塊平塗都被等寬黑帶包住，任兩色不得相接 | 沒有包邊；黑本身就是地或形，色與色直接相接 |
| 普希品風 | N 階硬邊平色，階數承載資料 | 明度階恰好是零，一個地方要嘛有泥漿要嘛沒有 |
| 剪影圖示系統 | 剪影是為了辨識效率，可任意放大縮小 | 剪影是工序的結果；它一定站在地線上、一定被紋樣帶夾住 |

---

## 一、本風格的 5 個不可省略特徵

> 這五項是「拿掉它就不是這個風格了」的程度。五項在示範站上全部看得見。

### 特徵 1 · 只有一種顏料，而且它只有兩個狀態

橙與黑是同一塊含鐵黏土；顏色不是選的，是燒出來的。所以**樣式表裡不得出現任何一個由這兩色混出來的中間色**：零漸層、零 `opacity` 調色、零 `rgba()` 第四位當淡色、零 `filter`、零模糊陰影。要更暗不能調暗，只能「有泥漿」；要更亮不能調亮，只能「沒有泥漿」。

```css
:root{
  --terra:#C4683C;   /* 氧化：器身 44% */
  --slip :#140F0C;   /* 還原：泥漿 38% */
}
/* 唯一合法的「陰影」是實色位移，而且它其實是第二層泥漿 */
.card{ background:var(--terra); box-shadow:0 0 0 2.8px var(--slip); }
/* 明令禁止 */
/* background:linear-gradient(...)  ✗
   opacity:.6                        ✗
   filter:blur() / drop-shadow()     ✗
   color:rgba(20,15,12,.5)           ✗ */
```

### 特徵 2 · 細節只有兩種做法，而且互斥

**黒絵＝減法**：刀穿過已乾的泥漿，露出下面的土色；刻痕寬度恆定、不得分岔、不得回頭加粗。
**赤絵＝加法**：筆帶著濃泥漿走，線堆得比周圍高；線可以連續拉很長、可以轉彎。
同一個畫面不得同時出現兩種（雙語瓶是例外，而且必須明講）。

```html
<!-- 一組幾何，兩種技法：差別只在遮罩的合成順序 -->
<span class="fg" style="--sil:url('…silhouette.svg');--inc:url('…details.svg')">
  <b class="sl"></b><b class="tb"></b><b class="rl"></b>
</span>
```

```css
.fg{position:relative;display:block;width:120px;aspect-ratio:120/200}
.fg>b{position:absolute;inset:0;display:block;
      mask-repeat:no-repeat;mask-size:100% 100%}
/* 黒絵：剪影 − 刻痕（刻痕是真的洞，底下的土色透出來） */
.fg .sl{background:var(--slip); mask-image:var(--sil),var(--inc);
        mask-composite:subtract}
.fg .tb,.fg .rl{display:none}
/* 赤絵：整片地 − 剪影，再把同一組線當浮線畫回去 */
.rf .fg .sl{mask-image:var(--fld),var(--sil); mask-composite:subtract}
.rf .fg .tb{display:block;background:var(--terra); mask-image:var(--sil)}
.rf .fg .rl{display:block;background:var(--slip); mask-image:var(--inc)}
```

刻痕與浮線的線寬是常數，不隨物件層級變化：

```css
:root{ --incise:2.4;  /* 刻痕：SVG 使用者單位 */
       --relief:2.8px;/* 浮線：版面上的規線同寬 */ }
/* SVG 端一律方頭尖角，禁止圓頭（圓頭是機器不是刀） */
/* stroke-linecap="butt" stroke-linejoin="miter" */
```

### 特徵 3 · 人物是側面剪影、眼睛是正面、腳踩一條地線

零透視、零縮短法、零投影、零景深、零光源。肩是正面的、腰以下是側面的；眼睛畫成正面的杏形，因為側面眼睛在這個系統裡看不出是眼睛。每一組人物底下必有一條實心地線——沒有地線的人物在這套語彙裡等於沒有站在場景裡。

```html
<div class="plate">
  <span class="fg" …></span><span class="fg" …></span>
  <div class="gl"></div><!-- 地線 -->
</div>
```
```css
.plate{display:flex;align-items:flex-end;gap:24px;
       border:2.8px solid var(--slip);padding:24px 24px 0}
.plate .gl{width:100%;height:2.8px;background:var(--slip)}
.plate.rf{background:var(--slip)} .plate.rf .gl{background:var(--terra)}
```
正面眼（刻痕）：
```svg
<g fill="none" stroke="currentColor" stroke-width="2.4">
  <ellipse cx="56" cy="35" rx="3.6" ry="2.5"/><circle cx="56" cy="35" r="1.4"/>
</g>
```

### 特徵 4 · 場面必被上下兩條紋樣帶夾住，而且帶要整數次繞完一圈

帶不是裝飾，是畫面的邊界；畫絕不碰到器壁的邊。規矩只有一條：**收尾那一格要和起頭那一格接得上**，所以單元寬不是固定值，是用周長除出來的整數。

```css
.bd{height:26px;background-repeat:repeat-x;background-position:left center;
    background-size:auto 100%}          /* 無腳本時的自然平鋪 */
.bd[data-n]{background-size:calc(100% / var(--n)) 100%} /* 整數次 */
.bd-meander{background-image:url("data:image/svg+xml,\
<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'>\
<path fill='none' stroke='%23140F0C' stroke-width='5' stroke-linecap='butt'\
 d='M0 27.5 H32 M5 27.5 V5 H27 V21 H16.5 V13 H21.5'/></svg>")}
```
```js
// 用帶高換算單元寬，四捨五入到整數格
document.querySelectorAll('.bd[data-band]').forEach(b=>{
  const r=b.getBoundingClientRect(), unit=r.height*(32/32); // 回紋單元 32×32
  b.style.setProperty('--n', Math.max(2, Math.round(r.width/unit)));
  b.setAttribute('data-n','1');
});
```
四種帶與它們的位置：回紋 ΜΑΙΑΝΔΡΟΣ（口下、肩上）、舌紋 ΓΛΩΣΣΑΙ（足上、杯緣）、射線 ΑΚΤΙΝΕΣ（足部，全器唯一允許實面的帶）、棕櫚蓮鏈 ΑΝΘΕΜΙΟΝ（肩上）。

### 特徵 5 · 添白與添紫紅是「另外加的第二種材料」，而且只准加在黑上

它們不是調出來的顏色，是燒前另外貼上去的礦物顏料。因此：**永遠不作為底色、永遠不承載小字、兩者面積合計 ≤14%**。添白給女性膚色、齒、盾徽與器物高光；添紫紅給衣飾、馬鬃與不可逆的動作。

```css
:root{ --white:#EFE6D0; --purple:#7A2B35; }
.btn.irreversible{background:var(--purple);color:var(--white);border-color:var(--purple)}
/* 明令禁止：紫紅當底色放小字（對土色 2.00:1、對泥漿 2.02:1，兩邊都不過） */
```

---

## 二、設計哲學

1. **顏色是工序的結果，不是品味的結果。** 設計者能決定的只有「哪裡有泥漿」。
2. **規格先於造型。** 器形是量出來的：兌酒的口最闊、滴油的口最小、法定容器一分不能改。版面同理——先問這一塊要裝多少，再決定它長什麼樣。
3. **邊界是畫出來的。** 紋樣帶、地線、肩線、足線都是實體界線；沒有「留白自然過渡」這回事。
4. **減法與加法不得混用。** 一個畫面只有一種做記號的方式。
5. **明度階恰好是零。** 層級全部由位置、字距、面積承擔。

## 三、色彩系統

| 色票 | Hex | 用途 | 比例 |
|---|---|---|---|
| 陶土 terracotta | `#C4683C` | 唯一大面積地色；所有刻痕的顏色；赤絵時人物的顏色 | 約 44% |
| 釉黑 slip | `#140F0C` | 全部正文、全部規線與框、黒絵時人物的顏色、赤絵時的地 | 約 38% |
| 添白 added white | `#EFE6D0` | 釉黑上的文字；女性膚色、齒、盾徽、器物高光 | ≤8% |
| 添紫紅 added purple-red | `#7A2B35` | 不可逆動作、focus outline、衣飾細節 | ≤6% |
| 生泥 raw slip | `#9A7A55` | **只准放在釉黑上**的小字與標籤（頁尾、caption） | ≤4% |

可讀性實測（WCAG 2.1 對比度）：釉黑／陶土 **4.89:1**（正文過 AA）；添白／釉黑 **15.32:1**；添白／添紫紅 **6.93:1**；生泥／釉黑 **4.79:1**；添紫紅／陶土 2.00:1、添紫紅／釉黑 2.02:1、生泥／陶土 1.19:1。因此寫死三條：

- **添紫紅永遠不承載文字**，只當色塊；要在它上面寫字一律用添白。
- **生泥只出現在釉黑上**，絕不出現在陶土上。
- 零 `#000`、零 `#FFF`、零灰階色碼、零第六個彩色。

## 四、字體系統

- 希臘文與拉丁：`Noto Sans` 300／500／700。一律大寫、字距 `.24em–.34em`。碑銘的字是刻出來或畫出來的單線字，所以不要用高對比襯線。
- 漢字：`Noto Serif TC` 400／700／900。
- 字級（無 hero，標題上限 1.5rem）：標籤 `.56rem`／`.28em` ─ 說明 `.72rem` ─ 正文 `.94rem`／1.95 ─ h3 `.86rem` ─ h2 `1rem`／900 ─ h1 `clamp(1.12rem,2.2vw,1.5rem)`／900。
- **銘文一律直行、字身正立**，逆讀用 `direction:rtl`（縱書時行內方向由下往上）；橫行逆讀用 `transform:scaleX(-1)`。

```css
.gr{font-family:"Noto Sans",sans-serif;font-weight:500;
    letter-spacing:.26em;text-transform:uppercase}
.inscr{writing-mode:vertical-lr;text-orientation:upright;
       font-family:"Noto Sans",sans-serif;font-weight:500;
       font-size:.66rem;letter-spacing:.1em;line-height:1.15}
.inscr.retro{direction:rtl}          /* 直行逆讀：由下往上 */
.retro-h{display:inline-block;transform:scaleX(-1)} /* 橫行逆讀 */
```

## 五、版面與網格

- 模矩 `--u:4px`，所有間距是它的整數倍；最大寬 1180px，左右留 20px（≤560px 改 14px）。
- **圓角一律 0**；唯一允許的圓是輪製出來的整圓（盾、鐵餅、關節）。
- 線寬只有三種：規線／框 `2.8px`、細分隔 `1.3px`、刻痕（SVG）`2.4`。
- 版面由「帶」分段：每一個大段落上下各一條帶或一條規線，段與段之間不用空白過渡。
- 首屏不做大標。標題上限 1.5rem，畫面上最大的東西永遠是圖不是字。

## 六、元件配方

```css
/* 刊頭：一條滿版的釉黑帶 */
.mast{background:var(--slip);color:var(--white);padding:12px 20px 10px}

/* 表格：表頭一條粗線，列間一條細線，末列不畫 */
th,td{padding:6px 10px;border-bottom:1.3px solid var(--slip);vertical-align:top}
thead th{border-bottom:2.8px solid var(--slip);font-size:.58rem;letter-spacing:.24em}
tbody tr:last-child td{border-bottom:none}

/* 按鈕：反色即按下，沒有陰影沒有圓角 */
.btn{background:var(--terra);color:var(--slip);border:2.8px solid var(--slip);
     padding:6px 16px;font-weight:700;letter-spacing:.12em;cursor:pointer}
.btn[aria-pressed="true"],.btn:hover{background:var(--slip);color:var(--terra)}

/* 規格表：左欄希臘標籤、右欄內容，用粗線隔開 */
.spec{border:2.8px solid var(--slip);display:grid;grid-template-columns:auto 1fr}
.spec dt{border-right:2.8px solid var(--slip)}

/* focus：唯一使用添紫紅的介面狀態 */
:focus-visible{outline:2.8px solid var(--purple);outline-offset:3px}
```

## 七、動效規則（四種，缺一不可）

| 類 | 內容 | 觸發 | 值 | reduced-motion |
|---|---|---|---|---|
| 環境 ambient | 足部射線逐一在氧化／還原兩態之間硬切，繞足一周 | 時間，無輸入 | 週期 12s，每道佔 1s，關鍵影格**硬停點無補間** | `animation:none`，第 3 道靜態為陶土色 |
| 輸入 input-driven | 肩帶上任一景 hover／focus，空地上立刻出現讚辭 ΚΑΛΟΣ | 指標／焦點 | 純 CSS `visibility`，0ms，無過渡 | 無影響（本來就沒有補間） |
| 轉場 transition | 換頁與換技法時，各區塊／各人物依「離窯口的距離」錯序到位 | 頁面載入／技法切換 | WAAPI 群組時間軸，420ms，stagger 70–120ms，`cubic-bezier(.16,.84,.34,1)`，**只位移不淡入** | 不排程，直接就位 |
| 簽名 signature | 〈刻〉：指標或方向鍵在泥漿面上刮出寬度恆定的土色刻痕，**放開不消失、換頁回來還在** | 指標拖曳／空白鍵 | 取樣間距 6 單位，線寬 3.4（`non-scaling-stroke`），單片刀口總長上限 2600 | 刻痕一次出現整段，不逐幀生長 |

硬規則：**不得用淡入當主要動效**；不得用跑馬燈；不得用視差；不得用數字跳動計數。所有位移動效只改 `transform`，不改 `opacity`、不改佈局。

## 八、插畫與圖像風格（技法名：slip-and-incision 泥漿與刻痕）

三條原語，明文不允許第四條：

1. **泥漿**＝只有「有」與「沒有」兩態的實面，零濃淡、零透明度。
2. **記號**＝刻痕（減法，露土色）或浮線（加法，堆泥漿），寬度各自恆定，方頭尖角，不得分岔。
3. **構成**＝側面剪影＋正面眼＋地線；上下必有紋樣帶；零透視零投影零景深。

判準：放大任何一張圖，(a) 找不到任何漸層或半透明；(b) 每一條細節線不是刻痕就是浮線，沒有第三種；(c) 找不到任何投影或縮短法；(d) 每一組人物底下都有一條地線。

**人物畫法**：頭高約全身的 1/6，側面頭由「額—眉—鼻—唇—頦—顎—枕」七個轉折構成，髮是一整塊貼著顱骨的實面；肩正面、腰以下側面；大腿與小腿明顯粗於手臂。四肢用「每一節一塊獨立四邊形＋關節圓」組成，**每一塊各自成一條路徑**（不要串成一條 `d`，否則 `fill-rule` 會在重疊處鑽洞）。

**器形畫法**：器是轆轤拉出來的，所以剖面是「半徑對高度的函數」。給一串 `[高, 半徑]` 控制點，用 Catmull-Rom 轉三次貝茲，左右鏡射後閉合——這樣畫出來的壺一定是旋轉體，不會歪。

```js
const profile=[[6,26],[13,20],[33,16],[74,40],[100,42],[152,25],[178,10],[188,19]];
// → 右側由上而下、左側由下而上，頂端以直線閉合成口沿
```

## 九、Logo 與 Favicon

Logo＝一只器的剪影＋一個刻進去的字母。字母不是疊在上面的，是把泥漿刻掉露出土色，所以它永遠是地色。右側放品牌名（希臘文大寫、寬字距）與一段至少三格的回紋——回紋是這套語言最短的可辨識單元。

Favicon 用同一只器：陶土滿版底 ＋ 釉黑器形 ＋ 陶土刻痕字母，寫成 inline SVG data URI。注意 data URI 內的 `#` 要寫成 `%23`，而且因為內容含雙引號，HTML 屬性要用單引號包起來：

```html
<link rel="icon" href='data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect width="200" height="200" fill="%23C4683C"/><path fill="%23140F0C" d="…"/><path fill="none" stroke="%23C4683C" stroke-width="7" d="M78 148 L78 100 L100 128 L122 100 L122 148"/></svg>'>
```

## 十、Do & Don't

**Do**

- 先決定「哪裡有泥漿」，再決定畫什麼。
- 每一個場面上下都加帶；帶要整數次繞完。
- 人物一律側面、正面眼、踩地線。
- 需要第二個顏色時，明講它是另外貼上去的材料，並限制面積。
- 器形用半徑函數生成，不要徒手畫壺。

**Don't**

- ✗ 漸層、半透明、模糊陰影、發光、金屬、玻璃擬態、紋理、噪聲、做舊濾鏡。
- ✗ 圓角（除了輪製的整圓）。
- ✗ 灰色——這套系統裡沒有灰，要「淡」只能改線的疏密或換材料。
- ✗ 透視、縮短法、投影、光源。
- ✗ 把添白或添紫紅當背景色，或在它們上面放小字。
- ✗ 紫藍漸層 hero、置中三卡片、emoji 當 icon、Lorem ipsum、「EST. 19xx」徽章、跑馬燈。
- ✗ 把刻痕畫成圓頭線（圓頭是機器，刀是方頭）。
- ✗ 同一畫面混用刻痕與浮線（除非你正在做雙語瓶，而且說出來）。

## 十一、頁面骨架範例

```html
<body>
  <header class="mast">
    <svg class="mark" viewBox="0 0 200 200">…器形剪影＋刻痕字母…</svg>
    <span class="gr-l">ΜΝΗΣΙΘΕΟΣ ΕΠΟΙΕΣΕΝ</span><span class="cn">姆奈西特歐斯陶坊</span>
  </header>

  <nav class="nav"><ul>
    <li><a href="#" aria-current="page">
      <span class="jar"><b class="o"></b><b class="fi"></b></span><!-- 注滿到肩線 -->
      <span class="lb"><i>ΕΡΓΑΣΤΗΡΙΟΝ</i><em>坊</em></span></a></li>
  </ul></nav>

  <main>
    <div class="bd bd-meander" data-band="meander"></div>
    <section class="frieze"><div class="turn"><div class="row">
      <article class="scene">
        <span class="ang">0°</span>
        <span class="fg" style="--sil:…;--inc:…"><b class="sl"></b><b class="tb"></b><b class="rl"></b></span>
        <span class="inscr">ΤΟΝ ΑΘΕΝΕΘΕΝ ΑΘΛΟΝ</span>
        <div class="txt"><h3>…</h3><p>…</p></div>
      </article>
    </div></div><div class="gline"></div></section>
    <div class="bd bd-rays" data-band="rays"></div>

    <div class="wrap"><section class="sect" data-arrive>
      <h2>…<span class="g">ΕΛΛΗΝΙΚΑ</span></h2>
      <table>…</table>
    </section></div>
  </main>

  <footer class="foot on-slip">
    <div class="rays"><i></i>…×12…</div>
    <div class="in">…</div>
  </footer>
</body>
```

---

## 十二、技術實作與相容性

本風格的三項核心技術，各承載一個不可省略特徵。以下支援度於 2026-09-21 查證 MDN Web Docs 的 Baseline 標示。

### 1. `mask-image` 多層 ＋ `mask-composite`（A 渲染層）

**承載**：特徵 1 與特徵 2——黒絵與赤絵是同一組幾何的兩次遮罩合成，而刻痕是真正的減法。

- **支援現況**：MDN 標示 `mask-composite` 為 **Baseline Widely available**（頁面最後更新 2026-04-20），關鍵字為 `add | subtract | intersect | exclude`；`mask` 簡寫的無前綴版本自 Chrome/Edge 120、Firefox 53、Safari 15.4（含 iOS）起可用。
- **語意**：`mask-image: A, B; mask-composite: subtract;` 的合成值套在**最上層** A 上，結果為 `A − B`（來源落在目的地之外的部分）。所以「剪影 − 刻痕」正是 `mask-image:var(--sil),var(--inc); mask-composite:subtract`。
- **為什麼非它不可**：用 `subtract` 表達刻痕，等於宣告「刻痕與剪影共用同一個座標系與同一個遮罩」，所以**刻痕在數學上不可能跑到泥漿之外**。簽名動效〈刻〉讓使用者自由畫出任意路徑，這個保證讓它不需要每一筆都做裁切。
- **fallback（具體行為）**：`@supports not (mask-composite: subtract)` 時，`.sl` 只用剪影遮罩，另開一層 `.fb`（陶土色、以刻痕為遮罩）疊在上面；赤絵則 `.sl` 用整片地遮罩、`.tb` 疊陶土剪影、`.rl` 疊浮線。在陶土底上視覺結果完全相同。代價是刻痕不再由遮罩保證落在泥漿內，因此該分支把〈刻〉限制在已宣告的泥漿矩形內下刀——行為一致，資訊零損失。
- 另備 `-webkit-mask-composite:source-out` 供 Safari 15.4 以前的舊語法；標準宣告寫在後面，支援標準的瀏覽器一律取標準值。

### 2. `writing-mode: vertical-lr` ＋ `text-orientation: upright` ＋ `direction: rtl`（C 版面與樣式層）

**承載**：碑銘。器上的名字是直行、字身正立的，而且常常逆讀（由下往上）。

- **支援現況**：MDN 標示 `text-orientation` 自 **2020 年 9 月起 Baseline Widely available**；`writing-mode` 更早。`vertical-lr` 下，行內方向 `ltr` 由上往下、`rtl` 由下往上——這正是「逆讀」。
- **為什麼非它不可**：用 `transform: rotate(90deg)` 會把字身一起轉倒（那是橫書轉了個方向，不是直書）；只有 `text-orientation:upright` 能讓每個字母保持正立而整體向下排，這是本流派銘文的定義性質。
- **fallback**：極舊瀏覽器忽略 `writing-mode` 時，銘文退回橫排——位置與內容不變，只是方向不對。示範站的所有銘文在頁面上另有靜態表格重複一次，因此資訊零損失。
- 橫行逆讀改用 `transform: scaleX(-1)`：視覺上字序與字形同時鏡射（真正的 retrograde），而 DOM 文字不變，輔助科技照常讀得出來。

### 3. Web Animations API 群組時間軸（B 動效與時間軸層）

**承載**：轉場——換頁與換技法時，數十個元素依「離窯口的距離」錯序到位，而且可以整組暫停與反轉。

- **支援現況**：`Element.animate()` 與回傳的 `Animation` 物件（`play` / `pause` / `reverse` / `currentTime`）為長期 Baseline 廣泛可用能力。
- **為什麼非它不可**：純 CSS 的 `animation-delay` 只能寫死，無法在切換技法時以同一組動畫物件反向播放；把每個元素的 `Animation` 收進陣列統一排程，才能表達「一整窯的東西一起翻面，但受熱先後不同」。
- **fallback／降級**：`prefers-reduced-motion: reduce` 時完全不排程，元素直接就位；任何不支援 WAAPI 的環境，`animate()` 不存在則整段略過，版面即最終狀態。
- 本站動效一律只改 `transform`，不改 `opacity`、不觸發重排，因此無 layout thrashing。

### 4. 次要實作（非核心技術）

- **紋樣帶整數平鋪**：以帶高換算單元寬、四捨五入取整，寫入 `--n` 並以 `background-size:calc(100%/var(--n)) 100%` 套用；無腳本時退回 `background-size:auto 100%`（自然平鋪，邊緣會切到半格，但帶仍然完整可辨）。
- **跨頁狀態**：肩帶的角度與試片的刻痕存在 `sessionStorage`；讀寫皆包在 `try/catch`，取不到就從零開始。
- **零外部資源**：全部圖像為 inline SVG 或 SVG data URI，零 `<img>`、零外部圖片、零音檔、零第三方函式庫；外部請求只有 Google Fonts。

### 5. 效能實測（示範站，2026-09-21 建置環境）

| 項 | 值 | 門檻 |
|---|---|---|
| 單頁大小（含 inline 的全部 CSS／JS／SVG data URI） | 57–63 KB | ≤350 KB ✓ |
| 首屏 JS 執行（紋樣帶量測 ＋ 動畫排程 ＋ 刻痕還原） | 一次 `getBoundingClientRect` 迴圈（≤6 個元素）＋ ≤12 個 `animate()` 呼叫 | ≤100 ms ✓ |
| 主要動畫 | 全部為 `transform` 合成層動畫 | 60fps ✓ |
| 版面抖動 | 量測集中在載入與 `resize`，量完才寫入自訂屬性 | 無 layout thrashing ✓ |

---

*本規格書描述的是一套可重現的視覺語言，不綁定產業。示範站 `sites/mnesitheos/` 的坊名、人名、價目、地址與年份皆為虛構；本文所述的流派史實（三段燒成、黒絵與赤絵的年代與技法差異、泛雅典賞瓶的黒絵留存與執政官紀年）請以上列外部參照為準。*
