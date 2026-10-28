---
name: yamato-e-emakimono
description: Yamato-e handscroll (emakimono) web style — a right-to-left horizontal scroll of alternating vertical calligraphy panels and roofless oblique-projection scenes, divided by gold suyari-gasumi mist bands, painted in flat mineral pigments with ink outlines and continuous narration.
---

# 大和繪絵巻物 Yamato-e Emakimono（吹拔屋台・すやり霞・作り絵・異時同圖）

> 範例站：飛倉搬家 PUE-TSHNG（`sites/pue-tshng/`）。本規格不綁產業：任何「有過程、有路程、有前後」的品牌——搬家、旅行社、婚禮、工程、配送、長照——都能把自己的一天畫成一卷。

## 一、設計哲學

絵巻物是平安時代末（十二世紀）到鎌倉時代成熟的「捲著看的連續畫」：一卷紙或絹橫向接成數公尺到十數公尺，讀者兩手持卷，左手展開、右手捲起，一次只看肩寬的一段——所以畫面**由右往左**流動，時間也由右往左走。〈源氏物語絵巻〉（十二世紀前半，德川美術館・五島美術館）用「作り絵」把宮廷室內畫得靜；〈信貴山縁起絵巻〉（朝護孫子寺藏，奈良國立博物館寄託）與〈伴大納言絵詞〉（出光美術館）用流暢墨線畫群眾奔跑、米倉飛天、同一人物在一幅中出現數次。

這些畫長成這樣，是因為三個限制：

1. **媒材是卷**：沒有「一頁」，只有一段一段連續的寬度，所以場景之間要用東西隔開——金色的霞（すやり霞）、或一段文字（詞書）。
2. **要看進屋裡**：故事發生在室內，但屋頂擋住視線，於是乾脆拿掉屋頂與天花板，從斜上方俯看（吹拔屋台）。這是平行斜投影，沒有消失點，因為卷是橫向無限長的，任何單一視點都會在下一段失效。
3. **顏料是礦物**：群青（藍銅礦）、緑青（孔雀石）、朱、黃土、胡粉（貝殼白）都是不透明的粉，只能平塗，不能暈。先描墨線底稿、再滿塗、最後用墨線把輪廓和臉「描き起こし」回來（作り絵）。

網頁版的轉譯：**整個卷就是一個 `direction:rtl` 的橫向捲動容器**；詞書是 `writing-mode:vertical-rl` 的直書面板；場景是程式產生的斜投影 SVG；捲動位置本身是敘事時間。

## 二、本風格的 5 個不可省略特徵

拿掉任何一項，它就不是絵巻，而是「有日本味的插畫網站」。

### 特徵 1：吹拔屋台——拿掉屋頂的斜上俯看（形狀語彙）

所有室內一律不畫屋頂、天花板、前牆、左牆；只畫地板、後牆內面、右牆內面，與前方兩根細柱表示牆的位置。投影是平行斜投影：深度往左上退，**沒有消失點**，所有退縮線平行。

```js
/* 深度 z 往左上退；x 向右、y 向上；GY 是地平線基準 */
const KX=.62, KY=.44, GY=392;
const P=(x,z,y)=>[x-KX*z, GY-y-KY*z];
/* 外部量體看得到：左面、頂面、正面；室內看得到：地板、後牆、右牆內面 */
function room(x,z,y,w,d,h){ const x1=x+w,z1=z+d;
  return poly([P(x,z1,y),P(x1,z1,y),P(x1,z1,y+h),P(x,z1,y+h)],'#F2EBDA')   // 後牆
       + poly([P(x1,z,y),P(x1,z1,y),P(x1,z1,y+h),P(x1,z,y+h)],'#E6DCC4')    // 右牆內面
       + poly([P(x,z,y),P(x1,z,y),P(x1,z1,y),P(x,z1,y)],'#DDBF73');         // 地板
}
```

多層建物畫成剖面：下層是封閉量體（正面開窗），只有故事發生的那一層是吹拔；樓梯間把前牆剖開，梯段用斜線表示。

### 特徵 2：すやり霞——金泥橫帶隔開場景（裝飾母題＋版面手法）

場景與場景之間、畫面上緣與下緣，用**水平、兩端圓收、錯一階**的金色帶子遮掉不想畫的部分（天空、遠景、轉場）。帶子內撒金砂子；邊線比金暗一階。霞永遠是水平的，不彎、不漸層、不發光。

