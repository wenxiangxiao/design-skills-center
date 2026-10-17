---
name: web-2-0-gloss
description: Mid-2000s "Web 2.0" web design for today's browsers — glossy split-highlight jelly buttons, wet-floor reflections, star-flash BETA badges, diagonal pinstripe backgrounds behind a centred fixed-width white page, candy colours, live tag clouds, and the Yellow Fade Technique announcing every change.
---

# Web 2.0 光澤時代 · Web 2.0 Gloss (2004–2009)

> 這份規格書描述的是 **Web 2.0 光澤時代**：大約 2004 到 2009 年，網站從「一頁一頁的文件」變成「會自己更新的服務」時，網頁設計長出來的那一套樣子——果凍按鈕、倒影地板、星形爆炸的 BETA 徽章、斜紋底、置中定寬的白頁、糖果色、標籤雲，還有每次有東西變了就閃一下的黃色。
>
> 它不綁定產業。範例站是一間冷凍重乳酪的揪團工坊（chiizr 揪起司），同一套語言也能做社群、訂閱服務、二手交換、活動報名、讀書會、社區電台、任何「大家一起決定」的生意。
>
> 判準只有一個——**遮掉全部文字，懂設計的人要能在三秒內說出「這是 2006 年的 Web 2.0」。**

---

## 一、設計哲學

「Web 2.0」這個詞是 O'Reilly Media 的 Dale Dougherty 在 2004 年為一場研討會想的，Tim O'Reilly 在 2005 年 9 月 30 日的〈What Is Web 2.0〉把它寫成定義：網站是平台、使用者產生內容、永遠的 beta、資料會自己長大。它原本是商業與技術論述，但同一批網站（相片分享、書籤分享、投票新聞、部落格平台、早期的 Ajax 應用）在兩三年內收斂出一套非常一致的外觀，以至於「Web 2.0 style」變成了設計界的通用詞。Ben Hunt 在 Web Design From Scratch 寫的〈Web 2.0 How-To Design Style Guide〉把它整理成一張清單：簡單的版面、置中、欄數少、分離的頁首區、大字、粗體導言、強烈的顏色、豐富的表面（漸層、倒影）、可愛的圖示、星形爆炸標籤。

它為什麼長成這樣：

- **寬頻剛普及、螢幕還是 1024×768。** 所以頁面是置中、定寬 760–960px 的一張白紙，兩側露出底紋——那塊底紋是「螢幕比內容大」的證據。
- **CSS 2.1 還沒有圓角、漸層和陰影。** 所有光澤都是 Photoshop 切出來的 PNG：圓角是四個角的小圖、漸層是 1px 寬的長條平鋪、果凍按鈕是一張上下兩半不同色的圖。**上下兩半顏色的硬切線**就是從這種製作方式來的——它不是光學真實，是「切圖」的痕跡。
- **Ajax 讓頁面不用重載就能改變。** 改變因此需要被「宣告」：37signals 在 2004 年 2 月 19 日公開的 **Yellow Fade Technique** 把剛改過的那一塊先塗成淡黃、再一兩秒淡掉，成了整個時代的回饋語言；轉圈的載入圖示、Lightbox 開箱、BlindDown 下拉也是。
- **使用者是內容。** 所以畫面上滿是社交零件：標籤雲（字越大越多人用）、推數框、最新動態、頭像、暱稱、80×15 的小徽章、RSS 橘色方塊。

**一句話總結：一張置中的白紙，上面所有能按的東西都在發亮，所有剛變過的東西都閃一下黃。**

---

## 二、本風格的 5 個不可省略特徵

拿掉任何一條，它就不是 Web 2.0 了。每一條都附可直接複製的片段。

### 特徵① 果凍按鈕：上下兩半的硬切高光

按鈕是膠囊或小圓角，**漸層在 50% 處硬切**——上半淺、下半深，切線清楚可見；外框比底色深一階；內側頂端一條 1px 白線；字是粗體白字配向上的 1px 暗字影。沒有這條硬切線，它就只是一顆「有漸層的按鈕」。

