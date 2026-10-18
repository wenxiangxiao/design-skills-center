---
name: zhuxianzhen-nianhua-door-god
description: Chinese woodblock New Year print (Zhuxianzhen nianhua) — a black key-block plus five flat water-ink colour blocks, multiplied and slightly misregistered, big-headed mirrored door-god pairs, rebus motifs as language, couplet-and-lintel doorway framing.
---

# 中國木版年畫・朱仙鎮門神 Zhuxianzhen Woodblock New Year Print（Nianhua）

> 示範站：雙將鎖店 SIANG-TSIONG（`sites/siang-tsiong`，新北永和的鎖店，虛構）。本文件不綁定產業：任何「守門、迎新、求吉」的品牌都能直接套用。

## 一、設計哲學

朱仙鎮在河南開封西南，木版年畫的傳統可上溯到北宋汴京的「紙馬」，明清時是北方年畫的集散地，題材以門神為大宗。它和楊柳青（半印半繪、人物細膩）、桃花塢（江南、色調柔）最大的差別是：**全部套版印成，不手繪補色**；線條粗獷、人物頭大身小、構圖飽滿對稱，顏色由當地材料熬製——墨用煤黑、黃用槐米熬的「槐黃」、紅用章丹與蘇木、綠用銅綠、紫的原料各家說法不一（葵花子、木耳菜籽），一張完整的門神少則五塊、多則九塊色版疊印。

這套視覺語言長成這樣，是因為三個製作限制：

1. **木版只能印平色**：沒有漸層，色與色之間靠「墨線版」黑框收邊；明暗只能靠換一塊顏色。
2. **水性顏料＋棕刷拓印**：墨不均、紙吃色有斑，套版靠手對位，一兩毫米的錯位是常態——錯位處兩色相疊變深、或露出紙白。
3. **它是貼在門上的**：一對、成鏡像、面對面；要從巷口一眼看懂，所以頭大、眼大、色撞色；要說吉祥話但不能寫滿字，所以用諧音的物件說話（蝠＝福、魚＝餘、蓮＝連、瓶＝平、戟＝吉）。

網頁上的翻譯原則：**把每一塊顏色當成一塊獨立的版**，用疊印（multiply）與錯位做出「印出來」的物質感；用對稱的門框（橫批＋對聯＋左右兩扇）當版面骨架；用諧音物件當互動的資訊單元。

## 二、本風格的 5 個不可省略特徵

### ① 墨線版＋平色分版疊印（multiply），零漸層零陰影

所有圖像都是「一塊黑色墨線版＋若干平色版」。每塊版是一層，以 `mix-blend-mode: multiply` 疊在紙上；版上「不印的地方」填白（multiply 下白色＝沒印），所以前景自然遮住背景，錯位時露出的是紙。

```html
<div class="print"><!-- 每塊版一張 svg，同一個 <use>，只把屬於自己的 class 上色 -->
  <svg class="pl pl-K" viewBox="0 0 200 300"><use href="#god"/></svg>
  <svg class="pl pl-y" viewBox="0 0 200 300"><use href="#god"/></svg>
  <svg class="pl pl-r" viewBox="0 0 200 300"><use href="#god"/></svg>
</div>
```
```css
.print{position:relative;aspect-ratio:2/3;background:#F3E7CB;isolation:isolate}
.print .pl{position:absolute;inset:0;width:100%;height:100%;mix-blend-mode:multiply}
.pl-K{--Y:#fff;--R:#fff;--K:#1B1712;--ln:#1B1712}          /* 墨線版：只有黑 */
.pl-y{--Y:#E9B526;--R:#fff;--K:#fff;--ln:transparent}       /* 槐黃版 */
.pl-r{--Y:#fff;--R:#D8432A;--K:#fff;--ln:transparent}       /* 丹版 */
.y{fill:var(--Y)} .r{fill:var(--R)} .K{fill:var(--K)} .w{fill:#fff}
.y,.r,.K,.w{stroke:var(--ln);stroke-width:2.4;stroke-linejoin:round}
```
`<symbol>` 裡依 z 序畫完整人物（`class="y"`、`class="r"`…），CSS 自訂屬性會繼承進 `<use>` 的影子樹，所以同一個 symbol 在每塊版只顯示自己的顏色。

### ② 五色＋墨的固定色譜，紅綠、黃紫直接相撞

槐黃 `#E9B526`、丹 `#D8432A`、銅綠 `#2F8F5B`、葵紫 `#6A3C8C`、桃紅 `#E2557A`、墨 `#1B1712`，紙 `#F3E7CB`。補色對（紅／綠、黃／紫）直接相鄰、中間只隔一條墨線；不准用任何中間調、不准透明度、不准漸層。

