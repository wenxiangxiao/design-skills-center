---
name: guna-mola-reverse-applique
description: Guna mola reverse appliqué (Guna Yala, Panama; blouse panels formalised after the 1925 Guna Revolution) as a web style — every shape and headline is cut through 2–7 stacked cotton layers so it carries equal-width concentric echo bands, a red top cloth with a black first cut, empty ground filled with tas-tas slits, triangles and dots, wobbly hand-cut edges, and content laid out as paired front/back panels with zigzag borders; zero gradients, zero transparency, zero drop shadows.
---

# Guna 莫拉反向貼布 Mola・一層剪大、一層剪小

## 0. 血緣與定位

- **流派**：Mola（Dulegaya 語意為「衣服」），巴拿馬 Guna（舊稱 Kuna）族婦女上衣 dulemor 前後兩片的反向貼布布片。屬型錄「在地與文化視覺」，2026-10-11 新增條目，本站為全館第 1 站。
- **來源**：由身體彩繪的幾何紋樣轉到布上；據 Perrin《Magnificent Molas》與 UConn Benton 美術館的整理，反向貼布在十九世紀下半已盛行，布料來自以椰子交易的商船。1919 年起巴拿馬政府禁止 Guna 婦女穿 mola、戴鼻環，1925 年二月 Guna 起事（Guna／San Blas Revolution）後 mola 成為族群身分的記號，並與 Guna Yala 自治地位相連。二戰後出現大量專為外人製作的 mola。
- **製法**：兩到七層不同色的棉布疊縫，**最大的剪口剪在頂層，往下一層比一層小**，於是每個形狀外面多出一道又一道等寬的邊；剪開的布邊往內折，以同色線藏針縫下。也會在某一層裡補進一小塊別的顏色（嵌色）。成對販售：同一件上衣的前後片是同一主題的兩種變化。
- **評價準則**（Mari Lyn Salvador, *The Art of Being Kuna*, UCLA Fowler 1997）：層數、針腳細到看不見、剪口寬窄均勻、鋸齒邊與格紋等細節、配色，以及「填滿空間、重複中的細微變化、細微的不對稱」。
- **外部參照**：Smithsonian NMAI 藏 Narganá 島上衣片（edanmdm:NMAI_211938）；Cleveland Museum of Art〈Fashioning Identity: Mola Textiles of Panamá〉2020；UConn William Benton Museum〈Molas, Textile Designs of the Kuna Indians of Panama〉；Parker & Neal《Molas: Folk Art of the Cuna Indians》1977；Wikipedia〈Mola (art form)〉。
- **與鄰近條目的分界**：墨西哥 68（tang-sim）的回聲線是**黑白等距細線、光學振動**，本條目是**彩色布層、帶寬即剪口差、會互相融成通道**；Papel Picado 是單層鏤空透光、本條目是多層不透明疊布；Ndebele 彩繪屋是黑框平塗牆面、沒有同心回聲；拼布 Quilt 是正向拼接、本條目是往下剪開。
- **使用倫理**：本規格書教的是「反向貼布」這個視覺構造，**不教、不收錄任何 Guna 氏族或儀式圖樣**。拿去做網站時，母題請用你自己的在地物件；若涉及真 mola 的販售，標出做的人。

## 1. 設計哲學

1. **形狀不是畫的，是剪出來的。** 每個圖形的輪廓都等於「頂布剪口」，往內每一圈都是下一層布。所以邊永遠成套出現、寬度一致。
2. **底色是最上面那塊布，不是背景。** 朱紅頂布被剪得越多，作品越好；大片沒剪的頂布是偷懶。
3. **滿。** 空處一律剪縫、三角、小圓，留白是未完成。
4. **手的痕跡要留，但只留一點。** 邊微微抖、角稍鈍；不要做成「壞掉的向量」。
5. **成對。** 版面單位是一對布片，講同一件事、各有變化。

## 2. 本風格的 5 個不可省略特徵

### ① 同心等距回聲邊（形狀語彙）——拿掉就是一般貼紙

每個母題與標題外面有 2–4 道**等寬**色帶，帶寬＝下一層剪口縮小的量；相鄰形狀的回聲邊會融成通道。再外一到兩道「只剪頂布、露出墨黑」的細通道線。

