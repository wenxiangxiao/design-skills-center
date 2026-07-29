---
name: punched-strip-musicbox
description: A tender pastel music-box atelier style where every image is a pattern of holes punched through cream paper strips read by a brass comb, warmed by heather-lilac grounds, brass and coral.
---

# 打孔譜帶音樂盒風 Punched-Strip Musicbox

> 一種「會唱歌的紙」的視覺語言：整站的圖像都是打在象牙色紙帶上的孔，配一排黃銅音梳。底色是黃昏石楠紫的粉彩、金屬是黃銅、此刻是珊瑚紅。溫柔、療癒、手作感，聲音由瀏覽器即時合成，永遠不用外部圖檔。

---

## 一、設計哲學

1. **孔是內容，不是裝飾。** 這個風格最核心的觀念：所有圖像（logo、favicon、縮圖、印記、插圖）都由「一條紙帶上的孔位」構成——孔位＝音高（上下）×時間（左右）。若把孔換成一般的裝飾線描或色塊，這個風格就死了。每一張圖都應該「讀得出是一段旋律」。
2. **粉彩但不甜膩。** 底色走黃昏石楠紫（heather-lilac）的中明度粉彩，不是嬰兒粉、不是米白紙感。紫要讀得出是紫。以黃銅金屬與墨紫線條把粉彩「收住」，避免整站像糖果包裝。
3. **手的溫度。** 品牌性格溫柔療癒（voice=溫柔療癒）：文案像在對一個人輕聲說話，講「送給誰」「慢一點」「留白」。避免技術炫耀腔。
4. **留白是美德。** 音樂盒一次不宜撥太多音；版面也一樣。中等密度、每個元件四周留呼吸空間。
5. **不完美是活著的證據。** 願意承認金屬會走音、紙帶會打錯——把限制（只有大調七音、倒轉不發聲）寫成內容而非隱藏。

---

## 二、色彩系統

| 用途 | Hex | 佔比 |
|---|---|---|
| 石楠紫 底色 lilac | `#CDBCE0` | ~40%（頁面地色，含 `radial-gradient` 圓點紋理） |
| 石楠紫 深 lilac-d / dd | `#B79ED4` / `#9A7FBE` | ~8%（導覽底、chip 選中、頁點紋理） |
| 象牙奶油 cream / cream2 | `#F6F0E6` / `#FBF7EF` | ~22%（面板、卡片、閱讀面、紙帶亮部——**只做面板，不做整頁底**，以免退化成 paper-light） |
| 墨紫 ink | `#33294A` | ~9%（文字、2–3px 描邊、孔洞、輪廓） |
| 墨紫柔 ink-soft | `#5A4C74` | 次級文字、說明 |
| 黃銅 brass / brass-l / brass-d | `#D6A94E` / `#EEC873` / `#B6873A` | ~8%（音梳齒、手柄旋鈕、金屬件、次強調——金屬只做細件不鋪面） |
| 珊瑚紅 coral / coral-d | `#EE6D7A` / `#D64E62` | ≤7%（此刻／現用態／主按鈕／讀取線／正在撥響的孔／警示——高彩僅此一色） |
| 薄荷綠 mint | `#5FBF9E` | <3%（完成／成功✓，嚴格節制） |
| 木色 wood / wood-d | `#B27C4C` / `#8A5A34` | 由引擎渲染的盒身與手柄 |
| 紙帶底 / 送孔緣 | `#EADFC7` / `#DCCFB0` / `#C8B790` | 紙帶面、上下送孔邊、孔的暈影 |

**分工不可對調**：底恆石楠紫、面板恆象牙奶油、金屬恆黃銅、此刻恆珊瑚、成功恆薄荷、孔恆墨紫（正在撥響時才翻珊瑚）。彩色是稀缺資源，珊瑚只發給「正在發生的事」。

---

## 三、字體系統

全部來自 Google Fonts：

```
Comfortaa:wght@400;600;700          // 拉丁字標／kicker（圓潤、像搖籃曲）
Noto Serif TC:wght@500;700;900      // 中文標題（900 給品牌與大標）
Noto Sans TC:wght@300;400;500;700   // 中文內文
Space Mono:wght@400;700             // 數字、代碼、頻率、留位號、標籤
```

字級 scale：品牌 23px / H1 `clamp(22–36px)` / H2 `clamp(19–25px)` / H3 16–17px / 內文 14–15.5px / 標籤與 mono 10.5–13px。行高：標題 1.28–1.3、內文 1.7–1.8（溫柔要鬆）。字距：Comfortaa kicker `letter-spacing:2–3px` 且 `text-transform:uppercase`；中文標題不加字距。

---

## 四、版面與網格

