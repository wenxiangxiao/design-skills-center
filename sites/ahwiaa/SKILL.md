---
name: adinkra-stamped-cloth
description: Ghanaian Asante adinkra cloth printing as a web style — dyed and undyed cloth bands, comb-drawn dividing lines, solid calabash-stamp impressions that lose ink over four presses, and embroidered joining seams as the only colour.
---

# 阿丁克拉印布 Adinkra Stamped Cloth

> 迦納 Asante，Kumasi 近郊 Ntonso 一村。前殖民時期就存在、至今仍在做的西非印布法。
> 本規格書描述的是**印布這件事**，不是「非洲風」。照著做，出來的畫面應該讓看過阿丁克拉的人在三秒內認出來。

---

## 0. 這個流派是什麼

十九世紀初起流傳於阿散蒂（Asante）王國，據傳與 1818 年被俘的鄰國君主 Adinkra 有關。做法：

1. 棉布先用 **kuntunkuni**（樹根）或 **kobene**（紅土）染成深褐或磚紅，也有整塊留白不染的（**nwomu**／白布，喜事穿）。
2. 染好的布條與白布條**縫在一起**，縫線用黃、藍、綠三色棉線挑成之字，露在外面。
3. 用一把**木梳（duafe）**沾墨，在布上拉出分格線——梳齒三到五根，所以分格線天生是「三條一組」。
4. 用**葫蘆殼刻成的印模**（5–8 公分見方，背面黏三根竹籤當把手，印面微凸）沾 **adinkra aduru** 一格一格蓋上去。
   adinkra aduru＝badie 樹皮（*Bridelia ferruginea*）＋鐵渣熬煮數小時，熬到像煤膏。

最關鍵的一件事：**這是手工蓋印**。印模沾一次墨蓋不了幾下，所以同一枚印記在同一塊布上，每一次都長得不一樣。這不是瑕疵，這是這個流派的本體。

外部參照：Smarthistory《Adinkra cloth》／Adire African Textiles《Asante Adinkra Cloth》／FIT Fashion History Timeline《adinkra》／RPI CSDT《Making and Using Adinkra》。

---

## 1. 本風格的 5 個不可省略特徵

> 判準一律是：**拿掉它，畫面就不是阿丁克拉了。**

### 特徵 1 — 梳線分格：分格線是三條一組、會抖、而且貫穿整塊布

分格不是 `border`。分格是一把梳子被拖過整塊布留下的痕跡：三條平行、間距約 5px、微微起伏、從頭到尾對得上。

```css
/* 直的分格線（梳子往下拉）。橫的把 svg 轉 90° 即可。 */
.comb-v{
  width:17px;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='17' height='150' viewBox='0 0 17 150'%3E%3Cg fill='none' stroke='%2314100C' stroke-width='1.5'%3E%3Cpath d='M3.5 0Q5.2 38 3.5 75Q1.8 112 3.5 150'/%3E%3Cpath d='M8.5 0Q6.9 38 8.5 75Q10.1 112 8.5 150'/%3E%3Cpath d='M13.5 0Q15 38 13.5 75Q12 112 13.5 150'/%3E%3C/g%3E%3C/svg%3E");
  background-repeat:repeat-y;
}
```

而「貫穿整塊布」必須是真的，不能是各區塊自己畫自己的。用 **subgrid** 讓每一層巢狀容器共用最外層的欄線：

```css
.sheet {display:grid; grid-template-columns:repeat(12,1fr); position:relative}
.panel {grid-column:1/-1; display:grid; grid-template-columns:subgrid}
.bandrow{grid-column:1/-1; display:grid; grid-template-columns:subgrid}
@supports not (grid-template-columns:subgrid){
  .panel,.bandrow{grid-template-columns:repeat(12,1fr)}
}
```

**Don't**：`border-right:1px solid` 當分格線；每個卡片自己一條框線；圓角。

### 特徵 2 — 一沾四蓋：重複不是複製，是消耗

一枚印模沾一次墨大約蓋四下：

