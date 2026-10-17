---
name: japanese-postwar-modernist-graphic
description: Japanese postwar modernist graphic design (Nichisenbi / Ikko Tanaka / Yusaku Kamekura school) — traditional subjects rebuilt from five perfect primitives on a zero-gutter modular grid, flat traditional Japanese colours on an unbleached ground, vertical Mincho against tiny wide-tracked geometric Latin, and one dominant red sun disc per screen.
---

# 日本戰後現代主義平面 Japanese Postwar Modernist Graphic（日宣美／田中一光・龜倉雄策一派）

> 這是一份風格規格書。讀完它，你應該能做出一個和 Demo（方圓菓子舖，和菓子店）不同產業、但一眼看得出是同一個流派的網站。
> **本流派為既有設計史流派，非自創。**
> 血緣：1951 年成立的日本宣傳美術會（日宣美，1970 年解散）把包浩斯與瑞士的構成語法帶進日本廣告界；1960 年龜倉雄策、原弘、山城隆一等人成立日本設計中心。代表作：
> - 龜倉雄策〈東京 1964 奧運〉第一號官方海報（1961 年發表）：白地上一枚巨大的紅色實心圓，下方金色五環與無襯線「TOKYO 1964」。
> - 田中一光〈Nihon Buyo〉（1981，為 UCLA Asian Performing Arts Institute 巡演，凸版印刷絹印＋照相凹版）：一位藝妓被簡化成網格上的幾個色塊與圓——Cooper Hewitt 的描述是「把有限的顏色與形狀排在網格結構上」。這張是 Masaru Katsumi 策劃、十二位設計師同題創作的系列之一。
> - 田中一光 1980 年起擔任無印良品首任藝術總監；永井一正、福田繁雄同代。
> 參考：Cooper Hewitt〈Do I Look Simple?〉(2015)；V&A 館藏 Nihon Buyo poster（Tanaka Ikko, 1981）；Walker Art Center 館藏 Poster for Tokyo Olympic Games（Kamekura, 1961）；AIGA Eye on Design〈Steven Heller on 5 Top Ikko Tanaka Designs〉。
> 與既有條目的分界：**包浩斯**是三原色＋方圓三角的形式實驗，題材抽象；本流派的形永遠在畫一個**傳統題材**（藝妓、鶴、菓子、能面），色票是和色而非三原色。**瑞士國際主義**的網格是看不見的排版骨架；本流派的網格是看得見的——模組彼此緊貼成圖。**孟菲斯**有 squiggle 與斑點圖樣、刻意俗豔；本流派零圖樣、零花紋、極度節制。**奧費主義**只有同心圓與直半徑；本流派五形並用。**Saul Bass**是剪刀鋸齒邊；本流派的邊全部是圓規與直尺的完美幾何。

---

## 一、設計哲學

「把傳統主題翻譯成現代主義的幾何」。戰後日本的設計師同時繼承兩個東西：江戶以來的家紋、型染、琳派的平面化本能，和 1950 年代從包浩斯、瑞士傳進來的網格與基本形。日宣美這一代的答案是：**題材留在日本，語法換成國際**——一張能劇海報不畫能面的細節，只留一個白圓（臉）、兩個黑方（眼）、一道紅半圓（口）。

為什麼長這樣（製作條件決定了外觀）：
- 當時大尺寸 B 全／B1 海報多以**絹印與平版**分色印刷，每多一色就多一塊版。平塗、少色、色與色直接相接，是最便宜也最乾淨的做法——所以零漸層、零陰影。
- 版下（mechanical）是用**圓規、直尺、三角板與溝引き**在描圖紙上畫的。手上能精確畫出的曲線只有圓弧——所以所有曲線都是正圓或圓的一部分，沒有自由曲線。
- 海報貼在車站與百貨的牆上，要在十公尺外辨識——所以一個大紅圓、大量留白。
- 日文直排與西文橫排並存：主標題用大號明朝直排，資訊行用小號幾何無襯線拉丁大寫、寬字距。