- **左側音梳導覽軌**固定 96px（桌機）；主內容 `margin-left:96px`，內文容器 `max-width:760–1040px` 置中。
- **卡片牆**用 `repeat(3,1fr)` 桌機、`1fr 1fr`（≤820px）、`1fr`（≤520px）。
- **不對稱**：首頁是「音樂盒直開場」——首屏即一台可打孔可搖、且會發聲的音樂盒（大 canvas 面板），樂器本身即媒介即內容即產物，**沒有大標 hero、沒有兩顆置中按鈕、沒有三張圓角卡片模板**。標題壓在工作台面板內、偏左。
- 圓角偏大（面板 16–20px、按鈕 10–11px），但一律配 2px 墨紫實線描邊「收邊」——粉彩＋硬描邊＝這個風格的骨架。
- 面板底部可加 `box-shadow:0 10px 0 -4px var(--lilac-dd)`（實色偏移「疊紙」感），**不用模糊柔陰影**。
- 背景圓點紋理：`radial-gradient(var(--lilac-d) 1px,transparent 1.4px); background-size:22px 22px`——像打孔卡的定位點。

---

## 五、元件配方

**導覽（comb-tooth rail 音梳齒側桿）**：桌機左緣一支直立黃銅梳背（`.base`），上面伸出四根長短遞增的齒（`.tooth .bar`，width 34→44→54→64px）＝四頁。現用頁 `aria-current="page"`：齒外推 `translateX(10px)`、翻珊瑚漸層、加珊瑚外光暈 `box-shadow:...0 0 16px 3px rgba(238,109,122,.65)`、加寬到 72px。頁名用 `writing-mode:vertical-rl` 的直排 Noto Serif TC。≤820px 落為底部橫向 dock、齒縮小、現用頁上移 3px、字改橫排。頁尾一律另備完整文字連結保底。

**按鈕**：`.btn` 2px 墨描邊、圓角 11px、底 cream2；`.primary` 珊瑚底白字；`.gold` 黃銅底墨字。hover 提亮、`:active` 下移 1px（位移用 transform，不加硬陰影當簽名）。

**卡片 / 面板**：cream 底 + 2px 墨描邊 + 圓角 16–20px。曲盤卡含 punchstrip 縮圖（見七）＋標題＋mono 標籤列（情境／拍號／音數／難易）＋兩顆動作鈕（▶ 搖 / 帶進演奏台）。

**chip 篩選**：圓角 20px 藥丸、1.6px 墨描邊、`aria-pressed="true"` 翻 `--lilac-dd` 白字。同一組互斥、再點取消。

**表單**：input/textarea 2px 墨描邊、圓角 11px、`:focus{outline:2px solid coral}`。三步驟精靈 `.steps`：進行中翻 lilac-dd、已完成翻 mint。錯誤訊息 `.err` 珊瑚色、`min-height` 佔位避免跳動。

**footer**：2px 墨上框線、mono 小字、連結以黃銅底線標示。

---

## 六、動效規則

- **核心簽名＝手搖演奏**，不是進場動畫。會動的只有：(1) 紙帶隨 playPos 捲動、(2) 孔經過讀取線時翻珊瑚並描白 0.32s 衰減、(3) 對應音梳齒微振（`sin(t/26)*2.4` 幅度隨 flash 衰減）、(4) 手柄拖動旋轉（`transform:rotate()`）。全部由**使用者手勢或播放鍵**驅動。
- 一般過場：hover `transform` 0.08–0.18s、chip/按鈕背景 0.12–0.18s。**刻意避開四項過載語彙**：不用揭示淡入當簽名、不用數字計數動畫、不用按壓硬陰影、不用 `stroke-dashoffset` 描繪。
- **無跑馬燈、無自動輪播、無自動播放**。載入時紙帶靜止，聲音只在使用者第一次手勢後才由 `AudioContext.resume()` 啟動。
- `@media(prefers-reduced-motion:reduce)`：`*{transition:none!important}`、音梳不振動、不自動捲動；核心玩法（打孔、按播放、聽聲）完全不減。

---

## 七、插畫與圖像風格：punchstrip-notation 打孔譜帶構成

**全站沒有一張外部圖片、也沒有一張「描外形」的插圖**——logo、favicon、卡片縮圖、印記、頁內圖解全部由同一支「打孔譜帶」引擎生成：

- **底**：象牙紙帶 `#EADFC7`，上下各一條送孔緣 `#DCCFB0`；左緣一條黃銅音梳影 `#D6A94E`（6–7px 寬、墨描邊）。
- **孔**：先畫一圈略大的暈影 `#C8B790`（模擬打穿的紙厚），再畫實心圓；孔恆墨紫 `#33294A`，僅約 1/4 隨機翻珊瑚 `#EE6D7A` 作點綴（「正在響」的語意）。孔半徑 ≈ `min(cw,ch)*0.30–0.34`。
- **旋律走位**：由 `FNV-1a(seed) → mulberry32` 決定性生成一段在音階內走動的折線——每欄挑一列、偶爾休止（~12–14%）、偶爾同拍雙孔。**同一 seed 恆得同一張圖**；靜態頁不需 JS 也看得到（建置時烘成 SVG 或以 inline SVG 手繪）。

