---
name: shanghai-yuefenpai-calendar-poster
description: Shanghai yuefenpai calendar posters (1910s–1940s) — a soft "rubbed charcoal + watercolour" (cabi shuicai) beauty with no outlines set inside an arched painting window and a gilt meander frame, flanked by twelve months of combined Western/lunar calendar with solar terms, a shop name in shadowed decorative Chinese lettering on top, the product painted into the scene, and the whole sheet hung between two tin rods with a tear-off day pad.
---

# 上海月份牌 Shanghai Yuefenpai — 擦筆水彩中西月份牌

> 這是一份風格規格書。讀完它，你應該能做出一個和 Demo（時興鐘錶行，大稻埕鐘錶修理）不同產業、但一眼看得出是「月份牌」的網站。
> **本流派為既有設計流派，非自創。**血緣：清末到 1940 年代上海、香港的商業贈品廣告畫。洋行、藥房、煙草公司年底把印了下一年國曆農曆的畫送給顧客，掛在家裡與店裡一整年。
> - 1884 年屈臣氏（A.S. Watson & Co.）為 1885 年印製的中英文月曆畫被視為第一張商業月份牌；邊框是花卉與鹿、鶴、雞、猴。
> - 鄭曼陀早年在杭州二我軒照相館以炭精粉擦繪放大人像，到上海後把同一套方法用在時裝美女：**先以炭精粉擦出明暗，再罩透明水彩**——「擦筆水彩」。他掛在張園的四幅畫被黃楚九買下做中法大藥房廣告，畫法自此風行。
> - 杭穉英（1900–1947）的穉英畫室接手擦筆法並把色彩做得更亮，與金雪塵、李慕白合作量產；香港關蕙農（廣生行「雙妹嚜」）被稱為「月份牌大王」。謝之光 1930 年〈兩美園中〉等作品把 Art Deco 的框與字帶進月份牌。
> - 1949 年後月份牌被年畫與宣傳畫取代，文革時被列為「四舊」。
> 參考：TheCollector〈Yuefenpai: 8 Facts About the Iconic Chinese Calendar Advertisements〉（2024）；澎湃新聞 2020 震旦博物館「民・潮」展報導（以灯片疊層演示擦筆水彩工序）；搜狐〈郑曼陀，开创月份牌画的新时代〉；chineseposters.net 畫家條目（倪耕野、吳少雲）；British Museum 藏品 A 1993,0813.

---

## 一、設計哲學

月份牌是**一張要被掛一整年的廣告**。它有兩個主人：畫裡的美人負責讓人想掛它，四周的日曆與商號負責讓它有用、讓人記住是誰送的。所以它永遠是「中央一幅柔軟的畫＋四周一圈硬的資訊」：畫越軟（擦筆、無線、粉嫩），框與字就越硬（描金回紋、美術字、密密的日曆格）。

數位化時保留這個張力：**畫面主體零線條、全是漸層；資訊層全是硬邊、格子與字**。不要把兩者混在一起——資訊不進畫裡，畫不出框外。

月份牌也是**物件**：上下兩條鐵皮軸、一條吊繩、一枚釘子，底下常釘一本可以撕的日曆。網站要讓人感覺到「這張紙是掛在牆上的」。

## 二、本風格的 5 個不可省略特徵

拿掉任何一項，它就變成「旗袍插畫」或「復古海報」，不再是月份牌。

### ① 擦筆水彩：零輪廓線的炭精明暗＋透明淡彩

膚與衣沒有任何描邊；形的邊界由**剪裁**決定（硬），形的內部由**模糊的暗塊與受光塊**決定（軟）。先擦灰（暗部），再罩色（底色＋胭脂）。眼、眉、唇是唯一的「線」。