```css
.btn{display:inline-flex;align-items:center;gap:8px;padding:.6em 1.4em;border-radius:999px;
 border:1px solid #C85300;color:#fff;font:800 15px/1.2 "Nunito",sans-serif;text-shadow:0 -1px 0 rgba(0,0,0,.25);
 background:linear-gradient(#FFB45C 0%,#FF8A1F 50%,#FF7A00 50%,#F26200 100%);   /* ← 50% 硬切 */
 box-shadow:inset 0 1px 0 rgba(255,255,255,.65),inset 0 -2px 4px rgba(255,255,255,.18),0 1px 2px rgba(0,0,0,.22);
 transition:transform .45s var(--spring)}
.btn:active{transform:scale(.93);transition-duration:.06s}
.btn.lime{border-color:#4F8A00;background:linear-gradient(#C8EF6A 0%,#A6DA34 50%,#7AB800 50%,#69A000 100%)}
```

導覽列本身也是一條果凍：`linear-gradient(#B5E356 0%,#8CCB1C 50%,#79B800 50%,#6AA400 100%)`，現用頁的分頁籤是白色、與下方白頁接在一起。

### 特徵② 倒影地板 Wet floor

商品、Logo、主圖底下有一個上下顛倒、透明度約 0.3–0.4、在 30–60% 高度內淡出的倒影，像放在一塊亮白的桌板上。倒影**緊貼**物件底緣，不留空隙；地板本身是白的，不畫桌面。

```html
<svg viewBox="0 0 200 220">
 <defs>
  <linearGradient id="fade" x1="0" y1="150" x2="0" y2="214" gradientUnits="userSpaceOnUse">
   <stop offset="0" stop-color="#fff" stop-opacity=".42"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
  <mask id="m"><rect y="150" width="200" height="70" fill="url(#fade)"/></mask>
  <g id="obj"><!-- 物件，底緣在 y=150 --></g>
 </defs>
 <use href="#obj"/>
 <g mask="url(#m)"><use href="#obj" transform="translate(0 300) scale(1 -1)"/></g>  <!-- 以 y=150 為鏡 -->
</svg>
```

HTML 文字的倒影（Logo）：

```css
.wordmark + .wordmark{transform:scaleY(-1);opacity:.28;margin-top:-6px;
 -webkit-mask-image:linear-gradient(to top,#000,transparent 55%);mask-image:linear-gradient(to top,#000,transparent 55%)}
```

### 特徵③ 星形爆炸徽章 Star flash

20–24 個尖角的鋸齒圓、亮色實心、內側一圈白細線、左上一片白色高光，字轉 −12°～−15°，寫 `BETA`、`NEW!`、`免費!`、`成團!`。它斜斜地壓在 Logo 或框的右上角，會非常慢地自轉（26 秒一圈）。

```js
const burstPath=(n=22,r1=50,r2=41,cx=50,cy=50)=>{let s='';for(let i=0;i<n*2;i++){
 const a=i/(n*2)*Math.PI*2-Math.PI/2,r=i%2?r2:r1;s+=(i?'L':'M')+(cx+Math.cos(a)*r).toFixed(1)+' '+(cy+Math.sin(a)*r).toFixed(1);}return s+'Z';};
```
```css
.burst{position:absolute;width:74px;height:74px;display:grid;place-items:center;color:#fff;font:900 13px/1 "Nunito";text-transform:uppercase}
.burst svg{position:absolute;inset:0;animation:spin 26s linear infinite;filter:drop-shadow(0 1px 1px rgba(0,0,0,.22))}
.burst span{position:relative;transform:rotate(-14deg)}
```

### 特徵④ 斜紋底 ＋ 置中定寬白頁

`body` 是淡藍灰底上 45° 的 1px 細斜紋；內容是一張置中、最寬 960px 的白頁，左右露出斜紋、四周 1px 淺灰框，頁首是一個**分離的上段**（白→淡色的直漸層）。框一律小圓角 6px、1px 淺框、標題列是白→淺灰的直漸層。

