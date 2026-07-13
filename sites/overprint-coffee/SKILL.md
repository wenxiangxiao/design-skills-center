---
name: riso-chapter-zine
description: A Risograph zine system built for storytelling by scroll — warm uncoated paper and ink near-black with three fluorescent inks (pink, teal, orange) overprinting via multiply into a fourth colour under a faint halftone grain, opening on a hero-less chapter-scroll rather than a big-type hero and navigating by a fixed anchor-index rail that highlights the current chapter, set in Syne display over a Newsreader serif body and Space Mono captions, animated by roller-wipe title reveals, printed registration crosses and a scroll-driven pour-over gauge whose water, bloom and carafe fill advance as you read.
---

# 復古印刷・章節孔版（Risograph Chapter Zine）

> 本 SKILL 定義一整套視覺語言。任何 AI 讀完即可替**任意產業**做出同風格網站——風格不綁定「咖啡廳」這個題材。OVERPRINT COFFEE 只是一次示範；同一套孔版章節語言也能做獨立書店、刺青店、唱片行、選物店、市集、插畫工作室或社區刊物。
>
> **核心心法**：像一本被印壞得剛剛好的 zine。三支螢光油墨疊在暖紙上，交界處長出第四色；內容不是「一屏一屏的卡片」，而是**一頁往下捲就能讀完的故事**。每一章都像雜誌的一個跨頁（spread），用滾筒把標題「刷」出來。技術服務敘事：捲動不只是移動，而是「翻頁」與「沖煮」。

---

## 設計哲學

孔版印刷（Risograph）介於影印與網版之間：便宜、環保、色彩螢光、套色永遠對不太準。這種「不精確的手感」正是它的魅力——與 AI 的完美無菌恰恰相反。本版把它用於**需要說故事**的小店：與其堆疊行銷區塊，不如把品牌拆成有序的章節，讓使用者往下捲＝往下讀。

三條原則：**故事先於版塊**（首頁是章節捲軸，不是 hero＋卡片牆）；**疊色而非漸層**（顏色靠 `multiply` 交疊產生，不用柔和漸層）；**印刷的痕跡要看得見**（套準十字、半調網點、滾筒揭示、螢光錯位陰影，都是刻意保留的「印壞感」）。

## 色彩系統

- `#F3ECDD` 暖紙米白／頁面背景，佔 ~58%。未塗佈紙感，取代純白。
- `#22201C` 油墨黑／文字、格線、深色 spread 底，佔 ~22%。孔版的黑其實偏暖褐。
- `#FF4D8D` 螢光粉／主要強調：字標、hover、roller 揭示帶、章節高亮，佔 ~8%。
- `#1F9E8F` 湖水藍綠／第二油墨：標籤、次標、圖示、其中一章的 spread 底，佔 ~6%。
- `#FF7A2F` 螢光橘／第三油墨：價格、點綴、其中一章的 spread 底，佔 ~4%。
- **第四色來自疊印**：任兩支油墨以 `mix-blend-mode:multiply` 交疊處，會生出未經調配的深色（粉×綠→暗紫、橘×粉→磚紅）。**這是本風格的靈魂，務必刻意製造交疊區**。

比例原則：紙與黑是主體，三支螢光輪流當主角（每個 spread 以一支為主色）。半調網點顆粒 `opacity:.05`，只是氣氛，不搶戲。

## 字體系統

- 顯示／字標／章節標題：**Syne**（700／800）。怪趣幾何、負字距 `-.02em`，適合大級數。中文大標可與之並置，或用 Noto Sans TC 700。
- 內文／敘事：**Newsreader**（400／500，含 italic）。有文氣的襯線，讓「讀故事」成立；lede 用較大級數。行高 1.6–1.7。
- 標籤／數字／頁碼／時間：**Space Mono**（400／700）。等寬字帶來「印刷規格／校稿」的味道；章節編號、價格、時間、`REG` 十字說明一律用它。
- 中文：**Noto Sans TC**（400／500／700）。
- 字級 scale：巨型字標 `clamp(3rem,13vw,9rem)`；章節標題 `clamp(2.3rem,8vw,5rem)`；lede `clamp(1.2rem,2.8vw,1.6rem)`；內文 19px；標籤 .7–.8rem。
- **疊印字標**：同一組字疊兩層，上層螢光粉、下層湖綠 `multiply` 並偏移 `left:.06em;top:.05em`，做出套色沒對準的招牌效果。

