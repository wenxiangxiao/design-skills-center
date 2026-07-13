---
name: art-deco-engraved
description: An engraved Art Deco system for institutions that want gravitas — near-black ink and warm ivory with a single antique gold used graphically for hairlines, sunburst rosettes, chevrons and ziggurat frames, opening on a symmetrical masthead nameplate (not a marketing hero) with a centred masthead nav, Poiret One geometric caps over Marcellus SC roman small-caps and a Cormorant Garamond serif body, animated by a gold-foil sheen sweeping the wordmark, a very slowly rotating radial sunburst and an expandable Roman-numeral index whose gold hairline self-draws and rolls a representative figure.
---

# 裝飾藝術・鏨刻版（Art Deco Engraved）

> 本 SKILL 定義一整套視覺語言。任何 AI 讀完即可替**任意產業**做出同風格網站——風格不綁定「律師事務所」這個題材。GRANVILLE & ASHE 只是一次示範；同一套鏨刻裝飾藝術語言也能做私人銀行、珠寶、歌劇院、老牌旅館、家族辦公室、白蘭地酒莊或高級鐘錶。
>
> **核心心法**：對稱、鏨刻、克制的華麗。金是「線」不是「面」——用金色的細線、放射、階梯與菱形去雕刻版面，而不是把金當成大色塊潑上去。情緒來自秩序與稀有：黑與象牙撐起 95% 的畫面，金只在關鍵處閃一下，像鎏金的信箋抬頭。開場是一張被鏨刻的**銘牌**，不是行銷大標與按鈕。

---

## 設計哲學

裝飾藝術（Art Deco，1920–1939）相信機械時代的華麗可以被幾何化：太陽放射、階梯齊格拉特、扇形、菱形與雪佛龍，都是把「奢侈」約束進對稱與比例裡。本版把它用於需要「莊重感」的機構——刻意反行銷：不喊口號、不堆卡片，而是像一張鎏金名片那樣，先報上名號與年份，再以編號索引把專業一項項鏨刻出來。

三條不可動搖的原則：**對稱先於活潑**（主要構圖置中對稱，靠內容而非版面製造張力）；**金是線非面**（金色只出現在 1px–2px 的描線、放射與文字，色塊留給黑與象牙）；**稀有勝於熱鬧**（每一屏至多一個會動的金色元素）。

## 色彩系統

- `#F1E8D5` 暖象牙／主要頁面背景，佔 ~55%。帶米黃的象牙，取代刺眼白，呼應鎏金信箋的紙感。
- `#13110C` 墨黑／深色band、刊頭、footer、內文，佔 ~34%。偏棕的黑，比純黑更溫潤、更「舊時」。
- `#B58A3C` 古典金／唯一金屬色：髮線、放射日芒、羅馬數字、雪佛龍、徽章描線、標籤，佔 ~7%。**只當「線與字」，不當大色塊**。
- `#E7CE93` 亮金／金的高光階，用於大標題文字、hover 提亮、掃光帶，佔 ~2%。
- `#6E1E24` 深牛血紅／印記色：僅用於重點主持律師署名、關鍵按鈕 hover 與極少數強調，佔 <1%。
- `#2A2620` 暖炭／次要深色band與次要文字。

比例原則：黑＋象牙是主體，金是鏨刻的線。**一個畫面中金色的「面積」不超過 8%**；若把金塗成大塊背景，立刻變俗、變 AI。

## 字體系統

- 顯示／字標：**Poiret One**（400）。幾何、細筆、寬字距的裝飾藝術大寫，字距 `.14em`–`.30em`。用於品牌名、區塊大標。**只用大寫**。
- 羅馬小標／標籤／數字：**Marcellus SC**（碑刻式小型大寫）。用於執業領域名稱、eyebrow 標籤、footer 標題、數字說明；字距 `.2em`–`.42em`，全大寫。
- 內文：**Cormorant Garamond**（400／500／600，含 italic）。高對比襯線，行高 1.65，引言與 lede 用 italic。段寬 ≤46em。
- 中文：**Noto Serif TC**（400／600／900）與上述並列；中文大標可搭 Poiret 的英文，字距拉開 `.3em` 以上以取得裝飾藝術的疏朗。
- 字級 scale：品牌名 `clamp(1.5rem,4.4vw,2.5rem)`；hero 大標 `clamp(2.1rem,7vw,4.6rem)`；區塊標題 `clamp(1.6rem,4.4vw,2.6rem)`；羅馬數字 `clamp(3rem,9vw,5.4rem)`；內文 19px；標籤 .6–.72rem。
- 數字與羅馬數字是裝飾主角，一律用 Poiret 或 Marcellus，字級明顯大於周圍。

## 版面與網格

