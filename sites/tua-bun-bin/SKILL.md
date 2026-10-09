---
name: postmodern-classicism-decorated-shed
description: Postmodern Classicism in the Venturi / Scott Brown / Graves / Moore line (1964–1990) — flattened classical fragments appliquéd onto a plain box, one fragment blown up to the wrong scale, strict symmetry split down the axis, three flat stucco bands with 45° sciagraphy shadows, and a sign bigger than the building.
---

# 後現代古典主義・裝飾棚 Postmodern Classicism — 風格規格書

> 參照：Robert Venturi《建築的複雜與矛盾 Complexity and Contradiction in Architecture》1966（「Less is a bore」「Main Street is almost all right」）・Venturi 母親住宅 Vanna Venturi House, Chestnut Hill 1964（裂開的山牆）・Venturi, Scott Brown & Izenour《向拉斯維加斯學習 Learning from Las Vegas》1972（鴨子 vs 裝飾棚 decorated shed）・Charles Moore〈Piazza d'Italia〉New Orleans 1978・Michael Graves〈Portland Building〉1982（森林綠基座・奶油牆身・赤陶扁柱與超尺度拱心石・扁平緞帶花綵）、Graves 為 Alessi 設計的 9093 鳥笛水壺 1985、Graves 的色鉛筆黃描圖紙立面圖。
> 與型錄中「孟菲斯 Memphis Design」的分界：孟菲斯是 Sottsass 1981 米蘭家具——塑合板斑點、細菌紋、squiggle、斜放幾何、不引用歷史；本風格只引用古典建築（山牆、柱、拱心石、半月窗），而且永遠是左右對稱的立面。與「Art Deco」的分界：那是階梯、放射扇與金屬；本風格零金屬、零放射。與「新古典 Neoclassicism」的分界：新古典的比例是對的、有厚度與線腳；本風格的古典是扁的、尺度故意錯、顏色是粉彩灰泥。

## 0. 設計哲學

後現代古典不是「復古」，是**引用**。它把古典建築的片段剪下來、壓扁、放大、塗上灰泥色，再貼回一個普通的盒子上——觀眾一眼認得「那是山牆」，同時一眼看出「那不是真的山牆」。兩件事要同時成立（Venturi 的 both-and）：

1. **它是一張宮殿的照片，不是宮殿**——片段沒有厚度、沒有線腳、沒有透視。
2. **至少一件東西大得不對**——比例全對就變回新古典，失去反諷。
3. **對稱，但中軸裂開**——古典的秩序被保留，中心被打斷。
4. **顏色是灰泥，不是材料**——一段一色，像被陽光曬過的粉彩牆。
5. **招牌比房子大**——在時速六十公里的路上，字才是建築。

示範站「大門面 TUĀ BÛN-BĪN」把這套語言放在台灣的預售屋接待會館上：後面是一間鋼構棚，前面是一面十公尺高、十八個月後就會拆掉的假宮殿——世界上最老實的裝飾棚。

## 1. 本風格的 5 個不可省略特徵

拿掉任何一項，畫面就會滑向別的風格（新古典、孟菲斯、一般「歐式」建案廣告）。

### 特徵 1｜形狀語彙：扁平的古典片段（Flat quotation）

山牆、拱心石、扁柱、半月窗、四格方窗、花綵緞帶——只剩**剪影**。零線腳、零厚度、零透視、零材質紋理。每件片段是一個 `clip-path` 或一個平塗 `<path>`。

```css
/* 一個片段＝外層負責投影、內層負責形狀（clip-path 會裁掉自己的 filter，所以要分兩層） */
.e{position:absolute;filter:drop-shadow(calc(var(--m)*.3) calc(var(--m)*.3) 0 rgba(42,24,16,.24))}
.e>i{position:absolute;inset:0;display:block}
.e-pedL>i{background:#B4553C;clip-path:polygon(0 100%,100% 0,100% 100%)}   /* 斷山牆左半 */
.e-pedR>i{background:#B4553C;clip-path:polygon(0 0,100% 100%,0 100%)}     /* 斷山牆右半 */
.e-key>i{background:#B4553C;clip-path:polygon(0 0,100% 0,81% 100%,19% 100%)} /* 拱心石：上寬下窄 */
.e-lun>i{background:#2F4A4C;border-radius:999px 999px 0 0}                  /* 半月窗 */
```