```css
body{background-color:#EEF3F6;background-image:repeating-linear-gradient(45deg,#E3EBF1 0 1px,transparent 1px 6px)}
.page{max-width:960px;margin:0 auto;background:#fff;border:1px solid #C9D3DC;border-top:0;box-shadow:0 0 0 5px rgba(255,255,255,.55)}
.box{border:1px solid #C9D3DC;border-radius:6px;overflow:hidden}
.box > header{padding:7px 12px;background:linear-gradient(#FFFFFF,#E9EFF3);border-bottom:1px solid #C9D3DC;font:800 14px "Nunito",sans-serif}
.cols{display:grid;grid-template-columns:minmax(0,1fr) 280px;gap:22px}   /* 兩欄：內容＋側欄 */
```

### 特徵⑤ 標籤雲與社交零件（糖果色）

一定看得到「群眾」：**標籤雲**（字級＝熱度、同一種粗圓體、藍色連結、熱門轉橘）、推數框（淡黃方框裡一個大數字＋「推」）、最新動態（頭像＋粗體暱稱＋動作＋「3 分鐘前」）、80×15 小徽章、RSS 橘方塊。顏色是白底上的糖果色：萊姆綠、訊號橘、天空藍，少量桃紅。

```css
.cloud a{font:800 14px "Nunito",sans-serif;color:#1E7FD6;text-decoration:none;transition:font-size .6s var(--spring)}
@supports (width:calc(attr(data-n type(<number>),0) * 1px)){
 .cloud a{font-size:clamp(11px,calc(9px + attr(data-n type(<number>),0) * .26px),46px)}   /* 字級直接讀 data-n */
}
.digg .n{width:58px;height:54px;display:grid;place-items:center;background:linear-gradient(#FFFBD9,#FFF5B8);border:1px solid #E5D36A;border-radius:6px;font:900 22px "Nunito"}
.badge80{display:inline-flex;height:15px;font:700 9px/15px Verdana;border:1px solid #666}
.badge80 b{background:#FF7A00;color:#fff;padding:0 4px}.badge80 span{background:#fff;padding:0 4px}
```

---

## 三、色彩系統

| 名稱 | Hex | 用途 | 面積 |
|---|---|---|---|
| 白頁 | `#FFFFFF` | 內容底、框底、地板 | 約 55% |
| 斜紋底 | `#EEF3F6`／`#E3EBF1` | body 底與 45° 細線 | 約 15% |
| 淺框 | `#C9D3DC`／`#E1E8ED` | 1px 框、分隔線 | 約 4% |
| 地板灰 | `#F4F7F9` | 次要框底、頁尾 | 約 6% |
| 墨灰 | `#333333` | 正文（不用純黑） | 文字 |
| 萊姆綠 | `#7AB800`（亮 `#A6DA34`、深 `#4F8A00`） | 導覽條、成功、Logo 點 | 約 8% |
| 訊號橘 | `#FF7A00`（亮 `#FFB45C`、深 `#C85300`） | 主要行動按鈕、熱門、成團 | 約 4% |
| 天空藍 | `#1E7FD6`（深 `#0F5DA6`） | 連結、次要按鈕 | 約 4% |
| 桃紅 | `#FF3D8B` | NEW 標、你加的標籤、日期頁籤 | ≤1% |
| 黃色淡出 | `#FFFF99` | 只給「剛剛改變」 | 動態 |
| 推數框 | `#FFF5B8`／`#E5D36A` | 推數 | ≤1% |

規則：**底永遠是白的**，糖果色只住在按鈕、條、徽章與小標上；任何彩色面都要有「上淺下深、50% 硬切」的光澤，平塗的大色塊不屬於這個流派。不用紫藍漸層、不用深色底。

## 四、字體系統

