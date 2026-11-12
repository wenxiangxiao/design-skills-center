---
name: archigram-plug-in-collage
description: Archigram (London, 1961–1974) plug-in megastructure collage — axonometric space-frame with rounded capsules plugged in, pop red/yellow/sky-cyan flats with Zip-a-tone dot screens, cut-out collage with white scissor borders and flat paste shadows, comic speech balloons and starbursts, numbered Letraset call-outs, cranes, airships and telescopic walking legs.
---

# Archigram 插件城市拼貼 Archigram Plug-in Megastructure Collage

> 範例站：插仔舞台車 TSHAH-Á BÚ-TÂI（雲林北港・插件舞台車出租）。本 SKILL 不綁產業：任何「模組化、可拔可換、會移動、會在某地臨時長出來」的品牌都適用——快閃市集、行動餐車聚落、音樂祭、共享工作艙、露營車租賃、展覽搭建、模組家具、物流、機器人學校。

## 設計哲學

Archigram 是 1961 年在倫敦出刊的一份小雜誌與六人小組：Peter Cook、Warren Chalk、Dennis Crompton、David Greene、Ron Herron、Michael Webb。雜誌從 1961 到 1974 一共九期半（Archigram 1–9½），名字取自 architecture＋telegram：建築要像電報一樣急、短、新。他們幾乎沒有蓋房子，作品全是圖：

- **Plug-in City**（Peter Cook，1964）：一座沒有建築物、只有巨大框架的城市，住宅、商店、辦公是標準化的艙，由框頂的吊車插上去、用舊了拔下來換。
- **Walking City**（Ron Herron，1964）：城市是一隻隻長著伸縮腳的巨型艙體，自己走到需要它的地方。
- **Instant City**（1968–70）：一套坐飛艇、卡車巡迴的「零件包」，降落到小鎮、插上當地網路，幾天後收走——小鎮短暫變成大城市。
- 其他：David Greene〈Living Pod〉1965、Michael Webb〈Cushicle〉1966、Warren Chalk〈Capsule Homes〉1964。2002 年獲 RIBA 皇家金獎。

視覺上，它是**建築圖＋普普拼貼＋科幻漫畫**的合體：軸測技術圖上貼著雜誌剪下來的人物、飛艇、太空人；格網用 Zip-a-tone 網點紙上色；角落爆出漫畫泡泡「ZOOM！」；所有零件都標上 Letraset 轉印數字與引線。這些不是裝飾：

- 1960 年代英國小雜誌沒錢做四色照相製版，**網點紙與轉印字**是唯一買得起的「色調」與「字體」。
- 他們要說服人「建築可以像消費品一樣可拋、可換」，所以借用最消費性的語言：漫畫與廣告。
- **剪貼**本身就是論點——城市由現成零件組裝，圖也由現成圖片組裝。

所以本風格的主角永遠是**一個可以插東西的框**，以及**正在被插上的那個東西**。

## 本風格的 5 個不可省略特徵

### ① 巨構框＋插件艙：軸測桁架上插著圓角膠囊，框頂有吊車
畫面一定要有一副「沒有建築、只有框」的桁架（30° 軸測，粗黑管、少數紅色斜撐），以及插在框上的圓角艙；艙是唯一有圓角的東西。網頁上，**任何內容容器都是「艙」，任何格子都是「插座」**：同一個艙插大插座就攤開、插小插座就收成名字與價錢（container queries）。

```css
.sk{container-type:inline-size;container-name:sock;border:4px dashed #161616;border-radius:20px}
.pod{border:3.5px solid #161616;border-radius:clamp(14px,6cqi,34px);box-shadow:5px 6px 0 #161616;outline:5px solid #FBF8EE}
@container sock (min-width:420px){.pod .sp,.pod .nt{display:block}}
@container sock (max-width:190px){.pod{grid-template-columns:1fr;text-align:center}}
```
```js
// 軸測投影（建置期產生 SVG）：x 往右下、y 往左下、z 往上
const P=(x,y,z)=>[OX+(x-y)*Math.cos(Math.PI/6)*K, OY+((x+y)*.5-z)*K];
```

