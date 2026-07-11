---
name: wafu-minimal
description: Japanese minimalist (wafū) web style — generous negative space (ma), vertical mincho typography, muted natural earth tones, a single hand-drawn ensō as motion signature, and asymmetric editorial layout with hairline rules.
---

# 和風極簡（Japanese Minimalism / Wafū Minimal）

> 本 SKILL 定義一整套視覺語言。任何 AI 只要讀完，就能替**任意產業**做出風格一致的網站——風格不綁定「茶葉」這個題材。凪 NAGI 日本茶只是它的一次示範。你可以拿它做保養品牌、精品旅宿、香氛、和菓子、陶藝、書店或任何講究「靜」的品牌。

---

## 一、設計哲學

和風極簡的核心是三個日本美學概念：

- **間（ま・ma）**：留白不是「還沒填滿的空間」，而是主動的設計元素。空，讓內容有呼吸、讓視線有停頓。寧可少放一段，也不要把版面塞滿。
- **侘寂（わびさび・wabi-sabi）**：欣賞樸素、不完美、自然的痕跡。因此我們用手繪的、略不規則的線條（如一筆未閉合的円相），而不是幾何完美的圓。
- **一期一会（いちごいちえ）**：每個當下獨一無二。介面上用「季節」「當季」「限定」等時間感語彙，讓內容有此時此地的溫度。

視覺策略：**靜、疏、淡**。動作慢、對比柔、顏色低飽和。目標是讓使用者感到安定，而不是被吸引點擊。**不要**用高飽和色、不要用大量卡片、不要用急促的彈跳動畫——那些都與「靜」相斥。

## 二、色彩系統

低飽和的自然大地色。紙白鋪底、墨黑落字、苔綠點綴、朱紅只用於印章與極少數強調。

| 色票 | Hex | 用途 | 比例 |
| --- | --- | --- | --- |
| 紙白 washi | `#F4F1EA` | 全站背景（和紙感的暖白，**絕不用純白 #FFF**） | ~70% |
| 墨黑 sumi | `#1C1B18` | 主文字、主要線條、footer 上緣線（**不用純黑 #000**，帶一點暖） | ~18% |
| 苔綠 moss | `#6E7355` | 標籤、次要說明、hover、圖示點綴、進度環 | ~7% |
| 淡赭底 pale | `#ECE8DE` | 區塊淡色底、hover 底色 | ~3% |
| 朱 vermilion | `#B24A38` | **僅**印章（落款）、季節標籤、極少數強調（用量 <1%） | <1% |
| 石灰 stone | `#C7C1B4` | 髮絲分隔線（hairline）、次分隔 | 線條用 |

規則：整站主色階只在「紙白／墨黑／苔綠」三色間運作；朱紅是「印章色」，一頁最多出現一兩處。**嚴禁漸層**，尤其禁紫藍漸層。色塊之間用 1px 實線分隔，不用陰影分層。

## 三、字體系統

三款 Google Fonts，明朝（襯線）擔標題與情感、黑體（無襯線）擔標籤與機能。

```
--mincho:'Shippori Mincho','Noto Serif TC',serif;   /* 標題、引言、品牌字 */
--han:'Noto Serif TC',serif;                          /* 中文內文 */
--kaku:'Zen Kaku Gothic New','Noto Sans TC',sans-serif;/* 標籤、nav、數據、按鈕 */
```

- **標題**：Shippori Mincho 600，`letter-spacing:.06em`，字級 `clamp(38px,5.6vw,84px)`，行高 1.28–1.3。明朝體的細直畫是「和」味的來源。
- **內文**：Noto Serif TC 400，字級 15–16px，**行高 1.9–1.95**（刻意寬鬆＝間），`letter-spacing:.015em`，段落最大寬度約 34em。
- **標籤／導覽／數據**：Zen Kaku Gothic New 500，字級 10–13px，**大字距 `.24em–.5em`**，多用 `text-transform:uppercase` 的拉丁小字（如 `SINGLE-ORIGIN JAPANESE TEA`）。
- **字級 scale**（rem 概念）：11 / 15 / 22 / 30 / 46 / 66–84。層級少、跳躍大，靠留白拉開層次而非靠多級字。
- **編號用漢數字**：〇一 〇二 〇三，明朝體，比阿拉伯數字更有手感。

## 四、版面與網格

