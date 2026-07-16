---
name: observatory-instrument
description: A dark "observatory instrument" style for aurora forecasting, space-weather, astronomy and scientific-monitoring brands, built around a native WebGL fragment-shader aurora whose brightness, height and hue are driven live by a data value (Kp index), wrapped in a dense console of mono-numeric readouts, hairline graticules and amber gauges on a near-black night palette.
---

# 天文台儀表板・觀測主控（Observatory Instrument）

一套為極光預報、太空天氣、天文觀測、科學監測類品牌設計的視覺語言。它的核心不是把一張星空照片鋪滿螢幕，而是**把天空變成一台可被資料操控的儀器**：整片極光光幕由原生 WebGL 片段著色器即時運算，亮度、簾幕高度與色相全部綁在一個資料值（Kp 指數）上——調資料，天空就跟著變。介面像一座深夜裡還亮著的觀測站主控台：冷靜、精密、資訊密集，用讀數與座標說話。

## 設計哲學

1. **天空即儀器，不是壁紙**：極光是這套風格的主角，但它必須「被資料驅動」才成立。使用者拖動一個預報值，光幕實時回應——它是輸出裝置，不是裝飾動畫。抽掉這層資料連動，就只剩一張會動的桌布。
2. **儀表不濫情**：用 Kp、太陽風速、Bz 分量、雲量百分比、可見度分數說話。文案是冷靜的觀測簡報，不堆形容詞、不賣浪漫。數值一律等寬字、置右對齊、帶單位。
3. **深夜底，發光前景**：底色是近黑的深夜藍（不是暖米白、不是純黑），前景用極光的自體發光色（綠→青→紫→洋紅）與單一暖色讀數（琥珀）跳出。光靠「發光」而非「陰影」製造層次。
4. **硬線、去圓角、格線在場**：46px 硬線分格貫穿全站，像儀器面板的刻度網。無圓角、無模糊卡片陰影；分隔用 1px 冷藍細線。
5. **密度是誠實**：這是監測介面，資訊本就密集。多欄讀數、逐小時時間軸、座標標註——把資料攤開，而不是藏進留白。

## 色彩系統

| 用途 | Hex | 比例 |
|------|-----|------|
| 深夜底 night | `#070B16` | 55% |
| 面板 panel（次階底） | `#0C1222` / `#0F1728` | 18% |
| 極光綠 aurora（主色光／低 Kp） | `#52E6A4` | 8% |
| 極光青 cyan | `#38D6E8` | 4% |
| 極光紫 violet（高 Kp 疊色） | `#9B7BF2` | 4% |
| 琥珀讀數 amber（唯一暖色／Kp 值） | `#F2B24D` | 3% |
| 警示紅 red（雲厚／低可見度） | `#FF6B6B` | 2% |
| 冷白文字 ink | `#E7ECF7` | 主文 |
| 次文 muted / 極次 dim | `#8697B6` / `#5B6B8C` | 標籤 |
| 格線 line / line2 | `rgba(126,150,196,.16 / .30)` | 分隔 |

用色規則：底永遠是深夜藍黑；發光色只用在「有意義的資料」上（極光本身、正在上升的數值），不隨意撒。琥珀專屬 Kp 值，讓眼睛一眼找到主指標。紅色只代表「條件轉差」（雲量 >60%、可見度 <40）。

## 字體系統

- **標題／標籤**：`Space Grotesk`（600/700）。幾何無襯線，帶科學儀器感；大標可到 `clamp(38px,7.2vw,86px)`、字距 -.01em。
- **數值／座標／單位**：`Space Mono`（400/700）。所有讀數、時間、座標、Kp 值一律等寬，字距 +.02em，常用 9–13px 小字配大寫。
- **中文內文**：`Noto Sans TC`（400/500/700/900）。行高 1.7–1.8。標題可用 900 壓在英文大標之下作雙語層次。
- 三者來源皆 Google Fonts。數值感由「等寬 + 置右 + 帶單位」建立，不是靠字體本身。

字級 scale：大標 38–86px／區標 24–34px／小標 16–19px／內文 15–15.5px／標籤 9–11px（mono, 大寫, 字距 .12–.28em）。

## 版面與網格

- **46px 方格背景**：`background-image` 雙向 linear-gradient 細線，`background-size:46px`，全站鋪底，像儀器面板刻度。
- **固定主控標頭（58px）**：左品牌＋座標、中導覽分頁（每項 mono 副標）、右即時狀態（LIVE 呼吸點＋Kp＋UTC 時鐘）。分頁與狀態之間用 1px 細線切格。
- **儀表列**：等分多欄（4–5 格），每格 mono 標籤 + Space Grotesk 大數值 + 3px 進度條。欄與欄之間 1px 細線，首格無左線。
- **左控制欄 + 右結果區**（功能頁）：320px 控制欄（選項卡片、日期格）＋流動結果區（天空預覽／判讀／時間軸）。行動版上下堆疊。
- **留白哲學**：極密。區塊 padding 52–64px，但內部資訊盡量攤開多欄，不追求大留白。

