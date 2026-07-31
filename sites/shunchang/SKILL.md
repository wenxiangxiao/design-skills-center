---
name: raking-light-relief
description: A dark bench style where every image is a height field lit by a user-controlled raking light, so detail exists only when the light is low enough to cast it.
---

# 斜光浮雕風 Raking-Light Relief

## 一、設計哲學

這個風格只有一條原理：**畫面上的東西不是被畫出來的，是被光照出來的。**

一般網站的圖是「形」——先決定輪廓、再填顏色。本風格的圖是「高度」：你先把題材寫成一張凹凸不平的表面（針孔是凹、線是凸、發泡孔是密密麻麻的小坑），然後把光壓到很低的角度橫著掃過去，明暗自己會長出來。同一塊表面，光壓到十二度是一張圖，打到七十二度幾乎是一片空白。

由此推出三條設計後果，缺一不可：

1. **底一定要暗。** 光是稀缺的，所以背景不能亮。整站是一張暗檯，只有被光掃到的地方有內容。
2. **光必須可以被使用者動。** 入射角是控制項，不是裝飾。使用者調不到對的角度，就看不到那塊內容——這是功能，不是體驗設計上的花招。
3. **有些內容在某些光下不存在。** 這是本風格最重要也最容易被稀釋的一點：不要「用透明度假裝看不清楚」，要讓那個資訊在錯誤的光下**真的沒有影子可看**。介面應該直接拒絕：「光太正了，看了也是白看。」

適用題材：任何「細節藏在表面而非顏色裡」的行業——製鞋、印刷、鑄造、鈔券、皮革、模具、修復、鑑定、地質。不適用於以色彩為主體的題材（餐飲、花藝、童書）；那些東西在斜光下會死掉。

---

## 二、色彩系統

暗底、單一暖高光、極少量的高彩度只給「不可回復的事」。

| 色 | Hex | 用途 | 佔比 |
|---|---|---|---|
| 石墨灰 graphite | `#2E2F33` | 全站大面積地色 | 40% |
| 面板灰 panel | `#232427` | 側欄、卡片、表單容器 | 20% |
| 燈箱黑 lightbox | `#101114` / `#0B0C0E` | 所有浮雕圖的底、燈檯內部 | 14% |
| 骨白 bone | `#EDE9E0` | 正文、光源色（`lighting-color`）、紙質單據底 | 16% |
| 生膠黃 gum | `#C89A5E` | 編號、標籤、滑桿、鞋帶、進度條 | 6% |
| 朱 vermilion | `#D4392B` | **只給**：抓到、賠付、失效、不可回復的操作 | 3% |
| 螢光青綠 fluo | `#7CF0C0` | **只在紫光模式出現**：螢光反應、通過 | 1% |
| 分隔線 | `#43444A` / `#585960` | 2px 實線分格 | — |

規則：

- 朱色**不可**用於一般強調或按鈕 hover。它出現一次，代表發生了一件收不回來的事。
- 螢光青綠在白光模式下**完全不出現**。切到紫光時，底色換成 `#1B1430`，`feDiffuseLighting` 的 `lighting-color` 從 `#EDE9E0` 換成 `#4A3A86`，整場冷下來，只有螢光元素亮。
- 不用漸層當背景。唯一允許的漸層是進度條的兩段式 `linear-gradient(90deg, gum X%, #141518 X%)`，那是刻度不是裝飾。
- 全站加一層 `repeating-linear-gradient(0deg, rgba(0,0,0,.16) 0 1px, transparent 1px 3px)` 的細掃描紋，模擬工作檯燈下的細微不均。

---

## 三、字體系統

兩套字，不要第三套。

- **中文／標題**：`Noto Sans TC`，權重 900（標題）、700（小標）、500（強調）、400（內文）。標題 `letter-spacing:.01em`，`line-height:1.25`。
- **數字／標籤／英文**：`IBM Plex Mono`，權重 400 與 600。所有的量（分鐘、金額、百分比、編號、角度）一律 mono，靠右對齊。

字級階：

| 用途 | 大小 | 權重 |
|---|---|---|
| 頁面主標 | 29–30px | 900 |
| 區段標題 | 22–23px | 900 |
| 小標 | 15–16px | 900/700 |
| 內文 | 15px / 行高 1.75 | 400 |
| 次要說明 | 12.5–13.5px / 行高 1.7 | 400 |
| mono 標籤 | 10.5–11.5px / `letter-spacing:.12em–.20em` | 400 |
| 大數字（單據上的機率） | 26px | 600 mono |

