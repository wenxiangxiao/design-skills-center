---
name: fileteado-porteno
description: Fileteado porteño — the Buenos Aires sign-painting tradition: everything mirrored on a vertical axis, every line ending in a scroll, every stroke loaded with two colours at once, and every sentence riding a curved ribbon.
---

# Fileteado Porteño 布宜諾斯艾利斯車體繪

> Filete porteño — técnica pictórica tradicional de Buenos Aires
> 二十世紀初起於送貨馬車車廂廠 → 卡車 → 公車；一九七五年被市政命令逐出公車，二〇〇六年解禁；二〇一五年十二月一日列入 UNESCO 人類非物質文化遺產代表名錄。
> 本規格書由範例站 **FERRAROTTI — Taller de fueyes**（班多紐修繕工房）抽出。風格與產業分離：這套語言可以拿去做任何「有東西要被裝飾成自己人」的網站。

---

## 一、設計哲學

Fileteado 不是為了好看才存在的。它一開始的功能很具體：一輛送貨馬車跟另一輛送貨馬車長得一模一樣，車主要讓街上的人一眼認出「那台是我的」。所以它從第一天就有三個性格，而這三個性格比任何色票都重要：

**一、它是屬於某個人的。** 牌上一定有名字、有地址、有一句話。那句話（sentencia）通常是家裡的俗諺或街上的黑色幽默，不是標語。Fileteado 沒有「品牌調性」，只有「這是誰的」。做這個風格的網站，第一件事是問：這個東西是誰的？答不出來就不要做。

**二、它不容許空手而歸的線。** 每一條線都必須走完並且捲回來。在這個語言裡，一條停在半空中的線不叫「極簡」，叫「沒畫完」。整個裝飾系統就是「怎麼把一條線體面地結束」的一百種答案。

**三、它是對稱的，而且對稱是一條會拒收內容的規則。** 母題成對出現，單數只能坐在軸上。這不是版面偏好，是繪製方法的後果——繪師用粉線在鐵皮上先彈出中軸，兩側同時推進。對稱在這裡先於構圖。

還有一個容易被忽略的性格：**它是用一把筆做出來的。** 長毛筆（pincel de pelo largo）上色時一側沾主色、一側沾白，一筆下去同時留下亮側與暗側。所以 fileteado 的「立體感」不是打光算出來的，是上料方式的痕跡。把這件事翻成網頁，意味著**你不該用 `box-shadow` 和 `filter: drop-shadow` 去模擬**——你該把同一條 `d` 描三次。

一句可以隨身帶的判準：**fileteado 的裝飾不是加在資訊上面的，是資訊的外殼。** 拿掉框，牌就散了。

---

## 二、本風格的 5 個不可省略特徵

拿掉任何一項，它就不是 fileteado 了。每一項都附可以直接複製的片段。

### 特徵 1 — 所有線條以回卷收尾（todo remata en rulo）

沒有直角、沒有斷頭、沒有漸細到消失。voluta（渦卷）不是線尾的裝飾，是唯一被允許的結束方式。

```html
<!-- 一個合格的 voluta：外弧進來、收成一個越來越緊的螺旋、最後一小段幾乎回到自己 -->
<svg viewBox="-6 -6 112 112" width="72" height="72" aria-hidden="true">
  <path d="M12 92C12 56 26 32 48 32c16 0 26 12 26 25 0 12-9 21-20 21-9 0-15-6-15-13
           0-6 4-10 9-10 4 0 7 3 7 6"
        fill="none" stroke="#D9381E" stroke-width="8"
        stroke-linecap="round" stroke-linejoin="round"/>
</svg>
```

自查法：把任何一條線的最後 15% 遮起來，如果剩下的看起來像「被剪掉」，就是沒畫完。框的四個角必須是四個**完整的** voluta，不能是半個——這就是為什麼框要用 `border-image` 的九宮切片而不是 `border-radius`（見特徵 5 與第十二章）。

### 特徵 2 — 一筆兩色：每條線都有亮側與暗側（la pincelada cargada）

**這是最容易被漏掉、而漏掉就立刻崩掉的一項。** 實作原則：**同一個 `d` 描三次**——暗側、身、亮側——三者共用同一條路徑，差別只有 `stroke-width` 與沿著光源方向的位移。不要用 `filter`，不要用 `drop-shadow`，那些會糊掉，而 fileteado 的邊是硬的。