## 元件配方

**主控標頭 nav**：`position:fixed;height:58px`，深夜漸層底 + 1px 底線。分頁 `a` 帶 `small` mono 副標（DECK/VARSEL/…），hover 反色微亮綠底，`aria-current` 綠字 + 底部 2px 綠線。右側狀態列含呼吸綠點（`@keyframes pulse` 2.4s）。

**儀表 gauge**：`.lbl`（mono 9.5px 大寫 dim）+ `.val`（Grotesk 26px）+ `.bar`（3px 底線色軌，內 `i` 依數值 %寬，`transition:width .5s`）。Kp 格用琥珀，雲量/可見度依門檻切綠/琥珀/紅。

**選項卡 opt**：1px 細線方塊，`aria-pressed=true` 時綠框 + 綠字 + 8%綠底。無圓角。日期用等寬小格 `.datebtn`。

**時間軸 timeline**：`grid-auto-flow:column` 等分柱狀圖，每柱高 = 可見度分數 %，色依門檻；`aria-selected` 柱頂 2px 白線 + 微亮；最佳時段加琥珀圓點標記。點擊柱 → 重繪天空與逐時明細。

**按鈕 btn**：綠底深字實心（`#04120C` on `#52E6A4`），hover 上移 1px + 綠光陰影；ghost 版透明 + 細框，hover 轉綠框綠字。皆無圓角。

**footer**：近黑 `#05080F`，三欄（品牌敘述含虛構聲明／導覽／聯絡座標），底部 mono meta 列（機構全稱 + 座標）。

## 動效規則

- **極光著色器**：`requestAnimationFrame` 連續運算；`uTime` 推進雜訊流動，`uKp` 以 `kp += (target-kp)*0.06` 緩動趨近目標值（改 Kp 時光幕平滑過渡）。
- **呼吸點 pulse**：`opacity` 1↔.35，2.4s ease-in-out infinite。
- **進度條 / 時間軸柱**：`width` / `height` 過渡 .3–.5s ease。
- **數值串流**：`setInterval` 每 ~1.4s 更新一次模擬讀數（緩慢漂移 + 偶發亞暴湧升），營造「活的監測」感——但**不是靠計數器動畫當簽名**，簽名是資料驅動的天空本身。
- **prefers-reduced-motion**：著色器凍結為固定幀（`uTime` 給常數）、關閉呼吸動畫與數值串流、關閉過渡；資料互動仍可用（拖 Kp / 點時間軸仍即時重繪一次）。

## 插畫與圖像風格（spectral-ribbon 光譜色帶）

- 主視覺是 WebGL 光幕；靜態圖示與備援用 **SVG 漸層極光帶**：兩三條 `path` + 垂直 `linearGradient`（綠→紫，中段最亮），配散點星點。
- 科學示意圖（磁力線注入、觀測網地圖）用冷藍細線 + 少量發光色點，mono 標註座標與代號。**避免細線幾何線描（thin-lineart）當主力**——這裡的線是「儀器刻度／星圖座標」語彙，不是文青單線插畫。
- 零外部圖片：所有圖像為 SVG / CSS / WebGL 生成。

## Logo 與 Favicon 設計指南

- **Logo**：左方形徽記內三條由亮到暗、由粗到細的極光弧線（綠 #52E6A4 / 紫 #9B7BF2 / 青 #38D6E8）＋幾顆星點；右側 `Space Grotesk` 700 大寫字標（字距 3）＋ mono 座標副標（`N69.6° · TROMSØ`）。
- **Favicon**：inline SVG data URI，深夜底方塊 + 兩條極光弧 + 兩顆星點；即使 16px 也能認出「極光」母題。
- 母題一致性：極光弧 + 座標 + 星點三件套，貫穿 logo、favicon、頁尾。

## Do & Don't

**Do**
- 讓資料真正驅動視覺：至少一個資料值要能即時改變主視覺。
- 數值一律等寬、帶單位、可置右；標籤用 mono 大寫小字。
- 底色壓到近黑深夜藍，發光色只給有意義的資料。
- 保留 46px 方格與 1px 硬線分隔，維持儀器面板感。
- 提供 WebGL 失敗與 reduced-motion 的完整降級。