| 第幾壓 | 發生什麼 | 怎麼做 |
|---|---|---|
| 1 | 墨從刻痕邊緣擠出來，形比刻的胖 | `feMorphology operator="dilate"` |
| 2 | 剛好 | 輕微 dilate，開始出現零星漏白 |
| 3 | 開始缺角 | `operator="erode"` ＋ 布紋挖洞 |
| 4 | 只剩布紋高的地方吃得到墨 | 大幅 erode ＋ 大量挖洞 |

一條四級濾鏡鏈就夠了（`lv` 0–3，整站只要四個 `<filter>`）：

```html
<filter id="ink3" x="-22%" y="-22%" width="144%" height="144%" color-interpolation-filters="sRGB">
  <!-- 布紋：低頻 fractalNoise 就是棉布的經緯起伏 -->
  <feTurbulence type="fractalNoise" baseFrequency="0.10 0.075" numOctaves="2" seed="51" result="tooth"/>
  <!-- 手蓋的印不會正：用布紋本身把印面推歪 -->
  <feDisplacementMap in="SourceGraphic" in2="tooth" scale="8"
                     xChannelSelector="R" yChannelSelector="G" result="pressed"/>
  <!-- 墨不夠了：刻痕只有一部分吃得到墨 -->
  <feMorphology in="pressed" operator="erode" radius="2.4" result="spread"/>
  <!-- 布紋低的地方直接沒有墨（硬邊漏白，不是半透明） -->
  <feColorMatrix in="tooth" type="matrix"
    values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1 0 0 0 -0.02" result="weave"/>
  <feComponentTransfer in="weave" result="weavehard">
    <feFuncA type="discrete" tableValues="0 1"/>
  </feComponentTransfer>
  <feComposite in="spread" in2="weavehard" operator="in"/>
</filter>
```

四級的參數（單位是符號自身的 user unit，符號框 100×100）：

| lv | baseFrequency | displace scale | morphology | 漏白 offset |
|---|---|---|---|---|
| 0 | `0.13 0.09` | 3.0 | dilate 2.4 | 不挖 |
| 1 | `0.12 0.085` | 4.4 | dilate 0.8 | +0.34 |
| 2 | `0.11 0.08` | 6.0 | erode 1.3 | +0.14 |
| 3 | `0.10 0.075` | 8.0 | erode 2.4 | −0.02 |

套用：

```css
.press[data-lv="0"]{filter:url(#ink0)}
.press[data-lv="1"]{filter:url(#ink1)}
.press[data-lv="2"]{filter:url(#ink2)}
.press[data-lv="3"]{filter:url(#ink3)}
```

**判準**：把任何一排重複印記放大，四枚必須不一樣；第四枚必須看得出「快沒墨了」而不是「被調低了透明度」。用 `opacity` 做出來的是褪色，不是缺墨——**缺墨是缺一塊，不是變淡**。

**Don't**：`opacity:.6` 假裝墨少；`transform:rotate()` 以外的完美重複；CSS `repeat()` 貼同一張圖。

### 特徵 3 — 印是實心塊面，沒有輪廓線

印模是浮雕：凸起的部分吃墨，凹下去的刻痕不吃墨。所以畫面上只有**兩種狀態**：有墨、沒墨。

- 沒有線稿、沒有描邊、沒有濃淡、沒有網點、沒有漸層。
- 形一律用 `fill` ＋ `fill-rule="evenodd"` 做出來（環＝大圓套小圓）。
- 幾何只用**圓弧與直邊**。要一個環就用兩個同心圓，要一個螺旋就用等距螺旋的內外緣接成多邊形。
- 對稱是常態：雙邊鏡射或四方旋轉。

```html
<!-- 環：外圓 + 內圓，evenodd 挖空 -->
<path fill-rule="evenodd" d="M5,50a45,45 0 1,0 90,0a45,45 0 1,0 -90,0Z
                             M12,50a38,38 0 1,0 76,0a38,38 0 1,0 -76,0Z"/>
```

