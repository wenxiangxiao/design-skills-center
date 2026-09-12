---
name: rosta-window-stencil
description: Soviet ROSTA-window agitprop style — a numbered multi-panel stencil sequence on kraft paper, three flat spot inks, rhymed caption bands, and cardboard bridges solved by connectivity so no cut-out island can fall out.
---

# ROSTA 窗・模版連環窗風格規格書

> 流派：**蘇聯 ROSTA 窗（Окна РОСТА, 1919–1922）**，取自 Design Skills Center 型錄「在地與文化視覺」列。
> 這不是「復古海報風」的泛稱。判準是四件事同時成立：**一張紙上有編號的連環格**、**卡紙模版鏤空的平塗色**、**每格底下一條押韻的說明帶**、**黑塊上看得見刀橋**。缺一件就不是這個流派。

---

## 一、設計哲學

一九一九年九月起，俄羅斯電訊社（ROSTA）在莫斯科空店面的玻璃窗裡貼出手工複製的宣傳畫。它不是印刷品——它是用刀刻的卡紙模版，一色一塊版，一份一份刷出來的。史料統計：一千五百到一千六百款設計，一款平均手工複製約一百五十份，總數約二十四萬份；核心作者是 Mayakovsky、Cheremnykh、Maliutin，其中 Mayakovsky 約四百五十至五百款。一張窗上排四到十二格連環圖，每格底下配一句押韻的短詩。

這個流派的每一個視覺特徵都是製作條件逼出來的，不是品味選擇：

- **為什麼是剪影而不是素描**：模版只有「刻穿」與「沒刻穿」兩種狀態，沒有中間調。所以形狀本身必須完成全部敘事。
- **為什麼是三、四塊專色**：一色一塊版，每多一塊版就多刻一次、多刷一次、多等一次乾。色數是成本。
- **為什麼黑塊上有白痕**：卡紙上任何一塊四周被刻穿的紙都會掉下來。刻版的人一定要在最窄處留一條沒刻穿的紙拉住它——這條紙叫**刀橋**。它不是瑕疵，它是這個流派長成這樣的原因。
- **為什麼要押韻**：窗是給人在街口**念**的，不是給人看的。念不順，第三句就被漏掉。

搬到網頁上，本規格書加了一條原作不需要處理的紀律：**所有說明文字是可選取、對比 ≥ 7:1 的一般 HTML 文字**，圖像只承擔圖像的工作。同時把「可製造性」從刻版師傅的手感改寫成一支可驗算的求解器：**刀橋的位置不由設計者決定，由連通性求解決定。**

---

## 二、本風格的 5 個不可省略特徵

> 這一章是本規格書的核心。每一項都是「拿掉它就不是 ROSTA 窗了」的程度，且都附可直接複製的片段。

### 特徵 1・編號連環格，一張紙、一個閱讀順序、三條貫穿全窗的線

四到十二格（六格最實用）排在同一張紙上，每格有 **格號**、**圖框**、**說明帶** 三層，而這三層必須各自對齊成一條貫穿全窗的線——即使某一格的說明是一行、另一格是兩行。這是 `subgrid` 的教科書用例：子格繼承父格的軌道。

```css
.win{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;
     grid-template-rows:repeat(2, auto auto auto)}   /* 每列三條軌道：號/圖/詞 */
.pn{grid-row:span 3;display:grid;grid-template-rows:subgrid;
    border:2px solid var(--ink);background:var(--card)}
@supports not (grid-template-rows:subgrid){
  .pn{display:flex;flex-direction:column}
  .cap{min-height:5.1em}          /* 退回近似對齊，資訊零損失 */
}
```

格號本身是版面元件而不是裝飾：實心方塊、反白數字、放在左上角。**不要**用圓角、不要用細線圓圈、不要用 `1.` 這種文字編號。

```css
.pnh .nm{font-family:"Archivo Black",sans-serif;font-size:19px;line-height:1;
  width:27px;height:27px;display:grid;place-items:center;
  background:var(--ink);color:var(--card)}
```

### 特徵 2・模版鏤空平塗：一色一版、零漸層、零網點、零描邊

每一塊圖都是**閉合的實心形狀**，沒有輪廓線、沒有明暗、沒有透視、沒有半調網點。人物與物件化約成幾何塊面；重要的東西畫大，不是畫近。色版與墨版**不重疊**——因為它們是分開刷的，疊上去會糊。

