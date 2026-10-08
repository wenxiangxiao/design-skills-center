---
name: streamline-moderne
description: Streamline Moderne (1930s American industrial design) for the web — racetrack and teardrop shapes with no sharp corners, triple horizontal speed lines trailing every heading and button, horizontal-band layouts, polished chrome rendered as a sky-horizon-ground reflection, portholes, and a jadeite / oxblood / Bakelite / cream palette, with extended slanted type that stretches further as the visitor moves faster.
---

# 流線摩登 Streamline Moderne

> 範例站：銀梭鋁殼拖車 GÎN-SO（`sites/gin-so/`）。本規格書不綁產業：同一套語言可以用在咖啡機、夜行列車、收音機行、游泳池、加油站、冰果室、旅行社。

## 一、設計哲學

流線摩登是 1930 年代大蕭條中的美國工業設計。Norman Bel Geddes 在《Horizons》（1932）裡把汽車、輪船、飛機全都畫成水滴；Raymond Loewy 1933 年做了一台鍍鉻的水滴形削鉛筆機——它根本不會動，而且據他事務所的人說還不太好用，但看起來很快；Hawley Bowlus 1934 年用飛機的鉚接鋁殼做出 Road Chief 拖車；Henry Dreyfuss 1938 年替紐約中央鐵路的〈20th Century Limited〉把整列火車連同餐具一起流線化。

它長成這樣有三個理由：

1. **風洞的語言被拿來當行銷語言。** 水滴形在空氣動力學上確實減阻，但被套到靜止的物件上之後，它的功能變成「讓人覺得這東西是新的、是快的」。所以本風格的核心不是形狀，是**方向**：所有東西都朝著同一個水平方向在跑。
2. **新材料與新工法。** 抽伸鋼板、壓鑄鋅、鍍鉻、電木（Bakelite）、鋁鉚接——這些工法不喜歡尖角（沖壓會裂、鍍層會積），於是轉角全部變圓。
3. **大眾化。** 它是 Art Deco 去掉金與對稱、變成量產之後的樣子：不是給沙龍的，是給廚房、加油站和長途巴士站的。

一句話：**讓靜止的東西看起來在跑。**

## 二、本風格的 5 個不可省略特徵

### 特徵 1：跑道形與淚滴形——全站沒有一個尖角

容器兩端全圓（跑道 stadium），或一端圓一端長（淚滴）。直角只留給文字本身。按鈕、標籤、列、窗、頁尾上緣，全部圓。

```css
.pill{border-radius:999px}
.teardrop{border-radius:999px 60px 60px 999px}   /* 圓頭朝前、尾端收 */
.foot{border-radius:120px 120px 0 0}              /* 頁尾像車頂 */
```
```svg
<!-- 側立面：前端橢圓 rx170、後端 rx230，不對稱才像在往前衝 -->
<path d="M200,30H740A230,160 0 0 1 740,350H200A170,160 0 0 1 200,30Z"/>
```

### 特徵 2：三道速度線（speed whiskers）

每個標題、主要按鈕、分隔線、導覽列後面，拖著**三條**等距水平細線：線寬＝間距，永遠水平、永遠朝後（右側或物件的尾端）。不是兩條、不是四條、不是斜的。

```css
.wh{position:relative;display:inline-block}
.wh::after{content:"";position:absolute;left:calc(100% + 12px);top:50%;width:150px;height:15px;margin-top:-7px;
  background:repeating-linear-gradient(180deg,currentColor 0 3px,transparent 3px 6px);
  mask:linear-gradient(90deg,#000 0 30%,transparent 100%);
  transform-origin:0 50%;transform:scaleX(calc(.32 + .68 * var(--spd,0)))}
.rule3{height:15px;border:0;background:repeating-linear-gradient(180deg,#1F1915 0 3px,transparent 3px 6px);border-radius:0 999px 999px 0}
```

### 特徵 3：水平主導＋寬體斜傾字

版面由一條條水平帶堆起來（車隊是「跑道列」，不是卡片網格；店史是一條路上的里程碑）。沒有垂直分欄線。拉丁字一律寬體、全大寫、微斜；中文字用 900 字重＋水平拉寬＋斜切。

```css
.vt{font-family:"Roboto Flex",sans-serif;text-transform:uppercase;letter-spacing:.02em;
  font-variation-settings:"wdth" var(--wd,118),"slnt" var(--sl,-3),"wght" var(--wg,760),"opsz" 72}
.vc{display:inline-block;font-weight:900;letter-spacing:.06em;transform-origin:0 100%;
  transform:skewX(calc(var(--sk,-4) * 1deg)) scaleX(var(--sx,1.03))}
```

