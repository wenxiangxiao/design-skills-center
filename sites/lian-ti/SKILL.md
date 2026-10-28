---
name: madhubani-mithila-painting
description: Madhubani / Mithila painting style — parallel double outlines with hatched or flat-colour gaps (kachni / bharni), nested ornamental border bands, horror vacui where every gap is filled with flowers, dots and tiny fish, flat natural pigments on cow-dung-washed ochre paper, and paired profile motifs with big almond eyes (fish, lotus, bamboo, sun with a face).
---

# Mithila／Madhubani 繪畫 Madhubani · Mithila Painting

> 這是一份風格規格書。讀完它，你應該能做出一個和 Demo（蓮池行，臺南白河蓮子行）不同產業、但一眼看得出是同一個流派的網站。
> **本流派為既有文化視覺傳統，非自創。**
>
> **年代與地域**：印度比哈爾邦北部與尼泊爾特萊平原的 Mithila 地區（今 Madhubani、Darbhanga 等縣）。原是婦女在泥牆上（bhitti chitra）與地上（aripana）畫的儀式畫，逢出生、婚事、節慶重畫；最精緻的是新婚房牆上的 **kohbar**——蓮（女）、竹（男）、成雙的魚。顏料就地取材：燈煙黑、薑黃、紅花（kusum）、靛、葉綠、米漿白；筆是綁了棉布的竹枝。
> **它為什麼長成這樣**：牆是要被反覆重畫的、顏料是不透明的植物與礦物色，沒有暈染的工具也沒有要表現光影的理由——於是一切都是平塗＋墨線；儀式畫要求「圓滿」，所以空白被視為不完整，畫到滿為止；畫在牆上要從遠處讀得出形，所以每個形都描兩道線。
> **轉折**：1934 年比哈爾大地震震倒土牆，英國殖民官員 W.G. Archer 在瓦礫間看見並記錄這些畫；1966–68 年大旱，Pupul Jayakar 主持的手工藝推廣計畫鼓勵婦女把畫搬到手抄紙上販售，成為收入來源。此後分出 **Bharni**（平塗填色）、**Kachni**（細線排線）、**Godna**（刺青紋，Dalit 社群）、**Gobar**（牛糞地）等流派；Sita Devi、Ganga Devi、Baua Devi、Godavari Dutta 等畫家讓它走出村子。
> **參照**：MAP Academy〈Madhubani Painting〉(mapacademy.io)；W.G. Archer《Maithil Painting》(Marg, 1949)；Pupul Jayakar 相關手工藝文獻；Mithila Museum（新潟，長谷川時夫 1989 年設立）館藏。
>
> **與館內近親的分界**：Gond（Jangarh Kalam）＝黑紙上平貼剪影、剪影內填「畫師簽名紋」，本流派是**赭紙上雙線輪廓＋滿版填充**；Warli＝白色火柴人線描；Kalighat＝水彩濕畫流動輪廓；Chicha＝螢光撐滿字。

---

## 一、設計哲學

1. **圓滿就是滿**：空白不是留白美學，是「還沒畫完」。網頁上的空隙由程式找出來，再一朵一朵填。
2. **線比色先**：形先由兩道平行墨線決定，色只是被線圍起來的填充。拿掉色，畫還成立；拿掉雙線，就不是 Madhubani。
3. **框是畫的一部分**：一層框套一層框（齒帶、蓮瓣帶、點帶、斜線帶），框不是容器，是母題。
4. **中軸對稱、萬物成雙**：構圖從中軸往兩側展開；魚、鳥成對出現。
5. **平、亮、不透明**：沒有光源、沒有陰影、沒有漸層、沒有半透明。

---

## 二、本風格的 5 個不可省略特徵

### 特徵 1：雙線輪廓＋線間填充（形狀語彙）

每個主要形都是「墨 2｜帶 5｜墨 2」三層：外層墨線，中間一條色帶（Bharni）或斜線帶（Kachni），內層墨線。**拿掉它就不是這個風格了。**