原則：**中文負責敘事，mono 負責量。**一段話裡只要出現可量的東西（角度、分鐘、公釐、金額），就換成 mono。這是本風格「職人在報數字」的語氣來源。

---

## 四、版面與網格

- **不對稱雙欄**：`grid-template-columns: minmax(0,1fr) 336px`。左欄是工作檯（燈＋圖＋表），右欄是**紙**（單據、帳）。右欄底色與左欄不同，且右欄裡放一張骨白的紙片元素，`box-shadow:0 10px 0 -4px rgba(0,0,0,.35)`（硬陰影，不模糊），像壓在檯面上的一張單子。
- **零圓角**。除了鞋眼孔那類真的是圓的東西之外，`border-radius` 一律 0。
- **2px 實線分格**。所有區塊之間用 `border:2px solid var(--line)`，不用留白分隔、不用陰影卡片。表格內列用 1px。
- **沒有 hero**。首屏就是可操作的工作檯：一支燈的角度滑桿、一塊燈箱、一張十二列的表。標題壓在檯面上方，字級不超過 30px。
- 內頁採 `wrap` 最大寬 1180px、內距 22px；長文區塊 `max-width:64ch`。
- 響應式：≤980px 雙欄塌成單欄、導覽攤平到底部；≤560px 表格內距收到 5–6px、mono 字級降到 11px，但**不隱藏任何一欄**——量表是內容，不是裝飾。

---

## 五、元件配方

**燈檯（本風格的核心元件）**

```
.lamp   border:2px solid line; background:#101114
 .lamphead  9px 14px；mono 11px 標題 + 右側模式切換（白光／紫光）
 .slider    入射角 range，min=6 max=82 value=16；accent-color:gum
            右側 mono 讀值「16°」，色 gum，min-width 56px 靠右
 .stage     min-height 236px，置中放 SVG；SVG 內是兩塊對照面板
 .stagenote mono 12px，說明「為什麼現在看不到」
```

**兩塊面板的對照結構**：左「原廠對照 REFERENCE」、右「本件 SPECIMEN」。未檢查的一側畫一塊 `stroke-dasharray="6 5"` 的空框，寫「尚未檢查」——**不要**用模糊或半透明來表示未知。

**按鈕**：`border:1px solid #585960`，透明底，mono 11.5px，hover 整顆反白（底骨白、字燈箱黑）。破壞性操作的按鈕邊框與字改朱色。`disabled` 只降 opacity 到 .34，不改形狀。

**表格**：表頭 mono 10.5px、`letter-spacing:.12em`、色 dim、底線 2px；資料列底線 1px。已完成的列加 `background:rgba(200,154,94,.08)`；抓到問題的列加 `rgba(212,57,43,.13)`。列可點（點了換燈檯上的圖），但列內的按鈕要 `e.target.tagName!=="BUTTON"` 擋掉冒泡。

**單據**：骨白底、深色字、`border-top:1px dashed #8C877B` 當分隔，`<dl>` 兩欄 mono（左標右值）。單據上必須有一區是「**沒有做的事**」——未查項目、未涵蓋範圍。這是本風格的道德配件。

**導覽**：不用置頂列。用一個能表達「連續」或「位置」的實體物件（本站是一條穿過四個孔的鞋帶，帶頭停在現用頁）。桌機固定在右緣，行動版攤平為底部圓孔列，頁尾另備完整文字連結保底。

**頁尾**：面板灰底、四欄 `auto-fit minmax(190px,1fr)`，mono 小標＋內文；最後一段 `fine` 用 11px `#7C786F` 寫清楚虛構聲明。

---

## 六、動效規則

**全站只有一個主動效：光在動。**

- `input[type=range]` 的 `input` 事件 → 同步寫入所有 `feDistantLight` 的 `elevation` → 畫面上每一塊浮雕在**同一幀**重新打光。沒有過場、沒有補間、沒有 easing——真實的燈沒有 easing。
- 模式切換（白光／紫光）：`lighting-color` 直接換值，同幀生效。螢光元素以 `filter:url(#glow)`（`feGaussianBlur stdDeviation=3.2` + `feMerge`）發光。
- 允許的次要動效，只有兩種，且 duration 一律 ≤160ms、`ease-out`：
  1. 表格列狀態變化的底色切換（120ms）
  2. 按鈕 hover 反白（0ms，即時）