```svg
<!-- 主帶＋錯開的一階；金砂子以 pattern 疊上 -->
<path d="M43 116H337A13 13 0 0 1 337 142H216V154H96A6 6 0 0 1 96 142H43A13 13 0 0 1 43 116Z"
      fill="#C8A24E" stroke="#A8843A" stroke-width=".9"/>
<path d="(同上)" fill="url(#sng)"/>
<pattern id="sng" width="23" height="17" patternUnits="userSpaceOnUse">
  <rect x="2" y="3" width="2" height="1.6" fill="#DDBF73"/><rect x="13" y="9" width="1.6" height="1.6" fill="#DDBF73"/>
</pattern>
```

### 特徵 3：作り絵——礦物平塗＋墨線描起（色彩規則）

只有七個顏料色，全部平塗、不透明：群青、緑青、朱、黃土、代赭、胡粉、墨，加上金泥。**零漸層、零陰影、零透明疊色、零發光**。每個色面都被 1.1px 墨線圍住（描き起こし）；線寬只有三階：1.1（輪廓）、0.6（磁磚、窗格、細部）、2–5（柱、樹幹）。畫面大半是不塗的絹地。

```css
svg.pic{fill:none;stroke:#231C15;stroke-width:1.1;stroke-linejoin:round;stroke-linecap:round}
/* 所有上色面帶 class="c"；顏色寫在 fill 屬性，CSS 不加任何 filter 與 opacity */
```

### 特徵 4：右起左行的卷與直書詞書（字體選擇＋版面手法）

閱讀方向是右→左。卷的開頭是深群青表紙＋直書題簽；之後**詞書（文字）與繪（畫）交替**；卷末是奧書（colophon）與朱印，最後是軸。詞書用楷書感字體直排，料紙地撒金砂子與野毛（斜細金線）。

```css
.mk-s{direction:rtl;display:flex;overflow-x:auto;overflow-y:hidden;height:clamp(300px,58vh,500px)}
.mk-s>*{direction:ltr;flex:none;height:100%}
.kt{writing-mode:vertical-rl;font:400 1.1rem/2.05 "LXGW WenKai TC",serif;letter-spacing:.08em;
  background:#E9DCBC radial-gradient(circle at 3px 4px,#DDBF73 0 1.1px,transparent 1.5px) 0 0/23px 29px}
.kt .yr{text-combine-upright:all}   /* 直書中的短數字：縱中橫 */
```

### 特徵 5：引目鉤鼻的小人物與異時同圖（裝飾母題＋敘事）

人物小（約樓高的八成）、平塗衣、胡粉臉；臉只有一條橫線眼（引目）、一個小鉤鼻（鉤鼻），頭髮是一塊墨。同一人物在同一幅畫裡出現多次，表示時間的推進（異時同圖）——這是絵巻與單張插畫最大的差別。旁邊可以直書小字「書入れ」標名字。

```js
/* 引目一線、鉤鼻一勾 */
face = `<ellipse rx="5.4" ry="6.2" fill="#F2EBDA"/>`
     + `<path d="M${x+f*1.6} ${hy}H${x+f*3.6}" stroke-width=".8"/>`
     + `<path d="M${x+f*5.1} ${hy+1}l${f*1.3} 1.7l${-f*1.1} .3" stroke-width=".7"/>`;
/* 同一人物包成 <g class="fg" data-k="1..n" data-cap="這一刻在做什麼"> */
```

## 三、色彩系統

| 名 | hex | 用途 | 比例 |
|---|---|---|---|
| 絹本地 silk | `#D8C397` | 頁面與畫面的地（畫面大半不塗） | ~50% |
| 絹本暗 | `#C9B07F` | 天地邊、分隔 | 3% |
| 料紙 ryo | `#E9DCBC` | 詞書、奧書、長讀文字的地 | ~12% |
| 金泥 gold | `#C8A24E` | すやり霞、天地金線 | ~12% |
| 金砂子 | `#DDBF73` | 霞內砂子、地板 | 2% |
| 群青 gun | `#2C4A86` / 深 `#1C2F5A` | 表紙、頁首頁尾、川、衣 | ~8% |
| 緑青 rok | `#3C8A6A` | 樹、山、車頭 | 3% |
| 朱 shu | `#C4422A` | 印、現用態、重點字 | ≤4% |
| 黃土 odo | `#C39448` | 紙箱、校倉 | 2% |
| 代赭 tai | `#8A4B2A` | 柱、樹幹、軸 | 2% |
| 胡粉 gof | `#F2EBDA` | 臉、牆、白描的未上色面 | 3% |
| 墨 sumi | `#231C15` | 全部線、正文 | ~10% |