```svg
<!-- 扁柱一對＋方塊柱頭：柱頭只剩一塊方，沒有渦卷 -->
<svg viewBox="0 0 160 120"><g fill="#B4553C"><rect x="30" y="16" width="16" height="96"/><rect x="24" y="10" width="28" height="8"/><rect x="114" y="16" width="16" height="96"/><rect x="108" y="10" width="28" height="8"/></g></svg>
```

### 特徵 2｜色彩規則：灰泥三段＋45° 古典投影（Three bands of stucco, sciagraphy shadows）

整面（或整頁）分成**地坪／牆身／頂段**三段，每段一個平塗色：地坪深（森林綠 #3F6B57 或赤陶 #B4553C）、牆身淺（奶油 #F4EADB 或鮭桃 #F2C9A6）、頂段是天的顏色（#8FC1C4）。零漸層、零光澤、零玻璃。影子一律 **45° 往右下、零模糊、同色深一階**——古典建築製圖的投影法 sciagraphy（光從左上 45°），Graves 的色鉛筆立面也這樣畫。

```css
:root{--sky:#A9D3D0;--top:#8FC1C4;--body:#F4EADB;--base:#3F6B57;--acc:#B4553C;--alt:#E9B48F;--ink:#2A211C;--sh:rgba(42,24,16,.24)}
.tripartite{background:linear-gradient(var(--top) 0 20%,var(--body) 0 76%,var(--base) 0)} /* 硬停點＝三段平塗，不是漸層 */
.cast{filter:drop-shadow(6px 6px 0 var(--sh))} /* x=y、blur=0：45° 平影 */
```

### 特徵 3｜字體選擇：碑銘大寫＋最普通的黑體（High and low, side by side）

拉丁字用**羅馬碑銘大寫**（本站用 Google Fonts「Cinzel」800，字距 ≥ .2em），中文用 **Noto Serif TC 900** 寫案名、字距 .14–.2em——那是「紀念碑」。旁邊一定要並置一行**最平凡的商業黑體**（Archivo 600）寫電話、營業時間、價錢——那是「省道邊的招牌」。兩者同框、同等重要，缺一就不是後現代（只有碑銘＝新古典，只有黑體＝現代主義）。

```css
.ins{font:800 13px/1.3 "Cinzel",serif;letter-spacing:.24em;text-transform:uppercase}
.monument{font:900 clamp(28px,3.6vw,46px)/1.15 "Noto Serif TC",serif;letter-spacing:.08em}
.low{font:600 15px/1.5 "Archivo",sans-serif;letter-spacing:.01em}
```

### 特徵 4｜版面手法：嚴格對稱，中軸裂開（Symmetry, split）

立面上所有片段左右成對；中軸只放**一件**東西（門、拱心石或招牌），而山牆要從正中間**斷開**（Vanna Venturi House）。頁面版面也照做：兩欄夾一條空的中軸（虛線），左欄靠右對齊、右欄靠左對齊；分隔線是一條**從中間斷開、中央嵌一塊拱心石**的橫線。這不是「置中大標」模板——中心永遠是空的或被打斷的。

```css
.axis{display:grid;grid-template-columns:1fr 64px 1fr}
.axis>.l{text-align:right}.axis>.m{background:repeating-linear-gradient(var(--ink) 0 10px,transparent 0 18px) center/2px 100% no-repeat}
.kd{position:relative;height:56px}
.kd::before,.kd::after{content:"";position:absolute;top:27px;height:3px;width:calc(50% - 30px);background:var(--ink)}
.kd::before{left:0}.kd::after{right:0}
.kd i{position:absolute;left:50%;translate:-50% 0;width:44px;height:56px;background:var(--acc);clip-path:polygon(0 0,100% 0,81% 100%,19% 100%)}
```

### 特徵 5｜裝飾母題：一件大得不對＋招牌比房子大（Wrong scale, big sign）