分工不可對調：紙 `#EADFC7`／送孔緣 `#DCCFB0`／孔暈 `#C8B790`／孔 `#33294A`／此刻孔 `#EE6D7A`／音梳 `#D6A94E`。**畫成單色、或把孔換成裝飾線描，即退化成 thin-lineart、本技法失效。**

參考生成函式：

```js
function fnv(s){var h=2166136261>>>0;for(var i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)>>>0;}return h>>>0;}
function mul(a){return function(){a|=0;a=a+0x6D2B79F5|0;var t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
function stripSVG(seed,cols,rows){/* 紙帶底 + 送孔緣 + 音梳影 + 由 mul(fnv(seed)) 走出的孔列 */}
```

---

## 八、Logo 與 Favicon 設計指南

- **Logo**（`assets/logo.svg`）：一段打孔紙帶＋左緣黃銅音梳（齒下長上短）＋右端木色手柄（帶黃銅旋鈕），紙帶上四個孔拼出一段上行小旋律（其中一個翻珊瑚）；右側 Noto Serif TC 900 中文字標＋Comfortaa 拉丁副標。整體是「一台被攤平的手搖音樂盒」。
- **Favicon**（inline SVG data URI 寫在 `<head>`）：圓角方底 `#F6F0E6`、頂部一條黃銅帶、下面五個孔（墨紫為主、兩個珊瑚）＝一小段打孔。務必原創、務必 data URI、務必無外部檔。

---

## 九、Do & Don't

**Do**
- 讓每一張圖都「讀得出是一段旋律」——孔位有音高與時間語意。
- 石楠紫做整頁底、象牙奶油只做面板、珊瑚只給「此刻」。
- 粉彩配 2px 墨實線描邊；圓角配實色偏移而非模糊陰影。
- 核心互動可玩、可聽、可存（曲盤碼）、可帶去下一頁。
- 聲音只在使用者手勢後啟動；`prefers-reduced-motion` 下靜止但完整可玩。

**Don't（含去AI化禁令）**
- ✗ 紫藍漸層 hero、置中大標＋副標＋兩顆按鈕＋三張圓角卡片模板。
- ✗ 用 emoji 當 icon（icon 一律自繪 SVG；▶ 這類單一播放符號可，但功能圖示須自繪）。
- ✗ 千篇一律 rounded-2xl＋模糊柔陰影卡片。
- ✗ 把象牙奶油鋪成整頁底（會退化成 paper-light 米白紙感）。
- ✗ 把孔換成裝飾線描或自由色塊（退化成 thin-lineart / flat-shape）。
- ✗ 自動播放音樂、跑馬燈、數字計數動畫、`dashoffset` 描繪當簽名。
- ✗ Lorem ipsum、AI 腔（「在當今快節奏的世界」）、「EST. 19xx」徽章、「把 X 變成 Y」句式。
- ✗ 使用外部圖片或音檔（僅 Google Fonts；聲音一律 Web Audio 即時合成）。

---

## 十、頁面骨架範例（可直接改用）

```html
<div class="rail" aria-label="主導覽（音梳）">
  <span class="base" aria-hidden="true"></span>
  <nav>
    <a class="tooth" href="index.html" aria-current="page"><span class="bar"></span><span class="lb">演奏台</span></a>
    <a class="tooth" href="qu.html"><span class="bar"></span><span class="lb">曲盤室</span></a>
    <a class="tooth" href="gou.html"><span class="bar"></span><span class="lb">構造</span></a>
    <a class="tooth" href="ding.html"><span class="bar"></span><span class="lb">訂製</span></a>
  </nav>
</div>
<div class="shell"><div class="wrap">
  <header class="mast">…原創 SVG 字標＋營業資訊…</header>
  <!-- 音樂盒直開場：首屏即可打孔可搖、會發聲的音樂盒 -->
  <div class="bench">
    <div class="benchhead"><span class="kick">Punch &amp; Crank</span><h1>在紙帶上打孔，然後搖它。</h1></div>
    <div class="stripframe"><canvas id="strip"></canvas></div>
    <div class="controls"><svg id="crank">…手柄…</svg><button class="btn primary">▶ 搖給我聽</button>…</div>
  </div>
  <footer>…2px 墨上框線＋建置模型尾註…</footer>
</div></div>
```

音梳／孔／手柄的座標與 Web Audio 撥齒合成（微不諧和泛音 `[1, 2.76, 5.40, 8.93]` ＋指數衰減包絡 ~1.5s）請見本站 `index.html` 的引擎；同一支引擎同時承擔演奏、縮圖、logo、favicon 與印記。

---

*本站由 **Claude Opus 4.8 · 排程 Agent** 設計與建置（2026-07-29，排程 Agent 自動執行）。*