```svg
<!-- 同一條 path 畫兩次：先 9 寬墨線，再疊 5 寬色帶或斜線帶 -->
<pattern id="h" width="3.2" height="3.2" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
  <rect width="3.2" height="3.2" fill="#E8C98A"/><rect width="1.3" height="3.2" fill="#1C1712"/></pattern>
<path d="M-48,0 C-30,-28 22,-30 40,0 C22,30 -30,28 -48,0Z" fill="#C8321E" stroke="#1C1712" stroke-width="9" stroke-linejoin="round"/>
<path d="M-48,0 C-30,-28 22,-30 40,0 C22,30 -30,28 -48,0Z" fill="none" stroke="url(#h)" stroke-width="5" stroke-linejoin="round"/>
```
```css
/* HTML 盒子的雙線：padding-box 填色、border-box 放斜線帶、外內各一道 2px 墨線（零模糊的 box-shadow） */
.dbl{border:7px solid transparent;
  background:linear-gradient(var(--fill),var(--fill)) padding-box,
             repeating-linear-gradient(45deg,#1C1712 0 1.3px,#E8C98A 1.3px 3.4px) border-box;
  box-shadow:0 0 0 2px #1C1712, inset 0 0 0 2px #1C1712}
.dbl.bh{--band:linear-gradient(#C8321E,#C8321E)} /* Bharni：色帶 */
```

### 特徵 2：不留白 horror vacui（版面手法）

主體畫完後，剩下的每一處空隙都要被小花、三點、葉、芽、小魚、眼圈填滿；填充物彼此距離相等、不重疊、不壓到主體。本站以 **Poisson-disk 取樣＋障礙矩形**實作（障礙＝實心物件外框＋文字逐行的 `Range.getClientRects()`，所以參差的行尾也被填）。

```js
// 核心：Bridson 取樣，free() 同時檢查「離障礙 ≥ r/2」與「離其他點 ≥ r」
function free(x,y){ if(distToObstacles(x,y)<r*.5) return false; /* 網格鄰居檢查 */ }
// 填充物尺寸 r*(.42–.54)，r＝32px（≤560px 時 24px）；同一 seed 永遠長出同一片
```
```css
.vf{position:relative;isolation:isolate}
.vf>.vf-layer{position:absolute;inset:0;z-index:-1;pointer-events:none}
```

### 特徵 3：層層邊框（裝飾母題）

整頁四周固定一圈齒帶；區塊之間用 2–3 條帶堆疊（蓮瓣帶＋斜線帶、點帶＋齒帶、魚鱗帶）。每條帶上下各一道 2px 墨線。

```css
.band{border-block:2px solid #1C1712}
.band.teeth{height:16px;background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='14'%3E%3Crect width='20' height='14' fill='%23EDB021'/%3E%3Cpath d='M0,14 L10,1.5 L20,14Z' fill='%23C8321E' stroke='%231C1712' stroke-width='1.6'/%3E%3C/svg%3E") repeat-x}
.band.petal{height:18px;background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='16'%3E%3Crect width='24' height='16' fill='%23E8C98A'/%3E%3Cpath d='M2,16 C2,2 22,2 22,16Z' fill='%23E77A8F' stroke='%231C1712' stroke-width='1.6'/%3E%3Cpath d='M7,16 C7,8 17,8 17,16' fill='none' stroke='%231C1712' stroke-width='1.3'/%3E%3C/svg%3E") repeat-x}
.edge{position:fixed;z-index:40;pointer-events:none} /* 頁框：上下左右四條齒帶 */
```

### 特徵 4：牛糞洗赭紙地＋五罐天然色平塗（色彩規則）

地色是赭（手抄紙以牛糞水洗過的顏色），不是白；正文墨色；五個天然色只做平塗。**零漸層（`linear-gradient(c,c)` 單色當填充層除外）、零陰影、零 opacity、零發光。**

```css
:root{--paper:#E8C98A;--ink:#1C1712;--red:#C8321E;--tur:#EDB021;--ind:#2B4C9B;--grn:#3F8A3A;--pink:#E77A8F;--lime:#F6EEDC}
body{background:var(--paper);color:var(--ink)}
```

### 特徵 5：側面大杏眼與成對母題（母題）

魚（杏仁身、大圓眼、鱗區、扇尾）、蓮（五瓣扇形）、竹（三節）、龜（六角殼）、鸚鵡（側面紅喙）、**有臉的太陽**、側面人像（巨大的杏眼佔臉寬 1/3、紅額點）。魚與鳥一律成雙、鏡像。

```svg
<!-- 大圓眼：白底＋墨框＋大瞳孔，放在頭部前 1/4 -->
<circle cx="-33" cy="-5" r="8" fill="#F6EEDC" stroke="#1C1712" stroke-width="2.2"/><circle cx="-34" cy="-5" r="3.8" fill="#1C1712"/>
<!-- 成雙：同一個 <g> 用 scale(-1 1) 鏡像 -->
<g transform="translate(232 128) scale(-.95 .95)">…魚…</g><g transform="translate(368 128) scale(.95)">…魚…</g>
```