```css
/* 全站禁令，寫進 reset 裡 */
*{border-radius:0}
.ink,.plate *{filter:none}
/* 陰影一律不存在；需要層次時改用「錯開的實心色塊」 */
```

```html
<!-- 一枚母題的正確結構：紙底 → 色版 → 墨版 → 挖洞 → 刀橋 -->
<svg viewBox="0 0 100 100">
  <rect width="100" height="100" style="fill:var(--paper)"/>
  <polygon points="36,55 64,55 59,66 41,66" style="fill:var(--blue)"/>   <!-- 藍版：只給水 -->
  <circle cx="50" cy="52" r="31" style="fill:var(--ink)"/>               <!-- 墨版 -->
  <circle cx="50" cy="52" r="16" style="fill:var(--paper)"/>             <!-- 挖出的洞 -->
  <line x1="50" y1="34" x2="50" y2="70" style="stroke:var(--paper);stroke-width:3.4"/>
</svg>
```

### 特徵 3・刀橋：每一塊會掉下來的紙，都被一條斷開的白痕拉住

這是本流派最容易被漏掉、也最不可取代的一項。**規則：畫面上任何被墨完全包圍的紙（島），都必須有至少一條刀橋接到外面。**位置在島與外界之間最窄的那一段墨（墨腰），寬度 3–4 個單位（100 單位的格內），端點為 `butt`、不圓角。

求解方法（純 JavaScript，無瀏覽器 API 依賴）：

```js
// 1. 把這一格點陣化成 N×N，墨=1
// 2. 從畫布四邊對「非墨」泛洪 → reach[]
// 3. 任何 非墨 且 !reach 的連通元件 = 島
// 4. 從島出發、穿過墨做 BFS，第一次走出墨的那條路徑 = 最窄的墨腰
// 5. 沿該路徑畫一條紙色線段（兩端各外推 2.2 單位），把島與刀橋標成「紙」
// 6. 重複，直到一個島都不剩
function solveBridges(m,opt){ /* 見 core.js；輸出 {islands,bridges[],inkRatio} */ }
```

刀橋是紙色的線，疊在墨之上：

```css
.br{stroke:var(--brc,#D5CBA9);stroke-width:var(--bw,3.4);stroke-linecap:butt}
```

> **不要手畫刀橋。**手畫的橋會下在好看的位置；求解出來的橋會下在最窄的位置，而那正是它看起來對的原因。

### 特徵 4・每格底下一條說明帶，全窗一轍到底

說明帶與圖框**等寬**、以 2px 實線與圖分開、字重 900、字級 16–18px、每一格微傾 ±0.4°～0.5°（手糊的紙不會貼正）。內容必須押韻，而且**一扇窗六句押同一個轍**。

```css
.cap{padding:9px 10px 11px;font-weight:900;font-size:17px;line-height:1.5;background:var(--card)}
.pn:nth-child(2n) .cap{transform:rotate(-.45deg)}
.pn:nth-child(3n) .cap{transform:rotate(.4deg)}
@media (max-width:560px){.cap{transform:none!important}}   /* 窄螢幕不歪，先保可讀 */
```

中文的韻用**十三轍**判定（北方曲藝的分法）。把它寫成規則引擎，比交給感覺可靠：

```js
var ZHE={ an:{n:'言前轍',f:'an / ian / uan / üan'}, ang:{n:'江陽轍',f:'ang / iang / uang'},
  ong:{n:'中東轍',f:'eng / ing / ong / iong'}, i:{n:'一七轍',f:'i / ü / 支思'},
  ao:{n:'遙條轍',f:'ao / iao'} };
// 每句宣告自己的韻腳字與轍，成窗前檢查六句是否同轍，異轍者點名第幾格
```

> 換成別的語言時，這一項換成該語言的等價紀律（英文 ROSTA 譯本用的是雙行 couplet 的尾韻），但**不可以取消**：說明帶的文字如果不是韻文，這個流派的節奏就不見了，剩下的只是六張圖。

### 特徵 5・粗紙底上的三塊專色：墨為主、朱為動作、藍為水；紅永遠不當底色