**本站的轉譯：**和菓子店本來就用木型壓形；店規定每個菓子只准用五種形畫成，每個月的菓子是一個 100×100 的模組，模組拼起來就是那個月的掛紙（菓子盒上的包裝紙）。

---

## 二、本風格的 5 個不可省略特徵

拿掉任何一項，它就不再是這個流派。

### 特徵 1：五種基本形，全部完美幾何（形狀語彙）

只准用：**圓、正方／矩形、四分之一圓、半圓、直角三角**。零自由曲線、零圓角矩形、零描邊、零手繪抖動。題材（花、葉、山、水、月、臉）一律用這五形之一翻譯：花＝一個圓；葉＝四分圓；山＝半圓；水／岸＝一刀斜切的直角三角。

```js
/* 五形產生器（100×100 單位），完整版見 Demo engine 區塊 */
function prim(p){const k=p[0],f=p[p.length-1];
 if(k==='s')return `<rect x="${p[1]}" y="${p[2]}" width="${p[3]}" height="${p[4]}" fill="${f}"/>`;
 if(k==='c')return `<circle cx="${p[1]}" cy="${p[2]}" r="${p[3]}" fill="${f}"/>`;
 if(k==='q'){/* 四分圓：o=0..3 圓心在 左上/右上/右下/左下 */const[x,y,r,o]=p.slice(1);
   const cx=[x,x+r,x+r,x][o],cy=[y,y,y+r,y+r][o],a=o*Math.PI/2;
   return `<path d="M${cx} ${cy}L${cx+r*Math.cos(a)} ${cy+r*Math.sin(a)}A${r} ${r} 0 0 1 ${cx+r*Math.cos(a+Math.PI/2)} ${cy+r*Math.sin(a+Math.PI/2)}Z" fill="${f}"/>`;}
 if(k==='t'){/* 直角三角：o=0..3 直角在 左上/右上/右下/左下 */const[x,y,s,o]=p.slice(1),P=[[x,y],[x+s,y],[x+s,y+s],[x,y+s]],q=[[0,1,3],[1,2,0],[2,3,1],[3,0,2]][o];
   return `<path d="M${P[q[0]]}L${P[q[1]]}L${P[q[2]]}Z" fill="${f}"/>`;}}
/* 例：紅葉＝四片四分圓圍成一圓，兩紅兩黃 */
[['s',0,0,100,100,'#EFEAE0'],['q',0,0,50,2,'#D93A26'],['q',50,0,50,3,'#EDB01F'],['q',50,50,50,0,'#D93A26'],['q',0,50,50,1,'#EDB01F']]
```

### 特徵 2：和色平塗，生成り地（色彩規則）

生成り（未漂白紙）#EFEAE0 為大面積地；紅、鬱金、若竹、藍、桃、墨六個和色**完全平塗、直接相接**。零漸層、零陰影、零透明疊色、零描邊、零發光。色塊之間沒有分隔線——邊界由兩個顏色本身形成。

```css
:root{--kinari:#EFEAE0;--sumi:#16140F;--beni:#D93A26;--ukon:#EDB01F;--take:#2E8B6A;--ai:#2C56A0;--momo:#E9A1AE;--shiro:#FBF8F2}
body{background:var(--kinari);color:var(--sumi)}
/* 禁止：box-shadow、linear-gradient、opacity<1 的色面、border:1px 分隔線 */
```

### 特徵 3：看得見的方眼，模組零間距（版面手法）

全頁對齊同一個模組 `--m`；圖像是 N×N 方眼裡的模組**緊貼**而成（gap:0），模組可佔 1×1、2×2、3×3、4×4。沒有卡片、沒有圓角、沒有 gutter。資訊區塊同樣用零間距色塊列排（一格生成り、一格白、一格墨）。