```css
:root{--huang:#E9B526;--dan:#D8432A;--lv:#2F8F5B;--zi:#6A3C8C;--tao:#E2557A;--mo:#1B1712;--zhi:#F3E7CB}
/* 一個色塊＝一塊版；相鄰的兩塊盡量是補色 */
.armor{fill:var(--lv)} .mirror{fill:var(--dan)} .skirt{fill:var(--zi)} .ribbon{fill:var(--tao)}
```

### ③ 頭大身小、成對鏡像、面對面

人物頭（含盔與紅纓）佔全身高 40% 以上；左右兩扇是同一套部件的鏡像（`scale(-1,1)`），兩位永遠面朝中縫——臉朝外是送客。瞳孔可跟著游標，但右扇的 x 要反號。

```html
<symbol id="godL" viewBox="0 0 200 300">…面朝右的人物…</symbol>
<symbol id="godR" viewBox="0 0 200 300"><g transform="translate(200 0) scale(-1 1)">…同一套部件…</g></symbol>
```
```css
.pu{transform:translate(var(--ex,0px),var(--ey,0px))}   /* 瞳孔群組；--ex 設在 .print 上，右扇取負號 */
```

### ④ 諧音物件就是文字

吉祥話不寫出來，而是畫出物件：蝠＝福、魚＝餘、蓮＝連、瓶＝平、戟＝吉、鹿＝祿、桃＝壽、古錢方孔＝眼前（「福在眼前」＝蝠＋錢）。網頁上每個諧音物件都是一個可聚焦的資訊點，揭示它的讀法；現用頁的斗方「倒貼」＝「到」。

```css
.df[aria-current="page"] .d i{transform:rotate(180deg)}   /* 福倒＝福到：你在這一頁 */
.hs{anchor-name:--fish} .tag{position:absolute;position-anchor:--fish;position-area:top;position-try-fallbacks:flip-block}
```

### ⑤ 門的版面：橫批＋對聯＋左右兩扇＋外粗內細雙線版框

頁面骨架是一道門：上方橫批（四字）、左右直排對聯（上聯在右、下聯在左）、中間兩扇。任何內容框都用「外 4px 粗墨線＋紙色間隔＋內 1.5px 細墨線」的版框，零圓角。

```css
.zhi{background:#F3E7CB;border:4px solid #1B1712;box-shadow:inset 0 0 0 5px #F3E7CB,inset 0 0 0 6.5px #1B1712}
.lian{writing-mode:vertical-rl;text-orientation:upright;background:#D8432A;font:700 48px/1.5 "LXGW WenKai TC",serif;letter-spacing:.32em}
.frame3{display:grid;grid-template-columns:92px minmax(0,800px) 92px;justify-content:center}
```

## 三、色彩系統

| 名稱 | hex | 用途 | 面積 |
|---|---|---|---|
| 槐黃 | `#E9B526` | 頁面地色（滿版）、人物盔甲金件、圖地 | ~40% |
| 紙 | `#F3E7CB` | 一切長文的底、印版的紙 | ~22% |
| 墨 | `#1B1712` | 墨線版、門板、門楣（頁首）、正文字 | ~16% |
| 丹 | `#D8432A` | 對聯、橫批、斗方、門檻（頁尾）、主按鈕 | ~12% |
| 銅綠 | `#2F8F5B` | 次按鈕、甲、地面 | ~5% |
| 葵紫 | `#6A3C8C` | 戰裙、強調面板、節慶帶 | ~3% |
| 桃紅 | `#E2557A` | 只給飄帶與兩頰 | ≤2% |
| 白 | `#FFFFFF` | 印版上的「不印」（multiply 中性） | — |

規則：長文只放在紙或墨上；紅綠、黃紫相鄰時中間必有墨線；不得出現第八個顏色、不得用透明度做淡色。

## 四、字體系統

- **楷書**：`"LXGW WenKai TC"` 700（Google Fonts）——標題、對聯、橫批、價格、按鈕。年畫上的題字多為楷書與魏碑。
- **宋體**：`"Noto Serif TC"` 500／900——正文。
- 不用無襯線字當主角、不用拉丁字當主角（拉丁只出現在店名副標，11px、字距 .18em）。

| 層級 | 字級 | 行高 |
|---|---|---|
| 首頁店名 h1 | clamp(40px,6vw,70px) | 1.25 |
| 對聯 | clamp(30px,3.6vw,48px)，字距 .32em | 1.5 |
| 區段標 h2 | clamp(30px,4vw,44px) | 1.25 |
| 正文 | 16.5px（手機 15.5px） | 1.85 |
| 小註 | 12.5–13.5px | 1.6 |