**Don't（含去AI化禁令）**
- 不用紫藍漸層 hero、不用置中大標＋兩顆按鈕＋三張圓角卡片模板。
- 不用 emoji 當 icon（一律自繪 SVG）。
- 不用圓角卡片 + 模糊陰影；層次靠發光與細線，不靠 drop-shadow。
- 不堆 AI 腔浪漫文案（「在浩瀚的星空下…」）；用觀測簡報口吻。
- 極光著色器不可只是背景裝飾——若它不被資料驅動，這套風格就失去核心。
- 不用「EST. 19xx」年份徽章。

## 第五章補述：資料驅動天空・原生 WebGL 極光標準配方

> 本站首創。做同類「資料驅動的生成天空／流體／地形」時可直接沿用此配方（3D 幾何站另見 `sites/compositie-optiek/SKILL.md` 第五章 Three.js 配方）。

**1. 舞台**
一個 `<canvas>` 鋪滿容器，背後放一個 `<svg class="fallback" hidden>` 作備援。取 `webgl`/`experimental-webgl` context；取不到就顯示 SVG 備援並改走 SVG 版 `setKp`。

**2. 幾何**
無需模型：上傳一個覆蓋裁剪空間的雙三角形（`[-1,-1, 1,-1, -1,1, -1,1, 1,-1, 1,1]`），頂點著色器僅 `gl_Position=vec4(p,0,1)`。所有畫面都在片段著色器裡算。

**3. 片段著色器（要點）**
```
uniform vec2 uRes; uniform float uTime; uniform float uKp; // 0..9
// hash → value noise → fbm(5 octaves)
float intensity = smoothstep(0.0, 9.0, uKp);
// 星空：hash(floor(fragCoord/2)) 取閾值點，隨 uTime 微閃，只在上半天空
// 三層簾幕：lowEdge = 0.60 - intensity*0.20;（Kp 越高簾幕垂得越低）
//   每層 curtainY = lowEdge + 0.13*i + 0.16*fbm(x*1.4 + uTime*speed);
//   band = 上緣柔切 * 下緣柔切（寬度隨 intensity 增加）
//   直向紋理 stri = fbm(x*9, y*2.5 - uTime*speed)
//   色彩 lo=綠→青（依層），hi=紫→洋紅（依 intensity），依高度 mix
//   col += aur * band * stri * intensity
// 收尾：地平線輝光 + pow(col,0.86) 提亮
```
關鍵是每一項亮度都乘上 `intensity`（=Kp 映射），且簾幕高度、色相偏移也綁 `intensity`——這讓「調 Kp」在視覺上同時改變**亮度、位置、顏色**三件事，才有說服力。

**4. 互動 / 資料連動**
對外只暴露 `setKp(v)`：內部存 `targetKp`，每幀 `kp += (targetKp-kp)*0.06` 緩動。任何資料源（滑桿、即時串流、預報引擎算出的逐小時 Kp）都呼叫 `setKp`，天空即平滑回應。預報頁點時間軸柱 → 讀該小時 Kp → `setKp` → 天空重繪，功能與藝術合一。

**5. 效能**
`devicePixelRatio` 夾在 1.8 以下；`resize` 時重設 `canvas.width/height` 與 `viewport`；fbm 控制在 5 octaves、簾幕 3 層即足夠。等到 layout 完成（`requestAnimationFrame` 內）再首次 `resize`，避免 clientHeight 為 0。

**6. 降級與備援**
- `prefers-reduced-motion`：`uTime` 餵常數（凍結幀），停 rAF 迴圈，僅在 `setKp` 時重繪一次。
- 無 WebGL / 著色器連結失敗：切換到 SVG 備援函式，用 `linearGradient` 極光帶 + 星點，`setKp` 改為調整帶的透明度與垂降高度。零外部圖片，體驗不中斷。

## 頁面骨架範例

```html
<header class="hdr"><div class="inner">
  <a class="brand" href="index.html">◤徽記◢<b>BRAND</b><span>N69.6°</span></a>
  <nav class="hnav">
    <a aria-current="page">觀測台 <small>DECK</small></a>
    <a>預報查詢 <small>VARSEL</small></a>
  </nav>
  <div class="hstat"><span class="dot"></span> LIVE · Kp <b>3.2</b> · 22:14:07 UTC</div>
</div></header>

<div class="stage">
  <canvas id="aur"></canvas>            <!-- 資料驅動的天空 -->
  <svg class="fallback" hidden></svg>   <!-- 無 WebGL 備援 -->
  <div class="content"><h1>大標<span class="cn">中文副標</span></h1></div>
  <div class="readout"><!-- 等分儀表列：Kp / 太陽風 / Bz / 雲量 / 可見度 --></div>
</div>
```

驗收標準：一個從未看過本 Demo 的 AI，只讀本 SKILL 就能做出一座「深夜儀表底 + 由某個資料值即時驅動的生成天空/流體 + 密集 mono 讀數」的觀測站，並保有 WebGL 與 reduced-motion 的完整降級。
