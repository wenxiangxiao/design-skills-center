---
name: yoiai-summer-festival
description: A deep-indigo Japanese summer-festival visual language — lantern vermilion and gold on night-blue washi, vertical Mincho, radial family-crest hanabi motifs, and a light-instant/sound-delayed sense of distance.
---

# 宵藍夏祭風（Yoiai Summer-Festival）

日本夏夜「花火大会」的視覺語言：宵藍的夜、提灯的朱與金、生成紙感的和紙、縦組明朝字，以及一種「光先到、音後到」的距離感。適合煙火大會、夏祭、盆踊、地方觀光、夜市、和菓子、線香花火等需要「懐かしい夏の夜」情緒的題材。**風格與內容分離**：以下規格不綁定煙火——同一套皮膚可換成夏祭屋台導覽、夜間水族館、提灯居酒屋。

## 一、設計哲學

三個支柱：

1. **夜為底，火為點。** 大面積是深宵藍（近黑的藍），只用極少量高彩度的火花色（朱・金・紅・青・緑）作為「被點亮」的重點。整體明度低、對比高——像真的站在暗處看夜空。切忌把火花色鋪成大面積色塊，那會失去「暗中一點光」的張力。
2. **紙と光の二層。** 介面外殼（導覽、面板、文字）是紙感的世界——生成色和紙、縦組明朝、家紋、2px 實線；而「內容的高潮」（花火、燈籠、爆光）是光的世界——additive 疊加、放射、bloom。兩層不混：面板不發光、火花不描邊框。
3. **間（ま）。** 這個風格的獨門情緒是「時間差」：光到眼、聲到胸，之間有一段靜。設計上要為「等待」留白——不要每個角落都在動，讓一個大輪安靜地開，再讓資訊/聲音遲一步到達。留白與延遲本身就是內容。

## 二、色彩系統

| 用途 | 名稱 | HEX | 比例 |
|---|---|---|---|
| 大面積地色（夜空・頁背景） | 宵藍 yoi | `#0E1730` | ~46% |
| 面板・卡片底 | 深藍 yoi2 | `#16203B` | ~22% |
| 最暗底・footer | 紺 kon | `#0A1124` | ~8% |
| 內文・亮字 | 生成 nari | `#EDE3CE` | ~10% |
| 次級文字・線 | 藍白 aijiro | `#8FA6C8` | ~6% |
| 提灯・現用態・強調 | 朱 shu | `#E24A3B` | <4% |
| 見出し金・冠菊 | 金 kin | `#E7B84E` | <4% |
| 分隔線 | line | `#2A3757` | — |

**火花色（火薬の炎色反応・少量）**：紅 `#FF5A6A`（ストロンチウム）、緑 `#57E39B`（バリウム）、青 `#5AA8FF`（銅）、黄 `#FFD24D`（ナトリウム）、金 `#FFCF7A`／銀 `#EAF2FF`（チタン・木炭）、紫 `#C58CF0`。這些只出現在花火、家紋、燈籠——不當 UI 主色，不鋪底。

用色鐵律：地色永遠是宵藍系深色；朱與金各綁固定語意（朱＝現用/提灯/警示活資料，金＝標題/裝飾/冠菊），不可互換濫用；火花色一次畫面同時出現不超過 3–4 色且各守炎色反應語意。

## 三、字體系統

- **標題・品牌・數字強調（縦横皆可）**：`Shippori Mincho B1`（Google Fonts），weight 600／800。明朝的縦線與襯線給夏祭的懐旧與正式感。大標 `clamp(28px,5vw,46px)`，`font-weight:800`，`line-height:1.18`。
- **UI・內文**：`Zen Kaku Gothic New`，weight 400／500／700。字寬圓潤、可讀性高，承載表單、標籤、說明。內文 15–16px、`line-height:1.75–1.8`。
- **縦組**：導覽提灯、部分標籤用 `writing-mode:vertical-rl` ＋ 明朝，強化和風。縦組時 `letter-spacing:2px`。
- 字級 scale：11（micro/英數標籤，`letter-spacing:3–5px` 全大寫）／12.5–13（kicker・注記）／14.5–16（body）／17–19（小標）／22–32（h2）／30–54（hero）。
- 只用這兩個家族，勿再引入第三個。英數小標一律大寫＋寬字距，作為「和文中的拉丁點綴」。

## 四、版面與網格

- 主容器 `max-width:1080px`（表單頁收窄到 760、案內 920）。桌機正文左側留 `padding-left:116px` 讓開提灯側桿。
- **非對稱**：hero 文字靠左上、console（選席＋時間軸）沉在舞台底部，形成上疏下密的重心。避免「置中大標＋兩鈕」模板。
- Hero「舞台」高 `min(88vh,760px)`，滿版 canvas 夜空，底部漸層壓暗承載控制列。
- 卡片牆：番組用 4 欄（`repeat(4,1fr)`，≤1000px 轉 3 欄、≤820px 轉 2 欄）。卡片 `border-radius:14px`、`1px solid line`、hover 上浮 3px 並翻金邊。
- 無圓潤大陰影；深度靠邊框與底色階（yoi→yoi2→kon）表現，不用模糊 box-shadow 堆疊（唯一例外：現用提灯與朱色行動鈕的暖光 glow）。
- 旋轉：不使用整體傾斜；和風以縦組與家紋放射的「圓」對比方格的「直」取得動態，而非斜切。