- **大字／標題／Logo：** Nunito 800–900（Google Fonts，圓頭幾何，替代當年的 VAG Rounded／Arial Rounded），中文配 Noto Sans TC 800–900。Logo 一律**全小寫**、字距 −0.04em、去母音的名字（chiizr）。
- **介面小字：** `"Lucida Grande","Lucida Sans Unicode",Verdana,"Noto Sans TC",sans-serif`，正文 13px／行高 1.6，註記 11px。這是當年 Mac／Windows 的系統 UI 字，小字的「2006 感」大半來自它。
- **字級階梯：** 11／12／13／15（粗體導言）／17／20／24（大字標語）／28（頁標）／64（Logo）。Ben Hunt 那張清單裡的「大字」與「粗體導言」——導言用 15px 700、色 `#444`。
- 數字：推數框用 Nunito 900；不用等寬字。

## 五、版面與網格

- 置中定寬：`max-width:960px`，頁內 padding 24px；手機（≤560px）收成單欄、padding 14px。
- 兩欄：主欄 `1fr` ＋ 側欄 280px，gap 22px。側欄放加入框、倒數、最新動態、說明框。
- 上段分離：Logo（左）＋小字工具列（右上：嗨，訪客！・免費加入・RSS）＋ 一條果凍導覽。
- 零旋轉；唯一的角度是星形爆炸的字（−14°）與相片縮圖 hover 的 −1°。
- 留白：框與框之間 18px；框內 12–14px。

## 六、元件配方

- **導覽：** 果凍條上的圓頂分頁籤（`border-radius:7px 7px 0 0`），現用頁白底、萊姆深字、邊框接到頁面；每個籤下有一行英文小字（home／vote／photos／blog）。hover 往上浮 2px（spring）。手機時籤可橫向捲動。
- **按鈕：** 見特徵①；尺寸 `.sm`（12px）、預設（15px）。主要行動一律橘，確認與成功綠，次要藍。停用：灰階＋半透明。
- **框：** 見特徵④。標題列右側放 11px 灰色小字（「live」「每 2 秒更新」）。
- **推數列（Digg 式）：** 左 64px 一欄放淡黃推數框＋「推!」小按鈕，右欄標題、說明、糖果斜紋進度條、標籤與「差 N 推成團」。
- **進度條：** 圓角 7px、`-45°` 萊姆斜紋 8px＋上半白光，斜紋 1 秒一格往右流動；滿了轉橘。
- **表單：** 1px `#AEBBC6` 框、4px 圓角、頂端 6px 淡灰內漸層（當年的「凹下去」）；focus 藍框＋淡藍光暈。
- **燈箱（Lightbox）：** 全黑 72% 的遮罩；白色圓角盒先長寬、再長高、最後圖片淡入；左右兩顆半透明圓鈕；下方標題＋「第 3 張，共 10 張」＋關閉圓鈕。
- **最新動態：** 24px 方形頭像（彩色底、簡筆臉、上半白光）＋粗體藍暱稱＋動作＋右側 10px 時間。
- **頁尾：** 地板灰底，左邊連結與地址，右邊一排 80×15 徽章。

## 七、動效規則

本流派的動態都是「Ajax 回饋」：它們存在是為了告訴你**哪裡剛剛變了**。四種缺一不可，全部提供 `prefers-reduced-motion` 降級且資訊零損失。

| 種類 | 本站實作 | 觸發 | 時長／easing | reduced-motion |
|---|---|---|---|---|
| ambient 環境 | 星形爆炸自轉；進度條斜紋流動；首頁標籤雲每 2.2 秒被「別人」推一次 | 無 | 26s linear／1s linear／2.2s 間隔 | 停轉、斜紋靜止、更新改 6 秒一次 |
| input 輸入 | 果凍按鈕按下縮到 0.93、放開以 spring 彈回；分頁籤 hover 上浮；相片縮圖 hover 浮起 −1° | pointer／keyboard | 按下 60ms、彈回 450ms `linear()` spring | 取消位移，只保留顏色變化 |
| transition 轉場 | Ajax 式換頁：主內容 BlindUp（clip-path 由下往上收）＋分頁列出現轉圈「載入中…」→ 下一頁 BlindDown 帶超調；燈箱 Lightbox 2 式開箱 | 點站內連結／點縮圖 | 260ms ease-in ＋ 700ms spring；開箱 620ms | 直接換頁、直接開啟 |
| **signature 簽名** | **黃色淡出活標籤雲**：任何數字或字一改變，那一塊先塗 `#FFFF99` 再 1.6 秒淡掉；標籤雲的字級由 typed `attr()` 直接讀 `data-n`，推一次字就以 spring 長大一點 | 資料改變 | 1.6s ease-out；font-size 0.6s spring | 黃色停留 1.6 秒後瞬間消失（不漸變） |