**Don't**：`stroke` 描外形；貝茲自由曲線畫出來的「有機」造型；照片；emoji；扁平化單色圖示。

### 特徵 4 — 染布與未染布並置，而墨只有一種

一塊阿丁克拉布是**一條一條布縫起來的**，其中有染過的、有沒染的。所以版面天生是橫帶（或直條）交替，而不是「一個背景色＋幾張卡片」。

本站這塊布是 **nwomu 式**（白布為主、間以染帶）的阿丁克拉——喜事穿的那一種。分工寫死：

- **未染帶（nwomu 未漂棉 `#E2D8C0`）**：**所有印記一律蓋在這裡**，長文也在這裡。真實做法如此（白布阿丁克拉本來就存在），而且順手解決了深褐底上黑墨對比不足的可及性問題——印記同時是可點的控制項，必須看得見。
- **深褐帶（kuntunkuni `#402A1E`）**：刊頭、頁尾、短標籤帶。放淺色字，不放印記。
- **磚紅帶（kobene `#8E3A22`）**：次級資訊帶，打斷「白—褐—白—褐」的節奏用。
- 墨永遠只有一種顏色。**要層級就換布，不要換墨色，也不要換印記的顏色。**

三種布輪替著排（白／褐／紅／白／褐／紅…），每一帶換一次——這是這個版面唯一的節奏來源。

> 反過來做（印記蓋在深褐帶上）在實體布上是對的，但在螢幕上會讓黑墨與深褐只剩約 1.9:1 的對比。若你的印記是純裝飾、不可互動，可以那樣做；只要它是控制項或承載資訊，就必須放在未染帶上。

```css
.cloth{background-color:#402A1E;
  background-image:repeating-linear-gradient(90deg,#4B3323 0 1px,transparent 1px 4px),
                   repeating-linear-gradient(0deg,#4B3323 0 1px,transparent 1px 4px)}
.nw   {background-color:#E2D8C0;color:#14100C;
  background-image:repeating-linear-gradient(90deg,#D3C7AB 0 1px,transparent 1px 4px),
                   repeating-linear-gradient(0deg,#D3C7AB 0 1px,transparent 1px 4px)}
```

兩層 1px／4px 的**硬邊**條紋就是棉布的經緯。**布不可以是平塗色**。

### 特徵 5 — 接布的繡線是唯一的彩色

布條與布條之間那道 nwomu 縫線，用黃、藍、綠三色棉線挑成之字，故意外露。**除了這三條線，整個畫面不准有第四種顏色。**

```css
.seam{height:26px;border-top:2px solid #14100C;border-bottom:2px solid #14100C;
  background-repeat:repeat-x;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='13' height='26' viewBox='0 0 13 26'%3E%3Cg fill='none' stroke-width='2.4' stroke-linecap='round'%3E%3Cpath d='M1.5 2L11.5 11' stroke='%23E8A31C'/%3E%3Cpath d='M11.5 2L1.5 11' stroke='%2317557F'/%3E%3Cpath d='M1.5 15L11.5 24' stroke='%232C6B47'/%3E%3Cpath d='M11.5 15L1.5 24' stroke='%23E8A31C'/%3E%3C/g%3E%3C/svg%3E")}
```

**Don't**：把繡線顏色拿去當按鈕底色、當標題色、當漸層。它是線，不是色票。（唯一的例外：focus ring 可以借黃線那一色，因為那是可及性硬需求。）

---

## 2. 設計哲學

1. **顏色不是設計決定，是染料。** 你只有三種布（深褐、磚紅、未染）和一種墨。想要層級就換布、換印記密度、換留白，不要新增顏色。
2. **重複是消耗。** 這個流派最大的一課：同一個東西出現第二次，它應該變少。網頁預設的「複製貼上一模一樣」在這裡是錯的。
3. **工具的形狀寫在成品上。** 梳子有幾齒，分格線就有幾條；印模是葫蘆殼切的，所以印面微凸、邊緣微彎。畫面要誠實交代它是被什麼做出來的。
4. **符號先於裝飾。** 每一枚印記是一句話。不要因為「這裡空空的」就蓋一枚。空著是可以的。
5. **接縫要看得見。** 拼接、對齊誤差、重疊，是布的事實，不藏。