## 版面與網格

- **章節捲軸**：首頁縱向堆疊 5 個 `.chapter` 全幅區塊，每章一個 `id`（anchor）。序章 `min-height:100vh`。不設 hero、不設按鈕群。
- 內容容器 `max-width:1000–1040px`；深色 spread 章節用 `max-width:none` 滿版換底色，內層 `.chinner` 再收回 1000px，形成「跨頁換紙」的節奏。
- **anchor-index 左欄**：`position:fixed;width:132px;height:100vh;border-right:2px`，含品牌 mark、章節編號索引、底部頁鈕；≤900px 收成漢堡抽屜。
- 格線與卡片一律直角、2px 實線邊框，無圓角無陰影（陰影只用「螢光錯位」那種印刷感，不用模糊柔影）。
- **套準十字（registration cross）**：在章節標籤旁放一枚 SVG 十字圓靶，強化印刷語彙。

## 元件配方

- **anchor-index nav**：固定左欄；章節連結 Space Mono＋編號，`border-left:3px solid transparent`，`.on` 時左框與文字轉螢光粉；由 `IntersectionObserver`（`rootMargin:'-45% 0 -50% 0'`）判斷當前章。底部頁鈕為 2px 框方鈕，hover 反色。
- **章節標題（roller wipe）**：`.reveal .rtitle` 外層 `overflow:hidden`，`h2` 初始 `translateY(103%)`；`::after` 是一條螢光色帶 `translateX(-101%)`。進入視窗加 `.in`：色帶 `roller` 掃過（-101%→0→101%），標題隨後 `translateY(0)` 升起——像滾筒把字印上去。
- **spread**：整章換底色（黑／湖綠／橘），主色標籤與 roller 色帶隨之改色。
- **豆卡／資訊卡**：2px 框、內含原創 SVG 色票（螢光底＋`multiply` 疊圓）、Space Mono 產地標。
- **價目（zine 列表）**：`grid-template-columns:1fr auto`，品名左、價格右（Space Mono 螢光橘），虛線分隔 `1px dashed`。
- **章節編號標籤**：Space Mono 全大寫＋實心色塊編號＋套準十字。
- **footer**：油墨黑底，品牌 Syne 字標＋連結＋Space Mono 免責條。

## 動效規則

動效服務「閱讀」與「沖煮」，不是裝飾。

- **scroll-driven 沖煮（signature）**：在手沖章用 `getBoundingClientRect` 算章節捲動進度 `p`(0–1)，以 `requestAnimationFrame` 節流更新 SVG：注水柱 `height`、粉層 bloom `scale`、下壺 `fill` 的 `y/height` 與百分比文字，並同步點亮四個步驟。`p` 分段：水早注入、bloom 中段、下壺後段填滿。
- **roller-wipe 揭示**：`.in` 觸發 `roller` `.8s cubic-bezier(.6,0,.2,1)` 色帶掃過＋標題 `.55s` 升起。
- **序章滴水提示**：`scaleY` 呼吸的細條，`drop 1.6s ease-in-out infinite`。
- **hover**：索引與連結底色／底線 `.2s` 淡入。
- **半調網點**：靜態 `radial-gradient` 網點鋪在 `body::before`，`mix-blend-mode:multiply;opacity:.05`。
- `prefers-reduced-motion`：沖煮直接設為完成（`setBrew(1)`）、關閉 roller（標題直接顯示、色帶 `display:none`）、關閉滴水；`scroll-behavior:auto`。

## 插畫與圖像風格

- 全部原創 SVG／CSS。每個圖形＝螢光色塊＋`mix-blend-mode:multiply` 疊出的第二形，刻意偏移做套色錯位。
- 母題庫：濾杯與下壺、烘豆機、老街屋立面、咖啡豆剖面、半調圓點、套準十字。
- 色票／插畫底用單一螢光滿版，上面壓另一支螢光的圓／橢圓（multiply）＝孔版感。
- 嚴禁外部圖片、照片、emoji、柔和漸層。要「印刷感」不要「渲染感」。

## Logo 與 Favicon 設計指南