### ② 普普分色＋Zip-a-tone 網點：平塗、零漸層，陰面一律用網點
天空青、訊號紅、檸檬黃、紙白、墨黑五色平塗；**明暗只能用網點**（陰面＝網點面、受光面＝平色），零漸層、零模糊陰影、零發光。

```css
body{background:#5EC3E6 radial-gradient(#2E9BC6 1.3px,transparent 1.6px) 0 0/9px 9px}
.dots-red{background:radial-gradient(#E8382B 30%,transparent 32%) 0 0/7px 7px,#FBF8EE}
```
```svg
<pattern id="bdR" width="7" height="7" patternUnits="userSpaceOnUse"><rect width="7" height="7" fill="#FBF8EE"/><circle cx="3.5" cy="3.5" r="2.1" fill="#E8382B"/></pattern>
```

### ③ 三種字各司其職：寬圓幾何黑體標題、漫畫狀聲字、Letraset 窄體編號標註
- 標題：Unbounded 900（寬、圓、像 1960 年代未來感招牌）＋ Noto Sans TC 900。
- 狀聲字：Bangers，黃字黑描邊＋4px 實心平影，只出現在爆炸框與泡泡裡（KLUNK！ZOOM！PLUG IN）。
- 標註：Archivo Narrow 600 大寫、字距 .06em，前面一定有黑底圓圈數字與一根引線——像 Letraset 轉印。

```css
.boom{font:400 3rem/1 "Bangers";color:#FFD21F;-webkit-text-stroke:2.5px #161616;paint-order:stroke;text-shadow:4px 4px 0 #161616}
.num{display:inline-grid;place-items:center;width:1.7em;height:1.7em;border-radius:50%;background:#161616;color:#FBF8EE;font:700 .8rem "Unbounded"}
```

### ④ 剪貼：白色剪刀邊＋平影，比例互相衝突
每個「貼上去」的東西都要有 4–5px 白邊（剪刀沿著輪廓剪下來留的紙）與 5–6px 的實心平影（零模糊）；人物比車還大、飛艇比框還小都可以，**比例衝突是拼貼的證據**。SVG 用 feMorphology 擴張出白邊，HTML 用 outline＋box-shadow 等效。

```svg
<filter id="cut" x="-10%" y="-10%" width="125%" height="130%" color-interpolation-filters="sRGB">
 <feMorphology in="SourceAlpha" operator="dilate" radius="4" result="d"/>
 <feFlood flood-color="#FBF8EE"/><feComposite in2="d" operator="in" result="w"/>
 <feOffset in="d" dx="5" dy="6" result="o"/><feFlood flood-color="#161616"/><feComposite in2="o" operator="in" result="s"/>
 <feMerge><feMergeNode in="s"/><feMergeNode in="w"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
```
```css
.cut{background:#FBF8EE;outline:5px solid #FBF8EE;box-shadow:5px 6px 0 5px #161616;border:2.5px solid #161616}
```

### ⑤ 漫畫母題：對話泡泡、爆炸框、吊車、飛艇、伸縮腳
泡泡是橢圓＋斜三角尾；爆炸框是 16 角星；吊車吊著艙、飛艇拖著布條、車或艙底下伸出伸縮腳（Walking City）。至少三樣同時在場。

```css
.bub{background:#FBF8EE;border:3px solid #161616;border-radius:50%/46%;padding:.9em 1.4em}
.burst{clip-path:polygon(50% 0,60% 22%,84% 8%,76% 33%,100% 38%,79% 54%,95% 76%,70% 72%,66% 100%,50% 80%,34% 100%,30% 72%,5% 76%,21% 54%,0 38%,24% 33%,16% 8%,40% 22%);background:#FFD21F}
```

## 色彩系統