```css
:root{--m:clamp(46px,7.2vw,92px)}
.poster{display:grid;grid-template-columns:repeat(6,var(--m));grid-template-rows:repeat(6,var(--m));gap:0}
.poster .lead{grid-area:1/1/span 4/span 4}   /* 主角 4×4 */
.poster .pt{grid-area:auto/auto/span 2/span 2} /* 配角 2×2 或 1×1 */
```

### 特徵 4：大號明朝直排 × 極小的幾何無襯線拉丁（字體選擇）

主標題用粗明朝（Noto Serif TC 800）**直排**、字距 .14–.2em；資訊行用 Jost（Futura 系幾何體）10–11px 全大寫、字距 .18em。兩者尺寸反差至少 6 倍，中間字級少用。

```css
.title{writing-mode:vertical-rl;font:800 calc(var(--m)*.86)/1 "Noto Serif TC",serif;letter-spacing:.2em}
.lt{font:500 11px/1.6 "Jost",sans-serif;letter-spacing:.18em;text-transform:uppercase}
```

### 特徵 5：一枚日の丸紅圓＋大量留白（裝飾母題）

每一屏只有**一枚最大的紅色實心圓**作為構圖重心（直徑 3–4.4 模組），其他紅色只能比它小。生成り留白 ≥35%。紅圓可以承載一個字（「店」「封」「十月」），但不能有邊框、陰影或漸層。

```css
.hinomaru{background:#D93A26;border-radius:50%;aspect-ratio:1;width:calc(var(--m)*4.2);view-transition-name:hinomaru}
```

---

## 三、色彩系統

| Token | Hex | 用途 | 面積比 |
|---|---|---|---|
| 生成り kinari | `#EFEAE0` | 地色、留白 | 40–50% |
| 墨 sumi | `#16140F` | 正文、墨塊、導覽花瓣 | 12–15% |
| 紅 beni | `#D93A26` | 日の丸、現用態、主要 CTA hover | ≤12% |
| 鬱金 ukon | `#EDB01F` | 第二強調、價格塊、hover | 6–10% |
| 若竹 take | `#2E8B6A` | 葉、莖、資訊塊 | 4–8% |
| 藍 ai | `#2C56A0` | 水、夜、focus outline、連結 hover | 4–8% |
| 桃 momo | `#E9A1AE` | 花、春 | ≤5% |
| 白 shiro | `#FBF8F2` | 菓子的白、交錯列 | 5–8% |
| 桐 kiri | `#D8CDB8` / `#CFC2AA` | 只用於「物件」（桐箱）兩階 | ≤6% |

規則：任兩色可以直接相接；字只能是墨或白（正文對生成り 16.9:1）；紅不作大面積背景（除了日の丸本身）。

## 四、字體系統

- 明朝：**Noto Serif TC** 500／800（Google Fonts）。中文與假名同一字族，避免混字。
- 拉丁：**Jost** 400／500／600（Google Fonts，Futura 系）。
- motion-library 文字元件：**Noto Sans TC 800**，以 `&text=` 只載入用到的字（方・圓・角十二月令封九つ入）。
- Scale：資訊行 10–11px／正文 15–17px（行高 1.85）／小標 18–22px／區塊題 0.5m／直排主標 0.72–0.95m／日の丸內單字 1.9m。

## 五、版面與網格

- 模組 `--m = clamp(46px,7.2vw,92px)`；≤900px 改為 `(100vw − 32px)/6`，掛紙永遠是 6 欄。
- 掛紙＝6×6 方眼＋下方 6×2 文字帶（左 4 格文字、右 2 格色塊直排）。
- 版型四種（Demo 以 FNV-1a 雜湊挑選）：A 主角左上 4×4；B 主角右上 4×4；C 兩個 3×3 並排；D 主角置中 4×4、八個 1×1 散在邊緣、空格填色塊。
- 零旋轉、零斜軸：本流派是正交的（唯一的「動」是 90° 整數倍旋轉）。
- 左右非對稱：海報在左、直排標題與紅圓在右，留白集中在右上。

