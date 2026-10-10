---
name: googie-roadside-atomic
description: Googie roadside architecture of 1950s–60s Southern California (Lautner's Googies 1949, Armet & Davis coffee shops, Haskell's 1952 naming) as a web style — upswept cantilevered rooflines with no right angles, turquoise/coral/atomic-orange on Formica cream, neon script signs that ignite, changeable-letter reader boards, and sputnik starbursts with atomic orbits.
---

# Googie 路邊原子風 ‧ 翹屋頂與星芒

## 0. 血緣與定位

- **流派**：Googie（型錄「戰後與反文化」2026-10-10 新增條目，全館第 1 站）。既有流派，非自創。
- **年代地域**：美國南加州 1949–1970 前後，沿著汽車文化長出來的路邊商業建築——咖啡店、汽車旅館、加油站、保齡球館、洗車場。
- **命名**：John Lautner 1949 年設計日落大道 8100 號的 Googie's Coffee Shop（店名來自老闆 Mortimer Burton 太太 Lillian 的小名）。1952 年《House & Home》編輯 Douglas Haskell 與攝影師 Julius Shulman 路過時停車，Haskell 宣布「This is Googie architecture」，同年以〈Googie Architecture〉一文半嘲諷地命名——命名者本人並不欣賞它。
- **代表人物與作品**：John Lautner（Googie's 1949）；Louis Armet 與 Eldon Davis 的 Armet & Davis 事務所（1947 成立，Norms、Pann's、Johnie's 一系列咖啡店），事務所內的 Helen Liu Fong 負責大量室內與色彩；Wayne McAllister、Douglas Honnold；Betty Willis 1959 年的拉斯維加斯歡迎招牌（星芒＋燈泡＋草寫字）；Brooks Stevens 1950 年為 Formica 設計的 Skylark 美耐板花色（後改名 Boomerang）。研究專書：Alan Hess《Googie: Fifties Coffee Shop Architecture》1985。
- **它為什麼長成這樣**：建築要在時速 60 公里的車窗外被看見，所以屋頂翹起來、招牌比房子高、字會發光；鋼構與大片玻璃讓懸挑成為可能；1950 年代的原子能、噴射機與 1957 年後的太空競賽給了它母題（原子軌道、星芒 sputnik、迴力鏢）；霓虹管與白熾燈泡是當時最便宜的夜間廣告；美耐板、水磨石讓室內也延續同一套弧線與碎點。
- **與相鄰條目的分界**：
  - **流線摩登 Streamline Moderne**（gin-so）：1930s，水平速度線、淚滴、圓角，安靜的「速度」；Googie 是 1950s 的斜線與上翹，吵、尖、往天上飛。
  - **中世紀現代 Mid-Century Modern**：Eames／Herman Miller 的克制、木頭與有機家具、Saul Bass／Paul Rand 的平面；Googie 是它的路邊、商業、霓虹版本，不克制。
  - **太空時代 Space Age**（changfeng）：1960s 後段白色亮面艙體、Eurostile、圓頂；Googie 先於它，主角是屋頂與招牌而不是艙。
  - **港式霓虹**：那是密集街景、直排方塊字招牌疊滿天空；Googie 的霓虹是單一路牌塔上的草寫字＋星芒＋箭頭。
- **外部參照**：Douglas Haskell〈Googie Architecture〉*House & Home* 1952-02；Alan Hess《Googie: Fifties Coffee Shop Architecture》Chronicle 1985（增訂版《Googie Redux》2004）；Wikipedia "Googie architecture"、"Googie's Coffee Shop"；SAH Archipedia 的 Googie 條目；Formica Skylark（Brooks Stevens 1950）。

## 1. 設計哲學

**為車窗設計。** 每一個視覺決定都在回答同一個問題：開車經過的人，三秒內能不能看見、記住、轉進來？所以屋頂是斜的、招牌是高的、字是亮的、母題是會飛的。網頁版的翻譯：首屏就是那支路牌——店名發光、今天的價錢掛在燈箱上、箭頭指向入口。內容在屋頂底下。

這個風格是樂觀的，但不是可愛的：它的弧線都很硬（迴力鏢有尖端、星芒是棒狀），顏色飽和但少（四色＋奶油＋炭黑），只有天空可以漸層。

## 2. 本風格的 5 個不可省略特徵

### 特徵 1（形狀語彙／版面）：上翹屋頂——拒絕直角的上緣

每一個大區塊的上緣都是一條 7vw 高差的斜線，一律往外上翹（左低右高或右低左高交替），下一區塊疊在上一區塊上，看起來像一片片懸挑的屋頂板。卡片、按鈕、標籤的四角也都是斜切的多邊形；**圓角只給迴力鏢與阿米巴形**，不給矩形。