```html
<!-- N 層：stack[0]=頂布（不進濾鏡），第 j 層膨脹半徑 =(N-1-j)×w -->
<filter id="mola" filterUnits="userSpaceOnUse" x="0" y="0" width="600" height="480" color-interpolation-filters="sRGB">
  <feTurbulence type="fractalNoise" baseFrequency=".02" numOctaves="1" seed="3" result="n"/>
  <feDisplacementMap in="SourceAlpha" in2="n" scale="5" xChannelSelector="R" yChannelSelector="G" result="a"/>
  <feMorphology in="a" operator="dilate" radius="24" result="d1"/>
  <feMorphology in="a" operator="dilate" radius="16" result="d2"/>
  <feMorphology in="a" operator="dilate" radius="8"  result="d3"/>
  <feFlood flood-color="#15110F"/><feComposite in2="d1" operator="in" result="c1"/>
  <feFlood flood-color="#E8761A"/><feComposite in2="d2" operator="in" result="c2"/>
  <feFlood flood-color="#15110F"/><feComposite in2="d3" operator="in" result="c3"/>
  <feFlood flood-color="#F2C418"/><feComposite in2="a"  operator="in" result="c4"/>
  <!-- 通道線：只剪頂布 --> 
  <feMorphology in="a" operator="dilate" radius="37.6" result="ro"/><feMorphology in="a" operator="dilate" radius="31.6" result="ri"/>
  <feComposite in="ro" in2="ri" operator="out" result="rr"/><feFlood flood-color="#15110F"/><feComposite in2="rr" operator="in" result="g1"/>
  <feMerge><feMergeNode in="g1"/><feMergeNode in="c1"/><feMergeNode in="c2"/><feMergeNode in="c3"/><feMergeNode in="c4"/></feMerge>
</filter>
<rect width="600" height="480" fill="#B81E22"/>
<g filter="url(#mola)"><path d="…魚…"/><text …>秀枝繡號</text></g>
```

### ② 朱紅頂布＋墨黑第一刀＋嵌色（色彩規則）

頂布朱紅佔畫面 35–50%；**頂布下的第一層幾乎都是墨黑**（讓其他顏色站得住）；其餘層取橘、薑黃、榕綠、海藍、桃紅；嵌色只出現在小剪縫裡。全站零漸層、零透明、零陰影；相鄰兩層對比比 <1.35 視為糊掉。

```css
:root{--red:#B81E22;--black:#15110F;--orange:#E8761A;--yellow:#F2C418;
      --green:#1E8C4E;--blue:#1F5FA8;--pink:#E35A8C;--maroon:#5E1219;--cloth:#EFE6D2}
body{background:var(--red) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='6' height='6'%3E%3Cpath d='M0 .5h6M.5 0v6' stroke='%23A51B1F'/%3E%3C/svg%3E")}
```

### ③ 剪出來的粗字（字體選擇）

標題不是排版字，是剪口：Noto Sans TC 900／Rubik 800，字距 +0.06–0.12em，**一律經同一濾鏡**長出回聲邊，字與字的邊會黏成一塊。內文只放在縫上去的胚布標籤（`--cloth`）上，墨黑 500。

```html
<h2 class="cut"><span class="vh">櫃台的三件事</span>
 <svg viewBox="0 0 640 134" aria-hidden="true" font-family="'Noto Sans TC',sans-serif" font-weight="900">
  <defs><!-- 同 ① 的濾鏡，3 層 red/black/yellow、1 道通道 --></defs>
  <g filter="url(#h)"><text x="320" y="94" font-size="84" text-anchor="middle" letter-spacing="4">櫃台的三件事</text></g></svg></h2>
```

### ④ 成對布片＋鋸齒邊框（版面手法）

版面單位是 5:4 的橫向布片，兩片一組並排（≤760px 上下疊）；每片內緣一圈 dientes 鋸齒三角。長文不進布片，縫成旁邊的標籤：

```css
.pair{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.lbl{background:var(--cloth);padding:24px 26px;outline:2px dashed var(--black);outline-offset:-9px} /* 縫線 */
@media (max-width:760px){.pair{grid-template-columns:1fr}}
```
```js
// 鋸齒邊：沿內緣 14 單位，每 12 單位一個指向內側的三角
for(x=14;x+12<=W-14;x+=12) d+=`M${x} 14l12 0l-6 9.6Z M${x} ${H-14}l12 0l-6 -9.6Z`;
```