---

## 3. 色彩系統

| 用途 | hex | 佔比 | 規則 |
|---|---|---|---|
| kuntunkuni 染褐（刊頭／頁尾／標籤帶） | `#402A1E` | ~28% | 永遠帶 1px/4px 雙軸硬邊布紋，禁止平塗 |
| 布紋亮線 | `#4B3323` | ~6% | 只作為布紋，不單獨使用 |
| nwomu 未漂棉（印記帶＋長文帶） | `#E2D8C0` | ~30% | 所有長文的底，禁止在染帶上排長文 |
| nwomu 亮階 | `#F0E9D8` | ~4% | 大標、反白字 |
| adinkra aduru 墨 | `#14100C` | ~16% | 全部印記、正文、2px 規線；唯一的墨 |
| 染帶上的墨 | `#100C08` | — | 染布吃墨較深，只差一階 |
| kobene 染紅（次底） | `#8E3A22` | ~10% | 標籤帶、短資訊帶，同樣帶布紋 |
| 繡線黃 yarn-Y | `#E8A31C` | ~4% | 只在接縫與 focus ring |
| 繡線藍 yarn-B | `#17557F` | ~2% | 只在接縫 |
| 繡線綠 yarn-G | `#2C6B47` | ~2% | 只在接縫與「對了」的回饋 |
| 葫蘆殼（印模實體） | `#C9A86F` / 刻痕 `#8A6A38` | <2% | 只用在「尚未蓋下去的印模」這一個物件 |

**零純白、零純黑、零色彩漸層、零 `filter:blur`、零圓角 >3px、零模糊陰影。**
需要厚度的時候用硬邊實色（`box-shadow:3px 3px 0`）——那是布的厚度，不是光。
本風格**沒有光源**：沒有高光、沒有落影、沒有立體感。顏色就是染料與墨本身。

對比實測（WCAG）：`#14100C` on `#E2D8C0` ≈ 13:1；`#E2D8C0` on `#402A1E` ≈ 9.7:1；`#E2D8C0` on `#8E3A22` ≈ 7.1:1。

---

## 4. 字體系統

阿丁克拉布上本來沒有字，所以字體的任務是**不要跟印記打架**：要重、要方、要沉默。

| 角色 | 字體 | 字重 | 用法 |
|---|---|---|---|
| 拉丁大標／標籤 | `Archivo Black` | 400（本身即黑體） | 全大寫，`letter-spacing:.06–.14em` |
| 漢字標題 | `Noto Serif TC` | 900 | `line-height:1.24` |
| 漢字內文 | `Noto Sans TC` | 400/700 | `line-height:1.85`，`font-feature-settings:"palt" 1` |
| Twi／IPA（ɔ ɛ Ɔ Ɛ） | `Noto Sans` | 700 | **必要**：Archivo Black 不含 IPA Extensions，阿坎語的 ɔ/ɛ 會掉字 |

字級 scale（1.26 倍）：12 / 13.5 / 15.5 / 16 / 20 / 25 / 32 / 40 / clamp(28px,6.4vw,64px)。

標籤一律這樣寫：

```css
.tag{font-family:"Archivo Black",sans-serif;font-size:11px;letter-spacing:.14em;
     display:inline-block;border:2px solid currentColor;padding:2px 7px}
```

---

## 5. 版面與網格

- 外層 12 欄（≤560px 收成 4 欄），欄間**沒有 gap**——布上沒有溝，只有梳線。
- 版面單位是**帶（band）**：一條橫貫全寬的列，內部再切 4/8、8/4、4/4/4。
- 帶與帶之間放一條橫梳線（17px）；布條與布條之間放一道縫線（26px）。
- **左右不對稱**：印記帶與文字帶要左右交替，不要每一帶都印記在左。
- 直梳線固定落在第 4、7、10 欄（4 欄時落在 2、3、4），用一層 `position:absolute` 的 `.combs` 疊在整張布上，`pointer-events:none`。
- 留白規則：一條帶最多放一種印記；印記帶的上下內距 10–14px，文字帶 18–22px。
- 旋轉：印記每一枚給 ±1.5° 的固定（非隨機）偏擺，`rotate(w 50 50)`，w 由序號決定。**整體版面不旋轉**——布是平的。