```svg
<filter id="rub" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="7"/></filter>
<clipPath id="face"><path d="M156,124C158,106 176,98 194,104C210,110 216,130 214,150C212,174 200,194 182,198C166,198 156,184 153,164Z"/></clipPath>
<g clip-path="url(#face)">
  <rect x="140" y="96" width="90" height="110" fill="#F3D5C3"/>          <!-- 膚底 -->
  <g filter="url(#rub)">                                                 <!-- 模糊只在剪裁內 → 內軟外硬 -->
    <ellipse cx="214" cy="160" rx="14" ry="44" fill="#C58E7A" opacity=".9"/> <!-- 背光側暗部 -->
    <ellipse cx="166" cy="146" rx="11" ry="22" fill="#FFF3EA" opacity=".9"/> <!-- 受光 -->
    <circle cx="165" cy="166" r="11" fill="#EC8C8A" opacity=".6"/>           <!-- 胭脂 -->
  </g>
</g>
```
規則：`clip-path` 掛在外層 `<g>`、`filter` 掛在內層 `<g>`，順序反了邊緣就會糊掉。光源固定左上；暗部放形的右側與下緣。

### ② 畫心＋描金回紋框：拱頂畫窗、四角扇飾

畫永遠被框住：外圈回紋（墨綠地描金），內圈拱頂畫窗（上緣大圓角），兩層金線分隔。

```css
.art{padding:16px;background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Crect width='24' height='24' fill='%238E2A30'/%3E%3Cpath d='M2 22V2h20v16H6V6h12v8H10v-4h4' fill='none' stroke='%23D8B967' stroke-width='2'/%3E%3C/svg%3E") 0 0/24px;
     box-shadow:inset 0 0 0 3px #D8B967,0 0 0 2px #1F4A3C}
.art .arch{border-radius:50% 50% 0 0/17% 17% 0 0;overflow:hidden;box-shadow:0 0 0 3px #D8B967,0 0 0 6px #1F4A3C}
```

### ③ 中西合曆：國曆＋農曆＋節氣，十二個月一張不少

每個日格兩行：上行國曆數字（週日紅），下行農曆日（初一改寫月名、節氣日改寫節氣並印紅）。月標頭同時寫中文月名、英文縮寫、當月兩個節氣日。民國紀年與干支並列在最上方。

```html
<td data-d="2027-02-06"><b>6</b><i class="lm">正月</i></td>   <!-- 初一寫月名 -->
<td data-d="2027-03-06"><b>6</b><i class="tm">驚蟄</i></td>   <!-- 節氣：紅 -->
```
```css
.mon td b{font:600 11.5px/1.15 "DM Serif Display",serif}
.mon td i{display:block;font:7.5px/1.1 "Noto Serif TC",serif;color:#5A4A42}
.mon td i.tm{color:#C8452C;font-weight:600}.mon td i.lm{color:#6FA597;font-weight:600}
.mon th.sun,.mon td.sun b{color:#C8452C}
```

### ④ 商號美術字＋商品入畫

頂端橫額是商號，粗宋縱向拉長、字距放寬、帶 1930 年代「陰影美術字」的偏移雙影；英文副題用 Art Deco 細幾何體加大字距。商品（本站是落地鐘）**畫在畫裡**、被美人觸碰，價目與地址在底欄。

```css
.bigword{font:900 clamp(40px,7.2vw,86px)/1 "Noto Serif TC",serif;letter-spacing:.14em;color:#C8452C;
  text-shadow:2px 2px 0 #B8913F,4px 4px 0 #1F4A3C55;transform:scaleY(1.12)}
.en{font:16px/1 "Poiret One",sans-serif;letter-spacing:.42em}
```

### ⑤ 鐵皮上下軸＋吊繩＋可撕日曆本

整張紙夾在兩條金屬軸之間、由一條三角吊繩掛在釘子上；底欄中央釘一本日曆本（紅色封條、兩枚釘書針、紙疊側緣）。