### ⑤ tas-tas 剪縫填滿（裝飾母題）

空地切成 28–34 單位的格，避開母題外擴範圍；每格 72% 放三條平行短縫（棋盤交錯直／橫）、16% 一個三角、12% 一個小圓。剪縫自帶 2.6 單位的墨黑邊，裡面露兩種嵌色之一。同一 seed 同一結果。

```js
var R=xs(seed); // xorshift32
for(y=m;y+c<=H-m;y+=c)for(x=m;x+c<=W-m;x+=c){ if(hit(x,y,c,c,occ))continue;
  var q=R(),v=(Math.round(x/c)+Math.round(y/c))%2===0,L=c*.7,th=4,gap=(c-3*th)/4;
  if(q<.72) for(k=0;k<3;k++){ off=gap*(k+1)+th*k; d+= v?rect(x+off,y+(c-L)/2,th,L):rect(x+(c-L)/2,y+off,L,th) }
  else if(q<.88) d+=tri(x+c/2,y+c/2); else d+=ring(x+c/2,y+c/2,4.5) }
```

## 3. 色彩系統

| 色 | hex | 用途 | 比例 |
|---|---|---|---|
| 朱紅 頂布 | #B81E22 | 頁面底、每片布的頂層 | 35–50% |
| 墨黑 | #15110F | 第一刀、通道線、文字、導覽底 | 15–20% |
| 橘 | #E8761A | 第二、三層 | 8–12% |
| 薑黃 | #F2C418 | 最底層（圖形正中）、現用態 | 8–12% |
| 榕綠 / 海藍 / 桃紅 | #1E8C4E / #1F5FA8 / #E35A8C | 中間層與嵌色 | 各 ≤6% |
| 豬肝 | #5E1219 | 替代頂布 | 選用 |
| 胚布 | #EFE6D2 | 縫上的閱讀標籤（不是 mola 的一層） | 15–25% |

規則：同一片布 ≤5 層；第二層優先墨黑；相鄰層不得同色；零漸層（布紋除外）、零 opacity、零 box-shadow。

## 4. 字體系統

- Google Fonts：`Noto Sans TC` 500／900、`Rubik` 500／800。
- 剪字：48–150 user units（隨 viewBox 縮放），900，letter-spacing 0.06–0.12em。
- 內文 16px／1.75；標籤小標 Rubik 800 12px、letter-spacing .12em、大寫。
- 數字（價格）Rubik 800 靠右。

## 5. 版面與網格

- 桌機：左側 104px 墨黑導覽軌＋主欄（max 1360px，左右 clamp(16px,3.2vw,46px)）。
- 開場：一對 600×480 布片並排；下面一條三格的標籤列。
- 內容段：布片（5fr）＋標籤（6fr）一列，左右交替。
- 讀圖段：760×520 大布片（7fr）＋圖例標籤（4fr）。
- 無旋轉；布片之間 16px，段落之間 44–60px。
- 布片內所有母題距邊 ≥（N−2）×w＋通道寬＋14，否則回聲邊會被布邊截斷——建置時自動檢查。

## 6. 元件配方

- **導覽 sewn-patch**：每頁一片 64px 小 mola。現用頁是剪完的五層（含鋸齒邊）＋薑黃頁名＋底線；其他頁只剪了一刀（兩層：朱紅／墨黑）。hover／focus 外圈出現薑黃縫線 outline。≤760px 變底部橫列。
- **按鈕**：墨黑底、薑黃字、內縮 6px 的薑黃虛線（縫線）；次要按鈕橘底墨字。
- **標籤卡**：胚布＋內縮 9px 的 2px 墨黑虛線；無圓角、無陰影。
- **表格**：2px 虛線列分隔；價格欄 Rubik 800 靠右。
- **疊布選擇器**：8 格色塊按鈕（點一下加一層），下方是由上而下的層序清單，可 ↑↓× 重排；2–5 層限制。
- **footer**：一張三欄胚布標籤（地址營業／關於 mola／本站）。

## 7. 動效規則（四種全有，皆有 reduced-motion 降級）

