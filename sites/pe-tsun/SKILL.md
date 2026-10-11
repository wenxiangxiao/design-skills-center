---
name: neo-impressionist-divisionism
description: Neo-Impressionist divisionism (Seurat, Signac, 1884–1891 and after) as a web style — every colour built from near-equal dabs of a few unmixed spectral pigments plus white on blue-noise positions, no black and no earth colours, sunlight added as orange/yellow dabs and shadow as ultramarine/violet dabs, Chevreul halos at every edge, stiff frieze-like profile figures in horizontal bands, and Seurat's painted border of complementary dots around every picture and panel.
---

# 新印象派分色點描 Neo-Impressionist Divisionism ‧ 點觸與互補畫框

## 0. 血緣與定位

- **流派**：新印象派／分色主義（Divisionism，秀拉本人偏好的稱呼）；俗稱點描派 Pointillism。型錄「繪畫與材質」2026-10-11 新增條目，全館第 1 站（pe-tsun）。**非自創。**
- **年代與地域**：巴黎，1884–1891 為核心（秀拉 1891 年過世），Signac、Cross、Luce、Pissarro 父子延續到 1900 年後；比利時 Les XX 的 Théo van Rysselberghe、義大利 Divisionismo 為支流。
- **代表作**：Georges Seurat〈Une baignade, Asnières〉1884；〈Un dimanche après-midi à l'Île de la Grande Jatte〉1884–86（Art Institute of Chicago 1926.224；1885–86 第二階段才改用近等大的點並剔除土色顏料；1888–89 第三階段加上點畫邊框）；〈Les Poseuses〉1886–88；〈Le Chahut〉1889–90；Paul Signac〈Portrait de Félix Fénéon〉1890、《D'Eugène Delacroix au néo-impressionnisme》1899。
- **理論來源**：Michel-Eugène Chevreul《De la loi du contraste simultané des couleurs》1839（同時對比、交界光暈）；Ogden Rood《Modern Chromatics》1879（視覺混色）；Charles Henry 的線條方向情緒論（上升＝歡愉、水平＝平靜）。「néo-impressionnisme」一詞由評論家 Félix Fénéon 於 1886 年提出。
- **為什麼長成這樣**：他們要讓顏色「在觀者的視網膜上」混合而非在調色盤上攪混——攪混的顏料會變灰變暗，並排的純色點在一段距離外融合時仍保有亮度。所以：顏料只留光譜色＋白、丟掉赭與土黃與黑；每一筆一樣大，讓混合比例可以「數得出來」；陰影不是加黑，而是放入與光互補的藍紫點；交界處依 Chevreul 的觀察刻意加亮／加暗；人物被理性化成側面、直立的行列（秀拉對 Gustave Kahn 說模型是帕德嫩的泛雅典娜節浮雕）。連畫框都要點，因為白框會把邊上的顏色吃掉。
- **外部參照**：Art Institute of Chicago〈A Sunday on La Grande Jatte — 1884〉作品頁與〈La Grande Jatte, Frame by Frame〉2022；Inge Fiedler〈La Grande Jatte: A Study of the Painting Materials〉2004；Robert L. Herbert《Neo-Impressionism》Guggenheim 1968；Signac 1899；Wikipedia〈A Sunday Afternoon on the Island of La Grande Jatte〉。
- **與館內近親的分界**：
  - 半調網點／CMYK 調幅（forty-five-degrees）：那是印刷網屏，點徑隨明暗變、四色固定網角；本風格點**等大**、位置是藍噪隨機，色從十一色光譜顏料挑，調子靠「點的比例」不是「點的大小」。
  - 普普 Lichtenstein Ben-Day（sim-siann）：定尺寸網點但一區一色、粗黑輪廓；本風格**零輪廓、零黑**，一區永遠至少兩色點。
  - 奧費主義（inn-kng）：也引 Chevreul，但是平塗的同心圓盤；本風格沒有任何平塗。
  - 歐普藝術（shidong）：黑白錯視振動；本風格不追求錯視，追求光。
  - 印象派（未入館）：筆觸大小方向自由、即興；本風格的點近等大、系統化、人物僵直。

## 1. 設計哲學

**不調色，只並排。** 畫面上看到的每一個「顏色」都是一份配方：兩三種純色的點按比例放在一起。設計師的工作不是挑色，而是決定配方——哪兩罐、各幾成、亮處補什麼、暗處補什麼。好的分色點描頁面在 3 公尺外看是一幅明亮安靜的禮拜日風景，湊近看是一堆互不相讓的純色碎點；兩種距離的落差就是這個風格的全部樂趣。動效與互動都應該讓人「湊近又退後」、看見配方。