spring 曲線：

```css
:root{--spring:cubic-bezier(.34,1.56,.64,1)}
@supports (transition-timing-function:linear(0,1)){
 :root{--spring:linear(0,.18 6%,.56 14%,1.05 26%,1.16 32%,1.12 38%,.98 50%,.96 56%,1.01 70%,1)}
}
.yft{animation:yft 1.6s ease-out}
@keyframes yft{0%,15%{background-color:#FFFF99}100%{background-color:transparent}}
```

```js
function yft(el){el.classList.remove('yft');void el.offsetWidth;el.classList.add('yft');
 clearTimeout(el._t);el._t=setTimeout(()=>el.classList.remove('yft'),1700);}
```

自我限制：本流派不用視差、不用滾動揭示、不用大面積淡入——那些是 2010 年後的語彙。

### motion-library 元件表（PLAYBOOK §2.8）

來源：`wenxiangxiao/motion-library` 1.1.0 @ `eb4d70c`，以 `tools/ml-embed.js` 抽出子集（35.1KB）inline 為每頁第一個 `<script>`；`tools/ml-smoke.js` 為 `smoke ok`。各元件的開發 Prompt 以 `MotionLib.prompt(id)` 取得。掛載包裝 `CZ.ml`（同 `sites/ka-to` 的 `KT.ml`）：等 `document.fonts.ready`、離屏 `destroy()`、一次性文字 `loop:false`、canvas `aria-hidden`、容器保留 `.ml-fb` HTML 備援、reduced-motion 背景 `seek(.35)`／文字 `seek(1)`。同一畫面同時運轉 ≤2 個。

| ID | 名稱 | 頁 | 參數 | 種類 | 承載什麼／為什麼適合 |
|---|---|---|---|---|---|
| TXT-B-17 | Water Reflection | 首頁頁首 | text `chiizr`、colors `#7AB800/#FF7A00/#FFFFFF`、duration 1.6、loop false、intensity .25、1:1、容器 2:1 裁切 | transition（進場一次） | Logo 從「地板」下升起並在下方留下倒影＝特徵②本身；intensity 壓到 .25 讓水波幾乎靜止，成為 2006 年的 wet floor 而不是水面 |
| BG-A-20 | Diagonal Lines | 首頁側欄截團框 | `#D5E0E8/#7AB800/#EEF3F6`、duration 6、density 1.4 | ambient | 45° 斜紋＝特徵④的底紋，每第四條是萊姆綠，像糖果斜紋進度條在框頂流動 |
| SHP-39 | Arc Loader | 揪團牆側欄 | `#7AB800/#FF7A00/#FFFFFF`、1.4s loop、1:1、52px 圓形裁切 | ambient | 三道圓頭弧線轉圈＝Ajax 時代的載入轉圈，標示「這面牆正在即時同步」 |
| TXT-B-18 | Letter Bounce | 揪團牆成團橫幅 | text `成團!＋口味`、`#FF7A00/#7AB800/#FFFFFF`、1.3s、loop false、manual（成團時才掛、3.4 秒後卸下） | input／事件 | 字一個一個掉下來彈兩下——script.aculo.us 式的 bounce 宣告；卸下後 HTML 文字留著，資訊不消失 |
| SHP-19 | Bubble Pop | 口味相簿頁首 | `#1E7FD6/#7AB800/#FFFFFF`、2.4s loop、intensity 1.1 | ambient | 藍綠半透明泡泡彈出又破＝光澤球體（glossy orb）的時代母題 |
| BG-B-30 | Confetti Fall | 部落格二十週年文章 | `#7AB800/#FF7A00/#FFFFFF`、7s、density 1.2 | ambient | 週年慶的彩紙，只用萊姆、橘、墨三色，在白底上 |

