---
name: majolica-relief-tile
description: Japanese-made majolica relief tiles of the 1915–1935 era as seen on Taiwanese shophouse facades (花磚) — four-tile repeats whose corner quarters only complete a flower across the seam, transparent coloured glazes that pool deeper and darker in the hollows of a pressed relief, pale raised outline ridges around every colour field, Chinese rebus motifs (bat, peach, coin, lotus, fish, pomegranate) inside Victorian medallions, always set into red brick and terrazzo.
---

# 花磚（日製馬約利卡浮凸彩釉磚）‧ 四片拼一花

## 0. 血緣與定位

- **流派名稱**：日本製馬約利卡磚（Japanese majolica tile，日文マジョリカタイル）；台灣通稱「花磚」，南洋華人與峇峇娘惹建築上的同類稱 Peranakan tiles。
- **年代與地域**：大正至昭和初年（約 1912–1945）在日本燒製，台灣現存原磚集中在 1915–1935 年間；外銷台灣、新加坡、馬來西亞、泰國等地。台灣本地沒有生產過裝飾花磚。
- **上游**：英國維多利亞時代的 majolica 浮凸彩釉磚（Minton 等廠的乾壓成形、透明色釉）；日本廠商仿製後把東方吉祥母題塞進西式構圖。
- **用途**：富裕人家街屋、宅第與廟宇立面的高處（山牆、門楣、腰帶、窗楣），用來取代原本要請匠師雕刻的石雕、剪黏與交趾陶；例如三重先嗇宮 1925 年整修時加貼的日本磚。
- **為什麼長成這樣**：(1) 鋼模乾壓成形，所以每一塊顏色都被一條浮凸線圍住；(2) 色釉是透明的、一格一格用手點，燒時往低處流——顏色的濃淡由凹槽深度決定，不由畫師決定；(3) 一片 6 吋磚太小放不下完整圖案，所以圖案設計成四片（或更多）交會才成形；(4) 手工點釉太耗工，戰後停產，這一切只存在於約二十年間。
- **外部參照**：Museum of Old Taiwan Tiles（嘉義台灣花磚博物館）；Taiwan Today〈Taiwan Review〉花磚專題（引康鍩錫、堀込憲二）；The Peranakan Magazine〈Tiles in Style〉（新加坡 Tan Soo Hock & Co. 進口歐洲 majolica 的紀錄）。
- **與近親的分界**：伊茲尼克陶（İznik）是無浮凸的釉下彩、亞美尼亞紅與錳黑輪廓、無限延伸的花葉；本風格是浮凸線＋透明色釉積凹、圖案以四片為單位閉合。葡萄牙 azulejo 是錫釉白地上的鈷藍筆繪、平面無浮凸；本風格無筆觸、顏色全是釉深。陶釉開片（宋哥窯）是單色釉面的裂紋；本風格是多色、裂紋不是主角。Art Nouveau 的鞭形曲線只出現在卷藤上，母題是東方字謎而非女性與植物。

## 1. 設計哲學

一片花磚自己不成花。它的四個角各畫著四分之一朵，只有跟另外三片對準，交會的那一點才長出完整的一朵——日本時代的土水師傅叫它「門心花」。這個風格因此天生是**關係性**的：意義（吉語）只存在於接縫上，單看一片永遠讀不完整。

第二件事是**顏色不是被選的，是被積出來的**。同一罐翡翠綠釉，在深凹處是濃綠、在隆起的桃子頂上是淡綠、在浮凸線上幾乎是胎的奶白。設計時你決定的是「高度」，顏色是結果。

第三件事是**它永遠鑲在一面牆裡**。花磚不是畫框裡的圖，它被紅磚、洗石子線腳與匾額包圍；版面上任何一塊磚都必須看得出「它貼在哪個建築構件上」。

## 2. 本風格的 5 個不可省略特徵

### 特徵 1（形狀語彙／版面）：四片拼一花——角上的四分之一朵只在接縫完成

正方磚、灰縫可見（約磚寬 1.2–1.6%），每片四角各有一個半徑約 28% 的角盤，盤內是一個母題的四分之一；兩條對角線上的角花必須不同種（A 落 NE/SW、B 落 NW/SE），所以**轉 90° 會換掉交會處的花**。拿掉它就只剩一片片獨立的裝飾磚，不是花磚。