### 特徵 4：鉻與拋光鋁＝「天／地平線／地」的反射

金屬不是灰色漸層，也不是拉絲紋。它是一面鏡子映出固定的世界：上方淺藍天、正中一條銳利的亮白地平線、下方暖褐土地。曲面越彎，那條地平線越彎。小面積（鉻條、銘牌框、導覽管）用 CSS 漸層；大面積（主視覺）用著色器從曲面法線算反射。

```css
--chrome:linear-gradient(180deg,#F8F9F6 0%,#CFD9DF 30%,#8FA3B0 47%,#F4F2EA 50%,#8C8670 53%,#6B5A4A 72%,#3A302A 100%);
.plate{border-radius:999px;background:var(--chrome);padding:3px}
```
```glsl
// 殼面高度場 → 法線 → 反射 → 查環境（完整版見範例站 shell.frag）
vec3 n=normalize(vec3(-(hx-h)*55.,-(hy-h)*55.,1.));
vec3 r=reflect(vec3(0.,0.,-1.),n); r.z=-r.z;
vec3 c = r.y>H ? mix(horizonWhite,skyBlue,pow((r.y-H)/.9,.55))
               : mix(fieldGreen,warmBrown,smoothstep(0.,.06,H-r.y));
```

### 特徵 5：舷窗、圓角窗與一條上色的腰線（航海細節＋電木色票）

圓形舷窗（鉻環＋深色玻璃）、圓角轉角窗、三道欄杆線是本風格借自遠洋郵輪的語彙。顏色只來自 1930s 的量產材料：玉綠 Jadeite 餐具、牛血紅瓷漆、電木黑、奶油白搪瓷。**整台物件唯一可以上的彩色是一條腰線**，其餘交給拋光金屬。

```css
.port{width:64px;height:64px;border-radius:50%;
  background:radial-gradient(circle,transparent 0 23px,#6E7A80 23.5px,#F5F6F2 25px,#9AA6AC 28px,#4C565C 30px,transparent 31px)}
.port .glass{position:absolute;inset:9px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#4F6E73,#1E2B2E 70%)}
.port[aria-current] .glass{background:radial-gradient(circle at 35% 30%,#F4E6B8,#E3A33B 55%,#B9741C)}
```

## 三、色彩系統

| 色 | hex | 用途 | 比例 |
|---|---|---|---|
| 玉綠 Jadeite | `#B9DCC4` | 全站地色（像一面玉綠搪瓷牆） | 38% |
| 奶油 Cream | `#F3EBD8` | 長文底、跑道列、表單欄 | 22% |
| 電木黑 Bakelite | `#1F1915` | 正文、路面、頁尾、深色列 | 16% |
| 拋光鋁 | 反射漸層（見特徵 4） | 主視覺、鉻條、舷窗環 | 14% |
| 牛血紅 Oxblood | `#8E2A24` | 腰線、主要按鈕、價格、錯誤 | 6% |
| 深玉 | `#2F5E48`／`#6FA889` | 小標、英文標籤、陰影 | 3% |
| 奶油糖 Butterscotch | `#E3A33B` | 現用舷窗、路面虛線、拋光把手 | 1% |

可讀性：電木黑對玉綠 11.7:1、對奶油 14.6:1；牛血紅對奶油 7.1:1、對玉綠 5.6:1；深玉 #2F5E48 對玉綠 5.0:1；奶油糖對電木黑 7.9:1；窗內字 #EAF2EE 對窗玻璃 12.8:1。

## 四、字體系統

- 拉丁與數字：**Roboto Flex**（Google Fonts，可變字型，軸 `wdth 25–151`、`slnt −10–0`、`wght 100–1000`、`opsz 8–144`）。靜止時 `wdth 118／slnt −3／wght 760`；運動時最高到 `151／−10／880`。
- 中文：**Noto Sans TC** 400／500／700／900。標題一律 900，以 `scaleX(1.03–1.17)`＋`skewX(−4°～−13°)` 做出寬斜。
- 字級：標題 56／44／28／22，正文 16，標籤 12–14（字距 .12–.26em）。行高正文 1.7、標題 1.08。
- 數字一律 `font-feature-settings:"tnum"`，寬 112、斜 −4。

## 五、版面與網格