元件不擔任簽名動效；簽名（黃色淡出活標籤雲）是本站自製。

## 八、插畫與圖像風格（glossy-vector-icon）

- **光澤向量物件：** 每個物件由 3–6 個帶直向或徑向漸層的面組成，左上一片白色高光橢圓（opacity .4）、側面一條白色縱向反光、下方一個 7% 黑的扁橢圓接地影＋倒影。不描黑邊。
- **可愛圖示：** 18px 方格，圓角方塊或圓底＋白色符號，上半一片白光（RSS、卡車、時鐘、愛心、對話框、地圖針、月曆）。
- **頭像：** 24–56px 彩色方塊＋簡筆臉。
- 不用照片、不用寫實陰影、不用手繪筆觸。

## 九、Logo 與 Favicon

- Logo：全小寫圓體字標 `chiiz` 墨黑＋最後一個字母萊姆綠；左側（或 favicon）是萊姆綠果凍圓角方塊裡的一塊起司；下方倒影；右上角斜壓一顆橘色 `beta` 星形爆炸。見 `assets/logo.svg`。
- Favicon：60×60 圓角 14 的果凍萊姆方塊＋起司三角，inline SVG data URI。

## 十、Do & Don't

**Do**
- 白底、置中、兩欄、大字、粗體導言。
- 每一個可按的東西都是果凍；每一個剛變的東西都閃黃。
- 讓群眾出現在畫面上：標籤雲、推數、最新動態、頭像。
- 文案像 2006 年的部落格：口語、第一人稱、有具體的人名時間與價錢。

**Don't**
- 不用紫藍漸層 hero、不用深色底、不用玻璃擬態（backdrop-filter 霧面是 2020 年代的）。
- 不用「置中大標＋兩顆按鈕＋三張圓角卡片」——本站的首屏是一面活的標籤雲，步驟是一條四格的連續條，不是三張卡。
- 不用 emoji 當圖示；圖示一律自繪 SVG。
- 不用 Lorem ipsum；不寫「在當今快節奏的世界」。
- 不加 Win95 灰（那是 Web 1.0）、不加金屬鉻（那是 Y2K）、不加草地天空與水（那是 Frutiger Aero）。

## 十一、頁面骨架範例

```html
<body>
<div class="page">
 <header class="mast">
  <a class="logo" href="index.html"><span class="wordmark">chiiz<i>r</i></span><span class="wordmark" aria-hidden="true">chiiz<i>r</i></span></a>
  <span class="burst orange beta" aria-hidden="true"><svg viewBox="0 0 100 100"><path d="…burstPath()…"/></svg><span>beta</span></span>
  <div class="util">嗨，訪客！ <a href="#join" popovertarget="join">免費加入</a></div>
 </header>
 <nav class="tabs"><a href="index.html" aria-current="page">首頁<small>home</small></a><a href="jiu.html">揪團牆<small>vote</small></a></nav>
 <main id="main"><div class="cols">
  <div><section class="box"><header>此刻大家在推什麼<small>live</small></header><div class="cloud">…</div></section></div>
  <aside><section class="box signup"><p class="big">3,128</p><button class="btn" popovertarget="join">免費加入 ›</button></section></aside>
 </div></main>
 <footer class="foot">…<span class="badge80 o"><b>RSS</b><span>2.0</span></span></footer>
</div>
<div popover id="join" class="modal">…</div>
</body>
```

## 十二、技術實作與相容性

本站三項核心技術，每一項都承載一個風格特徵。

### 1. CSS typed `attr()`（C 版面與樣式層）——承載特徵⑤標籤雲與進度條

標籤雲每個字的字級、揪團牆每條進度條的寬度，CSS 直接從 `data-n`／`data-v` 讀數字算出來；JS 只改屬性，不碰 style。這就是當年標籤雲的本質——**字級是資料**。