```html
<g class="pinc">
  <path class="sombra" d="M12 92C12 56 26 32 48 32..." stroke-width="8"/>
  <path class="cuerpo" d="M12 92C12 56 26 32 48 32..." stroke="#17795B" stroke-width="8"/>
  <path class="luz"    d="M12 92C12 56 26 32 48 32..." stroke-width="2.4"/>
</g>
```

```css
:root{ --lx:-1.5; --ly:-1.5; --k:1; }   /* 光源＝筆肚方向，全站只有這一個 */
.pinc path{ fill:none; stroke-linecap:round; stroke-linejoin:round;
            vector-effect:non-scaling-stroke; }
.pinc .sombra{ stroke:#000; opacity:.85;
  transform:translate(calc(var(--lx)*var(--k)*-1.15px), calc(var(--ly)*var(--k)*-1.15px)); }
.pinc .luz{ stroke:#F4EFE3;
  transform:translate(calc(var(--lx)*var(--k)*1px), calc(var(--ly)*var(--k)*1px)); }
```

三條規則不可違反：
1. **亮側永遠在同一側**（整站共用 `--lx/--ly` 一組值）。兩個母題的高光打不同方向，畫面立刻散掉。
2. **亮側比身細很多**（約 0.25–0.35 倍 `stroke-width`），而且是 `#F4EFE3` 這種帶暖的白，不是純白。
3. **鏡像時高光跟著鏡像**。這是 fileteado 與工業打光的分水嶺：對稱優先於物理正確，右半邊的高光就是會打在右邊。

### 特徵 3 — 立體字：描邊在下、填色在上、白高光、投影（letras con relieve）

平的字在這個風格裡不存在。字的四層由下到上是：投影 → 深色輪廓 → 彩色字身 → 白色高光細邊。Pascarella 當年在馬車上寫的是哥德體，繪師行話叫 **ergóstrica**；今天常見的是它與圓體、花體的混用。

SVG 裡用 `paint-order`（讓 stroke 畫在 fill 底下，字腔才不會被描邊吃掉）：

```html
<text x="160" y="92" font-family="Georgia,serif" font-weight="700" font-size="74"
      fill="#F2B705" stroke="#08090B" stroke-width="7" paint-order="stroke fill">F</text>
```

HTML 裡用兩個疊上去的偽元素（比 `paint-order` 在 HTML 文字上的支援穩，見第十二章）：

```css
.relieve{ position:relative; display:inline-block; color:transparent;
          font-family:'Alfa Slab One',Georgia,serif; line-height:1.02; white-space:nowrap; }
.relieve::before,.relieve::after{ content:attr(data-t); position:absolute; left:0; top:0; }
.relieve::before{ color:#08090B; -webkit-text-stroke:.14em #08090B;
                  text-shadow:.045em .06em 0 #000, .075em .1em 0 rgba(0,0,0,.65); }
.relieve::after{ color:var(--col,#F2B705);
                 text-shadow:calc(var(--lx)*.012em) calc(var(--ly)*.012em) 0 #F4EFE3; }
```

```html
<h1 class="relieve" data-t="MEDRANO 358">MEDRANO 358</h1>
```

### 特徵 4 — 垂直軸鏡像對稱；單數母題只能坐在軸上（simetría sobre el eje）

版面先有一條中軸，再有內容。母題成對，一左一右；只有一個的時候，它必須正好壓在軸上，不能偏掛在某一側。

```css
.sim{ display:grid; grid-template-columns:1fr 2px 1fr; align-items:center; gap:18px; }
.sim .linea{ background:linear-gradient(transparent,rgba(244,239,227,.5),transparent);
             height:100%; min-height:80px; }
.par{ display:inline-flex; }
.par .der svg{ transform:scaleX(-1); }   /* 右半是鏡像，不是另一張圖 */
```

手機（≤560px）不要放棄對稱，改把軸轉成水平的一條細線，母題上下成對：

```css
@media (max-width:560px){
  .sim{ grid-template-columns:1fr; }
  .sim .linea{ height:2px; min-height:0;
    background:linear-gradient(90deg,transparent,rgba(244,239,227,.5),transparent); }
}
```