```css
/* 灰縫＋磚格（靜態版） */
.tile-wall{display:grid;grid-template-columns:repeat(4,1fr);gap:1.4%;background:#CFC4B0;padding:1.4%}
.tile-wall>svg{aspect-ratio:1;width:100%}
```
```svg
<!-- 一片磚的角盤：圓心在磚角、被 viewBox 裁掉四分之三 -->
<svg viewBox="0 0 100 100"><rect width="100" height="100" fill="#2E7D62"/>
  <circle cx="0" cy="0" r="28" fill="#E8C98E" stroke="#F3EBDB" stroke-width="1.5"/>
  <circle cx="100" cy="100" r="28" fill="#E8C98E" stroke="#F3EBDB" stroke-width="1.5"/>
  <circle cx="100" cy="0" r="28" fill="#A9BDD9" stroke="#F3EBDB" stroke-width="1.5"/>
  <circle cx="0" cy="100" r="28" fill="#A9BDD9" stroke="#F3EBDB" stroke-width="1.5"/></svg>
```

判定規則（可直接用）：2×2 的門心由 TL 的 SE、TR 的 SW、BL 的 NE、BR 的 NW 四角組成；旋轉 r（順時針 r×90°）後畫面角 c 顯示的是原始角 `(c−r) mod 4`。

### 特徵 2（色彩規則）：透明色釉積凹——顏色＝釉的深度

每塊色由「釉色 × 釉厚」算出：`顯色 = 胎色 × 釉色^(d/0.45)`，`d = max(G − h, 0)`，G 為釉面高（0.92），h 為該點浮凸高。深凹處飽和、隆起處淡、浮凸線上近胎色。**不准平塗**：同一塊色裡至少要有「邊深中淺」的明度變化。色板只有五罐釉＋奶白胎：翡翠綠、鈷藍、琥珀黃、玫瑰紅、朱（另有桃橙與榴紅只給果實）。零黑、零灰、零漸層色帶（明度變化只來自深度）。

```css
/* 靜態近似：同一釉色在三種高度下的預先算好的色值 */
:root{--jade-deep:#235F4B;--jade-mid:#5C9A80;--jade-thin:#BFD7C9;
      --amber-deep:#C98A28;--amber-thin:#EDD6A6;--body:#F3EBDB}
.glaze-dome{background:radial-gradient(circle at 40% 38%,var(--jade-thin),var(--jade-mid) 55%,var(--jade-deep))}
```

### 特徵 3（裝飾母題）：浮凸線——每塊顏色都被一條淺色隆線圍住

所有色塊之間必有一條 1.4–1.6 單位（磚寬 100）的奶白浮凸線，線上有高光、線腳有一圈細陰影；**兩塊顏色永遠不直接相接**。圓章外圈另有八顆浮凸珠。拿掉它就成了平面印刷磚。

```svg
<!-- 浮凸線：先畫 1.8 倍寬的暗邊，再畫奶白隆線 -->
<path d="M0,-12 C5,-8 11,-3 10,4 C9,10 4,12 0,10 C-4,12 -9,10 -10,4 C-11,-3 -5,-8 0,-12Z" fill="#E59A6E"/>
<path d="…同上…" fill="none" stroke="rgba(60,30,20,.28)" stroke-width="2.7"/>
<path d="…同上…" fill="none" stroke="#F3EBDB" stroke-width="1.5" stroke-linecap="round"/>
```

### 特徵 4（裝飾母題）：吉祥字謎塞進維多利亞圓章

中心是雙圈圓章（外圈色帶＋八珠、內圈奶白地），內放一個東方吉祥母題；四向各伸一支 S 形卷藤與一對葉，在磚邊中點留半朵小花與鄰磚接起來。母題一律讀諧音：蝠＝福、桃＝壽、錢（方孔，孔叫眼）＝前、蓮＝連、魚＝餘、石榴＝多子。吉語由「門心花 × 中心圖」組成：蝠×桃＝福壽雙全、錢×蝠＝福在眼前、蓮×魚＝連年有餘、石榴×桃＝多子多壽、蝠×（桃＋石榴）＝多福多壽多子、蓮×石榴＝連生貴子。

```svg
<g transform="translate(50 50)">
  <circle r="25" fill="#D99A2B" stroke="#F3EBDB" stroke-width="1.5"/>
  <circle r="20" fill="#F1E6CF" stroke="#F3EBDB" stroke-width="1.5"/>
  <!-- 八珠：r=22.5 上每 45° 一顆 r=1.5 奶白圓 -->
</g>
```

### 特徵 5（版面手法）：永遠鑲在立面裡——紅磚、洗石子、匾額

花磚不單獨出現：它在門楣、腰帶（dado）、山牆或柱面上，被洗石子框（灰底帶黑白紅細粒）與紅磚順砌牆包圍；店名刻在洗石子匾上（字有上亮下暗的刻痕陰影），對聯直排刻在門兩側。釉面有方向光的鏡面高光——這是它跟紙上印刷品的分界。

