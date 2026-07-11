---
name: kinetic-motion-heavy-style
description: Build motion-heavy kinetic dark marketing sites — near-black canvas, one electric volt accent, huge Archivo display type, scroll-triggered reveals, infinite marquees, magnetic buttons and canvas particle art.
---

# Kinetic Motion-Heavy Style（動能暗黑風格）

本技能定義一套可完整複製的網站視覺與動效系統。依照本文件，任何 AI 都能在**全新品牌**上重建與 Kinetiq 示範站一致的風格。核心公式：

> **近黑底 × 單一電光色 × 巨型大寫字 × 高密度動效 × 非對稱編號版面 × 銳角髮絲線**

---

## 一、設計哲學

1. **動作即內容（Motion is content）**：動效不是裝飾，而是敘事——文字從遮罩中升起、數字滾動到位、路徑自己畫出來。頁面本身要「示範」品牌所賣的東西。
2. **一種顏色就夠**：整站只允許一個高飽和電光色。它同時是連結色、強調色、圖表色與品牌色。第二個彩色出現，風格即崩壞。
3. **字體就是視覺主角**：不用照片、不用插圖庫。最大的視覺元素永遠是排版本身——超大、全大寫、極重字重、偶爾只留描邊。
4. **儀表板美學**：大量等寬式小標籤（`11px / letter-spacing .2em / uppercase`）、狀態點、編號（`/01`）、規格數據，讓行銷頁看起來像一台正在運轉的儀器。
5. **銳利、非對稱、留黑**：無圓角、無陰影、無置中三卡片。以 1px 髮絲線切割大片黑色留白，內容靠左，右側以編號或小標平衡。
6. **尊重使用者**：`prefers-reduced-motion` 時所有動畫立即降級為靜態；觸控裝置停用游標特效。動效是加分，不是門檻。

## 二、色彩系統

整站僅 7 個色票，全部以 CSS 變數宣告於 `:root`：

| 變數 | Hex | 用途 |
|---|---|---|
| `--ink` | `#0A0B0D` | 全站背景（近黑，帶一點冷灰，絕不用純黑 #000） |
| `--ink-2` | `#0F1114` | 一級抬升面：指標帶、圖解容器、表頭 |
| `--ink-3` | `#15181C` | 二級抬升面:進度條軌道、儀表底環 |
| `--bone` | `#E8ECDF` | 主文字色（帶綠調的骨白，非純白，與 volt 同溫） |
| `--dim` | `#878E80` | 次要文字：內文、標籤、註解 |
| `--volt` | `#C8FF3D` | **唯一強調色**（電光黃綠）：CTA、連結 hover、圖表、狀態點、選取反白 |
| `--line` / `--line-soft` | `rgba(232,236,223,.14)` / `.07` | 髮絲分隔線（一律用半透明骨白，不用實色灰） |

規則：
- **禁止紫藍漸層、禁止多色漸層。** 唯一允許的「漸層」是 volt 的透明度衰減（光暈、熱區）與黑色的 radial 遮罩。
- volt 上的文字一律用 `--ink`（黑字亮底），對比極高。
- 換品牌時只需替換 `--volt`（可選:`#FF4D2E` 熔橘、`#3DFFC8` 電青、`#FFD23D` 訊號黃），其餘不動。

## 三、字體系統

Google Fonts 兩套，不多不少：

```html
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@500;700;800;900&family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet">
```

| 角色 | 字體 | 規格 |
|---|---|---|
| 展示標題 `.display` | Archivo 900 | `text-transform:uppercase; line-height:.92; letter-spacing:-.02em` |
| 首頁 H1 | Archivo 900 | `font-size:clamp(3.6rem, 12.5vw, 11.5rem)` — 必須「大到不舒服」 |
| 章節 H2 | Archivo 900 | `clamp(2.2rem, 5.2vw, 4.6rem)` |
| 內文 | Space Grotesk 400 | `16px / line-height 1.6`，內文一律 `--dim`，重點字 `<b>` 用 `--bone` |
| 微標籤 `.kicker` `.mono-tag` | Space Grotesk 500 | `11–12px; letter-spacing:.14em–.24em; uppercase` |
| 描邊字 `.outline-volt` | — | `color:transparent; -webkit-text-stroke:1.5px var(--volt)`，用於 H1 最後一詞、頁尾巨字 |