## 2. 本風格的 5 個不可省略特徵

### ① 形狀語彙：近等大的點觸（touche），零輪廓線

一筆一點、大小差不超過 ±15%、略呈橢圓並隨機轉向、位置用 Poisson-disk 藍噪（不可用規則網格——那會變成網點印刷）。形狀只在兩塊顏色相遇時出現；**沒有任何描邊**。人物、船身等細部用小一號（約 0.6×）的點。拿掉它：變成一般平塗插畫。

```css
/* 任何面板／字都可以用兩色點填，不要用中間色 */
.dabs{background:
  radial-gradient(circle,#2F45A6 0 1.6px,transparent 1.9px) 0 0/5px 5px,
  radial-gradient(circle,#7A4A9E 0 1.6px,transparent 1.9px) 2.5px 2.5px/5px 5px,
  radial-gradient(circle,#2C6FC0 0 1.3px,transparent 1.6px) 1px 3px/7px 6px}
```
```js
// Bridson Poisson-disk on a toroidal tile (r = dab spacing), then tiled across the picture
function tile(r){/* 見 index.html 內 PT.tile —— 22r 見方、每點 24 次嘗試、環面距離 */}
```

### ② 色彩規則：光譜色＋鉛白，沒有黑、沒有土色；光＝橙黃點、影＝群青紫點

十一罐：鋅黃 #F6D63A／鎘橙 #EE8A2A／朱紅 #D8402C／茜玫 #C9457E／紫 #7A4A9E／群青 #2F45A6／鈷藍 #2C6FC0／天藍 #5FAED8／翡翠綠 #1F9A72／翠綠 #3E7F4C／黃綠 #9CC23C，加鉛白 #FBF7EC；每罐可加白成三階（0／42%／72%）。任何目標色都**分解成兩罐的點比例**（線性 RGB 最小平方，見 §12）——中灰會被拆成茜玫＋翡翠綠這種互補對。陽光處以 13% 機率換成鋅黃／鎘橙（15:30 後換鎘橙、17:00 後換朱紅淡），陰影處以 20% 機率換成群青／紫。UI 文字色用最深的群青 #22306E——**全站不得出現可見的黑**。拿掉它：變成彩色紙屑。

```css
:root{--ink:#22306E;--ul:#2F45A6;--pu:#7A4A9E;--or:#EE8A2A;--zy:#F6D63A;--gr:#FBF7EC}
body{color:var(--ink);background:var(--gr)}       /* no black, anywhere */
```

### ③ 字體：高反差 Didone 斜體＋點描字

19 世紀末巴黎海報與型錄的 Didone（Google Fonts「Bodoni Moda」，italic 600–900）配中文「Noto Serif TC」900。大標題本身用兩色點填（`background-clip:text`），不是平塗——字也遵守分色。拿掉它：用黑體標題，畫面立刻變成現代 App。

```css
.dt{font-family:"Bodoni Moda","Noto Serif TC",serif;font-weight:900;color:transparent;
 -webkit-background-clip:text;background-clip:text;
 background-image:radial-gradient(circle,var(--a) 0 1.6px,transparent 1.9px),radial-gradient(circle,var(--b) 0 1.6px,transparent 1.9px);
 background-size:5px 5px;background-position:0 0,2.5px 2.5px}
@supports not ((-webkit-background-clip:text) or (background-clip:text)){.dt{color:#22306E}}
```

### ④ 版面：水平帶與側影行列（frieze）

畫面與頁面都由平行的水平帶組成（天／山／橋／河／岸；頁首／畫／點線地平線／內容帶）；人物一律**正側面、直立、等高排成一列**，像浮雕行列；只有一個人（白衣小女孩）正面看著觀者——本站把它變成導覽：所在頁的那個人轉過來看你。分隔用一條點出來的地平線，不用實線。拿掉它：人物變成動態速寫，風格滑向印象派。

```css
.horizon{height:8px;background:radial-gradient(circle,#2F45A6 0 1.6px,transparent 2px) 0 0/7px 8px,
 radial-gradient(circle,#EE8A2A 0 1.6px,transparent 2px) 3.5px 0/7px 8px}
```

### ⑤ 裝飾母題：秀拉的點畫邊框——互補色的點圈

每一幅畫、每一個面板外圈都有一圈點，顏色是它**碰到的那一塊的互補色**：天藍面板配橙黃點、草綠面板配紫與茜玫點、粉紅面板配綠點、黃面板配群青紫點。畫布邊框由引擎在 22 單位寬的帶內取鄰接像素的反色、提亮後分解成點。拿掉它：所有面板都像一般卡片。