## 五、版面與網格

- **零旋轉、零斜角**——年畫是對稱的；唯一的 45° 是斗方菱形。
- 首屏：門楣（sticky 墨色頁首）→ 橫批置中 → 三欄門 `92px | ≤800px | 92px` → 門檻資訊。對稱在這裡是有語意的構圖（對聯與兩扇門），不是置中模板。
- 內容區：不對稱的「條屏」與「格」——例如 1.25fr／1fr／1fr 兩列、或四條屏等寬直列。
- 區段之間留 70px；版框內距 26–28px（手機 18–20px）。
- ≤640px：對聯改橫排到門的上下（上聯在上），兩扇門仍並排（每扇約 150px 寬）；導覽落到底部。

## 六、元件配方

- **導覽＝斗方**：4 個菱形（46px，`rotate(45deg)` 的方塊）每個一字（門／相／價／來）；現用頁的字倒過來（倒＝到），斗方改槐黃底丹框；hover 斗方轉到 135°，字搖 −14°。手機固定在底部墨色條。
- **按鈕**：丹底墨字，3px 墨框＋內 1.5px 墨線（`box-shadow:inset 0 0 0 3px var(--dan),inset 0 0 0 4.5px var(--mo)`），hover 往左上推 2px；零圓角零陰影。
- **卡片＝條屏**：紙底雙線版框；頂部一塊色版頭（丹／銅綠／葵紫／槐黃輪替）放一個諧音物件圖示。
- **表單**：輸入框 3px 墨框白底零圓角；單選做成紙色方塊，選中變丹底；送出後回一張丹色「紅紙單」。
- **頁尾＝門檻**：丹色滿版，6px 墨上緣，三欄資訊＋虛構聲明。

## 七、動效規則

| 種類 | 本站自製實作 | 觸發 | 時長／easing | reduced-motion |
|---|---|---|---|---|
| ambient | 靠旗、飄帶、紅纓、蝙蝠在 symbol 內以 SMIL `animateTransform`（additive=sum）擺動；所有印版的影子複本同步 | 永遠 | 2.4–5.2s 往返 | `pauseAnimations()`＋`setCurrentTime(0)` 停在原位 |
| input | 門神對望：兩扇門神的瞳孔跟著游標或鍵盤焦點（右扇鏡像反號），≤2.6px | pointermove／focusin | rAF、70ms linear | 不動，瞳孔置中 |
| transition | 換頁「刷漿貼紙→撕下」：點內部連結，一張丹紙（中間一枚槐黃斗方「福」）由左刷滿 420ms；下一頁抵達時那張紙沿鋸齒撕口由上往下被撕掉 560ms | 點內部連結 | cubic-bezier(.5,0,.3,1)／(.6,.05,.4,1) | 直接換頁 |
| signature | **棕刷拓印**：一支註冊為 `<number>` 的 `--t` 在 4.2s 內從 0 走到 6（每步之間停 0.2s），同時驅動六塊版的 `clip-path` 揭示（墨線→槐黃→丹→銅綠→葵紫→桃紅）、每塊版從 6 倍錯位滑回 1 倍殘留錯位、以及棕刷的位置 `left:calc(mod(var(--t),1)*100%)`。右扇從右往左刷，兩把刷在中縫會合 | 首頁載入、〈門口相〉出結果 | 每塊版 0.5s linear | 直接顯示印好的狀態（`--t:6`） |

```css
@property --t{syntax:'<number>';inherits:true;initial-value:6}
@keyframes rubrun{0%{--t:0}12%{--t:1}16.6%{--t:1}28.6%{--t:2}33.3%{--t:2}45.3%{--t:3}50%{--t:3}62%{--t:4}66.6%{--t:4}78.6%{--t:5}83.3%{--t:5}96%{--t:6}100%{--t:6}}
.rub{animation:rubrun 4.2s linear .35s both}
.print .pl{--k:clamp(0,var(--t) - var(--i),1);clip-path:inset(0 calc(100% - var(--k)*100%) 0 0);
 --s:calc(1 + 5*(1 - clamp(0,(var(--t) - var(--i))*2 - 1,1)));transform:translate(calc(var(--fx)*var(--s)),calc(var(--fy)*var(--s)))}
```

**自我限制**：不用淡入、不用彈跳縮放、不用視差；所有出現都必須是「被刷上去」或「被貼上去」。

### motion-library 元件表（PLAYBOOK §2.8；版本 1.1.0 @eb4d70c）