```css
@supports (width:calc(attr(data-n type(<number>),0) * 1px)){
 .cloud a{font-size:clamp(11px,calc(9px + attr(data-n type(<number>),0) * .26px),46px)}
 .bar i{width:clamp(0%,calc(attr(data-v type(<number>),0) / 120 * 100%),100%)}
}
```

- 支援現況：typed `attr()` 由 Chrome 133（2025 年 2 月）首先出貨；Firefox、Safari 截至查證時尚未支援，MDN 標示非 `content` 屬性的用法為實驗性。查證：MDN〈attr()〉、Simon Willison〈First look at the modern attr()〉（2025-04）。
- Fallback：`CSS.supports('width','calc(attr(data-n type(<number>), 0) * 1px)')` 為假時，同一支 `setN()／setV()` 以 JS 寫入等值的 inline `font-size`／`width`（公式相同），畫面一致；`<html>` 加 `attr-js` class 便於除錯。
- 注意：jsdom 的 CSS 解析器（css-tree）不認得 `type(<number>)`，自動化測試時需先移除該 `@supports` 區塊。

### 2. Popover API ＋ `::backdrop`（D 輸入與感測層）——承載 Lightbox 燈箱與「加入揪團」對話框

`<div popover>` ＋ `popovertarget` 按鈕，免 JS 就有頂層、遮罩、Esc 關閉與 light-dismiss；開箱動畫在 `toggle` 事件裡以 WAAPI 做 Lightbox 2 式「先長寬、再長高、再淡入」。

- 支援現況：MDN 標示 Baseline 2024 Newly available；Chrome／Edge 114、Firefox 125、Safari 17。查證：MDN〈popover〉、web.dev〈Popover API lands in Baseline〉。
- Fallback：`HTMLElement.prototype.hasOwnProperty('popover')` 為假時加 `nopop` class，改用 `position:fixed` 面板＋自畫遮罩，點遮罩或 Esc 關閉，`popovertarget` 按鈕由事件代理接手。

### 3. CSS `linear()` easing（B 動效與時間軸層）——承載果凍按鈕彈回、BlindDown 超調、標籤長大

`cubic-bezier` 只能過衝一次；果凍按鈕要「縮→彈過頭→回一點→停」，需要多個控制點。

- 支援現況：MDN 標示 Baseline 2023（2023 年 12 月）；Chrome／Edge 113、Firefox 112、Safari 17.2。查證：MDN〈linear()〉、Smashing Magazine〈The Path To Awesome CSS Easing With The linear() Function〉（2023-09）。
- Fallback：`@supports (transition-timing-function:linear(0,1))` 失敗時 `--spring` 為 `cubic-bezier(.34,1.56,.64,1)`；JS 端 `CZ.SPRING` 同樣判斷。

### 效能

| 頁 | 大小（含 inline CSS／JS／motion-library 子集 35.1KB） |
|---|---|
| index.html | 約 75KB |
| jiu.html | 約 81KB |
| kouwei.html | 約 115KB（十張 SVG 相片含縮圖與大圖兩份） |
| blog.html | 約 76KB |

- 全部 ≤350KB。首屏 JS（共用腳本＋頁面腳本，不含 motion-library 掛載）在 jsdom 實測：首頁 26.4ms、揪團牆 38.8ms、相簿 13.2ms、部落格 8.4ms（jsdom 比瀏覽器慢，實機應更低），皆 <100ms；motion-library 等字型載入後才掛，離屏即 destroy。
- 同一畫面同時運轉的 canvas ≤2（首頁：Logo 一次性＋斜紋；揪團牆：轉圈＋成團時的橫幅）。
- 動畫只動 `transform`、`opacity`、`background-position`、`clip-path` 與 `font-size`（標籤雲字級為刻意的版面改變，單一字、0.6 秒）。

*建置環境無瀏覽器可截圖，動畫幀率未實測；以 jsdom 跑完整互動流程（推五次、截團、下單、加標籤、留言、加入）無錯誤。*