底是**牛皮／包裝紙級的粗紙**，不是米白、不是白。上面只有三塊專色，每塊有固定語意，語意不可以換來換去。

```css
:root{
  --paper:#D5CBA9;  /* 粗紙・全站地色 約 46% */
  --card:#E3DBBF;   /* 較淺的卡紙・格框與表格底 約 20% */
  --gnd :#B9AE8B;   /* 紙以外的世界（頁底、貼窗的牆） 約 12% */
  --ink :#16130E;   /* 墨版・主色 約 15% */
  --red :#A62113;   /* 朱版・只給「動作、拒絕、現用態」 ≤5% */
  --blue:#275274;   /* 藍版・只給「水」（或該題材的第二語意） ≤2% */
}
/* 紙的粗糙：兩層極淡的重複線性漸層，零外部圖片 */
body::before{content:"";position:fixed;inset:0;pointer-events:none;opacity:.5;
 background:repeating-linear-gradient(90deg,rgba(22,19,14,.055) 0 1px,transparent 1px 4px),
            repeating-linear-gradient(0deg,rgba(22,19,14,.04) 0 1px,transparent 1px 5px)}
```

硬規則：**朱不能當大面積底色**（它是印上去的第二塊版，不是紙）；**藍只給一種語意**；長文一律落在紙或卡紙上，不落在專色塊上。

---

## 三、色彩系統

| 色票 | 用途 | 面積 |
|---|---|---|
| `#D5CBA9` 粗紙 | 全站地色、圖框內底、輸入框底 | ~46% |
| `#E3DBBF` 卡紙 | 格框、表格、卡片、按鈕底、模版本身 | ~20% |
| `#B9AE8B` 紙外 | 頁面最底層（貼窗的那面牆） | ~12% |
| `#16130E` 墨 | 墨版、全部框線（2–2.6px）、正文、頁尾底 | ~15% |
| `#A62113` 朱 | 動作、拒絕、退件、現用態、重點標籤、行動格 | ≤5% |
| `#275274` 石青 | 單一語意（本站＝水）、連結 | ≤2% |

對比實測（WCAG 2.1 相對亮度公式）：墨／粗紙 = **11.42:1**，墨／卡紙 = **13.37:1**，石青／粗紙 = **5.09:1**、／卡紙 = **5.95:1**（連結），朱／粗紙 = **4.54:1**、／卡紙 = **5.32:1**（小標與錯誤訊息），卡紙／朱 = **5.32:1**（朱底按鈕的字），`#E5A79C`／墨 = **9.12:1**（頁尾小標）。全部通過 AA。**朱不可再調亮**——再亮就掉到 4.5 以下，而這個流派的朱一定會被用在細字上。

禁止：漸層（除了紙紋的兩層極淡重複線）、模糊陰影、半透明疊層、白色 `#FFF`（紙上沒有白）、任何第四塊專色。

---

## 四、字體系統

- 中文：`Noto Sans TC` — 400（正文）／700（表格與強調）／**900（標題、格號、說明帶）**。這個流派沒有細字。
- 拉丁與數字：`Archivo Black` — 格號、金額、統計、單號、時間。方頭、無對比、像刻出來的。
- 字級 scale：11 / 12.5 / 13.5 / 15 / 16.5（正文）/ 17（說明帶）/ 19 / 21 / 25（區標）/ 36（導覽字）。
- 行高：正文 1.78、說明帶 1.5、標題 1.18。字距：正文 `.012em`；標籤與小標 `.1em–.18em`（拉開，像手排的）。
- **禁止**：襯線體、書法體、可變字重的連續補間、任何 `text-shadow`、任何 `letter-spacing` 為負值。

```css
body{font-family:"Noto Sans TC",-apple-system,"PingFang TC","Microsoft JhengHei",sans-serif;
     font-size:16.5px;line-height:1.78;letter-spacing:.012em}
.mono{font-family:"Archivo Black",Impact,sans-serif;letter-spacing:.04em}
.lead{font-size:14px;letter-spacing:.16em;font-weight:900;color:var(--red)}
```

---

## 五、版面與網格

- 整頁是**一張貼在牆上的紙**：`max-width:1160px` 的 `.sheet`，2.6px 實線墨框，外面再加一圈 1.6px 的雙線（用 `box-shadow` 疊兩層實色做，不是模糊陰影）。