```css
.rod{height:18px;border-radius:9px;background:linear-gradient(180deg,#EDE7D9 0%,#BEB7A8 30%,#7D776C 58%,#A39C8E 78%,#D4CDBE 100%);box-shadow:0 3px 4px #0005}
.rod::before,.rod::after{content:"";position:absolute;top:-3px;width:14px;height:24px;border-radius:3px;background:linear-gradient(180deg,#D9CFA8,#8C7A45 55%,#C9B777)}
.stack::before{content:"";position:absolute;inset:6px -3px -6px 3px;background:#EFE6D2;box-shadow:2px 3px 0 #D8CBB0,4px 6px 0 #C9BB9D}
```

## 三、色彩系統

| 角色 | hex | 用途 | 比例 |
|---|---|---|---|
| 磨石子湖綠牆 | `#C9D8CC`（石粒 `#7E9A88／#F4EFE2／#B6705A／#5E7D6C`） | 頁面底：紙掛在店裡的磨石子牆上 | 22% |
| 月份牌紙 | `#F2E6CF` | 紙面；日曆本 `#FFFDF6` | 40% |
| 舊紙 | `#E9D8B8` | 次要底、歷年牆 | 6% |
| 墨綠 | `#1F4A3C` | 回紋框地、地毯、小標、footer 標題 | 7% |
| 朱 | `#C8452C`／深 `#8A2E1E` | 商號、週日、節氣、印章、撕日曆大數字（週日） | 7% |
| 描金 | `#B8913F`／亮 `#D8B967` | 框線、回紋、鐘殼 | 5% |
| 杏黃 | `#E9A852`（暗 `#9A5E22`） | 旗袍主色 | 7% |
| 湖綠 | `#6FA597`、畫中背景 `#DCE9DF→#B9CDBF` | 農曆月名、節氣標籤、畫中牆 | 4% |
| 墨 | `#2A2220`／`#5A4A42` | 正文、指針 | 2% |

畫面內允許漸層（擦筆本來就是漸層）；畫面外的資訊層一律平塗。畫中背景用「象牙→淡湖綠」垂直漸層，不要用飽和藍天。

**與館內另一張月份牌（`tso-hinn` 曼真照相館）的分界**：那一站是罩染粉調、生宣紙底、深中間調牆，主角是「顏料隨日期褪色」與上色房；本站是 1930 年代 Art Deco 商號月份牌——淺色磨石子牆、墨綠回紋框＋杏黃旗袍＋朱字的飽和配色、商品（落地鐘）畫進畫裡、首屏的主體是一本可以撕的送修日曆本。兩站都遵守擦筆水彩的本體，但 mood、主色相與開場三者皆不同。

## 四、字體系統

- 商號與標題：**Noto Serif TC 900**，`scaleY(1.12)` 拉長＋雙影。
- 宜忌、手寫說明、取件聯備註：**LXGW WenKai TC**（毛筆楷意）。
- 英文副題：**Poiret One**（Art Deco 幾何），大寫、字距 .3–.42em。
- 數字（日曆、價格、撕日曆大數字）：**DM Serif Display**；撕日曆的大數字 172px（≤560px 128px）。
- 字級：日曆格 11.5／7.5px；正文 15–16px；面板標題 22–28px；首頁商號 40–86px；撕日曆大數字 172px。

## 五、版面與網格

- 首頁＝一整張月份牌：`grid-template-columns:minmax(0,1fr) 340px`，區域 `head head / art pad / cal cal / foot foot / addr addr`——畫在左、日曆本在右，十二個月排成兩列六欄的曆帶。對稱是本流派的本體，不要為了「不對稱」把它打散；不對稱只出現在內頁（價目牆 1.25fr 1fr 1fr＋大面板跨兩列、歷年牆的 ±0.6–0.8° 微傾）。
- 紙張寬 `min(1080px, 100vw − 150px)`，上方預留 52px 給吊繩。
- ≤980px：日曆本縮為 300px、曆帶四欄；≤860px 單欄，日曆本在最前、畫第二、曆帶三欄（≤560px 兩欄）。

## 六、元件配方