```css
.roof{position:relative;z-index:2;margin-top:-7vw;padding-top:calc(7vw + 28px);
  clip-path:polygon(0 7vw,100% 0,100% 100%,0 100%)}          /* 左低右高 */
.roof.rev{clip-path:polygon(0 0,100% 7vw,100% 100%,0 100%)}  /* 反向 */
.btn{clip-path:polygon(0 12%,100% 0,94% 100%,3% 100%)}        /* 按鈕也翹 */
```

```svg
<!-- 屋頂板＋珊瑚色簷口：一片斜板，永遠懸挑出牆 -->
<path d="M640 586 1640 404v34L640 612z" fill="#2AA7A1"/>
<path d="M640 612 1640 438v14L640 624z" fill="#F2705E"/>
```

### 特徵 2（色彩規則）：青綠＋珊瑚＋原子橘＋芥末，在奶油美耐板上；漸層只給天空

主色只有四個飽和色，地是奶油美耐板（帶迴力鏢碎紋），字是炭黑。**全站唯一允許的漸層是天空帶**（Julius Shulman 式的黃昏），且隨高雄真實時刻在白天／黃昏／夜三態切換。

```css
:root{--turq:#2AA7A1;--coral:#F2705E;--tang:#F5962A;--mustard:#E9C04A;
  --cream:#F6EEDC;--char:#222428;--sky:#1E2A4A}
html[data-phase=dusk]{--skyg:linear-gradient(180deg,#1E2A4A 0%,#5B3C6B 42%,#F2705E 78%,#F5962A 100%)}
body{background:var(--cream) url("data:image/svg+xml,...boomerang tile...");background-size:180px}
```

美耐板紋：一塊 180×180 的 SVG 平鋪，11 個迴力鏢（`<use href='#b'>` 不同角度與縮放，淡青綠／淡珊瑚／米灰）＋40 個 1–3px 碎點，以決定性亂數在建置期產生、跨邊界複製以無縫接續。迴力鏢原形：

```svg
<path id="b" d="M0 0Q6 -3 11 -1Q5 -1 0 2Q-5 -1 -11 -1Q-6 -3 0 0Z"/>
```

### 特徵 3（字體選擇）：霓虹草書＋換字燈箱字

- 店名＝霓虹管：拉丁字用 **Yellowtail**（1950s 招牌草寫），中文用 **霞鶩文楷 TC 700**（臺灣霓虹多照手寫筆順彎管，楷感比黑體對）。字的顏色由 `--lit` 決定：0＝沒通電的玻璃灰紫，1＝飽和霓虹色＋三層光暈。
- 價錢與時間＝換字燈箱：**Oswald 600** 大寫，一字一格、黑字壓在背光乳白箱上，紅字只給價錢與時間。
- 正文 Noto Sans TC 400／900。

```css
.tube{--tc:#FF5470;--lit:0;color:color-mix(in oklab,var(--tc) calc(var(--lit)*100%),#B8A9B2);
  text-shadow:0 0 calc(var(--lit)*3px) #fff8,0 0 calc(var(--lit)*12px) var(--tc),0 0 calc(var(--lit)*34px) var(--tc)}
.row b{font:600 22px/1 "Oswald";min-width:22px;height:32px;display:inline-grid;place-items:center;text-transform:uppercase}
```

### 特徵 4（版面手法）：路牌塔＋箭頭＋懸挑錯位

首屏的主角是一支豎立的路牌塔（藍綠刀片形、上端斜切、頂上一顆星芒），旁邊掛換字燈箱，底下一支會跑燈的箭頭指向入口。內容區的元件刻意錯位懸挑：吊牌掛在一根斜樑下、高低不齊；年表沿一條斜軸排；任何「置中對稱三卡」都要被打斜、錯落。

```css
.pylon .blade{background:var(--turq);clip-path:polygon(0 9%,100% 0,100% 100%,0 100%);box-shadow:inset -14px 0 0 var(--turq-d)}
.beam{height:16px;background:var(--turq);transform:rotate(-4deg)}
.tag:nth-child(3){margin-top:44px}   /* 吊牌高低錯落 */
```

### 特徵 5（裝飾母題）：星芒 sputnik＋原子軌道＋會點燈的霓虹

星芒是棒狀放射（不是三角星），長短芒交錯、中心一顆實心圓；原子軌道是兩個交叉傾斜的橢圓；霓虹管點燈有過程（見 §6 簽名動效）。三者都是程式產生，不是圖片。