```css
.sheet{background:var(--paper);border:2.6px solid var(--ink);
  box-shadow:0 0 0 1.6px var(--paper), 0 0 0 3.2px var(--ink)}
```

- 首屏＝**窗本身**。頂帶（墨底、單行、含期別與窗號）＋導覽＋六格窗，沒有主視覺、沒有標語、沒有按鈕組。
- 區塊之間以 2.6px 墨線橫斷（`.blk{border-top:2.6px solid var(--ink)}`），不用留白分段。
- 兩欄用 `1fr 1fr`，≤900px 崩成一欄；窗在 ≤900px 變 2 欄、≤560px 變 1 欄且解除 `subgrid`。
- 旋轉只出現在說明帶（±0.4–0.5°）與印記（−2.2°）。**版面本身不歪。**
- 留白規則：格與格 14px、格內 padding 9–10px、區塊 20px/18px。這個流派的紙是滿的，但不是擠的——留白率約 20–28%。

---

## 六、元件配方

**導覽（cutout-plate 鏤空版）**：四頁＝四塊疊著的卡紙版。現用頁那一塊**被刻穿了**——字是洞，透出底下的朱，而且洞裡留著兩條刀橋；其餘三塊還沒下刀，字是虛線的刀路。

```html
<a class="nv on" href="#" aria-current="page"><svg viewBox="0 0 62 62">
  <mask id="nvm0" maskUnits="userSpaceOnUse" x="0" y="0" width="62" height="62">
    <rect width="62" height="62" fill="#fff"/>
    <text x="31" y="43" class="nvc" fill="#000">窗</text>
    <rect x="5" y="21.4" width="52" height="3.2" fill="#fff"/>  <!-- 刀橋 -->
    <rect x="5" y="36.4" width="52" height="3.2" fill="#fff"/>
  </mask>
  <rect width="62" height="62" style="fill:var(--red)"/>
  <rect width="62" height="62" style="fill:var(--card)" mask="url(#nvm0)"/>
  <rect x="1" y="1" width="60" height="60" fill="none" style="stroke:var(--ink)" stroke-width="1.8"/>
</svg><span>本週的窗</span></a>
```

```css
.nv .nvc{font-family:"Noto Sans TC",sans-serif;font-weight:900;font-size:36px;text-anchor:middle}
.nv .nvo{fill:none;stroke:var(--ink);stroke-width:1.5;stroke-dasharray:3.4 3.4} /* 未下刀的刀路 */
```

**按鈕**：直角、2.2px 墨框、900 字重、`letter-spacing:.06em`。hover 換成朱底紙字（**不是**圖地反轉，是「被朱蓋過」）。

```css
.btn{font:inherit;font-weight:900;background:var(--card);color:var(--ink);
  border:2.2px solid var(--ink);padding:8px 15px;letter-spacing:.06em;cursor:pointer}
.btn:hover,.btn:focus-visible{background:var(--red);color:var(--card);border-color:var(--red)}
.btn.pri{background:var(--ink);color:var(--card)}
```

**表格**：1.5px 墨格線、表頭墨底紙字、數字欄用 `Archivo Black` 且 `white-space:nowrap`。這個流派的資訊都住在表格裡，不住在卡片裡。

**表單**：直角、2px 墨框、底色為粗紙（比卡紙深，看得出是「凹進去的」）。錯誤訊息是朱色 900 字重，直接寫理由，不寫「此欄位為必填」。

**頁尾**：整塊墨底，三欄；小標用 `#E5A79C`（朱在墨上的可讀變體，對比 6.4:1），不要直接把 `--red` 放在墨上。

---

## 七、動效規則（四種，缺一不可）