每一面（每一頁的主圖）至少一件片段放大到**合理比例的 2 倍以上**：拱心石比門高、柱子胖成牆、半月窗佔掉整個牆身。搭配母題：四格小方窗（十字、四格、永遠太小）、水平條紋腰帶、扁平花綵緞帶與圓章（Portland Building）。招牌要能站上屋頂（Learning from Las Vegas 的「I AM A MONUMENT」）。

```css
/* 以公尺為單位排立面：容器寬＝24 m，1 m＝100cqi/24 */
.fac{container:fac/inline-size;position:relative;aspect-ratio:24/13}
.fac .e{--m:calc(100cqi/24);left:calc(var(--x)*var(--m));bottom:calc(var(--y)*var(--m));width:calc(var(--w)*var(--m));height:calc(var(--h)*var(--m))}
/* 合理拱心石 1.0 m；本風格要 2.6 m 或 4.4 m */
```
```html
<div class="e e-key" style="--x:10.6;--y:3;--w:2.73;--h:4.4"><i></i></div>
```

## 2. 色彩系統

| 角色 | Hex | 用途 | 面積比 |
|---|---|---|---|
| 天 Sky | #A9D3D0 | 頁面底色、立面背後的天 | 30–40% |
| 頂段 Top | #8FC1C4 | 立面頂段、圓章 | 5–8% |
| 牆身 Body | #F4EADB | 立面牆身、內容區塊（灰泥） | 25–35% |
| 地坪 Base | #3F6B57 | 立面基座、頁尾、緞帶 | 10–15% |
| 赤陶 Accent | #B4553C | 山牆、拱心石、扁柱、主按鈕 | 6–10% |
| 鮭桃 Alt | #E9B48F | 窗櫺、條紋、屋頂招牌板、hover | 4–6% |
| 墨 Ink | #2A211C | 字、立牌桿、現用導覽 | 6–10% |
| 鏡面 Door | #2F4A4C | 門、窗玻璃 | 2–4% |
| 投影 | rgba(42,24,16,.24) | 所有 45° 平影 | — |

另兩組灰泥色卡（同一套規則換色）：**聖胡安** 天 #B9D9E6・頂 #E7A487・牆 #F2C9A6・地 #B4553C・飾 #4A7A64；**林口黃昏** 天 #F1D9A8・頂 #D98E73・牆 #EFE1C6・地 #5B6E8C・飾 #8E3B46。規則：地坪永遠比牆身暗兩階以上；飾色（片段）永遠與牆身對比 ≥ 3:1；不准出現紫藍漸層、純白、純黑、金屬。

## 3. 字體系統

- **Cinzel**（Google Fonts，600／800）：拉丁碑銘大寫。小標 12–14px、字距 .24em；大寫羅馬數字 56–96px（規則編號 I–V）。
- **Noto Serif TC 900**：中文紀念碑字——案名、h2、導覽頁名。h2 28–46px／1.15、字距 .08em；案名字距 .14–.2em。
- **Archivo**（400／600／800）：平凡商業黑體——電話、時間、價目、按鈕。14–16px／1.5。
- **Noto Sans TC 400／700**：中文內文 16px／1.75。
- 字級階層：96（羅馬數字）／46（h2）／30（h3）／22（卡片標題）／16（內文）／13（註記）／11（碑銘小標）。

## 4. 版面與網格

- **分軸網格**：`1fr 64px 1fr`，中軸是 2px 虛線；左欄右對齊、右欄左對齊。內容最大寬 1180px、左右 32px。≤760px 時改為單欄，中軸移到左側 18px 處，所有文字左對齊。
- **三段式頁面**：頁首區塊用天色、內容區塊交替天色與灰泥奶油、頁尾一定是地坪深綠＋頂部條紋腰帶。
- **零旋轉**：本風格不斜放任何東西（與孟菲斯分界）。唯一的「動態」是尺度。
- **留白**：區塊上下 54–70px；分隔用「斷開＋拱心石」線（`.kd`），不用細線或卡片陰影。
- 立面以**公尺**排版：容器寬 24 m，`--m:calc(100cqi/24)`；地坪 0–2.4 m、牆身 2.4–8 m、頂段 8–10 m，片段可以超出屋頂。

## 5. 元件配方