- **導覽（winding-key-nav 上發條鑰匙）**：右側牆上一塊直立的深木鑰匙板，三枚銅釘各掛一支 SVG 鐘匙（圓環柄、三葉柄、蝶形柄＋方孔套筒），hover 擺 9°；**現用頁那支被「轉了 90°」**（`scaleX(.28)` 看見側面），標籤加朱色底線。≤860px 改為底部三等分。
- **按鈕**：紙底、2px 墨框、3px 金色硬影；主要動作朱底。
- **店頭廣告面板**：舊紙底、雙層金線內框（`inset 0 0 0 1px` ＋ `inset 0 0 0 5px`）、拱頂畫窗、美術字標題、點線價目表。
- **撕日曆張**：紅封條＋兩枚釘書針＋鋸齒殘邊條；每張由上到下：年月／大數字／星期中英／農曆＋節氣／宜忌（紅圓「宜」、黑圓「忌」）／當班與民國紀年；公休日蓋「休」方章。
- **取件聯**：左側直排存根（虛線撕線）、右側 dl、右上圓形「時興收件」章。
- **footer**：牆上的燙金字，三欄：店址／營業（含即時狀態）／本站說明。

## 七、動效規則（四種，缺一不可）

| 種類 | 本站自製實作 | 觸發 | 時長／easing | reduced-motion |
|---|---|---|---|---|
| ambient | 畫中落地鐘走臺北真實時間，擺錘以 WAAPI 無限往返 | 載入 | 擺 1000ms alternate `cubic-bezier(.37,0,.63,1)`；秒針每秒 | 擺停在 −3°，指針仍指著正確時間 |
| input | 拖曳最上面一張：`perspective(700px) rotateX(−dy×.34°)`、紙面暗化 `--lift`；放手未過門檻 260ms 回彈 `cubic-bezier(.3,1.6,.5,1)`；點兩側任何日子＝一路撕過去；價目頁工序 hover 點亮二十一格日曆 | pointer／鍵盤 | 即時 | 撕＝直接換頁，無落下動畫 |
| transition | 換頁時紙「捲回上軸」：`clip-path: inset(0 0 100% 0)` 420ms，新頁由上軸放下 620ms；歷年牆放大用 FLIP | 點站內連結 | `cubic-bezier(.6,0,.8,.4)`／`(.2,.7,.2,1)` | 直接換頁 |
| **signature** | **撕日曆**：撕下的那張帶鋸齒上緣（每次重算 22 齒 polygon），以 WAAPI 旋轉落下（700ms、`cubic-bezier(.45,0,.85,.55)`）、疊進右側紙堆；「貼回」以同一組關鍵影格 `Animation.reverse()` 倒播飛回 | 拖曳過 72px 或下拉速度 >0.7px/ms、按鈕、↓ | 700ms／連撕 360ms＋間隔 16–90ms | 無落下，紙堆計數照常 |

蓋章：`scale(2.6) rotate(−24°)` → `scale(1) rotate(−9°)` 260ms ease-in＋取件聯下沉 3px 180ms。

### motion-library 元件

| ID | 名稱 | 頁 | 參數 | 角色 | 承載什麼／為什麼適合 |
|---|---|---|---|---|---|
| SHP-38 | Spirograph | index | colors `#B8913F／#C8452C／#F2E6CF`、duration 14、loop、seed 1934、1:1 | ambient | 〈錶盤玫瑰雕花〉：兩輪內擺線一筆描出的 guilloché 花紋，正是錶盤研磨紋——金到胭脂的漸層線也是月份牌框的描金色；零硬陰影、不破壞擦筆的軟 |
| TXT-B-16 | Circle Text | siu | text「修鐘修錶」、`#C8452C／#B8913F／#F2E6CF`、2.4s、once、16:9 | transition（一次性） | 四個字先排成一圈錶盤、再收成一行美術字標題；亮紙底→近黑字，與紙上墨色一致 |
| SHP-08 | Pendulum Swing | siu | `#C9A046／#6FA597／#E9D8B8`、6s、once、1:1 | input（點一下＝推一下擺） | 掛鐘面板的畫：漸層球擺、刻度弧與衰減擺動，是「用明暗畫立體」的同一種軟體積；點擊重播 |
| BG-A-09 | Polar Grid | pai | `#B8913F／#E59A97／#F2E6CF`、16s、loop、intensity .8、density .8 | ambient | 歷年頁抬頭背後緩慢外擴的同心圓與放射線——鐘面的刻度，也是一年一年往外長的年輪；以 50% 不透明度壓在紙下 |
| TXT-B-36 | Ink Bleed | pai | text「九十三年的月份牌」、`#C8452C／#B8913F／#F2E6CF`、2.6s、once | transition（一次性） | 標題由幾團暈開的顏料顯形，對應水彩「罩染」那一道工序 |

