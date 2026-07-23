---
name: spore-print-radial
description: A naturalist field-key visual language where every image is a spore deposit — form emerges from the density of stippled spore-dots, never from outline — on toned herbarium stock in slate-green and spore-rust duotone.
---

# 孢印放射風 Spore-Print Radial

> 一套為「野外辨識機構」長出來的視覺語言：所有圖像都是**孢子落在紙上的沉積**，形態由孢子點的疏密浮現，沒有一條描出來的輪廓線。底色是標本板的灰綠、墨是孢子的鏽褐，配一個只在「有毒」時才出現的朱紅。整體氣質介於十九世紀博物圖鑑與現代野外檢索卡之間，冷靜、可信、帶著「這是會出人命的知識」的重量。

---

## 一、設計哲學

三個信念撐起這套風格：

1. **圖是「落」出來的，不是「畫」出來的。** 一朵菇成熟後把傘蓋在紙上，菌褶會落下一層孢子，形成放射狀的孢印——這是真菌辨識最可靠的性狀。本風格把這件事變成唯一的成像手法：每張插圖都是一次孢子沉積，密則深、疏則淡，形狀從密度梯度裡浮出來。禁止描邊，禁止填色塊，禁止用線稿交代形態。

2. **顏色服務判讀，不服務裝飾。** 底色是中性的標本板灰綠，讓孢鏽的墨色跳出來；朱紅是保留字，全站只在「有毒／劇毒」的語意上出現。使用者掃一眼就知道哪裡是警訊。

3. **克制即權威。** 這是一個講「存疑即不食」的機構，版面就該像一張嚴謹的標本卡：等寬的編號、老實的性狀欄、不花俏的分格。任何討喜的圓角、陰影、漸層，都會削弱那份可信。

---

## 二、色彩系統

| 色票 | Hex | 用途 | 比例 |
|---|---|---|---|
| 標本板灰綠 | `#646b5d` | 全站主底色（ground） | ~46% |
| 標本板暗綠 | `#59604f` / `#363b2e` | 面板、頁尾、導覽鐵框 | ~18% |
| 標本米 | `#e7dcc2` / `#ddd0b1` | 內容卡片底、插圖襯底 | ~16% |
| 孢鏽 | `#8a4326`（亮階 `#a95c30`） | 墨／插圖／編號／現用態／可食標題 | ~11% |
| 墨 | `#251d13` | 卡片上的正文字 | ~6% |
| 毒朱（保留字） | `#c7371f` | 只用於「有毒／劇毒／拒絕定名」的語意 | <3% |
| 象牙 | `#ece2ca` | 深底上的文字 | 貫穿 |

要點：底是灰綠與孢鏽的**雙色域（duotone）**，米色與墨為中性，朱紅是**語意保留字**——不得拿朱紅當一般強調色或裝飾。可食種的標題用孢鏽或森綠 `#4a6b3d`，有毒用孢鏽，劇毒才用毒朱。孢印底一律鋪 `radial-gradient` 5px 網點紙紋增加標本紙感。

---

## 三、字體系統

全部來自 Google Fonts：

- **Noto Serif TC**（700／900）：中文標題、性狀提問、物種名。有份量、像圖鑑書名頁。
- **Fraunces**（400／600，含 italic）：拉丁學名一律用 Fraunces *italic*、英文副標與機構英文名。它的老式襯線帶博物學氣息。
- **Noto Sans TC**（400／500／700）：中文正文。
- **IBM Plex Mono**（400／500）：編號、性狀標籤、台號、留位號、食性色帶——所有「像儀器讀數」的地方。

字級 scale（桌機）：主標 30–32px / 區塊標 21–26px / 物種名 17–24px / 正文 15–16px / 標籤 11–12.5px。行高：標題 1.2–1.25、正文 1.7–1.75。拉丁名務必 *italic*，中文名務必正體不斜。

---

## 四、版面與網格

- **左側檢索岔口側桿（couplet rail）**：桌機左緣一條 78px 深綠豎桿，四頁做成四個直排編號卡（壹／貳／參／肆＋直書頁名），現用頁翻成米色、向右推 4px、左緣一道孢鏽 lead 線。≤900px 落為底部橫向 dock。這根桿子是導覽，也是「你在檢索表第幾格」的隱喻。
- **不對稱、無置中 hero**：首頁不做大標開場，直接進「檢索台」——首屏即檢索表的第一個岔口（兩個並排的性狀選項面板）。內容沿使用者走的分支往下長。
- **標本卡分格**：一律 2px 實線硬邊、零圓角、零模糊陰影。位移用 `translate(-1px,-1px)` 這種 1–4px 的硬位移，不用柔和陰影。
- **留白**：中等密度。section 上下 26–34px；卡片內距 12–22px。孢印插圖一律配 1px 米色描邊的方形襯底，像貼在標本卡上的照片。
- 內文頁寬 820–900px，藝廊／檢索頁寬 1140px。