---

## 6. 元件配方

### 導覽（印模／印痕）

現在這一頁＝**已經蓋在布上的印痕**（實心墨、被濾鏡吃過邊、直接坐在布上）。
其他頁＝**還沒蓋下去的印模**（葫蘆殼面 `#C9A86F`、2px 墨框、`border-radius:3px`、上緣一個把手、刻痕以較深的殼色表示）。

```html
<a href="x.html"><span class="cal"><span class="cal-handle"></span>
  <svg class="cal-face" viewBox="-6 -6 112 112"><use href="#g-aya"/></svg></span>
  <span class="lab">鼓語</span></a>
```
```css
.cal-face{width:46px;height:40px;background:#C9A86F;border:2px solid #14100C;border-radius:3px}
.cal-face use{fill:#8A6A38}
.cal-handle{position:absolute;left:50%;top:-4px;width:13px;height:11px;margin-left:-6.5px;
  background:#C9A86F;border:2px solid #14100C;border-bottom:0}
```

### 按鈕

```css
.btn{font-family:"Archivo Black",sans-serif;font-size:12px;letter-spacing:.12em;
     padding:9px 15px;background:#E2D8C0;color:#14100C;border:2px solid #14100C;cursor:pointer}
.btn:hover{background:#E8A31C}
```
沒有圓角、沒有陰影、沒有漸層。

### 「卡片」

**本風格沒有卡片。** 要並置三件事就切三格，用 2px 墨線分開，底是同一塊布。`.grid12>div{border:2px solid #14100C;margin:-1px 0 0 -1px}`（負邊距讓相鄰的線合成一條，就像布上真的只有一條線）。

### 表格

`border-collapse:collapse`；每一格 2px 墨框；`th` 用 Archivo Black 11px 加字距。表格在這個風格裡很自然——布本來就是格子。

### Footer

最後一道縫線之後，一條染布帶切成 4/4/4：WHERE／WHEN／WHO。

---

## 7. 動效規則

**四種，缺一不可。**安靜不是風格，安靜是沒做完。

| 種類 | 名稱 | 觸發 | 做法 | duration / easing |
|---|---|---|---|---|
| ambient | 乾 | 無，持續 | 每一排的第四壓（`.last`）`opacity` 1 → .18 | `26s steps(4,jump-none) infinite alternate` |
| input | 壓 | hover／focus | `transform:scale(.982)` | `60ms steps(2,jump-none)` |
| transition | 梳過 | 每次頁面載入 | `clip-path:inset(0 100% 0 0)` → `inset(0)` | `.48s steps(12,jump-none) both`（12＝梳齒數） |
| signature | 重沾 | 點／Enter 任一印記 | 從該格起重新排定 lv 0,1,2,3,0,… 並逐格重壓 | 每格 `90ms`，錯開 90ms |

**全部用 `steps()`，一個 `ease` 都不准有。** 理由不是風格偏好：蓋印是離散事件，第三壓與第四壓之間沒有中間狀態，所以補間在這個流派裡是說謊。

```css
@keyframes dry{0%{opacity:1}100%{opacity:.18}}
.press.last{animation:dry 26s steps(4,jump-none) infinite alternate}
@keyframes combed{from{clip-path:inset(0 100% 0 0)}to{clip-path:inset(0 0 0 0)}}
.sheet{animation:combed .48s steps(12,jump-none) both}
@media(prefers-reduced-motion:reduce){
  .press.last{animation:none;opacity:1}          /* 停在剛印好那一階 */
  .sheet{animation:none;clip-path:none}          /* 布直接是梳好的 */
  .press{transition:none}
  .press.justpressed{animation:none}             /* 重沾立即到位，並寫進 aria-live */
}
```
降級後資訊零損失：墨級仍然改變，只是不逐格演給你看。