```css
.terrazzo{background-color:#C6BDAD;background-image:
  radial-gradient(circle at 30% 40%,#7D7569 .9px,transparent 1.4px),
  radial-gradient(circle at 60% 70%,#F4EEE2 1px,transparent 1.5px),
  radial-gradient(circle at 50% 50%,#9C5A44 .8px,transparent 1.3px);
  background-size:7px 7px,9px 11px,13px 12px}
.carve{color:#3B2E26;text-shadow:0 1px 0 rgba(255,255,255,.7),0 -1px 0 rgba(0,0,0,.4)}
body{background:#9A4532 url("data:image/svg+xml,…順砌磚 96×56…") 0 0/96px 56px}
```

## 3. 色彩系統

| 角色 | hex | 用途 | 面積 |
|---|---|---|---|
| 紅磚 | `#9A4532`（暗 `#8F3E2D`、亮 `#A04B36`） | 全站底：順砌磚牆 | ~35% |
| 砌縫 | `#C9BCA4` | 磚縫、灰縫 | ~4% |
| 洗石子 | `#C6BDAD` ＋ 粒 `#7D7569`/`#F4EEE2`/`#9C5A44` | 框、匾、對聯、線腳 | ~14% |
| 灰泥 | `#F1E9D8` | 所有長文的底板 | ~26% |
| 胎（奶白） | `#F3EBDB` | 浮凸線、淺釉處、反白字 | — |
| 翡翠綠釉 | `#2E7D62` | 地釉、葉 | 磚內 |
| 鈷藍釉 | `#2F5E9E` | 地釉、魚、連結與主按鈕 | 磚內／~3% |
| 琥珀黃釉 | `#D99A2B` | 圓章、錢、focus ring、強調框 | 磚內／~2% |
| 玫瑰紅釉 | `#C85A6E` | 蓮、粉地 | 磚內 |
| 朱釉 | `#B33A35` | 蝠、h1 強調字、「破花」警示 | ≤2% |
| 墨 | `#2A211C`（次 `#5A4A3E`） | 正文 | — |

色值是**參考深度 0.45 下**的釉色；實際顯色一律經特徵 2 的公式。長文只坐在灰泥上，不坐在磚上。

## 4. 字體系統

- **Noto Serif TC**（Google Fonts）400／600／900：900 給匾額與標題（字距 .08–.32em，像刻字）；400 正文 17px / 行高 1.85。
- **Marcellus**（Google Fonts）：拉丁小標、磚號（`No.01`）、價錢數字，全大寫字距 .14–.3em——取自日製花磚背面壓印的羅馬字與型號。
- 級數：h1 clamp(30–64px)／h2 clamp(26–40px)／h3 21px／正文 17px／註 13–14.5px。
- 直排只給對聯與磚柱導覽標籤（`writing-mode:vertical-rl`）。

## 5. 版面與網格

- 基本單位是磚：磚寬 100 的座標系，灰縫 1.2–1.6%。所有磚面一律正方，2×2、4×2、8×2、4×4 排列；**不旋轉頁面元素**，旋轉只發生在磚自身的 90° 步進。
- 首屏是建築立面：山牆（洗石子）→ 簷口 → 門楣磚帶（8×2，手機 4×2）→ 門洞。門洞是圓拱頂深木色框，內容放在門洞裡的灰泥板上。
- 長文區塊＝洗石子框（14px）包灰泥板（內距 18–40px）。
- 留白：區塊間 40–90px 的紅磚；磚牆本身就是留白，不需要大面積空地。
- RWD：≤820px 磚柱導覽改為底部橫列；≤560px 對聯隱藏、門楣 4×2。

## 6. 元件配方

- **導覽（pier-tiles 磚柱）**：右側 84px 一根紅磚壁柱（左緣洗石子包邊、上下柱頭柱礎），四片小磚＝四頁。非現用頁是**素燒（未上釉）**的奶白浮凸磚，現用頁是上了釉的那一片＋琥珀框；hover/focus 時釉色淡入 .35s。直排頁名。
- **按鈕**：鈷藍或翡翠綠實地、900 字重、字距 .18em、內側上亮下暗兩道 inset 線（像釉面的厚度）、圓角 2px。
- **匾額（plaque）**：`#E9E1CF` 底、3px `#8E8576` 框＋內縮 4px 再一道框、刻字陰影。
- **卡片**：洗石子框＋灰泥板；磚圖在上、文字在下；不要圓角陰影卡。
- **表單**：2px `#8E8576` 實線框、`#FBF7EE` 底、focus 為 3px 琥珀外框；合計列用 `border-top:3px double`。
- **頁尾**：直接在紅磚上，奶白字加 1px 黑陰影；logo 是一片簡化花磚。