`.kicker` 前置一條 30px 的 volt 短線（`::before`），是每個章節的開場記號。

## 四、版面與網格

- 容器：`max-width:1320px; padding-inline:clamp(20px,4.5vw,56px)`。
- 章節垂直節奏：`padding-block:clamp(90px,13vh,160px)`。
- **章節頭 `.sec-head`**:左邊 H2、右邊編號（`<b>01</b> / capability`），底部 1px 髮絲線。每個章節都要編號。
- **列表用「編號橫列」而非卡片**：`grid-template-columns: 90px 1fr 1fr 120px`，行間以髮絲線分隔，hover 時整列淡入 volt 漸層、標題右移 10px。
- **引言／不規則內容用 12 欄錯位**：`grid-column:1/7`、`7/13`（加大 `margin-top`）、`3/10`——刻意不對齊。
- 指標帶、信任條用等分 grid + 內部 1px 直線分隔（`border-left`），滿版深色底 `--ink-2`。
- Hero 內容**靠左下**（`justify-content:flex-end`），右上角放垂直規格小字，右下角放 scroll 提示——四角都有東西，中心留給動畫。
- 圓角：一律 `0`。陰影：一律無。層次靠底色深淺與髮絲線。

## 五、元件配方

### 導覽列 `.nav`
- `position:fixed; height:64px`，初始全透明；`scrollY>10` 加 `.scrolled` → `rgba(10,11,13,.82) + backdrop-filter:blur(14px)` + 底部髮絲線。
- 左：SVG 標誌 + Archivo 800 字標。右：大寫 12px 連結（`--dim`，hover 變 `--bone`），當前頁 `aria-current` 用 volt + 底線；末端一顆小型實心 CTA。
- ≤820px：漢堡（兩條線變 X），選單為全螢幕覆蓋層，連結變成 Archivo 900 巨字，`translateY(-102%)` 滑入。

### 按鈕 `.btn`
- 結構：1px 邊框、大寫 13px、`letter-spacing:.14em`、`padding:16px 30px`、直角。
- 填色動畫：`::before` 色塊從下方 `translateY(101%)` 滑入覆蓋（`.45s cubic-bezier(.16,1,.3,1)`），文字換色。
- 三型：`btn-solid`（volt 底黑字，hover 反轉為黑底 volt 字）、預設（volt 框線）、`btn-ghost`（灰框骨白字）。
- 所有主要按鈕加 `.mag`（磁吸，見動效規則）；箭頭 `→` 包在 `.arw`，hover 右移 5px。

### 卡片／圖解容器 `.diagram`
- 不做浮起卡片。容器 = `border:1px solid var(--line); background:var(--ink-2)`，直角。
- 上緣「視窗列」：左側等寬小字檔名（如 `pipeline.live`），右側三顆 8px 圓點（第一顆 volt 實心）。
- 下緣「狀態列」：兩端對齊的小型鍵值資料（`throughput 91k frames/s`）。
- 內容一律是 SVG 或 canvas 原創圖解。

### 表格 `.cmp`
- `border-collapse:collapse`，外框 1px 髮絲線，包在 `overflow-x:auto` 容器內（`min-width:680px`）。
- 表頭：Archivo 800 大寫、`--ink-2` 底、推薦方案欄整欄 volt 字。
- 分組列：10px 大寫 volt 小字（`letter-spacing:.26em`）。
- 有 = volt `✓`，無 = 25% 透明 `—`。行 hover 淡 volt 底。

### FAQ 手風琴 `.faq-item`
- 每題上下髮絲線；題目列 = 標題 + 右側 16px「＋」號（兩條 2px volt 線）。
- 展開：JS 切 `.open`，答案 `max-height: 0 → scrollHeight`（`.55s` ease-out）；「＋」直線 `scaleY(0)`、橫線旋轉 180° 變「−」。一次只開一題。`aria-expanded` 同步。