| 種類 | 做法 | 參數 | 降級 |
|---|---|---|---|
| **ambient 環境** | 墨在乾：全窗墨版的溢墨在 13.5 秒內從「剛刷完」肥到「乾了」瘦。三個 `feMorphology` 濾鏡以 `step-end` 切換，不補間、不淡入 | `dryup 13.5s step-end infinite`；erode 1.3 → erode 0.6 → dilate 0.25 | 固定在 `#damp` |
| **input 輸入** | 游標移到任一格，該格**所有刀橋轉朱**，格角同時印出「島 N・橋 N」 | 純 CSS 換 `--brc`，延遲 0ms | 保留（換色不是動畫） |
| **transition 轉場** | 抽版：進頁時一塊卡紙版從畫面上被抽走；編窗的每次狀態切換也抽一次 | `lift .62s steps(4,end)`／`pull .68s steps(5,end)` | `display:none`，直接是最終畫面 |
| **signature 簽名** | **刀橋自解 bridge-solve**：刀橋先以朱色分四段切開，第五段變成紙色。逐格 stagger 95ms | `cutin 1.05s steps(5,end) backwards`，`animation-delay:calc(var(--k)*95ms)` | 不播，刀橋直接在最終位置 |

四種全部 `prefers-reduced-motion` 降級且資訊零損失。

```css
@keyframes dryup{0%{filter:url(#wet)}22%{filter:url(#damp)}52%{filter:url(#dry)}100%{filter:url(#dry)}}
@keyframes cutin{0%{--bw:0;--brc:#A62113}70%{--bw:3.4;--brc:#A62113}
                 71%{--brc:#D5CBA9}100%{--bw:3.4;--brc:#D5CBA9}}
@keyframes lift{0%{transform:translateY(0)}100%{transform:translateY(-101%)}}
@media (prefers-reduced-motion:reduce){
  .pn svg.pv,.pn svg.pv.cut{animation:none;filter:url(#damp)}
  .pv.cut,.big.cut,.plate.go{animation:none}
  .liftoff{animation:none;display:none}
}
```

> **`backwards` 而不是 `both`。**`cutin` 用 `animation-fill-mode:backwards`，動畫結束後元素回到正常層疊，hover 才改得動 `--brc`。用 `both` 會讓簽名動效永久壓過輸入動效——這是實作時最容易踩的一個洞。

**全站禁用**：淡入式滾動揭示、視差、數字滾動、跑馬燈、`stroke-dashoffset` 描繪、按壓硬陰影。刀是壓下去的，不是描出來的。

---

## 八、插畫與圖像風格（bridge-cut 刀橋剪影構成）

全站沒有一張外部圖片、沒有一張寫實描繪。所有圖像由三種原語構成：

1. **剪影**：閉合多邊形／圓／矩形，無內部細節、無描邊、無漸層。判準是「拿掉顏色只剩黑塊，仍讀得出這一格在講什麼」。
2. **刀橋**：由求解器插入的紙色線段，橫過島洞最窄的墨腰。判準是「每一個洞都看得見它的橋」。
3. **指示原語**：三角箭頭、格號方塊、實心圓點。用來把六格串成一句話。

母題的資料結構（可直接抄）：

```js
{ id:'tyre', n:'廢輪胎', cls:'因',
  ink :[{k:'c',x:50,y:52,r:31}],                                  // 墨版
  hole:[{k:'c',x:50,y:52,r:16}],                                  // 挖穿 → 產生一個島
  blue:[{k:'p',d:[[36,55],[64,55],[59,66],[41,66]]}],             // 藍版：只給水
  red :[{k:'p',d:[[6,44],[18,52],[6,60]]}] }                      // 朱版：指示箭頭
```

**明文禁用**：`feTurbulence`／`feDisplacementMap` 手抖邊（那是迷幻海報與噴漆模版的語彙，且會糊掉刀切的硬邊）、半調網點、細線幾何線描、`stroke-linecap:round`。

> 與「噴模鏤空 stencil-spray」的差別必須講清楚：那一路的橋是**畫上去的裝飾**，位置由設計者挑，還配噴霧毛邊；本技法的橋是**求解出來的結果**，位置由島的幾何決定，設計者與使用者都不能否決，而且邊必須是刀切的硬邊。

---

## 九、Logo 與 Favicon

Logo 就是一塊模版：卡紙方版、雙線框、上面刻穿一個帶洞的形狀，洞裡看得見一條刀橋。**不要**放字（模版上的字要刻，刻了就得配橋，小尺寸會糊）。