---

## 五、元件配方

**導覽側桿 rail**：`position:fixed;width:78px;background:#363b2e`；連結 `writing-mode:vertical-rl` 直書；現用 `background:#e7dcc2;transform:translateX(4px)`，`.lead` 條 `background:#8a4326`。行動版 `flex-direction:row;height:56px`、直書改橫書。

**岔口卡 couplet**：`border-left:3px solid #8a4326;padding-left:18px`；左上以 `::before` 放一個孢鏽圓形編號徽（24px）；已走過的岔口 border 與徽章轉灰（`#5c5038`）。

**性狀選項 choice**：白底 `1.5px` 實框，左邊一枚 52px 孢印插圖，右邊性狀名（Serif 700）＋說明（12.5px）。hover `translate(-1px,-1px)`；選中翻孢鏽底、象牙字。

**判定卡 verdict**：頂條 `verdict-head` 依食性換底色——拒絕定名＝灰（`#5c5038`）、可食＝森綠（`#4a6b3d`）、有毒＝孢鏽、劇毒＝毒朱；主體白底，左插圖 132px，右物種名＋拉丁 italic＋食性徽章＋描述＋相似種警框（`#fbeae7` 底、毒朱框）＋性狀 chips。

**篩選列 filters**：深綠底，每組一排 mono 小標＋分段按鈕（現用翻孢鏽）；關鍵字用深色 input；右側 mono 計數 `計 N / 24`。

**表單欄位**：白底 1.5px 框；錯誤態 `border-color:#c7371f;background:#fbeae7` 並顯示毒朱錯誤訊息；步驟器 stepper 三格，現用翻孢鏽、已完成翻深綠。

**footer**：深綠底，末列一行 mono 灰字放建置模型與卷號。

---

## 六、動效規則

克制是原則，動效只用來回饋判讀，不做表演。

- **選項選定**：`transition:transform .15s, background .16s`；hover 硬位移 1px，選中即翻底色。不做淡入揭示、不做數字計數、不做描邊 draw-in、不做按壓硬陰影（這四項全館已過載，本風格明令不用）。
- **岔口 append**：走到下一格時新岔口直接插入 DOM，不做進場動畫；只有捲動用 `scrollIntoView({behavior:'smooth'})` 帶到定位。
- **無跑馬燈、無自動輪播、無自動播放**。孢印插圖是靜態沉積，一次生成後不動。
- `prefers-reduced-motion:reduce` 時全部 `transition` 歸零；所有互動為點擊觸發，無任何邏輯依賴動畫，功能完全不受影響。

---

## 七、插畫與圖像風格（本風格的核心引擎）

**唯一技法：孢印放射沉積（sporeprint-radial）。** 全站沒有一張圖是描線或色塊——都是同一支引擎用種子化 PRNG（FNV-1a → mulberry32）落出來的孢子點：

- **孢印蓮座 rosette**：菌傘由下往上看的放射孢印。沿 N 條菌褶線撒點，密度往菌傘邊緣遞增（`r = hole + (R-hole)·pow(rand,0.55)`），中央留一個菌柄疤的空洞。用於孢子印範例、logo、favicon、留位號章。
- **孢影 fungus**：整朵菇的孢子投影。以面積權重把點分配到菌傘（邊緣較密）、菌柄、傘下放射褶影、菌托（volva，基部撒杯狀）、菌環（annulus，柄中一帶）等部位；`parts` 旗標 `{warts,volva,ring,gill,capW,capH,stipeH}` 決定形態學特徵——有疣者傘上結顆粒、有托者基部有杯。同一 slug 恆得同一張圖。
- 點的不透明度隨密度 0.05–0.95、半徑 0.7–2.4，讓沉積有厚薄。墨色一律孢鏽 `#8a4326`（白孢種可改淡таupe `#b8ac8c` 以在米底上可見）。
- 靜態需求（logo/favicon/首頁孢印範例）在建置時以同一引擎烘成 SVG，無 JS 亦可見；圖鑑縮圖與判定插圖於載入時即時生成，並附 `<noscript>` 文字清單保底。

