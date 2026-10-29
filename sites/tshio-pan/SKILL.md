---
name: lubok-hand-colored-woodcut
description: Russian lubok popular-print style — a crude black woodcut key block, four tempera colours swabbed on by hand off-register and over the lines, captions crammed into every gap between figures, a ruled single-sheet frame with lettered legend, and carnival-inversion animal processions.
---

# Lubok 俄羅斯民間木刻版畫 Лубок · Russian Popular Print

> 這是一份風格規格書。讀完它，你應該能做出一個和 Demo（笑版仔租書店，嘉義的漫畫租書店）不同產業、但一眼看得出是同一個流派的網站。
> **本流派為既有設計史流派，非自創。**
> 血緣：lubok（лубок，複數 lubki）是俄羅斯民間版畫，十七世紀後半在莫斯科流行，作坊集中在尼古拉街（Nikolskaya）一帶，賣給市集上的平民，掛在農舍與客棧牆上。名字來自刻版用的板子（lub，韌皮層）。早期是木刻，1692–96 年的 Koren〈圖畫聖經〉定下了最常見的樣子；十八世紀中後期多改為銅版雕刻與蝕刻，十九世紀中改石印。**印出來的只有黑線，顏色是事後以稀釋的蛋彩一張張手刷**，色塊總是對不準、溢出線外，卻比黑線本身亮得多。圖文一體：題目、順口溜、編號圖說，空處就塞字。連續成套的 lubki 被視為連環漫畫的前身。到 1914 年一年三萬兩千種、一億三千萬張。代表作〈Мыши кота погребают 眾鼠葬貓〉（1760 年代，手染木刻；一說諷刺彼得大帝之死，近年研究多讀為狂歡節式的「顛倒世界」），〈喀山貓〉。
> 參考：D. A. Rovinsky《Русские народные картинки》（1881，分類目錄）；The Public Domain Review〈D. A. Rovinskii's Collection of Russian Lubki〉；Wikipedia〈Lubok〉；A. Pletneva〈Kogo khoronyat myshi〉《Slověne》2021。

---

## 一、設計哲學

lubok 是**便宜、熱鬧、給人看懂的**。一塊黑版要印幾千張，上色工一張刷幾秒，所以：線粗、形狀簡單、顏色是一團一團的、對不準也沒關係；畫面要講故事，故事要寫在畫上。它不是精緻的書籍插畫——它是市集攤子上的招貼、農舍牆上的笑話。

網站上的翻譯：
- **黑版是骨架，顏色是事後的**。所有圖分兩層：黑版（線＋實心黑塊＋刻出來的白線）與四張上色層。上色層一律 `mix-blend-mode:multiply` 疊在黑版上面、且各自偏離 3–8px。
- **字是畫的一部分**。題記不放在圖下面的說明框，而是塞進人物之間的空隙，繞著頭、手、號角排；剩下的縫補小花。
- **一頁就是一張版**。有雙線外框、有題目帶、有地線；版上的人物用字母編號（А Б В Г…），版外附一份圖說。
- **顛倒世界**。動物穿袍子做人的事、老鼠扛貓、大小對調——幽默是內容，不是點綴。

## 二、色彩系統

| 角色 | Hex | 用途 | 約略占比 |
|---|---|---|---|
| 紙 paper | `#F3EEE2` | 版面（未印處） | 40% |
| 牆 wall | `#E9E1CE` | 版外的頁面地色 | 20% |
| 墨 ink | `#1D1916` | 黑版：線、實心塊、正文 | 22% |
| 朱 сурик | `#CC3A24` | 袍子、熊、雞冠、現用狀態 | 6% |
| 黃 охра | `#E5AE2F` | 貓、燈火、號角、hover | 6% |
| 綠 зелень | `#4F8B44` | 雪橇、草、袍襬 | 3% |
| 莓 малина | `#A13066` | 耳朵、書皮、最後一筆 | 3% |