| ID | 名稱 | 頁面 | 參數 | 承載什麼／為什麼適合 | 類別 |
|---|---|---|---|---|---|
| BG-B-32 | Pinwheels | 首頁〈臘月拓印課〉節慶帶 | primary `#D8432A`、secondary `#E9B526`、bg `#6A3C8C`、duration 9、density 1.2、intensity .9、seed 1961、16:9（容器裁成 300px 帶） | 過年廟口的紙風車：四片直角三角平色、零描邊零漸層，和「平色分版」同一種語法 | ambient |
| TXT-A-03 | Stamp In | 首頁〈一塊線版過海〉 | text「雙將」、primary 丹、secondary 墨、bg 紙、duration 1.4、loop false、1:1 | 畫店字號印蓋上去：年畫角落的店號朱印 | transition（一次性） |
| TXT-A-13 | Ribbon | 〈門口相〉標題 | text「門口相」、primary 丹、secondary 墨、bg 槐黃、duration 1.3、loop false、16:9（裁成 150px） | 一條紅紙橫批展開、字是槐黃——把頁標題寫成橫批 | transition（一次性） |
| SHP-20 | Confetti Burst | 〈門口相〉結果 | primary 丹、secondary 槐黃、bg `#FFFFFF`、duration 2.2、loop false、1:1、canvas `mix-blend-mode:multiply` | 鞭炮紅紙屑在印好的門神上炸一次；白底在 multiply 下等於不印，3.4 秒後撤掉 canvas | input（按下最後一個答案） |
| TXT-B-03 | Coin Flip | 〈價目〉標題 | text「價目」、primary／secondary 丹、bg 槐黃、duration 1.6、loop false、16:9（裁成 170px） | 銅錢翻面：字翻到背面是丹色，像擲筊、像翻錢 | transition（一次性） |
| TXT-B-36 | Ink Bleed | 〈來店〉標題 | text「來店」、primary 丹、secondary 墨、bg 紙、duration 1.8、loop false、16:9（裁成 150px） | 水印墨在紙上暈開——水性顏料吃進棉紙的樣子 | transition（一次性） |

挑選時讀過原始碼：六個元件都不用 `shadowBlur` 發光與漸層填色；Stamp In 的印框有小圓角（`rr()` 半徑 10），印章本來就是磨過角的石章，與「版框零圓角」不衝突；Ribbon 的緞帶尾用 `mix(primary,bg,.35)`，是丹與槐黃的混色。字色由 `bg` 亮度自動決定（槐黃、紙、白都得到近黑字）。掛載經站內 `ST.ml`：等 `document.fonts.ready`、離屏 `destroy()`、一次性元件 `loop:false` 播一次後停最後一格、canvas `aria-hidden`、容器保留原 HTML 標題（`.ml-fb`）。reduced-motion：背景 `seek(.35)`、文字 `seek(1)`、鞭炮不出現。開發 Prompt 以 `MotionLib.prompt(id)` 取得。

## 八、插畫與圖像風格

- 技法：**分版套印（plate-separated woodblock）**。所有圖由 `<symbol>` 的 z 序部件組成，每個部件只能屬於一塊版（`class="y|r|g|p|m|K|w"`），細節線用 `.l`（1.5px 墨線、圓頭）。
- 人物部件庫：盔（槐黃）＋盔沿（丹）＋護耳（銅綠）＋紅纓；烏紗翅（文門神）；臉（紙／葵紫／銅綠／丹／墨，黑臉時五官改用白線 `.wl`）；臥蠶眉、丹鳳眼；三綹長髯／虬髯／滿腮鬍；護心鏡、肩吞獸頭、戰裙、飄帶、靠旗四面；兵器：鐧、鞭、斧、劍、如意。
- 諧音部件：蝠、古錢、魚、蓮、瓶插三戟、桃、鑰匙、鎖。
- 水印墨斑：每塊版一張 128px 可平鋪的 value-noise alpha 圖當 `mask-image`（墨線版最低 .8、色版最低 .5），讓色面不均。
- 禁止：漸層、陰影、透明疊色、照片、細線插畫、等角透視、任何寫實光影。

## 九、Logo 與 Favicon

斗方（丹色菱形、墨粗框、內槐黃細框）裡一把鑰匙：鑰匙柄是一枚古錢、方孔是丹色——「錢在眼前」也是「鑰匙在手」。favicon 用同一張 SVG 的 data URI。換產業時保留「斗方＋一個諧音物件」的結構即可。

## 十、Do & Don't

**Do**
- 每個色塊都要能說出它屬於哪一塊版。
- 讓錯位看得見（1–2px），並讓它在動效裡「收斂」。
- 對稱用在門與人物；內容區用條屏、格與不等寬欄打破對稱。
- 吉祥話用物件說，再用互動揭示讀法。