## 六、元件配方

- **導覽（四分圓花）**：右上 68×68 的 2×2，每格一片四分圓，四片合成一個整圓；現用頁那片轉 180°（開花）並變紅；hover 變鬱金。旁邊一列明朝小字頁名。≤560px 改為底部四格，現用頁紅底白字。
- **按鈕**：墨底生成り字的直角矩形，`padding:11px 14px`，hover 換藍；次要按鈕桐色。零圓角、零陰影。
- **CTA 列**：滿寬墨塊，左邊明朝大字、右邊 Jost 小字＋「→」，hover 整塊變紅。
- **資訊格**：6 欄零間距，每塊 2 欄，背景依序 白／鬱金／生成り／墨／桐／若竹。
- **表單**：生成り底，下框 2px 墨，零圓角。
- **頁尾**：三塊零間距色帶（墨／生成り／鬱金）＋一行 Jost 建置註記。

## 七、動效規則（四種，缺一不可）

| 類型 | 本站自製實作 | 觸發 | duration／easing | reduced-motion |
|---|---|---|---|---|
| ambient | 首頁掛紙模組每 2.2 秒一格轉 90°（順序由 FNV 決定）；首頁依真實月份重排掛紙 | 時間 | .6s `cubic-bezier(.7,0,.2,1)` | 不轉；構成靜止、資訊不變 |
| input | 指標經過模組立即轉 90° 並在右欄顯示名稱；九つ入的 Pointer 拖放（ghost 跟手、落格 .24s 由 −90° 轉正）；月令頁 hover 轉 90° | pointer | .18s／.24s | 不轉，資訊照常更新 |
| transition | 跨文件 View Transitions：新頁以紅圓自導覽花處漲開（clip-path circle .62s），日の丸以 `view-transition-name:hinomaru` 在四頁之間連續變形；月令右欄 clip-path inset 推入 | 換頁／換選取 | .62s／.7s／.38s | 停用 @view-transition，直接換頁 |
| signature | **封箱即掛紙**：九格菓子以 FLIP 飛出桐箱，中途轉 ±90°、縮放到掛紙方眼的位置與大小，桐蓋落下、空格色塊逐格長出 | 按「封」 | .88s，每格延遲 70ms | 掛紙直接出現 |

自我限制：本站**不用淡入**、不用視差、不用彈跳——這個流派的時間感是「翻一張木型」：整數倍 90° 的硬旋轉。

### motion-library 元件（PLAYBOOK §2.8；motion-library 1.1.0 @eb4d70c；`MotionLib.prompt(id)` 可取出各元件的開發 Prompt）