```css
.fr{position:relative;background:var(--fill)}
.fr::before{content:"";position:absolute;inset:-10px;padding:10px;pointer-events:none;
 background:radial-gradient(circle,var(--fa) 0 2.1px,transparent 2.7px) 0 0/8px 8px,
            radial-gradient(circle,var(--fb) 0 2.1px,transparent 2.7px) 4px 4px/8px 8px;
 -webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;
 mask:linear-gradient(#000 0 0) content-box exclude,linear-gradient(#000 0 0)}
.fr.sky{--fill:#E4EFF2;--fa:#EE8A2A;--fb:#F6D63A}  .fr.grass{--fill:#EEF2D2;--fa:#7A4A9E;--fb:#C9457E}
.fr.rose{--fill:#F7E6E4;--fa:#1F9A72;--fb:#9CC23C} .fr.sun{--fill:#FBF0CF;--fa:#2F45A6;--fb:#7A4A9E}
```

## 3. 色彩系統（配方，不是色票）

| 角色 | 值 | 比例 | 用途 |
|---|---|---|---|
| 鉛白地 | #FBF7EC | 頁面 45% | 頁面地色，帶極稀的鋅黃／天藍／茜玫點紋 |
| 深群青（文字） | #22306E | 10% | 全部文字、表格；取代黑 |
| 群青／紫 | #2F45A6／#7A4A9E | 10% | 按鈕、陰影點、黃面板的邊框 |
| 鎘橙／鋅黃 | #EE8A2A／#F6D63A | 8% | 光點、藍面板的邊框、強調 |
| 朱紅 | #D8402C | 4% | 選中狀態、編號、首字 |
| 草綠族 | #9CC23C／#1F9A72／#3E7F4C | 畫內 | 草地與樹的配方 |
| 天藍／鈷藍 | #5FAED8／#2C6FC0 | 畫內 | 天與水的配方 |
| 茜玫 | #C9457E | 畫內 | 灰色與草地陰影的互補配方 |

面板地色一律是「純色加大量白」的淺階（#E4EFF2、#EEF2D2、#F7E6E4、#FBF0CF），邊框取其互補。零漸層（畫內天空的漸層只存在於看不見的「意圖色場」，輸出永遠是點）。

## 4. 字體系統

- 拉丁：Bodoni Moda（Google Fonts，可變 opsz 6–96、wght 400–900，含 italic）；品牌副標、價格數字、編號一律 italic 700–900。
- 中文：Noto Serif TC 400／700／900。
- 字級：h1 clamp(38px,5.6vw,84px)；h2 clamp(26px,3.4vw,40px)；h3 19px；內文 16–17px／行高 1.75；註記 13px。
- 首字下沉（故事頁）：900 64px 朱紅，一個字。

## 5. 版面與網格

- 12 欄 `band` 網格，內容一律落在水平帶上；畫作永遠 5:3、滿版寬度（最大 1240px），是每頁第一屏。
- 不旋轉、不斜切：水平與垂直是唯二方向（Charles Henry：水平＝平靜）。
- 留白：帶與帶之間 28px 的點線地平線；面板外圈因點框要多留 10px。
- ≤760px：單欄；畫框上的題字移除（資訊在下方重複）；導覽變成底部行列。≤560px：配方面板固定到畫的左下。

## 6. 元件配方

- **導覽 frieze-file**：左下固定一列 4 個 SVG 側影人物（撐傘女士／持槳船伕／拿調色盤的畫家／戴斗笠阿伯），每人填兩色點 pattern、腳下一條點出來的草地；所在頁的那一位換成**正面**並看著你，頁名轉朱紅。hover：人往上一步。人物 3.6 s 原地緩步（ambient）。
- **按鈕**：群青實底＋內圈 3px 群青＋2px 鎘橙（自帶互補邊）；ghost 版透明底。
- **chip**：2px 群青點線框；選中＝群青底＋橙色實框；不可選＝刪除線。
- **面板 .fr**：見特徵⑤。
- **表格**：無格線，只用 2px 點線底線。
- **配方面板**：鉛白 94% 底＋白與橙兩圈 box-shadow；每列一個小橢圓色點＋顏料名＋百分比。
- **footer**：一條點線地平線＋三欄。

## 7. 動效規則（四種全有，皆有 reduced-motion 降級）