掛載照 `sites/ka-to` 的 `KT.ml`：`SH.ml(el,opts)` 等 `document.fonts.ready`、離屏 `destroy()`、一次性元件 `seek(1)`、reduced-motion 背景 `seek(.35)`、canvas `aria-hidden`、容器內保留 `.ml-fb` 原標題。每個元件的開發 prompt 可由 `MotionLib.prompt(id)` 取得。同畫面最多 2 個元件（歷年頁抬頭 BG-A-09＋TXT-B-36）。

## 八、插畫與圖像風格（carbon-rub-watercolor 擦筆水彩）

- 人物：1930 年代時裝美女——燙髮指波短髮、高領短袖杏黃旗袍（滿身白與朱的小梅花）、珍珠耳墜、一手搭在商品上。正面偏四分之三，杏眼、細眉、小紅唇。
- 每個形 = 剪裁路徑＋膚／布底色＋模糊暗塊（背光側）＋模糊受光塊＋胭脂。零描邊。
- 背景：月洞窗、梅枝、地毯回紋——次要元素可以有細線，但不搶人物。
- 整張畫上疊一層 `feTurbulence` 紙紋（multiply、0.55）模擬膠版印在紙上的顆粒。
- 商品插圖（懷錶、腕錶、石英錶、落地鐘、錶帶）同法：`radialGradient` 金屬殼＋clip 內模糊受光，零外框。

## 九、Logo 與 Favicon

八角章：墨綠地、雙層描金八角框（外實內虛）、中央米紙鐘面指十點十分、上「SÎ-HING」Deco 字、下「時興」「鐘錶行」。favicon 為簡化版：墨綠八角＋金框＋米色鐘面＋兩根墨指針。

## 十、Do & Don't

- Do：畫內全軟、畫外全硬；週日與節氣用紅；初一寫月名；民國紀年＋干支；商品畫進畫裡。
- Do：讓紙「掛著」——吊繩、鐵皮軸、紙的陰影。
- Don't：給人物描黑邊（那是清線派或年畫）；用扁平向量色塊人物；把日曆做成現代 date-picker。
- Don't：紫藍漸層、emoji、置中三卡片、EST. 徽章、Lorem ipsum。
- Don't：模仿特定歷史月份牌原作或真實品牌（雙妹嚜、英美煙等）——借的是方法，不是畫。
- 文化提醒：月份牌在 1920–30 年代也有暴露題材；本規格只取時裝美女端莊的一路。

## 十一、頁面骨架範例

```html
<main class="hang">
  <div class="rod"></div>
  <div class="sheetbody"><div class="poster">
    <header class="phead"><div class="yr">中華民國一百十六年　歲次丁未｜西曆二〇二七年　中西月份牌</div>
      <h1 class="bigword">商號名</h1><div class="en">SHOP NAME · CITY</div></header>
    <aside class="strip l"><!-- 1–6 月 .mon --></aside>
    <figure class="art"><div class="arch"><svg viewBox="0 0 420 580"><!-- 擦筆人物＋商品 --></svg></div></figure>
    <aside class="strip r"><!-- 7–12 月 --></aside>
    <div class="pfoot"><div class="ad">…</div><div class="pad"><!-- 撕日曆 --></div><div class="ad">…</div></div>
    <div class="addr">地址・電話・營業時間 <span class="seal">商號<br>印</span></div>
  </div></div>
  <div class="rod"></div>
</main>
```