## 7. 動效規則（四種全有，皆有 reduced-motion 降級）

| 種類 | 內容 | 觸發／時間 | reduced-motion |
|---|---|---|---|
| ambient 環境 | 釉面光源依訪客本地真實時刻走：06–18 時從左（東）經頂到右（西），夜間換成由下往上的暖色騎樓燈；再疊 ±0.16 的緩慢擺動 | 常駐，30fps，畫面外暫停（IntersectionObserver） | 關閉擺動，光源固定在當下時刻 |
| input-driven 輸入 | 游標／手指位置即光源方向，鏡面高光即時跟著走（<16ms）；手機可授權 DeviceOrientation 以傾斜帶光；放開 4 秒回到日光 | pointermove／deviceorientation | 保留（直接操控，無補間） |
| transition 轉場 | 「貼磚」：換頁時素燒磚沿對角線一片片貼滿畫面（每片 240ms、延遲 32ms×(x+y)），新頁再沿反向一片片剝落 | 站內連結點擊（Web Animations API，等全部 `finished` 才跳頁） | 不攔截連結，直接換頁 |
| signature 簽名 | **流釉**：釉面高度 G 從 0 升到 0.92，最深的地先上色、圓章與隆起的果實後上、浮凸線最後也只淡淡一層——顏色依深度先後出現 | 首屏載入（對角線錯開 150ms）、放進一片磚、hover 磚譜卡片；1.7s，ease-out(2.2) | 直接全釉 |

本站不用：淡入上滑、視差、跑馬燈、數字計數。

## 8. 插畫與圖像風格：glaze-relief-tile 浮凸色釉磚

全站沒有一張「畫」的插圖：首屏門楣、拼磚台、牆面預覽、磚譜、腰帶、導覽與 favicon 全部出自同一份母題定義（路徑＋釉色＋高度），瀏覽器端烘成高度場圖集交給 WebGL，Node 端烘成靜態 SVG。母題外形用 `C` 貝茲曲線、末端圓鈍、零尖刺；每個母題約 ±12 單位、朝上（−y）定義，角花放在離角 13.5 單位的對角線上、朝磚心。

## 9. Logo 與 Favicon

Logo＝一片簡化的花磚：翡翠地、四角四分之一角盤（琥珀與鈷藍交替）、奶白圓章中一個朱色「入」字（同時是屋頂）。Favicon 同構 32×32，inline SVG data URI。不要在 logo 上加立體高光——高光留給真正的釉面。

## 10. Do & Don't

- Do：讓吉語只在四片交會時成立；每塊顏色都有浮凸線圍住；長文坐在灰泥上；磚永遠鑲在牆構件裡。
- Do：顏色由深度算出，同一塊色要有邊深中淺。
- Don't：平塗色塊、黑色描邊、漸層色帶、單片磚就把圖畫完整、把磚做成圓角卡片、在磚上放長文。
- Don't（去 AI 化）：紫藍漸層、置中三卡片、emoji icon、Lorem ipsum、「EST. 19xx」徽章、千篇一律的模糊陰影卡。

## 11. 頁面骨架範例

```html
<body>
  <nav class="pier" aria-label="主選單">
    <a href="index.html" aria-current="page"><span class="tl"><svg class="bq">…素燒…</svg><svg class="gz">…上釉…</svg></span><span class="lb">門口</span></a>
    …
  </nav>
  <header class="facade">
    <div class="parapet"><svg class="gable">…洗石子山牆…</svg><span class="plaque">好入厝搬家</span></div>
    <div class="cornice"></div>
    <div class="lintel"><div class="surf" id="band" role="img" aria-label="…"><svg>…靜態磚…</svg><canvas></canvas></div></div>
    <div class="doorway">
      <div class="couplet terrazzo carve">花開四角</div>
      <div class="door"><div class="plaster"><h1>…</h1><p>…</p><a class="btn" href="four.html">…</a></div></div>
      <div class="couplet terrazzo carve">福入千門</div>
    </div>
  </header>
  <main class="wrap"><section><div class="frame terrazzo"><div class="plaster">…</div></div></section></main>
</body>
```

## 12. 技術實作與相容性

### 12.1 核心技術（三項，三層不同）