與既有技法的分界：與 `stipple 點描`、`grain-accretion 砂粒聚積`、`intaglio-stipple 雕凹版點刻` 都不同——那些是裝飾點描、粒子受場驅動堆積、或隱函數場取樣抖動；本技法的每一顆點都是**沿真菌菌褶幾何落下的孢子**，密度分布對應真實的孢印形態學，且色即該分類群的真實孢子印色。換一組 `parts` 就換一個物種，不是換皮。

---

## 八、Logo 與 Favicon 設計指南

- **Logo**：一枚菌傘由下往上看的幾何簡化——孢鏽實心圓（cap）＋象牙放射細線（gills，14–20 條）＋中央墨點（stipe scar）。與孢印蓮座同源但收斂為可在小尺寸清晰辨識的線幾何。旁配 Noto Serif TC 900 機構名＋Fraunces 英文副名。
- **Favicon**：同一動機縮到 32×32，深綠圓角方底＋孢鏽圓＋放射 gill 線＋中央墨點，寫成 inline SVG `data:` URI 置於 `<head>`。
- 兩者都可用引擎的 `rosette` 直接烘（孢印版）或用線幾何版（清晰版）；小尺寸優先線幾何，大尺寸與 hero 用真孢印沉積。

---

## 九、Do & Don't

**Do**
- 所有圖用孢子點沉積生成，形由密度浮現。
- 底走灰綠×孢鏽雙色，朱紅只給「有毒」語意。
- 硬邊、零圓角、等寬編號、標本卡分格。
- 文案從真菌辨識長出來：孢子印、菌托、菌褶著生、傷變色、氣味、相似種。

**Don't（含去AI化禁令）**
- ✗ 不描邊、不畫線稿菇、不用 emoji 當 icon。
- ✗ 不用紫藍漸層 hero、不用「置中大標＋兩顆按鈕＋三張圓角卡」。
- ✗ 不用圓角＋模糊陰影卡片；不用揭示淡入／數字計數／描邊 draw-in／按壓硬陰影當招牌動效。
- ✗ 朱紅不當裝飾色；不用「EST. 19xx」年份徽章；不用「把 X 變成 Y」句式。
- ✗ 敏感題材（毒菇食用）務必全站標「虛構教學示意・切勿依此採食」，且辨識邏輯的最後一格必須是排除相似種。

---

## 十、頁面骨架範例（可直接取用）

```html
<!-- 檢索岔口側桿 -->
<nav class="rail">
  <a href="index.html" aria-current="page"><span class="no">壹</span><span class="cn">檢索台</span><span class="lead"></span></a>
  <a href="atlas.html"><span class="no">貳</span><span class="cn">蕈譜</span><span class="lead"></span></a>
  <!-- … -->
</nav>

<!-- 一個岔口（couplet） -->
<div class="couplet" data-no="一">
  <div class="ask">孢子印是什麼顏色？</div>
  <div class="hint">把成熟菌傘蓋在半黑半白卡紙上四至八小時。</div>
  <div class="choices">
    <button class="choice"><svg><!--孢印蓮座--></svg>
      <span><span class="lab">白色</span><span class="desc">含致命的鵝膏屬</span></span></button>
    <button class="choice"><svg><!--鏽褐孢印--></svg>
      <span><span class="lab">鏽褐 / 褐 / 黑 / 粉</span></span></button>
  </div>
  <div class="uncertain"><button>此性狀我看不清楚</button></div>
</div>
```

```js
// 孢印放射沉積引擎（節錄）—— 形由密度浮現，非描線
function rosette(seed, S, dots, col){
  var r = mulberry32(fnv1a(seed)), cx=S/2, cy=S/2, R=S*0.44, gills=20, out=[];
  for (var i=0;i<dots;i++){
    var g=Math.floor(r()*gills);
    var a=(g/gills)*Math.PI*2 + gauss(r)*(Math.PI/gills)*0.9; // 沿菌褶線
    var t=Math.pow(r(),0.55), rad=R*0.11+(R*0.89)*t;          // 邊緣較密
    out.push(dot(cx+Math.cos(a)*rad, cy+Math.sin(a)*rad, 0.7+r()*1.6, 0.3+0.55*t));
  }
  return '<svg fill="'+col+'">'+out.join('')+'</svg>';
}
```

驗收標準：一個沒看過 Demo 的 AI，只讀本檔就能做出「所有圖都是孢子沉積、灰綠×孢鏽雙色、朱紅只給毒性、以二分檢索為骨幹」的全新網站——換一個產業（如礦物鑑定、鳥類辨識），把「孢印」換成對應的沉積／羽紋成像邏輯即可，風格不綁真菌。