```svg
<svg viewBox="0 0 120 120">
  <rect width="120" height="120" fill="#E3DBBF"/>
  <polygon points="18,62 102,62 95,96 25,96" fill="#A62113"/>   <!-- 刻穿 -->
  <polygon points="31,68 89,68 84,90 36,90" fill="#E3DBBF"/>    <!-- 島 -->
  <line x1="60" y1="58" x2="60" y2="72" stroke="#E3DBBF" stroke-width="7"/> <!-- 刀橋 -->
  <rect x="3" y="3" width="114" height="114" fill="none" stroke="#16130E" stroke-width="5"/>
  <rect x="10.5" y="10.5" width="99" height="99" fill="none" stroke="#16130E" stroke-width="1.6"/>
</svg>
```

Favicon 用同一個構造縮到 32×32，**只保留一條刀橋**（兩條以下才看得見），寫成 inline SVG data URI 放進 `<head>`。

---

## 十、Do & Don't

**Do**

- 先決定「這六格要講的那一件事」，再決定圖。連環格是一個句子，不是六張圖的集合。
- 最後一格永遠是「要你做什麼」。
- 色數當成錢來花：每多一塊版，就多一次刻、一次刷、一次等乾。
- 讓使用者看得見版：提供一個「翻到卡紙那一面」的切換，他會自己驗證刀橋撐住了哪一塊紙。
- 資訊放表格，長文放紙上，專色塊上不放長文。

**Don't**

- 不要紫藍漸層、不要置中大標＋副標＋兩顆按鈕、不要三張圓角卡片、不要 emoji 當 icon、不要模糊陰影、不要 Lorem ipsum、不要「EST. 19xx」徽章、不要「把 X 變成 Y」的標題。
- 不要把這個流派做成「蘇聯風」的視覺哏（鐮刀、五角星、西里爾字母裝飾）。它的本體是**製作方式**，不是政治符號；用在任何題材上都成立。
- 不要手畫刀橋，不要讓使用者調刀橋位置。
- 不要在說明帶用不押韻的文案。
- 不要用白色，不要用第四塊專色，不要讓朱色當底。
- 不要在色版上挖洞（色版一律實心；洞與橋只發生在墨版）。

---

## 十一、頁面骨架範例

```html
<div class="liftoff" aria-hidden="true"></div>            <!-- 轉場：進頁時被抽走的版 -->
<svg class="sprite" aria-hidden="true"><defs>
  <filter id="wet"  color-interpolation-filters="sRGB"><feMorphology operator="erode"  radius="1.3"/></filter>
  <filter id="damp" color-interpolation-filters="sRGB"><feMorphology operator="erode"  radius="0.6"/></filter>
  <filter id="dry"  color-interpolation-filters="sRGB"><feMorphology operator="dilate" radius="0.25"/></filter>
  </defs>
  <symbol id="m-tyre" viewBox="0 0 100 100"><!-- 紙底→色版→墨版→洞→刀橋 --></symbol>
</svg>

<div class="wrap">
  <nav class="nav"><!-- 鏤空版導覽 --></nav>
  <main class="sheet">
    <div class="top"><b>行號</b><span class="sm">副名</span>
      <span class="no mono">窗第 1183 號｜第八十七期｜換窗 2026-09-01</span></div>

    <div class="winwrap">
      <div class="win">
        <article class="pn">
          <div class="pnh"><span class="nm">1</span><span class="tg c因">因</span>
            <span class="st">島 1・橋 1</span></div>
          <figure><svg class="pv cut" viewBox="0 0 100 100" style="--k:0"><use href="#m-tyre"/></svg></figure>
          <p class="cap"><span class="zh">中東轍</span>胎中一圈水，蚊照樣孵得成</p>
        </article>
        <!-- …共六格… -->
      </div>
    </div>

    <section class="blk">
      <p class="lead">區標</p><h2>標題</h2>
      <table class="tbl"><!-- 資訊 --></table>
    </section>
  </main>
</div>
<footer class="ft"><!-- 墨底三欄 --></footer>
```

---

## 十二、技術實作與相容性

### 1. CSS `subgrid`（承載特徵 1）

- **用途**：讓每一格的「格號帶／圖框／說明帶」三層各自對齊成一條貫穿全窗的線。Flex 與一般 Grid 做不到，因為說明帶的行數逐格不同。
- **支援現況（2026-09-01 查證 MDN《Subgrid》與 caniuse `mdn-css_properties_grid-template-rows_subgrid`）**：MDN 標示 Baseline，自 **2023 年 9 月**起跨瀏覽器可用（Chrome/Edge 117+、Firefox 71+、Safari 16+、Opera 103+、Samsung Internet 24+），全球覆蓋約 92%。
- **fallback**：`@supports not (grid-template-rows:subgrid)` 時 `.pn` 改 `display:flex;flex-direction:column`，說明帶給 `min-height:5.1em`。對齊由精確變近似，**資訊零損失**。