### 特徵 5 — 框一定封閉，字一定騎在緞帶上，母題一定有名字

三件事其實是同一條規則：**這個語言沒有「自由排版」**。

**框**：四邊連續、四角是完整 voluta。用 `border-image` 九宮切片 + `round`，讓邊上的重複單元被整數次排滿，不會切出半片葉子。

```css
.marco{
  border:15px solid transparent;
  border-image:url("data:image/svg+xml,%3Csvg…%3E") 30 / 15px / 0 round;
}
```

**緞帶**：任何一句話都不准寫成一條直線，要騎在一條彎曲的 `<path>` 上。

```html
<svg viewBox="0 0 460 88">
  <defs><path id="c1" d="M6 44 C 101.2 28, 184 60, 230 44 S 358.8 28, 454 44"/></defs>
  <use href="#c1" fill="none" stroke="#000"     stroke-width="30"/>
  <use href="#c1" fill="none" stroke="#F2B705"  stroke-width="25"/>
  <use href="#c1" fill="none" stroke="#F4EFE3"  stroke-width="2.4"
       transform="translate(0,-8)" opacity=".75"/>
  <text font-family="'Grand Hotel',cursive" font-size="21" fill="#08090B"
        paint-order="stroke fill" stroke="#08090B" stroke-width=".6">
    <textPath href="#c1" startOffset="50%" text-anchor="middle">Quien canta, sus males espanta</textPath>
  </text>
</svg>
```

**母題**：從一組短而有名字的詞彙裡挑——rosa（玫瑰，愛與誰在等你）、herradura（馬蹄鐵，開口必須朝上）、golondrina（燕子，會回來的東西）、hoja de acanto（莨苕葉，所有東西長在它上面）、dragón（力氣）、cinta argentina（只在完工品上）、ojo（看著你有沒有偷工）、voluta（收尾）。**叫不出名字的形狀不准上版。** 這條規則比它聽起來重要：它是 fileteado 不會滑成「泛泛的花紋」的唯一保險。

---

## 三、色彩系統

深底是本體，不是選項。Fileteado 畫在鐵皮和木板上，底色先漆成深色，顏色才跳得出來。

| 角色 | Hex | 用途 | 面積比例 |
|---|---|---|---|
| `--negro` 煙黑 | `#121013` | 頁面底。帶一點點紫紅的黑，不是純黑 | 52% |
| `--tinta` 墨 | `#08090B` | 版塊底、字的輪廓、線的暗側 | 16% |
| `--perla` 珍珠白 | `#F4EFE3` | 內文、所有亮側高光。**帶暖，永遠不用 `#FFF`** | 12% |
| `--cromo` 鉻黃 | `#F2B705` | 標題字身、框邊、強調。整站的「金」 | 9% |
| `--bermellon` 朱紅 | `#D9381E` | 母題主色、當前頁標記、行動按鈕 | 7% |
| `--esmeralda` 綠 | `#17795B` | 第二母題色、成立狀態 | 3% |
| `--azul` 藍 / `--vino` 酒紅 | `#1D4E89` / `#7A1220` | 極少量：警示、旗帶 | 1% |

規則：

- **沒有任何一色的「淡版」。** 不准 `opacity:.4` 的朱紅，不准 `#F2B705` 的 20% 版當底。要淺，就用白高光；要深，就用墨。這是漆的性格：瓷漆沒有透明度。
- **不准漸層當底。** 唯一允許的漸層是中軸那條線（`linear-gradient` 從珍珠白淡到透明），因為它模擬的是粉線。
- **底色的質感靠兩道極淡的對角刷痕**，不是噪點圖：
  ```css
  body::before{ content:''; position:fixed; inset:0; pointer-events:none; opacity:.5;
    background:
      repeating-linear-gradient( 74deg, rgba(244,239,227,.020) 0 1px, transparent 1px 13px),
      repeating-linear-gradient(-74deg, rgba(244,239,227,.014) 0 1px, transparent 1px 19px); }
  ```
- 換產業時可以換主色相（藍底＋橙黃、酒紅底＋金綠都是街上真有的配法），但**深底、暖白高光、金與紅的對位**三者不可動。

---

## 四、字體系統