```css
.burst{--n:12;--s:96px;position:relative;width:var(--s);aspect-ratio:1}
.burst i{position:absolute;inset:0;margin:auto;width:3px;height:calc(var(--s)*.5*var(--L,1));background:var(--c);border-radius:99px;
  offset-path:ray(calc(var(--i)*360deg/var(--n)) closest-side);offset-anchor:50% 100%;offset-rotate:auto 90deg}
.burst i:nth-child(even){--L:.58}
.burst::after{content:"";position:absolute;inset:0;margin:auto;width:22%;height:22%;border-radius:50%;background:var(--coral)}
```

```html
<span class="burst" style="--n:12;--s:96px;--c:#F5962A"><i style="--i:0"></i><i style="--i:1"></i>…<i style="--i:11"></i></span>
```

## 3. 色彩系統

| 色 | Hex | 用途 | 比例 |
|---|---|---|---|
| 奶油美耐板 | `#F6EEDC`（亮面 `#FBF6EA`） | 內容地色、吊牌、明信片 | 30% |
| 天空靛 | `#1E2A4A`（深 `#111833`、黃昏紫 `#5B3C6B`） | 天空帶、深色區塊 | 22% |
| 青綠 | `#2AA7A1`（深 `#17736F`、淺 `#9FD6D0`） | 屋頂、路牌塔、結構 | 16% |
| 珊瑚 | `#F2705E`（深 `#C9483B`） | 簷口、主按鈕、現用態、價錢 | 10% |
| 炭黑 | `#222428` | 正文、地坪、頁尾 | 12% |
| 原子橘 | `#F5962A` | 星芒 | 5% |
| 芥末 | `#E9C04A` | 次要吊牌、券 | 3% |
| 霓虹紅／青／黃 | `#FF5470`／`#62F0E1`／`#FFD46B` | 只給點亮的管與 LCD | ≤2% |
| 玻璃灰紫 | `#B8A9B2` | 沒通電的霓虹管 | — |
| 燈箱乳白 | `#FFE6AE` | 夜裡亮著的玻璃牆與燈箱 | — |

規則：零紫藍漸層、零玻璃擬態、零模糊卡片陰影（陰影一律硬邊實色，如明信片 `box-shadow:12px 12px 0 var(--turq)`）；漸層只在天空帶。

## 4. 字體系統

Google Fonts：`LXGW WenKai TC 700`、`Noto Sans TC 400/500/700/900`、`Oswald 500/600`、`Yellowtail`。

| 角色 | 字體 | 字級 | 行高 |
|---|---|---|---|
| 霓虹店名（中） | 霞鶩文楷 TC 700 | clamp(46px,7.6vw,96px)；直排招牌 58–86px | 1 |
| 霓虹副標（拉丁） | Yellowtail | clamp(30px,4.2vw,52px)，rotate(−6° ～ −12°) | 1 |
| H2 | Noto Sans TC 900 | clamp(30px,4.4vw,52px) | 1.05 |
| H2 上方草寫 | Yellowtail，珊瑚深 | clamp(26px,3vw,38px)，rotate(−6°) | 1 |
| 燈箱字／價錢 | Oswald 600 大寫 tnum | 22px（燈箱）、34–46px（價錢） | 1 |
| 小標 kicker | Oswald 600，字距 .28em | 12.5px | 1 |
| 正文 | Noto Sans TC 400 | 16.5px | 1.75 |

## 5. 版面與網格

- 容器 `min(1180px,100% - 40px)`。
- 區塊之間以 −7vw 疊合、7vw 斜邊（特徵 1）；每區塊底部至少 12vw padding，給下一片屋頂蓋。
- 斜角規範：屋頂 7vw 高差（約 4°）；吊牌樑 −4°；草寫副標 −6° ～ −12°；燈箱 skewY(−3°)；隧道站列 skewY(−6°)（內容反向扶正）。
- 不對稱：首屏左路牌塔＋燈箱、右建築與星芒；吊牌三欄 1.1/1/1 且高低錯落；明信片旋轉 −5°。
- ≤900px：多欄改單欄、吊牌取消錯落、導覽改底欄；≤560px：燈箱字 17px。

## 6. 動效規則（四種全有，皆有 reduced-motion 降級）

