---
name: emblazon-illuminated
description: A dark royal-purpure illuminated-heraldry visual language driven by a blazon grammar — an emblazoning engine renders every image (shields, charges, tinctures with engraver's hatching) from a formal armorial description, enforcing the rule of tincture, marshalling for lineage, and cadency for birth order.
---

# 彩飾盾徽紋章風 Emblazon-Illuminated

一套為「紋章／盾徽」而生的視覺語言。它的核心命題不是把盾牌畫得漂亮，而是把整套視覺**收束成一支文法引擎**：使用者以 blazon（宣讀文法）逐層砌成一面盾——底色、榮譽紋帶、紋章物、安排、聯姻四分、幼子差痕——引擎即時 emblazon（彩飾）成 SVG，並以真實的**異色律**校驗。全站每一張圖像（盾徽、紋章物、logo、favicon、授證印記、單色刻線）都是同一支引擎的輸出，無一張是描摹的、無一張外部圖片。底色刻意是深皇家紫（Purpure），像一頁中世紀泥金抄本的暗底，金箔（Or）與各色 tincture 在其上發光。

這套風格的骨子裡是一間執業紋章院的秩序感：不誇張、不漸層、不圓角泡泡；只有幾何、金線分格、與一種「每一筆都有語意、都能讀回一段文字」的嚴謹。

## 一、設計哲學

1. **不畫，而宣讀（Non pingimus — blasonamus）。** 這是全風格的第一原則。紋章不是自由繪畫，而是一段可宣讀、可複現的描述。任何採用本風格的站，其視覺主體都應由一組結構化參數（一個 blazon 物件）驅動生成，而非手貼 PNG。同一段 blazon 由任何人彩飾，結果一致——這是紋章八百年來的做法，也是本風格「去AI化」最強的訊號：圖是規則的解，不是模型的品味。
2. **深皇家紫作暗底，金與 tincture 在其上發光。** 底色是 `#211026` 一類的暗紫（aubergine／purpure），像抄本的泥金頁背。它不是冷炭、不是靛藍、不是暖漆黑——是帶紅味的紫黑，罕見而有王氣。金線（`#C79A3E`）作分格與徽記邊，各標準 tincture 只出現在盾面上。
3. **幾何即語彙。** 榮譽紋帶（fess／pale／bend／chevron／cross／saltire／pile／chief／bordure）與紋章物（星、百合、獅、塔、鑰…）都是固定幾何，按固定位置與數目安排（一枚居中、三枚作二上一下）。不做柔邊、不做漸層、不做模糊陰影；元件輪廓一律硬邊，靠明度與色相差立層次。
4. **異色律是規則，不是偏好。** 金屬（Or・Argent）不置於金屬，顏色（Gules・Azure・Vert・Sable・Purpure）不置於顏色。違例的盾，介面當場駁回並指出違例之處。這條規則要被寫成程式、被介面執行——它讓風格有了「會說不」的骨氣。
5. **一切可讀回文字。** 盾面在變，左下角的 blazon 文句同步在變（英文正規 blazon＋中文釋讀）。使用者永遠能把眼前的圖讀成一句話、也能把一句話砌成圖。

## 二、色彩系統

底盤為暗紫墨階，tincture 為紋章七標準色。比例指全站像素佔比的概略值。

| 名稱 | Hex | 角色 | 用量比例 |
|---|---|---|---|
| Purpure 皇家紫（底） | `#211026` | 全站大面積底色、暗底 | ~46% |
| 紫黑面板 | `#1A0C1E` / `#2C1730` | panel、卡片、footer | ~22% |
| Or 金 | `#C79A3E`（亮 `#E3C578`） | 金線分格、徽記邊、標題高光、金屬 tincture | ~9% |
| 骨白／Argent | `#ECE6D3` | 亮字、銀 tincture、刻線底 | ~8% |
| Gules 紅 | `#A83232` | tincture、違例警示、語意色 | <5% |
| Azure 藍 | `#2C5586` | tincture | — |
| Vert 綠 | `#3B7048` | tincture | — |
| Sable 黑 | `#1C1712` | tincture、描邊 | — |
| 暗金字（dim） | `#B7A38C` | 次級文字、說明 | ~8% |

**刻線（hatching）對照**（十七世紀單色版印表記法，用於「切換刻線」模式與色系表）：Or＝點；Argent＝空白；Gules＝直線（豎）；Azure＝橫線；Vert＝右斜線；Purpure＝左斜線；Sable＝縱橫交叉。實作時以 SVG `<pattern>` 疊在骨白底上，線色 `#3a2f22`。

規則：底色若為金屬，則其上紋帶／紋章物須為顏色，反之亦然（見異色律）。深紫底 `#211026` 是**頁面底**，不是盾面 field，故不受異色律拘。

## 三、字體系統

三族分工，全部取自 Google Fonts：

- **Cormorant Garamond**（拉丁展示體，`500/600/700`＋斜體）：品牌字、大標、盾徽名、blazon 英文句、章節英文副題。它的高對比襯線與長 ascender 帶來抄本的優雅。字距 `.02–.14em`，大標字級 `clamp(30px,5.4vw,52px)`。
- **Noto Serif TC**（`400/600/700/900`）：所有中文正文、標題、釋讀。行高 `1.72`。
- **Spline Sans Mono**（`400/500/600`）：kicker 小標（`letter-spacing:.2–.32em; text-transform:uppercase`）、登錄號、盾徽碼、規費、表單標籤、刻線色票代號。

字級 scale：大標 30–52px／`h2` 22–30px／正文 16px／小標 10–12px。中文標題用 Noto Serif TC 700，拉丁用 Cormorant 600/700。

## 四、版面與網格

- **不對稱雙欄。** 工作台頁為 `minmax(0,1fr) 372px`（盾面舞台｜文法組構）。授證頁為 `minmax(0,1fr) 300px`（表單｜預覽）。名鑑為 4 欄卡牆（`repeat(4,1fr)`，≤820px 轉 2 欄）。
- **金線分格、零圓角。** panel 用 `1px solid rgba(199,154,62,.32)`；四角以 `::before/::after` 畫 9px 的金色「L 形」角標（抄本邊框的暗示）。一律 `border-radius:0`。
- **留白中等偏密。** 內容欄 `max-width:1180px`；方法頁正文 `max-width:820px` 以利閱讀。section 間距 `44–56px`。
- **盾面為視覺錨。** 盾牌 viewBox `0 0 100 116`，heater 盾形路徑固定；盾徽一律配 `drop-shadow(0 6px 16px rgba(0,0,0,.55))` 使其浮於暗紫頁上。

**盾形路徑（heater escutcheon）**，全站唯一盾形，務必沿用：

```
M10,8 H90 V56 C90,84 72,102 50,110 C28,102 10,84 10,56 Z
```

## 五、元件配方

**導覽（quartering-shield 四分盾導覽）：** 桌機右上角固定一面四分盾 SVG（`position:fixed;top:16px;right:18px;width:96px`），四頁即四個 quarter（I/II/III/IV），現用頁那一分區 emblazon 成 tincture（上色），其餘三區以 heraldic hatching（刻線）呈現，象徵「未現用」；分區中央以 Cormorant 羅馬數字標號，金線十字分格。≤900px 隱藏盾、改為底部四格 dock（`repeat(4,1fr)`，現用格翻金底）。頁尾另備完整文字連結保底。**不使用 topbar 置頂列。**

**盾徽（emblazon 引擎輸出）：** 見第七節。所有盾牌經由 `emblazon(blazon, hatch)` 生成，含 clipPath（盾形）、field/division、ordinary、charge、cadency、金色 rim。

**按鈕：** `.btn` 為 `1px solid var(--or)` 透明底、mono 字、`padding:8px 13px`；hover 反白（金底墨字）。`.btn.ghost` 為暗線次級鈕。tincture 選色為 34px 方鈕，選中以 `outline:2px solid var(--or2); outline-offset:2px`。seg 分段鈕選中翻金底。

**表單：** 輸入框 `background:var(--pur2); border:1px solid rgba(199,154,62,.18); padding:10px 12px`，focus 邊框轉金。錯誤態 `.field.bad` 邊框轉 Gules、`.err` 顯示紅字。標籤為 mono uppercase 金字。三步 stepper 為等寬三格、現用格金底。

**卡片（名鑑）：** panel 暗底、`1px` 暗線，hover 邊框轉金並 `translateY(-2px)`。盾徽置頂、Cormorant 家系名、斜體 blazon、mono 標籤、金色「於工作台開啟 →」連結（帶 `?arms=` 碼）。

**footer：** 金線上緣、三欄（院址／官署連結／院訓），底部一段 `.disc` 虛構聲明（`11px`，暗金字）。

## 六、動效規則

本風格的識別性來自**核心互動（宣讀→彩飾→校律）本身**，不靠動效簽名。動效一律克制，且刻意避開全館過載語彙（揭示淡入當簽名／數字計數／按壓硬陰影當簽名／dashoffset 描繪）。**無跑馬燈、無自動輪播、無自動播放。**

- **即時重繪（核心）：** 每次改動 blazon，`shieldStage.innerHTML = emblazon(state,hatch)` 整面重繪，無補間——像紋章官重新落筆。這是「資料變化」而非裝飾動畫。
- **按鈕回饋：** hover 反白 `transition:background .12s, color .12s`；tincture／seg 選中即時。
- **紋帶／紋章物：** 不做進場動畫，隨資料一次到位。
- **stepper 換步：** `window.scrollTo` 平滑至頂（reduced-motion 下改 `auto`）。
- **prefers-reduced-motion：** 全域 `*{transition:none!important;animation:none!important}`；所有 `scrollIntoView/scrollTo` 改 `behavior:"auto"`。核心玩法（宣讀、校律、授證）完全不依賴動畫，reduced-motion 下功能不減。

## 七、插畫與圖像風格（emblazon-heraldic 盾徽 emblazon 構成）

**全站無一張外部圖片、無一張描摹插圖。** 所有圖像都是 `emblazon(blazon)` 的輸出。引擎的組成：

1. **盾形 clip：** 以上述 heater 路徑作 `<clipPath>`，所有內容裁進盾內。
2. **field / division：** 純色（一 tincture）或分區（per pale／per fess／per bend／quarterly，二至四 tincture）。以 `<rect>`／`<polygon>` 在 clip 內鋪底。
3. **ordinary：** 幾何形（`ordShape(type)` 回傳 `<rect>/<polygon>`）。bordure 特例為沿盾形描粗邊。
4. **charge：** 每種紋章物是一個回傳 SVG path `d` 的函式（局部 `±10` 座標），依 `arrangement(n)` 的座標與縮放 translate 到盾面。內建 17 種：`fleur`（百合）、`mullet`（五角星）、`estoile`（六芒波星）、`lion`（直立獅，程序化剪影）、`cross`（寬臂十字）、`rose`（五瓣紋章玫瑰）、`crescent`（新月）、`escallop`（扇貝）、`sun`（光耀日輪）、`tower`（塔）、`key`（鑰）、`sword`（劍）、`martlet`（燕）、`garb`（麥束）、`lozenge`（菱）、`roundel`（圓珠）、`annulet`（環）。
5. **cadency：** 盾首中央的小差痕（label 橫檔／crescent／mullet／martlet／annulet／fleur）。
6. **hatching 模式：** `hatch=true` 時 tincture 改以 `<pattern>` 刻線填充（見色彩系統對照）——用於單色校對與色系表。
7. **rim：** 最後描 `2.2px` 金色盾緣。

安排座標建議：一枚 `{x:50,y:58,s:1.55}`；三枚 `{34,38}{67,38}{50,77}, s:.66`（二上一下）；二枚 `{35,46}{65,46}, s:.7`。

marshalling（四分）：把兩個 blazon 各縮 `scale(0.5)` 塞進四象限並各自 clip，I/IV 為本紋、II/III 為聯姻之紋。

**logo／favicon 亦出自此引擎**：logo 為 de Vaux 家盾（Azure, a fess Or between three mullets Argent）＋ Cormorant 字標；favicon 為 inline SVG data URI 的小盾＋金百合。

## 八、Logo 與 Favicon 設計指南

- **Logo：** 一面院徽盾（建議即品牌自身之 blazon）＋院名（Cormorant 大寫字標）＋中文院名（Noto Serif TC）＋拉丁院訓（斜體）。盾與字標左右排列，盾配 drop-shadow。存為 `assets/logo.svg`（靜態，無 JS 亦顯示）。
- **Favicon：** 深紫圓角小盾＋金色描邊＋一枚金百合（fleur-de-lis），寫成 `data:image/svg+xml,...` 置於 `<head>`。務必用原創路徑，勿用 emoji。
- 兩者都應是「同一支引擎語彙」的產物：盾形一致、金線一致、tincture 一致。

## 九、Do & Don't

**Do**
- 讓所有圖像由一個 blazon 物件生成；同一 blazon 恆得同一盾。
- 深皇家紫暗底＋金線分格＋硬邊幾何；tincture 只出現在盾面。
- 把異色律寫成會執行的規則：違例即駁回並指出違例處。
- blazon 文句（英＋中）與盾面同步；一切可讀回文字。
- 紋帶／紋章物按固定位置與數目安排；盾形全站唯一。
- 提供刻線（hatching）單色模式作為校對與致敬版印傳統。

**Don't（含去AI化禁令）**
- 不用紫藍**漸層** hero（本風格的紫是**實色暗底**，非漸層，切勿誤解）。
- 不用圓角泡泡卡片＋模糊陰影；不用置中大標＋兩顆按鈕＋三張圓卡模板。
- 不用 emoji 當紋章物或 icon；紋章物一律 SVG path。
- 不手貼任何外點陣圖或外部圖示；除 Google Fonts 外零外部資源。
- 不違異色律而不作聲；不把金屬疊金屬、顏色疊顏色當作沒事。
- 不加跑馬燈、不自動輪播、不用「揭示淡入」當動效簽名。
- 不用 Lorem ipsum、不用「在當今快節奏的世界」式 AI 腔；文案從紋章學本身長出（宣讀、彩飾、異色律、四分、差痕）。

## 十、頁面骨架範例（可直接使用）

```html
<!-- 導覽：四分盾（桌機）＋底部 dock（手機） -->
<nav class="quart" aria-label="主導覽">
  <svg viewBox="0 0 100 116" id="navShield" aria-hidden="true"></svg>
  <span class="qlabel" id="navLabel">I · ATELIER</span>
  <div class="dock">
    <a href="index.html" aria-current="page">壹</a>
    <a href="page2.html">貳</a><a href="page3.html">參</a><a href="page4.html">肆</a>
  </div>
</nav>

<!-- 盾面舞台 + blazon 文句 -->
<div class="panel"><div class="stage">
  <div id="shieldStage"><!-- emblazon(state,hatch) 注入 --></div>
  <div class="blazon">
    <div class="en" id="blazonEn">Azure, a fess Or between three mullets Argent.</div>
    <div class="zh" id="blazonZh">藍地，金色橫帶，帶間銀色三星。</div>
  </div>
  <div class="verdict good">可登錄：紋章物與底色明暗相反，合乎異色律。</div>
</div></div>
```

```js
// emblazon 引擎最小骨架
var TINCT={or:{hex:"#C79A3E",metal:true,hatch:"or"},argent:{hex:"#ECE6D3",metal:true,hatch:"argent"},
  gules:{hex:"#A83232",metal:false,hatch:"gules"},azure:{hex:"#2C5586",metal:false,hatch:"azure"},
  vert:{hex:"#3B7048",metal:false,hatch:"vert"},sable:{hex:"#1C1712",metal:false,hatch:"sable"},
  purpure:{hex:"#6E3D6B",metal:false,hatch:"purpure"}};
var SHIELD="M10,8 H90 V56 C90,84 72,102 50,110 C28,102 10,84 10,56 Z";

function checkLegal(bl){ // 異色律：同為金屬或同為顏色即違例
  var out=[];
  if(bl.charge&&bl.charge!=="none" && TINCT[bl.chargeT].metal===TINCT[bl.fieldT].metal)
    out.push("紋章物與底色同類（"+(TINCT[bl.fieldT].metal?"金屬":"顏色")+"），違異色律");
  return {ok:out.length===0, issues:out};
}
function emblazon(bl){ /* clipPath(SHIELD) → field → ordinary → charge(arrangement) → cadency → 金rim */ }
```

---

*本風格由 emblazon 引擎驅動：一支「blazon 文法 → 盾徽 SVG」的渲染器，同時產出使用者作品、名鑑二十四族、logo、favicon 與授證印記。採用時務必保留「宣讀→彩飾→校律」的三段結構與異色律的即時執行——那是這套風格與一般「換色配置器」的根本差別。*