1. **原生 WebGL 1 片段著色器：浮凸高度場＋Beer–Lambert 透明釉吸收（A 渲染層）**。六款磚由 Canvas 2D 依母題路徑畫成 768×512 圖集——RGB＝釉色、A＝高度（徑向漸層做隆起，白色 stroke 做浮凸線，再以 3×3 箱形模糊兩次讓線變圓）。片段著色器：`d=max(G−h,0)`，`顯色=胎色·pow(釉色, d/0.45)`；釉面高度 `s=max(h,G)` 做有限差分求法線，Blinn-Phong 鏡面（指數 260 與 26 兩層）＋視向隨畫面位置偏移，所以平的地釉上也有一塊會跟光走的反光；磚緣 3% 倒角變暗、灰縫帶雜訊。每片的款式／旋轉／釉量／高亮編碼成 32×1 RGBA 資料貼圖（避開 WebGL 1 片段著色器 16 個 uniform 向量的最低保證，與非常數索引 uniform 陣列的限制）。
2. **角碼拼接規則引擎（E 資料與生成層，Wang tile 式邊角碼）**：每款磚兩條對角線各帶一種角碼；旋轉後的角對應 `(c−r) mod 4`；2×2 門心、上下次花、左右次花三組交會各自判定是否同碼，再以「門心碼 × 中心圖集合」查吉語表。四片可窮舉 6⁴×4⁴＝331,776 種擺法，六句吉語全部可達（建置時窮舉驗證）。
3. **Web Animations API（B 動效與時間軸層）**：貼磚轉場以 `Element.animate()` 產生數十片的錯開動畫，`Promise.all(animations.map(a=>a.finished))` 後才 `location.href` 跳頁；新頁以 sessionStorage 旗標決定是否播放剝落。

輔助：DeviceOrientation（D 層，iOS 需 `DeviceOrientationEvent.requestPermission()` 且必須由點擊觸發）；IntersectionObserver 暫停畫面外的磚面；`Intl.DateTimeFormat('zh-TW-u-ca-chinese')` 在估價單顯示農曆。

### 12.2 支援現況與查證來源

- WebGL 1：caniuse「WebGL - 3D Canvas graphics」全主流瀏覽器支援，但依 GPU 與驅動可能被停用（caniuse 註記）。web3dsurvey.com 的回報統計 Chrome/Chromium 約 98%、Firefox 約 98%、Safari 約 94%。
- Web Animations API `Element.animate()`／`Animation.finished`：MDN 標示 Baseline（2020–2022 起跨瀏覽器可用）。
- `DeviceOrientationEvent.requestPermission()`：MDN 標示非 Baseline、實驗性、僅限 secure context、需 transient activation；caniuse 列 iOS Safari 14.5 起支援（亦有開發者回報 iOS 13 起即需授權）。本站以 feature detection 判斷，不依版本號。
- 參考：MDN DeviceOrientationEvent.requestPermission；caniuse.com/webgl；caniuse.com/mdn-api_deviceorientationevent_requestpermission_static；MDN Animation.finished。

### 12.3 Fallback 具體行為

- **無 WebGL／著色器編譯失敗**：`MAJ.Renderer()` 回傳 null，每個磚面容器內預先放好的靜態 SVG（同一份母題、以公式預算的「池化色」填色＋浮凸線雙層描邊）直接顯示；拼磚台改為即時重組 `<use href="#T{n}">` 的 SVG 牆。吉語判定、估價、吉語簿完全照常——資訊零損失，只少了鏡面反光與流釉。
- **無 JavaScript**：靜態 SVG 照常顯示；拼磚台以 `<noscript>` 給出完整規則與六句吉語對照、電話。
- **reduced-motion**：流釉直接全釉、環境擺動關閉、不攔截連結（無轉場），游標光保留。
- **無陀螺儀或拒絕授權**：按鈕文字改為「請用手指拖過磚面」。

### 12.4 效能

- 頁面大小（含全部 inline 資源）：index 158KB、four 179KB、tiles 169KB、moving 76KB（皆 ≤350KB）。最大宗是靜態 SVG 備援：同一款磚以 `<symbol>` 定義一次、多處 `<use>`。
- 圖集高度場模糊：Node 實測 6 片 × 256² 兩次 3×3 箱形模糊 24.6ms；吉語判定 1,000 次 2.0ms。Canvas 繪製與著色器編譯未能在本次建置的無頭環境實測（環境沒有可用的瀏覽器），預估首屏 JS 合計 40–80ms。
- 繪製：只在可見時重繪；環境光 30fps 節流，靜止且無輸入時不重繪（reduced-motion）；canvas DPR 上限 1.75。著色器每像素 5 次高度取樣。