| 類型 | 內容 | 觸發／時間 | reduced-motion |
|---|---|---|---|
| ambient 環境 | 水面上的點每顆以自己的相位左右晃 ±1.6 單位、全部點亮度 ±2.5% 閃爍；畫的光依台北真實時刻每 10 分鐘重新點一次；導覽人物緩步 | 永遠 | 點靜止、人物不動；光依載入時刻 |
| input 輸入 | **游標是一把陽傘**：傘影（半徑 66–78 單位、邊緣以點為單位鋸齒）下的點被換成群青或紫，36% 保留原色——影子不是變暗，是換色 | pointermove，同一幀 | 保留（它不是動畫） |
| transition 轉場 | 換頁：所有點向外飛散 420ms，新頁由散而聚 900ms（cubic in-out）；訂船頁每次改選，新畫以 650ms 從 35% 散度聚回；船票上滑 .5s | 點連結／改狀態 | 直接換頁、直接重畫 |
| signature 簽名 | **拆回配方 un-mix**：點畫面任一處，半徑 60–70 單位內的點離開畫面，按顏料分成直欄排在原地上方 620ms，停 1.9s，再 720ms 飛回；同時出現配方面板 | click／Enter | 不移動，只顯示配方面板 6 秒 |

本站禁用：淡入揭示、捲動視差、數字計數。

## 8. 插畫與圖像風格：divisionist-touche 分色點觸

先用 Canvas 2D 畫一張**意圖色場**（可以有漸層與混色，因為它永遠不會被看到）、一張**光照圖**（白＝陽光、灰＝陰影，投影方向由時刻決定）、一張**遮罩**（R＝水面、G＝細部）。再把它「編譯」成點：每顆點取意圖色 → 兩罐配方 → 依光照換光點／影點 → 依 Chevreul 光暈（局部亮度減去模糊亮度，>0.04 換白或淡階、<−0.04 換純群青／紫）→ 落在藍噪位置。人物是 Seurat 式的幾何側影（鐘形裙、直筒外套、圓頭、平頂帽、陽傘半橢圓），永遠站在地平線上。

## 9. Logo 與 Favicon

- Logo：鉛白圓盤內約 640 顆點——上半天藍與白、右上鋅黃橙的太陽、中間朱紅鎘橙的船身、下半群青天藍紫的水，船上一個側面船伕與一支槳（槳與人是唯一的實塊）。
- Favicon：32×32，天藍＋群青水點、朱紅船點、鎘橙太陽點、一顆鋅黃點；鉛白地。

## 10. Do & Don't

**Do**：所有顏色先問「配方是什麼」；光加橙黃、影加藍紫；每個面板都要有互補點框；人物側面直立排排站；讓使用者湊近看點、退後看畫。
**Don't**：可見的黑（#000、#111、rgba(0,0,0,…)）；土色（赭、焦茶）；平塗大色塊；描邊；規則網格點（那是網點印刷）；點的大小隨明暗變（那是半調）；動態速寫的人物；紫藍漸層 hero；emoji icon；置中三卡片；EST. 年份徽章。

## 11. 頁面骨架範例

```html
<header class="top wrap">…店徽＋店名＋「此刻碧潭 15:42・影子往右長，是群青與紫」…</header>
<div class="stage-wrap"><figure class="stage">
  <canvas id="paint" tabindex="0" role="img" aria-label="點描畫：…"></canvas>
  <noscript><div class="noscript-paint"></div></noscript>
  <div class="recipe" id="recipe" aria-hidden="true"></div>
</figure></div>
<main class="wrap">
  <h1><span class="dt" style="--a:#2F45A6;--b:#7A4A9E">禮拜日，去碧潭扒船</span></h1>
  <section class="band"><div style="grid-column:1/8">…</div><div class="fr sky" style="grid-column:8/13">…</div></section>
  <div class="horizon"></div>
</main>
<nav class="frieze">…四個側影，所在頁的那位轉正面…</nav>
<script>
var pr=ptBoot(document.getElementById("paint"),{W:1200,H:720,border:22,scene:function(gC,gL,gM,env){/* 意圖色場＋光照＋遮罩 */},env:{hour:15.5}});
pr.cv.addEventListener("click",function(e){var q=pr.toPaint(e);pr.unmixAt(q[0],q[1],showRecipe,64)});
</script>
```

## 12. 技術實作與相容性

### 12.1 WebGL2 實例化點觸渲染（A 渲染層）