- **禁止**：淡入進場、數字滾動計數、視差、滾動觸發揭示、跑馬燈。本風格的張力來自「你把燈轉到對的角度那一瞬間東西冒出來」，任何其他動效都會稀釋它。
- `prefers-reduced-motion: reduce` → `*{animation:none!important;transition:none!important}`。**燈的滑桿照常運作**：那是控制項不是動畫，關掉它等於關掉內容。

---

## 七、插畫與圖像風格：斜光浮雕製圖

全站**沒有一張圖是描外形畫出來的**。每一張圖都是一組白色形狀（＝高度場），丟進同一個濾鏡打光。

濾鏡（整站共用一支，定義在一個 `width=0 height=0` 的 SVG 裡）：

```xml
<filter id="rk" x="-6%" y="-6%" width="112%" height="112%" color-interpolation-filters="sRGB">
  <feGaussianBlur in="SourceAlpha" stdDeviation="2.0" result="h"/>
  <feDiffuseLighting in="h" surfaceScale="8" diffuseConstant="1.02" lighting-color="#EDE9E0" result="d">
    <feDistantLight class="dl" azimuth="208" elevation="18"/>
  </feDiffuseLighting>
  <feSpecularLighting in="h" surfaceScale="8" specularConstant="0.55" specularExponent="26" lighting-color="#FFFFFF" result="sp">
    <feDistantLight class="dl" azimuth="208" elevation="18"/>
  </feSpecularLighting>
  <feComposite in="sp" in2="d" operator="arithmetic" k1="0" k2="1" k3="1" k4="-0.06"/>
</filter>
```

要點：

- **`SourceAlpha` 就是高度**。所以圖形一律 `fill="#fff"`，用 `opacity` 調高度（`opacity=".66"` ＝ 比較淺的凹凸），用 `fill="#000"` 挖洞。
- `stdDeviation` 決定表面的「軟硬」：1.2 是銳利的金屬刀口，2.0 是一般皮革與橡膠，3.5 以上是軟發泡。**同一站裡不要超過三種**。
- `azimuth` 固定（本站 208°，即光從左下方來），只讓 `elevation` 變動。方位角一變，整站的「光從哪裡來」就亂了。
- 母題寫成程序生成的原語，不要手畫路徑。例：
  - 車縫 → 一列沿曲線的小橢圓（`rx=3.4 ry=1.9`），旋轉角＝走針角；針距不合格時中途換間距與角度。
  - 模具刀口 → 一排等距長方形，`rx=1` 是新模、`rx=6` 且 `opacity=.66` 是翻模翻鈍的。
  - 發泡 → 一百多顆隨機圓；合格時半徑 2.3–3.8 均勻，不合格時 1.4–7.8 亂跳。
  - 織紋 → 經緯兩組矩形，密度即支數。
  - 壓印 → 圓角矩形托盤上排列的矩形字塊，`opacity` 即壓印深度。
- **每一張圖都要能被「讀出」一個事實**，不能只是好看的紋理。合格與不合格必須是同一支函式的兩個參數，不是兩張畫。
- 靜態頁的圖在建置時就把形狀寫成 SVG 標記，不靠 JavaScript；需要示範不同光角時，複製濾鏡成 `rk12` / `rk38` / `rk72` 三支固定 `elevation` 的版本並排。

---

## 八、Logo 與 Favicon

**Logo**：一塊被同一支濾鏡打光的銅牌。內容只用最少的幾何原語：一個環（鞋眼孔／孔洞／鏡頭，任何與本行業有關的圓）、四根等距的豎條（＝針腳、齒、刻度）、兩條長短不一的橫條（＝字的抽象）。**不要在 logo 裡放真的文字當主體**——文字沒有高度，會破壞「這是一塊有厚度的東西」的前提；英文全名以 mono 8px 排在牌子外面。