| 類型 | 做法 | 參數 | reduced-motion |
|---|---|---|---|
| ambient 環境 | 首片布上一根針帶著薑黃線，沿布邊縫一圈：疊在布上的獨立透明 SVG 內 SMIL `<animateMotion rotate="auto">` | 44s／圈，linear，無限 | `svg.pauseAnimations()`＋`setCurrentTime(0)`，針停在左上角 |
| input 輸入 | **掀一角**：游標（或 Tab 後方向鍵）位置挖一個圓洞，露出「頂布被拿掉」的下層版本 | 半徑 clamp(58,寬×.15,110)px，pointermove 即時，零緩動 | 仍可用（無補間，非動畫） |
| transition 轉場 | 換頁時一塊朱紅布從左以鋸齒剪線推過畫面，新頁從同一條剪線退開：WAAPI 動畫 `clip-path: polygon()` | 離開 460ms／抵達 520ms，`steps(8–9)` 一刀一刀 | 不攔截連結，直接換頁 |
| signature 簽名 | **逐層剪開**：SMIL 依序動畫每個 `feMorphology radius`（0→r 五個離散步）與 `feFlood flood-opacity`，先剪頂布、再一層一層往下 | 每層 0.5s，discrete | 不觸發，直接顯示完成態 |

本站自我限制：不用淡入、不用模糊、不用 ease-in-out 平滑（剪刀是一刀一刀的）。

## 8. 插畫與圖像風格：reverse-applique-echo 反向貼布回聲帶

- 母題只畫**實心剪影**（魚、鷺鷥、鳳凰花、剪刀、針、船、制服），細節用 evenodd 挖洞（眼睛、口袋），交給濾鏡長邊。
- 側面、平面、正對；零透視、零光影。
- 母題之間的回聲邊允許融合成通道——這正是 mola 的樣子。
- 空處以 ⑤ 的產生器填滿；布片內緣永遠有鋸齒邊。

## 9. Logo 與 Favicon

- Logo（assets/logo.svg）：240×240 五層 mola，一條虱目魚＋一道通道＋鋸齒邊＋剪縫，同一濾鏡鏈。
- Favicon：16px 下濾鏡不划算，改用**三層疊描邊**近似（墨黑 56／橘 30／薑黃填色＋9 墨黑邊），inline SVG data URI。

## 10. Do & Don't

**Do**：先決定層序再畫圖／第二層用墨黑／回聲邊等寬／空處剪滿／成對布片／長文縫在標籤上／標出真 mola 的製作者。

**Don't**：
- 不要用漸層、陰影、半透明假裝「層」——層是真的顏色區域。
- 不要只描一圈 stroke 就叫 mola（只有一道邊＝貼紙）。
- 不要大片留白的朱紅地。
- 不要抄 Guna 的氏族、儀式或特定作者的圖樣；不要用「部落風」之類泛稱。
- 去AI化通則：無紫藍漸層、無置中三卡片、無 emoji icon、無 Lorem ipsum、無 EST. 徽章。

## 11. 頁面骨架範例

```html
<nav class="rail" aria-label="主選單">
  <a class="p" href="index.html" aria-current="page"><svg class="mola" viewBox="0 0 160 160">…五層小布片…</svg><b>首頁</b>HOME</a>
  <a class="p" href="cut.html"><svg class="mola" viewBox="0 0 160 160">…兩層小布片…</svg><b>剪一塊</b>CUT</a>
</nav>
<main>
  <div class="pair">
    <figure class="peek" tabindex="0" aria-label="掀一角">
      <div class="under" aria-hidden="true"><svg>…stack.slice(1)…</svg></div>
      <div class="over"><svg role="img" aria-label="…">…完整布片…</svg></div>
      <div class="lens" aria-hidden="true"></div>
    </figure>
    <figure><svg>…同主題的第二片…</svg></figure>
  </div>
  <div class="lbl"><small>今天的櫃台</small><p id="today">…</p></div>
</main>
<div id="cutov" aria-hidden="true"></div>
```
```css
.peek .over{mask:radial-gradient(circle var(--pr,0px) at var(--px) var(--py),transparent 98%,#000 100%)}
.peek .lens{position:absolute;left:var(--px);top:var(--py);width:calc(var(--pr)*2);height:calc(var(--pr)*2);
  transform:translate(-50%,-50%);border-radius:50%;outline:3px dashed var(--cloth)}
```