### 2. SVG `<feMorphology>`（承載特徵 2 與環境動效）

- **用途**：墨的乾濕。`erode` 讓暗部外擴＝墨肥（剛刷完），`dilate` 讓亮部外擴＝墨瘦（乾了）。
- **支援現況（2026-09-01 查證 MDN《\<feMorphology\>》）**：**Baseline Widely available，自 2015 年 7 月起跨瀏覽器**。
- **兩個實作陷阱**：
  1. 濾鏡預設在 `linearRGB` 色空間運算，會讓專色偏移。**必須**寫 `color-interpolation-filters="sRGB"`。
  2. `erode` 取每個通道的最小值（含 alpha）。若 SVG 背景透明，erode 會連 alpha 一起縮，整張圖被吃掉。**每一格必須有一張不透明的紙底 `<rect>`**，形態學才會作用在顏色上而不是在透明度上。
- **fallback**：不支援時濾鏡被忽略，畫面停在「乾」的狀態，版面與可讀性完全不變。

### 3. 連通性求解 + 最窄墨腰 BFS（承載特徵 3 與簽名動效）

- **用途**：找出每一塊會掉下來的紙，並決定刀橋下在哪裡。純 JavaScript，`Uint8Array` + 兩次泛洪 + 一次 BFS，**無任何瀏覽器 API 依賴，故無相容性問題**。
- **效能實測（Node 22，單執行緒，2026-09-01）**：
  - N=100 取樣格：每個母題 **1.0 ms**，十二個母題共 12 ms（建置階段烘成靜態 SVG）。
  - N=72 取樣格（頁面即時重解）：每個母題 **0.75 ms**；最壞情形（7×7 紗網、40 個島）**3.1 ms**，遠低於一幀 16.7 ms。
  - 滑桿以 `requestAnimationFrame` 節流，每次只重解一個母題，零 layout thrashing（只改 `innerHTML` 與一個自訂屬性）。
- **無 JavaScript 時**：所有母題在建置階段就求解完並以 `<symbol>` 內嵌在頁面裡，刀橋都在上面。四頁的全部資訊、二十四扇歷年窗、十三轍韻腳表都是靜態 HTML；只有「編窗」與「圖解滑桿」需要 JavaScript，並在 `<noscript>` 裡指路。

### 4. 兩個必須知道的實作細節

- **`<use>` 的 shadow DOM 吃不到外面的 class 規則。**`.pn:hover .br{stroke:...}` 對 `<use>` 複製出來的內容無效。唯一可靠的通道是**自訂屬性（可繼承）**：符號內部寫 `style="stroke:var(--brc,#D5CBA9)"`，外面改 `--brc`。同一個機制讓 `<use>` 與 JS 即時產生的 inline SVG 共用一套 hover 與動畫。
- **未註冊的自訂屬性可以被 keyframes 動畫，但只會離散切換（不補間）。**本風格正好要離散——刀是一下一下切的——所以用 `steps()` 搭配 `--bw`／`--brc` 的關鍵影格，不需要 `@property`。

### 5. 效能預算實測

| 頁 | 單檔大小（含 inline 全部 CSS/JS/SVG） |
|---|---|
| `index.html` | 37.9 KB |
| `chuangfang.html` | 62.1 KB |
| `chuangji.html` | 82.4 KB |
| `weituo.html` | 56.9 KB |

全部遠低於 350 KB 上限。首屏 JavaScript：`index.html` 為 0（純靜態），其餘三頁的首屏工作只有一次 `querySelector` 綁定與一次單母題求解（≤ 3.1 ms）。外部資源只有 Google Fonts 兩支字型；零外部圖片、零音檔、零函式庫。

---

*本規格書描述的是流派，不是本站。同一套規則可以拿去做選舉公報、消防宣導、球隊戰報、產品開箱、食譜連環圖——只要你的內容能被拆成有順序的六格，而且你願意替最後一格想一句叫人動手的話。*