規則：
1. **只有四罐色**，不調中間色、不出淡版。要更多變化就換「哪一罐」，不是換深淺。
2. 上色層一律 multiply，所以色塊壓到黑線上時黑線仍是黑的；兩色重疊會出現髒的第三色——這是允許的，正是手刷的痕跡。
3. **零漸層、零陰影、零發光、零透明調色**（multiply 不算透明）。
4. 紙不是米白奶油色：偏冷一點的粗紙 `#F3EEE2`，大面積留紙色——上色工不會把背景塗滿。
5. 版外的頁面（牆）比紙深一階，讓「一張版」的邊界永遠清楚。

## 三、字體系統

| 用途 | 字體（Google Fonts） | 字重 | 尺寸 |
|---|---|---|---|
| 版上大題目、段落標題 | Noto Serif TC | 900 | 52px（版內邏輯尺寸）／34px（段落）／20px（格內） |
| 題記、正文、按鈕 | LXGW WenKai TC | 400／700 | 正文 17px／1.75；題記 700、行高 1.3、字級由求解器決定 |
| 俄文副題、字母編號、小標 | Ruslan Display | 400 | 13–34px，字距 .12–.16em |

- 題記用楷體粗字，像手刻的字；**不用無襯線**。
- 俄文副題用舊正字法（詞尾硬音符 ъ，如「ЛУБОКЪ」「НА САНЯХЪ」），一律大寫、拉字距。
- 編號用西里爾字母依序（А Б В Г Д Е Ж），lubok 的圖說就是這樣標。
- 題記字級：在空隙裡二分搜尋最大字級，**剛好塞滿、不溢出、不留白**（見第九章）。

## 四、版面與網格