- **對稱刊頭 + 不對稱內文**：頁首與 hero 嚴格置中對稱（銘牌）；進入內容後改用左右交錯的不對稱區塊（如執業頁奇數列數字在左、偶數列在右），避免通篇置中的呆板。
- 容器 `max-width:1120px`，左右 padding `clamp(20px,5vw,64px)`。
- **金色髮線分隔**：區塊之間用 1px 金色髮線或 `repeating-linear-gradient` 的鏨刻虛線（`gold 0 2px, transparent 2px 6px`）分隔，取代陰影。
- 深淺band 交替：墨黑band（hero／執業索引／團隊／footer）與象牙band（引言／沿革／聯絡）交錯，形成「鎏金—象牙」的節奏。
- 邊框一律直角（`border-radius:0`）；框線用 1px 金。留白慷慨：hero 上下 `clamp(48px,9vw,104px)`。
- **對稱裝飾**：放射日芒、盾形徽章、菱形徽記置於中軸；雪佛龍（chevron）由多個 45° 旋轉的方角拼成一條分隔線。

## 元件配方

- **masthead nav（刊頭導覽）**：`background:#13110C;text-align:center`；頂端一條鏨刻金虛線（`repeating-linear-gradient`）；品牌名＋菱形徽記置中一行，副標一行，導覽列一行，三者上下置中對齊；導覽連結 Marcellus SC 全大寫、`border-bottom:2px solid transparent`，hover 轉亮金。**不是浮動 topbar，而是報頭式抬頭**。
- **hero（銘牌）**：墨黑底＋置中盾章＋Poiret 大標＋雪佛龍分隔＋創立年 eyebrow＋一句 italic lede；背景放一枚 `repeating-conic-gradient` 的日芒，`opacity:.24` 極慢旋轉。**沒有按鈕群、沒有三卡片**。
- **執業索引（signature）**：`<button aria-expanded>` 列，`grid-template-columns:64px 1fr auto`（羅馬數字／名稱／＋號）；展開面板 `max-height` 過場，內含一條 `transform:scaleX(0→1)` 的金色髮線、一段說明與一張 `border-left:2px` 的「代表案件」卡（標的數字 `requestAnimationFrame` 滾動計數）。一次只開一項。
- **徽章／框**：原創 SVG，`fill:none;stroke:#B58A3C`；母題限定放射、菱形、盾形、階梯、雪佛龍。
- **標籤 chip**：`border:1px solid gold`、Marcellus SC 全大寫、直角、金字象牙底。
- **按鈕**：金底墨字或框線金字，直角，`letter-spacing:.24em`，hover 轉亮金或牛血紅。**禁止圓角與模糊陰影**。
- **footer**：墨黑底，三欄（品牌＋兩欄連結／聯絡），最底一條金色髮線上的置中免責條（Marcellus SC 全大寫寬字距）。

## 動效規則

克制是原則——每屏至多一個金色元素在動，其餘靠 hover 微反應。

- **金箔掃光（wordmark sheen）**：字標上疊一層 `::after`，`linear-gradient(100deg,transparent,rgba(255,244,214,.85),transparent)`，`transform:translateX(-130%)→130%`，`3.4s cubic-bezier(.4,0,.2,1) .5s 1 both`，`mix-blend-mode:screen`。載入時掃一次即停。
- **日芒緩轉**：`repeating-conic-gradient` 日芒 `animation:spin 90–100s linear infinite`，`opacity:.14–.24`。極慢，近乎靜止的呼吸。
- **索引展開**：`max-height` `.5s cubic-bezier(.4,0,.2,1)`；內部金髮線 `transform:scaleX` `.55s ease`；＋號 `rotate(45deg)` 變 ×。
- **數字滾動**：代表案件標的 `requestAnimationFrame`，900ms，easeOutCubic，0→目標值＋單位。
- **hover**：導覽與索引列底線／底色 `.3s` 淡入；徽章不動。
- `prefers-reduced-motion`：關閉掃光（`display:none`）、日芒旋轉與數字計數（直接顯示終值），`scroll-behavior:auto`。

## 插畫與圖像風格

- 全部原創 SVG，線描為主：`stroke:#B58A3C`、`fill:none`、`stroke-width:1–1.6`；深墨底上以金／亮金雙階描線。
- 母題庫：放射日芒（conic-gradient 或 SVG line 放射）、盾形／菱形徽章、階梯齊格拉特、雪佛龍、扇形；建築立面用對稱的裝飾藝術樓宇（頂部階梯、垂直窗帶）。
- **人物肖像**：幾何化、對稱、正面，用金色線描在墨黑底上勾出臉型輪廓與少量五官記號（眼、眉、領），避免寫實與陰影；不同人以髮型／領形／眼鏡等幾何差異區分。
- 嚴禁外部圖片、照片、emoji、漸層網底。金色只描線。

## Logo 與 Favicon 設計指南