### 頁尾 `.footer`
- 四欄：品牌欄（標誌 + 一句話 + 呼吸狀態點「all systems nominal」）+ 三個連結欄。
- 招牌元素:**滿版描邊巨字**品牌名（`clamp(4.5rem,15.5vw,15rem)`、`-webkit-text-stroke:1px rgba(bone,.16)`、`transform:translateY(14%)` 沉出畫面）。
- 最下方髮絲線 + 版權列（12px `--dim`）。

## 六、動效規則

統一 easing 變數：`--ease-out: cubic-bezier(.16,1,.3,1)`（expo-out，所有進場動畫共用）。

| 動效 | 觸發 | Duration / Easing | 實作 |
|---|---|---|---|
| 捲動揭示 `[data-rv]` | IntersectionObserver（`threshold:.18, rootMargin:'0px 0px -6%'`），只觸發一次 | `.9s var(--ease-out)`，錯落用 `--d` 自訂延遲（0.08–0.3s 級距） | `opacity:0; translateY(30px)` → `.in` 歸零 |
| 切詞錯落 `[data-split]` | 同上（Hero 則於 `body.loaded` 立即播） | 每詞 `.9s–1.05s`，**逐詞 delay 70ms** | JS 把每個詞包成 `overflow:hidden` 外殼 + 內層 `translateY(112%)` |
| 無限跑馬燈 `.mq` | 常駐 | `24–32s linear infinite`，hover 暫停 | 內容複製兩份，軌道 `translateX(-50%)` keyframes；反向帶 `animation-direction:reverse`；描邊變體 `.mq-ghost` |
| 數字滾動 `[data-count]` | IO `threshold:.5`，一次 | `1800ms`，easeOutExpo（`1-2^(-10p)`） | rAF 插值，`data-dec` 控小數位，千分位 `toLocaleString` |
| 磁吸按鈕 `.mag` | `mousemove`（僅 `pointer:fine` 且非 reduced-motion） | 跟隨 `.15s ease-out`；離開回彈 `.55s var(--ease-out)` | 位移 = 游標相對中心 × **0.22–0.28** |
| 游標光暈 `#glow` | `pointermove` 常駐 | rAF lerp，係數 **0.09** | 560px 固定圓，radial volt 6% → 透明；觸控裝置 `display:none` |
| Canvas 粒子場（Hero） | 常駐，分頁隱藏時暫停 | 每幀 `t+=.014` | 44px 點陣，`sin(x·.011+t·1.5)·cos(y·.008+t·.8)` 波動 ±10px；游標 170px 半徑內排斥 24px 並加亮；顏色 `rgba(volt, .08–.38)` |
| SVG 路徑自繪 `.trace-path` | 父層 `.in` | `3.4s var(--ease-out) .3s forwards` | `pathLength="1000"` + dasharray/dashoffset 1000→0 |
| 管線流動 `.pipe-flow` | 父層 `.in` | `1.1s linear infinite` | `stroke-dasharray:5 9`，dashoffset −14 循環；封包用 `<animateMotion>` |
| 儀表/進度條 | 父層 `.in` | 環 `1.8s`、條 `1.3s`（逐條 +0.15s） | 環用 `pathLength="100"` dashoffset；條用 `scaleX(var(--w))` |
| 填色按鈕 hover | `:hover` | `.45s var(--ease-out)` | `::before` translateY 滑入 |
| **降級** | `prefers-reduced-motion` | 全部 `.001s`，位移歸零，canvas 只畫靜態一幀 | 全域 media query + JS `RM` 旗標 |

節奏原則：**進場慢（0.9s+）、互動快（0.15–0.45s）、循環極慢（24s+）**。

## 七、插畫與圖像風格