- **Logo**：兩枚錯位的螢光圓環（粉＋綠 `multiply`）＝疊印母題；旁接疊印字標（上粉下綠偏移）＋ Space Mono 英文行；角落放一枚套準十字。暖紙底。
- **Favicon**：inline SVG data URI；暖紙方底＋兩枚偏移螢光圓環。範例：
  `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><rect width='64' height='64' fill='%23F3ECDD'/><circle cx='27' cy='33' r='15' fill='none' stroke='%23FF4D8D' stroke-width='5'/><circle cx='37' cy='31' r='15' fill='none' stroke='%231F9E8F' stroke-width='5' opacity='0.85'/></svg>`

## Do & Don't

**Do**
- 首頁用 hero-less 章節捲軸說故事；用 anchor-index 當導覽並高亮當前章。
- 三支螢光油墨輪流當主色，務必刻意製造 `multiply` 交疊區生出第四色。
- 保留印刷痕跡：套準十字、半調網點、滾筒揭示、螢光錯位陰影。
- 讓一個 scroll-driven 的敘事互動承擔重點（本例是沖煮）；提供 reduced-motion 降級。

**Don't（含去AI化禁令）**
- ✗ 不要紫藍漸層 hero、不要任何柔和漸層當背景。
- ✗ 不要「置中大標＋副標＋兩顆按鈕＋三張圓角卡片」模板。
- ✗ 不要圓角＋模糊陰影卡片；陰影只用螢光錯位那種印刷感。
- ✗ 不要 emoji 當 icon（母題一律自繪 SVG）。
- ✗ 不要 Lorem ipsum 或 AI 腔文案；用具體的豆名、價格、地址、梯次。
- ✗ 不要反射式塞跑馬燈——本風格靠 roller 揭示與 scroll-driven 敘事承擔動效。

## 頁面骨架範例

```html
<aside class="rail">
  <a class="mark" href="index.html"><svg>…疊印雙環…</svg><b>OVER<br>PRINT</b></a>
  <nav>
    <a href="#intro" class="on"><span class="no">01</span> 序</a>
    <a href="#beans"><span class="no">02</span> 選豆</a>
    <a href="#brew"><span class="no">03</span> 手沖</a>
    <!-- … -->
  </nav>
  <div class="pages"><a href="menu.html">菜單</a><a href="brewing.html">手沖課</a></div>
</aside>

<div class="stage">
  <section class="chapter" id="brew">
    <div class="brewwrap">
      <div>
        <p class="chlabel"><span class="no">03</span><svg class="reg">…套準十字…</svg> 手沖</p>
        <div class="reveal"><span class="rtitle"><h2>一杯的四段路</h2></span></div>
        <div class="steps" id="steps"><div class="step" data-step="0">…</div>…</div>
      </div>
      <div class="brewstage">
        <svg class="brewsvg"><!-- 濾杯 / bloom / 下壺 fill，隨捲動更新 --></svg>
      </div>
    </div>
  </section>
</div>
```

CSS 關鍵片段：

```css
:root{--paper:#F3ECDD;--ink:#22201C;--pink:#FF4D8D;--teal:#1F9E8F;--orange:#FF7A2F}
body::before{content:"";position:fixed;inset:0;mix-blend-mode:multiply;opacity:.05;
  background:radial-gradient(var(--ink) 1px,transparent 1.4px);background-size:5px 5px;pointer-events:none}
.rtitle{overflow:hidden;display:inline-block}
.rtitle h2{transform:translateY(103%)}
.rtitle::after{content:"";position:absolute;inset:0;background:var(--pink);transform:translateX(-101%)}
.reveal.in .rtitle h2{transition:transform .55s cubic-bezier(.2,.7,.2,1) .34s;transform:translateY(0)}
.reveal.in .rtitle::after{animation:roller .8s cubic-bezier(.6,0,.2,1) forwards}
@keyframes roller{0%{transform:translateX(-101%)}45%{transform:translateX(0)}100%{transform:translateX(101%)}}
@media(prefers-reduced-motion:reduce){.rtitle h2{transform:none}.rtitle::after{display:none}}
```

JS 骨架（scroll-driven 沖煮）：

```js
function setBrew(p){ /* p:0..1 → 注水高度 / bloom scale / 下壺 fill / 步驟高亮 */ }
window.addEventListener('scroll',function(){
  var r=brew.getBoundingClientRect(), vh=innerHeight, total=r.height-vh*0.6;
  setBrew(Math.max(0,Math.min(1,(vh*0.4-r.top)/(total>0?total:1))));
},{passive:true});
```