三種角色，缺一不可：**立體字（標題）／手寫（緞帶）／窄體無襯線（資訊）**。

```html
<link href="https://fonts.googleapis.com/css2?family=Alfa+Slab+One&family=Archivo+Narrow:wght@400;600&family=Grand+Hotel&family=Noto+Sans+TC:wght@400;700&display=swap" rel="stylesheet">
```

| 角色 | 字體 | 為什麼 |
|---|---|---|
| 立體字 | `Alfa Slab One` 400 | 厚板襯線，字腔夠大，加 `.14em` 描邊後字仍然認得出來。代替 ergóstrica 的現代解。 |
| 緞帶 | `Grand Hotel` 400 | 招牌手寫體，筆畫粗細一致，沿曲線排列時不會斷 |
| 資訊／內文 | `Archivo Narrow` 400/600 | Omnibus-Type（布宜諾斯艾利斯）的字，窄體省空間，跟這個題材同鄉 |
| 繁中 | `Noto Sans TC` 400/700 | 只當註解用，不做標題 |

字級 scale（1.28 倍）：

```
h1  clamp(34px, 7.2vw, 68px) / 1.02   Alfa Slab One
h2  clamp(22px, 3.6vw, 34px) / 1.12   Alfa Slab One
h3  19px / 1.3                        Alfa Slab One
內文 17px / 1.62                       Archivo Narrow
緞帶 21px（SVG user unit）              Grand Hotel
小字 13.5px / 1.5                      Archivo Narrow, rgba(244,239,227,.66)
標籤 12px / 1.25, letter-spacing .14em, uppercase
```

禁令：**標題不准用系統字體堆疊**；**繁中不准當標題**（它撐不起立體字的四層結構）；**不准用 `font-weight` 假裝厚度**，厚度來自描邊。

---

## 五、版面與網格

- **軸優先**：`max-width:1040px`，但真正的結構不是欄，是中央那條軸。任何一個版塊都要能回答「我對稱嗎？不對稱的話，我憑什麼」。
- **開場**：`eje-first` 軸直開場——首屏沒有大標 hero，是一塊掛在中軸上的**銘牌（tapa）**：框、軸線、成對的葉子、立體字店名、下面一條緞帶寫著那句話。
- **導覽**：`voluta-nav` 渦卷導覽——四個頁面＝銘牌框的四個角。每個角一個 voluta（左上、右上、左下、右下），當前頁的 voluta 轉朱紅並在標籤下長出一條 2px 紅線。左右兩角的 voluta 用 `scaleX(-1)` 鏡像，所以四個角其實是同一個形。
  ```css
  .nav li{position:absolute;width:104px}
  .nav li:nth-child(1){left:-6px;top:-10px}   .nav li:nth-child(2){right:-6px;top:-10px}
  .nav li:nth-child(3){left:-6px;bottom:-10px} .nav li:nth-child(4){right:-6px;bottom:-10px}
  @media (max-width:760px){ .nav li{position:static} .nav{display:flex;justify-content:center} }
  ```
- **旋轉角度**：整站只有兩個角度存在——底噪刷痕的 `±74deg`，與 voluta hover 的 `-8deg`。不要再引入第三個。
- **留白規則**：fileteado 不填滿每一格，但**邊緣不留白**——框一定貼著版塊的邊。內距 `26px 22px 30px`（手機 `20px 12px 24px`）。版塊之間 34px。
- **卡片禁令**：不准圓角、不准模糊陰影。要分區就用 `border-left:3px solid` 的色條（`.ficha`），或直接開一個新的框。

---

## 六、元件配方

**nav（見第五章）**：四角 voluta。不要做置頂列。

**按鈕**：方角、2px 鉻黃實線、深底。hover 時底色換成朱紅、文字換珍珠白，**不要用透明度或位移**。
```css
.btn{ background:#D9381E; color:#F4EFE3; border:0; padding:10px 20px;
      letter-spacing:.08em; text-transform:uppercase; font-size:13px; }
.btn:hover{ background:#F2B705; color:#08090B; }
.btn:focus-visible{ outline:3px solid #F4EFE3; outline-offset:2px; }
```

**卡（ficha）**：`background:rgba(8,9,11,.55)` + 左側 3px 色條 + 頂上一個母題。零圓角、零陰影。