---

## 三、色彩系統

| 角色 | hex | 用途 | 面積 |
|---|---|---|---|
| 牛糞洗赭紙 | `#E8C98A` | 唯一大面積地色、Kachni 帶的底 | ~50% |
| 燈煙墨 | `#1C1712` | 全部輪廓線、正文、頁尾地 | ~18% |
| 紅花紅 | `#C8321E` | 現用態、主按鈕、Bharni 色帶、魚 | ~9% |
| 薑黃 | `#EDB021` | 齒帶地、hover、太陽 | ~8% |
| 靛藍 | `#2B4C9B` | 水、點帶 | ~7% |
| 葉綠 | `#3F8A3A` | 葉、竹、蓮蓬 | ~5% |
| 蓮粉 | `#E77A8F` | 蓮瓣、蓮瓣帶 | ~2% |
| 米漿白 | `#F6EEDC` | 眼白、文字框底 | ~1%（只給眼睛與要長讀的框） |

正文墨對赭紙約 11:1。白只給眼白與文字框，不作底。

## 四、字體系統

- 中文：**LXGW WenKai TC**（Google Fonts）400／700——手寫楷的筆性接近竹枝筆；備援 Kaiti TC／BiauKai。
- 拉丁：**Yatra One**（Google Fonts，Devanagari＋Latin 的毛筆感展示字）只用在 kicker、英文副題與導覽小字。
- 字級：H1 `clamp(64px,9vw,128px)` 行高 .95；H2 `clamp(28px,4vw,44px)`；正文 17px／1.8；小字 13–15px。
- 這個傳統本身沒有字體，所以字永遠住在雙線框或 kicker 黑條裡，不和母題爭。

## 五、版面與網格

- 中軸對稱為上：主視覺可以偏左，但其內部構圖（池、明信片）以中軸鏡像。
- 首頁：左 1.38fr 主畫（池）＋右 1fr 店名與資訊；整個 hero 是一個 void-fill 容器。
- 區塊之間一律用 1–3 條裝飾帶分隔，不用細線或留白。
- 零旋轉（畫是貼在牆上的），零圓角（除了蓮蓬圓框）。
- 內距：容器 `clamp(14px,3.4vw,44px)`；框內 12–18px。

## 六、元件配方

- **導覽（frame-cartouche 框帶嵌牌）**：每頁一塊 `.dbl` 嵌牌；目前頁＝紅底平塗＋薑黃色帶（Bharni），其餘＝赭底＋斜線帶（Kachni）；hover 底變薑黃。
- **按鈕**：`.btn.dbl`，主按鈕紅底米白字、黃色帶；hover 反成墨底。`:active` 下移 2px。
- **卡片／品項**：`.dbl` 米白底，交錯用 Bharni 紅帶；hover 時斜線帶換向（-45°）並換成墨／薑黃。
- **表單**：輸入框也是 `.dbl`（米白底），母題選擇器是有編號徽章的嵌牌。
- **表格**：每格 `box-shadow:0 0 0 2px ink` 的獨立小格、間距 3px，像格子畫。
- **頁尾**：墨底、薑黃標題、米白連結。

## 七、動效規則（四種，缺一不可）

| 類型 | 本站自製實作 | 觸發／參數 | reduced-motion |
|---|---|---|---|
| ambient 環境 | 兩對魚＋一隻龜沿 CSS `offset-path: path()` 環游 | WAAPI `offsetDistance` 0→100%，23–64s linear 無限；`offset-rotate:auto 180deg` | 不播放，停在 HTML 寫好的位置 |
| input 輸入 | 游標 110px 內的魚 `playbackRate=6` 並壓扁 0.25s；點水面長出雙線漣漪、全池加速 0.9s；導覽／品項 hover 換帶 | pointermove／pointerdown，<16ms | 停用；hover 換色保留（無動畫） |
| transition 轉場 | 跨文件 View Transitions：新頁由**中軸向兩側畫開** `clip-path: inset(0 50% 0 50%)→inset(0)`，620ms `cubic-bezier(.6,0,.2,1)`；頁框四條齒帶 `view-transition-name:edge` 不動 | `@view-transition{navigation:auto}`；不支援時以 WAAPI 對 `.page` 播同一動畫 | `navigation:none` |
| **signature 簽名** | **留白自生 void-fill bloom**：空白由取樣找出，母題從「最靠近內容的點」開始往外一朵朵長出來（scale 0→1.18→1、旋轉 -90°→0，420ms，總展開 1.4s）；明信片上打字時只有「新空出來的位置」開花 | IntersectionObserver 進視窗；ResizeObserver 重算 | 直接顯示全部 |