- **導覽：路邊立牌 pylon**——右側一根 14px 墨色立桿，上面疊五塊招牌箱：最上是店徽，其下四頁；現用頁轉墨底，外圈一圈燈泡（radial-gradient 點陣＋mask 只留外框）以 `steps(2)` 跑馬。hover 往左探 4px、換鮭桃色。≤900px 立牌放倒成底部四格。
```css
.pylon a[aria-current]::after{content:"";position:absolute;inset:-8px;padding:5px;background:radial-gradient(circle,#F7E2A0 0 2.4px,transparent 2.9px) 0 0/9px 9px;-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;animation:chase .5s steps(2) infinite}
@keyframes chase{to{background-position:9px 0}}
```
- **按鈕**：平塗赤陶塊、Archivo 800、零圓角、6px 45° 平影；hover 換墨色。不做按壓位移（平影是投影法，不是按鈕效果）。
- **卡片**：灰泥奶油塊＋45° 平影；上方一塊天色小窗裝一面迷你立面。零圓角、零模糊陰影。
- **清單符號**：15px 四格方窗（鏡面＋十字窗櫺）。
- **表單／選項**：「領料單」——奶油紙、頂部赤陶／鮭桃相間條紋邊、虛線分列；尺度選項為 `無／1×／2×／3×` 方塊鈕，選中轉墨底。
- **頁尾**：地坪深綠，頂部 18px 條紋腰帶（鮭桃 3px／透明 3px）。

## 6. 動效規則（4 種，皆有 reduced-motion 降級）

| 類型 | 本站做法 | 觸發／時長／easing | 降級 |
|---|---|---|---|
| ambient 環境 | 路上車流（兩車道各兩台平塗車，9–15s linear 循環）、羽毛旗擺動（skewY −4°↔3°，2.2–3.2s ease-in-out alternate）、立牌燈泡跑馬（.5s steps(2)）、後照鏡平安符擺動 | 載入即開始 | 車停在固定位置、旗靜止、燈泡常亮 |
| input-driven 輸入 | 游標左右移動＝繞到門面側邊：立面平移、鋼構棚側面與三支斜撐展開（transform／scale，.35s cubic-bezier(.2,.8,.3,1)）；hover 片段出現「出處」標籤；點片段即換尺度 | <100ms | 改用「看門面背後」按鈕切換靜態側面 |
| transition 轉場 | 吊景進場：每件片段、每張卡、每個區塊以 `@starting-style` 從上方 −16m 落下（.75s cubic-bezier(.3,1.45,.5,1)，像吊車放下來會回彈）；移除片段時以 `display … allow-discrete` 吊回去；換頁時撤景（奇數往左、偶數往右滑出，.32s ease-in） | 狀態改變／換頁 | 直接出現與消失 |
| signature 簽名 | **60 公里瞥見 Drive-by glance**：擋風玻璃框裡，整面立面以真實車速（退縮 18 m、視錐 ±35°、60 km/h → 2.95 秒）從右滑到左；倒帶回中央後，路人沒記住的片段「被遺忘」（形狀淡出、只剩牆），記住的三件掛上「記得 1／2／3」標籤 | 按「開過去」 | 直接顯示遺忘後的結果畫面與文字清單 |

## 7. 插畫與圖像風格：45° 平影剪片 sciagraphy-cutout

- 全部圖像都是平塗剪影＋一個 45° 零模糊同色深一階的投影，**沒有第二種明暗**。
- 只畫建築與招牌（立面、鴨子 vs 裝飾棚、地圖上的倉庫），不畫人物、不畫植物寫實。
- 立面一律正立面（elevation），不做透視；唯一的「立體」是游標移動時露出的側面——而側面揭穿了它是一間棚子（裝飾棚的真相）。
- 圖中的字用 Noto Serif TC 900，像刻在灰泥上。

## 8. Logo 與 Favicon