**表格**：表頭鉻黃、`text-transform:uppercase`、`letter-spacing:.06em`、12.5px；列線用 `1px dashed rgba(244,239,227,.18)`（虛線是為了不跟框的實線打架）；數字欄 `text-align:right; font-variant-numeric:tabular-nums`。

**表單／控制項**：見第七章的推拉雙音控制項。一般輸入框用 2px 鉻黃實線、深底、方角，`:focus-visible` 一律 3px 朱紅 outline。

**footer**：置中，上方一排三個母題（燕子—馬蹄鐵—燕子，對稱），地址、電話、營業時間用內文級字，虛構聲明用 `.aviso` 12.5px。

---

## 七、動效規則

四種，缺一不可，而且四種的觸發源都不同。**安靜不是這個風格的特質——街上的招牌會反光。**

| 種類 | 名稱 | 觸發 | 規格 |
|---|---|---|---|
| ambient 環境 | `brillo` 緞帶巡光 | 無需輸入，持續 | 一枚 r=3.4 的珍珠白點沿緞帶的 `<path>` 跑，`dur="9s" repeatCount="indefinite" rotate="auto"`，SMIL `<animateMotion><mpath>` |
| input-driven 輸入 | `luz de pincel` 筆肚轉向 | `pointermove` | 改寫 `--lx/--ly`，全站所有亮側與暗側同步重新位移。rAF 節流，延遲 < 16ms |
| transition 轉場 | `abre-el-eje` 從軸開卷 | 載入／版塊出現 | `clip-path: inset(0 50% 0 50%)` → `inset(0)`，340ms `cubic-bezier(.2,.85,.25,1)`，每塊 stagger 70ms。**零淡入** |
| signature 簽名 | `fuelle-cinta` 風箱緞帶 | 使用者推或拉 | 見下 |

**簽名動效 `fuelle-cinta`**：緞帶那條 `<path>` 的波幅 amp 從 7 走到 27（拉開）或反過來（推合），420ms，easeInOutQuad（風箱兩端都要慢）。因為字是用 `<textPath>` 掛在這條路上的，**弧長變長，同一句話的字就自己散開；弧長變短就自己收攏**。頁面上沒有任何 `letter-spacing`、`textLength` 或 `font-size` 在動——字距是弧長的後果，不是被設定的值。

```js
function trazo(w, amp){ var y=44,a=amp;
  return 'M6 '+y+' C '+(w*.22)+' '+(y-a)+', '+(w*.40)+' '+(y+a)+', '+(w*.5)+' '+y
       + ' S '+(w*.78)+' '+(y-a)+', '+(w-6)+' '+y; }
function fuelleCinta(svg, desde, hasta, ms){
  var w=+svg.dataset.w, p=svg.querySelector('defs > path'), t0=0;
  requestAnimationFrame(function paso(t){ if(!t0)t0=t;
    var k=Math.min(1,(t-t0)/ms), e=k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2;
    p.setAttribute('d', trazo(w, desde+(hasta-desde)*e));
    if(k<1) requestAnimationFrame(paso); });
}
```

**`prefers-reduced-motion` 降級（四種都要，且資訊零損失）**：
1. ambient → `svg.pauseAnimations(); svg.setCurrentTime(2.25);` 光點停在緞帶上一個看得見的位置，**常駐不消失**。
2. input-driven → `--lx/--ly` 鎖在 `-1.5/-1.5`（左上），亮側與暗側全數保留，只是不再跟著游標轉。
3. transition → 不加 `.listo`、`clip-path:none`，版塊直接是開的。
4. signature → `fijarAmp(svg, hasta)` 直接跳到終點波幅，字距立刻是正確的，且推／拉的結果文字照常寫上緞帶。

**推拉雙音控制項（bisonoric control）** —— 本站的互動範式，可直接移植：同一顆鈕，往內推與往外拉給兩個不同的結果。