| 色 | hex | 用途 | 比例 |
|---|---|---|---|
| 天空青 sky | `#5EC3E6` | 頁面底、拼貼天空 | 40% |
| 深天青 sky2 | `#2E9BC6` | 只當網點（天空網紋） | 5% |
| 紙白 paper | `#FBF8EE` | 剪刀邊、卡片、艙 | 25% |
| 墨黑 ink | `#161616` | 線、字、平影、LED 牆 | 15% |
| 訊號紅 red | `#E8382B` | 主要按鈕、斜撐、現用插頭 | 8% |
| 檸檬黃 yellow | `#FFD21F` | 吊車臂、狀聲字、次要按鈕 | 6% |
| 草綠 green | `#4FA84A` | 只給指示燈與少數艙 | 1% |

規則：同一個面只能是平色或「紙白＋一色網點」；紅黃不相鄰時中間要有黑線。

## 字體系統

- Google Fonts：`Unbounded:wght@700;900`、`Bangers`、`Archivo Narrow:wght@600`、`Noto Sans TC:wght@400;700;900`。
- 字級：H1 `clamp(2.2rem,6vw,4.6rem)`／H2 `clamp(1.6rem,4vw,2.8rem)`／狀聲字 `clamp(2rem,5vw,3.4rem)`／正文 16px 行高 1.65／標註 .78rem。
- 標題行高 1.05、字距 −.01em；英文副標字距 .12–.14em。

## 版面與網格

- 首屏是一張 16:9 軸測拼貼：右 60% 放「框＋車＋吊車」，左下壓一張旋轉 −2.2° 的資訊剪貼卡。
- 內頁用插座框：CSS grid 6 欄，插座 L 佔 4×2、M 佔 2×1、S 佔 2×1，框粗 8px 黑、框內 45° 斜撐紋。
- 剪貼卡輪流 ±0.8–2.2° 旋轉；插座、按鈕、表格不旋轉。
- 留白：區塊間 72px；內容卡之間 22–26px（要留出平影的位置）。

## 元件配方

- **導覽（排插 power-strip-nav）**：左下固定一條排插，三個插座＝三頁；現用頁插頭插到底、變紅、綠燈亮，其他插頭懸在上方 30px，hover 往下 16px。≤560px 攤滿底部。
- **按鈕**：紅或黃平色、3px 黑框、4px 平影；hover 往左上 2px、平影 6px；按下往右下 3px、平影 1px。
- **卡片（剪貼卡）**：`.cut`；需要色調時加 `.dots-red／.dots-yel`。
- **艙（pod）**：見特徵①；艙內三層資訊：圖示／名稱／價錢，寬插座才顯示規格與附註。
- **表單**：3px 黑框紙白、零圓角；派車單用黃網點卡＋紅色印章框。
- **footer**：紙白長條、上 3px 黑線，一行行列店家資訊。

## 動效規則

| 種類 | 本站實作 | 觸發 | 時間／easing |
|---|---|---|---|
| ambient | 飛艇拖布條橫越天空；燈架六盞燈 steps(1) 輪流閃；BG-A-23 漫畫天空 | 載入即播 | 飛艇 70s linear；燈 1.2s steps(1) |
| input | 拼貼三層視差（data-depth 8／12／16／26px）；艙 hover 拔起 3×6px；排插 hover 插頭下壓 | pointermove（rAF 合併，<16ms） | 插頭 .22s cubic-bezier(.3,1.6,.5,1) |
| transition | 行走城市：點內頁連結，一節紅色車廂伸出四支腳走過畫面，網點黃幕蓋上再換頁，新頁黃幕往右退；零件表換插座用 FLIP（先升 40px 再落下彈 6px） | 點擊 | 走 900ms linear、幕 560ms cubic-bezier(.6,0,.2,1)；FLIP 620ms |
| signature | **吊車擺錘插艙**：台車正弦往返，吊鉤是被台車加速度驅動的阻尼單擺；放開後照拋體落下，落進插座導槽後用欠阻尼彈簧「咚」地壓一下（k=900、c=18），爆出 KLUNK！ | 首頁自動示範；〈插上去〉由使用者放手 | 擺：θ''=−(g/L)sinθ−(a/L)cosθ−cθ'，g=1800px/s²，c=.35 |