### 重沾（signature）的實作

```js
function relevel(row,start){
  var ps=row.querySelectorAll('.press');
  for(var i=0;i<ps.length;i++){
    var lv = i<start ? 3 : (i-start)%4;      // 沾墨點之前的維持「快沒墨」
    ps[i].setAttribute('data-lv',lv);
    ps[i].classList.toggle('last',lv===3);
  }
}
```

---

## 8. 插畫與圖像風格

技法代號 **fold-free relief impression（浮雕蓋印構成）**。全站每一張圖都是同一件事的產物：一塊刻好的浮雕被沾墨、被壓在布上。

**造形規則**

1. 只用圓弧與直邊。環＝同心圓 evenodd；螺旋＝等距螺旋內外緣接成的多邊形；葉形＝`sin` 包絡的對稱梭形。
2. 每一枚都要有對稱：雙邊鏡射或 2/4 方旋轉。
3. 線寬概念不存在——沒有線，只有塊面。要「細」就把塊面做窄。
4. 一枚符號畫在 100×100 的框裡，四邊至少留 4 單位邊距（印模切下來的葫蘆殼邊）。

**與鄰近技法的分界（重要，不要做成別的東西）**

- 不是 **stencil（型版）**：型版是把墨從洞裡推到另一張紙上，圖是洞的形狀；這裡是浮雕直接接觸轉印，圖是**凸起的部分**，刻掉的溝永遠不印。
- 不是 **剪紙**：剪紙的圖是紙上的洞；這裡的圖是墨。
- 不是 **版畫刻線**：刻線用線距做濃淡；這裡**沒有濃淡**，只有有墨／沒墨與缺了多少。
- 不是 **半調網點**：明文禁用任何網點。
- 不是 **細線幾何線描**：明文禁用髮絲輪廓。

---

## 9. Logo 與 Favicon

Logo 必須是**一枚印記**，不是一個字標加圖示。

- 畫在 100×100 的框裡，四方或雙邊對稱，實心墨，`fill-rule="evenodd"`。
- 外緣留一圈框（葫蘆殼切下來的邊）。
- 字標另外放在印記右邊，用 Archivo Black 全大寫，兩行，不與印記重疊。
- 中間插一道直梳線把印記與字標分開。

```html
<svg viewBox="0 0 320 100"><rect width="320" height="100" fill="#402A1E"/>
 <g transform="translate(6,6) scale(0.88)"><path fill-rule="evenodd" fill="#E2D8C0" d="…"/></g>
 <text x="108" y="45" fill="#E2D8C0" font-family="Archivo Black" font-size="27">BRAND</text>
 <g fill="none" stroke="#14100C" stroke-width="1.5">
   <path d="M100 0Q101.7 25 100 50Q98.3 75 100 100"/></g></svg>
```

Favicon：把同一枚印記放進 `#402A1E` 的方框，inline SVG data URI 寫在 `<head>`。16px 下要還讀得出來，所以最細的塊面不得小於 6/100。

---

## 10. Do & Don't

**Do**

- 先決定「這一帶要說哪一句」，再選印記。
- 讓分格線貫穿整塊布（subgrid）。
- 讓重複的東西一次比一次少。
- 長文一律放在未染布上。
- 把接縫、對齊誤差、微偏擺留著。

**Don't**（含去 AI 化禁令）

- 紫藍漸層、任何漸層。
- 置中大標＋副標＋兩顆按鈕＋三張圓角卡片。
- emoji 當 icon；一律自繪印記。
- `border-radius` > 3px、`box-shadow` 帶模糊、`filter:blur`。
- 用 `opacity` 假裝墨少（那是褪色，不是缺墨）。
- 把繡線的黃／藍／綠拿去當主題色、按鈕色、標題色。
- 「EST. 19xx」徽章、「把 X 變成 Y」句式、Lorem ipsum。
- 把符號當裝飾亂灑。每一枚都是一句話，說錯了就是說錯了。
- 冒充傳統：自己新刻的印模要說明它是自己刻的，不要混進傳統符號表裡。