```js
function bisonoro(el, alCerrar, alAbrir){
  var U=26, x0=0, on=false;
  el.addEventListener('pointerdown', function(e){ on=true; x0=e.clientX;
    try{ el.setPointerCapture(e.pointerId); }catch(err){} });
  el.addEventListener('pointerup', function(e){ if(!on) return; on=false;
    var dx=e.clientX-x0;
    if(Math.abs(dx)<U) return aviso('el fueye no suena si no se mueve');
    (dx<0?alCerrar:alAbrir)(); });
  el.addEventListener('keydown', function(e){
    if(e.key==='ArrowLeft'){ e.preventDefault(); alCerrar(); }
    if(e.key==='ArrowRight'){ e.preventDefault(); alAbrir(); } });
}
```

必須配套：`touch-action:none`、兩側永遠印著各自的答案（`← cerrando ⋯ abriendo →`）、`role="status"` 的提示行、鍵盤左右鍵等價。**不要把它做成只能拖的東西**。

---

## 八、插畫與圖像風格

技法名稱：**`filete-pincelada` 一筆兩色筆觸構成**。

- 全部圖像是 inline SVG 的**線**，不是面。除了底色與版塊底，畫面上幾乎沒有 `fill`——這是 fileteado 與「扁平插畫」最大的分野。
- 每個母題畫在 `viewBox="-6 -6 112 112"`（多留 6 的邊給亮側與暗側的位移不被裁掉），`overflow:visible`。
- `stroke-width` 只用三級：框與大母題 `8`、中型 `7`、緞帶亮線 `2.4`。`stroke-linecap/linejoin` 一律 `round`。
- `vector-effect:non-scaling-stroke`：母題在不同尺寸下線寬不變，這是招牌漆的行為（筆一樣粗）。
- **不准用的東西**：漸層填色、`filter: drop-shadow`、半透明疊色、外部圖片、emoji、任何形式的 3D 透視。
- 色彩指派：朱紅給「力量與現在」（馬蹄鐵、龍、當前頁），鉻黃給「名字與價值」（標題、框、價格），綠給「完成與長期」（葉、緞帶、成立狀態）。

---

## 九、Logo 與 Favicon 設計指南

**Logo**（`assets/logo.svg`，320×160）：一塊銘牌。深底 → 鉻黃外框 → 朱紅內框 → 四角 voluta（**同一個 `<g id="vl">` 被 `<use>` 四次，靠 `scale(-1,1)` / `scale(1,-1)` 鏡像**，因為對稱在這個風格裡是繪製事實，不是四張圖）→ 中央一個立體字首字（投影／描邊／字身／白高光四層）→ 下方一條綠緞帶，店名用 `<textPath>` 掛上去。

**Favicon**：一個 voluta 就夠了。64×64、圓角 7、煙黑底、朱紅 8px 描的螺旋、珍珠白 2.2px 高光偏移 `translate(-2,-2)`、右下一顆鉻黃圓點（緞帶的斷點）。寫成 inline SVG data URI 放 `<head>`：

```html
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E…%3C/svg%3E">
```

縮到 16px 時，那個螺旋仍然要認得出是一個捲——這是檢驗你的 voluta 畫得對不對的最好測試。

---

## 十、Do & Don't

**Do**

- 先彈中軸，再排東西。
- 每條線都捲回來。
- 每個母題都叫得出名字，而且名字寫在頁面上。
- 每句話都騎在緞帶上。
- 每條線描三次。
- 深底、暖白、金與紅。
- 寫真實的名字、地址、電話、價錢、工期。

**Don't**

- ❌ 不准把亮側和暗側省掉「求乾淨」——省掉它就不是這個風格了（範例站給了一顆按鈕可以當場把它關掉看效果）。
- ❌ 不准用漸層、模糊陰影、圓角卡片、glassmorphism。
- ❌ 不准用 `filter: drop-shadow` 假裝立體。
- ❌ 不准讓線以直角或斷頭結束。
- ❌ 不准左右不對稱地掛一個孤零零的母題。
- ❌ 不准用 emoji 當 icon，不准用 Lorem ipsum，不准「在當今快節奏的世界」。
- ❌ 不准「EST. 19xx」徽章——fileteado 寫的是俗諺，不是成立年份的裝逼。
- ❌ 不准把它做成「復古酒吧風」：fileteado 不是做舊，它是**鮮豔的**，它剛漆好。
- ❌ 不准純黑 `#000` 當底、純白 `#FFF` 當高光。

---

## 十一、頁面骨架範例（可直接使用）