- **不對稱**：主標不置中，靠左或偏移；hero 用 `1.15fr .85fr` 這類不對稱雙欄，圖不在正中。
- **直書（tategaki）**：用 `writing-mode:vertical-rl` 放小標籤、引言、季節字。這是和風極簡最強的識別記號，**每頁至少出現一次直書元素**（桌機；手機可隱藏）。
- **間（留白）規則**：section 間距 `margin-top:100–104px`；hero 上下 padding 88–96px；內文段落 `max-width:34em` 保留大量左右餘白。**寧空勿滿**。
- **分隔**：section 之間用 `border-top:1px solid var(--sumi)`（主線）或 `var(--stone)`（次線）。**無圓角、無陰影、無卡片浮起**。列表（如茶款）用「上緣線 + 欄格」的編輯式索引，不是一張張卡片。
- **旋轉**：和風極簡**不旋轉元素**（那是普普／孟菲斯的手法）。保持水平垂直的端正，靜由此而生。
- 容器 `max-width:1180px`，`padding:0 40px`（手機 24px）。

## 五、元件配方

**導覽列 nav**：sticky、紙白半透明 `rgba(244,241,234,.9)` + `backdrop-filter:blur(7px)`，下緣 1px stone 線。左側品牌＝円相 mark + 明朝「凪」+ 下方黑體小字站名；右側連結為黑體 12.5px、字距 `.26em`，hover 變苔綠、當前頁下加 1px 苔綠底線。手機為漢堡鈕（三條 1px 線）下拉全寬選單，滑入用 `cubic-bezier(.6,.02,.2,1)`。

**按鈕**：方形無圓角。主按鈕＝墨底紙字 `background:var(--sumi);color:var(--washi)`，`padding:13px 34px`，黑體字距 `.24em`；hover 轉苔綠底。次按鈕＝透明底 + 1px 墨線（ghost）。**文字連結**用 `.link`：黑體小字 + 下方 1px 苔綠線 + 尾隨箭頭「→」，hover 箭頭右移 6px。

**「卡片」（其實是索引列）**：`display:grid` 的橫列，`border-bottom:1px solid var(--stone)`，hover 時整列淡赭底。**不要**圓角卡＋陰影。若需要框，用 1px stone 實線方框 + 淡赭底（如產品規格表）。

**表單／規格表**：`border:1px solid var(--stone)` 的網格，欄與欄之間 1px 分隔線；標題（dt）黑體小字距苔綠 uppercase，數值（dd）明朝 18px。

**footer**：上緣 1px 墨線；四欄 grid（品牌／訪店／聯絡／落款印章）；落款用朱色方框「凪／茶」印章 SVG。底部一行黑體小字放版權與「皆為虛構示意」。

## 六、動效規則

**核心原則：慢、少、柔。** 所有動畫都要有 `prefers-reduced-motion:reduce` 降級（本風格降級時直接顯示終態、關閉描繪動畫）。

- **円相描繪（動效簽名）**：hero 的一筆円相用 SVG `<path>` + `stroke-dasharray/stroke-dashoffset`，載入後 `animation:enso 2.8s cubic-bezier(.6,.02,.2,1) forwards .35s`，從無到有「一筆畫成」。這是本風格的招牌，**別站不該重複**。
- **進場揭示**：`.reveal{opacity:0;transform:translateY(20px)}` → 進視窗加 `.in` 過渡 `1.1s ease`。用 IntersectionObserver（threshold .12）。刻意慢，呼應「靜」。
- **hover**：顏色/底色過渡 `.35–.5s`，位移極小（連結箭頭 6px、無彈跳）。**禁**大幅縮放、旋轉、彈跳。
- **茶時計（示範互動）**：環形倒數用 SVG 圓 + `stroke-dashoffset` 隨秒更新（`C=2πr`），每秒 `setInterval` 遞減，可停可重置，結束顯示「できあがり」。任何「等待型」品牌（沖泡、冥想、香氛計時）都能改用。
- **不使用跑馬燈（marquee/ticker）**：和風極簡的資訊是靜置的，捲動橫幅與「靜」相斥。動效簽名交給「円相」與「揭示」承擔。

## 七、插畫與圖像風格

- **全部原創 inline SVG，零外部圖片**。線描為主：`stroke-width:1–1.6`、`fill:none`、`stroke-linecap:round`，墨黑主線 + 苔綠點綴。
- 題材取「自然物與器物」：一筆円相、茶葉葉脈、急須（側手壺）、茶碗與蒸氣曲線、冷萃瓶、遠山霧線（數條水平波線 + 一座三角山）。
- 手感優先於精確：円相刻意**不閉合**、線條可略有粗細變化，體現侘寂。
- **禁用**：emoji 當 icon、外部 icon font、照片、漸層填充、發光/霓虹、3D 擬物陰影。

## 八、Logo 與 Favicon 設計指南