## 五、元件配方

**導覽 — lantern-string rail（提灯串側桿，本風格簽名）**
- 桌機：左緣固定 96px 直欄，中央一條 `repeating-linear-gradient` 的暗色繩（提灯串的線），繩上垂掛數顆提灯（頁面）。
- 提灯：`58×44`、`border-radius:26px/20px`（橢圓）、`linear-gradient(#2a3352,#1a2340)` 未點亮、`2px solid #35406a`；頂端一個 `::before` 小掛環，底端 `::after` 朱色小流蘇（三角 clip-path）。頁名用縦組明朝 800。
- **現用態＝點亮**：`radial-gradient(#F7C24A,#E24A3B)` 暖光、字轉深褐 `#3a1206`、`box-shadow:0 0 22px 2px rgba(231,120,40,.55)`。這是全站唯一大方使用 glow 的地方。
- ≤820px：側桿隱藏，改頂部 sticky 橫向捲動 bar（品牌名＋膠囊連結，現用翻朱），並在 footer 另備完整連結保底。

**按鈕**
- 主行動（打上・予約）：`background:#E24A3B` 白字，圓角 999，`padding:12px 26px`，hover 提亮。
- 次要：透明底＋金框金字，hover 反轉為金底褐字。
- 幽靈：`line` 灰框藍白字，hover 淡藍底。

**卡片（番組の紋）**
- yoi2 底、line 邊、`radius:14px`、`padding:16px`。頂部 kicker（明朝金・「第N番・時刻」），中間為生成的家紋 SVG（深藍 `#0b1330` 底），下方玉名（明朝 800）＋型/色/号数標籤。部標籤用色塊：序＝墨綠、破＝暗金、急＝暗朱。

**表單**
- 輸入框 `#0e182f` 底、line 邊、`radius:10px`、`padding:12px 14px`；focus 翻金邊。
- 驗證：合格欄位翻綠邊＋綠訊息，錯誤紅訊息，每欄下方預留 `min-height` 防跳動。
- 步驟指示器：三格膠囊，現用翻朱、已完成翻金邊。
- 選席用大 `<label>`＋`:has(input:checked)` 翻朱底金邊。

**footer**
- `kon` 最暗底、`1px` 上框、三欄（品牌／活動資訊／聯絡）。明朝小標＋藍白小字。末尾必附「架空のデモ」免責一行（灰 `#5c6b8e` 12px）。

## 六、動效規則

- **核心＝物理，不是裝飾。** 主舞台的動畫是一場真實彈道模擬：粒子受初速＋重力＋空氣阻力，`菊` 拖尾、`冠菊` 長垂（`droop` 加乘重力）、`千輪` 二段小割、`型物` 環狀定位。合成用 `globalCompositeOperation:"lighter"` 做疊加光。每發配一個放射狀 `flash`（RadialGradient，`a` 隨時間衰減）。
- **時間差是簽名動效**：視覺開花在 `t+上昇時間` 即時發生；聲音（Web Audio 合成的低頻 thump＋band-pass 噪音 crack）在 `開花時刻 + 觀者到爆點距離/340` 才響；同一時刻提灯 `lanternShake` 開始衰減式抖動、爆點浮出「音、到着」標籤。改變席位＝改變所有到達時刻。
- 時間軸：可 `play/pause`、可 `scrub` 頭出し；`requestAnimationFrame` 驅動，`dt` 上限 0.05 防跳。
- 進場：不用通用淡入當主秀（避開過載語彙）；卡片 hover 上浮 3px 是唯一的微互動。
- **無跑馬燈、無自動輪播、無數字計數動畫。** 時間軸的秒數變化是功能性讀秒，非裝飾計數。
- Web Audio 一律在使用者手勢後才建立 `AudioContext`，預設靜音，提供開關。
- easing：CSS 過渡 `.2–.35s`；粒子用物理積分而非 easing 曲線。

## 七、插畫與圖像風格 — hanabi-mon（花火家紋）

**全站零外部圖片。所有「圖」都是同一支引擎照玉之型與色生成的放射對稱家紋。**

- 原語：一個中心點 ＋ 放射的 spoke／dot／curve。型決定幾何：
  - `牡丹`＝點的輪（無尾，銳利）；`菊`＝帶尾放射線＋端點；`芯入り`＝外輪＋內圈同心（芯用銀白）；`冠菊`＝上半垂長曲線（金・`Q` 貝茲下垂）；`千輪`＝散佈的小割群（每群 7 點小輪）；`型物`＝環（`circle` stroke ＋點）；`椰子`＝少數幾條粗曲線扇形。