- **Logo**：橫式鎖定＝菱形徽記（含內菱與放射短線、中置 GA 之類的字母組合）＋ Poiret 寬字距字標＋一條金髮線與 `EST. YYYY` 的 Marcellus SC 標記。墨黑底。
- **Favicon**：inline SVG data URI；墨黑方底＋雙層金菱形＋中置字母組合（`<text>`）。範例：
  `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><rect width='64' height='64' fill='%2313110C'/><path d='M32 6 58 32 32 58 6 32Z' fill='none' stroke='%23B58A3C' stroke-width='2'/><path d='M32 15 49 32 32 49 15 32Z' fill='none' stroke='%23B58A3C' stroke-width='1'/><text x='32' y='39' font-family='Georgia,serif' font-size='15' fill='%23B58A3C' text-anchor='middle' font-weight='700'>GA</text></svg>`
- 品牌字母組合用兩個字母，置於菱形正中；金色只描線，字用亮金。

## Do & Don't

**Do**
- 首屏用對稱刊頭銘牌開場；金色只當髮線、放射、羅馬數字與文字。
- 黑＋象牙撐起畫面，金 ≤8%，牛血紅 <1%。
- 用羅馬數字、雪佛龍、日芒、菱形做導覽與分隔；直角、無陰影。
- 每屏至多一個金色元素在動；提供 reduced-motion 降級。

**Don't（含去AI化禁令）**
- ✗ 不要紫藍漸層、不要任何漸層大色塊 hero。
- ✗ 不要「置中大標＋副標＋兩顆按鈕＋三張圓角卡片」模板。
- ✗ 不要把金塗成大面積背景（立刻變俗、變 AI）。
- ✗ 不要圓角卡片＋模糊陰影；不要 emoji 當 icon（母題一律自繪 SVG）。
- ✗ 不要 Lorem ipsum 或「在當今快節奏的世界」式 AI 腔；文案要具體、克制、有年份與人名。
- ✗ 不要跑馬燈——本風格靠日芒緩轉與掃光承擔動效，不需要捲動橫幅。

## 頁面骨架範例

```html
<header class="masthead">
  <div class="rule-top"></div><!-- 鏨刻金虛線 -->
  <div class="mast-inner">
    <div class="brandline"><svg class="mono">…菱形 GA…</svg>
      <span class="wordmark">GRANVILLE<span class="amp"> &amp; </span>ASHE</span></div>
    <p class="subline">恆嶽法律事務所 · EST. 1958</p>
    <nav class="mast-nav"><a aria-current="page">事務所</a><a>執業領域</a><a>律師與聯絡</a></nav>
  </div>
</header>

<section class="hero">
  <div class="sunburst"></div><!-- repeating-conic-gradient 日芒緩轉 -->
  <svg class="crest">…盾形徽章…</svg>
  <h1>GRANVILLE &amp; ASHE<span class="cn">恆嶽法律事務所</span></h1>
  <div class="chevron-rule"><i></i><i></i><i></i></div>
  <p class="estab">創立於 一九五八</p>
  <p class="lede">一句 italic 引言，不喊口號。</p>
</section>

<section class="practice">
  <div class="pindex">
    <div class="pitem">
      <button aria-expanded="false"><span class="num">I</span>
        <span class="nm">公司與併購<small>Corporate &amp; M&amp;A</small></span>
        <span class="tick">＋</span></button>
      <div class="preveal"><div class="pinner">
        <div class="rule"></div><!-- scaleX 自繪金髮線 -->
        <p>領域說明…</p>
        <div class="matter"><p class="mlabel">代表案件</p>
          <p class="mval" data-count="48" data-suffix=" 億">0</p>
          <p class="lead">主持 — 某某 合夥律師</p></div>
      </div></div>
    </div>
    <!-- II…VI -->
  </div>
</section>
```

CSS 關鍵片段：

```css
:root{--ink:#13110C;--paper:#F1E8D5;--gold:#B58A3C;--gold-hi:#E7CE93;--oxblood:#6E1E24}
.sunburst{background:repeating-conic-gradient(from 0deg,var(--gold) 0 .55deg,transparent .55deg 9deg);
  -webkit-mask:radial-gradient(circle,transparent 30%,#000 31% 62%,transparent 63%);
  opacity:.24;animation:spin 90s linear infinite}
.wordmark::after{content:"";position:absolute;inset:0;
  background:linear-gradient(100deg,transparent 42%,rgba(255,244,214,.85) 50%,transparent 58%);
  transform:translateX(-130%);animation:sweep 3.4s cubic-bezier(.4,0,.2,1) .5s 1 both;mix-blend-mode:screen}
@keyframes sweep{to{transform:translateX(130%)}}
@media(prefers-reduced-motion:reduce){.sunburst{animation:none}.wordmark::after{display:none}}
```
