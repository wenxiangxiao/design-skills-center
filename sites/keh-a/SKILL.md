---
name: highland-tartan-sett
description: Scottish Highland tartan as a web visual language — every coloured surface is real 2/2 twill woven from a symmetric threadcount (sett), warp and weft identical, thin bright overchecks on dark grounds, set like a 19th-century tartan pattern book with Scotch-Roman capitals, pinked swatch plates, selvedges and fringes.
---

# 蘇格蘭格紋 Highland Tartan（Sett & 2/2 Twill）

> 型錄「繪畫與材質」2026-10-28 新增條目，全館第 1 站（示範站：格仔西服 Keh-á Tailors）。
> 本規格書不綁產業：裁縫、威士忌酒吧、毛毯、學校制服、書店都能用；綁住的是「格是織出來的」這件事。

## 一、設計哲學

格紋不是格子圖樣，是**一份譜**。蘇格蘭高地的 tartan 以精紡羊毛二上二下斜紋（2/2 twill）織成：經線照譜排好上機，緯線照同一份譜一梭一梭打進去，所以直條與橫條一模一樣寬；兩色相交處不是新顏色，而是一半一半的細斜線，遠看才混成第三色。譜以 threadcount 記錄（例：`R/48 K4 R6 K24 N24 K4 W/4`），通常只寫半譜，前後兩個帶斜線的是回紋軸心（pivot）——織到那裡就掉頭照原路倒著織回去。

歷史脈絡（寫進文案時可引用）：
- 1746 年 Dress Act 禁止高地服飾約兩代人之久；同時期 Bannockburn 的 William Wilson & Son 仍為軍隊與上層大量織造，其 1819 年 Key Pattern Book 記錄兩百多款格的織造說明（Wilson 家 1788 年的樣本冊已有同格不同色的變化）。
- 1842 年《Vestiarium Scoticum》把許多「氏族格」寫成定本（今日學界視為大半出於杜撰），十九世紀高地復興把格紋推向全世界。
- 十九世紀中化學染料取代植物染，於是有了今天的四種色調 colourway：Modern（飽和最深）、Ancient／Old colours（二十世紀上半發明、較淺）、Weathered（1940 年代末、最淺）、Muted（1970 年代初、介於其間）。它們只改彩度，不是不同的格。
- 2008 年 Scottish Register of Tartans Act 後由蘇格蘭國家檔案館維護官方登記處；登記要求寫明譜是全譜或半譜、軸心是全數或半數，且必須和既有的格「足夠不同」。

網頁轉譯的核心決定：**全站每一塊有顏色的面，都必須由 threadcount 經由斜紋織出來**——禁止用平塗方塊拼「格子」。不織，就只是 gingham 或棋盤。

## 二、本風格的 5 個不可省略特徵

### 特徵 1：只有正交條帶——經緯同譜、對稱回紋（形狀語彙）

- 格由一份半譜決定；全譜 = 半譜 ＋ 半譜去頭去尾反轉，兩個軸心各出現一次。
- 經（直）與緯（橫）用**同一份**譜，所以布轉 90° 還是同一塊。
- 條寬一律是偶數線數；全譜總線數取 4 的倍數（斜紋一循環 4 線，布才能無縫走動）。
- 零曲線、零斜角幾何；畫面上唯一的斜，是斜紋本身。