自我限制：不用淡入當主打；不用 blur／glow；所有彈跳都用彈簧積分而非 CSS bounce keyframe。

### motion-library 元件表（PLAYBOOK §2.8）

| ID | 名稱 | 頁 | 參數 | 角色 | 承載什麼／為什麼適合 |
|---|---|---|---|---|---|
| BG-A-23 | Comic Sky | 首頁 | primary `#5EC3E6`、secondary `#FBF8EE`、bg `#161616`、duration 24、density .8、seed 1979、16:9 | ambient | 拼貼的天空：放射日光＋黑描邊白雲是 1960 年代漫畫天空，正好是 Archigram 拼貼裡貼雜誌天空的位置；純平塗零 blur |
| TXT-A-04 | Punch Zoom | 首頁 | text「出車！」、primary `#E8382B`、bg `#FFD21F`、duration 1.4、loop false | transition | 「出車！」從畫面裡撞出來＝Archigram 的 ZOOM！；黃底→字自動近黑 |
| BG-B-13 | Isometric Grid | 零件表 | primary `#FFD21F`、secondary `#FBF8EE`、bg `#5EC3E6`、duration 16、density 1.2、intensity .8、1:1 | ambient | 菱形軸測格＝巨構框的平面投影，菱格依波相位亮黃，像框上的插座通電 |
| BG-B-03 | Comic Dots | 插上去 | primary `#2E9BC6`、secondary `#FBF8EE`、bg `#5EC3E6`、duration 20、intensity .5 | ambient | 遊戲場的 Zip-a-tone 天空，multiply 疊在天空青上只剩深青網點，不搶艙的顏色 |
| TXT-A-01 | Word Burst | 插上去 | text「KLUNK!」、primary `#FFD21F`、bg `#E8382B`、duration 1.3、loop false、wait（插完才播） | transition | 全部插完、車站起來的那一下的狀聲字爆炸；紅底→字自動近白 |

出處：`MotionLib.prompt(id)`（motion-library 1.39.0 @bafd6002）。掛載照 `sites/ka-to` 的包裝：fonts.ready 才掛、離屏 destroy、canvas `aria-hidden`、`.ml-fb` 保留 HTML 標題。

## 插畫與圖像風格

- 全站零點陣圖：首頁拼貼是建置期以 iso 投影產生的 SVG（盒子三面：頂面平色或網點、兩側一平色一網點），人物是「圓頭＋梯形身」剪影，填網點 pattern、加 `#cut` 白邊。
- 技術圖與剪貼混用：桁架是乾淨的黑線（技術圖），人物、飛艇、泡泡是剪貼（白邊＋平影）。
- 一張圖裡至少要有一個「正在被插上去」的東西。

## Logo 與 Favicon 設計指南

Logo：紅色圓角艙＋頂上兩根插腳＋中央黃色指示燈，右側接一段導線連到字標「插仔舞台車」與白字黑描邊英文。Favicon 只留紅艙＋插腳＋黃燈，32px 下仍可辨認。

## Do & Don't

- Do：每頁都有框與艙；每個貼上去的東西都有白邊與平影；狀聲字只在泡泡與爆炸框裡。
- Do：網點表示陰面；黑線粗細 3／6／9px 三階。
- Don't：漸層、模糊陰影、玻璃擬態、霓虹發光——Archigram 的「未來」是印刷出來的，不是發光的。
- Don't：把艙做成直角卡片、把桁架做成細灰線（那會變成工程製圖）。
- Don't：紫藍漸層 hero、置中三張圓角卡、emoji icon、Lorem ipsum、「EST. 19xx」徽章。