**Favicon**：inline SVG data URI，32×32。面板灰底 `#232427`，中央一個 `stroke-width=2.4` 的白環，環上疊一段同心的暗色虛線（`stroke-dasharray="9 22"`）造出「有一側被光背著」的錯覺，底部三顆生膠黃小方塊當針腳。不使用濾鏡（favicon 尺寸下濾鏡不划算），改用兩層環模擬受光。

---

## 九、Do & Don't

**Do**

- 讓入射角成為真正的控制項：某些內容在錯的光下**確實看不到**，而且介面會說明原因並拒絕動作。
- 把每一個量都寫成 mono、靠右、有單位。
- 在單據或報告上留一區「沒有做的事」。
- 對照組與待測物並排，未知的一側用虛線空框，不用模糊。
- 朱色留給不可回復的事。

**Don't**

- 不要紫藍漸層、不要置中大標＋兩顆按鈕＋三張圓角卡片。
- 不要用 emoji 當 icon；本風格的 icon 全部是高度場。
- 不要 Lorem ipsum，也不要「在當今快節奏的世界」這類 AI 腔。文案是師傅在講話：短句、不客氣、講數字。
- 不要「EST. 19xx」徽章。年份寫進句子裡。
- 不要跑馬燈、不要滾動揭示、不要數字計數動畫。
- 不要用模糊或降低不透明度來表示「還不知道」——那是視覺修辭，本風格用「光不對就是沒有」。
- 不要在 logo 裡把文字當主體。
- 不要用圓角卡片＋模糊陰影。硬陰影可以，模糊陰影不行。

---

## 十、頁面骨架範例

```html
<body>
<!-- 1. 全站共用的濾鏡定義 -->
<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
  <filter id="rk" ...>…如第七章…</filter>
  <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
    <feGaussianBlur stdDeviation="3.2" result="b"/>
    <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
  </filter>
</defs></svg>

<!-- 2. 鐵牌頁首：logo 用同一支濾鏡，不是圖檔 -->
<header class="top"><div class="topin">
  <svg class="plate" width="132" height="46" viewBox="0 0 132 46">
    <rect width="132" height="46" fill="#1A1B1E"/>
    <g filter="url(#rk)"> …幾何原語… </g>
  </svg>
  <div class="sign"><b>店名</b><span>ENGLISH NAME ・ 地址</span></div>
  <div class="topmeta">營業時間<br>電話</div>
</div></header>

<!-- 3. 實體導覽（不是置頂列） -->
<nav id="lacenav">…連續物件，現用頁被標記…</nav>
<div class="navfoot"><ul>…行動版攤平…</ul></div>

<!-- 4. 首屏＝工作檯，沒有 hero -->
<div class="bench">
  <div class="benchL">
    <p class="kick">區段名 ／ SECTION</p>
    <h1>一句像人講的話。</h1>
    <div class="lamp">
      <div class="lamphead"><span class="t">工作燈 ／ RAKING LAMP</span>
        <div class="modes"><button aria-pressed="true">白光</button><button aria-pressed="false">紫光</button></div>
      </div>
      <div class="slider"><label for="elev">入射角</label>
        <input type="range" id="elev" min="6" max="82" value="16"><span class="elevread">16°</span></div>
      <div class="stage"><!-- 兩塊對照浮雕面板 --></div>
      <p class="stagenote">現在這個角度看不到什麼、為什麼。</p>
    </div>
    <table class="ftab">…可操作的判準表…</table>
  </div>
  <aside class="benchR">
    <div class="slip">…骨白單據，含「未做的事」一欄…</div>
  </aside>
</div>
</body>
```

燈的同步只需要這幾行：

```js
function setLight(){
  var dl=document.querySelectorAll(".dl");
  for(var i=0;i<dl.length;i++) dl[i].setAttribute("elevation",elev);
  document.querySelectorAll("#rk feDiffuseLighting").forEach(function(n){
    n.setAttribute("lighting-color", uvOn?"#4A3A86":"#EDE9E0");
  });
}
```

判斷「這一項現在看不看得到」的規則，寫成資料而不是寫在 CSS 裡：

```js
function lightOK(f){
  if(f.light==="uv")   return uvOn;
  if(uvOn)             return false;
  if(f.light==="rake") return elev<=30;   // 斜光
  return elev>=55;                        // 正光
}
```

看不到就拒絕，並且說出理由——這是整個風格的骨氣所在。