---

## 11. 頁面骨架範例（可直接使用）

```html
<section class="sheet">
  <div class="combs" aria-hidden="true"><i></i><i></i><i></i></div>
  <div class="seam" aria-hidden="true"></div>
  <div class="panel cloth">

    <div class="bandrow" style="--n:0">
      <div class="cell sa markcell nw">
        <svg class="markrow" viewBox="0 0 500 100" data-sym="aya">
          <g class="press" data-lv="0" data-i="0"><use href="#g-aya" transform="translate(0 0) rotate(-1.5 50 50)"/></g>
          <g class="press" data-lv="1" data-i="1"><use href="#g-aya" transform="translate(100 0) rotate(1 50 50)"/></g>
          <g class="press" data-lv="2" data-i="2"><use href="#g-aya" transform="translate(200 0) rotate(-0.5 50 50)"/></g>
          <g class="press last" data-lv="3" data-i="3"><use href="#g-aya" transform="translate(300 0) rotate(1.5 50 50)"/></g>
          <g class="press" data-lv="0" data-i="4"><use href="#g-aya" transform="translate(400 0) rotate(-1 50 50)"/></g>
        </svg>
      </div>
      <div class="cell sb kb">
        <p class="tag">HOW LONG　等多久</p>
        <p>對鼓 14 週（含陰乾，急件不接）。</p>
      </div>
    </div>
    <div class="hcomb" aria-hidden="true" style="--n:0"></div>

  </div>
</section>

<svg class="defs" width="0" height="0" aria-hidden="true"><defs>
  <filter id="ink0">…</filter><filter id="ink1">…</filter>
  <filter id="ink2">…</filter><filter id="ink3">…</filter>
  <path id="g-aya" fill-rule="evenodd" d="…"/>
</defs></svg>
```

---

## 12. 技術實作與相容性

本站三項核心技術，全部先查證再用。

### 12.1 SVG 濾鏡鏈（A 渲染層）

**承載**：特徵 2（一沾四蓋）與特徵 3 的邊緣行為。整站**沒有 canvas、沒有自寫渲染引擎、沒有一張點陣圖**——所有圖像都是同一組純幾何 `<path>` 經這四條濾鏡輸出的不同結果。

**支援現況**：MDN《`<feMorphology>`》標示 **Baseline Widely available**，2015 年 7 月起各瀏覽器可用；`feTurbulence`／`feDisplacementMap`／`feColorMatrix`／`feComponentTransfer`／`feComposite` 同屬 SVG 1.1 濾鏡原語，同樣普遍可用。
來源：MDN `Web/SVG/Reference/Element/feMorphology`、MDN `Web/SVG/Reference/Element/filter`。

**實作要點（踩過才知道的三件事）**

1. 一定要寫 `color-interpolation-filters="sRGB"`。預設是 linearRGB，墨會變灰。
2. `baseFrequency` 與 `feMorphology radius` 的單位是**符號的 user unit**，不是 CSS px。符號框 100×100 在頁面上大約顯示成 26–95px，換算比 0.26–0.95，所以 `baseFrequency 0.10` 對應到螢幕上大約 3px 週期的布紋。**照著 CSS px 直覺填，會得到一片看不見的雜訊。**
3. 漏白要用 `feComponentTransfer` + `feFuncA type="discrete"` 硬切成 0／1 再 `feComposite operator="in"`。只用 `in` 會得到半透明的灰邊——那是褪色不是缺墨。

**Fallback**：濾鏡被停用或不支援時，`<path>` 原樣渲染成實心墨塊——形完全正確、對比更高、全部資訊都在；只是四壓長得一樣。**沒有任何內容依賴濾鏡存在。**

### 12.2 CSS Grid subgrid（C 版面與樣式層）

**承載**：特徵 1「一把梳子拉過整塊布」。巢狀的 `.panel` / `.bandrow` / `.nav` 共用最外層 `.sheet` 的 12 條欄線，所以直梳線從刊頭穿到頁尾都對得上，而不是每一區自己畫自己的。