- **Logo**：横向鎖定＝「円相 mark + 明朝主字 + 黑體小字站名」。円相為未閉合圓弧（`stroke-width:3.4`）+ 中心苔綠圓點；主字用 Shippori Mincho 600；下方一行 uppercase 黑體英文說明（字距 4–5）。可加 1px stone 外框，維持端正。
- **Favicon**：延用円相符號——紙白底、墨黑未閉合圓弧、中心苔綠點，`viewBox 0 0 32 32`，寫成 inline SVG data URI（用 URL-encode）放 `<head>`。**不要**用實心色塊或首字母。
- 通則：logo 的「靜」來自留白與細線，別加陰影、別填滿、別用純黑純白。

## 九、Do & Don't

**Do**

- 用紙白 `#F4F1EA` 打底、暖墨 `#1C1B18` 落字、苔綠點綴、朱紅只當印章。
- 大量留白（間），行高寬鬆，段落窄欄。
- 每頁至少一處直書元素、一筆円相為動效簽名。
- 明朝擔標題情感、黑體擔標籤機能；漢數字編號。
- 1px 實線分隔，端正的水平垂直構成。
- 文案具體可信：真實地址、電話、營業時間、人名、價格。

**Don't（含去AI化禁令）**

- 純白 `#FFF` 背景、純黑 `#000` 文字、任何漸層（尤禁紫藍漸層 hero）。
- 「置中大標＋副標＋兩顆按鈕＋三張圓角卡片」模板。
- 圓角卡 + 模糊陰影、擬物浮起、霓虹發光。
- emoji 當 icon（icon 一律自繪 SVG 線描）。
- 跑馬燈／自動輪播（與「靜」相斥）。
- 旋轉貼歪的元素、彈跳縮放的 hover。
- Lorem ipsum、AI 腔（「在當今快節奏的世界」之類）、高飽和配色。

## 十、頁面骨架範例

可直接取用的 HTML 片段（配合 §二–§六 的變數與類別）。

**（A）不對稱 hero＋直書標籤＋円相**

```html
<section class="hero"><div class="wrap">
  <div class="vlabel"><div class="vtext">一服の静けさ ・ SINGLE-ORIGIN</div></div>
  <div class="grid">
    <div>
      <h1>ひと葉に、<br>季節を淹れる。
        <span class="sm">產地直送・單一產地</span></h1>
      <p class="lede reveal">一段具體、克制、無 AI 腔的品牌敘述……</p>
      <a class="link" href="teas.html">看六款當季茶<span class="ar">→</span></a>
    </div>
    <div class="art">
      <svg class="enso" viewBox="0 0 400 400" aria-label="円相">
        <path class="stroke" d="M296 90 A150 150 0 1 1 332 132"
              fill="none" stroke="#1C1B18" stroke-width="9" stroke-linecap="round"/>
      </svg>
    </div>
  </div>
</div></section>
```

```css
.enso .stroke{stroke-dasharray:820;stroke-dashoffset:820;
  animation:enso 2.8s cubic-bezier(.6,.02,.2,1) forwards .35s}
@keyframes enso{to{stroke-dashoffset:0}}
.vtext{writing-mode:vertical-rl;text-orientation:mixed}
@media(prefers-reduced-motion:reduce){.enso .stroke{animation:none;stroke-dashoffset:0}}
```

**（B）編輯式索引列（取代卡片）**

```html
<article class="tea-row">
  <div class="no">〇一</div>
  <h3>白露 煎茶<span class="jp">はくろ せんちゃ</span></h3>
  <div class="desc"><span class="org">靜岡・牧之原　淺蒸し</span>湯色清亮如晨露……</div>
  <div class="price">NT$680 / 50g</div>
</article>
```

```css
.tea-row{display:grid;grid-template-columns:64px 1fr 1.4fr auto;gap:30px;
  align-items:baseline;padding:28px 8px;border-bottom:1px solid var(--stone);
  transition:background .4s}
.tea-row:hover{background:var(--pale)}
```

**（C）進場揭示的觀察器（含降級）**

```js
var els=document.querySelectorAll('.reveal');
if(matchMedia('(prefers-reduced-motion:reduce)').matches){
  els.forEach(e=>e.classList.add('in'));
}else{
  var io=new IntersectionObserver((en)=>en.forEach(x=>{
    if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target);}
  }),{threshold:.12});
  els.forEach(e=>io.observe(e));
}
```

---

*驗收：一個從未看過 Demo 的 AI，只讀本 SKILL 就能做出「靜、疏、淡」且不落 AI 模板的和風極簡網站。*