| 類型 | 本站實作 | 觸發 | 時長／曲線 | reduced-motion |
|---|---|---|---|---|
| ambient | 天空依高雄真實時刻切三態；星芒 38s 自轉；原子軌道電子 56s 一圈；箭頭跑燈 1.4s；隧道刷子轉；水滴落 | 無 | linear | 星芒、軌道、跑燈停在定格；天色照樣依時刻 |
| input | 游標經過：吊牌標題下的霓虹底線 60ms 兩段點亮、路牌星芒朝游標偏轉、隧道站名點燈；投幣格噴槍跟手、水霧粒子 | hover／pointer／鍵盤 | ≤80ms `steps(2)` | 底線直接亮、無粒子 |
| transition | 跨文件 View Transition「洗車隧道」：舊頁從左被吃進隧道（`clip-path:inset(0 0 0 100%)`）、新頁從左邊的斜縫被吹出來，同時三支青綠珊瑚刷子掃過；不支援時以覆蓋層演同一段再跳頁。換車型價目、投幣結果卡用同文件 VT | 點內部連結 | 0.62s `cubic-bezier(.6,0,.8,.4)`／0.7s `(.2,.7,.2,1)` | 直接換頁 |
| signature | **冷管點火 cold-strike**：每支霓虹管依接線順序點燈——電極端先發紅、隨機 1–3 次跳火、顏色從玻璃灰紫爬到全飽和；每支管的跳法由「日期＋管序」雜湊決定，同一天每次一樣、隔天不同。日落前 10 分鐘自動點燈 | 載入（非白天）／按「點燈」 | 1.1–1.8s，delay＝序號×0.16s | 直接全亮或依時刻全暗 |

```css
@property --lit{syntax:'<number>';inherits:true;initial-value:0}
@keyframes strikeB{0%{--lit:0}20%{--lit:.16}21%{--lit:.9}23%{--lit:.05}30%{--lit:.9}33%{--lit:.1}62%{--lit:.18}63%{--lit:.7}100%{--lit:1}}
.tube.strike-b{animation:strikeB var(--dur,1.5s) linear var(--d,0s) both}
```

自我限制：本站**不用**淡入、滾動揭示、數字計數。

## 7. 插畫與圖像風格：atomic-kit 原子圖件組

所有圖像只用五種原語組成：**斜屋頂板**（細長四邊形＋簷口色帶）、**迴力鏢柱／迴力鏢紋**、**星芒**（棒狀放射）、**原子橢圓**、**霓虹管**（等寬圓頭線＋電極點）。平塗、零描邊（除霓虹管本身）、零漸層、零陰影；建築一律側立面或正立面、零透視。車子與人物以同樣平塗剪影表達（1960 年代尾鰭轎車：珊瑚車身、奶油車頂、白邊胎、一條鍍鉻腰線）。

## 8. Logo 與 Favicon

- Logo（`assets/logo.svg`）：一片上翹屋頂板當底線，左上一顆 12 芒星芒，星芒後拖三束長短不一的刷毛（掃帚星＝彗星），右側霞鶩文楷「掃帚星洗車」＋Yellowtail「Comet Car Wash」斜 −6°。
- Favicon：青綠斜切方塊＋原子橘八芒星＋珊瑚圓心，inline SVG data URI。

## 9. 元件配方

- **導覽 atom-orbit 原子軌道**：右上 236×150，中心一顆自轉星芒，兩條 ±28° 傾斜橢圓，四個電子＝四頁，位置以 CSS `cos()`/`sin()` 從 `@property --t` 即時算出；hover／focus 暫停公轉，現用頁電子變珊瑚並發光。≤900px 改為底部四格斜切欄。
- **按鈕**：迴力鏢切角多邊形，hover 換原子橘並上移 2px，active 下壓 1px。
- **吊牌**：奶油底、頂部一條彩色斜帶、Oswald 大價錢、標題下藏一支霓虹底線。
- **換字燈箱**：黑框＋青綠外框、乳白底，夜裡背光；一字一格，紅字只給價錢時間；每天依日期自動換字並逐字「掛上」。
- **表單／遊戲面板**：青綠搪瓷機殼、深藍 LCD（Oswald 霓虹黃數字）、圓形旋鈕以星芒當指針，四段模式按鈕。
- **頁尾**：炭黑、上緣反向上翹，Yellowtail 珊瑚簽名。

## 10. Do & Don't

**Do**：讓屋頂翹起來；讓招牌比內容先被看見；星芒用棒狀、長短交錯；霓虹要有「沒通電」的狀態；價錢掛在燈箱上；漸層只給天空。

**Don't**：紫藍漸層 hero；置中大標＋兩顆按鈕＋三張圓角卡；玻璃擬態；emoji 當 icon；把星芒畫成五角星或三角星；用 Space Age 的白色艙體與 Eurostile；把流線摩登的水平速度線拿來當主角；Lorem ipsum；「EST. 19xx」徽章；每個區塊都淡入。

## 11. 頁面骨架範例