- 每顆點一個 instance（位置 2、顏色 3、種子／水面／細部旗標 1、目標位置 2），一支 4 頂點 TRIANGLE_STRIP 四邊形 `drawArraysInstanced`；片段著色器畫帶 3／5 次諧波鋸齒的橢圓、`discard` 透明處；陽傘影、水面晃動、散聚、拆配方都在頂點著色器以 uniform 驅動，CPU 每幀只送 11 個 uniform。
- **支援度（查證）**：MDN `WebGL2RenderingContext.vertexAttribDivisor()` 標示 Baseline Widely available，自 2021-09 起各大瀏覽器皆可用（Chrome 56、Edge 79、Firefox 51、Safari 15、iOS Safari 15）。另放一個 divisor 0 的四角頂點屬性，不依賴 `gl_VertexID`。頂點與片段共用的 uniform（uTm／uMo）兩邊皆宣告 highp，避免精度不一致的連結失敗；`smoothstep` 依規格 edge0<edge1；連結失敗即拋出並進入 fallback。
- **fallback**：`getContext("webgl2")` 為 null 或著色器連結失敗 → 換一張新 canvas 改用 Canvas 2D 一次畫完全部橢圓點（靜態，無晃動、無陽傘影、無散聚；拆配方改為只顯示面板）。無 JS → `noscript` 內的 CSS 多層 radial-gradient 點紋色帶，所有資訊皆在 DOM。
- 來源：MDN〈WebGL2RenderingContext: vertexAttribDivisor()〉；MDN〈WebGL2RenderingContext〉。

### 12.2 分色編譯器＋藍噪點位（E 資料與生成層）

- `decompose(r,g,b)`：在 34 罐墨（11 色×3 階＋白）中窮舉兩兩組合，以線性 RGB 最小平方求比例 w，誤差另加 0.1·w(1−w)·|A−B|² 的「混合變異」懲罰（偏好相近色並排、灰色才用互補對），並偏好兩罐顏料多於「顏料＋白」（分色優先於稀釋）；結果以 15 位元量化色快取。
- 點位：Bridson Poisson-disk 於 22r 見方的環面磚生成（約 300 點／磚）後平鋪；細部遮罩內改用 0.62r 的第二張磚。顏色序列用整數雜湊，同一畫面每次載入完全相同。
- 使用者輸入的顏色（訂船頁的陽傘、船隊卡片的船身）在執行期走同一支編譯器，頁面上印出的百分比就是實際點比例。
- **實測**（Node 22／V8，jsdom 整頁量測，1200×720 畫、桌機 r≈4 單位）：約 39,000–45,000 顆點；場景＋讀像素＋編譯＋上傳 54–64 ms；手機 380px 寬（r≈9.2）約 7,700 顆點。Canvas 2D fallback 首次繪製約 230 ms（一次性）。

### 12.3 時間驅動的光（B 動效與時間軸層：matchMedia＋真實時刻）

- `Intl.DateTimeFormat("en-GB",{timeZone:"Asia/Taipei",hourCycle:"h23"}).formatToParts()` 取碧潭當地時刻；09–18 時以真實時刻決定光點色（鋅黃→鎘橙→朱紅淡）與投影方向長度（dx=(h−12)·0.26），營業時間外固定畫 17:24 收船前的光；首頁每 10 分鐘若光移動超過 9 分鐘就重新編譯並以聚合轉場換上。`matchMedia("(prefers-reduced-motion: reduce)")` 統一關閉晃動、散聚與拆配方位移。
- 支援度：Intl.DateTimeFormat 的 timeZone 與 formatToParts 為 Baseline Widely available；例外時退回裝置本地時間。

### 12.4 CSS 部分

- `mask-composite: exclude`（點框挖空）：MDN 標示 Baseline 2023（Chrome 120、Firefox 53、Safari 15.4）；同時寫 `-webkit-mask-composite:xor`。不支援時點框鋪滿面板底（面板地色淡、仍可讀）。
- `background-clip: text`（點描字）：Chrome 120 起免前綴，另寫 `-webkit-background-clip:text`；`@supports not` 時退回 #22306E 實色字。
- 來源：MDN〈mask-composite〉；caniuse〈background-clip: text〉。

### 12.5 效能預算

- 單頁 51–60 KB（含 inline 全部 CSS／JS）＋logo.svg 約 62 KB；遠低於 350 KB。
- 首屏 JS：編譯約 60 ms（桌機）／約 20 ms（手機點數）；每幀只有一次 instanced draw call（4 頂點 × 約 4 萬 instance），分頁隱藏時停止 rAF。
- 無 layout thrashing：尺寸變化以 ResizeObserver 去抖 180 ms 後才重編譯，寬度變化 <40px 不重編。