- 色即炎色反応（見色彩系統火花色）。同一 seed 恆得同一紋（`seed*97+3` 之類的確定式）。
- 用途統一：logo、favicon、番組 24 格縮圖、section 標題前的小紋、預約完成的紋章——全部出自同一支 `mon(type,salt,seed)`。**畫面上沒有一張是「描」的具象插圖。**
- 底一律深藍 `#0b1330`，讓火花色浮出。線寬 2–2.5，`stroke-linecap:round`。
- 與一般 `flat-shape` 的差別：每一筆都有「型」的語意（可讀回是哪種玉），且為放射對稱的紋，而非自由色塊。

## 八、Logo 與 Favicon 設計指南

- **Logo**：左側一枚圓形夜空章（`radialGradient` 深藍）內含八向金色 spoke＋朱色端點＋生成白芯（即最簡的花火家紋），右側縦横皆可的明朝店名＋一行金色副題（店名・活動名）。SVG 內嵌字體家族名，保持與站點一致。
- **Favicon**：同一枚八向家紋，`viewBox 0 0 64 64`，宵藍底、金 spoke、朱端點、生成白芯，寫成 inline `data:image/svg+xml,%3Csvg…`（`#` 一律轉 `%23`）。勿用外部 .ico。
- 家紋務必放射對稱、可在 16px 下仍辨識為「一朵花火」。

## 九、Do & Don't

**Do**
- 深宵藍鋪底，火花色只作暗中一點光。
- 縦組明朝＋橫組黑體並用；英數大寫寬字距點綴。
- 為「時間差／等待」留白：光先、音後、之間留靜。
- 一切圖像由 hanabi-mon 引擎生成，零外部圖片（僅 Google Fonts）。
- 提灯側桿的現用態用暖光 glow，其餘一律不發光。
- 標明「架空のデモ」；數值/物理標為近似。

**Don't（含去AI化禁令）**
- ✗ 紫藍漸層 hero、置中大標＋兩鈕＋三卡模板。
- ✗ emoji 當 icon（icon/家紋一律自繪 SVG）。
- ✗ 把火花色鋪成大面積色塊或當 UI 主色（會失去暗中光點的張力）。
- ✗ 面板加光暈、火花描邊框（破壞紙と光二層）。
- ✗ 跑馬燈、自動輪播、數字計數動畫、通用淡入當主秀。
- ✗ Lorem ipsum、AI 腔（「在當今快節奏的世界」）、「EST. 19xx」徽章、「把 X 變成 Y」句式。
- ✗ 未經手勢就自動播放聲音；無 `prefers-reduced-motion` 降級。

## 十、頁面骨架範例（可直接取用）

```html
<!-- 提灯串側桿 -->
<nav class="rail" aria-label="メイン">
  <span class="cord"></span>
  <a class="brand" href="index.html"><!-- 花火家紋 svg --></a>
  <div class="lanterns">
    <a class="lantern" href="index.html" aria-current="page">宵空</a>
    <a class="lantern" href="banzuke.html">番組</a>
    <a class="lantern" href="annai.html">案内</a>
  </div>
</nav>

<!-- skyfield-first：夜空直開場，無大標 hero -->
<div class="stage">
  <canvas id="sky"></canvas>
  <div class="stage-grad"></div>
  <div class="hero-copy">
    <div class="kicker">八月十六日（土）宵灣港</div>
    <h1>座る場所で、<em>花火は変わる。</em></h1>
    <p>光は一瞬、音は毎秒340メートル。まず、あなたの席を。</p>
  </div>
  <div class="console"><!-- 選席マップ ＋ 時間軸 ＋ 打ち上げボタン --></div>
</div>
```

```css
:root{--yoi:#0E1730;--yoi2:#16203B;--nari:#EDE3CE;--aijiro:#8FA6C8;--shu:#E24A3B;--kin:#E7B84E;--line:#2A3757}
body{background:var(--yoi);color:var(--nari);font-family:"Zen Kaku Gothic New",sans-serif}
h1,h2{font-family:"Shippori Mincho B1",serif;font-weight:800}
.lantern[aria-current="page"]{background:radial-gradient(circle at 50% 40%,#F7C24A,#E24A3B);
  color:#3a1206;box-shadow:0 0 22px 2px rgba(231,120,40,.55)}
```

```js
// hanabi-mon 生成器（節略）：型と色から放射対称の紋を返す
function mon(type, salt, seed){ /* botan=点輪 / kiku=尾付放射 / kamuro=垂れ / senrin=小割群 ... */ }
// 有限声速：開花音の到達 = 開花時刻 + hypot(水平距離, 開花高度) / 340
var VSOUND=340;
function soundArrival(burstT, seat, apogeeH){ return burstT + Math.hypot(dist(seat), apogeeH)/VSOUND; }
```

驗收：一個從未看過 Demo 的 AI，只讀本 SKILL 即可做出風格一致的宵藍夏祭站——夜為底、火為點、紙と光二層、縦組明朝、提灯側桿、hanabi-mon 家紋、以及「光先到、音後到」的時間差情緒。