- 「版」是固定邏輯尺寸的盒子（Demo：1000×640、900×600），內容以 px 絕對定位，外框用 `transform:scale()` 整張縮放到容器寬度。版的外框 `border:3px` + `outline:2px; outline-offset:5px` 做雙線；版內再畫一圈 5px + 2px 的雙線。
- 版內分三帶：**題目帶**（上 1/6，下方雙線）→ **天空帶**（題記）→ **地線**（黑色實帶，上面刻白色草叢 `/\` 紋）。人物腳一律踩在地線上，不做透視、不做前後景。
- 人物排成一列「遊行」，正面或正側面，彼此不重疊或只輕微重疊。
- 版外的頁面是普通的報刊網格：圖說兩欄、內容兩欄 1.1fr／1fr、系列小格四欄（lubok 連環）。
- 手機 ≤560px：版照樣整張縮小（變成一張可看的圖），**所有資訊都另外寫在版外的圖說**，零損失。
- 不旋轉、不歪斜；粗糙感來自形狀與錯版，不是來自傾斜排版。

## 五、元件配方

**刷色（.sw）**——任何需要強調的字或標籤後面墊一塊錯版的色：
```css
.sw{position:relative;isolation:isolate}
.sw::before{content:"";position:absolute;inset:-3px -6px;z-index:-1;background:var(--swc,#CC3A24);
 transform:translate(4px,-3px);mix-blend-mode:multiply;
 clip-path:polygon(2% 12%,14% 0,38% 6%,61% 1%,86% 5%,100% 18%,97% 47%,100% 80%,88% 100%,60% 93%,33% 100%,9% 94%,0 70%,3% 40%)}
```
**導覽（飄帶題籤 banderole）**——三格接成一條木刻緞帶，兩端燕尾；現用頁那格被刷朱紅，下方掉一個黑色三角；其餘頁只有黑版，hover 刷黃。
```css
.band a{border:3px solid #1D1916;margin-left:-3px;background:#F3EEE2}
.band a:first-child{clip-path:polygon(14px 50%,0 0,100% 0,100% 100%,0 100%)}
.band a:last-child{clip-path:polygon(0 0,100% 0,calc(100% - 14px) 50%,100% 100%,0 100%)}
.band a[aria-current]::before{content:"";position:absolute;inset:4px 6px;background:#CC3A24;transform:translate(3px,-2px);mix-blend-mode:multiply;clip-path:polygon(3% 14%,22% 0,51% 8%,77% 0,98% 12%,94% 52%,100% 86%,72% 100%,44% 92%,16% 100%,0 76%,4% 42%)}
```
**按鈕**：黑底紙字、3px 黑框、四角各偏 2–4% 的不規則 clip-path；hover 變朱底墨字；次按鈕紙底，hover 刷黃。零圓角零陰影。
**卡片／格**：沒有卡片。用「月曆格」：外框雙線，格與格之間 2px 黑線，格內左圖右字。篩選時不符的格把上色層拿掉（`opacity:0`，steps(4)）只剩黑版——**「沒上色」就是 lubok 的停用狀態**。
**表單**：2px 黑框、紙底、楷體粗字、零圓角；checkbox `accent-color:#CC3A24`。
**圖說（legend）**：`<ol>`，每列左邊一個 Ruslan Display 大字母、右邊標題＋內文，下緣 2px 黑線；與版上同字母的編號圓章雙向連動。
**頁尾**：上緣 4px double 黑線，三欄；必有地址、時間、電話與「虛構示意」聲明。

## 六、動效規則

四種動效各有本站自製的實作：

| 種類 | 實作 | 觸發 | 時間／easing | reduced-motion |
|---|---|---|---|---|
| ambient | 遊行：鼠、熊、雞一上一下走路；睡貓呼吸、「呼」字一上一下 | 持續（離屏即停） | LB.ambient 每 150ms 算拍子：走路 .9s 兩拍、呼吸與呼字 2.8s 兩拍，拍子變了才換 `.up` class（離散兩拍＝steps(2)） | 停在原位，「呼」字常駐 |
| input | 兔腳刷游標跟隨（0ms）＋點一下留一滴蛋彩（輪流四色，multiply，最多 24 滴）；版上人物 ↔ 圖說同字母連動（圓章轉朱並放大 1.25） | pointermove／pointerdown／hover／focus | 即時；圓章 .1s steps(2) | 照常（使用者自己在動） |
| transition | 揭紙換頁：一張紙由下往上鋪滿（中央一個「笑」字），下一頁再由下往上揭起 | 站內連結 click | 380ms／460ms `steps(8,end)` | 不攔截連結，直接換頁 |
| **signature** | **四色接力 raskraska relay**：黑版先「壓」下來（-22px→+3px→0），接著朱、黃、綠、莓四位上色工依序以兔腳刷從左掃到右，每色 16 下 `steps(16)` 的 clip-path 揭開，刷子跟著跳 | 首頁與印版頁載入、按「開印」 | 黑版 560ms；每色 980ms、間隔 140ms；總長約 5.2s | 一次 `seek(total)` 直接停在印好的樣子 |

自我限制：**不用淡入淡出、不用 ease 的平滑位移**——lubok 是一下一下刷出來的，所有時間函數都是 steps()。

### motion-library 元件表（PLAYBOOK §2.8）

來源：`wenxiangxiao/motion-library` 1.22.0 @33746389；每頁以 `tools/ml-embed.js` 抽子集 inline 為第一個 `<script>`，`tools/ml-smoke.js` smoke ok。出處：`MotionLib.prompt(id)`。

| ID | 名稱 | 頁 | 參數 | 種類 | 承載什麼／為什麼適合 |
|---|---|---|---|---|---|
| BG-B-24 | Crosshatch | 首頁〈四婆上色〉 | primary `#1D1916`、secondary `#A13066`、bg `#F3EEE2`；duration 10、density 1.1、intensity 1、seed 1692、16:9 | ambient | 「刻刀走過的地方」：兩向斜線緩慢交錯＝lubok 十八世紀改銅版後的排線陰影；只有直線、零漸層零發光 |
| BG-A-23 | Comic Sky | 書架曆「本週新到」 | primary `#E5AE2F`、secondary `#F3EEE2`、bg `#1D1916`；duration 14、seed 3 | ambient | 黃地上旋轉的放射楔＋圓團雲＝lubok 天上的光芒與雲朵、也是漫畫的「新到」；平塗、零漸層 |
| BG-A-07 | Random Pop Dots | 書架曆「門口花圃」 | primary `#CC3A24`、secondary `#4F8B44`、bg `#F3EEE2`；duration 6、density 1.4、intensity .8、seed 21 | ambient | 朱與綠的圓點一顆顆冒出又收回＝lubok 填縫的小花小點；實心圓、零漸層 |
| BG-B-30 | Confetti Fall | 印一張「出版囉」 | primary `#CC3A24`、secondary `#4F8B44`、bg `#F3EEE2`；duration 8、density .8、seed 1914 | transition（開印完成時 replay） | 市集謝肉節（Масленица）的紙花＝lubok 的節慶題材；平塗矩形、只用本站四色＋墨 |

掛載規則：等 `document.fonts.ready`；IntersectionObserver 進視窗才 mount、離屏 `destroy()`；canvas `aria-hidden`；容器內保留 `.ml-fb` HTML 標題，掛載成功才視覺隱藏；reduced-motion 時背景 `seek(.35)` 停格。同一畫面同時運轉 ≤2 個。元件不擔任 signature。

## 七、插畫與圖像風格：黑版＋四張上色層

- 每個形先畫**紙白填色＋4px 墨線**（遮住後面的線），黑色的部分（靴、腰帶、貓紋、地線）是**實心黑塊**，上面再用 1.4–2.4px 的紙色線「刻」出白線（木刻的刀痕）。
- 線寬 4px 為主、細節 2–2.6px、鬍鬚 1.6px；`stroke-linecap:round`。
- 上色層與黑版用**同一份幾何**，但：每塊色多描 6px 同色邊（溢出線外）、整層過一道 `feTurbulence`＋`feDisplacementMap scale 9` 的 rag 濾鏡（邊緣不齊）、四色各自依種子偏離黑版 3–8px（錯版）。
- 人物是組件：一個「穿袍子直立的獸」身體（袍、腰帶、靴、袖）＋四種頭（鼠、貓、熊、公雞）＋五種道具（書、燈、鼓、號、繩）。每個組件同時輸出黑版片段、四色片段與**外框多邊形**（給題記繞排用）。
- 空處用「一莖三瓣」小花填。

## 八、Logo 與 Favicon

圓章：雙線圓框（外 4px、內 2px 虛線），中間一顆木刻貓頭（紙白＋墨線＋黑三角額紋），黃色上色層 multiply 且向右上錯 3px，下緣一道朱色弧。Favicon 為同一顆貓頭的 64×64 簡化版（黑實心頭、黃色臉錯版、朱線），inline SVG data URI。

## 九、Do & Don't

**Do**：字塞滿空隙；顏色錯版；用字母編號＋圖說；人物踩同一條地線；故事寫在畫上；幽默。
**Don't**：
- 不要平滑漸層、陰影、發光、毛玻璃、圓角卡片。
- 不要把顏色精準填在線內——那是著色本，不是 lubok。
- 不要留大片空白天空；不要把文字放到圖片下方的說明框。
- 不要細線描（thin line art）或向量扁平插畫的均勻線寬。
- 不要用無襯線現代字體做題記；不要 emoji icon、Lorem ipsum、紫藍漸層、置中三卡片、EST. 徽章。
- 不要照抄〈眾鼠葬貓〉的構圖——用它的語法（遊行、顛倒、編號）講你自己產業的故事。

## 十、頁面骨架範例

```html
<div class="sheet" data-w="1000" style="aspect-ratio:1000/640">
 <div class="in" data-w="1000" data-h="640" style="width:1000px;height:640px">
  <svg class="ly ly-k" viewBox="0 0 1000 640"><!-- 黑版：框、地線、人物線與黑塊 --></svg>
  <svg class="ly ly-c ly-r" viewBox="0 0 1000 640" style="transform:translate(4px,-3px)">
   <filter id="rag-r"><feTurbulence type="fractalNoise" baseFrequency=".04" numOctaves="2" seed="3"/><feDisplacementMap in="SourceGraphic" scale="9" xChannelSelector="R" yChannelSelector="G"/></filter>
   <g filter="url(#rag-r)" fill="#CC3A24" stroke="#CC3A24" stroke-width="6"><!-- 朱色塊 --></g></svg>
  <!-- .ly-y .ly-g .ly-m 同上 -->
  <h1 class="tt" style="left:42px;top:34px">眾鼠扛貓還書圖<small>КАКЪ МЫШИ КОТА НА САНЯХЪ ВЕЗЛИ</small></h1>
  <div class="cap" style="left:36px;top:130px;width:604px;height:282px">
   <i class="gf gl" style="width:160px;height:282px;shape-outside:polygon(0 0,0 0,…,0 282px)"></i>
   <p><b class="n">А</b>店貓阿肥睡了三天三夜……</p></div>
  <span class="tagn" style="left:520px;top:454px">А</span>
 </div>
</div>
<ol class="legend"><li data-n="А"><b>А</b><div><h3>店貓阿肥</h3><p>……</p></div></li></ol>
```

## 十一、本風格的 5 個不可省略特徵

拿掉任何一項，就不是 lubok 了。

### ① 木刻黑版：粗線、實心黑塊與刻出來的白線
```svg
<path d="M34 72Q60 63 86 72L102 164Q60 173 18 164Z" fill="#F3EEE2" stroke="#1D1916" stroke-width="4" stroke-linejoin="round"/>
<path d="M26 107L94 107L96 118L24 118Z" fill="#1D1916"/>
<path d="M31 112.5L89 112.5" stroke="#F3EEE2" stroke-width="2" stroke-dasharray="2 5" stroke-linecap="round"/>
```

### ② 手刷四色、錯版、溢線（multiply）
```css
.ly-c{position:absolute;inset:0;mix-blend-mode:multiply}
.ly-r{transform:translate(4.2px,-3.1px)} .ly-y{transform:translate(-3px,4px)}
.ly-g{transform:translate(5px,2px)}     .ly-m{transform:translate(-4px,-2px)}
```
```svg
<g filter="url(#rag)" fill="#E5AE2F" stroke="#E5AE2F" stroke-width="6" stroke-linejoin="round">…同一份幾何…</g>
```

### ③ 圖文一體：題記塞進人物之間的空隙（shape-outside）
```css
.cap{position:absolute;overflow:hidden;font:700 22px/1.3 "LXGW WenKai TC",serif}
.cap .gl{float:left;shape-margin:4px}  /* polygon 由左側人物外框逐列求出 */
.cap .gr{float:right;shape-margin:4px} /* polygon 由右側人物外框逐列求出 */
```
字級：`for(14 次){m=(lo+hi)/2; cap.style.fontSize=m+'px'; p.offsetHeight<=H ? lo=m : hi=m}`。

### ④ 一張版：雙線外框、題目帶、黑地線、字母編號與圖說
```css
.sheet{border:3px solid #1D1916;outline:2px solid #1D1916;outline-offset:5px;background:#F3EEE2}
.tagn{width:34px;height:34px;border-radius:50%;background:#1D1916;color:#F3EEE2;font:400 19px/34px "Ruslan Display"}
```
```svg
<path d="M22 588H978V616H22Z" fill="#1D1916"/>
<path d="M34 608L39 596L44 608M48 602L52 594" stroke="#F3EEE2" stroke-width="2" fill="none"/>
```

### ⑤ 狂歡顛倒的動物遊行＋填縫小花
動物穿袍做人事、排成一列向同一方向走；「顛倒」開關讓老鼠變大、貓熊變小。空處補一莖三瓣小花：
```svg
<path d="M12 30Q12 18 12 10" stroke="#1D1916" stroke-width="2.4" fill="none"/>
<circle cx="12" cy="7" r="5" fill="#F3EEE2" stroke="#1D1916" stroke-width="2.4"/>
<!-- 上色層：<circle cx="12" cy="7" r="6" fill="#CC3A24"/> 錯版疊上 -->
```

## 十二、技術實作與相容性

| 技術 | 層 | 在本站承載什麼 | 支援現況與查證來源 | fallback |
|---|---|---|---|---|
| CSS Shapes：`shape-outside: polygon()`＋`shape-margin` | C 版面 | 特徵③：題記繞著人物外框排進空隙；polygon 由組件外框逐列（6px）掃描線求交得出，左側障礙推成 float-left、右側推成 float-right；首頁在建置期算好（無 JS 也繞排），印版頁在輸入時即時重算，再以二分搜尋字級剛好填滿 | MDN〈shape-outside〉〈shape-margin〉：Baseline Widely available；web-features explorer 記 widely available 2022-07-15；caniuse〈shape-outside: polygon()〉Firefox 62+／Edge 79+ | 不支援時 float 為矩形，文字仍排在空隙旁、不會壓到人物（float 寬度已取最大值） |
| SVG filter `feTurbulence`＋`feDisplacementMap`＋CSS `mix-blend-mode:multiply` | A 渲染 | 特徵②：四張上色層各自 rag 濾鏡（邊緣不齊）、錯版位移、multiply 壓在黑版上 | MDN〈mix-blend-mode〉Baseline Widely available（web-features：2022-07-15）；SVG filter primitives 全瀏覽器支援 | 不支援 blend 時色層在黑版之上但為不透明平塗，黑線被色蓋住一點；資訊不受影響 |
| Web Animations API 群組時間軸（同一 document timeline 上以 delay 排列的 Animation 陣列；`currentTime` 整組 seek；`Animation.finished` Promise.all） | B 動效 | signature 四色接力：黑版壓下＋四色 clip-path inset steps(16)＋刷子路徑，一個 `seek(total)` 停在任何時刻；reduced-motion 直接 seek 到底 | MDN〈Animation〉、〈Animation.finished〉（Baseline 2022 起新近可用，部分 MDN 譯本標為 widely available）；clip-path `inset()` 可動畫 | `!el.animate` 時不動畫，版面原樣全彩顯示（無 JS 即最終狀態） |

輔助：`Intl.DateTimeFormat('zh-TW-u-ca-roc')` 寫民國年、`timeZone:'Asia/Taipei'` 判斷營業中；FNV-1a＋xorshift32 決定錯版位移與版號（同樣的輸入永遠同一張版）；`?s=` base64url 序列化可分享；下載 SVG 時以 `Range.getBoundingClientRect()` 取得瀏覽器排好的每一個字的位置寫成 `<text>`。

效能實測（headless Chromium 1280×900，軟體算圖 SwiftShader，非 GPU；本機 2026-10-29）：index.html 309KB／shelf.html 335KB／press.html 271KB（皆含約 222KB motion-library 子集，≤350KB）。responseEnd→DOMContentLoaded：index 108ms、shelf 50ms、press 112ms（含 222KB 子集解析；kit＋runtime＋組版本身約 20ms 量級）。閒置 rAF：press 60fps、shelf 61fps；index 第一版以 CSS steps() 動畫驅動遊行時只有 20fps（Chromium 對執行中的 SVG 動畫每格重繪、四張 rag 濾鏡層跟著重算），改為 LB.ambient 每 150ms 判斷拍子、只在拍子改變時換 class 後為 48fps（軟體算圖；拍子改變那一格才重算濾鏡）。接力動畫只改 clip-path 與 transform；印版頁輸入以 120ms debounce 重組版面＋14 次字級二分。