```html
<header class="sky open">
  <svg class="scene" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice"><!-- 屋頂板、玻璃牆、迴力鏢柱、地坪 --></svg>
  <div class="pylon"><span class="blade"></span>
    <h1><span class="zh tube" data-seq="4">店名</span><span class="lat tube t" data-seq="5">Car Wash</span></h1></div>
  <div class="panel"><div class="board"><p class="row" aria-label="隧道機洗 NT$250"><b>隧</b><b>道</b>…</p></div></div>
</header>
<main>
  <section class="roof slab"><div class="wrap"><h2 class="h2"><span class="s">three ways</span>三種洗法</h2>…</div></section>
  <section class="roof" style="background:var(--sky);color:var(--cream)">…</section>
</main>
<footer class="foot">…</footer>
```

## 12. 技術實作與相容性

| 技術 | 用途 | 支援現況（查證） | Fallback |
|---|---|---|---|
| **CSS `@property` 型別化自訂屬性**（B 層） | `--lit <number>` 驅動霓虹色 `color-mix()` 與光暈半徑的補間（冷管點火、霓虹底線）；`--t <angle>` 讓原子軌道公轉；`--tilt <angle>` 讓星芒追游標 | Chrome/Edge 85+、Safari 16.4+、Firefox 128（2024-07）起全支援；web.dev〈New to the web platform in July 2024〉 | 未註冊時 `--lit` 不補間：管子直接從暗跳到亮（跳火感仍在，因關鍵影格本來就是陡變）；軌道不轉、電子停在初始位置仍可點 |
| **跨文件 View Transitions**（B 層） | `@view-transition{navigation:auto}`＋`::view-transition-old/new(root)` 演「洗車隧道」；`pagereveal` 時補三支刷子覆蓋層；同文件 `startViewTransition` 用在換車型價目與投幣結果卡 | Chrome/Edge 126+、Safari 18.2+；Firefox 跨文件未支援（Chrome for Developers〈Cross-document view transitions〉） | 偵測 `'onpagereveal' in window`；不支援時攔截內部連結，播 470ms 刷子覆蓋層後 `location.href` 跳頁，新頁以 sessionStorage 旗標補播出隧道；reduced-motion 直接跳頁 |
| **CSS 三角函數 `cos()`/`sin()`＋`offset-path: ray()`**（C 層） | 星芒的每一芒以 `ray(calc(i*360deg/n) closest-side)` 放射定位、`offset-rotate:auto 90deg` 轉向；原子軌道電子位置以傾斜橢圓參數式 `x=cos a·rx·cos φ − sin a·ry·sin φ` 直接寫在 `translate` | `sin()`/`cos()` Baseline 2023（MDN）；`ray()` Baseline 2024：Chrome 116+、Firefox 122+、Safari 16+（caniuse mdn-css_properties_offset-path_ray） | `@supports not (offset-path:ray(0deg closest-side))` 時改用 `transform:rotate()`＋`transform-origin:50% 100%` 排同一顆星芒；三角函數不支援的瀏覽器（2023 前）在 ≤900px 斷點本來就改用靜態底欄 |
| Canvas 2D（輔助） | 投幣格的四相表面場（泥／預浸／泡沫／水蠟，120×42 格）以 `putImageData` 畫到小畫布、放大到 960×330 後用 `destination-in` 以車身 `Path2D` 裁切；水蠟星芒與水霧粒子 | 全瀏覽器 | `<noscript>` 給完整規則與價目 |

**效能實測（建置後檔案）**：index 53 KB、menu 48 KB、bay 54 KB、story 45 KB（皆含全部 inline CSS/JS/SVG，遠低於 350 KB）。首屏 JS 只做一次日落計算（O(1)）、燈箱 5 行重排與 ≤12 支管的 class 指派，屬毫秒級工作量（本次無實機瀏覽器，未取得 Performance 面板實測值）。主要動畫全部是 CSS（`--lit`／`--t`／`rotate`／`clip-path`），不觸發 layout；投幣格每幀 5,040 格運算＋一次 `drawImage`，閒置且無水蠟時停止重繪。

**驗證方式**：四頁 inline script 逐檔 `node --check`；以 jsdom 載入四頁確認零執行期錯誤、燈箱依日期換字、日落時刻（2026-10-10 高雄以 NOAA 簡化式計算為 17:36）、投幣→計時→時間到→結果卡流程走通；表面場模型另以 Node 原型驗證順序依存（全程照順序：乾淨度 70%／亮度 52%；只沖清水：乾淨度 7%）。本次建置環境沒有可用的瀏覽器引擎，未做實機截圖，CSS 渲染細節依規格撰寫。