規則：純黑純白不用；不加第八個顏料色；同一畫面上色相不超過五種。

## 四、字體系統

- 詞書・標題：**LXGW WenKai TC**（Google Fonts，400/700）——楷書感，接近絵巻詞書的書寫氣；`letter-spacing:.08–.3em`。
- 內文：**Noto Serif TC** 400/700，16px／行高 1.85。
- 尺度：h1 `clamp(2rem,4.4vw,3.4rem)`；h2 `clamp(1.5rem,2.6vw,2.1rem)`；詞書 `clamp(.98rem,1.45vh+.3vw,1.18rem)`（隨卷高變化）；書入れ 10px（SVG 內）。
- 直書中的數字：兩位以內用 `text-combine-upright:all`；年份用〇一二…漢數字。

## 五、版面與網格

- 頁面骨架：表紙列（頁首）→ 一句方向提示 → **繪卷（滿版、天地金線）** → 進度紐（朱線，由右往左長）→ 卷外段落 → 頁尾。
- 卷內順序（DOM 順序＝右起順序）：表紙（題簽）→［詞書 → 繪］×N → 奧書（朱印）→ 軸。
- 卷高 `clamp(300px,58vh,500px)`；手機 `clamp(300px,62vh,460px)`。場景 SVG 以 `height:100%; width:auto; aspect-ratio` 撐寬。
- 卷外段落不對稱：四欄 1.25/1/1/1.3fr、各欄上緣錯開 0/34/12/48px。零旋轉；所有角度都來自斜投影（約 35° 的退縮線）。
- 留白：卷外段落間 64px；卷內不留白——空的地方就是絹地與霞。

## 六、元件配方

- **導覽＝題簽**：直書細長紙籤貼在群青表紙上（料紙地＋內框細金線）；現用頁＝金砂子撒滿＋下方垂一方朱印；hover 往下滑 5px（`steps(3)`）。
- **按鈕**：群青或朱實地、墨細框、金色 4px 硬位移（不是模糊陰影），按下時位移減半。
- **卡片**：料紙地＋1px 墨框，無圓角、無陰影。
- **選項 chip**：胡粉地墨框；選中＝金砂子地＋內縮朱框。
- **表單**：胡粉地輸入框、墨框、無圓角；無效時框轉朱。
- **奧書**：直書料紙，末尾一方 3.2em 朱框印（「飛倉之印」）。
- **頁尾**：深群青地＋淡金砂子，上緣 6px 代赭（軸）。

## 七、動效規則

| 種類 | 本站實作 | 觸發 | 時長／easing | reduced-motion 降級 |
|---|---|---|---|---|
| ambient | 金砂子閃：pattern 內兩顆砂子在金與胡粉間切換 | 時間 | 3.2s／4.6s，`steps(1)` | 停在金 |
| ambient | すやり霞分合：場景離卷心時上霞下降 26px、下霞上升 14px，正中時退開 | 捲動（scroll-driven `view(inline)`） | 隨捲動、linear | 霞固定在原位 |
| input | 書入れ：游標／焦點停在人物上，那一刻立刻上色、旁註亮起 | pointerover | 0ms（無補間）、色面 `steps(4)` .32s | 永遠全彩，旁註全部顯示 |
| input | 滾輪映射為往左捲（卷尾才把滾輪還給頁面）、滑鼠拖曳捲、↑↓PgUp/PgDn | 滾輪／拖曳／鍵盤 | 即時 | `behavior:auto` |
| transition | 換頁：深群青表紙由左往右蓋上（捲起），新頁表紙由右往左退開（展開），前緣帶一根代赭軸 | 點內部連結 | 440ms 收、640ms 展，`cubic-bezier(.55,0,.25,1)` | 直接換頁 |
| transition | 畫卷頁落筆後新卷 `clip-path` 由右往左展開 | 送出表單 | 900ms | 直接出現 |
| **signature** | **異時同圖捲動**：同一位師傅（或同一台車）在一幅畫裡出現 3–4 次；捲到哪一個位在卷的正中，哪一個才是作り絵上色，其餘退回胡粉白描；旁註標「今・」 | 捲動 | 色面 `steps(4)` .32s | 不加 `.live`：全部上色、全部旁註可讀 |