店徽＝天色方塊上的**斷山牆兩半＋一條簷口＋一塊拱心石**，赤陶與深綠兩色，並帶同形 45° 平影。不用圓形徽章、不寫年份。Favicon 是同一組形狀的 64×64 inline SVG data URI。

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="#A9D3D0"/><path d="M4 30 L29 10 L29 30Z M35 10 L60 30 L35 30Z" fill="#B4553C"/><rect x="4" y="30" width="56" height="5" fill="#B4553C"/><path d="M22 38 H42 L38 60 H26Z" fill="#3F6B57"/></svg>
```

## 9. Do & Don't

**Do**
- 每一面至少一件 ≥2× 的片段；比例全對時，主動放大一件。
- 山牆從中軸斷開；中軸只放一件東西。
- 影子永遠 45° 右下、零模糊；三段灰泥一段一色。
- 碑銘大寫與平凡黑體並排出現。
- 讓「這是假的」看得見：側面、斜撐、拆除日期。

**Don't**
- 不畫線腳、柱頭渦卷、大理石紋、金色——那是新古典或「歐式建案」廣告，不是後現代。
- 不做 squiggle、斑點、斜放幾何——那是孟菲斯。
- 不用漸層（硬停點的分段除外）、不用模糊陰影、不用玻璃擬態、不用紫藍漸層。
- 不用「置中大標＋兩顆按鈕＋三張圓角卡片」；中心永遠是斷開或空的。
- 不用 emoji icon、不寫「EST. 19xx」徽章、不寫 Lorem ipsum。

## 10. 頁面骨架範例

```html
<body style="background:#A9D3D0">
  <nav class="pylon"><div class="crest">…店徽…</div><a href="index.html" aria-current="page"><b>門面</b><small>FAÇADE</small></a>…</nav>
  <main class="wrap">
    <section class="open">
      <div class="fac" style="aspect-ratio:24/13.4">
        <div class="e e-band c-base" style="--x:0;--y:0;--w:24;--h:2.4"><i></i></div>
        <div class="e e-band c-body" style="--x:0;--y:2.4;--w:24;--h:5.6"><i></i></div>
        <div class="e e-band c-top"  style="--x:0;--y:8;--w:24;--h:2"><i></i></div>
        <div class="e e-door" style="--x:10.4;--y:0;--w:3.2;--h:3"><i></i></div>
        <div class="e e-key"  style="--x:10.64;--y:3;--w:2.73;--h:4.4"><i></i></div>
        <div class="e e-pedL" style="--x:5;--y:10;--w:6.08;--h:3.92"><i></i></div>
        <div class="e e-pedR" style="--x:12.92;--y:10;--w:6.08;--h:3.92"><i></i></div>
        <div class="e e-sign" style="--x:9;--y:8.2;--w:6;--h:1.5;--hs:1.4"><i></i><span class="st">凡爾賽</span></div>
      </div>
    </section>
    <div class="kd"><i></i></div>
    <section class="axis"><div class="l"><p class="ins">A DECORATED SHED</p><h2 class="monument">這是一間棚子</h2></div><div class="m"></div><div class="r"><p class="low">(02) 2298-0417</p></div></section>
  </main>
  <footer class="base">…</footer>