## 十二、技術實作與相容性

### 本站技術

1. **SVG feGaussianBlur ＋ clipPath 擦筆（A 渲染層）**：承載特徵①⑤（人物、商品）。`feGaussianBlur`、`clipPath` 為 SVG 1.1 起各瀏覽器長期支援的基本功能（MDN 皆標 Baseline Widely available）。注意 SVG 呈現屬性不吃 `var()`：要讓 `<use>` 換色，必須寫成 `style="fill:var(--qp,#8FB4CF)"`（本站建置期以腳本把 `fill="var(…)"` 轉成 style）。CSS 自訂屬性可穿過 `<use>` 的 shadow tree 繼承，所以歷年牆 11 張月份牌共用一個 `<symbol>`、各自用 `--qp/--qs/--b1/--b2` 換旗袍與天色。
2. **Web Animations API（B 動效層，最近 6 站未用）**：承載 signature。`Element.animate()` 回傳 `Animation`；撕下用一次性落下關鍵影格，「貼回」對同一組關鍵影格呼叫 `reverse()`（MDN：反轉播放方向，結束在起點），`finished` Promise 用來接紙堆計數；擺錘 `iterations:Infinity, direction:'alternate'`；換頁捲軸動畫 `clip-path`。MDN 標 `Element.animate()` 為 Baseline Widely available；`playbackRate` 負值即倒播。**fallback**：無 `animate` 時撕下即換頁、無落下，功能完整。
3. **Intl.DateTimeFormat `zh-TW-u-ca-chinese`（E 資料層）**：承載特徵③與撕日曆每張的農曆。`formatToParts` 取 `month`（「九月」「冬月」「臘月」）與 `day`。MDN〈Intl.supportedValuesOf〉列 `chinese` 為常見支援曆法；不支援時 `resolvedOptions().calendar` 不等於 `chinese`，本站就隱藏農曆那一行。民國年另以 `u-ca-roc` 可得（本站直接 −1911）。
   - **實測誤差（重要）**：Node 22 內建 ICU 把 **2027 年正月初一算成 2 月 7 日**；香港天文台與各公眾假期表皆為 **2 月 6 日**（朔在北京時間 23:56，ICU 的近似判晚一天）。本站在建置期與前端都覆寫 2027-02-06～03-07：以 2/6 為正月初一直接計算。任何用 Intl 做農曆的站都應該對照天文台年表抽查朔日貼近午夜的月份。
   - 節氣不在 Intl 裡：以「壽星公式」`floor(Y×0.2422＋C) − floor(L/4)`（21 世紀 C 值，1、2 月用 Y−1 算閏）計算；2026 立冬＝11/7、2027 驚蟄＝3/6 已對照。
4. **Pointer Events ＋ setPointerCapture**：撕紙拖曳，`touch-action:none` 只加在最上面那張，頁面其餘可正常捲動。

### 效能實測（建置期）

- 單頁大小：index 約 240KB、siu 約 186KB、pai 約 201KB（各含約 150KB 的 motion-library 子集，terser 壓縮）——皆 ≤350KB。
- 首頁人物 SVG 約 12KB、日曆 12 個月約 32KB 靜態 HTML（建置期算好，無 JS 也看得到）。
- 首屏 JS：只有指針定時器、一個 WAAPI 擺動、撕日曆初始化（兩張 innerHTML）；motion-library 等字型就緒且進入視窗才掛。
- 連撕到 3 月底（約 147 張）時每張 360ms 動畫、間隔 16ms，同時存在的落下紙約 20 張，皆為 compositor 可處理的 transform／opacity。

### 無 JS／降級

- 無 JS：月份牌、十二個月日曆、價目、歷年牆全部是靜態 HTML／SVG；日曆本顯示一張示範頁與「來電預約」說明。
- 無 canvas：motion-library 容器內原本的 `<h1>`／`<h3>` 標題留著。
- `prefers-reduced-motion`：見第七章表格最後一欄。