- 最大寬 1240px，左右 clamp(16px,4vw,48px)。
- 由上而下是水平帶：主視覺帶 → 跑道列 → 里程碑路 → 規矩列。帶與帶之間 90–96px。
- 物件朝左（車頭在左）、速度線朝右；任何「前進」語意的動效都從右往左。
- 不旋轉版面；唯一的「斜」是字的 slant 與 skew。
- 主視覺固定比例 1000:420，所有疊加資訊以百分比座標貼在物件上（窗、腰線下、門牌）。≤700px 時疊加資訊改為下方清單，資訊不丟。

## 六、元件配方

- **導覽（舷窗列 porthole-row）**：右下角一根鉻管，四個 64px 舷窗＝四頁；現用頁玻璃亮奶油糖色、標籤翻黑；鉻管左邊拖三道速度線。≤820px 成為滿寬底欄。頁尾另有完整文字連結。
- **按鈕**：牛血紅跑道形，右側內嵌三道速度線；hover 時整顆往前（左）3px、速度線變長。
- **列（取代卡片）**：`border-radius:999px` 的奶油跑道，左側物件側立面、中段名稱與規格（規格項目前綴三道小速度線）、右側價格。
- **表單**：欄位全為跑道形；選項是跑道形 chip；錯誤字為淺牛血紅。
- **頁尾**：電木黑、上緣 120px 圓角（像車頂），左上一組三道速度線。

## 七、動效規則（4 種，各自有 reduced-motion 降級）

| 類型 | 本站實作 | 參數 | reduced-motion |
|---|---|---|---|
| ambient | 鋁殼映出的雲沿 x 漂移、地面紋向後流、輪轂慢轉；路面虛線前進 | 雲 `uT*.05`；虛線 7s linear | 著色器只畫一幀；虛線停止 |
| input | 游標位置即太陽，殼面高光 90ms 內跟上（每幀 18% 趨近）；速度字 | 見簽名 | 高光仍跟游標（靜態重繪一幀），字軸固定在靜止值 |
| transition | 跨文件 View Transitions：舊頁 `translateX(-28%) skewX(-6deg)` 開走 .5s、新頁從右 `34%` 駛入 .55s；車貼 FLIP 從站點飛進車貼盤 .52s；行程單 `clip-path` 由左往右展開 .62s | `cubic-bezier(.1,.6,.2,1)` | 全部取消，直接顯示 |
| signature | **速度字**：捲動與指標速度 → 目標值 → 阻尼彈簧（k=170, c=17，略欠阻尼，停下回彈一次）→ `--wd/--sl/--wg/--sk/--sx/--spd` → 字變寬變斜、速度線變長、殼面路紋加速 | 速度 2.4px/ms 滿格；目標每秒衰減到 2% | 不啟動；字維持 118／−3 |

## 八、插畫與圖像風格

**鉻面地平線反射（chrome-horizon）**：所有圖像都是拋光金屬的反射，而不是畫出來的明暗。明暗由曲面法線決定，世界是固定的（天空、地平線、田、路）。搭配：鉚釘縫（虛線）、深色玻璃窗、一條上色腰線、黑色輪胎。不畫人物、不畫風景本身——風景只出現在金屬的反射裡。小圖示（車貼）用無描邊平塗：跑道形底、圓形徽、白色剪影母題、三道速度線。

## 九、Logo 與 Favicon

- Logo：一台側面淚滴拖車（鏡面漸層）＋一扇圓角窗＋牛血紅腰線＋車尾三道速度線，240×80。
- Favicon：玉綠圓底上一顆跑道形，上半天藍、下半土褐、中間一條白地平線、一條紅腰線。

## 十、Do & Don't

- Do：所有前進語意朝左、速度線朝右；所有角都圓；金屬只用反射。
- Do：速度線永遠三條、等寬等距、水平。
- Do：讓物件本身承載資訊（窗裡寫價格、腰線下寫地址）。
- Don't：Art Deco 的金、放射扇與對稱階梯（那是上一個十年）。
- Don't：灰色線性漸層冒充金屬、拉絲紋、玻璃擬態模糊。
- Don't：紫藍漸層、置中三卡片、emoji 圖示、EST. 徽章、Lorem ipsum。
- Don't：斜向速度線、殘影拖尾、motion blur——那是未來派，不是流線。

## 十一、頁面骨架範例