**支援現況**：**Baseline Widely available（2026-03-15 起）**；Firefox 71（2019）、Safari 16（2022）、Chrome/Edge 117（2023-09）、Samsung Internet 24，全球支援度 >92%。
來源：caniuse `css-subgrid`、web-platform-dx features explorer `subgrid`。

**Fallback**：

```css
@supports not (grid-template-columns:subgrid){
  .panel,.bandrow,.nav{grid-template-columns:repeat(12,1fr)}
}
```
因為所有軌道都是 `1fr` 且沒有 gap，降級後欄線位置**完全相同**，梳線照樣對得上；差別只在巢狀層不再自動繼承軌道定義（改欄數要改兩處）。零視覺損失。

### 12.3 CSS `steps()` 逐格動畫（B 動效與時間軸層）

**承載**：四種動效全部。蓋印是離散事件，所以整站沒有一個 `ease`。

**支援現況**：MDN《`steps()`》標示 **Baseline Widely available**，2015 年 7 月起可用。`jump-none` 關鍵字為 CSS Easing Level 1 的具名寫法，**要求 n > 1**（本站用到 2、3、4、12，皆合法）。
來源：MDN `Web/CSS/Reference/Values/easing-function/steps`。

**Fallback**：舊瀏覽器若不認得 `jump-none`，整個 `animation-timing-function` 宣告無效、退回 `ease`——動畫照跑，只是變成平滑補間。視覺退化、資訊零損失。若要更保守可寫成 `steps(12)`（等同 `jump-end`），代價是最後一格會被吃掉。

### 12.4 附註（非核心技術）

- **Web Audio 合成**（試鼓那一頁）：兩個鼓音以 `OscillatorNode`（118 Hz／168 Hz，帶起音下滑）＋ 一段 90ms 白噪過 bandpass 當棒擊即時合成，**零音檔**。MDN 標示 Baseline Widely available。必須由使用者手勢啟動（`AudioContext` 建立後 `resume()`）；取不到 `AudioContext` 時合成函式直接 return，並改走「把他打的那句印出來」的純視覺路徑，**題目可解性完全相同**。
- `localStorage` 未使用；狀態只存在當次造訪。
- 所有資訊性內容都是建置階段輸出的靜態 HTML：關掉 JavaScript 後，四頁的營業資訊、價目、工序、六句練習句與十二枚印記圖例**一個字都不會少**，只有「重沾」與「試鼓」兩項互動失效（試鼓處有 `<noscript>` 說明替代做法）。

### 12.5 效能

可量測項（本輪實測）：

| 項目 | 值 | 預算 |
|---|---|---|
| 單頁 inline 總大小（含全部 CSS/JS/SVG，不含 Google Fonts） | 35.6–55.1 KB | ≤350 KB |
| 共用 inline JS | 2.8 KB（試鼓頁 10.4 KB） | — |
| 符號幾何總量（15 枚，含 logo） | 9.9 KB 純 path 資料 | — |
| `<filter>` 定義數（整站） | 4 | — |
| 單頁濾鏡套用次數 | 10–93（最多的一頁為 26px 小印記） | — |

設計上的餘裕：濾鏡是**靜態的**（動畫只改 `opacity` 與 `transform`，不改濾鏡參數），所以瀏覽器對每個 `.press` 的濾鏡結果只光柵化一次並快取；只有「重沾」切換 `data-lv` 時會重畫，一次最多 8 枚、每枚濾鏡區域約 144×144 user unit。每幀不讀任何幾何（`relevel()` 只寫屬性、`getBoundingClientRect()` 只在重啟動畫時各呼叫一次），無 layout thrashing。

**誠實聲明**：本站由排程 Agent 在無瀏覽器的環境建置，上表為實測；瀏覽器端的 fps 與首屏 JS 執行時間為依上述結構做的估算，未經真機量測。要驗證請開 DevTools Performance 錄一段重沾。