自我限制：不淡入、不視差、不縮放；所有移動都是水平的（卷的方向）或霞的垂直退讓。

### motion-library 元件表（motion-library 1.21.0 @e4f8c46c，`tools/ml-embed.js` 子集 inline 為每頁第一個 `<script>`；出處 `MotionLib.prompt(id)`）

| ID | 名稱 | 頁 | 參數 | 種類 | 承載什麼／為什麼適合 |
|---|---|---|---|---|---|
| BG-A-11 | Parallel Curves | index | colors `#2C4A86 / #F2EBDA / #D8C397`、duration 9、density .9、intensity .8、seed 1976、16:9（裁成 96px 帶） | ambient | 卷外的「川」：群青平行波線＝絵巻裡的流水紋，每四條一條胡粉，只有線、無漸層 |
| SHP-27 | Shape Stack | index | `#C39448 / #C4422A / #E9DCBC`、2.6s loop、seed 35、1:1 | ambient | 「打包」欄：黃土紙箱一個個疊上去；元件的 6% 細格線在料紙上讀作絹目 |
| BG-A-17 | Flow Lines | emaki | `#231C15 / #3C8A6A / #E9DCBC`、6s、density .8、seed 1107、16:9 | ambient | 畫卷頁題頭：墨與緑青的短流線＝大和繪的風與秋草，未落筆前的空絹 |
| BG-B-18 | Horizontal Lines | price | `#C8A24E / #A8843A / #D8C397`、10s、density .7、seed 22、16:9（裁成 92px 帶） | ambient | 價目頁題頭：粗細呼吸的金色橫帶＝すやり霞的抽象版，只有水平帶 |
| SHP-25 | Shape Parade | price | `#2C4A86 / #C4422A / #E9DCBC`、2.4s、loop:false、once、seed 4、16:9 | transition | 訂單送出後播一次：形狀由右方跳進來排成一列＝師傅的行列「由右入場」，與卷的閱讀方向一致 |

挑選排除：帶 `shadowBlur` 的元件（違反特徵 3 零發光）、斜向或放射構圖的元件（違反特徵 2 霞永遠水平）、TEL／TRN（示範場景）。掛載：等 `document.fonts.ready`、離屏 `destroy()`、回視窗重掛；reduced-motion 時背景 `seek(.35)` 停格、一次性元件 `seek(1)`；canvas `aria-hidden`。

## 八、插畫與圖像風格

全站零圖檔，所有畫面由一支繪製程式（`scene.js`）以 SVG 字串產生：建置期烘成靜態 HTML（無 JS 可讀），畫卷頁執行期用同一支重畫使用者的卷。原語：`box`（外部三面）、`room`（吹拔室內）、`building`（多層剖面＋樓梯間／電梯）、`fig`（引目鉤鼻人物，站／坐／走／扛／指四姿）、九件家當、`truck`、`granary`（校倉）、`kasumi`、`pine`、`banyan`（榕樹）、`river`、`hills`（圓頭山緑青身群青頂）、`ship`、`temple`（燕尾朱屋根）。

## 九、Logo 與 Favicon

Logo：すやり霞上的一座校倉（黃土原木牆、檜皮四注屋根、代赭高腳）＋右上一方朱印。Favicon：深群青地、金霞、校倉剪影。皆為 inline SVG。

## 十、Do & Don't

- Do：讓卷由右往左讀；DOM 順序就是閱讀順序。
- Do：場景之間用詞書或霞隔開，不要用分隔線或卡片。
- Do：留大面積絹地不塗。
- Do：同一人物在一幅中出現多次，用 `data-k` 標順序。
- Don't：消失點透視、陰影、漸層、玻璃、發光、圓角卡片。
- Don't：把屋頂畫回去——吹拔屋台就是拿掉它。
- Don't：直書段落裡塞長英文或長數字。
- Don't（去AI化）：紫藍漸層、置中三卡片、emoji icon、Lorem ipsum、「EST. 19xx」徽章、「在當今快節奏的世界」。

## 十一、頁面骨架範例