- **零外部圖片、零照片、零 icon font、零 emoji。** 所有圖像 = 行內 SVG 或 canvas 程式繪製。
- 語彙：**線框 + 資料**。UI 用 1px 幽靈線框（`rgba(bone,.14)`）示意，資料層用 volt——線圖、點陣、熱區暈染、脈衝圓環。
- 熱區／光暈:volt 的 radialGradient 由 `.5α` 衰減到 0，canvas 上用 `globalCompositeOperation:'lighter'` 疊加。
- 小圖標（feature glyph）：90×54 視窗內的極簡幾何——一條曲線、五根柱、同心圓、漏斗輪廓，volt 單色，透明度分層。
- 圖解一律附「儀器化」標註：等寬大寫小字（`10px, letter-spacing 2px`）、座標線、狀態文字（`RAGE ×3`、`FOLD`）。
- 動態圖解優先序：路徑自繪 > 虛線流動 > 脈衝 > 呼吸縮放。每張圖至少一種常駐微動效。

## 八、Logo 與 Favicon 設計指南

- **構成公式**：幾何字首字母 + **速度線（motion echo）**。示範站的 K = 5.5px 粗直豎 + 尖角 chevron，左側三條短橫線（透明度 .35/.55/.35）表示殘影。
- 字標：Archivo 900 全大寫，`letter-spacing` 約 2.5px，骨白色；可加一顆閃爍的 volt 游標方塊（`<animate>` opacity 0/1，1.6s）呼應「回放」。
- 顏色僅 volt + 骨白，置於 `--ink` 上；單色場合可全 volt。
- **Favicon**：行內 SVG data URI，32×32、`rx:6` 近黑圓角方塊 + 簡化標誌（去掉字標、加粗筆畫）：

```html
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='6' fill='%230A0B0D'/%3E%3Cpath d='M10 5v22' stroke='%23C8FF3D' stroke-width='3.5'/%3E%3Cpath d='M26 5 15.5 16 26 27' stroke='%23C8FF3D' stroke-width='3.5' fill='none'/%3E%3C/svg%3E">
```

- 換品牌:換首字母的幾何結構，保留「速度線 + 單色 + 銳角」三要素。

## 九、Do & Don't

**Do**
- 一頁一個 HTML 檔，CSS/JS 全行內，唯一外部資源是 Google Fonts。
- H1 大到破格（12vw+），最後一個詞用 volt 描邊。
- 每個章節：kicker 短線標籤 + 編號 + 髮絲線章節頭。
- 文案具體帶數字（「38 ms」「120 Hz」「31%」），語氣像工程師寫的行銷。
- 內文預設 `--dim`，用 `<b>`（`--bone`）標記重點詞。
- 跑馬燈至少兩條，一條反向或描邊變體。
- 所有動效通過 `prefers-reduced-motion` 與觸控檢查。

**Don't**
- ✗ 紫藍漸層、彩虹漸層、玻璃擬態。
- ✗ 置中 Hero + 三張圓角陰影卡片的模板版型。
- ✗ `border-radius` 超過 6px、`box-shadow` 浮卡。
- ✗ emoji 當圖標、外部圖庫、lorem ipsum。
- ✗ AI 腔文案（"unlock the power of…"、"seamlessly empower…"、"in today's fast-paced world…"）。
- ✗ 第二個彩色強調色；volt 以外只有黑白灰。
- ✗ 內容水平置中對齊整頁（僅頁尾巨字例外）。

## 十、頁面骨架範例

最小可用骨架（換品牌時替換 `--volt`、字標與文案即可）：

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>BRAND — tagline</title>
<link rel="icon" href="data:image/svg+xml,...">  <!-- 見第八節 -->
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@500;700;800;900&family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet">
<style>
:root{
  --ink:#0A0B0D; --ink-2:#0F1114; --ink-3:#15181C;
  --bone:#E8ECDF; --dim:#878E80; --volt:#C8FF3D;
  --line:rgba(232,236,223,.14); --line-soft:rgba(232,236,223,.07);
  --ease-out:cubic-bezier(.16,1,.3,1);
}
*{margin:0;padding:0;box-sizing:border-box}
body{background:var(--ink);color:var(--bone);font:16px/1.6 'Space Grotesk',sans-serif;overflow-x:hidden}
::selection{background:var(--volt);color:var(--ink)}
.wrap{max-width:1320px;margin:0 auto;padding-inline:clamp(20px,4.5vw,56px)}
.display{font-family:'Archivo';font-weight:900;text-transform:uppercase;line-height:.92;letter-spacing:-.02em}
.outline-volt{color:transparent;-webkit-text-stroke:1.5px var(--volt)}
.kicker{font-size:11px;letter-spacing:.24em;text-transform:uppercase;color:var(--volt);
  display:inline-flex;align-items:center;gap:12px}