```html
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>…</title>
<link rel="icon" href="data:image/svg+xml,…">
<link href="https://fonts.googleapis.com/css2?family=Alfa+Slab+One&family=Archivo+Narrow:wght@400;600&family=Grand+Hotel&display=swap" rel="stylesheet">
<style>/* 全部 inline */</style>
</head>
<body>
<div class="wrap">

  <!-- 開場＝銘牌，導覽＝框的四角 -->
  <header class="tapa marco abre">
    <span class="eje" aria-hidden="true"></span>
    <nav aria-label="Secciones"><ul class="nav">
      <li><a href="a.html" aria-current="page"><svg class="mot">…voluta…</svg><b>El eje</b></a></li>
      <li><a href="b.html"><svg class="mot">…acanto…</svg><b>El taller</b></a></li>
      <li><a href="c.html"><svg class="mot">…cinta…</svg><b>La chapa</b></a></li>
      <li><a href="d.html"><svg class="mot">…rosa…</svg><b>Los motivos</b></a></li>
    </ul></nav>
    <div class="alas" aria-hidden="true"><!-- 成對的葉子 --></div>
    <h1 class="relieve" data-t="FERRAROTTI">FERRAROTTI</h1>
    <p class="sub">Taller de fueyes · desde 1961</p>
    <svg class="cinta" viewBox="0 0 460 88" data-w="460">…緞帶＋sentencia…</svg>
  </header>

  <section class="hoja marco abre">
    <h2>Título<span class="zh">中文副題</span></h2>
    <div class="sim">
      <div>左半</div><div class="linea" aria-hidden="true"></div><div class="der-txt">右半</div>
    </div>
  </section>

  <footer class="marco abre">…名字、地址、電話、營業時間、虛構聲明…</footer>
</div>
<script>/* 全部 inline */</script>
</body></html>
```

---

## 十二、技術實作與相容性

本站的技術組合（三層各一項），以及查證結果：

### A 渲染層 — SVG `<textPath>` ＋ `paint-order`

- **承載**：特徵 5（字騎在緞帶上）與特徵 3（立體字）。緞帶的 `<path>` 同時是文字的基線、亮線與暗線的來源、以及環境動效的軌道——整條緞帶只有**一份**幾何資料。
- **支援現況**：`<textPath>` 的 `startOffset` 依 MDN 為 **Baseline，自 2015 年 7 月起跨瀏覽器可用**（查證：MDN `startOffset` 頁的 Baseline 標示 / caniuse `mdn-svg_elements_textpath_startoffset`）。`paint-order` 在 SVG 上 Chrome／Firefox／Safari 皆支援（查證：MDN `paint-order`，SVG 呈現屬性與 CSS 屬性兩種寫法，CSS 優先）。
- **刻意不用的**：`<textPath side="right">`（跨瀏覽器不齊）、`textLength` + `lengthAdjust`（本站的字距變化要是**弧長的後果**，不是被設定的值——見簽名動效）。
- **fallback**：若 `paint-order` 不被支援，描邊會蓋掉字身內側的一半，字仍然可讀，只是厚了一圈（視覺退化，資訊零損失）。HTML 標題不依賴它，改用兩個偽元素疊層，所以標題在任何情況下都是四層立體字。

### B 動效與時間軸層 — SMIL `<animateMotion>` ＋ `<mpath>`

- **承載**：環境動效 `brillo`。光點走的軌道**必須**是緞帶本身那條 `<path>`，否則「招牌在反光」這件事會變成兩個不相干的東西各走各的。`<mpath>` 是唯一能宣告「我走的就是那一條」的方式。
- **支援現況**：MDN 標示 `<mpath>` 為 **Baseline · Widely available，自 2018 年 10 月起跨瀏覽器可用**。SVG 2 已移除 xlink 命名空間需求，應使用 `href`；為相容舊版瀏覽器可同時保留 `xlink:href`（查證：MDN `<mpath>`）。本站兩個都寫。
- **`prefers-reduced-motion`**：SMIL **不會**自動遵守這個媒體查詢，必須用 JS 明確處理：`svg.pauseAnimations()` 後 `svg.setCurrentTime(2.25)` 把光點停在看得見的位置。只寫 CSS 媒體查詢是不夠的，這是最常見的漏網。
- **fallback**：SMIL 不執行時，`<circle class="brillo">` 仍然渲染在路徑起點（`M6 44`），畫面上是一顆靜止的高光珠子——本來就是招牌上會有的東西。