```html
<header class="hd"><a class="brand" href="index.html">…</a>
  <nav><ul class="slips"><li><a href="index.html" aria-current="page">縁起<small>ENGI</small></a></li>…</ul></nav></header>
<div class="mk"><div class="mk-s" tabindex="0" role="region" aria-label="（由右往左捲）">
  <div class="cover"><div class="daisen">飛倉縁起絵巻</div></div>
  <section class="kt"><h3>三輪車</h3><p>一九七六年，……收了<span class="yr">40</span>元。</p></section>
  <figure class="sc ijido"><svg class="pic" viewBox="0 110 560 320" fill="none" stroke="#231C15" stroke-width="1.1">
     <g class="ka kt">…霞…</g>
     <g class="fg" data-k="1" data-cap="打包">…人物…</g><g class="fg" data-k="2" data-cap="下樓">…</g>
  </svg><figcaption><span data-k="1">打包</span>　<span data-k="2">下樓</span></figcaption></figure>
  <section class="oku"><p>右……一卷</p><span class="in">飛倉<br>之印</span></section>
  <div class="jiku"></div>
</div><div class="prog"><i></i></div></div>
```

```js
/* 異時同圖：捲動時，每幅只讓最靠近卷心的那一個 .fg 上色 */
scroller.addEventListener('scroll',()=>requestAnimationFrame(()=>{
  const R=scroller.getBoundingClientRect(),cx=R.left+R.width/2;
  for(const sc of scroller.querySelectorAll('.sc.ijido')){let best,bd=1e9;
    for(const g of sc.querySelectorAll('.fg')){const b=g.getBoundingClientRect(),d=Math.abs(b.left+b.width/2-cx);if(d<bd){bd=d;best=g;}}
    sc.querySelectorAll('.fg').forEach(g=>g.classList.toggle('now',g===best));}}),{passive:true});
/* CSS：.sc.live .fg:not(.now) .c{fill:#F2EBDA} */
```

## 十二、技術實作與相容性

| 技術 | 層 | 承載 | 支援現況（查證） | 不支援時 |
|---|---|---|---|---|
| `direction:rtl` 橫捲＋`writing-mode:vertical-rl` 詞書＋`text-combine-upright` | C 版面 | 特徵 4：右起左行的卷、直書詞書、縱中橫 | `writing-mode` 全瀏覽器；`text-combine-upright` 為 Baseline Widely available（Safari 15.4 於 2022-03 補齊，2024-09 成為廣泛可用）——MDN `text-combine-upright`、web-features explorer。**rtl／垂直書寫下 `scrollLeft` 的正負號各引擎曾不一致**（Igalia〈scrollable elements in non-default writing modes〉、Mozilla bug 383026、WebKit bug 199451），故程式只讀「已捲多少」：`x<=0 ? -x/max : 1-x/max`；本機 Chromium 實測為規範行為（起點 0、往左為負）。卷本身不放在 `vertical-rl` 容器裡捲，避開該差異 | 舊引擎仍可橫捲，數字直排不合併 |
| CSS scroll-driven animations `animation-timeline: view(inline)` | B 動效 | 特徵 2：霞依場景離卷心的距離分合 | Chrome／Edge 115+、Safari 26（2025-09）；Firefox 仍在旗標後（Chrome for Developers〈Scroll-driven animations〉；caniuse 約 83%） | `@supports` 不通過時由同一支 rAF 捲動處理器算出距離並寫入 inline transform；reduced-motion 時兩者皆停 |
| 文法生成詞書＋FNV-1a／xorshift32＋Intl 民國曆 | E 資料 | func 與特徵 5：依選擇決定性地寫出三段詞書、決定師傅名單、畫面變體；`Intl.DateTimeFormat('zh-TW-u-ca-roc')` 寫奧書日期；`?m=` 卷號可分享 | 純 JS；`Intl` 的 roc 曆在 Chrome／Safari／Firefox 皆可用 | `Intl` 失敗時退回手算「民國 N 年」 |

效能實測（本機 headless Chromium，1280×860）：index 294KB、emaki 313KB、price 275KB（皆 ≤350KB，motion-library 子集約 217KB 佔大宗）；首屏腳本執行（CDP ScriptDuration，含載入後 0.8 秒內的元件繪製）index 80ms／emaki 65ms／price 17ms；捲動中 rAF 60–61 fps；異時同圖每次捲動只在 rAF 內做一次 `getBoundingClientRect` 掃描，僅處理可見場景；同一畫面同時運轉的 motion-library 元件 ≤2。