| 頁 | ID | 名稱 | 參數 | 承載什麼／為什麼適合 | 類型 |
|---|---|---|---|---|---|
| 首頁 | BG-B-35 | Bauhaus Shapes | colors {primary #D93A26, secondary #2C56A0, bg #EFEAE0}, duration 9, density 2.2, intensity 1, seed 1966, 16:9（容器裁成 2.6m 帶） | 「工房的窗」：半圓、四分圓、三角在方眼裡以 90° 步進翻面——就是木型被一個個翻過來；它只畫五形中的三種、零圓角、零發光 | ambient |
| 首頁 | TXT-A-26 | Flip | text「方・圓・角」, colors {#D93A26, #16140F, #EFEAE0}, duration 1.4, loop false（一次性）, seed 3, 16:9 | 店規標題逐字翻面，背面是紅——翻牌的硬切與本流派 90° 翻轉同一種時間感；指標經過重播 | transition（一次性）＋input |
| 九つ入 | BG-B-33 | Minimal Blocks | colors {#D93A26, #EDB01F, #EFEAE0}, duration 6, seed 9, 4:5 | 「掛紙待印」佔位：三塊正方在中心輪流換位，像掛紙還在排版；封箱即 destroy | ambient |
| 十二月令 | TXT-B-30 | Checker Words | text「十二月令」, colors {#2C56A0, #16140F, #EFEAE0}, duration 1.6, loop false, seed 12, 16:9 | 頁題由市松方格長出再被字挖空——方格即方眼，正是本流派的版面本體 | transition（一次性） |
| 店 | SHP-09 | Shape Morph | colors {#D93A26, #2C56A0, #EFEAE0}, duration 3.2, loop, seed 61, 1:1 | 圓→方→三角：店裡木型只壓得出這幾種形；平塗多邊形、零描邊 | ambient |

掛載：等 `document.fonts.ready`；IntersectionObserver 離屏 `destroy()`、回視窗重掛；canvas `aria-hidden`；容器內原 HTML 標題 `.ml-fb` 掛載成功才視覺隱藏；reduced-motion 時背景 `seek(.35)`、文字 `seek(1)`。同一畫面同時運轉 ≤2 個。

## 八、插畫與圖像風格

**方圓模組構成（primitive-module）**：所有圖像是 100×100 的模組，由五形以 3–6 個原語拼成，每個模組自帶滿版底色。模組可以 90° 整數倍旋轉而仍然成立。插畫不描邊、不加質感、不加紙紋（生成り本身就是紙）。地圖也是：街道是墨色矩形、捷運站是藍圓、店是紅方塊、步行路線是鬱金小方點。

## 九、Logo 與 Favicon

墨色正方，左下一片鬱金四分圓，右上一枚紅圓，右下一個生成り直角三角——四形各一。字標：明朝 800「方圓」＋Jost 11px「HŌEN WAGASHI · TAIPEI」。Favicon 為同一 SVG 的 data URI。

## 十、Do & Don't

**Do**
- 先決定題材是什麼，再用五形翻譯它；說得出「這個圓是什麼」。
- 每屏一枚最大的紅圓。
- 模組緊貼，讓兩個顏色自己形成邊界。
- 直排明朝與小號拉丁並置。

**Don't**
- 不用自由曲線、圓角矩形、描邊、漸層、陰影、發光、玻璃擬態。
- 不用三原色包浩斯配色（那是另一個流派）；用和色。
- 不做「置中大標＋兩顆按鈕＋三張圓角卡片」；不用 emoji icon、紫藍漸層、Lorem ipsum、「EST. 19xx」徽章。
- 不在模組上疊文字標籤（字放在模組外的文字帶）。
- 不讓紅色變成大面積背景。

## 十一、頁面骨架範例

```html
<header class="hd"><a class="logo" href="index.html"><svg viewBox="0 0 64 64">…</svg><div><b>方圓</b><span class="lt">HŌEN WAGASHI · TAIPEI</span></div></a></header>
<nav class="qnav"><ol><li><a href="index.html" aria-current="page"><i>01</i>掛紙</a></li>…</ol><div class="flower" aria-hidden="true">…四片四分圓…</div></nav>
<main>
 <section class="hero">
  <div class="sheet"><div class="poster"><!-- 9 個模組 + 色塊，gap:0 --></div>
   <div class="sheet-foot"><div class="sf-l"><p class="sf-m">十月の九つ</p><p class="lt">KAKEGAMI Nº 10</p></div><div class="sf-r vt">上生菓子 一つ <b>NT$85</b></div></div></div>
  <div class="side"><div class="hinomaru"></div><h1 class="vt">方圓菓子舖</h1><div class="side-body">…</div></div>
 </section>
</main>
```

---

## 十二、技術實作與相容性

### 1. 跨文件 View Transitions（B 動效與時間軸層）——承載換頁與跨頁連續存在的日の丸

```css
@media (prefers-reduced-motion:no-preference){
 @view-transition{navigation:auto}
 ::view-transition-old(root){animation:none}
 ::view-transition-new(root){animation:he-in .62s cubic-bezier(.7,0,.2,1) both}
 ::view-transition-group(hinomaru){animation-duration:.7s}
}
@keyframes he-in{from{clip-path:circle(0% at calc(100% - 64px) 52px)}to{clip-path:circle(150% at calc(100% - 64px) 52px)}}
```
- 支援現況（2026-10 查證）：Chrome／Edge 126+、Safari 18.2+ 支援；Firefox 143 預設關閉、144 起為部分支援（caniuse「View Transitions (cross-document)」）。觸發條件依 MDN `@view-transition`：同源、無跨源轉址、navigation type 為 push／replace／traverse，且 push／replace 必須由頁面內容發起。
- Fallback：偵測 `'CSSViewTransitionRule' in window || 'PageRevealEvent' in window`，皆無時改用 WAAPI——點內部連結先讓紅色覆蓋層以 `clip-path:circle()` 從導覽花漲滿（420ms）再換頁，抵達頁從滿版縮回（460ms），以 sessionStorage 旗標串接；`pageshow` 遇 bfcache 移除殘留覆蓋層。無 WAAPI 時直接換頁。
- 查證來源：MDN〈@view-transition〉；Chrome for Developers〈Cross-document view transitions for multi-page applications〉；caniuse.com/cross-document-view-transitions。

### 2. Pointer Events 拖放＋FLIP（D 輸入與感測層）——承載九つ入與封箱簽名

- `setPointerCapture` 讓拖曳離開按鈕仍追蹤；`touch-action:none` 防手機捲動；移動 <6px 視為點擊（點一下＝放進下一個空格／拿出來）；`document.elementFromPoint` 命中格子，ghost 設 `pointer-events:none`。鍵盤：托盤按鈕 Enter 放入、格子 Enter／Delete 拿出。
- FLIP：封箱時先把掛紙以最終版面渲染（`visibility:hidden`），量每格 First（箱格 rect）與 Last（掛紙格 rect），以 `position:fixed` 的複本從 First 經中點（±90°）`Element.animate()` 到 Last，結束後顯示真格並移除複本。
- 支援：Pointer Events 與 WAAPI `Element.animate()` 為所有現行主流瀏覽器長期支援的 Baseline 功能（MDN）。無 `animate` 時直接出現掛紙。

### 3. URL 狀態序列化＋FNV-1a 決定性構成（E 資料與生成層）——承載「網址就是這一盒」

- `?b=` 9 字元：每格一個 base36 字（0–d 對應 14 品項，`-` 為空格）；`&s=1` 表示已封箱。`history.replaceState` 每次改動即寫回，複製網址即可分享；別人打開會重建同一箱、同一張掛紙（版型與空格色塊皆由 `FNV-1a(b)` 決定）。`?add=<id>` 由月令頁帶入一品。
- 支援：`URLSearchParams`、`history.replaceState`、`navigator.clipboard.writeText`（後者需安全環境；失敗時改為顯示網址文字）。

### 效能預算實測

- 單頁大小：index 72.2KB／hako 81.0KB／koyomi 71.9KB／mise 64.7KB（含 34.6KB motion-library 子集與全部 inline 資源；Google Fonts 另載）。皆 ≤350KB。
- 首屏 JS：掛紙構成（compose＋posterHTML）在 Node 22 實測單次 <1ms；主要成本為 motion-library 子集解析。建置環境無可用瀏覽器，未取得瀏覽器內 Performance 面板數值——首屏不執行 canvas（motion-library 元件皆在首屏以下或由 IntersectionObserver 延後掛載）。
- 動畫：模組旋轉與換頁只動 `transform`／`clip-path`，無 layout thrashing；同一畫面同時運轉的 motion-library 元件 ≤2。
- 冒煙測試：`tools/ml-smoke.js` 對五個元件 `smoke ok`；jsdom 載入四頁零錯誤；hako 以 `?b=` 解碼、隨機補滿、封箱、`&s=1` 直開、`?add=` 帶入皆驗證通過。