### motion-library 元件（PLAYBOOK §2.8）

子集 `motion-library 1.20.0 @e45c261f`（`tools/ml-embed.js` 產生），inline 為每頁第一個 `<script>`；掛載包裝 `LT.ml`（照 `sites/ka-to` 的 `KT.ml`）。出處可用 `MotionLib.prompt(id)` 查。

| ID | 名稱 | 頁 | colors（primary／secondary／bg） | 參數 | 承載什麼／為什麼適合 | 類型 |
|---|---|---|---|---|---|---|
| BG-A-11 | Parallel Curves | index 池 | `#E8C98A`／`#F6EEDC`／`#2B4C9B` | duration 9, density .9, intensity .8, seed 1958, 16:9 | 靛底上的平行波線＝Mithila 畫水的方式（水永遠是一排平行波線），魚與蓮疊在上面 | ambient |
| BG-B-24 | Crosshatch | shop 頁首條 | `#1C1712`／`#C8321E`／`#E8C98A` | duration 8, density 1.3, intensity 1, seed 1966 | 赭底墨紅交叉排線＝Kachni 線畫的排線本體，放大成一條會滑動的帶 | ambient |
| SHP-23 | Spiral Dots | shop 蓮蓬 | `#EDB021`／`#C8321E`／`#E8C98A` | duration 3.2, loop:false, once, density .9, seed 137, 1:1 | 黃金角 137.5° 點陣＝蓮蓬裡蓮子的真實排列，也是「排到滿為止」的 bindu 點填 | transition（一次性） |
| BG-A-29 | Topo Lines | card 頁首條 | `#1C1712`／`#C8321E`／`#E8C98A` | duration 10, density .9, intensity .9, seed 2007 | 一圈圈同心描線＝Mithila 以重複外框「回聲」填滿地面的手法，也像水面漣漪 | ambient |
| BG-B-25 | Circle Pop | card 下單後 | `#EDB021`／`#F6EEDC`／`#C8321E` | duration 4, density .8, intensity 1, seed 350, 1:1 | 紅底上彈出的實心圓點＝儀式畫的 bindu 吉祥點，下單成功的回饋 | input（由按鈕觸發掛載） |

元件規則：離屏 `destroy()`、回視窗重掛；`document.fonts.ready` 後才掛；canvas `aria-hidden`；容器內留 `.ml-fb` 原始 HTML（池的說明文字、蓮蓬的靜態 SVG），掛載成功才視覺隱藏；reduced-motion 背景 `seek(.35)`、一次性 `seek(1)`。同一畫面最多兩個在跑。已讀過原始碼：五個都是平塗／純線，無 `shadowBlur`、無 `rr()` 圓角；SHP-23 的 `softGrid` 會畫 6% 墨色細格，放在圓框裡讀作蓮蓬表皮。

## 八、插畫與圖像風格（雙線母題組 kohbar-doubleline-kit）

- 全站零圖檔：所有圖由一支母題庫（魚、蓮、竹、龜、鸚鵡、太陽、側面人像＋六種小填充物）以 SVG 字串生成，建置期與執行期共用。
- 一律 `dl(path, fill, band)`：9 寬墨線＋5 寬帶。鱗、殼、葉脈用 1.3–2.2 的單墨線。
- 圖樣只有六種：`lt-h`（45° 斜線）、`lt-x`（交叉線）、`lt-sc`（魚鱗）、`lt-teeth`（齒）、`lt-petal`（蓮瓣）、`lt-dots`（點）。
- 動物一律側面；人臉一律側面、眼睛正面畫（埃及式）。

## 九、Logo 與 Favicon

- Logo：圓形徽，最外圈齒帶 → 9 寬墨圈＋斜線帶 → 赭底，內有一紅一藍兩尾魚首尾相銜、中央一朵蓮。`assets/logo.svg`。
- Favicon：同構圖簡化為兩尾魚＋雙圈，inline SVG data URI。

## 十、Do & Don't

