---
name: drydown-mono-ink
description: A single-ink amber perfumery aesthetic where every image is a two-exponential evaporation curve; the drydown timeline is the interface and the illustration engine at once.
---

# 揮發墨階風 — Drydown Mono-Ink 風格規格書

> 一個從未看過 Demo 的 AI，只讀本檔就能做出同風格的全新網站。本風格的核心不是配色，而是一條**先升後降的揮發曲線**：它同時是介面、是插畫、是識別。

## 一、設計哲學

**「香水是一段會退場的時間，不是一張定格的照片。」** 這個風格拒絕產品照、拒絕瓶身、拒絕第二個色相。它把主題（任何隨時間衰減的東西——香氣、餘韻、熱度、記憶）畫成一條雙指數曲線，並讓整站只用**一種琥珀墨的明度階**去承載。狀態（現用、警示、焦點）不靠變色，靠墨值深淺與符號變化。三個信念：

1. **時間是主軸**。頁面的主要維度不是版塊而是時間；核心互動是「推移時間看它如何演化」。
2. **一色到底（mono-ink）**。全站只有一個色相家族的明度階，沒有第二色相。這是最強的去AI化訊號——沒有彩虹狀態色。
3. **圖即資料**。沒有一張圖是「畫」出來的；每一張插圖、logo、favicon、圖鑑縮圖都是同一支揮發引擎（見第六章）跑出的曲線或輪廓。

## 二、色彩系統（單色琥珀墨階）

全部為暖琥珀／棕黑同一色相的明度階，**不得引入第二色相**。

| 代號 | HEX | 用途 | 約略比例 |
|---|---|---|---|
| ink0 | `#17110B` | 全站地色（最暗，近黑暖棕） | ~46% |
| ink1 | `#1F1710` | 面板底 | ~18% |
| ink2 | `#2C2115` | 抬升面／輸入框 | ~10% |
| ink3 | `#3E2F1D` | 分隔線、格線、邊框 | ~6% |
| ink4 | `#5C4526` | 次級邊框、弱文字 | ~5% |
| ink5 | `#8A6A3E` | 標籤、mono 小字、主亮琥珀 | ~5% |
| ink6 | `#B79C6B` | 副文字、曲線描線 | ~4% |
| ink7 | `#D9C39A` | 正文 | ~4% |
| ink8 | `#EFE4CC` | 標題、現用態、playhead 高光 | ~2% |

**用法規則**：地色一律 ink0（**禁止**改成米白紙感底）。曲線的三段用同色相不同明度＋不同不透明度區分——前調最亮最透（`rgba(215,195,154,.34)`）、中調中間（`rgba(124,90,55,.5)`）、後調最暗最實（`rgba(62,47,29,.66)`）。警示與現用**不得用紅／綠**，改用 ink8 加粗、加框、或符號（×／✓）。

## 三、字體系統

Google Fonts 三支，各司一職：

- **Noto Serif TC**（`900` 標題／`500` 小標／`300` 正文）：中文主力。大標一律 900、字距 `.02em`，帶重量與書卷氣。
- **Fraunces**（`400` italic）：拉丁點綴／副標，只用斜體，做為「手寫批註」般的旁白，字級為中文標題的 0.46–0.62 倍。
- **Spline Sans Mono**（`400/500/600`）：所有標籤、數字、時間讀數、eyebrow、頁尾聲明。字距寬（`.1em`–`.34em`）、常大寫。

字級 scale（clamp）：大標 `clamp(30px,5vw,62px)`；區塊標題 `clamp(22px,3.4vw,34px)`；正文 15–16px／行高 1.7–1.8；mono 標籤 9–11px。**禁止**用系統字堆疊裸奔。

## 四、版面與網格

- **極疏（density: 低）**：大量 ink0 留白，內容欄 `max-width:1120px`，文字段落再收到 `max-width:720–760px`。區塊間以 1px `ink3` 實線分隔、`padding:44–56px 0`。
- **不對稱**：hero 標題靠左、佔約 60% 寬，右側刻意留空；診斷面板用 3 欄不等寬網格。
- **無圓角**（除 favicon 內小圓點）：一切為直角硬邊；陰影一律不用模糊柔影。
- **時間軸為視覺重心**：核心頁把一張橫跨全寬的曲線圖放在首屏偏上，配 mono 的對數時間刻度（`0' 5' 30' 2時 8時 24時`）。