```js
// 半譜 → 全譜 → 兩向 repeating-linear-gradient（顏色用變數，換色調只改變數）
const half=[['R',48],['K',4],['R',6],['K',24],['N',24],['K',4],['W',4]];
const full=half.concat(half.slice(1,-1).reverse());          // 176 線
function grad(deg){let x=0;return `repeating-linear-gradient(${deg}deg,`+full.map(([c,n])=>{
  const s=`var(--${c}) calc(var(--t)*${x}) calc(var(--t)*${x+n})`;x+=n;return s;}).join(',')+')';}
// .s-iam{--wp:grad(90);--wf:grad(180)}  ← 建置期寫進 CSS，無 JS 也有布
```

### 特徵 2：2/2 斜紋交織、異色相交＝細斜線混色（色彩規則／質材）

- 經線是底（`--wp` 直條），緯線是同譜橫條（`--wf`），但只在斜紋組織「緯浮」的格子露出來。
- 遮罩是 4×4 線的二上二下斜紋組織點，與線寬 `--t` 一起縮放，所以任何尺度都是真的階梯斜紋。
- 同色相交 = 純色；異色相交 = 一半一半的細斜線。**禁止**把交叉區塗成第三個平塗色、禁止 opacity 疊色、禁止漸層、陰影、發光。

```css
:root{--tw:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' shape-rendering='crispEdges'%3E%3Cpath d='M0 0h2v1H0zM3 1h1v1H3zM0 1h1v1H0zM2 2h2v1H2zM1 3h2v1H1z'/%3E%3C/svg%3E")}
.cl{--t:1.5px;position:relative;background:var(--wp);overflow:hidden}
.cl>.wf{position:absolute;inset:0;background:var(--wf);
  -webkit-mask:var(--tw) 0 0/calc(var(--t)*4) calc(var(--t)*4) repeat;
          mask:var(--tw) 0 0/calc(var(--t)*4) calc(var(--t)*4) repeat}
```
```html
<div class="cl s-iam" data-s="iam"><i class="wf"></i></div>
```

### 特徵 3：有限染料色票＋深地＋細亮線 overcheck（色彩規則）

- 一款格 ≤6 色，取自 STA 字母色：K 黑、N 海軍藍、G 綠、R 紅、Y 黃、W 白、Az 天藍。
- 暗地（K／N／G／深 R）佔大面積；**細亮線**（W／Y／Az／R，2–6 線）只出現在軸心或暗地中央，是整塊布最先被看見的東西。拿掉它，布就暗成一片（示範站首頁特徵 IV 可切換對照）。
- 色調切換只改七個色變數；以 `@property` 註冊為 `<color>`，用 `steps(6)` 轉場，像布浸進染缸一格一格變色。

```css
@property --R{syntax:'<color>';inherits:true;initial-value:#A8232E} /* K N G Y W Az 同法 */
:root{--K:#1B1A1F;--N:#1F2C4C;--G:#24483A;--R:#A8232E;--Y:#E3B23C;--W:#ECE6D6;--Az:#6A9CC8}
html{transition:--R .9s steps(6,end),--N .9s steps(6,end) /* …七色 */}
```

### 特徵 4：譜冊板式版面＋Scotch Roman 大寫（字體選擇＋版面手法）

- 版面是十九世紀格紋樣本冊的一頁：奶油紙地上一塊塊**編號板**（PLATE N° I），板下有細線、格名（中文粗黑宋＋拉丁斜體）、半譜 threadcount、色名圖例。
- 拉丁字用 Scotch Roman 系的 **Old Standard TT**（Google Fonts），全大寫 `letter-spacing:.16em`；中文用 **Noto Serif TC** 900 作大標、400 作內文。threadcount 也用同一支襯線排——**零等寬字**（等寬字會把它變成程式碼／儀表，那是別的流派）。
- 雙線 `3px double` 作書名頁與表頭分隔；不用圓角、不用卡片陰影。

```css
.sc{font-family:"Old Standard TT",serif;text-transform:uppercase;letter-spacing:.16em;font-size:.74em}
.cap{display:flex;justify-content:space-between;border-top:1px solid #1B1A1F;margin-top:10px;padding-top:6px}
.tc{font:400 15px/1.6 "Old Standard TT",serif;letter-spacing:.06em;word-spacing:.18em}
.tc .pv{text-decoration:underline;text-underline-offset:4px}   /* 軸心：R/48、W/4 */
.mast{border-bottom:3px double #1B1A1F}
```

### 特徵 5：布的邊界——鋸齒剪邊、織字布邊、流蘇（裝飾母題）

- 格紋永遠以「一塊布」出現：樣本以**鋸齒剪 pinking shears** 剪下（四邊鋸齒）、布疋有**織了字的布邊 selvedge**、裁端有**流蘇 fringe**（只剩經線）。不做無邊界的整頁壁紙。
- 鋸齒剪邊以兩層遮罩：外層上下、內層左右，交集成四邊鋸齒。

```css
.pk{--z:5px;mask:conic-gradient(from -45deg at bottom,#0000,#000 1deg 89deg,#0000 90deg) bottom/calc(2*var(--z)) 51% repeat-x,
                 conic-gradient(from 135deg at top,#0000,#000 1deg 89deg,#0000 90deg) top/calc(2*var(--z)) 51% repeat-x}
.pk>.cl{mask:conic-gradient(from -135deg at right,#0000,#000 1deg 89deg,#0000 90deg) right/51% calc(2*var(--z)) repeat-y,
             conic-gradient(from 45deg at left,#0000,#000 1deg 89deg,#0000 90deg) left/51% calc(2*var(--z)) repeat-y}
.sv{background:var(--N);color:var(--W);font:9.5px/14px "Old Standard TT",serif;letter-spacing:.32em;text-transform:uppercase;white-space:nowrap;overflow:hidden}
.fringe{height:26px;background:var(--wp);mask:repeating-linear-gradient(90deg,#000 0 5px,#0000 5px 8px)}
```

## 三、色彩系統

| 角色 | hex | 用途 | 約佔 |
|---|---|---|---|
| 譜冊紙 | `#EFE7D4` | 頁面地色（唯一的非布大面積） | 45% |
| 紙二 | `#E4D8BC` | 裁布台檯面 | 3% |
| 粉片白 | `#F7F2E6` | 按鈕、標籤、裁單 | 5% |
| 墨 | `#1B1A1F` | 正文、細線、雙線、也是 K 線色 | 10% |
| 布 | K N G R Y W Az 七色 | 只出現在「織出來的布」裡 | 35–40% |
| 針頭紅 | `#A8232E` | 圖釘、錯誤、紅粗線（版型的下襬與後中） | 2% |

四色調數值（Modern／Ancient／Muted／Weathered）見 `data.js`；它們只改彩度與明度，不改格。

## 四、字體系統

- Google Fonts：`Noto Serif TC:wght@400;700;900`、`Old Standard TT:ital,wght@0,400;0,700;1,400`。
- 字級：H1 中文 `clamp(56px,10vw,148px)`／900／行高 .92；H2 `clamp(26px,3.4vw,40px)`；內文 16.5px／1.8；拉丁小標 `.74em` 大寫 `.16em`；threadcount 15–17px。
- 羅馬拼音（台語白話字、蘇格蘭蓋爾語名）一律 Old Standard **斜體**。

## 五、版面與網格

- 最大寬 1280px、左右留白 `clamp(16px,3.4vw,44px)`。
- 首頁首屏 1.42fr（布）: 1fr（書名頁）；格譜頁每款一列 1.1fr : 1fr，奇偶左右對調。
- 布塊比例：樣本板正方形；頂尖區塊（主布）高 `clamp(320px,52vh,540px)`。
- 所有分隔都是水平細線或雙線；**不旋轉**版面（只有吊牌導覽在 hover 時以 steps(3) 擺 −4°）。

## 六、元件配方

- **布** `.cl.s-<sett>>i.wf`：見特徵 2。`--t` 是一根線的寬度：導覽 .5px、樣本 1–1.5px、特寫 3px、數紗鏡 10px。
- **吊牌導覽**：圖釘＋鋸齒樣本＋標籤（中文粗＋拉丁小大寫）。非現用頁只有經線（`.bare>.wf{clip-path:inset(0 0 100% 0)}`），hover 時緯線以 `steps(8)` 一格一格落下；現用頁是織好的布、標籤反白。
- **按鈕**：1.5px 墨框、粉片白底、零圓角零陰影，hover 反墨。
- **板**：`.pk>.cl` ＋ `.cap`（PLATE N° 與線數）＋ `.tc` 半譜。
- **表單**：1.5px 墨框、紙底、零圓角、最小高 42px。
- **頁尾**：一條海軍藍織字布邊橫貫全寬（靜態，不是跑馬燈）＋三欄。

## 七、動效規則

| 種類 | 本站實作 | 觸發 | 時間／緩動 | reduced-motion |
|---|---|---|---|---|
| signature 上梭 pick-by-pick | 經線先在（直條）；緯線層以 WAAPI `clip-path` 由上而下、`steps(n)` 每步四線；筘（reed）與梭子同步；上方半譜字譜亮起正在織的那一段，並報「第幾梭線／此段 R48 紅」 | 首頁載入、「再織一次」「換下一款」；格譜頁每塊板首次進入視窗 | n = 布高÷線寬÷4；每步 46ms（上限 6.4s）／`steps(n,end)` | 直接織好，字譜與線數文字完整顯示 |
| ambient 布在走 | 織好後緯線層的 background-position 與 mask-position 同步下移一整個循環（S×t），無縫循環 | 自動 | 60s linear infinite | 停止 |
| input 數紗鏡 pick glass | 游標下方 144px 方鏡，十倍放大真實斜紋，讀出「經 R48 紅　緯 K24 黑」 | pointermove（滑鼠）、延遲 <1 幀 | 無緩動，直接跟隨 | 照常（使用者自己在動） |
| input 吊牌織上 | 見元件配方 | hover／focus | .28s steps(8) | 無轉場直接切換 |
| input 拖版型 | 裁布台 Pointer Events 拖曳＋放手吸附 | pointer／方向鍵 | 吸附瞬間；示範排法 .6s steps(10) | 無轉場 |
| transition 剪刀換頁 | 一塊格布以鋸齒前緣分九剪蓋過畫面，下一頁九剪剪開 | 站內連結 | 430／520ms steps(9) | 直接換頁 |
| transition 落染缸 | 色調切換時七個 `@property` 色變數 steps(6) | 色調按鈕 | .9s steps(6) | 無轉場 |
| transition 打褶 | 依格／依線切換時每一褶的 background-position steps(6) | 按鈕 | .6s steps(6) | 無轉場 |

**本站自我限制**：全站沒有一條 ease 曲線——織布、剪布、染布都是離散的動作，連續補間在這個流派裡是錯的。（總動效數仍 ≥4。）

### motion-library 元件表（motion-library 1.20.0 @e45c261f，`tools/ml-embed.js` 每頁子集 inline 為第一個 `<script>`；出處 `MotionLib.prompt(id)`）

| ID | 名稱 | 頁 | 種類 | 參數 | 承載什麼／為什麼適合 |
|---|---|---|---|---|---|
| BG-B-37 | Minimal Stripes | index 整經帶 | ambient | colors `#A8232E／#1F2C4C／#1B1A1F`、duration 9、density 2.4、intensity .8、seed 1961、16:9 裁成條帶 | 紅與海軍藍的直條在墨地上滑動，像整經時一束束經線被排上機；只有平塗矩形，零圓角零漸層，與特徵 1 一致 |
| SHP-13 | Fold Unfold | index 打褶 | ambient | `#24483A／#A8232E／#EFE7D4`、3.2s、seed 8、1:1 | 四片板一摺一展，對應「依格／依線打褶」；多邊形平塗，無陰影 |
| BG-B-16 | Weave Grid | setts 頁首 | ambient | `#1F2C4C／#24483A／#1B1A1F`、8s、density 1.2、seed 42、1:1 | **平紋**（一上一下）對照組：放在格譜旁邊，說明格紋不是這樣織的——它用二上二下斜紋 |
| BG-A-21 | Graph Paper | cut 頁首 | ambient | `#1F2C4C／#A8232E／#EFE7D4`、12s、density 1、intensity .9、seed 7、16:9 | 打版紙與一條紅色曲線板描線——裁布台上的版型就是畫在這種紙上 |
| BG-A-01 | Grid Fill | visit 營業時間 | ambient | `#A8232E／#E3B23C／#1F2C4C`、6s、seed 1990、1:1 | 方格依對角波逐格填色，像一格一格排滿的預約表；正交方格，與特徵 1 相容 |

不選 TXT 類：元件庫文字元件的字族寫死為 Unbounded／Noto Sans TC，會破壞特徵 4 的 Scotch Roman。掛載紀律：等 `document.fonts.ready`、離屏 `destroy()`、canvas `aria-hidden`、`.ml-fb` 原 HTML 標題保留、reduced-motion `seek(.35)` 停格；同一畫面同時運轉 ≤2 個。

## 八、插畫與圖像風格

技法 `sett-mask-weave 譜即布`：全站零圖檔。所有圖像都是依 threadcount 即時織成的布（CSS gradient＋斜紋遮罩），加上 1.2–1.6px 墨線的工具小圖示（剪刀、箭頭、循環）與裁布台的版型輪廓（虛線縫份、紅粗線下襬／後中、紅虛線前中、雙箭頭布紋線）。不畫人、不畫立體、不畫陰影。

## 九、Logo 與 Favicon

- Logo：一方以 SVG `<pattern>`＋`<mask>` 織成的鹽埕格（真的二上二下斜紋）以鋸齒路徑裁切，右側「格仔西服」Noto Serif TC 900＋「KEH-Á TAILORS · 1961」Old Standard 大寫。檔案 `assets/logo.svg`。
- Favicon：32×32 inline SVG data URI：紅地、黑與海軍藍十字條、白細線——在 16px 下仍讀得出是格。

## 十、Do & Don't

**Do**：每塊色面都由譜織出；寫出半譜與軸心；暗地＋細亮線；鋸齒剪邊與布邊；Scotch Roman 大寫；奶油紙譜冊頁；離散的動作（steps）。

**Don't**：
- 平塗方塊拼格子（那是 gingham／棋盤）；交叉區塗第三色或用 opacity 疊色。
- 漸層、陰影、發光、圓角卡片、紫藍漸層 hero、置中三卡片、emoji 圖示、Lorem ipsum、EST. 19xx 徽章。
- 等寬字排 threadcount；把格紋鋪成無邊界的全頁壁紙；斜放的格（除非明說是斜裁 bias）。
- 宣稱某格為「官方氏族格」或已登記——虛構的格要寫明虛構。

## 十一、頁面骨架範例

```html
<header class="wrap mast">
  <a class="brand" href="index.html"><svg>…鋸齒格標…</svg><span><b>格仔西服</b><small class="sc">Keh-á Tailors</small></span></a>
  <nav><ul class="nav">
    <li><a href="index.html" aria-current="page"><i class="pin"></i>
      <div class="pk"><div class="cl s-iam" data-s="iam"><i class="wf"></i></div></div>
      <span class="tag">首頁<i>Shop</i></span></a></li>
    <li><a href="setts.html"><i class="pin"></i>
      <div class="pk"><div class="cl s-kang bare" data-s="kang"><i class="wf"></i></div></div>
      <span class="tag">格譜<i>Setts</i></span></a></li>
  </ul></nav>
</header>
<figure class="plate">
  <div class="pk"><div class="cl s-iam" data-s="iam" style="aspect-ratio:1"><i class="wf"></i></div></div>
  <figcaption><div class="cap"><b>PLATE N° I　鹽埕 <span class="it">Iâm-tiânn</span></b><span class="sc">176 threads · symmetric</span></div>
  <p class="tc"><span class="pv">R/48</span> K4 R6 K24 N24 K4 <span class="pv">W/4</span></p></figcaption>
</figure>
<div class="sv">Keh-á · Pure New Wool · Woven 2/2 Twill</div>
```

## 十二、技術實作與相容性

| 技術 | 層 | 承載 | 支援現況（查證） | 不支援時 |
|---|---|---|---|---|
| CSS `mask-image`／`mask` 斜紋遮罩＋鋸齒遮罩 | A 渲染 | 特徵 1、2、5；全站每一塊布 | MDN 列為 Baseline「widely available」，自 2023-12 起各主流瀏覽器皆支援無前綴 `mask-image`；同時寫 `-webkit-mask`。來源：MDN `mask-image`（developer.mozilla.org/docs/Web/CSS/mask-image）、caniuse `mdn-css_properties_mask-image` | `@supports not` 時緯線層改 `opacity:.5` 疊在經線上——仍讀得出格與混色，只是沒有斜紋；鋸齒邊退化為直邊 |
| `steps()` 時間函數（CSS transition／WAAPI easing） | B 動效 | signature 上梭、吊牌織上、剪刀換頁、落染缸、打褶、示範排法 | 全面支援（CSS Easing Level 1）；WAAPI `element.animate` Baseline | 無 WAAPI 時布直接織好，換頁直接跳轉 |
| Pointer Events＋`setPointerCapture`（拖曳排料） | D 輸入 | func〈對一條格〉、數紗鏡 | Pointer Events Level 2 Baseline（caniuse `pointer`）；`touch-action:none` 防止捲動 | 方向鍵（一根線／Shift 一公分）與畫面微調鍵完全替代 |

輔助：`@property` 註冊色變數（Baseline 2024，Firefox 128 起；不支援時色調切換為瞬間）。

**效能實測**（headless Chromium，1366×900）：四頁 237–250KB（含 motion-library 子集約 198KB）；首頁 `domInteractive` 98ms、裁布台 82ms；示範排法窮舉 12–18ms；上梭只改一個 clip-path 屬性，每步一次重繪，60fps。布的繪製全由 GPU 合成的 gradient＋mask 完成，DOM 中每塊布只有兩個元素。

**對格的數學（可直接移植）**：布每公分 8 線，S＝一個循環（公分），a0＝第一軸心位置。
- 下襬對齊：`xF ≡ xL ≡ xR (mod S)`。
- 後中鏡像：`yL + yR + 34 ≡ 2·a0 (mod S)`（兩片寬 34 公分的後片，CB 分別在上緣與下緣）。
- 前中置軸：`yF + 32 ≡ a0 (mod S/2)`（前片寬 64，中線 32）。
容差 2 線（0.25 公分）；放手時若距離可行解 ≤1.6 公分就吸附。