**Do**：每個形兩道線；空白全部填滿；框疊框；魚成雙；平塗；中軸對稱；字住在框裡。
**Don't**：漸層、陰影、模糊、半透明、發光；圓角卡片；大面積白底；照片；正面寫實人臉；單隻魚；留白當設計；紫藍漸層、置中三卡片、emoji icon、Lorem ipsum。
**文化提醒**：kohbar 是婚房儀式畫、許多畫有神祇題材；商業用途請只取自然母題（魚、蓮、竹、鳥、日月），不要挪用神像；可能的話與真實的 Mithila 畫家合作並署名。

## 十一、頁面骨架範例

```html
<div class="edge t"></div><div class="edge b"></div><div class="edge l"></div><div class="edge r"></div>
<div class="page">
  <header class="mast"><a class="brand" href="index.html">…logo…<b>店名</b></a>
    <ul class="nav"><li><a class="dbl" aria-current="page" href="index.html">首頁<small>HOME</small></a></li>…</ul></header>
  <div class="stack"><div class="band petal"></div><div class="band hatch"></div></div>
  <section class="hero wrap vf" id="hero">          <!-- 整個 hero 是 void-fill 容器 -->
    <div class="dbl bg"><svg viewBox="0 0 800 450">…水、蓮、成雙的魚…</svg></div>
    <div><span class="kick">KICKER</span><h1>店名</h1><p class="dbl">說明</p><a class="btn red dbl">行動</a></div>
  </section>
  <div class="stack"><div class="band dots"></div><div class="band teeth"></div></div>
</div>
<script>LT.vf(document.getElementById('hero'),{seed:1934});</script>
```

## 十二、技術實作與相容性

### 1. SVG `<pattern>` 斜線帶＋同路徑雙描邊（A 渲染層）——承載特徵 1、3、5
同一條 path 先 9 寬墨線、再 5 寬 `stroke="url(#pattern)"`；`<pattern patternTransform="rotate(45)">` 為 SVG 1.1 起全瀏覽器支援。HTML 盒子以 `border-box` 背景層＋零模糊 `box-shadow` 做同樣三層。**注意**：放 `<defs>` 的 inline SVG 不能 `display:none`（部分瀏覽器會讓 pattern 失效），本站用 `width=0 height=0 position:absolute`。
**fallback**：無；這是最基本的 SVG。

### 2. CSS `offset-path: path()`＋WAAPI 驅動 `offset-distance`（B 動效層）——承載 ambient 與 input
查證：caniuse〈CSS property: offset-path: Support for path()〉——Chrome 64+、Edge 79+、Firefox 72+、Safari／iOS 16+，全球 96.81%（2026-09 統計）；MDN `path()` 標 Baseline Widely available。魚的座標空間固定為 800×450，外層以 ResizeObserver 算 `scale()` 對齊池寬。
**fallback**：`@supports not (offset-path:path("M0,0"))` 時隱藏 `.school`（池裡只剩蓮、日月與水紋，不會有魚疊在左上角）；無 JS 時魚停在 HTML 指定的 `offset-distance`。

### 3. Poisson-disk void-fill＋xorshift32（E 資料與生成層）——承載特徵 2 與 signature
Bridson 演算法（每點最多試 22 次），障礙＝實心物件外框＋`Range.getClientRects()` 逐行文字框；xorshift32 決定性亂數，同 seed 同結果；FNV-1a 把明信片內容雜湊成 seed，所以同一張卡在任何人電腦上長出同一片花。
**實測**：Node 1280×800、兩個障礙、r=34：396 點 13ms；瀏覽器首頁四個容器合計 < 20ms。
**fallback**：無 JS 時空白維持赭紙（內容完整，只是不滿）。

### 4. 跨文件 View Transitions（轉場，非核心）
查證：caniuse〈View Transitions (cross-document)〉——Chrome／Edge 126+、Safari 18.2+；Firefox 144–150 為 partial（僅 Level 1）。`@view-transition{navigation:auto}`。
**fallback**：偵測不到 `PageRevealEvent` 時以 WAAPI 對 `.page` 播放同一 clip-path 動畫。

### 效能預算實測（Chromium headless，1366×860）
| 頁 | 檔案大小（含 motion-library 子集 ~205KB） | 首屏 ScriptDuration | 動畫 |
|---|---|---|---|
| index | 286KB | 56ms | 60fps |
| shop | 269KB | 41ms | 61fps |
| card | 324KB | 61ms | 61fps |