## 12. 技術實作與相容性

### 12.1 SVG 濾鏡鏈反向貼布引擎（A 渲染層）

- **API**：`feTurbulence`、`feDisplacementMap`、`feMorphology`（dilate）、`feFlood`、`feComposite`（in／out）、`feMerge`。MDN〈feMorphology〉標示 **Baseline Widely available，自 2015-07 起跨瀏覽器可用**（查證：developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/feMorphology，2026-10-11）。
- **為什麼套在 SVG 上而不是 HTML**：caniuse〈SVG effects for HTML〉把 Chrome／Safari 的 `filter:url()` 套 HTML 元素列為 partial（「缺少 filter 支援或效果有誤」），Firefox 才是完整支援（查證：caniuse.com/svg-html）。所以本站所有剪字都是 SVG `<text>`，真正的標題放在 `.vh` 隱藏文字或 `aria-label`。
- **注意**：feMorphology 是矩形核，弧形外圈會略方——剛好像手剪；`filterUnits="userSpaceOnUse"` 並把區域設為整片布，避免預設 10% 外擴裁切；`color-interpolation-filters="sRGB"` 讓 flood 色值與色票一致。
- **fallback**：濾鏡不支援時，`<g filter>` 內的路徑以預設黑色填色顯示——仍是「朱紅地上的黑色剪影」，資訊不損失。

### 12.2 SMIL `<animate>` 動畫濾鏡原語（B 動效與時間軸層）

- **API**：`<animate attributeName="radius">`（在 `feMorphology` 內）、`<set attributeName="flood-opacity">`、`<animateMotion rotate="auto">`、`SVGAnimationElement.beginElement()`、`SVGSVGElement.pauseAnimations()`。MDN 將 `beginElement()` 與 `SVGAnimationElement` 標為 **Baseline Widely available（自 2020-01）**（查證：developer.mozilla.org/en-US/docs/Web/API/SVGAnimationElement/beginElement）。
- **時間鏈**：觸發元素 `begin="indefinite"`，其他層用 syncbase `begin="xxGo.begin+0.5s"`。**syncbase 的 id 不可含 `-` 或 `.`**（SMIL 語法會把 `-` 讀成負偏移），本站以 `id.replace(/[^a-zA-Z0-9]/g,'')+'Go'` 產生。
- **base 值＝完成態**：未觸發時就是剪好的布，所以 noscript、reduced-motion、SMIL 不支援時都直接看到完成品。
- **效能**：每次 radius 改變都會重算該片濾鏡，故只在單片 600×400–480 的布上動、每層 5 個離散步，不做連續補間。

### 12.3 決定性 tas-tas 產生器＋URL 狀態序列化（E 資料與生成層）

- FNV-1a 雜湊（名字＋層序）→ xorshift32 → 格子填空；同一個連結剪出來的縫一模一樣。
- 〈剪一塊〉狀態寫進 `?n=名字&m=圖案&s=red.black.orange.yellow`，以 `URLSearchParams` 讀、`history.replaceState` 寫（兩者皆為長期 Baseline）。
- 相鄰層對比用 WCAG 相對亮度公式，<1.35 時阿姨會叫你換。

### 12.4 效能實測

- 檔案：index 128 KB、colon 71 KB、price 54 KB、cut 51 KB（皆含 inline CSS／JS／SVG，<350 KB）；logo.svg 5.4 KB。
- `panel()` 產生一片 600×400 五層布的 SVG 字串：Node 實測平均 **0.21 ms**（100 次）；首屏 JS 除了一次 `beginElement()` 之外不做版面計算，遠低於 100 ms 預算。
- 濾鏡渲染以 resvg 驗證輸出正確（feMorphology＋feDisplacementMap 鏈）；建置環境沒有可用的瀏覽器，**60fps 未在真實瀏覽器量測**。設計上持續動畫只有針——它放在**另一張疊在布上的透明 SVG** 裡，所以位移不會讓底下的濾鏡重算——與掀一角（只改 CSS mask 位置；`.over`／`.under` 加 `will-change:transform` 自成圖層，濾鏡結果只算一次）；逐層剪開是一次性、離散 5 步。