```html
<header class="top"><a class="brand" href="index.html"><svg viewBox="0 0 240 80">…</svg><b class="vc">店名</b></a></header>
<main>
  <section class="elev wrap">
    <div class="stage" style="aspect-ratio:1000/420;position:relative">
      <canvas id="shell"></canvas>
      <svg class="tr-svg" viewBox="0 0 1000 420">…靜態鏡面漸層備援…</svg>
      <div class="nameplate"><span class="plate"><span><b class="vc">店名</b><span class="vt">NAME</span></span></span></div>
      <p class="ov win" style="left:32.8%;top:23.3%;width:14.4%;height:16.2%"><b>品項</b>價格</p>
    </div>
  </section>
  <section class="band wrap">
    <div class="sh"><h2><span class="vc wh">標題</span></h2><span class="vt">Label</span></div>
    <div class="fleet-row">…側立面｜名稱規格｜價格＋按鈕…</div>
  </section>
</main>
<nav class="ports"><a href="index.html" aria-current="page"><span class="gl"></span><b>首頁</b><i>HOME</i></a>…</nav>
```

## 十二、技術實作與相容性

三項核心技術，2026-10-08 查證：

### 1. 原生 WebGL 片段著色器（A 渲染層）
- 用途：殼面高度場（前後兩個不同 rx 的橢圓帽＋中段圓柱，`h=sqrt(1−r^1.6)`）以有限差分求法線、反射固定的天地環境，產生隨曲面彎曲的地平線；同一程式以 `uOx` uniform 在拋光頁切出「左半氧化霧面、右半鏡面」。
- 支援：WebGL 1 為 Baseline Widely available（各主流瀏覽器多年支援）。GLSL ES 1.00，無擴充、無函式庫；以 `@shaderfrog/glsl-parser` 做語法驗證，並以逐行移植的 CPU 版渲染比對畫面。
- Fallback：取不到 context、編譯或連結失敗 → 移除 canvas，底下的 SVG 鏡面漸層版（同一條 path）直接可見；拋光頁的氧化半邊改由一層 SVG 灰色 clipPath 表現，把手照樣可拖。
- 效能：DPR 上限 1.5；畫面離開視窗即停 rAF（IntersectionObserver）；每像素約 4 次高度場取樣＋2 次環境查詢。reduced-motion 下只在 resize／游標移動時畫一幀。

### 2. 可變字型軸 `font-variation-settings`（C 版面與樣式層）
- 用途：速度字。CSS 變數 `--wd/--sl/--wg` 寫進 `font-variation-settings:"wdth" var(--wd),"slnt" var(--sl),"wght" var(--wg)`，JS 只改根元素的變數。
- 支援：MDN 標示 `font-variation-settings` 為 Baseline Widely available（2018-09 起跨瀏覽器）。Roboto Flex 軸範圍 wdth 25–151、slnt −10–0、wght 100–1000、opsz 8–144（Google Fonts 資料，經 fonts.grida.co 軸表查證）。
- Fallback：字型載入失敗時退回 Noto Sans TC，軸設定被忽略、版面不變；中文標題的寬斜由 transform 承擔，不依賴字型。
- 效能：只有標題與標籤用 `.vt`／`.vc`；彈簧靜止後（|x|,|v|<0.002）停止 rAF，不常駐。

### 3. 跨文件 View Transitions（B 動效與時間軸層）
- 用途：`@view-transition{navigation:auto}`，整頁「開走」再「駛入」；品牌拖車以 `view-transition-name:trailer` 從首頁的大側立面縮進其他頁的頁首徽章。
- 支援：Chrome／Edge 126+、Safari 18.2+；**Firefox 尚未支援跨文件轉場**（Chrome for Developers〈Cross-document view transitions〉與 2026 年多篇相容性整理一致）。
- Fallback：不支援時就是一般換頁，資訊零損失；reduced-motion 下動畫設為 none。

### 其他
- 〈一趟車貼〉的車貼為 SVG 字串程序生成（10 種母題 × 色對），拖曳用 Pointer Events＋`getScreenCTM().inverse()` 換算座標；放置規則（不跨直／橫鉚釘縫、不壓窗門腰線、不出殼、不重疊）在放開時同步判定並回報原因；鍵盤可用 Enter 自動貼齊。
- 實測：四頁大小 index 36KB、tsu 42KB、siu 34KB、lai 25KB（≤350KB）；Node 22＋jsdom 下首屏腳本執行 index 0.7ms、tsu 8.4ms、siu 19.4ms、lai 5.7ms（<100ms）。動畫只動 transform、opacity、clip-path 與 CSS 變數。