.kicker::before{content:"";width:30px;height:1px;background:var(--volt)}
.btn{display:inline-flex;gap:12px;font-size:13px;font-weight:700;letter-spacing:.14em;
  text-transform:uppercase;padding:16px 30px;border:1px solid var(--volt);color:var(--volt);
  position:relative;overflow:hidden;isolation:isolate;transition:color .35s var(--ease-out);text-decoration:none}
.btn::before{content:"";position:absolute;inset:0;background:var(--volt);z-index:-1;
  transform:translateY(101%);transition:transform .45s var(--ease-out)}
.btn:hover{color:var(--ink)}.btn:hover::before{transform:translateY(0)}
[data-rv]{opacity:0;transform:translateY(30px);
  transition:opacity .9s var(--ease-out),transform .9s var(--ease-out);transition-delay:var(--d,0s)}
[data-rv].in{opacity:1;transform:none}
.mq{overflow:hidden;border-block:1px solid var(--line)}
.mq-track{display:flex;width:max-content;animation:mq 30s linear infinite}
.mq-set span{font-family:'Archivo';font-weight:800;text-transform:uppercase;
  font-size:clamp(15px,1.7vw,22px);padding:18px 0;white-space:nowrap}
.mq-set i{font-style:normal;color:var(--volt);padding:0 26px}
@keyframes mq{to{transform:translateX(-50%)}}
.hero{min-height:100svh;display:flex;flex-direction:column;justify-content:flex-end;
  padding-bottom:8vh;position:relative}
.hero h1{font-size:clamp(3.6rem,12.5vw,11.5rem)}
@media (prefers-reduced-motion:reduce){
  *{animation-duration:.001s!important;transition-duration:.001s!important}
  [data-rv]{opacity:1!important;transform:none!important}
}
</style>
</head>
<body>
<header class="nav"><!-- 標誌 / 大寫連結 / 小 CTA，見第五節 --></header>
<main>
  <section class="hero">
    <canvas id="field" style="position:absolute;inset:0;width:100%;height:100%"></canvas>
    <div class="wrap" style="position:relative">
      <span class="kicker">Category label</span>
      <h1 class="display">Big claim <span class="outline-volt">here.</span></h1>
      <p data-rv style="--d:.5s;color:var(--dim);max-width:56ch">Concrete, numbers-first subhead.</p>
      <a class="btn mag" href="#" data-rv style="--d:.65s">Primary action →</a>
    </div>
  </section>
  <div class="mq"><div class="mq-track">
    <div class="mq-set"><span>Feature one</span><i>◆</i><span>Feature two</span><i>◆</i></div>
    <div class="mq-set"><span>Feature one</span><i>◆</i><span>Feature two</span><i>◆</i></div>
  </div></div>
  <!-- 編號橫列 features → 指標帶(data-count) → 12欄錯位引言 → CTA -->
</main>
<footer class="footer"><!-- 四欄 + 描邊巨字 + 版權列 --></footer>
<script>
// 核心 JS 五件套：IO 揭示、切詞、count-up、磁吸、光暈（完整實作見 index.html）
var io=new IntersectionObserver(function(es){es.forEach(function(e){
  if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}
})},{threshold:.18,rootMargin:'0px 0px -6% 0px'});
document.querySelectorAll('[data-rv]').forEach(function(el){io.observe(el)});
</script>
</body>
</html>
```

章節順序建議（首頁）：**Hero（canvas）→ 跑馬燈 → 編號功能列 → 指標帶 → 錯位引言 → 反向跑馬燈 → CTA → 頁尾**。內頁以「深掘橫列（文案＋圖解容器交替左右）」替換功能列即可。