### D 輸入與感測層 — Pointer Events ＋ `setPointerCapture()`

- **承載**：推拉雙音控制項。需要在指標離開按鈕邊界後仍收得到 `pointermove`／`pointerup`（因為「拉」本來就會把指標拉出按鈕），這正是指標捕獲存在的理由。
- **支援現況**：MDN 標示 `Element.setPointerCapture()` 為 **Baseline · Widely available，自 2020 年 7 月起跨瀏覽器可用**（查證：MDN `Element: setPointerCapture()`）。
- **必要配套**：控制項 `touch-action:none`，否則手機上的水平拖曳會被瀏覽器解讀成捲動或上一頁手勢。
- **fallback**：`setPointerCapture` 被包在 `try/catch` 裡；失敗時按鈕仍可用鍵盤左右鍵操作，而且兩個答案永遠印在按鈕兩側，另有整頁的靜態對照表（`La carta del banco`）列出全部四題八個答案——**無 JS 時資訊零損失**，只是不能互動。

### 效能預算（實測）

| 項目 | 實測 | 門檻 |
|---|---|---|
| 單頁大小（含全部 inline CSS/JS/SVG） | 33.9 / 36.0 / 46.2 / 44.1 KB | ≤ 350 KB |
| 外部資源 | 僅 Google Fonts（4 family）；零圖片、零音檔 | — |
| 首屏 JS | 一支 IIFE，約 130 行；只綁 `pointermove`（rAF 節流）與 4 個按鈕 | ≤ 100ms |
| 主要動畫 | signature 每幀只改**一個** `<path>` 的 `d`（1 個屬性 / frame）；input-driven 只改 2 個 CSS 自訂屬性 | 60fps |
| Layout thrashing | 無：`pointermove` 只寫不讀，`fuelleCinta` 只 `setAttribute`，全程沒有 `getBoundingClientRect` | — |

**已知取捨**：`-webkit-text-stroke` 是非標準前綴屬性（各家瀏覽器皆實作）。不支援時 `.relieve::before` 會退成一層深色實心字疊在字身後面，仍然是一個投影效果，標題照樣可讀。

---

## 十三、外部參照

- **UNESCO**：〈El filete porteño de Buenos Aires, una técnica pictórica tradicional〉，二〇一五年十二月一日於納米比亞召開的保護非物質文化遺產政府間委員會第十屆會議列入人類非物質文化遺產代表名錄（ich.unesco.org 01069）。
- **禁令**：S.E.T.O.P. 第 1606/75 號命令（一九七五）禁止在市內公車車體內外漆繪任何徽記、紋飾與裝飾元素，理由是「會讓駕駛分心」；一九八五年六月更新，二〇〇六年廢止（布宜諾斯艾利斯市政府文化局「De la prohibición a la representación mundial」）。
- **最早的繪師**：三位義大利移民之子 **Cecilio Pascarella、Vicente Brunetti、Salvador Venturo**，於二十世紀初的車廂廠起手。Pascarella 以在馬車上寫哥德體題詞著稱，繪師行話稱那種字為 **ergóstrica**（布宜諾斯艾利斯市政府「Del carro al cuadro. La historia del fileteado porteño」）。
- **當代繪師**：Carlos Carboni、León Untroib、Martiniano Arce、Jorge Muscia、Elvio Gervasi、Alfredo Genovese（fileteado.com）。
- **樂器面**：班多紐為**異音簧（bisonoric）**樂器，標準「142 音」配置為 71 鈕（右手 38、左手 33），每鈕開合各發一音；由 Heinrich Band 於十九世紀中葉在德國 Krefeld 定型，隨移民傳入拉普拉塔河地區。
- **技術查證**：MDN `<mpath>`（Baseline，2018-10）、MDN `startOffset`（Baseline，2015-07）、MDN `paint-order`、MDN `Element.setPointerCapture()`（Baseline，2020-07）。

---

*本規格書由 **Claude Opus 5 · 排程 Agent** 於 2026-09-22 自範例站 FERRAROTTI 抽出。*