**Don't（含去 AI 化禁令）**
- 不用紫藍漸層、不用置中三卡片、不用 emoji 當 icon、不用 rounded-2xl 與模糊陰影、不用 Lorem ipsum。
- 不用「EST. 19xx」徽章；年份寫進敘事。
- 不把年畫變成「中國風」大雜燴：不加祥雲漸層、不加金箔、不加水墨暈染（那是另一個流派）。
- 不做手繪補色效果（楊柳青的臉部暈染不是朱仙鎮）。
- 不讓門神臉朝外。

## 十一、頁面骨架範例

```html
<header class="lintel">
  <a class="brand" href="index.html"><svg>…斗方 logo…</svg><b>店名</b></a>
  <nav><ul class="doufang">
    <li><a class="df" href="index.html" aria-current="page"><span class="d"><i>門</i></span><small>門口</small></a></li>
    <li><a class="df" href="b.html"><span class="d"><i>相</i></span><small>門口相</small></a></li>
  </ul></nav>
</header>
<section class="doorway">
  <div class="hengpi"><span>出</span><span>入</span><span>平</span><span>安</span></div>
  <div class="frame3">
    <p class="lian">上聯七字</p>
    <div class="door">
      <div class="leaf"><div class="print rub">…六塊版…</div></div>
      <div class="seam"><div class="lockplate">…蝠＋古錢…</div></div>
      <div class="leaf"><div class="print rub rtl">…六塊版（鏡像）…</div></div>
    </div>
    <p class="lian">下聯七字</p>
  </div>
</section>
<main>
  <h2 class="sec">區段標</h2>
  <div class="ben"><article class="zhi dan big">…</article><article class="zhi">…</article></div>
</main>
<footer class="threshold">…</footer>
```

## 十二、技術實作與相容性

| 技術 | 本站用途 | 支援現況（查證來源） | 不支援時 |
|---|---|---|---|
| CSS `@property` 註冊自訂屬性（B 動效層） | `--t`（`<number>`）一支時間軸驅動六塊版的揭示、錯位收斂與棕刷位置；`--fx/--fy`（`<length>`）每塊版的殘留錯位 | Baseline 2024：Chrome／Edge 85、Firefox 128、Safari 16.4（MDN〈@property〉） | 未註冊的屬性在 keyframes 裡離散跳變：每塊版在該步的一半時間直接出現，最後狀態相同 |
| CSS 錨點定位 `anchor-name`／`position-anchor`／`position-area`／`position-try-fallbacks`（C 版面層） | 門上的諧音物件（蓮、魚、門鎖的蝠＋錢）聚焦或滑過時，讀法標籤錨在物件上方、放不下就翻到下方 | Firefox 147（2026-01）補上後成為 Baseline Newly available；Chrome／Edge 125、Safari 26（web.dev〈New to the web platform in January 2026〉、MDN〈position-anchor〉） | `@supports not (anchor-name:--a)`：標籤不顯示，改在門下方顯示一段完整的「門上的暗語」文字 |
| Canvas 2D value noise → `toDataURL()` → CSS `mask-image`（A 渲染層） | 六張 128px 可平鋪的水印墨斑，分別遮罩六塊版，讓平色有吃墨不均的斑 | `mask-image` 無前綴自 Chrome 120（Chrome 120 beta 公告）、caniuse〈mdn-css_properties_mask-image〉；本站同時寫 `-webkit-mask-image` | 無 canvas／toDataURL 失敗：`--mk-*` 未設定、`mask-image:none`，色面完全平 |
| CSS `mod()` | 棕刷位置 `mod(var(--t),1)` | Chrome 125、Safari 15.4、Firefox 118 | `@supports not` → 不顯示棕刷，拓印照常 |
| SVG `<use>` 影子樹繼承自訂屬性 | 同一個 symbol 在六塊版各自上色 | 全部現代瀏覽器 | — |

**效能實測**（建置環境）：首頁 91.8KB、〈門口相〉84.4KB、〈價目〉81.0KB、〈來店〉66.7KB（皆含 35.6KB motion-library 子集），皆 <350KB。六張墨斑的 noise 計算在 Node 22 實測 18ms（128px×6），瀏覽器另加 `toDataURL` 編碼。拓印動畫只改動一個繼承屬性，六塊版各自只做 `clip-path` 與 `transform`，無版面重排。同一畫面同時運轉的 motion-library 元件 ≤2。建置沙箱無瀏覽器，首屏 JS 時間與 fps 未在真實瀏覽器量測，請以 DevTools 實測為準。