## 五、元件配方

- **nav（試香紙架 mouillette-rack）**：頁面右上一排斜插的試香紙（4 頁＝4 張紙），每張 `rotate(-9deg…9deg)` 扇開；現用頁那張抽高（height 46→58px）、紙尖以 `::before` 由上滲下一段 `linear-gradient(ink5,ink3)` 的「香氣顯影」、字轉 ink8。hover 時該紙 `rotate(0) translateY(-3px)`。手機保留於頂部。**不是 topbar、不是 bottom-dock、不是側欄文字連結**。
- **按鈕**：mono 字、`padding:5–11px`、1px `ink4` 框、`ink2` 底；hover 轉 `ink4` 底、`ink6` 框。主要行動鈕（送出）用 `ink5` 實底、`ink0` 字。
- **卡片**：`ink1` 底＋1px `ink3` 框；hover 轉 `ink2` 底＋`ink5` 框。內含一張揮發輪廓 SVG（高 58–80px）。禁止 `rounded-2xl`＋模糊陰影。
- **表單**：`ink2` 底、1px `ink3` 框、聚焦轉 `ink5`；錯誤態邊框轉一個**低飽和琥珀**（`#C9A24B`，仍屬暖色，不用純紅），錯誤訊息 mono 小字。
- **footer**：`ink1` 底、頂 1px `ink3`；三欄（品牌地址／導覽／延伸）；底部一行 mono 聲明含「資料皆為虛構示意」框章與 builtBy。

## 六、動效與互動引擎（本風格的心臟）

### 6.1 揮發模型（雙指數）
每一味「料」的強度隨時間：

```
I(t) = dose · str · norm · ( e^(−t/td) − e^(−t/tr) )      // t 為分鐘
norm = 1 / ( e^(−tp/td) − e^(−tp/tr) ),  tp = (tr·td/(td−tr))·ln(td/tr)
```

- `tr`＝綻放時距（升多快），`td`＝衰減時距（撐多久）。**tr、td 決定它是前／中／後調**：前調 td≈20–52 分、中調 td≈140–340 分、後調 td≈640–1800 分。
- `norm` 把峰值正規化成 `dose·str`，讓不同料的用量可比較。
- 總輪廓 `Total(t)=Σ Iᵢ(t)`；把三段（前/中/後）分層堆疊即得乾燥輪廓。

### 6.2 時間軸（對數映射）
滑桿 0→1 對應分鐘 `exp(lnTMIN+(lnTMAX−lnTMIN)·s)`，TMIN=0.5、TMAX=1440。x 座標同法對數化，讓「前 20 分」佔到畫面近半——符合嗅覺對早期變化更敏感。

### 6.3 即時回饋（拖動時間軸）
- **此刻和弦**：取 `Iᵢ(t) ≥ max(絕對閾, 0.08·Total(t))` 的料為「現在聞得到」，按強度排序、取前列渲染為 ink tag，第一名加粗（`.strong`）。
- **診斷**：對數時間積分各段面積 → 三段結構長條；峰值前 45 分 → 擴散（sillage）；`Total(t)≥閾` 的最大 t → 留香（longevity）。四條判語：後調面積<8%＝尾韻空；前調>55%＝頭重；單一料>46%＝近乎直線；中調<10%＝中段薄；否則＝三段接得上。判語用**神秘寡言**的短句。
- **繪製**：canvas 疊三層填色（後調在底、前調在頂），playhead 為 `ink8` 虛線＋端點圓。`prefers-reduced-motion` 下不自動播放，只在使用者拖動時重繪（本風格天生 reduced-motion 友善）。

### 6.4 其他動效
- 試香紙 hover 展平、`.28s cubic-bezier(.2,.7,.3,1)`。
- **禁用**作為 signature 的過載語彙：通用揭示淡入、數字計數滾動、按壓硬陰影、stroke-dashoffset 描繪。時間讀數的數字變化是功能性讀值、非裝飾計數。
- **無跑馬燈、無自動輪播**。

## 七、插畫與圖像風格（volatility-silhouette 揮發輪廓）

全站**零外部圖片**。每一張圖都是揮發引擎的輸出：