</body>
```

## 11. 技術實作與相容性

### 11.1 核心技術（3 項）

1. **`@starting-style` ＋ `transition-behavior: allow-discrete`**（B 動效與時間軸層）：承載「吊景」——每一件片段被加到立面時從上方落下並回彈、被移除時以 `display:none` 的離散轉場吊回去；檔案頁三十六張卡片的年代篩選進出場；〈開過去〉的 `<dialog>` 與 `::backdrop` 開關。全部零 JS 動畫程式。
2. **CSS container queries ＋ container query units（`cqi`）**（C 版面與樣式層）：立面元件以公尺排版——`.fac` 是 inline-size 容器，`--m: calc(100cqi/24)` 即一公尺，所有片段的位置、尺寸、招牌字級、45° 投影長度都乘以 `--m`。同一段 HTML 在首頁（約 900px）、〈立一面〉、擋風玻璃裡、檔案卡（約 240px）四種尺寸下等比例成立；`@container fac (width < 700px)` 自動收起寫在立面上的營業資訊（頁面下方有同內容清單，資訊零損失）。舞台另一層 `stage` 容器讓棚子側面與斜撐以 `cqi` 對齊立面邊緣。
3. **立面規則引擎＋路過記憶模型**（E 資料與生成層）：`layout(cfg)` 以公尺把 8 種片段 × 0–3 尺度自動左右對稱排上 24 m 立面（窗不得撞門、拱心石遇半月窗改嵌拱頂、3× 招牌上屋頂）；`memory(cfg)` 以車速 60 km/h、退縮 18 m、視錐 ±35° 算出可見時間 2.95 秒，每組片段的顯著度＝面積^0.75 × √WCAG 對比 × 中軸加成 × 尺度矛盾加成（× 招牌可讀時間檢查），路人最多記 3 樣、超過 7 組只記 2 樣，再依「招牌＋古典片段＋尺度矛盾」給 A–D 評語；`quote(cfg)` 開報價；設定以 11 字元編碼寫進 `?f=`。同一份引擎在建置期由 Node 預先產出首頁、檔案頁的靜態立面。

### 11.2 支援現況與查證來源（2026-10-09 查證）

- `transition-behavior`：MDN 標示 **Baseline 2024（Newly available，2024 年 8 月起各主流瀏覽器最新版皆支援）**；MDN 同頁建議把 `transition` 宣告兩次（第一次不含 `allow-discrete`）以照顧不支援者。來源：developer.mozilla.org/docs/Web/CSS/transition-behavior。
- `@starting-style`：同屬 2024 Baseline（Chrome／Edge 117、Safari 17.5、Firefox 129）；第三方整理指出 Safari 要到 18 才對 `display` 做離散轉場、Firefox 對 `display` 的離散轉場支援較晚——本站把它當成漸進增強。來源：Smashing Magazine〈Transitioning Top-Layer Entries And The Display Property In CSS〉2025-01、OpenReplay〈animate display none〉。
- Container query units（`cqw/cqh/cqi/cqb/cqmin/cqmax`）：caniuse 顯示 Chrome／Edge 105+、Safari 16.0+、Firefox 110+、Samsung 20+ 支援，全球可用率約 95.9%；無容器時單位退回 small viewport 單位。來源：caniuse.com/css-container-query-units；MDN Container queries。
- `Element.animate()`（輔助：擋風玻璃的滑動）、`HTMLDialogElement.showModal()`、`Intl.DateTimeFormat('zh-TW')`、`sessionStorage`：皆為長期穩定 API。

### 11.3 Fallback 具體行為

- 不支援 `@starting-style`：片段直接出現在位置上，移除時直接消失；尺寸變化仍以一般 transition 補間。
- 不支援 `display` 離散轉場（較舊 Firefox／Safari 17）：移除片段時直接消失，其餘不受影響。
- 不支援 container query units（Safari 15 以前等）：`cqi` 退回 `svi`，立面以視窗寬為準縮放——在全寬舞台上幾乎相同，在檔案卡中會偏大；`@container` 規則不生效時立面文字仍顯示，頁面下方的清單照常存在。
- 無 JavaScript：首頁、檔案頁、倉庫頁的立面與所有文字均為建置期輸出的靜態 HTML；〈立一面〉顯示一面只有招牌的空殼與 `<noscript>` 說明；年代篩選不可用時三十六間全部顯示。
- `prefers-reduced-motion: reduce`：全部 animation／transition 關閉；車停在固定位置；游標視差改為按鈕；〈開過去〉直接跳到「遺忘後」結果並以文字列出路人記得的三樣。

### 11.4 效能實測

- 單頁大小（含 inline CSS／JS／SVG）：index 70.9 KB・build 52.5 KB・archive 85.6 KB・visit 43.0 KB（上限 350 KB）。字型為 Google Fonts，零外部圖片、零音檔。
- 立面引擎：一次完整週期（layout＋HTML 產生＋記憶模型＋報價）在 Node 22 實測 ≈ 37 µs；〈立一面〉每次點選的 DOM 對帳只改動差異元件（CSS 自訂屬性與 hidden），不重建立面。首屏 JS 只有引擎定義、事件綁定與 15 筆拆除倒數，遠低於 100 ms 預算（建置環境無瀏覽器，數值為 Node／jsdom 量測）。
- 所有動畫只動 `translate`／`scale`／`opacity`／`background-position`，無 layout thrashing；檔案頁 36 面迷你立面的投影為靜態 `drop-shadow`，捲動時不重算。