## 頁面骨架範例

```html
<section class="hero" id="hero">
 <div class="ml sky" id="ml-sky" aria-hidden="true"></div>
 <svg class="art" viewBox="0 0 1200 675" role="img" aria-label="…"><!-- 桁架 data-depth=8 / 地面腳 12 / 車 16 / 人物 26，各層 class="svgcut" --></svg>
 <div class="bub say">插上去，<br>就開演。</div>
 <div class="card cut"><h1>店名<small>ENGLISH NAME</small></h1><p>…</p><a class="btn" href="plugin.html">主要動作</a></div>
</section>
<div class="frame"><div class="sk L" data-size="大插座 L"><button class="pod">…</button></div><div class="sk M">…</div></div>
<nav class="strip"><div class="body"><a class="sock" href="index.html" aria-current="page"><span class="plug">車台</span><i class="led"></i></a>…</div></nav>
```

## 技術實作與相容性

### 1. requestAnimationFrame 物理積分：驅動單擺＋拋體＋欠阻尼彈簧（B 動效與時間軸層）
- 承載 signature 與 func。台車 `x=mid+A·sin(φ)`，吊鉤角 θ 以半隱式 Euler、1/120s 子步積分 `θ''=−(g/L)sinθ−(a_x/L)cosθ−cθ'`；放開時以吊鉤速度為初速做拋體，越過插座中線且 |dx|<24+0.1w 即插入，否則落地反彈（vy×−.32）後重吊。
- 實測（node 22）：10 萬步積分 9ms；每幀 <0.1ms。插入窗口模擬：七個艙可插的放手時機佔 4–15%（每個往返約 7 秒、有 2 次以上機會）。
- 支援：`requestAnimationFrame` Baseline 廣泛可用（MDN）。reduced-motion：首頁吊車停在已插好的狀態；遊戲照常（使用者自己放手），結尾腳直接伸好、不播彈跳。

### 2. CSS container queries＋container query units `cqi`（C 版面與樣式層；最近 6 站未出現）
- 承載特徵①：插座 `container-type:inline-size`，艙內版面以 `@container sock (min-width:420px)`／`(max-width:190px)` 切三種，圓角與字級用 `cqi` 跟著插座寬度長。
- 支援：size container queries 與 cq 單位於 Chrome／Edge 105、Safari 16、Firefox 110 起穩定（web.dev〈Container queries land in stable browsers〉、〈Container queries and units in action〉）。
- Fallback：不支援時 `@container` 整段被忽略，艙一律用中尺寸版面（圖示＋名稱＋價錢），`clamp()` 的下限值生效，資訊不缺。

### 3. SVG filter `feMorphology dilate`＋`feFlood`＋`feComposite`＋`feOffset` 剪貼白邊（A 渲染層）
- 承載特徵④：SourceAlpha 擴張 4px 成剪刀邊、再位移 5×6px 成平影，零模糊；同一個 `#cut` 用在 SVG 群組與 HTML 排插（CSS `filter:url(#cut)`）。
- 支援：MDN〈feMorphology〉標示 Baseline Widely available（自 2015-07）。
- Fallback：濾鏡失效時物件照常顯示，只少白邊；HTML 卡片本來就用 outline＋box-shadow，不依賴濾鏡。

### 效能預算（實測）
- 單頁：index 331KB／kit 316KB／plugin 320KB（含 motion-library 子集約 289KB）≤350KB。
- 首屏 JS：本站自有腳本 12–17KB（未壓縮），初始化只做一次 DOM 插入與一個 rAF 迴圈；建置環境無真實瀏覽器，首屏執行時間未能以 DevTools 實測，jsdom 冒煙測試全頁無錯誤。同畫面同時運轉的 motion-library 元件 ≤2。
- Reduced motion：飛艇與燈停、無行走轉場、無 FLIP、ML 背景 `seek(.35)`、文字 `seek(1)`；資訊與操作零損失。