- **單味料**：一條 `I(t)` 曲線＋其下 ink-wash 面積填色（依調位選填色不透明度）。
- **一支香水（多味）**：三段堆疊的乾燥輪廓（silhouette）。
- **logo／favicon**：一條「先陡升、後長尾」的代表性曲線＋起點高光圓點——濃縮「香水的一生」。
- **圖鑑縮圖／預約印記**：由名稱或預約碼經 FNV-1a → mulberry32 生成參數，決定性地跑出各異的曲線；同一輸入恆得同圖。

靜態頁（方法頁、圖鑑）的曲線在載入時以純函數即時烘焙成 SVG path，無 JS 亦可見雛形。與細線線描（thin-lineart）的差別：這裡的線是**時間積分的物理曲線**、有語意（可讀出何時綻放、何時散盡），非等寬裝飾外框。

## 八、Logo 與 Favicon 設計指南

- **Logo**：左一個 68×68 的曲線框（含 2–3 條對數格線＋一條 drydown 曲線＋起點 ink8 圓點），右為 900 字重中文品牌名＋mono 拉丁副名。整體單色琥珀墨階。
- **Favicon**：`ink0` 底方形內一條同樣的 drydown 曲線（`stroke:#A98A54`）＋起點高光圓點，寫成 inline SVG data URI 置於 `<head>`。**不得用 emoji、不得用外部檔**。

## 九、Do & Don't

**Do**：只用一個色相的明度階；讓時間軸當主角；每張圖都由揮發引擎生成；jud语極簡（神秘寡言）；大量留白；直角硬邊；mono 承載所有數字與標籤；虛構但具體的人名地址電話價格；標「資料皆為虛構示意」。

**Don't**：❌ 紫藍漸層 hero ❌ 置中大標＋兩鈕＋三卡模板 ❌ emoji 當 icon ❌ 第二個色相（尤其紅／綠狀態色）❌ 米白紙感底 ❌ 產品照或瓶身圖 ❌ 圓角柔影卡片 ❌ Lorem ipsum 與「在當今快節奏的世界」AI 腔 ❌ 跑馬燈反射式套用 ❌ 把揭示淡入／數字計數當 signature ❌ 「EST. 19xx」徽章／「把 X 變成 Y」標題。

## 十、頁面骨架範例（可直接使用）

```html
<!-- 揮發引擎（放入 <script>，各頁共用） -->
<script>
var MAT=[ {id:"bergamot",zh:"佛手柑",tier:"t",fam:"柑橘",tr:2,td:30,str:.9},
          /* … 前調 td≈20–52 / 中調 td≈140–340 / 後調 td≈640–1800 … */ ];
MAT.forEach(function(m){var tp=(m.tr*m.td/(m.td-m.tr))*Math.log(m.td/m.tr);
  m._n=1/(Math.exp(-tp/m.td)-Math.exp(-tp/m.tr));});
function inten(m,dose,t){if(t<.001)t=.001;
  var v=dose*m.str*m._n*(Math.exp(-t/m.td)-Math.exp(-t/m.tr));return v>0?v:0;}
var LGA=Math.log(.5),LGB=Math.log(1440);
function slToMin(s){return Math.exp(LGA+(LGB-LGA)*s);}          // s: 0..1
function minToX(min,w){return (Math.log(Math.max(min,.5))-LGA)/(LGB-LGA)*w;}
</script>
```

```html
<!-- 試香紙架 nav -->
<nav class="strips">
  <a class="strip on" style="--r:-9deg" href="#"><span class="paper">
     <span class="zh">調香台</span><span class="en">ORGUE</span></span></a>
  <!-- 現用頁加 .on：抽高＋紙尖 ::before 顯影＋字轉 ink8 -->
</nav>
```

```css
:root{--ink0:#17110B;--ink5:#8A6A3E;--ink8:#EFE4CC;}   /* 單色琥珀墨階 */
body{background:var(--ink0);color:#D9C39A;font-family:"Noto Serif TC",serif;font-weight:300}
.strip{transform:rotate(var(--r));transition:.28s cubic-bezier(.2,.7,.3,1)}
.strip.on .paper::before{height:20px}     /* 香氣顯影 */
@media(prefers-reduced-motion:reduce){*{transition:none!important}}
```

驗收：把料放上調香琴、拖動時間軸，能看到前調先起先落、後調長留，且判語會誠實指出配方缺口——若做不到「三段隨時間演化」，就不是這個風格。
